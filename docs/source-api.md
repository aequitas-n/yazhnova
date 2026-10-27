# Installed source API reference

Generated from the untouched files. All optional props retain their original defaults unless an adapter explicitly overrides them.

## components/originkit/ui/beyond-horizon.tsx

```ts
export interface BeyondHorizonProps {
  background?: string;
  coreColor?: string;
  midColor?: string;
  deepColor?: string;
  brightness?: number;
  coreSize?: number;
  coreHover?: number;
  haze?: number;
  speed?: number;
  parallax?: number;

  fit?: number;
  horizonY?: number;
  horizonRadius?: number;
  rimSpread?: number;
  style?: React.CSSProperties;
}
```

## components/originkit/ui/dither-reveal.tsx

```ts
DEFAULT_IMAGE =
  "https://plus.unsplash.com/premium_photo-1726099913477-291d8ca697f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWVzdGhldGljJTIwY29sb3JmdWwlMjBwb3J0cmFpdCUyMGZ1dHVyaXN0aWN8ZW58MHx8MHx8fDA%3D";

DEFAULTS = {
  image: { src: DEFAULT_IMAGE },
  fit: "cover" as "cover" | "contain",
  focusY: 50,
  ditherStyle: "bayer8" as "bayer8" | "lines" | "noise",
  dotSize: 5,
  revealRadius: 100,
  revealSoftness: 50,
  wave: true,
  waveSpeed: 82,
  waveDensity: 25,
};

interface DitherRevealProps {
  image?: { src?: string; url?: string; alt?: string } | string;
  fit?: "cover" | "contain";
  focusY?: number;
  ditherStyle?: "bayer8" | "lines" | "noise";
  dotSize?: number;
  revealRadius?: number;
  revealSoftness?: number;
  wave?: boolean;
  waveSpeed?: number;
  waveDensity?: number;
  style?: CSSProperties;
}
```

## components/originkit/ui/dithered-pixel-grid.tsx

```ts
export interface StitchNovaProps {
  pattern?: "artwork" | "generated";

  planet?: boolean;

  background?: string;

  scale?: number;

  density?: number;

  dither?: number;

  color?: string;

  offColor?: string;

  gridColor?: string;

  hover?: number;

  rippleSize?: number;

  rippleStrength?: number;

  speed?: number;

  angle?: number;

  advanced?: Partial<StitchNovaAdvanced>;
  style?: CSSProperties;
}

export interface StitchNovaAdvanced {
  seed: number;
  cellsAcross: number;
  planetSize: number;
  planetX: number;
  planetY: number;
  rimWidth: number;
  rimGap: number;
  gridWidth: number;
  gridOpacity: number;
  bevel: number;
  highlight: number;
  mottle: number;
  grain: number;
  vignette: number;
  streakLength: number;
  streakWidth: number;
  blobSize: number;
  streakMix: number;
  octaves: number;
  contrast: number;
  bias: number;
  specks: number;
  planetDetail: number;
  warp: number;
  landLevel: number;
  lightAngle: number;
  halo: number;
  haloWidth: number;
  drift: number;
  morph: number;
  spin: number;
  glintGap: number;
  glintWidth: number;
  glintSpeed: number;
  pointerRadius: number;
  pressBoost: number;
  rippleBend: number;
  rippleWidth: number;
  rippleLife: number;
}

DEFAULTS = {
  pattern: "artwork",
  planet: true,
  background: "#000000",
  scale: 41,
  density: 50,
  dither: 40,
  color: "#FF759B",
  offColor: "#292728",
  gridColor: "#0E0D0D",
  hover: 100,
  rippleSize: 5,
  rippleStrength: 5,
  speed: 50,
  angle: 25,
};

DEFAULT_ADVANCED: StitchNovaAdvanced = {
  seed: 7,
  cellsAcross: 97,
  planetSize: 18,
  planetX: 0,
  planetY: 0,
  rimWidth: 2,
  rimGap: 1,
  gridWidth: 11,
  gridOpacity: 100,
  bevel: 0,
  highlight: 10,
  mottle: 0,
  grain: 0,
  vignette: 0,
  streakLength: 22,
  streakWidth: 6,
  blobSize: 14,
  streakMix: 55,
  octaves: 4,
  contrast: 120,
  bias: -4,
  specks: 45,
  planetDetail: 5,
  warp: 50,
  landLevel: 0,
  lightAngle: 225,
  halo: 60,
  haloWidth: 3,
  drift: 4,
  morph: 10,
  spin: 12,
  glintGap: 40,
  glintWidth: 4,
  glintSpeed: 8,
  pointerRadius: 15,
  pressBoost: 100,
  rippleBend: 3,
  rippleWidth: 6,
  rippleLife: 1.4,
};
```

