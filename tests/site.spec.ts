import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readdir, readFile } from "node:fs/promises";
import { site } from "../content/site";

test("desktop uses real source canvases and interactive sections work without errors", async ({
  page,
}) => {
  await page.addInitScript(() => sessionStorage.setItem("yazhnova:intro:v1", "1"));
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.addInitScript(() => {
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
  await mkdir("artifacts", { recursive: true });
  await page.goto("/");
  await expect(page.locator("h1")).toHaveAccessibleName(/Software,\s*engineered\s*to think\./);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: "artifacts/home-desktop.png" });
  for (const [kind, context] of [
    ["hero-dither", "webgl"],
    ["horizon", "webgl"],
    ["manifesto", "2d"],
    ["pixels", "2d"],
    ["network", "webgl"],
    ["glassbound", "webgl2"],
    ["shadow", "webgl"],
    ["ember", "webgl2"],
    ["rain", "webgl"],
    ["wordmark", "webgl2"],
  ]) {
    const visual = page.locator(`[data-visual="${kind}"]`).first();
    await visual.scrollIntoViewIfNeeded();
    await expect(visual.locator("canvas")).toHaveCount(1, { timeout: 20000 });
    await expect(visual.locator("canvas")).toHaveAttribute("data-render-context", context);
    const size = await visual
      .locator("canvas")
      .evaluate((c) => ({ w: (c as HTMLCanvasElement).width, h: (c as HTMLCanvasElement).height }));
    expect(size.w).toBeGreaterThan(0);
    expect(size.h).toBeGreaterThan(0);
  }
  await expect(page.locator('[data-visual="glassbound"] canvas')).toHaveCount(0);
  await page.getByRole("button", { name: site.actions.next, exact: true }).click();
  await expect(page.locator(".work-info h3")).toContainText("Relay");
  await page.getByRole("button", { name: `${site.actions.details}: Relay` }).click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "Relay", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const faq = page.getByRole("button", {
    name: new RegExp(site.faq.items[0].question.replace(/[?]/g, "\\?")),
  });
  await faq.click();
  await expect(page.getByText(site.faq.items[0].answer, { exact: true })).toBeVisible();
  await faq.press("Enter");
  await expect(faq).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: site.agents.demo.replay }).click();
  await expect(page.locator(".workflow-status")).toHaveClass(/ready/, { timeout: 7000 });
  await expect(page.locator(".workflow-demo li.complete")).toHaveCount(3);
  const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(scan.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
    [],
  );
  expect(errors).toEqual([]);
});

test("mobile and reduced-motion use genuine captured frames with no canvases or overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("main canvas")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const initialScan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    initialScan.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([]);
  await page.getByRole("button", { name: site.actions.menu }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /Services/ })
    .click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  for (const visual of await page.locator("[data-visual]").all()) {
    await visual.scrollIntoViewIfNeeded();
    await expect(visual.locator("img")).toHaveCount(1);
    await expect
      .poll(() =>
        visual
          .locator("img")
          .evaluate(
            (img) => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0,
          ),
      )
      .toBe(true);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  await page.goto("/contact");
  await expect(page.locator("#name")).toBeVisible();
  await expect(page.locator("main canvas")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "artifacts/contact-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 320, height: 740 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("form preselection, accessible validation and submission confirmation work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto(`/contact?service=${encodeURIComponent(site.contact.services[2])}`);
  await expect(page.locator('main [data-visual="ocean"] canvas')).toHaveCount(1, {
    timeout: 20000,
  });
  await expect(page.locator("#service")).toHaveValue(site.contact.services[2]);
  await page.getByRole("button", { name: site.contact.submit, exact: true }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#message-error")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();
  const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(scan.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
    [],
  );
  await page.locator("#name").fill("Alex Morgan");
  await page.locator("#email").fill("alex@example.com");
  await page.locator("#company").fill("Example Company");
  await page.locator("#budget").selectOption(site.contact.budgets[2]);
  await page
    .locator("#message")
    .fill("We would like to build a lead qualification agent connected to our internal tools.");
  let submitted: Record<string, string> = {};
  await page.route("**/api/contact", async (route) => {
    submitted = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.getByRole("button", { name: site.contact.submit, exact: true }).click();
  await expect(page.getByRole("heading", { name: site.contact.successTitle })).toBeVisible();
  expect(submitted.service).toBe(site.contact.services[2]);
  expect(submitted.email).toBe("alex@example.com");
  await page.getByRole("button", { name: site.contact.another }).click();
  await expect(page.locator("#name")).toHaveValue("");
  await page.screenshot({ path: "artifacts/contact-desktop.png", fullPage: true });
  expect(errors).toEqual([]);
});

test("contact API rejects invalid requests without delivering mail", async ({ request }) => {
  const input = {
    name: "Alex",
    email: "alex@example.com",
    company: "Example",
    budget: site.contact.budgets[0],
    service: site.contact.services[0],
    message: "We would like to discuss a new website with a considered scope.",
    website: "",
  };
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(422);
  expect(
    (
      await request.post("/api/contact", {
        headers: { "Content-Type": "application/json" },
        data: Buffer.from("bad json"),
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        headers: { Origin: "https://other.example" },
        data: input,
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/contact", { data: { ...input, message: "x".repeat(25000) } })
    ).status(),
  ).toBe(413);
  expect(
    (
      await request.post("/api/contact", { data: { ...input, website: "https://spam.example" } })
    ).status(),
  ).toBe(200);
  if (process.env.TEST_CONTACT_UNCONFIGURED === "1") {
    const response = await request.post("/api/contact", { data: input });
    expect(response.status()).toBe(503);
    expect((await response.json()).error).toBe(site.contact.unconfigured);
  }
});

test("SEO endpoints, noindex studies, screenshots and all 19 deferred slots exist", async ({
  request,
}) => {
  for (const path of ["/sitemap.xml", "/robots.txt", "/opengraph-image", "/icon.svg"]) {
    expect((await request.get(path)).status()).toBe(200);
  }
  expect((await request.get("/missing-page")).status()).toBe(404);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /playground");
  const shots = (await readdir("docs/shots")).filter((n) => n.endsWith(".png"));
  expect(shots).toHaveLength(16);
  const slots = (await readdir("components/slots")).filter((n) => n.endsWith(".tsx"));
  expect(slots).toHaveLength(19);
  for (const slot of slots)
    expect(await readFile(`components/slots/${slot}`, "utf8")).toContain("TODO(originkit:");
});
