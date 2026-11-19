import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLocation } from "react-router";
import { ArrowUpRight, Code, Download, Play } from "lucide-react";
import {
  FINE_POINTER_MOTION,
  matches,
  useReducedMotion,
  watchMedia,
} from "../../lib/motion";
import { useSiteI18n } from "../../lib/i18n";
import { startPageFx, startPointerFx, type CursorLabels } from "../fx/engine";

const subscribeFinePointer = (callback: () => void) =>
  watchMedia(FINE_POINTER_MOTION, callback);
/** False in static HTML and during hydration; the client upgrades afterwards. */
function useFinePointerMotion() {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => matches(FINE_POINTER_MOTION),
    () => false,
  );
}

/** Restarts the finite, time-based CSS animations around a page title. */
function replayEntrance(title: Element) {
  const scope =
    title.closest("header, section") ?? title.parentElement ?? title;
  for (const animation of scope.getAnimations({ subtree: true })) {
    if (
      !(animation instanceof CSSAnimation) ||
      animation.timeline !== document.timeline ||
      animation.effect?.getComputedTiming().iterations === Infinity
    )
      continue;
    animation.currentTime = 0;
    animation.play();
  }
}

/** Site-wide motion: card glow, cursor ring and label pill, magnetic controls,
 *  ambient light, view transitions and page entrances. Decorative nodes ignore
 *  pointer events; media queries hide them when motion is reduced. */
export function CosmosEffects() {
  const reduced = useReducedMotion();
  const fine = useFinePointerMotion();
  const { t } = useSiteI18n();
  const { pathname } = useLocation();
  const labels = useRef<CursorLabels>({
    play: "Play",
    code: "Code",
    visit: "Visit",
    download: "Download",
    open: "Open",
  });
  const ring = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const pillLabel = useRef<HTMLSpanElement>(null);
  const ambient = useRef<HTMLDivElement>(null);
  const warm = useRef<HTMLSpanElement>(null);
  const cool = useRef<HTMLSpanElement>(null);
  const previousPath = useRef<string | null>(null);
  const previousTitle = useRef<Element | null>(null);

  useEffect(() => {
    labels.current = {
      play: t("Play"),
      code: t("Code"),
      visit: t("Visit"),
      download: t("Download"),
      open: t("Open"),
    };
  });

  useEffect(() => {
    if (reduced) return;
    return startPageFx();
  }, [reduced]);

  useEffect(() => {
    if (!fine) return;
    const nodes = {
      ring: ring.current,
      pill: pill.current,
      pillLabel: pillLabel.current,
      ambient: ambient.current,
      warm: warm.current,
      cool: cool.current,
    };
    if (Object.values(nodes).some((node) => !node)) return;
    return startPointerFx(
      nodes as { [K in keyof typeof nodes]: NonNullable<(typeof nodes)[K]> },
      () => labels.current,
    );
  }, [fine]);

  // Entrances are CSS animations that run when a page's hero is inserted. A
  // route that reuses its hero element (same template, new path) replays them
  // here, whichever stylesheet defined them. The document load never replays.
  useEffect(() => {
    const title = document.querySelector("main h1, #nd-page h1");
    const previous = previousPath.current,
      reused = title !== null && title === previousTitle.current;
    previousPath.current = pathname;
    previousTitle.current = title;
    if (reduced || !reused || previous === null || previous === pathname)
      return;
    replayEntrance(title);
  }, [pathname, reduced]);

  // Keep decorative nodes stable through hydration so the following size
  // containers retain their layout inside the display: contents fieldset.
  // fx.css and motion.css control visibility through motion media queries.
  return (
    <>
      <div className="fx-portal" aria-hidden="true" />
      <div className="fx-ambient" ref={ambient} aria-hidden="true">
        <span className="fx-ambient-warm" ref={warm} />
        <span className="fx-ambient-cool" ref={cool} />
      </div>
      <div className="fx-cursor" ref={ring} aria-hidden="true" />
      <div className="fx-cursor-pill" ref={pill} aria-hidden="true">
        <span className="fx-cursor-pill-inner">
          <Play className="fx-icon-play" size={11} fill="currentColor" />
          <Code className="fx-icon-code" size={13} />
          <ArrowUpRight className="fx-icon-visit fx-icon-open" size={13} />
          <Download className="fx-icon-download" size={13} />
          <span ref={pillLabel} />
        </span>
      </div>
    </>
  );
}
