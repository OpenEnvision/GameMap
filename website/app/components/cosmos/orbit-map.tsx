import { useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Link, useSiteI18n } from "../../lib/i18n";

type Category = {
  id: string;
  label: string;
  description: string;
  color: string;
};
/** Ring radius in container-width units and orbital period in seconds. */
const RINGS = [
  { radius: 17, period: 46 },
  { radius: 29, period: 70 },
  { radius: 41, period: 104 },
] as const;

/**
 * The resource categories as a small planetary system. The orbit map is
 * decorative (hidden from assistive technology and the tab order); the
 * category tiles beside it remain the accessible, crawlable links.
 */
export function CategoryOrbits({
  categories,
  counts,
  icons,
}: {
  categories: readonly Category[];
  counts: Record<string, number>;
  icons: readonly LucideIcon[];
}) {
  const { t } = useSiteI18n();
  const [active, setActive] = useState<string | null>(null);
  const activate = (id: string) => () => setActive(id);
  const clear = () => setActive(null);
  return (
    <div className="orbit-layout" data-active={active ?? undefined}>
      <div className="orbit-map" aria-hidden="true" onPointerLeave={clear}>
        <div className="orbit-plane">
          {RINGS.map((ring, index) => (
            <span
              key={index}
              className="orbit-ring"
              data-ring={index}
              style={{ "--r": `${ring.radius}cqw` } as CSSProperties}
            />
          ))}
          {categories.map((category, index) => {
            const ringIndex = index % RINGS.length;
            const ring = RINGS[ringIndex];
            const angle =
              24 + ringIndex * 52 + (index >= RINGS.length ? 180 : 0);
            return (
              <span
                key={category.id}
                className="orbit-arm"
                style={
                  {
                    "--r": `${ring.radius}cqw`,
                    "--angle": `${angle}deg`,
                    "--period": `${ring.period}s`,
                  } as CSSProperties
                }
              >
                <Link
                  to={"/resources/?category=" + category.id}
                  className="orbit-planet"
                  tabIndex={-1}
                  data-category={category.id}
                  data-active={active === category.id ? "" : undefined}
                  style={{ "--planet": category.color } as CSSProperties}
                  onPointerEnter={activate(category.id)}
                >
                  <span className="orbit-planet-body" />
                  <span className="orbit-planet-label">
                    {t(category.label)}
                    <b>{counts[category.id]}</b>
                  </span>
                </Link>
              </span>
            );
          })}
        </div>
        <span className="orbit-core">
          <svg viewBox="0 0 72 72" width="44" height="44">
            <path
              fill="#ff7049"
              d="M31 3 48.3 13 35.5 20.4 31 17.8 13.5 27.9v20.2L31 58.2l17.5-10.1V43H31V30.5h30v23.9L31 71.7 1 54.4V20.3L31 3Z"
            />
            <path
              fill="#cc5938"
              d="m1 20.3 12.5 7.6v20.2L31 58.2v13.5L1 54.4V20.3Z"
            />
            <path fill="#ff7049" d="m61 1 8 4.6v9.2l-8 4.6-8-4.6V5.6L61 1Z" />
          </svg>
        </span>
      </div>
      <div className="category-grid">
        {categories.map((category, index) => {
          const Icon = icons[index];
          return (
            <Link
              key={category.id}
              to={"/resources/?category=" + category.id}
              className="category-tile"
              data-category={category.id}
              data-active={active === category.id ? "" : undefined}
              style={{ "--planet": category.color } as CSSProperties}
              onPointerEnter={activate(category.id)}
              onPointerLeave={clear}
              onFocus={activate(category.id)}
              onBlur={clear}
            >
              <span className="category-symbol">
                <Icon size={23} strokeWidth={1.6} />
              </span>
              <span>
                <strong>{t(category.label)}</strong>
                <small>{t(category.description)}</small>
              </span>
              <span className="category-count">{counts[category.id]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
