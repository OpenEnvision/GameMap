import { test, expect } from "@playwright/test";

test("the guides entrance opens the practical guide", async ({ page }) => {
  for (const [path, title, guide] of [
    [
      "docs/",
      "From resource map to runnable game",
      /\/docs\/guides\/practical-guide\/$/,
    ],
    [
      "docs/zh/",
      "从资源地图到可运行的游戏",
      /\/docs\/zh\/guides\/practical-guide\/$/,
    ],
  ] as const) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(guide);
    await expect(page.locator("h1")).toHaveText(title);
    await expect(page.locator(".docs-home")).toHaveCount(0);
    await expect(page.locator(".reader-prose")).toBeVisible();
  }
  await expect(
    page.getByRole("link", { name: "文档首页", exact: true }),
  ).toHaveCount(0);
});
