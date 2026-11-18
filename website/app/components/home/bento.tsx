import {
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Code2,
  FlaskConical,
  Gamepad2,
  Layers3,
  Orbit,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Link, useSiteI18n } from "../../lib/i18n";
import { categories, publicAsset } from "../../lib/catalog";
import { pillars, type Pillar } from "../../lib/pillars";
import type { MarqueeTool } from "./marquee";

const pillarIcons = {
  games: Gamepad2,
  tools: Wrench,
  research: FlaskConical,
  learn: BookOpen,
} as const;
const categoryIcons = [Code2, Boxes, Gamepad2, Layers3, Sparkles, Orbit];
/** Category planets on three rings of the decorative orbit (deterministic). */
const ORBIT = [
  { ring: 0, angle: 200 },
  { ring: 1, angle: 320 },
  { ring: 2, angle: 30 },
  { ring: 0, angle: 20 },
  { ring: 1, angle: 140 },
  { ring: 2, angle: 230 },
] as const;
const RINGS = [
  { rx: 26, ry: 10 },
  { rx: 38, ry: 15 },
  { rx: 49, ry: 19.5 },
] as const;
const round = (value: number) => Math.round(value * 100) / 100;

function PillarTile({
  pillar,
  total,
  counts,
  className,
  children,
}: {
  pillar: Pillar;
  total: number;
  counts: Record<string, number>;
  className: string;
  children?: ReactNode;
}) {
  const { t } = useSiteI18n();
  const Icon = pillarIcons[pillar.id];
  return (
    <article className={`hm-tile ${className}`} data-pillar={pillar.id}>
      {children}
      <div className="hm-tile-body">
        <p className="hm-tile-kicker">
          <Icon size={15} aria-hidden="true" />
          {t(pillar.kicker)}
        </p>
        <h3>{t(pillar.label)}</h3>
        {total > 0 && <p className="hm-tile-count">{total}</p>}
        <p className="hm-tile-text">{t(pillar.description)}</p>
        <ul className="hm-tile-links">
          {pillar.links.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>
                <span>{t(link.title)}</span>
                {counts[link.path] ? <b>{counts[link.path]}</b> : null}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** The atlas as a bento: four pillars and the six resource directions. */
export function AtlasBento({
  pillarCounts,
  counts,
  categoryCounts,
  shots,
  tools,
}: {
  pillarCounts: Record<string, number>;
  counts: Record<string, number>;
  categoryCounts: Record<string, number>;
  shots: readonly string[];
  tools: readonly MarqueeTool[];
}) {
  const { t } = useSiteI18n();
  const gridRef = useRef<HTMLDivElement>(null);
  const tile = (id: Pillar["id"]) => pillars.find((item) => item.id === id)!;
  // One listener for the whole grid writes the glow position on the hovered tile.
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const target = (event.target as Element).closest<HTMLElement>(".hm-tile");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };
  return (
    <section className="hm-atlas" aria-labelledby="hm-atlas-title">
      <header className="hm-atlas-head">
        <div>
          <p className="kicker">{t("CHOOSE YOUR DIRECTION")}</p>
          <h2 id="hm-atlas-title" className="hm-title">
            {t("A whole toolkit,")} <em>{t("mapped out.")}</em>
          </h2>
        </div>
        <Link className="inline-link" to="/resources/">
          {t("Browse everything")}
          <ArrowRight size={16} />
        </Link>
      </header>
      <div className="hm-bento" ref={gridRef} onPointerMove={onPointerMove}>
        <PillarTile
          pillar={tile("games")}
          total={pillarCounts.games}
          counts={counts}
          className="hm-tile-games"
        >
          <span className="hm-tile-mosaic" aria-hidden="true">
            {shots.map((src) => (
              <span
                key={src}
                style={{ backgroundImage: `url("${publicAsset(src)}")` }}
              />
            ))}
          </span>
        </PillarTile>
        <PillarTile
          pillar={tile("tools")}
          total={pillarCounts.tools}
          counts={counts}
          className="hm-tile-tools"
        >
          <span className="hm-tile-logos" aria-hidden="true">
            {tools.map((tool) => (
              <span
                key={tool.id}
                className="hm-logo"
                data-background={tool.background}
              >
                <img
                  src={publicAsset(tool.logo)}
                  alt=""
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            ))}
          </span>
        </PillarTile>
        <PillarTile
          pillar={tile("research")}
          total={pillarCounts.research}
          counts={counts}
          className="hm-tile-research"
        >
          <span className="hm-tile-lines" aria-hidden="true">
            {Array.from({ length: 7 }, (_, index) => (
              <i key={index} style={{ "--i": index } as CSSProperties} />
            ))}
          </span>
        </PillarTile>
        <PillarTile
          pillar={tile("learn")}
          total={pillarCounts.learn}
          counts={counts}
          className="hm-tile-learn"
        >
          <span className="hm-tile-pages" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </PillarTile>
        <article className="hm-tile hm-tile-directions">
          <div className="hm-orbit" aria-hidden="true">
            <svg viewBox="-50 -22 100 44" preserveAspectRatio="xMidYMid meet">
              {RINGS.map((ring, index) => (
                <ellipse key={index} rx={ring.rx} ry={ring.ry} />
              ))}
            </svg>
            <span className="hm-orbit-sun" />
            {categories.map((category, index) => {
              const place = ORBIT[index % ORBIT.length];
              const ring = RINGS[place.ring];
              const radians = (place.angle * Math.PI) / 180;
              return (
                <span
                  key={category.id}
                  className="hm-orbit-planet"
                  style={
                    {
                      "--planet": `var(--tax-${category.id})`,
                      "--x": `${round(50 + (Math.cos(radians) * ring.rx))}%`,
                      "--y": `${round(50 + ((Math.sin(radians) * ring.ry) / 44) * 100)}%`,
                      "--size": `${10 + (index % 3) * 4}px`,
                    } as CSSProperties
                  }
                />
              );
            })}
          </div>
          <div className="hm-tile-body">
            <p className="hm-tile-kicker">
              <Orbit size={15} aria-hidden="true" />
              {t("Resources")}
            </p>
            <h3>{t("Six directions, one map.")}</h3>
            <ul className="hm-directions">
              {categories.map((category, index) => {
                const Icon = categoryIcons[index % categoryIcons.length];
                return (
                  <li key={category.id}>
                    <Link
                      to={"/resources/?category=" + category.id}
                      data-category={category.id}
                      style={{ "--planet": `var(--tax-${category.id})` } as CSSProperties}
                    >
                      <span className="hm-direction-icon">
                        <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="hm-direction-text">
                        <strong>{t(category.label)}</strong>
                        <small>{t(category.description)}</small>
                      </span>
                      {categoryCounts[category.id] ? (
                        <b>{categoryCounts[category.id]}</b>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
