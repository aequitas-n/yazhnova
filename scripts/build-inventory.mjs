import fs from "node:fs";
import ts from "typescript";
import { sourceCatalog, editorialPresets } from "../lib/originkit-catalog.ts";

const notes = {
  "hero-40": {
    layout:
      "A clear masthead, asymmetric image layer, oversized two-line headline and compact bottom readout. Reuse the spacing and actual companion dither shader, rather than its purple agency identity.",
    interaction:
      "Pointer proximity reveals the source image; optional traveling wave. Native anchors are static demo links.",
    mobile:
      "Source CSS removes desktop navigation and keeps the image behind the headline. Production uses the source image as its mobile static fallback.",
    use: "Hero texture and a human craft cue. It is an image shader, not a 3D hand model.",
    files: ["hero-40.tsx", "ui/hero-40/dither-reveal.tsx"],
  },
  "hero-51": {
    layout:
      "Enormous tight display type, restrained top navigation, a split below-headline content row and a compact diagnostic readout.",
    interaction:
      "The two shader eyes follow the page pointer, wander and dilate. The companion includes visibility and reduced-motion handling.",
    mobile:
      "The headline and readout stack; both eye canvases remain. Production borrows the typographic hierarchy instead of adding cartoon eyes to the engineering brand.",
    use: "Hero composition and typographic scale; the exact eye model remains available in the playground.",
    files: ["hero-51.tsx", "ui/hero-51/grin-iris.tsx"],
  },
  "hero-69": {
    layout:
      "An editorial serif headline over visible rules, generous empty space and an isolated 3D object. Lower corners hold narrative and actions.",
    interaction:
      "Real Three.js geometry scatters and settles, drifts, and responds to the pointer. Includes disposal, visibility and a reduced-motion state.",
    mobile:
      "The original rearranges copy above and below the object. Production uses low/medium quality on desktop and a captured static frame on touch devices.",
    use: "Final CTA and the first-visit desktop intro. The same actual fragments open and reassemble under optional choreography controls; original physics remains the default.",
    files: ["hero-69.tsx", "ui/hero-69/ember-husk.tsx"],
  },
  "hero-28": {
    layout:
      "Actual exported GridRails/GridFrame components, end ticks, alignment rules, inset navigation, serif headline, numbers and a logo row.",
    interaction:
      "Its black-hole companion uses two genuine Canvas 2D layers for orbiting particles. It is not a Three.js mesh. Framer/Motion reveals respond to reduced motion.",
    mobile:
      "Authored 360/390/768/1280 breakpoints reduce the grid and stack content. Borrowed rails stay decorative and never overlay controls.",
    use: "Shared engineering grid and process structure; no need to run the large particle disc on the production hero.",
    files: ["hero-28.tsx", "ui/hero-28/grid-frame.tsx", "ui/hero-28/black-hole.tsx"],
  },
  "features-02": {
    layout:
      "A centered globe, introduction and a three-column number strip separated by thin vertical rules. This is a presence/stats section, not a stock service bento.",
    interaction:
      "The Three.js globe rotates and supports drag, optional hover pause, markers, outlines and graticules. It fetches Natural Earth land geometry.",
    mobile:
      "The original makes the metric strip vertical. Production borrows its three-column structure for service rows and uses no invented performance statistics.",
    use: "Services hierarchy and global-engineering context. The original globe stays a verified playground study.",
    files: ["features-02.tsx", "ui/features-02/globe.tsx"],
  },
  "pricing-04": {
    layout:
      "Three comparison columns; the middle tier has emphasis. Features, a short fit statement and a clear CTA have a useful reading order.",
    interaction:
      "Billing buttons update rolling amounts using GSAP. Companion effects include cosmic WebGL, an animated border and moving button. Production omits prices, billing controls and neon decoration.",
    mobile:
      "Columns stack. Production carries over the comparison rhythm with square corners and hairlines.",
    use: "Fixed-scope, Dedicated Team and Retainer. The original RollingLetters companion supplies a restrained, one-time label transition.",
    files: [
      "pricing-04.tsx",
      "ui/pricing-04/rolling-letters.tsx",
      "ui/pricing-04/cosmic-bg.tsx",
      "ui/pricing-04/neon-border.tsx",
      "ui/pricing-04/moving-gradient-button.tsx",
    ],
  },
  "footer-03": {
    layout:
      "A closing invitation, multi-column links, a huge wordmark and a fine copyright baseline.",
    interaction:
      "The companion LightShaftText uses real WebGL2 text lighting; the CTA companion has a Canvas 2D starfield. Copy button belongs to the default SDK demo.",
    mobile:
      "Link columns wrap and the wordmark resizes. Production uses a calm typographic wordmark over a low-intensity rain surface, with a static fallback on mobile.",
    use: "Footer structure and oversized wordmark. LightShaftText is retained as an optional real-source companion, not replaced with a fake shader.",
    files: [
      "footer-03.tsx",
      "ui/footer-03/light-shaft-text.tsx",
      "ui/footer-03/starfield-button.tsx",
    ],
  },
  "dither-reveal": {
    layout:
      "A size-agnostic image container. No headline, navigation or palette prop is built in; it derives color from the input image.",
    interaction:
      "Pointer-controlled reveal with Bayer, line or noise dither and an optional wave. Uses a genuine WebGL image shader and texture.",
    mobile:
      "Original shader can run at up to 3x DPR, so production uses its own captured source frame instead on small/coarse-pointer screens.",
    use: "Hero craftsmanship visual and one service illustration. Monochrome input/filter recolors it without rewriting the shader.",
    files: ["ui/dither-reveal.tsx"],
  },
  "paperline-archive": {
    layout:
      "A procedurally typeset newspaper with masthead, rules, columns and overpainted brush lettering. The brush glyphs are drawn by the original Canvas 2D implementation.",
    interaction:
      "A timed brush-writing, hold and fade sequence; hover response; native reduced-motion paints a finished frame.",
    mobile:
      "Canvas retypesets to its container. Production keeps a legible fallback and an accessible HTML transcript so its statement is not image-only.",
    use: "The manifesto: THE YAZHNOVA DISPATCH / We build what's next. A deliberate warm-paper pause in the darker page.",
    files: ["ui/paperline-archive.tsx"],
  },
  "dithered-pixel-grid": {
    layout:
      "An embedded pixel artwork with a planet motif or a generated alternative. Exposes cell, rim, texture and ripple settings.",
    interaction:
      "Original Canvas 2D tile drawing with pointer ripples, drift, morph and glint. High cost at large cell counts, despite not being WebGL.",
    mobile:
      "Has reduced-motion handling; production uses a small service viewport and a captured frame on touch screens.",
    use: "Web development: a clear metaphor for assembling an interface from precise pieces.",
    files: ["ui/dithered-pixel-grid.tsx"],
  },
  "beyond-horizon": {
    layout:
      "A large dark disc hides a light source, leaving a thin bright rim and volumetric haze. It is an actual full-screen WebGL shader.",
    interaction:
      "Pointer presence changes the light; position contributes subtle parallax. A 26-step volumetric march makes large renders expensive.",
    mobile:
      "Scale it to a narrow band; production falls back to a genuine captured frame on mobile/reduced motion.",
    use: "A thin bottom horizon on the hero: paper light, graphite haze, no violet or blue halo.",
    files: ["ui/beyond-horizon.tsx"],
  },
  glassbound: {
    layout:
      "A rolling half-glass sphere above a field of extruded tiles, studs and gaps. The ground responds as the object travels.",
    interaction:
      "Real WebGL2 raymarching, refraction, specular light and pointer deformation. Advanced quality controls render resolution; native reduced motion stops travel.",
    mobile:
      "High GPU cost. Production lowers resolution through the real quality prop and uses its captured monochrome/amber frame on mobile.",
    use: "The main agentic-AI demonstration: intelligence traversing a structured system. Accent belongs to the sphere, not to surrounding UI chips.",
    files: ["ui/glassbound.tsx"],
  },
  "network-lines": {
    layout:
      "A size-independent field of fine lines, grouped nodes and points. No cards or text are built into it.",
    interaction:
      "WebGL nodes drift, form proximity connections and react to the pointer. Density and link distance control visual and computational load.",
    mobile:
      "Reduce node density and use a captured frame on mobile; no essential information depends on the moving lines.",
    use: "SaaS service visual and the connective tissue behind Discover → Design → Build → Ship & Scale.",
    files: ["ui/network-lines.tsx"],
  },
  "ocean-swell": {
    layout:
      "A Three.js full-screen ocean shader with a horizon, reflected light, wave detail, foam and sky.",
    interaction:
      "Pointer drag changes the view. Fixed 68-step tracing and multiple wave layers keep the cost high even at low motion speed.",
    mobile:
      "The original caps DPR at 1.25. Production uses a captured frame on mobile; a slow desktop preset can serve /contact without obscuring form fields.",
    use: "Contact-page atmosphere. The larger seascape suits a single focused page better than the denser footer.",
    files: ["ui/ocean-swell.tsx"],
  },
  "rain-puddle": {
    layout:
      "A close, rain-soaked surface with ripples, reflective puddles and faint streaks; less spatially dominant than the ocean.",
    interaction:
      "A real WebGL shader produces moving rain and pointer ripples/light. Puddle, drop and cursor groups offer fine control.",
    mobile:
      "Reduce rain, glow and reflections; production shows a source-captured static frame on small/coarse-pointer screens.",
    use: "Footer atmosphere: monochrome, slow and low contrast. Selected over the ocean because it stays quiet underneath a large wordmark.",
    files: ["ui/rain-puddle.tsx"],
  },
  "shadow-cast": {
    layout:
      "Raymarched vertical pillars with a movable light and long shadows. No project cards are included.",
    interaction:
      "Pointer presence and coordinates control the light; optional slow drift, grain, jitter and softness.",
    mobile:
      "High cost over a large backdrop. Desktop uses a low-density viewport; mobile uses a frame captured from the actual component.",
    use: "Case-study backdrop. Its existing #FFB45A provides the single restrained signal-amber accent for the brand.",
    files: ["ui/shadow-cast.tsx"],
  },
};

