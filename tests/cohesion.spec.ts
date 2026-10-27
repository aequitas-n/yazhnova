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
  await page.goto("/");
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

test("the story has two paper breaths, truthful proof and at most two active WebGL surfaces", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => {
    sessionStorage.setItem("yazhnova:intro:v1", "1");
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<HTMLCanvasElement["getContext"]>
    ) {
      const context = original.apply(this, args);
      if (context) this.dataset.renderContext = String(args[0]);
      return context;
    } as typeof original;
    const history: number[] = [];
    (window as typeof window & { __glHistory: number[] }).__glHistory = history;
    const sample = () => {
      history.push(document.querySelectorAll('canvas[data-render-context^="webgl"]').length);
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto("/");
  await expect(page.locator("main > section.paper")).toHaveCount(2);
  await expect(page.locator("main")).not.toContainText(
    /TODO|pending approval|Illustrative figures|Sample client quote/i,
  );
  await expect(page.locator(".proof-section")).toBeAttached();
  await expect(page.locator(".proof-capabilities > div")).toHaveCount(4);
  await expect(page.locator(".proof-quotes, .proof-stats")).toHaveCount(0);
  await expect(page.locator(".cta-tunnel [data-visual]")).toHaveAttribute("data-visual", "gate");
  const agentLayout = await page.locator(".agent-layout").evaluate((node) => ({
    width: node.getBoundingClientRect().width,
    viewport: innerWidth,
    visual: node.children[0].getBoundingClientRect().width,
  }));
  expect(Math.abs(agentLayout.width - agentLayout.viewport)).toBeLessThan(2);
  expect(agentLayout.visual / agentLayout.width).toBeCloseTo(0.6, 1);
  for (const selector of [
    ".hero-stage",
    ".manifesto-section",
    ".services-section",
    ".agent-visual",
    ".process-cables",
    ".tech-section",
    ".work-gallery",
    ".engage-section",
    ".proof-globe",
    ".faq-section",
    ".cta-tunnel",
    ".footer-wordmark",
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    expect(await page.locator('canvas[data-render-context^="webgl"]').count()).toBeLessThanOrEqual(
      2,
    );
  }
  const maximum = await page.evaluate(() =>
    Math.max(...(window as typeof window & { __glHistory: number[] }).__glHistory),
  );
  expect(maximum).toBeLessThanOrEqual(2);
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/cohesion-runtime.json",
    JSON.stringify({ maxActiveWebGLContexts: maximum, budget: 2, errors }, null, 2),
  );
  await page.locator(".proof-globe").scrollIntoViewIfNeeded();
  const globe = page.locator('[data-visual="globe"] canvas');
  await expect(globe).toHaveCount(1, { timeout: 20000 });
  const box = await globe.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5, { steps: 8 });
    await page.mouse.up();
  }
  expect(errors).toEqual([]);
});
