import { Fragment, useEffect, useId, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Clapperboard,
  CodeXml,
  Download,
  Play,
} from "lucide-react";
import { Link, useSiteI18n, SourceLanguage } from "../lib/i18n";
import type {
  ContentBlock,
  ContentEntry,
  ContentKind,
  ContentSection,
  Fact,
} from "../../content/models";
import { contentKinds } from "../../content/models";
import { groupRecordings } from "../../content/media";
import { pages } from "../../content/site";
import { publicAsset } from "../../src/publicAsset";
import { pillars } from "../lib/pillars";
import { seeded } from "../lib/motion";
import {
  researchReadiness,
  researchSnapshot,
} from "../../content/research-browser";
export function ContentLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/") && href.split(/[?#]/)[0].endsWith("/"))
    return <Link to={href}>{children}</Link>;
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
export function MediaPreview({
  block,
}: {
  block: Extract<ContentBlock, { type: "video" }>;
}) {
  const { t } = useSiteI18n();
  return (
    <div
      className={`media-preview${block.mobile ? " has-mobile-preview" : ""}`}
    >
      <video
        className="preview-desktop"
        style={{ aspectRatio: block.aspectRatio }}
        controls
        playsInline
        preload="none"
        poster={block.poster ? publicAsset(block.poster) : undefined}
        src={publicAsset(block.src)}
        aria-label={block.label}
      >
        {t("Your browser does not support this preview.")}
      </video>
      {block.mobile && (
        <video
          className="preview-mobile"
          style={{ aspectRatio: block.mobile.aspectRatio }}
          controls
          playsInline
          preload="none"
          poster={publicAsset(block.mobile.poster)}
          src={publicAsset(block.mobile.src)}
          aria-label={`${block.label} — ${t("mobile preview")}`}
        >
          {t("Your browser does not support this preview.")}
        </video>
      )}
    </div>
  );
}
function Facts({ items }: { items: Fact[] }) {
  const { t } = useSiteI18n();
  return (
    <dl className="metadata-facts">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`}>
          <dt>{t(item.label)}</dt>
          <dd>
            {item.type === "group" ? (
              <Facts items={item.items} />
            ) : item.type === "link" ? (
              <ContentLink href={item.url}>{item.url}</ContentLink>
            ) : (
              t(item.value)
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
export function ContentBlockView({
  block,
  heading = "h1",
}: {
  block: ContentBlock;
  heading?: "h1" | "h2" | "h3";
}) {
  const { t } = useSiteI18n(),
    Heading = heading,
    Subheading = heading === "h1" ? "h2" : heading === "h2" ? "h3" : "h4";
  const language = block.language === "en" ? "en" : undefined;
  switch (block.type) {
    case "title":
      return (
        <Heading
          className="content-title"
          lang={language}
          data-content-field={block.field}
        >
          {block.value}
        </Heading>
      );
    case "lead":
      return (
        <p
          className="content-lead"
          lang={language}
          data-content-field={block.field}
        >
          {block.value}
        </p>
      );
    case "text":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{t(block.label || "")}</Subheading>
          <p lang={language}>{t(block.value)}</p>
        </section>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{t(block.label)}</Subheading>
          <List lang={language}>
            {block.items.map((item, index) => (
              <li key={`${index}-${item}`}>{t(item)}</li>
            ))}
          </List>
        </section>
      );
    }
    case "links":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{t(block.label)}</Subheading>
          <ul className="content-links">
            {block.items.map((item, index) => (
              <li key={`${index}-${item.url}`}>
                <ContentLink href={item.url}>
                  {t(item.label)}
                  <ArrowUpRight size={13} />
                </ContentLink>
                {item.note && (
                  <p
                    lang={
                      item.noteLanguage === "zh" || t(item.note) !== item.note
                        ? "zh-CN"
                        : "en"
                    }
                  >
                    {t(item.note)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      );
    case "image":
      return (
        <figure className="content-image" data-content-field={block.field}>
          <img
            src={publicAsset(block.src)}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
          />
          <figcaption>
            <span>{t(block.label)}</span>
            {block.source ? (
              <ContentLink href={block.source}>
                {block.credit ? t(block.credit) : t("Image source")}
                <ArrowUpRight size={12} />
              </ContentLink>
            ) : (
              block.credit && <span>{t(block.credit)}</span>
            )}
          </figcaption>
        </figure>
      );
    case "facts":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{t(block.label)}</Subheading>
          <Facts items={block.items} />
        </section>
      );
    case "video":
      return (
        <figure className="content-video" data-content-field={block.field}>
          <MediaPreview block={block} />
        </figure>
      );
    default: {
      const unreachable: never = block;
      throw new Error(
        `Unregistered content block: ${JSON.stringify(unreachable)}`,
      );
    }
  }
}
/** Reader sections in page order; "metadata" blocks stay in the manifest only. */
const readerSections = [
  "intro",
  "media",
  "guidance",
  "resources",
  "provenance",
] as const;
type ReaderSection = (typeof readerSections)[number];
const sectionLabels: Record<ReaderSection, string> = {
  intro: "Overview",
  media: "Media",
  guidance: "Details",
  resources: "Links & resources",
  provenance: "Sources & evidence",
};
export function sectionOf(block: ContentBlock): ContentSection {
  return block.type === "title" || block.type === "lead"
    ? "intro"
    : block.type === "image" || block.type === "video"
      ? "media"
      : block.section || (block.type === "links" ? "resources" : "guidance");
}
export function englishSource(entry: ContentEntry) {
  return (
    entry.descriptionLanguage === "en" ||
    entry.blocks.some(
      (block) =>
        block.section !== "metadata" &&
        ((block.type === "links" &&
          block.items.some(
            (item) => item.note && item.noteLanguage === "en",
          )) ||
          (block.language === "en" &&
            ((block.type === "text" && block.value.length > 60) ||
              (block.type === "list" &&
                block.items.some((item) => item.length > 60))))),
    )
  );
}
export function ContentDocument({
  entry,
  heading = "h1",
}: {
  entry: ContentEntry;
  heading?: "h1" | "h2" | "h3";
}) {
  const { t } = useSiteI18n(),
    anchor = entry.url.split("#")[1];
  const sections = readerSections
    .map((section) => ({
      section,
      blocks: entry.blocks.filter((block) => sectionOf(block) === section),
    }))
    .filter(({ blocks }) => blocks.length > 0);
  const outline = heading === "h1" && sections.length >= 3;
  return (
    <article
      id={anchor}
      className={`content-record content-${entry.kind}`}
      data-content-key={entry.key}
      data-content-kind={entry.kind}
    >
      <span className="eyebrow">{t(contentKinds[entry.kind].label)}</span>
      <SourceLanguage
        partial={entry.descriptionLanguage !== "en"}
        english={englishSource(entry)}
      />
      {outline && (
        <nav className="record-outline" aria-label={t("On this record")}>
          {sections.map(({ section }) => (
            <a key={section} href={`#record-${section}`}>
              {t(sectionLabels[section])}
            </a>
          ))}
        </nav>
      )}
      {sections.map(({ section, blocks }) => (
        <div
          className={`record-section record-${section}`}
          id={outline ? `record-${section}` : undefined}
          key={section}
        >
          {blocks.map((block, index) => (
            <ContentBlockView
              key={`${block.field}-${index}`}
              block={block}
              heading={heading}
            />
          ))}
        </div>
      ))}
    </article>
  );
}
export function ContentCard({
  entry,
}: {
  entry: Pick<
    ContentEntry,
    "key" | "kind" | "title" | "url" | "description" | "descriptionLanguage"
  >;
}) {
  const { t } = useSiteI18n();
  const nativeChinese = entry.key.startsWith("document:zh/");
  const descriptionLanguage =
    entry.descriptionLanguage || (nativeChinese ? "zh" : undefined);
  return (
    <article className="content-card" data-content-ref={entry.key}>
      <span className="small-label">{t(contentKinds[entry.kind].label)}</span>
      <SourceLanguage english={entry.descriptionLanguage === "en"} />
      <h3 lang={nativeChinese ? "zh-CN" : undefined}>
        <Link to={entry.url}>
          {entry.title}
          <ArrowRight size={15} />
        </Link>
      </h3>
      <p lang={descriptionLanguage === "zh" ? "zh-CN" : descriptionLanguage}>
        {entry.description}
      </p>
    </article>
  );
}
export function RelatedDemos({ demos }: { demos: ContentEntry<"demo">[] }) {
  const { t } = useSiteI18n();
  if (!demos.length) return null;
  return (
    <section className="related-content">
      <h2>
        {t("All project recordings")}{" "}
        <span className="count-label">{demos.length}</span>
      </h2>
      <p>{t("Choose a preview or open the original recording.")}</p>
      <div className="content-grid">
        {groupRecordings(demos).map((views) => (
          <div className="recording-links" key={views[0].data.recordingId}>
            {views.map((entry) => (
              <ContentCard key={entry.key} entry={entry} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Record pages. The detail template reads the same reviewed blocks as the
   dialogs and cards; it only decides where each block sits:
   - the intro (title + lead) becomes a cinematic hero,
   - short, single-value guidance fields become an "At a glance" spec rail,
   - every other block flows through numbered reading sections.
   Every field keeps its data-content-field and stays inside the one
   [data-content-key] article.
   -------------------------------------------------------------------------- */

type HeroMedia = {
  src: string;
  width?: number;
  height?: number;
  video: boolean;
};
/** The first screenshot, or the poster of the first recording. */
function heroMedia(blocks: readonly ContentBlock[]): HeroMedia | null {
  for (const block of blocks) {
    if (block.type === "image")
      return {
        src: block.src,
        width: block.width,
        height: block.height,
        video: false,
      };
    if (block.type === "video" && block.poster)
      return { src: block.poster, video: true };
  }
  return null;
}

/** Short guidance values read better as a spec sheet than as paragraphs.
 *  Fields that also own another block stay in the flow so their order holds. */
function specBlocks(blocks: readonly ContentBlock[]) {
  const counts = new Map<string, number>();
  for (const block of blocks)
    counts.set(block.field, (counts.get(block.field) || 0) + 1);
  return blocks.filter(
    (block) =>
      counts.get(block.field) === 1 &&
      sectionOf(block) === "guidance" &&
      Boolean(block.label) &&
      ((block.type === "text" &&
        block.value.length <= 64 &&
        !block.value.includes("\n")) ||
        (block.type === "list" &&
          !block.ordered &&
          block.items.length <= 12 &&
          block.items.every((item) => item.length <= 36))),
  );
}

export type ActionIcon =
  "play" | "download" | "code" | "book" | "film" | "link";
export type HeroAction = { href: string; label: string; icon: ActionIcon };
const actionFields: Partial<Record<ContentKind, readonly string[]>> = {
  example: ["demo", "source", "tutorial"],
  foundation: ["demo", "source", "tutorial"],
  "threejs-game": ["demo", "repository_url"],
  resource: ["url", "links"],
  agent: ["sourceUrl", "codeUrl", "evidenceUrl"],
  testing: ["access", "sourceUrl"],
  demo: ["originalUrl", "sourceUrl", "resourceId"],
  path: ["previewSelection"],
};
const actionIcons: Record<string, ActionIcon> = {
  demo: "play",
  game_access: "play",
  source: "code",
  repository_url: "code",
  sourceUrl: "code",
  codeUrl: "code",
  url: "code",
  tutorial: "book",
  originalUrl: "film",
};
function firstFactLink(
  items: readonly Fact[],
): { label: string; url: string } | undefined {
  for (const item of items) {
    if (item.type === "link") return { label: item.label, url: item.url };
    if (item.type === "group") {
      const found = firstFactLink(item.items);
      if (found) return found;
    }
  }
  return undefined;
}
export function heroActions(
  entry: ContentEntry,
  t: (key: string) => string,
): HeroAction[] {
  if (entry.kind === "repository-research") {
    const repository = entry.data.canonical_repo || entry.data.requested_repo;
    const actions: HeroAction[] = [
      {
        href: `https://github.com/${repository.split("/").map(encodeURIComponent).join("/")}`,
        label: t("Open repository"),
        icon: "code",
      },
    ];
    const access = entry.data.game_access;
    if (access)
      actions.push({
        href: access.url,
        label: t(access.kind === "download" ? "Download game" : "Play game"),
        icon: access.kind === "download" ? "download" : "play",
      });
    return actions;
  }
  const actions: HeroAction[] = [];
  for (const field of actionFields[entry.kind] || []) {
    const block = entry.blocks.find(
      (block) =>
        block.field === field &&
        (block.type === "links" || block.type === "facts"),
    );
    const link =
      block?.type === "links" && block.items.length
        ? {
            url: block.items[0].url,
            label:
              block.items.length === 1 ? block.items[0].label : block.label,
          }
        : block?.type === "facts"
          ? firstFactLink(block.items)
          : undefined;
    if (!link || actions.some((action) => action.href === link.url)) continue;
    // A demo field that only points at source or a project page is not a play
    // link (fields.ts labels those blocks "Source/Project reference — …").
    const kind = block?.label || "";
    const icon: ActionIcon = kind.startsWith("Source reference")
      ? "code"
      : kind.startsWith("Project reference")
        ? "link"
        : actionIcons[field] || "link";
    actions.push({
      href: link.url,
      label: t(link.label),
      icon: icon === "play" && /download/i.test(link.label) ? "download" : icon,
    });
  }
  return actions;
}
export function ActionGlyph({ icon }: { icon: ActionIcon }) {
  const props = { size: 17, "aria-hidden": true } as const;
  switch (icon) {
    case "play":
      return <Play {...props} fill="currentColor" />;
    case "download":
      return <Download {...props} />;
    case "code":
      return <CodeXml {...props} />;
    case "book":
      return <BookOpen {...props} />;
    case "film":
      return <Clapperboard {...props} />;
    default:
      return <ArrowUpRight {...props} />;
  }
}
export function ActionLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (href.startsWith("#"))
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  if (href.startsWith("/") && href.split(/[?#]/)[0].endsWith("/"))
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    );
  const external = href.startsWith("http");
  return (
    <a
      className={className}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function hashText(text: string) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
const round = (value: number) => Math.round(value * 10) / 10;

/** Catalogue designations for the art hero's annotation ("TOOL · 6019"). */
const kindCodes: Partial<Record<ContentKind, string>> = {
  paper: "PAPER",
  "threejs-game": "GAME",
  resource: "TOOL",
  example: "GAME",
  foundation: "ENGINE",
  agent: "AGENT",
  testing: "TEST",
  "testing-pack": "TEST",
  "repository-research": "REPO",
  path: "PATH",
  step: "STEP",
  demo: "DEMO",
  collection: "SET",
  document: "DOC",
};
export const catalogueCode = (entry: ContentEntry) =>
  `${kindCodes[entry.kind] || entry.kind.slice(0, 4).toUpperCase()} · ${hashText(entry.key).toString(16).slice(0, 4).toUpperCase()}`;

/** A deterministic "uncharted world" for records without imagery: a ringed
 *  planet, a few moons and a star field, all seeded by the record key. The
 *  optional label is drawn as a survey annotation: a leader line from the
 *  planet's rim to a mono catalogue code, with moons and stars kept clear. */
export function OrbitArt({
  seed,
  label,
  className = "",
}: {
  seed: string;
  label?: string;
  className?: string;
}) {
  const uid = "orbit" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const random = seeded(hashText(seed));
  const radius = round(112 + random() * 44);
  const cx = round(500 + (random() - 0.5) * 70),
    cy = round(400 + (random() - 0.5) * 60);
  const tilt = round(-26 + random() * 22);
  const rings = [1.48, 2.02, 2.68].map((scale, index) => ({
    rx: round(radius * scale),
    ry: round(radius * scale * (0.22 + random() * 0.1)),
    index,
  }));
  // The annotation (relative to the planet's centre): rim point at -60deg,
  // an elbow up and out, a short horizontal tail, then the label. It stays
  // left of x≈800, the part of the viewBox every layout keeps on screen.
  const rimAngle = (-60 * Math.PI) / 180;
  const rim = {
    x: round(Math.cos(rimAngle) * radius * 1.04),
    y: round(Math.sin(rimAngle) * radius * 1.04),
  };
  const elbow = { x: round(rim.x + radius * 0.2), y: round(rim.y - 40) };
  const tail = { x: round(elbow.x + 30), y: elbow.y };
  // Generous box around the label text (13px mono, wide tracking).
  const labelBox = label
    ? {
        x0: tail.x - 6,
        x1: tail.x + 16 + label.length * 11,
        y0: tail.y - 20,
        y1: tail.y + 14,
      }
    : null;
  const inLabel = (x: number, y: number, pad = 0) =>
    labelBox !== null &&
    x > labelBox.x0 - pad &&
    x < labelBox.x1 + pad &&
    y > labelBox.y0 - pad &&
    y < labelBox.y1 + pad;
  const tiltRad = (tilt * Math.PI) / 180;
  const moons = rings.map((ring, index) => {
    const angle = random() * Math.PI * 2;
    const moon = {
      x: round(Math.cos(angle) * ring.rx),
      y: round(Math.sin(angle) * ring.ry),
      r: round(index === 2 ? 7 + random() * 6 : 3 + random() * 4),
    };
    // Moons live in the tilted ring frame; one that would sit on the label
    // moves to the opposite side of its ring.
    const worldX = moon.x * Math.cos(tiltRad) - moon.y * Math.sin(tiltRad),
      worldY = moon.x * Math.sin(tiltRad) + moon.y * Math.cos(tiltRad);
    return inLabel(worldX, worldY, moon.r + 6)
      ? { ...moon, x: -moon.x, y: -moon.y }
      : moon;
  });
  const bands = Array.from({ length: 4 }, () => ({
    y: round((random() - 0.5) * radius * 1.5),
    h: round(5 + random() * 18),
    o: round(0.05 + random() * 0.12),
  }));
  const stars = Array.from({ length: 64 }, (_, index) => ({
    x: round(random() * 1000),
    y: round(random() * 800),
    r: round(random() < 0.85 ? 0.5 + random() * 0.9 : 1.4 + random() * 1.2),
    o: round(0.2 + random() * 0.8),
    twinkle: index % 9 === 0,
  })).filter((star) => !inLabel(star.x - cx, star.y - cy, 8));
  const front = (rx: number, ry: number) =>
    `M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`;
  return (
    <svg
      className={`orbit-art ${className}`.trim()}
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${uid}-planet`} cx="34%" cy="28%" r="78%">
          <stop offset="0" style={{ stopColor: "var(--art-hi)" }} />
          <stop offset="0.42" style={{ stopColor: "var(--art-a)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-b)" }} />
        </radialGradient>
        <radialGradient id={`${uid}-shade`} cx="74%" cy="78%" r="78%">
          <stop offset="0" stopColor="#000" stopOpacity="0.72" />
          <stop offset="0.62" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop
            offset="0.5"
            style={{ stopColor: "var(--art-a)", stopOpacity: 0.42 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--art-a)", stopOpacity: 0 }}
          />
        </radialGradient>
        <clipPath id={`${uid}-clip`}>
          <circle r={radius} />
        </clipPath>
      </defs>
      <g className="orbit-art-stars">
        {stars.map((star, index) => (
          <circle
            key={index}
            className={star.twinkle ? "is-twinkle" : undefined}
            cx={star.x}
            cy={star.y}
            r={star.r}
            opacity={star.o}
          />
        ))}
      </g>
      <g className="orbit-art-system" transform={`translate(${cx} ${cy})`}>
        <circle
          className="orbit-art-glow"
          r={round(radius * 1.9)}
          fill={`url(#${uid}-glow)`}
        />
        <g transform={`rotate(${tilt})`}>
          {rings.map((ring) => (
            <ellipse
              key={ring.index}
              className={`orbit-art-ring is-${ring.index}`}
              rx={ring.rx}
              ry={ring.ry}
            />
          ))}
          {moons.map(
            (moon, index) =>
              moon.y < 0 && (
                <circle
                  key={index}
                  className="orbit-art-moon"
                  cx={moon.x}
                  cy={moon.y}
                  r={moon.r}
                />
              ),
          )}
        </g>
        <circle r={radius} fill={`url(#${uid}-planet)`} />
        <g clipPath={`url(#${uid}-clip)`} transform={`rotate(${tilt})`}>
          {bands.map((band, index) => (
            <rect
              key={index}
              x={-radius}
              y={band.y}
              width={radius * 2}
              height={band.h}
              fill="#fff"
              opacity={band.o}
            />
          ))}
        </g>
        <circle r={radius} fill={`url(#${uid}-shade)`} />
        <g transform={`rotate(${tilt})`}>
          {rings.map((ring) => (
            <path
              key={ring.index}
              className={`orbit-art-ring is-front is-${ring.index}`}
              d={front(ring.rx, ring.ry)}
            />
          ))}
          {moons.map(
            (moon, index) =>
              moon.y >= 0 && (
                <circle
                  key={index}
                  className="orbit-art-moon"
                  cx={moon.x}
                  cy={moon.y}
                  r={moon.r}
                />
              ),
          )}
        </g>
      </g>
      {label && (
        <g
          className="orbit-art-annotation"
          transform={`translate(${cx} ${cy})`}
        >
          <path
            className="orbit-art-leader"
            d={`M ${rim.x} ${rim.y} L ${elbow.x} ${elbow.y} H ${tail.x}`}
          />
          <circle className="orbit-art-pin" cx={rim.x} cy={rim.y} r={2.6} />
          <text
            className="orbit-art-label"
            x={round(tail.x + 10)}
            y={tail.y}
            dominantBaseline="central"
          >
            {label}
          </text>
        </g>
      )}
    </svg>
  );
}

export const titleScale = (text: string) =>
  text.length <= 18
    ? "is-xl"
    : text.length <= 34
      ? "is-l"
      : text.length <= 64
        ? "is-m"
        : "is-s";
/** The last Latin word of a display title takes the serif italic; repository
 *  slugs may break after each slash. Text content is unchanged. */
export function DisplayTitle({ text }: { text: string }) {
  const space = text.lastIndexOf(" "),
    last = space > 0 ? text.slice(space + 1) : "";
  const accent =
    /^[A-Za-z][A-Za-z'’-]{2,13}[.!?]?$/.test(last) &&
    !/[^\u0000-ɏ‐-‧\s]/.test(text);
  const head = accent ? text.slice(0, space + 1) : text;
  return (
    <>
      {head.split("/").map((piece, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <>
              /<wbr />
            </>
          )}
          {piece}
        </Fragment>
      ))}
      {accent && <span className="serif-accent">{last}</span>}
    </>
  );
}

function SpecItem({ block }: { block: ContentBlock }) {
  const { t } = useSiteI18n();
  const lang = block.language === "en" ? "en" : undefined;
  return (
    <div
      className={`record-spec-item is-${block.type}`}
      data-content-field={block.field}
    >
      <dt>{t(block.label || "")}</dt>
      <dd lang={lang}>
        {block.type === "list" ? (
          <ul>
            {block.items.map((item, index) => (
              <li key={`${index}-${item}`}>{t(item)}</li>
            ))}
          </ul>
        ) : block.type === "text" ? (
          t(block.value)
        ) : null}
      </dd>
    </div>
  );
}

/** A numbered section heading; the number is a CSS counter. */
export function RecordSectionHead({
  title,
  count,
  id,
}: {
  title: string;
  count?: number;
  id?: string;
}) {
  return (
    <div className="record-section-head">
      <span className="record-section-index" aria-hidden="true" />
      <h2 id={id}>
        {title}
        {count !== undefined && <span className="count-label">{count}</span>}
      </h2>
    </div>
  );
}

export type RecordOutlineItem = { id: string; label: string };
export function RecordDocument({
  entry,
  mark,
  extras = [],
  children,
}: {
  entry: ContentEntry;
  mark?: ReactNode;
  extras?: RecordOutlineItem[];
  children?: ReactNode;
}) {
  const { t } = useSiteI18n();
  const specId = useId();
  const kind = contentKinds[entry.kind],
    collection = pages[kind.page],
    pillar = pillars.find((item) =>
      item.links.some((link) => link.collection === kind.page),
    );
  const spec = specBlocks(entry.blocks);
  const sections = readerSections
    .map((section) => ({
      section,
      blocks: entry.blocks.filter(
        (block) => sectionOf(block) === section && !spec.includes(block),
      ),
    }))
    .filter(({ blocks }) => blocks.length > 0);
  const intro = sections.find(({ section }) => section === "intro")?.blocks;
  const flow = sections.filter(({ section }) => section !== "intro");
  const outline: RecordOutlineItem[] = [
    { id: "record-intro", label: t(sectionLabels.intro) },
    ...flow.map(({ section }) => ({
      id: `record-${section}`,
      label: t(sectionLabels[section]),
    })),
    ...extras,
  ];
  const media = heroMedia(entry.blocks);
  const actions: HeroAction[] = [
    ...(media?.video
      ? [
          {
            href: "#record-media",
            label: t("Watch the recording"),
            icon: "play" as const,
          },
        ]
      : []),
    ...heroActions(entry, t),
  ].slice(0, 3);
  const title = intro?.find((block) => block.type === "title");
  const heading = title?.type === "title" ? title.value : entry.title;
  const code = catalogueCode(entry);
  const outlineKey = outline.map((item) => item.id).join(" ");
  const [active, setActive] = useState<string | null>(null);
  // The current section is the last one whose top has passed a reading line
  // a little above the middle of the screen; at the very end of the page the
  // last section that is on screen wins, so short closing sections light up.
  useEffect(() => {
    const ids = outlineKey.split(" ");
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
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
  return (
    <article
      id={entry.url.split("#")[1]}
      className={`content-record content-${entry.kind} record-document`}
      data-content-key={entry.key}
      data-content-kind={entry.kind}
    >
      <header
        className="record-hero"
        data-hero={media ? "media" : "art"}
        data-tone={pillar?.id || "learn"}
      >
        <div className="record-hero-backdrop" aria-hidden="true">
          {media ? (
            <img
              src={publicAsset(media.src)}
              alt=""
              width={media.width}
              height={media.height}
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <OrbitArt seed={entry.key} label={code} />
          )}
        </div>
        <div className="record-hero-inner">
          <nav
            className="content-breadcrumb record-breadcrumb"
            aria-label={t("Breadcrumb")}
          >
            <Link to={collection.path}>
              <ArrowLeft size={15} aria-hidden="true" />
              {t(collection.title)}
            </Link>
          </nav>
          <div className="record-hero-copy">
            <p className="record-kicker">
              <span className="kicker">{t(kind.label)}</span>
              {pillar && (
                <span className="record-kicker-pillar">{t(pillar.label)}</span>
              )}
              <SourceLanguage
                partial={entry.descriptionLanguage !== "en"}
                english={englishSource(entry)}
              />
            </p>
            {mark && (
              <div className="content-resource-mark record-mark">{mark}</div>
            )}
            <div className="record-section record-intro" id="record-intro">
              {!title && (
                <h1
                  className={`content-title record-title ${titleScale(heading)}`}
                >
                  <DisplayTitle text={heading} />
                </h1>
              )}
              {intro?.map((block, index) =>
                block.type === "title" ? (
                  <h1
                    key={`${block.field}-${index}`}
                    className={`content-title record-title ${titleScale(block.value)}`}
                    lang={block.language === "en" ? "en" : undefined}
                    data-content-field={block.field}
                  >
                    <DisplayTitle text={block.value} />
                  </h1>
                ) : block.type === "lead" ? (
                  <p
                    key={`${block.field}-${index}`}
                    className="content-lead record-lead"
                    lang={block.language === "en" ? "en" : undefined}
                    data-content-field={block.field}
                  >
                    {block.value}
                  </p>
                ) : null,
              )}
            </div>
            {actions.length > 0 && (
              <div className="record-actions">
                {actions.map((action, index) => (
                  <ActionLink
                    key={action.href}
                    href={action.href}
                    className={`button ${index === 0 ? "button-primary" : "button-secondary"} record-action`}
                  >
                    <ActionGlyph icon={action.icon} />
                    <span>{action.label}</span>
                  </ActionLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="record-body" id="record-body">
        <aside className="record-rail" aria-label={t("Record details")}>
          {spec.length > 0 && (
            <section className="record-spec" aria-labelledby={specId}>
              <h2 id={specId} className="record-rail-title">
                {t("At a glance")}
              </h2>
              <dl>
                {entry.kind === "repository-research" && (
                  <>
                    <div>
                      <dt>{t("Review depth")}</dt>
                      <dd>{t(researchReadiness(entry).label)}</dd>
                    </div>
                    <div>
                      <dt>{t("Evidence snapshot")}</dt>
                      <dd>{t(researchSnapshot(entry).label)}</dd>
                    </div>
                  </>
                )}
                {spec.map((block, index) => (
                  <SpecItem key={`${block.field}-${index}`} block={block} />
                ))}
              </dl>
            </section>
          )}
          {outline.length > 1 && (
            <nav className="record-outline" aria-label={t("On this record")}>
              <span className="record-rail-title" aria-hidden="true">
                {t("On this record")}
              </span>
              {/* Overview returns to the hero and stays unnumbered, so the
                  outline's 01, 02… match the numbered sections in the flow. */}
              {outline.map((item) => {
                const top = item.id === "record-intro";
                const className = [
                  top ? "record-outline-top" : "",
                  active === item.id ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={className || undefined}
                  >
                    <span className="record-outline-index" aria-hidden="true">
                      {top && <ArrowUp size={12} strokeWidth={2.25} />}
                    </span>
                    {item.label}
                  </a>
                );
              })}
            </nav>
          )}
        </aside>
        <div className="record-flow">
          {flow.map(({ section, blocks }) => (
            <div
              className={`record-section record-${section}`}
              id={`record-${section}`}
              key={section}
            >
              <RecordSectionHead title={t(sectionLabels[section])} />
              <div className="record-section-body">
                {blocks.map((block, index) => (
                  <ContentBlockView
                    key={`${block.field}-${index}`}
                    block={block}
                    heading="h2"
                  />
                ))}
              </div>
            </div>
          ))}
          {children}
        </div>
      </div>
    </article>
  );
}

/** A compact, image-led link to a related record. */
export function RecordMiniCard({ entry }: { entry: ContentEntry }) {
  const { t } = useSiteI18n();
  const media = heroMedia(entry.blocks);
  const page = contentKinds[entry.kind].page;
  const tone = pillars.find((item) =>
    item.links.some((link) => link.collection === page),
  )?.id;
  const language =
    entry.descriptionLanguage ||
    (entry.key.startsWith("document:zh/") ? "zh" : undefined);
  return (
    <article
      className="record-mini"
      data-content-ref={entry.key}
      data-tone={tone}
    >
      <div className="record-mini-media">
        {media ? (
          <img
            src={publicAsset(media.src)}
            alt=""
            loading="lazy"
            decoding="async"
            width={media.width || 640}
            height={media.height || 360}
          />
        ) : (
          <span className="record-mini-art" />
        )}
        {media?.video && (
          <span className="record-mini-play" aria-hidden="true">
            <Play size={15} fill="currentColor" />
          </span>
        )}
      </div>
      <div className="record-mini-body">
        <span className="small-label">{t(contentKinds[entry.kind].label)}</span>
        <h3>
          <Link to={entry.url}>
            {entry.title}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </h3>
        <p lang={language === "zh" ? "zh-CN" : language}>{entry.description}</p>
      </div>
    </article>
  );
}

/** Related examples or recordings as a numbered section of image-led cards. */
export function RecordShelf({
  id,
  title,
  note,
  entries,
}: {
  id: string;
  title: string;
  note?: string;
  entries: readonly ContentEntry[];
}) {
  if (!entries.length) return null;
  return (
    <section className="record-section record-shelf related-content" id={id}>
      <RecordSectionHead title={title} count={entries.length} />
      {note && <p className="record-shelf-note">{note}</p>}
      <div className="record-mini-grid">
        {entries.map((entry) => (
          <RecordMiniCard key={entry.key} entry={entry} />
        ))}
      </div>
    </section>
  );
}
/** Recordings keep their grouped order (each recording's views together). */
export function recordingOrder(demos: ContentEntry<"demo">[]) {
  return groupRecordings(demos).flat();
}
