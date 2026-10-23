import assert from "node:assert/strict";
import sharp from "sharp";
import { root } from "../documents.mjs";
import {
  canonicalJSON,
  digest,
  json,
  readArtifact,
  sha256,
  walkValues,
} from "./codec.mjs";
import { projectSnapshot } from "./projection.mjs";
import {
  renderGeneratedDocuments,
  resolveDocumentBody,
} from "./generated-documents.mjs";
import { documentGenerator } from "./generated-registry.mjs";

export class ContentValidationError extends Error {
  constructor(issues) {
    super(
      `Content validation failed${issues[0] ? `: ${issues[0].key}.${issues[0].field}: ${issues[0].message}` : ""}`,
    );
    this.name = "ContentValidationError";
    this.issues = issues;
  }
}
const issue = (key, field, message) => ({ key, field, message });

/** Compiler checks are not factual source review, execution, or licensing clearance. */
export async function validateSelection(
  context,
  records,
  translations,
  {
    configuration = context.configurationFromSources(
      context.sources,
      context.registry.entries,
    ),
    readAsset = (path) => readArtifact(root, path),
    checkDocuments = false,
  } = {},
) {
  const issues = [];
  for (const record of records) {
    const contract =
      context.versionedContracts[record.kind]?.[record.schema_version];
    if (!contract) {
      issues.push(
        issue(
          record.key,
          "schema_version",
          "No trusted validator is installed for this kind/version",
        ),
      );
      continue;
    }
    if (record.key !== `${record.kind}:${record.identifier}`)
      issues.push(
        issue(
          record.key,
          "identifier",
          "Identity differs from the stable content key",
        ),
      );
    if (context.contentKinds[record.kind]?.owner !== record.owner)
      issues.push(
        issue(
          record.key,
          "owner",
          "Authoring owner differs from its registered kind",
        ),
      );
    if (digest(record.body) !== record.fingerprint)
      issues.push(
        issue(
          record.key,
          "body",
          "Content bytes do not match the revision fingerprint",
        ),
      );
    for (const part of ["payload", "attachments"]) {
      const parsed = contract[part].safeParse(record.body[part]);
      if (!parsed.success)
        for (const error of parsed.error.issues)
          issues.push(
            issue(record.key, [part, ...error.path].join("."), error.message),
          );
    }
    if (record.kind === "resource") {
      for (const [kind, access] of Object.entries(
        record.body.payload.access || {},
      ))
        if ((access.kind === "unavailable") === Boolean(access.url))
          issues.push(
            issue(
              record.key,
              `payload.access.${kind}`,
              "Unavailable access must omit its URL; available access requires a URL",
            ),
          );
      const identity = record.body.attachments.identity;
      if (identity?.asset && /^https?:/.test(identity.asset))
        issues.push(
          issue(
            record.key,
            "attachments.identity.asset",
            "Verified marks must use a checksummed local asset",
          ),
        );
      if (identity?.asset && !identity.logoSourceUrl)
        issues.push(
          issue(
            record.key,
            "attachments.identity.logoSourceUrl",
            "Record the original published mark source",
          ),
        );
      if (identity && Boolean(identity.asset) !== Boolean(identity.sha256))
        issues.push(
          issue(
            record.key,
            "attachments.identity.sha256",
            "A mark and its checksum must be supplied together",
          ),
        );
    }
    if (
      record.kind === "example" &&
      record.body.attachments.learningMedia?.origin === "creator-screenshot" &&
      !record.body.attachments.learningMedia.originalImageUrl
    )
      issues.push(
        issue(
          record.key,
          "attachments.learningMedia.originalImageUrl",
          "Creator screenshots require their original image URL",
        ),
      );
    if (
      (record.kind === "foundation" &&
        record.body.payload.category !== "foundation") ||
      (record.kind === "example" &&
        record.body.payload.category === "foundation")
    )
      issues.push(
        issue(
          record.key,
          "payload.category",
          "Engine foundations and AI-created game examples are distinct kinds",
        ),
      );
  }
  if (issues.length) throw new ContentValidationError(issues);
  let assembled, registry;
  try {
    assembled = context.assembleSources(records, configuration);
    registry = context.createRegistry(assembled.sources, assembled.documents);
    assert.equal(
      registry.entries.length,
      records.length,
      "A snapshot record disappeared during assembly",
    );
    for (const record of records) {
      const entry = registry.byKey(record.key);
      assert.ok(entry, `Missing normalized record: ${record.key}`);
      assert.equal(
        entry.url,
        record.canonical_path,
        `Canonical address changed: ${record.key}`,
      );
      assert.equal(
        entry.collectionUrl,
        record.collection_path,
        `Owning collection changed: ${record.key}`,
      );
      assert.equal(
        entry.title,
        record.body.title,
        `Title must match the typed payload: ${record.key}`,
      );
      assert.equal(
        entry.description,
        record.body.summary,
        `Summary must match the typed payload: ${record.key}`,
      );
      assert.deepEqual(
        json(entry.data),
        record.body.payload,
        `Payload identity or fields changed: ${record.key}`,
      );
    }
  } catch (error) {
    throw new ContentValidationError([
      issue("catalog", "references", error.message),
    ]);
  }

  const artifacts = new Map();
  for (const record of records) {
    const references = [];
    walkValues(record.body, (value, field) => {
      if (
        typeof value === "string" &&
        /\.(src|asset|poster|previewSrc)$/.test(field) &&
        !/^https?:\/\//.test(value)
      )
        references.push({
          field,
          path: `website/public/${value.replace(/^\//, "")}`,
        });
    });
    for (const reference of references) {
      try {
        if (!artifacts.has(reference.path)) {
          const bytes = await readAsset(reference.path);
          artifacts.set(reference.path, {
            path: reference.path,
            bytes: bytes.length,
            sha256: sha256(bytes),
          });
        }
        if (reference.field === "attachments.identity.asset")
          assert.equal(
            artifacts.get(reference.path).sha256,
            record.body.attachments.identity.sha256,
            "Verified mark checksum differs from its file",
          );
        if (
          record.kind === "example" &&
          reference.field === "attachments.learningMedia.src"
        ) {
          const image = await sharp(await readAsset(reference.path), {
            limitInputPixels: 40000000,
          }).metadata();
          const declared = record.body.attachments.learningMedia;
          assert.equal(image.format, "webp", "Game previews must use WebP");
          assert.equal(
            image.width,
            declared.width,
            "Screenshot width differs from its file",
          );
          assert.equal(
            image.height,
            declared.height,
            "Screenshot height differs from its file",
          );
          assert.ok(
            image.width >= 320 &&
              image.height >= 180 &&
              image.width * 9 === image.height * 16,
            "Game previews require an uncropped 16:9 frame of at least 320×180",
          );
        }
      } catch (error) {
        issues.push(
          issue(
            record.key,
            reference.field,
            `Asset verification failed: ${error.code || error.message}`,
          ),
        );
      }
    }
  }
  const catalogs = {};
  const byRevision = new Map(
    records.map((record) => [record.revision_id, record]),
  );
  for (const row of translations) {
    const record = byRevision.get(row.revision_id);
    if (!record) {
      issues.push(
        issue(
          "catalog",
          "translations",
          "Translation refers to an unselected revision",
        ),
      );
      continue;
    }
    catalogs[row.locale] ??= { content: {}, fingerprints: {} };
    catalogs[row.locale].content[record.key] ??= {};
    catalogs[row.locale].fingerprints[record.key] ??= {};
    catalogs[row.locale].content[record.key][row.field] = row.value;
    catalogs[row.locale].fingerprints[record.key][row.field] = row.source_hash;
    if (
      !(typeof row.value === "string" && row.value.trim()) &&
      !(
        Array.isArray(row.value) &&
        row.value.length &&
        row.value.every((value) => typeof value === "string" && value.trim())
      )
    )
      issues.push(
        issue(
          record.key,
          `translations.${row.locale}.${row.field}`,
          "A complete nonempty translation is required",
        ),
      );
    const source = record.body.payload[row.field];
    if (
      Array.isArray(row.value) &&
      (!Array.isArray(source) || source.length !== row.value.length)
    )
      issues.push(
        issue(
          record.key,
          `translations.${row.locale}.${row.field}`,
          "Preserve every source list item",
        ),
      );
    if (sha256(JSON.stringify(source) ?? "null") !== row.source_hash)
      issues.push(
        issue(
          record.key,
          `translations.${row.locale}.${row.field}`,
          "Source text changed; explicitly review this translation before validation",
        ),
      );
  }
  const documentBodies = {};
  const known = new Set(context.documents.map((document) => document.source));
  const generated = checkDocuments
    ? renderGeneratedDocuments(assembled.sources)
    : null;
  for (const document of assembled.documents) {
    try {
      documentGenerator(document);
      assert.equal(
        document.slug,
        context.documents.find((known) => known.source === document.source)
          ?.slug,
        "Document source has another canonical identity",
      );
    } catch (error) {
      issues.push(
        issue(`document:${document.slug}`, "payload.sourceMode", error.message),
      );
    }
  }
  if (checkDocuments) {
    for (const document of assembled.documents.filter(
      (document) =>
        !Array.isArray(checkDocuments) ||
        checkDocuments.includes(`document:${document.slug}`),
    )) {
      try {
        documentBodies[document.source] = await resolveDocumentBody(
          document,
          generated,
          {
            knownSources: known,
            readSource: (path) => readArtifact(root, path),
          },
        );
      } catch (error) {
        issues.push(
          issue(
            `document:${document.slug}`,
            "payload.sourceHash",
            error.message,
          ),
        );
      }
    }
  }
  if (issues.length) throw new ContentValidationError(issues);
  let projection;
  try {
    projection = projectSnapshot(
      context,
      {
        sources: assembled.sources,
        documents: assembled.documents,
        translation_catalogs: catalogs,
      },
      context.runtimeTaxonomy,
      [...artifacts.values()],
    );
    const inputs = new Map(records.map((record) => [record.key, record]));
    for (const entry of projection.entries)
      assert.ok(
        canonicalJSON(entry.body) === canonicalJSON(inputs.get(entry.key).body),
        `Attachment provenance or typed fields disagree with the renderer: ${entry.key}`,
      );
  } catch (error) {
    throw new ContentValidationError([
      issue("catalog", "projection", error.message),
    ]);
  }
  const actual = new Map(records.map((record) => [record.key, record]));
  const ids = new Map(
    projection.entries.map((entry) => [
      entry.revision_id,
      actual.get(entry.key).revision_id,
    ]),
  );
  for (const key of [
    "entry_terms",
    "links",
    "relations",
    "asset_usages",
    "translations",
  ])
    projection[key] = projection[key].map((row) => ({
      ...row,
      revision_id: ids.get(row.revision_id),
    }));
  projection.entries = projection.entries.map((entry) => ({
    ...entry,
    revision_id: actual.get(entry.key).revision_id,
  }));
  return {
    assembled,
    registry,
    projection,
    configuration,
    documentBodies,
    catalogs,
    note: "Structure, references, local files and translations checked. Remote recordings remain external references; factual review, reuse rights and reproduction are not implied.",
  };
}

