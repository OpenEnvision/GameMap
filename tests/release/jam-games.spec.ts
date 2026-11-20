import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
import { pageCoverAlt } from "../../website/content/media";

const content = await loadContent();
const game = content.registry
  .all("example")
  .find((entry) => entry.data.category === "community")!;
const screenshot = content.sources.learningMedia[game.id];
const pageCover = content.sources.pageCovers[game.key];

test("ordinary source-reviewed games are searchable without invented AI attribution or screenshot pixels", async ({
  page,
}) => {
  await page.goto("examples/");
  await page
    .getByRole("textbox", { name: "Search game examples", exact: true })
    .fill(game.data.title);
  const card = page.locator(`[data-content-ref="${game.key}"]`);
  await expect(card).toBeVisible();
  if (screenshot) {
    await expect(card.locator("img")).toHaveCount(1);
    await expect(card.locator("img")).toHaveAttribute("alt", screenshot.alt);
    await expect(card.locator(".game-preview-unavailable")).toHaveCount(0);
  } else if (pageCover) {
    await expect(card.locator("img")).toHaveAttribute(
      "alt",
      pageCoverAlt(pageCover.alt),
    );
    await expect(card.locator(".page-cover-label")).toHaveText(
      pageCover.origin === "catalog-page-capture"
        ? "GameMap page screenshot"
        : "Project page screenshot",
    );
  } else {
    await expect(card.locator(".game-preview-unavailable")).toHaveText(
      "No screenshot available",
    );
    await expect(card.locator("img")).toHaveCount(0);
  }
  await expect(card.locator(".example-image")).toHaveAttribute(
    "href",
    game.data.demo.url,
  );
  await expect(
    card.getByRole("link", { name: "Project source", exact: true }),
  ).toHaveAttribute("href", game.data.source.url);
  await page
    .getByRole("combobox", { name: "Client or model", exact: true })
    .selectOption("claude-code");
  await expect(card).toHaveCount(0);
  await page
    .getByRole("combobox", { name: "Client or model", exact: true })
    .selectOption("all");
  await expect(card).toBeVisible();
  await card
    .getByRole("link", { name: "Complete record", exact: true })
    .click();
  await expect(page.locator("#record-provenance")).toHaveCount(0);
  await expect(page.locator('[data-content-field="category"]')).toHaveCount(0);
  await expect(page.locator('[data-content-field="aiUse"]')).toHaveCount(0);
  await expect(page.locator('[data-content-field="steps"]')).toHaveCount(0);
  await expect(page.locator("#record-guidance")).toHaveCount(0);
});

test("Chinese game introductions remain localized and the public evidence ledger is accessible", async ({
  page,
  request,
}) => {
  await page.goto("zh/examples/");
  await page.locator("input").first().fill(game.data.title);
  const card = page.locator(`[data-content-ref="${game.key}"]`);
  await expect(card).toBeVisible();
  await expect(card.locator(".example-body > p")).toContainText(
    /[\p{Script=Han}]/u,
  );
  if (screenshot) {
    await expect(card.locator("img")).toHaveCount(1);
    await expect(card.locator(".game-preview-unavailable")).toHaveCount(0);
  } else if (pageCover) {
    await expect(card.locator("img")).toHaveCount(1);
    await expect(card.locator(".page-cover-label")).toContainText(
      /(?:GameMap 资料页|项目页面)截图/,
    );
  } else {
    await expect(card.locator(".game-preview-unavailable")).toHaveText(
      "暂无截图",
    );
  }
  await expect(page.locator(".gallery-hero .heading-links")).toHaveCount(0);
  const response = await request.get("jam-discovery.json");
  expect(response.ok()).toBe(true);
  const ledger = await response.json();
  expect(
    ledger.accepted.some((entry: { id: string }) => entry.id === game.id),
  ).toBe(true);
  expect(ledger.verification).toContain("not independently verified");
});
