import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  ChevronDown,
  CircleMinus,
  Clapperboard,
  Code2,
  Download,
  Gamepad2,
  Globe,
  Link2,
  MousePointer2,
  Tags,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { ContentEntry } from "../../content/models";
import { resourceRequirements } from "../../content/resource-requirements";
import { resourceCollections, type AccessKind } from "../../src/types";
import {
  dimensionGlyphs,
  shortStageLabels,
  stageGlyphs,
  stageLabels,
  typeGlyphs,
  typeLabels,
} from "../lib/catalog";
import { SourceLanguage, useSiteI18n } from "../lib/i18n";
import { ContentLink } from "./content";

const accessGlyphs: Record<AccessKind, LucideIcon> = {
  tutorial: BookOpen,
  playable: Gamepad2,
  interactive: MousePointer2,
  video: Clapperboard,
  download: Download,
  "full-source": Code2,
  sdk: Code2,
  examples: Boxes,
  model: Boxes,
  "local-tool": Terminal,
  "pipeline-source": Code2,
  service: Globe,
  unavailable: CircleMinus,
};
const accessLabels: Record<AccessKind, string> = {
  tutorial: "Tutorial",
  playable: "Playable demo",
  interactive: "Interactive tool",
  video: "Video",
  download: "Download",
  "full-source": "Full source",
  sdk: "SDK",
  examples: "Examples",
  model: "Model",
  "local-tool": "Local tool",
  "pipeline-source": "Pipeline source",
  service: "Hosted service",
  unavailable: "Unavailable",
};
const requirementLabels = {
  engine: "Engine / version",
  environment: "Runtime / platform",
  terms: "Access & license",
} as const;

export function ResourceCardInfo({
  entry,
  onTopic,
  showCollection = false,
}: {
  entry: ContentEntry<"resource">;
  onTopic: (topic: string) => void;
  showCollection?: boolean;
}) {
  const { t } = useSiteI18n();
  const resource = entry.data;
  const requirements = resourceRequirements[resource.id];
  const TypeGlyph = typeGlyphs[resource.type];
  const TrackGlyph =
    resource.dimensions.length === 1
      ? dimensionGlyphs[resource.dimensions[0]]
      : Boxes;
  const detail = entry.blocks.find((block) => block.field === "detail");
  const access = resource.access
    ? [
        { section: "Tutorial & setup", ...resource.access.tutorial },
        { section: "Demo & access", ...resource.access.demo },
        { section: "Source & integration", ...resource.access.source },
      ]
    : [];
  const linkCount =
    (resource.links?.length || 0) + access.filter((item) => item.url).length;

  return (
    <div className="resource-tags resource-card-info">
      <div className="resource-facets">
        {showCollection && (
          <span className="resource-collection-badge">
            {t(
              resourceCollections.find(({ id }) => id === resource.collection)!
                .label,
            )}
          </span>
        )}
        <span>
          <TypeGlyph size={12} aria-hidden="true" />
          {t(typeLabels[resource.type])}
        </span>
        <span>
          <TrackGlyph size={12} aria-hidden="true" />
          {resource.dimensions.length === 3
            ? t("All tracks")
            : resource.dimensions
                .map((track) =>
                  track === "world" ? t("World models") : track.toUpperCase(),
                )
                .join(" / ")}
        </span>
      </div>
      {requirements && (
        <dl className="resource-requirements">
          {Object.entries(requirementLabels).map(([key, label]) => {
            const value = requirements[key as keyof typeof requirementLabels];
            return (
              value && (
                <div key={key}>
                  <dt>{t(label)}</dt>
                  <dd>{t(value)}</dd>
                </div>
              )
            );
          })}
        </dl>
      )}
      <ul className="resource-stage-list" aria-label={t("Development stages")}>
        {resource.stages.map((stage) => {
          const Glyph = stageGlyphs[stage];
          return (
            <li key={stage} title={t(stageLabels[stage])}>
              <Glyph size={12} aria-hidden="true" />
              <abbr title={t(stageLabels[stage])}>
                {t(shortStageLabels[stage])}
              </abbr>
            </li>
          );
        })}
      </ul>
      <div className="resource-keywords">
        <Tags size={13} aria-hidden="true" />
        <ul aria-label={t("Topics")}>
          {resource.tags.map((tag) => (
            <li key={tag}>
              <button
                aria-label={t("Search resources about {topic}", {
                  topic: t(tag),
                })}
                onClick={() => onTopic(t(tag))}
              >
                {t(tag)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <details className="resource-notes">
        <summary>
          <BookOpen size={14} aria-hidden="true" />
          <b>{t(linkCount ? "Usage & links" : "Usage notes")}</b>
          {linkCount > 0 && (
            <small>
              {t(linkCount === 1 ? "{count} link" : "{count} links", {
                count: linkCount,
              })}
            </small>
          )}
          <ChevronDown size={14} aria-hidden="true" />
        </summary>
        <div className="resource-notes-body">
          <h3>{t("How to use it")}</h3>
          <p lang={detail?.type === "text" ? detail.language : undefined}>
            {resource.detail}
          </p>
          {access.length > 0 && (
            <dl className="resource-access-list">
              {access.map((item) => {
                const Glyph = accessGlyphs[item.kind];
                const note = t(item.note);
                return (
                  <div key={item.section}>
                    <dt>
                      <Glyph size={14} aria-hidden="true" />
                      {t(item.section)}
                      <small>{t(accessLabels[item.kind])}</small>
                    </dt>
                    <dd>
                      {item.url ? (
                        <ContentLink href={item.url}>
                          {t(item.label)}
                          <ArrowUpRight size={12} aria-hidden="true" />
                        </ContentLink>
                      ) : (
                        <strong>{t(item.label)}</strong>
                      )}
                      <SourceLanguage english={note === item.note} />
                      <p lang={note === item.note ? "en" : undefined}>{note}</p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
          {!!resource.links?.length && (
            <div className="resource-reading">
              <h3>
                <Link2 size={13} aria-hidden="true" />
                {t("Further reading")}
              </h3>
              <ul>
                {resource.links.map((link) => (
                  <li key={link.url}>
                    <ContentLink href={link.url}>
                      {t(link.label)}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </ContentLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
