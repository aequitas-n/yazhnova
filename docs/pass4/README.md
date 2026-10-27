# Pass 4 — eight chapters, live mobile motion

Yazhnova now has eight main pages and three concept case-study pages. The ink, graphite, paper, orange, grotesk, italic serif and mono system is shared across every route. Navigation, the rain-puddle footer and the native wordmark are present on every page.

## Page heroes

Each main hero measures 100svh on mobile, has a scroll cue and mounts the installed source below. Home is approximately 4.2 screens of main content at 390 × 844, followed by the shared footer. It contains only the hands hero, manifesto, Practice teaser, one featured concept and the final invitation.

| Page      | Native hero                                                        | Desktop                       | iPhone-sized, 390px              | Android-sized, 412px              |
| --------- | ------------------------------------------------------------------ | ----------------------------- | -------------------------------- | --------------------------------- |
| Home      | hero-40 dither hands; hero-69 stone introduction                   | [Hero](desktop/home.png)      | [Hero](iphone-390/home.png)      | [Hero](android-412/home.png)      |
| Services  | hero-51's GrinIris, recolored and recomposed with “What we build.” | [Hero](desktop/services.png)  | [Hero](iphone-390/services.png)  | [Hero](android-412/services.png)  |
| AI Agents | Full-screen glassbound                                             | [Hero](desktop/ai-agents.png) | [Hero](iphone-390/ai-agents.png) | [Hero](android-412/ai-agents.png) |
| Work      | Full-bleed shadow-cast pillars and orange lighting                 | [Hero](desktop/work.png)      | [Hero](iphone-390/work.png)      | [Hero](android-412/work.png)      |
| Process   | Orange light-cables                                                | [Hero](desktop/process.png)   | [Hero](iphone-390/process.png)   | [Hero](android-412/process.png)   |
| Engage    | Star-gate tunnel                                                   | [Hero](desktop/engage.png)    | [Hero](iphone-390/engage.png)    | [Hero](android-412/engage.png)    |
| About     | Beyond-horizon, with a rising entrance of the native canvas        | [Hero](desktop/about.png)     | [Hero](iphone-390/about.png)     | [Hero](android-412/about.png)     |
| Contact   | Ocean-swell, with the form overlaid in graphite                    | [Hero](desktop/contact.png)   | [Hero](iphone-390/contact.png)   | [Hero](android-412/contact.png)   |

The concept template is generated at `/work/clarity`, `/work/relay` and `/work/forma`. Each opens with its actual UI mockup and image-spotlight, then explains the opportunity, approach and scope. The panels on `/work` link to these routes rather than opening dialogs.

| Concept | Desktop                          | Mobile                              |
| ------- | -------------------------------- | ----------------------------------- |
| Clarity | [Hero](desktop/case-clarity.png) | [Hero](iphone-390/case-clarity.png) |
| Relay   | [Hero](desktop/case-relay.png)   | [Hero](iphone-390/case-relay.png)   |
| Forma   | [Hero](desktop/case-forma.png)   | [Hero](iphone-390/case-forma.png)   |

Mobile intro: [390px capture](iphone-390/intro.png), [412px capture](android-412/intro.png). Captures show the real stone canvas in motion; they are not substitute assets.

## Content and routing

- `/services` retains the full six-tab, 80vh storytelling stage. Home presents a shorter version linking to Services.
- `/ai-agents` contains the live-chat demonstration, three use cases, the sphere-led context-to-action sequence and an integrations section.
- `/work` retains the pinned editorial track on desktop; touch and reduced motion use a vertical layout.
- `/process` explains all four steps, then shows the native curved marquee/data strings and the structured Cloud architecture.
- `/engage` contains the engagement models and six-question accordion.
- `/about` contains the studio story, values and the native draggable globe. The team array remains empty and does not render; no people or client locations have been invented.
- `/contact` retains validated submission through the existing server handler. The compact form fits the mobile hero; validation can scroll within the graphite card when more room is needed.

All new copy is in `content/site.ts`, under `pageContent` and `multiPage`. The root `template.tsx` provides the short ink wipe and orange line, with reduced-motion and no-JavaScript handling. Every route has its own title, description, canonical, OpenGraph and Twitter metadata. `/og/[page]` generates distinct share images; the sitemap contains the eight main routes and all three case studies.

## Why mobile had frozen

The old eligibility check required `(min-width: 768px) and (pointer: fine)` as well as no reduced-motion preference. It prevented both dynamic canvas mounting and the stone intro on mobile. A separate CSS rule also hid the intro on coarse pointers and small screens.

Both gates are removed. Reduced motion alone selects static scenes. Visible mobile scenes mount their actual dynamically imported components, then unmount off-screen or when the document is hidden. The shared two-WebGL lease budget remains in effect. Loading/waiting scenes do not keep a static effect poster over the live renderer. Temporary loading posters and no-JavaScript content are distinct from the former permanent mobile fallback.

Touch coordinates are bridged to the mousemove listeners used by some installed sources, through passive pointer listeners that preserve page scrolling. Time-driven animation starts without pointer input. Cloud nodes also support persistent tap tooltips and keyboard focus. The native marquee and chat mount on mobile; they are no longer disabled by the desktop gate.

A legacy `940 / 380` aspect ratio on the featured image initially widened the document during intro loading. Explicit width bounds and `aspect-ratio: auto` now keep the phone viewport at its actual width. The hero baseline sits above the full-width horizon so its labels remain readable.

## Mobile tuning

The source changes preserve the installed geometry and shader implementations. Seventeen source files now use the shared `canvasPixelRatio()` policy: mobile/coarse pointers cap at DPR 1; desktop retains the source's original cap. The intro's native low quality also caps at 1. No production mobile canvas exceeds the requested 1.5 limit.

