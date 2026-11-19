import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useSiteI18n } from "../../lib/i18n";
import { REDUCED_MOTION, matches } from "../../lib/motion";
import type { GameStats } from "../../lib/collection-stats";
import "../../styles/home-wall.css";

export type WallGame = {
  id: string;
  title: string;
  src: string;
  alt: string;
  url: string;
};
/** The examples page header figures (lib/collection-stats.ts), so every
 *  number here matches the gallery the call to action opens. */
export type WallStats = GameStats;

const ROWS = 5;
/** Seconds per loop for each row; neighbouring rows drift in opposite directions. */
const ROW_SPEED = [96, 128, 84, 116, 104] as const;

/**
 * "The wall of worlds": every row is a real slice of the collection, drifting
 * on a tilted plane behind one enormous number. The wall itself is decorative
 * (hidden from assistive technology and the tab order); the call to action is
 * the accessible way into the full gallery.
 */
export function GameWall({
  games,
  stats,
}: {
  games: readonly WallGame[];
  stats: WallStats;
}) {
  const { t } = useSiteI18n();
  const countRef = useRef<HTMLSpanElement>(null);
  const rows = Array.from({ length: ROWS }, (_, row) =>
    games.filter((_, index) => index % ROWS === row),
  );

  // Count up once when the wall comes into view; static HTML already shows the total.
  useEffect(() => {
    const node = countRef.current;
    if (!node || matches(REDUCED_MOTION, true)) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 4);
          node.textContent = String(Math.round(stats.total * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = String(stats.total);
    };
  }, [stats.total]);

  return (
    <section className="game-wall" aria-labelledby="game-wall-title">
      <div className="game-wall-stage" aria-hidden="true">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="game-wall-row"
            style={
              { "--wall-speed": `${ROW_SPEED[rowIndex]}s` } as CSSProperties
            }
          >
            <div className="game-wall-track">
              {[0, 1].map((copy) =>
                row.map((game) => (
                  <a
                    key={`${copy}-${game.id}`}
                    className="game-wall-card"
                    href={game.url}
                    tabIndex={-1}
                  >
                    <img
                      src={game.src}
                      alt=""
                      width={1280}
                      height={720}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{game.title}</span>
                  </a>
                )),
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="game-wall-copy">
        <span className="kicker">{t("Games")}</span>
        <p className="game-wall-count">
          <span ref={countRef}>{stats.total}</span>
        </p>
        <h2 id="game-wall-title" className="display-l">
          {t("Made with AI. Ready to explore.")}
        </h2>
        <p className="lede">
          {t(
            "Playable games with build stories and project source. Every one opens a real build, its code and the story of how it was made.",
          )}
        </p>
        <ul className="game-wall-stats">
          <li>
            <strong>{stats.threeD}</strong>
            <span>{t("3D worlds")}</span>
          </li>
          <li>
            <strong>{stats.twoD}</strong>
            <span>{t("2D games")}</span>
          </li>
          <li>
            <strong>{stats.playable}</strong>
            <span>{t("Playable builds")}</span>
          </li>
        </ul>
        <Link className="button button-primary" to="/examples/">
          {t("Browse all {count} games", { count: stats.total })}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
