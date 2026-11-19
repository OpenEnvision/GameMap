import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { loadContent } from "../../scripts/lib/content.mjs";
import { pageCoverAlt } from "../../website/content/media";
const content = await loadContent();
const covers = Object.entries(content.sources.pageCovers);
const retainedCovers = { ...content.sources.pageCovers };
for (const [key, value] of Object.entries(
  content.sources.gameplayScreenshots || {},
))
  if (value.archivedPageCover) retainedCovers[key] = value.archivedPageCover;
const digest = (bytes: Buffer) =>
  createHash("sha256").update(bytes).digest("hex");

test("fallback page covers keep explicit non-gameplay labels and source provenance", async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  await page.goto("zh/examples/");
  await expect(page.locator('[data-cover-kind$="-page"]')).toHaveCount(
    covers.length,
  );
  const response = await request.get("page-cover-sources.json");
  expect(response.ok()).toBe(true);
  const exported = await response.json();
  expect(exported.format).toBe("gamemap.project-page-covers");
  expect(exported.records).toEqual(
    Object.entries(retainedCovers)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, cover]) => ({ key, ...cover })),
  );
  expect(exported.verification).toContain("not gameplay");
  for (const [key, cover] of covers) {
    const card = page.locator(`[data-content-ref="${key}"]`);
    await expect(card).toHaveAttribute(
      "data-cover-kind",
      cover.origin === "catalog-page-capture" ? "catalog-page" : "project-page",
    );
    await expect(card.locator(".page-cover-label")).toHaveText(
      cover.origin === "catalog-page-capture"
        ? "GameMap 资料页截图"
        : "项目页面截图",
    );
    await expect(card.locator("img")).toHaveAttribute(
      "alt",
      pageCoverAlt(cover.alt),
    );
    const src = (await card.locator("img").getAttribute("src"))!;
    expect(src.endsWith("/" + cover.src)).toBe(true);
    const picture = await request.get(src);
    expect(picture.ok()).toBe(true);
    expect(digest(await picture.body())).toBe(cover.sha256);
    await expect(card.locator(".game-preview-unavailable")).toHaveCount(0);
  }
});

test("page-cover details preserve the original frame, source and capture date without gameplay claims", async ({
  page,
  request,
}) => {
  for (const kind of ["example", "foundation", "threejs-game"]) {
    const selected = covers.find(([key]) => key.startsWith(kind + ":"));
    if (!selected) continue;
    const [key, cover] = selected,
      entry = content.registry.byKey(key)!;
    await page.goto("zh" + entry.url);
    await expect(
      page.locator('[data-content-field="pageCover"]'),
    ).toContainText(/(?:GameMap 资料页|项目页面)截图/);
    const sourceHref = await page
      .locator('[data-content-field="pageCover"] a')
      .getAttribute("href");
    if (cover.origin === "catalog-page-capture") {
      expect(sourceHref!.endsWith("/zh" + cover.sourceUrl)).toBe(true);
      await expect(
        page.locator('[data-content-field="pageCoverSnapshot"]'),
      ).toContainText(cover.sourceSnapshot.artifactSha256);
    } else expect(sourceHref).toBe(cover.sourceUrl);
    await expect(
      page.locator('[data-content-field="pageCoverCaptured"]'),
    ).toContainText(cover.capturedAt);
    await expect(page.locator('[data-content-field="gameplay"]')).toHaveCount(
      0,
    );
    const original = await page
      .locator('[data-content-field="pageCoverOriginal"] a')
      .getAttribute("href");
    expect(original!.endsWith("/" + cover.original.src)).toBe(true);
    const r = await request.get(original!);
    expect(r.ok()).toBe(true);
    expect(digest(await r.body())).toBe(cover.original.sha256);
    await expect(
      page.locator('[data-content-field="pageCoverRights"]'),
    ).toContainText("各自权利人");
  }
});

test("page covers and truthful actions survive without JavaScript", async ({
  browser,
}) => {
  const plain = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await plain.newPage();
    await page.goto(test.info().project.use.baseURL + "zh/examples/");
    await expect(page.locator('[data-cover-kind$="-page"]')).toHaveCount(
      covers.length,
    );
    for (const [key] of covers.slice(0, 4)) {
      const card = page.locator(`[data-content-ref="${key}"]`);
      await expect(card.locator(".page-cover-label")).toContainText(
        /(?:GameMap 资料页|项目页面)截图/,
      );
      await expect(card.locator("img")).toHaveCount(1);
    }
  } finally {
    await plain.close();
  }
});
