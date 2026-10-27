# OriginKit inventory — rendered source studies

All 16 installed items were read and rendered in original and editorial variants. `/playground` mounts only visible panels; each variant has its own document so CSS and IDs cannot collide. The exact draw contexts and runtime observations are in [playground-results.json](playground-results.json).

Palette: ink `#0A0A0A`, graphite `#141414`, paper `#F4F2EC`, warm grey `#8C8A84`, restrained signal amber `#FFB45A`. No shaders, geometry or visual algorithms were recreated. Type-only fixes and the requested opt-in stone-intro controls are recorded in [fixes.md](fixes.md).

Costs below are source-informed relative estimates, not measured frame-rate guarantees. Playground captures are desktop; mobile behavior combines the source breakpoints/controls with the production fallback policy.

## hero-40

A pointer-revealed dither image behind an editorial hero.

**Signature / layout to reuse:** A clear masthead, asymmetric image layer, oversized two-line headline and compact bottom readout. Reuse the spacing and actual companion dither shader, rather than its purple agency identity.

**Interaction / rendering:** Pointer proximity reveals the source image; optional traveling wave. Native anchors are static demo links.

**Performance:** Medium. Source CSS removes desktop navigation and keeps the image behind the headline. Production uses the source image as its mobile static fallback.

**Yazhnova use:** Hero texture and a human craft cue. It is an image shader, not a 3D hand model.

**Screenshot:** [Default + editorial palette](shots/hero-40.png).

**Public props and defaults:** The section export accepts no configurable props; copy/layout are hardcoded. The companion APIs below are the reusable controls. Production composes those genuine companions with its own content and layout.

`components/originkit/ui/hero-40/dither-reveal.tsx`

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

**Editorial overrides:** Section wrapper uses monochrome filtering and palette CSS variables; the original raw section and all of its geometry stay intact.

## hero-51

Two ray-traced eyes embedded in an oversized headline.

**Signature / layout to reuse:** Enormous tight display type, restrained top navigation, a split below-headline content row and a compact diagnostic readout.

**Interaction / rendering:** The two shader eyes follow the page pointer, wander and dilate. The companion includes visibility and reduced-motion handling.

**Performance:** High. The headline and readout stack; both eye canvases remain. Production borrows the typographic hierarchy instead of adding cartoon eyes to the engineering brand.

**Yazhnova use:** Hero composition and typographic scale; the exact eye model remains available in the playground.

**Screenshot:** [Default + editorial palette](shots/hero-51.png).

**Public props and defaults:** The section export accepts no configurable props; copy/layout are hardcoded. The companion APIs below are the reusable controls. Production composes those genuine companions with its own content and layout.

`components/originkit/ui/hero-51/grin-iris.tsx`

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

**Editorial overrides:** Section wrapper uses monochrome filtering and palette CSS variables; the original raw section and all of its geometry stay intact.

## hero-69

A real Three.js fractured object with an animated inner core.

**Signature / layout to reuse:** An editorial serif headline over visible rules, generous empty space and an isolated 3D object. Lower corners hold narrative and actions.

**Interaction / rendering:** Real Three.js geometry scatters and settles, drifts, and responds to the pointer. Includes disposal, visibility and a reduced-motion state.

**Performance:** High. The original rearranges copy above and below the object. Production uses low/medium quality on desktop and a captured static frame on touch devices.

**Yazhnova use:** Final CTA and the first-visit desktop intro. The same actual fragments open and reassemble under optional choreography controls; original physics remains the default.

**Screenshot:** [Default + editorial palette](shots/hero-69.png).

**Public props and defaults:** The section export accepts no configurable props; copy/layout are hardcoded. The companion APIs below are the reusable controls. Production composes those genuine companions with its own content and layout.

`components/originkit/ui/hero-69/ember-husk.tsx`

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

export interface EmberHuskChoreography {
  fracture: number;
  scale: number;
  rotation: number;
  paused: boolean;
}

export interface EmberHuskProps {
  choreography?: { readonly current: EmberHuskChoreography };
  onReady?: () => void;
  onError?: (error: unknown) => void;
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

interface Face {
  n: THREE.Vector3;
  pts: THREE.Vector3[];
}

interface Slab {
  geometry: THREE.BufferGeometry;

