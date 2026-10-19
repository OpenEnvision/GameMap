import { ArrowUpRight, Code2 } from "lucide-react";
import { Link, useSiteI18n, SourceLanguage } from "../lib/i18n";
import { url } from "../../content/site";
import { publicAsset } from "../lib/catalog";
import type { LearningMedia } from "../../src/data/learningMedia";
import type { LearningPath } from "../../src/data/learningTypes";
import type { Locale } from "../../content/locale";
export function ExampleCard({
  game,
  compact = false,
  media,
  descriptionLanguage,
}: {
  game: LearningPath;
  compact?: boolean;
  media?: LearningMedia;
  descriptionLanguage?: Locale;
}) {
  const { t, locale } = useSiteI18n();
  const entry = {
    key: `${game.category === "foundation" ? "foundation" : "example"}:${game.id}`,
    url: url.example(game.id),
  };
  const workflowEnglish =
    locale === "zh" &&
    game.steps.some((step) => !/[\p{Script=Han}]/u.test(step));
  return (
    <article
      className={`example-card${compact ? " compact" : ""}`}
      id={game.id}
      data-content-ref={entry.key}
    >
      <a
        className="example-image"
        href={game.demo.url}
        target="_blank"
        rel="noreferrer"
        aria-label={t(
          game.demo.kind === "playable" ? "Play {title}" : "Download {title}",
          { title: game.title },
        )}
      >
        {media && (
          <img
            src={publicAsset(media.src)}
            alt={media.alt}
            width={1280}
            height={720}
            loading="lazy"
          />
        )}
        <span className="image-action">
          {t(game.demo.kind === "playable" ? "Play the game" : "Get the game")}
          <ArrowUpRight size={14} />
        </span>
      </a>
      <div className="example-body">
        <div className="card-meta">
          <span>
            {game.track.toUpperCase()} / {game.engine}
          </span>
          <Code2 size={15} />
        </div>
        <h3>
          <a href={game.demo.url} target="_blank" rel="noreferrer">
            {game.title}
            <ArrowUpRight size={17} />
          </a>
        </h3>
        <SourceLanguage english={descriptionLanguage === "en"} />
        <p lang={descriptionLanguage === "en" ? "en" : undefined}>
          {game.description}
        </p>
        {!compact && (
          <details className="build-notes">
            <summary>
              {t("How it was built")}{" "}
              <SourceLanguage english={workflowEnglish} />
            </summary>
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
        )}
        <div className="example-links">
          <Link to={entry.url}>
            {t("Complete record")}
            <ArrowUpRight size={13} />
          </Link>
          <a href={game.source.url} target="_blank" rel="noreferrer">
            {t("Project source")}
            <ArrowUpRight size={13} />
          </a>
          <a href={game.tutorial.url} target="_blank" rel="noreferrer">
            {t(compact ? "Build story" : game.tutorial.label)}
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}
