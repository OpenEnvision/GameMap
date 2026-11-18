import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { build } from "esbuild";
import { UNSAFE_decodeViaTurboStream } from "react-router";
import { createRequire, isBuiltin } from "node:module";
import { pathToFileURL } from "node:url";
import {
  parsePage,
  textContent,
  attributes,
} from "../../scripts/lib/rendered-coverage.mjs";
import { loadContent } from "../../scripts/lib/content.mjs";
import { createImportBundle } from "../../scripts/lib/platform.mjs";
import {
  kindAdapters,
  canonicalAddress,
  registryDefinitions,
} from "../../scripts/lib/catalog/adapters.mjs";
import { projectSnapshot } from "../../scripts/lib/catalog/projection.mjs";
import { walkValues, digest } from "../../scripts/lib/catalog/codec.mjs";
import { validateSelection } from "../../scripts/lib/catalog/validation.mjs";
import { studioFixture } from "../helpers/studio-fixture.mjs";

const context = await loadContent();
const bundle = await createImportBundle(context);
// Exercise the real generic React renderer, not only its intermediate block model.
const require = createRequire(import.meta.url);
const renderer = await build({
  stdin: {
    contents: `import { createElement } from 'react';
    import { renderToStaticMarkup } from 'react-dom/server';
    import { MemoryRouter } from 'react-router';
    import { ContentDocument } from './website/app/components/content';
    export { presentFields, fieldRules } from './website/content/fields';
    export const render = (entry) => renderToStaticMarkup(createElement(MemoryRouter, null, createElement(ContentDocument, { entry })));`,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
  define: { "import.meta.env.BASE_URL": JSON.stringify("/") },
  logLevel: "silent",
  plugins: [
    {
      name: "shared-node-dependencies",
      setup(builder) {
        builder.onResolve({ filter: /^[a-z@]/ }, (args) =>
          isBuiltin(args.path)
            ? undefined
            : {
                path: pathToFileURL(require.resolve(args.path)).href,
                external: true,
              },
        );
      },
    },
  ],
});
const { render, presentFields, fieldRules } = await import(
  `data:text/javascript;base64,${Buffer.from(renderer.outputFiles[0].text).toString("base64")}`
);
const sourceUrl = "https://example.org/source";
const paper = {
  id: "paper-contract-fixture",
  title: "Research reference fixture",
  description: "An unverified reference, not a capability claim.",
  authors: "Fixture author",
  year: 2026,
  publication: "Fixture publication",
  referenceType: "preprint",
  primaryRole: "play",
  roles: ["play"],
  topics: ["Fixture topic"],
  url: sourceUrl,
  arxivId: "2601.00001",
  doi: "10.1234/fixture",
  pdfUrl: "https://example.org/paper.pdf",
  resourceIds: [],
  origins: [{ label: "Origin", url: sourceUrl }],
  citedSections: [{ label: "Section", url: `${sourceUrl}#section` }],
  classification: "Editorial classification only.",
  access: {
    codeStatus: "unverified",
    repositories: [
      {
        label: "Materials",
        url: sourceUrl,
        kind: "materials",
        license: { status: "unspecified", name: "License not established" },
      },
    ],
    projects: [],
    demos: [
      {
        label: "Local setup",
        url: sourceUrl,
        kind: "local",
        access: "setup",
        note: "Not executed; separately licensed weights required.",
      },
    ],
    reviewStatus: "unverified",
    checkedAt: "2026-10-20",
    evidence: [{ label: "Evidence", url: sourceUrl }],
    notes: ["Public visibility is not an open-source license."],
  },
};
const game = {
  id: "threejs-contract-fixture",
  name: "Three.js contract fixture",
  repository_url: "https://github.com/fixture/game",
  genres: ["puzzle"],
  dimension: "3d-board",
  stack: {
    renderer: "three.js",
    integration: "direct",
    three_version: "0.180.0",
    render_evidence: { url: sourceUrl, claim: "Direct renderer construction." },
    manifests: [
      {
        path: "package.json",
        url: sourceUrl,
        dependencies: { three: "^0.180.0" },
        dev_dependencies: { vite: "^7.0.0" },
      },
    ],
    auxiliary_dependencies: ["vite"],
    framework_audit: "No wrapper found in reviewed files.",
  },
  gameplay_evidence: {
    url: sourceUrl,
    claim: "Source describes a board loop; not playtested.",
  },
  license: {
    spdx: null,
    source_url: sourceUrl,
    additional_notices: [sourceUrl],
    notes: "Assets may require separate permission.",
    label: "License not established",
  },
  demo: {
    url: null,
    status: "not-located",
    checked_at: "2026-10-20",
    source_url: sourceUrl,
    notes: "No demo located; no game session run.",
  },
  maturity: {
    status: "prototype",
    basis_url: sourceUrl,
    notes: "Source-only assessment.",
  },
  verification: {
    date: "2026-10-20",
    source_commit: "a".repeat(40),
    source_reviewed: true,
    playtested: false,
    upstream_tests_run: false,
    evidence_path: "collections/threejs-games/evidence/fixture.md",
    reviewed_files: ["index.html", "src/game.js", "package.json"].map(
      (path) => ({ path, url: sourceUrl }),
    ),
    already_mentioned_in_legacy_readme: false,
  },
  limitations: [
    "Source reviewed only.",
    "No execution or publication approval implied.",
  ],
};
function project(papers = [paper], games = [game]) {
  const archive = structuredClone(bundle.snapshot.archive);
  archive.sources.papers = papers;
  archive.sources.threejsGames = games;
  return projectSnapshot(
    context,
    archive,
    bundle.snapshot.taxonomy,
    bundle.snapshot.artifacts,
  );
}
function factsText(value) {
  const leaves = [];
  walkValues(value, (leaf) => leaves.push(String(leaf)));
  return leaves;
}
function assertConserved(kind, payload, snapshot, registry) {
  assert.deepEqual(context.payloadSchemas[kind].parse(payload), payload);
  const row = snapshot.entries.find(
    (entry) => entry.key === `${kind}:${payload.id}`,
  );
  assert.deepEqual(row.body.payload, payload);
  assert.deepEqual(row.body.attachments, {});
  assert.deepEqual(
    { title: row.body.title, summary: row.body.summary },
    context.envelopeText(kind, payload),
  );
  const blocks = registry.require(kind, payload.id).blocks;
  const visible = factsText(blocks);
  const rendered = parsePage(render(registry.require(kind, payload.id)));
  const renderedText = textContent(rendered.tree).replace(/\s+/g, " ");
  walkValues(payload, (value, field) => {
    if (field.startsWith("resourceIds[")) {
      assert.ok(
        rendered.nodes.some(
          (node) =>
            node.tagName === "a" &&
            attributes(node).href === context.url.resource(value),
        ),
      );
    } else if (typeof value === "string" && /^https?:\/\/\S+$/.test(value)) {
      // A readable anchor preserves its destination without printing a raw URL.
      assert.ok(
        rendered.nodes.some(
          (node) => node.tagName === "a" && attributes(node).href === value,
        ),
        `${kind}:${payload.id}.${field} missing link destination`,
      );
    } else
      assert.ok(
        renderedText.includes(String(value).replace(/\s+/g, " ")),
        `${kind}:${payload.id}.${field} missing from generic rendered HTML`,
      );
    if (field.startsWith("resourceIds[")) {
      assert.ok(visible.includes(context.url.resource(value)));
    } else
      assert.ok(
        kind === "paper"
          ? visible.some((item) => item.includes(String(value)))
          : visible.includes(String(value)),
        `${kind}:${payload.id}.${field} is not rendered`,
      );
    if (typeof value === "string" && /^https?:\/\/\S+$/.test(value))
      assert.ok(
        snapshot.links.some(
          (link) =>
            link.revision_id === row.revision_id &&
            link.field === `payload.${field}` &&
            link.url === value,
        ),
        `Lost link ${field}`,
      );
  });
  return row;
}

test("extended contracts, adapters, forms, assembly and canonical routes have registry parity", () => {
  assert.deepEqual(
    Object.keys(context.payloadSchemas).sort(),
    Object.keys(kindAdapters).sort(),
  );
  for (const kind of ["paper", "threejs-game"]) {
    assert.ok(
      registryDefinitions(context).schemas.some(
        (schema) =>
          schema.kind === kind && schema.validator_key === `gamemap.${kind}`,
      ),
    );
    assert.deepEqual(context.attachmentSchemas[kind].parse({}), {});
    assert.equal(
      context.attachmentSchemas[kind].safeParse({ untypedBlob: {} }).success,
      false,
    );
    assert.equal(context.contentKinds[kind].owner, "database");
    assert.equal(
      context.registry.all(kind).length,
      0,
      "Git defaults must not import remote drafts",
    );
  }
  assert.equal(
    context.contractForms()["threejs-game"].summaryField,
    "gameplay_evidence.claim",
  );
  assert.equal(
    canonicalAddress(context, "threejs-game", game.id, game),
    `/threejs-games/${game.id}/`,
  );
  assert.equal(
    canonicalAddress(context, "paper", paper.id, paper),
    `/papers/${paper.id}/`,
  );
  for (const entry of context.registry.entries) {
    const [title, summary] = context.textFields[entry.kind];
    assert.deepEqual(context.envelopeText(entry.kind, entry.data), {
      title: entry.data[title],
      summary: entry.data[summary],
    });
  }
});

test("static paper/game detail routes activate only for generated records, in both locales", async () => {
  for (const populated of [false, true]) {
    const paths = ["/papers/", "/threejs-games/"];
    if (populated)
      paths.push(`/papers/${paper.id}/`, `/threejs-games/${game.id}/`);
    const compiled = await build({
      entryPoints: [resolve("website/app/routes.ts")],
      bundle: true,
      write: false,
      format: "esm",
      platform: "node",
      plugins: [
        {
          name: "generated-route-fixture",
          setup(builder) {
            builder.onResolve({ filter: /^node:fs$/ }, () => ({
              path: "generated-routes",
              namespace: "fixture",
            }));
            builder.onLoad({ filter: /.*/, namespace: "fixture" }, () => ({
              contents: `export const existsSync = () => true; export const readFileSync = () => ${JSON.stringify(JSON.stringify(paths))};`,
              loader: "js",
            }));
          },
        },
      ],
    });
    const routes = (
      await import(
        `data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString("base64")}`
      )
    ).default;
    for (const id of [
      "paper-detail",
      "threejs-game-detail",
      "zh-paper-detail",
      "zh-threejs-game-detail",
    ])
      assert.equal(
        routes.some((route) => route.id === id),
        populated,
        id,
      );
    for (const id of [
      "papers",
      "threejsGames",
      "zh-papers",
      "zh-threejsGames",
      "resource-detail",
    ])
      assert.ok(
        routes.some((route) => route.id === id),
        id,
      );
  }
});

test("malformed native URLs return validation issues instead of throwing", () => {
  for (const [kind, payload, field] of [
    ["paper", paper, "url"],
    ["threejs-game", game, "repository_url"],
  ]) {
    for (const value of ["not-a-url", "https://", "http://[", ""]) {
      let parsed;
      assert.doesNotThrow(() => {
        parsed = context.payloadSchemas[kind].safeParse({
          ...payload,
          [field]: value,
        });
      });
      assert.equal(parsed.success, false);
      assert.ok(parsed.error.issues.some((issue) => issue.path[0] === field));
    }
  }
});

test("Studio reports malformed native URLs as structured validation errors", async () => {
  const fixture = await studioFixture();
  try {
    const session = await fixture.login("editor");
    for (const [kind, payload, field] of [
      ["paper", paper, "url"],
      ["threejs-game", game, "repository_url"],
    ]) {
      const invalid = {
        ...payload,
        id: `${payload.id}-invalid-url`,
        [field]: "not-a-url",
      };
      const saved = await fixture.request("/api/drafts", {
        session,
        method: "POST",
        body: {
          kind,
          identifier: invalid.id,
          schemaVersion: 1,
          payload: invalid,
          attachments: {},
          expectedHead: null,
          translations: [],
        },
      });
      const draft = await saved.json();
      assert.equal(saved.status, 201, JSON.stringify(draft));
      const response = await fixture.request(
        `/api/revisions/${draft.id}/validate`,
        {
          session,
          method: "POST",
        },
      );
      const result = await response.json();
      assert.equal(response.status, 422, JSON.stringify(result));
      assert.ok(
        result.error.issues.some((issue) => issue.field === `payload.${field}`),
      );
    }
  } finally {
    await fixture.close();
  }
});

test("extended contracts reject unknown nested fields, malformed URLs and candidate-shaped games", () => {
  for (const [kind, payload] of [
    ["paper", paper],
    ["threejs-game", game],
  ]) {
    assert.equal(
      context.payloadSchemas[kind].safeParse({
        ...payload,
        approval: "published",
      }).success,
      false,
    );
    const broken = structuredClone(payload);
    if (kind === "paper")
      broken.access.repositories[0].license.permissions = "all";
    else broken.verification.pending = true;
    assert.equal(context.payloadSchemas[kind].safeParse(broken).success, false);
  }
  assert.equal(
    context.payloadSchemas.paper.safeParse({
      ...paper,
      url: "javascript:alert(1)",
    }).success,
    false,
  );
  assert.equal(
    context.payloadSchemas.paper.safeParse({
      ...paper,
      url: "https://user:secret@example.org/",
    }).success,
    false,
  );
  assert.equal(
    context.payloadSchemas["threejs-game"].safeParse({
      ...game,
      verification: { ...game.verification, source_reviewed: false },
    }).success,
    false,
  );
  assert.equal(
    context.payloadSchemas["threejs-game"].safeParse({
      id: "pending",
      name: "Candidate",
      repository_url: game.repository_url,
      status: "pending",
    }).success,
    false,
  );
});

test("generic projections render every native evidence/license/review value and preserve normalized facets", async () => {
  const snapshot = project();
  const configuration = context.configurationFromSources(
    context.sources,
    context.registry.entries,
  );
  const assembled = context.assembleSources(snapshot.entries, configuration);
  const registry = context.createRegistry(
    assembled.sources,
    assembled.documents,
  );
  context.assertRegistryCoverage(
    assembled.sources,
    assembled.documents,
    registry,
  );
  for (const [kind, payload] of [
    ["paper", paper],
    ["threejs-game", game],
  ])
    assertConserved(kind, payload, snapshot, registry);
  for (const key of [
    "paper-review-status:unverified",
    "game-playtested:false",
    "game-upstream-tests-run:false",
    "game-license:unspecified",
  ])
    assert.ok(snapshot.terms.some((term) => term.key === key));
  for (const path of [
    "/papers/",
    "/threejs-games/",
    `/papers/${paper.id}/`,
    `/zh/threejs-games/${game.id}/`,
  ])
    assert.ok(context.staticPagePaths(registry).includes(path));
  for (const field of [
    "arxivId",
    "doi",
    "referenceType",
    "primaryRole",
    "roles",
  ])
    assert.equal(
      context.canTranslate(registry.require("paper", paper.id), field),
      false,
    );
  assert.equal(
    context.canTranslate(
      registry.require("threejs-game", game.id),
      "dimension",
    ),
    false,
  );
  const localized = context.localizedRegistry(registry, "zh");
  assert.ok(
    localized
      .require("threejs-game", game.id)
      .blocks.some((block) => block.field === "verification"),
  );
  await validateSelection(context, snapshot.entries, snapshot.translations, {
    configuration,
  });
  const wrong = structuredClone(snapshot.entries);
  const changed = wrong.find((row) => row.kind === "threejs-game");
  changed.body.summary = "Falsely claims playtesting";
  changed.fingerprint = digest(changed.body);
  await assert.rejects(
    validateSelection(context, wrong, snapshot.translations, { configuration }),
    /Summary must match/,
  );
});

test("Studio saves native paper/game drafts through the trusted envelope resolver and validates normalized SQL rows", async () => {
  const fixture = await studioFixture();
  try {
    const session = await fixture.login("editor");
    const createdIds = [];
    for (const [kind, payload] of [
      ["paper", paper],
      ["threejs-game", game],
    ]) {
      const response = await fixture.request("/api/drafts", {
        session,
        method: "POST",
        body: {
          kind,
          identifier: payload.id,
          schemaVersion: 1,
          payload,
          attachments: {},
          expectedHead: null,
          translations: [],
        },
      });
      const created = await response.json();
      assert.equal(response.status, 201, JSON.stringify(created));
      createdIds.push(created.id);
      assert.equal(created.state, "draft");
      assert.equal(created.published, false);
      const validation = await fixture.request(
        `/api/revisions/${created.id}/validate`,
        { session, method: "POST" },
      );
      const result = await validation.json();
      assert.equal(validation.status, 200, JSON.stringify(result));
      assert.equal(result.validated, true);
      assert.equal(
        result.preview.title,
        context.envelopeText(kind, payload).title,
      );
      assert.equal(
        result.preview.description,
        context.envelopeText(kind, payload).summary,
      );
      const revision = (
        await fixture.pg.query(
          "select * from catalog.revisions where id = $1",
          [created.id],
        )
      ).rows[0];
      assert.equal(revision.state, "draft");
      const links = (
        await fixture.pg.query(
          "select field, url from catalog.revision_links where revision_id = $1",
          [created.id],
        )
      ).rows;
      walkValues(payload, (value, field) => {
        if (typeof value === "string" && /^https?:\/\/\S+$/.test(value))
          assert.ok(
            links.some(
              (link) => link.field === `payload.${field}` && link.url === value,
            ),
          );
      });
      assert.ok(
        (
          await fixture.pg.query(
            "select * from catalog.revision_terms where revision_id = $1",
            [created.id],
          )
        ).rows.length > 0,
      );
      assert.deepEqual(revision.body.payload, payload);
      assert.equal(
        revision.body.summary,
        context.envelopeText(kind, payload).summary,
      );
    }
    const catalog = await (
      await fixture.request("/api/catalog", { session })
    ).json();
    for (const key of [`paper:${paper.id}`, `threejs-game:${game.id}`])
      assert.ok(catalog.entries.some((entry) => entry.key === key));
    // Explicit isolated test review only: production saves above remain drafts.
    const reviewer = await fixture.login("reviewer");
    for (const [action, actor] of [
      ["submit", session],
      ["approve", reviewer],
    ]) {
      const reviewed = await fixture.request("/api/review", {
        session: actor,
        method: "POST",
        body: {
          action,
          ids: createdIds,
          note: "Synthetic contract test only; not source verification.",
        },
      });
      assert.equal(reviewed.status, 200, JSON.stringify(await reviewed.json()));
    }
    const freeze = await fixture.request("/api/releases", {
      session: reviewer,
      method: "POST",
      body: {},
    });
    const frozen = await freeze.json();
    assert.equal(freeze.status, 201, JSON.stringify(frozen));
    assert.equal(frozen.deployed, false);
    const exported = await (
      await fixture.request(`/api/releases/${frozen.id}/export`, {
        session: reviewer,
      })
    ).json();
    const released = fixture.readRelease(exported);
    assert.deepEqual(released.registry.require("paper", paper.id).data, paper);
    assert.deepEqual(
      released.registry.require("threejs-game", game.id).data,
      game,
    );
    const invalid = structuredClone(game);
    delete invalid.gameplay_evidence.claim;
    assert.equal(
      (
        await fixture.request("/api/drafts", {
          session,
          method: "POST",
          body: {
            kind: "threejs-game",
            identifier: "missing-summary",
            schemaVersion: 1,
            payload: invalid,
            attachments: {},
            expectedHead: null,
            translations: [],
          },
        })
      ).status,
      422,
    );
  } finally {
    await fixture.close();
  }
});

// Full real corpus stays external and immutable; set GAMEMAP_REMOTE_ROOT for a portable rerun.
const remoteRoot =
  process.env.GAMEMAP_REMOTE_ROOT ||
  "/private/tmp/pi-github-repos/runtime-5sZhNX/f82eb70106bba3b65b30e0b1a715546b12023be1691638138003a663710a8bec";
const corpusAvailable = existsSync(join(remoteRoot, "data/papers.json"));
test(
  "pinned remote corpus: all 483 papers and 92 curated games validate and conserve every native field",
  {
    skip: corpusAvailable
      ? false
      : "Set GAMEMAP_REMOTE_ROOT to the pinned immutable GameMap clone",
  },
  async () => {
    assert.equal(
      execFileSync("git", ["-C", remoteRoot, "rev-parse", "HEAD"], {
        encoding: "utf8",
      }).trim(),
      "a2fe9a8e1d7b05008e11db1586d308c0086f7d91",
    );
    const papers = JSON.parse(
      readFileSync(join(remoteRoot, "data/papers.json")),
    );
    const { games } = JSON.parse(
      readFileSync(join(remoteRoot, "collections/threejs-games/games.json")),
    );
    const schema = JSON.parse(
      readFileSync(join(remoteRoot, "collections/threejs-games/schema.json")),
    );
    assert.equal(papers.length, 483);
    assert.equal(games.length, 92);
    // Object ownership/required fields match the supplied schema at every nested boundary.
    function compareObjects(source, contract) {
      if (source.type === "object" && source.properties) {
        assert.deepEqual(
          Object.keys(contract.properties).sort(),
          Object.keys(source.properties).sort(),
        );
        assert.deepEqual(
          [...contract.required].sort(),
          [...source.required].sort(),
        );
        assert.equal(contract.additionalProperties, false);
        for (const key of Object.keys(source.properties))
          compareObjects(source.properties[key], contract.properties[key]);
      } else if (source.type === "array")
        compareObjects(source.items, contract.items);
    }
    compareObjects(
      schema.properties.games.items,
      context.contractForms()["threejs-game"].payload,
    );
    const snapshot = project(papers, games);
    const configuration = context.configurationFromSources(
      context.sources,
      context.registry.entries,
    );
    const assembled = context.assembleSources(snapshot.entries, configuration);
    const registry = context.createRegistry(
      assembled.sources,
      assembled.documents,
    );
    context.assertRegistryCoverage(
      assembled.sources,
      assembled.documents,
      registry,
    );
    for (const payload of papers)
      assertConserved("paper", payload, snapshot, registry);
    for (const payload of games)
      assertConserved("threejs-game", payload, snapshot, registry);
    assert.equal(
      registry.all("threejs-game").length,
      92,
      "Candidates/exclusions cannot become curated entries",
    );
    await validateSelection(context, snapshot.entries, snapshot.translations, {
      configuration,
    });
  },
);

const legacyV2Fields = {
  example: ["distribution", "assetTools"],
  demo: ["demoType", "limitations", "engine", "exampleId"],
  step: ["resourceIds"],
  "testing-pack": ["testingIds", "check"],
};

test("optional native v2 contracts preserve installed v1 payloads and historical selection validation", async () => {
  const historical = structuredClone(bundle.snapshot.entries);
  for (const record of historical) {
    if (!Object.hasOwn(legacyV2Fields, record.kind)) continue;
    assert.equal(
      context.contentKinds[record.kind].schemaVersion,
      record.kind === "example" ? 8 : 2,
    );
    if (
      record.kind === "example" &&
      record.body.payload.demo.kind === "reference"
    ) {
      assert.equal(record.schema_version, 8);
      assert.equal(
        context.versionedContracts.example[4].payload.safeParse(
          record.body.payload,
        ).success,
        false,
      );
      assert.equal(
        context.versionedContracts.example[5].payload.safeParse(
          record.body.payload,
        ).success,
        true,
      );
      record.schema_version = 5;
      continue; // Project pages are neither source nor release links; preserve the installed v5 reader.
    }
    if (
      record.kind === "example" &&
      record.body.payload.demo.kind === "source"
    ) {
      assert.equal(record.schema_version, 8);
      assert.equal(
        context.versionedContracts.example[3].payload.safeParse(
          record.body.payload,
        ).success,
        false,
      );
      assert.equal(
        context.versionedContracts.example[4].payload.safeParse(
          record.body.payload,
        ).success,
        true,
      );
      record.schema_version = 4;
      continue; // Preserve the installed source-only v4 reader.
    }
    if (
      record.kind === "example" &&
      record.body.payload.category === "community"
    ) {
      for (const version of [1, 2])
        assert.equal(
          context.versionedContracts.example[version].payload.safeParse(
            record.body.payload,
          ).success,
          false,
        );
      assert.equal(
        context.versionedContracts.example[3].payload.safeParse(
          record.body.payload,
        ).success,
        true,
      );
      record.schema_version = 3;
      continue; // Preserve the installed community v3 reader while the active pointer advances.
    }
    for (const version of [1, 2]) {
      const contract = context.versionedContracts[record.kind][version];
      assert.deepEqual(
        contract.payload.parse(record.body.payload),
        record.body.payload,
      );
      assert.deepEqual(
        contract.attachments.parse(record.body.attachments),
        record.body.attachments,
      );
    }
    record.schema_version = 1;
  }
  assert.equal(context.contentKinds.foundation.schemaVersion, 4);
  assert.equal(context.contentKinds.agent.schemaVersion, 1);
  await validateSelection(context, historical, bundle.snapshot.translations);
  const oldExample = bundle.snapshot.entries.find(
    (entry) => entry.kind === "example",
  );
  for (const attribution of ["claude-cowork", "roo-code"]) {
    const attachments = {
      ...oldExample.body.attachments,
      agentAttribution: [attribution],
    };
    assert.equal(
      context.versionedContracts.example[1].attachments.safeParse(attachments)
        .success,
      false,
    );
    assert.deepEqual(
      context.versionedContracts.example[2].attachments.parse(attachments),
      attachments,
    );
    const agent = context.registry.all("agent")[0].data;
    assert.equal(
      context.versionedContracts.agent[1].payload.safeParse({
        ...agent,
        agents: [attribution],
      }).success,
      false,
    );
  }
});

test("Studio retains distinct v1/v2 validation receipts and normalized optional metadata relationships", async () => {
  const fixture = await studioFixture({ approved: false });
  try {
    const session = await fixture.login("editor");
    const resourceId = context.registry.all("resource")[0].id;
    const exampleId = context.registry.all("example")[0].id;
    const testingId = context.registry.all("testing")[0].id;
    const additions = {
      example: {
        distribution: [
          {
            platform: "Fixture download",
            url: sourceUrl,
            kind: "download",
            note: "Synthetic fixture; installation not tested.",
          },
        ],
        assetTools: ["Fixture asset tool"],
      },
      demo: {
        demoType: "gameplay",
        limitations: "Synthetic recording only; not playtested.",
        engine: "Fixture engine",
        exampleId,
      },
      step: { resourceIds: [resourceId] },
      "testing-pack": {
        testingIds: [testingId],
        check: "Synthetic acceptance checkpoint.",
      },
    };
    for (const kind of Object.keys(legacyV2Fields)) {
      const base = bundle.snapshot.entries.find((entry) => entry.kind === kind);
      for (const version of [1, 2]) {
        const payload = {
          ...structuredClone(base.body.payload),
          id: `fixture-${kind}-v${version}`,
          ...(version === 2 ? additions[kind] : {}),
        };
        const attachments = structuredClone(base.body.attachments);
        if (kind === "example" && version === 2)
          attachments.agentAttribution = ["claude-cowork", "roo-code"];
        if (version === 2)
          assert.equal(
            context.versionedContracts[kind][1].payload.safeParse(payload)
              .success,
            false,
          );
        const identifier =
          kind === "step" ? `${payload.track}/${payload.id}` : payload.id;
        const saved = await fixture.request("/api/drafts", {
          session,
          method: "POST",
          body: {
            kind,
            identifier,
            schemaVersion: version,
            payload,
            attachments,
            expectedHead: null,
            translations: [],
          },
        });
        const draft = await saved.json();
        assert.equal(saved.status, 201, JSON.stringify(draft));
        const checked = await fixture.request(
          `/api/revisions/${draft.id}/validate`,
          { session, method: "POST" },
        );
        const checkedBody = await checked.json();
        assert.equal(checked.status, 200, JSON.stringify(checkedBody));
        const receipt = (
          await fixture.pg.query(
            "select schema_version, validator_key from catalog.validation_receipts where revision_id = $1",
            [draft.id],
          )
        ).rows[0];
        assert.deepEqual(receipt, {
          schema_version: version,
          validator_key: `gamemap.${kind}`,
        });
        const relations = (
          await fixture.pg.query(
            "select target_key, field from catalog.revision_relations where revision_id = $1",
            [draft.id],
          )
        ).rows;
        if (version === 2 && kind !== "example") {
          const [target, field] =
            kind === "demo"
              ? [`example:${exampleId}`, "payload.exampleId"]
              : kind === "step"
                ? [`resource:${resourceId}`, "payload.resourceIds[0]"]
                : [`testing:${testingId}`, "payload.testingIds[0]"];
          assert.ok(
            relations.some(
              (relation) =>
                relation.target_key === target && relation.field === field,
            ),
          );
        }
        assert.deepEqual(
          (
            await fixture.pg.query(
              "select body from catalog.revisions where id = $1",
              [draft.id],
            )
          ).rows[0].body.payload,
          payload,
        );
      }
    }
  } finally {
    await fixture.close();
  }
});

test(
  "pinned native loader fixtures: 29 demos, 88 examples, 18 steps and 3 testing packs preserve optional metadata and audited attribution",
  {
    skip: corpusAvailable
      ? false
      : "Set GAMEMAP_REMOTE_ROOT to the pinned immutable clone",
  },
  async () => {
    const route = async (file, key) => {
      const bytes = readFileSync(join(remoteRoot, `data/${file}.data`));
      assert.ok(
        Array.isArray(JSON.parse(bytes)),
        "Pinned loader is a data reference table, not executable source",
      );
      const { value } = await UNSAFE_decodeViaTurboStream(
        new Response(bytes).body,
        globalThis,
      );
      return value[key].data;
    };
    const examples = await route("examples", "examples");
    const agents = await route("agents", "agents");
    const demos = await route("showcase", "demos");
    const paths = await route("paths", "paths");
    const testing = await route("testing", "testing");
    const observed = {};
    for (const [kind, rows, count] of [
      ["example", examples.examples, 88],
      ["demo", demos.demos, 29],
      ["step", paths.steps, 18],
      ["testing-pack", testing.packs, 3],
    ]) {
      assert.equal(rows.length, count);
      observed[kind] = {};
      for (const row of rows) {
        const payload = row.data;
        assert.deepEqual(
          context.payloadSchemas[kind].parse(payload),
          payload,
          row.key,
        );
        const entry = {
          ...row,
          blocks: presentFields(payload, fieldRules[kind], row.key),
        };
        const rendered = parsePage(render(entry));
        const visible = textContent(rendered.tree).replace(/\s+/g, " ");
        for (const field of legacyV2Fields[kind]) {
          if (!Object.hasOwn(payload, field)) continue;
          observed[kind][field] = (observed[kind][field] ?? 0) + 1;
          assert.equal(
            context.versionedContracts[kind][1].payload.safeParse(payload)
              .success,
            false,
          );
          walkValues(payload[field], (value) => {
            if (typeof value === "string" && /^https?:\/\//.test(value))
              assert.ok(
                rendered.nodes.some((node) => attributes(node).href === value),
                `${row.key}.${field} URL`,
              );
            else
              assert.ok(
                visible.includes(String(value).replace(/\s+/g, " ")),
                `${row.key}.${field} visible caveat`,
              );
          });
        }
        const relations =
          kindAdapters[kind].relations?.(row, context.sources) ?? [];
        for (const [field, targetKind] of [
          ["testingIds", "testing"],
          ["resourceIds", "resource"],
        ]) {
          for (const [index, id] of (payload[field] ?? []).entries())
            assert.ok(
              relations.some(
                (relation) =>
                  relation.target_key === `${targetKind}:${id}` &&
                  relation.field === `payload.${field}[${index}]`,
              ),
            );
        }
        if (payload.exampleId)
          assert.ok(
            relations.some(
              (relation) =>
                relation.target_key === `example:${payload.exampleId}` &&
                relation.field === "payload.exampleId",
            ),
          );
        if (kind === "example") {
          assert.deepEqual(
            context.attachmentSchemas.example.shape.agentAttribution.parse(
              agents.attribution[row.id],
            ),
            agents.attribution[row.id],
          );
        }
      }
    }
    assert.deepEqual(observed, {
      example: { distribution: 7, assetTools: 12 },
      demo: { demoType: 29, limitations: 29, engine: 13, exampleId: 9 },
      step: { resourceIds: 18 },
      "testing-pack": { testingIds: 3, check: 3 },
    });
    for (const [id, key, label] of [
      ["nagi-home-cowork", "claude-cowork", "Claude Cowork"],
      ["roo-code-action", "roo-code", "Roo Code"],
    ]) {
      assert.deepEqual(agents.attribution[id], [key]);
      assert.deepEqual(
        agents.examples
          .find((entry) => entry.id === id)
          .blocks.find((block) => block.field === "attribution").items,
        [label],
      );
      assert.equal(context.sources.agentLabels[key], label);
    }
    const bad = structuredClone(
      examples.examples.find((row) => row.data.distribution).data,
    );
    bad.distribution[0].verified = true;
    assert.equal(context.payloadSchemas.example.safeParse(bad).success, false);
  },
);
