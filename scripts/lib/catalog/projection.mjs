import assert from "node:assert/strict";
import {
  adapterFor,
  commonFacets,
  kindAdapters,
  registryDefinitions,
} from "./adapters.mjs";
import {
  canonicalJSON,
  contentUUID,
  digest,
  json,
  sha256,
  sorted,
  walkValues,
} from "./codec.mjs";
function linkRole(path) {
  if (/license|terms|notice/i.test(path)) return "rights";
  if (/evidence|source_urls|payload\.game_access\.source_url/i.test(path))
    return "evidence";
  if (/demo|originalUrl|payload\.game_access\.url/i.test(path)) return "demo";
  if (/codeUrl|payload\.source\.url/.test(path)) return "code";
  return "reference"; // A URL alone does not establish official status or support a claim.
}
function sourceReview(data) {
  return Object.fromEntries(
    [
      "verified",
      "reviewed",
      "checked_at",
      "review_status",
      "inspection_scope",
      "execution_validation",
    ]
      .filter((field) => data[field] !== undefined)
      .map((field) => [field, data[field]]),
  );
}

/** Shared projection engine; content-kind differences are isolated behind explicit strategies. */
export function projectSnapshot(
  context,
  archive,
  taxonomy,
  artifacts,
  adapters = kindAdapters,
) {
  const definitions = registryDefinitions(context);
  const registry = context.createRegistry(archive.sources, archive.documents);
  const terms = new Map();
  const entryTerms = [],
    links = [],
    relations = [],
    assetUsages = [],
    translations = [];
  const term = (scheme, value, label = value, controlled = true) => {
    const key = `${scheme}:${value}`;
    const next = { key, scheme, value, label, controlled };
    if (terms.has(key))
      assert.deepEqual(terms.get(key), next, `Conflicting term: ${key}`);
    else terms.set(key, next);
    return key;
  };
  for (const [scheme, values] of Object.entries(taxonomy))
    for (const [value, metadata] of Object.entries(values))
      term(
        scheme,
        value,
        typeof metadata === "string" ? metadata : metadata.label,
      );
  for (const [scheme, labels] of Object.entries({
    "agent-client": archive.sources.agentLabels,
    "agent-kind": archive.sources.agentResourceKinds,
    "testing-kind": archive.sources.testingKinds,
    "testing-use": archive.sources.testingUses,
    "testing-terms": archive.sources.testingTerms,
  }))
    for (const [value, label] of Object.entries(labels))
      term(scheme, value, label);

  const entries = sorted(
    registry.entries.map((entry) => {
      const definition = context.contentKinds[entry.kind];
      assert.ok(definition, `Unregistered content kind: ${entry.kind}`);
      const adapter = adapterFor(entry.kind, adapters);
      const body = json({
        title: entry.title,
        summary: entry.description,
        payload: entry.data,
        attachments: adapter.attachments?.(entry, archive.sources) ?? {},
      });
      const fingerprint = digest(body);
      return {
        key: entry.key,
        kind: entry.kind,
        identifier: entry.id,
        schema_version: definition.schemaVersion,
        canonical_path: entry.url,
        collection_path: entry.collectionUrl,
        owner: definition.owner,
        source_ref: entry.source,
        source_review: sourceReview(entry.data),
        revision_id: contentUUID(
          `${entry.key}\0${definition.schemaVersion}\0${fingerprint}`,
        ),
        fingerprint,
        canonical_body: canonicalJSON(body),
        body,
      };
    }),
    (entry) => entry.key,
  );
  const byKey = new Map(entries.map((entry) => [entry.key, entry]));
  const artifactMap = new Map(artifacts.map((file) => [file.path, file]));
  const relationKeys = new Set(
    definitions.relation_types.map((type) => type.key),
  );
  const usedAssets = new Map();
  for (const entry of entries) {
    const original = registry.byKey(entry.key);
    const adapter = adapterFor(entry.kind, adapters);
    const facets = [
      ...commonFacets(entry.body.payload),
      ...(adapter.facets?.(entry.body.payload) ?? []),
    ];
    const termKeys = facets.map(({ scheme, value, controlled }) => {
      const known = terms.get(`${scheme}:${value}`);
      return term(
        scheme,
        value,
        known?.label ?? value,
        known?.controlled ?? controlled,
      );
    });
    for (const [position, term_key] of [...new Set(termKeys)].entries())
      entryTerms.push({ revision_id: entry.revision_id, term_key, position });
    for (const relation of adapter.relations?.(original, archive.sources) ??
      []) {
      assert.ok(
        byKey.has(relation.target_key),
        `Dangling ${relation.relation}: ${entry.key} -> ${relation.target_key}`,
      );
      assert.ok(
        relationKeys.has(relation.relation),
        `Unregistered relation type: ${relation.relation}`,
      );
      relations.push({ revision_id: entry.revision_id, ...relation });
    }
    walkValues(entry.body, (value, field) => {
      if (typeof value !== "string") return;
      if (/^https?:\/\/\S+$/.test(value)) {
        new URL(value);
        links.push({
          revision_id: entry.revision_id,
          field,
          url: value,
          role:
            entry.kind === "example" &&
            entry.body.payload.demo.kind === "reference" &&
            ["payload.demo.url", "payload.source.url"].includes(field)
              ? "reference"
              : entry.kind === "example" &&
                  entry.body.payload.demo.kind === "source" &&
                  field === "payload.demo.url"
                ? "code"
                : linkRole(field),
        });
      }
      if (
        !/\.(src|asset|poster|previewSrc)$/.test(field) ||
        /^https?:\/\//.test(value)
      )
        return;
      const path = `website/public/${value.replace(/^\//, "")}`;
      const file = artifactMap.get(path);
      assert.ok(file, `Missing local asset: ${entry.key} ${field} -> ${path}`);
      const asset_id = digest({ path, sha256: file.sha256 });
      usedAssets.set(asset_id, {
        id: asset_id,
        path,
        sha256: file.sha256,
        bytes: file.bytes,
      });
      assetUsages.push({ revision_id: entry.revision_id, asset_id, field });
    });
  }
  const localeKeys = new Set(definitions.locales.map((locale) => locale.code));
  for (const [locale, catalog] of Object.entries(
    archive.translation_catalogs,
  )) {
    assert.ok(
      localeKeys.has(locale),
      `Unregistered translation locale: ${locale}`,
    );
    for (const [key, fields] of Object.entries(catalog.content)) {
      const entry = byKey.get(key);
      assert.ok(entry, `Orphan translation: ${key}`);
      for (const [field, value] of Object.entries(fields)) {
        assert.ok(
          context.canTranslate(registry.byKey(key), field),
          `Untranslatable field: ${key}.${field}`,
        );
        const source_hash = catalog.fingerprints[key]?.[field];
        assert.equal(
          source_hash,
          sha256(JSON.stringify(entry.body.payload[field])),
          `Stale translation: ${locale}:${key}.${field}`,
        );
        translations.push({
          revision_id: entry.revision_id,
          locale,
          field,
          value,
          source_hash,
        });
      }
    }
  }
  return {
    ...definitions,
    entries,
    terms: sorted([...terms.values()], (row) => row.key),
    entry_terms: entryTerms,
    links,
    relations,
    assets: sorted([...usedAssets.values()], (row) => row.id),
    asset_usages: assetUsages,
    translations: sorted(
      translations,
      (row) => `${row.revision_id}:${row.locale}:${row.field}`,
    ),
  };
}
