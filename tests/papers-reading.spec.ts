import { readFileSync } from "node:fs";
import { test, expect, type Page } from "@playwright/test";
import { paperRoles, type PaperReference, type PaperRole } from "../website/content/papers";
import { practicalPaperScore } from "../website/content/paper-access";

const papers = JSON.parse(readFileSync("data/papers.json", "utf8")) as PaperReference[];
const paperById = new Map(papers.map((paper) => [paper.id, paper]));
// These publication types are the product's academic list, including reports.
// Books, product documentation and blog posts belong in Related sources.
const academicTypes = new Set([
  "conference-paper", "journal-paper", "preprint", "survey", "technical-report",
]);
const academic = papers.filter((paper) => academicTypes.has(paper.referenceType));
const byNewest = (left: PaperReference, right: PaperReference) =>
  right.year - left.year || left.title.localeCompare(right.title, "en");
const byDefault = (left: PaperReference, right: PaperReference) =>
  practicalPaperScore(right) - practicalPaperScore(left) || byNewest(left, right);
const rows = (page: Page) => page.locator(".paper-rows [data-paper-row]");
const rowIds = (page: Page) => rows(page).evaluateAll((nodes) =>
  nodes.map((node) => node.getAttribute("data-paper-row")!));
const escaped = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function selectRole(page: Page, role: PaperRole | "all" | "related") {
  const mobile = page.getByRole("combobox", { name: "Paper research role", exact: true });
  if (await mobile.isVisible()) {
    await mobile.selectOption(role);
  } else {
    const label = role === "all" ? "All papers"
      : role === "related" ? "Related sources" : paperRoles[role].label;
    await page.getByRole("navigation", { name: "Paper research roles", exact: true })
      .getByRole("button", { name: new RegExp(escaped(label)) }).click();
  }
}

const runtimeErrors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(async ({ page }) => {
  expect(runtimeErrors.get(page), "No paper-list hydration or runtime errors").toEqual([]);
  await expect(page.locator("vite-error-overlay")).toHaveCount(0);
});

test("Paper List is reachable through More and has a readable Chinese route", async ({ page, isMobile }) => {
  await page.goto("");
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation", exact: true }).click();
    await page.getByRole("navigation", { name: "Mobile navigation", exact: true })
      .getByRole("link", { name: "Paper List", exact: true }).click();
  } else {
    const more = page.locator(".more-navigation");
    await more.locator("summary").click();
    await expect(more).toHaveAttribute("open", "");
    await more.getByRole("link", { name: "Paper List", exact: true }).click();
  }
  await expect(page).toHaveURL(/\/papers\/$/);
  await expect(page).toHaveTitle("Paper List — GameMap");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Paper List");
  await expect(rows(page)).toHaveCount(24);
  await expect(page.getByRole("textbox", { name: "Search papers", exact: true })).toBeVisible();

  await page.goto("zh/papers/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/[\p{Script=Han}]/u);
  await expect(page.locator(".paper-toolbar input")).toHaveAttribute("aria-label", /[\p{Script=Han}]/u);
  await expect(page.locator(".paper-toolbar select").first()).toHaveAttribute("aria-label", /[\p{Script=Han}]/u);
  await expect(rows(page)).toHaveCount(24);
  if (isMobile) {
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `Chinese papers fit a ${width}px viewport`).toBeTruthy();
      const controlsFit = await page.locator(".paper-toolbar").evaluate((toolbar) =>
        [...toolbar.querySelectorAll("input, select")].every((control) => {
          const box = control.getBoundingClientRect();
          return box.left >= 0 && box.right <= innerWidth + 1;
        }));
      expect(controlsFit, `Paper filters fit a ${width}px viewport`).toBeTruthy();
    }
    await page.goto("papers/");
    await page.setViewportSize({ width: 320, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      "English papers fit a 320px viewport").toBeTruthy();
  }
});

