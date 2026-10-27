import { test, expect } from "@playwright/test";
import { serviceStories, site } from "../content/site";

test("stories progress, pause off-screen, replay and expose structured cloud tooltips", async ({
  page,
}) => {
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/services");
  await page.locator(".service-stage-visual").scrollIntoViewIfNeeded();
  const story = page.locator('[data-story="web"]');
  await expect(story.locator("canvas")).toHaveCount(1, { timeout: 20000 });
  await expect
    .poll(async () => Number(await story.getAttribute("data-time")))
    .toBeGreaterThan(1200);
  await page.locator("#page-title").scrollIntoViewIfNeeded();
  await expect(story).toHaveAttribute("data-state", "paused");
  const paused = Number(await story.getAttribute("data-time"));
  await page.waitForTimeout(500);
  expect(Number(await story.getAttribute("data-time"))).toBe(paused);
  await page.locator(".service-stage-visual").scrollIntoViewIfNeeded();
  await expect(story).toHaveAttribute("data-state", "idle", { timeout: 9000 });
  await expect(story.locator('[aria-current="step"]')).toHaveText("Live");
  await page.getByRole("button", { name: serviceStories.replay }).click();
  await expect.poll(async () => Number(await story.getAttribute("data-time"))).toBeLessThan(1000);
  await page.locator("#service-tab-cloud").click();
  const api = page.getByRole("button", { name: "Node / Python", exact: true });
  await api.focus();
  await expect(page.getByRole("tooltip")).toHaveText(
    serviceStories.cloud.nodes.find((node) => node.id === "api")!.detail,
  );
  await expect(page.locator('[data-story="cloud"]')).toHaveAttribute("data-hover", "api");
  await expect(page.locator(".architecture-node")).toHaveCount(11);
  await expect(page.locator('[data-story="cloud"] canvas')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("Work pins an editorial track, scrolls sideways and keeps nav backgrounds transparent", async ({
  page,
}) => {
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  await page.goto("/work");
  const scene = page.locator(".work-horizontal");
  await expect(scene).toHaveAttribute("data-pinned", "true");
  await expect(page.locator(".case-panel")).toHaveCount(3);
  await expect(page.locator("#work canvas")).toHaveCount(0);
  await expect(page.locator("#work")).not.toContainText(/Concept exploration|TODO/i);
  const start = await scene.evaluate((node) => node.getBoundingClientRect().top + scrollY - 76);
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), start);
  await expect(page.locator(".work-progress")).toHaveText("01 / 03");
  const before = await page
    .locator(".case-panel")
    .first()
    .evaluate((node) => node.getBoundingClientRect().left);
  await page.mouse.wheel(0, 1100);
  await expect
    .poll(() =>
      page
        .locator(".case-panel")
        .first()
        .evaluate((node) => node.getBoundingClientRect().left),
    )
    .toBeLessThan(before - 300);
  await page.evaluate(
    ({ start, height }) =>
      window.scrollTo({ top: start + height - innerHeight + 76, behavior: "instant" }),
    { start, height: await scene.evaluate((node) => node.getBoundingClientRect().height) },
  );
  await expect(page.locator(".work-progress")).toHaveText("03 / 03");
  await page.getByRole("link", { name: site.work.caseAction + ": Forma" }).click();
  await expect(page).toHaveURL(/work\/forma$/);
  await expect(page.getByRole("heading", { name: "Forma", exact: true })).toBeVisible();
  for (const name of ["Services", "Work"]) {
    const link = page.locator(".desktop-nav").getByRole("link", { name, exact: true });
    await link.hover();
    expect(await link.evaluate((node) => getComputedStyle(node).backgroundColor)).toBe(
      "rgba(0, 0, 0, 0)",
    );
    expect(await link.evaluate((node) => getComputedStyle(node, "::after").backgroundColor)).toBe(
      "rgb(255, 59, 0)",
    );
  }
});

test("reduced motion shows each final product frame and a vertical Work layout", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/services");
  for (const id of Object.keys(serviceStories.steps)) {
    await page.locator("#service-tab-" + id).click();
    const story = page.locator(".service-story");
    await expect(story).toHaveAttribute("data-state", "static");
    await expect(story).toHaveAttribute("data-step", "3");
    await expect
      .poll(() =>
        story
          .locator("img.visual-frame")
          .evaluate(
            (image) =>
              (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
          ),
      )
      .toBe(true);
    await expect(story.locator("canvas")).toHaveCount(0);
  }
  await page.goto("/work");
  await expect(page.locator(".work-horizontal")).toHaveAttribute("data-pinned", "false");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
