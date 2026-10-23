import { test, expect, type BrowserContext, type Page } from "@playwright/test";

let editorCookies: Awaited<ReturnType<BrowserContext["cookies"]>> | undefined;
async function openAgent(page: Page) {
  if (editorCookies) await page.context().addCookies(editorCookies);
  await page.goto("/?entry=agent%3Agemini-cli-dinosaur-source");
  if (!editorCookies) {
    await page
      .getByLabel("邮箱", { exact: true })
      .fill("editor@example.invalid");
    await page
      .getByLabel("密码", { exact: true })
      .fill("test-fixture-only-password");
    await page.getByRole("button", { name: "登录工作台", exact: true }).click();
    await expect(page.locator(".editor-heading h1")).toBeVisible();
    editorCookies = await page.context().cookies();
  }
  await expect(page.locator(".editor-heading h1")).toContainText(
    "Dinosaur Game Offline",
  );
  await expect(
    page.getByRole("button", { name: "保存草稿", exact: true }),
  ).toBeEnabled();
}

test("the form outline stays visible, tracks manual scrolling and cleans up across tabs", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openAgent(page);
  const outline = page.getByRole("navigation", {
    name: "内容字段分组",
    exact: true,
  });
  await expect(
    outline.getByRole("link", { name: "基本信息", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await outline.getByRole("link", { name: "来源与链接", exact: true }).click();
  await expect(
    outline.getByRole("link", { name: "来源与链接", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await expect(outline).toBeInViewport();
  await expect
    .poll(async () => {
      const nav = (await outline.boundingBox())!;
      const boundary = (await page
        .locator(info.project.name === "mobile" ? ".topbar" : ".editor-content")
        .boundingBox())!;
      const expected =
        info.project.name === "mobile"
          ? boundary.y + boundary.height
          : boundary.y;
      return Math.abs(nav.y - expected);
    })
    .toBeLessThanOrEqual(2);
  const navBox = (await outline.boundingBox())!;
  const heading = (await page
    .locator("#heading-payload-sources")
    .boundingBox())!;
  expect(heading.y).toBeGreaterThanOrEqual(navBox.y + navBox.height);
  await page
    .locator("#section-payload-details")
    .evaluate((section) => section.scrollIntoView({ block: "start" }));
  await expect(
    outline.getByRole("link", { name: "内容与边界", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page.getByRole("tab", { name: "媒体与出处", exact: true }).click();
  await expect(outline).toHaveCount(0);
  await page.getByRole("tab", { name: "内容", exact: true }).click();
  await expect(
    outline.getByRole("link", { name: "基本信息", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  expect(errors).toEqual([]);
});

test("source links are usable without making unsafe or credentialed draft URLs clickable", async ({
  page,
}) => {
  await openAgent(page);
  const identity = page.getByRole("textbox", { name: "稳定标识", exact: true });
  await expect(identity).toHaveAttribute("readonly", "");
  await expect(identity).not.toBeEditable();
  await expect(identity).toHaveValue("gemini-cli-dinosaur-source");
  await page.getByRole("link", { name: "来源与链接", exact: true }).click();
  const source = page.getByRole("textbox", { name: "来源链接", exact: true });
  const link = page.getByRole("link", {
    name: "在新标签页查看 来源链接",
    exact: true,
  });
  await expect(link).toHaveAttribute("href", /^https:\/\/github\.com\//);
  for (const unsafe of [
    "javascript:alert(1)",
    "data:text/html,unsafe",
    "https://user:password@example.com/source",
  ]) {
    await source.fill(unsafe);
    await expect(link).toHaveCount(0);
  }
  await source.fill("https://example.org/source?ref=studio");
  await expect(link).toHaveAttribute(
    "href",
    "https://example.org/source?ref=studio",
  );
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAttribute("rel", /noreferrer/);
  await expect(identity).toHaveValue("gemini-cli-dinosaur-source");
});

test("multi-select counts reflect draft choices without changing the schema group name", async ({
  page,
}) => {
  await openAgent(page);
  await page.getByRole("link", { name: "分类与技术", exact: true }).click();
  const agents = page.getByRole("group", { name: "编程助手", exact: true });
  await expect(agents.locator(".choice-count")).toHaveText("1 项已选");
  await agents.getByRole("checkbox", { name: "codex", exact: true }).check();
  await expect(agents.locator(".choice-count")).toHaveText("2 项已选");
  await expect(
    agents.getByRole("checkbox", { name: "gemini-cli", exact: true }),
  ).toBeChecked();
  await agents.getByRole("checkbox", { name: "codex", exact: true }).uncheck();
  await expect(agents.locator(".choice-count")).toHaveText("1 项已选");
  await expect(page.locator(".editor-meta")).toContainText("有未保存改动");
});

test("field errors describe controls and reveal optional fields without silently enabling them", async ({
  page,
}) => {
  await openAgent(page);
  const optional = page.locator('[data-field="catalogResourceId"]');
  const enabled = await optional.locator(".optional-toggle input").isChecked();
  await page.route(/\/api\/revisions\/[^/]+\/validate$/, (route) =>
    route.fulfill({
      status: 422,
      json: {
        error: {
          code: "validation",
          message: "请核对字段",
          issues: [
            { field: "payload.sourceUrl", message: "来源地址有误" },
            { field: "payload.catalogResourceId", message: "请核对关联资源" },
          ],
        },
      },
    }),
  );
  await page.getByRole("button", { name: "校验与预览", exact: true }).click();
  await page
    .getByRole("button", {
      name: "payload.sourceUrl: 来源地址有误",
      exact: true,
    })
    .click();
  const source = page.getByRole("textbox", { name: "来源链接", exact: true });
  await expect(source).toBeFocused();
  await expect(source).toHaveAttribute("aria-invalid", "true");
  await expect(source).toHaveAccessibleDescription("来源地址有误");
  await page
    .getByRole("button", {
      name: "payload.catalogResourceId: 请核对关联资源",
      exact: true,
    })
    .click();
  await expect(optional).toBeVisible();
  await expect(optional).toContainText("请核对关联资源");
  expect(await optional.locator(".optional-toggle input").isChecked()).toBe(
    enabled,
  );
  if (enabled)
    await expect(
      page.getByRole("textbox", { name: "关联资源标识", exact: true }),
    ).toBeFocused();
  else await expect(optional).toBeFocused();
  await page.getByRole("button", { name: "关闭提示", exact: true }).click();
  await expect(page.locator(".field-error")).toHaveCount(0);
  await expect(source).not.toHaveAttribute("aria-invalid", "true");
});

test("catalog search can be cleared and bulk selection remains keyboard accessible", async ({
  page,
}) => {
  await openAgent(page);
  const toggle = page.getByRole("button", {
    name: "切换内容目录",
    exact: true,
  });
  if (await toggle.isVisible()) await toggle.click();
  const search = page.getByLabel("搜索内容", { exact: true });
  await search.fill("no-matching-studio-resource-88772");
  await expect(page.locator(".sidebar-empty")).toBeVisible();
  await search.press("Escape");
  await expect(search).toHaveValue("");
  await expect(page.locator(".sidebar-empty")).toHaveCount(0);
  await search.fill("Gemini");
  await page.getByRole("button", { name: "清除搜索", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(search).toBeFocused();
  const checkbox = page.locator(".entry-selection input").first();
  await checkbox.focus();
  await expect(checkbox).toHaveCSS("opacity", "1");
  await checkbox.check();
  await expect(page.locator(".bulk-panel")).toContainText("已选 1 条修订");
  await checkbox.uncheck();
  await expect(page.locator(".bulk-panel")).toHaveCount(0);
});

test("all five editor tabs remain readable and keyboard reachable on narrow phones", async ({
  page,
}) => {
  await openAgent(page);
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const name of ["内容", "媒体与出处", "译文", "修订与审核", "预览"]) {
      const tab = page.getByRole("tab", { name, exact: true });
      await expect(tab).toBeInViewport();
      const box = (await tab.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    expect(
      await page
        .locator(".editor-tabs")
        .evaluate((tabs) => tabs.scrollWidth <= tabs.clientWidth),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByRole("tab", { name: "内容", exact: true }).focus();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "预览", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("tab", { name: "内容", exact: true }),
  ).toBeFocused();
});
