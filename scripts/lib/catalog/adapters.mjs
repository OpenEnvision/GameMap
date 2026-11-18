import assert from "node:assert/strict";

export const linkRoles = [
  { key: "code", label: "Code" },
  { key: "demo", label: "Demo" },
  { key: "evidence", label: "Evidence" },
  { key: "reference", label: "Reference" },
  { key: "rights", label: "Rights and license" },
];
export const relationTypes = [
  { key: "belongs-to", label: "Belongs to" },
  { key: "catalog-resource", label: "Catalog resource" },
  { key: "demonstrates", label: "Demonstrates" },
  { key: "features", label: "Features" },
  { key: "related", label: "Related content" },
  { key: "uses-resource", label: "Uses resource" },
];
const facet = (scheme, values, controlled = true) =>
  [].concat(values ?? []).map((value) => ({ scheme, value, controlled }));
const relation = (target_key, type, field) => ({
  target_key,
  relation: type,
  field,
});
const resourceRelations = (entry) =>
  (entry.data.resourceIds ?? []).map((id, index) =>
    relation(
      `resource:${id}`,
      "uses-resource",
      `payload.resourceIds[${index}]`,
    ),
  );
const optional = (values) =>
  Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  );
const learningMediaAttachment = (media) =>
  media ? { ...media, origin: media.origin ?? "browser-capture" } : undefined;

const gameplayAttachments = (entry, sources) => {
  const screenshot = sources.gameplayScreenshots?.[entry.key];
  if (!screenshot) return undefined;
  assert.ok(
    screenshot.media.origin,
    `Explicit gameplay origin required: ${entry.key}`,
  );
  return optional({
    learningMedia: screenshot.media,
    archivedPageCover: screenshot.archivedPageCover,
  });
};

/** Per-kind migration strategies. An unknown kind fails closed instead of silently losing fields.
 * A new kind implements a strategy here; generic export, hashing, SQL and release logic stay unchanged. */
export const kindAdapters = {
  paper: {
    projectUrl: (data) => data.url,
    relations: resourceRelations,
    facets: (data) => [
      ...facet("paper-role", data.roles, false),
      ...facet("paper-topic", data.topics, false),
      ...facet("paper-reference-type", data.referenceType, false),
      ...facet("paper-year", String(data.year), false),
      ...facet("paper-code-status", data.access.codeStatus, false),
      ...facet("paper-review-status", data.access.reviewStatus, false),
    ],
  },
  "threejs-game": {
    attachments: (entry, sources) =>
      gameplayAttachments(entry, sources) ??
      optional({ pageCover: sources.pageCovers?.[entry.key] }),
    projectUrl: (data) => data.repository_url,
    facets: (data) => [
      ...facet("game-genre", data.genres, false),
      ...facet("game-dimension", data.dimension, false),
      ...facet("game-maturity", data.maturity.status, false),
      ...facet("game-demo-status", data.demo.status, false),
      ...facet("game-license", data.license.spdx ?? "unspecified", false),
      ...facet("game-playtested", String(data.verification.playtested), false),
      ...facet(
        "game-upstream-tests-run",
        String(data.verification.upstream_tests_run),
        false,
      ),
    ],
  },
  resource: {
    attachments: (entry, sources) =>
      optional({
        identity: sources.identities[entry.id],
        projectMedia: sources.projectMedia[entry.id],
      }),
    facets: (data) => [
      ...facet("categories", data.category),
      ...facet("types", data.type),
    ],
    projectUrl: (data) => data.url,
  },
  example: {
    attachments: (entry, sources) =>
      optional({
        ...(gameplayAttachments(entry, sources) ??
          optional({
            learningMedia: learningMediaAttachment(
              sources.learningMedia[entry.id],
            ),
            pageCover: sources.pageCovers?.[entry.key],
          })),
        agentAttribution: sources.gameCaseAgents[entry.id],
      }),
    facets: (data) => facet("example-category", data.category),
    relations: resourceRelations,
    projectUrl: (data) => data.source.url,
  },
  foundation: {
    attachments: (entry, sources) =>
      gameplayAttachments(entry, sources) ??
      optional({ pageCover: sources.pageCovers?.[entry.key] }),
    facets: (data) => facet("example-category", data.category),
    relations: resourceRelations,
    projectUrl: (data) => data.source.url,
  },
  agent: {
    facets: (data) => [
      ...facet("agent-kind", data.kind),
      ...facet("agent-client", data.agents),
    ],
    relations: (entry) =>
      entry.data.catalogResourceId
        ? [
            relation(
              `resource:${entry.data.catalogResourceId}`,
              "catalog-resource",
              "payload.catalogResourceId",
            ),
          ]
        : [],
    projectUrl: (data) => data.sourceUrl,
  },
  testing: {
    facets: (data) => [
      ...facet("testing-kind", data.kind),
      ...facet("testing-use", data.uses),
      ...facet("testing-terms", data.terms),
    ],
    projectUrl: (data) => data.sourceUrl,
  },
  "testing-pack": {
    relations: (entry) =>
      (entry.data.testingIds ?? []).map((id, index) =>
        relation(
          `testing:${id}`,
          "uses-resource",
          `payload.testingIds[${index}]`,
        ),
      ),
  },
  "repository-research": {
    attachments: (entry, sources) =>
      optional({
        learningMedia: learningMediaAttachment(
          sources.researchGameMedia[entry.id],
        ),
      }),
    projectUrl: (data) =>
      data.canonical_repo ? `https://github.com/${data.canonical_repo}` : null,
  },
  path: {
    attachments: (entry, sources) => ({
      editorial: {
        ...sources.editorial[entry.id],
        credit:
          sources.editorial[entry.id].credit ?? "Original GameMap artwork",
      },
      showcase: sources.showcaseByTrack[entry.id],
    }),
    relations: (entry, sources) =>
      sources.showcaseByTrack[entry.id].cases.map((id, index) =>
        relation(
          `demo:${id}`,
          "features",
          `attachments.showcase.cases[${index}]`,
        ),
      ),
  },
  step: {
    relations: (entry) => [
      relation(`path:${entry.data.track}`, "belongs-to", "payload.track"),
      ...resourceRelations(entry),
    ],
  },
  demo: {
    collection: (payload, context) => {
      assert.ok(
        typeof payload?.resourceId === "string" && payload.resourceId.trim(),
        "A recording needs a resourceId before saving its collection",
      );
      return context.url.resource(payload.resourceId);
    },
    attachments: (entry, sources) => {
      const recording = sources.recordings.find(
        (row) => row.id === entry.data.recordingId,
      );
      assert.ok(recording, `Missing original recording: ${entry.key}`);
      return {
        originalRecording: {
          id: recording.id,
          originalUrl: recording.originalUrl,
          resourceId: recording.resourceId,
        },
      };
    },
    relations: (entry) => [
      relation(
        `resource:${entry.data.resourceId}`,
        "demonstrates",
        "payload.resourceId",
      ),
      ...(entry.data.exampleId
        ? [
            relation(
              `example:${entry.data.exampleId}`,
              "demonstrates",
              "payload.exampleId",
            ),
          ]
        : []),
    ],
  },
  collection: {},
  document: {},
};

