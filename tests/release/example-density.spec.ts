import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
const content = await loadContent();

test("Examples uses four desktop columns and five wide-screen columns with three-line summaries", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop", "One explicit responsive matrix");
  for (const [width, columns] of [
    [390, 1],
    [800, 2],
    [1000, 3],
    [1199, 3],
    [1200, 4],
    [1280, 4],
    [1440, 4],
    [1600, 5],
    [1920, 5],
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("zh/examples/");
    const geometry = await page.locator("#game-examples").evaluate((grid) => {
      const cards = [...grid.children] as HTMLElement[],
        first = cards[0].getBoundingClientRect();
      const paragraphs = cards.map((card) =>
        card.querySelector<HTMLElement>(".example-body > p")!,
      );
      return {
        columns: cards.filter(
          (card) => Math.abs(card.getBoundingClientRect().top - first.top) < 1,
        ).length,
        width: grid.getBoundingClientRect().width,
        overflow: document.documentElement.scrollWidth > innerWidth,
        allClamped: paragraphs.every(
          (p) => getComputedStyle(p).webkitLineClamp === "3",
        ),
        maxLines: Math.max(
          ...paragraphs.map(
            (p) =>
              p.getBoundingClientRect().height /
              parseFloat(getComputedStyle(p).lineHeight),
          ),
        ),
      };
    });
    expect(geometry.columns, "columns at " + width).toBe(columns);
    expect(geometry.overflow).toBe(false);
    expect(geometry.allClamped).toBe(true);
    expect(geometry.maxLines).toBeLessThanOrEqual(3.05);
    if (width === 1920) expect(geometry.width).toBe(1600);
  }
});

test("summary clipping does not remove full descriptions or source qualifications from records", async ({
  page,
}) => {
  const entry = content.registry
    .all("example")
    .find((e) => e.data.description.length > 140)!;
  await page.goto("examples/" + entry.id + "/");
  await expect(page.locator('[data-content-field="description"]')).toHaveText(
    entry.data.description,
  );
  await expect(
    page.locator('[data-content-field="source"]').last(),
  ).toContainText(entry.data.source.note);
});
