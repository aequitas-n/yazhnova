import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const errors = [];
const observations = [];
try {
  await mkdir("docs/shots/production", { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(process.env.BASE_URL || "http://localhost:3000");
  for (const [name, selector] of [
    ["hero", ".hero-stage"],
    ["services", ".services-section"],
    ["agents", ".agents-section"],
    ["process", ".process-section"],
    ["technology", ".tech-section"],
    ["work", ".work-section"],
  ]) {
    const section = page.locator(selector);
    await section.scrollIntoViewIfNeeded();
    if (name === "agents") await page.locator(".workflow-demo").scrollIntoViewIfNeeded();
    await page.waitForTimeout(name === "agents" ? 3300 : 1300);
    if (name === "hero")
      assert.equal(
        await section.locator('[data-source="scrambletext"] .native-copy-overlay').count(),
        1,
      );
    if (name === "services") assert.equal(await section.locator(".line-mask-split").count(), 1);
    if (name === "agents") assert.equal(await section.locator(".msg-item").count(), 3);
    if (name === "technology") assert.equal(await section.locator("svg textPath").count(), 1);
    if (name === "work") {
      await page.locator(".project-spotlight").hover();
      assert.equal(await section.locator(".spotlight-source img").count(), 1);
    }
    await section.screenshot({
      path: `docs/shots/production/${name}.png`,
      style: ".site-nav { visibility: hidden !important; }",
    });
    observations.push({
      section: name,
      canvases: await section.locator("canvas").count(),
      nativeSources: await section
        .locator("[data-source]")
        .evaluateAll((nodes) => nodes.map((node) => node.dataset.source)),
    });
  }
  const cta = page.locator(".hero-actions .native-button-border");
  await cta.scrollIntoViewIfNeeded();
  await cta.hover();
  await page.waitForSelector(".hero-actions .button-border-source > div");
  await page.mouse.move(0, 0);
  await page.waitForFunction(() => !document.querySelector(".hero-actions .button-border-source"));
  await page.goto(`${process.env.BASE_URL || "http://localhost:3000"}/contact`);
  await page.waitForSelector('[data-visual="fluid"] canvas');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "docs/shots/production/contact.png", fullPage: true });
  assert.deepEqual(errors, []);
  await writeFile(
    "docs/production-review-results.json",
    JSON.stringify({ observations, errors }, null, 2) + "\n",
  );
  console.log(JSON.stringify({ observations, errors }, null, 2));
} finally {
  await browser.close();
}
