import type { CSSProperties } from "react";
import { Link, useSiteI18n } from "../../lib/i18n";
import { publicAsset } from "../../lib/catalog";

export type MarqueeTool = {
  id: string;
  /** The resource title, e.g. "Godot Engine · Official Documentation". */
  name: string;
  /** The product alone ("Godot Engine"), for chips and orbit labels. */
  short: string;
  url: string;
  logo: string;
  background: "light" | "dark";
  wide: boolean;
  category: string;
};

function ToolChip({ tool }: { tool: MarqueeTool }) {
  const { t } = useSiteI18n();
  return (
    <>
      <span
        className="hm-logo"
        data-background={tool.background}
        data-wide={tool.wide || undefined}
      >
        <img
          src={publicAsset(tool.logo)}
          alt=""
          width={tool.wide ? 80 : 32}
          height={32}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="hm-tool-text">
        <strong>{tool.short}</strong>
        <small
          style={{ "--tax": `var(--tax-${tool.category})` } as CSSProperties}
        >
          {t(categoryLabel[tool.category] ?? "Resources")}
        </small>
      </span>
    </>
  );
}
const categoryLabel: Record<string, string> = {
  agents: "Coding agents",
  engines: "Game engines",
  "2d": "2D development",
  "3d": "3D development",
  production: "Game production",
  world: "World models",
};

/**
 * Two rows of real tools drifting in opposite directions. The first copy of
 * each row holds the links; the second copy only closes the loop and is
 * hidden from assistive technology (and removed under reduced motion, where
 * the row becomes a native horizontal scroller; home.css does the same while
 * a link in the row has keyboard focus, so the focused link is always in view).
 */
export function ToolMarquee({ rows }: { rows: readonly MarqueeTool[][] }) {
  return (
    <div className="hm-marquee">
      {rows.map((row, index) => (
        <div
          key={index}
          className="hm-marquee-row"
          data-direction={index % 2 ? "reverse" : "forward"}
          style={{ "--count": row.length } as CSSProperties}
        >
          <ul className="hm-marquee-track">
            {row.map((tool) => (
              <li key={tool.id}>
                <Link
                  className="hm-tool"
                  to={tool.url}
                  title={tool.short === tool.name ? undefined : tool.name}
                >
                  <ToolChip tool={tool} />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="hm-marquee-track" data-clone aria-hidden="true">
            {row.map((tool) => (
              <li key={tool.id}>
                <span className="hm-tool">
                  <ToolChip tool={tool} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
