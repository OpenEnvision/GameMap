import { test, expect } from "@playwright/test";
import { loadContent } from "../../scripts/lib/content.mjs";

const content = await loadContent();
const demos = content.registry.all("demo");
const owners = [...new Set(demos.map((entry) => entry.data.resourceId))];

test("retired Showcase listings return genuine 404s with no navigation or directory links", async ({
  page,
  request,
  baseURL,
}) => {
  for (const prefix of ["", "zh/"]) {
    const response = await request.get(
      new URL(prefix + "showcase/", baseURL).href,
    );
    expect(response.status()).toBe(404);
    expect(response.headers().location).toBeUndefined();
    for (const path of ["", "papers/", "resources/"]) {
      await page.goto(prefix + path);
      await expect(page.locator('a[href$="/showcase/"]')).toHaveCount(0);
    }
  }
});

test("every recording remains discoverable from its resource owner without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  try {
    const page = await context.newPage();
    for (const prefix of ["", "zh/"]) {
      for (const owner of owners) {
        const response = await page.goto(
          prefix + `resources/${encodeURIComponent(owner)}/`,
        );
        expect(response?.status()).toBe(200);
        for (const entry of demos.filter(
          (entry) => entry.data.resourceId === owner,
        )) {
          expect(entry.collectionUrl).toBe(
            `/resources/${encodeURIComponent(owner)}/`,
          );
          await expect(
            page.locator(`[data-content-ref="${entry.key}"]`),
          ).toBeVisible();
        }
        await expect(page.locator('a[href$="/showcase/"]')).toHaveCount(0);
        await expect(page.locator("video[autoplay]")).toHaveCount(0);
      }
    }
  } finally {
    await context.close();
  }
});

test("all original recording detail URLs remain available after the gallery is retired", async ({
  request,
  baseURL,
}) => {
  for (const prefix of ["", "zh/"]) {
    for (const entry of demos) {
      const response = await request.get(
        new URL(prefix + entry.url.slice(1), baseURL).href,
      );
      expect(response.status(), entry.key).toBe(200);
      expect(await response.text()).toContain(
        `data-content-key="${entry.key}"`,
      );
    }
  }
});
