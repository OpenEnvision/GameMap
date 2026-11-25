import type { CSSProperties } from "react";
import {
  ChartNoAxesCombined,
  ChartPie,
  ChevronDown,
  Compass,
  Layers3,
  Route,
} from "lucide-react";
import type { Resource } from "../../src/types";
import { useSiteI18n } from "../lib/i18n";
import {
  categoryGlyphs,
  dimensionGlyphs,
  stageGlyphs,
  typeGlyphs,
} from "../lib/catalog";
import { resourceDistribution } from "../lib/resource-distribution";

type FilterKey = "category" | "type" | "stage" | "track";

export function ResourceOverview({
  resources,
  total,
  filters,
  onFilter,
}: {
  resources: Resource[];
  total: number;
  filters: Record<FilterKey, string>;
  onFilter: (key: FilterKey, value: string) => void;
}) {
  const { t } = useSiteI18n();
  const distribution = resourceDistribution(resources);
  const share = (count: number) =>
    resources.length ? (count / resources.length) * 100 : 0;
  const filter = (key: FilterKey, id: string) =>
    onFilter(key, filters[key] === id ? "all" : id);
  let offset = 0;
  const segments = distribution.categories.map(({ id, count }) => {
    const start = offset;
    offset += share(count);
    return `var(--tax-${id}) ${start}% ${offset}%`;
  });
  const filterLabel = (label: string, count: number) =>
    t(
      count === 1
        ? "Filter by {label}: {count} resource"
        : "Filter by {label}: {count} resources",
      {
        label: t(label),
        count,
      },
    );

  return (
    <section
      className="resource-overview"
      aria-labelledby="resource-overview-title"
    >
      <details className="resource-overview-disclosure">
        <summary>
          <ChartNoAxesCombined size={20} aria-hidden="true" />
          <h2 id="resource-overview-title">{t("Library at a glance")}</h2>
          <span className="resource-overview-count">
            {t("{count} of {total} resources", {
              count: resources.length,
              total,
            })}
          </span>
          <ChevronDown
            className="resource-overview-chevron"
            size={17}
            aria-hidden="true"
          />
        </summary>
        <div className="resource-overview-body">
          <p className="resource-overview-intro">
            {t(
              "Distribution of the current results. One resource can support several stages and tracks.",
            )}
          </p>
          <div className="resource-chart-grid">
            <div className="resource-chart" data-chart="category">
              <h3>
                <ChartPie size={16} aria-hidden="true" />
                {t("Category distribution")}
              </h3>
              <div className="resource-category-chart">
                <div
                  className="resource-donut"
                  aria-hidden="true"
                  style={{
                    background: resources.length
                      ? `conic-gradient(${segments.join(", ")})`
                      : "var(--line)",
                  }}
                >
                  <div>
                    <strong>{resources.length}</strong>
                    <span>
                      {t(
                        resources.length === 1
                          ? "resource in view"
                          : "resources in view",
                      )}
                    </span>
                  </div>
                </div>
                <ul className="resource-chart-legend">
                  {distribution.categories.map(({ id, label, count }) => {
                    const Glyph = categoryGlyphs[id];
                    return (
                      <li key={id}>
                        <button
                          data-category={id}
                          style={
                            { "--tone": `var(--tax-${id})` } as CSSProperties
                          }
                          aria-pressed={filters.category === id}
                          disabled={count === 0 && filters.category !== id}
                          aria-label={filterLabel(label, count)}
                          onClick={() => filter("category", id)}
                        >
                          <Glyph size={14} aria-hidden="true" />
                          <span>{t(label)}</span>
                          <strong>{count}</strong>
                          <small>{share(count).toFixed(1)}%</small>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="resource-chart" data-chart="stage">
              <h3>
                <Route size={16} aria-hidden="true" />
                {t("Development stages")}
              </h3>
              <ul className="resource-stage-chart">
                {distribution.stages.map(({ id, label, count }) => {
                  const Glyph = stageGlyphs[id];
                  return (
                    <li key={id}>
                      <button
                        data-stage={id}
                        aria-pressed={filters.stage === id}
                        disabled={count === 0 && filters.stage !== id}
                        aria-label={filterLabel(label, count)}
                        onClick={() => filter("stage", id)}
                      >
                        <span className="resource-bar-label">
                          <Glyph size={14} aria-hidden="true" />
                          <span>{t(label)}</span>
                          <strong>{count}</strong>
                        </span>
                        <span
                          className="resource-chart-track"
                          aria-hidden="true"
                        >
                          <i style={{ width: `${share(count)}%` }} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="resource-chart-axis" aria-hidden="true">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="resource-chart" data-chart="track">
              <h3>
                <Compass size={16} aria-hidden="true" />
                {t("Development tracks")}
              </h3>
              <ul className="resource-track-chart">
                {distribution.tracks.map(({ id, label, count }) => {
                  const Glyph = dimensionGlyphs[id];
                  return (
                    <li key={id}>
                      <button
                        data-track={id}
                        style={
                          { "--tone": `var(--tax-${id})` } as CSSProperties
                        }
                        aria-pressed={filters.track === id}
                        disabled={count === 0 && filters.track !== id}
                        aria-label={filterLabel(label, count)}
                        onClick={() => filter("track", id)}
                      >
                        <span className="resource-track-icon">
                          <Glyph
                            size={20}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="resource-track-label">
                          <span>{t(label)}</span>
                          <small>{share(count).toFixed(1)}%</small>
                        </span>
                        <strong>{count}</strong>
                        <span
                          className="resource-chart-track"
                          aria-hidden="true"
                        >
                          <i style={{ width: `${share(count)}%` }} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="resource-chart-note">
                {t("One resource can support several stages and tracks.")}
              </p>
            </div>
          </div>
          <div className="resource-type-distribution">
            <h3>
              <Layers3 size={15} aria-hidden="true" />
              {t("Resource types")}
            </h3>
            <ul>
              {distribution.types.map(({ id, label, count }) => {
                const Glyph = typeGlyphs[id];
                return (
                  <li key={id}>
                    <button
                      data-type={id}
                      data-empty={count === 0 || undefined}
                      aria-pressed={filters.type === id}
                      disabled={count === 0 && filters.type !== id}
                      aria-label={filterLabel(label, count)}
                      onClick={() => filter("type", id)}
                    >
                      <Glyph size={13} aria-hidden="true" />
                      {t(label)}
                      <strong>{count}</strong>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </details>
    </section>
  );
}
