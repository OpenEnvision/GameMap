import type { ResearchGame } from "../../content/research-games";
import type { LearningMedia } from "../../src/data/learningMedia";
import { useSiteI18n, SourceLanguage } from "../lib/i18n";
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
  const { t, locale } = useSiteI18n();
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
      notes={
        <details className="build-notes">
          <summary>
            {t("Project notes")} <SourceLanguage english={locale === "zh"} />
          </summary>
          <p lang="en">{game.note}</p>
          <p className="source-note" lang="en">
            {entry.data.license_note}
          </p>
          <p className="source-note" lang="en">
            {entry.data.ai_note}
          </p>
        </details>
      }
    />
  );
}
