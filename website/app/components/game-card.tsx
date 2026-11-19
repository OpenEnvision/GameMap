import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { publicAsset } from "../lib/catalog";
import type { LearningMedia } from "../../src/data/learningMedia";
import type { PageCover } from "../../src/data/pageCovers";
import { chineseMessages, type Locale } from "../../content/locale";
import { pageCoverAlt } from "../../content/media";
import { RatingSummary } from "./community";

const accessLabels = {
  playable: "Playable build",
  download: "Downloadable build",
  source: "Source link",
  reference: "Project reference",
} as const;

/** One card for games and prototypes, with explicit release/source-only status.
 *  The screenshot (or a generated "uncharted world" when none was reviewed) is
 *  the poster; the title sits on it, and the body keeps a fixed rhythm so rows
 *  line up without subgrid (cards can then skip rendering off-screen).
 *  The examples page renders ~1300 of these, so the markup stays lean: the
 *  external-link arrows are drawn by CSS (gallery.css) instead of five inline
 *  SVG icons per card. */
export function GameCard({
  contentKey,
  id,
  title,
  description,
  descriptionLanguage,
  track,
  engine,
  demo,
  recordUrl,
  sourceUrl,
  media,
  pageCover,
  extraLink,
  compact = false,
}: {
  contentKey: string;
  id?: string;
  title: string;
  description: string;
  descriptionLanguage?: Locale;
  track: "2d" | "3d";
  engine: string;
  demo: { url: string; kind: "playable" | "download" | "source" | "reference" };
  recordUrl?: string;
  sourceUrl?: string;
  media?: Pick<LearningMedia, "src" | "alt" | "width" | "height">;
  pageCover?: PageCover;
  extraLink?: { label: string; url: string };
  compact?: boolean;
}) {
  const { t, locale } = useSiteI18n();
  const sourceOnly = demo.kind === "source",
    referenceOnly = demo.kind === "reference";
  const fallback = media ? undefined : pageCover;
  const image = media || fallback;
  // Build-story labels come from the records; one without a translation stays
  // English on Chinese pages, so say so for screen readers.
  const extraEnglish =
    locale === "zh" &&
    !!extraLink &&
    !Object.hasOwn(chineseMessages, extraLink.label) &&
    !/\p{Script=Han}/u.test(extraLink.label);
  return (
    <article
      className={`example-card${compact ? " compact" : ""}`}
      id={id}
      data-content-ref={contentKey}
      data-game-track={track}
      data-access-kind={demo.kind}
      data-cover-kind={
        media
          ? "gameplay"
          : fallback?.origin === "catalog-page-capture"
            ? "catalog-page"
            : fallback
              ? "project-page"
              : undefined
      }
    >
      <a
        className="example-image"
        href={demo.url}
        target="_blank"
        rel="noreferrer"
        aria-label={t(
          referenceOnly
            ? "View project reference for {title}"
            : sourceOnly
              ? "View source for {title}"
              : demo.kind === "playable"
                ? "Play {title}"
                : "Download {title}",
          { title },
        )}
      >
        {image && (
          <img
            src={publicAsset(image.src)}
            alt={fallback ? pageCoverAlt(image.alt) : image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        )}
        {fallback && (
          <span className="page-cover-label">
            {t(
              fallback.origin === "catalog-page-capture"
                ? "GameMap page screenshot"
                : "Project page screenshot",
            )}
          </span>
        )}
        {!image && (
          <span className="game-preview-unavailable">
            {t("No screenshot available")}
          </span>
        )}
        <span className="image-action">
          {t(
            referenceOnly
              ? "View project"
              : sourceOnly
                ? "View source"
                : demo.kind === "playable"
                  ? "Play the game"
                  : "Get the game",
          )}
        </span>
      </a>
      <div className="example-body">
        <div className="card-meta">
          <span className="card-spec">
            <span className="card-track">{track.toUpperCase()}</span>{" "}
            <span className="card-engine" title={engine}>
              {engine}
            </span>{" "}
            <SourceLanguage english={descriptionLanguage === "en"} />
          </span>{" "}
          <span className="card-access" data-access={demo.kind}>
            {t(accessLabels[demo.kind])}
          </span>
        </div>
        <h3>
          <a href={demo.url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </h3>
        <p lang={descriptionLanguage === "en" ? "en" : undefined}>
          {description}
        </p>
        {recordUrl && (
          <RatingSummary gameKey={contentKey} recordUrl={recordUrl} />
        )}
        <div className="example-links">
          {recordUrl && (
            <Link to={recordUrl} reloadDocument>
              {t("Complete record")}
            </Link>
          )}
          {sourceUrl && (
            <a href={sourceUrl} target="_blank" rel="noreferrer">
              {t(referenceOnly ? "Project reference" : "Project source")}
            </a>
          )}
          {extraLink && (
            <a
              href={extraLink.url}
              target="_blank"
              rel="noreferrer"
              title={t(extraLink.label)}
              lang={extraEnglish ? "en" : undefined}
            >
              {t(extraLink.label)}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
