<a id="top"></a>

<p align="center">
  <img src="brand/gamemap-mark.svg" width="80" height="80" alt="GameMap">
</p>

# GameMap · Awesome AI for Games

**Find the tools, projects, and research to turn an idea into a playable game.**

GameMap maps the AI-assisted game development ecosystem: coding agents, engines, 2D and 3D generation, production tools, testing, and world models. It connects tools and official documentation with game projects, creator build logs, test resources, and original research.

[Website](https://openenvision.github.io/GameMap/) · [Chinese website](https://openenvision.github.io/GameMap/zh/) · [Resource catalog](#resources) · [Game examples](#examples) · [Papers and research](#papers) · [Preview and deployment](#usage)

All **115 curated resources** are listed below. Longer companion catalogs are organized into expandable topic groups. Resource names link to the upstream project, paper, or official documentation; **Site details** adds context, related links, and the catalog's scope notes.

<a id="start-here"></a>

## Start with your goal

| Your goal | Start here | What to work toward |
| --- | --- | --- |
| Build your first playable game | [Practical guide](https://openenvision.github.io/GameMap/docs/practical-guide/) → [2D development path](https://openenvision.github.io/GameMap/paths/2d/) | Start from a small example and complete the start, play, win or lose, and retry loop. |
| Bring an agent into an existing engine project | [Coding agents and MCP](#resources-agents) → [Agent toolkit](#agent-toolkit) | Connect engine documentation, code changes, compiler output, and runtime feedback. |
| Create art, models, animation, and sound | [2D assets](#resources-2d) · [3D assets](#resources-3d) · [Production tools](#resources-production) | Match input and output formats to the target engine, then check the pipeline with [test resources](#testing). |
| Learn from a real game's development | [Game examples and source](#examples) → [Demos and recordings](#showcase) | Read the playable build, build log, and project source together. |
| Explore world models and game AI | [World models](#resources-world) → [Papers and research](#papers) | Examine executable rules, engine state, generative rendering, and interactive video as distinct parts of a system. |

<a id="resources"></a>

## Explore the complete catalog

### Curated resources · 115 entries

| Category | Entries | Coverage |
| --- | ---: | --- |
| [Coding agents and MCP tools](#resources-agents) | 20 | General agents, model integrations, agent frameworks, project conventions, and editor or browser bridges. |
| [Engines, documentation, and learning](#resources-engines) | 24 | Godot, Unity, Unreal Engine, Three.js, Phaser, Blender, and asset interchange. |
| [2D game generation and assets](#resources-2d) | 13 | Game and rule generation, levels, runtime verification, pixel art, and images. |
| [3D production, models, and scenes](#resources-3d) | 15 | Engine agents, model generation, procedural scenes, reconstruction, and production workflows. |
| [Production, testing, and distribution](#resources-production) | 23 | Art, motion, audio, NPCs, level design, engineering, accessibility, testing, and publishing. |
| [World models and generative rendering](#resources-world) | 20 | Code-driven rules, persistent state, hybrid rendering, neural simulation, and explicit 3D worlds. |

### Practice and research collections

| Collection | Entries | What you will find |
| --- | ---: | --- |
| [Development paths](#paths) | 3 paths, 18 steps | Stage goals, deliverables, and acceptance checks for 2D, 3D, and world-model projects. |
| [Agent toolkit](#agent-toolkit) | 31 | Skills, engine bridges, development frameworks, workflows, code examples, and evaluation tools. |
| [Game examples and foundations](#examples) | 88 cases, 3 official foundations | Game descriptions, engines, playable or downloadable builds, project source, and development records. |
| [Community collections](#examples) | 6 | More games, creators, and discovery lists. |
| [Demos and visual evidence](#showcase) | 29 | Game recordings, world models, scenes, assets, and workflow demonstrations. |
| [Test resources](#testing) | 36 resources, 3 starter tasks | Modifiable projects, agent environments, assets, and motion datasets. |
| [Repository research](#repository-research) | 213 records | Game projects, agent harnesses, FPS projects, engine components, classic ports, and discovery lists. |
| [Papers and research materials](#papers) | 483 records | Design, building, runtime systems, testing, playing, world modeling, and foundations. |
| [Documentation and guides](#guides) | 66 pages | Practical guides, technical notes, production workflows, source records, and skill references. |

Counts describe entries in each collection; a project can appear in more than one. Resource types follow the website's labels, including agents, frameworks, tools, documentation, skills, benchmarks, papers, and community resources. The documentation catalog includes the original Chinese-language guides, identified in their titles.

---

<a id="resources-agents"></a>

## Coding agents and MCP tools · 20 resources

From general coding agents, model integrations, and project instructions to MCP bridges for editors and browsers: resources for the code iteration loop.

### General coding agents · 6 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [OpenAI Codex](<https://learn.chatgpt.com/docs/codex/cli>) | Agent | A general-purpose coding agent for reading, editing, running commands, and reviewing code in a local repository. | [Site details](<https://openenvision.github.io/GameMap/resources/codex/>) · [Official game workflow](<https://learn.chatgpt.com/use-cases/browser-games>) |
| [Claude Code](<https://code.claude.com/docs/en/overview>) | Agent | A coding agent that reads and edits projects, runs tools, and supports skills, hooks, and MCP through terminal and IDE interfaces. | [Site details](<https://openenvision.github.io/GameMap/resources/claude-code/>) · [Official repository and examples](<https://github.com/anthropics/claude-code>) |
| [Gemini CLI](<https://github.com/google-gemini/gemini-cli>) | Agent | Google's open-source terminal coding agent with file access, shell tools, extensions, and MCP support. | [Site details](<https://openenvision.github.io/GameMap/resources/gemini-cli/>) · [Official documentation](<https://geminicli.com/docs/>) |
| [OpenCode](<https://opencode.ai/docs/>) | Agent | An open-source coding agent with multiple model providers, Plan / Build modes, and project instructions. | [Site details](<https://openenvision.github.io/GameMap/resources/opencode/>) · [Source code](<https://github.com/anomalyco/opencode>) · [V1 to V2 migration boundaries](<https://opencode.ai/v2/docs/migrate-v1/>) |
| [Cline](<https://github.com/cline/cline>) | Agent | An open-source coding agent with multiple models, Plan / Act modes, project rules, and MCP support. | [Site details](<https://openenvision.github.io/GameMap/resources/cline/>) · [Documentation](<https://docs.cline.bot/>) |
| [Aider](<https://github.com/Aider-AI/aider>) | Agent | A terminal AI pair-programming tool built around repository maps, Git changes, and lint and test feedback. | [Site details](<https://openenvision.github.io/GameMap/resources/aider/>) · [User documentation](<https://aider.chat/docs/>) · [Screenshot and image input](<https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/website/docs/usage/images-urls.md#L11-L27>) |

### Model integrations and agent frameworks · 5 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [DeepSeek · Agent Integrations](<https://api-docs.deepseek.com/guides/anthropic_api/>) | Documentation | Official guidance for using DeepSeek as a model backend within agent harnesses such as Claude Code. | [Site details](<https://openenvision.github.io/GameMap/resources/deepseek-agent-integrations/>) |
| [OpenHands · Agent Canvas](<https://github.com/OpenHands/OpenHands>) | Framework | An open-source development console for managing local, remote, and cloud agent environments. | [Site details](<https://openenvision.github.io/GameMap/resources/openhands/>) · [Core SDK](<https://github.com/OpenHands/software-agent-sdk>) |
| [OpenHands Software Agent SDK](<https://github.com/OpenHands/software-agent-sdk>) | Framework | A programmable development framework for agents, tools, conversations, workspaces, and server interfaces. | [Site details](<https://openenvision.github.io/GameMap/resources/openhands-sdk/>) · [SDK documentation](<https://docs.openhands.dev/sdk>) · [TypeScript client scope and stability](<https://github.com/OpenHands/software-agent-sdk/blob/3f3294581ebf40f3bbe5b96aec1d28b7fec96226/clients/typescript/README.md#L1-L19>) |
| [Claude Agent SDK](<https://code.claude.com/docs/en/agent-sdk/overview>) | Framework | Embed Claude Code's tool loop, permissions, sessions, and extensions in Python or TypeScript applications. | [Site details](<https://openenvision.github.io/GameMap/resources/claude-agent-sdk/>) |
| [mini-swe-agent](<https://github.com/SWE-agent/mini-swe-agent>) | Framework | A minimal shell-based coding-agent research baseline designed for modification and trace inspection. | [Site details](<https://openenvision.github.io/GameMap/resources/mini-swe-agent/>) · [Predecessor: SWE-agent](<https://github.com/SWE-agent/SWE-agent>) |

### Project instructions and development workflows · 3 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [AGENTS.md](<https://agents.md/>) | Documentation | An open Markdown format for giving coding agents build commands, test rules, and project conventions. | [Site details](<https://openenvision.github.io/GameMap/resources/agents-md/>) |
| [Agent Skills](<https://agentskills.io/home>) | Documentation | An open format that packages domain workflows as SKILL.md instructions, scripts, and reference materials. | [Site details](<https://openenvision.github.io/GameMap/resources/agent-skills-format/>) |
| [Codex · Create Browser-based Games](<https://learn.chatgpt.com/use-cases/browser-games>) | Documentation | OpenAI's browser game workflow covering planning, project instructions, asset generation, and browser iteration. | [Site details](<https://openenvision.github.io/GameMap/resources/codex-browser-games/>) |

### MCP and editor bridges · 6 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [MCP for Unity](<https://github.com/CoplayDev/unity-mcp>) | Tool | A community MCP bridge connecting general-purpose coding agents to the Unity Editor. | [Site details](<https://openenvision.github.io/GameMap/resources/unity-mcp/>) · [Installation and tool documentation](<https://coplaydev.github.io/unity-mcp/>) · [Pinned installation requirements](<https://github.com/CoplayDev/unity-mcp/blob/aa5fc638d623f56178d50329d9ad8c541a57fe66/website/docs/getting-started/install.md#L13-L17>) |
| [Unity-MCP Operator Guide](<https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md>) | Skill | A practical MCP for Unity skill: inspect editor state, act, wait for compilation and domain reload, then verify results. | [Site details](<https://openenvision.github.io/GameMap/resources/unity-mcp-skill/>) |
| [Godot MCP · Coding-Solo](<https://github.com/Coding-Solo/godot-mcp>) | Tool | A community MCP server for launching Godot, running projects, reading logs, and performing basic scene operations. | [Site details](<https://openenvision.github.io/GameMap/resources/godot-mcp/>) · [Pinned implementation and lifecycle limits](<https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts#L1053-L1215>) |
| [MCP for Blender](<https://github.com/ahujasid/mcp-for-blender>) | Tool | A Blender add-on and MCP server for agent-driven modeling, materials, Python execution, and visual feedback. | [Site details](<https://openenvision.github.io/GameMap/resources/mcp-for-blender/>) · [Telemetry defaults and controls](<https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/README.md#L808-L842>) · [Opt-in content and data terms](<https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/TERMS_AND_CONDITIONS.md>) |
| [Unreal MCP · chongdashu](<https://github.com/chongdashu/unreal-mcp>) | Tool | A Python MCP server and UE C++ plugin connecting agents to Actors, Blueprints, and viewport controls. | [Site details](<https://openenvision.github.io/GameMap/resources/unreal-mcp/>) · [Tool documentation](<https://github.com/chongdashu/unreal-mcp/tree/main/Docs>) |
| [Playwright MCP](<https://github.com/microsoft/playwright-mcp>) | Tool | Microsoft's browser automation MCP server for exposing page structure, interactions, and browser feedback to agents. | [Site details](<https://openenvision.github.io/GameMap/resources/playwright-mcp/>) · [Pinned tools and security boundaries](<https://github.com/microsoft/playwright-mcp/blob/b8b4183e099f136cbec0388a6088d4aa2f6b9685/README.md#security>) · [Companion CLI + Skills](<https://github.com/microsoft/playwright-cli>) |

<a id="resources-engines"></a>

## Engines, documentation, and learning resources · 24 resources

Official documentation, runnable examples, scripting interfaces, testing tools, and community tutorials, organized by engine and creation tool.

### Godot · 5 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Godot Engine · Official Documentation](<https://docs.godotengine.org/en/stable/>) | Tool | An open-source 2D and 3D game engine that organizes runnable projects through scenes, nodes, resources, and scripts. | [Site details](<https://openenvision.github.io/GameMap/resources/godot-engine/>) · [Engine source](<https://github.com/godotengine/godot>) · [Official examples](<https://github.com/godotengine/godot-demo-projects>) |
| [Godot · Command Line Tutorial](<https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html>) | Documentation | Godot's official CLI reference for headless operation, script checks, asset import, execution, and export. | [Site details](<https://openenvision.github.io/GameMap/resources/godot-command-line/>) |
| [Godot Demo Projects](<https://github.com/godotengine/godot-demo-projects>) | Documentation | Official runnable Godot examples covering 2D, 3D, GUI, audio, networking, and rendering. | [Site details](<https://openenvision.github.io/GameMap/resources/godot-demo-projects/>) |
| [GUT · Godot Unit Test](<https://github.com/bitwes/Gut>) | Tool | A community Godot testing framework for GDScript assertions, test doubles, and parameterized cases. | [Site details](<https://openenvision.github.io/GameMap/resources/godot-gut/>) · [Author documentation](<https://gut.readthedocs.io/>) |
| [GDQuest · First 2D Game](<https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/>) | Community resource | A GDQuest tutorial for a Godot 2D survival game, with complete scripts, a project, and troubleshooting notes. | [Site details](<https://openenvision.github.io/GameMap/resources/gdquest-first-2d-game/>) · [Project source](<https://github.com/gdquest-demos/getting-started-with-godot-4>) · [Tutorial library](<https://www.gdquest.com/library/>) |

### Unity · 5 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Unity · Manual](<https://docs.unity3d.com/Manual/index.html>) | Tool | Official Unity documentation for projects, the editor, scripting, rendering, physics, asset import, and publishing. | [Site details](<https://openenvision.github.io/GameMap/resources/unity-engine/>) · [Official example source](<https://github.com/Unity-Technologies/2d-techdemos>) |
| [Unity Test Framework](<https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html>) | Tool | Unity's official testing framework, with Edit mode, Play mode, and command-line execution. | [Site details](<https://openenvision.github.io/GameMap/resources/unity-test-framework/>) · [Package and API documentation](<https://docs.unity3d.com/Packages/com.unity.test-framework@latest/>) · [Versioned test-job and cancellation API](<https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html>) |
| [Unity · 2D Tech Demos](<https://github.com/Unity-Technologies/2d-techdemos>) | Documentation | Official Unity 2D example source for Tilemaps, Scripted Tiles, brushes, and runtime map changes. | [Site details](<https://openenvision.github.io/GameMap/resources/unity-2d-techdemos/>) · [Pinned editor baseline](<https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/ProjectSettings/ProjectVersion.txt#L1-L2>) · [Pinned package manifest](<https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/Packages/manifest.json#L2-L14>) · [Pinned package lock](<https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/Packages/packages-lock.json#L27-L36>) |
| [Catlike Coding · Surface Contact](<https://catlikecoding.com/unity/tutorials/movement/surface-contact/>) | Community resource | Jasper Flick's Unity movement tutorial explains character control through slopes, steps, and contact timing. | [Site details](<https://openenvision.github.io/GameMap/resources/catlike-coding-movement/>) · [Complete movement series](<https://catlikecoding.com/unity/tutorials/movement/>) · [Shader and project tutorials](<https://catlikecoding.com/unity/tutorials/>) |
| [Unity · Addressables Build and Loading APIs](<https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html>) | Documentation | Builds addressable content from explicit profiles and loads assets through asynchronous handles. | [Site details](<https://openenvision.github.io/GameMap/resources/unity-addressables-scripting/>) · [LoadAssetAsync reference](<https://docs.unity3d.com/kr/Packages/com.unity.addressables%401.21/api/UnityEngine.AddressableAssets.Addressables.LoadAssetAsync.html>) |

### Unreal Engine · 5 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Unreal Engine · Documentation](<https://dev.epicgames.com/documentation/en-us/unreal-engine>) | Tool | Official Epic documentation for UE C++, Blueprints, rendering, animation, physics, and packaging. | [Site details](<https://openenvision.github.io/GameMap/resources/unreal-engine/>) · [Source access instructions](<https://dev.epicgames.com/documentation/en-us/unreal-engine/downloading-source-code-in-unreal-engine>) · [Engine source (authorization required)](<https://github.com/EpicGames/UnrealEngine>) |
| [Unreal · Automation Test Framework](<https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine>) | Tool | UE's official infrastructure for unit, functional, content stress, and screenshot comparison tests. | [Site details](<https://openenvision.github.io/GameMap/resources/unreal-automation-tests/>) · [Command-line reports and interrupted-run resumption](<https://dev.epicgames.com/documentation/en-us/unreal-engine/run-automation-tests-in-unreal-engine>) |
| [Lyra Sample Game](<https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine>) | Documentation | Epic's modular UE5 sample game, with gameplay plugins, abilities, animation, input, and UI. | [Site details](<https://openenvision.github.io/GameMap/resources/unreal-lyra/>) · [Official Fab listing](<https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en>) |
| [Epic Developer Community · UE](<https://dev.epicgames.com/community/unreal-engine>) | Community resource | Epic's UE community hub for author tutorials, learning materials, and version-specific discussions. | [Site details](<https://openenvision.github.io/GameMap/resources/epic-developer-community/>) |
| [Unreal Engine · Remote Control API](<https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine>) | Documentation | Exposes reflected editor properties and functions over HTTP for external tooling. | [Site details](<https://openenvision.github.io/GameMap/resources/unreal-remote-control/>) · [HTTP API reference](<https://dev.epicgames.com/documentation/en-us/unreal-engine/remote-control-api-http-reference-for-unreal-engine>) |

### Browser graphics and game frameworks · 6 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Three.js](<https://github.com/mrdoob/three.js>) | Tool | A JavaScript 3D rendering library for browsers, with scenes, cameras, materials, and loaders. | [Site details](<https://openenvision.github.io/GameMap/resources/threejs/>) · [Official manual](<https://threejs.org/manual/>) · [Official examples](<https://threejs.org/examples/>) |
| [Three.js · Examples](<https://threejs.org/examples/>) | Documentation | Official runnable Three.js graphics examples with their HTML and JavaScript source. | [Site details](<https://openenvision.github.io/GameMap/resources/threejs-examples/>) · [Example source](<https://github.com/mrdoob/three.js/tree/dev/examples>) |
| [Three.js · Instanced Crowd Engineering](<https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928>) | Community resource | A game author's Three.js forum write-up on a single-draw-call crowd system, instance data, LOD, and staggered updates. | [Site details](<https://openenvision.github.io/GameMap/resources/threejs-crowd-experience/>) · [Community forum](<https://discourse.threejs.org/>) |
| [React Three Fiber](<https://r3f.docs.pmnd.rs/getting-started/introduction>) | Framework | A React renderer for Three.js that brings component-based, declarative scenes into the React ecosystem. | [Site details](<https://openenvision.github.io/GameMap/resources/react-three-fiber/>) · [Source code](<https://github.com/pmndrs/react-three-fiber>) |
| [Phaser · First Game Guide](<https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game>) | Tool | A browser 2D game framework whose official tutorial covers assets, scenes, animation, input, and collisions. | [Site details](<https://openenvision.github.io/GameMap/resources/phaser/>) · [Framework source](<https://github.com/phaserjs/phaser>) · [Official documentation](<https://docs.phaser.io/>) |
| [Phaser · Examples](<https://github.com/phaserjs/examples>) | Documentation | Official Phaser example source with runnable references for specific APIs and gameplay components. | [Site details](<https://openenvision.github.io/GameMap/resources/phaser-examples/>) |

### Blender and asset interchange · 3 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Blender](<https://github.com/blender/blender>) | Tool | An open-source 3D creation suite for modeling, materials, rigging, animation, simulation, and rendering. | [Site details](<https://openenvision.github.io/GameMap/resources/blender/>) · [Official main repository](<https://projects.blender.org/blender/blender>) · [Reference manual](<https://docs.blender.org/manual/en/latest/>) · [Python API](<https://docs.blender.org/api/current/>) |
| [Blender Python · API Quickstart](<https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst>) | Documentation | Official Blender API tutorial source covering bpy data, context, operators, and Python operations. | [Site details](<https://openenvision.github.io/GameMap/resources/blender-python-quickstart/>) · [API documentation](<https://docs.blender.org/api/current/>) |
| [Khronos · glTF-Blender-IO](<https://github.com/KhronosGroup/glTF-Blender-IO>) | Tool | Khronos's official Blender glTF 2.0 importer and exporter source, including validation and roundtrip tests. | [Site details](<https://openenvision.github.io/GameMap/resources/gltf-blender-io/>) · [Technical notes](<https://github.com/KhronosGroup/glTF-Blender-IO/blob/main/Technical.md>) · [GameMap: asset validity and runtime fidelity](<https://github.com/OpenEnvision/GameMap/blob/main/docs/asset-validation-contracts.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity>) |

<a id="resources-2d"></a>

## 2D game generation and assets · 13 resources

Resources for game prototypes, rules and levels, development benchmarks, runtime verification, and pixel and image assets.

### Game, rule, and level generation · 7 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [GameGPT](<https://arxiv.org/abs/2310.08067>) | Paper | Studies automated game development through multi-agent planning and code generation. | [Site details](<https://openenvision.github.io/GameMap/resources/gamegpt/>) · [Paper and README repository](<https://github.com/leyiwo/GameGPT>) |
| [OpenGame](<https://github.com/leigest519/OpenGame>) | Agent | Generates browser game projects with reusable templates and debugging skills. | [Site details](<https://openenvision.github.io/GameMap/resources/opengame/>) · [Paper](<https://arxiv.org/abs/2604.18394>) |
| [MarioGPT](<https://github.com/shyamsn97/mario-gpt>) | Paper | Generates playable Mario-style level layouts from text with a GPT model. | [Site details](<https://openenvision.github.io/GameMap/resources/mariogpt/>) · [Paper](<https://arxiv.org/abs/2302.05981>) |
| [GAVEL](<https://github.com/gdrtodd/gavel>) | Framework | Combines language models and quality-diversity search to create board game rules. | [Site details](<https://openenvision.github.io/GameMap/resources/gavel/>) · [Paper](<https://arxiv.org/abs/2407.09388>) |
| [Cardiverse](<https://github.com/danruili/Cardiverse>) | Framework | Connects card game design, Python rule code, and playtesting in a prototype pipeline. | [Site details](<https://openenvision.github.io/GameMap/resources/cardiverse/>) · [Paper](<https://arxiv.org/abs/2502.07128>) |
| [Agent Game Forge](<https://github.com/0x0funky/agent-game-forge>) | Tool | A local 2D game IDE with a scene editor for Codex and Claude Code. | [Site details](<https://openenvision.github.io/GameMap/resources/agent-game-forge/>) |
| [Text2Game](<https://github.com/boltomli/t2g>) | Tool | Turns long-form text into world, character, and event data for narrative prototypes. | [Site details](<https://openenvision.github.io/GameMap/resources/text2game/>) |

### Benchmarks and runtime verification · 3 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [GameDevBench](<https://github.com/waynchi/gamedevbench>) | Benchmark | Evaluates coding agents on development tasks in existing Godot projects. | [Site details](<https://openenvision.github.io/GameMap/resources/gamedevbench/>) · [Paper](<https://arxiv.org/abs/2602.11103>) |
| [GameXpert-Bench](<https://arxiv.org/abs/2608.21833>) | Benchmark | Benchmarks game creation, bug fixing, and iterative improvement in three tracks. | [Site details](<https://openenvision.github.io/GameMap/resources/gamexpert-bench/>) · [Repository and release status](<https://github.com/Kwen-Chen/GameXpert-Bench>) |
| [GameGen-Verifier](<https://github.com/NetX-lab/GameGen-Verifier>) | Framework | Verifies generated game behavior through runtime state hooks and focused checks. | [Site details](<https://openenvision.github.io/GameMap/resources/gamegen-verifier/>) · [Paper](<https://arxiv.org/abs/2605.07442>) |

### Pixel and image assets · 3 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [PixelLab AI Agent Toolkit](<https://www.pixellab.ai/mcp>) | Tool | Generates pixel characters, animation, and seamless tilesets through API and MCP tools. | [Site details](<https://openenvision.github.io/GameMap/resources/pixellab/>) · [Documentation](<https://www.pixellab.ai/docs>) |
| [Agent Sprite Forge](<https://github.com/0x0funky/agent-sprite-forge>) | Skill | Combines reference art, generated animation, and deterministic processing into exportable sprites. | [Site details](<https://openenvision.github.io/GameMap/resources/agent-sprite-forge/>) |
| [OpenAI Image Generation](<https://developers.openai.com/api/docs/guides/image-generation>) | Tool | Generate and edit raster art using image endpoints or a conversational image-generation tool. | [Site details](<https://openenvision.github.io/GameMap/resources/openai-image-api/>) |

<a id="resources-3d"></a>

## 3D production, models, and scenes · 15 resources

Engine agent workflows, 3D asset generation, procedural scenes, and reconstruction research for prototyping and scene assembly.

### Engine agents, production workflows, and benchmarks · 7 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [3AGameFactory](<https://github.com/OpenDCAI/GameFactory-3A>) | Framework | Coordinates game assets, gameplay, and UI through skills, model pipelines, and engine adapters. | [Site details](<https://openenvision.github.io/GameMap/resources/gamefactory-3a/>) · [Chinese documentation](<https://github.com/OpenDCAI/GameFactory-3A/blob/main/README_zh.md>) |
| [GameEngineBench](<https://arxiv.org/abs/2607.03525>) | Benchmark | Tests agent-written C++ runtime changes in real Unreal Engine projects. | [Site details](<https://openenvision.github.io/GameMap/resources/gameenginebench/>) · [Paper-linked repository (availability unverified)](<https://github.com/Nitrode-Research/GameEngineBench>) · [Versioned evaluation protocol](<https://arxiv.org/html/2607.03525v2>) |
| [Unity Agent Plugin](<https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin>) | Skill | Unity-maintained project skills give general coding agents engine-specific context. | [Site details](<https://openenvision.github.io/GameMap/resources/unity-agent-plugin/>) · [Skill source](<https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills>) · [CLI / MCP migration](<https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli>) |
| [MCP Unity Editor](<https://github.com/CoderGamester/mcp-unity>) | Tool | A community MCP bridge for querying, editing, and testing Unity projects. | [Site details](<https://openenvision.github.io/GameMap/resources/mcp-unity/>) |
| [Godot MCP 3D Asset Builder](<https://github.com/LuigiDeFacci/godot-create-3d-assets>) | Skill | Builds reusable stylized 3D assets with Godot geometry and validation workflows. | [Site details](<https://openenvision.github.io/GameMap/resources/godot-3d-asset-skill/>) |
| [AutoUE](<https://github.com/Pluto156/AutoUE>) | Framework | Coordinates agents to build Unreal scenes, gameplay code, interactions, and playtests. | [Site details](<https://openenvision.github.io/GameMap/resources/autoue/>) · [Paper](<https://arxiv.org/abs/2603.07106>) · [Generated games and asset dataset](<https://huggingface.co/datasets/Pluto156/AutoUE_DataSet>) · [Pinned evaluation dispatcher](<https://github.com/Pluto156/AutoUE/blob/8686a4d51c19813f2b3368bd73f685a940db7531/PCGGen_UE/Plugins/LLMEditor/Source/LLMEditor/Private/Core/EvaluateExecutor/EvaluateExecutor.cpp#L174-L186>) |
| [UniGen](<https://github.com/yxwan123/UniGen>) | Framework | Plans Unity prototypes, generates scripts, assembles scenes, and supports iterative debugging. | [Site details](<https://openenvision.github.io/GameMap/resources/unigen/>) · [Paper](<https://arxiv.org/abs/2509.26161>) |

### 3D models and modeling code · 5 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Hunyuan3D 2.0](<https://github.com/Tencent-Hunyuan/Hunyuan3D-2>) | Tool | Turns reference images into geometry and textures for 3D asset pipelines. | [Site details](<https://openenvision.github.io/GameMap/resources/hunyuan3d-2/>) · [2.0 paper](<https://arxiv.org/abs/2501.12202>) · [2.1 repository](<https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1>) · [2.0 license](<https://github.com/Tencent-Hunyuan/Hunyuan3D-2/blob/main/LICENSE>) |
| [TRELLIS](<https://github.com/microsoft/TRELLIS>) | Tool | Generates meshes, Gaussians, and radiance fields from structured latent representations. | [Site details](<https://openenvision.github.io/GameMap/resources/trellis/>) · [Paper](<https://arxiv.org/abs/2412.01506>) |
| [TripoSR](<https://github.com/VAST-AI-Research/TripoSR>) | Tool | Quickly reconstructs a 3D object from one image for asset prototyping. | [Site details](<https://openenvision.github.io/GameMap/resources/triposr/>) |
| [BlenderLLM / BlendNet / CADBench](<https://github.com/FreedomIntelligence/BlenderLLM>) | Paper | Studies text-to-Blender scripting with a training dataset and modeling benchmark. | [Site details](<https://openenvision.github.io/GameMap/resources/blenderllm/>) · [Paper](<https://arxiv.org/abs/2412.14203>) · [BlendNet dataset](<https://huggingface.co/datasets/FreedomIntelligence/BlendNet>) · [CADBench](<https://huggingface.co/datasets/FreedomIntelligence/CADBench>) · [Pinned release dataset description](<https://github.com/FreedomIntelligence/BlenderLLM/blob/f778bfd6992ddd675f7615d0eaf965a8576f2879/README.md#L44-L50>) |
| [Tripo Model Generation API](<https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html>) | Tool | Versioned text-to-model generation with separate geometry and texture seeds. | [Site details](<https://openenvision.github.io/GameMap/resources/tripo-generation-api/>) · [Tripo task results](<https://docs.tripo3d.ai/task-query/get-your-task-result.html>) |

### Scene generation and reconstruction · 3 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Infinigen](<https://github.com/princeton-vl/infinigen>) | Framework | Procedurally generates natural and indoor Blender scenes and synthetic data. | [Site details](<https://openenvision.github.io/GameMap/resources/infinigen/>) · [Project and paper](<https://infinigen.org/>) |
| [Holodeck](<https://github.com/allenai/Holodeck>) | Framework | Lays out and furnishes interactive 3D indoor environments from text. | [Site details](<https://openenvision.github.io/GameMap/resources/holodeck/>) · [Paper](<https://arxiv.org/abs/2312.09067>) |
| [Video2Game](<https://github.com/video2game/video2game>) | Paper | Reconstructs real-world video into interactive 3D environments for the browser. | [Site details](<https://openenvision.github.io/GameMap/resources/video2game/>) · [Paper](<https://arxiv.org/abs/2404.09833>) · [Pinned engine-handoff recommendations](<https://github.com/video2game/video2game/blob/7bcf8ae754240b9fd2de75a154eb73c75a146b79/readme.md#L256-L273>) |

<a id="resources-production"></a>

## Production, testing, and publishing · 23 resources

Art, animation, audio, NPCs, levels, engineering tools, testing, accessibility, and game distribution.

### Art and motion assets · 3 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Scenario](<https://www.scenario.com/>) | Tool | Builds consistent game art pipelines with custom style models and batch generation. | [Site details](<https://openenvision.github.io/GameMap/resources/scenario/>) · [API documentation](<https://docs.scenario.com/>) · [Official beta MCP operations](<https://mcp.scenario.com/docs/tools/model-run>) · [Job cancellation scope](<https://mcp.scenario.com/docs/tools/job-cancel>) |
| [Meshy API](<https://docs.meshy.ai/en>) | Tool | Connects AI model generation, humanoid rigging, and animation export for game asset workflows. | [Site details](<https://openenvision.github.io/GameMap/resources/meshy/>) · [Rigging requirements](<https://docs.meshy.ai/en/api/rigging>) |
| [HY-Motion 1.0](<https://github.com/Tencent-Hunyuan/HY-Motion-1.0>) | Tool | Generates skeletal humanoid motion from text with public inference code and model weights. | [Site details](<https://openenvision.github.io/GameMap/resources/hy-motion/>) · [Official project](<https://hunyuan.tencent.com/motion>) · [Model weights](<https://huggingface.co/tencent/HY-Motion-1.0>) · [HY-Motion community license](<https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/License.txt>) |

### Sound effects, music, and speech · 4 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [ElevenLabs Sound Effects](<https://elevenlabs.io/docs/overview/capabilities/sound-effects>) | Tool | Generates game sound effects, Foley, and looping ambience from text through a web app or API. | [Site details](<https://openenvision.github.io/GameMap/resources/elevenlabs-sfx/>) · [Product walkthrough](<https://elevenlabs.io/docs/eleven-creative/playground/sound-effects>) · [Sound Effects API reference](<https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert>) |
| [Stable Audio Open 1.0](<https://huggingface.co/stabilityai/stable-audio-open-1.0>) | Tool | Provides downloadable text-to-audio weights and local tools for sound effects and field recordings. | [Site details](<https://openenvision.github.io/GameMap/resources/stable-audio-open/>) · [Local demo setup](<https://github.com/Stability-AI/stable-audio-tools#interface>) · [Research paper](<https://arxiv.org/abs/2407.14358>) · [Stable Audio Open model license](<https://huggingface.co/stabilityai/stable-audio-open-1.0/blob/main/LICENSE.md>) |
| [ElevenLabs Music](<https://elevenlabs.io/docs/overview/capabilities/music>) | Tool | Prompted music generation with composition plans, references and section editing. | [Site details](<https://openenvision.github.io/GameMap/resources/elevenlabs-music/>) · [ElevenLabs Music terms](<https://elevenlabs.io/music-terms>) · [Prohibited Use Policy (October 2026)](<https://elevenlabs.io/use-policy>) |
| [ElevenLabs Speech Generation](<https://elevenlabs.io/docs/api-reference/text-to-speech/convert>) | Tool | Voice-conditioned speech synthesis with pronunciation dictionaries and neighboring-request continuity controls. | [Site details](<https://openenvision.github.io/GameMap/resources/elevenlabs-speech/>) · [Prohibited Use Policy (October 2026)](<https://elevenlabs.io/use-policy>) · [Non-EEA general terms (October 2026)](<https://elevenlabs.io/terms-of-use>) |

### Level design and conversational NPCs · 2 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Level Design Book · unofficial design skill](<https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design>) | Skill | An unofficial, agent-neutral adaptation of The Level Design Book for level briefs, blockouts, encounters, wayfinding, and evidence-based playtest reviews. Unofficial adaptation; licensed under CC BY-NC-SA 4.0. | [Site details](<https://openenvision.github.io/GameMap/resources/level-design-book-skill/>) · [The Level Design Book](<https://book.leveldesignbook.com/>) · [Original authors and contributors](<https://book.leveldesignbook.com/appendix/about>) · [Book licensing and third-party exceptions](<https://book.leveldesignbook.com/appendix/license>) · [CC BY-NC-SA 4.0 legal code](<https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode>) |
| [Convai](<https://convai.com/>) | Tool | Adds conversational NPCs with speech, memory, emotion, and in-scene actions. | [Site details](<https://openenvision.github.io/GameMap/resources/convai/>) · [Unity SDK documentation](<https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk>) · [Unreal SDK source](<https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4>) · [Projects and experiences](<https://convai.com/gallery>) |

### Font, noise, and shader tools · 3 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [MSDF Atlas Generator](<https://github.com/Chlumsky/msdf-atlas-gen>) | Tool | A command-line and library tool for generating distance-field font atlases. | [Site details](<https://openenvision.github.io/GameMap/resources/msdf-atlas-gen/>) |
| [FastNoise Lite](<https://github.com/Auburn/FastNoiseLite>) | Framework | A portable noise library for procedural terrain and material inputs. | [Site details](<https://openenvision.github.io/GameMap/resources/fastnoise-lite/>) |
| [DirectX Shader Compiler](<https://github.com/microsoft/DirectXShaderCompiler>) | Tool | HLSL compilation through the dxc command line and compiler APIs. | [Site details](<https://openenvision.github.io/GameMap/resources/directx-shader-compiler/>) · [Compiler API guide](<https://github.com/microsoft/DirectXShaderCompiler/wiki/Using-dxc.exe-and-dxcompiler.dll>) |

### Testing, desktop automation, and accessibility · 6 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Regression Games](<https://github.com/Regression-Games/RGUnityBots>) | Tool | Provides a public Unity SDK for gameplay recording, input replay, and regression-test reference workflows. | [Site details](<https://openenvision.github.io/GameMap/resources/regression-games/>) · [Unity SDK](<https://github.com/Regression-Games/RGUnityBots>) · [Boss Room UI-testing sample](<https://github.com/Regression-Games/UITest-BossRoom>) · [First-test tutorial repository fallback](<https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx>) |
| [modl.ai](<https://modl.ai/>) | Tool | Uses visual agents and natural-language tasks to test uploaded game builds. | [Site details](<https://openenvision.github.io/GameMap/resources/modl-ai/>) · [Request a product demonstration](<https://modl.ai/contact>) |
| [Unreal Engine · Gauntlet](<https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US>) | Documentation | Orchestrates game test sessions with multiple processes, roles, devices, and collected logs. | [Site details](<https://openenvision.github.io/GameMap/resources/unreal-gauntlet/>) |
| [Windows · UI Automation and Input Semantics](<https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview>) | Documentation | Exposes provider-supported accessibility control patterns for inspecting and manipulating desktop editor controls. | [Site details](<https://openenvision.github.io/GameMap/resources/windows-ui-automation/>) · [Properties and occlusion](<https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-automation-element-propids>) · [Input and integrity limits](<https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput>) · [DPI coordinates](<https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-screenscaling>) · [Window/display capture and frame lifetime](<https://learn.microsoft.com/en-us/windows/apps/develop/media-authoring-processing/screen-capture>) · [GameMap: native UI evidence boundaries](<https://github.com/OpenEnvision/GameMap/blob/main/docs/engine-operation-contracts.md#native-gui-automation-is-a-separate-evidence-surface>) |
| [Xbox Accessibility Guidelines](<https://learn.microsoft.com/en-us/xbox/accessibility/guidelines>) | Documentation | Game-specific accessibility guidance for designers, developers and test teams. | [Site details](<https://openenvision.github.io/GameMap/resources/xbox-accessibility-guidelines/>) |
| [Playwright Test](<https://playwright.dev/docs/test-snapshots>) | Tool | Browser testing with DOM actions, assertions and screenshot comparisons. | [Site details](<https://openenvision.github.io/GameMap/resources/playwright-test/>) · [Actionability](<https://playwright.dev/docs/actionability>) · [Screenshot assertion API](<https://playwright.dev/docs/api/class-pageassertions>) |

### Game distribution platforms · 5 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [Steam](<https://partner.steamgames.com/>) | Community resource | Discover desktop games and use Steamworks to prepare store pages, builds, testing, and release. | [Site details](<https://openenvision.github.io/GameMap/resources/steamworks/>) · [Browse games on Steam](<https://store.steampowered.com/>) · [Steamworks getting started](<https://partner.steamgames.com/doc/gettingstarted>) |
| [itch.io](<https://itch.io/developers>) | Community resource | Discover independent games and publish project pages with browser builds or downloadable releases. | [Site details](<https://openenvision.github.io/GameMap/resources/itch-io/>) · [Browse games on itch.io](<https://itch.io/games>) · [Create your first itch.io page](<https://itch.io/docs/creators/getting-started>) |
| [Epic Games Store](<https://store.epicgames.com/en-US/distribution>) | Community resource | Browse game releases and prepare store distribution through Epic's self-service developer tools. | [Site details](<https://openenvision.github.io/GameMap/resources/epic-games-store/>) · [Browse games on Epic Games Store](<https://store.epicgames.com/en-US/>) · [Epic Developer Portal documentation](<https://dev.epicgames.com/docs/dev-portal>) |
| [GOG](<https://www.gog.com/submit-your-game>) | Community resource | Discover DRM-free desktop releases and submit a game to GOG's curated catalog. | [Site details](<https://openenvision.github.io/GameMap/resources/gog/>) · [Browse games on GOG](<https://www.gog.com/en/games>) · [Submit a game to GOG](<https://lp.gog.com/submit-your-game/en>) |
| [CrazyGames](<https://developer.crazygames.com/>) | Community resource | Play browser games and prepare web builds for CrazyGames submission, testing, and launch. | [Site details](<https://openenvision.github.io/GameMap/resources/crazygames/>) · [Browse games on CrazyGames](<https://www.crazygames.com/>) · [CrazyGames publishing documentation](<https://docs.crazygames.com/>) · [CrazyGames submission requirements](<https://docs.crazygames.com/requirements/intro/>) |

<a id="resources-world"></a>

## World models and generative rendering · 20 resources

Resources covering code-maintained world state, executable rules and planning, interactive video simulation, and explicit 3D world generation.

### Code state and generative rendering · 6 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [SolarRenderer](<https://enderfga.cn/SolarRenderer/>) | Paper | Turns engine- or agent-generated structure videos into styled final visuals. | [Site details](<https://openenvision.github.io/GameMap/resources/solarrenderer/>) · [Code](<https://github.com/Enderfga/SolarRenderer>) · [Paper PDF](<https://enderfga.cn/data/solarrenderer.pdf>) · [Weights](<https://huggingface.co/Enderfga/SolarRenderer>) · [Data and evaluation](<https://huggingface.co/datasets/Enderfga/SolarRenderer-Data>) · [Usage guide](<https://github.com/Junchao-cs/SolarWM/blob/main/docs/solar_renderer.md>) |
| [StreamRender-H3](<https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/>) | Framework | A code engine maintains the world while streaming diffusion renders its semantic maps. | [Site details](<https://openenvision.github.io/GameMap/resources/streamrender-h3/>) · [Sol-Engine](<https://nvlabs.github.io/Sana/Sol-Engine/>) · [Agent workflow](<https://nvlabs.github.io/Sana/Sol-Engine/docs/agent-workflow/>) · [Pinned runtime source](<https://github.com/NVlabs/Sana/tree/0527465fdcbbf27180a76419a4e73643aa1aac73/models/streamrender_h3>) · [Weights and component licenses](<https://huggingface.co/Efficient-Large-Model/StreamRender-H3>) |
| [Code World Model: Coding Agent as World Brain](<https://arxiv.org/abs/2608.25927>) | Paper | A coding agent writes executable rules and persistent state to drive a video world. | [Site details](<https://openenvision.github.io/GameMap/resources/code-world-model-brain/>) · [Project](<https://buaacyw.github.io/cwm/>) · [Inference code](<https://github.com/buaacyw/code-world-model>) · [Reproduction scope](<https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md>) |
| [Programmable World Model](<https://arxiv.org/abs/2609.10540>) | Paper | Explicit global state and programmable rules preserve entities outside the camera view. | [Site details](<https://openenvision.github.io/GameMap/resources/programmable-world-model/>) · [Project and release progress](<https://github.com/AlayaLab/pwm>) |
| [CoDeR — Code Plans, Diffusion Renders](<https://arxiv.org/abs/2609.26458>) | Paper | Collaborating agents build executable worlds, with diffusion models rendering observations. | [Site details](<https://openenvision.github.io/GameMap/resources/coder-world-model/>) · [Project](<https://becauseimbatman0.github.io/CoDeR>) |
| [Magpie: Real-Time World Renderer for Interactive Games](<https://arxiv.org/abs/2608.27168>) | Paper | A game engine runs gameplay while a separate Render Server generates final visuals. | [Site details](<https://openenvision.github.io/GameMap/resources/magpie-renderer/>) · [Paper v1 latency and limitations](<https://arxiv.org/html/2608.27168v1>) |

### Executable rules and model-based planning · 5 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [WorldCoder](<https://arxiv.org/abs/2402.12275>) | Paper | Induces Python world models from environment interactions, then plans within them. | [Site details](<https://openenvision.github.io/GameMap/resources/worldcoder/>) |
| [GIF-MCTS / Code World Models Benchmark](<https://arxiv.org/abs/2405.15383>) | Paper | Synthesizes runnable environment models through generate, improve, and fix tree search. | [Site details](<https://openenvision.github.io/GameMap/resources/gif-mcts-cwm/>) · [Code and CWMB](<https://github.com/nicoladainese96/code-world-models>) · [Project](<https://sites.google.com/view/code-world-models/home>) |
| [Code World Models for General Game Playing](<https://arxiv.org/abs/2510.04542>) | Paper | Compiles natural-language game rules into verifiable simulators for MCTS planning. | [Site details](<https://openenvision.github.io/GameMap/resources/cwm-general-game-playing/>) |
| [PoE-World](<https://arxiv.org/abs/2505.10819>) | Paper | Combines small programmatic experts to model stochastic world dynamics. | [Site details](<https://openenvision.github.io/GameMap/resources/poe-world/>) · [Code](<https://github.com/topwasu/poe-world>) · [Project](<https://topwasu.github.io/poe-world>) |
| [FactorSim](<https://arxiv.org/abs/2409.17652>) | Paper | Generates simulation and task code from language using factorized state representations. | [Site details](<https://openenvision.github.io/GameMap/resources/factorsim/>) · [Project](<https://cs.stanford.edu/~sunfanyun/factorsim/>) · [Paper v2 scope](<https://arxiv.org/html/2409.17652v2>) |

### Interactive video and neural simulators · 7 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [SolarWM](<https://arxiv.org/abs/2609.02886>) | Paper | An interactive video world model framework for open data, training, and long-horizon inference. | [Site details](<https://openenvision.github.io/GameMap/resources/solarwm/>) · [Code and documentation](<https://github.com/Junchao-cs/SolarWM>) · [Project](<https://junchao-cs.github.io/SolarWM-Web/>) · [Data access](<https://huggingface.co/datasets/junchaoh-cs/SolarWM-Data>) · [H3 weights and access](<https://huggingface.co/junchaoh-cs/SolarWM-H3-33B>) |
| [Genie: Generative Interactive Environments](<https://arxiv.org/abs/2402.15391>) | Paper | Learns latent-action-controlled 2D worlds from videos without action labels. | [Site details](<https://openenvision.github.io/GameMap/resources/genie/>) |
| [Genie 3 / Project Genie](<https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/>) | Tool | Generates interactive video worlds from prompts for real-time exploration. | [Site details](<https://openenvision.github.io/GameMap/resources/genie-3/>) · [Project Genie access and limits](<https://support.google.com/labs/answer/16875695?hl=en>) |
| [GameNGen — Diffusion Models Are Real-Time Game Engines](<https://arxiv.org/abs/2408.14837>) | Paper | Trains an interactive diffusion simulator from DOOM gameplay trajectories. | [Site details](<https://openenvision.github.io/GameMap/resources/gamengen/>) · [Project](<https://gamengen.github.io/>) |
| [DIAMOND — Diffusion for World Modeling](<https://arxiv.org/abs/2405.12399>) | Paper | Trains reinforcement learning agents inside diffusion world models that preserve visual detail. | [Site details](<https://openenvision.github.io/GameMap/resources/diamond/>) · [Code and playable models](<https://diamond-wm.github.io/>) |
| [GameFactory](<https://arxiv.org/abs/2501.08325>) | Paper | Combines open-domain video generation with keyboard and mouse action control. | [Site details](<https://openenvision.github.io/GameMap/resources/gamefactory/>) · [Dataset tools and documentation](<https://github.com/KlingAIResearch/GameFactory>) · [GF-Minecraft dataset](<https://huggingface.co/datasets/KlingTeam/GameFactory-Dataset>) |
| [Oasis: A Universe in a Transformer](<https://oasis-model.github.io/>) | Framework | A neural game research release that predicts Minecraft-style frames from prior frames and actions. | [Site details](<https://openenvision.github.io/GameMap/resources/oasis/>) · [Inference code](<https://github.com/etched-ai/open-oasis>) · [500M weights, license and access](<https://huggingface.co/Etched/oasis-500m>) |

### Explicit 3D world generation · 2 resources

| Resource | Type | Purpose | Further reading |
| --- | --- | --- | --- |
| [WonderWorld](<https://arxiv.org/abs/2406.09394>) | Paper | Builds an explorable, expandable explicit 3D scene from a single image. | [Site details](<https://openenvision.github.io/GameMap/resources/wonderworld/>) · [Project](<https://kovenyu.com/WonderWorld/>) |
| [World Labs Marble](<https://www.worldlabs.ai/blog/marble-world-model>) | Tool | Generates persistent, navigable 3D scenes with splat and mesh exports. | [Site details](<https://openenvision.github.io/GameMap/resources/marble/>) · [Product](<https://marble.worldlabs.ai/>) · [Web-app mesh export](<https://docs.worldlabs.ai/marble/export/mesh>) |

Level design practice also includes a [downloadable Skill package](<skills/level-design.zip>) adapted unofficially from The Level Design Book, with attribution and license information.

<a id="paths"></a>

## Development paths: from intent to acceptance

Choose a 2D, 3D or code-world-model path. Each path has six steps with a concrete deliverable and a completion check.

### [Build a 2D game](https://openenvision.github.io/GameMap/paths/2d/)

A small, repeatable path from a game brief to a distributable build.

| Step | Deliverable | Completion check |
| --- | --- | --- |
| [Plan & scope](https://openenvision.github.io/GameMap/paths/2d/#scope) | A one-page game brief, acceptance criteria, and project constraints. | Every requirement maps to an observable player action. |
| [Choose an engine](https://openenvision.github.io/GameMap/paths/2d/#engine) | A minimal project with a fixed engine version and one launch command. | A clean environment can import, run, and build the project. |
| [Build the loop](https://openenvision.github.io/GameMap/paths/2d/#gameplay) | A playable vertical slice and repeatable test inputs. | Players can start, win or lose, and restart with correct state transitions. |
| [Create the assets](https://openenvision.github.io/GameMap/paths/2d/#assets) | An asset inventory, animation state table, and license records. | Frames keep a consistent scale, collisions match the art, and sources are documented. |
| [Playtest & iterate](https://openenvision.github.io/GameMap/paths/2d/#testing) | Input replays, key frames, and gameplay acceptance results. | Failure, pause, restart, and extended play all have recorded test evidence. |
| [Ship your world](https://openenvision.github.io/GameMap/paths/2d/#release) | A distributable build, README, and release notes. | Players on the target device can launch, load, play, and report issues. |

### [Build a 3D game](https://openenvision.github.io/GameMap/paths/3d/)

Start with one space, establish a working loop, and prepare game-ready assets.

| Step | Deliverable | Completion check |
| --- | --- | --- |
| [Plan & scope](https://openenvision.github.io/GameMap/paths/3d/#scope) | A level sketch, interaction checklist, and performance targets. | Target devices, quality settings, and the core experience are defined. |
| [Choose an engine](https://openenvision.github.io/GameMap/paths/3d/#engine) | A minimal scene, editor integration, and build command. | Creating objects, running the scene, and reading errors follow repeatable steps. |
| [Build the loop](https://openenvision.github.io/GameMap/paths/3d/#gameplay) | A graybox level, character controller, and interaction state machine. | Camera, collision, save, and restart behavior work correctly in the running game. |
| [Create the assets](https://openenvision.github.io/GameMap/paths/3d/#assets) | GLB or engine assets, collision shapes, LODs, and a license inventory. | Models are grounded and consistently scaled, with rendering and physics costs within budget. |
| [Playtest & iterate](https://openenvision.github.io/GameMap/paths/3d/#testing) | Runtime test results, scene screenshots, and performance samples. | Interactions are reachable, collisions are stable, key paths connect, and performance meets targets. |
| [Ship your world](https://openenvision.github.io/GameMap/paths/3d/#release) | An installer or web build, performance notes, and reproduction instructions. | A clean install on the target device completes one full gameplay loop. |

### [Explore code world models](https://openenvision.github.io/GameMap/paths/world/)

Define state and actions, connect rendering, and test what persists.

| Step | Deliverable | Completion check |
| --- | --- | --- |
| [Define the state](https://openenvision.github.io/GameMap/paths/world/#state) | A state schema, representation choice, and controllable variables. | The system responsible for positions, collisions, object identity, and events is clear. |
| [Connect actions](https://openenvision.github.io/GameMap/paths/world/#actions) | An action protocol and environment step interface. | Actions have clear semantics, and the path from input to image can be tested. |
| [Code the dynamics](https://openenvision.github.io/GameMap/paths/world/#dynamics) | Transition rules, scene update code, and state logs. | State changes are reproducible, and rules can be checked independently of rendered images. |
| [Render the world](https://openenvision.github.io/GameMap/paths/world/#rendering) | Structural inputs, neural render outputs, and synchronization logs. | Rendering follows the underlying state across time, beyond looking good in a single frame. |
| [Test consistency](https://openenvision.github.io/GameMap/paths/world/#consistency) | Fixed action sequences, comparison recordings, and an evaluation report. | Report duration, resolution, hardware, and failures so comparisons use equivalent conditions. |
| [Build an experience](https://openenvision.github.io/GameMap/paths/world/#experience) | An interactive demo, environment notes, and known limitations. | The target hardware can sustain the latency, memory use, and ongoing compute cost. |

<a id="agent-toolkit"></a>

## Agent toolkits, skills and engine bridges

31 toolkits cover engine connections, instructions, task orchestration, inspectable implementations and evaluation. The source labels distinguish implementation code, instructions, and packages containing both; detail pages explain the actual code scope.

The [downloadable level-design skill](skills/level-design.zip) is an unofficial adaptation of The Level Design Book, with attribution and license terms included.

<details>
<summary>Skills & instructions · 9</summary>

| Toolkit | Purpose | Original sources & code |
| --- | --- | --- |
| [Level Design Book · unofficial design skill](https://openenvision.github.io/GameMap/agents/level-design-book-skill/) | An unofficial, agent-neutral adaptation of The Level Design Book for level briefs, blockouts, encounters, wayfinding, and evidence-based playtest reviews. | [Instructions](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design) |
| [Epic Games · Unreal Engine Skills for Claude Code](https://openenvision.github.io/GameMap/agents/epic-unreal-claude-skills/) | Epic's Claude Code plugin teaches agents to discover Unreal toolsets and operate a live editor through the native Unreal MCP surface, with a project-context session hook. | [Source](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin) · [Code & instructions](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin/tree/main/skills) |
| [Claude Code Game Studios · implementation skills](https://openenvision.github.io/GameMap/agents/claude-code-game-studios/) | A Claude Code skill and agent pack that turns game design stories into implementation tasks with architectural context, specialist programmers, review, and configurable completion gates. | [Source](https://github.com/Donchitos/Claude-Code-Game-Studios) · [Code & instructions](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/be8993bbc5a1f016bc770b2846ce06272d284526/.claude/skills/dev-story/references/4-implement.md) |
| [Unity Agent · CLI, Headless, MCP, and Package Skills](https://openenvision.github.io/GameMap/agents/unity-agent-workflow-skills/) | A reusable Unity workflow pack that routes agent work through CLI probes, batchmode validation, MCP selection, package management, and evidence-based completion checks. | [Source](https://github.com/m4bwav/unity-agent) · [Code & instructions](https://github.com/m4bwav/unity-agent/tree/master/skills) |
| [Phaser 4: official coding-agent skills with engine code examples](https://openenvision.github.io/GameMap/agents/phaser-official-agent-skills/) | The Phaser engine repository now provides subsystem skills for agent-assisted development, including scenes, Arcade/Matter physics, input, assets, cameras, animation, UI, and migration. | [Source](https://github.com/phaserjs/phaser#ai-assisted-game-development) · [Instructions](https://github.com/phaserjs/phaser/tree/master/skills) |
| [GodotPrompter: multi-agent Godot skills and reusable movement code](https://openenvision.github.io/GameMap/agents/godot-prompter-agent-skills/) | A Godot-specific skill framework spanning gameplay, scene architecture, shaders, animation, testing, exports, and code review. It includes concrete GDScript/C# recipes, agent routing, platform-specific metadata, an OpenCode plugin, and machine-readable host verification status. | [Source](https://github.com/jame581/GodotPrompter) · [Code & instructions](https://github.com/jame581/GodotPrompter/tree/master/skills/player-controller) |
| [Playgama: web-game performance skill and executable probes](https://openenvision.github.io/GameMap/agents/playgama-web-game-performance-skill/) | A reusable skill that measures a running game after warm-up and guides performance fixes using frame time, JavaScript cost, draw calls, and triangles. It includes both a headless measurement script and an in-game probe for real-device observation. | [Source](https://github.com/Playgama/gamedev-skills) · [Code & instructions](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-performance) |
| [Playgama: asset-production skill and GLB/audio build pipeline](https://openenvision.github.io/GameMap/agents/playgama-web-game-assets-skill/) | A coding-agent skill for choosing a coherent asset set, recording credits, and preparing it for shipping. Its executable pipeline cleans and compresses GLB models while preserving names, handles audio conversion, and can re-encode textures. | [Source](https://github.com/Playgama/gamedev-skills) · [Code & instructions](https://github.com/Playgama/gamedev-skills/tree/main/skills/web-game-assets) |
| [GameDev Agent Skills: engine router and test/code recipes](https://openenvision.github.io/GameMap/agents/gamedev-agent-skills-router/) | A community skill library whose router detects the project’s engine and loads task-specific guidance. Beyond a directory of links, it contains the actual skill bodies, source-backed code recipes, a skill validator, and asset-report/preview utilities. | [Source](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) · [Instructions](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills) |

</details>

<details>
<summary>Engine & editor bridges · 10</summary>

| Toolkit | Purpose | Original sources & code |
| --- | --- | --- |
| [Phaser Game Agent · Coding-Agent Bridge](https://openenvision.github.io/GameMap/agents/phaser-game-agent-bridge/) | Phaser's own setup CLI and stdio-to-HTTP bridge connect external coding agents to a managed Phaser game-building workspace, with a thin reusable skill. | [Source](https://github.com/phaserjs/phaser-game-agent) · [Implementation](https://github.com/phaserjs/phaser-game-agent/blob/main/bridge.mjs) |
| [Codex ↔ Roblox Studio bridge](https://openenvision.github.io/GameMap/agents/codex-roblox-studio-bridge/) | A local Python server and Roblox Studio plugin let Codex create objects, change scripts, run Luau, and communicate through an in-editor chat panel. | [Source](https://github.com/foxycuter2-ai/codex-roblox-studio-bridge) · [Implementation](https://github.com/foxycuter2-ai/codex-roblox-studio-bridge/blob/main/server.py) |
| [ione · Unity HTTP bridge and Claude Code skill](https://openenvision.github.io/GameMap/agents/ione-unity-claude/) | Connects Claude Code to Unity through an opt-in local HTTP bridge so the agent can inspect scenes, create C# scripts, wait for compilation, and verify the game view. | [Source](https://github.com/TestcodeInc/ione) · [Implementation](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/Editor/Core/IoneHttpBridge.cs) |
| [Godot Forge · live editor and runtime bridge (Tann2019)](https://openenvision.github.io/GameMap/agents/godot-forge-editor-bridge/) | An MCP server and Godot add-on for writing scripts, building editable scenes, reading diagnostics, running games, simulating input, and checking mechanics with saved scenarios. | [Source](https://github.com/Tann2019/godot-mcp-server) · [Implementation](https://github.com/Tann2019/godot-mcp-server/blob/b0da85fac67dd067c16bfe791227c0e7edb56d7e/addons/godot_forge/handlers/script.gd) |
| [Godot Forge · code analysis and tests (gregario)](https://openenvision.github.io/GameMap/agents/godot-forge-code-quality/) | A focused MCP feedback layer for coding agents: Godot API lookup, GDScript and scene checks, actual editor diagnostics, and structured GUT/GdUnit4 test results. | [Source](https://github.com/gregario/godot-forge) · [Implementation](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts) |
| [Godot CLI · live scene authoring for coding agents](https://openenvision.github.io/GameMap/agents/godot-cli-live-editor/) | A Go command-line client and embedded Godot editor bridge that let coding agents write scripts, construct scenes, connect signals, run checks, and inspect runtime screenshots. | [Source](https://github.com/trunglqdev/Godot_CLI) · [Implementation](https://github.com/trunglqdev/Godot_CLI/blob/2e8f8636ae6c5f75071a4968df114186eacad40a/addon/godot_cli_bridge/plugin.gd) |
| [gda · Godot Automation for AI Agents](https://openenvision.github.io/GameMap/agents/gda-godot-agent/) | A CLI, reusable skill, and MCP surface for editing Godot content, validating projects, and collecting runtime tree, input, screenshots, logs, and performance evidence. | [Source](https://github.com/aigengame/godot-agent) · [Implementation](https://github.com/aigengame/godot-agent/tree/main/src/gda) |
| [agent2unity-cli](https://openenvision.github.io/GameMap/agents/agent2unity-cli/) | A .NET command-line client plus a C# Unity editor daemon that lets coding agents create and modify Unity assets through editor APIs and run compilation/test checks. | [Source](https://github.com/jkpp/agent2unity-cli) · [Implementation](https://github.com/jkpp/agent2unity-cli/tree/main/unity-plugin/Agent2Unity/Editor) |
| [Summer: Gemini CLI extension, engine MCP, and game skills](https://openenvision.github.io/GameMap/agents/summer-gemini-engine-extension/) | A publisher-maintained CLI/MCP integration for building scenes, writing scripts, playing games, reading errors, and taking screenshots in Summer Engine. It includes a genuine Gemini extension manifest, context file, skill packaging, and cross-agent setup code. | [Source](https://github.com/summerengine/summer) · [Implementation](https://github.com/summerengine/summer/blob/main/src/mcp/server.ts) |
| [Gemini Assistant: a Godot dock backed by the actual Gemini CLI](https://openenvision.github.io/GameMap/agents/gemini-cli-godot-dock-bridge/) | A small community Godot editor plugin that sends prompts from a dock to a Python subprocess, invokes the installed gemini command, and handles returned file/folder creation instructions. Its code confirms a CLI integration rather than a direct Gemini API chat wrapper. | [Source](https://github.com/AlexonMorris/gemini_assistant_godot_plugin) · [Implementation](https://github.com/AlexonMorris/gemini_assistant_godot_plugin/blob/main/gemini_backend.py) |

</details>

<details>
<summary>Development & validation workflows · 4</summary>

| Toolkit | Purpose | Original sources & code |
| --- | --- | --- |
| [Codex · official browser-game build and playtest workflow](https://openenvision.github.io/GameMap/agents/codex-official-browser-game-workflow/) | OpenAI’s game-development workflow connects a written game plan, project instructions, generated assets, and live browser playtesting. | [Source](https://learn.chatgpt.com/use-cases/browser-games) · [Instructions](https://github.com/openai/skills/blob/main/skills/.curated/playwright-interactive/SKILL.md) |
| [Everything Game Dev Code · multi-agent game workflow](https://openenvision.github.io/GameMap/agents/everything-game-dev-code/) | A shared game-development workflow with engine-specific rules, coding-agent adapters, implementation and review commands, validation scripts, and complete sample game sources. | [Source](https://github.com/MRCalderon3D/everything-game-dev-code) · [Code & instructions](https://github.com/MRCalderon3D/everything-game-dev-code/tree/1d83212e5084fe3b8000a8ae3c62bf972ad19f78/samples/LosRenacidos_Claude/src) |
| [Unreal Engine MCP for Codex · Community Skill and Runners](https://openenvision.github.io/GameMap/agents/unreal-mcp-codex-runners/) | A community Codex adaptation of Epic's Unreal MCP workflow, with concrete command-line helpers for environment probes, automation tests, Python commandlets, builds, and smoke cooks. | [Source](https://github.com/WildCake/unreal-engine-mcp-codex) · [Code & instructions](https://github.com/WildCake/unreal-engine-mcp-codex/tree/main/skills/unreal-engine-mcp-codex/scripts) |
| [Aider: an official Pong build transcript with real code edits](https://openenvision.github.io/GameMap/agents/aider-pong-game-editing-transcript/) | Aider’s own example records building Pong and then changing paddle colors, size, and ball behavior. It exposes the actual edit blocks and applied Git commits, making the incremental coding workflow inspectable rather than presenting an unexplained final screenshot. | [Source](https://aider.chat/examples/pong.html) · [Instructions](https://github.com/Aider-AI/aider/blob/main/aider/website/examples/pong.md) |

</details>

<details>
<summary>Development frameworks · 4</summary>

| Toolkit | Purpose | Original sources & code |
| --- | --- | --- |
| [Claude Code Game Toolkit · Canvas engine and templates](https://openenvision.github.io/GameMap/agents/claude-game-toolkit/) | Combines Claude game-development commands and domain skills with a small JavaScript engine, playable genre templates, and examples that can be inspected as real code. | [Source](https://github.com/hanifwdyt/claude-code-game-toolkit) · [Code & instructions](https://github.com/hanifwdyt/claude-code-game-toolkit/blob/e002fdf2aaf16c0d84762b632ec8c2526399b532/lib/core/engine.js) |
| [Codex Game Studio · local CLI and studio template](https://openenvision.github.io/GameMap/agents/codex-game-studio-cli/) | A Codex-native workflow CLI with tracked agent roles, reusable skills, engine reference packs, project state, task orchestration, and validation. | [Source](https://github.com/merlinhu1/codex-game-studio) · [Code & instructions](https://github.com/merlinhu1/codex-game-studio/blob/main/src/cli.ts) |
| [Tea Leaves · Claude Code Godot verification harness](https://openenvision.github.io/GameMap/agents/tea-leaves-game-harness/) | A reusable Godot project substrate that gives Claude Code runtime state, screenshots, simulated input, scene validation, and tests while it writes and repairs game code. | [Source](https://github.com/cleak/tea-leaves) · [Implementation](https://github.com/cleak/tea-leaves/blob/b465c6bdf2c283a16eaa805c5f5f4f21c1f05cc8/game/DevTools.cs) |
| [Godot Agent Loop](https://openenvision.github.io/GameMap/agents/godot-agent-loop/) | A Godot build–run–observe–playtest–verify loop with runtime/editor bridge code, reusable skills, and retained execution evidence. | [Source](https://github.com/beremaran/godot-agent-loop) · [Code & instructions](https://github.com/beremaran/godot-agent-loop/tree/main/src) |

</details>

<details>
<summary>Development examples with code · 2</summary>

| Toolkit | Purpose | Original sources & code |
| --- | --- | --- |
| [Cloud Crush: Google’s Gemini CLI game source and codelab](https://openenvision.github.io/GameMap/agents/gemini-cli-cloud-crush-source/) | Google publishes a complete match-3 game explicitly attributed to Gemini CLI, alongside a codelab covering plan mode, model steering, browser adaptation, testing, and subagents. The repository includes the resulting game rather than only instructions to generate one. | [Source](https://codelabs.developers.google.com/next26/gemini-cli-match3-golang) · [Implementation](https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang) |
| [Dinosaur Game Offline: a Gemini CLI-assisted source example](https://openenvision.github.io/GameMap/agents/gemini-cli-dinosaur-source/) | A small offline dinosaur runner whose creator explicitly describes Gemini CLI assistance with scaffolding, game logic, debugging, and improvements. It supplies concrete game code and committed images and sounds, with no generation API needed to play. | [Source](https://github.com/tonidevvn/dinosaur-game-offline) · [Implementation](https://github.com/tonidevvn/dinosaur-game-offline/blob/main/script.js) |

</details>

<details>
<summary>Evaluation & benchmarks · 2</summary>

| Toolkit | Purpose | Original sources & code |
| --- | --- | --- |
| [GameLogicBench](https://openenvision.github.io/GameMap/agents/gamelogicbench/) | A coding-agent benchmark of 72 gameplay-logic tasks whose deterministic Godot evaluators check observable state at each simulation tick rather than grading agent-written claims. | [Source](https://github.com/NJU-LINK/GameLogicBench) · [Implementation](https://github.com/NJU-LINK/GameLogicBench/tree/main/geb) |
| [GameCraft-Bench](https://openenvision.github.io/GameMap/agents/gamecraft-bench/) | An end-to-end game-generation benchmark with 140 tasks across 15 families, runnable Godot workspaces, replayable input traces, screen recording, and hidden visual/gameplay rubrics. | [Source](https://github.com/FreedomIntelligence/gamecraft-bench) · [Implementation](https://github.com/FreedomIntelligence/gamecraft-bench/tree/main/gamecraft_bench) |

</details>

<a id="examples"></a>

## Playable games, official foundations and discovery collections

88 games with creator-documented AI involvement, plus three official foundation projects. Each entry connects the game’s context, gameplay and source; AI attribution follows the creator’s evidence.

**Play** opens a browser game; **Download** opens a downloadable release. **Complete project** identifies the game project itself. Build logs, tutorials, prompts and author notes document how the project was made; when that URL already appears under play or source, it is linked once.

<details>
<summary>2D games · 51</summary>

| Game | Gameplay & technology | Play, source & development notes |
| --- | --- | --- |
| [Katana Kitsune: Prototype](https://openenvision.github.io/GameMap/examples/katana-kitsune-godot/) | Choose a kitsune fighter and face yokai in an isometric action roguelike with katana combat, stamina, pickups and successive dungeon floors. The silent prototype supports local multiplayer, with additional party systems documented in the current source.<br>Godot 4.7 · GDScript · 2D / GL Compatibility | [Play](https://9-k9.itch.io/katanakitsune) · [Complete project](https://github.com/9-K9/KatanaKitsune) · [Build log](https://github.com/9-K9/KatanaKitsune#readme) |
| [Overexposed](https://openenvision.github.io/GameMap/examples/overexposed-ai/) | Guide a rising performer through a year of career choices in a card-based fame simulation. Play cards to build craft, money and attention while three newspapers react and excessive heat turns into scandals.<br>DOM/CSS + SVG · React UI | [Play](https://eg30.itch.io/overexposed) · [Complete project](https://github.com/zsh56609/overexposed) · [Quickstart](https://github.com/zsh56609/overexposed#readme) |
| [Minimal Rogue](https://openenvision.github.io/GameMap/examples/minimal-rogue-claude/) | Explore a monochrome dungeon, break blocks, manage stamina and equipment, and descend through an ASCII-style roguelike with English and Japanese interfaces.<br>Canvas 2D · Vanilla JavaScript · HTML/CSS UI | [Play](https://hirotaka-adachi.itch.io/minimal-rogue) · [Complete project](https://github.com/HirotakaAdachi/Rogue/tree/anonymous-release) |
| [Word Rain](https://openenvision.github.io/GameMap/examples/word-rain-chatgpt/) | Move a basket to catch letters in the right order, complete shuffled words and survive red hazards. Shields, wildcards, perfect-word streaks and changing falling speed add decisions to the arcade spelling loop.<br>Canvas 2D · JavaScript · DOM/CSS UI | [Play](https://octopuskid.itch.io/word-rain) · [Complete project](https://github.com/octopuskid/word-rain) · [Quickstart](https://github.com/octopuskid/word-rain#run-the-game) |
| [8-Second Crew · 8초 도둑단](https://openenvision.github.io/GameMap/examples/eight-second-crew-codex/) | Record an eight-second route, replay it as a clone and cooperate with earlier selves to steal a key and escape. Nine stages introduce pressure plates, patrols and projectiles.<br>Canvas 2D · Vanilla JavaScript · HTML/CSS UI | [Play](https://sdj3261.github.io/openai_game_2026/) · [Complete project](https://github.com/sdj3261/openai_game_2026) · [Build log](https://github.com/sdj3261/openai_game_2026#codex와-함께-만든-과정) |
| [Fang the Fox · Game Boy Color](https://openenvision.github.io/GameMap/examples/fang-fox-gbc-claude/) | Explore floating islands, fight bosses, solve puzzles and follow a fox’s adventure as a real Game Boy Color game, playable through a browser emulator or a handheld ROM.<br>GBDK-2020 4.5 · C / hUGEDriver | [Play](https://tinybitadventures.com/games/fang-the-fox-gbc/) · [Complete project](https://github.com/TinyBitAdventures/fang-the-fox) · [Build log](https://tinybitadventures.com/fang-the-fox-on-the-game-boy-color/) |
| [Three Kingdoms: Hundred Heroes](https://openenvision.github.io/GameMap/examples/three-kingdoms-codex/) | Manage gold and grain, develop cities and command officers across fifteen strongholds. Choose Wei, Shu or Wu and compete with two computer factions to unify the map.<br>DOM/CSS + SVG · React | [Play](https://sanguo-jiangshan.vercel.app/) · [Complete project](https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/three-kingdoms) · [Build log](https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/three-kingdoms/CREATION.md) |
| [Clock Out Unseen](https://openenvision.github.io/GameMap/examples/clockout-unseen-codex/) | Sneak out of three offices before time expires, using furniture, coffee distractions and a temporary folder disguise to avoid patrol sightlines and reach an elevator.<br>Canvas 2D · React UI | [Play](https://www.bilibili.com/toy/clockout-unseen/index.html) · [Complete project](https://github.com/Ryan-fm/clockout-unseen) · [Build log](https://github.com/Ryan-fm/clockout-unseen/blob/main/docs/DEVELOPMENT.md) |
| [THUNDERFALL · Skyward Expedition](https://openenvision.github.io/GameMap/examples/thunderfall-astra/) | Choose one of three fighters and weave through five sectors of drifting bullets, lasers and bosses. Collect four weapon colors and pick upgrades between stages.<br>Canvas 2D · Vanilla JavaScript · Web Audio | [Play](https://thunderfall.vercel.app/) · [Complete project](https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/thunderfall) · [Prompt](https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/thunderfall/PROMPT.md) |
| [Fruit Ninja Dojo · One More Slice](https://openenvision.github.io/GameMap/examples/fruit-ninja-dojo-astra/) | Swipe through airborne fruit, chain slices and dodge bombs in an unofficial Fruit Ninja recreation with Classic, sixty-second Arcade and ninety-second Zen modes.<br>Canvas 2D · Vanilla JavaScript · HTML/CSS UI | [Play](https://fruit-ninja-dojo-20260905.yongqixue666.chatgpt.site/) · [Complete project](https://github.com/yongqixue99-hue/fruit-ninja-dojo) · [Author notes](https://linux.do/t/topic/2857340) |
| [Pixel Orchard · Memory Harvest](https://openenvision.github.io/GameMap/examples/pixel-orchard-astra/) | Turn over twelve seed packets to find six matching symbol pairs. Track moves, remember mismatches and reshuffle the garden for another short round.<br>DOM/CSS · Vanilla JavaScript | [Play](https://miaai-lab.github.io/GPT-6-Astra-100-HTML-Files/013-pixel-orchard.html) · [Complete project](https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/013-pixel-orchard.html) · [Prompt](https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/013-pixel-orchard.txt) |
| [IsoCity](https://openenvision.github.io/GameMap/examples/isocity-cursor/) | Build an isometric city with zoning, roads, rail, utilities and a simulated population. IsoCity is a complete Canvas-based browser game that its creator attributes to Cursor.<br>Custom Canvas 2D · TypeScript | [Play](https://iso-city.com) · [Complete project](https://github.com/amilich/isometric-city) · [Author notes](https://github.com/amilich/isometric-city#readme) |
| [morBreaker](https://openenvision.github.io/GameMap/examples/morbreaker-unity-claude/) | Clear ten brick-breaker levels with a paddle-controlled ball that accelerates on bounces, rising brick durability, and locally saved high scores.<br>Unity 6 · URP · C# | [Download](https://github.com/KingMordas/mor-breaker/releases/tag/v1.2.0) · [Complete project](https://github.com/KingMordas/mor-breaker) · [Author notes](https://github.com/KingMordas/mor-breaker#built-with-claude-code-) |
| [Silent Meridian](https://openenvision.github.io/GameMap/examples/silent-meridian-codex/) | Investigate an observatory trapped at 00:17, compare Present and Echo states, and solve thirteen connected puzzles across four chapters with a journal and optional hints.<br>Custom JavaScript · DOM/CSS · WebGL · Web Audio | [Play](https://silent-meridian.pjstack.dev/) · [Complete project](https://github.com/stackloomdev/silent-meridian) · [Build log](https://github.com/stackloomdev/silent-meridian/blob/main/docs/CREATION.md) |
| [Castle Clash Duel](https://openenvision.github.io/GameMap/examples/castle-clash-duel-claude/) | Recruit warriors and archers and fight a two-player tactical battle on a tilemap. This complete Phaser prototype pairs Claude Code implementation with Pixel Frog’s Tiny Swords artwork.<br>Phaser 3 · JavaScript | [Play](https://vibe-tiny-swords.vercel.app/) · [Complete project](https://github.com/chongdashu/phaserjs-tinyswords) · [Build log](https://github.com/chongdashu/phaserjs-tinyswords#implementation-with-agent-skills) |
| [Vibe Racer](https://openenvision.github.io/GameMap/examples/vibe-racer-opencode/) | A top-down time-trial racer with saved best laps, player and creator ghosts, mud surfaces, and a built-in track editor.<br>Pygame 2.6 · Python | [Download](https://github.com/Kecksdose/vibe_racer/archive/refs/heads/main.zip) · [Complete project](https://github.com/Kecksdose/vibe_racer) · [Author notes](https://github.com/Kecksdose/vibe_racer#development) |
| [Journey to the West: Three Borrowings of the Banana Fan](https://openenvision.github.io/GameMap/examples/novel-journey-to-west/) | A Chinese turn-based RPG with painted walking maps, quests, equipment, pets and command battles, adapted from the Banana Fan chapters of Journey to the West.<br>Custom Canvas 2D · JavaScript · DOM UI | [Play](https://xiyouji.vibecoco.ai/) · [Complete project](https://github.com/zenstory-ai/novel-to-game/tree/main/examples/journey-to-the-west) |
| [Clowder & Crest](https://openenvision.github.io/GameMap/examples/clowder-and-crest-agents/) | Recruit cats into a medieval guild, take jobs across fifteen minigame types, develop bonds and follow a seven-chapter campaign shaped by the guild’s reputation.<br>Phaser 3 · TypeScript | [Play](https://clowderandcrest.com/) · [Complete project](https://github.com/JacobStephens2/clowder-and-crest) · [Author notes](https://github.com/JacobStephens2/clowder-and-crest#built-with) |
| [Spirit of Kiro](https://openenvision.github.io/GameMap/examples/spirit-of-kiro/) | Find unusual items, combine or transform them on a workshop bench, and sell the results to an AI appraiser in an open-ended crafting game.<br>Custom Vue 3 · DOM/CSS sprites · TypeScript | [Download](https://github.com/kirodotdev/spirit-of-kiro/archive/refs/heads/main.zip) · [Complete project](https://github.com/kirodotdev/spirit-of-kiro) · [Tutorial](https://kiro.dev/docs/guides/learn-by-playing/) |
| [IsoCoaster](https://openenvision.github.io/GameMap/examples/isocoaster-cursor/) | Lay out a theme park with roller coasters, rides and guests. IsoCoaster is a separate playable game and route in the creator’s Cursor-assisted IsoCity repository.<br>Custom Canvas 2D · TypeScript | [Play](https://iso-coaster.com) · [Complete project](https://github.com/amilich/isometric-city) · [Author notes](https://github.com/amilich/isometric-city#readme) |
| [Sprout Quest](https://openenvision.github.io/GameMap/examples/sprout-quest-claude/) | Explore a small world, fight real-time arena battles, gather materials, craft gear and rebuild a village. Sprout Quest is a mobile-first adventure with a 2D world and live-rendered 3D characters and items.<br>Custom Canvas 2D + Three.js · TypeScript | [Play](https://aibengineering.github.io/sprout-quest/) · [Complete project](https://github.com/aibengineering/sprout-quest) · [Build log](https://github.com/aibengineering/sprout-quest#how-it-was-built) |
| [Arkanoid Neon](https://openenvision.github.io/GameMap/examples/arkanoid-neon-claude/) | Bounce the ball through eight neon brick layouts, collect power-ups and keep the rally alive as the stages accelerate. This complete browser game uses Canvas 2D and synthesized Web Audio.<br>Custom Canvas 2D · JavaScript · Web Audio | [Play](https://jack-c3l2w.github.io/arkanoid-neon/) · [Complete project](https://github.com/Jack-c3l2w/arkanoid-neon) · [Prompt](https://github.com/Jack-c3l2w/arkanoid-neon#readme) |
| [Action with AI: a Roo Code experiment](https://openenvision.github.io/GameMap/examples/roo-code-action/) | A small SVG top-down action prototype with mouse-aimed shooting, enemies and telegraphed attacks, paired with a detailed account of prompt-driven implementation.<br>React · SVG · TypeScript | [Play](https://action-with-ai.mizchi.workers.dev/) · [Complete project](https://github.com/mizchi/action-with-ai) · [Build log](https://zenn.dev/mizchi/articles/game-with-cline) |
| [Cloud Crush: Gemini CLI builds a match-3 game](https://openenvision.github.io/GameMap/examples/cloud-crush-gemini-cli/) | Match cloud-service icons on an eight-by-eight board, chase a timed high score, and create special Gemini gems. Google publishes the complete Go game alongside a detailed Gemini CLI codelab.<br>Ebitengine 2 · Go / WebAssembly | [Download](https://github.com/GoogleCloudPlatform/devrel-demos/blob/main/codelabs/gemini-cli/gemini-cli-match3-golang/README.md#local-development) · [Complete project](https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang) · [Tutorial](https://codelabs.developers.google.com/next26/gemini-cli-match3-golang) |
| [Dinosaur Game Offline: Gemini CLI-assisted runner](https://openenvision.github.io/GameMap/examples/dinosaur-offline-gemini-cli/) | Jump a pixel dinosaur over cacti and avoid flying obstacles while the score and speed increase. This small browser game includes its complete JavaScript implementation, sprites, and sound effects.<br>DOM / CSS · JavaScript | [Play](https://tonidevvn.github.io/dinosaur-game-offline/) · [Complete project](https://github.com/tonidevvn/dinosaur-game-offline) · [Author notes](https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped) |
| [Tetris built by an AI agent team](https://openenvision.github.io/GameMap/examples/claude-agent-team-tetris/) | A complete browser game with a published account of how three Claude Code teammates divided the rules, rendering, and controls.<br>Canvas 2D · JavaScript | [Play](https://caiguanhao.github.io/tetris/) · [Complete project](https://github.com/caiguanhao/tetris) · [Build log](https://github.com/caiguanhao/tetris#built-with-claude-code-agent-teams) |
| [Tower of Time: prompting a rewind mechanic](https://openenvision.github.io/GameMap/examples/tower-of-time-ai-build/) | A finished tower-defense game with time reversal and an extensive author-published prompt log covering mechanics, debugging, and polish.<br>Phaser 3 · TypeScript | [Play](https://m4v3k.itch.io/tower-of-time) · [Complete project](https://github.com/maciej-trebacz/tower-of-time-game) · [Prompt](https://github.com/maciej-trebacz/tower-of-time-game/blob/main/PROMPTS.md) |
| [Hajimi Defense: The Tuna Crisis](https://openenvision.github.io/GameMap/examples/opengame-tower-defense/) | A cat-themed tower defense published with its original generation prompt, live browser build, and exact game project.<br>Phaser 3 · TypeScript | [Play](https://yelonhu.github.io/OpenGame-landing-page/games/hajimi/index.html) · [Complete project](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_towerDefense_hajimi.zip) · [Prompt](https://github.com/leigest519/OpenGame#playable-demos) |
| [Marvel Avengers: Infinity Strike](https://openenvision.github.io/GameMap/examples/opengame-marvel-platformer/) | Study a generated action platformer with hero selection, combat skills, and a multi-stage brief.<br>Phaser 3 · TypeScript | [Play](https://yelonhu.github.io/OpenGame-landing-page/games/marvel/index.html) · [Complete project](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_platformer_marvel.zip) · [Prompt](https://github.com/leigest519/OpenGame#playable-demos) |
| [Harry Potter: Arithmancy Academy](https://openenvision.github.io/GameMap/examples/opengame-arithmancy-card-battle/) | A generated educational card battle turns math and science questions into spell casting and combo decisions.<br>Phaser 3 · TypeScript | [Play](https://yelonhu.github.io/OpenGame-landing-page/games/harryPotter/index.html) · [Complete project](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_uiHeavy_harryPotter.zip) · [Prompt](https://github.com/leigest519/OpenGame#playable-demos) |
| [Star Wars: Mandalorian Protocol](https://openenvision.github.io/GameMap/examples/opengame-mandalorian-shooter/) | Explore a generated top-down shooter through its original combat brief, playable build, and full project.<br>Phaser 3 · TypeScript | [Play](https://yelonhu.github.io/OpenGame-landing-page/games/starWars/index.html) · [Complete project](https://github.com/leigest519/OpenGame/raw/main/assets/downloads/demo_topDown_starWars.zip) · [Prompt](https://github.com/leigest519/OpenGame#playable-demos) |
| [GothicVania: Codex builds a platformer](https://openenvision.github.io/GameMap/examples/gothicvania-codex/) | A playable gothic platformer with enemies, combat, menus, music, and a detailed account of an iterative Codex workflow.<br>Phaser 3 · JavaScript | [Play](https://acatovic.github.io/gothicvania-codex-demo/) · [Complete project](https://github.com/acatovic/gothicvania-codex-demo) · [Build log](https://github.com/acatovic/gothicvania-codex-demo#the-story) |
| [Pixel Princess: a complete arcade campaign](https://openenvision.github.io/GameMap/examples/pixel-princess-claude/) | Cross six themed worlds, defeat a boss, and reach a finale in a browser platformer with touch controls and offline play.<br>KAPLAY · JavaScript | [Play](https://gameforprincess.vercel.app/) · [Complete project](https://github.com/VTvito/pixel-princess-platformer) · [Author notes](https://github.com/VTvito/pixel-princess-platformer#built-with-ai--how-this-was-made) |
| [Claude Code Tower Defense](https://openenvision.github.io/GameMap/examples/claude-tower-defense/) | Survive enemy waves, buy upgrades, and carry permanent progression between runs in a complete tower-defense game.<br>PixiJS · TypeScript / Next.js | [Play](https://claude-game-lilac.vercel.app/) · [Complete project](https://github.com/mdkess/claude-game) · [Author notes](https://github.com/mdkess/claude-game#built-with-ai) |
| [Cursor’s procedural platformer experiment](https://openenvision.github.io/GameMap/examples/cursor-procedural-platformer/) | A side-scrolling browser game with generated levels, collectibles, character upgrades, and optional multiplayer.<br>Canvas 2D · TypeScript | [Play](https://commjoen.github.io/generated-game-experiment/) · [Complete project](https://github.com/commjoen/generated-game-experiment) · [Build log](https://github.com/commjoen/generated-game-experiment/blob/main/.cursor/rules/conversation.md) |
| [Mini Snake: a Claude conversation game](https://openenvision.github.io/GameMap/examples/claude-mini-snake/) | Classic Snake with several food effects, particle feedback, local high scores, and touch input.<br>Canvas 2D · JavaScript | [Play](https://minisnake.vercel.app/) · [Complete project](https://github.com/BizShibe/claude-ai-mini-snake-game) · [Author notes](https://github.com/BizShibe/claude-ai-mini-snake-game#readme) |
| [Flux: Codex gravity-flip runner](https://openenvision.github.io/GameMap/examples/flux-codex-runner/) | Flip between the floor and ceiling to avoid obstacles in a compact reflex game with synthesized audio and selectable themes.<br>Canvas 2D · JavaScript | [Play](https://codex-hackathon-drab.vercel.app/) · [Complete project](https://github.com/scriptedbyshivam/codex-hackathon-2026) · [Build log](https://github.com/scriptedbyshivam/codex-hackathon-2026#readme) |
| [Bash Fighter: an agent-developed multiplayer brawler](https://openenvision.github.io/GameMap/examples/bash-fighter-agent/) | A browser platform fighter with online battles, bots, collapsing arenas, and a public client and match-server implementation.<br>PixiJS · TypeScript | [Play](https://bashfighter.com/) · [Complete project](https://github.com/Bash-Entertainment/bash-fighter) · [Author notes](https://github.com/Bash-Entertainment/bash-fighter#readme) |
| [Running Man: Claude Code meets PixelLab](https://openenvision.github.io/GameMap/examples/running-man-claude-pixellab/) | A one-button runner combining a scrolling pixel-art world, animated character states, obstacle patterns, and generated sound.<br>Canvas 2D · JavaScript | [Play](https://games.jdilig.me/games/running-man/) · [Complete project](https://github.com/balbonits/ai-browser-game-demos) · [Build log](https://github.com/balbonits/ai-browser-game-demos/blob/main/docs/games/running-man.md) |
| [Garden Match: agents build and review a puzzle game](https://openenvision.github.io/GameMap/examples/garden-match-agents/) | A gentle match-3 game with cascading tiles, a companion pet, saved progress, and a garden that grows as levels are cleared.<br>Phaser 3 · TypeScript | [Play](https://g.ismayday.mobi/garden/) · [Complete project](https://github.com/kevinchenkai/GameAI/tree/main/garden) · [Author notes](https://github.com/kevinchenkai/GameAI#readme) |
| [Dunkirk: an honestly documented AI-assisted shooter](https://openenvision.github.io/GameMap/examples/dunkirk-ai-assisted/) | A WWII-inspired vertical arcade shooter with a public Godot project and a precise breakdown of AI and manual contributions.<br>Godot 4.6 · GDScript | [Play](https://cheery-sable-f2dce2.netlify.app/dunkirk.html) · [Complete project](https://github.com/Ponloe/dunkirk-godot) · [Author notes](https://github.com/Ponloe/dunkirk-godot#ai-usage) |
| [Gravity Birds: Grok Bot directs Cursor](https://openenvision.github.io/GameMap/examples/gravity-birds-grok-cursor/) | A grid-based Godot puzzle where a growing bird collects fruit, falls under gravity, and reaches an exit, with undo and original levels.<br>Godot 4.3 · GDScript | [Download](https://github.com/az9713/grokbot-game-dev-demo#opening-in-godot-4) · [Complete project](https://github.com/az9713/grokbot-game-dev-demo) · [Build log](https://az9713.github.io/grokbot-game-dev-demo/gravity-birds-dev-journey.html) |
| [Quasar Saz: an unusual Claude Code experiment](https://openenvision.github.io/GameMap/examples/quasar-saz-claude/) | A musical arena shooter with six waves, an evolving instrument weapon, procedural visuals, synthesized audio, and a final boss.<br>Godot 4.6 .NET · C# | [Download](https://github.com/cleak/quasar-saz/releases/tag/v1.1) · [Complete project](https://github.com/cleak/quasar-saz) · [Build log](https://github.com/cleak/quasar-saz#how-it-was-made) |
| [Agent Arcade: Copilot builds desktop arcade games](https://openenvision.github.io/GameMap/examples/agent-arcade-copilot/) | A desktop arcade collection with a platformer and space shooters, wrapped in a transparent cross-platform overlay.<br>Phaser · TypeScript / Tauri | [Download](https://github.com/DanWahlin/agent-arcade/releases) · [Complete project](https://github.com/DanWahlin/agent-arcade) · [Build log](https://blog.codewithdan.com/building-agent-arcade-with-github-copilot-cli/) |
| [Space Shooter: a family Cursor experiment](https://openenvision.github.io/GameMap/examples/cursor-space-shooter/) | A complete top-down arcade shooter with enemy waves, health pickups, weapon upgrades, and procedural sound.<br>Canvas 2D · JavaScript | [Play](https://games.littleearth.dev/shooter/) · [Complete project](https://github.com/littleearth/vibe-coded-games/tree/main/shooter) · [Author notes](https://github.com/littleearth/vibe-coded-games#development) |
| [Destruction Derby Arena](https://openenvision.github.io/GameMap/examples/cursor-destruction-derby/) | A browser car-combat arena with local two-player controls, computer opponents, collisions, and vehicle damage.<br>Canvas 2D · JavaScript | [Play](https://games.littleearth.dev/demoderby/) · [Complete project](https://github.com/littleearth/vibe-coded-games/tree/main/demoderby) · [Author notes](https://github.com/littleearth/vibe-coded-games#destruction-derby-arena) |
| [Beach Kitty](https://openenvision.github.io/GameMap/examples/beach-kitty-ai-campaign/) | A cat-led Phaser campaign that combines running, platforming, shooting, and other arcade mechanics, with optional generated cat art.<br>Phaser 3 · React · TypeScript | [Play](https://www.beachkittygame.games/) · [Complete project](https://github.com/matthewod11-stack/CatRunner) · [Build log](https://github.com/matthewod11-stack/CatRunner/blob/main/PROGRESS.md) |
| [Pirate Fleet Commander](https://openenvision.github.io/GameMap/examples/gemini-pirate-fleet/) | Sail a flagship across a generated sea, fight other ships, and use recovered loot to expand and upgrade a fleet.<br>Canvas 2D · JavaScript | [Play](https://joeysalmons.github.io/vibe-coded-games/Pirate%20Fleet%20Commander%20v7.4.html) · [Complete project](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pirate%20Fleet%20Commander%20v7.4.html) · [Author notes](https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process) |
| [Kymograph](https://openenvision.github.io/GameMap/examples/gemini-kymograph/) | A CRT-styled deduction puzzle: observe a signal, infer its hidden transformation rules, and construct the counter-signal.<br>HTML / SVG · JavaScript · Web Audio | [Play](https://joeysalmons.github.io/vibe-coded-games/Kymograph%20v4.html) · [Complete project](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Kymograph%20v4.html) · [Author notes](https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process) |
| [Snake: Neon Arcade Edition](https://openenvision.github.io/GameMap/examples/deepseek-neon-snake/) | A neon Snake game with levels, changing speed and grid size, keyboard and touch input, and persistent high scores.<br>Canvas 2D · JavaScript | [Play](https://twitchcaptain.com/snake/) · [Complete project](https://github.com/TwitchCaptain/snake) |
| [Mini KSP: a Chinese rocket sandbox](https://openenvision.github.io/GameMap/examples/deepseek-mini-ksp/) | Build staged rockets, launch into orbit, unlock technology, and complete missions in a Chinese-language spaceflight sandbox.<br>Canvas 2D · JavaScript | [Download](https://github.com/BairlyEmei/mini-ksp/archive/refs/heads/main.zip) · [Complete project](https://github.com/BairlyEmei/mini-ksp) |

</details>

<details>
<summary>3D games · 37</summary>

| Game | Gameplay & technology | Play, source & development notes |
| --- | --- | --- |
| [Polar Icecapade](https://openenvision.github.io/GameMap/examples/polar-icecapade-claude/) | Slide across icy 3D arenas, use a three-hit melee combo to propel yourself forward, and fire projectiles that push you backward. Open gates and collect coins while confronting a rat regime in a short game-jam adventure.<br>Godot 4.6 · GDScript · 3D | [Play](https://evankurtzart.itch.io/polar-icecapade) · [Complete project](https://github.com/afenkurtz/Big-Mode-Game-Jam-2026/tree/main/slick) |
| [Core Business](https://openenvision.github.io/GameMap/examples/core-business-claude/) | Drill for minerals, manage fuel and hull condition, and spend earnings at surface shops in a non-commercial mining tech demo inspired by Motherload. Three.js renders the 2.5D world while Blender scripts produce its 3D assets.<br>Three.js · JavaScript | [Play](https://leichtbier.github.io/core-business/) · [Complete project](https://github.com/Leichtbier/core-business) · [Build log](https://github.com/Leichtbier/core-business#readme) |
| [Vibe Golf](https://openenvision.github.io/GameMap/examples/vibe-golf-bevy/) | Charge and release shots across a hilly, prop-filled 3D landscape while chasing moving duck targets in a small arcade golf sandbox.<br>Bevy 0.14 + Rapier 0.27 · Rust / WebAssembly | [Play](https://ahammer.github.io/vibe_golf/) · [Complete project](https://github.com/ahammer/vibe_golf) · [Author notes](https://www.reddit.com/r/ChatGPT/comments/1mnllsq/vibe_coded_a_3d_game_with_gpt_5_and_rust/) |
| [Pelican on a Bike](https://openenvision.github.io/GameMap/examples/pelican-bike-claude/) | Ride a helmeted pelican along a procedural coast, change lanes to catch fish, jump and unlock small achievements. The complete Three.js project includes its own character, bicycle, ocean, audio and day/night systems.<br>Three.js · JavaScript | [Play](https://claude-opus-5-5.riba2534.cn/) · [Complete project](https://github.com/riba2534/claude-opus-5-5-demo/tree/main/pelican-bike) · [Prompt](https://github.com/riba2534/claude-opus-5-5-demo#readme) |
| [Fishslop](https://openenvision.github.io/GameMap/examples/fishslop-claude/) | Pilot a bathyscaphe through a sunken reef, feed fish, collect the coins they drop and buy new residents or submarine parts. Sonar briefly reveals an otherwise invisible Veilfin.<br>Three.js · TypeScript · Web Audio | [Play](https://vasu-devs.github.io/FishSlop_Opus5.5/) · [Complete project](https://github.com/vasu-devs/FishSlop_Opus5.5) · [Quickstart](https://github.com/vasu-devs/FishSlop_Opus5.5#readme) |
| [Nagi Home](https://openenvision.github.io/GameMap/examples/nagi-home-cowork/) | Care for Nagi, a small crab living in a procedural home: place food, throw a ball, request furniture activities and follow a diary as daily needs change. It is a quiet life simulation with saved progress.<br>Three.js r169 · JavaScript | [Play](https://tanuu5.github.io/nagi-home/) · [Complete project](https://github.com/tanuu5/nagi-home) · [Author notes](https://github.com/tanuu5/nagi-home#readme) |
| [Butch Graves 3D](https://openenvision.github.io/GameMap/examples/butch-graves-j2me/) | Fight through five Halloween shooter episodes with bosses, keys, secrets and scripted cutscenes, rendered by a compact raycasting engine for Java feature phones.<br>Custom fixed-point raycaster · Java MIDP 2.0 / CLDC 1.0 | [Download](https://github.com/WollyMonjac/ButchGraves3D/tree/main/dist) · [Complete project](https://github.com/WollyMonjac/ButchGraves3D) |
| [Project Plateau: Proof Before Dark](https://openenvision.github.io/GameMap/examples/project-plateau/) | A first-person field-photography expedition inspired by The Lost World: frame prehistoric animals, manage four photographic plates, avoid threats and return to camp before daylight fades.<br>Three.js · WebGL2 | [Play](https://plateau.vibecoco.ai/) · [Complete project](https://github.com/zenstory-ai/novel-to-game/tree/main/examples/project-plateau) |
| [SURGE for Oinja](https://openenvision.github.io/GameMap/examples/surge-for-oinja-codex/) | Shape an electrical build while surviving mechanical swarms across two interactive maps. Automatic attacks leave movement, dodging, upgrades and facility restoration to the player.<br>Three.js · Rapier 3D · TypeScript | [Play](https://oinja-game.vercel.app/) · [Complete project](https://github.com/Olivia295/SURGE-for-Oinja) · [Author notes](https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/106) |
| [DEEP YELLOW](https://openenvision.github.io/GameMap/examples/deep-yellow-claude/) | Explore procedural Backrooms in a first-person, turn-based roguelike. Moving or waiting triggers combat, while equipment combinations and sanity shape each run.<br>Godot 4.6 · GDScript | [Play](https://aebrer.itch.io/deep-yellow) · [Complete project](https://github.com/aebrer/deep-yellow) |
| [Golden Hour Skatepark](https://openenvision.github.io/GameMap/examples/golden-hour-skatepark-cursor/) | Skate an original beachside park: carve transitions, ollie, flip, grind, manual, bail and recover. This complete third-person sandbox has transient trick combos and a changeable time of day, with no levels or persistent score.<br>Three.js · TypeScript | [Play](https://starknightt.github.io/skate-park/) · [Complete project](https://github.com/StarKnightt/skate-park) · [Build log](https://github.com/StarKnightt/skate-park/blob/main/docs/MAKING-OF.md) |
| [Pokemon Tactics](https://openenvision.github.io/GameMap/examples/pokemon-tactics-claude/) | Move Pokemon across an isometric battlefield, use elevation and aim area attacks without hitting allies. This playable tactical fan game combines a TypeScript simulation with 2D-HD sprites on Babylon.js terrain.<br>Babylon.js · TypeScript | [Play](https://kekel87.itch.io/pokemon-tactics) · [Complete project](https://github.com/kekel87/pokemon-tactics) · [Author notes](https://github.com/kekel87/pokemon-tactics#built-with-ai) |
| [Rhythm Master 3D](https://openenvision.github.io/GameMap/examples/rhythm-master-windsurf/) | A four-lane music game with generated synth tracks, difficulty settings, combos and a special mode, implemented as a single browser HTML file.<br>Three.js · Tone.js · JavaScript | [Download](https://github.com/frankjniu/rhythm-game/archive/refs/heads/main.zip) · [Complete project](https://github.com/frankjniu/rhythm-game) · [Build log](https://www.linkedin.com/posts/frankniu_if-youre-not-vibe-coding-with-claude-sonnet-activity-7304977951761039362-2xQe) |
| [Astra Floor](https://openenvision.github.io/GameMap/examples/astra-floor-ai/) | Fight six zombie waves and a final boss in a first-person industrial arena, managing ammunition, recoil, stamina and purchases between rounds.<br>Three.js · TypeScript (React UI) | [Play](https://astrafloor.berochlu.workers.dev/) · [Complete project](https://github.com/BEROCHLU/astrafloor) · [Author notes](https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/96) |
| [Mosswing](https://openenvision.github.io/GameMap/examples/mosswing-astra/) | Keep a small creature airborne with one-tap flaps, pass scrolling stone gaps and chase a higher score in a compact 3D browser game.<br>Three.js · JavaScript · WebGL | [Play](https://mosswing-quiet-flight.jack-514.chatgpt.site/) · [Complete project](https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing) · [Prompt](https://github.com/Ayi1337/gpt6-astra-one-shot-games#02--mosswing) |
| [Claude Dreaming](https://openenvision.github.io/GameMap/examples/claude-dreaming-godot/) | Walk from a pixel-art attic into playable 3D paintings: a dream garden, space flight, small planets, and community-built rooms.<br>Godot 4.7 · GDScript | [Play](https://rusty-production.itch.io/claude-dreaming) · [Complete project](https://github.com/moritzfh/claude-dreaming) · [Tutorial](https://github.com/moritzfh/claude-dreaming/blob/main/CONTRIBUTING.md) |
| [3D Sakura Crossing: an exploration prototype](https://openenvision.github.io/GameMap/examples/sakura-crossing-qwen/) | Explore a cel-shaded Japanese neighbourhood with a working railway crossing, residents, a lifting bridge, a drivable car, and a swimmable river.<br>Three.js · JavaScript | [Play](https://danymaniglie-cmyk.github.io/3d-sakura-crossing/) · [Complete project](https://github.com/danymaniglie-cmyk/3d-sakura-crossing) · [Build log](https://github.com/danymaniglie-cmyk/3d-sakura-crossing/blob/main/CARTOON.md) |
| [Magic Carpet Wizard · A Thousand Skies](https://openenvision.github.io/GameMap/examples/magic-carpet-wizard-astra/) | Fly a carpet over a tiny spherical world, thread scoring rings, cast three spells and face roaming enemies and bosses. Local ghost races let two players take turns.<br>Three.js · JavaScript | [Play](https://threapchills.github.io/MagicCarpetWizard/) · [Complete project](https://github.com/threapchills/MagicCarpetWizard) |
| [Supermarket Simulator](https://openenvision.github.io/GameMap/examples/supermarket-simulator-cursor/) | Manage a supermarket in first person: order goods, unpack deliveries, stock shelves and serve customers. The creator built this Unity experiment with Cursor and generated the 3D models with Hunyuan.<br>Unity 2023.2.6f1 · URP · C# | [Download](https://github.com/breineng/supermarket-simulator/releases/download/0.0.1/SupermarketSimulator.zip) · [Complete project](https://github.com/breineng/supermarket-simulator) · [Author notes](https://github.com/breineng/supermarket-simulator#description) |
| [Crown Defender TD 3D · Codex build](https://openenvision.github.io/GameMap/examples/crown-defender-codex/) | Control a hero under an isometric camera, defend a castle through thirty waves and choose upgrades to unlock a cosmetic crown.<br>Three.js · JavaScript | [Download](https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/archive/refs/heads/main.zip) · [Complete project](https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game) · [Build log](https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/COMPARISON.md) |
| [Three Quake: an AI-assisted Quake port](https://openenvision.github.io/GameMap/examples/three-quake-claude-port/) | Play Quake’s shareware episode in a Three.js browser port, and study how an existing shooter’s rendering and runtime were adapted with AI assistance.<br>Three.js · JavaScript | [Play](https://mrdoob.github.io/three-quake/) · [Complete project](https://github.com/mrdoob/three-quake) · [Author notes](https://github.com/mrdoob/three-quake#dev-log) |
| [Moonlight & Mayhem](https://openenvision.github.io/GameMap/examples/moonlight-mayhem-codex/) | A 3D museum heist made with Codex: rescue two raccoon crewmates, evade security, stack the crew, and steal the Golden Sardine.<br>Three.js · JavaScript | [Play](https://simonw.github.io/raccoon-heist-codex/) · [Complete project](https://github.com/simonw/raccoon-heist-codex/) · [Build log](https://simonwillison.net/2026/Aug/7/moonlight-mayhem/) |
| [TRON: EXONIX](https://openenvision.github.io/GameMap/examples/tron-exonix-claude/) | A neon 3D territory-capture game built through Claude Code, Godot MCP, Blender MCP, and generated assets, with human design and playtest feedback.<br>Godot 4.7 · GDScript | [Play](https://www.top3d.ai/demo/exonix-build/index.html) · [Complete project](https://github.com/witnesstodark/tron-exonix) · [Tutorial](https://www.top3d.ai/learn/claude-godot-mcp-3d-game) |
| [Raccoon Heist](https://openenvision.github.io/GameMap/examples/raccoon-heist-claude/) | A Claude-built 3D backyard caper: collect loot, avoid flashlight patrols and a guard dog, then bank your haul before dawn.<br>Three.js · JavaScript | [Play](https://simonw.github.io/raccoon-heist/) · [Complete project](https://github.com/simonw/raccoon-heist/) · [Build log](https://simonwillison.net/2026/Aug/5/raccoon-heist/) |
| [Turbo Kart Rally](https://openenvision.github.io/GameMap/examples/turbo-kart-rally-claude/) | A procedural kart racer with drifting, item battles, seven opponents, and a documented five-agent build.<br>Three.js · JavaScript | [Play](https://bridge-mind.github.io/turbo-kart-rally/) · [Complete project](https://github.com/bridge-mind/turbo-kart-rally) · [Prompt](https://github.com/bridge-mind/turbo-kart-rally#the-prompt-that-built-this) |
| [Long Wind](https://openenvision.github.io/GameMap/examples/long-wind-claude/) | A Chinese-language wuxia action game with three chapters, parries, bosses, generated characters, and retargeted animation.<br>Three.js · JavaScript | [Play](https://jbang2004.github.io/long-wind/) · [Complete project](https://github.com/jbang2004/long-wind) · [Build log](https://github.com/jbang2004/long-wind#%E5%AE%83%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E5%87%BA%E6%9D%A5%E7%9A%84) |
| [NOVA LANCER](https://openenvision.github.io/GameMap/examples/nova-lancer-claude/) | A rail shooter crossing ocean, canyon, and fortress environments before a mechanical sea-dragon boss.<br>Three.js · JavaScript | [Play](https://tanuu5.github.io/nova-lancer/) · [Complete project](https://github.com/tanuu5/nova-lancer) · [Build log](https://github.com/tanuu5/nova-lancer#%E5%88%B6%E4%BD%9C%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6) |
| [Orb Shooter](https://openenvision.github.io/GameMap/examples/orb-shooter-ai/) | A small first-person shooter combining agent-written mechanics with included warehouse, weapon, and enemy models.<br>Three.js · JavaScript | [Play](https://theredstapler.github.io/orb-shooter/) · [Complete project](https://github.com/theredstapler/orb-shooter) · [Author notes](https://github.com/theredstapler/orb-shooter#-the-vibe-coding-experiment) |
| [Operation Naptime · Operación Siesta](https://openenvision.github.io/GameMap/examples/operation-naptime-claude/) | A baby escapes a playpen and causes living-room chaos before being caught, with fully procedural visuals and physics.<br>Three.js + Rapier · JavaScript | [Play](https://operacion-siesta.vercel.app/) · [Complete project](https://github.com/alandaitch/operacion-siesta) · [Build log](https://github.com/alandaitch/operacion-siesta#how-it-was-built) |
| [Ombres](https://openenvision.github.io/GameMap/examples/ombres-claude/) | A 3D party game where giant birds paint territory with their shadows as the sun sets; phones can act as controllers.<br>React Three Fiber · TypeScript | [Play](https://ombres.deploy.breizhware.com/) · [Complete project](https://github.com/briossant/ombres) · [Build log](https://github.com/briossant/ombres#how-it-was-made) |
| [Dragon’s Reach](https://openenvision.github.io/GameMap/examples/dragons-reach-claude/) | A procedural dragon platformer with floating islands, gliding, flame combat, collectible eggs, and a final portal.<br>Three.js · JavaScript | [Play](https://jaydemks.github.io/ImADragon_onepromptcode_game/) · [Complete project](https://github.com/jaydemks/ImADragon_onepromptcode_game) · [Prompt](https://github.com/jaydemks/ImADragon_onepromptcode_game/blob/main/PROMPT.md) |
| [Vibe Jet](https://openenvision.github.io/GameMap/examples/vibe-jet-gemini/) | An arcade flying game with a documented Gemini 2.5 Pro prompting process and a Node/WebSocket multiplayer server.<br>Three.js · JavaScript | [Download](https://github.com/cedrickchee/vibe-jet/archive/refs/heads/main.zip) · [Complete project](https://github.com/cedrickchee/vibe-jet) · [Prompt](https://github.com/cedrickchee/vibe-jet#the-initial-prompt) |
| [Slide Rush](https://openenvision.github.io/GameMap/examples/slide-rush-opus/) | A mobile-friendly waterslide race against twelve rivals, with jumps, shortcuts, practice mode, and procedural characters.<br>Three.js · JavaScript | [Play](https://kjlkurt.github.io/waterslide-game-opus-5.5/) · [Complete project](https://github.com/KJLKurt/waterslide-game-opus-5.5) · [Author notes](https://github.com/KJLKurt/waterslide-game-opus-5.5#completion-data) |
| [The Tithe](https://openenvision.github.io/GameMap/examples/the-tithe-claude/) | A first-person horror adventure through a flooded cult house, with weapons, keyed progression, checkpoints, and a final escape.<br>Three.js · JavaScript | [Play](https://miguelsolorio.github.io/the-tithe/) · [Complete project](https://github.com/miguelsolorio/the-tithe) |
| [Michi-Neko · The Cat Philosopher’s Path](https://openenvision.github.io/GameMap/examples/michi-neko-ai/) | An early cat-exploration game in a Kyoto-inspired valley with NPC quests, weather, a tea house, and saved progression.<br>Three.js · JavaScript | [Play](https://c1t1zen1.github.io/Michi-Neko-The-Cat-Philosophers-Path/) · [Complete project](https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path) · [Author notes](https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path#-how-this-was-made) |
| [FragArena](https://openenvision.github.io/GameMap/examples/fragarena-copilot/) | A multiplayer space arena shooter with six-degree movement, bots, weapon pickups, radar, scoring, and respawning.<br>Three.js · JavaScript | [Download](https://github.com/jonnyleigh/fragarena/archive/refs/heads/main.zip) · [Complete project](https://github.com/jonnyleigh/fragarena) · [Prompt](https://github.com/jonnyleigh/fragarena/blob/main/Prompt.md) |
| [Midnight Pumpkin Hunt](https://openenvision.github.io/GameMap/examples/gemini-pumpkin-hunt/) | A first-person forest horror game: light five pumpkins while managing flashlight power, stamina, and a pursuing stalker.<br>Three.js · JavaScript | [Play](https://joeysalmons.github.io/vibe-coded-games/Pumpkin%20Hunt%20Horror%20Game%20v3.html) · [Complete project](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pumpkin%20Hunt%20Horror%20Game%20v3.html) · [Author notes](https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process) |

</details>

<details>
<summary>Official foundation projects · 3</summary>

These are existing official teaching games suited to agent-assisted explanation, modification and regression checks. Their sources do not identify them as AI-built examples.

| Foundation | Practice focus | Play, source & tutorial |
| --- | --- | --- |
| [Your first 2D game](https://openenvision.github.io/GameMap/examples/godot-2d-dodge/) | Dodge enemies, survive longer, and restart a complete small game. This official Godot project is a foundation for an AI-assisted workflow.<br>Godot · 2D | [Play](https://godotengine.github.io/godot-demo-projects/2d/dodge_the_creeps/) · [Complete project](https://github.com/godotengine/godot-demo-projects/tree/master/2d/dodge_the_creeps) · [Tutorial](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html) |
| [Take a browser shooter to mobile](https://openenvision.github.io/GameMap/examples/phaser-starshake/) | Play Starshake, a complete space shooter, then follow the official tutorial to adapt its controls and layout for mobile. This path extends an existing game.<br>Phaser · Browser / mobile | [Play](https://phaser.io/sandbox/y1pmMkDL) · [Complete project](https://github.com/phaserjs/phaser-by-example/tree/main/starshake) · [Tutorial](https://phaser.io/tutorials/bring-your-phaser-game-to-ios-and-android-with-capacitor) |
| [Make a playable 3D character game](https://openenvision.github.io/GameMap/examples/godot-3d-squash/) | Move a character, jump onto enemies, and replay after losing. This complete Godot game teaches interaction and animation in a small 3D arena.<br>Godot · 3D | [Play](https://godotengine.github.io/godot-demo-projects/3d/squash_the_creeps/) · [Complete project](https://github.com/godotengine/godot-demo-projects/tree/master/3d/squash_the_creeps) · [Tutorial](https://docs.godotengine.org/en/stable/getting_started/first_3d_game/index.html) |

</details>

<details>
<summary>Discover more games and development records · 6 collections</summary>

| Collection | Coverage & selection limits | Original entry point |
| --- | --- | --- |
| [Vibe Jam games](https://openenvision.github.io/GameMap/examples/#collection-vibe-jam-games) | Browse browser games from a jam requiring predominantly AI-written code. Participant attribution and public source availability still need checking per game. | [Browse](https://vibejam.com/) |
| [AI Browser Game Jam](https://openenvision.github.io/GameMap/examples/#collection-ai-browser-game-jams) | Find short browser games and creator tool or asset disclosures across the recurring AI Browser Game Jam. Submission pages do not guarantee complete public game source. | [Browse](https://itch.io/jam/ai-jam-5) |
| [Astra game-source collection](https://openenvision.github.io/GameMap/examples/#collection-astra-game-source-collection) | Discover genre-grouped games with playable builds, source links and creator evidence. Check individual creator records for the coding client, generation scope and runtime requirements. | [Browse](https://github.com/MartinDelophy/awesome-gpt-6-astra) |
| [Awesome AI-Built Games](https://openenvision.github.io/GameMap/examples/#collection-awesome-ai-built-games) | A broader community list across action, racing, adventure, strategy, puzzles, and arcade games. Source availability varies by project. | [Browse](https://github.com/lappemic/awesome-ai-built-games) |
| [Open Source AI Game Jam](https://openenvision.github.io/GameMap/examples/#collection-open-source-ai-game-jam) | Browse jam submissions using AI in code, assets, or gameplay. The jam name refers to AI tools; it does not guarantee every game publishes its source. | [Browse](https://itch.io/jam/open-source-ai-game-jam/entries) |
| [Claude community use cases](https://openenvision.github.io/GameMap/examples/#collection-claude-community-use-cases) | Discover creator demos and build accounts. This collection also includes films, tools, and experiments beyond games. | [Browse](https://github.com/coolbat/awesome-opus-5.5-usecase) |

</details>

<a id="showcase"></a>

## Showcase and visual evidence

29 demonstrations retain project sources, original recordings and stated scope. Open a title to view its presentation. Gameplay excerpts, asset turntables and world-model recordings demonstrate the visible portion; detail pages describe full-game and runtime limits.

<details>
<summary>Gameplay recordings · 11</summary>

| Showcase | Visible content | Creator & original sources |
| --- | --- | --- |
| [Moonlight & Mayhem · Museum heist](https://openenvision.github.io/GameMap/showcase/recording-moonlight-mayhem/) | Rescue a raccoon crewmate while avoiding a moving security patrol in a Three.js museum. | [Source](https://simonwillison.net/2026/Aug/7/moonlight-mayhem/) · [Recording](https://static.simonwillison.net/static/2026/raccoon-heist-codex-720p.mp4) |
| [Agent Arcade · Galaxy Blaster](https://openenvision.github.io/GameMap/showcase/recording-agent-arcade-galaxy/) | A Phaser space shooter plays in a transparent desktop overlay above an editor. | [Source](https://github.com/DanWahlin/agent-arcade/tree/59a4848187d3219770216acc9253a9e13143eac3/docs/images) · [Recording](https://raw.githubusercontent.com/DanWahlin/agent-arcade/59a4848187d3219770216acc9253a9e13143eac3/docs/images/agent-arcade-galaxy.mp4) |
| [Castle Clash · Prototype battle](https://openenvision.github.io/GameMap/showcase/recording-castle-clash/) | Recruit a squad and send animated Tiny Swords units toward the opposing castle. | [Source](https://github.com/chongdashu/phaserjs-tinyswords/blob/f59f1dca8bf461227c9b5d856764e1e90d8b8e90/README.md) · [Recording](https://raw.githubusercontent.com/chongdashu/phaserjs-tinyswords/f59f1dca8bf461227c9b5d856764e1e90d8b8e90/docs/preview.gif) |
| [Raccoon Heist · Loot after dark](https://openenvision.github.io/GameMap/showcase/recording-raccoon-heist/) | Collect loot under sweeping flashlight patrols in a Claude-built Three.js backyard caper. | [Source](https://simonwillison.net/2026/Aug/5/raccoon-heist/) · [Recording](https://static.simonwillison.net/static/2026/raccoon-heist-720p.mp4) |
| [Pokemon Tactics · Isometric battle](https://openenvision.github.io/GameMap/showcase/recording-pokemon-tactics/) | Position a team and target attacks across a 2D-HD tactical battlefield rendered with Babylon.js. | [Source](https://github.com/kekel87/pokemon-tactics/blob/c9bced18f18b1a5c37e8828b68f1cedf902dbd54/README.md) · [Recording](https://raw.githubusercontent.com/kekel87/pokemon-tactics/c9bced18f18b1a5c37e8828b68f1cedf902dbd54/docs/images/demo.gif) |
| [Sakura Crossing · A walkable neighbourhood](https://openenvision.github.io/GameMap/showcase/recording-sakura-crossing/) | Walk beside an animated railway crossing in a cel-shaded Japanese neighbourhood generated with a local Qwen model. | [Source](https://github.com/danymaniglie-cmyk/3d-sakura-crossing/blob/2e7b62361f2a22999185be8f899693ebdfb8bbf6/README.md) · [Recording](https://raw.githubusercontent.com/danymaniglie-cmyk/3d-sakura-crossing/2e7b62361f2a22999185be8f899693ebdfb8bbf6/docs/anteprima.gif) |
| [OpenGame · Portal runner](https://openenvision.github.io/GameMap/showcase/opengame-portal/) | Jump, fight, and move through a generated pixel platformer. | [Source](https://yelonhu.github.io/OpenGame-landing-page/) · [Recording](https://yelonhu.github.io/OpenGame-landing-page/hero/marvel_1.mp4) |
| [OpenGame · Space-station skirmish](https://openenvision.github.io/GameMap/showcase/opengame-skirmish/) | Move, aim, and dodge in a generated top-down action game. | [Source](https://yelonhu.github.io/OpenGame-landing-page/) · [Recording](https://raw.githubusercontent.com/yelonhu/OpenGame-landing-page/main/public/hero/starWars.mp4) |
| [3AGameFactory · Courtyard combat](https://openenvision.github.io/GameMap/showcase/gamefactory-ue5-combat/) | Close the distance, trade attacks, and watch health react in an Unreal Engine 5 game. | [Source](https://github.com/OpenDCAI/GameFactory-3A#ue5) · [Recording](https://github.com/user-attachments/assets/810ced06-7c0e-4e74-a0f5-588c9cad8d1e) |
| [3AGameFactory · Village quest](https://openenvision.github.io/GameMap/showcase/gamefactory-ue5-rpg/) | Run through a stylized village, collect treasure, and watch the quest progress. | [Source](https://github.com/OpenDCAI/GameFactory-3A#ue5) · [Recording](https://github.com/user-attachments/assets/8f90cc59-548a-4cd9-a3a8-7d8c4e2e412b) |
| [OpenGame · Hajimi Defense: The Tuna Crisis](https://openenvision.github.io/GameMap/showcase/recording-opengame/) | An official OpenGame demo showing a generated pixel game in action. | [Source](https://yelonhu.github.io/OpenGame-landing-page/#demo) · [Recording](https://yelonhu.github.io/OpenGame-landing-page/demos/hajimi.mp4) |

</details>

<details>
<summary>World models & neural rendering · 8</summary>

| Showcase | Visible content | Creator & original sources |
| --- | --- | --- |
| [Code World Model · Cloud-sea harbor](https://openenvision.github.io/GameMap/showcase/recording-cwm-brain-cloud-harbor/) | An official recording of a wind-skiff navigating a cloud-sea harbor, with movement controls visible. | [Source](https://buaacyw.github.io/cwm/) · [Recording](https://huggingface.co/datasets/NTU-yiwen/code-world-model-project-page-videos/resolve/main/gallery_final/rgb/002.mp4) |
| [Genie 3 · Festival-of-lights jetski](https://openenvision.github.io/GameMap/showcase/recording-genie3-jetski/) | Google DeepMind records a controllable jetski world at night, with directional inputs shown over the generated water and lanterns. | [Source](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) · [Recording](https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/media/genie_modelling_physical_properties_2_Qvyu3BP.mp4) |
| [DIAMOND · A diffusion model of CS:GO](https://openenvision.github.io/GameMap/showcase/recording-diamond-csgo/) | An author-recorded keyboard-and-mouse session inside a diffusion world model trained on CS:GO footage. | [Source](https://diamond-wm.github.io/) · [Recording](https://diamond-wm.github.io/static/videos/8.mp4) |
| [SolarWM · Camera-controlled worlds](https://openenvision.github.io/GameMap/showcase/recording-solarwm-overview/) | The official overview shows camera-controlled movement across generated snowy villages, landscapes, ruins, and other worlds. | [Source](https://junchao-cs.github.io/SolarWM-Web/) · [Recording](https://media.githubusercontent.com/media/Junchao-cs/SolarWM-Web/main/assets/demo.mp4?v=f434755) |
| [StreamRender-H3 · Engine to neural render](https://openenvision.github.io/GameMap/showcase/streamrender-car/) | Compare the engine input with its matching neural render, in sync. | [Source](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/) · [Recording](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Sol-Engine/StreamRender-H3/blog-assets/engine-vs-render-single-car.mp4) |
| [StreamRender-H3 · Engine → neural render](https://openenvision.github.io/GameMap/showcase/recording-streamrender-h3/) | An official synchronized comparison of engine output on the left and streaming neural rendering on the right. Both views are shown in full. | [Source](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/) · [Recording](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Sol-Engine/StreamRender-H3/blog-assets/engine-vs-render-single-car.mp4) |
| [SolarRenderer · Voxel world, reimagined](https://openenvision.github.io/GameMap/showcase/solar-voxel/) | A simple voxel scene becomes a richly styled, moving world. | [Source](https://enderfga.cn/SolarRenderer/) · [Recording](https://enderfga.cn/SolarRenderer/media/gallery/mat_voxel__westeros/render.mp4) |
| [SolarRenderer · Official film](https://openenvision.github.io/GameMap/showcase/recording-solarrenderer/) | Preview the official cyberpunk street scene, then watch the full film for more examples of structural control and generative rendering. | [Source](https://enderfga.cn/SolarRenderer/) · [Recording](https://enderfga.cn/SolarRenderer/media/film/solarrenderer-film.mp4) |

</details>

<details>
<summary>Scenes & spaces · 4</summary>

| Showcase | Visible content | Creator & original sources |
| --- | --- | --- |
| [Marble · A blue diner in 3D](https://openenvision.github.io/GameMap/showcase/recording-marble-blue-diner/) | World Labs tours a generated blue diner, showing a persistent 3D interior created from a text prompt. | [Source](https://www.worldlabs.ai/blog/marble-world-model) · [Recording](https://wlt-ai-cdn.art/videos/2025-11-12-clean-720p-24crf/t2w-blue-diner.mp4) |
| [Video2Game · Interacting in a reconstructed garden](https://openenvision.github.io/GameMap/showcase/recording-video2game-garden/) | An official browser recording shows movement and a ball-shooting interaction in a garden reconstructed from video. | [Source](https://video2game.github.io/) · [Recording](https://video2game.github.io/src/video2game/demo/garden_shoot1.mp4) |
| [WonderWorld · Extending a cathedral scene](https://openenvision.github.io/GameMap/showcase/recording-wonderworld-cathedral/) | The official split view shows a cathedral scene expanding as the user chooses new content and a camera direction. | [Source](https://kovenyu.com/wonderworld/) · [Recording](https://kovenyu.com/wonderworld/interactive_converted_60fps_trimmed_cropped/cathedral_2_interactive_compressed_60fps_trimmed_cropped.mp4) |
| [Holodeck · A room from a prompt](https://openenvision.github.io/GameMap/showcase/recording-holodeck/) | An author-published tour of a generated bohemian living room. | [Source](https://yueyang.ai/holodeck/) · [Recording](https://yueyang.ai/holodeck/static/videos/a_bohemian_style_living_room_w%7C1%7C0%7Csunny_vondelpark_4k%7C1.0%7C50.0%7C360%7C16%7C30%7C10%7CCYCLES_video_compressed.mp4) |

</details>

<details>
<summary>Assets & animation · 4</summary>

| Showcase | Visible content | Creator & original sources |
| --- | --- | --- |
| [Hunyuan3D 2.0 · Generated textured assets](https://openenvision.github.io/GameMap/showcase/recording-hunyuan3d-assets/) | Author-published rotating examples of textured 3D characters produced with Hunyuan3D 2.0’s shape-and-texture pipeline. | [Source](https://github.com/Tencent-Hunyuan/Hunyuan3D-2#performance) · [Recording](https://raw.githubusercontent.com/Tencent-Hunyuan/Hunyuan3D-2/main/assets/images/e2e-1.gif) |
| [TripoSR · Single-image 3D reconstruction](https://openenvision.github.io/GameMap/showcase/recording-triposr-assets/) | Compare five input images with the rotating reconstructed 3D objects in the official TripoSR teaser. The complete input and output rows remain visible. | [Source](https://github.com/VAST-AI-Research/TripoSR) · [Recording](https://raw.githubusercontent.com/VAST-AI-Research/TripoSR/main/figures/teaser800.gif) |
| [TRELLIS · 3D asset generation](https://openenvision.github.io/GameMap/showcase/recording-trellis/) | An official Microsoft Research showcase of generated 3D assets. Project materials are presented for academic and research use. | [Source](https://microsoft.github.io/TRELLIS/) · [Recording](https://microsoft.github.io/TRELLIS/assets/teaser.mp4) |
| [Infinigen · Articulated assets](https://openenvision.github.io/GameMap/showcase/recording-infinigen/) | An official showcase of articulated assets created through procedural generation. | [Source](https://infinigen.org/) · [Recording](https://infinigen.org/img/random_sample_articulated.mp4) |

</details>

<details>
<summary>Production workflows · 2</summary>

| Showcase | Visible content | Creator & original sources |
| --- | --- | --- |
| [AutoUE · Unreal Engine generation workflow](https://openenvision.github.io/GameMap/showcase/recording-autoue-workflow/) | The official demonstration follows an automated generation workflow inside the Unreal Engine editor. | [Source](https://github.com/Pluto156/AutoUE) · [Recording](https://raw.githubusercontent.com/Pluto156/AutoUE/main/assets/show.mp4) |
| [Agent Sprite Forge · Earlier 0.3 sprite workflow](https://openenvision.github.io/GameMap/showcase/recording-sprite-forge/) | An earlier 0.3 introduction shows the Ryo workflow from a still image through video animation to a keyed sprite strip. | [Source](https://github.com/0x0funky/agent-sprite-forge) · [Recording](https://raw.githubusercontent.com/0x0funky/agent-sprite-forge/HEAD/src/video2dsprite-ryo/intro.mp4) |

</details>

<a id="testing"></a>

## Testing resources and starter tasks

**36 resources and 3 starter tasks** for code changes, automated playtests, agent evaluation, and asset pipelines. Each website entry includes setup, proposed tasks, licenses, and limitations. These are source-reviewed references, not installation or runtime certifications.

### Three ways to begin

| Task | Starting resources | Action and success checkpoint |
| --- | --- | --- |
| [Change a working game](https://openenvision.github.io/GameMap/testing/#pack-change-a-game) | [Godot official demos](https://openenvision.github.io/GameMap/testing/godot-demos/) · [SuperTux](https://openenvision.github.io/GameMap/testing/supertux/) · [The Battle for Wesnoth](https://openenvision.github.io/GameMap/testing/wesnoth/) | Build the baseline, change one mechanic, then replay the same input sequence. The baseline and changed builds both launch. A fixed input replay shows the requested mechanic change and a working restart. |
| [Give an agent a goal](https://openenvision.github.io/GameMap/testing/#pack-give-an-agent-a-goal) | [MiniGrid / BabyAI](https://openenvision.github.io/GameMap/testing/minigrid/) · [Crafter](https://openenvision.github.io/GameMap/testing/crafter/) · [ViZDoom](https://openenvision.github.io/GameMap/testing/vizdoom/) | Fix the task, seed, action rate, observation source, and episode budget. A completed baseline episode records the seed, observation source, action budget, terminal reason, and success result. |
| [Move an asset through the pipeline](https://openenvision.github.io/GameMap/testing/#pack-asset-through-pipeline) | [Kenney Animated Characters](https://openenvision.github.io/GameMap/testing/kenney-animated-characters/) · [Quaternius Universal Animation Library](https://openenvision.github.io/GameMap/testing/quaternius-ual/) · [100STYLE](https://openenvision.github.io/GameMap/testing/100style/) | Import a character, map its skeleton, and play a licensed motion clip. One character plays one imported clip with correct scale, textures, and loop behavior. Character and motion licenses are recorded separately. |

<details>
<summary><strong>Games and engine projects · 13 resources</strong></summary>

| Resource / primary source | Purpose and stack | Terms / details |
| --- | --- | --- |
| [Godot official demos](https://github.com/godotengine/godot-demo-projects) | Small, separate engine projects for character control, physics, navigation, networking, animation and import/export regression tests.<br>Godot / GDScript / C# | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/godot-demos/) |
| [SuperTux](https://github.com/SuperTux/supertux) | A complete platform game for jump timing, collision, level editing and visual/input regression tasks in a substantial native codebase.<br>C++ / CMake / 2D platformer | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/supertux/) |
| [Endless Sky](https://github.com/endless-sky/endless-sky) | A complete space game for navigation, combat, trading and long-horizon mission planning, with editable data and a plugin system.<br>C++ / space exploration / data-driven content | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/endless-sky/) |
| [DDraceNetwork (DDNet)](https://github.com/ddnet/ddnet) | A cooperative platform game with grappling, precise movement, maps and replay support for input timing and multiplayer regression tasks.<br>C++ / CMake / networked precision platformer | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/ddnet/) |
| [The Battle for Wesnoth](https://github.com/wesnoth/wesnoth) | A turn-based tactics game with editable scenarios and scripting, suitable for pathfinding, tactical decisions, dialogue and rules changes.<br>C++ / Lua / Wesnoth Markup Language | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/wesnoth/) |
| [Mindustry](https://github.com/Anuken/Mindustry) | A logistics and defense game for production chains, construction, resource planning and client/server changes in a real game project.<br>Java / Gradle / factory and tower defense | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/mindustry/) |
| [OpenTTD](https://github.com/OpenTTD/OpenTTD) | A transport simulation for route and rail construction, economic planning, pathfinding, saves and multiplayer synchronization.<br>C++ / isometric transport simulation | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/openttd/) |
| [SuperTuxKart](https://github.com/supertuxkart/stk-code) | A full racing game for visual steering, continuous control, physics regressions, tracks, karts and model/material pipeline tests.<br>C++ / 3D kart racing / Blender asset workflow | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/supertuxkart/) |
| [Luanti + Minetest Game](https://github.com/luanti-org/luanti) | An editable voxel sandbox for first-person navigation, digging, placement, crafting and Lua entity, texture and world changes.<br>C++ Luanti engine / Lua games and mods / voxel worlds | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/luanti-minetest-game/) |
| [Red Eclipse](https://github.com/redeclipse/base) | A first-person arena game for aim, navigation, parkour, bot scenarios, real-time map editing and native client/server changes.<br>C++ / first-person arena shooter / map editor | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/red-eclipse/) |
| [Zero-K](https://github.com/ZeroK-RTS/Zero-K) | An RTS for resource planning, construction, unit control, terrain interaction and multi-unit tactical decisions, with editable Lua game logic.<br>Lua game logic / Spring-derived RTS engine / large-scale strategy | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/zero-k/) |
| [Unity BoatAttack](https://github.com/Unity-Technologies/BoatAttack) | A complete boat-racing sample for buoyancy, waypoint AI, camera control, water rendering, shaders and asset-loading regression tests.<br>Unity / C# / Universal Render Pipeline | Engine-specific terms · [Details](https://openenvision.github.io/GameMap/testing/unity-boatattack/) |
| [Unreal Engine Lyra Starter Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) | An official multiplayer starter game for ability systems, input, game-feature plugins, character animation and larger engine integration tasks.<br>Unreal Engine / C++ / Blueprint / Gameplay Ability System | Engine-specific terms · [Details](https://openenvision.github.io/GameMap/testing/unreal-lyra/) |

</details>

<details>
<summary><strong>AI evaluation environments · 7 resources</strong></summary>

| Resource / primary source | Purpose and stack | Terms / details |
| --- | --- | --- |
| [MiniGrid / BabyAI](https://github.com/Farama-Foundation/Minigrid) | Small navigation and language-grounding tasks with keys, doors, objects and partial observations. A practical first baseline for repeatable planning tests.<br>Python · Gymnasium · discrete grid worlds | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/minigrid/) |
| [Crafter](https://github.com/danijar/crafter) | A compact survival world combining exploration, health, gathering, construction and crafting. Achievement progress exposes different strengths of a playing agent.<br>Python · Gym interface · pixel survival | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/crafter/) |
| [Craftax](https://github.com/MichaelTMatthews/Craftax) | A survival and crafting environment with vectorized simulation. Useful for longer action dependencies and comparing pixel-based versus symbolic policies.<br>Python · JAX · gymnax-style API | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/craftax/) |
| [ViZDoom](https://github.com/Farama-Foundation/ViZDoom) | First-person environments for aiming, navigation, combat and memory, with programmable actions and scenario controls. The perspective is 3D; the renderer uses Doom-style technology.<br>Python / C++ · Doom / ZDoom · Gymnasium | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/vizdoom/) |
| [NetHack Learning Environment](https://github.com/NetHack-LE/nle) | A demanding roguelike interface for exploration, inventory, tactical choices and long-term planning. Use the maintained NetHack-LE organization rather than the archived Facebook repository.<br>Python · C / C++ · Gymnasium · NetHack | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/nethack-learning-environment/) |
| [Godot RL Agents](https://github.com/edbeeching/godot_rl_agents) | Connects editable Godot games to Python agents. Useful for changing gameplay, exposing observations and evaluating NPC control in a scene you own.<br>Godot 4 · Python · game sensors and action bridge | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/godot-rl-agents/) |
| [Unity ML-Agents](https://github.com/Unity-Technologies/ml-agents) | An official toolkit and example scenes for physics, visual control, cooperation and competition. It can expose custom Unity scenes to Python policies and automated tests.<br>Unity · C# · Python · sensors and agent actions | Engine-specific terms · [Details](https://openenvision.github.io/GameMap/testing/unity-ml-agents/) |

</details>

<details>
<summary><strong>Asset libraries · 7 resources</strong></summary>

| Resource / primary source | Purpose and stack | Terms / details |
| --- | --- | --- |
| [Kenney](https://kenney.nl/assets) | A practical CC0 starting point for small test scenes, asset replacement, collision and UI regressions.<br>Sprites, tiles, UI, audio and 3D model packs | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/kenney/) |
| [Quaternius](https://quaternius.com/) | CC0 models and characters for repeatable import, material, collision and animation tests.<br>Low-poly environments, characters and animated model packs | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/quaternius/) |
| [Poly Haven](https://polyhaven.com/) | CC0 realistic assets for material, lighting, dependency and visual-domain regression tests.<br>PBR textures, HDRIs, 3D models and a public download API | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/poly-haven/) |
| [ambientCG](https://ambientcg.com/) | A CC0 source for texture-channel, terrain, lighting and material-resolution test fixtures.<br>PBR materials, decals, atlases, HDRIs, terrain and models | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/ambientcg/) |
| [OpenGameArt](https://opengameart.org/) | Broad community coverage for 2D content tests, with licensing recorded separately for every item.<br>Community sprites, tiles, models, music and sound effects | Mixed code / asset licenses · [Details](https://openenvision.github.io/GameMap/testing/open-game-art/) |
| [Fab](https://www.fab.com/) | Useful import test content when the exact listing, license and AI-use fields fit the intended task.<br>Marketplace models, materials, animation and engine-specific content | Permission needs confirmation · [Details](https://openenvision.github.io/GameMap/testing/fab/) |
| [Unity Asset Store](https://assetstore.unity.com/) | Package and import regression fixtures when provider rights and the permitted automation route are established.<br>Unity packages, characters, animation, environments and editor tools | Permission needs confirmation · [Details](https://openenvision.github.io/GameMap/testing/unity-asset-store/) |

</details>

<details>
<summary><strong>Rigs and motion data · 9 resources</strong></summary>

| Resource / primary source | Purpose and stack | Terms / details |
| --- | --- | --- |
| [Kenney Animated Characters](https://kenney.nl/assets/animated-characters-protagonists) | Small CC0 characters for first-pass skinning, animation playback and import regression checks.<br>Stylized rigged character and animation asset packs | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/kenney-animated-characters/) |
| [Quaternius Universal Animation Library](https://quaternius.itch.io/universal-animation-library) | A practical CC0 baseline for humanoid retargeting, locomotion blending and root-motion tests.<br>Humanoid rig, engine exports, root-motion and in-place clips | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/quaternius-ual/) |
| [100STYLE](https://www.ianxmason.com/100style/) | Styled locomotion data for motion matching, gait diversity and cross-skeleton retargeting.<br>BVH motion capture, 28-bone skeleton, 60 fps | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/100style/) |
| [CMU Motion Capture Database](https://mocap.cs.cmu.edu/) | A broad motion source for skeleton parsing, coordinate conversion and control or retargeting research.<br>ASF skeletons and AMC motion files with subject-specific calibration | Research / custom data terms · [Details](https://openenvision.github.io/GameMap/testing/cmu-mocap/) |
| [LaFAN1](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) | Research data and baselines for motion in-betweening, trajectory continuity and obstacle transitions.<br>Motion-capture BVH data and transition-evaluation code | Research / custom data terms · [Details](https://openenvision.github.io/GameMap/testing/lafan1/) |
| [AMASS](https://amass.is.tue.mpg.de/) | Research-scale human motion for pose pipelines and motion models in a common parameter space.<br>Multiple mocap collections unified as parametric human motion | Research / custom data terms · [Details](https://openenvision.github.io/GameMap/testing/amass/) |
| [SMPL-Body](https://smpl.is.tue.mpg.de/) | The CC BY body subset for testing human mesh, rig, skinning and pose interchange.<br>Fixed-shape human mesh, skeleton rig and pose/dynamic blendshapes | Open-license sources · [Details](https://openenvision.github.io/GameMap/testing/smpl-body/) |
| [SMPL-Model](https://smpl.is.tue.mpg.de/) | A research representation for shape/pose conversion and human-to-game-skeleton pipelines.<br>Parametric human body model and shape-generation tools | Research / custom data terms · [Details](https://openenvision.github.io/GameMap/testing/smpl-model/) |
| [Mixamo](https://www.mixamo.com/) | A common ordinary game-animation workflow whose AI testing permission needs separate confirmation.<br>Adobe online humanoid auto-rigging and animation service | Permission needs confirmation · [Details](https://openenvision.github.io/GameMap/testing/mixamo/) |

</details>

Terms categories support filtering; code, characters, motion data, and third-party media retain their individual terms. [Browse the testing library](https://openenvision.github.io/GameMap/testing/) · [Structured data](data/testing-resources.json)

<a id="repository-research"></a>

## Repository research and code references

For native Godot projects, see [Godot 3D games](docs/godot-3d-games.md), a repository research supplement not yet included in the exported website’s cards or search.

All **213 research records**, preserving the original research groups: **204 source-reviewed, 8 unavailable, and 1 metadata-only**. This collection includes games, prototypes, components, skills, forks, and discovery lists. Historical groups and AI-associated labels do not establish AI authorship or playable completeness. Source review does not mean the project was executed.

Repository links use the recorded current identity where established. Detail pages retain the originally requested identity, with revision, attribution, terms, and evidence. Unavailable requested addresses remain visible; independently found alternatives are not represented as authenticated migrations.

<details>
<summary><strong>Separate reference: Cadle · 1 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [Humpalumps/Cadle](https://github.com/Humpalumps/Cadle) | Browser FPS-RPG with data-driven quests, procedural terrain, synthesized audio and separate visual, animation and performance inspection tools. | [Source reviewed](https://openenvision.github.io/GameMap/research/Humpalumps/Cadle/) |

</details>

<details>
<summary><strong>Original deep-review shortlist · 25 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [levy-street/world-of-claudecraft](https://github.com/levy-street/world-of-claudecraft) | A browser MMO with a shared deterministic game core for an authoritative multiplayer server, an offline world, and a headless Gymnasium environment. | [Source reviewed](https://openenvision.github.io/GameMap/research/levy-street/world-of-claudecraft/) |
| [corosolto/client](https://github.com/corosolto/client) | A Brazilian-satire browser FPS with bot matches, multiplayer beta, procedural and imported assets, and documented visual-evaluation tooling. | [Source reviewed](https://openenvision.github.io/GameMap/research/corosolto/client/) |
| [Kevin-Liu-01/Claude-of-Tanks](https://github.com/Kevin-Liu-01/Claude-of-Tanks) | An armored-combat browser game with plate-level armor, ballistics, destructible battlefields, fixed-step authority, multiplayer, and a scene/vehicle inspection studio. | [Source reviewed](https://openenvision.github.io/GameMap/research/Kevin-Liu-01/Claude-of-Tanks/) |
| [alexdevmotion/grand-theft-austerity-open-world](https://github.com/alexdevmotion/grand-theft-austerity-open-world) | A third-person political-satire game with an OpenStreetMap-derived Bucharest, campaign missions, free roam, vehicles, police, weather, and progression. | [Source reviewed](https://openenvision.github.io/GameMap/research/alexdevmotion/grand-theft-austerity-open-world/) |
| [Burry/mark-of-the-veil](https://github.com/Burry/mark-of-the-veil) | An eight-chapter browser action campaign with first/third-person switching, arena encounters, bosses, gamepad support, and procedural music. | [Source reviewed](https://openenvision.github.io/GameMap/research/Burry/mark-of-the-veil/) |
| [vkopitsa/browser-shooter](https://github.com/vkopitsa/browser-shooter) | A browser FPS combining wave survival, host-authoritative WebRTC multiplayer, a round-based bomb mode, a map editor, and OpenStreetMap-based battlefields. | [Source reviewed](https://openenvision.github.io/GameMap/research/vkopitsa/browser-shooter/) |
| [reicapivararbx/capyquake](https://github.com/reicapivararbx/capyquake) | A Three.js arena shooter with mutant-enemy waves, bosses, progression, an item economy, multiplayer lobbies, and touch controls. | [Source reviewed](https://openenvision.github.io/GameMap/research/reicapivararbx/capyquake/) |
| [Braffolk/fable5-world-demo](https://github.com/Braffolk/fable5-world-demo) | A seeded procedural open-world renderer with generated terrain, erosion, vegetation, water, atmosphere, and documented screenshot/profiling checks. | [Source reviewed](https://openenvision.github.io/GameMap/research/Braffolk/fable5-world-demo/) |
| [braedonsaunders/voidstrike](https://github.com/braedonsaunders/voidstrike) | A browser RTS documenting worker-based ECS simulation, fixed-step deterministic logic, lockstep WebRTC play, desync diagnostics, and GPU rendering. | [Source reviewed](https://openenvision.github.io/GameMap/research/braedonsaunders/voidstrike/) |
| [BarthPaleologue/CosmosJourneyer](https://github.com/BarthPaleologue/CosmosJourneyer) | A Babylon.js space-exploration game with procedural planetary worlds, seamless surface exploration, browser/Electron delivery, and documented unit/E2E tests. | [Source reviewed](https://openenvision.github.io/GameMap/research/BarthPaleologue/CosmosJourneyer/) |
| [serejaris/dust-arena](https://github.com/serejaris/dust-arena) | The requested Dust Arena repository remains unavailable. The same owner’s earlier claude-fable monorepo preserves historical source and a dated pointer into the requested repository. | [Unavailable](https://openenvision.github.io/GameMap/research/serejaris/dust-arena/) |
| [RealAbdurRehman/decay](https://github.com/RealAbdurRehman/decay) | A browser survival shooter with monster waves, pickups, movement-dependent gun accuracy, changing maps, and a minimap. | [Source reviewed](https://openenvision.github.io/GameMap/research/RealAbdurRehman/decay/) |
| [iamrichmack111/richmack-the-forest](https://github.com/iamrichmack111/richmack-the-forest) | A haunted driving-survival game with dynamic enemies, camp missions, world events, vehicle combat, instancing, and object pooling. | [Source reviewed](https://openenvision.github.io/GameMap/research/iamrichmack111/richmack-the-forest/) |
| [bbs220/project_block_shooter](https://github.com/bbs220/project_block_shooter) | A low-poly multiplayer FPS prototype with React Three Fiber, a Node authoritative server, Rapier physics, client prediction, and hitscan combat. | [Source reviewed](https://openenvision.github.io/GameMap/research/bbs220/project_block_shooter/) |
| [mohsenheydari/three-fps](https://github.com/mohsenheydari/three-fps) | An FPS example with an entity/component architecture, Ammo.js rigid-body controls, root-motion NPC animation, and pathfinding. | [Source reviewed](https://openenvision.github.io/GameMap/research/mohsenheydari/three-fps/) |
| [tensorspace-ai/evolution-arena](https://github.com/tensorspace-ai/evolution-arena) | A client-side procedural survival game where mutations change creature form and mechanics across generations, with energy, warmth, predators, and touch controls. | [Source reviewed](https://openenvision.github.io/GameMap/research/tensorspace-ai/evolution-arena/) |
| [gianlucatruda/music-melee](https://github.com/gianlucatruda/music-melee) | A parkour FPS built around musical timing and scoring, using spatial synthesis, physics, and browser rendering. | [Source reviewed](https://openenvision.github.io/GameMap/research/gianlucatruda/music-melee/) |
| [danyparc/antigravity-evil-eyes](https://github.com/danyparc/antigravity-evil-eyes) | A browser survival FPS with neon environments, chasing eyeball enemies, physics-based movement, and projectile combat. | [Source reviewed](https://openenvision.github.io/GameMap/research/danyparc/antigravity-evil-eyes/) |
| [Arnie016/flight-simulator-fable5](https://github.com/Arnie016/flight-simulator-fable5) | A browser flight-training prototype with missions, telemetry, scoring, replay/debrief workflows, and an optional real-time voice instructor. | [Source reviewed](https://openenvision.github.io/GameMap/research/Arnie016/flight-simulator-fable5/) |
| [imr4n4lif/bloodwave-fps-game](https://github.com/imr4n4lif/bloodwave-fps-game) | A browser wave-survival shooter with multiple weapons, an open terrain/building scene, zombie behaviors, HUD, and audio hooks. | [Source reviewed](https://openenvision.github.io/GameMap/research/imr4n4lif/bloodwave-fps-game/) |
| [profullstack/nightcell7](https://github.com/profullstack/nightcell7) | A Babylon.js episodic-FPS monorepo with a browser/PWA/Electron client and Colyseus server-authoritative multiplayer architecture. | [Source reviewed](https://openenvision.github.io/GameMap/research/profullstack/nightcell7/) |
| [BunPrinceton/kings-field-game](https://github.com/BunPrinceton/kings-field-game) | A Three.js first-person dungeon-crawler project documenting parallel Claude Code development through Git worktrees. | [Source reviewed](https://openenvision.github.io/GameMap/research/BunPrinceton/kings-field-game/) |
| [Humpalumps/Aether](https://github.com/Humpalumps/Aether) | A procedural WebGL2 spell-effects forge with data-driven emitters, GPU particle simulation, deterministic replay, and visual measurement workflows. | [Source reviewed](https://openenvision.github.io/GameMap/research/Humpalumps/Aether/) |
| [Moonfall-Lab/moonfall-ark](https://github.com/Moonfall-Lab/moonfall-ark) | The supplied Moonfall Ark repository could not be inspected at its requested GitHub address. | [Unavailable](https://openenvision.github.io/GameMap/research/Moonfall-Lab/moonfall-ark/) |
| [Redblock-Online/redblock-client](https://github.com/Redblock-Online/redblock-client) | A Three.js aim trainer and world editor with procedural targets, reusable block components, transforms, undo/redo, and scenario import/export. | [Source reviewed](https://openenvision.github.io/GameMap/research/Redblock-Online/redblock-client/) |

</details>

<details>
<summary><strong>Browser games and adjacent projects · 56 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [LBALab/lba2remake](https://github.com/LBALab/lba2remake) | Reimplements the Little Big Adventure games with explorable scenes and an editor for inspecting objects, variables, and actor scripts. | [Source reviewed](https://openenvision.github.io/GameMap/research/LBALab/lba2remake/) |
| [NikLever/THREEjs_RPG_Game](https://github.com/NikLever/THREEjs_RPG_Game) | Nik Lever’s Three.js course resources include the Lost Treasure mystery-puzzle RPG example and a separate FBX animation-mixer example. Inspected source implements collectible and door actions, camera switching and an on-screen joystick. | [Source reviewed](https://openenvision.github.io/GameMap/research/NikLever/THREEjs_RPG_Game/) |
| [stickyfingies/grove](https://github.com/stickyfingies/grove) | Browser RPG technology sandbox with an entity-component architecture and separate rendering and physics threads communicating through shared memory. | [Source reviewed](https://openenvision.github.io/GameMap/research/stickyfingies/grove/) |
| [cedric-h/lab](https://github.com/cedric-h/lab) | Small multiplayer 3D RPG combat project with a linked gameplay video and credited programming, model, and animation contributors. | [Source reviewed](https://openenvision.github.io/GameMap/research/cedric-h/lab/) |
| [kaetram/kaetram-open](https://github.com/Kaetram/Kaetram-Open) | Legacy 2D MMORPG and extensible game code descended from BrowserQuest, with server infrastructure and map tooling. | [Source reviewed](https://openenvision.github.io/GameMap/research/kaetram/kaetram-open/) |
| [hyperfy-xyz/hyperfy](https://github.com/hyperfy-xyz/hyperfy) | Framework for persistent, self-hosted 3D worlds with in-world editing, JavaScript applications, multiplayer collaboration, physics, and VR support. | [Source reviewed](https://openenvision.github.io/GameMap/research/hyperfy-xyz/hyperfy/) |
| [PrismarineJS/prismarine-web-client](https://github.com/PrismarineJS/prismarine-web-client) | Runs a Minecraft client in the browser through a WebSocket-to-TCP proxy, with world rendering, player movement, and block interactions. | [Source reviewed](https://openenvision.github.io/GameMap/research/PrismarineJS/prismarine-web-client/) |
| [LabyStudio/js-minecraft](https://github.com/LabyStudio/js-minecraft) | Minecraft-style learning sandbox implementing voxel terrain, lighting, movement, rendering, UI, and multiplayer protocol features. | [Source reviewed](https://openenvision.github.io/GameMap/research/LabyStudio/js-minecraft/) |
| [hexianWeb/Third-Person-MC](https://github.com/hexianWeb/Third-Person-MC) | Third-person voxel-style world demo with procedural biomes, character movement, camera collision handling, and an evolving combat system. | [Source reviewed](https://openenvision.github.io/GameMap/research/hexianWeb/Third-Person-MC/) |
| [justjavac/minecraft-web](https://github.com/justjavac/minecraft-web) | Browser Minecraft-style game with creative and survival modes; the author attributes development to Kimi K3 and documents third-party media sources. | [Source reviewed](https://openenvision.github.io/GameMap/research/justjavac/minecraft-web/) |
| [maxscharwath/toonks-game](https://github.com/maxscharwath/toonks-game) | Browser tank-combat game using WebRTC host/client networking for playing against friends. | [Source reviewed](https://openenvision.github.io/GameMap/research/maxscharwath/toonks-game/) |
| [ryancampbell/kart-royale](https://github.com/ryancampbell/kart-royale) | Procedural browser kart racer whose meshes, textures, and sounds are generated in code; the README publishes its prompt and multi-agent critique workflow. | [Source reviewed](https://openenvision.github.io/GameMap/research/ryancampbell/kart-royale/) |
| [toddeTV/zlig](https://github.com/toddeTV/zlig) | Japanese zen-landscape idle browser game with documented development setup, third-party credits, and disclosed AI assistance. | [Source reviewed](https://openenvision.github.io/GameMap/research/toddeTV/zlig/) |
| [akarlsten/cuberun](https://github.com/akarlsten/cuberun) | Synthwave obstacle-avoidance game with increasing speed, music-synchronized effects, local high scores, and touch controls. | [Source reviewed](https://openenvision.github.io/GameMap/research/akarlsten/cuberun/) |
| [coldi/r3f-game-demo](https://github.com/coldi/r3f-game-demo) | Minimal tile-based top-down game example extracted from Colmen’s Quest, demonstrating React game architecture and whole-tile movement. | [Source reviewed](https://openenvision.github.io/GameMap/research/coldi/r3f-game-demo/) |
| [filahf/r3f-spotify-game](https://github.com/filahf/r3f-spotify-game) | AudioSurf-inspired 3D music game that connects to Spotify and lets players switch lanes through an audio-reactive scene. | [Source reviewed](https://openenvision.github.io/GameMap/research/filahf/r3f-spotify-game/) |
| [jonit-dev/vibe-coder-3d](https://github.com/jonit-dev/vibe-coder-3d) | Early game-engine/editor project aiming to combine React-based scene editing, a Rust runtime, and natural-language game creation. | [Source reviewed](https://openenvision.github.io/GameMap/research/jonit-dev/vibe-coder-3d/) |
| [iaruso/circuit-rush](https://github.com/iaruso/circuit-rush) | Minimalist time-trial racing game with vehicle physics, checkpoints, movable obstacles, and a three-lap personal-best challenge. | [Source reviewed](https://openenvision.github.io/GameMap/research/iaruso/circuit-rush/) |
| [fgarrec0397/granity](https://github.com/fgarrec0397/granity) | Visual widget-based game engine and editor for placing programmable React components, manipulating scenes, and saving layouts. | [Source reviewed](https://openenvision.github.io/GameMap/research/fgarrec0397/granity/) |
| [JL978/3d-tic-tac-toe](https://github.com/JL978/3d-tic-tac-toe) | Small 3D tic-tac-toe project with local development instructions. | [Source reviewed](https://openenvision.github.io/GameMap/research/JL978/3d-tic-tac-toe/) |
| [prnthh/react-three-game](https://github.com/prnthh/react-three-game) | Prefab-based scene framework with a visual editor, reusable JSON-compatible scene trees, and React-defined behavior. | [Source reviewed](https://openenvision.github.io/GameMap/research/prnthh/react-three-game/) |
| [manan30/billiards](https://github.com/manan30/billiards) | Rudimentary pool-table simulation with a custom physics implementation and a hosted demo. | [Source reviewed](https://openenvision.github.io/GameMap/research/manan30/billiards/) |
| [verekia/r3f-gamedev](https://github.com/verekia/r3f-gamedev) | Collection of minimal game-development examples covering health bars, damage feedback, weapon trails, camera effects, interpolation, and entity-state patterns. | [Source reviewed](https://openenvision.github.io/GameMap/research/verekia/r3f-gamedev/) |
| [winsznx/bull-rush](https://github.com/winsznx/bull-rush) | Endless runner with deterministic daily courses, server replay verification, leaderboards, and documented onchain prize-vault integration. | [Source reviewed](https://openenvision.github.io/GameMap/research/winsznx/bull-rush/) |
| [michaelkolesidis/beachy-beachy-ball](https://github.com/michaelkolesidis/beachy-beachy-ball) | Obstacle-course game in which a controllable beach ball jumps through a level to reach a goal star. | [Source reviewed](https://openenvision.github.io/GameMap/research/michaelkolesidis/beachy-beachy-ball/) |
| [EVEDensity/MineWorld](https://github.com/EVEDensity/MineWorld) | Procedural voxel exploration game with block placement/destruction, robot NPCs, chunked terrain, and desktop/touch input. | [Source reviewed](https://openenvision.github.io/GameMap/research/EVEDensity/MineWorld/) |
| [akay25/TheAviator](https://github.com/akay25/TheAviator) | Fork of yakudoo’s The Aviator: steer a plane to collect fuel, dodge obstacles, and progress through increasingly fast levels. | [Source reviewed](https://openenvision.github.io/GameMap/research/akay25/TheAviator/) |
| [norio/vrm-game-starter](https://github.com/norio/vrm-game-starter) | Starter for VRM-character games with humanoid animation retargeting, foot IK, BVH-based collision, touch/gamepad input, and an in-browser level editor. | [Source reviewed](https://openenvision.github.io/GameMap/research/norio/vrm-game-starter/) |
| [anshaneja5/skyline-run](https://github.com/anshaneja5/skyline-run) | Flight game that turns a GitHub contribution graph into a city and scores low-altitude passes and near misses through contribution-based buildings. | [Source reviewed](https://openenvision.github.io/GameMap/research/anshaneja5/skyline-run/) |
| [esc5221/drive-game](https://github.com/esc5221/drive-game) | Web/Android driving simulator using real track geometry, custom high-frequency vehicle physics, weather, synthesized engine audio, racing lines, and ghost laps. | [Source reviewed](https://openenvision.github.io/GameMap/research/esc5221/drive-game/) |
| [Eray114514/Deep-Space](https://github.com/Eray114514/Deep-Space) | Seeded space-exploration project with seamless planet landings, surface traversal, terrain LOD, atmospheric rendering, a star map, and touch input. | [Source reviewed](https://openenvision.github.io/GameMap/research/Eray114514/Deep-Space/) |
| [pranshuparmar/downhill-mayhem](https://github.com/pranshuparmar/downhill-mayhem) | Self-contained downhill mountain-bike racing tribute with rival riders, aerial tricks, boosts, combat, and desktop/mobile/gamepad controls. | [Source reviewed](https://openenvision.github.io/GameMap/research/pranshuparmar/downhill-mayhem/) |
| [Vheissu/emerald-bayou](https://github.com/Vheissu/emerald-bayou) | Airboat exploration and job-based game in a streamed procedural swamp with wildlife, weather, radio narrative, and configurable graphics quality. | [Source reviewed](https://openenvision.github.io/GameMap/research/Vheissu/emerald-bayou/) |
| [winchxyz/celadon](https://github.com/winchxyz/celadon) | Pottery game covering throwing, drying, trimming, glazing, and firing, with runtime-generated geometry, material simulation, and workshop environments. | [Source reviewed](https://openenvision.github.io/GameMap/research/winchxyz/celadon/) |
| [jonradoff/chessmata](https://github.com/metavert-io/chessmata) | Multiplayer chess platform for humans and agents with a 3D board, matchmaking, rankings, REST API, CLI, UCI compatibility, and MCP tools. | [Source reviewed](https://openenvision.github.io/GameMap/research/jonradoff/chessmata/) |
| [StarKnightt/Pixel-Quest](https://github.com/StarKnightt/Pixel-Quest) | Side-scrolling platformer combining 3D terrain with billboard sprites, jump assistance, enemy stomping, collectibles, moving platforms, and timed levels. | [Source reviewed](https://openenvision.github.io/GameMap/research/StarKnightt/Pixel-Quest/) |
| [pshenok/datacenter-survival](https://github.com/pshenok/datacenter-survival) | Educational datacenter-management game connecting rack revenue to power-chain capacity, cooling, heat propagation, outages, and efficiency metrics. | [Source reviewed](https://openenvision.github.io/GameMap/research/pshenok/datacenter-survival/) |
| [laszlo-gilanyi/OldenEraExplorer](https://github.com/laszlo-gilanyi/OldenEraExplorer) | Companion data/model explorer that extracts a locally owned Heroes of Might and Magic: Olden Era installation and presents its data through a local web interface. | [Source reviewed](https://openenvision.github.io/GameMap/research/laszlo-gilanyi/OldenEraExplorer/) |
| [Quincunx33/fastroads](https://github.com/Quincunx33/fastroads) | Customized slow-roads-style endless driving experience with two-way traffic, collision feedback, movable touch controls, and an offline-capable PWA shell. | [Source reviewed](https://openenvision.github.io/GameMap/research/Quincunx33/fastroads/) |
| [bridge-mind/tideline](https://github.com/bridge-mind/tideline) | Procedural browser fishing game with casting and tension-based reeling, equipment progression, location unlocks, weather/time effects, and a species journal. | [Source reviewed](https://openenvision.github.io/GameMap/research/bridge-mind/tideline/) |
| [avihaymenahem/voltmarch](https://github.com/avihaymenahem/voltmarch) | Real-time strategy project whose current README emphasizes Windows desktop, asymmetric factions, base building, land/air/naval units, and campaign, skirmish, multiplayer, and replay modes. | [Source reviewed](https://openenvision.github.io/GameMap/research/avihaymenahem/voltmarch/) |
| [emollick/monument-brutalist-city-builder](https://github.com/emollick/monument-brutalist-city-builder) | Brutalist city-design toy with direct building-massing controls, procedural compositions, urban activity, multiple analytical and cinematic views, and local saves. | [Source reviewed](https://openenvision.github.io/GameMap/research/emollick/monument-brutalist-city-builder/) |
| [Noisemaker111/jgengine](https://github.com/Noisemaker111/jgengine) | Modular game SDK with an independent core, physics and UI adapters, multiplayer/storage backends, and packaged coding-agent skills for constructing games. | [Source reviewed](https://openenvision.github.io/GameMap/research/Noisemaker111/jgengine/) |
| [baptistefalvet/NeedForTokens](https://github.com/baptistefalvet/NeedForTokens) | Procedural arcade racer with a documented single-prompt Claude Code origin, opponents, driving controls, telemetry, and explicit visual/terrain limitations. | [Source reviewed](https://openenvision.github.io/GameMap/research/baptistefalvet/NeedForTokens/) |
| [wormholeportal/Makone](https://github.com/wormholeportal/Makone) | Procedural 3D authoring kit that combines agent instructions, a scene/game runtime, and capture/inspection tooling for visual feedback while coding worlds. | [Source reviewed](https://openenvision.github.io/GameMap/research/wormholeportal/Makone/) |
| [georgekobaidze/sunday-dev-drive](https://github.com/georgekobaidze/sunday-dev-drive) | Synthwave driving experience that turns a DEV Community user’s articles and profile statistics into roadside billboards and signs. | [Source reviewed](https://openenvision.github.io/GameMap/research/georgekobaidze/sunday-dev-drive/) |
| [michaelkolesidis/fintech-world](https://github.com/michaelkolesidis/fintech-world) | Interactive 3D educational/gamification platform for explaining digital-payment products through an explorable web experience. | [Source reviewed](https://openenvision.github.io/GameMap/research/michaelkolesidis/fintech-world/) |
| [Hack23/blacktrigram](https://github.com/Hack23/blacktrigram) | Korean-martial-arts browser combat simulator with stance-based fighting, character archetypes, targeting, animation, and detailed architecture/testing documentation. | [Source reviewed](https://openenvision.github.io/GameMap/research/Hack23/blacktrigram/) |
| [GyuoMi/exidem](https://github.com/GyuoMi/exidem) | Stairwell Iliad is a Three.js exploration/puzzle game whose inspected source wires a player, collision octree and item interactions; its ending code includes speech-recognition behavior and an alternate path when the speech helper is unavailable. | [Source reviewed](https://openenvision.github.io/GameMap/research/GyuoMi/exidem/) |
| [leslieyip02/racing](https://github.com/leslieyip02/racing) | Small driving/racing demo with keyboard controls, thrust adjustment, and documented checkpoint shortcuts and time-step behavior. | [Source reviewed](https://openenvision.github.io/GameMap/research/leslieyip02/racing/) |
| [michaelkolesidis/zigzag](https://github.com/michaelkolesidis/zigzag) | Minimalist 3D endless-runner ball game in which each tap changes direction to stay on a narrow suspended path. | [Source reviewed](https://openenvision.github.io/GameMap/research/michaelkolesidis/zigzag/) |
| [load1n9/caviar](https://github.com/load1n9/caviar) | Native/browser game engine with scene/world primitives, sprites, a procedural-noise example, a CLI, and documented Deno/browser entry points. | [Source reviewed](https://openenvision.github.io/GameMap/research/load1n9/caviar/) |
| [kpreid/all-is-cubes](https://github.com/kpreid/all-is-cubes) | Experimental editable voxel-world engine in which blocks are themselves built from smaller blocks, with CPU/GPU rendering and desktop/browser applications. | [Source reviewed](https://openenvision.github.io/GameMap/research/kpreid/all-is-cubes/) |
| [Refsa/pollus](https://github.com/Refsa/pollus) | Small ECS-based C# engine with modular input/audio/UI systems and native/browser targets. | [Source reviewed](https://openenvision.github.io/GameMap/research/Refsa/pollus/) |
| [snowfrogdev/nanojet](https://github.com/snowfrogdev/nanojet) | A TypeScript/Vite workspace containing a WebGPU engine and a Pong example. Inspected source connects an ECS world, game loop and renderer, with player/CPU paddles, scoring and synthesized scoring sound in the example. | [Source reviewed](https://openenvision.github.io/GameMap/research/snowfrogdev/nanojet/) |
| [eliassjogreen/pioneer](https://github.com/eliassjogreen/pioneer) | Work-in-progress ECS game engine targeting browser and native Deno use, with rendering backends still listed as development tasks. | [Source reviewed](https://openenvision.github.io/GameMap/research/eliassjogreen/pioneer/) |

</details>

<details>
<summary><strong>FPS and shooter candidates · 44 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [iErcann/enari-engine](https://github.com/iErcann/enari-engine) | Three.js/Ammo.js FPS playground with first- and third-person views, weapon animation, GLB map loading and several environment demos. | [Source reviewed](https://openenvision.github.io/GameMap/research/iErcann/enari-engine/) |
| [haosong/3D-Online-FPS](https://github.com/haosong/3D-Online-FPS) | Educational multiplayer 3D shooting website using Three.js, Socket.io and Node.js, with a Chinese-language implementation walkthrough. | [Source reviewed](https://openenvision.github.io/GameMap/research/haosong/3D-Online-FPS/) |
| [Parking-Master/FPS](https://github.com/Parking-Master/FPS) | Halo-inspired browser FPS with multiplayer lobbies, bots, multiple maps and weapons; networking uses Gametime.js and PubNub. | [Source reviewed](https://openenvision.github.io/GameMap/research/Parking-Master/FPS/) |
| [mrdoob/three-descent](https://github.com/mrdoob/three-descent) | Three.js port of Descent, including the Episode 1 shareware data and support for user-supplied registered game files. | [Source reviewed](https://openenvision.github.io/GameMap/research/mrdoob/three-descent/) |
| [kamalesh404/multiplayer-fps-game](https://github.com/kamalesh404/multiplayer-fps-game) | BulletStorm Arena browser FPS with Three.js rendering, Socket.io multiplayer, character movement and documented server-side movement/hit validation. | [Source reviewed](https://openenvision.github.io/GameMap/research/kamalesh404/multiplayer-fps-game/) |
| [mrdoob/three-doom](https://github.com/mrdoob/three-doom) | Three.js port of Doom with the first shareware episode and support for user-supplied Doom or Doom II WAD files. | [Source reviewed](https://openenvision.github.io/GameMap/research/mrdoob/three-doom/) |
| [UstymUkhman/YetAnotherZombieHorror](https://github.com/UstymUkhman/YetAnotherZombieHorror) | First- and third-person zombie survival shooter with configurable Ammo.js/BVH physics, aiming, weapon switching and visual-effects settings. | [Source reviewed](https://openenvision.github.io/GameMap/research/UstymUkhman/YetAnotherZombieHorror/) |
| [kamalesh404/velocity.io](https://github.com/kamalesh404/velocity.io) | Three.js multiplayer FPS using Rapier kinematic movement, GLB map colliders, procedural weapon motion and Socket.io synchronization. | [Source reviewed](https://openenvision.github.io/GameMap/research/kamalesh404/velocity.io/) |
| [StarKnightt/operation-ironhold](https://github.com/StarKnightt/operation-ironhold) | Single-HTML browser FPS with a timed hostile-clearance objective, procedural world, weapons and audio, plus a published five-prompt AI build account. | [Source reviewed](https://openenvision.github.io/GameMap/research/StarKnightt/operation-ironhold/) |
| [vincenzo-afk/NIGHTFALL](https://github.com/vincenzo-afk/NIGHTFALL) | TypeScript browser-FPS scaffold documenting hero classes, game modes, movement physics and validated network schemas; core combat and rendering remain unchecked. | [Source reviewed](https://openenvision.github.io/GameMap/research/vincenzo-afk/NIGHTFALL/) |
| [whitwhoa/open-browser-fps](https://github.com/whitwhoa/open-browser-fps) | Historical Three.js/Node.js/Socket.io authoritative-server movement example with multiplayer character synchronization, but no shooting implementation. | [Source reviewed](https://openenvision.github.io/GameMap/research/whitwhoa/open-browser-fps/) |
| [StarKnightt/cinder-ops](https://github.com/StarKnightt/cinder-ops) | Procedural Three.js single-player extraction FPS with a street arena, four weapons, hostile AI, supply chests and synthesized audio. | [Source reviewed](https://openenvision.github.io/GameMap/research/StarKnightt/cinder-ops/) |
| [8tp/instagib-arena](https://github.com/8tp/instagib-arena) | Quake-style browser railgun FPS with documented authoritative multiplayer, lag compensation, offline bots, ranked duels, replays and configurable accessibility features. | [Source reviewed](https://openenvision.github.io/GameMap/research/8tp/instagib-arena/) |
| [iaanzhao/vertex-fps](https://github.com/iaanzhao/vertex-fps) | Low-poly Three.js arena FPS with team deathmatch versus bots, destructible cover, three weapons and a separately hosted WebSocket multiplayer server. | [Source reviewed](https://openenvision.github.io/GameMap/research/iaanzhao/vertex-fps/) |
| [comster/fps-threejs](https://github.com/comster/fps-threejs) | Small browser FPS with enemies, health, score and reloading, accompanied by a beginner guide for extending the project using Claude Code or Codex. | [Source reviewed](https://openenvision.github.io/GameMap/research/comster/fps-threejs/) |
| [Kurt-Hanel/mp-fps-game](https://github.com/Kurt-Hanel/mp-fps-game) | Three.js browser FPS project intended to support multiplayer lobbies and matches; the short README supplies a game-directory start command. | [Source reviewed](https://openenvision.github.io/GameMap/research/Kurt-Hanel/mp-fps-game/) |
| [eskafu/zombie-fps](https://github.com/eskafu/zombie-fps) | Static Three.js zombie-survival FPS set in a 1960s village, with grappling, a random-weapon box and documented zombie spawning/navigation systems. | [Source reviewed](https://openenvision.github.io/GameMap/research/eskafu/zombie-fps/) |
| [mmclqx/frontline-zero](https://github.com/mmclqx/frontline-zero) | Procedural Three.js/WebGL2 FPS derived from mshumer/Claude-of-Duty, adding graphics presets, texture caching and weapon/character fixes. | [Source reviewed](https://openenvision.github.io/GameMap/research/mmclqx/frontline-zero/) |
| [heihuzicity-tech/pastel-nuketown-fps](https://github.com/heihuzicity-tech/pastel-nuketown-fps) | Pastel-styled Three.js FPS with solo bots and up-to-four-player host-authoritative rooms over a WebSocket relay. | [Source reviewed](https://openenvision.github.io/GameMap/research/heihuzicity-tech/pastel-nuketown-fps/) |
| [stobieee-bit/FPScape](https://github.com/stobieee-bit/FPScape) | A Three.js first-person RPG source tree with implemented skill-XP and quest-state/reward logic, plus a WebSocket multiplayer client and separate Node ws server package. | [Source reviewed](https://openenvision.github.io/GameMap/research/stobieee-bit/FPScape/) |
| [rizdigico/VoidStrike-FPS](https://github.com/rizdigico/VoidStrike-FPS) | Single-page Three.js FPS with gun-game, deathmatch, survival and timed modes, five arenas, weapon progression and procedural audio. | [Source reviewed](https://openenvision.github.io/GameMap/research/rizdigico/VoidStrike-FPS/) |
| [szefo94/VibeOnDuty](https://github.com/szefo94/VibeOnDuty) | Three.js browser FPS with wave modes, training, Search & Destroy, Team Deathmatch, a map editor and documented Colyseus dedicated-server multiplayer. | [Source reviewed](https://openenvision.github.io/GameMap/research/szefo94/VibeOnDuty/) |
| [TheFadGhost/operation-blackline](https://github.com/TheFadGhost/operation-blackline) | Procedural Three.js/Node browser FPS for self-hosted 5v5 team deathmatch, with bots, authoritative hit checks, client prediction and synthesized assets. | [Source reviewed](https://openenvision.github.io/GameMap/research/TheFadGhost/operation-blackline/) |
| [DustinVII/the-outlands-game](https://github.com/DustinVII/the-outlands-game) | Experimental Vite/Three.js multiplayer movement prototype with Socket.io synchronization and an explicitly unfinished combat/physics roadmap. | [Source reviewed](https://openenvision.github.io/GameMap/research/DustinVII/the-outlands-game/) |
| [hnprivv/Forge_FPS](https://github.com/hnprivv/Forge_FPS) | A Three.js/Socket.IO browser FPS whose built-in project guide describes solo target practice, four-player rooms, Free for All and Search & Destroy, with weapon and explosive-barrel mechanics. Inspected server source implements rooms and relays gameplay events. | [Source reviewed](https://openenvision.github.io/GameMap/research/hnprivv/Forge_FPS/) |
| [tangkwok0104/cat-of-duty](https://github.com/tangkwok0104/cat-of-duty) | Three.js/Rapier wave-survival FPS with cat soldiers, weapon upgrades and documented Claude Code build, gameplay-testing and adversarial-QA workflow. | [Source reviewed](https://openenvision.github.io/GameMap/research/tangkwok0104/cat-of-duty/) |
| [whatgoodarewords/gungame](https://github.com/whatgoodarewords/gungame) | Phase-0 browser FPS scaffold planning scoutzknivez-style movement and kill-to-advance gun-game, with shared TypeScript simulation and authoritative networking architecture. | [Source reviewed](https://openenvision.github.io/GameMap/research/whatgoodarewords/gungame/) |
| [dong-quan-tran/phaserift](https://github.com/dong-quan-tran/phaserift) | Browser multiplayer FPS whose metadata describes Three.js/Node, WebSocket state synchronization, hitscan combat and portals; the README is only a brief title. | [Source reviewed](https://openenvision.github.io/GameMap/research/dong-quan-tran/phaserift/) |
| [krishsoni15/DEADSIGNAL](https://github.com/krishsoni15/DEADSIGNAL) | Browser zombie/bodycam-style FPS with a smartphone gyroscope controller, WebSocket input transport, Three.js/React rendering and Rapier ragdolls. | [Source reviewed](https://openenvision.github.io/GameMap/research/krishsoni15/DEADSIGNAL/) |
| [Alwin936/Three.Js-FPS-Game---Vibe-Coded-w-Codex](https://github.com/Alwin936/Three.Js-FPS-Game---Vibe-Coded-w-Codex) | Frenzy Fighters is a Three.js zombie-arena FPS whose repository controls page describes score-based levels, a multishot power-up and a multi-phase rock-throwing boss. Inspected JavaScript constructs the renderer, arena and zombie models. | [Source reviewed](https://openenvision.github.io/GameMap/research/Alwin936/Three.Js-FPS-Game---Vibe-Coded-w-Codex/) |
| [luongnv89/codex-of-duty](https://github.com/luongnv89/codex-of-duty) | Three.js/Rapier browser FPS with streamed city chunks, tactical enemies, multiple weapons, spatial audio and relay objectives. | [Source reviewed](https://openenvision.github.io/GameMap/research/luongnv89/codex-of-duty/) |
| [TiagoSilvaPereira/simple-3d-fps](https://github.com/TiagoSilvaPereira/simple-3d-fps) | Babylon.js/WebGL browser FPS with a live-preview link and bundled HTML documentation, presented as a simple clean-code-oriented project. | [Source reviewed](https://openenvision.github.io/GameMap/research/TiagoSilvaPereira/simple-3d-fps/) |
| [KylerCondran/Fate](https://github.com/KylerCondran/Fate) | Pure-JavaScript fantasy FPS with many themed levels, weapons, pickups and enemy types; the author discloses selective AI coding and image-generation assistance. | [Source reviewed](https://openenvision.github.io/GameMap/research/KylerCondran/Fate/) |
| [zlatnaspirala/magic-three](https://github.com/zlatnaspirala/magic-three) | Class-oriented Three.js/Ammo.js FPS framework and demo with map loading, browser ES modules and OpenVidu/Kurento or legacy WebRTC multiplayer. | [Source reviewed](https://openenvision.github.io/GameMap/research/zlatnaspirala/magic-three/) |
| [ZundaAI-Lab/prism-rift-vanguard](https://github.com/ZundaAI-Lab/prism-rift-vanguard) | Three.js campaign shooter with mission waves, bosses, crystals, between-mission ship upgrades, multilingual UI and local progression saves. | [Source reviewed](https://openenvision.github.io/GameMap/research/ZundaAI-Lab/prism-rift-vanguard/) |
| [Footprintarts/ThreeJS_FPS_2.0](https://github.com/Footprintarts/ThreeJS_FPS_2.0) | Modular extension of the Three.js FPS example with an animated weapon rig, octree collisions, movement, projectile spheres and audio. | [Source reviewed](https://openenvision.github.io/GameMap/research/Footprintarts/ThreeJS_FPS_2.0/) |
| [LeoOpenBotDevelopment/Three.js-3D-FPS-Game](https://github.com/LeoOpenBotDevelopment/Three.js-3D-FPS-Game) | Three.js browser FPS with sprint/jump movement, pursuing enemies, health bars, shooting and reloading, under restrictive custom code terms. | [Source reviewed](https://openenvision.github.io/GameMap/research/LeoOpenBotDevelopment/Three.js-3D-FPS-Game/) |
| [codepankajpy/SolFrag](https://github.com/codepankajpy/SolFrag) | Browser multiplayer shooter client with Solana/Phantom-wallet integration; networking server and on-chain code are linked as separate repositories. | [Source reviewed](https://openenvision.github.io/GameMap/research/codepankajpy/SolFrag/) |
| [n1md7/three-boilerplate](https://github.com/n1md7/three-boilerplate) | Vite/TypeScript/Three.js FPS starter with controls, collisions, weapon animations and flashlight, with sound, particles and UI marked work in progress. | [Source reviewed](https://openenvision.github.io/GameMap/research/n1md7/three-boilerplate/) |
| [ThanosRestas/Theasis](https://github.com/ThanosRestas/Theasis) | Babylon.js browser FPS with multiple world areas, animated weapons and enemies, consumables, sprint energy and an enemy-clearance objective. | [Source reviewed](https://openenvision.github.io/GameMap/research/ThanosRestas/Theasis/) |
| [csarkosh/html5-fps](https://github.com/csarkosh/html5-fps) | Requested repository could not be inspected: GitHub returned 404 and owner-scoped repository search found no match. | [Unavailable](https://openenvision.github.io/GameMap/research/csarkosh/html5-fps/) |
| [timetocode/nengi-babylon-3d-shooter](https://github.com/timetocode/nengi-babylon-3d-shooter) | Babylon.js/nengi multiplayer template demonstrating predicted movement, server reconciliation, deterministic inputs and rewind lag compensation. | [Source reviewed](https://openenvision.github.io/GameMap/research/timetocode/nengi-babylon-3d-shooter/) |
| [RolandCsibrei/babylon-lite-dude-particle-shooter](https://github.com/RolandCsibrei/babylon-lite-dude-particle-shooter) | Dude Particle Shooter port to Babylon Lite, with detailed notes on replacing Babylon.js APIs for a WebGPU-only renderer. | [Source reviewed](https://openenvision.github.io/GameMap/research/RolandCsibrei/babylon-lite-dude-particle-shooter/) |
| [akhawatrahTW/cs1.6](https://github.com/akhawatrahTW/cs1.6) | Legacy Babylon.js FPS demonstration with raycasts, A* enemies, pickups, headshots, mobile controls and models extracted from Counter-Strike 1.6. | [Source reviewed](https://openenvision.github.io/GameMap/research/akhawatrahTW/cs1.6/) |

</details>

<details>
<summary><strong>Original AI-associated candidate group · 15 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [alexdevmotion/grand-theft-austerity](https://github.com/alexdevmotion/grand-theft-austerity) | Original AI Game Jam third-person satire set in a compact Bucharest, with a short story, driving, and police-chase sequence; superseded by the Open World repository. | [Source reviewed](https://openenvision.github.io/GameMap/research/alexdevmotion/grand-theft-austerity/) |
| [cbascom1/ClaudeCodeMetroidvaniaGame](https://github.com/cbascom1/ClaudeCodeMetroidvaniaGame) | Claude Code-authored metroidvania vertical slice with interconnected rooms, platforming, directional melee, abilities, enemies, a boss, and progression. | [Source reviewed](https://openenvision.github.io/GameMap/research/cbascom1/ClaudeCodeMetroidvaniaGame/) |
| [lawrab/the-pile](https://github.com/lawrab/the-pile) | AI-authored gaming-backlog tracker that imports Steam libraries, visualizes play status and backlog statistics, and adds gamified tracking mechanics. | [Source reviewed](https://openenvision.github.io/GameMap/research/lawrab/the-pile/) |
| [noweh/mobius-chess](https://github.com/noweh/mobius-chess) | Chess-inspired strategy game on a self-crossing, edge-free board, with novel movement topology, king capture, local/AI play, and a documented AI-build process. | [Source reviewed](https://openenvision.github.io/GameMap/research/noweh/mobius-chess/) |
| [darupong/vite-endless-runner-game](https://github.com/darupong/vite-endless-runner-game) | A React Three Fiber/Three.js runner whose inspected source implements lane movement, jumping/sliding, obstacle and coin handling, synthesized audio and a browser-local top-ten leaderboard. | [Source reviewed](https://openenvision.github.io/GameMap/research/darupong/vite-endless-runner-game/) |
| [az9713/pirate-adventure](https://github.com/az9713/pirate-adventure) | Two-level point-and-click pirate adventure with navigation meshes, inventory puzzles, dialogue, collectibles, and an in-game editor. | [Source reviewed](https://openenvision.github.io/GameMap/research/az9713/pirate-adventure/) |
| [Uzzoper/vibecraft](https://github.com/Uzzoper/vibecraft) | Client-only voxel building/exploration game with procedural terrain and caves, chunk streaming, zombies, health, synthesized sound, and mobile controls. | [Source reviewed](https://openenvision.github.io/GameMap/research/Uzzoper/vibecraft/) |
| [Susanzzzzzzz/AICraft](https://github.com/Susanzzzzzzz/AICraft) | Browser/mobile voxel sandbox with building, crafting, combat, levels, weather, and procedural audio, plus an Android packaging route and development specifications. | [Source reviewed](https://openenvision.github.io/GameMap/research/Susanzzzzzzz/AICraft/) |
| [pahorema/murmur](https://github.com/pahorema/murmur) | The requested repository could not be read; no current capability claim is established. | [Unavailable](https://openenvision.github.io/GameMap/research/pahorema/murmur/) |
| [sentifold/generals-rts-threejs-port](https://github.com/sentifold/generals-rts-threejs-port) | Unofficial browser reimplementation of Command & Conquer: Generals – Zero Hour, using the released engine source as reference and a user’s own game assets. | [Source reviewed](https://openenvision.github.io/GameMap/research/sentifold/generals-rts-threejs-port/) |
| [romanticamaj/promptasy](https://github.com/romanticamaj/promptasy) | Exploration game for learning prompt engineering by composing prompts and solving challenges, with offline scoring, cited teaching material, and local progression. | [Source reviewed](https://openenvision.github.io/GameMap/research/romanticamaj/promptasy/) |
| [yunit00/game-corovans](https://github.com/yunit00/game-corovans) | Browser fantasy action game about defending an elven village, ambushing caravans, completing quests, and progressing toward a mountain-fort encounter. | [Source reviewed](https://openenvision.github.io/GameMap/research/yunit00/game-corovans/) |
| [evanhgs/billard-anglais](https://github.com/evanhgs/billard-anglais) | A carom-style billiards project with a Pygame desktop implementation and Flask/Socket.IO browser routes for local play and two-player rooms. The homepage calls it 3D carom billiards, and the inspected desktop scoring code awards a point after contacting both other balls. | [Source reviewed](https://openenvision.github.io/GameMap/research/evanhgs/billard-anglais/) |
| [alvarosabu/tres-breakout](https://github.com/alvarosabu/tres-breakout) | Synthwave breakout game with three levels, increasing ball speed, three lives, and a persistent high score. | [Source reviewed](https://openenvision.github.io/GameMap/research/alvarosabu/tres-breakout/) |
| [gcoche-bit/synthcrew-mcp-game](https://github.com/gcoche-bit/synthcrew-mcp-game) | Gamified 3D agent dashboard with an explorable world, clickable agents, mission planning/execution views, live activity, and a local API/WebSocket backend. | [Source reviewed](https://openenvision.github.io/GameMap/research/gcoche-bit/synthcrew-mcp-game/) |

</details>

<details>
<summary><strong>Agent-development harnesses and skills · 21 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [majidmanzarpour/threejs-game-skills](https://github.com/majidmanzarpour/threejs-game-skills) | A Codex/Claude Code skill pack with a director, gameplay/rendering guidance, a bundled Vite/TypeScript scaffold, and deterministic Playwright QA templates. | [Source reviewed](https://openenvision.github.io/GameMap/research/majidmanzarpour/threejs-game-skills/) |
| [gamedev-skills/awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) | A cross-engine skill collection and router that select engine-specific gameplay, asset, testing, and production instructions. | [Source reviewed](https://openenvision.github.io/GameMap/research/gamedev-skills/awesome-gamedev-agent-skills/) |
| [buyun00/Seed-GameDev-Harness](https://github.com/buyun00/Seed-GameDev-Harness) | A Claude Code plugin that assembles game-development agent teams, routes engine/domain tasks, persists project knowledge, and injects skill fragments. | [Source reviewed](https://openenvision.github.io/GameMap/research/buyun00/Seed-GameDev-Harness/) |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | A coordinated studio template of role-specific agents, implementation skills, quality gates, hooks, and engine-specific workflows. | [Source reviewed](https://openenvision.github.io/GameMap/research/Donchitos/Claude-Code-Game-Studios/) |
| [bullish0x/GameStudio](https://github.com/bullish0x/GameStudio) | A project-local, provider-neutral studio framework with shared agent/skill definitions and adapters for Claude, Codex, Cursor, and browser/native engines. | [Source reviewed](https://openenvision.github.io/GameMap/research/bullish0x/GameStudio/) |
| [PlayableIntelligence/game-creator](https://github.com/PlayableIntelligence/game-creator) | A browser-game skill workflow for Phaser and Three.js that scaffolds projects, creates assets/audio, runs documented QA stages, and integrates deployment/monetization. | [Source reviewed](https://openenvision.github.io/GameMap/research/PlayableIntelligence/game-creator/) |
| [heagandev/threejs-agent-starter](https://github.com/heagandev/threejs-agent-starter) | A Three.js dodge-game starter with architecture rules, reusable skills, feature prompts, and a separate blank-game branch for agent-assisted extension. | [Source reviewed](https://openenvision.github.io/GameMap/research/heagandev/threejs-agent-starter/) |
| [0x0funky/agent-game-forge](https://github.com/0x0funky/agent-game-forge) | A local-first 2D game IDE combining Codex/Claude workflows, a visual scene editor, sprite generation, and JavaScript/Canvas output. | [Source reviewed](https://openenvision.github.io/GameMap/research/0x0funky/agent-game-forge/) |
| [frabcd/codex-ai-game-studio](https://github.com/frabcd/codex-ai-game-studio) | A Codex production-workflow pack for game planning, tool selection, procedural Three.js modeling, assets, editor integrations, reversible changes, and QA gates. | [Source reviewed](https://openenvision.github.io/GameMap/research/frabcd/codex-ai-game-studio/) |
| [Sstobo/Claude-Code-Game-Master](https://github.com/Sstobo/Claude-Code-Game-Master) | A Claude Code role-playing harness with persistent campaign state, custom world rules, document retrieval, and optional generated illustrations. | [Source reviewed](https://openenvision.github.io/GameMap/research/Sstobo/Claude-Code-Game-Master/) |
| [htdt/godogen](https://github.com/htdt/godogen) | A generator source that publishes thin agent-ready game repositories for Godot, Bevy, Babylon.js, or Three.js with asset and runtime-evidence workflows. | [Source reviewed](https://openenvision.github.io/GameMap/research/htdt/godogen/) |
| [gamekit-agent/gamekit-cli](https://github.com/gamekit-agent/gamekit-cli) | A CLI from Normal that creates or augments Unity projects with Claude commands, skills, an MCP bridge, and build/playtest workflows. | [Source reviewed](https://openenvision.github.io/GameMap/research/gamekit-agent/gamekit-cli/) |
| [RandallLiuXin/GodotMaker](https://github.com/RandallLiuXin/GodotMaker) | A text-to-game workflow layer for Godot with external agent runners, iterative build/fix/evaluation, visual QA, and export packaging. | [Source reviewed](https://openenvision.github.io/GameMap/research/RandallLiuXin/GodotMaker/) |
| [IdoCohen560/claude-unity-game-studio](https://github.com/IdoCohen560/claude-unity-game-studio) | A Unity-focused bundle combining studio agents, engine/middleware skills, workflow plugins, and director quality gates. | [Source reviewed](https://openenvision.github.io/GameMap/research/IdoCohen560/claude-unity-game-studio/) |
| [HermeticOrmus/claude-code-game-development](https://github.com/HermeticOrmus/claude-code-game-development) | A game-development plugin marketplace and manual spanning engines, rendering, multiplayer, audio, testing, and general-development plugins. | [Source reviewed](https://openenvision.github.io/GameMap/research/HermeticOrmus/claude-code-game-development/) |
| [joemonster/claude-game-studio](https://github.com/joemonster/claude-game-studio) | A Claude Code repackaging of OpenAI's game-studio skills for browser-game architecture, Phaser/Three.js/R3F, asset pipelines, and playtesting. | [Source reviewed](https://openenvision.github.io/GameMap/research/joemonster/claude-game-studio/) |
| [Shellishack/3d-web-game-dev-skills](https://github.com/Shellishack/3d-web-game-dev-skills) | A Codex skill set for procedural low-poly Three.js models/glTF export and React/Vite/Babylon.js prototype bootstrapping. | [Source reviewed](https://openenvision.github.io/GameMap/research/Shellishack/3d-web-game-dev-skills/) |
| [LeanEntropy/threejs-phaser-game-skills](https://github.com/LeanEntropy/threejs-phaser-game-skills) | A documented fork of Three.js Game Skills that adds a Phaser 3 director and 2D browser-game workflow. | [Source reviewed](https://openenvision.github.io/GameMap/research/LeanEntropy/threejs-phaser-game-skills/) |
| [markjeromecruz/threejs-claude-starter](https://github.com/markjeromecruz/threejs-claude-starter) | A zero-build Three.js/anime.js starter with vendored libraries, a lit courtyard scene, camera movement, and beginner-focused Claude extension guidance. | [Source reviewed](https://openenvision.github.io/GameMap/research/markjeromecruz/threejs-claude-starter/) |
| [MRCalderon3D/everything-game-dev-code](https://github.com/MRCalderon3D/everything-game-dev-code) | A multi-engine, multi-agent scaffold of rules, commands, skills, adapters, hooks, and examples for design, implementation, assets, and QA. | [Source reviewed](https://openenvision.github.io/GameMap/research/MRCalderon3D/everything-game-dev-code/) |
| [akolaarthurali/everything-claude-code-CLAUDE-CODE-GAME-ENHANCER-2](https://github.com/akolaarthurali/everything-claude-code-CLAUDE-CODE-GAME-ENHANCER-2) | A fork of affaan-m/ECC whose inspected README describes general agent-harness skills, memory, security, hooks, and workflow configuration. | [Source reviewed](https://openenvision.github.io/GameMap/research/akolaarthurali/everything-claude-code-CLAUDE-CODE-GAME-ENHANCER-2/) |

</details>

<details>
<summary><strong>Engine, simulation, networking and rendering components · 31 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [mrdoob/three.js](https://github.com/mrdoob/three.js) | General-purpose JavaScript 3D library with WebGL/WebGPU renderers and SVG/CSS3D addons, plus examples and documentation. | [Source reviewed](https://openenvision.github.io/GameMap/research/mrdoob/three.js/) |
| [BabylonJS/Babylon.js](https://github.com/BabylonJS/Babylon.js) | JavaScript/TypeScript game and rendering engine with a playground, typed npm packages, documentation and an exporter ecosystem. | [Source reviewed](https://openenvision.github.io/GameMap/research/BabylonJS/Babylon.js/) |
| [playcanvas/engine](https://github.com/playcanvas/engine) | WebGL2/WebGPU game and graphics runtime supporting 3D applications, Gaussian splats, XR and browser delivery. | [Source reviewed](https://openenvision.github.io/GameMap/research/playcanvas/engine/) |
| [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | React renderer for Three.js, expressing scenes as reusable interactive components integrated with React state and lifecycle. | [Source reviewed](https://openenvision.github.io/GameMap/research/pmndrs/react-three-fiber/) |
| [pmndrs/drei](https://github.com/pmndrs/drei) | Collection of reusable helpers and ready-made abstractions for React Three Fiber, using the standalone three-stdlib package. | [Source reviewed](https://openenvision.github.io/GameMap/research/pmndrs/drei/) |
| [enable3d/enable3d](https://github.com/enable3d/enable3d) | TypeScript framework adding Ammo.js physics to Three.js and 3D functionality to Phaser 3, with standalone packages and examples. | [Source reviewed](https://openenvision.github.io/GameMap/research/enable3d/enable3d/) |
| [pmndrs/react-three-rapier](https://github.com/pmndrs/react-three-rapier) | React Three Fiber wrapper for Rapier WASM physics, exposing rigid bodies, colliders, joints, events and debugging helpers. | [Source reviewed](https://openenvision.github.io/GameMap/research/pmndrs/react-three-rapier/) |
| [dimforge/rapier.js](https://github.com/dimforge/rapier.js) | Archived former repository for official Rapier JavaScript bindings; its README now points to the main Rapier repository's typescript directory. | [Source reviewed](https://openenvision.github.io/GameMap/research/dimforge/rapier.js/) |
| [pmndrs/cannon-es](https://github.com/pmndrs/cannon-es) | Type-safe ESM/CommonJS fork of cannon.js with tree shaking, trigger bodies, collision/force corrections and modern packaging. | [Source reviewed](https://openenvision.github.io/GameMap/research/pmndrs/cannon-es/) |
| [kripken/ammo.js](https://github.com/kripken/ammo.js) | Emscripten port of Bullet physics to JavaScript/WASM, with rigid-body, soft-body, heightmap and vehicle examples. | [Source reviewed](https://openenvision.github.io/GameMap/research/kripken/ammo.js/) |
| [vanruesc/postprocessing](https://github.com/pmndrs/postprocessing) | Three.js postprocessing library with an effect composer, merged fullscreen effects, color-management guidance and antialiasing/bloom/blur effects. | [Source reviewed](https://openenvision.github.io/GameMap/research/vanruesc/postprocessing/) |
| [gkjohnson/three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) | Bounding-volume-hierarchy acceleration for Three.js raycasting and spatial queries, with shape casts, skinned geometry and worker generation examples. | [Source reviewed](https://openenvision.github.io/GameMap/research/gkjohnson/three-mesh-bvh/) |
| [Mugen87/yuka](https://github.com/Mugen87/yuka) | Engine-independent JavaScript game-AI library for agents, steering, navigation meshes, perception, triggers, fuzzy logic and JSON state serialization. | [Source reviewed](https://openenvision.github.io/GameMap/research/Mugen87/yuka/) |
| [ecsyjs/ecsy](https://github.com/ecsyjs/ecsy) | Experimental JavaScript ECS framework with scoped worlds, reactive queries, ordered systems and pooled entities/components. | [Source reviewed](https://openenvision.github.io/GameMap/research/ecsyjs/ecsy/) |
| [NateTheGreatt/bitECS](https://github.com/NateTheGreatt/bitECS) | Minimal data-oriented TypeScript ECS with queries, relational entities, serialization and thread-friendly architecture. | [Source reviewed](https://openenvision.github.io/GameMap/research/NateTheGreatt/bitECS/) |
| [pmndrs/miniplex](https://github.com/pmndrs/miniplex) | Independently verified alternative hmans/miniplex is a TypeScript entity manager using plain JavaScript objects, archetypal queries and optional React bindings. | [Unavailable](https://openenvision.github.io/GameMap/research/pmndrs/miniplex/) |
| [Yomotsu/camera-controls](https://github.com/yomotsu/camera-controls) | Three.js orbit-style camera controller with smooth transitions, dolly/pan, framing, boundaries and configurable mouse/touch interaction. | [Source reviewed](https://openenvision.github.io/GameMap/research/Yomotsu/camera-controls/) |
| [pmndrs/three-stdlib](https://github.com/pmndrs/three-stdlib) | Standalone TypeScript packaging of Three.js example utilities for ESM/CommonJS, with browser, worker and Node support. | [Source reviewed](https://openenvision.github.io/GameMap/research/pmndrs/three-stdlib/) |
| [jrouwe/JoltPhysics.js](https://github.com/jrouwe/JoltPhysics.js) | Emscripten bindings for Jolt Physics offering WASM, asm.js, debug and multithreaded builds with the C++-style interface. | [Source reviewed](https://openenvision.github.io/GameMap/research/jrouwe/JoltPhysics.js/) |
| [colyseus/colyseus](https://github.com/colyseus/colyseus) | Authoritative multiplayer framework for Node.js with client SDKs, room matchmaking and state synchronization. | [Source reviewed](https://openenvision.github.io/GameMap/research/colyseus/colyseus/) |
| [geckosio/geckos.io](https://github.com/geckosio/geckos.io) | WebRTC data-channel transport for real-time client/server communication over UDP, using a Node.js server and browser clients. | [Source reviewed](https://openenvision.github.io/GameMap/research/geckosio/geckos.io/) |
| [nengi/nengi](https://github.com/nengi/nengi) | Independently verified alternative timetocode/nengi is a Node.js/HTML5 multiplayer networking engine with binary state snapshots, interpolation, client prediction and lag compensation. | [Unavailable](https://openenvision.github.io/GameMap/research/nengi/nengi/) |
| [lance-gg/lance](https://github.com/lance-gg/lance) | Node.js multiplayer server/client framework with binary WebSocket networking, interpolation, prediction/re-enactment and debugging tools. | [Source reviewed](https://openenvision.github.io/GameMap/research/lance-gg/lance/) |
| [networked-aframe/networked-aframe](https://github.com/networked-aframe/networked-aframe) | A-Frame framework for multi-user web VR with component synchronization and WebRTC/WebSocket adapters, including voice/video support. | [Source reviewed](https://openenvision.github.io/GameMap/research/networked-aframe/networked-aframe/) |
| [ZyFou/ProceduralTerrains](https://github.com/ZyFou/ProceduralTerrains) | React/Three.js GPU terrain-authoring studio with tiled/infinite/planet modes, noise layers, real-world terrain, exports and Unity/Blender integrations. | [Source reviewed](https://openenvision.github.io/GameMap/research/ZyFou/ProceduralTerrains/) |
| [IceCreamYou/THREE.Terrain](https://github.com/IceCreamYou/THREE.Terrain) | Three.js procedural terrain library with noise/fractal generators, filtering, seeded randomness, mesh scattering and import/export helpers. | [Source reviewed](https://openenvision.github.io/GameMap/research/IceCreamYou/THREE.Terrain/) |
| [MavonEngine/Core](https://github.com/MavonEngine/Core) | Early TypeScript/Three.js game-engine framework combining Rapier physics, geckos.io networking, shared client/server entities and editor/debugging features. | [Source reviewed](https://openenvision.github.io/GameMap/research/MavonEngine/Core/) |
| [hyperfy-xyz/hyperfy-ref](https://github.com/hyperfy-xyz/hyperfy-ref) | Older Hyperfy reference implementation with server and website packages; metadata identifies hyperfy-xyz/hyperfy as its current successor. | [Source reviewed](https://openenvision.github.io/GameMap/research/hyperfy-xyz/hyperfy-ref/) |
| [hyperfy-io/hyperfy-recipes](https://github.com/hyperfy-io/hyperfy-recipes) | Hyperfy SDK examples for synchronized elevators/doors, NPC dialogue, proximity video, teleporters and blockchain interactions. | [Source reviewed](https://openenvision.github.io/GameMap/research/hyperfy-io/hyperfy-recipes/) |
| [tcm390/eliza-3d-hyperfy-starter](https://github.com/tcm390/eliza-3d-hyperfy-starter) | Prototype bridge allowing an Eliza agent to connect to a Hyperfy world like a user, with a custom Hyperfy client/plugin wrapper. | [Source reviewed](https://openenvision.github.io/GameMap/research/tcm390/eliza-3d-hyperfy-starter/) |
| [HowieDuhzit/Hyperfy-Tools](https://github.com/HowieDuhzit/Hyperfy-Tools) | Blender addon for Hyperfy assets, providing rigid-body/LOD/collider setup, Mixamo/VRM rig conversion, GLB export, snap points and batch renaming. | [Source reviewed](https://openenvision.github.io/GameMap/research/HowieDuhzit/Hyperfy-Tools/) |

</details>

<details>
<summary><strong>Classic projects and ports · 10 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [BKcore/HexGL](https://github.com/BKcore/HexGL) | Futuristic HTML5 racing game with public stable source and separate full-resolution texture assets. | [Source reviewed](https://openenvision.github.io/GameMap/research/BKcore/HexGL/) |
| [CodeArtemis/TriggerRally](https://github.com/CodeArtemis/TriggerRally) | Client-side rally racing game storing tracks and runs in IndexedDB and exchanging them as JSON; current README says online features are unavailable. | [Source reviewed](https://openenvision.github.io/GameMap/research/CodeArtemis/TriggerRally/) |
| [kripken/BananaBread](https://github.com/kripken/BananaBread) | Emscripten web port of Cube 2/Sauerbraten with bot combat, visual effects and an integrated editor; development has stopped in favor of the Sour continuation. | [Source reviewed](https://openenvision.github.io/GameMap/research/kripken/BananaBread/) |
| [cfoust/sour](https://github.com/cfoust/sour) | Sauerbraten server and web client that bridge browser/mobile players with native desktop clients, using Emscripten, WebGL2, Go and a React frontend. | [Source reviewed](https://openenvision.github.io/GameMap/research/cfoust/sour/) |
| [phoboslab/q1k3](https://github.com/phoboslab/q1k3) | Compact 2021 js13k FPS with two levels, enemies, three weapons, procedural textures, dynamic lighting and spatial audio. | [Source reviewed](https://openenvision.github.io/GameMap/research/phoboslab/q1k3/) |
| [Triang3l/WebQuake](https://github.com/Triang3l/WebQuake) | HTML5/WebGL Quake source port with a Node.js dedicated server and cross-play with native Quake clients, requiring user-supplied game data. | [Source reviewed](https://openenvision.github.io/GameMap/research/Triang3l/WebQuake/) |
| [turol/webquake2](https://github.com/turol/webquake2) | Emscripten port of Quake II/R1Q2 with browser WebGL/WebSocket support and native dedicated-server builds. | [Source reviewed](https://openenvision.github.io/GameMap/research/turol/webquake2/) |
| [lrusso/Quake3](https://github.com/lrusso/Quake3) | Quake III Arena port targeting pre-ES2015 JavaScript/asm.js without WebAssembly, loading user-selected PK3 game data. | [Source reviewed](https://openenvision.github.io/GameMap/research/lrusso/Quake3/) |
| [swift502/Sketchbook](https://github.com/swift502/Sketchbook) | Archived Three.js/cannon.js third-person playground with character controls, cars, aircraft and Blender-authored GLB scenes. | [Source reviewed](https://openenvision.github.io/GameMap/research/swift502/Sketchbook/) |
| [threejs-games/threejs-games.github.io](https://github.com/threejs-games/threejs-games.github.io) | Legacy collection of reusable Three.js game components and tutorial-derived examples, pointing readers to a newer Partisan Games repository. | [Source reviewed](https://openenvision.github.io/GameMap/research/threejs-games/threejs-games.github.io/) |

</details>

<details>
<summary><strong>World of ClaudeCraft-related candidates · 7 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [Humpalumps/world-of-claudecraft](https://github.com/Humpalumps/world-of-claudecraft) | A public fork of levy-street/world-of-claudecraft carrying the same browser MMO, deterministic simulation, server, and headless-environment documentation. | [Source reviewed](https://openenvision.github.io/GameMap/research/Humpalumps/world-of-claudecraft/) |
| [MarshalX/world-of-claudecraft-addons](https://github.com/MarshalX/world-of-claudecraft-addons) | An external userscript addon platform with an in-game marketplace, combat/inventory UI extensions, typed APIs, and a development harness. | [Source reviewed](https://openenvision.github.io/GameMap/research/MarshalX/world-of-claudecraft-addons/) |
| [yoefun/world-of-claudecraft-rs](https://github.com/yoefun/world-of-claudecraft-rs) | The current default tree contains only a one-line README naming world-of-claudecraft-rs. | [Metadata only](https://openenvision.github.io/GameMap/research/yoefun/world-of-claudecraft-rs/) |
| [u2/world-of-claudecraft-mcp](https://github.com/u2/world-of-claudecraft-mcp) | An MCP adapter for the official headless game environment that turns numeric observations into readable state and exposes named action/reset tools. | [Source reviewed](https://openenvision.github.io/GameMap/research/u2/world-of-claudecraft-mcp/) |
| [remontsuri/world-of-claudecraft-agent](https://github.com/remontsuri/world-of-claudecraft-agent) | The supplied game-agent repository could not be inspected at its requested GitHub address. | [Unavailable](https://openenvision.github.io/GameMap/research/remontsuri/world-of-claudecraft-agent/) |
| [wrkrdev/world-of-claudecraft-wrkr-demo](https://github.com/wrkrdev/world-of-claudecraft-wrkr-demo) | The supplied WRKR demo repository could not be inspected at its requested GitHub address. | [Unavailable](https://openenvision.github.io/GameMap/research/wrkrdev/world-of-claudecraft-wrkr-demo/) |
| [slonce70/world-of-claudecraft-claude-bot](https://github.com/slonce70/world-of-claudecraft-claude-bot) | A Node/WebSocket game bot with questing, combat, healing, reconnect behavior, optional coordinated fleets, and a live dashboard. | [Source reviewed](https://openenvision.github.io/GameMap/research/slonce70/world-of-claudecraft-claude-bot/) |

</details>

<details>
<summary><strong>Further discovery lists · 3 records</strong></summary>

| Repository | Purpose and scope | Review record |
| --- | --- | --- |
| [michelpereira/awesome-open-source-games](https://github.com/michelpereira/awesome-open-source-games) | A curated catalog of source-available games, engines, maps, addons, and related resources across browser, native, and mobile platforms. | [Source reviewed](https://openenvision.github.io/GameMap/research/michelpereira/awesome-open-source-games/) |
| [leereilly/games](https://github.com/leereilly/games) | A historical catalog of GitHub-hosted games, engines, maps, addons, and related projects across platforms. | [Source reviewed](https://openenvision.github.io/GameMap/research/leereilly/games/) |
| [Symbitic/awesome-babylonjs](https://github.com/Symbitic/awesome-babylonjs) | A community-curated index of Babylon.js documentation, playgrounds, demos, scenes, games, examples, and tools. | [Source reviewed](https://openenvision.github.io/GameMap/research/Symbitic/awesome-babylonjs/) |

</details>

Collection provenance: [the original WorldEngine research index](https://github.com/OpenEnvision/WorldEngine/blob/305e5139425ed1de26eb25c3ca9a200813501979/docs/research/cadle-like-repositories.md) (212 candidates, plus Cadle as a separate reference) and the bundled source-review ledger. [Browse evidence and qualifications](https://openenvision.github.io/GameMap/research/) · [Structured ledger](data/repository-research.json)

<a id="papers"></a>

## Papers and research references

All **483 references**, listed once by primary research role. The website supports overlapping roles and filters for year, code, project pages, and demos. Its main-paper filter includes **451 preprints, conference papers, and journal papers**, plus **1 survey and 5 technical reports**: **457 papers** in total. The remaining **26 related sources** include books, a book chapter, blogs, documentation, repositories, product pages, and benchmark pages.

Titles open the original publication or source. **Open-source** means an explicit open-source license was established; **Source available** means public code without an established open-source license. **Restricted**, **Not released**, **No official code found**, and **Unverified** preserve distinct access findings. “No official code found” is a scoped review result, not a claim that code cannot exist elsewhere. Implementation links appear only for repositories explicitly classified as research implementations; indexes and project websites are not implementation code.

[Browse papers and artifact filters](https://openenvision.github.io/GameMap/papers/) · [Download JSON](data/papers.json) · [Download BibTeX](data/papers.bib)

<details>
<summary><strong>Design and planning · 54 references</strong></summary>

| Paper / original source | Year · type | Code availability |
| --- | --- | --- |
| [AutoBG: A board game design assistant with interactive ideation, iterative rulebook generation, and individualized feedback](https://arxiv.org/abs/2606.01976v2) | 2026 · Preprint | No official code found |
| [CubePart: An open-vocabulary part-controllable 3D generator](https://arxiv.org/abs/2605.28763v1) | 2026 · Preprint | Source available · [Implementation](https://github.com/Roblox/cube) |
| [LLMs are the ideal candidate for mixed-initiative game design pillar workflows](https://arxiv.org/abs/2605.09767) | 2026 · Preprint | No official code found |
| [Mortar: Evolving mechanics for automatic game design](https://doi.org/10.1145/3795095.3805100) | 2026 · Conference | Unverified |
| [Multiverse: Language-Conditioned Multi-Game Level Blending via Shared Representation](https://arxiv.org/abs/2603.26782v2) | 2026 · Preprint | No official code found |
| [RPGAgent: Driving coherent story-to-play generation with an LLM-based multi-agent system](https://doi.org/10.1145/3772318.3790326) | 2026 · Conference | Unverified |
| [WorldSculpt: Generating compositional worlds from grounded videos](https://arxiv.org/abs/2609.05416v2) | 2026 · Preprint | Source available · [Implementation](https://github.com/AlayaLab/WorldSculpt) |
| [A database-driven framework for 3D level generation with LLMs](https://doi.org/10.1609/aiide.v21i1.36840) | 2025 · Conference | No official code found |
| [Audio2Face-3D: ACE Unreal Plugin](https://docs.nvidia.com/ace/latest/workflows/kairos/ace-unreal-plugin-audio2face.html) | 2025 · Documentation | Unverified |
| [Cardiverse: Harnessing LLMs for Novel Card Game Prototyping](https://arxiv.org/abs/2502.07128) | 2025 · Conference | Open-source · [Implementation](https://github.com/danruili/Cardiverse) |
| [Conversational interactions with procedural generators using large language models](https://doi.org/10.1145/3723498.3723788) | 2025 · Conference | Unverified |
| [DreamGarden: A Designer Assistant for Growing Games from a Single Prompt](https://doi.org/10.1145/3706598.3714233) | 2025 · Conference | No official code found |
| [LLMs4PCG 2025: Competition Rules and Evaluation Platform](https://chatgpt4pcg.github.io/2025-llms4pcg/) | 2025 · Documentation | No official code found |
| [Moonshine: Distilling game content generators into steerable generative models](https://doi.org/10.1609/aaai.v39i13.33571) | 2025 · Conference | No official code found |
| [Pixie: Code-level mechanic generation for game designers](https://doi.org/10.1609/aiide.v21i1.36824) | 2025 · Conference | Source available |
| [ScriptDoctor: Automatic Generation of PuzzleScript Games via Large Language Models and Tree Search](https://doi.org/10.1109/CoG64752.2025.11114269) | 2025 · Conference | No official code found |
| [Text-to-level diffusion models with various text encoders for Super Mario Bros](https://doi.org/10.1609/aiide.v21i1.36815) | 2025 · Conference | Open-source · [Implementation](https://github.com/schrum2/MarioDiffusion) |
| [UnrealLLM: Towards highly controllable and interactable 3D scene generation by LLM-powered procedural content generation](https://doi.org/10.18653/v1/2025.findings-acl.994) | 2025 · Conference | No official code found |
| [Word2Minecraft: Generating 3D game levels through large language models](https://arxiv.org/abs/2503.16536) | 2025 · Preprint | Unverified |
| [ChatGPT4PCG 2 Competition: Prompt Engineering for Science Birds Level Generation](https://doi.org/10.1109/CoG60054.2024.10645641) | 2024 · Conference | No official code found |
| [DreamCraft: Text-guided generation of functional 3D environments in Minecraft](https://doi.org/10.1145/3649921.3649943) | 2024 · Conference | No official code found |
| [Game generation via large language models](https://doi.org/10.1109/CoG60054.2024.10645597) | 2024 · Conference | No official code found |
| [GAVEL: Generating Games Via Evolution and Language Models](https://doi.org/10.52202/079017-3515) | 2024 · Conference | Source available · [Implementation](https://github.com/gdrtodd/gavel) |
| [NarrativeGenie: Generating narrative beats and dynamic storytelling with large language models](https://doi.org/10.1609/aiide.v20i1.31868) | 2024 · Conference | No official code found |
| [Ontologically faithful generation of non-player character dialogues](https://doi.org/10.18653/v1/2024.emnlp-main.520) | 2024 · Conference | Source available · [Implementation](https://github.com/nweir127/KNUDGE) |
| [Procedural content generation in games: A survey with insights on emerging LLM integration](https://doi.org/10.1609/aiide.v20i1.31877) | 2024 · Conference | No official code found |
| [Procedural level generation with diffusion models from a single example](https://doi.org/10.1609/aaai.v38i9.28865) | 2024 · Conference | Unverified |
| [ChatGPT and other large language models as evolutionary engines for online interactive collaborative game design](https://doi.org/10.1145/3583131.3590351) | 2023 · Conference | No official code found |
| [ChatGPT4PCG Competition: Character-like Level Generation for Science Birds](https://doi.org/10.1109/CoG57401.2023.10333206) | 2023 · Conference | No official code found |
| [Generating Video Game Scripts with Style](https://aclanthology.org/2023.nlp4convai-1.11/) | 2023 · Conference | No official code found |
| [Level Generation Through Large Language Models](https://doi.org/10.1145/3582437.3587211) | 2023 · Conference | No official code found |
| [MarioGPT: Open-Ended Text2Level Generation through Large Language Models](https://arxiv.org/abs/2302.05981) | 2023 · Conference | Open-source · [Implementation](https://github.com/shyamsn97/mario-gpt) |
| [Practical PCG Through Large Language Models](https://doi.org/10.1109/CoG57401.2023.10333197) | 2023 · Conference | No official code found |
| [SceneCraft: Automating interactive narrative scene generation in digital games with large language models](https://doi.org/10.1609/aiide.v19i1.27504) | 2023 · Conference | No official code found |
| [The convergence of AI and creativity: Introducing Ghostwriter](https://news.ubisoft.com/en-gb/article/7Cm07zbBGy4Xml6WgYi25d/the-convergence-of-ai-and-creativity-introducing-ghostwriter) | 2023 · Blog | No official code found |
| [On mixed-initiative content creation for video games](https://doi.org/10.1109/TG.2022.3176215) | 2022 · Journal | Unverified |
| [Puck: A slow and personal automated game designer](https://doi.org/10.1609/aiide.v18i1.21968) | 2022 · Conference | No official code found |
| [Fine-tuning GPT-2 on annotated RPG quests for NPC dialogue generation](https://doi.org/10.1145/3472538.3472595) | 2021 · Conference | Unverified |
| [SuSketch: Surrogate Models of Gameplay as a Design Assistant](https://arxiv.org/abs/2103.11726) | 2021 · Preprint | Source available · [Implementation](https://github.com/PanMig/Susketch) |
| [PCGRL: Procedural content generation via reinforcement learning](https://doi.org/10.1609/aiide.v16i1.7416) | 2020 · Conference | Open-source · [Implementation](https://github.com/amidos2006/gym-pcgrl) |
| [Evolving Mario levels in the latent space of a deep convolutional generative adversarial network](https://arxiv.org/abs/1805.00728) | 2018 · Conference | Source available · [Implementation](https://github.com/CIGbalance/DagstuhlGAN) |
| [Procedural content generation via machine learning (PCGML)](https://arxiv.org/abs/1702.00539) | 2018 · Journal | No official code found |
| [The ANGELINA videogame design system—part i](https://doi.org/10.1109/TCIAIG.2016.2520256) | 2017 · Journal | Unverified |
| [Super Mario as a string: Platformer level generation via LSTMs](https://doi.org/10.26503/dl.v2016i1.752) | 2016 · Conference | No official code found |
| [Procedural Personas as Critics for Dungeon Generation](https://doi.org/10.1007/978-3-319-16549-3_27) | 2015 · Conference | No official code found |
| [Automatic game design via mechanic generation](https://doi.org/10.1609/aaai.v28i1.8788) | 2014 · Conference | No official code found |
| [Mechanic miner: Reflection-driven game mechanic discovery and level design](https://doi.org/10.1007/978-3-642-37192-9_29) | 2013 · Conference | No official code found |
| [Sentient sketchbook: Computer-aided game level authoring](https://www.antoniosliapis.com/papers/sentient_sketchbook.pdf) | 2013 · Conference | No official code found |
| [Answer set programming for procedural content generation: A design space approach](https://doi.org/10.1109/TCIAIG.2011.2158545) | 2011 · Journal | Unverified |
| [Search-based procedural content generation: A taxonomy and survey](https://doi.org/10.1109/TCIAIG.2011.2148116) | 2011 · Journal | Unverified |
| [Tanagra: Reactive planning and constraint solving for mixed-initiative level design](https://doi.org/10.1109/TCIAIG.2011.2159716) | 2011 · Journal | Unverified |
| [Evolutionary game design](https://doi.org/10.1109/TCIAIG.2010.2041928) | 2010 · Journal | Unverified |
| [Towards automated game design](https://doi.org/10.1007/978-3-540-74782-6_54) | 2007 · Conference | No official code found |
| [Procedural level design for platform games](https://doi.org/10.1609/aiide.v2i1.18755) | 2006 · Conference | No official code found |

</details>

<details>
<summary><strong>Build and generation · 36 references</strong></summary>

| Paper / original source | Year · type | Code availability |
| --- | --- | --- |
| [Agentic game development as a verifiable trajectory data engine for scaling world models](https://arxiv.org/abs/2608.25518) | 2026 · Preprint | No official code found |
| [AutoUE: Automated Generation of 3D Games in Unreal Engine via Multi-Agent Systems](https://doi.org/10.18653/v1/2026.findings-acl.111) | 2026 · Conference | Open-source · [Implementation](https://github.com/Pluto156/AutoUE) |
| [Code4Scene: Benchmarking Coding Agents for Constructing and Editing 3D Scenes](https://arxiv.org/abs/2609.36777) | 2026 · Preprint | Open-source |
| [Distilling game code world model generation into lightweight large language models](https://arxiv.org/abs/2605.24375) | 2026 · Preprint | No official code found |
| [Game-Creation-Agents: Autonomous Game Production](https://arxiv.org/abs/2610.16776) | 2026 · Preprint | Open-source · [Implementation](https://github.com/Tencent/Game-Creation-Agents) |
| [GameCraft-Bench: Can Agents Build Playable Games End-to-End in a Real Game Engine?](https://arxiv.org/abs/2606.17861) | 2026 · Preprint | Open-source |
| [GameCraft-Bench: Official updated results](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/README.md) | 2026 · Repository | Open-source |
| [GameDevBench: Evaluating Agentic Capabilities Through Game Development](https://arxiv.org/abs/2602.11103) | 2026 · Conference | Open-source |
| [GameDevBench: Official repository and results](https://github.com/waynchi/gamedevbench/blob/3a80dfdfd01209485185909cb88ac1687dff925e/results/leaderboard.csv) | 2026 · Repository | Open-source |
| [GameEngineBench: Evaluating Coding Agents on Real C++ Runtime Environments](https://arxiv.org/abs/2607.03525) | 2026 · Preprint | Unverified |
| [GameXpert-Bench: How Far Are Coding Agents from Expert Game Development?](https://arxiv.org/abs/2608.21833) | 2026 · Preprint | Not released |
| [GUI Agents for Continual Game Generation](https://arxiv.org/abs/2605.28258) | 2026 · Preprint | Open-source |
| [JAMER: Project-Level Code Framework Dataset and Benchmark on Professional Game Engines](https://arxiv.org/abs/2606.19830) | 2026 · Preprint | No official code found |
| [LEGO-Anything: Coding Agents for 3D Scene Reconstruction](https://arxiv.org/abs/2609.36380) | 2026 · Preprint | No official code found |
| [Mage: Multi-axis evaluation of LLM-generated executable game scenes beyond compile-pass rate](https://arxiv.org/abs/2605.07342) | 2026 · Preprint | No official code found |
| [OpenGame: Open Agentic Coding for Games](https://arxiv.org/abs/2604.18394) | 2026 · Preprint | Open-source |
| [OSSGameBench: A Large-Scale Dataset of Development Activities in Open-Source Video Games](https://doi.org/10.1145/3793302.3793313) | 2026 · Conference | No official code found |
| [Playco cut manual fixes 50% prototyping games with GPT-6 Astra](https://openai.com/index/playco-game-prototyping-with-astra/) | 2026 · Blog | Unverified |
| [PlayCoder: Making LLM-generated GUI code playable](https://arxiv.org/abs/2604.19742) | 2026 · Preprint | Unverified |
| [Recursive Game Creator: An Agentic Product-Level Experience-Oriented Game Harness](https://arxiv.org/abs/2610.08621) | 2026 · Preprint | Open-source · [Implementation](https://github.com/IMBALDY/RecursiveGameCreator) |
| [RSIGame: Autonomous Agentic Game Development with Recursive Self-improvement](https://arxiv.org/abs/2609.39045) | 2026 · Preprint | Open-source |
| [SceneAssistant: A Visual Feedback Agent for Open-Vocabulary 3D Scene Generation](https://arxiv.org/abs/2603.12238) | 2026 · Preprint | Source available · [Implementation](https://github.com/ROUJINN/SceneAssistant) |
| [SceneSmith: Agentic Generation of Simulation-Ready Indoor Scenes](https://arxiv.org/abs/2602.09153) | 2026 · Conference | Open-source · [Implementation](https://github.com/nepfaff/scenesmith) |
| [SimWorlds: A Multi-Agent System for Dynamic 3D Scene Creation](https://arxiv.org/abs/2607.01766) | 2026 · Preprint | No official code found |
| [Unity’s AI tools in beta: What’s included and how to get started](https://unity.com/blog/unity-ai-how-to-get-started) | 2026 · Blog | No official code found |
| [WebGameBench: Requirement-to-Application Evaluation for Coding Agents via Browser-Native Games](https://arxiv.org/abs/2605.17637) | 2026 · Preprint | No official code found |
| [90% Faster, 100% Code-Free: MLLM-Driven Zero-Code 3D Game Development](https://arxiv.org/abs/2509.26161) | 2025 · Preprint | Source available · [Implementation](https://github.com/yxwan123/UniGen) |
| [Multi-Agent Game Generation and Evaluation via Audio-Visual Recordings](https://arxiv.org/abs/2508.00632) | 2025 · Preprint | Open-source · [Implementation](https://github.com/SamsungSAILMontreal/AVR-Eval-Agent) |
| [STORY2GAME: Generating (almost) everything in an interactive fiction game](https://arxiv.org/abs/2505.03547) | 2025 · Preprint | No official code found |
| [WonderWorld: Interactive 3D Scene Generation from a Single Image](https://arxiv.org/abs/2406.09394) | 2025 · Conference | Source available · [Implementation](https://github.com/KovenYu/WonderWorld) |
| [BlenderLLM: Training Large Language Models for Computer-Aided Design with Self-improvement](https://arxiv.org/abs/2412.14203) | 2024 · Preprint | Open-source · [Implementation](https://github.com/FreedomIntelligence/BlenderLLM) |
| [Holodeck: Language Guided Generation of 3D Embodied AI Environments](https://arxiv.org/abs/2312.09067) | 2024 · Conference | Open-source · [Implementation](https://github.com/allenai/Holodeck) |
| [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](https://doi.org/10.52202/079017-1601) | 2024 · Conference | Open-source · [Implementation](https://github.com/SWE-agent/SWE-agent) |
| [SWE-bench: Can language models resolve real-world GitHub issues?](https://proceedings.iclr.cc/paper_files/paper/2024/hash/edac78c3e300629acfe6cbe9ca88fb84-Abstract-Conference.html) | 2024 · Conference | Open-source |
| [Video2Game: Real-time, Interactive, Realistic and Browser-Compatible Environment from a Single Video](https://arxiv.org/abs/2404.09833) | 2024 · Conference | Open-source · [Implementation](https://github.com/video2game/video2game) |
| [GameGPT: Multi-agent Collaborative Framework for Game Development](https://arxiv.org/abs/2310.08067) | 2023 · Preprint | Not released |

</details>

<details>
<summary><strong>Runtime AI and interaction · 58 references</strong></summary>

| Paper / original source | Year · type | Code availability |
| --- | --- | --- |
| [Accelerating creation, powered by Roblox’s Cube foundation model](https://about.roblox.com/newsroom/2026/02/accelerating-creation-powered-roblox-cube-foundation-model) | 2026 · Blog | No official code found |
| [Adaptive level modification via player skill classification and large language models](https://doi.org/10.1038/s41598-026-63084-z) | 2026 · Journal | No official code found |
| [AI Dungeon: Product Overview](https://latitude.io/press) | 2026 · Product page | No official code found |
| [Book of Infinity: 1001 Nights: Demo and AI content disclosure](https://store.steampowered.com/app/2542850/1001_Nights/) | 2026 · Product page | No official code found |
| [How contextualized generative AI shapes player experience in games](https://doi.org/10.1016/j.entcom.2026.101194) | 2026 · Journal | No official code found |
| [IF:CARGO: LLM-based semantic compilation for AI-native rule programming games](https://arxiv.org/abs/2608.12195) | 2026 · Conference | No official code found |
| [LeagueBot: A voice LLM companion of cognitive and emotional support for novice players in competitive games](https://arxiv.org/abs/2602.01213) | 2026 · Preprint | No official code found |
| [Magpie: Real-Time World Renderer for Interactive Games](https://arxiv.org/abs/2608.27168) | 2026 · Technical report | No official code found |
| [Proact-VL: A proactive VideoLLM for real-time AI companions](https://arxiv.org/abs/2603.03447) | 2026 · Conference | Open-source · [Implementation](https://github.com/microsoft/AnthropomorphicIntelligence) |
| [SolarRenderer: Few-Step Generative Reference Rendering](https://enderfga.cn/data/solarrenderer.pdf) | 2026 · Technical report | Open-source · [Implementation](https://github.com/Enderfga/SolarRenderer) |
| [The double-edged sword of open-ended interaction: How LLM-driven NPCs affect players’ cognitive load and gaming experience](https://arxiv.org/abs/2604.10107) | 2026 · Preprint | No official code found |
| [When NPCs take their time: Token latency effects in LLM-driven game conversations](https://doi.org/10.1016/j.entcom.2026.101213) | 2026 · Journal | No official code found |
| [AnimeGamer: Infinite anime life simulation with next game state prediction](https://arxiv.org/abs/2504.01014) | 2025 · Conference | Source available · [Implementation](https://github.com/TencentARC/AnimeGamer) |
| [Can large language models capture video game engagement?](https://arxiv.org/abs/2502.04379) | 2025 · Preprint | No official code found |
| [Closing the loop in affect-driven game adaptation: A systematic review](https://arxiv.org/abs/2505.01351) | 2025 · Preprint | No official code found |
| [Drama Llama: An LLM-powered storylets framework for authorable responsiveness in interactive narrative](https://arxiv.org/abs/2501.09099v1) | 2025 · Preprint | No official code found |
| [Multi-Actor Generative Artificial Intelligence as a Game Engine](https://arxiv.org/abs/2507.08892v1) | 2025 · Preprint | No official code found |
| [Real-time world crafting: Generating structured game behaviors from natural language with large language models](https://arxiv.org/abs/2510.16952) | 2025 · Preprint | Open-source · [Implementation](https://github.com/austin-the-drake/real-time-world-crafting-wordplay-demo) |
| [Symbolically scaffolded play: Designing role-sensitive prompts for generative NPC dialogue](https://arxiv.org/abs/2510.25820) | 2025 · Preprint | No official code found |
| [This Will Be a Day Long Remembered: Speak with Darth Vader in Fortnite](https://www.fortnite.com/news/this-will-be-a-day-long-remembered-speak-with-darth-vader-in-fortnite?lang=en-US) | 2025 · Product page | Unverified |
| [Towards enhanced immersion and agency for LLM-based interactive drama](https://arxiv.org/abs/2502.17878) | 2025 · Preprint | Unverified |
| [Unbounded: A generative infinite game of character life simulation](https://arxiv.org/abs/2410.18975) | 2025 · Conference | No official code found |
| [Zero-shot reasoning: Personalized content generation without the cold start problem](https://doi.org/10.1109/TG.2024.3421590) | 2025 · Journal | Source available · [Implementation](https://github.com/dhafnar/match3) |
| [Affectively framework: Towards human-like affect-based agents](https://arxiv.org/abs/2407.18316) | 2024 · Preprint | No official code found |
| [Dynamic difficulty adjustment approaches in video games: a systematic literature review](https://doi.org/10.1007/s11042-024-18768-x) | 2024 · Journal | No official code found |
| [LLMs may not be human-level players, but they can be testers: Measuring game difficulty with LLM agents](https://arxiv.org/abs/2410.02829) | 2024 · Preprint | No official code found |
| [NVIDIA ACE & digital human technologies showcased in first game, Mecha BREAK](https://www.nvidia.com/en-us/geforce/news/mecha-break-nvidia-ace-nims-rtx-pc-laptop-games-apps/) | 2024 · Product page | No official code found |
| [PANGeA: Procedural artificial narrative using generative AI for turn-based, role-playing video games](https://doi.org/10.1609/aiide.v20i1.31876) | 2024 · Conference | Open-source · [Implementation](https://gitlab.com/humin-game-lab/pangea) |
| [Player-driven emergence in LLM-driven game narrative](https://doi.org/10.1109/CoG60054.2024.10645607) | 2024 · Conference | No official code found |
| [What’s the game, then? opportunities and challenges for runtime behavior generation](https://doi.org/10.1145/3654777.3676358) | 2024 · Conference | Unverified |
| [CALYPSO: LLMs as dungeon masters’ assistants](https://doi.org/10.1609/aiide.v19i1.27534) | 2023 · Conference | Open-source · [Implementation](https://github.com/northern-lights-province/calypso-aiide-artifact) |
| [Game difficulty adaptation and experience personalization: A literature review](https://doi.org/10.1080/10447318.2021.2020008) | 2023 · Journal | Unverified |
| [Language as reality: A co-creative storytelling game experience in 1001 Nights using generative AI](https://doi.org/10.1609/aiide.v19i1.27539) | 2023 · Conference | No official code found |
| [Personalized Quest and Dialogue Generation in Role-Playing Games: A Knowledge Graph- and Language Model-based Approach](https://doi.org/10.1145/3544548.3581441) | 2023 · Conference | Unverified |
| ["i want to see how smart this AI really is": Player mental model development of an adversarial AI player](https://doi.org/10.1145/3549482) | 2022 · Journal | Unverified |
| [Craft an iron sword: Dynamically generating interactive game characters by prompting large language models tuned on code](https://doi.org/10.18653/v1/2022.wordplay-1.3) | 2022 · Conference | Open-source · [Implementation](https://github.com/microsoft/interactive-minecraft-npcs) |
| [Player-centered AI for automatic game personalization: Open problems](https://arxiv.org/abs/2102.07548) | 2021 · Preprint | No official code found |
| [Dungeons & replicants: Automated game balancing via deep player behavior modeling](https://doi.org/10.1109/CoG47356.2020.9231958) | 2020 · Conference | Unverified |
| [Dynamic difficulty adjustment impact on players’ confidence](https://doi.org/10.1145/3290605.3300693) | 2019 · Conference | Unverified |
| [Learning to speak and act in a fantasy text adventure game](https://doi.org/10.18653/v1/D19-1062) | 2019 · Conference | Open-source · [Implementation](https://github.com/facebookresearch/LIGHT) |
| [Representation and frequency of player choice in player-oriented dynamic difficulty adjustment systems](https://doi.org/10.1145/3311350.3347165) | 2019 · Conference | Unverified |
| [Dynamic difficulty adjustment (DDA) in computer games: A review](https://doi.org/10.1155/2018/5681652) | 2018 · Journal | Unverified |
| [I’m glad you are on my side: How to design compelling game companions](https://doi.org/10.1145/3242671.3242709) | 2018 · Conference | Unverified |
| [Comparing effects of dynamic difficulty adjustment systems on video game experience](https://doi.org/10.1145/3116595.3116623) | 2017 · Conference | Unverified |
| [Dynamic difficulty adjustment for maximized engagement in digital games](https://doi.org/10.1145/3041021.3054170) | 2017 · Conference | Unverified |
| [Adaptation in digital games: The effect of challenge adjustment on player performance and experience](https://doi.org/10.1145/2793107.2793141) | 2015 · Conference | Unverified |
| [Interactive narrative: An intelligent systems approach](https://doi.org/10.1609/aimag.v34i1.2449) | 2013 · Journal | Unverified |
| [Emotion assessment from physiological signals for adaptation of game difficulty](https://doi.org/10.1109/TSMCA.2011.2116000) | 2011 · Journal | Unverified |
| [Experience-driven procedural content generation](https://doi.org/10.1109/T-AFFC.2011.6) | 2011 · Journal | Unverified |
| [Narrative planning: Balancing plot and character](https://doi.org/10.1613/jair.2989) | 2010 · Journal | No official code found |
| [Agency reconsidered](https://doi.org/10.26503/dl.v2009i1.369) | 2009 · Conference | No official code found |
| [User experience over time: An initial framework](https://doi.org/10.1145/1518701.1518814) | 2009 · Conference | Unverified |
| [Interactive storytelling: A player modelling approach](https://doi.org/10.1609/aiide.v3i1.18780) | 2007 · Conference | No official code found |
| [The motivational pull of video games: A self-determination theory approach](https://doi.org/10.1007/s11031-006-9051-8) | 2006 · Journal | No official code found |
| [Establishing and maintaining long-term human–computer relationships](https://doi.org/10.1145/1067860.1067867) | 2005 · Journal | Unverified |
| [Structuring content in the Façade interactive drama architecture](https://doi.org/10.1609/aiide.v1i1.18722) | 2005 · Conference | No official code found |
| [The case for dynamic difficulty adjustment in games](https://doi.org/10.1145/1178477.1178573) | 2005 · Conference | Unverified |
| [A preliminary poetics for interactive drama and games](https://doi.org/10.1076/digc.12.3.140.3224) | 2001 · Journal | Unverified |

</details>

<details>
<summary><strong>Play and act · 120 references</strong></summary>

| Paper / original source | Year · type | Code availability |
| --- | --- | --- |
| [A survey on large language model-based game agents](https://arxiv.org/abs/2404.02039) | 2026 · Journal | No official code found |
| [A team of Gemini 4 Argon agents beats Minecraft](https://arxiv.org/abs/2610.22319) | 2026 · Preprint | No official code found |
| [AgenticSTS: A bounded-memory testbed for long-horizon LLM agents](https://arxiv.org/abs/2607.02255v1) | 2026 · Preprint | Source available · [Implementation](https://github.com/AlayaLab/AgenticSTS) |
| [ARC-AGI-3: A new challenge for frontier agentic intelligence](https://arxiv.org/abs/2603.24621v2) | 2026 · Preprint | No official code found |
| [CASCADE: A cascading architecture for social coordination with controllable emergence at low cost](https://doi.org/10.1145/3772363.3798700) | 2026 · Conference | No official code found |
| [Claude Opus 5: Verified ARC-AGI results](https://arcprize.org/results/anthropic-claude-opus-5) | 2026 · Benchmark page | Unverified |
| [EMemBench: Interactive Benchmarking of Episodic Memory for VLM Agents](https://arxiv.org/abs/2601.16690) | 2026 · Preprint | Restricted |
| [GameVerse: Can vision-language models learn from video-based reflection?](https://arxiv.org/abs/2603.06656) | 2026 · Conference | Open-source · [Implementation](https://github.com/THUSI-Lab/GameVerse) |
| [GameWorld: Towards standardized and verifiable evaluation of multimodal game agents](https://arxiv.org/abs/2604.07429) | 2026 · Preprint | Unverified |
| [GPT-5.6 Series: Verified ARC-AGI results](https://arcprize.org/results/openai-gpt-5-6) | 2026 · Benchmark page | Unverified |
| [GPT-6 Astra: Verified ARC-AGI results](https://arcprize.org/results/openai-gpt-6-astra) | 2026 · Benchmark page | Unverified |
| [Grok 4.5: Verified ARC-AGI results](https://arcprize.org/results/xai-grok-4-5) | 2026 · Benchmark page | Unverified |
| [Grok 4.6: Verified ARC-AGI results](https://arcprize.org/results/xai-grok-4-6) | 2026 · Benchmark page | Unverified |
| [NitroGen: An open foundation model for generalist gaming agents](https://arxiv.org/abs/2601.02427) | 2026 · Conference | Source available · [Implementation](https://github.com/MineDojo/NitroGen) |
| [OmniGameArena: A Unified UE5 Benchmark for VLM Game Agents with Improvement Dynamics](https://arxiv.org/abs/2606.09826) | 2026 · Preprint | Open-source |
| [One policy, infinite NPCs: Persona-traceable shared RL policies for scalable game agents](https://arxiv.org/abs/2605.23652) | 2026 · Preprint | No official code found |
| [Orak: A foundational benchmark for training and evaluating LLM agents on diverse video games](https://arxiv.org/abs/2506.03610) | 2026 · Conference | Open-source |
| [PUBG: BATTLEGROUNDS patch notes—update 42.1](https://www.pubg.com/en/news/10179) | 2026 · Documentation | Unverified |
| [Q&A: How KRAFTON built PUBG Ally, a co-playable character powered by NVIDIA ACE](https://developer.nvidia.com/blog/how-krafton-built-pubg-ally-a-co-playable-character-powered-by-nvidia-ace/) | 2026 · Blog | Unverified |
| [S3Gym: Can LLMs turn self-testing and self-judging into self-improvement?](https://arxiv.org/abs/2608.31100v1) | 2026 · Preprint | No official code found |
| [Twin: Playing an unknown game with a test-time digital twin](https://arxiv.org/abs/2608.14490) | 2026 · Preprint | Open-source · [Implementation](https://github.com/Alexyskoutnev/TWIN-ARC-AGI-3) |
| [A survey on large language model-based social agents in game-theoretic scenarios](https://openreview.net/forum?id=CsoSWpR5xC) | 2025 · Journal | Unverified |
| [AgentSociety: Large-scale simulation of LLM-driven generative agents advances understanding of human behaviors and society](https://arxiv.org/abs/2502.08691) | 2025 · Preprint | Unverified |
| [BALROG: Benchmarking agentic LLM and VLM reasoning on games](https://arxiv.org/abs/2411.13543) | 2025 · Conference | Open-source |
| [CombatVLA: An efficient vision-language-action model for combat tasks in 3D action role-playing games](https://arxiv.org/abs/2503.09527) | 2025 · Conference | Source available · [Implementation](https://github.com/ChenVoid/CombatVLA) |
| [Cradle: Empowering Foundation Agents Towards General Computer Control](https://proceedings.mlr.press/v267/tan25h.html) | 2025 · Conference | Open-source · [Implementation](https://github.com/BAAI-Agents/Cradle) |
| [FlashAdventure: A benchmark for GUI agents solving full story arcs in diverse adventure games](https://doi.org/10.18653/v1/2025.emnlp-main.1192) | 2025 · Conference | Open-source · [Implementation](https://github.com/ahnjaewoo/FlashAdventure) |
| [Game-TARS: Pretrained foundation models for scalable generalist multimodal game agents](https://arxiv.org/abs/2510.23691) | 2025 · Preprint | No official code found |
| [Gran Turismo Sophy 2.1 arrives, adding support to custom races!](https://www.gran-turismo.com/us/news/00_4957003.html) | 2025 · Blog | No official code found |
| [JARVIS-1: Open-world multi-task agents with memory-augmented multimodal language models](https://doi.org/10.1109/TPAMI.2024.3511593) | 2025 · Journal | Source available · [Implementation](https://github.com/CraftJarvis/JARVIS-1) |
| [JARVIS-VLA: Post-training large-scale vision language models to play visual games with keyboards and mouse](https://doi.org/10.18653/v1/2025.findings-acl.920) | 2025 · Conference | Source available · [Implementation](https://github.com/CraftJarvis/JarvisVLA) |
| [Mastering diverse control tasks through world models](https://doi.org/10.1038/s41586-025-08744-2) | 2025 · Journal | Open-source · [Implementation](https://github.com/danijar/dreamerv3) |
| [MineDreamer: Learning to Follow Instructions via Chain-of-Imagination for Simulated-World Control](https://arxiv.org/abs/2403.12037v2) | 2025 · Conference | Open-source · [Implementation](https://github.com/Zhoues/MineDreamer) |
| [Pixels to Play: A Foundation Model for 3D Gameplay](https://arxiv.org/abs/2508.14295v1) | 2025 · Conference | No official code found |
| [PuzzleJAX: A Benchmark for Reasoning and Learning](https://arxiv.org/abs/2508.16821v1) | 2025 · Preprint | No official code found |
| [REGENT: A retrieval-augmented generalist agent that can act in-context in new environments](https://openreview.net/forum?id=dKfzQ8eL89) | 2025 · Conference | Open-source |
| [ROCKET-1: Mastering open-world interaction with visual-temporal context prompting](https://arxiv.org/abs/2410.17856) | 2025 · Conference | Source available · [Implementation](https://github.com/CraftJarvis/ROCKET-1) |
| [SIMA 2: A generalist embodied agent for virtual worlds](https://arxiv.org/abs/2512.04797) | 2025 · Preprint | No official code found |
| [TextArena](https://arxiv.org/abs/2504.11442) | 2025 · Preprint | Open-source · [Implementation](https://github.com/TextArena/TextArena) |
| [TextAtari: 100K frames game playing with language agents](https://arxiv.org/abs/2506.04098) | 2025 · Preprint | Source available · [Implementation](https://github.com/Lww007/Text-Atari-Agents) |
| [Training agents inside of scalable world models](https://arxiv.org/abs/2509.24527) | 2025 · Preprint | No official code found |
| [Ubisoft reveals Teammates—an AI experiment to change the game](https://news.ubisoft.com/en-us/article/3mWlITIuWuu0MoVuR6o8ps/ubisoft-reveals-teammates-an-ai-experiment-to-change-the-game) | 2025 · Blog | No official code found |
| [VideoGameBench: Can vision-language models complete popular video games?](https://arxiv.org/abs/2505.18134) | 2025 · Preprint | Source available · [Implementation](https://github.com/alexzhang13/videogamebench) |
| [A survey on game playing agents and large models: Methods, applications, and challenges](https://arxiv.org/abs/2403.10249) | 2024 · Preprint | Source available · [Implementation](https://github.com/holmeswww/AgentKit) |
| [Collaborative quest completion with LLM-driven non-player characters in Minecraft](https://arxiv.org/abs/2407.03460) | 2024 · Preprint | No official code found |
| [MindAgent: Emergent gaming interaction](https://doi.org/10.18653/v1/2024.findings-naacl.200) | 2024 · Conference | Source available · [Implementation](https://github.com/mindagent/mindagent) |
| [OmniJARVIS: Unified vision-language-action tokenization enables open-world instruction following agents](https://doi.org/10.52202/079017-2331) | 2024 · Conference | Not released |
| [Optimus-1: Hybrid multimodal memory empowered agents excel in long-horizon tasks](https://doi.org/10.52202/079017-1580) | 2024 · Conference | Source available · [Implementation](https://github.com/iLearn-Lab/NeurIPS24-Optimus-1) |
| [ProAgent: Building proactive cooperative agents with large language models](https://doi.org/10.1609/aaai.v38i16.29710) | 2024 · Conference | Open-source · [Implementation](https://github.com/PKU-Alignment/ProAgent) |
| [Project Sid: Many-agent simulations toward AI civilization](https://arxiv.org/abs/2411.00114) | 2024 · Preprint | No official code found |
| [Scaling instructable agents across many simulated worlds](https://arxiv.org/abs/2404.10179) | 2024 · Preprint | No official code found |
| [SwarmBrain: Embodied agent for real-time strategy game StarCraft II via large language models](https://arxiv.org/abs/2401.17749) | 2024 · Preprint | Source available · [Implementation](https://github.com/ramsayxiaoshao/SwarmBrain) |
| [VillagerAgent: A graph-based multi-agent framework for coordinating complex task dependencies in Minecraft](https://doi.org/10.18653/v1/2024.findings-acl.964) | 2024 · Conference | Source available · [Implementation](https://github.com/cnsdqd-dyb/VillagerAgent-Minecraft-multiagent-framework) |
| [Werewolf arena: A case study in LLM evaluation via social deduction](https://arxiv.org/abs/2407.13943) | 2024 · Preprint | Open-source · [Implementation](https://github.com/google/werewolf_arena) |
| [AvalonBench: Evaluating LLMs playing the game of Avalon](https://arxiv.org/abs/2310.05036) | 2023 · Preprint | Source available · [Implementation](https://github.com/jonathanmli/Avalon-LLM) |
| [Avalon’s game of thoughts: Battle against deception through recursive contemplation](https://arxiv.org/abs/2310.01320) | 2023 · Preprint | No official code found |
| [Describe, explain, plan and select: Interactive planning with large language models enables open-world multi-task agents](https://arxiv.org/abs/2302.01560) | 2023 · Conference | Source available · [Implementation](https://github.com/CraftJarvis/MC-Planner) |
| [Exploring large language models for communication games: An empirical study on Werewolf](https://arxiv.org/abs/2309.04658) | 2023 · Preprint | Unverified |
| [Generative agents: Interactive simulacra of human behavior](https://doi.org/10.1145/3586183.3606763) | 2023 · Conference | Open-source · [Implementation](https://github.com/joonspk-research/generative_agents) |
| [Ghost in the Minecraft: Generally Capable Agents for Open-World Environments via Large Language Models with Text-based Knowledge and Memory](https://arxiv.org/abs/2305.17144) | 2023 · Preprint | Not released · [Implementation](https://github.com/OpenGVLab/GITM) |
| [Language agents with reinforcement learning for strategic play in the Werewolf game](https://arxiv.org/abs/2310.18940) | 2023 · Preprint | No official code found |
| [Learning zero-shot cooperation with humans, assuming humans are biased](https://arxiv.org/abs/2302.01605) | 2023 · Preprint | Open-source · [Implementation](https://github.com/samjia2000/HSP) |
| [Skill reinforcement learning and planning for open-world long-horizon tasks](https://arxiv.org/abs/2303.16563) | 2023 · Preprint | Open-source · [Implementation](https://github.com/PKU-RL/Plan4MC) |
| [SPRING: Studying the paper and reasoning to play games](https://arxiv.org/abs/2305.15486) | 2023 · Preprint | Unverified |
| [STEVE-1: A generative model for text-to-behavior in Minecraft](https://arxiv.org/abs/2306.00937) | 2023 · Preprint | Unverified |
| [Voyager: An Open-Ended Embodied Agent with Large Language Models](https://arxiv.org/abs/2305.16291) | 2023 · Preprint | Open-source · [Implementation](https://github.com/MineDojo/Voyager) |
| [A generalist agent](https://arxiv.org/abs/2205.06175) | 2022 · Journal | No official code found |
| [A survey of ad hoc teamwork research](https://arxiv.org/abs/2202.10450) | 2022 · Preprint | No official code found |
| [Benchmarking the Spectrum of Agent Capabilities](https://arxiv.org/abs/2109.06780) | 2022 · Conference | Unverified |
| [Human-level play in the game of Diplomacy by combining language models with strategic reasoning](https://doi.org/10.1126/science.ade9097) | 2022 · Journal | Open-source · [Implementation](https://github.com/facebookresearch/diplomacy_cicero) |
| [MineDojo: Building open-ended embodied agents with internet-scale knowledge](https://arxiv.org/abs/2206.08853) | 2022 · Conference | Open-source · [Implementation](https://github.com/MineDojo/MineDojo) |
| [Multi-game decision transformers](https://arxiv.org/abs/2205.15241) | 2022 · Conference | Unverified |
| [Outracing champion Gran Turismo drivers with deep reinforcement learning](https://doi.org/10.1038/s41586-021-04357-7) | 2022 · Journal | No official code found |
| [Retrospective on the 2021 MineRL BASALT competition on learning from human feedback](https://proceedings.mlr.press/v176/shah22a.html) | 2022 · Conference | No official code found |
| [Video PreTraining (VPT): Learning to act by watching unlabeled online videos](https://arxiv.org/abs/2206.11795) | 2022 · Conference | Open-source · [Implementation](https://github.com/openai/Video-Pre-Training) |
| [Collaborating with humans without human data](https://arxiv.org/abs/2110.08176) | 2021 · Conference | No official code found |
| [Decision transformer: Reinforcement learning via sequence modeling](https://arxiv.org/abs/2106.01345) | 2021 · Conference | Open-source · [Implementation](https://github.com/kzl/decision-transformer) |
| [Maximum entropy population-based training for zero-shot human-AI coordination](https://arxiv.org/abs/2112.11701) | 2021 · Preprint | Source available · [Implementation](https://github.com/ruizhaogit/maximum_entropy_population_based_training) |
| [Open-ended learning leads to generally capable agents](https://arxiv.org/abs/2107.12808) | 2021 · Preprint | No official code found |
| [Scalable evaluation of multi-agent reinforcement learning with Melting Pot](https://proceedings.mlr.press/v139/leibo21a.html) | 2021 · Conference | Open-source |
| [The surprising effectiveness of PPO in cooperative, multi-agent games](https://arxiv.org/abs/2103.01955) | 2021 · Preprint | Open-source · [Implementation](https://github.com/marlbenchmark/on-policy) |
| [Combining deep reinforcement learning and search for imperfect-information games](https://arxiv.org/abs/2007.13544) | 2020 · Preprint | Open-source · [Implementation](https://github.com/facebookresearch/rebel) |
| [Dream to control: Learning behaviors by latent imagination](https://openreview.net/forum?id=S1lOTC4tDS) | 2020 · Conference | Open-source · [Implementation](https://github.com/danijar/dreamer) |
| [Interactive fiction games: A colossal adventure](https://doi.org/10.1609/aaai.v34i05.6297) | 2020 · Conference | Open-source · [Implementation](https://github.com/microsoft/jericho) |
| [Leveraging procedural generation to benchmark reinforcement learning](https://proceedings.mlr.press/v119/cobbe20a.html) | 2020 · Conference | Open-source · [Implementation](https://github.com/openai/procgen) |
| [Mastering Atari, Go, chess and shogi by planning with a learned model](https://doi.org/10.1038/s41586-020-03051-4) | 2020 · Journal | No official code found |
| [Other-Play for zero-shot coordination](https://proceedings.mlr.press/v119/hu20a.html) | 2020 · Conference | Restricted |
| [Stabilizing transformers for reinforcement learning](https://proceedings.mlr.press/v119/parisotto20a.html) | 2020 · Conference | No official code found |
| [The Hanabi challenge: A new frontier for AI research](https://doi.org/10.1016/j.artint.2019.103216) | 2020 · Journal | No official code found |
| [The NetHack Learning Environment](https://arxiv.org/abs/2006.13760) | 2020 · Conference | Source available · [Implementation](https://github.com/facebookresearch/nle) |
| [Towards Playing Full MOBA Games with Deep Reinforcement Learning](https://arxiv.org/abs/2011.12692) | 2020 · Conference | No official code found |
| [Dota 2 with large scale deep reinforcement learning](https://arxiv.org/abs/1912.06680) | 2019 · Preprint | No official code found |
| [Finding friend and foe in multi-agent games](https://arxiv.org/abs/1906.02330) | 2019 · Preprint | Source available · [Implementation](https://github.com/Detry322/DeepRole) |
| [General video game AI: A multi-track framework for evaluating agents, games and content generation algorithms](https://arxiv.org/abs/1802.10363) | 2019 · Journal | No official code found |
| [Grandmaster level in StarCraft II using multi-agent reinforcement learning](https://doi.org/10.1038/s41586-019-1724-z) | 2019 · Journal | No official code found |
| [Human-level performance in 3D multiplayer games with population-based reinforcement learning](https://doi.org/10.1126/science.aau6249) | 2019 · Journal | Unverified |
| [On the utility of learning about humans for human–AI coordination](https://proceedings.neurips.cc/paper/2019/hash/f5b1b89d98b7286673128a5fb112cb9a-Abstract.html) | 2019 · Conference | Open-source · [Implementation](https://github.com/HumanCompatibleAI/overcooked_ai) |
| [Superhuman AI for multiplayer poker](https://doi.org/10.1126/science.aay2400) | 2019 · Journal | Unverified |
| [The MineRL 2019 competition on sample efficient reinforcement learning using human priors](https://arxiv.org/abs/1904.10079) | 2019 · Preprint | No official code found |
| [The StarCraft multi-agent challenge](https://arxiv.org/abs/1902.04043) | 2019 · Preprint | Open-source · [Implementation](https://github.com/oxwhirl/smac) |
| [A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play](https://doi.org/10.1126/science.aar6404) | 2018 · Journal | Unverified |
| [Generalization and regularization in DQN](https://arxiv.org/abs/1810.00123) | 2018 · Preprint | Open-source · [Implementation](https://github.com/JesseFarebro/dqn-ale) |
| [Machine theory of mind](https://arxiv.org/abs/1802.07740) | 2018 · Preprint | No official code found |
| [QMIX: Monotonic value function factorisation for deep multi-agent reinforcement learning](https://proceedings.mlr.press/v80/rashid18a.html) | 2018 · Conference | Open-source |
| [TextWorld: A learning environment for text-based games](https://arxiv.org/abs/1806.11532) | 2018 · Preprint | Source available · [Implementation](https://github.com/microsoft/TextWorld) |
| [A unified game-theoretic approach to multiagent reinforcement learning](https://arxiv.org/abs/1711.00832) | 2017 · Preprint | Open-source · [Implementation](https://github.com/google-deepmind/open_spiel) |
| [Autonomous agents modelling other agents: A comprehensive survey and open problems](https://arxiv.org/abs/1709.08071) | 2017 · Preprint | No official code found |
| [Deal or no deal? end-to-end learning for negotiation dialogues](https://arxiv.org/abs/1706.05125) | 2017 · Preprint | Source available · [Implementation](https://github.com/facebookresearch/end-to-end-negotiator) |
| [Imagination-augmented agents for deep reinforcement learning](https://proceedings.neurips.cc/paper/2017/hash/9e82757e9a1c12cb710ad680db11f6f1-Abstract.html) | 2017 · Conference | No official code found |
| [Learning with opponent-learning awareness](https://arxiv.org/abs/1709.04326) | 2017 · Preprint | Open-source · [Implementation](https://github.com/alshedivat/lola) |
| [Mastering the game of Go without human knowledge](https://doi.org/10.1038/nature24270) | 2017 · Journal | No official code found |
| [Value-decomposition networks for cooperative multi-agent learning](https://arxiv.org/abs/1706.05296) | 2017 · Preprint | No official code found |
| [Mastering the game of Go with deep neural networks and tree search](https://doi.org/10.1038/nature16961) | 2016 · Journal | No official code found |
| [The Malmo platform for artificial intelligence experimentation](https://www.ijcai.org/Proceedings/16/Papers/643.pdf) | 2016 · Conference | Open-source · [Implementation](https://github.com/microsoft/malmo) |
| [Human-level control through deep reinforcement learning](https://doi.org/10.1038/nature14236) | 2015 · Journal | Source available · [Implementation](https://github.com/google-deepmind/dqn) |
| [Prom week: Designing past the game/story dilemma](https://mtreanor.com/publications/promWeek-FDG2013.pdf) | 2013 · Conference | No official code found |
| [The Arcade Learning Environment: An evaluation platform for general agents](https://arxiv.org/abs/1207.4708) | 2013 · Journal | No official code found |
| [General game playing: Overview of the AAAI competition](https://doi.org/10.1609/aimag.v26i2.1813) | 2005 · Journal | No official code found |
| [Some studies in machine learning using the game of checkers](https://doi.org/10.1147/rd.33.0210) | 1959 · Journal | Unverified |
| [Programming a computer for playing chess](https://doi.org/10.1080/14786445008521796) | 1950 · Journal | Unverified |

</details>

<details>
<summary><strong>Testing and evaluation · 59 references</strong></summary>

| Paper / original source | Year · type | Code availability |
| --- | --- | --- |
| [A2Z GameSpec-Bench: How Faithfully Can Coding Agents Generate Games from Game Design Specifications?](https://arxiv.org/abs/2609.39564) | 2026 · Preprint | Not released |
| [CA2: Code-aware agent for automated game testing](https://proceedings.mlr.press/v318/adaikkappan26a.html) | 2026 · Conference | No official code found |
| [Can LLM agents stick to the script? a benchmark for long-horizon consistency in interactive narratives](https://arxiv.org/abs/2608.08160v1) | 2026 · Preprint | Unverified |
| [FAIRGAMER: Evaluating social biases in LLM-based video game NPCs](https://doi.org/10.18653/v1/2026.acl-long.2015) | 2026 · Conference | Open-source · [Implementation](https://github.com/BingkangShi/FairGamer) |
| [GameASG-Bench: Benchmarking Autonomous Software Generation for Game Development](https://arxiv.org/abs/2609.21293) | 2026 · Preprint | Open-source |
| [GameGen-Verifier: Parallel Keypoint-Based Verification for LLM-Generated Games via Runtime State Injection](https://arxiv.org/abs/2605.07442) | 2026 · Preprint | Open-source |
| [GameReplica: A Benchmark for Black-Box Visual Game Replication by Vision-Language Agents](https://arxiv.org/abs/2609.22308) | 2026 · Preprint | Source available |
| [GBQA: A Game Benchmark for Evaluating LLMs as Quality Assurance Engineers](https://arxiv.org/abs/2604.02648) | 2026 · Preprint | Open-source |
| [How far can VLMs go for visual bug detection? studying 19,738 keyframes from 41 hours of gameplay videos](https://arxiv.org/abs/2603.22706) | 2026 · Preprint | No official code found |
| [LLMs gaming verifiers: RLVR can lead to reward hacking](https://arxiv.org/abs/2604.15149) | 2026 · Preprint | No official code found |
| [MIMIC-Py: An extensible tool for personality-driven automated game testing with large language models](https://doi.org/10.1145/3803437.3806414) | 2026 · Conference | Open-source · [Implementation](https://github.com/Mimic-Persona/MIMIC-Py) |
| [Open-Ended Video Game Glitch Detection with Agentic Reasoning and Temporal Grounding](https://arxiv.org/abs/2604.07818) | 2026 · Preprint | Open-source |
| [OpenGameEval: Benchmarking Agentic Programming and Exploration in a Stateful Game Engine](https://arxiv.org/abs/2610.02563) | 2026 · Preprint | Open-source |
| [PlayWorld: Benchmarking world models with agent players over long-horizon objectives](https://arxiv.org/abs/2608.13552v2) | 2026 · Preprint | Source available |
| [RESP: Reference-guided sequential prompting for visual glitch detection in video games](https://arxiv.org/abs/2604.11082) | 2026 · Preprint | Open-source · [Implementation](https://github.com/asgaardlab/RefGlitch-Bench) |
| [Reward hacking benchmark: Measuring exploits in LLM agents with tool use](https://arxiv.org/abs/2605.02964) | 2026 · Preprint | No official code found |
| [SWE-Game: Can Coding Agents Build the Games We Want?](https://arxiv.org/abs/2609.33678) | 2026 · Preprint | No official code found |
| [A hybrid co-finetuning approach for visual bug detection in video games](https://arxiv.org/abs/2510.03591) | 2025 · Preprint | No official code found |
| [A literature review of software testing practices and frameworks in the video gaming industry](https://doi.org/10.1002/stvr.70001) | 2025 · Journal | Unverified |
| [An empirical study of LLM-as-a-judge: How design choices impact evaluation reliability](https://arxiv.org/abs/2506.13639) | 2025 · Preprint | No official code found |
| [Automated Bug Frame Retrieval from Gameplay Videos Using Vision-Language Models](https://arxiv.org/abs/2508.04895) | 2025 · Preprint | No official code found |
| [Curiosity driven multi-agent reinforcement learning for 3D game testing](https://arxiv.org/abs/2502.14606) | 2025 · Preprint | Open-source · [Implementation](https://github.com/iv4xr-project/iv4xr-rlbt) |
| [Evaluating language models’ evaluations of games](https://arxiv.org/abs/2510.10930v3) | 2025 · Preprint | No official code found |
| [Exploring the capabilities of vision-language models to detect visual bugs in HTML5 <canvas> applications](https://arxiv.org/abs/2501.09236) | 2025 · Preprint | No official code found |
| [Leveraging LLM agents for automated video game testing](https://arxiv.org/abs/2509.22170) | 2025 · Preprint | No official code found |
| [SAGE: Semantic-aware gray-box game regression testing with large language models](https://arxiv.org/abs/2512.00560) | 2025 · Preprint | No official code found |
| [Synergizing code coverage and gameplay intent: Coverage-aware game playtesting with LLM-guided reinforcement learning](https://arxiv.org/abs/2512.12706v1) | 2025 · Preprint | No official code found |
| [The alternative annotator test for LLM-as-a-judge: How to statistically justify replacing human annotators with LLMs](https://arxiv.org/abs/2501.10970) | 2025 · Preprint | Unverified |
| [Towards LLM-based automatic playtest](https://arxiv.org/abs/2507.09490) | 2025 · Preprint | No official code found |
| [VideoGameQA-Bench: Evaluating vision-language models for video game quality assurance](https://arxiv.org/abs/2505.15952) | 2025 · Conference | No official code found |
| [A survey on LLM-as-a-judge](https://arxiv.org/abs/2411.15594) | 2024 · Preprint | Unverified |
| [Agent-as-a-judge: Evaluate agents with agents](https://arxiv.org/abs/2410.10934) | 2024 · Preprint | Open-source · [Implementation](https://github.com/metauto-ai/agent-as-a-judge) |
| [Automatic bug detection in LLM-powered text-based games using LLMs](https://doi.org/10.18653/v1/2024.findings-acl.907) | 2024 · Conference | Unverified |
| [From generation to judgment: Opportunities and challenges of LLM-as-a-judge](https://arxiv.org/abs/2411.16594) | 2024 · Preprint | No official code found |
| [JudgeBench: A benchmark for evaluating LLM-based judges](https://arxiv.org/abs/2410.12784) | 2024 · Preprint | Source available |
| [Justice or prejudice? quantifying biases in LLM-as-a-judge](https://arxiv.org/abs/2410.02736) | 2024 · Preprint | No official code found |
| [LLM evaluators recognize and favor their own generations](https://doi.org/10.52202/079017-2197) | 2024 · Conference | No official code found |
| [MLLM-as-a-judge: Assessing multimodal LLM-as-a-judge with vision-language benchmark](https://arxiv.org/abs/2402.04788) | 2024 · Preprint | Source available |
| [Deriving and evaluating a detailed taxonomy of game bugs](https://arxiv.org/abs/2311.16645) | 2023 · Preprint | No official code found |
| [GlitchBench: Can large multimodal models detect video game glitches?](https://arxiv.org/abs/2312.05291) | 2023 · Preprint | Source available · [Implementation](https://github.com/GlitchBench/Benchmark) |
| [Playtesting: What is beyond personas](https://doi.org/10.1109/TG.2022.3165882) | 2023 · Journal | Unverified |
| [Preference-conditioned pixel-based AI agent for game testing](https://arxiv.org/abs/2308.09289) | 2023 · Preprint | No official code found |
| [Technical Challenges of Deploying Reinforcement Learning Agents for Game Testing in AAA Games](https://doi.org/10.1109/CoG57401.2023.10333194) | 2023 · Conference | No official code found |
| [Video game automated testing approaches: An assessment framework](https://doi.org/10.1109/TG.2020.3032796) | 2023 · Journal | Unverified |
| [An agent-based approach to automated game testing: an experience report](https://arxiv.org/abs/2211.06386) | 2022 · Preprint | No official code found |
| [Automatically detecting visual bugs in HTML5 <canvas> games](https://arxiv.org/abs/2208.02335) | 2022 · Preprint | Open-source · [Implementation](https://github.com/asgaardlab/canvas-visual-bugs-testbed) |
| [Inspector: Pixel-based automated game testing via exploration, detection, and investigation](https://arxiv.org/abs/2207.08379) | 2022 · Preprint | No official code found |
| [SUPERNOVA: Automating Test Selection and Defect Prevention in AAA Video Games Using Risk Based Testing and Machine Learning](https://arxiv.org/abs/2203.05566) | 2022 · Preprint | No official code found |
| [Towards automated video game testing: Still a long way to go](https://doi.org/10.1145/3524494.3527627) | 2022 · Conference | Unverified |
| [Using reinforcement learning for load testing of video games](https://arxiv.org/abs/2201.06865) | 2022 · Preprint | Open-source · [Implementation](https://github.com/RosaliaTufano/rlgameauthors) |
| [A survey of video game testing](https://doi.org/10.1109/AST52587.2021.00018) | 2021 · Conference | Unverified |
| [Automated video game testing using synthetic and humanlike agents](https://doi.org/10.1109/TG.2019.2947597) | 2021 · Journal | Unverified |
| [GLIB: Towards automated test oracle for graphically-rich applications](https://arxiv.org/abs/2106.10507) | 2021 · Preprint | Source available · [Implementation](https://github.com/GLIB-game/GLIB) |
| [Improving playtesting coverage via curiosity driven reinforcement learning agents](https://arxiv.org/abs/2103.13798) | 2021 · Preprint | No official code found |
| [Augmenting automated game testing with deep reinforcement learning](https://ieee-cog.org/2020/papers/paper_215.pdf) | 2020 · Conference | Unverified |
| [Using deep convolutional neural networks to detect rendered glitches in video games](https://doi.org/10.1609/aiide.v16i1.7409) | 2020 · Conference | No official code found |
| [Visualizing AI Playtesting Data of 2D Side-scrolling Games](https://doi.org/10.1109/CoG47356.2020.9231915) | 2020 · Conference | No official code found |
| [Automated playtesting with procedural personas through MCTS with evolved heuristics](https://doi.org/10.1109/TG.2018.2808198) | 2019 · Journal | Unverified |
| [Wuji: Automatic online combat game testing using evolutionary deep reinforcement learning](https://doi.org/10.1109/ASE.2019.00077) | 2019 · Conference | Unverified |

</details>

<details>
<summary><strong>World modeling and simulation · 120 references</strong></summary>

| Paper / original source | Year · type | Code availability |
| --- | --- | --- |
| [ActWorld: From explorable to interactive world model via action-aware memory](https://arxiv.org/abs/2606.17730) | 2026 · Preprint | No official code found |
| [Advancing open-source world models](https://arxiv.org/abs/2601.20540) | 2026 · Preprint | Open-source · [Implementation](https://github.com/robbyant/lingbot-world) |
| [Alaya-EVOKE: From linear-scaling supervision to endless world](https://arxiv.org/abs/2608.13546v2) | 2026 · Preprint | Open-source · [Implementation](https://github.com/AlayaLab/Evoke) |
| [AlayaWorld: Interactive long-horizon world modeling—full technical report (v1.1)](https://arxiv.org/abs/2608.13492v1) | 2026 · Technical report | Source available · [Implementation](https://github.com/AlayaLab/AlayaWorld) |
| [BadWorld: Adversarial attacks on world models](https://arxiv.org/abs/2606.16519) | 2026 · Preprint | Source available · [Implementation](https://github.com/LinghuiiShen/BadWorld) |
| [Beyond asking: A pipeline for personalized game generation that reads players from behavior](https://arxiv.org/abs/2608.16196) | 2026 · Preprint | No official code found |
| [Beyond pixel histories: World models with persistent 3D state](https://arxiv.org/abs/2603.03482) | 2026 · Conference | Open-source · [Implementation](https://github.com/francelico/PERSIST) |
| [Chessformer: A unified architecture for chess modeling](https://proceedings.iclr.cc/paper_files/paper/2026/hash/3d167db04a90885ad5208fe8b273668b-Abstract-Conference.html) | 2026 · Conference | Open-source |
| [Code Plans, Diffusion Renders: Open-Ended Generative World Modeling](https://arxiv.org/abs/2609.26458) | 2026 · Preprint | No official code found |
| [Code World Model: Coding Agent as World Brain](https://arxiv.org/abs/2608.25927) | 2026 · Preprint | Open-source |
| [Code World Models for General Game Playing](https://arxiv.org/abs/2510.04542) | 2026 · Conference | No official code found |
| [Do vision language models understand human engagement in games?](https://arxiv.org/abs/2603.18480) | 2026 · Preprint | No official code found |
| [DreamX-World 1.0: A general-purpose interactive world model](https://arxiv.org/abs/2606.16993) | 2026 · Preprint | Open-source · [Implementation](https://github.com/AMAP-ML/DreamX-World) |
| [ForgeWM: Progressive causal training for few-step action-conditioned video world models](https://arxiv.org/abs/2608.14022) | 2026 · Preprint | Open-source · [Implementation](https://github.com/asdfo123/ForgeWM) |
| [From pixels to states: Rethinking interactive world models as game engines](https://arxiv.org/abs/2607.14076v1) | 2026 · Preprint | No official code found |
| [Game2World Engine: Unlocking in-the-wild gameplay videos for world model training](https://arxiv.org/abs/2608.24680) | 2026 · Preprint | Open-source · [Implementation](https://github.com/Dongping-Chen/Game2World) |
| [Generative world renderer](https://arxiv.org/abs/2604.02329v1) | 2026 · Preprint | Open-source · [Implementation](https://github.com/AlayaLab/AlayaRenderer) |
| [Generative world renderer at the speed of play](https://arxiv.org/abs/2607.18703v1) | 2026 · Preprint | No official code found |
| [H3-World: Turning language understanding into world control](https://arxiv.org/abs/2609.01560v1) | 2026 · Preprint | Unverified |
| [Incantation: Natural language as the action interface for multi-entity video world models](https://arxiv.org/abs/2605.18601) | 2026 · Preprint | Source available · [Implementation](https://github.com/zhushangwen/Incantation) |
| [iWorld-Bench: A benchmark for interactive world models with a unified action generation framework](https://arxiv.org/abs/2605.03941) | 2026 · Conference | Open-source |
| [Learning to imitate with less: Efficient individual behavior modeling in chess](https://openreview.net/forum?id=iw4kjcw319) | 2026 · Journal | Unverified |
| [Marionette: Predicting world states, rendering geometry, painting appearance](https://arxiv.org/abs/2608.14530) | 2026 · Preprint | Open-source · [Implementation](https://github.com/AlayaLab/Marionette) |
| [MASS: Multiplayer world models with authoritative shared state](https://arxiv.org/abs/2608.06257v2) | 2026 · Preprint | No official code found |
| [Matrix-Game 3.0: Real-time and streaming interactive world model with long-horizon memory](https://arxiv.org/abs/2604.08995) | 2026 · Preprint | Open-source · [Implementation](https://github.com/SkyworkAI/Matrix-Game/tree/main/Matrix-Game-3) |
| [MeepleLM: A virtual playtester simulating diverse subjective experiences](https://arxiv.org/abs/2601.07251) | 2026 · Preprint | Unverified |
| [MultiGen: Level-design for editable multiplayer worlds in diffusion game engines](https://arxiv.org/abs/2603.06679) | 2026 · Preprint | No official code found |
| [Multiplayer interactive world models with representation autoencoders](https://arxiv.org/abs/2607.05352) | 2026 · Preprint | Unverified |
| [Programmable World Model](https://arxiv.org/abs/2609.10540v1) | 2026 · Preprint | Not released |
| [ReactiveGWM: Steering NPC in reactive game world models](https://arxiv.org/abs/2605.15256) | 2026 · Preprint | Source available · [Implementation](https://github.com/INV-WZQ/ReactiveGWM) |
| [ReWorld: An interactive world model with long-horizon memory](https://arxiv.org/abs/2608.23565) | 2026 · Preprint | Unverified |
| [SCOPE: Simulating cross-game operations in playable environments for FPS world models](https://arxiv.org/abs/2605.23345) | 2026 · Preprint | Open-source · [Implementation](https://github.com/z2tong/SCOPE) |
| [ShadowDancer: Teaching video world models any action by learning unified dynamics representations from a video and its shadow](https://arxiv.org/abs/2607.28362) | 2026 · Preprint | Not released · [Implementation](https://github.com/AlayaLab/ShadowDancer) |
| [Solaris: Building a multiplayer video world model in Minecraft](https://arxiv.org/abs/2602.22208) | 2026 · Preprint | No official code found |
| [SolarWM: Open Data and Scalable Training for Long-Horizon Video World Models](https://arxiv.org/abs/2609.02886) | 2026 · Preprint | Open-source · [Implementation](https://github.com/Junchao-cs/SolarWM) |
| [StatePlay: State-aware game world models for mechanics-consistent generation](https://arxiv.org/abs/2607.26754) | 2026 · Preprint | Open-source · [Implementation](https://github.com/Jimntu/StatePlay) |
| [Towards interactive video world modeling: Frontiers, challenges, benchmarks, and future trends](https://arxiv.org/abs/2606.01164) | 2026 · Preprint | No official code found |
| [WildWorld: A large-scale dataset for dynamic world modeling with actions and explicit state toward generative ARPG](https://arxiv.org/abs/2603.23497) | 2026 · Preprint | Source available · [Implementation](https://github.com/AlayaLab/WildWorld) |
| [WorldCam: Interactive autoregressive 3D gaming worlds with camera pose as a unifying geometric representation](https://arxiv.org/abs/2603.16871) | 2026 · Preprint | Source available · [Implementation](https://github.com/cvlab-kaist/WorldCam) |
| [WorldExam: Benchmarking world models from apparent appearance to inherent reactivity](https://arxiv.org/abs/2608.02603) | 2026 · Preprint | Not released |
| [WorldMark: A unified benchmark suite for interactive video world models](https://arxiv.org/abs/2604.21686v2) | 2026 · Preprint | Open-source |
| [WorldMind: Decoupled game world model for state-aware NPC behavior](https://arxiv.org/abs/2608.21439) | 2026 · Preprint | Unverified |
| [WorldOlympiad: Can your world model survive a triathlon?](https://arxiv.org/abs/2606.11129) | 2026 · Preprint | Source available · [Implementation](https://github.com/alibaba-damo-academy/WorldOlympiad) |
| [WorldRoamBench: An open-world benchmark for long-horizon stability of interactive world models](https://arxiv.org/abs/2606.31672) | 2026 · Preprint | No official code found |
| [WorldRover: A scalable synthetic video data engine for world exploration with rich annotations](https://arxiv.org/abs/2608.15659v2) | 2026 · Preprint | Source available · [Implementation](https://github.com/AlayaLab/WorldRover) |
| [Agent2World: Learning to generate symbolic world models via adaptive multi-agent feedback](https://arxiv.org/abs/2512.22336) | 2025 · Preprint | Source available · [Implementation](https://github.com/DeepExperience/agent2world) |
| [Beyond playtesting: A generative multi-agent simulation system for massively multiplayer online games](https://arxiv.org/abs/2512.02358) | 2025 · Preprint | No official code found |
| [Context as memory: Scene-consistent interactive long video generation with memory retrieval](https://arxiv.org/abs/2506.03141) | 2025 · Preprint | No official code found |
| [Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837) | 2025 · Conference | No official code found |
| [Frame context packing and drift prevention in next-frame-prediction video diffusion models](https://arxiv.org/abs/2504.12626) | 2025 · Preprint | Open-source · [Implementation](https://github.com/lllyasviel/FramePack) |
| [GameFactory: Creating New Games with Generative Interactive Videos](https://arxiv.org/abs/2501.08325) | 2025 · Conference | Source available |
| [GameGen-X: Interactive open-world game video generation](https://arxiv.org/abs/2411.00769) | 2025 · Conference | No official code found |
| [Genie 3: A new frontier for world models](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) | 2025 · Blog | No official code found |
| [Hunyuan-GameCraft-2: Instruction-following interactive game world model](https://arxiv.org/abs/2511.23429) | 2025 · Preprint | No official code found |
| [Learning to play like humans: A framework for LLM adaptation in interactive fiction games](https://arxiv.org/abs/2505.12439) | 2025 · Preprint | No official code found |
| [Matrix-Game 2.0: An open-source real-time and streaming interactive world model](https://arxiv.org/abs/2508.13009) | 2025 · Preprint | Open-source · [Implementation](https://github.com/SkyworkAI/Matrix-Game/tree/main/Matrix-Game-2) |
| [MineWorld: A real-time and open-source interactive world model on Minecraft](https://arxiv.org/abs/2504.08388) | 2025 · Preprint | Unverified |
| [Mixture of contexts for long video generation](https://arxiv.org/abs/2508.21058) | 2025 · Preprint | No official code found |
| [Model as a game: On numerical and spatial consistency for generative games](https://arxiv.org/abs/2503.21172) | 2025 · Preprint | No official code found |
| [PoE-World: Compositional World Modeling with Products of Programmatic Experts](https://arxiv.org/abs/2505.10819) | 2025 · Preprint | Open-source · [Implementation](https://github.com/topwasu/poe-world) |
| [Self forcing: Bridging the train-test gap in autoregressive video diffusion](https://arxiv.org/abs/2506.08009) | 2025 · Preprint | Open-source · [Implementation](https://github.com/guandeh17/Self-Forcing) |
| [Vmem: Consistent interactive video scene generation with surfel-indexed view memory](https://arxiv.org/abs/2506.18903) | 2025 · Preprint | Open-source · [Implementation](https://github.com/runjiali-rl/vmem) |
| [World and human action models towards gameplay ideation](https://doi.org/10.1038/s41586-025-08600-3) | 2025 · Journal | No official code found |
| [WorldMem: Long-term consistent world simulation with memory](https://arxiv.org/abs/2504.12369) | 2025 · Preprint | Source available · [Implementation](https://github.com/xizaoqu/WorldMem) |
| [Yume-1.5: A text-controlled interactive world generation model](https://arxiv.org/abs/2512.22096) | 2025 · Preprint | Open-source · [Implementation](https://github.com/stdstu12/YUME) |
| [Behavior structformer: Learning players representations with structured tokenization](https://arxiv.org/abs/2406.05274) | 2024 · Preprint | No official code found |
| [Diffusion for World Modeling: Visual Details Matter in Atari](https://arxiv.org/abs/2405.12399) | 2024 · Conference | Open-source · [Implementation](https://github.com/eloialonso/diamond) |
| [Diffusion forcing: Next-token prediction meets full-sequence diffusion](https://arxiv.org/abs/2407.01392) | 2024 · Conference | Unverified |
| [FactorSim: Generative Simulation via Factorized Representation](https://arxiv.org/abs/2409.17652) | 2024 · Conference | Source available · [Implementation](https://github.com/sunfanyunn/FactorSim) |
| [From slow bidirectional to fast autoregressive video diffusion models](https://arxiv.org/abs/2412.07772) | 2024 · Preprint | Source available · [Implementation](https://github.com/tianweiy/CausVid) |
| [Generating Code World Models with Large Language Models Guided by Monte Carlo Tree Search](https://arxiv.org/abs/2405.15383) | 2024 · Preprint | Open-source · [Implementation](https://github.com/nicoladainese96/code-world-models) |
| [Genie 2: A large-scale foundation world model](https://deepmind.google/blog/genie-2-a-large-scale-foundation-world-model/) | 2024 · Blog | No official code found |
| [Genie: Generative Interactive Environments](https://proceedings.mlr.press/v235/bruce24a.html) | 2024 · Conference | No official code found |
| [Label-free subjective player experience modelling via let’s play videos](https://arxiv.org/abs/2410.02967) | 2024 · Preprint | No official code found |
| [Maia-2: A unified model for human-AI alignment in chess](https://doi.org/10.52202/079017-0659) | 2024 · Conference | Open-source · [Implementation](https://github.com/CSSLab/maia2) |
| [Oasis: A universe in a transformer](https://oasis-model.github.io/) | 2024 · Technical report | Open-source |
| [Playable Game Generation](https://arxiv.org/abs/2412.00887v1) | 2024 · Preprint | Open-source · [Implementation](https://github.com/GreatX3/Playable-Game-Generation) |
| [player2vec: A language modeling approach to understand player behavior in games](https://arxiv.org/abs/2404.04234) | 2024 · Preprint | No official code found |
| [Skill issues: An analysis of CS:GO skill rating systems](https://arxiv.org/abs/2410.02831) | 2024 · Preprint | No official code found |
| [WorldCoder, a Model-Based LLM Agent: Building World Models by Writing Code and Interacting with the Environment](https://arxiv.org/abs/2402.12275) | 2024 · Preprint | No official code found |
| [Affective game computing: A survey](https://doi.org/10.1109/JPROC.2023.3315689) | 2023 · Journal | No official code found |
| [Predicting player engagement in Tom Clancy’s The Division 2: A multimodal approach via pixels and gamepad actions](https://arxiv.org/abs/2310.06136) | 2023 · Preprint | No official code found |
| [Transformers are sample-efficient world models](https://arxiv.org/abs/2209.00588) | 2023 · Conference | Open-source · [Implementation](https://github.com/eloialonso/iris) |
| [Generative personas that behave and experience like humans](https://arxiv.org/abs/2209.00459) | 2022 · Preprint | No official code found |
| [Predicting personas using mechanic frequencies and game state traces](https://arxiv.org/abs/2203.13351) | 2022 · Preprint | No official code found |
| [QuickSkill: Novice skill estimation in online multiplayer games](https://arxiv.org/abs/2208.07704) | 2022 · Preprint | No official code found |
| [On analyzing churn prediction in mobile games](https://arxiv.org/abs/2104.05554) | 2021 · Preprint | No official code found |
| [Open player modeling: Empowering players through data transparency](https://arxiv.org/abs/2110.05810) | 2021 · Preprint | No official code found |
| [Player modeling using behavioral signals in competitive online games](https://arxiv.org/abs/2112.04379) | 2021 · Preprint | No official code found |
| [The arousal video game AnnotatIoN (AGAIN) dataset](https://arxiv.org/abs/2104.02643) | 2021 · Preprint | No official code found |
| [The pixels and sounds of emotion: General-purpose representations of arousal in games](https://arxiv.org/abs/2101.10706) | 2021 · Preprint | No official code found |
| [Aligning superhuman AI with human behavior: Chess as a model system](https://arxiv.org/abs/2006.01855) | 2020 · Preprint | Open-source · [Implementation](https://github.com/CSSLab/maia-chess) |
| [Learning models of individual behavior in chess](https://arxiv.org/abs/2008.10086) | 2020 · Preprint | Open-source · [Implementation](https://github.com/CSSLab/maia-individual) |
| [Learning to simulate dynamic environments with GameGAN](https://arxiv.org/abs/2005.12126) | 2020 · Conference | No official code found |
| [Model-based reinforcement learning for Atari](https://arxiv.org/abs/1903.00374) | 2020 · Conference | Open-source · [Implementation](https://github.com/tensorflow/tensor2tensor) |
| [MOPO: Model-based offline policy optimization](https://arxiv.org/abs/2005.13239) | 2020 · Preprint | Open-source · [Implementation](https://github.com/tianheyu927/mopo) |
| [MOReL : Model-based offline reinforcement learning](https://arxiv.org/abs/2005.05951) | 2020 · Preprint | No official code found |
| [Planning to explore via self-supervised world models](https://arxiv.org/abs/2005.05960) | 2020 · Preprint | Open-source · [Implementation](https://github.com/ramanans1/plan2explore) |
| [Player modeling via multi-armed bandits](https://doi.org/10.1145/3402942.3402952) | 2020 · Conference | No official code found |
| [Predicting game difficulty and churn without players](https://arxiv.org/abs/2008.12937) | 2020 · Preprint | No official code found |
| [From pixels to affect: A study on games and player experience](https://arxiv.org/abs/1907.02288) | 2019 · Preprint | No official code found |
| [Learning latent dynamics for planning from pixels](https://proceedings.mlr.press/v97/hafner19a.html) | 2019 · Conference | Open-source · [Implementation](https://github.com/google-research/planet) |
| [The winning solution to the IEEE CIG 2017 game data mining competition](https://doi.org/10.3390/make1010016) | 2019 · Journal | No official code found |
| [Data-driven approaches to game player modeling: A systematic literature review](https://doi.org/10.1145/3145814) | 2018 · Journal | Unverified |
| [Deep reinforcement learning in a handful of trials using probabilistic dynamics models](https://arxiv.org/abs/1805.12114) | 2018 · Conference | Open-source · [Implementation](https://github.com/kchua/handful-of-trials) |
| [Towards accurate generative models of video: A new metric & challenges](https://arxiv.org/abs/1812.01717v2) | 2018 · Preprint | No official code found |
| [World models](https://arxiv.org/abs/1803.10122) | 2018 · Preprint | No official code found |
| [Recurrent environment simulators](https://openreview.net/forum?id=B1s6xvqlx) | 2017 · Conference | Unverified |
| [Churn prediction in mobile social games: Towards a complete assessment using survival ensembles](https://doi.org/10.1109/DSAA.2016.84) | 2016 · Conference | No official code found |
| [Rapid prediction of player retention in free-to-play mobile games](https://arxiv.org/abs/1607.03202) | 2016 · Preprint | No official code found |
| [Action-conditional video prediction using deep networks in Atari games](https://proceedings.neurips.cc/paper/2015/hash/6ba3af5d7b2790e73f0de32e5c8c1798-Abstract.html) | 2015 · Conference | No official code found |
| [Clustering game behavior data](https://doi.org/10.1109/tciaig.2014.2376982) | 2015 · Journal | Unverified |
| [A comparison of methods for player clustering via behavioral telemetry](https://arxiv.org/abs/1407.3950) | 2014 · Preprint | No official code found |
| [Behavior evolution in Tomb Raider Underworld](https://doi.org/10.1109/cig.2013.6633637) | 2013 · Conference | Unverified |
| [Player modeling](https://doi.org/10.4230/DFU.Vol6.12191.45) | 2013 · Book chapter | No official code found |
| [Guns, swords and data: Clustering of player behavior in computer games in the wild](https://doi.org/10.1109/cig.2012.6374152) | 2012 · Conference | Unverified |
| [Player behavioural modelling for video games](https://doi.org/10.1016/j.entcom.2011.12.001) | 2012 · Journal | No official code found |
| [An inclusive view of player modeling](https://doi.org/10.1145/2159365.2159419) | 2011 · Conference | Unverified |
| [TrueSkill: A Bayesian skill rating system](https://proceedings.neurips.cc/paper/2006/hash/f44ee263952e65b3610b8ba51229d1f9-Abstract.html) | 2006 · Conference | Unverified |
| [Integrated architectures for learning, planning, and reacting based on approximating dynamic programming](https://doi.org/10.1016/B978-1-55860-141-3.50030-4) | 1990 · Conference | No official code found |

</details>

<details>
<summary><strong>Foundations and general research · 36 references</strong></summary>

| Paper / original source | Year · type | Code availability |
| --- | --- | --- |
| [AI for Games in the Foundation Model Era](https://arxiv.org/abs/2609.16679) | 2026 · Survey | No official code found |
| [Auditing Harness Tampering in Self-Improving Agents](https://arxiv.org/abs/2609.00069) | 2026 · Preprint | No official code found |
| [Code2World: A GUI World Model via Renderable Code Generation](https://arxiv.org/abs/2602.09856) | 2026 · Preprint | Source available · [Implementation](https://github.com/AMAP-ML/Code2World) |
| [DeepEyes: Incentivizing "Thinking with Images" via Reinforcement Learning](https://arxiv.org/abs/2505.14362) | 2026 · Conference | Open-source · [Implementation](https://github.com/Visual-Agent/DeepEyes) |
| [DiscoveryRSI: Recursively Learning to Discover Valuable Hypotheses](https://arxiv.org/abs/2610.23839) | 2026 · Preprint | Open-source · [Implementation](https://github.com/Gen-Verse/DiscoveryRSI) |
| [Generative AI in game development: A qualitative research synthesis](https://doi.org/10.1145/3772318.3791206) | 2026 · Conference | Unverified |
| [GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning](https://arxiv.org/abs/2507.19457) | 2026 · Conference | Open-source · [Implementation](https://github.com/gepa-ai/gepa) |
| [Harness^2: Recursive Agent Harnessing for an Open World](https://arxiv.org/abs/2610.14224) | 2026 · Preprint | Open-source · [Implementation](https://github.com/google-research/harness2) |
| [MementoGUI: Learning Agentic Multimodal Memory Control for Long-Horizon GUI Agents](https://arxiv.org/abs/2605.18652) | 2026 · Preprint | Not released |
| [Meta-Harness: End-to-End Optimization of Model Harnesses](https://arxiv.org/abs/2603.28052) | 2026 · Preprint | Open-source · [Implementation](https://github.com/stanford-iris-lab/meta-harness) |
| [Video-MME-v2: Towards the Next Stage in Benchmarks for Comprehensive Video Understanding](https://arxiv.org/abs/2604.05015) | 2026 · Preprint | Source available |
| [Where and How to Prune: An Empirical Study of Visual Token Pruning for GUI Agent Navigation](https://arxiv.org/abs/2603.26041) | 2026 · Preprint | Source available |
| [Artificial Intelligence and Games](https://doi.org/10.1007/978-3-031-83347-2) | 2025 · Book | No official code found |
| [CWM: An Open-Weights LLM for Research on Code Generation with World Models](https://arxiv.org/abs/2510.02387) | 2025 · Preprint | Open-source · [Implementation](https://github.com/facebookresearch/cwm) |
| [Hunyuan3D 2.0: Scaling Diffusion Models for High Resolution Textured 3D Assets Generation](https://arxiv.org/abs/2501.12202) | 2025 · Preprint | Restricted · [Implementation](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) |
| [InfiniBench: Infinite Benchmarking for Visual Spatial Reasoning with Customizable Scene Complexity](https://arxiv.org/abs/2511.18200) | 2025 · Preprint | Source available |
| [LongVU: Spatiotemporal Adaptive Compression for Long Video-Language Understanding](https://arxiv.org/abs/2410.17434) | 2025 · Conference | Open-source · [Implementation](https://github.com/Vision-CAIR/LongVU) |
| [MuMA: 3D PBR Texturing via Multi-Channel Multi-View Generation and Agentic Post-Processing](https://arxiv.org/abs/2503.18461) | 2025 · Preprint | No official code found |
| [VideoTree: Adaptive Tree-based Video Representation for LLM Reasoning on Long Videos](https://arxiv.org/abs/2405.19209) | 2025 · Conference | Open-source · [Implementation](https://github.com/Ziyang412/VideoTree) |
| [WorldGUI: An Interactive Benchmark for Desktop GUI Automation from Any Starting Point](https://arxiv.org/abs/2502.08047) | 2025 · Technical report | Source available · [Implementation](https://github.com/showlab/WorldGUI) |
| [ZoomEye: Enhancing Multimodal LLMs with Human-Like Zooming Capabilities through Tree-Based Image Exploration](https://arxiv.org/abs/2411.16044) | 2025 · Conference | Source available · [Implementation](https://github.com/om-ai-lab/ZoomEye) |
| [DreamReward: Text-to-3D Generation with Human Preference](https://arxiv.org/abs/2403.14613) | 2024 · Conference | Open-source · [Implementation](https://github.com/liuff19/DreamReward) |
| [Large language models and games: A survey and roadmap](https://doi.org/10.1109/TG.2024.3461510) | 2024 · Journal | No official code found |
| [Large language models and video games: A preliminary scoping review](https://doi.org/10.1145/3640794.3665582) | 2024 · Conference | Unverified |
| [Stable Audio Open](https://arxiv.org/abs/2407.14358) | 2024 · Preprint | Open-source · [Implementation](https://github.com/Stability-AI/stable-audio-tools) |
| [Structured 3D Latents for Scalable and Versatile 3D Generation](https://arxiv.org/abs/2412.01506) | 2024 · Preprint | Open-source · [Implementation](https://github.com/Microsoft/TRELLIS) |
| [VideoAgent: A Memory-augmented Multimodal Agent for Video Understanding](https://arxiv.org/abs/2403.11481) | 2024 · Conference | Open-source · [Implementation](https://github.com/YueFan1014/VideoAgent) |
| [VideoAgent: Long-form Video Understanding with Large Language Model as Agent](https://arxiv.org/abs/2403.10517) | 2024 · Preprint | No official code found |
| [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685) | 2023 · Preprint | Open-source |
| [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366) | 2023 · Preprint | Open-source · [Implementation](https://github.com/noahshinn/reflexion) |
| [V*: Guided Visual Search as a Core Mechanism in Multimodal LLMs](https://arxiv.org/abs/2312.14135) | 2023 · Preprint | Open-source · [Implementation](https://github.com/penghao-wu/vstar) |
| [Deep Reinforcement Learning at the Edge of the Statistical Precipice](https://arxiv.org/abs/2108.13264) | 2021 · Conference | Open-source · [Implementation](https://github.com/google-research/rliable) |
| [FLIP: A Difference Evaluator for Alternating Images](https://doi.org/10.1145/3406183) | 2020 · Journal | Open-source · [Implementation](https://github.com/NVlabs/flip) |
| [Procedural System Assisted Authoring of Open-World Content for Marvel’s Spider-Man](https://doi.org/10.1145/3306307.3328158) | 2019 · Conference | No official code found |
| [Generalization in Adaptive Data Analysis and Holdout Reuse](https://arxiv.org/abs/1506.02629) | 2015 · Preprint | No official code found |
| [Rules of Play: Game Design Fundamentals](https://mitpress.mit.edu/9780262240451/rules-of-play/) | 2003 · Book | Unverified |

</details>

Bibliographic provenance includes [AI for Games in the Foundation Model Era](https://arxiv.org/abs/2609.16679), the survey authors’ [resource mapping](https://github.com/Eurekaleo/awesome-ai-for-games/blob/main/data/official-resources.json), and each original source. Roles are reading categories; videos, interactive demos, implementation code, and model weights remain distinct artifacts. [Provenance records](data/papers-provenance.json)

<a id="guides"></a>

## Production guides, research notes and level-design references

All 66 documents in the site’s full index, including production and evaluation notes, level-design references and reusable templates. Five explicitly Chinese-language documents are labeled accordingly; every description below is in English.

<details>
<summary>Start building · 5</summary>

| Document | Purpose |
| --- | --- |
| [From Resource Map to Runnable Game](https://openenvision.github.io/GameMap/docs/practical-guide/) | Build a complete 2D game loop in one HTML file, test win and retry, then plan your next AI-assisted change. |
| [AI game builds](https://openenvision.github.io/GameMap/docs/tutorials-and-demos/) | Play creator-documented AI game projects and inspect their complete source, setup steps and development evidence. |
| [Coding agents × game development: code resources and game sources](https://openenvision.github.io/GameMap/docs/coding-agent-game-code/) | Find coding-agent skills, engine bridges and implementation examples, with client, model and game-source attribution. |
| [Game testing library](https://openenvision.github.io/GameMap/docs/game-testing-library/) | Choose runnable games, agent environments and asset sets for a concrete test, with setup and license boundaries. |
| [Find games and publish your own](https://openenvision.github.io/GameMap/docs/publishing-platforms/) | Compare official game-store entry points and distinguish browser play, downloads, source access and release status. |

</details>

<details>
<summary>Explore the ecosystem · 5</summary>

| Document | Purpose |
| --- | --- |
| [Coding agents and game tool integrations: source review notes](https://openenvision.github.io/GameMap/docs/agents-notes/) | Separate coding models, agent clients, skills and engine interfaces before choosing a game-development workflow. |
| [Engines, rendering libraries, and content tools: sources and scope](https://openenvision.github.io/GameMap/docs/engines-notes/) | Compare game engines, rendering libraries and content tools by runtime role, source status and integration needs. |
| [2D / 3D Game Development AI: Research Notes](https://openenvision.github.io/GameMap/docs/game-ai-notes/) | Review AI contributions across 2D and 3D development, including executable interfaces, version limits and evaluation claims. |
| [Cadle-like repository research import](https://openenvision.github.io/GameMap/docs/cadle-repositories/) | Inspect a source-reviewed ledger of Cadle-related games, browser projects, engines and agent harnesses, including unresolved candidates. |
| [Coding World Models: Categories, Selection, and Research Notes](https://openenvision.github.io/GameMap/docs/world-model-notes/) | Distinguish executable code worlds, hybrid renderers, neural simulation and generated 3D scenes, with release and hardware limits. |

</details>

<details>
<summary>Production & engineering · 8</summary>

| Document | Purpose |
| --- | --- |
| [Production research dossiers](https://openenvision.github.io/GameMap/docs/research-index/) | Navigate production research by task, from engine operations and asset delivery to state, debugging and evaluation evidence. |
| [Production tools and acceptance boundaries](https://openenvision.github.io/GameMap/docs/production-research-notes/) | Connect production-stage tools and interfaces to concrete artifacts, completion signals and the gaps that still need testing. |
| [Engine operations: completion, recovery, and evidence](https://openenvision.github.io/GameMap/docs/engine-operation-contracts/) | Define engine operations with explicit inputs, completion, failure, cancellation and persisted output instead of relying on tool success messages. |
| [Production work orders: artifacts, recovery and acceptance](https://openenvision.github.io/GameMap/docs/production-work-orders/) | Adapt bounded production task templates for asset integration, navigation, multiplayer, builds and other engine workflows. |
| [Studio production case studies and acceptance lessons](https://openenvision.github.io/GameMap/docs/studio-production-case-studies/) | Translate documented game-studio engineering accounts into proposed workflows while preserving each source's scope and limits. |
| [Native operation details and lifecycle boundaries](https://openenvision.github.io/GameMap/docs/native-operation-details/) | Look up native commands and lifecycle boundaries for import, rendering, input, audio, dialogue and browser captions. |
| [Production debugging and evidence contracts](https://openenvision.github.io/GameMap/docs/production-debugging-contracts/) | Match profiler, GPU, physics, memory and build evidence to a specific failure and a repeatable diagnostic task. |
| [Production coverage and remaining work](https://openenvision.github.io/GameMap/docs/production-coverage-gaps/) | See which production interfaces and evidence contracts are documented and which executable integrations remain unfinished. |

</details>

<details>
<summary>Assets & generative tools · 7</summary>

| Document | Purpose |
| --- | --- |
| [Generative tools: additional source-reviewed research](https://openenvision.github.io/GameMap/docs/generative-tools-research/) | Review generation tools by the assets they produce, their documented interfaces and the work still required for game integration. |
| [Generative API and model boundaries](https://openenvision.github.io/GameMap/docs/generative-api-boundaries/) | Check authentication, job lifecycle, quotas, output access and usage conditions before integrating a generative service. |
| [Generation jobs, artifact delivery and asset acquisition](https://openenvision.github.io/GameMap/docs/generation-delivery-contracts/) | Track generated jobs and artifacts through retrieval, cancellation, provenance and delivery to an engine or content pipeline. |
| [Asset interchange and validation contracts](https://openenvision.github.io/GameMap/docs/asset-validation-contracts/) | Validate sprites, tilemaps, meshes, rigs, collision, materials and audio against the runtime behavior each asset must support. |
| [Asset candidate selection and visual-feedback creation](https://openenvision.github.io/GameMap/docs/asset-selection-feedback/) | Turn asset search and review into a bounded selection process with candidate identity, reasons, feedback and acceptance checks. |
| [Visual evidence and agent-harness research](https://openenvision.github.io/GameMap/docs/visual-evidence-research/) | Choose screenshot, segmentation, video and frame-readback evidence with explicit capture identity and observation limits. |
| [Visual-feedback mechanisms for game-creation harnesses](https://openenvision.github.io/GameMap/docs/visual-feedback-mechanisms/) | Design a visual feedback loop that joins observations, task context, proposed edits and checks without treating an image as proof of success. |

</details>

<details>
<summary>Evidence & evaluation · 7</summary>

| Document | Purpose |
| --- | --- |
| [Additional evaluation research for agents that create games](https://openenvision.github.io/GameMap/docs/game-development-evaluation/) | Choose evaluation tasks and metrics that distinguish code completion, game behavior, visual quality and player experience. |
| [Reproducing game-development benchmarks](https://openenvision.github.io/GameMap/docs/benchmark-reproducibility/) | Audit game-agent benchmarks by environments, actions, resets, seeds, versions and the evidence needed to reproduce a result. |
| [Gameplay state, narrative checkpoints and durable effects](https://openenvision.github.io/GameMap/docs/gameplay-state-contracts/) | Specify durable gameplay state across saves, retries, narrative transitions, cancellation and restored world effects. |
| [Coding-agent game interfaces: source evidence](https://openenvision.github.io/GameMap/docs/agent-interface-evidence/) | Review engine-agent interfaces for permissions, observations, reset behavior and evidence of the operations they actually expose. |
| [Catalog review coverage](https://openenvision.github.io/GameMap/docs/catalog-review-coverage/) | Read the catalog's source-review ledger, including verification scope, rejected claims and remaining coverage gaps. |
| [Source revision and implementation boundaries](https://openenvision.github.io/GameMap/docs/source-revision-notes/) | Trace research claims to reviewed source revisions and distinguish stable release evidence from moving documentation. |
| [Community AI game case review](https://openenvision.github.io/GameMap/docs/community-case-research/) | Inspect the research log behind community game cases, including source completeness, AI attribution, play checks and rejected candidates. |

</details>

<details>
<summary>About this atlas · 7</summary>

| Document | Purpose |
| --- | --- |
| [GameMap](https://openenvision.github.io/GameMap/docs/overview/) | Explore GameMap, an OpenEnvision project connecting AI game-development tools, playable projects and practical production knowledge. |
| [Awesome AI Game Development](https://openenvision.github.io/GameMap/docs/catalog/) | Browse the complete resource catalog with categories, source links and scope notes for AI-assisted game development. |
| [Contributing to GameMap](https://openenvision.github.io/GameMap/docs/contributing/) | Contribute resources and game cases with primary evidence, accurate source scope, runnable access and clear attribution. |
| [GameMap demo media sources](https://openenvision.github.io/GameMap/docs/media-sources/) | Trace project previews and recordings to their original creators, capture methods, credits and reuse limitations. |
| [GameMap resource logo sources](https://openenvision.github.io/GameMap/docs/icon-sources/) | Find the official sources, local files and attribution records for resource logos and visual identity assets. |
| [Website development and deployment](https://openenvision.github.io/GameMap/docs/deployment/) | Run the ready-to-host static GameMap snapshot locally, verify its paths, and publish the complete folder with GitHub Pages. |
| [Content model and coverage contract](https://openenvision.github.io/GameMap/docs/content-model/) | Understand registered content kinds, source ownership, localization, generated outputs and completeness checks. |

</details>

<details>
<summary>Skills & practice · 3</summary>

| Document | Purpose |
| --- | --- |
| [Level design skill](https://openenvision.github.io/GameMap/docs/level-design-skill/) | Use a source-attributed level-design skill package with topical references, brief and playtest templates, and clear license terms. |
| [Level Design: From Intended Experience to Tested Space](https://openenvision.github.io/GameMap/docs/skills/level-design/SKILL/) | Route a level-design task from player intent and research through layout, grayboxing, playtesting and revision. |
| [Attribution, License, and Adaptation Notice](https://openenvision.github.io/GameMap/docs/skills/level-design/LICENSE/) | Read attribution and CC BY-NC-SA 4.0 reuse conditions for the unofficial Level Design Book skill adaptation. |

</details>

<details>
<summary>Chinese-language guides · 5</summary>

| Document | Purpose |
| --- | --- |
| [How to use this resource library (Chinese)](https://openenvision.github.io/GameMap/docs/zh/reading-guide/) | Choose tools, cases or research for your current question, and distinguish sources, runnability, licenses and the scope of actual validation. |
| [From an idea to a playable game (Chinese)](https://openenvision.github.io/GameMap/docs/zh/practical-guide/) | Complete start, play, win/loss and retry in a dependency-free HTML game, then make one clearly bounded change. |
| [Level design skill (Chinese)](https://openenvision.github.io/GameMap/docs/zh/level-design-skill/) | Learn the skill’s scope, download entry point, brief and playtest templates, sources and noncommercial license conditions. |
| [Run and publish GameMap (Chinese)](https://openenvision.github.io/GameMap/docs/zh/deployment/) | Preview the complete static site, verify navigation and search, and publish it with GitHub Pages. |
| [Discover games and publish your own (Chinese)](https://openenvision.github.io/GameMap/docs/zh/publishing-platforms/) | Explore official entry points for Steam, itch.io and other game platforms, distinguishing play, downloads, source access and release status. |

</details>

<details>
<summary>Level-design references, templates & historical notes · 19</summary>

| Document | Purpose |
| --- | --- |
| [Historical design archive · first concept](https://openenvision.github.io/GameMap/docs/design/design-system/) | Historical archive of GameMap's first visual concept; its palette, fonts and layout are superseded rather than current requirements. |
| [Historical design archive · World Studio concept](https://openenvision.github.io/GameMap/docs/design/v2/design-system/) | Historical archive of the World Studio concept, preserving an earlier design iteration and its superseded build assumptions. |
| [GameMap editorial art prompts](https://openenvision.github.io/GameMap/docs/editorial-art-prompts/) | Inspect the prompts and provenance for GameMap's AI-generated editorial artwork, separate from authentic project previews. |
| [Blockout, Massing, Landscape, Composition, and Metrics](https://openenvision.github.io/GameMap/docs/skills/level-design/references/blockout-metrics/) | Plan graybox massing, terrain, composition and player-scale metrics before committing to finished environment art. |
| [Studying Levels and Transferring Their Relationships](https://openenvision.github.io/GameMap/docs/skills/level-design/references/case-studies/) | Study existing levels by reconstructing spatial and gameplay relationships, then adapt those relationships to a new brief. |
| [Combat, Enemy Roles, Encounters, Cover, and Map Balance](https://openenvision.github.io/GameMap/docs/skills/level-design/references/combat-balance/) | Design encounters around enemy roles, sightlines, cover, movement and multiplayer balance, then test the resulting decisions. |
| [Level Design as Culture and Historical Practice](https://openenvision.github.io/GameMap/docs/skills/level-design/references/culture-history/) | Place level-design practices in their cultural and historical context instead of treating familiar conventions as universal rules. |
| [Foundations, Pre-production, Research, Worldbuilding, and Scope](https://openenvision.github.io/GameMap/docs/skills/level-design/references/foundations/) | Set player intent, research questions, worldbuilding constraints and project scope before drawing a level layout. |
| [Learning, Teaching, Exercises, Critique, and Portfolios](https://openenvision.github.io/GameMap/docs/skills/level-design/references/learning/) | Use exercises, critique, teaching methods and portfolio evidence to develop and explain level-design decisions. |
| [Lighting, Darkness, Environment Art, Texturing, and Storytelling](https://openenvision.github.io/GameMap/docs/skills/level-design/references/lighting-art/) | Use lighting, darkness, materials and environmental storytelling to support navigation, readability and the intended experience. |
| [Optimization, Documentation, Packaging, and Release](https://openenvision.github.io/GameMap/docs/skills/level-design/references/optimization-release/) | Prepare a level for release through performance work, documentation, packaging and checks on the target build. |
| [Scripting, Navigation, and Doors](https://openenvision.github.io/GameMap/docs/skills/level-design/references/scripting-doors/) | Specify scripted interactions, navigation dependencies and door states with readable feedback and recoverable behavior. |
| [Source Map and Reading Coverage](https://openenvision.github.io/GameMap/docs/skills/level-design/references/source-map/) | Trace the level-design skill's topics and adaptations to the original Level Design Book reading coverage. |
| [Layout, Flow, Verticality, Critical Paths, and Gates](https://openenvision.github.io/GameMap/docs/skills/level-design/references/spatial-layout/) | Shape critical paths, alternate routes, gates, verticality and flow around the choices a player should make. |
| [Tools, Resources, TrenchBroom, Quake, and File Formats](https://openenvision.github.io/GameMap/docs/skills/level-design/references/tools-quake/) | Review TrenchBroom, Quake workflows and level file formats with the tool and engine boundaries each requires. |
| [Wayfinding, Player Understanding, and Playtesting](https://openenvision.github.io/GameMap/docs/skills/level-design/references/wayfinding-playtesting/) | Test how players understand a space using observed routes, wayfinding cues and playtest evidence rather than designer assumptions. |
| [Level Brief Template](https://openenvision.github.io/GameMap/docs/skills/level-design/templates/level-brief/) | Fill in a level brief with player intent, scope, routes, encounter goals, constraints and observable acceptance criteria. |
| [Playtest Report Template](https://openenvision.github.io/GameMap/docs/skills/level-design/templates/playtest-report/) | Record a playtest's task, observed behavior, participant comments, blockers and follow-up checks without mixing evidence and interpretation. |
| [Level Review Template](https://openenvision.github.io/GameMap/docs/skills/level-design/templates/review/) | Review a level's goals, spatial flow, readability, encounters, technical limits and next revisions using a reusable checklist. |

</details>

<a id="usage"></a>

## Local preview and GitHub Pages

This repository contains the static website and its runtime files. No npm installation or build step is required to preview or host this snapshot.

### Preview locally

Run this command from the project root:

```sh
python3 tools/preview.py
```

- English homepage: <http://127.0.0.1:4173/GameMap/>
- Chinese homepage: <http://127.0.0.1:4173/GameMap/zh/>
- Stop the server with `Ctrl+C`.
- If the port is occupied, run `python3 tools/preview.py --port 4174` and use the new port in the URL.

Modules, search, and navigation require an HTTP server. Opening `index.html` directly with `file://` does not load the site's resource paths and module requests correctly.

### Publish with GitHub Pages

1. Upload the complete project to a repository named **`GameMap`**, including every subdirectory and the hidden `.nojekyll` file.
2. Keep `index.html` at the repository root.
3. Under **Settings → Pages**, select **Deploy from a branch → main → /(root)**, save, and wait for deployment to complete.
4. Visit `https://YOUR-USERNAME.github.io/GameMap/`; the Chinese homepage is at `/GameMap/zh/`.

The current path prefix is `/GameMap/`. A different repository name or hosting path requires corresponding updates to the static pages and runtime paths. See the [GitHub Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for publishing-source settings.

### File organization

The two visible files at the top level are `index.html` and `readme.md`. Runtime content is grouped by purpose:

| Directory | Purpose |
| --- | --- |
| `assets/` | JavaScript, styles, fonts, the site icon, and third-party notices. |
| `media/`, `brand/`, `logos/` | Images, videos, and brand assets. |
| `data/` | Navigation data, search indexes, JSON catalogs, BibTeX, and site metadata. |
| `tools/` | The local static preview server. |
| `skills/` | Downloadable skill packages. |
| Section directories and `zh/` | English and Chinese pages corresponding to website routes. Keep their names and internal layout intact. |

`.nojekyll` lets GitHub Pages publish the static files as provided. All `.data` files live under `data/`, preserving their section hierarchy, and the runtime uses those request paths. Existing pages support direct access and refresh. No custom 404 page is bundled; missing files receive the host’s standard HTTP error response. The sitemap is stored at `data/seo/sitemap.xml`.

<a id="data-and-attribution"></a>

## Data, curation, and attribution

### Reusable data

| Dataset | Contents |
| --- | --- |
| [Resource catalog](data/resources.json) | Categories, summaries, use cases, tags, source links, and review dates for all 115 resources. |
| [Test resources](data/testing-resources.json) | Projects, environments, assets, motion data, tasks, and recorded usage conditions. |
| [Repository research](data/repository-research.json) | Repository groups, inspection scope, source revisions, and research records. |
| [Papers and research materials](data/papers.json) · [BibTeX](data/papers.bib) | Titles, authors, years, topics, and original publication links. |
| [Paper provenance and availability](data/papers-provenance.json) | Bibliography sources, associated code, project pages, and availability records. |
| [English search index](data/search-index.json) · [Chinese search index](data/zh/search-index.json) | Searchable content across the website's collections. |

This README uses the website data bundled with this repository. The curated resources carry source-review dates from **October 18–20, 2026**, taken from the original catalog records. Project versions, service capabilities, and access conditions may change at their upstream sources.

### Curation principles

- Prefer project authors, official documentation, original papers, public source, and creator build logs. Retain original project names and attribution.
- Describe where each resource fits in development, and identify research prototypes, services, SDKs, full game projects, generators, and recordings accurately.
- When updating an entry, check its name, URL, purpose, category, and code or demo scope. New entries should include a primary source and enough context to assess their use.
- Projects, code, models, and assets have individual licenses and terms. Their original sources and linked catalog records provide the applicable details.

Projects, papers, game footage, and brand marks belong to their respective authors or rights holders. The website includes its [third-party notices](assets/licenses/THIRD-PARTY-NOTICES.txt).

The Level Design Book skill is an unofficial adaptation of the book by **Robert Yang and contributors, including Andrew Yoder**. Its **CC BY-NC-SA 4.0** license and attribution requirements are documented in the [skill guide](https://openenvision.github.io/GameMap/docs/level-design-skill/) and [downloadable package](skills/level-design.zip); the package's notices define the scope of that license.

This directory contains the static website and its runtime data. Source files, build dependencies, and design originals are stored in the complete backup outside this project directory. A new export must retain the resource organization and data-request path adaptations used by this snapshot.

[Back to top](#top)
