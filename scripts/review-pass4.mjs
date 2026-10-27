import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const routes = [
  "/",
  "/services",
  "/ai-agents",
  "/work",
  "/process",
  "/engage",
  "/about",
  "/contact",
];
const supportOnly = process.argv.includes("--support-only");
const introOnly = process.argv.includes("--intro-only");
const previous =
  supportOnly || introOnly
    ? JSON.parse(await readFile("docs/pass4/results.json", "utf8"))
    : { records: [], errors: [] };
const records = previous.records.filter(
    (row) =>
      (!supportOnly || !["/about .where-globe", "/about .footer-wordmark"].includes(row.path)) &&
      (!introOnly || row.path !== "intro"),
  ),
  errors = [];
function instrument() {
  sessionStorage.setItem("yazhnova:intro:v1", "1");
  const state = (window.__pass4 = {
    contexts: [],
    frames: new Map(),
    tick: 0,
    maxContexts: 0,
    beats: [],
  });
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (callback) =>
    raf((time) => {
      state.tick = time;
      callback(time);
    });
  const get = HTMLCanvasElement.prototype.getContext;
  const seen = new WeakSet();
  HTMLCanvasElement.prototype.getContext = function (...args) {
    const ctx = get.apply(this, args);
    if (!ctx || seen.has(ctx)) return ctx;
    seen.add(ctx);
    const canvas = this,
      type = String(args[0]);
    if (type.startsWith("webgl")) state.contexts.push({ ctx, canvas, type });
    const mark = () => {
      if (!canvas.isConnected) return;
      const time = state.tick || performance.now();
      const list = state.frames.get(canvas) || [];
      if (list.at(-1) !== time) list.push(time);
      state.frames.set(canvas, list);
    };
    for (const method of type.startsWith("webgl")
      ? ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"]
      : ["drawImage", "fillRect", "fill"]) {
      const fn = ctx[method];
      if (typeof fn === "function")
        ctx[method] = function (...values) {
          mark();
          return fn.apply(this, values);
        };
    }
    return ctx;
  };
  const sample = () => {
    state.maxContexts = Math.max(
      state.maxContexts,
      state.contexts.filter(({ ctx }) => !ctx.isContextLost()).length,
    );
    raf(sample);
  };
  raf(sample);
  const observer = new MutationObserver(() => {
    const node = document.querySelector(".site-intro");
    if (!node) {
      if (state.beats.length && !state.introEnded) {
        state.introEnded = true;
        state.beats.push({ phase: "done", beat: "done", time: performance.now() });
      }
      return;
    }
    const phase = node.getAttribute("data-intro-phase"),
      beat = node.getAttribute("data-intro-beat");
    const last = state.beats.at(-1);
    if (last?.phase !== phase || last?.beat !== beat)
      state.beats.push({ phase, beat, time: performance.now() });
  });
  observer.observe(document, {
    subtree: true,
    attributes: true,
    childList: true,
    attributeFilter: ["data-intro-phase", "data-intro-beat"],
  });
}
async function measure(page, duration = 2400) {
  return page.evaluate(async (duration) => {
    const state = window.__pass4,
      start = performance.now();
    await new Promise((resolve) => setTimeout(resolve, duration));
    const end = performance.now();
    return [...state.frames]
      .filter(([canvas]) => canvas.isConnected && canvas.closest("main,.site-intro,.site-footer"))
      .map(([canvas, times]) => {
        const frames = times.filter((time) => time >= start && time <= end),
          intervals = frames
            .slice(1)
            .map((time, index) => time - frames[index])
            .sort((a, b) => a - b);
        return {
          source: canvas.closest("[data-visual]")?.dataset.visual || "stone",
          frames: frames.length,
          fps: +((frames.length * 1000) / (end - start)).toFixed(1),
          p95FrameMs: +(intervals[Math.floor(intervals.length * 0.95)] || 0).toFixed(1),
          buffer: [canvas.width, canvas.height],
          effectiveDpr: +(canvas.width / canvas.getBoundingClientRect().width).toFixed(2),
        };
      });
  }, duration);
}
try {
  await mkdir("docs/pass4", { recursive: true });
  if (process.argv.includes("--frames")) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 700 } });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base + "/playground/visual/iris");
    await page.waitForSelector("canvas");
    await page.waitForTimeout(1000);
    await page.locator(".visual-export").screenshot({ path: "public/frames/signal/iris.png" });
    console.log("Captured native hero-51 iris reduced-motion frame");
  } else {
    for (const device of [
      { name: "desktop", width: 1440, height: 1000, mobile: false, dpr: 1 },
      { name: "iphone-390", width: 390, height: 844, mobile: true, dpr: 3 },
      { name: "android-412", width: 412, height: 915, mobile: true, dpr: 2.625 },
    ]) {
      if ((supportOnly || introOnly) && !device.mobile) continue;
      await mkdir("docs/pass4/" + device.name, { recursive: true });
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        isMobile: device.mobile,
        hasTouch: device.mobile,
        deviceScaleFactor: device.dpr,
        reducedMotion: "no-preference",
      });
      await context.addInitScript(instrument);
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push({ device: device.name, error: error.message }));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push({ device: device.name, error: message.text() });
      });
      const cdp = await context.newCDPSession(page);
      if (device.mobile) {
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
      for (const path of supportOnly || introOnly ? [] : routes) {
        const response = await page.goto(base + path, { waitUntil: "domcontentloaded" });
        const hero = page.locator(path === "/" ? ".hero-stage" : ".page-hero").first();
        await hero.locator("canvas").first().waitFor({ state: "attached", timeout: 45000 });
        await page.waitForTimeout(1400);
        const fps = device.mobile ? await measure(page) : [];
        await page.screenshot({
          path:
            "docs/pass4/" + device.name + "/" + (path === "/" ? "home" : path.slice(1)) + ".png",
        });
        records.push({
          device: device.name,
          path,
          status: response.status(),
          hero: await hero.boundingBox(),
          overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          fps,
          maxContexts: await page.evaluate(() => window.__pass4.maxContexts),
        });
        console.log(JSON.stringify(records.at(-1)));
      }
      if (!supportOnly && !introOnly && device.name !== "android-412")
        for (const slug of ["clarity", "relay", "forma"]) {
          await page.goto(base + "/work/" + slug);
          await page.waitForTimeout(800);
          await page.screenshot({ path: "docs/pass4/" + device.name + "/case-" + slug + ".png" });
        }
      if (device.mobile) {
        if (!supportOnly) {
          await page.goto(base + "/?intro=replay", { waitUntil: "domcontentloaded" });
          await page.waitForSelector('[data-intro-phase="playing"]', { timeout: 45000 });
          await page
            .locator(".site-intro")
            .screenshot({ path: "docs/pass4/" + device.name + "/intro.png" });
          await page.waitForSelector(".site-intro", { state: "detached", timeout: 10000 });
          records.push(
            await page.evaluate((device) => {
              const state = window.__pass4;
              const first = state.beats.find((item) => item.phase === "playing");
              const last = state.beats.at(-1);
              const entry = [...state.frames].find(
                ([canvas]) => canvas.closest?.(".intro-stone") || !canvas.isConnected,
              );
              const frames = entry?.[1] || [];
              return {
                device,
                path: "intro",
                beats: state.beats,
                observedTimelineMs: last && first ? Math.round(last.time - first.time) : null,
                renderedStoneFrames: frames.length,
                maxContexts: state.maxContexts,
              };
            }, device.name),
          );
          if (!introOnly) {
            await page.goto(base + "/services");
            await page.locator(".service-stage-visual").scrollIntoViewIfNeeded();
            for (const id of ["web", "saas", "ai", "mobile", "cloud", "design"]) {
              await page.locator("#service-tab-" + id).click();
              await page.locator(".service-stage-visual").scrollIntoViewIfNeeded();
              await page.waitForFunction((id) => {
                const node = document.querySelector('[data-story="' + id + '"]');
                return (
                  node &&
                  Number(node.getAttribute("data-time")) > 1000 &&
                  node.querySelector("canvas")
                );
              }, id);
              records.push({
                device: device.name,
                path: "/services#" + id,
                fps: await measure(page, 1600),
                maxContexts: await page.evaluate(() => window.__pass4.maxContexts),
              });
              console.log(JSON.stringify(records.at(-1)));
            }
          }
        }
        for (const [path, selector] of introOnly
          ? []
          : [
              ["/process", ".tech-section"],
              ["/process", ".architecture-stage"],
              ["/about", ".where-globe"],
              ["/about", ".footer-wordmark"],
            ]) {
          if (supportOnly && path !== "/about") continue;
          await page.goto(base + path);
          await page.waitForSelector(".page-hero canvas", { timeout: 30000 });
          await page.locator(selector).scrollIntoViewIfNeeded();
          await page
            .locator(selector + " canvas")
            .first()
            .waitFor({ state: "attached", timeout: 30000 });
          await page.waitForTimeout(selector === ".where-globe" ? 2200 : 700);
          if (selector === ".footer-wordmark")
            await page
              .locator(selector)
              .screenshot({ path: "docs/pass4/" + device.name + "/footer.png" });
          records.push({
            device: device.name,
            path: path + " " + selector,
            fps: await measure(page, 1600),
            maxContexts: await page.evaluate(() => window.__pass4.maxContexts),
          });
        }
      }
      await context.close();
    }
    await writeFile(
      "docs/pass4/results.json",
      JSON.stringify(
        {
          environment:
            "Local Chrome DevTools emulation; mobile DPR 3 / 2.625, touch, 4x CPU slowdown, 4 Mbps download, 40 ms latency. SwiftShader enabled; not a physical-device benchmark.",
          records,
          errors,
        },
        null,
        2,
      ) + "\n",
    );
    if (errors.length) throw new Error(JSON.stringify(errors));
  }
} finally {
  if (records.length)
    await writeFile(
      "docs/pass4/results.json",
      JSON.stringify(
        {
          environment:
            "Chrome DevTools emulation: touch, DPR 3 / 2.625, 4x CPU, 4 Mbps download, 40 ms latency. Local host display cadence; not physical phone FPS.",
          records,
          errors,
        },
        null,
        2,
      ) + "\n",
    );
  await browser.close();
}
