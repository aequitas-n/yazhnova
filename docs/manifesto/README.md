> Current typography: [quieter desktop](quiet-desktop.png) ? [quieter mobile](quiet-mobile.png). The orange statement is slightly smaller and the newspaper is now at 12% opacity. Earlier captures below document the previous scale.

# Full-screen manifesto

The manifesto fills the viewport. Its orange statement is painted by the actual paperline-archive canvas, using the studio's tight grotesk type and the component's letter timing, easing, hold and staggered fade. It starts on entry and repeats; the previous empty text/speed-zero preset is removed. Newspaper contrast is independent of the orange ink, and the masthead clears the sticky navigation.

- [Desktop](desktop.png) ? [Drawing](desktop-drawing.png)
- [Phone](mobile.png) ? [Drawing](mobile-drawing.png)
- [Reduced motion](reduced-motion.png)
- [Live animation recording](animation.webm)

The accessible statement remains an HTML H2. Reduced motion and no-JavaScript visits receive final frames captured from this same renderer, with a portrait image for phones. Off-screen/document gating continues to pause and unmount the actual canvas.

Validation: production build, TypeScript and four browser regressions covering desktop/mobile orange-pixel changes through paint/fade/repeat, full viewport height, overflow, off-screen disposal and responsive reduced-motion frames and no-JavaScript rendering. Browser captures reported no console errors. No effects were substituted for the original native component.
