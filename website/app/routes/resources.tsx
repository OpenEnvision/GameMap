import { useEffect, useState, type CSSProperties } from "react";
import {
  useLocation,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import {
  ArrowDownUp,
  Bookmark,
  Compass,
  Download,
  LayoutGrid,
  Route,
  Search,
  SlidersHorizontal,
  Tags,
  X,
} from "lucide-react";
import { Link, useNavigate, useSiteI18n, SourceLanguage } from "../lib/i18n";
import {
  content,
  contentFor,
  contentIn,
  sources,
} from "../../content/registry.server";
import { matchesSearch } from "../../content/matching";
import {
  compareDirectoryTitles,
  parseDirectorySearchQuery,
} from "../../content/directory-search";
import { resourceSearchText } from "../../content/resource-search.server";
import { ResourceAttribution } from "../../src/components/ResourceIcon";
import { CatalogIcon } from "../components/catalog-icon";
import {
  resourceCollections,
  type Dimension,
  type Stage,
} from "../../src/types";
import {
  categories,
  categoryGlyphs,
  stageLabels,
  typeLabels,
} from "../lib/catalog";
import { ResourceDetail } from "../components/resource-detail";
import { url } from "../../content/site";
import { useClientQuery } from "../lib/client-query";
import { IndexEmpty, IndexHero } from "../components/catalog-browser";
import { ResourceOverview } from "../components/resource-overview";
import { ResourceCardInfo } from "../components/resource-card-info";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";

const productionToolTopics = ["Tiled", "LDtk", "Aseprite", "ink", "Nakama"];
const resourceFilterKeys = [
  "q",
  "category",
  "type",
  "stage",
  "track",
  "dimension",
  "saved",
] as const;

export function loader({ request }: LoaderFunctionArgs) {
  const local = contentFor(request);
  const chinese = contentIn("zh");
  return {
    entries: local.all("resource"),
    demos: local.all("demo"),
    identities: sources.identities,
    resourceSearch: resourceSearchText(),
    testingLinks: local.all("testing").map((entry) => ({
      title: entry.title,
      url: entry.url,
      search: [
        content.require("testing", entry.id).title,
        chinese.require("testing", entry.id).title,
        entry.id.replaceAll("-", " "),
      ].join(" "),
    })),
  };
}
function supportedFilter(
  value: string | null,
  options: readonly string[],
  fallback = "all",
) {
  return value && options.includes(value) ? value : fallback;
}

export default function Resources() {
  const { t } = useSiteI18n(),
    { entries, demos, identities, resourceSearch, testingLinks } =
      useLoaderData<typeof loader>();
  const resources = entries.map((entry) => entry.data),
    entryById = new Map(entries.map((entry) => [entry.id, entry]));
  const [params, , hydrated] = useClientQuery(),
    location = useLocation(),
    navigate = useNavigate();
  const [saved, setSaved] = useState<string[]>([]),
    [ready, setReady] = useState(false),
    [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(
        localStorage.getItem("gamemap-saved-v1") || "[]",
      );
      if (Array.isArray(stored))
        setSaved(
          stored.filter(
            (id): id is string =>
              typeof id === "string" &&
              resources.some((resource) => resource.id === id),
          ),
        );
    } catch {
      setNotice("Your saved collection could not be read.");
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("gamemap-saved-v1", JSON.stringify(saved));
    } catch {
      setNotice(
        "Your browser could not save this collection. It is available for this session.",
      );
    }
  }, [saved, ready]);
  const toggleSave = (id: string) =>
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  const query = params.get("q") || "",
    search = parseDirectorySearchQuery(query),
    selectedScope = supportedFilter(
      params.get("collection"),
      [...resourceCollections.map(({ id }) => id), "all"],
      "",
    ),
    collection =
      selectedScope ||
      (resourceFilterKeys.some((key) => params.has(key)) ? "all" : "tools"),
    category = supportedFilter(
      params.get("category"),
      categories.map(({ id }) => id),
    ),
    type = supportedFilter(params.get("type"), Object.keys(typeLabels)),
    stage = supportedFilter(params.get("stage"), Object.keys(stageLabels)),
    track = supportedFilter(params.get("track") || params.get("dimension"), [
      "2d",
      "3d",
      "world",
    ]),
    sort = supportedFilter(
      params.get("sort"),
      search.empty ? ["category", "name"] : ["relevance", "category", "name"],
      search.empty ? "category" : "relevance",
    ),
    savedOnly = params.get("saved") === "1";
  const applyFilters = (next: URLSearchParams) =>
    navigate(
      {
        search: next.size ? `?${next}` : "",
        hash:
          window.location.hash === "#resource-results"
            ? ""
            : window.location.hash,
      },
      { replace: true, preventScrollReset: true, flushSync: true },
    );
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(window.location.search);
    if (key === "track") next.delete("dimension");
    if (key === "collection") {
      for (const filter of ["category", "type", "stage", "track", "dimension"])
        next.delete(filter);
      next.set("collection", value || "tools");
    } else {
      if (key === "saved" && value === "1") next.set("collection", "all");
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
    }
    return applyFilters(next);
  };
  const collectionResources = resources.filter(
    (resource) => collection === "all" || resource.collection === collection,
  );
  const filtered = collectionResources
    .filter(
      (resource) =>
        (category === "all" || resource.category === category) &&
        (type === "all" || resource.type === type) &&
        (stage === "all" || resource.stages.includes(stage as Stage)) &&
        (track === "all" || resource.dimensions.includes(track as Dimension)) &&
        (!savedOnly || saved.includes(resource.id)) &&
        matchesSearch(resourceSearch[resource.id] || "", search),
    )
    .sort((a, b) => {
      const relevance =
        sort === "relevance"
          ? compareDirectoryTitles(search, a.name, b.name)
          : 0;
      const categoryOrder =
        sort !== "name"
          ? categories.findIndex(({ id }) => id === a.category) -
            categories.findIndex(({ id }) => id === b.category)
          : 0;
      return relevance || categoryOrder || a.name.localeCompare(b.name);
    });
  let activeId = "";
  try {
    if (hydrated && location.hash.startsWith("#resource/"))
      activeId = decodeURIComponent(location.hash.slice(10));
  } catch {
    /* Ignore malformed shared links. */
  }
  const active = resources.find((resource) => resource.id === activeId);
  const selectResource = (id: string) =>
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
        hash: id ? "#resource/" + encodeURIComponent(id) : "",
      },
      { replace: true, preventScrollReset: true },
    );
  const exportSaved = () => {
    const selected = resources.filter((resource) =>
      saved.includes(resource.id),
    );
    const markdown =
      "# " +
      t("My GameMap collection") +
      "\n\n" +
      selected
        .map(
          (resource) =>
            `## [${resource.name}](${resource.url})\n\n${resource.summary}\n\n${resource.detail}\n`,
        )
        .join("\n");
    const address = URL.createObjectURL(
        new Blob([markdown], { type: "text/markdown;charset=utf-8" }),
      ),
      anchor = document.createElement("a");
    anchor.href = address;
    anchor.download = "gamemap-collection.md";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(address), 1000);
  };
  const counts = Object.fromEntries(
    categories.map((item) => [
      item.id,
      collectionResources.filter((resource) => resource.category === item.id)
        .length,
    ]),
  );
  const tone = (id: string) =>
    ({ "--tone": `var(--tax-${id})` }) as CSSProperties;
  const selectedCategory = categories.find((item) => item.id === category);
  const selectedCollection = resourceCollections.find(
    (item) => item.id === collection,
  );
  const availableCategories = categories.filter(
    (item) => counts[item.id] > 0 || category === item.id,
  );
  const availableTypes = Object.entries(typeLabels).filter(
    ([id]) =>
      type === id ||
      collectionResources.some((resource) => resource.type === id),
  );
  const otherCollectionMatches =
    !search.empty && !savedOnly && collection !== "all"
      ? resources.filter(
          (resource) =>
            resource.collection !== collection &&
            matchesSearch(resourceSearch[resource.id] || "", search),
        ).length
      : 0;
  const testingMatches =
    !search.empty && query.trim().length > 1 && !savedOnly
      ? testingLinks
          .filter((item) => matchesSearch(item.search, search))
          .sort((a, b) => compareDirectoryTitles(search, a.title, b.title))
      : [];
  const guideMatches =
    !search.empty && query.trim().length > 1 && !savedOnly
      ? productionToolTopics.filter((topic) => matchesSearch(topic, search))
      : [];
  const hasRelated = testingMatches.length > 0 || guideMatches.length > 0;
  const CategoryGlyph = selectedCategory
    ? categoryGlyphs[selectedCategory.id]
    : LayoutGrid;
  const activeFilters = [
    { key: "q", value: query, label: t("Search: {query}", { query }) },
    {
      key: "category",
      value: category,
      label: t(selectedCategory?.label || "All resources"),
    },
    {
      key: "type",
      value: type,
      label: t(typeLabels[type as keyof typeof typeLabels] || "All types"),
    },
    {
      key: "stage",
      value: stage,
      label: t(stageLabels[stage as Stage] || "All stages"),
    },
    {
      key: "track",
      value: track,
      label: track === "world" ? t("World models") : track.toUpperCase(),
    },
    { key: "saved", value: savedOnly ? "1" : "", label: t("Saved only") },
  ].filter(({ value }) => value && value !== "all");
  const clearFilters = () => {
    const next = new URLSearchParams(window.location.search);
    for (const key of resourceFilterKeys) next.delete(key);
    return applyFilters(next);
  };
  const lede =
    "Choose tools for each part of making a game. Browse guides, research and technical references in their own collections.";
  return (
    <main id="main-content" className="ix-page ix-resources">
      <title>{t("Resource library — GameMap")}</title>
      <meta name="description" content={t(lede)} />
      <IndexHero
        pillar="tools"
        title="Your next building block."
        lede={lede}
        count={collectionResources.length}
        countLabel={selectedCollection?.label || "All resources"}
      >
        <div className="heading-links">
          <Link to="/docs/evaluation/review-coverage/">
            {t("How we review sources")}
          </Link>
        </div>
      </IndexHero>
      <div className="ix-wrap">
        <div className="resource-search">
          <label className="ix-search">
            <Search size={18} aria-hidden="true" />
            <input
              id="resource-search"
              type="search"
              aria-label={t("Search resources")}
              aria-describedby="resource-search-scope"
              placeholder={t("Search tools, engines, topics…")}
              value={query}
              onChange={(event) => update("q", event.target.value)}
            />
          </label>
          <p className="resource-scope-note" id="resource-search-scope">
            {selectedScope
              ? t("Search scope is {collection}.", {
                  collection: t(selectedCollection?.label || "All resources"),
                })
              : t("Search covers all collections unless you select one.")}
          </p>
          <div className="resource-search-count" aria-live="polite">
            {!search.empty &&
              (filtered.length ? (
                <a href="#resource-results">
                  {t(
                    filtered.length === 1
                      ? "View 1 matching resource"
                      : "View {count} matching resources",
                    { count: filtered.length },
                  )}
                </a>
              ) : (
                t("No resources match these filters.")
              ))}
          </div>
          {otherCollectionMatches > 0 && (
            <button
              type="button"
              className="resource-expand-search"
              onClick={() => update("collection", "all")}
            >
              {t(
                otherCollectionMatches === 1
                  ? "Search all collections to see {count} more match"
                  : "Search all collections to see {count} more matches",
                { count: otherCollectionMatches },
              )}
            </button>
          )}
        </div>
        {hasRelated && (
          <section
            className="resource-related-results"
            aria-labelledby="resource-related-heading"
          >
            <h2 id="resource-related-heading">{t("Elsewhere on GameMap")}</h2>
            <div className="resource-related-groups">
              {testingMatches.length > 0 && (
                <div>
                  <h3>{t("Testing library")}</h3>
                  <ul>
                    {testingMatches.slice(0, 4).map((item) => (
                      <li key={item.url}>
                        <Link to={item.url}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                  {testingMatches.length > 4 && (
                    <Link
                      to={`${url.page("testing")}?${new URLSearchParams({ q: query })}`}
                    >
                      {t("See all testing results")}
                    </Link>
                  )}
                </div>
              )}
              {guideMatches.length > 0 && (
                <div>
                  <h3>{t("Production tools guide")}</h3>
                  <ul>
                    {guideMatches.map((topic) => (
                      <li key={topic}>
                        <Link
                          to={`${url.document("production/tools")}#${topic.toLowerCase()}`}
                        >
                          {topic}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
        <section
          className="resource-collection-section"
          aria-label={t("Browse the library")}
        >
          <div className="resource-collection-heading">
            <h2>{t("What do you need?")}</h2>
            <button
              className="resource-all-collections"
              aria-pressed={collection === "all"}
              onClick={() => update("collection", "all")}
            >
              {t("All resources")} <span>{resources.length}</span>
            </button>
          </div>
          <div
            className="resource-collections"
            role="group"
            aria-label={t("Library collection")}
          >
            {resourceCollections.map((item) => (
              <button
                key={item.id}
                aria-pressed={collection === item.id}
                onClick={() => update("collection", item.id)}
              >
                <span className="resource-collection-title">
                  {t(item.label)}
                  <strong>
                    {
                      resources.filter(
                        (resource) => resource.collection === item.id,
                      ).length
                    }
                  </strong>
                </span>
                <span className="resource-collection-description">
                  {t(item.description)}
                </span>
              </button>
            ))}
          </div>
          <p className="resource-collection-context">
            {t(
              selectedCollection?.description ||
                "Browse every tool, guide, research project and technical reference.",
            )}
          </p>
          <details className="resource-directory">
            <summary>
              {t("Browse the complete directory")}
              <span>{resources.length}</span>
            </summary>
            <div className="resource-directory-groups">
              {resourceCollections.map((item) => (
                <section key={item.id}>
                  <h3>{t(item.label)}</h3>
                  <ul>
                    {resources
                      .filter((resource) => resource.collection === item.id)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((resource) => (
                        <li
                          key={resource.id}
                          data-content-ref={entryById.get(resource.id)!.key}
                        >
                          <Link to={url.resource(resource.id)}>
                            {resource.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </section>
              ))}
            </div>
          </details>
        </section>
        <div className="ix-bar">
          <div className="ix-bar-selects">
            <span className="ix-bar-hint">
              <SlidersHorizontal size={14} aria-hidden="true" />
              {t("Narrow it down")}
            </span>
            <label className="ix-select ix-select-icon">
              <Tags size={14} aria-hidden="true" />
              <span className="sr-only">{t("Resource type")}</span>
              <select
                value={type}
                onChange={(event) => update("type", event.target.value)}
              >
                <option value="all">{t("All types")}</option>
                {availableTypes.map(([id, label]) => (
                  <option key={id} value={id}>
                    {t(label)}
                  </option>
                ))}
              </select>
            </label>
            <label className="ix-select ix-select-icon">
              <Route size={14} aria-hidden="true" />
              <span className="sr-only">{t("Development stage")}</span>
              <select
                value={stage}
                onChange={(event) => update("stage", event.target.value)}
              >
                <option value="all">{t("All stages")}</option>
                {Object.entries(stageLabels).map(([id, label]) => (
                  <option key={id} value={id}>
                    {t(label)}
                  </option>
                ))}
              </select>
            </label>
            <label className="ix-select ix-select-icon">
              <Compass size={14} aria-hidden="true" />
              <span className="sr-only">{t("Development track")}</span>
              <select
                value={track}
                onChange={(event) => update("track", event.target.value)}
              >
                <option value="all">{t("All tracks")}</option>
                <option value="2d">2D</option>
                <option value="3d">3D</option>
                <option value="world">{t("World models")}</option>
              </select>
            </label>
            <label className="ix-select ix-select-sort">
              <ArrowDownUp size={14} aria-hidden="true" />
              <span className="sr-only">{t("Sort resources")}</span>
              <select
                value={sort}
                onChange={(event) => update("sort", event.target.value)}
              >
                {!search.empty && (
                  <option value="relevance">{t("Best match")}</option>
                )}
                <option value="category">{t("Category, then name")}</option>
                <option value="name">{t("Name: A–Z")}</option>
              </select>
            </label>
          </div>
          <div className="ix-bar-actions">
            <button
              className="ix-saved"
              aria-pressed={savedOnly}
              onClick={() => update("saved", savedOnly ? "" : "1")}
            >
              <Bookmark
                size={16}
                fill={savedOnly ? "currentColor" : "none"}
                aria-hidden="true"
              />
              {t("Saved")}
              <span>{saved.length}</span>
            </button>
            {savedOnly && saved.length > 0 && (
              <button
                className="ix-icon-button"
                onClick={exportSaved}
                aria-label={t("Export saved collection as Markdown")}
              >
                <Download size={17} />
              </button>
            )}
          </div>
        </div>
        <div className="ix-cats">
          <div
            className="category-filters"
            role="group"
            aria-label={t("Resource category")}
          >
            <button
              aria-pressed={category === "all"}
              onClick={() => update("category", "all")}
            >
              <LayoutGrid size={15} aria-hidden="true" />
              {t("All tasks")}
              <span>{collectionResources.length}</span>
            </button>
            {availableCategories.map((item) => {
              const Glyph = categoryGlyphs[item.id];
              return (
                <button
                  key={item.id}
                  aria-pressed={category === item.id}
                  onClick={() => update("category", item.id)}
                  style={tone(item.id)}
                >
                  <Glyph size={15} aria-hidden="true" />
                  {t(item.label)}
                  <span>{counts[item.id]}</span>
                </button>
              );
            })}
          </div>
          <div
            className="ix-spectrum"
            aria-hidden="true"
            data-filtered={category !== "all" || undefined}
          >
            {availableCategories.map((item) => (
              <i
                key={item.id}
                style={{ ...tone(item.id), flexGrow: counts[item.id] }}
                data-active={category === item.id || undefined}
              />
            ))}
          </div>
        </div>
        {selectedCategory && (
          <p
            className="resource-category-context"
            style={tone(selectedCategory.id)}
          >
            <CategoryGlyph size={17} aria-hidden="true" />
            {t(selectedCategory.description)}
          </p>
        )}
        {activeFilters.length > 0 && (
          <div
            className="resource-active-filters"
            role="group"
            aria-label={t("Active filters")}
          >
            {activeFilters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => update(key, "")}
                aria-label={t("Remove filter: {filter}", { filter: label })}
              >
                {label}
                <X size={12} aria-hidden="true" />
              </button>
            ))}
            <button className="resource-clear-filters" onClick={clearFilters}>
              {t("Clear filters")}
            </button>
          </div>
        )}
        {notice && (
          <p className="inline-notice" role="status">
            {t(notice)}
          </p>
        )}
        <ResourceOverview
          resources={filtered}
          total={collectionResources.length}
          filters={{ category, type, stage, track }}
          onFilter={update}
        />
        <div className="ix-meta" id="resource-results" tabIndex={-1}>
          <span aria-live={query.trim() ? undefined : "polite"}>
            <strong>
              {t(
                filtered.length === 1
                  ? "{count} resource"
                  : "{count} resources",
                { count: filtered.length },
              )}
            </strong>
            {savedOnly ? t(" in your collection") : ""}
          </span>
          <span className="ix-meta-rule" aria-hidden="true" />
          <span>
            {[
              selectedCollection
                ? t(selectedCollection.label)
                : t("All resources"),
              category === "all"
                ? ""
                : t(categories.find((item) => item.id === category)!.label),
              type === "all"
                ? ""
                : t(typeLabels[type as keyof typeof typeLabels]),
              stage === "all" ? "" : t(stageLabels[stage as Stage]),
              track === "all"
                ? ""
                : track === "world"
                  ? t("World models")
                  : track.toUpperCase(),
            ]
              .filter(Boolean)
              .join(" · ") || t("All resources")}
          </span>
        </div>
        {filtered.length ? (
          <div className="resource-grid">
            {filtered.map((resource) => {
              const entry = entryById.get(resource.id)!,
                identity = identities[resource.id as keyof typeof identities],
                isSaved = saved.includes(resource.id),
                Glyph = categoryGlyphs[resource.category];
              return (
                <article
                  className="resource-tile"
                  key={resource.id}
                  data-content-ref={entry.key}
                  style={tone(resource.category)}
                >
                  <CatalogIcon icon={Glyph} className="resource-card-mark" />
                  <button
                    className="quiet-icon bookmark-button"
                    aria-label={t(isSaved ? "Unsave {title}" : "Save {title}", {
                      title: resource.name,
                    })}
                    aria-pressed={isSaved}
                    onClick={() => toggleSave(resource.id)}
                  >
                    <Bookmark
                      size={16}
                      fill={isSaved ? "currentColor" : "none"}
                    />
                  </button>
                  <span className="small-label">
                    {t(
                      categories.find(
                        (category) => category.id === resource.category,
                      )?.label || "",
                    )}
                  </span>
                  <SourceLanguage
                    english={entry.descriptionLanguage === "en"}
                  />
                  <h2>
                    <Link to={url.resource(resource.id)}>{resource.name}</Link>
                  </h2>
                  <ResourceAttribution identity={identity} />
                  <p
                    className="resource-description"
                    lang={entry.descriptionLanguage === "en" ? "en" : undefined}
                  >
                    {resource.summary}
                  </p>
                  <ResourceCardInfo
                    entry={entry}
                    showCollection={collection === "all"}
                    onTopic={(topic) => update("q", topic)}
                  />
                  <div className="resource-card-footer">
                    <button onClick={() => selectResource(resource.id)}>
                      {t("View details")}
                    </button>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("Visit {title} project", {
                        title: resource.name,
                      })}
                    >
                      {t("Open project")}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          !hasRelated && (
            <IndexEmpty
              title={
                savedOnly
                  ? "Your collection has room to grow."
                  : "No resources on this path."
              }
              body={
                savedOnly
                  ? "Save a few useful tools with the bookmark button, then find them here."
                  : "Try another search or loosen the filters a little."
              }
            >
              <button
                className="button button-secondary"
                onClick={clearFilters}
              >
                {t("Clear filters")}
              </button>
            </IndexEmpty>
          )
        )}
      </div>
      {active && (
        <ResourceDetail
          key={active.id}
          entry={entryById.get(active.id)!}
          identity={identities[active.id as keyof typeof identities]}
          demos={demos.filter((demo) => demo.data.resourceId === active.id)}
          saved={saved.includes(active.id)}
          onSave={() => toggleSave(active.id)}
          onClose={() => selectResource("")}
        />
      )}
    </main>
  );
}
