# Mobile Home: typography and hand loading

Fixed the mobile hero's overlapping labels/actions and removed its blank image-loading interval. The hero can grow on shorter screens; the headline, description, actions, closing note and baseline now occupy separate rows. The decorative duplicate caption is hidden on phones. Both hands stay in the full section backdrop, with their signal placed between the headline and description.

The real hand texture is now a 20,192-byte WebP at the original 1114 ? 1411 dimensions, replacing the 1,043,155-byte PNG download in production. Home preloads it; the native shader raises readiness only after the texture has been uploaded and drawn. The captured preview remains visible until that handoff. Mobile animation remains enabled.

## Captures

- [Short phone 360 ? 640](short-phone.png)
- [Android viewport 393 ? 720](android.png)
- [iPhone viewport 390 ? 844](iphone.png)
- [Tall phone 412 ? 915](tall-phone.png)
- [Reduced motion](reduced-motion.png)
- [Cold first visit with stone intro](first-visit.png)

Captures use Chrome touch emulation at DPR 3, 4? CPU throttling, 2 Mbps download and 100 ms latency. They are browser emulations, not physical-device measurements. [Resource timings and console results](results.json).

## Checks

Build and TypeScript pass. Browser regressions verify heading bounds and non-overlapping content at 320 ? 568, 360 ? 640, 393 ? 720 and 412 ? 915. Deliberately delayed brand fonts verify the fallback font layout; deliberately held texture requests verify that the preview remains visible before the native canvas takes over. Existing manifesto, reduced-motion and mobile-menu checks also run. The six chapter heroes were inspected at 393 ? 700 without overflow or heading/description overlap.

The final twelve focused browser checks passed. The mobile Lighthouse run scored performance 91, accessibility 100, best practices 100 and SEO 100, with LCP 3.4 s, TBT 130 ms and CLS 0. [Audit summary](lighthouse.json). The throttled captures observed one preloaded texture request per visit, taking about 0.52?0.57 seconds; no duplicate PNG texture requests, horizontal overflow or console errors were observed. These timings describe this local browser test, not a guarantee for a physical phone or connection.
