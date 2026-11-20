import { isDeepStrictEqual } from "node:util";
import { canonicalJSON, sha256 } from "./codec.mjs";
import { canonicalAddress, collectionAddress } from "./adapters.mjs";

function translationsByRevision(rows) {
  const revisions = new Map();
  for (const row of rows) {
    if (!revisions.has(row.revision_id)) revisions.set(row.revision_id, {});
    revisions.get(row.revision_id)[`${row.locale}:${row.field}`] = {
      value: row.value,
      source_hash: row.source_hash,
    };
  }
  return revisions;
}

/** One comparable value per payload field, attachment and translated field. */
export function recordFields(body, translations = {}) {
  const fields = {};
  for (const [name, value] of Object.entries(body.payload))
    fields[`payload.${name}`] = value;
  for (const [name, value] of Object.entries(body.attachments))
    fields[`attachments.${name}`] = value;
  for (const [name, value] of Object.entries(translations))
    fields[`translations.${name}`] = value;
  return fields;
}

function splitFields(fields) {
  const payload = {},
    attachments = {},
    translations = [];
  for (const [name, value] of Object.entries(fields)) {
    const separator = name.indexOf(".");
    const part = name.slice(0, separator),
      rest = name.slice(separator + 1);
    if (part === "payload") payload[rest] = value;
    else if (part === "attachments") attachments[rest] = value;
    else {
      const colon = rest.indexOf(":");
      translations.push({
        locale: rest.slice(0, colon),
        field: rest.slice(colon + 1),
        ...value,
      });
    }
  }
  return { payload, attachments, translations };
}

function changedFields(before, after) {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])]
    .sort()
    .filter((name) => !isDeepStrictEqual(before[name], after[name]));
}

/** Database edits win, Git edits fill fields the database never changed, and a field
 * changed differently on both sides is a conflict. */
export function mergeFields(base, database, git) {
  const merged = {},
    conflicts = [];
  for (const name of [
    ...new Set([
      ...Object.keys(base),
      ...Object.keys(database),
      ...Object.keys(git),
    ]),
  ].sort()) {
    const [b, d, g] = [base[name], database[name], git[name]];
    let value;
    if (isDeepStrictEqual(d, g) || isDeepStrictEqual(g, b)) value = d;
    else if (isDeepStrictEqual(d, b)) value = g;
    else {
      conflicts.push({
        field: name,
        base: b ?? null,
        database: d ?? null,
        git: g ?? null,
      });
      continue;
    }
    if (value !== undefined) merged[name] = value;
  }
  return { merged, conflicts };
}

/** The Git version this database revision last incorporated: a recorded merge in its
 * ancestry, otherwise the record's first revision. Records shared with Git entered the
 * catalog as copies of their Git version, by import or by a Studio save. */
function mergeBase(revision, revisions, recorded) {
  const ancestry = [];
  let id = revision;
  while (id && revisions?.has(id) && !ancestry.includes(id)) {
    ancestry.push(id);
    id = revisions.get(id).parent_id;
  }
  if (recorded && ancestry.includes(recorded.revision)) return recorded.fields;
  return revisions?.get(ancestry.at(-1))?.fields;
}

/** Read revision ancestry for three-way merging. */
export async function readMergeHistory(database, keys) {
  return database.system(async (client) => {
    await client.query(
      "set transaction isolation level repeatable read, read only",
    );
    const revisions = (
      await client.query(
        `select id, entry_key, parent_id, body from catalog.revisions
        where entry_key = any($1::text[])`,
        [keys],
      )
    ).rows;
    const translations = translationsByRevision(
      (
        await client.query(
          `select revision_id, locale, field, value, source_hash
          from catalog.translations where revision_id = any($1::uuid[])`,
          [revisions.map((row) => row.id)],
        )
      ).rows,
    );
    const histories = new Map();
    for (const row of revisions) {
      if (!histories.has(row.entry_key))
        histories.set(row.entry_key, new Map());
      histories.get(row.entry_key).set(row.id, {
        parent_id: row.parent_id,
        fields: recordFields(row.body, translations.get(row.id)),
      });
    }
    const heads = new Map(
      (
        await client.query("select key, head_revision_id from catalog.entries")
      ).rows.map((row) => [row.key, row.head_revision_id]),
    );
    return { histories, heads };
  });
}

