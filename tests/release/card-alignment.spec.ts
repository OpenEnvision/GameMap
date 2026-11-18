import { test, expect, type Page } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
const foundationCount = (await loadContent()).registry.all("foundation").length;

type CardGeometry = {
  top: number;
  width: number;
  height: number;
  bottom: number;
  title: number;
  description: number;
  footer: number;
  imageWidth: number | null;
  imageHeight: number | null;
};
async function geometry(
  page: Page,
  cards: string,
  title: string,
  description: string,
  footer: string,
): Promise<CardGeometry[]> {
  return page.locator(cards).evaluateAll(
    (elements, selectors) =>
      elements
        .filter((element) => element.getBoundingClientRect().width > 0)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const image = element
            .querySelector(".example-image")
            ?.getBoundingClientRect();
          return {
            top: rect.top,
            width: rect.width,
            height: rect.height,
            bottom: rect.bottom,
            title: element
              .querySelector(selectors.title)!
              .getBoundingClientRect().top,
            description: element
              .querySelector(selectors.description)!
              .getBoundingClientRect().top,
            footer: element
              .querySelector(selectors.footer)!
              .getBoundingClientRect().top,
            imageWidth: image?.width ?? null,
            imageHeight: image?.height ?? null,
          };
        }),
    { title, description, footer },
  );
}
function alignedRows(
  cards: CardGeometry[],
  fields: Array<
    "width" | "height" | "bottom" | "title" | "description" | "footer"
  > = ["width", "height", "bottom", "title", "description", "footer"],
) {
  expect(cards.length).toBeGreaterThan(0);
  const rows: CardGeometry[][] = [];
  for (const card of cards) {
    let row = rows.find((values) => Math.abs(values[0].top - card.top) < 1);
    if (!row) {
      row = [];
      rows.push(row);
    }
    row.push(card);
  }
  // Inspect every card/row, but report one aggregate assertion per invariant.
  // Thousands of traced expect() calls can otherwise stall the browser itself.
  const imageErrors = cards
    .filter((card) => card.imageWidth && card.imageHeight)
    .map((card) => Math.abs(card.imageWidth! / card.imageHeight! - 16 / 9));
  expect(Math.max(0, ...imageErrors), "all image aspect ratios").toBeLessThan(
    0.01,
  );
  for (const field of fields) {
    const deltas = rows.map((row) => {
      const values = row.map((card) => card[field]);
      return Math.max(...values) - Math.min(...values);
    });
    expect(
      Math.max(0, ...deltas),
      `worst same-row ${field} alignment across ${rows.length} rows`,
    ).toBeLessThanOrEqual(1);
  }
}

test("case, resource and testing cards align across languages, themes and column counts", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One explicit responsive matrix",
  );
  test.setTimeout(90_000); // Explicit 60-page language/theme/viewport matrix.
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 390, 800, 1000, 1440]) {
    await page.setViewportSize({ width, height: 1100 });
    for (const language of ["", "zh/"])
      for (const theme of ["light", "dark"]) {
        await page.addInitScript(
          (value) => localStorage.setItem("theme", value),
          theme,
        );
        for (const [route, cards, heading, description, footer] of [
          [
            "examples/",
            ".example-grid > .example-card",
            "h3",
            ".example-body > p",
            ".example-links",
          ],
          [
            "resources/",
            ".resource-grid > .resource-tile",
            "h2",
            ".resource-description",
            ".resource-card-footer",
          ],
          [
            "testing/",
            ".testing-grid > .testing-card",
            "h2",
            ":scope > p",
            ".example-links",
          ],
        ]) {
          await page.goto(language + route);
          await expect(page.locator('[data-client-ready="true"]')).toHaveCount(
            1,
          );
          await expect(page.locator("html")).toHaveClass(new RegExp(theme));
          alignedRows(
            await geometry(page, cards, heading, description, footer),
          );
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            `${width} ${theme} ${language}${route}`,
          ).toBe(true);
          if (route === "examples/") {
            // Foundations participate in the same geometry checks above, not a
            // second unfiltered catalog beneath the game grid.
            await expect(page.locator(".foundation-grid")).toHaveCount(0);
            await expect(
              page.locator(
                '#game-examples > [data-content-ref^="foundation:"]',
              ),
            ).toHaveCount(foundationCount);
            if (await page.locator(".research-game-card").count())
              alignedRows(
                await geometry(
                  page,
                  ".research-game-card",
                  "h3",
                  "p:not(.source-note)",
                  ".example-links",
                ),
                ["width", "height", "bottom", "footer"],
              );
          }
        }
      }
  }
  expect(errors).toEqual([]);
});

test("home case cards share aligned frames and footers", async ({ page }) => {
  await page.goto("");
  await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
  alignedRows(
    await geometry(
      page,
      ".example-grid > .example-card",
      "h3",
      ".example-body > p",
      ".example-links",
    ),
  );
});

test("expanded case notes retain all text, align the current row and leave later row sizes unchanged", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("examples/");
  await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
  const before = await geometry(
    page,
    ".example-grid > .example-card",
    "h3",
    ".example-body > p",
    ".example-links",
  );
  const first = page.locator(".example-grid > .example-card").first();
  await first.locator(".build-notes > summary").click();
  await expect(first.locator(".build-notes")).toHaveAttribute("open", "");
  const after = await geometry(
    page,
    ".example-grid > .example-card",
    "h3",
    ".example-body > p",
    ".example-links",
  );
  alignedRows(after);
  expect(after[0].height).toBeGreaterThan(before[0].height);
  const firstRowCount = before.filter(
    (card) => Math.abs(card.top - before[0].top) < 1,
  ).length;
  expect(before.length).toBeGreaterThan(firstRowCount);
  expect(
    Math.max(
      ...after
        .slice(firstRowCount)
        .map((card, index) =>
          Math.abs(card.height - before[index + firstRowCount].height),
        ),
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    await first.evaluate(
      (element) => element.scrollHeight - element.clientHeight,
    ),
  ).toBeLessThanOrEqual(1);
  await first.locator(".build-notes > summary").click();
  await expect(first.locator(".build-notes")).not.toHaveAttribute("open", "");
  await expect
    .poll(async () => {
      const closed = await geometry(
        page,
        ".example-grid > .example-card",
        "h3",
        ".example-body > p",
        ".example-links",
      );
      return Math.abs(closed[0].height - before[0].height);
    })
    .toBeLessThanOrEqual(1);
});
