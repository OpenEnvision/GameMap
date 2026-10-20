import type { LearningPath } from "../src/data/learningTypes";

export type GameAccessMode = "browser" | "store" | "build" | "source" | "setup";

export const gameAccessOptions = [
  { id: "browser", label: "Play in browser" },
  { id: "download", label: "Download a build" },
  { id: "source", label: "Download source" },
  { id: "setup", label: "Set up locally" },
  { id: "store", label: "Store page" },
] as const;
export type GameAccessFilterId = (typeof gameAccessOptions)[number]["id"];

const accessFilterId = (mode: GameAccessMode): GameAccessFilterId =>
  mode === "build" ? "download" : mode;

/** Describe the linked destination, without inferring operating systems or releases. */
export function gameDestination(demo: LearningPath["demo"]): {
  platform: string;
  mode: GameAccessMode;
} {
  const { hostname, pathname } = new URL(demo.url);
  if (hostname === "store.steampowered.com") return { platform: "Steam", mode: "store" };
  if (hostname === "itch.io" || hostname.endsWith(".itch.io"))
    return { platform: "itch.io", mode: demo.kind === "playable" ? "browser" : "build" };
  if (hostname === "store.epicgames.com") return { platform: "Epic Games Store", mode: "store" };
  if (hostname === "gog.com" || hostname === "www.gog.com") return { platform: "GOG", mode: "store" };
  if (hostname === "github.com" && /\/releases(?:\/|$)/.test(pathname))
    return { platform: "GitHub Releases", mode: "build" };
  // A source archive or setup README is not a ready-to-play game download.
  if ((hostname === "github.com" && /\/archive\//.test(pathname)) || hostname === "codeload.github.com")
    return { platform: "Source download", mode: "source" };
  if (demo.kind === "playable") return { platform: "Browser", mode: "browser" };
  if (hostname === "github.com" && /\/tree\/[^/]+\/dist\/?$/.test(pathname))
    return { platform: "Downloadable build", mode: "build" };
  if (hostname === "github.com" && !/\/blob\/.+\.(?:jar|jad|zip|exe|apk)$/i.test(pathname))
    return { platform: "Local setup", mode: "setup" };
  return { platform: "Downloadable build", mode: "build" };
}

/** Include only recorded entry points; an additional build can accompany browser play. */
export function gameAccessFilterIds(
  game: Pick<LearningPath, "demo" | "distribution">,
): GameAccessFilterId[] {
  const modes = new Set<GameAccessFilterId>([
    accessFilterId(gameDestination(game.demo).mode),
  ]);
  for (const edition of game.distribution || []) {
    if (edition.kind === "store") modes.add("store");
    else modes.add(accessFilterId(gameDestination({
      label: edition.platform,
      url: edition.url,
      kind: edition.kind,
      note: edition.note,
    }).mode));
  }
  return [...modes];
}

/** Public visibility, a repository URL or a download never establishes project scope. */
export function hasCompleteProjectSource(
  source: Pick<LearningPath["source"], "scope">,
) {
  return source.scope === "complete-project";
}
