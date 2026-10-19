import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useLoaderData } from 'react-router';
import { content } from '../../content/registry.server';
import { matchesSearch } from '../../content/matching';
import { searchableText } from '../../content/search';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import ResourceIcon, {
  ResourceAttribution,
} from "../../src/components/ResourceIcon";
import { type Dimension, type ResourceType, type Stage } from "../../src/types";
import { categories, stageLabels, typeLabels } from "../lib/catalog";
import { ResourceDetail } from "../components/resource-detail";
import { url } from "../../content/site";
import { useClientQuery } from "../lib/client-query";

export function loader() { return { entries: content.all('resource'), demos: content.all('demo') }; }
export default function Resources() {
  const { entries, demos } = useLoaderData<typeof loader>();
  const resources = entries.map(entry => entry.data);
  const searchText = new Map(entries.map(entry => [entry.id, searchableText(entry)]));
  const [params, setParams, hydrated] = useClientQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
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
  const query = params.get("q") || "";
  const category = params.get("category") || "all";
  const type = params.get("type") || "all";
  const stage = params.get("stage") || "all";
  const track = params.get("track") || params.get("dimension") || "all";
  const savedOnly = params.get("saved") === "1";
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
        matchesSearch(searchText.get(resource.id) || '', query),
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
      "# My GameMap collection\n\n" +
      selected
        .map(
          (resource) =>
            `## [${resource.name}](${resource.url})\n\n${resource.summary}\n\n${resource.detail}\n`,
        )
        .join("\n");
    const url = URL.createObjectURL(
      new Blob([markdown], { type: "text/markdown;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "gamemap-collection.md";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <main id="main-content" className="site-main listing-page">
      <title>Resource library — GameMap</title>
      <meta
        name="description"
        content="Find coding agents, game engines, production tools, and world models with reviewed primary sources."
      />
      <header className="page-heading">
        <span className="eyebrow">THE RESOURCE LIBRARY</span>
        <h1>Your next building block.</h1>
        <p>
          Useful tools, frameworks, and ideas. Clear context about what each one
          actually does.
        </p>
      </header>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={20} />
          <input
            id="resource-search"
            aria-label="Search resources"
            placeholder="Search tools, engines, topics…"
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
          Saved<span>{saved.length}</span>
        </button>
        {savedOnly && saved.length > 0 && (
          <button
            className="quiet-icon"
            onClick={exportSaved}
            aria-label="Export saved collection as Markdown"
          >
            <Download size={19} />
          </button>
        )}
      </div>
      <div
        className="category-filters"
        role="group"
        aria-label="Resource category"
      >
        <button
          aria-pressed={category === "all"}
          onClick={() => update("category", "all")}
        >
          All resources<span>{resources.length}</span>
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            aria-pressed={category === item.id}
            onClick={() => update("category", item.id)}
          >
            {item.label}
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
          Narrow it down
        </span>
        <label>
          <span className="sr-only">Resource type</span>
          <select
            value={type}
            onChange={(event) => update("type", event.target.value)}
          >
            <option value="all">All types</option>
            {Object.entries(typeLabels).map(([id, label]) => (
              <option key={id} value={id as ResourceType}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Development stage</span>
          <select
            value={stage}
            onChange={(event) => update("stage", event.target.value)}
          >
            <option value="all">All stages</option>
            {Object.entries(stageLabels).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Development track</span>
          <select
            value={track}
            onChange={(event) => update("track", event.target.value)}
          >
            <option value="all">All tracks</option>
            <option value="2d">2D</option>
            <option value="3d">3D</option>
            <option value="world">World models</option>
          </select>
        </label>
        <label className="sort-filter">
          <span className="sr-only">Sort resources</span>
          <select
            value={params.get("sort") || "curated"}
            onChange={(event) => update("sort", event.target.value)}
          >
            <option value="curated">Curated order</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
      {notice && (
        <p className="inline-notice" role="status">
          {notice}
        </p>
      )}
      <div className="results-meta">
        <span aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
          {savedOnly ? " in your collection" : ""}
        </span>
        <Link to="/docs/catalog-review-coverage/">
          How we review sources
          <ArrowUpRight size={13} />
        </Link>
      </div>
      {filtered.length ? (
        <div className="resource-grid">
          {filtered.map((resource) => (
            <article
              className="resource-tile"
              key={resource.id}
              data-content-ref={`resource:${resource.id}`}
            >
              <div className="resource-card-top">
                <ResourceIcon resource={resource} size={42} />
                <button
                  className="quiet-icon bookmark-button"
                  aria-label={`${saved.includes(resource.id) ? "Unsave" : "Save"} ${resource.name}`}
                  aria-pressed={saved.includes(resource.id)}
                  onClick={() => toggleSave(resource.id)}
                >
                  <Bookmark
                    size={17}
                    fill={saved.includes(resource.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
              <span className="small-label">
                {
                  categories.find(
                    (category) => category.id === resource.category,
                  )?.label
                }
              </span>
              <h2>
                <Link to={url.resource(resource.id)}>{resource.name}</Link>
              </h2>
              <ResourceAttribution resource={resource} />
              <p className="resource-description">{resource.summary}</p>
              <div className="resource-tags">
                <span>{typeLabels[resource.type]}</span>
                <span>
                  {resource.dimensions.length === 3
                    ? "All tracks"
                    : resource.dimensions
                        .map((track) =>
                          track === "world"
                            ? "World models"
                            : track.toUpperCase(),
                        )
                        .join(" / ")}
                </span>
              </div>
              <div className="resource-card-footer">
                <button onClick={() => selectResource(resource.id)}>
                  View details
                  <ArrowRight size={15} />
                </button>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${resource.name} project`}
                >
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={28} />
          <h2>
            {savedOnly
              ? "Your collection has room to grow."
              : "No resources on this path."}
          </h2>
          <p>
            {savedOnly
              ? "Save a few useful tools with the bookmark button, then find them here."
              : "Try another search or loosen the filters a little."}
          </p>
          <button
            className="button button-secondary"
            onClick={() => setParams({})}
          >
            Browse all resources
          </button>
        </div>
      )}
      {active && (
        <ResourceDetail
          key={active.id}
          entry={entries.find(entry => entry.id === active.id)!}
          demos={demos.filter(demo => demo.data.resourceId === active.id)}
          saved={saved.includes(active.id)}
          onSave={() => toggleSave(active.id)}
          onClose={() => selectResource("")}
        />
      )}
    </main>
  );
}
