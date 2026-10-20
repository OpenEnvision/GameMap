import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Maximize, Minimize, Pause, Play } from "lucide-react";
import { publicAsset } from "../../src/publicAsset";
import { Link, useSiteI18n } from "../lib/i18n";

export interface HomeShowreelCase {
  id: "2d" | "3d" | "world";
  label: string;
  title: string;
  subtitle: string;
  href: string;
  sourceUrl: string;
  poster: string;
  startSeconds: number;
  endSeconds: number;
  seekSeconds: number;
  research?: boolean;
}

type NativeVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
};
type Connection = EventTarget & { saveData?: boolean };
const filmSource = publicAsset("assets/media/promo/gamemap-showreel.mp4");
const clock = (value: number) => {
  const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
};
const progressValue = (value: number) => String(Math.min(1, Math.max(0, value)));

export function HomeShowreel({ cases }: { cases: HomeShowreelCase[] }) {
  const { t } = useSiteI18n();
  const captionId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const videoRef = useRef<NativeVideo>(null);
  const timeRef = useRef<HTMLTimeElement>(null);
  const chapterRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const casesRef = useRef(cases);
  const activeRef = useRef(0);
  const attachedRef = useRef(false);
  const errorRef = useRef(false);
  const pendingSeekRef = useRef<number | null>(cases[0]?.seekSeconds ?? 0);
  const seekingToRef = useRef<number | null>(null);
  const playRequestRef = useRef(0);
  const playPendingRef = useRef(false);
  const expectedPausesRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const mountedRef = useRef(false);
  const policyRef = useRef({
    ready: false,
    limited: true,
    inView: false,
    visible: false,
    explicitPlay: false,
    manualPause: false,
    blocked: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [fullscreenKind, setFullscreenKind] = useState<"standard" | "ios" | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const current = cases[activeIndex] ?? cases[0];

  const canPlay = useCallback(() => {
    const policy = policyRef.current;
    return mountedRef.current && policy.ready && policy.inView && policy.visible &&
      !policy.manualPause && !policy.blocked && !errorRef.current &&
      (policy.explicitPlay || !policy.limited);
  }, []);

  // Only chapter boundaries update React. Media time and progress remain DOM refs.
  const paintProgress = useCallback(() => {
    const video = videoRef.current;
    const items = casesRef.current;
    if (!video || !items.length || !attachedRef.current ||
        pendingSeekRef.current !== null || seekingToRef.current !== null) return;
    const position = video.currentTime;
    let index = items.findIndex((item) =>
      position >= item.startSeconds && position < item.endSeconds);
    if (index < 0) index = position >= items[items.length - 1].endSeconds ? items.length - 1 : 0;
    if (activeRef.current !== index) {
      activeRef.current = index;
      setActiveIndex(index);
    }
    items.forEach((item, chapter) => {
      const progress = (position - item.startSeconds) / Math.max(0.01, item.endSeconds - item.startSeconds);
      chapterRefs.current[chapter]?.style.setProperty("--chapter-progress", progressValue(progress));
      if (chapter === index)
        panelRef.current?.style.setProperty("--chapter-progress", progressValue(progress));
    });
    if (timeRef.current) {
      const duration = Number.isFinite(video.duration) && video.duration > 0
        ? video.duration : items[items.length - 1].endSeconds;
      timeRef.current.textContent = `${clock(position)} / ${clock(duration)}`;
    }
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }, []);
  const startAnimation = useCallback(() => {
    stopAnimation();
    const tick = () => {
      const video = videoRef.current;
      if (!video || video.paused || !mountedRef.current) return;
      paintProgress();
      animationRef.current = requestAnimationFrame(tick);
    };
    animationRef.current = requestAnimationFrame(tick);
  }, [paintProgress, stopAnimation]);

  const pauseVideo = useCallback(() => {
    playRequestRef.current++;
    playPendingRef.current = false;
    const video = videoRef.current;
    if (video && !video.paused) {
      expectedPausesRef.current++;
      video.pause();
    }
    stopAnimation();
    setPlaying(false);
  }, [stopAnimation]);

  const applyPendingSeek = useCallback(() => {
    const video = videoRef.current;
    const requested = pendingSeekRef.current;
    if (!video || requested === null || video.readyState < 1) return;
    const target = Number.isFinite(video.duration)
      ? Math.min(requested, Math.max(0, video.duration - 0.01)) : requested;
    try {
      seekingToRef.current = target;
      video.currentTime = target;
      pendingSeekRef.current = null;
    } catch {
      // Metadata/canplay will retry the latest requested chapter, never an old one.
      seekingToRef.current = null;
    }
  }, []);

  const revealDecodedFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 2 || video.seeking ||
        pendingSeekRef.current !== null || errorRef.current) return;
    if (seekingToRef.current !== null &&
        Math.abs(video.currentTime - seekingToRef.current) > 0.25) return;
    seekingToRef.current = null;
    setFrameReady(true);
    paintProgress();
  }, [paintProgress]);

  const attachSource = useCallback((retry = false) => {
    const video = videoRef.current;
    if (!video || (attachedRef.current && !retry)) return;
    attachedRef.current = true;
    video.muted = true;
    // Synchronous attachment keeps explicit Play inside the mobile user gesture.
    video.src = filmSource;
    video.load();
  }, []);

  const requestPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !attachedRef.current || !canPlay() || playPendingRef.current ||
        (!video.paused && !video.ended)) return;
    applyPendingSeek();
    const request = ++playRequestRef.current;
    playPendingRef.current = true;
    video.muted = true;
    void video.play().then(() => {
      if (!mountedRef.current || request !== playRequestRef.current) return;
      playPendingRef.current = false;
      if (!canPlay()) pauseVideo();
    }).catch((error: unknown) => {
      if (!mountedRef.current || request !== playRequestRef.current) return;
      playPendingRef.current = false;
      if (error instanceof DOMException && error.name === "AbortError") return;
      // Autoplay denial is recoverable with Play; do not repeatedly retry canplay.
      policyRef.current.blocked = true;
      setPlaying(false);
      setFrameReady(false);
    });
  }, [applyPendingSeek, canPlay, pauseVideo]);

  const reconcilePlayback = useCallback(() => {
    if (!canPlay()) {
      pauseVideo();
      return;
    }
    attachSource();
    requestPlay();
  }, [attachSource, canPlay, pauseVideo, requestPlay]);

  useEffect(() => {
    casesRef.current = cases;
  }, [cases]);

  useEffect(() => {
    mountedRef.current = true;
    const panel = panelRef.current;
    if (!panel) return () => { mountedRef.current = false; };
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const updatePreferences = () => {
      policyRef.current.ready = true;
      policyRef.current.limited = motion.matches || connection?.saveData === true;
      reconcilePlayback();
    };
    const updateVisibility = () => {
      policyRef.current.visible = document.visibilityState !== "hidden";
      reconcilePlayback();
    };
    const updateViewport = () => {
      const bounds = panel.getBoundingClientRect();
      policyRef.current.inView = bounds.bottom > 0 && bounds.top < innerHeight;
      reconcilePlayback();
    };
    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => {
          policyRef.current.inView = entry.isIntersecting && entry.intersectionRatio >= 0.05;
          reconcilePlayback();
        }, { threshold: [0, 0.05] }) : null;
    observer?.observe(panel);
    if (!observer) {
      updateViewport();
      window.addEventListener("scroll", updateViewport, { passive: true });
      window.addEventListener("resize", updateViewport);
    }
    policyRef.current.visible = document.visibilityState !== "hidden";
    updatePreferences();
    if (typeof motion.addEventListener === "function") motion.addEventListener("change", updatePreferences);
    else motion.addListener(updatePreferences);
    connection?.addEventListener("change", updatePreferences);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      mountedRef.current = false;
      playRequestRef.current++;
      playPendingRef.current = false;
      const video = videoRef.current;
      if (video && !video.paused) {
        expectedPausesRef.current++;
        video.pause();
      }
      stopAnimation();
      observer?.disconnect();
      window.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
      if (typeof motion.removeEventListener === "function") motion.removeEventListener("change", updatePreferences);
      else motion.removeListener(updatePreferences);
      connection?.removeEventListener("change", updatePreferences);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [reconcilePlayback, stopAnimation]);

  useEffect(() => {
    const panel = panelRef.current;
    const video = videoRef.current;
    if (!panel || !video) return;
    setFullscreenKind(typeof panel.requestFullscreen === "function" && document.fullscreenEnabled !== false
      ? "standard" : typeof video.webkitEnterFullscreen === "function" ? "ios" : null);
    const update = () => setFullscreen(document.fullscreenElement === panel);
    const begin = () => setFullscreen(true);
    const end = () => setFullscreen(false);
    document.addEventListener("fullscreenchange", update);
    video.addEventListener("webkitbeginfullscreen", begin);
    video.addEventListener("webkitendfullscreen", end);
    return () => {
      document.removeEventListener("fullscreenchange", update);
      video.removeEventListener("webkitbeginfullscreen", begin);
      video.removeEventListener("webkitendfullscreen", end);
    };
  }, []);

  const playOrPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused || playPendingRef.current) {
      policyRef.current.manualPause = true;
      pauseVideo();
      return;
    }
    const retry = errorRef.current;
    policyRef.current.explicitPlay = true;
    policyRef.current.manualPause = false;
    policyRef.current.blocked = false;
    errorRef.current = false;
    setFailed(false);
    if (retry) {
      pendingSeekRef.current = casesRef.current[activeRef.current]?.seekSeconds ?? 0;
      seekingToRef.current = null;
      setFrameReady(false);
    }
    attachSource(retry);
    requestPlay();
  };

  const selectChapter = (index: number) => {
    const item = casesRef.current[index];
    if (!item) return;
    activeRef.current = index;
    setActiveIndex(index);
    pendingSeekRef.current = item.seekSeconds;
    seekingToRef.current = null;
    setFrameReady(false);
    chapterRefs.current.forEach((button) => button?.style.setProperty("--chapter-progress", "0"));
    panelRef.current?.style.setProperty("--chapter-progress", "0");
    if (attachedRef.current) {
      applyPendingSeek();
      reconcilePlayback();
    }
  };

  const toggleFullscreen = () => {
    const panel = panelRef.current;
    const video = videoRef.current;
    if (!panel || !video) return;
    if (fullscreenKind === "standard") {
      const operation = document.fullscreenElement === panel
        ? document.exitFullscreen() : panel.requestFullscreen();
      void operation.catch(() => setFullscreenKind(null));
    } else if (fullscreenKind === "ios") {
      try {
        if (fullscreen) video.webkitExitFullscreen?.();
        else video.webkitEnterFullscreen?.();
      } catch { setFullscreenKind(null); }
    }
  };

  if (!current) return null;
  return (
    <section className="home-showreel" ref={panelRef} role="region"
      aria-label={t("GameMap project showreel")} data-playing={playing} data-error={failed}>
      <header className="showreel-header">
        <span className="showreel-brand">GAMEMAP / {t("THE SHOWREEL")}</span>
        <div className="showreel-controls">
          <time className="showreel-time" ref={timeRef} aria-label={t("Film time")} aria-live="off">
            {clock(0)} / {clock(cases[cases.length - 1].endSeconds)}
          </time>
          <button type="button" onClick={playOrPause}
            aria-label={t(playing ? "Pause film" : failed ? "Retry film" : "Play film")}>
            {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          </button>
          {fullscreenKind && <button type="button" onClick={toggleFullscreen}
            disabled={fullscreenKind === "ios" && !frameReady}
            aria-label={t(fullscreen ? "Exit fullscreen" : "Enter fullscreen")}>
            {fullscreen ? <Minimize size={15} aria-hidden="true" /> : <Maximize size={15} aria-hidden="true" />}
          </button>}
        </div>
      </header>
      <div className="showreel-screen">
        <video ref={videoRef} muted playsInline loop preload="none" poster={current.poster}
          aria-labelledby={captionId}
          onLoadedMetadata={applyPendingSeek}
          onLoadedData={revealDecodedFrame}
          onCanPlay={() => { applyPendingSeek(); revealDecodedFrame(); reconcilePlayback(); }}
          onSeeked={() => { applyPendingSeek(); revealDecodedFrame(); }}
          onTimeUpdate={paintProgress}
          onPlay={() => {
            if (!canPlay()) pauseVideo();
            else setPlaying(true);
          }}
          onPlaying={() => { revealDecodedFrame(); startAnimation(); }}
          onPause={() => {
            if (expectedPausesRef.current > 0) expectedPausesRef.current--;
            else if (canPlay() && document.visibilityState !== "hidden") {
              // Native iOS fullscreen controls express the same pause intent.
              policyRef.current.manualPause = true;
            }
            setPlaying(false);
            stopAnimation();
            paintProgress();
          }}
          onError={() => {
            errorRef.current = true;
            setFailed(true);
            setFrameReady(false);
            pauseVideo();
          }}>
          {t("Your browser does not support this film.")}
        </video>
        {(!frameReady || failed) && <img className="showreel-poster" src={current.poster} alt="" aria-hidden="true" />}
        {failed && <div className="showreel-error" role="status">
          <p>{t("Film unavailable. Try again or open the project.")}</p>
          <button type="button" onClick={playOrPause}>{t("Retry film")}</button>
        </div>}
      </div>
      <div className="showreel-caption">
        <div>
          <span className="showreel-caption-label">{String(activeIndex + 1).padStart(2, "0")} / {t(current.label)}</span>
          <h2 id={captionId}>{current.title}</h2>
          <p className="showreel-caption-meta">
            <span>{t(current.subtitle)}{current.research ? <> · {t("Research demo")}</> : null}</span>
            <a className="showreel-source-link" href={current.sourceUrl} target="_blank" rel="noreferrer"
              aria-label={t("Original source")} title={t("Original source")}>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </p>
        </div>
        <Link className="showreel-project-link" to={current.href} aria-label={t("View project")}>
          <ArrowUpRight size={21} aria-hidden="true" />
        </Link>
      </div>
      <div className="showreel-chapters" role="group" aria-label={t("Showreel chapters")}>
        {cases.map((item, index) => <button key={item.id} type="button"
          ref={(node) => { chapterRefs.current[index] = node; }}
          aria-pressed={activeIndex === index} onClick={() => selectChapter(index)}>
          {t(item.label)}
        </button>)}
      </div>
    </section>
  );
}

export default HomeShowreel;
