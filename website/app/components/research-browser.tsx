import { useEffect, useMemo } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Circle, Search } from "lucide-react";
import type { ContentEntry } from "../../content/models";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { useReadingQuery } from "../lib/reading-query";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { ReadingPagination } from "./reading-pagination";

const pageSize = 24;
const groupLabels: Record<string, string> = {
  reference: "Reference project",
  core: "Featured research",
  games_more: "Browser games",
  fps_more: "FPS & shooters",
  ai_games: "AI-associated projects",
  harness: "Development agents",
  components: "Engines & infrastructure",
  classics: "Classics & ports",
  woc_ecosystem: "ClaudeCraft ecosystem",
  awesome: "Discovery lists",
};
const dispositionLabels: Record<string, string> = {
  "new-research": "New discovery",
  qualified: "Read qualifications",
  unavailable: "Source unavailable",
  existing: "Already covered",
};
const reviewLabels: Record<string, string> = {
  "source-reviewed": "Source reviewed",
  "metadata-only": "Metadata only",
  unavailable: "Source unavailable",
};
type ResearchEntry = ContentEntry<"repository-research">;
type ResearchDestination = { pathname: string; search: string; hash: string };

function GitHubMark() {
  return <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>;
}

function ResearchRow({ entry, groupLabel }: { entry: ResearchEntry; groupLabel: string }) {
  const { t } = useSiteI18n();
  const record = entry.data;
  const [owner, repository] = record.requested_repo.split("/");
  const changedIdentity = record.canonical_repo &&
    record.canonical_repo.toLowerCase() !== record.requested_repo.toLowerCase();
  return (
    <article className="research-row" data-research-row={entry.id} data-group={record.group}>
      <div className="research-row-main">
        <div className="research-owner">
          <GitHubMark /><span>{owner}</span>
          <span className="research-row-group">{t(groupLabel)}</span>
        </div>
        <h2 className="research-identity"><Link to={entry.url}>{repository}</Link></h2>
        <p className="research-summary" lang={entry.descriptionLanguage === "en" ? "en" : undefined}>
          {entry.description}
        </p>
        <SourceLanguage english={entry.descriptionLanguage === "en"} />
        {changedIdentity && (
          <p className="research-current-identity">
            {t("Recorded identity: {repository}", { repository: record.canonical_repo! })}
          </p>
        )}
      </div>
      <div className="research-row-meta">
        <span className="research-state" data-review={record.review_status}>
          <Circle size={8} fill="currentColor" aria-hidden="true" />
          {t(reviewLabels[record.review_status] || record.review_status)}
        </span>
        <div className="research-actions">
          <Link className="research-details-link" to={entry.url}>
            {t("Details")}<ArrowRight size={15} aria-hidden="true" />
          </Link>
          {record.canonical_repo && record.review_status !== "unavailable" && (
            <a href={`https://github.com/${record.canonical_repo}`} target="_blank" rel="noreferrer">
              GitHub<ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ResearchBrowser({ records, groups }: {
  records: ResearchEntry[];
  groups: Record<string, string>;
}) {
  const { t } = useSiteI18n();
  const [params, setParams, hydrated] = useReadingQuery();
  const query = params.get("q") || "";
  const requestedGroup = params.get("group") || "all";
  const group = Object.hasOwn(groups, requestedGroup) ? requestedGroup : "all";
  const requestedStatus = params.get("status") || "all";
  const status = Object.hasOwn(dispositionLabels, requestedStatus) ? requestedStatus : "all";
  const indexed = useMemo(() => records.map((entry) => ({ entry, text: searchableText(entry) })), [records]);
  const completeIndex = useMemo(() => [...records].sort((a, b) =>
    a.data.requested_repo.localeCompare(b.data.requested_repo, "en")), [records]);
  const matches = indexed.filter(({ entry, text }) =>
    (status === "all" || entry.data.disposition === status) && matchesSearch(text, query));
  const filtered = matches.filter(({ entry }) => group === "all" || entry.data.group === group);
  const counts = new Map<string, number>();
  for (const { entry } of matches) counts.set(entry.data.group, (counts.get(entry.data.group) || 0) + 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rawPage = params.get("page");
  const requestedPage = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
  const page = Math.max(1, Math.min(totalPages, Number.isFinite(requestedPage) ? requestedPage : 1));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Static HTML starts on page one. Normalize browser-only parameters after
  // hydration without replacing a newer action already reflected in the URL.
  useEffect(() => {
    const canonical = page > 1 ? String(page) : null;
    if (!hydrated || rawPage === canonical) return;
    setParams((previous) => {
      if (previous.get("page") !== rawPage) return previous;
      const next = new URLSearchParams(previous);
      if (canonical) next.set("page", canonical);
      else next.delete("page");
      return next;
    }, { replace: true, preventScrollReset: true });
  }, [hydrated, page, rawPage, setParams]);

  const update = (key: "q" | "status" | "group", value: string) =>
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (!value || (key !== "q" && value === "all")) next.delete(key);
      else next.set(key, value);
      next.delete("page");
      return next;
    }, { replace: true, preventScrollReset: true });
  const pageTo = (nextPage: number): ResearchDestination => {
    const next = new URLSearchParams(params);
    if (nextPage === 1) next.delete("page");
    else next.set("page", String(nextPage));
    return { pathname: "/research/", search: next.toString(), hash: "#research-results" };
  };

  return (
    <div className="research-browser">
      <aside className="research-sidebar">
        <h2>{t("Browse collections")}</h2>
        <label className="reading-mobile-filter">
          <span className="sr-only">{t("Browse collections")}</span>
          <select aria-label={t("Research collection")} value={group}
            onChange={(event) => update("group", event.target.value)}>
            <option value="all">{t("All collections")} ({matches.length})</option>
            {Object.entries(groups).map(([id, originalLabel]) => (
              <option key={id} value={id}>{t(groupLabels[id] || originalLabel)} ({counts.get(id) || 0})</option>
            ))}
          </select>
        </label>
        <nav className="research-group-nav" aria-label={t("Research collections")}>
          <button type="button" aria-pressed={group === "all"} onClick={() => update("group", "all")}>
            <span>{t("All collections")}</span><span>{matches.length}</span>
          </button>
          {Object.entries(groups).map(([id, originalLabel]) => (
            <button type="button" key={id} aria-pressed={group === id}
              title={t(originalLabel)} onClick={() => update("group", id)}>
              <span>{t(groupLabels[id] || originalLabel)}</span><span>{counts.get(id) || 0}</span>
            </button>
          ))}
        </nav>
      </aside>
      <section className="research-results" id="research-results" aria-label={t("Research records")}>
        <div className="catalog-toolbar research-toolbar">
          <div className="filter-search">
            <Search size={19} aria-hidden="true" />
            <input aria-label={t("Search repository research")}
              placeholder={t("Search repository, purpose, or source…")}
              value={query} onChange={(event) => update("q", event.target.value)} />
          </div>
          <select aria-label={t("Research disposition")} value={status}
            onChange={(event) => update("status", event.target.value)}>
            <option value="all">{t("All research states")}</option>
            {Object.entries(dispositionLabels).map(([id, label]) => (
              <option key={id} value={id}>{t(label)}</option>
            ))}
          </select>
        </div>
        <div className="research-results-bar">
          <div className="results-meta research-results-meta">
            <span aria-live="polite">{t("{count} of {total} research records", { count: filtered.length, total: records.length })}</span>
            <span>{t("Source review, not playtest certification")}</span>
          </div>
          <ReadingPagination compact page={page} pages={totalPages} pageTo={pageTo} ariaLabel="Research page controls" />
        </div>
        {current.length > 0 ? (
          <div className="research-rows">
            {current.map(({ entry }) => <ResearchRow key={entry.key} entry={entry}
              groupLabel={groupLabels[entry.data.group] || groups[entry.data.group]} />)}
          </div>
        ) : (
          <div className="empty-state research-empty">
            <p>{t("No matching research records. Try fewer words or another disposition.")}</p>
            <button type="button" onClick={() => setParams({}, { replace: true, preventScrollReset: true })}>
              {t("Clear filters")}
            </button>
          </div>
        )}
        <ReadingPagination page={page} pages={totalPages} pageTo={pageTo} ariaLabel="Research pagination" />
        <details className="research-index">
          <summary>{t("Complete repository index")}<span>{records.length}</span><ChevronDown size={16} aria-hidden="true" /></summary>
          <p>{t("Every research record, alphabetically. Open any entry for its sources and qualifications.")}</p>
          <ul>
            {completeIndex.map((entry) => (
              <li key={entry.key} data-content-ref={entry.key}>
                <Link to={entry.url}>{entry.data.requested_repo}</Link>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </div>
  );
}
