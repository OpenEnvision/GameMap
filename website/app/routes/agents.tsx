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
  return (
    <main id="main-content" className="site-main listing-page">
      <title>{t("Agent toolkit & game code — GameMap")}</title>
      <meta
        name="description"
        content={t("Find instructions, engine bridges, and source code.")}
      />
      <header className="page-heading">
        <span className="eyebrow">
          {t("CLIENTS, SKILLS & ACTUAL GAME CODE")}
        </span>
        <h1>{t("From an agent to a working loop.")}</h1>
        <p>{t("Find instructions, engine bridges, and source code.")}</p>
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
      </header>
      <div className="catalog-toolbar agent-filters">
        <div className="filter-search">
          <Search size={19} />
          <input
            aria-label={t("Search agent resources")}
            placeholder={t("Search skills, bridges, code, or limitations…")}
            value={query}
            onChange={(event) => change("q", event.target.value)}
          />
        </div>
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
      </div>
      <div className="results-meta">
        <span aria-live="polite">
          {t("{count} toolkit entries", { count: tools.length })}
        </span>
        <span>
          {t("Agent-neutral tools remain included when filtering a client.")}
        </span>
      </div>
      <section className="content-index-section">
        <h2>{t("Skills, bridges & development tools")}</h2>
        <div className="content-grid">
          {tools.map((entry) => (
            <ContentCard key={entry.key} entry={entry} />
          ))}
        </div>
        {!tools.length && (
          <p className="empty-state">
            {t(
              "No matching toolkit entries. Try another category or fewer keywords.",
            )}
          </p>
        )}
      </section>
    </main>
  );
}
