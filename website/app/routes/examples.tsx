import { useRef, type ReactNode } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import {
  CollectionPagination,
  IndexEmpty,
} from "../components/catalog-browser";
import { ExampleCard } from "../components/example-card";
import { ResearchGameCard } from "../components/research-game-card";
import {
  CommunityWorkCard,
  useCommunityWorks,
} from "../components/community-work-card";
import { ImportedThreejsCard } from "../components/imported-threejs-card";
import { exampleGames } from "../lib/collection-stats";
import { useClientQuery } from "../lib/client-query";
import { collectionPage, updateCollectionQuery } from "../lib/collection-query";
import { publicAsset } from "../lib/catalog";
import { contentFor, sources } from "../../content/registry.server";
import { localizeGameplayMedia } from "../../content/localization.server";
import { matchesSearch } from "../../content/matching";
import { agentLabels, type AgentId } from "../../src/data/agentGameTypes";
import { searchableText } from "../../content/search";
import { ContentBlockView, ContentLink } from "../components/content";
import { contentKinds, type ContentEntry } from "../../content/models";
import { url } from "../../content/site";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";

/** Reviewed gameplay captures that make up the drifting header collage.
 *  Purely decorative: every one of them also appears as a card below. */
const mosaicPicks = [
  "dragons-reach-claude",
  "jam-blub-blub-pop",
  "jam-crystal-dash",
  "jam-polygon-protocol",
  "jam-autumn-preserves",
  "jam-blackwater",
  "flux-codex-runner",
  "jam-codeware",
  "jam-enchanted-towers-realm-defenders",
  "jam-nekogotchi",
  "jam-bevy-five-bullet-heaven",
  "jam-luxel",
  "jam-cordyception",
  "jam-lovely-masqueraid",
  "jam-foursight",
  "jam-cat-crop-collector",
  "jam-marble-mechanical-flower",
  "jam-dragon-city-clone-escalopa",
];
const mosaicRows = 3;

/** "github.com/owner" or "itch.io": where a community collection lives. */
function collectionHost(href: string) {
  try {
    const { hostname, pathname } = new URL(href);
    const host = hostname.replace(/^www\./, "");
    const owner = pathname.split("/")[1];
    return host === "github.com" && owner ? `${host}/${owner}` : host;
  } catch {
    return "";
  }
}

/** A community collection tile. It keeps the record contract of
 *  ContentDocument (canonical anchor, content key, one element per field) but
 *  labels its link row with where the collection lives instead of repeating
 *  the button text. */
