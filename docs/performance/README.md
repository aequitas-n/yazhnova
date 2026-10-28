# Pass 5 — Performance

Measured on the production Next.js build, 28 October 2026. Main audit: Lighthouse 13.5, default simulated mobile throttling; desktop uses the official desktop config. Local server runs on port 3001, with tests/profiling/audits run sequentially. [User-supplied baseline](user-baseline.json) is recorded separately: Home 60 / 5880ms TBT mobile, Contact 70 / 2210ms mobile. Those earlier conditions were not supplied, so their scores are not treated as a controlled before/after comparison.

## Final mobile audit

| Route | Performance | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: |
| / | 92 | 3.27s | 79ms | 0.0000 |
| /contact | 95 | 2.89s | 29ms | 0.0000 |
| /services | 91 | 3.38s | 78ms | 0.0000 |
| /ai-agents | 91 | 3.38s | 67ms | 0.0001 |
| /work | 91 | 3.46s | 70ms | 0.0000 |
| /process | 92 | 3.38s | 63ms | 0.0000 |
| /engage | 91 | 3.38s | 81ms | 0.0001 |
| /about | 92 | 3.38s | 56ms | 0.0001 |

[Final Lighthouse results](after.json), [desktop results](after-desktop.json), [target checks](summary.json). Local audit runs vary with host and shader-driver load. LCP below 2.5 seconds is **not achieved** in the default simulated mobile audit. The report retains any other failed target in summary.json; no score or time is rounded into a pass. Applied DevTools-throttling exploratory results are retained under artifacts and are not substituted for the default audit.

## Controlled local comparison

The before build comes from commit 6558e2a, exported into an isolated directory with the same installed dependencies. The latest build is measured with identical Lighthouse profiles.

| Page/profile | Performance | TBT | LCP |
| --- | ---: | ---: | ---: |
| /, mobile | 91 → 92 | 116 → 79ms | 3.40 → 3.27s |
| /contact, mobile | 91 → 95 | 139 → 29ms | 3.20 → 2.89s |
| /, desktop | 100 → 100 | 0 → 0ms | 0.76 → 0.68s |
| /contact, desktop | 100 → 100 | 0 → 0ms | 0.66 → 0.60s |

The supplied 60/70 scores were not reproduced by that local baseline. This pass primarily bounds ongoing animation cost and reduces startup bytes; it does not claim an environment-independent Lighthouse improvement.

## Changes

- One shared governor admits at most two full-screen 2D/WebGL scenes. The footer ridge and wordmark share an exclusive group; the visible wordmark gets priority so neither component starves. Losing slots and off-screen/hidden routes unmount and release native runtimes. Waiting visuals show their real posters.
- Heavy upgrades wait for actual first-contentful-paint, then a cancellable idle queue. Near-view posters use a 200px margin; renderers run only in view. Device memory, cores, touch/width and Save-Data select high/mid/low tiers, DPR caps 1.5/1.25/1, density reductions and a drift-corrected 60/30fps shared cadence. Native render algorithms remain intact. Reduced motion alone keeps static frames.
- Home first-load JS: **211 → 158 KB**. Three/GSAP are asynchronous, with no production R3F import in the initial bundle. The intro shows a native stone poster during shader preparation, then preserves the same live canvas throughout docking. Low/mid stone rendering removes bloom passes and caps DPR. The original intro duration and fracture story remain.
- Contact first-load JS: **201 → 150 KB**. The complete form is server-rendered. RHF/Zod validation upgrades on view/idle or focus, retaining values, selection, service preselection and submission. No Turnstile integration exists in this repo, so none was added. Native rain keeps its shader, uses half-resolution rendering and reduced ripples on low tier, and runs at 30fps. Its poster is **1,530,507 → 17,638 bytes**.
- Work's pinned scroll engine loads only for desktop pinning; mobile keeps the existing vertical layout. Static engagement markup is server-rendered. Word reveals, section-title movement and route wipes use compositor animations with their previous timing/easing. Client navigation retains its wipe; an initial navigation does not block content behind a wipe. The mobile dialog library loads on menu open, preserving focus trapping and restoration.
- Globe uses a 474,847-byte local map instead of the 2,764,441-byte original, lighter sphere geometry on low/mid, small asynchronous construction batches and cancellable shader warmup. Late work checks disposal; geometry, materials, textures and the renderer/context are released. The native continuous rotation and dragging stay live. There are no active R3F Canvas components in production to convert to demand rendering.
- 77 optimized image variants: **26,341,703 → 3,362,324 bytes** combined (87% smaller). This is the total converted asset set, not one page's transferred payload. Original PNG sources remain available; production uses optimized variants. Next Image supports AVIF/WebP and stops at 1920px. Fonts, frames and OriginKit assets return one-year immutable cache headers. Only the existing above-fold UI and italic display fonts preload.
- Removed the unused ScrollTrigger import/registration from the reveal source; it already implements passive scroll alignment and native cleanup. Native detail imports also use the idle queue.

## Verification

Production build and TypeScript pass. Twenty-two intro, mobile, reduced-motion, form, story-proportion, navigation and runtime regression checks pass after the footer priority fix, with additional chapter-hero checks at 390px and 412px. The form submission test intercepts mail delivery; no test enquiry was sent.

The [scroll profile](visual-profile.json) captures actual per-canvas submitted drawing frames, browser long-task entries, buffers and peak active contexts at mobile 390x844 and desktop 1440x1000. Mobile: 30.0–30.1fps; desktop: 59.9–60.1fps. Longest recorded startup/scroll task: **96ms**, with no multi-second tasks. Browser contexts are Chrome/SwiftShader emulations, not physical-device or GPU presentation benchmarks. Raw Performance-panel-compatible traces are generated in ignored artifacts/performance-traces.

The navigation test records at most two simultaneous heavy canvases and WebGL contexts, no simultaneous ridge/wordmark runtime, all contexts lost after reduced-motion teardown, and successful background pause/resume. [Cache checks](cache.json), [bundle inventory](bundles.json), [asset sizes](assets.json).

[Home mobile](home-mobile.png), [Contact mobile](contact-mobile.png), [Home desktop](home-desktop.png), [Contact desktop](contact-desktop.png). No component was removed or moved to a failure slot. No new static-on-mobile fallback was introduced.

Reproduce with scripts/audit-performance.mjs, scripts/profile-visuals.mjs and tests/performance.spec.ts against a production server. Use BASE_URL to select the endpoint; AUDIT_FORMS and AUDIT_ROUTES select profiles/routes. The audit preserves null/error category results rather than converting them to a score.
