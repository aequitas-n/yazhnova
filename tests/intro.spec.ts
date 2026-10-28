import { test, expect } from "@playwright/test";

test("Escape cancels a pending native shader warmup without resurrecting its canvas", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const seen = new WeakSet<object>();
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      const context = original.apply(this, args);
      if (context && String(args[0]).startsWith("webgl") && !seen.has(context)) {
        seen.add(context);
        const gl = context as WebGLRenderingContext;
        const parameter = gl.getProgramParameter.bind(gl);
        gl.getProgramParameter = ((program: WebGLProgram, name: number) =>
          name === 0x91b1 && document.querySelector(".site-intro")
            ? false
            : parameter(program, name)) as typeof gl.getProgramParameter;
      }
      return context;
    } as typeof original;
  });
  await page.goto("/?intro=replay");
  await expect(page.locator(".intro-stone canvas")).toHaveCount(1, { timeout: 15000 });
  await expect(page.locator(".site-intro")).toHaveAttribute("data-intro-phase", "loading");
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-intro")).toHaveCount(0);
  await page.waitForTimeout(350);
  await expect(page.locator(".intro-stone canvas")).toHaveCount(0);
  expect(errors).toEqual([]);
});
import { site } from "../content/site";

test("real stone opens, reveals the wordmark, reforms and releases the homepage", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => {
    const history: string[] = [];
    (window as typeof window & { __introHistory: string[] }).__introHistory = history;
    new MutationObserver(() => {
      const intro = document.querySelector<HTMLElement>(".site-intro");
      if (!intro) return;
      const state = `${intro.dataset.introPhase}:${intro.dataset.introBeat}`;
      if (history.at(-1) !== state) history.push(state);
    }).observe(document, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-intro-phase", "data-intro-beat"],
    });
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<HTMLCanvasElement["getContext"]>
    ) {
      const context = original.apply(this, args);
      if (context) this.dataset.renderContext = String(args[0]);
      return context;
    } as typeof original;
  });
  await page.goto("/?intro=replay");
  const intro = page.getByRole("dialog", { name: site.intro.title });
  await expect(intro).toHaveAttribute("data-intro-phase", "playing", { timeout: 15000 });
  await expect(intro.locator("canvas")).toHaveAttribute("data-render-context", "webgl2");
  const centered = await page.locator(".intro-stone").evaluate((element) => {
    const box = element.getBoundingClientRect();
    return Math.hypot(
      box.left + box.width / 2 - innerWidth / 2,
      box.top + box.height / 2 - innerHeight / 2,
    );
  });
  expect(centered).toBeLessThan(1);
  await intro.locator("canvas").evaluate((canvas) => {
    Object.assign(window, { introStoneCanvas: canvas });
  });
  await expect(page.locator(".intro-page")).toHaveAttribute("inert", "");
  await expect(page.locator(".hero-art canvas")).toHaveCount(0);
  await expect(intro).toBeFocused();
  await expect(intro.locator("button, img")).toHaveCount(0);
  await expect(intro).toHaveCSS("outline-style", "none");
  await expect(intro).toHaveAttribute("data-intro-beat", "wordmark", { timeout: 5000 });
  expect(await intro.locator(".intro-word-left > span").textContent()).toBe("YAZH");
  expect(await intro.locator(".intro-word-right > span").textContent()).toBe("NOVA");
  const wordPosition = await intro
    .locator(".intro-word-left > span")
    .evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  expect(Math.abs(wordPosition)).toBeLessThan(1);
  await expect(intro).toHaveCount(0, { timeout: 8000 });
  const history = await page.evaluate(
    () => (window as typeof window & { __introHistory: string[] }).__introHistory,
  );
  const beats = history
    .map((state) => state.split(":")[1])
    .filter((beat, index, list) => index === 0 || beat !== list[index - 1]);
  expect(beats).toEqual(["formed", "opening", "wordmark", "closing", "reformed", "docking"]);
  expect(history).toContain("revealing:docking");
  expect(
    await page
      .locator(".hero-stone canvas")
      .evaluate(
        (canvas) =>
          canvas ===
          (window as typeof window & { introStoneCanvas: HTMLCanvasElement }).introStoneCanvas,
      ),
  ).toBe(true);
  await expect(page.locator(".intro-page")).not.toHaveAttribute("inert");
  await expect(page.locator("#hero-title")).toBeFocused();
  await expect(page.locator("#hero-title")).toHaveCSS("outline-style", "none");
  await expect(page.locator(".hero-art canvas")).toHaveCount(1, { timeout: 15000 });
  expect(await page.evaluate(() => document.documentElement.style.overflow)).not.toBe("hidden");
  expect(await page.evaluate(() => sessionStorage.getItem("yazhnova:intro:v1"))).toBe("1");
  expect(errors).toEqual([]);
});

test("intro has no Skip button, supports Escape and stays skipped on return visits", async ({
  page,
}) => {
  await page.goto("/?intro=replay");
  const intro = page.getByRole("dialog", { name: site.intro.title });
  await expect(intro).toBeVisible();
  await expect(intro.locator("button")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(intro).toHaveCount(0);
  await expect(page.locator("#hero-title")).toBeVisible();
  await page.goto("/");
  await expect(page.locator(".site-intro")).toHaveCount(0);
  await page.goto("/?intro=replay");
  await expect(page.locator(".site-intro")).toHaveAttribute("data-intro-phase", /loading|playing/);
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-intro")).toHaveCount(0);
  await expect(page.locator(".intro-page")).not.toHaveAttribute("inert");
});

test("reduced motion, mobile and no-JavaScript visits keep the homepage available", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?intro=replay");
  await expect(page.locator(".site-intro")).toHaveCount(0);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("#hero-title")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?intro=replay");
  await expect(page.locator(".intro-stone canvas")).toHaveCount(1, { timeout: 15000 });
  await expect(page.locator(".site-intro")).toHaveAttribute("data-compact", "true");
  await expect(page.locator(".site-intro")).toHaveCount(0, { timeout: 10000 });
  await expect(page.locator(".hero-art canvas")).toHaveCount(1, { timeout: 15000 });
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  try {
    const staticPage = await context.newPage();
    await staticPage.goto("http://localhost:3000/");
    await expect(staticPage.locator(".site-intro")).toBeHidden();
    await expect(staticPage.locator(".intro-page")).not.toHaveAttribute("inert");
    await expect(staticPage.locator("#hero-title")).toBeVisible();
    await expect(staticPage.locator(".hero-actions a").first()).toBeVisible();
  } finally {
    await context.close();
  }
});

test("a failed intro WebGL context releases the page instead of trapping the visitor", async ({
  page,
}) => {
  const exceptions: string[] = [];
  page.on("pageerror", (error) => exceptions.push(error.message));
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    let blocked: HTMLCanvasElement | null = null;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<HTMLCanvasElement["getContext"]>
    ) {
      if (String(args[0]).includes("webgl")) {
        blocked ??= this;
        if (this === blocked) return null;
      }
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/?intro=replay");
  await expect(page.locator(".site-intro")).toHaveCount(0, { timeout: 12000 });
  await expect(page.locator(".intro-page")).not.toHaveAttribute("inert");
  await expect(page.locator("#hero-title")).toBeVisible();
  await expect(page.locator(".hero-art canvas")).toHaveCount(1, { timeout: 10000 });
  expect(exceptions).toEqual([]);
});
