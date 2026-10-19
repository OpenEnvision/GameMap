import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowLeft } from "lucide-react";
import { content } from '../../content/registry.server';
import { contentKinds } from '../../content/models';
import { detailRoutes, pages, url } from "../../content/site";
import {
  ContentDocument,
  ContentCard,
  RelatedDemos,
} from "../components/content";
import ResourceIcon from "../../src/components/ResourceIcon";

export function loader({ params }: LoaderFunctionArgs) {
  const route = detailRoutes.find((route) => params[route.param]);
  const id = route && params[route.param];
  const entry =
    route && id
      ? route.kinds
          .map((kind) => content.get(kind, id.replace(/\/$/, "")))
          .find(Boolean)
      : undefined;
  if (!entry) throw new Response("Content not found", { status: 404 });
  return {
    entry,
    steps: entry.kind === 'path' ? content.all('step').filter(step => step.data.track === entry.id) : [],
    cases: entry.kind === 'resource' ? content.examplesFor({kind:'resource',id:entry.id}) : [],
    demos: entry.kind === 'resource' ? content.demosFor(entry.id) : [],
  };
}
export default function ContentPage() {
  const { entry, steps, cases, demos } = useLoaderData<typeof loader>();
  const collection = pages[contentKinds[entry.kind].page];
  return (
    <main id="main-content" className="site-main content-page">
      <title>{entry.title} — GameMap</title>
      <meta name="description" content={entry.description} />
      <nav className="content-breadcrumb" aria-label="Breadcrumb">
        <Link to={collection.path}>
          <ArrowLeft size={15} />
          {collection.title}
        </Link>
        <Link to={url.page("explore")}>All content</Link>
      </nav>
      {entry.kind === "resource" && (
        <div className="content-resource-mark">
          <ResourceIcon resource={entry.data} size={56} />
        </div>
      )}
      <ContentDocument entry={entry} />
      {entry.kind === "resource" && <RelatedDemos demos={demos} />}
      {steps.length > 0 && (
        <section
          className="path-steps"
          aria-label="Steps and acceptance checkpoints"
        >
          {steps.map((step, index) => (
            <section className="path-step" key={step.key}>
              <span className="step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <ContentDocument entry={step} heading="h2" />
            </section>
          ))}
        </section>
      )}
      {cases.length > 0 && (
        <section className="related-content">
          <h2>Related examples</h2>
          <div className="content-grid">
            {cases.map((game) => (
              <ContentCard entry={game} key={game.key} />
            ))}
          </div>
          <p className="reading-note">
            Related resources do not establish creator attribution. Check each
            game’s evidence.
          </p>
        </section>
      )}
    </main>
  );
}
