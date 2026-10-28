# One stone, from intro to hero

The stone opens once, reveals YAZHNOVA, then reforms. It stays intact during the final transition, moving smoothly into the space between the homepage hands as the ink background fades away. The hands gently enter underneath it. There is no second burst or radial hole reveal.

Replay locally at `http://localhost:3000/?intro=replay`.

- [Desktop recording](desktop.webm)
- [Mobile recording](mobile.webm)
- [Centered opening](desktop-formed.png)
- [Wordmark](desktop-wordmark.png)
- [Desktop transition](desktop-transition.png) and [settled hero](desktop-hero.png)
- [Mobile transition](mobile-transition.png) and [settled hero](mobile-hero.png)

The shared HomeStone owns a stable portal container. That container temporarily lives in the intro and then moves into the home slot. The actual WebGL canvas, GPU context, geometry, material and clock survive the move. The viewport-sized render target retains its dimensions during the transform and resizes once on arrival. An optional camera view offset extends the original square framing across the viewport without changing the stone's perspective or apparent size. Camera framing and debris spread ease into the homepage settings; idle rotation continues from the final intro pose. See [the full-viewport shard review](../intro-space/README.md).

Desktop playback lasts approximately 5.4 seconds after the first native frame, mobile approximately 2.1 seconds. Escape, session skipping, reduced motion, loading failure recovery and no-JavaScript access remain available. No visible Skip button was added.

Verification: production build, TypeScript and seven focused intro/hands browser tests pass. The tests assert the centered opening and the exact same canvas after docking, along with the existing context budget, cleanup and accessibility behaviors. Production recordings at 1440 × 1000 and 390 × 844 confirm the complete beat sequence, live context continuity, no console/page errors, no horizontal overflow and no more than two live WebGL contexts. These are Chrome viewport checks, not physical-device measurements or FPS benchmarks. See [capture observations](results.json).

Reproduce captures with `node scripts/capture-stone-continuity.mjs`; set `BASE_URL` to select a running server. No requested part of the transition was skipped. Changes have not been pushed.
