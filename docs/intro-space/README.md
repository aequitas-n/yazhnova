# Full-viewport intro shards

The intro used to render inside a centered square canvas, leaving an invisible boundary that clipped shards before they reached the screen edge. It now renders across the complete viewport, including the extra horizontal space on desktop and vertical space on phones.

The genuine hero-69 renderer gains an optional `viewportFraming` choreography flag. It extends the original camera frustum through a centered view offset, preserving perspective, formed-stone size, lighting, physics and fracture paths. Existing presets keep their original camera behavior. CSS transforms move the stable full-viewport canvas during docking; it resizes once when the same portal returns to the square hero slot. The previous responsive stone-to-hands cap still applies in the settled hero.

- [Before: clipped square](before.png)
- [Desktop: shards across the viewport](desktop-opened.png)
- [Mobile: shards above and below the old square](mobile-opened.png)
- [Desktop after docking](desktop-docked.png)
- [Mobile after docking](mobile-docked.png)
- [Measured results](results.json)

The review verifies full-viewport canvas bounds, visible rock/vein pixels outside the former square, the exact same canvas after docking, and no console/page errors at 1920 x 1080 and 390 x 844. Seven existing intro/hands browser checks cover beat order, context limits, continuity, Escape, failed WebGL warmup, reduced motion and mobile completion. TypeScript and the production build also pass.

Reproduce with `node scripts/capture-intro-space.mjs` against the local server; `BASE_URL` can select another server. The capture detects actual rendered shard pixels outside the former canvas, rather than relying only on an oversized DOM element.
