import { useEffect, useState } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import { contentFor } from "../../content/registry.server";
import { contentKinds, type ContentKind } from "../../content/models";
import { pages } from "../../content/site";
import { matchesSearch } from "../../content/matching";
import { searchContent } from "../lib/content-search";
import { ContentCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";
import { Link, useSiteI18n } from "../lib/i18n";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    entries: content.entries.map(
      ({
        key,
        kind,
        id,
        title,
        description,
        url,
        descriptionLanguage,
        originalTitle,
      }) => ({
        key,
        kind,
        id,
        title,
        description,
        url,
        descriptionLanguage,
        originalTitle,
      }),
    ),
    counts: Object.fromEntries(
      Object.keys(contentKinds).map((kind) => [
        kind,
        content.all(kind as ContentKind).length,
      ]),
    ),
  };
}
export default function Explore() {
  const { t, locale } = useSiteI18n(),
    { entries, counts } = useLoaderData<typeof loader>(),
    [params, setParams] = useClientQuery();
  const query = (params.get("q") || "").trim(),
    requested = params.get("kind") || "all",
    selectedKind = Object.hasOwn(contentKinds, requested) ? requested : "all";
  const [result, setResult] = useState<{
    query: string;
    locale: string;
    keys: string[];
    error?: string;
  }>();
  useEffect(() => {
    let cancelled = false;
    if (query)
      searchContent(query, locale)
        .then((rows) => {
          if (!cancelled)
            setResult({ query, locale, keys: rows.map((row) => row.key) });
        })
        .catch(() => {
          if (!cancelled)
            setResult({
              query,
              locale,
              keys: [],
              error:
                "Full-text search is unavailable. Showing title and summary matches.",
            });
        });
    return () => {
      cancelled = true;
    };
  }, [query, locale]);
  const ready = result?.query === query && result?.locale === locale;
  const filtered = entries.filter(
    (entry) =>
      (selectedKind === "all" || entry.kind === selectedKind) &&
      (!query || (ready && !result?.error)
        ? !query || result!.keys.includes(entry.key)
        : matchesSearch(
            `${entry.title} ${entry.originalTitle || ""} ${entry.description}`,
            query,
          )),
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
      <title>{t("All content — GameMap")}</title>
      <meta
        name="description"
        content={t("Find tools, games, guides, and practical workflows.")}
      />
      <header className="page-heading">
        <span className="eyebrow">{t("EXPLORE")}</span>
        <h1>{t("The complete map.")}</h1>
        <p>{t("Find tools, games, guides, and practical workflows.")}</p>
      </header>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={20} />
          <input
            aria-label={t("Search all content")}
            placeholder={t(
              "Search tools, article text, deliverables, or evidence…",
            )}
            value={params.get("q") || ""}
            onChange={(event) => change("q", event.target.value)}
          />
        </div>
        <label className="content-kind-filter">
          <span className="sr-only">{t("Content type")}</span>
          <select
            value={selectedKind}
            onChange={(event) => change("kind", event.target.value)}
          >
            <option value="all">{t("All content types")}</option>
            {Object.entries(contentKinds).map(([kind, definition]) => (
              <option key={kind} value={kind}>
                {t(definition.plural)} ({counts[kind]})
              </option>
            ))}
          </select>
        </label>
      </div>
      <nav className="content-overview" aria-label={t("Content types")}>
        {Object.entries(contentKinds).map(([kind, definition]) => (
          <a key={kind} href={`#${kind}`}>
            {t(definition.plural)}
            <span>{counts[kind]}</span>
          </a>
        ))}
      </nav>
      {query && (!ready || result.error) && (
        <p role="status" className="reading-note">
          {t((ready && result?.error) || "Loading full-text matches…")}
        </p>
      )}
      <div className="results-meta">
        <span aria-live="polite">
          {t("{count} results", { count: filtered.length })}
        </span>
      </div>
      {Object.entries(contentKinds).map(([kind, definition]) => {
        const items = filtered.filter((entry) => entry.kind === kind);
        return items.length ? (
          <section className="content-index-section" id={kind} key={kind}>
            <div className="section-top">
              <div>
                <h2>{t(definition.plural)}</h2>
              </div>
              <Link className="inline-link" to={pages[definition.page].path}>
                {t("Open collection")}
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="content-grid">
              {items.map((entry) => (
                <ContentCard entry={entry} key={entry.key} />
              ))}
            </div>
          </section>
        ) : null;
      })}
      {!filtered.length && (
        <div className="empty-state">
          <h2>{t("No matches on this map.")}</h2>
          <p>{t("Try fewer words or another content type.")}</p>
          <button
            className="button button-secondary"
            onClick={() => setParams({})}
          >
            {t("Clear filters")}
          </button>
        </div>
      )}
    </main>
  );
}
