import { ArrowUpRight } from "lucide-react";
import { useSiteI18n, SourceLanguage } from "../lib/i18n";
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
  const { t, locale } = useSiteI18n();
  const workflowEnglish =
    locale === "zh" &&
    game.steps.some((step) => !/[\p{Script=Han}]/u.test(step));
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
      notes={
        <details className="build-notes">
          <summary>
            {t(
              game.demo.kind === "source"
                ? "Imported project notes"
                : "How it was built",
            )}{" "}
            <SourceLanguage english={workflowEnglish} />
          </summary>
          {game.category === "foundation" && (
            <p className="source-note">
              {t("Official engine examples, not AI-authorship claims.")}
            </p>
          )}
          <p>{game.aiUse}</p>
          <ol lang={workflowEnglish ? "en" : undefined}>
            {game.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="source-note">{game.source.note}</p>
          <p className="source-note">{game.demo.note}</p>
          {game.evidence && (
            <>
              <a href={game.evidence.url} target="_blank" rel="noreferrer">
                {t(game.evidence.label)}
                <ArrowUpRight size={13} />
              </a>
              <p className="source-note">{game.evidence.note}</p>
            </>
          )}
        </details>
      }
    />
  );
}
