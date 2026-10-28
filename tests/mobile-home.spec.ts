import { test, expect, type Page } from "@playwright/test";

async function expectReadableHero(page: Page) {
  const geometry = await page.evaluate(() => {
    const rect = (selector: string) => {
      const r = document.querySelector(selector)!.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
    };
    const heading = document.querySelector("#hero-title")!;
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const lines = [];
    while (walker.nextNode()) {
      if (!walker.currentNode.textContent?.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      lines.push(...Array.from(range.getClientRects(), (r) => ({ left: r.left, right: r.right })));
    }
    return {
      title: rect("#hero-title"),
      visual: rect(".hero-visual-space"),
      stone: rect(".hero-stone"),
      description: rect(".hero-description"),
      actions: rect(".hero-actions"),
      note: rect(".hero-note"),
      baseline: rect(".hero-baseline"),
      brand: rect(".site-nav .brand"),
      navActions: rect(".site-nav .nav-actions"),
      width: innerWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      lines,
    };
  });
  expect(geometry.overflow).toBe(false);
  expect(geometry.title.bottom + 16).toBeLessThanOrEqual(geometry.description.top);
  expect(geometry.visual.top).toBeGreaterThan(geometry.title.bottom);
  expect(geometry.stone.top).toBeGreaterThan(geometry.title.bottom);
  expect(geometry.stone.bottom).toBeLessThan(geometry.description.top);
  expect(
    Math.abs((geometry.stone.left + geometry.stone.right) / 2 - geometry.width / 2),
  ).toBeLessThan(2);
  expect(geometry.description.bottom + 12).toBeLessThanOrEqual(geometry.actions.top);
  expect(geometry.actions.bottom + 16).toBeLessThanOrEqual(geometry.note.top);
  expect(geometry.note.bottom + 16).toBeLessThanOrEqual(geometry.baseline.top);
  expect(geometry.brand.right + 8).toBeLessThanOrEqual(geometry.navActions.left);
  for (const line of geometry.lines) {
    expect(line.left).toBeGreaterThanOrEqual(16);
    expect(line.right).toBeLessThanOrEqual(geometry.width - 16);
  }
}

for (const [width, height] of [
  [320, 568],
  [360, 640],
  [393, 720],
  [412, 915],
]) {
  test(`mobile Home ${width}×${height} keeps type, actions and labels apart`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
    });
    try {
      const page = await context.newPage();
      await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
      await page.goto(process.env.BASE_URL || "http://localhost:3000");
      await expect(page.locator('.hero-art [data-ready="true"]')).toHaveCount(1);
      await expectReadableHero(page);
      await expect(page.locator(".hero-art canvas")).toHaveCount(1);
      expect(
        await page
          .locator(".hero-art canvas")
          .evaluate((c) => (c as HTMLCanvasElement).width / c.getBoundingClientRect().width),
      ).toBeLessThanOrEqual(1.5);
    } finally {
      await context.close();
    }
  });
}

test("the hand preview survives a delayed texture and then hands over to live rendering", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 720 });
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/hands-diagonal.webp", async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const preview = page.locator(".hero-art img.visual-frame");
    await preview.evaluate((node) => (node as HTMLImageElement).decode());
    await expect(preview).toBeVisible();
    await expect(page.locator('.hero-art [data-ready="false"]')).toHaveCount(1);
    await expectReadableHero(page);
    release();
    await expect(page.locator('.hero-art [data-ready="true"]')).toHaveCount(1);
    await expect(preview).toHaveCount(0);
    await expect(page.locator(".hero-art canvas")).toBeVisible();
  } finally {
    release();
  }
});

test("fallback fonts stay within the mobile grid while brand fonts download", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/fonts/*.woff2", async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expectReadableHero(page);
    release();
    await page.evaluate(() => document.fonts.ready);
    await expectReadableHero(page);
  } finally {
    release();
  }
});
