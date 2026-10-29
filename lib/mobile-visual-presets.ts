import type { VisualKind } from "./visual-presets";

// Cost controls only. Brand colors and story/graph inputs come from the composition.
export const mobileVisualPresets: Partial<Record<VisualKind, Record<string, unknown>>> = {
  "contact-rain": {
    pixelRatio: 0.5,
    rain: 32,
    speed: 28,
    drops: { ripples: 12, streaks: 7 },
    cursor: { reach: 28, ripple: 40, glow: 20 },
  },
  plasma: { density: 32, speed: 20, waveHeight: 12, scale: 42 },
  manifesto: { size: 64, advanced: { pixelRatio: 1.5 } },
  "hero-dither": {
    fit: "cover",
    focusY: 50,
    dotSize: 1,
    ditherStrength: 25,
    detailDpr: 1.5,
    imageWhite: "#F4F2EC",
    wave: true,
    waveSpeed: 8,
    waveDensity: 12,
  },
  "hero-stone": {
    quality: "medium",
    detailDpr: 1.5,
    structure: { shards: 12, irregularity: 5, thickness: 6 },
    debris: { count: 6, size: 2, spread: 2 },
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
  ridge: {
    density: 36,
    dotSize: 30,
    range: { layers: 4, height: 110, roughness: 65, fall: 110, seed: 7 },
  },
  rain: { rain: 6, drops: { ripples: 7, streaks: 2 } },
  globe: {
    detail: 2,
    dots: { color: "#FF3B00", size: 4, density: 3, allDots: false },
    stopOnHover: false,
  },
  wordmark: { lines: { density: 8, width: 12, softness: 90, depth: 1, overshoot: 2, flicker: 0 } },
};