test("paper query, role, year, sorting and page compose across reload and back", async ({ page }) => {
  // Pick a real role/year/query combination with a second page, without hardcoding
  // a bibliography size or relying on publication titles staying unchanged.
  const fixture = Object.keys(paperRoles).flatMap((role) =>
    [...new Set(academic.map((paper) => paper.year))].flatMap((year) =>
      ["world", "game", "agent", "model"].map((query) => ({ role: role as PaperRole, year, query,
        count: academic.filter((paper) => paper.roles.includes(role as PaperRole)
          && paper.year === year && paper.title.toLowerCase().includes(query)).length,
      }))))
    .filter(({ count }) => count > 24).sort((a, b) => b.count - a.count)[0];
  expect(fixture, "The research library has a meaningful multi-page filter fixture").toBeTruthy();
  await page.goto("papers/");
  const search = page.getByRole("textbox", { name: "Search papers", exact: true });
  const year = page.getByRole("combobox", { name: "Paper year", exact: true });
  const sorting = page.getByRole("combobox", { name: "Paper sorting", exact: true });
  // Sequential key presses do not wait for the inherited hydration gate.
  await expect(search).toBeEditable();
  await search.pressSequentially(fixture.query);
  await expect(search).toHaveValue(fixture.query);
  await selectRole(page, fixture.role);
  await year.selectOption(String(fixture.year));
  await sorting.selectOption("title");
  const pagination = page.locator(".paper-results .reading-pagination:not(.reading-pagination-compact)");
  await expect(pagination.getByRole("link", { name: "Next", exact: true })).toBeVisible();
  await pagination.getByRole("link", { name: "Next", exact: true }).click();
  await expect.poll(() => {
    const params = new URL(page.url()).searchParams;
    return [params.get("q"), params.get("role"), params.get("year"), params.get("sort"), params.get("page")];
  }).toEqual([fixture.query, fixture.role, String(fixture.year), "title", "2"]);
  await expect(rows(page).first()).toBeVisible();
  const secondPageIds = await rowIds(page);
  expect(secondPageIds.length).toBeGreaterThan(0);
  expect(secondPageIds.length).toBeLessThanOrEqual(24);
  const secondPagePapers = secondPageIds.map((id) => paperById.get(id)!);
  expect(secondPagePapers.every((paper) => paper.year === fixture.year && paper.roles.includes(fixture.role)))
    .toBeTruthy();
  expect(secondPagePapers.map((paper) => paper.title)).toEqual(
    [...secondPagePapers].sort((a, b) => a.title.localeCompare(b.title, "en")).map((paper) => paper.title));

  await page.reload();
  await expect(search).toHaveValue(fixture.query);
  await expect(year).toHaveValue(String(fixture.year));
  await expect(sorting).toHaveValue("title");
  await expect.poll(() => rowIds(page)).toEqual(secondPageIds);
  await rows(page).first().getByRole("link", { name: "Details", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(secondPagePapers[0].title);
  await page.goBack();
  await expect(search).toHaveValue(fixture.query);
  await expect.poll(() => rowIds(page)).toEqual(secondPageIds);
  expect(new URL(page.url()).searchParams.get("page")).toBe("2");
});

test("paper filters reset pagination, clear an empty result and clamp stale pages", async ({ page }) => {
  const lastPage = Math.ceil(academic.length / 24);
  const prioritized = [...academic].sort(byDefault);
  await page.goto("papers/?page=99999");
  await expect.poll(() => new URL(page.url()).searchParams.get("page"))
    .toBe(lastPage > 1 ? String(lastPage) : null);
  await expect.poll(() => rowIds(page)).toEqual(prioritized.slice((lastPage - 1) * 24).map((paper) => paper.id));
  const oldestYear = Math.min(...academic.map((paper) => paper.year));
  await page.getByRole("combobox", { name: "Paper year", exact: true }).selectOption(String(oldestYear));
  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBeNull();
  await expect(rows(page).first()).toBeVisible();
  await expect.poll(async () => (await rowIds(page)).every((id) => paperById.get(id)?.year === oldestYear))
    .toBeTruthy();
  await page.getByRole("combobox", { name: "Paper sorting", exact: true }).selectOption("oldest");
  await page.getByRole("textbox", { name: "Search papers", exact: true }).fill("no-paper-can-match-this-917352");
  await expect(rows(page)).toHaveCount(0);
  await expect(page.locator(".paper-results .empty-state")).toContainText("No matching references.");
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Search papers", exact: true })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Paper year", exact: true })).toHaveValue("all");
  await expect(page.getByRole("combobox", { name: "Paper sorting", exact: true })).toHaveValue("practical");
  await expect.poll(() => new URL(page.url()).search).toBe("");
  await expect.poll(() => rowIds(page)).toEqual(prioritized.slice(0, 24).map((paper) => paper.id));
});

