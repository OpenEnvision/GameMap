# Coding agents × game development: code resources and game sources

Find engine bridges, implementation code, and setup instructions for coding agents. To study a complete project, use the [game cases](tutorials-and-demos.md); to check permissions and reset behavior, use the [interface notes](agent-interface-evidence.md).

## Read the attribution correctly

Coding-agent clients and harnesses are distinguished from underlying models and web chat. **Gemini CLI** is a coding client; **Gemini model / AI Studio** describes model or web usage and does not establish use of Gemini CLI. Likewise, Claude model / chat and DeepSeek model attributions do not establish a particular coding client. Unspecified agents remain explicitly unspecified. Agent-neutral tools can support a workflow without proving which client a game creator used.

## Resources and games by agent attribution

| Client, harness, or model attribution | Code and instructions | Game projects |
| --- | --- | --- |
| Codex | [Codex · official browser-game build and playtest workflow](https://github.com/openai/skills/blob/main/skills/.curated/playwright-interactive/SKILL.md) · [Codex Game Studio · local CLI and studio template](https://github.com/merlinhu1/codex-game-studio/blob/main/src/cli.ts) · [Phaser Game Agent · Coding-Agent Bridge](https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs) · [Codex ↔ Roblox Studio bridge](https://github.com/foxycuter2-ai/codex-roblox-studio-bridge/blob/main/server.py) · [Everything Game Dev Code · multi-agent game workflow](https://github.com/MRCalderon3D/everything-game-dev-code/tree/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/samples/LosRenacidos_Claude/src) · [Godot Forge · live editor and runtime bridge (Tann2019)](https://github.com/Tann2019/godot-mcp-server/blob/b0da85fac67dd067c16bfe791227c0e7edb56d7e/addons/godot_forge/handlers/script.gd) · [Godot Forge · code analysis and tests (gregario)](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts) · [gda · Godot Automation for AI Agents](https://github.com/aigengame/godot-agent/tree/main/src/gda) · [Godot Agent Loop](https://github.com/beremaran/godot-agent-loop/tree/main/src) · [agent2unity-cli](https://github.com/jkpp/agent2unity-cli/tree/main/unity-plugin/Agent2Unity/Editor) · [Unity Agent · CLI, Headless, MCP, and Package Skills](https://github.com/m4bwav/unity-agent/tree/master/skills) · [Unreal Engine MCP for Codex · Community Skill and Runners](https://github.com/WildCake/unreal-engine-mcp-codex/tree/main/skills/unreal-engine-mcp-codex/scripts) · [GameLogicBench](https://github.com/NJU-LINK/GameLogicBench/tree/main/geb) · [GameCraft-Bench](https://github.com/FreedomIntelligence/gamecraft-bench/tree/main/gamecraft_bench) · [Summer: Gemini CLI extension, engine MCP, and game skills](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) · [Phaser 4: official coding-agent skills with engine code examples](https://github.com/phaserjs/phaser/tree/master/skills) · [GodotPrompter: multi-agent Godot skills and reusable movement code](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) · [Playgama: web-game performance skill and executable probes](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-performance) · [Playgama: asset-production skill and GLB/audio build pipeline](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-assets) · [GameDev Agent Skills: engine router and test/code recipes](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills) | [Moonlight & Mayhem](https://github.com/simonw/raccoon-heist-codex/) · [GothicVania: Codex builds a platformer](https://github.com/acatovic/gothicvania-codex-demo) · [Flux: Codex gravity-flip runner](https://github.com/scriptedbyshivam/codex-hackathon-2026) · [Garden Match: agents build and review a puzzle game](https://github.com/kevinchenkai/GameAI/tree/main/garden) |
| Claude Code | [Claude Code Game Toolkit · Canvas engine and templates](https://github.com/hanifwdyt/claude-code-game-toolkit/blob/e002fdf2aaf16c0d84762b632ec8c2526399b532/lib/core/engine.js) · [Epic Games · Unreal Engine Skills for Claude Code](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin/tree/main/skills) · [Phaser Game Agent · Coding-Agent Bridge](https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs) · [Claude Code Game Studios · implementation skills](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/be8993bbc5a1f016bc770b2846ce06272d284526/.claude/skills/dev-story/references/4-implement.md) · [Everything Game Dev Code · multi-agent game workflow](https://github.com/MRCalderon3D/everything-game-dev-code/tree/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/samples/LosRenacidos_Claude/src) · [Tea Leaves · Claude Code Godot verification harness](https://github.com/cleak/tea-leaves/blob/b465c6bdf2c283a16eaa805c5f5f4f21c1f05cc8/game/DevTools.cs) · [ione · Unity HTTP bridge and Claude Code skill](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/Editor/Core/IoneHttpBridge.cs) · [Godot Forge · live editor and runtime bridge (Tann2019)](https://github.com/Tann2019/godot-mcp-server/blob/b0da85fac67dd067c16bfe791227c0e7edb56d7e/addons/godot_forge/handlers/script.gd) · [Godot Forge · code analysis and tests (gregario)](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts) · [Godot CLI · live scene authoring for coding agents](https://github.com/trunglqdev/Godot_CLI/blob/2e8f8636ae6c5f75071a4968df114186eacad40a/addon/godot_cli_bridge/plugin.gd) · [gda · Godot Automation for AI Agents](https://github.com/aigengame/godot-agent/tree/main/src/gda) · [Godot Agent Loop](https://github.com/beremaran/godot-agent-loop/tree/main/src) · [agent2unity-cli](https://github.com/jkpp/agent2unity-cli/tree/main/unity-plugin/Agent2Unity/Editor) · [Unity Agent · CLI, Headless, MCP, and Package Skills](https://github.com/m4bwav/unity-agent/tree/master/skills) · [GameLogicBench](https://github.com/NJU-LINK/GameLogicBench/tree/main/geb) · [GameCraft-Bench](https://github.com/FreedomIntelligence/gamecraft-bench/tree/main/gamecraft_bench) · [Summer: Gemini CLI extension, engine MCP, and game skills](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) · [Phaser 4: official coding-agent skills with engine code examples](https://github.com/phaserjs/phaser/tree/master/skills) · [GodotPrompter: multi-agent Godot skills and reusable movement code](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) · [Playgama: web-game performance skill and executable probes](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-performance) · [Playgama: asset-production skill and GLB/audio build pipeline](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-assets) · [GameDev Agent Skills: engine router and test/code recipes](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills) | [TRON: EXONIX](https://github.com/witnesstodark/tron-exonix) · [Tetris built by an AI agent team](https://github.com/caiguanhao/tetris) · [Raccoon Heist](https://github.com/simonw/raccoon-heist/) · [Turbo Kart Rally](https://github.com/bridge-mind/turbo-kart-rally) · [Long Wind](https://github.com/jbang2004/long-wind) · [NOVA LANCER](https://github.com/tanuu5/nova-lancer) · [Operation Naptime · Operación Siesta](https://github.com/alandaitch/operacion-siesta) · [Ombres](https://github.com/briossant/ombres) · [Dragon’s Reach](https://github.com/jaydemks/ImADragon_onepromptcode_game) · [Pixel Princess: a complete arcade campaign](https://github.com/VTvito/pixel-princess-platformer) · [Claude Code Tower Defense](https://github.com/mdkess/claude-game) · [Running Man: Claude Code meets PixelLab](https://github.com/balbonits/ai-browser-game-demos) · [Garden Match: agents build and review a puzzle game](https://github.com/kevinchenkai/GameAI/tree/main/garden) · [Quasar Saz: an unusual Claude Code experiment](https://github.com/cleak/quasar-saz) · [Beach Kitty](https://github.com/matthewod11-stack/CatRunner) |
| Gemini CLI | [Cloud Crush: Google’s Gemini CLI game source and codelab](https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang) · [Phaser Game Agent · Coding-Agent Bridge](https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs) · [Dinosaur Game Offline: a Gemini CLI-assisted source example](https://github.com/tonidevvn/dinosaur-game-offline/blob/main/script.js) · [Godot Forge · code analysis and tests (gregario)](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts) · [agent2unity-cli](https://github.com/jkpp/agent2unity-cli/tree/main/unity-plugin/Agent2Unity/Editor) · [Unity Agent · CLI, Headless, MCP, and Package Skills](https://github.com/m4bwav/unity-agent/tree/master/skills) · [Summer: Gemini CLI extension, engine MCP, and game skills](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) · [Gemini Assistant: a Godot dock backed by the actual Gemini CLI](https://github.com/AlexonMorris/gemini_assistant_godot_plugin/blob/main/gemini_backend.py) · [Playgama: web-game performance skill and executable probes](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-performance) · [Playgama: asset-production skill and GLB/audio build pipeline](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-assets) · [GameDev Agent Skills: engine router and test/code recipes](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills) | [Cloud Crush: Gemini CLI builds a match-3 game](https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang) · [Dinosaur Game Offline: Gemini CLI-assisted runner](https://github.com/tonidevvn/dinosaur-game-offline) |
| Antigravity | [Phaser Game Agent · Coding-Agent Bridge](https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs) · [Summer: Gemini CLI extension, engine MCP, and game skills](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) · [Phaser 4: official coding-agent skills with engine code examples](https://github.com/phaserjs/phaser/tree/master/skills) · [GodotPrompter: multi-agent Godot skills and reusable movement code](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) | [Orb Shooter](https://github.com/theredstapler/orb-shooter) |
| Cursor | [Phaser Game Agent · Coding-Agent Bridge](https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs) · [Everything Game Dev Code · multi-agent game workflow](https://github.com/MRCalderon3D/everything-game-dev-code/tree/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/samples/LosRenacidos_Claude/src) · [Godot Forge · live editor and runtime bridge (Tann2019)](https://github.com/Tann2019/godot-mcp-server/blob/b0da85fac67dd067c16bfe791227c0e7edb56d7e/addons/godot_forge/handlers/script.gd) · [Godot Forge · code analysis and tests (gregario)](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts) · [Godot CLI · live scene authoring for coding agents](https://github.com/trunglqdev/Godot_CLI/blob/2e8f8636ae6c5f75071a4968df114186eacad40a/addon/godot_cli_bridge/plugin.gd) · [gda · Godot Automation for AI Agents](https://github.com/aigengame/godot-agent/tree/main/src/gda) · [agent2unity-cli](https://github.com/jkpp/agent2unity-cli/tree/main/unity-plugin/Agent2Unity/Editor) · [Unity Agent · CLI, Headless, MCP, and Package Skills](https://github.com/m4bwav/unity-agent/tree/master/skills) · [Summer: Gemini CLI extension, engine MCP, and game skills](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) · [Phaser 4: official coding-agent skills with engine code examples](https://github.com/phaserjs/phaser/tree/master/skills) · [GodotPrompter: multi-agent Godot skills and reusable movement code](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) · [Playgama: web-game performance skill and executable probes](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-performance) · [Playgama: asset-production skill and GLB/audio build pipeline](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-assets) · [GameDev Agent Skills: engine router and test/code recipes](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills) | [Tower of Time: prompting a rewind mechanic](https://github.com/maciej-trebacz/tower-of-time-game) · [Cursor’s procedural platformer experiment](https://github.com/commjoen/generated-game-experiment) · [Gravity Birds: Grok Bot directs Cursor](https://github.com/az9713/grokbot-game-dev-demo) · [Space Shooter: a family Cursor experiment](https://github.com/littleearth/vibe-coded-games/tree/main/shooter) · [Destruction Derby Arena](https://github.com/littleearth/vibe-coded-games/tree/main/demoderby) |
| GitHub Copilot | [Phaser Game Agent · Coding-Agent Bridge](https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs) · [Unity Agent · CLI, Headless, MCP, and Package Skills](https://github.com/m4bwav/unity-agent/tree/master/skills) · [Summer: Gemini CLI extension, engine MCP, and game skills](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) · [Phaser 4: official coding-agent skills with engine code examples](https://github.com/phaserjs/phaser/tree/master/skills) · [GodotPrompter: multi-agent Godot skills and reusable movement code](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) · [Playgama: web-game performance skill and executable probes](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-performance) · [Playgama: asset-production skill and GLB/audio build pipeline](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-assets) · [GameDev Agent Skills: engine router and test/code recipes](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills) | [FragArena](https://github.com/jonnyleigh/fragarena) · [Agent Arcade: Copilot builds desktop arcade games](https://github.com/DanWahlin/agent-arcade) |
| OpenCode | [Everything Game Dev Code · multi-agent game workflow](https://github.com/MRCalderon3D/everything-game-dev-code/tree/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/samples/LosRenacidos_Claude/src) · [Godot Agent Loop](https://github.com/beremaran/godot-agent-loop/tree/main/src) · [GameLogicBench](https://github.com/NJU-LINK/GameLogicBench/tree/main/geb) · [Summer: Gemini CLI extension, engine MCP, and game skills](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) · [GodotPrompter: multi-agent Godot skills and reusable movement code](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) | — |
| Aider | [Aider: an official Pong build transcript with real code edits](https://github.com/Aider-AI/aider/blob/main/aider/website/examples/pong.md) | — |
| Cline | [GameDev Agent Skills: engine router and test/code recipes](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills) | — |
| Windsurf | [Godot CLI · live scene authoring for coding agents](https://github.com/trunglqdev/Godot_CLI/blob/2e8f8636ae6c5f75071a4968df114186eacad40a/addon/godot_cli_bridge/plugin.gd) | — |
| Kiro | [Everything Game Dev Code · multi-agent game workflow](https://github.com/MRCalderon3D/everything-game-dev-code/tree/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/samples/LosRenacidos_Claude/src) | — |
| Pi | [Godot Agent Loop](https://github.com/beremaran/godot-agent-loop/tree/main/src) | — |
| Kimi Code | [GameCraft-Bench](https://github.com/FreedomIntelligence/gamecraft-bench/tree/main/gamecraft_bench) | — |
| Grok Build | [GodotPrompter: multi-agent Godot skills and reusable movement code](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) | — |
| Augment Code | — | [Tower of Time: prompting a rewind mechanic](https://github.com/maciej-trebacz/tower-of-time-game) |
| DeepSeek Harness | — | [Mini KSP: a Chinese rocket sandbox](https://github.com/BairlyEmei/mini-ksp) |
| Agent-neutral tools | [Level Design Book · unofficial design skill](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design) | — |
| Gemini model / AI Studio | — | [Vibe Jet](https://github.com/cedrickchee/vibe-jet) · [Dunkirk: an honestly documented AI-assisted shooter](https://github.com/Ponloe/dunkirk-godot) · [Beach Kitty](https://github.com/matthewod11-stack/CatRunner) · [Pirate Fleet Commander](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pirate%20Fleet%20Commander%20v7.4.html) · [Kymograph](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Kymograph%20v4.html) · [Midnight Pumpkin Hunt](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pumpkin%20Hunt%20Horror%20Game%20v3.html) |
| Claude model / chat | — | [Slide Rush](https://github.com/KJLKurt/waterslide-game-opus-5.5) · [The Tithe](https://github.com/miguelsolorio/the-tithe) · [Mini Snake: a Claude conversation game](https://github.com/BizShibe/claude-ai-mini-snake-game) · [Dunkirk: an honestly documented AI-assisted shooter](https://github.com/Ponloe/dunkirk-godot) · [Pirate Fleet Commander](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pirate%20Fleet%20Commander%20v7.4.html) · [Kymograph](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Kymograph%20v4.html) · [Midnight Pumpkin Hunt](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pumpkin%20Hunt%20Horror%20Game%20v3.html) |
| DeepSeek model | — | [Snake: Neon Arcade Edition](https://github.com/TwitchCaptain/snake) |
| ChatGPT | — | [Dunkirk: an honestly documented AI-assisted shooter](https://github.com/Ponloe/dunkirk-godot) |
| Other / unspecified agent | — | [Hajimi Defense: The Tuna Crisis](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_towerDefense_hajimi.zip) · [Marvel Avengers: Infinity Strike](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_platformer_marvel.zip) · [Harry Potter: Arithmancy Academy](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_uiHeavy_harryPotter.zip) · [Star Wars: Mandalorian Protocol](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_topDown_starWars.zip) · [Michi-Neko · The Cat Philosopher’s Path](https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path) · [Bash Fighter: an agent-developed multiplayer brawler](https://github.com/Bash-Entertainment/bash-fighter) |

## Reviewed code resources

### Level Design Book · unofficial design skill

An unofficial, agent-neutral adaptation of The Level Design Book for level briefs, blockouts, encounters, wayfinding, and evidence-based playtest reviews.

**Kind:** Skills & instructions · **Agents:** Agent-neutral tools · **Engine:** Engine-agnostic · primarily 3D level design

[Code / instructions](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design) · [Review evidence](https://book.leveldesignbook.com/appendix/license) · [Project source](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design)

- **Material:** Agent instructions.
- **Scope:** A text-only SKILL.md, thirteen topical/source references, and three templates. Read, copy, and adapt with the included attribution and CC BY-NC-SA 4.0 notice.
- **Limitations:** Unofficial book adaptation, not a pi-maintainer publication or executable engine integration. No workflow or design outcome was independently run. Observe noncommercial/share-alike conditions and third-party exceptions; the reported 94-page reading coverage belongs to the imported package snapshot.
- **Publisher:** The Level Design Book authors; unofficial adaptation distributed by GameMap · Community / independent source.

### Codex · official browser-game build and playtest workflow

OpenAI’s game-development workflow connects a written game plan, project instructions, generated assets, and live browser playtesting.

**Kind:** Build workflows · **Agents:** Codex · **Engine:** Browser games · Phaser / PixiJS

[Code / instructions](https://github.com/openai/skills/blob/main/skills/.curated/playwright-interactive/SKILL.md) · [Review evidence](https://learn.chatgpt.com/use-cases/browser-games) · [Project source](https://learn.chatgpt.com/use-cases/browser-games)

- **Material:** Agent instructions.
- **Scope:** Official game workflow and the linked Playwright Interactive skill, including persistent-session JavaScript examples for functional and visual checks.
- **Limitations:** A workflow and skill reference, not a game engine or finished project. The linked Playwright Interactive skill currently requires js_repl, a project-local Playwright setup, and sandbox-disabled Codex execution; review that elevated-permission requirement before use. The game stack and runtime are separate dependencies.
- **Publisher:** OpenAI · Official publisher source.

### Claude Code Game Toolkit · Canvas engine and templates

Combines Claude game-development commands and domain skills with a small JavaScript engine, playable genre templates, and examples that can be inspected as real code.

**Kind:** Development frameworks · **Agents:** Claude Code · **Engine:** HTML Canvas 2D / JavaScript

[Code / instructions](https://github.com/hanifwdyt/claude-code-game-toolkit/blob/e002fdf2aaf16c0d84762b632ec8c2526399b532/lib/core/engine.js) · [Review evidence](https://github.com/hanifwdyt/claude-code-game-toolkit/blob/e002fdf2aaf16c0d84762b632ec8c2526399b532/.claude/commands/game.md) · [Project source](https://github.com/hanifwdyt/claude-code-game-toolkit)

- **Material:** Implementation and instructions.
- **Scope:** Reviewed the Engine class and /game workflow. The tree includes lib/core, graphics, physics, input, audio and effects modules, .claude/skills, genre templates, and showcase game sources.
- **Limitations:** An early community toolkit for small browser games. Source existence and control flow were checked; its generated-game quality, portability, and quickstart behavior were not executed or benchmarked.
- **Publisher:** hanifwdyt · Community / independent source.

### Cloud Crush: Google’s Gemini CLI game source and codelab

Google publishes a complete match-3 game explicitly attributed to Gemini CLI, alongside a codelab covering plan mode, model steering, browser adaptation, testing, and subagents. The repository includes the resulting game rather than only instructions to generate one.

**Kind:** Runnable game code · **Agents:** Gemini CLI · **Engine:** Ebitengine 2 · Go · WebAssembly

[Code / instructions](https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang) · [Review evidence](https://github.com/GoogleCloudPlatform/devrel-demos/blob/main/codelabs/gemini-cli/gemini-cli-match3-golang/README.md) · [Project source](https://codelabs.developers.google.com/next26/gemini-cli-match3-golang)

- **Material:** Implementation source.
- **Scope:** Complete game project: main.go contains rendering, match rules, input, game states, audio, and scores; assets/ is committed. Includes go.mod, server/main.go, public/index.html, wasm_exec.js, Dockerfile, and publisher gameplay screenshots. Native run: go run .; the case guide also records the browser build and asset-copy steps.
- **Limitations:** Source was inspected, not locally executed. go.mod requires Go 1.26.2, despite the README’s 1.24+ claim. The WASM route must compile public/cloud-crush.wasm, copy source assets into public/assets, and use the matching Go wasm_exec.js; the current public asset directory is incomplete. Cloud deployment is optional. The creator’s generation claim is distinct from independent code-authorship verification.
- **Publisher:** Google Cloud · Official publisher source.

### Epic Games · Unreal Engine Skills for Claude Code

Epic's Claude Code plugin teaches agents to discover Unreal toolsets and operate a live editor through the native Unreal MCP surface, with a project-context session hook.

**Kind:** Skills & instructions · **Agents:** Claude Code · **Engine:** Unreal Engine

[Code / instructions](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin/tree/main/skills) · [Review evidence](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin/blob/main/README.md) · [Project source](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin)

- **Material:** Implementation and instructions.
- **Scope:** Verified public skill/reference files for unreal-mcp, create-toolset, and unreal-skill, plus executable hooks/unreal-context.sh and Claude plugin metadata. This repository contains agent instructions and hook code; Unreal's engine-side ModelContextProtocol/AllToolsets implementation is not bundled.
- **Limitations:** Requires a running Unreal Editor with ModelContextProtocol and AllToolsets enabled. The plugin does not ship static MCP configuration; generate it from the editor. Tool search exposes list_toolsets, describe_toolset, and call_tool by default. The Python execution tool can mutate or delete project content, and localhost does not exclude other same-user processes. Keep client approvals enabled. Windows needs Git Bash or WSL for the session-context hook. Only Claude Code is documented by this plugin.
- **Publisher:** Epic Games · Official publisher source.

### Codex Game Studio · local CLI and studio template

A Codex-native workflow CLI with tracked agent roles, reusable skills, engine reference packs, project state, task orchestration, and validation.

**Kind:** Development frameworks · **Agents:** Codex · **Engine:** Godot / Unity / Unreal Engine

[Code / instructions](https://github.com/merlinhu1/codex-game-studio/blob/main/src/cli.ts) · [Review evidence](https://github.com/merlinhu1/codex-game-studio#codex-native-execution) · [Project source](https://github.com/merlinhu1/codex-game-studio)

- **Material:** Implementation and instructions.
- **Scope:** TypeScript CLI, run lifecycle, task orchestration, validation code, engine configuration, and committed Codex agent/skill/workflow templates were inspected.
- **Limitations:** Requires Node 24+, Codex CLI for role execution, and a separate engine project. init prunes listed template-authoring paths and TypeScript/test files unless --keep-template-authoring is passed; inspect the target checkout before initializing. It supplies studio workflow structure rather than an engine, and source review does not establish game quality.
- **Publisher:** merlinhu1 · Community / independent source.

### Phaser Game Agent · Coding-Agent Bridge

Phaser's own setup CLI and stdio-to-HTTP bridge connect external coding agents to a managed Phaser game-building workspace, with a thin reusable skill.

**Kind:** Engine bridges · **Agents:** Claude Code · Codex · Gemini CLI · Cursor · GitHub Copilot · Antigravity · **Engine:** Phaser / browser games

[Code / instructions](https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs) · [Review evidence](https://github.com/phaserjs/phaser-game-agent/blob/main/targets.mjs) · [Project source](https://github.com/phaserjs/phaser-game-agent)

- **Material:** Implementation source.
- **Scope:** Verified JavaScript setup/login/configuration CLI, bridge.mjs JSON-RPC forwarding implementation, explicit client registry and tests, and skills/phaser-game-agent/SKILL.md. Source covers the local bridge/setup, not the hosted game-building service.
- **Limitations:** Requires a Phaser account, hosted service access, and its credit/subscription model. Client transports differ: Claude Code and VS Code use native HTTP routes; others use the stdio bridge. Qoder/Windsurf are explicitly experimental and excluded from the supported-agent list here. Do not describe the cloud builder as open source.
- **Publisher:** Phaser Studio · Official publisher source.

### Dinosaur Game Offline: a Gemini CLI-assisted source example

A small offline dinosaur runner whose creator explicitly describes Gemini CLI assistance with scaffolding, game logic, debugging, and improvements. It supplies concrete game code and committed images and sounds, with no generation API needed to play.

**Kind:** Runnable game code · **Agents:** Gemini CLI · **Engine:** HTML · CSS · JavaScript

[Code / instructions](https://github.com/tonidevvn/dinosaur-game-offline/blob/main/script.js) · [Review evidence](https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped) · [Project source](https://github.com/tonidevvn/dinosaur-game-offline)

- **Material:** Implementation source.
- **Scope:** Complete static game: index.html, style.css, script.js, public/assets/ dinosaur/obstacle/background images, public/sounds/ jump/death/score audio. JavaScript implements starting, jumping, obstacle spawning, collision, scoring, and restart. Open index.html locally and press Space.
- **Limitations:** Creator disclosure names gemini-cli but provides no original conversation or exact model identifier. It is an assisted build rather than a verified autonomous-generation claim. The author-hosted game was smoke-tested for starting, jumping, scoring, collision, and restart on 2026-10-18. Its fixed-width board targets desktop keyboard play. No repository code license is declared.
- **Publisher:** tonidevvn · Community / independent source.

### Codex ↔ Roblox Studio bridge

A local Python server and Roblox Studio plugin let Codex create objects, change scripts, run Luau, and communicate through an in-editor chat panel.

**Kind:** Engine bridges · **Agents:** Codex · **Engine:** Roblox Studio / Luau / Python

[Code / instructions](https://github.com/foxycuter2-ai/codex-roblox-studio-bridge/blob/main/server.py) · [Review evidence](https://github.com/foxycuter2-ai/codex-roblox-studio-bridge#chat-panel) · [Project source](https://github.com/foxycuter2-ai/codex-roblox-studio-bridge)

- **Material:** Implementation source.
- **Scope:** Python command queues and Codex subprocess integration, Luau editor plugin, screenshot helper, reusable skills, and example game-building scripts are present.
- **Limitations:** Requires Roblox Studio, Python, and authenticated Codex CLI. Screenshot helpers target Windows. Its chat launcher bypasses Codex approval/sandbox checks by default; inspect that launcher before choosing this bridge. Source reviewed, not installed.
- **Publisher:** foxycuter2-ai · Community / independent source.

### Claude Code Game Studios · implementation skills

A Claude Code skill and agent pack that turns game design stories into implementation tasks with architectural context, specialist programmers, review, and configurable completion gates.

**Kind:** Skills & instructions · **Agents:** Claude Code · **Engine:** Godot / Unity / Unreal Engine

[Code / instructions](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/be8993bbc5a1f016bc770b2846ce06272d284526/.claude/skills/dev-story/references/4-implement.md) · [Review evidence](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/be8993bbc5a1f016bc770b2846ce06272d284526/.claude/skills/dev-story/SKILL.md) · [Project source](https://github.com/Donchitos/Claude-Code-Game-Studios)

- **Material:** Implementation and instructions.
- **Scope:** Reviewed dev-story/SKILL.md, its implementation reference, and .claude/hooks/validate-commit.sh. These are agent instructions and executable shell validation hooks; src/ contains only a placeholder and CLAUDE.md, not a game runtime.
- **Limitations:** Requires Claude Code and a separately configured engine project. Minimal QA mode can omit tests. The workflow source does not establish autonomous completion or game quality.
- **Publisher:** Donchitos · Community / independent source.

### Everything Game Dev Code · multi-agent game workflow

A shared game-development workflow with engine-specific rules, coding-agent adapters, implementation and review commands, validation scripts, and complete sample game sources.

**Kind:** Build workflows · **Agents:** Claude Code · Codex · Cursor · OpenCode · Kiro · **Engine:** Godot / Unity / Unreal Engine / HTML5

[Code / instructions](https://github.com/MRCalderon3D/everything-game-dev-code/tree/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/samples/LosRenacidos_Claude/src) · [Review evidence](https://github.com/MRCalderon3D/everything-game-dev-code/blob/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/commands/full-game.md) · [Project source](https://github.com/MRCalderon3D/everything-game-dev-code)

- **Material:** Implementation and instructions.
- **Scope:** Reviewed /full-game and the Claude sample's JavaScript bootstrap/game loop. Verified engine rules, harness adapters, scripts/validate-* utilities, and sample entities, states, rendering, input, storage and map generation.
- **Limitations:** The framework supplies instructions and integrations, not an engine. Engine bridges and optional asset-generation providers are separate dependencies. Sample harness comparisons are not controlled performance benchmarks.
- **Publisher:** MRCalderon3D · Community / independent source.

### Tea Leaves · Claude Code Godot verification harness

A reusable Godot project substrate that gives Claude Code runtime state, screenshots, simulated input, scene validation, and tests while it writes and repairs game code.

**Kind:** Development frameworks · **Agents:** Claude Code · **Engine:** Godot 4.6 Mono / C# / .NET 8

[Code / instructions](https://github.com/cleak/tea-leaves/blob/b465c6bdf2c283a16eaa805c5f5f4f21c1f05cc8/game/DevTools.cs) · [Review evidence](https://github.com/cleak/tea-leaves/blob/b465c6bdf2c283a16eaa805c5f5f4f21c1f05cc8/CLAUDE.md) · [Project source](https://github.com/cleak/tea-leaves)

- **Material:** Implementation source.
- **Scope:** Reviewed the C# DevTools autoload, Python CLI, and Claude project guide. Actual code dispatches screenshot/scene-tree/state commands and asynchronous input sequences; companion validators, shader lint and test wrappers are present.
- **Limitations:** A project-specific substrate rather than a universal Godot editor bridge. Defaults assume a Windows-oriented Godot Mono toolchain and include a hard-coded monitor selection; paths and window settings need adaptation. No installation or execution was performed.
- **Publisher:** cleak · Community / independent source.

### ione · Unity HTTP bridge and Claude Code skill

Connects Claude Code to Unity through an opt-in local HTTP bridge so the agent can inspect scenes, create C# scripts, wait for compilation, and verify the game view.

**Kind:** Engine bridges · **Agents:** Claude Code · **Engine:** Unity / C#

[Code / instructions](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/Editor/Core/IoneHttpBridge.cs) · [Review evidence](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/ClaudeSkill/SKILL.md) · [Project source](https://github.com/TestcodeInc/ione)

- **Material:** Implementation source.
- **Scope:** Reviewed the exact Claude skill, loopback HttpListener implementation, and AssetTools.CreateScript. The skill calls the bridge's live schema, follows script writes with wait_for_compile, and checks capture_game_view.
- **Limitations:** Requires Unity 2022.3+ and the opt-in, bearer-authenticated local bridge. Script writes, asset deletion, menu execution, Play Mode, and scene switching are permitted by default unless disabled in Settings. Unity Undo does not cover file writes or most AssetDatabase operations. Domain reload temporarily interrupts the listener, and Unity must service its main thread. The Claude Code bridge needs no separate provider API key; in-editor chat and image generation have separate API requirements.
- **Publisher:** TestcodeInc · Community / independent source.

### Godot Forge · live editor and runtime bridge (Tann2019)

An MCP server and Godot add-on for writing scripts, building editable scenes, reading diagnostics, running games, simulating input, and checking mechanics with saved scenarios.

**Kind:** Engine bridges · **Agents:** Claude Code · Codex · Cursor · **Engine:** Godot 4 / GDScript

[Code / instructions](https://github.com/Tann2019/godot-mcp-server/blob/b0da85fac67dd067c16bfe791227c0e7edb56d7e/addons/godot_forge/handlers/script.gd) · [Review evidence](https://github.com/Tann2019/godot-mcp-server/blob/b0da85fac67dd067c16bfe791227c0e7edb56d7e/skills/godot-forge/SKILL.md) · [Project source](https://github.com/Tann2019/godot-mcp-server)

- **Material:** Implementation source.
- **Scope:** Reviewed script creation/edit/validation/attachment handlers, the runtime command forwarder, and the companion skill. The tree includes a TypeScript MCP bridge, GDScript editor/runtime handlers, and a platformer with a coin-collection test scenario.
- **Limitations:** Requires Godot 4.4+ and Node 20+. Live authoring uses the editor add-on; runtime inspection and input need a running game with the debugger connection. Documentation, tests, and export also have separate headless paths. Code review confirms implemented paths, not successful execution of every operation. This is separate from Coding-Solo/godot-mcp and gregario/godot-forge.
- **Publisher:** Tann2019 · Community / independent source.

### Godot Forge · code analysis and tests (gregario)

A focused MCP feedback layer for coding agents: Godot API lookup, GDScript and scene checks, actual editor diagnostics, and structured GUT/GdUnit4 test results.

**Kind:** Engine bridges · **Agents:** Claude Code · Codex · Gemini CLI · Cursor · **Engine:** Godot 4 / GDScript

[Code / instructions](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts) · [Review evidence](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/script-analysis.ts) · [Project source](https://github.com/gregario/godot-forge)

- **Material:** Implementation source.
- **Scope:** Reviewed MCP test registration, Godot process launch and GUT/GdUnit4 output parsers; also reviewed heuristic script analysis and an LSP client that obtains editor diagnostics. Scene analysis, project launching and screenshots have separate modules.
- **Limitations:** Heuristic warnings differ from compiler diagnostics. Tests need Godot plus GUT/GdUnit4. At the cited source revision, static source inspection indicates that unrecognized output can produce 'All 0 tests passed' and the result does not incorporate the process exit code. This failure path was not runtime-reproduced; verify expected counts and raw execution evidence before accepting a pass. LSP diagnostics need the editor; screenshots launch a separate Godot process and need a display. It is a feedback layer, not broad scene authoring.
- **Publisher:** gregario · Community / independent source.

### Godot CLI · live scene authoring for coding agents

A Go command-line client and embedded Godot editor bridge that let coding agents write scripts, construct scenes, connect signals, run checks, and inspect runtime screenshots.

**Kind:** Engine bridges · **Agents:** Claude Code · Cursor · Windsurf · **Engine:** Godot 4 / GDScript / Go CLI

[Code / instructions](https://github.com/trunglqdev/Godot_CLI/blob/2e8f8636ae6c5f75071a4968df114186eacad40a/addon/godot_cli_bridge/plugin.gd) · [Review evidence](https://github.com/trunglqdev/Godot_CLI/blob/2e8f8636ae6c5f75071a4968df114186eacad40a/mcp.go) · [Project source](https://github.com/trunglqdev/Godot_CLI)

- **Material:** Implementation source.
- **Scope:** Reviewed the Go stdio MCP wrapper and the GDScript EditorPlugin's JSON-RPC dispatch and scene operations. The CLI exposes the command surface to MCP clients while Claude Code can call it through a shell; 2D and 3D acceptance game source is included.
- **Limitations:** Requires Godot plus the editor daemon for live authoring; source builds require Go. The bridge owns an active scene that must be opened/created and saved explicitly in headless mode. It is an independent community CLI, not Godot's official command-line interface.
- **Publisher:** trunglqdev · Community / independent source.

### gda · Godot Automation for AI Agents

A CLI, reusable skill, and MCP surface for editing Godot content, validating projects, and collecting runtime tree, input, screenshots, logs, and performance evidence.

**Kind:** Engine bridges · **Agents:** Claude Code · Codex · Cursor · **Engine:** Godot

[Code / instructions](https://github.com/aigengame/godot-agent/tree/main/src/gda) · [Review evidence](https://github.com/aigengame/godot-agent#register-with-coding-agents) · [Project source](https://github.com/aigengame/godot-agent)

- **Material:** Implementation source.
- **Scope:** Verified Python CLI/MCP implementation under src/gda, daemon IPC, and an actual GDScript runtime harness at src/gda/harness/gda_harness.gd. skills/gda/SKILL.md and docs/gda-skill.md provide agent guidance; documented configuration explicitly covers Claude Code, Codex, and Cursor.
- **Limitations:** Requires Python 3.13+ and Godot 4.4+ for headless operations or 4.6+ for Live. It assumes a trusted project: even some read-only operations start autoloads, and node get instantiates scene scripts. Runtime screenshots need a windowed/display session. Live mode injects a development harness; exports must respect its stripping/self-disable behavior. Other MCP clients are not individually verified here.
- **Publisher:** aigengame · Community / independent source.

### Godot Agent Loop

A Godot build–run–observe–playtest–verify loop with runtime/editor bridge code, reusable skills, and retained execution evidence.

**Kind:** Development frameworks · **Agents:** Claude Code · Codex · OpenCode · Pi · **Engine:** Godot

[Code / instructions](https://github.com/beremaran/godot-agent-loop/tree/main/src) · [Review evidence](https://github.com/beremaran/godot-agent-loop/blob/main/docs/agent-plugin.md) · [Project source](https://github.com/beremaran/godot-agent-loop)

- **Material:** Implementation and instructions.
- **Scope:** Verified TypeScript server/editor bridge, addons/godot_agent_loop/plugin.gd, runtime verification code, cold-model evaluation runners, and an executable launch-demo project. One portable agent bundle exposes build/debug/verify/ship skills and explicit Claude Code, Codex, OpenCode, and Pi adapters.
- **Limitations:** Requires Godot 4.7+ and Node 22+. The default core tool surface uses godot_catalog and godot_call to reach unlisted tools. Filesystem access is denied without configured roots unless explicitly overridden; runtime reflection and code-execution groups are disabled by default. Those RPC gates do not sandbox project GDScript, which runs with OS-level permissions. Screenshots need a rendering/display context. Linux CI, Windows acceptance, and specific macOS workflows are reported separately, not as equal coverage across clients and platforms.
- **Publisher:** beremaran · Community / independent source.

### agent2unity-cli

A .NET command-line client plus a C# Unity editor daemon that lets coding agents create and modify Unity assets through editor APIs and run compilation/test checks.

**Kind:** Engine bridges · **Agents:** Claude Code · Codex · Cursor · Gemini CLI · **Engine:** Unity

[Code / instructions](https://github.com/jkpp/agent2unity-cli/tree/main/unity-plugin/Agent2Unity/Editor) · [Review evidence](https://github.com/jkpp/agent2unity-cli/tree/main/agents) · [Project source](https://github.com/jkpp/agent2unity-cli)

- **Material:** Implementation source.
- **Scope:** Verified .NET CLI Program.cs, C# HTTP daemon/main-thread dispatcher, serialized-field and prefab/scene commands, and Unity Test Framework command implementations. Agent integration files explicitly cover Claude Code skills, Codex AGENTS.md, Cursor rules, and Gemini CLI GEMINI.md.
- **Limitations:** Requires a running Unity Editor/daemon and .NET SDK 8; tests additionally need Unity Test Framework. The daemon binds to localhost but has no authentication check in the reviewed request path, so any process that can reach the port can invoke editor commands. Keep it local and stop it when unused. It controls documented editor operations, not arbitrary gameplay acceptance; agent instruction files do not establish equal live testing.
- **Publisher:** jkpp · Community / independent source.

### Unity Agent · CLI, Headless, MCP, and Package Skills

A reusable Unity workflow pack that routes agent work through CLI probes, batchmode validation, MCP selection, package management, and evidence-based completion checks.

**Kind:** Skills & instructions · **Agents:** Claude Code · Codex · Gemini CLI · Cursor · GitHub Copilot · **Engine:** Unity

[Code / instructions](https://github.com/m4bwav/unity-agent/tree/master/skills) · [Review evidence](https://github.com/m4bwav/unity-agent/blob/master/README.md) · [Project source](https://github.com/m4bwav/unity-agent)

- **Material:** Implementation and instructions.
- **Scope:** Verified five SKILL.md workflows, executable unity_probe.ps1 and unity_headless.ps1 JSON-output wrappers, and PackageInstaller.cs. The README explicitly lists cross-agent skill consumption; these are community procedures around Unity tools, not the Unity CLI implementation.
- **Limitations:** The included deterministic probes/runners are PowerShell-oriented. Unity, its CLI/Pipeline package, SDKs, and chosen MCP bridge are separate dependencies; the skill pack installs none of them. Cross-agent support means documented instruction discovery, not identical end-to-end validation on all listed clients.
- **Publisher:** m4bwav · Community / independent source.

### Unreal Engine MCP for Codex · Community Skill and Runners

A community Codex adaptation of Epic's Unreal MCP workflow, with concrete command-line helpers for environment probes, automation tests, Python commandlets, builds, and smoke cooks.

**Kind:** Build workflows · **Agents:** Codex · **Engine:** Unreal Engine

[Code / instructions](https://github.com/WildCake/unreal-engine-mcp-codex/tree/main/skills/unreal-engine-mcp-codex/scripts) · [Review evidence](https://github.com/WildCake/unreal-engine-mcp-codex#headless-runners) · [Project source](https://github.com/WildCake/unreal-engine-mcp-codex)

- **Material:** Implementation and instructions.
- **Scope:** Verified actual Python implementations: check_unreal_mcp.py, run_unreal_automation.py, run_unreal_python.py, build_unreal.py, cook_unreal.py, shared process/log helpers, plus a PowerShell probe and Codex plugin/config metadata.
- **Limitations:** Documents Unreal 5.8+ native MCP and requires a separately installed engine/toolsets. Several runners and examples are Windows-oriented; Codex integration is community-maintained, not endorsed by Epic or OpenAI. It does not bundle the engine server or a complete game.
- **Publisher:** WildCake · Community / independent source.

### GameLogicBench

A coding-agent benchmark of 72 gameplay-logic tasks whose deterministic Godot evaluators check observable state at each simulation tick rather than grading agent-written claims.

**Kind:** Development evaluations · **Agents:** Claude Code · Codex · OpenCode · **Engine:** Godot

[Code / instructions](https://github.com/NJU-LINK/GameLogicBench/tree/main/geb) · [Review evidence](https://github.com/NJU-LINK/GameLogicBench/blob/main/docs/running.md) · [Project source](https://github.com/NJU-LINK/GameLogicBench)

- **Material:** Implementation source.
- **Scope:** Verified Python solve/judge/record pipeline, container/egress code, and separate claude_code.py, codex.py, and opencode.py adapters. The public GameLogicBench-Tasks repository is a separate dependency and contains the game/task/judge/reference content.
- **Limitations:** Requires Docker, a matching Godot 4.4 environment, an agent CLI package, task-library checkout, and configured model endpoints. It evaluates runtime game logic, not visual quality or finished commercial-game production. Network restrictions and task-library commit materially affect results; do not treat model backends as additional coding-agent adapters.
- **Publisher:** NJU-LINK · Community / independent source.

### GameCraft-Bench

An end-to-end game-generation benchmark with 140 tasks across 15 families, runnable Godot workspaces, replayable input traces, screen recording, and hidden visual/gameplay rubrics.

**Kind:** Development evaluations · **Agents:** Claude Code · Codex · Kimi Code · **Engine:** Godot

[Code / instructions](https://github.com/FreedomIntelligence/gamecraft-bench/tree/main/gamecraft_bench) · [Review evidence](https://github.com/FreedomIntelligence/gamecraft-bench/blob/main/README.md) · [Project source](https://github.com/FreedomIntelligence/gamecraft-bench)

- **Material:** Implementation source.
- **Scope:** Verified local Harbor agent/environment code, replay and scoring implementations, model-judge adapters, wrapper scripts for Claude Code/Codex/Kimi Code, and committed task instructions/reference-solution GDScript. The author's project site links this repository directly.
- **Limitations:** Godot 4.6.2 and Linux/Xvfb/input-recording dependencies are pinned in the reproduction guide. Expected asset libraries are downloaded separately, with per-entry licensing. Rubric scores depend on the judge and replay protocol; Gemini judge support is not evidence of a Gemini CLI coding-agent adapter.
- **Publisher:** FreedomIntelligence · Community / independent source.

### Summer: Gemini CLI extension, engine MCP, and game skills

A publisher-maintained CLI/MCP integration for building scenes, writing scripts, playing games, reading errors, and taking screenshots in Summer Engine. It includes a genuine Gemini extension manifest, context file, skill packaging, and cross-agent setup code.

**Kind:** Engine bridges · **Agents:** Gemini CLI · Antigravity · Codex · Claude Code · Cursor · GitHub Copilot · OpenCode · **Engine:** Summer Engine

[Code / instructions](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) · [Review evidence](https://github.com/summerengine/summer/blob/main/integrations/gemini/README.md) · [Project source](https://github.com/summerengine/summer)

- **Material:** Implementation source.
- **Scope:** CLI/MCP integration source, not the engine source. Verified src/mcp/server.ts, src/cli/commands/setup.ts, src/installer/setup.ts, gemini-extension.json, integrations/gemini/README.md, scripts/build-gemini-extension.ts, and library/skills/. The Gemini packaging document explains the actual extension skills layout rather than assuming an arbitrary manifest skills key works.
- **Limitations:** Requires the separate Summer Engine desktop application for editor operations; the repository explicitly says it is not the engine itself. Hosted asset generation and publishing require a Summer account, and generation/paid builds consume credits. Gemini is a legacy setup target alongside current Antigravity guidance. No install or end-to-end compatibility test was performed here. This is not a Google-provided integration.
- **Publisher:** summerengine · Community / independent source.

### Gemini Assistant: a Godot dock backed by the actual Gemini CLI

A small community Godot editor plugin that sends prompts from a dock to a Python subprocess, invokes the installed gemini command, and handles returned file/folder creation instructions. Its code confirms a CLI integration rather than a direct Gemini API chat wrapper.

**Kind:** Engine bridges · **Agents:** Gemini CLI · **Engine:** Godot 4 · GDScript · Python

[Code / instructions](https://github.com/AlexonMorris/gemini_assistant_godot_plugin/blob/main/gemini_backend.py) · [Review evidence](https://github.com/AlexonMorris/gemini_assistant_godot_plugin/blob/main/README.md) · [Project source](https://github.com/AlexonMorris/gemini_assistant_godot_plugin)

- **Material:** Implementation source.
- **Scope:** Editor-plugin source: gemini_plugin.gd registers the dock, gemini_dock.gd launches Python, and gemini_backend.py runs the gemini executable, parses JSON action blocks, and creates project files. Supporting dock scene and plugin configuration are in the repository.
- **Limitations:** Prototype bridge, not a complete game or full editor-control MCP server. Returned JSON file actions are applied automatically and existing files are opened in overwrite mode. The backend rejects '..' strings but does not enforce canonical project-root containment, so review it before use on valuable projects. It uses Windows type; macOS/Linux need the documented cat change. The dock expects python and addons/gemini_assistant/. Gemini CLI installation/authentication are separate prerequisites. No runtime validation was performed.
- **Publisher:** AlexonMorris · Community / independent source.

### Phaser 4: official coding-agent skills with engine code examples

The Phaser engine repository now provides subsystem skills for agent-assisted development, including scenes, Arcade/Matter physics, input, assets, cameras, animation, UI, and migration. The official README explicitly names several coding agents, and the skills contain practical API examples linked to engine source.

**Kind:** Skills & instructions · **Agents:** Claude Code · Codex · Cursor · Antigravity · GitHub Copilot · **Engine:** Phaser 4 · JavaScript / TypeScript

[Code / instructions](https://github.com/phaserjs/phaser/tree/master/skills) · [Review evidence](https://github.com/phaserjs/phaser/blob/master/skills/physics-arcade/SKILL.md) · [Project source](https://github.com/phaserjs/phaser#ai-assisted-game-development)

- **Material:** Agent instructions.
- **Scope:** Reusable instruction files with JavaScript examples, backed by the engine implementation. Verified skills/physics-arcade/SKILL.md includes player/platform setup, collision registration, keyboard movement, and GameConfig; it points to src/physics/arcade/. Other exact paths include skills/scenes/SKILL.md and skills/v3-to-v4-migration/SKILL.md.
- **Limitations:** Targets Phaser 4; do not silently apply its rendering/migration guidance to Phaser 3 projects. A skill is knowledge and example code, not an editor-control service or a finished game. Agent names come from the official README and are not an end-to-end compatibility certification; Google models being mentioned is not treated as proof of Gemini CLI usage.
- **Publisher:** Phaser Studio · Official publisher source.

### GodotPrompter: multi-agent Godot skills and reusable movement code

A Godot-specific skill framework spanning gameplay, scene architecture, shaders, animation, testing, exports, and code review. It includes concrete GDScript/C# recipes, agent routing, platform-specific metadata, an OpenCode plugin, and machine-readable host verification status.

**Kind:** Skills & instructions · **Agents:** Antigravity · Claude Code · GitHub Copilot · Cursor · Codex · OpenCode · Grok Build · **Engine:** Godot 4.x · GDScript / C#

[Code / instructions](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) · [Review evidence](https://github.com/jame581/GodotPrompter/blob/master/tests/agent-integration/host-smoke-matrix.json) · [Project source](https://github.com/jame581/GodotPrompter)

- **Material:** Implementation and instructions.
- **Scope:** Skills with implementation examples and host-integration code. Verified skills/player-controller/references/common-movement-recipes.md contains GDScript and C# dash/wall-jump recipes; .opencode/plugins/godot-prompter.js injects bootstrap context and registers skills; scripts/ validates skill/platform metadata. The repository uses master, not main.
- **Limitations:** The author marks Claude Code and Copilot CLI verified, Cursor registration as awaiting end-to-end confirmation, and several other hosts as documented only. Antigravity uses a documented GEMINI.md path; this is not presented as a verified Gemini CLI integration. Skills do not directly operate the Godot editor, and version-specific examples require matching the project’s Godot version.
- **Publisher:** jame581 · Community / independent source.

### Playgama: web-game performance skill and executable probes

A reusable skill that measures a running game after warm-up and guides performance fixes using frame time, JavaScript cost, draw calls, and triangles. It includes both a headless measurement script and an in-game probe for real-device observation.

**Kind:** Skills & instructions · **Agents:** Gemini CLI · Claude Code · Codex · Cursor · GitHub Copilot · **Engine:** Canvas / WebGL browser games

[Code / instructions](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-performance) · [Review evidence](https://github.com/Playgama/gamedev-skills/blob/main/skills/web-game-performance/README.md) · [Project source](https://github.com/Playgama/gamedev-skills)

- **Material:** Implementation and instructions.
- **Scope:** SKILL.md plus scripts/perf.mjs and scripts/probe.js. Verified perf.mjs launches Puppeteer, accepts URL, warm-up/duration, phone emulation, readiness/setup hooks, JSON output, and before/after comparison. Root README explicitly documents Gemini CLI and the other named skill hosts.
- **Limitations:** Needs Node 18+ and Puppeteer or puppeteer-core plus a Chrome executable. A throttled headless run is not a measurement of an actual phone; the author distinguishes comparable local runs from real-device telemetry. This is game-validation tooling, not a new game or a Google-authored extension.
- **Publisher:** Playgama · Community / independent source.

### Playgama: asset-production skill and GLB/audio build pipeline

A coding-agent skill for choosing a coherent asset set, recording credits, and preparing it for shipping. Its executable pipeline cleans and compresses GLB models while preserving names, handles audio conversion, and can re-encode textures.

**Kind:** Skills & instructions · **Agents:** Gemini CLI · Claude Code · Codex · Cursor · GitHub Copilot · **Engine:** Web games · glTF / GLB assets

[Code / instructions](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-assets) · [Review evidence](https://github.com/Playgama/gamedev-skills/blob/main/skills/web-game-assets/README.md) · [Project source](https://github.com/Playgama/gamedev-skills)

- **Material:** Implementation and instructions.
- **Scope:** SKILL.md plus scripts/assets.mjs. Verified the script’s geometry/texture/audio options, incremental hashing, name-preserving glTF processing, and CLI entry. Root installation matrix explicitly covers Gemini CLI, Claude Code, Codex, Cursor, and Copilot.
- **Limitations:** Requires Node 18+, glTF Transform, meshoptimizer, optional sharp, and ffmpeg for audio. Third-party components and assets are not bundled. This processes selected assets; it is not a generative-image/model service, a game engine, or a finished game.
- **Publisher:** Playgama · Community / independent source.

### GameDev Agent Skills: engine router and test/code recipes

A community skill library whose router detects the project’s engine and loads task-specific guidance. Beyond a directory of links, it contains the actual skill bodies, source-backed code recipes, a skill validator, and asset-report/preview utilities.

**Kind:** Skills & instructions · **Agents:** Gemini CLI · Claude Code · Codex · Cursor · GitHub Copilot · Cline · **Engine:** Godot · Unity · Unreal · Bevy · Phaser · PixiJS · Three.js · LÖVE · pygame · Roblox

[Code / instructions](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills) · [Review evidence](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/router/SKILL.md) · [Project source](https://github.com/gamedev-skills/awesome-gamedev-agent-skills)

- **Material:** Agent instructions.
- **Scope:** Router and engine/discipline/genre/workflow SKILL.md files. Verified skills/godot/godot-gdscript-headless-testing/SKILL.md contains a SceneTree test-runner recipe and explicit failure exit handling; scripts/validate-skills.py validates the collection; skills/disciplines/create-game-assets/scripts/ includes asset_report.py and build_preview_sheet.py. README names native Gemini CLI support.
- **Limitations:** Primarily a version-targeted instruction/example library rather than an engine-control runtime. Current Godot testing guidance targets 4.7; other engine groups have their own baselines. Install compatibility statements are the maintainer’s claims, and this research did not execute cross-agent smoke tests.
- **Publisher:** gamedev-skills · Community / independent source.

### Aider: an official Pong build transcript with real code edits

Aider’s own example records building Pong and then changing paddle colors, size, and ball behavior. It exposes the actual edit blocks and applied Git commits, making the incremental coding workflow inspectable rather than presenting an unexplained final screenshot.

**Kind:** Build workflows · **Agents:** Aider · **Engine:** pygame · Python

[Code / instructions](https://github.com/Aider-AI/aider/blob/main/aider/website/examples/pong.md) · [Review evidence](https://github.com/Aider-AI/aider/blob/main/aider/website/examples/2048-game.md) · [Project source](https://aider.chat/examples/pong.html)

- **Material:** Agent instructions.
- **Scope:** Published transcript with Python edit blocks for pong_game.py, Paddle/Ball classes, input, collision, drawing, ball reset, and customizations. Numeric score display is suggested rather than implemented in this transcript. The related 2048 transcript shows inspecting js/game_manager.js and patching its scoring logic in an existing public JavaScript game.
- **Limitations:** Historical documentation examples, not a separately packaged current game repository or benchmark. Reconstruct the applied edits and install pygame to run Pong; no current model-performance claim is implied. The original 2048 game is human-authored and is only used to demonstrate an AI-assisted modification.
- **Publisher:** Aider · Official publisher source.

## Game cases: actual attribution and complete source

Open the game project alongside its creator's build record and playable or local release.

| Game | Creator-attributed client or model | Actual game source | Creator AI evidence |
| --- | --- | --- | --- |
| Cloud Crush: Gemini CLI builds a match-3 game | Gemini CLI | [Game project](https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang) | [See Google’s explicit Gemini CLI attribution](https://github.com/GoogleCloudPlatform/devrel-demos/blob/main/codelabs/gemini-cli/gemini-cli-match3-golang/README.md) |
| Dinosaur Game Offline: Gemini CLI-assisted runner | Gemini CLI | [Game project](https://github.com/tonidevvn/dinosaur-game-offline) | [See the creator’s Gemini CLI disclosure](https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped) |
| Moonlight & Mayhem | Codex | [Game project](https://github.com/simonw/raccoon-heist-codex/) | [Read the published Codex transcript](https://github.com/simonw/raccoon-heist-codex/blob/main/transcript.md) |
| TRON: EXONIX | Claude Code | [Game project](https://github.com/witnesstodark/tron-exonix) | [Read how the agent workflow was assembled](https://github.com/witnesstodark/tron-exonix/blob/master/CLAUDE.md) |
| Tetris built by an AI agent team | Claude Code | [Game project](https://github.com/caiguanhao/tetris) | [See the original agent prompts](https://github.com/caiguanhao/tetris#the-prompt-used-to-spawn-the-team) |
| Tower of Time: prompting a rewind mechanic | Cursor · Augment Code | [Game project](https://github.com/maciej-trebacz/tower-of-time-game) | [Read the AI contribution disclosure](https://github.com/maciej-trebacz/tower-of-time-game#vibe-coding-proof-of-concept) |
| Raccoon Heist | Claude Code | [Game project](https://github.com/simonw/raccoon-heist/) | [Read the agent’s build notes](https://github.com/simonw/raccoon-heist/blob/main/notes.md) |
| Hajimi Defense: The Tuna Crisis | Other / unspecified agent | [Game project](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_towerDefense_hajimi.zip) | [Author prompt and generation claim](https://github.com/leigest519/OpenGame#playable-demos) |
| Marvel Avengers: Infinity Strike | Other / unspecified agent | [Game project](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_platformer_marvel.zip) | [Author prompt and generation claim](https://github.com/leigest519/OpenGame#playable-demos) |
| Harry Potter: Arithmancy Academy | Other / unspecified agent | [Game project](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_uiHeavy_harryPotter.zip) | [Author prompt and generation claim](https://github.com/leigest519/OpenGame#playable-demos) |
| Star Wars: Mandalorian Protocol | Other / unspecified agent | [Game project](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_topDown_starWars.zip) | [Author prompt and generation claim](https://github.com/leigest519/OpenGame#playable-demos) |
| Turbo Kart Rally | Claude Code | [Game project](https://github.com/bridge-mind/turbo-kart-rally) | [Read the creator’s agent breakdown](https://github.com/bridge-mind/turbo-kart-rally#how-it-was-built) |
| Long Wind | Claude Code | [Game project](https://github.com/jbang2004/long-wind) | [Read the human and AI contribution account](https://github.com/jbang2004/long-wind#%E5%AE%83%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E5%87%BA%E6%9D%A5%E7%9A%84) |
| NOVA LANCER | Claude Code | [Game project](https://github.com/tanuu5/nova-lancer) | [Read the creator’s AI build record](https://github.com/tanuu5/nova-lancer#%E5%88%B6%E4%BD%9C%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6) |
| Orb Shooter | Antigravity | [Game project](https://github.com/theredstapler/orb-shooter) | [Read the human and AI roles](https://github.com/theredstapler/orb-shooter#-the-human-element) |
| Operation Naptime · Operación Siesta | Claude Code | [Game project](https://github.com/alandaitch/operacion-siesta) | [Read the published Claude Code session](https://operacion-siesta.vercel.app/transcript.html) |
| Ombres | Claude Code | [Game project](https://github.com/briossant/ombres) | [Read the original game brief](https://github.com/briossant/ombres/blob/master/docs/BRIEF.md) |
| Dragon’s Reach | Claude Code | [Game project](https://github.com/jaydemks/ImADragon_onepromptcode_game) | [Read the creator’s build postmortem](https://github.com/jaydemks/ImADragon_onepromptcode_game#what-this-is) |
| Vibe Jet | Gemini model / AI Studio | [Game project](https://github.com/cedrickchee/vibe-jet) | [Read the creator’s development approach](https://github.com/cedrickchee/vibe-jet#my-development-approach) |
| Slide Rush | Claude model / chat | [Game project](https://github.com/KJLKurt/waterslide-game-opus-5.5) | [Read the author’s model record](https://github.com/KJLKurt/waterslide-game-opus-5.5#completion-data) |
| The Tithe | Claude model / chat | [Game project](https://github.com/miguelsolorio/the-tithe) | [See the author’s Opus attribution](https://github.com/miguelsolorio/the-tithe) |
| Michi-Neko · The Cat Philosopher’s Path | Other / unspecified agent | [Game project](https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path) | [Read the creator’s AI contribution statement](https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path#-how-this-was-made) |
| FragArena | GitHub Copilot | [Game project](https://github.com/jonnyleigh/fragarena) | [Read the creator’s Copilot disclosure](https://github.com/jonnyleigh/fragarena#fragarena) |
| GothicVania: Codex builds a platformer | Codex | [Game project](https://github.com/acatovic/gothicvania-codex-demo) | [Read the asset and human contribution credits](https://github.com/acatovic/gothicvania-codex-demo#attribution) |
| Pixel Princess: a complete arcade campaign | Claude Code | [Game project](https://github.com/VTvito/pixel-princess-platformer) | [See the creator’s AI disclosure](https://github.com/VTvito/pixel-princess-platformer#built-with-ai--how-this-was-made) |
| Claude Code Tower Defense | Claude Code | [Game project](https://github.com/mdkess/claude-game) | [See the author’s attribution](https://github.com/mdkess/claude-game#acknowledgments) |
| Cursor’s procedural platformer experiment | Cursor | [Game project](https://github.com/commjoen/generated-game-experiment) | [See the creator’s Cursor attribution](https://github.com/commjoen/generated-game-experiment) |
| Mini Snake: a Claude conversation game | Claude model / chat | [Game project](https://github.com/BizShibe/claude-ai-mini-snake-game) | [See the Claude creation claim](https://github.com/BizShibe/claude-ai-mini-snake-game#readme) |
| Flux: Codex gravity-flip runner | Codex | [Game project](https://github.com/scriptedbyshivam/codex-hackathon-2026) | [See the author’s Codex attribution](https://github.com/scriptedbyshivam/codex-hackathon-2026#readme) |
| Bash Fighter: an agent-developed multiplayer brawler | Other / unspecified agent | [Game project](https://github.com/Bash-Entertainment/bash-fighter) | [See the owner’s attribution](https://github.com/Bash-Entertainment/bash-fighter#readme) |
| Running Man: Claude Code meets PixelLab | Claude Code | [Game project](https://github.com/balbonits/ai-browser-game-demos) | [Read the tool and asset disclosure](https://github.com/balbonits/ai-browser-game-demos#tools-used) |
| Garden Match: agents build and review a puzzle game | Codex · Claude Code | [Game project](https://github.com/kevinchenkai/GameAI/tree/main/garden) | [Read the game architecture and asset notes](https://github.com/kevinchenkai/GameAI/blob/main/garden/README.md) |
| Dunkirk: an honestly documented AI-assisted shooter | Gemini model / AI Studio · Claude model / chat · ChatGPT | [Game project](https://github.com/Ponloe/dunkirk-godot) | [See the manual and AI contribution breakdown](https://github.com/Ponloe/dunkirk-godot#what-ai-generated) |
| Gravity Birds: Grok Bot directs Cursor | Cursor | [Game project](https://github.com/az9713/grokbot-game-dev-demo) | [Read the creator’s agent workflow disclosure](https://github.com/az9713/grokbot-game-dev-demo#about) |
| Quasar Saz: an unusual Claude Code experiment | Claude Code | [Game project](https://github.com/cleak/quasar-saz) | [Read the creation and release disclosure](https://github.com/cleak/quasar-saz#readme) |
| Agent Arcade: Copilot builds desktop arcade games | GitHub Copilot | [Game project](https://github.com/DanWahlin/agent-arcade) | [See the author’s development disclosure](https://github.com/DanWahlin/agent-arcade#how-this-was-made) |
| Space Shooter: a family Cursor experiment | Cursor | [Game project](https://github.com/littleearth/vibe-coded-games/tree/main/shooter) | [See the author’s Cursor attribution](https://github.com/littleearth/vibe-coded-games#game-details) |
| Destruction Derby Arena | Cursor | [Game project](https://github.com/littleearth/vibe-coded-games/tree/main/demoderby) | [Read the Cursor development statement](https://github.com/littleearth/vibe-coded-games#development) |
| Beach Kitty | Claude Code · Gemini model / AI Studio | [Game project](https://github.com/matthewod11-stack/CatRunner) | [See the author’s tool attribution](https://github.com/matthewod11-stack/CatRunner#built-with) |
| Pirate Fleet Commander | Gemini model / AI Studio · Claude model / chat | [Game project](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pirate%20Fleet%20Commander%20v7.4.html) | [See the author’s AI contribution statement](https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process) |
| Kymograph | Gemini model / AI Studio · Claude model / chat | [Game project](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Kymograph%20v4.html) | [See the author’s AI contribution statement](https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process) |
| Midnight Pumpkin Hunt | Gemini model / AI Studio · Claude model / chat | [Game project](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pumpkin%20Hunt%20Horror%20Game%20v3.html) | [See the author’s AI contribution statement](https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process) |
| Snake: Neon Arcade Edition | DeepSeek model | [Game project](https://github.com/TwitchCaptain/snake) | [See the creator’s DeepSeek attribution](https://github.com/TwitchCaptain/snake) |
| Mini KSP: a Chinese rocket sandbox | DeepSeek Harness | [Game project](https://github.com/BairlyEmei/mini-ksp) | [See the creator’s DeepSeek Harness attribution](https://github.com/BairlyEmei/mini-ksp) |

For play/run instructions, development records, and fuller contribution descriptions, see the [AI game-build guide](tutorials-and-demos.md). Evidence and source availability can change after the recorded review.
