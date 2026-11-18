import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { loadContent } from "../scripts/lib/content.mjs";
import { createImportBundle } from "../scripts/lib/platform.mjs";
import { projectSnapshot } from "../scripts/lib/catalog/projection.mjs";
import { studioFixture, accounts } from "./helpers/studio-fixture.mjs";
import { canonicalJSON } from "../scripts/lib/catalog/codec.mjs";

const context = await loadContent();
const bundled = await build({
  entryPoints: ["website/content/research-games.ts"],
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
});
const {
  researchGamesForExamples,
  researchNotInExamples,
  researchExampleListings,
} = await import(
  `data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`
);
const access = {
  title: "Research game fixture",
  track: "3d",
  engine: "Three.js",
  kind: "playable",
  url: "https://play.example.org/game/",
  source_url: "https://github.com/fixture/game/blob/main/README.md",
  checked_at: "2026-10-24",
  note: "Author-linked build; not playtested. Assets have separate terms.",
};
const base = context.registry.all("repository-research")[0];
const research = (repo = "fixture/game", overrides = {}) => ({
  ...base,
  key: `repository-research:${repo}`,
  id: repo,
  data: {
    ...structuredClone(base.data),
    requested_repo: repo,
    canonical_repo: repo,
    review_status: "source-reviewed",
    availability: "available",
    disposition: "new-research",
    game_access: { ...access },
    ...overrides,
  },
});

test("research game builds are optional v2 metadata, never retrofitted into installed v1", () => {
  const old = context.versionedContracts["repository-research"][1].payload;
  const current = context.payloadSchemas["repository-research"];
  assert.ok(old.safeParse(base.data).success);
  assert.ok(current.safeParse(base.data).success);
  assert.ok(current.safeParse(research().data).success);
  assert.equal(old.safeParse(research().data).success, false);
  for (const url of [
    "https://github.com/fixture/game",
    "https://github.com/fixture/game/tree/main",
    "https://github.com/fixture/game/blob/main/index.html",
    "https://raw.githubusercontent.com/fixture/game/main/index.html",
  ])
    assert.equal(
      current.safeParse(
        research("fixture/game", { game_access: { ...access, url } }).data,
      ).success,
      false,
    );
  assert.ok(
    current.safeParse(
      research("fixture/game", {
        game_access: {
          ...access,
          kind: "download",
          url: "https://github.com/fixture/game/releases/latest",
        },
      }).data,
    ).success,
  );
});

test("only explicitly linked, source-reviewed games are surfaced; source URLs and names are not guesses", () => {
  const sourceOnly = research("fixture/source-only", {
    game_access: undefined,
    source_urls: [access.url],
  });
  const metadataOnly = research("fixture/metadata-only", {
    review_status: "metadata-only",
  });
  const unavailable = research("fixture/unavailable", {
    disposition: "unavailable",
  });
  const valid = research();
  const result = researchGamesForExamples(
    [sourceOnly, metadataOnly, unavailable, valid],
    [],
  );
  assert.deepEqual(
    result.map((entry) => entry.key),
    [valid.key],
  );
  assert.equal(result[0].data.ai_note, valid.data.ai_note);
  assert.equal(result[0].url, valid.url);
});

test("examples deduplicate repository aliases, forks sharing a build and existing creator examples", () => {
  const first = research();
  const alias = research("fixture/renamed", {
    canonical_repo: "fixture/game",
    game_access: { ...access, url: "https://other.example.org/" },
  });
  const mirror = research("fixture/fork", {
    game_access: {
      ...access,
      url: "https://play.example.org/game?utm_source=research",
    },
  });
  assert.deepEqual(
    researchGamesForExamples([first, alias, mirror], []).map((e) => e.key),
    [first.key],
  );
  const existing = structuredClone(context.registry.all("example")[0]);
  existing.data.source.url = "https://github.com/FIXTURE/GAME.git/";
  assert.deepEqual(researchGamesForExamples([first], [existing]), []);
  existing.data.source.url = "https://github.com/unrelated/creator-game";
  existing.data.demo.url = access.url;
  assert.deepEqual(researchGamesForExamples([first], [existing]), []);
  const different = research("fixture/another", {
    game_access: { ...access, url: `${access.url}?level=2` },
  });
  assert.equal(researchGamesForExamples([first, different], []).length, 2);
});

test("research listing omits promoted games, repository aliases and mirrored builds without deleting evidence", () => {
  const game = research();
  const alias = research("fixture/alias", {
    canonical_repo: "FIXTURE/GAME",
    game_access: { ...access, url: "https://play.example.org/alias/" },
  });
  const mirror = research("fixture/mirror", {
    game_access: {
      ...access,
      url: "https://play.example.org/game?utm_source=ledger",
    },
  });
  const sourceOnly = research("fixture/source-only", {
    game_access: undefined,
  });
  const metadataOnly = research("fixture/metadata-only", {
    review_status: "metadata-only",
    game_access: { ...access, url: "https://play.example.org/unreviewed/" },
  });
  const unavailable = research("fixture/unavailable", {
    disposition: "unavailable",
    game_access: undefined,
  });
  const records = [game, alias, mirror, sourceOnly, metadataOnly, unavailable];
  const before = structuredClone(records);
  const remaining = researchNotInExamples(records, []);
  const listings = researchExampleListings(records, []);
  assert.equal(listings.get(alias.key)?.key, game.key);
  assert.equal(listings.get(mirror.key)?.key, game.key);
  assert.deepEqual(
    remaining.map((entry) => entry.key),
    [sourceOnly.key, metadataOnly.key, unavailable.key],
  );
  assert.equal(remaining[0], sourceOnly);
  assert.deepEqual(
    records,
    before,
    "Listing deduplication must not mutate the research ledger",
  );
});

