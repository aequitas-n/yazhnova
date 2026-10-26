# OriginKit source availability

The requested CLI and public “Get this Component → Code → Copy Code” workflows were attempted on 26 October 2026.

1. The CLI initially required login. The public Copy Code fallback did not return source while unauthenticated.
2. After the user authenticated locally, both requested source batches were retried with `--no-deps --path vendor/originkit` so that raw library defaults would remain separate from the branded production components.
3. The account's limit of **3 section fetches and 3 component fetches per day** was reached. The CLI fetches the whole batch before writing files, so neither batch wrote any source. A normal single-component retry was also rejected with the daily-limit message.

No OriginKit source is represented as installed. The production implementation currently uses original code with analogous visual behavior:

| Requested pieces                                                            | Original production implementation                                                                                    |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| hero-28, beyond-horizon, predictive-arc-02, network-lines                   | `sections/hero.tsx`, `effects/horizon.tsx`, and the branded horizon/grid/orbit styles                                 |
| features-02, dithered-pixel-grid, liquid-grid, single-glossy-sphere         | `sections/services.tsx`, shared lazy `effects/ambient-renderer.tsx`, and original browser/product overlays            |
| glassbound, live-chat                                                       | `sections/agents.tsx`, layered glass platforms, and a replayable lead-to-meeting demonstration                        |
| spark-lattice, fluid-field                                                  | `sections/process.tsx` and shared, off-screen-paused canvas modes                                                     |
| curvedmarquee, data-strings                                                 | `sections/tech-stack.tsx`, local SVG technology marks, and decorative SVG data strings                                |
| stacked-carousel, image-spotlight, shadow-cast                              | `sections/case-studies.tsx`, original project artwork, pointer spotlight, backdrop pillars, and accessible dialogs    |
| pricing-04                                                                  | `sections/engagement.tsx`, three original pricing-free engagement cards                                               |
| star-gate, light-bloom                                                      | `sections/final-cta.tsx`, lazy tunnel canvas, and a branded radial bloom                                              |
| footer-03                                                                   | `layout/footer.tsx`, contact block, links, and oversized faded wordmark                                               |
| aura-cursor, hairline-loader, glow-border, scrambletext, scroll-text-reveal | `effects/global-effects.tsx`, `effects/scramble-text.tsx`, `ui/section-heading.tsx`, and shared branded button styles |

Paths in the table are relative to `components/`. Every section combines original layout, brand colors, copy, and multiple visual treatments. No default library demo is shipped. Canvas effects use Canvas 2D, CSS and SVG instead of adding multiple continuously running WebGL contexts.

When the account has sufficient download allowance, fetch individual items into `vendor/originkit`, review their APIs and dependencies, and adapt the desired internals inside the existing production wrappers. `vendor/` is excluded from TypeScript project checks so unused raw demos do not require their entire dependency tree. Never place account credentials or CLI session files in this repository.

```sh
npx originkit@latest login
npx originkit@latest add beyond-horizon --no-deps --path vendor/originkit
```

The complete requested source list:

```text
hero-28 features-02 pricing-04 footer-03
beyond-horizon predictive-arc-02 network-lines glow-border scrambletext
dithered-pixel-grid liquid-grid single-glossy-sphere glassbound live-chat
spark-lattice fluid-field curvedmarquee data-strings
stacked-carousel image-spotlight shadow-cast star-gate light-bloom
aura-cursor hairline-loader scroll-text-reveal
```
