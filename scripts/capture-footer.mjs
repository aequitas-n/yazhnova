import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  channel: "chrome",
  args: ["--enable-unsafe-swiftshader"],
});
const base = process.env.BASE_URL || "http://localhost:3000";
const output = "docs/footer-ridge";
const results = [];
await mkdir(output, { recursive: true });
try {
  for (const [name, width, height, reduced] of [
    ["desktop", 1440, 1000, false],
    ["iphone", 390, 844, false],
    ["android", 412, 915, false],
    ["reduced-motion", 390, 844, true],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: width < 768 ? 3 : 2,
      isMobile: width < 768,
      hasTouch: width < 768,
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    await context.addInitScript(() => {
      sessionStorage.setItem("yazhnova:intro:v1", "1");
      const original = HTMLCanvasElement.prototype.getContext;
      const contexts = new Set();
      window.__maxContexts = 0;
      HTMLCanvasElement.prototype.getContext = function (...args) {
        const result = original.apply(this, args);
        if (result && String(args[0]).startsWith("webgl")) {
          contexts.add(result);
          this.dataset.renderContext = String(args[0]);
        }
        return result;
      };
      function sample() {
        window.__maxContexts = Math.max(
          window.__maxContexts,
          [...contexts].filter((context) => !context.isContextLost()).length,
        );
        requestAnimationFrame(sample);
      }
      requestAnimationFrame(sample);
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(`${base}/about`);
    // Wait for hydration before jumping past all intermediate sections.
    // This also gives the incoming chapter wipe time to finish.
    await page.waitForFunction(
      () =>
        document.querySelector('[data-visual="plasma"]')?.dataset.mode ===
        (matchMedia("(prefers-reduced-motion: reduce)").matches ? "static" : "live"),
    );
    await page.waitForTimeout(650);
    await page.locator(".footer-wordmark").scrollIntoViewIfNeeded();
    const ridge = page.locator('.site-footer [data-visual="ridge"]');
    if (reduced) {
      await ridge.locator("img").waitFor();
      await ridge.locator("img").evaluate((image) => image.decode());
    } else {
      await ridge.locator("canvas").waitFor();
      await page.locator(".footer-wordmark canvas").waitFor();
    }
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1400);
    const first = reduced ? null : await ridge.locator("canvas").screenshot();
    await page.waitForTimeout(350);
    const second = reduced ? null : await ridge.locator("canvas").screenshot();
    const observation = await ridge.evaluate((element) => {
      const canvas = element.querySelector("canvas");
      const box = canvas?.getBoundingClientRect();
      return {
        mode: element.dataset.mode,
        canvas: canvas
          ? { width: canvas.width, height: canvas.height, dpr: canvas.width / box.width }
          : null,
        overflow: document.documentElement.scrollWidth > innerWidth,
        maxContexts: window.__maxContexts,
        footerCanvases: document.querySelectorAll(".site-footer canvas").length,
      };
    });
    await page.locator(".site-footer").screenshot({ path: `${output}/${name}.png` });
    await page.screenshot({ path: `${output}/${name}-viewport.png` });
    await page.locator("main h1").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const disposed = (await page.locator(".site-footer canvas").count()) === 0;
    const row = {
      name,
      width,
      height,
      reduced,
      ...observation,
      animated: first ? !first.equals(second) : false,
      disposedOffscreen: disposed,
      errors,
    };
    results.push(row);
    console.log(JSON.stringify(row));
    await context.close();
  }
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2) + "\n");
  if (
    results.some(
      (row) =>
        row.errors.length ||
        row.overflow ||
        row.maxContexts > 2 ||
        !row.disposedOffscreen ||
        (!row.reduced && !row.animated),
    )
  ) {
    throw new Error("Footer review failed; inspect docs/footer-ridge/results.json");
  }
} finally {
  await browser.close();
}
