import { useMemo, type ReactNode } from "react";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Gamepad2,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { ContentEntry } from "../../content/models";
import { searchableText } from "../../content/search";
import { paperConferencePublication } from "../lib/paper-publication";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { useClientQuery } from "../lib/client-query";
import {
  clearCollectionQuery,
  collectionFacets,
  collectionFilters,
  collectionPage,
  collectionPageSize,
  paperAreas,
  selectCollection,
  updateCollectionQuery,
  type CollectionEntry,
} from "../lib/collection-query";

const statusLabels: Record<string, string> = {
  "open-source": "Open source",
  "source-available": "Source available",
  "not-found": "No source located",
  "not-released": "Not released",
  restricted: "Restricted",
  unverified: "Unverified",
  game: "Game",
  prototype: "Prototype",
  "work-in-progress": "Work in progress",
  "legacy-release": "Legacy release",
  "legacy-prototype": "Legacy prototype",
  "archived-prototype": "Archived prototype",
};
const referenceLabels: Record<string, string> = {
  "conference-paper": "Conference paper",
  "journal-paper": "Journal paper",
  preprint: "Preprint",
  survey: "Survey",
  "technical-report": "Technical report",
  blog: "Blog",
  book: "Book",
  "book-chapter": "Book chapter",
  "benchmark-page": "Benchmark page",
  documentation: "Documentation",
  "product-page": "Product page",
  repository: "Repository",
};
function OutsideLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}
function PaperRow({ entry }: { entry: ContentEntry<"paper"> }) {
  const { t } = useSiteI18n();
  const paper = entry.data;
  const conference = paperConferencePublication(paper);
  const repository =
    paper.access.repositories.find(
      (item) => item.kind === "implementation" || item.kind === "partial",
    ) || paper.access.repositories[0];
  const demo =
    paper.access.demos.find((item) => item.kind === "interactive") ||
    paper.access.demos[0];
  return (
    <article className="catalog-paper-row" data-content-ref={entry.key}>
      <div className="catalog-record-meta">
        {conference ? (
          <span className="catalog-publication" title={paper.publication}>
            {conference.label}
          </span>
        ) : (
          <span>{paper.year}</span>
        )}
        {conference && conference.year !== paper.year && (
          <span className="catalog-publication-year">
            {t("Publication year")}: {paper.year}
          </span>
        )}
        <span>{t(referenceLabels[paper.referenceType])}</span>
        <SourceLanguage english={entry.descriptionLanguage === "en"} />
      </div>
      <h2>
        <Link to={entry.url}>
          {entry.title}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </h2>
      <p className="catalog-authors">{paper.authors}</p>
      <p
        className="catalog-record-summary"
        lang={entry.descriptionLanguage === "en" ? "en" : undefined}
      >
        {entry.description}
      </p>
      <div className="catalog-record-tags">
        <span className="catalog-topic">
          {t(
            paperAreas.find(([value]) => value === paper.primaryRole)?.[1] ||
              paper.primaryRole,
          )}
        </span>
        {paper.topics.slice(0, 2).map((topic) => (
          <span key={topic}>{topic}</span>
        ))}
      </div>
      <div className="catalog-record-bottom">
        <span
          className={`catalog-source-status ${["open-source", "source-available"].includes(paper.access.codeStatus) ? "has-source" : ""}`}
        >
          <Code2 size={13} aria-hidden="true" />
          {t(statusLabels[paper.access.codeStatus])}
        </span>
        <div className="catalog-record-actions">
          {repository && (
            <OutsideLink href={repository.url}>
              {t(
                repository.kind === "implementation" ||
                  repository.kind === "partial"
                  ? "Code"
                  : "Repository",
              )}
            </OutsideLink>
          )}
          {demo && (
            <OutsideLink href={demo.url}>
              {t("Demo link")}
              {demo.access !== "public" && (
                <small>
                  {" "}
                  ·{" "}
                  {t(
                    demo.access === "signup"
                      ? "Sign-up"
                      : demo.access === "request"
                        ? "Access request"
                        : "Local setup",
                  )}
                </small>
              )}
            </OutsideLink>
          )}
          <OutsideLink href={paper.pdfUrl || paper.url}>
            {paper.pdfUrl ? "PDF" : t("Paper")}
          </OutsideLink>
        </div>
      </div>
    </article>
  );
}
function GameCard({ entry }: { entry: ContentEntry<"threejs-game"> }) {
  const { t } = useSiteI18n();
  const game = entry.data;
  return (
    <article className="catalog-game-card" data-content-ref={entry.key}>
      <div className="catalog-game-heading">
        <span className="catalog-game-icon">
          <Gamepad2 size={21} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="catalog-license">
          {game.license.spdx || t("Unspecified license")}
        </span>
      </div>
      <span className="catalog-source-status">
        <span className="tiny-dot" />
        {t(statusLabels[game.maturity.status])}
      </span>
      <h2>
        <Link to={entry.url}>
          {entry.title}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </h2>
      <p
        className="catalog-record-summary"
        lang={entry.descriptionLanguage === "en" ? "en" : undefined}
      >
        {entry.description}
      </p>
      <div className="catalog-record-tags">
        {game.genres.slice(0, 3).map((genre) => (
          <span key={genre}>{genre.replaceAll("-", " ")}</span>
        ))}
      </div>
      <div className="catalog-game-review">
        <ShieldCheck size={13} aria-hidden="true" />
        <span>
          {t("Source reviewed")} ·{" "}
          {t(game.verification.playtested ? "Playtested" : "Not playtested")}
        </span>
      </div>
      <div className="catalog-record-bottom">
        <span className="catalog-reviewed-date">{game.verification.date}</span>
        <div className="catalog-record-actions">
          <OutsideLink href={game.repository_url}>
            {t("Repository")}
          </OutsideLink>
          {game.demo.url && (
            <OutsideLink href={game.demo.url}>{t("Demo page")}</OutsideLink>
          )}
        </div>
      </div>
    </article>
  );
}
export function TypedCollection({
  entries,
  title,
  description,
  kind,
}: {
  entries: CollectionEntry[];
  title: string;
  description: string;
  kind: "paper" | "threejs-game";
}) {
  const { t } = useSiteI18n();
  const [params, setParams, hydrated] = useClientQuery();
  const isPaper = kind === "paper";
  const facets = useMemo(() => collectionFacets(entries), [entries]);
  const filters = useMemo(
    () => collectionFilters(params, entries, kind),
    [params, entries, kind],
  );
  const search = useMemo(
    () => new Map(entries.map((entry) => [entry.key, searchableText(entry)])),
    [entries],
  );
  const filtered = useMemo(
    () => selectCollection(entries, filters, search),
    [entries, filters, search],
  );
  const pagination = collectionPage(params.get("page"), filtered.length);
  // Keep every canonical record discoverable in static HTML and without JS.
  // After hydration, bound the visible collection to a readable 24-record page.
  const visible = hydrated
    ? filtered.slice(pagination.start - 1, pagination.end)
    : filtered;
  const survey = entries.find(
    (entry): entry is ContentEntry<"paper"> =>
      entry.kind === "paper" && entry.id === "paper-arxiv-2609-16679",
  );
  const genres = useMemo(
    () =>
      facets.genres
        .map((genre) => ({
          value: genre,
          count: entries.filter(
            (entry) =>
              entry.kind === "threejs-game" &&
              entry.data.genres.includes(genre),
          ).length,
        }))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
        .slice(0, 8),
    [entries, facets],
  );
  const categories = isPaper
    ? paperAreas.map(([value, label]) => ({
        value,
        label,
        count: entries.filter(
          (entry) =>
            entry.kind === "paper" &&
            entry.data.roles.some((role) => role === value),
        ).length,
      }))
    : genres.map((genre) => ({
        ...genre,
        label: genre.value.replaceAll("-", " "),
      }));
  const selected = isPaper ? filters.area : filters.genre;
  const active = [
    ["q", filters.query, filters.query],
    [
      "area",
      filters.area,
      t(
        paperAreas.find(([value]) => value === filters.area)?.[1] ||
          filters.area,
      ),
    ],
    ["genre", filters.genre, filters.genre.replaceAll("-", " ")],
    ["year", filters.year, filters.year],
    [
      "status",
      filters.status,
      t(statusLabels[filters.status] || filters.status),
    ],
    ["license", filters.license, filters.license],
    [
      "demo",
      filters.demo,
      t(
        filters.demo === "interactive"
          ? "Interactive demo"
          : filters.demo === "local"
            ? "Local setup"
            : filters.demo === "download"
              ? "Download"
              : filters.demo === "listed"
                ? "Demo link listed"
                : "No demo link listed",
      ),
    ],
    ["project", filters.project ? "1" : "", t("Project page listed")],
  ].filter(
    ([key, value]) =>
      value &&
      value !== "all" &&
      !(isPaper ? ["genre", "license"] : ["area", "year", "project"]).includes(
        key,
      ),
  );
  const update = (key: string, value: string) =>
    setParams((previous) => updateCollectionQuery(previous, { [key]: value }), {
      replace: key !== "page",
      preventScrollReset: true,
    });
  const clear = () =>
    setParams(clearCollectionQuery, {
      replace: true,
      preventScrollReset: true,
    });
  const turnPage = (page: number) => {
    update("page", String(page));
    const summary = document.getElementById("collection-results");
    summary?.focus({ preventScroll: true });
    summary?.scrollIntoView({ block: "start" });
  };
  const paging = (position: string) =>
    hydrated &&
    filtered.length > collectionPageSize && (
      <nav
        className="catalog-pagination"
        aria-label={t(
          position === "top" ? "Collection pages" : "More collection pages",
        )}
      >
        <button
          aria-label={t("Previous page")}
          disabled={pagination.page <= 1}
          onClick={() => turnPage(pagination.page - 1)}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          <span>{t("Previous")}</span>
        </button>
        <span>
          {t("Page {page} of {pages}", {
            page: pagination.page,
            pages: pagination.pages,
          })}
        </span>
        <button
          aria-label={t("Next page")}
          disabled={pagination.page >= pagination.pages}
          onClick={() => turnPage(pagination.page + 1)}
        >
          <span>{t("Next")}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </nav>
    );
  return (
    <main
      id="main-content"
      className={`site-main listing-page collection-page ${isPaper ? "paper-collection" : "game-collection"}`}
    >
      <title>{`${t(title)} — GameMap`}</title>
      <meta name="description" content={t(description)} />
      <header className="page-heading collection-heading">
        <div>
          <p className="eyebrow">
            {t(isPaper ? "Research & evidence" : "SOURCE-REVIEWED GAMES")}
          </p>
          <h1>{t(title)}</h1>
          <p>{t(description)}</p>
        </div>
        <span className="collection-total">
          <strong>{entries.length}</strong>
          <span>{t(isPaper ? "research records" : "game records")}</span>
        </span>
      </header>
      {survey && (
        <Link className="catalog-survey" to={survey.url}>
          <span className="catalog-survey-icon">
            <BookOpen size={23} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <span className="small-label">{t("Start with the survey")}</span>
            <strong>{survey.title}</strong>
            <span
              className="catalog-survey-authors"
              title={survey.data.authors}
            >
              {survey.data.authors} · {survey.data.year}
            </span>
          </div>
          <span className="catalog-survey-action">
            {t("Read the overview")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </Link>
      )}
      <div className="catalog-browser">
        <aside
          className="catalog-sidebar"
          aria-label={t(isPaper ? "Research areas" : "Popular genres")}
        >
          <p className="small-label">
            {t(isPaper ? "Browse by research area" : "Popular genres")}
          </p>
          <nav
            className="catalog-area-list"
            aria-label={t(isPaper ? "Research areas" : "Popular genres")}
          >
            <button
              aria-pressed={selected === "all"}
              onClick={() => update(isPaper ? "area" : "genre", "all")}
            >
              <span>{t(isPaper ? "All papers" : "All games")}</span>
              <span>{entries.length}</span>
            </button>
            {categories
              .filter((category) => category.count > 0)
              .map((category, index) => (
                <button
                  key={category.value}
                  aria-pressed={selected === category.value}
                  onClick={() =>
                    update(isPaper ? "area" : "genre", category.value)
                  }
                >
                  <span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    {t(category.label)}
                  </span>
                  <span>{category.count}</span>
                </button>
              ))}
          </nav>
          <p className="catalog-sidebar-note">
            {t(
              isPaper
                ? "One paper can belong to several research areas. Classification is a reading aid, not a verified capability claim."
                : "Genres come from the source records. Source review does not mean the games were playtested.",
            )}
          </p>
        </aside>
        <div className="catalog-main">
          <div className="catalog-mobile-category">
            <label htmlFor="collection-area">
              {t(isPaper ? "Research area" : "Genre")}
            </label>
            <select
              id="collection-area"
              value={selected}
              onChange={(event) =>
                update(isPaper ? "area" : "genre", event.target.value)
              }
            >
              <option value="all">
                {t(isPaper ? "All papers" : "All games")}
              </option>
              {(isPaper
                ? categories
                : facets.genres.map((genre) => ({
                    value: genre,
                    label: genre.replaceAll("-", " "),
                  }))
              ).map((category) => (
                <option key={category.value} value={category.value}>
                  {t(category.label)}
                </option>
              ))}
            </select>
          </div>
          <div className="catalog-toolbar collection-toolbar">
            <div className="filter-search">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                aria-label={t(isPaper ? "Search papers" : "Search games")}
                placeholder={t(
                  isPaper
                    ? "Search title, authors, or topic…"
                    : "Search name, genre, or evidence…",
                )}
                value={params.get("q") || ""}
                onChange={(event) => update("q", event.target.value)}
              />
            </div>
            {isPaper ? (
              <label className="collection-select">
                <span className="sr-only">{t("Publication year")}</span>
                <select
                  value={filters.year}
                  onChange={(event) => update("year", event.target.value)}
                >
                  <option value="all">{t("All years")}</option>
                  {facets.years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </label>
            ) : (
              <label className="collection-select desktop-genre">
                <span className="sr-only">{t("Genre")}</span>
                <select
                  value={filters.genre}
                  onChange={(event) => update("genre", event.target.value)}
                >
                  <option value="all">{t("All genres")}</option>
                  {facets.genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre.replaceAll("-", " ")}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="collection-select collection-sort">
              <ArrowDownUp size={14} aria-hidden="true" />
              <span className="sr-only">{t("Sort collection")}</span>
              <select
                value={filters.sort}
                onChange={(event) => update("sort", event.target.value)}
              >
                {isPaper && (
                  <>
                    <option value="recent">{t("Newest first")}</option>
                    <option value="practical">
                      {t("Demo & source links first")}
                    </option>
                  </>
                )}{" "}
                {!isPaper && (
                  <option value="recent">
                    {t("Recently source reviewed")}
                  </option>
                )}
                <option value="title">{t("Title A–Z")}</option>
              </select>
            </label>
          </div>
          <details className="catalog-refinements">
            <summary>
              <SlidersHorizontal size={14} aria-hidden="true" />
              {t(
                isPaper
                  ? "Source & demo filters"
                  : "Maturity, license & demo filters",
              )}
              <span>{t("Refine results")}</span>
            </summary>
            <div className="catalog-refinement-fields">
              <label>
                <span>{t(isPaper ? "Source status" : "Maturity")}</span>
                <select
                  value={filters.status}
                  onChange={(event) => update("status", event.target.value)}
                >
                  <option value="all">{t("All statuses")}</option>
                  {facets.statuses.map((status) => (
                    <option value={status} key={status}>
                      {t(statusLabels[status] || status)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t("Demo availability")}</span>
                <select
                  value={filters.demo}
                  onChange={(event) => update("demo", event.target.value)}
                >
                  <option value="all">{t("Any demo status")}</option>
                  {isPaper ? (
                    <>
                      <option value="interactive">
                        {t("Interactive demo")}
                      </option>
                      <option value="local">{t("Local setup")}</option>
                      <option value="download">{t("Download")}</option>
                    </>
                  ) : (
                    <>
                      <option value="listed">{t("Demo link listed")}</option>
                      <option value="not-listed">
                        {t("No demo link listed")}
                      </option>
                    </>
                  )}
                </select>
              </label>
              {isPaper ? (
                <label className="catalog-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.project}
                    onChange={(event) =>
                      update("project", event.target.checked ? "1" : "")
                    }
                  />
                  <span>{t("Project page listed")}</span>
                </label>
              ) : (
                <label>
                  <span>{t("License")}</span>
                  <select
                    value={filters.license}
                    onChange={(event) => update("license", event.target.value)}
                  >
                    <option value="all">{t("All licenses")}</option>
                    {facets.licenses.map((license) => (
                      <option key={license} value={license}>
                        {license === "unspecified"
                          ? t("Unspecified license")
                          : license}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
          </details>
          <noscript>
            <p className="catalog-sidebar-note">
              {t(
                "All records are shown. Enable JavaScript to filter, sort, and browse by page.",
              )}
            </p>
          </noscript>
          {active.length > 0 && (
            <div
              className="catalog-active-filters"
              aria-label={t("Active filters")}
            >
              {active.map(([key, , label]) => (
                <button
                  key={key}
                  onClick={() => update(key, "all")}
                  aria-label={t("Remove filter: {filter}", { filter: label })}
                >
                  {label}
                  <X size={12} aria-hidden="true" />
                </button>
              ))}
              <button className="catalog-clear" onClick={clear}>
                {t("Clear filters")}
              </button>
            </div>
          )}
          <div className="catalog-results-bar">
            <p id="collection-results" tabIndex={-1} aria-live="polite">
              {hydrated && filtered.length
                ? t("{start}–{end} of {count} records", {
                    start: pagination.start,
                    end: pagination.end,
                    count: filtered.length,
                  })
                : t("{count} of {total} records", {
                    count: filtered.length,
                    total: entries.length,
                  })}
            </p>
            {paging("top")}
          </div>
          <div className={isPaper ? "catalog-paper-list" : "catalog-game-grid"}>
            {visible.map((entry) =>
              entry.kind === "paper" ? (
                <PaperRow key={entry.key} entry={entry} />
              ) : (
                <GameCard key={entry.key} entry={entry} />
              ),
            )}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state catalog-empty">
              <Search size={24} aria-hidden="true" />
              <h2>{t("No matching records.")}</h2>
              <p>
                {t("Try another topic, a different year, or fewer filters.")}
              </p>
              <button className="button button-secondary" onClick={clear}>
                {t("Clear filters")}
              </button>
            </div>
          )}
          <div className="catalog-bottom-pagination">{paging("bottom")}</div>
        </div>
      </div>
    </main>
  );
}
