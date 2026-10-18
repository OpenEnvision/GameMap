import type { AgentGameResource } from './agentGameTypes';
export { agentLabels, agentResourceKinds } from './agentGameTypes';
export { gameCaseAgents } from './gameCaseAgents';

// Primary source and implementation review: October 18, 2026. No third-party tool installation implied.
export const agentGameResources: AgentGameResource[] = [
  {
    "id": "codex-official-browser-game-workflow",
    "title": "Codex · official browser-game build and playtest workflow",
    "kind": "workflow",
    "agents": [
      "codex"
    ],
    "engine": "Browser games · Phaser / PixiJS",
    "summary": "OpenAI’s game-development workflow connects a written game plan, project instructions, generated assets, and live browser playtesting.",
    "sourceUrl": "https://learn.chatgpt.com/use-cases/browser-games",
    "codeUrl": "https://github.com/openai/skills/blob/main/skills/.curated/playwright-interactive/SKILL.md",
    "evidenceUrl": "https://learn.chatgpt.com/use-cases/browser-games",
    "codeType": "instructions",
    "codeScope": "Official game workflow and the linked Playwright Interactive skill, including persistent-session JavaScript examples for functional and visual checks.",
    "limitations": "A workflow and skill reference, not a game engine or finished project. The game stack and runtime must be supplied separately. Read the skill’s current environment requirements before use.",
    "publisher": "OpenAI",
    "official": true,
    "reviewed": "2026-10-18"
  },
  {
    "id": "claude-game-toolkit",
    "title": "Claude Code Game Toolkit · Canvas engine and templates",
    "kind": "framework",
    "agents": [
      "claude-code"
    ],
    "engine": "HTML Canvas 2D / JavaScript",
    "summary": "Combines Claude game-development commands and domain skills with a small JavaScript engine, playable genre templates, and examples that can be inspected as real code.",
    "sourceUrl": "https://github.com/hanifwdyt/claude-code-game-toolkit",
    "codeUrl": "https://github.com/hanifwdyt/claude-code-game-toolkit/blob/e002fdf2aaf16c0d84762b632ec8c2526399b532/lib/core/engine.js",
    "evidenceUrl": "https://github.com/hanifwdyt/claude-code-game-toolkit/blob/e002fdf2aaf16c0d84762b632ec8c2526399b532/.claude/commands/game.md",
    "codeScope": "Reviewed the Engine class and /game workflow. The tree includes lib/core, graphics, physics, input, audio and effects modules, .claude/skills, genre templates, and showcase game sources.",
    "limitations": "An early community toolkit for small browser games. Source existence and control flow were checked; its generated-game quality, portability, and quickstart behavior were not executed or benchmarked.",
    "official": false,
    "codeType": "mixed",
    "publisher": "hanifwdyt",
    "reviewed": "2026-10-18"
  },
  {
    "id": "gemini-cli-cloud-crush-source",
    "title": "Cloud Crush: Google’s Gemini CLI game source and codelab",
    "kind": "code-example",
    "agents": [
      "gemini-cli"
    ],
    "engine": "Ebitengine 2 · Go · WebAssembly",
    "summary": "Google publishes a complete match-3 game explicitly attributed to Gemini CLI, alongside a codelab covering plan mode, model steering, browser adaptation, testing, and subagents. The repository includes the resulting game rather than only instructions to generate one.",
    "sourceUrl": "https://codelabs.developers.google.com/next26/gemini-cli-match3-golang",
    "codeUrl": "https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang",
    "evidenceUrl": "https://github.com/GoogleCloudPlatform/devrel-demos/blob/main/codelabs/gemini-cli/gemini-cli-match3-golang/README.md",
    "codeScope": "Complete game project: main.go contains rendering, match rules, input, game states, audio, and scores; assets/ is committed. Includes go.mod, server/main.go, public/index.html, wasm_exec.js, Dockerfile, and publisher gameplay screenshots. Native run: go run .; the case guide also records the browser build and asset-copy steps.",
    "limitations": "Source was inspected, not locally executed. go.mod requires Go 1.26.2, despite the README’s 1.24+ claim. The WASM route must compile public/cloud-crush.wasm, copy source assets into public/assets, and use the matching Go wasm_exec.js; the current public asset directory is incomplete. Cloud deployment is optional. The creator’s generation claim is distinct from independent code-authorship verification.",
    "official": true,
    "codeType": "implementation",
    "publisher": "Google Cloud",
    "reviewed": "2026-10-18"
  },
  {
    "id": "epic-unreal-claude-skills",
    "title": "Epic Games · Unreal Engine Skills for Claude Code",
    "kind": "skill",
    "agents": [
      "claude-code"
    ],
    "engine": "Unreal Engine",
    "summary": "Epic's Claude Code plugin teaches agents to discover Unreal toolsets and operate a live editor through the native Unreal MCP surface, with a project-context session hook.",
    "sourceUrl": "https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin",
    "codeUrl": "https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin/tree/main/skills",
    "evidenceUrl": "https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin/blob/main/README.md",
    "codeScope": "Verified public skill/reference files for unreal-mcp, create-toolset, and unreal-skill, plus executable hooks/unreal-context.sh and Claude plugin metadata. This repository contains agent instructions and hook code; Unreal's engine-side ModelContextProtocol/AllToolsets implementation is not bundled.",
    "limitations": "Requires an Unreal Editor build with ModelContextProtocol and AllToolsets enabled and its server running. Windows session-context hook needs Git Bash or WSL. Only Claude Code is documented by this plugin; MCP transport availability does not establish Codex or Gemini support.",
    "official": true,
    "codeType": "mixed",
    "publisher": "Epic Games",
    "reviewed": "2026-10-18"
  },
  {
    "id": "codex-game-studio-cli",
    "title": "Codex Game Studio · local CLI and studio template",
    "kind": "framework",
    "agents": [
      "codex"
    ],
    "engine": "Godot / Unity / Unreal Engine",
    "summary": "A Codex-native workflow CLI with tracked agent roles, reusable skills, engine reference packs, project state, task orchestration, and validation.",
    "sourceUrl": "https://github.com/merlinhu1/codex-game-studio",
    "codeUrl": "https://github.com/merlinhu1/codex-game-studio/blob/main/src/cli.ts",
    "evidenceUrl": "https://github.com/merlinhu1/codex-game-studio#codex-native-execution",
    "codeType": "mixed",
    "codeScope": "TypeScript CLI, run lifecycle, task orchestration, validation code, engine configuration, and committed Codex agent/skill/workflow templates were inspected.",
    "limitations": "The package requires Node 24+ and a separately installed Codex CLI and game engine. It supplies studio workflow structure; it does not bundle a complete engine or establish game quality.",
    "publisher": "merlinhu1",
    "official": false,
    "reviewed": "2026-10-18"
  },
  {
    "id": "phaser-game-agent-bridge",
    "title": "Phaser Game Agent · Coding-Agent Bridge",
    "kind": "bridge",
    "agents": [
      "claude-code",
      "codex",
      "gemini-cli",
      "cursor",
      "copilot",
      "antigravity"
    ],
    "engine": "Phaser / browser games",
    "summary": "Phaser's own setup CLI and stdio-to-HTTP bridge connect external coding agents to a managed Phaser game-building workspace, with a thin reusable skill.",
    "sourceUrl": "https://github.com/phaserjs/phaser-game-agent",
    "codeUrl": "https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs",
    "evidenceUrl": "https://github.com/phaserjs/phaser-game-agent/blob/main/targets.mjs",
    "codeScope": "Verified JavaScript setup/login/configuration CLI, bridge.mjs JSON-RPC forwarding implementation, explicit client registry and tests, and skills/phaser-game-agent/SKILL.md. Source covers the local bridge/setup, not the hosted game-building service.",
    "limitations": "Requires a Phaser account, hosted service access, and its credit/subscription model. Client transports differ: Claude Code and VS Code use native HTTP routes; others use the stdio bridge. Qoder/Windsurf are explicitly experimental and excluded from the supported-agent list here. Do not describe the cloud builder as open source.",
    "official": true,
    "codeType": "implementation",
    "publisher": "Phaser Studio",
    "reviewed": "2026-10-18"
  },
  {
    "id": "gemini-cli-dinosaur-source",
    "title": "Dinosaur Game Offline: a Gemini CLI-assisted source example",
    "kind": "code-example",
    "agents": [
      "gemini-cli"
    ],
    "engine": "HTML · CSS · JavaScript",
    "summary": "A small offline dinosaur runner whose creator explicitly describes Gemini CLI assistance with scaffolding, game logic, debugging, and improvements. It supplies concrete game code and committed images and sounds, with no generation API needed to play.",
    "sourceUrl": "https://github.com/tonidevvn/dinosaur-game-offline",
    "codeUrl": "https://github.com/tonidevvn/dinosaur-game-offline/blob/main/script.js",
    "evidenceUrl": "https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped",
    "codeScope": "Complete static game: index.html, style.css, script.js, public/assets/ dinosaur/obstacle/background images, public/sounds/ jump/death/score audio. JavaScript implements starting, jumping, obstacle spawning, collision, scoring, and restart. Open index.html locally and press Space.",
    "limitations": "Creator disclosure names gemini-cli but provides no original conversation or exact model identifier. It is an assisted build rather than a verified autonomous-generation claim. The author-hosted game was smoke-tested for starting, jumping, scoring, collision, and restart on 2026-10-18. Its fixed-width board targets desktop keyboard play. No repository code license is declared.",
    "official": false,
    "codeType": "implementation",
    "publisher": "tonidevvn",
    "reviewed": "2026-10-18"
  },
  {
    "id": "codex-roblox-studio-bridge",
    "title": "Codex ↔ Roblox Studio bridge",
    "kind": "bridge",
    "agents": [
      "codex"
    ],
    "engine": "Roblox Studio / Luau / Python",
    "summary": "A local Python server and Roblox Studio plugin let Codex create objects, change scripts, run Luau, and communicate through an in-editor chat panel.",
    "sourceUrl": "https://github.com/foxycuter2-ai/codex-roblox-studio-bridge",
    "codeUrl": "https://github.com/foxycuter2-ai/codex-roblox-studio-bridge/blob/main/server.py",
    "evidenceUrl": "https://github.com/foxycuter2-ai/codex-roblox-studio-bridge#chat-panel",
    "codeType": "implementation",
    "codeScope": "Python command queues and Codex subprocess integration, Luau editor plugin, screenshot helper, reusable skills, and example game-building scripts are present.",
    "limitations": "Requires Roblox Studio, Python, and authenticated Codex CLI. Screenshot helpers target Windows. Its chat launcher bypasses Codex approval/sandbox checks by default; inspect that launcher before choosing this bridge. Source reviewed, not installed.",
    "publisher": "foxycuter2-ai",
    "official": false,
    "reviewed": "2026-10-18"
  },
  {
    "id": "claude-code-game-studios",
    "title": "Claude Code Game Studios · implementation skills",
    "kind": "skill",
    "agents": [
      "claude-code"
    ],
    "engine": "Godot / Unity / Unreal Engine",
    "summary": "A Claude Code skill and agent pack that turns game design stories into implementation tasks with architectural context, specialist programmers, review, and configurable completion gates.",
    "sourceUrl": "https://github.com/Donchitos/Claude-Code-Game-Studios",
    "codeUrl": "https://github.com/Donchitos/Claude-Code-Game-Studios/blob/be8993bbc5a1f016bc770b2846ce06272d284526/.claude/skills/dev-story/references/4-implement.md",
    "evidenceUrl": "https://github.com/Donchitos/Claude-Code-Game-Studios/blob/be8993bbc5a1f016bc770b2846ce06272d284526/.claude/skills/dev-story/SKILL.md",
    "codeScope": "Reviewed dev-story/SKILL.md, its implementation reference, and .claude/hooks/validate-commit.sh. These are agent instructions and executable shell validation hooks; src/ contains only a placeholder and CLAUDE.md, not a game runtime.",
    "limitations": "Requires Claude Code and a separately configured engine project. Minimal QA mode can omit tests. The workflow source does not establish autonomous completion or game quality.",
    "official": false,
    "codeType": "mixed",
    "publisher": "Donchitos",
    "reviewed": "2026-10-18"
  },
  {
    "id": "everything-game-dev-code",
    "title": "Everything Game Dev Code · multi-agent game workflow",
    "kind": "workflow",
    "agents": [
      "claude-code",
      "codex",
      "cursor",
      "opencode",
      "kiro"
    ],
    "engine": "Godot / Unity / Unreal Engine / HTML5",
    "summary": "A shared game-development workflow with engine-specific rules, coding-agent adapters, implementation and review commands, validation scripts, and complete sample game sources.",
    "sourceUrl": "https://github.com/MRCalderon3D/everything-game-dev-code",
    "codeUrl": "https://github.com/MRCalderon3D/everything-game-dev-code/tree/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/samples/LosRenacidos_Claude/src",
    "evidenceUrl": "https://github.com/MRCalderon3D/everything-game-dev-code/blob/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/commands/full-game.md",
    "codeScope": "Reviewed /full-game and the Claude sample's JavaScript bootstrap/game loop. Verified engine rules, harness adapters, scripts/validate-* utilities, and sample entities, states, rendering, input, storage and map generation.",
    "limitations": "The framework supplies instructions and integrations, not an engine. Engine bridges and optional asset-generation providers are separate dependencies. Sample harness comparisons are not controlled performance benchmarks.",
    "official": false,
    "codeType": "mixed",
    "publisher": "MRCalderon3D",
    "reviewed": "2026-10-18"
  },
  {
    "id": "tea-leaves-game-harness",
    "title": "Tea Leaves · Claude Code Godot verification harness",
    "kind": "framework",
    "agents": [
      "claude-code"
    ],
    "engine": "Godot 4.6 Mono / C# / .NET 8",
    "summary": "A reusable Godot project substrate that gives Claude Code runtime state, screenshots, simulated input, scene validation, and tests while it writes and repairs game code.",
    "sourceUrl": "https://github.com/cleak/tea-leaves",
    "codeUrl": "https://github.com/cleak/tea-leaves/blob/b465c6bdf2c283a16eaa805c5f5f4f21c1f05cc8/game/DevTools.cs",
    "evidenceUrl": "https://github.com/cleak/tea-leaves/blob/b465c6bdf2c283a16eaa805c5f5f4f21c1f05cc8/CLAUDE.md",
    "codeScope": "Reviewed the C# DevTools autoload, Python CLI, and Claude project guide. Actual code dispatches screenshot/scene-tree/state commands and asynchronous input sequences; companion validators, shader lint and test wrappers are present.",
    "limitations": "A project-specific substrate rather than a universal Godot editor bridge. Defaults assume a Windows-oriented Godot Mono toolchain and include a hard-coded monitor selection; paths and window settings need adaptation. No installation or execution was performed.",
    "official": false,
    "codeType": "implementation",
    "publisher": "cleak",
    "reviewed": "2026-10-18"
  },
  {
    "id": "ione-unity-claude",
    "title": "ione · Unity HTTP bridge and Claude Code skill",
    "kind": "bridge",
    "agents": [
      "claude-code"
    ],
    "engine": "Unity / C#",
    "summary": "Connects Claude Code to Unity through an opt-in local HTTP bridge so the agent can inspect scenes, create C# scripts, wait for compilation, and verify the game view.",
    "sourceUrl": "https://github.com/TestcodeInc/ione",
    "codeUrl": "https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/Editor/Core/IoneHttpBridge.cs",
    "evidenceUrl": "https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/ClaudeSkill/SKILL.md",
    "codeScope": "Reviewed the exact Claude skill, loopback HttpListener implementation, and AssetTools.CreateScript. The skill calls the bridge's live schema, follows script writes with wait_for_compile, and checks capture_game_view.",
    "limitations": "Requires the Unity plugin and enabled bridge. Script writes depend on the plugin's settings, and domain reload temporarily interrupts the listener. Unity must continue servicing its main thread. Direct image generation is a separate provider/API path.",
    "official": false,
    "codeType": "implementation",
    "publisher": "TestcodeInc",
    "reviewed": "2026-10-18"
  },
  {
    "id": "godot-forge-editor-bridge",
    "title": "Godot Forge · live editor and runtime bridge (Tann2019)",
    "kind": "bridge",
    "agents": [
      "claude-code",
      "codex",
      "cursor"
    ],
    "engine": "Godot 4 / GDScript",
    "summary": "An MCP server and Godot add-on for writing scripts, building editable scenes, reading diagnostics, running games, simulating input, and checking mechanics with saved scenarios.",
    "sourceUrl": "https://github.com/Tann2019/godot-mcp-server",
    "codeUrl": "https://github.com/Tann2019/godot-mcp-server/blob/b0da85fac67dd067c16bfe791227c0e7edb56d7e/addons/godot_forge/handlers/script.gd",
    "evidenceUrl": "https://github.com/Tann2019/godot-mcp-server/blob/b0da85fac67dd067c16bfe791227c0e7edb56d7e/skills/godot-forge/SKILL.md",
    "codeScope": "Reviewed script creation/edit/validation/attachment handlers, the runtime command forwarder, and the companion skill. The tree includes a TypeScript MCP bridge, GDScript editor/runtime handlers, and a platformer with a coin-collection test scenario.",
    "limitations": "Requires its Godot editor add-on and runtime connection; engine-version compatibility matters. Code review confirms implemented tool paths, not successful execution of every exposed operation. This is separate from Coding-Solo/godot-mcp and gregario/godot-forge.",
    "official": false,
    "codeType": "implementation",
    "publisher": "Tann2019",
    "reviewed": "2026-10-18"
  },
  {
    "id": "godot-forge-code-quality",
    "title": "Godot Forge · code analysis and tests (gregario)",
    "kind": "bridge",
    "agents": [
      "claude-code",
      "codex",
      "gemini-cli",
      "cursor"
    ],
    "engine": "Godot 4 / GDScript",
    "summary": "A focused MCP feedback layer for coding agents: Godot API lookup, GDScript and scene checks, actual editor diagnostics, and structured GUT/GdUnit4 test results.",
    "sourceUrl": "https://github.com/gregario/godot-forge",
    "codeUrl": "https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts",
    "evidenceUrl": "https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/script-analysis.ts",
    "codeScope": "Reviewed MCP test registration, Godot process launch and GUT/GdUnit4 output parsers; also reviewed heuristic script analysis and an LSP client that obtains editor diagnostics. Scene analysis, project launching and screenshots have separate modules.",
    "limitations": "Heuristic warnings are distinct from compiler diagnostics. Runtime tests need Godot and an installed test framework; LSP diagnostics need the editor. It supplies code feedback, not broad scene authoring.",
    "official": false,
    "codeType": "implementation",
    "publisher": "gregario",
    "reviewed": "2026-10-18"
  },
  {
    "id": "godot-cli-live-editor",
    "title": "Godot CLI · live scene authoring for coding agents",
    "kind": "bridge",
    "agents": [
      "claude-code",
      "cursor",
      "windsurf"
    ],
    "engine": "Godot 4 / GDScript / Go CLI",
    "summary": "A Go command-line client and embedded Godot editor bridge that let coding agents write scripts, construct scenes, connect signals, run checks, and inspect runtime screenshots.",
    "sourceUrl": "https://github.com/trunglqdev/Godot_CLI",
    "codeUrl": "https://github.com/trunglqdev/Godot_CLI/blob/2e8f8636ae6c5f75071a4968df114186eacad40a/addon/godot_cli_bridge/plugin.gd",
    "evidenceUrl": "https://github.com/trunglqdev/Godot_CLI/blob/2e8f8636ae6c5f75071a4968df114186eacad40a/mcp.go",
    "codeScope": "Reviewed the Go stdio MCP wrapper and the GDScript EditorPlugin's JSON-RPC dispatch and scene operations. The CLI exposes the command surface to MCP clients while Claude Code can call it through a shell; 2D and 3D acceptance game source is included.",
    "limitations": "Requires Godot plus the editor daemon for live authoring; source builds require Go. The bridge owns an active scene that must be opened/created and saved explicitly in headless mode. It is an independent community CLI, not Godot's official command-line interface.",
    "official": false,
    "codeType": "implementation",
    "publisher": "trunglqdev",
    "reviewed": "2026-10-18"
  },
  {
    "id": "gda-godot-agent",
    "title": "gda · Godot Automation for AI Agents",
    "kind": "bridge",
    "agents": [
      "claude-code",
      "codex",
      "cursor"
    ],
    "engine": "Godot",
    "summary": "A CLI, reusable skill, and MCP surface for editing Godot content, validating projects, and collecting runtime tree, input, screenshots, logs, and performance evidence.",
    "sourceUrl": "https://github.com/aigengame/godot-agent",
    "codeUrl": "https://github.com/aigengame/godot-agent/tree/main/src/gda",
    "evidenceUrl": "https://github.com/aigengame/godot-agent#register-with-coding-agents",
    "codeScope": "Verified Python CLI/MCP implementation under src/gda, daemon IPC, and an actual GDScript runtime harness at src/gda/harness/gda_harness.gd. skills/gda/SKILL.md and docs/gda-skill.md provide agent guidance; documented configuration explicitly covers Claude Code, Codex, and Cursor.",
    "limitations": "Requires Python 3.13+ and a Godot binary: 4.4+ for headless operations, 4.6+ for Live. Runtime screenshots require a display/windowed session. Live mode injects a development harness; exports must respect its stripping/self-disable behavior. Other MCP clients are not individually verified here.",
    "official": false,
    "codeType": "implementation",
    "publisher": "aigengame",
    "reviewed": "2026-10-18"
  },
  {
    "id": "godot-agent-loop",
    "title": "Godot Agent Loop",
    "kind": "framework",
    "agents": [
      "claude-code",
      "codex",
      "opencode",
      "pi"
    ],
    "engine": "Godot",
    "summary": "A Godot build–run–observe–playtest–verify loop with runtime/editor bridge code, reusable skills, and retained execution evidence.",
    "sourceUrl": "https://github.com/beremaran/godot-agent-loop",
    "codeUrl": "https://github.com/beremaran/godot-agent-loop/tree/main/src",
    "evidenceUrl": "https://github.com/beremaran/godot-agent-loop/blob/main/docs/agent-plugin.md",
    "codeScope": "Verified TypeScript server/editor bridge, addons/godot_agent_loop/plugin.gd, runtime verification code, cold-model evaluation runners, and an executable launch-demo project. One portable agent bundle exposes build/debug/verify/ship skills and explicit Claude Code, Codex, OpenCode, and Pi adapters.",
    "limitations": "Godot 4.7+ and matching prerequisites required. Platform support is bounded: Linux CI, portable Windows acceptance, and specific macOS editor workflows are reported separately. The same skill files do not establish identical engine/UI/export coverage on every client or OS.",
    "official": false,
    "codeType": "mixed",
    "publisher": "beremaran",
    "reviewed": "2026-10-18"
  },
  {
    "id": "agent2unity-cli",
    "title": "agent2unity-cli",
    "kind": "bridge",
    "agents": [
      "claude-code",
      "codex",
      "cursor",
      "gemini-cli"
    ],
    "engine": "Unity",
    "summary": "A .NET command-line client plus a C# Unity editor daemon that lets coding agents create and modify Unity assets through editor APIs and run compilation/test checks.",
    "sourceUrl": "https://github.com/jkpp/agent2unity-cli",
    "codeUrl": "https://github.com/jkpp/agent2unity-cli/tree/main/unity-plugin/Agent2Unity/Editor",
    "evidenceUrl": "https://github.com/jkpp/agent2unity-cli/tree/main/agents",
    "codeScope": "Verified .NET CLI Program.cs, C# HTTP daemon/main-thread dispatcher, serialized-field and prefab/scene commands, and Unity Test Framework command implementations. Agent integration files explicitly cover Claude Code skills, Codex AGENTS.md, Cursor rules, and Gemini CLI GEMINI.md.",
    "limitations": "Requires a running Unity Editor/daemon and .NET SDK 8. Tests require Unity Test Framework. It controls documented asset/editor operations, not arbitrary gameplay acceptance. It is a community CLI rather than Unity's official agent integration; client instruction files are not evidence of equal live testing.",
    "official": false,
    "codeType": "implementation",
    "publisher": "jkpp",
    "reviewed": "2026-10-18"
  },
  {
    "id": "unity-agent-workflow-skills",
    "title": "Unity Agent · CLI, Headless, MCP, and Package Skills",
    "kind": "skill",
    "agents": [
      "claude-code",
      "codex",
      "gemini-cli",
      "cursor",
      "copilot"
    ],
    "engine": "Unity",
    "summary": "A reusable Unity workflow pack that routes agent work through CLI probes, batchmode validation, MCP selection, package management, and evidence-based completion checks.",
    "sourceUrl": "https://github.com/m4bwav/unity-agent",
    "codeUrl": "https://github.com/m4bwav/unity-agent/tree/master/skills",
    "evidenceUrl": "https://github.com/m4bwav/unity-agent/blob/master/README.md",
    "codeScope": "Verified five SKILL.md workflows, executable unity_probe.ps1 and unity_headless.ps1 JSON-output wrappers, and PackageInstaller.cs. The README explicitly lists cross-agent skill consumption; these are community procedures around Unity tools, not the Unity CLI implementation.",
    "limitations": "The included deterministic probes/runners are PowerShell-oriented. Unity, its CLI/Pipeline package, SDKs, and chosen MCP bridge are separate dependencies; the skill pack installs none of them. Cross-agent support means documented instruction discovery, not identical end-to-end validation on all listed clients.",
    "official": false,
    "codeType": "mixed",
    "publisher": "m4bwav",
    "reviewed": "2026-10-18"
  },
  {
    "id": "unreal-mcp-codex-runners",
    "title": "Unreal Engine MCP for Codex · Community Skill and Runners",
    "kind": "workflow",
    "agents": [
      "codex"
    ],
    "engine": "Unreal Engine",
    "summary": "A community Codex adaptation of Epic's Unreal MCP workflow, with concrete command-line helpers for environment probes, automation tests, Python commandlets, builds, and smoke cooks.",
    "sourceUrl": "https://github.com/WildCake/unreal-engine-mcp-codex",
    "codeUrl": "https://github.com/WildCake/unreal-engine-mcp-codex/tree/main/skills/unreal-engine-mcp-codex/scripts",
    "evidenceUrl": "https://github.com/WildCake/unreal-engine-mcp-codex#headless-runners",
    "codeScope": "Verified actual Python implementations: check_unreal_mcp.py, run_unreal_automation.py, run_unreal_python.py, build_unreal.py, cook_unreal.py, shared process/log helpers, plus a PowerShell probe and Codex plugin/config metadata.",
    "limitations": "Documents Unreal 5.8+ native MCP and requires a separately installed engine/toolsets. Several runners and examples are Windows-oriented; Codex integration is community-maintained, not endorsed by Epic or OpenAI. It does not bundle the engine server or a complete game.",
    "official": false,
    "codeType": "mixed",
    "publisher": "WildCake",
    "reviewed": "2026-10-18"
  },
  {
    "id": "gamelogicbench",
    "title": "GameLogicBench",
    "kind": "evaluation",
    "agents": [
      "claude-code",
      "codex",
      "opencode"
    ],
    "engine": "Godot",
    "summary": "A coding-agent benchmark of 72 gameplay-logic tasks whose deterministic Godot evaluators check observable state at each simulation tick rather than grading agent-written claims.",
    "sourceUrl": "https://github.com/NJU-LINK/GameLogicBench",
    "codeUrl": "https://github.com/NJU-LINK/GameLogicBench/tree/main/geb",
    "evidenceUrl": "https://github.com/NJU-LINK/GameLogicBench/blob/main/docs/running.md",
    "codeScope": "Verified Python solve/judge/record pipeline, container/egress code, and separate claude_code.py, codex.py, and opencode.py adapters. The public GameLogicBench-Tasks repository is a separate dependency and contains the game/task/judge/reference content.",
    "limitations": "Requires Docker, a matching Godot 4.4 environment, an agent CLI package, task-library checkout, and configured model endpoints. It evaluates runtime game logic, not visual quality or finished commercial-game production. Network restrictions and task-library commit materially affect results; do not treat model backends as additional coding-agent adapters.",
    "official": false,
    "codeType": "implementation",
    "publisher": "NJU-LINK",
    "reviewed": "2026-10-18"
  },
  {
    "id": "gamecraft-bench",
    "title": "GameCraft-Bench",
    "kind": "evaluation",
    "agents": [
      "claude-code",
      "codex",
      "kimi-code"
    ],
    "engine": "Godot",
    "summary": "An end-to-end game-generation benchmark with 140 tasks across 15 families, runnable Godot workspaces, replayable input traces, screen recording, and hidden visual/gameplay rubrics.",
    "sourceUrl": "https://github.com/FreedomIntelligence/gamecraft-bench",
    "codeUrl": "https://github.com/FreedomIntelligence/gamecraft-bench/tree/main/gamecraft_bench",
    "evidenceUrl": "https://github.com/FreedomIntelligence/gamecraft-bench/blob/main/README.md",
    "codeScope": "Verified local Harbor agent/environment code, replay and scoring implementations, model-judge adapters, wrapper scripts for Claude Code/Codex/Kimi Code, and committed task instructions/reference-solution GDScript. The author's project site links this repository directly.",
    "limitations": "Godot 4.6.2 and Linux/Xvfb/input-recording dependencies are pinned in the reproduction guide. Expected asset libraries are downloaded separately, with per-entry licensing. Rubric scores depend on the judge and replay protocol; Gemini judge support is not evidence of a Gemini CLI coding-agent adapter.",
    "official": false,
    "codeType": "implementation",
    "publisher": "FreedomIntelligence",
    "reviewed": "2026-10-18"
  },
  {
    "id": "summer-gemini-engine-extension",
    "title": "Summer: Gemini CLI extension, engine MCP, and game skills",
    "kind": "bridge",
    "agents": [
      "gemini-cli",
      "antigravity",
      "codex",
      "claude-code",
      "cursor",
      "copilot",
      "opencode"
    ],
    "engine": "Summer Engine",
    "summary": "A publisher-maintained CLI/MCP integration for building scenes, writing scripts, playing games, reading errors, and taking screenshots in Summer Engine. It includes a genuine Gemini extension manifest, context file, skill packaging, and cross-agent setup code.",
    "sourceUrl": "https://github.com/summerengine/summer",
    "codeUrl": "https://github.com/summerengine/summer/blob/main/src/mcp/server.ts",
    "evidenceUrl": "https://github.com/summerengine/summer/blob/main/integrations/gemini/README.md",
    "codeScope": "CLI/MCP integration source, not the engine source. Verified src/mcp/server.ts, src/cli/commands/setup.ts, src/installer/setup.ts, gemini-extension.json, integrations/gemini/README.md, scripts/build-gemini-extension.ts, and library/skills/. The Gemini packaging document explains the actual extension skills layout rather than assuming an arbitrary manifest skills key works.",
    "limitations": "Requires the separate Summer Engine desktop application for editor operations; the repository explicitly says it is not the engine itself. Hosted asset generation and publishing require a Summer account, and generation/paid builds consume credits. Gemini is a legacy setup target alongside current Antigravity guidance. No install or end-to-end compatibility test was performed here. This is not a Google-provided integration.",
    "official": false,
    "codeType": "implementation",
    "publisher": "summerengine",
    "reviewed": "2026-10-18"
  },
  {
    "id": "gemini-cli-godot-dock-bridge",
    "title": "Gemini Assistant: a Godot dock backed by the actual Gemini CLI",
    "kind": "bridge",
    "agents": [
      "gemini-cli"
    ],
    "engine": "Godot 4 · GDScript · Python",
    "summary": "A small community Godot editor plugin that sends prompts from a dock to a Python subprocess, invokes the installed gemini command, and handles returned file/folder creation instructions. Its code confirms a CLI integration rather than a direct Gemini API chat wrapper.",
    "sourceUrl": "https://github.com/AlexonMorris/gemini_assistant_godot_plugin",
    "codeUrl": "https://github.com/AlexonMorris/gemini_assistant_godot_plugin/blob/main/gemini_backend.py",
    "evidenceUrl": "https://github.com/AlexonMorris/gemini_assistant_godot_plugin/blob/main/README.md",
    "codeScope": "Editor-plugin source: gemini_plugin.gd registers the dock, gemini_dock.gd launches Python, and gemini_backend.py runs the gemini executable, parses JSON action blocks, and creates project files. Supporting dock scene and plugin configuration are in the repository.",
    "limitations": "Prototype bridge, not a complete game or full editor-control MCP server. The backend currently uses the Windows type command; the README requires changing it to cat on macOS/Linux. The dock calls a python executable and expects placement under addons/gemini_assistant/. CLI installation/authentication are prerequisites. No runtime validation was performed.",
    "official": false,
    "codeType": "implementation",
    "publisher": "AlexonMorris",
    "reviewed": "2026-10-18"
  },
  {
    "id": "phaser-official-agent-skills",
    "title": "Phaser 4: official coding-agent skills with engine code examples",
    "kind": "skill",
    "agents": [
      "claude-code",
      "codex",
      "cursor",
      "antigravity",
      "copilot"
    ],
    "engine": "Phaser 4 · JavaScript / TypeScript",
    "summary": "The Phaser engine repository now provides subsystem skills for agent-assisted development, including scenes, Arcade/Matter physics, input, assets, cameras, animation, UI, and migration. The official README explicitly names several coding agents, and the skills contain practical API examples linked to engine source.",
    "sourceUrl": "https://github.com/phaserjs/phaser#ai-assisted-game-development",
    "codeUrl": "https://github.com/phaserjs/phaser/tree/master/skills",
    "evidenceUrl": "https://github.com/phaserjs/phaser/blob/master/skills/physics-arcade/SKILL.md",
    "codeScope": "Reusable instruction files with JavaScript examples, backed by the engine implementation. Verified skills/physics-arcade/SKILL.md includes player/platform setup, collision registration, keyboard movement, and GameConfig; it points to src/physics/arcade/. Other exact paths include skills/scenes/SKILL.md and skills/v3-to-v4-migration/SKILL.md.",
    "limitations": "Targets Phaser 4; do not silently apply its rendering/migration guidance to Phaser 3 projects. A skill is knowledge and example code, not an editor-control service or a finished game. Agent names come from the official README and are not an end-to-end compatibility certification; Google models being mentioned is not treated as proof of Gemini CLI usage.",
    "official": true,
    "codeType": "instructions",
    "publisher": "Phaser Studio",
    "reviewed": "2026-10-18"
  },
  {
    "id": "godot-prompter-agent-skills",
    "title": "GodotPrompter: multi-agent Godot skills and reusable movement code",
    "kind": "skill",
    "agents": [
      "antigravity",
      "claude-code",
      "copilot",
      "cursor",
      "codex",
      "opencode",
      "grok-build"
    ],
    "engine": "Godot 4.x · GDScript / C#",
    "summary": "A Godot-specific skill framework spanning gameplay, scene architecture, shaders, animation, testing, exports, and code review. It includes concrete GDScript/C# recipes, agent routing, platform-specific metadata, an OpenCode plugin, and machine-readable host verification status.",
    "sourceUrl": "https://github.com/jame581/GodotPrompter",
    "codeUrl": "https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller",
    "evidenceUrl": "https://github.com/jame581/GodotPrompter/blob/master/tests/agent-integration/host-smoke-matrix.json",
    "codeScope": "Skills with implementation examples and host-integration code. Verified skills/player-controller/references/common-movement-recipes.md contains GDScript and C# dash/wall-jump recipes; .opencode/plugins/godot-prompter.js injects bootstrap context and registers skills; scripts/ validates skill/platform metadata. The repository uses master, not main.",
    "limitations": "The author marks Claude Code and Copilot CLI verified, Cursor registration as awaiting end-to-end confirmation, and several other hosts as documented only. Antigravity uses a documented GEMINI.md path; this is not presented as a verified Gemini CLI integration. Skills do not directly operate the Godot editor, and version-specific examples require matching the project’s Godot version.",
    "official": false,
    "codeType": "mixed",
    "publisher": "jame581",
    "reviewed": "2026-10-18"
  },
  {
    "id": "playgama-web-game-performance-skill",
    "title": "Playgama: web-game performance skill and executable probes",
    "kind": "skill",
    "agents": [
      "gemini-cli",
      "claude-code",
      "codex",
      "cursor",
      "copilot"
    ],
    "engine": "Canvas / WebGL browser games",
    "summary": "A reusable skill that measures a running game after warm-up and guides performance fixes using frame time, JavaScript cost, draw calls, and triangles. It includes both a headless measurement script and an in-game probe for real-device observation.",
    "sourceUrl": "https://github.com/Playgama/gamedev-skills",
    "codeUrl": "https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-performance",
    "evidenceUrl": "https://github.com/Playgama/gamedev-skills/blob/main/skills/web-game-performance/README.md",
    "codeScope": "SKILL.md plus scripts/perf.mjs and scripts/probe.js. Verified perf.mjs launches Puppeteer, accepts URL, warm-up/duration, phone emulation, readiness/setup hooks, JSON output, and before/after comparison. Root README explicitly documents Gemini CLI and the other named skill hosts.",
    "limitations": "Needs Node 18+ and Puppeteer or puppeteer-core plus a Chrome executable. A throttled headless run is not a measurement of an actual phone; the author distinguishes comparable local runs from real-device telemetry. This is game-validation tooling, not a new game or a Google-authored extension.",
    "official": false,
    "codeType": "mixed",
    "publisher": "Playgama",
    "reviewed": "2026-10-18"
  },
  {
    "id": "playgama-web-game-assets-skill",
    "title": "Playgama: asset-production skill and GLB/audio build pipeline",
    "kind": "skill",
    "agents": [
      "gemini-cli",
      "claude-code",
      "codex",
      "cursor",
      "copilot"
    ],
    "engine": "Web games · glTF / GLB assets",
    "summary": "A coding-agent skill for choosing a coherent asset set, recording credits, and preparing it for shipping. Its executable pipeline cleans and compresses GLB models while preserving names, handles audio conversion, and can re-encode textures.",
    "sourceUrl": "https://github.com/Playgama/gamedev-skills",
    "codeUrl": "https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-assets",
    "evidenceUrl": "https://github.com/Playgama/gamedev-skills/blob/main/skills/web-game-assets/README.md",
    "codeScope": "SKILL.md plus scripts/assets.mjs. Verified the script’s geometry/texture/audio options, incremental hashing, name-preserving glTF processing, and CLI entry. Root installation matrix explicitly covers Gemini CLI, Claude Code, Codex, Cursor, and Copilot.",
    "limitations": "Requires Node 18+, glTF Transform, meshoptimizer, optional sharp, and ffmpeg for audio. Third-party components and assets are not bundled. This processes selected assets; it is not a generative-image/model service, a game engine, or a finished game.",
    "official": false,
    "codeType": "mixed",
    "publisher": "Playgama",
    "reviewed": "2026-10-18"
  },
  {
    "id": "gamedev-agent-skills-router",
    "title": "GameDev Agent Skills: engine router and test/code recipes",
    "kind": "skill",
    "agents": [
      "gemini-cli",
      "claude-code",
      "codex",
      "cursor",
      "copilot",
      "cline"
    ],
    "engine": "Godot · Unity · Unreal · Bevy · Phaser · PixiJS · Three.js · LÖVE · pygame · Roblox",
    "summary": "A community skill library whose router detects the project’s engine and loads task-specific guidance. Beyond a directory of links, it contains the actual skill bodies, source-backed code recipes, a skill validator, and asset-report/preview utilities.",
    "sourceUrl": "https://github.com/gamedev-skills/awesome-gamedev-agent-skills",
    "codeUrl": "https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills",
    "evidenceUrl": "https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/router/SKILL.md",
    "codeScope": "Router and engine/discipline/genre/workflow SKILL.md files. Verified skills/godot/godot-gdscript-headless-testing/SKILL.md contains a SceneTree test-runner recipe and explicit failure exit handling; scripts/validate-skills.py validates the collection; skills/disciplines/create-game-assets/scripts/ includes asset_report.py and build_preview_sheet.py. README names native Gemini CLI support.",
    "limitations": "Primarily a version-targeted instruction/example library rather than an engine-control runtime. Current Godot testing guidance targets 4.7; other engine groups have their own baselines. Install compatibility statements are the maintainer’s claims, and this research did not execute cross-agent smoke tests.",
    "official": false,
    "codeType": "instructions",
    "publisher": "gamedev-skills",
    "reviewed": "2026-10-18"
  },
  {
    "id": "aider-pong-game-editing-transcript",
    "title": "Aider: an official Pong build transcript with real code edits",
    "kind": "workflow",
    "agents": [
      "aider"
    ],
    "engine": "pygame · Python",
    "summary": "Aider’s own example records building Pong and then changing paddle colors, size, and ball behavior. It exposes the actual edit blocks and applied Git commits, making the incremental coding workflow inspectable rather than presenting an unexplained final screenshot.",
    "sourceUrl": "https://aider.chat/examples/pong.html",
    "codeUrl": "https://github.com/Aider-AI/aider/blob/main/aider/website/examples/pong.md",
    "evidenceUrl": "https://github.com/Aider-AI/aider/blob/main/aider/website/examples/2048-game.md",
    "codeScope": "Published transcript with Python edit blocks for pong_game.py, Paddle/Ball classes, input, collision, drawing, ball reset, and customizations. Numeric score display is suggested rather than implemented in this transcript. The related 2048 transcript shows inspecting js/game_manager.js and patching its scoring logic in an existing public JavaScript game.",
    "limitations": "Historical documentation examples, not a separately packaged current game repository or benchmark. Reconstruct the applied edits and install pygame to run Pong; no current model-performance claim is implied. The original 2048 game is human-authored and is only used to demonstrate an AI-assisted modification.",
    "official": true,
    "codeType": "instructions",
    "publisher": "Aider",
    "reviewed": "2026-10-18"
  }
];
