import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const only = process.env.CAPTURE_SECTIONS?.split(",");
const phase = process.env.CAPTURE_PHASE || "after";
const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-unsafe-swiftshader"] });
const sections = [
  ["hero", ".hero-section"],
  ["manifesto", ".manifesto-section"],
  ["services", ".services-section"],
  ["agents", ".agents-section"],
  ["process", ".process-section"],
  ["technology", ".tech-section"],
  ["work", ".work-section"],
  ["engage", ".engage-section"],
  ["proof", phase === "before" ? ".testimonials-section" : ".proof-section"],
  ["faq", ".faq-section"],
  ["cta", ".final-cta"],
  ["footer", ".site-footer"],
];
const report = [];
try {
  for (const mobile of [false, true]) {
    const device = mobile ? "mobile" : "desktop";
    const dir = `docs/cohesion/${phase}/${device}`;
    await mkdir(dir, { recursive: true });
    const page = await browser.newPage({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
      reducedMotion: mobile ? "reduce" : "no-preference",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
    await page.goto(base);
    for (const [name, selector] of sections) {
      if (only && !only.includes(name)) continue;
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(mobile ? 180 : name === "technology" ? 4200 : 1600);
      await section.screenshot({
        path: `${dir}/${name}.png`,
        style: ".site-nav, .skip-link { visibility: hidden !important; }",
      });
      report.push({
        device,
        section: name,
        canvases: await section.locator("canvas").count(),
        height: await section.evaluate((node) => node.getBoundingClientRect().height),
      });
    }
    if (!only || only.includes("contact")) {
      await page.goto(`${base}/contact`);
      await page.waitForTimeout(mobile ? 300 : 1500);
      await page.locator("main").screenshot({
        path: `${dir}/contact.png`,
        style: ".site-nav { visibility: hidden !important; }",
      });
      report.push({ device, section: "contact", errors });
    }
    if (!mobile && (!only || only.includes("intro"))) {
      await page.goto(`${base}/?intro=replay`);
      await page.waitForSelector('[data-intro-beat="wordmark"]', { timeout: 18000 });
      await page.locator(".site-intro").screenshot({ path: `${dir}/intro.png` });
    }
    await page.close();
  }
  const previous = only
    ? JSON.parse(await readFile(`docs/cohesion/${phase}/results.json`, "utf8"))
    : [];
  const merged = [
    ...previous.filter(
      (row) =>
        !report.some((entry) => entry.device === row.device && entry.section === row.section),
    ),
    ...report,
  ];
  await writeFile(`docs/cohesion/${phase}/results.json`, JSON.stringify(merged, null, 2) + "\n");
  console.log(JSON.stringify({ phase, captured: report.length }));
} finally {
  await browser.close();
}
