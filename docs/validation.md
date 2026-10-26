# Local validation — 26 October 2026

Validated against the optimized Next.js 15.5.28 production build on local Chrome, with mobile Lighthouse simulation. Scores are local measurements and can vary on deployed infrastructure.

| Check                                                        | Result                                                               |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| `npm run build`                                              | Passed; static homepage/contact/SEO routes, dynamic Node contact API |
| `npm run typecheck`                                          | Passed                                                               |
| Prettier check                                               | Passed                                                               |
| `npm run test:e2e`                                           | 5 of 5 passed                                                        |
| Browser console and page errors during homepage interactions | None                                                                 |
| axe WCAG 2 A/AA and WCAG 2.1 AA checks                       | No violations on tested homepage and contact states                  |

| Mobile Lighthouse       | Home | Contact |
| ----------------------- | ---- | ------- |
| Performance             | 94   | 97      |
| Accessibility           | 100  | 100     |
| Best practices          | 96   | 96      |
| SEO                     | 100  | 100     |
| Cumulative layout shift | 0    | 0       |

Browser checks covered carousel navigation and concept dialogs, escape-to-close and focus handling, FAQ interaction, agent workflow replay, form validation and mocked successful delivery, malformed/oversized/cross-origin API requests, the unconfigured contact response, mobile navigation, 320px and 390px layouts, reduced motion, sitemap, robots, OpenGraph image delivery, and 404 handling. Original service canvases and project imagery were also visually inspected after scrolling into view.

Resend delivery to a real mailbox was not tested because credentials and a verified sender were not supplied. The route returns an honest 503 configuration message in that state. The successful form test mocks the HTTP response and sends no email.

Raw Lighthouse JSON and browser screenshots are in the ignored `artifacts/` directory. The remaining Lighthouse advisory includes small decorative labels and standard framework JavaScript optimization opportunities; all four requested score categories exceed 90.

OriginKit source integration remains blocked by account download limits. See [source availability](originkit.md). The fully functioning site currently uses original branded equivalents.
