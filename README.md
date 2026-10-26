# Yazhnova

An original, dark marketing site for **yazhnova.in**, built with Next.js 15 App Router, TypeScript, Tailwind CSS 4, shadcn/ui patterns on Radix, and Framer Motion. Designed for Vercel.

## Run locally

Use Node.js **22.18+** (or Node 24) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm start
```

## Edit the site

- `content/site.ts` — all marketing copy, navigation, service lists, FAQs, form labels and messages, concept project copy, and mockup labels.
- `components/sections/*` — one component for each homepage section.
- `components/effects/*` — the horizon, fine network and arc layers, desktop cursor, text effects, and shared lazy canvas renderer.
- `app/globals.css` — the complete brand system and responsive styling.
- `components/contact/contact-form.tsx` and `lib/contact-schema.ts` — accessible React Hook Form + Zod form and shared validation.
- `app/api/contact/route.ts` — server-side Resend delivery.
- `scripts/generate-project-art.mjs` — generates the three original SVG concept mockups from `content/site.ts`. Runs automatically before production builds; use `npm run assets` during development after changing mockup copy.

The brand uses #05060A, #0B0D14, #3B6BFF, #7B5CFF, #6EE7FF, #EDEFF7, and #8A90A6. Fonts are self-hosted Latin Geist and Geist Mono, served with `next/font/local`.

## Enable contact delivery

Copy `.env.example` to `.env.local`, and configure the same variables in Vercel:

| Variable               | Purpose                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL; defaults to `https://yazhnova.in` |
| `RESEND_API_KEY`       | Resend server API key                                       |
| `RESEND_FROM`          | Sender address on a domain verified in Resend               |
| `CONTACT_TO`           | Enquiry recipient                                           |

Restart the server after changing environment variables. The form **does not claim success** if delivery is unconfigured or Resend rejects a request. It shows an actionable email fallback. Email content is sent as plain text, with the visitor's address used only as `replyTo`.

The route validates input on the server, bounds request size, checks browser origins, includes a honeypot, and limits submissions per server instance. The in-memory limit is best-effort on Vercel; use a shared store or Vercel Firewall rules if a distributed limit becomes necessary.

## Content to approve before launch

Search `content/site.ts` for `TODO`. Illustrative company statistics, project concepts and sample testimonials are explicitly labeled on the site. Replace them with verified figures, approved case studies and attributed client quotes. Review contact details and the standard commercial/IP answers before publishing.

The agent workflow is an interactive demonstration: it does not access a CRM or book a real meeting. The project carousel opens real concept detail dialogs.

## Motion and performance

The requested OriginKit source download is blocked by the account's daily quota. The site currently runs on original branded equivalents; see [the source availability record](docs/originkit.md) for the exact status, file mapping, and remaining source integration.

The hero renders with CSS and SVG immediately. Below-the-fold canvases import only near the viewport and stop their animation frame loops off-screen and when the tab is hidden. Rendering is capped at 24 fps and 1.5 device pixel ratio. Reduced motion renders static effects and disables decorative CSS animation. The cursor aura is enabled only for a desktop-style fine pointer.

## Validation

The verified production build passes all 5 browser tests. Mobile Lighthouse: **94 home / 97 contact** for performance, **100** accessibility and SEO, **96** best practices on both. See [validation details and limits](docs/validation.md).

```sh
npm run typecheck
npm run build
# Against a running production server:
npm run test:e2e
npm run audit
```

End-to-end checks cover homepage navigation, FAQs, project carousel and dialogs, the replayable agent demo, form validation and mocked success, API failure paths, mobile layouts down to 320px, reduced motion, axe accessibility, sitemap, robots, the generated OpenGraph image and 404 handling. Tests never deliver a real email. Set `TEST_CONTACT_UNCONFIGURED=1` only against a server with no Resend credentials to additionally verify its unconfigured state. `npm run audit` writes mobile Lighthouse reports into ignored `artifacts/`. Chrome must be installed; set `CHROME_PATH` if automatic detection is unavailable.

## Deploy to Vercel

Import this repository into Vercel as a Next.js project. Use the default build command `npm run build`, configure the environment variables above, and add `yazhnova.in` in the project's domain settings. No static export: the contact route needs the Next.js Node runtime.

SEO includes per-page metadata, canonicals, generated OpenGraph artwork, Organization JSON-LD, `sitemap.xml`, `robots.txt`, and an SVG brand icon.