let text =
  "# OriginKit inventory — rendered source studies\n\nAll 16 installed items were read and rendered in original and editorial variants. `/playground` mounts only visible panels; each variant has its own document so CSS and IDs cannot collide. The exact draw contexts and runtime observations are in [playground-results.json](playground-results.json).\n\nPalette: ink `#0A0A0A`, graphite `#141414`, paper `#F4F2EC`, warm grey `#8C8A84`, restrained signal amber `#FFB45A`. No shaders, geometry or visual algorithms were recreated. Type-only fixes and the requested opt-in stone-intro controls are recorded in [fixes.md](fixes.md).\n\nCosts below are source-informed relative estimates, not measured frame-rate guarantees. Playground captures are desktop; mobile behavior combines the source breakpoints/controls with the production fallback policy.\n";
for (const item of sourceCatalog) {
  const n = notes[item.slug];
  text += `\n## ${item.slug}\n\n${item.signature}\n\n**Signature / layout to reuse:** ${n.layout}\n\n**Interaction / rendering:** ${n.interaction}\n\n**Performance:** ${item.cost}. ${n.mobile}\n\n**Yazhnova use:** ${n.use}\n\n**Screenshot:** [Default + editorial palette](shots/${item.slug}.png).\n\n**Public props and defaults:** ${item.kind === "section" ? "The section export accepts no configurable props; copy/layout are hardcoded. The companion APIs below are the reusable controls. Production composes those genuine companions with its own content and layout." : "The original interfaces and default values below are extracted from the installed source. Settings not overridden keep these defaults."}\n`;
  for (const relative of n.files) {
    const file = `components/originkit/${relative}`;
    const source = fs.readFileSync(file, "utf8");
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const definitions = [];
    for (const node of ast.statements) {
      if (ts.isInterfaceDeclaration(node)) definitions.push(node.getText(ast));
      if (
        ts.isTypeAliasDeclaration(node) &&
        /Props|Centre|Dots|Marker|Network/.test(node.name.text)
      )
        definitions.push(node.getText(ast));
      if (ts.isVariableStatement(node)) {
        for (const d of node.declarationList.declarations)
          if (/DEFAULT|^defaults$/.test(d.name.getText(ast))) definitions.push(d.getText(ast));
      }
      if (
        ts.isFunctionDeclaration(node) &&
        node.name &&
        /SlotMachine|LightShaftText|StarfieldButton|MovingGradientButton|CosmicBG|NeonBorder/.test(
          node.name.text,
        )
      ) {
        const s = node.parameters.map((p) => p.getText(ast)).join(", ");
        definitions.push(`function ${node.name.text}(${s})`);
        if (node.body) {
          for (const statement of node.body.statements.slice(0, 2)) {
            if (ts.isVariableStatement(statement) && statement.getText(ast).includes("= props"))
              definitions.push(statement.getText(ast));
          }
        }
      }
    }
    if (definitions.length)
      text += `\n\`${file}\`\n\n\`\`\`ts\n${definitions.join("\n\n")}\n\`\`\`\n`;
  }
  text += `\n**Editorial overrides:** ${editorialPresets[item.slug] ? "Explicit source props:" : "Section wrapper uses monochrome filtering and palette CSS variables; the original raw section and all of its geometry stay intact."}\n`;
  if (editorialPresets[item.slug])
    text += "\n```json\n" + JSON.stringify(editorialPresets[item.slug], null, 2) + "\n```\n";
}
fs.writeFileSync("docs/inventory.md", text);
console.log(
  "Wrote the 16-item source inventory with exhaustive installed interfaces and defaults.",
);
