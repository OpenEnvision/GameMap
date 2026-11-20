import { expect, test, type Page } from "@playwright/test";

const dinosaur = "examples/dinosaur-offline-gemini-cli/";
const openSurfaces = [
  ".game-stage-media",
  ".game-console",
  ".game-spec-row",
  ".game-dest-card",
  ".game-more-card",
].join(", ");
const fields = [
  "title",
  "description",
  "engine",
  "demo",
  "source",
  "tutorial",
  "resourceIds",
];

async function expectOpenLayout(page: Page) {
  const boxed = await page.locator(openSurfaces).evaluateAll((elements) =>
    elements.flatMap((element) => {
      const style = getComputedStyle(element);
      return style.backgroundColor !== "rgba(0, 0, 0, 0)" ||
        style.backgroundImage !== "none" ||
        style.borderLeftWidth !== "0px" ||
        style.borderRightWidth !== "0px" ||
        style.boxShadow !== "none"
        ? [element.className]
        : [];
    }),
  );
  expect(boxed, "Reading sections have no enclosing card surfaces").toEqual([]);
}

async function expectFields(page: Page) {
  for (const field of fields) {
    await expect(
      page.locator(`.game-doc [data-content-field="${field}"]`),
    ).toHaveCount(1);
  }
}

async function expectTemplateGuidanceAbsent(page: Page) {
  await expect(page.locator("#record-guidance")).toHaveCount(0);
  for (const field of ["aiUse", "steps", "category"])
    await expect(
      page.locator(`.game-doc [data-content-field="${field}"]`),
    ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "How it was built", exact: true }),
  ).toHaveCount(0);
}

test("game details use open reading rows in both color themes", async ({
  page,
}) => {
  await page.goto(dinosaur);
  await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
  await expectFields(page);
  await expectOpenLayout(page);
  await expectTemplateGuidanceAbsent(page);

  const rows = await page.locator(".game-dest-card").evaluateAll((elements) =>
    elements.map((element) => {
      const { x, y, bottom } = element.getBoundingClientRect();
      return { x, y, bottom };
    }),
  );
  expect(rows.length).toBeGreaterThan(1);
  for (let index = 1; index < rows.length; index++) {
    expect(rows[index].x).toBe(rows[0].x);
    expect(rows[index].y).toBeGreaterThanOrEqual(rows[index - 1].bottom - 1);
  }
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expectOpenLayout(page);
  await expect(page.locator(".game-cta-primary")).toBeVisible();
});

test("the localized recommendation gallery has 20 unique games and responsive columns", async ({
  page,
  baseURL,
}) => {
  for (const prefix of ["", "zh/"]) {
    await page.goto(prefix + dinosaur);
    await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
    const links = page.locator(".game-more-link");
    await expect(links).toHaveCount(20);
    const destinations = await links.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href")!),
    );
    expect(new Set(destinations).size).toBe(20);
    expect(
      destinations.every((href) => href.includes(`/${prefix}examples/`)),
    ).toBe(true);
    expect(destinations.some((href) => href.endsWith(dinosaur))).toBe(false);

    const columns = await page
      .locator(".game-more-grid")
      .evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(" ").length,
      );
    const width = page.viewportSize()!.width;
    expect(columns).toBe(
      width > 1200 ? 5 : width > 960 ? 4 : width > 640 ? 3 : 2,
    );
    await expect(
      page.locator('.game-more-media img[loading="lazy"]'),
    ).toHaveCount(20);
    await expectOpenLayout(page);

    for (const image of [
      page.locator(".game-more-media img").first(),
      page.locator(".game-more-media img").last(),
    ]) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((element: HTMLImageElement) => element.naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    await links.first().click();
    await expect(page).toHaveURL(new URL(destinations[0], baseURL).href);
    await expect(page.locator(".game-doc h1")).toBeVisible();
  }
});

