import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { root, readDocuments } from "../documents.mjs";
import { writeIfChanged } from "../files.mjs";
import { canonicalJSON, safePath, sha256, walkValues } from "./codec.mjs";
import { assertReleaseRealm } from "./release-realm.mjs";
import { renderGeneratedDocuments } from "./generated-documents.mjs";
import { siteDownloads } from "./site-files.mjs";
import {
  developmentInputPath,
  developmentPublicDirectory,
} from "./site-input.mjs";

/** Read one working selection, including draft translations, without changing workflow state.
 * Each entry shows its latest revision that reviewers have not rejected. Resources created by the
 * local Supabase acceptance runner are excluded, as they are from publication cohorts. */
export async function readWorkingCatalog(database, realm) {
  assert.equal(
    realm.environment,
    "local",
    "Working previews require a local catalog",
  );
  return database.system(async (client) => {
    await client.query(
      "set transaction isolation level repeatable read, read only",
    );
    const metadata = (
      await client.query(`select
      catalog.current_release_realm() as realm,
      catalog.source_configuration() as configuration`)
    ).rows[0];
    assertReleaseRealm(metadata.realm, realm);
    assert.ok(
      metadata.configuration,
      "Initialize the local catalog with npm run local:setup",
    );
    const records = (
      await client.query(`select e.key, e.kind, e.identifier, e.owner,
      e.canonical_path, e.collection_path, r.schema_version, r.id as revision_id,
      r.content_digest as fingerprint, r.body, r.state
      from catalog.entries e join lateral (
        select r.* from catalog.revisions r
        where r.entry_key = e.key and r.state <> 'rejected'
        order by r.sequence desc limit 1
      ) r on true
      where e.owner = 'database'
        and not (e.kind = 'resource' and starts_with(e.identifier, 'local-runtime-fixture-'))
      order by e.key`)
    ).rows;
    const translations = (
      await client.query(
        `select revision_id, locale, field, value, source_hash
        from catalog.translations where revision_id = any($1::uuid[])
        order by revision_id, locale, field`,
        [records.map((record) => record.revision_id)],
      )
    ).rows;
    assert.ok(
      records.length,
      "The local catalog has no structured content; run npm run local:setup",
    );
    return { ...metadata, records, translations };
  });
}

/** Database rows own structured content; current Git prose and trusted generators own documents. */
export async function createWorkingInput(
  runtime,
  data,
  {
    documents,
    readDocument = (path) => readFile(resolve(root, path), "utf8"),
  } = {},
) {
  documents ??= await readDocuments();
  for (const record of data.records) {
    const contract =
      runtime.versionedContracts[record.kind]?.[record.schema_version];
    assert.ok(
      contract,
      `Unsupported working revision: ${record.key} v${record.schema_version}`,
    );
    for (const field of ["payload", "attachments"]) {
      const parsed = contract[field].safeParse(record.body[field]);
      assert.ok(
        parsed.success,
        `${record.key}.${field}: ${parsed.error?.message}`,
      );
    }
  }
  const { sources } = runtime.assembleSources(data.records, data.configuration);
  const generated = renderGeneratedDocuments(sources);
  const changedGuides = new Set();
  for (const document of documents.filter(
    (row) => row.sourceMode === "generated",
  ))
    if (generated[document.source] !== (await readDocument(document.source)))
      changedGuides.add(document.slug);
  const fallbackDocuments = documents
    .filter(
      (document) =>
        document.slug.startsWith("zh/") &&
        changedGuides.has(document.slug.slice(3)),
    )
    .map((document) => document.slug);
  const documentBodies = {};
  const currentDocuments = await Promise.all(
    documents
      .filter((document) => !fallbackDocuments.includes(document.slug))
      .map(async (document) => {
        const body =
          document.sourceMode === "generated"
            ? generated[document.source]
            : await readDocument(document.source);
        assert.equal(
          typeof body,
          "string",
          `Missing document body: ${document.source}`,
        );
        documentBodies[document.source] = body;
        return { ...document, sourceHash: sha256(body) };
      }),
  );
  const registry = runtime.createRegistry(sources, currentDocuments);
  runtime.assertRegistryCoverage(sources, currentDocuments, registry);
  const byRevision = new Map(
    data.records.map((record) => [record.revision_id, record]),
  );
  const catalogs = {};
  for (const row of data.translations) {
    const record = byRevision.get(row.revision_id);
    assert.ok(record, "Translation is outside the working selection");
    const catalog = (catalogs[row.locale] ??= {
      content: {},
      fingerprints: {},
    });
    (catalog.content[record.key] ??= {})[row.field] = row.value;
    (catalog.fingerprints[record.key] ??= {})[row.field] = row.source_hash;
  }
  return {
    format: "gamemap.development-input",
    version: 1,
    source: {
      mode: "database",
      state: "working",
      development: true,
      realm: data.realm,
    },
    records: data.records,
    sources,
    documents: currentDocuments,
    documentBodies,
    catalogs,
    fallbackDocuments,
  };
}

/** Stage only reader-facing downloads and referenced uploads; configuration and credentials stay private. */
export async function stageWorkingInput(
  input,
  readAsset,
  {
    inputPath = developmentInputPath,
    publicDirectory = developmentPublicDirectory,
  } = {},
) {
  const outputs = await siteDownloads(input, input.documentBodies, root, {
    readAsset,
  });
  const uploads = new Set();
  for (const record of input.records)
    walkValues(record.body, (value, field) => {
      if (
        typeof value === "string" &&
        /\.(src|asset|poster|previewSrc)$/.test(field)
      ) {
        const path = value.replace(/^\//, "");
        if (path.startsWith("media/catalog/")) uploads.add(path);
      }
    });
  for (const path of uploads)
    outputs[path] = await readAsset(`website/public/${path}`);
  for (const [path, bytes] of Object.entries(outputs))
    await writeIfChanged(safePath(publicDirectory, path), bytes);
  input.publicPaths = Object.keys(outputs).sort();
  await writeIfChanged(inputPath, canonicalJSON(input) + "\n");
  return input;
}
