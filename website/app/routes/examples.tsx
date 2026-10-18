import { Link } from "react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { learningPaths, foundationPaths } from "../lib/catalog";
import { ExampleCard } from "../components/example-card";
import { useClientQuery } from "../lib/client-query";

export default function Examples() {
  const [params, setParams] = useClientQuery();
  const query = params.get("q") || "";
  const track = params.get("track") || "all";
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
  const games = learningPaths.filter(
    (game) =>
      (track === "all" || game.track === track) &&
      `${game.title} ${game.engine} ${game.aiUse} ${game.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <main id="main-content" className="site-main listing-page">
      <title>Game examples — GameMap</title>
      <meta
        name="description"
        content="Explore playable AI-assisted games, creator build stories, and complete project source."
      />
      <header className="page-heading">
        <span className="eyebrow">LEARN BY EXPLORING</span>
        <h1>Real games. Open starting points.</h1>
        <p>
          Play a game, follow the creator’s process, and explore the project
          behind it.
        </p>
        <div className="heading-links">
          <Link to="/docs/tutorials-and-demos/">
            Read the complete guide
            <ArrowUpRight size={14} />
          </Link>
          <Link to="/docs/coding-agent-game-code/">
            Agents, skills & game code
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={19} />
          <input
            aria-label="Search game examples"
            placeholder="Find a game, engine, or AI workflow…"
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
        <div className="segmented-control" aria-label="Game dimension">
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
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="results-meta">
        <span aria-live="polite">{games.length} game examples</span>
        <span>Creator evidence · Playable builds · Project source</span>
      </div>
      {games.length ? (
        <div className="example-grid">
          {games.map((game) => (
            <ExampleCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No games found.</h2>
          <p>Try another title, engine, or AI tool.</p>
          <button
            className="button button-secondary"
            onClick={() => setParams({})}
          >
            Clear filters
          </button>
        </div>
      )}
      <section className="foundation-section">
        <div className="section-top">
          <div>
            <span className="eyebrow">THE FOUNDATIONS STILL MATTER</span>
            <h2>Good first projects, with or without AI.</h2>
            <p>Official engine examples, not AI-authorship claims.</p>
          </div>
        </div>
        <div className="foundation-grid">
          {foundationPaths.map((game) => (
            <article key={game.id}>
              <span className="small-label">{game.engine}</span>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="example-links">
                <a href={game.tutorial.url} target="_blank" rel="noreferrer">
                  Tutorial
                  <ArrowUpRight size={13} />
                </a>
                <a href={game.source.url} target="_blank" rel="noreferrer">
                  Source
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <p className="reading-note">
        AI contributions follow creator records. Study steps are GameMap
        editorial guidance, not claims of independent reproduction.
      </p>
    </main>
  );
}
