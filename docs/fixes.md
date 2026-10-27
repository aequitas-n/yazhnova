# OriginKit integration fixes

The user's updated rule permits minimal type/lint corrections without changing component visuals or behavior. These corrections preserve original visuals. The later stone-intro request also authorizes the opt-in choreography extension described below. The pre-change hashes are recorded in `originkit-source-manifest.json`.

| Component           | Issue                                                                                | Minimal correction                                                                  | Behavioral effect                                                            |
| ------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| dithered-pixel-grid | Default `pattern` widened to `string`                                                | Add `as const` to the existing `"artwork"` literal                                  | None                                                                         |
| dithered-pixel-grid | Shipped advanced preset includes `hover`, omitted from its interface                 | Add optional numeric `hover` to the interface                                       | None; type only                                                              |
| dithered-pixel-grid | Unused Framer control-definition helper references undeclared `ControlType`          | Add a type-only ambient declaration for its `Number` property                       | None; declaration is erased and the helper is never invoked by the component |
| glassbound          | Prop ref inferred optional fields although the component immediately normalizes them | Initialize the ref with the same normalized values already assigned on every render | None; the effect sees the same values                                        |
| paperline-archive   | Existing `alignX` and `alignY` props absent from interface                           | Add optional alignment literal unions matching the existing comparisons             | None; type only                                                              |

Initial form dependency installation encountered an optional-peer conflict in `@hookform/resolvers` 6.x. The compatible 5.x release was installed successfully without force or ignored peer dependencies.

Browser verification: all 16 downloaded items rendered in both original and editorial variants. All 11 production visual adapters rendered genuine canvases without runtime exceptions. No installed component was moved to the unavailable list.

The initial study capture recorded a missing application favicon (404), not a component failure. The app now provides its own icon. The gallery adapters also override editor-specific 1200-by-800 minimum dimensions through the already exposed style prop; source rendering logic is unchanged.

The full-background hero revision also exposed a reduced-motion hydration mismatch in the application's `SectionTitle` wrapper. A deterministic initial motion position now matches server and client markup; reduced-motion CSS and the zero-duration transition still suppress animation. This changes no OriginKit source. The mobile browser check now verifies console errors as well.

## Requested stone-intro extension

`components/originkit/ui/hero-69/ember-husk.tsx` now accepts an optional `choreography` ref (`fracture`, `scale`, `rotation`, `paused`) and `onReady`/`onError` callbacks. The intro drives the existing mesh positions and rotations; it does not replace the stone with CSS, SVG, screenshots or new geometry. All original geometry builders and GLSL remain intact. The captured frame is only a loading fallback.

When choreography is absent, original spring-driven positions, pointer interactions and drift remain active. The default final CTA and playground keep their existing behavior. Controlled frames can pause while the document is hidden, and readiness is reported after the first completed frame. There are now four intentionally changed source files: the three typing repairs above and this explicit feature extension. No installed component was moved to the unavailable list.

The full timing, interaction and fallback policy is documented in [intro.md](intro.md).

## Latest download batch

The newly downloaded `single-glossy-sphere`, `star-gate` and `spark-lattice` sources pass TypeScript and the production build without repairs or extra dependencies. Their original and editorial playground variants all render real canvases without runtime or console errors. No installed component was moved to the unavailable list. The other 16 download attempts returned the account's daily fetch quota; see [downloads.md](downloads.md).

The subsequent retry also downloaded `predictive-arc-02`, `fluid-field` and `light-bloom`. They likewise need no repairs or extra packages; the build and all six new original/editorial canvas renders pass. All previously installed sources remain unchanged. The remaining 13 requests are quota-blocked; no downloaded component was moved to the unavailable list.

The next retry downloaded `light-cables`, `data-strings`, `liquid-grid`, `scrambletext`, `scroll-text-reveal` and `glow-border`. All six need no repairs or additional dependencies. The production build and twelve original/editorial renders pass; the text and border effects correctly use DOM rather than canvases. No component was moved to the unavailable list. Seven downloads remain quota-blocked.

The following retry downloaded `curvedmarquee`, `stacked-carousel` and `image-spotlight`. All three need no source repairs or new packages. The production build and six original/editorial renders pass. The spotlight's provided sample image was copied locally and supplied through the existing image prop, preserving the raw source and the original image content. No component was moved to the unavailable list; four entries remain quota-blocked.

The next retry downloaded `live-chat`, `aura-cursor` and `hairline-loader`. No source repairs or new dependencies were needed. The build and six original/editorial renders pass, including actual pointer-driven GPU output for the cursor. No component was moved to the unavailable list. Only `cloud-sky-03` remains quota-blocked.

## Native composition pass

The 12 newly selected effects required no raw source edits, type repairs or dependency changes. Palette, bounded quality, lifecycle gates, spotlight visibility and hover-only border behavior are adapter-level props/composition. The process background was reduced to 10% opacity after visual review; the bounded glossy sphere uses full source resolution and 64 raymarch steps. The project deck uses captured concept interfaces and a centered 45-degree view. Its transparent live canvas initially exposed a second animation pose from the fallback poster; adapter CSS now hides the poster after the native renderer sets the canvas dimensions. The static poster remains for mobile/reduced motion. Chat fallback spacing matches the real source to limit layout movement when it mounts. All original shaders and geometry remain intact. No installed source moved to the unavailable list.

## Cohesion pass: opt-in source controls

The new brief requires a dark newsprint composition, a local draggable globe and an orange ocean glint. Three installed source files received narrowly scoped, opt-in controls; their original defaults remain intact.

| Source            | Extension                                                                                                                                                                                                                 | Production use                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| paperline-archive | Optional `mastheadFont`, included in the paper cache key; bypass its blackletter font download when overridden. The existing `text` prop is empty to disable hand-drawn glyphs.                                           | Inter Tight masthead/newsprint at 15% opacity under a semantic orange grotesk slogan.              |
| features-02/globe | Optional `landDataUrl`.                                                                                                                                                                                                   | Serve the exact original land dataset locally; preserve native geometry, dots and drag controls.   |
| ocean-swell       | Optional `sunColor`, `sunPositionX` and `sunPositionZ`, retaining the original sun values by default. The existing sun-direction constants is exposed as a uniform; the native ocean and reflection shader remain in use. | The original light is oriented toward the initial camera for an orange reflection beside the form. |

The land GeoJSON is the same dataset requested by the original component: [Natural Earth land dataset mirror](https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json), saved to `public/originkit/features-02/land.json`. Client-location markers remain empty. No replacement effect, shader or geometry was introduced. No downloaded component was moved to the unavailable list.

Adapter fixes include isolating legacy styles in a lower-priority CSS layer, resetting the Tailwind container width limit for the full-width composition, matching the hero backdrop to paper, increasing dark-form border contrast, completing the native string draw before capturing its static frame, and explicitly retiring WebGL contexts when their viewport leases end.
