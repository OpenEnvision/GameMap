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
    ["zh/", "从一个想法，到可玩的世界."],
    ["zh/resources/", "选择合适的开发工具。"],
    ["zh/examples/", "从一个可玩的项目开始。"],
    ["zh/agents/", "让代理接入实际开发流程。"],
    ["zh/paths/", "按步骤推进，而不是堆叠工具。"],
    ["zh/testing/", "用实际任务检验改动。"],
    ["zh/showcase/", "从演示回到原始记录。"],
    ["zh/research/", "找到值得研究的项目。"],
    ["zh/explore/", "在全部内容中查找。"],
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

test("untranslated articles keep Chinese navigation and explicitly English bodies", async ({
  page,
}) => {
  await page.goto("zh/docs/agents-notes/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "编程代理与游戏工具集成",
  );
  await expect(page.locator(".document-source-language")).toHaveText(
    "英文原文",
  );
  await expect(page.locator("#nd-page .prose")).toHaveAttribute("lang", "en");
  await expect(page.locator("#nd-page .prose")).toContainText(
    "Choose the model",
  );
  await page
    .locator(".documentation-language")
    .getByRole("link", { name: "English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/docs\/agents-notes\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("explicit English source links are not redirected back to their Chinese guide", async ({
  page,
}) => {
  await page.goto("docs/zh/practical-guide/");
  await page
    .getByRole("link", { name: "完整实践参考（英文）", exact: true })
    .click();
  await expect(page).toHaveURL(/\/docs\/practical-guide\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the English index retains direct discovery of Chinese source documents", async ({
  page,
}) => {
  await page.goto("explore/?kind=document");
  const source = page.locator(
    '[data-content-ref="document:zh/practical-guide"]',
  );
  await expect(source.getByRole("link")).toHaveAttribute(
    "href",
    /\/docs\/zh\/practical-guide\/$/,
  );
  await source.getByRole("link").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});

test("Chinese resources, paths and English source articles work without JavaScript", async ({
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
    await page.goto(baseURL + "zh/docs/agents-notes/");
    await expect(page.locator("#nd-page .prose")).toHaveAttribute("lang", "en");
    await expect(page.locator("#nd-page .prose")).toContainText(
      "Choose the model",
    );
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
