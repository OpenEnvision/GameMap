import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
const key = "a".repeat(64);
const original =
  "# 历史来源\n\nLicense: CC BY-NC; not built, not playtested.\n<script>window.researchExecuted=true</script>\n";
const finding = {
  source_key: key,
  source_title: "Batch 001 source review",
  ordinal: 1,
  kind: "candidate",
  title: "hexgl",
  excerpt:
    "CC BY-NC notices; pending license. Not built, not playtested; upstream tests not run.",
  fields: { status: "pending" },
  catalog_keys: ["resource:codex"],
};

test("research evidence is searchable, preserves candidate limits and downloads inert original text", async ({
  page,
}) => {
  await page.route("**/api/research-sources**", (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith(key))
      return route.fulfill({
        json: {
          source: {
            key,
            title: "Batch 001 source review",
            format: "archived-markdown",
            original_text: original,
            markdown: original,
            source: {
              repository: "https://github.com/OpenEnvision/GameMap",
              revision: "b".repeat(40),
              path: "evidence/batch-001.md",
              sha256: "c".repeat(64),
              bytes: Buffer.byteLength(original),
            },
            provenance: { playtested: false, license: "pending" },
            findings: [{ ...finding, text: finding.excerpt, links: [] }],
          },
        },
      });
    return route.fulfill({
      json: {
        total: url.searchParams.get("q") === "missing" ? 0 : 1,
        sources: 49,
        offset: 0,
        limit: 40,
        items: url.searchParams.get("q") === "missing" ? [] : [finding],
      },
    });
  });
  await page.goto("/");
  await page.getByLabel("邮箱", { exact: true }).fill("editor@example.invalid");
  await page
    .getByLabel("密码", { exact: true })
    .fill("test-fixture-only-password");
  await page.getByRole("button", { name: "登录工作台", exact: true }).click();
  await page.getByRole("button", { name: "研究证据", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "研究证据", exact: true }),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "搜索研究证据" }).fill("CC BY-NC");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("1 条匹配记录");
  await expect(page.locator(".research-results")).toContainText(
    "原始状态：pending",
  );
  await expect(page.locator(".research-results")).toContainText(
    "not playtested",
  );
  await page.getByRole("button", { name: "hexgl", exact: true }).click();
  await expect(page.locator(".research-source-meta")).toContainText(
    "evidence/batch-001.md",
  );
  await page.getByText("完整原始文本（只读，不执行）", { exact: true }).click();
  await expect(page.locator(".research-source pre").first()).toContainText(
    "<script>window.researchExecuted=true</script>",
  );
  expect(
    await page.evaluate(
      () =>
        (window as Window & { researchExecuted?: boolean }).researchExecuted,
    ),
  ).toBeUndefined();
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "下载原始文本" }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("batch-001.md.txt");
  expect(await readFile((await download.path())!, "utf8")).toBe(original);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "返回搜索结果" }).click();
  await page.getByRole("textbox", { name: "搜索研究证据" }).fill("missing");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  await expect(
    page.getByText("没有匹配的证据记录。试试项目名称或更短的关键词。"),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "搜索研究证据" }).fill("CC BY-NC");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  await page
    .getByRole("button", { name: "resource:codex", exact: true })
    .click();
  await expect(page).toHaveURL(/entry=resource%3Acodex/);
  await expect(page.locator(".editor-heading h1")).toContainText("Codex");
});
