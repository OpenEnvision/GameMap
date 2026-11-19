import { test, expect } from "@playwright/test";
const failures = new WeakMap<object, string[]>();
test.beforeEach(({ page }) => {
  const errors: string[] = [];
  failures.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(({ page }) =>
  expect(failures.get(page), "No locale hydration errors").toEqual([]),
);

test("every main Chinese view has a real localized title and no overflow", async ({
  page,
}) => {
  const pages = [
    ["zh/", "从一个想法，到可玩的世界。"],
    ["zh/resources/", "选择合适的开发工具。"],
    ["zh/examples/", "从一个可玩的项目开始。"],
    ["zh/agents/", "让代理接入实际开发流程。"],
    ["zh/paths/", "按步骤推进，而不是堆叠工具。"],
    ["zh/testing/", "用实际任务检验改动。"],
    ["zh/research/", "找到值得研究的项目。"],
    ["docs/zh/", "中文文档"],
  ];
  for (const [path, title] of pages) {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});

test("switching inside a resource dialog preserves filters, hash and saved state", async ({
  page,
}) => {
  await page.goto("resources/?category=engines&q=Godot#resource/godot-engine");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog
    .getByRole("button", { name: "Save resource", exact: true })
    .click();
  await dialog
    .locator(".site-language")
    .getByRole("link", { name: "中文", exact: true })
    .click();
  await expect(page).toHaveURL(
    /\/zh\/resources\/\?category=engines&q=Godot#resource\/godot-engine$/,
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(
    page
      .getByRole("dialog")
      .getByRole("button", { name: "已收藏", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("dialog").locator('[data-content-field="summary"]'),
  ).toContainText("开源");
  await page.keyboard.press("Escape");
  await page
    .locator(".site-header .site-language")
    .getByRole("link", { name: "English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/resources\/\?category=engines&q=Godot$/);
  await page.getByRole("button", { name: /^Saved/ }).click();
  await expect(page.locator(".resource-tile")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".resource-tile")).toHaveCount(1);
});

test("all curated resource introductions are Chinese and reload on their localized URL", async ({
  page,
  request,
  baseURL,
}) => {
  const manifest = await (
    await request.get(baseURL + "content-manifest.json")
  ).json();
  await page.goto("zh/resources/");
  await expect(page.locator(".resource-tile")).toHaveCount(
    manifest.counts.resource,
  );
  expect(
    await page
      .locator(".resource-description")
      .evaluateAll((nodes) =>
        nodes.every((node) => /[\p{Script=Han}]/u.test(node.textContent || "")),
      ),
  ).toBeTruthy();
  const card = page.locator('[data-content-ref="resource:codex"]');
  await card.getByRole("link", { name: "OpenAI Codex", exact: true }).click();
  await expect(page).toHaveURL(/\/zh\/resources\/codex\/$/);
  await expect(page.locator('[data-content-field="summary"]')).toContainText(
    "本地仓库",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.locator('[data-content-field="detail"]')).toContainText(
    "游戏项目",
  );
});

test("Chinese and English queries return localized canonical search results", async ({
  page,
}) => {
  await page.goto("zh/");
  await page.getByRole("button", { name: "搜索全部内容", exact: true }).click();
  const search = page.getByRole("dialog");
  await search.getByRole("combobox").fill("人形绑定");
  const result = search.locator(
    '[role="option"][id="fd-search-option-resource:meshy"]',
  );
  await expect(result).toBeVisible({ timeout: 20000 });
  await result.click();
  await expect(page).toHaveURL(/\/zh\/resources\/meshy\/$/);
  await page.getByRole("button", { name: "搜索全部内容", exact: true }).click();
  await page.getByRole("dialog").getByRole("combobox").fill("OpenAI Codex");
  const codex = page
    .getByRole("dialog")
    .locator('[role="option"][id="fd-search-option-resource:codex"]');
  await expect(codex).toBeVisible({ timeout: 20000 });
  await codex.click();
  await expect(page).toHaveURL(/\/zh\/resources\/codex\/$/);
});

test("retired archives stay absent while current guides retain full language navigation", async ({
  page,
  request,
}) => {
  for (const path of [
    "docs/remote/asset-selection-feedback/",
    "zh/docs/remote/asset-selection-feedback/",
  ])
    expect((await request.get(path)).status()).toBe(404);
  await page.goto("docs/zh/assets/selection/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "资产候选选择与视觉反馈创作",
  );
  await expect(page.locator("#nd-page .prose")).toHaveAttribute(
    "lang",
    "zh-CN",
  );
  await expect(page.locator("#nd-page .prose")).not.toContainText(
    "Rendered-page reconstruction",
  );
  await page
    .locator(".documentation-language")
    .getByRole("link", { name: "English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/docs\/assets\/selection\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("formal articles have complete Chinese bodies and language switches preserve the same section", async ({
  page,
}) => {
  const structure = () =>
    page.locator("#nd-page .prose").evaluate((body) => ({
      headings: [...body.querySelectorAll("h2, h3, h4, h5, h6")].map((node) => [
        node.tagName,
        node.id,
      ]),
      listItems: body.querySelectorAll("li").length,
      rows: body.querySelectorAll("tr").length,
      cells: body.querySelectorAll("td, th").length,
      code: [...body.querySelectorAll("pre code")].map(
        (node) => node.textContent,
      ),
    }));
  for (const slug of [
    "guides/practical-guide",
    "ecosystem/agents",
    "assets/validation",
  ]) {
    await page.goto(`docs/${slug}/`);
    const original = await structure();
    const section = original.headings[0][1];
    await page.goto(`docs/${slug}/?view=source#${section}`);
    await page
      .locator(".documentation-language")
      .getByRole("link", { name: "中文", exact: true })
      .click();
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toMatch(new RegExp(`/docs/zh/${slug}/$`));
    expect(new URL(page.url()).search).toBe("?view=source");
    expect(new URL(page.url()).hash).toBe(`#${section}`);
    await expect(page.locator("#nd-page .prose")).toHaveAttribute(
      "lang",
      "zh-CN",
    );
    await expect(page.locator("#nd-page .prose")).toContainText(
      /[\p{Script=Han}]/u,
    );
    await expect(page.locator(".document-source-language")).toHaveCount(0);
    await expect.poll(structure).toEqual(original);
    await expect(page.locator(`[id="${section}"]`)).toBeAttached();
    await page
      .locator(".documentation-language")
      .getByRole("link", { name: "English", exact: true })
      .click();
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toMatch(new RegExp(`/docs/${slug}/$`));
    expect(new URL(page.url()).hash).toBe(`#${section}`);
    await expect(page.locator("#nd-page .prose")).toHaveAttribute("lang", "en");
  }
});

test("Chinese document references open their full Chinese counterparts", async ({
  page,
}) => {
  await page.goto("docs/zh/guides/practical-guide/");
  await page
    .locator('#nd-page .prose a[href$="/docs/zh/ecosystem/world-models/"]')
    .click();
  await expect(page).toHaveURL(/\/docs\/zh\/ecosystem\/world-models\/$/);
  await expect(page.locator("#nd-page .prose")).toHaveAttribute(
    "lang",
    "zh-CN",
  );
  await expect(page.locator(".document-source-language")).toHaveCount(0);
});

test("homepage navigation reaches Chinese documents without a separate content directory", async ({
  page,
}) => {
  await page.goto("");
  await expect(
    page.locator('main [data-content-ref^="document:"]'),
  ).toHaveCount(0);
  const menu = page.locator("#mobile-navigation-button");
  if (await menu.isVisible()) {
    await menu.click();
    await page
      .locator("#mobile-navigation")
      .getByRole("link", { name: "Guides & notes", exact: true })
      .click();
  } else {
    // Guides live in the Learn pillar panel of the floating navigation.
    await page.locator('.nav-pillar[data-pillar="learn"] > summary').click();
    await page.locator('a[data-collection-id="docs"]').click();
  }
  await page
    .locator(".documentation-language")
    .getByRole("link", { name: "中文", exact: true })
    .click();
  const source = page.locator(
    '[data-content-ref="document:zh/guides/practical-guide"]',
  );
  await expect(source).toHaveAttribute(
    "href",
    /\/docs\/zh\/guides\/practical-guide\/$/,
  );
  await source.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});

test("Chinese resources, paths and complete translated articles work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + "zh/resources/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "选择合适的开发工具。",
    );
    await expect(
      page.locator('[data-content-ref="resource:codex"]'),
    ).toContainText("本地仓库");
    await page.goto(baseURL + "zh/paths/2d/");
    await expect(
      page.locator('[data-content-field="deliverable"]').first(),
    ).toContainText("一页游戏简报");
    await page.goto(baseURL + "docs/zh/ecosystem/agents/");
    await expect(page.locator("#nd-page .prose")).toHaveAttribute(
      "lang",
      "zh-CN",
    );
    await expect(page.locator("#nd-page .prose")).toContainText("MCP");
    await expect(page.locator("#nd-page .prose")).toContainText(
      /[\p{Script=Han}]/u,
    );
    await expect(page.locator(".document-source-language")).toHaveCount(0);
  } finally {
    await context.close();
  }
});

test("localized unknown URLs remain real 404s", async ({
  request,
  baseURL,
}) => {
  const response = await request.get(baseURL + "zh/not-a-real-page/");
  expect(response.status()).toBe(404);
  expect(await response.text()).toContain("没有找到这个页面");
});
