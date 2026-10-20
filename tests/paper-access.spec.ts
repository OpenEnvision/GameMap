import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import { isAcademicPaper, paperRoles, type PaperReference, type PaperRole } from "../website/content/papers";
import {
  paperCodeStatuses, paperDemoAccess, practicalPaperScore, type PaperAccess,
} from "../website/content/paper-access";

// Browser plugin not available. Exercise the project's static preview with its
// existing Playwright desktop/mobile projects; never visit external artifacts.
const papers = JSON.parse(readFileSync("data/papers.json", "utf8")) as PaperReference[];
const academic = papers.filter(isAcademicPaper);
const byId = new Map(papers.map((paper) => [paper.id, paper]));
const rows = (page: Page) => page.locator(".paper-rows [data-paper-row]");
const rowIds = (page: Page) => rows(page).evaluateAll((nodes) =>
  nodes.map((node) => node.getAttribute("data-paper-row")!));
const escaped = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function access(paper: PaperReference): PaperAccess {
  expect(paper.access, `Artifact review exists for ${paper.title}`).toBeTruthy();
  return paper.access!;
}
const implementationKinds = new Set(["implementation", "partial", "benchmark", "data-tools"]);
const hasPublishedCode = (paper: PaperReference) =>
  ["open-source", "source-available", "restricted"].includes(access(paper).codeStatus)
  && access(paper).repositories.some((repository) => implementationKinds.has(repository.kind));
const hasPublicOnlineDemo = (paper: PaperReference) => access(paper).demos
  .some((demo) => demo.kind === "interactive" && demo.access === "public");
const knownOfflineSpaces = [
  "https://huggingface.co/spaces/Microsoft/TRELLIS",
  "https://huggingface.co/spaces/craigwu/vstar",
];

async function openAccessFilters(page: Page) {
  const toggle = page.getByRole("button", { name: /Code, project & demo filters/ });
  if (await toggle.isVisible() && await toggle.getAttribute("aria-expanded") === "false") {
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
  }
  await expect(page.getByRole("combobox", { name: "Code availability", exact: true })).toBeVisible();
}
async function selectRole(page: Page, role: PaperRole) {
  const mobile = page.getByRole("combobox", { name: "Paper research role", exact: true });
  if (await mobile.isVisible()) await mobile.selectOption(role);
  else await page.getByRole("navigation", { name: "Paper research roles", exact: true })
    .getByRole("button", { name: new RegExp(escaped(paperRoles[role].label)) }).click();
}
async function expectOnly(page: Page, predicate: (paper: PaperReference) => boolean) {
  await expect(rows(page).first()).toBeVisible();
  await expect.poll(async () => (await rowIds(page)).every((id) => predicate(byId.get(id)!)))
    .toBeTruthy();
}
const runtimeErrors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(async ({ page }) => {
  expect(runtimeErrors.get(page), "No paper-artifact hydration or runtime errors").toEqual([]);
  await expect(page.locator("vite-error-overlay")).toHaveCount(0);
});

test("practical ordering promotes public interaction and gives index placeholders no code priority", async ({ page }) => {
  const unavailableRepository: PaperAccess = {
    codeStatus: "unverified", repositories: [{ label: "Paper-linked repository (unverified)",
      url: "https://github.com/Nitrode-Research/GameEngineBench", kind: "implementation",
      license: { status: "unspecified", name: "Not established" } }],
    projects: [], demos: [], reviewStatus: "unverified", checkedAt: "", evidence: [], notes: [],
  };
  expect(practicalPaperScore({ access: unavailableRepository }),
    "An unavailable paper-linked repository earns no usable-code priority").toBe(0);
  expect(academic.every((paper) => paper.access), "Every academic reference has an artifact review").toBeTruthy();
  const publicDemos = academic.filter(hasPublicOnlineDemo);
  expect(publicDemos.length, "The practical library includes real public demo entry points").toBeGreaterThan(0);
  await page.goto("papers/");
  await expect(page.getByRole("combobox", { name: "Paper sorting", exact: true })).toHaveValue("practical");
  expect(new URL(page.url()).searchParams.has("sort")).toBeFalsy();
  await expect(rows(page)).toHaveCount(Math.min(24, academic.length));
  const visible = (await rowIds(page)).map((id) => byId.get(id)!);
  expect(visible.slice(0, Math.min(24, publicDemos.length)).every(hasPublicOnlineDemo),
    "Public interactive research precedes code-only and paper-only entries").toBeTruthy();
  for (const paper of visible.filter(hasPublicOnlineDemo)) {
    const row = page.locator(`[data-paper-row="${paper.id}"]`);
    const offered = access(paper).demos.filter((demo) => demo.kind === "interactive" && demo.access === "public");
    const href = await row.getByRole("link", { name: "Try demo", exact: true }).getAttribute("href");
    expect(offered.map((demo) => demo.url)).toContain(href);
  }

  const index = academic.find((paper) => access(paper).repositories.length > 0
    && access(paper).repositories.every((repository) => repository.kind === "research-index")
    && access(paper).demos.length === 0)!;
  expect(index, "A genuine release placeholder or research index is available").toBeTruthy();
  expect(practicalPaperScore(index), "A licensed page/index earns no source-code bonus")
    .toBe(access(index).projects.length ? 10 : 0);
  await page.goto(`papers/?q=${encodeURIComponent(index.title)}`);
  const indexRow = page.locator(`[data-paper-row="${index.id}"]`);
  await expect(indexRow).toBeVisible();
  await expect(indexRow.getByRole("link", { name: /^Code(?: \(partial\))?$/ })).toHaveCount(0);
  await openAccessFilters(page);
  await page.getByRole("combobox", { name: "Code availability", exact: true }).selectOption("available");
  await expect(page.locator(`[data-paper-row="${index.id}"]`)).toHaveCount(0);

  const unavailable = academic.find((paper) => access(paper).codeStatus === "unverified"
    && access(paper).repositories.length > 0);
  if (unavailable) {
    await page.goto(`papers/?q=${encodeURIComponent(unavailable.title)}&code=available`);
    await expect(page.locator(`[data-paper-row="${unavailable.id}"]`),
      "A paper-linked but unavailable repository is not published usable source").toHaveCount(0);
  }
});

