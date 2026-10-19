import { test, expect, type APIRequestContext } from "@playwright/test";
import type { ContentEntry, ContentKind } from "../website/content/models";
import { agentResourceKinds } from "../website/src/data/agentGameTypes";
import { url } from "../website/content/site";

type PublishedRecord = Pick<
  ContentEntry,
  "key" | "kind" | "id" | "title" | "url" | "blocks"
>;
interface Manifest {
  recordings: {id:string;views:string[]}[];
  totalRecords: number;
  counts: Record<ContentKind, number>;
  records: PublishedRecord[];
}
async function inventory(
  request: APIRequestContext,
  baseURL: string | undefined,
): Promise<Manifest> {
  const response = await request.get(baseURL + "content-manifest.json");
  expect(response.ok()).toBeTruthy();
  return response.json();
}
const route = (url: string) => url.replace(/^\//, "");
const errors = new WeakMap<object, string[]>();
test.beforeEach(({ page }) => {
  const list: string[] = [];
  errors.set(page, list);
  page.on("pageerror", (error) => list.push(error.message));
  page.on("response", (response) => {
    if (
      response.url().startsWith("http://127.0.0.1:4176") &&
      response.status() >= 400
    )
      list.push(`HTTP ${response.status()}: ${response.url()}`);
  });
});
test.afterEach(({ page }) =>
  expect(
    errors.get(page),
    "No hydration errors or missing local assets",
  ).toEqual([]),
);

test("complete index exposes every registered record and finds a deliverable", async ({
  page,
  request,
  baseURL,
}) => {
  const manifest = await inventory(request, baseURL);
  await page.goto("explore/");
  await expect(page.locator("main [data-content-ref]")).toHaveCount(
    manifest.totalRecords,
  );
  const step = manifest.records.find((entry) => entry.kind === "step")!;
  const deliverable = step.blocks.find(
    (block) => block.field === "deliverable",
  );
  if (!deliverable || deliverable.type !== "text")
    throw new Error("Missing declared deliverable fixture");
  await page
    .getByRole("combobox", { name: "Content type", exact: true })
    .selectOption("step");
  await page
    .getByRole("textbox", { name: 'Search all content', exact:true })
    .fill(deliverable.value);
  const card = page.locator(`[data-content-ref="${step.key}"]`);
  await expect(card).toBeVisible();
  await card.getByRole("link").click();
  await expect(page).toHaveURL(
    new RegExp(step.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"),
  );
  await expect(
    page.locator(
      `[data-content-key="${step.key}"] [data-content-field="deliverable"]`,
    ),
  ).toContainText(deliverable.value);
});

test("each development track keeps every deliverable and acceptance checkpoint", async ({
  page,
  request,
  baseURL,
}) => {
  const manifest = await inventory(request, baseURL);
  for (const track of manifest.records.filter(
    (entry) => entry.kind === "path",
  )) {
    await page.goto(route(track.url));
    const steps = manifest.records.filter(
      (entry) => entry.kind === "step" && entry.url.split("#")[0] === track.url,
    );
    await expect(page.locator('[data-content-kind="step"]')).toHaveCount(
      steps.length,
    );
    for (const step of steps)
      for (const field of ["deliverable", "check"]) {
        const block = step.blocks.find((block) => block.field === field);
        if (!block || block.type !== "text")
          throw new Error(`Missing fixture ${step.key}.${field}`);
        await expect(
          page.locator(
            `[data-content-key="${step.key}"] [data-content-field="${field}"]`,
          ),
        ).toContainText(block.value);
      }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
});

test("agent filters distinguish toolkit categories from creator client/model attribution", async ({
  page,
  request,
  baseURL,
}) => {
  const manifest = await inventory(request, baseURL);
  await page.goto("agents/");
  await expect(page.locator('[data-content-ref^="agent:"]')).toHaveCount(
    manifest.counts.agent,
  );
  await expect(page.locator(".example-card")).toHaveCount(
    manifest.counts.example,
  );
  await page
    .getByRole("combobox", { name: "Agent resource kind" })
    .selectOption("bridge");
  const bridges = manifest.records.filter(
    (entry) =>
      entry.kind === "agent" &&
      entry.blocks.some(
        (block) =>
          block.field === "kind" &&
          block.type === "text" &&
          block.value === agentResourceKinds.bridge,
      ),
  );
  await expect(page.locator('[data-content-ref^="agent:"]')).toHaveCount(
    bridges.length,
  );
  await expect(page.locator(".example-card")).toHaveCount(
    manifest.counts.example,
  );
  await page
    .getByRole("combobox", { name: "Agent resource kind" })
    .selectOption("all");
  await page
    .getByRole("combobox", { name: "Client or model" })
    .selectOption("deepseek-model");
  const expected = manifest.records.filter(
    (entry) =>
      entry.kind === "example" &&
      entry.blocks.some(
        (block) =>
          block.field === "attribution" &&
          block.type === "list" &&
          block.items.includes("DeepSeek model"),
      ),
  );
  expect(expected.length).toBeGreaterThan(0);
  await expect(page.locator(".example-card")).toHaveCount(expected.length);
  for (const entry of expected)
    await expect(
      page.locator(`[data-content-ref="${entry.key}"]`),
    ).toBeVisible();
  await page.reload();
  await expect(page.locator(".example-card")).toHaveCount(expected.length);
});

test("all recording records are discoverable and one project can select multiple clips", async ({
  page,
  request,
  baseURL,
}) => {
  const manifest = await inventory(request, baseURL);
  await page.goto("showcase/");
  await expect(page.locator('.demo-card')).toHaveCount(manifest.recordings.length);
  await expect(
    page.locator('[data-content-ref="demo:opengame-skirmish"]'),
  ).toBeVisible();
  await expect(
    page.locator('[data-content-ref="demo:gamefactory-ue5-rpg"]'),
  ).toBeVisible();
  await expect(page.locator("video[autoplay]")).toHaveCount(0);
  await page.goto("resources/#resource/opengame");
  const dialog = page.getByRole("dialog");
  const selector = dialog.getByRole("combobox", { name: "Project recording" });
  await expect(dialog).toBeVisible();
  const recordings = manifest.records.filter(
    (entry) =>
      entry.kind === "demo" &&
      entry.blocks.some(
        (block) =>
          block.field === "resourceId" &&
          block.type === "links" &&
          block.items.some((item) => item.url === url.resource("opengame")),
      ),
  );
  await expect(selector.locator("option")).toHaveCount(recordings.length);
  await selector.selectOption("demo:opengame-skirmish");
  const demo = manifest.records.find(
    (entry) => entry.key === "demo:opengame-skirmish",
  )!;
  const preview = demo.blocks.find((block) => block.type === "video");
  if (!preview || preview.type !== "video")
    throw new Error("Missing preview fixture");
  await expect(dialog.locator("video:visible")).toHaveAttribute(
    "src",
    preview.src,
  );
  await expect(dialog.locator("video:visible")).toHaveAttribute(
    "preload",
    "none",
  );
  const original = demo.blocks.find((block) => block.field === "originalUrl");
  if (!original || original.type !== "links")
    throw new Error("Missing original source fixture");
  await expect(
    dialog.getByRole("link", { name: "Original video", exact: true }),
  ).toHaveAttribute("href", original.items[0].url);
  await page.keyboard.press("Escape");
});

test("research ledger preserves the latest historical-identity boundaries without claiming execution", async ({
  page,
  request,
  baseURL,
}) => {
  const manifest = await inventory(request, baseURL);
  await page.goto("research/");
  await expect(
    page.locator('main [data-content-ref^="repository-research:"]'),
  ).toHaveCount(manifest.counts["repository-research"]);
  await page.goto("research/serejaris/dust-arena/");
  await expect(
    page.locator('[data-content-field="historical_source"]'),
  ).toContainText("serejaris/claude-fable");
  await expect(
    page.locator('[data-content-field="execution_validation"]'),
  ).toContainText("Not run");
  const dated = manifest.records.find(
    (entry) =>
      entry.kind === "repository-research" &&
      entry.blocks.some(
        (block) => block.field === "alternative_maintenance_evidence",
      ),
  )!;
  await page.goto(route(dated.url));
  await expect(
    page.locator('[data-content-field="alternative_maintenance_evidence"]'),
  ).toContainText("not an independent certification");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
});

test("global search also finds a canonical resource rather than only documentation", async ({
  page,
}) => {
  await page.goto("");
  await page
    .getByRole("button", { name: "Search all content", exact: true })
    .click();
  const search = page.getByRole("dialog");
  await search.getByRole("combobox").fill("OpenAI Codex");
  const result = search
    .getByRole("option")
    .filter({ hasText: "OpenAI Codex" })
    .first();
  await expect(result).toBeVisible({ timeout: 20000 });
  await result.click();
  await expect(page).toHaveURL(/\/resources\/codex\/$/);
  await expect(
    page.locator('[data-content-key="resource:codex"]'),
  ).toBeVisible();
});

test("native Markdown summaries and source anchors survive compilation", async ({
  page,
}) => {
  await page.goto("docs/catalog/");
  await expect(page.locator("#agents")).toHaveCount(1);
  const summary = page.locator("#nd-page .prose details summary").first();
  await expect(summary).toHaveText(
    "Inputs, outputs, limitations, and further reading",
  );
  await summary.click();
  await expect(page.locator("#nd-page .prose details").first()).toHaveAttribute(
    "open",
    "",
  );
});

test("new structured content remains readable without JavaScript", async ({
  browser,
  baseURL,
  page: configuredPage,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: configuredPage.viewportSize(),
  });
  const page = await context.newPage();
  await page.goto(baseURL + "paths/2d/");
  expect(
    await page.locator('[data-content-field="deliverable"]').count(),
  ).toBeGreaterThan(0);
  await expect(
    page.locator('[data-content-field="deliverable"]').first(),
  ).toBeVisible();
  await page.goto(baseURL + "testing/");
  await expect(
    page.getByRole("textbox", { name: "Search testing resources" }),
  ).toBeDisabled();
  await expect(page.locator('[data-content-kind="testing-pack"]')).toHaveCount(
    3,
  );
  await page.goto(baseURL + "research/serejaris/dust-arena/");
  await expect(
    page.locator('[data-content-field="historical_source"]'),
  ).toBeVisible();
  await page.goto(baseURL + "showcase/opengame-skirmish/");
  await expect(page.locator("video:visible")).toHaveAttribute("controls", "");
  await context.close();
});
