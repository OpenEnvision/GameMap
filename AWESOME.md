# Awesome AI Game Development

> A planning map for AI game development — from an idea to a playable world.

**109 curated primary sources** connecting coding agents, game engines, AI for 2D and 3D development, production tools, and code world models. Main source review date: **October 18, 2026**. This is a research snapshot: reviewing a source does not imply reproducing its results or continuously monitoring it.

- [Interactive GameMap website — GitHub Pages](https://openenvision.github.io/GameMap/)
- [A practical guide from resources to a working project](docs/practical-guide.md)
- [Production research: interfaces, evidence and generative-service boundaries](docs/research-index.md)
- [Tutorials, playable demos, and complete example-game source](docs/tutorials-and-demos.md)
- [Coding agents × games: skills, bridges, evaluations, and game code](docs/coding-agent-game-code.md)
- [Testing library: games, AI environments, assets, rigs, and motion data](docs/game-testing-library.md)
- [Contributing and data maintenance](CONTRIBUTING.md) · [Structured JSON](data/resources.json)

## How to read the map

| Layer | What it addresses | Evidence to look for |
| --- | --- | --- |
| Model / coding agent / harness | Reasoning, code changes, and tool execution | Actual tools, runtime feedback, and supported tasks |
| Skill / MCP / CLI | Domain knowledge and engine editing | Real SKILL.md files, protocols, and editor operations |
| Framework / tool | Organizing generation or completing a production task | Inputs, outputs, project formats, and release status |
| Benchmark | Repeatable development evaluation | Tasks, scoring scripts, environments, and versions |
| Paper / world model | Executable state, neural simulation, or hybrid rendering | World representation, action interface, long-term consistency, and public availability |

**Editorial notes.** DeepSeek is listed through its model integration documentation, rather than as an official standalone harness. Blender is a DCC application and Three.js is a 3D library; their roles differ from those of full game engines. Development, gameplay, and modeling evaluations are considered separately. SolarRenderer and StreamRender-H3 belong to the structure- or engine-driven hybrid rendering track; pure video world models are labeled separately. The roadmaps and acceptance criteria are GameMap editorial guidance.

## Contents

- [1. Coding agents and game development bridges](#agents) — 20 resources
- [2. Game engines, DCC tools, and ecosystems](#engines) — 24 resources
- [3. AI for 2D game development](#2d) — 13 resources
- [4. AI for 3D game development](#3d) — 15 resources
- [5. Game production: art, animation, audio, testing, and runtime AI](#production) — 17 resources
- [6. Code world models and interactive worlds](#world) — 20 resources

<a id="agents"></a>

## Coding agents and game development bridges

### Agent

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli) | A general-purpose coding agent for reading, editing, running commands, and reviewing code in a local repository. | Planning / Coding / Testing / Shipping |
| [Claude Code](https://code.claude.com/docs/en/overview) | A coding agent that reads and edits projects, runs tools, and supports skills, hooks, and MCP through terminal and IDE interfaces. | Planning / Coding / Testing / Shipping |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Google's open-source terminal coding agent with file access, shell tools, extensions, and MCP support. | Planning / Coding / Testing |
| [OpenCode](https://opencode.ai/docs/) | An open-source coding agent with multiple model providers, Plan / Build modes, and project instructions. | Planning / Coding / Testing |
| [Cline](https://github.com/cline/cline) | An open-source coding agent with multiple models, Plan / Act modes, project rules, and MCP support. | Planning / Coding / Testing |
| [Aider](https://github.com/Aider-AI/aider) | A terminal AI pair-programming tool built around repository maps, Git changes, and lint and test feedback. | Coding / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli)**

Useful as the main code execution loop for a game project: break down gameplay, maintain scripts, run builds, and inspect failures. Engine integration still requires a CLI, editor bridge, or MCP server; compiling successfully does not establish that a game is playable.

Tags: `CLI` · `General-purpose agent` · `Code review` · `MCP` · `Skills`. Source reviewed: 2026-10-18. Further reading: [Official game workflow](https://learn.chatgpt.com/use-cases/browser-games)

**[Claude Code](https://code.claude.com/docs/en/overview)**

Can develop game scripts, migrate architecture, troubleshoot builds, and connect to Unity, Godot, or UE through community MCP servers. Use CLAUDE.md, skills, and editor state together; one MCP demonstration does not establish complete engine automation.

Tags: `CLI` · `General-purpose agent` · `MCP` · `Skills` · `Hooks`. Source reviewed: 2026-10-18. Further reading: [Official repository and examples](https://github.com/anthropics/claude-code)

**[Gemini CLI](https://github.com/google-gemini/gemini-cli)**

Can help understand game projects, edit scripts, and drive editors through MCP. The official README states that Antigravity CLI replaced Gemini CLI for unpaid-tier and Google One users on June 18, 2026, and that Gemini CLI is not optimized for the latest Gemini models. Check the account-specific migration guidance before choosing this entry point.

Tags: `CLI` · `Google` · `MCP` · `Open source` · `Migration guidance`. Source reviewed: 2026-10-18. Further reading: [Official documentation](https://geminicli.com/docs/)

**[OpenCode](https://opencode.ai/docs/)**

Useful for planning and editing game projects with independently selected providers and models. Pin V1 or V2: the V2 migration guide documents incompatible plugin/server APIs, external-directory access allowed by default, and no running LSP or LSP diagnostics despite accepted configuration. Validate permissions, MCP integrations, and compiler/test feedback for the chosen version; editor and gameplay inspection still require separate tools.

Tags: `CLI` · `Multiple models` · `Plan / Build` · `Open source` · `AGENTS.md`. Source reviewed: 2026-10-18. Further reading: [Source code](https://github.com/anomalyco/opencode) · [V1 to V2 migration boundaries](https://opencode.ai/v2/docs/migrate-v1/)

**[Cline](https://github.com/cline/cline)**

Useful for reviewing and editing game code in an IDE or CLI, with build output and MCP editor tools in the feedback loop. Reuse .clinerules and skills to capture engine conventions; editor operations depend on the specific bridge service.

Tags: `IDE` · `CLI` · `Multiple models` · `MCP` · `Plan / Act`. Source reviewed: 2026-10-18. Further reading: [Documentation](https://docs.cline.bot/)

**[Aider](https://github.com/Aider-AI/aider)**

Useful for changes across files, refactoring, and testable logic in existing game projects, with model options including DeepSeek. It accepts supplied screenshots with a vision-capable model. Its code editing workflow does not directly control Unity, UE, or Blender editors; automated screenshot capture and game interaction need a separate setup.

Tags: `CLI` · `Git` · `Repository map` · `Multiple models` · `Refactoring`. Source reviewed: 2026-10-19. Further reading: [User documentation](https://aider.chat/docs/) · [Screenshot and image input](https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/website/docs/usage/images-urls.md#L11-L27)

</details>

### Framework

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [OpenHands · Agent Canvas](https://github.com/OpenHands/OpenHands) | An open-source development console for managing local, remote, and cloud agent environments. | Planning / Coding / Testing / Shipping |
| [OpenHands Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | A programmable development framework for agents, tools, conversations, workspaces, and server interfaces. | Planning / Coding / Testing |
| [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) | Embed Claude Code's tool loop, permissions, sessions, and extensions in Python or TypeScript applications. | Planning / Coding / Testing |
| [mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent) | A minimal shell-based coding-agent research baseline designed for modification and trace inspection. | Coding / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[OpenHands · Agent Canvas](https://github.com/OpenHands/OpenHands)**

Can centralize multi-agent tasks, environments, and execution records for game projects. The repository provides the Agent Canvas frontend and orchestration entry point; the core tool loop and Agent Server live in a separate SDK repository. Game automation still requires engine tools.

Tags: `Agent Canvas` · `Environments` · `Multi-agent` · `Open source` · `Orchestration`. Source reviewed: 2026-10-18. Further reading: [Core SDK](https://github.com/OpenHands/software-agent-sdk)

**[OpenHands Software Agent SDK](https://github.com/OpenHands/software-agent-sdk)**

Useful for wrapping builds, scene inspections, and tests as agent tools. The Python SDK supports local and remote workspaces; the checked TypeScript client is alpha and supports remote conversations through Agent Server only. Pin client/server versions rather than assuming interface parity. Game-specific tools and acceptance checks still need to be supplied.

Tags: `SDK` · `Python` · `TypeScript` · `Workspaces` · `Reproducible experiments`. Source reviewed: 2026-10-19. Further reading: [SDK documentation](https://docs.openhands.dev/sdk) · [TypeScript client scope and stability](https://github.com/OpenHands/software-agent-sdk/blob/3f3294581ebf40f3bbe5b96aec1d28b7fec96226/clients/typescript/README.md#L1-L19)

**[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)**

Runs the Claude Code binary and tool loop inside a process you operate, with Python or TypeScript APIs for permissions, sessions, hooks, and MCP. It can support game-specific repair and validation services, but domain tools, scoring rules, and runtime environments must be supplied. This differs from a Client SDK for direct model calls; the official overview also specifies Anthropic Commercial Terms and separate authentication constraints.

Tags: `SDK` · `Python` · `TypeScript` · `MCP` · `Hooks`. Source reviewed: 2026-10-18.

**[mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent)**

Useful for isolating model, prompt, and environment effects in game code generation and repair, or wrapping headless engine commands. Its minimal loop executes commands in independent subprocesses rather than a persistent shell, so working-directory and environment setup must be carried into each command or script. It is a general software-engineering baseline; playability, visuals, and physics require additional validation.

Tags: `Research baseline` · `Shell` · `Harness` · `Traces` · `Open source`. Source reviewed: 2026-10-18. Further reading: [Predecessor: SWE-agent](https://github.com/SWE-agent/SWE-agent)

</details>

### Skill

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Unity-MCP Operator Guide](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md) | A practical MCP for Unity skill: inspect editor state, act, wait for compilation and domain reload, then verify results. | Coding / Scenes / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Unity-MCP Operator Guide](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md)**

Defines resource-first scene operations and requires checking compilation, domain reload, tool readiness, and blocking reasons before further edits. Script changes are followed by console and screenshot checks. This is a procedure source for MCP for Unity, not an installed or tested integration here; examples and parameters depend on bridge, Unity, UI, and input-system versions.

Tags: `Unity` · `Skills` · `MCP` · `Compilation feedback` · `Skill source`. Source reviewed: 2026-10-18.

</details>

### Documentation

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [DeepSeek · Agent Integrations](https://api-docs.deepseek.com/guides/anthropic_api/) | Official guidance for using DeepSeek as a model backend within agent harnesses such as Claude Code. | Planning / Coding / Testing |
| [AGENTS.md](https://agents.md/) | An open Markdown format for giving coding agents build commands, test rules, and project conventions. | Planning / Coding / Testing / Shipping |
| [Agent Skills](https://agentskills.io/home) | An open format that packages domain workflows as SKILL.md instructions, scripts, and reference materials. | Planning / Coding / Assets / Scenes / Testing / Shipping |
| [Codex · Create Browser-based Games](https://learn.chatgpt.com/use-cases/browser-games) | OpenAI's browser game workflow covering planning, project instructions, asset generation, and browser iteration. | Planning / Coding / Assets / Testing / Shipping |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[DeepSeek · Agent Integrations](https://api-docs.deepseek.com/guides/anthropic_api/)**

The Anthropic API compatibility layer connects DeepSeek to existing tool loops. The harness handles files, tests, and engine connections. The guide supports ordinary tool calls but ignores the server-side mcp_servers field and does not support MCP-specific content blocks. Client-side MCP tools therefore remain the harness's responsibility; API compatibility does not establish complete feature parity.

Tags: `DeepSeek` · `Model backend` · `Harness` · `API compatibility` · `Scope`. Source reviewed: 2026-10-18.

**[AGENTS.md](https://agents.md/)**

Game projects can record engine versions, launch commands, directory rules, asset import conventions, and acceptance checks to reduce environment guesswork. This is a project instruction format rather than an agent runtime; discovery and configuration vary by client.

Tags: `Project instructions` · `Project conventions` · `Open format` · `Context`. Source reviewed: 2026-10-18.

**[Agent Skills](https://agentskills.io/home)**

Useful for repeatable game tasks such as sprite normalization, GLB export, scene inspection, and regression testing, with domain knowledge loaded as needed. Skills provide procedures and resources; engine control still requires tools, dependencies, and a compatible client.

Tags: `Skills` · `Open format` · `Workflows` · `Progressive loading`. Source reviewed: 2026-10-18.

**[Codex · Create Browser-based Games](https://learn.chatgpt.com/use-cases/browser-games)**

Define the player goal, core loop, inputs, and win and loss conditions, then implement with PLAN.md and AGENTS.md. Combine image skills and Playwright for visual and interaction feedback. This is a practical guide, not a performance guarantee for every game genre or a research benchmark.

Tags: `Official workflow` · `Browser games` · `Planning` · `Playwright` · `Asset consistency`. Source reviewed: 2026-10-18.

</details>

### Tool

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [MCP for Unity](https://github.com/CoplayDev/unity-mcp) | A community MCP bridge connecting general-purpose coding agents to the Unity Editor. | Coding / Assets / Scenes / Testing / Shipping |
| [Godot MCP · Coding-Solo](https://github.com/Coding-Solo/godot-mcp) | A community MCP server for launching Godot, running projects, reading logs, and performing basic scene operations. | Coding / Scenes / Testing |
| [MCP for Blender](https://github.com/ahujasid/mcp-for-blender) | A Blender add-on and MCP server for agent-driven modeling, materials, Python execution, and visual feedback. | Coding / Assets / Scenes / Testing |
| [Unreal MCP · chongdashu](https://github.com/chongdashu/unreal-mcp) | A Python MCP server and UE C++ plugin connecting agents to Actors, Blueprints, and viewport controls. | Coding / Scenes / Testing |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Microsoft's browser automation MCP server for exposing page structure, interactions, and browser feedback to agents. | Testing / Shipping |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[MCP for Unity](https://github.com/CoplayDev/unity-mcp)**

Exposes editor operations for scenes, GameObjects, C# scripts, assets, and tests. The checked installation source declares Unity 2021.3 LTS or newer, plus Python 3.10+ and uv. These are declared requirements, not versions tested here. The project is independent of Unity Technologies; pin bridge/editor versions and validate compilation, screenshots, and PlayMode tests.

Tags: `Unity` · `MCP` · `Editor bridge` · `Community project` · `C#`. Source reviewed: 2026-10-19. Further reading: [Installation and tool documentation](https://coplaydev.github.io/unity-mcp/) · [Pinned installation requirements](https://github.com/CoplayDev/unity-mcp/blob/aa5fc638d623f56178d50329d9ad8c541a57fe66/website/docs/getting-started/install.md#L13-L17)

**[Godot MCP · Coding-Solo](https://github.com/Coding-Solo/godot-mcp)**

Supports project execution, debug output capture, scene and node creation, Sprite2D texture loading, and some 3D MeshLibrary operations. It can give agents feedback from real projects; these interfaces do not provide complete visual playtesting or every editor feature. At the checked commit, the server keeps one active project process and sends kill before spawning another without awaiting prior exit. Stop returns after sending a kill request rather than waiting for process exit; natural exit clears the handle used by get_debug_output. Archive output separately for reliable crash evidence.

Tags: `Godot` · `MCP` · `GDScript` · `Runtime logs` · `Scenes`. Source reviewed: 2026-10-18. Further reading: [Pinned implementation and lifecycle limits](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts#L1053-L1215)

**[MCP for Blender](https://github.com/ahujasid/mcp-for-blender)**

Useful for 3D game assets and scene prototypes with viewport feedback. Formerly blender-mcp, this community bridge can execute arbitrary Python inside Blender; use trusted tasks and saved copies. The checked documentation distinguishes default minimal usage telemetry from opt-in creative-content collection; DISABLE_TELEMETRY=true disables both. Review the opt-in data terms before enabling content capture. Validate topology, scale, UVs, collision, and exports separately.

Tags: `Blender` · `MCP` · `Python` · `3D assets` · `Community project`. Source reviewed: 2026-10-19. Further reading: [Telemetry defaults and controls](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/README.md#L808-L842) · [Opt-in content and data terms](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/TERMS_AND_CONDITIONS.md)

**[Unreal MCP · chongdashu](https://github.com/chongdashu/unreal-mcp)**

Covers Actor transforms, Blueprint classes and components, some node graphs, and editor camera operations. The README declares Unreal Engine 5.5+ and Python 3.12+ and supplies a UE5.5 example; later-version compatibility is not independently tested here. The author marks it experimental and advises against production use. Pin versions and verify supported operations individually.

Tags: `Unreal Engine` · `MCP` · `Blueprint` · `Experimental` · `Editor bridge`. Source reviewed: 2026-10-18. Further reading: [Tool documentation](https://github.com/chongdashu/unreal-mcp/tree/main/Docs)

**[Playwright MCP](https://github.com/microsoft/playwright-mcp)**

Useful for browser game menus, HUDs, launch flows, keyboard input, and screenshots. The default interface uses accessibility trees; coordinate-based mouse tools require the optional vision capability. Neither interface automatically exposes internal Canvas or WebGL state, so game debug instrumentation may be needed. The checked README warns that the server is not a security boundary and documents browser_run_code_unsafe as arbitrary JavaScript execution in the Playwright server process. The separate Playwright CLI repository provides a CLI + Skills workflow.

Tags: `Playwright` · `MCP` · `Browser testing` · `HUD` · `Canvas limitations`. Source reviewed: 2026-10-19. Further reading: [Pinned tools and security boundaries](https://github.com/microsoft/playwright-mcp/blob/b8b4183e099f136cbec0388a6088d4aa2f6b9685/README.md#security) · [Companion CLI + Skills](https://github.com/microsoft/playwright-cli)

</details>

<a id="engines"></a>

## Game engines, DCC tools, and ecosystems

### Framework

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) | A React renderer for Three.js that brings component-based, declarative scenes into the React ecosystem. | Planning / Coding / Scenes / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)**

Useful for combining web HUDs, application state, and 3D scenes, with pmndrs tools for loading, interaction, and debugging. It does not supply every game system; match React, Fiber, and Three.js versions and define clear boundaries for per-frame simulation.

Tags: `Three.js` · `React` · `R3F` · `pmndrs` · `Declarative scenes`. Source reviewed: 2026-10-18. Further reading: [Source code](https://github.com/pmndrs/react-three-fiber)

</details>

### Documentation

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Godot · Command Line Tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html) | Godot's official CLI reference for headless operation, script checks, asset import, execution, and export. | Coding / Testing / Shipping |
| [Godot Demo Projects](https://github.com/godotengine/godot-demo-projects) | Official runnable Godot examples covering 2D, 3D, GUI, audio, networking, and rendering. | Planning / Coding / Scenes / Testing |
| [Unity · 2D Tech Demos](https://github.com/Unity-Technologies/2d-techdemos) | Official Unity 2D example source for Tilemaps, Scripted Tiles, brushes, and runtime map changes. | Coding / Assets / Scenes / Testing |
| [Lyra Sample Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) | Epic's modular UE5 sample game, with gameplay plugins, abilities, animation, input, and UI. | Planning / Coding / Scenes / Testing |
| [Three.js · Examples](https://threejs.org/examples/) | Official runnable Three.js graphics examples with their HTML and JavaScript source. | Coding / Assets / Scenes / Testing |
| [Blender Python · API Quickstart](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst) | Official Blender API tutorial source covering bpy data, context, operators, and Python operations. | Coding / Assets / Scenes / Testing |
| [Phaser · Examples](https://github.com/phaserjs/examples) | Official Phaser example source with runnable references for specific APIs and gameplay components. | Coding / Scenes / Testing |
| [Unreal Engine · Remote Control API](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine) | Exposes reflected editor properties and functions over HTTP for external tooling. | Coding / Scenes / Testing |
| [Unity · Addressables Build and Loading APIs](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html) | Builds addressable content from explicit profiles and loads assets through asynchronous handles. | Assets / Coding / Shipping / Runtime AI |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Godot · Command Line Tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)**

Lets coding agents launch projects, read logs, parse scripts, and export builds through commands, reducing GUI dependence. The --check-only flag parses a script supplied with --script; it does not execute gameplay tests. Supported flags vary by build type, and unknown flags are silently ignored; check the selected binary's --help. Headless runs cannot replace real rendering and input tests.

Tags: `Godot` · `CLI` · `Headless` · `Builds` · `Reproducibility`. Source reviewed: 2026-10-19.

**[Godot Demo Projects](https://github.com/godotengine/godot-demo-projects)**

Useful as minimal reference projects and regression tasks for agents, with concrete examples of scenes, scripts, and resources. The repository states that master targets the development engine; choose a matching branch for a stable release to avoid mistaking version conflicts for generation failures.

Tags: `Godot` · `Official examples` · `Runnable source` · `Version branches` · `Reference projects`. Source reviewed: 2026-10-18.

**[Unity · 2D Tech Demos](https://github.com/Unity-Technologies/2d-techdemos)**

Offers concrete references for tile collision lookup, destructible maps, and palette switching so agents can inspect editor configuration. Check project files and package manifests together; older examples may not work with every current Editor and package combination.

Tags: `Unity` · `2D` · `Tilemap` · `Official examples` · `Runnable source`. Source reviewed: 2026-10-18.

**[Lyra Sample Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)**

Useful for learning how Game Feature Plugins, Experiences, and the Gameplay Ability System work together in a real project. Source and content are distributed through Fab / Epic Launcher and require a matching engine version. Lyra is more complex than a minimal prototype, so study it by module.

Tags: `Unreal Engine` · `Official sample` · `GAS` · `Modular design` · `Runnable project`. Source reviewed: 2026-10-18.

**[Three.js · Examples](https://threejs.org/examples/)**

Provides minimal references for loaders, lighting, materials, animation, and rendering techniques to adapt into game scenes. The website and dev branch change continuously; keep source, addons, and runtime on the same release rather than mixing example versions.

Tags: `Three.js` · `Official examples` · `Materials` · `Loaders` · `Runnable source`. Source reviewed: 2026-10-18. Further reading: [Example source](https://github.com/mrdoob/three.js/tree/dev/examples)

**[Blender Python · API Quickstart](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst)**

Provides authoritative guidance for asset scripts, especially the distinction between direct data access and operations that depend on the current mode, selection, or viewport. bpy.ops poll checks can fail because of context; scripts should inspect actual state and verify outputs, beyond syntax checks.

Tags: `Blender` · `Python` · `bpy` · `Context` · `Automation`. Source reviewed: 2026-10-18. Further reading: [API documentation](https://docs.blender.org/api/current/)

**[Phaser · Examples](https://github.com/phaserjs/examples)**

Official examples for animation, cameras, input, physics, and scene transitions. The current README targets Phaser 4, and the labs site defaults to its latest development build; select and pin the version matching your project. The MIT license covers example code, not bundled art assets. Review asset permissions before reuse and test in a real browser.

Tags: `Phaser` · `Official examples` · `Runnable source` · `2D` · `Version scope`. Source reviewed: 2026-10-18.

**[Unreal Engine · Remote Control API](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine)**

Remote Control provides a native engine integration surface distinct from a community MCP bridge. Property writes can request editor transactions and change notifications, but an acknowledged mutation does not establish package-save completion. The rolling Epic guide labels this feature Beta and disables it by default in packaged builds and -game. Enable the appropriate plugin, restrict network exposure, and qualify editor versus packaged-runtime access separately.

Tags: `Unreal Engine` · `HTTP` · `Editor automation` · `State mutation`. Source reviewed: 2026-10-18. Further reading: [HTTP API reference](https://dev.epicgames.com/documentation/en-us/unreal-engine/remote-control-api-http-reference-for-unreal-engine)

**[Unity · Addressables Build and Loading APIs](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html)**

The checked Addressables 1.21 documentation separates content builds from executable builds. Build settings, active profile, builder, and content-state file affect outputs. Runtime loading returns a handle whose status and result must be checked and later released. A key matching several assets can select only the first; preserve dependency and cache provenance.

Tags: `Unity` · `Addressables` · `Asset dependencies` · `Async loading` · `Content builds`. Source reviewed: 2026-10-18. Further reading: [LoadAssetAsync reference](https://docs.unity3d.com/kr/Packages/com.unity.addressables%401.21/api/UnityEngine.AddressableAssets.Addressables.LoadAssetAsync.html)

</details>

### Tool

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Godot Engine · Official Documentation](https://docs.godotengine.org/en/stable/) | An open-source 2D and 3D game engine that organizes runnable projects through scenes, nodes, resources, and scripts. | Planning / Coding / Assets / Scenes / Testing / Shipping |
| [GUT · Godot Unit Test](https://github.com/bitwes/Gut) | A community Godot testing framework for GDScript assertions, test doubles, and parameterized cases. | Coding / Testing |
| [Unity · Manual](https://docs.unity3d.com/Manual/index.html) | Official Unity documentation for projects, the editor, scripting, rendering, physics, asset import, and publishing. | Planning / Coding / Assets / Scenes / Testing / Shipping |
| [Unity Test Framework](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html) | Unity's official testing framework, with Edit mode, Play mode, and command-line execution. | Coding / Testing / Shipping |
| [Unreal Engine · Documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine) | Official Epic documentation for UE C++, Blueprints, rendering, animation, physics, and packaging. | Planning / Coding / Assets / Scenes / Testing / Shipping |
| [Unreal · Automation Test Framework](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine) | UE's official infrastructure for unit, functional, content stress, and screenshot comparison tests. | Coding / Scenes / Testing / Shipping |
| [Three.js](https://github.com/mrdoob/three.js) | A JavaScript 3D rendering library for browsers, with scenes, cameras, materials, and loaders. | Planning / Coding / Assets / Scenes / Testing / Shipping |
| [Blender](https://github.com/blender/blender) | An open-source 3D creation suite for modeling, materials, rigging, animation, simulation, and rendering. | Assets / Scenes / Testing |
| [Khronos · glTF-Blender-IO](https://github.com/KhronosGroup/glTF-Blender-IO) | Khronos's official Blender glTF 2.0 importer and exporter source, including validation and roundtrip tests. | Assets / Scenes / Testing / Shipping |
| [Phaser · First Game Guide](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game) | A browser 2D game framework whose official tutorial covers assets, scenes, animation, input, and collisions. | Planning / Coding / Assets / Scenes / Testing / Shipping |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Godot Engine · Official Documentation](https://docs.godotengine.org/en/stable/)**

Provides authoritative context for GDScript, C#, scene, and resource APIs, helping agents connect script changes to running scenes. Pin the engine version and use matching documentation; stable and development branches are not interchangeable.

Tags: `Godot` · `GDScript` · `Scenes and nodes` · `Official documentation` · `Open source`. Source reviewed: 2026-10-18. Further reading: [Engine source](https://github.com/godotengine/godot) · [Official examples](https://github.com/godotengine/godot-demo-projects)

**[GUT · Godot Unit Test](https://github.com/bitwes/Gut)**

Provides a CLI and JUnit XML output for automated regression checks on generated game state, damage, inventory, and other logic. GUT and Godot versions have explicit compatibility requirements; passing logic tests still leaves visuals, controls, and scene integration to check.

Tags: `Godot` · `Unit testing` · `GDScript` · `CLI` · `JUnit`. Source reviewed: 2026-10-18. Further reading: [Author documentation](https://gut.readthedocs.io/)

**[Unity · Manual](https://docs.unity3d.com/Manual/index.html)**

Provides agents with concrete C# and editor project constraints, plus 2D and 3D workflows and versioned package references. Pin the Editor, render pipeline, and Package Manager versions together; the Unity name alone does not establish API or material compatibility.

Tags: `Unity` · `C#` · `Official documentation` · `Editor` · `Package Manager`. Source reviewed: 2026-10-18. Further reading: [Official example source](https://github.com/Unity-Technologies/2d-techdemos)

**[Unity Test Framework](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html)**

Enables ongoing regression checks for generated scripts and scene behavior, using UnityTest across frames to check lifecycles, coroutines, and state changes. Edit mode and Play mode have different execution loops; tests should wait for real frames or conditions rather than only confirming script creation. The separately checked Test Framework 1.4.6 API returns a job GUID and documents multi-frame cancellation cleanup. Active tests become Canceled and remaining tests NotRun; do not equate cancellation with passing or assume compatibility with every Editor package version.

Tags: `Unity` · `Testing` · `Edit mode` · `Play mode` · `CLI`. Source reviewed: 2026-10-18. Further reading: [Package and API documentation](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/) · [Versioned test-job and cancellation API](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html)

**[Unreal Engine · Documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine)**

Provides authoritative context for UE projects and asset systems, with official samples illustrating complex gameplay architecture. GitHub source access requires linked Epic and GitHub accounts and the relevant authorization steps; Epic also documents a Perforce route for licensees. Source availability does not imply an open-source license.

Tags: `Unreal Engine` · `C++` · `Blueprint` · `Official documentation` · `Authorized source access`. Source reviewed: 2026-10-18. Further reading: [Source access instructions](https://dev.epicgames.com/documentation/en-us/unreal-engine/downloading-source-code-in-unreal-engine) · [Engine source (authorization required)](https://github.com/EpicGames/UnrealEngine)

**[Unreal · Automation Test Framework](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine)**

Can bring Blueprint compilation, level loading, simulated input, and visual regression checks into an agent feedback loop, alongside interfaces such as Functional Testing. Tests require the appropriate plugins and state cleanup; the framework runs within the engine. ResumeRunTest reads an existing JSON report, resumes NotRun tests, and marks interrupted in-progress tests as failures. Preserve the report and distinguish compatible editor and client test contexts.

Tags: `Unreal Engine` · `Automated testing` · `Blueprint` · `Visual regression` · `Content validation`. Source reviewed: 2026-10-18. Further reading: [Command-line reports and interrupted-run resumption](https://dev.epicgames.com/documentation/en-us/unreal-engine/run-automation-tests-in-unreal-engine)

**[Three.js](https://github.com/mrdoob/three.js)**

Lets agents build browser-testable 3D prototypes directly in TypeScript or JavaScript and inspect APIs through source and examples. Game loops, physics, navigation, saves, and other systems need separate design or integration. Validate WebGL and WebGPU paths individually.

Tags: `Three.js` · `JavaScript` · `WebGL` · `WebGPU` · `Rendering library`. Source reviewed: 2026-10-18. Further reading: [Official manual](https://threejs.org/manual/) · [Official examples](https://threejs.org/examples/)

**[Blender](https://github.com/blender/blender)**

Primarily supports game asset and scene production, with agent-generated Python scripts for repeatable tasks. Blender is not a game runtime engine; verify scale, coordinates, materials, rigs, and animation after importing into Unity, UE, Godot, or a browser.

Tags: `Blender` · `DCC` · `3D assets` · `Animation` · `Open source`. Source reviewed: 2026-10-18. Further reading: [Official main repository](https://projects.blender.org/blender/blender) · [Reference manual](https://docs.blender.org/manual/en/latest/) · [Python API](https://docs.blender.org/api/current/)

**[Khronos · glTF-Blender-IO](https://github.com/KhronosGroup/glTF-Blender-IO)**

Connects Blender asset production to game runtimes and helps diagnose material, mesh, and animation conversion issues. Match the addon's release branch to the Blender version; main can target an upcoming Blender release. Repository CI validates exports and compares import / export roundtrips. A valid file can still render differently in the target engine, so verify runtime imports.

Tags: `Blender` · `glTF` · `GLB` · `Asset pipeline` · `Roundtrip validation`. Source reviewed: 2026-10-19. Further reading: [Technical notes](https://github.com/KhronosGroup/glTF-Blender-IO/blob/main/Technical.md) · [GameMap: asset validity and runtime fidelity](https://github.com/OpenEnvision/GameMap/blob/main/docs/asset-validation-contracts.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity)

**[Phaser · First Game Guide](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game)**

Useful for quickly building browser-testable 2D core loops organized around preload / create / update. In the tutorial, scaled static Arcade Physics objects need their collision bodies refreshed. A visible scene alone does not verify input, restart behavior, or lifecycle handling.

Tags: `Phaser` · `2D` · `JavaScript` · `Browser games` · `Arcade Physics`. Source reviewed: 2026-10-18. Further reading: [Framework source](https://github.com/phaserjs/phaser) · [Official documentation](https://docs.phaser.io/)

</details>

### Community

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [GDQuest · First 2D Game](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/) | A GDQuest tutorial for a Godot 2D survival game, with complete scripts, a project, and troubleshooting notes. | Planning / Coding / Scenes / Testing |
| [Catlike Coding · Surface Contact](https://catlikecoding.com/unity/tutorials/movement/surface-contact/) | Jasper Flick's Unity movement tutorial explains character control through slopes, steps, and contact timing. | Coding / Scenes / Testing |
| [Epic Developer Community · UE](https://dev.epicgames.com/community/unreal-engine) | Epic's UE community hub for author tutorials, learning materials, and version-specific discussions. | Planning / Coding / Assets / Scenes / Testing |
| [Three.js · Instanced Crowd Engineering](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928) · 2026 | A game author's Three.js forum write-up on a single-draw-call crowd system, instance data, LOD, and staggered updates. | Coding / Scenes / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[GDQuest · First 2D Game](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/)**

Covers movement, aiming, projectiles, enemy spawning, and failure states as a reference for a complete core loop. The tutorial was made with Godot 4.1 and updated to 4.6. Its troubleshooting explains grounded / floating modes and an enemy count limit. Code uses MIT while art assets use CC BY-NC-SA 4.0; check reuse conditions separately.

Tags: `Godot` · `Community experience` · `Complete core loop` · `Collision debugging` · `2D`. Source reviewed: 2026-10-18. Further reading: [Project source](https://github.com/gdquest-demos/getting-started-with-godot-4) · [Tutorial library](https://www.gdquest.com/library/)

**[Catlike Coding · Surface Contact](https://catlikecoding.com/unity/tutorials/movement/surface-contact/)**

The author uses test scenes to reproduce loss of ground contact, ghost collisions, raycasts, and ground snapping, giving agents causal explanations of physics behavior. The tutorial uses Unity 2019.2.14f1 and ProBuilder; adapt its algorithms, APIs, input, and project configuration to the target version.

Tags: `Unity` · `Community experience` · `Physics` · `Character control` · `Debugging`. Source reviewed: 2026-10-18. Further reading: [Complete movement series](https://catlikecoding.com/unity/tutorials/movement/) · [Shader and project tutorials](https://catlikecoding.com/unity/tutorials/)

**[Epic Developer Community · UE](https://dev.epicgames.com/community/unreal-engine)**

Useful for practical material, animation, Blueprint, and performance troubleshooting beyond official references. Check each contribution's author, date, engine version, and reproducible project; access to the hub does not establish that every post has been verified.

Tags: `Unreal Engine` · `Community` · `Tutorials` · `Practical experience` · `Per-source verification`. Source reviewed: 2026-10-18.

**[Three.js · Instanced Crowd Engineering](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928)**

Offers explainable performance techniques, with the author's playable demo showing technical and visual tradeoffs. Frame rates are self-reported on the author's hardware, not a benchmark across devices. Measure GPU, CPU, bandwidth, and visual quality after optimization.

Tags: `Three.js` · `Community experience` · `Instancing` · `LOD` · `Performance`. Source reviewed: 2026-10-18. Further reading: [Community forum](https://discourse.threejs.org/)

</details>

<a id="2d"></a>

## AI for 2D game development

### Agent

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [OpenGame](https://github.com/leigest519/OpenGame) · 2026 | Generates browser game projects with reusable templates and debugging skills. | Planning / Coding / Assets / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[OpenGame](https://github.com/leigest519/OpenGame)**

Turns natural-language requirements into web projects using Template Skill and Debug Skill for Canvas, Phaser, three.js, and other templates. The public CLI accepts OpenAI-compatible model endpoints; the paper also introduces GameCoder-27B. Browser execution and visual judging assess build health, usability, and intent alignment. The README still lists the standalone evaluation pipeline as forthcoming; model weights and full evaluation reproducibility are not established by the framework release alone.

Tags: `Browser games` · `Game Skill` · `Browser feedback` · `GameCoder-27B`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2604.18394)

</details>

### Framework

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier) · 2026 | Verifies generated game behavior through runtime state hooks and focused checks. | Coding / Testing |
| [GAVEL](https://github.com/gdrtodd/gavel) · 2024 | Combines language models and quality-diversity search to create board game rules. | Planning / Coding / Testing |
| [Cardiverse](https://github.com/danruili/Cardiverse) · 2025 | Connects card game design, Python rule code, and playtesting in a prototype pipeline. | Planning / Coding / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier)**

Breaks game requirements into independently testable checkpoints and checks functionality through browser and runtime adapters. The repository provides GGV-Harness and verifier skills for Codex and Claude. Public code does not include all generated games, run outputs, or private configurations. State hooks also provide observability beyond a purely black-box playtest.

Tags: `Functional verification` · `Playwright` · `Runtime state` · `Verifier Skill`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2605.07442)

**[GAVEL](https://github.com/gdrtodd/gavel)**

Uses Ludii game description code as its representation. A language model mutates and recombines rules, then simulation and search select games. Code, experiments, and related model and data references are public. The outputs are board games within a rule system; these results do not establish general 2D action game development ability.

Tags: `Game design` · `Ludii` · `Evolutionary search` · `Rule generation`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2407.09388)

**[Cardiverse](https://github.com/danruili/Cardiverse)**

Uses mechanism graphs and retrieval to generate variants and code from card game descriptions, then iteratively checks rule consistency using generated match records. The repository also includes a gameplay AI arena, but its development contribution centers on rule and code prototypes. Public substitute rule descriptions differ from the original paper inputs, which affects reproducibility.

Tags: `Card games` · `Mechanism graphs` · `Code generation` · `Self-play validation`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2502.07128)

</details>

### Skill

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge) | Combines reference art, generated animation, and deterministic processing into exportable sprites. | Assets / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge)**

Generates motion clips from an approved reference image, then performs background removal, alignment, loop selection, timing correction, and atlas packaging. It offers Godot, Aseprite, and web exports. For 0.4.0, the README reports parse-level round trips but no Godot, LDtk, or Aseprite editor-import verification. Import and visual acceptance checks remain necessary.

Tags: `Agent Skill` · `Sprite pipeline` · `Animation` · `Asset QA`. Source reviewed: 2026-10-18.

</details>

### Benchmark

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [GameDevBench](https://github.com/waynchi/gamedevbench) · 2026 | Evaluates coding agents on development tasks in existing Godot projects. | Coding / Scenes / Testing |
| [GameXpert-Bench](https://arxiv.org/abs/2608.21833) · 2026 | Benchmarks game creation, bug fixing, and iterative improvement in three tracks. | Planning / Coding / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[GameDevBench](https://github.com/waynchi/gamedevbench)**

The repository contains 333 tasks across 2D, 3D, UI, and gameplay logic. Agents receive an existing project and a task, then produce changes that can be checked in the engine. Comparable official runs require Godot 4.4.1 and provide image or video feedback. This measures bounded development tasks, not the quality of commercial games created from scratch.

Tags: `Development benchmark` · `Godot` · `Multimodal` · `Visual feedback`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2602.11103)

**[GameXpert-Bench](https://arxiv.org/abs/2608.21833)**

The paper introduces GameGen, GameFix, and GameOpt using complete development trajectories to study the lifecycle beyond a single generation. At review, the official repository still said data and evaluation code were being prepared for release. Treat it as a paper and protocol reference, not a ready-to-run benchmark.

Tags: `Development benchmark` · `Bug fixing` · `Iterative improvement` · `Full release pending`. Source reviewed: 2026-10-18. Further reading: [Repository and release status](https://github.com/Kwen-Chen/GameXpert-Bench)

</details>

### Paper

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [GameGPT](https://arxiv.org/abs/2310.08067) · 2023 | Studies automated game development through multi-agent planning and code generation. | Planning / Coding / Testing |
| [MarioGPT](https://github.com/shyamsn97/mario-gpt) · 2023 | Generates playable Mario-style level layouts from text with a GPT model. | Planning / Scenes / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[GameGPT](https://arxiv.org/abs/2310.08067)**

Planning, review, and implementation agents break down game requirements and generate code, with a focus on hallucination and redundancy. This is an early research framework for game development agents. The linked repository contains only the paper and README; it is not a verified, ready-to-deploy product.

Tags: `Multi-agent` · `Task planning` · `Research prototype`. Source reviewed: 2026-10-18. Further reading: [Paper and README repository](https://github.com/leyiwo/GameGPT)

**[MarioGPT](https://github.com/shyamsn97/mario-gpt)**

Descriptions of enemies, pipes, and elevation become character-grid levels and previews, with an interactive simulator or A* checks available. It generates level content within existing rules and supports research on controllable procedural content generation. Its scope does not include game engines, character art, or complete gameplay code.

Tags: `PCG` · `Level generation` · `Text-to-level` · `GPT-2`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2302.05981)

</details>

### Tool

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Agent Game Forge](https://github.com/0x0funky/agent-game-forge) | A local 2D game IDE with a scene editor for Codex and Claude Code. | Planning / Coding / Assets / Scenes / Testing / Shipping |
| [Text2Game](https://github.com/boltomli/t2g) | Turns long-form text into world, character, and event data for narrative prototypes. | Planning / Coding / Scenes |
| [PixelLab AI Agent Toolkit](https://www.pixellab.ai/mcp) | Generates pixel characters, animation, and seamless tilesets through API and MCP tools. | Assets / Scenes |
| [OpenAI Image Generation](https://developers.openai.com/api/docs/guides/image-generation) | Generate and edit raster art using image endpoints or a conversational image-generation tool. | Assets |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Agent Game Forge](https://github.com/0x0funky/agent-game-forge)**

Agents, asset workflows, and JSON scene data turn natural-language requests into JS + Canvas games. Users can adjust layout and collision in a visual editor. The README lists web output as the current default, with full Godot and Unity support still on the roadmap. The project describes itself as pre-launch.

Tags: `2D IDE` · `Canvas` · `Scene editing` · `Prototyping`. Source reviewed: 2026-10-18.

**[Text2Game](https://github.com/boltomli/t2g)**

Analyzes text in chunks, merges the results, and generates Twine/Chapbook HTML or Godot visual novel projects. The repository provides a Python pipeline and examples for research on turning narratives into playable prototypes. It offers no general guarantee of generating arbitrary action games.

Tags: `Interactive narrative` · `Twine` · `Godot` · `Visual novels`. Source reviewed: 2026-10-18.

**[PixelLab AI Agent Toolkit](https://www.pixellab.ai/mcp)**

Accepts character descriptions, directions, actions, and terrain conditions to produce pixel assets, including four- or eight-direction characters and side-view or top-down tilesets. This is a commercial asset service. MCP connects its asset tools to coding agents; game rules, collision, and asset import still require a project workflow.

Tags: `Pixel art` · `Sprite` · `Tileset` · `MCP` · `Commercial service`. Source reviewed: 2026-10-18. Further reading: [Documentation](https://www.pixellab.ai/docs)

**[OpenAI Image Generation](https://developers.openai.com/api/docs/guides/image-generation)**

Generate or edit raster images through the Images API or multi-turn Responses workflows. Save output bytes and request settings; masks guide edits rather than guaranteeing exact boundaries. Sprite consistency and seamless textures need separate checks. The technical guide does not establish output rights or retry billing.

Tags: `asset-generation`. Source reviewed: 2026-10-18.

</details>

<a id="3d"></a>

## AI for 3D game development

### Framework

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A) · 2026 | Coordinates game assets, gameplay, and UI through skills, model pipelines, and engine adapters. | Planning / Coding / Assets / Scenes / Testing |
| [Infinigen](https://github.com/princeton-vl/infinigen) · 2023 | Procedurally generates natural and indoor Blender scenes and synthetic data. | Assets / Scenes / Testing |
| [Holodeck](https://github.com/allenai/Holodeck) · 2023 | Lays out and furnishes interactive 3D indoor environments from text. | Planning / Scenes |
| [AutoUE](https://github.com/Pluto156/AutoUE) · 2026 | Coordinates agents to build Unreal scenes, gameplay code, interactions, and playtests. | Planning / Coding / Assets / Scenes / Testing |
| [UniGen](https://github.com/yxwan123/UniGen) · 2025 | Plans Unity prototypes, generates scripts, assembles scenes, and supports iterative debugging. | Planning / Coding / Scenes / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A)**

A coding agent routes requirements through image, 3D, motion, audio, and other pipelines to produce assets and engine-native code, with context for UE5, Unity, Godot, Blender, and three.js. Demos mix generated and existing resources. The 3A name is not a verified commercial quality rating. This is a separate project from Kling's GameFactory video world model.

Tags: `Agent Skills` · `Asset pipelines` · `Multiple engines` · `Game generation`. Source reviewed: 2026-10-18. Further reading: [Chinese documentation](https://github.com/OpenDCAI/GameFactory-3A/blob/main/README_zh.md)

**[Infinigen](https://github.com/princeton-vl/infinigen)**

Random seeds, parameters, and asset generators produce geometry, materials, scenes, and annotations, with export documentation for OBJ, OpenUSD, and other formats. This is a procedural system rather than a language model. It can provide controllable scenes and data for AI development workflows; real-time games still need optimization, collision, and gameplay integration.

Tags: `Procedural generation` · `Blender` · `Synthetic data` · `Scenes`. Source reviewed: 2026-10-18. Further reading: [Project and paper](https://infinigen.org/)

**[Holodeck](https://github.com/allenai/Holodeck)**

Combines language planning, asset retrieval, and spatial constraints to turn room requirements into AI2-THOR scenes, with instructions for loading them in Unity. Evaluation primarily targets embodied AI environment generation. It offers ideas for scene layout and semantic interaction, but does not establish complete game level design or commercial release readiness.

Tags: `Text-to-scene` · `AI2-THOR` · `Spatial constraints` · `Embodied environments`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2312.09067)

**[AutoUE](https://github.com/Pluto156/AutoUE)**

A research pipeline for turning a game description into Unreal Engine scenes and C++ gameplay. Its public implementation includes setup instructions, a demonstration video, and a linked dataset of generated games and assets. Reproduction requires Unreal integrations and external model services. The video demonstrates outputs; it is not a hosted playable game. Static inspection of the pinned evaluation dispatcher shows movement commands skipped and interaction handlers called directly; completion of that script path alone does not establish player navigation success.

Tags: `Unreal Engine` · `Game generation` · `Multi-agent` · `Research prototype`. Source reviewed: 2026-10-19. Further reading: [Paper](https://arxiv.org/abs/2603.07106) · [Generated games and asset dataset](https://huggingface.co/datasets/Pluto156/AutoUE_DataSet) · [Pinned evaluation dispatcher](https://github.com/Pluto156/AutoUE/blob/8686a4d51c19813f2b3368bd73f685a940db7531/PCGGen_UE/Plugins/LLMEditor/Source/LLMEditor/Private/Core/EvaluateExecutor/EvaluateExecutor.cpp#L174-L186)

- **Tutorial · tutorial:** [Setup and usage](https://github.com/Pluto156/AutoUE#setup-and-usage). Author instructions for dependencies, service credentials, and running the Unreal generation pipeline.
- **Demo · video:** [Game-generation video](https://github.com/Pluto156/AutoUE/blob/main/assets/show.mp4). Recorded demonstrations of generated Unreal games; no public browser-playable build verified.
- **Source · pipeline-source:** [Pipeline source](https://github.com/Pluto156/AutoUE). Public framework implementation; engine setup, model services, and dataset assets remain separate requirements.

**[UniGen](https://github.com/yxwan123/UniGen)**

A multi-agent research workflow for Unity game creation from natural-language descriptions. The repository publishes its Python pipeline and model connector, with installation guidance and a recorded demonstration. Unity and a model-service account are required. Public pipeline code is available, but a hosted playable build and complete downloadable versions of the benchmark games were not verified.

Tags: `Unity` · `Game generation` · `Scene assembly` · `Research prototype`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2509.26161)

- **Tutorial · tutorial:** [Installation and usage](https://github.com/yxwan123/UniGen#-installation). README covers prerequisites and the local Unity generation workflow; review paths and project setup before running.
- **Demo · video:** [Unity generation video](https://www.youtube.com/watch?v=xyJjFfnxUx0). Author-linked demonstration video, not a browser-playable game.
- **Source · pipeline-source:** [Pipeline source](https://github.com/yxwan123/UniGen). Published generator implementation and prompts; this is not a complete release of every benchmark game.

</details>

### Skill

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) | Unity-maintained project skills give general coding agents engine-specific context. | Planning / Coding / Scenes / Testing / Shipping |
| [Godot MCP 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets) | Builds reusable stylized 3D assets with Godot geometry and validation workflows. | Assets / Scenes / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin)**

Provides Claude Code, Codex, and Grok with skills for 2D, UI, rendering, navigation, physics, multiplayer, and other tasks, connected to Unity CLI and MCP controls. Unity requires version 6.0 or later. The current CLI MCP mode replaces MCP in the older assistant package; follow the documentation for the version in use.

Tags: `Official` · `Agent Skills` · `Unity` · `CLI` · `MCP`. Source reviewed: 2026-10-18. Further reading: [Skill source](https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills) · [CLI / MCP migration](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli)

**[Godot MCP 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets)**

Takes project style and asset requirements, then uses Godot MCP and deterministic builders to produce PackedScene assets and check grounding, collision, navigation, and screenshots. Designed for Codex and Claude Code, it can reuse existing project resources. It requires compatible MCP capabilities and is not an image-to-mesh generative model.

Tags: `Godot` · `Agent Skill` · `PackedScene` · `Asset QA`. Source reviewed: 2026-10-18.

</details>

### Benchmark

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [GameEngineBench](https://arxiv.org/abs/2607.03525) · 2026 | Tests agent-written C++ runtime changes in real Unreal Engine projects. | Coding / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[GameEngineBench](https://arxiv.org/abs/2607.03525)**

Paper v2 describes 110 scoped C++ tasks from nine Unreal projects. Agents receive a buildable start, allowed files, and behavioral requirements. After compilation and Play-in-Editor listen-server tests, an LLM judge reviews the specification, test evidence, edits, and reference solution to determine success. The paper-linked repository could not be retrieved during review, so runnable-code availability remains unverified. The scope is local C++ implementation, not complete 3D game generation.

Tags: `Development benchmark` · `Unreal Engine` · `C++` · `Behavior tests`. Source reviewed: 2026-10-18. Further reading: [Paper-linked repository (availability unverified)](https://github.com/Nitrode-Research/GameEngineBench) · [Versioned evaluation protocol](https://arxiv.org/html/2607.03525v2)

</details>

### Paper

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Video2Game](https://github.com/video2game/video2game) · 2024 | Reconstructs real-world video into interactive 3D environments for the browser. | Assets / Scenes / World models |
| [BlenderLLM / BlendNet / CADBench](https://github.com/FreedomIntelligence/BlenderLLM) · 2024 | Studies text-to-Blender scripting with a training dataset and modeling benchmark. | Assets / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Video2Game](https://github.com/video2game/video2game)**

Video and camera information pass through reconstruction, mesh extraction, appearance baking, and collision generation into a three.js game environment. The documented UE route recommends fully diffuse baked meshes, with the baking specular dimension set to zero. This is an explicit environment reconstruction approach with remaining manual scene setup and physics integration. It should be distinguished from interactive video world models that predict the next frame.

Tags: `Video-to-3D` · `Reconstruction` · `Three.js` · `Collision`. Source reviewed: 2026-10-19. Further reading: [Paper](https://arxiv.org/abs/2404.09833) · [Pinned engine-handoff recommendations](https://github.com/video2game/video2game/blob/7bcf8ae754240b9fd2de75a154eb73c75a146b79/readme.md#L256-L273)

**[BlenderLLM / BlendNet / CADBench](https://github.com/FreedomIntelligence/BlenderLLM)**

BlenderLLM generates bpy modeling scripts from user instructions. The repository and released dataset documentation report about 12K BlendNet pairs, and CADBench includes synthetic and forum-sourced tasks. Evaluation focuses on basic CAD-style modeling and instruction following. The README identifies limitations in advanced materials, multimodal input, and multi-turn collaboration; this is not a game creation benchmark.

Tags: `Text-to-bpy` · `CADBench` · `Dataset` · `Modeling benchmark`. Source reviewed: 2026-10-19. Further reading: [Paper](https://arxiv.org/abs/2412.14203) · [BlendNet dataset](https://huggingface.co/datasets/FreedomIntelligence/BlendNet) · [CADBench](https://huggingface.co/datasets/FreedomIntelligence/CADBench) · [Pinned release dataset description](https://github.com/FreedomIntelligence/BlenderLLM/blob/f778bfd6992ddd675f7615d0eaf965a8576f2879/README.md#L44-L50)

</details>

### Tool

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [MCP Unity Editor](https://github.com/CoderGamester/mcp-unity) | A community MCP bridge for querying, editing, and testing Unity projects. | Coding / Scenes / Testing |
| [Hunyuan3D 2.0](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) · 2025 | Turns reference images into geometry and textures for 3D asset pipelines. | Assets |
| [TRELLIS](https://github.com/microsoft/TRELLIS) · 2024 | Generates meshes, Gaussians, and radiance fields from structured latent representations. | Assets |
| [TripoSR](https://github.com/VAST-AI-Research/TripoSR) · 2024 | Quickly reconstructs a 3D object from one image for asset prototyping. | Assets |
| [Tripo Model Generation API](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html) | Versioned text-to-model generation with separate geometry and texture seeds. | Assets |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[MCP Unity Editor](https://github.com/CoderGamester/mcp-unity)**

Exposes scenes, GameObjects, components, Prefabs, logs, Unity Test Runner, and other editor operations to MCP clients. This community tool is separate from Unity's official plugin. Its README warns that entering Play Mode with domain reload can disconnect the bridge; check the installed version, test configuration, and actual results. Editor automation alone does not establish correct gameplay.

Tags: `Unity` · `MCP` · `Editor automation` · `Community tool`. Source reviewed: 2026-10-18.

**[Hunyuan3D 2.0](https://github.com/Tencent-Hunyuan/Hunyuan3D-2)**

The 2.0 pipeline generates shape with Hunyuan3D-DiT and textures the mesh with Hunyuan3D-Paint. It supports GLB and OBJ export and a Blender addon under a dedicated Tencent Hunyuan 3D 2.0 community license. The separate 2.1 release adds a PBR texture pipeline and training code. Topology, LOD, rigging, collision, runtime performance, and each version's terms still need game-pipeline checks.

Tags: `Image-to-3D` · `Mesh` · `Textures` · `Blender`. Source reviewed: 2026-10-18. Further reading: [2.0 paper](https://arxiv.org/abs/2501.12202) · [2.1 repository](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1) · [2.0 license](https://github.com/Tencent-Hunyuan/Hunyuan3D-2/blob/main/LICENSE)

**[TRELLIS](https://github.com/microsoft/TRELLIS)**

Decodes image or text inputs into several 3D representations. Official examples support textured GLB export and simplification. Conventional game asset pipelines mainly use its mesh branch; Gaussian and radiance field outputs do not themselves include usable collision, animation, or gameplay logic.

Tags: `Image-to-3D` · `Text-to-3D` · `GLB` · `Structured Latents`. Source reviewed: 2026-10-18. Further reading: [Paper](https://arxiv.org/abs/2412.01506)

**[TripoSR](https://github.com/VAST-AI-Research/TripoSR)**

Uses LRM-style feed-forward reconstruction, with public code, pretrained models, and a demo. An input image becomes an exportable object mesh. It focuses on individual objects; hidden surfaces, topology, and game performance need additional work. It is not a complete scene or playable game generator.

Tags: `Image-to-3D` · `Reconstruction` · `Mesh` · `Prototype assets`. Source reviewed: 2026-10-18.

**[Tripo Model Generation API](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html)**

H3 text-to-model requests (v3.1-20260211 and v3.0-20250812) expose separate geometry and texture seeds plus PBR controls. Persist model_version and task ID, query with the submitting API key, and download successful output files promptly: their URLs expire after five minutes by default. Low-poly generation can fail on complex inputs. Cross-version reproducibility, output rights, cancellation endpoints and retry charges remain unverified.

Tags: `asset-generation`. Source reviewed: 2026-10-19. Further reading: [Tripo task results](https://docs.tripo3d.ai/task-query/get-your-task-result.html)

</details>

<a id="production"></a>

## Game production: art, animation, audio, testing, and runtime AI

### Framework

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [FastNoise Lite](https://github.com/Auburn/FastNoiseLite) | A portable noise library for procedural terrain and material inputs. | Coding / Assets / World models |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[FastNoise Lite](https://github.com/Auburn/FastNoiseLite)**

Provides 2D/3D sampling, fractals and domain warping across multiple languages under MIT. These are generation primitives: meshing, erosion, persistent world state and meaningful level design require additional systems.

Tags: `Procedural generation` · `Noise` · `Terrain`. Source reviewed: 2026-10-18.

</details>

### Documentation

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Unreal Engine · Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US) | Orchestrates game test sessions with multiple processes, roles, devices, and collected logs. | Testing / Shipping |
| [Windows · UI Automation and Input Semantics](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview) | Exposes provider-supported accessibility control patterns for inspecting and manipulating desktop editor controls. | Coding / Scenes / Testing |
| [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines) | Game-specific accessibility guidance for designers, developers and test teams. | Planning / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Unreal Engine · Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US)**

Gauntlet consumes prepared cooked builds and launches configured game roles through AutomationTool. Game-specific test nodes define assertions and terminal outcomes; launching a client and server alone does not establish scenario success. Build production, device availability, process cleanup, and parallel-session port allocation remain separate responsibilities.

Tags: `Unreal Engine` · `AutomationTool` · `Multi-process testing` · `Cooked builds`. Source reviewed: 2026-10-18.

**[Windows · UI Automation and Input Semantics](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview)**

Provider support must be probed per control; no specific game editor is assumed accessible. UIA coordinates are physical pixels, while absolute mouse input uses normalized desktop coordinates. Bounding rectangles may contain occluded points, foreground activation can be refused, and input insertion does not prove application completion. Integrity restrictions must be respected.

Tags: `Windows` · `Accessibility` · `Native GUI` · `CUA` · `DPI`. Source reviewed: 2026-10-19. Further reading: [Properties and occlusion](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-automation-element-propids) · [Input and integrity limits](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput) · [DPI coordinates](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-screenscaling) · [Window/display capture and frame lifetime](https://learn.microsoft.com/en-us/windows/apps/develop/media-authoring-processing/screen-capture) · [GameMap: native UI evidence boundaries](https://github.com/OpenEnvision/GameMap/blob/main/docs/engine-operation-contracts.md#native-gui-automation-is-a-separate-evidence-surface)

**[Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)**

The guidelines cover accessible game experiences and provide criteria for review. They are best-practice guidance, not a legal compliance checklist or certification. Automated scans alone cannot replace manual assessment and testing with disabled players.

Tags: `Accessibility` · `QA` · `Guidelines`. Source reviewed: 2026-10-18.

</details>

### Tool

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Scenario](https://www.scenario.com/) | Builds consistent game art pipelines with custom style models and batch generation. | Assets / Scenes |
| [Meshy API](https://docs.meshy.ai/en) | Connects AI model generation, humanoid rigging, and animation export for game asset workflows. | Assets / Scenes |
| [HY-Motion 1.0](https://github.com/Tencent-Hunyuan/HY-Motion-1.0) · 2025 | Generates skeletal humanoid motion from text with public inference code and model weights. | Assets |
| [ElevenLabs Sound Effects](https://elevenlabs.io/docs/overview/capabilities/sound-effects) | Generates game sound effects, Foley, and looping ambience from text through a web app or API. | Assets |
| [Stable Audio Open 1.0](https://huggingface.co/stabilityai/stable-audio-open-1.0) · 2024 | Provides downloadable text-to-audio weights and local tools for sound effects and field recordings. | Assets |
| [Regression Games](https://github.com/Regression-Games/RGUnityBots) | Provides a public Unity SDK for gameplay recording, input replay, and regression-test reference workflows. | Testing / Shipping |
| [modl.ai](https://modl.ai/) | Uses visual agents and natural-language tasks to test uploaded game builds. | Testing / Shipping |
| [Convai](https://convai.com/) | Adds conversational NPCs with speech, memory, emotion, and in-scene actions. | Coding / Scenes / Runtime AI |
| [ElevenLabs Music](https://elevenlabs.io/docs/overview/capabilities/music) | Prompted music generation with composition plans, references and section editing. | Assets |
| [ElevenLabs Speech Generation](https://elevenlabs.io/docs/api-reference/text-to-speech/convert) | Voice-conditioned speech synthesis with pronunciation dictionaries and neighboring-request continuity controls. | Assets |
| [MSDF Atlas Generator](https://github.com/Chlumsky/msdf-atlas-gen) | A command-line and library tool for generating distance-field font atlases. | Assets / Shipping |
| [DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler) | HLSL compilation through the dxc command line and compiler APIs. | Coding / Testing / Shipping |
| [Playwright Test](https://playwright.dev/docs/test-snapshots) | Browser testing with DOM actions, assertions and screenshot comparisons. | Coding / Testing |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Scenario](https://www.scenario.com/)**

Scenario provides hosted image, video, 3D and audio workflows, custom-model training, a REST API and an official beta MCP interface. Inspect each model schema before submission; MCP model_run can return an unfinished job rather than output assets. The documented job_cancel cannot cancel jobs created by model_run or workflow_run. Integration examples do not include the full hosted service or a complete game project.

Tags: `Art direction` · `Style consistency` · `Character consistency` · `Batch assets` · `Commercial service`. Source reviewed: 2026-10-18. Further reading: [API documentation](https://docs.scenario.com/) · [Official beta MCP operations](https://mcp.scenario.com/docs/tools/model-run) · [Job cancellation scope](https://mcp.scenario.com/docs/tools/job-cancel)

- **Tutorial · tutorial:** [Consistent game asset pipeline](https://docs.scenario.com/get-started/documentation/integrating-with-applications-real-world-scenarios#1-game-asset-pipeline--batch-generation-with-style-consistency). Official walkthrough for custom style training, batch generation, and asset delivery.
- **Demo · interactive:** [Asset generation app](https://app.scenario.com/). Hosted creative tool requiring an account; this is an asset workspace, not a playable game.
- **Source · sdk:** [Unity integration source](https://github.com/scenario-labs/Scenario-Unity). Public Unity integration plugin; hosted model source and a complete game project are not included.

**[Meshy API](https://docs.meshy.ai/en)**

The official animated-character recipe turns a reference image into a textured, rigged character with idle, jump, and attack clips in GLB and FBX. The animation step applies motions from Meshy's library. API rigging works best with standard textured bipeds with clearly separated limbs. Generated assets still need engine import, collision, controls, and performance checks; the public cookbook supplies asset examples rather than complete gameplay.

Tags: `Image-to-3D` · `Rigging` · `Character animation` · `GLB` · `FBX` · `Commercial service`. Source reviewed: 2026-10-18. Further reading: [Rigging requirements](https://docs.meshy.ai/en/api/rigging)

- **Tutorial · tutorial:** [Image to animated character](https://www.meshy.ai/developers/cookbook/recipes/animate-3d-character/). Official guide with reference files, Python and TypeScript examples, and GLB/FBX outputs. API access uses credits.
- **Demo · interactive:** [3D asset workspace](https://www.meshy.ai/workspace). Hosted generation and animation workspace; account access is required to generate assets. This is not a playable game.
- **Source · examples:** [Cookbook example source](https://github.com/meshy-dev/meshy-cookbook). Public asset-generation recipes, not Meshy's model source or a complete game project.

**[HY-Motion 1.0](https://github.com/Tencent-Hunyuan/HY-Motion-1.0)**

Tencent's text-to-motion models produce human character animation, with CLI inference, local Gradio visualization, and a hosted model demo. Use the generated motion as an animation-pipeline input and retarget it to the target character. The documented limitations include non-humanoid motion, multi-person interaction, seamless loops, and in-place animation. The release provides a motion implementation, not a controllable game character or full game project. Its custom license excludes the EU, UK and South Korea and restricts using the works or outputs to improve other AI models, except HY-Motion and its derivatives. Review the exact license and commercial threshold before adoption.

Tags: `Text-to-motion` · `Skeletal animation` · `Humanoid` · `Model weights` · `Local inference`. Source reviewed: 2026-10-18. Further reading: [Official project](https://hunyuan.tencent.com/motion) · [Model weights](https://huggingface.co/tencent/HY-Motion-1.0) · [HY-Motion community license](https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/License.txt)

- **Tutorial · tutorial:** [Installation and motion workflow](https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/README.md). Official setup, CLI inference, local UI, and prompting guidance. Local execution requires the documented GPU resources.
- **Demo · interactive:** [Interactive motion demo](https://huggingface.co/spaces/tencent/HY-Motion-1.0). Official text-to-motion model interface; a motion preview rather than playable gameplay. Hosted availability may vary.
- **Source · model:** [Motion implementation source](https://github.com/Tencent-Hunyuan/HY-Motion-1.0). Public inference and visualization implementation with separately linked weights; no complete game project.

**[ElevenLabs Sound Effects](https://elevenlabs.io/docs/overview/capabilities/sound-effects)**

Describe footsteps, impacts, UI feedback, or environmental sounds, control duration, and export audio for a game engine. The documentation describes loop-enabled generation for seamless repeat playback and a 30-second maximum per clip. Its overview lists MP3 for all effects and 48 kHz WAV for non-looping effects; API format support and plan requirements should be checked separately. Loop quality still needs validation in the target game. This is a hosted audio service. The public SDK connects to its API and does not release the generation model or a complete game project.

Tags: `Sound effects` · `Foley` · `Ambience` · `Audio loops` · `API` · `Commercial service`. Source reviewed: 2026-10-19. Further reading: [Product walkthrough](https://elevenlabs.io/docs/eleven-creative/playground/sound-effects) · [Sound Effects API reference](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert)

- **Tutorial · tutorial:** [Sound Effects quickstart](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/sound-effects). Official API walkthrough with SDK examples; an account and API key are needed for generation.
- **Demo · interactive:** [Sound effects generator](https://elevenlabs.io/sound-effects). Official text-to-audio generator and sound examples; this is an audio tool, not a playable game.
- **Source · sdk:** [Official Python SDK](https://github.com/elevenlabs/elevenlabs-python). API client source only; generation model and complete game source are not included.

**[Stable Audio Open 1.0](https://huggingface.co/stabilityai/stable-audio-open-1.0)**

Generates up to 47 seconds of stereo audio at 44.1 kHz, with examples for local inference and WAV export. The official audio-tools repository includes a local Gradio interface. The model works best with English descriptions, is stronger at sound effects and field recordings than music, and cannot produce realistic vocals. Model access requires accepting its terms and sharing contact information with the publisher; this resource is an audio pipeline rather than a complete soundtrack or game generator.

Tags: `Text-to-audio` · `Sound effects` · `Field recordings` · `Model weights` · `Local inference`. Source reviewed: 2026-10-19. Further reading: [Local demo setup](https://github.com/Stability-AI/stable-audio-tools#interface) · [Research paper](https://arxiv.org/abs/2407.14358) · [Stable Audio Open model license](https://huggingface.co/stabilityai/stable-audio-open-1.0/blob/main/LICENSE.md)

- **Tutorial · tutorial:** [Local inference and WAV export](https://huggingface.co/stabilityai/stable-audio-open-1.0#usage). Official model usage examples for stable-audio-tools and Diffusers.
- **Demo · local-tool:** [Local audio demo setup](https://github.com/Stability-AI/stable-audio-tools#interface). Download and run the official Gradio audio interface locally; this link is setup guidance, not a hosted playable game.
- **Source · pipeline-source:** [Audio tools source](https://github.com/Stability-AI/stable-audio-tools). MIT-licensed training and inference code; Stable Audio Open 1.0 weights are separately gated and governed by the model's Community License. No complete game project.

**[Regression Games](https://github.com/Regression-Games/RGUnityBots)**

The public Unity SDK combines gameplay recording, state inspection, input playback, bot logic, and validation workflows. Its official first-test tutorial and Boss Room UI-testing project remain available in GitHub repositories. Treat this as a reference integration: the old documentation domain was unreachable during review, and current hosted-service availability and maintenance were not confirmed. SDK source is public; check compatibility and service requirements before adopting it.

Tags: `Unity` · `Automated playtesting` · `Input replay` · `Regression testing` · `Reference integration`. Source reviewed: 2026-10-18. Further reading: [Unity SDK](https://github.com/Regression-Games/RGUnityBots) · [Boss Room UI-testing sample](https://github.com/Regression-Games/UITest-BossRoom) · [First-test tutorial repository fallback](https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx)

- **Tutorial · tutorial:** [Your first automated test](https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx). Official first-test walkthrough preserved in the documentation repository. The former live documentation domain was unreachable during review.
- **Demo · examples:** [Runnable Boss Room sample](https://github.com/Regression-Games/UITest-BossRoom). A complete Unity sample project with UI tests; download and open locally rather than playing in a browser.
- **Source · sdk:** [Unity testing SDK source](https://github.com/Regression-Games/RGUnityBots). Public client SDK source; it does not contain the complete hosted dashboard backend.

**[modl.ai](https://modl.ai/)**

The current commercial service observes screens and sends simulated inputs without requiring an engine SDK. Teams upload a build, describe test tasks, and review captured sessions and bug reports. Its stated coverage includes Android and desktop; timing-critical gameplay remains limited. The vendor also describes game-specific model training using test-run data; SDK-free does not mean no game-specific preparation. The current product differs from older SDK-based documentation. Public self-service gameplay, complete product source, and an independent hands-on tutorial were not verified.

Tags: `Automated playtesting` · `Visual agents` · `Commercial service` · `Game QA`. Source reviewed: 2026-10-18. Further reading: [Request a product demonstration](https://modl.ai/contact)

- **Tutorial · service:** [Workflow overview](https://modl.ai/). Official upload, task-definition, and reporting overview; detailed onboarding is provided through the service.
- **Demo · service:** [Book a product demo](https://modl.ai/contact). Commercial demonstration by arrangement; this is not a public playable game or instant sandbox.
- **Source · unavailable:** Full product source unavailable. No complete source release for the current hosted testing product was verified; older public samples are not its backend.

**[Convai](https://convai.com/)**

Convai connects game characters to runtime conversation and behavior services through engine integrations. Its Unity guides cover installation, sample scenes, and character setup; public Unreal SDK source is also available. Browser experiences require an account. This provides AI behavior inside an existing game, rather than generating a complete game. Public SDKs do not include the full hosted AI service.

Tags: `Runtime AI` · `NPC dialogue` · `Character actions` · `Unity / Unreal`. Source reviewed: 2026-10-18. Further reading: [Unity SDK documentation](https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk) · [Unreal SDK source](https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4) · [Projects and experiences](https://convai.com/gallery)

- **Tutorial · tutorial:** [Build your first AI character](https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk/getting-started). Official Unity installation, service setup, sample-scene, and custom-character walkthrough.
- **Demo · interactive:** [Try character experiences](https://x.convai.com/). Account-required browser character experiences; these are conversations and role-play, not complete game-generation demos.
- **Source · sdk:** [Unreal engine SDK source](https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4). Public engine integration source; the complete cloud conversation service is not included.

**[ElevenLabs Music](https://elevenlabs.io/docs/overview/capabilities/music)**

Generate music with composition plans, references and section editing. Music-specific terms distinguish Indie and Studio game uses, so paid API access alone does not clear every game release. The October 2026 use policy restricts AI-development/training datasets unless expressly permitted. Reference audio rights and plan eligibility require review.

Tags: `audio-generation`. Source reviewed: 2026-10-18. Further reading: [ElevenLabs Music terms](https://elevenlabs.io/music-terms) · [Prohibited Use Policy (October 2026)](https://elevenlabs.io/use-policy)

**[ElevenLabs Speech Generation](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)**

The speech endpoint accepts versioned pronunciation dictionaries and previous/next text or request context. Zero-retention mode is enterprise-only and disables history-based continuity features; verify model compatibility. October 2026 policy restricts AI-development/training datasets and requires approval for under-18-directed products. These constraints are distinct from ordinary output-commercial rights and free-plan restrictions.

Tags: `speech-generation` · `audio-generation`. Source reviewed: 2026-10-18. Further reading: [Prohibited Use Policy (October 2026)](https://elevenlabs.io/use-policy) · [Non-EEA general terms (October 2026)](https://elevenlabs.io/terms-of-use)

**[MSDF Atlas Generator](https://github.com/Chlumsky/msdf-atlas-gen)**

Produces glyph textures and layout metadata from fonts. The default character set is ASCII unless overridden, so multilingual coverage must be explicit. Sample atlas color channels as linear data rather than sRGB; font licensing remains independent.

Tags: `Fonts` · `MSDF` · `UI`. Source reviewed: 2026-10-18.

**[DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler)**

Compiler-call success and shader compilation success are separate: inspect the result status, diagnostics and requested outputs. Target profiles, include dependencies and build configuration matter. A compiled shader does not establish rendering correctness or target-device compatibility.

Tags: `Shaders` · `HLSL` · `Build validation`. Source reviewed: 2026-10-18. Further reading: [Compiler API guide](https://github.com/microsoft/DirectXShaderCompiler/wiki/Using-dxc.exe-and-dxcompiler.dll)

**[Playwright Test](https://playwright.dev/docs/test-snapshots)**

Screenshot assertions wait for two matching captures before comparison, but stable pixels do not prove application readiness. Record browser, fonts, viewport and capture options: animation disabling, masks and styles can alter evidence. DOM access is a different observation surface from screenshot-only control or Playwright MCP.

Tags: `Browser testing` · `Visual regression` · `DOM`. Source reviewed: 2026-10-18. Further reading: [Actionability](https://playwright.dev/docs/actionability) · [Screenshot assertion API](https://playwright.dev/docs/api/class-pageassertions)

</details>

<a id="world"></a>

## Code world models and interactive worlds

### Framework

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/) · 2026 | A code engine maintains the world while streaming diffusion renders its semantic maps. | Coding / Scenes / World models |
| [Oasis: A Universe in a Transformer](https://oasis-model.github.io/) · 2024 | A neural game research release that predicts Minecraft-style frames from prior frames and actions. | Coding / World models |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)**

NVIDIA Sol-Engine's Interactive Coding Worlds system uses a three.js racing game. The engine handles map, physics, collision, and input, while a two-step streaming MiniMax-H3 model renders semantic video conditioned on a first frame and prompt. Reported training and tests cover that one game and third-person view. Semantic colors identify classes rather than individual objects. Diffusion-render timings use eight GB200 GPUs; the causal decoder is measured separately on one GB200. Independent stage timings do not establish end-to-end input-to-display latency. Runtime source and a weight bundle are public, with component-specific terms.

Tags: `hybrid-renderer` · `executable-state` · `streaming` · `three.js` · `MiniMax-H3` · `NVIDIA`. Source reviewed: 2026-10-19. Further reading: [Sol-Engine](https://nvlabs.github.io/Sana/Sol-Engine/) · [Agent workflow](https://nvlabs.github.io/Sana/Sol-Engine/docs/agent-workflow/) · [Pinned runtime source](https://github.com/NVlabs/Sana/tree/0527465fdcbbf27180a76419a4e73643aa1aac73/models/streamrender_h3) · [Weights and component licenses](https://huggingface.co/Efficient-Large-Model/StreamRender-H3)

**[Oasis: A Universe in a Transformer](https://oasis-model.github.io/)**

Oasis by Decart and Etched uses a Transformer autoencoder and latent diffusion. Its MIT-licensed inference code and 500M checkpoint are a downsized release, separate from the larger hosted demo. Hugging Face currently gates weight downloads behind agreement to share contact information. The public script generates video from an initial frame and action sequence; it does not establish a complete live game interface or training pipeline. The authors identify limits in long-term memory, precise inventory control, generalization, and object consistency.

Tags: `neural-simulator` · `interactive-video` · `transformer` · `Minecraft` · `released-code`. Source reviewed: 2026-10-19. Further reading: [Inference code](https://github.com/etched-ai/open-oasis) · [500M weights, license and access](https://huggingface.co/Etched/oasis-500m)

</details>

### Paper

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [SolarRenderer](https://enderfga.cn/SolarRenderer/) · 2026 | Turns engine- or agent-generated structure videos into styled final visuals. | Coding / Scenes / World models |
| [Code World Model: Coding Agent as World Brain](https://arxiv.org/abs/2608.25927) · 2026 | A coding agent writes executable rules and persistent state to drive a video world. | Planning / Coding / World models |
| [Programmable World Model](https://arxiv.org/abs/2609.10540) · 2026 | Explicit global state and programmable rules preserve entities outside the camera view. | Coding / Testing / World models |
| [CoDeR — Code Plans, Diffusion Renders](https://arxiv.org/abs/2609.26458) · 2026 | Collaborating agents build executable worlds, with diffusion models rendering observations. | Planning / Coding / World models |
| [Magpie: Real-Time World Renderer for Interactive Games](https://arxiv.org/abs/2608.27168) · 2026 | A game engine runs gameplay while a separate Render Server generates final visuals. | Coding / Scenes / World models |
| [SolarWM](https://arxiv.org/abs/2609.02886) · 2026 | An interactive video world model framework for open data, training, and long-horizon inference. | Coding / Scenes / World models |
| [WorldCoder](https://arxiv.org/abs/2402.12275) · 2024 | Induces Python world models from environment interactions, then plans within them. | Planning / Coding / World models |
| [GIF-MCTS / Code World Models Benchmark](https://arxiv.org/abs/2405.15383) · 2024 | Synthesizes runnable environment models through generate, improve, and fix tree search. | Planning / Coding / Testing / World models |
| [Code World Models for General Game Playing](https://arxiv.org/abs/2510.04542) · 2025 | Compiles natural-language game rules into verifiable simulators for MCTS planning. | Planning / Coding / Testing / World models |
| [PoE-World](https://arxiv.org/abs/2505.10819) · 2025 | Combines small programmatic experts to model stochastic world dynamics. | Planning / Coding / World models |
| [FactorSim](https://arxiv.org/abs/2409.17652) · 2024 | Generates complete simulation code from language using factorized state representations. | Planning / Coding / Testing / World models |
| [Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391) · 2024 | Learns latent-action-controlled 2D worlds from videos without action labels. | World models |
| [GameNGen — Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837) · 2024 | Trains an interactive diffusion simulator from DOOM gameplay trajectories. | Testing / World models |
| [DIAMOND — Diffusion for World Modeling](https://arxiv.org/abs/2405.12399) · 2024 | Trains reinforcement learning agents inside diffusion world models that preserve visual detail. | Testing / World models |
| [GameFactory](https://arxiv.org/abs/2501.08325) · 2025 | Combines open-domain video generation with keyboard and mouse action control. | World models |
| [WonderWorld](https://arxiv.org/abs/2406.09394) · 2024 | Builds an explorable, expandable explicit 3D scene from a single image. | Assets / Scenes / World models |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[SolarRenderer](https://enderfga.cn/SolarRenderer/)**

Few-Step Generative Reference Rendering conditions MiniMax-H3 on semantic maps, grayboxes, skeletons, depth, and other structures, with an optional first frame and text. Control and four-step LoRAs include a block-causal variant. Code is Apache-2.0; weights use the geographically restricted MiniMax H3 Community License, and data has component-specific terms, including noncommercial and research-only portions. Upstream programs must maintain world state and rules. Four-step sampling alone does not establish real-time consumer-hardware interaction.

Tags: `hybrid-renderer` · `structure-conditioning` · `streaming` · `MiniMax-H3` · `LoRA` · `released-code`. Source reviewed: 2026-10-18. Further reading: [Code](https://github.com/Enderfga/SolarRenderer) · [Paper PDF](https://enderfga.cn/data/solarrenderer.pdf) · [Weights](https://huggingface.co/Enderfga/SolarRenderer) · [Data and evaluation](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data) · [Usage guide](https://github.com/Junchao-cs/SolarWM/blob/main/docs/solar_renderer.md)

**[Code World Model: Coding Agent as World Brain](https://arxiv.org/abs/2608.25927)**

Separates world evolution from visual generation. An agent maintains executable state, which is compiled into controls for a fine-tuned MiniMax-H3 renderer. The released inference interface uses an RGB first-frame anchor, per-frame depth and semantic-ID controls, and per-window prompts. Inference code, LoRAs, and examples are public, but the underlying game code that generates proxies cannot be redistributed. The complete agent-to-engine pipeline cannot be reproduced unchanged from those artifacts.

Tags: `code-world-model` · `coding-agent` · `executable-state` · `hybrid-renderer` · `MiniMax-H3` · `partial-release`. Source reviewed: 2026-10-18. Further reading: [Project](https://buaacyw.github.io/cwm/) · [Inference code](https://github.com/buaacyw/code-world-model) · [Reproduction scope](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)

**[Programmable World Model](https://arxiv.org/abs/2609.10540)**

An agent converts instructions into entity states and state-transition programs. A lightweight engine maintains global state, then compiles stateful 3D oriented bounding boxes and camera trajectories into video model controls. The paper introduces CombatStateBench to check entity counts and irreversible states. The public repository currently centers on project documentation, which does not establish that complete inference code and weights are available.

Tags: `code-world-model` · `executable-state` · `hybrid-renderer` · `persistent-state` · `CombatStateBench`. Source reviewed: 2026-10-18. Further reading: [Project and release progress](https://github.com/AlayaLab/pwm)

**[CoDeR — Code Plans, Diffusion Renders](https://arxiv.org/abs/2609.26458)**

Code Plans, Diffusion Renders: Open-Ended Generative World Modeling uses five collaborating roles to turn concepts into rules, code, and observations, allowing entities to keep evolving outside the current view. The paper studies long-term memory, open-ended interaction, and multi-agent worlds. Its abstract says code and weights will be released; distinguish reported results from artifacts already available.

Tags: `code-world-model` · `multi-agent` · `hybrid-renderer` · `persistent-state` · `research`. Source reviewed: 2026-10-18. Further reading: [Project](https://becauseimbatman0.github.io/CoDeR)

**[Magpie: Real-Time World Renderer for Interactive Games](https://arxiv.org/abs/2608.27168)**

Designers define scenes and rules in a conventional game engine. At runtime, the engine processes player actions and maintains state, while a rendering service transforms engine-produced whitebox frames into final visuals. It demonstrates a division between generative rendering and reproducible gameplay, primarily reducing prototype dependence on complete art assets.

Tags: `hybrid-renderer` · `executable-state` · `game-engine` · `render-server` · `research`. Source reviewed: 2026-10-18.

**[SolarWM](https://arxiv.org/abs/2609.02886)**

Unifies data, training, and inference interfaces for camera-controlled streaming video. The source matrix lists all three stages for Wan2.2-5B and MiniMax-H3, but later stages for Wan2.2-14B and LTX-2.5 remain forthcoming. Backbones require separate runtime environments. The main data release contains annotations and indexes; latent payloads are separate, and the full processed training-video corpus requires reconstruction or approved access. The main Hugging Face dataset and H3 model repositories also require agreement to share contact information. This infrastructure does not provide a code world with queryable entity state.

Tags: `interactive-video` · `training-framework` · `camera-control` · `streaming` · `released-code`. Source reviewed: 2026-10-19. Further reading: [Code and documentation](https://github.com/Junchao-cs/SolarWM) · [Project](https://junchao-cs.github.io/SolarWM-Web/) · [Data access](https://huggingface.co/datasets/junchaoh-cs/SolarWM-Data) · [H3 weights and access](https://huggingface.co/junchaoh-cs/SolarWM-H3-33B)

**[WorldCoder](https://arxiv.org/abs/2402.12275)**

WorldCoder, a Model-Based LLM Agent represents knowledge of a world as executable Python programs. Interaction records constrain those programs, and planning searches for potential rewards. This NeurIPS 2024 work is primarily evaluated on gridworlds and task planning. It supports study of rule discovery and model repair rather than complete visual game generation.

Tags: `code-world-model` · `program-synthesis` · `model-based-planning` · `gridworld` · `NeurIPS-2024`. Source reviewed: 2026-10-18.

**[GIF-MCTS / Code World Models Benchmark](https://arxiv.org/abs/2405.15383)**

Generating Code World Models with Large Language Models Guided by Monte Carlo Tree Search encodes transition, reward, and termination logic in Python. Trajectories and test feedback guide GIF-MCTS search. The paper also releases CWMB, covering 18 reinforcement learning environments, to evaluate model correctness and downstream planning. It is a foundational reading and evaluation reference for code world models.

Tags: `code-world-model` · `program-synthesis` · `MCTS` · `benchmark` · `CWMB` · `NeurIPS-2024`. Source reviewed: 2026-10-18. Further reading: [Code and CWMB](https://github.com/nicoladainese96/code-world-models) · [Project](https://sites.google.com/view/code-world-models/home)

**[Code World Models for General Game Playing](https://arxiv.org/abs/2510.04542)**

Generates Python state-transition, legal-action, and termination functions from rules and game trajectories, plus heuristic value and hidden-state inference functions for planning. The paper evaluates 10 fully or partially observable games, including board and card games. Avoiding illegal actions depends on the synthesized rules being correct, so model validation remains necessary.

Tags: `code-world-model` · `game-rules` · `MCTS` · `formal-simulator` · `imperfect-information`. Source reviewed: 2026-10-18.

**[PoE-World](https://arxiv.org/abs/2505.10819)**

Compositional World Modeling with Products of Programmatic Experts combines LLM-synthesized programs in an exponentially weighted product of experts, learning complex stochastic world models from few observations. The paper connects these models to planners in Pong and Montezuma's Revenge to demonstrate sample efficiency and generalization to new levels. This is programmatic dynamics modeling rather than an art generation tool.

Tags: `code-world-model` · `program-synthesis` · `stochastic-dynamics` · `Atari` · `model-based-planning`. Source reviewed: 2026-10-18. Further reading: [Code](https://github.com/topwasu/poe-world) · [Project](https://topwasu.github.io/poe-world)

**[FactorSim](https://arxiv.org/abs/2409.17652)**

Generative Simulation via Factorized Representation uses a factorized POMDP representation to reduce the context needed for each generation step. It aims to generate complete game or robotics simulators for agent training. This NeurIPS 2024 work also provides a generative simulation benchmark and supports study of workflows from design specifications to modular rule code.

Tags: `code-world-model` · `simulation-generation` · `POMDP` · `benchmark` · `NeurIPS-2024`. Source reviewed: 2026-10-18. Further reading: [Project](https://cs.stanford.edu/~sunfanyun/factorsim/)

**[Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391)**

Combines a spatiotemporal video tokenizer, autoregressive dynamics, and a latent action model into generative interactive environments. Users can begin with an image or sketch and explore frame by frame. The ICML 2024 contribution centers on learning control without ground-truth action labels. Dynamics remain implicit in the model, without editable or queryable game rule programs.

Tags: `interactive-video` · `latent-actions` · `neural-simulator` · `2D-platformer` · `ICML-2024`. Source reviewed: 2026-10-18.

**[GameNGen — Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837)**

A reinforcement learning agent first collects game trajectories. A diffusion model then predicts the next frame from visual history and actions, using conditioning noise augmentation to reduce autoregressive error. The paper demonstrates real-time DOOM simulation on a single TPU. This game-specific neural simulation does not automatically provide maintainable general game rules or an asset pipeline.

Tags: `neural-simulator` · `interactive-video` · `diffusion` · `DOOM` · `ICLR-2025`. Source reviewed: 2026-10-18. Further reading: [Project](https://gamengen.github.io/)

**[DIAMOND — Diffusion for World Modeling](https://arxiv.org/abs/2405.12399)**

Visual Details Matter in Atari studies diffusion models as environment models in which agents learn from imagined trajectories, analyzing how visual detail affects policies. Alongside the Atari 100k evaluation, the paper trains a playable neural engine on prerecorded CS:GO gameplay. It is relevant to simulation, control, and accumulated prediction error.

Tags: `neural-simulator` · `interactive-video` · `diffusion` · `Atari` · `reinforcement-learning` · `NeurIPS-2024`. Source reviewed: 2026-10-18. Further reading: [Code and playable models](https://diamond-wm.github.io/)

**[GameFactory](https://arxiv.org/abs/2501.08325)**

Creating New Games with Generative Interactive Videos proposes domain adapters and action-control modules for autoregressive game video. The public GF-Minecraft dataset includes action labels; the checked repository provides dataset documentation and detection/visualization utilities, without establishing a released training/inference pipeline or model weights. Visual generalization should be evaluated separately from rule correctness, item persistence, and exportable game projects.

Tags: `interactive-video` · `neural-simulator` · `action-control` · `Minecraft` · `dataset` · `ICCV-2025`. Source reviewed: 2026-10-18. Further reading: [Dataset tools and documentation](https://github.com/KlingAIResearch/GameFactory) · [GF-Minecraft dataset](https://huggingface.co/datasets/KlingTeam/GameFactory-Dataset)

**[WonderWorld](https://arxiv.org/abs/2406.09394)**

Interactive 3D Scene Generation from a Single Image uses Fast Layered Gaussian Surfels and guided depth diffusion to connect new scenes as the camera moves and prompts change. It provides explicit spatial representation and real-time rendering, primarily addressing geometry and appearance. Interactive gameplay, physics, and persistent dynamic state still require separate implementation.

Tags: `scene-generation` · `explicit-3d` · `Gaussian-surfels` · `camera-control` · `CVPR-2025`. Source reviewed: 2026-10-18. Further reading: [Project](https://kovenyu.com/WonderWorld/)

</details>

### Tool

| Resource | Purpose and scope | Stages |
| --- | --- | --- |
| [Genie 3 / Project Genie](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) · 2025 | Generates interactive video worlds from prompts for real-time exploration. | Planning / World models |
| [World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model) · 2025 | Generates persistent, navigable 3D scenes with splat and mesh exports. | Assets / Scenes / World models |

<details>
<summary>Inputs, outputs, limitations, and further reading</summary>

**[Genie 3 / Project Genie](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)**

Google DeepMind introduced Genie 3 in 2025, demonstrating interactive worlds at 720p and 24 FPS with consistency lasting several minutes, and providing an experience through Project Genie. It represents neural interactive worlds. The official presentation does not imply downloadable engine source, exportable level assets, or deterministic gameplay rules.

Tags: `interactive-video` · `neural-simulator` · `text-to-world` · `Google-DeepMind` · `hosted`. Source reviewed: 2026-10-18.

**[World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model)**

Marble supports multimodal world creation, exports Gaussian splats, visual meshes, and collision meshes for approximate physics, and renders video along camera paths. Compared with pure video continuation, it produces spatial assets for downstream engines. Developers still need to build character behavior, quest logic, and game loops.

Tags: `scene-generation` · `explicit-3d` · `Gaussian-splatting` · `mesh-export` · `hosted`. Source reviewed: 2026-10-18. Further reading: [Product](https://marble.worldlabs.ai/)

</details>

## Further reading and practice

- [Agents: models, harnesses, skills, and MCP](docs/agents-notes.md)
- [Engine ecosystems: documentation, source, tests, and community practice](docs/engines-notes.md)
- [AI for 2D and 3D: evaluation versions, asset pipelines, and release boundaries](docs/game-ai-notes.md)
- [World models: code state, hybrid rendering, video simulation, and explicit 3D](docs/world-model-notes.md)
- [Practical guide: task contracts, asset import, validation, and reproduction](docs/practical-guide.md)

## Maintenance

Edit only `data/segments/*.json` for catalog content. Run `npm run build` to regenerate the list and website, and `npm run check` to validate the data and generated outputs. There is no automatic scraping or scheduled updating. Code, weights, data, and services may have different licenses; read the relevant official terms before use. External projects belong to their respective authors.
