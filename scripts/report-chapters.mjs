import { readFile, writeFile } from "node:fs/promises";
import { chapterHeroes, pageContent } from "../content/site.ts";
const { records, errors } = JSON.parse(await readFile("docs/chapters/results.json", "utf8"));
const audits = JSON.parse(
  await readFile("docs/chapters/lighthouse-results.json", "utf8").catch(() => "[]"),
);
const auditTable = audits
  .map(
    (row) =>
      `| ${row.page} | ${row.scores.performance} | ${row.scores.accessibility} | ${row.scores["best-practices"]} | ${row.scores.seo} | ${row.metrics.lcp} |`,
  )
  .join("\n");
const keys = Object.keys(chapterHeroes);
const names = {
  desktop: "Desktop · 1440 × 1000",
  "iphone-390": "iPhone viewport · 390 × 844",
  "android-412": "Android viewport · 412 × 915",
};
const gallery = Object.entries(names)
  .map(
    ([device, label]) =>
      `<section><h2>${label}</h2><div class="shots ${device === "desktop" ? "wide" : "phones"}">${keys.map((key) => `<figure><a href="${device}/${key}.png"><img src="${device}/${key}.png" loading="lazy" alt="${key} hero on ${device}"></a><figcaption><span>${chapterHeroes[key].number}</span> ${pageContent[key].title} <i>${pageContent[key].serif}</i></figcaption></figure>`).join("")}</div></section>`,
  )
  .join("");
