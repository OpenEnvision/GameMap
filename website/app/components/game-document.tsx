import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Calendar,
  Gamepad2,
  Layers,
  Maximize2,
  X,
} from "lucide-react";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import type { ContentBlock, ContentEntry, Fact } from "../../content/models";
import { contentKinds } from "../../content/models";
import { pages } from "../../content/site";
import { publicAsset } from "../../src/publicAsset";
import type { Resource } from "../../src/types";
import type { ResourceIdentity } from "../../src/data/resourceIdentities";
import ResourceIcon from "../../src/components/ResourceIcon";
import {
  ActionGlyph,
  ActionLink,
  ContentBlockView,
  ContentLink,
  DisplayTitle,
  MediaPreview,
  OrbitArt,
  catalogueCode,
  englishSource,
  heroActions,
  sectionOf,
  titleScale,
  type ActionIcon,
  type RecordOutlineItem,
} from "./content";

export type LinkedResourceInfo = {
  id: string;
  name: string;
  summary: string;
  category: string;
  resource: Resource;
  identity: ResourceIdentity | null;
};

export type RelatedGameCard = {
  key: string;
  url: string;
  title: string;
  engine: string;
  track: string;
  imageSrc: string | null;
  imageWidth?: number;
  imageHeight?: number;
};

type GameEntry =
  | ContentEntry<"example">
  | ContentEntry<"foundation">
  | ContentEntry<"threejs-game">;

function hostLabel(href: string) {
  try {
    const { hostname, pathname } = new URL(href);
    const host = hostname.replace(/^www\./, "");
    const owner = pathname.split("/")[1];
    return host === "github.com" && owner ? `${host}/${owner}` : host;
  } catch {
    return "";
  }
}

