import { test, expect } from "@playwright/test";

test("the native intro releases a live stone between landscape hands with two contexts", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.addInitScript(() => {
    const get = HTMLCanvasElement.prototype.getContext;
    const contexts = new Set<WebGLRenderingContext>();
    const state = { maximum: 0 };
    Object.assign(window, { handsContextState: state });
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof get>
    ) {
      const context = get.apply(this, args);
      if (context && String(args[0]).startsWith("webgl"))
        contexts.add(context as WebGLRenderingContext);
      return context;
    } as typeof get;
    const sample = () => {
      state.maximum = Math.max(
        state.maximum,
        [...contexts].filter((gl) => !gl.isContextLost()).length,
      );
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto("/?intro=replay");
  await expect(page.locator(".site-intro")).toHaveCount(0, { timeout: 22000 });
  await expect(
    page.locator('.hero-art[data-source="dither-reveal"] [data-ready="true"]'),
  ).toHaveCount(1);
  await expect(page.locator('.hero-stone [data-ready="true"]')).toHaveCount(1);
  await expect(page.locator(".hero-visual-space canvas")).toHaveCount(2);
  const layout = await page.evaluate(() => {
    const rect = (s: string) => document.querySelector(s)!.getBoundingClientRect();
    return {
      titleBottom: rect("#hero-title").bottom,
      visualTop: rect(".hero-visual-space").top,
      visualBottom: rect(".hero-visual-space").bottom,
      supportTop: rect(".hero-support").top,
      descriptionBottom: rect(".hero-description").bottom,
      canvasTop: rect(".hero-art canvas").top,
      canvasBottom: rect(".hero-art canvas").bottom,
      maximum: (window as unknown as { handsContextState: { maximum: number } }).handsContextState
        .maximum,
    };
  });
  expect(layout.titleBottom).toBeLessThan(layout.visualTop);
  expect(layout.descriptionBottom).toBeLessThan(layout.visualTop);
  expect(layout.visualBottom).toBeLessThan(layout.supportTop);
  expect(layout.canvasTop).toBeLessThan(layout.visualTop);
  expect(layout.canvasBottom).toBeGreaterThan(layout.visualBottom);
  expect(layout.maximum).toBeLessThanOrEqual(2);
  await page.locator("#manifesto").scrollIntoViewIfNeeded();
  await expect(page.locator(".hero-visual-space canvas")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("reduced motion keeps genuine hands and stone captures", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 393, height: 720 });
  await page.goto("/");
  await expect(page.locator(".hero-visual-space canvas")).toHaveCount(0);
  const frames = page.locator(".hero-visual-space img");
  await expect(frames).toHaveCount(2);
  for (const frame of await frames.all())
    await frame.evaluate((n) => (n as HTMLImageElement).decode());
  const orangePixels = await page.locator(".hero-stone img").evaluate((node) => {
    const image = node as HTMLImageElement;
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let count = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] > 140 && pixels[i + 1] < 100 && pixels[i + 2] < 60 && pixels[i + 3] > 100)
        count++;
    }
    return count;
  });
  expect(orangePixels).toBeGreaterThan(50);
  await expect(page.locator("h1")).toHaveAccessibleName(/Software,\s*engineered\s*to think\./);
});
