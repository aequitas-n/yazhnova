# Practice stage height and phone proportions

Home's Practice stage was reduced to `66svh`. The phone also had an independent fixed width and percentage height, stretching its 390 × 760 screen into a wide, short shape.

The shared desktop stage now has a minimum height of `max(80svh, 760px)`. Home uses the same spacious stage rather than the shorter teaser setting. On small screens the visual is `75svh`, with a 560px minimum.

The real pixel-grid renderer remains inside the phone. Its viewport now retains the original 390:760 aspect ratio, centers in the scene and scales to both the available width and height. The shell is drawn outside that viewport so its thickness does not distort the screen. Animation, pointer ripples, captions and replay remain unchanged.

At 1880 × 900, the Home stage increased from 596px to 762px. The phone's actual screen changed from 294 × 434.625px (ratio 0.676) to 304.5 × 593.375px (ratio 0.513, matching 390:760).

- [Before](before.png) / [after](home-desktop.png)
- [Services desktop](services-desktop.png)
- [Home mobile](home-mobile.png) / [Services mobile](services-mobile.png)
- [Reduced-motion desktop](home-desktop-static.png) / [mobile](home-mobile-static.png)

Reduced motion uses a fresh capture of the genuine phone screen with the same proportional CSS frame, so it is neither cropped nor stretched. The full capture command `npm run capture:stories:frames` now regenerates `public/frames/stories/mobile-phone.png` as well.

[Measured results](results.json) confirm the live canvas and static image both retain the intended aspect ratio, the complete phone fits above the caption, and there is no horizontal overflow or console error on Home and Services at desktop and mobile widths. The production build, TypeScript and three existing browser tests pass; those tests cover all six native service tabs, keyboard navigation, replay, off-screen pausing and reduced motion.
