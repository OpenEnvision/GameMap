import { test, expect, type Page } from "@playwright/test";
import sharp from "sharp";

const password = "test-fixture-only-password";
async function openCatalog(page: Page) {
  const toggle = page.getByRole("button", {
    name: "切换内容目录",
    exact: true,
  });
  if (
    (await toggle.isVisible()) &&
    (await toggle.getAttribute("aria-expanded")) === "false"
  )
    await toggle.click();
  await expect(page.getByLabel("搜索内容", { exact: true })).toBeVisible();
}
async function login(page: Page, account: string) {
  await page.goto("/");
  await page
    .getByLabel("邮箱", { exact: true })
    .fill(`${account}@example.invalid`);
  await page.getByLabel("密码", { exact: true }).fill(password);
  await page.getByRole("button", { name: "登录工作台", exact: true }).click();
  await expect(page.locator(".editor-heading h1")).toBeVisible();
  await openCatalog(page);
}
async function select(page: Page, key: string) {
  await openCatalog(page);
  await page.getByLabel("搜索内容", { exact: true }).fill(key);
  const target = page.locator(`.entry-button[data-entry-key="${key}"]`);
  await expect(target).toHaveCount(1);
  await target.click();
  await expect(page.locator(".editor-breadcrumb")).toContainText(
    key.split(":")[1],
  );
}
async function logout(page: Page) {
  await page.getByRole("button", { name: "退出登录", exact: true }).click();
  await expect(page.getByLabel("邮箱", { exact: true })).toBeVisible();
}

