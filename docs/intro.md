# Stone introduction

The homepage opens with the real hero-69 EmberHusk: the stone separates, releases **YAZH / NOVA** from its center, reforms, then fractures again to reveal the hands hero. It runs once per tab session. Replay at `/?intro=replay`; anchored and reduced-motion visits go directly to the page.

## Consistent live rendering

There is no poster-to-canvas crossfade. The ink background holds while the native shaders warm, and the stone fades in only after its first genuine 3D frame. The same renderer, perspective camera, geometry and procedural material remain throughout the opening and reformation. Desktop uses the native high-quality preset (DPR capped at 2); mobile uses medium (DPR capped at 1.5), eight shards and eight debris pieces. Quality does not change mid-sequence.

`components/intro/cinematic-intro.tsx` drives the optional native choreography ref. The full sequence lasts approximately 5.57 seconds after readiness, or 2.1 seconds on mobile. The two DOM wordmark halves emerge from their center clips; the final expanding mask reveals the existing homepage.

| Desktop time after readiness | Action                                    |
| ---------------------------- | ----------------------------------------- |
| 0.00-0.65 s                  | The live stone fades in and settles       |
| 0.70-1.75 s                  | Native rock fragments separate and rotate |
| 1.15-2.10 s                  | YAZH / NOVA emerge outward                |
| 2.10-2.95 s                  | Wordmark holds                            |
| 2.95-3.95 s                  | Text retracts and fragments reassemble    |
| 3.95-4.30 s                  | Stone holds                               |
| 4.30-5.57 s                  | Second fracture reveals the homepage      |

## Interaction and cleanup

- The visible Skip intro button is removed. Escape remains available and is described to screen readers. Focus stays on the dialog during playback, then returns to the hero heading. These two noninteractive landmarks do not display an outline; links, buttons and form controls retain their keyboard focus indicators.
- Reduced motion bypasses the sequence. Mobile plays the shorter live animation. Without JavaScript, the server-rendered site remains accessible through a `noscript` rule.
- The loading watchdog releases the page after six seconds on desktop, or twelve seconds on mobile and explicit replay. Context failures and component errors also release the page.
- Native shader warmup is cancellable. Hidden tabs pause the renderer and timeline. Other page canvases remain suspended until the intro finishes; unmounting disposes the native resources and restores scrolling.

## Verification

`tests/intro.spec.ts` covers the complete WebGL2 sequence, no image/button in the intro, Escape during pending compilation, session persistence, focused heading without an outline, mobile/reduced-motion/no-JavaScript access and WebGL failure recovery. `npm run capture:intro` records five screenshots and a video against a running production preview in `artifacts/`.

The opening-quality update passed the production build, TypeScript check, five intro tests and both touch-viewport integration tests. Captures at desktop DPR 2 and 390px/412px touch viewports verified that the drawing-buffer size stays constant throughout the sequence. Both mobile runs used 4x CPU throttling and 4 Mbps network emulation, finished playback in 2.08/2.06 seconds, stayed within two live WebGL contexts and reported no console errors. These are Chrome emulation checks, not physical-device measurements. Screenshots, video and measured results are saved locally under `artifacts/intro-*`.
