# Production verification

Verified against the optimized Next.js 15 production build on Node.js 24.12.0. The local preview is available at [localhost:3000](http://localhost:3000), with [contact](http://localhost:3000/contact) and the [component playground](http://localhost:3000/playground). All three routes returned HTTP 200 during verification. The GitHub target is `aequitas-n/yazhnova`, branch `main`.

## Build and browser checks

- `npm run build` passes, including TypeScript checking and static generation.
- Prettier checks pass for the authored application, scripts, tests and documentation. Original library sources remain excluded from formatting.
- All **9 Playwright tests pass** against the production preview.
- Desktop checks confirm genuine rendering contexts and positive canvas dimensions for hero dither, horizon, manifesto, pixel grid, liquid grid, glossy sphere, glassbound, spark lattice, data strings, shadow-cast, stacked project deck, final EmberHusk, footer rain and wordmark. Contact renders its real fluid-field canvas.
- Off-screen glassbound unmounts its canvas. Mobile/reduced-motion pages render no canvases, and every homepage fallback image loads successfully. There is no horizontal page overflow at 390px or 320px.
- Navigation, project controls/dialog, agent replay, keyboard-operated FAQ, contact preselection, validation, focus management and mocked submission confirmation pass. Automated WCAG A/AA scans report no violations on the checked desktop/mobile and contact states.
- No application console errors or uncaught exceptions occurred in the desktop homepage and contact checks.
- API checks cover invalid data, malformed JSON, oversized bodies, foreign origins, honeypot handling and the honest unconfigured-mail response. No real email was sent.
- Sitemap, robots, generated OpenGraph image, icon and 404 handling pass. Playground routes are noindex and excluded from the sitemap.

## Mobile Lighthouse

Lighthouse 13.5.0, mobile form factor, simulated throttling, local production server. Reports were captured on 27 October 2026 after the native component integrations. These are local lab measurements; deployment conditions can change scores.

| Page       | Performance | Accessibility | Best practices | SEO     | LCP   | CLS   | Total blocking time |
| ---------- | ----------- | ------------- | -------------- | ------- | ----- | ----- | ------------------- |
| `/`        | **90**      | **100**       | **100**        | **100** | 3.5 s | 0.001 | 100 ms              |
| `/contact` | **94**      | **100**       | **100**        | **100** | 2.9 s | 0     | 80 ms               |

The checked-in [Lighthouse summary](lighthouse-results.json) records the latest run. Detailed machine-readable and HTML reports are in the ignored `artifacts/lighthouse-home.*` and `artifacts/lighthouse-contact.*` files. Remaining performance opportunities include render-blocking CSS, unused framework code and image delivery. There are no Lighthouse runtime errors.

## OriginKit results

All **34 downloaded items** rendered in both original and editorial variants: **68 studies**, with **34 paired screenshots** in [shots](shots/README.md). All canvas-based studies have valid visible draw contexts; text and border studies render the actual DOM effects. All **17 canvas presets** rendered genuine canvases without exceptions; 15 are selected for production and two remain export/gallery options. Evidence is in [playground-results.json](playground-results.json) and [visual-frame-results.json](visual-frame-results.json).

The 68-file source integrity check found four intentional changes: `dithered-pixel-grid.tsx`, `glassbound.tsx` and `paperline-archive.tsx` have the five minimal typing corrections; `hero-69/ember-husk.tsx` has the explicitly requested optional intro choreography controls. Original geometry builders and shaders are intact. These changes are recorded in [fixes.md](fixes.md). There are no unexpected source changes, and no downloaded component was moved to the unavailable list.

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

## Configuration and content still needed for launch

Set `RESEND_API_KEY`, a verified `RESEND_FROM`, and `CONTACT_TO` to enable real contact delivery. Delivery through a live Resend account has not been verified. Without configuration, the form reports an error rather than claiming delivery.

Work items are labeled concept explorations, the agent task is an illustrative demo, and the sample testimonials remain explicitly marked TODO. Replace or approve those entries in `content/site.ts` before public launch. No production deployment was performed.
