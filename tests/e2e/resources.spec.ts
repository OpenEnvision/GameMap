import { expect, test, type Page } from "@playwright/test";
import type { Resource } from "../../website/src/types";

const locales = [
  {
    path: "resources/",
    search: "Search resources",
    clear: "Clear filters",
    overview: "Library at a glance",
    video: "Video",
    pipeline: "Pipeline source",
    unavailable: "Unavailable",
  },
  {
    path: "zh/resources/",
    search: "搜索资源",
    clear: "清除筛选",
    overview: "资源总览",
    video: "视频",
    pipeline: "管线源码",
    unavailable: "暂不可用",
  },
];

async function expectDistribution(page: Page, resources: Resource[]) {
  await expect(page.locator(".resource-tile")).toHaveCount(resources.length);
  const overview = page.locator(".resource-overview");
  await expect(overview.locator(".resource-donut strong")).toHaveText(
    String(resources.length),
  );
  for (const facet of ["category", "type", "stage", "track"] as const) {
    for (const button of await overview.locator(`[data-${facet}]`).all()) {
      const id = (await button.getAttribute(`data-${facet}`))!;
      const count = resources.filter((resource) =>
        facet === "stage"
          ? resource.stages.some((stage) => stage === id)
          : facet === "track"
            ? resource.dimensions.some((track) => track === id)
            : resource[facet] === id,
      ).length;
      await expect(button.locator("strong")).toHaveText(String(count));
      if (facet === "stage" || facet === "track") {
        const width = await button
          .locator(".resource-chart-track > i")
          .evaluate((element) =>
            parseFloat((element as HTMLElement).style.width),
          );
        expect(width).toBeCloseTo(
          resources.length ? (count / resources.length) * 100 : 0,
          3,
        );
      }
    }
  }
}

const errors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const list: string[] = [];
  errors.set(page, list);
  page.on("pageerror", (error) => list.push(error.message));
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

