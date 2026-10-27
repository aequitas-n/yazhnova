import { test, expect } from "@playwright/test";
import { site } from "../content/site";
import { mkdir, writeFile } from "node:fs/promises";

test("service tabs swap one full-size native stage and support keyboard navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  await page.goto("/services");
  const stage = page.locator(".service-stage-visual");
  await stage.scrollIntoViewIfNeeded();
  expect(
    await stage.evaluate((node) => node.getBoundingClientRect().height / innerHeight),
  ).toBeGreaterThanOrEqual(0.79);
  for (const tab of site.services.tabs) {
    await page.getByRole("tab", { name: new RegExp(tab.label + "$", "i") }).click();
    await expect(page.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      "service-tab-" + tab.id,
    );
    await expect(stage.locator("[data-visual]")).toHaveCount(1);
    await expect(stage.locator("[data-visual]")).toHaveAttribute("data-visual", tab.visual);
    await expect(stage.locator("canvas")).toHaveCount(1, { timeout: 20000 });
    await expect(page.locator(".service-active-copy h3")).toHaveText(tab.title);
  }
  const last = page.getByRole("tab").last();
  await last.press("Home");
  await expect(page.getByRole("tab").first()).toBeFocused();
  await expect(page.getByRole("tab").first()).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab").first().press("ArrowDown");
  await expect(page.getByRole("tab").nth(1)).toBeFocused();
  await expect(page.getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true");
  expect(errors).toEqual([]);
});

test("pages keep the signal palette, truthful content and a two-context lifecycle budget", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.addInitScript(() => {
    sessionStorage.setItem("yazhnova:intro:v1", "1");
    const get = HTMLCanvasElement.prototype.getContext;
    const contexts: WebGLRenderingContext[] = [];
    const seen = new WeakSet();
    (window as typeof window & { __maximum: number }).__maximum = 0;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<HTMLCanvasElement["getContext"]>
    ) {
      const context = get.apply(this, args);
      if (context && String(args[0]).startsWith("webgl") && !seen.has(context)) {
        seen.add(context);
        contexts.push(context as WebGLRenderingContext);
      }
      return context;
    } as typeof get;
    const sample = () => {
      const count = contexts.filter((context) => !context.isContextLost()).length;
      const w = window as typeof window & { __maximum: number };
      w.__maximum = Math.max(w.__maximum, count);
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  let maximum = 0;
  for (const path of [
    "/",
    "/services",
    "/ai-agents",
    "/work",
    "/process",
    "/engage",
    "/about",
    "/contact",
  ]) {
    await page.goto(path);
    await expect(page.locator("main")).not.toContainText(
      /TODO|pending approval|Illustrative figures|Sample client quote/i,
    );
    await page.locator(".footer-wordmark").scrollIntoViewIfNeeded();
    await expect(page.locator('[data-visual="wordmark"] canvas')).toHaveCount(1, {
      timeout: 20000,
    });
    await expect(page.locator('[data-visual="rain"] canvas')).toHaveCount(1);
    // The last section can still intersect the viewport above the footer.
    // Only fully off-screen surfaces must be retired.
    await expect
      .poll(() =>
        page.locator("main canvas").evaluateAll((canvases) =>
          canvases.every((canvas) => {
            const box = canvas.getBoundingClientRect();
            return box.bottom > 0 && box.top < innerHeight;
          }),
        ),
      )
      .toBe(true);
    maximum = Math.max(
      maximum,
      await page.evaluate(() => (window as typeof window & { __maximum: number }).__maximum),
    );
  }
  expect(maximum).toBeLessThanOrEqual(2);
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/cohesion-runtime.json",
    JSON.stringify({ maxActiveWebGLContexts: maximum, budget: 2, errors }, null, 2),
  );
  expect(errors).toEqual([]);
});
