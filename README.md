# Yazhnova — editorial engineering studio

A complete Next.js 15 App Router site for **yazhnova.in**, built with TypeScript, Tailwind CSS v4, Framer Motion, Three.js and actual installed OriginKit source. shadcn/Radix patterns are limited to navigation, accordion, dialog and form primitives. The palette is ink, warm paper and graphite with a single orange accent.

## Run

Use Node.js **22.18+** (Node 24 is supported) and npm.

```sh
npm ci
npm run dev
```

- Website: http://localhost:3000
- Contact: http://localhost:3000/contact
- Chapters: `/services`, `/ai-agents`, `/work`, `/process`, `/engage`, `/about`; concept case studies at `/work/clarity`, `/work/relay`, `/work/forma`.
- 36 paired component studies: http://localhost:3000/playground
- Replay the stone introduction: http://localhost:3000/?intro=replay

For the optimized production preview:

```sh
npm run build
npm start
```

## Download status

36 OriginKit sources are installed: the original 34 downloaded sources plus hero-44 (including all fourteen assets) and hero-55. Only cloud-sky-03 from the original request remains quota-blocked. Review the real sources in the playground and see [download results](docs/downloads.md) and [the shared chapter hero report](docs/chapters/README.md).

## Current concept: From raw stone to signal

