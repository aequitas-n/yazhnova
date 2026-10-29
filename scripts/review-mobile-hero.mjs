import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const output = "artifacts/mobile-hero-quality";
const label = process.env.REVIEW_PHASE || "after";
const base = process.env.BASE_URL || "http://localhost:3001";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const results = [];
try {
  for (const width of [390, 412]) {
    const context = await browser.newContext({
      viewport: { width, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    await context.addInitScript(() => {
      sessionStorage.setItem("yazhnova:intro:v1", "1");
      const contexts = new Set();
      const draws = new Map();
      let stamp = 0;
      const nativeFrame = window.requestAnimationFrame;
      window.requestAnimationFrame = (callback) =>
        nativeFrame.call(window, (time) => {
          stamp = time;
          callback(time);
        });
      const get = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (...args) {
        const gl = get.apply(this, args);
        if (gl && String(args[0]).startsWith("webgl") && !contexts.has(gl)) {
          contexts.add(gl);
          for (const name of [
            "drawArrays",
            "drawElements",
            "drawArraysInstanced",
            "drawElementsInstanced",
          ]) {
            if (!gl[name]) continue;
            const draw = gl[name].bind(gl);
            gl[name] = (...values) => {
              if (!draws.has(this)) draws.set(this, new Set());
              draws.get(this).add(stamp);
              return draw(...values);
            };
          }
        }
        return gl;
      };
      window.heroReview = { contexts, draws, beats: [], done: 0 };
      new MutationObserver(() => {
        const intro = document.querySelector(".site-intro");
        const report = window.heroReview;
        if (intro?.dataset.introPhase === "playing" || intro?.dataset.introPhase === "revealing") {
          const beat = intro.dataset.introBeat;
          if (report.beats.at(-1)?.beat !== beat)
            report.beats.push({ beat, time: performance.now() });
        } else if (report.beats.length && !intro && !report.done) report.done = performance.now();
      }).observe(document, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["data-intro-beat", "data-intro-phase"],
      });
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    // Compare the real waiting poster with the live surface in the same layout.
    let release;
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    await page.route("**/originkit/dither-reveal/hands-diagonal.webp", async (route) => {
      await gate;
      await route.continue();
    });
    await page.goto(base);
    await page.locator(".hero-art img").evaluate((image) => image.decode());
    await page.screenshot({ path: `${output}/${label}-${width}-poster.png` });
    release();
    await page.waitForSelector('.hero-art [data-ready="true"]');
    await page.waitForSelector('.hero-stone [data-ready="true"]');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${output}/${label}-${width}-live.png` });
    const buffers = await page.locator(".hero-visual-space canvas").evaluateAll((canvases) =>
      canvases.map((canvas) => {
        const box = canvas.getBoundingClientRect();
        return {
          width: canvas.width,
          height: canvas.height,
          cssWidth: box.width,
          cssHeight: box.height,
        };
      }),
    );
    await page.evaluate(() => window.heroReview.draws.clear());
    await page.waitForTimeout(2400);
    const fps = await page.evaluate(() =>
      [...document.querySelectorAll(".hero-visual-space canvas")].map((canvas) => {
        const stamps = [...(window.heroReview.draws.get(canvas) || [])];
        return ((stamps.length - 1) * 1000) / (stamps.at(-1) - stamps[0]);
      }),
    );
    await page.unroute("**/originkit/dither-reveal/hands-diagonal.webp");
    await page.goto(`${base}/?intro=replay`);
    await page.waitForSelector('.site-intro[data-intro-phase="playing"]');
    await page.waitForSelector(".site-intro", { state: "detached" });
    await page.waitForSelector('.hero-art [data-ready="true"]');
    const timing = await page.evaluate(() => {
      const report = window.heroReview;
      return {
        beats: report.beats,
        duration: report.done - report.beats[0]?.time,
        liveContexts: [...report.contexts].filter((gl) => !gl.isContextLost()).length,
      };
    });
    results.push({ width, buffers, fps, timing, errors });
    await context.close();
  }
} finally {
  await browser.close();
}
await writeFile(`${output}/${label}.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
