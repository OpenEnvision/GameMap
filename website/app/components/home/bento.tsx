import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useSiteI18n } from "../../lib/i18n";
import { categories } from "../../lib/catalog";
import { pillars, type Pillar } from "../../lib/pillars";

function PillarRow({
  pillar,
  total,
  counts,
}: {
  pillar: Pillar;
  total: number;
  counts: Record<string, number>;
}) {
  const { t } = useSiteI18n();
  return (
    <li className="hm-pillar" data-pillar={pillar.id}>
      <div className="hm-pillar-head">
        <h3>{t(pillar.label)}</h3>
        {total > 0 && <p className="hm-pillar-count">{total}</p>}
      </div>
      <p className="hm-pillar-text">{t(pillar.description)}</p>
      <ul className="hm-pillar-links">
        {pillar.links.map((link) => {
          const count = counts[link.path];
          return (
            <li key={link.path}>
              <Link to={link.path}>
                <span>{t(link.title)}</span>
                {/* A lone destination already carries the pillar total. */}
                {count && count !== total ? <b>{count}</b> : null}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

/** Four collection directories as one ruled index, then six resource directions. */
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
      <ul className="hm-index">
        {pillars.map((pillar) => (
          <PillarRow
            key={pillar.id}
            pillar={pillar}
            total={pillarCounts[pillar.id]}
            counts={counts}
          />
        ))}
      </ul>
      <div className="hm-dirs">
        <h3>{t("Six directions, one map.")}</h3>
        <ul className="hm-directions">
          {categories.map((category) => (
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
                <span className="hm-direction-name">
                  <strong>{t(category.label)}</strong>
                  {categoryCounts[category.id] ? (
                    <b>{categoryCounts[category.id]}</b>
                  ) : null}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
                <small>{t(category.description)}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
