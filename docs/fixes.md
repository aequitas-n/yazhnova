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

## Pass 3: requested story inputs

These are intentional, optional feature extensions for the service narratives, rather than type repairs. The sources retain their original behavior when the new prop is absent. No downloaded component failed or moved to the unavailable list.

| Source              | Opt-in input                    | How production uses the real source                                                                                                                                                                                                                             |
| ------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dithered-pixel-grid | `composition: RasterStoryInput` | The source samples a changing website/app canvas into its native pixel cells, assembles deterministic noise into the mask, and resolves to the UI surface. Native pointer ripples displace the mask and the final image strips. Used for Web, Mobile and UI-UX. |
| liquid-grid         | `composition: RasterStoryInput` | The existing ripple simulation warps strips of the dashboard canvas. The input animates chart growth, a line graph, KPI emphasis and three tenant workspaces. No extra effect canvas is layered behind a DOM dashboard.                                         |
| network-lines       | `graph: ArchitectureGraph`      | Supplied normalized nodes and edges replace the random topology. The original GL buffers, point sprites and line renderer show those connections, hover emphasis and a travelling request/return point. Without `graph`, the original random network remains.   |

`lib/service-story-types.ts` defines the shared ref shapes; its imports into the raw components are type-only. `lib/service-story-canvas.ts` paints the requested interface masks; it is ordinary illustrative product UI, not a replacement shader or effect. The Agentic AI composition uses the unmodified installed glossy-sphere source, with labelled tool chips, a thinking deformation of the native surface wrapper and task cards.

The first source-ready frame starts a 5.6-second clock. Time stops off-screen and while the document is hidden. Replay resets the narrative without allocating another renderer. Agent tasks cycle after a four-second idle; the Cloud request path continues slowly in idle. Mobile and reduced motion show genuine final scene captures. All live sources continue to use the shared two-context budget.

The Work section no longer mounts stacked-carousel or shadow-cast. Its native image-spotlight overlays use the existing captured concept interfaces. Navigation now explicitly shares transparent hover/active backgrounds with a signal-orange underline.

See [the screenshots and verification report](pass3/README.md).

## Pass 4: mobile eligibility, source quality and routing

The new brief supersedes the former mobile-static policy. `useMotionSurface`, `LiveVisual` and the intro now gate on reduced motion rather than screen width or fine-pointer capability. The CSS rule hiding the intro on mobile/coarse pointers is removed. Time-driven native animation starts without hover, passive touch coordinates feed existing mouse-based handlers, and Cloud tooltips also respond to taps. The existing viewport/document-visibility lifecycle and two-WebGL-context leases remain.

Seventeen installed source files now import `canvasPixelRatio()` from `lib/canvas-quality.ts`: hero-40/dither-reveal, hero-51/grin-iris, dithered-pixel-grid, liquid-grid, network-lines, light-cables, glassbound, single-glossy-sphere, shadow-cast, star-gate, ocean-swell, rain-puddle, paperline-archive, data-strings, beyond-horizon, footer-03/light-shaft-text and features-02/globe. This caps mobile/coarse-pointer DPR at 1 and retains the original cap on desktop. It does not replace geometry, shader code, simulation or rendering. The intro's native low-quality setting already caps at 1. The globe is now capped at DPR 1 after its 1.5-DPR sample left little margin above the 30 fps target. The mobile footer measures its heading font to fit the full brand within the phone width and uses a 220px canvas, fixing desktop-size glyph cropping.

`lib/mobile-visual-presets.ts` contains adapter-level cost controls for resolution, raymarch steps, cells, strands, cable count, network density and gate levels. The intro uses 8 native shards and 8 debris pieces on mobile and runs its existing choreography at approximately 2.1 seconds. The detailed source-by-source controls and measured browser results are in [the Pass 4 report](pass4/README.md).

The homepage is shortened and supporting sections move to their dedicated routes. Work's case dialogs become actual case-study routes. A legacy aspect ratio on the new featured-image placement briefly widened the intro's mobile viewport; explicit width bounds and resetting that ratio fix the source of the overflow. Small paper labels gain sufficient contrast, and the hero baseline is placed above the horizon. The route wipe is suppressed for reduced motion and no JavaScript. No component was moved to an unavailable slot.

