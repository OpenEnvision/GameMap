// Isolated test Auth/PostgreSQL only. Never imported by a production entry point.
import assert from "node:assert/strict";
import { resolve } from "node:path";
import sharp from "sharp";
import { studioFixture } from "./studio-fixture.mjs";
import { writeReleasePackage } from "../../scripts/lib/catalog/release-files.mjs";
import { sha256 } from "../../scripts/lib/catalog/codec.mjs";
assert.equal(
  process.env.NODE_ENV,
  "test",
  "Release fixtures require explicit NODE_ENV=test",
);
const [flag, output] = process.argv.slice(2);
assert.ok(
  flag === "--out" && output,
  "Usage: NODE_ENV=test node tests/helpers/release-fixture.mjs --out PRIVATE_DIRECTORY",
);
const fixture = await studioFixture();
try {
  const editor = await fixture.login("editor"),
    reviewer = await fixture.login("reviewer"),
    admin = await fixture.login("admin");
  const request = async (path, session, body, status = 200) => {
    const response = await fixture.request(path, {
      session,
      method: body === undefined ? "GET" : "POST",
      body,
    });
    const result = await response.json();
    assert.equal(response.status, status, JSON.stringify(result));
    return result;
  };
  const png = await sharp({
    create: { width: 80, height: 40, channels: 3, background: "#4b7654" },
  })
    .png()
    .toBuffer();
  const uploaded = await fixture.request("/api/media", {
    session: editor,
    method: "POST",
    file: png,
  });
  assert.equal(uploaded.status, 201);
  const asset = await uploaded.json();
  const original = fixture.bundle.snapshot.entries.find(
    (row) => row.kind === "resource",
  );
  const payload = {
    ...original.body.payload,
    id: "snapshot-only-fixture",
    name: "Snapshot-only database fixture",
    summary: "A private snapshot fixture, not a real reviewed project.",
    detail:
      "Snapshot fixture. {globalThis.__gamemap_release_injection__ = true}",
    url: "https://example.invalid/snapshot-fixture",
    links: [],
    access: undefined,
  };
  const identity = {
    organization: "Isolated test fixture",
    kind: "creator",
    asset: asset.path,
    sha256: asset.sha256,
    sourceUrl: payload.url,
    logoSourceUrl: payload.url,
    notes: "Isolated test pixels, not an actual third-party project mark.",
  };
  const created = await request(
    "/api/drafts",
    editor,
    {
      kind: "resource",
      identifier: payload.id,
      schemaVersion: 1,
      expectedHead: null,
      payload,
      attachments: { identity },
      translations: [
        {
          locale: "zh",
          field: "name",
          value: "数据库快照测试夹具",
          source_hash: sha256(JSON.stringify(payload.name)),
        },
      ],
    },
    201,
  );
  await request(`/api/revisions/${created.id}/validate`, editor, {});
  await request("/api/review", editor, { action: "submit", ids: [created.id] });
  await request("/api/review", reviewer, {
    action: "approve",
    ids: [created.id],
    note: "Test fixture only, no real external source verification or reproduction.",
  });
  const synced = await request("/api/documents/sync", admin, {});
  assert.ok(
    synced.ids.length,
    "Changed catalogs must produce reviewed source-index successors",
  );
  await request("/api/review", admin, { action: "submit", ids: synced.ids });
  await request("/api/review", reviewer, {
    action: "approve",
    ids: synced.ids,
    note: "Reviewed test-generated catalog views.",
  });
  const frozen = await request("/api/releases", reviewer, {}, 201);
  const pack = await request(`/api/releases/${frozen.id}/export`, reviewer);
  const report = await writeReleasePackage(
    fixture.context,
    pack,
    resolve(output),
    {
      sourceFiles: fixture.bundle.snapshot.source_files,
      readAsset: (path) => fixture.media.readAsset(path),
    },
  );
  assert.equal(report.records, fixture.bundle.snapshot.entries.length + 1);
  console.log(
    `TEST ONLY: exported ${report.records} records, including database-only content, Chinese text, private media and literal MDX-shaped text. Nothing activated.`,
  );
} finally {
  await fixture.close();
}
