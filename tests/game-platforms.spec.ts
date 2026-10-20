import { test, expect } from "@playwright/test";

test("platform discovery links open the store separately from official publishing tools", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("examples/");
  const platforms = page.getByRole("region", { name: "Game stores and publishing platforms" });
  await expect(platforms.locator(".platform-resource")).toHaveCount(5);
  const steam = platforms.locator('[data-content-ref="resource:steamworks"]');
  await expect(steam.getByRole("link", { name: "Steam", exact: true })).toHaveAttribute("href", "https://store.steampowered.com/");
  await expect(steam.getByRole("link", { name: "Publish a game", exact: true })).toHaveAttribute("href", "https://partner.steamgames.com/");
  await expect(platforms.locator('img')).toHaveCount(5);
  await expect(platforms.getByRole("link", { name: "itch.io", exact: true })).toHaveAttribute("href", "https://itch.io/games");
  await expect(platforms.getByRole("link", { name: "Epic Games Store", exact: true })).toHaveAttribute("href", "https://store.epicgames.com/en-US/");
  await expect(platforms.getByRole("link", { name: "GOG", exact: true })).toHaveAttribute("href", "https://www.gog.com/en/games");
  await expect(platforms.getByRole("link", { name: "CrazyGames", exact: true })).toHaveAttribute("href", "https://www.crazygames.com/");
  await expect(platforms.getByRole("link", { name: "Publishing guide", exact: true })).toHaveAttribute("href", /\/docs\/publishing-platforms\/$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});

test("source archives, prepared releases and extra platform links stay distinct", async ({ page }) => {
  await page.goto("examples/?q=Vibe%20Racer");
  const source = page.locator("#vibe-racer-opencode");
  await expect(source.locator(".example-platform-label")).toHaveText("Source download");
  await expect(source.locator(".image-action")).toContainText("Get source & run");
  await expect(source.locator(".example-image")).toHaveAttribute("aria-label", "Get Vibe Racer source");
  await page.goto("examples/?q=DEEP%20YELLOW");
  const yellow = page.locator("#deep-yellow-claude");
  await expect(yellow.locator(".example-platform-label")).toHaveText("itch.io");
  await expect(yellow.getByRole("link", { name: "GitHub Releases", exact: true })).toHaveAttribute("href", "https://github.com/aebrer/deep-yellow/releases/tag/v0.13.0");
  await yellow.getByRole("link", { name: "Complete record", exact: true }).click();
  await expect(page.locator('[data-content-field="demo"]').filter({ hasText: "Game platform" })).toContainText("itch.io");
  const distribution = page.locator('[data-content-field="distribution"]');
  await expect(distribution).toContainText("Prepared Windows and Linux builds");
  await expect(distribution.getByRole("link", { name: "GitHub Releases", exact: true })).toBeVisible();
});

test("Chinese platform links and native publishing guide remain discoverable", async ({ page }) => {
  await page.goto("zh/examples/?q=Bash%20Fighter");
  const platforms = page.getByRole("region", { name: "游戏商店与发行平台" });
  await expect(platforms.getByRole("link", { name: "发布游戏", exact: true })).toHaveCount(5);
  const bash = page.locator("#bash-fighter-agent");
  await expect(bash.locator(".example-platform-label")).toHaveText("浏览器");
  await expect(bash.getByRole("link", { name: "itch.io", exact: true })).toHaveAttribute("href", "https://bashfighter.itch.io/bash-fighter");
  await expect(platforms.getByRole("link", { name: "发行指南", exact: true })).toHaveAttribute("href", /\/docs\/zh\/publishing-platforms\/$/);
  await platforms.getByRole("link", { name: "发行指南", exact: true }).click();
  await expect(page.locator("main")).toContainText("SlopArena");
  await expect(page.locator("main")).toContainText("Request Access");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
