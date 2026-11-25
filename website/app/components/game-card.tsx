import { useState } from "react";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { publicAsset } from "../lib/catalog";
import type { LearningMedia } from "../../src/data/learningMedia";
import { chineseMessages, type Locale } from "../../content/locale";
import { RatingSummary } from "./community";

const accessLabels = {
  playable: "Playable build",
  download: "Downloadable build",
  source: "Source link",
  reference: "Project reference",
} as const;

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
  extraLink?: { label: string; url: string };
  compact?: boolean;
}) {
  const { t, locale } = useSiteI18n();
  const [failedImage, setFailedImage] = useState<string>();
  const image = media?.src === failedImage ? undefined : media;
  const referenceOnly = demo.kind === "reference";
  const accessAction = t(
    referenceOnly
      ? "View project"
      : demo.kind === "source"
        ? "View source"
        : demo.kind === "playable"
          ? "Play the game"
          : "Get the game",
  );
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
      data-cover-kind={image ? "gameplay" : undefined}
    >
      {image && (
        <a
          className="example-image"
          href={demo.url}
          target="_blank"
          rel="noreferrer"
          aria-label={t(
            referenceOnly
              ? "View project reference for {title}"
              : demo.kind === "source"
                ? "View source for {title}"
                : demo.kind === "playable"
                  ? "Play {title}"
                  : "Download {title}",
            { title },
          )}
        >
          <img
            src={publicAsset(image.src)}
            alt={t(image.alt)}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            ref={(element) => {
              if (element?.complete && element.naturalWidth === 0)
                setFailedImage(image.src);
            }}
            onError={() => setFailedImage(image.src)}
          />
          <span className="image-action">{accessAction}</span>
        </a>
      )}
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
          {!image && (
            <a
              className="example-access-link"
              href={demo.url}
              target="_blank"
              rel="noreferrer"
            >
              {accessAction}
            </a>
          )}
          {recordUrl && (
            <Link className="example-record-link" to={recordUrl} reloadDocument>
              {t("Complete record")}
            </Link>
          )}
          {sourceUrl && (image || sourceUrl !== demo.url) && (
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
