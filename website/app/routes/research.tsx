import { useMemo } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import {
  Search,
  ArrowRight,
  Download,
  SlidersHorizontal,
  X,
  CodeXml,
} from "lucide-react";
import { content, contentFor } from "../../content/registry.server";
import { researchRecordVisible } from "../../content/research-visibility";
import {
  researchTopics,
  researchTopicFor,
  researchReadiness,
  researchSnapshot,
  researchLicense,
  researchBrowserOptions,
  normalizeResearchFilters,
  selectResearchEntries,
  type ResearchSearchIndex,
} from "../../content/research-browser";
import { researchSearchText } from "../../content/research-browser.server";
import type { ContentEntry } from "../../content/models";
import { researchLedger } from "../lib/collection-stats";
import { collectionPage, updateCollectionQuery } from "../lib/collection-query";
import { useClientQuery } from "../lib/client-query";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { publicAsset } from "../../src/publicAsset";
import {
  CollectionPagination,
  IndexEmpty,
  IndexHero,
} from "../components/catalog-browser";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";

type ResearchEntry = ContentEntry<"repository-research">;
const filterKeys = [
  "topic",
  "status",
  "stage",
  "snapshot",
  "license",
  "sort",
] as const;
const description =
  "Game projects, engines, tools and references, with source evidence and review limits.";

export function loader({ request }: LoaderFunctionArgs) {
  const registry = contentFor(request);
  const allRecords = researchLedger(registry);
  const canonicalRecords = researchLedger(content).filter((entry) =>
    researchRecordVisible(entry.kind, entry.data),
  );
  return {
    records: allRecords.filter((entry) =>
      researchRecordVisible(entry.kind, entry.data),
    ),
    options: researchBrowserOptions(canonicalRecords),
    search: researchSearchText(),
    exampleCount:
      registry.all("repository-research").length - allRecords.length,
    hiddenCount: allRecords.length - canonicalRecords.length,
  };
}

function ResearchCard({
  entry,
  number,
  search,
}: {
  entry: ResearchEntry;
  number: number;
  search: ResearchSearchIndex;
}) {
  const { t } = useSiteI18n();
  const stage = researchReadiness(entry);
  const snapshot = researchSnapshot(entry);
  const license = researchLicense(entry, search);
  const topic = researchTopics.find(({ id }) => id === researchTopicFor(entry));
  const repo = entry.data.canonical_repo || entry.data.requested_repo;
  return (
    <article className="research-card" data-content-ref={entry.key}>
      <div className="research-card-top">
        <span
          className="research-card-number"
          aria-label={t("Result {number}", { number })}
        >
          {String(number).padStart(3, "0")}
        </span>
        <span>{t(topic?.label || "Repository research record")}</span>
        <SourceLanguage english={entry.descriptionLanguage === "en"} />
      </div>
      <h2>
        <Link to={entry.url}>
          <bdi>{entry.title}</bdi>
        </Link>
      </h2>
      <p
        className="research-card-summary"
        lang={entry.descriptionLanguage === "en" ? "en" : undefined}
      >
        {entry.description}
      </p>
      <div className="research-card-flags">
        <span data-stage={stage.id}>{t(stage.label)}</span>
        <span
          title={t(
            "License summary; see the research notes for asset and dependency terms.",
          )}
        >
          {t(license.label)}
        </span>
      </div>
      <p className="research-card-review">
        <span>
          {t("Source checked")}:{" "}
          <time dateTime={entry.data.checked_at}>{entry.data.checked_at}</time>
        </span>
        <span>{t(snapshot.label)}</span>
      </p>
      <div className="research-card-actions">
        <Link to={entry.url}>
          {t("Review notes")}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <a
          href={`https://github.com/${repo.split("/").map(encodeURIComponent).join("/")}`}
          target="_blank"
          rel="noreferrer"
        >
          <CodeXml size={15} aria-hidden="true" />
          {t("Repository")}
        </a>
      </div>
    </article>
  );
}

