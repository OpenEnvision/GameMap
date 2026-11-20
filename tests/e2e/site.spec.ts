import { test, expect } from "@playwright/test";

const errors = new WeakMap<object, string[]>();
test.beforeEach(async ({ page }) => {
  const list: string[] = [];
  errors.set(page, list);
  page.on("pageerror", (error) => list.push(error.message));
  page.on("response", (response) => {
    if (
      response.url().startsWith("http://127.0.0.1:4176") &&
      response.status() >= 400
    )
      list.push(`HTTP ${response.status()}: ${response.url()}`);
  });
});
test.afterEach(async ({ page }) => {
  expect(
    errors.get(page),
    "No hydration errors or missing local assets",
  ).toEqual([]);
});

test("home search opens canonical resource results in the global dialog", async ({
  page,
}) => {
  await page.goto("");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Playable worlds",
  );
  await expect(page.locator("video[autoplay]")).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Search all game development content" })
    .fill("OpenAI Codex");
  await page
    .getByRole("button", { name: "Search all content from home", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("combobox")).toHaveValue("OpenAI Codex");
  const result = dialog.locator(
    '[role="option"][id="fd-search-option-resource:codex"]',
  );
  await expect(result).toBeVisible();
  await result.click();
  await expect(page).toHaveURL(/\/resources\/codex\/$/);
  await expect(
    page.getByRole("heading", { name: "OpenAI Codex", exact: true }),
  ).toBeVisible();
});