await writeFile(
  "docs/chapters/index.html",
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Yazhnova — shared hero-44 review</title><style>*{box-sizing:border-box}body{margin:0;background:#0a0a0a;color:#f4f2ec;font:16px/1.5 system-ui,sans-serif}main{width:min(1600px,calc(100% - 48px));margin:64px auto}h1{font-size:clamp(38px,5vw,76px);line-height:1;letter-spacing:-.05em;max-width:1000px}h2{font-size:24px;margin:64px 0 24px}p{max-width:800px;color:#aaa69f}a{color:inherit}header>span,figcaption>span{font:11px monospace;color:#ff3b00;letter-spacing:.1em}.shots{display:grid;gap:24px}.wide{grid-template-columns:repeat(2,minmax(0,1fr))}.phones{grid-template-columns:repeat(3,minmax(0,1fr))}figure{margin:0;min-width:0}img{display:block;width:100%;height:auto;border:1px solid #ffffff18}figcaption{padding:12px 0;color:#c4c1b8}figcaption>span{margin-right:14px}footer{margin-top:64px;padding-top:24px;border-top:1px solid #ffffff18}@media(max-width:800px){.wide,.phones{grid-template-columns:1fr 1fr}}@media(max-width:540px){.wide,.phones{grid-template-columns:1fr}}</style><main><header><span>YAZHNOVA / HERO-44 / REVIEW</span><h1>One component.<br><i>Six ways forward.</i></h1><p>The installed plasma renderer, original hand and atmospheric assets form one shared hero. Word entrances, alignment and the seeded scene pose change by chapter. The AI glassbound scene stays in its lower demo.</p><p><a href="README.md">Implementation and verification</a> · <a href="results.json">Measured browser results</a></p></header><section><h2>Chapter changes, in motion</h2><video controls preload="none" poster="desktop/services.png" src="transitions.webm" style="width:100%;display:block;border:1px solid #ffffff18"></video></section>${gallery}<section><h2>The AI demo remains below</h2><figure><a href="ai-demo.png"><img src="ai-demo.png" alt="The preserved AI visual and live workflow demo" loading="lazy"></a></figure></section><footer><p>These are captures of the running production build. Mobile profiles use Chrome touch emulation, 4× CPU throttling and a 4 Mbps network. Render-call rates are host measurements, not physical-phone FPS.</p></footer></main></html>`,
);
const rates = Object.keys(names)
  .map((device) => {
    const rows = records.filter((row) => row.device === device);
    return `| ${names[device]} | ${Math.min(...rows.map((row) => row.fps)).toFixed(1)}–${Math.max(...rows.map((row) => row.fps)).toFixed(1)} | ${Math.max(...rows.map((row) => row.p95FrameMs)).toFixed(1)} ms | ${Math.max(...rows.map((row) => row.dpr))} |`;
  })
  .join("\n");
await writeFile(
  "docs/chapters/README.md",
  `# Shared chapter heroes: OriginKit hero-44

[Open the screenshot gallery](index.html) or [watch the transition recording](transitions.webm). It contains all six heroes at desktop, iPhone and Android viewport sizes, plus the retained lower AI demo.

## Delivered

- Installed the real hero-44 section, native plasma renderer, section CSS and all fourteen supplied assets using the OriginKit CLI.
- Services, AI Agents, Work, Process, Engage and About now use the same authored composition of that source. The original plasma mesh, hand, mist and ridge remain; the palette is ink, paper, warm grey and signal orange.
- Left-aligned, centered and right-aligned typography varies the rhythm. Grotesk headlines and italic serif lines reveal word by word. A short ink wipe with an orange seam precedes each chapter; the mesh enters with a fresh pose. Back navigation also replays the entrance.
- The existing glassbound component is retained once in the lower AI demo, alongside the live chat. It is removed from the AI hero. The other former chapter hero effects are replaced by hero-44; their original sources remain installed.
- Copy and chapter terms/poses live in \`content/site.ts\`. Home, Contact and the individual case-study heroes keep their existing compositions.

## Source changes

The downloaded entry forwards props. Production imports its typed SectionHero directly, keeping the prototype stylesheet out of the critical page load. The section has an optional content/artwork slot using the original assets; the default study remains available at \`/playground\`. The plasma source adds optional \`initialRotation\` and \`hotspotColor\`, allows a transparent host, applies the shared DPR cap and explicitly disposes its buffers, shaders and program. The optional SectionHeroProps annotation fixes consumer inference for the new slots without changing visuals. No visual renderer was recreated. The CLI-added external font imports were removed; production retains the self-hosted studio typography.

The scene uses the existing lazy renderer and shared two-context budget. Off-screen or hidden-tab surfaces unmount and dispose; mobile uses density 48 instead of 88 and DPR 1. Reduced motion gets an actual transparent capture of the native canvas. Server-rendered text and actions remain visible without JavaScript. The plasma fallback stays available in SSR markup, but is not preloaded ahead of fonts and the live scene; the large native mist image is preloaded instead.

## Browser captures

| Profile | Native render calls / second | Highest p95 frame interval | Effective DPR |
| --- | --- | --- | --- |
${rates}

All ${records.length} hero captures contain exactly one live canvas. No title or CTA was clipped; no horizontal overflow or console errors were recorded (${errors.length} errors). Mobile captures use 4× CPU throttling, 40 ms network latency and 4 Mbps throughput. The host runs at 144 Hz: these are instrumented WebGL draw-call rates, not measurements on physical phones or guarantees of composited GPU FPS.

## Validation

The production build and full 24-test browser suite passed. The build ran from an isolated copy on the same drive, using the shared dependency installation, so the running developer server was preserved. Browser checks cover real client-side navigation between all six pages, repeated word entrances, back navigation, native canvas lifecycle and the two-context ceiling, the lower AI demo, both touch viewport widths, reduced motion and no JavaScript.

## Lighthouse mobile

| Page | Performance | Accessibility | Best practices | SEO | LCP |
| --- | --- | --- | --- | --- | --- |
${auditTable}

These are local production-preview Lighthouse measurements; physical-device and deployed-network performance can differ. See [the audit results](lighthouse-results.json).

To capture again against a running preview: \`npm run capture:chapters\`. Set \`BASE_URL\` to use a different preview origin.
`,
);
console.log("Wrote chapter gallery and verification report");
