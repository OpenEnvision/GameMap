import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { ArrowDownRight, ArrowUpRight, Code2, Play } from "lucide-react";
import { Link, useSiteI18n } from "../../lib/i18n";
import { publicAsset } from "../../lib/catalog";
import { pillars, type Pillar } from "../../lib/pillars";
import { REDUCED_MOTION, matches, watchMedia } from "../../lib/motion";
import type { LearningMedia } from "../../../src/data/learningMedia";
import type { MarqueeTool } from "./marquee";

/** Pinned chapters need motion, room and a pointer-sized screen; everything
 *  else reads as stacked chapters with their own picture. home.css lays the
 *  chapters out at their pinned height under the same query, so static HTML
 *  already has the height of the pinned story and hydration only pins the
 *  stage (no layout shift). Keep the two queries identical. */
const LIVE_STORY =
  "(prefers-reduced-motion: no-preference) and (min-width: 960px) and (min-height: 640px)";

type Chapter = {
  pillar: Pillar["id"];
  step: string;
  /** What the pillar count on the story route counts. */
  unit: string;
  title: string;
  body: string;
};
const chapters: readonly Chapter[] = [
  {
    pillar: "learn",
    step: "Idea",
    unit: "guides",
    title: "Find the smallest thing worth playing.",
    body: "Field-tested guides and step-by-step paths turn a vague idea into a first playable loop, before you write a line of code.",
  },
  {
    pillar: "tools",
    step: "Build",
    unit: "tools",
    title: "Pick tools that actually ship games.",
    body: "Coding agents, engines, MCP bridges and asset pipelines: curated, compared and linked to working code.",
  },
  {
    pillar: "games",
    step: "Play",
    unit: "games",
    title: "Learn from games people finished.",
    body: "Real, playable games, each with its build story and source. Play first, then read how it was made.",
  },
];
const chapterId = (chapter: Chapter) => `story-${chapter.step.toLowerCase()}`;

const round = (value: number) => Math.round(value * 100) / 100;

/** Precision wireframe globe + tilted core-loop orbit, all derived in one
 *  shared viewBox (-220 -150 440 300) so callout pills stay locked to their
 *  orbital dots across every screen ratio. */
const IDEA_R = 98;
const IDEA_ORBIT_RX = 156;
const IDEA_ORBIT_RY = 44;
const IDEA_TILT_DEG = -15;
const IDEA_TILT = (IDEA_TILT_DEG * Math.PI) / 180;

function ideaOrbitPoint(deg: number) {
  const rad = (deg * Math.PI) / 180;
  const ex = IDEA_ORBIT_RX * Math.cos(rad);
  const ey = IDEA_ORBIT_RY * Math.sin(rad);
  return {
    x: round(ex * Math.cos(IDEA_TILT) - ey * Math.sin(IDEA_TILT)),
    y: round(ex * Math.sin(IDEA_TILT) + ey * Math.cos(IDEA_TILT)),
  };
}

const GLOBE = {
  latitudes: [-54, -27, 0, 27, 54].map((lat) => {
    const radians = (lat * Math.PI) / 180;
    const rx = round(IDEA_R * Math.cos(radians));
    return {
      lat,
      cy: round(-IDEA_R * Math.sin(radians) * 0.94),
      rx,
      ry: round(rx * 0.34),
    };
  }),
  meridians: [0, 36, 72, 108, 144].map((lon) =>
    round(Math.abs(IDEA_R * Math.cos((lon * Math.PI) / 180))),
  ),
  ticks: Array.from({ length: 24 }, (_, index) => {
    const angle = (index * 15 * Math.PI) / 180;
    const major = index % 6 === 0;
    const inner = 112;
    const outer = major ? 119 : 115.5;
    return {
      major,
      x1: round(Math.cos(angle) * inner),
      y1: round(Math.sin(angle) * inner),
      x2: round(Math.cos(angle) * outer),
      y2: round(Math.sin(angle) * outer),
    };
  }),
};

