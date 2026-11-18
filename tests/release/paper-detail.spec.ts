import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { loadContent } from "../../scripts/lib/content.mjs";
import type { ContentModels } from "../../website/content/models";

type Paper = ContentModels["paper"];
const packagePath = process.env.PAPER_DETAIL_TEST_PACKAGE;
const papers: Paper[] = packagePath
  ? JSON.parse(JSON.parse(readFileSync(packagePath, "utf8")).manifest_text)
      .entries.filter((row: { kind: string }) => row.kind === "paper")
      .map((row: { body: { payload: Paper } }) => row.body.payload)
  : (await loadContent()).registry.all("paper").map((entry) => entry.data);
const featured =
  papers.find(
    (paper) =>
      paper.id ===
      "paper-accelerating-creation-powered-by-robloxs-cube-foundation-model",
  ) || papers[0];

test("paper reading layout puts the original link in the first viewport and keeps source metadata behind a native disclosure", async ({
  page,
}) => {
  test.skip(!featured, "Requires a snapshot with paper records");
  await page.goto(`papers/${featured.id}/`);
  const article = page.locator(`[data-content-key="paper:${featured.id}"]`);
  await expect(article.locator("h1")).toHaveText(featured.title);
  await expect(article.locator(".paper-byline")).toContainText(
    featured.authors,
  );
  await expect(
    article.locator('[data-content-field="publication"]'),
  ).toContainText(featured.publication);
  const original = article.locator(
    '.paper-actions [data-content-field="url"] a',
  );
  await expect(original).toHaveAttribute("href", featured.url);
  await expect(original).toBeVisible();
  expect(
    (await original.boundingBox())!.y + (await original.boundingBox())!.height,
  ).toBeLessThan(page.viewportSize()!.height);
  const disclosure = article.locator("details.paper-evidence");
  await expect(disclosure).not.toHaveAttribute("open", "");
  await expect(disclosure.locator('[data-content-field="id"]')).toBeHidden();
  await disclosure.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).toHaveAttribute("open", "");
  await expect(disclosure.locator('[data-content-field="id"]')).toContainText(
    featured.id,
  );
  await expect(
    disclosure.locator('[data-content-field="classification"]'),
  ).toContainText(featured.classification);
  for (const link of [...featured.origins, ...featured.citedSections])
    await expect(
      disclosure.locator(`a[href="${link.url}"]`).first(),
    ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("paper availability preserves uncertainty instead of turning a missing implementation into a closed-source claim", async ({
  page,
}) => {
  const paper = papers.find(
    (item) =>
      item.access.codeStatus === "not-found" &&
      item.access.notes.some((note) => note.includes("does not establish")),
  );
  test.skip(
    !paper,
    "Requires a source-only paper with an explicit qualification",
  );
  await page.goto(`papers/${paper!.id}/`);
  await expect(page.locator(".paper-availability")).toContainText(
    "Implementation not located",
  );
  for (const note of paper!.access.notes)
    await expect(page.locator(".paper-availability")).toContainText(note);
  await expect(page.locator(".paper-availability")).not.toContainText(
    "codeStatus",
  );
  await expect(page.locator(".paper-availability")).not.toContainText("Items");
});

test("paper reading and citation access work in both languages without JavaScript", async ({
  browser,
  baseURL,
}) => {
  test.skip(!featured, "Requires a snapshot with paper records");
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  try {
    const page = await context.newPage();
    for (const prefix of ["", "zh/"]) {
      await page.goto(`${prefix}papers/${featured.id}/`);
      await expect(page.locator(".paper-title")).toHaveText(featured.title);
      await expect(
        page.locator('.paper-actions [data-content-field="url"] a'),
      ).toHaveText(prefix ? "阅读原文" : "Read original");
      await page.locator(".paper-evidence summary").click();
      await expect(
        page.locator('.paper-evidence [data-content-field="id"]'),
      ).toContainText(featured.id);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  } finally {
    await context.close();
  }
});
