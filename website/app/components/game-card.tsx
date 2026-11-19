import type { ReactNode } from "react";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { publicAsset } from "../lib/catalog";
import type { LearningMedia } from "../../src/data/learningMedia";
import type { PageCover } from "../../src/data/pageCovers";
import type { Locale } from "../../content/locale";
import { RatingSummary } from "./community";

const accessLabels = {
  playable: "Playable build",
  download: "Downloadable build",
  source: "Source only / release unverified",
  reference: "Project reference / source unverified",
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
  notes,
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
  recordUrl: string;
  sourceUrl?: string;
  media?: Pick<LearningMedia, "src" | "alt" | "width" | "height">;
  pageCover?: PageCover;
  notes?: ReactNode;
  extraLink?: { label: string; url: string };
  compact?: boolean;
}) {
  const { t } = useSiteI18n();
  const sourceOnly = demo.kind === "source",
    referenceOnly = demo.kind === "reference";
  const fallback = media ? undefined : pageCover;
  const image = media || fallback;
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
            alt={image.alt}
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
                ? "GameMap record · not upstream or gameplay"
                : "Project page · not gameplay",
            )}
          </span>
        )}
        {!image && (
          <span className="game-preview-unavailable">
            {t("No reviewed screenshot")}
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
        <RatingSummary gameKey={contentKey} recordUrl={recordUrl} />
        <div className="example-links">
          <Link to={recordUrl} reloadDocument>
            {t("Complete record")}
          </Link>
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
            >
              {t(extraLink.label)}
            </a>
          )}
        </div>
        {!compact && notes}
      </div>
    </article>
  );
}
