import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";
import redirects from "../../website/content/document-redirects.json" with { type: "json" };

const content = await loadContent();
const foundations = content.registry.all("foundation");

test("official foundations share the searchable game grid exactly once without AI-authorship claims", async ({
  page,
}) => {
  await page.goto("zh/examples/");
  await expect(page.locator(".foundation-section")).toHaveCount(0);
  for (const entry of foundations) {
    const card = page.locator(
      `#game-examples > [data-content-ref="${entry.key}"]`,
    );
    await expect(card).toHaveCount(1);
    await expect(card.locator(".example-image")).toHaveAttribute(
      "href",
      entry.data.demo.url,
    );
    await expect(card.locator(".example-links a").first()).toHaveAttribute(
      "href",
      `/zh/examples/${entry.id}/`,
    );
    await expect(card).toContainText(
      content.chineseMessages[
        "Official engine examples, not AI-authorship claims."
      ],
    );
  }
  const search = page.locator("input").first();
  await search.fill(foundations[0].data.title);
  await expect(
    page.locator(`[data-content-ref="${foundations[0].key}"]`),
  ).toBeVisible();
  await page.getByRole("combobox").selectOption("claude-code");
  await expect(
    page.locator(`[data-content-ref="${foundations[0].key}"]`),
  ).toHaveCount(0);
});

test("all retired game-catalog aliases redirect to localized Examples and disappear from documentation", async ({
  page,
  baseURL,
  request,
}) => {
  for (const [oldPath, target] of Object.entries(redirects)) {
    await page.goto(new URL(oldPath.slice(1), baseURL!).href);
    await expect(page).toHaveURL(new URL(target.slice(1), baseURL!).href);
    await expect(page.locator("#game-examples")).toBeVisible();
  }
  await page.goto("docs/zh/");
  const base = new URL(baseURL!).pathname;
  for (const slug of [
    "tutorials-and-demos",
    "coding-agent-game-code",
    "cadle-repositories",
  ]) {
    await expect(page.locator(`a[href="${base}docs/zh/${slug}/"]`)).toHaveCount(
      0,
    );
    const raw = await request.get(slug + ".md");
    expect(raw.ok()).toBe(true);
    expect(await raw.text()).toBe(
      "# Game examples\n\nThis catalog has moved to [Game examples](/examples/).\n",
    );
  }
});

test("legacy document URLs also redirect without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(new URL("docs/zh/cadle-repositories/", baseURL!).href);
    await expect(page).toHaveURL(new URL("zh/examples/", baseURL!).href);
    for (const entry of foundations)
      await expect(
        page.locator(`#game-examples > [data-content-ref="${entry.key}"]`),
      ).toHaveCount(1);
  } finally {
    await context.close();
  }
});