const IDEA_STOPS = (
  [
    {
      index: "01",
      label: "Explore",
      deg: 154,
      leaderEndY: 96,
      pillY: 98,
      anchor: "below",
      hot: false,
    },
    {
      index: "02",
      label: "Collect",
      deg: -36,
      leaderEndY: -100,
      pillY: -102,
      anchor: "above",
      hot: false,
    },
    {
      index: "03",
      label: "Escape",
      deg: 40,
      leaderEndY: 66,
      pillY: 68,
      anchor: "below",
      hot: true,
    },
  ] as const
).map((stop) => {
  const pt = ideaOrbitPoint(stop.deg);
  return {
    ...stop,
    x: pt.x,
    y: pt.y,
    leaderStartY: round(pt.y + (stop.anchor === "above" ? -7 : 7)),
    pctX: `${round(((pt.x + 220) / 440) * 100)}%`,
    pctY: `${round(((stop.pillY + 150) / 300) * 100)}%`,
  };
});

/** Radial blueprint ticks for the Build hub (viewBox 0 0 400 400). */
const BUILD_TICKS = Array.from({ length: 32 }, (_, index) => {
  const angle = (index * 11.25 * Math.PI) / 180;
  const major = index % 4 === 0;
  const inner = 148;
  const outer = major ? 156 : 152;
  return {
    major,
    x1: round(200 + Math.cos(angle) * inner),
    y1: round(200 + Math.sin(angle) * inner),
    x2: round(200 + Math.cos(angle) * outer),
    y2: round(200 + Math.sin(angle) * outer),
  };
});

/** Cartographic elevation chart geometry (viewBox 0 0 600 160). Waypoints sit
 *  centered over the three equal columns below (x = 100, 300, 500) and climb
 *  along an exponential C1-continuous arc echoing the real growth from spark
 *  to playable world (64 → 177 → 1274). */
const ROUTE = {
  datumY: 150,
  stops: [
    { x: 100, y: 128, plumbTop: 140 },
    { x: 300, y: 100, plumbTop: 113 },
    { x: 500, y: 34, plumbTop: 51 },
  ] as const,
  leadIn: "M 16 132 C 48 132 74 130 100 128",
  main: "M 100 128 C 174 122 236 116 300 100 C 364 84 434 46 500 34",
  leadOut: "M 500 34 C 536 27 562 25 584 26",
  area: "M 100 128 C 174 122 236 116 300 100 C 364 84 434 46 500 34 L 500 150 L 100 150 Z",
  ghostUpper: "M 16 140 C 206 116 392 64 584 14",
  ghostLower: "M 16 144 C 216 138 398 108 584 54",
  crosshairs: [
    { x: 200, y: 118 },
    { x: 400, y: 68 },
  ] as const,
  ticks: Array.from({ length: 23 }, (_, i) => 25 + i * 25),
};

