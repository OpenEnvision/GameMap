import { test, expect, type Page } from "@playwright/test";

// Read-only presentation fixtures, not simulated authentication acceptance.
// Real Auth, write permissions and moderation are tested separately against the local stack.
const id = "fddf6f34-9078-41ba-bd59-91a813db82ac";
const work = {
  id,
  key: `submission:${id}`,
  title: "UI fixture — not a real game",
  description:
    "Read-only browser fixture for shared cards and query-based detail navigation.",
  engine: "UI test",
  track: "2d",
  url: "https://example.invalid/ui-fixture",
  sourceUrl: "",
  accessKind: "playable",
  screenshots: [],
  author: "UI fixture",
  license: "Not a published work",
  aiUse: "not-stated",
};
async function readOnlyAPI(page: Page, showWork = false) {
  const writes: string[] = [];
  await page.route("**/api/community/**", async (route) => {
    const request = route.request(),
      path = decodeURIComponent(new URL(request.url()).pathname);
    if (request.method() !== "GET") {
      writes.push(path);
      await route.fulfill({
        status: 403,
        json: { error: { message: "Read-only UI fixture" } },
      });
      return;
    }
    const json = path.endsWith("/config")
      ? { configured: true, signup: true, github: false }
      : path.endsWith("/session")
        ? { user: null, csrf: "" }
        : path.endsWith("/works")
          ? { items: showWork ? [work] : [], count: showWork ? 1 : 0 }
          : path.endsWith(`/games/${work.key}`)
            ? {
                game: work,
                stats: { average: 0, count: 0, comments: 0 },
                comments: [],
              }
            : {};
    await route.fulfill({ json });
  });
  return writes;
}
for (const prefix of ["", "zh/"]) {
  test(`${prefix || "en/"}account exposes real forms without inventing GitHub authorization`, async ({
    page,
  }) => {
    const writes = await readOnlyAPI(page);
    await page.goto(prefix + "account/");
    const github = page.getByRole("button").filter({ hasText: "GitHub" });
    await expect(github).toBeDisabled();
    await page.getByRole("tab").nth(1).click();
    await expect(page.locator('input[name="password"]')).toHaveAttribute(
      "minlength",
      "12",
    );
    await expect(page.locator('input[name="email"]')).toHaveAttribute(
      "type",
      "email",
    );
    await expect(page.locator("form")).toHaveAttribute("method", "post");
    await page.getByRole("tab").nth(2).click();
    await expect(page.locator('input[name="password"]')).toHaveCount(0);
    expect(writes).toEqual([]);
  });
  test(`${prefix || "en/"}approved-work presentation uses the same grid and a navigable detail route`, async ({
    page,
  }) => {
    const writes = await readOnlyAPI(page, true);
    await page.goto(prefix + "examples/");
    const card = page.locator(`.example-card[data-content-ref="${work.key}"]`);
    await expect(card).toHaveCount(1);
    await expect(page.locator(".example-grid")).toHaveCount(1);
    await expect(
      page.locator(
        `.example-grid .example-card[data-content-ref="${work.key}"]`,
      ),
    ).toHaveCount(1);
    await page.bringToFront();
    await card
      .getByRole("link", {
        name: prefix ? "查看详情" : "Complete record",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(new RegExp(`${prefix}works/\\?id=${id}`));
    await expect(
      page.getByRole("heading", { name: work.title, exact: true }),
    ).toBeVisible();
    await expect(page.locator(".community-score")).toBeVisible();
    expect(writes).toEqual([]);
  });
}
