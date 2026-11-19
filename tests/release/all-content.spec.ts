import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
import {
  researchGamesForExamples,
  researchNotInExamples,
} from "../../website/content/research-games";

const content = await loadContent();
const papers = content.registry.all("paper");
const projects = content.registry.all("threejs-game");
const examples = content.registry.all("example");
const nativeGames = [
  ...examples,
  ...content.registry.all("foundation"),
  ...projects,
];
const repositories = content.registry.all("repository-research");
const researchGames = researchGamesForExamples(repositories, nativeGames);
const unlisted = researchNotInExamples(repositories, nativeGames);

test("a complete preview never substitutes the Git-only catalog for the selected release", async ({
  request,
}) => {
  test.skip(content.inputMode !== "release", "Requires a frozen release input");
  const response = await request.get("content-manifest.json");
  expect(response.ok()).toBe(true);
  const manifest = await response.json();
  expect(manifest.source.mode).toBe("release");
  expect(manifest.counts.paper).toBe(papers.length);
  expect(manifest.counts["threejs-game"]).toBe(projects.length);
  expect(manifest.counts.example).toBe(examples.length);
  expect(
    manifest.records.map((row: { key: string }) => row.key).sort(),
  ).toEqual(content.registry.entries.map((entry) => entry.key).sort());
});

for (const prefix of ["", "zh/"]) {
  test(`${prefix || "en/"}papers, 3D projects, existing games and community additions coexist`, async ({
    page,
  }) => {
    test.skip(
      !papers.length || !projects.length,
      "Requires the complete database catalog",
    );
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${prefix}papers/`);
    await expect(page.locator(".catalog-paper-row")).toHaveCount(
      Math.min(24, papers.length),
    );
    await expect(page.locator(".collection-total")).toContainText(
      String(papers.length),
    );
    await page.goto(`${prefix}threejs-games/`);
    await expect(page).toHaveURL(new RegExp(`/${prefix}examples/$`));
    await expect(page.locator("#game-examples > .example-card")).toHaveCount(
      nativeGames.length + researchGames.length,
    );
    const threejsCard = page.locator(`[data-content-ref="${projects[0].key}"]`);
    await expect(
      threejsCard.getByRole("link", {
        name: content.translate(prefix ? "zh" : "en", "Complete record"),
        exact: true,
      }),
    ).toHaveAttribute(
      "href",
      new RegExp(`/${prefix}examples/${projects[0].id}/$`),
    );
    const gameKeys = await page
      .locator("#game-examples > .example-card")
      .evaluateAll((cards) =>
        cards.map((card) => card.getAttribute("data-content-ref")),
      );
    expect(new Set(gameKeys)).toEqual(
      new Set([...nativeGames, ...researchGames].map((entry) => entry.key)),
    );
    await page.goto(`${prefix}research/`);
    await expect(
      page.locator('main [data-content-ref^="repository-research:"]'),
    ).toHaveCount(unlisted.length);
    const remaining = await page
      .locator('main [data-content-ref^="repository-research:"]')
      .evaluateAll((cards) =>
        cards.map((card) => card.getAttribute("data-content-ref")),
      );
    expect(remaining.filter((key) => gameKeys.includes(key))).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("the full paper and game collections also coexist without JavaScript", async ({
  browser,
  baseURL,
}) => {
  test.skip(!papers.length, "Requires the complete database catalog");
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(new URL("zh/papers/", baseURL!).href);
    await expect(page.locator(".catalog-paper-row")).toHaveCount(papers.length);
    await page.goto(new URL("zh/examples/", baseURL!).href);
    await expect(page.locator("#game-examples > .example-card")).toHaveCount(
      nativeGames.length + researchGames.length,
    );
  } finally {
    await context.close();
  }
});
