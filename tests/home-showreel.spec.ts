import { expect, test, type Locator, type Page } from "@playwright/test";

const filmPath = "/media/promo/gamemap-showreel.mp4";
const duration = 24.416667;
const chapters = [
  {
    name: "2D Game",
    poster: "chapter-2d.webp",
    project: /\/examples\/opengame-marvel-platformer\/$/,
    source: "https://yelonhu.github.io/OpenGame-landing-page/",
    seek: 1.1,
  },
  {
    name: "3D Game",
    poster: "chapter-3d.webp",
    project: /\/examples\/pelican-bike-claude\/$/,
    source: "https://github.com/riba2534/claude-opus-5-5-demo/tree/main/pelican-bike",
    seek: 8.8,
  },
  {
    name: "Code World Model",
    poster: "chapter-world.webp",
    project: /\/resources\/code-world-model-brain\/$/,
    source: "https://buaacyw.github.io/cwm/",
    seek: 16.4,
  },
] as const;

const requests = new WeakMap<Page, string[]>();
const errors = new WeakMap<Page, string[]>();

test.beforeEach(({ page }) => {
  const filmRequests: string[] = [];
  const pageErrors: string[] = [];
  requests.set(page, filmRequests);
  errors.set(page, pageErrors);
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.endsWith(filmPath))
      filmRequests.push(request.url());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
});

test.afterEach(async ({ page }) => {
  expect(errors.get(page), "No showreel runtime or hydration errors").toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    "The film and its controls fit desktop and mobile viewports",
  ).toBeTruthy();
});

function showreel(page: Page) {
  return page.getByRole("region", {
    name: "GameMap project showreel",
    exact: true,
  });
}

function videoIn(reel: Locator) {
  return reel.locator(".showreel-screen video");
}

function chapterButton(reel: Locator, name: string) {
  return reel.locator(".showreel-chapters").getByRole("button", {
    name,
    exact: true,
  });
}

async function openShowreel(page: Page) {
  await page.goto("");
  const reel = showreel(page);
  await expect(reel).toBeVisible();
  await reel.scrollIntoViewIfNeeded();
  return reel;
}

async function expectUnloaded(page: Page, reel: Locator) {
  expect(requests.get(page), "Poster browsing must not fetch the MP4").toEqual([]);
  expect(
    await videoIn(reel).evaluateAll((nodes) =>
      nodes.every((node) => {
        const video = node as HTMLVideoElement;
        return (
          !video.getAttribute("src") &&
          !video.querySelector("source[src]") &&
          !video.currentSrc
        );
      }),
    ),
    "No video source is attached before playback is requested",
  ).toBeTruthy();
}

async function expectDecodedAndPlaying(video: Locator) {
  await expect
    .poll(
      () =>
        video.evaluate((node: HTMLVideoElement) => ({
          playing: !node.paused && !node.ended,
          decoded: node.readyState >= 2 && node.videoWidth > 0,
          frames: node.getVideoPlaybackQuality().totalVideoFrames > 0,
        })),
      { message: "The real H.264 film must decode and play", timeout: 15000 },
    )
    .toEqual({ playing: true, decoded: true, frames: true });
  const start = await video.evaluate((node: HTMLVideoElement) => node.currentTime);
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(start + 0.12);
}

async function animationFrames(page: Page, count = 3) {
  await page.evaluate(async (frames) => {
    for (let frame = 0; frame < frames; frame++)
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }, count);
}

test("reduced motion shows real chapter posters and links without requesting the film", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const reel = await openShowreel(page);
  const poster = reel.locator("img.showreel-poster");
  await expect(reel.getByRole("button", { name: "Play film", exact: true }))
    .toBeVisible();

  for (const chapter of chapters) {
    await chapterButton(reel, chapter.name).click();
    await expect(chapterButton(reel, chapter.name))
      .toHaveAttribute("aria-pressed", "true");
    await expect(reel.locator('.showreel-chapters button[aria-pressed="true"]'))
      .toHaveCount(1);
    await expect(poster).toHaveAttribute("src", new RegExp(chapter.poster + "$"));
    await expect
      .poll(() => poster.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0))
      .toBeTruthy();
    await expect(reel.getByRole("link", { name: "View project", exact: true }))
      .toHaveAttribute("href", chapter.project);
    await expect(reel.getByRole("link", { name: "Original source", exact: true }))
      .toHaveAttribute("href", chapter.source);
    await expectUnloaded(page, reel);
  }

  await expect(reel).toContainText(/Research demo/i);
  await expect(reel.getByRole("link", { name: "View project", exact: true }))
    .not.toHaveAttribute("href", /\/examples\//);
  await animationFrames(page);
  await expectUnloaded(page, reel);
});

