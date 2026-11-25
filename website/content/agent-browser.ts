import type { ContentEntry } from "./models";
import { agentResourceKinds } from "../src/data/agentGameTypes";
import { agentClientIds, agentClientLabels } from "./agent-presentation";
import {
  compareDirectoryTitles,
  parseDirectorySearchQuery,
} from "./directory-search";
import { matchesSearch } from "./matching";
import { searchableText } from "./search";
import { translate } from "./locale";

type AgentEntry = ContentEntry<"agent">;
export interface AgentBrowserOption {
  id: string;
  label: string;
  count: number;
}
export type AgentEngineMap = Readonly<Record<string, readonly string[]>>;
export interface AgentBrowserOptions {
  clients: AgentBrowserOption[];
  kinds: AgentBrowserOption[];
  engines: AgentBrowserOption[];
  entryEngines: Record<string, string[]>;
}
export interface AgentBrowserFilters {
  query: string;
  client: string;
  kind: string;
  engine: string;
  includeGeneral: boolean;
}

const engineFamilies = [
  { id: "godot", label: "Godot", pattern: /\bgodot\b/i },
  { id: "unity", label: "Unity", pattern: /\bunity\b/i },
  { id: "unreal", label: "Unreal", pattern: /\b(?:unreal|ue[4-9])\b/i },
  { id: "roblox", label: "Roblox", pattern: /\broblox\b/i },
  { id: "phaser", label: "Phaser", pattern: /\bphaser\b/i },
  {
    id: "web",
    label: "Web / browser",
    pattern: /\b(?:web|browser|webassembly|wasm|html5?|canvas|webgl)\b/i,
  },
  { id: "gdevelop", label: "GDevelop", pattern: /\bgdevelop\b/i },
  { id: "cocos", label: "Cocos", pattern: /\bcocos\b/i },
  { id: "pixijs", label: "PixiJS", pattern: /\bpixi(?:\.?js)?\b/i },
  { id: "blender", label: "Blender", pattern: /\bblender\b/i },
] as const;
const engineLabels = [
  ...engineFamilies,
  { id: "neutral", label: "Engine-neutral / agnostic" },
  { id: "other", label: "Other engine / service" },
];

/** Describes explicitly named scope, never inferred cross-engine compatibility. */
export function agentEngineFamilies(engine: string): string[] {
  if (/\bengine[-\s]+(?:neutral|agnostic|independent)\b/i.test(engine))
    return ["neutral"];
  const named = engineFamilies
    .filter(({ pattern }) => pattern.test(engine))
    .map(({ id }) => id);
  return named.length ? named : ["other"];
}

/** Pass canonical English entries so translated scope text cannot change grouping. */
export function agentBrowserOptions(
  entries: readonly AgentEntry[],
): AgentBrowserOptions {
  const entryEngines = Object.fromEntries(
    entries.map((entry) => [entry.id, agentEngineFamilies(entry.data.engine)]),
  );
  const clients = Object.entries(agentClientLabels)
    .filter(([id]) => id !== "agent-neutral")
    .map(([id, label]) => ({
      id,
      label,
      count: entries.filter((entry) => agentClientIds(entry.data).includes(id))
        .length,
    }))
    .filter(({ count }) => count > 0);
  const kinds = Object.entries(agentResourceKinds)
    .map(([id, label]) => ({
      id,
      label,
      count: entries.filter((entry) => entry.data.kind === id).length,
    }))
    .filter(({ count }) => count > 0);
  const engines = engineLabels
    .map(({ id, label }) => ({
      id,
      label,
      count: entries.filter((entry) => entryEngines[entry.id].includes(id))
        .length,
    }))
    .filter(({ count }) => count > 0);
  return { clients, kinds, engines, entryEngines };
}

const supported = (
  value: string | null,
  options: readonly AgentBrowserOption[],
) => (options.some(({ id }) => id === value) ? value! : "all");

