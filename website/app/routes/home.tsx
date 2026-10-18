import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Code2,
  Compass,
  Gamepad2,
  Layers3,
  Orbit,
  Search,
  Sparkles,
} from "lucide-react";
import {
  categories,
  learningPaths,
  learningMedia,
  publicAsset,
  resources,
} from "../lib/catalog";
import { ExampleCard } from "../components/example-card";
import { manifest } from "../lib/docs";

const categoryIcons = [Code2, Boxes, Gamepad2, Layers3, Sparkles, Orbit];
const featuredIds = [
  "moonlight-mayhem-codex",
  "opengame-marvel-platformer",
  "tron-exonix-claude",
];
const featured = featuredIds
  .map((id) => learningPaths.find((game) => game.id === id)!)
  .filter(Boolean);
const spotlight =
  learningPaths.find((game) => game.id === "moonlight-mayhem-codex") ||
  featured[0];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const view = query.get("view");
    const routes: Record<string, string> = {
      library: "/resources/",
      saved: "/resources/?saved=1",
      learn: "/examples/",
      test: "/testing/",
      notes: "/docs/",
    };
    if (view && routes[view]) {
      query.delete("view");
      if (view === "saved") query.set("saved", "1");
      navigate(
        {
          pathname: routes[view].split("?")[0],
          search: query.toString(),
          hash: location.hash,
        },
        { replace: true },
      );
    } else if (location.hash.startsWith("#resource/"))
      navigate("/resources/" + location.hash, { replace: true });
  }, [location.search, location.hash, navigate]);
  return (
    <main id="main-content" className="site-main home-page">
      <title>GameMap — Find your next playable idea</title>
      <meta
        name="description"
        content="A curated atlas of AI game-development tools, playable examples, and practical guides. Find a starting point for your next game."
      />
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="status-dot" />A FIELD GUIDE FOR GAME MAKERS
          </span>
          <h1>
            Small ideas.
            <br />
            Playable worlds<span className="brand-period">.</span>
          </h1>
          <p>
            The tools, working examples, and practical knowledge to build games
            with AI. Less wandering. More making.
          </p>
          <form
            className="hero-search"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              navigate(
                "/resources/?q=" +
                  encodeURIComponent(String(form.get("q") || "")),
              );
            }}
          >
            <Search size={20} />
            <input
              name="q"
              aria-label="Search game development resources"
              placeholder="What would you like to build?"
            />
            <button type="submit" aria-label="Search resources">
              <ArrowRight size={20} />
            </button>
          </form>
          <div className="hero-actions">
            <Link className="button button-primary" to="/resources/">
              Explore the resources
              <ArrowRight size={16} />
            </Link>
            <Link className="button button-text" to="/docs/practical-guide/">
              Find a starting point
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hero-proof">
            <span>
              <strong>{resources.length}</strong> curated resources
            </span>
            <span>
              <strong>{learningPaths.length}</strong> game examples
            </span>
            <span>
              <strong>{manifest.length}</strong> guides & notes
            </span>
          </div>
        </div>
        <div className="hero-spotlight">
          <div className="spotlight-label">
            <span>
              <Compass size={15} />
              IN THE FIELD
            </span>
            <span>{spotlight.track.toUpperCase()} / CREATOR BUILD</span>
          </div>
          <a
            className="spotlight-image"
            href={spotlight.demo.url}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={publicAsset(learningMedia[spotlight.id].src)}
              alt={learningMedia[spotlight.id].alt}
              width={1280}
              height={720}
              fetchPriority="high"
            />
            <span>
              Yes, this is a real game.
              <ArrowUpRight size={15} />
            </span>
          </a>
          <div className="spotlight-caption">
            <span className="small-label">A PLAYABLE STARTING POINT</span>
            <h2>{spotlight.title}</h2>
            <p>Play it. Read the build story. Open the source.</p>
            <a href={spotlight.tutorial.url} target="_blank" rel="noreferrer">
              See how it was made
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="spotlight-bottom">
            <span className="tiny-dot" />
            Creator-linked AI evidence · Project source included
          </div>
        </div>
      </section>
      <section className="browse-section">
        <div className="section-top">
          <div>
            <span className="eyebrow">CHOOSE YOUR DIRECTION</span>
            <h2>A whole toolkit, mapped out.</h2>
          </div>
          <Link className="inline-link" to="/resources/">
            Browse everything
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const Icon = categoryIcons[index];
            return (
              <Link
                key={category.id}
                to={"/resources/?category=" + category.id}
                className="category-tile"
              >
                <span className="category-symbol">
                  <Icon size={23} strokeWidth={1.6} />
                </span>
                <span>
                  <strong>{category.label}</strong>
                  <small>{category.description}</small>
                </span>
                <span className="category-count">
                  {
                    resources.filter(
                      (resource) => resource.category === category.id,
                    ).length
                  }
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="featured-section">
        <div className="section-top">
          <div>
            <span className="eyebrow">LEARN FROM SOMETHING REAL</span>
            <h2>Made with AI. Ready to explore.</h2>
            <p>
              Playable games with build stories and project source. Attribution
              stays with the creators.
            </p>
          </div>
          <Link className="inline-link" to="/examples/">
            All game examples
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="example-grid">
          {featured.map((game) => (
            <ExampleCard game={game} compact key={game.id} />
          ))}
        </div>
      </section>
      <section className="home-reading">
        <div>
          <span className="reading-icon">
            <BookOpen size={25} />
          </span>
          <span className="eyebrow">LESS GUESSWORK, MORE CONTEXT</span>
          <h2>There is a guide for that.</h2>
          <p>
            From your first playable loop to asset pipelines and world models.
            Read the notes without leaving the atlas.
          </p>
          <Link className="inline-link" to="/docs/">
            Open the reading room
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="reading-links">
          {[
            [
              "practical-guide",
              "01",
              "Start with a working game loop",
              "Define the smallest thing worth playing.",
            ],
            [
              "agents-notes",
              "02",
              "Understand your coding toolkit",
              "Models, harnesses, skills, and engine bridges.",
            ],
            [
              "world-model-notes",
              "03",
              "Know what keeps the world in sync",
              "Code, engine state, and neural rendering.",
            ],
          ].map(([slug, number, title, description]) => (
            <Link key={slug} to={"/docs/" + slug + "/"}>
              <span>{number}</span>
              <div>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
