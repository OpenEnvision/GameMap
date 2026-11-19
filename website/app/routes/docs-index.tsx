import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Archive,
  BookOpen,
  Box,
  ChevronDown,
  Compass,
  FileText,
  Gamepad2,
  Layers3,
  Search,
  Shapes,
  ShieldCheck,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import {
  DocumentationLayout,
  DocumentationLanguage,
  DocumentationSiteBand,
  documentationViews,
} from "../lib/docs";
import {
  documentationPortal,
  revealDocumentationGroup,
  searchDocumentation,
  topicTileLayout,
  type PortalDocument,
  type PortalTaskId,
} from "../lib/docs-home";
import { documentationHomeCopy } from "../lib/docs-home-copy";
import { contentFor } from "../../content/registry.server";
import { documentBodyLocale, docMessages } from "../../content/doc-language";
import { localeFromPath } from "../../content/locale";
import { url } from "../../content/site";
import { Link, useSiteI18n } from "../lib/i18n";
import { seeded } from "../lib/motion";
import "../styles/docs-home.css";

export function loader({ request }: LoaderFunctionArgs) {
  return {
    manifest: contentFor(request)
      .all("document")
      .map((entry) => entry.data),
    locale: localeFromPath(
      new URL(request.url).pathname,
      import.meta.env.BASE_URL,
    ),
  };
}
const taskIcons: Record<PortalTaskId, LucideIcon> = {
  tools: Compass,
  prototype: Gamepad2,
  assets: Shapes,
  testing: ShieldCheck,
};
const topicIcons: Record<string, LucideIcon> = {
  "Start building": Compass,
  "Explore the ecosystem": Box,
  "Production & engineering": Wrench,
  "Assets & generative tools": Shapes,
  "Evidence & evaluation": ShieldCheck,
  "About this atlas": BookOpen,
  "Skills & practice": Layers3,
};
const pad = (value: number) => String(value).padStart(2, "0");

/* Decorative star positions are computed once from a fixed seed so the
   prerendered markup and the hydrated markup are identical. */
const skyStars = (() => {
  const random = seeded(0x60d0c5);
  return Array.from({ length: 64 }, (_, index) => ({
    x: Math.round(random() * 1200),
    y: Math.round(random() * 640),
    r: +(0.5 + random() * random() * 1.6).toFixed(2),
    o: +(0.25 + random() * 0.65).toFixed(2),
    twinkle: index % 7 === 0,
  }));
})();

/** A moon on an elliptical orbit: two eased translations, a quarter period
 *  apart, trace the ellipse without squashing the moon itself. */
function Moon({
  rx,
  ry,
  duration,
  size,
  angle = 0,
  signal = false,
}: {
  rx: number;
  ry: number;
  duration: number;
  size: number;
  /** Where the moon rests without motion, and where its orbit starts. */
  angle?: number;
  signal?: boolean;
}) {
  const radians = (angle * Math.PI) / 180;
  return (
    <g
      className="docs-home-moon-x"
      style={
        {
          "--rx": `${rx}px`,
          "--ry": `${ry}px`,
          "--x": `${(rx * Math.cos(radians)).toFixed(1)}px`,
          "--y": `${(ry * Math.sin(radians)).toFixed(1)}px`,
          "--duration": `${duration}s`,
          "--delay": `${(-(angle / 360) * duration).toFixed(2)}s`,
        } as CSSProperties
      }
    >
      <g className="docs-home-moon-y">
        <circle
          r={size}
          className={signal ? "docs-home-moon is-signal" : "docs-home-moon"}
        />
      </g>
    </g>
  );
}

/** The reading room's sky: an eclipsed world on tilted orbits. Pure SVG,
 *  decorative only; motion lives in docs-home.css behind no-preference. */
