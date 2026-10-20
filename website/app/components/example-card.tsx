import { ArrowUpRight, Code2, Download, Globe2, Store, Terminal } from "lucide-react";
import { gameAccessFilterIds, gameDestination } from "../../content/game-platforms";
import { getExampleSourceStatus } from "../../content/example-source-status";
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
  const destination = gameDestination(game.demo);
  const sourceStatus = getExampleSourceStatus(game.id);
  const sourceFacts = sourceStatus ? [
    sourceStatus.license && { name: "Code license", ...sourceStatus.license },
    sourceStatus.verification && { name: "Recorded playtest coverage", ...sourceStatus.verification },
    sourceStatus.version && { name: "Source and demo version", ...sourceStatus.version },
  ].filter((fact) => !!fact) : [];
  const scopeLabel = game.source.scope === "complete-project" ? "Complete project source"
    : game.source.scope === "game-code-greybox" ? "Game code / greybox" : undefined;
  const PlatformIcon = destination.mode === "browser" ? Globe2
    : destination.mode === "store" ? Store
    : destination.mode === "source" || destination.mode === "setup" ? Terminal : Download;
  const action = destination.mode === "browser" ? "Play the game"
    : destination.mode === "store" ? "View store page"
    : destination.mode === "source" ? "Get source & run"
    : destination.mode === "setup" ? "Run locally" : "Get the game";
  return (
    <article
      className={`example-card${compact ? " compact" : ""}`}
      id={game.id}
      data-content-ref={entry.key}
      data-game-access={gameAccessFilterIds(game).join(" ")}
      data-source-scope={game.source.scope || "unspecified"}
    >
      <a
        className="example-image"
        href={game.demo.url}
        target="_blank"
        rel="noreferrer"
        aria-label={t(
          destination.mode === "browser" ? "Play {title}"
            : destination.mode === "source" ? "Get {title} source"
            : destination.mode === "setup" ? "Set up {title} locally"
            : destination.mode === "store" ? "View {title} in store" : "Download {title}",
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
        <span className="example-platform-label">
          <PlatformIcon size={12} aria-hidden="true" />
          {t(destination.platform)}
        </span>
        <span className="image-action">
          {t(action)}
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
        {!!game.assetTools?.length && (
          <p className="example-asset-tools">
            {t("Assets: {tools}", { tools: game.assetTools.join(" · ") })}
          </p>
        )}
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
        {!compact && (scopeLabel || sourceStatus?.verification) && (
          <div className="example-review-status" aria-label={t("Source and playtest status")}>
            {scopeLabel && <span className="example-source-scope">{t(scopeLabel)}</span>}
            {sourceStatus?.verification && (
              <span className="example-verification">{t(sourceStatus.verification.label)}</span>
            )}
          </div>
        )}
        {!compact && sourceFacts.length > 0 && (
          <details className="example-review-notes">
            <summary>{t("Source & review notes")}</summary>
            <dl>
              {sourceFacts.map((fact) => {
                const note = t(fact.note);
                return <div key={fact.name}>
                  <dt>{t(fact.name)}</dt>
                  <dd>
                    <strong>{t(fact.label)}</strong>
                    <p lang={note === fact.note ? "en" : undefined}>{note}</p>
                  </dd>
                </div>;
              })}
            </dl>
          </details>
        )}
        {!!game.distribution?.length && (
          <div className="example-distribution" aria-label={t("More ways to play")}>
            {game.distribution.map((item) => (
              <a key={item.url} href={item.url} title={item.note} target="_blank" rel="noreferrer">
                {item.kind === "download" ? <Download size={12} aria-hidden="true" /> : <Globe2 size={12} aria-hidden="true" />}
                {t(item.platform)}<ArrowUpRight size={11} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
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