  home: THREE.Vector3;

  dir: THREE.Vector3;
}

interface Params {
  background: Required<EmberHuskBackground>;
  size: number;
  structure: Required<EmberHuskStructure>;
  rock: Required<EmberHuskRock>;
  core: Required<EmberHuskCore>;
  crosses: Required<EmberHuskCrosses>;
  debris: Required<EmberHuskDebris>;
  beads: number;
  entrance: Required<EmberHuskEntrance>;
  response: Required<EmberHuskResponse>;
  drift: Required<EmberHuskDrift>;
  glow: Required<EmberHuskGlow>;
  quality: "low" | "medium" | "high";
}

interface Piece {
  home: THREE.Vector3;
  dir: THREE.Vector3;
  axis: THREE.Vector3;
  tilt: number;
  delay: number;
  push: number;
  pushVel: number;
  ang: number;
  angVel: number;

  base: THREE.Quaternion;

  spin: THREE.Vector3;

  free: boolean;
  scale: number;

  radius: number;

  lateral: THREE.Vector3;
}
```

**Editorial overrides:** Section wrapper uses monochrome filtering and palette CSS variables; the original raw section and all of its geometry stay intact.

## hero-28

A black-hole visual, precision rails, ticks and a structured readout.

**Signature / layout to reuse:** Actual exported GridRails/GridFrame components, end ticks, alignment rules, inset navigation, serif headline, numbers and a logo row.

**Interaction / rendering:** Its black-hole companion uses two genuine Canvas 2D layers for orbiting particles. It is not a Three.js mesh. Framer/Motion reveals respond to reduced motion.

**Performance:** High. Authored 360/390/768/1280 breakpoints reduce the grid and stack content. Borrowed rails stay decorative and never overlay controls.

**Yazhnova use:** Shared engineering grid and process structure; no need to run the large particle disc on the production hero.

**Screenshot:** [Default + editorial palette](shots/hero-28.png).

**Public props and defaults:** The section export accepts no configurable props; copy/layout are hardcoded. The companion APIs below are the reusable controls. Production composes those genuine companions with its own content and layout.

`components/originkit/ui/hero-28/grid-frame.tsx`

```ts
type TickProps = {
  variant: TickVariant;

  flip?: boolean;
  anchor?: "bottom";
  className: string;
};
```

`components/originkit/ui/hero-28/black-hole.tsx`

```ts
type Centre = {
  voidRadius?: number;
  voidX?: number;
  voidY?: number;
};

type Props = {
  showCenter?: boolean;
  centre?: Centre;

  particleCount?: number;
  particleSize?: number;
  colors?: string[];
  outerRadius?: number;
  tilt?: number;
  tiltSideway?: number;
  trail?: number;

  orbitSpeed?: number;
  pullSpeed?: number;
  style?: CSSProperties;
};

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

**Editorial overrides:** Section wrapper uses monochrome filtering and palette CSS variables; the original raw section and all of its geometry stay intact.

## features-02

A draggable dotted globe above a three-column number strip.

**Signature / layout to reuse:** A centered globe, introduction and a three-column number strip separated by thin vertical rules. This is a presence/stats section, not a stock service bento.

**Interaction / rendering:** The Three.js globe rotates and supports drag, optional hover pause, markers, outlines and graticules. It fetches Natural Earth land geometry.

**Performance:** Medium. The original makes the metric strip vertical. Production borrows its three-column structure for service rows and uses no invented performance statistics.

**Yazhnova use:** Services hierarchy and global-engineering context. The original globe stays a verified playground study.

**Screenshot:** [Default + editorial palette](shots/features-02.png).

**Public props and defaults:** The section export accepts no configurable props; copy/layout are hardcoded. The companion APIs below are the reusable controls. Production composes those genuine companions with its own content and layout.

`components/originkit/ui/features-02/globe.tsx`

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

interface Marker {
  lat: number;
  lng: number;
}

interface MarkerConfig {
  markers: Marker[];
  color: string;
  size: number;
}

interface DotsConfig {
  color: string;
  size: number;
  density: number;
  allDots: boolean;
}

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

**Editorial overrides:** Section wrapper uses monochrome filtering and palette CSS variables; the original raw section and all of its geometry stay intact.

## pricing-04

A tiered three-column comparison with companion motion elements.

**Signature / layout to reuse:** Three comparison columns; the middle tier has emphasis. Features, a short fit statement and a clear CTA have a useful reading order.

**Interaction / rendering:** Billing buttons update rolling amounts using GSAP. Companion effects include cosmic WebGL, an animated border and moving button. Production omits prices, billing controls and neon decoration.

**Performance:** Medium. Columns stack. Production carries over the comparison rhythm with square corners and hairlines.

**Yazhnova use:** Fixed-scope, Dedicated Team and Retainer. The original RollingLetters companion supplies a restrained, one-time label transition.

**Screenshot:** [Default + editorial palette](shots/pricing-04.png).

**Public props and defaults:** The section export accepts no configurable props; copy/layout are hardcoded. The companion APIs below are the reusable controls. Production composes those genuine companions with its own content and layout.

`components/originkit/ui/pricing-04/rolling-letters.tsx`

```ts
function SlotMachine({
  text = "Rolling Letters",
  font = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "120px",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    lineHeight: "1.1em",
    textAlign: "left",
  },
  color = "#ffffff",
  startFrom = "top",
  staggerFrom = "start",
  tag = "h1",
  transition = {
    type: "tween",
    duration: 0.6,
    delay: 0,
    ease: "easeOut",
    staggerChildren: 0.08,
  },
});
```

`components/originkit/ui/pricing-04/cosmic-bg.tsx`

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

function CosmicBG(props);
```

`components/originkit/ui/pricing-04/neon-border.tsx`

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

function NeonBorder(props);

const {
  color = DEFAULTS.color,
  rounded = DEFAULTS.rounded,
  thickness = DEFAULTS.thickness,
  borderSize = DEFAULTS.borderSize,
  glow = DEFAULTS.glow,
  movement = DEFAULTS.movement,
  speed = DEFAULTS.speed,
  style,
} = props;
```

`components/originkit/ui/pricing-04/moving-gradient-button.tsx`

```ts
DEFAULT_TRANSITION = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.25,
};

function MovingGradientButton(props);

const {
  label = "MOVING GRADIENT",
  font = {
    fontFamily: "Inter",
    variant: "Regular",
    fontWeight: 500,
    fontSize: 40,
    lineHeight: "1.5em",
    letterSpacing: "0em",
    textAlign: "left",
  },
  showText = true,
  padding = "40px 64px 40px 64px",
  rounded = 100,
  fill: fillProp,
  textColor: textColorProp,
  colors = {
    fill: "#000000",
    hoverFill: "#000000",
    textColor: "#FFFFFF",
    hoverTextColor: "#FFFFFF",
  },
  addIcon = false,
  icon = {
    side: "left",
    size: 24,
    type: "symbol",
    color: "#FFFFFF",
    image: "",
    symbol: "\u2192",
    padding: 0,
    rounded: 0,
    hoverColor: "#CCC30E",
  },
  gap = 12,
  border = {
    borderWidth: 6,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
  },
  hover = {},
  stroke = {
    color: "#3600FF",
    count: 2,
    speed: 22,
    trail: 100,
    movement: "step",
    direction: "cw",
    headColor: "#00FF94",
  },
  link = "",
  transition = {
    type: "tween",
    stiffness: 800,
    damping: 60,
    mass: 1,
    ease: "easeInOut",
    duration: 0.25,
  },
  newTab = true,
  style,
} = props;
```

**Editorial overrides:** Section wrapper uses monochrome filtering and palette CSS variables; the original raw section and all of its geometry stay intact.

## footer-03

A large wordmark cut through by moving light shafts.

**Signature / layout to reuse:** A closing invitation, multi-column links, a huge wordmark and a fine copyright baseline.

**Interaction / rendering:** The companion LightShaftText uses real WebGL2 text lighting; the CTA companion has a Canvas 2D starfield. Copy button belongs to the default SDK demo.

**Performance:** High. Link columns wrap and the wordmark resizes. Production uses a calm typographic wordmark over a low-intensity rain surface, with a static fallback on mobile.

**Yazhnova use:** Footer structure and oversized wordmark. LightShaftText is retained as an optional real-source companion, not replaced with a fake shader.

**Screenshot:** [Default + editorial palette](shots/footer-03.png).

**Public props and defaults:** The section export accepts no configurable props; copy/layout are hardcoded. The companion APIs below are the reusable controls. Production composes those genuine companions with its own content and layout.

`components/originkit/ui/footer-03/light-shaft-text.tsx`

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

function LightShaftText(props);

const {
  text = "FLICKER",
  font = {
    fontFamily: "Inter",
    variant: "Regular",
    fontWeight: 800,
    fontSize: "320px",
    lineHeight: "1.5em",
    letterSpacing: "0em",
    textAlign: "left",
  },
  background = "#000000",
  textColor = "#000000",
  lineColor = "#FFFFFF",
  speed = 50,
  offsetY = 0,
  interactive = true,
  pointerIntensity = 6,
  lines = { density: 170, width: 24, softness: 91, depth: 13, overshoot: 35, flicker: 100 },
  style,
} = props;
```

`components/originkit/ui/footer-03/starfield-button.tsx`

```ts
function StarfieldButton(props);

const {
  label = "STARFIELD",
  font = {
    variant: "Regular",
    fontSize: 40,
    textAlign: "left",
    fontFamily: "Inter",
    fontWeight: 500,
    lineHeight: "1.5em",
    letterSpacing: "0em",
  },
  showText = true,
  padding = "40px 64px 40px 64px",
  rounded = 100,
  fill: fillProp = "#0A0A0A",
  textColor: textColorProp = "#FFFFFF",
  colors,
  addIcon = false,

  icon = {
    icon: "arrow",
    side: "left",
    size: 28,
    type: "symbol",
    color: "#FFFFFF",
    image: "",
    symbol: "→",
    padding: 0,
    rounded: 0,
  },
  gap = 16,
  border = {
    borderColor: "rgba(255,255,255,0.14)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  glow = { size: 16, color: "#FC731C", opacity: 100 },
  stroke = {
    size: 96,
    color: "#FC731C",
    count: 1,
    speed: 50,
    movement: "continuous",
    direction: "ccw",
    thickness: 2,
  },
  pixel = { size: 4, color: "#FC731C", density: 50, brightness: 100 },
  link = "",
  transition = { ease: [0.44, 0, 0.56, 1], type: "tween", delay: 0, duration: 0.6 },
  newTab = false,
  style,
} = props;
```

**Editorial overrides:** Section wrapper uses monochrome filtering and palette CSS variables; the original raw section and all of its geometry stay intact.

## dither-reveal

An image shader with a pointer-controlled dither reveal.

**Signature / layout to reuse:** A size-agnostic image container. No headline, navigation or palette prop is built in; it derives color from the input image.

**Interaction / rendering:** Pointer-controlled reveal with Bayer, line or noise dither and an optional wave. Uses a genuine WebGL image shader and texture.

**Performance:** Medium. Original shader can run at up to 3x DPR, so production uses its own captured source frame instead on small/coarse-pointer screens.

**Yazhnova use:** Hero craftsmanship visual and one service illustration. Monochrome input/filter recolors it without rewriting the shader.

**Screenshot:** [Default + editorial palette](shots/dither-reveal.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/dither-reveal.tsx`

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

**Editorial overrides:** Explicit source props:

```json
{
  "image": {
    "src": "/originkit/hero-40/white-hands.png",
    "alt": "Sculptural hands, revealed through the original dither shader"
  },
  "fit": "contain",
  "dotSize": 5,
  "waveSpeed": 20,
  "revealRadius": 150
}
```

## paperline-archive

A generated newspaper overpainted with animated brush lettering.

**Signature / layout to reuse:** A procedurally typeset newspaper with masthead, rules, columns and overpainted brush lettering. The brush glyphs are drawn by the original Canvas 2D implementation.

**Interaction / rendering:** A timed brush-writing, hold and fade sequence; hover response; native reduced-motion paints a finished frame.

**Performance:** Medium. Canvas retypesets to its container. Production keeps a legible fallback and an accessible HTML transcript so its statement is not image-only.

**Yazhnova use:** The manifesto: THE YAZHNOVA DISPATCH / We build what's next. A deliberate warm-paper pause in the darker page.

**Screenshot:** [Default + editorial palette](shots/paperline-archive.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/paperline-archive.tsx`

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
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
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

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#F4F2EC",
  "paper": "#F4F2EC",
  "ink": "#0A0A0A",
  "title": "THE YAZHNOVA DISPATCH",
  "text": "We build\nwhat's next.",
  "image": {},
  "size": 72,
  "speed": 75,
  "hold": 12000,
  "advanced": {
    "titleSize": 32,
    "mastheadColor": "#0A0A0A",
    "headColor": "#0A0A0A",
    "bodyColor": "#8C8A84",
    "ruleColor": "#8C8A84",
    "borderColor": "#8C8A84",
    "grain": 4,
    "tilt": 1
  }
}
```

## dithered-pixel-grid

A dense, interactive pixel artwork with a dithered planet motif.

**Signature / layout to reuse:** An embedded pixel artwork with a planet motif or a generated alternative. Exposes cell, rim, texture and ripple settings.

**Interaction / rendering:** Original Canvas 2D tile drawing with pointer ripples, drift, morph and glint. High cost at large cell counts, despite not being WebGL.

**Performance:** High. Has reduced-motion handling; production uses a small service viewport and a captured frame on touch screens.

**Yazhnova use:** Web development: a clear metaphor for assembling an interface from precise pieces.

**Screenshot:** [Default + editorial palette](shots/dithered-pixel-grid.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/dithered-pixel-grid.tsx`

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
  hover?: number;
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
  pattern: "artwork" as const,
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

interface Ripple {
  x: number;
  y: number;
  t: number;
}
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "color": "#F4F2EC",
  "offColor": "#141414",
  "gridColor": "#8C8A84",
  "speed": 12,
  "hover": 40,
  "advanced": {
    "grain": 2,
    "gridOpacity": 18,
    "halo": 10,
    "cellsAcross": 65
  }
}
```

## beyond-horizon

A thin disc rim and volumetric plume over a dark horizon.

**Signature / layout to reuse:** A large dark disc hides a light source, leaving a thin bright rim and volumetric haze. It is an actual full-screen WebGL shader.

**Interaction / rendering:** Pointer presence changes the light; position contributes subtle parallax. A 26-step volumetric march makes large renders expensive.

**Performance:** High. Scale it to a narrow band; production falls back to a genuine captured frame on mobile/reduced motion.

**Yazhnova use:** A thin bottom horizon on the hero: paper light, graphite haze, no violet or blue halo.

**Screenshot:** [Default + editorial palette](shots/beyond-horizon.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/beyond-horizon.tsx`

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

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "coreColor": "#F4F2EC",
  "midColor": "#8C8A84",
  "deepColor": "#141414",
  "brightness": 1.25,
  "haze": 1.2,
  "speed": 0.3,
  "parallax": 1,
  "horizonY": 0.68
}
```

## glassbound

A half-glass sphere rolling across an elevated tile field.

**Signature / layout to reuse:** A rolling half-glass sphere above a field of extruded tiles, studs and gaps. The ground responds as the object travels.

**Interaction / rendering:** Real WebGL2 raymarching, refraction, specular light and pointer deformation. Advanced quality controls render resolution; native reduced motion stops travel.

**Performance:** High. High GPU cost. Production lowers resolution through the real quality prop and uses its captured monochrome/amber frame on mobile.

**Yazhnova use:** The main agentic-AI demonstration: intelligence traversing a structured system. Accent belongs to the sphere, not to surrounding UI chips.

**Screenshot:** [Default + editorial palette](shots/glassbound.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/glassbound.tsx`

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

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "accent": "#FFB45A",
  "speed": 18,
  "size": 160,
  "advanced": {
    "peachColor": "#F4F2EC",
    "innerColor": "#141414",
    "studColor": "#8C8A84",
    "grain": 0,
    "quality": 60,
    "hover": 30
  }
}
```

## network-lines

Drifting nodes form fine lines and respond to the pointer.

**Signature / layout to reuse:** A size-independent field of fine lines, grouped nodes and points. No cards or text are built into it.

**Interaction / rendering:** WebGL nodes drift, form proximity connections and react to the pointer. Density and link distance control visual and computational load.

**Performance:** Medium. Reduce node density and use a captured frame on mobile; no essential information depends on the moving lines.

**Yazhnova use:** SaaS service visual and the connective tissue behind Discover → Design → Build → Ship & Scale.

**Screenshot:** [Default + editorial palette](shots/network-lines.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/network-lines.tsx`

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

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "baseColor": "#8C8A84",
  "accentColor": "#F4F2EC",
  "density": 65,
  "speed": 12,
  "hover": 35,
  "network": {
    "lineWidth": 70,
    "halo": 110,
    "pulse": 20
  }
}
```

## ocean-swell

A Three.js ocean shader with choppy waves and reflected light.

**Signature / layout to reuse:** A Three.js full-screen ocean shader with a horizon, reflected light, wave detail, foam and sky.

**Interaction / rendering:** Pointer drag changes the view. Fixed 68-step tracing and multiple wave layers keep the cost high even at low motion speed.

**Performance:** High. The original caps DPR at 1.25. Production uses a captured frame on mobile; a slow desktop preset can serve /contact without obscuring form fields.

**Yazhnova use:** Contact-page atmosphere. The larger seascape suits a single focused page better than the denser footer.

**Screenshot:** [Default + editorial palette](shots/ocean-swell.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/ocean-swell.tsx`

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

**Editorial overrides:** Explicit source props:

```json
{
  "deep": "#0A0A0A",
  "shallow": "#141414",
  "scatter": "#8C8A84",
  "foam": "#F4F2EC",
  "zenith": "#0A0A0A",
  "horizon": "#F4F2EC",
  "speed": 1,
  "detail": 12,
  "glitter": 6,
  "foamAmount": 8,
  "sizePercent": 100
}
```

## rain-puddle

A rain-soaked plane with reflected light and pointer ripples.

**Signature / layout to reuse:** A close, rain-soaked surface with ripples, reflective puddles and faint streaks; less spatially dominant than the ocean.

**Interaction / rendering:** A real WebGL shader produces moving rain and pointer ripples/light. Puddle, drop and cursor groups offer fine control.

**Performance:** High. Reduce rain, glow and reflections; production shows a source-captured static frame on small/coarse-pointer screens.

**Yazhnova use:** Footer atmosphere: monochrome, slow and low contrast. Selected over the ocean because it stays quiet underneath a large wordmark.

**Screenshot:** [Default + editorial palette](shots/rain-puddle.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/rain-puddle.tsx`

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

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "baseColor": "#8C8A84",
  "accentColor": "#F4F2EC",
  "rain": 30,
  "speed": 25,
  "puddles": {
    "coverage": 52,
    "scale": 150,
    "reflection": 55
  },
  "drops": {
    "ripples": 30,
    "streaks": 15
  },
  "cursor": {
    "reach": 35,
    "ripple": 35,
    "glow": 10
  }
}
```

## shadow-cast

A field of pillars casts shadows toward a pointer-driven light.

**Signature / layout to reuse:** Raymarched vertical pillars with a movable light and long shadows. No project cards are included.

**Interaction / rendering:** Pointer presence and coordinates control the light; optional slow drift, grain, jitter and softness.

**Performance:** High. High cost over a large backdrop. Desktop uses a low-density viewport; mobile uses a frame captured from the actual component.

**Yazhnova use:** Case-study backdrop. Its existing #FFB45A provides the single restrained signal-amber accent for the brand.

**Screenshot:** [Default + editorial palette](shots/shadow-cast.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/shadow-cast.tsx`

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

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "baseColor": "#141414",
  "accentColor": "#FFB45A",
  "density": 14,
  "size": 12,
  "jitter": 40,
  "softness": 130,
  "falloff": 32,
  "hover": 75,
  "speed": 12,
  "grain": 1
}
```
