# Deferred OriginKit slots

These are explicit, neutral adapters for the 19 items not yet downloaded. They do not simulate the missing effects. Their props are provisional application contracts, not claims about an unavailable component's exact API. Source-specific names must be mapped when the real file is available. Existing genuine visual sources continue to render inside the wrappers. Empty atmospheric/global slots render nothing.

| File                                      | OriginKit slug         | Placement                                                     | Provisional props                                                                                                  |
| ----------------------------------------- | ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `components/slots/SingleGlossySphere.tsx` | `single-glossy-sphere` | Agentic service visual                                        | `color?: string; size?: number; speed?: number;` + children, className, style                                      |
| `components/slots/StarGate.tsx`           | `star-gate`            | Behind the final CTA's real EmberHusk                         | `background?: string; color?: string; speed?: number;` + children, className, style                                |
| `components/slots/SparkLattice.tsx`       | `spark-lattice`        | Process background                                            | `sparkColor?: string; density?: number; speed?: number;` + children, className, style                              |
| `components/slots/PredictiveArc02.tsx`    | `predictive-arc-02`    | Hero rim accent                                               | `background?: string; color?: string; opacity?: number; speed?: number;` + children, className, style              |
| `components/slots/FluidField.tsx`         | `fluid-field`          | Contact background                                            | `background?: string; colors?: string[]; speed?: number;` + children, className, style                             |
| `components/slots/LightBloom.tsx`         | `light-bloom`          | Final CTA and contact atmosphere                              | `background?: string; color?: string; intensity?: number;` + children, className, style                            |
| `components/slots/LightCables.tsx`        | `light-cables`         | Optional process connector                                    | `background?: string; color?: string; speed?: number;` + children, className, style                                |
| `components/slots/DataStrings.tsx`        | `data-strings`         | Technology strip backdrop                                     | `color?: string; text?: string; speed?: number; opacity?: number;` + children, className, style                    |
| `components/slots/LiquidGrid.tsx`         | `liquid-grid`          | SaaS service visual                                           | `background?: string; color?: string; density?: number; speed?: number;` + children, className, style              |
| `components/slots/ScrambleText.tsx`       | `scrambletext`         | Hero headline                                                 | `text: string; speed?: number; trigger?: 'load' / 'hover' / 'view';` + children, className, style                  |
| `components/slots/ScrollTextReveal.tsx`   | `scroll-text-reveal`   | Section headings                                              | `text?: string; amount?: number;` + children, className, style                                                     |
| `components/slots/GlowBorder.tsx`         | `glow-border`          | Primary project links and form action                         | `color?: string; radius?: number; duration?: number;` + children, className, style                                 |
| `components/slots/CurvedMarquee.tsx`      | `curvedmarquee`        | Straight technology marquee                                   | `items?: readonly string[]; speed?: number; direction?: 'left' / 'right';` + children, className, style            |
| `components/slots/StackedCarousel.tsx`    | `stacked-carousel`     | Case-study presentation                                       | `activeIndex?: number; itemCount?: number;` + children, className, style                                           |
| `components/slots/ImageSpotlight.tsx`     | `image-spotlight`      | Case-study visual                                             | `src?: string; alt?: string; color?: string; radius?: number;` + children, className, style                        |
| `components/slots/LiveChat.tsx`           | `live-chat`            | Illustrative agent workflow transcript                        | `messages?: readonly { role: 'user' / 'agent'; content: string }[]; accent?: string;` + children, className, style |
| `components/slots/AuraCursor.tsx`         | `aura-cursor`          | Global desktop enhancement                                    | `color?: string; size?: number; enabled?: boolean;` + children, className, style                                   |
| `components/slots/HairlineLoader.tsx`     | `hairline-loader`      | First-load enhancement                                        | `color?: string; duration?: number;` + children, className, style                                                  |
| `components/slots/CloudSky03.tsx`         | `cloud-sky/03`         | Optional contact atmosphere; verify canonical slug on install | `background?: string; cloudColor?: string; speed?: number;` + children, className, style                           |

## Exact swap procedure

1. When the user says `added <slug>`, verify the real entry file and dependencies. For cloud-sky/03, first verify its canonical registry name rather than guessing.
2. Read and browser-test its real API in the playground, including the original and paper/ink/amber preset. Add its screenshot and inventory entry.
3. For a canvas effect, add a dynamic `ssr:false` import to `components/visuals/renderers.tsx`, add the palette/quality preset in `lib/visual-presets.ts`, and capture a genuine fallback frame. Reuse `LiveVisual` so off-screen unmounting, hidden-tab pausing and reduced-motion/mobile fallbacks stay in force. Do not add a replacement shader or recreate its visual.
4. Replace the corresponding named slot's neutral return with the real adapter. Map its provisional props explicitly. Preserve the existing text, accessible labels, navigation and content from `content/site.ts`.
5. Remove that file's TODO, update this list and the source manifest/fixes log, then run type checking, a production build, browser/keyboard/console checks and canvas verification. Confirm the new source renders a real canvas where applicable.

## Current available-source status

All 16 downloaded items rendered successfully after minimal type corrections. No installed item currently needs to move to the unavailable list. The 19 files above remain placeholders solely because their actual OriginKit source has not been downloaded.
