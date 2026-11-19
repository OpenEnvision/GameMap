import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { loadContent } from "../../scripts/lib/content.mjs";
import policy from "../../website/content/open3d-import.config.json" with { type: "json" };
const context = await loadContent();
const raw = JSON.parse(
  await readFile("data/segments/open-3d-import.json", "utf8"),
);
const imported = context.registry
  .all("example")
  .filter((entry) => entry.data.intake?.sha256 === raw.source.sha256);
const legacy = context.registry
  .all("threejs-game")
  .filter((entry) => policy.includedLegacyThreejsIds.includes(entry.id));

test("imported 3D games retain source-only status and never expose fabricated play/download actions", async ({
  page,
  request,
}) => {
  await page.goto("zh/examples/");
  const cards = page.locator('#game-examples > [data-access-kind="source"]');
  await expect(cards).toHaveCount(
    context.registry
      .all("example")
      .filter((entry) => entry.data.demo.kind === "source").length +
      context.registry.all("threejs-game").length,
  );
  for (const entry of imported) {
    const card = page.locator(`[data-content-ref="${entry.key}"]`);
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("data-game-track", "3d");
    await expect(card.locator(".example-image")).toHaveAttribute(
      "href",
      entry.data.source.url,
    );
    await expect(card.locator(".image-action")).toContainText("查看源码");
    await expect(card.locator(".card-meta")).toContainText("仅源码");
    await expect(card.getByRole("link", { name: /^试玩 / })).toHaveCount(0);
    const screenshot = context.sources.gameplayScreenshots?.[entry.key]?.media;
    const cover = context.sources.pageCovers[entry.key];
    await expect(card.locator("img")).toHaveCount(screenshot || cover ? 1 : 0);
    if (screenshot) {
      await expect(card).toHaveAttribute("data-cover-kind", "gameplay");
      await expect(card.locator(".page-cover-label")).toHaveCount(0);
      await expect(card.locator("img")).toHaveAttribute(
        "alt",
        screenshot.localizations.zh.alt,
      );
      expect(
        (await card.locator("img").getAttribute("src"))!.endsWith(
          "/" + screenshot.src,
        ),
      ).toBe(true);
    } else if (cover)
      await expect(card.locator(".page-cover-label")).toContainText(
        /(?:GameMap 资料页|项目页面)截图/,
      );
  }
  for (const entry of legacy)
    await expect(page.locator(`[data-content-ref="${entry.key}"]`)).toHaveCount(
      1,
    );
  const response = await request.get("open-3d-games-import.json");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual(raw);
});

test("imported record details keep real Chinese descriptions and leave catalog bookkeeping off the page", async ({
  page,
}) => {
  const first = imported[0];
  await page.goto("zh/examples/" + first.id + "/");
  await expect(page.locator('[data-content-field="intake"]')).toHaveCount(0);
  await expect(page.getByText(raw.source.sha256)).toHaveCount(0);
  await expect(page.getByText("open_3d_games_2026-10-24.jsonl")).toHaveCount(0);
  await expect(
    page.getByText("Read supplied directory references"),
  ).toHaveCount(0);
  await expect(
    page.locator('[data-content-field="description"]'),
  ).toContainText(
    raw.inputRecords.find(
      (r: { id: string }) => r.id === first.data.intake!.rowId,
    ).description_zh,
  );
  await expect(page.locator('[data-content-field="aiUse"]')).toContainText(
    "收录自 3D 游戏目录。",
  );
});