The first live-mobile load audit exposed synchronous shader compilation in the stone and ocean. Their native scene/material programs now warm before the first draw through `lib/warm-renderer.ts`. The helper queues the same compilation in small jobs and polls `KHR_parallel_shader_compile` completion where supported, then starts the existing animation loop. Cleanup cancels pending jobs and polling before disposing the source; a browser regression test deliberately holds compilation pending, presses Skip and verifies that the canvas cannot return. The shader text, geometry and render sequence are unchanged. Drivers without parallel compilation still use their available compile path; this is not a promise of uniform cold-start timing across devices.

## Intro opening quality and focus cleanup

The intro no longer crossfades a captured PNG to a renderer forced to low quality. It presents the native 3D scene from its first ready frame and retains high quality on desktop and medium quality on mobile (DPR caps 2 and 1.5). Geometry, materials, shader warmup and fracture physics remain native. The visible Skip button and its styles are removed; Escape and error/watchdog recovery still release the page. Focus now starts on the dialog, and outlines are suppressed only on that noninteractive dialog and the hero heading to prevent an orange box after the handoff. Interactive keyboard focus styles remain. No component was moved to an unavailable slot. See [intro.md](intro.md).

## Manifesto newspaper legibility

The production newspaper uses wider columns, body type approximately three times its former size, larger article headings and masthead, and a stronger paper-on-ink contrast. A directional mask keeps the newspaper clearer on the right and fades it beneath the main slogan and closing paragraph. The live canvas renders at up to DPR 2 on desktop and 1.5 on mobile; the reduced-motion capture is regenerated at high resolution and served at full viewport width with higher image quality.

The installed `paperline-archive` source accepts an optional `editorial` input (authored articles, badges and edition labels) plus `advanced.headlineSize` and `advanced.pixelRatio`. Articles use its existing column geometry, serif typography, canvas and cached paper rendering. Without these inputs the original generated layout remains unchanged. Production copy lives in `site.manifesto.newspaper`. No component was replaced or moved to an unavailable slot.

Verified with a production build, desktop/mobile captures and a reduced-motion browser check. The live newspaper uses 13.1px body text at 1600px wide and 11.1px on the 390px mobile viewport, instead of roughly 4px text. The mobile canvas runs at 1.5 DPR. All three capture modes reported no console errors or horizontal overflow; the reduced-motion regression test passed.

## Hero hand framing

The desktop dither image now uses a 69% vertical focal point, lifting the complete left palm above the horizon transition instead of clipping it at the bottom of the hero. The reduced-motion image uses the same object position, and the orange signal marker follows the new fingertip position. Phones use a contained composition in both the live canvas and static fallback so the complete pair fits the viewport.

The native hero-40 `dither-reveal` contain branch inverted the cover sampling axis, which changed the image proportions. It now expands the correct UV axis for letterboxing; the cover branch, original image, dither shader and pointer interaction remain in place. No image was regenerated and no component was replaced or moved to a slot.

Browser captures at 1920x1080, 1440x900, 1366x768 and 390x844 verified that the left wrist clears the horizon, with no horizontal overflow. The reduced-motion crop was also checked. The mobile review exposed an existing invalid paragraph/div nesting in the native scramble label; its adapter now requests the source's supported `div` tag, removing that development warning without changing its animation. All five capture modes then reported no console errors, and TypeScript passed.

## Shared chapter heroes: hero-44

The real hero-44 package and all fourteen assets were installed through the CLI. The entry forwards props and the section accepts optional content/artwork slots, retaining its original study. All six main chapter heroes now compose the native plasma mesh, hand, mist and ridge, with self-hosted studio typography and ink/paper/orange colors. The lower AI glassbound/chat composition is retained once; glassbound is no longer used in that hero.

The plasma source adds opt-in initial rotation and highlight color, honors a transparent host, uses the shared capped DPR helper and deletes its native shaders, buffers and program on disposal. The existing LiveVisual lifecycle supplies lazy mounting, hidden-tab/viewport retirement and the two-context ceiling. Mobile density is 48 rather than 88; reduced motion uses a transparent capture of the real canvas. No renderer or geometry was recreated, and no source failed or moved into an unavailable slot.

