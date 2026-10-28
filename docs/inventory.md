> This inventories original downloaded APIs/defaults. The cohesion pass adds the opt-in controls documented in [fixes](fixes.md); current production placements and captures are in [the report](cohesion/README.md).

# OriginKit inventory - rendered source studies

The initial 34 installed items were read and rendered in original and editorial variants. Hero-44 is the 35th installed item, hero-55 is the 36th and ridge-parallax is the 37th; its current production composition and responsive review are documented in [the chapter hero report](chapters/README.md). `/playground` mounts only visible panels; each variant has its own document so CSS and IDs cannot collide. The exact draw contexts and runtime observations are in [playground-results.json](playground-results.json).

Palette: ink `#0A0A0A`, graphite `#141414`, paper `#F4F2EC`, warm grey `#8C8A84`, restrained signal amber `#FFB45A`. No shaders, geometry or visual algorithms were recreated. Type-only fixes and the requested opt-in stone-intro controls are recorded in [fixes.md](fixes.md).

Costs below are source-informed relative estimates, not measured frame-rate guarantees. Playground captures are desktop; mobile behavior combines the source breakpoints/controls with the production fallback policy.

## live-chat

Native DOM chat bubbles enter with spring motion and a typing indicator.

**Signature / layout to reuse:** A vertical list of native sent/received bubbles, optional timestamps and a typing row. Font and both bubble/text palettes are exposed.

**Interaction / rendering:** The installed Framer Motion source animates message entrances and typing dots. Messages, sender, stagger, transition and animation flags are configurable; it does not perform agent or messaging actions.

**Performance:** Low. Low DOM animation cost for short transcripts. Production must retain readable static messages and suppress decorative motion when requested.

**Yazhnova use:** Reserved agent-demo transcript. The study uses an illustrative human-reviewed qualification exchange without claiming a real backend integration.

**Screenshot:** [Default + editorial palette](shots/live-chat.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/live-chat.tsx`

```ts
type Message = {
  text: string;
  sender: "me" | "them";
  timestamp?: string;
};

type Props = {
  messages?: Message[];
  font?: React.CSSProperties;
  sentBubbleColor?: string;
  sentTextColor?: string;
  receivedBubbleColor?: string;
  receivedTextColor?: string;
  showTimestamps?: boolean;
  showTyping?: boolean;
  typingSender?: "me" | "them";
  animate?: boolean;
  staggerDelay?: number;
  transition?: Transition;
  style?: React.CSSProperties;
};

DEFAULT_MESSAGES: Message[] = [
  {
    text: "Hey! Are you coming to the Framer workshop?",
    sender: "them",
    timestamp: "10:14 AM",
  },
  {
    text: "Yeah, definitely! Just finishing up some code.",
    sender: "me",
    timestamp: "10:15 AM",
  },
  {
    text: "Awesome, see you there! \ud83d\ude80",
    sender: "them",
    timestamp: "10:16 AM",
  },
]

DEFAULT_FONT: React.CSSProperties = {
  fontFamily: "Inter",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "1.35em",
  letterSpacing: "0em",
  textAlign: "left",
}

DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 28,
  mass: 1,
}

function IOSMessageList({
  messages = DEFAULT_MESSAGES,
  font = DEFAULT_FONT,
  sentBubbleColor = "#007AFF",
  sentTextColor = "#FFFFFF",
  receivedBubbleColor = "#E9E9EB",
  receivedTextColor = "#000000",
  showTimestamps = true,
  showTyping = true,
  typingSender = "them",
  animate: doAnimate = true,
  staggerDelay = 150,
  transition = DEFAULT_TRANSITION,
  style,
}: Props)
```

**Editorial overrides:** Explicit source props:

```json
{
  "messages": [
    {
      "text": "A new lead is asking about a SaaS product.",
      "sender": "them"
    },
    {
      "text": "I checked the brief and prepared a qualification summary for review.",
      "sender": "me"
    },
    {
      "text": "Approved. Prepare the meeting invitation.",
      "sender": "them"
    }
  ],
  "font": {
    "fontFamily": "Inter Tight",
    "fontSize": 16,
    "lineHeight": "1.5em"
  },
  "sentBubbleColor": "#F4F2EC",
  "sentTextColor": "#0A0A0A",
  "receivedBubbleColor": "#141414",
  "receivedTextColor": "#F4F2EC",
  "showTimestamps": false,
  "showTyping": false
}
```

## aura-cursor

A real WebGL fluid simulation follows the pointer with configurable dye colors.

**Signature / layout to reuse:** A pointer-driven fluid surface with an optional central label. The actual source manages GPU simulation buffers rather than a CSS glow substitute.

**Interaction / rendering:** WebGL fluid passes advect and shade pointer splats. Palette, dye dissipation, curl, splat radius/force and label styling are configurable. The native source pauses on visibility changes.

**Performance:** High. High multipass GPU cost with a 1440-pixel dye target and 20 pressure iterations. Keep desktop-only and respect reduced motion when integrating; the current homepage slot stays untouched.

**Yazhnova use:** Reserved desktop cursor enhancement. Shader presets are recolored to paper and warm gray for review.

**Screenshot:** [Default + editorial palette](shots/aura-cursor.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/aura-cursor.tsx`

