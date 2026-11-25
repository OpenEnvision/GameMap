import { useRef } from "react";
import {
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { Bot, Search } from "lucide-react";
import { content, contentFor } from "../../content/registry.server";
import { url } from "../../content/site";
import {
  agentBrowserOptions,
  agentFilterKeys,
  groupAgentEntries,
  normalizeAgentFilters,
  selectAgentEntries,
  updateAgentQuery,
} from "../../content/agent-browser";
import { agentClientIds } from "../../content/agent-presentation";
import { agentLabels } from "../../src/data/agentGameTypes";
import { agentSearchText } from "../../content/agent-browser.server";
import {
  AgentToolCard,
  agentClientGlyphs,
} from "../components/agent-tool-card";
import { CatalogIcon } from "../components/catalog-icon";
import { useClientQuery } from "../lib/client-query";
import { Link, useSiteI18n } from "../lib/i18n";
import { IndexEmpty, IndexHero } from "../components/catalog-browser";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";

const setupLinks = [
  ["codex", "Codex"],
  ["claude-code", "Claude Code"],
  ["gemini-cli", "Gemini CLI"],
  ["playwright-mcp", "Playwright MCP"],
] as const;

export function loader({ request }: LoaderFunctionArgs) {
  return {
    tools: contentFor(request).all("agent"),
    options: agentBrowserOptions(content.all("agent")),
    searchText: agentSearchText(),
  };
}

export default function Agents() {
  const { t } = useSiteI18n();
  const {
    tools: allTools,
    options,
    searchText,
  } = useLoaderData<typeof loader>();
  const [params] = useClientQuery();
  const navigate = useNavigate();
  const searchInput = useRef<HTMLInputElement>(null);
  const filters = normalizeAgentFilters(params, options);
  const { client, kind, engine, includeGeneral } = filters;
  const query = params.get("q") || "";
  const tools = selectAgentEntries(
    allTools,
    filters,
    searchText,
    options.entryEngines,
  );
  const invalidFilters = (["client", "kind", "engine"] as const).filter(
    (key) => params.has(key) && params.get(key) !== filters[key],
  );
  const active = Boolean(
    query ||
    client !== "all" ||
    kind !== "all" ||
    engine !== "all" ||
    params.has("includeGeneral") ||
    invalidFilters.length,
  );
  const specificClient = client !== "all" && client !== "agent-neutral";
  const generalCount = specificClient
    ? tools.filter((entry) => !agentClientIds(entry.data).includes(client))
        .length
    : 0;
  const changeQuery = (
    changes: Partial<Record<(typeof agentFilterKeys)[number], string | null>>,
  ) => {
    const next = updateAgentQuery(
      new URLSearchParams(window.location.search),
      changes,
      options,
    );
    void navigate(
      { search: next.size ? `?${next}` : "", hash: window.location.hash },
      { replace: true, preventScrollReset: true, flushSync: true },
    );
  };
  const change = (key: (typeof agentFilterKeys)[number], value: string) =>
    changeQuery({ [key]: value });
  const clear = () => {
    changeQuery(Object.fromEntries(agentFilterKeys.map((key) => [key, null])));
    searchInput.current?.focus({ preventScroll: true });
  };
  const groups = groupAgentEntries(tools, options.kinds, filters.query);

  return (
    <main id="main-content" className="ix-page ix-agents">
      <title>{t("Agent toolkit & game code — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Skills, engine bridges, workflows and source code for building games, with gameplay research kept in its own category.",
        )}
      />
      <IndexHero
        pillar="tools"
        title="From an agent to a working loop."
        lede="Skills, engine bridges, workflows and source code for building games, with gameplay research kept in its own category."
        count={allTools.length}
        countLabel="reviewed entries"
      >
        <div className="heading-links">
          <Link
            to={
              url.page("examples") +
              (specificClient && Object.hasOwn(agentLabels, client)
                ? `?client=${encodeURIComponent(client)}`
                : "")
            }
          >
            {t("Game examples")}
          </Link>
          <Link to={url.document("evaluation/agent-interfaces")}>
            {t("Read the evidence & boundaries")}
          </Link>
        </div>
      </IndexHero>
      <div className="ix-wrap">
        <nav
          className="agent-resource-links"
          aria-label={t("Client setup and browser automation")}
        >
          <span>{t("Client setup and browser automation")}</span>
          {setupLinks.map(([id, label]) => (
            <Link key={id} to={url.resource(id)} className="inline-icon-label">
              <CatalogIcon icon={agentClientGlyphs[id] ?? Bot} size="inline" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="ix-bar agent-filters">
          <label className="ix-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              ref={searchInput}
              aria-label={t("Search agent resources")}
              placeholder={t("Search skills, bridges, code, or limitations…")}
              value={query}
              onChange={(event) => change("q", event.target.value)}
            />
          </label>
          <div className="ix-bar-selects">
            <label className="ix-select">
              <select
                aria-label={t("Coding client")}
                value={client}
                onChange={(event) => change("client", event.target.value)}
              >
                <option value="all">{t("All documented clients")}</option>
                {options.clients.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(item.label)} · {item.count}
                  </option>
                ))}
                <option value="agent-neutral">
                  {t("Client-independent references")}
                </option>
              </select>
            </label>
            <label className="ix-select">
              <select
                aria-label={t("Engine family")}
                value={engine}
                onChange={(event) => change("engine", event.target.value)}
              >
                <option value="all">{t("All engine families")}</option>
                {options.engines.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(item.label)} · {item.count}
                  </option>
                ))}
              </select>
            </label>
            <label className="ix-select">
              <select
                aria-label={t("Agent resource kind")}
                value={kind}
                onChange={(event) => change("kind", event.target.value)}
              >
                <option value="all">{t("All toolkit categories")}</option>
                {options.kinds.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(item.label)} · {item.count}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="agent-filter-context">
          {specificClient && (
            <label className="agent-general-toggle">
              <input
                type="checkbox"
                checked={includeGeneral}
                onChange={(event) =>
                  change("includeGeneral", event.target.checked ? "1" : "")
                }
              />
              {t("Include client-independent references")}
            </label>
          )}
          <p>
            {t(
              "Client tags follow the cited sources; they do not mean every integration has been tested.",
            )}
          </p>
        </div>
        <div className="ix-meta agent-results-meta">
          <span aria-live="polite" aria-atomic="true">
            <strong>
              {t("Showing {count} of {total} entries", {
                count: tools.length,
                total: allTools.length,
              })}
            </strong>
            {generalCount > 0 && (
              <span className="agent-general-count">
                {t("{count} client-independent references included", {
                  count: generalCount,
                })}
              </span>
            )}
          </span>
          {active && (
            <button type="button" className="agent-clear" onClick={clear}>
              {t("Clear filters")}
            </button>
          )}
        </div>
        {invalidFilters.length > 0 && (
          <p className="agent-filter-notice" role="status">
            {t("Unknown filters were ignored.")}
          </p>
        )}
        <div className="content-index-section ix-chapters">
          {groups.map((group) => (
            <section
              className="ix-chapter"
              key={group.id}
              aria-labelledby={`agent-kind-${group.id}`}
            >
              <header className="ix-chapter-head">
                <h2 id={`agent-kind-${group.id}`}>{t(group.label)}</h2>
                <span className="ix-chapter-count">
                  {group.entries.length === group.count
                    ? t("{count} toolkit entries", { count: group.count })
                    : t("{count} of {total}", {
                        count: group.entries.length,
                        total: group.count,
                      })}
                </span>
                {group.id === "gameplay-evaluation" && (
                  <p className="agent-research-note">
                    {t(
                      "Gameplay benchmarks measure agents playing games, not agents building them.",
                    )}
                  </p>
                )}
              </header>
              <div className="agent-tool-list">
                {group.entries.map((entry) => (
                  <AgentToolCard
                    key={entry.key}
                    entry={entry}
                    generalMatch={
                      specificClient &&
                      !agentClientIds(entry.data).includes(client)
                    }
                  />
                ))}
              </div>
            </section>
          ))}
          {!tools.length && (
            <IndexEmpty
              title="No entries match these filters."
              body="Clear filters or try another client, engine, category or keyword."
            >
              <button type="button" className="agent-clear" onClick={clear}>
                {t("Clear filters")}
              </button>
            </IndexEmpty>
          )}
        </div>
      </div>
    </main>
  );
}
