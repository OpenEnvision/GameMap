import { useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import {
  ArrowRight,
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
  documentationViews,
} from "../lib/docs";
import {
  documentationPortal,
  revealDocumentationGroup,
  searchDocumentation,
  type PortalDocument,
  type PortalTaskId,
} from "../lib/docs-home";
import { documentationHomeCopy } from "../lib/docs-home-copy";
import { contentFor } from "../../content/registry.server";
import { documentBodyLocale, docMessages } from "../../content/doc-language";
import { localeFromPath } from "../../content/locale";
import { url } from "../../content/site";
import { Link, useSiteI18n } from "../lib/i18n";
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
        className="docs-home"
      >
        <title>{`${text.title} — GameMap`}</title>
        <meta name="description" content={copy.introduction} />
        <div className="docs-home-utility">
          <span>
            <BookOpen size={14} aria-hidden="true" />
            {copy.guideCount(portal.coreCount)}
          </span>
          <DocumentationLanguage locale={locale} manifest={manifest} />
        </div>

        <header
          className="docs-home-hero"
          data-has-starter={Boolean(portal.starter)}
        >
          <div className="docs-home-intro">
            <p className="docs-home-eyebrow">{copy.eyebrow}</p>
            <DocsTitle className="docs-home-title">{text.title}</DocsTitle>
            <p className="docs-home-lead">{copy.introduction}</p>
            <form
              className="docs-home-search"
              role="search"
              aria-label={copy.searchLabel}
              onSubmit={(event) => event.preventDefault()}
            >
              <Search size={19} aria-hidden="true" />
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
            <p className="docs-home-search-hint" id="docs-search-hint">
              {copy.searchHint}
            </p>
            <noscript>
              <p className="docs-home-nojs">{copy.noJavaScript}</p>
            </noscript>
            <a className="docs-home-directory-jump" href="#docs-directory">
              {copy.allDocuments}
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          {portal.starter && (
            <Link
              className="docs-start docs-home-starter"
              to={url.document(portal.starter.document.slug)}
            >
              <div className="docs-home-starter-top">
                <span className="docs-home-starter-icon">
                  <Compass size={24} aria-hidden="true" />
                </span>
                <span>{copy.starterEyebrow}</span>
              </div>
              <strong>{text.start}</strong>
              <p>{text.startDetail}</p>
              <span className="docs-home-starter-action">
                {copy.readGuide}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
              <EnglishSource page={portal.starter} />
            </Link>
          )}
        </header>

        {hasQuery ? (
          <section
            className="docs-home-results"
            id="docs-search-results"
            aria-labelledby="docs-search-results-title"
          >
            <div className="docs-home-section-heading">
              <h2 id="docs-search-results-title">{copy.resultsTitle}</h2>
              <span role="status" aria-live="polite">
                {copy.resultCount(results.length)}
              </span>
            </div>
            {results.length ? (
              <div className="docs-home-result-list">
                {results.map((page) => (
                  <div className="docs-home-result" key={page.document.slug}>
                    <GuideLink page={page} />
                    <p>
                      {page.archive
                        ? page.archive === "original"
                          ? copy.originalLabel
                          : copy.reconstructionLabel
                        : topicText(page.group, page.description).title}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="docs-home-empty">
                <Search size={24} aria-hidden="true" />
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
                <div>
                  <h2 id="docs-task-title">{copy.taskTitle}</h2>
                  <p>{copy.taskDescription}</p>
                </div>
              </div>
              <div className="docs-home-task-grid">
                {portal.tasks.map(({ id, page }) => {
                  const Icon = taskIcons[id],
                    task = copy.tasks[id];
                  return (
                    <Link
                      className="docs-home-task"
                      key={id}
                      to={url.document(page.document.slug)}
                    >
                      <span className="docs-home-task-icon">
                        <Icon size={21} aria-hidden="true" />
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
                {portal.groups.map((group) => {
                  const topic = topicText(group.title, group.description),
                    Icon = topicIcons[group.title] || FileText;
                  return (
                    <article className="docs-home-topic" key={group.id}>
                      <div className="docs-home-topic-heading">
                        <span className="docs-home-topic-icon">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                        <h3>{topic.title}</h3>
                        <span>{group.pages.length}</span>
                      </div>
                      <p>{topic.description}</p>
                      <div className="docs-home-topic-links">
                        {group.pages.slice(0, 2).map((page) => (
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
          <div className="docs-home-section-heading">
            <div>
              <h2 id="docs-directory-title">{copy.directoryTitle}</h2>
              <p>{copy.directoryDescription}</p>
            </div>
            <span>{copy.documentCount(portal.pages.length)}</span>
          </div>
          <div className="docs-home-directory-groups">
            {portal.groups.map((group) => (
              <details
                className="docs-home-directory-group"
                id={group.id}
                key={group.id}
              >
                <summary>
                  <BookOpen size={17} aria-hidden="true" />
                  <span>{topicText(group.title, group.description).title}</span>
                  <small>{group.pages.length}</small>
                  <ChevronDown size={16} aria-hidden="true" />
                </summary>
                <div className="docs-home-directory-links">
                  {group.pages.map((page) => (
                    <GuideLink key={page.document.slug} page={page} reference />
                  ))}
                </div>
              </details>
            ))}
          </div>
          {(portal.originals.length > 0 ||
            portal.reconstructions.length > 0) && (
            <div className="docs-home-archive">
              <div className="docs-home-archive-heading">
                <Archive size={20} aria-hidden="true" />
                <div>
                  <h3>{copy.archiveTitle}</h3>
                  <p>{copy.archiveDescription}</p>
                </div>
              </div>
              {(
                [
                  ["docs-archive-originals", copy.originals, portal.originals],
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
                        <FileText size={17} aria-hidden="true" />
                        <span>{title}</span>
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
        </section>
      </DocsPage>
    </DocumentationLayout>
  );
}
