import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
import open3dImport from "../../website/content/open3d-import.config.json" with { type: "json" };
import { researchGamesForExamples } from "../../website/content/research-games";

const content = await loadContent();
const examples = [
  ...content.registry.all("example"),
  ...content.registry.all("foundation"),
];
const importedThreejs = content.registry
  .all("threejs-game")
  .filter((entry) => open3dImport.includedLegacyThreejsIds.includes(entry.id));
const research = researchGamesForExamples(
  content.registry.all("repository-research"),
  [...examples, ...importedThreejs],
);
const total = examples.length + research.length + importedThreejs.length;
const totalWithGameplay =
  [...examples, ...importedThreejs].filter(
    (entry) =>
      content.sources.gameplayScreenshots?.[entry.key] ||
      content.sources.learningMedia[entry.id],
  ).length +
  research.filter((entry) => content.sources.researchGameMedia[entry.id])
    .length;
const totalWithPageCovers = [...examples, ...importedThreejs].filter(
  (entry) =>
    content.sources.pageCovers[entry.key] &&
    !content.sources.gameplayScreenshots?.[entry.key] &&
    !content.sources.learningMedia[entry.id],
).length;
const totalWithMedia = totalWithGameplay + totalWithPageCovers;
const completeRecord = content.chineseMessages["Complete record"];

test("one image-card grid contains every game with no origin headings", async ({
  page,
}) => {
  await page.goto("zh/examples/");
  await expect(page.locator("#game-examples.example-grid")).toHaveCount(1);
  await expect(page.locator("#game-examples > .example-card")).toHaveCount(
    total,
  );
  await expect(page.locator("#game-examples .example-image > img")).toHaveCount(
    totalWithMedia,
  );
  await expect(
    page.locator('#game-examples > [data-cover-kind="gameplay"]'),
  ).toHaveCount(totalWithGameplay);
  await expect(
    page.locator('#game-examples > [data-cover-kind$="-page"]'),
  ).toHaveCount(totalWithPageCovers);
  for (const name of ["研究库中的可玩游戏", "创作者开发案例"])
    await expect(page.getByRole("heading", { name, exact: true })).toHaveCount(
      0,
    );
  const cards = page.locator("#game-examples > .example-card");
  const keys = await cards.evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("data-content-ref")),
  );
  expect(new Set(keys).size).toBe(total);
  const first = cards.first();
  await expect(first.locator(".example-image img")).toBeVisible();
  await expect
    .poll(() =>
      first
        .locator("img")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await expect(first.locator(".example-body .card-meta")).toBeVisible();
  await expect(first.locator(".example-body > h3")).toBeVisible();
  await expect(
    first
      .locator(".example-links")
      .getByRole("link", { name: completeRecord, exact: true }),
  ).toBeVisible();
});

test("shared search, dimensions and image links work for both record owners", async ({
  page,
}) => {
  await page.goto("examples/");
  const search = page.getByRole("textbox", {
    name: "Search game examples",
    exact: true,
  });
  for (const entry of [examples[0], ...research.slice(0, 1)]) {
    const title =
      entry.kind !== "repository-research"
        ? entry.data.title
        : entry.data.game_access.title;
    await search.fill(title);
    const card = page.locator(
      `#game-examples > .example-card[data-content-ref="${entry.key}"]`,
    );
    await expect(card).toBeVisible();
    await expect(card.locator(".example-image img")).toBeVisible();
    await expect(card.locator(".example-image")).toHaveAttribute(
      "target",
      "_blank",
    );
    await expect(card.locator(".example-image")).toHaveAttribute(
      "rel",
      "noreferrer",
    );
  }
  await search.fill("");
  await page.getByRole("button", { name: "2D", exact: true }).click();
  const expected2D =
    examples.filter((entry) => entry.data.track === "2d").length +
    research.filter((entry) => entry.data.game_access.track === "2d").length;
  await expect(page.locator("#game-examples > .example-card")).toHaveCount(
    expected2D,
  );
  await expect(
    page.locator('#game-examples > .example-card:not([data-game-track="2d"])'),
  ).toHaveCount(0);
  await page.reload();
  await expect(page.locator("#game-examples > .example-card")).toHaveCount(
    expected2D,
  );
});

test("image cards and source records remain usable without JavaScript", async ({
  browser,
  baseURL,
  isMobile,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: isMobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 1000 },
  });
  try {
    const page = await context.newPage();
    await page.goto(new URL("zh/examples/", baseURL!).href);
    await expect(page.locator("#game-examples > .example-card")).toHaveCount(
      total,
    );
    await expect(page.locator("#game-examples .example-image img")).toHaveCount(
      totalWithMedia,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (research.length) {
      const first = page
        .locator('.example-card[data-content-ref^="repository-research:"]')
        .first();
      await first
        .getByRole("link", { name: completeRecord, exact: true })
        .click();
      await expect(
        page.locator('[data-content-field="gameplay"] img'),
      ).toHaveCount(1);
    }
  } finally {
    await context.close();
  }
});
