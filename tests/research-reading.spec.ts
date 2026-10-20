import { expect, test } from "@playwright/test";

const rows = "[data-research-row]";
const indexEntries = '.research-index [data-content-ref^="repository-research:"]';

test("research reads in real pages while the complete index preserves every identity", async ({ page }) => {
  await page.goto("research/");
  await expect(page.locator("[data-client-ready]")).toHaveAttribute("data-client-ready", "true");
  await expect(page.getByRole("heading", { name: "Repository research", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Methodology & sources", exact: true })).toHaveAttribute("href", /\/docs\/cadle-repositories\/$/);
  await expect(page.getByRole("link", { name: "Paper List", exact: true })).toHaveAttribute("href", /\/papers\/$/);
  await expect(page.locator(rows)).toHaveCount(24);
  const first = await page.locator(rows).first().getAttribute("data-research-row");
  await expect(page.locator(indexEntries)).toHaveCount(213);
  const keys = await page.locator(indexEntries).evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-content-ref")));
  expect(new Set(keys).size).toBe(213);
  await expect(page.locator('main [data-content-ref^="repository-research:"]')).toHaveCount(213);

  const top = page.getByRole("navigation", { name: "Research page controls", exact: true });
  await top.getByRole("link", { name: "Next", exact: true }).click();
  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBe("2");
  await expect(page.locator(rows)).toHaveCount(24);
  await expect(page.locator(rows).first()).not.toHaveAttribute("data-research-row", first!);
  const secondPageFirst = await page.locator(rows).first().getAttribute("data-research-row");
  await page.reload();
  await expect(page.locator(rows).first()).toHaveAttribute("data-research-row", secondPageFirst!);
  await expect(page.locator(indexEntries)).toHaveCount(213);

  await page.goto("research/?page=9");
  await expect(page.locator(rows)).toHaveCount(21);
  await expect(page.getByRole("navigation", { name: "Research pagination", exact: true }).getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test("collection, research state and literal search compose and reset pagination", async ({ page }) => {
  await page.goto("research/?group=games_more&page=3");
  await expect(page.locator(rows)).toHaveCount(8);
  const states = page.getByRole("combobox", { name: "Research disposition", exact: true });
  await states.selectOption("qualified");
  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBeNull();
  await expect(page.locator(rows)).toHaveCount(24);
  await expect(page.locator('.research-group-nav button[aria-pressed="true"]')).toContainText("Browser games");

  const search = page.getByRole("textbox", { name: "Search repository research", exact: true });
  await search.pressSequentially("all-is-cubes");
  await expect(search).toHaveValue("all-is-cubes");
  await expect(page.locator(rows)).toHaveCount(1);
  await expect(page.locator(rows)).toHaveAttribute("data-research-row", "kpreid/all-is-cubes");
  await expect.poll(() => {
    const params = new URL(page.url()).searchParams;
    return [params.get("q"), params.get("group"), params.get("status"), params.get("page")];
  }).toEqual(["all-is-cubes", "games_more", "qualified", null]);
  await page.reload();
  await expect(search).toHaveValue("all-is-cubes");
  await expect(states).toHaveValue("qualified");
  await expect(page.locator(rows)).toHaveCount(1);
  await expect(page.locator(indexEntries)).toHaveCount(213);

  const mobileCollection = page.getByRole("combobox", { name: "Research collection", exact: true });
  if (await mobileCollection.isVisible()) await mobileCollection.selectOption("all");
  else await page.getByRole("navigation", { name: "Research collections", exact: true }).getByRole("button", { name: /^All collections/ }).click();
  await expect.poll(() => new URL(page.url()).searchParams.get("group")).toBeNull();
  await expect(search).toHaveValue("all-is-cubes");
  await expect(states).toHaveValue("qualified");
  await search.fill("no-such-repository-6f54c0");
  await expect(page.locator(rows)).toHaveCount(0);
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(page.locator(rows)).toHaveCount(24);
  await expect.poll(() => new URL(page.url()).search).toBe("");
  await page.getByRole("navigation", { name: "Research page controls", exact: true }).getByRole("link", { name: "Next", exact: true }).click();
  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBe("2");
  await search.pressSequentially("Cadle");
  await expect(search).toHaveValue("Cadle");
  await expect(page.locator(rows)).toHaveCount(1);
  await page.goBack();
  await expect(search).toHaveValue("");
  await expect(page.locator(rows)).toHaveCount(24);
});

test("unavailable source and changed identity remain distinct while invalid pages clamp", async ({ page }) => {
  await page.goto("research/?status=unavailable");
  await expect(page.locator(rows)).toHaveCount(8);
  await expect(page.locator(`${rows} .research-actions a[target="_blank"]`)).toHaveCount(0);
  await expect(page.locator(`${rows} .research-details-link`)).toHaveCount(8);
  await expect(page.locator(`${rows} .research-state[data-review="unavailable"]`)).toHaveCount(8);

  await page.goto("research/?q=chessmata&page=-4");
  const chess = page.locator('[data-research-row="jonradoff/chessmata"]');
  await expect(page.locator(rows)).toHaveCount(1);
  await expect(chess.locator(".research-current-identity")).toContainText("metavert-io/chessmata");
  await expect(chess.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute("href", "https://github.com/metavert-io/chessmata");
  await expect(chess.locator("h2 a")).toHaveAttribute("href", /\/research\/jonradoff\/chessmata\/$/);
  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBeNull();
  expect(new URL(page.url()).searchParams.get("q")).toBe("chessmata");

  await page.goto("research/?group=games_more&page=999");
  await expect(page.locator(rows)).toHaveCount(8);
  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBe("3");
  expect(new URL(page.url()).searchParams.get("group")).toBe("games_more");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test("the full repository index works without JavaScript and localized links retain their locale", async ({ page, browser, baseURL }) => {
  const plain = await browser.newPage({ baseURL, javaScriptEnabled: false, viewport: page.viewportSize()! });
  try {
    await plain.goto("research/");
    await plain.locator(".research-index summary").click();
    await expect(plain.locator(".research-index")).toHaveAttribute("open", "");
    await expect(plain.locator(indexEntries)).toHaveCount(213);
    await plain.locator(".research-index").getByRole("link", { name: "kpreid/all-is-cubes", exact: true }).click();
    await expect(plain).toHaveURL(/\/research\/kpreid\/all-is-cubes\/$/);
    await expect(plain.getByRole("heading", { name: "kpreid/all-is-cubes", exact: true })).toBeVisible();
  } finally {
    await plain.close();
  }
  await page.goto("zh/research/?group=games_more&q=chessmata");
  const chess = page.locator('[data-research-row="jonradoff/chessmata"]');
  await expect(chess.locator("h2 a")).toHaveAttribute("href", /\/zh\/research\/jonradoff\/chessmata\/$/);
  await expect(page.locator('.research-heading a[href$="/papers/"]')).toHaveAttribute("href", /\/zh\/papers\/$/);
  const indexLinks = await page.locator(".research-index li a").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
  expect(indexLinks).toHaveLength(213);
  expect(indexLinks.every((href) => href?.includes("/zh/research/"))).toBeTruthy();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
