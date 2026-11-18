import { test, expect, type BrowserContext, type Page } from "@playwright/test";
import type { Revision } from "../../studio/src/api";
import { reviewBlocker, type ReviewAction } from "../../studio/src/workflow";
import { differences } from "../../studio/src/RevisionDiff";

// Keep genuine fixture sessions in memory; do not relax production sign-in limits.
const cookies = new Map<
  string,
  Awaited<ReturnType<BrowserContext["cookies"]>>
>();
async function openAgent(page: Page, account = "editor") {
  const stored = cookies.get(account);
  if (stored) await page.context().addCookies(stored);
  await page.goto("/?entry=agent%3Agemini-cli-dinosaur-source");
  if (!stored) {
    await page
      .getByLabel("邮箱", { exact: true })
      .fill(`${account}@example.invalid`);
    await page
      .getByLabel("密码", { exact: true })
      .fill("test-fixture-only-password");
    await page.getByRole("button", { name: "登录工作台", exact: true }).click();
  }
  await expect(page.locator(".editor-heading h1")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "保存草稿", exact: true }),
  ).toBeEnabled();
  if (!stored) cookies.set(account, await page.context().cookies());
}
function gate() {
  let release!: () => void;
  const promise = new Promise<void>((resolve) => {
    release = resolve;
  });
  return { promise, release };
}
async function mockHistory(
  page: Page,
  change: (revision: Revision) => Revision[],
) {
  await page.route("**/api/history?*", async (route) => {
    const response = await route.fetch();
    const body = await response.json();
    await route.fulfill({
      response,
      json: { ...body, history: change(body.history[0]) },
    });
  });
}

test("review explanations retain the existing permission, validation, authorship and note gates", () => {
  for (const action of ["submit", "approve", "reject"] as const)
    for (const role of ["editor", "reviewer", "admin"])
      for (const state of ["draft", "in_review", "approved", "rejected"])
        for (const validated of [true, false])
          for (const own of [true, false])
            for (const dirty of [true, false])
              for (const note of ["", "  ", "reviewed sources"]) {
                const revision = {
                  state,
                  validated,
                  created_by: own ? "current" : "other",
                };
                const allowed =
                  !dirty &&
                  (action === "submit"
                    ? state === "draft" &&
                      validated &&
                      (own || role === "admin")
                    : role !== "editor" &&
                      state === "in_review" &&
                      !own &&
                      Boolean(note.trim()) &&
                      (action === "reject" || validated));
                expect(
                  Boolean(
                    reviewBlocker({
                      action,
                      role,
                      revisions: [revision],
                      userId: "current",
                      dirty,
                      note,
                    }),
                  ),
                ).toBe(!allowed);
              }
  expect(
    reviewBlocker({
      action: "approve",
      role: "admin",
      revisions: [
        { state: "in_review", validated: true, created_by: "current" },
      ],
      userId: "current",
      dirty: false,
      note: "ok",
    }),
  ).toContain("作者不能审核");
  expect(differences({ nested: { field: "old" } }, { nested: {} })).toEqual([
    { field: "nested.field", before: "old", after: undefined },
  ]);
  expect(differences(undefined, { empty: {} })).toEqual([
    { field: "empty", before: undefined, after: {} },
  ]);
  expect(differences({}, { constructor: "fixture" })).toEqual([
    { field: "constructor", before: undefined, after: "fixture" },
  ]);
});

