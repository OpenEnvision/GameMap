import { test, expect } from "@playwright/test";

test("Examples headings omit intake-download/toolkit shortcuts without deleting provenance downloads", async ({
  page,
  request,
}) => {
  for (const locale of ["", "zh/"]) {
    await page.goto(locale + "examples/");
    await expect(page.locator(".page-heading .heading-links")).toHaveCount(0);
    await expect(page.locator(".page-heading a")).toHaveCount(0);
    await expect(
      page.locator("#game-examples > .example-card").first(),
    ).toBeVisible();
    await expect(
      page.locator("#game-examples .example-image img").first(),
    ).toBeVisible();
  }
  for (const file of [
    "jam-discovery.json",
    "open-3d-games-import.json",
    "open-3d-games-import-round2.json",
    "open-3d-games-import-round3.json",
    "itch-3d-games-import.json",
    "open-3d-games-import-round4.json",
    "open-3d-games-import-round5.json",
    "browser-port-research.json",
    "page-cover-sources.json",
  ]) {
    const response = await request.get(file);
    expect(response.ok(), file + " remains available").toBe(true);
  }
});

test("account and submission pages keep functional titles without promotional copy", async ({
  page,
}) => {
  for (const [locale, account, submit] of [
    ["", "Your account", "Submit your game"],
    ["zh/", "我的账号", "提交作品"],
  ]) {
    for (const [route, title] of [
      ["account/", account],
      ["submit/", submit],
    ]) {
      await page.goto(locale + route);
      const heading = page.locator(".page-heading");
      await expect(heading.locator("h1")).toHaveText(title);
      await expect(heading.locator("p, .eyebrow")).toHaveCount(0);
      await expect(heading).not.toContainText(
        /Let people play what you built|Your next game starts here|让更多人玩到你的作品|从这里，遇见下一款好游戏/,
      );
    }
  }
});
