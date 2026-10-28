import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { mkdir, writeFile } from "node:fs/promises";

const phase = process.env.AUDIT_PHASE || "after";
const paths = (process.env.AUDIT_ROUTES || "/,/contact").split(",");
const forms = (process.env.AUDIT_FORMS || "mobile,desktop").split(",");
await mkdir("docs/performance", { recursive: true });
await mkdir(`artifacts/performance-${phase}`, { recursive: true });
const chrome = await launch({
  chromeFlags: [
    "--headless",
    "--disable-extensions",
    "--no-first-run",
    "--enable-unsafe-swiftshader",
  ],
});
const rows = [];
try {
  for (const form of forms)
    for (const path of paths) {
      const result = await lighthouse(
        `${process.env.BASE_URL || "http://localhost:3001"}${path}`,
        {
          port: chrome.port,
          output: "json",
          logLevel: "error",
          onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
          ...(process.env.AUDIT_THROTTLING
            ? { throttlingMethod: process.env.AUDIT_THROTTLING }
            : {}),
        },
        form === "desktop" ? desktopConfig : undefined,
      );
      const { lhr } = result;
      const metric = (id) => lhr.audits[id]?.numericValue;
      const row = {
        path,
        form,
        time: lhr.fetchTime,
        version: lhr.lighthouseVersion,
        throttlingMethod: lhr.configSettings.throttlingMethod,
        scores: Object.fromEntries(
          Object.entries(lhr.categories).map(([key, value]) => [
            key,
            value.score === null ? null : Math.round(value.score * 100),
          ]),
        ),
        lcp: metric("largest-contentful-paint"),
        tbt: metric("total-blocking-time"),
        cls: metric("cumulative-layout-shift"),
        si: metric("speed-index"),
        longTasks: lhr.audits["long-tasks"]?.details?.items,
        boot: lhr.audits["bootup-time"]?.details?.items,
        runtimeError: lhr.runtimeError || null,
        auditErrors: Object.values(lhr.audits)
          .filter((audit) => audit.scoreDisplayMode === "error")
          .map((audit) => ({ id: audit.id, error: audit.errorMessage })),
      };
      rows.push(row);
      await writeFile(
        `artifacts/performance-${phase}/${path.slice(1) || "home"}-${form}.json`,
        result.report,
      );
      await writeFile(`docs/performance/${phase}.json`, JSON.stringify(rows, null, 2) + "\n");
      console.log(JSON.stringify({ ...row, longTasks: row.longTasks?.length, boot: undefined }));
    }
} finally {
  await chrome.kill();
}
