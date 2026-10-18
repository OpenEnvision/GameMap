import { test } from "node:test";
import assert from "node:assert/strict";
import { loadContent, contentDigest } from "../scripts/lib/content.mjs";
import {
  assertKnownSourceFiles,
  assertSourceModuleCoverage,
} from "../scripts/lib/source-inventory.mjs";
import {
  parsePage,
  attributes,
  assertRecordFields,
  assertMarkdownCoverage,
  assertSearchCoverage,
} from "../scripts/lib/rendered-coverage.mjs";
import {
  documentLinkResolver,
  assertDocumentHTML,
  root,
} from "../scripts/lib/documents.mjs";
import { resolve } from "node:path";

const context = await loadContent();
const {
  registry,
  sources,
  documents,
  createRegistry,
  assertRegistryCoverage,
  collectDemos,
} = context;
const clone = () => structuredClone(sources);
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
function stepHTML(entry, omitted, empty) {
  return `<article data-content-key="${entry.key}">${entry.blocks
    .filter((block) => block.field !== omitted)
    .map(
      (block) =>
        `<section data-content-field="${block.field}">${block.field === empty ? "" : escape(block.type === "list" ? block.items.join(" ") : block.value || block.label)}</section>`,
    )
    .join("")}</article>`;
}
const scope = (html, key) =>
  parsePage(html).nodes.find(
    (node) => attributes(node)["data-content-key"] === key,
  );

