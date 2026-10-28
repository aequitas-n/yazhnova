import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const output = "docs/hero-viewport";
const handImage = await sharp("public/originkit/dither-reveal/hands-diagonal.webp").metadata();
const handAspect = handImage.width / handImage.height;
await mkdir(output, { recursive: true });
const results = [];
try {
  for (const [width, height] of [
    [1920, 720],
    [1920, 900],
    [1920, 1080],
    [1880, 900],
    [1440, 900],
    [1366, 768],
    [1280, 720],
    [768, 1024],
    [768, 1366],
    [393, 720],
    [3840, 1080],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      isMobile: width < 768,
      hasTouch: width <= 768,
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
    await page.goto(process.env.BASE_URL || "http://localhost:3000");
    await page.waitForSelector('.hero-art [data-ready="true"]');
    await page.waitForSelector('.hero-stone [data-ready="true"]');
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate((imageAspect) => {
      const box = (selector) => {
        const rect = document.querySelector(selector).getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
      };
      const visual = box(".hero-visual-space");
      const stone = box(".hero-stone");
      const handImageWidth = Math.max(visual.width, visual.height * imageAspect);
      return {
        width: innerWidth,
        height: innerHeight,
        hero: box(".stone-hands-hero"),
        title: box("#hero-title"),
        description: box(".hero-description"),
        nav: box(".site-nav"),
        canvas: box(".hero-art canvas"),
        visual,
        stone,
        handImageWidth,
        stoneToHands: stone.width / handImageWidth,
        support: box(".hero-support"),
        baseline: box(".hero-baseline"),
        canvases: document.querySelectorAll(".hero-visual-space canvas").length,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    }, handAspect);
    const { data, info } = await sharp(await page.screenshot())
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let left = 0,
      right = 0;
    const band = 12;
    const edgeStart = Math.ceil(layout.nav.bottom);
    const edgeEnd = Math.min(info.height - 1, Math.floor(layout.baseline.top));
    for (let y = edgeStart; y < edgeEnd; y++)
      for (let x = 0; x < band; x++) {
        for (const side of ["left", "right"]) {
          const column = side === "left" ? x : info.width - 1 - x;
          const offset = (y * info.width + column) * info.channels;
          if (Math.max(data[offset], data[offset + 1], data[offset + 2]) < 210) {
            if (side === "left") left++;
            else right++;
          }
        }
      }
    const edgeCoverage = {
      left: left / (band * (edgeEnd - edgeStart)),
      right: right / (band * (edgeEnd - edgeStart)),
    };
    await page.screenshot({ path: `${output}/${width}x${height}-live.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator(".hero-art img").waitFor();
    await page.locator(".hero-art img").evaluate((image) => image.decode());
    const staticFrame = await page.locator(".hero-art img").evaluate((image, imageAspect) => {
      const rect = image.getBoundingClientRect();
      const mobile = innerWidth < 768;
      const capturedHandWidth = Math.max(
        image.naturalWidth,
        (image.naturalHeight - (mobile ? 0 : 560)) * imageAspect,
      );
      const scale = mobile
        ? Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight)
        : rect.width / image.naturalWidth;
      const stone = document.querySelector(".hero-stone").getBoundingClientRect();
      return {
        staticSource: image.currentSrc,
        staticStoneToHands: stone.width / (capturedHandWidth * scale),
      };
    }, handAspect);
    await page.screenshot({ path: `${output}/${width}x${height}.png` });
    const result = { ...layout, edgeCoverage, ...staticFrame, errors };
    results.push(result);
    console.log(JSON.stringify(result));
    if (
      errors.length ||
      layout.overflow ||
      layout.stoneToHands > 0.2705 ||
      staticFrame.staticStoneToHands > 0.2705 ||
      (width >= 768 &&
        (layout.hero.height > height + 1 ||
          layout.description.top < layout.title.bottom ||
          layout.description.bottom >= layout.visual.top ||
          layout.support.top <= layout.visual.bottom ||
          layout.canvas.top >= layout.visual.top ||
          layout.canvas.bottom <= layout.visual.bottom ||
          layout.baseline.bottom > height ||
          Math.min(edgeCoverage.left, edgeCoverage.right) < 0.04))
    )
      throw new Error("Viewport framing failed; inspect the capture report");
    await page.close();
  }
  const fixedWidth = results.filter((row) => row.width === 1920).map((row) => row.stone.width);
  if (Math.max(...fixedWidth) - Math.min(...fixedWidth) > 1)
    throw new Error("Changing viewport height changed the stone size independently of the hands");
  await writeFile(`${output}/layout.json`, JSON.stringify(results, null, 2) + "\n");
} finally {
  await browser.close();
}
