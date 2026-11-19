import type { ReactNode } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ChevronDown, Search } from "lucide-react";
import { ExampleCard } from "../components/example-card";
import { ResearchGameCard } from "../components/research-game-card";
import {
  CommunityWorkCard,
  useCommunityWorks,
} from "../components/community-work-card";
import { ImportedThreejsCard } from "../components/imported-threejs-card";
import open3dImport from "../../content/open3d-import.config.json";
import { researchGamesForExamples } from "../../content/research-games";
import { useClientQuery } from "../lib/client-query";
import { publicAsset } from "../lib/catalog";
import { contentFor, sources } from "../../content/registry.server";
import { localizeGameplayMedia } from "../../content/localization.server";
import { matchesSearch } from "../../content/matching";
import { agentLabels, type AgentId } from "../../src/data/agentGameTypes";
import { searchableText } from "../../content/search";
import { ContentDocument } from "../components/content";
import { useSiteI18n } from "../lib/i18n";
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

/** "Real games. *Open* starting points." → one <em> accent; translators move
 *  the asterisks (Chinese keeps upright type, see gallery.css). */
function emphasize(text: string): ReactNode {
  return text
    .split(/\*([^*]+)\*/)
    .map((part, index) =>
      index % 2 ? <em key={index}>{part}</em> : part || null,
    );
}

export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  const nativeGames = [...content.all("example"), ...content.all("foundation")];
  const importedThreejs = content
    .all("threejs-game")
    .filter((entry) =>
      open3dImport.includedLegacyThreejsIds.includes(entry.id),
    );
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
    researchGames: researchGamesForExamples(
      content.all("repository-research"),
      [...nativeGames, ...importedThreejs],
    ).map((entry) => ({
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
    pageCovers: sources.pageCovers,
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
      pageCovers,
      attribution,
      mosaic,
    } = useLoaderData<typeof loader>(),
    [params, setParams] = useClientQuery();
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
  const update = (key: string, value: string) => {
    // History updates before the large grid commits. Compose rapid edits from
    // the current URL so clearing search and clicking a filter cannot revive it.
    const next = new URLSearchParams(window.location.search);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, {
      replace: true,
      preventScrollReset: true,
      flushSync: true,
    });
  };
  const games = examples.filter(
    (entry) =>
      (track === "all" || entry.data.track === track) &&
      (client === "all" ||
        (attribution[entry.id] || []).includes(client as AgentId)) &&
      matchesSearch(entry.searchText.join(""), query),
  );
  const linkedGames = researchGames.filter(
    (entry) =>
      client === "all" &&
      (track === "all" || entry.data.game_access.track === track) &&
      matchesSearch(entry.searchText.join(""), query),
  );
  const importedGames = importedThreejs.filter(
    (entry) =>
      client === "all" &&
      (track === "all" || track === "3d") &&
      matchesSearch(entry.searchText.join(""), query),
  );
  const submittedGames = works.filter(
    (work) =>
      client === "all" &&
      (track === "all" || work.track === track) &&
      matchesSearch(
        `${work.title} ${work.description} ${work.engine} ${work.author}`,
        query,
      ),
  );
  const gameCount =
    games.length +
    linkedGames.length +
    importedGames.length +
    submittedGames.length;
  const sourceOnlyCount =
    games.filter((entry) => entry.data.demo.kind === "source").length +
    importedGames.length;
  const referenceOnlyCount = games.filter(
    (entry) => entry.data.demo.kind === "reference",
  ).length;
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
            <span className="kicker">{t("Games")}</span>
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
                aria-label={t("Search game examples")}
                placeholder={t("Find a game, engine, or AI workflow…")}
                value={query}
                onChange={(event) => update("q", event.target.value)}
              />
            </label>
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
          <div className="gallery-results">
            <span aria-live="polite">
              {t("{count} game examples", { count: gameCount })}
              {sourceOnlyCount > 0 && (
                <>
                  {" "}
                  ·{" "}
                  {t("{count} source-only / unverified", {
                    count: sourceOnlyCount,
                  })}
                </>
              )}
              {referenceOnlyCount > 0 && (
                <>
                  {" "}
                  ·{" "}
                  {t("{count} project references / source unverified", {
                    count: referenceOnlyCount,
                  })}
                </>
              )}
            </span>
            <span>
              {t("Creator evidence · Playable builds · Project source")}
            </span>
          </div>
        </div>
        {worksUnavailable && (
          <p className="community-error" role="status">
            {t(
              "Community submissions could not be loaded. Existing catalog games remain available.",
            )}{" "}
            <button onClick={() => void refreshWorks()}>{t("Retry")}</button>
          </p>
        )}
        {gameCount > 0 && (
          <div
            id="game-examples"
            className="example-grid"
            aria-label={t("Game examples")}
          >
            {linkedGames.map((entry) => (
              <ResearchGameCard
                key={entry.key}
                entry={entry}
                media={researchMedia[entry.id]}
              />
            ))}
            {importedGames.map((entry) => (
              <ImportedThreejsCard
                key={entry.key}
                entry={entry}
                media={gameplayMedia[entry.key]}
                pageCover={pageCovers[entry.key]}
              />
            ))}
            {submittedGames.map((work) => (
              <CommunityWorkCard work={work} key={work.key} />
            ))}
            {games.map((entry) => (
              <ExampleCard
                key={entry.key}
                game={entry.data}
                descriptionLanguage={entry.descriptionLanguage}
                media={gameplayMedia[entry.key] || media[entry.id]}
                pageCover={pageCovers[entry.key]}
              />
            ))}
          </div>
        )}
        {!gameCount && (
          <div className="empty-state gallery-empty">
            <h2>{t("No games found.")}</h2>
            <p>{t("Try another title, engine, or AI tool.")}</p>
            <button
              className="button button-secondary"
              onClick={() => setParams({})}
            >
              {t("Clear filters")}
            </button>
          </div>
        )}
      </div>
      <section className="gallery-collections">
        <header className="gallery-section-head">
          <span className="kicker">{t("Community")}</span>
          <h2>{emphasize(t("Community *collections*"))}</h2>
          <p>{t("Discover more projects in community-curated collections.")}</p>
        </header>
        <div className="content-grid community-collections">
          {collections.map((entry) => (
            <ContentDocument key={entry.key} entry={entry} heading="h3" />
          ))}
        </div>
      </section>
    </main>
  );
}