export function normalizeAgentFilters(
  params: URLSearchParams,
  options: AgentBrowserOptions,
): AgentBrowserFilters {
  const client = params.get("client");
  return {
    query: params.get("q")?.trim() || "",
    client:
      client === "agent-neutral" ? client : supported(client, options.clients),
    kind: supported(params.get("kind"), options.kinds),
    engine: supported(params.get("engine"), options.engines),
    includeGeneral: params.get("includeGeneral") === "1",
  };
}

export const agentFilterKeys = [
  "q",
  "client",
  "kind",
  "engine",
  "includeGeneral",
] as const;

/** Compose against the current URL, including edits made before a loader settles. */
export function updateAgentQuery(
  previous: URLSearchParams,
  changes: Partial<Record<(typeof agentFilterKeys)[number], string | null>>,
  options: AgentBrowserOptions,
) {
  const next = new URLSearchParams(previous);
  const normalized = normalizeAgentFilters(next, options);
  for (const key of ["client", "kind", "engine"] as const)
    if (next.has(key) && next.get(key) !== normalized[key]) next.delete(key);
  for (const [key, value] of Object.entries(changes)) {
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
  }
  if (
    Object.hasOwn(changes, "client") &&
    (!changes.client ||
      changes.client === "all" ||
      changes.client === "agent-neutral")
  )
    next.delete("includeGeneral");
  return next;
}

export function selectAgentEntries(
  entries: readonly AgentEntry[],
  filters: AgentBrowserFilters,
  searchText?: Readonly<Record<string, string>>,
  entryEngines?: AgentEngineMap,
): AgentEntry[] {
  const query = parseDirectorySearchQuery(filters.query);
  const matched = entries.filter((entry) => {
    const agents = agentClientIds(entry.data);
    return (
      (filters.kind === "all" || entry.data.kind === filters.kind) &&
      (filters.client === "all" ||
        agents.includes(filters.client) ||
        (filters.includeGeneral && agents.includes("agent-neutral"))) &&
      (filters.engine === "all" ||
        (
          entryEngines?.[entry.id] || agentEngineFamilies(entry.data.engine)
        ).includes(filters.engine)) &&
      matchesSearch(searchText?.[entry.id] ?? searchableText(entry), query)
    );
  });
  return query.empty
    ? matched
    : matched.sort((a, b) => compareDirectoryTitles(query, a.title, b.title));
}

/** Group the selected entries, which are already ordered by title relevance. */
export function groupAgentEntries(
  entries: readonly AgentEntry[],
  kinds: readonly AgentBrowserOption[],
  search: string,
) {
  const query = parseDirectorySearchQuery(search);
  const groups = kinds
    .map((kind) => ({
      ...kind,
      entries: entries.filter((entry) => entry.data.kind === kind.id),
    }))
    .filter((group) => group.entries.length > 0);
  return query.empty
    ? groups
    : groups.sort((a, b) =>
        compareDirectoryTitles(query, a.entries[0].title, b.entries[0].title),
      );
}

/** One bilingual search text per ID, shared by both language views. */
export function buildAgentSearchText(
  english: readonly AgentEntry[],
  chinese: readonly AgentEntry[],
): Record<string, string> {
  const alternate = new Map(chinese.map((entry) => [entry.id, entry]));
  return Object.fromEntries(
    english.map((entry) => {
      const translated = alternate.get(entry.id);
      const labels = [
        agentResourceKinds[entry.data.kind],
        ...agentClientIds(entry.data).map((id) => agentClientLabels[id]),
      ];
      return [
        entry.id,
        [
          searchableText(entry),
          translated ? searchableText(translated) : "",
          entry.data.kind,
          ...agentClientIds(entry.data),
          ...labels.flatMap((label) => [label, translate("zh", label)]),
        ]
          .filter(Boolean)
          .join("\n"),
      ];
    }),
  );
}
