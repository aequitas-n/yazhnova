# Phase 1 verification

Verified against the optimized Next.js 15 production build on Node.js 24.12.0. The local preview is available at [localhost:3000](http://localhost:3000), with [contact](http://localhost:3000/contact) and the [component playground](http://localhost:3000/playground). All three routes returned HTTP 200 during verification. The GitHub target is `aequitas-n/yazhnova`, branch `main`.

## Build and browser checks

- `npm run build` passes, including TypeScript checking and static generation.
- Prettier checks pass for the authored application, scripts, tests and documentation. Original library sources remain excluded from formatting.
- All **9 Playwright tests pass** against the production preview.
- Desktop checks confirm genuine rendering contexts and positive canvas dimensions for hero dither, horizon, manifesto, pixel grid, network lines, glassbound, shadow-cast, final EmberHusk, footer rain and wordmark. Contact renders its real ocean canvas.
- Off-screen glassbound unmounts its canvas. Mobile/reduced-motion pages render no canvases, and every homepage fallback image loads successfully. There is no horizontal page overflow at 390px or 320px.
- Navigation, project controls/dialog, agent replay, keyboard-operated FAQ, contact preselection, validation, focus management and mocked submission confirmation pass. Automated WCAG A/AA scans report no violations on the checked desktop/mobile and contact states.
- No application console errors or uncaught exceptions occurred in the desktop homepage and contact checks.
- API checks cover invalid data, malformed JSON, oversized bodies, foreign origins, honeypot handling and the honest unconfigured-mail response. No real email was sent.
- Sitemap, robots, generated OpenGraph image, icon and 404 handling pass. Playground routes are noindex and excluded from the sitemap.

## Mobile Lighthouse

Lighthouse 13.5.0, mobile form factor, simulated throttling, local production server. Reports were captured on 27 October 2026 at 06:39 IST, after the stone-intro revision. These are local lab measurements; deployment conditions can change scores.

| Page       | Performance | Accessibility | Best practices | SEO     | LCP   | CLS   | Total blocking time |
| ---------- | ----------- | ------------- | -------------- | ------- | ----- | ----- | ------------------- |
| `/`        | **90**      | **100**       | **100**        | **100** | 3.5 s | 0.001 | 80 ms               |
| `/contact` | **91**      | **100**       | **100**        | **100** | 3.4 s | 0     | 70 ms               |

Machine-readable and HTML reports are in the ignored `artifacts/lighthouse-home.*` and `artifacts/lighthouse-contact.*` files. Remaining performance opportunities include render-blocking CSS, unused framework code and image delivery. There are no Lighthouse runtime errors.

## OriginKit results

All **16 downloaded items** rendered in both original and editorial variants: **32 studies**, with **16 paired screenshots** in [shots](shots/README.md). All study canvases have valid dimensions and are visible. The **11 production visual adapters** also rendered genuine canvases without exceptions. Evidence is in [playground-results.json](playground-results.json) and [visual-frame-results.json](visual-frame-results.json).

The 50-file source integrity check found four intentional changes: `dithered-pixel-grid.tsx`, `glassbound.tsx` and `paperline-archive.tsx` have the five minimal typing corrections; `hero-69/ember-husk.tsx` has the explicitly requested optional intro choreography controls. Original geometry builders and shaders are intact. These changes are recorded in [fixes.md](fixes.md). There are no unexpected source changes, and no downloaded component was moved to the unavailable list.

There are **19 not-yet-downloaded components**, each with an explicit `TODO(originkit:<slug>)` slot and [replacement instructions](slots.md). Their missing effects have not been recreated.

Application-level QA also corrected the contact heading order, process-number contrast, keyboard access/pause behavior in the reduced-motion tech strip, and a clipped horizon wrapper. None required changes to library rendering logic.

The revised hero uses the actual dither renderer as a full-bleed background, with one hand entering from each edge behind centered copy. A portrait source capture preserves responsive cropping for mobile/reduced motion. Desktop (1440px), wide (1902px) and mobile (390px) screenshots are in `artifacts/hero-background-*.png`. The production build, type checking, five browser tests and source integrity check pass after this revision.

## Stone-intro verification

The production build, standalone type check, formatting and **all nine browser tests pass** with the new introduction. The intro suite verifies genuine WebGL2 rendering, the complete ordered beat sequence, a visible wordmark, page/canvas cleanup, Skip/Escape, session persistence and explicit replay. It also verifies mobile, reduced motion and no-JavaScript access, plus a deliberately failed initial WebGL context. Normal playback and recording have no application console errors or uncaught exceptions; the injected failure is expected to log the renderer?s context-creation error before releasing the page.

The production recording is `artifacts/intro-preview.webm`, with five `artifacts/intro-0*.png` screenshots and the beat/runtime observations in `artifacts/intro-preview-results.json`. [intro.md](intro.md) documents the 5.57-second choreography, loading policy and optional source extension. The mobile audit remains 90 for home and 91 for contact, with 100 accessibility, best practices and SEO on both.

## Configuration and content still needed for launch

Set `RESEND_API_KEY`, a verified `RESEND_FROM`, and `CONTACT_TO` to enable real contact delivery. Delivery through a live Resend account has not been verified. Without configuration, the form reports an error rather than claiming delivery.

Work items are labeled concept explorations, the agent task is an illustrative demo, and the sample testimonials remain explicitly marked TODO. Replace or approve those entries in `content/site.ts` before public launch. No production deployment was performed.
