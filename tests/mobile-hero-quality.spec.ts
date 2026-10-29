import { test, expect } from "@playwright/test";

for (const width of [390, 412]) {
  test(`${width}px touch keeps the full intro timing and detailed live hero after refresh`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      baseURL: process.env.BASE_URL || "http://localhost:3000",
      viewport: { width, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    try {
      await page.addInitScript(() => {
        const get = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (
          this: HTMLCanvasElement,
          ...args: Parameters<typeof get>
        ) {
          const context = get.apply(this, args);
          if (context && args[0] === "webgl" && !this.dataset.colorCheck) {
            this.dataset.colorCheck = "true";
            const gl = context as WebGLRenderingContext;
            const draw = gl.drawArrays.bind(gl);
            gl.drawArrays = (...values: Parameters<typeof draw>) => {
              draw(...values);
              if (this.closest(".hero-art")) {
                const pixel = new Uint8Array(4);
                gl.readPixels(
                  2,
                  gl.drawingBufferHeight - 3,
                  1,
                  1,
                  gl.RGBA,
                  gl.UNSIGNED_BYTE,
                  pixel,
                );
                this.dataset.backgroundPixel = Array.from(pixel).join(",");
              }
            };
          }
          return context;
        } as typeof get;
        const report = {
          beats: [] as { beat: string; time: number }[],
          done: 0,
          canvas: null as HTMLCanvasElement | null,
        };
        Object.assign(window, { introQuality: report });
        new MutationObserver(() => {
          const intro = document.querySelector<HTMLElement>(".site-intro");
          if (intro && ["playing", "revealing"].includes(intro.dataset.introPhase!)) {
            const beat = intro.dataset.introBeat!;
            if (report.beats.at(-1)?.beat !== beat)
              report.beats.push({ beat, time: performance.now() });
            report.canvas ??= intro.querySelector("canvas");
          } else if (!intro && report.beats.length && !report.done) report.done = performance.now();
        }).observe(document, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ["data-intro-phase", "data-intro-beat"],
        });
      });
      await page.goto("/?intro=replay");
      await expect(page.locator('.site-intro[data-intro-phase="playing"]')).toHaveCount(1, {
        timeout: 20000,
      });
      await expect(page.locator(".site-intro")).toHaveCount(0, { timeout: 12000 });
      await expect(page.locator('.hero-art [data-ready="true"]')).toHaveCount(1, {
        timeout: 15000,
      });
      const timing = await page.evaluate(() => {
        const report = (
          window as unknown as {
            introQuality: {
              beats: { beat: string; time: number }[];
              done: number;
              canvas: HTMLCanvasElement;
            };
          }
        ).introQuality;
        return {
          duration: report.done - report.beats[0].time,
          hold:
            report.beats.find((b) => b.beat === "closing")!.time -
            report.beats.find((b) => b.beat === "wordmark")!.time,
          sameCanvas: report.canvas === document.querySelector(".hero-stone canvas"),
          beats: report.beats.map((b) => b.beat),
        };
      });
      expect(timing.duration).toBeGreaterThan(5000);
      expect(timing.duration).toBeLessThan(7500);
      expect(timing.hold).toBeGreaterThan(700);
      expect(timing.sameCanvas).toBe(true);
      expect(timing.beats).toEqual([
        "formed",
        "opening",
        "wordmark",
        "closing",
        "reformed",
        "docking",
      ]);
      for (let visit = 0; visit < 2; visit++) {
        if (visit) await page.reload();
        await expect(page.locator('.hero-art [data-ready="true"]')).toHaveCount(1, {
          timeout: 15000,
        });
        await expect(page.locator('.hero-stone [data-ready="true"]')).toHaveCount(1);
        const detail = await page.evaluate(() => {
          const hands = document.querySelector<HTMLCanvasElement>(".hero-art canvas")!;
          const stone = document.querySelector<HTMLCanvasElement>(".hero-stone canvas")!;
          const gl = hands.getContext("webgl")!;
          const program = gl.getParameter(gl.CURRENT_PROGRAM);
          return {
            strength: gl.getUniform(program, gl.getUniformLocation(program, "uDitherStrength")!),
            pixelSize: gl.getUniform(program, gl.getUniformLocation(program, "uPixelSize")!),
            dprs: [hands, stone].map((c) => c.width / c.getBoundingClientRect().width),
            canvases: document.querySelectorAll(".hero-visual-space canvas").length,
            overflow: document.documentElement.scrollWidth > innerWidth,
            background: hands.dataset.backgroundPixel?.split(",").map(Number),
          };
        });
        expect(detail.strength).toBeCloseTo(0.25);
        expect(detail.pixelSize).toBeCloseTo(0.5);
        expect(detail.background).toBeDefined();
        for (const [index, color] of [244, 242, 236].entries())
          expect(Math.abs(detail.background![index] - color)).toBeLessThanOrEqual(2);
        for (const dpr of detail.dprs) {
          expect(dpr).toBeGreaterThan(1.4);
          expect(dpr).toBeLessThanOrEqual(1.5);
        }
        expect(detail.canvases).toBe(2);
        expect(detail.overflow).toBe(false);
      }
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect(page.locator(".hero-visual-space canvas")).toHaveCount(0);
      await expect(page.locator(".hero-visual-space img")).toHaveCount(2);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}
