import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
const chrome = await launch({
  chromePath: process.env.CHROME_PATH || undefined,
  chromeFlags: ["--headless", "--disable-extensions", "--no-first-run"],
});
try {
  await mkdir("artifacts", { recursive: true });
  for (const path of ["/", "/contact"]) {
    const result = await lighthouse(`${process.env.BASE_URL || "http://localhost:3000"}${path}`, {
      port: chrome.port,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    const label = path === "/" ? "home" : "contact";
    await writeFile(`artifacts/lighthouse-${label}.json`, result.report[0]);
    await writeFile(`artifacts/lighthouse-${label}.html`, result.report[1]);
    console.log(
      JSON.stringify({
        page: path,
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
        metrics: {
          lcp: result.lhr.audits["largest-contentful-paint"].displayValue,
          cls: result.lhr.audits["cumulative-layout-shift"].displayValue,
          tbt: result.lhr.audits["total-blocking-time"].displayValue,
        },
        failures: Object.values(result.lhr.audits)
          .filter((a) => a.score !== null && a.score < 0.9)
          .map((a) => ({ id: a.id, title: a.title, display: a.displayValue })),
      }),
    );
  }
} finally {
  await chrome.kill();
}
