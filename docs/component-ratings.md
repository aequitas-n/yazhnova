> This rating table records the earlier curation pass. The current composition follows the user's later **From raw stone to signal** brief; see [the cohesion report](cohesion/README.md) for current placements, deliberate exclusions and before/after screenshots.

# OriginKit component review and production choices

Reviewed all 34 downloaded pieces in both their original and editorial presets. The paired screenshots are in [shots](shots/README.md), and every source is individually available at `/playground`. Scores express fit for **this site**, not general component quality: visual fit (40%), ability to explain our work (35%), and runtime/readability cost (25%). Cost estimates describe the actual render technique; they are not benchmark timings.

The page keeps paper, ink, warm grey and a small amber accent. The approved reaching-hands hero and fractured-stone introduction remain the primary moments. Added effects have a specific job, rather than appearing everywhere.

| Component            | Fit /10 | Decision and placement                                                                         | Runtime / reason                                                                                            |
| -------------------- | ------: | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| hero-40              |       9 | Keep its real dither-reveal companion and hands as the full-width hero background.             | WebGL; visually connects human intent and engineering.                                                      |
| hero-51              |       7 | Keep the typographic hierarchy as a composition reference; omit its eye object.                | Layout reference only; another hero object would compete with the hands.                                    |
| hero-69              |      10 | Keep the real EmberHusk in the intro and final CTA.                                            | Three/R3F WebGL2; strongest physical brand moment, already choreographed.                                   |
| hero-28              |       9 | Keep its native GridRails in hero/process.                                                     | DOM rules; strong engineering structure with minimal cost.                                                  |
| features-02          |       7 | Keep hierarchy as a service composition reference; omit globe and unverified numerical claims. | Layout reference only; relevance is stronger than a decorative globe.                                       |
| pricing-04           |       8 | Keep its actual RollingLetters companion and recompose three engagement columns.               | DOM animation; useful comparison structure without prices or cosmic backgrounds.                            |
| footer-03            |       9 | Keep its real light-shaft wordmark with our custom link columns.                               | WebGL2; a strong closing signature, paused outside the viewport.                                            |
| dither-reveal        |       8 | Gallery only as a standalone source. Production uses hero-40's downloaded companion.           | WebGL; duplicating both would add no new meaning.                                                           |
| paperline-archive    |       9 | Keep the real editorial dispatch in the manifesto.                                             | Canvas2D; distinct paper/ink identity.                                                                      |
| dithered-pixel-grid  |       8 | Keep the Web Development mini canvas.                                                          | Canvas2D; a useful interface-to-pixel metaphor.                                                             |
| beyond-horizon       |       8 | Keep one thin monochrome horizon under the hero.                                               | WebGL; a restrained transition, not a second centerpiece.                                                   |
| glassbound           |       9 | Keep the large Agent Core visual alongside the practical agent demo.                           | WebGL2 raymarching; real depth, reduced quality preset.                                                     |
| network-lines        |       7 | Retire from production; retain both playground studies.                                        | WebGL; spark lattice now gives process a more precise rhythm.                                               |
| ocean-swell          |       7 | Retire from contact; retain both playground studies.                                           | WebGL; fluid field is a quieter, more abstract background for the form.                                     |
| rain-puddle          |       8 | Keep the subtle footer surface.                                                                | WebGL; texture stays behind readable solid text areas.                                                      |
| shadow-cast          |       8 | Keep behind the project gallery.                                                               | WebGL; architectural lighting lends the work a physical setting.                                            |
| single-glossy-sphere |       9 | Add the real monochrome sphere to the Agentic AI service.                                      | WebGL2 raymarching; bounded card, 64 steps/full resolution, no iridescence or glow.                         |
| star-gate            |       6 | Gallery only.                                                                                  | Three/WebGL tunnel; conflicts with the approved stone climax.                                               |
| spark-lattice        |       8 | Add native grey sparks to the four-step process background.                                    | WebGL; three slow lights, no glow, paper background.                                                        |
| predictive-arc-02    |       6 | Gallery only. Remove its empty hero wrapper.                                                   | WebGL; duplicates the retained horizon and adds visual noise.                                               |
| fluid-field          |       8 | Add a restrained real shader behind `/contact`.                                                | WebGL; low-opacity grey flow, never over form controls.                                                     |
| light-bloom          |       6 | Gallery only.                                                                                  | WebGL; shafts reduce the crisp editorial contrast near important copy.                                      |
| light-cables         |       6 | Gallery only.                                                                                  | WebGL; redundant with the more readable process lattice.                                                    |
| data-strings         |       8 | Add low-opacity native strings behind the technology strip.                                    | Canvas2D; 240 strands/20 particles, far below source defaults.                                              |
| liquid-grid          |       9 | Add the real responsive liquid grid to SaaS Products.                                          | Canvas2D; a system that responds to interaction, distinct from the web card.                                |
| scrambletext         |       7 | Add to the short hero eyebrow. Preserve the clean semantic H1.                                 | DOM animation; small text, no flickering, no repeated headline scrambling.                                  |
| scroll-text-reveal   |       8 | Add native word reveal to service, agent and contact descriptions.                             | GSAP/DOM; restrained travel, no blur. Rich serif H2 typography keeps its existing motion.                   |
| glow-border          |       7 | Add the real monochrome border only while a project CTA is hovered or focused.                 | DOM/RAF; no continuous idle glow or rainbow colors.                                                         |
| curvedmarquee        |       8 | Add the native shallow text curve to the technology strip.                                     | SVG/RAF; accessible static list remains available; no drag requirement.                                     |
| stacked-carousel     |       8 | Add a supporting real WebGL project deck beside the selected preview.                          | WebGL; textures are our own concept UI captures, not stock imagery. Semantic project controls stay in HTML. |
| image-spotlight      |       8 | Add a mild spotlight over the selected concept preview.                                        | DOM/image; 85% visibility keeps the interface readable before hovering.                                     |
| live-chat            |       9 | Add the actual chat renderer to the illustrative qualification workflow.                       | Framer Motion/DOM; finite stagger, no endless typing; human review and demo disclaimer remain explicit.     |
| aura-cursor          |       4 | Gallery only. Keep the system cursor.                                                          | Full-screen fluid simulation; disproportionate cost and distracts from studio content.                      |
| hairline-loader      |       6 | Gallery only. Keep the approved stone intro as the single introduction.                        | DOM/RAF; another loader would delay access and duplicate the sequence.                                      |

