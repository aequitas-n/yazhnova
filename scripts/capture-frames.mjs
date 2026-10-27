import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const kinds = [
  "liquid",
  "glossy",
  "sparks",
  "strings",
  "fluid",
  "deck",
  "hero-dither",
  "manifesto",
  "pixels",
  "network",
  "horizon",
  "glassbound",
  "shadow",
  "ocean",
  "rain",
  "ember",
  "wordmark",
];
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const report = [];
try {
  await mkdir("public/frames", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 700 },
    deviceScaleFactor: 1,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const kind of kinds) {
    if (process.env.FRAME_KINDS && !process.env.FRAME_KINDS.split(",").includes(kind)) continue;
    await page.setViewportSize({ width: 1200, height: 700 });
    let errors = [];
    const listener = (e) => errors.push(e.message);
    page.on("pageerror", listener);
    await page.goto(
      `${process.env.BASE_URL || "http://localhost:3000"}/playground/visual/${kind}`,
      { waitUntil: "domcontentloaded" },
    );
    await page.waitForSelector("canvas", { timeout: 30000 });
    await page.waitForTimeout(kind === "ember" ? 2500 : 900);
    await page.locator(".visual-export").screenshot({ path: `public/frames/${kind}.png` });
    if (kind === "hero-dither") {
      await page.setViewportSize({ width: 1114, height: 1411 });
      await page.waitForTimeout(300);
      await page.locator(".visual-export").screenshot({ path: "public/frames/hero-hands.png" });
    }
    report.push({ kind, canvases: await page.locator("canvas").count(), errors });
    page.off("pageerror", listener);
    console.log(JSON.stringify(report.at(-1)));
  }
  const existing = process.env.FRAME_KINDS
    ? JSON.parse(await readFile("docs/visual-frame-results.json", "utf8").catch(() => "[]"))
    : [];
  const results = [
    ...existing.filter((row) => !report.some((latest) => latest.kind === row.kind)),
    ...report,
  ];
  await writeFile("docs/visual-frame-results.json", JSON.stringify(results, null, 2) + "\n");
} finally {
  await browser.close();
}
