import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const base = process.env.BASE_URL || "http://localhost:3000";
const ids = ["web", "saas", "ai", "mobile", "cloud", "design"];
const mode = process.argv.includes("--frames") ? "frames" : process.env.CAPTURE_PASS3 || "report";
const errors = [],
  records = [];
try {
  await mkdir("public/frames/stories", { recursive: true });
  await mkdir("docs/pass3", { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  if (mode === "frames") {
    await page.setViewportSize({ width: 1200, height: 850 });
    for (const id of ids) {
      await page.goto(base + "/playground/story/" + id + "?time=5600");
      await page.waitForSelector('.service-story[data-time="5600"]');
      await page.waitForSelector(".visual-canvas canvas");
      await page.waitForTimeout(500);
      await page
        .locator(".service-story-scene")
        .screenshot({ path: "public/frames/stories/" + id + ".png" });
      if (id === "mobile")
        await page
          .locator(".story-phone")
          .screenshot({ path: "public/frames/stories/mobile-phone.png" });
      records.push({
        id,
        final: true,
        canvases: await page.locator(".visual-canvas canvas").count(),
      });
    }
    for (const [time, name] of [
      [1450, "wireframe"],
      [3200, "build"],
      [5600, "live"],
    ]) {
      await page.goto(base + "/playground/story/web?time=" + time);
      await page.waitForSelector('.service-story[data-time="' + time + '"]');
      await page.waitForTimeout(300);
      await page
        .locator(".service-story-scene")
        .screenshot({ path: "docs/pass3/web-" + name + ".png" });
    }
  } else {
    await page.goto(base + "/services");
    await page.locator(".service-stage-visual").scrollIntoViewIfNeeded();
    for (const id of ids) {
      await page.locator("#service-tab-" + id).click();
      await page.waitForFunction((value) => {
        const node = document.querySelector('[data-story="' + value + '"]');
        return (
          node &&
          Number(node.getAttribute("data-time")) > 2650 &&
          node.getAttribute("data-state") !== "static"
        );
      }, id);
      await page.locator(".service-stage").screenshot({
        path: "docs/pass3/tab-" + id + "-mid.png",
        style: ".site-nav,.skip-link{visibility:hidden!important}",
      });
      records.push({
        id,
        time: await page.locator(".service-story").getAttribute("data-time"),
        phase: await page.locator('.story-caption [aria-current="step"]').innerText(),
      });
    }
    await page.goto(base + "/work");
    const work = page.locator(".work-horizontal");
    await work.scrollIntoViewIfNeeded();
    const box = await work.boundingBox();
    const start = await work.evaluate((node) => node.getBoundingClientRect().top + scrollY - 76);
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), start);
    await page.waitForTimeout(800);
    await page.locator(".work-track-viewport").screenshot({
      path: "docs/pass3/work-desktop.png",
      style: ".site-nav,.skip-link{visibility:hidden!important}",
    });
    await page.evaluate(
      (top) => window.scrollTo({ top, behavior: "instant" }),
      start + (box?.height ?? 0) - 924,
    );
    await page.waitForTimeout(800);
    await page.locator(".work-track-viewport").screenshot({
      path: "docs/pass3/work-last-panel.png",
      style: ".site-nav,.skip-link{visibility:hidden!important}",
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base);
    for (const visual of await page.locator(".case-panel .project-spotlight").all()) {
      await visual.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
    }
    await page.locator(".work-section").screenshot({
      path: "docs/pass3/work-mobile.png",
      style: ".site-nav,.skip-link{visibility:hidden!important}",
    });
  }
  await writeFile(
    "docs/pass3/" + mode + "-results.json",
    JSON.stringify({ records, errors }, null, 2) + "\n",
  );
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(JSON.stringify({ mode, captures: records.length, errors }));
} finally {
  await browser.close();
}
