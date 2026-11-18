import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { loadContent } from "../../scripts/lib/content.mjs";
import { root } from "../../scripts/lib/documents.mjs";
import { siteDownloads } from "../../scripts/lib/catalog/site-files.mjs";

const context = await loadContent();

test("complete release downloads preserve games without inventing missing screenshot entries", async () => {
  const community = context.sources.learningPaths.filter(
    (row) => row.category === "community",
  );
  assert.ok(community.some((row) => !context.sources.learningMedia[row.id]));
  const bodies = Object.fromEntries(
    await Promise.all(
      context.documents.map(async (page) => [
        page.source,
        await readFile(new URL("../../" + page.source, import.meta.url), "utf8"),
      ]),
    ),
  );
  const outputs = await siteDownloads(
    { sources: context.sources, documents: context.documents },
    bodies,
    root,
  );
  const media = JSON.parse(outputs["media/learning/manifest.json"]);
  assert.equal(media.kind, "gameplay-screenshots");
  const expected = context.sources.learningPaths
    .filter((row) => context.sources.learningMedia[row.id])
    .map((row) => row.id);
  assert.deepEqual(
    media.previews.map((row) => row.id),
    expected,
  );
  for (const preview of media.previews) {
    assert.ok(preview.bytes > 0);
    assert.match(preview.sha256, /^[a-f0-9]{64}$/);
  }
});