function CollectionTile({ entry }: { entry: ContentEntry<"collection"> }) {
  const { t } = useSiteI18n();
  return (
    <article
      id={entry.url.split("#")[1]}
      className="content-record content-collection"
      data-content-key={entry.key}
      data-content-kind={entry.kind}
    >
      <span className="eyebrow">{t(contentKinds[entry.kind].label)}</span>
      <SourceLanguage english={entry.descriptionLanguage === "en"} />
      {entry.blocks.map((block, index) =>
        block.type === "links" ? (
          <section
            key={`${block.field}-${index}`}
            className="content-field gallery-collection-links"
            data-content-field={block.field}
          >
            <span className="gallery-collection-host" translate="no">
              {collectionHost(block.items[0]?.url || "")}
            </span>
            <ul className="content-links">
              {block.items.map((item, itemIndex) => (
                <li key={`${itemIndex}-${item.url}`}>
                  <ContentLink href={item.url}>
                    {t(item.label)}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </ContentLink>
                  {item.note && <p lang="en">{item.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <ContentBlockView
            key={`${block.field}-${index}`}
            block={block}
            heading="h3"
          />
        ),
      )}
    </article>
  );
}

/** "Real games. *Open* starting points." → one <em> accent; translators move
 *  the asterisks (Chinese keeps upright type, see gallery.css). */
function emphasize(text: string): ReactNode {
  return text
    .split(/\*([^*]+)\*/)
    .map((part, index) =>
      index % 2 ? <em key={index}>{part}</em> : part || null,
    );
}

/** The URL keys this page filters by; anything else in the query (campaign
 *  tags and the like) survives clearing. */
const filterKeys = ["q", "track", "client", "access"] as const;
const accessOptions = {
  all: "All access types",
  playable: "Play in browser",
  download: "Downloadable build",
  source: "Source only",
  reference: "Project reference",
} as const;
// The grid shows 1–5 columns (gallery.css); 60 divides by each, so every
// page except the last one ends on a full row.
const pageSize = 60;

export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  const {
    native: nativeGames,
    imported: importedThreejs,
    linked: researchGames,
  } = exampleGames(content);
  const captures = new Map(
    Object.values(sources.learningMedia).map((media) => [
      media.src.replace(/^.*\/|\.\w+$/g, ""),
      media,
    ]),
  );
  return {
    // Full evidence stays on detail pages; avoid duplicating its field blocks in the grid.
    examples: nativeGames.map((entry) => ({
      key: entry.key,
      id: entry.id,
      data: entry.data,
      descriptionLanguage: entry.descriptionLanguage,
      searchText: searchableText(entry).split(/(https?:\/\/\S+)/),
    })),
    researchGames: researchGames.map((entry) => ({
      key: entry.key,
      id: entry.id,
      data: entry.data,
      description: entry.description,
      descriptionLanguage: entry.descriptionLanguage,
      url: entry.url,
      searchText: searchableText(entry).split(/(https?:\/\/\S+)/),
    })),
    importedThreejs: importedThreejs.map((entry) => ({
      key: entry.key,
      id: entry.id,
      data: entry.data,
      description: entry.description,
      descriptionLanguage: entry.descriptionLanguage,
      url: entry.url,
      searchText: searchableText(entry).split(/(https?:\/\/\S+)/),
    })),
    collections: content.all("collection"),
    media: sources.learningMedia,
    gameplayMedia: Object.fromEntries(
      Object.entries(sources.gameplayScreenshots || {}).map(([key, value]) => [
        key,
        localizeGameplayMedia(value.media, content.byKey(key)?.locale || "en"),
      ]),
    ),
    researchMedia: sources.researchGameMedia,
    attribution: sources.gameCaseAgents,
    mosaic: mosaicPicks.flatMap((name) => {
      const media = captures.get(name);
      return media
        ? [{ src: media.src, width: media.width, height: media.height }]
        : [];
    }),
  };
}
export default function Examples() {
  const { t } = useSiteI18n(),
    {
      examples,
      researchGames,
      importedThreejs,
      collections,
      media,
      gameplayMedia,
      researchMedia,
      attribution,
      mosaic,
    } = useLoaderData<typeof loader>(),
    [params, setParams, hydrated] = useClientQuery();
  const {
    works,
    error: worksUnavailable,
    refresh: refreshWorks,
  } = useCommunityWorks();
  const query = params.get("q") || "",
    track = params.get("track") || "all",
    client = Object.hasOwn(agentLabels, params.get("client") || "")
      ? params.get("client")!
      : "all";
  const requestedAccess = params.get("access") || "";
  const access = Object.hasOwn(accessOptions, requestedAccess)
    ? (requestedAccess as keyof typeof accessOptions)
    : "all";
  const matchesAccess = (kind: string) => access === "all" || access === kind;
  const summary = useRef<HTMLInputElement>(null);
  const results = useRef<HTMLParagraphElement>(null);
  const update = (key: string, value: string) => {
    // Compose rapid edits from the current URL; filter changes reset the page.
    const next = updateCollectionQuery(
      new URLSearchParams(window.location.search),
      { [key]: value },
    );
    setParams(next, {
      replace: key !== "page",
      preventScrollReset: true,
      flushSync: true,
    });
  };
  const turnPage = (page: number) => {
    update("page", String(page));
    results.current?.focus({ preventScroll: true });
    results.current?.scrollIntoView({ block: "start", behavior: "instant" });
  };
  /** Clearing from the empty state removes the control that had focus; return
   *  keyboard users to the search field just above. */
  const settleFocus = () => summary.current?.focus({ preventScroll: true });
  const removeFilter = (key: (typeof filterKeys)[number]) => {
    update(key, "");
    settleFocus();
  };
  const clearFilters = () => {
    const next = new URLSearchParams(window.location.search);
    for (const key of filterKeys) next.delete(key);
    next.delete("page");
    setParams(next, {
      replace: true,
      preventScrollReset: true,
      flushSync: true,
    });
    settleFocus();
  };
  const activeFilters = [
    ...(query ? ([["q", `“${query}”`]] as const) : []),
    ...(track !== "all" ? ([["track", track.toUpperCase()]] as const) : []),
    ...(client !== "all"
      ? ([["client", t(agentLabels[client as AgentId])]] as const)
      : []),
    ...(access !== "all"
      ? ([["access", t(accessOptions[access])]] as const)
      : []),
  ];
  const games = examples.filter(
    (entry) =>
      matchesAccess(entry.data.demo.kind) &&
      (track === "all" || entry.data.track === track) &&
      (client === "all" ||
        (attribution[entry.id] || []).includes(client as AgentId)) &&
      matchesSearch(entry.searchText.join(""), query),
  );
  const linkedGames = researchGames.filter(
    (entry) =>
      matchesAccess(entry.data.game_access.kind) &&
      client === "all" &&
      (track === "all" || entry.data.game_access.track === track) &&
      matchesSearch(entry.searchText.join(""), query),
  );
  const importedGames = importedThreejs.filter(
    (entry) =>
      matchesAccess("source") &&
      client === "all" &&
      (track === "all" || track === "3d") &&
      matchesSearch(entry.searchText.join(""), query),
  );
  const submittedGames = works.filter(
    (work) =>
      matchesAccess(work.accessKind) &&
      client === "all" &&
      (track === "all" || work.track === track) &&
      matchesSearch(
        `${work.title} ${work.description} ${work.engine} ${work.author}`,
        query,
      ),
  );
  const allGames = [
    ...linkedGames.map((entry) => ({
      type: "research" as const,
      entry,
      media: researchMedia[entry.id],
    })),
    ...importedGames.map((entry) => ({
      type: "imported" as const,
      entry,
      media: gameplayMedia[entry.key],
    })),
    ...submittedGames.map((work) => ({ type: "submitted" as const, work })),
    ...games.map((entry) => ({
      type: "native" as const,
      entry,
      media: gameplayMedia[entry.key] || media[entry.id],
    })),
  ];
  if (!query && track === "all" && client === "all" && access === "all") {
    const hasScreenshot = (game: (typeof allGames)[number]) =>
      game.type === "submitted"
        ? Boolean(game.work.screenshots[0])
        : Boolean(game.media);
    allGames.sort(
      (a, b) => Number(hasScreenshot(b)) - Number(hasScreenshot(a)),
    );
  }
  const gameCount = allGames.length;
  const pagination = collectionPage(params.get("page"), gameCount, pageSize);
  // Static HTML retains the complete catalog; the browser pages the combined
  // result so research, imported, submitted and native games share one range.
  const visibleGames = hydrated
    ? allGames.slice(pagination.start - 1, pagination.end)
    : allGames;
  // Live header figures follow the same filters as the grid.
  const shown = [
    ...games.map((entry) => [entry.data.track, entry.data.demo.kind]),
    ...linkedGames.map((entry) => [
      entry.data.game_access.track,
      entry.data.game_access.kind,
    ]),
    ...importedGames.map(() => ["3d", "source"]),
    ...submittedGames.map((work) => [work.track, work.accessKind]),
  ];
  const stats = [
    ["Playable builds", shown.filter(([, kind]) => kind === "playable").length],
    ["3D games", shown.filter(([dimension]) => dimension === "3d").length],
    ["2D games", shown.filter(([dimension]) => dimension === "2d").length],
  ] as const;
  const perRow = Math.ceil(mosaic.length / mosaicRows);
  return (
    <main
      id="main-content"
      className="site-main listing-page game-listing-page"
    >
      <title>{t("Game examples — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Play a game, follow the creator’s process, and explore the project behind it.",
        )}
      />
      <header className="gallery-hero">
        <div className="gallery-hero-backdrop" aria-hidden="true">
          <div className="gallery-mosaic">
            {Array.from({ length: mosaicRows }, (_, row) => (
              <div className="gallery-mosaic-row" key={row}>
                {mosaic
                  .slice(row * perRow, row * perRow + perRow)
                  .map((image) => (
                    <img
                      key={image.src}
                      src={publicAsset(image.src)}
                      alt=""
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
        <div className="gallery-hero-inner">
          <div className="gallery-hero-copy">
            <h1 className="gallery-title">
              {emphasize(t("Real games. *Open* starting points."))}
            </h1>
            <p className="lede">
              {t(
                "Play a game, follow the creator’s process, and explore the project behind it.",
              )}
            </p>
            <p className="gallery-hero-note">
              {t(
                "AI authorship is optional. Community games retain source evidence and explicit verification limits.",
              )}
            </p>
            <Link
              className="gallery-study-link"
              to={url.document("guides/browser-game-case-study")}
            >
              {t("Study a browser game")}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <dl className="gallery-stats">
            <div className="gallery-stat-total">
              <dt>{t("Games in view")}</dt>
              <dd>{gameCount}</dd>
            </div>
            {stats.map(([label, value]) => (
              <div key={label}>
                <dt>{t(label)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>
      <div className="gallery-atlas">
        <div className="gallery-dock">
          <div className="gallery-controls">
            <label className="gallery-search">
              <Search size={18} aria-hidden="true" />
              <input
                ref={summary}
                aria-label={t("Search game examples")}
                placeholder={t("Find a game, engine, or AI workflow…")}
                value={query}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="search"
                onChange={(event) => update("q", event.target.value)}
                onKeyDown={(event) => {
                  // A plain text field (its role stays "textbox"), so Escape
                  // clears it the way a native search field would.
                  if (event.key === "Escape" && query) {
                    event.preventDefault();
                    update("q", "");
                  }
                }}
              />
            </label>
            <div className="gallery-select gallery-access">
              <select
                aria-label={t("Access type")}
                value={access}
                onChange={(event) => update("access", event.target.value)}
              >
                {Object.entries(accessOptions).map(([id, label]) => (
                  <option key={id} value={id}>
                    {t(label)}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </div>
            <div className="gallery-select">
              <select
                aria-label={t("Client or model")}
                value={client}
                onChange={(event) => update("client", event.target.value)}
              >
                <option value="all">{t("All clients & models")}</option>
                {Object.entries(agentLabels).map(([id, label]) => (
                  <option key={id} value={id}>
                    {t(label)}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </div>
            <div
              className="gallery-segments"
              role="group"
              aria-label={t("Game dimension")}
            >
              {[
                ["all", "All games"],
                ["2d", "2D"],
                ["3d", "3D"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  aria-pressed={track === id}
                  onClick={() => update("track", id)}
                >
                  {t(label)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <noscript>
          <p className="catalog-sidebar-note">
            {t(
              "All games are shown. Enable JavaScript to filter and browse by page.",
            )}
          </p>
        </noscript>
        {worksUnavailable && (
          <p className="community-error" role="status">
            {t(
              "Community submissions could not be loaded. Existing catalog games remain available.",
            )}{" "}
            <button onClick={() => void refreshWorks()}>{t("Retry")}</button>
          </p>
        )}
        {gameCount > 0 && (
          <>
            <div className="catalog-results-bar gallery-results">
              <p
                id="game-results"
                ref={results}
                tabIndex={-1}
                aria-live="polite"
              >
                {hydrated
                  ? t("{start}–{end} of {count} records", {
                      start: pagination.start,
                      end: pagination.end,
                      count: gameCount,
                    })
                  : t("{count} records", { count: gameCount })}
              </p>
            </div>
            <div
              id="game-examples"
              className="example-grid"
              role="region"
              aria-label={t("Game examples")}
            >
              {visibleGames.map((item) => {
                switch (item.type) {
                  case "research":
                    return (
                      <ResearchGameCard
                        key={item.entry.key}
                        entry={item.entry}
                        media={item.media}
                      />
                    );
                  case "imported":
                    return (
                      <ImportedThreejsCard
                        key={item.entry.key}
                        entry={item.entry}
                        media={item.media}
                      />
                    );
                  case "submitted":
                    return (
                      <CommunityWorkCard work={item.work} key={item.work.key} />
                    );
                  case "native":
                    return (
                      <ExampleCard
                        key={item.entry.key}
                        game={item.entry.data}
                        descriptionLanguage={item.entry.descriptionLanguage}
                        media={item.media}
                      />
                    );
                }
              })}
            </div>
            {hydrated && pagination.pages > 1 && (
              <div className="catalog-bottom-pagination gallery-pagination">
                <CollectionPagination
                  pagination={pagination}
                  onPageChange={turnPage}
                  label="More collection pages"
                />
              </div>
            )}
          </>
        )}
        {!gameCount && (
          <IndexEmpty
            title="No games found."
            body="Try another search or change a filter."
            className="gallery-empty"
            seed={29}
          >
            {activeFilters.length > 0 && (
              <ul
                className="gallery-empty-filters"
                aria-label={t("Active filters")}
              >
                {activeFilters.map(([key, label]) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => removeFilter(key)}
                      aria-label={t("Remove filter: {filter}", {
                        filter: label,
                      })}
                    >
                      <span>{label}</span>
                      <X size={13} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              className="button button-secondary"
              onClick={clearFilters}
            >
              {t("Clear filters")}
            </button>
          </IndexEmpty>
        )}
      </div>
      <section id="community-collections" className="gallery-collections">
        <header className="gallery-section-head">
          <h2>{emphasize(t("Community *collections*"))}</h2>
          <p>{t("Discover more projects in community-curated collections.")}</p>
        </header>
        <div className="content-grid community-collections">
          {collections.map((entry) => (
            <CollectionTile key={entry.key} entry={entry} />
          ))}
        </div>
      </section>
    </main>
  );
}
