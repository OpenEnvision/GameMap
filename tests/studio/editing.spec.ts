import { test, expect, type BrowserContext, type Page } from "@playwright/test";
import {
  fieldLabels,
  kindLabels,
  labelFor,
} from "../../studio/src/field-labels";
import type { Contracts, Schema } from "../../studio/src/api";

// Reuse a real authenticated fixture session in memory, rather than exhausting the
// production sign-in rate limit. Login, role isolation and logout remain covered.
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

test("every installed schema field and content kind has a Chinese display label", async ({
  page,
}) => {
  await openAgent(page);
  const contracts: Contracts = await (
    await page.request.get("/api/contracts")
  ).json();
  const keys = new Set<string>();
  function walk(schema: Schema) {
    for (const [key, child] of Object.entries(schema.properties || {})) {
      keys.add(key);
      walk(child);
    }
    if (schema.items) walk(schema.items);
    for (const choice of schema.anyOf || []) walk(choice);
  }
  for (const form of Object.values(contracts.forms)) {
    walk(form.payload);
    walk(form.attachments);
  }
  expect([...keys].filter((key) => !Object.hasOwn(fieldLabels, key))).toEqual(
    [],
  );
  for (const key of keys) expect(labelFor(key)).toMatch(/[\u3400-\u9fff]/);
  expect(
    Object.keys(contracts.kinds).filter(
      (kind) => !Object.hasOwn(kindLabels, kind),
    ),
  ).toEqual([]);
  expect(labelFor("futureSchemaField")).toBe("Future Schema Field");
  expect(typeof labelFor("constructor")).toBe("string");
});

test("Chinese field names keep technical keys visible without renaming authored content", async ({
  page,
}) => {
  await openAgent(page);
  const catalog = await (await page.request.get("/api/catalog")).json();
  const record = catalog.entries.find(
    (entry: { key: string }) =>
      entry.key === "agent:gemini-cli-dinosaur-source",
  );
  await expect(
    page.getByRole("textbox", { name: "标题", exact: true }),
  ).toHaveValue(record.body.payload.title);
  await expect(
    page.getByRole("textbox", { name: "摘要", exact: true }),
  ).toHaveValue(record.body.payload.summary);
  await expect(
    page.getByRole("textbox", { name: "Title", exact: true }),
  ).toHaveCount(0);
  const titleKey = page.locator(
    '[data-field="title"] > .scalar-field label .field-key',
  );
  await expect(titleKey).toHaveText("title");
  await expect(titleKey).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".editor-breadcrumb")).toContainText(
    "编程助手资源",
  );
  await page.getByRole("link", { name: "内容与边界", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "代码覆盖范围", exact: true }),
  ).toHaveValue(record.body.payload.codeScope);
  expect(
    (await page.locator(".field-key").allTextContents()).filter((key) =>
      /^\d+$/.test(key),
    ),
  ).toEqual([]);
});

