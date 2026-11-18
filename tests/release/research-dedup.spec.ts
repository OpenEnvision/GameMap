import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
import open3dImport from "../../website/content/open3d-import.config.json" with { type: "json" };
import {
  researchGamesForExamples,
  researchNotInExamples,
} from "../../website/content/research-games";

const content = await loadContent();
const records = content.registry.all("repository-research");
const examples = [
  ...content.registry.all("example"),
  ...content.registry.all("foundation"),
  ...content.registry
    .all("threejs-game")
    .filter((entry) =>
      open3dImport.includedLegacyThreejsIds.includes(entry.id),
    ),
];
const promoted = researchGamesForExamples(records, examples);
const remaining = researchNotInExamples(records, examples);
const selector = 'main [data-content-ref^="repository-research:"]';

for (const prefix of ["", "zh/"]) {
  test(`${prefix || "en/"}research lists only projects absent from examples, while evidence details remain`, async ({
    page,
    request,
    baseURL,
  }) => {
    await page.goto(`${prefix}research/`);
    await expect(page.locator(selector)).toHaveCount(remaining.length);
    const keys = await page
      .locator(selector)
      .evaluateAll((rows) =>
        rows.map((row) => row.getAttribute("data-content-ref")),
      );
    expect(new Set(keys)).toEqual(new Set(remaining.map((entry) => entry.key)));
    await page.goto(`${prefix}examples/`);
    await expect(page.locator("#game-examples > .example-card")).toHaveCount(
      examples.length + promoted.length,
    );
    const exampleKeys = await page
      .locator("#game-examples > .example-card")
      .evaluateAll((rows) =>
        rows.map((row) => row.getAttribute("data-content-ref")),
      );
    expect(exampleKeys.filter((key) => keys.includes(key))).toEqual([]);
    const ledger = await (
      await request.get(new URL("repository-research.json", baseURL!).href)
    ).json();
    expect(ledger.records).toHaveLength(records.length);
    if (promoted.length) {
      const entry = promoted[0];
      await page.goto(prefix + entry.url.replace(/^\//, ""));
      await expect(
        page.locator(`[data-content-key="${entry.key}"]`),
      ).toBeVisible();
      await expect(
        page.locator('[data-content-field="game_access"]'),
      ).toBeVisible();
      await expect(
        page.locator('[data-content-field="gameplay"] img'),
      ).toHaveCount(1);
    }
  });
}

test("research search and disposition filtering never bring listed games back", async ({
  page,
}) => {
  test.skip(!remaining.length, "Requires an unlisted research project");
  await page.goto("research/");
  const search = page.getByRole("textbox", {
    name: "Search repository research",
    exact: true,
  });
  await search.fill(remaining[0].title);
  await expect(
    page.locator(`[data-content-ref="${remaining[0].key}"]`),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Research disposition", exact: true })
    .selectOption(remaining[0].data.disposition);
  await expect(
    page.locator(`[data-content-ref="${remaining[0].key}"]`),
  ).toBeVisible();
  const allowed = new Set<string>(remaining.map((entry) => entry.key));
  const keys = await page
    .locator(selector)
    .evaluateAll((rows) =>
      rows.map((row) => row.getAttribute("data-content-ref")),
    );
  expect(keys.every((key) => key && allowed.has(key))).toBe(true);
  await search.fill("no-unlisted-research-project-matches-821731");
  await expect(page.locator(selector)).toHaveCount(0);
  await expect(page.locator(".empty-state")).toBeVisible();
});

test("research deduplication also applies without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(new URL("zh/research/", baseURL!).href);
    await expect(page.locator(selector)).toHaveCount(remaining.length);
    const keys = await page
      .locator(selector)
      .evaluateAll((rows) =>
        rows.map((row) => row.getAttribute("data-content-ref")),
      );
    for (const entry of promoted) expect(keys).not.toContain(entry.key);
  } finally {
    await context.close();
  }
});
