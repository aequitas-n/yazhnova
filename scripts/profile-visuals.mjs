import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { once } from "node:events";

const base = process.env.BASE_URL || "http://localhost:3001";
await mkdir("docs/performance", { recursive: true });
await mkdir("artifacts/performance-traces", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const results = [];
try {
  for (const [form, width, height] of [
    ["mobile", 390, 844],
    ["desktop", 1440, 1000],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      hasTouch: form === "mobile",
      isMobile: form === "mobile",
    });
    await context.addInitScript(() => {
      sessionStorage.setItem("yazhnova:intro:v1", "1");
      const state = {
        label: "startup",
        tasks: [],
        draws: new Map(),
        maximumCanvases: 0,
        maximumContexts: 0,
        contexts: new Set(),
      };
      window.visualProfile = state;
      new PerformanceObserver((list) => {
        for (const task of list.getEntries())
          state.tasks.push({ label: state.label, duration: task.duration, start: task.startTime });
      }).observe({ type: "longtask", buffered: true });
      const nativeFrame = window.requestAnimationFrame;
      let stamp = 0;
      window.requestAnimationFrame = (callback) =>
        nativeFrame.call(window, (time) => {
          stamp = time;
          callback(time);
        });
      const nativeContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (...args) {
        const gl = nativeContext.apply(this, args);
        if (gl && String(args[0]).startsWith("webgl") && !state.contexts.has(gl)) {
          state.contexts.add(gl);
          for (const name of [
            "drawArrays",
            "drawElements",
            "drawArraysInstanced",
            "drawElementsInstanced",
          ]) {
            if (!gl[name]) continue;
            const draw = gl[name].bind(gl);
            gl[name] = (...values) => {
              if (!state.draws.has(this)) state.draws.set(this, new Set());
              state.draws.get(this).add(stamp);
              return draw(...values);
            };
          }
        } else if (gl && args[0] === "2d" && !this.dataset.profiled) {
          this.dataset.profiled = "true";
          const clear = gl.clearRect.bind(gl);
          gl.clearRect = (...values) => {
            if (!state.draws.has(this)) state.draws.set(this, new Set());
            state.draws.get(this).add(stamp);
            return clear(...values);
          };
        }
        return gl;
      };
      function sample() {
        state.maximumCanvases = Math.max(
          state.maximumCanvases,
          document.querySelectorAll('[data-mode="live"] canvas').length,
        );
        state.maximumContexts = Math.max(
          state.maximumContexts,
          [...state.contexts].filter((gl) => !gl.isContextLost()).length,
        );
        nativeFrame.call(window, sample);
      }
      nativeFrame.call(window, sample);
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const cdp = await context.newCDPSession(page);
    await cdp.send("Tracing.start", {
      categories: "devtools.timeline,v8.execute",
      transferMode: "ReturnAsStream",
    });
    for (const [route, selector, tab] of [
      ["/", ".hero-visual-space"],
      ["/contact", ".contact-rain-scene"],
      ["/services", ".service-stage-visual", "web"],
      ["/services", ".service-stage-visual", "saas"],
      ["/about", ".where-globe"],
    ]) {
      await page.goto(base + route);
      await page.evaluate((label) => {
        window.visualProfile.label = label;
      }, route);
      if (tab) await page.locator(`#service-tab-${tab}`).click();
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForSelector(`${selector} canvas`);
      if (route === "/about") await page.waitForSelector(`${selector} [data-ready="true"]`);
      if (route === "/contact") await page.waitForSelector(`${selector} [data-ready="true"]`);
      if (route === "/") {
        await page.waitForSelector('.hero-art [data-ready="true"]');
        await page.waitForSelector('.hero-stone [data-ready="true"]');
      }
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        window.visualProfile.draws.clear();
      });
      const started = Date.now();
      await page.waitForTimeout(2400);
      const period = Date.now() - started;
      const row = await page.evaluate(
        ({ period, route, tab, form }) => {
          const state = window.visualProfile;
          return {
            route,
            tab,
            form,
            period,
            maximumCanvases: state.maximumCanvases,
            maximumContexts: state.maximumContexts,
            tasks: state.tasks,
            canvases: [...state.draws]
              .filter(([canvas]) => canvas.isConnected)
              .map(([canvas, times]) => ({
                kind: canvas.closest("[data-visual]")?.dataset.visual,
                framesPerSecond:
                  times.size > 1
                    ? ((times.size - 1) * 1000) / (Math.max(...times) - Math.min(...times))
                    : 0,
                submittedFrames: times.size,
                bufferWidth: canvas.width,
                displayWidth: canvas.getBoundingClientRect().width,
              })),
          };
        },
        { period, route, tab, form },
      );
      results.push({ ...row, errors: [...errors] });
      console.log(JSON.stringify({ ...row, tasks: row.tasks.length }));
      if (row.maximumCanvases > 2 || row.maximumContexts > 2 || errors.length)
        throw new Error("Visual runtime profile failed");
      if (route === "/" || route === "/contact")
        await page.screenshot({
          path: `docs/performance/${route === "/" ? "home" : "contact"}-${form}.png`,
        });
    }
    const complete = once(cdp, "Tracing.tracingComplete");
    await cdp.send("Tracing.end");
    const [event] = await complete;
    let trace = "";
    while (true) {
      const chunk = await cdp.send("IO.read", { handle: event.stream });
      trace += chunk.data;
      if (chunk.eof) break;
    }
    await cdp.send("IO.close", { handle: event.stream });
    await writeFile(`artifacts/performance-traces/${form}.json`, trace);
    await context.close();
  }
  await writeFile("docs/performance/visual-profile.json", JSON.stringify(results, null, 2) + "\n");
} finally {
  await browser.close();
}
