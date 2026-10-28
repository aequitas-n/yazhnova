import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.BASE_URL || "http://localhost:3000";
const output = "docs/story-proportions";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const results = [];
try {
  for (const [width, height] of [
    [390, 844],
    [412, 915],
    [1440, 1000],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      isMobile: width < 768,
      hasTouch: width < 768,
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const id of ["web", "saas", "design", "ai"]) {
      await page.goto(`${base}/playground/story/${id}?time=3400`);
      await page.waitForSelector(".visual-canvas canvas");
      await page.waitForSelector('.service-story[data-time="3400"]');
      await page.evaluate(() => document.fonts.ready);
      const geometry = await page
        .locator(id === "ai" ? ".story-core" : ".story-board")
        .evaluate((node) => {
          const rect = node.getBoundingClientRect();
          const canvas = node.querySelector("canvas");
          return {
            width: rect.width,
            height: rect.height,
            ratio: rect.width / rect.height,
            canvas: { width: canvas.width, height: canvas.height },
          };
        });
      await page.locator(".service-story").screenshot({ path: `${output}/${id}-${width}.png` });
      results.push({ id, viewport: { width, height }, ...geometry, errors: [...errors] });
      if (Math.abs(geometry.ratio - (id === "ai" ? 1 : 1000 / 760)) > 0.005 || errors.length)
        throw new Error("Story proportions review failed");
    }
    await page.close();
  }
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${base}/services`);
  for (const id of ["web", "saas", "design"]) {
    await page.locator(`#service-tab-${id}`).click();
    await page
      .locator(`.service-story[data-story="${id}"] img`)
      .evaluate((image) => image.decode());
    await page.locator(".service-story").screenshot({ path: `${output}/${id}-static.png` });
  }
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2) + "\n");
  console.log(
    JSON.stringify({ captures: results.length + 3, errors: results.flatMap((row) => row.errors) }),
  );
} finally {
  await browser.close();
}
