import { useMemo } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowUpRight, ChevronDown, Layers3, Search } from "lucide-react";
import { ExampleCard } from "../components/example-card";
import { useClientQuery } from "../lib/client-query";
import { contentFor, sources } from "../../content/registry.server";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { ContentDocument } from "../components/content";
import { Link, useSiteI18n } from "../lib/i18n";
import { gameEngineFamilies, gameEngineFamilyIds } from "../lib/game-engines";
import ResourceIcon from "../../src/components/ResourceIcon";
import {
  gameAccessFilterIds,
  gameAccessOptions,
  hasCompleteProjectSource,
} from "../../content/game-platforms";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    examples: content.all("example"),
    foundations: content.all("foundation"),
    collections: content.all("collection"),
    media: sources.learningMedia,
    platforms: ["steamworks", "itch-io", "epic-games-store", "gog", "crazygames"]
      .map((id) => content.require("resource", id)),
  };
}
export default function Examples() {
  const { t } = useSiteI18n(),
    { examples, foundations, collections, media, platforms } =
      useLoaderData<typeof loader>(),
    [params, setParams] = useClientQuery();
  const { engineEntries, engineOptions } = useMemo(() => {
    const engineEntries = examples.map((entry) => ({
      entry,
      families: gameEngineFamilyIds(entry.data.engine),
      accessIds: gameAccessFilterIds(entry.data),
      searchText: searchableText(entry),
    }));
    const usedFamilies = new Set(engineEntries.flatMap(({ families }) => families));
    return {
      engineEntries,
      engineOptions: gameEngineFamilies.filter(({ id }) => usedFamilies.has(id)),
    };
  }, [examples]);
  const query = params.get("q") || "",
    requestedTrack = params.get("track") || "all",
    track = requestedTrack === "2d" || requestedTrack === "3d" ? requestedTrack : "all",
    requestedEngine = params.get("engine") || "all",
    engine = engineOptions.some(({ id }) => id === requestedEngine)
      ? requestedEngine
      : "all",
    access = gameAccessOptions.find(({ id }) => id === params.get("access"))?.id || "all",
    sourceScope = params.get("source") === "complete-project" ? "complete-project" : "all";
  const engineLabel = t(
    engineOptions.find(({ id }) => id === engine)?.label || "All engines",
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
  const games = engineEntries
    .filter(
      ({ entry, families, accessIds, searchText }) =>
        (track === "all" || entry.data.track === track) &&
        (engine === "all" || families.some((id) => id === engine)) &&
        (access === "all" || accessIds.includes(access)) &&
        (sourceScope === "all" || hasCompleteProjectSource(entry.data.source)) &&
        matchesSearch(searchText, query),
    )
    .map(({ entry }) => entry);
  return (
    <main id="main-content" className="site-main listing-page">
      <title>{t("Game examples — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Play a game, follow the creator’s process, and explore the project behind it.",
        )}
      />
      <header className="page-heading">
        <span className="eyebrow">{t("LEARN BY EXPLORING")}</span>
        <h1>{t("Real games. Open starting points.")}</h1>
        <p>
          {t(
            "Play a game, follow the creator’s process, and explore the project behind it.",
          )}
        </p>
        <div className="heading-links">
          <Link to="/docs/tutorials-and-demos/">
            {t("Read the complete guide")}
            <ArrowUpRight size={14} />
          </Link>
          <Link to="/docs/coding-agent-game-code/">
            {t("Agents, skills & game code")}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>
      <section className="publishing-platforms" aria-label={t("Game stores and publishing platforms")}>
        <div className="platforms-heading">
          <div>
            <span className="eyebrow">{t("DISCOVER & PUBLISH")}</span>
            <h2>{t("Find your next platform.")}</h2>
            <p>{t("Browse games and find the official publishing tools for your own release.")}</p>
          </div>
          <Link to="/docs/publishing-platforms/">{t("Publishing guide")}<ArrowUpRight size={13} /></Link>
        </div>
        <div className="platforms-grid">
          {platforms.map((entry) => {
            const browseUrl = entry.data.access?.demo.url || entry.data.url;
            return (
              <article className="platform-resource" key={entry.id} data-content-ref={entry.key}>
                <ResourceIcon resource={entry.data} size={26} />
                <div>
                  <h3><a href={browseUrl} target="_blank" rel="noreferrer">
                    {entry.data.name}<ArrowUpRight size={12} />
                  </a></h3>
                  <a className="platform-publish-link" href={entry.data.url} target="_blank" rel="noreferrer">
                    {t("Publish a game")}<ArrowUpRight size={11} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={19} />
          <input
            aria-label={t("Search game examples")}
            placeholder={t("Find a game, engine, or AI workflow…")}
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
        <div className="example-engine-control" data-active={engine !== "all"}>
          <span className="example-engine-size" aria-hidden="true">{engineLabel}</span>
          <span className="example-engine-icon" aria-hidden="true">
            <Layers3 size={15} strokeWidth={1.7} />
          </span>
          <select
            className="example-engine-filter"
            aria-label={t("Game engine or renderer")}
            title={engineLabel}
            value={engine}
            onChange={(event) => update("engine", event.target.value)}
          >
            <option value="all">{t("All engines")}</option>
            {engineOptions.map(({ id, label }) => (
              <option key={id} value={id}>
                {t(label)}
              </option>
            ))}
          </select>
          <ChevronDown className="example-engine-chevron" size={14} aria-hidden="true" />
        </div>
        <div className="segmented-control" aria-label={t("Game dimension")}>
          {[
            ["all", "All games"],
            ["2d", "2D"],
            ["3d", "3D"],
          ].map(([id, label]) => (
            <button
              key={id}
              aria-pressed={track === id}
              onClick={() => update("track", id)}
            >
              {t(label)}
            </button>
          ))}
        </div>
      </div>
      <div className="secondary-filters example-access-filters" role="group" aria-label={t("Play and source filters")}>
        <label>
          <span>{t("Play or run access")}</span>
          <select aria-label={t("Play or run access")} value={access}
            aria-describedby="example-access-help"
            onChange={(event) => update("access", event.target.value)}>
            <option value="all">{t("All access types")}</option>
            {gameAccessOptions.map(({ id, label }) => (
              <option key={id} value={id}>{t(label)}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{t("Source scope")}</span>
          <select aria-label={t("Source scope")} value={sourceScope}
            aria-describedby="example-source-help"
            onChange={(event) => update("source", event.target.value)}>
            <option value="all">{t("All source scopes")}</option>
            <option value="complete-project">{t("Complete project source only")}</option>
          </select>
        </label>
      </div>
      <div className="example-filter-help">
        <p id="example-access-help">{t("Access filters include additional creator-linked editions.")}</p>
        <p id="example-source-help">{t("Complete project source describes the files, not the license or playtest coverage.")}</p>
      </div>
      <div className="results-meta">
        <span aria-live="polite">
          {t("{count} game examples", { count: games.length })}
        </span>
        <span>{t("Creator evidence · Play & run links · Project source")}</span>
      </div>
      {games.length ? (
        <div className="example-grid">
          {games.map((entry) => (
            <ExampleCard
              key={entry.key}
              game={entry.data}
              descriptionLanguage={entry.descriptionLanguage}
              media={media[entry.id]}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>{t("No games found.")}</h2>
          <p>{t("Try another title, engine, or AI tool.")}</p>
          <button
            className="button button-secondary"
            onClick={() => setParams({})}
          >
            {t("Clear filters")}
          </button>
        </div>
      )}
      <section className="foundation-section">
        <div className="section-top">
          <div>
            <span className="eyebrow">{t("THE FOUNDATIONS STILL MATTER")}</span>
            <h2>{t("Good first projects, with or without AI.")}</h2>
            <p>{t("Official engine examples, not AI-authorship claims.")}</p>
          </div>
        </div>
        <div className="foundation-grid">
          {foundations.map((entry) => (
            <article key={entry.key} data-content-ref={entry.key}>
              <span className="small-label">{entry.data.engine}</span>
              <h3>
                <Link to={entry.url}>{entry.title}</Link>
              </h3>
              <p lang={entry.descriptionLanguage === "en" ? "en" : undefined}>
                {entry.description}
              </p>
              <div className="example-links">
                <a
                  href={entry.data.tutorial.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Tutorial")}
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href={entry.data.source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Source")}
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="content-index-section">
        <div className="section-top">
          <div>
            <h2>{t("Community collections")}</h2>
            <p>
              {t("Discover more projects in community-curated collections.")}
            </p>
          </div>
        </div>
        <div className="content-grid community-collections">
          {collections.map((entry) => (
            <ContentDocument key={entry.key} entry={entry} heading="h3" />
          ))}
        </div>
      </section>
    </main>
  );
}
