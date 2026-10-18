import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import { content, contentKinds, pages } from "../../content/registry";
import type { ContentKind } from "../../content/models";
import { ContentCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";
import { searchableText } from "../../content/search";

export default function Explore() {
  const [params, setParams] = useClientQuery();
  const query = (params.get("q") || "").trim();
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const selectedKind = params.get("kind") || "all";
  const filtered = content.entries.filter(
    (entry) =>
      (selectedKind === "all" || entry.kind === selectedKind) &&
      tokens.every((token) =>
        searchableText(entry).toLowerCase().includes(token),
      ),
  );
  const change = (key: string, value: string) =>
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
      <title>All content — GameMap</title>
      <meta
        name="description"
        content="One searchable index of every resource, game, toolkit entry, development step, recording, collection, and document in GameMap."
      />
      <header className="page-heading">
        <span className="eyebrow">NOTHING LEFT IN A SIDE FILE</span>
        <h1>The complete map.</h1>
        <p>
          Every registered item, in one place. Counts describe source
          records—not independent reproductions or unique video files.
        </p>
      </header>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={20} />
          <input
            aria-label="Filter content index"
            placeholder="Filter titles, summaries, and structured fields…"
            value={params.get("q") || ""}
            onChange={(event) => change("q", event.target.value)}
          />
        </div>
        <label className="content-kind-filter">
          <span className="sr-only">Content type</span>
          <select
            value={selectedKind}
            onChange={(event) => change("kind", event.target.value)}
          >
            <option value="all">All content types</option>
            {Object.entries(contentKinds).map(([kind, definition]) => (
              <option key={kind} value={kind}>
                {definition.plural} ({content.all(kind as ContentKind).length})
              </option>
            ))}
          </select>
        </label>
      </div>
      <nav className="content-overview" aria-label="Content types">
        {Object.entries(contentKinds).map(([kind, definition]) => (
          <a key={kind} href={`#${kind}`}>
            {definition.plural}
            <span>{content.all(kind as ContentKind).length}</span>
          </a>
        ))}
      </nav>
      <p className="reading-note">
        For full-text article search, use “Search all content” in the header or
        press ⌘K.
      </p>
      <div className="results-meta">
        <span aria-live="polite">
          {filtered.length} of {content.entries.length} content records
        </span>
        <Link to="/docs/content-model/">
          How coverage is checked
          <ArrowRight size={13} />
        </Link>
      </div>
      {Object.entries(contentKinds).map(([kind, definition]) => {
        const items = filtered.filter((entry) => entry.kind === kind);
        if (!items.length) return null;
        return (
          <section className="content-index-section" id={kind} key={kind}>
            <div className="section-top">
              <div>
                <span className="eyebrow">{items.length} RECORDS</span>
                <h2>{definition.plural}</h2>
              </div>
              <Link className="inline-link" to={pages[definition.page].path}>
                Open collection
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="content-grid">
              {items.map((entry) => (
                <ContentCard entry={entry} key={entry.key} />
              ))}
            </div>
          </section>
        );
      })}
      {!filtered.length && (
        <div className="empty-state">
          <h2>No matches on this map.</h2>
          <p>Try fewer words or another content type.</p>
          <button
            className="button button-secondary"
            onClick={() => setParams({})}
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}
