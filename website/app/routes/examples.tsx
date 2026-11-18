import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Search } from "lucide-react";
import { ExampleCard } from "../components/example-card";
import { ResearchGameCard } from "../components/research-game-card";
import {
  CommunityWorkCard,
  useCommunityWorks,
} from "../components/community-work-card";
import { useCommunityText } from "../lib/community";
import { ImportedThreejsCard } from "../components/imported-threejs-card";
import open3dImport from "../../content/open3d-import.config.json";
import { researchGamesForExamples } from "../../content/research-games";
import { useClientQuery } from "../lib/client-query";
import { contentFor, sources } from "../../content/registry.server";
import { localizeGameplayMedia } from "../../content/localization.server";
import { matchesSearch } from "../../content/matching";
import { agentLabels, type AgentId } from "../../src/data/agentGameTypes";
import { searchableText } from "../../content/search";
import { ContentDocument } from "../components/content";
import { useSiteI18n } from "../lib/i18n";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  const nativeGames = [...content.all("example"), ...content.all("foundation")];
  const importedThreejs = content
    .all("threejs-game")
    .filter((entry) =>
      open3dImport.includedLegacyThreejsIds.includes(entry.id),
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
    } = useLoaderData<typeof loader>(),
    [params, setParams] = useClientQuery();
  const {
    works,
    error: worksUnavailable,
    refresh: refreshWorks,
  } = useCommunityWorks();
  const communityText = useCommunityText();
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
      <header className="page-heading">
        <span className="eyebrow">{t("LEARN BY EXPLORING")}</span>
        <h1>{t("Real games. Open starting points.")}</h1>
        <p>
          {t(
            "Play a game, follow the creator’s process, and explore the project behind it.",
          )}
        </p>
        <p>
          {t(
            "AI authorship is optional. Community games retain source evidence and explicit verification limits.",
          )}
        </p>
      </header>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={19} />
          <input
            aria-label={t("Search game examples")}
            placeholder={t("Find a game, engine, or AI workflow…")}
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
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
        <div className="segmented-control" aria-label={t("Game dimension")}>
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
      <div className="results-meta">
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
        <span>{t("Creator evidence · Playable builds · Project source")}</span>
      </div>
      {worksUnavailable && (
        <p className="community-error" role="status">
          {communityText(
            "Community submissions could not be loaded. Existing catalog games remain available.",
            "用户投稿暂时无法加载，已有目录游戏仍可正常浏览。",
          )}{" "}
          <button onClick={() => void refreshWorks()}>
            {communityText("Retry", "重试")}
          </button>
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
        <div className="empty-state">
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
      <section className="content-index-section">
        <div className="section-top">
          <div>
            <h2>{t("Community collections")}</h2>
            <p>
              {t("Discover more projects in community-curated collections.")}
            </p>
          </div>
        </div>
        <div className="content-grid community-collections">
          {collections.map((entry) => (
            <ContentDocument key={entry.key} entry={entry} heading="h3" />
          ))}
        </div>
      </section>
    </main>
  );
}
