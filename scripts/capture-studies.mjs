import { chromium } from "@playwright/test";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { sourceCatalog } from "../lib/originkit-catalog.ts";

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-webgl", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"],
});
const selected = process.env.STUDY_SLUG;
const results = selected
  ? JSON.parse(await readFile("docs/playground-results.json", "utf8")).filter(
      (item) => item.slug !== selected,
    )
  : [];
try {
  await mkdir("docs/shots", { recursive: true });
  await mkdir("docs/shots/presets", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (...args) {
      const context = original.apply(this, args);
      if (context) this.dataset.renderContext = String(args[0]);
      return context;
    };
  });
  let errors = [];
  page.on("pageerror", (error) => errors.push({ type: "exception", message: error.message }));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push({ type: "console", message: message.text() });
  });
  await page.goto(`${process.env.BASE_URL || "http://localhost:3000"}/playground`, {
    waitUntil: "domcontentloaded",
  });
  for (const item of sourceCatalog) {
    if (selected && item.slug !== selected) continue;
    errors = [];
    const panel = page.locator(`[data-panel="${item.slug}"]`);
    await panel.scrollIntoViewIfNeeded();
    await panel.locator("iframe").first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(item.slug === "paperline-archive" ? 7000 : 2500);
    const frames = [];
    for (const element of await panel.locator("iframe").all()) {
      const handle = await element.elementHandle();
      const frame = await handle?.contentFrame();
      if (!frame) continue;
      await frame.waitForSelector(".source-render", { timeout: 20000 });
      if (!("rendering" in item && item.rendering === "dom")) {
        try {
          await frame.waitForSelector("canvas", { timeout: 16000 });
        } catch {}
      }
      if (item.slug === "aura-cursor") {
        const box = await element.boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.4);
          await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.6, { steps: 8 });
        }
      }
      const canvases = await frame.locator("canvas").evaluateAll((nodes) =>
        nodes.map((c) => ({
          width: c.width,
          height: c.height,
          context: c.dataset.renderContext || "unknown",
          visible: c.getBoundingClientRect().width > 0 && c.getBoundingClientRect().height > 0,
        })),
      );
      frames.push({ url: frame.url(), canvases });
      if (frame.url().includes("palette=editorial"))
        await frame
          .locator(".source-render")
          .screenshot({ path: `docs/shots/presets/${item.slug}.png`, timeout: 30000 });
    }
    await panel.screenshot({ path: `docs/shots/${item.slug}.png`, timeout: 30000 });
    const entry = {
      slug: item.slug,
      frames,
      errors: [...errors],
      screenshot: `docs/shots/${item.slug}.png`,
    };
    results.push(entry);
    results.sort(
      (a, b) =>
        sourceCatalog.findIndex((item) => item.slug === a.slug) -
        sourceCatalog.findIndex((item) => item.slug === b.slug),
    );
    await writeFile("docs/playground-results.json", JSON.stringify(results, null, 2) + "\n");
    console.log(
      JSON.stringify({
        slug: item.slug,
        canvases: frames.map((f) => f.canvases.length),
        errors: errors.map((e) => e.message),
      }),
    );
  }
} finally {
  await browser.close();
}