test("explicit Play decodes the film; paused chapter seeks and native fullscreen work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const reel = await openShowreel(page);
  const filmResponse = page.waitForResponse((response) =>
    new URL(response.url()).pathname.endsWith(filmPath),
  );
  await reel.getByRole("button", { name: "Play film", exact: true }).click();
  const response = await filmResponse;
  expect([200, 206]).toContain(response.status());
  expect(response.headers()["content-type"]).toContain("video/mp4");
  const video = videoIn(reel);
  await expectDecodedAndPlaying(video);
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveJSProperty("playsInline", true);
  expect(await video.evaluate((node: HTMLVideoElement) => node.canPlayType('video/mp4; codecs="avc1.4d401f"')))
    .not.toBe("");
  expect(await video.evaluate((node: HTMLVideoElement) => node.duration))
    .toBeCloseTo(duration, 2);

  await reel.getByRole("button", { name: "Pause film", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", true);
  for (const chapter of [chapters[1], chapters[2], chapters[0]]) {
    await chapterButton(reel, chapter.name).click();
    await expect(chapterButton(reel, chapter.name))
      .toHaveAttribute("aria-pressed", "true");
    await expect
      .poll(() => video.evaluate((node: HTMLVideoElement, seek) =>
        !node.seeking && Math.abs(node.currentTime - seek) < 0.15,
      chapter.seek))
      .toBeTruthy();
    await expect(video).toHaveJSProperty("paused", true);
    await expect(reel.getByRole("button", { name: "Play film", exact: true }))
      .toBeVisible();
  }

  if (await page.evaluate(() => document.fullscreenEnabled)) {
    await reel.getByRole("button", { name: "Enter fullscreen", exact: true }).click();
    await expect
      .poll(() => reel.evaluate((node) =>
        !!document.fullscreenElement &&
        (document.fullscreenElement === node || node.contains(document.fullscreenElement)),
      ))
      .toBeTruthy();
    await reel.getByRole("button", { name: "Exit fullscreen", exact: true }).click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement === null))
      .toBeTruthy();
  } else {
    test.info().annotations.push({
      type: "fullscreen",
      description: "Native fullscreen is unavailable in this browser context.",
    });
  }
});

test("ordinary autoplay follows the real timeline and loops back to the first chapter", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const reel = await openShowreel(page);
  const video = videoIn(reel);
  await expectDecodedAndPlaying(video);
  await expect(video).toHaveJSProperty("loop", true);

  // Seek close to each boundary, then let actual media playback cross it.
  await video.evaluate((node: HTMLVideoElement) => { node.currentTime = 7.9; });
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(8.25);
  await expect(chapterButton(reel, "3D Game"))
    .toHaveAttribute("aria-pressed", "true");
  await expect(reel.getByRole("link", { name: "View project", exact: true }))
    .toHaveAttribute("href", chapters[1].project);

  await video.evaluate((node: HTMLVideoElement) => { node.currentTime = 15.5; });
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(15.85);
  await expect(chapterButton(reel, "Code World Model"))
    .toHaveAttribute("aria-pressed", "true");
  await expect(reel).toContainText(/Research demo/i);
  await video.evaluate((node: HTMLVideoElement) => { node.currentTime = node.duration - 0.35; });
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeLessThan(1.5);
  await expect(chapterButton(reel, "2D Game"))
    .toHaveAttribute("aria-pressed", "true");
  await expectDecodedAndPlaying(video);
});

test("leaving the viewport pauses playback and returning respects the user's pause", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const reel = await openShowreel(page);
  const video = videoIn(reel);
  await expectDecodedAndPlaying(video);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect
    .poll(() => reel.evaluate((node) => node.getBoundingClientRect().bottom <= 0))
    .toBeTruthy();
  await expect(video).toHaveJSProperty("paused", true);
  const stoppedAt = await video.evaluate((node: HTMLVideoElement) => node.currentTime);
  await animationFrames(page);
  expect(await video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeCloseTo(stoppedAt, 2);
  await reel.scrollIntoViewIfNeeded();
  await expectDecodedAndPlaying(video);

  await reel.getByRole("button", { name: "Pause film", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect
    .poll(() => reel.evaluate((node) => node.getBoundingClientRect().bottom <= 0))
    .toBeTruthy();
  await reel.scrollIntoViewIfNeeded();
  await animationFrames(page);
  await expect(video).toHaveJSProperty("paused", true);
  await expect(reel.getByRole("button", { name: "Play film", exact: true }))
    .toBeVisible();
});

test("Save-Data keeps chapter browsing download-free until explicit Play", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const nav = navigator as Navigator & { connection?: EventTarget };
    const connection = nav.connection || new EventTarget();
    Object.defineProperty(connection, "saveData", { configurable: true, get: () => true });
    Object.defineProperty(navigator, "connection", { configurable: true, get: () => connection });
  });
  const reel = await openShowreel(page);
  await chapterButton(reel, "3D Game").click();
  await expect(chapterButton(reel, "3D Game"))
    .toHaveAttribute("aria-pressed", "true");
  await expect(reel.locator("img.showreel-poster"))
    .toHaveAttribute("src", /chapter-3d\.webp$/);
  await animationFrames(page);
  await expectUnloaded(page, reel);

  await reel.getByRole("button", { name: "Play film", exact: true }).click();
  const video = videoIn(reel);
  await expectDecodedAndPlaying(video);
  expect(requests.get(page)!.length).toBeGreaterThan(0);
  expect(await video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThanOrEqual(chapters[1].seek - 0.15);
});
