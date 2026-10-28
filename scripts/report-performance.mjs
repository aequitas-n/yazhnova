import fs from "node:fs/promises";
const read = async (file) => JSON.parse(await fs.readFile(`docs/performance/${file}.json`, "utf8"));
const [before, after, desktop, assets, profile] = await Promise.all(
  ["before", "after", "after-desktop", "assets", "visual-profile"].map(read),
);
const seconds = (value) => (value / 1000).toFixed(2);
const old = assets.reduce((sum, row) => sum + row.before, 0),
  optimized = assets.reduce((sum, row) => sum + row.after, 0);
const fps = (form) =>
  profile
    .filter((row) => row.form === form)
    .flatMap((row) => row.canvases.map((canvas) => canvas.framesPerSecond));
const tasks = profile.flatMap((row) => row.tasks);
const maxTask = Math.max(0, ...tasks.map((row) => row.duration));
const mobileTable = after
  .map(
    (row) =>
      `| ${row.path} | ${row.scores.performance} | ${seconds(row.lcp)}s | ${Math.round(row.tbt)}ms | ${row.cls.toFixed(4)} |`,
  )
  .join("\n");
const comparison = before
  .map((row) => {
    const next = (row.form === "mobile" ? after : desktop).find((next) => next.path === row.path);
    return `| ${row.path}, ${row.form} | ${row.scores.performance} → ${next.scores.performance} | ${Math.round(row.tbt)} → ${Math.round(next.tbt)}ms | ${seconds(row.lcp)} → ${seconds(next.lcp)}s |`;
  })
  .join("\n");