/** Missing Git records are imported; changed records are merged three ways. */
export function planSourceImport(
  snapshot,
  current,
  { histories = new Map(), heads = new Map(), bases = {} } = {},
) {
  const records = snapshot.entries.filter(
    (record) => record.owner === "database",
  );
  const existing = new Map(
    current.records.map((record) => [record.key, record]),
  );
  const incomingKeys = new Set(records.map((record) => record.key));
  const gitTranslations = translationsByRevision(snapshot.translations);
  const databaseTranslations = translationsByRevision(current.translations);
  const additions = [],
    merges = [],
    conflicts = [],
    unchanged = [];
  for (const git of records) {
    const stored = existing.get(git.key);
    const gitFields = recordFields(
      git.body,
      gitTranslations.get(git.revision_id),
    );
    if (!stored && heads.has(git.key)) {
      conflicts.push({
        key: git.key,
        revision: heads.get(git.key),
        reason: "Every database revision of this record was rejected",
        fields: [],
      });
      continue;
    }
    if (!stored) {
      additions.push({
        key: git.key,
        revision: git.revision_id,
        fields: gitFields,
      });
      continue;
    }
    const databaseFields = recordFields(
      stored.body,
      databaseTranslations.get(stored.revision_id),
    );
    const incorporated = {
      key: git.key,
      revision: stored.revision_id,
      fields: gitFields,
    };
    if (isDeepStrictEqual(databaseFields, gitFields)) {
      unchanged.push(incorporated);
      continue;
    }
    const base = mergeBase(
      stored.revision_id,
      histories.get(git.key),
      bases[git.key],
    );
    if (!base) {
      conflicts.push({
        key: git.key,
        revision: stored.revision_id,
        reason: "No revision history was read for this record",
        fields: changedFields(databaseFields, gitFields).map((field) => ({
          field,
          database: databaseFields[field] ?? null,
          git: gitFields[field] ?? null,
        })),
      });
      continue;
    }
    const result = mergeFields(base, databaseFields, gitFields);
    if (result.conflicts.length) {
      conflicts.push({
        key: git.key,
        revision: stored.revision_id,
        reason: "Changed differently in the database and Git",
        fields: result.conflicts,
      });
      continue;
    }
    if (isDeepStrictEqual(result.merged, databaseFields)) {
      unchanged.push(incorporated);
      continue;
    }
    merges.push({
      key: git.key,
      kind: git.kind,
      identifier: git.identifier,
      schemaVersion: git.schema_version,
      expectedHead: heads.get(git.key) ?? stored.revision_id,
      database: databaseFields,
      merged: result.merged,
      git: gitFields,
    });
  }
  const revisions = new Set(additions.map((record) => record.revision));
  const selected = Object.fromEntries(
    ["entry_terms", "links", "relations", "asset_usages", "translations"].map(
      (key) => [
        key,
        snapshot[key].filter((row) => revisions.has(row.revision_id)),
      ],
    ),
  );
  const assetIds = new Set(selected.asset_usages.map((row) => row.asset_id));
  const termKeys = new Set(selected.entry_terms.map((row) => row.term_key));
  return {
    additions,
    merges,
    conflicts,
    unchanged,
    databaseOnly: current.records
      .filter((record) => !incomingKeys.has(record.key))
      .map((record) => record.key),
    snapshot: {
      ...snapshot,
      entries: records.filter((record) => revisions.has(record.revision_id)),
      ...selected,
      assets: snapshot.assets.filter((asset) => assetIds.has(asset.id)),
      terms: snapshot.terms.filter((term) => termKeys.has(term.key)),
    },
  };
}

