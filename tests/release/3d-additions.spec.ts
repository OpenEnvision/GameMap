import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { loadContent } from "../../scripts/lib/content.mjs";
const context = await loadContent();
const prIds = context.registry.all("threejs-game").filter(entry => entry.data.limitations.some(note => note.includes("at 409260b610f46f11a857b78b96a89879728d350a"))).map(entry => entry.id);
const datasets = await Promise.all(
  ["open-3d-import-round2", "open-3d-import-round3", "itch-3d-import"].map(
    async (name) =>
      JSON.parse(await readFile("data/segments/" + name + ".json", "utf8")),
  ),
);
const ids = datasets.flatMap((data) => data.newExampleIds);
test("all new directory cases retain source-only actions and original Chinese introductions", async ({
  page,
}) => {
  await page.goto("zh/examples/");
  for (const id of ids) {
    const entry = context.registry.require("example", id),
      card = page.locator('[data-content-ref="example:' + id + '"]');
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("data-access-kind", "source");
    await expect(card.locator(".image-action")).toContainText("查看源码");
    await expect(card.locator(".example-image")).toHaveAttribute(
      "href",
      entry.data.source.url,
    );
    const screenshot = context.sources.gameplayScreenshots?.[entry.key]?.media;
    const cover = context.sources.pageCovers[entry.key];
    await expect(card.locator("img")).toHaveCount(screenshot || cover ? 1 : 0);
    if (screenshot) {
      await expect(card).toHaveAttribute("data-cover-kind", "gameplay");
      await expect(card.locator(".page-cover-label")).toHaveCount(0);
      await expect(card.locator("img")).toHaveAttribute("alt", screenshot.localizations.zh.alt);
      expect((await card.locator("img").getAttribute("src"))!.endsWith("/" + screenshot.src)).toBe(true);
    } else if (cover) await expect(card.locator(".page-cover-label")).toContainText("非游戏截图");
    await expect(card.locator(".example-body > p")).toContainText(
      context.translationCatalogs.zh.content[entry.key].description,
    );
  }
  if(context.inputMode === "release") expect(prIds).toHaveLength(26);
  for (const id of prIds)
    await expect(
      page.locator('[data-content-ref="threejs-game:' + id + '"]'),
    ).toHaveCount(1);
  for (const id of ["bridge-horror-house", "chess-3d-vioancer"])
    await expect(
      page.locator('[data-content-ref="threejs-game:' + id + '"]'),
    ).toHaveCount(0);
});
test("nonfree visible source is not presented as a game/code reuse grant", async ({
  page,
  request,
}) => {
  await page.goto("zh/examples/?q=SP13KTRA");
  const card = page.locator('[data-content-ref="example:itch3d-g128"]');
  await expect(card).toBeVisible();
  await expect(card.locator(".image-action")).toContainText("查看源码");
  await page.goto("zh/examples/itch3d-g128/");
  await expect(
    page.locator('[data-content-field="source"]').last(),
  ).toContainText("All rights reserved");
  await expect(
    page.locator('[data-content-field="source"]').last(),
  ).toContainText("written permission");
  for (const [file, index] of [
    ["open-3d-games-import-round2.json", 0],
    ["open-3d-games-import-round3.json", 1],
    ["itch-3d-games-import.json", 2],
  ] as const) {
    const response = await request.get(file);
    expect(response.ok()).toBe(true);
    expect(await response.json()).toEqual(datasets[index]);
  }
});
