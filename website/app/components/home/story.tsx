import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { ArrowUpRight, Check, Code2, Terminal } from "lucide-react";
import { Link, useSiteI18n } from "../../lib/i18n";
import { publicAsset } from "../../lib/catalog";
import { pillars, type Pillar } from "../../lib/pillars";
import { REDUCED_MOTION, matches, watchMedia } from "../../lib/motion";
import type { LearningMedia } from "../../../src/data/learningMedia";
import type { MarqueeTool } from "./marquee";
import { IdeaLoopCanvas } from "./idea-loop";

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
  title: string;
  body: string;
};
const chapters: readonly Chapter[] = [
  {
    pillar: "learn",
    step: "Idea",
    title: "Find the smallest thing worth playing.",
    body: "Choose a starting point, wire a small playable loop, and test a level with worked exercises and concrete checks.",
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
const chapterId = (chapter: Chapter) => `story-${chapter.step.toLowerCase()}`;

const IDEA_PHASES = [
  { index: "01", label: "Explore" },
  { index: "02", label: "Collect" },
  { index: "03", label: "Escape" },
] as const;

function IdeaScene({ active }: { active: boolean }) {
  const { t } = useSiteI18n();
  const [phase, setPhase] = useState<0 | 1 | 2>(1);
  const progressRef = useRef<HTMLSpanElement>(null);

  const handleProgress = useCallback((progress: number) => {
    const bar = progressRef.current;
    if (bar) bar.style.transform = `scaleX(${progress.toFixed(4)})`;
  }, []);

  return (
    <div className="hm-scene-canvas hm-idea" data-phase={phase}>
      <div className="hm-idea-phases">
        {IDEA_PHASES.map((step, index) => (
          <span
            key={step.label}
            className="hm-idea-phase"
            data-on={phase === index || undefined}
          >
            <i>{step.index}</i>
            <span>{t(step.label)}</span>
          </span>
        ))}
      </div>

      <IdeaLoopCanvas
        active={active}
        onPhaseChange={setPhase}
        onProgress={handleProgress}
      />

      <div className="hm-idea-prompt">
        <div className="hm-idea-prompt-head">
          <span className="hm-idea-prompt-label">{t("Core loop")}</span>
          <span className="hm-idea-legend" aria-hidden="true">
            <i className="is-guard" />
            <i className="is-gold" />
            <i className="is-exit" />
          </span>
        </div>
        <p>
          {t("One room, three guards, a raccoon after the golden sardine.")}
          <i className="hm-caret" />
        </p>
        <span className="hm-idea-progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
      </div>
    </div>
  );
}

const AGENT_IDS = new Set(["claude-code", "codex", "gemini-cli"]);
const ENGINE_IDS = new Set(["godot-engine", "unity-engine", "threejs"]);
const ASSET_IDS = new Set(["blender", "meshy", "pixellab"]);

/** Concise studio chip labels so chips never clip even on 320px screens. */
const CHIP_LABELS: Record<string, string> = {
  "claude-code": "Claude Code",
  codex: "Codex",
  "gemini-cli": "Gemini CLI",
  "godot-engine": "Godot",
  "unity-engine": "Unity",
  threejs: "Three.js",
  blender: "Blender",
  meshy: "Meshy",
  pixellab: "PixelLab",
};

const MCP_CALLS = [
  { call: 'scene.spawn("guard", { fov: 52 })', stage: "engine" },
  { call: 'mesh.load("sardine", { lod: 2 })', stage: "asset" },
  { call: 'build.ship("webgl", { fps: 60 })', stage: "output" },
] as const;

const FRAME_BARS = [0.64, 0.72, 0.68, 0.78, 0.66, 0.7] as const;

function BuildChip({ tool, index }: { tool: MarqueeTool; index: number }) {
  return (
    <span className="hm-build-chip" style={{ "--i": index } as CSSProperties}>
      <span className="hm-build-icon" data-background={tool.background}>
        <img
          src={publicAsset(tool.logo)}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="hm-build-name">
        {CHIP_LABELS[tool.id] ?? tool.short}
      </span>
    </span>
  );
}

function BuildScene({
  tools,
  active,
}: {
  tools: readonly MarqueeTool[];
  active: boolean;
}) {
  const { t } = useSiteI18n();
  const [callIndex, setCallIndex] = useState(0);

  useEffect(() => {
    if (!active || matches(REDUCED_MOTION, true)) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setCallIndex((current) => (current + 1) % MCP_CALLS.length);
      }
    }, 3400);
    return () => window.clearInterval(timer);
  }, [active]);

  const byIds = (ids: Set<string>) => tools.filter((tool) => ids.has(tool.id));
  const agents = (
    byIds(AGENT_IDS).length
      ? byIds(AGENT_IDS)
      : tools.filter((tool) => tool.category === "agents")
  ).slice(0, 3);
  const engines = (
    byIds(ENGINE_IDS).length
      ? byIds(ENGINE_IDS)
      : tools.filter(
          (tool) => tool.category === "engines" && !ASSET_IDS.has(tool.id),
        )
  ).slice(0, 3);
  const assets = (
    byIds(ASSET_IDS).length
      ? byIds(ASSET_IDS)
      : tools.filter(
          (tool) => !AGENT_IDS.has(tool.id) && !ENGINE_IDS.has(tool.id),
        )
  ).slice(0, 3);

  const currentCall = MCP_CALLS[callIndex];

  return (
    <div className="hm-scene-canvas hm-build" data-stage={currentCall.stage}>
      {/* Tier 1: Coding agents */}
      <div className="hm-build-tier">
        <span className="hm-build-tier-label">{t("Coding agents")}</span>
        <div className="hm-build-row is-three">
          {agents.map((tool, index) => (
            <BuildChip key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>

      {/* Converging Bezier bus: Agents -> MCP Protocol Bridge */}
      <svg
        className="hm-build-bus"
        viewBox="0 0 420 38"
        preserveAspectRatio="none"
        width="420"
        height="38"
      >
        <path
          d="M 70 0 C 70 22, 210 14, 210 38"
          className="hm-build-trace"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 210 0 L 210 38"
          className="hm-build-trace"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 350 0 C 350 22, 210 14, 210 38"
          className="hm-build-trace"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 70 0 C 70 22, 210 14, 210 38"
          pathLength={100}
          className="hm-build-pulse"
          style={{ "--i": 0 } as CSSProperties}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 210 0 L 210 38"
          pathLength={100}
          className="hm-build-pulse"
          style={{ "--i": 1 } as CSSProperties}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 350 0 C 350 22, 210 14, 210 38"
          pathLength={100}
          className="hm-build-pulse"
          style={{ "--i": 2 } as CSSProperties}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Protocol bridge bar tying agent actions directly into engines & assets */}
      <div className="hm-build-bridge">
        <Terminal size={13} />
        <span className="hm-build-proto">MCP</span>
        <code key={currentCall.call}>{currentCall.call}</code>
        <i className="hm-build-live" />
      </div>

      {/* Branching symmetric Bezier bus: Bridge -> Engines & Assets */}
      <svg
        className="hm-build-bus is-short"
        viewBox="0 0 420 30"
        preserveAspectRatio="none"
        width="420"
        height="30"
      >
        <path
          d="M 210 0 C 210 16, 105 12, 105 30"
          className="hm-build-trace"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 210 0 C 210 16, 315 12, 315 30"
          className="hm-build-trace"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 210 0 C 210 16, 105 12, 105 30"
          pathLength={100}
          className="hm-build-pulse"
          style={{ "--i": 3 } as CSSProperties}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 210 0 C 210 16, 315 12, 315 30"
          pathLength={100}
          className="hm-build-pulse"
          style={{ "--i": 4 } as CSSProperties}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Tier 2: Symmetric Dual Bays — Game engines & Assets */}
      <div className="hm-build-bays">
        <div
          className="hm-build-bay"
          data-hot={currentCall.stage === "engine" || undefined}
        >
          <span className="hm-build-tier-label">{t("Game engines")}</span>
          <div className="hm-build-stack">
            {engines.map((tool, index) => (
              <BuildChip key={tool.id} tool={tool} index={index + 3} />
            ))}
          </div>
        </div>
        <div
          className="hm-build-bay"
          data-hot={currentCall.stage === "asset" || undefined}
        >
          <span className="hm-build-tier-label">{t("Assets")}</span>
          <div className="hm-build-stack">
            {assets.map((tool, index) => (
              <BuildChip key={tool.id} tool={tool} index={index + 6} />
            ))}
          </div>
        </div>
      </div>

      {/* Converging symmetric Bezier bus: Bays -> Your Game */}
      <svg
        className="hm-build-bus is-short"
        viewBox="0 0 420 30"
        preserveAspectRatio="none"
        width="420"
        height="30"
      >
        <path
          d="M 105 0 C 105 16, 210 12, 210 30"
          className="hm-build-trace"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 315 0 C 315 16, 210 12, 210 30"
          className="hm-build-trace"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 105 0 C 105 16, 210 12, 210 30"
          pathLength={100}
          className="hm-build-pulse"
          style={{ "--i": 5 } as CSSProperties}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 315 0 C 315 16, 210 12, 210 30"
          pathLength={100}
          className="hm-build-pulse"
          style={{ "--i": 6 } as CSSProperties}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Tier 3: Compiled Playable Build Output Dock */}
      <div
        className="hm-build-output"
        data-hot={currentCall.stage === "output" || undefined}
      >
        <span className="hm-build-mark">
          <svg viewBox="0 0 72 72" width="25" height="25">
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
        </span>
        <span className="hm-build-out-text">
          <b>{t("Your game")}</b>
          <small>WEBGL2 · 60 FPS · 4.2 MB</small>
        </span>
        <span className="hm-build-meter" aria-hidden="true">
          {FRAME_BARS.map((height, index) => (
            <i
              key={index}
              style={{ "--h": height, "--i": index } as CSSProperties}
            />
          ))}
        </span>
        <span className="hm-build-ready">
          <i />
          {t("Playable")}
        </span>
      </div>
    </div>
  );
}

