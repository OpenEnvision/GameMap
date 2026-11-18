import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { contentFor } from "../../content/registry.server";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { researchNotInExamples } from "../../content/research-games";
import open3dImport from "../../content/open3d-import.config.json";
import { ContentCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";
import { Link, useSiteI18n } from "../lib/i18n";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    records: researchNotInExamples(content.all("repository-research"), [
      ...content.all("example"),
      ...content.all("foundation"),
      ...content
        .all("threejs-game")
        .filter((entry) =>
          open3dImport.includedLegacyThreejsIds.includes(entry.id),
        ),
    ]),
  };
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
          "Repositories not yet included in game examples. Already-listed games are omitted here.",
        )}
      />
      <header className="page-heading">
        <span className="eyebrow">{t("DISCOVERY IS NOT VALIDATION")}</span>
        <h1>{t("The repository research ledger.")}</h1>
        <p>
          {t(
            "Repositories not yet included in game examples. Already-listed games are omitted here.",
          )}
        </p>
        <div className="heading-links">
          <Link to="/examples/#game-examples">
            {t("Game examples")}
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
