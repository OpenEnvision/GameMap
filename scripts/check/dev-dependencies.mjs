import assert from "node:assert/strict";
import { readFile, realpath, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadConfigFromFile, parseAst } from "vite";

const root = fileURLToPath(new URL("../../", import.meta.url));
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
let optimized = false;
let baselinePath;
for (let index = 0; index < args.length; index++) {
  if (args[index] === "--optimized") optimized = true;
  else if (args[index] === "--baseline") {
    baselinePath = args[++index];
    assert.ok(
      baselinePath && !baselinePath.startsWith("--"),
      "--baseline requires a saved metadata JSON path",
    );
    optimized = true;
  } else throw new Error(`Unknown argument: ${args[index]}`);
}

async function installedManifest(entry, name) {
  let directory = dirname(entry);
  for (;;) {
    try {
      const manifest = JSON.parse(
        await readFile(resolve(directory, "package.json"), "utf8"),
      );
      if (manifest.name === name) return manifest;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const parent = dirname(directory);
    assert.notEqual(
      parent,
      directory,
      `Cannot find installed ${name} manifest`,
    );
    directory = parent;
  }
}

// Only load the real config export. resolveConfig(serve) also executes Router's
// typegen watcher and child compiler hooks; those are outside this read-only audit.
const loaded = await loadConfigFromFile(
  { command: "serve", mode: "development" },
  resolve(root, "vite.config.ts"),
  root,
  "warn",
);
assert.ok(loaded, "Vite configuration must load");
const config = loaded.config;
const uiEntry = require.resolve("fumadocs-ui/provider/react-router");
const ui = await installedManifest(uiEntry, "fumadocs-ui");
const radix = Object.keys(ui.dependencies || {})
  .filter((name) => name.startsWith("@radix-ui/"))
  .sort();
assert.ok(
  radix.length > 0,
  "Installed Fumadocs UI must declare its Radix dependencies",
);
const included = config.optimizeDeps?.include || [];
for (const name of radix)
  assert.ok(
    included.includes(name),
    `Vite must pre-optimize installed Fumadocs dependency ${name}`,
  );

const canonicalReact = await realpath(require.resolve("react"));
const runtimeConsumers = [
  "lucide-react",
  "next-themes",
  "@fuma-translate/react",
];
const consumers = [
  ["application", require.resolve("react")],
  ["react-dom", require.resolve("react-dom")],
  ["react-dom/client", require.resolve("react-dom/client")],
  ["react-router", require.resolve("react-router")],
  ["react-router/dom", require.resolve("react-router/dom")],
  ["fumadocs-ui/provider/react-router", uiEntry],
  ["fumadocs-ui/layouts/docs", require.resolve("fumadocs-ui/layouts/docs")],
  ...radix.map((name) => [name, require.resolve(name)]),
  ...runtimeConsumers.map((name) => [name, require.resolve(name)]),
];
for (const [name, entry] of consumers) {
  const consumerReact = await realpath(createRequire(entry).resolve("react"));
  assert.equal(
    consumerReact,
    canonicalReact,
    `${name} resolves a different installed React`,
  );
}
const react = await installedManifest(canonicalReact, "react");
const dom = await installedManifest(
  require.resolve("react-dom/client"),
  "react-dom",
);
assert.equal(
  dom.version,
  react.version,
  "React and its DOM renderer must use the same version",
);
console.log(
  `Dev dependency configuration passed: all ${radix.length} installed Fumadocs Radix dependencies are explicitly included; ${consumers.length} consumers resolve React ${react.version} at one real path.`,
);

if (optimized) {
  const deps = resolve(root, config.cacheDir || "node_modules/.vite", "deps");
  const metadataPath = resolve(deps, "_metadata.json");
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  assert.ok(
    typeof metadata.browserHash === "string" && metadata.browserHash,
    "Optimized metadata must contain browserHash",
  );
  // Utility dependencies need real pre-bundles too, although they need not use React.
  for (const name of included) {
    const info = metadata.optimized?.[name];
    assert.ok(
      info?.file,
      `Explicitly included dependency ${name} is absent from the running optimized metadata`,
    );
    const artifact = await stat(resolve(deps, info.file));
    assert.ok(
      artifact.isFile() && artifact.size > 0,
      `${name} has no usable optimized artifact`,
    );
  }
  if (baselinePath) {
    const baseline = JSON.parse(await readFile(resolve(baselinePath), "utf8"));
    assert.ok(
      typeof baseline.browserHash === "string" && baseline.browserHash,
      "Baseline must be a saved optimization metadata JSON with browserHash",
    );
    assert.equal(
      metadata.browserHash,
      baseline.browserHash,
      "Optimized browserHash changed after the saved stable baseline; a late optimization or config/dependency change occurred",
    );
  }
  const roots = [
    "react",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
    "react-dom",
    "react-dom/client",
    "react-router",
    "react-router/dom",
    ...radix,
    ...runtimeConsumers,
  ];
  const graph = new Map();
  async function inspect(url) {
    if (graph.has(url.href)) return;
    const filename = fileURLToPath(url);
    const within = relative(deps, filename);
    assert.ok(
      within && !within.startsWith(`..${sep}`) && within !== "..",
      `Optimized import escapes the dependency directory: ${url.href}`,
    );
    const source = await readFile(filename, "utf8");
    const imports = parseAst(source)
      .body.filter(
        (node) =>
          [
            "ImportDeclaration",
            "ExportNamedDeclaration",
            "ExportAllDeclaration",
          ].includes(node.type) && node.source,
      )
      .map((node) => node.source.value);
    const children = imports.map((specifier) => {
      assert.ok(
        specifier.startsWith("."),
        `Optimized module ${within} retains non-local import ${specifier}`,
      );
      return new URL(specifier, url);
    });
    graph.set(url.href, {
      children: children.map((child) => child.href),
      // Detect the implementation itself, not consumers or jsx-runtime wrappers.
      react:
        /node_modules\/react\/cjs\/react\.(?:development|production)(?:\.min)?\.js["\n]/.test(
          source,
        ),
    });
    for (const child of children) await inspect(child);
  }
  const entryUrls = new Map();
  for (const name of roots) {
    const info = metadata.optimized?.[name];
    assert.ok(
      info?.file,
      `${name} was not pre-optimized in the running development cache`,
    );
    const url = pathToFileURL(resolve(deps, info.file));
    entryUrls.set(name, url.href);
    await inspect(url);
  }
  const implementationUrls = [...graph]
    .filter(([, node]) => node.react)
    .map(([url]) => url);
  assert.equal(
    implementationUrls.length,
    1,
    `Expected one shared optimized React implementation; found ${implementationUrls.join(", ") || "none"}`,
  );
  function implementationsFor(url, seen = new Set()) {
    if (seen.has(url)) return [];
    seen.add(url);
    const node = graph.get(url);
    return [
      ...(node.react ? [url] : []),
      ...node.children.flatMap((child) => implementationsFor(child, seen)),
    ];
  }
  for (const [name, url] of entryUrls)
    assert.deepEqual(
      implementationsFor(url),
      implementationUrls,
      `${name} must reach the same optimized React implementation`,
    );
  const finalMetadata = JSON.parse(await readFile(metadataPath, "utf8"));
  assert.equal(
    finalMetadata.browserHash,
    metadata.browserHash,
    "Dependency optimization changed while checking the import graph; wait for it to settle and retry",
  );
  console.log(
    `Optimized dev dependencies passed: all ${included.length} explicitly included dependencies have artifacts; ${roots.length} React/DOM/Router/Radix/runtime entries share one React implementation across ${graph.size} actual ESM files; browserHash ${metadata.browserHash}${baselinePath ? " matches baseline" : ""}.`,
  );
}
