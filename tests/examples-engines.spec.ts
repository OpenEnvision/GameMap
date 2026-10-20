import { test, expect } from "@playwright/test";

const pageErrors = new WeakMap<object, string[]>();
test.beforeEach(({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
});
test.afterEach(async ({ page }) => {
  expect(pageErrors.get(page), "No runtime or hydration errors").toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    "Engine controls and results fit the viewport",
  ).toBeTruthy();
});

test("engine, dimension and search compose and survive a shared URL reload", async ({
  page,
}) => {
  await page.goto("examples/");
  const engines = page.getByRole("combobox", {
    name: "Game engine or renderer",
    exact: true,
  });
  await engines.selectOption("threejs");
  await page.getByRole("button", { name: "3D", exact: true }).click();
  await page.getByRole("textbox", { name: "Search game examples" }).fill("Mosswing");
  await expect(page.locator(".example-grid .example-card")).toHaveCount(1);
  await expect(page.locator("#mosswing-astra")).toBeVisible();
  const sharedUrl = new URL(page.url());
  expect(sharedUrl.searchParams.get("engine")).toBe("threejs");
  expect(sharedUrl.searchParams.get("track")).toBe("3d");
  expect(sharedUrl.searchParams.get("q")).toBe("Mosswing");

  await page.reload();
  await expect(engines).toHaveValue("threejs");
  await expect(page.getByRole("button", { name: "3D", exact: true }))
    .toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("textbox", { name: "Search game examples" }))
    .toHaveValue("Mosswing");
  await expect(page.locator("#mosswing-astra")).toBeVisible();
  await expect(page.locator(".example-grid .example-card")).toHaveCount(1);

  await engines.selectOption("godot");
  await expect(page.locator(".example-grid .example-card")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "No games found." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(engines).toHaveValue("all");
  await expect(page.getByRole("textbox", { name: "Search game examples" }))
    .toHaveValue("");
  await expect(page.getByRole("button", { name: "All games", exact: true }))
    .toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => new URL(page.url()).search).toBe("");
  await expect(page.locator("#mosswing-astra")).toBeVisible();
});

test("hybrid gameplay renderers are discoverable while the separate workbench is excluded", async ({
  page,
}) => {
  for (const engine of ["canvas2d", "threejs"]) {
    await page.goto(`examples/?engine=${engine}&q=Sprout%20Quest`);
    await expect(page.locator("#sprout-quest-claude")).toBeVisible();
  }
  for (const engine of ["html", "webgl"]) {
    await page.goto(`examples/?engine=${engine}&q=Silent%20Meridian`);
    await expect(page.locator("#silent-meridian-codex")).toBeVisible();
  }
  await page.goto("examples/?engine=canvas2d&q=Mini%20KSP");
  await expect(page.locator("#deepseek-mini-ksp")).toBeVisible();
  await page.getByRole("combobox", { name: "Game engine or renderer" })
    .selectOption("threejs");
  await expect(page.locator("#deepseek-mini-ksp")).toHaveCount(0);
  await page.goto("examples/?engine=html&q=Overexposed");
  await expect(page.locator("#overexposed-ai")).toBeVisible();
  await expect(page.locator("#overexposed-ai .example-asset-tools")).toContainText("Canvas 2D");
  await page.getByRole("combobox", { name: "Game engine or renderer" })
    .selectOption("canvas2d");
  await expect(page.locator("#overexposed-ai")).toHaveCount(0);
});

test("Chinese engine controls retain filters and show Blender as asset tooling", async ({
  page,
}) => {
  await page.goto("zh/examples/?engine=threejs&track=3d&q=Project%20Plateau");
  const engines = page.getByRole("combobox", {
    name: "游戏引擎或渲染器",
    exact: true,
  });
  await expect(engines).toHaveValue("threejs");
  await expect(engines.locator('option[value="all"]')).toHaveText("全部引擎");
  await expect(engines.locator("option").filter({ hasText: "Blender" })).toHaveCount(0);
  const plateau = page.locator("#project-plateau");
  await expect(plateau).toBeVisible();
  await expect(plateau.locator(".example-asset-tools")).toContainText("Blender");
  await expect(plateau.locator(".card-meta")).toContainText("Three.js");
  await expect(plateau.locator(".card-meta")).not.toContainText("Blender");
  await page.reload();
  await expect(engines).toHaveValue("threejs");
  await expect(plateau).toBeVisible();
});
