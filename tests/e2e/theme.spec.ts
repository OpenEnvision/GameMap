import { expect, test } from "@playwright/test";

function luminance(color: string) {
  const channels = color.startsWith("#")
    ? [1, 3, 5].map((start) => parseInt(color.slice(start, start + 2), 16))
    : (color.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const linear = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(first: string, second: string) {
  const [low, high] = [luminance(first), luminance(second)].sort(
    (a, b) => a - b,
  );
  return (high + 0.05) / (low + 0.05);
}

test("selected resource filters keep labels and counts readable", async ({
  page,
}) => {
  await page.goto("resources/");
  for (const theme of ["light", "dark"] as const) {
    const isDark = await page
      .locator("html")
      .evaluate((root) => root.classList.contains("dark"));
    if (isDark !== (theme === "dark"))
      await page.getByRole("button", { name: "Toggle color theme" }).click();
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      theme === "light" ? "#fffcfb" : "#090f1b",
    );
    for (const index of [0, 1]) {
      const filter = page.locator(".category-filters button").nth(index);
      await filter.click();
      await expect(filter).toHaveAttribute("aria-pressed", "true");
      await expect
        .poll(async () => {
          const palette = await filter.evaluate((button) => {
            const styles = getComputedStyle(button);
            const count = getComputedStyle(button.querySelector("span")!);
            const channels = (value: string) =>
              (value.match(/[\d.]+/g) || []).map(Number);
            const background = channels(styles.backgroundColor);
            const composite = (color: string, opacity: string) => {
              const foreground = channels(color);
              const alpha = Number(opacity) * (foreground[3] ?? 1);
              return `rgb(${background
                .slice(0, 3)
                .map(
                  (channel, i) => foreground[i] * alpha + channel * (1 - alpha),
                )
                .join(", ")})`;
            };
            return {
              background: styles.backgroundColor,
              label: composite(styles.color, styles.opacity),
              count: composite(count.color, count.opacity),
            };
          });
          return Math.min(
            contrast(palette.label, palette.background),
            contrast(palette.count, palette.background),
          );
        })
        .toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("atlas themes stay consistent across the site and Fumadocs", async ({
  page,
}) => {
  for (const theme of ["light", "dark"] as const) {
    await page.goto("");
    if (theme === "dark")
      await page.getByRole("button", { name: "Toggle color theme" }).click();
    const background = theme === "light" ? "#fffcfb" : "#090f1b";
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      background,
    );
    const palette = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const button = getComputedStyle(
        document.querySelector(".button-primary")!,
      );
      return {
        paper: root.getPropertyValue("--paper").trim(),
        accent: root.getPropertyValue("--accent").trim(),
        muted: root.getPropertyValue("--muted").trim(),
        buttonText: button.color,
        buttonBackground: button.backgroundColor,
      };
    });
    expect(palette.paper).toBe(background);
    expect(contrast(palette.accent, palette.paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(palette.muted, palette.paper)).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast(palette.buttonText, palette.buttonBackground),
    ).toBeGreaterThanOrEqual(4.5);

    await page
      .getByRole("button", { name: "Search all content", exact: true })
      .click();
    const search = page.getByRole("dialog");
    await expect(search).toBeVisible();
    const popover = await search.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return {
        actual: root.getPropertyValue("--color-fd-popover").trim(),
        panel: root.getPropertyValue("--panel").trim(),
      };
    });
    expect(popover.actual).toBe(popover.panel);
    await page.keyboard.press("Escape");

    await page.goto("docs/guides/practical-guide/");
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      background,
    );
    const sidebar = await page.locator("#nd-docs-layout").evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const sidebar =
        document.querySelector("#nd-sidebar") ||
        document.querySelector("#nd-subnav")!;
      const styles = getComputedStyle(sidebar);
      return {
        foreground: styles
          .getPropertyValue("--color-fd-muted-foreground")
          .trim(),
        muted: root.getPropertyValue("--muted").trim(),
        background: styles.getPropertyValue("--color-fd-background").trim(),
        paper: root.getPropertyValue("--paper").trim(),
      };
    });
    expect(sidebar.foreground).toBe(sidebar.muted);
    expect(sidebar.background).toBe(sidebar.paper);
    await expect(page.locator("#nd-page .prose")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
});
