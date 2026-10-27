# Shared chapter heroes: OriginKit hero-44

[Open the screenshot gallery](index.html) or [watch the transition recording](transitions.webm). It contains all six heroes at desktop, iPhone and Android viewport sizes, plus the retained lower AI demo.

## Delivered

- Installed the real hero-44 section, native plasma renderer, section CSS and all fourteen supplied assets using the OriginKit CLI.
- Services, AI Agents, Work, Process, Engage and About now use the same authored composition of that source. The original plasma mesh, hand, mist and ridge remain; the palette is ink, paper, warm grey and signal orange.
- Left-aligned, centered and right-aligned typography varies the rhythm. Grotesk headlines and italic serif lines reveal word by word. A short ink wipe with an orange seam precedes each chapter; the mesh enters with a fresh pose. Back navigation also replays the entrance.
- The existing glassbound component is retained once in the lower AI demo, alongside the live chat. It is removed from the AI hero. The other former chapter hero effects are replaced by hero-44; their original sources remain installed.
- Copy and chapter terms/poses live in `content/site.ts`. Home, Contact and the individual case-study heroes keep their existing compositions.

## Source changes

The downloaded entry forwards props. Production imports its typed SectionHero directly, keeping the prototype stylesheet out of the critical page load. The section has an optional content/artwork slot using the original assets; the default study remains available at `/playground`. The plasma source adds optional `initialRotation` and `hotspotColor`, allows a transparent host, applies the shared DPR cap and explicitly disposes its buffers, shaders and program. The optional SectionHeroProps annotation fixes consumer inference for the new slots without changing visuals. No visual renderer was recreated. The CLI-added external font imports were removed; production retains the self-hosted studio typography.

The scene uses the existing lazy renderer and shared two-context budget. Off-screen or hidden-tab surfaces unmount and dispose; mobile uses density 48 instead of 88 and DPR 1. Reduced motion gets an actual transparent capture of the native canvas. Server-rendered text and actions remain visible without JavaScript. The plasma fallback stays available in SSR markup, but is not preloaded ahead of fonts and the live scene; the large native mist image is preloaded instead.

## Browser captures

| Profile                      | Native render calls / second | Highest p95 frame interval | Effective DPR |
| ---------------------------- | ---------------------------- | -------------------------- | ------------- |
| Desktop · 1440 × 1000        | 144.1–144.4                  | 7.4 ms                     | 1             |
| iPhone viewport · 390 × 844  | 143.8–144.2                  | 7.4 ms                     | 1             |
| Android viewport · 412 × 915 | 144.0–144.2                  | 7.3 ms                     | 1             |

All 18 hero captures contain exactly one live canvas. No title or CTA was clipped; no horizontal overflow or console errors were recorded (0 errors). Mobile captures use 4× CPU throttling, 40 ms network latency and 4 Mbps throughput. The host runs at 144 Hz: these are instrumented WebGL draw-call rates, not measurements on physical phones or guarantees of composited GPU FPS.

## Validation

The production build and full 24-test browser suite passed. The build ran from an isolated copy on the same drive, using the shared dependency installation, so the running developer server was preserved. Browser checks cover real client-side navigation between all six pages, repeated word entrances, back navigation, native canvas lifecycle and the two-context ceiling, the lower AI demo, both touch viewport widths, reduced motion and no JavaScript.

## Lighthouse mobile

| Page      | Performance | Accessibility | Best practices | SEO | LCP   |
| --------- | ----------- | ------------- | -------------- | --- | ----- |
| /services | 93          | 100           | 100            | 100 | 3.2 s |
| /work     | 92          | 100           | 100            | 100 | 3.2 s |

These are local production-preview Lighthouse measurements; physical-device and deployed-network performance can differ. See [the audit results](lighthouse-results.json).

To capture again against a running preview: `npm run capture:chapters`. Set `BASE_URL` to use a different preview origin.
