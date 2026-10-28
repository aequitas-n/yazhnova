# Diagonal reference composition

The left hand now sits lower with its palm facing up. The right hand reaches down from above. A much larger real hero-69 stone floats in the central opening, matching the supplied reference's diagonal arrangement. The hand photograph was reshaped using the imagegen skill; dithering, pointer response, stone geometry, orange veins and debris remain live native component code.

## Review

- [Desktop visual only](desktop-visual.png) ? closest comparison with the supplied reference
- [Complete desktop hero](desktop.png) ? [First viewport](desktop-viewport.png)
- [Complete mobile hero](mobile.png) ? [Mobile visual](mobile-visual.png)
- [Short phone](short-phone.png) ? [Reduced motion](reduced-motion.png)
- [After the intro](after-intro-visual.png) ? [Intro-to-hero recording](intro-to-diagonal.webm)
- [Asset, exact edit prompt and built-in tool mode](asset.md)

Both palms and all fingertips remain inside the visual. Copy stays above/below it. The taller stage can extend beyond one screen to preserve the entire composition; short screens scroll naturally. The palette remains ink, graphite, paper and orange.

## Validation

Production build, TypeScript and 13 browser checks pass: intro completion, cancellation/failure handling, persistent live stone, two-context lifecycle, four mobile widths, delayed fonts/texture loading and reduced motion. The reduced-motion test also checks the stone image for visible orange vein pixels, preventing an empty transparent capture from passing. [Capture/console results](results.json).

The loading/reduced-motion captures were regenerated at the new pose and stone scale. The helper waits for a genuine first native render and verifies non-empty alpha before saving the transparent stone. No components were skipped or replaced with CSS/SVG replicas.

The hand preview is palette-packed losslessly: 19,386 bytes, with an exact pixel comparison against the original capture. Its foreground preview retains high fetch priority; the pre-discovered live texture uses lower fetch priority so fonts and the visible preview load first. The final mobile Lighthouse run scored performance 91, accessibility 100, best practices 100 and SEO 100, with LCP 3.2 s, TBT 160 ms and CLS 0. [Audit summary](lighthouse.json).