| Native source                      | Mobile settings                                                                                                                                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hero-69 stone                      | Low quality, 8 shards instead of 12, 8 debris pieces instead of 28, no beads, DPR 1. The complete intro choreography runs at about 2.1 seconds after source readiness. Skip/Escape, visibility pause and session persistence remain. |
| hero-40 dither hands               | DPR 1, dot size 5, gentle time-driven wave at speed 8 and density 12. No hover is required.                                                                                                                                          |
| hero-51 iris                       | DPR 1, scale 95, fiber 30, no veins, gloss 50. Native wandering and floating continue without input.                                                                                                                                 |
| dithered-pixel-grid                | DPR 1, 72 cells across instead of 160 in the service stage, with grain/halo disabled. The real story mask and ripples remain.                                                                                                        |
| liquid-grid                        | DPR 1, cell size 48, intensity 28 and touch ripple radius 100. The native simulation still warps the dashboard input.                                                                                                                |
| single-glossy-sphere               | Resolution 40%, 36 raymarch steps and no film patches. The native sphere, tool absorption and task sequence remain.                                                                                                                  |
| glassbound                         | Quality 35%, size 125, no grain, restrained hover. The actual smaller drawing buffer fills the full-size hero.                                                                                                                       |
| light-cables                       | DPR 1, 8 cables and 2 flow pulses instead of 18 and 4.                                                                                                                                                                               |
| data-strings                       | DPR 1, 90 strands and 10 particles instead of 300 and 28.                                                                                                                                                                            |
| network-lines                      | DPR 1 and 24 nodes for decorative networks. Structured architecture retains its 11 labelled nodes, edges and request/return route.                                                                                                   |
| shadow-cast                        | DPR 1, density 9, no grain.                                                                                                                                                                                                          |
| star-gate                          | DPR 1, 3 gate levels, 6 points and glow 1.5.                                                                                                                                                                                         |
| ocean-swell                        | DPR 1, detail 3, no cloud or foam, glitter 3 and no drag capture, preserving vertical page scrolling.                                                                                                                                |
| rain-puddle                        | DPR 1, rain 6, ripple setting 7 and streak setting 2.                                                                                                                                                                                |
| footer wordmark                    | DPR 1, line density 8, same heading font and orange reflections. Font size fits the phone width; the canvas is 220px tall. [390px](iphone-390/footer.png) / [412px](android-412/footer.png).                                         |
| paperline-archive / beyond-horizon | DPR 1. Real newsprint and horizon shaders remain; no effect is recreated.                                                                                                                                                            |
| features-02 globe                  | DPR 1, detail 2, dot density 3 and continuous rotation after touch. Native drag controls remain.                                                                                                                                     |

## FPS and verification method

[Measured FPS table and intro loading/playback timing](fps-summary.md).

The machine-readable [results](results.json) record every hero's actual drawing-buffer size, effective DPR, render-call frames, average FPS, p95 inter-frame time, overflow check and peak live context count. Additional samples cover all service tabs, data strings, the Cloud architecture, globe and footer on both mobile viewports.

Chrome DevTools emulation uses 390 × 844 / DPR 3 and 412 × 915 / DPR 2.625, touch enabled, no reduced motion, 4× CPU throttling, 4 Mbps download and 40 ms latency. The profiler counts distinct animation-frame timestamps on which each connected canvas actually issues drawing calls; it does not count an unrelated empty requestAnimationFrame loop as rendered work. Hero samples begin after the source canvas mounts and a 1.4-second warm-up, then measure 2.4 seconds. Supporting scenes measure 1.6 seconds after activation.

These are local browser-emulation observations, not physical iPhone/Android measurements or a guarantee of presentation FPS on every phone. The host display cadence can exceed a phone's 60Hz refresh rate. Physical hardware validation remains a launch check.

The Playwright checks cover the two touch viewports, automatic mounting, reduced-motion-only frames, mobile intro/Skip, all service tabs, touch tooltips, full-screen menu navigation, metadata/share endpoints, case routes, context cleanup, contact behavior and accessibility. The native `hero-51` reduced-motion frame is captured from its source, alongside the existing genuine source frames.

The production build and TypeScript pass, and all **20 browser checks pass**. Across 42 connected-canvas samples, the lowest average draw-loop rate is **52.4 fps**, with **2** live WebGL contexts at most and **0** application console/uncaught errors. The mobile intro choreography measures **2.085s / 2.076s** after source readiness. Its cold initialization is separately reported in the timing table.

The final mobile Lighthouse run scores **91 performance / 100 accessibility / 100 best practices / 100 SEO** for both Home and Contact. [Audit summary](lighthouse-results.json). Home has 0 CLS; Contact has 0.047 CLS. These lab scores do not replace field measurements or physical-phone checks.

Cold-start profiling also exposed a synchronous shader-compilation task in the original stone/ocean renderer setup. Their programs now warm in cancellable jobs before the existing drawing loops start, using parallel-compile completion queries when the driver supports them. A new test verifies that Skip during pending compilation releases the intro permanently. Loading time is reported separately from the roughly 2.1-second mobile choreography.

To reproduce against a production preview:

```sh
npm run build
npm start
node scripts/review-pass4.mjs --frames
# Restart after generating a new public file.
node scripts/review-pass4.mjs
npm run test:e2e
```

## Boundaries

Optional `/services/[slug]` pages were not added; all six full stories are on `/services`. Team data and verified proof remain hidden until supplied. Work remains clearly labelled Concept and the agent workflow remains a demonstration. No installed component failed or moved into an unavailable slot. Contact delivery still needs the existing Resend configuration. This pass does not publish or push the changes.