test("local edits cannot inherit the validation receipt of the saved revision", async ({
  page,
}, info) => {
  await openAgent(page);
  const status = page.locator("#revision-validation-status");
  await expect(status).toHaveAttribute("data-state", "saved-valid");
  const contracts: Contracts = await (
    await page.request.get("/api/contracts")
  ).json();
  // Change a non-translatable URL fragment; never bypass translation review to
  // obtain a validation receipt for changed English source text.
  expect(contracts.translatable.agent).not.toContain("codeUrl");
  const input = page.getByRole("textbox", { name: "代码链接", exact: true });
  const modified = new URL(await input.inputValue());
  modified.hash = `studio-ui-${info.project.name}`;
  await input.fill(modified.href);
  await expect(status).toHaveAttribute("data-state", "local-pending");
  await expect(status).toHaveText("本地修改待校验");
  await expect(page.locator(".editor-meta .badge")).toContainText("已保存");
  await expect(
    page.getByRole("button", { name: "校验与预览", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "保存草稿", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("草稿已保存（修订");
  await expect(status).toHaveAttribute("data-state", "saved-pending");
  await expect(status).toHaveText("已保存修订待校验");
  await expect(input).toHaveValue(modified.href);
  await page.getByRole("button", { name: "校验与预览", exact: true }).click();
  await expect(status).toHaveAttribute("data-state", "saved-valid");
  await expect(page.locator(".content-preview")).toBeVisible();
  const savedPreview = await page.locator(".preview-lead").innerText();
  await page.getByRole("tab", { name: "内容", exact: true }).click();
  const summary = page.getByRole("textbox", { name: "摘要", exact: true });
  await summary.fill(
    (await summary.inputValue()) + " Unsaved preview fixture.",
  );
  await expect(status).toHaveAttribute("data-state", "local-pending");
  await page.getByRole("tab", { name: "预览", exact: true }).click();
  await expect(page.locator(".preview-scope")).toContainText(
    "不包含当前本地修改",
  );
  await expect(page.locator(".preview-lead")).toHaveText(savedPreview);
  await expect(page.locator(".preview-lead")).not.toContainText(
    "Unsaved preview fixture",
  );
});

test("mobile editing uses a single bottom action bar without hiding the final field or footer", async ({
  page,
}) => {
  await openAgent(page);
  const actions = page.getByRole("group", { name: "编辑操作", exact: true });
  await expect(
    page.getByRole("button", { name: "保存草稿", exact: true }),
  ).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const title = (await page
    .getByRole("textbox", { name: "标题", exact: true })
    .boundingBox())!;
  const initialBar = (await actions.boundingBox())!;
  expect(title.y + title.height).toBeLessThanOrEqual(initialBar.y);
  for (const height of [844, 500]) {
    await page.setViewportSize({ width: 390, height });
    await expect(actions).toHaveCSS("position", "fixed");
    await page
      .locator('[id="field-payload.reviewed"]')
      .evaluate((field) => field.scrollIntoView({ block: "end" }));
    const bar = (await actions.boundingBox())!;
    const lastField = (await page
      .locator('[id="field-payload.reviewed"]')
      .boundingBox())!;
    expect(Math.abs(bar.y + bar.height - height)).toBeLessThanOrEqual(1);
    expect(lastField.y + lastField.height).toBeLessThan(bar.y);
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    const footer = (await page.locator(".studio-footer").boundingBox())!;
    expect(footer.y + footer.height).toBeLessThanOrEqual(bar.y);
    await expect(
      page.getByRole("button", { name: "保存草稿", exact: true }),
    ).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(actions).toHaveCSS("position", "static");
  await expect(
    page.getByRole("button", { name: "保存草稿", exact: true }),
  ).toHaveCount(1);
  expect(
    await page
      .locator(".studio-shell")
      .evaluate((shell) => getComputedStyle(shell).paddingBottom),
  ).toBe("0px");
});

test("read-only documents and release pages do not retain an editable mobile save bar", async ({
  page,
}) => {
  await openAgent(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?entry=document%3Aoverview");
  await expect(page.locator(".editor-breadcrumb")).toContainText("overview");
  await expect(
    page.getByRole("button", { name: "保存草稿", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("group", { name: "编辑操作", exact: true }),
  ).toHaveCSS("position", "static");
  await expect(page.locator(".with-editor-actions")).toHaveCount(0);
  await page.getByRole("button", { name: "发布快照", exact: true }).click();
  await expect(
    page.getByRole("group", { name: "编辑操作", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".with-editor-actions")).toHaveCount(0);
});

test("late initial catalog loading cannot override an active search page", async ({
  page,
}, info) => {
  await openAgent(page);
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/catalog", async (route) => {
    const response = await route.fetch();
    await gate;
    await route.fulfill({ response });
  });
  try {
    await page.goto("/?entry=resource%3Aclaude-code");
    const toggle = page.getByRole("button", {
      name: "切换内容目录",
      exact: true,
    });
    // Wait for hydration on mobile instead of sampling a not-yet-mounted toggle.
    if (info.project.name === "mobile") await toggle.click();
    await page
      .getByLabel("搜索内容", { exact: true })
      .fill("document:reference/catalog");
    release();
    await expect(
      page.locator(
        '.entry-button[data-entry-key="document:reference/catalog"]',
      ),
    ).toHaveCount(1);
    await expect(page.locator(".pagination > span")).toHaveText("1 / 1");
  } finally {
    release();
  }
});

test("a new draft has explicit unsaved status and separate editable and locked identifiers", async ({
  page,
}, info) => {
  await openAgent(page);
  await page
    .getByRole("button", {
      name: info.project.name === "mobile" ? "新建草稿" : "新建内容",
      exact: true,
    })
    .click();
  const status = page.locator("#revision-validation-status");
  await expect(status).toHaveAttribute("data-state", "unsaved");
  await expect(status).toHaveText("保存后可校验");
  await expect(
    page.getByRole("textbox", { name: "名称", exact: true }),
  ).toHaveValue("");
  await expect(
    page.getByRole("textbox", { name: "详细说明", exact: true }),
  ).toHaveValue("");
  const identifier = `ui-draft-${info.project.name}`;
  await page
    .getByRole("textbox", { name: "设置稳定标识", exact: true })
    .fill(identifier);
  await expect(
    page.getByRole("textbox", { name: "稳定标识", exact: true }),
  ).toHaveValue(identifier);
  await expect(
    page.getByRole("textbox", { name: "稳定标识", exact: true }),
  ).not.toBeEditable();
  await expect(status).toHaveAttribute("data-state", "local-pending");
  await expect(
    page.getByRole("button", { name: "校验与预览", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByLabel("新建内容类型", { exact: true }).locator("option:checked"),
  ).toHaveText("工具与资源");
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "退出登录", exact: true }).click();
  await expect(page.getByLabel("邮箱", { exact: true })).toBeVisible();
  await expect(page.locator(".editor-actions")).toHaveCount(0);
});
