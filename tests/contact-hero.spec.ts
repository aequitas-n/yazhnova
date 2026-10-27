import { test, expect } from "@playwright/test";

test("Contact can dispose its rain scene while shader compilation is pending", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => {
    const original = WebGLRenderingContext.prototype.getProgramParameter;
    let pending = true;
    Object.assign(window, { releaseRainCompile: () => (pending = false) });
    WebGLRenderingContext.prototype.getProgramParameter = function (program, name) {
      // KHR_parallel_shader_compile's completion query.
      if (pending && name === 0x91b1) return false;
      return original.call(this, program, name);
    };
  });
  await page.goto("/contact");
  const scene = page.locator('main [data-visual="contact-rain"] canvas');
  await expect(scene).toHaveCount(1);
  await page.locator(".footer-wordmark").scrollIntoViewIfNeeded();
  await expect(scene).toHaveCount(0);
  await page.evaluate(() =>
    (window as unknown as { releaseRainCompile: () => void }).releaseRainCompile(),
  );
  await page.locator("#page-title").scrollIntoViewIfNeeded();
  await expect(scene).toHaveCount(1);
  await expect(page.locator("#name")).toBeVisible();
  expect(errors).toEqual([]);
});