The site uses an ink base, signal orange (#FF3B00), selective paper breaths, a tabbed service stage, full-size native scenes and a shared two-WebGL-context budget. Home is a short introduction; dedicated pages hold the full content. Quotes, verified stats, client locations and team data stay empty until real data is supplied. Mobile uses lighter live canvases; reduced motion uses genuine source frames.

Services, AI Agents, Work, Process, Engage and About share the actual hero-44 plasma/hand composition. Chapter-specific typography, native scene poses and word entrances replay on navigation. The original glassbound visual remains in the lower AI demo. Contact uses the actual hero-55 rain street as a full backdrop around the existing enquiry form.

- [Before/after report for every section](docs/cohesion/README.md)
- [Interactive comparison viewer](docs/cohesion/index.html)
- Flags and data: `content/site.ts` (`features`, `testimonials.items`, `proof.stats`, `proof.locations`)

## Review the work

- [Shared hero-44 chapters](docs/chapters/README.md): current hero composition, page-change motion, desktop/phone captures and validation. [Screenshot gallery](docs/chapters/index.html).
- [Pass 4 pages and mobile motion](docs/pass4/README.md): all page heroes, touch viewport captures, source quality controls and FPS observations. [Screenshot viewer](docs/pass4/index.html).
- [Pass 3 service stories and editorial Work](docs/pass3/README.md): six mid-sequence screenshots, final frames, source extensions and the new horizontal track.
- [Source inventory](docs/inventory.md): the original 34 studies plus hero-44 and hero-55, signature elements, props, interaction and performance notes.
- [Design plan](docs/plan.md): palette, type, grid, motion and the actual source combinations for every section.
- [36 playground screenshots](docs/shots): default and editorial versions side by side.
- [Minimal source fixes](docs/fixes.md): exact corrections and their effects.
- [Component ratings](docs/component-ratings.md): the original 34-source review and the hero-44/hero-55 additions.
- [Integration and slot status](docs/slots.md): live adapters, retired wrappers and the one unavailable source.
- [Verification results](docs/verification.md): production build, browser checks, Lighthouse scores and launch configuration.
- [Stone introduction](docs/intro.md): choreography, optional source controls, skipping and replay.
- `docs/playground-results.json`: observed canvas contexts and runtime results.
- `docs/visual-frame-results.json`: genuine production visual/frame captures.

The original pre-change source hashes for the initial downloads are in `docs/originkit-source-manifest.json`. Source repairs and intentional composition controls are documented in `fixes.md`. Original geometry and native renderers are retained; the catalogue now includes hero-44. No downloaded source was moved to the unavailable list.

## Edit

- `content/site.ts`: all authored marketing copy, project concepts, labels, FAQs, contact messages and demo text.
- `components/sections/*`: composed homepage sections.
- `components/intro/*`: the desktop stone introduction, timeline and lifecycle gate.
- `components/originkit/*`: installed library sources, with documented repairs and optional intro controls.
- `components/visuals/*` and `lib/visual-presets.ts`: dynamic imports, real-source presets and responsive rendering policy.
- `components/slots/*`: the live native border adapter, the unavailable cloud TODO and inactive compatibility adapters.
- `app/site.css`: the editorial brand and responsive layout.

The agent transcript and service stories are demonstrations, not connected CRM/calendar integrations. Work panels are clearly labeled Concept. Quotes, verified company stats and client locations are empty and feature-gated. Review the company contact details and commercial FAQ wording before publishing.

## Contact delivery

Copy `.env.example` to `.env.local`, configure these variables, and restart the server:

| Variable               | Purpose                                                      |
| ---------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Canonical production origin; defaults to https://yazhnova.in |
| `RESEND_API_KEY`       | Server-side Resend key                                       |
| `RESEND_FROM`          | Sender on a domain verified with Resend                      |
| `CONTACT_TO`           | Destination for project enquiries                            |

The Next.js Node handler validates the request with Zod and sends plain-text email with the visitor as `replyTo`. It checks origins and body size, includes a honeypot, and applies best-effort per-instance throttling. It returns an honest configuration/delivery error instead of claiming success when mail cannot be sent. The in-memory limit is not distributed across Vercel instances.

## Rendering and motion

`LiveVisual` imports actual sources while visible and motion is allowed, including mobile and coarse pointers. Leaving the viewport or hiding the tab unmounts the renderer, invokes cleanup and releases its context. Reduced motion uses PNG frames captured from the same real sources. Mobile DPR, resolution and density controls live in `lib/canvas-quality.ts` and `lib/mobile-visual-presets.ts`; the stone intro runs a shorter 2.1-second choreography on mobile. Canvas editor minimum dimensions are overridden through style props, never by recreating their visuals.

Self-hosted Instrument Serif, Inter Tight and Geist Mono are used for production. Inter Tight's existing weights share one variable font file. The original source demos may load their own fonts or sample assets; those dependencies remain isolated to the playground.

The original Latin font files and licenses are in `public/fonts`; `node scripts/prepare-fonts.mjs` can recopy them from the installed Fontsource packages. Each face has one URL and the two headline faces are preloaded. Fallback images load near the viewport; the hero and contact backgrounds are present in the initial HTML with high fetch priority.

## Verification and captures

Against a running production preview:

```sh
npm run typecheck
npm run test:e2e
npm run audit
npm run capture:studies
npm run capture:frames
npm run capture:chapters
```

Browser checks cover real WebGL/Canvas contexts, mobile and reduced-motion frames, chapter transitions and back navigation, project routes, agent replay, accordion, form validation and mocked success, API failure cases, SEO endpoints, 35 source screenshots and 19 slot files. Tests do not send real email. Set `TEST_CONTACT_UNCONFIGURED=1` only against an unconfigured server to test its 503 response.

Chrome must be installed for browser captures and Lighthouse. Set `CHROME_PATH` for the audit if auto-detection is unavailable. Browser evidence and Lighthouse JSON/HTML reports go into ignored `artifacts/`.

After regenerating frames, restart a production preview: Next.js enumerates public assets at startup. The checked-in frames are already ready for a normal build/deploy. `npm run inventory` regenerates the source API inventory; its prose and source defaults are kept together.

## Vercel

Import the repository as a Next.js project, use `npm run build`, and configure the environment variables above in Vercel. Add `yazhnova.in` in the domain settings when ready. Static export is not used because the contact endpoint requires a server runtime. Browser capture scripts are local QA utilities, not deployment build steps.

Metadata, canonicals, the generated OpenGraph image, Organization JSON-LD, sitemap, robots and icon are included. Playground routes are noindex and excluded from the sitemap.
