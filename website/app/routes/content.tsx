import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Link, useSiteI18n } from "../lib/i18n";
import { ArrowLeft } from "lucide-react";
import { contentFor, sources } from "../../content/registry.server";
import { contentKinds } from "../../content/models";
import { detailRoutes, pages } from "../../content/site";
import {
  ContentDocument,
  RecordDocument,
  RecordSectionHead,
  RecordShelf,
  recordingOrder,
  type RecordOutlineItem,
} from "../components/content";
import ResourceIcon from "../../src/components/ResourceIcon";
import { PaperDocument } from "../components/paper-document";
import { CommunityPanel } from "../components/community";

export function loader({ params, request }: LoaderFunctionArgs) {
  const content = contentFor(request);
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
    communityKey: ["example", "foundation", "threejs-game"].includes(entry.kind)
      ? entry.key
      : entry.kind === "repository-research" && entry.data.game_access
        ? content.collectionDiscoveryFor(entry).key
        : null,
    identity:
      entry.kind === "resource"
        ? sources.identities[entry.id as keyof typeof sources.identities]
        : null,
    steps:
      entry.kind === "path"
        ? content.all("step").filter((step) => step.data.track === entry.id)
        : [],
    cases:
      entry.kind === "resource"
        ? content.examplesFor({ kind: "resource", id: entry.id })
        : [],
    demos: entry.kind === "resource" ? content.demosFor(entry.id) : [],
  };
}
export default function ContentPage() {
  const { t } = useSiteI18n();
  const { entry, identity, steps, cases, demos, communityKey } =
    useLoaderData<typeof loader>();
  const collection = pages[contentKinds[entry.kind].page];
  if (entry.kind === "paper")
    return (
      <main
        id="main-content"
        className="site-main content-page paper-page record-page"
      >
        <title>{`${entry.title} — GameMap`}</title>
        <meta name="description" content={entry.description} />
        <nav
          className="content-breadcrumb paper-breadcrumb"
          aria-label={t("Breadcrumb")}
        >
          <Link to={collection.path}>
            <ArrowLeft size={15} aria-hidden="true" />
            {t(collection.title)}
          </Link>
        </nav>
        <PaperDocument entry={entry} />
      </main>
    );
  const recordings = recordingOrder(demos);
  const extras: RecordOutlineItem[] = [
    ...(steps.length
      ? [{ id: "record-steps", label: t("Steps & checkpoints") }]
      : []),
    ...(recordings.length
      ? [{ id: "record-recordings", label: t("All project recordings") }]
      : []),
    ...(communityKey
      ? [{ id: "community", label: t("Ratings & discussion") }]
      : []),
    ...(cases.length
      ? [{ id: "record-related", label: t("Related examples") }]
      : []),
  ];
  return (
    <main
      id="main-content"
      className={`site-main content-page record-page record-page-${entry.kind}`}
    >
      <title>{`${entry.title} — GameMap`}</title>
      <meta name="description" content={entry.description} />
      <RecordDocument
        entry={entry}
        extras={extras}
        leadAction={
          steps.length
            ? { href: "#record-steps", label: t("Start the path") }
            : undefined
        }
        mark={
          entry.kind === "resource" && identity ? (
            <ResourceIcon resource={entry.data} identity={identity} size={64} />
          ) : undefined
        }
      >
        {steps.length > 0 && (
          <section
            className="record-section record-steps"
            id="record-steps"
            aria-label={t("Steps and acceptance checkpoints")}
          >
            <RecordSectionHead
              title={t("Steps & checkpoints")}
              count={steps.length}
            />
            <ol className="path-steps">
              {steps.map((step, index) => (
                <li className="path-step" key={step.key}>
                  <span className="step-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ContentDocument entry={step} heading="h3" />
                </li>
              ))}
            </ol>
          </section>
        )}
        <RecordShelf
          id="record-recordings"
          title={t("All project recordings")}
          note={t("Choose a preview or open the original recording.")}
          entries={recordings}
        />
        {communityKey && <CommunityPanel gameKey={communityKey} />}
        <RecordShelf
          id="record-related"
          title={t("Related examples")}
          entries={cases}
        />
      </RecordDocument>
    </main>
  );
}
