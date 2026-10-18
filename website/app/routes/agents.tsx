import { Link } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { content, url } from "../../content/registry";
import {
  agentLabels,
  agentResourceKinds,
  type AgentId,
} from "../../src/data/agentGameTypes";
import { ContentCard } from "../components/content";
import { ExampleCard } from "../components/example-card";
import { useClientQuery } from "../lib/client-query";
import { searchableText } from "../../content/search";

export default function Agents() {
  const [params, setParams] = useClientQuery();
  const query = params.get("q") || "";
  const client = params.get("client") || "all";
  const kind = params.get("kind") || "all";
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const tools = content
    .all("agent")
    .filter(
      (entry) =>
        (kind === "all" || entry.data.kind === kind) &&
        (client === "all" ||
          entry.data.agents.includes(client as AgentId) ||
          entry.data.agents.includes("agent-neutral")) &&
        tokens.every((token) =>
          searchableText(entry).toLowerCase().includes(token),
        ),
    );
  const games = content
    .all("example")
    .filter(
      (entry) =>
        (client === "all" ||
          content.attributionFor(entry.id).includes(client as AgentId)) &&
        tokens.every((token) =>
          searchableText(entry).toLowerCase().includes(token),
        ),
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
      <title>Agent toolkit & game code — GameMap</title>
      <meta
        name="description"
        content="Filter coding-agent skills, engine bridges, frameworks, evaluations, and complete game-code examples without confusing client attribution with model names."
      />
      <header className="page-heading">
        <span className="eyebrow">CLIENTS, SKILLS & ACTUAL GAME CODE</span>
        <h1>From an agent to a working loop.</h1>
        <p>
          Find instructions, engine bridges, and source code. Game attribution
          follows creator evidence—not related-tool links. A model name alone
          does not identify a coding client.
        </p>
        <div className="heading-links">
          <Link to={url.document("coding-agent-game-code")}>
            Read the evidence & boundaries
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>
      <div className="catalog-toolbar agent-filters">
        <div className="filter-search">
          <Search size={19} />
          <input
            aria-label="Search agent resources"
            placeholder="Search skills, bridges, code, or limitations…"
            value={query}
            onChange={(event) => change("q", event.target.value)}
          />
        </div>
        <select
          aria-label="Client or model"
          value={client}
          onChange={(event) => change("client", event.target.value)}
        >
          <option value="all">All clients & models</option>
          {Object.entries(agentLabels).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        <select
          aria-label="Agent resource kind"
          value={kind}
          onChange={(event) => change("kind", event.target.value)}
        >
          <option value="all">All toolkit categories</option>
          {Object.entries(agentResourceKinds).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="results-meta">
        <span aria-live="polite">
          {tools.length} toolkit entries · {games.length} attributed game
          examples
        </span>
        <span>
          Agent-neutral tools remain included when filtering a client.
        </span>
      </div>
      <section className="content-index-section">
        <h2>Skills, bridges & development tools</h2>
        <div className="content-grid">
          {tools.map((entry) => (
            <ContentCard key={entry.key} entry={entry} />
          ))}
        </div>
        {!tools.length && (
          <p className="empty-state">
            No matching toolkit entries. Try another category or fewer keywords.
          </p>
        )}
      </section>
      <section className="content-index-section">
        <h2>Creator-attributed game examples</h2>
        <p className="reading-note">
          Toolkit category filters apply to tools only. Game examples are
          filtered by attribution and keywords; they are not evidence that every
          listed integration was used.
        </p>
        <div className="example-grid">
          {games.map((entry) => (
            <ExampleCard key={entry.key} game={entry.data} />
          ))}
        </div>
        {!games.length && (
          <p className="empty-state">
            No reviewed game case matches this attribution. This is not a claim
            about the client’s capabilities.
          </p>
        )}
      </section>
    </main>
  );
}
