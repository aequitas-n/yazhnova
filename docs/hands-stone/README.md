> Latest composition: [diagonal reference refinement](diagonal/README.md), with the left palm lower, right hand higher and a larger live stone. The images below document the previous pass.

# Landscape hands and the live stone

Home now uses the actual installed standalone dither-reveal component instead of hero-40's companion. The hands reach in from opposite sides in a wide landscape composition. The orange-veined hero-69 stone stays between their fingertips after the intro; the headline is above and supporting copy/actions below. The ink, paper, graphite and orange palette remains.

## Review

- [Desktop](desktop.png) ? [Wide desktop](wide-desktop.png)
- [Mobile](mobile.png) ? [Short phone](short-phone.png)
- [Reduced motion](reduced-motion.png) ? [After the intro](after-intro.png)
- [Actual intro-to-hero recording](intro-to-hero.webm)
- [Image asset, tool mode and final edit prompt](asset.md)

The hand photograph is an imagegen edit of the existing source, not a rendered mockup of the site. The selected asset is saved at public/originkit/dither-reveal/hands-landscape.webp (1942 ? 809, 49,568 bytes). The real dither shader supplies the reveal, ripple/wave and pointer interaction. The stone is a separately rendered real mesh with orange veins and native debris, with transparent output so it can sit over the hands.

## Loading and motion

There are two live WebGL contexts in this hero. The third horizon canvas and former orange dot were removed from the Home composition. Both native surfaces use the shared visibility budget and dispose off-screen. Touch uses lighter live presets; reduced motion uses source-captured frames. The hand texture preloads, and preview frames remain until the actual renderer's first draw. Pre-sized preview frames are served directly to avoid a cold on-demand resize: hands use a compact lossless PNG, and the transparent stone preview is a 9,754-byte WebP. The mobile manifesto capture also uses a smaller WebP.

## Verification

Production build, TypeScript and 17 browser regressions pass, covering intro completion/cancellation/failure, two-context lifecycle, source canvases, mobile typography at four widths, delayed fonts/textures, reduced motion and the manifesto. Static-frame/loading checks were repeated after resource optimization. Captures reported no console errors or horizontal overflow. [Capture results](results.json). Mobile captures use Chrome touch emulation with 4? CPU throttling, 2 Mbps download and 100 ms latency; these are not physical-phone measurements.

Mobile Lighthouse: performance 90, accessibility 100, best practices 100, SEO 100; LCP 3.5 s, TBT 130 ms and CLS 0. [Audit summary](lighthouse.json).

The requested CLI retry returned a signed-out error. The genuine standalone component was already installed and was used directly; no visual was recreated as CSS/SVG, and no source moved to a failure slot. The previous hero-40 source remains available in the playground.