## components/originkit/ui/features-02/globe.tsx

```ts
DEFAULT_DOTS: DotsConfig = {
  color: "#262626",
  size: 5,
  density: 8,
  allDots: false,
};

DEFAULT_MARKER_CONFIG: MarkerConfig = {
  markers: [],
  color: "#00f7ff",
  size: 40,
};

interface GlobeProps {
  speed?: number;
  smoothing?: number;
  dots?: DotsConfig;
  fill?: "dots" | "solid";
  fillColor?: string;
  scale?: number;
  stopOnHover?: boolean;
  markerConfig?: MarkerConfig;
  direction?: "left" | "right";
  initialLatitude?: number;
  initialLongitude?: number;
  oceanColor?: string;
  outlineColor?: string;
  showOutline?: boolean;
  graticuleColor?: string;
  showGrid?: boolean;
  outlineWidth?: number;
  dragSpeed?: number;
  detail?: number;
  interactive?: boolean;
  style?: CSSProperties;
}
```

## components/originkit/ui/footer-03/light-shaft-text.tsx

```ts
DEFAULT_TEXT = "bolt";

DEFAULT_FONT = {
  fontFamily: "Inter",
  fontWeight: 800,
  fontSize: 480,
};

DEFAULT_LINES = {
  density: 88,
  width: 45,
  softness: 18,
  depth: 16,
  overshoot: 30,
  flicker: 70,
};
```

## components/originkit/ui/glassbound.tsx

```ts
ADVANCED_DEFAULTS = {
  tilt: 50,
  perspective: 80,
  ballOffset: 9,
  gridAngle: 20,
  travelAngle: 10,
  ballRadius: 87,
  moundInner: 35,
  heightJitter: 20,
  missingTiles: 25,
  tileGap: 8,
  floorGap: 3,
  cornerRound: 12,
  studSize: 4,
  floorLift: 16,
  peachColor: "#F0D6C9",
  innerColor: "#A8442A",
  studColor: "#8E8882",
  lightAngle: 135,
  lightHeight: 50,
  ambient: 65,
  shadowEdge: 10,
  shadowStrength: 80,
  band: 30,
  glassRim: 60,
  specular: 80,
  refraction: 40,
  quality: 60,
  grain: 0,
  vignette: 0,
  hover: 50,
};

export interface SceneBallHalfProps {
  background?: string;
  accent?: string;
  speed?: number;
  size?: number;
  radius?: number;
  lift?: number;
  advanced?: {
    tilt?: number;
    perspective?: number;
    ballOffset?: number;
    gridAngle?: number;
    travelAngle?: number;
    ballRadius?: number;
    moundInner?: number;
    heightJitter?: number;
    missingTiles?: number;
    tileGap?: number;
    floorGap?: number;
    cornerRound?: number;
    studSize?: number;
    floorLift?: number;
    peachColor?: string;
    innerColor?: string;
    studColor?: string;
    lightAngle?: number;
    lightHeight?: number;
    ambient?: number;
    shadowEdge?: number;
    shadowStrength?: number;
    band?: number;
    glassRim?: number;
    specular?: number;
    refraction?: number;
    quality?: number;
    grain?: number;
    vignette?: number;
    hover?: number;
  };
  style?: CSSProperties;
}
```

## components/originkit/ui/hero-28/black-hole.tsx

```ts
DEFAULT_CENTRE = {
  voidRadius: 40,
  voidX: 50,
  voidY: 50,
};

DEFAULTS = {
  showCenter: true,
  centre: DEFAULT_CENTRE,
  particleCount: 1000,
  particleSize: 4,
  colors: ["#ffffff"],
  outerRadius: 70,
  tilt: 20,
  tiltSideway: 160,
  trail: 50,
  orbitSpeed: 4,
  pullSpeed: 0,
};

COMPONENT_DEFAULTS = {
  showCenter: DEFAULTS.showCenter,
  centre: {
    voidRadius: DEFAULT_CENTRE.voidRadius,
    voidX: DEFAULT_CENTRE.voidX,
    voidY: DEFAULT_CENTRE.voidY,
  },
  colors: DEFAULTS.colors,
  outerRadius: DEFAULTS.outerRadius,
  particleCount: DEFAULTS.particleCount,
  particleSize: DEFAULTS.particleSize,
  orbitSpeed: DEFAULTS.orbitSpeed,
  trail: DEFAULTS.trail,
  tilt: DEFAULTS.tilt,
  tiltSideway: DEFAULTS.tiltSideway,
  pullSpeed: DEFAULTS.pullSpeed,
};
```

