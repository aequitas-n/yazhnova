# Stone introduction

The requested intro runs once per tab session on a desktop-style fine pointer. The real hero-69 EmberHusk appears, opens to release **YAZH / NOVA** outward from the center, draws the name back in, reforms, and bursts outward again as a growing opening reveals the existing hands hero.

Replay it at [localhost:3000/?intro=replay](http://localhost:3000/?intro=replay). A normal return visit skips it; the replay query deliberately requests another run. Anchored visits go directly to the requested section.

## Choreography

| Time after the first rendered frame | Action                                                           |
| ----------------------------------- | ---------------------------------------------------------------- |
| 0.00–0.65 s                         | The solid stone settles into view                                |
| 0.70–1.75 s                         | Actual rock fragments separate and rotate outward                |
| 1.15–2.10 s                         | The two wordmark halves slide out from the center and expand     |
| 2.10–2.95 s                         | The complete wordmark holds                                      |
| 2.95–3.60 s                         | The letters shrink and return into the center                    |
| 3.15–3.95 s                         | The same fragments close into the stone                          |
| 3.95–4.30 s                         | The solid form holds briefly                                     |
| 4.30–5.57 s                         | A second real fracture clears the center; the hero opens outward |

The stone's geometry, materials, procedural texture, lighting and render pipeline come from the installed source. `ember-husk.tsx` has an explicit, optional `choreography` ref controlling fracture, scale, rotation and pause; `onReady` starts the clock after a genuine rendered frame, and `onError` releases the page. Without these props, its original spring/pointer behavior remains in place for the final CTA and playground. The extension is recorded in [fixes.md](fixes.md).

`components/intro/cinematic-intro.tsx` holds the single GSAP timeline. The wordmark is real DOM typography, clipped at the center so it emerges in both directions. The expanding mask opens onto the existing homepage rather than creating a replacement hero. Copy remains in `content/site.ts`.

## Loading, interaction and cleanup

- A genuine captured stone frame appears while the dynamic 3D module initializes, then crossfades to the live object. The source's low-quality preset caps pixel ratio and bloom passes for the fullscreen intro.
- **Skip intro** and **Escape** release the page immediately. Focus is contained during playback and returns to the hero after dismissal. Scrolling and the page's original styles are restored on cleanup.
- Mobile/coarse pointers, reduced motion and data saving go straight to the hero. With JavaScript disabled, a `noscript` rule removes the cover and the server-rendered site remains available.
- Loading normally has a 3.5-second watchdog; explicit replay allows 12 seconds for shader initialization during review. Context creation failures, context loss and component errors release the page.
- The timeline and its renderer pause when the tab is hidden. The other visual adapters are held until the reveal so they do not compete with the intro.
- Completion, skipping and route unmounting kill the timeline and dispose the original renderer, meshes, buffers, materials and render targets.

## Review artifacts

`npm run capture:intro` captures five screenshots and `artifacts/intro-preview.webm` against a running local production preview. Video capture needs Chrome and `npx playwright install ffmpeg`; neither is required to build or deploy the site.

The browser suite covers the natural sequence with a genuine WebGL2 context, button/Escape dismissal, session replay behavior, mobile/reduced-motion/no-JavaScript access and an injected WebGL initialization failure. The existing site checks still cover the final CTA's original renderer.
