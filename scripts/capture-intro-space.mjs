import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const output = "docs/intro-space";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const results = [];
try {
  for (const [name, width, height] of [
    ["desktop", 1920, 1080],
    ["mobile", 390, 844],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      isMobile: name === "mobile",
      hasTouch: name === "mobile",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(`${process.env.BASE_URL || "http://localhost:3000"}/?intro=replay`);
    await page.waitForSelector('.site-intro[data-intro-beat="wordmark"]');
    const canvas = await page.locator(".intro-stone canvas").evaluate((element) => {
      window.introSpaceCanvas = element;
      const rect = element.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    });
    const screenshot = await page.screenshot({ path: `${output}/${name}-opened.png` });
    const { data, info } = await sharp(screenshot)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const side = Math.min(width, height);
    const old = { left: (width - side) / 2, top: (height - side) / 2 };
    let outsidePixels = 0;
    for (let y = 4; y < info.height - 4; y++) {
      for (let x = 4; x < info.width - 4; x++) {
        if (
          x >= old.left - 4 &&
          x <= old.left + side + 4 &&
          y >= old.top - 4 &&
          y <= old.top + side + 4
        )
          continue;
        const i = (y * info.width + x) * info.channels;
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
        // Exclude the ink background and paper wordmark; count native rock/veins.
        if (
          (Math.min(r, g, b) > 26 && Math.max(r, g, b) < 205) ||
          (r > 95 && r > g * 1.4 && r > b * 1.4)
        )
          outsidePixels++;
      }
    }
    await page.waitForSelector(".site-intro", { state: "detached" });
    const sameCanvas = await page
      .locator(".hero-stone canvas")
      .evaluate((element) => element === window.introSpaceCanvas);
    await page.screenshot({ path: `${output}/${name}-docked.png` });
    const row = { name, width, height, canvas, outsidePixels, sameCanvas, errors };
    results.push(row);
    console.log(JSON.stringify(row));
    if (
      Math.abs(canvas.width - width) > 1 ||
      Math.abs(canvas.height - height) > 1 ||
      Math.abs(canvas.x) > 1 ||
      Math.abs(canvas.y) > 1 ||
      !sameCanvas ||
      outsidePixels < 100 ||
      errors.length
    )
      throw new Error("Intro space review failed");
    await page.close();
  }
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2) + "\n");
} finally {
  await browser.close();
}
