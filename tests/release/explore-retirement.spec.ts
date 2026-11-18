import { test, expect, type Page } from "@playwright/test";

async function searchFromHome(page: Page, query: string, prefix = "") {
  await page.goto(prefix);
  const input = page.locator(".hero-search input");
  await input.fill(query);
  await input.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("combobox")).toHaveValue(query);
  return dialog;
}

test("Explore is retired in both languages, including old filter/search URLs", async ({
  request,
  baseURL,
}) => {
  for (const prefix of ["", "zh/"])
    for (const suffix of ["", "?q=Codex", "?kind=paper&page=2"]) {
      const response = await request.get(
        new URL(prefix + "explore/" + suffix, baseURL).href,
      );
      expect(response.status()).toBe(404);
      expect(response.headers().location).toBeUndefined();
    }
});

test("static homepage navigation reaches each collection without a directory or JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  try {
    const page = await context.newPage();
    for (const prefix of ["", "zh/"]) {
      await page.goto(prefix);
      const links = page.locator("a[data-collection-id]");
      await expect(links).toHaveCount(9);
      const paths = await links.evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("href")!),
      );
      expect(new Set(paths).size).toBe(paths.length);
      for (const path of paths) {
        expect(path).not.toContain("/explore/");
        const response = await page.request.get(path);
        expect(response.status()).toBe(200);
      }
      await expect(page.locator('a[href*="/explore/"]')).toHaveCount(0);
      await expect(page.locator('a[href$="/showcase/"]')).toHaveCount(0);
    }
  } finally {
    await context.close();
  }
});

test("homepage queries open the shared dialog without navigating and retain keyboard focus", async ({
  page,
  baseURL,
}) => {
  const errors: string[] = [],
    retiredRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (/\/(?:zh\/)?explore\//.test(new URL(request.url()).pathname))
      retiredRequests.push(request.url());
  });
  for (const prefix of ["", "zh/"]) {
    const dialog = await searchFromHome(page, "OpenAI Codex", prefix);
    await expect(page).toHaveURL(new URL(prefix, baseURL).href);
    await expect(
      dialog.locator('[role="option"][id="fd-search-option-resource:codex"]'),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(page.locator(".hero-search input")).toBeFocused();
    await page.locator(".hero-search input").fill("Claude Code");
    await page.locator(".hero-search button").click();
    await expect(dialog.getByRole("combobox")).toHaveValue("Claude Code");
    await expect(
      dialog.locator(
        '[role="option"][id="fd-search-option-resource:claude-code"]',
      ),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await page.locator("button.global-search").click();
    await expect(dialog.getByRole("combobox")).toHaveValue("Claude Code");
    await page.keyboard.press("Escape");
    await page.keyboard.press("ControlOrMeta+k");
    await expect(dialog).toBeVisible();
    await dialog
      .locator('[role="option"][id="fd-search-option-resource:claude-code"]')
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/${prefix}resources/claude-code/$`),
    );
  }
  expect(retiredRequests).toEqual([]);
  expect(errors).toEqual([]);
});

test("the same query refreshes to the selected language instead of navigating to stale English results", async ({
  page,
}) => {
  let release!: () => void;
  let requested = false;
  const waiting = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/zh/search-index.json", async (route) => {
    requested = true;
    await waiting;
    await route.continue();
  });
  try {
    const dialog = await searchFromHome(page, "OpenAI Codex");
    const result = dialog.locator(
      '[role="option"][id="fd-search-option-resource:codex"]',
    );
    await expect(result).toBeVisible();
    await page.keyboard.press("Escape");
    await page
      .locator(".site-header .site-language")
      .getByRole("link", { name: "中文", exact: true })
      .click();
    await page.locator("button.global-search").click();
    await expect(dialog.getByRole("combobox")).toHaveValue("OpenAI Codex");
    await expect.poll(() => requested).toBe(true);
    await expect(result).toHaveCount(0);
    release();
    await expect(result).toBeVisible();
    await result.click();
    await expect(page).toHaveURL(/\/zh\/resources\/codex\/$/);
  } finally {
    release();
  }
});

test("an unavailable index is reported and retried for a subsequent dialog query", async ({
  page,
}) => {
  let requests = 0;
  await page.route("**/search-index.json", (route) => {
    requests++;
    return requests === 1
      ? route.fulfill({ status: 503, body: "Unavailable" })
      : route.continue();
  });
  const dialog = await searchFromHome(page, "OpenAI Codex");
  await expect(
    dialog.getByRole("status").filter({ hasText: "Search failed" }),
  ).toBeVisible();
  await dialog.getByRole("combobox").fill("Claude Code");
  await expect(
    dialog.locator(
      '[role="option"][id="fd-search-option-resource:claude-code"]',
    ),
  ).toBeVisible();
  await expect(
    dialog.getByRole("status").filter({ hasText: "Search failed" }),
  ).toHaveCount(0);
  expect(requests).toBe(2);
});

test("late search responses cannot restore a cleared query or results", async ({
  page,
}) => {
  let release!: () => void;
  let requested = false;
  const waiting = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/search-index.json", async (route) => {
    requested = true;
    await waiting;
    await route.continue();
  });
  try {
    const dialog = await searchFromHome(page, "Codex");
    await expect.poll(() => requested).toBe(true);
    await dialog.getByRole("combobox").fill("Claude");
    await dialog.getByRole("combobox").fill("");
    release();
    await expect(dialog.getByRole("combobox")).toHaveValue("");
    await expect(dialog.getByRole("option")).toHaveCount(0);
    await dialog.getByRole("combobox").fill("OpenAI Codex");
    await expect(
      dialog.locator('[role="option"][id="fd-search-option-resource:codex"]'),
    ).toBeVisible();
  } finally {
    release();
  }
});
