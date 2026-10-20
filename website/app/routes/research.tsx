import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { contentFor } from "../../content/registry.server";
import { url } from "../../content/site";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { ContentCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";
import { Link, useSiteI18n } from "../lib/i18n";
export function loader({ request }: LoaderFunctionArgs) {
  return { records: contentFor(request).all("repository-research") };
}
export default function RepositoryResearch() {
  const { t } = useSiteI18n(),
    { records } = useLoaderData<typeof loader>(),
    [params, setParams] = useClientQuery();
  const query = params.get("q") || "",
    status = params.get("status") || "all";
  const filtered = records.filter(
    (entry) =>
      (status === "all" || entry.data.disposition === status) &&
      matchesSearch(searchableText(entry), query),
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
      <title>{t("Repository research ledger — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Find projects, inspect their source, and check the setup and usage terms.",
        )}
      />
      <header className="page-heading">
        <span className="eyebrow">{t("DISCOVERY IS NOT VALIDATION")}</span>
        <h1>{t("The repository research ledger.")}</h1>
        <p>
          {t(
            "Find projects, inspect their source, and check the setup and usage terms.",
          )}
        </p>
        <div className="heading-links">
          <Link to={url.document("cadle-repositories")}>
            {t("Read the import methodology & findings")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={19} />
          <input
            aria-label={t("Search repository research")}
            placeholder={t(
              "Search repository, scope, license, or qualification…",
            )}
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
        <select
          aria-label={t("Research disposition")}
          value={status}
          onChange={(event) => update("status", event.target.value)}
        >
          <option value="all">{t("All dispositions")}</option>
          {[...new Set(records.map((entry) => entry.data.disposition))].map(
            (value) => (
              <option key={value} value={value}>
                {t(value)}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="results-meta">
        <span aria-live="polite">
          {t("{count} of {total} research records", {
            count: filtered.length,
            total: records.length,
          })}
        </span>
      </div>
      <div className="content-grid">
        {filtered.map((entry) => (
          <ContentCard key={entry.key} entry={entry} />
        ))}
      </div>
      {!filtered.length && (
        <p className="empty-state">
          {t(
            "No matching research records. Try fewer words or another disposition.",
          )}
        </p>
      )}
    </main>
  );
}
