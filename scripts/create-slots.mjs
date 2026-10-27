import { mkdir, writeFile } from "node:fs/promises";
const slots = [
  [
    "SingleGlossySphere",
    "single-glossy-sphere",
    "color?: string; size?: number; speed?: number;",
    "Agentic service visual",
  ],
  [
    "StarGate",
    "star-gate",
    "background?: string; color?: string; speed?: number;",
    "Behind the final CTA's real EmberHusk",
  ],
  [
    "SparkLattice",
    "spark-lattice",
    "sparkColor?: string; density?: number; speed?: number;",
    "Process background",
  ],
  [
    "PredictiveArc02",
    "predictive-arc-02",
    "background?: string; color?: string; opacity?: number; speed?: number;",
    "Hero rim accent",
  ],
  [
    "FluidField",
    "fluid-field",
    "background?: string; colors?: string[]; speed?: number;",
    "Contact background",
  ],
  [
    "LightBloom",
    "light-bloom",
    "background?: string; color?: string; intensity?: number;",
    "Final CTA and contact atmosphere",
  ],
  [
    "LightCables",
    "light-cables",
    "background?: string; color?: string; speed?: number;",
    "Optional process connector",
  ],
  [
    "DataStrings",
    "data-strings",
    "color?: string; text?: string; speed?: number; opacity?: number;",
    "Technology strip backdrop",
  ],
  [
    "LiquidGrid",
    "liquid-grid",
    "background?: string; color?: string; density?: number; speed?: number;",
    "SaaS service visual",
  ],
  [
    "ScrambleText",
    "scrambletext",
    "text: string; speed?: number; trigger?: 'load' | 'hover' | 'view';",
    "Hero headline",
  ],
  ["ScrollTextReveal", "scroll-text-reveal", "text?: string; amount?: number;", "Section headings"],
  [
    "GlowBorder",
    "glow-border",
    "color?: string; radius?: number; duration?: number;",
    "Primary project links and form action",
  ],
  [
    "CurvedMarquee",
    "curvedmarquee",
    "items?: readonly string[]; speed?: number; direction?: 'left' | 'right';",
    "Straight technology marquee",
  ],
  [
    "StackedCarousel",
    "stacked-carousel",
    "activeIndex?: number; itemCount?: number;",
    "Case-study presentation",
  ],
  [
    "ImageSpotlight",
    "image-spotlight",
    "src?: string; alt?: string; color?: string; radius?: number;",
    "Case-study visual",
  ],
  [
    "LiveChat",
    "live-chat",
    "messages?: readonly { role: 'user' | 'agent'; content: string }[]; accent?: string;",
    "Illustrative agent workflow transcript",
  ],
  [
    "AuraCursor",
    "aura-cursor",
    "color?: string; size?: number; enabled?: boolean;",
    "Global desktop enhancement",
  ],
  [
    "HairlineLoader",
    "hairline-loader",
    "color?: string; duration?: number;",
    "First-load enhancement",
  ],
  [
    "CloudSky03",
    "cloud-sky/03",
    "background?: string; cloudColor?: string; speed?: number;",
    "Optional contact atmosphere; verify canonical slug on install",
  ],
];
await mkdir("components/slots", { recursive: true });
await writeFile(
  "components/slots/types.ts",
  'import type { CSSProperties, ReactNode } from "react";\nexport interface SlotProps { children?: ReactNode; className?: string; style?: CSSProperties; }\n',
);
let doc =
  "# Deferred OriginKit slots\n\nThese are explicit, neutral adapters for the 19 items not yet downloaded. They do not simulate the missing effects. Their props are provisional application contracts, not claims about an unavailable component's exact API. Source-specific names must be mapped when the real file is available. Existing genuine visual sources continue to render inside the wrappers. Empty atmospheric/global slots render nothing.\n\n| File | OriginKit slug | Placement | Provisional props |\n| --- | --- | --- | --- |\n";
for (const [name, slug, props, place] of slots) {
  const content =
    name === "ScrambleText"
      ? "text"
      : name === "ScrollTextReveal"
        ? "children ?? text"
        : "children";
  const element = name === "ScrambleText" ? "span" : "div";
  const childrenProps =
    name === "ScrambleText"
      ? "{ text, className, style }"
      : name === "ScrollTextReveal"
        ? "{ children, text, className, style }"
        : "{ children, className, style }";
  const file = `import type { SlotProps } from "./types";\n// TODO(originkit:${slug})\nexport interface ${name}Props extends SlotProps { ${props} }\nexport function ${name}(${childrenProps}: ${name}Props) {\n  ${["ScrambleText", "ScrollTextReveal"].includes(name) ? "" : "if (!children) return null;"}\n  return <${element} className={className} style={{ display: "contents", ...style }} data-slot="${slug}" data-slot-status="pending">{${content}}</${element}>;\n}\n`;
  await writeFile(`components/slots/${name}.tsx`, file);
  doc += `| \`components/slots/${name}.tsx\` | \`${slug}\` | ${place} | \`${props.replaceAll("|", "/")}\` + children, className, style |\n`;
}
await writeFile(
  "components/slots/index.ts",
  slots.map(([name]) => `export { ${name} } from "./${name}";`).join("\n") + "\n",
);
doc +=
  "\n## Exact swap procedure\n\n1. When the user says `added <slug>`, verify the real entry file and dependencies. For cloud-sky/03, first verify its canonical registry name rather than guessing.\n2. Read and browser-test its real API in the playground, including the original and paper/ink/amber preset. Add its screenshot and inventory entry.\n3. For a canvas effect, add a dynamic `ssr:false` import to `components/visuals/renderers.tsx`, add the palette/quality preset in `lib/visual-presets.ts`, and capture a genuine fallback frame. Reuse `LiveVisual` so off-screen unmounting, hidden-tab pausing and reduced-motion/mobile fallbacks stay in force. Do not add a replacement shader or recreate its visual.\n4. Replace the corresponding named slot's neutral return with the real adapter. Map its provisional props explicitly. Preserve the existing text, accessible labels, navigation and content from `content/site.ts`.\n5. Remove that file's TODO, update this list and the source manifest/fixes log, then run type checking, a production build, browser/keyboard/console checks and canvas verification. Confirm the new source renders a real canvas where applicable.\n\n## Current available-source status\n\nAll 16 downloaded items rendered successfully after minimal type corrections. No installed item currently needs to move to the unavailable list. The 19 files above remain placeholders solely because their actual OriginKit source has not been downloaded.\n";
await writeFile("docs/slots.md", doc);
console.log("Created 19 named, documented slots without imitating unavailable effects.");
