import { useEffect, useState } from "react";
import {
  useLocation,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link, useNavigate, useSiteI18n, SourceLanguage } from "../lib/i18n";
import { contentFor, sources } from "../../content/registry.server";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import ResourceIcon, {
  ResourceAttribution,
} from "../../src/components/ResourceIcon";
import { type Dimension, type Stage } from "../../src/types";
import { categories, stageLabels, typeLabels } from "../lib/catalog";
import { ResourceDetail } from "../components/resource-detail";
import { url } from "../../content/site";
import { useClientQuery } from "../lib/client-query";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    entries: content.all("resource"),
    demos: content.all("demo"),
    identities: sources.identities,
  };
}
export default function Resources() {
  const { t } = useSiteI18n(),
    { entries, demos, identities } = useLoaderData<typeof loader>();
  const resources = entries.map((entry) => entry.data),
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
    category = params.get("category") || "all",
    type = params.get("type") || "all",
    stage = params.get("stage") || "all",
    track = params.get("track") || params.get("dimension") || "all",
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
    .sort((a, b) =>
      params.get("sort") === "name" ? a.name.localeCompare(b.name) : 0,
    );
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
  return (
    <main id="main-content" className="site-main listing-page">
      <title>{t("Resource library — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Useful tools, frameworks, and ideas. Clear context about what each one actually does.",
        )}
      />
      <header className="page-heading">
        <span className="eyebrow">{t("THE RESOURCE LIBRARY")}</span>
        <h1>{t("Your next building block.")}</h1>
        <p>
          {t(
            "Useful tools, frameworks, and ideas. Clear context about what each one actually does.",
          )}
        </p>
      </header>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={20} />
          <input
            id="resource-search"
            aria-label={t("Search resources")}
            placeholder={t("Search tools, engines, topics…")}
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
        <button
          className={`button collection-button ${savedOnly ? "is-active" : ""}`}
          aria-pressed={savedOnly}
          onClick={() => update("saved", savedOnly ? "" : "1")}
        >
          <Bookmark size={17} />
          {t("Saved")}
          <span>{saved.length}</span>
        </button>
        {savedOnly && saved.length > 0 && (
          <button
            className="quiet-icon"
            onClick={exportSaved}
            aria-label={t("Export saved collection as Markdown")}
          >
            <Download size={19} />
          </button>
        )}
      </div>
      <div
        className="category-filters"
        role="group"
        aria-label={t("Resource category")}
      >
        <button
          aria-pressed={category === "all"}
          onClick={() => update("category", "all")}
        >
          {t("All resources")}
          <span>{resources.length}</span>
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            aria-pressed={category === item.id}
            onClick={() => update("category", item.id)}
          >
            {t(item.label)}
            <span>
              {
                resources.filter((resource) => resource.category === item.id)
                  .length
              }
            </span>
          </button>
        ))}
      </div>
      <div className="secondary-filters">
        <span>
          <SlidersHorizontal size={15} />
          {t("Narrow it down")}
        </span>
        <label>
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
        <label>
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
        <label>
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
        <label className="sort-filter">
          <span className="sr-only">{t("Sort resources")}</span>
          <select
            value={params.get("sort") || "curated"}
            onChange={(event) => update("sort", event.target.value)}
          >
            <option value="curated">{t("Curated order")}</option>
            <option value="name">{t("Name: A–Z")}</option>
          </select>
        </label>
      </div>
      {notice && (
        <p className="inline-notice" role="status">
          {t(notice)}
        </p>
      )}
      <div className="results-meta">
        <span aria-live="polite">
          {t(filtered.length === 1 ? "{count} resource" : "{count} resources", {
            count: filtered.length,
          })}
          {savedOnly ? t(" in your collection") : ""}
        </span>
        <Link to="/docs/catalog-review-coverage/">
          {t("How we review sources")}
          <ArrowUpRight size={13} />
        </Link>
      </div>
      {filtered.length ? (
        <div className="resource-grid">
          {filtered.map((resource) => {
            const entry = entries.find((entry) => entry.id === resource.id)!;
            return (
              <article
                className="resource-tile"
                key={resource.id}
                data-content-ref={entry.key}
              >
                <div className="resource-card-top">
                  <ResourceIcon
                    resource={resource}
                    identity={
                      identities[resource.id as keyof typeof identities]
                    }
                    size={42}
                  />
                  <button
                    className="quiet-icon bookmark-button"
                    aria-label={t(
                      saved.includes(resource.id)
                        ? "Unsave {title}"
                        : "Save {title}",
                      { title: resource.name },
                    )}
                    aria-pressed={saved.includes(resource.id)}
                    onClick={() => toggleSave(resource.id)}
                  >
                    <Bookmark
                      size={17}
                      fill={
                        saved.includes(resource.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>
                <span className="small-label">
                  {t(
                    categories.find(
                      (category) => category.id === resource.category,
                    )?.label || "",
                  )}
                </span>
                <SourceLanguage english={entry.descriptionLanguage === "en"} />
                <h2>
                  <Link to={url.resource(resource.id)}>{resource.name}</Link>
                </h2>
                <ResourceAttribution
                  identity={identities[resource.id as keyof typeof identities]}
                />
                <p
                  className="resource-description"
                  lang={entry.descriptionLanguage === "en" ? "en" : undefined}
                >
                  {resource.summary}
                </p>
                <div className="resource-tags">
                  <span>{t(typeLabels[resource.type])}</span>
                  <span>
                    {resource.dimensions.length === 3
                      ? t("All tracks")
                      : resource.dimensions
                          .map((track) =>
                            track === "world"
                              ? t("World models")
                              : track.toUpperCase(),
                          )
                          .join(" / ")}
                  </span>
                </div>
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
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={28} />
          <h2>
            {t(
              savedOnly
                ? "Your collection has room to grow."
                : "No resources on this path.",
            )}
          </h2>
          <p>
            {t(
              savedOnly
                ? "Save a few useful tools with the bookmark button, then find them here."
                : "Try another search or loosen the filters a little.",
            )}
          </p>
          <button
            className="button button-secondary"
            onClick={() => setParams({})}
          >
            {t("Browse all resources")}
          </button>
        </div>
      )}
      {active && (
        <ResourceDetail
          key={active.id}
          entry={entries.find((entry) => entry.id === active.id)!}
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
