import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Link, useSiteI18n } from "../lib/i18n";
import { ArrowLeft } from "lucide-react";
import { contentFor, sources } from "../../content/registry.server";
import { contentKinds, type ContentEntry } from "../../content/models";
import { researchRecordVisible } from "../../content/research-visibility";
import { detailRoutes, pages } from "../../content/site";
import {
  RecordDocument,
  RecordShelf,
  recordingOrder,
  type RecordOutlineItem,
} from "../components/content";
import { CatalogIcon } from "../components/catalog-icon";
import {
  agentKindGlyphs,
  categoryGlyphs,
  testingKindGlyphs,
} from "../lib/catalog";
import { PaperDocument } from "../components/paper-document";
import {
  GameDocument,
  type LinkedResourceInfo,
  type RelatedGameCard,
} from "../components/game-document";
import { CommunityPanel } from "../components/community";
import { communityEnabled } from "../lib/community";

function isGameEntry(
  entry: ContentEntry,
): entry is
  | ContentEntry<"example">
  | ContentEntry<"foundation">
  | ContentEntry<"threejs-game"> {
  return (
    entry.kind === "example" ||
    entry.kind === "foundation" ||
    entry.kind === "threejs-game"
  );
}

function engineToken(value: string) {
  return value.toLowerCase().split(/[·/,(\s]+/)[0] || "";
}

function pickRelatedGames(
  content: ReturnType<typeof contentFor>,
  current:
    | ContentEntry<"example">
    | ContentEntry<"foundation">
    | ContentEntry<"threejs-game">,
): RelatedGameCard[] {
  const currentTrack =
    current.kind === "threejs-game" ? "3d" : current.data.track;
  const currentEngine =
    current.kind === "threejs-game"
      ? "three.js"
      : engineToken(current.data.engine || "");
  const currentResources = new Set(
    current.kind === "threejs-game" ? [] : current.data.resourceIds || [],
  );

  const candidates = [
    ...content.all("example"),
    ...content.all("foundation"),
  ].filter((other) => other.key !== current.key);

  const scored = candidates.map((other, order) => {
    const image = other.blocks.find((block) => block.type === "image");
    let score = 0;
    if (image) score += 100;
    if (!("intake" in other.data && other.data.intake)) score += 40;
    if (other.data.track === currentTrack) score += 30;
    if (currentEngine && engineToken(other.data.engine || "") === currentEngine)
      score += 18;
    let sharedResources = 0;
    for (const id of other.data.resourceIds || []) {
      if (currentResources.has(id)) sharedResources++;
    }
    score += Math.min(sharedResources, 3) * 16;
    if (other.data.demo.kind === "playable") score += 12;
    return { other, image, score, order };
  });

  scored.sort((a, b) => b.score - a.score || a.order - b.order);

  return scored.slice(0, 20).map(({ other, image }) => ({
    key: other.key,
    url: other.url,
    title: other.title,
    engine: other.data.engine,
    track: other.data.track.toUpperCase(),
    imageSrc: image?.type === "image" ? image.src : null,
    imageWidth: image?.type === "image" ? image.width : undefined,
    imageHeight: image?.type === "image" ? image.height : undefined,
  }));
}

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

  const linkedResources: Record<string, LinkedResourceInfo> = {};
  if (entry.kind === "example" || entry.kind === "foundation") {
    for (const resourceId of entry.data.resourceIds || []) {
      const resource = content.get("resource", resourceId);
      if (!resource) continue;
      linkedResources[resourceId] = {
        id: resourceId,
        name: resource.title,
        summary: resource.description,
        category: resource.data.category,
        resource: resource.data,
        identity:
          sources.identities[resourceId as keyof typeof sources.identities] ||
          null,
      };
    }
  }

  return {
    entry,
    communityKey: isGameEntry(entry)
      ? entry.key
      : entry.kind === "repository-research" && entry.data.game_access
        ? content.collectionDiscoveryFor(entry).key
        : null,
    linkedResources,
    relatedGames: isGameEntry(entry) ? pickRelatedGames(content, entry) : [],
    cases:
      entry.kind === "resource"
        ? content.examplesFor({ kind: "resource", id: entry.id })
        : [],
    demos: entry.kind === "resource" ? content.demosFor(entry.id) : [],
  };
}
export default function ContentPage() {
  const { t } = useSiteI18n();
  const { entry, linkedResources, relatedGames, cases, demos, communityKey } =
    useLoaderData<typeof loader>();
  // Static builds have no community server: no panel, so no outline link to it.
  const discussionKey = communityEnabled ? communityKey : null;
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
  if (isGameEntry(entry))
    return (
      <main
        id="main-content"
        className={`site-main content-page game-detail-page game-detail-${entry.kind}`}
      >
        <title>{`${entry.title} — GameMap`}</title>
        <meta name="description" content={entry.description} />
        <GameDocument
          entry={entry}
          linkedResources={linkedResources}
          relatedGames={relatedGames}
          hasCommunity={Boolean(discussionKey)}
        >
          {discussionKey && <CommunityPanel gameKey={discussionKey} />}
        </GameDocument>
      </main>
    );
  const recordings = recordingOrder(demos);
  const Mark =
    entry.kind === "resource"
      ? categoryGlyphs[entry.data.category]
      : entry.kind === "testing"
        ? testingKindGlyphs[entry.data.kind]
        : entry.kind === "agent"
          ? agentKindGlyphs[entry.data.kind]
          : undefined;
  const extras: RecordOutlineItem[] = [
    ...(recordings.length
      ? [{ id: "record-recordings", label: t("All project recordings") }]
      : []),
    ...(discussionKey
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
      {!researchRecordVisible(entry.kind, entry.data) && (
        <meta name="robots" content="noindex" />
      )}
      <RecordDocument
        entry={entry}
        extras={extras}
        mark={Mark && <CatalogIcon icon={Mark} />}
      >
        <RecordShelf
          id="record-recordings"
          title={t("All project recordings")}
          note={t("Choose a preview or open the original recording.")}
          entries={recordings}
        />
        {discussionKey && <CommunityPanel gameKey={discussionKey} />}
        <RecordShelf
          id="record-related"
          title={t("Related examples")}
          entries={cases}
        />
      </RecordDocument>
    </main>
  );
}