export function readReleaseData(context, release) {
  assert.equal(release.format, "gamemap.release-package");
  assert.equal(release.version, 1);
  assert.equal(
    sha256(release.manifest_text),
    release.manifest_digest,
    "Release manifest digest mismatch",
  );
  assert.equal(
    sha256(release.context_text),
    release.context_digest,
    "Release context digest mismatch",
  );
  const manifest = JSON.parse(release.manifest_text),
    build = JSON.parse(release.context_text);
  assert.equal(build.format, "gamemap.build-context");
  assert.equal(build.version, 1);
  assert.deepEqual(
    [...build.selected_revisions].sort((a, b) => a.id.localeCompare(b.id)),
    manifest.entries
      .map((entry) => ({
        id: entry.revision_id,
        digest: entry.fingerprint,
        schema_version: entry.schema_version,
      }))
      .sort((a, b) => a.id.localeCompare(b.id)),
    "Build context refers to other revisions",
  );
  const assembled = context.assembleSources(
    manifest.entries,
    build.configuration,
  );
  const registry = context.createRegistry(
    assembled.sources,
    assembled.documents,
  );
  assert.equal(registry.entries.length, manifest.entries.length);
  for (const record of manifest.entries) {
    assert.equal(
      digest(record.body),
      record.fingerprint,
      `Revision digest mismatch: ${record.key}`,
    );
    assert.deepEqual(
      json(registry.byKey(record.key).data),
      record.body.payload,
      `Release lost fields: ${record.key}`,
    );
  }
  for (const document of assembled.documents)
    assert.equal(
      sha256(build.document_bodies[document.source]),
      document.sourceHash,
      `Release Markdown differs: ${document.source}`,
    );
  return { manifest, build, ...assembled, registry };
}
