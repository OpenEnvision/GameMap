import assert from "node:assert/strict";
import { build } from "esbuild";
import { loadContentRuntime } from "../lib/content.mjs";
import { root } from "../lib/documents.mjs";

const bundle = await build({
  stdin: {
    contents:
      "export * from './website/content/agent-browser'; export * from './website/content/agent-presentation';",
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
  define: { "import.meta.env.BASE_URL": JSON.stringify("/") },
});
const browser = await import(
  "data:text/javascript;base64," +
    Buffer.from(bundle.outputFiles[0].text).toString("base64")
);
const runtime = await loadContentRuntime("/", {});
const english = runtime.createRegistry(runtime.sources, []).all("agent");
const chinese = runtime
  .localizedRegistry(runtime.createRegistry(runtime.sources, []), "zh")
  .all("agent");
const options = browser.agentBrowserOptions(english);
const search = browser.buildAgentSearchText(english, chinese);
const filters = (query) =>
  browser.normalizeAgentFilters(new URLSearchParams(query), options);
const select = (entries, query) =>
  browser.selectAgentEntries(
    entries,
    filters(query),
    search,
    options.entryEngines,
  );
const ids = (entries) => entries.map((entry) => entry.id).sort();

assert.deepEqual(
  filters(
    "client=not-real&kind=not-real&engine=not-real&q=%20Godot%20&includeGeneral=true",
  ),
  {
    query: "Godot",
    client: "all",
    kind: "all",
    engine: "all",
    includeGeneral: false,
  },
);
assert.equal(select(english, "client=not-real").length, english.length);
assert.equal(select(english, "kind=not-real").length, english.length);
assert.ok(
  options.clients.every(({ id, count }) => id !== "agent-neutral" && count > 0),
);
for (const { id, count } of options.clients)
  assert.equal(
    count,
    english.filter((entry) => browser.agentClientIds(entry.data).includes(id))
      .length,
  );
for (const { id } of options.clients)
  assert.ok(
    english.some((entry) => browser.agentClientIds(entry.data).includes(id)),
  );

const qoder = english.find((entry) => entry.id === "qoder-cn-mcp-client");
assert.ok(qoder, "Keep the explicitly named Qoder client fixture");
assert.deepEqual(
  qoder.data.agents,
  ["other"],
  "Preserve frozen v1 attribution",
);
assert.deepEqual(browser.agentClientIds(qoder.data), ["qoder"]);
assert.equal(filters("client=qoder").client, "qoder");
assert.deepEqual(ids(select(english, "client=qoder")), [qoder.id]);
assert.deepEqual(ids(select(chinese, "client=qoder")), [qoder.id]);
assert.ok(
  !select(english, "client=other").some((entry) => entry.id === qoder.id),
);
assert.equal(browser.agentClientLabels.qoder, "Qoder");
assert.ok(runtime.matchesSearch(search[qoder.id], "Qoder"));
for (const entries of [english, chinese]) {
  const results = select(entries, "q=Qoder");
  assert.equal(results[0]?.id, qoder.id);
  assert.equal(
    browser.groupAgentEntries(results, options.kinds, "Qoder")[0]?.entries[0]
      ?.id,
    qoder.id,
    "An exact client title leads even when another category mentions it",
  );
  const find = (query) => select(entries, new URLSearchParams({ q: query }));
  assert.deepEqual(ids(find("GodotMCP")), ids(find("Godot MCP")));
  assert.deepEqual(ids(find("Codex，Godot")), ids(find("Codex Godot")));
  assert.deepEqual(ids(find("Codex+Godot")), ids(find("Codex Godot")));
}

const cleared = browser.updateAgentQuery(
  new URLSearchParams(
    "q=old&client=codex&kind=bridge&engine=godot&includeGeneral=1&utm_source=review",
  ),
  Object.fromEntries(browser.agentFilterKeys.map((key) => [key, null])),
  options,
);
assert.equal(cleared.toString(), "utm_source=review");
const typedAfterClear = browser.updateAgentQuery(
  cleared,
  { q: "Unity" },
  options,
);
assert.equal(typedAfterClear.get("q"), "Unity");
assert.equal(typedAfterClear.get("client"), null);
assert.equal(typedAfterClear.get("kind"), null);
assert.equal(typedAfterClear.get("engine"), null);
assert.equal(typedAfterClear.get("includeGeneral"), null);
assert.equal(typedAfterClear.get("utm_source"), "review");
const rapidSelection = browser.updateAgentQuery(
  browser.updateAgentQuery(new URLSearchParams(), { client: "qoder" }, options),
  { engine: "neutral" },
  options,
);
assert.equal(rapidSelection.get("client"), "qoder");
assert.equal(rapidSelection.get("engine"), "neutral");
assert.equal(
  browser
    .updateAgentQuery(
      new URLSearchParams("client=invalid&kind=invalid&includeGeneral=1"),
      { client: "agent-neutral", q: "MCP" },
      options,
    )
    .toString(),
  "client=agent-neutral&q=MCP",
);

const bridges = english.filter((entry) => entry.data.kind === "bridge");
assert.deepEqual(Object.keys(browser.agentConnections).sort(), ids(bridges));
for (const entry of bridges) {
  const connection = browser.agentConnections[entry.id];
  assert.ok(
    connection.deployment && connection.connection && connection.prerequisites,
  );
  assert.ok(
    [entry.data.sourceUrl, entry.data.codeUrl, entry.data.evidenceUrl].includes(
      connection.setupUrl,
    ),
    `${entry.id}: setup must link a cited source rather than an inferred endpoint`,
  );
}

const neutral = english.filter((entry) =>
  entry.data.agents.includes("agent-neutral"),
);
assert.ok(neutral.length > 0, "Keep a real general-tool fixture");
assert.deepEqual(ids(select(english, "client=agent-neutral")), ids(neutral));
const explicitCodex = english.filter((entry) =>
  entry.data.agents.includes("codex"),
);
assert.ok(
  explicitCodex.length > 0,
  "Keep a real explicitly attributed client fixture",
);
assert.deepEqual(ids(select(english, "client=codex")), ids(explicitCodex));
const withGeneral = english.filter((entry) =>
  entry.data.agents.some((id) => ["codex", "agent-neutral"].includes(id)),
);
assert.deepEqual(
  ids(select(english, "client=codex&includeGeneral=1")),
  ids(withGeneral),
);
assert.ok(withGeneral.length > explicitCodex.length);
assert.equal(select(english, "includeGeneral=1").length, english.length);

assert.deepEqual(
  browser.agentEngineFamilies(
    "Engine-neutral · headless CI / browser playtests",
  ),
  ["neutral"],
);
assert.deepEqual(
  browser.agentEngineFamilies("Engine-agnostic · primarily 3D level design"),
  ["neutral"],
);
assert.deepEqual(
  browser.agentEngineFamilies("Godot 4 · Unity · runtime instrumentation"),
  ["godot", "unity"],
);
assert.deepEqual(
  browser.agentEngineFamilies("Game backend services · AGS API / Extend SDK"),
  ["other"],
);
assert.deepEqual(
  browser.agentEngineFamilies("Unity Editor · TypeScript MCP tooling"),
  ["unity"],
  "A bridge implementation language must not imply browser-game support",
);
for (const { id, count } of options.engines) {
  assert.ok(count > 0, `Hide empty engine family: ${id}`);
  assert.equal(
    count,
    english.filter((entry) => options.entryEngines[entry.id].includes(id))
      .length,
  );
}
const combination = select(
  english,
  "client=codex&includeGeneral=1&engine=godot&kind=bridge",
);
assert.ok(
  combination.length > 0,
  "Exercise a real combined engine/client/kind filter",
);
assert.ok(combination.every((entry) => entry.data.kind === "bridge"));
assert.ok(
  combination.every((entry) =>
    options.entryEngines[entry.id].includes("godot"),
  ),
);
assert.ok(!combination.some((entry) => entry.id === "level-design-book-skill"));
assert.deepEqual(
  ids(combination),
  ids(
    select(chinese, "client=codex&includeGeneral=1&engine=godot&kind=bridge"),
  ),
  "Engine grouping uses canonical scope, independent of translated engine prose",
);
assert.deepEqual(
  ids(select(english, "engine=neutral")),
  ids(select(chinese, "engine=neutral")),
);

for (const query of [
  "Development frameworks",
  "开发框架",
  "Agent-neutral tools",
  "通用工具",
  "bridge",
  "Godot",
]) {
  const params = new URLSearchParams({ q: query }).toString();
  assert.deepEqual(
    ids(select(english, params)),
    ids(select(chinese, params)),
    `Bilingual agent search must not depend on the current page language: ${query}`,
  );
}
for (const entry of english.filter((entry) => entry.data.kind === "framework"))
  for (const query of ["Development frameworks", "开发框架"])
    assert.ok(runtime.matchesSearch(search[entry.id], query));

console.log(
  `Agent-browser regressions passed: ${english.length} entries, ${options.clients.length} explicit client options, ${options.engines.length} engine families; normalized filters, strict attribution, optional general tools, and bilingual search.`,
);