Chapter poses, terms and layout choices are centralized in `content/site.ts`; page entrances use Framer Motion word reveals and an ink wipe with an orange seam. Initial SSR text stays visible without JavaScript. Native images use Next Image; the large mist image is preloaded because it is the hero's largest paint candidate. External font imports added by the CLI were removed to retain the existing self-hosted fonts.

The production build, TypeScript and all 24 browser tests passed. The source study renders two genuine native canvases (default/editorial), and eighteen responsive production captures show one canvas per hero with no console errors, clipped titles/actions or horizontal overflow. Full screenshots and measured results are in [the chapter hero report](chapters/README.md).

Production imports the native SectionHero directly so the prototype stylesheet does not block rendering. Its new slots have an explicit `SectionHeroProps` type, correcting TypeScript's inference of the optional inputs without altering the visuals. The plasma fallback remains in the initial HTML for reduced motion/no JavaScript, but its 177 KB optimized bitmap is no longer preloaded ahead of the live scene and fonts. Final mobile Lighthouse checks score Services 93 and Work 92 for performance, both with 100 accessibility/best-practices/SEO; all four shared-hero regression tests passed again after these loading changes.

## Contact hero: real hero-55

Installed hero-55 through the OriginKit CLI, including its native WebGL rain street. Added optional typed content/artwork slots to the original section, preserving its default study. Production uses that section and the native rain renderer with the existing RHF/Zod form and Resend route unchanged. Removed the downloaded Google font import in favor of the existing self-hosted brand fonts.

Optional highlightColor, cursorColor and colorToning controls separate the neutral wet street from the orange pointer light without replacing the shader. Defaults retain the original appearance. Optional pixelRatio caps the actual drawing buffer (desktop 1, touch 0.75); touch also reduces ripples/streaks. GPU buffers, program and shader resources are deleted on cleanup. The shared visibility/context budget unmounts it off-screen; reduced motion uses a frame captured from the real renderer. No source failures or moved components.

Review: [Contact captures and checks](contact-hero55/README.md).

The Contact mobile Lighthouse run initially exposed a synchronous shader-status query during hydration (78 performance, 640 ms TBT). The native rain renderer now queues compilation/linking, polls KHR_parallel_shader_compile completion before querying link status and obtaining uniforms, and cancels warmup on disposal. No shader algorithm changed. The subsequent audit scored 94 performance with 80 ms TBT. A browser regression test holds compilation pending, scrolls the scene away, releases it, and returns to the hero.

## Home hero: room for the right hand

Added an opt-in rightOffsetY input (default 0) to hero-40's real image shader. The Home preset offsets only the right subject by 7% of the source image height, blending through the empty gap between hands. The existing left-palm crop, image scale and native dither/pointer behavior remain intact. This uses the open lower-right space without pushing the left hand below the hero or adding a canvas. The fingertip signal follows the revised midpoint; reduced-motion frames were recaptured from the same renderer. Original component defaults remain unchanged.

## Full-screen manifesto and restored live text

The Home overrides had reduced the manifesto to 65svh and its headline to 6vw. The production paperline preset also supplied an empty text string and speed 0, so only a static DOM statement remained. The section now fills 100svh, with a single full-size paperline canvas and a much larger orange statement.

The original paperline letter scheduling, easing, hold, staggered fade and loop now drive the headline. Optional typeface controls let that same native painting pipeline use measured Inter Tight glyphs instead of the source's marker alphabet. paperOpacity controls only the baked newspaper, preserving full-strength orange ink; playFromStart begins the first draw on entry; advanced.textBottom reserves the closing-copy area. Defaults retain the original study behavior.

The native masthead sits below the sticky navigation; section labels now live in the actual newspaper issue line instead of overlapping its articles. The accessible H2 remains in HTML. Reduced-motion/no-JavaScript frames are genuine native captures, with an additional portrait frame selected only for this section. Desktop and mobile browser tests sample orange canvas pixels through paint, fade and repeat, and verify off-screen disposal.

[Full-screen manifesto review](manifesto/README.md).

## Mobile Home typography and hand loading

