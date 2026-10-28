import { test, expect } from "@playwright/test";
import { site } from "../content/site";

test("heavy 2D and WebGL share two slots across scrolling and client navigation", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    sessionStorage.setItem("yazhnova:intro:v1", "1");
    const original = HTMLCanvasElement.prototype.getContext;
    const contexts = new Set<WebGLRenderingContext>();
    const report = { maximumCanvases: 0, maximumContexts: 0, footerOverlap: false };
    Object.assign(window, { visualReport: report, visualContexts: contexts });
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      const context = original.apply(this, args);
      if (context && String(args[0]).startsWith("webgl"))
        contexts.add(context as WebGLRenderingContext);
      return context;
    } as typeof original;
    const sample = () => {
      report.maximumCanvases = Math.max(
        report.maximumCanvases,
        document.querySelectorAll('[data-visual][data-mode="live"] canvas').length,
      );
      report.maximumContexts = Math.max(
        report.maximumContexts,
        [...contexts].filter((context) => !context.isContextLost()).length,
      );
      report.footerOverlap ||= !!(
        document.querySelector('.site-footer [data-visual="ridge"] canvas') &&
        document.querySelector('.site-footer [data-visual="wordmark"] canvas')
      );
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto("/services");
  for (const path of [
    "/services",
    "/ai-agents",
    "/work",
    "/process",
    "/engage",
    "/about",
    "/contact",
    "/",
  ]) {
    if (!page.url().endsWith(path)) {
      await page.locator(`.site-nav a[href="${path}"]`).first().click();
      await page.waitForURL((url) => url.pathname === path);
    }
    await page.waitForFunction(() => document.querySelector('main [data-mode="live"] canvas'));
    for (const selector of [".service-stage-visual", ".where-globe", ".footer-wordmark"]) {
      const section = page.locator(selector).first();
      if (!(await section.count())) continue;
      await section.scrollIntoViewIfNeeded();
      await expect
        .poll(() => page.locator('[data-visual][data-mode="live"] canvas').count())
        .toBeGreaterThan(0);
      if (selector === ".service-stage-visual") {
        for (const id of ["saas", "ai", "mobile", "cloud", "design"]) {
          await page.locator(`#service-tab-${id}`).click();
          await expect(page.locator(`.service-story[data-story="${id}"] canvas`)).toHaveCount(1);
        }
      }
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-visual] canvas")).toHaveCount(0);
  const report = await page.evaluate(
    () =>
      (
        window as unknown as {
          visualReport: {
            maximumCanvases: number;
            maximumContexts: number;
            footerOverlap: boolean;
          };
          visualContexts: Set<WebGLRenderingContext>;
        }
      ).visualReport,
  );
  expect(report.maximumCanvases).toBeLessThanOrEqual(2);
  expect(report.maximumContexts).toBeLessThanOrEqual(2);
  expect(report.footerOverlap).toBe(false);
  expect(
    await page.evaluate(() =>
      [
        ...(window as unknown as { visualContexts: Set<WebGLRenderingContext> }).visualContexts,
      ].every((context) => context.isContextLost()),
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("the idle validation upgrade preserves typed form values and focus", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await page.locator("#name").fill("Avery Taylor");
  await page.locator("#email").fill("avery@example.com");
  await expect(page.locator('[data-validation="ready"]')).toHaveCount(1);
  await expect(page.locator("#name")).toHaveValue("Avery Taylor");
  await expect(page.locator("#email")).toHaveValue("avery@example.com");
  await page.getByRole("button", { name: site.contact.submit, exact: true }).click();
  await expect(page.locator("#message-error")).toBeVisible();
  await expect(page.locator("#name-error")).toHaveCount(0);
});

test("background visibility retires all heavy surfaces and resumes live motion", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(page.locator('main [data-mode="live"] canvas')).toHaveCount(1);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator("[data-visual] canvas")).toHaveCount(0);
  await expect(page.locator('main [data-mode="waiting"] img')).toHaveCount(1);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator('main [data-mode="live"] canvas')).toHaveCount(1);
});
