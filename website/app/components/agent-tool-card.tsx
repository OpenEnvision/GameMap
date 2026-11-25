import {
  Blocks,
  Bot,
  CodeXml,
  PanelsTopLeft,
  ScanLine,
  SquareTerminal,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { ContentEntry } from "../../content/models";
import {
  agentClientIds,
  agentClientLabels,
  agentConnections,
} from "../../content/agent-presentation";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { agentKindGlyphs } from "../lib/catalog";
import { CatalogIcon } from "./catalog-icon";

const codeLabels = {
  implementation: "Implementation",
  instructions: "Instructions",
  mixed: "Mixed implementation and instructions",
};

export const agentClientGlyphs: Readonly<
  Record<string, LucideIcon | undefined>
> = {
  codex: CodeXml,
  "claude-code": SquareTerminal,
  "gemini-cli": Terminal,
  antigravity: PanelsTopLeft,
  cursor: PanelsTopLeft,
  opencode: Terminal,
  aider: Terminal,
  cline: Blocks,
  windsurf: PanelsTopLeft,
  kiro: PanelsTopLeft,
  pi: Terminal,
  "roo-code": Blocks,
  qoder: PanelsTopLeft,
  "playwright-mcp": ScanLine,
};

export function AgentToolCard({
  entry,
  generalMatch = false,
}: {
  entry: ContentEntry<"agent">;
  generalMatch?: boolean;
}) {
  const { t } = useSiteI18n();
  const tool = entry.data;
  const clients = agentClientIds(tool).filter((id) => id !== "agent-neutral");
  const connection = agentConnections[entry.id];
  return (
    <article className="agent-tool-card" data-content-ref={entry.key}>
      <div className="agent-entry-heading">
        <div className="agent-entry-labels">
          <span>{t(codeLabels[tool.codeType])}</span>
          {generalMatch && <span>{t("Client-independent reference")}</span>}
        </div>
        <h3 className="agent-entry-title">
          <CatalogIcon icon={agentKindGlyphs[tool.kind]} size="small" />
          <Link to={entry.url}>{entry.title}</Link>
        </h3>
        <p className="agent-entry-provenance">
          {t(
            tool.official
              ? "First-party project"
              : "Independent / community project",
          )}
        </p>
        <time dateTime={tool.reviewed} className="agent-entry-reviewed">
          {t("Source reviewed {date}", { date: tool.reviewed })}
        </time>
      </div>
      <div className="agent-entry-body">
        <SourceLanguage english={entry.descriptionLanguage === "en"} />
        <p
          lang={
            entry.descriptionLanguage === "zh"
              ? "zh-CN"
              : entry.descriptionLanguage
          }
        >
          {entry.description}
        </p>
        <dl className="agent-entry-facts">
          <div>
            <dt>{t("Engine / runtime")}</dt>
            <dd>{tool.engine}</dd>
          </div>
          <div>
            <dt>{t("Listed clients")}</dt>
            <dd>
              {clients.length ? (
                <ul className="agent-client-list" role="list">
                  {clients.map((id) => (
                    <li key={id} className="inline-icon-label">
                      <CatalogIcon
                        icon={agentClientGlyphs[id] ?? Bot}
                        size="inline"
                      />
                      {t(agentClientLabels[id])}
                    </li>
                  ))}
                </ul>
              ) : (
                t("Client-independent reference")
              )}
            </dd>
          </div>
        </dl>
        {connection && (
          <div className="agent-entry-connection">
            <dl className="agent-connection-facts">
              <div>
                <dt>{t("Runs in")}</dt>
                <dd>{t(connection.deployment)}</dd>
              </div>
              <div>
                <dt>{t("Connection")}</dt>
                <dd>{t(connection.connection)}</dd>
              </div>
              <div>
                <dt>{t("Before connecting")}</dt>
                <dd>{t(connection.prerequisites)}</dd>
              </div>
            </dl>
            <a
              className="agent-entry-setup"
              href={connection.setupUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t("Setup guide")}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
