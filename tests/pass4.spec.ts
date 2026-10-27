import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { site, pageContent } from "../content/site";
// Custom touch contexts have their own capture report; avoid the Windows
// trace-archive stream race when closing a context during ongoing animation.
test.use({ trace: "off" });

const routes = [
  "/",
  "/services",
  "/ai-agents",
  "/work",
  "/process",
  "/engage",
  "/about",
  "/contact",
];
test("each chapter has its own hero, metadata, OG image and shared shell", async ({
  page,
  request,
}) => {
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  const titles = new Set(),
    images = new Set();
  for (const path of routes) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator(".site-nav")).toHaveCount(1);
    await expect(page.locator('.site-footer [data-visual="rain"]')).toHaveCount(1);
    await expect(page.locator('.site-footer [data-visual="wordmark"]')).toHaveCount(1);
    await expect(page.locator(".page-scroll, .hero-baseline a")).toHaveCount(1);
    titles.add(await page.title());
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    images.add(image);
    expect((await request.get(new URL(image!).pathname)).status()).toBe(200);
    const canonical = new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!);
    expect(canonical.pathname).toBe(path);
    expect(canonical.origin).toBe(new URL(site.url).origin);
    await expect(page.locator("main")).not.toContainText(/TODO|pending approval/i);
  }
  expect(titles.size).toBe(8);
  expect(images.size).toBe(8);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of [...routes.slice(1), "/work/clarity", "/work/relay", "/work/forma"])
    expect(sitemap).toContain(site.url + path);
  expect((await request.get("/work/unknown")).status()).toBe(404);
});

for (const width of [390, 412])
  test(`touch ${width}px autoplays canvases, stories and a short skippable intro`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      baseURL: process.env.BASE_URL || "http://localhost:3000",
      viewport: { width, height: width === 390 ? 844 : 915 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    try {
      await page.goto("/?intro=replay");
      await expect(page.locator(".intro-stone canvas")).toHaveCount(1, { timeout: 20000 });
      await expect(page.locator(".site-intro")).toHaveAttribute("data-compact", "true");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await expect(page.locator(".site-intro")).toHaveCount(0, { timeout: 10000 });
      await expect(page.locator(".hero-art canvas")).toHaveCount(1, { timeout: 20000 });
      for (const path of routes.slice(1)) {
        await page.goto(path);
        const hero = page.locator(".page-hero");
        await expect(hero.locator("canvas")).toHaveCount(1, { timeout: 20000 });
        expect(
          await hero.evaluate((node) =>
            Math.abs(node.getBoundingClientRect().height - innerHeight),
          ),
        ).toBeLessThan(2);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        const ratio = await hero
          .locator("canvas")
          .evaluate(
            (canvas) => (canvas as HTMLCanvasElement).width / canvas.getBoundingClientRect().width,
          );
        expect(ratio).toBeLessThanOrEqual(1.5);
        await expect(hero.locator("img.visual-frame")).toHaveCount(0);
      }
      await page.goto("/services");
      await page.locator(".service-stage-visual").scrollIntoViewIfNeeded();
      for (const id of ["web", "saas", "ai", "mobile", "cloud", "design"]) {
        await page.locator("#service-tab-" + id).click();
        const story = page.locator('[data-story="' + id + '"]');
        await expect(story.locator("canvas")).toHaveCount(1, { timeout: 20000 });
        await expect
          .poll(async () => Number(await story.getAttribute("data-time")))
          .toBeGreaterThan(500);
        await expect(story).not.toHaveAttribute("data-state", "static");
        if (id === "cloud") {
          await page.getByRole("button", { name: "Node / Python", exact: true }).tap();
          await expect(page.getByRole("tooltip")).toBeVisible();
        }
      }
      await page.locator(".footer-wordmark").scrollIntoViewIfNeeded();
      await expect(page.locator("main canvas")).toHaveCount(0);
      await expect(page.locator(".footer-wordmark canvas")).toHaveCount(1, { timeout: 20000 });
      await page.goto("/?intro=replay");
      await expect(page.locator(".site-intro")).toHaveAttribute(
        "data-intro-phase",
        /loading|playing/,
      );
      await page.keyboard.press("Escape");
      await expect(page.locator(".site-intro")).toHaveCount(0);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

test("mobile menu fills the screen, navigates between chapters and preserves focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: site.actions.menu }).click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  const box = await menu.boundingBox();
  expect(box?.width).toBe(390);
  expect(box?.height).toBe(844);
  await expect(menu.locator("nav a")).toHaveCount(7);
  await menu.getByRole("link", { name: /AI Agents/ }).click();
  await expect(page).toHaveURL("/ai-agents");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: site.actions.menu }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: site.actions.menu })).toBeFocused();
});

test("reduced motion alone selects static scenes and the short homepage keeps five main sections", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("main>section")).toHaveCount(5);
  await expect(
    page.locator("main .agents-section,main .process-depth,main .faq-section,main .engage-section"),
  ).toHaveCount(0);
  await expect(page.locator('main .home-practice a[href="/services"]')).toBeVisible();
  for (const path of routes) {
    await page.goto(path);
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator(".site-intro")).toHaveCount(0);
  }
  await page.goto("/contact");
  const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(scan.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
    [],
  );
});