test("code filters distinguish licensed implementations, partial artifacts and restricted or unclear terms", async ({ page }) => {
  await page.goto("papers/");
  await openAccessFilters(page);
  const code = page.getByRole("combobox", { name: "Code availability", exact: true });
  await code.selectOption("open-source");
  await expectOnly(page, (paper) => access(paper).codeStatus === "open-source"
    && hasPublishedCode(paper) && access(paper).repositories.some((repository) =>
      repository.kind !== "research-index" && repository.license.status === "open-source"
      && !!repository.license.url));

  const partial = academic.find((paper) => paper.arxivId === "2608.25927")
    || academic.find((paper) => hasPublishedCode(paper)
      && access(paper).repositories.some((repository) => repository.kind === "partial"))!;
  expect(partial, "The catalogue preserves an explicitly partial research release").toBeTruthy();
  await page.goto(`papers/?q=${encodeURIComponent(partial.title)}&code=partial`);
  const partialRow = page.locator(`[data-paper-row="${partial.id}"]`);
  await expect(partialRow).toBeVisible();
  await expect(partialRow.getByRole("link", { name: "Code (partial)", exact: true })).toBeVisible();
  await expect(partialRow.locator(".paper-scope")).toContainText("Partial implementation");
  await partialRow.getByRole("link", { name: "Details", exact: true }).click();
  await expect(page.locator("main#main-content")).toContainText(access(partial).notes[0]);

  for (const status of ["source-available", "restricted", "not-released"] as const) {
    const matching = academic.filter((paper) => access(paper).codeStatus === status);
    expect(matching.length, `Real ${status} artifact fixture exists`).toBeGreaterThan(0);
    await page.goto(`papers/?code=${status}`);
    await expectOnly(page, (paper) => access(paper).codeStatus === status);
    await expect(rows(page).first().locator(".paper-availability")).toHaveAttribute("data-code-status", status);
    if (status !== "not-released") {
      await expect(rows(page).first().locator(".paper-code-status")).toHaveText(paperCodeStatuses[status]);
    }
    if (status === "not-released") {
      await expect(rows(page).getByRole("link", { name: /^Code(?: \(partial\))?$/ })).toHaveCount(0);
    }
  }
});

