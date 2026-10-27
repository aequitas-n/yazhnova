# Current production compositions

Captured from the optimized local production build using actual native sources. The screenshot tool checks that the source chat, SVG marquee, scroll reveal, spotlight and hover border render, and records console errors in [production-review-results.json](../../production-review-results.json). Canvas types and mobile fallback behavior are also covered by the Playwright suite.

| Section | Screenshot |
| --- | --- |
| Approved reaching-hands hero + native scramble eyebrow | [hero.png](hero.png) |
| Pixel grid, liquid grid and glossy sphere | [services.png](services.png) |
| Glassbound + native workflow chat | [agents.png](agents.png) |
| Subtle spark lattice behind process steps | [process.png](process.png) |
| Native curved text + data strings | [technology.png](technology.png) |
| Project spotlight, real WebGL deck and shadow-cast | [work.png](work.png) |
| Fluid-field behind the contact layout | [contact.png](contact.png) |

`node scripts/review-integrations.mjs` regenerates these. The fixed navbar is hidden during section-only captures so it does not obscure the section heading. It remains visible in the full contact capture. Scores and decisions for all 34 components are in [the review](../../component-ratings.md); original/editorial source pairs remain in the parent directory.
