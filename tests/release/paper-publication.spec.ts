import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
import { paperConferencePublication } from "../../website/app/lib/paper-publication";

const content = await loadContent();
const papers = content.registry.all("paper");
const conferences = papers.filter(
  (entry) => entry.data.referenceType === "conference-paper",
);
const label = (entry: (typeof papers)[number]) =>
  paperConferencePublication(entry.data);

test("static paper lists expose every conference edition without JavaScript", async ({
  browser,
  baseURL,
}) => {
  test.skip(!conferences.length, "Requires a snapshot with conference papers");
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  try {
    const page = await context.newPage();
    for (const prefix of ["", "zh/"]) {
      await page.goto(`${prefix}papers/`);
      await expect(page.locator(".catalog-publication")).toHaveCount(
        conferences.length,
      );
      for (const entry of conferences) {
        const row = page.locator(`[data-content-ref="${entry.key}"]`);
        await expect(row.locator(".catalog-publication")).toHaveText(
          label(entry)!.label,
        );
        await expect(row.locator(".catalog-publication")).toHaveAttribute(
          "title",
          entry.data.publication,
        );
      }
      const preprint = papers.find(
        (entry) => entry.data.referenceType === "preprint",
      );
      if (preprint)
        await expect(
          page.locator(
            `[data-content-ref="${preprint.key}"] .catalog-publication`,
          ),
        ).toHaveCount(0);
    }
  } finally {
    await context.close();
  }
});

test("conference qualifiers and distinct proceedings years survive hydration and narrow layouts", async ({
  page,
}) => {
  test.skip(!conferences.length, "Requires a snapshot with conference papers");
  const examples = [
    conferences.find((entry) => label(entry)?.label === "ICLR 2026"),
    conferences.find((entry) => label(entry)?.label.includes("Findings")),
    conferences.find((entry) => label(entry)?.label.includes("Workshop")),
    conferences.find(
      (entry) => label(entry)?.year && label(entry)!.year !== entry.data.year,
    ),
    conferences.find((entry) => !label(entry)?.abbreviated),
  ].filter((entry): entry is (typeof papers)[number] => Boolean(entry));
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 320, height: 900 });
  for (const prefix of ["", "zh/"]) {
    for (const entry of examples) {
      await page.goto(`${prefix}papers/?q=${encodeURIComponent(entry.title)}`);
      await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
      const row = page.locator(`[data-content-ref="${entry.key}"]`);
      await expect(row.locator(".catalog-publication")).toHaveText(
        label(entry)!.label,
      );
      await expect(row.locator(".catalog-publication")).toHaveAttribute(
        "title",
        entry.data.publication,
      );
      if (label(entry)!.year !== entry.data.year)
        await expect(row.locator(".catalog-publication-year")).toContainText(
          String(entry.data.year),
        );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test("paper details retain the full original publication instead of replacing it with the short label", async ({
  page,
}) => {
  test.skip(!conferences.length, "Requires a snapshot with conference papers");
  const entry =
    conferences.find((entry) => label(entry)?.label.includes("Findings")) ||
    conferences[0];
  for (const prefix of ["", "zh/"]) {
    await page.goto(`${prefix}papers/?q=${encodeURIComponent(entry.title)}`);
    const row = page.locator(`[data-content-ref="${entry.key}"]`);
    await row.locator("h2 a").click();
    await expect(
      page.locator(
        `[data-content-key="${entry.key}"] [data-content-field="publication"]`,
      ),
    ).toContainText(entry.data.publication);
  }
});
