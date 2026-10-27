# Contact ? hero-55

Installed the real hero-55 through OriginKit and recomposed its native rain-slick street around the existing enquiry form. The wet ground and ripples are WebGL, with grayscale reflections and a localized orange pointer light. The section has its own heading hierarchy, studio typography and brand colors; the original ecommerce content remains only in the source study.

## Captures

- [Desktop 1440 ? 1000](desktop.png)
- [iPhone viewport 390 ? 844](iphone.png)
- [Android viewport 412 ? 915](android.png)
- [Reduced motion](reduced-motion.png)
- [Default + editorial source study](../shots/hero-55.png)

## Verification

Production build and TypeScript pass. Focused browser checks cover form preselection, validation, mocked submission confirmation, invalid-request handling, metadata/shared shell, reduced motion, and cancellation while native shader compilation is pending. No live enquiry emails were sent. Source study and production captures reported no console errors.

Both touch profiles use live animation, DPR 0.75 and fewer native ripples/streaks. The desktop uses DPR 1. Off-screen disposal, reduced-motion frames and the shared two-context budget remain in force. Mobile captures use 4? CPU throttling, 4 Mbps download and 40 ms latency. Draws were sampled for two seconds; these are desktop Chrome emulations on the host GPU, not measurements from physical phones. See [raw capture results](results.json).

Mobile Lighthouse: performance 94, accessibility 100, best practices 100, SEO 100; LCP 3.0 s, TBT 80 ms, CLS 0.047. [Audit summary](lighthouse.json). Parallel shader warmup removed the initial synchronous compilation stall.

Nothing skipped or replaced by a recreated effect. The previous ocean source stays installed and reviewable in the playground.
