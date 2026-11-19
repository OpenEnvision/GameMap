import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { contentFor } from "../../content/registry.server";
import { url } from "../../content/site";
import { matchesSearch } from "../../content/matching";
import {
  agentLabels,
  agentResourceKinds,
  type AgentId,
} from "../../src/data/agentGameTypes";
import { ContentCard } from "../components/content";
import { useClientQuery } from "../lib/client-query";
import { searchableText } from "../../content/search";
import { Link, useSiteI18n } from "../lib/i18n";
import { IndexEmpty, IndexHero } from "../components/catalog-browser";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return { tools: content.all("agent") };
}
export default function Agents() {
  const { t } = useSiteI18n(),
    { tools: allTools } = useLoaderData<typeof loader>(),
    [params, setParams] = useClientQuery();
  const query = params.get("q") || "",
    client = params.get("client") || "all",
    kind = params.get("kind") || "all";
  const tools = allTools.filter(
    (entry) =>
      (kind === "all" || entry.data.kind === kind) &&
      (client === "all" ||
        entry.data.agents.includes(client as AgentId) ||
        entry.data.agents.includes("agent-neutral")) &&
      matchesSearch(searchableText(entry), query),
  );
  const change = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (!value || value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  const kinds = [
    ...Object.keys(agentResourceKinds),
    ...new Set(
      allTools
        .map((entry) => entry.data.kind as string)
        .filter((id) => !(id in agentResourceKinds)),
    ),
  ];
  const groups = kinds
    .map((id) => ({
      id,
      label: agentResourceKinds[id as keyof typeof agentResourceKinds] || id,
      total: allTools.filter((entry) => entry.data.kind === id).length,
      entries: tools.filter((entry) => entry.data.kind === id),
    }))
    .filter((group) => group.entries.length > 0);
  return (
    <main id="main-content" className="ix-page ix-agents">
      <title>{t("Agent toolkit & game code — GameMap")}</title>
      <meta
        name="description"
        content={t("Find instructions, engine bridges, and source code.")}
      />
      <IndexHero
        pillar="tools"
        kicker="CLIENTS, SKILLS & ACTUAL GAME CODE"
        title="From an agent to a working loop."
        lede="Find instructions, engine bridges, and source code."
        count={allTools.length}
        countLabel="toolkit entries"
      >
        <div className="heading-links">
          <Link
            to={
              url.page("examples") +
              (client === "all" ? "" : `?client=${encodeURIComponent(client)}`)
            }
          >
            {t("Game examples")}
            <ArrowRight size={14} />
          </Link>
          <Link to={url.document("coding-agent-game-code")}>
            {t("Read the evidence & boundaries")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </IndexHero>
      <div className="ix-wrap">
        <div className="ix-bar">
          <label className="ix-search">
            <Search size={18} aria-hidden="true" />
            <input
              aria-label={t("Search agent resources")}
              placeholder={t("Search skills, bridges, code, or limitations…")}
              value={query}
              onChange={(event) => change("q", event.target.value)}
            />
          </label>
          <div className="ix-bar-selects">
            <label className="ix-select">
              <select
                aria-label={t("Client or model")}
                value={client}
                onChange={(event) => change("client", event.target.value)}
              >
                <option value="all">{t("All clients & models")}</option>
                {Object.entries(agentLabels).map(([id, label]) => (
                  <option key={id} value={id}>
                    {t(label)}
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
                {Object.entries(agentResourceKinds).map(([id, label]) => (
                  <option key={id} value={id}>
                    {t(label)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="ix-meta">
          <span aria-live="polite">
            <strong>
              {t("{count} toolkit entries", { count: tools.length })}
            </strong>
          </span>
          <span className="ix-meta-rule" aria-hidden="true" />
          <span>
            {t("Agent-neutral tools remain included when filtering a client.")}
          </span>
        </div>
        <div className="content-index-section ix-chapters">
          {groups.map((group) => (
            <section
              className="ix-chapter"
              key={group.id}
              aria-labelledby={`agent-kind-${group.id}`}
            >
              <header className="ix-chapter-head">
                <span className="ix-chapter-num" aria-hidden="true">
                  {String(kinds.indexOf(group.id) + 1).padStart(2, "0")}
                </span>
                <h2 id={`agent-kind-${group.id}`}>{t(group.label)}</h2>
                <span className="ix-chapter-count">
                  {group.entries.length === group.total
                    ? t("{count} toolkit entries", { count: group.total })
                    : t("{count} of {total}", {
                        count: group.entries.length,
                        total: group.total,
                      })}
                </span>
              </header>
              <div className="content-grid ix-ledger">
                {group.entries.map((entry) => (
                  <ContentCard key={entry.key} entry={entry} />
                ))}
              </div>
            </section>
          ))}
          {!tools.length && (
            <IndexEmpty
              title="No matching toolkit entries."
              body="Try another category or fewer keywords."
            />
          )}
        </div>
      </div>
    </main>
  );
}
