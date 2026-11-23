import { useMemo } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { contentFor } from "../../content/registry.server";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { researchRecordVisible } from "../../content/research-visibility";
import type { ContentEntry } from "../../content/models";
import { researchLedger } from "../lib/collection-stats";
import { collectionPage, updateCollectionQuery } from "../lib/collection-query";
import { ContentCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";
import { Link, useSiteI18n } from "../lib/i18n";
import {
  CollectionPagination,
  IndexEmpty,
  IndexHero,
} from "../components/catalog-browser";

const researchTopics = [
  "games",
  "shooters",
  "engines",
  "agents",
  "tools",
  "research",
] as const;
type ResearchTopic = (typeof researchTopics)[number];

const groupTopic: Record<string, ResearchTopic> = {
  reference: "games",
  core: "games",
  games_more: "games",
  fps_more: "shooters",
  ai_games: "games",
  harness: "agents",
  components: "engines",
  classics: "games",
  woc_ecosystem: "games",
  awesome: "games",
};

const discoveryTopic: Record<string, ResearchTopic> = {
  "genex-games/genex-desktop": "agents",
  "mrzh7/scam-with-your-friends-web": "games",
  "minedojo/voyager": "research",
  "baai-agents/cradle": "research",
  "eloialonso/diamond": "research",
  "solaris-wm/solaris": "research",
  "wenyiwu0111/rsigame": "research",
  "jefferysha0627/agent-office-3d": "agents",
  "jimntu/gamedirector_code": "research",
  "melonjs/melonjs": "engines",
  "esengine/estella": "engines",
  "soonfx-engine/core": "engines",
  "luckyyyyy/miu2d": "engines",
  "majidmanzarpour/vibe-coding-starter-pack-3d-multiplayer": "tools",
  "jamesun921/cam-run": "games",
  "freeciv/freeciv-web": "games",
  "wellingfeng/ultragamestudio": "agents",
  "yc-software/minecraft-agent-harness": "agents",
  "jamesiv4/nethack-3d": "games",
  "dammafra/drysland": "games",
  "openwebgal/webgal": "engines",
  "ill-inc/biomes-game": "games",
  "excaliburjs/excalibur": "engines",
  "tentone/nunustudio": "engines",
  "eva-engine/eva.js": "engines",
  "evanbacon/expo-crossy-road": "games",
  "evanbacon/pillar-valley": "games",
  "mattsurabian/duckhunt-js": "games",
  "priler/dino3d": "games",
  "megabyteceer/thing-editor": "tools",
  "axaq/traviso.js": "engines",
  "acatovic/ai-game-studio": "tools",
  "piqnt/stage.js": "engines",
  "ad044/laintsx": "games",
  "yomotsu/meshwalk": "engines",
  "jahrome907/minecraft-agent-skills": "agents",
  "rmalde/minecraft-agent": "agents",
  "patch-gg/trompe": "tools",
  "iercann/notblox": "games",
  "icecreamyou/nemesis": "shooters",
  "magestudio/mage": "engines",
};

function topicFor(entry: ContentEntry<"repository-research">): ResearchTopic {
  const data = entry.data;
  if (data.group === "discoveries_2026") {
    const mapped = discoveryTopic[data.requested_repo.toLowerCase()];
    if (mapped) return mapped;
  }
  return groupTopic[data.group] ?? "games";
}

function isHiddenResearch(entry: ContentEntry<"repository-research">): boolean {
  return !researchRecordVisible("repository-research", entry.data);
}

const description =
  "Browse more game repositories beyond the examples gallery.";

export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    records: researchLedger(content),
  };
}
export default function RepositoryResearch() {
  const { t } = useSiteI18n(),
    { records: allRecords } = useLoaderData<typeof loader>(),
    [params, setParams, hydrated] = useClientQuery();
  const records = useMemo(
    () => allRecords.filter((entry) => !isHiddenResearch(entry)),
    [allRecords],
  );
  const hiddenCount = allRecords.length - records.length;
  const query = params.get("q") || "",
    status = params.get("status") || "all",
    topic = params.get("topic") || "all";
  const searchIndex = useMemo(
    () => new Map(records.map((entry) => [entry.key, searchableText(entry)])),
    [records],
  );
  const filtered = useMemo(
    () =>
      records.filter(
        (entry) =>
          (topic === "all" || topicFor(entry) === topic) &&
          (status === "all" || entry.data.disposition === status) &&
          matchesSearch(searchIndex.get(entry.key) ?? "", query),
      ),
    [records, searchIndex, topic, status, query],
  );
  const topicCounts = useMemo(
    () =>
      researchTopics.map((value) => ({
        value,
        count: records.filter((entry) => topicFor(entry) === value).length,
      })),
    [records],
  );
  const topicLabels: Record<ResearchTopic, string> = {
    games: t("Games & playable builds"),
    shooters: t("Shooters & FPS"),
    engines: t("Engines & frameworks"),
    agents: t("Game AI & agents"),
    tools: t("Tools, editors & assets"),
    research: t("Research & benchmarks"),
  };
  const pagination = collectionPage(params.get("page"), filtered.length);
  const visible = hydrated
    ? filtered.slice(pagination.start - 1, pagination.end)
    : filtered;
  const update = (key: string, value: string) =>
    setParams((previous) => updateCollectionQuery(previous, { [key]: value }), {
      replace: key !== "page",
      preventScrollReset: true,
    });
  const turnPage = (page: number) => {
    update("page", String(page));
    document
      .getElementById("collection-results")
      ?.scrollIntoView({ block: "start" });
  };
  const paging = (position: "top" | "bottom") =>
    hydrated && (
      <CollectionPagination
        pagination={pagination}
        onPageChange={turnPage}
        label={
          position === "top" ? "Collection pages" : "More collection pages"
        }
      />
    );
  const dispositions = [
    ...new Set(records.map((entry) => entry.data.disposition)),
  ];
  return (
    <main id="main-content" className="ix-page ix-research">
      <title>{t("Repository research ledger — GameMap")}</title>
      <meta name="description" content={t(description)} />
      <IndexHero
        pillar="research"
        title="The repository research ledger."
        lede={description}
        count={records.length}
        countLabel="repositories reviewed"
      >
        <div className="heading-links">
          <Link to="/examples/#game-examples">
            {t("Game examples")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </IndexHero>
      <div className="ix-wrap">
        <nav className="ix-topics" aria-label={t("Research topics")}>
          <button
            type="button"
            aria-pressed={topic === "all"}
            onClick={() => update("topic", "all")}
          >
            <span>{t("All topics")}</span>
            <span>{records.length}</span>
          </button>
          {topicCounts.map((item, index) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={topic === item.value}
              disabled={!item.count}
              onClick={() => update("topic", item.value)}
            >
              <span>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {topicLabels[item.value]}
              </span>
              <span>{item.count}</span>
            </button>
          ))}
        </nav>
        <div className="ix-bar">
          <label className="ix-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              aria-label={t("Search repository research")}
              placeholder={t(
                "Search repository, scope, license, or qualification…",
              )}
              value={query}
              onChange={(event) => update("q", event.target.value)}
            />
          </label>
          <div className="ix-bar-selects">
            <label className="ix-select ix-select-wide">
              <select
                aria-label={t("Research disposition")}
                value={status}
                onChange={(event) => update("status", event.target.value)}
              >
                <option value="all">{t("All dispositions")}</option>
                {dispositions.map((value) => (
                  <option key={value} value={value}>
                    {t(value)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="ix-meta" id="collection-results">
          <h2 className="ix-meta-title" aria-live="polite">
            {t("{count} of {total} research records", {
              count: filtered.length,
              total: records.length,
            })}
          </h2>
          <span className="ix-meta-rule" aria-hidden="true" />
          <span>{t("Numbered in ledger order")}</span>
        </div>
        {hiddenCount > 0 && (
          <p className="ix-quality-note">
            {t(
              "{count} unavailable, archived, forked or placeholder records are hidden from this list. The complete audit ledger remains available to download.",
              { count: hiddenCount },
            )}
          </p>
        )}
        {paging("top")}
        <div className="content-grid ix-ledger ix-ledger-numbered">
          {visible.map((entry) => (
            <ContentCard key={entry.key} entry={entry} />
          ))}
        </div>
        {!filtered.length && (
          <IndexEmpty
            title="No matching research records."
            body="Try fewer words, another topic, or another disposition."
          />
        )}
        {paging("bottom")}
      </div>
    </main>
  );
}