The mobile Home layout combined a fixed 100svh height with an absolutely positioned baseline and a second decorative caption. With the browser chrome reducing available height, these collided with the actions and closing note. The Home mobile override now uses a minimum height and normal content flow, smaller responsive headline type, wrapping actions, explicit vertical spacing and one baseline. Decorative duplicate captions are omitted on phones. The hand/signal position follows the space after the three headline lines instead of the viewport center. Root text-size-adjust is 100% to prevent browser text inflation; pinch zoom remains available.

The live texture previously loaded a 1,043,155-byte PNG after hydration, while LiveVisual removed/hid the initial preview as soon as motion was allowed. A visually equivalent full-dimension WebP is 20,192 bytes (98% smaller) and preloads from the Home server render with matching CORS mode. The native dither source accepts an optional onReady callback, raised only after texture upload and the first actual draw, and avoids drawing its placeholder texture. Home keeps the real captured preview visible until that signal, then continues with the same live native animation. A failed or delayed texture can no longer expose a blank hand backdrop. Other source defaults and their renderer layout are preserved.

[Responsive captures and delayed-resource checks](mobile-home/README.md).

## Landscape hands with a persistent live stone

The Home hero now imports the real standalone ui/dither-reveal.tsx through the native renderer registry, replacing the hero-40 companion. A new wide photographic asset keeps hands reaching from opposite sides, leaving the center for an actual hero-69 stone. Typography is above the visual and supporting copy/actions below. The former dot and third WebGL horizon are removed from this composition; there are two live contexts.

Standalone dither-reveal receives optional darkColor/lightColor/monochrome controls, an onReady callback after the first textured draw, the shared mobile DPR cap and the previously verified contain-UV correction. Its actual dither, wave and pointer algorithms remain in use. Original default colors remain black/white. EmberHusk receives an optional transparent flag: alpha-enabled output, hidden background quad, and the base scene alpha in its final composite. The default intro remains opaque. This prevents a rectangle obscuring the hands while retaining the source's genuine geometry and orange veins.

The stone uses the same source as the intro, persists after the intro is dismissed, and pauses/disposes with the existing visibility/context budget. Both live surfaces retain genuine native loading captures. The source retry requested in this turn returned a signed-out CLI error; the already installed genuine standalone source was used. No component was faked or moved to a failure slot.

[Composition review](hands-stone/README.md) ? [Image asset and exact edit prompt](hands-stone/asset.md).

## Diagonal hands reference refinement

Replaced the earlier level-hand photograph with a new imagegen edit of the supplied reference: left palm lower and open upward; right hand higher, reaching down. The image contains no stone, particles or dither. The standalone native dither shader still generates the actual effect. The live hero-69 stone is enlarged through its size input (1.8 to 4.5) and a wider responsive canvas; it remains separate real geometry. A taller full-bleed stage preserves both palms and every fingertip.

Static captures were regenerated for this exact pose and scale. EmberHusk now marks its actual first rendered frame with a data-native-ready attribute. The capture helper waits for that frame, captures the continuously rendered transparent canvas, and rejects an image without visible alpha before generating the WebP. This corrects the empty-buffer capture found during the refinement and protects the reduced-motion/loading stone preview. Source visuals and the intro's behavior are unchanged by this diagnostic attribute.

[Reference refinement review](hands-stone/diagonal/README.md) ? [New image asset and prompt](hands-stone/diagonal/asset.md).

The diagonal hand preview's three-color PNG is now palette-packed to 19,386 bytes; an exact raw-pixel comparison verified no visual change. The live texture still preloads, at lower priority than fonts/the visible preview. This removed the load competition exposed by the enlarged composition; the final mobile Lighthouse run scored 91 with CLS 0.

## Quieter manifesto typography

Reduced the native orange statement's size cap from 360 to 300 and its text-area bottom from 80% to 74%, giving a modest reduction on height-constrained desktop layouts. Touch uses a 64px cap. The newspaper layer opacity is reduced from 38% to 12%; the orange text and closing HTML copy retain their full contrast. The original letter paint/hold/fade/repeat sequence is unchanged. Source-captured desktop and portrait frames were regenerated with refreshed cache keys.


## Ridge footer ? 28 October 2026

