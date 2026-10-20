import { expect, test } from "@playwright/test";

test("filtered directory links always point to rendered sections", async ({ page }) => {
  await page.goto("explore/?kind=agent");
  const kind = page.getByRole("combobox", { name: "Content type", exact: true });
  await expect(kind).toHaveValue("agent");
  const overview = page.getByRole("navigation", { name: "Content types", exact: true });
  await expect(overview.locator('a[href$="#resource"]')).toHaveCount(0);
  await expect(overview.locator('a[href$="#agent"]')).toHaveCount(1);
  await overview.locator('a[href$="#agent"]').click();
  await expect(page.locator("#agent")).toBeInViewport();
  await expect(kind).toHaveValue("agent");

  await kind.selectOption("all");
  await expect(overview.locator('a[href$="#resource"]')).toHaveCount(1);
  for (const href of await overview.locator("a").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")!),
  )) {
    const hash = new URL(href, page.url()).hash;
    await expect(page.locator(hash)).toHaveCount(1);
  }
});

test("testing navigation reaches the library and starters link to real records", async ({ page }) => {
  await page.goto("testing/");
  await expect(page.locator("[data-client-ready]")).toHaveAttribute("data-client-ready", "true");
  await page.locator('.discovery-jump-links a[href$="#testing-resources"]').click();
  await expect(page.getByRole("textbox", { name: "Search testing resources", exact: true })).toBeInViewport();
  await page.locator('.discovery-jump-links a[href$="#testing-starters"]').click();
  const starters = page.locator('.testing-starters [data-content-kind="testing-pack"]');
  await expect(starters).toHaveCount(3);
  for (const starter of await starters.all()) {
    await expect(starter.locator('[data-content-field="testingIds"] a')).toHaveCount(3);
    await expect(starter.locator('[data-content-field="check"]')).not.toBeEmpty();
  }
  await page.locator('[data-content-key="testing-pack:asset-through-pipeline"] a[href$="/testing/kenney-animated-characters/"]').click();
  await expect(page.getByRole("heading", { name: "Kenney Animated Characters", exact: true })).toBeVisible();
});

test("every path step has tool links and checkpoints with localized destinations", async ({ page }) => {
  await page.goto("paths/");
  await page.locator('[data-content-ref="path:2d"]').getByRole("link", { name: "Start with the first step", exact: true }).click();
  await expect(page).toHaveURL(/\/paths\/2d\/#scope$/);
  for (const track of ["2d", "3d", "world"]) {
    await page.goto(`paths/${track}/`);
    const steps = page.locator('.path-steps [data-content-kind="step"]');
    await expect(steps).toHaveCount(6);
    for (const step of await steps.all()) {
      expect(await step.locator('[data-content-field="resourceIds"] a').count()).toBeGreaterThan(0);
      await expect(step.locator('[data-content-field="check"]')).not.toBeEmpty();
    }
  }
  await page.goto("zh/paths/2d/#engine");
  const tools = page.locator('#engine [data-content-field="resourceIds"] a');
  await expect(tools).toHaveCount(3);
  for (const href of await tools.evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
    expect(href).toMatch(/\/zh\/resources\/[^/]+\/$/);
  }
});

test("agent section links reach both tools and attributed games", async ({ page }) => {
  await page.goto("agents/?client=claude-code");
  const client = page.getByRole("combobox", { name: "Client or model", exact: true });
  await expect(client).toHaveValue("claude-code");
  await page.locator('.discovery-jump-links a[href$="#agent-games"]').click();
  await expect(page.locator("#agent-games > h2")).toBeInViewport();
  await expect(client).toHaveValue("claude-code");
  await page.locator('.discovery-jump-links a[href$="#agent-tools"]').click();
  await expect(page.locator("#agent-tools > h2")).toBeInViewport();
  await expect(client).toHaveValue("claude-code");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
