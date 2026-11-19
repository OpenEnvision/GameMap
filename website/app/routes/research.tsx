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
import { IndexEmpty, IndexHero } from "../components/catalog-browser";
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
  const dispositions = [
    ...new Set(records.map((entry) => entry.data.disposition)),
  ];
  return (
    <main id="main-content" className="ix-page ix-research">
      <title>{t("Repository research ledger — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Repositories not yet included in game examples. Already-listed games are omitted here.",
        )}
      />
      <IndexHero
        pillar="research"
        kicker="DISCOVERY IS NOT VALIDATION"
        title="The repository research ledger."
        lede="Repositories not yet included in game examples. Already-listed games are omitted here."
        count={records.length}
        countLabel="repositories reviewed"
      >
        <div className="heading-links">
          <Link to="/examples/#game-examples">
            {t("Game examples")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </IndexHero>
      <div className="ix-wrap">
        <div className="ix-bar">
          <label className="ix-search">
            <Search size={18} aria-hidden="true" />
            <input
              aria-label={t("Search repository research")}
              placeholder={t(
                "Search repository, scope, license, or qualification…",
              )}
              value={query}
              onChange={(event) => update("q", event.target.value)}
            />
          </label>
          <div className="ix-bar-selects">
            <label className="ix-select ix-select-wide">
              <select
                aria-label={t("Research disposition")}
                value={status}
                onChange={(event) => update("status", event.target.value)}
              >
                <option value="all">{t("All dispositions")}</option>
                {dispositions.map((value) => (
                  <option key={value} value={value}>
                    {t(value)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="ix-meta">
          <h2 className="ix-meta-title" aria-live="polite">
            {t("{count} of {total} research records", {
              count: filtered.length,
              total: records.length,
            })}
          </h2>
          <span className="ix-meta-rule" aria-hidden="true" />
          <span>{t("Numbered in ledger order")}</span>
        </div>
        <div className="content-grid ix-ledger ix-ledger-numbered">
          {filtered.map((entry) => (
            <ContentCard key={entry.key} entry={entry} />
          ))}
        </div>
        {!filtered.length && (
          <IndexEmpty
            title="No matching research records."
            body="Try fewer words or another disposition."
          />
        )}
      </div>
    </main>
  );
}