test("editor → trusted validation → reviewer → frozen export is a real private workflow", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await login(page, "editor");
  const catalog = await (await page.request.get("/api/catalog")).json();
  const resource =
    catalog.entries.find(
      (entry: { kind: string; key: string }) =>
        entry.key === "resource:claude-code",
    ) ||
    catalog.entries.find(
      (entry: { kind: string }) => entry.kind === "resource",
    );
  await select(page, resource.key);
  const detail = page.getByRole("textbox", { name: "详细说明", exact: true });
  const original = await detail.inputValue();
  await detail.fill(
    `${original} Browser workflow fixture (${info.project.name}).`,
  );
  await page.getByRole("tab", { name: "译文", exact: true }).click();
  const translated = page
    .locator(".translation-card")
    .filter({ has: page.getByText("zh · 详细说明", { exact: true }) });
  if (await translated.count()) {
    await expect(translated).toContainText("原文已变化 / 尚未核对");
    await translated
      .getByLabel("译文", { exact: true })
      .fill(`浏览器测试夹具已核对的译文，环境 ${info.project.name}。`);
    await translated
      .getByRole("button", { name: "已核对当前原文", exact: true })
      .click();
    await expect(translated).toContainText("原文指纹一致");
  }
  await page.getByRole("button", { name: "保存草稿", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("草稿已保存");
  await page.getByRole("button", { name: "校验与预览", exact: true }).click();
  await expect(page.locator(".content-preview")).toContainText(
    `Browser workflow fixture (${info.project.name})`,
  );
  await expect(page.locator(".editor-meta")).toContainText("已校验");
  await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "批准修订", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "提交审核", exact: true }).click();
  await expect(page.locator(".editor-meta")).toContainText("待审核");
  await expect(page.locator(".diff-section")).toContainText("payload.detail");
  const cookies = await page.context().cookies();
  expect(
    cookies.find((cookie) => cookie.name === "gamemap-studio")?.httpOnly,
  ).toBe(true);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  await logout(page);
  await login(page, "reviewer");
  await select(page, resource.key);
  await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
  await page
    .getByLabel("审核说明", { exact: true })
    .fill("仅测试工作流，非真实外部来源复现结论。");
  await page.getByRole("button", { name: "批准修订", exact: true }).click();
  await expect(page.locator(".editor-meta")).toContainText("已批准");
  // Catalog-derived Markdown has its own immutable source index and explicit review gate.
  const administrative = await page
    .context()
    .browser()!
    .newContext({ baseURL: new URL(page.url()).origin });
  const adminPage = await administrative.newPage();
  await login(adminPage, "admin");
  await adminPage
    .getByRole("button", { name: "同步文档来源索引", exact: true })
    .click();
  await expect(adminPage.getByRole("status")).toContainText("已同步");
  const updated = await (await adminPage.request.get("/api/catalog")).json();
  const pending = updated.entries.filter(
    (entry: { owner: string; state: string }) =>
      entry.owner === "git" && entry.state === "draft",
  );
  const current = await (await adminPage.request.get("/api/session")).json();
  const submitted = await adminPage.request.post("/api/review", {
    headers: {
      Origin: new URL(adminPage.url()).origin,
      "X-CSRF-Token": current.csrf,
    },
    data: {
      action: "submit",
      ids: pending.map(
        (entry: { head_revision_id: string }) => entry.head_revision_id,
      ),
    },
  });
  expect(submitted.status()).toBe(200);
  await administrative.close();
  await page.reload();
  await expect(page.locator(".editor-heading h1")).toBeVisible();
  await openCatalog(page);
  for (const document of pending) {
    await select(page, document.key);
    await page.getByRole("button", { name: "校验与预览", exact: true }).click();
    await expect(page.locator(".source-markdown")).toBeVisible();
    await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
    await page
      .getByLabel("审核说明", { exact: true })
      .fill("仅测试生成视图的人工复核，不代表外部项目复现。");
    await page.getByRole("button", { name: "批准修订", exact: true }).click();
    await expect(page.locator(".editor-meta")).toContainText("已批准");
  }
  await page.getByRole("button", { name: "发布快照", exact: true }).click();
  await page
    .getByRole("button", { name: "冻结已批准内容", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("尚未部署或激活");
  const download = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "导出快照 JSON", exact: true })
    .first()
    .click();
  expect((await download).suggestedFilename()).toMatch(
    /^gamemap-release-.*\.json$/,
  );
  await expect(page.locator(".release-card").first()).toContainText(
    "已冻结 · 未激活",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("Git-owned documents stay read-only and keyboard tabs preserve a usable mobile layout", async ({
  page,
}, info) => {
  await login(page, "reviewer");
  await select(page, "document:overview");
  await expect(
    page.getByRole("button", { name: "保存草稿", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".inline-info")).toContainText("由 Git 管理");
  await page.getByRole("tab", { name: "内容", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "媒体与出处", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "媒体与出处", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  if (info.project.name === "desktop")
    await page.screenshot({
      path: ".build/studio-workspace.png",
      fullPage: true,
    });
});

test("unauthenticated browsers cannot load private records or forged-role credentials", async ({
  page,
}) => {
  await page.goto("/");
  expect((await page.request.get("/api/catalog")).status()).toBe(401);
  await page
    .getByLabel("邮箱", { exact: true })
    .fill("outsider@example.invalid");
  await page.getByLabel("密码", { exact: true }).fill(password);
  await page.getByRole("button", { name: "登录工作台", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("not been provisioned");
  await expect(page.getByLabel("邮箱", { exact: true })).toBeVisible();
});

test("new records do not inherit project facts, and uploaded image previews remain private", async ({
  page,
}) => {
  await login(page, "editor");
  await page.getByRole("button", { name: "新建内容", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "名称", exact: true }),
  ).toHaveValue("");
  await expect(
    page.getByRole("textbox", { name: "详细说明", exact: true }),
  ).toHaveValue("");
  await expect(page.locator('input[type="date"]')).toHaveValue("");
  await page.getByRole("tab", { name: "媒体与出处", exact: true }).click();
  const emptyAsset = page.getByRole("group", { name: "素材路径", exact: true });
  await emptyAsset
    .getByRole("button", { name: "添加记录", exact: true })
    .click();
  const asset = page.locator(".scalar-field").filter({
    has: page.getByRole("textbox", { name: "素材路径", exact: true }),
  });
  const png = await sharp({
    create: { width: 80, height: 40, channels: 3, background: "#638651" },
  })
    .png()
    .toBuffer();
  await asset.locator('input[type="file"]').setInputFiles({
    name: "private-fixture.png",
    mimeType: "image/png",
    buffer: png,
  });
  await expect(
    asset.getByRole("textbox", { name: "素材路径", exact: true }),
  ).toHaveValue(/^media\/catalog\/[a-f0-9]{64}\.webp$/);
  const image = asset.getByRole("img");
  await expect(image).toBeVisible();
  await expect
    .poll(() =>
      image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    )
    .toBe(80);
  const source = await image.getAttribute("src");
  expect((await page.request.get(source!)).status()).toBe(200);
  page.once("dialog", (dialog) => dialog.accept());
  await logout(page);
  expect((await page.request.get(source!)).status()).toBe(401);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
});

test("deep-linked editing is content-first, grouped and usable across breakpoints", async ({
  page,
}, info) => {
  await login(page, "editor");
  await page.goto("/?entry=agent%3Agemini-cli-dinosaur-source");
  await expect(page.locator(".editor-heading h1")).toContainText(
    "Dinosaur Game Offline",
  );
  await expect(page.locator(".form-section")).toHaveCount(4);
  await expect(
    page.getByRole("region", { name: "基本信息", exact: true }),
  ).toBeVisible();
  const toggle = page.getByRole("button", {
    name: "切换内容目录",
    exact: true,
  });
  if (info.project.name === "mobile") {
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByLabel("搜索内容", { exact: true })).toBeHidden();
    await expect(page.locator(".editor-heading h1")).toBeInViewport();
    await expect(
      page.getByRole("button", { name: "保存草稿", exact: true }),
    ).toBeInViewport();
    await openCatalog(page);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page
      .locator(
        '.entry-button[data-entry-key="agent:gemini-cli-dinosaur-source"]',
      )
      .click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  } else {
    await expect(page.locator(".entry-row.is-selected")).toBeInViewport();
    await expect(toggle).toBeHidden();
  }
  await page.screenshot({
    path: `.build/studio-polish-workspace-${info.project.name}.png`,
  });
  await page.getByRole("link", { name: "来源与链接", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "来源链接", exact: true }),
  ).toBeInViewport();
  if (info.project.name === "desktop") {
    await expect(page.locator(".editor-heading h1")).toBeInViewport();
    await expect
      .poll(() =>
        page
          .locator(".editor-content")
          .evaluate((element) => element.scrollTop),
      )
      .toBeGreaterThan(0);
    await page.getByRole("tab", { name: "译文", exact: true }).click();
    await expect
      .poll(() =>
        page
          .locator(".editor-content")
          .evaluate((element) => element.scrollTop),
      )
      .toBe(0);
    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("validation errors reveal the right panel and focus array fields", async ({
  page,
}) => {
  await login(page, "editor");
  await select(page, "resource:claude-code");
  await page.getByRole("tab", { name: "媒体与出处", exact: true }).click();
  await page.route(/\/api\/revisions\/[^/]+\/validate$/, (route) =>
    route.fulfill({
      status: 422,
      json: {
        error: {
          code: "validation",
          message: "请修正以下字段",
          issues: [{ field: "payload.tags", message: "至少选择一个标签" }],
        },
      },
    }),
  );
  await page.getByRole("button", { name: "校验与预览", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("请修正以下字段");
  await page
    .getByRole("button", {
      name: "payload.tags: 至少选择一个标签",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("tab", { name: "内容", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  const tags = page.locator('[id="field-payload.tags"]');
  await expect(tags).toBeFocused();
  await expect(tags).toBeInViewport();
});

test("setup state stays explicit and responsive without exposing a login", async ({
  page,
}) => {
  await page.route("**/api/session", (route) =>
    route.fulfill({
      json: {
        configured: false,
        signedIn: false,
        missing: ["CATALOG_DATABASE_URL"],
      },
    }),
  );
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "先配置服务，再开始编辑。",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".setup-panel")).toContainText(
    "CATALOG_DATABASE_URL",
  );
  await expect(
    page.getByRole("button", { name: "登录工作台", exact: true }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