## components/originkit/ui/hero-28/blackhole.tsx

```ts
DEFAULT_CENTRE = {
  voidRadius: 40,
  voidX: 50,
  voidY: 50,
};

DEFAULTS = {
  showCenter: true,
  centre: DEFAULT_CENTRE,
  particleCount: 1000,
  particleSize: 4,
  colors: ["#ffffff"],
  outerRadius: 70,
  tilt: 20,
  tiltSideway: 160,
  trail: 50,
  orbitSpeed: 4,
  pullSpeed: 0,
};

COMPONENT_DEFAULTS = {
  showCenter: DEFAULTS.showCenter,
  centre: {
    voidRadius: DEFAULT_CENTRE.voidRadius,
    voidX: DEFAULT_CENTRE.voidX,
    voidY: DEFAULT_CENTRE.voidY,
  },
  colors: DEFAULTS.colors,
  outerRadius: DEFAULTS.outerRadius,
  particleCount: DEFAULTS.particleCount,
  particleSize: DEFAULTS.particleSize,
  orbitSpeed: DEFAULTS.orbitSpeed,
  trail: DEFAULTS.trail,
  tilt: DEFAULTS.tilt,
  tiltSideway: DEFAULTS.tiltSideway,
  pullSpeed: DEFAULTS.pullSpeed,
};
```

## components/originkit/ui/hero-40/dither-reveal.tsx

```ts
DEFAULT_IMAGE =
  "https://plus.unsplash.com/premium_photo-1726099913477-291d8ca697f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWVzdGhldGljJTIwY29sb3JmdWwlMjBwb3J0cmFpdCUyMGZ1dHVyaXN0aWN8ZW58MHx8MHx8fDA%3D";

DEFAULTS = {
  image: { src: DEFAULT_IMAGE },
  fit: "cover" as "cover" | "contain",
  focusY: 50,
  ditherStyle: "bayer8" as "bayer8" | "lines" | "noise",
  dotSize: 5,
  revealRadius: 100,
  revealSoftness: 50,
  wave: true,
  waveSpeed: 82,
  waveDensity: 25,
};

interface DitherRevealProps {
  image?: { src?: string; url?: string; alt?: string } | string;
  fit?: "cover" | "contain";
  focusY?: number;
  ditherStyle?: "bayer8" | "lines" | "noise";
  dotSize?: number;
  revealRadius?: number;
  revealSoftness?: number;
  wave?: boolean;
  waveSpeed?: number;
  waveDensity?: number;
  style?: CSSProperties;
}
```

## components/originkit/ui/hero-51/grin-iris.tsx

```ts
DEFAULTS = {
  background: "#000000",
  scale: 110,
  irisColor: "#FF2400",
  scleraColor: "#FFFFFF",
  pupilSize: 0,
  follow: "frame",
  reach: 10,
  dilate: 5.2,
  wander: 10,
  float: 10,
};

DEFAULT_ADVANCED = {
  restX: 22,
  restY: 1,

  maxTurn: 42,

  irisAngle: 29,

  bulge: 12,
  markColor: "#FFFFFF",
  collarColor: "#7A4A22",
  lightAngle: 0,
  gloss: 100,
  redness: 100,
  veins: 30,
  limbus: 75,
  fiber: 100,
  followMs: 45,
  saccadeMs: 2200,
  hippus: 30,
};

export interface GrinIrisProps {
  background?: string;

  scale?: number;

  irisColor?: string;

  scleraColor?: string;

  pupilSize?: number;

  follow?: "page" | "frame" | "off";

  reach?: number;

  dilate?: number;

  wander?: number;

  float?: number;

  advanced?: Partial<Advanced>;
  style?: CSSProperties;
}
```

## components/originkit/ui/hero-69/ember-husk.tsx

