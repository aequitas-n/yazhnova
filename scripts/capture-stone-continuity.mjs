import { chromium } from "@playwright/test";
import { copyFile, mkdir, writeFile } from "node:fs/promises";

const base = process.env.BASE_URL || "http://localhost:3000";
const output = "docs/intro-continuity";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const results = [];
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: width < 768 ? 2 : 1,
      isMobile: width < 768,
      hasTouch: width < 768,
      recordVideo: { dir: "artifacts/continuity-video", size: { width, height } },
    });
    await context.addInitScript(() => {
      window.continuity = { beats: [], maximum: 0, changes: [] };
      const contexts = new Set();
      const get = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (...args) {
        const gl = get.apply(this, args);
        if (gl && String(args[0]).startsWith("webgl")) contexts.add(gl);
        return gl;
      };
      const tick = () => {
        const report = window.continuity;
        report.maximum = Math.max(
          report.maximum,
          [...contexts].filter((gl) => !gl.isContextLost()).length,
        );
        const intro = document.querySelector(".site-intro");
        if (intro) {
          const beat = intro.dataset.introBeat;
          if (beat && report.beats.at(-1) !== beat) report.beats.push(beat);
          const canvas = intro.querySelector("canvas");
          if (canvas && !report.canvas) report.canvas = canvas;
          if (beat === "docking") {
            const box = intro.querySelector(".intro-stone").getBoundingClientRect();
            report.changes.push({ x: box.x, y: box.y, width: box.width });
          }
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(`${base}/?intro=replay`);
    await page.waitForSelector('.site-intro[data-intro-phase="playing"] canvas', {
      timeout: 20000,
    });
    if (name === "desktop") {
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${output}/desktop-formed.png` });
      await page.waitForSelector('.site-intro[data-intro-beat="wordmark"]');
      await page.screenshot({ path: `${output}/desktop-wordmark.png` });
    }
    await page.waitForSelector('.site-intro[data-intro-beat="docking"]');
    await page.waitForTimeout(name === "desktop" ? 650 : 230);
    await page.screenshot({ path: `${output}/${name}-transition.png` });
    await page.waitForSelector(".site-intro", { state: "detached" });
    await page.waitForTimeout(180);
    await page.screenshot({ path: `${output}/${name}-hero.png` });
    const result = await page.evaluate(() => {
      const state = window.continuity;
      const current = document.querySelector(".hero-stone canvas");
      return {
        beats: state.beats,
        maximumContexts: state.maximum,
        sameCanvas: state.canvas === current,
        contextAlive: !current.getContext("webgl2").isContextLost(),
        trajectory: state.changes,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    results.push({ name, width, height, ...result, errors });
    const video = await page.video().path();
    await context.close();
    await copyFile(video, `${output}/${name}.webm`);
    console.log(JSON.stringify({ name, ...result, trajectory: result.trajectory.length, errors }));
  }
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2) + "\n");
  if (
    results.some(
      (row) =>
        !row.sameCanvas ||
        !row.contextAlive ||
        row.maximumContexts > 2 ||
        row.overflow ||
        row.errors.length,
    )
  )
    throw new Error("Stone continuity review failed");
} finally {
  await browser.close();
}
