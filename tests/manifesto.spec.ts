import { test, expect } from "@playwright/test";
import { site } from "../content/site";

for (const width of [1440, 390]) {
  test(`manifesto ${width}px paints, fades and repeats inside a full-screen section`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/");
    await page.evaluate(() =>
      window.scrollTo({
        top: document.querySelector<HTMLElement>("#manifesto")!.offsetTop,
        behavior: "instant",
      }),
    );
    const canvas = page.locator("#manifesto canvas");
    await expect(canvas).toHaveCount(1);
    const geometry = await page.locator("#manifesto").evaluate((node) => ({
      height: node.getBoundingClientRect().height,
      viewport: innerHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    expect(geometry.height).toBeGreaterThanOrEqual(geometry.viewport);
    expect(geometry.overflow).toBe(false);
    await expect(page.locator("#manifesto h2")).toHaveText(site.manifesto.brush.replace("\n", " "));
    const samples: number[] = [];
    for (let i = 0; i < 19; i++) {
      samples.push(
        await canvas.evaluate((element) => {
          const c = element as HTMLCanvasElement;
          const pixels = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
          let orange = 0;
          for (let j = 0; j < pixels.length; j += 16) {
            if (pixels[j] > 120 && pixels[j + 1] < pixels[j] * 0.4 && pixels[j + 2] < 30) orange++;
          }
          return orange;
        }),
      );
      await page.waitForTimeout(450);
    }
    const maximum = Math.max(...samples);
    expect(maximum).toBeGreaterThan(1000);
    const full = samples.findIndex((count) => count > maximum * 0.9);
    const cleared = samples.findIndex((count, index) => index > full && count < maximum * 0.15);
    expect(cleared).toBeGreaterThan(full);
    expect(samples.slice(cleared + 1).some((count) => count > maximum * 0.3)).toBe(true);
    await page.locator(".footer-wordmark").scrollIntoViewIfNeeded();
    await expect(canvas).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test("reduced-motion manifesto retains its finished statement and responsive frame", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#manifesto").scrollIntoViewIfNeeded();
  const image = page.locator("#manifesto img");
  await expect(image).toBeVisible();
  await expect(page.locator("#manifesto canvas")).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() => image.evaluate((node) => (node as HTMLImageElement).currentSrc))
    .toContain("manifesto-mobile.webp");
  await image.evaluate((node) => (node as HTMLImageElement).decode());
  await expect(page.getByRole("heading", { name: /We build what's next/ })).toHaveCount(1);
});

test("manifesto statement is available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto(process.env.BASE_URL || "http://localhost:3000");
    await page.locator("#manifesto").scrollIntoViewIfNeeded();
    const image = page.locator("#manifesto img");
    await expect(image).toBeVisible();
    await expect
      .poll(() => image.evaluate((node) => (node as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect(page.getByRole("heading", { name: /We build what's next/ })).toHaveCount(1);
  } finally {
    await context.close();
  }
});
