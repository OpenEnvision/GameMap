import { expect, test } from "@playwright/test";

const destinations: Record<string, string[]> = {
  games: ["/examples/"],
  tools: ["/resources/", "/agents/", "/testing/"],
  research: ["/papers/", "/research/"],
  learn: ["/docs/"],
};

for (const locale of ["", "zh/"]) {
  test(`atlas preserves collection and category navigation in ${locale || "English"}`, async ({
    page,
    isMobile,
  }) => {
    await page.goto(locale + "#hm-atlas-title", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator('[data-client-ready="true"]')).toBeAttached();
    const atlas = page.locator(".hm-atlas");
    await expect(atlas.locator("[data-pillar]")).toHaveCount(4);
    for (const [pillar, paths] of Object.entries(destinations)) {
      const card = atlas.locator(`[data-pillar="${pillar}"]`);
      await expect(card.locator(".hm-tile-count")).toHaveText(/^\d+$/);
      for (const path of paths) {
        const localized = locale
          ? path === "/docs/"
            ? "/docs/zh/"
            : "/zh" + path
          : path;
        await expect(card.locator(`a[href$="${localized}"]`)).toHaveCount(1);
      }
    }

    const categories = atlas.locator(".hm-directions a");
    await expect(categories).toHaveCount(6);
    for (const link of await categories.all()) {
      const href = new URL((await link.getAttribute("href"))!, page.url());
      expect(href.searchParams.get("category")).toBe(
        await link.getAttribute("data-category"),
      );
      expect(
        href.pathname.endsWith(locale ? "/zh/resources/" : "/resources/"),
      ).toBe(true);
    }
    const first = categories.first();
    const category = await first.getAttribute("data-category");
    if (isMobile) {
      await first.tap();
    } else {
      await first.focus();
      await expect(first).toBeFocused();
      await page.keyboard.press("Enter");
    }
    await expect(page).toHaveURL(
      (url) =>
        url.pathname.endsWith("/resources/") &&
        url.searchParams.get("category") === category,
    );
  });
}

for (const width of [320, 640, 1100, 1440]) {
  test(`atlas has a compact, readable layout at ${width}px`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Explicit viewport matrix runs once");
    await page.setViewportSize({ width, height: 1000 });
    for (const locale of ["", "zh/"]) {
      await page.goto(locale + "#hm-atlas-title", {
        waitUntil: "domcontentloaded",
      });
      await expect(page.locator('[data-client-ready="true"]')).toBeAttached();
      await page.evaluate(() => document.fonts.ready);
      for (const theme of ["dark", "light"]) {
        const isDark = await page
          .locator("html")
          .evaluate((root) => root.classList.contains("dark"));
        if (isDark !== (theme === "dark"))
          await page
            .getByRole("button", {
              name: locale ? "切换明暗主题" : "Toggle color theme",
            })
            .click();
        await expect(page.locator("html")).toHaveClass(new RegExp(theme));
        const layout = await page.locator(".hm-atlas").evaluate((element) => {
          const rows = new Set(
            [...element.querySelectorAll("[data-pillar]")].map((card) =>
              Math.round(card.getBoundingClientRect().top),
            ),
          );
          const overflow = [
            ...element.querySelectorAll<HTMLElement>(
              ".hm-tile, .hm-tile-head, .hm-tile-links a, .hm-direction-text strong, .hm-direction-text small",
            ),
          ].filter((node) => node.scrollWidth > node.clientWidth + 1);
          return {
            height: element.getBoundingClientRect().height,
            rows: rows.size,
            overflow: overflow.map((node) => node.textContent),
            minTarget: Math.min(
              ...[...element.querySelectorAll(".hm-tile a")].map(
                (link) => link.getBoundingClientRect().height,
              ),
            ),
            bodySize: parseFloat(
              getComputedStyle(element.querySelector(".hm-tile-text")!)
                .fontSize,
            ),
          };
        });
        expect(layout.overflow, `${locale || "en"} ${theme}`).toEqual([]);
        expect(layout.rows).toBe(width < 640 ? 4 : width < 1100 ? 2 : 1);
        expect(layout.minTarget).toBeGreaterThanOrEqual(44);
        expect(layout.bodySize).toBeGreaterThanOrEqual(15);
        if (width >= 1100) expect(layout.height).toBeLessThan(900);
      }
    }
  });
}
