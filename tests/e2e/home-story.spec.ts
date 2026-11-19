import { expect, test } from "@playwright/test";

const chapters = ["idea", "build", "play"];

test("story navigation carries keyboard focus into each chapter", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("");
  const story = page.locator(".hm-story");
  await expect(story).toHaveAttribute(
    "data-mode",
    isMobile ? "stacked" : "live",
  );
  test.skip(isMobile, "Chapter jumps live on the desktop rail");

  for (const [index, id] of chapters.entries()) {
    const link = page.locator(".hm-story-rail").getByRole("link", {
      name: new RegExp(id, "i"),
    });
    await link.focus();
    await page.keyboard.press("Enter");
    const chapter = page.locator(`#story-${id}`);
    await expect(chapter).toBeFocused();
    await expect(chapter.getByRole("heading")).toBeInViewport();
    await expect(story).toHaveAttribute("data-active", String(index));
    await expect(
      page.locator(`.hm-story-rail a[href="#story-${id}"]`),
    ).toHaveAttribute("aria-current", "step");
    await page.keyboard.press("Tab");
    await expect(chapter.getByRole("link").first()).toBeFocused();
    await expect(chapter.getByRole("link").first()).toBeInViewport();
  }
});

test("story pointer navigation clears the header and shows the matching scene", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("");
  const story = page.locator(".hm-story");
  await expect(story).toHaveAttribute(
    "data-mode",
    isMobile ? "stacked" : "live",
  );
  test.skip(isMobile, "Chapter jumps live on the desktop rail");
  const scenes = story.locator(".hm-scene");

  for (const [index, id] of chapters.entries()) {
    const link = page.locator(`.hm-story-rail a[href="#story-${id}"]`);
    await link.click();
    const chapter = page.locator(`#story-${id}`);
    await expect
      .poll(() =>
        chapter.evaluate((element) => {
          const padding = parseFloat(
            getComputedStyle(document.documentElement).scrollPaddingTop,
          );
          return Math.abs(element.getBoundingClientRect().top - padding);
        }),
      )
      .toBeLessThan(2);
    await expect(chapter).toBeFocused();
    await expect(story).toHaveAttribute("data-active", String(index));
    await expect(scenes.nth(index)).toBeInViewport();
    await expect(scenes.nth(index)).toHaveAttribute("data-on", "true");
  }
});

test("reduced-motion story keeps every scene visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("");
  await expect(page.locator('[data-client-ready="true"]')).toBeAttached();
  const story = page.locator(".hm-story");
  await expect(story).toHaveAttribute("data-mode", "stacked");
  await expect(story.locator(".hm-story-rail")).toBeHidden();
  for (const scene of await story.locator(".hm-scene").all())
    await expect(scene).toBeVisible();
  await expect(story.locator(".hm-route")).toHaveCount(0);
  await expect(story.locator(".hm-build-pulse").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator("#story-play h3")).toBeVisible();
});

for (const width of [320, 1180]) {
  test(`story overview fits ${width}px in both locales`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Explicit viewport matrix runs once");
    await page.setViewportSize({ width, height: 900 });
    for (const locale of ["", "zh/"]) {
      await page.goto(locale);
      await page.evaluate(() => document.fonts.ready);
      const header = page.locator(".hm-story-head");
      await header.scrollIntoViewIfNeeded();
      const overflow = await header.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return [...element.querySelectorAll<HTMLElement>(".hm-title")]
          .filter((node) => {
            const rect = node.getBoundingClientRect();
            return (
              rect.left < bounds.left - 1 ||
              rect.right > bounds.right + 1 ||
              node.scrollWidth > node.clientWidth + 1
            );
          })
          .map((node) => node.className || node.textContent);
      });
      expect(overflow, `${locale || "en"} at ${width}px`).toEqual([]);
    }
  });
}