function ReadingRoomSky() {
  return (
    <svg
      className="docs-home-sky"
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="docs-sky-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="0.38" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="docs-sky-core" cx="0.42" cy="0.38" r="0.62">
          <stop offset="0" stopColor="var(--soft)" />
          <stop offset="1" stopColor="var(--paper)" />
        </radialGradient>
        <linearGradient id="docs-sky-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--signal)" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="var(--accent)" stopOpacity="0.95" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g className="docs-home-sky-stars">
        {skyStars.map((star, index) => (
          <circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.r}
            opacity={star.o}
            className={star.twinkle ? "is-twinkling" : undefined}
            style={
              star.twinkle
                ? ({ "--delay": `${(index % 5) * 0.9}s` } as CSSProperties)
                : undefined
            }
          />
        ))}
      </g>
      <g transform="translate(940 250) rotate(-14)">
        <circle r="245" fill="url(#docs-sky-halo)" />
        <g className="docs-home-sky-orbits">
          <ellipse rx="250" ry="76" />
          <ellipse rx="380" ry="114" strokeDasharray="2 10" />
          <ellipse rx="540" ry="160" />
        </g>
        <Moon rx={380} ry={114} duration={64} size={6} angle={196} />
        <Moon rx={540} ry={160} duration={118} size={4.5} angle={148} signal />
        <circle r="136" fill="url(#docs-sky-core)" />
        <circle
          r="137"
          fill="none"
          stroke="url(#docs-sky-rim)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

/** A topic drawn as a small planetary system: one moon per guide (up to
 *  eight). Decorative only; it fills the feature tile's open middle. */
function TopicSystem({ count, seed }: { count: number; seed: number }) {
  const random = seeded(seed),
    total = Math.min(Math.max(count, 1), 8),
    step = total > 1 ? 150 / (total - 1) : 0,
    orbits = Array.from({ length: total }, (_, index) => {
      const rx = Math.round(70 + index * step);
      return {
        rx,
        ry: Math.round(rx * 0.36),
        size: +(3 + random() * 2).toFixed(1),
        duration: 34 + index * 12,
        angle: Math.round(random() * 360),
      };
    });
  return (
    <svg
      className="docs-home-topic-art"
      viewBox="0 0 480 260"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(240 130) rotate(-9)">
        {orbits.map((orbit) => (
          <ellipse
            key={orbit.rx}
            className="docs-home-topic-orbit"
            rx={orbit.rx}
            ry={orbit.ry}
          />
        ))}
        <circle className="docs-home-topic-core" r="34" />
        {orbits.map((orbit) => (
          <Moon key={orbit.rx} {...orbit} />
        ))}
      </g>
    </svg>
  );
}

function EnglishSource({ page }: { page: PortalDocument }) {
  const { locale } = useSiteI18n();
  return locale === "zh" && documentBodyLocale(page.document.slug) === "en" ? (
    <span className="source-language">EN</span>
  ) : null;
}
function GuideLink({
  page,
  reference = false,
  className = "docs-guide-link",
}: {
  page: PortalDocument;
  reference?: boolean;
  className?: string;
}) {
  const { t } = useSiteI18n();
  return (
    <Link
      to={url.document(page.document.slug)}
      className={className}
      data-content-ref={
        reference ? `document:${page.document.slug}` : undefined
      }
    >
      <span>{t(page.document.label)}</span>
      <EnglishSource page={page} />
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}

export default function DocsIndex() {
  const { manifest, locale } = useLoaderData<typeof loader>();
  const { t } = useSiteI18n();
  const text = docMessages(locale),
    copy = documentationHomeCopy(locale);
  const portal = useMemo(
    () => documentationPortal(manifest, documentationViews(manifest, locale)),
    [manifest, locale],
  );
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const hasQuery = Boolean(query.trim());
  const results = useMemo(
    () => searchDocumentation(portal.pages, query, t),
    [portal, query, t],
  );
  const clearSearch = () => {
    setQuery("");
    input.current?.focus();
  };
  useEffect(() => {
    setQuery("");
  }, [locale]);
  useEffect(() => {
    const ids = new Set([
      ...portal.groups.map((group) => group.id),
      "docs-archive-originals",
      "docs-archive-reconstructions",
    ]);
    const reveal = () => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (ids.has(id)) revealDocumentationGroup(id);
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [portal]);
  const topicText = (title: string, description: string) =>
    copy.topics[title] || { title: t(title), description: t(description) };

  return (
    <DocumentationLayout manifest={manifest} locale={locale}>
      <DocsPage
        full
        tabIndex={-1}
        tableOfContent={{ enabled: false }}
        footer={{
          className: "reader-pager",
          children: <DocumentationSiteBand />,
        }}
        className="docs-home"
      >
        <title>{`${text.title} — GameMap`}</title>
        <meta name="description" content={copy.introduction} />

        <header
          className="docs-home-hero"
          data-has-starter={Boolean(portal.starter)}
          data-searching={hasQuery}
        >
          <ReadingRoomSky />
          <div className="docs-home-utility">
            <p className="docs-home-eyebrow">{copy.eyebrow}</p>
            <div className="docs-home-utility-end">
              <span className="docs-home-count">
                <BookOpen size={14} aria-hidden="true" />
                {copy.guideCount(portal.coreCount)}
              </span>
              <DocumentationLanguage locale={locale} manifest={manifest} />
            </div>
          </div>

          <div className="docs-home-masthead">
            <DocsTitle className="docs-home-title">{text.title}</DocsTitle>
            <p className="docs-home-tagline">
              {copy.taglineBefore}
              <em>{copy.taglineAccent}</em>
              {copy.taglineAfter}
            </p>
          </div>

          <div className="docs-home-hero-grid">
            <div className="docs-home-intro">
              <p className="docs-home-lead">{copy.introduction}</p>
              <form
                className="docs-home-search"
                role="search"
                aria-label={copy.searchLabel}
                onSubmit={(event) => event.preventDefault()}
              >
                <span className="docs-home-search-icon">
                  <Search size={20} aria-hidden="true" />
                </span>
                <input
                  ref={input}
                  type="search"
                  aria-label={copy.searchLabel}
                  aria-describedby="docs-search-hint"
                  aria-controls={
                    hasQuery ? "docs-search-results" : "docs-directory"
                  }
                  placeholder={copy.searchPlaceholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault();
                      clearSearch();
                    }
                  }}
                />
                {query && (
                  <button
                    type="button"
                    aria-label={copy.clearSearch}
                    onClick={clearSearch}
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                )}
              </form>
              <div className="docs-home-search-meta">
                <p className="docs-home-search-hint" id="docs-search-hint">
                  {copy.searchHint}
                </p>
                <a className="docs-home-directory-jump" href="#docs-directory">
                  {copy.allDocuments}
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
              <noscript>
                <p className="docs-home-nojs">{copy.noJavaScript}</p>
              </noscript>
            </div>
            {portal.starter && (
              <Link
                className="docs-start docs-home-starter surface-card"
                to={url.document(portal.starter.document.slug)}
              >
                <svg
                  className="docs-home-starter-art"
                  viewBox="0 0 240 240"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="120" cy="120" r="56" />
                  <circle cx="120" cy="120" r="86" strokeDasharray="2 7" />
                  <circle cx="120" cy="120" r="116" />
                  <g className="docs-home-starter-orbit">
                    <circle cx="206" cy="120" r="4.5" />
                  </g>
                </svg>
                <div className="docs-home-starter-top">
                  <span className="docs-home-starter-icon">
                    <Compass size={22} aria-hidden="true" />
                  </span>
                  <span>{copy.starterEyebrow}</span>
                </div>
                <strong>{text.start}</strong>
                <p>{text.startDetail}</p>
                <span className="docs-home-starter-action">
                  <span>{copy.readGuide}</span>
                  <EnglishSource page={portal.starter} />
                  <span className="docs-home-starter-arrow">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            )}
          </div>
        </header>

        {hasQuery ? (
          <section
            className="docs-home-results"
            id="docs-search-results"
            aria-labelledby="docs-search-results-title"
          >
            <div className="docs-home-section-heading">
              <div>
                <h2 id="docs-search-results-title">{copy.resultsTitle}</h2>
              </div>
              <span className="docs-home-pill" role="status" aria-live="polite">
                {copy.resultCount(results.length)}
              </span>
            </div>
            {results.length ? (
              <ol className="docs-home-result-list">
                {results.map((page, index) => (
                  <li className="docs-home-result" key={page.document.slug}>
                    <span className="docs-home-result-index">
                      {pad(index + 1)}
                    </span>
                    <GuideLink page={page} />
                    <p>
                      {page.archive
                        ? page.archive === "original"
                          ? copy.originalLabel
                          : copy.reconstructionLabel
                        : topicText(page.group, page.description).title}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="docs-home-empty">
                <span className="docs-home-empty-icon">
                  <Search size={24} aria-hidden="true" />
                </span>
                <h3>{copy.emptyTitle}</h3>
                <p>{copy.emptyDescription}</p>
                <button type="button" onClick={clearSearch}>
                  {copy.clearSearch}
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            <section
              className="docs-home-tasks"
              aria-labelledby="docs-task-title"
            >
              <div className="docs-home-section-heading">
                <span className="docs-home-section-index">01</span>
                <div>
                  <h2 id="docs-task-title">{copy.taskTitle}</h2>
                  <p>{copy.taskDescription}</p>
                </div>
              </div>
              <div className="docs-home-task-grid">
                {portal.tasks.map(({ id, page }, index) => {
                  const Icon = taskIcons[id],
                    task = copy.tasks[id];
                  return (
                    <Link
                      className="docs-home-task surface-card"
                      data-task={id}
                      key={id}
                      to={url.document(page.document.slug)}
                    >
                      <span className="docs-home-task-head">
                        <span className="docs-home-task-icon">
                          <Icon size={22} aria-hidden="true" />
                        </span>
                        <span className="docs-home-task-index">
                          {pad(index + 1)}
                        </span>
                      </span>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <span className="docs-home-task-target">
                        <span>{t(page.document.label)}</span>
                        <EnglishSource page={page} />
                        <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section
              className="docs-home-topics"
              aria-labelledby="docs-topics-title"
            >
              <div className="docs-home-section-heading">
                <span className="docs-home-section-index">02</span>
                <div>
                  <h2 id="docs-topics-title">{copy.topicTitle}</h2>
                  <p>{copy.topicDescription}</p>
                </div>
                <a href="#docs-directory">
                  {copy.allDocuments}
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
              <div className="docs-home-topic-grid">
                {portal.groups.map((group, index) => {
                  const topic = topicText(group.title, group.description),
                    Icon = topicIcons[group.title] || FileText,
                    layout = topicTileLayout(index, portal.groups.length);
                  return (
                    <article
                      className="docs-home-topic"
                      data-layout={layout.desktop}
                      data-tablet={layout.tablet}
                      key={group.id}
                    >
                      <div className="docs-home-topic-heading">
                        <span className="docs-home-topic-icon">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="docs-home-topic-count">
                          {copy.documentCount(group.pages.length)}
                        </span>
                      </div>
                      <h3>{topic.title}</h3>
                      <p>{topic.description}</p>
                      {layout.desktop === "feature" && (
                        <TopicSystem
                          count={group.pages.length}
                          seed={0x7091c + index}
                        />
                      )}
                      <div className="docs-home-topic-links">
                        {group.pages
                          .slice(0, layout.desktop === "feature" ? 4 : 2)
                          .map((page) => (
                            <GuideLink key={page.document.slug} page={page} />
                          ))}
                      </div>
                      <a
                        className="docs-home-topic-more"
                        href={`#${group.id}`}
                        onClick={() => revealDocumentationGroup(group.id)}
                      >
                        {copy.allInTopic}
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}

        <section
          id="docs-directory"
          className="docs-home-directory"
          hidden={hasQuery}
          aria-labelledby="docs-directory-title"
        >
          <div className="docs-home-directory-intro">
            <div className="docs-home-section-heading">
              <span className="docs-home-section-index">03</span>
              <div>
                <h2 id="docs-directory-title">{copy.directoryTitle}</h2>
                <p>{copy.directoryDescription}</p>
              </div>
            </div>
            <span className="docs-home-pill">
              {copy.documentCount(portal.pages.length)}
            </span>
          </div>
          <div className="docs-home-directory-body">
            <div className="docs-home-directory-groups">
              {portal.groups.map((group, index) => (
                <details
                  className="docs-home-directory-group"
                  id={group.id}
                  key={group.id}
                >
                  <summary>
                    <span className="docs-home-directory-index">
                      {pad(index + 1)}
                    </span>
                    <span className="docs-home-directory-name">
                      {topicText(group.title, group.description).title}
                    </span>
                    <small>{group.pages.length}</small>
                    <ChevronDown size={16} aria-hidden="true" />
                  </summary>
                  <div className="docs-home-directory-links">
                    {group.pages.map((page) => (
                      <GuideLink
                        key={page.document.slug}
                        page={page}
                        reference
                      />
                    ))}
                  </div>
                </details>
              ))}
            </div>
            {(portal.originals.length > 0 ||
              portal.reconstructions.length > 0) && (
              <div className="docs-home-archive">
                <div className="docs-home-archive-heading">
                  <span className="docs-home-archive-icon">
                    <Archive size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{copy.archiveTitle}</h3>
                    <p>{copy.archiveDescription}</p>
                  </div>
                </div>
                {(
                  [
                    [
                      "docs-archive-originals",
                      copy.originals,
                      portal.originals,
                    ],
                    [
                      "docs-archive-reconstructions",
                      copy.reconstructions,
                      portal.reconstructions,
                    ],
                  ] as const
                ).map(
                  ([id, title, pages]) =>
                    pages.length > 0 && (
                      <details
                        className="docs-home-directory-group docs-home-archive-group"
                        id={id}
                        key={id}
                      >
                        <summary>
                          <span className="docs-home-directory-index">
                            <FileText size={15} aria-hidden="true" />
                          </span>
                          <span className="docs-home-directory-name">
                            {title}
                          </span>
                          <small>{pages.length}</small>
                          <ChevronDown size={16} aria-hidden="true" />
                        </summary>
                        <div className="docs-home-directory-links">
                          {pages.map((page) => (
                            <GuideLink
                              key={page.document.slug}
                              page={page}
                              reference
                            />
                          ))}
                        </div>
                      </details>
                    ),
                )}
              </div>
            )}
          </div>
        </section>
      </DocsPage>
    </DocumentationLayout>
  );
}
