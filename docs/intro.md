# Stone introduction

The homepage opens with the real hero-69 EmberHusk: the stone separates, releases **YAZH / NOVA** from its center, reforms, then remains intact while it moves into position between the homepage hands. It runs once per tab session. Replay at `/?intro=replay`; anchored and reduced-motion visits go directly to the page.

## Consistent live rendering

There is no poster-to-canvas crossfade. The ink background holds while the native shaders warm, and the stone fades in only after its first genuine 3D frame. A stable portal moves the same renderer, perspective camera, geometry and procedural material through the opening, reformation and into the homepage. The canvas is never replaced at the handoff. Desktop uses the native high-quality preset (DPR capped at 2); mobile uses medium (DPR capped at 1.5), eight shards and six debris pieces. Quality does not change mid-sequence.

`components/intro/cinematic-intro.tsx` drives the optional native choreography ref. The full sequence lasts approximately 5.4 seconds after readiness, or 2.1 seconds on mobile. The two DOM wordmark halves emerge from their center clips; the ink layer then fades while the stone follows the measured hero position. The hands gently appear underneath it.

| Desktop time after readiness | Action                                    |
| ---------------------------- | ----------------------------------------- |
| 0.00-0.65 s                  | The live stone fades in and settles       |
| 0.70-1.75 s                  | Native rock fragments separate and rotate |
| 1.15-2.10 s                  | YAZH / NOVA emerge outward                |
| 2.10-2.95 s                  | Wordmark holds                            |
| 2.95-3.95 s                  | Text retracts and fragments reassemble    |
| 3.95-4.18 s                  | Reformed stone holds intact               |
| 4.18-5.40 s                  | Intact stone moves into the hands; ink fades |

## Interaction and cleanup

- The visible Skip intro button is removed. Escape remains available and is described to screen readers. Focus stays on the dialog during playback, then returns to the hero heading. These two noninteractive landmarks do not display an outline; links, buttons and form controls retain their keyboard focus indicators.
- Reduced motion bypasses the sequence. Mobile plays the shorter live animation. Without JavaScript, the server-rendered site remains accessible through a `noscript` rule.
- The loading watchdog releases the page after six seconds on desktop, or twelve seconds on mobile and explicit replay. Context failures and component errors also release the page.
- Native shader warmup is cancellable. Hidden tabs pause the renderer and timeline. The hands renderer can mount during the final reveal beside the original stone, within the two-context budget. The stone remains live in its hero slot; scrolling it off-screen disposes its resources. The intro still restores scrolling and focus.

## Verification

`tests/intro.spec.ts` covers the complete WebGL2 sequence, no image/button in the intro, Escape during pending compilation, session persistence, focused heading without an outline, mobile/reduced-motion/no-JavaScript access and WebGL failure recovery. `npm run capture:intro` records five screenshots and a video against a running production preview in `artifacts/`.

The opening-quality update passed the production build, TypeScript check, five intro tests and both touch-viewport integration tests. Captures at desktop DPR 2 and 390px/412px touch viewports verified that the drawing-buffer size stays constant throughout the sequence. Both mobile runs used 4x CPU throttling and 4 Mbps network emulation, finished playback in 2.08/2.06 seconds, stayed within two live WebGL contexts and reported no console errors. These are Chrome emulation checks, not physical-device measurements. Screenshots, video and measured results are saved locally under `artifacts/intro-*`.


## Current continuity review ? 28 October 2026

The second fracture and radial hole reveal are removed. A stable React portal container moves from the intro frame into the hero slot, retaining the actual canvas. Native choreography adds optional camera-size, debris-spread and idle controls; the original shaders/materials remain unchanged. The square render target keeps its resolution during the transform; it resizes once when it arrives in the hero. Native idle rotation begins from the final intro pose.

The current production build, TypeScript check and seven focused intro/hands tests pass. These include the centered opening, original canvas identity after docking, context budget, Escape during shader warmup, reduced motion, no-JavaScript, and failed WebGL recovery. See [desktop/mobile recordings and screenshots](intro-continuity/README.md) for the current result. Previous measurements above describe the earlier opening-quality pass.