test("demo filters preserve access conditions and exclude failed hosted endpoints from online results", async ({ page }) => {
  // These endpoints were checked during artifact review. A reachable project or
  // a local fallback must never turn a failed hosted Space into an online demo.
  for (const paper of papers) {
    for (const demo of access(paper).demos.filter((item) => item.kind === "interactive")) {
      expect(knownOfflineSpaces.map((url) => url.toLowerCase())).not.toContain(demo.url.toLowerCase());
    }
  }
  await page.goto("papers/?demo=online");
  await expectOnly(page, (paper) => access(paper).demos.some((demo) => demo.kind === "interactive"));
  await openAccessFilters(page);
  const demoFilter = page.getByRole("combobox", { name: "Demo availability", exact: true });
  await demoFilter.selectOption("public");
  await expectOnly(page, hasPublicOnlineDemo);
  await demoFilter.selectOption("local");
  await expectOnly(page, (paper) => access(paper).demos.some((demo) => demo.kind === "local" || demo.kind === "download"));

  const signIn = academic.find((paper) => access(paper).demos.some((demo) =>
    demo.kind === "interactive") && access(paper).demos
    .filter((demo) => demo.kind === "interactive").every((demo) => demo.access === "signup"));
  const conditional = signIn || academic.find((paper) =>
    !access(paper).demos.some((demo) => demo.kind === "interactive")
    && access(paper).demos.some((demo) => demo.access !== "public"))!;
  expect(conditional, "A genuinely conditional demo, rather than a fabricated account requirement, exists").toBeTruthy();
  await page.goto(`papers/?q=${encodeURIComponent(conditional.title)}&demo=${signIn ? "online" : "local"}`);
  const row = page.locator(`[data-paper-row="${conditional.id}"]`);
  await expect(row).toBeVisible();
  const demoLink = row.locator(".paper-try-demo");
  const offeredUrl = await demoLink.getAttribute("href");
  const wanted = access(conditional).demos.find((demo) => demo.url === offeredUrl)!;
  expect(wanted, "The offered demo URL belongs to this paper's reviewed artifacts").toBeTruthy();
  expect(wanted.access).not.toBe("public");
  if (signIn) expect(wanted.access).toBe("signup");
  await expect(demoLink).toHaveAttribute("title", paperDemoAccess[wanted.access]);
  await openAccessFilters(page);
  await page.getByRole("combobox", { name: "Demo availability", exact: true }).selectOption("public");
  await expect(page.locator(`[data-paper-row="${conditional.id}"]`)).toHaveCount(0);
});

test("artifact filters compose with query, role and year, survive reload and reset cleanly on mobile", async ({ page, isMobile }) => {
  const fixture = academic.find((paper) => access(paper).codeStatus === "open-source"
    && hasPublishedCode(paper) && hasPublicOnlineDemo(paper) && access(paper).projects.length > 0)!;
  expect(fixture, "A real useful research entry supports a combined filter").toBeTruthy();
  const query = fixture.title.split(/\s+/).find((word) => /^[A-Za-z0-9-]{4,}$/.test(word))!;
  expect(query).toBeTruthy();
  await page.goto("papers/?page=2");
  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBe("2");
  const toggle = page.getByRole("button", { name: /Code, project & demo filters/ });
  if (isMobile) {
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("combobox", { name: "Code availability", exact: true })).not.toBeVisible();
  }
  await openAccessFilters(page);
  await page.getByRole("combobox", { name: "Code availability", exact: true }).selectOption("open-source");
  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBeNull();
  await page.getByRole("combobox", { name: "Demo availability", exact: true }).selectOption("public");
  await page.getByRole("checkbox", { name: "With a project page", exact: true }).check();
  await page.getByRole("combobox", { name: "Paper year", exact: true }).selectOption(String(fixture.year));
  await selectRole(page, fixture.primaryRole);
  await page.getByRole("textbox", { name: "Search papers", exact: true }).fill(query);
  await expect(page.locator(`[data-paper-row="${fixture.id}"]`)).toBeVisible();
  const states = () => {
    const params = new URL(page.url()).searchParams;
    return [params.get("q"), params.get("role"), params.get("year"), params.get("code"),
      params.get("demo"), params.get("project"), params.get("page"), params.get("sort")];
  };
  await expect.poll(states).toEqual([query, fixture.primaryRole, String(fixture.year), "open-source", "public", "yes", null, null]);
  await expectOnly(page, (paper) => paper.year === fixture.year && paper.roles.includes(fixture.primaryRole)
    && access(paper).codeStatus === "open-source" && hasPublicOnlineDemo(paper)
    && access(paper).projects.length > 0);
  const before = await rowIds(page);
  if (isMobile) {
    await expect(toggle.locator("span")).toHaveText("3");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle.locator("span")).toHaveText("3");
  }
  await page.reload();
  await expect.poll(() => rowIds(page)).toEqual(before);
  await openAccessFilters(page);
  await expect(page.getByRole("combobox", { name: "Code availability", exact: true })).toHaveValue("open-source");
  await expect(page.getByRole("combobox", { name: "Demo availability", exact: true })).toHaveValue("public");
  await expect(page.getByRole("checkbox", { name: "With a project page", exact: true })).toBeChecked();
  const sorting = page.getByRole("combobox", { name: "Paper sorting", exact: true });
  await sorting.selectOption("newest");
  await expect.poll(() => new URL(page.url()).searchParams.get("sort")).toBe("newest");
  await sorting.selectOption("practical");
  await expect.poll(() => new URL(page.url()).searchParams.get("sort")).toBeNull();
  if (isMobile) {
    await page.setViewportSize({ width: 320, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      "Expanded research filters fit a 320px viewport").toBeTruthy();
    const controlsFit = await page.locator(".paper-use-filters").evaluate((panel) =>
      [...panel.querySelectorAll("select, label")].every((control) => {
        const box = control.getBoundingClientRect();
        return box.left >= 0 && box.right <= innerWidth + 1;
      }));
    expect(controlsFit, "Artifact selects and the project checkbox stay in the mobile viewport").toBeTruthy();
  }
  await page.getByRole("textbox", { name: "Search papers", exact: true }).fill("no-artifact-can-match-this-892301");
  await expect(rows(page)).toHaveCount(0);
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect.poll(() => new URL(page.url()).search).toBe("");
  await expect(sorting).toHaveValue("practical");
  await expect(page.getByRole("combobox", { name: "Code availability", exact: true })).toHaveValue("all");
  await expect(page.getByRole("combobox", { name: "Demo availability", exact: true })).toHaveValue("all");
  await expect(page.getByRole("checkbox", { name: "With a project page", exact: true })).not.toBeChecked();
  await expect(rows(page)).toHaveCount(Math.min(24, academic.length));
  if (isMobile) await expect(toggle.locator("span")).toHaveCount(0);
});

