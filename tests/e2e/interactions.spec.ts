import { expect, test, type Page } from "@playwright/test";

async function searchFromHome(page: Page, query: string) {
  await page.goto("");
  await page
    .getByRole("textbox", { name: "Search all game development content" })
    .fill(query);
  await page
    .getByRole("button", { name: "Search all content from home", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("combobox")).toHaveValue(query);
  return dialog;
}

for (const width of [390, 800]) {
  test(`site-shell mobile disclosure dismisses at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("resources/");
    const toggle = page.locator("#mobile-navigation-button");
    const navigation = page.locator("#mobile-navigation");
    await toggle.click();
    await navigation
      .getByRole("link", { name: "Resources", exact: true })
      .click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(navigation).toHaveCount(0);
    // The menu is a full-screen sheet; the toggle (now "Close navigation") dismisses it.
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-label", "Close navigation");
    await toggle.click();
    await expect(navigation).toHaveCount(0);
    await toggle.click();
    await navigation
      .getByRole("link", { name: "Game examples", exact: true })
      .click();
    await expect(page).toHaveURL(/examples\/$/);
    await expect(navigation).toHaveCount(0);
  });
}

test("site-shell pillar panels keep native keyboard activation and dismiss", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("resources/");
  const menu = page.locator('.nav-pillar[data-pillar="tools"]');
  const summary = menu.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  await summary.click();
  await page.locator("h1").click({ position: { x: 8, y: 8 } });
  await expect(menu).not.toHaveAttribute("open", "");
  await summary.click();
  // Panel links carry a one-line description after the destination name.
  await menu.getByRole("link", { name: /^Agent toolkit\b/ }).click();
  await expect(menu).not.toHaveAttribute("open", "");
});

test("resources ignores stale URL filters, preserves aliases and unrelated state", async ({
  page,
  request,
}) => {
  const manifest = await (await request.get("content-manifest.json")).json();
  await page.goto(
    "resources/?category=stale&type=stale&stage=stale&track=stale&sort=stale&campaign=keep",
  );
  await expect(page.locator(".resource-tile")).toHaveCount(
    manifest.counts.resource,
  );
  for (const name of [
    "Resource type",
    "Development stage",
    "Development track",
  ])
    await expect(page.getByRole("combobox", { name, exact: true })).toHaveValue(
      "all",
    );
  await expect(
    page.getByRole("combobox", { name: "Sort resources" }),
  ).toHaveValue("curated");
  await page.reload();
  await expect(page.locator(".resource-tile")).toHaveCount(
    manifest.counts.resource,
  );
  await page
    .getByRole("combobox", { name: "Development track" })
    .selectOption("2d");
  await expect(page).toHaveURL(/campaign=keep/);
  await page.goto("resources/?dimension=3d&campaign=keep#resource/codex");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("combobox", { name: "Development track" }),
  ).toHaveValue("3d");
  await page
    .getByRole("combobox", { name: "Development track" })
    .selectOption("2d");
  await expect(page).toHaveURL(/campaign=keep/);
  expect(new URL(page.url()).searchParams.has("dimension")).toBe(false);
  await page
    .getByLabel("Search resources", { exact: true })
    .fill("no-such-resource-987654");
  await expect(page.locator(".empty-state")).toBeVisible();
});

test("the search dialog ranks canonical results without a separate directory page", async ({
  page,
}) => {
  await page.route("**/search-index.json", (route) =>
    route.fulfill({
      json: {
        version: 2,
        documents: [
          {
            key: "resource:codex",
            kind: "resource",
            title: "Secondary",
            text: "ranking-probe",
            url: "/resources/codex/",
          },
          {
            key: "resource:claude-code",
            kind: "resource",
            title: "ranking-probe",
            text: "ranking-probe",
            url: "/resources/claude-code/",
          },
        ],
      },
    }),
  );
  const dialog = await searchFromHome(page, "ranking-probe");
  const options = dialog.getByRole("option");
  await expect(options).toHaveCount(2);
  await expect(options.first()).toHaveAttribute(
    "id",
    "fd-search-option-resource:claude-code",
  );
  await expect(dialog.locator(".content-overview")).toHaveCount(0);
  await options.first().click();
  await expect(page).toHaveURL(/\/resources\/claude-code\/$/);
});

test("failed full text is reported and retried on the next dialog query", async ({
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

test("a delayed index response cannot restore a cleared dialog query", async ({
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

test("home wall of games is image only, lazy and leads into the full gallery", async ({
  page,
}) => {
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (/\.(mp4|webm)(\?|$)/.test(request.url()))
      mediaRequests.push(request.url());
  });
  await page.goto("");
  const wall = page.getByRole("region", {
    name: "Made with AI. Ready to explore.",
  });
  await expect(wall).toBeVisible();
  // The tilted wall is decorative: hidden from assistive technology and the tab order.
  const stage = wall.locator(".game-wall-stage");
  await expect(stage).toHaveAttribute("aria-hidden", "true");
  const tiles = stage.locator("a.game-wall-card");
  expect(await tiles.count()).toBeGreaterThan(40);
  for (const tile of await tiles.all())
    await expect(tile).toHaveAttribute("tabindex", "-1");
  await expect(stage.locator("img").first()).toHaveAttribute("loading", "lazy");
  // The accessible way in is the call to action with the live total.
  const total = (await wall.locator(".game-wall-count").innerText()).trim();
  expect(Number(total)).toBeGreaterThan(1000);
  await wall.getByRole("link", { name: new RegExp(total) }).click();
  await expect(page).toHaveURL(/\/examples\/$/);
  await expect(page.locator("video")).toHaveCount(0);
  expect(mediaRequests).toEqual([]);
});

for (const width of [320, 390, 800, 1050, 1440]) {
  test(`frontend atlas fits ${width}px in both locales and themes`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Explicit viewport matrix runs once",
    );
    await page.setViewportSize({ width, height: 1000 });
    for (const locale of ["", "zh/"]) {
      for (const theme of ["dark", "light"]) {
        await page.addInitScript(
          (value) => localStorage.setItem("theme", value),
          theme,
        );
        for (const route of ["", "resources/", "papers/"]) {
          await page.goto(locale + route);
          await expect(page.locator("html")).toHaveClass(new RegExp(theme));
          await expect(page.locator("h1")).toBeVisible();
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
            `${locale}${route} ${theme}`,
          ).toBe(true);
          if (!route) {
            await expect(page.locator(".game-wall")).toHaveCount(1);
            await expect(page.locator(".hero-search input")).toBeVisible();
            await expect(page.locator(".header-controls")).toBeInViewport();
          }
        }
      }
    }
  });
}

test("navigation marks the current pillar and section in static and hydrated pages", async ({
  browser,
  baseURL,
}) => {
  for (const javaScriptEnabled of [false, true]) {
    const context = await browser.newContext({
      javaScriptEnabled,
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    await page.goto(baseURL + "examples/");
    await expect(
      page.locator('.desktop-navigation a[aria-current="page"]'),
    ).toHaveText(/Game examples/);
    await expect(
      page.locator('.nav-pillar[data-pillar="games"]'),
    ).toHaveAttribute("data-active", "true");
    await expect(
      page.locator('.site-header .site-language a[hreflang="zh-CN"]'),
    ).toHaveAttribute("href", /\/zh\/examples\/$/);
    await context.close();
  }
});
