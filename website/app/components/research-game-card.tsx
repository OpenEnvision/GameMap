import type { ResearchGame } from "../../content/research-games";
import type { LearningMedia } from "../../src/data/learningMedia";
import { GameCard } from "./game-card";

export function ResearchGameCard({
  entry,
  media,
}: {
  entry: Pick<
    ResearchGame,
    "key" | "data" | "description" | "descriptionLanguage" | "url"
  >;
  media?: LearningMedia;
}) {
  const game = entry.data.game_access;
  return (
    <GameCard
      contentKey={entry.key}
      title={game.title}
      description={entry.description}
      descriptionLanguage={entry.descriptionLanguage}
      track={game.track}
      engine={game.engine}
      demo={game}
      recordUrl={entry.url}
      sourceUrl={`https://github.com/${entry.data.canonical_repo || entry.data.requested_repo}`}
      media={media}
      extraLink={{ label: "Build link evidence", url: game.source_url }}
    />
  );
}
