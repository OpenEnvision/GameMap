import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowUpRight, Heart, Play } from "lucide-react";
import { Link, useSiteI18n } from "../../lib/i18n";
import { publicAsset } from "../../lib/catalog";
import { pillars, type Pillar } from "../../lib/pillars";
import { matches, watchMedia } from "../../lib/motion";
import type { LearningMedia } from "../../../src/data/learningMedia";
import type { MarqueeTool } from "./marquee";

/** Pinned chapters need motion, room and a pointer-sized screen; everything
 *  else reads as stacked chapters with their own picture. */
const LIVE_STORY =
  "(prefers-reduced-motion: no-preference) and (min-width: 960px) and (min-height: 640px)";

type Chapter = {
  pillar: Pillar["id"];
  step: string;
  title: string;
  body: string;
};
const chapters: readonly Chapter[] = [
  {
    pillar: "learn",
    step: "Idea",
    title: "Find the smallest thing worth playing.",
    body: "Field-tested guides and step-by-step paths turn a vague idea into a first playable loop, before you write a line of code.",
  },
  {
    pillar: "tools",
    step: "Build",
    title: "Pick tools that actually ship games.",
    body: "Coding agents, engines, MCP bridges and asset pipelines: curated, compared and linked to working code.",
  },
  {
    pillar: "games",
    step: "Play",
    title: "Learn from games people finished.",
    body: "Real, playable games, each with its build story and source. Play first, then read how it was made.",
  },
];

const round = (value: number) => Math.round(value * 100) / 100;

/** A wireframe globe, seen slightly from above, with the core loop in orbit. */
const GLOBE = {
  latitudes: [-50, -20, 10, 40].map((lat) => {
    const radians = (lat * Math.PI) / 180;
    return {
      cy: round(-120 * Math.sin(radians) * 0.92),
      rx: round(120 * Math.cos(radians)),
      ry: round(120 * Math.cos(radians) * 0.36),
    };
  }),
  meridians: [0, 36, 72, 108, 144].map((lon) =>
    round(Math.abs(120 * Math.cos((lon * Math.PI) / 180))),
  ),
};

function IdeaScene() {
  const { t } = useSiteI18n();
  return (
    <div className="hm-scene-canvas hm-idea">
      <svg
        className="hm-idea-globe"
        viewBox="-180 -160 360 320"
        width="360"
        height="320"
      >
        <defs>
          <radialGradient id="hm-idea-fill" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="0.6" stopColor="var(--signal)" stopOpacity="0.06" />
            <stop offset="1" stopColor="var(--signal)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="120" className="hm-idea-sphere" />
        {GLOBE.latitudes.map((line) => (
          <ellipse
            key={line.cy}
            cy={line.cy}
            rx={line.rx}
            ry={line.ry}
            className="hm-idea-line"
          />
        ))}
        {GLOBE.meridians.map((rx, index) => (
          <ellipse key={index} rx={rx} ry="120" className="hm-idea-line" />
        ))}
        <g transform="rotate(-14)">
          <ellipse rx="168" ry="50" className="hm-idea-orbit" />
          <circle cx="-168" cy="0" r="5" className="hm-idea-dot" />
          <circle cx="60" cy="-46.7" r="5" className="hm-idea-dot" />
          <circle cx="110" cy="37.8" r="5" className="hm-idea-dot is-hot" />
        </g>
      </svg>
      <span
        className="hm-idea-node"
        style={{ "--x": "6%", "--y": "56%" } as CSSProperties}
      >
        {t("Explore")}
      </span>
      <span
        className="hm-idea-node"
        style={{ "--x": "64%", "--y": "18%" } as CSSProperties}
      >
        {t("Collect")}
      </span>
      <span
        className="hm-idea-node is-hot"
        style={{ "--x": "70%", "--y": "57%" } as CSSProperties}
      >
        {t("Escape")}
      </span>
      <div className="hm-idea-prompt">
        <span className="hm-idea-prompt-label">{t("Core loop")}</span>
        <p>
          {t("One room, three guards, a raccoon after the golden sardine.")}
          <i className="hm-caret" />
        </p>
      </div>
    </div>
  );
}