test("research also omits games already represented by native examples, not only promoted records", () => {
  const existing = structuredClone(context.registry.all("example")[0]);
  existing.data.source.url = "https://github.com/FIXTURE/EXISTING.git/";
  existing.data.demo.url = "https://play.example.org/native/";
  const sameRepository = research("fixture/existing", {
    game_access: undefined,
  });
  const alias = research("fixture/old-name", {
    canonical_repo: "Fixture/Existing",
    game_access: undefined,
  });
  const sameBuild = research("fixture/other-repository", {
    game_access: {
      ...access,
      url: "https://play.example.org/native?utm_campaign=research",
    },
  });
  const notListed = research("fixture/not-listed", {
    game_access: undefined,
    source_urls: [existing.data.demo.url],
  });
  const remaining = researchNotInExamples(
    [sameRepository, alias, sameBuild, notListed],
    [existing],
  );
  assert.deepEqual(
    remaining.map((entry) => entry.key),
    [notListed.key],
  );
  const listings = researchExampleListings(
    [sameRepository, alias, sameBuild],
    [existing],
  );
  for (const entry of [sameRepository, alias, sameBuild])
    assert.equal(listings.get(entry.key)?.key, existing.key);
});

test("collection discovery follows the example listing while research ownership and localized evidence URLs stay intact", () => {
  const sources = structuredClone(context.sources);
  sources.repositoryResearch.records[0].game_access = access;
  const registry = context.createRegistry(sources, context.documents);
  const entry = registry.require("repository-research", base.id);
  assert.equal(entry.collectionUrl, "/research/");
  assert.deepEqual(registry.collectionDiscoveryFor(entry), {
    key: entry.key,
    url: entry.url,
    collectionUrl: "/examples/",
  });
  const zh = context.localizedRegistry(registry, "zh");
  const translated = zh.require("repository-research", base.id);
  assert.deepEqual(zh.collectionDiscoveryFor(translated), {
    key: entry.key,
    url: translated.url,
    collectionUrl: "/zh/examples/",
  });
  const originalExample = registry.all("example")[0];
  assert.deepEqual(registry.collectionDiscoveryFor(originalExample), {
    key: originalExample.key,
    url: originalExample.url,
    collectionUrl: originalExample.collectionUrl,
  });
});

test("linked game metadata remains searchable, fully presented and exported with correct link roles", async () => {
  const sources = structuredClone(context.sources);
  sources.repositoryResearch.records[0].game_access = access;
  const registry = context.createRegistry(sources, context.documents);
  const entry = registry.require("repository-research", base.id);
  const block = entry.blocks.find((block) => block.field === "game_access");
  assert.equal(block.type, "facts");
  for (const value of Object.values(access))
    assert.ok(context.blockText(block).includes(value));
  assert.ok(context.matchesSearch(context.searchableText(entry), access.title));
  const bundle = await createImportBundle(context);
  const archive = structuredClone(bundle.snapshot.archive);
  archive.sources = sources;
  const projected = projectSnapshot(
    context,
    archive,
    bundle.snapshot.taxonomy,
    bundle.snapshot.artifacts,
  );
  const record = projected.entries.find((e) => e.key === base.key);
  assert.equal(record.schema_version, 3);
  assert.deepEqual(record.body.payload.game_access, access);
  assert.ok(
    projected.links.some(
      (link) =>
        link.revision_id === record.revision_id &&
        link.url === access.url &&
        link.role === "demo",
    ),
  );
  assert.ok(
    projected.links.some(
      (link) =>
        link.revision_id === record.revision_id &&
        link.url === access.source_url &&
        link.role === "evidence",
    ),
  );
});

test("database authoring validates v2 successors without modifying the original research revision", async () => {
  const fixture = await studioFixture();
  try {
    const before = await fixture.database.system(
      async (client) =>
        (
          await client.query(
            "select e.*, r.body, r.body_text from catalog.entries e join catalog.revisions r on r.id=e.head_revision_id where e.key=$1",
            [base.key],
          )
        ).rows[0],
    );
    const body = structuredClone(before.body);
    body.payload.game_access = {
      ...access,
      kind: "download",
      url: "https://github.com/fixture/game/releases/latest",
    };
    const saved = await fixture.database.user(
      accounts.admin.id,
      async (client) =>
        (
          await client.query(
            "select public.catalog_save_draft($1,$2,$3,$4,$5,$6,$7) as id",
            [
              before.kind,
              before.identifier,
              2,
              before.canonical_path,
              before.collection_path,
              canonicalJSON(body),
              before.head_revision_id,
            ],
          )
        ).rows[0].id,
    );
    const result = await fixture.worker.validate(accounts.admin.id, saved);
    assert.equal(result.validated, true);
    assert.equal(result.preview.data.game_access.kind, "download");
    const original = await fixture.database.system(
      async (client) =>
        (
          await client.query(
            "select body_text from catalog.revisions where id=$1",
            [before.head_revision_id],
          )
        ).rows[0],
    );
    assert.equal(original.body_text, before.body_text);
  } finally {
    await fixture.close();
  }
});
