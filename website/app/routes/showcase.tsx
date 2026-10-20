import { useMemo } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ChevronDown, Clapperboard, Search } from "lucide-react";
import { contentFor } from "../../content/registry.server";
import { demoTypeLabels, groupRecordings } from "../../content/media";
import { RecordingCard } from "../components/content";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { useClientQuery } from "../lib/client-query";
import { useSiteI18n } from "../lib/i18n";
export function loader({ request }: LoaderFunctionArgs) {
  return { demos: contentFor(request).all("demo") };
}
export default function Showcase() {
  const { t } = useSiteI18n(),
    { demos: all } = useLoaderData<typeof loader>();
  const [params, setParams] = useClientQuery();
  const { groups, availableTypes } = useMemo(() => ({
    groups: groupRecordings(all),
    availableTypes: Object.entries(demoTypeLabels).filter(([id]) =>
      all.some((entry) => entry.data.demoType === id)),
  }), [all]);
  const query = params.get("q") || "",
    requestedTrack = params.get("track") || "all",
    track = ["2d", "3d", "world"].includes(requestedTrack) ? requestedTrack : "all",
    requestedType = params.get("type") || "all",
    type = availableTypes.some(([id]) => id === requestedType) ? requestedType : "all",
    typeLabel = t(availableTypes.find(([id]) => id === type)?.[1] || "All demo types");
  const update = (key: string, value: string) => setParams((previous) => {
    const next = new URLSearchParams(previous);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    return next;
  }, { replace: true, preventScrollReset: true });
  const matchesFilters = (entry: (typeof all)[number]) =>
    (track === "all" || entry.data.track === track) &&
    (type === "all" || entry.data.demoType === type) &&
    matchesSearch(searchableText(entry), query);
  const recordings = groups.filter((views) => views.some(matchesFilters));
  const projectCount = new Set(recordings.map(([entry]) => entry.data.exampleId
    ? `example:${entry.data.exampleId}` : `resource:${entry.data.resourceId}`)).size;
  const viewCount = recordings.reduce((count, views) => count + views.length, 0);
  return (
    <main id="main-content" className="site-main listing-page">
      <title>{t("Project demos — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Watch project previews and explore the original source material.",
        )}
      />
      <header className="page-heading">
        <span className="eyebrow">{t("SEE THE SOURCE MATERIAL")}</span>
        <h1>{t("Originals, with every view intact.")}</h1>
        <p>
          {t(
            "Watch project previews and explore the original source material.",
          )}
        </p>
      </header>
      <div className="showcase-toolbar">
        <div className="filter-search">
          <Search size={18} aria-hidden="true" />
          <input aria-label={t("Search project demos")}
            placeholder={t("Find a project, engine, or demo type…")}
            value={query} onChange={(event) => update("q", event.target.value)} />
        </div>
        <div className="showcase-type-control" data-active={type !== "all"}>
          <span className="showcase-type-size" aria-hidden="true">{typeLabel}</span>
          <Clapperboard className="showcase-type-icon" size={15} aria-hidden="true" />
          <select aria-label={t("Demo type")} value={type}
            onChange={(event) => update("type", event.target.value)}>
            <option value="all">{t("All demo types")}</option>
            {availableTypes.map(([id, label]) =>
              <option key={id} value={id}>{t(label)}</option>)}
          </select>
          <ChevronDown className="showcase-type-chevron" size={14} aria-hidden="true" />
        </div>
        <div className="segmented-control" role="group" aria-label={t("Demo track")}>
          {[
            ["all", "All recordings"],
            ["2d", "2D"],
            ["3d", "3D"],
            ["world", "World models"],
          ].map(([id, label]) => (
            <button key={id} aria-pressed={track === id} onClick={() => update("track", id)}>
              {t(label)}
            </button>
          ))}
        </div>
      </div>
      <div className="results-meta">
        <span aria-live="polite">{t("{count} recordings", { count: recordings.length })}</span>
        <span>{t("{projects} projects · {views} views", { projects: projectCount, views: viewCount })}</span>
      </div>
      <div className="demo-grid">
        {recordings.map((views) => {
          const preferredView = views.find(matchesFilters) || views[0];
          return <RecordingCard key={`${views[0].data.recordingId}:${preferredView.id}`}
            views={views} preferredViewId={preferredView.id} />;
        })}
      </div>
      {!recordings.length && (
        <div className="empty-state">
          <h2>{t("No recordings match these filters.")}</h2>
          <p>{t("Try another project, engine, or demo type.")}</p>
          <button className="button button-secondary" onClick={() => setParams((previous) => {
            const next = new URLSearchParams(previous);
            for (const key of ["q", "track", "type"]) next.delete(key);
            return next;
          }, { replace: true, preventScrollReset: true })}>{t("Clear filters")}</button>
        </div>
      )}
    </main>
  );
}
