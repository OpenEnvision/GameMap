import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { loadContent } from "../../scripts/lib/content.mjs";
const content = await loadContent();
const screenshots = Object.entries(content.sources.gameplayScreenshots || {});
const digest = (bytes: Buffer) =>
  createHash("sha256").update(bytes).digest("hex");

test("new gameplay cards retain source-only actions, bilingual alt and complete source-file integrity", async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  const response = await request.get("gameplay-screenshot-sources.json");
  expect(response.ok()).toBe(true);
  const manifest = await response.json();
  expect(manifest.format).toBe("gamemap.gameplay-screenshots");
  expect(manifest.records).toEqual(
    [...screenshots]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => ({ key, media: value.media })),
  );
  for (const locale of ["en", "zh"]) {
    await page.goto(locale === "zh" ? "zh/examples/" : "examples/");
    for (const [key, value] of screenshots) {
      const card = page.locator(`#game-examples [data-content-ref="${key}"]`);
      await expect(card).toHaveAttribute("data-cover-kind", "gameplay");
      await expect(card.locator(".page-cover-label")).toHaveCount(0);
      const media = value.media,
        copy = locale === "zh" ? media.localizations.zh : media;
      await expect(card.locator("img")).toHaveAttribute("alt", copy.alt);
      expect(
        (await card.locator("img").getAttribute("src"))!.endsWith(
          "/" + media.src,
        ),
      ).toBe(true);
      const entry = content.registry.byKey(key)!;
      if (entry.kind === "example" && entry.data.demo.kind === "source")
        await expect(card).toHaveAttribute("data-access-kind", "source");
    }
  }
  for (const [, { media }] of screenshots) {
    for (const file of [media, media.original, media.frame, media.provenance]) {
      const response = await request.get(file.src);
      expect(response.ok()).toBe(true);
      const bytes = await response.body();
      expect(bytes.length).toBe(file.bytes);
      expect(digest(bytes)).toBe(file.sha256);
    }
  }
});

test("gameplay details keep localized descriptions, original files and explicitly archived non-gameplay covers", async ({
  page,
}) => {
  for (const kind of ["example", "foundation", "threejs-game"]) {
    const selected = screenshots.find(([key]) => key.startsWith(kind + ":"));
    if (!selected) continue;
    const [key, value] = selected,
      entry = content.registry.byKey(key)!;
    await page.goto("zh" + entry.url);
    await expect(
      page.locator('[data-content-field="gameplay"] img'),
    ).toHaveAttribute("alt", value.media.localizations.zh.alt);
    await expect(page.locator('[data-content-field="gameplay"]')).toContainText(
      value.media.localizations.zh.caption,
    );
    await expect(page.locator('[data-content-field="pageCover"]')).toHaveCount(
      0,
    );
    await expect(
      page.locator('[data-content-field="gameplayOriginalFiles"] a'),
    ).toHaveCount(3);
    if (value.archivedPageCover)
      await expect(
        page.locator('[data-content-field="archivedPageCover"]'),
      ).toContainText(/(?:GameMap 资料页|项目页面)截图/);
  }
});

test("new gameplay cards render without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(test.info().project.use.baseURL + "zh/examples/");
    for (const [key, value] of screenshots) {
      const card = page.locator(`#game-examples [data-content-ref="${key}"]`);
      await expect(card).toHaveAttribute("data-cover-kind", "gameplay");
      await expect(card.locator("img")).toHaveAttribute(
        "alt",
        value.media.localizations.zh.alt,
      );
    }
  } finally {
    await context.close();
  }
});