- Installed the genuine `ridge-parallax` source through the CLI; no install failures or moved components. Kept native geometry, shader noise, scroll travel and drift.
- Wired its three palette props to ink, warm grey and signal orange; added desktop and lighter touch presets. Replaced the footer rain backdrop, retaining links and the genuine footer-03 wordmark. Lighten blending lets the existing wordmark sit above the ridge landscape without a black rectangular cut.
- Two minimal integration changes to the source: use the shared DPR helper (desktop cap 1.5, touch 1), and release both GPU buffers, attached shaders and the program during native effect cleanup. Existing LiveVisual handles visibility, reduced motion and the two-context budget.
- Added source/playground registration and a real renderer capture for reduced motion. See [footer review](footer-ridge/README.md) for validation and screenshots.


## Continuous intro-to-hero stone ? 28 October 2026

Removed the final burst and expanding radial mask. HomeStone now owns one stable portal surface that is temporarily mounted inside the intro, then moved into the hero slot without replacing the WebGL canvas, geometry or material. The same LiveVisual budget/visibility policy still governs it. The hands may start during docking while the opaque ink layer fades.

EmberHusk receives three optional choreography fields: camera `size` for the smooth framing change, debris `spread` to ease into the home orbit, and `idle` to resume the original hover physics/rotation from the final intro pose. Existing source defaults stay unchanged. The intro frame uses a constant square canvas and CSS transforms, avoiding render-target allocations every animation frame. Its final move triggers one resize into the hero dimensions.

Fixed a positioning issue found during visual review: the GSAP `inset` shorthand was clearing the explicitly set opening coordinates. The opening now stays centered, covered by a browser assertion. Seven focused browser checks and the production build pass; see [continuity report](intro-continuity/README.md).


## Homepage viewport fit ? 28 October 2026

Desktop uses a `100svh` flex layout. The original hand texture is now recomposed in one native DitherReveal canvas using an opt-in `panoramicHands` flag: two proportional samples place the left hand lower and right hand higher, each anchored to its corresponding screen edge. Sampling retains the actual forearms without stretching edge pixels. The stone scales from the available stage height and the same measured destination drives the continuous intro. Supporting copy, actions and baseline remain visible within the desktop viewport. The flag defaults off and is disabled in the mobile preset. Responsive native frame captures match the wide, standard, short and portrait compositions during loading/reduced motion. See [viewport captures and measurements](hero-viewport/README.md).


## Hero hand heights and copy placement - 28 October 2026

Moved the desktop support row (description, project buttons and note) beneath the headline, above the visual. The native left-hand anchor and right-hand anchor are adjusted independently to place the palm lower on the page and lift the right fingers. The stone is centered slightly higher within the remaining stage and the intro still follows its measured slot. The original texture, proportional scaling, full screen-edge entry and single-view desktop height are preserved. Mobile keeps its existing reading order. Native static captures were refreshed for the new offsets and available stage heights. See [viewport review](hero-viewport/README.md).


## Hand overflow and bottom actions - 28 October 2026

Separated the description from the action group: description stays below the headline, while project buttons and note return to the bottom right. Desktop drawing now extends 280px above and below the logical artwork stage. The native optional `verticalBleed` control adjusts the logical UV/aspect and pointer coordinates to match that extra drawing area; transparent paper pixels prevent a rectangular background. CSS overflow alone would still clip at the framebuffer, so the actual renderer and native static frames are expanded. Mobile remains at zero bleed, and touch tablets retain the desktop composition with lighter rendering controls.

Lowered only the left-hand sample after the right-hand position was approved; the right anchor stays fixed. Refreshed transparent native captures and viewport reports. The existing intro canvas continuity and two-context budget remain active. Production build, TypeScript and thirteen focused browser checks pass for the layout/overflow integration; final left-hand captures are free of console errors and horizontal overflow. See [viewport review](hero-viewport/README.md).


## Practice height and phone distortion - 28 October 2026

Restored a generous desktop Practice stage (`max(80svh, 760px)`) on Home and Services, plus a 560px minimum visual on phones. The Mobile story was stretching a 390x760 raster into independently sized width/height; its native surface and reduced-motion frame now share a 390:760 aspect ratio and scale to the available scene. The frame shadow stays outside the viewport so shell thickness cannot alter the screen proportions.

Regenerated the phone-only reduced-motion capture from the actual pixel-grid renderer and updated the capture helper. No native effect, sequence or visual algorithm was replaced. Before/after screenshots, mobile/static previews and measured geometry are in [the Practice report](practice-height/README.md). Production build, TypeScript and three relevant browser tests pass.


