import { test, expect } from "@playwright/test";

test("story canvases keep their designed proportions across portrait and desktop stages", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [width, height] of [
    [390, 844],
    [412, 915],
    [1440, 1000],
  ]) {
    await page.setViewportSize({ width, height });
    for (const [id, selector, ratio] of [
      ["web", ".story-board", 1000 / 760],
      ["saas", ".story-board", 1000 / 760],
      ["design", ".story-board", 1000 / 760],
      ["mobile", ".story-phone", 390 / 760],
      ["ai", ".story-core", 1],
    ] as const) {
      await page.goto(`/playground/story/${id}?time=3400`);
      const canvas = page.locator(`${selector} canvas`);
      await expect(canvas).toBeVisible();
      await expect
        .poll(() =>
          canvas.evaluate(
            (node) => node instanceof HTMLCanvasElement && node.width > 0 && node.height > 0,
          ),
        )
        .toBe(true);
      const layout = await page.locator(selector).evaluate((element) => {
        const box = element.getBoundingClientRect();
        const scene = element.closest(".service-story-scene")!.getBoundingClientRect();
        const bitmap = element.querySelector("canvas")!;
        const display = bitmap.getBoundingClientRect();
        const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
        return {
          ratio: box.width / box.height,
          inside:
            box.left >= scene.left - 1 &&
            box.right <= scene.right + 1 &&
            box.top >= scene.top - 1 &&
            box.bottom <= scene.bottom + 1,
          pixelScaleX: bitmap.width / display.width,
          pixelScaleY: bitmap.height / display.height,
          scaleX: matrix.a,
          scaleY: matrix.d,
        };
      });
      expect(layout.ratio, `${id} at ${width}px`).toBeCloseTo(ratio, 2);
      // The agent's uniform thinking pulse may extend its square surface slightly.
      if (id !== "ai") expect(layout.inside).toBe(true);
      expect(Math.abs(layout.pixelScaleX - layout.pixelScaleY)).toBeLessThan(0.012);
      expect(layout.scaleX).toBeCloseTo(layout.scaleY, 4);
    }
  }
  expect(errors).toEqual([]);
});

test("reduced-motion product captures keep the original landscape aspect", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/services");
  for (const id of ["web", "saas", "design"]) {
    await page.locator(`#service-tab-${id}`).click();
    const image = page.locator(`.service-story[data-story="${id}"] .visual-frame`);
    await expect(image).toBeVisible();
    const layout = await image.evaluate(async (element) => {
      const image = element as HTMLImageElement;
      await image.decode();
      const box = image.getBoundingClientRect();
      return { source: image.naturalWidth / image.naturalHeight, display: box.width / box.height };
    });
    expect(layout.source).toBeCloseTo(1000 / 760, 2);
    expect(layout.display).toBeCloseTo(1000 / 760, 2);
    await expect(page.locator(".service-story canvas")).toHaveCount(0);
  }
});
