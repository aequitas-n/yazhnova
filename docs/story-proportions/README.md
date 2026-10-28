# Service story proportions

Web, SaaS and UI/UX use a 1000 x 760 input canvas. Their live drawing surfaces previously filled the independently sized stage, stretching the artwork vertically on phones. The native surfaces now fit a centered 1000:760 board, limited by whichever stage dimension runs out first. The stage remains spacious; artwork scales uniformly with space around it.

The agent core now renders in a square surface. Its thinking pulse uses one scale factor for both axes. The shader, orbiting tools, task sequence, touch interaction, replay and off-screen pausing remain active. The phone story retains its existing 390:760 fit; Cloud keeps its responsive architecture layout.

Regenerated the genuine Web, SaaS and UI/UX reduced-motion captures from their actual landscape boards, plus the agent preview. Both frame consumers use a fresh cache key. The capture helper now crops these raster stories to their designed board and accepts `STORY_IDS` for selective capture.

- SaaS: [before](saas-before.png), [390px](saas-390.png), [412px](saas-412.png), [desktop](saas-1440.png), [reduced motion](saas-static.png)
- UI/UX: [before](design-before.png), [390px](design-390.png), [412px](design-412.png), [desktop](design-1440.png), [reduced motion](design-static.png)
- Agent core: [before](ai-before.png), [390px](ai-390.png), [412px](ai-412.png), [desktop](ai-1440.png)
- [Measured native canvas dimensions](results.json)

At 390px wide the landscape board is 390 x 296.39 CSS pixels; at 412px it is 412 x 313.11. Its ratio remains 1000:760, independent of stage height. Four browser checks cover all five fixed-proportion stories at mobile/desktop sizes, equal bitmap/display pixel scaling, uniform agent scaling, correct static source proportions, story progression, replay, pausing, Cloud tooltips and reduced motion. TypeScript and the production build pass. Fifteen native/static screenshots have no console/page errors.

Reproduce with `node scripts/capture-story-proportions.mjs` and `npx playwright test tests/story-proportions.spec.ts`. The report uses Chrome mobile emulation at 390 x 844 and 412 x 915, plus desktop at 1440 x 1000.