`cloud-sky-03` is not scored: it is the one source not downloaded, because of the OriginKit daily quota. Its TODO slot remains. No installed source was moved to the unavailable list.

## Implementation boundaries

- Canvas integrations use `LiveVisual`, dynamic imports with `ssr:false`, real captured mobile frames, viewport unmounting, tab-visibility pausing and reduced-motion fallback. Intro activity also suspends the page effects.
- Native DOM/SVG adapters use the same desktop/motion/visibility gates and dynamically import the original source only when needed. Semantic copy and project screenshots are present before the native effect loads.
- Native code stays in `components/originkit`; palette, quality, lifecycle and composition live in adapters/presets. No shader, SVG or CSS imitation was substituted.
- The work images capture our existing Clarity, Relay and Forma concept interfaces. They remain explicitly labelled concept work and are not represented as shipped client projects.

See [verification](verification.md) for measured checks and [fixes](fixes.md) for the four previously documented source adjustments. This integration adds no further source edits.

## Shared chapter hero addition: hero-44

**Fit: 9/10.** Selected by the user for Services, AI Agents, Work, Process, Engage and About. The original plasma wire mesh, hand and atmospheric assets supply one consistent visual identity. The native mesh explains the signal motif through motion; per-page typography and initial poses provide variation without adding another effect. Cost is medium at desktop density 88 and lighter at mobile density 48. Raw fixed-coordinate layouts and the default blue palette require an authored responsive composition; the live source, geometry and interactions remain. [Current screenshots and verification](chapters/README.md).

## Added: hero-55 ? 9/10 for Contact

Strong full-page atmosphere with useful pointer interaction; the native rain surface stays behind readable typography and an opaque form. Medium shader cost, reduced through actual drawing-buffer and drop settings on touch. Installed and used on Contact. Both raw and editorial studies render successfully.
