import open3dImport from "../../content/open3d-import.config.json";
import {
  researchGamesForExamples,
  researchNotInExamples,
} from "../../content/research-games";
import type { ContentRegistry } from "../../content/models";

/*
 * Collection figures shared by pages that summarise other pages (the home
 * page). Each helper reproduces exactly what the destination page counts, so
 * a number never changes between the link and the page it opens:
 * - the examples header (routes/examples.tsx) lists native examples and engine
 *   foundations, source-reviewed research games with their own build, legacy
 *   three.js games imported into the gallery and approved community
 *   submissions;
 * - the research ledger (routes/research.tsx) omits every repository that is
 *   already listed as a game example.
 * Pure functions of the registry: no request, locale or client state.
 */

type Collections = Pick<ContentRegistry, "all">;

/** A game as the examples header counts it: its dimension and how it is reached. */
export type GameFacet = readonly [track: string, access: string];

/** The fields of a community submission that the examples header counts.
 *  Submissions only exist on the client (community API), so callers that
 *  render from the content registry alone pass none. */
export type SubmittedGame = { track: string; accessKind: string };

export type GameStats = {
  /** Every game the examples page lists ("Games in view" with no filter). */
  total: number;
  /** "Playable builds". */
  playable: number;
  /** "3D games". */
  threeD: number;
  /** "2D games". */
  twoD: number;
};

/** Records with their own card on the examples page: native examples and
 *  engine foundations, and the legacy three.js games imported into it. */
function catalogGames(content: Collections) {
  return {
    native: [...content.all("example"), ...content.all("foundation")],
    imported: content
      .all("threejs-game")
      .filter((entry) =>
        open3dImport.includedLegacyThreejsIds.includes(entry.id),
      ),
  };
}

/** The game records the examples page lists, before community submissions. */
export function exampleGames(content: Collections) {
  const { native, imported } = catalogGames(content);
  const linked = researchGamesForExamples(content.all("repository-research"), [
    ...native,
    ...imported,
  ]);
  return { native, linked, imported };
}

/** One [track, access] pair per listed game, built the way the examples page
 *  builds its header figures. */
export function exampleGameFacets(
  games: ReturnType<typeof exampleGames>,
  submitted: readonly SubmittedGame[] = [],
): GameFacet[] {
  return [
    ...games.native.map(
      (entry) => [entry.data.track, entry.data.demo.kind] as const,
    ),
    ...games.linked.map(
      (entry) =>
        [entry.data.game_access.track, entry.data.game_access.kind] as const,
    ),
    ...games.imported.map(() => ["3d", "source"] as const),
    ...submitted.map((work) => [work.track, work.accessKind] as const),
  ];
}

/** The examples header figures for a list of games. */
export function gameStats(facets: readonly GameFacet[]): GameStats {
  return {
    total: facets.length,
    playable: facets.filter(([, access]) => access === "playable").length,
    threeD: facets.filter(([track]) => track === "3d").length,
    twoD: facets.filter(([track]) => track === "2d").length,
  };
}

/** The examples header figures for the whole catalog (no filters). */
export function exampleStats(
  content: Collections,
  submitted: readonly SubmittedGame[] = [],
): GameStats {
  return gameStats(exampleGameFacets(exampleGames(content), submitted));
}

/** The records the research ledger lists: repositories that are not already
 *  game examples. */
export function researchLedger(content: Collections) {
  const { native, imported } = catalogGames(content);
  return researchNotInExamples(content.all("repository-research"), [
    ...native,
    ...imported,
  ]);
}
