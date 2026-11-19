import type { ContentEntry } from "../../content/models";
import type { LearningMedia } from "../../src/data/learningMedia";
import type { PageCover } from "../../src/data/pageCovers";
import { GameCard } from "./game-card";

/** Reuse an existing project record; do not manufacture a second game or playable link. */
export function ImportedThreejsCard({
  entry,
  media,
  pageCover,
}: {
  entry: Pick<
    ContentEntry<"threejs-game">,
    "key" | "id" | "data" | "description" | "descriptionLanguage" | "url"
  >;
  media?: LearningMedia;
  pageCover?: PageCover;
}) {
  const game = entry.data;
  return (
    <GameCard
      contentKey={entry.key}
      title={game.name}
      description={entry.description}
      descriptionLanguage={entry.descriptionLanguage}
      track="3d"
      engine={`Three.js ${game.stack.three_version}`}
      demo={{ kind: "source", url: game.repository_url }}
      recordUrl={entry.url}
      sourceUrl={game.repository_url}
      media={media}
      pageCover={pageCover}
    />
  );
}
