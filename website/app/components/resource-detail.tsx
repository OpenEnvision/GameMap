import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useHref } from "react-router";
import { Link, useSiteI18n, LanguageSwitcher } from "../lib/i18n";
import {
  ArrowUpRight,
  Bookmark,
  Boxes,
  Check,
  Code2,
  Compass,
  Gamepad2,
  Layers3,
  Link2,
  Orbit,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import type { Resource } from "../../src/types";
import type { ResourceIdentity } from "../../src/data/resourceIdentities";
import ResourceIcon from "../../src/components/ResourceIcon";
import type { ContentEntry } from "../../content/models";
import {
  ContentBlockView,
  ContentDocument,
  RelatedDemos,
  MediaPreview,
} from "./content";
import { categories, stageLabels, typeLabels } from "../lib/catalog";

/** The taxonomy glyphs of the home page's "Six directions" list. */
const categoryGlyphs: Record<string, LucideIcon> = {
  agents: Code2,
  engines: Boxes,
  "2d": Gamepad2,
  "3d": Layers3,
  production: Sparkles,
  world: Orbit,
};

/** A resource's verified logo. Without one, the neutral glyph of its
 *  category sits in a muted tile: never a monogram or a generated mark.
 *  The glyph is decorative; the category is always named in text nearby. */
export function ResourceMark({
  resource,
  identity,
  size,
}: {
  resource: Resource;
  identity: ResourceIdentity;
  size: number;
}) {
  if (identity.asset)
    return <ResourceIcon resource={resource} identity={identity} size={size} />;
  const Glyph = categoryGlyphs[resource.category] ?? Compass;
  return (
    <span
      className="resource-glyph"
      style={{ width: size, height: size }}
      aria-hidden="true"
      data-logo="none"
    >
      <Glyph size={Math.round(size * 0.4)} strokeWidth={1.5} />
    </span>
  );
}

export function ResourceDetail({
  entry,
  identity,
  demos,
  saved,
  onSave,
  onClose,
}: {
  entry: ContentEntry<"resource">;
  identity: ResourceIdentity;
  demos: ContentEntry<"demo">[];
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  const { t } = useSiteI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const [copy, setCopy] = useState("");
  const resource: Resource = entry.data;
  const permalink = useHref(entry.url);
  const [selected, setSelected] = useState("");
  const demo = demos.find((entry) => entry.key === selected) || demos[0];
  const video = demo?.blocks.find((block) => block.type === "video");
  useEffect(() => {
    const node = dialog.current;
    // Remember the control that opened the record so closing returns there.
    const opener =
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
        ? document.activeElement
        : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node?.showModal();
    return () => {
      node?.close();
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  const category = categories.find((item) => item.id === resource.category);
  // The record's title and summary lead the dialog on every screen; the rest
  // of the record reads below them.
  const intro = entry.blocks.filter(
    (block) => block.type === "title" || block.type === "lead",
  );
  const heading = intro.find((block) => block.type === "title");
  const record = {
    ...entry,
    blocks: entry.blocks.filter((block) => !intro.includes(block)),
  };
  const logo = identity.asset ? undefined : "none";
  return (
    <dialog
      ref={dialog}
      className="resource-dialog"
      aria-label={t("{title} details", { title: resource.name })}
      style={{ "--tone": `var(--tax-${resource.category})` } as CSSProperties}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <div className="detail-toolbar">
        <span className="eyebrow">{t("PROJECT RECORD")}</span>
        <LanguageSwitcher />
        <button
          className="quiet-icon rd-close"
          onClick={onClose}
          aria-label={t("Close resource details")}
        >
          <X size={20} />
        </button>
      </div>
      <div className="rd-layout">
        <div className="rd-head">
          {/* Narrow screens: the mark sits beside the title. Wide screens show
              it on the rail's stage instead. */}
          <span className="rd-mark" data-logo={logo}>
            <ResourceMark resource={resource} identity={identity} size={52} />
          </span>
          <div className="rd-head-text">
            {category && (
              <span className="small-label rd-category">
                {t(category.label)}
              </span>
            )}
            {heading ? (
              <ContentBlockView block={heading} heading="h2" />
            ) : (
              <h2 className="content-title">{resource.name}</h2>
            )}
            <span className="rd-organization">{identity.organization}</span>
          </div>
          {intro
            .filter((block) => block.type === "lead")
            .map((block, index) => (
              <ContentBlockView
                key={`${block.field}-${index}`}
                block={block}
                heading="h2"
              />
            ))}
        </div>
        <aside className="rd-rail">
          <span className="rd-stage" data-logo={logo}>
            <ResourceMark resource={resource} identity={identity} size={72} />
          </span>
          <div className="detail-actions">
            <a
              className="button button-primary"
              href={resource.url}
              target="_blank"
              rel="noreferrer"
            >
              {t("Visit project")}
              <ArrowUpRight size={16} />
            </a>
            <button
              className="button button-secondary"
              aria-pressed={saved}
              onClick={onSave}
            >
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
              {t(saved ? "Saved" : "Save resource")}
            </button>
          </div>
          <dl className="rd-facts">
            <div>
              <dt>{t("Resource type")}</dt>
              <dd>{t(typeLabels[resource.type])}</dd>
            </div>
            <div>
              <dt>{t("Development track")}</dt>
              <dd>
                {resource.dimensions.length === 3
                  ? t("All tracks")
                  : resource.dimensions
                      .map((track) =>
                        track === "world"
                          ? t("World models")
                          : track.toUpperCase(),
                      )
                      .join(" / ")}
              </dd>
            </div>
            {resource.stages.length > 0 && (
              <div>
                <dt>{t("Development stage")}</dt>
                <dd>
                  {resource.stages
                    .map((stage) => t(stageLabels[stage]))
                    .join(" · ")}
                </dd>
              </div>
            )}
          </dl>
          <div className="detail-footer">
            <Link className="inline-link" to={entry.url}>
              {t("Open complete project record")}
              <ArrowUpRight size={14} />
            </Link>
            <button
              className="inline-link"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    new URL(permalink, window.location.origin).href,
                  );
                  setCopy("Link copied.");
                } catch {
                  setCopy(
                    "Could not copy. Open the complete record and use its address.",
                  );
                }
              }}
            >
              {copy === "Link copied." ? (
                <Check size={14} />
              ) : (
                <Link2 size={14} />
              )}
              {t("Copy link")}
            </button>
          </div>
          {copy && (
            <p className="copy-notice" role="status">
              {t(copy)}
            </p>
          )}
        </aside>
        <div className="rd-main">
          {video?.type === "video" && (
            <figure className="detail-media">
              <label className="preview-selector">
                {t("Recording")}
                <select
                  aria-label={t("Project recording")}
                  value={demo.key}
                  onChange={(event) => setSelected(event.target.value)}
                >
                  {demos.map((entry) => (
                    <option key={entry.key} value={entry.key}>
                      {entry.title} —{" "}
                      {t(
                        entry.data.role === "excerpt"
                          ? "excerpt"
                          : "source recording",
                      )}
                    </option>
                  ))}
                </select>
              </label>
              <MediaPreview block={video} />
              <figcaption>
                <a href={demo.data.sourceUrl} target="_blank" rel="noreferrer">
                  {demo.data.credit}
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href={demo.data.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Original video")}
                  <ArrowUpRight size={12} />
                </a>
              </figcaption>
              <p>{demo.description}</p>
            </figure>
          )}
          <ContentDocument entry={record} heading="h2" />
          <RelatedDemos demos={demos} />
        </div>
      </div>
    </dialog>
  );
}
