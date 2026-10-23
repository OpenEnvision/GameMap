import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { request as httpRequest } from "node:http";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  writeReleasePackage,
  verifyReleaseDirectory,
} from "../scripts/lib/catalog/release-files.mjs";
import { studioFixture, accounts } from "./helpers/studio-fixture.mjs";
import { sessionCodec } from "../scripts/lib/catalog/auth.mjs";
import { createCatalogWorker } from "../scripts/lib/catalog/worker.mjs";
import { sha256, canonicalJSON } from "../scripts/lib/catalog/codec.mjs";

let fixture,
  editor,
  reviewer,
  admin,
  original,
  draftId,
  replacementId,
  releaseId;
before(async () => {
  fixture = await studioFixture();
  editor = await fixture.login("editor");
  reviewer = await fixture.login("reviewer");
  admin = await fixture.login("admin");
  original = fixture.bundle.snapshot.entries.find(
    (entry) =>
      entry.kind === "resource" &&
      fixture.bundle.snapshot.translations.some(
        (row) =>
          row.revision_id === entry.revision_id && row.field === "detail",
      ),
  );
});
after(async () => {
  await fixture?.close();
});
const translations = () =>
  fixture.bundle.snapshot.translations
    .filter((row) => row.revision_id === original.revision_id)
    .map(({ revision_id: _id, ...row }) => row);
const input = (options = {}) => ({
  kind: "resource",
  identifier: original.identifier,
  schemaVersion: original.schema_version,
  expectedHead: original.revision_id,
  payload: {
    ...original.body.payload,
    detail: original.body.payload.detail + " Studio test fixture only.",
  },
  attachments: original.body.attachments,
  translations: translations(),
  ...options,
});
const decode = async (response, status = 200) => {
  const body = await response.json();
  assert.equal(response.status, status, JSON.stringify(body));
  return body;
};

async function reviewSourceViews() {
  const synced = await decode(
    await fixture.request("/api/documents/sync", {
      session: admin,
      method: "POST",
      body: {},
    }),
  );
  if (synced.ids.length) {
    await decode(
      await fixture.request("/api/review", {
        session: admin,
        method: "POST",
        body: { action: "submit", ids: synced.ids },
      }),
    );
    await decode(
      await fixture.request("/api/review", {
        session: reviewer,
        method: "POST",
        body: {
          action: "approve",
          ids: synced.ids,
          note: "Reviewed deterministic test source views; no reproduction claim",
        },
      }),
    );
  }
  return synced;
}

test("malformed HTTP targets return 400 without killing the Studio process", async () => {
  const address = new URL(fixture.address);
  const result = await new Promise((resolve, reject) => {
    const request = httpRequest(
      {
        hostname: address.hostname,
        port: address.port,
        path: "http://[",
        method: "GET",
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () =>
          resolve({ status: response.statusCode, body: JSON.parse(body) }),
        );
      },
    );
    request.once("error", reject);
    request.end();
  });
  assert.equal(result.status, 400);
  assert.deepEqual(result.body, {
    error: { code: "input", message: "Request contains an invalid URL" },
  });
  await decode(await fixture.request("/api/session"));
});

test("browser sessions are opaque and HttpOnly; Auth tokens stay encrypted in private storage", async () => {
  assert.equal(editor.response.status, 200);
  const cookie = editor.response.headers.get("set-cookie");
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Strict/);
  assert.match(editor.cookie, /^gamemap-studio=[\w-]{43}$/);
  assert.equal(JSON.stringify(editor.body).includes("fixture-access"), false);
  const stored = (
    await fixture.pg.query(
      "select encrypted_payload from catalog.studio_sessions",
    )
  ).rows;
  assert.ok(stored.length >= 3);
  assert.ok(
    stored.every((row) => !row.encrypted_payload.includes("fixture-access")),
  );
  const current = await decode(
    await fixture.request("/api/session", { session: editor }),
  );
  assert.equal(current.user.id, accounts.editor.id);
  assert.equal(current.role, "editor");
  assert.equal(current.accessToken, undefined);
  assert.equal(current.refreshToken, undefined);
  const codec = sessionCodec("a-strong-test-only-secret-that-is-private");
  const sealed = codec.seal({ token: "private" });
  assert.deepEqual(codec.open(sealed), { token: "private" });
  assert.throws(() => codec.open(sealed.slice(0, -5) + "xxxxx"), /Sign in/);
});

