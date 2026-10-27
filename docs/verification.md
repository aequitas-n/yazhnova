> Pass 3 builds on **From raw stone to signal**, with six service narratives and an editorial Work track. [Current screenshots and report](pass3/README.md), [source integrity](pass3/source-integrity.json) and [source controls](fixes.md) describe the current implementation. Earlier phase-specific notes below are retained as history.

# Production verification

Verified against the optimized Next.js 15 production build on Node.js 24.12.0. The local preview is available at [localhost:3000](http://localhost:3000), with [contact](http://localhost:3000/contact) and the [component playground](http://localhost:3000/playground). All three routes returned HTTP 200 during verification. The GitHub target is `aequitas-n/yazhnova`, branch `main`.

## Build and browser checks

- `npm run build` passes, including TypeScript checking and static generation.
- Prettier checks pass for the authored application, scripts, tests and documentation. Original library sources remain excluded from formatting.
- All **14 Playwright tests pass** against the production preview.
- Desktop checks confirm genuine rendering contexts for the hands, orange horizon, native newsprint, six service stories, glassbound, light cables, data strings, draggable globe, star-gate, rain and wordmark. Contact renders the real ocean shader. The full-width agent grid is checked at 60/40. Work now uses native image-spotlight on a pinned editorial track, with no deck or pillars canvas.
- Off-screen glassbound unmounts its canvas. Mobile/reduced-motion pages render no canvases, and every homepage fallback image loads successfully. There is no horizontal page overflow at 390px or 320px.
- Navigation, project controls/dialog, agent replay, keyboard-operated FAQ, contact preselection, validation, focus management and mocked submission confirmation pass. Automated WCAG A/AA scans report no violations on the checked desktop/mobile and contact states.
- No application console errors or uncaught exceptions occurred in the desktop homepage and contact checks.
- API checks cover invalid data, malformed JSON, oversized bodies, foreign origins, honeypot handling and the honest unconfigured-mail response. No real email was sent.
- Sitemap, robots, generated OpenGraph image, icon and 404 handling pass. Playground routes are noindex and excluded from the sitemap.

## Mobile Lighthouse

Lighthouse 13.5.0, mobile form factor, simulated throttling, local production server. Reports were captured on 27 October 2026 after Pass 3. These are local lab measurements; deployment conditions can change scores.

| Page       | Performance | Accessibility | Best practices | SEO     | LCP   | CLS | Total blocking time |
| ---------- | ----------- | ------------- | -------------- | ------- | ----- | --- | ------------------- |
| `/`        | **90**      | **100**       | **100**        | **100** | 3.4 s | 0   | 140 ms              |
| `/contact` | **93**      | **100**       | **100**        | **100** | 3.1 s | 0   | 110 ms              |

The checked-in [Lighthouse summary](lighthouse-results.json) records the latest run. Detailed machine-readable and HTML reports are in the ignored `artifacts/lighthouse-home.*` and `artifacts/lighthouse-contact.*` files. Remaining performance opportunities include render-blocking CSS, unused framework code and image delivery. There are no Lighthouse runtime errors.

Pass 3 initially scored 87 on the homepage. The story module is now imported only after viewport entry on an eligible desktop, final-frame downloads wait for visibility, mobile Work skips pinned-track measurement, contact CTAs avoid automatic form-bundle prefetch, and one self-hosted variable Inter Tight file replaces three weight files without changing the family or requested weights. The latter saves 22,420 font bytes and two requests when all three weights are used.

The full browser run observes at most two simultaneous WebGL canvases; mobile and reduced motion have zero. Source integrity checks cover 68 installed files, with eight intentional modified sources documented in [fixes.md](fixes.md). This pass adds the optional liquid-grid/network-lines inputs and expands the already modified pixel source. No downloaded source failed or moved to a slot.

## OriginKit results

All **34 downloaded items** rendered in both original and editorial variants: **68 studies**, with **34 paired screenshots** in [shots](shots/README.md). All canvas-based studies have valid visible draw contexts; text and border studies render the actual DOM effects. All **18 signal-palette canvas presets** rendered genuine canvases without exceptions, including the intro stone. Evidence is in [playground-results.json](playground-results.json) and [visual-frame-results.json](visual-frame-results.json).

The earlier 68-file source integrity check found four intentional changes: `dithered-pixel-grid.tsx`, `glassbound.tsx` and `paperline-archive.tsx` have the five minimal typing corrections; `hero-69/ember-husk.tsx` has the explicitly requested optional intro choreography controls. Original geometry builders and shaders are intact. These changes are recorded in [fixes.md](fixes.md). The cohesion pass adds optional masthead/font-loading, local globe dataset and ocean sun controls; six source files now differ from the original checksums. [Current integrity results](cohesion/source-integrity.json) list them. No downloaded component was moved to the unavailable list.

Only **cloud-sky-03** remains unavailable because of the daily quota. The selected downloads now run in the website; only the cloud source retains an unavailable TODO. Legacy unreferenced contracts are explicitly inactive. See [downloads.md](downloads.md) for source status and [slots.md](slots.md) for integration boundaries. Missing effects have not been recreated.

Application-level QA also corrected the contact heading order, process-number contrast, keyboard access/pause behavior in the reduced-motion tech strip, and a clipped horizon wrapper. None required changes to library rendering logic.

The revised hero uses the actual dither renderer as a full-bleed background, with one hand entering from each edge behind centered copy. A portrait source capture preserves responsive cropping for mobile/reduced motion. Desktop (1440px), wide (1902px) and mobile (390px) screenshots are in `artifacts/hero-background-*.png`. The production build, type checking, five browser tests and source integrity check pass after this revision.

## Stone-intro verification

The production build, standalone type check, formatting and **all nine browser tests pass** with the new introduction. The intro suite verifies genuine WebGL2 rendering, the complete ordered beat sequence, a visible wordmark, page/canvas cleanup, Skip/Escape, session persistence and explicit replay. It also verifies mobile, reduced motion and no-JavaScript access, plus a deliberately failed initial WebGL context. Normal playback and recording have no application console errors or uncaught exceptions; the injected failure is expected to log the renderer?s context-creation error before releasing the page.

The production recording is `artifacts/intro-preview.webm`, with five `artifacts/intro-0*.png` screenshots and the beat/runtime observations in `artifacts/intro-preview-results.json`. [intro.md](intro.md) documents the 5.57-second choreography, loading policy and optional source extension. The introduction remains unchanged during the later component integrations. The current mobile audit appears above.

## Latest download batch

The latest retry downloaded live-chat, aura-cursor and hairline-loader. TypeScript and the production build pass without source repairs or extra dependencies. Six new original/editorial variants render without console errors or exceptions. The cursor study exercises genuine WebGL output with browser pointer input; the chat and loader render actual DOM. Only cloud-sky-03 remains quota-blocked. There are 34 studies, 68 variants and 34 paired screenshots. See [downloads.md](downloads.md) for the complete ledger.

## Native component composition review

All 34 downloaded sources have scores and individual decisions in [component-ratings.md](component-ratings.md). Twelve previously deferred effects now run as actual sources in the website: liquid-grid, single-glossy-sphere, spark-lattice, data-strings, fluid-field, stacked-carousel, curvedmarquee, image-spotlight, live-chat, scrambletext, scroll-text-reveal and glow-border. The approved stone introduction and reaching-hands hero remain intact. Network lines and ocean swell were replaced in their production roles; six additional effects remain in the gallery by design.

The optimized build and all nine browser tests pass. Tests now exercise the actual native chat, SVG text path, reveal and spotlight as well as the hover border mounting/unmounting. Mobile and reduced-motion keep semantic static content with zero effect canvases or native motion overlays. No application console errors or uncaught exceptions were observed.

[Seven production screenshots](shots/production/README.md) and [source-render observations](production-review-results.json) record the finished compositions. Six new genuine fallback frames were captured, with the sphere and deck recaptured after visual quality tuning. Static frame preloading was tightened from 240px to 96px ahead of the viewport so the large dispatch image does not compete with the initial hero. An integrity pass over all 68 raw source files found only the four already documented modifications; this integration adds no raw source edits. No downloaded component was moved to the unavailable list.

## Cohesion pass verification

The optimized build, TypeScript and all **11 tests pass**. The tests cover all six service tabs, arrow/Home keyboard navigation, full-width 60/40 agent composition, two paper breaths, feature-gated proof content, native rendering, source cleanup, intro/Skip, project dialogs, FAQ and contact behavior. The mobile and contact tests were rerun successfully after the ocean-light adjustment.

An animation-frame sampler observed a maximum of **2 active WebGL canvases** while crossing all sections. Hidden/off-screen sources unmount, retiring contexts are explicitly released, and the stone intro suspends page scenes through its reveal. Mobile and reduced motion use genuine static frames with **0 canvases**. Browser and automated accessibility checks report no application console errors, uncaught exceptions or WCAG A/AA violations in the checked states.

There are **54 before/after screenshots**, covering every section and contact on desktop/mobile, plus both desktop intros. The [comparison viewer](cohesion/index.html) has been browser-checked for device toggling and image paths. The report records the cursor omission, empty verified data, mobile static rendering, and the use of three concept projects. Source/frame evidence is in `docs/cohesion`.

## Configuration and content still needed for launch

Public routes now omit playground-only styles, while `/playground` loads its own complete source styles. The contact ocean frame is discoverable in the initial HTML with high fetch priority.

Set `RESEND_API_KEY`, a verified `RESEND_FROM`, and `CONTACT_TO` to enable real contact delivery. Delivery through a live Resend account has not been verified. Without configuration, the form reports an error rather than claiming delivery.

Work items remain explicitly labelled concept explorations and the agent workflow is a demonstration. Quotes, numerical stats and client locations are empty and feature-gated in `content/site.ts`; no sample proof or TODO labels render in production. Supply approved data before enabling them. No production deployment was performed.