test("paper details put real publication and artifact links before full license, setup and evidence records", async ({ page }) => {
  const paper = academic.find((item) => item.arxivId === "2302.05981" && item.pdfUrl && item.access)
    || academic.find((item) => item.pdfUrl && access(item).codeStatus === "open-source"
      && hasPublicOnlineDemo(item) && access(item).projects.length > 0 && access(item).notes.length > 0)!;
  expect(paper, "A fully sourced practical paper is available").toBeTruthy();
  const artifact = access(paper);
  await page.goto(`papers/${encodeURIComponent(paper.id)}/`);
  const main = page.locator("main#main-content");
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(paper.title);
  const quick = main.locator(".record-project-start");
  await expect(quick.getByRole("link", { name: "Read paper", exact: true })).toHaveAttribute("href", paper.url);
  await expect(quick.getByRole("link", { name: "PDF", exact: true })).toHaveAttribute("href", paper.pdfUrl!);
  const publicationBox = await quick.locator(".record-quick-actions").boundingBox();
  expect(publicationBox, "Publication actions are rendered").not.toBeNull();
  expect(publicationBox!.y, "Publication/PDF entry points appear in the first viewport")
    .toBeLessThan(page.viewportSize()!.height);
  const quickLinks = quick.locator(".paper-artifact-links");
  const repository = artifact.repositories.find((item) => item.kind === "implementation" || item.kind === "benchmark")
    || artifact.repositories.find((item) => item.kind !== "research-index")!;
  await expect(quickLinks.getByRole("link", { name: /^Code(?: \(partial\))?$/ })).toHaveAttribute("href", repository.url);
  if (artifact.projects.length) {
    await expect(quickLinks.getByRole("link", { name: "Project", exact: true })).toHaveAttribute("href", artifact.projects[0].url);
  }
  const publicDemo = artifact.demos.find((demo) => demo.kind === "interactive" && demo.access === "public")!;
  await expect(quickLinks.getByRole("link", { name: "Try demo", exact: true })).toHaveAttribute("href", publicDemo.url);
  await expect(quickLinks.getByRole("link", { name: "Try demo", exact: true })).toHaveAttribute("title", paperDemoAccess[publicDemo.access]);
  const allowedUrls = new Set([...artifact.repositories, ...artifact.projects, ...artifact.demos].map((item) => item.url));
  for (const link of await quickLinks.locator("a").all()) {
    expect(allowedUrls.has((await link.getAttribute("href"))!)).toBeTruthy();
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noreferrer/);
    const box = await link.boundingBox();
    expect(box, "Practical artifact action is rendered").not.toBeNull();
    expect(box!.y + box!.height, "Code/project/demo actions fit in the initial detail viewport")
      .toBeLessThanOrEqual(page.viewportSize()!.height + 1);
  }
  await expect(quick.locator(".paper-availability")).toHaveAttribute("data-code-status", artifact.codeStatus);
  const fullLinks = await main.locator("a[href]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
  for (const item of artifact.repositories) {
    expect(fullLinks).toContain(item.url);
    await expect(main).toContainText(item.license.name);
    if (item.license.url) expect(fullLinks).toContain(item.license.url);
  }
  for (const demo of artifact.demos) {
    expect(fullLinks).toContain(demo.url);
    await expect(main).toContainText(paperDemoAccess[demo.access]);
    await expect(main).toContainText(demo.note);
  }
  for (const item of artifact.evidence) expect(fullLinks).toContain(item.url);
  for (const note of artifact.notes) await expect(main).toContainText(note);
  await expect(main).toContainText(artifact.checkedAt);
  await page.reload();
  await expect(quick.getByRole("link", { name: "Read paper", exact: true })).toHaveAttribute("href", paper.url);
});
