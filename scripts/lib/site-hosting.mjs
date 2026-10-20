import assert from "node:assert/strict";

function assertPublishedUrl(value, { siteOrigin, base, label }) {
  assert.ok(value, `${label}: a published URL is required`);
  let url;
  try {
    url = new URL(value);
  } catch {
    assert.fail(`${label}: expected an absolute published URL, received ${value}`);
  }
  assert.equal(
    url.origin,
    new URL(siteOrigin).origin,
    `${label}: wrong published origin: ${value}`,
  );
  assert.ok(
    url.pathname.startsWith(base),
    `${label}: published URL is outside base ${base}: ${value}`,
  );
  return url;
}

// These addresses describe GameMap itself. Creator links in page content may
// legitimately use the same hosting platform as an old GameMap deployment.
export function assertSiteMetadata(nodes, options) {
  for (const node of nodes) {
    const attrs = Object.fromEntries(
      (node.attrs || []).map((attr) => [attr.name, attr.value]),
    );
    const rel = (attrs.rel || "").toLowerCase().split(/\s+/);
    const kind =
      node.tagName === "link" && rel.includes("canonical")
        ? "canonical"
        : node.tagName === "link" &&
            rel.includes("alternate") &&
            Object.hasOwn(attrs, "hreflang")
          ? "alternate"
          : node.tagName === "meta" &&
              (attrs.property || attrs.name || "").toLowerCase() === "og:url"
            ? "og:url"
            : undefined;
    if (kind)
      assertPublishedUrl(kind === "og:url" ? attrs.content : attrs.href, {
        ...options,
        label: `${options.label || "page"} ${kind}`,
      });
  }
}

export function assertSitemapAndRobots(sitemap, robots, options) {
  const locations = [...sitemap.matchAll(/<loc\b[^>]*>([^<]+)<\/loc>/gi)].map(
    (match) => match[1].trim(),
  );
  assert.ok(locations.length, "Sitemap must list published page URLs");
  for (const location of locations)
    assertPublishedUrl(location, { ...options, label: "sitemap.xml loc" });

  const sitemapUrls = [...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map(
    (match) => match[1],
  );
  assert.ok(sitemapUrls.length, "robots.txt must declare a sitemap");
  const expected = new URL(options.base + "sitemap.xml", options.siteOrigin).href;
  for (const value of sitemapUrls) {
    const url = assertPublishedUrl(value, {
      ...options,
      label: "robots.txt Sitemap",
    });
    assert.equal(url.href, expected, "robots.txt must point to the site sitemap");
  }
}
