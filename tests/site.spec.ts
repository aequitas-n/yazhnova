import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { site } from "../content/site";
import { mkdir } from "node:fs/promises";

test("home loads without browser errors and its primary interactions work", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.locator("h1")).toHaveAccessibleName(/We build software\s*that thinks\./);
  await expect(page.locator("main section")).toHaveCount(11);
  await mkdir("artifacts", { recursive: true });
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: false });
  const firstQuestion = page.getByRole("button", { name: site.faq.items[0].question });
  await firstQuestion.click();
  await expect(page.getByText(site.faq.items[0].answer, { exact: true })).toBeVisible();
  await firstQuestion.press("Enter");
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: site.actions.next, exact: true }).click();
  await expect(page.locator(".project-info h3")).toContainText("Relay");
  await page.getByRole("button", { name: `${site.work.read}: Relay` }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "Relay", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: site.actions.previous, exact: true }).click();
  await expect(page.locator(".project-info h3")).toContainText("Clarity");
  await page.locator(".agent-chat").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: site.agents.demo.replay }).click();
  await expect(page.locator(".workflow-status")).toHaveClass(/is-complete/, { timeout: 9000 });
  await expect(page.locator(".agent-tasks .task-done")).toHaveCount(3);
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    accessibility.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("contact validates fields, submits the full enquiry and shows confirmation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`/contact?service=${encodeURIComponent(site.contact.services[2])}`);
  await expect(page.locator("#service")).toHaveValue(site.contact.services[2]);
  await page.getByRole("button", { name: site.contact.submit, exact: true }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#message-error")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    accessibility.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([]);
  await page.getByLabel(site.contact.fields.name, { exact: false }).fill("Alex Morgan");
  await page.getByLabel(site.contact.fields.email, { exact: false }).fill("alex@example.com");
  await page.locator("#company").fill("Example Company");
  await page.locator("#budget").selectOption(site.contact.budgets[2]);
  await page
    .locator("#message")
    .fill("We would like to build an AI lead qualification workflow for our sales team.");
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
  expect(submitted.email).toBe("alex@example.com");
  expect(submitted.service).toBe(site.contact.services[2]);
  await page.getByRole("button", { name: site.contact.another }).click();
  await expect(page.locator("#name")).toHaveValue("");
  await page.screenshot({ path: "artifacts/contact-desktop.png", fullPage: true });
  expect(errors).toEqual([]);
});

test("contact API rejects invalid and cross-origin requests and reports missing configuration", async ({
  request,
}) => {
  const input = {
    name: "Alex",
    email: "alex@example.com",
    company: "Example",
    budget: site.contact.budgets[0],
    service: site.contact.services[0],
    message: "A website project with a clear scope and timeline.",
    website: "",
  };
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(422);
  expect(
    (
      await request.post("/api/contact", {
        headers: { "Content-Type": "application/json" },
        data: Buffer.from("not valid json"),
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data: input,
        headers: { Origin: "https://other.example" },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/contact", { data: { ...input, message: "x".repeat(25_000) } })
    ).status(),
  ).toBe(413);
  // Never sends email during tests. Honeypot exits before delivery configuration.
  const bot = await request.post("/api/contact", {
    data: { ...input, website: "https://spam.example" },
  });
  expect(bot.status()).toBe(200);
  if (process.env.TEST_CONTACT_UNCONFIGURED === "1") {
    const result = await request.post("/api/contact", { data: input });
    expect(result.status()).toBe(503);
    expect((await result.json()).error).toBe(site.contact.unavailable);
  }
});

test("mobile navigation, layouts and reduced motion remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await expect(page.locator(".intelligence-card")).toHaveCSS("animation-name", "none");
  await page.getByRole("button", { name: site.actions.menu }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /Services/ })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/#services$/);
  await page.goto("/contact");
  await expect(page.locator("#name")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: "artifacts/contact-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 320, height: 740 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test("SEO endpoints and social image are available", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain(`${site.url}/contact`);
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Disallow: /api/");
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const missing = await request.get("/this-page-does-not-exist");
  expect(missing.status()).toBe(404);
});
