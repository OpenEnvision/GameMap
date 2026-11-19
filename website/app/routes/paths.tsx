import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowRight } from "lucide-react";
import { contentFor } from "../../content/registry.server";
import { ContentCard } from "../components/content";
import { publicAsset } from "../../src/publicAsset";
import { Link, useSiteI18n } from "../lib/i18n";
import { AccentTitle, IndexHero } from "../components/catalog-browser";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    paths: content.all("path"),
    steps: content.all("step"),
    notes: [
      "guides/practical-guide",
      "production/work-orders",
      "ecosystem/world-models",
    ].map((id) => content.require("document", id)),
  };
}
export default function Paths() {
  const { t } = useSiteI18n(),
    { paths, steps: allSteps, notes } = useLoaderData<typeof loader>();
  const stepCount = allSteps.filter((step) =>
    paths.some((path) => path.id === step.data.track),
  ).length;
  return (
    <main id="main-content" className="ix-page ix-paths">
      <title>{t("Development paths — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Choose a track. Every step keeps its purpose, deliverable, and acceptance checkpoint together.",
        )}
      />
      <IndexHero
        pillar="learn"
        kicker="MAKE THE NEXT STEP SMALL"
        title="A path, not a pile of tools."
        lede="Choose a track. Every step keeps its purpose, deliverable, and acceptance checkpoint together."
        count={stepCount}
        countLabel="guided steps"
      >
        <ol className="ix-path-index">
          {paths.map((path, index) => (
            <li key={path.key}>
              <a href={`#path-${path.id}`}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {path.title}
              </a>
            </li>
          ))}
        </ol>
      </IndexHero>
      <div className="ix-wrap">
        <div className="path-grid">
          {paths.map((path, index) => {
            const steps = allSteps.filter(
                (step) => step.data.track === path.id,
              ),
              art = path.blocks.find((block) => block.type === "image");
            return (
              <article
                className="path-card"
                id={`path-${path.id}`}
                data-content-ref={path.key}
                key={path.key}
              >
                <div className="path-stage">
                  {art?.type === "image" && (
                    <img
                      src={publicAsset(art.src)}
                      alt={art.alt}
                      width={art.width}
                      height={art.height}
                      loading="lazy"
                    />
                  )}
                  <div className="path-copy">
                    <span className="small-label">
                      <b>
                        {t("Path {number}", {
                          number: String(index + 1).padStart(2, "0"),
                        })}
                      </b>
                      {t("{count} STEPS · DELIVERABLES & CHECKPOINTS", {
                        count: steps.length,
                      })}
                    </span>
                    <h2>
                      <Link to={path.url}>
                        <AccentTitle text={path.title} />
                        <ArrowRight size={22} />
                      </Link>
                    </h2>
                    <p>{path.description}</p>
                    <Link className="button button-primary" to={path.url}>
                      {t("Follow this path")}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                <ol className="path-steps">
                  {steps.map((step, stepIndex) => (
                    <li key={step.key} data-content-ref={step.key}>
                      <Link to={step.url}>
                        <span className="path-step-num" aria-hidden="true">
                          {String(stepIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="path-step-title">{step.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
        <section className="related-content ix-context">
          <div className="ix-context-head">
            <p className="kicker">{t("Field notes")}</p>
            <h2>{t("Keep some context nearby.")}</h2>
          </div>
          <div className="content-grid ix-ledger">
            {notes.map((entry) => (
              <ContentCard key={entry.key} entry={entry} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
