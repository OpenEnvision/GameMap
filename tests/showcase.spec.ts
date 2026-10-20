import { test, expect } from "@playwright/test";

const runtimeErrors = new WeakMap<object, string[]>();
test.beforeEach(({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(({ page }) => {
  expect(runtimeErrors.get(page), "No showcase hydration or runtime errors")
    .toEqual([]);
});

test("showcase search, track and type compose, reload and clear an empty result", async ({
  page,
}) => {
  await page.goto("showcase/");
  const recordings = page.locator(".demo-grid .recording-container");
  await expect(recordings.first()).toBeVisible();
  const unfilteredCount = await recordings.count();
  expect(unfilteredCount).toBeGreaterThan(1);
  const search = page.getByRole("textbox", { name: "Search project demos", exact: true });
  const type = page.getByRole("combobox", { name: "Demo type", exact: true });
  const tracks = page.getByRole("group", { name: "Demo track", exact: true });

  await search.fill("Moonlight");
  await tracks.getByRole("button", { name: "3D", exact: true }).click();
  await type.selectOption("gameplay");
  await expect(recordings).toHaveCount(1);
  await expect(page.locator('[data-content-ref="demo:recording-moonlight-mayhem"]'))
    .toBeVisible();
  await expect.poll(() => {
    const params = new URL(page.url()).searchParams;
    return [params.get("q"), params.get("track"), params.get("type")];
  }).toEqual(["Moonlight", "3d", "gameplay"]);

  await page.reload();
  await expect(search).toHaveValue("Moonlight");
  await expect(type).toHaveValue("gameplay");
  await expect(tracks.getByRole("button", { name: "3D", exact: true }))
    .toHaveAttribute("aria-pressed", "true");
  await expect(recordings).toHaveCount(1);

  await tracks.getByRole("button", { name: "2D", exact: true }).click();
  await expect(recordings).toHaveCount(0);
  await expect(page.getByRole("heading", {
    name: "No recordings match these filters.", exact: true,
  })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(type).toHaveValue("all");
  await expect(tracks.getByRole("button", { name: "All recordings", exact: true }))
    .toHaveAttribute("aria-pressed", "true");
  await expect(recordings).toHaveCount(unfilteredCount);
  await expect.poll(() => new URL(page.url()).search).toBe("");
});

test("a secondary recording view can match the search and remains switchable", async ({
  page,
}) => {
  await page.goto("showcase/?q=synchronized&track=world&type=world-model");
  const recording = page.locator('[data-recording-id="streamrender-car"]');
  await expect(recording).toBeVisible();
  const view = recording.getByRole("combobox");
  await expect(view.locator("option")).toHaveCount(2);
  await expect(view).toHaveValue("recording-streamrender-h3");
  await expect(recording.locator(".demo-card"))
    .toHaveAttribute("data-content-ref", "demo:recording-streamrender-h3");
  await expect(recording.getByRole("link", { name: "Original recording", exact: true }))
    .toHaveAttribute("href", /engine-vs-render-single-car\.mp4$/);

  await page.reload();
  await expect(view).toHaveValue("recording-streamrender-h3");
  await view.selectOption("streamrender-car");
  await expect(recording.locator(".demo-card"))
    .toHaveAttribute("data-content-ref", "demo:streamrender-car");
  await expect(recording.locator("video.preview-desktop"))
    .toHaveAttribute("src", /\/media\/showcase\/streamrender-car\.mp4$/);
  await expect(recording.getByRole("link", { name: "Original recording details", exact: true }))
    .toHaveAttribute("href", /\/showcase\/recording-streamrender-h3\/$/);
  await view.selectOption("recording-streamrender-h3");
  await expect(recording.locator(".demo-card"))
    .toHaveAttribute("data-content-ref", "demo:recording-streamrender-h3");
  await expect(page.locator('[data-recording-id="streamrender-car"]')).toHaveCount(1);
});

test("clearing search before quickly changing filters does not restore the old query", async ({ page }) => {
  await page.goto("showcase/?campaign=review&q=Phaser");
  const search = page.getByRole("textbox", { name: "Search project demos", exact: true });
  await expect(search).toHaveValue("Phaser");
  await search.fill("");
  await page.waitForURL((url) => !url.searchParams.has("q"));
  await page.getByRole("combobox", { name: "Demo type", exact: true }).selectOption("workflow");
  await page.getByRole("group", { name: "Demo track", exact: true })
    .getByRole("button", { name: "2D", exact: true }).click();
  await expect(page.locator('.demo-grid [data-content-ref="demo:recording-sprite-forge"]')).toBeVisible();
  await expect(search).toHaveValue("");
  const params = new URL(page.url()).searchParams;
  expect(params.get("q")).toBeNull();
  expect(params.get("type")).toBe("workflow");
  expect(params.get("track")).toBe("2d");
  expect(params.get("campaign")).toBe("review");
});

test("gameplay, asset and development recordings keep their distinct scope and links", async ({
  page,
}) => {
  await page.goto("showcase/?q=Moonlight&type=gameplay");
  const gameplay = page.locator('[data-content-ref="demo:recording-moonlight-mayhem"]');
  await expect(gameplay.locator(".demo-type-label")).toHaveText("Gameplay");
  await expect(gameplay.locator(".demo-engine")).toContainText("Three.js");
  await expect(gameplay.locator(".demo-limitations")).toContainText("Eight seconds");
  await expect(gameplay.getByRole("link", { name: "Game & source", exact: true }))
    .toHaveAttribute("href", /\/examples\/moonlight-mayhem-codex\/$/);
  await gameplay.getByRole("link", { name: "Game & source", exact: true }).click();
  await expect(page).toHaveURL(/\/examples\/moonlight-mayhem-codex\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Moonlight & Mayhem");

  await page.goto("showcase/?q=TRELLIS&type=assets");
  const assets = page.locator('[data-content-ref="demo:recording-trellis"]');
  await expect(assets.locator(".demo-type-label")).toHaveText("Asset generation");
  await expect(assets.locator(".demo-limitations")).toContainText("gameplay");
  await expect(assets.locator(".demo-engine")).toHaveCount(0);
  await expect(assets.getByRole("link", { name: "Game & source", exact: true })).toHaveCount(0);
  await expect(assets.getByRole("link", { name: "Source page", exact: true }))
    .toHaveAttribute("href", "https://microsoft.github.io/TRELLIS/");

  await page.goto("showcase/?type=workflow");
  const workflow = page.locator('[data-content-ref="demo:recording-autoue-workflow"]');
  await expect(workflow.locator(".demo-type-label")).toHaveText("Development workflow");
  await expect(workflow.locator(".demo-engine")).toContainText("Unreal Engine");
  await expect(workflow.locator(".demo-limitations")).not.toBeEmpty();
  await expect(workflow.getByRole("link", { name: "Game & source", exact: true })).toHaveCount(0);
  await expect(workflow.getByRole("link", { name: "Original recording", exact: true }))
    .toHaveAttribute("href", /^https:/);
});

test("showcase recordings wait for user playback with no media preloading", async ({
  page,
}) => {
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "media") mediaRequests.push(request.url());
  });
  await page.goto("showcase/");
  await expect(page.locator(".demo-grid .demo-card").first()).toBeVisible();
  const videos = page.locator(".demo-grid video");
  expect(await videos.count()).toBeGreaterThan(1);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
  expect(await videos.evaluateAll((nodes) => nodes.every((node) => {
    const video = node as HTMLVideoElement;
    return video.paused && !video.autoplay && !video.hasAttribute("autoplay")
      && video.preload === "none" && video.controls && video.playsInline
      && video.currentTime === 0 && video.readyState === HTMLMediaElement.HAVE_NOTHING;
  }))).toBeTruthy();
  expect(mediaRequests, "The showcase listing must not download recordings before playback")
    .toEqual([]);
});

test("English and Chinese showcase controls fit 320 and 390 pixel screens", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "One narrow-screen pass covers both locales without duplicating the suite");
  for (const { width, path, lang, title } of [
    { width: 320, path: "showcase/", lang: "en", title: "Originals, with every view intact." },
    { width: 390, path: "zh/showcase/", lang: "zh-CN", title: "从演示回到原始记录。" },
  ]) {
    await page.setViewportSize({ width, height: 844 });
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.locator(".showcase-toolbar").getByRole("textbox")).toBeVisible();
    await expect(page.locator(".showcase-toolbar").getByRole("combobox")).toBeVisible();
    if (lang === "zh-CN") {
      await expect(page.locator(".showcase-toolbar").getByRole("textbox"))
        .toHaveAttribute("aria-label", /[\p{Script=Han}]/u);
      await expect(page.locator(".showcase-toolbar").getByRole("combobox"))
        .toHaveAttribute("aria-label", /[\p{Script=Han}]/u);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `${path} has no horizontal overflow at ${width}px`).toBeTruthy();
    const controlsFit = await page.locator(".showcase-toolbar").evaluate((toolbar) =>
      [...toolbar.querySelectorAll("input, select, button")].every((control) => {
        const box = control.getBoundingClientRect();
        return box.left >= 0 && box.right <= innerWidth + 1;
      }));
    expect(controlsFit, `Every filter stays inside the ${width}px viewport`).toBeTruthy();
  }
});
