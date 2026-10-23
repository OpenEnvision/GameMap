import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { loadContent } from "../../scripts/lib/content.mjs";
const context = await loadContent();
const { localizedPath, documentLanguages } = context;
const manifest = JSON.parse(readFileSync("dist/content-manifest.json", "utf8"));
const languages = documentLanguages(
  manifest.records
    .filter((row: { kind: string }) => row.kind === "document")
    .map((row: { id: string }) => ({ slug: row.id })),
);
const representatives = [
  ...new Set(manifest.records.map((row: { kind: string }) => row.kind)),
].flatMap((kind) => {
  const rows = manifest.records.filter(
    (row: { kind: string }) => row.kind === kind,
  );
  return [rows[0], rows.at(-1)].filter(
    (row, index, values) =>
      values.findIndex((item) => item.key === row.key) === index,
  );
});

test("selected snapshot records render and hydrate under the deployment base", async ({
  page,
}) => {
  expect(manifest.source.mode).toBe("release");
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const row of representatives) {
    await page.goto(row.url.replace(/^\//, ""));
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.locator(`[data-content-key="${row.key}"]`).first(),
    ).toContainText(row.title);
    await expect(
      page.locator(`[data-content-key="${row.key}"]`).first(),
    ).toBeVisible();
    expect(
      await page.evaluate(() => "__gamemap_release_injection__" in globalThis),
    ).toBe(false);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const images = page.locator("img");
    await images.evaluateAll((elements) =>
      elements.forEach((element) => {
        element.loading = "eager";
      }),
    );
    for (const image of await images.all())
      await expect
        .poll(() => image.evaluate((element) => element.naturalWidth))
        .toBeGreaterThan(0);
  }
  expect(errors).toEqual([]);
});

test("downloads contain selected identities, and both languages remain readable without JavaScript", async ({
  browser,
  request,
  baseURL,
}) => {
  const resources = await (await request.get("resources.json")).json();
  expect(resources.map((row: { id: string }) => row.id).sort()).toEqual(
    manifest.records
      .filter((row: { kind: string }) => row.kind === "resource")
      .map((row: { id: string }) => row.id)
      .sort(),
  );
  const logos = await (await request.get("logo-sources.json")).json();
  expect(Object.keys(logos).sort()).toEqual(
    resources.map((row: { id: string }) => row.id).sort(),
  );
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  for (const row of representatives.filter((row) =>
    ["resource", "example", "document"].includes(row.kind),
  )) {
    for (const prefix of row.kind === "document" && row.id.startsWith("zh/")
      ? [""]
      : ["", "zh/"]) {
      const path = prefix ? localizedPath(row.url, "zh", languages) : row.url;
      await page.goto(path.replace(/^\//, ""));
      await expect(page.locator("h1")).toBeVisible();
      await expect(
        page
          .locator(
            prefix && row.kind === "document"
              ? '[data-content-kind="document"]'
              : `[data-content-key="${row.key}"]`,
          )
          .first(),
      ).toBeVisible();
    }
  }
  await context.close();
});
