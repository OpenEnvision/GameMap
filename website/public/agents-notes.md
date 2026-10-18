# Coding agents and game tool integrations: source review notes

Source review date: 2026-10-18. The primary data file, `data/segments/agents.json`, contains 20 entries, each linked to an author repository or official documentation. `verified` records the date a source was read and checked. It does not indicate local installation, a successful run, or compatibility testing across all engine versions.

## Essential distinctions

- **Model ≠ harness ≠ skill ≠ MCP.** A model produces decisions; a harness manages the tool loop, context, and execution environment. A skill packages domain procedures, while MCP provides an interface for clients to call tools. Game development outcomes depend on all four layers and real engine feedback. Resources should not be treated as interchangeable based on model names.
- **DeepSeek as a backend.** The [official Anthropic API compatibility guide](https://api-docs.deepseek.com/guides/anthropic_api/) confirms the compatibility endpoint and Claude Code integration, and lists ignored, mapped, or partially supported fields. This review found insufficient evidence for a separate official DeepSeek game harness, so the entry covers integration documentation. Model mappings in that documentation can change; the directory does not pin current aliases.
- **Code tests ≠ playtests.** Builds and unit tests check software behavior. Visuals, input, collisions, win and loss states, game feel, and sustained operation require feedback from the running game. General SWE-bench scores cannot directly rank game development capability.
- **Editor bridges ≠ official engine vendor support.** The listed Unity, Godot, Blender, and UE bridges are independent projects. Check their functionality, maintenance, licenses, and engine compatibility separately.

## Sources and lifecycle changes

| Entry | Main sources read in this review | Findings and limitations |
| --- | --- | --- |
| Codex | [Official CLI documentation](https://developers.openai.com/codex/cli) | Official documentation was searched and fetched using the OpenAI Docs skill. The documented workflow supports local files, commands, skills, and MCP. This review did not compare models or pricing, or claim game-specific capabilities. |
| Claude Code | [Official overview](https://code.claude.com/docs/en/overview) | File reading, editing, commands, and extensions were confirmed. Each MCP project supplies its own game integration capabilities. |
| Gemini CLI | [Official repository README](https://github.com/google-gemini/gemini-cli) | At the recorded check, the README stated that some users would move to Antigravity CLI from 2026-06-18 and noted differences in optimization for newer models. The requested Gemini CLI entry remains, without presenting it as the only current entry point for all users. |
| OpenCode | [Official documentation](https://opencode.ai/docs/) | Plan / Build modes, multiple providers, and AGENTS.md were confirmed. The main repository is now anomalyco/opencode. |
| Cline | [Author repository](https://github.com/cline/cline) | The project has CLI / SDK interfaces as well as an IDE interface; the entry avoids describing it solely as the older VS Code extension. |
| Aider | [Author repository](https://github.com/Aider-AI/aider) | Repository maps, Git, and lint / test workflows were checked. The README's model examples were older, so they are not presented as current recommendations. |
| OpenHands / SDK | [Main repository](https://github.com/OpenHands/OpenHands), [SDK repository](https://github.com/OpenHands/software-agent-sdk) | The main repository provides Agent Canvas and orchestration; the SDK provides agents, tools, workspaces, and core services. Separate entries preserve these responsibilities. |
| Claude Agent SDK | [Official SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) | The former platform.claude.com path redirects to code.claude.com. Python / TypeScript, the tool loop, MCP, hooks, and sessions were confirmed. |
| mini-swe-agent | [Author repository](https://github.com/SWE-agent/mini-swe-agent), [predecessor SWE-agent](https://github.com/SWE-agent/SWE-agent) | The SWE-agent README recommends mini-swe-agent as the default. It is included as a minimal research baseline, without repeating self-reported leaderboard numbers. |
| AGENTS.md | [Format website](https://agents.md/) | Confirmed as an open Markdown format for project instructions. Automatic discovery differs by client; identical zero-configuration behavior should not be assumed. |
| Agent Skills | [Official format documentation](https://agentskills.io/home) | Confirmed SKILL.md, scripts / references / assets, and progressive loading. The format documentation is listed separately from practical game skills. |
| Codex browser games | [Complete official guide](https://learn.chatgpt.com/use-cases/browser-games) | The guide was fetched through the official documentation service. It covers PLAN.md, AGENTS.md, image assets, and Playwright feedback, without promising that any game can be completed in one attempt. |
| MCP for Unity | [Author repository](https://github.com/CoplayDev/unity-mcp), [installation documentation](https://coplaydev.github.io/unity-mcp/getting-started/install) | Scripts, scenes, and tests are supported. The author explicitly states that the project is independent of Unity. Tool counts and versions change quickly, so no fixed tool count is included. |
| Unity-MCP Operator Guide | [Actual SKILL.md](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md) | The full skill text was read to check the procedure: inspect state, act, wait for compilation, and check the console / screenshots. It is a research source here, not a skill installed or executed during the review. |
| Godot MCP | [Author repository](https://github.com/Coding-Solo/godot-mcp) | Launching, logs, scene nodes, Sprite2D, and MeshLibrary features were checked. Extra interactions or testing features from downstream forks were not attributed to the original project. |
| MCP for Blender | [Current author repository](https://github.com/ahujasid/mcp-for-blender) | The old ahujasid/blender-mcp URL redirects. The current project name is MCP for Blender and the PyPI package is mcp-for-blender; the README documents compatibility with old configuration. It is not an official Blender Foundation add-on. |
| Unreal MCP | [Author repository](https://github.com/chongdashu/unreal-mcp) | The author marks the project experimental, notes that APIs may change, and advises against production use. The description covers only the listed Actor, Blueprint, and viewport capabilities. |
| Playwright MCP | [Microsoft repository](https://github.com/microsoft/playwright-mcp) | The default structured accessibility tree is suitable for DOM inspection; Canvas / WebGL game state is not guaranteed to be visible. The README also discusses tradeoffs between CLI + Skills and persistent MCP workflows. |

## Candidates not listed as current first choices

- The [Roo Code](https://github.com/RooCodeInc/Roo-Code) README states that the extension stopped service on May 15th and points to community forks and Cline. Older articles are therefore not repeated as current recommendations. The statement does not specify a year, so the directory does not invent one.
- The [Continue](https://github.com/continuedev/continue) README marks the repository as no longer actively maintained and read-only. Any future entry should identify that historical status rather than present it as an active tool without explanation.
- The Antigravity migration note relies on the official Gemini CLI README and explains the original entry's lifecycle. It is not a full review of the separate Antigravity product, so no additional resource entry was created.

## Practical guidance for game development planning

1. **Choose an observable feedback loop first.** Browser games offer screenshots, input, console output, network inspection, and test feedback. For native engines, establish a working headless, editor, or MCP workflow before asking an agent to expand functionality.
2. **Treat editor state as data.** Read scene object IDs, components, materials, asset references, and compilation state before modifying them. Object names are not stable identities; prompts should not guess the current scene.
3. **Define evidence for each step.** Record builds and tests for code changes; screenshots, hierarchies, and property differences for scenes; input traces and expected states for gameplay; and a successful launch in the target runtime for exports.
4. **Preserve repeatable procedures.** Capture successful sprite, GLB, scene, and testing workflows in skills with scripts and examples. Record project constraints in AGENTS.md rather than continually expanding one large prompt.
5. **Control variables when comparing agents.** Record the model, harness, engine and tool versions, budget, random seed, task, and acceptance criteria. Keep tasks and validation environments constant when changing models so differences can be attributed meaningfully.