for (const locale of locales) {
  test(`resource charts compose filters, survive reload and describe empty results: ${locale.path}`, async ({
    page,
    request,
  }) => {
    const resources: Resource[] = await (
      await request.get("resources.json")
    ).json();
    await page.goto(locale.path + "?campaign=keep&sort=name");
    const overview = page.getByRole("region", { name: locale.overview });
    await expectDistribution(page, resources);

    await overview.locator('[data-stage="test"]').click();
    let filtered = resources.filter((resource) =>
      resource.stages.includes("test"),
    );
    await expectDistribution(page, filtered);
    await expect(overview.locator('[data-stage="test"]')).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await overview.locator('[data-category="agents"]').click();
    filtered = filtered.filter((resource) => resource.category === "agents");
    await expectDistribution(page, filtered);
    await overview.locator('[data-track="3d"]').click();
    filtered = filtered.filter((resource) =>
      resource.dimensions.includes("3d"),
    );
    await expectDistribution(page, filtered);
    await overview.locator('[data-type="agent"]').click();
    filtered = filtered.filter((resource) => resource.type === "agent");
    await expectDistribution(page, filtered);
    await expect(page).toHaveURL(/campaign=keep/);
    await expect(page).toHaveURL(/sort=name/);
    await page.reload();
    await expectDistribution(page, filtered);
    for (const [facet, id] of [
      ["category", "agents"],
      ["type", "agent"],
      ["stage", "test"],
      ["track", "3d"],
    ])
      await expect(overview.locator(`[data-${facet}="${id}"]`)).toHaveAttribute(
        "aria-pressed",
        "true",
      );

    await page
      .locator(".resource-active-filters")
      .getByRole("button", { name: locale.clear, exact: true })
      .click();
    await expectDistribution(page, resources);
    const params = new URL(page.url()).searchParams;
    expect([...params.entries()]).toEqual([
      ["campaign", "keep"],
      ["sort", "name"],
    ]);

    await page
      .getByRole("textbox", { name: locale.search, exact: true })
      .fill("no-such-resource-90210");
    await expectDistribution(page, []);
    await expect(page.locator(".empty-state")).toBeVisible();
    await expect(overview.locator(".resource-donut")).toHaveAttribute(
      "style",
      /background: var\(--line\)/,
    );
    await overview.locator("summary").click();
    await expect(overview.locator(".resource-chart-grid")).not.toBeVisible();
    await overview.locator("summary").click();
    await expect(overview.locator(".resource-chart-grid")).toBeVisible();
  });

  test(`resource cards expose stages, topic search and accurately typed access links: ${locale.path}`, async ({
    page,
    request,
  }) => {
    const resources: Resource[] = await (
      await request.get("resources.json")
    ).json();
    const codex = resources.find((resource) => resource.id === "codex")!;
    await page.goto(locale.path + "?q=OpenAI+Codex");
    await expect(
      page.getByRole("textbox", { name: locale.search, exact: true }),
    ).toHaveValue("OpenAI Codex");
    const card = page.locator('[data-content-ref="resource:codex"]');
    await expect(card.locator(".resource-facets > span > svg")).toHaveCount(2);
    await expect(card.locator(".resource-stage-list > li")).toHaveCount(
      codex.stages.length,
    );
    await expect(card.locator(".resource-keywords button")).toHaveCount(
      codex.tags.length,
    );
    await card.locator(".resource-notes > summary").click();
    await expect(card.locator(".resource-notes-body > p")).toContainText(
      locale.path.startsWith("zh/") ? "游戏项目" : codex.detail,
    );
    await expect(card.locator(".resource-reading a").first()).toHaveAttribute(
      "href",
      codex.links![0].url,
    );
    await card
      .locator(".resource-keywords button")
      .filter({ hasText: /^MCP$/ })
      .click();
    await expect(
      page.getByRole("textbox", { name: locale.search, exact: true }),
    ).toHaveValue("MCP");
    await expect
      .poll(() => page.locator(".resource-tile").count())
      .toBeGreaterThan(1);
    await expect(card).toBeVisible();

    await page.goto(locale.path + "?q=AutoUE");
    await expect(
      page.getByRole("textbox", { name: locale.search, exact: true }),
    ).toHaveValue("AutoUE");
    const autoUE = page.locator('[data-content-ref="resource:autoue"]');
    await expect(
      autoUE.locator(".resource-card-top .resource-glyph > svg"),
    ).toHaveCount(1);
    await autoUE.locator(".resource-notes > summary").click();
    const access = autoUE.locator(".resource-access-list > div");
    await expect(access).toHaveCount(3);
    await expect(access.nth(1).locator("dt")).toContainText(locale.video);
    await expect(access.nth(1).locator("a")).toHaveAttribute(
      "href",
      /show\.mp4$/,
    );
    await expect(access.nth(2).locator("dt")).toContainText(locale.pipeline);
    await expect(access.nth(2).locator("p")).toHaveAttribute("lang", "en");

    await page.goto(locale.path + "?q=Level+Design+Book");
    await expect(
      page.getByRole("textbox", { name: locale.search, exact: true }),
    ).toHaveValue("Level Design Book");
    const skill = page.locator(
      '[data-content-ref="resource:level-design-book-skill"]',
    );
    await skill.locator(".resource-notes > summary").click();
    const unavailable = skill.locator(".resource-access-list > div").nth(1);
    await expect(unavailable.locator("dt")).toContainText(locale.unavailable);
    await expect(unavailable.locator("a")).toHaveCount(0);
    await expect(unavailable.locator("dd > strong")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}

test("resource overviews and native usage notes remain readable without JavaScript", async ({
  browser,
  baseURL,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Native reading runs once");
  for (const locale of locales) {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await context.newPage();
      await page.goto(new URL(locale.path, baseURL).href);
      const overview = page.getByRole("region", { name: locale.overview });
      await expect(overview.locator(".resource-chart-grid")).toBeVisible();
      await overview.locator("summary").click();
      await expect(overview.locator(".resource-chart-grid")).not.toBeVisible();
      const card = page.locator('[data-content-ref="resource:codex"]');
      await card.locator(".resource-notes > summary").click();
      await expect(card.locator(".resource-notes-body > p")).toBeVisible();
      await expect(card.locator(".resource-reading a")).toHaveCount(1);
    } finally {
      await context.close();
    }
  }
});

test("resource charts and expanded notes fit small phones and tablets in both themes", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Explicit viewport matrix runs once",
  );
  for (const width of [320, 800]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const locale of locales) {
      for (const theme of ["dark", "light"]) {
        await page.goto(locale.path + "?q=AutoUE");
        await expect(
          page.getByRole("textbox", { name: locale.search, exact: true }),
        ).toHaveValue("AutoUE");
        await page.evaluate((value) => {
          localStorage.setItem("theme", value);
          document.documentElement.classList.toggle("dark", value === "dark");
        }, theme);
        await page
          .locator(
            '[data-content-ref="resource:autoue"] .resource-notes > summary',
          )
          .click();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          `${locale.path} ${width}px ${theme}`,
        ).toBe(true);
        await expect(page.locator(".resource-chart-grid")).toBeVisible();
        await expect(page.locator(".resource-notes-body")).toBeVisible();
      }
    }
  }
});
