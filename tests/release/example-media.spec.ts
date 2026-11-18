import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const ledger = JSON.parse(
  await readFile("data/segments/jam-game-media.json", "utf8"),
);

test("reviewed community previews load as real image pixels and preserve explicit gaps", async ({
  page,
  request,
}) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("zh/examples/");
  await expect(page.locator("#game-examples > .example-card")).toHaveCount(433);
  const data = await request.get("game-screenshot-sources.json");
  expect(data.ok()).toBe(true);
  expect(await data.json()).toEqual(ledger);
  for (const row of ledger.records) {
    await expect(
      page.locator(`[data-content-ref="example:${row.id}"] .example-image img`),
    ).toHaveAttribute("src", "/" + row.media.src);
  }
  for (const row of ledger.missing) {
    const card = page.locator(`[data-content-ref="example:${row.id}"]`);
    await expect(card.locator("img")).toHaveCount(0);
    await expect(card.locator(".game-preview-unavailable")).toHaveText(
      "暂无已核实的游戏截图",
    );
  }
  const decoded = await page.evaluate(async () => {
    const pictures = [
      ...document.querySelectorAll<HTMLImageElement>(
        "#game-examples .example-image img",
      ),
    ];
    return Promise.all(
      pictures.map(async (element) => {
        const image = new Image();
        image.src = element.src;
        await image.decode();
        return {
          src: element.getAttribute("src"),
          width: image.naturalWidth,
          height: image.naturalHeight,
        };
      }),
    );
  });
  expect(decoded).toHaveLength(44 + ledger.records.length);
  expect(
    decoded.every((image) => image.width === 1280 && image.height === 720),
  ).toBe(true);
  // Validate actual HTTP-served pixels against source checksums, not merely filesystem copies.
  let next = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (next < ledger.records.length) {
        const row = ledger.records[next++],
          response = await request.get(row.media.src);
        expect(response.ok()).toBe(true);
        expect(
          createHash("sha256")
            .update(await response.body())
            .digest("hex"),
        ).toBe(row.sha256);
      }
    }),
  );
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("creator and browser screenshot details retain distinct provenance and dates", async ({
  page,
}) => {
  for (const origin of ["creator-screenshot", "browser-capture"]) {
    const row = ledger.records.find(
      (record: { media: { origin: string } }) => record.media.origin === origin,
    );
    if (!row) continue;
    await page.goto(`zh/examples/${row.id}/`);
    const figure = page.locator('[data-content-field="gameplay"]');
    await expect(figure.locator("img")).toHaveAttribute("alt", row.media.alt);
    await expect(
      figure.locator(`a[href="${row.media.sourceUrl}"]`),
    ).toHaveCount(1);
    if (origin === "creator-screenshot") {
      await expect(
        page.locator('[data-content-field="mediaReviewed"]'),
      ).toContainText(row.media.reviewedAt);
      await expect(
        page.locator('[data-content-field="captureDate"]'),
      ).toHaveCount(0);
      await expect(
        page.locator('[data-content-field="originalImage"] a'),
      ).toHaveAttribute("href", row.media.originalImageUrl);
    } else {
      await expect(
        page.locator('[data-content-field="captureDate"]'),
      ).toContainText(row.media.capturedAt);
      await expect(
        page.locator('[data-content-field="originalImage"]'),
      ).toHaveCount(0);
    }
  }
});