test("academic reports, secondary roles and Related sources stay distinct", async ({ page }) => {
  await page.goto("papers/");
  await expect.poll(() => rowIds(page)).toEqual([...academic].sort(byDefault).slice(0, 24).map((paper) => paper.id));
  expect((await rowIds(page)).every((id) => academicTypes.has(paperById.get(id)!.referenceType))).toBeTruthy();
  await selectRole(page, "related");
  await expect.poll(() => new URL(page.url()).searchParams.get("role")).toBe("related");
  await expect(rows(page).first()).toBeVisible();
  await expect.poll(async () => (await rowIds(page)).every((id) => !academicTypes.has(paperById.get(id)!.referenceType)))
    .toBeTruthy();

  const report = academic.find((paper) => paper.referenceType === "technical-report")!;
  expect(report, "At least one separately labeled technical report is in the academic list").toBeTruthy();
  await page.goto(`papers/?q=${encodeURIComponent(report.title)}`);
  await expect(page.locator(`[data-paper-row="${report.id}"]`)).toHaveAttribute("data-paper-type", "technical-report");
  const multi = academic.find((paper) => paper.roles.some((role) => role !== paper.primaryRole))!;
  expect(multi, "The library preserves papers assigned to multiple roles").toBeTruthy();
  const secondary = multi.roles.find((role) => role !== multi.primaryRole)!;
  await page.goto(`papers/?q=${encodeURIComponent(multi.title)}&role=${secondary}`);
  await expect(page.locator(`[data-paper-row="${multi.id}"]`)).toBeVisible();
  expect(multi.primaryRole).not.toBe(secondary);
});

test("the complete reference index contains every unique imported publication", async ({ page, request }) => {
  expect(papers.length).toBeGreaterThan(400);
  expect(new Set(papers.map((paper) => paper.id)).size).toBe(papers.length);
  await page.goto("papers/");
  const index = page.locator("details.paper-index");
  await expect(index).not.toHaveAttribute("open", "");
  await index.locator("summary").click();
  await expect(index).toHaveAttribute("open", "");
  const references = index.locator("li[data-content-ref]");
  await expect(references).toHaveCount(papers.length);
  const actual = await references.evaluateAll((nodes) => nodes.map((node) => ({
    key: node.getAttribute("data-content-ref"),
    href: node.querySelector("a")?.getAttribute("href"),
    title: node.querySelector("a")?.textContent,
  })));
  expect(actual.map((item) => item.key).sort()).toEqual(papers.map((paper) => `paper:${paper.id}`).sort());
  expect(new Set(actual.map((item) => item.href)).size).toBe(papers.length);
  for (const item of actual) {
    const paper = paperById.get(item.key!.replace(/^paper:/, ""))!;
    expect(item.href).toMatch(new RegExp(`/papers/${escaped(encodeURIComponent(paper.id))}/$`));
    expect(item.title).toBe(paper.title);
  }
  const download = page.locator(".paper-downloads").getByRole("link", { name: "Download JSON", exact: true });
  const response = await request.get(new URL((await download.getAttribute("href"))!, page.url()).href);
  expect(response.ok()).toBeTruthy();
  const exported = await response.json() as PaperReference[];
  expect(exported.map((paper) => paper.id).sort()).toEqual(papers.map((paper) => paper.id).sort());
});

test("paper details preserve canonical title, original PDF and source provenance", async ({ page, context }) => {
  const paper = academic.find((item) => item.pdfUrl && item.origins.length && item.citedSections.length)!;
  expect(paper, "A sourced research publication with a PDF is available").toBeTruthy();
  await page.goto(`papers/${encodeURIComponent(paper.id)}/`);
  const main = page.locator("main#main-content");
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(paper.title);
  await expect(main.getByRole("link", { name: "Read paper", exact: true })).toHaveAttribute("href", paper.url);
  await expect(main.getByRole("link", { name: "PDF", exact: true }).first()).toHaveAttribute("href", paper.pdfUrl!);
  const citation = main.locator("details.paper-citation");
  await citation.locator("summary").click();
  await expect(citation).toContainText(paper.title);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await citation.getByRole("button", { name: "Copy citation", exact: true }).click();
  await expect(citation.getByRole("button", { name: "Citation copied", exact: true })).toBeVisible();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain(paper.title);
  expect(copied).toContain(paper.authors.replace(/\.$/, ""));
  expect(copied).toContain(paper.url);
  await expect(main).toContainText(String(paper.year));
  await expect(main).toContainText(paper.authors);
  const sourceLinks = await main.locator("a[href]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
  expect(sourceLinks).toContain(paper.origins[0].url);
  expect(sourceLinks).toContain(paper.citedSections[0].url);
  await page.reload();
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(paper.title);
  await expect(main.getByRole("link", { name: "Read paper", exact: true })).toHaveAttribute("href", paper.url);
});