const summary = {
  mobile: after.map(({ path, scores, tbt, lcp, cls }) => ({
    path,
    score: scores.performance,
    tbt,
    lcp,
    cls,
  })),
  targets: {
    everyMobileScore85: after.every((row) => row.scores.performance >= 85),
    otherRoutes90: after
      .filter((row) => !["/", "/contact"].includes(row.path))
      .every((row) => row.scores.performance >= 90),
    everyMobileTbt200: after.every((row) => row.tbt < 200),
    everyMobileLcp2500: after.every((row) => row.lcp < 2500),
    everyMobileCls01: after.every((row) => row.cls < 0.1),
  },
  desktopFPS: [Math.min(...fps("desktop")), Math.max(...fps("desktop"))],
  mobileFPS: [Math.min(...fps("mobile")), Math.max(...fps("mobile"))],
  longestProfiledTask: maxTask,
};
await fs.writeFile("docs/performance/summary.json", JSON.stringify(summary, null, 2) + "\n");
const details = `# Pass 5 — Performance

Measured on the production Next.js build, 28 October 2026. Main audit: Lighthouse 13.5, default simulated mobile throttling; desktop uses the official desktop config. Local server runs on port 3001, with tests/profiling/audits run sequentially. [User-supplied baseline](user-baseline.json) is recorded separately: Home 60 / 5880ms TBT mobile, Contact 70 / 2210ms mobile. Those earlier conditions were not supplied, so their scores are not treated as a controlled before/after comparison.

## Final mobile audit

| Route | Performance | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: |
${mobileTable}

[Final Lighthouse results](after.json), [desktop results](after-desktop.json), [target checks](summary.json). Local audit runs vary with host and shader-driver load. LCP below 2.5 seconds is **not achieved** in the default simulated mobile audit. The report retains any other failed target in summary.json; no score or time is rounded into a pass. Applied DevTools-throttling exploratory results are retained under artifacts and are not substituted for the default audit.

## Controlled local comparison

The before build comes from commit 6558e2a, exported into an isolated directory with the same installed dependencies. The latest build is measured with identical Lighthouse profiles.

| Page/profile | Performance | TBT | LCP |
| --- | ---: | ---: | ---: |
${comparison}

The supplied 60/70 scores were not reproduced by that local baseline. This pass primarily bounds ongoing animation cost and reduces startup bytes; it does not claim an environment-independent Lighthouse improvement.

## Changes

- One shared governor admits at most two full-screen 2D/WebGL scenes. The footer ridge and wordmark share an exclusive group; the visible wordmark gets priority so neither component starves. Losing slots and off-screen/hidden routes unmount and release native runtimes. Waiting visuals show their real posters.
- Heavy upgrades wait for actual first-contentful-paint, then a cancellable idle queue. Near-view posters use a 200px margin; renderers run only in view. Device memory, cores, touch/width and Save-Data select high/mid/low tiers, DPR caps 1.5/1.25/1, density reductions and a drift-corrected 60/30fps shared cadence. Native render algorithms remain intact. Reduced motion alone keeps static frames.
- Home first-load JS: **211 → 158 KB**. Three/GSAP are asynchronous, with no production R3F import in the initial bundle. The intro shows a native stone poster during shader preparation, then preserves the same live canvas throughout docking. Low/mid stone rendering removes bloom passes and caps DPR. The original intro duration and fracture story remain.
- Contact first-load JS: **201 → 150 KB**. The complete form is server-rendered. RHF/Zod validation upgrades on view/idle or focus, retaining values, selection, service preselection and submission. No Turnstile integration exists in this repo, so none was added. Native rain keeps its shader, uses half-resolution rendering and reduced ripples on low tier, and runs at 30fps. Its poster is **1,530,507 → 17,638 bytes**.
- Work's pinned scroll engine loads only for desktop pinning; mobile keeps the existing vertical layout. Static engagement markup is server-rendered. Word reveals, section-title movement and route wipes use compositor animations with their previous timing/easing. Client navigation retains its wipe; an initial navigation does not block content behind a wipe. The mobile dialog library loads on menu open, preserving focus trapping and restoration.
- Globe uses a 474,847-byte local map instead of the 2,764,441-byte original, lighter sphere geometry on low/mid, small asynchronous construction batches and cancellable shader warmup. Late work checks disposal; geometry, materials, textures and the renderer/context are released. The native continuous rotation and dragging stay live. There are no active R3F Canvas components in production to convert to demand rendering.
- ${assets.length} optimized image variants: **${old.toLocaleString("en-US")} → ${optimized.toLocaleString("en-US")} bytes** combined (${Math.round((1 - optimized / old) * 100)}% smaller). This is the total converted asset set, not one page's transferred payload. Original PNG sources remain available; production uses optimized variants. Next Image supports AVIF/WebP and stops at 1920px. Fonts, frames and OriginKit assets return one-year immutable cache headers. Only the existing above-fold UI and italic display fonts preload.
- Removed the unused ScrollTrigger import/registration from the reveal source; it already implements passive scroll alignment and native cleanup. Native detail imports also use the idle queue.

## Verification

Production build and TypeScript pass. Twenty-two intro, mobile, reduced-motion, form, story-proportion, navigation and runtime regression checks pass after the footer priority fix, with additional chapter-hero checks at 390px and 412px. The form submission test intercepts mail delivery; no test enquiry was sent.

The [scroll profile](visual-profile.json) captures actual per-canvas submitted drawing frames, browser long-task entries, buffers and peak active contexts at mobile 390x844 and desktop 1440x1000. Mobile: ${Math.min(...fps("mobile")).toFixed(1)}–${Math.max(...fps("mobile")).toFixed(1)}fps; desktop: ${Math.min(...fps("desktop")).toFixed(1)}–${Math.max(...fps("desktop")).toFixed(1)}fps. Longest recorded startup/scroll task: **${Math.round(maxTask)}ms**, with no multi-second tasks. Browser contexts are Chrome/SwiftShader emulations, not physical-device or GPU presentation benchmarks. Raw Performance-panel-compatible traces are generated in ignored artifacts/performance-traces.

The navigation test records at most two simultaneous heavy canvases and WebGL contexts, no simultaneous ridge/wordmark runtime, all contexts lost after reduced-motion teardown, and successful background pause/resume. [Cache checks](cache.json), [bundle inventory](bundles.json), [asset sizes](assets.json).

[Home mobile](home-mobile.png), [Contact mobile](contact-mobile.png), [Home desktop](home-desktop.png), [Contact desktop](contact-desktop.png). No component was removed or moved to a failure slot. No new static-on-mobile fallback was introduced.

Reproduce with scripts/audit-performance.mjs, scripts/profile-visuals.mjs and tests/performance.spec.ts against a production server. Use BASE_URL to select the endpoint; AUDIT_FORMS and AUDIT_ROUTES select profiles/routes. The audit preserves null/error category results rather than converting them to a score.
`;
await fs.writeFile("docs/performance/README.md", details);
const marker = "\n## Pass 5 — Performance\n";
let fixes = await fs.readFile("docs/fixes.md", "utf8");
if (fixes.includes(marker)) fixes = fixes.slice(0, fixes.indexOf(marker));
fixes += `${marker}\nImplemented the shared two-slot heavy visual governor, idle/paint-first startup, device tiers, 60/30fps frame scheduling, native disposal, exclusive footer scheduling, image variants/caching, lazy validation and desktop-only Work motion loading. Every component is retained and mobile animation stays live. Home initial JS is 211 → 158 KB; Contact is 201 → 150 KB. The native contact poster is 18 KB, and the 77 optimized variants total 3.36 MB versus 26.34 MB for their PNG inputs.\n\nFinal Lighthouse mobile scores: ${after.map((row) => `${row.path} ${row.scores.performance}`).join(", ")}. Home TBT ${Math.round(after[0].tbt)}ms; Contact TBT ${Math.round(after[1].tbt)}ms. Mobile LCP under 2.5s remains unmet; any other failed threshold is listed in [the target checks](performance/summary.json). Desktop Home/Contact scores: ${desktop.map((row) => `${row.path} ${row.scores.performance}`).join(", ")}.\n\nThe supplied baseline and controlled local before/after results are both documented in [the full report](performance/README.md). Twenty-two relevant browser checks, additional mobile chapter checks, TypeScript and the production build pass. Profiles record about 60fps desktop / 30fps mobile, at most two heavy canvases and live WebGL contexts, no leaked contexts after navigation/teardown, no multi-second long tasks, and proper hidden-tab pause/resume. Chrome emulation measurements do not claim physical-device certification. No failed source components or slots were added.\n`;
await fs.writeFile("docs/fixes.md", fixes);
console.log(JSON.stringify(summary));
