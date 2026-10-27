# From raw stone to signal

A cohesion pass in the existing Next.js repository. Ink is the shared base, graphite supports controls and cards, and #FF3B00 is the original hero-69 core color. Only Hero and Work are paper breaths, with 120px transitions into/out of ink. The heading grotesk, italic serif and mono labels are preserved.

## Before / after screenshots

[Open the side-by-side visual report](index.html). The desktop report includes the full stone intro; mobile deliberately skips that animation. All 54 images are actual browser captures, not design mockups.

| Section                        | Desktop before                          | Desktop after                         | Mobile before                          | Mobile after                         |
| ------------------------------ | --------------------------------------- | ------------------------------------- | -------------------------------------- | ------------------------------------ |
| Stone introduction             | [before](before/desktop/intro.png)      | [after](after/desktop/intro.png)      | Skipped                                | Skipped                              |
| Hands / signal origin          | [before](before/desktop/hero.png)       | [after](after/desktop/hero.png)       | [before](before/mobile/hero.png)       | [after](after/mobile/hero.png)       |
| Manifesto / newsprint          | [before](before/desktop/manifesto.png)  | [after](after/desktop/manifesto.png)  | [before](before/mobile/manifesto.png)  | [after](after/mobile/manifesto.png)  |
| Services / one tabbed stage    | [before](before/desktop/services.png)   | [after](after/desktop/services.png)   | [before](before/mobile/services.png)   | [after](after/mobile/services.png)   |
| Agentic AI / 60:40 composition | [before](before/desktop/agents.png)     | [after](after/desktop/agents.png)     | [before](before/mobile/agents.png)     | [after](after/mobile/agents.png)     |
| Process / converging cables    | [before](before/desktop/process.png)    | [after](after/desktop/process.png)    | [before](before/mobile/process.png)    | [after](after/mobile/process.png)    |
| Technology / signal strands    | [before](before/desktop/technology.png) | [after](after/desktop/technology.png) | [before](before/mobile/technology.png) | [after](after/mobile/technology.png) |
| Work / paper breath            | [before](before/desktop/work.png)       | [after](after/desktop/work.png)       | [before](before/mobile/work.png)       | [after](after/mobile/work.png)       |
| Engage / partnerships          | [before](before/desktop/engage.png)     | [after](after/desktop/engage.png)     | [before](before/mobile/engage.png)     | [after](after/mobile/engage.png)     |
| Proof / capabilities           | [before](before/desktop/proof.png)      | [after](after/desktop/proof.png)      | [before](before/mobile/proof.png)      | [after](after/mobile/proof.png)      |
| FAQ / two columns              | [before](before/desktop/faq.png)        | [after](after/desktop/faq.png)        | [before](before/mobile/faq.png)        | [after](after/mobile/faq.png)        |
| Final CTA / signal tunnel      | [before](before/desktop/cta.png)        | [after](after/desktop/cta.png)        | [before](before/mobile/cta.png)        | [after](after/mobile/cta.png)        |
| Footer / reflections           | [before](before/desktop/footer.png)     | [after](after/desktop/footer.png)     | [before](before/mobile/footer.png)     | [after](after/mobile/footer.png)     |
| Contact / ocean                | [before](before/desktop/contact.png)    | [after](after/desktop/contact.png)    | [before](before/mobile/contact.png)    | [after](after/mobile/contact.png)    |

## What changed

- The ink stone intro releases the paper hands hero. Higher-contrast dithering, a fingertip signal and the orange horizon introduce the recurring accent.
- Full-width native paperline newsprint sits at 15% opacity under a grotesk orange slogan. Its marker lettering is disabled; no graffiti face is used.
- Six keyboard-accessible service tabs share one 80vh stage. Web/UI-UX reuse pixels; SaaS/Mobile reuse liquid grid; Agentic AI uses the sphere; Cloud uses the network. No simultaneous miniature service canvases.
- Glassbound and chat share a full-width 60/40 stage. Native cables, a 50vh technology band, the full-bleed product deck and warm-lit pillars continue the visual language.
- Engagement has three complete dark partnership cards with real RollingLetters headings. Proof uses the draggable native features-02 globe and capability descriptions. FAQ is a compact two-column accordion.
- The final CTA uses the real star-gate tunnel. Footer rain reflections and the native wordmark use the same orange and heading grotesk. Contact uses the real ocean shader with a configurable orange sun.
- Legacy CSS is isolated in a lower-priority layer, so old responsive rules cannot override the new palette, spacing or text contrast.

## Lifecycle and validation

A shared viewport-prioritized scheduler grants at most two WebGL leases. Off-screen/hidden surfaces unmount, and retiring canvases explicitly release GPU contexts. The intro suspends page effects through its reveal. Canvas2D and DOM effects also pause off-screen; reduced motion and mobile receive real captured frames.

Observed peak active WebGL contexts: **2**. Mobile capture canvas count: **0**. Capture console errors: **0**. Build, browser/keyboard/form checks and accessibility scans are recorded in [verification](../verification.md).

## Deliberately skipped / awaiting real data

- Aura cursor: omitted to preserve the two-WebGL-context budget and the system pointer.
- Testimonials, numerical stats and client-location markers: no approved data supplied; quotes/stats are feature-gated and locations are empty. The proof section shows four capabilities.
- Mobile/reduced-motion canvas animation: genuine signal-palette frames replace live canvases, using zero WebGL contexts.
- Work uses the three existing labelled concept explorations; no additional client projects were invented.

Hairline-loader stays off, as requested; the stone is the single introduction. `cloud-sky-03` remains undownloaded and is not part of this composition. No CSS/SVG replacement of a missing OriginKit effect was introduced. Source extensions and dataset attribution are in [fixes](../fixes.md).
