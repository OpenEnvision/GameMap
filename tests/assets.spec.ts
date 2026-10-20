import { expect, test } from "@playwright/test";

test("English and Chinese pages load assets from the shared canonical directory", async ({
  page,
}) => {
  for (const route of ["", "zh/"]) {
    const failures: string[] = [];
    const inspect = (response: import("@playwright/test").Response) => {
      if (response.url().includes("/assets/") && response.status() >= 400)
        failures.push(response.url());
    };
    page.on("response", inspect);
    await page.goto(route);
    const mark = page.locator(".site-header .atlas-brand img");
    await expect(mark).toHaveAttribute(
      "src",
      /\/assets\/brand\/gamemap-mark\.svg$/,
    );
    await expect(mark).toHaveJSProperty("complete", true);
    expect(
      await mark.evaluate((node: HTMLImageElement) => node.naturalWidth),
    ).toBeGreaterThan(0);
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
      "href",
      /\/assets\/brand\/favicon\.svg$/,
    );
    await expect(page.locator(".spotlight-image img")).toHaveAttribute(
      "src",
      /\/assets\/media\//,
    );
    expect(failures).toEqual([]);
    page.off("response", inspect);
  }
});

test("old asset URLs still serve the same bytes after reorganization", async ({
  request,
}) => {
  for (const [old, current] of [
    ["favicon.svg", "assets/brand/favicon.svg"],
    ["brand/gamemap-mark.svg", "assets/brand/gamemap-mark.svg"],
    [
      "media/learning/moonlight-mayhem-codex.webp",
      "assets/media/learning/moonlight-mayhem-codex.webp",
    ],
  ]) {
    const original = await request.get(old),
      canonical = await request.get(current);
    expect(original.status()).toBe(200);
    expect(canonical.status()).toBe(200);
    expect(original.headers()["content-type"]).toBe(
      canonical.headers()["content-type"],
    );
    expect(await original.body()).toEqual(await canonical.body());
  }
  const headers = { Range: "bytes=0-255" };
  const original = await request.get("media/showcase/opengame-portal.mp4", {
      headers,
    }),
    canonical = await request.get("assets/media/showcase/opengame-portal.mp4", {
      headers,
    });
  expect(original.status()).toBe(206);
  expect(canonical.status()).toBe(206);
  expect(await original.body()).toEqual(await canonical.body());
});
