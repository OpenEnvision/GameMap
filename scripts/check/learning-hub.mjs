import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";
import ts from "typescript";
import { readDocuments, root } from "../lib/documents.mjs";
import {
  attributes,
  parsePage,
  textContent,
} from "../lib/rendered-coverage.mjs";

const bundle = await build({
  stdin: {
    contents:
      "export * from './website/content/learning-hub'; export * from './website/content/locale';",
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
  define: { "import.meta.env.BASE_URL": JSON.stringify("/") },
});
const hub = await import(
  "data:text/javascript;base64," +
    Buffer.from(bundle.outputFiles[0].text).toString("base64")
);
const documents = await readDocuments();
const bySlug = new Map(documents.map((document) => [document.slug, document]));
const ids = new Set([
  ...hub.learningPaths.map(({ id }) => id),
  ...hub.appliedLearningPaths.flatMap(({ ids }) => ids),
  ...hub.learningBlockers.flatMap(({ ids }) => ids),
]);
assert.equal(hub.learningPaths.length, 3);
assert.equal(new Set(hub.learningPaths.map(({ id }) => id)).size, 3);
for (const id of ids) {
  for (const locale of ["en", "zh"]) {
    const slug = locale === "zh" ? `zh/${id}` : id;
    const document = bySlug.get(slug);
    assert.ok(document, `${id} must have an ${locale} source document`);
    assert.deepEqual(hub.learningDocument(documents, locale, id), {
      slug,
      label: document.label,
      url: `/docs/${slug}/`,
    });
  }
}
const original = bySlug.get(hub.learningPaths[0].id);
const translation = bySlug.get(`zh/${original.slug}`);
assert.equal(
  hub.learningDocument([original, translation], "zh", original.slug).slug,
  translation.slug,
);
assert.deepEqual(hub.learningDocument([original], "zh", original.slug), {
  slug: original.slug,
  label: original.label,
  url: `/docs/${original.slug}/`,
});
assert.equal(hub.learningDocument([translation], "en", original.slug), null);
for (const locale of ["en", "zh"])
  assert.equal(hub.learningDocument([], locale, "missing/source"), null);

const navigation = JSON.parse(
  await readFile(resolve(root, "website/docs.config.json"), "utf8"),
);
const starterGroup = navigation.find((group) =>
  group.pages.some(([id]) => id === original.slug),
);
assert.ok(starterGroup, "Starter documents must be present in navigation");
assert.deepEqual(
  starterGroup.pages,
  hub.learningPaths.map(({ id, title }) => [id, title]),
  "Navigation must preserve all three learning paths, labels and order",
);

// Read the real route's literal translation calls; dynamic path/blocker copy is
// exported from the helper. Adding visible text to either source must be localized.
const route = ts.createSourceFile(
  "docs-index.tsx",
  await readFile(resolve(root, "website/app/routes/docs-index.tsx"), "utf8"),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
const routeMessages = new Set();
const visit = (node) => {
  if (
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "t" &&
    node.arguments[0] &&
    ts.isStringLiteralLike(node.arguments[0])
  )
    routeMessages.add(node.arguments[0].text);
  ts.forEachChild(node, visit);
};
visit(route);
const messages = new Set([
  ...routeMessages,
  ...hub.learningPaths.flatMap(({ title, action }) => [title, action]),
  ...hub.appliedLearningPaths.flatMap(({ title, action }) => [title, action]),
  ...hub.learningBlockers.flatMap(({ question, action }) => [question, action]),
  starterGroup.title,
  starterGroup.description,
]);
const missing = [...messages].filter(
  (message) =>
    !Object.hasOwn(hub.chineseMessages, message) ||
    !hub.chineseMessages[message]?.trim() ||
    hub.chineseMessages[message] === message,
);
assert.deepEqual(
  missing,
  [],
  "Every learning-hub UI message needs a Chinese translation",
);

if (process.argv.includes("--built")) {
  const manifest = JSON.parse(
    await readFile(resolve(root, "dist/site-manifest.json"), "utf8"),
  );
  assert.match(manifest.base, /^\/(?:.*\/)?$/);
  for (const label of [
    "Templates & project notes",
    "Level design references",
    "Practice templates",
  ])
    assert.ok(
      Object.hasOwn(hub.chineseMessages, label) &&
        hub.chineseMessages[label] !== label,
      `New documentation grouping needs a Chinese translation: ${label}`,
    );
  const classIs = (node, name) =>
    (attributes(node).class || "").split(/\s+/).includes(name);
  const descendants = (node) => [
    node,
    ...(node.childNodes || []).flatMap(descendants),
  ];
  const normalized = (value) => value.replace(/\s+/g, " ").trim();
  const languages = hub.documentLanguages(documents);
  const hrefFor = (locale, slug) =>
    manifest.base.replace(/\/$/, "") +
    hub.localizedPath(`/docs/${slug}/`, locale, languages);
  const checkSidebar = (nodes, locale, page, articleSlug) => {
    const t = (message) => hub.translate(locale, message);
    const sidebars = nodes.filter(
      (node) =>
        node.tagName === "aside" && attributes(node).id === "nd-sidebar",
    );
    assert.equal(
      sidebars.length,
      1,
      `${page}: expected one desktop documentation sidebar`,
    );
    const sidebar = sidebars[0];
    const items = descendants(sidebar);
    const links = items.filter(
      (node) => node.tagName === "a" && attributes(node).href,
    );
    const path = (href) =>
      new URL(href, "https://learning.test").pathname.replace(/\/+$/, "") ||
      "/";
    const home =
      manifest.base.replace(/\/$/, "") +
      (locale === "zh" ? "/docs/zh/" : "/docs/");
    const navs = items.filter((node) => classIs(node, "docs-learn-nav"));
    assert.equal(
      navs.length,
      1,
      `${page}: sidebar needs the focused Learn navigation`,
    );
    const navLinks = descendants(navs[0]).filter(
      (node) => node.tagName === "a",
    );
    assert.equal(
      navLinks.length,
      1,
      `${page}: Learn navigation must have one document-home link`,
    );
    assert.equal(
      path(attributes(navLinks[0]).href),
      path(home),
      `${page}: Learn link must use the locale and built base`,
    );
    assert.equal(normalized(textContent(navLinks[0])), t("Guides & notes"));
    assert.equal(
      normalized(textContent(navs[0])).replace(/\s/g, ""),
      (t("Learn") + t("Guides & notes")).replace(/\s/g, ""),
      `${page}: Learn navigation must contain only its label and home link`,
    );
    assert.ok(
      !items.some((node) => classIs(node, "docs-pillar-rail")),
      `${page}: the four-pillar rail must not remain in the reading sidebar`,
    );
    for (const link of links) {
      const href = new URL(attributes(link).href, "https://learning.test");
      if (href.origin !== "https://learning.test") continue;
      const prefix = manifest.base.replace(/\/$/, "");
      const logical = href.pathname.startsWith(prefix + "/")
        ? href.pathname.slice(prefix.length)
        : href.pathname;
      assert.ok(
        !/^\/(?:zh\/)?(?:examples|resources|agents|testing|papers|research)(?:\/|$)/.test(
          logical,
        ),
        `${page}: sidebar must not link outside Learn: ${attributes(link).href}`,
      );
    }
    const separators = items.filter(
      (node) =>
        classIs(node, "docs-tree-label") &&
        normalized(textContent(node)) === t("Templates & project notes"),
    );
    assert.equal(
      separators.length,
      1,
      `${page}: expected the localized secondary-section separator`,
    );
    const beforeSeparator = items.slice(0, items.indexOf(separators[0]));
    const labels = beforeSeparator.filter((node) =>
      classIs(node, "docs-folder-label"),
    );
    const title = (node) => {
      const text = descendants(node).find((child) =>
        classIs(child, "docs-folder-title"),
      );
      assert.ok(
        text,
        `${page}: folder titles must be separate from their counts`,
      );
      return normalized(textContent(text));
    };
    assert.deepEqual(
      labels.map(title),
      navigation.slice(0, 5).map((group) => t(group.title)),
      `${page}: the five primary groups must precede secondary notes in navigation order`,
    );
    for (const [index, label] of labels.entries()) {
      let button = label.parentNode;
      while (button && button !== sidebar && button.tagName !== "button")
        button = button.parentNode;
      assert.ok(
        button?.tagName === "button",
        `${page}: primary folder must have an interactive button`,
      );
      const counts = descendants(label).filter((node) =>
        classIs(node, "docs-group-count"),
      );
      assert.equal(counts.length, 1);
      assert.equal(
        attributes(counts[0])["aria-hidden"],
        "true",
        `${page}: visual group counts must not enter the folder's accessible name`,
      );
      assert.equal(
        normalized(textContent(counts[0])),
        String(navigation[index].pages.length),
      );
    }
    for (const starter of hub.learningPaths) {
      const document = hub.learningDocument(documents, locale, starter.id);
      const leaves = links.filter(
        (link) =>
          path(attributes(link).href) === path(hrefFor(locale, document.slug)),
      );
      assert.equal(
        leaves.length,
        1,
        `${page}: starter ${starter.id} must be rendered in the initial sidebar`,
      );
      for (
        let node = leaves[0];
        node && node !== sidebar;
        node = node.parentNode
      ) {
        const attrs = attributes(node);
        assert.ok(
          !Object.hasOwn(attrs, "hidden") &&
            !Object.hasOwn(attrs, "inert") &&
            attrs["aria-hidden"] !== "true" &&
            attrs["data-state"] !== "closed" &&
            !/(?:display\s*:\s*none|visibility\s*:\s*hidden)/i.test(
              attrs.style || "",
            ),
          `${page}: starter ${starter.id} must be inside an expanded, non-hidden container`,
        );
      }
    }
    if (articleSlug) {
      assert.ok(
        !Object.hasOwn(attributes(navLinks[0]), "aria-current"),
        `${page}: document home must not be current on an article`,
      );
      const current = items.filter(
        (node) => attributes(node)["aria-current"] === "page",
      );
      assert.equal(
        current.length,
        1,
        `${page}: exactly one sidebar article leaf must be current`,
      );
      assert.equal(current[0].tagName, "a");
      assert.equal(
        path(attributes(current[0]).href),
        path(hrefFor(locale, articleSlug)),
        `${page}: the current leaf must identify the actual article`,
      );
    }
  };
  for (const locale of ["en", "zh"]) {
    const page = locale === "en" ? "docs/" : "docs/zh/";
    const { nodes } = parsePage(
      await readFile(resolve(root, "dist", page, "index.html"), "utf8"),
    );
    checkSidebar(nodes, locale, page);
    const t = (message) => hub.translate(locale, message);
    assert.ok(
      !nodes.some(
        (node) =>
          node.tagName === "meta" &&
          attributes(node)["http-equiv"]?.toLowerCase() === "refresh",
      ),
      `${page} must render the learning hub without redirecting`,
    );
    const headings = nodes.filter((node) => node.tagName === "h1");
    assert.equal(headings.length, 1, `${page} must have exactly one h1`);
    assert.equal(
      normalized(textContent(headings[0])),
      t("Game development handbook"),
    );
    const owners = nodes.filter((node) => classIs(node, "learn-hub"));
    assert.equal(owners.length, 1, `${page} must have one learning hub`);
    const ownerNodes = descendants(owners[0]);
    const cards = ownerNodes.filter((node) =>
      Object.hasOwn(attributes(node), "data-learning-path"),
    );
    assert.deepEqual(
      cards.map((node) => attributes(node)["data-learning-path"]).sort(),
      hub.learningPaths.map(({ id }) => id).sort(),
      `${page} must render exactly the three learning paths`,
    );
    for (const path of hub.learningPaths) {
      const card = cards.find(
        (node) => attributes(node)["data-learning-path"] === path.id,
      );
      const content = normalized(textContent(card));
      for (const message of [path.title, path.action])
        assert.ok(
          content.includes(normalized(t(message))),
          `${page}: ${path.id} is missing translated copy: ${message}`,
        );
      const document = hub.learningDocument(documents, locale, path.id);
      const links = descendants(card).filter(
        (node) =>
          node.tagName === "a" &&
          attributes(node).href === hrefFor(locale, document.slug),
      );
      assert.equal(
        links.length,
        1,
        `${page}: ${path.id} needs one base-aware localized document link`,
      );
      assert.equal(normalized(textContent(links[0])), t(path.title));
    }
    const blockerCards = ownerNodes.filter((node) =>
      classIs(node, "learn-blocker"),
    );
    for (const route of hub.appliedLearningPaths) {
      const panel = ownerNodes.find(
        (node) =>
          classIs(node, "learn-applied-path") &&
          descendants(node).some(
            (child) =>
              child.tagName === "h3" &&
              normalized(textContent(child)) === t(route.title),
          ),
      );
      assert.ok(panel, `${page}: missing ${route.title}`);
      for (const id of route.ids) {
        const document = hub.learningDocument(documents, locale, id);
        assert.ok(
          descendants(panel).some(
            (node) =>
              node.tagName === "a" &&
              attributes(node).href === hrefFor(locale, document.slug),
          ),
          `${page}: ${route.title} must link to ${id}`,
        );
      }
    }
    assert.equal(
      blockerCards.length,
      hub.learningBlockers.length,
      `${page}: all blocker routes must be rendered`,
    );
    for (const blocker of hub.learningBlockers) {
      const card = blockerCards.find((node) =>
        descendants(node).some(
          (child) =>
            child.tagName === "h3" &&
            normalized(textContent(child)) === t(blocker.question),
        ),
      );
      assert.ok(card, `${page}: missing blocker ${blocker.question}`);
      const links = descendants(card).filter((node) => node.tagName === "a");
      for (const id of blocker.ids) {
        const document = hub.learningDocument(documents, locale, id);
        const link = links.find(
          (node) => attributes(node).href === hrefFor(locale, document.slug),
        );
        assert.ok(
          link,
          `${page}: blocker link ${id} must use the current document language and base`,
        );
        assert.equal(normalized(textContent(link)), t(document.label));
      }
    }
    const library = ownerNodes.find((node) => classIs(node, "learn-library"));
    assert.ok(library, `${page} must retain the full document library`);
    const libraryLinks = new Set(
      descendants(library)
        .filter((node) => node.tagName === "a")
        .map((node) => attributes(node).href),
    );
    const translated = new Set(
      documents
        .filter(({ slug }) => slug.startsWith("zh/"))
        .map(({ slug }) => slug.slice(3)),
    );
    const selected = documents.filter(({ slug }) =>
      locale === "en"
        ? !slug.startsWith("zh/")
        : slug.startsWith("zh/") || !translated.has(slug),
    );
    assert.equal(
      libraryLinks.size,
      selected.length,
      `${page}: expose every registered document in the selected language`,
    );
    for (const document of selected)
      assert.ok(
        libraryLinks.has(hrefFor(locale, document.slug)),
        `${page}: document ${document.slug} is not discoverable in the hub library`,
      );
    for (const [title, prefix, count] of [
      ["Level design references", "skills/level-design/references/", 13],
      ["Practice templates", "skills/level-design/templates/", 3],
    ]) {
      const sections = descendants(library).filter(
        (node) =>
          classIs(node, "learn-library-section") &&
          descendants(node).some(
            (child) =>
              child.tagName === "h3" &&
              normalized(textContent(child)) === t(title),
          ),
      );
      assert.equal(
        sections.length,
        1,
        `${page}: library needs the localized ${title} subsection`,
      );
      let group = sections[0].parentNode;
      while (group && group !== library && group.tagName !== "details")
        group = group.parentNode;
      const summary = group?.childNodes.find(
        (node) => node.tagName === "summary",
      );
      assert.ok(
        summary &&
          normalized(textContent(summary)).startsWith(t("Skills & practice")),
        `${page}: ${title} belongs inside Skills & practice`,
      );
      const sectionLinks = descendants(sections[0])
        .filter((node) => node.tagName === "a")
        .map((node) => attributes(node).href);
      const expectedLinks = selected
        .filter(({ slug }) => slug.replace(/^zh\//, "").startsWith(prefix))
        .map(({ slug }) => hrefFor(locale, slug));
      assert.equal(expectedLinks.length, count);
      assert.equal(
        sectionLinks.length,
        count,
        `${page}: ${title} must retain all ${count} documents`,
      );
      assert.deepEqual(sectionLinks.sort(), expectedLinks.sort());
    }
    const rendered = normalized(
      [
        textContent(owners[0]),
        ...nodes.filter((node) => node.tagName === "title").map(textContent),
        ...nodes
          .filter(
            (node) =>
              node.tagName === "meta" &&
              attributes(node).name === "description",
          )
          .map((node) => attributes(node).content || ""),
      ].join(" "),
    );
    for (const message of [
      ...routeMessages,
      ...hub.learningBlockers.flatMap(({ question, action }) => [
        question,
        action,
      ]),
    ])
      assert.ok(
        rendered.includes(normalized(t(message))),
        `${page}: missing localized hub message: ${message}`,
      );
  }
  for (const locale of ["en", "zh"]) {
    const slug = `${locale === "zh" ? "zh/" : ""}guides/practical-guide`;
    const page = `docs/${slug}/`;
    const { nodes } = parsePage(
      await readFile(resolve(root, "dist", page, "index.html"), "utf8"),
    );
    checkSidebar(nodes, locale, page, slug);
  }
  const filterTargets = [
    ["resources", { collection: "tools" }],
    ["resources", { collection: "learning" }],
    ["resources", { collection: "reference" }],
    ["resources", { collection: "research" }],
    ["agents", { client: "codex", engine: "phaser" }],
    ["testing", { use: "pipeline", dimension: "3d", terms: "open" }],
    ["papers", { scope: "research" }],
  ];
  const pathname = (value) => value.replace(/\/+$/, "") || "/";
  const query = (params) => JSON.stringify([...params].sort());
  for (const locale of ["en", "zh"]) {
    const slug = `${locale === "zh" ? "zh/" : ""}guides/reading-guide`;
    const page = `docs/${slug}/`;
    const { nodes } = parsePage(
      await readFile(resolve(root, "dist", page, "index.html"), "utf8"),
    );
    const owners = nodes.filter(
      (node) => attributes(node)["data-content-key"] === `document:${slug}`,
    );
    assert.equal(
      owners.length,
      1,
      `${page}: expected the reading guide document`,
    );
    const bodies = descendants(owners[0]).filter((node) =>
      classIs(node, "reader-prose"),
    );
    assert.equal(bodies.length, 1, `${page}: expected one document body`);
    // Only real body anchors count. Navigation, metadata and serialized route
    // data cannot accidentally satisfy the query-link regression checks.
    const origin = "https://learning.test";
    const links = descendants(bodies[0])
      .filter((node) => node.tagName === "a" && attributes(node).href)
      .map(
        (node) => new URL(attributes(node).href, origin + manifest.base + page),
      )
      .filter(
        (link) =>
          link.search &&
          /\/(?:agents|resources|testing|papers)\/?$/.test(link.pathname),
      );
    const prefix =
      manifest.base.replace(/\/$/, "") + (locale === "zh" ? "/zh" : "");
    for (const link of links) {
      const target = link.pathname.replace(/\/$/, "").split("/").at(-1);
      assert.equal(
        link.origin,
        origin,
        `${page}: filtered ${target} link must remain internal`,
      );
      assert.equal(
        pathname(link.pathname),
        `${prefix}/${target}`,
        `${page}: filtered ${target} link must preserve the built base and current locale`,
      );
    }
    for (const [target, params] of filterTargets) {
      const expectedPath = `${prefix}/${target}`;
      const expectedQuery = query(new URLSearchParams(params));
      assert.ok(
        links.some(
          (link) =>
            pathname(link.pathname) === expectedPath &&
            query(link.searchParams) === expectedQuery,
        ),
        `${page}: missing localized body link ${expectedPath}?${new URLSearchParams(params)}`,
      );
    }
  }
  console.log(
    "Built learning hub passed: focused Learn sidebars, five primary groups, expanded starter links, unique current article, full document discovery, translated copy, no redirect, and all seven reading-guide filter links in both languages.",
  );
}
console.log(
  `Learning hub source checks passed: ${hub.learningPaths.length} starter paths, ${hub.learningBlockers.length} blockers, ${ids.size} bilingual document targets and ${messages.size} localized messages.`,
);
