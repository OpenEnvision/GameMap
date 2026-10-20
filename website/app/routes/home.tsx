import { useEffect } from "react";
import {
  useLocation,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { Link, useNavigate, useSiteI18n } from "../lib/i18n";
import { contentFor, sources } from "../../content/registry.server";
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
import { categories, publicAsset } from "../lib/catalog";
import { ExampleCard } from "../components/example-card";

const categoryIcons = [Code2, Boxes, Gamepad2, Layers3, Sparkles, Orbit];
const featuredIds = [
  "moonlight-mayhem-codex",
  "opengame-marvel-platformer",
  "tron-exonix-claude",
];
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  const featured = featuredIds.map((id) => content.require("example", id).data);
  return {
    featured,
    spotlight: featured[0],
    media: Object.fromEntries(
      featured.map((game) => [game.id, sources.learningMedia[game.id]]),
    ),
    categories: Object.fromEntries(
      categories.map((category) => [
        category.id,
        content
          .all("resource")
          .filter((entry) => entry.data.category === category.id).length,
      ]),
    ),
  };
}

export default function Home() {
  const { t } = useSiteI18n();
  const {
    featured,
    spotlight,
    media: learningMedia,
    categories: categoryCounts,
  } = useLoaderData<typeof loader>();
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
      <title>{t("GameMap — Find your next playable idea")}</title>
      <meta
        name="description"
        content={t(
          "The tools, working examples, and practical knowledge to build games with AI. Less wandering. More making.",
        )}
      />
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="status-dot" />
            {t("A FIELD GUIDE FOR GAME MAKERS")}
          </span>
          <h1>
            {t("Small ideas.")}
            <br />
            {t("Playable worlds")}
            <span className="brand-period">.</span>
          </h1>
          <p>
            {t(
              "The tools, working examples, and practical knowledge to build games with AI. Less wandering. More making.",
            )}
          </p>
          <form
            className="hero-search"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              navigate(
                "/explore/?q=" +
                  encodeURIComponent(String(form.get("q") || "")),
              );
            }}
          >
            <Search size={20} />
            <input
              name="q"
              aria-label={t("Search all game development content")}
              placeholder={t("What would you like to build?")}
            />
            <button
              type="submit"
              aria-label={t("Search all content from home")}
            >
              <ArrowRight size={20} />
            </button>
          </form>
          <div className="hero-actions">
            <Link className="button button-primary" to="/resources/">
              {t("Explore the resources")}
              <ArrowRight size={16} />
            </Link>
            <Link className="button button-text" to="/docs/practical-guide/">
              {t("Find a starting point")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-spotlight">
          <div className="spotlight-label">
            <span>
              <Compass size={15} />
              {t("IN THE FIELD")}
            </span>
            <span>
              {spotlight.track.toUpperCase()} / {t("CREATOR BUILD")}
            </span>
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
              {t("Play the game")}
              <ArrowUpRight size={15} />
            </span>
          </a>
          <div className="spotlight-caption">
            <span className="small-label">
              {t("A PLAYABLE STARTING POINT")}
            </span>
            <h2>{spotlight.title}</h2>
            <p>{t("Play it. Read the build story. Open the source.")}</p>
            <a href={spotlight.tutorial.url} target="_blank" rel="noreferrer">
              {t("See how it was made")}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
      <section className="browse-section">
        <div className="section-top">
          <div>
            <span className="eyebrow">{t("CHOOSE YOUR DIRECTION")}</span>
            <h2>{t("A whole toolkit, mapped out.")}</h2>
          </div>
          <Link className="inline-link" to="/resources/">
            {t("Browse everything")}
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
                  <strong>{t(category.label)}</strong>
                  <small>{t(category.description)}</small>
                </span>
                <span className="category-count">
                  {categoryCounts[category.id]}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="featured-section">
        <div className="section-top">
          <div>
            <span className="eyebrow">{t("LEARN FROM SOMETHING REAL")}</span>
            <h2>{t("Made with AI. Ready to explore.")}</h2>
            <p>
              {t(
                "Playable games with build stories and project source. Attribution stays with the creators.",
              )}
            </p>
          </div>
          <Link className="inline-link" to="/examples/">
            {t("All game examples")}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="example-grid">
          {featured.map((game) => (
            <ExampleCard
              game={game}
              media={learningMedia[game.id]}
              compact
              key={game.id}
            />
          ))}
        </div>
      </section>
      <section className="home-reading">
        <div>
          <span className="reading-icon">
            <BookOpen size={25} />
          </span>
          <span className="eyebrow">{t("LESS GUESSWORK, MORE CONTEXT")}</span>
          <h2>{t("There is a guide for that.")}</h2>
          <p>
            {t(
              "From your first playable loop to asset pipelines and world models. Read the notes without leaving the atlas.",
            )}
          </p>
          <Link className="inline-link" to="/docs/">
            {t("Open the reading room")}
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
                <strong>{t(title)}</strong>
                <p>{t(description)}</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
