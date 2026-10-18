import { content } from "../../content/registry";
import { DemoCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";

export default function Showcase() {
  const [params, setParams] = useClientQuery();
  const track = params.get("track") || "all";
  const demos = content
    .all("demo")
    .filter((entry) => track === "all" || entry.data.track === track);
  return (
    <main id="main-content" className="site-main listing-page">
      <title>Project demos — GameMap</title>
      <meta
        name="description"
        content="All curated project excerpts and original source recordings, with creator credits and original media links."
      />
      <header className="page-heading">
        <span className="eyebrow">SEE THE SOURCE MATERIAL</span>
        <h1>Every recording. Credits intact.</h1>
        <p>
          Curated excerpts and original project recordings are distinct source
          records. Some refer to the same original film; none is hidden by a
          per-project default.
        </p>
      </header>
      <div className="segmented-control" aria-label="Demo track">
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
            {label}
          </button>
        ))}
      </div>
      {(["excerpt", "source-recording"] as const).map((role) => {
        const records = demos.filter((entry) => entry.data.role === role);
        return records.length ? (
          <section className="content-index-section" key={role}>
            <div className="section-top">
              <div>
                <span className="eyebrow">{records.length} RECORDS</span>
                <h2>
                  {role === "excerpt"
                    ? "Curated preview excerpts"
                    : "Original project recordings"}
                </h2>
              </div>
            </div>
            <div className="demo-grid">
              {records.map((entry) => (
                <DemoCard entry={entry} key={entry.key} />
              ))}
            </div>
          </section>
        ) : null;
      })}
      {!demos.length && (
        <p className="empty-state">No recordings on this track yet.</p>
      )}
      <p className="reading-note">
        Click to play. Previews never autoplay; original videos, author sources,
        and attribution are preserved on every recording page.
      </p>
    </main>
  );
}
