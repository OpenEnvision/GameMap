import { useEffect, useState, type CSSProperties } from "react";
import {
  useLocation,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import {
  ArrowDownUp,
  ArrowRight,
  ArrowUpRight,
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
import { contentFor, sources } from "../../content/registry.server";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { ResourceAttribution } from "../../src/components/ResourceIcon";
import { type Dimension, type Stage } from "../../src/types";
import {
  categories,
  categoryGlyphs,
  stageLabels,
  typeLabels,
} from "../lib/catalog";
import { ResourceDetail, ResourceMark } from "../components/resource-detail";
import { url } from "../../content/site";
import { useClientQuery } from "../lib/client-query";
import { IndexEmpty, IndexHero } from "../components/catalog-browser";
import { ResourceOverview } from "../components/resource-overview";
import { ResourceCardInfo } from "../components/resource-card-info";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    entries: content.all("resource"),
    demos: content.all("demo"),
    identities: sources.identities,
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
    { entries, demos, identities } = useLoaderData<typeof loader>();
  const resources = entries.map((entry) => entry.data),
    entryById = new Map(entries.map((entry) => [entry.id, entry])),
    searchText = new Map(
      entries.map((entry) => [entry.id, searchableText(entry)]),
    );
  const [params, setParams, hydrated] = useClientQuery(),
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
    sort = supportedFilter(params.get("sort"), ["curated", "name"], "curated"),
    savedOnly = params.get("saved") === "1";
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (key === "track") next.delete("dimension");
        if (!value || value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  const filtered = resources
    .filter(
      (resource) =>
        (category === "all" || resource.category === category) &&
        (type === "all" || resource.type === type) &&
        (stage === "all" || resource.stages.includes(stage as Stage)) &&
        (track === "all" || resource.dimensions.includes(track as Dimension)) &&
        (!savedOnly || saved.includes(resource.id)) &&
        matchesSearch(searchText.get(resource.id) || "", query),
    )
    .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : 0));
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
      resources.filter((resource) => resource.category === item.id).length,
    ]),
  );
  const tone = (id: string) =>
    ({ "--tone": `var(--tax-${id})` }) as CSSProperties;
  const selectedCategory = categories.find((item) => item.id === category);
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
  const clearFilters = () =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        for (const key of [
          "q",
          "category",
          "type",
          "stage",
          "track",
          "dimension",
          "saved",
        ])
          next.delete(key);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  const lede =
    "Find coding agents, game engines, asset pipelines and world models. Explore what they do, where they fit and how to get started.";
  return (
    <main id="main-content" className="ix-page ix-resources">
      <title>{t("Resource library — GameMap")}</title>
      <meta name="description" content={t(lede)} />
      <IndexHero
        pillar="tools"
        kicker="THE RESOURCE LIBRARY"
        title="Your next building block."
        lede={lede}
        count={resources.length}
        countLabel="curated resources"
      >
        <div className="heading-links">
          <Link to="/docs/evaluation/review-coverage/">
            {t("How we review sources")}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </IndexHero>
      <div className="ix-wrap">
        <div className="ix-bar">
          <label className="ix-search">
            <Search size={18} aria-hidden="true" />
            <input
              id="resource-search"
              aria-label={t("Search resources")}
              placeholder={t("Search tools, engines, topics…")}
              value={query}
              onChange={(event) => update("q", event.target.value)}
            />
          </label>
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
                {Object.entries(typeLabels).map(([id, label]) => (
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
                <option value="curated">{t("Curated order")}</option>
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
              {t("All resources")}
              <span>{resources.length}</span>
            </button>
            {categories.map((item) => {
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
            {categories.map((item) => (
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
          total={resources.length}
          filters={{ category, type, stage, track }}
          onFilter={update}
        />
        <div className="ix-meta">
          <span aria-live="polite">
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
            {filtered.map((resource, index) => {
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
                  <div
                    className="resource-card-top"
                    data-logo={identity.asset ? undefined : "none"}
                  >
                    <span className="ix-tile-index" aria-hidden="true">
                      {String(index + 1).padStart(3, "0")}
                    </span>
                    <ResourceMark
                      resource={resource}
                      identity={identity}
                      size={56}
                    />
                    <button
                      className="quiet-icon bookmark-button"
                      aria-label={t(
                        isSaved ? "Unsave {title}" : "Save {title}",
                        {
                          title: resource.name,
                        },
                      )}
                      aria-pressed={isSaved}
                      onClick={() => toggleSave(resource.id)}
                    >
                      <Bookmark
                        size={16}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <span className="small-label">
                    <Glyph size={12} aria-hidden="true" />
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
                    onTopic={(topic) => update("q", topic)}
                  />
                  <div className="resource-card-footer">
                    <button onClick={() => selectResource(resource.id)}>
                      {t("View details")}
                      <ArrowRight size={15} />
                    </button>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("Visit {title} project", {
                        title: resource.name,
                      })}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
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
            <button className="button button-secondary" onClick={clearFilters}>
              {t("Browse all resources")}
            </button>
          </IndexEmpty>
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
