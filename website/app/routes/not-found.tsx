import { ArrowRight } from "lucide-react";
import { Link, useSiteI18n } from "../lib/i18n";
import { seeded } from "../lib/motion";

/** Deterministic star field, trajectory and probe for the lost-in-space stage. */
function LostArt({ signal }: { signal: string }) {
  const random = seeded(404);
  const stars = Array.from({ length: 90 }, (_, index) => ({
    x: Math.round(random() * 1600),
    y: Math.round(random() * 700),
    r: Math.round((random() < 0.88 ? 0.6 + random() : 1.6 + random()) * 10) / 10,
    o: Math.round((0.2 + random() * 0.8) * 100) / 100,
    twinkle: index % 7 === 0,
  }));
  return (
    <div className="lost-stage" aria-hidden="true">
      <svg
        className="lost-stars"
        viewBox="0 0 1600 700"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        {stars.map((star, index) => (
          <circle
            key={index}
            className={star.twinkle ? "is-twinkle" : undefined}
            cx={star.x}
            cy={star.y}
            r={star.r}
            opacity={star.o}
          />
        ))}
      </svg>
      <div className="lost-numerals">
        <span className="lost-digit">4</span>
        <svg className="lost-zero" viewBox="0 0 400 520" focusable="false">
          <defs>
            <radialGradient id="lost-planet" cx="34%" cy="30%" r="78%">
              <stop offset="0" style={{ stopColor: "var(--art-hi)" }} />
              <stop offset="0.45" style={{ stopColor: "var(--art-a)" }} />
              <stop offset="1" style={{ stopColor: "var(--art-b)" }} />
            </radialGradient>
            <radialGradient id="lost-glow">
              <stop
                offset="0.4"
                style={{ stopColor: "var(--art-a)", stopOpacity: 0.5 }}
              />
              <stop
                offset="1"
                style={{ stopColor: "var(--art-a)", stopOpacity: 0 }}
              />
            </radialGradient>
            <linearGradient id="lost-ring" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "var(--ink)" }} />
              <stop
                offset="1"
                style={{ stopColor: "var(--ink)", stopOpacity: 0.12 }}
              />
            </linearGradient>
          </defs>
          <circle
            className="lost-glow"
            cx="200"
            cy="260"
            r="150"
            fill="url(#lost-glow)"
          />
          <ellipse
            className="lost-orbit"
            cx="200"
            cy="260"
            rx="150"
            ry="226"
            stroke="url(#lost-ring)"
          />
          <ellipse
            className="lost-orbit-light"
            cx="200"
            cy="260"
            rx="150"
            ry="226"
            pathLength="1000"
          />
          <circle cx="200" cy="260" r="64" fill="url(#lost-planet)" />
          <ellipse
            className="lost-planet-ring"
            cx="200"
            cy="262"
            rx="104"
            ry="20"
            transform="rotate(-18 200 262)"
          />
        </svg>
        <span className="lost-digit">4</span>
      </div>
      <svg
        className="lost-trajectory"
        viewBox="0 0 600 300"
        focusable="false"
      >
        <path className="lost-path" d="M 40 270 C 180 250 320 170 560 30" />
        <g className="lost-probe">
          <rect x="-7" y="-5" width="14" height="10" rx="2" />
          <rect className="lost-panel" x="-27" y="-3" width="16" height="6" />
          <rect className="lost-panel" x="11" y="-3" width="16" height="6" />
          <line x1="0" y1="-5" x2="0" y2="-14" />
          <circle cx="0" cy="-15" r="2" />
        </g>
        <text className="lost-signal" x="596" y="104">
          {signal}
        </text>
      </svg>
    </div>
  );
}

export default function NotFound() {
  const { t } = useSiteI18n();
  return (
    <main id="main-content" className="error-page lost-page">
      <title>{t("Page not found — GameMap")}</title>
      <meta name="robots" content="noindex" />
      <LostArt signal={t("Signal lost")} />
      <div className="lost-copy">
        <span className="eyebrow">{t("404 / OFF THE MAP")}</span>
        <h1>{t("This path is still uncharted.")}</h1>
        <p>
          {t(
            "Find a working starting point in the resource library, or explore the guides.",
          )}
        </p>
        <div className="lost-actions">
          <Link className="button button-primary" to="/resources/">
            {t("Explore resources")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link className="button button-secondary" to="/">
            {t("Back to GameMap")}
          </Link>
        </div>
      </div>
    </main>
  );
}
