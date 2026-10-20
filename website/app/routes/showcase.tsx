import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { contentFor } from "../../content/registry.server";
import { groupRecordings } from "../../content/media";
import { RecordingCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";
import { useSiteI18n } from "../lib/i18n";
export function loader({ request }: LoaderFunctionArgs) {
  return { demos: contentFor(request).all("demo") };
}
export default function Showcase() {
  const { t } = useSiteI18n(),
    { demos: all } = useLoaderData<typeof loader>();
  const [params, setParams] = useClientQuery(),
    track = params.get("track") || "all";
  const demos = all.filter(
      (entry) => track === "all" || entry.data.track === track,
    ),
    recordings = groupRecordings(demos);
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
      <div className="segmented-control" aria-label={t("Demo track")}>
        {[
          ["all", "All recordings"],
          ["2d", "2D"],
          ["3d", "3D"],
          ["world", "World models"],
        ].map(([id, label]) => (
          <button
            key={id}
            aria-pressed={track === id}
            onClick={() =>
              setParams(id === "all" ? {} : { track: id }, {
                replace: true,
                preventScrollReset: true,
              })
            }
          >
            {t(label)}
          </button>
        ))}
      </div>
      <div className="results-meta">
        <span>{t("{count} recordings", { count: recordings.length })}</span>
      </div>
      <div className="demo-grid">
        {recordings.map((views) => (
          <RecordingCard key={views[0].data.recordingId} views={views} />
        ))}
      </div>
      {!recordings.length && (
        <p className="empty-state">{t("No recordings on this track yet.")}</p>
      )}
    </main>
  );
}