type StoryPlayCard = {
  title: string;
  track: "2d" | "3d";
  engine: string;
  media?: LearningMedia;
};

export type StoryPlay = StoryPlayCard & {
  summary?: string;
  companion?: StoryPlayCard;
  secondary?: StoryPlayCard;
};

function PlayScene({ play }: { play: StoryPlay }) {
  const { t } = useSiteI18n();
  return (
    <div className="hm-scene-canvas hm-play">
      <div className="hm-play-stage">
        {play.companion?.media && (
          <div className="hm-play-back is-left">
            <span className="hm-play-back-bar">
              <i />
              <span>{play.companion.title}</span>
            </span>
            <img
              src={publicAsset(play.companion.media.src)}
              alt=""
              width={play.companion.media.width ?? 1280}
              height={play.companion.media.height ?? 720}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {play.secondary?.media && (
          <div className="hm-play-back is-right">
            <span className="hm-play-back-bar">
              <i />
              <span>{play.secondary.title}</span>
            </span>
            <img
              src={publicAsset(play.secondary.media.src)}
              alt=""
              width={play.secondary.media.width ?? 1280}
              height={play.secondary.media.height ?? 720}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

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
            <span className="hm-play-hud" aria-hidden="true">
              60 FPS · WEBGL
            </span>
          </div>
        </div>

        <div className="hm-play-notes">
          <div className="hm-play-notes-head">
            <Code2 size={12} />
            <span>{t("Build story")}</span>
            <code>PROMPT.md</code>
          </div>
          {play.summary ? (
            <p className="hm-play-summary">{play.summary}</p>
          ) : null}
          <div className="hm-play-checks">
            <span>
              <Check size={11} strokeWidth={2.4} />
              {t("Playable")}
            </span>
            <span>
              <Check size={11} strokeWidth={2.4} />
              {t("Project source")}
            </span>
          </div>
        </div>
      </div>

      <div className="hm-play-caption">
        <span className="hm-play-caption-main">
          <b>{play.title}</b>
          <span>
            {play.track.toUpperCase()} / {play.engine}
          </span>
        </span>
        <span className="hm-play-reel" aria-hidden="true">
          <i className="is-on" />
          <i />
          <i />
        </span>
      </div>
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
    event: MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    const target = document.getElementById(chapterId(chapters[index]));
    if (!target) return;
    event.preventDefault();
    setActive(index);
    target.focus({ preventScroll: true });
    // Pointer navigation opens the mobile chapter on its picture; keyboard
    // navigation goes straight to the text and continues through its links.
    const scene = target.nextElementSibling;
    const destination =
      event.detail > 0 && matches("(max-width: 899px)") && scene
        ? scene
        : target;
    destination.scrollIntoView({
      behavior:
        event.detail === 0 || matches(REDUCED_MOTION, true) ? "auto" : "smooth",
      block: "start",
    });
  };

  const scenes = [
    <IdeaScene key="idea" active={!live || active === 0} />,
    <BuildScene key="build" tools={tools} active={!live || active === 1} />,
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
        <h2 id="hm-story-title" className="hm-title">
          {t("From a spark")}
          <br />
          <em>{t("to something playable.")}</em>
        </h2>
      </header>
      <div className="hm-story-grid">
        <ol className="hm-story-rail" aria-label={t("Three moves")}>
          {chapters.map((chapter, index) => (
            <li key={chapter.step}>
              <a
                href={`#${chapterId(chapter)}`}
                aria-current={live && active === index ? "step" : undefined}
                onClick={(event) => jumpToChapter(event, index)}
              >
                <span>0{index + 1}</span>
                {t(chapter.step)}
              </a>
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
                tabIndex={-1}
                aria-labelledby={`${chapterId(chapter)}-title`}
                data-chapter={index}
                data-on={active === index}
                style={{ "--row": index + 1 } as CSSProperties}
              >
                <p className="hm-chapter-step">
                  <span>0{index + 1}</span>
                  {t(chapter.step)}
                  <span className="hm-chapter-pillar">{t(pillar.label)}</span>
                </p>
                <h3 id={`${chapterId(chapter)}-title`}>{t(chapter.title)}</h3>
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
