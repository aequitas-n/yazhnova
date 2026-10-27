import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { chapterHeroes, pageContent } from "../content/site.ts";
const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const records = [],
  errors = [];
function instrument() {
  const state = (window.__chapterMetrics = { contexts: [], maximum: 0, frames: new Map() });
  let tick = 0;
  const raf = requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (callback) =>
    raf((time) => {
      tick = time;
      callback(time);
    });
  const get = HTMLCanvasElement.prototype.getContext,
    seen = new WeakSet();
  HTMLCanvasElement.prototype.getContext = function (...args) {
    const gl = get.apply(this, args);
    if (!gl || !String(args[0]).startsWith("webgl") || seen.has(gl)) return gl;
    seen.add(gl);
    state.contexts.push(gl);
    const canvas = this;
    const draw = gl.drawElements.bind(gl);
    gl.drawElements = (...values) => {
      const list = state.frames.get(canvas) || [];
      if (list.at(-1) !== tick) list.push(tick);
      state.frames.set(canvas, list);
      return draw(...values);
    };
    return gl;
  };
  const sample = () => {
    state.maximum = Math.max(
      state.maximum,
      state.contexts.filter((gl) => !gl.isContextLost()).length,
    );
    raf(sample);
  };
  raf(sample);
}
try {
  for (const device of [
    { name: "desktop", width: 1440, height: 1000, dpr: 1, mobile: false },
    { name: "iphone-390", width: 390, height: 844, dpr: 3, mobile: true },
    { name: "android-412", width: 412, height: 915, dpr: 2.625, mobile: true },
  ]) {
    await mkdir("docs/chapters/" + device.name, { recursive: true });
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: device.dpr,
      isMobile: device.mobile,
      hasTouch: device.mobile,
    });
    await context.addInitScript(instrument);
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push({ device: device.name, error: e.message }));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push({ device: device.name, error: m.text() });
    });
    if (device.mobile) {
      const cdp = await context.newCDPSession(page);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 40,
        downloadThroughput: 500000,
        uploadThroughput: 250000,
        connectionType: "cellular4g",
      });
    }
    for (const key of Object.keys(chapterHeroes)) {
      await page.goto(base + pageContent[key].path, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".chapter-object canvas", { timeout: 30000 });
      await page.waitForSelector('[data-chapter-entered="true"]', { timeout: 15000 });
      await page
        .locator(".chapter-native img:not(.visual-frame)")
        .evaluateAll((images) =>
          Promise.all(images.map((image) => image.decode().catch(() => {}))),
        );
      const start = await page.evaluate(() => performance.now());
      await page.waitForTimeout(1400);
      const metrics = await page.evaluate((start) => {
        const state = window.__chapterMetrics,
          canvas = document.querySelector(".chapter-object canvas"),
          rect = canvas.getBoundingClientRect(),
          times = (state.frames.get(canvas) || []).filter((time) => time >= start),
          end = performance.now();
        const gaps = times
          .slice(1)
          .map((time, index) => time - times[index])
          .sort((a, b) => a - b);
        const words = [...document.querySelectorAll(".chapter-word")].map((el) =>
          el.getBoundingClientRect(),
        );
        const button = document.querySelector(".chapter-description a").getBoundingClientRect();
        return {
          fps: +((times.length * 1000) / (end - start)).toFixed(1),
          p95FrameMs: +(gaps[Math.floor(gaps.length * 0.95)] || 0).toFixed(1),
          dpr: +(canvas.width / rect.width).toFixed(2),
          maxContexts: state.maximum,
          overflow: document.documentElement.scrollWidth > innerWidth,
          wordsFit: words.every((word) => word.left >= 0 && word.right <= innerWidth),
          buttonFits: button.bottom < innerHeight - 65,
          canvasCount: document.querySelectorAll(".chapter-hero canvas").length,
        };
      }, start);
      await page.screenshot({ path: "docs/chapters/" + device.name + "/" + key + ".png" });
      records.push({ device: device.name, page: key, ...metrics });
      console.log(JSON.stringify(records.at(-1)));
    }
    if (!device.mobile) {
      await page.goto(base + "/ai-agents");
      await page.evaluate(() =>
        document
          .querySelector("#agent-demo")
          .scrollIntoView({ block: "start", behavior: "instant" }),
      );
      await page.waitForSelector("#agent-demo canvas", { timeout: 30000 });
      await page.waitForTimeout(3000);
      await page.locator("#agent-demo").screenshot({ path: "docs/chapters/ai-demo.png" });
    }
    await context.close();
  }
  await writeFile(
    "docs/chapters/results.json",
    JSON.stringify({ records, errors }, null, 2) + "\n",
  );
  if (errors.length || records.some((row) => row.overflow || !row.wordsFit || !row.buttonFits))
    process.exitCode = 1;
} finally {
  await browser.close();
}
