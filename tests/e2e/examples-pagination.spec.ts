import {
  test,
  expect,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { parsePage, attributes } from "../../scripts/lib/rendered-coverage.mjs";

const pageSize = 48;
const cards = (page: Page) => page.locator("#game-examples > .example-card");
const keys = (page: Page) =>
  cards(page).evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("data-content-ref")),
  );
async function inventory(request: APIRequestContext, prefix = "") {
  const response = await request.get(`${prefix}examples/`);
  expect(response.ok()).toBe(true);
  return parsePage(await response.text())
    .nodes.filter((node) =>
      attributes(node).class?.split(" ").includes("example-card"),
    )
    .map((node) => ({
      key: attributes(node)["data-content-ref"] as string,
      track: attributes(node)["data-game-track"] as string,
    }));
}

const errors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const list: string[] = [];
  errors.set(page, list);
  page.on("pageerror", (error) => list.push(error.message));
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

for (const prefix of ["", "zh/"]) {
  test(`${prefix || "en/"}3D results page in groups of 48 with reload, history and keyboard focus`, async ({
    page,
    request,
  }) => {
    const expected = (await inventory(request, prefix))
      .filter((entry) => entry.track === "3d")
      .map((entry) => entry.key);
    expect(expected.length).toBeGreaterThan(pageSize * 2);
    await page.goto(`${prefix}examples/?track=3d&campaign=keep`);
    const pager = page.locator(".gallery-pagination");
    const previous = pager.getByRole("button", {
      name: prefix ? "上一页" : "Previous page",
      exact: true,
    });
    const next = pager.getByRole("button", {
      name: prefix ? "下一页" : "Next page",
      exact: true,
    });
    const results = page.locator("#game-results");
    await expect(cards(page)).toHaveCount(pageSize);
    expect(await keys(page)).toEqual(expected.slice(0, pageSize));
    await expect(previous).toBeDisabled();
    await expect(next).toBeEnabled();
    await next.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/track=3d&campaign=keep&page=2$/);
    await expect(results).toContainText("49–96");
    await expect(results).toBeFocused();
    await expect(results).toBeInViewport();
    expect(await keys(page)).toEqual(expected.slice(pageSize, pageSize * 2));
    const position = await results.boundingBox();
    const dock = await page.locator(".gallery-dock").boundingBox();
    expect(position!.y).toBeGreaterThanOrEqual(0);
    if (page.viewportSize()!.width >= 960)
      expect(position!.y).toBeGreaterThanOrEqual(dock!.y + dock!.height);

    await page.reload();
    await expect(results).toContainText("49–96");
    expect(await keys(page)).toEqual(expected.slice(pageSize, pageSize * 2));
    await page.goBack();
    await expect(results).toContainText("1–48");
    expect(await keys(page)).toEqual(expected.slice(0, pageSize));
    await page.goForward();
    await expect(results).toContainText("49–96");
    await previous.click();
    await expect(page).toHaveURL(/track=3d&campaign=keep$/);
    await expect(previous).toBeDisabled();

    const lastStart = Math.floor((expected.length - 1) / pageSize) * pageSize;
    await page.goto(`${prefix}examples/?track=3d&page=999999`);
    await expect(results).toContainText(`${lastStart + 1}–${expected.length}`);
    expect(await keys(page)).toEqual(expected.slice(lastStart));
    await expect(next).toBeDisabled();
  });
}

test("all games, dimensions, client filters and search share pagination without reloading the catalog", async ({
  page,
  request,
}) => {
  const all = await inventory(request);
  await page.goto("examples/?page=2&campaign=keep");
  const results = page.locator("#game-results");
  await expect(results).toContainText("49–96");
  expect(await keys(page)).toEqual(all.slice(48, 96).map((entry) => entry.key));
  const loads: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.endsWith(".data"))
      loads.push(request.url());
  });
  await page.getByRole("button", { name: "2D", exact: true }).click();
  const twoD = all.filter((entry) => entry.track === "2d");
  await expect(results).toContainText(`1–${Math.min(pageSize, twoD.length)}`);
  expect(await keys(page)).toEqual(
    twoD.slice(0, pageSize).map((entry) => entry.key),
  );
  expect(new URL(page.url()).searchParams.has("page")).toBe(false);
  expect(new URL(page.url()).searchParams.get("campaign")).toBe("keep");

  await page.getByRole("button", { name: "All games", exact: true }).click();
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  await expect(results).toContainText("49–96");
  await page
    .getByRole("combobox", { name: "Client or model" })
    .selectOption("deepseek-model");
  expect(new URL(page.url()).searchParams.has("page")).toBe(false);
  expect(new URL(page.url()).searchParams.get("client")).toBe("deepseek-model");
  await expect(page.locator(".gallery-pagination")).toHaveCount(0);

  await page
    .getByRole("combobox", { name: "Client or model" })
    .selectOption("all");
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  const search = page.getByRole("textbox", {
    name: "Search game examples",
    exact: true,
  });
  await search.fill("all");
  await expect(search).toHaveValue("all");
  expect(new URL(page.url()).searchParams.has("page")).toBe(false);
  await search.fill("gamemap-pagination-no-matching-record");
  await expect(
    page.getByRole("heading", { name: "No games found.", exact: true }),
  ).toBeVisible();
  await expect(cards(page)).toHaveCount(0);
  await expect(page.locator(".gallery-pagination")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await expect(search).toBeFocused();
  await expect(cards(page)).toHaveCount(pageSize);
  expect(await keys(page)).toEqual(
    all.slice(0, pageSize).map((entry) => entry.key),
  );
  expect(new URL(page.url()).search).toBe("?campaign=keep");
  expect(loads).toEqual([]);
});

test("every game remains discoverable without JavaScript and pagination fits a small screen", async ({
  browser,
  page,
  request,
  baseURL,
}) => {
  const expected = await inventory(request);
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const staticPage = await context.newPage();
    for (const prefix of ["", "zh/"]) {
      await staticPage.goto(
        new URL(`${prefix}examples/?track=3d&page=2`, baseURL!).href,
      );
      await expect(cards(staticPage)).toHaveCount(expected.length);
      expect(await keys(staticPage)).toEqual(
        expected.map((entry) => entry.key),
      );
      await expect(staticPage.locator(".gallery-pagination")).toHaveCount(0);
      await expect(staticPage.locator("noscript p")).toContainText(
        "JavaScript",
      );
    }
  } finally {
    await context.close();
  }
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("zh/examples/?track=3d&page=2");
  const pager = page.locator(".gallery-pagination");
  await expect(pager).toBeVisible();
  for (const button of await pager.getByRole("button").all()) {
    const box = await button.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
