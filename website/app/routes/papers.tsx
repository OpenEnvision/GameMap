import { useEffect, useMemo, useState } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowRight, ArrowUpRight, BookOpen, ChevronDown, Code2, Download, Search } from "lucide-react";
import { contentFor } from "../../content/registry.server";
import { isAcademicPaper, paperRoles, paperTypes, shortPaperAuthors, type PaperRole } from "../../content/papers";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { Link, useSiteI18n } from "../lib/i18n";
import { useReadingQuery } from "../lib/reading-query";
import { ReadingPagination } from "../components/reading-pagination";
import { PaperArtifactLinks, PaperAvailability } from "../components/paper-artifacts";
import { accessForPaper, matchesPaperAccess, practicalPaperScore, paperCodeStatuses } from "../../content/paper-access";

const pageSize = 24;
const roleKeys = Object.keys(paperRoles) as PaperRole[];
export function loader({ request }: LoaderFunctionArgs) {
  return { entries: contentFor(request).all("paper").map((entry) => ({
    id: entry.id, key: entry.key, title: entry.title, url: entry.url,
    data: entry.data, searchText: searchableText(entry),
  })) };
}

export default function Papers() {
  const { entries } = useLoaderData<typeof loader>();
  const { t } = useSiteI18n();
  const [accessFiltersOpen, setAccessFiltersOpen] = useState(false);
  const [params, setParams, hydrated] = useReadingQuery();
  const query = params.get("q") || "";
  const rawRole = params.get("role") || "all";
  const role = rawRole === "related" || roleKeys.includes(rawRole as PaperRole) ? rawRole : "all";
  const years = useMemo(() => [...new Set(entries.map(({ data }) => data.year))].sort((a, b) => b - a), [entries]);
  const rawYear = params.get("year") || "all";
  const year = years.some((year) => String(year) === rawYear) ? rawYear : "all";
  const rawSort = params.get("sort") || "practical";
  const sort = ["practical", "newest", "oldest", "title"].includes(rawSort) ? rawSort : "practical";
  const rawCode = params.get("code") || "all";
  const code = ["all", "available", "partial", ...Object.keys(paperCodeStatuses)].includes(rawCode) ? rawCode : "all";
  const rawDemo = params.get("demo") || "all";
  const demo = ["all", "online", "public", "local", "none"].includes(rawDemo) ? rawDemo : "all";
  const projectOnly = params.get("project") === "yes";
  const indexed = useMemo(() => entries.map((entry) => ({ entry, text: entry.searchText })), [entries]);
  const completeIndex = useMemo(() => [...entries].sort((a, b) => a.title.localeCompare(b.title, "en")), [entries]);
  const academicCount = entries.filter(({ data }) => isAcademicPaper(data)).length;
  const matches = indexed.filter(({ entry, text }) =>
    (year === "all" || String(entry.data.year) === year) && matchesSearch(text, query) && matchesPaperAccess(entry.data, code, demo, projectOnly));
  const academicMatches = matches.filter(({ entry }) => isAcademicPaper(entry.data));
  const relatedMatches = matches.filter(({ entry }) => !isAcademicPaper(entry.data));
  const filtered = (role === "related" ? relatedMatches : academicMatches.filter(({ entry }) =>
    role === "all" || entry.data.roles.includes(role as PaperRole))).sort((a, b) =>
      (sort === "practical" ? practicalPaperScore(b.entry.data) - practicalPaperScore(a.entry.data) : 0)
      || (sort === "title" ? 0 : sort === "oldest" ? a.entry.data.year - b.entry.data.year : b.entry.data.year - a.entry.data.year)
      || a.entry.title.localeCompare(b.entry.title, "en"));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rawPage = params.get("page");
  const requestedPage = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
  const page = Math.max(1, Math.min(pages, Number.isFinite(requestedPage) ? requestedPage : 1));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);
  const survey = entries.find(({ data }) => data.arxivId === "2609.16679");

  useEffect(() => {
    const canonical = page > 1 ? String(page) : null;
    if (!hydrated || rawPage === canonical) return;
    setParams((previous) => {
      if (previous.get("page") !== rawPage) return previous;
      const next = new URLSearchParams(previous);
      if (canonical) next.set("page", canonical); else next.delete("page");
      return next;
    }, { replace: true, preventScrollReset: true });
  }, [hydrated, page, rawPage, setParams]);
  const update = (key: "q" | "role" | "year" | "sort" | "code" | "demo" | "project", value: string) => setParams((previous) => {
    const next = new URLSearchParams(previous);
    if (!value || (key !== "q" && value === "all") || (key === "sort" && value === "practical")) next.delete(key);
    else next.set(key, value);
    next.delete("page");
    return next;
  }, { replace: true, preventScrollReset: true });
  const pageTo = (nextPage: number) => {
    const next = new URLSearchParams(params);
    if (nextPage === 1) next.delete("page"); else next.set("page", String(nextPage));
    return { pathname: "/papers/", search: next.toString(), hash: "#paper-results" };
  };
  const roleOptions = [
    { id: "all", label: "All papers", count: academicMatches.length, number: "" },
    ...roleKeys.map((id) => ({ id, ...paperRoles[id], count: academicMatches.filter(({ entry }) => entry.data.roles.includes(id)).length })),
    { id: "related", label: "Related sources", count: relatedMatches.length, number: "" },
  ];

  return <main id="main-content" className="site-main listing-page papers-page">
    <title>{t("Paper List — GameMap")}</title>
    <meta name="description" content={t("Follow the research across the game lifecycle.")} />
    <header className="page-heading reading-heading">
      <h1>{t("Paper List")}</h1>
      <p>{t("Follow the research across the game lifecycle.")}</p>
    </header>
    {survey && <section className="paper-survey" aria-label={t("Start with the survey")}>
      <BookOpen className="paper-survey-icon" size={25} strokeWidth={1.4} aria-hidden="true" />
      <div>
        <h2>{t("Start with the survey")}</h2>
        <Link className="paper-survey-title" to={survey.url} lang="en">{survey.title}</Link>
        <p>{shortPaperAuthors(survey.data.authors)} <span>·</span> {survey.data.year} <span>·</span> {t("Survey")}</p>
      </div>
      <a className="paper-survey-action" href={survey.data.url} target="_blank" rel="noreferrer">
        {t("Read survey")}<ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </section>}
    <div className="research-browser paper-browser">
      <aside className="research-sidebar paper-sidebar">
        <h2>{t("Browse by role")}</h2>
        <nav className="research-group-nav paper-role-nav" aria-label={t("Paper research roles")}>
          {roleOptions.map((option) => <button key={option.id} type="button" aria-pressed={role === option.id}
            className={option.id === "related" ? "related-source-option" : undefined}
            onClick={() => update("role", option.id)}>
            <span>{option.number && <small>{option.number}</small>}{t(option.label)}</span><span>{option.count}</span>
          </button>)}
        </nav>
        <label className="reading-mobile-filter">
          <span className="sr-only">{t("Browse by role")}</span>
          <select aria-label={t("Paper research role")} value={role} onChange={(event) => update("role", event.target.value)}>
            {roleOptions.map((option) => <option key={option.id} value={option.id}>{t(option.label)} ({option.count})</option>)}
          </select>
        </label>
        <div className="paper-sidebar-note">
          <span>{t("A reading map")}</span>
          <p>{t("Follow a role, then open the original research. A paper may appear in more than one role.")}</p>
          <a href="#paper-coverage">{t("Source & coverage")}<ArrowRight size={14} aria-hidden="true" /></a>
        </div>
      </aside>
      <section className="research-results paper-results" id="paper-results" aria-label={t("Research references")}>
        <div className="catalog-toolbar research-toolbar paper-toolbar">
          <div className="filter-search">
            <Search size={18} aria-hidden="true" />
            <input aria-label={t("Search papers")} placeholder={t("Search title, author, or method…")}
              value={query} onChange={(event) => update("q", event.target.value)} />
          </div>
          <select aria-label={t("Paper year")} value={year} onChange={(event) => update("year", event.target.value)}>
            <option value="all">{t("All years")}</option>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
          <select aria-label={t("Paper sorting")} value={sort} onChange={(event) => update("sort", event.target.value)}>
            <option value="practical">{t("Practical first")}</option>
            <option value="newest">{t("Newest first")}</option>
            <option value="oldest">{t("Oldest first")}</option>
            <option value="title">{t("Title A–Z")}</option>
          </select>
        </div>
        <div className="paper-access-panel" data-open={accessFiltersOpen}>
          <button type="button" className="paper-access-toggle" aria-expanded={accessFiltersOpen} aria-controls="paper-access-options"
            onClick={() => setAccessFiltersOpen((open) => !open)}>
            <Code2 size={15} aria-hidden="true" />{t("Code, project & demo filters")}
            {(code !== "all" || demo !== "all" || projectOnly) && <span>{Number(code !== "all") + Number(demo !== "all") + Number(projectOnly)}</span>}
            <ChevronDown size={14} aria-hidden="true" />
          </button>
        <div className="paper-use-filters" id="paper-access-options" role="group" aria-label={t("Research availability filters")}>
          <select aria-label={t("Code availability")} value={code} onChange={(event) => update("code", event.target.value)}>
            <option value="all">{t("All code availability")}</option>
            <option value="open-source">{t("Open-source code")}</option>
            <option value="available">{t("Published code")}</option>
            <option value="partial">{t("Partial code / data tools")}</option>
            {(["source-available", "restricted", "not-released", "not-found", "unverified"] as const).map((status) =>
              <option key={status} value={status}>{t(paperCodeStatuses[status])}</option>)}
          </select>
          <select aria-label={t("Demo availability")} value={demo} onChange={(event) => update("demo", event.target.value)}>
            <option value="all">{t("All demo access")}</option>
            <option value="online">{t("Online interactive demo")}</option>
            <option value="public">{t("Public interactive demo")}</option>
            <option value="local">{t("Local run / downloadable demo")}</option>
            <option value="none">{t("No confirmed demo")}</option>
          </select>
          <label className="paper-project-filter"><input type="checkbox" checked={projectOnly}
            onChange={(event) => update("project", event.target.checked ? "yes" : "")} />{t("With a project page")}</label>
        </div>
        </div>
        <p className="paper-sort-note">{t(sort === "practical" ? "Interactive demos first, then documented local runs and published code." : "Filter for official code, project pages, and ways to try the research.")}</p>
        <div className="research-results-bar">
          <div className="results-meta research-results-meta paper-results-meta">
            <span aria-live="polite">{role === "related" ? t("{count} related sources", { count: filtered.length })
              : t("{count} papers & reports", { count: filtered.length })}</span>
            <a href="#paper-coverage">{t("Source & coverage")}</a>
          </div>
          <ReadingPagination compact page={page} pages={pages} pageTo={pageTo} ariaLabel="Paper page controls" />
        </div>
        {current.length ? <div className="paper-rows">
          {current.map(({ entry }) => {
            const paper = entry.data;
            const access = accessForPaper(paper);
            const roleLabel = paperRoles[paper.primaryRole].label;
            return <article key={entry.key} className="paper-row" data-paper-row={entry.id} data-paper-type={paper.referenceType}>
              <div className="paper-row-main">
                <h2><Link to={entry.url} lang="en">{paper.title}</Link></h2>
                <p className="paper-byline"><span lang="en" title={paper.authors}>{shortPaperAuthors(paper.authors)}</span>
                  <span>·</span><time>{paper.year}</time><span>·</span><span>{t(paperTypes[paper.referenceType])}</span></p>
                <p className="paper-topics"><span>{t(roleLabel)}</span>{paper.topics.filter((topic) => topic !== roleLabel && !topic.startsWith("Role: ")).slice(0, 2).map((topic) =>
                  <span key={topic}>{t(topic)}</span>)}</p>
                <PaperAvailability access={access} />
              </div>
              <div className="paper-actions">
                <PaperArtifactLinks access={access} />
                <div className="paper-reading-actions">
                <a className="paper-primary-link" href={paper.url} target="_blank" rel="noreferrer">
                  {t(isAcademicPaper(paper) ? "Paper" : "Source")}<ArrowUpRight size={14} aria-hidden="true" />
                </a>
                {paper.pdfUrl && <a href={paper.pdfUrl} target="_blank" rel="noreferrer">PDF<ArrowUpRight size={13} aria-hidden="true" /></a>}
                <Link to={entry.url}>{t("Details")}<ArrowRight size={13} aria-hidden="true" /></Link>
                </div>
              </div>
            </article>;
          })}
        </div> : <div className="empty-state research-empty">
          <p>{t("No matching references. Try another role, year, or search.")}</p>
          <button type="button" onClick={() => setParams({}, { replace: true, preventScrollReset: true })}>{t("Clear filters")}</button>
        </div>}
        <ReadingPagination page={page} pages={pages} pageTo={pageTo} ariaLabel="Paper pagination" />
        <details className="research-index paper-index">
          <summary>{t("Complete reference index")}<span>{entries.length}</span><ChevronDown size={16} aria-hidden="true" /></summary>
          <p>{t("Every reference, alphabetically. Papers and related sources keep their original publication types.")}</p>
          <ul>{completeIndex.map((entry) => <li key={entry.key} data-content-ref={entry.key}>
            <Link to={entry.url} lang="en">{entry.title}</Link><small>{entry.data.year} · {t(paperTypes[entry.data.referenceType])}</small>
          </li>)}</ul>
        </details>
        <section className="paper-coverage" id="paper-coverage" aria-labelledby="paper-coverage-title">
          <h2 id="paper-coverage-title">{t("Source & coverage")}</h2>
          <p>{t("All 419 references from the survey, supplemented by papers already cited across GameMap. Duplicate publications are merged.")}</p>
          <p>{t("{papers} papers and reports; {related} books, product pages, and other related sources. The default list shows academic research and technical reports.", { papers: academicCount, related: entries.length - academicCount })}</p>
          <p>{t("Roles follow the survey index and cited sections, with editorial classification where needed. This is a bibliographic reading map; inclusion does not imply independent reproduction, peer review, or permission to reuse code.")}</p>
          <p>{t("Code and demo labels follow author pages, repository contents, and stated licenses. A public repository without an established open-source license is labeled separately. Partial tools, release placeholders, and videos are not treated as complete runnable systems or interactive demos.")}</p>
          <p>{t("No official code found describes this review, not proof that code is closed. Demo access may require an account, hardware, paid APIs, or local setup; each detail page records the conditions and evidence.")}</p>
          <div className="paper-downloads">
            <a href="https://arxiv.org/html/2609.16679v1#bib" target="_blank" rel="noreferrer">{t("Survey bibliography")}<ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href={`${import.meta.env.BASE_URL}papers.json`} download><Download size={14} aria-hidden="true" />{t("Download JSON")}</a>
            <a href={`${import.meta.env.BASE_URL}papers.bib`} download><Download size={14} aria-hidden="true" />{t("Download BibTeX")}</a>
            <a href={`${import.meta.env.BASE_URL}papers-provenance.json`} download>{t("Classification sources")}<ArrowRight size={14} aria-hidden="true" /></a>
          </div>
        </section>
      </section>
    </div>
  </main>;
}