test("backend queries are scoped: the web process cannot provision roles, rewrite contracts or activate releases", async () => {
  await assert.rejects(
    fixture.database.system((client) =>
      client.query("select * from catalog.memberships"),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    fixture.database.system((client) =>
      client.query(
        "insert into catalog.content_kinds values('evil', 'Evil', 'database')",
      ),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    fixture.database.system((client) =>
      client.query("update catalog.revisions set state = 'approved'"),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    fixture.database.system((client) =>
      client.query("select catalog.activate_release(null, null, 'browser')"),
    ),
    /permission denied/i,
  );
  const inherited = (
    await fixture.pg.query(
      "select proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='catalog' and has_function_privilege('authenticated',p.oid,'EXECUTE')",
    )
  ).rows;
  assert.deepEqual(
    inherited,
    [],
    "PostgreSQL's global PUBLIC EXECUTE default must not expose private helpers",
  );
  assert.equal(
    (
      await fixture.request("/api/releases/invalid/activate", {
        session: admin,
        method: "POST",
        body: {},
      })
    ).status,
    404,
  );
});

test("anonymous, unprovisioned, cross-origin and missing-CSRF requests cannot edit", async () => {
  assert.equal((await fixture.request("/api/catalog")).status, 401);
  assert.equal((await fixture.login("outsider")).response.status, 403);
  assert.equal(
    (
      await fixture.request("/api/drafts", {
        session: editor,
        method: "POST",
        body: input(),
        headers: { Origin: "https://attacker.invalid" },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await fixture.request("/api/drafts", {
        session: editor,
        method: "POST",
        body: input(),
        headers: { "X-CSRF-Token": "" },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await fixture.request("/api/drafts", {
        session: editor,
        method: "POST",
        body: input(),
        headers: { "X-CSRF-Token": "é".repeat(43) },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await fixture.request("/api/drafts", {
        session: editor,
        method: "POST",
        body: { ...input(), actor_id: accounts.admin.id },
      })
    ).status,
    422,
  );
  const contracts = await decode(
    await fixture.request("/api/contracts", { session: editor }),
  );
  assert.ok(contracts.forms.resource.payload.properties.detail);
  assert.equal(contracts.forms.resource.identityFields[0], "id");
});

test("draft save is real SQL, rejects stale heads and cannot publish stale translations", async () => {
  const created = await decode(
    await fixture.request("/api/drafts", {
      session: editor,
      method: "POST",
      body: input(),
    }),
    201,
  );
  draftId = created.id;
  assert.equal(created.published, false);
  const conflicting = await fixture.request("/api/drafts", {
    session: reviewer,
    method: "POST",
    body: input(),
  });
  assert.equal(conflicting.status, 409);
  const invalid = await decode(
    await fixture.request(`/api/revisions/${draftId}/validate`, {
      session: editor,
      method: "POST",
    }),
    422,
  );
  assert.ok(
    invalid.error.issues.some((issue) =>
      issue.field.includes("translations.zh.detail"),
    ),
  );
  assert.equal(
    Number(
      (
        await fixture.pg.query(
          "select count(*) as n from catalog.validation_receipts where revision_id = $1",
          [draftId],
        )
      ).rows[0].n,
    ),
    0,
  );
  assert.equal(
    (await fixture.pg.query("select release_id from catalog.deployment_state"))
      .rows[0].release_id,
    null,
  );
});

test("explicit translation review enables trusted projections, preview, review and an isolated frozen snapshot", async () => {
  const body = input({ expectedHead: draftId });
  body.translations = body.translations.map((row) =>
    row.field === "detail"
      ? {
          ...row,
          value: "仅用于测试夹具的经过人工核对的译文。",
          source_hash: sha256(JSON.stringify(body.payload.detail)),
        }
      : row,
  );
  replacementId = (
    await decode(
      await fixture.request("/api/drafts", {
        session: editor,
        method: "POST",
        body,
      }),
      201,
    )
  ).id;
  const validated = await decode(
    await fixture.request(`/api/revisions/${replacementId}/validate`, {
      session: editor,
      method: "POST",
    }),
  );
  assert.equal(validated.validated, true);
  assert.equal(validated.preview.title, body.payload.name);
  assert.ok(
    validated.preview.blocks.some(
      (block) => block.value === body.payload.detail,
    ),
  );
  const receipt = (
    await fixture.pg.query(
      "select * from catalog.validation_receipts where revision_id = $1",
      [replacementId],
    )
  ).rows[0];
  assert.equal(receipt.kind, "resource");
  assert.equal(receipt.validator_version, "gamemap.catalog-validator/1");
  assert.equal(
    (
      await fixture.request("/api/releases", {
        session: editor,
        method: "POST",
        body: {},
      })
    ).status,
    403,
  );
  await decode(
    await fixture.request("/api/review", {
      session: editor,
      method: "POST",
      body: { action: "submit", ids: [replacementId] },
    }),
  );
  assert.equal(
    (
      await fixture.request("/api/review", {
        session: editor,
        method: "POST",
        body: {
          action: "approve",
          ids: [replacementId],
          note: "Self approval",
        },
      })
    ).status,
    403,
  );
  await decode(
    await fixture.request("/api/review", {
      session: reviewer,
      method: "POST",
      body: {
        action: "approve",
        ids: [replacementId],
        note: "Test fixture review, not actual source reproduction",
      },
    }),
  );
  const stale = await decode(
    await fixture.request("/api/releases", {
      session: reviewer,
      method: "POST",
      body: {},
    }),
    422,
  );
  assert.ok(
    stale.error.issues.some((issue) =>
      issue.message.includes("Generated guide changed"),
    ),
  );
  assert.ok((await reviewSourceViews()).changed > 0);
  const frozen = await decode(
    await fixture.request("/api/releases", {
      session: reviewer,
      method: "POST",
      body: {},
    }),
    201,
  );
  releaseId = frozen.id;
  assert.equal(frozen.deployed, false);
  assert.equal(frozen.records, fixture.bundle.snapshot.entries.length);
  const exported = await decode(
    await fixture.request(`/api/releases/${releaseId}/export`, {
      session: reviewer,
    }),
  );
  const read = fixture.readRelease(exported);
  assert.equal(
    read.registry.byKey(original.key).data.detail,
    body.payload.detail,
  );
  assert.equal(
    read.build.translation_catalogs.zh.content[original.key].detail,
    body.translations.find((row) => row.field === "detail").value,
  );
  assert.equal(
    read.manifest.entries.some((row) => row.revision_id === draftId),
    false,
  );
  assert.equal(
    (await fixture.pg.query("select release_id from catalog.deployment_state"))
      .rows[0].release_id,
    null,
  );
  assert.equal(
    (
      await fixture.request(`/api/releases/${releaseId}/export`, {
        session: editor,
      })
    ).status,
    403,
  );
  const damaged = { ...exported, context_text: exported.context_text + " " };
  assert.throws(() => fixture.readRelease(damaged), /context digest/);
});

test("invalid payloads and dangling references cannot obtain validation receipts", async () => {
  const body = input({
    expectedHead: replacementId,
    payload: {
      ...input().payload,
      url: "javascript:alert(1)",
      unexpected: true,
    },
  });
  const created = await decode(
    await fixture.request("/api/drafts", {
      session: editor,
      method: "POST",
      body,
    }),
    201,
  );
  const checked = await decode(
    await fixture.request(`/api/revisions/${created.id}/validate`, {
      session: editor,
      method: "POST",
    }),
    422,
  );
  assert.ok(
    checked.error.issues.some((issue) => issue.field === "payload.url"),
  );
  assert.equal(
    Number(
      (
        await fixture.pg.query(
          "select count(*) as n from catalog.validation_receipts where revision_id = $1",
          [created.id],
        )
      ).rows[0].n,
    ),
    0,
  );
  const exported = await decode(
    await fixture.request(`/api/releases/${releaseId}/export`, {
      session: reviewer,
    }),
  );
  assert.equal(
    fixture.readRelease(exported).registry.byKey(original.key).data.url,
    original.body.payload.url,
    "a later invalid draft must not poison frozen content",
  );
});

test("contradictory recording provenance cannot be silently discarded by an adapter", async () => {
  const source = fixture.bundle.snapshot.entries.find(
    (row) => row.kind === "demo",
  );
  const attachments = structuredClone(source.body.attachments);
  attachments.originalRecording.originalUrl =
    "https://example.invalid/not-the-recording";
  const created = await decode(
    await fixture.request("/api/drafts", {
      session: editor,
      method: "POST",
      body: {
        kind: source.kind,
        identifier: source.identifier,
        schemaVersion: 1,
        expectedHead: source.revision_id,
        payload: source.body.payload,
        attachments,
        translations: [],
      },
    }),
    201,
  );
  const rejected = await decode(
    await fixture.request(`/api/revisions/${created.id}/validate`, {
      session: editor,
      method: "POST",
    }),
    422,
  );
  assert.ok(
    rejected.error.issues.some((issue) =>
      issue.message.includes("Attachment provenance"),
    ),
  );
  assert.equal(
    Number(
      (
        await fixture.pg.query(
          "select count(*) as n from catalog.validation_receipts where revision_id=$1",
          [created.id],
        )
      ).rows[0].n,
    ),
    0,
  );
});

test("uploads are fully decoded, EXIF-stripped, content-addressed and never publicly served", async () => {
  const png = await sharp({
    create: { width: 48, height: 32, channels: 3, background: "#658c54" },
  })
    .png()
    .toBuffer();
  const uploaded = await decode(
    await fixture.request("/api/media", {
      session: editor,
      method: "POST",
      file: png,
    }),
    201,
  );
  assert.equal(uploaded.width, 48);
  assert.equal(uploaded.height, 32);
  assert.match(uploaded.path, /^media\/catalog\/[a-f0-9]{64}\.webp$/);
  const again = await decode(
    await fixture.request("/api/media", {
      session: editor,
      method: "POST",
      file: png,
    }),
    201,
  );
  assert.equal(again.path, uploaded.path);
  assert.equal((await fixture.request(uploaded.preview_url)).status, 401);
  const response = await fixture.request(uploaded.preview_url, {
    session: editor,
  });
  assert.equal(response.headers.get("content-type"), "image/webp");
  assert.equal(
    sha256(Buffer.from(await response.arrayBuffer())),
    uploaded.sha256,
  );
  const invalid = await fixture.request("/api/media", {
    session: editor,
    method: "POST",
    file: Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>',
    ),
  });
  assert.equal(invalid.status, 422);
  assert.equal(
    (
      await fixture.request("/api/source-media?path=../.env", {
        session: editor,
      })
    ).status,
    415,
  );
  assert.notEqual(
    (
      await fixture.request("/api/source-media?path=../../secret.webp", {
        session: editor,
      })
    ).status,
    200,
  );
});

test("a new database-owned record and uploaded media survive a complete portable release round trip", async () => {
  const png = await sharp({
    create: { width: 80, height: 40, channels: 3, background: "#658c54" },
  })
    .png()
    .toBuffer();
  const asset = await decode(
    await fixture.request("/api/media", {
      session: editor,
      method: "POST",
      file: png,
    }),
    201,
  );
  const payload = {
    ...original.body.payload,
    id: "studio-media-fixture",
    name: "Studio media fixture",
    url: "https://example.invalid/studio-media-fixture",
  };
  const attachments = {
    identity: {
      organization: "Test fixture",
      kind: "creator",
      asset: asset.path,
      sourceUrl: payload.url,
      logoSourceUrl: payload.url,
      notes: "Isolated test fixture; not an actual verified project identity",
      sha256: asset.sha256,
    },
  };
  const created = await decode(
    await fixture.request("/api/drafts", {
      session: editor,
      method: "POST",
      body: {
        kind: "resource",
        identifier: payload.id,
        schemaVersion: 1,
        expectedHead: null,
        payload,
        attachments,
        translations: [],
      },
    }),
    201,
  );
  await decode(
    await fixture.request(`/api/revisions/${created.id}/validate`, {
      session: editor,
      method: "POST",
    }),
  );
  await decode(
    await fixture.request("/api/review", {
      session: editor,
      method: "POST",
      body: { action: "submit", ids: [created.id] },
    }),
  );
  await decode(
    await fixture.request("/api/review", {
      session: reviewer,
      method: "POST",
      body: {
        action: "approve",
        ids: [created.id],
        note: "Isolated fixture, not real external-source review",
      },
    }),
  );
  await reviewSourceViews();
  const frozen = await decode(
    await fixture.request("/api/releases", {
      session: reviewer,
      method: "POST",
      body: {},
    }),
    201,
  );
  const pack = await decode(
    await fixture.request(`/api/releases/${frozen.id}/export`, {
      session: reviewer,
    }),
  );
  assert.equal(
    fixture.readRelease(pack).sources.identities[payload.id].asset,
    asset.path,
  );
  const directory = await mkdtemp(join(tmpdir(), "gamemap-release-files-"));
  try {
    const output = join(directory, "package");
    const options = {
      sourceFiles: fixture.bundle.snapshot.source_files,
      readAsset: (path) => fixture.media.readAsset(path),
    };
    const report = await writeReleasePackage(
      fixture.context,
      pack,
      output,
      options,
    );
    assert.equal(report.records, fixture.bundle.snapshot.entries.length + 1);
    await verifyReleaseDirectory(fixture.context, output, options.sourceFiles);
    await assert.rejects(
      writeReleasePackage(fixture.context, pack, output, options),
      /EEXIST/,
    );
    const file = join(output, "files/website/public", asset.path);
    const bytes = await readFile(file);
    bytes[0] ^= 1;
    await writeFile(file, bytes);
    await assert.rejects(
      verifyReleaseDirectory(fixture.context, output, options.sourceFiles),
      (problem) =>
        problem.name === "ContentValidationError" &&
        problem.issues.some(
          (issue) =>
            issue.key === `resource:${payload.id}` &&
            issue.message.includes("Asset verification failed"),
        ),
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("concurrent token refresh is serialized and keeps opaque cookies and CSRF stable", async () => {
  const codec = sessionCodec("test-fixture-secret-never-used-in-production");
  const row = (
    await fixture.pg.query(
      "select * from catalog.studio_sessions where user_id = $1",
      [accounts.editor.id],
    )
  ).rows[0];
  const value = codec.open(row.encrypted_payload);
  value.expiresAt = Date.now() - 1000;
  await fixture.pg.query(
    "update catalog.studio_sessions set encrypted_payload = $2 where id_hash = $1",
    [row.id_hash, codec.seal(value)],
  );
  const refresh = fixture.auth.refresh;
  let count = 0;
  fixture.auth.refresh = async (token) => {
    count++;
    await new Promise((done) => setTimeout(done, 25));
    return refresh(token);
  };
  const responses = await Promise.all(
    Array.from({ length: 5 }, () =>
      fixture.request("/api/session", { session: editor }),
    ),
  );
  for (const response of responses) {
    const body = await decode(response);
    assert.equal(body.csrf, editor.csrf);
    assert.equal(body.user.id, accounts.editor.id);
  }
  assert.equal(count, 1);
});

test("Git synchronization is administrator-only and cannot turn source records into automatic approvals", async () => {
  assert.equal(
    (
      await fixture.request("/api/documents/sync", {
        session: editor,
        method: "POST",
        body: {},
      })
    ).status,
    403,
  );
  const synced = await decode(
    await fixture.request("/api/documents/sync", {
      session: admin,
      method: "POST",
      body: {},
    }),
  );
  assert.equal(synced.changed, 0);
  assert.equal(synced.published, false);
});

test("Git source metadata updates append validated drafts under the restricted worker role", async () => {
  const document = fixture.context.registry.all("document")[0];
  const payload = {
    ...document.data,
    description: document.data.description + " Test configuration revision.",
  };
  const next = { ...document, description: payload.description, data: payload };
  const context = {
    ...fixture.context,
    registry: {
      ...fixture.context.registry,
      all: (kind) =>
        kind === "document" ? [next] : fixture.context.registry.all(kind),
    },
  };
  const worker = createCatalogWorker(fixture.database, context, {
    readAsset: (path) => fixture.media.readAsset(path),
  });
  const result = await worker.syncDocuments(accounts.admin.id);
  assert.equal(result.changed, 1);
  const revision = (
    await fixture.pg.query("select * from catalog.revisions where id=$1", [
      result.ids[0],
    ])
  ).rows[0];
  assert.equal(revision.state, "draft");
  assert.equal(revision.reviewed_by, null);
  assert.equal(revision.created_by, accounts.admin.id);
  assert.equal(revision.body.payload.description, payload.description);
  await decode(
    await fixture.request("/api/review", {
      session: admin,
      method: "POST",
      body: { action: "submit", ids: [revision.id] },
    }),
  );
  for (const action of ["approve", "reject"]) {
    const denied = await fixture.request("/api/review", {
      session: admin,
      method: "POST",
      body: {
        action,
        ids: [revision.id],
        note: "Must not self-review a synchronized revision",
      },
    });
    assert.equal(denied.status, 403);
  }
  await decode(
    await fixture.request("/api/review", {
      session: reviewer,
      method: "POST",
      body: {
        action: "approve",
        ids: [revision.id],
        note: "Independent fixture review of synchronized metadata",
      },
    }),
  );
  assert.equal(
    Number(
      (
        await fixture.pg.query(
          "select count(*) as n from catalog.validation_receipts where revision_id=$1",
          [revision.id],
        )
      ).rows[0].n,
    ),
    1,
  );
  assert.equal(
    (await fixture.pg.query("select release_id from catalog.deployment_state"))
      .rows[0].release_id,
    null,
  );
});

test("trusted workers bind each revision to its own installed schema version, not the active kind's key", async () => {
  await fixture.pg.exec(
    "insert into catalog.content_schemas(kind,version,validator_key) values('resource',2,'test.resource-v2')",
  );
  const payload = {
    ...original.body.payload,
    id: "studio-version-fixture",
    name: "Version contract fixture",
    url: "https://example.invalid/versions",
    links: [],
  };
  const attachments = {
    identity: {
      organization: "Test fixture",
      kind: "creator",
      asset: null,
      sha256: null,
      sourceUrl: payload.url,
      logoSourceUrl: null,
      notes: "Isolated versioning fixture, not an actual verified resource",
    },
  };
  const first = await decode(
    await fixture.request("/api/drafts", {
      session: editor,
      method: "POST",
      body: {
        kind: "resource",
        identifier: payload.id,
        schemaVersion: 1,
        expectedHead: null,
        payload,
        attachments,
        translations: [],
      },
    }),
    201,
  );
  const base = fixture.context.versionedContracts.resource[1];
  const context = {
    ...fixture.context,
    contentKinds: {
      ...fixture.context.contentKinds,
      resource: {
        ...fixture.context.contentKinds.resource,
        schemaVersion: 2,
        validatorKey: "test.resource-v2",
      },
    },
    versionedContracts: {
      ...fixture.context.versionedContracts,
      resource: { 1: base, 2: { ...base, validatorKey: "test.resource-v2" } },
    },
  };
  const worker = createCatalogWorker(fixture.database, context, {
    readAsset: (path) => fixture.media.readAsset(path),
  });
  await worker.validate(accounts.editor.id, first.id);
  const second = (
    await fixture.database.user(accounts.editor.id, (client) =>
      client.query(
        "select public.catalog_save_draft($1,$2,$3,$4,$5,$6,$7) as id",
        [
          "resource",
          payload.id,
          2,
          context.url.resource(payload.id),
          original.collection_path,
          canonicalJSON({
            title: payload.name,
            summary: payload.summary,
            payload,
            attachments,
          }),
          first.id,
        ],
      ),
    )
  ).rows[0].id;
  await worker.validate(accounts.editor.id, second);
  const receipts = (
    await fixture.pg.query(
      "select schema_version,validator_key from catalog.validation_receipts where revision_id in ($1,$2) order by schema_version",
      [first.id, second],
    )
  ).rows;
  assert.deepEqual(receipts, [
    { schema_version: 1, validator_key: base.validatorKey },
    { schema_version: 2, validator_key: "test.resource-v2" },
  ]);
});

test("membership revocation and logout invalidate protected reads immediately", async () => {
  await fixture.pg.query("delete from catalog.memberships where user_id = $1", [
    accounts.editor.id,
  ]);
  const revoked = await fixture.request("/api/catalog", { session: editor });
  assert.equal(revoked.status, 403);
  assert.match(revoked.headers.get("set-cookie"), /Max-Age=0/);
  await decode(
    await fixture.request("/api/logout", { session: admin, method: "POST" }),
  );
  assert.equal(
    (await fixture.request("/api/catalog", { session: admin })).status,
    401,
  );
});
