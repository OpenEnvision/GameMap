import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { ExampleCard } from "../components/example-card";
import { useClientQuery } from "../lib/client-query";
import { contentFor, sources } from "../../content/registry.server";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { ContentDocument } from "../components/content";
import { Link, useSiteI18n } from "../lib/i18n";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    examples: content.all("example"),
    foundations: content.all("foundation"),
    collections: content.all("collection"),
    media: sources.learningMedia,
  };
}
export default function Examples() {
  const { t } = useSiteI18n(),
    { examples, foundations, collections, media } =
      useLoaderData<typeof loader>(),
    [params, setParams] = useClientQuery();
  const query = params.get("q") || "",
    track = params.get("track") || "all";
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
  const games = examples.filter(
    (entry) =>
      (track === "all" || entry.data.track === track) &&
      matchesSearch(searchableText(entry), query),
  );
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
      <div className="results-meta">
        <span aria-live="polite">
          {t("{count} game examples", { count: games.length })}
        </span>
        <span>{t("Creator evidence · Playable builds · Project source")}</span>
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