function IdeaScene() {
  const { t } = useSiteI18n();
  return (
    <div className="hm-scene-canvas hm-idea">
      <div className="hm-idea-stage">
        <svg
          className="hm-idea-globe"
          viewBox="-220 -150 440 300"
          width="440"
          height="300"
        >
          <defs>
            <radialGradient id="hm-idea-aura" cx="54%" cy="46%" r="54%">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.18" />
              <stop
                offset="0.55"
                stopColor="var(--accent)"
                stopOpacity="0.04"
              />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hm-idea-fill" cx="66%" cy="24%" r="76%">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.28" />
              <stop
                offset="0.45"
                stopColor="var(--signal)"
                stopOpacity="0.07"
              />
              <stop offset="1" stopColor="var(--paper)" stopOpacity="0.32" />
            </radialGradient>
            <linearGradient
              id="hm-idea-rim"
              x1="20%"
              y1="0%"
              x2="100%"
              y2="80%"
            >
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.88" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Soft ambient glow behind the sphere */}
          <circle r="138" fill="url(#hm-idea-aura)" />

          {/* Outer precision degree ring */}
          <circle r="112" className="hm-idea-compass" />
          {GLOBE.ticks.map((tick, index) => (
            <line
              key={index}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              className={tick.major ? "hm-idea-tick is-major" : "hm-idea-tick"}
            />
          ))}

          {/* Back half of the tilted orbit: passes behind the globe */}
          <g transform={`rotate(${IDEA_TILT_DEG})`}>
            <path
              d={`M ${IDEA_ORBIT_RX} 0 A ${IDEA_ORBIT_RX} ${IDEA_ORBIT_RY} 0 0 0 ${-IDEA_ORBIT_RX} 0`}
              className="hm-idea-orbit-back"
            />
          </g>

          {/* 3D wireframe globe */}
          <circle r={IDEA_R} className="hm-idea-base" />
          <circle r={IDEA_R} className="hm-idea-sphere" />
          {GLOBE.latitudes.map((line) => (
            <ellipse
              key={line.lat}
              cy={line.cy}
              rx={line.rx}
              ry={line.ry}
              className={
                line.lat === 0 ? "hm-idea-line is-equator" : "hm-idea-line"
              }
            />
          ))}
          {GLOBE.meridians.map((rx, index) => (
            <ellipse
              key={index}
              rx={rx}
              ry={IDEA_R}
              className="hm-idea-line is-meridian"
            />
          ))}
          {/* Sunrise rim highlight echoing the hero planet */}
          <path
            d="M 22 -95.5 A 98 98 0 0 1 94.5 -26"
            className="hm-idea-rim"
            stroke="url(#hm-idea-rim)"
          />

          {/* Front half of the tilted orbit: sweeps across the front */}
          <g transform={`rotate(${IDEA_TILT_DEG})`}>
            <path
              d={`M ${-IDEA_ORBIT_RX} 0 A ${IDEA_ORBIT_RX} ${IDEA_ORBIT_RY} 0 0 0 ${IDEA_ORBIT_RX} 0`}
              className="hm-idea-orbit-glow"
            />
            <path
              d={`M ${-IDEA_ORBIT_RX} 0 A ${IDEA_ORBIT_RX} ${IDEA_ORBIT_RY} 0 0 0 ${IDEA_ORBIT_RX} 0`}
              className="hm-idea-orbit"
            />
            <path d="M -4 40.5 L 2 44 L -4 47.5" className="hm-idea-chevron" />
          </g>

          {/* Precision leaders & sculpted orbit nodes */}
          {IDEA_STOPS.map((stop) => (
            <g
              key={stop.label}
              className={stop.hot ? "hm-idea-stop is-hot" : "hm-idea-stop"}
            >
              <line
                x1={stop.x}
                y1={stop.leaderStartY}
                x2={stop.x}
                y2={stop.leaderEndY}
                className="hm-idea-leader"
              />
              <circle
                cx={stop.x}
                cy={stop.leaderEndY}
                r="1.8"
                className="hm-idea-leader-tip"
              />
              {stop.hot ? (
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="11"
                  className="hm-idea-dot-halo"
                />
              ) : (
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="8"
                  className="hm-idea-dot-ring"
                />
              )}
              <circle
                cx={stop.x}
                cy={stop.y}
                r={stop.hot ? 4.8 : 4.2}
                className={stop.hot ? "hm-idea-dot is-hot" : "hm-idea-dot"}
              />
            </g>
          ))}
        </svg>

        {IDEA_STOPS.map((stop) => (
          <span
            key={stop.label}
            className={`hm-idea-node${stop.hot ? " is-hot" : ""}`}
            data-anchor={stop.anchor}
            style={{ "--x": stop.pctX, "--y": stop.pctY } as CSSProperties}
          >
            <i>{stop.index}</i>
            {t(stop.label)}
          </span>
        ))}
      </div>

      <div className="hm-idea-prompt">
        <div className="hm-idea-prompt-head">
          <span className="hm-idea-prompt-label">{t("Core loop")}</span>
          <span className="hm-idea-loop-steps" aria-hidden="true">
            <i />
            <i />
            <i className="is-hot" />
          </span>
        </div>
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
  const radius = 144;
  const nodes = tools.slice(0, 8).map((tool, index, list) => {
    const angle = ((-90 + 22.5 + (index * 360) / list.length) * Math.PI) / 180;
    const cx = round(200 + Math.cos(angle) * radius);
    const cy = round(200 + Math.sin(angle) * radius);
    const innerX = round(200 + Math.cos(angle) * 60);
    const innerY = round(200 + Math.sin(angle) * 60);
    return {
      tool,
      cx,
      cy,
      innerX,
      innerY,
      x: round(cx / 4),
      y: round(cy / 4),
    };
  });
  return (
    <div className="hm-scene-canvas hm-build">
      <div className="hm-build-stage">
        <svg
          className="hm-build-links"
          viewBox="0 0 400 400"
          width="400"
          height="400"
        >
          <defs>
            <radialGradient id="hm-build-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop
                offset="0.52"
                stopColor="var(--accent)"
                stopOpacity="0.05"
              />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="118" fill="url(#hm-build-aura)" />
          <circle
            cx="200"
            cy="200"
            r={radius}
            className="hm-build-ring is-outer"
          />
          <circle cx="200" cy="200" r="98" className="hm-build-ring is-mid" />
          <circle cx="200" cy="200" r="60" className="hm-build-ring is-core" />
          {BUILD_TICKS.map((tick, index) => (
            <line
              key={index}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              className={
                tick.major ? "hm-build-tick is-major" : "hm-build-tick"
              }
            />
          ))}
          {nodes.map(({ tool, cx, cy, innerX, innerY }, index) => (
            <g key={tool.id}>
              <line
                x1={cx}
                y1={cy}
                x2="200"
                y2="200"
                className="hm-build-spoke"
              />
              <line
                x1={cx}
                y1={cy}
                x2="200"
                y2="200"
                pathLength={100}
                className="hm-build-pulse"
                style={{ "--i": index } as CSSProperties}
              />
              <circle
                cx={innerX}
                cy={innerY}
                r="2.4"
                className="hm-build-port"
              />
            </g>
          ))}
        </svg>
        <span className="hm-build-core">
          <svg viewBox="0 0 72 72" width="32" height="32">
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
            <span className="hm-logo-frame">
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
            </span>
            <small>{tool.short}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

export type StoryPlay = {
  title: string;
  track: "2d" | "3d";
  engine: string;
  media?: LearningMedia;
};

/** The three chapters drawn as one cartographic trajectory card: a smooth
 *  ascent curve from the first spark to a playable world, tethered by plumb
 *  lines to three baseline-aligned interactive stops. */
function StoryRoute({
  counts,
  onJump,
}: {
  counts: Record<string, number>;
  onJump: (event: MouseEvent<HTMLAnchorElement>, index: number) => void;
}) {
  const { t } = useSiteI18n();
  const [focus, setFocus] = useState<number | null>(null);

  return (
    <nav
      className="hm-route"
      aria-label={t("Three moves")}
      data-focus={focus ?? undefined}
    >
      <div className="hm-route-stage" aria-hidden="true">
        <div className="hm-route-meta">
          <span className="hm-route-tag">{t("Three moves")}</span>
          <span className="hm-route-coords">01 → 03</span>
        </div>
        <svg
          className="hm-route-svg"
          viewBox="0 0 600 160"
          width="600"
          height="160"
        >
          <defs>
            <linearGradient
              id="hm-route-area"
              x1="0"
              y1="34"
              x2="0"
              y2="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.24" />
              <stop
                offset="0.58"
                stopColor="var(--accent)"
                stopOpacity="0.06"
              />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="hm-route-stroke"
              x1="100"
              y1="128"
              x2="500"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.58" />
              <stop offset="0.48" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="1" stopColor="var(--brand)" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="hm-route-apex-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.36" />
              <stop
                offset="0.48"
                stopColor="var(--accent)"
                stopOpacity="0.09"
              />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hm-route-spark-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.24" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle elevation contour guides */}
          {ROUTE.stops.map((stop, index) => (
            <line
              key={index}
              x1="16"
              y1={stop.y}
              x2="584"
              y2={stop.y}
              className="hm-route-contour"
              data-active={focus === index || undefined}
            />
          ))}

          {/* Harmonic astronomical guide arcs & survey crosshairs */}
          <path d={ROUTE.ghostUpper} className="hm-route-ghost" />
          <path d={ROUTE.ghostLower} className="hm-route-ghost is-dashed" />
          {ROUTE.crosshairs.map((pt, index) => (
            <path
              key={index}
              d={`M ${pt.x - 3.5} ${pt.y} H ${pt.x + 3.5} M ${pt.x} ${pt.y - 3.5} V ${pt.y + 3.5}`}
              className="hm-route-cross"
            />
          ))}

          {/* Ambient glows behind origin spark and destination apex */}
          <circle
            cx={ROUTE.stops[0].x}
            cy={ROUTE.stops[0].y}
            r="34"
            fill="url(#hm-route-spark-glow)"
          />
          <circle
            cx={ROUTE.stops[2].x}
            cy={ROUTE.stops[2].y}
            r="68"
            fill="url(#hm-route-apex-glow)"
          />

          {/* Grounded horizon datum axis & coordinate ruler ticks */}
          <line
            x1="18"
            y1={ROUTE.datumY}
            x2="584"
            y2={ROUTE.datumY}
            className="hm-route-datum"
          />
          {ROUTE.ticks.map((x) => {
            const anchor = x === 100 || x === 300 || x === 500;
            return (
              <line
                key={x}
                x1={x}
                y1={anchor ? ROUTE.datumY - 4 : ROUTE.datumY - 2.5}
                x2={x}
                y2={anchor ? ROUTE.datumY + 4 : ROUTE.datumY + 2.5}
                className={anchor ? "hm-route-tick is-anchor" : "hm-route-tick"}
              />
            );
          })}

          {/* Soft atmospheric area wash under the ascent curve */}
          <path d={ROUTE.area} className="hm-route-area" />

          {/* Faint orbital lead-in & lead-out extensions */}
          <path d={ROUTE.leadIn} className="hm-route-tail" />
          <path d={ROUTE.leadOut} className="hm-route-tail" />

          {/* Plumb drop-lines tethering each waypoint to its column below */}
          {ROUTE.stops.map((stop, index) => (
            <g
              key={index}
              className="hm-route-plumb-group"
              data-active={focus === index || undefined}
            >
              <line
                x1={stop.x}
                y1={stop.plumbTop}
                x2={stop.x}
                y2={ROUTE.datumY}
                className="hm-route-plumb"
              />
              <circle
                cx={stop.x}
                cy={ROUTE.datumY}
                r={focus === index ? 3.2 : 2.2}
                className="hm-route-foot"
              />
            </g>
          ))}

          {/* Main trajectory: soft bloom + crisp gradient spine + live light pulse */}
          <g className="hm-route-curve">
            <path d={ROUTE.main} className="hm-route-glow" />
            <path
              d={ROUTE.main}
              className="hm-route-path"
              stroke="url(#hm-route-stroke)"
            />
            <path d={ROUTE.main} pathLength={100} className="hm-route-pulse" />
          </g>

          {/* 01 Spark waypoint */}
          <g
            transform={`translate(${ROUTE.stops[0].x} ${ROUTE.stops[0].y})`}
            className="hm-route-node"
            data-stop="0"
            data-active={focus === 0 || undefined}
          >
            <circle r="16" className="hm-route-halo" />
            <circle r="11" className="hm-route-node-plate" />
            <path
              className="hm-route-spark"
              d="M0-8.5C.7-2.6 2.6-.7 8.5 0 2.6.7.7 2.6 0 8.5-.7 2.6-2.6.7-8.5 0-2.6-.7-.7-2.6 0-8.5Z"
            />
          </g>

          {/* 02 Build waypoint */}
          <g
            transform={`translate(${ROUTE.stops[1].x} ${ROUTE.stops[1].y})`}
            className="hm-route-node"
            data-stop="1"
            data-active={focus === 1 || undefined}
          >
            <circle r="16" className="hm-route-halo" />
            <circle r="12.5" className="hm-route-reticle" />
            <circle r="9" className="hm-route-node-plate is-ringed" />
            <rect
              x="-2.6"
              y="-2.6"
              width="5.2"
              height="5.2"
              rx="1"
              transform="rotate(45)"
              className="hm-route-build-core"
            />
          </g>

          {/* 03 Play apex beacon */}
          <g
            transform={`translate(${ROUTE.stops[2].x} ${ROUTE.stops[2].y})`}
            className="hm-route-node is-apex"
            data-stop="2"
            data-active={focus === 2 || undefined}
          >
            <circle r="22" className="hm-route-apex-ring" />
            <circle r="14.5" className="hm-route-apex-core" />
            <path className="hm-route-apex-play" d="M-2.8-4.6 5.2 0-2.8 4.6Z" />
          </g>
        </svg>
      </div>

      <ol className="hm-route-stops">
        {chapters.map((chapter, index) => (
          <li
            key={chapter.step}
            data-pillar={chapter.pillar}
            data-stop={index}
            data-active={focus === index || undefined}
            style={{ "--i": index } as CSSProperties}
          >
            <a
              href={`#${chapterId(chapter)}`}
              onMouseEnter={() => setFocus(index)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(index)}
              onBlur={() => setFocus(null)}
              onClick={(event) => onJump(event, index)}
            >
              <span className="hm-route-step">
                <span>0{index + 1}</span>
                {t(chapter.step)}
                <ArrowDownRight
                  size={13}
                  className="hm-route-jump"
                  aria-hidden="true"
                />
              </span>
              {counts[chapter.pillar] ? (
                <strong>{counts[chapter.pillar]}</strong>
              ) : null}
              <span className="hm-route-unit">{t(chapter.unit)}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function PlayScene({ play }: { play: StoryPlay }) {
  const { t } = useSiteI18n();
  return (
    <div className="hm-scene-canvas hm-play">
      <div className="hm-play-stage">
        <div className="hm-play-screen">
          <div className="hm-play-chrome">
            <span className="hm-play-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="hm-play-engine">
              {play.track.toUpperCase()} · {play.engine}
            </span>
            <span className="hm-play-status">
              <i />
              {t("Playable")}
            </span>
          </div>
          <div className="hm-play-viewport">
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
            <span className="hm-play-badge">
              <Play size={11} fill="currentColor" />
              {t("Playable build")}
            </span>
          </div>
        </div>

        <div className="hm-play-notes">
          <div className="hm-play-notes-head">
            <Code2 size={12} />
            <span>{t("Build story")}</span>
          </div>
          <div className="hm-play-notes-lines">
            <i
              className="is-accent"
              style={{ "--w": "68%" } as CSSProperties}
            />
            <i style={{ "--w": "92%" } as CSSProperties} />
            <i style={{ "--w": "54%" } as CSSProperties} />
          </div>
        </div>
      </div>

      <div className="hm-play-caption">
        <b>{play.title}</b>
        <span>
          {play.track.toUpperCase()} / {play.engine}
        </span>
      </div>
    </div>
  );
}

export function HomeStory({
  counts,
  pillarCounts,
  tools,
  play,
}: {
  counts: Record<string, number>;
  pillarCounts: Record<string, number>;
  tools: readonly MarqueeTool[];
  play: StoryPlay;
}) {
  const { t } = useSiteI18n();
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);
  // Scene transitions start a frame after the stage is pinned, so pinning it
  // (on hydration or on resize) never cross-fades the other scenes in place.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const update = () => setLive(matches(LIVE_STORY));
    update();
    return watchMedia(LIVE_STORY, update);
  }, []);
  useEffect(() => {
    setSettled(false);
    if (!live) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setSettled(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [live]);
  useEffect(() => {
    const section = ref.current;
    if (!live || !section) return;
    let frame = 0;
    const sync = () => {
      frame = 0;
      const nodes = Array.from(
        section.querySelectorAll<HTMLElement>("[data-chapter]"),
      );
      if (!nodes.length) return;
      const mid = window.innerHeight * 0.5;
      let best = 0;
      let bestDistance = Infinity;
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * 0.5 - mid);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setActive((current) => (current === best ? current : best));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [live]);

  const jumpToChapter = (
    index: number,
    event?: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      event &&
      (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    )
      return;
    const target = document.getElementById(chapterId(chapters[index]));
    if (!target) return;
    event?.preventDefault();
    setActive(index);
    target.scrollIntoView({
      behavior: matches(REDUCED_MOTION, true) ? "auto" : "smooth",
      block: "start",
    });
  };

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
      data-settled={settled || undefined}
      data-active={active}
      aria-labelledby="hm-story-title"
    >
      <header className="hm-story-head">
        <div className="hm-story-intro">
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
        </div>
        <StoryRoute
          counts={pillarCounts}
          onJump={(event, index) => jumpToChapter(index, event)}
        />
      </header>
      <div className="hm-story-grid">
        <ol className="hm-story-rail" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <li
              key={chapter.step}
              data-on={active === index}
              onClick={() => jumpToChapter(index)}
            >
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
                id={chapterId(chapter)}
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
