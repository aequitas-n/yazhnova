import { test, expect } from "@playwright/test";
import { chapterHeroes, pageContent, site } from "../content/site";

const chapters = Object.keys(chapterHeroes) as (keyof typeof chapterHeroes)[];
test.use({ trace: "off" });

test("client navigation replays the shared native hero and retires the previous scene", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => {
    const state = {
      contexts: [] as WebGLRenderingContext[],
      maximum: 0,
      entries: [] as string[],
      token: Math.random(),
    };
    (window as typeof window & { __chapterCheck: typeof state }).__chapterCheck = state;
    const original = HTMLCanvasElement.prototype.getContext;
    const seen = new WeakSet();
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      const context = original.apply(this, args);
      if (context && String(args[0]).startsWith("webgl") && !seen.has(context)) {
        seen.add(context);
        state.contexts.push(context as WebGLRenderingContext);
      }
      return context;
    } as typeof original;
    const sample = () => {
      state.maximum = Math.max(
        state.maximum,
        state.contexts.filter((gl) => !gl.isContextLost()).length,
      );
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
    new MutationObserver(() => {
      const hero = document.querySelector<HTMLElement>("[data-page-hero]");
      if (!hero) return;
      const entry = `${hero.dataset.pageHero}:${hero.dataset.chapterEntered}`;
      if (state.entries.at(-1) !== entry) state.entries.push(entry);
    }).observe(document, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-chapter-entered"],
    });
  });
  await page.goto("/services");
  const token = await page.evaluate(() => (window as any).__chapterCheck.token);
  for (const [index, key] of chapters.entries()) {
    if (index) await page.locator(`.desktop-nav a[href="${pageContent[key].path}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${pageContent[key].path}$`));
    const hero = page.locator(".chapter-hero");
    await expect(hero).toHaveAttribute("data-page-hero", key);
    await expect(hero.locator('[data-originkit="hero-44"]')).toHaveCount(1);
    await expect(hero.locator('[data-visual="plasma"] canvas')).toHaveCount(1, { timeout: 20000 });
    await expect(hero).toHaveAttribute("data-chapter-entered", "true");
    await expect(page.locator("main h1")).toHaveAccessibleName(
      `${pageContent[key].title} ${pageContent[key].serif}`,
    );
    await expect(hero.locator('[data-visual]:not([data-visual="plasma"])')).toHaveCount(0);
    expect(await page.evaluate(() => (window as any).__chapterCheck.token)).toBe(token);
  }
  const entries = await page.evaluate(() => (window as any).__chapterCheck.entries as string[]);
  for (const key of chapters) {
    expect(entries).toContain(`${key}:false`);
    expect(entries).toContain(`${key}:true`);
  }
  await page.goBack();
  await expect(page.locator(".chapter-hero")).toHaveAttribute("data-page-hero", "engage");
  await expect(page.locator(".chapter-hero")).toHaveAttribute("data-chapter-entered", "true");
  await page.goto("/ai-agents");
  await expect(page.locator('.chapter-hero [data-visual="glassbound"]')).toHaveCount(0);
  await expect(page.locator('[data-visual="glassbound"]')).toHaveCount(1);
  await page.locator("#agent-demo .agent-visual").scrollIntoViewIfNeeded();
  await expect(page.locator('#agent-demo [data-visual="glassbound"] canvas')).toHaveCount(1, {
    timeout: 20000,
  });
  await page.getByRole("button", { name: site.agents.demo.replay }).click();
  await expect(page.locator(".workflow-demo li.complete")).toHaveCount(3, { timeout: 8000 });
  await expect.poll(() => page.locator(".chapter-hero canvas").count()).toBe(0);
  expect(await page.evaluate(() => (window as any).__chapterCheck.maximum)).toBeLessThanOrEqual(2);
  expect(errors).toEqual([]);
});

for (const width of [390, 412]) {
  test(`shared hero animates on ${width}px touch screens without clipping the title or CTA`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 915 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    try {
      for (const key of chapters) {
        await page.goto((process.env.BASE_URL || "http://localhost:3000") + pageContent[key].path);
        const hero = page.locator(".chapter-hero");
        await expect(hero.locator("canvas")).toHaveCount(1, { timeout: 20000 });
        await expect(hero).toHaveAttribute("data-chapter-entered", "true");
        const bounds = await hero.evaluate((element) => {
          const title = element.querySelector("h1")!.getBoundingClientRect();
          const button = element
            .querySelector<HTMLAnchorElement>(".chapter-description a")!
            .getBoundingClientRect();
          const canvas = element.querySelector("canvas")!;
          return {
            height: element.getBoundingClientRect().height,
            viewport: innerHeight,
            overflow: document.documentElement.scrollWidth > innerWidth,
            titleFits:
              title.left >= 0 &&
              title.right <= innerWidth &&
              title.bottom < button.top &&
              [...element.querySelectorAll(".chapter-word")].every((word) => {
                const bounds = word.getBoundingClientRect();
                return bounds.left >= 0 && bounds.right <= innerWidth;
              }),
            buttonFits:
              button.left >= 0 && button.right <= innerWidth && button.bottom < innerHeight - 65,
            dpr: canvas.width / canvas.getBoundingClientRect().width,
          };
        });
        expect(Math.abs(bounds.height - bounds.viewport)).toBeLessThan(2);
        expect(bounds.overflow).toBe(false);
        expect(bounds.titleFits).toBe(true);
        expect(bounds.buttonFits).toBe(true);
        expect(bounds.dpr).toBeLessThanOrEqual(1.5);
        await expect(hero.locator("img.visual-frame")).toHaveCount(0);
      }
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}

test("reduced-motion and no-JavaScript visits retain readable chapter heroes", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const key of chapters) {
    await page.goto(pageContent[key].path);
    const hero = page.locator(".chapter-hero");
    await expect(hero.locator("canvas")).toHaveCount(0);
    await expect(hero.locator("img.visual-frame")).toHaveCount(1);
    expect(
      await hero
        .locator("img.visual-frame")
        .evaluate((image: HTMLImageElement) => image.decode().then(() => image.naturalWidth)),
    ).toBeGreaterThan(0);
    await expect(hero).toHaveAttribute("data-chapter-entered", "true");
    await expect(hero.locator("h1")).toBeVisible();
  }
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    const staticPage = await context.newPage();
    await staticPage.goto((process.env.BASE_URL || "http://localhost:3000") + "/services");
    await expect(staticPage.locator("h1")).toBeVisible();
    await expect(staticPage.locator(".chapter-word").first()).toHaveCSS("opacity", "1");
    await expect(staticPage.locator(".chapter-description a")).toBeVisible();
    await expect(staticPage.locator(".route-wipe")).toBeHidden();
  } finally {
    await context.close();
  }
});