function resourceIdFromUrl(href: string) {
  const clean = href.split(/[?#]/)[0].replace(/\/+$/, "");
  return clean.split("/").pop() || "";
}

function trackBadge(entry: GameEntry): string | null {
  if (entry.kind === "threejs-game") {
    return entry.data.dimension ? entry.data.dimension.toUpperCase() : "3D";
  }
  const value: string | undefined = entry.data.track;
  if (!value) return null;
  return value === "world" ? "World" : value.toUpperCase();
}

const gameAccessIcons = {
  playable: "play",
  download: "download",
  source: "code",
  reference: "link",
} as const;

type TextContentBlock = Extract<
  ContentBlock,
  { type: "title" | "lead" | "text" }
>;

/** A destination row keeps the access kind and source scope beside its links. */
function GameDestination({
  field,
  blocks,
  demoIcon,
  featured = false,
}: {
  field: "demo" | "source" | "tutorial";
  blocks: ContentBlock[];
  demoIcon: ActionIcon;
  featured?: boolean;
}) {
  const { t } = useSiteI18n();
  const linkBlocks = blocks.filter(
    (block): block is Extract<ContentBlock, { type: "links" }> =>
      block.type === "links",
  );
  const textBlocks = blocks.filter(
    (block): block is TextContentBlock => block.type === "text",
  );
  const primary = linkBlocks[0];
  const fallbackText = !primary ? textBlocks[0] : undefined;
  const badges = primary ? textBlocks : textBlocks.slice(1);
  const headingLabel = primary?.label || fallbackText?.label || "";
  const isPlayable =
    field === "demo" && (demoIcon === "play" || demoIcon === "download");

  return (
    <section
      className={`game-dest-card is-${field}${featured && isPlayable ? " is-playable" : ""}`}
      data-content-field={field}
    >
      <div className="game-dest-head">
        <h3 className="game-dest-kicker">
          <ActionGlyph
            icon={
              field === "demo" ? demoIcon : field === "source" ? "code" : "book"
            }
          />
          <span>{t(headingLabel)}</span>
        </h3>
        {badges.length > 0 && (
          <span className="game-dest-badges">
            {badges.map((badge, index) => (
              <span
                key={`${badge.field}-badge-${index}`}
                className={`game-dest-badge${isPlayable && index === 0 ? " is-live" : ""}`}
                lang={badge.language === "en" ? "en" : undefined}
              >
                {t(badge.value)}
              </span>
            ))}
          </span>
        )}
      </div>

      {linkBlocks.length > 0 ? (
        <ul className="game-dest-links">
          {linkBlocks.flatMap((block, blockIndex) =>
            block.items.map((item, itemIndex) => {
              const host = hostLabel(item.url);
              return (
                <li key={`${blockIndex}-${itemIndex}-${item.url}`}>
                  <div className="game-dest-link-row">
                    <ContentLink href={item.url}>
                      <span className="game-dest-link-text">
                        {t(item.label)}
                      </span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </ContentLink>
                    {host && (
                      <span className="game-dest-host" translate="no">
                        {host}
                      </span>
                    )}
                  </div>
                  {item.note && (
                    <p className="game-dest-note" lang="en">
                      {item.note}
                    </p>
                  )}
                </li>
              );
            }),
          )}
        </ul>
      ) : (
        fallbackText && (
          <p
            className="game-dest-note"
            lang={fallbackText.language === "en" ? "en" : undefined}
          >
            {t(fallbackText.value)}
          </p>
        )
      )}
    </section>
  );
}

function ProvenanceFacts({ items }: { items: Fact[] }) {
  const { t } = useSiteI18n();
  return (
    <dl className="game-facts-grid">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className={item.type === "group" ? "is-group" : undefined}
        >
          <dt>{t(item.label)}</dt>
          <dd>
            {item.type === "group" ? (
              <ProvenanceFacts items={item.items} />
            ) : item.type === "link" ? (
              <ContentLink href={item.url}>
                <span>{item.url}</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </ContentLink>
            ) : (
              <span
                className={
                  /sha-?256|hash/i.test(item.label)
                    ? "game-mono-value"
                    : undefined
                }
              >
                {t(item.value)}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function GameSectionHeader({
  index,
  title,
  count,
  id,
}: {
  index: number;
  title: string;
  count?: string | number;
  id?: string;
}) {
  return (
    <div className="game-section-head">
      <span className="game-section-index" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <h2 id={id}>
        {title}
        {count !== undefined && (
          <span className="game-section-count">{count}</span>
        )}
      </h2>
    </div>
  );
}

export function GameDocument({
  entry,
  linkedResources = {},
  relatedGames = [],
  hasCommunity = false,
  children,
}: {
  entry: GameEntry;
  linkedResources?: Record<string, LinkedResourceInfo>;
  relatedGames?: RelatedGameCard[];
  hasCommunity?: boolean;
  children?: ReactNode;
}) {
  const { t } = useSiteI18n();
  const kind = contentKinds[entry.kind];
  const collection = pages[kind.page];
  const track = trackBadge(entry);
  const code = catalogueCode(entry);
  const specHeadingId = useId();
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const visibleBlocks = entry.blocks.filter(
    (block) => block.section !== "metadata",
  );
  const claimed = new Set<ContentBlock>();
  const take = (predicate: (block: ContentBlock) => boolean) => {
    const matched = visibleBlocks.filter(
      (block) => !claimed.has(block) && predicate(block),
    );
    matched.forEach((block) => claimed.add(block));
    return matched;
  };

  // 1. Intro (title + lead)
  const titleBlock = take((block) => block.type === "title")[0];
  const leadBlocks = take((block) => block.type === "lead");
  const headingText =
    titleBlock?.type === "title" ? titleBlock.value : entry.title;

  // 2. Media + direct screenshot provenance (captured date, reviewed date, original image)
  const mediaBlocks = take(
    (block) => block.type === "image" || block.type === "video",
  );
  const primaryImage = mediaBlocks.find(
    (block): block is Extract<ContentBlock, { type: "image" }> =>
      block.type === "image",
  );
  const primaryVideo = mediaBlocks.find(
    (block): block is Extract<ContentBlock, { type: "video" }> =>
      block.type === "video",
  );
  const extraMedia = mediaBlocks.filter(
    (block) => block !== primaryImage && block !== primaryVideo,
  );
  const mediaMetaBlocks = take((block) =>
    ["captureDate", "mediaReviewed", "originalImage"].includes(block.field),
  );

  // 3. At-a-glance facts
  const specFieldOrder = [
    "engine",
    "attribution",
    "assetTools",
    "genres",
    "dimension",
  ];
  const heroSpecBlocks = specFieldOrder.flatMap((field) =>
    take(
      (block) =>
        block.field === field &&
        (block.type === "text" || block.type === "list"),
    ),
  );

  // 4. Catalog provenance and the generic study guidance stay in the record.
  //    The same labels and "play it, read the source" steps recur on every
  //    game, so they say nothing about this one.
  take(
    (block) =>
      block.field === "aiUse" ||
      block.field === "steps" ||
      block.field === "category",
  );

  // 5. Destinations (demo, source, tutorial; Three.js facts stay in the ledger)
  const destOrder = ["demo", "source", "tutorial"] as const;
  const destinations = destOrder
    .map((field) => ({
      field,
      blocks: take(
        (block) =>
          block.field === field &&
          (block.type === "links" ||
            (block.type === "text" && entry.kind !== "threejs-game")),
      ),
    }))
    .filter((group) => group.blocks.length > 0);

  // 6. Related resources strip (resourceIds)
  const resourceIdsBlock = take(
    (block) => block.field === "resourceIds" && block.type === "links",
  )[0];

  // Remaining blocks for access and record-specific details (distribution links
  // join Play & source; Three.js technical facts and page-cover provenance join Details).
  const remainingResources = take(
    (block) =>
      sectionOf(block) === "resources" || block.field === "distribution",
  );
  const remainingGuidance = take(() => true);

  // Access icons follow structured metadata in every language.
  const demoIcon =
    entry.kind === "threejs-game"
      ? "play"
      : gameAccessIcons[entry.data.demo.kind];
  const actions = [
    ...(primaryVideo
      ? [
          {
            href: "#record-media-stage",
            label: t("Watch the recording"),
            icon: "play" as const,
          },
        ]
      : []),
    ...heroActions(entry, t).map((action) =>
      entry.kind !== "threejs-game" && action.href === entry.data.demo.url
        ? { ...action, icon: demoIcon }
        : action,
    ),
  ].slice(0, 3);
  const primaryAction = actions[0];
  const secondaryActions = actions.slice(1);

  // Access summary; canonical data-content-field values live in destinations.
  const demoKindBadge = destinations
    .find((item) => item.field === "demo")
    ?.blocks.find((block) => block.type === "text");
  const sourceScopeBadge = destinations
    .find((item) => item.field === "source")
    ?.blocks.find((block) => block.type === "text");

  // Sections present on this record
  const hasWorkflow = remainingGuidance.length > 0;
  const hasAccess = Boolean(
    destinations.length > 0 ||
    resourceIdsBlock ||
    remainingResources.length > 0,
  );
  // Section numbers and outline navigation
  let sectionNo = 0;
  const workflowNo = hasWorkflow ? ++sectionNo : 0;
  const accessNo = hasAccess ? ++sectionNo : 0;
  const communityNo = hasCommunity ? ++sectionNo : 0;

  const outline: RecordOutlineItem[] = [
    { id: "record-intro", label: t("Overview") },
    ...(hasWorkflow
      ? [
          {
            id: "record-guidance",
            label: t(
              entry.kind === "threejs-game" ? "Details" : "How it was built",
            ),
          },
        ]
      : []),
    ...(hasAccess
      ? [
          {
            id: "record-resources",
            label: t(
              entry.kind === "threejs-game"
                ? "Links & resources"
                : "Play & source",
            ),
          },
        ]
      : []),
    ...(hasCommunity
      ? [{ id: "community", label: t("Ratings & discussion") }]
      : []),
    ...(relatedGames.length > 0
      ? [{ id: "record-related", label: t("More game examples") }]
      : []),
  ];

  // Scroll spy & sticky subnav CTA visibility
  const outlineKey = outline.map((item) => item.id).join(" ");
  const [active, setActive] = useState<string>("record-intro");
  const [heroPast, setHeroPast] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const ids = outlineKey.split(" ");
    let frame = 0;
    const update = () => {
      frame = 0;
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 999;
      setHeroPast(heroBottom < 96);
      const line = window.innerHeight * 0.36;
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 6;
      let current = ids[0];
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top === undefined) continue;
        if (top <= line || (atEnd && top < window.innerHeight)) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [outlineKey]);

  useEffect(() => {
    if (lightboxOpen) lightboxRef.current?.showModal();
  }, [lightboxOpen]);

  const engineText = heroSpecBlocks.find(
    (block): block is TextContentBlock =>
      block.field === "engine" && block.type === "text",
  )?.value;

  return (
    <article
      id={entry.url.split("#")[1]}
      className={`content-record content-${entry.kind} game-doc`}
      data-content-key={entry.key}
      data-content-kind={entry.kind}
    >
      {/* Game overview and media stage */}
      <header
        ref={heroRef}
        id="record-intro"
        className="game-hero"
        data-has-media={primaryImage || primaryVideo ? "true" : "false"}
      >
        {/* Subtle ambient color bleed derived from the real game screenshot */}
        <div className="game-hero-backdrop" aria-hidden="true">
          {primaryImage ? (
            <img
              className="game-hero-aura"
              src={publicAsset(primaryImage.src)}
              alt=""
              decoding="async"
            />
          ) : (
            <span className="game-hero-grid" />
          )}
        </div>

        <div className="game-wrap game-hero-inner">
          {/* Breadcrumb and catalogue metadata */}
          <div className="game-hero-bar">
            <nav
              className="content-breadcrumb game-breadcrumb"
              aria-label={t("Breadcrumb")}
            >
              <Link to={collection.path}>
                <ArrowLeft size={15} aria-hidden="true" />
                <span>{t(collection.title)}</span>
              </Link>
            </nav>

            <div className="game-telemetry">
              <span className="kicker game-kind-badge">{t(kind.label)}</span>
              {track && <span className="game-track-pill">{track}</span>}
              <SourceLanguage
                partial={entry.descriptionLanguage !== "en"}
                english={englishSource(entry)}
              />
              <span className="game-catalogue-code" translate="no">
                {code}
              </span>
            </div>
          </div>

          {/* Editorial Masthead */}
          <div className="game-masthead">
            <h1
              className={`content-title game-title ${titleScale(headingText)}`}
              lang={titleBlock?.language === "en" ? "en" : undefined}
              data-content-field={titleBlock?.field || "title"}
            >
              <DisplayTitle text={headingText} />
            </h1>
            {leadBlocks.map((block, index) => (
              <p
                key={`${block.field}-${index}`}
                className="content-lead game-lead"
                lang={block.language === "en" ? "en" : undefined}
                data-content-field={block.field}
              >
                {block.type === "lead" ? block.value : ""}
              </p>
            ))}
          </div>

          {/* Media with an adjacent action and fact rail */}
          <div className="game-stage" id="record-media-stage">
            <div className="game-stage-media">
              {primaryImage ? (
                <figure
                  className="game-media-frame"
                  data-content-field={primaryImage.field}
                >
                  <div className="game-media-canvas">
                    <img
                      src={publicAsset(primaryImage.src)}
                      alt={primaryImage.alt}
                      width={primaryImage.width}
                      height={primaryImage.height}
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                  <figcaption className="game-media-caption">
                    <span className="game-media-caption-copy">
                      <span className="game-media-caption-text">
                        {t(primaryImage.label)}
                      </span>
                      {(primaryImage.source || primaryImage.credit) && (
                        <span className="game-media-credit">
                          {primaryImage.source ? (
                            <ContentLink href={primaryImage.source}>
                              {primaryImage.credit
                                ? t(primaryImage.credit)
                                : t("Image source")}
                              <ArrowUpRight size={12} aria-hidden="true" />
                            </ContentLink>
                          ) : (
                            t(primaryImage.credit || "")
                          )}
                        </span>
                      )}
                    </span>
                    <button
                      ref={expandButtonRef}
                      type="button"
                      className="game-media-expand"
                      onClick={() => setLightboxOpen(true)}
                      aria-label={t("Inspect screenshot")}
                      aria-haspopup="dialog"
                    >
                      <Maximize2 size={15} aria-hidden="true" />
                      <span>{t("Inspect screenshot")}</span>
                    </button>
                  </figcaption>
                </figure>
              ) : primaryVideo ? (
                <figure
                  className="game-media-frame is-video"
                  data-content-field={primaryVideo.field}
                >
                  <MediaPreview block={primaryVideo} />
                </figure>
              ) : (
                <div className="game-blueprint-stage" aria-hidden="true">
                  <OrbitArt seed={entry.key} className="game-blueprint-orbit" />
                  <div className="game-blueprint-hud">
                    <span className="game-blueprint-tag">
                      <Gamepad2 size={14} aria-hidden="true" />
                      <span>{t("No gameplay screenshot archived yet")}</span>
                    </span>
                    <div className="game-blueprint-meta">
                      {engineText && <span>{engineText}</span>}
                      {track &&
                        (!engineText ||
                          !new RegExp(`\\b${track}\\b`, "i").test(
                            engineText,
                          )) && <span>{track}</span>}
                      <span>{code}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Direct screenshot metadata strip (capture date, review date, original creator image) */}
              {mediaMetaBlocks.length > 0 && (
                <div className="game-media-meta">
                  {mediaMetaBlocks.map((block, index) =>
                    block.type === "text" ? (
                      <div
                        key={`${block.field}-${index}`}
                        className="game-media-meta-item"
                        data-content-field={block.field}
                      >
                        <Calendar size={12} aria-hidden="true" />
                        <span className="game-media-meta-label">
                          {t(block.label || "")}
                        </span>
                        <span
                          className="game-media-meta-value"
                          lang={block.language === "en" ? "en" : undefined}
                        >
                          {t(block.value)}
                        </span>
                      </div>
                    ) : block.type === "links" ? (
                      <div
                        key={`${block.field}-${index}`}
                        className="game-media-meta-item is-link"
                        data-content-field={block.field}
                      >
                        {block.items.map((item, itemIndex) => (
                          <ContentLink
                            key={`${itemIndex}-${item.url}`}
                            href={item.url}
                          >
                            <span>{t(item.label)}</span>
                            <ArrowUpRight size={12} aria-hidden="true" />
                          </ContentLink>
                        ))}
                      </div>
                    ) : null,
                  )}
                </div>
              )}

              {/* Any secondary screenshots/videos */}
              {extraMedia.length > 0 && (
                <div className="game-extra-media">
                  {extraMedia.map((block, index) => (
                    <ContentBlockView
                      key={`${block.field}-${index}`}
                      block={block}
                      heading="h2"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Actions and at-a-glance facts */}
            <aside className="game-console" aria-labelledby={specHeadingId}>
              <div className="game-console-top">
                {actions.length > 0 && (
                  <div className="game-console-actions">
                    {primaryAction && (
                      <ActionLink
                        href={primaryAction.href}
                        className="button button-primary game-cta-primary"
                      >
                        <ActionGlyph icon={primaryAction.icon} />
                        <span>{primaryAction.label}</span>
                        <ArrowUpRight
                          size={16}
                          className="game-cta-arrow"
                          aria-hidden="true"
                        />
                      </ActionLink>
                    )}
                    {secondaryActions.length > 0 && (
                      <div className="game-cta-secondary-list">
                        {secondaryActions.map((action) => (
                          <ActionLink
                            key={action.href}
                            href={action.href}
                            className="game-cta-secondary"
                          >
                            <ActionGlyph icon={action.icon} />
                            <span>{action.label}</span>
                            <ArrowUpRight
                              size={14}
                              className="game-cta-arrow"
                              aria-hidden="true"
                            />
                          </ActionLink>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="game-console-specs">
                  <div className="game-console-specs-head">
                    <h2 id={specHeadingId} className="game-console-label">
                      {t("At a glance")}
                    </h2>
                    {(demoKindBadge || sourceScopeBadge) && (
                      <div className="game-console-pills" aria-hidden="true">
                        {demoKindBadge?.type === "text" && (
                          <span
                            className={`game-status-pill${primaryAction?.icon === "play" ? " is-playable" : ""}`}
                          >
                            {t(demoKindBadge.value)}
                          </span>
                        )}
                        {sourceScopeBadge?.type === "text" && (
                          <span className="game-status-pill">
                            {t(sourceScopeBadge.value)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <dl className="game-spec-list">
                    {heroSpecBlocks.map((block, index) => (
                      <div
                        key={`${block.field}-${index}`}
                        className={`game-spec-row is-${block.type}`}
                        data-content-field={block.field}
                      >
                        <dt>{t(block.label || "")}</dt>
                        <dd lang={block.language === "en" ? "en" : undefined}>
                          {block.type === "list" ? (
                            <ul className="game-spec-chips">
                              {block.items.map((item, itemIndex) => (
                                <li key={`${itemIndex}-${item}`}>{t(item)}</li>
                              ))}
                            </ul>
                          ) : block.type === "text" ? (
                            t(block.value)
                          ) : null}
                        </dd>
                      </div>
                    ))}
                    {track && entry.kind !== "threejs-game" && (
                      <div className="game-spec-row is-track">
                        <dt>{t("Track")}</dt>
                        <dd>{track}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {(hasAccess || hasCommunity) && (
                <div className="game-console-foot">
                  {hasAccess && (
                    <a href="#record-resources" className="game-console-jump">
                      <span>{t("Jump to links & controls")}</span>
                      <ArrowDown size={13} aria-hidden="true" />
                    </a>
                  )}
                  {hasCommunity && (
                    <a href="#community" className="game-console-jump">
                      <span>{t("Skip to ratings")}</span>
                      <ArrowDown size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </header>

      {/* Section navigation */}
      {outline.length > 1 && (
        <div
          className={`game-subnav${heroPast ? " is-stuck" : ""}`}
          data-stuck={heroPast || undefined}
        >
          <div className="game-wrap game-subnav-inner">
            <nav className="game-subnav-nav" aria-label={t("On this record")}>
              {outline.map((item, idx) => {
                const isTop = item.id === "record-intro";
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`game-subnav-link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span className="game-subnav-num" aria-hidden="true">
                      {isTop ? (
                        <ArrowUp size={12} strokeWidth={2.25} />
                      ) : item.id === "record-related" ? (
                        <ArrowRight size={12} />
                      ) : (
                        String(idx).padStart(2, "0")
                      )}
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {primaryAction && (
              <div className="game-subnav-cta">
                <span className="game-subnav-title">{headingText}</span>
                <ActionLink
                  href={primaryAction.href}
                  className="button button-primary game-subnav-button"
                >
                  <ActionGlyph icon={primaryAction.icon} />
                  <span>
                    {primaryAction.icon === "play"
                      ? t("Play")
                      : primaryAction.icon === "download"
                        ? t("Download")
                        : primaryAction.icon === "code"
                          ? t("Source")
                          : t("Open")}
                  </span>
                </ActionLink>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reading sections */}
      <div className="game-wrap game-sections">
        {/* SECTION 01: Record-specific details (Three.js technical facts) */}
        {hasWorkflow && (
          <section
            className="game-section game-workflow record-section record-guidance"
            id="record-guidance"
            aria-labelledby="game-workflow-heading"
          >
            <GameSectionHeader
              index={workflowNo}
              id="game-workflow-heading"
              title={t(
                entry.kind === "threejs-game" ? "Details" : "How it was built",
              )}
            />

            {/* Technical facts, primarily for Three.js records */}
            {remainingGuidance.length > 0 && (
              <div className="game-tech-grid">
                {remainingGuidance.map((block, index) =>
                  block.type === "facts" ? (
                    <section
                      key={`${block.field}-${index}`}
                      className="game-tech-card"
                      data-content-field={block.field}
                    >
                      <h3 className="game-card-title">{t(block.label)}</h3>
                      <ProvenanceFacts items={block.items} />
                    </section>
                  ) : (
                    <div
                      key={`${block.field}-${index}`}
                      className="game-tech-card"
                    >
                      <ContentBlockView block={block} heading="h2" />
                    </div>
                  ),
                )}
              </div>
            )}
          </section>
        )}

        {/* SECTION 02: PLAY, SOURCE & RELATED RESOURCES */}
        {hasAccess && (
          <section
            className="game-section game-access record-section record-resources"
            id="record-resources"
            aria-labelledby="game-access-heading"
          >
            <GameSectionHeader
              index={accessNo}
              id="game-access-heading"
              title={t(
                entry.kind === "threejs-game"
                  ? "Links & resources"
                  : "Play & source",
              )}
            />

            {destinations.length > 0 && (
              <div className="game-destination-grid">
                {destinations.map((dest, index) => (
                  <GameDestination
                    key={dest.field}
                    field={dest.field}
                    blocks={dest.blocks}
                    demoIcon={demoIcon}
                    featured={index === 0}
                  />
                ))}
              </div>
            )}

            {resourceIdsBlock && resourceIdsBlock.type === "links" && (
              <section
                className="game-resources-strip"
                data-content-field={resourceIdsBlock.field}
              >
                <div className="game-resources-head">
                  <h3>{t(resourceIdsBlock.label)}</h3>
                  <span className="game-count">
                    {resourceIdsBlock.items.length}
                  </span>
                </div>
                <ul className="game-resources-grid">
                  {resourceIdsBlock.items.map((item, index) => {
                    const id = resourceIdFromUrl(item.url);
                    const info = linkedResources[id];
                    return (
                      <li key={`${index}-${item.url}`}>
                        <ContentLink href={item.url}>
                          <span className="game-resource-tile">
                            {info?.identity?.asset ? (
                              <ResourceIcon
                                resource={info.resource}
                                identity={info.identity}
                                size={36}
                              />
                            ) : (
                              <span
                                className="game-resource-fallback"
                                aria-hidden="true"
                              >
                                <Layers size={18} />
                              </span>
                            )}
                            <span className="game-resource-body">
                              <span className="game-resource-title">
                                <span>{t(item.label)}</span>
                                <ArrowUpRight size={14} aria-hidden="true" />
                              </span>
                              {info?.summary && (
                                <span className="game-resource-summary">
                                  {info.summary}
                                </span>
                              )}
                            </span>
                          </span>
                        </ContentLink>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {remainingResources.length > 0 && (
              <div className="game-tech-grid">
                {remainingResources.map((block, index) =>
                  block.type === "facts" ? (
                    <section
                      key={`${block.field}-${index}`}
                      className="game-tech-card"
                      data-content-field={block.field}
                    >
                      <h3 className="game-card-title">{t(block.label)}</h3>
                      <ProvenanceFacts items={block.items} />
                    </section>
                  ) : (
                    <div
                      key={`${block.field}-${index}`}
                      className="game-tech-card"
                    >
                      <ContentBlockView block={block} heading="h2" />
                    </div>
                  ),
                )}
              </div>
            )}
          </section>
        )}

        {/* SECTION 04: COMMUNITY RATINGS & DISCUSSION */}
        {isValidElement(children)
          ? cloneElement(children as ReactElement<{ sectionIndex?: number }>, {
              sectionIndex: communityNo || undefined,
            })
          : children}

        {/* SECTION 05: KEEP EXPLORING — RELATED GAMES */}
        {relatedGames.length > 0 && (
          <section
            id="record-related"
            className="game-section game-more"
            aria-labelledby="game-more-heading"
          >
            <div className="game-more-head">
              <div>
                <span className="kicker">{t("Keep exploring")}</span>
                <h2 id="game-more-heading">{t("More game examples")}</h2>
              </div>
              <Link to={collection.path} className="inline-link game-more-all">
                <span>{t("Browse all games")}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="game-more-grid">
              {relatedGames.map((item) => (
                <article key={item.key} className="game-more-card">
                  <Link
                    to={item.url}
                    className="game-more-link"
                    title={item.title}
                  >
                    <div className="game-more-media">
                      {item.imageSrc ? (
                        <img
                          src={publicAsset(item.imageSrc)}
                          alt=""
                          width={item.imageWidth || 640}
                          height={item.imageHeight || 360}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="game-more-placeholder" />
                      )}
                    </div>
                    <div className="game-more-body">
                      <h3>
                        <span>{item.title}</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </h3>
                      <div className="game-more-meta">
                        {item.engine && (
                          <span className="game-more-engine">
                            {item.engine}
                          </span>
                        )}
                        {item.track && (
                          <span className="game-more-track">{item.track}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Native modal keeps focus with the screenshot until it closes. */}
      {lightboxOpen && primaryImage && (
        <dialog
          ref={lightboxRef}
          className="game-lightbox"
          aria-label={headingText}
          onClose={() => {
            setLightboxOpen(false);
            expandButtonRef.current?.focus();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              event.currentTarget.close();
            }
          }}
        >
          <div className="game-lightbox-shell">
            <div className="game-lightbox-bar">
              <span className="game-lightbox-title">{headingText}</span>
              <button
                type="button"
                className="game-lightbox-close"
                onClick={() => lightboxRef.current?.close()}
                aria-label={t("Close preview")}
              >
                <X size={18} aria-hidden="true" />
                <span>{t("Close preview")}</span>
              </button>
            </div>
            <div className="game-lightbox-stage">
              <img
                src={publicAsset(primaryImage.src)}
                alt={primaryImage.alt}
                width={primaryImage.width}
                height={primaryImage.height}
              />
            </div>
            <p className="game-lightbox-caption">{t(primaryImage.label)}</p>
          </div>
        </dialog>
      )}
    </article>
  );
}
