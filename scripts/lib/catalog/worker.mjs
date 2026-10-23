import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import { root } from "../documents.mjs";
import { first } from "./database.mjs";
import { canonicalJSON, json, sha256, sorted, readArtifact } from "./codec.mjs";
import { validateSelection, readReleaseData } from "./validation.mjs";
import {
  renderGeneratedDocuments,
  resolveDocumentBody,
} from "./generated-documents.mjs";

const validatorVersion = "gamemap.catalog-validator/1";
const toRecord = (row) => ({
  key: row.key,
  kind: row.kind,
  identifier: row.identifier,
  owner: row.owner,
  canonical_path: row.canonical_path,
  collection_path: row.collection_path,
  schema_version: row.schema_version,
  revision_id: row.id,
  fingerprint: row.content_digest,
  body: row.body,
});
const rowKey = (row) => canonicalJSON(row);
const sameRows = (a, b) =>
  canonicalJSON(sorted([...a], rowKey)) ===
  canonicalJSON(sorted([...b], rowKey));
const projectionTables = {
  entry_terms: [
    "revision_terms",
    "revision_id uuid, term_key text, position integer",
  ],
  links: [
    "revision_links",
    "revision_id uuid, field text, url text, role text",
  ],
  relations: [
    "revision_relations",
    "revision_id uuid, target_key text, relation text, field text",
  ],
  asset_usages: [
    "revision_assets",
    "revision_id uuid, asset_id text, field text",
  ],
  translations: [
    "translations",
    "revision_id uuid, locale text, field text, value jsonb, source_hash text",
  ],
};

