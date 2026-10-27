import { readFile, writeFile } from "node:fs/promises";

const sections = [
  ["intro", "Stone introduction"],
  ["hero", "Hands / signal origin"],
  ["manifesto", "Manifesto / newsprint"],
  ["services", "Services / one tabbed stage"],
  ["agents", "Agentic AI / 60:40 composition"],
  ["process", "Process / converging cables"],
  ["technology", "Technology / signal strands"],
  ["work", "Work / paper breath"],
  ["engage", "Engage / partnerships"],
  ["proof", "Proof / capabilities"],
  ["faq", "FAQ / two columns"],
  ["cta", "Final CTA / signal tunnel"],
  ["footer", "Footer / reflections"],
  ["contact", "Contact / ocean"],
];
const after = JSON.parse(await readFile("docs/cohesion/after/results.json", "utf8"));
const runtime = JSON.parse(await readFile("artifacts/cohesion-runtime.json", "utf8"));
const report = {
  concept: "From raw stone to signal",
  accent: "#FF3B00",
  screenshots: 54,
  maxActiveWebGLContexts: runtime.maxActiveWebGLContexts,
  consoleErrors: after.flatMap((entry) => entry.errors || []),
  lighthouse: JSON.parse(await readFile("docs/lighthouse-results.json", "utf8")),
  desktopVisuals: after.filter((entry) => entry.device === "desktop"),
  mobileCanvases: after
    .filter((entry) => entry.device === "mobile")
    .reduce((total, entry) => total + (entry.canvases || 0), 0),
  skips: [
    "Aura cursor: omitted to preserve the two-WebGL-context budget and the system pointer.",
    "Testimonials, numerical stats and client-location markers: no approved data supplied; quotes/stats are feature-gated and locations are empty. The proof section shows four capabilities.",
    "Mobile/reduced-motion canvas animation: genuine signal-palette frames replace live canvases, using zero WebGL contexts.",
    "Work uses the three existing labelled concept explorations; no additional client projects were invented.",
  ],
};
await writeFile("docs/cohesion/results.json", JSON.stringify(report, null, 2) + "\n");
let markdown =
  "# From raw stone to signal\n\nA cohesion pass in the existing Next.js repository. Ink is the shared base, graphite supports controls and cards, and #FF3B00 is the original hero-69 core color. Only Hero and Work are paper breaths, with 120px transitions into/out of ink. The heading grotesk, italic serif and mono labels are preserved.\n\n";
markdown +=
  "## Before / after screenshots\n\n[Open the side-by-side visual report](index.html). The desktop report includes the full stone intro; mobile deliberately skips that animation. All 54 images are actual browser captures, not design mockups.\n\n| Section | Desktop before | Desktop after | Mobile before | Mobile after |\n| --- | --- | --- | --- | --- |\n";
for (const [slug, label] of sections) {
  const link = (phase, device) => "[" + phase + "](" + phase + "/" + device + "/" + slug + ".png)";
  markdown +=
    "| " +
    label +
    " | " +
    link("before", "desktop") +
    " | " +
    link("after", "desktop") +
    " | " +
    (slug === "intro" ? "Skipped" : link("before", "mobile")) +
    " | " +
    (slug === "intro" ? "Skipped" : link("after", "mobile")) +
    " |\n";
}
markdown +=
  "\n## What changed\n\n- The ink stone intro releases the paper hands hero. Higher-contrast dithering, a fingertip signal and the orange horizon introduce the recurring accent.\n- Full-width native paperline newsprint sits at 15% opacity under a grotesk orange slogan. Its marker lettering is disabled; no graffiti face is used.\n- Six keyboard-accessible service tabs share one 80vh stage. Web/UI-UX reuse pixels; SaaS/Mobile reuse liquid grid; Agentic AI uses the sphere; Cloud uses the network. No simultaneous miniature service canvases.\n- Glassbound and chat share a full-width 60/40 stage. Native cables, a 50vh technology band, the full-bleed product deck and warm-lit pillars continue the visual language.\n- Engagement has three complete dark partnership cards with real RollingLetters headings. Proof uses the draggable native features-02 globe and capability descriptions. FAQ is a compact two-column accordion.\n- The final CTA uses the real star-gate tunnel. Footer rain reflections and the native wordmark use the same orange and heading grotesk. Contact uses the real ocean shader with a configurable orange sun.\n- Legacy CSS is isolated in a lower-priority layer, so old responsive rules cannot override the new palette, spacing or text contrast.\n\n";
