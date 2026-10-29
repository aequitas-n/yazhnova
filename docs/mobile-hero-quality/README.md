# Mobile intro and hero quality — 29 October 2026

The refresh screenshot showed the sharp loading poster. Once native rendering started, the mobile preset applied a coarse three-tone dither and a DPR-1 buffer. The stone also skipped tone mapping and output color conversion along with bloom, leaving the live surface darker than the poster. Its main geometry was reduced from twelve shards to eight. These were rendering changes, not an image download or layout problem.

Mobile also explicitly accelerated the 5.4-second intro to 2.1 seconds. The acceleration is removed: the fracture, wordmark hold, reformation and docking now share desktop timing. The same live canvas remains intact through the handoff.

The hands now retain the original texture with a finer, lighter dither. Their image white point matches the paper background. Both small hero surfaces can use DPR up to 1.5 within a 262,144-pixel detail budget per surface. The full-screen mobile intro retains DPR 1; its 30fps cadence, six debris pieces and disabled bloom remain. Twelve primary shards preserve the source silhouette. Direct rendering now performs the same tone mapping and output color conversion as the final desktop composite, without allocating bloom passes.

| Chrome touch viewport, DPR 3, CPU 4× | Before  | After   |
| ------------------------------------ | ------- | ------- |
| 390px intro playback after readiness | 2.17s   | 5.39s   |
| 412px intro playback after readiness | 2.10s   | 5.41s   |
| 390px hands buffer                   | 390×250 | 585×375 |
| 390px stone buffer                   | 108×108 | 162×162 |
| 412px hands buffer                   | 412×264 | 618×396 |
| 412px stone buffer                   | 114×114 | 171×171 |

Both mobile surfaces submitted approximately 30fps after the changes (29.98–30.06). Two WebGL contexts were live after docking; no page errors were recorded. These are local Chrome/SwiftShader emulations, not physical-device GPU presentation measurements. See [before measurements](before.json), [after measurements](after.json), [before screenshot](before-390.png) and [after screenshot](after-390.png).

The production build, TypeScript and twelve focused browser checks pass, including intro recovery, continuity, refresh quality, reduced motion and the shared runtime budget.

Reproduce captures using `BASE_URL=http://localhost:3001 REVIEW_PHASE=after node scripts/review-mobile-hero.mjs` against a production server. `tests/mobile-hero-quality.spec.ts` checks both touch widths, the full intro duration and wordmark hold, canvas continuity, live quality after reload, paper-colored background pixels, no overflow, and reduced-motion teardown. Existing intro/runtime checks retain Escape, failed-context recovery and the two-context limit.
