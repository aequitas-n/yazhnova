# Shared footer: Ridge Parallax

The genuine OriginKit `ridge-parallax` now replaces the shared footer's rain backdrop on every page. It remains one continuous particle landscape beneath the links and existing footer-03 wordmark. The ink fade protects the contact information; lighten blending removes the wordmark canvas's opaque rectangle.

Installed successfully with `npx originkit@latest add ridge-parallax --path components/originkit`. The original geometry, shader noise, drift and scroll parallax remain intact. No component failures, missing dependencies or new placeholder slots.

Palette: ink `#0A0A0A`, distant warm grey `#57534E`, signal orange `#FF3B00`, paper wordmark `#F4F2EC`. The previous red rain wash is removed. All content still comes from `content/site.ts`.

| Capture | Viewport | Result |
| --- | --- | --- |
| [Desktop footer](desktop.png) | 1440 × 1000 | Live landscape and wordmark, DPR 1.5 |
| [iPhone viewport](iphone-viewport.png) / [whole footer](iphone.png) | 390 × 844, touch | Animated at DPR 1 |
| [Android viewport](android-viewport.png) / [whole footer](android.png) | 412 × 915, touch | Animated at DPR 1 |
| [Reduced motion](reduced-motion.png) | 390 × 844 | Source-captured frames, zero canvases |
| [Source study](../shots/ridge-parallax.png) | Default and editorial | Both native WebGL variants render without errors |

Desktop uses six layers at density 70, approximately 109,000 points; phones use four layers at density 36, approximately 37,400 points. The shared visibility wrapper lazily mounts the source and retires it off-screen. Native cleanup additionally deletes buffers, attached shaders and the program. The existing two-context budget includes the wordmark. These are quality presets, not measured FPS claims.

Validation: TypeScript and the production build pass. Two existing browser tests check the shared shell across all eight pages and the two-context lifecycle. The [capture results](results.json) confirm changing native canvas pixels, no overflow or console/page errors, a maximum of two live contexts, and complete footer canvas retirement off-screen at desktop and both phone sizes. Reduced motion uses the actual [captured ridge frame](../../public/frames/signal/ridge.png).

Reproduce with a running local server:

```powershell
$env:BASE_URL="http://localhost:3000"
node scripts/capture-footer.mjs
$env:FRAME_KINDS="ridge"
npm run capture:frames
$env:STUDY_SLUG="ridge-parallax"
npm run capture:studies
```

The review uses Chrome mobile viewport emulation, not physical phones. Nothing requested for this footer was skipped. Changes are local and have not been pushed.
