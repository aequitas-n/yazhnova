> The current cohesion pass supersedes these earlier boundaries. Native border, fluid-field and spark-lattice are inactive; network, ocean, cables, globe and tunnel now serve the story. See [the current report](cohesion/README.md).

# OriginKit integration and slot status

34 of 35 requested sources are downloaded. Every available source has paired playground studies and a score in [component-ratings.md](component-ratings.md). The latest request authorizes integrating the selected components; [production-integration.md](production-integration.md) records the resulting page.

## Live native adapters

| Sources                                                                                       | Production adapter                                                                                                                             |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| single-glossy-sphere, liquid-grid, spark-lattice, data-strings, fluid-field, stacked-carousel | Dynamic renderers and presets in `components/visuals/renderers.tsx` and `lib/visual-presets.ts`; lifecycle/static frames through `LiveVisual`. |
| live-chat, curvedmarquee, image-spotlight, scrambletext, scroll-text-reveal                   | `components/visuals/native-details.tsx`; viewport, intro, visibility and motion gates in `use-motion-surface.ts`.                              |
| glow-border                                                                                   | `components/slots/GlowBorder.tsx`; real native source mounts only on eligible hover/focus.                                                     |

## Deliberately excluded from the live page

star-gate, predictive-arc-02, light-bloom, light-cables, aura-cursor and hairline-loader are available and working in the playground. Their former empty wrappers have been removed from page sections. Reasons and scores are in the review; these are curation decisions, not installation failures. network-lines and ocean-swell also remain in the gallery after more suitable sources replaced their production roles.

The 17 unused legacy slot modules remain as inactive compatibility contracts. They are not imported by the website, do not imitate any effect, and no longer claim that their available sources are missing. New integrations use the actual source API rather than their old provisional props.

## One unavailable source

`cloud-sky/03` resolves to the registry slug **cloud-sky-03**. It remains blocked by the OriginKit daily download quota. `components/slots/CloudSky03.tsx` retains `// TODO(originkit:cloud-sky/03)`. It does not render a substitute cloud effect.

When this source is available: install the real code, inspect its props and dependencies, add paired playground captures and inventory data, then assess whether it improves the page. If selected, use the existing native lifecycle policy and capture a genuine static frame. Never add it solely to fill a slot.

No downloaded component was moved to the unavailable list. No additional source repairs were needed for this integration.