```ts
type LabelFont = {
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: React.CSSProperties["textAlign"];
};

type Props = {
  label?: boolean;
  labelText?: string;
  labelColor?: string;
  labelFont?: LabelFont;
  paletteColors?: string[];
  backdrop?: "dark" | "light";
  densityDissipation?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  style?: React.CSSProperties;
};

DEFAULT_LABEL_FONT: LabelFont = {
  fontFamily: "Inter",
  fontWeight: 700,
  fontSize: "48px",
  lineHeight: "1.5em",
  letterSpacing: "0em",
  textAlign: "left",
};

DEFAULTS = {
  backdrop: "dark" as const,
  label: true,
  labelText: "HOVER ME",
  labelColor: "#FFFFFF",

  densityDissipation: 7,
  curl: 3,

  splatRadius: 4,

  splatForce: 6,
};

DEFAULT_PALETTE = ["#A855F7", "#EC4899", "#3B82F6"];

function AuraCursor(props: Props);

const {
  backdrop = DEFAULTS.backdrop,
  densityDissipation = DEFAULTS.densityDissipation,
  curl = DEFAULTS.curl,
  splatRadius = DEFAULTS.splatRadius,
  splatForce = DEFAULTS.splatForce,
  label = DEFAULTS.label,
  labelText = DEFAULTS.labelText,
  labelColor = DEFAULTS.labelColor,
  style,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "labelText": "MOVE TO EXPLORE",
  "labelColor": "#F4F2EC",
  "labelFont": {
    "fontFamily": "Geist Mono",
    "fontSize": "28px",
    "fontWeight": 400
  },
  "paletteColors": ["#F4F2EC", "#8C8A84", "#141414"],
  "densityDissipation": 7,
  "curl": 2,
  "splatRadius": 3,
  "splatForce": 4
}
```

## hairline-loader

A native DOM ruler and percentage counter part to reveal the underlying page.

**Signature / layout to reuse:** A fine ruler, animated percentage and split top/bottom covers. The original source supplies the complete DOM loading/reveal mechanism.

**Interaction / rendering:** A requestAnimationFrame timeline combines minimum display time with image/font readiness, grows the rule and parts the covers. Colors, font, minimum time and completion callback are exposed.

**Performance:** Low. Low DOM cost and native reduced-motion handling. Coordinate this source with the existing approved stone intro before integration to avoid stacking loading experiences.

**Yazhnova use:** Reserved first-load detail; downloaded for study without replacing the approved stone introduction.

**Screenshot:** [Default + editorial palette](shots/hairline-loader.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/hairline-loader.tsx`

```ts
interface EdFrame {
  t: number;
  dt: number;

  progress: number;

  reveal: number;
  phase: EdPhase;

  w: number;
  h: number;
}

interface EdScene {
  revealS: number;
  reset?(): void;
  frame(f: EdFrame): void;
}

interface EdOptions {
  minTime: number;
  onComplete?: () => void;
}

interface FramerFont {
  fontFamily?: string;
  fontWeight?: number | string;
  fontStyle?: string;
  fontSize?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
}

interface Props {
  minTime?: number;
  font?: FramerFont;
  background?: string;
  textColor?: string;
  onComplete?: () => void;
  style?: CSSProperties;
}

function Hairline(props: Props);

const { minTime = 4, font, background = "#000000", textColor = "#FFFFFF", style } = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "textColor": "#F4F2EC",
  "minTime": 4,
  "font": {
    "fontFamily": "Geist Mono",
    "fontWeight": 400
  }
}
```

## curvedmarquee

Draggable SVG text moves along a genuine curved path.

**Signature / layout to reuse:** An SVG textPath carrying repeated text along a quadratic curve. The curve, font, gap and fade are independently configurable.

**Interaction / rendering:** The installed source advances SVG text spans each frame and supports pointer drag with inertial velocity. It is actual SVG text, not a replacement canvas.

**Performance:** Low. Low draw cost for short labels. Suppress the decorative loop for reduced motion and keep a readable static technology list when integrating.

**Yazhnova use:** Reserved technology marquee. The source is downloaded for review before its production slot is composed.

**Screenshot:** [Default + editorial palette](shots/curvedmarquee.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/curvedmarquee.tsx`

```ts
interface FontValue {
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: string | number;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  textAlign?: string;
}

interface CurvedLoopProps {
  text?: string;
  font?: FontValue;
  color?: string;
  direction?: "left" | "right";
  baseVelocity?: number;
  curveAmount?: number;
  gap?: number;
  draggable?: boolean;
  dragIntensity?: number;
  fade?: boolean;
  fadePercent?: number;
  style?: CSSProperties;
}

function CurvedLoop({
  text = "Originkit",
  font = {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 64,
    lineHeight: "1.5em",
    letterSpacing: "1px",
    textAlign: "left",
  },
  color = "#FFFFFF",
  direction = "right",
  baseVelocity = 35,
  curveAmount = -400,
  gap = 12,
  draggable = true,
  dragIntensity = 10,
  fade = true,
  fadePercent = 12,
  style,
}: CurvedLoopProps);
```

**Editorial overrides:** Explicit source props:

```json
{
  "text": "React / Next.js / Node / Python / Postgres",
  "color": "#F4F2EC",
  "font": {
    "fontFamily": "Geist Mono",
    "fontSize": 48,
    "fontWeight": 400,
    "letterSpacing": "-0.02em",
    "lineHeight": "1.3em"
  },
  "baseVelocity": 8,
  "curveAmount": -120,
  "gap": 8,
  "fadePercent": 10
}
```

## stacked-carousel

A real WebGL stack of textured cards with scrolling and hover flattening.

**Signature / layout to reuse:** A perspective deck of image-textured cards rendered with the source's own WebGL matrices and geometry. Default card images are generated by the source itself.

**Interaction / rendering:** Auto-scroll, wheel input and hover flattening move the actual card deck. Image URLs, size, gap, speed, direction and camera tilt/angle are exposed.

**Performance:** Medium. The source keeps at least 20 cards. Limit image dimensions and use a captured frame for mobile/reduced motion when composed into the site.

**Yazhnova use:** Reserved case-study presentation. The editorial study uses genuine existing source frames rather than fictional client projects.

