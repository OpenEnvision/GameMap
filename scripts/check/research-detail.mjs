import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = fileURLToPath(new URL("../../", import.meta.url));
const bundle = await build({
  stdin: {
    contents:
      "export { heroActions } from './website/app/components/content'; export { presentFields, repositoryResearchFields } from './website/content/fields';",
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "cjs",
  define: { "import.meta.env.BASE_URL": JSON.stringify("/") },
  logLevel: "silent",
});
const module = { exports: {} };
new Function("require", "module", "exports", bundle.outputFiles[0].text)(
  createRequire(new URL("../../package.json", import.meta.url)),
  module,
  module.exports,
);
const { heroActions, presentFields, repositoryResearchFields } = module.exports;
const inventory = JSON.parse(
  await readFile(
    new URL("../../data/segments/repository-research.json", import.meta.url),
    "utf8",
  ),
);
const identity = (value) => value;
const sources = { repositoryResearch: inventory };
const entryFor = (data) => ({
  kind: "repository-research",
  key: `repository-research:${data.requested_repo}`,
  data,
  blocks: presentFields(
    data,
    repositoryResearchFields,
    data.requested_repo,
    sources,
  ),
});

let apiEvidence = 0;
for (const row of inventory.records) {
  const entry = entryFor(row);
  const actions = heroActions(entry, identity);
  assert.equal(actions[0].label, "Open repository");
  assert.equal(actions[0].icon, "code");
  assert.equal(
    actions[0].href,
    `https://github.com/${row.canonical_repo || row.requested_repo}`,
  );
  assert.ok(
    !actions.some(({ href }) => href.startsWith("https://api.github.com/")),
  );
  assert.deepEqual(
    entry.blocks.find(({ field }) => field === "source_urls").items,
    row.source_urls.map((url, index) => ({
      label: `Source ${index + 1}`,
      url,
    })),
  );
  apiEvidence += Number(
    row.source_urls[0]?.startsWith("https://api.github.com/"),
  );
  const checked = entry.blocks.filter(({ field }) => field === "checked_at");
  assert.equal(checked.length, 1);
  assert.equal(checked[0].value, row.checked_at);
  assert.equal(checked[0].section, "provenance");
  for (const field of ["inspection_scope", "disposition", "availability"]) {
    const block = entry.blocks.find((block) => block.field === field);
    assert.ok(block?.value);
    assert.ok(
      !block.value.includes("_"),
      `${row.requested_repo}: raw ${field} code leaked`,
    );
    assert.equal(block.section, "guidance");
  }
}

const fixture = inventory.records[0];
for (const [kind, icon, label] of [
  ["playable", "play", "Play game"],
  ["download", "download", "Download game"],
]) {
  const entry = entryFor({
    ...fixture,
    game_access: {
      title: "Reviewed game build",
      track: "3d",
      engine: "WebGL",
      kind,
      url: `https://example.org/game/${kind}/`,
      source_url: "https://github.com/example/game/blob/main/README.md",
      checked_at: "2026-11-24",
      note: "Source-linked build; not executed.",
    },
  });
  assert.deepEqual(heroActions(entry, identity)[1], {
    href: entry.data.game_access.url,
    label,
    icon,
  });
}
assert.equal(
  heroActions(entryFor({ ...fixture, canonical_repo: null }), identity)[0].href,
  `https://github.com/${fixture.requested_repo}`,
);
assert.equal(
  heroActions(
    entryFor({ ...fixture, canonical_repo: "new-owner/current-repo" }),
    identity,
  )[0].href,
  "https://github.com/new-owner/current-repo",
);
assert.equal(
  entryFor({
    ...fixture,
    inspection_scope: "future_scope_reviewed",
  }).blocks.find(({ field }) => field === "inspection_scope").value,
  "Future scope reviewed",
);
assert.equal(
  entryFor({
    ...fixture,
    inspection_scope: "Historical free-form review note.",
  }).blocks.find(({ field }) => field === "inspection_scope").value,
  "Historical free-form review note.",
);

assert.deepEqual(
  heroActions(
    {
      kind: "resource",
      blocks: [
        {
          field: "url",
          type: "links",
          label: "Official site",
          items: [{ label: "Official site", url: "https://example.org/tool/" }],
        },
      ],
    },
    identity,
  ),
  [{ href: "https://example.org/tool/", label: "Official site", icon: "code" }],
);
assert.deepEqual(
  heroActions(
    {
      kind: "example",
      blocks: [
        {
          field: "demo",
          type: "links",
          label: "Playable demo",
          items: [{ label: "Play", url: "https://example.org/play/" }],
        },
        {
          field: "source",
          type: "links",
          label: "Source",
          items: [{ label: "Source", url: "https://github.com/example/game" }],
        },
      ],
    },
    identity,
  ),
  [
    { href: "https://example.org/play/", label: "Play", icon: "play" },
    { href: "https://github.com/example/game", label: "Source", icon: "code" },
  ],
);

console.log(
  `Research-detail regressions passed: ${inventory.records.length} repository entrances, ${apiEvidence} retained API evidence links, readable status/date fields, historical scopes, and distinct play/download actions.`,
);