markdown +=
  "## Lifecycle and validation\n\nA shared viewport-prioritized scheduler grants at most two WebGL leases. Off-screen/hidden surfaces unmount, and retiring canvases explicitly release GPU contexts. The intro suspends page effects through its reveal. Canvas2D and DOM effects also pause off-screen; reduced motion and mobile receive real captured frames.\n\nObserved peak active WebGL contexts: **" +
  report.maxActiveWebGLContexts +
  "**. Mobile capture canvas count: **" +
  report.mobileCanvases +
  "**. Capture console errors: **" +
  report.consoleErrors.length +
  "**. Build, browser/keyboard/form checks and accessibility scans are recorded in [verification](../verification.md).\n\n";
markdown +=
  "## Deliberately skipped / awaiting real data\n\n" +
  report.skips.map((skip) => "- " + skip).join("\n") +
  "\n\nHairline-loader stays off, as requested; the stone is the single introduction. `cloud-sky-03` remains undownloaded and is not part of this composition. No CSS/SVG replacement of a missing OriginKit effect was introduced. Source extensions and dataset attribution are in [fixes](../fixes.md).\n";
await writeFile("docs/cohesion/README.md", markdown);
const panels = sections
  .map(
    ([slug, label]) =>
      '<section data-section="' +
      slug +
      '"><h2>' +
      label +
      '</h2><div class="pair"><figure><figcaption>Before</figcaption><img loading="lazy" src="before/desktop/' +
      slug +
      '.png" alt="Before: ' +
      label +
      '"></figure><figure><figcaption>After</figcaption><img loading="lazy" src="after/desktop/' +
      slug +
      '.png" alt="After: ' +
      label +
      '"></figure></div></section>',
  )
  .join("\n");
await writeFile(
  "docs/cohesion/index.html",
  '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Yazhnova cohesion: before and after</title><style>body{margin:0;background:#0a0a0a;color:#f4f2ec;font:16px/1.5 system-ui}header{padding:40px 4vw;border-bottom:1px solid #333}h1{font-size:clamp(30px,5vw,70px);letter-spacing:-.05em;margin:0}p{color:#aaa}button{padding:12px 24px;border:1px solid #555;background:#141414;color:#f4f2ec;margin-right:12px;cursor:pointer}button[aria-pressed=true]{border-color:#ff3b00}section{padding:30px 4vw;border-bottom:1px solid #333}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}figure{margin:0;min-width:0}figcaption{font:12px monospace;color:#ff3b00;margin-bottom:12px}img{width:100%;height:auto;display:block}body.mobile img{max-width:390px;margin:auto}h2{letter-spacing:-.03em;font-weight:500}@media(max-width:700px){.pair{grid-template-columns:1fr}}</style><header><h1>From raw stone to signal.</h1><p>YAZHNOVA / actual browser captures / before and after</p><button aria-pressed="true" data-device="desktop">Desktop</button><button aria-pressed="false" data-device="mobile">Mobile</button></header>' +
    panels +
    '<script>document.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>{const device=button.dataset.device;document.body.classList.toggle("mobile",device==="mobile");document.querySelectorAll("button").forEach(item=>item.setAttribute("aria-pressed",String(item===button)));document.querySelectorAll("[data-section]").forEach(section=>{section.hidden=device==="mobile"&&section.dataset.section==="intro";section.querySelectorAll("img").forEach(image=>image.src=image.getAttribute("src").replace(/\\/(desktop|mobile)\\//,"/"+device+"/"))})}));</script></html>',
);
console.log(
  JSON.stringify({
    screenshots: report.screenshots,
    maxWebGL: report.maxActiveWebGLContexts,
    errors: report.consoleErrors.length,
  }),
);
