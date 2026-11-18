import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { loadContent } from "../../scripts/lib/content.mjs";
const content = await loadContent();
const manifest = JSON.parse(readFileSync("dist/content-manifest.json", "utf8"));
const full = manifest.records.some(
  (row: { kind: string }) => row.kind === "paper",
);

test("paper pages preserve shared filters, restore history and reset stale pagination", async ({
  page,
}) => {
  test.skip(!full, "Requires the full remote snapshot");
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("papers/?page=2&campaign=keep");
  const rows = page.locator(".catalog-paper-row");
  const top = page.getByRole("navigation", {
    name: "Collection pages",
    exact: true,
  });
  await expect(rows).toHaveCount(24);
  const first = await rows.first().getAttribute("data-content-ref");
  await top.getByRole("button", { name: "Next page", exact: true }).click();
  await expect(page).toHaveURL(/page=3/);
  await expect(page.locator("#collection-results")).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/page=2/);
  await expect(rows.first()).toHaveAttribute("data-content-ref", first!);
  await page.goto("papers/?page=9999999&campaign=keep");
  await expect(rows).toHaveCount(3);
  await page
    .getByRole("searchbox", { name: "Search papers", exact: true })
    .fill("no-paper-matches-987654");
  await expect(page.locator(".catalog-empty")).toBeVisible();
  expect(new URL(page.url()).searchParams.has("page")).toBe(false);
  await page
    .locator(".catalog-empty")
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await expect(rows).toHaveCount(24);
  expect(new URL(page.url()).searchParams.get("campaign")).toBe("keep");
  expect(errors).toEqual([]);
});

test("paper research, year and source filters compose and retain source status", async ({
  page,
  isMobile,
}) => {
  test.skip(!full, "Requires the full remote snapshot");
  await page.goto("papers/?status=stale&year=stale&sort=stale&campaign=keep");
  await expect(page.locator(".catalog-paper-row")).toHaveCount(24);
  await page
    .getByRole("combobox", { name: "Publication year", exact: true })
    .selectOption("2026");
  if (isMobile)
    await page
      .getByRole("combobox", { name: "Research area", exact: true })
      .selectOption("play");
  else
    await page
      .locator(".catalog-area-list button")
      .filter({ hasText: "Play & agents" })
      .click();
  await page.locator(".catalog-refinements > summary").click();
  await page
    .getByRole("combobox", { name: "Source status", exact: true })
    .selectOption("open-source");
  const matching = content.registry
    .all("paper")
    .filter(
      (entry) =>
        entry.data.year === 2026 &&
        entry.data.roles.includes("play") &&
        entry.data.access.codeStatus === "open-source",
    );
  expect(matching.length).toBeGreaterThan(0);
  await expect(page.locator(".catalog-paper-row")).toHaveCount(
    Math.min(24, matching.length),
  );
  for (const row of await page.locator(".catalog-paper-row").all()) {
    await expect(row.locator(".catalog-record-meta")).toContainText("2026");
    await expect(row.locator(".catalog-source-status")).toHaveText(
      "Open source",
    );
  }
  const params = new URL(page.url()).searchParams;
  expect(params.get("area")).toBe("play");
  expect(params.get("status")).toBe("open-source");
  expect(params.get("campaign")).toBe("keep");
});