export function createCatalogWorker(
  database,
  context,
  { sourceFiles = [], readAsset } = {},
) {
  const configuration = context.configurationFromSources(
    context.sources,
    context.registry.entries,
  );
  const options = { configuration, readAsset };
  async function authorize(userId, roles) {
    const role = await database.user(
      userId,
      async (client) =>
        (await first(client, "select public.catalog_role() as role")).role,
    );
    if (!roles.includes(role)) {
      const error = new Error("Catalog permission denied");
      error.code = "42501";
      throw error;
    }
    return role;
  }
  async function selection(client, { candidate, approved = false, ids } = {}) {
    const params = [candidate ?? null, approved, ids ?? null];
    const rows = (
      await client.query(
        `select e.key, e.kind, e.identifier, e.owner, e.canonical_path, e.collection_path,
      r.* from catalog.entries e join lateral (
        select r.* from catalog.revisions r where r.entry_key = e.key and
          (case when $3::uuid[] is not null then r.id = any($3::uuid[])
           when $2::boolean then r.state = 'approved'
           else r.id = $1::uuid or exists(select 1 from catalog.validation_receipts v where v.revision_id = r.id) end)
        order by (r.id = $1::uuid) desc nulls last, (r.state = 'approved') desc, r.sequence desc limit 1
      ) r on true order by e.key`,
        params,
      )
    ).rows;
    if (candidate && !rows.some((row) => row.id === candidate))
      throw new Error("Revision was not found");
    if (ids && rows.length !== new Set(ids).size)
      throw new Error("Missing or duplicate release revisions");
    const records = rows.map(toRecord);
    const translations = records.length
      ? (
          await client.query(
            "select * from catalog.translations where revision_id = any($1::uuid[]) order by revision_id, locale, field",
            [records.map((record) => record.revision_id)],
          )
        ).rows
      : [];
    return { records, translations };
  }
  async function commitProjection(
    client,
    revisionId,
    expected,
    projection,
    originalTranslations,
    actor,
  ) {
    const row = await first(
      client,
      "select * from catalog.revisions where id = $1 for update",
      [revisionId],
    );
    assert.equal(
      row.content_digest,
      expected,
      "Revision changed during validation",
    );
    const handler = context.versionedContracts[row.kind]?.[row.schema_version];
    assert.ok(
      handler?.validatorKey,
      "No trusted validator is installed for this exact schema version",
    );
    const receipt = await first(
      client,
      "select * from catalog.validation_receipts where revision_id = $1",
      [revisionId],
    );
    if (receipt)
      assert.equal(
        receipt.validator_key,
        handler.validatorKey,
        "Receipt validator differs from the installed schema handler",
      );
    const currentTranslations = (
      await client.query(
        "select * from catalog.translations where revision_id = $1",
        [revisionId],
      )
    ).rows;
    if (!sameRows(currentTranslations, originalTranslations)) {
      const error = new Error("Translations changed during validation; retry");
      error.code = "40001";
      throw error;
    }
    for (const [key, [table]] of Object.entries(projectionTables)) {
      const rows = projection[key].filter(
        (item) => item.revision_id === revisionId,
      );
      if (receipt) {
        const current = (
          await client.query(
            `select * from catalog.${table} where revision_id = $1`,
            [revisionId],
          )
        ).rows;
        assert.ok(
          sameRows(current, rows),
          `Validated ${key} differ; save a successor revision`,
        );
      }
    }
    if (!receipt) {
      const termKeys = projection.entry_terms
        .filter((row) => row.revision_id === revisionId)
        .map((row) => row.term_key);
      for (const term of projection.terms.filter((row) =>
        termKeys.includes(row.key),
      )) {
        await client.query(
          "insert into catalog.terms(key, scheme, value, label, controlled) values($1, $2, $3, $4, $5) on conflict do nothing",
          [term.key, term.scheme, term.value, term.label, term.controlled],
        );
        assert.deepEqual(
          await first(client, "select * from catalog.terms where key = $1", [
            term.key,
          ]),
          term,
          "Vocabulary conflict; migrate the registered term first",
        );
      }
      const assetIds = projection.asset_usages
        .filter((row) => row.revision_id === revisionId)
        .map((row) => row.asset_id);
      for (const asset of projection.assets.filter((row) =>
        assetIds.includes(row.id),
      )) {
        await client.query(
          "insert into catalog.assets(id, path, sha256, bytes) values($1, $2, $3, $4) on conflict do nothing",
          [asset.id, asset.path, asset.sha256, asset.bytes],
        );
        const stored = await first(
          client,
          "select * from catalog.assets where id = $1",
          [asset.id],
        );
        assert.deepEqual(
          { ...stored, bytes: Number(stored.bytes) },
          asset,
          "Asset identity conflict",
        );
      }
      for (const [key, [table, shape]] of Object.entries(projectionTables)) {
        await client.query(
          `delete from catalog.${table} where revision_id = $1`,
          [revisionId],
        );
        const rows = projection[key].filter(
          (row) => row.revision_id === revisionId,
        );
        if (rows.length)
          await client.query(
            `insert into catalog.${table} select * from jsonb_to_recordset($1::jsonb) as x(${shape})`,
            [JSON.stringify(rows)],
          );
      }
      await client.query(
        "select catalog.record_validation($1, $2, $3, $4, $5)",
        [
          revisionId,
          expected,
          handler.validatorKey,
          validatorVersion,
          `studio:${randomUUID()}`,
        ],
      );
    }
    await client.query(
      "insert into catalog.audit_events(actor_id, action, entity, detail) values($1, 'validate', $2, $3::jsonb)",
      [
        actor,
        revisionId,
        JSON.stringify({ validator: validatorVersion, digest: expected }),
      ],
    );
  }
  async function validateRevision(userId, revisionId) {
    await authorize(userId, ["editor", "reviewer", "admin"]);
    const input = await database.system((client) =>
      selection(client, { candidate: revisionId }),
    );
    const revision = input.records.find(
      (record) => record.revision_id === revisionId,
    );
    const result = await validateSelection(
      context,
      input.records,
      input.translations,
      {
        ...options,
        checkDocuments: revision.kind === "document" ? [revision.key] : false,
      },
    );
    await database.system((client) =>
      commitProjection(
        client,
        revisionId,
        revision.fingerprint,
        result.projection,
        input.translations.filter((row) => row.revision_id === revisionId),
        userId,
      ),
    );
    return {
      validated: true,
      digest: revision.fingerprint,
      note: result.note,
      preview: {
        ...json(result.registry.byKey(revision.key)),
        ...(revision.kind === "document"
          ? { markdown: result.documentBodies[revision.body.payload.source] }
          : {}),
      },
    };
  }
  return {
    authorize,
    validate: validateRevision,
    async syncDocuments(userId) {
      await authorize(userId, ["admin"]);
      const input = await database.system((client) =>
        selection(client, { approved: true }),
      );
      const approvedSources = context.assembleSources(
        input.records,
        configuration,
      ).sources;
      const generated = renderGeneratedDocuments(approvedSources);
      const knownSources = new Set(
        context.documents.map((document) => document.source),
      );
      const documents = [];
      for (const entry of context.registry.all("document")) {
        const body = await resolveDocumentBody(entry.data, generated, {
          knownSources,
          readSource: (path) => readArtifact(root, path),
          verify: entry.data.sourceMode === "git",
        });
        documents.push({
          ...entry,
          data: { ...entry.data, sourceHash: sha256(body) },
        });
      }
      const changed = await database.system(async (client) => {
        // The database attributes every worker-created Git revision to this verified admin.
        await client.query(
          "select set_config('request.jwt.claim.sub', $1, true), set_config('request.jwt.claims', $2, true)",
          [userId, JSON.stringify({ sub: userId, role: "authenticated" })],
        );
        const ids = [];
        for (const entry of documents) {
          await client.query(
            "select pg_advisory_xact_lock(hashtextextended($1,0))",
            [entry.key],
          );
          let existing = await first(
            client,
            "select * from catalog.entries where key = $1 for update",
            [entry.key],
          );
          if (!existing)
            existing = await first(
              client,
              "insert into catalog.entries(key,kind,identifier,canonical_path,collection_path,owner) values($1,'document',$2,$3,$4,'git') returning *",
              [entry.key, entry.id, entry.url, entry.collectionUrl],
            );
          assert.equal(
            existing.canonical_path,
            entry.url,
            "A Git document cannot silently change its canonical address",
          );
          const body = {
              title: entry.title,
              summary: entry.description,
              payload: entry.data,
              attachments: {},
            },
            text = canonicalJSON(body);
          const current = existing.head_revision_id
            ? await first(
                client,
                "select content_digest from catalog.revisions where id = $1",
                [existing.head_revision_id],
              )
            : null;
          if (current?.content_digest === sha256(text)) continue;
          const revision = await first(
            client,
            "insert into catalog.revisions(entry_key,kind,schema_version,parent_id,body_text,source_ref) values($1,'document',$2,$3,$4,$5) returning id",
            [
              entry.key,
              context.contentKinds.document.schemaVersion,
              existing.head_revision_id,
              text,
              entry.data.sourceMode === "generated"
                ? `generator:${entry.data.generatorKey}`
                : `git:${entry.data.source}`,
            ],
          );
          await client.query(
            "update catalog.entries set head_revision_id = $2 where key = $1",
            [entry.key, revision.id],
          );
          await client.query(
            "insert into catalog.audit_events(actor_id,action,entity) values($1,'sync-git-document',$2)",
            [userId, revision.id],
          );
          ids.push(revision.id);
        }
        return ids;
      });
      for (const id of changed) await validateRevision(userId, id);
      return {
        changed: changed.length,
        ids: changed,
        state: "draft",
        published: false,
      };
    },
    async freeze(userId, ids) {
      await authorize(userId, ["reviewer", "admin"]);
      const input = await database.system((client) =>
        selection(client, { approved: true, ids }),
      );
      if (!input.records.length)
        throw new Error("No approved content is available");
      const result = await validateSelection(
        context,
        input.records,
        input.translations,
        { ...options, checkDocuments: true },
      );
      const sourceHashes = [];
      for (const file of sourceFiles) {
        assert.equal(
          sha256(await readArtifact(root, file.path)),
          file.sha256,
          `Source changed; restart Studio before freezing: ${file.path}`,
        );
        sourceHashes.push({ path: file.path, sha256: file.sha256 });
      }
      const gitCommit = execFileSync("git", ["rev-parse", "HEAD"], {
        cwd: root,
        encoding: "utf8",
      }).trim();
      const dirty = Boolean(
        execFileSync(
          "git",
          ["status", "--porcelain=v1", "--untracked-files=all"],
          { cwd: root, encoding: "utf8" },
        ).trim(),
      );
      if (process.env.NODE_ENV === "production" && dirty)
        throw new Error(
          "Commit and verify the source checkout before freezing a production release",
        );
      const build = {
        source_dirty: dirty,
        environment:
          process.env.NODE_ENV === "production" ? "production" : "local",
        format: "gamemap.build-context",
        version: 1,
        git_commit: gitCommit,
        configuration,
        source_hashes: sourceHashes,
        document_bodies: result.documentBodies,
        selected_revisions: input.records.map((record) => ({
          id: record.revision_id,
          digest: record.fingerprint,
          schema_version: record.schema_version,
        })),
        assets: result.projection.assets,
        translation_catalogs: result.catalogs,
      };
      // One transaction enforces the reviewer's database permissions and attaches the immutable
      // trusted context before returning. A partially prepared release is never activated.
      return database.system(async (client) => {
        await client.query("set local role authenticated");
        await client.query(
          "select set_config('request.jwt.claim.sub', $1, true), set_config('request.jwt.claims', $2, true)",
          [userId, JSON.stringify({ sub: userId, role: "authenticated" })],
        );
        const role = await first(
          client,
          "select public.catalog_role() as role",
        );
        assert.ok(
          ["reviewer", "admin"].includes(role.role),
          "Reviewer permissions changed",
        );
        const { id } = await first(
          client,
          "select public.catalog_freeze_release($1::uuid[], $2) as id",
          [input.records.map((record) => record.revision_id), gitCommit],
        );
        const text = canonicalJSON(build);
        await client.query("set local role catalog_backend");
        await client.query(
          "select catalog.attach_release_context($1, $2, $3)",
          [id, text, sha256(text)],
        );
        return {
          id,
          state: "frozen",
          deployed: false,
          records: input.records.length,
          note: "Frozen for build and review; nothing has been deployed or activated.",
        };
      });
    },
    async releases(userId) {
      await authorize(userId, ["editor", "reviewer", "admin"]);
      return database.system(
        async (client) =>
          (
            await client.query(`select r.id, r.digest, r.created_at,
        (select count(*)::integer from catalog.release_items i where i.release_id = r.id) as records,
        exists(select 1 from catalog.release_contexts c where c.release_id = r.id) as prepared,
        exists(select 1 from catalog.deployment_state d where d.release_id = r.id) as active
        from catalog.releases r order by r.created_at desc, r.id desc limit 100`)
          ).rows,
      );
    },
    async exportRelease(userId, id) {
      await authorize(userId, ["reviewer", "admin"]);
      const release = await database.system((client) =>
        first(
          client,
          `select r.id, r.manifest_text,
        r.digest as manifest_digest, c.context_text, c.digest as context_digest from catalog.releases r
        join catalog.release_contexts c on c.release_id = r.id where r.id = $1`,
          [id],
        ),
      );
      if (!release) throw new Error("Prepared release was not found");
      const pack = {
        format: "gamemap.release-package",
        version: 1,
        ...release,
      };
      readReleaseData(context, pack);
      return pack;
    },
  };
}
