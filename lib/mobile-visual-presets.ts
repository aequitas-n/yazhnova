import type { VisualKind } from "./visual-presets";

// Cost controls only. Brand colors and story/graph inputs come from the composition.
export const mobileVisualPresets: Partial<Record<VisualKind, Record<string, unknown>>> = {
  "contact-rain": {
    pixelRatio: 0.75,
    rain: 68,
    speed: 28,
    drops: { ripples: 25, streaks: 16 },
    cursor: { reach: 28, ripple: 40, glow: 20 },
  },
  plasma: { density: 48, speed: 20, waveHeight: 12, scale: 42 },
  manifesto: { advanced: { pixelRatio: 1.5 } },
  "hero-dither": {
    fit: "contain",
    focusY: 50,
    dotSize: 5,
    wave: true,
    waveSpeed: 8,
    waveDensity: 12,
  },
  iris: { scale: 95, advanced: { fiber: 30, veins: 0, gloss: 50 } },
  pixels: { density: 25, advanced: { cellsAcross: 72, grain: 0, halo: 0 } },
  liquid: { cellSize: 48, intensity: 28, radius: 100 },
  glossy: { advanced: { resolution: 40, steps: 36, filmPatches: 0 } },
  glassbound: { size: 125, advanced: { quality: 35, grain: 0, hover: 15 } },
  cables: {
    bundle: { count: 8, bend: 32, spread: 100, thickness: 95, widthStart: 150, widthEnd: 12 },
    flow: { flow: 60, pulses: 2 },
  },
  strings: { strands: 90, particles: 10, strandWidth: 14, cursor: 10 },
  network: { density: 24 },
  shadow: { density: 9, grain: 0 },
  gate: { gates: 3, points: 6, glow: 1.5 },
  ocean: { detail: 3, cloud: 0, foamAmount: 0, glitter: 3, drag: 0 },
  rain: { rain: 6, drops: { ripples: 7, streaks: 2 } },
  globe: {
    detail: 2,
    dots: { color: "#FF3B00", size: 4, density: 3, allDots: false },
    stopOnHover: false,
  },
  wordmark: { lines: { density: 8, width: 12, softness: 90, depth: 1, overshoot: 2, flicker: 0 } },
};
