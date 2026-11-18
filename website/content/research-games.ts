import type { ContentEntry } from "./models";

type ResearchEntry = ContentEntry<"repository-research">;
type NativeGameEntry =
  | ContentEntry<"example">
  | ContentEntry<"foundation">
  | ContentEntry<"threejs-game">;
const nativeSource = (entry: NativeGameEntry) =>
  entry.kind === "threejs-game"
    ? entry.data.repository_url
    : entry.data.source.url;
const nativeBuild = (entry: NativeGameEntry) =>
  entry.kind === "threejs-game"
    ? entry.data.demo.url
    : entry.data.demo.kind === "source" || entry.data.demo.kind === "reference"
      ? null
      : entry.data.demo.url;
export type ResearchGame = ResearchEntry & {
  data: ResearchEntry["data"] & {
    game_access: NonNullable<ResearchEntry["data"]["game_access"]>;
  };
};

function repositoryIdentity(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname.toLowerCase() !== "github.com") return undefined;
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    return owner && repo
      ? `${owner}/${repo.replace(/\.git$/i, "")}`.toLowerCase()
      : undefined;
  } catch {
    return undefined;
  }
}
function buildIdentity(value: string) {
  const url = new URL(value);
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  for (const key of [...url.searchParams.keys()])
    if (key.startsWith("utm_")) url.searchParams.delete(key);
  url.searchParams.sort();
  return url.href;
}

/** Opt-in source-reviewed game builds only; no URL guessing or source-only promotion. */
export function researchGamesForExamples(
  research: ResearchEntry[],
  examples: NativeGameEntry[],
): ResearchGame[] {
  const repositories = new Set(
    examples
      .map((entry) => repositoryIdentity(nativeSource(entry)))
      .filter(Boolean),
  );
  const builds = new Set(
    examples
      .map(nativeBuild)
      .filter((value): value is string => Boolean(value))
      .map(buildIdentity),
  );
  const selected: ResearchGame[] = [];
  for (const entry of research) {
    const access = entry.data.game_access;
    if (
      !access ||
      entry.data.review_status !== "source-reviewed" ||
      entry.data.disposition === "unavailable" ||
      entry.data.availability === "unavailable"
    )
      continue;
    const identities = [entry.data.requested_repo, entry.data.canonical_repo]
      .filter((repo): repo is string => Boolean(repo))
      .map((repo) => repo.toLowerCase());
    const build = buildIdentity(access.url);
    if (identities.some((repo) => repositories.has(repo)) || builds.has(build))
      continue;
    identities.forEach((repo) => repositories.add(repo));
    builds.add(build);
    selected.push(entry as ResearchGame);
  }
  return selected;
}

/** Keep the research listing disjoint from examples without deleting its evidence records. */
export function researchNotInExamples(
  research: ResearchEntry[],
  examples: NativeGameEntry[],
): ResearchEntry[] {
  const listed = researchExampleListings(research, examples);
  return research.filter((entry) => !listed.has(entry.key));
}

/** Resolve the actual example card representing a research record, including aliases. */
export function researchExampleListings(
  research: ResearchEntry[],
  examples: NativeGameEntry[],
) {
  type ListedGame = NativeGameEntry | ResearchGame;
  const repositories = new Map<string, ListedGame>();
  const builds = new Map<string, ListedGame>();
  for (const entry of [
    ...examples,
    ...researchGamesForExamples(research, examples),
  ]) {
    const identities =
      entry.kind !== "repository-research"
        ? [repositoryIdentity(nativeSource(entry))]
        : [entry.data.requested_repo, entry.data.canonical_repo];
    for (const repo of identities)
      if (repo && !repositories.has(repo.toLowerCase()))
        repositories.set(repo.toLowerCase(), entry);
    const buildUrl =
      entry.kind !== "repository-research"
        ? nativeBuild(entry)
        : entry.data.game_access.url;
    if (buildUrl) {
      const build = buildIdentity(buildUrl);
      if (!builds.has(build)) builds.set(build, entry);
    }
  }
  const listed = new Map<string, ListedGame>();
  for (const entry of research) {
    let target = [entry.data.requested_repo, entry.data.canonical_repo]
      .map((repo) => (repo ? repositories.get(repo.toLowerCase()) : undefined))
      .find((value) => value !== undefined);
    if (!target && entry.data.game_access)
      target = builds.get(buildIdentity(entry.data.game_access.url));
    if (target) listed.set(entry.key, target);
  }
  return listed;
}
