import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
const kinds = [
  "ridge",
  "iris",
  "hero-dither",
  "hero-stone",
  "manifesto",
  "pixels",
  "liquid",
  "glossy",
  "network",
  "horizon",
  "glassbound",
  "cables",
  "strings",
  "shadow",
  "deck",
  "globe",
  "gate",
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
  await mkdir("public/frames/signal", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 700 },
    deviceScaleFactor: 1,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const kind of kinds) {
    if (process.env.FRAME_KINDS && !process.env.FRAME_KINDS.split(",").includes(kind)) continue;
    await page.emulateMedia({ reducedMotion: kind === "hero-stone" ? "no-preference" : "reduce" });
    await page.setViewportSize({ width: 1200, height: kind === "hero-dither" ? 1260 : 700 });
    let errors = [];
    const listener = (e) => errors.push(e.message);
    page.on("pageerror", listener);
    await page.goto(
      `${process.env.BASE_URL || "http://localhost:3000"}/playground/visual/${kind}`,
      { waitUntil: "domcontentloaded" },
    );
    await page.waitForSelector("canvas", { timeout: 30000 });
    await page.waitForTimeout(
      kind === "strings" ? 4200 : kind === "ember" || kind === "globe" ? 2500 : 1000,
    );
    await page.locator(".visual-export").screenshot({ path: `public/frames/signal/${kind}.png` });
    if (kind === "hero-dither") {
      await page.addStyleTag({
        content: "html,body,.visual-export{background:transparent!important}",
      });
      for (const [name, width, height] of [
        ["edge", 1440, 441],
        ["edge-wide", 1880, 413],
        ["edge-short", 1366, 313],
        ["edge-portrait", 768, 586],
      ]) {
        await page.setViewportSize({ width, height: height + 560 });
        await page.waitForTimeout(300);
        const frame = await page.locator("canvas").screenshot({ omitBackground: true });
        await writeFile(
          `public/frames/signal/hero-hands-${name}.png`,
          await sharp(frame).png({ palette: true, colors: 256, dither: 0, effort: 10 }).toBuffer(),
        );
      }
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(
        `${process.env.BASE_URL || "http://localhost:3000"}/playground/visual/hero-dither?composition=original`,
      );
      await page.waitForSelector("canvas");
      await page.waitForTimeout(1000);
      await page
        .locator(".visual-export")
        .screenshot({ path: "public/frames/signal/hero-hands-diagonal.png" });
      const packed = await sharp("public/frames/signal/hero-hands-diagonal.png")
        .png({ palette: true, colors: 256, dither: 0, effort: 10, compressionLevel: 9 })
        .toBuffer();
      await writeFile("public/frames/signal/hero-hands-diagonal.png", packed);
    }
    if (kind === "hero-stone") {
      await page.waitForSelector('canvas[data-native-ready="true"]', { timeout: 30000 });
      await page.setViewportSize({ width: 800, height: 800 });
      await page.addStyleTag({
        content: "html,body,.visual-export{background:transparent!important}",
      });
      await page.waitForTimeout(300);
      await page
        .locator("canvas")
        .screenshot({ path: "public/frames/signal/hero-stone.png", omitBackground: true });
      const stats = await sharp("public/frames/signal/hero-stone.png").stats();
      if (!stats.channels[3]?.max) throw new Error("Native stone capture has no visible geometry");
      await sharp("public/frames/signal/hero-stone.png")
        .webp({ quality: 85 })
        .toFile("public/frames/signal/hero-stone.webp");
    }
    if (kind === "manifesto") {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(300);
      await page
        .locator(".visual-export")
        .screenshot({ path: "public/frames/signal/manifesto-mobile.png" });
      await sharp("public/frames/signal/manifesto-mobile.png")
        .webp({ quality: 85 })
        .toFile("public/frames/signal/manifesto-mobile.webp");
    }
    report.push({ kind, canvases: await page.locator("canvas").count(), errors });
    page.off("pageerror", listener);
    console.log(JSON.stringify(report.at(-1)));
  }
  const existing = process.env.FRAME_KINDS
    ? JSON.parse(
        await readFile("docs/cohesion/visual-frame-results.json", "utf8").catch(() => "[]"),
      )
    : [];
  const results = [
    ...existing.filter((row) => !report.some((latest) => latest.kind === row.kind)),
    ...report,
  ];
  await writeFile(
    "docs/cohesion/visual-frame-results.json",
    JSON.stringify(results, null, 2) + "\n",
  );
} finally {
  await browser.close();
}
