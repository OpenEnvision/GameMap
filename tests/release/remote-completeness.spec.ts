import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { loadContent } from "../../scripts/lib/content.mjs";
const content = await loadContent();
const manifest = JSON.parse(readFileSync("dist/content-manifest.json", "utf8"));
const remote = manifest.records.some(
  (row: { kind: string }) => row.kind === "paper",
);

test("the full remote snapshot retains native collections and canonical guides", async ({
  page,
}) => {
  test.skip(!remote, "This snapshot has no full remote import");
  expect(
    manifest.records.filter((row: { kind: string }) => row.kind === "paper"),
  ).toHaveLength(483);
  expect(
    manifest.records.filter(
      (row: { kind: string }) => row.kind === "threejs-game",
    ),
  ).toHaveLength(content.registry.all("threejs-game").length);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    "papers/",
    "threejs-games/",
    "docs/guides/practical-guide/",
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await expect(
    page.locator('[data-content-key="document:guides/practical-guide"]'),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("canonical guides remain usable without JavaScript while all remote archives are retired", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  try {
    const page = await context.newPage();
    const retired = await page.goto(
      "docs/remote/archive/docs/browser-game-repositories/",
    );
    expect(retired?.status()).toBe(404);
    await page.goto("docs/tutorials-and-demos/");
    await expect(page.locator("div.prose[lang]")).toContainText(
      "Moonlight & Mayhem",
    );
    await expect(
      page
        .locator(
          '.prose a[href="https://simonw.github.io/raccoon-heist-codex/"]',
        )
        .first(),
    ).toBeVisible();
    await page.goto("docs/zh/guides/reading-guide/");
    await expect(page.locator("div.prose[lang]")).toHaveAttribute(
      "lang",
      "zh-CN",
    );
  } finally {
    await context.close();
  }
});

test("retired source indexes and research archives are absent while guides remain", async ({
  page,
  request,
}) => {
  expect(
    manifest.records.some(
      (row: { key: string }) => row.key === "document:remote-source-index",
    ),
  ).toBe(false);
  for (const path of [
    "docs/remote-source-index/",
    "zh/docs/remote-source-index/",
    "remote-source-index.md",
    "docs/remote/community-case-research/",
    "docs/remote/practical-guide/",
    "docs/remote/tutorials-and-demos/",
    "docs/remote/provenance.json",
    "docs/remote/archive/collections/threejs-games/evidence/batch-001/",
  ])
    expect((await request.get(path)).status(), path).toBe(404);
  await page.goto("examples/");
  await expect(page.locator('a[href*="remote-source-index"]')).toHaveCount(0);
  await page.goto("docs/tutorials-and-demos/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator('a[href*="remote-source-index"]')).toHaveCount(0);
});