test("saving and validating have distinct pending feedback and only issue one request", async ({
  page,
}, info) => {
  await openAgent(page);
  const input = page.getByRole("textbox", { name: "代码链接", exact: true });
  const next = new URL(await input.inputValue());
  next.hash = `round4-${info.project.name}`;
  await input.fill(next.href);
  await expect(
    page.getByRole("button", { name: "校验与预览", exact: true }),
  ).toHaveAccessibleDescription(/先保存，再校验/);
  const saving = gate(),
    validating = gate();
  let saves = 0,
    validations = 0;
  await page.route("**/api/drafts", async (route) => {
    saves++;
    await saving.promise;
    await route.continue();
  });
  await page.route(/\/api\/revisions\/[^/]+\/validate$/, async (route) => {
    validations++;
    await validating.promise;
    await route.continue();
  });
  try {
    await page.getByRole("button", { name: "保存草稿", exact: true }).click();
    const save = page.getByRole("button", { name: "正在保存…", exact: true });
    await expect(save).toBeDisabled();
    await expect(save).toHaveAttribute("aria-busy", "true");
    await expect(page.getByRole("status")).toContainText("正在保存草稿");
    await expect(
      page.getByRole("button", { name: "校验与预览", exact: true }),
    ).toBeDisabled();
    await expect(input).toBeDisabled();
    saving.release();
    await expect(page.getByRole("status")).toContainText("草稿已保存");
    await expect(input).toHaveValue(next.href);
    await page.getByRole("button", { name: "校验与预览", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "正在校验…", exact: true }),
    ).toHaveAttribute("aria-busy", "true");
    await expect(
      page.getByRole("button", { name: "保存草稿", exact: true }),
    ).toBeDisabled();
    await expect(page.getByRole("status")).toContainText("正在校验已保存修订");
    await expect(page.getByRole("status")).not.toContainText("草稿已保存");
    validating.release();
    await expect(page.locator(".content-preview")).toBeVisible();
    await expect(page.getByRole("status")).toContainText("校验通过");
    expect({ saves, validations }).toEqual({ saves: 1, validations: 1 });
    await expect(page.locator(".editor-actions [aria-busy=true]")).toHaveCount(
      0,
    );
  } finally {
    saving.release();
    validating.release();
  }
});

test("a failed save restores the action and keeps the local text with actionable review prerequisites", async ({
  page,
}) => {
  await openAgent(page);
  const input = page.getByRole("textbox", { name: "摘要", exact: true });
  const text = (await input.inputValue()) + " Unsaved retry fixture.";
  await input.fill(text);
  await page.route("**/api/drafts", (route) =>
    route.fulfill({
      status: 409,
      json: {
        error: { code: "conflict", message: "此修订已变化，请重新核对。" },
      },
    }),
  );
  await page.getByRole("button", { name: "保存草稿", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("此修订已变化");
  await page
    .getByRole("button", { name: "操作未完成，查看原因", exact: true })
    .click();
  await expect(page.getByRole("alert")).toBeFocused();
  await expect(page.getByRole("alert")).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "保存草稿", exact: true }),
  ).toBeEnabled();
  await expect(input).toHaveValue(text);
  await expect(page.locator("#revision-validation-status")).toHaveAttribute(
    "data-state",
    "local-pending",
  );
  await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
  for (const name of ["提交审核", "批准修订", "退回修改"]) {
    const button = page.getByRole("button", { name, exact: true });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAccessibleDescription(/先保存或放弃本地修改/);
  }
  // Identical prerequisites are explained once, not repeated under every button.
  await expect(
    page.locator(".review-card .action-requirements li"),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "发布快照", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "冻结已批准内容", exact: true }),
  ).toHaveAccessibleDescription(/需要审核员或管理员权限/);
});

for (const action of ["submit", "approve", "reject"] as ReviewAction[]) {
  test(`${action} explains review prerequisites and recovers from an unsuccessful request`, async ({
    page,
  }) => {
    await mockHistory(page, (revision) => [
      {
        ...revision,
        state: action === "submit" ? "draft" : "in_review",
        created_by:
          action === "submit" ? revision.created_by : "another-fixture-author",
        validated: true,
      },
    ]);
    await openAgent(page, action === "submit" ? "admin" : "reviewer");
    await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
    const idle = {
      submit: "提交审核",
      approve: "批准修订",
      reject: "退回修改",
    }[action];
    const pending = {
      submit: "正在提交…",
      approve: "正在批准…",
      reject: "正在退回…",
    }[action];
    if (action !== "submit") {
      await expect(
        page.getByRole("button", { name: idle, exact: true }),
      ).toHaveAccessibleDescription(/请填写审核说明/);
      await page
        .getByLabel("审核说明", { exact: true })
        .fill("Fixture review note; no external verification claim.");
    }
    const blocked = gate();
    let requests = 0;
    await page.route("**/api/review", async (route) => {
      requests++;
      expect(route.request().postDataJSON().action).toBe(action);
      await blocked.promise;
      await route.fulfill({
        status: 409,
        json: {
          error: { code: "conflict", message: "修订状态已变化，请重新载入。" },
        },
      });
    });
    try {
      await page.getByRole("button", { name: idle, exact: true }).click();
      await expect(
        page.getByRole("button", { name: pending, exact: true }),
      ).toHaveAttribute("aria-busy", "true");
      await expect(
        page.getByRole("button", { name: "保存草稿", exact: true }),
      ).toHaveText("保存草稿");
      await expect(page.getByRole("status")).toContainText("正在");
      blocked.release();
      await expect(page.getByRole("alert")).toContainText("修订状态已变化");
      await expect(
        page.getByRole("button", { name: idle, exact: true }),
      ).toBeEnabled();
      if (action !== "submit")
        await expect(page.getByLabel("审核说明", { exact: true })).toHaveValue(
          "Fixture review note; no external verification claim.",
        );
      expect(requests).toBe(1);
    } finally {
      blocked.release();
    }
  });
}

