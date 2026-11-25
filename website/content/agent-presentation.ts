import type { AgentGameResource } from "../src/data/agentGameTypes";
import { agentLabels } from "../src/data/agentGameTypes";

/** Discovery labels can evolve without changing the frozen v1 attribution payload. */
export const agentClientLabels: Record<string, string> = {
  ...agentLabels,
  qoder: "Qoder",
};

export function agentClientIds(
  resource: Pick<AgentGameResource, "id" | "agents">,
): readonly string[] {
  return resource.id === "qoder-cn-mcp-client" ? ["qoder"] : resource.agents;
}

export interface AgentConnection {
  deployment: string;
  connection: string;
  prerequisites: string;
  setupUrl: string;
}

/** Exact, reviewed entry-level facts, not transport or compatibility inference.
 * Source URLs match the cited setup/source material in each catalog record.
 * Keep editor authoring, game-runtime feedback and hosted services distinct.
 */
export const agentConnections: Readonly<Record<string, AgentConnection>> = {
  "phaser-game-agent-bridge": {
    deployment: "Hosted workspace",
    connection:
      "Native HTTP MCP or a local stdio bridge, depending on the client.",
    prerequisites:
      "Phaser account and hosted service access. Check current credit requirements.",
    setupUrl: "https://github.com/phaserjs/phaser-game-agent",
  },
  "codex-roblox-studio-bridge": {
    deployment: "Local editor + local service",
    connection:
      "A Python command queue connects the Codex subprocess and Studio plugin. Screenshot helpers target Windows.",
    prerequisites:
      "Roblox Studio, Python and authenticated Codex CLI. The launcher uses unattended approval settings.",
    setupUrl: "https://github.com/foxycuter2-ai/codex-roblox-studio-bridge",
  },
  "ione-unity-claude": {
    deployment: "Local editor",
    connection: "Opt-in localhost HTTP bridge with bearer authentication.",
    prerequisites:
      "Unity 2022.3+ and the enabled bridge. The Claude Code route needs no separate provider key.",
    setupUrl: "https://github.com/TestcodeInc/ione",
  },
  "godot-forge-editor-bridge": {
    deployment: "Local editor / runtime",
    connection:
      "MCP bridge and editor add-on. Runtime feedback needs a debug-connected game.",
    prerequisites:
      "Godot 4.4+ and Node 20+. Documentation, tests and export also have headless paths.",
    setupUrl: "https://github.com/Tann2019/godot-mcp-server",
  },
  "godot-forge-code-quality": {
    deployment: "Local editor / headless tools",
    connection:
      "MCP tools for feedback. Editor diagnostics use LSP and tests launch Godot.",
    prerequisites:
      "Godot plus GUT or GdUnit4 for tests. Verify test counts and exit status. Screenshots need a display.",
    setupUrl: "https://github.com/gregario/godot-forge",
  },
  "godot-cli-live-editor": {
    deployment: "Local editor / headless tools",
    connection: "Go CLI with a stdio MCP wrapper and an editor daemon.",
    prerequisites:
      "Godot and the daemon for live authoring. Source builds require Go. Open and save the active scene explicitly.",
    setupUrl: "https://github.com/trunglqdev/Godot_CLI",
  },
  "gda-godot-agent": {
    deployment: "Local editor / runtime",
    connection: "Python CLI and MCP surface with a live development harness.",
    prerequisites:
      "Python 3.13+. Headless operations require Godot 4.4+ and Live mode requires 4.6+. Runtime screenshots need a display.",
    setupUrl: "https://github.com/aigengame/godot-agent",
  },
  "agent2unity-cli": {
    deployment: "Local editor",
    connection:
      ".NET CLI calls a localhost HTTP editor daemon. The reviewed route accepts unauthenticated requests.",
    prerequisites:
      "Running Unity Editor, daemon and .NET SDK 8. Tests require Unity Test Framework.",
    setupUrl: "https://github.com/jkpp/agent2unity-cli",
  },
  "summer-gemini-engine-extension": {
    deployment: "Local editor + online services",
    connection:
      "CLI / MCP integration for the separate Summer desktop application.",
    prerequisites:
      "Summer desktop app. Hosted generation and publishing require a Summer account. Paid operations consume credits.",
    setupUrl: "https://github.com/summerengine/summer",
  },
  "gemini-cli-godot-dock-bridge": {
    deployment: "Local editor",
    connection:
      "The editor dock starts a Python backend and runs Gemini CLI through it.",
    prerequisites:
      "Godot, Python and authenticated Gemini CLI. The documented macOS/Linux setup needs a shell-command adjustment.",
    setupUrl: "https://github.com/AlexonMorris/gemini_assistant_godot_plugin",
  },
  "unity-ai-official-mcp": {
    deployment: "Local editor / headless tools",
    connection:
      "Unity CLI through unity mcp, or direct unity command / unity eval.",
    prerequisites:
      "Unity CLI and Pipeline package. Editor control requires Unity 6.0 LTS+. Unity AI has a separate subscription.",
    setupUrl:
      "https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli",
  },
  "roblox-studio-official-mcp": {
    deployment: "Local editor",
    connection:
      "Enable the Studio MCP server and configure an external MCP client.",
    prerequisites:
      "Roblox Studio with the required beta features enabled. Some image workflows need your own API key.",
    setupUrl: "https://create.roblox.com/docs/studio/mcp",
  },
  "epic-unreal-mcp-official": {
    deployment: "Local editor",
    connection:
      "Loopback Streamable HTTP and SSE are the supported transports.",
    prerequisites:
      "Unreal Engine 5.9 with the Editor running and MCP toolsets enabled. The experimental server accepts unauthenticated requests by default.",
    setupUrl:
      "https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor",
  },
  "cocos-creator-mcp-extension": {
    deployment: "Local editor",
    connection:
      "Project extension with a local Streamable HTTP server and bundled stdio bridge.",
    prerequisites:
      "Cocos Creator 3.8+. Install and build the project extension, then configure the client.",
    setupUrl: "https://github.com/harady/cocos-creator-mcp",
  },
  "accelbyte-ags-official-mcp": {
    deployment: "Hosted backend / self-hosted SDK server",
    connection:
      "The API MCP uses account authentication. The separate SDK server can be self-hosted with Docker.",
    prerequisites:
      "AGS account and environment with permission to access the backend APIs.",
    setupUrl:
      "https://docs.gamingservices.xsolla.com/gaming-services/services/developer-tools/ags-api-mcp-server",
  },
  "aura-autopilot-open-playtester": {
    deployment: "Local editor + local service",
    connection:
      "Engine plugin and Autopilot service, with MCP access for coding agents.",
    prerequisites:
      "Windows or macOS, a supported engine build, and an Aura account or model keys. Review data-sharing settings.",
    setupUrl: "https://www.tryaura.dev/documentation/autopilot",
  },
  "godot-ai-assistant-hub": {
    deployment: "Local editor + configured model provider",
    connection: "Assistants running inside the editor call the plugin’s tools.",
    prerequisites:
      "Godot 4.3+ and a separately configured model provider. Local providers such as Ollama are supported.",
    setupUrl: "https://github.com/FlamxGames/godot-ai-assistant-hub",
  },
  "gdevelop-official-mcp-bridge": {
    deployment: "Local editor + online services",
    connection:
      "Loopback Streamable HTTP with a bearer access key. Each session connects to one editor window.",
    prerequisites:
      "GDevelop desktop on the same computer with agent access enabled. Event generation and asset lookup need sign-in.",
    setupUrl: "https://wiki.gdevelop.io/gdevelop5/interface/ai/mcp/",
  },
};