function BuildScene({ tools }: { tools: readonly MarqueeTool[] }) {
  const { t } = useSiteI18n();
  const nodes = tools.slice(0, 8).map((tool, index, list) => {
    const angle = ((-90 + 22.5 + (index * 360) / list.length) * Math.PI) / 180;
    return {
      tool,
      x: round(50 + Math.cos(angle) * 38),
      y: round(50 + Math.sin(angle) * 37),
    };
  });
  return (
    <div className="hm-scene-canvas hm-build">
      <svg
        className="hm-build-links"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <ellipse cx="50" cy="50" rx="38" ry="37" className="hm-build-ring" />
        <ellipse cx="50" cy="50" rx="22" ry="21" className="hm-build-ring" />
        {nodes.map(({ tool, x, y }) => (
          <line key={tool.id} x1="50" y1="50" x2={x} y2={y} />
        ))}
      </svg>
      <span className="hm-build-core">
        <svg viewBox="0 0 72 72" width="34" height="34">
          <path
            fill="#e53a32"
            d="M31 3 48.3 13 35.5 20.4 31 17.8 13.5 27.9v20.2L31 58.2l17.5-10.1V43H31V30.5h30v23.9L31 71.7 1 54.4V20.3L31 3Z"
          />
          <path
            fill="#9e1218"
            d="m1 20.3 12.5 7.6v20.2L31 58.2v13.5L1 54.4V20.3Z"
          />
          <path fill="#e53a32" d="m61 1 8 4.6v9.2l-8 4.6-8-4.6V5.6L61 1Z" />
        </svg>
        <b>{t("Your game")}</b>
      </span>
      {nodes.map(({ tool, x, y }, index) => (
        <span
          key={tool.id}
          className="hm-build-node"
          style={
            { "--x": `${x}%`, "--y": `${y}%`, "--i": index } as CSSProperties
          }
        >
          <span className="hm-logo" data-background={tool.background}>
            <img
              src={publicAsset(tool.logo)}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
            />
          </span>
          <small>{tool.name}</small>
        </span>
      ))}
    </div>
  );
}

export type StoryPlay = {
  title: string;
  track: "2d" | "3d";
  engine: string;
  media?: LearningMedia;
};

function PlayScene({ play }: { play: StoryPlay }) {
  const { t } = useSiteI18n();
  return (
    <div className="hm-scene-canvas hm-play">
      <div className="hm-play-screen">
        {play.media && (
          <img
            src={publicAsset(play.media.src)}
            alt=""
            width={play.media.width ?? 1280}
            height={play.media.height ?? 720}
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="hm-play-hud">
          <span className="hm-play-hearts">
            <Heart size={14} fill="currentColor" />
            <Heart size={14} fill="currentColor" />
            <Heart size={14} />
          </span>
          <span className="hm-play-score">02 940</span>
        </span>
        <span className="hm-play-cta">
          <Play size={15} fill="currentColor" />
          {t("Play the game")}
        </span>
      </div>
      <span className="hm-play-caption">
        <b>{play.title}</b>
        <span>
          {play.track.toUpperCase()} / {play.engine}
        </span>
      </span>
    </div>
  );
}

export function HomeStory({
  counts,
  tools,
  play,
}: {
  counts: Record<string, number>;
  tools: readonly MarqueeTool[];
  play: StoryPlay;
}) {
  const { t } = useSiteI18n();
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => setLive(matches(LIVE_STORY));
    update();
    return watchMedia(LIVE_STORY, update);
  }, []);
  useEffect(() => {
    const section = ref.current;
    if (!live || !section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.chapter));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    section
      .querySelectorAll("[data-chapter]")
      .forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [live]);

  const scenes = [
    <IdeaScene key="idea" />,
    <BuildScene key="build" tools={tools} />,
    <PlayScene key="play" play={play} />,
  ];

  return (
    <section
      ref={ref}
      className="hm-story"
      data-mode={live ? "live" : "stacked"}
      data-active={active}
      aria-labelledby="hm-story-title"
    >
      <header className="hm-story-head">
        <p className="kicker">{t("FROM IDEA TO RELEASE")}</p>
        <h2 id="hm-story-title" className="hm-title">
          {t("From a spark")}
          <br />
          <em>{t("to something playable.")}</em>
        </h2>
        <p className="hm-story-lede">
          {t(
            "Three moves, one map. Every step links to the real guides, tools and games behind it.",
          )}
        </p>
      </header>
      <div className="hm-story-grid">
        <ol className="hm-story-rail" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <li key={chapter.step} data-on={active === index}>
              <span>0{index + 1}</span>
              {t(chapter.step)}
            </li>
          ))}
        </ol>
        {chapters.map((chapter, index) => {
          const pillar = pillars.find((item) => item.id === chapter.pillar)!;
          return (
            <Fragment key={chapter.step}>
              <article
                className="hm-chapter"
                data-chapter={index}
                data-on={active === index}
                style={{ "--row": index + 1 } as CSSProperties}
              >
                <p className="hm-chapter-step">
                  <span>0{index + 1}</span>
                  {t(chapter.step)}
                  <span className="hm-chapter-pillar">{t(pillar.label)}</span>
                </p>
                <h3>{t(chapter.title)}</h3>
                <p className="hm-chapter-body">{t(chapter.body)}</p>
                <ul className="hm-chapter-links">
                  {pillar.links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path}>
                        <span>{t(link.title)}</span>
                        {counts[link.path] ? <b>{counts[link.path]}</b> : null}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
              <figure
                className="hm-scene"
                data-scene={chapter.pillar}
                data-on={active === index}
                aria-hidden="true"
                style={{ "--row": index + 1 } as CSSProperties}
              >
                {scenes[index]}
              </figure>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