```ts
DEFAULT_BACKGROUND = {
  color: "#1A0402",
  glowColor: "#FF2606",
  glow: 6,
};

DEFAULT_STRUCTURE = {
  shards: 11,
  irregularity: 6,
  thickness: 5,
};

DEFAULT_ROCK = {
  color: "#171512",
  weathering: 5,
  seam: 4,
};

DEFAULT_CORE = {
  color: "#FF3B00",
  hotColor: "#FFC46A",
  intensity: 6,
  flow: 5,
};

DEFAULT_DEBRIS = {
  count: 54,
  size: 5,
  spread: 5,
};

DEFAULT_CROSSES = {
  count: 52,
  size: 5,
  thickness: 5,
  color: "#EDEFF5",
  spread: 5,
};

DEFAULT_ENTRANCE = {
  scatter: 6,
  tumble: 6,
  stagger: 4,
};

DEFAULT_RESPONSE = {
  reach: 5,
  strength: 5,
  repel: 6,
  settle: 5,
};

DEFAULT_DRIFT = {
  spin: 3,
  bob: 4,
  sway: 4,
};

DEFAULT_GLOW = {
  strength: 5,
  radius: 5,
  threshold: 5,
};

DEFAULTS = {
  size: 1.6,
  beads: 5,
  quality: "high",
};

export interface EmberHuskBackground {
  color?: string;

  glowColor?: string;

  glow?: number;
}

export interface EmberHuskStructure {
  shards?: number;

  irregularity?: number;

  thickness?: number;
}

export interface EmberHuskRock {
  color?: string;

  weathering?: number;

  seam?: number;
}

export interface EmberHuskCore {
  color?: string;

  hotColor?: string;

  intensity?: number;

  flow?: number;
}

export interface EmberHuskDebris {
  count?: number;

  size?: number;

  spread?: number;
}

export interface EmberHuskCrosses {
  count?: number;

  size?: number;

  thickness?: number;

  color?: string;

  spread?: number;
}

export interface EmberHuskEntrance {
  scatter?: number;

  tumble?: number;

  stagger?: number;
}

export interface EmberHuskResponse {
  reach?: number;

  strength?: number;

  repel?: number;

  settle?: number;
}

export interface EmberHuskDrift {
  spin?: number;

  bob?: number;

  sway?: number;
}

export interface EmberHuskGlow {
  strength?: number;

  radius?: number;

  threshold?: number;
}

export interface EmberHuskProps {
  background?: EmberHuskBackground;

  size?: number;
  structure?: EmberHuskStructure;
  rock?: EmberHuskRock;
  core?: EmberHuskCore;
  crosses?: EmberHuskCrosses;
  debris?: EmberHuskDebris;

  beads?: number;
  entrance?: EmberHuskEntrance;
  response?: EmberHuskResponse;
  drift?: EmberHuskDrift;
  glow?: EmberHuskGlow;

  quality?: "low" | "medium" | "high";
  style?: CSSProperties;
}
```

## components/originkit/ui/network-lines.tsx

```ts
interface NetworkGroup {
  lineWidth?: number;
  halo?: number;
  pulse?: number;
}

NETWORK_DEFAULTS: Required<NetworkGroup> = { lineWidth: 100, halo: 240, pulse: 100 };

interface ConstellationFieldProps {
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  background?: string;
  baseColor?: string;
  accentColor?: string;
  density?: number;
  dotSize?: number;
  speed?: number;
  hover?: number;
  linkDistance?: number;
  network?: NetworkGroup;
}
```

## components/originkit/ui/ocean-swell.tsx

```ts
DEFAULTS = {
  deep: "#04222E",
  shallow: "#1E7F86",
  scatter: "#CCCFCE",
  foam: "#F2FAFF",
  zenith: "#2C5C8E",
  horizon: "#FAF5B4",
  swell: 1,
  choppy: 20,
  detail: 20,
  glitter: 20,
  subsurface: 20,
  foamAmount: 20,
  cloud: 20,
  haze: 0,
  speed: 5,
  drag: 20,
  sizePercent: 200,
};

export interface OceanSwellProps {
  deep?: string;
  shallow?: string;
  scatter?: string;
  foam?: string;
  zenith?: string;
  horizon?: string;
  swell?: number;
  choppy?: number;
  detail?: number;
  glitter?: number;
  subsurface?: number;
  foamAmount?: number;
  cloud?: number;
  haze?: number;
  speed?: number;
  drag?: number;
  sizePercent?: number;
  style?: React.CSSProperties;
}
```