**Screenshot:** [Default + editorial palette](shots/stacked-carousel.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/stacked-carousel.tsx`

```ts
interface CameraGroup {
    tilt?: number

    angle?: number
}

interface Props {
    images?: string[]
    cardWidth?: number
    cardHeight?: number

    gap?: number

    speed?: number

    direction?: "forward" | "backward"
    camera?: CameraGroup
    style?: React.CSSProperties
}

DEFAULT_CARD_W = 420

DEFAULT_CARD_H = 300

DEFAULT_ITEMS: string[] = Array.from({ length: 8 }, (_, i) =>
    dummyImage(i, 840, 600)
)

DEFAULT_CAMERA: Required<CameraGroup> = {
    tilt: 50,
    angle: 0,
}

interface Resolved {
    items: string[]

    mediaKey: string
    visibleCount: number
    imageWidth: number
    imageHeight: number
    zSpacing: number
    perspective: number
    cameraDistance: number
    viewAngleX: number
    viewAngleY: number

    autoScrollSpeed: number
}

function StackedCarousel3D(props: Props)

const {
        images: _images,
        cardWidth: _cardWidth,
        cardHeight: _cardHeight,
        gap: _gap,
        speed: _speed,
        direction: _direction,
        camera: _camera,
        style,
        ...rest
    } = props
```

**Editorial overrides:** Explicit source props:

```json
{
  "images": ["/frames/ember.png", "/frames/glassbound.png", "/frames/shadow.png"],
  "cardWidth": 360,
  "cardHeight": 260,
  "gap": 120,
  "speed": 15,
  "camera": {
    "tilt": 35,
    "angle": 0
  }
}
```

## image-spotlight

A pointer-following spotlight reveals an image through a moving veil.

**Signature / layout to reuse:** An image plus a CSS mask veil with a circular resting or pointer-following reveal. No project-card layout is included.

**Interaction / rendering:** Real DOM pointer events move the spotlight, with spring/tween timing, image fit, focus, veil color, radius and visibility controls.

**Performance:** Low. No canvas. Keep the image readable without hover on touch devices and suppress pointer motion for reduced motion in production. The default sample asset is copied locally for the study.

**Yazhnova use:** Reserved case-study image treatment. Source available for later composition while the approved website stays intact.

**Screenshot:** [Default + editorial palette](shots/image-spotlight.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/image-spotlight.tsx`

```ts
DEFAULT_IMAGE =
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/17fccb3f-a5f6-441c-d10e-a6e3c8fa7800/w=800";

type Mode = "onImage" | "followCursor";

DEFAULTS = {
  mode: "followCursor" as Mode,
  restX: 50,
  restY: 50,
  fit: "cover" as Fit,
  focusY: 37,
  veilColor: "#000000",
  size: 400,
  visibility: 20,
  rounded: 37,
  transition: {
    type: "tween",
    stiffness: 800,
    damping: 60,
    mass: 1,
    duration: 0.4,
    ease: "easeInOut",
  } as any,
};

interface ResponsiveImage {
  src: string;
  srcSet?: string;
  alt?: string;
}

interface SpotlightRevealProps {
  image?: ResponsiveImage | string;
  mode?: Mode;
  restX?: number;
  restY?: number;
  fit?: Fit;
  focusY?: number;
  veilColor?: string;
  size?: number;
  visibility?: number;
  rounded?: number;
  transition?: any;
  style?: CSSProperties;
}

function SpotlightReveal(props: SpotlightRevealProps);

const {
  image = {
    src: DEFAULT_IMAGE,
  },
  mode = DEFAULTS.mode,
  restX = DEFAULTS.restX,
  restY = DEFAULTS.restY,
  fit = DEFAULTS.fit,
  focusY = DEFAULTS.focusY,
  veilColor = DEFAULTS.veilColor,
  size = DEFAULTS.size,
  visibility = DEFAULTS.visibility,
  rounded = DEFAULTS.rounded,
  transition = DEFAULTS.transition,
  style,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "image": {
    "src": "/originkit/hero-40/white-hands.png",
    "alt": "Hands reaching toward each other"
  },
  "veilColor": "#0A0A0A",
  "rounded": 0,
  "visibility": 30,
  "size": 280,
  "mode": "onImage"
}
```

## light-cables

A WebGL bundle of curved light cables with moving pulses.

**Signature / layout to reuse:** A configurable cable bundle with directional flow and moving light pulses, without a built-in content layout.

**Interaction / rendering:** The installed WebGL shader bends the cables and responds to hover/grab. Bundle and flow groups expose count, bend, spread, thickness, widths and pulses.

**Performance:** Medium. Reduce cable count and pointer response; use a genuine frame for a production mobile/reduced-motion fallback. The playground unmounts inactive sources.

**Yazhnova use:** Reserved process connectors. The current marketing composition stays intact until its slot is integrated.

**Screenshot:** [Default + editorial palette](shots/light-cables.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/light-cables.tsx`

```ts
type BundleGroup = {
  count?: number;
  bend?: number;
  spread?: number;
  thickness?: number;
  widthStart?: number;
  widthEnd?: number;
};

BUNDLE_DEFAULTS: Required<BundleGroup> = {
  count: 34,
  bend: 46,
  spread: 100,
  thickness: 100,
  widthStart: 100,
  widthEnd: 100,
};

type FlowGroup = { flow?: number; pulses?: number };

FLOW_DEFAULTS: Required<FlowGroup> = { flow: 100, pulses: 3 };

type Props = {
  style?: React.CSSProperties;
  background?: string;
  baseColor?: string;
  accentColor?: string;
  highlight?: string;
  speed?: number;
  hover?: number;
  grab?: number;
  direction?: "ltr" | "rtl" | "ttb" | "btt";
  positionX?: number;
  positionY?: number;
  bundle?: BundleGroup;
  flow?: FlowGroup;
  width?: number;
  height?: number;
};

function LightCables(props: Props);

const {
  style,
  background = "#000000",
  baseColor = "#000000",
  accentColor = "#FF7500",
  highlight = "#FFD900",
  speed = 34,
  hover = 114,
  grab = 100,
  direction = "ttb",
  positionX = -13,
  positionY = -21,
  bundle,
  flow,
  width,
  height,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "baseColor": "#141414",
  "accentColor": "#8C8A84",
  "highlight": "#F4F2EC",
  "speed": 12,
  "hover": 25,
  "grab": 20,
  "bundle": {
    "count": 16,
    "bend": 35,
    "spread": 80,
    "thickness": 70
  }
}
```

## data-strings

Canvas-drawn strands and moving particles with pointer repulsion.

**Signature / layout to reuse:** A fan or stream of drawn strands, with particles running along the curves.

**Interaction / rendering:** The source uses Canvas 2D, palette-based coloring and pointer repulsion. Orientation, strand geometry, particle count and cursor controls are exposed.

**Performance:** Medium. The default 2000 strands and 200 particles can be expensive. The editorial study lowers both; retain the production visibility and static-frame policy when composed.

**Yazhnova use:** Reserved technology-strip backdrop. Source available for composition after study.

**Screenshot:** [Default + editorial palette](shots/data-strings.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/data-strings.tsx`

```ts
DEFAULT_PALETTE = ["#2E7DFF", "#2BD9FF", "#F72585", "#FF4FA3", "#FF8A1E"];

export interface DataStringsProps {
  orientation?: "right" | "left" | "down" | "up";
  colorMode?: "bundles" | "flow";
  palette?: string[];
  background?: string;
  strands?: number;
  focus?: number;
  waist?: number;
  sweep?: number;
  reach?: number;
  curve?: number;
  strandWidth?: number;
  strandOpacity?: number;
  particles?: number;
  cursor?: number;
  style?: React.CSSProperties;
}

function DataStrings(props: DataStringsProps);

const {
  orientation = "down",
  colorMode = "flow",
  palette = ["#FF3333", "#FF5100", "#FFA300", "#00EAFF"],
  background = "#000000",
  strands = 2000,
  focus = 100,
  waist = 0,
  sweep = 0,
  reach = 100,
  curve = 100,
  strandWidth: rawWidth = 26,
  strandOpacity: rawOpacity = 11,
  particles = 200,
  cursor = 50,
  style,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "palette": ["#8C8A84", "#F4F2EC", "#141414"],
  "strands": 400,
  "particles": 40,
  "cursor": 20,
  "strandOpacity": 16,
  "strandWidth": 12
}
```

## liquid-grid

A real Canvas 2D wave simulation across an interactive dot or line grid.

**Signature / layout to reuse:** A dot or line lattice displaced by a real finite-difference wave field.

**Interaction / rendering:** Canvas 2D simulates pointer disturbances and click ripples. Grid cell size, radius, weight, collision and intensity are configurable.

**Performance:** Medium. Cost follows grid density and canvas area. A coarser grid is appropriate for smaller views; capture a real static frame for reduced motion.

**Yazhnova use:** Reserved SaaS service visual. The downloaded source has not replaced the current homepage presentation.

**Screenshot:** [Default + editorial palette](shots/liquid-grid.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/liquid-grid.tsx`

```ts
DEFAULTS = {
  mode: "dots" as "lines" | "dots",
  background: "#000000",
  lineColor: "#FFFFFF4D",
  glowColor: "#FFFFFF",
  cellSize: 16,
  lineWidth: 1,
  radius: 58,
  intensity: 100,
  collide: true,
  clickRipple: true,
};

interface LiquidGridProps {
  mode?: "lines" | "dots";
  background?: string;
  lineColor?: string;
  glowColor?: string;
  cellSize?: number;
  lineWidth?: number;
  radius?: number;
  intensity?: number;
  collide?: boolean;
  clickRipple?: boolean;
  style?: React.CSSProperties;
}

function LiquidGrid(props: LiquidGridProps);
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "lineColor": "#8C8A84",
  "glowColor": "#F4F2EC",
  "cellSize": 24,
  "lineWidth": 1,
  "intensity": 35,
  "radius": 120
}
```

## scrambletext

Character-based entrance scrambling and interactive hover diffusion.

**Signature / layout to reuse:** DOM characters grouped into measured words and lines; the default font has very wide tracking, while the editorial preset uses the brand type.

**Interaction / rendering:** Entrance scrambling and hover diffusion/waves operate on actual text. Nested entrance and hover settings control flicker, duration, character sets and replay.

**Performance:** Low. Low to moderate DOM/measurement cost for short text. Preserve accessible static text and disable decorative scrambling for reduced motion when integrated.

**Yazhnova use:** Reserved hero headline effect. This is text animation, not a canvas or replacement image.

**Screenshot:** [Default + editorial palette](shots/scrambletext.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/scrambletext.tsx`

```ts
type EnterMode = "none" | "oneLine" | "multiLine" | "random";

type HoverMode =
  "none" | "diffusionOneLine" | "diffusionMultiLine" | "waveOneLine" | "waveMultiLine";

function GlitchCharReveal(props: any);

const { words, enterAnimation, hoverAnimation, color, font, tag } = props;

COMPONENT_DEFAULTS = {
  words: "Scramble Text",
  enterAnimation: {
    mode: "oneLine",
    restState: "solid",
    replay: true,
    position: "above",
    scrambleIntensity: 100,
    ease: { type: "tween", duration: 2, ease: "linear" },
    flickerEnabled: true,
    flickerColor: "#333333",
    flickerIntensity: 84,
    flickerSpeed: 10,
  },
  hoverAnimation: {
    type: "diffusion",
    lines: "oneLine",
    radius: 2,
    collapse: false,
    collapseTime: 1,
    glitchChars: "abcdefghijklmnopqrstuvwxyz",
    glitchShuffle: true,
    flickerEnabled: false,
    flickerColor: "#ff4400",
    flickerIntensity: 50,
    flickerSpeed: 10,
    waveEase: { type: "tween", duration: 1.5, ease: "linear" },
    waveShuffleLimitEnabled: false,
    waveShuffleLimitValue: 10,
  },
  color: "#ffffff",
  font: {
    fontFamily: "Inter",
    variant: "Bold",
    fontSize: 120,
    lineHeight: "1em",
    letterSpacing: "2em",
  } as any,
  tag: "p",
};
```

**Editorial overrides:** Explicit source props:

```json
{
  "words": "Software, engineered to think.",
  "color": "#F4F2EC",
  "font": {
    "fontFamily": "Inter Tight",
    "fontSize": 72,
    "fontWeight": 500,
    "lineHeight": "1.05em",
    "letterSpacing": "-0.04em"
  },
  "enterAnimation": {
    "mode": "oneLine",
    "replay": false,
    "restState": "solid",
    "scrambleIntensity": 50,
    "ease": {
      "type": "tween",
      "duration": 1.2,
      "ease": "easeOut"
    },
    "flickerEnabled": false,
    "flickerColor": "#8C8A84"
  },
  "hoverAnimation": {
    "type": "diffusion",
    "lines": "oneLine",
    "radius": 2,
    "flickerEnabled": false,
    "flickerColor": "#8C8A84"
  }
}
```

## scroll-text-reveal

GSAP-split text revealed through line masks with scroll-driven motion.

**Signature / layout to reuse:** Real text split into GSAP lines, words or characters inside clipping wrappers.

**Interaction / rendering:** GSAP SplitText and ScrollTrigger combine with Framer Motion to reveal the text; font, blur, direction, splitting and transition controls are exposed.

**Performance:** Low. Uses installed GSAP and Framer Motion. Short headings are inexpensive; reduce blur and retain static text for reduced motion in production.

**Yazhnova use:** Reserved section-heading reveal. Its raw DOM rendering is studied independently before integration.

**Screenshot:** [Default + editorial palette](shots/scroll-text-reveal.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/scroll-text-reveal.tsx`

```ts
interface FontConfig {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontStyle?: string;
  textDecoration?: string;
  textTransform?: string;
  letterSpacing?: number | string;
  lineHeight?: string | number;
  textAlign?: "left" | "center" | "right" | "justify";
}

interface TransitionConfig {
  type?: "tween" | "spring";
  duration?: number;
  ease?: string;
  delay?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  bounce?: number;
  restDelta?: number;
  restSpeed?: number;
}

interface LineMaskSplitProps {
  text?: string;
  color?: string;
  font?: FontConfig;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
  className?: string;
  style?: React.CSSProperties;
  transition?: TransitionConfig;
  reverse?: boolean;
  scrollTriggerPosition?: "top" | "center" | "bottom";
  splitMode?: "chars" | "words" | "lines";
  blurEnabled?: boolean;
  blurIntensity?: number;
  translateXInitial?: number;
  translateYInitial?: number;
}

function LineMaskSplit({
  text = "ANIMATION ON REVEAL",
  color = "#FFFFFF",
  font = {
    fontFamily: "Inter",
    fontSize: 60,
    fontWeight: "700",
    lineHeight: "130%",
    letterSpacing: 0,
    textAlign: "center",
  },
  tag = "h1",
  className = "",
  style = {},
  transition = {
    type: "tween",
    duration: 0.8,
    ease: "easeInOut",
    delay: 0,
  },
  reverse = true,
  scrollTriggerPosition = "bottom",
  splitMode = "chars",
  blurEnabled = true,
  blurIntensity = 20,
  translateXInitial = 0,
  translateYInitial = 100,
}: LineMaskSplitProps);
```

**Editorial overrides:** Explicit source props:

```json
{
  "text": "Good ideas deserve great engineering.",
  "color": "#F4F2EC",
  "font": {
    "fontFamily": "Inter Tight",
    "fontSize": 64,
    "fontWeight": 500,
    "lineHeight": "110%",
    "letterSpacing": "-0.04em",
    "textAlign": "center"
  },
  "reverse": false,
  "blurIntensity": 6
}
```

## glow-border

A rotating conic light trail confined to a real DOM border.

**Signature / layout to reuse:** An isolated DOM perimeter with a rotating conic-gradient trail. It supplies no CTA copy or button behavior.

**Interaction / rendering:** A requestAnimationFrame loop rotates the trail; pointer presence boosts speed. Direction, colors, tail length, thickness, corner radius and multicolor mode are exposed.

**Performance:** Low. No canvas or WebGL. Limit moving border area and suppress its loop for reduced motion when integrating.

**Yazhnova use:** Reserved restrained CTA treatment, with monochrome one-pixel editorial settings rather than the default cyan glow.

**Screenshot:** [Default + editorial palette](shots/glow-border.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/glow-border.tsx`

```ts
type Props = {
  mode: "standard" | "multi";
  direction: "clockwise" | "anti-clockwise";
  speed: number;
  hoverMultiplier: number;
  rainbowColors: string[];
  glowColor: string;
  tailColor: string;
  baseColor: string;
  tailLength: number;
  dualTails: boolean;
  borderWidth: number;
  rounded: number;
  style?: React.CSSProperties;
};

DEFAULT_RAINBOW = ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#6366F1", "#A855F7"];

DEFAULTS = {
  mode: "standard",
  direction: "clockwise",
  speed: 10,
  hoverMultiplier: 5,
  glowColor: "rgba(255, 255, 255, 1)",
  tailColor: "rgba(255, 255, 255, 0.4)",
  baseColor: "rgba(255, 255, 255, 0.04)",
  tailLength: 60,
  dualTails: true,
  borderWidth: 5,
  rounded: 0,
};

function GlowBorder(props: Props);

const {
  mode = DEFAULTS.mode,
  direction = DEFAULTS.direction,
  speed = DEFAULTS.speed,
  hoverMultiplier = DEFAULTS.hoverMultiplier,
  glowColor = "#00FFE8",
  tailColor = "#00EDFF66",
  baseColor = "rgba(255, 255, 255, 0.04)",
  tailLength = DEFAULTS.tailLength,
  dualTails = DEFAULTS.dualTails,
  borderWidth = DEFAULTS.borderWidth,
  rounded = DEFAULTS.rounded,
  style,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "glowColor": "#F4F2EC",
  "tailColor": "#8C8A84",
  "baseColor": "#141414",
  "rainbowColors": ["#F4F2EC", "#8C8A84", "#141414"],
  "borderWidth": 1,
  "speed": 3,
  "rounded": 0,
  "hoverMultiplier": 2
}
```

## predictive-arc-02

An animated dotted horizon arc with pointer-controlled tilt.

**Signature / layout to reuse:** A self-contained pixel arc and quiet horizon, with no built-in heading or navigation. Style overrides remove editor minimum dimensions for a responsive study.

**Interaction / rendering:** A real WebGL shader animates the arc intensity and tilts it with the pointer. Density, dot size, speed, hover and the rise/radius/thickness/falloff group control the result.

**Performance:** Medium. Moderate fullscreen fragment cost. Reduce density and motion, and capture a genuine frame for reduced-motion or mobile composition. The gallery unmounts inactive iframes.

**Yazhnova use:** The reserved hero-rim accent. Downloaded for study; the existing approved hands hero remains composed with its current sources.

**Screenshot:** [Default + editorial palette](shots/predictive-arc-02.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/predictive-arc-02.tsx`

```ts
interface Props {
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  background?: string;
  baseColor?: string;
  accentColor?: string;
  highlight?: string;
  density?: number;
  dotSize?: number;
  speed?: number;
  hover?: number;
  horizon?: HorizonGroup;
}

type HorizonGroup = { rise?: number; radius?: number; thickness?: number; falloff?: number };

HORIZON_DEFAULTS: Required<HorizonGroup> = { rise: 45, radius: 90, thickness: 100, falloff: 250 };

function PredictiveArcHorizon(props: Props);

const {
  style,
  background = "#02040A",
  baseColor = "#0B2A5E",
  accentColor = "#3FA9FF",
  highlight = "#E8F6FF",
  density = 40,
  dotSize = 100,
  speed = 50,
  hover = 100,
  horizon = { rise: 45, radius: 90, falloff: 250, thickness: 100 },
  width,
  height,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "baseColor": "#141414",
  "accentColor": "#8C8A84",
  "highlight": "#F4F2EC",
  "density": 80,
  "dotSize": 75,
  "speed": 10,
  "hover": 20,
  "horizon": {
    "rise": 45,
    "radius": 90,
    "thickness": 60,
    "falloff": 250
  }
}
```

## fluid-field

A flowing WebGL light field with warped beams and pointer response.

**Signature / layout to reuse:** An atmospheric light field with flowing beams, turbulence and a configurable dark ground. It supplies a background rather than a content layout.

**Interaction / rendering:** WebGL produces the moving field and pointer response. Base/accent/background colors and the flow group control scale, warp, beam width and glow.

**Performance:** Medium. Moderate fragment cost and continuous animation. A slow, low-glow preset is appropriate for desktop; use a source-captured frame for mobile and reduced motion when composed into production.

**Yazhnova use:** The reserved contact background. Keep the actual form on a legible solid panel when this source is integrated.

**Screenshot:** [Default + editorial palette](shots/fluid-field.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/fluid-field.tsx`

```ts
type FlowGroup = { scale?: number; warp?: number; beam?: number; glow?: number };

FLOW_DEFAULTS: Required<FlowGroup> = { scale: 87, warp: 100, beam: 154, glow: 400 };

interface Props {
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  background?: string;
  baseColor?: string;
  accentColor?: string;
  speed?: number;
  hover?: number;
  flow?: FlowGroup;
}

function FluidField(props: Props);

const {
  style,
  background = "#030305",
  baseColor = "#2640D9",
  accentColor = "#6633E6",
  speed = 100,
  hover = 185,
  flow,
  width,
  height,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "baseColor": "#141414",
  "accentColor": "#8C8A84",
  "speed": 10,
  "hover": 25,
  "flow": {
    "scale": 100,
    "warp": 70,
    "beam": 100,
    "glow": 50
  }
}
```

## light-bloom

A directional WebGL bloom or shaft field with drifting light.

**Signature / layout to reuse:** A directional bloom or shaft field with selectable edge origin and fine finish controls. It includes no CTA text or card.

**Interaction / rendering:** The actual WebGL shader moves light shafts and reacts to pointer presence. Variant, direction, light spread/rise, shaft count/amount/drift, grain and vignette are exposed.

**Performance:** Medium. Moderate continuous shader cost. Reduce shaft count, speed and contrast; use a genuine captured frame for mobile/reduced-motion composition.

**Yazhnova use:** Reserved atmosphere for the final CTA or contact. Editorial overrides remove the default violet light without replacing the renderer.

**Screenshot:** [Default + editorial palette](shots/light-bloom.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/light-bloom.tsx`

```ts
type LightGroup = { rise?: number; spread?: number };

type ShaftGroup = { count?: number; amount?: number; drift?: number };

type FinishGroup = { grain?: number; vignette?: number };

type Props = {
  style?: React.CSSProperties;
  variant?: "bloom" | "shafts";
  direction?: "bottom" | "top" | "left" | "right";
  background?: string;
  baseColor?: string;
  accentColor?: string;
  speed?: number;
  hover?: number;
  light?: LightGroup;
  shafts?: ShaftGroup;
  finish?: FinishGroup;
  width?: number;
  height?: number;
};

D_LIGHT: Required<LightGroup> = { rise: 79, spread: 72 };

D_SHAFTS: Required<ShaftGroup> = { count: 17, amount: 70, drift: 79 };

D_FINISH: Required<FinishGroup> = { grain: 12, vignette: 25 };

function LightBloom(props: Props);

const {
  style,
  variant = "shafts",
  direction = "bottom",
  background = "#000000",
  baseColor = "#6B2BF5",
  accentColor = "#EFE6FF",
  speed = 100,
  hover = 114,
  light,
  shafts,
  finish,
  width,
  height,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "baseColor": "#141414",
  "accentColor": "#F4F2EC",
  "speed": 12,
  "hover": 25,
  "light": {
    "rise": 65,
    "spread": 70
  },
  "shafts": {
    "count": 8,
    "amount": 25,
    "drift": 10
  },
  "finish": {
    "grain": 2,
    "vignette": 15
  }
}
```

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

type Config = {
  deep: string;
  shallow: string;
  scatter: string;
  foam: string;
  zenith: string;
  horizon: string;
  swell: number;
  choppy: number;
  detail: number;
  glitter: number;
  subsurface: number;
  foamAmount: number;
  cloud: number;
  haze: number;
  speed: number;
  drag: number;
  sizePercent: number;
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

## single-glossy-sphere

A raymarched sphere with animated folded bands and reflective surface detail.

**Signature / layout to reuse:** A self-contained circular object with animated folded bands, environment reflections and fine surface shading. Its exposed style prop removes the editor's 1200-by-800 minimum for responsive windows.

**Interaction / rendering:** A genuine WebGL2 raymarcher supports drag rotation, automatic rotation, evolving folds and configurable iridescence. All visual data comes from the installed shader.

**Performance:** High. High fragment cost: the shader can march up to 160 steps with repeated noise sampling. Reduce steps/resolution or use a genuine captured frame when composed into production. The gallery unmounts inactive panels.

**Yazhnova use:** The reserved Agentic AI service visual. Downloaded and reviewable; the current homepage slot is deliberately retained until the composition is updated.

**Screenshot:** [Default + editorial palette](shots/single-glossy-sphere.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/single-glossy-sphere.tsx`

```ts
ADVANCED_DEFAULTS = {
  seed: 76,
  foldSpeed: 142,
  bandSpeed: 15,
  foldWidth: 12,
  foldHeight: 50,
  foldDepth: 70,
  bottomFolds: 160,
  bandWarp: 88,
  slabVariation: 0,
  capSmooth: 100,
  bevel: 10,
  centerX: 50,
  centerY: 51,
  skyColor: "#F4FFFF",
  horizonColor: "#B8F6FB",
  shadowColor: "#2F4FE0",
  grooveColor: "#56667A",
  lightAngle: 40,
  lightPower: 120,
  shininess: 10,
  rim: 70,
  filmBands: 120,
  filmPatches: 60,
  grooveDark: 75,
  glowColor: "#3F7FA6",
  glowSize: 8,
  glow: 35,
  exposure: 105,
  steps: 96,
  resolution: 100,
  grain: 0,
  vignette: 0,
};

interface AdvancedProps {
  seed?: number;
  foldSpeed?: number;
  bandSpeed?: number;
  foldWidth?: number;
  foldHeight?: number;
  foldDepth?: number;
  bottomFolds?: number;
  bandWarp?: number;
  slabVariation?: number;
  capSmooth?: number;
  bevel?: number;
  centerX?: number;
  centerY?: number;
  skyColor?: string;
  horizonColor?: string;
  shadowColor?: string;
  grooveColor?: string;
  lightAngle?: number;
  lightPower?: number;
  shininess?: number;
  rim?: number;
  filmBands?: number;
  filmPatches?: number;
  grooveDark?: number;
  glowColor?: string;
  glowSize?: number;
  glow?: number;
  exposure?: number;
  steps?: number;
  resolution?: number;
  grain?: number;
  vignette?: number;
}

interface SingleGlossySphereProps {
  speed?: number;
  scale?: number;
  displacement?: number;
  bands?: number;
  iridescence?: number;
  baseColor?: string;
  background?: string;
  dragSensitivity?: number;
  autoRotate?: boolean;
  rotateSpeed?: number;
  advanced?: AdvancedProps;
  style?: React.CSSProperties;
}

function SingleGlossySphere(props: SingleGlossySphereProps);

const {
  speed = 50,
  scale = 71,
  displacement = 62,
  bands = 7,
  iridescence = 100,
  baseColor = "#00AFFF",
  background = "#010103",
  dragSensitivity = 100,
  autoRotate = true,
  rotateSpeed = 100,
  advanced = {},
  style,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "baseColor": "#F4F2EC",
  "speed": 15,
  "rotateSpeed": 12,
  "iridescence": 0,
  "advanced": {
    "skyColor": "#F4F2EC",
    "horizonColor": "#8C8A84",
    "shadowColor": "#141414",
    "grooveColor": "#8C8A84",
    "glowColor": "#FFB45A",
    "glow": 0,
    "filmBands": 2,
    "filmPatches": 0,
    "steps": 64,
    "resolution": 70
  }
}
```

## star-gate

A real Three.js corridor of nested, twisting star-shaped ribbons.

**Signature / layout to reuse:** A centered tunnel of repeated star-shaped ribbon geometry. Useful as a closing visual, independently of any heading or CTA layout.

**Interaction / rendering:** Real Three.js geometry travels forward or backward with configurable star points, spike depth, gate count, twist, stroke gauge, light and zoom.

**Performance:** Medium. Gate count grows quadratically with its control. The editorial study lowers gates, glow and speed. Production must retain the existing visibility and reduced-motion policy when the slot is composed.

**Yazhnova use:** The reserved final CTA tunnel. This download does not replace the approved stone intro or change the current hero.

**Screenshot:** [Default + editorial palette](shots/star-gate.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/star-gate.tsx`

```ts
DEFAULTS = {
  near: "#00FFF0",
  far: "#2A00FF",
  points: 8,
  spike: 20,
  gates: 16,
  twist: 20,
  gauge: 5,
  glow: 3,
  speed: 2,
  direction: "forward",
  sizePercent: 136,
};

type Config = {
  near: string;
  far: string;
  points: number;
  spike: number;
  gates: number;
  twist: number;
  gauge: number;
  glow: number;
  speed: number;
  direction: "forward" | "reverse";
  sizePercent: number;
};

export interface StarGateProps extends Config {
  style?: React.CSSProperties;
}

function StarGate(props: StarGateProps);

const {
  near = DEFAULTS.near,
  far = DEFAULTS.far,
  points = DEFAULTS.points,
  spike = DEFAULTS.spike,
  gates = DEFAULTS.gates,
  twist = DEFAULTS.twist,
  gauge = DEFAULTS.gauge,
  glow = DEFAULTS.glow,
  speed = DEFAULTS.speed,
  direction = DEFAULTS.direction as Config["direction"],
  sizePercent = DEFAULTS.sizePercent,
  style,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "near": "#F4F2EC",
  "far": "#8C8A84",
  "gates": 6,
  "glow": 1,
  "speed": 0.6
}
```

## spark-lattice

Light walkers trace a hexagonal lattice and follow the pointer.

**Signature / layout to reuse:** A hexagonal line field with illuminated trails. No step labels or process content are built into the source.

**Interaction / rendering:** WebGL renders moving walkers and a pointer-directed trail. Cell size, light count, trail length, speed, glow and hover response are configurable.

**Performance:** Medium. Moderate fragment and walker cost. Slow, sparse settings suit a process background; use a captured frame for mobile and reduced motion when integrated. Gallery iframe unmounting cancels the source loop off-screen.

**Yazhnova use:** The reserved process connector behind Discover, Design, Build, and Ship & Scale. Current production composition stays intact while the real source is reviewed.

**Screenshot:** [Default + editorial palette](shots/spark-lattice.png).

**Public props and defaults:** The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults.

`components/originkit/ui/spark-lattice.tsx`

```ts
interface SparkLatticeProps {
  style?: React.CSSProperties;
  background?: string;
  lineColor?: string;
  accent?: string;
  size?: number;
  lights?: number;
  speed?: number;
  trail?: number;
  glow?: number;
  hover?: number;
  width?: number;
  height?: number;
}

function SparkLattice(props: SparkLatticeProps);

const {
  style,
  background = "#000000",
  lineColor = "#0F0F0F",
  accent = "#FF2A18",
  size = 132,
  lights = 8,
  speed = 50,
  trail = 2,
  glow = 92,
  hover = 100,
  width,
  height,
} = props;
```

**Editorial overrides:** Explicit source props:

```json
{
  "background": "#0A0A0A",
  "lineColor": "#141414",
  "accent": "#FFB45A",
  "lights": 4,
  "speed": 12,
  "trail": 3,
  "glow": 15,
  "hover": 30,
  "size": 110
}
```

## hero-44

Installed through `npx originkit@latest add hero-44 --path components/originkit`, including the real WebGL plasma renderer, exported section, CSS and all fourteen local assets.

| Element                       | Role / controls                                                                                                                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plasma wire mesh              | Genuine native WebGL lines with time-driven deformation and pointer drag. Colors, density, speed, wave height, center opacity, scale and drag sensitivity are configurable.                              |
| Hand, mist and ridge          | Original downloaded assets, recolored to monochrome through CSS and served through Next Image in production.                                                                                             |
| Section composition           | Optional `children`, `artwork` and `className` inputs let the downloaded section host the shared Yazhnova typography and scene; the original study remains available.                                    |
| Brand and lifecycle additions | Optional `hotspotColor` and `initialRotation`; explicit native GPU cleanup; shared capped DPR, viewport mounting and the two-context budget.                                                             |
| Production use                | One hero component for six main chapters. The AI glassbound visual remains in the lower workflow demo.                                                                                                   |
| Performance                   | Medium relative cost. Density 88 on desktop, 48 on mobile; mobile DPR 1. The lower-density mobile grid has roughly one third as many vertices. Reduced motion uses an actual transparent canvas capture. |

[Source study](shots/hero-44.png) · [Responsive captures and verification](chapters/README.md).

## hero-55

**Installed source:** hero-55.tsx, hero-55.css, ui/hero-55/section-hero.tsx and ui/hero-55/rain-puddle.tsx.

**Key element:** the actual procedural WebGL wet street, puddle reflections, falling rain, expanding ripples and pointer-cast light. SectionHero now accepts optional children/artwork slots for recomposition while keeping the original standalone study.

**Controls:** background, baseColor, accentColor, rain, speed, tilt; puddles coverage/scale/reflection; drops ripples/streaks; cursor reach/ripple/glow. Optional highlightColor, cursorColor, colorToning, pixelRatio and preserveDrawingBuffer preserve existing defaults. Production disables the native blue/warm grade, uses graphite/paper light, and reserves orange for the pointer light.

**Cost:** medium fullscreen fragment shader. Production DPR 1 desktop / 0.75 touch, fewer mobile drops, automatic playback, off-screen disposal and the shared two-context budget. Reduced motion uses a genuine frame.

**Placement:** full Contact hero, heading left and existing functional form right; stacked on mobile. No stock ecommerce copy in production.

[Raw + editorial study](shots/hero-55.png) ? [Contact review](contact-hero55/README.md).

### paperline-archive: full-screen Home composition

The current Home preset restores live text with speed 50, a 3.2-second hold, native staggered fade and repeat. Optional typeface (family/weight), paperOpacity, playFromStart and advanced.textBottom controls preserve original defaults and let the native timeline paint the studio's large grotesk headline over separately toned newspaper type. The statement is accessible through a real HTML H2. [Screenshots and animation](manifesto/README.md).

### Current Home: standalone dither-reveal + hero-69

Home now uses the installed standalone dither-reveal rather than hero-40's copy. Optional darkColor/lightColor/monochrome inputs recolor the actual shader to ink/paper; onReady preserves the loading preview until its first textured draw. The hand photograph is a landscape edit, with no stone or effects baked in. A separately rendered, alpha-composited hero-69 stone occupies the center. The latter's optional transparent input leaves its opaque intro default unchanged. [Review and source notes](hands-stone/README.md).


## ridge-parallax

**Rating: 9/10 for the shared footer.** Genuine WebGL layered particle ridges fit the raw-stone-to-signal story without adding another boxed hero. Installed successfully through the OriginKit CLI on 28 October 2026.

**Key element:** six procedural mountain layers with depth haze, native horizontal drift and scroll parallax. No external texture or image dependencies.

**Public controls:** `background`, `baseColor`, `accentColor`, `density`, `dotSize`, `speed`, `pointer`; `range` exposes `layers`, `height`, `roughness`, `fall`, `seed`; `depth` exposes `parallax`, `haze`, `travelStart`, `travelEnd`; optional width/height/style. All production colors are explicit: ink #0A0A0A, distant warm grey #57534E and signal orange #FF3B00.

**Performance:** medium, source-informed estimate. Desktop density 70 across six layers produces approximately 109,000 points at DPR ?1.5. Phone density 36 across four layers produces approximately 37,400 points at DPR 1. The existing visibility wrapper retires off-screen surfaces and enforces two live contexts, including the wordmark. Reduced motion uses a frame captured from this real renderer; touch screens retain animation.

**Software-company use:** a continuous footer landscape, suggesting the signal moving through raw material. Links stay readable above an ink fade; the existing grotesk wordmark blends over the terrain.

**Source study:** [Original and editorial side by side](shots/ridge-parallax.png). [Footer screenshots and checks](footer-ridge/README.md). No rendering algorithms were recreated.
