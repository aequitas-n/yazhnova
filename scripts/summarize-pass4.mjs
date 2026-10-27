import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const data = JSON.parse(await readFile("docs/pass4/results.json", "utf8"));
const manifest = JSON.parse(await readFile("docs/originkit-source-manifest.json", "utf8"));
const changed = [];
for (const [file, hash] of Object.entries(manifest))
  if (
    createHash("sha256")
      .update(await readFile(file))
      .digest("hex") !== hash
  )
    changed.push(file);
await writeFile(
  "docs/pass4/source-integrity.json",
  JSON.stringify(
    {
      files: Object.keys(manifest).length,
      changed,
      notes:
        "Documented type repairs, opt-in content/story/intro controls and shared mobile DPR policy. Source geometry and shader implementations retained.",
    },
    null,
    2,
  ) + "\n",
);
const samples = data.records.flatMap((row) =>
  (row.fps || [])
    .filter((sample) => sample.frames > 0)
    .map((sample) => ({ ...sample, device: row.device, path: row.path })),
);
const minimum = Math.min(...samples.map((sample) => sample.fps));
const maximum = Math.max(...data.records.map((row) => row.maxContexts || 0));
let md =
  "# Pass 4 render-call samples\n\nChrome DevTools touch emulation, 4× CPU throttling, 4 Mbps download and 40 ms latency. These are distinct animation-frame timestamps with actual canvas drawing calls on this host, not physical phone presentation FPS. The host cadence can reach 144Hz.\n\n";
md += `Active sample minimum: **${minimum} fps**. Peak live WebGL contexts: **${maximum}**. Application console/uncaught errors: **${data.errors.length}**.\n\n`;
md +=
  "| Viewport | Scene | Source | Average fps | p95 frame interval | Buffer | Effective DPR |\n| --- | --- | --- | ---: | ---: | --- | ---: |\n";
for (const sample of samples)
  md += `| ${sample.device} | ${sample.path} | ${sample.source} | ${sample.fps} | ${sample.p95FrameMs} ms | ${sample.buffer.join(" × ")} | ${sample.effectiveDpr} |\n`;
md +=
  "\n## Mobile intro\n\nThe animation duration starts after the source is ready. Loading is separately measurable, and Skip is available during loading.\n\n| Viewport | Renderer setup after loading phase | Choreography | Stone frames |\n| --- | ---: | ---: | ---: |\n";
for (const row of data.records.filter((row) => row.path === "intro")) {
  const loading = row.beats.find((beat) => beat.phase === "loading"),
    playing = row.beats.find((beat) => beat.phase === "playing");
  md += `| ${row.device} | ${Math.round(playing.time - loading.time)} ms | ${row.observedTimelineMs} ms | ${row.renderedStoneFrames} |\n`;
}
md +=
  "\nThe first cold renderer setup in this throttled run is substantially slower than the warm run. The approximately 2.1-second request describes the choreography, not download/shader/geometry initialization. Physical-phone validation and further cold-start optimization remain launch checks. Source readiness, short playback, Skip and the actual hero handoff are covered by browser tests.\n";
await writeFile("docs/pass4/fps-summary.md", md);
console.log(
  JSON.stringify({
    samples: samples.length,
    minimumFps: minimum,
    maxContexts: maximum,
    errors: data.errors.length,
    modifiedSources: changed.length,
  }),
);

const lighthouse = [];
for (const label of ["home", "contact"]) {
  const report = JSON.parse(await readFile(`artifacts/lighthouse-${label}.json`, "utf8"));
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
await writeFile("docs/pass4/lighthouse-results.json", JSON.stringify(lighthouse, null, 2) + "\n");
await writeFile("docs/lighthouse-results.json", JSON.stringify(lighthouse, null, 2) + "\n");
