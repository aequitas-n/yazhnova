import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const manifest = JSON.parse(await readFile("docs/originkit-source-manifest.json", "utf8"));
const changed = [];
for (const [file, original] of Object.entries(manifest)) {
  const hash = createHash("sha256")
    .update(await readFile(file))
    .digest("hex");
  if (hash !== original) changed.push(file);
}
await writeFile(
  "docs/pass3/source-integrity.json",
  JSON.stringify(
    {
      files: Object.keys(manifest).length,
      changed,
      notes:
        "Six previously documented modified sources plus the new optional liquid-grid and network-lines inputs. The existing pixel source also gains the requested optional mask input. Defaults remain available when inputs are absent; no source was moved to a slot.",
    },
    null,
    2,
  ) + "\n",
);

const lighthouse = [];
for (const label of ["home", "contact"]) {
  const report = JSON.parse(await readFile("artifacts/lighthouse-" + label + ".json", "utf8"));
  lighthouse.push({
    page: label === "home" ? "/" : "/contact",
    fetchTime: report.fetchTime,
    lighthouseVersion: report.lighthouseVersion,
    formFactor: report.configSettings.formFactor,
    scores: Object.fromEntries(
      Object.entries(report.categories).map(([key, item]) => [key, Math.round(item.score * 100)]),
    ),
    metrics: {
      lcp: report.audits["largest-contentful-paint"].displayValue,
      cls: report.audits["cumulative-layout-shift"].displayValue,
      tbt: report.audits["total-blocking-time"].displayValue,
    },
    runtimeError: report.runtimeError ?? null,
  });
}
await writeFile("docs/lighthouse-results.json", JSON.stringify(lighthouse, null, 2) + "\n");
console.log(
  JSON.stringify({
    sourceFiles: Object.keys(manifest).length,
    modifiedSources: changed.length,
    lighthouse,
  }),
);
