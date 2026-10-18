import { Link } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { content, url } from "../../content/registry";
import { ContentCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";
import { searchableText } from "../../content/search";

export default function RepositoryResearch() {
  const [params, setParams] = useClientQuery();
  const query = params.get("q") || "";
  const status = params.get("status") || "all";
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const records = content.all("repository-research");
  const filtered = records.filter(
    (entry) =>
      (status === "all" || entry.data.disposition === status) &&
      tokens.every((token) =>
        searchableText(entry).toLowerCase().includes(token),
      ),
  );
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (!value || value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  return (
    <main id="main-content" className="site-main listing-page">
      <title>Repository research ledger — GameMap</title>
      <meta
        name="description"
        content="The complete Cadle-like source-research ledger, preserving unavailable repositories, identity boundaries, evidence scope, and licensing qualifications."
      />
      <header className="page-heading">
        <span className="eyebrow">DISCOVERY IS NOT VALIDATION</span>
        <h1>The repository research ledger.</h1>
        <p>
          Historical candidates and the separate reference stay visible,
          including unavailable sources and forks. These records are not
          additional resource-directory entries or verified playable cases. No
          project was installed, run, played, or benchmarked.
        </p>
        <div className="heading-links">
          <Link to={url.document("cadle-repositories")}>
            Read the import methodology & findings
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={19} />
          <input
            aria-label="Search repository research"
            placeholder="Search repository, scope, license, or qualification…"
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
        <select
          aria-label="Research disposition"
          value={status}
          onChange={(event) => update("status", event.target.value)}
        >
          <option value="all">All dispositions</option>
          {[...new Set(records.map((entry) => entry.data.disposition))].map(
            (value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="results-meta">
        <span aria-live="polite">
          {filtered.length} of {records.length} research records
        </span>
        <span>
          Read-only source review · rights and identity qualifications retained
        </span>
      </div>
      <div className="content-grid">
        {filtered.map((entry) => (
          <ContentCard key={entry.key} entry={entry} />
        ))}
      </div>
      {!filtered.length && (
        <p className="empty-state">
          No matching research records. Try fewer words or another disposition.
        </p>
      )}
    </main>
  );
}