/** Reviewed gameplay media supersedes a fallback page cover (website/content/contracts.ts).
 * A complete gameplay record keeps the displaced cover as its archived cover; a legacy
 * screenshot cannot carry one, so the cover remains only in revision history. */
export function preferGameplay(attachments, gameplayMediaSchema) {
  if (!attachments.learningMedia || !attachments.pageCover)
    return { attachments };
  const { pageCover, ...rest } = attachments;
  if (
    !rest.archivedPageCover &&
    gameplayMediaSchema.safeParse(rest.learningMedia).success
  )
    return {
      attachments: { ...rest, archivedPageCover: pageCover },
      cover: "archived",
    };
  return { attachments: rest, cover: "removed" };
}

/** The same checks a Studio save and later validation apply, before anything is written. */
export function prepareMergeDrafts(context, merges, entries) {
  const drafts = [],
    rejected = [];
  for (const merge of merges) {
    const issues = [];
    const { payload, translations, ...split } = splitFields(merge.merged);
    const { attachments, cover } = preferGameplay(
      split.attachments,
      context.gameplayMediaSchema,
    );
    const contract =
      context.versionedContracts[merge.kind]?.[merge.schemaVersion];
    if (!contract) issues.push(`No contract for schema ${merge.schemaVersion}`);
    else
      for (const [part, value] of [
        ["payload", payload],
        ["attachments", attachments],
      ]) {
        const parsed = contract[part].safeParse(value);
        if (!parsed.success)
          issues.push(`${part}: ${parsed.error.issues[0].message}`);
      }
    for (const row of translations)
      if (
        sha256(JSON.stringify(payload[row.field]) ?? "null") !== row.source_hash
      )
        issues.push(
          `translations.${row.locale}:${row.field} no longer matches its merged source text`,
        );
    const entry = entries.get(merge.key);
    let path, collectionPath;
    if (!issues.length) {
      path = canonicalAddress(context, merge.kind, merge.identifier, payload);
      collectionPath = collectionAddress(context, merge.kind, payload);
      if (
        path !== entry.canonical_path ||
        collectionPath !== entry.collection_path
      )
        issues.push(
          `Merged content moves the stable address to ${path} in ${collectionPath}`,
        );
    }
    if (issues.length) {
      rejected.push({ key: merge.key, reason: issues.join("; ") });
      continue;
    }
    const fields = recordFields(
      { payload, attachments },
      Object.fromEntries(
        translations.map(({ locale, field, ...value }) => [
          `${locale}:${field}`,
          value,
        ]),
      ),
    );
    drafts.push({
      key: merge.key,
      kind: merge.kind,
      identifier: merge.identifier,
      schemaVersion: merge.schemaVersion,
      expectedHead: merge.expectedHead,
      path,
      collectionPath,
      translations,
      fromGit: changedFields(merge.database, fields),
      ...(cover ? { cover } : {}),
      git: merge.git,
      body: {
        ...context.envelopeText(merge.kind, payload),
        payload,
        attachments,
      },
    });
  }
  return { drafts, rejected };
}

/** Save merged records through the Studio draft path: compare-and-swap heads, write
 * translations, never submit, approve or publish. */
export async function saveMergeDrafts(database, actor, drafts) {
  const saved = [],
    failed = [];
  for (const draft of drafts) {
    try {
      const revision = await database.user(actor, async (client) => {
        const row = (
          await client.query(
            "select public.catalog_save_draft($1,$2,$3,$4,$5,$6,$7) as id",
            [
              draft.kind,
              draft.identifier,
              draft.schemaVersion,
              draft.path,
              draft.collectionPath,
              canonicalJSON(draft.body),
              draft.expectedHead,
            ],
          )
        ).rows[0];
        await client.query(
          "select public.catalog_set_draft_translations($1,$2::jsonb)",
          [row.id, JSON.stringify(draft.translations)],
        );
        return row.id;
      });
      saved.push({ key: draft.key, revision, fields: draft.git });
    } catch (error) {
      failed.push({ key: draft.key, reason: error.message });
    }
  }
  return { saved, failed };
}
