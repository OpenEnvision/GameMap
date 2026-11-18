import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
import open3dImport from "../../website/content/open3d-import.config.json" with { type: "json" };
import { researchGamesForExamples } from "../../website/content/research-games";

const context = await loadContent();
const examples = [
  ...context.registry.all("example"),
  ...context.registry.all("foundation"),
];
const importedThreejs = context.registry
  .all("threejs-game")
  .filter((entry) => open3dImport.includedLegacyThreejsIds.includes(entry.id));
const games = researchGamesForExamples(
  context.registry.all("repository-research"),
  [...examples, ...importedThreejs],
);
const researchCards = '.example-card[data-content-ref^="repository-research:"]';
const completeRecord = context.chineseMessages["Complete record"];

test.beforeEach(() => {
  test.skip(
    !games.length,
    "Requires research records with reviewed game build links",
  );
});

test("all games share one card grid and retain complete source records", async ({
  page,
}) => {
  await page.goto("zh/examples/");
  await expect(page.locator("#game-examples.example-grid")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "研究库中的可玩游戏", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "创作者开发案例", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(researchCards)).toHaveCount(games.length);
  await expect(page.locator(".example-card")).toHaveCount(
    examples.length + games.length + importedThreejs.length,
  );
  const identities = await page
    .locator(researchCards)
    .evaluateAll((cards) =>
      cards.map((card) => card.getAttribute("data-content-ref")),
    );
  expect(new Set(identities).size).toBe(games.length);
  const first = page.locator(researchCards).first();
  await expect(first).toHaveAttribute("class", "example-card");
  await expect(
    first.getByRole("link", { name: completeRecord, exact: true }),
  ).toHaveAttribute("href", /\/zh\/research\//);
  await expect(
    first.getByRole("link", { name: "项目源码", exact: true }),
  ).toHaveAttribute("href", /^https:\/\/github\.com\//);
  await expect(first.locator(".example-image")).toHaveAttribute(
    "target",
    "_blank",
  );
  await expect(first.locator(".example-image")).toHaveAttribute(
    "rel",
    "noreferrer",
  );
  await expect(first.locator(".build-notes > summary")).toContainText(
    "项目说明",
  );
  await first.locator(".build-notes > summary").click();
  await expect(
    first.getByRole("link", { name: "入口来源证据", exact: true }),
  ).toBeVisible();
  const detailLink = first.getByRole("link", { name: completeRecord, exact: true });
  const detailURL = new URL((await detailLink.getAttribute("href"))!, page.url()).href;
  await detailLink.click();
  await expect(page).toHaveURL(detailURL);
  await expect(
    page.locator('[data-content-field="game_access"]'),
  ).toContainText("试玩或下载");
});

test("shared search and 2D/3D filters include every game and preserve URL state", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("examples/?campaign=keep");
  await page.getByRole("button", { name: "2D", exact: true }).click();
  await expect(page.locator(researchCards)).toHaveCount(
    games.filter((entry) => entry.data.game_access.track === "2d").length,
  );
  await page.getByRole("button", { name: "3D", exact: true }).click();
  await expect(page.locator(researchCards)).toHaveCount(
    games.filter((entry) => entry.data.game_access.track === "3d").length,
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "3D", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "All games", exact: true }).click();
  const chosen =
    games.find((entry) => entry.data.game_access.title === "Instagib Arena") ||
    games[0];
  const search = page.getByRole("textbox", {
    name: "Search game examples",
    exact: true,
  });
  await search.fill(chosen.data.game_access.title);
  await expect(
    page.locator(`.example-card[data-content-ref="${chosen.key}"]`),
  ).toBeVisible();
  expect(new URL(page.url()).searchParams.get("campaign")).toBe("keep");
  await search.fill("no-research-or-example-match-984529");
  await expect(
    page.getByRole("heading", { name: "No games found.", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await expect(page.locator(researchCards)).toHaveCount(games.length);
  expect(errors).toEqual([]);
});

test("direct image links remain available without JavaScript and fit the viewport", async ({
  browser,
  baseURL,
  isMobile,
}) => {
  const browsing = await browser.newContext({
    javaScriptEnabled: false,
    viewport: isMobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 1000 },
  });
  try {
    const page = await browsing.newPage();
    await page.goto(new URL("zh/examples/", baseURL!).href);
    await expect(page.locator(researchCards)).toHaveCount(games.length);
    await expect(
      page.locator(researchCards).first().locator(".example-image"),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  } finally {
    await browsing.close();
  }
});