export function adapterFor(kind, adapters = kindAdapters) {
  assert.ok(
    Object.hasOwn(adapters, kind),
    `Unregistered content adapter: ${kind}`,
  );
  return adapters[kind];
}

export function canonicalAddress(context, kind, identifier, payload) {
  const helpers = {
    paper: "paper",
    "threejs-game": "threejsGame",
    resource: "resource",
    example: "example",
    foundation: "example",
    agent: "agent",
    testing: "testing",
    "testing-pack": "testingPack",
    "repository-research": "research",
    path: "path",
    demo: "demo",
    collection: "collection",
    document: "document",
  };
  if (kind === "step") return context.url.step(payload.track, payload.id);
  assert.ok(helpers[kind], `No canonical address adapter for ${kind}`);
  return context.url[helpers[kind]](identifier);
}

/** Keep draft/import ownership aligned with the renderer's explicit kind adapter. */
export function collectionAddress(context, kind, payload) {
  const definition = context.contentKinds[kind];
  assert.ok(definition, "Unregistered content collection");
  return (
    adapterFor(kind).collection?.(payload, context) ??
    context.url.page(definition.page)
  );
}

export function commonFacets(data) {
  return [
    ...facet("stages", data.stages ?? data.stage),
    ...facet("dimensions", data.dimensions),
    ...facet("tags", data.tags, false),
    ...facet("dimensions", data.track),
  ];
}

export function registryDefinitions(context) {
  const content_kinds = [],
    schemas = [];
  for (const [kind, definition] of Object.entries(context.contentKinds).sort(
    ([a], [b]) => (a < b ? -1 : a > b ? 1 : 0),
  )) {
    assert.match(
      kind,
      /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
      `Invalid content kind: ${kind}`,
    );
    assert.ok(
      ["database", "git"].includes(definition.owner),
      `Missing authoring owner: ${kind}`,
    );
    assert.ok(
      Number.isSafeInteger(definition.schemaVersion) &&
        definition.schemaVersion > 0,
      `Invalid content schema version: ${kind}`,
    );
    assert.ok(
      typeof definition.validatorKey === "string" &&
        definition.validatorKey.trim(),
      `Missing validator key: ${kind}`,
    );
    content_kinds.push({
      kind,
      label: definition.label,
      owner: definition.owner,
    });
    schemas.push({
      kind,
      version: definition.schemaVersion,
      validator_key: definition.validatorKey,
    });
  }
  const locales = context.locales.map((code) => {
    assert.match(
      code,
      /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/,
      `Invalid locale: ${code}`,
    );
    return { code };
  });
  assert.equal(
    new Set(locales.map((locale) => locale.code)).size,
    locales.length,
    "Duplicate locale registration",
  );
  return {
    content_kinds,
    schemas,
    locales,
    relation_types: relationTypes,
    link_roles: linkRoles,
  };
}