test("multi-select filtering preserves hidden selections, schema order and keyboard access", async ({
  page,
}) => {
  await openAgent(page);
  await page.getByRole("link", { name: "分类与技术", exact: true }).click();
  const group = page.getByRole("group", { name: "编程助手", exact: true });
  const search = group.getByRole("textbox", {
    name: "搜索编程助手候选项",
    exact: true,
  });
  const labels = group.locator(".checkbox-grid label");
  const originalOrder = await labels.allTextContents();
  const status = await page
    .locator("#revision-validation-status")
    .getAttribute("data-state");
  await search.fill("  CoDeX  ");
  await expect(labels).toHaveCount(1);
  await expect(page.locator("#revision-validation-status")).toHaveAttribute(
    "data-state",
    status!,
  );
  await expect(group.locator(".choice-selection")).toContainText("gemini-cli");
  await group.getByRole("checkbox", { name: "codex", exact: true }).check();
  await expect(group.locator(".choice-count")).toHaveText("2 项已选");
  await search.press("Escape");
  await expect(search).toHaveValue("");
  expect(await labels.allTextContents()).toEqual(originalOrder);
  await group.getByRole("button", { name: "仅看已选", exact: true }).click();
  await expect(
    group.getByRole("button", { name: "仅看已选", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(labels).toHaveText(["codex", "gemini-cli"]);
  // An unchecked option intentionally leaves the filtered list. Exercise Space
  // and assert its removal instead of asking uncheck() to re-find a hidden input.
  const codex = group.getByRole("checkbox", { name: "codex", exact: true });
  await codex.focus();
  await codex.press("Space");
  await expect(codex).toHaveCount(0);
  await expect(search).toBeFocused();
  const gemini = group.getByRole("checkbox", {
    name: "gemini-cli",
    exact: true,
  });
  await gemini.focus();
  await gemini.press("Space");
  await expect(gemini).toHaveCount(0);
  await expect(group.locator(".choice-empty")).toContainText("还没有已选项");
  await group
    .getByRole("button", { name: "显示全部候选项", exact: true })
    .click();
  await expect(search).toBeFocused();
  expect(await labels.allTextContents()).toEqual(originalOrder);
  await search.fill("no-fixture-match-90210");
  await expect(group.locator(".choice-empty")).toContainText(
    "没有匹配的候选项",
  );
  await group
    .getByRole("button", { name: "清除编程助手搜索", exact: true })
    .click();
  await expect(search).toBeFocused();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await search.fill("codex");
  await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
  await page.getByRole("tab", { name: "内容", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(group.locator(".choice-count")).toHaveText("0 项已选");
});

test("revision summaries separate authored fields from projections and retain exact technical and translation differences", async ({
  page,
}) => {
  const oldTitle =
    "Original English title " + "with complete source wording ".repeat(8);
  const newTitle = "Updated English title <img src=x onerror=alert(1)>";
  await mockHistory(page, (base) => {
    const parent: Revision = structuredClone(base);
    parent.id = "00000000-0000-4000-8000-000000000004";
    parent.parent_id = null;
    parent.body.title = parent.body.payload.title = oldTitle;
    parent.body.payload.tags = ["stable"];
    parent.body.payload.reviewed = "2025-01-01";
    parent.body.attachments = { projectMedia: { src: "unchanged.webp" } };
    parent.translations = [
      {
        field: "title",
        locale: "zh",
        value: "原来的译文",
        source_hash: "a".repeat(64),
      },
      {
        field: "summary",
        locale: "zh",
        value: "保持不变的译文",
        source_hash: "a".repeat(64),
      },
    ];
    const next: Revision = structuredClone(parent);
    next.id = base.id;
    next.parent_id = parent.id;
    next.body.title = next.body.payload.title = newTitle;
    next.body.payload.tags = ["stable", "new"];
    delete next.body.payload.reviewed;
    next.body.attachments = {
      projectMedia: { src: "unchanged.webp", note: "New media attribution" },
    };
    next.translations[0].value = "更新后的译文";
    next.translations[1].source_hash = "b".repeat(64);
    return [next, parent];
  });
  await openAgent(page);
  await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
  await expect(page.locator("#revision-diff-heading")).toContainText(
    "6 个字段",
  );
  const summary = page.locator(".change-summary");
  await expect(summary.getByText("标题", { exact: true })).toHaveCount(1);
  await expect(summary).toContainText("2 项 · stable、new");
  await expect(summary).toContainText("审核日期");
  await expect(summary).toContainText("移除");
  await expect(summary).toContainText("项目媒体 / 备注说明");
  await expect(summary).toContainText("标题 · zh");
  await expect(summary).toContainText("译文未变，仅更新原文核对指纹");
  const technical = page.locator(".technical-diff");
  await expect(technical).not.toHaveAttribute("open");
  await technical.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(technical).toHaveAttribute("open", "");
  const title = technical
    .locator(".diff-row")
    .filter({ has: page.locator("code", { hasText: /^payload\.title$/ }) });
  await expect(title.locator(".diff-before pre")).toHaveText(oldTitle);
  await expect(title.locator(".diff-after pre")).toHaveText(newTitle);
  await expect(title.locator("img")).toHaveCount(0);
  await expect(technical).toContainText("translations.zh.title");
  await expect(technical).toContainText("source_hash");
  await title.locator(".diff-before pre").focus();
  await expect(title.locator(".diff-before pre")).toBeFocused();
  for (const width of [320, 390, 800, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByRole("tab", { name: "内容", exact: true }).click();
  await page
    .getByRole("textbox", { name: "标题", exact: true })
    .fill("UNSAVED TITLE NOT IN REVISION");
  await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
  await expect(page.locator(".diff-scope")).toContainText("不包含当前本地修改");
  await expect(summary).not.toContainText("UNSAVED TITLE NOT IN REVISION");
});

for (const mode of ["first", "missing-parent", "unchanged"] as const) {
  test(`revision comparison is explicit for ${mode} history`, async ({
    page,
  }) => {
    await mockHistory(page, (base) => {
      const next = structuredClone(base);
      if (mode === "first") return [{ ...next, parent_id: null }];
      const parent = {
        ...structuredClone(next),
        id: "00000000-0000-4000-8000-000000000004",
        parent_id: null,
      };
      next.parent_id = parent.id;
      if (mode === "missing-parent") return [next];
      next.translations.reverse(); // Ordering alone is not a translation change.
      return [next, parent];
    });
    await openAgent(page);
    await page.getByRole("tab", { name: "修订与审核", exact: true }).click();
    if (mode === "first") {
      await expect(page.locator(".diff-scope")).toContainText("首次修订");
      await expect(page.locator(".change-summary")).toContainText("新增");
    } else if (mode === "missing-parent") {
      await expect(page.locator(".diff-scope")).toContainText("父修订暂不可用");
      await expect(page.locator(".change-summary")).toHaveCount(0);
    } else {
      await expect(page.locator(".diff-empty")).toHaveText(
        "正文、附件与译文均无字段差异。",
      );
      await expect(page.locator(".change-summary")).toHaveCount(0);
      await expect(page.locator(".technical-diff")).toHaveCount(0);
    }
  });
}