## Lower left hand and enlarge the stone - 28 October 2026

Lowered only the native left-hand anchor further toward the bottom, keeping the approved right-hand anchor fixed. Enlarged the desktop stone container to `min(40vw, 120cqh, 760px)` so it occupies the extra space between the hands. The continuous intro still measures and follows that container, preserving the same native canvas. Phone sizing is unchanged.

Regenerated native hand previews and an 800x800 transparent stone frame, then refreshed viewport screenshots. Production build and three focused intro/stone browser checks pass. See [updated preview](hero-viewport/1880x900-live.png).

## Stone-to-hands responsive ratio - 28 October 2026

Replaced the height-driven stone sizing with a shared image-relative rule. The stone canvas cannot exceed 27% of the rendered hand texture width, calculated from the native shader's cover fit (1586:992), with an additional 760px ceiling. At 1920px wide, its canvas stays 518.39px at viewport heights of 720, 900 and 1080px. This removes the disproportionate growth on taller screens while preserving the hand anchors and continuous intro docking.

Loading/reduced-motion previews use the same hand scale; desktop portrait previews account for their captured bleed instead of independently fitting the full expanded bitmap. The original renderer, animation and geometry remain unchanged. Eleven viewport captures verify live/static ratios, both screen-edge hands, desktop viewport height, and no horizontal overflow or console errors. All thirteen existing intro/hands/mobile browser checks pass. See [ratio measurements and previews](hero-viewport/README.md).

## Full-viewport intro shard space - 28 October 2026

Removed the inner square WebGL boundary by making the intro render target viewport-sized. The source hero-69 renderer accepts an optional `viewportFraming` choreography flag, extending the camera view while preserving the existing stone scale and perspective. Fragment geometry, physics, timing and reformation are unchanged; shards can now continue to the screen edges. The same canvas docks into the responsive hero slot, with one resize on arrival.

Desktop and mobile captures verify real shard pixels outside the former square, full-screen canvas bounds, continued canvas identity and no console/page errors. TypeScript, seven existing intro/hands browser tests and the production build pass. See [before/after images and measurements](intro-space/README.md).

## Mobile service story aspect ratios - 28 October 2026

The Web, SaaS and UI/UX source canvases are designed at 1000x760 but were being drawn into independently sized portrait stages. Their genuine native surfaces now fit a centered 1000:760 board and scale uniformly within the available space. The agent core uses a square surface and a uniform thinking pulse instead of opposing horizontal/vertical scale factors. Phone and Cloud layouts retain their existing behavior.

Regenerated genuine story frames at the correct proportions, refreshed their cache key, and updated the capture helper to crop the landscape board. Native/static screenshots, aspect and bitmap scaling checks, story progression/replay/pausing tests, TypeScript and the production build pass. See [before/after review](story-proportions/README.md). No source component or animation was replaced.

## Pass 5 — Performance

Implemented the shared two-slot heavy visual governor, idle/paint-first startup, device tiers, 60/30fps frame scheduling, native disposal, exclusive footer scheduling, image variants/caching, lazy validation and desktop-only Work motion loading. Every component is retained and mobile animation stays live. Home initial JS is 211 → 158 KB; Contact is 201 → 150 KB. The native contact poster is 18 KB, and the 77 optimized variants total 3.36 MB versus 26.34 MB for their PNG inputs.

Final Lighthouse mobile scores: / 92, /contact 95, /services 91, /ai-agents 91, /work 91, /process 92, /engage 91, /about 92. Home TBT 79ms; Contact TBT 29ms. Mobile LCP under 2.5s remains unmet; any other failed threshold is listed in [the target checks](performance/summary.json). Desktop Home/Contact scores: / 100, /contact 100.

The supplied baseline and controlled local before/after results are both documented in [the full report](performance/README.md). Twenty-two relevant browser checks, additional mobile chapter checks, TypeScript and the production build pass. Profiles record about 60fps desktop / 30fps mobile, at most two heavy canvases and live WebGL contexts, no leaked contexts after navigation/teardown, no multi-second long tasks, and proper hidden-tab pause/resume. Chrome emulation measurements do not claim physical-device certification. No failed source components or slots were added.