test("game genre and license filters expose evidence without claiming playtesting", async ({
  page,
}) => {
  test.skip(!full, "Requires the full remote snapshot");
  await page.goto("threejs-games/");
  await expect(page.locator(".catalog-game-card")).toHaveCount(24);
  await page
    .getByRole("combobox", { name: "Genre", exact: true })
    .selectOption("puzzle");
  await page.locator(".catalog-refinements > summary").click();
  await page
    .getByRole("combobox", { name: "License", exact: true })
    .selectOption("MIT");
  const matching = content.registry
    .all("threejs-game")
    .filter(
      (entry) =>
        entry.data.genres.includes("puzzle") &&
        entry.data.license.spdx === "MIT",
    );
  await expect(page.locator(".catalog-game-card")).toHaveCount(
    Math.min(24, matching.length),
  );
  await expect(page.locator(".catalog-game-card").first()).toBeVisible();
  for (const card of await page.locator(".catalog-game-card").all()) {
    await expect(card.locator(".catalog-license")).toHaveText("MIT");
    await expect(card.locator(".catalog-game-review")).toContainText(
      "Not playtested",
    );
  }
  const first = page.locator(".catalog-game-card").first();
  const key = await first.getAttribute("data-content-ref");
  await first.locator("h2 a").click();
  await expect(page.locator(`[data-content-key="${key}"]`)).toBeVisible();
  const outline = page.getByRole("navigation", {
    name: "On this record",
    exact: true,
  });
  await expect(outline).toBeVisible();
  await outline
    .getByRole("link", { name: "Sources & evidence", exact: true })
    .click();
  await expect(page).toHaveURL(/#record-provenance$/);
  await expect(page.locator(".record-provenance")).toBeVisible();
});

test("static collections expose every record and canonical Chinese guides hydrate cleanly", async ({
  browser,
  baseURL,
}) => {
  test.skip(!full, "Requires the full remote snapshot");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  try {
    const page = await context.newPage();
    await page.goto("papers/");
    await expect(page.locator(".catalog-paper-row")).toHaveCount(483);
    await expect(page.locator("noscript > p")).toContainText(
      "All records are shown",
    );
    await page.goto("threejs-games/");
    await expect(page.locator(".catalog-game-card")).toHaveCount(
      content.registry.all("threejs-game").length,
    );
  } finally {
    await context.close();
  }
  const hydrated = await browser.newContext({ baseURL });
  try {
    const page = await hydrated.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("docs/zh/guides/practical-guide/");
    expect(response?.status()).toBe(200);
    await expect(page.locator(".reader-prose")).toHaveAttribute(
      "lang",
      "zh-CN",
    );
    await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
    await expect(page.locator(".reader-title")).toContainText(
      "从资源地图到可运行的游戏",
    );
    expect(errors).toEqual([]);
  } finally {
    await hydrated.close();
  }
});

test("catalog layouts fit narrow screens and both themes without clipping controls", async ({
  page,
}, testInfo) => {
  test.skip(
    !full || testInfo.project.name !== "desktop",
    "One explicit viewport matrix for the full snapshot",
  );
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 800, 1120, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    for (const theme of ["light", "dark"]) {
      await page.addInitScript(
        (value) => localStorage.setItem("theme", value),
        theme,
      );
      for (const path of ["zh/", "zh/papers/", "zh/threejs-games/"]) {
        await page.goto(path);
        await expect(page.locator("html")).toHaveClass(new RegExp(theme));
        await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${width}px ${theme} ${path}`,
        ).toBe(true);
        await expect(page.locator("h1")).toBeVisible();
        if (width >= 1120 && path !== "zh/") {
          const contrast = await page
            .locator('.catalog-area-list button[aria-pressed="true"]')
            .evaluate((element) => {
              const style = getComputedStyle(element);
              const luminance = (color: string) => {
                const channels = (color.match(/[\d.]+/g) || [])
                  .slice(0, 3)
                  .map((value) => Number(value) / 255)
                  .map((value) =>
                    value <= 0.04045
                      ? value / 12.92
                      : ((value + 0.055) / 1.055) ** 2.4,
                  );
                return (
                  channels[0] * 0.2126 +
                  channels[1] * 0.7152 +
                  channels[2] * 0.0722
                );
              };
              const foreground = luminance(style.color),
                background = luminance(style.backgroundColor);
              return (
                (Math.max(foreground, background) + 0.05) /
                (Math.min(foreground, background) + 0.05)
              );
            });
          expect(
            contrast,
            `${theme} selected collection label contrast`,
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  }
  expect(errors).toEqual([]);
});
