import { test, expect } from "@playwright/test";

for (const prefix of ["", "zh/"]) {
  test(`${prefix || "en/"}research keeps a compact responsive ledger`, async ({
    page,
  }) => {
    await page.goto(`${prefix}research/`, { waitUntil: "domcontentloaded" });
    const ledger = page.locator(".ix-research .ix-ledger-numbered");
    const cards = ledger.locator(":scope > .content-card");
    await expect(cards.first()).toBeVisible();
    const total = await cards.count();

    for (const [width, columns] of [
      [1440, 4],
      [1100, 3],
      [768, 2],
      [390, 1],
    ]) {
      await page.setViewportSize({ width, height: 1000 });
      await expect
        .poll(() =>
          ledger.evaluate(
            (element) =>
              getComputedStyle(element).gridTemplateColumns.split(" ").length,
          ),
        )
        .toBe(columns);
      await expect(cards).toHaveCount(total);

      const overflow = await cards.evaluateAll((elements) =>
        elements.flatMap((card) => {
          const title = card.querySelector("h3")!;
          const summary = card.querySelector("p")!;
          const style = getComputedStyle(summary);
          const problems: string[] = [];
          if (card.scrollWidth > card.clientWidth + 1)
            problems.push(`Card overflows: ${title.textContent}`);
          if (title.scrollHeight > title.clientHeight + 1)
            problems.push(`Title is clipped: ${title.textContent}`);
          if (style.webkitLineClamp !== "3")
            problems.push(`Missing summary clamp: ${title.textContent}`);
          if (summary.clientHeight > parseFloat(style.lineHeight) * 3 + 1)
            problems.push(`Summary exceeds three lines: ${title.textContent}`);
          return problems;
        }),
      );
      expect(overflow, `Ledger at ${width}px`).toEqual([]);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth + 1,
        ),
      ).toBe(true);
    }

    const title = (await cards.first().locator("h3").innerText()).trim();
    const description = await cards.first().locator("p").innerText();
    const search = page.locator(".ix-research .ix-search input");
    await search.fill(title);
    await expect.poll(() => cards.count()).toBeLessThan(total);
    await expect(cards.first().locator("h3")).toHaveText(title);
    await search.fill("");
    await expect(cards).toHaveCount(total);
    await cards.first().locator("h3 a").click();
    await expect(
      page.locator(".content-record .content-lead").first(),
    ).toHaveText(description);
  });
}
