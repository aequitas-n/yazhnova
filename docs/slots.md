> Pass 4 supersedes these earlier boundaries: eight pages host the sources, hero-51 opens Services, and shadow-cast opens Work. Services retains the native mask/graph stories; Work retains image-spotlight on an editorial track. Mobile runs live lower-cost presets. Stacked-carousel, native border, fluid-field and spark-lattice remain inactive. See [the current report](pass4/README.md).

# OriginKit integration and slot status

34 of 35 requested sources are downloaded. Every available source has paired playground studies and a score in [component-ratings.md](component-ratings.md). The latest request authorizes integrating the selected components; [production-integration.md](production-integration.md) records the resulting page.

## Live native adapters

| Sources                                                                                       | Production adapter                                                                                                                             |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| single-glossy-sphere, liquid-grid, spark-lattice, data-strings, fluid-field, stacked-carousel | Dynamic renderers and presets in `components/visuals/renderers.tsx` and `lib/visual-presets.ts`; lifecycle/static frames through `LiveVisual`. |
| live-chat, curvedmarquee, image-spotlight, scrambletext, scroll-text-reveal                   | `components/visuals/native-details.tsx`; viewport, intro, visibility and motion gates in `use-motion-surface.ts`.                              |
| glow-border                                                                                   | `components/slots/GlowBorder.tsx`; real native source mounts only on eligible hover/focus.                                                     |

## Current chapter hero update

Hero-44 is installed and composed once per hero on Services, AI Agents, Work, Process, Engage and About. Its real plasma renderer uses the existing lazy renderer and two-context budget. The original glassbound visual stays in the lower AI workflow demo. The earlier curation notes below predate the multi-page and shared-hero updates; see [the current chapter report](chapters/README.md) for current placements and verification. No new unavailable slot was created.

## Earlier integration curation

star-gate, predictive-arc-02, light-bloom, light-cables, aura-cursor and hairline-loader are available and working in the playground. Their former empty wrappers have been removed from page sections. Reasons and scores are in the review; these are curation decisions, not installation failures. network-lines and ocean-swell also remain in the gallery after more suitable sources replaced their production roles.

The 17 unused legacy slot modules remain as inactive compatibility contracts. They are not imported by the website, do not imitate any effect, and no longer claim that their available sources are missing. New integrations use the actual source API rather than their old provisional props.

## One unavailable source

`cloud-sky/03` resolves to the registry slug **cloud-sky-03**. It remains blocked by the OriginKit daily download quota. `components/slots/CloudSky03.tsx` retains `// TODO(originkit:cloud-sky/03)`. It does not render a substitute cloud effect.

When this source is available: install the real code, inspect its props and dependencies, add paired playground captures and inventory data, then assess whether it improves the page. If selected, use the existing native lifecycle policy and capture a genuine static frame. Never add it solely to fill a slot.

No downloaded component was moved to the unavailable list. No additional source repairs were needed for this integration.

## Later additions

Hero-44 and hero-55 were subsequently installed successfully through the CLI. There are now 36 installed sources: the original 34, plus these two additions. Hero-44 supplies the six shared chapter heroes; hero-55 supplies Contact. Both have paired source studies. The earlier 34-of-35 count describes the original batch; cloud-sky/03 remains the only unavailable source from that batch.
