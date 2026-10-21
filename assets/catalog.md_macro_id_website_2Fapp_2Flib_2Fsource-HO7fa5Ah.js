import{j as e}from"./jsx-runtime-BE0eTAub.js";let r={title:"Awesome AI Game Development",description:"Browse the complete resource catalog with categories, source links and scope notes for AI-assisted game development."},a={contents:[{heading:void 0,content:"> A planning map for AI game development — from an idea to a playable world."},{heading:void 0,content:"**115 curated primary sources** connecting coding agents, game engines, AI for 2D and 3D development, production tools, and code world models. Start with the categories below, then follow each entry's setup, release scope, and source links."},{heading:void 0,content:"Interactive GameMap website — GitHub Pages"},{heading:void 0,content:"A practical guide from resources to a working project"},{heading:void 0,content:"Production research: interfaces, evidence and generative-service boundaries"},{heading:void 0,content:"Tutorials, playable demos, and complete example-game source"},{heading:void 0,content:"Coding agents × games: skills, bridges, evaluations, and game code"},{heading:void 0,content:"Testing library: games, AI environments, assets, rigs, and motion data"},{heading:void 0,content:"Paper List: official code, licenses, project pages, and demo filters"},{heading:void 0,content:"Repository research: implementation access and source evidence"},{heading:void 0,content:"Project demos: live experiences and recorded research cases"},{heading:void 0,content:"Publishing platforms: Steam, itch.io, web portals, and stores"},{heading:void 0,content:"Contributing and data maintenance · Structured JSON"},{heading:"how-to-read-the-map",content:`| Layer                          | What it addresses                           | Evidence to look for                                |
| ------------------------------ | ------------------------------------------- | --------------------------------------------------- |
| Model / coding agent / harness | Reasoning, code changes, and tool execution | Actual tools, runtime feedback, and supported tasks |`,table:"table-0"},{heading:"how-to-read-the-map",content:`| Layer             | What it addresses                   | Evidence to look for                                  |
| ----------------- | ----------------------------------- | ----------------------------------------------------- |
| Skill / MCP / CLI | Domain knowledge and engine editing | Real SKILL.md files, protocols, and editor operations |`,table:"table-0"},{heading:"how-to-read-the-map",content:`| Layer            | What it addresses                                     | Evidence to look for                                 |
| ---------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| Framework / tool | Organizing generation or completing a production task | Inputs, outputs, project formats, and release status |`,table:"table-0"},{heading:"how-to-read-the-map",content:`| Layer     | What it addresses                 | Evidence to look for                               |
| --------- | --------------------------------- | -------------------------------------------------- |
| Benchmark | Repeatable development evaluation | Tasks, scoring scripts, environments, and versions |`,table:"table-0"},{heading:"how-to-read-the-map",content:`| Layer               | What it addresses                                        | Evidence to look for                                                                   |
| ------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Paper / world model | Executable state, neural simulation, or hybrid rendering | World representation, action interface, long-term consistency, and public availability |`,table:"table-0"},{heading:"how-to-read-the-map",content:"**Tool roles.** DeepSeek is listed through its model integration documentation, rather than as an official standalone harness. Blender is a DCC application and Three.js is a 3D library; their roles differ from those of full game engines. Development, gameplay, and modeling evaluations are considered separately. SolarRenderer and StreamRender-H3 belong to the structure- or engine-driven hybrid rendering track; pure video world models are labeled separately."},{heading:"contents",content:"1. Coding agents and game development bridges — 20 resources"},{heading:"contents",content:"2. Game engines, DCC tools, and ecosystems — 24 resources"},{heading:"contents",content:"3. AI for 2D game development — 13 resources"},{heading:"contents",content:"4. AI for 3D game development — 15 resources"},{heading:"contents",content:"5. Game production: art, animation, audio, testing, and runtime AI — 23 resources"},{heading:"contents",content:"6. Code world models and interactive worlds — 20 resources"},{heading:"contents",content:'<a id="agents"></a>'},{heading:"agent",content:`| Resource     | Purpose and scope                                                                                                | Stages                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| OpenAI Codex | A general-purpose coding agent for reading, editing, running commands, and reviewing code in a local repository. | Planning / Coding / Testing / Shipping |`,table:"table-1"},{heading:"agent",content:`| Resource    | Purpose and scope                                                                                                                  | Stages                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Claude Code | A coding agent that reads and edits projects, runs tools, and supports skills, hooks, and MCP through terminal and IDE interfaces. | Planning / Coding / Testing / Shipping |`,table:"table-1"},{heading:"agent",content:`| Resource   | Purpose and scope                                                                                      | Stages                      |
| ---------- | ------------------------------------------------------------------------------------------------------ | --------------------------- |
| Gemini CLI | Google's open-source terminal coding agent with file access, shell tools, extensions, and MCP support. | Planning / Coding / Testing |`,table:"table-1"},{heading:"agent",content:`| Resource | Purpose and scope                                                                                        | Stages                      |
| -------- | -------------------------------------------------------------------------------------------------------- | --------------------------- |
| OpenCode | An open-source coding agent with multiple model providers, Plan / Build modes, and project instructions. | Planning / Coding / Testing |`,table:"table-1"},{heading:"agent",content:`| Resource | Purpose and scope                                                                                   | Stages                      |
| -------- | --------------------------------------------------------------------------------------------------- | --------------------------- |
| Cline    | An open-source coding agent with multiple models, Plan / Act modes, project rules, and MCP support. | Planning / Coding / Testing |`,table:"table-1"},{heading:"agent",content:`| Resource | Purpose and scope                                                                                          | Stages           |
| -------- | ---------------------------------------------------------------------------------------------------------- | ---------------- |
| Aider    | A terminal AI pair-programming tool built around repository maps, Git changes, and lint and test feedback. | Coding / Testing |`,table:"table-1"},{heading:"agent",content:"**OpenAI Codex**"},{heading:"agent",content:"Useful as the main code execution loop for a game project: break down gameplay, maintain scripts, run builds, and inspect failures. Engine integration still requires a CLI, editor bridge, or MCP server; compiling successfully does not establish that a game is playable."},{heading:"agent",content:"Tags: `CLI` · `General-purpose agent` · `Code review` · `MCP` · `Skills`. Source reviewed: 2026-10-18. Further reading: Official game workflow"},{heading:"agent",content:"**Claude Code**"},{heading:"agent",content:"Can develop game scripts, migrate architecture, troubleshoot builds, and connect to Unity, Godot, or UE through community MCP servers. Use CLAUDE.md, skills, and editor state together; one MCP demonstration does not establish complete engine automation."},{heading:"agent",content:"Tags: `CLI` · `General-purpose agent` · `MCP` · `Skills` · `Hooks`. Source reviewed: 2026-10-18. Further reading: Official repository and examples"},{heading:"agent",content:"**Gemini CLI**"},{heading:"agent",content:"Can help understand game projects, edit scripts, and drive editors through MCP. The official README states that Antigravity CLI replaced Gemini CLI for unpaid-tier and Google One users on June 18, 2026, and that Gemini CLI is not optimized for the latest Gemini models. Check the account-specific migration guidance before choosing this entry point."},{heading:"agent",content:"Tags: `CLI` · `Google` · `MCP` · `Open source` · `Migration guidance`. Source reviewed: 2026-10-18. Further reading: Official documentation"},{heading:"agent",content:"**OpenCode**"},{heading:"agent",content:"Useful for planning and editing game projects with independently selected providers and models. Pin V1 or V2: the V2 migration guide documents incompatible plugin/server APIs, external-directory access allowed by default, and no running LSP or LSP diagnostics despite accepted configuration. Validate permissions, MCP integrations, and compiler/test feedback for the chosen version; editor and gameplay inspection still require separate tools."},{heading:"agent",content:"Tags: `CLI` · `Multiple models` · `Plan / Build` · `Open source` · `AGENTS.md`. Source reviewed: 2026-10-18. Further reading: Source code · V1 to V2 migration boundaries"},{heading:"agent",content:"**Cline**"},{heading:"agent",content:"Useful for reviewing and editing game code in an IDE or CLI, with build output and MCP editor tools in the feedback loop. Reuse .clinerules and skills to capture engine conventions; editor operations depend on the specific bridge service."},{heading:"agent",content:"Tags: `IDE` · `CLI` · `Multiple models` · `MCP` · `Plan / Act`. Source reviewed: 2026-10-18. Further reading: Documentation"},{heading:"agent",content:"**Aider**"},{heading:"agent",content:"Useful for changes across files, refactoring, and testable logic in existing game projects, with model options including DeepSeek. It accepts supplied screenshots with a vision-capable model. Its code editing workflow does not directly control Unity, UE, or Blender editors; automated screenshot capture and game interaction need a separate setup."},{heading:"agent",content:"Tags: `CLI` · `Git` · `Repository map` · `Multiple models` · `Refactoring`. Source reviewed: 2026-10-19. Further reading: User documentation · Screenshot and image input"},{heading:"framework",content:`| Resource                 | Purpose and scope                                                                            | Stages                                 |
| ------------------------ | -------------------------------------------------------------------------------------------- | -------------------------------------- |
| OpenHands · Agent Canvas | An open-source development console for managing local, remote, and cloud agent environments. | Planning / Coding / Testing / Shipping |`,table:"table-2"},{heading:"framework",content:`| Resource                     | Purpose and scope                                                                                         | Stages                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------- |
| OpenHands Software Agent SDK | A programmable development framework for agents, tools, conversations, workspaces, and server interfaces. | Planning / Coding / Testing |`,table:"table-2"},{heading:"framework",content:`| Resource         | Purpose and scope                                                                                          | Stages                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------- |
| Claude Agent SDK | Embed Claude Code's tool loop, permissions, sessions, and extensions in Python or TypeScript applications. | Planning / Coding / Testing |`,table:"table-2"},{heading:"framework",content:`| Resource       | Purpose and scope                                                                                    | Stages           |
| -------------- | ---------------------------------------------------------------------------------------------------- | ---------------- |
| mini-swe-agent | A minimal shell-based coding-agent research baseline designed for modification and trace inspection. | Coding / Testing |`,table:"table-2"},{heading:"framework",content:"**OpenHands · Agent Canvas**"},{heading:"framework",content:"Can centralize multi-agent tasks, environments, and execution records for game projects. The repository provides the Agent Canvas frontend and orchestration entry point; the core tool loop and Agent Server live in a separate SDK repository. Game automation still requires engine tools."},{heading:"framework",content:"Tags: `Agent Canvas` · `Environments` · `Multi-agent` · `Open source` · `Orchestration`. Source reviewed: 2026-10-18. Further reading: Core SDK"},{heading:"framework",content:"**OpenHands Software Agent SDK**"},{heading:"framework",content:"Useful for wrapping builds, scene inspections, and tests as agent tools. The Python SDK supports local and remote workspaces; the checked TypeScript client is alpha and supports remote conversations through Agent Server only. Pin client/server versions rather than assuming interface parity. Game-specific tools and acceptance checks still need to be supplied."},{heading:"framework",content:"Tags: `SDK` · `Python` · `TypeScript` · `Workspaces` · `Reproducible experiments`. Source reviewed: 2026-10-19. Further reading: SDK documentation · TypeScript client scope and stability"},{heading:"framework",content:"**Claude Agent SDK**"},{heading:"framework",content:"Runs the Claude Code binary and tool loop inside a process you operate, with Python or TypeScript APIs for permissions, sessions, hooks, and MCP. It can support game-specific repair and validation services, but domain tools, scoring rules, and runtime environments must be supplied. This differs from a Client SDK for direct model calls; the official overview also specifies Anthropic Commercial Terms and separate authentication constraints."},{heading:"framework",content:"Tags: `SDK` · `Python` · `TypeScript` · `MCP` · `Hooks`. Source reviewed: 2026-10-18."},{heading:"framework",content:"**mini-swe-agent**"},{heading:"framework",content:"Useful for isolating model, prompt, and environment effects in game code generation and repair, or wrapping headless engine commands. Its minimal loop executes commands in independent subprocesses rather than a persistent shell, so working-directory and environment setup must be carried into each command or script. It is a general software-engineering baseline; playability, visuals, and physics require additional validation."},{heading:"framework",content:"Tags: `Research baseline` · `Shell` · `Harness` · `Traces` · `Open source`. Source reviewed: 2026-10-18. Further reading: Predecessor: SWE-agent"},{heading:"skill",content:`| Resource                 | Purpose and scope                                                                                                        | Stages                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| Unity-MCP Operator Guide | A practical MCP for Unity skill: inspect editor state, act, wait for compilation and domain reload, then verify results. | Coding / Scenes / Testing |`,table:"table-3"},{heading:"skill",content:"**Unity-MCP Operator Guide**"},{heading:"skill",content:"Defines resource-first scene operations and requires checking compilation, domain reload, tool readiness, and blocking reasons before further edits. Script changes are followed by console and screenshot checks. This is a procedure source for MCP for Unity, not an installed or tested integration here; examples and parameters depend on bridge, Unity, UI, and input-system versions."},{heading:"skill",content:"Tags: `Unity` · `Skills` · `MCP` · `Compilation feedback` · `Skill source`. Source reviewed: 2026-10-18."},{heading:"documentation",content:`| Resource                      | Purpose and scope                                                                                   | Stages                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------- |
| DeepSeek · Agent Integrations | Official guidance for using DeepSeek as a model backend within agent harnesses such as Claude Code. | Planning / Coding / Testing |`,table:"table-4"},{heading:"documentation",content:`| Resource  | Purpose and scope                                                                                     | Stages                                 |
| --------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------- |
| AGENTS.md | An open Markdown format for giving coding agents build commands, test rules, and project conventions. | Planning / Coding / Testing / Shipping |`,table:"table-4"},{heading:"documentation",content:`| Resource     | Purpose and scope                                                                                         | Stages                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Agent Skills | An open format that packages domain workflows as SKILL.md instructions, scripts, and reference materials. | Planning / Coding / Assets / Scenes / Testing / Shipping |`,table:"table-4"},{heading:"documentation",content:`| Resource                           | Purpose and scope                                                                                                | Stages                                          |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Codex · Create Browser-based Games | OpenAI's browser game workflow covering planning, project instructions, asset generation, and browser iteration. | Planning / Coding / Assets / Testing / Shipping |`,table:"table-4"},{heading:"documentation",content:"**DeepSeek · Agent Integrations**"},{heading:"documentation",content:"The Anthropic API compatibility layer connects DeepSeek to existing tool loops. The harness handles files, tests, and engine connections. The guide supports ordinary tool calls but ignores the server-side mcp_servers field and does not support MCP-specific content blocks. Client-side MCP tools therefore remain the harness's responsibility; API compatibility does not establish complete feature parity."},{heading:"documentation",content:"Tags: `DeepSeek` · `Model backend` · `Harness` · `API compatibility` · `Scope`. Source reviewed: 2026-10-18."},{heading:"documentation",content:"**AGENTS.md**"},{heading:"documentation",content:"Game projects can record engine versions, launch commands, directory rules, asset import conventions, and acceptance checks to reduce environment guesswork. This is a project instruction format rather than an agent runtime; discovery and configuration vary by client."},{heading:"documentation",content:"Tags: `Project instructions` · `Project conventions` · `Open format` · `Context`. Source reviewed: 2026-10-18."},{heading:"documentation",content:"**Agent Skills**"},{heading:"documentation",content:"Useful for repeatable game tasks such as sprite normalization, GLB export, scene inspection, and regression testing, with domain knowledge loaded as needed. Skills provide procedures and resources; engine control still requires tools, dependencies, and a compatible client."},{heading:"documentation",content:"Tags: `Skills` · `Open format` · `Workflows` · `Progressive loading`. Source reviewed: 2026-10-18."},{heading:"documentation",content:"**Codex · Create Browser-based Games**"},{heading:"documentation",content:"Define the player goal, core loop, inputs, and win and loss conditions, then implement with PLAN.md and AGENTS.md. Combine image skills and Playwright for visual and interaction feedback. This is a practical guide, not a performance guarantee for every game genre or a research benchmark."},{heading:"documentation",content:"Tags: `Official workflow` · `Browser games` · `Planning` · `Playwright` · `Asset consistency`. Source reviewed: 2026-10-18."},{heading:"tool",content:`| Resource      | Purpose and scope                                                                    | Stages                                        |
| ------------- | ------------------------------------------------------------------------------------ | --------------------------------------------- |
| MCP for Unity | A community MCP bridge connecting general-purpose coding agents to the Unity Editor. | Coding / Assets / Scenes / Testing / Shipping |`,table:"table-5"},{heading:"tool",content:`| Resource                | Purpose and scope                                                                                                  | Stages                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| Godot MCP · Coding-Solo | A community MCP server for launching Godot, running projects, reading logs, and performing basic scene operations. | Coding / Scenes / Testing |`,table:"table-5"},{heading:"tool",content:`| Resource        | Purpose and scope                                                                                            | Stages                             |
| --------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| MCP for Blender | A Blender add-on and MCP server for agent-driven modeling, materials, Python execution, and visual feedback. | Coding / Assets / Scenes / Testing |`,table:"table-5"},{heading:"tool",content:`| Resource                | Purpose and scope                                                                                     | Stages                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------- |
| Unreal MCP · chongdashu | A Python MCP server and UE C++ plugin connecting agents to Actors, Blueprints, and viewport controls. | Coding / Scenes / Testing |`,table:"table-5"},{heading:"tool",content:`| Resource       | Purpose and scope                                                                                                    | Stages             |
| -------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Playwright MCP | Microsoft's browser automation MCP server for exposing page structure, interactions, and browser feedback to agents. | Testing / Shipping |`,table:"table-5"},{heading:"tool",content:"**MCP for Unity**"},{heading:"tool",content:"Exposes editor operations for scenes, GameObjects, C# scripts, assets, and tests. The checked installation source declares Unity 2021.3 LTS or newer, plus Python 3.10+ and uv. These are declared requirements, not versions tested here. The project is independent of Unity Technologies; pin bridge/editor versions and validate compilation, screenshots, and PlayMode tests."},{heading:"tool",content:"Tags: `Unity` · `MCP` · `Editor bridge` · `Community project` · `C#`. Source reviewed: 2026-10-19. Further reading: Installation and tool documentation · Pinned installation requirements"},{heading:"tool",content:"**Godot MCP · Coding-Solo**"},{heading:"tool",content:"Supports project execution, debug output capture, scene and node creation, Sprite2D texture loading, and some 3D MeshLibrary operations. It can give agents feedback from real projects; these interfaces do not provide complete visual playtesting or every editor feature. At the checked commit, the server keeps one active project process and sends kill before spawning another without awaiting prior exit. Stop returns after sending a kill request rather than waiting for process exit; natural exit clears the handle used by get_debug_output. Archive output separately for reliable crash evidence."},{heading:"tool",content:"Tags: `Godot` · `MCP` · `GDScript` · `Runtime logs` · `Scenes`. Source reviewed: 2026-10-18. Further reading: Pinned implementation and lifecycle limits"},{heading:"tool",content:"**MCP for Blender**"},{heading:"tool",content:"Useful for 3D game assets and scene prototypes with viewport feedback. Formerly blender-mcp, this community bridge can execute arbitrary Python inside Blender; use trusted tasks and saved copies. The checked documentation distinguishes default minimal usage telemetry from opt-in creative-content collection; DISABLE_TELEMETRY=true disables both. Review the opt-in data terms before enabling content capture. Validate topology, scale, UVs, collision, and exports separately."},{heading:"tool",content:"Tags: `Blender` · `MCP` · `Python` · `3D assets` · `Community project`. Source reviewed: 2026-10-19. Further reading: Telemetry defaults and controls · Opt-in content and data terms"},{heading:"tool",content:"**Unreal MCP · chongdashu**"},{heading:"tool",content:"Covers Actor transforms, Blueprint classes and components, some node graphs, and editor camera operations. The README declares Unreal Engine 5.5+ and Python 3.12+ and supplies a UE5.5 example; later-version compatibility is not independently tested here. The author marks it experimental and advises against production use. Pin versions and verify supported operations individually."},{heading:"tool",content:"Tags: `Unreal Engine` · `MCP` · `Blueprint` · `Experimental` · `Editor bridge`. Source reviewed: 2026-10-18. Further reading: Tool documentation"},{heading:"tool",content:"**Playwright MCP**"},{heading:"tool",content:"Useful for browser game menus, HUDs, launch flows, keyboard input, and screenshots. The default interface uses accessibility trees; coordinate-based mouse tools require the optional vision capability. Neither interface automatically exposes internal Canvas or WebGL state, so game debug instrumentation may be needed. The checked README warns that the server is not a security boundary and documents browser_run_code_unsafe as arbitrary JavaScript execution in the Playwright server process. The separate Playwright CLI repository provides a CLI + Skills workflow."},{heading:"tool",content:"Tags: `Playwright` · `MCP` · `Browser testing` · `HUD` · `Canvas limitations`. Source reviewed: 2026-10-19. Further reading: Pinned tools and security boundaries · Companion CLI + Skills"},{heading:"tool",content:'<a id="engines"></a>'},{heading:"framework-1",content:`| Resource          | Purpose and scope                                                                                       | Stages                               |
| ----------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| React Three Fiber | A React renderer for Three.js that brings component-based, declarative scenes into the React ecosystem. | Planning / Coding / Scenes / Testing |`,table:"table-6"},{heading:"framework-1",content:"**React Three Fiber**"},{heading:"framework-1",content:"Useful for combining web HUDs, application state, and 3D scenes, with pmndrs tools for loading, interaction, and debugging. It does not supply every game system; match React, Fiber, and Three.js versions and define clear boundaries for per-frame simulation."},{heading:"framework-1",content:"Tags: `Three.js` · `React` · `R3F` · `pmndrs` · `Declarative scenes`. Source reviewed: 2026-10-18. Further reading: Source code"},{heading:"documentation-1",content:`| Resource                      | Purpose and scope                                                                                          | Stages                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------- |
| Godot · Command Line Tutorial | Godot's official CLI reference for headless operation, script checks, asset import, execution, and export. | Coding / Testing / Shipping |`,table:"table-7"},{heading:"documentation-1",content:`| Resource            | Purpose and scope                                                                        | Stages                               |
| ------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| Godot Demo Projects | Official runnable Godot examples covering 2D, 3D, GUI, audio, networking, and rendering. | Planning / Coding / Scenes / Testing |`,table:"table-7"},{heading:"documentation-1",content:`| Resource              | Purpose and scope                                                                                | Stages                             |
| --------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------- |
| Unity · 2D Tech Demos | Official Unity 2D example source for Tilemaps, Scripted Tiles, brushes, and runtime map changes. | Coding / Assets / Scenes / Testing |`,table:"table-7"},{heading:"documentation-1",content:`| Resource         | Purpose and scope                                                                           | Stages                               |
| ---------------- | ------------------------------------------------------------------------------------------- | ------------------------------------ |
| Lyra Sample Game | Epic's modular UE5 sample game, with gameplay plugins, abilities, animation, input, and UI. | Planning / Coding / Scenes / Testing |`,table:"table-7"},{heading:"documentation-1",content:`| Resource            | Purpose and scope                                                                   | Stages                             |
| ------------------- | ----------------------------------------------------------------------------------- | ---------------------------------- |
| Three.js · Examples | Official runnable Three.js graphics examples with their HTML and JavaScript source. | Coding / Assets / Scenes / Testing |`,table:"table-7"},{heading:"documentation-1",content:`| Resource                        | Purpose and scope                                                                                  | Stages                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Blender Python · API Quickstart | Official Blender API tutorial source covering bpy data, context, operators, and Python operations. | Coding / Assets / Scenes / Testing |`,table:"table-7"},{heading:"documentation-1",content:`| Resource          | Purpose and scope                                                                                  | Stages                    |
| ----------------- | -------------------------------------------------------------------------------------------------- | ------------------------- |
| Phaser · Examples | Official Phaser example source with runnable references for specific APIs and gameplay components. | Coding / Scenes / Testing |`,table:"table-7"},{heading:"documentation-1",content:`| Resource                           | Purpose and scope                                                                 | Stages                    |
| ---------------------------------- | --------------------------------------------------------------------------------- | ------------------------- |
| Unreal Engine · Remote Control API | Exposes reflected editor properties and functions over HTTP for external tooling. | Coding / Scenes / Testing |`,table:"table-7"},{heading:"documentation-1",content:`| Resource                                    | Purpose and scope                                                                                | Stages                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Unity · Addressables Build and Loading APIs | Builds addressable content from explicit profiles and loads assets through asynchronous handles. | Assets / Coding / Shipping / Runtime AI |`,table:"table-7"},{heading:"documentation-1",content:"**Godot · Command Line Tutorial**"},{heading:"documentation-1",content:"Lets coding agents launch projects, read logs, parse scripts, and export builds through commands, reducing GUI dependence. The --check-only flag parses a script supplied with --script; it does not execute gameplay tests. Supported flags vary by build type, and unknown flags are silently ignored; check the selected binary's --help. Headless runs cannot replace real rendering and input tests."},{heading:"documentation-1",content:"Tags: `Godot` · `CLI` · `Headless` · `Builds` · `Reproducibility`. Source reviewed: 2026-10-19."},{heading:"documentation-1",content:"**Godot Demo Projects**"},{heading:"documentation-1",content:"Useful as minimal reference projects and regression tasks for agents, with concrete examples of scenes, scripts, and resources. The repository states that master targets the development engine; choose a matching branch for a stable release to avoid mistaking version conflicts for generation failures."},{heading:"documentation-1",content:"Tags: `Godot` · `Official examples` · `Runnable source` · `Version branches` · `Reference projects`. Source reviewed: 2026-10-18."},{heading:"documentation-1",content:"**Unity · 2D Tech Demos**"},{heading:"documentation-1",content:"Offers source scenes for tile collision lookup, destructible maps, and palette switching. The inspected project records Unity 6000.3.3f1, URP 17.3.0, and Input System 1.17.0, while the README says 2021.1 onward. Its manifest selects 2d-extras' package_6000.3 Git branch but the committed lockfile records registry 6.0.1; resolve and pin dependencies before testing. Source review did not establish import, playback, or compatibility across Editor versions."},{heading:"documentation-1",content:"Tags: `Unity` · `2D` · `Tilemap` · `Official examples` · `Runnable source`. Source reviewed: 2026-10-19. Further reading: Pinned editor baseline · Pinned package manifest · Pinned package lock"},{heading:"documentation-1",content:"**Lyra Sample Game**"},{heading:"documentation-1",content:"Useful for learning how Game Feature Plugins, Experiences, and the Gameplay Ability System work together in a real project. Source and content are distributed through Fab / Epic Launcher and require a matching engine version. Lyra is more complex than a minimal prototype, so study it by module. The official Fab listing marks its content for use only with Unreal Engine-based products."},{heading:"documentation-1",content:"Tags: `Unreal Engine` · `Official sample` · `GAS` · `Modular design` · `Runnable project`. Source reviewed: 2026-10-19. Further reading: Official Fab listing"},{heading:"documentation-1",content:"**Three.js · Examples**"},{heading:"documentation-1",content:"Provides minimal references for loaders, lighting, materials, animation, and rendering techniques to adapt into game scenes. The website and dev branch change continuously; keep source, addons, and runtime on the same release rather than mixing example versions."},{heading:"documentation-1",content:"Tags: `Three.js` · `Official examples` · `Materials` · `Loaders` · `Runnable source`. Source reviewed: 2026-10-18. Further reading: Example source"},{heading:"documentation-1",content:"**Blender Python · API Quickstart**"},{heading:"documentation-1",content:"Provides authoritative guidance for asset scripts, especially the distinction between direct data access and operations that depend on the current mode, selection, or viewport. bpy.ops poll checks can fail because of context; scripts should inspect actual state and verify outputs, beyond syntax checks."},{heading:"documentation-1",content:"Tags: `Blender` · `Python` · `bpy` · `Context` · `Automation`. Source reviewed: 2026-10-18. Further reading: API documentation"},{heading:"documentation-1",content:"**Phaser · Examples**"},{heading:"documentation-1",content:"Official examples for animation, cameras, input, physics, and scene transitions. The current README targets Phaser 4, and the labs site defaults to its latest development build; select and pin the version matching your project. The MIT license covers example code, not bundled art assets. Review asset permissions before reuse and test in a real browser."},{heading:"documentation-1",content:"Tags: `Phaser` · `Official examples` · `Runnable source` · `2D` · `Version scope`. Source reviewed: 2026-10-18."},{heading:"documentation-1",content:"**Unreal Engine · Remote Control API**"},{heading:"documentation-1",content:"Remote Control provides a native engine integration surface distinct from a community MCP bridge. Property writes can request editor transactions and change notifications, but an acknowledged mutation does not establish package-save completion. The rolling Epic guide labels this feature Beta and disables it by default in packaged builds and -game. Enable the appropriate plugin, restrict network exposure, and qualify editor versus packaged-runtime access separately."},{heading:"documentation-1",content:"Tags: `Unreal Engine` · `HTTP` · `Editor automation` · `State mutation`. Source reviewed: 2026-10-18. Further reading: HTTP API reference"},{heading:"documentation-1",content:"**Unity · Addressables Build and Loading APIs**"},{heading:"documentation-1",content:"The checked Addressables 1.21 documentation separates content builds from executable builds. Build settings, active profile, builder, and content-state file affect outputs. Runtime loading returns a handle whose status and result must be checked and later released. A key matching several assets can select only the first; preserve dependency and cache provenance."},{heading:"documentation-1",content:"Tags: `Unity` · `Addressables` · `Asset dependencies` · `Async loading` · `Content builds`. Source reviewed: 2026-10-18. Further reading: LoadAssetAsync reference"},{heading:"tool-1",content:`| Resource                              | Purpose and scope                                                                                                    | Stages                                                   |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Godot Engine · Official Documentation | An open-source 2D and 3D game engine that organizes runnable projects through scenes, nodes, resources, and scripts. | Planning / Coding / Assets / Scenes / Testing / Shipping |`,table:"table-8"},{heading:"tool-1",content:`| Resource              | Purpose and scope                                                                                   | Stages           |
| --------------------- | --------------------------------------------------------------------------------------------------- | ---------------- |
| GUT · Godot Unit Test | A community Godot testing framework for GDScript assertions, test doubles, and parameterized cases. | Coding / Testing |`,table:"table-8"},{heading:"tool-1",content:`| Resource       | Purpose and scope                                                                                                   | Stages                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Unity · Manual | Official Unity documentation for projects, the editor, scripting, rendering, physics, asset import, and publishing. | Planning / Coding / Assets / Scenes / Testing / Shipping |`,table:"table-8"},{heading:"tool-1",content:`| Resource             | Purpose and scope                                                                          | Stages                      |
| -------------------- | ------------------------------------------------------------------------------------------ | --------------------------- |
| Unity Test Framework | Unity's official testing framework, with Edit mode, Play mode, and command-line execution. | Coding / Testing / Shipping |`,table:"table-8"},{heading:"tool-1",content:`| Resource                      | Purpose and scope                                                                                 | Stages                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Unreal Engine · Documentation | Official Epic documentation for UE C++, Blueprints, rendering, animation, physics, and packaging. | Planning / Coding / Assets / Scenes / Testing / Shipping |`,table:"table-8"},{heading:"tool-1",content:`| Resource                           | Purpose and scope                                                                                   | Stages                               |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Unreal · Automation Test Framework | UE's official infrastructure for unit, functional, content stress, and screenshot comparison tests. | Coding / Scenes / Testing / Shipping |`,table:"table-8"},{heading:"tool-1",content:`| Resource | Purpose and scope                                                                             | Stages                                                   |
| -------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Three.js | A JavaScript 3D rendering library for browsers, with scenes, cameras, materials, and loaders. | Planning / Coding / Assets / Scenes / Testing / Shipping |`,table:"table-8"},{heading:"tool-1",content:`| Resource | Purpose and scope                                                                                        | Stages                    |
| -------- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| Blender  | An open-source 3D creation suite for modeling, materials, rigging, animation, simulation, and rendering. | Assets / Scenes / Testing |`,table:"table-8"},{heading:"tool-1",content:`| Resource                  | Purpose and scope                                                                                           | Stages                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Khronos · glTF-Blender-IO | Khronos's official Blender glTF 2.0 importer and exporter source, including validation and roundtrip tests. | Assets / Scenes / Testing / Shipping |`,table:"table-8"},{heading:"tool-1",content:`| Resource                  | Purpose and scope                                                                                            | Stages                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Phaser · First Game Guide | A browser 2D game framework whose official tutorial covers assets, scenes, animation, input, and collisions. | Planning / Coding / Assets / Scenes / Testing / Shipping |`,table:"table-8"},{heading:"tool-1",content:"**Godot Engine · Official Documentation**"},{heading:"tool-1",content:"Provides authoritative context for GDScript, C#, scene, and resource APIs, helping agents connect script changes to running scenes. Pin the engine version and use matching documentation; stable and development branches are not interchangeable."},{heading:"tool-1",content:"Tags: `Godot` · `GDScript` · `Scenes and nodes` · `Official documentation` · `Open source`. Source reviewed: 2026-10-18. Further reading: Engine source · Official examples"},{heading:"tool-1",content:"**GUT · Godot Unit Test**"},{heading:"tool-1",content:"Provides a CLI and JUnit XML output for automated regression checks on generated game state, damage, inventory, and other logic. GUT and Godot versions have explicit compatibility requirements; passing logic tests still leaves visuals, controls, and scene integration to check."},{heading:"tool-1",content:"Tags: `Godot` · `Unit testing` · `GDScript` · `CLI` · `JUnit`. Source reviewed: 2026-10-18. Further reading: Author documentation"},{heading:"tool-1",content:"**Unity · Manual**"},{heading:"tool-1",content:"Provides agents with concrete C# and editor project constraints, plus 2D and 3D workflows and versioned package references. Pin the Editor, render pipeline, and Package Manager versions together; the Unity name alone does not establish API or material compatibility."},{heading:"tool-1",content:"Tags: `Unity` · `C#` · `Official documentation` · `Editor` · `Package Manager`. Source reviewed: 2026-10-18. Further reading: Official example source"},{heading:"tool-1",content:"**Unity Test Framework**"},{heading:"tool-1",content:"Enables ongoing regression checks for generated scripts and scene behavior, using UnityTest across frames to check lifecycles, coroutines, and state changes. Edit mode and Play mode have different execution loops; tests should wait for real frames or conditions rather than only confirming script creation. The separately checked Test Framework 1.4.6 API returns a job GUID and documents multi-frame cancellation cleanup. Active tests become Canceled and remaining tests NotRun; do not equate cancellation with passing or assume compatibility with every Editor package version."},{heading:"tool-1",content:"Tags: `Unity` · `Testing` · `Edit mode` · `Play mode` · `CLI`. Source reviewed: 2026-10-18. Further reading: Package and API documentation · Versioned test-job and cancellation API"},{heading:"tool-1",content:"**Unreal Engine · Documentation**"},{heading:"tool-1",content:"Provides authoritative context for UE projects and asset systems, with official samples illustrating complex gameplay architecture. GitHub source access requires linked Epic and GitHub accounts and the relevant authorization steps; Epic also documents a Perforce route for licensees. Source availability does not imply an open-source license."},{heading:"tool-1",content:"Tags: `Unreal Engine` · `C++` · `Blueprint` · `Official documentation` · `Authorized source access`. Source reviewed: 2026-10-18. Further reading: Source access instructions · Engine source (authorization required)"},{heading:"tool-1",content:"**Unreal · Automation Test Framework**"},{heading:"tool-1",content:"Can bring Blueprint compilation, level loading, simulated input, and visual regression checks into an agent feedback loop, alongside interfaces such as Functional Testing. Tests require the appropriate plugins and state cleanup; the framework runs within the engine. ResumeRunTest reads an existing JSON report, resumes NotRun tests, and marks interrupted in-progress tests as failures. Preserve the report and distinguish compatible editor and client test contexts."},{heading:"tool-1",content:"Tags: `Unreal Engine` · `Automated testing` · `Blueprint` · `Visual regression` · `Content validation`. Source reviewed: 2026-10-18. Further reading: Command-line reports and interrupted-run resumption"},{heading:"tool-1",content:"**Three.js**"},{heading:"tool-1",content:"Lets agents build browser-testable 3D prototypes directly in TypeScript or JavaScript and inspect APIs through source and examples. Game loops, physics, navigation, saves, and other systems need separate design or integration. Validate WebGL and WebGPU paths individually."},{heading:"tool-1",content:"Tags: `Three.js` · `JavaScript` · `WebGL` · `WebGPU` · `Rendering library`. Source reviewed: 2026-10-18. Further reading: Official manual · Official examples"},{heading:"tool-1",content:"**Blender**"},{heading:"tool-1",content:"Primarily supports game asset and scene production, with agent-generated Python scripts for repeatable tasks. Blender is not a game runtime engine; verify scale, coordinates, materials, rigs, and animation after importing into Unity, UE, Godot, or a browser."},{heading:"tool-1",content:"Tags: `Blender` · `DCC` · `3D assets` · `Animation` · `Open source`. Source reviewed: 2026-10-18. Further reading: Official main repository · Reference manual · Python API"},{heading:"tool-1",content:"**Khronos · glTF-Blender-IO**"},{heading:"tool-1",content:"Connects Blender asset production to game runtimes and helps diagnose material, mesh, and animation conversion issues. Match the addon's release branch to the Blender version; main can target an upcoming Blender release. Repository CI validates exports and compares import / export roundtrips. A valid file can still render differently in the target engine, so verify runtime imports."},{heading:"tool-1",content:"Tags: `Blender` · `glTF` · `GLB` · `Asset pipeline` · `Roundtrip validation`. Source reviewed: 2026-10-19. Further reading: Technical notes · GameMap: asset validity and runtime fidelity"},{heading:"tool-1",content:"**Phaser · First Game Guide**"},{heading:"tool-1",content:"Useful for quickly building browser-testable 2D core loops organized around preload / create / update. In the tutorial, scaled static Arcade Physics objects need their collision bodies refreshed. A visible scene alone does not verify input, restart behavior, or lifecycle handling."},{heading:"tool-1",content:"Tags: `Phaser` · `2D` · `JavaScript` · `Browser games` · `Arcade Physics`. Source reviewed: 2026-10-18. Further reading: Framework source · Official documentation"},{heading:"community",content:`| Resource                | Purpose and scope                                                                                             | Stages                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| GDQuest · First 2D Game | A GDQuest tutorial for a Godot 2D survival game, with complete scripts, a project, and troubleshooting notes. | Planning / Coding / Scenes / Testing |`,table:"table-9"},{heading:"community",content:`| Resource                         | Purpose and scope                                                                                            | Stages                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------- |
| Catlike Coding · Surface Contact | Jasper Flick's Unity movement tutorial explains character control through slopes, steps, and contact timing. | Coding / Scenes / Testing |`,table:"table-9"},{heading:"community",content:`| Resource                      | Purpose and scope                                                                                   | Stages                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Epic Developer Community · UE | Epic's UE community hub for author tutorials, learning materials, and version-specific discussions. | Planning / Coding / Assets / Scenes / Testing |`,table:"table-9"},{heading:"community",content:`| Resource                                      | Purpose and scope                                                                                                      | Stages                    |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Three.js · Instanced Crowd Engineering · 2026 | A game author's Three.js forum write-up on a single-draw-call crowd system, instance data, LOD, and staggered updates. | Coding / Scenes / Testing |`,table:"table-9"},{heading:"community",content:"**GDQuest · First 2D Game**"},{heading:"community",content:"Covers movement, aiming, projectiles, enemy spawning, and failure states as a reference for a complete core loop. The tutorial was made with Godot 4.1 and updated to 4.6. Its troubleshooting explains grounded / floating modes and an enemy count limit. Code uses MIT while art assets use CC BY-NC-SA 4.0; check reuse conditions separately."},{heading:"community",content:"Tags: `Godot` · `Community experience` · `Complete core loop` · `Collision debugging` · `2D`. Source reviewed: 2026-10-18. Further reading: Project source · Tutorial library"},{heading:"community",content:"**Catlike Coding · Surface Contact**"},{heading:"community",content:"The author uses test scenes to reproduce loss of ground contact, ghost collisions, raycasts, and ground snapping, giving agents causal explanations of physics behavior. The tutorial uses Unity 2019.2.14f1 and ProBuilder; adapt its algorithms, APIs, input, and project configuration to the target version."},{heading:"community",content:"Tags: `Unity` · `Community experience` · `Physics` · `Character control` · `Debugging`. Source reviewed: 2026-10-18. Further reading: Complete movement series · Shader and project tutorials"},{heading:"community",content:"**Epic Developer Community · UE**"},{heading:"community",content:"Useful for practical material, animation, Blueprint, and performance troubleshooting beyond official references. Check each contribution's author, date, engine version, and reproducible project; access to the hub does not establish that every post has been verified."},{heading:"community",content:"Tags: `Unreal Engine` · `Community` · `Tutorials` · `Practical experience` · `Per-source verification`. Source reviewed: 2026-10-18."},{heading:"community",content:"**Three.js · Instanced Crowd Engineering**"},{heading:"community",content:"Offers explainable performance techniques, with the author's playable demo showing technical and visual tradeoffs. Frame rates are self-reported on the author's hardware, not a benchmark across devices. Measure GPU, CPU, bandwidth, and visual quality after optimization."},{heading:"community",content:"Tags: `Three.js` · `Community experience` · `Instancing` · `LOD` · `Performance`. Source reviewed: 2026-10-18. Further reading: Community forum"},{heading:"community",content:'<a id="2d"></a>'},{heading:"agent-1",content:`| Resource        | Purpose and scope                                                             | Stages                               |
| --------------- | ----------------------------------------------------------------------------- | ------------------------------------ |
| OpenGame · 2026 | Generates browser game projects with reusable templates and debugging skills. | Planning / Coding / Assets / Testing |`,table:"table-10"},{heading:"agent-1",content:"**OpenGame**"},{heading:"agent-1",content:"Turns natural-language requirements into web projects using Template Skill and Debug Skill for Canvas, Phaser, three.js, and other templates. The public CLI accepts OpenAI-compatible model endpoints; the paper also introduces GameCoder-27B. Browser execution and visual judging assess build health, usability, and intent alignment. The README still lists the standalone evaluation pipeline as forthcoming; model weights and full evaluation reproducibility are not established by the framework release alone."},{heading:"agent-1",content:"Tags: `Browser games` · `Game Skill` · `Browser feedback` · `GameCoder-27B`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"framework-2",content:`| Resource                | Purpose and scope                                                                | Stages           |
| ----------------------- | -------------------------------------------------------------------------------- | ---------------- |
| GameGen-Verifier · 2026 | Verifies generated game behavior through runtime state hooks and focused checks. | Coding / Testing |`,table:"table-11"},{heading:"framework-2",content:`| Resource     | Purpose and scope                                                                 | Stages                      |
| ------------ | --------------------------------------------------------------------------------- | --------------------------- |
| GAVEL · 2024 | Combines language models and quality-diversity search to create board game rules. | Planning / Coding / Testing |`,table:"table-11"},{heading:"framework-2",content:`| Resource          | Purpose and scope                                                                     | Stages                      |
| ----------------- | ------------------------------------------------------------------------------------- | --------------------------- |
| Cardiverse · 2025 | Connects card game design, Python rule code, and playtesting in a prototype pipeline. | Planning / Coding / Testing |`,table:"table-11"},{heading:"framework-2",content:"**GameGen-Verifier**"},{heading:"framework-2",content:"Breaks game requirements into independently testable checkpoints and checks functionality through browser and runtime adapters. The repository provides GGV-Harness and verifier skills for Codex and Claude. Public code does not include all generated games, run outputs, or private configurations. State hooks also provide observability beyond a purely black-box playtest."},{heading:"framework-2",content:"Tags: `Functional verification` · `Playwright` · `Runtime state` · `Verifier Skill`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"framework-2",content:"**GAVEL**"},{heading:"framework-2",content:"Uses Ludii game description code as its representation. A language model mutates and recombines rules, then simulation and search select games. Code, experiments, and related model and data references are public. The outputs are board games within a rule system; these results do not establish general 2D action game development ability."},{heading:"framework-2",content:"Tags: `Game design` · `Ludii` · `Evolutionary search` · `Rule generation`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"framework-2",content:"**Cardiverse**"},{heading:"framework-2",content:"Uses mechanism graphs and retrieval to generate variants and code from card game descriptions, then iteratively checks rule consistency using generated match records. The repository also includes a gameplay AI arena, but its development contribution centers on rule and code prototypes. Public substitute rule descriptions differ from the original paper inputs, which affects reproducibility."},{heading:"framework-2",content:"Tags: `Card games` · `Mechanism graphs` · `Code generation` · `Self-play validation`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"skill-1",content:`| Resource           | Purpose and scope                                                                                  | Stages           |
| ------------------ | -------------------------------------------------------------------------------------------------- | ---------------- |
| Agent Sprite Forge | Combines reference art, generated animation, and deterministic processing into exportable sprites. | Assets / Testing |`,table:"table-12"},{heading:"skill-1",content:"**Agent Sprite Forge**"},{heading:"skill-1",content:"Generates motion clips from an approved reference image, then performs background removal, alignment, loop selection, timing correction, and atlas packaging. It offers Godot, Aseprite, and web exports. For 0.4.0, the README reports parse-level round trips but no Godot, LDtk, or Aseprite editor-import verification. Import and visual acceptance checks remain necessary."},{heading:"skill-1",content:"Tags: `Agent Skill` · `Sprite pipeline` · `Animation` · `Asset QA`. Source reviewed: 2026-10-18."},{heading:"benchmark",content:`| Resource            | Purpose and scope                                                        | Stages                    |
| ------------------- | ------------------------------------------------------------------------ | ------------------------- |
| GameDevBench · 2026 | Evaluates coding agents on development tasks in existing Godot projects. | Coding / Scenes / Testing |`,table:"table-13"},{heading:"benchmark",content:`| Resource               | Purpose and scope                                                                | Stages                      |
| ---------------------- | -------------------------------------------------------------------------------- | --------------------------- |
| GameXpert-Bench · 2026 | Benchmarks game creation, bug fixing, and iterative improvement in three tracks. | Planning / Coding / Testing |`,table:"table-13"},{heading:"benchmark",content:"**GameDevBench**"},{heading:"benchmark",content:"The repository contains 333 tasks across 2D, 3D, UI, and gameplay logic. Agents receive an existing project and a task, then produce changes that can be checked in the engine. Comparable official runs require Godot 4.4.1 and provide image or video feedback. This measures bounded development tasks, not the quality of commercial games created from scratch."},{heading:"benchmark",content:"Tags: `Development benchmark` · `Godot` · `Multimodal` · `Visual feedback`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"benchmark",content:"**GameXpert-Bench**"},{heading:"benchmark",content:"The paper introduces GameGen, GameFix, and GameOpt using complete development trajectories to study the lifecycle beyond a single generation. At review, the official repository still said data and evaluation code were being prepared for release. Treat it as a paper and protocol reference, not a ready-to-run benchmark."},{heading:"benchmark",content:"Tags: `Development benchmark` · `Bug fixing` · `Iterative improvement` · `Full release pending`. Source reviewed: 2026-10-18. Further reading: Repository and release status"},{heading:"paper",content:`| Resource       | Purpose and scope                                                                    | Stages                      |
| -------------- | ------------------------------------------------------------------------------------ | --------------------------- |
| GameGPT · 2023 | Studies automated game development through multi-agent planning and code generation. | Planning / Coding / Testing |`,table:"table-14"},{heading:"paper",content:`| Resource        | Purpose and scope                                                        | Stages                      |
| --------------- | ------------------------------------------------------------------------ | --------------------------- |
| MarioGPT · 2023 | Generates playable Mario-style level layouts from text with a GPT model. | Planning / Scenes / Testing |`,table:"table-14"},{heading:"paper",content:"**GameGPT**"},{heading:"paper",content:"Planning, review, and implementation agents break down game requirements and generate code, with a focus on hallucination and redundancy. This is an early research framework for game development agents. The linked repository contains only the paper and README; it is not a verified, ready-to-deploy product."},{heading:"paper",content:"Tags: `Multi-agent` · `Task planning` · `Research prototype`. Source reviewed: 2026-10-18. Further reading: Paper and README repository"},{heading:"paper",content:"**MarioGPT**"},{heading:"paper",content:"Descriptions of enemies, pipes, and elevation become character-grid levels and previews, with an interactive simulator or A\\* checks available. It generates level content within existing rules and supports research on controllable procedural content generation. Its scope does not include game engines, character art, or complete gameplay code."},{heading:"paper",content:"Tags: `PCG` · `Level generation` · `Text-to-level` · `GPT-2`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"tool-2",content:`| Resource         | Purpose and scope                                                  | Stages                                                   |
| ---------------- | ------------------------------------------------------------------ | -------------------------------------------------------- |
| Agent Game Forge | A local 2D game IDE with a scene editor for Codex and Claude Code. | Planning / Coding / Assets / Scenes / Testing / Shipping |`,table:"table-15"},{heading:"tool-2",content:`| Resource  | Purpose and scope                                                                    | Stages                     |
| --------- | ------------------------------------------------------------------------------------ | -------------------------- |
| Text2Game | Turns long-form text into world, character, and event data for narrative prototypes. | Planning / Coding / Scenes |`,table:"table-15"},{heading:"tool-2",content:`| Resource                  | Purpose and scope                                                                       | Stages          |
| ------------------------- | --------------------------------------------------------------------------------------- | --------------- |
| PixelLab AI Agent Toolkit | Generates pixel characters, animation, and seamless tilesets through API and MCP tools. | Assets / Scenes |`,table:"table-15"},{heading:"tool-2",content:`| Resource                | Purpose and scope                                                                             | Stages |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------ |
| OpenAI Image Generation | Generate and edit raster art using image endpoints or a conversational image-generation tool. | Assets |`,table:"table-15"},{heading:"tool-2",content:"**Agent Game Forge**"},{heading:"tool-2",content:"Agents, asset workflows, and JSON scene data turn natural-language requests into JS + Canvas games. Users can adjust layout and collision in a visual editor. The README lists web output as the current default, with full Godot and Unity support still on the roadmap. The project describes itself as pre-launch."},{heading:"tool-2",content:"Tags: `2D IDE` · `Canvas` · `Scene editing` · `Prototyping`. Source reviewed: 2026-10-18."},{heading:"tool-2",content:"**Text2Game**"},{heading:"tool-2",content:"Analyzes text in chunks, merges the results, and generates Twine/Chapbook HTML or Godot visual novel projects. The repository provides a Python pipeline and examples for research on turning narratives into playable prototypes. It offers no general guarantee of generating arbitrary action games."},{heading:"tool-2",content:"Tags: `Interactive narrative` · `Twine` · `Godot` · `Visual novels`. Source reviewed: 2026-10-18."},{heading:"tool-2",content:"**PixelLab AI Agent Toolkit**"},{heading:"tool-2",content:"Accepts character descriptions, directions, actions, and terrain conditions to produce pixel assets, including four- or eight-direction characters and side-view or top-down tilesets. This is a commercial asset service. MCP connects its asset tools to coding agents; game rules, collision, and asset import still require a project workflow."},{heading:"tool-2",content:"Tags: `Pixel art` · `Sprite` · `Tileset` · `MCP` · `Commercial service`. Source reviewed: 2026-10-18. Further reading: Documentation"},{heading:"tool-2",content:"**OpenAI Image Generation**"},{heading:"tool-2",content:"Generate or edit raster images through the Images API or multi-turn Responses workflows. Save output bytes and request settings; masks guide edits rather than guaranteeing exact boundaries. Sprite consistency and seamless textures need separate checks. The technical guide does not establish output rights or retry billing."},{heading:"tool-2",content:"Tags: `asset-generation`. Source reviewed: 2026-10-18."},{heading:"tool-2",content:'<a id="3d"></a>'},{heading:"framework-3",content:`| Resource             | Purpose and scope                                                                               | Stages                                        |
| -------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 3AGameFactory · 2026 | Coordinates game assets, gameplay, and UI through skills, model pipelines, and engine adapters. | Planning / Coding / Assets / Scenes / Testing |`,table:"table-16"},{heading:"framework-3",content:`| Resource         | Purpose and scope                                                            | Stages                    |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------- |
| Infinigen · 2023 | Procedurally generates natural and indoor Blender scenes and synthetic data. | Assets / Scenes / Testing |`,table:"table-16"},{heading:"framework-3",content:`| Resource        | Purpose and scope                                                    | Stages            |
| --------------- | -------------------------------------------------------------------- | ----------------- |
| Holodeck · 2023 | Lays out and furnishes interactive 3D indoor environments from text. | Planning / Scenes |`,table:"table-16"},{heading:"framework-3",content:`| Resource      | Purpose and scope                                                                      | Stages                                        |
| ------------- | -------------------------------------------------------------------------------------- | --------------------------------------------- |
| AutoUE · 2026 | Coordinates agents to build Unreal scenes, gameplay code, interactions, and playtests. | Planning / Coding / Assets / Scenes / Testing |`,table:"table-16"},{heading:"framework-3",content:`| Resource      | Purpose and scope                                                                              | Stages                               |
| ------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------ |
| UniGen · 2025 | Plans Unity prototypes, generates scripts, assembles scenes, and supports iterative debugging. | Planning / Coding / Scenes / Testing |`,table:"table-16"},{heading:"framework-3",content:"**3AGameFactory**"},{heading:"framework-3",content:"A coding agent routes requirements through image, 3D, motion, audio, and other pipelines to produce assets and engine-native code, with context for UE5, Unity, Godot, Blender, and three.js. Demos mix generated and existing resources. The 3A name is not a verified commercial quality rating. This is a separate project from Kling's GameFactory video world model."},{heading:"framework-3",content:"Tags: `Agent Skills` · `Asset pipelines` · `Multiple engines` · `Game generation`. Source reviewed: 2026-10-18. Further reading: Chinese documentation"},{heading:"framework-3",content:"**Infinigen**"},{heading:"framework-3",content:"Random seeds, parameters, and asset generators produce geometry, materials, scenes, and annotations, with export documentation for OBJ, OpenUSD, and other formats. This is a procedural system rather than a language model. It can provide controllable scenes and data for AI development workflows; real-time games still need optimization, collision, and gameplay integration."},{heading:"framework-3",content:"Tags: `Procedural generation` · `Blender` · `Synthetic data` · `Scenes`. Source reviewed: 2026-10-18. Further reading: Project and paper"},{heading:"framework-3",content:"**Holodeck**"},{heading:"framework-3",content:"Combines language planning, asset retrieval, and spatial constraints to turn room requirements into AI2-THOR scenes, with instructions for loading them in Unity. Evaluation primarily targets embodied AI environment generation. It offers ideas for scene layout and semantic interaction, but does not establish complete game level design or commercial release readiness."},{heading:"framework-3",content:"Tags: `Text-to-scene` · `AI2-THOR` · `Spatial constraints` · `Embodied environments`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"framework-3",content:"**AutoUE**"},{heading:"framework-3",content:"A research pipeline for turning a game description into Unreal Engine scenes and C++ gameplay. Its public implementation includes setup instructions, a demonstration video, and a linked dataset of generated games and assets. Reproduction requires Unreal integrations and external model services. The video demonstrates outputs; it is not a hosted playable game. Static inspection of the pinned evaluation dispatcher shows movement commands skipped and interaction handlers called directly; completion of that script path alone does not establish player navigation success."},{heading:"framework-3",content:"Tags: `Unreal Engine` · `Game generation` · `Multi-agent` · `Research prototype`. Source reviewed: 2026-10-19. Further reading: Paper · Generated games and asset dataset · Pinned evaluation dispatcher"},{heading:"framework-3",content:"**Tutorial · tutorial:** Setup and usage. Author instructions for dependencies, service credentials, and running the Unreal generation pipeline."},{heading:"framework-3",content:"**Demo · video:** Game-generation video. Recorded demonstrations of generated Unreal games; no public browser-playable build verified."},{heading:"framework-3",content:"**Source · pipeline-source:** Pipeline source. Public framework implementation; engine setup, model services, and dataset assets remain separate requirements."},{heading:"framework-3",content:"**UniGen**"},{heading:"framework-3",content:"A multi-agent research workflow for Unity game creation from natural-language descriptions. The repository publishes its Python pipeline and model connector, with installation guidance and a recorded demonstration. Unity and a model-service account are required. Public pipeline code is available, but a hosted playable build and complete downloadable versions of the benchmark games were not verified."},{heading:"framework-3",content:"Tags: `Unity` · `Game generation` · `Scene assembly` · `Research prototype`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"framework-3",content:"**Tutorial · tutorial:** Installation and usage. README covers prerequisites and the local Unity generation workflow; review paths and project setup before running."},{heading:"framework-3",content:"**Demo · video:** Unity generation video. Author-linked demonstration video, not a browser-playable game."},{heading:"framework-3",content:"**Source · pipeline-source:** Pipeline source. Published generator implementation and prompts; this is not a complete release of every benchmark game."},{heading:"skill-2",content:`| Resource           | Purpose and scope                                                                   | Stages                                          |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------- |
| Unity Agent Plugin | Unity-maintained project skills give general coding agents engine-specific context. | Planning / Coding / Scenes / Testing / Shipping |`,table:"table-17"},{heading:"skill-2",content:`| Resource                   | Purpose and scope                                                                | Stages                    |
| -------------------------- | -------------------------------------------------------------------------------- | ------------------------- |
| Godot MCP 3D Asset Builder | Builds reusable stylized 3D assets with Godot geometry and validation workflows. | Assets / Scenes / Testing |`,table:"table-17"},{heading:"skill-2",content:"**Unity Agent Plugin**"},{heading:"skill-2",content:"Provides Claude Code, Codex, and Grok with skills for 2D, UI, rendering, navigation, physics, multiplayer, and other tasks, connected to Unity CLI and MCP controls. Unity requires version 6.0 or later. The current CLI MCP mode replaces MCP in the older assistant package; follow the documentation for the version in use."},{heading:"skill-2",content:"Tags: `Official` · `Agent Skills` · `Unity` · `CLI` · `MCP`. Source reviewed: 2026-10-18. Further reading: Skill source · CLI / MCP migration"},{heading:"skill-2",content:"**Godot MCP 3D Asset Builder**"},{heading:"skill-2",content:"Takes project style and asset requirements, then uses Godot MCP and deterministic builders to produce PackedScene assets and check grounding, collision, navigation, and screenshots. Designed for Codex and Claude Code, it can reuse existing project resources. It requires compatible MCP capabilities and is not an image-to-mesh generative model."},{heading:"skill-2",content:"Tags: `Godot` · `Agent Skill` · `PackedScene` · `Asset QA`. Source reviewed: 2026-10-18."},{heading:"benchmark-1",content:`| Resource               | Purpose and scope                                                       | Stages           |
| ---------------------- | ----------------------------------------------------------------------- | ---------------- |
| GameEngineBench · 2026 | Tests agent-written C++ runtime changes in real Unreal Engine projects. | Coding / Testing |`,table:"table-18"},{heading:"benchmark-1",content:"**GameEngineBench**"},{heading:"benchmark-1",content:"Paper v2 describes 110 scoped C++ tasks from nine Unreal projects. Agents receive a buildable start, allowed files, and behavioral requirements. After compilation and Play-in-Editor listen-server tests, an LLM judge reviews the specification, test evidence, edits, and reference solution to determine success. The paper-linked repository could not be retrieved during review, so runnable-code availability remains unverified. The scope is local C++ implementation, not complete 3D game generation."},{heading:"benchmark-1",content:"Tags: `Development benchmark` · `Unreal Engine` · `C++` · `Behavior tests`. Source reviewed: 2026-10-18. Further reading: Paper-linked repository (availability unverified) · Versioned evaluation protocol"},{heading:"paper-1",content:`| Resource          | Purpose and scope                                                               | Stages                         |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------ |
| Video2Game · 2024 | Reconstructs real-world video into interactive 3D environments for the browser. | Assets / Scenes / World models |`,table:"table-19"},{heading:"paper-1",content:`| Resource                                | Purpose and scope                                                                 | Stages           |
| --------------------------------------- | --------------------------------------------------------------------------------- | ---------------- |
| BlenderLLM / BlendNet / CADBench · 2024 | Studies text-to-Blender scripting with a training dataset and modeling benchmark. | Assets / Testing |`,table:"table-19"},{heading:"paper-1",content:"**Video2Game**"},{heading:"paper-1",content:"Video and camera information pass through reconstruction, mesh extraction, appearance baking, and collision generation into a three.js game environment. The documented UE route recommends fully diffuse baked meshes, with the baking specular dimension set to zero. This is an explicit environment reconstruction approach with remaining manual scene setup and physics integration. It should be distinguished from interactive video world models that predict the next frame."},{heading:"paper-1",content:"Tags: `Video-to-3D` · `Reconstruction` · `Three.js` · `Collision`. Source reviewed: 2026-10-19. Further reading: Paper · Pinned engine-handoff recommendations"},{heading:"paper-1",content:"**BlenderLLM / BlendNet / CADBench**"},{heading:"paper-1",content:"BlenderLLM generates bpy modeling scripts from user instructions. The repository and released dataset documentation report about 12K BlendNet pairs, and CADBench includes synthetic and forum-sourced tasks. Evaluation focuses on basic CAD-style modeling and instruction following. The README identifies limitations in advanced materials, multimodal input, and multi-turn collaboration; this is not a game creation benchmark."},{heading:"paper-1",content:"Tags: `Text-to-bpy` · `CADBench` · `Dataset` · `Modeling benchmark`. Source reviewed: 2026-10-19. Further reading: Paper · BlendNet dataset · CADBench · Pinned release dataset description"},{heading:"tool-3",content:`| Resource         | Purpose and scope                                                         | Stages                    |
| ---------------- | ------------------------------------------------------------------------- | ------------------------- |
| MCP Unity Editor | A community MCP bridge for querying, editing, and testing Unity projects. | Coding / Scenes / Testing |`,table:"table-20"},{heading:"tool-3",content:`| Resource             | Purpose and scope                                                         | Stages |
| -------------------- | ------------------------------------------------------------------------- | ------ |
| Hunyuan3D 2.0 · 2025 | Turns reference images into geometry and textures for 3D asset pipelines. | Assets |`,table:"table-20"},{heading:"tool-3",content:`| Resource       | Purpose and scope                                                                        | Stages |
| -------------- | ---------------------------------------------------------------------------------------- | ------ |
| TRELLIS · 2024 | Generates meshes, Gaussians, and radiance fields from structured latent representations. | Assets |`,table:"table-20"},{heading:"tool-3",content:`| Resource       | Purpose and scope                                                      | Stages |
| -------------- | ---------------------------------------------------------------------- | ------ |
| TripoSR · 2024 | Quickly reconstructs a 3D object from one image for asset prototyping. | Assets |`,table:"table-20"},{heading:"tool-3",content:`| Resource                   | Purpose and scope                                                            | Stages |
| -------------------------- | ---------------------------------------------------------------------------- | ------ |
| Tripo Model Generation API | Versioned text-to-model generation with separate geometry and texture seeds. | Assets |`,table:"table-20"},{heading:"tool-3",content:"**MCP Unity Editor**"},{heading:"tool-3",content:"Exposes scenes, GameObjects, components, Prefabs, logs, Unity Test Runner, and other editor operations to MCP clients. This community tool is separate from Unity's official plugin. Its README warns that entering Play Mode with domain reload can disconnect the bridge; check the installed version, test configuration, and actual results. Editor automation alone does not establish correct gameplay."},{heading:"tool-3",content:"Tags: `Unity` · `MCP` · `Editor automation` · `Community tool`. Source reviewed: 2026-10-18."},{heading:"tool-3",content:"**Hunyuan3D 2.0**"},{heading:"tool-3",content:"The 2.0 pipeline generates shape with Hunyuan3D-DiT and textures the mesh with Hunyuan3D-Paint. It supports GLB and OBJ export and a Blender addon under a dedicated Tencent Hunyuan 3D 2.0 community license. The separate 2.1 release adds a PBR texture pipeline and training code. Topology, LOD, rigging, collision, runtime performance, and each version's terms still need game-pipeline checks."},{heading:"tool-3",content:"Tags: `Image-to-3D` · `Mesh` · `Textures` · `Blender`. Source reviewed: 2026-10-18. Further reading: 2.0 paper · 2.1 repository · 2.0 license"},{heading:"tool-3",content:"**TRELLIS**"},{heading:"tool-3",content:"Decodes image or text inputs into several 3D representations. Official examples support textured GLB export and simplification. Conventional game asset pipelines mainly use its mesh branch; Gaussian and radiance field outputs do not themselves include usable collision, animation, or gameplay logic."},{heading:"tool-3",content:"Tags: `Image-to-3D` · `Text-to-3D` · `GLB` · `Structured Latents`. Source reviewed: 2026-10-18. Further reading: Paper"},{heading:"tool-3",content:"**TripoSR**"},{heading:"tool-3",content:"Uses LRM-style feed-forward reconstruction, with public code, pretrained models, and a demo. An input image becomes an exportable object mesh. It focuses on individual objects; hidden surfaces, topology, and game performance need additional work. It is not a complete scene or playable game generator."},{heading:"tool-3",content:"Tags: `Image-to-3D` · `Reconstruction` · `Mesh` · `Prototype assets`. Source reviewed: 2026-10-18."},{heading:"tool-3",content:"**Tripo Model Generation API**"},{heading:"tool-3",content:"H3 text-to-model requests (v3.1-20260211 and v3.0-20250812) expose separate geometry and texture seeds plus PBR controls. Persist model_version and task ID, query with the submitting API key, and download successful output files promptly: their URLs expire after five minutes by default. Low-poly generation can fail on complex inputs. Cross-version reproducibility, output rights, cancellation endpoints and retry charges remain unverified."},{heading:"tool-3",content:"Tags: `asset-generation`. Source reviewed: 2026-10-19. Further reading: Tripo task results"},{heading:"tool-3",content:'<a id="production"></a>'},{heading:"framework-4",content:`| Resource       | Purpose and scope                                                    | Stages                         |
| -------------- | -------------------------------------------------------------------- | ------------------------------ |
| FastNoise Lite | A portable noise library for procedural terrain and material inputs. | Coding / Assets / World models |`,table:"table-21"},{heading:"framework-4",content:"**FastNoise Lite**"},{heading:"framework-4",content:"Provides 2D/3D sampling, fractals and domain warping across multiple languages under MIT. These are generation primitives: meshing, erosion, persistent world state and meaningful level design require additional systems."},{heading:"framework-4",content:"Tags: `Procedural generation` · `Noise` · `Terrain`. Source reviewed: 2026-10-18."},{heading:"skill-3",content:`| Resource                                           | Purpose and scope                                                                                                                                          | Stages                                 |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Level Design Book · unofficial design skill · 2026 | An unofficial, agent-neutral adaptation of The Level Design Book for level briefs, blockouts, encounters, wayfinding, and evidence-based playtest reviews. | Planning / Scenes / Testing / Shipping |`,table:"table-22"},{heading:"skill-3",content:"**Level Design Book · unofficial design skill**"},{heading:"skill-3",content:"The English skill package reorganizes The Level Design Book into task routing, thirteen topical/source references, and three reusable templates. It is primarily for 3D levels; 2D adaptations must state changed assumptions. The package reports a 2026-10-16 source snapshot and maps 94 indexed source pages, including unfinished sections; GameMap has not independently reproduced that reading exercise, run the workflows, or validated design outcomes. Original writing is attributed to Robert Yang and contributors including Andrew Yoder. This is not an official book edition or a pi-maintainer publication. The adaptation is CC BY-NC-SA 4.0: retain attribution and change notices, observe noncommercial/share-alike conditions, and review separate third-party exceptions. Those terms do not automatically license every game output."},{heading:"skill-3",content:"Tags: `level-design` · `skill` · `blockout` · `playtesting` · `agent-neutral` · `CC-BY-NC-SA-4.0` · `noncommercial` · `unofficial-adaptation`. Source reviewed: 2026-10-18. Further reading: The Level Design Book · Original authors and contributors · Book licensing and third-party exceptions · CC BY-NC-SA 4.0 legal code"},{heading:"skill-3",content:"**Tutorial · tutorial:** Read the original book. The underlying book remains authoritative. The skill reorganizes guidance and templates rather than claiming universal design laws or independently measured outcomes."},{heading:"skill-3",content:"**Demo · unavailable:** Instructions and templates, not a runnable demo. No engine plugin, executable level, benchmark result, or validated playtest is supplied."},{heading:"skill-3",content:"**Source · full-source:** Complete skill package and license. Text-only package with SKILL.md, LICENSE.md, references, and templates. CC BY-NC-SA 4.0 applies to this adaptation directory, not the whole repository; commercial distribution requires appropriate permission."},{heading:"documentation-2",content:`| Resource                 | Purpose and scope                                                                            | Stages             |
| ------------------------ | -------------------------------------------------------------------------------------------- | ------------------ |
| Unreal Engine · Gauntlet | Orchestrates game test sessions with multiple processes, roles, devices, and collected logs. | Testing / Shipping |`,table:"table-23"},{heading:"documentation-2",content:`| Resource                                    | Purpose and scope                                                                                                  | Stages                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| Windows · UI Automation and Input Semantics | Exposes provider-supported accessibility control patterns for inspecting and manipulating desktop editor controls. | Coding / Scenes / Testing |`,table:"table-23"},{heading:"documentation-2",content:`| Resource                      | Purpose and scope                                                              | Stages             |
| ----------------------------- | ------------------------------------------------------------------------------ | ------------------ |
| Xbox Accessibility Guidelines | Game-specific accessibility guidance for designers, developers and test teams. | Planning / Testing |`,table:"table-23"},{heading:"documentation-2",content:"**Unreal Engine · Gauntlet**"},{heading:"documentation-2",content:"Gauntlet consumes prepared cooked builds and launches configured game roles through AutomationTool. Game-specific test nodes define assertions and terminal outcomes; launching a client and server alone does not establish scenario success. Build production, device availability, process cleanup, and parallel-session port allocation remain separate responsibilities."},{heading:"documentation-2",content:"Tags: `Unreal Engine` · `AutomationTool` · `Multi-process testing` · `Cooked builds`. Source reviewed: 2026-10-18."},{heading:"documentation-2",content:"**Windows · UI Automation and Input Semantics**"},{heading:"documentation-2",content:"Provider support must be probed per control; no specific game editor is assumed accessible. UIA coordinates are physical pixels, while absolute mouse input uses normalized desktop coordinates. Bounding rectangles may contain occluded points, foreground activation can be refused, and input insertion does not prove application completion. Integrity restrictions must be respected."},{heading:"documentation-2",content:"Tags: `Windows` · `Accessibility` · `Native GUI` · `CUA` · `DPI`. Source reviewed: 2026-10-19. Further reading: Properties and occlusion · Input and integrity limits · DPI coordinates · Window/display capture and frame lifetime · GameMap: native UI evidence boundaries"},{heading:"documentation-2",content:"**Xbox Accessibility Guidelines**"},{heading:"documentation-2",content:"The guidelines cover accessible game experiences and provide criteria for review. They are best-practice guidance, not a legal compliance checklist or certification. Automated scans alone cannot replace manual assessment and testing with disabled players."},{heading:"documentation-2",content:"Tags: `Accessibility` · `QA` · `Guidelines`. Source reviewed: 2026-10-18."},{heading:"tool-4",content:`| Resource | Purpose and scope                                                                   | Stages          |
| -------- | ----------------------------------------------------------------------------------- | --------------- |
| Scenario | Builds consistent game art pipelines with custom style models and batch generation. | Assets / Scenes |`,table:"table-24"},{heading:"tool-4",content:`| Resource  | Purpose and scope                                                                              | Stages          |
| --------- | ---------------------------------------------------------------------------------------------- | --------------- |
| Meshy API | Connects AI model generation, humanoid rigging, and animation export for game asset workflows. | Assets / Scenes |`,table:"table-24"},{heading:"tool-4",content:`| Resource             | Purpose and scope                                                                          | Stages |
| -------------------- | ------------------------------------------------------------------------------------------ | ------ |
| HY-Motion 1.0 · 2025 | Generates skeletal humanoid motion from text with public inference code and model weights. | Assets |`,table:"table-24"},{heading:"tool-4",content:`| Resource                 | Purpose and scope                                                                             | Stages |
| ------------------------ | --------------------------------------------------------------------------------------------- | ------ |
| ElevenLabs Sound Effects | Generates game sound effects, Foley, and looping ambience from text through a web app or API. | Assets |`,table:"table-24"},{heading:"tool-4",content:`| Resource                     | Purpose and scope                                                                                   | Stages |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| Stable Audio Open 1.0 · 2024 | Provides downloadable text-to-audio weights and local tools for sound effects and field recordings. | Assets |`,table:"table-24"},{heading:"tool-4",content:`| Resource         | Purpose and scope                                                                                          | Stages             |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ------------------ |
| Regression Games | Provides a public Unity SDK for gameplay recording, input replay, and regression-test reference workflows. | Testing / Shipping |`,table:"table-24"},{heading:"tool-4",content:`| Resource | Purpose and scope                                                           | Stages             |
| -------- | --------------------------------------------------------------------------- | ------------------ |
| modl.ai  | Uses visual agents and natural-language tasks to test uploaded game builds. | Testing / Shipping |`,table:"table-24"},{heading:"tool-4",content:`| Resource | Purpose and scope                                                            | Stages                       |
| -------- | ---------------------------------------------------------------------------- | ---------------------------- |
| Convai   | Adds conversational NPCs with speech, memory, emotion, and in-scene actions. | Coding / Scenes / Runtime AI |`,table:"table-24"},{heading:"tool-4",content:`| Resource         | Purpose and scope                                                                 | Stages |
| ---------------- | --------------------------------------------------------------------------------- | ------ |
| ElevenLabs Music | Prompted music generation with composition plans, references and section editing. | Assets |`,table:"table-24"},{heading:"tool-4",content:`| Resource                     | Purpose and scope                                                                                               | Stages |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ------ |
| ElevenLabs Speech Generation | Voice-conditioned speech synthesis with pronunciation dictionaries and neighboring-request continuity controls. | Assets |`,table:"table-24"},{heading:"tool-4",content:`| Resource             | Purpose and scope                                                           | Stages            |
| -------------------- | --------------------------------------------------------------------------- | ----------------- |
| MSDF Atlas Generator | A command-line and library tool for generating distance-field font atlases. | Assets / Shipping |`,table:"table-24"},{heading:"tool-4",content:`| Resource                | Purpose and scope                                                | Stages                      |
| ----------------------- | ---------------------------------------------------------------- | --------------------------- |
| DirectX Shader Compiler | HLSL compilation through the dxc command line and compiler APIs. | Coding / Testing / Shipping |`,table:"table-24"},{heading:"tool-4",content:`| Resource        | Purpose and scope                                                        | Stages           |
| --------------- | ------------------------------------------------------------------------ | ---------------- |
| Playwright Test | Browser testing with DOM actions, assertions and screenshot comparisons. | Coding / Testing |`,table:"table-24"},{heading:"tool-4",content:"**Scenario**"},{heading:"tool-4",content:"Scenario provides hosted image, video, 3D and audio workflows, custom-model training, a REST API and an official beta MCP interface. Inspect each model schema before submission; MCP model_run can return an unfinished job rather than output assets. The documented job_cancel cannot cancel jobs created by model_run or workflow_run. Integration examples do not include the full hosted service or a complete game project."},{heading:"tool-4",content:"Tags: `Art direction` · `Style consistency` · `Character consistency` · `Batch assets` · `Commercial service`. Source reviewed: 2026-10-18. Further reading: API documentation · Official beta MCP operations · Job cancellation scope"},{heading:"tool-4",content:"**Tutorial · tutorial:** Consistent game asset pipeline. Official walkthrough for custom style training, batch generation, and asset delivery."},{heading:"tool-4",content:"**Demo · interactive:** Asset generation app. Hosted creative tool requiring an account; this is an asset workspace, not a playable game."},{heading:"tool-4",content:"**Source · sdk:** Unity integration source. Public Unity integration plugin; hosted model source and a complete game project are not included."},{heading:"tool-4",content:"**Meshy API**"},{heading:"tool-4",content:"The official animated-character recipe turns a reference image into a textured, rigged character with idle, jump, and attack clips in GLB and FBX. The animation step applies motions from Meshy's library. API rigging works best with standard textured bipeds with clearly separated limbs. Generated assets still need engine import, collision, controls, and performance checks; the public cookbook supplies asset examples rather than complete gameplay."},{heading:"tool-4",content:"Tags: `Image-to-3D` · `Rigging` · `Character animation` · `GLB` · `FBX` · `Commercial service`. Source reviewed: 2026-10-18. Further reading: Rigging requirements"},{heading:"tool-4",content:"**Tutorial · tutorial:** Image to animated character. Official guide with reference files, Python and TypeScript examples, and GLB/FBX outputs. API access uses credits."},{heading:"tool-4",content:"**Demo · interactive:** 3D asset workspace. Hosted generation and animation workspace; account access is required to generate assets. This is not a playable game."},{heading:"tool-4",content:"**Source · examples:** Cookbook example source. Public asset-generation recipes, not Meshy's model source or a complete game project."},{heading:"tool-4",content:"**HY-Motion 1.0**"},{heading:"tool-4",content:"Tencent's text-to-motion models produce human character animation, with CLI inference, local Gradio visualization, and a hosted model demo. Use the generated motion as an animation-pipeline input and retarget it to the target character. The documented limitations include non-humanoid motion, multi-person interaction, seamless loops, and in-place animation. The release provides a motion implementation, not a controllable game character or full game project. Its custom license excludes the EU, UK and South Korea and restricts using the works or outputs to improve other AI models, except HY-Motion and its derivatives. Review the exact license and commercial threshold before adoption."},{heading:"tool-4",content:"Tags: `Text-to-motion` · `Skeletal animation` · `Humanoid` · `Model weights` · `Local inference`. Source reviewed: 2026-10-18. Further reading: Official project · Model weights · HY-Motion community license"},{heading:"tool-4",content:"**Tutorial · tutorial:** Installation and motion workflow. Official setup, CLI inference, local UI, and prompting guidance. Local execution requires the documented GPU resources."},{heading:"tool-4",content:"**Demo · interactive:** Interactive motion demo. Official text-to-motion model interface; a motion preview rather than playable gameplay. Hosted availability may vary."},{heading:"tool-4",content:"**Source · model:** Motion implementation source. Public inference and visualization implementation with separately linked weights; no complete game project."},{heading:"tool-4",content:"**ElevenLabs Sound Effects**"},{heading:"tool-4",content:"Describe footsteps, impacts, UI feedback, or environmental sounds, control duration, and export audio for a game engine. The documentation describes loop-enabled generation for seamless repeat playback and a 30-second maximum per clip. Its overview lists MP3 for all effects and 48 kHz WAV for non-looping effects; API format support and plan requirements should be checked separately. Loop quality still needs validation in the target game. This is a hosted audio service. The public SDK connects to its API and does not release the generation model or a complete game project."},{heading:"tool-4",content:"Tags: `Sound effects` · `Foley` · `Ambience` · `Audio loops` · `API` · `Commercial service`. Source reviewed: 2026-10-19. Further reading: Product walkthrough · Sound Effects API reference"},{heading:"tool-4",content:"**Tutorial · tutorial:** Sound Effects quickstart. Official API walkthrough with SDK examples; an account and API key are needed for generation."},{heading:"tool-4",content:"**Demo · interactive:** Sound effects generator. Official text-to-audio generator and sound examples; this is an audio tool, not a playable game."},{heading:"tool-4",content:"**Source · sdk:** Official Python SDK. API client source only; generation model and complete game source are not included."},{heading:"tool-4",content:"**Stable Audio Open 1.0**"},{heading:"tool-4",content:"Generates up to 47 seconds of stereo audio at 44.1 kHz, with examples for local inference and WAV export. The official audio-tools repository includes a local Gradio interface. The model works best with English descriptions, is stronger at sound effects and field recordings than music, and cannot produce realistic vocals. Model access requires accepting its terms and sharing contact information with the publisher; this resource is an audio pipeline rather than a complete soundtrack or game generator."},{heading:"tool-4",content:"Tags: `Text-to-audio` · `Sound effects` · `Field recordings` · `Model weights` · `Local inference`. Source reviewed: 2026-10-19. Further reading: Local demo setup · Research paper · Stable Audio Open model license"},{heading:"tool-4",content:"**Tutorial · tutorial:** Local inference and WAV export. Official model usage examples for stable-audio-tools and Diffusers."},{heading:"tool-4",content:"**Demo · local-tool:** Local audio demo setup. Download and run the official Gradio audio interface locally; this link is setup guidance, not a hosted playable game."},{heading:"tool-4",content:"**Source · pipeline-source:** Audio tools source. MIT-licensed training and inference code; Stable Audio Open 1.0 weights are separately gated and governed by the model's Community License. No complete game project."},{heading:"tool-4",content:"**Regression Games**"},{heading:"tool-4",content:"The public Unity SDK combines gameplay recording, state inspection, input playback, bot logic, and validation workflows. Its official first-test tutorial and Boss Room UI-testing project remain available in GitHub repositories. Treat this as a reference integration: the old documentation domain was unreachable during review, and current hosted-service availability and maintenance were not confirmed. SDK source is public; check compatibility and service requirements before adopting it."},{heading:"tool-4",content:"Tags: `Unity` · `Automated playtesting` · `Input replay` · `Regression testing` · `Reference integration`. Source reviewed: 2026-10-18. Further reading: Unity SDK · Boss Room UI-testing sample · First-test tutorial repository fallback"},{heading:"tool-4",content:"**Tutorial · tutorial:** Your first automated test. Official first-test walkthrough preserved in the documentation repository. The former live documentation domain was unreachable during review."},{heading:"tool-4",content:"**Demo · examples:** Runnable Boss Room sample. A complete Unity sample project with UI tests; download and open locally rather than playing in a browser."},{heading:"tool-4",content:"**Source · sdk:** Unity testing SDK source. Public client SDK source; it does not contain the complete hosted dashboard backend."},{heading:"tool-4",content:"**modl.ai**"},{heading:"tool-4",content:"The current commercial service observes screens and sends simulated inputs without requiring an engine SDK. Teams upload a build, describe test tasks, and review captured sessions and bug reports. Its stated coverage includes Android and desktop; timing-critical gameplay remains limited. The vendor also describes game-specific model training using test-run data; SDK-free does not mean no game-specific preparation. The current product differs from older SDK-based documentation. Public self-service gameplay, complete product source, and an independent hands-on tutorial were not verified."},{heading:"tool-4",content:"Tags: `Automated playtesting` · `Visual agents` · `Commercial service` · `Game QA`. Source reviewed: 2026-10-18. Further reading: Request a product demonstration"},{heading:"tool-4",content:"**Tutorial · service:** Workflow overview. Official upload, task-definition, and reporting overview; detailed onboarding is provided through the service."},{heading:"tool-4",content:"**Demo · service:** Book a product demo. Commercial demonstration by arrangement; this is not a public playable game or instant sandbox."},{heading:"tool-4",content:"**Source · unavailable:** Full product source unavailable. No complete source release for the current hosted testing product was verified; older public samples are not its backend."},{heading:"tool-4",content:"**Convai**"},{heading:"tool-4",content:"Convai connects game characters to runtime conversation and behavior services through engine integrations. Its Unity guides cover installation, sample scenes, and character setup; public Unreal SDK source is also available. Browser experiences require an account. This provides AI behavior inside an existing game, rather than generating a complete game. Public SDKs do not include the full hosted AI service."},{heading:"tool-4",content:"Tags: `Runtime AI` · `NPC dialogue` · `Character actions` · `Unity / Unreal`. Source reviewed: 2026-10-18. Further reading: Unity SDK documentation · Unreal SDK source · Projects and experiences"},{heading:"tool-4",content:"**Tutorial · tutorial:** Build your first AI character. Official Unity installation, service setup, sample-scene, and custom-character walkthrough."},{heading:"tool-4",content:"**Demo · interactive:** Try character experiences. Account-required browser character experiences; these are conversations and role-play, not complete game-generation demos."},{heading:"tool-4",content:"**Source · sdk:** Unreal engine SDK source. Public engine integration source; the complete cloud conversation service is not included."},{heading:"tool-4",content:"**ElevenLabs Music**"},{heading:"tool-4",content:"Generate music with composition plans, references and section editing. Music-specific terms distinguish Indie and Studio game uses, so paid API access alone does not clear every game release. The October 2026 use policy restricts AI-development/training datasets unless expressly permitted. Reference audio rights and plan eligibility require review."},{heading:"tool-4",content:"Tags: `audio-generation`. Source reviewed: 2026-10-18. Further reading: ElevenLabs Music terms · Prohibited Use Policy (October 2026)"},{heading:"tool-4",content:"**ElevenLabs Speech Generation**"},{heading:"tool-4",content:"The speech endpoint accepts versioned pronunciation dictionaries and previous/next text or request context. Zero-retention mode is enterprise-only and disables history-based continuity features; verify model compatibility. October 2026 policy restricts AI-development/training datasets and requires approval for under-18-directed products. These constraints are distinct from ordinary output-commercial rights and free-plan restrictions."},{heading:"tool-4",content:"Tags: `speech-generation` · `audio-generation`. Source reviewed: 2026-10-18. Further reading: Prohibited Use Policy (October 2026) · Non-EEA general terms (October 2026)"},{heading:"tool-4",content:"**MSDF Atlas Generator**"},{heading:"tool-4",content:"Produces glyph textures and layout metadata from fonts. The default character set is ASCII unless overridden, so multilingual coverage must be explicit. Sample atlas color channels as linear data rather than sRGB; font licensing remains independent."},{heading:"tool-4",content:"Tags: `Fonts` · `MSDF` · `UI`. Source reviewed: 2026-10-18."},{heading:"tool-4",content:"**DirectX Shader Compiler**"},{heading:"tool-4",content:"Compiler-call success and shader compilation success are separate: inspect the result status, diagnostics and requested outputs. Target profiles, include dependencies and build configuration matter. A compiled shader does not establish rendering correctness or target-device compatibility."},{heading:"tool-4",content:"Tags: `Shaders` · `HLSL` · `Build validation`. Source reviewed: 2026-10-18. Further reading: Compiler API guide"},{heading:"tool-4",content:"**Playwright Test**"},{heading:"tool-4",content:"Screenshot assertions wait for two matching captures before comparison, but stable pixels do not prove application readiness. Record browser, fonts, viewport and capture options: animation disabling, masks and styles can alter evidence. DOM access is a different observation surface from screenshot-only control or Playwright MCP."},{heading:"tool-4",content:"Tags: `Browser testing` · `Visual regression` · `DOM`. Source reviewed: 2026-10-18. Further reading: Actionability · Screenshot assertion API"},{heading:"community-1",content:`| Resource | Purpose and scope                                                                               | Stages   |
| -------- | ----------------------------------------------------------------------------------------------- | -------- |
| Steam    | Discover desktop games and use Steamworks to prepare store pages, builds, testing, and release. | Shipping |`,table:"table-25"},{heading:"community-1",content:`| Resource | Purpose and scope                                                                                  | Stages   |
| -------- | -------------------------------------------------------------------------------------------------- | -------- |
| itch.io  | Discover independent games and publish project pages with browser builds or downloadable releases. | Shipping |`,table:"table-25"},{heading:"community-1",content:`| Resource         | Purpose and scope                                                                                | Stages   |
| ---------------- | ------------------------------------------------------------------------------------------------ | -------- |
| Epic Games Store | Browse game releases and prepare store distribution through Epic's self-service developer tools. | Shipping |`,table:"table-25"},{heading:"community-1",content:`| Resource | Purpose and scope                                                              | Stages   |
| -------- | ------------------------------------------------------------------------------ | -------- |
| GOG      | Discover DRM-free desktop releases and submit a game to GOG's curated catalog. | Shipping |`,table:"table-25"},{heading:"community-1",content:`| Resource   | Purpose and scope                                                                         | Stages   |
| ---------- | ----------------------------------------------------------------------------------------- | -------- |
| CrazyGames | Play browser games and prepare web builds for CrazyGames submission, testing, and launch. | Shipping |`,table:"table-25"},{heading:"community-1",content:"**Steam**"},{heading:"community-1",content:"Valve's Steam storefront distributes released games; Steamworks is the developer portal for onboarding, store presence, build uploads, testing, and updates. Publishing requires partner setup and review of the store page and build. A Coming Soon page, a demo, and a released game are different states. Steam availability does not establish AI authorship or public game source."},{heading:"community-1",content:"Tags: `Publishing` · `Game discovery` · `Desktop games`. Source reviewed: 2026-10-20. Further reading: Browse games on Steam · Steamworks getting started"},{heading:"community-1",content:"**Tutorial · tutorial:** Steamworks getting started. Official publishing workflow covering partner setup, builds, store presence, and release review."},{heading:"community-1",content:"**Demo · service:** Browse games on Steam. Game storefront. Check each product's release status, supported systems, and acquisition requirements; this is not an embedded browser demo."},{heading:"community-1",content:"**Source · unavailable:** Platform listing is not game source. Complete source must be verified separately for each game; a Steam listing does not supply it."},{heading:"community-1",content:"**itch.io**"},{heading:"community-1",content:"itch.io lets creators manage game pages, screenshots, files, development logs, and updates. HTML5 builds can run in the browser; other releases can be provided as downloads with platform labels. A project's page can also contain a demo or work in development, so inspect the actual uploads and instructions. Publishing a playable build does not automatically make its source public."},{heading:"community-1",content:"Tags: `Publishing` · `Game discovery` · `Browser games` · `Desktop games`. Source reviewed: 2026-10-20. Further reading: Browse games on itch.io · Create your first itch.io page"},{heading:"community-1",content:"**Tutorial · tutorial:** Create your first itch.io page. Official guide to project information, uploads, classification, publishing, and updates."},{heading:"community-1",content:"**Demo · service:** Browse games on itch.io. Independent game catalog with both browser and downloadable games. Availability and license vary by project."},{heading:"community-1",content:"**Source · unavailable:** Platform listing is not game source. Creators may publish source separately, but a game page or downloadable binary alone is not complete project source."},{heading:"community-1",content:"**Epic Games Store**"},{heading:"community-1",content:"Epic Games Store offers a player storefront and publishing tools in the Epic Developer Portal for product pages, builds, offers, and updates. Distribution is engine-agnostic; using Unreal Engine is not a prerequisite. Developers still need account onboarding and must meet the store's content and product requirements. A store listing is distinct from a browser demo, an AI-development claim, or complete source code."},{heading:"community-1",content:"Tags: `Publishing` · `Game discovery` · `Desktop games`. Source reviewed: 2026-10-20. Further reading: Browse games on Epic Games Store · Epic Developer Portal documentation"},{heading:"community-1",content:"**Tutorial · tutorial:** Epic Games Store publishing overview. Official overview and FAQ for self-service distribution, developer setup, and store requirements."},{heading:"community-1",content:"**Demo · service:** Browse games on Epic Games Store. Player storefront. Check each product's release status and supported systems; the store is not a playable project."},{heading:"community-1",content:"**Source · unavailable:** Platform listing is not game source. Game source and reuse rights must be checked independently of Epic Games Store availability."},{heading:"community-1",content:"**GOG**"},{heading:"community-1",content:"GOG is a curated digital game store with DRM-free releases and an optional desktop client. The official submission form is the developer entry point for proposing a game; submitting it does not guarantee acceptance or immediate publication. Verify each game's supported operating systems, edition, and release status. DRM-free distribution is different from publishing the game's source code."},{heading:"community-1",content:"Tags: `Publishing` · `Game discovery` · `Desktop games`. Source reviewed: 2026-10-20. Further reading: Browse games on GOG · Submit a game to GOG"},{heading:"community-1",content:"**Tutorial · service:** Submit a game to GOG. Official submission page with an embedded developer form. Catalog inclusion requires a separate publishing decision."},{heading:"community-1",content:"**Demo · service:** Browse games on GOG. Desktop game catalog. Check the individual product and system requirements rather than assuming browser play."},{heading:"community-1",content:"**Source · unavailable:** Platform listing is not game source. DRM-free describes distribution restrictions, not whether complete source or reusable assets are available."},{heading:"community-1",content:"**CrazyGames**"},{heading:"community-1",content:"CrazyGames hosts browser games, with a separate developer portal and documentation for submission, technical requirements, SDK integration, and testing. Submissions receive QA review; Basic Launch and Full Launch have different requirements and availability. Supported web technologies span multiple engines. A playable portal build is a distribution artifact, not evidence that the complete game project is public or that AI developed it."},{heading:"community-1",content:"Tags: `Publishing` · `Game discovery` · `Browser games`. Source reviewed: 2026-10-20. Further reading: Browse games on CrazyGames · CrazyGames publishing documentation · CrazyGames submission requirements"},{heading:"community-1",content:"**Tutorial · tutorial:** CrazyGames publishing documentation. Official requirements, SDK guides, testing tools, and launch workflow for web games."},{heading:"community-1",content:"**Demo · service:** Browse games on CrazyGames. Browser-game portal. Individual titles have their own input, device, and network requirements."},{heading:"community-1",content:"**Source · unavailable:** Platform listing is not game source. Browser-delivered files are not automatically the complete maintainable project; verify creator-provided source separately."},{heading:"community-1",content:'<a id="world"></a>'},{heading:"framework-5",content:`| Resource               | Purpose and scope                                                                      | Stages                         |
| ---------------------- | -------------------------------------------------------------------------------------- | ------------------------------ |
| StreamRender-H3 · 2026 | A code engine maintains the world while streaming diffusion renders its semantic maps. | Coding / Scenes / World models |`,table:"table-26"},{heading:"framework-5",content:`| Resource                                  | Purpose and scope                                                                                  | Stages                |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------- |
| Oasis: A Universe in a Transformer · 2024 | A neural game research release that predicts Minecraft-style frames from prior frames and actions. | Coding / World models |`,table:"table-26"},{heading:"framework-5",content:"**StreamRender-H3**"},{heading:"framework-5",content:"NVIDIA Sol-Engine's Interactive Coding Worlds system uses a three.js racing game. The engine handles map, physics, collision, and input, while a two-step streaming MiniMax-H3 model renders semantic video conditioned on a first frame and prompt. Reported training and tests cover that one game and third-person view. Semantic colors identify classes rather than individual objects. Diffusion-render timings use eight GB200 GPUs; the causal decoder is measured separately on one GB200. Independent stage timings do not establish end-to-end input-to-display latency. Runtime source and a weight bundle are public, with component-specific terms."},{heading:"framework-5",content:"Tags: `hybrid-renderer` · `executable-state` · `streaming` · `three.js` · `MiniMax-H3` · `NVIDIA`. Source reviewed: 2026-10-19. Further reading: Sol-Engine · Agent workflow · Pinned runtime source · Weights and component licenses"},{heading:"framework-5",content:"**Oasis: A Universe in a Transformer**"},{heading:"framework-5",content:"Oasis by Decart and Etched uses a Transformer autoencoder and latent diffusion. Its MIT-licensed inference code and 500M checkpoint are a downsized release, separate from the larger hosted demo. Hugging Face currently gates weight downloads behind agreement to share contact information. The public script generates video from an initial frame and action sequence; it does not establish a complete live game interface or training pipeline. The authors identify limits in long-term memory, precise inventory control, generalization, and object consistency."},{heading:"framework-5",content:"Tags: `neural-simulator` · `interactive-video` · `transformer` · `Minecraft` · `released-code`. Source reviewed: 2026-10-19. Further reading: Inference code · 500M weights, license and access"},{heading:"paper-2",content:`| Resource             | Purpose and scope                                                            | Stages                         |
| -------------------- | ---------------------------------------------------------------------------- | ------------------------------ |
| SolarRenderer · 2026 | Turns engine- or agent-generated structure videos into styled final visuals. | Coding / Scenes / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                                             | Purpose and scope                                                                   | Stages                           |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------- |
| Code World Model: Coding Agent as World Brain · 2026 | A coding agent writes executable rules and persistent state to drive a video world. | Planning / Coding / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                        | Purpose and scope                                                                       | Stages                          |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------- |
| Programmable World Model · 2026 | Explicit global state and programmable rules preserve entities outside the camera view. | Coding / Testing / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                                     | Purpose and scope                                                                           | Stages                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------- |
| CoDeR — Code Plans, Diffusion Renders · 2026 | Collaborating agents build executable worlds, with diffusion models rendering observations. | Planning / Coding / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                                                      | Purpose and scope                                                                   | Stages                         |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------ |
| Magpie: Real-Time World Renderer for Interactive Games · 2026 | A game engine runs gameplay while a separate Render Server generates final visuals. | Coding / Scenes / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource       | Purpose and scope                                                                               | Stages                         |
| -------------- | ----------------------------------------------------------------------------------------------- | ------------------------------ |
| SolarWM · 2026 | An interactive video world model framework for open data, training, and long-horizon inference. | Coding / Scenes / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource          | Purpose and scope                                                                  | Stages                           |
| ----------------- | ---------------------------------------------------------------------------------- | -------------------------------- |
| WorldCoder · 2024 | Induces Python world models from environment interactions, then plans within them. | Planning / Coding / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                                      | Purpose and scope                                                                       | Stages                                     |
| --------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------ |
| GIF-MCTS / Code World Models Benchmark · 2024 | Synthesizes runnable environment models through generate, improve, and fix tree search. | Planning / Coding / Testing / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                                          | Purpose and scope                                                                  | Stages                                     |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------ |
| Code World Models for General Game Playing · 2025 | Compiles natural-language game rules into verifiable simulators for MCTS planning. | Planning / Coding / Testing / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource         | Purpose and scope                                                       | Stages                           |
| ---------------- | ----------------------------------------------------------------------- | -------------------------------- |
| PoE-World · 2025 | Combines small programmatic experts to model stochastic world dynamics. | Planning / Coding / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource         | Purpose and scope                                                                        | Stages                                     |
| ---------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------ |
| FactorSim · 2024 | Generates simulation and task code from language using factorized state representations. | Planning / Coding / Testing / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                                          | Purpose and scope                                                            | Stages       |
| ------------------------------------------------- | ---------------------------------------------------------------------------- | ------------ |
| Genie: Generative Interactive Environments · 2024 | Learns latent-action-controlled 2D worlds from videos without action labels. | World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                                                      | Purpose and scope                                                          | Stages                 |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------- |
| GameNGen — Diffusion Models Are Real-Time Game Engines · 2024 | Trains an interactive diffusion simulator from DOOM gameplay trajectories. | Testing / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource                                      | Purpose and scope                                                                               | Stages                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- |
| DIAMOND — Diffusion for World Modeling · 2024 | Trains reinforcement learning agents inside diffusion world models that preserve visual detail. | Testing / World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource           | Purpose and scope                                                             | Stages       |
| ------------------ | ----------------------------------------------------------------------------- | ------------ |
| GameFactory · 2025 | Combines open-domain video generation with keyboard and mouse action control. | World models |`,table:"table-27"},{heading:"paper-2",content:`| Resource           | Purpose and scope                                                       | Stages                         |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------ |
| WonderWorld · 2024 | Builds an explorable, expandable explicit 3D scene from a single image. | Assets / Scenes / World models |`,table:"table-27"},{heading:"paper-2",content:"**SolarRenderer**"},{heading:"paper-2",content:"Few-Step Generative Reference Rendering conditions MiniMax-H3 on semantic maps, grayboxes, skeletons, depth, and other structures, with an optional first frame and text. Control and four-step LoRAs include a block-causal variant. Code is Apache-2.0; weights use the geographically restricted MiniMax H3 Community License, and data has component-specific terms, including noncommercial and research-only portions. Upstream programs must maintain world state and rules. Four-step sampling alone does not establish real-time consumer-hardware interaction."},{heading:"paper-2",content:"Tags: `hybrid-renderer` · `structure-conditioning` · `streaming` · `MiniMax-H3` · `LoRA` · `released-code`. Source reviewed: 2026-10-18. Further reading: Code · Paper PDF · Weights · Data and evaluation · Usage guide"},{heading:"paper-2",content:"**Code World Model: Coding Agent as World Brain**"},{heading:"paper-2",content:"Separates world evolution from visual generation. An agent maintains executable state, which is compiled into controls for a fine-tuned MiniMax-H3 renderer. The released inference interface uses an RGB first-frame anchor, per-frame depth and semantic-ID controls, and per-window prompts. Inference code, LoRAs, and examples are public, but the underlying game code that generates proxies cannot be redistributed. The complete agent-to-engine pipeline cannot be reproduced unchanged from those artifacts."},{heading:"paper-2",content:"Tags: `code-world-model` · `coding-agent` · `executable-state` · `hybrid-renderer` · `MiniMax-H3` · `partial-release`. Source reviewed: 2026-10-18. Further reading: Project · Inference code · Reproduction scope"},{heading:"paper-2",content:"**Programmable World Model**"},{heading:"paper-2",content:"An agent converts instructions into entity states and state-transition programs. A lightweight engine maintains global state, then compiles stateful 3D oriented bounding boxes and camera trajectories into video model controls. The paper introduces CombatStateBench to check entity counts and irreversible states. The public repository currently centers on project documentation, which does not establish that complete inference code and weights are available."},{heading:"paper-2",content:"Tags: `code-world-model` · `executable-state` · `hybrid-renderer` · `persistent-state` · `CombatStateBench`. Source reviewed: 2026-10-18. Further reading: Project and release progress"},{heading:"paper-2",content:"**CoDeR — Code Plans, Diffusion Renders**"},{heading:"paper-2",content:"Code Plans, Diffusion Renders: Open-Ended Generative World Modeling uses five collaborating roles to turn concepts into rules, code, and observations, allowing entities to keep evolving outside the current view. The paper studies long-term memory, open-ended interaction, and multi-agent worlds. Its abstract says code and weights will be released; distinguish reported results from artifacts already available."},{heading:"paper-2",content:"Tags: `code-world-model` · `multi-agent` · `hybrid-renderer` · `persistent-state` · `research`. Source reviewed: 2026-10-18. Further reading: Project"},{heading:"paper-2",content:"**Magpie: Real-Time World Renderer for Interactive Games**"},{heading:"paper-2",content:"Designers define scenes and rules in a conventional game engine. At runtime, the engine processes player actions and maintains state, while a rendering service transforms engine-produced whitebox frames into final visuals. It demonstrates a division between generative rendering and reproducible gameplay, primarily reducing prototype dependence on complete art assets. The paper reports chunk-based interaction delay and remaining visual-consistency limitations; it does not establish a production-ready game renderer."},{heading:"paper-2",content:"Tags: `hybrid-renderer` · `executable-state` · `game-engine` · `render-server` · `research`. Source reviewed: 2026-10-19. Further reading: Paper v1 latency and limitations"},{heading:"paper-2",content:"**SolarWM**"},{heading:"paper-2",content:"Unifies data, training, and inference interfaces for camera-controlled streaming video. The source matrix lists all three stages for Wan2.2-5B and MiniMax-H3, but later stages for Wan2.2-14B and LTX-2.5 remain forthcoming. Backbones require separate runtime environments. The main data release contains annotations and indexes; latent payloads are separate, and the full processed training-video corpus requires reconstruction or approved access. The main Hugging Face dataset and H3 model repositories also require agreement to share contact information. This infrastructure does not provide a code world with queryable entity state."},{heading:"paper-2",content:"Tags: `interactive-video` · `training-framework` · `camera-control` · `streaming` · `released-code`. Source reviewed: 2026-10-19. Further reading: Code and documentation · Project · Data access · H3 weights and access"},{heading:"paper-2",content:"**WorldCoder**"},{heading:"paper-2",content:"WorldCoder, a Model-Based LLM Agent represents knowledge of a world as executable Python programs. Interaction records constrain those programs, and planning searches for potential rewards. This NeurIPS 2024 work is primarily evaluated on gridworlds and task planning. It supports study of rule discovery and model repair rather than complete visual game generation."},{heading:"paper-2",content:"Tags: `code-world-model` · `program-synthesis` · `model-based-planning` · `gridworld` · `NeurIPS-2024`. Source reviewed: 2026-10-18."},{heading:"paper-2",content:"**GIF-MCTS / Code World Models Benchmark**"},{heading:"paper-2",content:"Generating Code World Models with Large Language Models Guided by Monte Carlo Tree Search encodes transition, reward, and termination logic in Python. Trajectories and test feedback guide GIF-MCTS search. The paper also releases CWMB, covering 18 reinforcement learning environments, to evaluate model correctness and downstream planning. It is a foundational reading and evaluation reference for code world models."},{heading:"paper-2",content:"Tags: `code-world-model` · `program-synthesis` · `MCTS` · `benchmark` · `CWMB` · `NeurIPS-2024`. Source reviewed: 2026-10-18. Further reading: Code and CWMB · Project"},{heading:"paper-2",content:"**Code World Models for General Game Playing**"},{heading:"paper-2",content:"Generates Python state-transition, legal-action, and termination functions from rules and game trajectories, plus heuristic value and hidden-state inference functions for planning. The paper evaluates 10 fully or partially observable games, including board and card games. Avoiding illegal actions depends on the synthesized rules being correct, so model validation remains necessary."},{heading:"paper-2",content:"Tags: `code-world-model` · `game-rules` · `MCTS` · `formal-simulator` · `imperfect-information`. Source reviewed: 2026-10-18."},{heading:"paper-2",content:"**PoE-World**"},{heading:"paper-2",content:"Compositional World Modeling with Products of Programmatic Experts combines LLM-synthesized programs in an exponentially weighted product of experts, learning complex stochastic world models from few observations. The paper connects these models to planners in Pong and Montezuma's Revenge to demonstrate sample efficiency and generalization to new levels. This is programmatic dynamics modeling rather than an art generation tool."},{heading:"paper-2",content:"Tags: `code-world-model` · `program-synthesis` · `stochastic-dynamics` · `Atari` · `model-based-planning`. Source reviewed: 2026-10-18. Further reading: Code · Project"},{heading:"paper-2",content:"**FactorSim**"},{heading:"paper-2",content:"Generative Simulation via Factorized Representation uses a factorized POMDP representation to reduce context per generation step. It generates 2D game simulations for agent training. Its robotics experiments generate task code, including object states and reward structure, within the existing CLIPort framework. The game benchmark covers eight Pygame environments; 3D game generation is future work in the NeurIPS 2024 paper. Robotics experiments retain 3D relevance without establishing generation of a complete physics engine."},{heading:"paper-2",content:"Tags: `code-world-model` · `simulation-generation` · `POMDP` · `benchmark` · `NeurIPS-2024`. Source reviewed: 2026-10-19. Further reading: Project · Paper v2 scope"},{heading:"paper-2",content:"**Genie: Generative Interactive Environments**"},{heading:"paper-2",content:"Combines a spatiotemporal video tokenizer, autoregressive dynamics, and a latent action model into generative interactive environments. Users can begin with an image or sketch and explore frame by frame. The ICML 2024 contribution centers on learning control without ground-truth action labels. Dynamics remain implicit in the model, without editable or queryable game rule programs."},{heading:"paper-2",content:"Tags: `interactive-video` · `latent-actions` · `neural-simulator` · `2D-platformer` · `ICML-2024`. Source reviewed: 2026-10-18."},{heading:"paper-2",content:"**GameNGen — Diffusion Models Are Real-Time Game Engines**"},{heading:"paper-2",content:"A reinforcement learning agent first collects game trajectories. A diffusion model then predicts the next frame from visual history and actions, using conditioning noise augmentation to reduce autoregressive error. The paper demonstrates real-time DOOM simulation on a single TPU. This game-specific neural simulation does not automatically provide maintainable general game rules or an asset pipeline."},{heading:"paper-2",content:"Tags: `neural-simulator` · `interactive-video` · `diffusion` · `DOOM` · `ICLR-2025`. Source reviewed: 2026-10-18. Further reading: Project"},{heading:"paper-2",content:"**DIAMOND — Diffusion for World Modeling**"},{heading:"paper-2",content:"Visual Details Matter in Atari studies diffusion models as environment models in which agents learn from imagined trajectories, analyzing how visual detail affects policies. Alongside the Atari 100k evaluation, the paper trains a playable neural engine on prerecorded CS:GO gameplay. It is relevant to simulation, control, and accumulated prediction error."},{heading:"paper-2",content:"Tags: `neural-simulator` · `interactive-video` · `diffusion` · `Atari` · `reinforcement-learning` · `NeurIPS-2024`. Source reviewed: 2026-10-18. Further reading: Code and playable models"},{heading:"paper-2",content:"**GameFactory**"},{heading:"paper-2",content:"Creating New Games with Generative Interactive Videos proposes domain adapters and action-control modules for autoregressive game video. The public GF-Minecraft dataset includes action labels; the checked repository provides dataset documentation and detection/visualization utilities, without establishing a released training/inference pipeline or model weights. Visual generalization should be evaluated separately from rule correctness, item persistence, and exportable game projects."},{heading:"paper-2",content:"Tags: `interactive-video` · `neural-simulator` · `action-control` · `Minecraft` · `dataset` · `ICCV-2025`. Source reviewed: 2026-10-18. Further reading: Dataset tools and documentation · GF-Minecraft dataset"},{heading:"paper-2",content:"**WonderWorld**"},{heading:"paper-2",content:"Interactive 3D Scene Generation from a Single Image uses Fast Layered Gaussian Surfels and guided depth diffusion to connect new scenes as the camera moves and prompts change. It provides explicit spatial representation and real-time rendering, primarily addressing geometry and appearance. Interactive gameplay, physics, and persistent dynamic state still require separate implementation."},{heading:"paper-2",content:"Tags: `scene-generation` · `explicit-3d` · `Gaussian-surfels` · `camera-control` · `CVPR-2025`. Source reviewed: 2026-10-18. Further reading: Project"},{heading:"tool-5",content:`| Resource                       | Purpose and scope                                                          | Stages                  |
| ------------------------------ | -------------------------------------------------------------------------- | ----------------------- |
| Genie 3 / Project Genie · 2025 | Generates interactive video worlds from prompts for real-time exploration. | Planning / World models |`,table:"table-28"},{heading:"tool-5",content:`| Resource                 | Purpose and scope                                                      | Stages                         |
| ------------------------ | ---------------------------------------------------------------------- | ------------------------------ |
| World Labs Marble · 2025 | Generates persistent, navigable 3D scenes with splat and mesh exports. | Assets / Scenes / World models |`,table:"table-28"},{heading:"tool-5",content:"**Genie 3 / Project Genie**"},{heading:"tool-5",content:"Google DeepMind's August 2025 research demonstration reported interactive worlds at 720p and 24 FPS with consistency lasting several minutes. The separate Project Genie prototype limits exploration to 60 seconds; its current help page requires an eligible personal Google AI Ultra account, age 18+, where Ultra is available. Video download is documented, while downloadable engine source, exportable level assets, and deterministic gameplay rules are not established by these sources."},{heading:"tool-5",content:"Tags: `interactive-video` · `neural-simulator` · `text-to-world` · `Google-DeepMind` · `hosted`. Source reviewed: 2026-10-19. Further reading: Project Genie access and limits"},{heading:"tool-5",content:"**World Labs Marble**"},{heading:"tool-5",content:"Marble supports multimodal world creation, exports Gaussian splats, visual meshes, and collision meshes for approximate physics, and renders video along camera paths. Compared with pure video continuation, it produces spatial assets for downstream engines. Developers still need to build character behavior, quest logic, and game loops. According to the inspected web-app guide, collider mesh export is included with Standard and high-quality textured GLB export requires Pro."},{heading:"tool-5",content:"Tags: `scene-generation` · `explicit-3d` · `Gaussian-splatting` · `mesh-export` · `hosted`. Source reviewed: 2026-10-19. Further reading: Product · Web-app mesh export"},{heading:"further-reading-and-practice",content:"Agents: models, harnesses, skills, and MCP"},{heading:"further-reading-and-practice",content:"Engine ecosystems: documentation, source, tests, and community practice"},{heading:"further-reading-and-practice",content:"AI for 2D and 3D: evaluation versions, asset pipelines, and release boundaries"},{heading:"further-reading-and-practice",content:"World models: code state, hybrid rendering, video simulation, and explicit 3D"},{heading:"further-reading-and-practice",content:"Practical guide: task contracts, asset import, validation, and reproduction"},{heading:"maintenance",content:"Edit only `data/segments/*.json` for catalog content. Run `npm run build` to regenerate the list and website, and `npm run check` to validate the data and generated outputs. There is no automatic scraping or scheduled updating. Code, weights, data, and services may have different licenses; read the relevant official terms before use. External projects belong to their respective authors."}],headings:[{id:"how-to-read-the-map",content:"How to read the map"},{id:"contents",content:"Contents"},{id:"coding-agents-and-game-development-bridges",content:"Coding agents and game development bridges"},{id:"agent",content:"Agent"},{id:"framework",content:"Framework"},{id:"skill",content:"Skill"},{id:"documentation",content:"Documentation"},{id:"tool",content:"Tool"},{id:"game-engines-dcc-tools-and-ecosystems",content:"Game engines, DCC tools, and ecosystems"},{id:"framework-1",content:"Framework"},{id:"documentation-1",content:"Documentation"},{id:"tool-1",content:"Tool"},{id:"community",content:"Community"},{id:"ai-for-2d-game-development",content:"AI for 2D game development"},{id:"agent-1",content:"Agent"},{id:"framework-2",content:"Framework"},{id:"skill-1",content:"Skill"},{id:"benchmark",content:"Benchmark"},{id:"paper",content:"Paper"},{id:"tool-2",content:"Tool"},{id:"ai-for-3d-game-development",content:"AI for 3D game development"},{id:"framework-3",content:"Framework"},{id:"skill-2",content:"Skill"},{id:"benchmark-1",content:"Benchmark"},{id:"paper-1",content:"Paper"},{id:"tool-3",content:"Tool"},{id:"game-production-art-animation-audio-testing-and-runtime-ai",content:"Game production: art, animation, audio, testing, and runtime AI"},{id:"framework-4",content:"Framework"},{id:"skill-3",content:"Skill"},{id:"documentation-2",content:"Documentation"},{id:"tool-4",content:"Tool"},{id:"community-1",content:"Community"},{id:"code-world-models-and-interactive-worlds",content:"Code world models and interactive worlds"},{id:"framework-5",content:"Framework"},{id:"paper-2",content:"Paper"},{id:"tool-5",content:"Tool"},{id:"further-reading-and-practice",content:"Further reading and practice"},{id:"maintenance",content:"Maintenance"}]},o=[{depth:2,url:"#how-to-read-the-map",title:e.jsx(e.Fragment,{children:"How to read the map"})},{depth:2,url:"#contents",title:e.jsx(e.Fragment,{children:"Contents"})},{depth:2,url:"#coding-agents-and-game-development-bridges",title:e.jsx(e.Fragment,{children:"Coding agents and game development bridges"})},{depth:3,url:"#agent",title:e.jsx(e.Fragment,{children:"Agent"})},{depth:3,url:"#framework",title:e.jsx(e.Fragment,{children:"Framework"})},{depth:3,url:"#skill",title:e.jsx(e.Fragment,{children:"Skill"})},{depth:3,url:"#documentation",title:e.jsx(e.Fragment,{children:"Documentation"})},{depth:3,url:"#tool",title:e.jsx(e.Fragment,{children:"Tool"})},{depth:2,url:"#game-engines-dcc-tools-and-ecosystems",title:e.jsx(e.Fragment,{children:"Game engines, DCC tools, and ecosystems"})},{depth:3,url:"#framework-1",title:e.jsx(e.Fragment,{children:"Framework"})},{depth:3,url:"#documentation-1",title:e.jsx(e.Fragment,{children:"Documentation"})},{depth:3,url:"#tool-1",title:e.jsx(e.Fragment,{children:"Tool"})},{depth:3,url:"#community",title:e.jsx(e.Fragment,{children:"Community"})},{depth:2,url:"#ai-for-2d-game-development",title:e.jsx(e.Fragment,{children:"AI for 2D game development"})},{depth:3,url:"#agent-1",title:e.jsx(e.Fragment,{children:"Agent"})},{depth:3,url:"#framework-2",title:e.jsx(e.Fragment,{children:"Framework"})},{depth:3,url:"#skill-1",title:e.jsx(e.Fragment,{children:"Skill"})},{depth:3,url:"#benchmark",title:e.jsx(e.Fragment,{children:"Benchmark"})},{depth:3,url:"#paper",title:e.jsx(e.Fragment,{children:"Paper"})},{depth:3,url:"#tool-2",title:e.jsx(e.Fragment,{children:"Tool"})},{depth:2,url:"#ai-for-3d-game-development",title:e.jsx(e.Fragment,{children:"AI for 3D game development"})},{depth:3,url:"#framework-3",title:e.jsx(e.Fragment,{children:"Framework"})},{depth:3,url:"#skill-2",title:e.jsx(e.Fragment,{children:"Skill"})},{depth:3,url:"#benchmark-1",title:e.jsx(e.Fragment,{children:"Benchmark"})},{depth:3,url:"#paper-1",title:e.jsx(e.Fragment,{children:"Paper"})},{depth:3,url:"#tool-3",title:e.jsx(e.Fragment,{children:"Tool"})},{depth:2,url:"#game-production-art-animation-audio-testing-and-runtime-ai",title:e.jsx(e.Fragment,{children:"Game production: art, animation, audio, testing, and runtime AI"})},{depth:3,url:"#framework-4",title:e.jsx(e.Fragment,{children:"Framework"})},{depth:3,url:"#skill-3",title:e.jsx(e.Fragment,{children:"Skill"})},{depth:3,url:"#documentation-2",title:e.jsx(e.Fragment,{children:"Documentation"})},{depth:3,url:"#tool-4",title:e.jsx(e.Fragment,{children:"Tool"})},{depth:3,url:"#community-1",title:e.jsx(e.Fragment,{children:"Community"})},{depth:2,url:"#code-world-models-and-interactive-worlds",title:e.jsx(e.Fragment,{children:"Code world models and interactive worlds"})},{depth:3,url:"#framework-5",title:e.jsx(e.Fragment,{children:"Framework"})},{depth:3,url:"#paper-2",title:e.jsx(e.Fragment,{children:"Paper"})},{depth:3,url:"#tool-5",title:e.jsx(e.Fragment,{children:"Tool"})},{depth:2,url:"#further-reading-and-practice",title:e.jsx(e.Fragment,{children:"Further reading and practice"})},{depth:2,url:"#maintenance",title:e.jsx(e.Fragment,{children:"Maintenance"})}];function i(t){const n={a:"a",blockquote:"blockquote",code:"code",details:"details",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",summary:"summary",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"A planning map for AI game development — from an idea to a playable world."}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"115 curated primary sources"})," connecting coding agents, game engines, AI for 2D and 3D development, production tools, and code world models. Start with the categories below, then follow each entry's setup, release scope, and source links."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://openenvision.github.io/GameMap/",children:"Interactive GameMap website — GitHub Pages"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/practical-guide/",children:"A practical guide from resources to a working project"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/research-index/",children:"Production research: interfaces, evidence and generative-service boundaries"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/tutorials-and-demos/",children:"Tutorials, playable demos, and complete example-game source"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/coding-agent-game-code/",children:"Coding agents × games: skills, bridges, evaluations, and game code"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/game-testing-library/",children:"Testing library: games, AI environments, assets, rigs, and motion data"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://openenvision.github.io/GameMap/papers/",children:"Paper List: official code, licenses, project pages, and demo filters"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://openenvision.github.io/GameMap/research/",children:"Repository research: implementation access and source evidence"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://openenvision.github.io/GameMap/showcase/",children:"Project demos: live experiences and recorded research cases"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/publishing-platforms/",children:"Publishing platforms: Steam, itch.io, web portals, and stores"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"/docs/contributing/",children:"Contributing and data maintenance"})," · ",e.jsx(n.a,{href:"/GameMap/data/resources.json",children:"Structured JSON"})]}),`
`]}),`
`,e.jsx(n.h2,{id:"how-to-read-the-map",children:"How to read the map"}),`



































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Layer"}),e.jsx(n.th,{children:"What it addresses"}),e.jsx(n.th,{children:"Evidence to look for"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Model / coding agent / harness"}),e.jsx(n.td,{children:"Reasoning, code changes, and tool execution"}),e.jsx(n.td,{children:"Actual tools, runtime feedback, and supported tasks"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Skill / MCP / CLI"}),e.jsx(n.td,{children:"Domain knowledge and engine editing"}),e.jsx(n.td,{children:"Real SKILL.md files, protocols, and editor operations"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Framework / tool"}),e.jsx(n.td,{children:"Organizing generation or completing a production task"}),e.jsx(n.td,{children:"Inputs, outputs, project formats, and release status"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Benchmark"}),e.jsx(n.td,{children:"Repeatable development evaluation"}),e.jsx(n.td,{children:"Tasks, scoring scripts, environments, and versions"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Paper / world model"}),e.jsx(n.td,{children:"Executable state, neural simulation, or hybrid rendering"}),e.jsx(n.td,{children:"World representation, action interface, long-term consistency, and public availability"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Tool roles."})," DeepSeek is listed through its model integration documentation, rather than as an official standalone harness. Blender is a DCC application and Three.js is a 3D library; their roles differ from those of full game engines. Development, gameplay, and modeling evaluations are considered separately. SolarRenderer and StreamRender-H3 belong to the structure- or engine-driven hybrid rendering track; pure video world models are labeled separately."]}),`
`,e.jsx(n.h2,{id:"contents",children:"Contents"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#agents",children:"1. Coding agents and game development bridges"})," — 20 resources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#engines",children:"2. Game engines, DCC tools, and ecosystems"})," — 24 resources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#2d",children:"3. AI for 2D game development"})," — 13 resources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#3d",children:"4. AI for 3D game development"})," — 15 resources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#production",children:"5. Game production: art, animation, audio, testing, and runtime AI"})," — 23 resources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#world",children:"6. Code world models and interactive worlds"})," — 20 resources"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{id:"agents"})}),`
`,e.jsx(n.h2,{id:"coding-agents-and-game-development-bridges",children:"Coding agents and game development bridges"}),`
`,e.jsx(n.h3,{id:"agent",children:"Agent"}),`








































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://learn.chatgpt.com/docs/codex/cli",children:"OpenAI Codex"})}),e.jsx(n.td,{children:"A general-purpose coding agent for reading, editing, running commands, and reviewing code in a local repository."}),e.jsx(n.td,{children:"Planning / Coding / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://code.claude.com/docs/en/overview",children:"Claude Code"})}),e.jsx(n.td,{children:"A coding agent that reads and edits projects, runs tools, and supports skills, hooks, and MCP through terminal and IDE interfaces."}),e.jsx(n.td,{children:"Planning / Coding / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/google-gemini/gemini-cli",children:"Gemini CLI"})}),e.jsx(n.td,{children:"Google's open-source terminal coding agent with file access, shell tools, extensions, and MCP support."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://opencode.ai/docs/",children:"OpenCode"})}),e.jsx(n.td,{children:"An open-source coding agent with multiple model providers, Plan / Build modes, and project instructions."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/cline/cline",children:"Cline"})}),e.jsx(n.td,{children:"An open-source coding agent with multiple models, Plan / Act modes, project rules, and MCP support."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/Aider-AI/aider",children:"Aider"})}),e.jsx(n.td,{children:"A terminal AI pair-programming tool built around repository maps, Git changes, and lint and test feedback."}),e.jsx(n.td,{children:"Coding / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://learn.chatgpt.com/docs/codex/cli",children:"OpenAI Codex"})})}),`
`,e.jsx(n.p,{children:"Useful as the main code execution loop for a game project: break down gameplay, maintain scripts, run builds, and inspect failures. Engine integration still requires a CLI, editor bridge, or MCP server; compiling successfully does not establish that a game is playable."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"General-purpose agent"})," · ",e.jsx(n.code,{children:"Code review"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Skills"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://learn.chatgpt.com/use-cases/browser-games",children:"Official game workflow"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://code.claude.com/docs/en/overview",children:"Claude Code"})})}),`
`,e.jsx(n.p,{children:"Can develop game scripts, migrate architecture, troubleshoot builds, and connect to Unity, Godot, or UE through community MCP servers. Use CLAUDE.md, skills, and editor state together; one MCP demonstration does not establish complete engine automation."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"General-purpose agent"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Skills"})," · ",e.jsx(n.code,{children:"Hooks"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/anthropics/claude-code",children:"Official repository and examples"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/google-gemini/gemini-cli",children:"Gemini CLI"})})}),`
`,e.jsx(n.p,{children:"Can help understand game projects, edit scripts, and drive editors through MCP. The official README states that Antigravity CLI replaced Gemini CLI for unpaid-tier and Google One users on June 18, 2026, and that Gemini CLI is not optimized for the latest Gemini models. Check the account-specific migration guidance before choosing this entry point."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"Google"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Open source"})," · ",e.jsx(n.code,{children:"Migration guidance"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://geminicli.com/docs/",children:"Official documentation"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://opencode.ai/docs/",children:"OpenCode"})})}),`
`,e.jsx(n.p,{children:"Useful for planning and editing game projects with independently selected providers and models. Pin V1 or V2: the V2 migration guide documents incompatible plugin/server APIs, external-directory access allowed by default, and no running LSP or LSP diagnostics despite accepted configuration. Validate permissions, MCP integrations, and compiler/test feedback for the chosen version; editor and gameplay inspection still require separate tools."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"Multiple models"})," · ",e.jsx(n.code,{children:"Plan / Build"})," · ",e.jsx(n.code,{children:"Open source"})," · ",e.jsx(n.code,{children:"AGENTS.md"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/anomalyco/opencode",children:"Source code"})," · ",e.jsx(n.a,{href:"https://opencode.ai/v2/docs/migrate-v1/",children:"V1 to V2 migration boundaries"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/cline/cline",children:"Cline"})})}),`
`,e.jsx(n.p,{children:"Useful for reviewing and editing game code in an IDE or CLI, with build output and MCP editor tools in the feedback loop. Reuse .clinerules and skills to capture engine conventions; editor operations depend on the specific bridge service."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"IDE"})," · ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"Multiple models"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Plan / Act"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://docs.cline.bot/",children:"Documentation"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Aider-AI/aider",children:"Aider"})})}),`
`,e.jsx(n.p,{children:"Useful for changes across files, refactoring, and testable logic in existing game projects, with model options including DeepSeek. It accepts supplied screenshots with a vision-capable model. Its code editing workflow does not directly control Unity, UE, or Blender editors; automated screenshot capture and game interaction need a separate setup."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"Git"})," · ",e.jsx(n.code,{children:"Repository map"})," · ",e.jsx(n.code,{children:"Multiple models"})," · ",e.jsx(n.code,{children:"Refactoring"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://aider.chat/docs/",children:"User documentation"})," · ",e.jsx(n.a,{href:"https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/website/docs/usage/images-urls.md#L11-L27",children:"Screenshot and image input"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"framework",children:"Framework"}),`






























`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/OpenHands/OpenHands",children:"OpenHands · Agent Canvas"})}),e.jsx(n.td,{children:"An open-source development console for managing local, remote, and cloud agent environments."}),e.jsx(n.td,{children:"Planning / Coding / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/OpenHands/software-agent-sdk",children:"OpenHands Software Agent SDK"})}),e.jsx(n.td,{children:"A programmable development framework for agents, tools, conversations, workspaces, and server interfaces."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://code.claude.com/docs/en/agent-sdk/overview",children:"Claude Agent SDK"})}),e.jsx(n.td,{children:"Embed Claude Code's tool loop, permissions, sessions, and extensions in Python or TypeScript applications."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/SWE-agent/mini-swe-agent",children:"mini-swe-agent"})}),e.jsx(n.td,{children:"A minimal shell-based coding-agent research baseline designed for modification and trace inspection."}),e.jsx(n.td,{children:"Coding / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/OpenHands/OpenHands",children:"OpenHands · Agent Canvas"})})}),`
`,e.jsx(n.p,{children:"Can centralize multi-agent tasks, environments, and execution records for game projects. The repository provides the Agent Canvas frontend and orchestration entry point; the core tool loop and Agent Server live in a separate SDK repository. Game automation still requires engine tools."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Agent Canvas"})," · ",e.jsx(n.code,{children:"Environments"})," · ",e.jsx(n.code,{children:"Multi-agent"})," · ",e.jsx(n.code,{children:"Open source"})," · ",e.jsx(n.code,{children:"Orchestration"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/OpenHands/software-agent-sdk",children:"Core SDK"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/OpenHands/software-agent-sdk",children:"OpenHands Software Agent SDK"})})}),`
`,e.jsx(n.p,{children:"Useful for wrapping builds, scene inspections, and tests as agent tools. The Python SDK supports local and remote workspaces; the checked TypeScript client is alpha and supports remote conversations through Agent Server only. Pin client/server versions rather than assuming interface parity. Game-specific tools and acceptance checks still need to be supplied."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"SDK"})," · ",e.jsx(n.code,{children:"Python"})," · ",e.jsx(n.code,{children:"TypeScript"})," · ",e.jsx(n.code,{children:"Workspaces"})," · ",e.jsx(n.code,{children:"Reproducible experiments"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://docs.openhands.dev/sdk",children:"SDK documentation"})," · ",e.jsx(n.a,{href:"https://github.com/OpenHands/software-agent-sdk/blob/3f3294581ebf40f3bbe5b96aec1d28b7fec96226/clients/typescript/README.md#L1-L19",children:"TypeScript client scope and stability"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://code.claude.com/docs/en/agent-sdk/overview",children:"Claude Agent SDK"})})}),`
`,e.jsx(n.p,{children:"Runs the Claude Code binary and tool loop inside a process you operate, with Python or TypeScript APIs for permissions, sessions, hooks, and MCP. It can support game-specific repair and validation services, but domain tools, scoring rules, and runtime environments must be supplied. This differs from a Client SDK for direct model calls; the official overview also specifies Anthropic Commercial Terms and separate authentication constraints."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"SDK"})," · ",e.jsx(n.code,{children:"Python"})," · ",e.jsx(n.code,{children:"TypeScript"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Hooks"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/SWE-agent/mini-swe-agent",children:"mini-swe-agent"})})}),`
`,e.jsx(n.p,{children:"Useful for isolating model, prompt, and environment effects in game code generation and repair, or wrapping headless engine commands. Its minimal loop executes commands in independent subprocesses rather than a persistent shell, so working-directory and environment setup must be carried into each command or script. It is a general software-engineering baseline; playability, visuals, and physics require additional validation."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Research baseline"})," · ",e.jsx(n.code,{children:"Shell"})," · ",e.jsx(n.code,{children:"Harness"})," · ",e.jsx(n.code,{children:"Traces"})," · ",e.jsx(n.code,{children:"Open source"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/SWE-agent/SWE-agent",children:"Predecessor: SWE-agent"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"skill",children:"Skill"}),`















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md",children:"Unity-MCP Operator Guide"})}),e.jsx(n.td,{children:"A practical MCP for Unity skill: inspect editor state, act, wait for compilation and domain reload, then verify results."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]})})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md",children:"Unity-MCP Operator Guide"})})}),`
`,e.jsx(n.p,{children:"Defines resource-first scene operations and requires checking compilation, domain reload, tool readiness, and blocking reasons before further edits. Script changes are followed by console and screenshot checks. This is a procedure source for MCP for Unity, not an installed or tested integration here; examples and parameters depend on bridge, Unity, UI, and input-system versions."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"Skills"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Compilation feedback"})," · ",e.jsx(n.code,{children:"Skill source"}),". Source reviewed: 2026-10-18."]}),`
`]}),`
`,e.jsx(n.h3,{id:"documentation",children:"Documentation"}),`






























`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://api-docs.deepseek.com/guides/anthropic_api/",children:"DeepSeek · Agent Integrations"})}),e.jsx(n.td,{children:"Official guidance for using DeepSeek as a model backend within agent harnesses such as Claude Code."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://agents.md/",children:"AGENTS.md"})}),e.jsx(n.td,{children:"An open Markdown format for giving coding agents build commands, test rules, and project conventions."}),e.jsx(n.td,{children:"Planning / Coding / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://agentskills.io/home",children:"Agent Skills"})}),e.jsx(n.td,{children:"An open format that packages domain workflows as SKILL.md instructions, scripts, and reference materials."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://learn.chatgpt.com/use-cases/browser-games",children:"Codex · Create Browser-based Games"})}),e.jsx(n.td,{children:"OpenAI's browser game workflow covering planning, project instructions, asset generation, and browser iteration."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Testing / Shipping"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://api-docs.deepseek.com/guides/anthropic_api/",children:"DeepSeek · Agent Integrations"})})}),`
`,e.jsx(n.p,{children:"The Anthropic API compatibility layer connects DeepSeek to existing tool loops. The harness handles files, tests, and engine connections. The guide supports ordinary tool calls but ignores the server-side mcp_servers field and does not support MCP-specific content blocks. Client-side MCP tools therefore remain the harness's responsibility; API compatibility does not establish complete feature parity."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"DeepSeek"})," · ",e.jsx(n.code,{children:"Model backend"})," · ",e.jsx(n.code,{children:"Harness"})," · ",e.jsx(n.code,{children:"API compatibility"})," · ",e.jsx(n.code,{children:"Scope"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://agents.md/",children:"AGENTS.md"})})}),`
`,e.jsx(n.p,{children:"Game projects can record engine versions, launch commands, directory rules, asset import conventions, and acceptance checks to reduce environment guesswork. This is a project instruction format rather than an agent runtime; discovery and configuration vary by client."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Project instructions"})," · ",e.jsx(n.code,{children:"Project conventions"})," · ",e.jsx(n.code,{children:"Open format"})," · ",e.jsx(n.code,{children:"Context"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://agentskills.io/home",children:"Agent Skills"})})}),`
`,e.jsx(n.p,{children:"Useful for repeatable game tasks such as sprite normalization, GLB export, scene inspection, and regression testing, with domain knowledge loaded as needed. Skills provide procedures and resources; engine control still requires tools, dependencies, and a compatible client."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Skills"})," · ",e.jsx(n.code,{children:"Open format"})," · ",e.jsx(n.code,{children:"Workflows"})," · ",e.jsx(n.code,{children:"Progressive loading"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://learn.chatgpt.com/use-cases/browser-games",children:"Codex · Create Browser-based Games"})})}),`
`,e.jsx(n.p,{children:"Define the player goal, core loop, inputs, and win and loss conditions, then implement with PLAN.md and AGENTS.md. Combine image skills and Playwright for visual and interaction feedback. This is a practical guide, not a performance guarantee for every game genre or a research benchmark."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Official workflow"})," · ",e.jsx(n.code,{children:"Browser games"})," · ",e.jsx(n.code,{children:"Planning"})," · ",e.jsx(n.code,{children:"Playwright"})," · ",e.jsx(n.code,{children:"Asset consistency"}),". Source reviewed: 2026-10-18."]}),`
`]}),`
`,e.jsx(n.h3,{id:"tool",children:"Tool"}),`



































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/CoplayDev/unity-mcp",children:"MCP for Unity"})}),e.jsx(n.td,{children:"A community MCP bridge connecting general-purpose coding agents to the Unity Editor."}),e.jsx(n.td,{children:"Coding / Assets / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/Coding-Solo/godot-mcp",children:"Godot MCP · Coding-Solo"})}),e.jsx(n.td,{children:"A community MCP server for launching Godot, running projects, reading logs, and performing basic scene operations."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/ahujasid/mcp-for-blender",children:"MCP for Blender"})}),e.jsx(n.td,{children:"A Blender add-on and MCP server for agent-driven modeling, materials, Python execution, and visual feedback."}),e.jsx(n.td,{children:"Coding / Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/chongdashu/unreal-mcp",children:"Unreal MCP · chongdashu"})}),e.jsx(n.td,{children:"A Python MCP server and UE C++ plugin connecting agents to Actors, Blueprints, and viewport controls."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/microsoft/playwright-mcp",children:"Playwright MCP"})}),e.jsx(n.td,{children:"Microsoft's browser automation MCP server for exposing page structure, interactions, and browser feedback to agents."}),e.jsx(n.td,{children:"Testing / Shipping"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/CoplayDev/unity-mcp",children:"MCP for Unity"})})}),`
`,e.jsx(n.p,{children:"Exposes editor operations for scenes, GameObjects, C# scripts, assets, and tests. The checked installation source declares Unity 2021.3 LTS or newer, plus Python 3.10+ and uv. These are declared requirements, not versions tested here. The project is independent of Unity Technologies; pin bridge/editor versions and validate compilation, screenshots, and PlayMode tests."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Editor bridge"})," · ",e.jsx(n.code,{children:"Community project"})," · ",e.jsx(n.code,{children:"C#"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://coplaydev.github.io/unity-mcp/",children:"Installation and tool documentation"})," · ",e.jsx(n.a,{href:"https://github.com/CoplayDev/unity-mcp/blob/aa5fc638d623f56178d50329d9ad8c541a57fe66/website/docs/getting-started/install.md#L13-L17",children:"Pinned installation requirements"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Coding-Solo/godot-mcp",children:"Godot MCP · Coding-Solo"})})}),`
`,e.jsx(n.p,{children:"Supports project execution, debug output capture, scene and node creation, Sprite2D texture loading, and some 3D MeshLibrary operations. It can give agents feedback from real projects; these interfaces do not provide complete visual playtesting or every editor feature. At the checked commit, the server keeps one active project process and sends kill before spawning another without awaiting prior exit. Stop returns after sending a kill request rather than waiting for process exit; natural exit clears the handle used by get_debug_output. Archive output separately for reliable crash evidence."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"GDScript"})," · ",e.jsx(n.code,{children:"Runtime logs"})," · ",e.jsx(n.code,{children:"Scenes"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts#L1053-L1215",children:"Pinned implementation and lifecycle limits"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/ahujasid/mcp-for-blender",children:"MCP for Blender"})})}),`
`,e.jsx(n.p,{children:"Useful for 3D game assets and scene prototypes with viewport feedback. Formerly blender-mcp, this community bridge can execute arbitrary Python inside Blender; use trusted tasks and saved copies. The checked documentation distinguishes default minimal usage telemetry from opt-in creative-content collection; DISABLE_TELEMETRY=true disables both. Review the opt-in data terms before enabling content capture. Validate topology, scale, UVs, collision, and exports separately."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Blender"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Python"})," · ",e.jsx(n.code,{children:"3D assets"})," · ",e.jsx(n.code,{children:"Community project"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/README.md#L808-L842",children:"Telemetry defaults and controls"})," · ",e.jsx(n.a,{href:"https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/TERMS_AND_CONDITIONS.md",children:"Opt-in content and data terms"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/chongdashu/unreal-mcp",children:"Unreal MCP · chongdashu"})})}),`
`,e.jsx(n.p,{children:"Covers Actor transforms, Blueprint classes and components, some node graphs, and editor camera operations. The README declares Unreal Engine 5.5+ and Python 3.12+ and supplies a UE5.5 example; later-version compatibility is not independently tested here. The author marks it experimental and advises against production use. Pin versions and verify supported operations individually."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Blueprint"})," · ",e.jsx(n.code,{children:"Experimental"})," · ",e.jsx(n.code,{children:"Editor bridge"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/chongdashu/unreal-mcp/tree/main/Docs",children:"Tool documentation"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/microsoft/playwright-mcp",children:"Playwright MCP"})})}),`
`,e.jsx(n.p,{children:"Useful for browser game menus, HUDs, launch flows, keyboard input, and screenshots. The default interface uses accessibility trees; coordinate-based mouse tools require the optional vision capability. Neither interface automatically exposes internal Canvas or WebGL state, so game debug instrumentation may be needed. The checked README warns that the server is not a security boundary and documents browser_run_code_unsafe as arbitrary JavaScript execution in the Playwright server process. The separate Playwright CLI repository provides a CLI + Skills workflow."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Playwright"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Browser testing"})," · ",e.jsx(n.code,{children:"HUD"})," · ",e.jsx(n.code,{children:"Canvas limitations"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://github.com/microsoft/playwright-mcp/blob/b8b4183e099f136cbec0388a6088d4aa2f6b9685/README.md#security",children:"Pinned tools and security boundaries"})," · ",e.jsx(n.a,{href:"https://github.com/microsoft/playwright-cli",children:"Companion CLI + Skills"})]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{id:"engines"})}),`
`,e.jsx(n.h2,{id:"game-engines-dcc-tools-and-ecosystems",children:"Game engines, DCC tools, and ecosystems"}),`
`,e.jsx(n.h3,{id:"framework-1",children:"Framework"}),`















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://r3f.docs.pmnd.rs/getting-started/introduction",children:"React Three Fiber"})}),e.jsx(n.td,{children:"A React renderer for Three.js that brings component-based, declarative scenes into the React ecosystem."}),e.jsx(n.td,{children:"Planning / Coding / Scenes / Testing"})]})})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://r3f.docs.pmnd.rs/getting-started/introduction",children:"React Three Fiber"})})}),`
`,e.jsx(n.p,{children:"Useful for combining web HUDs, application state, and 3D scenes, with pmndrs tools for loading, interaction, and debugging. It does not supply every game system; match React, Fiber, and Three.js versions and define clear boundaries for per-frame simulation."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Three.js"})," · ",e.jsx(n.code,{children:"React"})," · ",e.jsx(n.code,{children:"R3F"})," · ",e.jsx(n.code,{children:"pmndrs"})," · ",e.jsx(n.code,{children:"Declarative scenes"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/pmndrs/react-three-fiber",children:"Source code"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"documentation-1",children:"Documentation"}),`























































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html",children:"Godot · Command Line Tutorial"})}),e.jsx(n.td,{children:"Godot's official CLI reference for headless operation, script checks, asset import, execution, and export."}),e.jsx(n.td,{children:"Coding / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/godotengine/godot-demo-projects",children:"Godot Demo Projects"})}),e.jsx(n.td,{children:"Official runnable Godot examples covering 2D, 3D, GUI, audio, networking, and rendering."}),e.jsx(n.td,{children:"Planning / Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/Unity-Technologies/2d-techdemos",children:"Unity · 2D Tech Demos"})}),e.jsx(n.td,{children:"Official Unity 2D example source for Tilemaps, Scripted Tiles, brushes, and runtime map changes."}),e.jsx(n.td,{children:"Coding / Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine",children:"Lyra Sample Game"})}),e.jsx(n.td,{children:"Epic's modular UE5 sample game, with gameplay plugins, abilities, animation, input, and UI."}),e.jsx(n.td,{children:"Planning / Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://threejs.org/examples/",children:"Three.js · Examples"})}),e.jsx(n.td,{children:"Official runnable Three.js graphics examples with their HTML and JavaScript source."}),e.jsx(n.td,{children:"Coding / Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst",children:"Blender Python · API Quickstart"})}),e.jsx(n.td,{children:"Official Blender API tutorial source covering bpy data, context, operators, and Python operations."}),e.jsx(n.td,{children:"Coding / Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/phaserjs/examples",children:"Phaser · Examples"})}),e.jsx(n.td,{children:"Official Phaser example source with runnable references for specific APIs and gameplay components."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine",children:"Unreal Engine · Remote Control API"})}),e.jsx(n.td,{children:"Exposes reflected editor properties and functions over HTTP for external tooling."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html",children:"Unity · Addressables Build and Loading APIs"})}),e.jsx(n.td,{children:"Builds addressable content from explicit profiles and loads assets through asynchronous handles."}),e.jsx(n.td,{children:"Assets / Coding / Shipping / Runtime AI"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html",children:"Godot · Command Line Tutorial"})})}),`
`,e.jsx(n.p,{children:"Lets coding agents launch projects, read logs, parse scripts, and export builds through commands, reducing GUI dependence. The --check-only flag parses a script supplied with --script; it does not execute gameplay tests. Supported flags vary by build type, and unknown flags are silently ignored; check the selected binary's --help. Headless runs cannot replace real rendering and input tests."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"Headless"})," · ",e.jsx(n.code,{children:"Builds"})," · ",e.jsx(n.code,{children:"Reproducibility"}),". Source reviewed: 2026-10-19."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/godotengine/godot-demo-projects",children:"Godot Demo Projects"})})}),`
`,e.jsx(n.p,{children:"Useful as minimal reference projects and regression tasks for agents, with concrete examples of scenes, scripts, and resources. The repository states that master targets the development engine; choose a matching branch for a stable release to avoid mistaking version conflicts for generation failures."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"Official examples"})," · ",e.jsx(n.code,{children:"Runnable source"})," · ",e.jsx(n.code,{children:"Version branches"})," · ",e.jsx(n.code,{children:"Reference projects"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Unity-Technologies/2d-techdemos",children:"Unity · 2D Tech Demos"})})}),`
`,e.jsx(n.p,{children:"Offers source scenes for tile collision lookup, destructible maps, and palette switching. The inspected project records Unity 6000.3.3f1, URP 17.3.0, and Input System 1.17.0, while the README says 2021.1 onward. Its manifest selects 2d-extras' package_6000.3 Git branch but the committed lockfile records registry 6.0.1; resolve and pin dependencies before testing. Source review did not establish import, playback, or compatibility across Editor versions."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"2D"})," · ",e.jsx(n.code,{children:"Tilemap"})," · ",e.jsx(n.code,{children:"Official examples"})," · ",e.jsx(n.code,{children:"Runnable source"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/ProjectSettings/ProjectVersion.txt#L1-L2",children:"Pinned editor baseline"})," · ",e.jsx(n.a,{href:"https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/Packages/manifest.json#L2-L14",children:"Pinned package manifest"})," · ",e.jsx(n.a,{href:"https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/Packages/packages-lock.json#L27-L36",children:"Pinned package lock"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine",children:"Lyra Sample Game"})})}),`
`,e.jsx(n.p,{children:"Useful for learning how Game Feature Plugins, Experiences, and the Gameplay Ability System work together in a real project. Source and content are distributed through Fab / Epic Launcher and require a matching engine version. Lyra is more complex than a minimal prototype, so study it by module. The official Fab listing marks its content for use only with Unreal Engine-based products."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"Official sample"})," · ",e.jsx(n.code,{children:"GAS"})," · ",e.jsx(n.code,{children:"Modular design"})," · ",e.jsx(n.code,{children:"Runnable project"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en",children:"Official Fab listing"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://threejs.org/examples/",children:"Three.js · Examples"})})}),`
`,e.jsx(n.p,{children:"Provides minimal references for loaders, lighting, materials, animation, and rendering techniques to adapt into game scenes. The website and dev branch change continuously; keep source, addons, and runtime on the same release rather than mixing example versions."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Three.js"})," · ",e.jsx(n.code,{children:"Official examples"})," · ",e.jsx(n.code,{children:"Materials"})," · ",e.jsx(n.code,{children:"Loaders"})," · ",e.jsx(n.code,{children:"Runnable source"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/mrdoob/three.js/tree/dev/examples",children:"Example source"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst",children:"Blender Python · API Quickstart"})})}),`
`,e.jsx(n.p,{children:"Provides authoritative guidance for asset scripts, especially the distinction between direct data access and operations that depend on the current mode, selection, or viewport. bpy.ops poll checks can fail because of context; scripts should inspect actual state and verify outputs, beyond syntax checks."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Blender"})," · ",e.jsx(n.code,{children:"Python"})," · ",e.jsx(n.code,{children:"bpy"})," · ",e.jsx(n.code,{children:"Context"})," · ",e.jsx(n.code,{children:"Automation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://docs.blender.org/api/current/",children:"API documentation"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/phaserjs/examples",children:"Phaser · Examples"})})}),`
`,e.jsx(n.p,{children:"Official examples for animation, cameras, input, physics, and scene transitions. The current README targets Phaser 4, and the labs site defaults to its latest development build; select and pin the version matching your project. The MIT license covers example code, not bundled art assets. Review asset permissions before reuse and test in a real browser."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Phaser"})," · ",e.jsx(n.code,{children:"Official examples"})," · ",e.jsx(n.code,{children:"Runnable source"})," · ",e.jsx(n.code,{children:"2D"})," · ",e.jsx(n.code,{children:"Version scope"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine",children:"Unreal Engine · Remote Control API"})})}),`
`,e.jsx(n.p,{children:"Remote Control provides a native engine integration surface distinct from a community MCP bridge. Property writes can request editor transactions and change notifications, but an acknowledged mutation does not establish package-save completion. The rolling Epic guide labels this feature Beta and disables it by default in packaged builds and -game. Enable the appropriate plugin, restrict network exposure, and qualify editor versus packaged-runtime access separately."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"HTTP"})," · ",e.jsx(n.code,{children:"Editor automation"})," · ",e.jsx(n.code,{children:"State mutation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine/remote-control-api-http-reference-for-unreal-engine",children:"HTTP API reference"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html",children:"Unity · Addressables Build and Loading APIs"})})}),`
`,e.jsx(n.p,{children:"The checked Addressables 1.21 documentation separates content builds from executable builds. Build settings, active profile, builder, and content-state file affect outputs. Runtime loading returns a handle whose status and result must be checked and later released. A key matching several assets can select only the first; preserve dependency and cache provenance."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"Addressables"})," · ",e.jsx(n.code,{children:"Asset dependencies"})," · ",e.jsx(n.code,{children:"Async loading"})," · ",e.jsx(n.code,{children:"Content builds"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://docs.unity3d.com/kr/Packages/com.unity.addressables%401.21/api/UnityEngine.AddressableAssets.Addressables.LoadAssetAsync.html",children:"LoadAssetAsync reference"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"tool-1",children:"Tool"}),`




























































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.godotengine.org/en/stable/",children:"Godot Engine · Official Documentation"})}),e.jsx(n.td,{children:"An open-source 2D and 3D game engine that organizes runnable projects through scenes, nodes, resources, and scripts."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/bitwes/Gut",children:"GUT · Godot Unit Test"})}),e.jsx(n.td,{children:"A community Godot testing framework for GDScript assertions, test doubles, and parameterized cases."}),e.jsx(n.td,{children:"Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.unity3d.com/Manual/index.html",children:"Unity · Manual"})}),e.jsx(n.td,{children:"Official Unity documentation for projects, the editor, scripting, rendering, physics, asset import, and publishing."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html",children:"Unity Test Framework"})}),e.jsx(n.td,{children:"Unity's official testing framework, with Edit mode, Play mode, and command-line execution."}),e.jsx(n.td,{children:"Coding / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine",children:"Unreal Engine · Documentation"})}),e.jsx(n.td,{children:"Official Epic documentation for UE C++, Blueprints, rendering, animation, physics, and packaging."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine",children:"Unreal · Automation Test Framework"})}),e.jsx(n.td,{children:"UE's official infrastructure for unit, functional, content stress, and screenshot comparison tests."}),e.jsx(n.td,{children:"Coding / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/mrdoob/three.js",children:"Three.js"})}),e.jsx(n.td,{children:"A JavaScript 3D rendering library for browsers, with scenes, cameras, materials, and loaders."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/blender/blender",children:"Blender"})}),e.jsx(n.td,{children:"An open-source 3D creation suite for modeling, materials, rigging, animation, simulation, and rendering."}),e.jsx(n.td,{children:"Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/KhronosGroup/glTF-Blender-IO",children:"Khronos · glTF-Blender-IO"})}),e.jsx(n.td,{children:"Khronos's official Blender glTF 2.0 importer and exporter source, including validation and roundtrip tests."}),e.jsx(n.td,{children:"Assets / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game",children:"Phaser · First Game Guide"})}),e.jsx(n.td,{children:"A browser 2D game framework whose official tutorial covers assets, scenes, animation, input, and collisions."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing / Shipping"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.godotengine.org/en/stable/",children:"Godot Engine · Official Documentation"})})}),`
`,e.jsx(n.p,{children:"Provides authoritative context for GDScript, C#, scene, and resource APIs, helping agents connect script changes to running scenes. Pin the engine version and use matching documentation; stable and development branches are not interchangeable."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"GDScript"})," · ",e.jsx(n.code,{children:"Scenes and nodes"})," · ",e.jsx(n.code,{children:"Official documentation"})," · ",e.jsx(n.code,{children:"Open source"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/godotengine/godot",children:"Engine source"})," · ",e.jsx(n.a,{href:"https://github.com/godotengine/godot-demo-projects",children:"Official examples"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/bitwes/Gut",children:"GUT · Godot Unit Test"})})}),`
`,e.jsx(n.p,{children:"Provides a CLI and JUnit XML output for automated regression checks on generated game state, damage, inventory, and other logic. GUT and Godot versions have explicit compatibility requirements; passing logic tests still leaves visuals, controls, and scene integration to check."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"Unit testing"})," · ",e.jsx(n.code,{children:"GDScript"})," · ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"JUnit"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://gut.readthedocs.io/",children:"Author documentation"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.unity3d.com/Manual/index.html",children:"Unity · Manual"})})}),`
`,e.jsx(n.p,{children:"Provides agents with concrete C# and editor project constraints, plus 2D and 3D workflows and versioned package references. Pin the Editor, render pipeline, and Package Manager versions together; the Unity name alone does not establish API or material compatibility."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"C#"})," · ",e.jsx(n.code,{children:"Official documentation"})," · ",e.jsx(n.code,{children:"Editor"})," · ",e.jsx(n.code,{children:"Package Manager"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/Unity-Technologies/2d-techdemos",children:"Official example source"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html",children:"Unity Test Framework"})})}),`
`,e.jsx(n.p,{children:"Enables ongoing regression checks for generated scripts and scene behavior, using UnityTest across frames to check lifecycles, coroutines, and state changes. Edit mode and Play mode have different execution loops; tests should wait for real frames or conditions rather than only confirming script creation. The separately checked Test Framework 1.4.6 API returns a job GUID and documents multi-frame cancellation cleanup. Active tests become Canceled and remaining tests NotRun; do not equate cancellation with passing or assume compatibility with every Editor package version."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"Testing"})," · ",e.jsx(n.code,{children:"Edit mode"})," · ",e.jsx(n.code,{children:"Play mode"})," · ",e.jsx(n.code,{children:"CLI"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://docs.unity3d.com/Packages/com.unity.test-framework@latest/",children:"Package and API documentation"})," · ",e.jsx(n.a,{href:"https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html",children:"Versioned test-job and cancellation API"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine",children:"Unreal Engine · Documentation"})})}),`
`,e.jsx(n.p,{children:"Provides authoritative context for UE projects and asset systems, with official samples illustrating complex gameplay architecture. GitHub source access requires linked Epic and GitHub accounts and the relevant authorization steps; Epic also documents a Perforce route for licensees. Source availability does not imply an open-source license."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"C++"})," · ",e.jsx(n.code,{children:"Blueprint"})," · ",e.jsx(n.code,{children:"Official documentation"})," · ",e.jsx(n.code,{children:"Authorized source access"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine/downloading-source-code-in-unreal-engine",children:"Source access instructions"})," · ",e.jsx(n.a,{href:"https://github.com/EpicGames/UnrealEngine",children:"Engine source (authorization required)"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine",children:"Unreal · Automation Test Framework"})})}),`
`,e.jsx(n.p,{children:"Can bring Blueprint compilation, level loading, simulated input, and visual regression checks into an agent feedback loop, alongside interfaces such as Functional Testing. Tests require the appropriate plugins and state cleanup; the framework runs within the engine. ResumeRunTest reads an existing JSON report, resumes NotRun tests, and marks interrupted in-progress tests as failures. Preserve the report and distinguish compatible editor and client test contexts."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"Automated testing"})," · ",e.jsx(n.code,{children:"Blueprint"})," · ",e.jsx(n.code,{children:"Visual regression"})," · ",e.jsx(n.code,{children:"Content validation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/en-us/unreal-engine/run-automation-tests-in-unreal-engine",children:"Command-line reports and interrupted-run resumption"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/mrdoob/three.js",children:"Three.js"})})}),`
`,e.jsx(n.p,{children:"Lets agents build browser-testable 3D prototypes directly in TypeScript or JavaScript and inspect APIs through source and examples. Game loops, physics, navigation, saves, and other systems need separate design or integration. Validate WebGL and WebGPU paths individually."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Three.js"})," · ",e.jsx(n.code,{children:"JavaScript"})," · ",e.jsx(n.code,{children:"WebGL"})," · ",e.jsx(n.code,{children:"WebGPU"})," · ",e.jsx(n.code,{children:"Rendering library"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://threejs.org/manual/",children:"Official manual"})," · ",e.jsx(n.a,{href:"https://threejs.org/examples/",children:"Official examples"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/blender/blender",children:"Blender"})})}),`
`,e.jsx(n.p,{children:"Primarily supports game asset and scene production, with agent-generated Python scripts for repeatable tasks. Blender is not a game runtime engine; verify scale, coordinates, materials, rigs, and animation after importing into Unity, UE, Godot, or a browser."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Blender"})," · ",e.jsx(n.code,{children:"DCC"})," · ",e.jsx(n.code,{children:"3D assets"})," · ",e.jsx(n.code,{children:"Animation"})," · ",e.jsx(n.code,{children:"Open source"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://projects.blender.org/blender/blender",children:"Official main repository"})," · ",e.jsx(n.a,{href:"https://docs.blender.org/manual/en/latest/",children:"Reference manual"})," · ",e.jsx(n.a,{href:"https://docs.blender.org/api/current/",children:"Python API"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/KhronosGroup/glTF-Blender-IO",children:"Khronos · glTF-Blender-IO"})})}),`
`,e.jsx(n.p,{children:"Connects Blender asset production to game runtimes and helps diagnose material, mesh, and animation conversion issues. Match the addon's release branch to the Blender version; main can target an upcoming Blender release. Repository CI validates exports and compares import / export roundtrips. A valid file can still render differently in the target engine, so verify runtime imports."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Blender"})," · ",e.jsx(n.code,{children:"glTF"})," · ",e.jsx(n.code,{children:"GLB"})," · ",e.jsx(n.code,{children:"Asset pipeline"})," · ",e.jsx(n.code,{children:"Roundtrip validation"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://github.com/KhronosGroup/glTF-Blender-IO/blob/main/Technical.md",children:"Technical notes"})," · ",e.jsx(n.a,{href:"https://github.com/OpenEnvision/GameMap/blob/main/docs/asset-validation-contracts.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity",children:"GameMap: asset validity and runtime fidelity"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game",children:"Phaser · First Game Guide"})})}),`
`,e.jsx(n.p,{children:"Useful for quickly building browser-testable 2D core loops organized around preload / create / update. In the tutorial, scaled static Arcade Physics objects need their collision bodies refreshed. A visible scene alone does not verify input, restart behavior, or lifecycle handling."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Phaser"})," · ",e.jsx(n.code,{children:"2D"})," · ",e.jsx(n.code,{children:"JavaScript"})," · ",e.jsx(n.code,{children:"Browser games"})," · ",e.jsx(n.code,{children:"Arcade Physics"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/phaserjs/phaser",children:"Framework source"})," · ",e.jsx(n.a,{href:"https://docs.phaser.io/",children:"Official documentation"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"community",children:"Community"}),`






























`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/",children:"GDQuest · First 2D Game"})}),e.jsx(n.td,{children:"A GDQuest tutorial for a Godot 2D survival game, with complete scripts, a project, and troubleshooting notes."}),e.jsx(n.td,{children:"Planning / Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://catlikecoding.com/unity/tutorials/movement/surface-contact/",children:"Catlike Coding · Surface Contact"})}),e.jsx(n.td,{children:"Jasper Flick's Unity movement tutorial explains character control through slopes, steps, and contact timing."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/community/unreal-engine",children:"Epic Developer Community · UE"})}),e.jsx(n.td,{children:"Epic's UE community hub for author tutorials, learning materials, and version-specific discussions."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928",children:"Three.js · Instanced Crowd Engineering"})," · 2026"]}),e.jsx(n.td,{children:"A game author's Three.js forum write-up on a single-draw-call crowd system, instance data, LOD, and staggered updates."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/",children:"GDQuest · First 2D Game"})})}),`
`,e.jsx(n.p,{children:"Covers movement, aiming, projectiles, enemy spawning, and failure states as a reference for a complete core loop. The tutorial was made with Godot 4.1 and updated to 4.6. Its troubleshooting explains grounded / floating modes and an enemy count limit. Code uses MIT while art assets use CC BY-NC-SA 4.0; check reuse conditions separately."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"Community experience"})," · ",e.jsx(n.code,{children:"Complete core loop"})," · ",e.jsx(n.code,{children:"Collision debugging"})," · ",e.jsx(n.code,{children:"2D"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/gdquest-demos/getting-started-with-godot-4",children:"Project source"})," · ",e.jsx(n.a,{href:"https://www.gdquest.com/library/",children:"Tutorial library"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://catlikecoding.com/unity/tutorials/movement/surface-contact/",children:"Catlike Coding · Surface Contact"})})}),`
`,e.jsx(n.p,{children:"The author uses test scenes to reproduce loss of ground contact, ghost collisions, raycasts, and ground snapping, giving agents causal explanations of physics behavior. The tutorial uses Unity 2019.2.14f1 and ProBuilder; adapt its algorithms, APIs, input, and project configuration to the target version."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"Community experience"})," · ",e.jsx(n.code,{children:"Physics"})," · ",e.jsx(n.code,{children:"Character control"})," · ",e.jsx(n.code,{children:"Debugging"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://catlikecoding.com/unity/tutorials/movement/",children:"Complete movement series"})," · ",e.jsx(n.a,{href:"https://catlikecoding.com/unity/tutorials/",children:"Shader and project tutorials"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/community/unreal-engine",children:"Epic Developer Community · UE"})})}),`
`,e.jsx(n.p,{children:"Useful for practical material, animation, Blueprint, and performance troubleshooting beyond official references. Check each contribution's author, date, engine version, and reproducible project; access to the hub does not establish that every post has been verified."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"Community"})," · ",e.jsx(n.code,{children:"Tutorials"})," · ",e.jsx(n.code,{children:"Practical experience"})," · ",e.jsx(n.code,{children:"Per-source verification"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928",children:"Three.js · Instanced Crowd Engineering"})})}),`
`,e.jsx(n.p,{children:"Offers explainable performance techniques, with the author's playable demo showing technical and visual tradeoffs. Frame rates are self-reported on the author's hardware, not a benchmark across devices. Measure GPU, CPU, bandwidth, and visual quality after optimization."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Three.js"})," · ",e.jsx(n.code,{children:"Community experience"})," · ",e.jsx(n.code,{children:"Instancing"})," · ",e.jsx(n.code,{children:"LOD"})," · ",e.jsx(n.code,{children:"Performance"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://discourse.threejs.org/",children:"Community forum"})]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{id:"2d"})}),`
`,e.jsx(n.h2,{id:"ai-for-2d-game-development",children:"AI for 2D game development"}),`
`,e.jsx(n.h3,{id:"agent-1",children:"Agent"}),`















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/leigest519/OpenGame",children:"OpenGame"})," · 2026"]}),e.jsx(n.td,{children:"Generates browser game projects with reusable templates and debugging skills."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Testing"})]})})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/leigest519/OpenGame",children:"OpenGame"})})}),`
`,e.jsx(n.p,{children:"Turns natural-language requirements into web projects using Template Skill and Debug Skill for Canvas, Phaser, three.js, and other templates. The public CLI accepts OpenAI-compatible model endpoints; the paper also introduces GameCoder-27B. Browser execution and visual judging assess build health, usability, and intent alignment. The README still lists the standalone evaluation pipeline as forthcoming; model weights and full evaluation reproducibility are not established by the framework release alone."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Browser games"})," · ",e.jsx(n.code,{children:"Game Skill"})," · ",e.jsx(n.code,{children:"Browser feedback"})," · ",e.jsx(n.code,{children:"GameCoder-27B"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2604.18394",children:"Paper"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"framework-2",children:"Framework"}),`

























`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/NetX-lab/GameGen-Verifier",children:"GameGen-Verifier"})," · 2026"]}),e.jsx(n.td,{children:"Verifies generated game behavior through runtime state hooks and focused checks."}),e.jsx(n.td,{children:"Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/gdrtodd/gavel",children:"GAVEL"})," · 2024"]}),e.jsx(n.td,{children:"Combines language models and quality-diversity search to create board game rules."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/danruili/Cardiverse",children:"Cardiverse"})," · 2025"]}),e.jsx(n.td,{children:"Connects card game design, Python rule code, and playtesting in a prototype pipeline."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/NetX-lab/GameGen-Verifier",children:"GameGen-Verifier"})})}),`
`,e.jsx(n.p,{children:"Breaks game requirements into independently testable checkpoints and checks functionality through browser and runtime adapters. The repository provides GGV-Harness and verifier skills for Codex and Claude. Public code does not include all generated games, run outputs, or private configurations. State hooks also provide observability beyond a purely black-box playtest."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Functional verification"})," · ",e.jsx(n.code,{children:"Playwright"})," · ",e.jsx(n.code,{children:"Runtime state"})," · ",e.jsx(n.code,{children:"Verifier Skill"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2605.07442",children:"Paper"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/gdrtodd/gavel",children:"GAVEL"})})}),`
`,e.jsx(n.p,{children:"Uses Ludii game description code as its representation. A language model mutates and recombines rules, then simulation and search select games. Code, experiments, and related model and data references are public. The outputs are board games within a rule system; these results do not establish general 2D action game development ability."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Game design"})," · ",e.jsx(n.code,{children:"Ludii"})," · ",e.jsx(n.code,{children:"Evolutionary search"})," · ",e.jsx(n.code,{children:"Rule generation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2407.09388",children:"Paper"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/danruili/Cardiverse",children:"Cardiverse"})})}),`
`,e.jsx(n.p,{children:"Uses mechanism graphs and retrieval to generate variants and code from card game descriptions, then iteratively checks rule consistency using generated match records. The repository also includes a gameplay AI arena, but its development contribution centers on rule and code prototypes. Public substitute rule descriptions differ from the original paper inputs, which affects reproducibility."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Card games"})," · ",e.jsx(n.code,{children:"Mechanism graphs"})," · ",e.jsx(n.code,{children:"Code generation"})," · ",e.jsx(n.code,{children:"Self-play validation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2502.07128",children:"Paper"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"skill-1",children:"Skill"}),`















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/0x0funky/agent-sprite-forge",children:"Agent Sprite Forge"})}),e.jsx(n.td,{children:"Combines reference art, generated animation, and deterministic processing into exportable sprites."}),e.jsx(n.td,{children:"Assets / Testing"})]})})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/0x0funky/agent-sprite-forge",children:"Agent Sprite Forge"})})}),`
`,e.jsx(n.p,{children:"Generates motion clips from an approved reference image, then performs background removal, alignment, loop selection, timing correction, and atlas packaging. It offers Godot, Aseprite, and web exports. For 0.4.0, the README reports parse-level round trips but no Godot, LDtk, or Aseprite editor-import verification. Import and visual acceptance checks remain necessary."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Agent Skill"})," · ",e.jsx(n.code,{children:"Sprite pipeline"})," · ",e.jsx(n.code,{children:"Animation"})," · ",e.jsx(n.code,{children:"Asset QA"}),". Source reviewed: 2026-10-18."]}),`
`]}),`
`,e.jsx(n.h3,{id:"benchmark",children:"Benchmark"}),`




















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/waynchi/gamedevbench",children:"GameDevBench"})," · 2026"]}),e.jsx(n.td,{children:"Evaluates coding agents on development tasks in existing Godot projects."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2608.21833",children:"GameXpert-Bench"})," · 2026"]}),e.jsx(n.td,{children:"Benchmarks game creation, bug fixing, and iterative improvement in three tracks."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/waynchi/gamedevbench",children:"GameDevBench"})})}),`
`,e.jsx(n.p,{children:"The repository contains 333 tasks across 2D, 3D, UI, and gameplay logic. Agents receive an existing project and a task, then produce changes that can be checked in the engine. Comparable official runs require Godot 4.4.1 and provide image or video feedback. This measures bounded development tasks, not the quality of commercial games created from scratch."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Development benchmark"})," · ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"Multimodal"})," · ",e.jsx(n.code,{children:"Visual feedback"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2602.11103",children:"Paper"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2608.21833",children:"GameXpert-Bench"})})}),`
`,e.jsx(n.p,{children:"The paper introduces GameGen, GameFix, and GameOpt using complete development trajectories to study the lifecycle beyond a single generation. At review, the official repository still said data and evaluation code were being prepared for release. Treat it as a paper and protocol reference, not a ready-to-run benchmark."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Development benchmark"})," · ",e.jsx(n.code,{children:"Bug fixing"})," · ",e.jsx(n.code,{children:"Iterative improvement"})," · ",e.jsx(n.code,{children:"Full release pending"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/Kwen-Chen/GameXpert-Bench",children:"Repository and release status"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"paper",children:"Paper"}),`




















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2310.08067",children:"GameGPT"})," · 2023"]}),e.jsx(n.td,{children:"Studies automated game development through multi-agent planning and code generation."}),e.jsx(n.td,{children:"Planning / Coding / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/shyamsn97/mario-gpt",children:"MarioGPT"})," · 2023"]}),e.jsx(n.td,{children:"Generates playable Mario-style level layouts from text with a GPT model."}),e.jsx(n.td,{children:"Planning / Scenes / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2310.08067",children:"GameGPT"})})}),`
`,e.jsx(n.p,{children:"Planning, review, and implementation agents break down game requirements and generate code, with a focus on hallucination and redundancy. This is an early research framework for game development agents. The linked repository contains only the paper and README; it is not a verified, ready-to-deploy product."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Multi-agent"})," · ",e.jsx(n.code,{children:"Task planning"})," · ",e.jsx(n.code,{children:"Research prototype"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/leyiwo/GameGPT",children:"Paper and README repository"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/shyamsn97/mario-gpt",children:"MarioGPT"})})}),`
`,e.jsx(n.p,{children:"Descriptions of enemies, pipes, and elevation become character-grid levels and previews, with an interactive simulator or A* checks available. It generates level content within existing rules and supports research on controllable procedural content generation. Its scope does not include game engines, character art, or complete gameplay code."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"PCG"})," · ",e.jsx(n.code,{children:"Level generation"})," · ",e.jsx(n.code,{children:"Text-to-level"})," · ",e.jsx(n.code,{children:"GPT-2"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2302.05981",children:"Paper"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"tool-2",children:"Tool"}),`






























`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/0x0funky/agent-game-forge",children:"Agent Game Forge"})}),e.jsx(n.td,{children:"A local 2D game IDE with a scene editor for Codex and Claude Code."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/boltomli/t2g",children:"Text2Game"})}),e.jsx(n.td,{children:"Turns long-form text into world, character, and event data for narrative prototypes."}),e.jsx(n.td,{children:"Planning / Coding / Scenes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.pixellab.ai/mcp",children:"PixelLab AI Agent Toolkit"})}),e.jsx(n.td,{children:"Generates pixel characters, animation, and seamless tilesets through API and MCP tools."}),e.jsx(n.td,{children:"Assets / Scenes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://developers.openai.com/api/docs/guides/image-generation",children:"OpenAI Image Generation"})}),e.jsx(n.td,{children:"Generate and edit raster art using image endpoints or a conversational image-generation tool."}),e.jsx(n.td,{children:"Assets"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/0x0funky/agent-game-forge",children:"Agent Game Forge"})})}),`
`,e.jsx(n.p,{children:"Agents, asset workflows, and JSON scene data turn natural-language requests into JS + Canvas games. Users can adjust layout and collision in a visual editor. The README lists web output as the current default, with full Godot and Unity support still on the roadmap. The project describes itself as pre-launch."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"2D IDE"})," · ",e.jsx(n.code,{children:"Canvas"})," · ",e.jsx(n.code,{children:"Scene editing"})," · ",e.jsx(n.code,{children:"Prototyping"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/boltomli/t2g",children:"Text2Game"})})}),`
`,e.jsx(n.p,{children:"Analyzes text in chunks, merges the results, and generates Twine/Chapbook HTML or Godot visual novel projects. The repository provides a Python pipeline and examples for research on turning narratives into playable prototypes. It offers no general guarantee of generating arbitrary action games."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Interactive narrative"})," · ",e.jsx(n.code,{children:"Twine"})," · ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"Visual novels"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.pixellab.ai/mcp",children:"PixelLab AI Agent Toolkit"})})}),`
`,e.jsx(n.p,{children:"Accepts character descriptions, directions, actions, and terrain conditions to produce pixel assets, including four- or eight-direction characters and side-view or top-down tilesets. This is a commercial asset service. MCP connects its asset tools to coding agents; game rules, collision, and asset import still require a project workflow."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Pixel art"})," · ",e.jsx(n.code,{children:"Sprite"})," · ",e.jsx(n.code,{children:"Tileset"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Commercial service"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://www.pixellab.ai/docs",children:"Documentation"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://developers.openai.com/api/docs/guides/image-generation",children:"OpenAI Image Generation"})})}),`
`,e.jsx(n.p,{children:"Generate or edit raster images through the Images API or multi-turn Responses workflows. Save output bytes and request settings; masks guide edits rather than guaranteeing exact boundaries. Sprite consistency and seamless textures need separate checks. The technical guide does not establish output rights or retry billing."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"asset-generation"}),". Source reviewed: 2026-10-18."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{id:"3d"})}),`
`,e.jsx(n.h2,{id:"ai-for-3d-game-development",children:"AI for 3D game development"}),`
`,e.jsx(n.h3,{id:"framework-3",children:"Framework"}),`



































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/OpenDCAI/GameFactory-3A",children:"3AGameFactory"})," · 2026"]}),e.jsx(n.td,{children:"Coordinates game assets, gameplay, and UI through skills, model pipelines, and engine adapters."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/princeton-vl/infinigen",children:"Infinigen"})," · 2023"]}),e.jsx(n.td,{children:"Procedurally generates natural and indoor Blender scenes and synthetic data."}),e.jsx(n.td,{children:"Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/allenai/Holodeck",children:"Holodeck"})," · 2023"]}),e.jsx(n.td,{children:"Lays out and furnishes interactive 3D indoor environments from text."}),e.jsx(n.td,{children:"Planning / Scenes"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/Pluto156/AutoUE",children:"AutoUE"})," · 2026"]}),e.jsx(n.td,{children:"Coordinates agents to build Unreal scenes, gameplay code, interactions, and playtests."}),e.jsx(n.td,{children:"Planning / Coding / Assets / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/yxwan123/UniGen",children:"UniGen"})," · 2025"]}),e.jsx(n.td,{children:"Plans Unity prototypes, generates scripts, assembles scenes, and supports iterative debugging."}),e.jsx(n.td,{children:"Planning / Coding / Scenes / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/OpenDCAI/GameFactory-3A",children:"3AGameFactory"})})}),`
`,e.jsx(n.p,{children:"A coding agent routes requirements through image, 3D, motion, audio, and other pipelines to produce assets and engine-native code, with context for UE5, Unity, Godot, Blender, and three.js. Demos mix generated and existing resources. The 3A name is not a verified commercial quality rating. This is a separate project from Kling's GameFactory video world model."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Agent Skills"})," · ",e.jsx(n.code,{children:"Asset pipelines"})," · ",e.jsx(n.code,{children:"Multiple engines"})," · ",e.jsx(n.code,{children:"Game generation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/OpenDCAI/GameFactory-3A/blob/main/README_zh.md",children:"Chinese documentation"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/princeton-vl/infinigen",children:"Infinigen"})})}),`
`,e.jsx(n.p,{children:"Random seeds, parameters, and asset generators produce geometry, materials, scenes, and annotations, with export documentation for OBJ, OpenUSD, and other formats. This is a procedural system rather than a language model. It can provide controllable scenes and data for AI development workflows; real-time games still need optimization, collision, and gameplay integration."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Procedural generation"})," · ",e.jsx(n.code,{children:"Blender"})," · ",e.jsx(n.code,{children:"Synthetic data"})," · ",e.jsx(n.code,{children:"Scenes"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://infinigen.org/",children:"Project and paper"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/allenai/Holodeck",children:"Holodeck"})})}),`
`,e.jsx(n.p,{children:"Combines language planning, asset retrieval, and spatial constraints to turn room requirements into AI2-THOR scenes, with instructions for loading them in Unity. Evaluation primarily targets embodied AI environment generation. It offers ideas for scene layout and semantic interaction, but does not establish complete game level design or commercial release readiness."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Text-to-scene"})," · ",e.jsx(n.code,{children:"AI2-THOR"})," · ",e.jsx(n.code,{children:"Spatial constraints"})," · ",e.jsx(n.code,{children:"Embodied environments"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2312.09067",children:"Paper"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Pluto156/AutoUE",children:"AutoUE"})})}),`
`,e.jsx(n.p,{children:"A research pipeline for turning a game description into Unreal Engine scenes and C++ gameplay. Its public implementation includes setup instructions, a demonstration video, and a linked dataset of generated games and assets. Reproduction requires Unreal integrations and external model services. The video demonstrates outputs; it is not a hosted playable game. Static inspection of the pinned evaluation dispatcher shows movement commands skipped and interaction handlers called directly; completion of that script path alone does not establish player navigation success."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"Game generation"})," · ",e.jsx(n.code,{children:"Multi-agent"})," · ",e.jsx(n.code,{children:"Research prototype"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2603.07106",children:"Paper"})," · ",e.jsx(n.a,{href:"https://huggingface.co/datasets/Pluto156/AutoUE_DataSet",children:"Generated games and asset dataset"})," · ",e.jsx(n.a,{href:"https://github.com/Pluto156/AutoUE/blob/8686a4d51c19813f2b3368bd73f685a940db7531/PCGGen_UE/Plugins/LLMEditor/Source/LLMEditor/Private/Core/EvaluateExecutor/EvaluateExecutor.cpp#L174-L186",children:"Pinned evaluation dispatcher"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://github.com/Pluto156/AutoUE#setup-and-usage",children:"Setup and usage"}),". Author instructions for dependencies, service credentials, and running the Unreal generation pipeline."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · video:"})," ",e.jsx(n.a,{href:"https://github.com/Pluto156/AutoUE/blob/main/assets/show.mp4",children:"Game-generation video"}),". Recorded demonstrations of generated Unreal games; no public browser-playable build verified."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · pipeline-source:"})," ",e.jsx(n.a,{href:"https://github.com/Pluto156/AutoUE",children:"Pipeline source"}),". Public framework implementation; engine setup, model services, and dataset assets remain separate requirements."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/yxwan123/UniGen",children:"UniGen"})})}),`
`,e.jsx(n.p,{children:"A multi-agent research workflow for Unity game creation from natural-language descriptions. The repository publishes its Python pipeline and model connector, with installation guidance and a recorded demonstration. Unity and a model-service account are required. Public pipeline code is available, but a hosted playable build and complete downloadable versions of the benchmark games were not verified."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"Game generation"})," · ",e.jsx(n.code,{children:"Scene assembly"})," · ",e.jsx(n.code,{children:"Research prototype"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2509.26161",children:"Paper"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://github.com/yxwan123/UniGen#-installation",children:"Installation and usage"}),". README covers prerequisites and the local Unity generation workflow; review paths and project setup before running."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · video:"})," ",e.jsx(n.a,{href:"https://www.youtube.com/watch?v=xyJjFfnxUx0",children:"Unity generation video"}),". Author-linked demonstration video, not a browser-playable game."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · pipeline-source:"})," ",e.jsx(n.a,{href:"https://github.com/yxwan123/UniGen",children:"Pipeline source"}),". Published generator implementation and prompts; this is not a complete release of every benchmark game."]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"skill-2",children:"Skill"}),`




















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin",children:"Unity Agent Plugin"})}),e.jsx(n.td,{children:"Unity-maintained project skills give general coding agents engine-specific context."}),e.jsx(n.td,{children:"Planning / Coding / Scenes / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/LuigiDeFacci/godot-create-3d-assets",children:"Godot MCP 3D Asset Builder"})}),e.jsx(n.td,{children:"Builds reusable stylized 3D assets with Godot geometry and validation workflows."}),e.jsx(n.td,{children:"Assets / Scenes / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin",children:"Unity Agent Plugin"})})}),`
`,e.jsx(n.p,{children:"Provides Claude Code, Codex, and Grok with skills for 2D, UI, rendering, navigation, physics, multiplayer, and other tasks, connected to Unity CLI and MCP controls. Unity requires version 6.0 or later. The current CLI MCP mode replaces MCP in the older assistant package; follow the documentation for the version in use."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Official"})," · ",e.jsx(n.code,{children:"Agent Skills"})," · ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"CLI"})," · ",e.jsx(n.code,{children:"MCP"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills",children:"Skill source"})," · ",e.jsx(n.a,{href:"https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli",children:"CLI / MCP migration"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/LuigiDeFacci/godot-create-3d-assets",children:"Godot MCP 3D Asset Builder"})})}),`
`,e.jsx(n.p,{children:"Takes project style and asset requirements, then uses Godot MCP and deterministic builders to produce PackedScene assets and check grounding, collision, navigation, and screenshots. Designed for Codex and Claude Code, it can reuse existing project resources. It requires compatible MCP capabilities and is not an image-to-mesh generative model."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Godot"})," · ",e.jsx(n.code,{children:"Agent Skill"})," · ",e.jsx(n.code,{children:"PackedScene"})," · ",e.jsx(n.code,{children:"Asset QA"}),". Source reviewed: 2026-10-18."]}),`
`]}),`
`,e.jsx(n.h3,{id:"benchmark-1",children:"Benchmark"}),`















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2607.03525",children:"GameEngineBench"})," · 2026"]}),e.jsx(n.td,{children:"Tests agent-written C++ runtime changes in real Unreal Engine projects."}),e.jsx(n.td,{children:"Coding / Testing"})]})})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2607.03525",children:"GameEngineBench"})})}),`
`,e.jsx(n.p,{children:"Paper v2 describes 110 scoped C++ tasks from nine Unreal projects. Agents receive a buildable start, allowed files, and behavioral requirements. After compilation and Play-in-Editor listen-server tests, an LLM judge reviews the specification, test evidence, edits, and reference solution to determine success. The paper-linked repository could not be retrieved during review, so runnable-code availability remains unverified. The scope is local C++ implementation, not complete 3D game generation."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Development benchmark"})," · ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"C++"})," · ",e.jsx(n.code,{children:"Behavior tests"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/Nitrode-Research/GameEngineBench",children:"Paper-linked repository (availability unverified)"})," · ",e.jsx(n.a,{href:"https://arxiv.org/html/2607.03525v2",children:"Versioned evaluation protocol"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"paper-1",children:"Paper"}),`




















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/video2game/video2game",children:"Video2Game"})," · 2024"]}),e.jsx(n.td,{children:"Reconstructs real-world video into interactive 3D environments for the browser."}),e.jsx(n.td,{children:"Assets / Scenes / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/FreedomIntelligence/BlenderLLM",children:"BlenderLLM / BlendNet / CADBench"})," · 2024"]}),e.jsx(n.td,{children:"Studies text-to-Blender scripting with a training dataset and modeling benchmark."}),e.jsx(n.td,{children:"Assets / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/video2game/video2game",children:"Video2Game"})})}),`
`,e.jsx(n.p,{children:"Video and camera information pass through reconstruction, mesh extraction, appearance baking, and collision generation into a three.js game environment. The documented UE route recommends fully diffuse baked meshes, with the baking specular dimension set to zero. This is an explicit environment reconstruction approach with remaining manual scene setup and physics integration. It should be distinguished from interactive video world models that predict the next frame."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Video-to-3D"})," · ",e.jsx(n.code,{children:"Reconstruction"})," · ",e.jsx(n.code,{children:"Three.js"})," · ",e.jsx(n.code,{children:"Collision"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2404.09833",children:"Paper"})," · ",e.jsx(n.a,{href:"https://github.com/video2game/video2game/blob/7bcf8ae754240b9fd2de75a154eb73c75a146b79/readme.md#L256-L273",children:"Pinned engine-handoff recommendations"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/FreedomIntelligence/BlenderLLM",children:"BlenderLLM / BlendNet / CADBench"})})}),`
`,e.jsx(n.p,{children:"BlenderLLM generates bpy modeling scripts from user instructions. The repository and released dataset documentation report about 12K BlendNet pairs, and CADBench includes synthetic and forum-sourced tasks. Evaluation focuses on basic CAD-style modeling and instruction following. The README identifies limitations in advanced materials, multimodal input, and multi-turn collaboration; this is not a game creation benchmark."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Text-to-bpy"})," · ",e.jsx(n.code,{children:"CADBench"})," · ",e.jsx(n.code,{children:"Dataset"})," · ",e.jsx(n.code,{children:"Modeling benchmark"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2412.14203",children:"Paper"})," · ",e.jsx(n.a,{href:"https://huggingface.co/datasets/FreedomIntelligence/BlendNet",children:"BlendNet dataset"})," · ",e.jsx(n.a,{href:"https://huggingface.co/datasets/FreedomIntelligence/CADBench",children:"CADBench"})," · ",e.jsx(n.a,{href:"https://github.com/FreedomIntelligence/BlenderLLM/blob/f778bfd6992ddd675f7615d0eaf965a8576f2879/README.md#L44-L50",children:"Pinned release dataset description"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"tool-3",children:"Tool"}),`



































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/CoderGamester/mcp-unity",children:"MCP Unity Editor"})}),e.jsx(n.td,{children:"A community MCP bridge for querying, editing, and testing Unity projects."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/Hunyuan3D-2",children:"Hunyuan3D 2.0"})," · 2025"]}),e.jsx(n.td,{children:"Turns reference images into geometry and textures for 3D asset pipelines."}),e.jsx(n.td,{children:"Assets"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/microsoft/TRELLIS",children:"TRELLIS"})," · 2024"]}),e.jsx(n.td,{children:"Generates meshes, Gaussians, and radiance fields from structured latent representations."}),e.jsx(n.td,{children:"Assets"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/VAST-AI-Research/TripoSR",children:"TripoSR"})," · 2024"]}),e.jsx(n.td,{children:"Quickly reconstructs a 3D object from one image for asset prototyping."}),e.jsx(n.td,{children:"Assets"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html",children:"Tripo Model Generation API"})}),e.jsx(n.td,{children:"Versioned text-to-model generation with separate geometry and texture seeds."}),e.jsx(n.td,{children:"Assets"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/CoderGamester/mcp-unity",children:"MCP Unity Editor"})})}),`
`,e.jsx(n.p,{children:"Exposes scenes, GameObjects, components, Prefabs, logs, Unity Test Runner, and other editor operations to MCP clients. This community tool is separate from Unity's official plugin. Its README warns that entering Play Mode with domain reload can disconnect the bridge; check the installed version, test configuration, and actual results. Editor automation alone does not establish correct gameplay."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"MCP"})," · ",e.jsx(n.code,{children:"Editor automation"})," · ",e.jsx(n.code,{children:"Community tool"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/Hunyuan3D-2",children:"Hunyuan3D 2.0"})})}),`
`,e.jsx(n.p,{children:"The 2.0 pipeline generates shape with Hunyuan3D-DiT and textures the mesh with Hunyuan3D-Paint. It supports GLB and OBJ export and a Blender addon under a dedicated Tencent Hunyuan 3D 2.0 community license. The separate 2.1 release adds a PBR texture pipeline and training code. Topology, LOD, rigging, collision, runtime performance, and each version's terms still need game-pipeline checks."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Image-to-3D"})," · ",e.jsx(n.code,{children:"Mesh"})," · ",e.jsx(n.code,{children:"Textures"})," · ",e.jsx(n.code,{children:"Blender"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2501.12202",children:"2.0 paper"})," · ",e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1",children:"2.1 repository"})," · ",e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/Hunyuan3D-2/blob/main/LICENSE",children:"2.0 license"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/microsoft/TRELLIS",children:"TRELLIS"})})}),`
`,e.jsx(n.p,{children:"Decodes image or text inputs into several 3D representations. Official examples support textured GLB export and simplification. Conventional game asset pipelines mainly use its mesh branch; Gaussian and radiance field outputs do not themselves include usable collision, animation, or gameplay logic."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Image-to-3D"})," · ",e.jsx(n.code,{children:"Text-to-3D"})," · ",e.jsx(n.code,{children:"GLB"})," · ",e.jsx(n.code,{children:"Structured Latents"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/abs/2412.01506",children:"Paper"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/VAST-AI-Research/TripoSR",children:"TripoSR"})})}),`
`,e.jsx(n.p,{children:"Uses LRM-style feed-forward reconstruction, with public code, pretrained models, and a demo. An input image becomes an exportable object mesh. It focuses on individual objects; hidden surfaces, topology, and game performance need additional work. It is not a complete scene or playable game generator."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Image-to-3D"})," · ",e.jsx(n.code,{children:"Reconstruction"})," · ",e.jsx(n.code,{children:"Mesh"})," · ",e.jsx(n.code,{children:"Prototype assets"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html",children:"Tripo Model Generation API"})})}),`
`,e.jsx(n.p,{children:"H3 text-to-model requests (v3.1-20260211 and v3.0-20250812) expose separate geometry and texture seeds plus PBR controls. Persist model_version and task ID, query with the submitting API key, and download successful output files promptly: their URLs expire after five minutes by default. Low-poly generation can fail on complex inputs. Cross-version reproducibility, output rights, cancellation endpoints and retry charges remain unverified."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"asset-generation"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://docs.tripo3d.ai/task-query/get-your-task-result.html",children:"Tripo task results"})]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{id:"production"})}),`
`,e.jsx(n.h2,{id:"game-production-art-animation-audio-testing-and-runtime-ai",children:"Game production: art, animation, audio, testing, and runtime AI"}),`
`,e.jsx(n.h3,{id:"framework-4",children:"Framework"}),`















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/Auburn/FastNoiseLite",children:"FastNoise Lite"})}),e.jsx(n.td,{children:"A portable noise library for procedural terrain and material inputs."}),e.jsx(n.td,{children:"Coding / Assets / World models"})]})})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Auburn/FastNoiseLite",children:"FastNoise Lite"})})}),`
`,e.jsx(n.p,{children:"Provides 2D/3D sampling, fractals and domain warping across multiple languages under MIT. These are generation primitives: meshing, erosion, persistent world state and meaningful level design require additional systems."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Procedural generation"})," · ",e.jsx(n.code,{children:"Noise"})," · ",e.jsx(n.code,{children:"Terrain"}),". Source reviewed: 2026-10-18."]}),`
`]}),`
`,e.jsx(n.h3,{id:"skill-3",children:"Skill"}),`















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design",children:"Level Design Book · unofficial design skill"})," · 2026"]}),e.jsx(n.td,{children:"An unofficial, agent-neutral adaptation of The Level Design Book for level briefs, blockouts, encounters, wayfinding, and evidence-based playtest reviews."}),e.jsx(n.td,{children:"Planning / Scenes / Testing / Shipping"})]})})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design",children:"Level Design Book · unofficial design skill"})})}),`
`,e.jsx(n.p,{children:"The English skill package reorganizes The Level Design Book into task routing, thirteen topical/source references, and three reusable templates. It is primarily for 3D levels; 2D adaptations must state changed assumptions. The package reports a 2026-10-16 source snapshot and maps 94 indexed source pages, including unfinished sections; GameMap has not independently reproduced that reading exercise, run the workflows, or validated design outcomes. Original writing is attributed to Robert Yang and contributors including Andrew Yoder. This is not an official book edition or a pi-maintainer publication. The adaptation is CC BY-NC-SA 4.0: retain attribution and change notices, observe noncommercial/share-alike conditions, and review separate third-party exceptions. Those terms do not automatically license every game output."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"level-design"})," · ",e.jsx(n.code,{children:"skill"})," · ",e.jsx(n.code,{children:"blockout"})," · ",e.jsx(n.code,{children:"playtesting"})," · ",e.jsx(n.code,{children:"agent-neutral"})," · ",e.jsx(n.code,{children:"CC-BY-NC-SA-4.0"})," · ",e.jsx(n.code,{children:"noncommercial"})," · ",e.jsx(n.code,{children:"unofficial-adaptation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/",children:"The Level Design Book"})," · ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/about",children:"Original authors and contributors"})," · ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/license",children:"Book licensing and third-party exceptions"})," · ",e.jsx(n.a,{href:"https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode",children:"CC BY-NC-SA 4.0 legal code"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/",children:"Read the original book"}),". The underlying book remains authoritative. The skill reorganizes guidance and templates rather than claiming universal design laws or independently measured outcomes."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · unavailable:"})," Instructions and templates, not a runnable demo. No engine plugin, executable level, benchmark result, or validated playtest is supplied."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · full-source:"})," ",e.jsx(n.a,{href:"https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design",children:"Complete skill package and license"}),". Text-only package with SKILL.md, LICENSE.md, references, and templates. CC BY-NC-SA 4.0 applies to this adaptation directory, not the whole repository; commercial distribution requires appropriate permission."]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"documentation-2",children:"Documentation"}),`

























`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US",children:"Unreal Engine · Gauntlet"})}),e.jsx(n.td,{children:"Orchestrates game test sessions with multiple processes, roles, devices, and collected logs."}),e.jsx(n.td,{children:"Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview",children:"Windows · UI Automation and Input Semantics"})}),e.jsx(n.td,{children:"Exposes provider-supported accessibility control patterns for inspecting and manipulating desktop editor controls."}),e.jsx(n.td,{children:"Coding / Scenes / Testing"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://learn.microsoft.com/en-us/xbox/accessibility/guidelines",children:"Xbox Accessibility Guidelines"})}),e.jsx(n.td,{children:"Game-specific accessibility guidance for designers, developers and test teams."}),e.jsx(n.td,{children:"Planning / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US",children:"Unreal Engine · Gauntlet"})})}),`
`,e.jsx(n.p,{children:"Gauntlet consumes prepared cooked builds and launches configured game roles through AutomationTool. Game-specific test nodes define assertions and terminal outcomes; launching a client and server alone does not establish scenario success. Build production, device availability, process cleanup, and parallel-session port allocation remain separate responsibilities."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unreal Engine"})," · ",e.jsx(n.code,{children:"AutomationTool"})," · ",e.jsx(n.code,{children:"Multi-process testing"})," · ",e.jsx(n.code,{children:"Cooked builds"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview",children:"Windows · UI Automation and Input Semantics"})})}),`
`,e.jsx(n.p,{children:"Provider support must be probed per control; no specific game editor is assumed accessible. UIA coordinates are physical pixels, while absolute mouse input uses normalized desktop coordinates. Bounding rectangles may contain occluded points, foreground activation can be refused, and input insertion does not prove application completion. Integrity restrictions must be respected."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Windows"})," · ",e.jsx(n.code,{children:"Accessibility"})," · ",e.jsx(n.code,{children:"Native GUI"})," · ",e.jsx(n.code,{children:"CUA"})," · ",e.jsx(n.code,{children:"DPI"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-automation-element-propids",children:"Properties and occlusion"})," · ",e.jsx(n.a,{href:"https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput",children:"Input and integrity limits"})," · ",e.jsx(n.a,{href:"https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-screenscaling",children:"DPI coordinates"})," · ",e.jsx(n.a,{href:"https://learn.microsoft.com/en-us/windows/apps/develop/media-authoring-processing/screen-capture",children:"Window/display capture and frame lifetime"})," · ",e.jsx(n.a,{href:"https://github.com/OpenEnvision/GameMap/blob/main/docs/engine-operation-contracts.md#native-gui-automation-is-a-separate-evidence-surface",children:"GameMap: native UI evidence boundaries"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://learn.microsoft.com/en-us/xbox/accessibility/guidelines",children:"Xbox Accessibility Guidelines"})})}),`
`,e.jsx(n.p,{children:"The guidelines cover accessible game experiences and provide criteria for review. They are best-practice guidance, not a legal compliance checklist or certification. Automated scans alone cannot replace manual assessment and testing with disabled players."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Accessibility"})," · ",e.jsx(n.code,{children:"QA"})," · ",e.jsx(n.code,{children:"Guidelines"}),". Source reviewed: 2026-10-18."]}),`
`]}),`
`,e.jsx(n.h3,{id:"tool-4",children:"Tool"}),`











































































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.scenario.com/",children:"Scenario"})}),e.jsx(n.td,{children:"Builds consistent game art pipelines with custom style models and batch generation."}),e.jsx(n.td,{children:"Assets / Scenes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://docs.meshy.ai/en",children:"Meshy API"})}),e.jsx(n.td,{children:"Connects AI model generation, humanoid rigging, and animation export for game asset workflows."}),e.jsx(n.td,{children:"Assets / Scenes"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/HY-Motion-1.0",children:"HY-Motion 1.0"})," · 2025"]}),e.jsx(n.td,{children:"Generates skeletal humanoid motion from text with public inference code and model weights."}),e.jsx(n.td,{children:"Assets"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://elevenlabs.io/docs/overview/capabilities/sound-effects",children:"ElevenLabs Sound Effects"})}),e.jsx(n.td,{children:"Generates game sound effects, Foley, and looping ambience from text through a web app or API."}),e.jsx(n.td,{children:"Assets"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://huggingface.co/stabilityai/stable-audio-open-1.0",children:"Stable Audio Open 1.0"})," · 2024"]}),e.jsx(n.td,{children:"Provides downloadable text-to-audio weights and local tools for sound effects and field recordings."}),e.jsx(n.td,{children:"Assets"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/Regression-Games/RGUnityBots",children:"Regression Games"})}),e.jsx(n.td,{children:"Provides a public Unity SDK for gameplay recording, input replay, and regression-test reference workflows."}),e.jsx(n.td,{children:"Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://modl.ai/",children:"modl.ai"})}),e.jsx(n.td,{children:"Uses visual agents and natural-language tasks to test uploaded game builds."}),e.jsx(n.td,{children:"Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://convai.com/",children:"Convai"})}),e.jsx(n.td,{children:"Adds conversational NPCs with speech, memory, emotion, and in-scene actions."}),e.jsx(n.td,{children:"Coding / Scenes / Runtime AI"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://elevenlabs.io/docs/overview/capabilities/music",children:"ElevenLabs Music"})}),e.jsx(n.td,{children:"Prompted music generation with composition plans, references and section editing."}),e.jsx(n.td,{children:"Assets"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://elevenlabs.io/docs/api-reference/text-to-speech/convert",children:"ElevenLabs Speech Generation"})}),e.jsx(n.td,{children:"Voice-conditioned speech synthesis with pronunciation dictionaries and neighboring-request continuity controls."}),e.jsx(n.td,{children:"Assets"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/Chlumsky/msdf-atlas-gen",children:"MSDF Atlas Generator"})}),e.jsx(n.td,{children:"A command-line and library tool for generating distance-field font atlases."}),e.jsx(n.td,{children:"Assets / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/microsoft/DirectXShaderCompiler",children:"DirectX Shader Compiler"})}),e.jsx(n.td,{children:"HLSL compilation through the dxc command line and compiler APIs."}),e.jsx(n.td,{children:"Coding / Testing / Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://playwright.dev/docs/test-snapshots",children:"Playwright Test"})}),e.jsx(n.td,{children:"Browser testing with DOM actions, assertions and screenshot comparisons."}),e.jsx(n.td,{children:"Coding / Testing"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.scenario.com/",children:"Scenario"})})}),`
`,e.jsx(n.p,{children:"Scenario provides hosted image, video, 3D and audio workflows, custom-model training, a REST API and an official beta MCP interface. Inspect each model schema before submission; MCP model_run can return an unfinished job rather than output assets. The documented job_cancel cannot cancel jobs created by model_run or workflow_run. Integration examples do not include the full hosted service or a complete game project."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Art direction"})," · ",e.jsx(n.code,{children:"Style consistency"})," · ",e.jsx(n.code,{children:"Character consistency"})," · ",e.jsx(n.code,{children:"Batch assets"})," · ",e.jsx(n.code,{children:"Commercial service"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://docs.scenario.com/",children:"API documentation"})," · ",e.jsx(n.a,{href:"https://mcp.scenario.com/docs/tools/model-run",children:"Official beta MCP operations"})," · ",e.jsx(n.a,{href:"https://mcp.scenario.com/docs/tools/job-cancel",children:"Job cancellation scope"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://docs.scenario.com/get-started/documentation/integrating-with-applications-real-world-scenarios#1-game-asset-pipeline--batch-generation-with-style-consistency",children:"Consistent game asset pipeline"}),". Official walkthrough for custom style training, batch generation, and asset delivery."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · interactive:"})," ",e.jsx(n.a,{href:"https://app.scenario.com/",children:"Asset generation app"}),". Hosted creative tool requiring an account; this is an asset workspace, not a playable game."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · sdk:"})," ",e.jsx(n.a,{href:"https://github.com/scenario-labs/Scenario-Unity",children:"Unity integration source"}),". Public Unity integration plugin; hosted model source and a complete game project are not included."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://docs.meshy.ai/en",children:"Meshy API"})})}),`
`,e.jsx(n.p,{children:"The official animated-character recipe turns a reference image into a textured, rigged character with idle, jump, and attack clips in GLB and FBX. The animation step applies motions from Meshy's library. API rigging works best with standard textured bipeds with clearly separated limbs. Generated assets still need engine import, collision, controls, and performance checks; the public cookbook supplies asset examples rather than complete gameplay."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Image-to-3D"})," · ",e.jsx(n.code,{children:"Rigging"})," · ",e.jsx(n.code,{children:"Character animation"})," · ",e.jsx(n.code,{children:"GLB"})," · ",e.jsx(n.code,{children:"FBX"})," · ",e.jsx(n.code,{children:"Commercial service"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://docs.meshy.ai/en/api/rigging",children:"Rigging requirements"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://www.meshy.ai/developers/cookbook/recipes/animate-3d-character/",children:"Image to animated character"}),". Official guide with reference files, Python and TypeScript examples, and GLB/FBX outputs. API access uses credits."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · interactive:"})," ",e.jsx(n.a,{href:"https://www.meshy.ai/workspace",children:"3D asset workspace"}),". Hosted generation and animation workspace; account access is required to generate assets. This is not a playable game."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · examples:"})," ",e.jsx(n.a,{href:"https://github.com/meshy-dev/meshy-cookbook",children:"Cookbook example source"}),". Public asset-generation recipes, not Meshy's model source or a complete game project."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/HY-Motion-1.0",children:"HY-Motion 1.0"})})}),`
`,e.jsx(n.p,{children:"Tencent's text-to-motion models produce human character animation, with CLI inference, local Gradio visualization, and a hosted model demo. Use the generated motion as an animation-pipeline input and retarget it to the target character. The documented limitations include non-humanoid motion, multi-person interaction, seamless loops, and in-place animation. The release provides a motion implementation, not a controllable game character or full game project. Its custom license excludes the EU, UK and South Korea and restricts using the works or outputs to improve other AI models, except HY-Motion and its derivatives. Review the exact license and commercial threshold before adoption."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Text-to-motion"})," · ",e.jsx(n.code,{children:"Skeletal animation"})," · ",e.jsx(n.code,{children:"Humanoid"})," · ",e.jsx(n.code,{children:"Model weights"})," · ",e.jsx(n.code,{children:"Local inference"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://hunyuan.tencent.com/motion",children:"Official project"})," · ",e.jsx(n.a,{href:"https://huggingface.co/tencent/HY-Motion-1.0",children:"Model weights"})," · ",e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/License.txt",children:"HY-Motion community license"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/README.md",children:"Installation and motion workflow"}),". Official setup, CLI inference, local UI, and prompting guidance. Local execution requires the documented GPU resources."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · interactive:"})," ",e.jsx(n.a,{href:"https://huggingface.co/spaces/tencent/HY-Motion-1.0",children:"Interactive motion demo"}),". Official text-to-motion model interface; a motion preview rather than playable gameplay. Hosted availability may vary."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · model:"})," ",e.jsx(n.a,{href:"https://github.com/Tencent-Hunyuan/HY-Motion-1.0",children:"Motion implementation source"}),". Public inference and visualization implementation with separately linked weights; no complete game project."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://elevenlabs.io/docs/overview/capabilities/sound-effects",children:"ElevenLabs Sound Effects"})})}),`
`,e.jsx(n.p,{children:"Describe footsteps, impacts, UI feedback, or environmental sounds, control duration, and export audio for a game engine. The documentation describes loop-enabled generation for seamless repeat playback and a 30-second maximum per clip. Its overview lists MP3 for all effects and 48 kHz WAV for non-looping effects; API format support and plan requirements should be checked separately. Loop quality still needs validation in the target game. This is a hosted audio service. The public SDK connects to its API and does not release the generation model or a complete game project."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Sound effects"})," · ",e.jsx(n.code,{children:"Foley"})," · ",e.jsx(n.code,{children:"Ambience"})," · ",e.jsx(n.code,{children:"Audio loops"})," · ",e.jsx(n.code,{children:"API"})," · ",e.jsx(n.code,{children:"Commercial service"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://elevenlabs.io/docs/eleven-creative/playground/sound-effects",children:"Product walkthrough"})," · ",e.jsx(n.a,{href:"https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert",children:"Sound Effects API reference"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://elevenlabs.io/docs/eleven-api/guides/cookbooks/sound-effects",children:"Sound Effects quickstart"}),". Official API walkthrough with SDK examples; an account and API key are needed for generation."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · interactive:"})," ",e.jsx(n.a,{href:"https://elevenlabs.io/sound-effects",children:"Sound effects generator"}),". Official text-to-audio generator and sound examples; this is an audio tool, not a playable game."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · sdk:"})," ",e.jsx(n.a,{href:"https://github.com/elevenlabs/elevenlabs-python",children:"Official Python SDK"}),". API client source only; generation model and complete game source are not included."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://huggingface.co/stabilityai/stable-audio-open-1.0",children:"Stable Audio Open 1.0"})})}),`
`,e.jsx(n.p,{children:"Generates up to 47 seconds of stereo audio at 44.1 kHz, with examples for local inference and WAV export. The official audio-tools repository includes a local Gradio interface. The model works best with English descriptions, is stronger at sound effects and field recordings than music, and cannot produce realistic vocals. Model access requires accepting its terms and sharing contact information with the publisher; this resource is an audio pipeline rather than a complete soundtrack or game generator."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Text-to-audio"})," · ",e.jsx(n.code,{children:"Sound effects"})," · ",e.jsx(n.code,{children:"Field recordings"})," · ",e.jsx(n.code,{children:"Model weights"})," · ",e.jsx(n.code,{children:"Local inference"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://github.com/Stability-AI/stable-audio-tools#interface",children:"Local demo setup"})," · ",e.jsx(n.a,{href:"https://arxiv.org/abs/2407.14358",children:"Research paper"})," · ",e.jsx(n.a,{href:"https://huggingface.co/stabilityai/stable-audio-open-1.0/blob/main/LICENSE.md",children:"Stable Audio Open model license"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://huggingface.co/stabilityai/stable-audio-open-1.0#usage",children:"Local inference and WAV export"}),". Official model usage examples for stable-audio-tools and Diffusers."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · local-tool:"})," ",e.jsx(n.a,{href:"https://github.com/Stability-AI/stable-audio-tools#interface",children:"Local audio demo setup"}),". Download and run the official Gradio audio interface locally; this link is setup guidance, not a hosted playable game."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · pipeline-source:"})," ",e.jsx(n.a,{href:"https://github.com/Stability-AI/stable-audio-tools",children:"Audio tools source"}),". MIT-licensed training and inference code; Stable Audio Open 1.0 weights are separately gated and governed by the model's Community License. No complete game project."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Regression-Games/RGUnityBots",children:"Regression Games"})})}),`
`,e.jsx(n.p,{children:"The public Unity SDK combines gameplay recording, state inspection, input playback, bot logic, and validation workflows. Its official first-test tutorial and Boss Room UI-testing project remain available in GitHub repositories. Treat this as a reference integration: the old documentation domain was unreachable during review, and current hosted-service availability and maintenance were not confirmed. SDK source is public; check compatibility and service requirements before adopting it."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Unity"})," · ",e.jsx(n.code,{children:"Automated playtesting"})," · ",e.jsx(n.code,{children:"Input replay"})," · ",e.jsx(n.code,{children:"Regression testing"})," · ",e.jsx(n.code,{children:"Reference integration"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/Regression-Games/RGUnityBots",children:"Unity SDK"})," · ",e.jsx(n.a,{href:"https://github.com/Regression-Games/UITest-BossRoom",children:"Boss Room UI-testing sample"})," · ",e.jsx(n.a,{href:"https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx",children:"First-test tutorial repository fallback"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx",children:"Your first automated test"}),". Official first-test walkthrough preserved in the documentation repository. The former live documentation domain was unreachable during review."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · examples:"})," ",e.jsx(n.a,{href:"https://github.com/Regression-Games/UITest-BossRoom",children:"Runnable Boss Room sample"}),". A complete Unity sample project with UI tests; download and open locally rather than playing in a browser."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · sdk:"})," ",e.jsx(n.a,{href:"https://github.com/Regression-Games/RGUnityBots",children:"Unity testing SDK source"}),". Public client SDK source; it does not contain the complete hosted dashboard backend."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://modl.ai/",children:"modl.ai"})})}),`
`,e.jsx(n.p,{children:"The current commercial service observes screens and sends simulated inputs without requiring an engine SDK. Teams upload a build, describe test tasks, and review captured sessions and bug reports. Its stated coverage includes Android and desktop; timing-critical gameplay remains limited. The vendor also describes game-specific model training using test-run data; SDK-free does not mean no game-specific preparation. The current product differs from older SDK-based documentation. Public self-service gameplay, complete product source, and an independent hands-on tutorial were not verified."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Automated playtesting"})," · ",e.jsx(n.code,{children:"Visual agents"})," · ",e.jsx(n.code,{children:"Commercial service"})," · ",e.jsx(n.code,{children:"Game QA"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://modl.ai/contact",children:"Request a product demonstration"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · service:"})," ",e.jsx(n.a,{href:"https://modl.ai/",children:"Workflow overview"}),". Official upload, task-definition, and reporting overview; detailed onboarding is provided through the service."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · service:"})," ",e.jsx(n.a,{href:"https://modl.ai/contact",children:"Book a product demo"}),". Commercial demonstration by arrangement; this is not a public playable game or instant sandbox."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · unavailable:"})," Full product source unavailable. No complete source release for the current hosted testing product was verified; older public samples are not its backend."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://convai.com/",children:"Convai"})})}),`
`,e.jsx(n.p,{children:"Convai connects game characters to runtime conversation and behavior services through engine integrations. Its Unity guides cover installation, sample scenes, and character setup; public Unreal SDK source is also available. Browser experiences require an account. This provides AI behavior inside an existing game, rather than generating a complete game. Public SDKs do not include the full hosted AI service."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Runtime AI"})," · ",e.jsx(n.code,{children:"NPC dialogue"})," · ",e.jsx(n.code,{children:"Character actions"})," · ",e.jsx(n.code,{children:"Unity / Unreal"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk",children:"Unity SDK documentation"})," · ",e.jsx(n.a,{href:"https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4",children:"Unreal SDK source"})," · ",e.jsx(n.a,{href:"https://convai.com/gallery",children:"Projects and experiences"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk/getting-started",children:"Build your first AI character"}),". Official Unity installation, service setup, sample-scene, and custom-character walkthrough."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · interactive:"})," ",e.jsx(n.a,{href:"https://x.convai.com/",children:"Try character experiences"}),". Account-required browser character experiences; these are conversations and role-play, not complete game-generation demos."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · sdk:"})," ",e.jsx(n.a,{href:"https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4",children:"Unreal engine SDK source"}),". Public engine integration source; the complete cloud conversation service is not included."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://elevenlabs.io/docs/overview/capabilities/music",children:"ElevenLabs Music"})})}),`
`,e.jsx(n.p,{children:"Generate music with composition plans, references and section editing. Music-specific terms distinguish Indie and Studio game uses, so paid API access alone does not clear every game release. The October 2026 use policy restricts AI-development/training datasets unless expressly permitted. Reference audio rights and plan eligibility require review."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"audio-generation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://elevenlabs.io/music-terms",children:"ElevenLabs Music terms"})," · ",e.jsx(n.a,{href:"https://elevenlabs.io/use-policy",children:"Prohibited Use Policy (October 2026)"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://elevenlabs.io/docs/api-reference/text-to-speech/convert",children:"ElevenLabs Speech Generation"})})}),`
`,e.jsx(n.p,{children:"The speech endpoint accepts versioned pronunciation dictionaries and previous/next text or request context. Zero-retention mode is enterprise-only and disables history-based continuity features; verify model compatibility. October 2026 policy restricts AI-development/training datasets and requires approval for under-18-directed products. These constraints are distinct from ordinary output-commercial rights and free-plan restrictions."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"speech-generation"})," · ",e.jsx(n.code,{children:"audio-generation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://elevenlabs.io/use-policy",children:"Prohibited Use Policy (October 2026)"})," · ",e.jsx(n.a,{href:"https://elevenlabs.io/terms-of-use",children:"Non-EEA general terms (October 2026)"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/Chlumsky/msdf-atlas-gen",children:"MSDF Atlas Generator"})})}),`
`,e.jsx(n.p,{children:"Produces glyph textures and layout metadata from fonts. The default character set is ASCII unless overridden, so multilingual coverage must be explicit. Sample atlas color channels as linear data rather than sRGB; font licensing remains independent."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Fonts"})," · ",e.jsx(n.code,{children:"MSDF"})," · ",e.jsx(n.code,{children:"UI"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/microsoft/DirectXShaderCompiler",children:"DirectX Shader Compiler"})})}),`
`,e.jsx(n.p,{children:"Compiler-call success and shader compilation success are separate: inspect the result status, diagnostics and requested outputs. Target profiles, include dependencies and build configuration matter. A compiled shader does not establish rendering correctness or target-device compatibility."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Shaders"})," · ",e.jsx(n.code,{children:"HLSL"})," · ",e.jsx(n.code,{children:"Build validation"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/microsoft/DirectXShaderCompiler/wiki/Using-dxc.exe-and-dxcompiler.dll",children:"Compiler API guide"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://playwright.dev/docs/test-snapshots",children:"Playwright Test"})})}),`
`,e.jsx(n.p,{children:"Screenshot assertions wait for two matching captures before comparison, but stable pixels do not prove application readiness. Record browser, fonts, viewport and capture options: animation disabling, masks and styles can alter evidence. DOM access is a different observation surface from screenshot-only control or Playwright MCP."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Browser testing"})," · ",e.jsx(n.code,{children:"Visual regression"})," · ",e.jsx(n.code,{children:"DOM"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://playwright.dev/docs/actionability",children:"Actionability"})," · ",e.jsx(n.a,{href:"https://playwright.dev/docs/api/class-pageassertions",children:"Screenshot assertion API"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"community-1",children:"Community"}),`



































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://partner.steamgames.com/",children:"Steam"})}),e.jsx(n.td,{children:"Discover desktop games and use Steamworks to prepare store pages, builds, testing, and release."}),e.jsx(n.td,{children:"Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://itch.io/developers",children:"itch.io"})}),e.jsx(n.td,{children:"Discover independent games and publish project pages with browser builds or downloadable releases."}),e.jsx(n.td,{children:"Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://store.epicgames.com/en-US/distribution",children:"Epic Games Store"})}),e.jsx(n.td,{children:"Browse game releases and prepare store distribution through Epic's self-service developer tools."}),e.jsx(n.td,{children:"Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.gog.com/submit-your-game",children:"GOG"})}),e.jsx(n.td,{children:"Discover DRM-free desktop releases and submit a game to GOG's curated catalog."}),e.jsx(n.td,{children:"Shipping"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://developer.crazygames.com/",children:"CrazyGames"})}),e.jsx(n.td,{children:"Play browser games and prepare web builds for CrazyGames submission, testing, and launch."}),e.jsx(n.td,{children:"Shipping"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://partner.steamgames.com/",children:"Steam"})})}),`
`,e.jsx(n.p,{children:"Valve's Steam storefront distributes released games; Steamworks is the developer portal for onboarding, store presence, build uploads, testing, and updates. Publishing requires partner setup and review of the store page and build. A Coming Soon page, a demo, and a released game are different states. Steam availability does not establish AI authorship or public game source."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Publishing"})," · ",e.jsx(n.code,{children:"Game discovery"})," · ",e.jsx(n.code,{children:"Desktop games"}),". Source reviewed: 2026-10-20. Further reading: ",e.jsx(n.a,{href:"https://store.steampowered.com/",children:"Browse games on Steam"})," · ",e.jsx(n.a,{href:"https://partner.steamgames.com/doc/gettingstarted",children:"Steamworks getting started"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://partner.steamgames.com/doc/gettingstarted",children:"Steamworks getting started"}),". Official publishing workflow covering partner setup, builds, store presence, and release review."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · service:"})," ",e.jsx(n.a,{href:"https://store.steampowered.com/",children:"Browse games on Steam"}),". Game storefront. Check each product's release status, supported systems, and acquisition requirements; this is not an embedded browser demo."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · unavailable:"})," Platform listing is not game source. Complete source must be verified separately for each game; a Steam listing does not supply it."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://itch.io/developers",children:"itch.io"})})}),`
`,e.jsx(n.p,{children:"itch.io lets creators manage game pages, screenshots, files, development logs, and updates. HTML5 builds can run in the browser; other releases can be provided as downloads with platform labels. A project's page can also contain a demo or work in development, so inspect the actual uploads and instructions. Publishing a playable build does not automatically make its source public."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Publishing"})," · ",e.jsx(n.code,{children:"Game discovery"})," · ",e.jsx(n.code,{children:"Browser games"})," · ",e.jsx(n.code,{children:"Desktop games"}),". Source reviewed: 2026-10-20. Further reading: ",e.jsx(n.a,{href:"https://itch.io/games",children:"Browse games on itch.io"})," · ",e.jsx(n.a,{href:"https://itch.io/docs/creators/getting-started",children:"Create your first itch.io page"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://itch.io/docs/creators/getting-started",children:"Create your first itch.io page"}),". Official guide to project information, uploads, classification, publishing, and updates."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · service:"})," ",e.jsx(n.a,{href:"https://itch.io/games",children:"Browse games on itch.io"}),". Independent game catalog with both browser and downloadable games. Availability and license vary by project."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · unavailable:"})," Platform listing is not game source. Creators may publish source separately, but a game page or downloadable binary alone is not complete project source."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://store.epicgames.com/en-US/distribution",children:"Epic Games Store"})})}),`
`,e.jsx(n.p,{children:"Epic Games Store offers a player storefront and publishing tools in the Epic Developer Portal for product pages, builds, offers, and updates. Distribution is engine-agnostic; using Unreal Engine is not a prerequisite. Developers still need account onboarding and must meet the store's content and product requirements. A store listing is distinct from a browser demo, an AI-development claim, or complete source code."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Publishing"})," · ",e.jsx(n.code,{children:"Game discovery"})," · ",e.jsx(n.code,{children:"Desktop games"}),". Source reviewed: 2026-10-20. Further reading: ",e.jsx(n.a,{href:"https://store.epicgames.com/en-US/",children:"Browse games on Epic Games Store"})," · ",e.jsx(n.a,{href:"https://dev.epicgames.com/docs/dev-portal",children:"Epic Developer Portal documentation"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://store.epicgames.com/en-US/distribution",children:"Epic Games Store publishing overview"}),". Official overview and FAQ for self-service distribution, developer setup, and store requirements."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · service:"})," ",e.jsx(n.a,{href:"https://store.epicgames.com/en-US/",children:"Browse games on Epic Games Store"}),". Player storefront. Check each product's release status and supported systems; the store is not a playable project."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · unavailable:"})," Platform listing is not game source. Game source and reuse rights must be checked independently of Epic Games Store availability."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.gog.com/submit-your-game",children:"GOG"})})}),`
`,e.jsx(n.p,{children:"GOG is a curated digital game store with DRM-free releases and an optional desktop client. The official submission form is the developer entry point for proposing a game; submitting it does not guarantee acceptance or immediate publication. Verify each game's supported operating systems, edition, and release status. DRM-free distribution is different from publishing the game's source code."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Publishing"})," · ",e.jsx(n.code,{children:"Game discovery"})," · ",e.jsx(n.code,{children:"Desktop games"}),". Source reviewed: 2026-10-20. Further reading: ",e.jsx(n.a,{href:"https://www.gog.com/en/games",children:"Browse games on GOG"})," · ",e.jsx(n.a,{href:"https://lp.gog.com/submit-your-game/en",children:"Submit a game to GOG"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · service:"})," ",e.jsx(n.a,{href:"https://www.gog.com/submit-your-game",children:"Submit a game to GOG"}),". Official submission page with an embedded developer form. Catalog inclusion requires a separate publishing decision."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · service:"})," ",e.jsx(n.a,{href:"https://www.gog.com/en/games",children:"Browse games on GOG"}),". Desktop game catalog. Check the individual product and system requirements rather than assuming browser play."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · unavailable:"})," Platform listing is not game source. DRM-free describes distribution restrictions, not whether complete source or reusable assets are available."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://developer.crazygames.com/",children:"CrazyGames"})})}),`
`,e.jsx(n.p,{children:"CrazyGames hosts browser games, with a separate developer portal and documentation for submission, technical requirements, SDK integration, and testing. Submissions receive QA review; Basic Launch and Full Launch have different requirements and availability. Supported web technologies span multiple engines. A playable portal build is a distribution artifact, not evidence that the complete game project is public or that AI developed it."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"Publishing"})," · ",e.jsx(n.code,{children:"Game discovery"})," · ",e.jsx(n.code,{children:"Browser games"}),". Source reviewed: 2026-10-20. Further reading: ",e.jsx(n.a,{href:"https://www.crazygames.com/",children:"Browse games on CrazyGames"})," · ",e.jsx(n.a,{href:"https://docs.crazygames.com/",children:"CrazyGames publishing documentation"})," · ",e.jsx(n.a,{href:"https://docs.crazygames.com/requirements/intro/",children:"CrazyGames submission requirements"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tutorial · tutorial:"})," ",e.jsx(n.a,{href:"https://docs.crazygames.com/",children:"CrazyGames publishing documentation"}),". Official requirements, SDK guides, testing tools, and launch workflow for web games."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Demo · service:"})," ",e.jsx(n.a,{href:"https://www.crazygames.com/",children:"Browse games on CrazyGames"}),". Browser-game portal. Individual titles have their own input, device, and network requirements."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Source · unavailable:"})," Platform listing is not game source. Browser-delivered files are not automatically the complete maintainable project; verify creator-provided source separately."]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{id:"world"})}),`
`,e.jsx(n.h2,{id:"code-world-models-and-interactive-worlds",children:"Code world models and interactive worlds"}),`
`,e.jsx(n.h3,{id:"framework-5",children:"Framework"}),`




















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/",children:"StreamRender-H3"})," · 2026"]}),e.jsx(n.td,{children:"A code engine maintains the world while streaming diffusion renders its semantic maps."}),e.jsx(n.td,{children:"Coding / Scenes / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://oasis-model.github.io/",children:"Oasis: A Universe in a Transformer"})," · 2024"]}),e.jsx(n.td,{children:"A neural game research release that predicts Minecraft-style frames from prior frames and actions."}),e.jsx(n.td,{children:"Coding / World models"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/",children:"StreamRender-H3"})})}),`
`,e.jsx(n.p,{children:"NVIDIA Sol-Engine's Interactive Coding Worlds system uses a three.js racing game. The engine handles map, physics, collision, and input, while a two-step streaming MiniMax-H3 model renders semantic video conditioned on a first frame and prompt. Reported training and tests cover that one game and third-person view. Semantic colors identify classes rather than individual objects. Diffusion-render timings use eight GB200 GPUs; the causal decoder is measured separately on one GB200. Independent stage timings do not establish end-to-end input-to-display latency. Runtime source and a weight bundle are public, with component-specific terms."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"hybrid-renderer"})," · ",e.jsx(n.code,{children:"executable-state"})," · ",e.jsx(n.code,{children:"streaming"})," · ",e.jsx(n.code,{children:"three.js"})," · ",e.jsx(n.code,{children:"MiniMax-H3"})," · ",e.jsx(n.code,{children:"NVIDIA"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://nvlabs.github.io/Sana/Sol-Engine/",children:"Sol-Engine"})," · ",e.jsx(n.a,{href:"https://nvlabs.github.io/Sana/Sol-Engine/docs/agent-workflow/",children:"Agent workflow"})," · ",e.jsx(n.a,{href:"https://github.com/NVlabs/Sana/tree/0527465fdcbbf27180a76419a4e73643aa1aac73/models/streamrender_h3",children:"Pinned runtime source"})," · ",e.jsx(n.a,{href:"https://huggingface.co/Efficient-Large-Model/StreamRender-H3",children:"Weights and component licenses"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://oasis-model.github.io/",children:"Oasis: A Universe in a Transformer"})})}),`
`,e.jsx(n.p,{children:"Oasis by Decart and Etched uses a Transformer autoencoder and latent diffusion. Its MIT-licensed inference code and 500M checkpoint are a downsized release, separate from the larger hosted demo. Hugging Face currently gates weight downloads behind agreement to share contact information. The public script generates video from an initial frame and action sequence; it does not establish a complete live game interface or training pipeline. The authors identify limits in long-term memory, precise inventory control, generalization, and object consistency."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"neural-simulator"})," · ",e.jsx(n.code,{children:"interactive-video"})," · ",e.jsx(n.code,{children:"transformer"})," · ",e.jsx(n.code,{children:"Minecraft"})," · ",e.jsx(n.code,{children:"released-code"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://github.com/etched-ai/open-oasis",children:"Inference code"})," · ",e.jsx(n.a,{href:"https://huggingface.co/Etched/oasis-500m",children:"500M weights, license and access"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"paper-2",children:"Paper"}),`


























































































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://enderfga.cn/SolarRenderer/",children:"SolarRenderer"})," · 2026"]}),e.jsx(n.td,{children:"Turns engine- or agent-generated structure videos into styled final visuals."}),e.jsx(n.td,{children:"Coding / Scenes / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2608.25927",children:"Code World Model: Coding Agent as World Brain"})," · 2026"]}),e.jsx(n.td,{children:"A coding agent writes executable rules and persistent state to drive a video world."}),e.jsx(n.td,{children:"Planning / Coding / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2609.10540",children:"Programmable World Model"})," · 2026"]}),e.jsx(n.td,{children:"Explicit global state and programmable rules preserve entities outside the camera view."}),e.jsx(n.td,{children:"Coding / Testing / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2609.26458",children:"CoDeR — Code Plans, Diffusion Renders"})," · 2026"]}),e.jsx(n.td,{children:"Collaborating agents build executable worlds, with diffusion models rendering observations."}),e.jsx(n.td,{children:"Planning / Coding / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2608.27168",children:"Magpie: Real-Time World Renderer for Interactive Games"})," · 2026"]}),e.jsx(n.td,{children:"A game engine runs gameplay while a separate Render Server generates final visuals."}),e.jsx(n.td,{children:"Coding / Scenes / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2609.02886",children:"SolarWM"})," · 2026"]}),e.jsx(n.td,{children:"An interactive video world model framework for open data, training, and long-horizon inference."}),e.jsx(n.td,{children:"Coding / Scenes / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2402.12275",children:"WorldCoder"})," · 2024"]}),e.jsx(n.td,{children:"Induces Python world models from environment interactions, then plans within them."}),e.jsx(n.td,{children:"Planning / Coding / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2405.15383",children:"GIF-MCTS / Code World Models Benchmark"})," · 2024"]}),e.jsx(n.td,{children:"Synthesizes runnable environment models through generate, improve, and fix tree search."}),e.jsx(n.td,{children:"Planning / Coding / Testing / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2510.04542",children:"Code World Models for General Game Playing"})," · 2025"]}),e.jsx(n.td,{children:"Compiles natural-language game rules into verifiable simulators for MCTS planning."}),e.jsx(n.td,{children:"Planning / Coding / Testing / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2505.10819",children:"PoE-World"})," · 2025"]}),e.jsx(n.td,{children:"Combines small programmatic experts to model stochastic world dynamics."}),e.jsx(n.td,{children:"Planning / Coding / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2409.17652",children:"FactorSim"})," · 2024"]}),e.jsx(n.td,{children:"Generates simulation and task code from language using factorized state representations."}),e.jsx(n.td,{children:"Planning / Coding / Testing / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2402.15391",children:"Genie: Generative Interactive Environments"})," · 2024"]}),e.jsx(n.td,{children:"Learns latent-action-controlled 2D worlds from videos without action labels."}),e.jsx(n.td,{children:"World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2408.14837",children:"GameNGen — Diffusion Models Are Real-Time Game Engines"})," · 2024"]}),e.jsx(n.td,{children:"Trains an interactive diffusion simulator from DOOM gameplay trajectories."}),e.jsx(n.td,{children:"Testing / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2405.12399",children:"DIAMOND — Diffusion for World Modeling"})," · 2024"]}),e.jsx(n.td,{children:"Trains reinforcement learning agents inside diffusion world models that preserve visual detail."}),e.jsx(n.td,{children:"Testing / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2501.08325",children:"GameFactory"})," · 2025"]}),e.jsx(n.td,{children:"Combines open-domain video generation with keyboard and mouse action control."}),e.jsx(n.td,{children:"World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://arxiv.org/abs/2406.09394",children:"WonderWorld"})," · 2024"]}),e.jsx(n.td,{children:"Builds an explorable, expandable explicit 3D scene from a single image."}),e.jsx(n.td,{children:"Assets / Scenes / World models"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://enderfga.cn/SolarRenderer/",children:"SolarRenderer"})})}),`
`,e.jsx(n.p,{children:"Few-Step Generative Reference Rendering conditions MiniMax-H3 on semantic maps, grayboxes, skeletons, depth, and other structures, with an optional first frame and text. Control and four-step LoRAs include a block-causal variant. Code is Apache-2.0; weights use the geographically restricted MiniMax H3 Community License, and data has component-specific terms, including noncommercial and research-only portions. Upstream programs must maintain world state and rules. Four-step sampling alone does not establish real-time consumer-hardware interaction."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"hybrid-renderer"})," · ",e.jsx(n.code,{children:"structure-conditioning"})," · ",e.jsx(n.code,{children:"streaming"})," · ",e.jsx(n.code,{children:"MiniMax-H3"})," · ",e.jsx(n.code,{children:"LoRA"})," · ",e.jsx(n.code,{children:"released-code"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/Enderfga/SolarRenderer",children:"Code"})," · ",e.jsx(n.a,{href:"https://enderfga.cn/data/solarrenderer.pdf",children:"Paper PDF"})," · ",e.jsx(n.a,{href:"https://huggingface.co/Enderfga/SolarRenderer",children:"Weights"})," · ",e.jsx(n.a,{href:"https://huggingface.co/datasets/Enderfga/SolarRenderer-Data",children:"Data and evaluation"})," · ",e.jsx(n.a,{href:"https://github.com/Junchao-cs/SolarWM/blob/main/docs/solar_renderer.md",children:"Usage guide"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2608.25927",children:"Code World Model: Coding Agent as World Brain"})})}),`
`,e.jsx(n.p,{children:"Separates world evolution from visual generation. An agent maintains executable state, which is compiled into controls for a fine-tuned MiniMax-H3 renderer. The released inference interface uses an RGB first-frame anchor, per-frame depth and semantic-ID controls, and per-window prompts. Inference code, LoRAs, and examples are public, but the underlying game code that generates proxies cannot be redistributed. The complete agent-to-engine pipeline cannot be reproduced unchanged from those artifacts."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"code-world-model"})," · ",e.jsx(n.code,{children:"coding-agent"})," · ",e.jsx(n.code,{children:"executable-state"})," · ",e.jsx(n.code,{children:"hybrid-renderer"})," · ",e.jsx(n.code,{children:"MiniMax-H3"})," · ",e.jsx(n.code,{children:"partial-release"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://buaacyw.github.io/cwm/",children:"Project"})," · ",e.jsx(n.a,{href:"https://github.com/buaacyw/code-world-model",children:"Inference code"})," · ",e.jsx(n.a,{href:"https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md",children:"Reproduction scope"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2609.10540",children:"Programmable World Model"})})}),`
`,e.jsx(n.p,{children:"An agent converts instructions into entity states and state-transition programs. A lightweight engine maintains global state, then compiles stateful 3D oriented bounding boxes and camera trajectories into video model controls. The paper introduces CombatStateBench to check entity counts and irreversible states. The public repository currently centers on project documentation, which does not establish that complete inference code and weights are available."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"code-world-model"})," · ",e.jsx(n.code,{children:"executable-state"})," · ",e.jsx(n.code,{children:"hybrid-renderer"})," · ",e.jsx(n.code,{children:"persistent-state"})," · ",e.jsx(n.code,{children:"CombatStateBench"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/AlayaLab/pwm",children:"Project and release progress"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2609.26458",children:"CoDeR — Code Plans, Diffusion Renders"})})}),`
`,e.jsx(n.p,{children:"Code Plans, Diffusion Renders: Open-Ended Generative World Modeling uses five collaborating roles to turn concepts into rules, code, and observations, allowing entities to keep evolving outside the current view. The paper studies long-term memory, open-ended interaction, and multi-agent worlds. Its abstract says code and weights will be released; distinguish reported results from artifacts already available."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"code-world-model"})," · ",e.jsx(n.code,{children:"multi-agent"})," · ",e.jsx(n.code,{children:"hybrid-renderer"})," · ",e.jsx(n.code,{children:"persistent-state"})," · ",e.jsx(n.code,{children:"research"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://becauseimbatman0.github.io/CoDeR",children:"Project"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2608.27168",children:"Magpie: Real-Time World Renderer for Interactive Games"})})}),`
`,e.jsx(n.p,{children:"Designers define scenes and rules in a conventional game engine. At runtime, the engine processes player actions and maintains state, while a rendering service transforms engine-produced whitebox frames into final visuals. It demonstrates a division between generative rendering and reproducible gameplay, primarily reducing prototype dependence on complete art assets. The paper reports chunk-based interaction delay and remaining visual-consistency limitations; it does not establish a production-ready game renderer."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"hybrid-renderer"})," · ",e.jsx(n.code,{children:"executable-state"})," · ",e.jsx(n.code,{children:"game-engine"})," · ",e.jsx(n.code,{children:"render-server"})," · ",e.jsx(n.code,{children:"research"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://arxiv.org/html/2608.27168v1",children:"Paper v1 latency and limitations"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2609.02886",children:"SolarWM"})})}),`
`,e.jsx(n.p,{children:"Unifies data, training, and inference interfaces for camera-controlled streaming video. The source matrix lists all three stages for Wan2.2-5B and MiniMax-H3, but later stages for Wan2.2-14B and LTX-2.5 remain forthcoming. Backbones require separate runtime environments. The main data release contains annotations and indexes; latent payloads are separate, and the full processed training-video corpus requires reconstruction or approved access. The main Hugging Face dataset and H3 model repositories also require agreement to share contact information. This infrastructure does not provide a code world with queryable entity state."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"interactive-video"})," · ",e.jsx(n.code,{children:"training-framework"})," · ",e.jsx(n.code,{children:"camera-control"})," · ",e.jsx(n.code,{children:"streaming"})," · ",e.jsx(n.code,{children:"released-code"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://github.com/Junchao-cs/SolarWM",children:"Code and documentation"})," · ",e.jsx(n.a,{href:"https://junchao-cs.github.io/SolarWM-Web/",children:"Project"})," · ",e.jsx(n.a,{href:"https://huggingface.co/datasets/junchaoh-cs/SolarWM-Data",children:"Data access"})," · ",e.jsx(n.a,{href:"https://huggingface.co/junchaoh-cs/SolarWM-H3-33B",children:"H3 weights and access"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2402.12275",children:"WorldCoder"})})}),`
`,e.jsx(n.p,{children:"WorldCoder, a Model-Based LLM Agent represents knowledge of a world as executable Python programs. Interaction records constrain those programs, and planning searches for potential rewards. This NeurIPS 2024 work is primarily evaluated on gridworlds and task planning. It supports study of rule discovery and model repair rather than complete visual game generation."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"code-world-model"})," · ",e.jsx(n.code,{children:"program-synthesis"})," · ",e.jsx(n.code,{children:"model-based-planning"})," · ",e.jsx(n.code,{children:"gridworld"})," · ",e.jsx(n.code,{children:"NeurIPS-2024"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2405.15383",children:"GIF-MCTS / Code World Models Benchmark"})})}),`
`,e.jsx(n.p,{children:"Generating Code World Models with Large Language Models Guided by Monte Carlo Tree Search encodes transition, reward, and termination logic in Python. Trajectories and test feedback guide GIF-MCTS search. The paper also releases CWMB, covering 18 reinforcement learning environments, to evaluate model correctness and downstream planning. It is a foundational reading and evaluation reference for code world models."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"code-world-model"})," · ",e.jsx(n.code,{children:"program-synthesis"})," · ",e.jsx(n.code,{children:"MCTS"})," · ",e.jsx(n.code,{children:"benchmark"})," · ",e.jsx(n.code,{children:"CWMB"})," · ",e.jsx(n.code,{children:"NeurIPS-2024"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/nicoladainese96/code-world-models",children:"Code and CWMB"})," · ",e.jsx(n.a,{href:"https://sites.google.com/view/code-world-models/home",children:"Project"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2510.04542",children:"Code World Models for General Game Playing"})})}),`
`,e.jsx(n.p,{children:"Generates Python state-transition, legal-action, and termination functions from rules and game trajectories, plus heuristic value and hidden-state inference functions for planning. The paper evaluates 10 fully or partially observable games, including board and card games. Avoiding illegal actions depends on the synthesized rules being correct, so model validation remains necessary."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"code-world-model"})," · ",e.jsx(n.code,{children:"game-rules"})," · ",e.jsx(n.code,{children:"MCTS"})," · ",e.jsx(n.code,{children:"formal-simulator"})," · ",e.jsx(n.code,{children:"imperfect-information"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2505.10819",children:"PoE-World"})})}),`
`,e.jsx(n.p,{children:"Compositional World Modeling with Products of Programmatic Experts combines LLM-synthesized programs in an exponentially weighted product of experts, learning complex stochastic world models from few observations. The paper connects these models to planners in Pong and Montezuma's Revenge to demonstrate sample efficiency and generalization to new levels. This is programmatic dynamics modeling rather than an art generation tool."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"code-world-model"})," · ",e.jsx(n.code,{children:"program-synthesis"})," · ",e.jsx(n.code,{children:"stochastic-dynamics"})," · ",e.jsx(n.code,{children:"Atari"})," · ",e.jsx(n.code,{children:"model-based-planning"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/topwasu/poe-world",children:"Code"})," · ",e.jsx(n.a,{href:"https://topwasu.github.io/poe-world",children:"Project"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2409.17652",children:"FactorSim"})})}),`
`,e.jsx(n.p,{children:"Generative Simulation via Factorized Representation uses a factorized POMDP representation to reduce context per generation step. It generates 2D game simulations for agent training. Its robotics experiments generate task code, including object states and reward structure, within the existing CLIPort framework. The game benchmark covers eight Pygame environments; 3D game generation is future work in the NeurIPS 2024 paper. Robotics experiments retain 3D relevance without establishing generation of a complete physics engine."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"code-world-model"})," · ",e.jsx(n.code,{children:"simulation-generation"})," · ",e.jsx(n.code,{children:"POMDP"})," · ",e.jsx(n.code,{children:"benchmark"})," · ",e.jsx(n.code,{children:"NeurIPS-2024"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://cs.stanford.edu/~sunfanyun/factorsim/",children:"Project"})," · ",e.jsx(n.a,{href:"https://arxiv.org/html/2409.17652v2",children:"Paper v2 scope"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2402.15391",children:"Genie: Generative Interactive Environments"})})}),`
`,e.jsx(n.p,{children:"Combines a spatiotemporal video tokenizer, autoregressive dynamics, and a latent action model into generative interactive environments. Users can begin with an image or sketch and explore frame by frame. The ICML 2024 contribution centers on learning control without ground-truth action labels. Dynamics remain implicit in the model, without editable or queryable game rule programs."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"interactive-video"})," · ",e.jsx(n.code,{children:"latent-actions"})," · ",e.jsx(n.code,{children:"neural-simulator"})," · ",e.jsx(n.code,{children:"2D-platformer"})," · ",e.jsx(n.code,{children:"ICML-2024"}),". Source reviewed: 2026-10-18."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2408.14837",children:"GameNGen — Diffusion Models Are Real-Time Game Engines"})})}),`
`,e.jsx(n.p,{children:"A reinforcement learning agent first collects game trajectories. A diffusion model then predicts the next frame from visual history and actions, using conditioning noise augmentation to reduce autoregressive error. The paper demonstrates real-time DOOM simulation on a single TPU. This game-specific neural simulation does not automatically provide maintainable general game rules or an asset pipeline."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"neural-simulator"})," · ",e.jsx(n.code,{children:"interactive-video"})," · ",e.jsx(n.code,{children:"diffusion"})," · ",e.jsx(n.code,{children:"DOOM"})," · ",e.jsx(n.code,{children:"ICLR-2025"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://gamengen.github.io/",children:"Project"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2405.12399",children:"DIAMOND — Diffusion for World Modeling"})})}),`
`,e.jsx(n.p,{children:"Visual Details Matter in Atari studies diffusion models as environment models in which agents learn from imagined trajectories, analyzing how visual detail affects policies. Alongside the Atari 100k evaluation, the paper trains a playable neural engine on prerecorded CS:GO gameplay. It is relevant to simulation, control, and accumulated prediction error."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"neural-simulator"})," · ",e.jsx(n.code,{children:"interactive-video"})," · ",e.jsx(n.code,{children:"diffusion"})," · ",e.jsx(n.code,{children:"Atari"})," · ",e.jsx(n.code,{children:"reinforcement-learning"})," · ",e.jsx(n.code,{children:"NeurIPS-2024"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://diamond-wm.github.io/",children:"Code and playable models"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2501.08325",children:"GameFactory"})})}),`
`,e.jsx(n.p,{children:"Creating New Games with Generative Interactive Videos proposes domain adapters and action-control modules for autoregressive game video. The public GF-Minecraft dataset includes action labels; the checked repository provides dataset documentation and detection/visualization utilities, without establishing a released training/inference pipeline or model weights. Visual generalization should be evaluated separately from rule correctness, item persistence, and exportable game projects."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"interactive-video"})," · ",e.jsx(n.code,{children:"neural-simulator"})," · ",e.jsx(n.code,{children:"action-control"})," · ",e.jsx(n.code,{children:"Minecraft"})," · ",e.jsx(n.code,{children:"dataset"})," · ",e.jsx(n.code,{children:"ICCV-2025"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://github.com/KlingAIResearch/GameFactory",children:"Dataset tools and documentation"})," · ",e.jsx(n.a,{href:"https://huggingface.co/datasets/KlingTeam/GameFactory-Dataset",children:"GF-Minecraft dataset"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://arxiv.org/abs/2406.09394",children:"WonderWorld"})})}),`
`,e.jsx(n.p,{children:"Interactive 3D Scene Generation from a Single Image uses Fast Layered Gaussian Surfels and guided depth diffusion to connect new scenes as the camera moves and prompts change. It provides explicit spatial representation and real-time rendering, primarily addressing geometry and appearance. Interactive gameplay, physics, and persistent dynamic state still require separate implementation."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"scene-generation"})," · ",e.jsx(n.code,{children:"explicit-3d"})," · ",e.jsx(n.code,{children:"Gaussian-surfels"})," · ",e.jsx(n.code,{children:"camera-control"})," · ",e.jsx(n.code,{children:"CVPR-2025"}),". Source reviewed: 2026-10-18. Further reading: ",e.jsx(n.a,{href:"https://kovenyu.com/WonderWorld/",children:"Project"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"tool-5",children:"Tool"}),`




















`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Resource"}),e.jsx(n.th,{children:"Purpose and scope"}),e.jsx(n.th,{children:"Stages"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/",children:"Genie 3 / Project Genie"})," · 2025"]}),e.jsx(n.td,{children:"Generates interactive video worlds from prompts for real-time exploration."}),e.jsx(n.td,{children:"Planning / World models"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.a,{href:"https://www.worldlabs.ai/blog/marble-world-model",children:"World Labs Marble"})," · 2025"]}),e.jsx(n.td,{children:"Generates persistent, navigable 3D scenes with splat and mesh exports."}),e.jsx(n.td,{children:"Assets / Scenes / World models"})]})]})]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Inputs, outputs, limitations, and further reading"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/",children:"Genie 3 / Project Genie"})})}),`
`,e.jsx(n.p,{children:"Google DeepMind's August 2025 research demonstration reported interactive worlds at 720p and 24 FPS with consistency lasting several minutes. The separate Project Genie prototype limits exploration to 60 seconds; its current help page requires an eligible personal Google AI Ultra account, age 18+, where Ultra is available. Video download is documented, while downloadable engine source, exportable level assets, and deterministic gameplay rules are not established by these sources."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"interactive-video"})," · ",e.jsx(n.code,{children:"neural-simulator"})," · ",e.jsx(n.code,{children:"text-to-world"})," · ",e.jsx(n.code,{children:"Google-DeepMind"})," · ",e.jsx(n.code,{children:"hosted"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://support.google.com/labs/answer/16875695?hl=en",children:"Project Genie access and limits"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.worldlabs.ai/blog/marble-world-model",children:"World Labs Marble"})})}),`
`,e.jsx(n.p,{children:"Marble supports multimodal world creation, exports Gaussian splats, visual meshes, and collision meshes for approximate physics, and renders video along camera paths. Compared with pure video continuation, it produces spatial assets for downstream engines. Developers still need to build character behavior, quest logic, and game loops. According to the inspected web-app guide, collider mesh export is included with Standard and high-quality textured GLB export requires Pro."}),`
`,e.jsxs(n.p,{children:["Tags: ",e.jsx(n.code,{children:"scene-generation"})," · ",e.jsx(n.code,{children:"explicit-3d"})," · ",e.jsx(n.code,{children:"Gaussian-splatting"})," · ",e.jsx(n.code,{children:"mesh-export"})," · ",e.jsx(n.code,{children:"hosted"}),". Source reviewed: 2026-10-19. Further reading: ",e.jsx(n.a,{href:"https://marble.worldlabs.ai/",children:"Product"})," · ",e.jsx(n.a,{href:"https://docs.worldlabs.ai/marble/export/mesh",children:"Web-app mesh export"})]}),`
`]}),`
`,e.jsx(n.h2,{id:"further-reading-and-practice",children:"Further reading and practice"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/agents-notes/",children:"Agents: models, harnesses, skills, and MCP"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/engines-notes/",children:"Engine ecosystems: documentation, source, tests, and community practice"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/game-ai-notes/",children:"AI for 2D and 3D: evaluation versions, asset pipelines, and release boundaries"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/world-model-notes/",children:"World models: code state, hybrid rendering, video simulation, and explicit 3D"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/practical-guide/",children:"Practical guide: task contracts, asset import, validation, and reproduction"})}),`
`]}),`
`,e.jsx(n.h2,{id:"maintenance",children:"Maintenance"}),`
`,e.jsxs(n.p,{children:["Edit only ",e.jsx(n.code,{children:"data/segments/*.json"})," for catalog content. Run ",e.jsx(n.code,{children:"npm run build"})," to regenerate the list and website, and ",e.jsx(n.code,{children:"npm run check"})," to validate the data and generated outputs. There is no automatic scraping or scheduled updating. Code, weights, data, and services may have different licenses; read the relevant official terms before use. External projects belong to their respective authors."]})]})}function d(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{d as default,r as frontmatter,a as structuredData,o as toc};
