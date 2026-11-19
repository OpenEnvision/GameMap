import type { CSSProperties } from "react";
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
import { categories } from "../../lib/catalog";
import { pillars, type Pillar } from "../../lib/pillars";

const pillarIcons = {
  games: Gamepad2,
  tools: Wrench,
  research: FlaskConical,
  learn: BookOpen,
} as const;
const categoryIcons = [Code2, Boxes, Gamepad2, Layers3, Sparkles, Orbit];

function PillarTile({
  pillar,
  total,
  counts,
}: {
  pillar: Pillar;
  total: number;
  counts: Record<string, number>;
}) {
  const { t } = useSiteI18n();
  const Icon = pillarIcons[pillar.id];
  return (
    <article className="hm-tile" data-pillar={pillar.id}>
      <header className="hm-tile-head">
        <span className="hm-tile-icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.7} />
        </span>
        <h3>{t(pillar.label)}</h3>
        {total > 0 && <p className="hm-tile-count">{total}</p>}
      </header>
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
    </article>
  );
}

/** Four collection directories and six resource categories. */
export function AtlasBento({
  pillarCounts,
  counts,
  categoryCounts,
}: {
  pillarCounts: Record<string, number>;
  counts: Record<string, number>;
  categoryCounts: Record<string, number>;
}) {
  const { t, locale } = useSiteI18n();
  return (
    <section className="hm-atlas" aria-labelledby="hm-atlas-title">
      <header className="hm-atlas-head">
        <div>
          <p className="kicker">{t("CHOOSE YOUR DIRECTION")}</p>
          <h2 id="hm-atlas-title" className="hm-title">
            <span>{t("A whole toolkit,")}</span>
            {locale === "zh" ? null : " "}
            <em>{t("mapped out.")}</em>
          </h2>
        </div>
        <Link className="inline-link" to="/resources/">
          {t("Browse everything")}
          <ArrowRight size={16} />
        </Link>
      </header>
      <div className="hm-bento">
        {pillars.map((pillar) => (
          <PillarTile
            key={pillar.id}
            pillar={pillar}
            total={pillarCounts[pillar.id]}
            counts={counts}
          />
        ))}
        <article className="hm-tile hm-tile-directions">
          <header className="hm-tile-head">
            <span className="hm-tile-icon" aria-hidden="true">
              <Orbit size={18} strokeWidth={1.7} />
            </span>
            <h3>{t("Six directions, one map.")}</h3>
          </header>
          <ul className="hm-directions">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];
              return (
                <li key={category.id}>
                  <Link
                    to={"/resources/?category=" + category.id}
                    data-category={category.id}
                    style={
                      {
                        "--planet": `var(--tax-${category.id})`,
                      } as CSSProperties
                    }
                  >
                    <span className="hm-direction-icon">
                      <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="hm-direction-text">
                      <strong>{t(category.label)}</strong>
                      <small>{t(category.description)}</small>
                    </span>
                    <span className="hm-direction-end">
                      {categoryCounts[category.id] ? (
                        <b>{categoryCounts[category.id]}</b>
                      ) : null}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}
