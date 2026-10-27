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