export default function RepositoryResearch() {
  const { t } = useSiteI18n();
  const { records, options, search, exampleCount, hiddenCount } =
    useLoaderData<typeof loader>();
  const [params, setParams, hydrated] = useClientQuery();
  const filters = useMemo(
    () => normalizeResearchFilters(params, options),
    [params, options],
  );
  const filtered = useMemo(
    () => selectResearchEntries(records, filters, search),
    [records, filters, search],
  );
  const pagination = collectionPage(params.get("page"), filtered.length);
  const visible = hydrated
    ? filtered.slice(pagination.start - 1, pagination.end)
    : records;
  const invalid = filterKeys.filter(
    (key) => params.has(key) && params.get(key) !== filters[key],
  );
  const optionLabel = (key: string, value: string) => {
    const group =
      key === "topic"
        ? options.topics
        : key === "status"
          ? options.statuses
          : key === "stage"
            ? options.stages
            : key === "snapshot"
              ? options.snapshots
              : key === "license"
                ? options.licenses
                : options.sorts;
    return t(group.find(({ id }) => id === value)?.label || value);
  };
  const active = [
    ...(filters.query ? [["q", filters.query, filters.query]] : []),
    ...filterKeys
      .filter(
        (key) =>
          filters[key] !== "all" &&
          !(key === "sort" && filters.sort === "ledger"),
      )
      .map((key) => [key, filters[key], optionLabel(key, filters[key])]),
  ];
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = updateCollectionQuery(previous, { [key]: value });
        for (const item of invalid) if (item !== key) next.delete(item);
        if (key === "sort" && value === "ledger") next.delete("sort");
        return next;
      },
      { replace: key !== "page", preventScrollReset: true },
    );
  const clear = () =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        for (const key of [...filterKeys, "q", "page"]) next.delete(key);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  const turnPage = (page: number) => {
    update("page", String(page));
    const result = document.getElementById("collection-results");
    result?.focus({ preventScroll: true });
    result?.scrollIntoView({ block: "start" });
  };
  const paging = (position: "top" | "bottom") =>
    hydrated && (
      <CollectionPagination
        pagination={pagination}
        onPageChange={turnPage}
        label={
          position === "top" ? "Collection pages" : "More collection pages"
        }
      />
    );
  return (
    <main id="main-content" className="ix-page ix-research">
      <title>{t("Repository research ledger — GameMap")}</title>
      <meta name="description" content={t(description)} />
      <IndexHero
        pillar="research"
        title="The repository research ledger."
        lede={description}
        count={records.length}
        countLabel="repositories in this list"
      >
        <div className="heading-links">
          <Link to="/examples/#game-examples">
            {t("Game examples")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <a href={publicAsset("repository-research.json")} download>
            <Download size={14} aria-hidden="true" />
            {t("Download full audit (JSON)")}
          </a>
        </div>
      </IndexHero>
      <div className="ix-wrap">
        <p className="research-coverage">
          {t(
            "{listed} listed here · {examples} in Game examples · {hidden} audit-only",
            {
              listed: records.length,
              examples: exampleCount,
              hidden: hiddenCount,
            },
          )}
        </p>
        <nav className="ix-topics" aria-label={t("Research topics")}>
          <button
            type="button"
            disabled={!hydrated}
            aria-pressed={filters.topic === "all"}
            onClick={() => update("topic", "all")}
          >
            <span>{t("All topics")}</span>
            <span>{records.length}</span>
          </button>
          {options.topics.map(({ id, label, count }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filters.topic === id}
              disabled={!hydrated || !count}
              onClick={() => update("topic", id)}
            >
              <span>{t(label)}</span>
              <span>{count}</span>
            </button>
          ))}
        </nav>
        <div className="ix-bar research-toolbar">
          <label className="ix-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              disabled={!hydrated}
              aria-label={t("Search repository research")}
              placeholder={t("Search repositories, topics or license names…")}
              value={params.get("q") || ""}
              onChange={(event) => update("q", event.target.value)}
            />
          </label>
          <label className="research-select">
            <span className="sr-only">{t("Research disposition")}</span>
            <select
              disabled={!hydrated}
              value={filters.status}
              onChange={(event) => update("status", event.target.value)}
            >
              <option value="all">{t("All dispositions")}</option>
              {options.statuses.map(({ id, label, count }) => (
                <option key={id} value={id}>
                  {t(label)} · {count}
                </option>
              ))}
            </select>
          </label>
          <label className="research-select">
            <span className="sr-only">{t("Sort collection")}</span>
            <select
              disabled={!hydrated}
              value={filters.sort}
              onChange={(event) => update("sort", event.target.value)}
            >
              {options.sorts.map(({ id, label }) => (
                <option key={id} value={id}>
                  {t(label)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <details className="catalog-refinements research-refinements">
          <summary>
            <SlidersHorizontal size={15} aria-hidden="true" />
            {t("Evidence & license filters")}
            <span>{t("Refine results")}</span>
          </summary>
          <div className="catalog-refinement-fields">
            {(
              [
                ["license", "License", "All licenses", options.licenses],
                ["stage", "Review depth", "All review depths", options.stages],
                [
                  "snapshot",
                  "Evidence snapshot",
                  "All snapshot states",
                  options.snapshots,
                ],
              ] as const
            ).map(([key, label, all, values]) => (
              <label key={key}>
                <span>{t(label)}</span>
                <select
                  disabled={!hydrated}
                  value={filters[key]}
                  onChange={(event) => update(key, event.target.value)}
                >
                  <option value="all">{t(all)}</option>
                  {values.map(({ id, label, count }) => (
                    <option key={id} value={id}>
                      {t(label)} · {count}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </details>
        <p className="research-review-note">
          {t(
            "Source review describes the available evidence; these projects have not been executed in this review. Check each record for implementation, license and access limits.",
          )}
        </p>
        <noscript>
          <p className="research-review-note">
            {t(
              "All records are shown. Enable JavaScript to filter, sort, and browse by page.",
            )}
          </p>
        </noscript>
        {invalid.length > 0 && (
          <p className="research-filter-notice" role="status">
            {t("Unknown filters were ignored.")}
          </p>
        )}
        {(active.length > 0 || invalid.length > 0) && (
          <div
            className="catalog-active-filters"
            aria-label={t("Active filters")}
          >
            {active.map(([key, , label]) => (
              <button
                key={key}
                onClick={() =>
                  update(
                    key,
                    key === "q" ? "" : key === "sort" ? "ledger" : "all",
                  )
                }
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
                  count: hydrated ? filtered.length : records.length,
                  total: records.length,
                })}
          </p>
          <span>{t("Numbered in result order")}</span>
        </div>
        {paging("top")}
        <div className="research-grid">
          {visible.map((entry, index) => (
            <ResearchCard
              key={entry.key}
              entry={entry}
              search={search}
              number={(hydrated ? pagination.start - 1 : 0) + index + 1}
            />
          ))}
        </div>
        {!filtered.length && (
          <IndexEmpty
            title="No matching research records."
            body="Try fewer words, another topic, or another disposition."
          >
            <button onClick={clear}>{t("Clear filters")}</button>
          </IndexEmpty>
        )}
        {paging("bottom")}
      </div>
    </main>
  );
}
