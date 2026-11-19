import { readFileSync } from "node:fs";
import { test, expect, type Page } from "@playwright/test";

// `npm run build` leaves VITE_GAMEMAP_COMMUNITY unset. GitHub Pages and other
// static copies have no community API, so the site must neither call it nor
// show community UI; the community pages explain why instead.
const { records } = JSON.parse(
  readFileSync("dist/content-manifest.json", "utf8"),
) as { records: { kind: string; url: string }[] };
const game = records
  .find((record) => record.kind === "example")!
  .url.replace(/^\//, "");
const notice = {
  en: "Accounts, ratings, comments and game submissions need the GameMap community server, which this static site does not include.",
  zh: "账号、评分、评论和作品投稿需要 GameMap 社区服务端，本站为纯静态部署，不包含这些功能。",
};

function communityRequests(page: Page) {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.includes("/api/community"))
      requests.push(request.url());
  });
  return requests;
}

// Community requests start in effects during hydration, so they have been sent
// by the time the interactive surface reports that it is ready.
async function visit(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator(".interactive-surface")).toHaveAttribute(
    "data-client-ready",
    "true",
  );
}

// Community builds prerender a rating summary on every game card. Reading the
// HTML avoids hydrating Examples, which is too large for traced browser runs.
test("the static Examples page renders game cards without rating summaries", async ({
  request,
}) => {
  const html = await (await request.get("examples/")).text();
  const count = (pattern: RegExp) => html.match(pattern)?.length ?? 0;
  expect(count(/class="example-card/g), "game cards").toBeGreaterThan(0);
  expect(count(/game-rating-summary/g), "rating summaries").toBe(0);
});

test("static pages make no community requests and game pages have no discussion", async ({
  page,
}) => {
  const requests = communityRequests(page);
  await visit(page, "");
  await expect(
    page.locator(".community-account-link, .community-submit-link"),
  ).toHaveCount(0);
  await visit(page, game);
  await expect(page.locator("#community")).toHaveCount(0);
  await expect(page.locator('a[href="#community"]')).toHaveCount(0);
  expect(requests, "No /api/community requests in a static build").toEqual([]);
});

test("static community pages explain that the community server is required", async ({
  page,
}) => {
  const requests = communityRequests(page);
  for (const path of ["account/", "submit/"]) {
    await visit(page, path);
    await expect(page.getByText(notice.en)).toBeVisible();
  }
  await visit(page, "zh/account/");
  await expect(page.getByText(notice.zh)).toBeVisible();
  expect(requests, "No /api/community requests in a static build").toEqual([]);
});
