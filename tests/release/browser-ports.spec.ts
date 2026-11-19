import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { loadContent } from "../../scripts/lib/content.mjs";
const context = await loadContent(),
  round4 = JSON.parse(
    await readFile("data/segments/open-3d-import-round4.json", "utf8"),
  ),
  ports = JSON.parse(
    await readFile("data/segments/browser-port-research.json", "utf8"),
  );
test("fourth-batch source references and browser project pages never become fabricated play links", async ({
  page,
  request,
}) => {
  await page.goto("zh/examples/");
  for (const id of round4.newExampleIds) {
    const card = page.locator('[data-content-ref="example:' + id + '"]');
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("data-access-kind", "source");
    await expect(card.locator(".image-action")).toContainText("查看源码");
  }
  for (const id of ports.projectReferenceIds) {
    const entry = context.registry.require("example", id),
      card = page.locator('[data-content-ref="example:' + id + '"]'),
      homepage = entry.data.intake?.homepage;
    expect(
      homepage,
      `${id}: a project reference links its homepage`,
    ).toBeTruthy();
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("data-access-kind", "reference");
    await expect(card.locator(".example-image")).toHaveAttribute(
      "href",
      homepage!,
    );
    await expect(card.locator(".image-action")).toContainText("查看项目");
    await expect(card.locator(".image-action")).not.toContainText("试玩");
    await expect(card.locator(".card-meta")).toContainText("项目参考");
    await expect(card.locator("img")).toHaveCount(
      context.sources.pageCovers[entry.key] ? 1 : 0,
    );
    if (context.sources.pageCovers[entry.key])
      await expect(card.locator(".page-cover-label")).toContainText(
        /(?:GameMap 资料页|项目页面)截图/,
      );
  }
  for (const m of ports.mappings.filter(
    (m: { status: string; inputId: string }) =>
      m.status === "research-candidate",
  ))
    await expect(
      page.locator('[data-content-ref="example:' + m.inputId + '"]'),
    ).toHaveCount(0);
  await expect(
    page.locator('[data-content-ref="example:browser-port-25"]'),
  ).toHaveCount(0);
  for (const [file, data] of [
    ["open-3d-games-import-round4.json", round4],
    ["browser-port-research.json", ports],
  ] as const) {
    const r = await request.get(file);
    expect(r.ok()).toBe(true);
    expect(await r.json()).toEqual(data);
  }
});
test("project details and no-JavaScript cards retain explicit source and original-asset boundaries", async ({
  page,
  browser,
}) => {
  await page.goto("zh/examples/browser-port-12/");
  await expect(
    page.locator('[data-content-field="demo"]').last(),
  ).toContainText("项目参考");
  await expect(
    page.locator('[data-content-field="source"]').last(),
  ).toContainText("corresponding");
  await page.goto("zh/examples/browser-port-06/");
  await expect(
    page.locator('[data-content-field="source"]').last(),
  ).toContainText("experimental native");
  const plain = await browser.newContext({ javaScriptEnabled: false });
  try {
    const p = await plain.newPage();
    await p.goto(test.info().project.use.baseURL + "zh/examples/");
    for (const id of ports.projectReferenceIds)
      await expect(
        p.locator('[data-content-ref="example:' + id + '"] .image-action'),
      ).toContainText("查看项目");
  } finally {
    await plain.close();
  }
});