test("filters, shareable details, bookmarks, persistence, and export", async ({
  page,
  request,
  baseURL,
}) => {
  const catalog = await (
    await request.get(baseURL + "content-manifest.json")
  ).json();
  await page.goto("resources/");
  await expect(page.locator(".resource-tile")).toHaveCount(
    catalog.counts.resource,
  );
  await page
    .getByRole("textbox", { name: "Search resources", exact: true })
    .fill("no-such-resource-123");
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.getByRole("button", { name: "Browse all resources" }).click();
  await expect(page.locator(".resource-tile")).toHaveCount(
    catalog.counts.resource,
  );
  await page
    .getByRole("textbox", { name: "Search resources", exact: true })
    .fill("OpenAI Codex");
  await page
    .getByRole("button", { name: "Save OpenAI Codex", exact: true })
    .click();
  await page
    .locator(".resource-tile")
    .filter({
      has: page.getByRole("heading", { name: "OpenAI Codex", exact: true }),
    })
    .getByRole("button", { name: "View details", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page).toHaveURL(/#resource\/codex$/);
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "OpenAI Codex" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Unsave OpenAI Codex" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /^Saved/ }).click();
  await expect(page.locator(".resource-tile")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".resource-tile")).toHaveCount(1);
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export saved collection as Markdown" })
    .click();
  expect((await download).suggestedFilename()).toBe("gamemap-collection.md");
  await page.goto("resources/?dimension=3d");
  await expect(
    page.getByRole("combobox", { name: "Development track" }),
  ).toHaveValue("3d");
  await page
    .getByRole("combobox", { name: "Development track" })
    .selectOption("all");
  await expect(page.locator(".resource-tile")).toHaveCount(
    catalog.counts.resource,
  );
  await expect(page).not.toHaveURL(/dimension=/);
  await page.goto("resources/#resource/codex");
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "OpenAI Codex" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
});

test("project previews are click-to-play and keep source attribution", async ({
  page,
}) => {
  await page.goto("resources/#resource/streamrender-h3");
  const dialog = page.getByRole("dialog");
  const video = dialog.locator("video:visible");
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("preload", "none");
  expect(
    await video.evaluate(
      (node: HTMLVideoElement) => node.paused && !node.autoplay,
    ),
  ).toBeTruthy();
  await expect(
    dialog.getByRole("link", { name: "Original video" }),
  ).toHaveAttribute("href", /^https:/);
  await page.keyboard.press("Escape");
  await expect(page.locator("video")).toHaveCount(0);
});

test("examples and test-library filters retain source details", async ({
  page,
  request,
  baseURL,
}) => {
  const catalog = await (
    await request.get(baseURL + "content-manifest.json")
  ).json();
  await page.goto("examples/");
  const total = Number(
    await page.locator(".gallery-stat-total dd").innerText(),
  );
  await expect(page.locator("#game-examples > .example-card")).toHaveCount(
    Math.min(60, total),
  );
  await page.getByRole("button", { name: "2D", exact: true }).click();
  await expect(page).toHaveURL(/track=2d/);
  await expect(page.locator("#game-examples .build-notes")).toHaveCount(0);
  const card = page.locator(".example-card").first();
  await expect(
    card.getByRole("link", { name: "Project source", exact: true }),
  ).toHaveAttribute("href", /^https:/);
  const record = page.locator("#opengame-tower-defense");
  await record
    .getByRole("link", { name: "Complete record", exact: true })
    .click();
  await expect(page).toHaveURL(/\/examples\/opengame-tower-defense\/$/);
  await expect(
    page.locator('[data-content-field="demo"]').first(),
  ).toContainText("Play Hajimi Defense");
  await expect(
    page.locator('[data-content-field="source"] a').first(),
  ).toHaveAttribute("href", /^https:/);
  await page.goto("testing/");
  await expect(page.locator(".testing-card")).toHaveCount(
    catalog.counts.testing,
  );
  await page
    .getByRole("textbox", { name: "Search testing resources" })
    .fill("LaFAN1");
  await expect(page.locator(".testing-card")).toHaveCount(1);
  await page.locator(".testing-card summary").click();
  await expect(page.locator(".testing-card .build-notes")).toContainText("30");
  await page.reload();
  await expect(page.locator(".testing-card")).toHaveCount(1);
});

test("documents render on the server and navigate without an API server", async ({
  page,
  request,
  baseURL,
  isMobile,
}) => {
  const response = await request.get(baseURL + "docs/guides/practical-guide/");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain(
    "Define the deliverable before choosing tools",
  );
  await page.goto("docs/guides/practical-guide/");
  await expect(page.locator("#nd-page .prose")).toContainText(
    "Define the deliverable",
  );
  await expect(page.locator("#nd-page table").first()).toBeVisible();
  if (isMobile)
    await page
      .getByRole("button", { name: "Open Sidebar", exact: true })
      .click();
  await expect(page.locator('a[aria-current="page"]')).toContainText(
    "Practical guide",
  );
  if (isMobile) await page.keyboard.press("Escape");
  await page.goto("docs/");
  await expect(page).toHaveURL(/docs\/guides\/practical-guide\/$/);
  await expect(page.locator("#nd-page .prose")).toContainText(
    "Define the deliverable",
  );
});

test("unified full-text search opens a rendered document", async ({ page }) => {
  await page.goto("");
  await page
    .getByRole("button", { name: "Search all content", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog
    .getByRole("combobox")
    .fill("Define the deliverable before choosing tools");
  const result = dialog.getByRole("option").first();
  await expect(result).toBeVisible({ timeout: 20000 });
  await result.click();
  await expect(page).toHaveURL(/\/docs\//);
  await expect(page.locator("#nd-page .prose")).toBeVisible();
});

test("responsive layout, theme toggle, and navigation", async ({
  page,
  isMobile,
}) => {
  await page.goto("");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  // Dark is the default; the toggle switches to the light theme.
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  if (isMobile) {
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    await page
      .getByRole("navigation", { name: "Mobile navigation", exact: true })
      .getByRole("link", { name: "Games", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Open navigation", exact: true }),
    ).toHaveAttribute("aria-expanded", "false");
  }
  await page.goto("docs/reference/testing-library/");
  await expect(page.locator("#nd-page .prose")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
});

test("documents remain readable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL + "docs/guides/practical-guide/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "From resource map to runnable game",
  );
  await expect(page.locator("#nd-page .prose")).toContainText(
    "Define the deliverable before choosing tools",
  );
  await expect(page.locator("#nd-page table").first()).toBeVisible();
  await context.close();
});

test("Chinese documentation has localized navigation and an English counterpart", async ({
  page,
}) => {
  await page.goto("docs/");
  await page
    .locator(".documentation-language")
    .getByRole("link", { name: "中文", exact: true })
    .click();
  await expect(page).toHaveURL(/\/docs\/zh\/guides\/practical-guide\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "从资源地图到可运行的游戏",
  );
  await expect(page.locator("#nd-page .prose")).toContainText(
    "先定义交付物，再选择工具",
  );
  await expect(page.locator("#nd-page .prose")).not.toContainText(
    "不代表 GameMap",
  );
  await page
    .locator(".documentation-language")
    .getByRole("link", { name: "English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/docs\/guides\/practical-guide\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#nd-page .prose")).not.toContainText(
    "This page contains",
  );
});
test("Chinese documentation remains readable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + "docs/zh/guides/practical-guide/");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "从资源地图到可运行的游戏",
    );
    await expect(page.locator("#nd-page .prose")).toContainText(
      "从一个小型可玩循环开始",
    );
    await expect(page.locator("#nd-page table").first()).toBeVisible();
    await expect(
      page
        .locator(".documentation-language")
        .getByRole("link", { name: "English", exact: true }),
    ).toHaveAttribute("href", /\/docs\/guides\/practical-guide\/$/);
  } finally {
    await context.close();
  }
});
test("unknown paths are real 404s, not SPA fallback responses", async ({
  request,
  baseURL,
}) => {
  const response = await request.get(baseURL + "not-a-real-page/");
  expect(response.status()).toBe(404);
  expect(await response.text()).toContain("This path is still uncharted");
});
