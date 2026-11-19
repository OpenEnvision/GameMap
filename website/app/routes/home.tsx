import { useEffect } from "react";
import {
  useLocation,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { Link, useNavigate, useSiteI18n } from "../lib/i18n";
import { contentFor, sources, url } from "../../content/registry.server";
import { retiredDocumentTarget } from "../../content/site";
import { categories, publicAsset } from "../lib/catalog";
import { pillars } from "../lib/pillars";
import { seeded } from "../lib/motion";
import { communityEnabled } from "../lib/community";
import {
  exampleGameFacets,
  exampleGames,
  gameStats,
  researchLedger,
} from "../lib/collection-stats";
import { useOpenAtlasSearch } from "../lib/search-state";
import { PlanetHero } from "../components/home/planet-hero";
import { HomeStory } from "../components/home/story";
import { GameWall, type WallGame } from "../components/home/game-wall";
import { AtlasBento } from "../components/home/bento";
import { ToolMarquee, type MarqueeTool } from "../components/home/marquee";

/** The "Play" chapter shows the first of these builds that has a screenshot. */
const storyPlayIds = [
  "dragons-reach-claude",
  "long-wind-claude",
  "moonlight-mayhem-codex",
];
/** The wall shows a fixed, seeded shuffle so prerendered HTML is stable. */
const WALL_SIZE = 80;
const WALL_SEED = 0x6a3e;
const buildToolIds = [
  "claude-code",
  "codex",
  "gemini-cli",
  "godot-engine",
  "unity-engine",
  "threejs",
  "blender",
  "meshy",
  "pixellab",
];
const marqueeRows = [
  [
    "codex",
    "claude-code",
    "gemini-cli",
    "deepseek-agent-integrations",
    "cline",
    "openhands",
    "godot-engine",
    "unity-engine",
    "unreal-engine",
    "threejs",
    "phaser",
    "blender",
  ],
  [
    "pixellab",
    "meshy",
    "scenario",
    "hunyuan3d-2",
    "triposr",
    "elevenlabs-sfx",
    "stable-audio-open",
    "playwright-mcp",
    "convai",
    "react-three-fiber",
    "genie",
    "marble",
  ],
];
/** Documents move between topic folders, so the loader follows the site's
 *  redirect table to each guide's current address. */
const startGuide = "/docs/practical-guide/";
const contributingGuide = "/docs/contributing/";
/** A chip names the product, not the page: "Godot Engine · Official
 *  Documentation" and "Genie: Generative Interactive Environments" read as
 *  "Godot Engine" and "Genie" (the full title stays on the link). */
const productName = (title: string) =>
  title.split(/\s+·\s+|:\s+/)[0]?.trim() || title;

export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  const total = (kind: Parameters<typeof content.all>[0]) =>
    content.all(kind).length;
  const media = sources.learningMedia;
  const examples = content.all("example");
  const exampleById = new Map(examples.map((entry) => [entry.id, entry]));
  // Every example with a reviewed screenshot, shuffled deterministically.
  const random = seeded(WALL_SEED);
  const pool = examples.filter((entry) => media[entry.id]);
  for (let index = pool.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [pool[index], pool[swap]] = [pool[swap], pool[index]];
  }
  // The wall renders plain anchors, so record addresses carry the site base.
  const base = import.meta.env.BASE_URL;
  const wall: WallGame[] = pool.slice(0, WALL_SIZE).map((entry) => ({
    id: entry.id,
    title: entry.title,
    src: publicAsset(media[entry.id].src),
    alt: media[entry.id].alt,
    url: base + entry.url.replace(/^\/+/, ""),
  }));
  // Every figure is counted the way the page it links to counts it.
  const games = exampleGames(content);
  const gameFigures = gameStats(exampleGameFacets(games));
  const counts: Record<string, number> = {
    "/examples/": gameFigures.total,
    "/resources/": total("resource"),
    "/agents/": total("agent"),
    "/testing/": total("testing"),
    "/papers/": total("paper"),
    "/research/": researchLedger(content).length,
    // One logical guide per English/Chinese pair, in either locale.
    "/docs/": new Set(
      content.all("document").map((entry) => entry.id.replace(/^zh\//, "")),
    ).size,
  };
  const pillarCounts = Object.fromEntries(
    pillars.map((pillar) => [
      pillar.id,
      pillar.links.reduce((sum, link) => sum + (counts[link.path] ?? 0), 0),
    ]),
  );
  const resources = new Map(
    content.all("resource").map((entry) => [entry.id, entry]),
  );
  const tool = (id: string): MarqueeTool | null => {
    const entry = resources.get(id);
    const identity = sources.identities[id as keyof typeof sources.identities];
    if (!entry || !identity?.asset) return null;
    return {
      id,
      name: entry.title,
      short: productName(entry.title),
      url: url.resource(id),
      logo: identity.asset,
      background: identity.background === "dark" ? "dark" : "light",
      wide: Boolean(identity.wide),
      category: entry.data.category,
    };
  };
  const tools = (ids: readonly string[]) =>
    ids.map(tool).filter((value): value is MarqueeTool => value !== null);
  const playCandidates = [
    ...storyPlayIds.map((id) => exampleById.get(id)),
    ...pool,
    ...examples,
  ].filter(
    (entry, index, list): entry is (typeof examples)[number] =>
      Boolean(entry && media[entry.id]) &&
      list.findIndex((item) => item?.id === entry?.id) === index,
  );
  const play = (playCandidates[0] ?? examples[0]).data;
  const companion = playCandidates[1]?.data;
  const secondary = playCandidates[2]?.data;
  return {
    docs: {
      start: retiredDocumentTarget(startGuide) ?? startGuide,
      contributing:
        retiredDocumentTarget(contributingGuide) ?? contributingGuide,
    },
    wall,
    wallStats: gameFigures,
    counts,
    pillarCounts,
    stats: [
      { path: "/examples/", label: "Game examples" },
      { path: "/resources/", label: "Resources" },
      { path: "/papers/", label: "Papers" },
      { path: "/research/", label: "Repository research" },
      { path: "/agents/", label: "Agent toolkit" },
    ]
      .map((stat) => ({ ...stat, count: counts[stat.path] }))
      .filter((stat) => stat.count > 0)
      .slice(0, 4),
    categoryCounts: Object.fromEntries(
      categories.map((category) => [
        category.id,
        content
          .all("resource")
          .filter((entry) => entry.data.category === category.id).length,
      ]),
    ),
    story: {
      tools: tools(buildToolIds),
      play: {
        title: play.title,
        track: play.track,
        engine: play.engine,
        summary: play.description,
        media: media[play.id],
        companion: companion
          ? {
              title: companion.title,
              track: companion.track,
              engine: companion.engine,
              media: media[companion.id],
            }
          : undefined,
        secondary: secondary
          ? {
              title: secondary.title,
              track: secondary.track,
              engine: secondary.engine,
              media: media[secondary.id],
            }
          : undefined,
      },
    },
    marquee: marqueeRows.map(tools),
  };
}

export default function Home() {
  const { t, locale } = useSiteI18n();
  // Chinese headlines close with full-width punctuation and need no space
  // between two translated segments; Latin text keeps its period and spaces.
  const zh = locale === "zh";
  const openSearch = useOpenAtlasSearch();
  const data = useLoaderData<typeof loader>();
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

      {/* 1. Hero: a living planet under a sunrise. */}
      <section className="hm-hero" aria-labelledby="hm-hero-title">
        <PlanetHero />
        <div className="hm-hero-copy">
          <p className="kicker hm-hero-kicker">
            {t("A FIELD GUIDE FOR GAME MAKERS")}
          </p>
          <h1 id="hm-hero-title" className="hm-hero-title">
            {t("Small ideas.")}
            <br />
            <em>
              {t("Playable worlds")}
              {zh ? "\u3002" : null}
            </em>
            {zh ? null : <span className="brand-period">.</span>}
          </h1>
          <p className="hm-hero-lede">
            {t(
              "The tools, working examples, and practical knowledge to build games with AI. Less wandering. More making.",
            )}
          </p>
          <form
            className="hero-search hm-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              openSearch(String(form.get("q") || ""));
            }}
          >
            <Search size={19} aria-hidden="true" />
            <input
              name="q"
              aria-label={t("Search all game development content")}
              placeholder={t("What would you like to build?")}
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label={t("Search all content from home")}
            >
              <ArrowRight size={19} />
            </button>
          </form>
          <div className="hm-hero-actions">
            <Link className="button button-primary" to="/resources/">
              {t("Explore the resources")}
              <ArrowRight size={16} />
            </Link>
            <Link className="button button-secondary" to={data.docs.start}>
              {t("Find a starting point")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hm-hero-foot">
          <nav className="hm-stats" aria-label={t("The atlas at a glance")}>
            {data.stats.map((stat) => (
              <Link key={stat.path} to={stat.path} className="hm-stat">
                <strong>{stat.count}</strong>
                <span>
                  {t(stat.label)}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </nav>
          <span className="hm-scroll-cue" aria-hidden="true">
            <span>{t("Scroll to explore")}</span>
            <i />
          </span>
        </div>
      </section>

      {/* 2. The story: idea, build, play. */}
      <HomeStory
        counts={data.counts}
        tools={data.story.tools}
        play={data.story.play}
      />

      {/* 3. The wall of worlds: the whole collection behind one number. */}
      <GameWall games={data.wall} stats={data.wallStats} />

      {/* 4. The map: four pillars and six directions. */}
      <AtlasBento
        pillarCounts={data.pillarCounts}
        counts={data.counts}
        categoryCounts={data.categoryCounts}
      />

      {/* 5. The toolkit in motion. */}
      <section className="hm-toolkit" aria-labelledby="hm-toolkit-title">
        <div className="hm-toolkit-head">
          <div>
            <p className="kicker">{t("IN THE TOOLKIT")}</p>
            <h2 id="hm-toolkit-title" className="hm-title">
              <span>{t("Pick a tool.")}</span>
              {zh ? null : " "}
              <em>{t("Start making.")}</em>
            </h2>
          </div>
          <Link className="inline-link" to="/resources/">
            {data.counts["/resources/"]
              ? t("Browse all {count} resources", {
                  count: data.counts["/resources/"],
                })
              : t("Browse all resources")}
            <ArrowRight size={16} />
          </Link>
        </div>
        <ToolMarquee rows={data.marquee} />
      </section>

      {/* 6. Closing band. */}
      <section className="hm-closing" aria-labelledby="hm-closing-title">
        <div className="hm-closing-inner">
          <p className="kicker">{t("YOUR TURN")}</p>
          <h2 id="hm-closing-title" className="hm-title">
            {t("Made something playable?")}
            <br />
            <em>{t("Put it on the map.")}</em>
          </h2>
          {/* Submissions need the community API; static builds point to the
              catalog and to the contribution guide instead. */}
          {communityEnabled ? (
            <>
              <p>
                {t(
                  "Share a playable link, the build story and the source. Other makers play it, rate it and learn from it.",
                )}
              </p>
              <div className="hm-closing-actions">
                <Link className="button button-primary" to="/submit/">
                  {t("Submit your game")}
                  <ArrowUpRight size={16} />
                </Link>
                <Link className="button button-secondary" to="/examples/">
                  {t("All game examples")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </>
          ) : (
            <>
              <p>
                {t(
                  "See what other makers shipped, then add yours with a playable link, the build story and the source. The contribution guide shows how.",
                )}
              </p>
              <div className="hm-closing-actions">
                <Link className="button button-primary" to="/examples/">
                  {t("Browse all games")}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  className="button button-secondary"
                  to={data.docs.contributing}
                >
                  {t("Contribute")}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
