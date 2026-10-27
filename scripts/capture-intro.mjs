import { chromium } from "@playwright/test";
import { writeFile, copyFile } from "node:fs/promises";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  recordVideo: { dir: "artifacts/intro-video", size: { width: 1440, height: 1000 } },
});
let videoPath;
try {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => {
    window.introBeats = [];
    const observer = new MutationObserver(() => {
      const node = document.querySelector(".site-intro");
      if (!node) return;
      const key = node.dataset.introPhase + ":" + node.dataset.introBeat;
      if (window.introBeats.at(-1)?.key !== key)
        window.introBeats.push({ key, time: performance.now() });
    });
    observer.observe(document, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-intro-phase", "data-intro-beat"],
    });
  });
  await page.goto(`${process.env.BASE_URL || "http://localhost:3000"}/?intro=replay`);
  await page.waitForSelector('.site-intro[data-intro-phase="playing"] canvas', { timeout: 15000 });
  await page.waitForTimeout(450);
  await page.screenshot({ path: "artifacts/intro-01-stone.png" });
  await page.waitForSelector('.site-intro[data-intro-beat="wordmark"]', { timeout: 10000 });
  await page.screenshot({ path: "artifacts/intro-02-wordmark.png" });
  await page.waitForSelector('.site-intro[data-intro-beat="reformed"]', { timeout: 8000 });
  await page.screenshot({ path: "artifacts/intro-03-reformed.png" });
  await page.waitForSelector('.site-intro[data-intro-phase="revealing"]', { timeout: 8000 });
  await page.waitForTimeout(250);
  await page.screenshot({ path: "artifacts/intro-04-reveal.png" });
  await page.waitForSelector(".site-intro", { state: "detached", timeout: 8000 });
  await page.screenshot({ path: "artifacts/intro-05-hero.png" });
  videoPath = await page.video().path();
  const result = {
    errors,
    beats: await page.evaluate(() => window.introBeats),
    video: "artifacts/intro-preview.webm",
  };
  console.log(JSON.stringify(result));
  await writeFile("artifacts/intro-preview-results.json", JSON.stringify(result, null, 2));
  if (errors.length) process.exitCode = 1;
} finally {
  await context.close();
  await browser.close();
}
if (videoPath) await copyFile(videoPath, "artifacts/intro-preview.webm");
