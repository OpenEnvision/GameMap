import { url } from "../../content/site";
import type { LearningMedia } from "../../src/data/learningMedia";
import type { PageCover } from "../../src/data/pageCovers";
import type { LearningPath } from "../../src/data/learningTypes";
import type { Locale } from "../../content/locale";
import { GameCard } from "./game-card";

export function ExampleCard({
  game,
  compact = false,
  media,
  pageCover,
  descriptionLanguage,
}: {
  game: LearningPath;
  compact?: boolean;
  media?: LearningMedia;
  pageCover?: PageCover;
  descriptionLanguage?: Locale;
}) {
  return (
    <GameCard
      contentKey={`${game.category === "foundation" ? "foundation" : "example"}:${game.id}`}
      id={game.id}
      title={game.title}
      description={game.description}
      descriptionLanguage={descriptionLanguage}
      track={game.track}
      engine={game.engine}
      demo={game.demo}
      recordUrl={url.example(game.id)}
      sourceUrl={game.source.url}
      media={media}
      pageCover={pageCover}
      compact={compact}
      extraLink={{
        label: compact ? "Build story" : game.tutorial.label,
        url: game.tutorial.url,
      }}
    />
  );
}
