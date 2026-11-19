import { test } from "node:test";
import assert from "node:assert/strict";
import { loadContent, contentDigest } from "../../scripts/lib/content.mjs";
import {
  assertKnownSourceFiles,
  assertSourceModuleCoverage,
} from "../../scripts/lib/source-inventory.mjs";
import {
  parsePage,
  attributes,
  assertRecordFields,
  assertMarkdownCoverage,
  assertSearchCoverage,
} from "../../scripts/lib/rendered-coverage.mjs";
import {
  documentLinkResolver,
  assertDocumentHTML,
  root,
  publishablePath,
} from "../../scripts/lib/documents.mjs";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";

const context = await loadContent();
const {
  registry,
  sources,
  documents,
  createRegistry,
  assertRegistryCoverage,
  collectDemos,
  docLocale,
  docHome,
  localeFromPath,
  translationSlug,
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
test("retiring the Showcase listing preserves recordings under their resource owners", () => {
  const retired = new Set(["/showcase/", "/zh/showcase/"]);
  for (const page of Object.values(context.pages))
    assert.ok(!retired.has(page.path));
  for (const page of context.navigation) assert.ok(!retired.has(page.path));
  for (const path of context.staticPagePaths(registry))
    assert.ok(!retired.has(path));

  const demos = registry.all("demo");
  assert.deepEqual(
    demos.map((entry) => entry.data),
    collectDemos(sources),
  );
  const chinese = context.localizedRegistry(registry, "zh");
  for (const entry of demos) {
    assert.equal(entry.url, `/showcase/${encodeURIComponent(entry.id)}/`);
    assert.equal(
      entry.collectionUrl,
      context.url.resource(entry.data.resourceId),
    );
    assert.ok(registry.get("resource", entry.data.resourceId));
    const localized = chinese.require("demo", entry.id);
    assert.equal(localized.url, "/zh" + entry.url);
    assert.equal(localized.collectionUrl, "/zh" + entry.collectionUrl);
  }
  for (const entry of registry.entries) {
    assert.ok(!retired.has(entry.collectionUrl), entry.key);
    for (const block of entry.blocks)
      if (block.type === "links")
        for (const item of block.items)
          assert.ok(!retired.has(item.url), `${entry.key}.${block.field}`);
  }
});
test("ignored and hidden local notes cannot be published as documentation", () => {
  const visible = new Set(["docs/public.md"]);
  assert.equal(publishablePath(".env.notes.md", visible), false);
  assert.equal(publishablePath("docs/private.md", visible), false);
  assert.equal(publishablePath("docs/public.md", visible), true);
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
  const path = "data/segments/repository-research.json";
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
  const before = JSON.stringify(sources.recordings);
  const demos = collectDemos(sources);
  const views = sources.recordings.flatMap((recording) => recording.views);
  assert.equal(demos.length, views.length);
  for (const view of views)
    assert.ok(demos.some((demo) => demo.id === view.id));
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
  assert.equal(JSON.stringify(sources.recordings), before);
});
test("another clip on an existing project is not reduced to one resource preview", () => {
  const next = clone();
  const original = next.recordings.find(
    (recording) => recording.resourceId === "opengame",
  );
  next.recordings.push({
    ...original,
    id: "coverage-only-original",
    originalUrl: "https://example.org/another-original.mp4",
    views: [{ ...original.views[0], id: "coverage-only-another-clip" }],
  });
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
        '<html lang="en"><div class="prose"><p>Shortened body.</p></div></html>',
        documents,
      ),
    /missing visible text/,
  );
  assert.throws(
    () =>
      assertMarkdownCoverage(
        metadata,
        markdown,
        '<html lang="en"><div class="prose"><p>This qualification must remain visible.</p><a href="https://wrong.example/">Original source</a></div></html>',
        documents,
      ),
    /missing href/,
  );
});
test("reader guides start with the task, not editorial disclaimers", async () => {
  for (const document of documents.filter(
    (page) => !page.source.startsWith("docs/skills/"),
  )) {
    const markdown = await readFile(resolve(root, document.source), "utf8");
    const introduction = markdown.split(/\r?\n\s*\r?\n/)[1] || "";
    assert.doesNotMatch(
      introduction,
      /^(?:Sources? (?:checked|reviewed)|Source review:|Research checked|Reviewed)\b/i,
      `${document.source}: lead with the task`,
    );
    assert.doesNotMatch(
      markdown,
      /GameMap editorial (?:guidance|recommendations?|adaptation|proposals?|synthesis|test design|fixture)|This page contains \*\*GameMap|No automatic collection or recurring updates/,
      `${document.source}: omit boilerplate`,
    );
  }
});
test("import ledgers remain internal while creator evidence and source links stay public in both locales", () => {
  const imported = registry
    .all("example")
    .find(
      (entry) =>
        entry.data.intake &&
        entry.data.evidence?.note?.startsWith("Imported input "),
    );
  const attributed = registry
    .all("example")
    .find((entry) => entry.data.evidence && !entry.data.intake);
  assert.ok(imported);
  assert.ok(attributed);
  for (const current of [registry, context.localizedRegistry(registry, "zh")]) {
    const entry = current.require("example", imported.id);
    const metadata = entry.blocks.filter((block) =>
      ["intake", "evidence"].includes(block.field),
    );
    assert.deepEqual(
      [...new Set(metadata.map((block) => block.field))].sort(),
      ["evidence", "intake"],
    );
    assert.ok(metadata.every((block) => block.section === "metadata"));
    const text = context.searchableText(entry);
    assert.ok(!text.includes(imported.data.intake.sha256));
    assert.ok(!text.includes(imported.data.intake.dataset));
    const sources = entry.blocks.filter((block) => block.field === "source");
    assert.ok(sources.length);
    for (const block of sources) {
      assert.notEqual(block.section, "metadata");
      assert.ok(text.includes(context.blockText(block)));
    }
    const creator = current.require("example", attributed.id);
    const evidence = creator.blocks.filter(
      (block) => block.field === "evidence",
    );
    assert.ok(evidence.length);
    for (const block of evidence) {
      assert.notEqual(block.section, "metadata");
      assert.ok(
        context.searchableText(creator).includes(context.blockText(block)),
      );
    }
  }
});
test("source-only metadata is preserved in blocks but omitted from reader search", () => {
  const entry = {
    ...registry.entries[0],
    body: undefined,
    summary: "Reader summary",
    title: "Reader title",
    blocks: [
      {
        type: "text",
        field: "hash",
        section: "metadata",
        label: "Audit hash",
        value: "technical-only-token",
      },
      {
        type: "text",
        field: "limits",
        section: "provenance",
        label: "License",
        value: "Noncommercial only",
      },
    ],
  };
  const text = context.searchableText(entry);
  assert.ok(!text.includes("technical-only-token"));
  assert.ok(text.includes("Noncommercial only"));
});
test("document language routes preserve English URLs and choose explicit counterparts", () => {
  assert.equal(docLocale("guides/practical-guide"), "en");
  assert.equal(docLocale("zh/guides/practical-guide"), "zh");
  assert.equal(
    localeFromPath("/GameMap/docs/zh/guides/practical-guide/", "/GameMap/"),
    "zh",
  );
  assert.equal(docHome("zh"), "/docs/zh/");
  assert.equal(
    translationSlug("zh/guides/practical-guide", "en"),
    "guides/practical-guide",
  );
  assert.equal(
    translationSlug("guides/practical-guide", "zh"),
    "zh/guides/practical-guide",
  );
});
test("site language links preserve filters, anchors and explicit document counterparts", () => {
  const languages = context.documentLanguages(documents);
  assert.equal(
    context.localizedPath(
      "/resources/?category=engines&q=godot#resource/godot-engine",
      "zh",
      languages,
    ),
    "/zh/resources/?category=engines&q=godot#resource/godot-engine",
  );
  assert.equal(
    context.localizedPath("/zh/resources/?saved=1", "en", languages),
    "/resources/?saved=1",
  );
  assert.equal(
    context.localizedPath("/docs/guides/practical-guide/", "zh", languages),
    "/docs/zh/guides/practical-guide/",
  );
  assert.equal(
    context.localizedPath("/docs/zh/guides/reading-guide/", "en", languages),
    "/docs/guides/reading-guide/",
  );
  assert.equal(
    context.localizedPath("/docs/ecosystem/agents/", "zh", languages),
    "/docs/zh/ecosystem/agents/",
  );
  assert.equal(
    context.localizedPath("/docs/assets/validation/", "zh", languages),
    "/docs/zh/assets/validation/",
  );
  assert.equal(
    context.localizedPath("/media/source.webm", "zh", languages),
    "/media/source.webm",
  );
  assert.equal(
    context.localizedPath("https://source.example/docs/", "zh", languages),
    "https://source.example/docs/",
  );
  assert.equal(
    context.localeFromPath("/GameMap/zh/resources/", "/GameMap/"),
    "zh",
  );
  assert.equal(context.localeFromPath("/research/zh/project/"), "en");
});
test("Chinese views preserve identifiers, URLs, source data and complete curated descriptions", () => {
  const before = contentDigest(registry.entries),
    zh = context.localizedRegistry(registry, "zh");
  for (const kind of [
    "resource",
    "example",
    "agent",
    "testing",
    "path",
    "step",
    "demo",
  ])
    for (const entry of zh.all(kind)) {
      const original = registry.byKey(entry.key);
      assert.ok(original);
      assert.equal(
        entry.descriptionLanguage,
        "zh",
        `${entry.key}: translated introduction`,
      );
      assert.equal(entry.id, original.id);
      assert.equal(entry.kind, original.kind);
      const sourceUrls = original.blocks
        .filter((block) => block.type === "links")
        .flatMap((block) => block.items.map((item) => item.url));
      const translatedUrls = entry.blocks
        .filter((block) => block.type === "links")
        .flatMap((block) => block.items.map((item) => item.url));
      assert.deepEqual(
        translatedUrls,
        sourceUrls.map((url) =>
          context.localizedPath(
            url,
            "zh",
            context.documentLanguages(documents),
          ),
        ),
        `${entry.key}: external sources stay intact; internal references keep the locale`,
      );
    }
  assert.equal(
    contentDigest(registry.entries),
    before,
    "Translating must not mutate the English registry",
  );
  assert.equal(
    zh.require("document", "guides/practical-guide").id,
    "zh/guides/practical-guide",
  );
  assert.ok(
    zh
      .all("document")
      .every(
        (entry) =>
          entry.id.startsWith("zh/") ||
          !context.documentLanguages(documents).zh.includes(entry.id),
      ),
  );
  const skill = zh
    .all("agent")
    .find(
      (entry) => entry.data.catalogResourceId === "level-design-book-skill",
    );
  assert.equal(
    skill.title,
    zh.require("resource", "level-design-book-skill").title,
    "Derived toolkit text uses the catalog translation",
  );
});
test("a changed source field falls back instead of silently using an old translation", () => {
  const original = structuredClone(registry.require("resource", "codex"));
  original.data.summary = "A materially changed English description.";
  original.description = original.data.summary;
  original.blocks = original.blocks.map((block) =>
    block.field === "summary" && block.type === "lead"
      ? { ...block, value: original.description }
      : block,
  );
  const entry = context.localizeEntry(
    original,
    "zh",
    context.documentLanguages(documents),
  );
  assert.equal(entry.description, original.description);
  assert.equal(entry.descriptionLanguage, "en");
  assert.equal(context.canTranslate(original, "url"), false);
  assert.equal(context.canTranslate(original, "id"), false);
  assert.equal(context.canTranslate(original, "category"), false);
});
test("document URL policy preserves rendered routes, source assets, and deployment base", () => {
  const rewrite = documentLinkResolver(documents, "/GameMap/");
  assert.equal(
    rewrite(
      "practical-guide.md#example",
      resolve(root, "docs/guides/workflow-notes.md"),
    ),
    "/docs/guides/practical-guide/#example",
  );
  assert.equal(
    rewrite("../../README.md", resolve(root, "docs/guides/workflow-notes.md")),
    "/docs/overview/",
  );
  // Links to a moved document follow its redirect in the source's language.
  assert.equal(
    rewrite(
      "practical-guide.md#example",
      resolve(root, "docs/workflow-notes.md"),
    ),
    "/docs/guides/practical-guide/#example",
  );
  assert.equal(
    rewrite("agents-notes.md", resolve(root, "docs/zh/workflow-notes.md")),
    "/docs/zh/ecosystem/agents/",
  );
  assert.equal(
    rewrite(
      "../website/public/repository-research.json",
      resolve(root, "docs/cadle-repositories.md"),
    ),
    "/GameMap/repository-research.json",
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
test("static search contains every public canonical identity and rejects missing text", () => {
  const documents = registry.entries
    .filter((entry) => entry.kind !== "path" && entry.kind !== "step")
    .map((entry) => ({
      key: entry.key,
      kind: entry.kind,
      title: entry.title,
      url: entry.url,
      text: [
        ...new Set(
          [
            entry.title,
            entry.description,
            ...entry.blocks
              .filter((block) => block.section !== "metadata")
              .map(context.blockText),
            entry.kind === "document" ? "Article body fixture" : "",
          ].filter(Boolean),
        ),
      ].join("\n"),
    }));
  assert.doesNotThrow(() =>
    assertSearchCoverage(
      registry,
      { version: 2, documents },
      context.blockText,
    ),
  );
  assert.throws(
    () =>
      assertSearchCoverage(
        registry,
        { version: 2, documents: documents.slice(1) },
        context.blockText,
      ),
    /Search omits/,
  );
  for (const [field, value] of [
    ["kind", "document"],
    ["title", "Wrong title"],
    ["url", "/wrong/"],
  ]) {
    const changed = structuredClone(documents);
    changed[0][field] = value;
    assert.throws(
      () =>
        assertSearchCoverage(
          registry,
          { version: 2, documents: changed },
          context.blockText,
        ),
      /mismatch/,
    );
  }
});
test("serialized search rejects leaked metadata and omitted reader provenance", () => {
  const entry = {
    ...registry.require("resource", "codex"),
    title: "Reader title",
    description: "Reader summary",
    blocks: [
      {
        type: "text",
        field: "hash",
        section: "metadata",
        label: "Audit hash",
        value: "technical-only-token",
      },
      {
        type: "text",
        field: "license",
        section: "provenance",
        label: "License",
        value: "Noncommercial only",
      },
    ],
  };
  const expected = "Reader title\nReader summary\nLicense Noncommercial only";
  const serialized = (text) =>
    JSON.parse(
      JSON.stringify({
        version: 2,
        documents: [
          {
            key: entry.key,
            kind: entry.kind,
            title: entry.title,
            url: entry.url,
            text,
          },
        ],
      }),
    );
  const check = (text) =>
    assertSearchCoverage(
      { entries: [entry] },
      serialized(text),
      context.blockText,
    );
  assert.doesNotThrow(() => check(expected));
  assert.throws(
    () => check(expected + "\nAudit hash technical-only-token"),
    /exclude source-only metadata/,
  );
  assert.throws(
    () => check("Reader title\nReader summary"),
    /include reader fields/,
  );
  assert.equal(entry.blocks[0].value, "technical-only-token");
});
test("serialized article search requires its body without censoring legitimate metadata words", () => {
  const entry = {
    ...registry.all("document")[0],
    title: "Article title",
    description: "Article summary",
    blocks: [
      {
        type: "text",
        field: "hash",
        section: "metadata",
        label: "Audit hash",
        value: "technical-only-token",
      },
      {
        type: "text",
        field: "license",
        section: "provenance",
        label: "License",
        value: "Attribution required",
      },
    ],
  };
  const fields = "Article title\nArticle summary\nLicense Attribution required";
  const check = (text) =>
    assertSearchCoverage(
      { entries: [entry] },
      JSON.parse(
        JSON.stringify({
          version: 2,
          documents: [
            {
              key: entry.key,
              kind: entry.kind,
              title: entry.title,
              url: entry.url,
              text,
            },
          ],
        }),
      ),
      context.blockText,
    );
  assert.doesNotThrow(() =>
    check(fields + "\nArticle explains technical-only-token in its own prose."),
  );
  assert.throws(() => check(fields), /omits article body/);
  assert.throws(
    () =>
      check(
        "Article title\nArticle summary\nAudit hash technical-only-token\nLicense Attribution required\nArticle body",
      ),
    /article fields differ/,
  );
});
test("alternate-language search preserves reader fields without leaking metadata", () => {
  const entry = {
    ...registry.require("resource", "codex"),
    title: "Reader title",
    description: "Reader summary",
    blocks: [
      {
        type: "text",
        field: "hash",
        section: "metadata",
        label: "Audit hash",
        value: "technical-only-token",
      },
      {
        type: "text",
        field: "license",
        section: "provenance",
        label: "License",
        value: "Noncommercial only",
      },
    ],
  };
  const alternate = {
    ...entry,
    title: "中文标题",
    description: "中文简介",
    blocks: [
      entry.blocks[0],
      {
        type: "text",
        field: "license",
        section: "provenance",
        label: "许可",
        value: "仅限非商业使用",
      },
    ],
  };
  const fields = "Reader title\nReader summary\nLicense Noncommercial only",
    otherFields = "中文标题\n中文简介\n许可 仅限非商业使用";
  const serialized = (alternateText) => ({
    version: 2,
    documents: [
      {
        key: entry.key,
        kind: entry.kind,
        title: entry.title,
        url: entry.url,
        text: fields,
        alternateText,
      },
    ],
  });
  const target = {
    byKey: (key) => (key === entry.key ? alternate : undefined),
  };
  assert.doesNotThrow(() =>
    assertSearchCoverage(
      { entries: [entry] },
      serialized(otherFields),
      context.blockText,
      target,
    ),
  );
  assert.throws(
    () =>
      assertSearchCoverage(
        { entries: [entry] },
        serialized(otherFields + "\nAudit hash technical-only-token"),
        context.blockText,
        target,
      ),
    /exclude source-only metadata/,
  );
  assert.throws(
    () =>
      assertSearchCoverage(
        { entries: [entry] },
        serialized("中文标题\n中文简介"),
        context.blockText,
        target,
      ),
    /alternate reader fields/,
  );
  assert.throws(
    () =>
      assertSearchCoverage(
        { entries: [entry] },
        serialized(otherFields),
        context.blockText,
      ),
    /explicit source registry/,
  );
  assert.equal(
    context.rankDocuments(serialized(otherFields).documents, "非商业")[0].key,
    entry.key,
  );
});
test("resource associations cannot be joined against the agent namespace", () => {
  const expected = sources.learningPaths
    .filter((game) => game.resourceIds.includes("codex"))
    .map((game) => game.id);
  assert.ok(expected.length);
  assert.deepEqual(
    registry
      .examplesFor({ kind: "resource", id: "codex" })
      .map((entry) => entry.id),
    expected,
  );
  assert.throws(
    () => registry.examplesFor({ kind: "agent", id: "codex" }),
    /Invalid resource reference/,
  );
});
test("one original film has multiple presentations, not duplicate asset identities", () => {
  const original = sources.recordings.find((record) =>
    record.views.some((view) => view.id === "streamrender-car"),
  );
  assert.equal(original.views.length, 2);
  assert.ok(
    original.views.some((view) => view.id === "recording-streamrender-h3"),
  );
  const duplicate = clone();
  duplicate.recordings.push({ ...original, id: "duplicate-original" });
  assert.throws(
    () => createRegistry(duplicate, documents),
    /Duplicate original recording/,
  );
});
test("all search surfaces use normalized token matching and exact-title ranking", () => {
  const { matchesSearch, rankDocuments } = context;
  assert.equal(matchesSearch("Phaser · Level Design", "design PHASER"), true);
  const documents = [
    {
      key: "a",
      kind: "resource",
      title: "OpenAI Codex",
      url: "/a/",
      text: "OpenAI Codex workflow",
    },
    {
      key: "b",
      kind: "document",
      title: "Workflow notes",
      url: "/b/",
      text: "OpenAI Codex workflow",
    },
  ];
  assert.equal(rankDocuments(documents, "OpenAI Codex")[0].key, "a");
});
test("source and content digests change when a qualification changes", () => {
  const next = clone();
  next.learningPaths[0].source.note += " A further qualification.";
  assert.notEqual(
    contentDigest({ sources, documents }),
    contentDigest({ sources: next, documents }),
  );
});
