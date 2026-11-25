import { readdir, readFile } from "node:fs/promises";
import { posix } from "node:path";
import { canonicalValue } from "../catalog/codec.mjs";
import { createHash } from "node:crypto";
import chineseCatalog from "./catalog.zh.json" with { type: "json" };
import chineseMessages from "../../../website/content/i18n/zh.json" with { type: "json" };
import resourceMessages from "../../../website/content/i18n/content/resources.zh.json" with { type: "json" };
import importedMessages from "../../../website/content/i18n/content/approved-imported-cases.zh.json" with { type: "json" };
import resourceTranslationSources from "../../../website/content/i18n/content.zh.sources.json" with { type: "json" };
const chineseResources = { ...resourceMessages, ...importedMessages };
const taxonomy = JSON.parse(
  await readFile(
    new URL("../../../website/content/taxonomy.json", import.meta.url),
    "utf8",
  ),
);
export const categories = Object.entries(taxonomy.categories).map(
  ([id, { documentLabel }]) => [id, documentLabel],
);
export const types = taxonomy.types;
export const stages = Object.fromEntries(
  Object.entries(taxonomy.stages).map(([id, entry]) => [
    id,
    entry.documentLabel,
  ]),
);
const accessKinds = Object.keys(taxonomy.accessKinds);
export function catalogSegmentRule(path, contracts) {
  const rule = contracts[path]?.exports?.default;
  if (typeof rule?.kind !== "string" || !rule.kind.trim())
    throw Error(
      `Unclassified segment ${path}: declare exports.default.kind in website/content/sources.config.json`,
    );
  if (rule.kind === "resource" && rule.shape !== "array")
    throw Error(`Resource segment must declare array shape: ${path}`);
  return rule;
}
export async function loadCatalog() {
  const files = (
    await readdir(new URL("../../../data/segments/", import.meta.url))
  )
    .filter((f) => f.endsWith(".json"))
    .sort();
  const contracts = JSON.parse(
    await readFile(
      new URL("../../../website/content/sources.config.json", import.meta.url),
      "utf8",
    ),
  );
  const sections = await Promise.all(
    files.map(async (f) => {
      const rule = catalogSegmentRule("data/segments/" + f, contracts);
      if (rule.kind !== "resource") return [];
      const section = JSON.parse(
        await readFile(
          new URL("../../../data/segments/" + f, import.meta.url),
          "utf8",
        ),
      );
      if (!Array.isArray(section))
        throw Error(
          `Unclassified segment ${f}: declare its kind in website/content/sources.config.json`,
        );
      return section;
    }),
  );
  const all = sections.flat();
  const records = categories.flatMap(([id]) =>
    all.filter((r) => r.category === id),
  );
  if (records.length !== all.length)
    throw Error("Unknown category in data segments");
  return records;
}
export function validate(records) {
  const ids = new Set(),
    urls = new Set();
  const dimensions = Object.keys(taxonomy.dimensions);
  const collections = Object.keys(taxonomy.collections);
  for (const r of records) {
    for (const key of [
      "id",
      "name",
      "category",
      "type",
      "collection",
      "summary",
      "detail",
      "url",
      "verified",
    ])
      if (typeof r[key] !== "string" || !r[key].trim())
        throw Error(`Missing ${key}: ${r.id}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))
      throw Error(`Invalid ID: ${r.id}`);
    if (ids.has(r.id)) throw Error(`Duplicate ID: ${r.id}`);
    ids.add(r.id);
    if (!categories.some(([id]) => id === r.category) || !types[r.type])
      throw Error(`Invalid taxonomy: ${r.id}`);
    if (!collections.includes(r.collection))
      throw Error(`Invalid collection: ${r.id}`);
    if (["paper", "benchmark"].includes(r.type) && r.collection !== "research")
      throw Error(
        `Papers and benchmarks belong in the research collection: ${r.id}`,
      );
    for (const [field, allowed] of [
      ["tags", null],
      ["stages", Object.keys(stages)],
      ["dimensions", dimensions],
    ]) {
      if (
        !Array.isArray(r[field]) ||
        !r[field].length ||
        r[field].some(
          (v) =>
            typeof v !== "string" ||
            !v.trim() ||
            (allowed && !allowed.includes(v)),
        )
      )
        throw Error(`Invalid ${field}: ${r.id}`);
      if (new Set(r[field]).size !== r[field].length)
        throw Error(`Duplicate ${field}: ${r.id}`);
    }
    const checkUrl = (u) => {
      const url = new URL(u);
      if (url.protocol !== "https:") throw Error(`Use HTTPS: ${u}`);
    };
    checkUrl(r.url);
    if (urls.has(r.url.replace(/\/$/, "")))
      throw Error(`Duplicate primary URL: ${r.url}`);
    urls.add(r.url.replace(/\/$/, ""));
    if (r.links) {
      if (!Array.isArray(r.links)) throw Error(`Invalid links: ${r.id}`);
      for (const l of r.links) {
        if (typeof l.label !== "string" || !l.label)
          throw Error(`Invalid link label: ${r.id}`);
        checkUrl(l.url);
      }
    }
    if (r.access) {
      for (const key of ["tutorial", "demo", "source"]) {
        const link = r.access[key];
        if (
          !link ||
          typeof link.label !== "string" ||
          !link.label.trim() ||
          typeof link.note !== "string" ||
          !link.note.trim() ||
          !accessKinds.includes(link.kind)
        )
          throw Error(`Invalid ${key} access: ${r.id}`);
        if (link.kind === "unavailable") {
          if (link.url !== undefined)
            throw Error(`Unavailable link must not have a URL: ${r.id}/${key}`);
        } else checkUrl(link.url);
      }
    }
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(r.verified) ||
      Number.isNaN(Date.parse(r.verified))
    )
      throw Error(`Invalid verification date: ${r.id}`);
    if (
      r.year !== undefined &&
      (!Number.isInteger(r.year) ||
        r.year < 1990 ||
        r.year > new Date().getFullYear() + 1)
    )
      throw Error(`Invalid year: ${r.id}`);
  }
  return records;
}
const tableSafe = (s) => s.replaceAll("|", "\\|").replaceAll("\n", " ");
// The current location plus historical ones whose stored bodies must still render.
const catalogSources = [
  "docs/reference/catalog.md",
  "docs/zh/reference/catalog.md",
  "docs/AWESOME.md",
  "AWESOME.md",
];
function translatedResource(record) {
  const key = `resource:${record.id}`;
  const translation = chineseResources[key];
  const values = {};
  for (const field of ["name", "summary", "detail"]) {
    if (field === "name" && !translation?.name) continue;
    if (typeof translation?.[field] !== "string" || !translation[field].trim())
      throw Error(`Missing Chinese catalog translation: ${key}.${field}`);
    const hash = createHash("sha256")
      .update(JSON.stringify(record[field]))
      .digest("hex");
    if (resourceTranslationSources[key]?.[field] !== hash)
      throw Error(`Stale Chinese catalog translation: ${key}.${field}`);
    values[field] = translation[field];
  }
  return { ...record, ...values };
}

export function renderAwesome(
  records,
  { source = "AWESOME.md", locale = "en" } = {},
) {
  if (!catalogSources.includes(source))
    throw Error("Unsupported resource catalog source path");
  if (!["en", "zh"].includes(locale))
    throw Error(`Unsupported resource catalog locale: ${locale}`);
  records = canonicalValue(records);
  if (locale === "zh") records = records.map(translatedResource);
  const t = (value) =>
    locale === "zh"
      ? chineseCatalog.labels[value] || chineseMessages[value] || value
      : value;
  const note = (value) => {
    if (locale === "en") return value;
    const translated = chineseCatalog.notes[value];
    if (!translated)
      throw Error(`Missing Chinese catalog access note: ${value}`);
    return translated;
  };
  const total = records.length;
  let text = `# Awesome AI Game Development

> Pick a tool after checking what it can hand back to your game project.

This catalog lists **${total} resources** across engines, assets, coding agents, production, and research. Review dates appear with each entry. Check the source and released version before acting on an integration note.

- [Interactive GameMap website — GitHub Pages](https://openenvision.github.io/GameMap/)
- [A practical guide from resources to a working project](docs/guides/practical-guide.md)
- [Production research: interfaces, evidence and generative-service boundaries](docs/production/overview.md)
- [Tutorials, playable demos, and complete example-game source](docs/tutorials-and-demos.md)
- [Coding agents × games: skills, bridges, evaluations, and game code](docs/coding-agent-game-code.md)
- [Testing library: games, AI environments, assets, rigs, and motion data](docs/reference/testing-library.md)
- [Contributing and data maintenance](CONTRIBUTING.md) · [Structured JSON](data/resources.json)

## How to read the map

| Layer | What it addresses | Evidence to look for |
| --- | --- | --- |
| Model / coding agent / harness | Reasoning, code changes, and tool execution | Actual tools, runtime feedback, and supported tasks |
| Skill / MCP / CLI | Domain knowledge and engine editing | Real SKILL.md files, protocols, and editor operations |
| Framework / tool | Organizing generation or completing a production task | Inputs, outputs, project formats, and release status |
| Benchmark | Repeatable development evaluation | Tasks, scoring scripts, environments, and versions |
| Paper / world model | Executable state, neural simulation, or hybrid rendering | World representation, action interface, long-term consistency, and public availability |

**Example.** If you need to replace one rigged character, check the source format, the included textures and animation, and whether your engine can open the exported asset. Use the detail section of a candidate to find its deliverables before trying the demo. For a study of game agents, start from the action interface and the available evaluation artifacts. A world-model recording can show what the renderer produced from a specific input; it leaves scene editing and game-state access to be checked separately.

## Contents

`;
  if (locale === "zh")
    text =
      chineseCatalog.introduction.replace("{total}", String(total)) + "\n\n";
  categories.forEach(([id, title], i) => {
    text += `- [${i + 1}. ${t(title)}](#${id}) — ${records.filter((r) => r.category === id).length} ${t("resources")}\n`;
  });
  text += "\n";
  for (const [id, title] of categories) {
    const section = records.filter((r) => r.category === id);
    text += `<a id="${id}"></a>\n\n## ${t(title)}\n\n`;
    for (const [type, label] of Object.entries(types)) {
      const group = section.filter((r) => r.type === type);
      if (!group.length) continue;
      text += `### ${t(label)}\n\n| ${t("Resource")} | ${t("Purpose and scope")} | ${t("Collection")} | ${t("Stages")} |\n| --- | --- | --- | --- |\n`;
      for (const r of group)
        text += `| [${tableSafe(r.name)}](${r.url})${r.year ? " · " + r.year : ""} | ${tableSafe(r.summary)} | ${t(taxonomy.collections[r.collection].label)} | ${r.stages.map((s) => t(stages[s])).join(" / ")} |\n`;
      text += `\n<details>\n<summary>${t("Inputs, outputs, limitations, and further reading")}</summary>\n\n`;
      for (const r of group) {
        text += `**[${r.name}](${r.url})**\n\n${r.detail}\n\n${t("Tags")}: ${r.tags.map((tag) => "`" + tag + "`").join(" · ")}. ${t("Source reviewed")}: ${r.verified}.`;
        if (r.links?.length)
          text +=
            ` ${t("Further reading")}: ` +
            r.links.map((l) => `[${t(l.label)}](${l.url})`).join(" · ");
        text += "\n\n";
        if (r.access)
          for (const [key, link] of Object.entries(r.access))
            text += `- **${t(key[0].toUpperCase() + key.slice(1))} · ${t(link.kind)}:** ${link.url ? `[${t(link.label)}](${link.url})` : t(link.label)}. ${note(link.note)}\n`;
        if (r.access) text += "\n";
      }
      text += "</details>\n\n";
    }
  }
  const ending = `## Further reading and practice

- [Agents: models, harnesses, skills, and MCP](docs/ecosystem/agents.md)
- [Engine ecosystems: documentation, source, tests, and community practice](docs/ecosystem/engines.md)
- [AI for 2D and 3D: evaluation versions, asset pipelines, and release boundaries](docs/ecosystem/2d-3d-development.md)
- [World models: code state, hybrid rendering, video simulation, and explicit 3D](docs/ecosystem/world-models.md)
- [Practical guide: task contracts, asset import, validation, and reproduction](docs/guides/practical-guide.md)

## Maintenance

Edit only \`data/segments/*.json\` for catalog content. Run \`npm run build\` to regenerate the list and website, and \`npm run check\` to validate the data and generated outputs. There is no automatic scraping or scheduled updating. Code, weights, data, and services may have different licenses; read the relevant official terms before use. External projects belong to their respective authors.
`;
  text += locale === "zh" ? chineseCatalog.ending + "\n" : ending;
  // Links above are written from the repository root; rebase them onto the output file.
  const directory = posix.dirname(source);
  return text.replace(
    /\]\(((?:docs\/|data\/|CONTRIBUTING\.md)[^)#]*)(#[^)]*)?\)/g,
    (_, path, fragment = "") =>
      `](${posix.relative(directory, path)}${fragment})`,
  );
}
