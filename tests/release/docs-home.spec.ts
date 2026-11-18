import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const manifest = JSON.parse(readFileSync("dist/content-manifest.json", "utf8"));
const slugs: string[] = manifest.records
  .filter((row: { kind: string }) => row.kind === "document")
  .map((row: { key: string }) => row.key.slice("document:".length));
function visibleKeys(zh: boolean) {
  const translated = new Set(
    slugs.filter((slug) => slug.startsWith("zh/")).map((slug) => slug.slice(3)),
  );
  return slugs
    .filter((slug) =>
      zh
        ? slug.startsWith("zh/") || !translated.has(slug)
        : !slug.startsWith("zh/"),
    )
    .map((slug) => `document:${slug}`)
    .sort();
}

test("the documentation home offers tasks and preserves the complete, labeled directory", async ({
  page,
  request,
}) => {
  for (const zh of [false, true]) {
    await page.goto(zh ? "docs/zh/" : "docs/");
    await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
    await expect(page.locator(".docs-home h1")).toHaveText(
      zh ? "中文文档" : "Documentation",
    );
    await expect(page.locator(".docs-home-task")).toHaveCount(4);
    await expect(page.locator(".docs-home-starter")).toBeVisible();
    const refs = await page
      .locator(".docs-home-directory [data-content-ref]")
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("data-content-ref")).sort(),
      );
    expect(refs).toEqual(visibleKeys(zh));
    expect(new Set(refs).size).toBe(refs.length);
    await expect(
      page.locator(
        ".docs-home-tasks a[href*='/remote/'], .docs-home-topics a[href*='/remote/']",
      ),
    ).toHaveCount(0);
    await expect(page.locator("#docs-archive-originals")).toHaveCount(
      slugs.some((slug) => slug.startsWith("remote/archive/")) ? 1 : 0,
    );
    await expect(page.locator("a[href*='remote-source-index']")).toHaveCount(0);
    for (const link of await page
      .locator(".docs-home-task, .docs-home-starter")
      .all()) {
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();
      expect((await request.get(href!)).status()).toBe(200);
    }
  }
});

test("guide search supports English and Chinese, empty states, and keyboard clearing without navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const zh of [false, true]) {
    await page.goto(zh ? "docs/zh/" : "docs/");
    const input = page.locator(".docs-home-search input");
    await input.fill(zh ? "引擎" : "engines");
    await expect(page.locator(".docs-home-results")).toBeVisible();
    await expect(
      page.locator(
        ".docs-home-results a[href*='/docs/ecosystem/engines/'], .docs-home-results a[href*='/docs/zh/ecosystem/engines/']",
      ),
    ).toHaveCount(1);
    await expect(page.locator(".docs-home-tasks")).toHaveCount(0);
    expect(new URL(page.url()).search).toBe("");
    await input.fill("zzzz-no-real-document-42");
    await expect(page.locator(".docs-home-empty")).toBeVisible();
    await expect(page.locator(".docs-home-result")).toHaveCount(0);
    await input.press("Escape");
    await expect(input).toHaveValue("");
    await expect(page.locator(".docs-home-task")).toHaveCount(4);
    await input.fill("engine");
    await page.locator(".docs-home-search button").click();
    await expect(input).toBeFocused();
    await expect(page.locator(".docs-home-results")).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test("topic jumps reveal native directory disclosures and guide navigation leaves the reader untouched", async ({
  page,
}) => {
  await page.goto("docs/");
  const link = page.locator(".docs-home-topic-more").first();
  const id = (await link.getAttribute("href"))!.slice(1);
  await link.focus();
  await page.keyboard.press("Enter");
  const details = page.locator(`[id="${id}"]`);
  await expect(details).toHaveJSProperty("open", true);
  await expect(details.locator("summary")).toBeFocused();
  await details.locator("a[data-content-ref]").first().click();
  await expect(page.locator("[data-content-key^='document:']")).toBeVisible();
  await expect(page.locator(".docs-home")).toHaveCount(0);
  await expect(page.locator(".reader-prose")).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
});

test("all documents remain available through native disclosures without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  try {
    const page = await context.newPage();
    for (const zh of [false, true]) {
      await page.goto(zh ? "docs/zh/" : "docs/");
      await expect(page.locator(".docs-home-nojs")).toBeVisible();
      expect(
        await page.locator(".docs-home-directory [data-content-ref]").count(),
      ).toBe(visibleKeys(zh).length);
      const details = page.locator(".docs-home-directory-group").first();
      await details.locator("summary").click();
      await expect(
        details.locator("a[data-content-ref]").first(),
      ).toBeVisible();
      const archive = page.locator("#docs-archive-originals");
      if (await archive.count()) {
        await archive.locator("summary").click();
        await expect(
          archive.locator("a[data-content-ref]").first(),
        ).toBeVisible();
      }
      await details.locator("a[data-content-ref]").first().click();
      await expect(page.locator(".reader-prose")).toBeVisible();
    }
  } finally {
    await context.close();
  }
});

test("the portal fits small screens and both themes with aligned task cards", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One explicit responsive theme/language matrix",
  );
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 390, 800, 1000, 1440]) {
    await page.setViewportSize({ width, height: 1100 });
    for (const path of ["docs/", "docs/zh/"])
      for (const theme of ["light", "dark"]) {
        await page.addInitScript(
          (value) => localStorage.setItem("theme", value),
          theme,
        );
        await page.goto(path);
        await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
        await expect(page.locator("html")).toHaveClass(new RegExp(theme));
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        const cards = await page
          .locator(".docs-home-task")
          .evaluateAll((nodes) =>
            nodes.map((element) => {
              const r = element.getBoundingClientRect();
              return {
                top: r.top,
                width: r.width,
                height: r.height,
                footer: element
                  .querySelector(".docs-home-task-target")!
                  .getBoundingClientRect().top,
              };
            }),
          );
        const rows: (typeof cards)[] = [];
        for (const card of cards) {
          let row = rows.find((row) => Math.abs(row[0].top - card.top) < 1);
          if (!row) {
            row = [];
            rows.push(row);
          }
          row.push(card);
        }
        for (const row of rows)
          for (const field of ["width", "height", "footer"] as const) {
            const values = row.map((card) => card[field]);
            expect(
              Math.max(...values) - Math.min(...values),
              `${width} ${path} ${theme} ${field}`,
            ).toBeLessThanOrEqual(1);
          }
        await page
          .locator(".docs-home-directory-group summary")
          .first()
          .click();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
  }
  expect(errors).toEqual([]);
});