test("play links, section anchors and screenshot inspection remain available", async ({
  page,
}) => {
  await page.goto(dinosaur);
  await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
  const playHref = await page
    .locator('.game-doc [data-content-field="demo"] a')
    .first()
    .getAttribute("href");
  await expect(page.locator(".game-cta-primary")).toHaveAttribute(
    "href",
    playHref!,
  );

  const inspect = page.getByRole("button", { name: "Inspect screenshot" });
  const imageSrc = await page
    .locator(".game-media-canvas img")
    .getAttribute("src");
  const mediaPosition = await page.evaluate(() => ({
    imageBottom: document
      .querySelector(".game-media-canvas")!
      .getBoundingClientRect().bottom,
    controlTop: document
      .querySelector(".game-media-expand")!
      .getBoundingClientRect().top,
  }));
  expect(mediaPosition.controlTop).toBeGreaterThanOrEqual(
    mediaPosition.imageBottom,
  );

  await inspect.click();
  const preview = page.getByRole("dialog");
  await expect(preview).toBeVisible();
  await expect(page.locator("dialog:modal")).toHaveCount(1);
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(
    preview.getByRole("button", { name: "Close preview" }),
  ).toBeFocused();
  await expect(preview.locator("img")).toHaveAttribute("src", imageSrc!);
  const fits = await preview
    .locator(".game-lightbox-stage")
    .evaluate((stage) => {
      const image = stage.querySelector("img")!.getBoundingClientRect();
      const bounds = stage.getBoundingClientRect();
      return (
        image.height <= bounds.height + 1 &&
        image.width <= bounds.width + 1 &&
        stage.scrollHeight <= stage.clientHeight + 1
      );
    });
  expect(
    fits,
    "The whole screenshot fits below the title at every viewport",
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(preview).toHaveCount(0);
  await expect(inspect).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await inspect.click();
  await preview.getByRole("button", { name: "Close preview" }).click();
  await expect(preview).toHaveCount(0);
  await expect(inspect).toBeFocused();
  await inspect.click();
  await page.mouse.click(4, 4);
  await expect(preview).toHaveCount(0);
  await expect(inspect).toBeFocused();

  const sourceLink = page
    .getByRole("navigation", { name: "On this record" })
    .getByRole("link", { name: "Play & source", exact: true });
  await sourceLink.click();
  await expect(page).toHaveURL(/#record-resources$/);
  await expect(sourceLink).toHaveAttribute("aria-current", "location");
  await expect(page.locator("#game-access-heading")).toBeInViewport();
  const position = await page.evaluate(() => ({
    section: document
      .querySelector("#game-access-heading")!
      .getBoundingClientRect().top,
    navigation: document.querySelector(".game-subnav")!.getBoundingClientRect()
      .bottom,
  }));
  expect(position.section).toBeGreaterThanOrEqual(position.navigation);
});

test("screenshot-free games and source ledgers retain the shared layout", async ({
  page,
}) => {
  for (const id of ["jam-agarust", "godot-2d-dodge", "open3d-arcade-3d"]) {
    await page.goto(`examples/${id}/`);
    await expect(page.locator(".game-doc h1")).toBeVisible();
    await expect(page.locator(".game-blueprint-stage")).toBeVisible();
    await expect(page.locator(".game-more-link")).toHaveCount(20);
    await expectOpenLayout(page);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (id === "open3d-arcade-3d") {
      await expect(page.locator('[data-content-field="intake"]')).toHaveCount(
        0,
      );
      await expect(
        page.getByText("Read supplied directory references"),
      ).toHaveCount(0);
    }
  }
});

test("source-only games keep source icons and access labels in both languages", async ({
  page,
}) => {
  for (const prefix of ["", "zh/"]) {
    await page.goto(`${prefix}examples/open3d-arcade-3d/`);
    await expect(
      page.locator(".game-cta-primary .lucide-code-xml"),
    ).toHaveCount(1);
    await expect(
      page.locator(".game-subnav-button .lucide-code-xml"),
    ).toHaveCount(1);
    await expect(
      page.locator(".game-dest-card.is-demo .lucide-code-xml"),
    ).toHaveCount(1);
    await expect(page.locator(".game-dest-card.is-demo")).not.toHaveClass(
      /is-playable/,
    );
    await expect(page.locator(".game-status-pill.is-playable")).toHaveCount(0);
  }
});

test("recommendation navigation and keyboard focus follow the gallery", async ({
  page,
}) => {
  await page.goto(dinosaur);
  await expect(page.locator('[data-client-ready="true"]')).toHaveCount(1);
  const galleryJump = page.locator(
    '.game-subnav-nav a[href="#record-related"]',
  );
  await galleryJump.click();
  await expect(page).toHaveURL(/#record-related$/);
  await expect(galleryJump).toHaveAttribute("aria-current", "location");
  await expect(page.locator("#game-more-heading")).toBeInViewport();
  const anchorGap = await page.evaluate(
    () =>
      document.querySelector("#record-related")!.getBoundingClientRect().top -
      document.querySelector(".game-subnav")!.getBoundingClientRect().bottom,
  );
  expect(anchorGap).toBeGreaterThanOrEqual(0);
  expect(anchorGap).toBeLessThanOrEqual(40);

  await page.keyboard.press("Tab");
  const firstGame = page.locator(".game-more-link").first();
  await firstGame.focus();
  await expect(firstGame).toBeFocused();
  await expect(firstGame).toHaveCSS("outline-style", "solid");
  await expect(firstGame).toHaveCSS("outline-offset", "5px");
  const position = await page.evaluate(() => ({
    gameTop: document.querySelector(".game-more-link")!.getBoundingClientRect()
      .top,
    navBottom: document.querySelector(".game-subnav")!.getBoundingClientRect()
      .bottom,
  }));
  expect(position.gameTop).toBeGreaterThanOrEqual(position.navBottom);
});

test("game content and recommendations remain readable without JavaScript", async ({
  browser,
  baseURL,
  page: configuredPage,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: configuredPage.viewportSize(),
  });
  try {
    const page = await context.newPage();
    await page.goto(dinosaur);
    await expect(page.locator(".game-doc h1")).toBeVisible();
    await expectFields(page);
    await expect(page.locator(".game-more-link")).toHaveCount(20);
    await expect(page.locator(".game-more-all")).toHaveAttribute(
      "href",
      /\/examples\/$/,
    );
    await expectOpenLayout(page);
  } finally {
    await context.close();
  }
});