test("all source kinds, fragments, attachments, and raw exports have registered owners", () => {
  assertRegistryCoverage(sources, documents, registry);
  assert.ok(
    assertSourceModuleCoverage(
      context.contracts,
      context.sourceModules,
      registry,
      sources,
      context.contentKinds,
    ) > registry.entries.length,
  );
});
test("unknown data files cannot silently become unexposed side collections", () => {
  assert.throws(
    () =>
      assertKnownSourceFiles(
        ["website/src/data/unregisteredCases.ts"],
        context.contracts,
      ),
    /Unclassified data source/,
  );
  assert.throws(
    () =>
      assertKnownSourceFiles(
        ["data/research/new-ledger.json"],
        context.contracts,
      ),
    /Unclassified data source/,
  );
});
test("a new runtime export needs a source disposition", () => {
  const path = "website/src/data/ai3dCases.ts";
  const modules = {
    ...context.sourceModules,
    [path]: { ...context.sourceModules[path], forgottenExamples: [] },
  };
  assert.throws(
    () =>
      assertSourceModuleCoverage(
        context.contracts,
        modules,
        registry,
        sources,
        context.contentKinds,
      ),
    /every runtime export/,
  );
});
test("a source fragment cannot add a case that its aggregate forgot to include", () => {
  const path = "website/src/data/ai3dCases.ts";
  const extra = {
    ...sources.learningPaths[0],
    id: "coverage-only-unmerged-fragment",
  };
  const modules = {
    ...context.sourceModules,
    [path]: { ai3dCases: [...context.sourceModules[path].ai3dCases, extra] },
  };
  assert.throws(
    () =>
      assertSourceModuleCoverage(
        context.contracts,
        modules,
        registry,
        sources,
        context.contentKinds,
      ),
    /Content not registered: example:coverage-only-unmerged-fragment/,
  );
});
test("new rows in an existing typed collection register without another page list", () => {
  const next = clone();
  const extra = { ...next.testingResources[0], id: "coverage-only-new-row" };
  next.testingResources.push(extra);
  const result = createRegistry(next, documents);
  assert.equal(result.entries.length, registry.entries.length + 1);
  assert.deepEqual(result.require("testing", extra.id).data, extra);
});
test("duplicate IDs and canonical addresses fail instead of overwriting", () => {
  const duplicate = clone();
  duplicate.resources.push(duplicate.resources[0]);
  assert.throws(
    () => createRegistry(duplicate, documents),
    /Duplicate content key/,
  );
  const collision = clone();
  collision.foundationPaths[0].id = collision.learningPaths[0].id;
  assert.throws(
    () => createRegistry(collision, documents),
    /Canonical URL collision/,
  );
});
test("unknown JSON fields require an explicit presentation", () => {
  const next = clone();
  next.resources[0].unhandledFinding = "Do not silently omit this.";
  assert.throws(
    () => createRegistry(next, documents),
    /unregistered field "unhandledFinding"/,
  );
  const nested = clone();
  nested.repositoryResearch.records[0].maintainer.unhandledIdentityClaim =
    "Unknown identity";
  assert.throws(
    () => createRegistry(nested, documents),
    /unregistered field "unhandledIdentityClaim"/,
  );
});
test("research envelope metadata cannot acquire an undisclosed field", () => {
  const path = "data/research/cadle-repositories.json";
  const modules = {
    ...context.sourceModules,
    [path]: {
      default: {
        ...sources.repositoryResearch,
        unhandledClaim: "Do not omit this.",
      },
    },
  };
  assert.throws(
    () =>
      assertSourceModuleCoverage(
        context.contracts,
        modules,
        registry,
        sources,
        context.contentKinds,
      ),
    /undeclared metadata field/,
  );
});
test("missing attribution and orphan attachments are errors", () => {
  const missing = clone();
  delete missing.gameCaseAgents[missing.learningPaths[0].id];
  assert.throws(
    () => createRegistry(missing, documents),
    /Missing creator-attributed/,
  );
  const orphan = clone();
  orphan.learningMedia["coverage-only-no-owner"] =
    orphan.learningMedia[orphan.learningPaths[0].id];
  assert.throws(
    () => createRegistry(orphan, documents),
    /Orphan learningMedia/,
  );
});
test("a missing record or unsupported detail route fails coverage", () => {
  assert.throws(
    () =>
      assertRegistryCoverage(sources, documents, {
        entries: registry.entries.slice(1),
      }),
    /Content coverage mismatch/,
  );
  const entries = registry.entries.map((entry, index) =>
    index ? entry : { ...entry, url: "/not-a-real-detail/example/" },
  );
  assert.throws(
    () => assertRegistryCoverage(sources, documents, { entries }),
    /No detail route/,
  );
});
test("every source recording and curated excerpt survives without source mutation", () => {
  const before = JSON.stringify({
    videos: sources.projectVideos,
    media: sources.projectMedia,
  });
  const demos = collectDemos(sources);
  assert.equal(
    demos.length,
    Object.keys(sources.showcaseCases).length +
      Object.keys(sources.projectVideos).length,
  );
  for (const id of Object.keys(sources.showcaseCases))
    assert.ok(demos.some((demo) => demo.id === id));
  for (const id of Object.keys(sources.projectVideos))
    assert.ok(demos.some((demo) => demo.id === `recording-${id}`));
  assert.ok(
    registry
      .demosFor("opengame")
      .some((entry) => entry.id === "opengame-skirmish"),
  );
  assert.ok(
    registry
      .demosFor("gamefactory-3a")
      .some((entry) => entry.id === "gamefactory-ue5-rpg"),
  );
  assert.equal(
    JSON.stringify({
      videos: sources.projectVideos,
      media: sources.projectMedia,
    }),
    before,
  );
});
test("another clip on an existing project is not reduced to one resource preview", () => {
  const next = clone();
  const original = next.showcaseCases["opengame-skirmish"];
  next.showcaseCases["coverage-only-another-clip"] = {
    ...original,
    id: "coverage-only-another-clip",
  };
  assert.equal(
    createRegistry(next, documents).demosFor("opengame").length,
    registry.demosFor("opengame").length + 1,
  );
});
test("field proof detects a missing deliverable, not just missing record IDs", () => {
  const entry = registry.all("step")[0];
  assert.doesNotThrow(() =>
    assertRecordFields(entry, scope(stepHTML(entry), entry.key)),
  );
  assert.throws(
    () =>
      assertRecordFields(
        entry,
        scope(stepHTML(entry, "deliverable"), entry.key),
      ),
    /missing rendered field deliverable/,
  );
  assert.throws(
    () =>
      assertRecordFields(
        entry,
        scope(stepHTML(entry, undefined, "check"), entry.key),
      ),
    /missing visible text/,
  );
});
test("serialized or hidden content is not counted as rendered content", () => {
  const entry = registry.all("step")[0];
  const html = stepHTML(entry).replace("<article ", "<article hidden ");
  assert.throws(
    () => assertRecordFields(entry, scope(html, entry.key)),
    /readable without JavaScript/,
  );
});
test("source HTML preserves safe disclosures but rejects executable tags and attributes", () => {
  assert.doesNotThrow(() =>
    assertDocumentHTML(
      "<details><summary>Evidence boundary</summary></details>",
      "fixture.md",
    ),
  );
  assert.throws(
    () => assertDocumentHTML("<script>run()</script>", "fixture.md"),
    /undeclared source HTML tag/,
  );
  assert.throws(
    () => assertDocumentHTML('<a id="x" onclick="run()">x</a>', "fixture.md"),
    /undeclared source HTML attribute/,
  );
});
test("Markdown coverage detects a dropped qualification or source link", () => {
  const metadata = { slug: "coverage-only", source: "docs/coverage-only.md" };
  const markdown =
    "# Example\n\nThis qualification must remain visible.\n\n[Original source](https://source.example/evidence)\n";
  assert.throws(
    () =>
      assertMarkdownCoverage(
        metadata,
        markdown,
        '<div class="prose"><p>Shortened body.</p></div>',
        documents,
      ),
    /missing visible text/,
  );
  assert.throws(
    () =>
      assertMarkdownCoverage(
        metadata,
        markdown,
        '<div class="prose"><p>This qualification must remain visible.</p><a href="https://wrong.example/">Original source</a></div>',
        documents,
      ),
    /missing href/,
  );
});
test("document URL policy preserves rendered routes, source assets, and deployment base", () => {
  const rewrite = documentLinkResolver(documents, "/GameMap/");
  assert.equal(
    rewrite(
      "practical-guide.md#example",
      resolve(root, "docs/workflow-notes.md"),
    ),
    "/docs/practical-guide/#example",
  );
  assert.equal(
    rewrite("../README.md", resolve(root, "docs/workflow-notes.md")),
    "/docs/overview/",
  );
  assert.equal(
    rewrite(
      "../website/public/cadle-repositories.json",
      resolve(root, "docs/cadle-repositories.md"),
    ),
    "/GameMap/cadle-repositories.json",
  );
  assert.equal(
    rewrite("https://source.example/", resolve(root, "docs/workflow-notes.md")),
    "https://source.example/",
  );
  assert.throws(
    () => rewrite("not-an-article.md", resolve(root, "docs/workflow-notes.md")),
    /Unregistered Markdown/,
  );
});
test("static search must contain every canonical content identity", () => {
  const rows = Object.fromEntries(
    registry.entries.map((entry, index) => [
      index,
      { type: "page", page_id: context.searchId(entry.key), url: entry.url },
    ]),
  );
  assert.doesNotThrow(() =>
    assertSearchCoverage(registry, { docs: { docs: rows } }, context.searchId),
  );
  delete rows[0];
  assert.throws(
    () =>
      assertSearchCoverage(
        registry,
        { docs: { docs: rows } },
        context.searchId,
      ),
    /Search omits/,
  );
});
test("search page identities cannot collide with generated numeric chunk IDs", () => {
  const ids = new Set(
    registry.entries.map((entry) => context.searchId(entry.key)),
  );
  for (const entry of registry.entries)
    for (let index = 0; index < entry.blocks.length; index++)
      assert.ok(!ids.has(`${context.searchId(entry.key)}-${index}`));
});
test("source and content digests change when a qualification changes", () => {
  const next = clone();
  next.learningPaths[0].source.note += " A further qualification.";
  assert.notEqual(
    contentDigest({ sources, documents }),
    contentDigest({ sources: next, documents }),
  );
});