## components/originkit/ui/paperline-archive.tsx

```ts
ADVANCED_DEFAULTS = {
  margin: 2,
  mastheadColor: "#111111",
  headColor: "#151515",
  bodyColor: "#2A2A2A",
  ruleColor: "#222222",
  borderColor: "#C8C8C8",
  titleSize: 64,
  bodySize: 7,
  leading: 9,
  columnWidth: 85,
  columnVary: 30,
  weight: 18,
  bristles: 24,
  tilt: 4,
  jitter: 8,
  tracking: 6,
  lineGap: 12,
  lineShift: 5,
  textX: 50,
  textY: 50,
  brushRate: 140,
  strokeMin: 120,
  strokeMax: 600,
  strokeGap: 30,
  letterGap: 80,
  linePause: 250,
  fadeMs: 600,
  fadeStagger: 50,
  blankMs: 400,
  paperShift: 6,
  inkShift: 12,
  seed: 7,
  grain: 6,
  vignette: 0,
  hover: 50,
};

export interface StillPosterCreamProps {
  background?: string;
  ink?: string;
  paper?: string;
  text?: string;
  title?: string;
  size?: number;
  pageScale?: number;
  pageAlign?: "top" | "bottom" | "left" | "right" | "center";
  speed?: number;
  hold?: number;
  dryness?: number;
  image?: Record<string, unknown>;
  tint?: boolean;
  advanced?: {
    margin?: number;
    mastheadColor?: string;
    headColor?: string;
    bodyColor?: string;
    ruleColor?: string;
    borderColor?: string;
    titleSize?: number;
    bodySize?: number;
    leading?: number;
    columnWidth?: number;
    columnVary?: number;
    weight?: number;
    bristles?: number;
    tilt?: number;
    jitter?: number;
    tracking?: number;
    lineGap?: number;
    lineShift?: number;
    textX?: number;
    textY?: number;
    brushRate?: number;
    strokeMin?: number;
    strokeMax?: number;
    strokeGap?: number;
    letterGap?: number;
    linePause?: number;
    fadeMs?: number;
    fadeStagger?: number;
    blankMs?: number;
    paperShift?: number;
    inkShift?: number;
    seed?: number;
    grain?: number;
    vignette?: number;
    hover?: number;
  };
  style?: CSSProperties;
}
```

## components/originkit/ui/pricing-04/cosmic-bg.tsx

```ts
DEFAULTS = {
  core: true,
  coreColor: "#6823C3",
  midColor: "#007BFF",
  accentColor: "#9900FF",
  outerColor: "#F9F9F9",
  detail: 20,
  brightness: 32,
  speed: 30,
  rotation: 15,
};
```

## components/originkit/ui/pricing-04/moving-gradient-button.tsx

```ts
DEFAULT_TRANSITION = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.25,
};
```

## components/originkit/ui/pricing-04/neon-border.tsx

```ts
DEFAULTS = {
  color: "#CC9149",
  rounded: 24,
  thickness: 6,
  borderSize: 50,
  glow: 100,
  movement: "continuous",
  speed: 16,
};
```

## components/originkit/ui/rain-puddle.tsx

```ts
interface PuddlesGroup {
  coverage?: number;
  scale?: number;
  reflection?: number;
}

interface DropsGroup {
  ripples?: number;
  streaks?: number;
}

interface CursorGroup {
  reach?: number;
  ripple?: number;
  glow?: number;
}

interface Props {
  background: string;
  baseColor: string;
  accentColor: string;
  rain: number;
  speed: number;
  tilt: number;
  puddles: PuddlesGroup;
  drops: DropsGroup;
  cursor: CursorGroup;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

PUDDLES_DEFAULTS: Required<PuddlesGroup> = { coverage: 62, scale: 170, reflection: 150 };

DROPS_DEFAULTS: Required<DropsGroup> = { ripples: 100, streaks: 70 };

CURSOR_DEFAULTS: Required<CursorGroup> = { reach: 54, ripple: 100, glow: 60 };
```

## components/originkit/ui/shadow-cast.tsx

```ts
interface ShadowCastProps {
  background?: string;
  baseColor?: string;
  accentColor?: string;
  density?: number;
  size?: number;
  jitter?: number;
  softness?: number;
  falloff?: number;
  hover?: number;
  speed?: number;
  grain?: number;
  style?: CSSProperties;
}
```
