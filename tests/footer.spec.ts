import { test, expect } from "@playwright/test";

for (const javaScriptEnabled of [true, false]) {
  test.describe(javaScriptEnabled ? "Hydrated footer" : "Static footer", () => {
    test.use({ javaScriptEnabled });

    for (const { prefix, label, description } of [
      {
        prefix: "",
        label: "Related sites",
        description: "Game art styles and visual references.",
      },
      {
        prefix: "zh/",
        label: "友情链接",
        description: "游戏美术风格与视觉参考。",
      },
    ]) {
      test(`related site is localized and safe (${prefix || "en"})`, async ({
        page,
      }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));

        for (const route of ["", "resources/"]) {
          await page.goto(prefix + route);
          if (javaScriptEnabled)
            await expect(page.locator(".interactive-surface")).toHaveAttribute(
              "data-client-ready",
              "true",
            );

          const footer = page.getByRole("contentinfo");
          const related = footer.getByRole("navigation", { name: label });
          const link = related.getByRole("link", {
            name: "Game Art Style",
            exact: true,
          });
          await expect(link).toBeVisible();
          await expect(link).toHaveAttribute(
            "href",
            "https://gameartstyle.loopyhop.com/",
          );
          await expect(link).toHaveAttribute("target", "_blank");
          await expect(link).toHaveAttribute("rel", "noopener noreferrer");
          await expect(link).toHaveAccessibleDescription(description);
          await expect(
            related.getByText(description, { exact: true }),
          ).toBeVisible();
          await expect(footer.locator(".footer-links a")).toHaveCount(2);
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
          ).toBe(true);
        }

        expect(errors).toEqual([]);
      });
    }
  });
}
