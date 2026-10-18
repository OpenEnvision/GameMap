# Coding-agent game interfaces: source evidence

Reviewed October 18, 2026. These ten notes explain targeted requirement, permission, and verification refinements in the coding-agent resource guide. They supplement each resource's existing integration evidence.

The cited files are pinned to the revisions inspected. This was a source review: no listed bridge, game, editor, or test harness was installed or executed. Static implementation findings describe the cited code paths, not runtime reproductions. Later versions may change them.

## codex-official-browser-game-workflow

The OpenAI game workflow links to Playwright Interactive. At the inspected revision, that particular skill requires js_repl, a project-local Playwright setup, and sandbox-disabled Codex execution. This elevated-permission prerequisite applies to the linked skill; it is not a claim that every Codex browser workflow requires it.

Source: [Playwright Interactive preconditions and setup](https://github.com/openai/skills/blob/ecc1fb8bc0b82f1d3c7a92a82167ae8e8e613a67/skills/.curated/playwright-interactive/SKILL.md)

## epic-unreal-claude-skills

The Claude plugin provides skills and a context hook; its README requires Unreal's engine-side plugins and a live server. It does not ship static MCP configuration. Tool-search mode exposes three discovery/dispatch tools by default. The README also warns that execute_tool_script runs arbitrary Python inside the editor and that localhost does not exclude other processes running as the same user.

Source: [Epic README: prerequisites, configuration, tool search, and security](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin/blob/d1b05809e4f089bd0ef174532c692fbcf1562eb7/README.md)

## codex-game-studio-cli

The initializer is not just a project-state writer. Its default path calls pruneTemplateAuthoringArtifacts, which removes the listed template-authoring paths, including directories and specified TypeScript/test files. The keepTemplateAuthoring option skips that pruning. Inspect the target checkout and the list before initialization.

Source: [projects.ts: listed paths, recursive removal, and initializer branch](https://github.com/merlinhu1/codex-game-studio/blob/e06453bcab2a311d229b3d41ad842c45d40ad478/src/projects.ts)

## ione-unity-claude

The HTTP bridge is opt-in and bearer-authenticated. Once enabled, the five separate safety capabilities default to permissive values, including script writes and asset deletion. The README explicitly limits Unity Undo coverage: file writes and most AssetDatabase operations are outside it. The Claude Code bridge route is documented separately from the plugin's provider-key-dependent in-editor chat and image generation.

Sources: [Safety defaults](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/Editor/Core/IoneSettings.cs) · [HTTP authorization and domain-reload behavior](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/Editor/Core/IoneHttpBridge.cs) · [Claude Code route and Undo limits](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/README.md)

## godot-forge-editor-bridge

Tann2019's Godot Forge has different execution modes. The README specifies Godot 4.4+ and Node 20+. Editor authoring uses the add-on, runtime tools use a debug-connected running game, and documentation, tests, and exports also have headless paths. Requiring a runtime connection for every operation would blur those boundaries. This project is distinct from gregario's code-feedback bridge below.

Source: [Tann2019 README: quick start and architecture](https://github.com/Tann2019/godot-mcp-server/blob/c52b307f4f28366aa8055f452f367a952aaceb80/README.md)

## godot-forge-code-quality

At the cited source revision, static source inspection indicates a non-fail-closed test-summary path. The GUT and GdUnit4 parsers initialize counts to zero and can generate “All 0 tests passed” when their expected output patterns are absent. The caller parses stdout/stderr without incorporating the subprocess exit code into the test result; the process helper returns that code rather than rejecting every nonzero exit.

This failure path was not runtime-reproduced. A zero-count or unrecognized result needs further execution evidence before it can establish passing tests. The separate screenshot implementation launches another Godot process and requires rendering/display access; it is not a passive capture of any already-running session.

Sources: [Pinned test parsers and caller](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts) · [Pinned process exit handling](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/spawn-godot.ts) · [Pinned screenshot implementation](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/screenshot.ts)

## gda-godot-agent

gda assumes a trusted target project. Its README says that autoloads run when project operations boot the game-facing engine, including some read-only operations. node get instantiates a scene to obtain runtime properties and can run attached-script initialization. These distinctions matter before using inspection commands on an untrusted project; the catalog does not describe them as a sandbox.

Source: [gda README: configuration and project-code execution](https://github.com/aigengame/godot-agent/blob/036a635fd3bb32ff755b94e928c63883f488e12d/README.md)

## godot-agent-loop

The default core surface uses godot_catalog and godot_call to reach tools not advertised up front. Filesystem access is denied without configured roots unless explicitly overridden. Privileged runtime reflection/code-execution groups are off by default, but those RPC gates do not sandbox the project itself: its GDScript runs with the user's OS-level permissions. Rendering-dependent operations require a display/rendering context.

Source: [Godot Agent Loop README: requirements, tool surface, runtime policy, and environment variables](https://github.com/beremaran/godot-agent-loop/blob/d75624f2a7237ec1b2de17ead27acdcd2b6630e1/README.md)

## agent2unity-cli

Static inspection of the cited daemon shows a localhost listener whose request route dispatches /execute commands without an authentication check. Any process able to reach that port can invoke registered editor operations. This is an implementation trust-boundary observation, not a claim of a reproduced remote attack or a complete security audit.

Source: [Agent2UnityDaemon.cs: listener, request route, and main-thread dispatch](https://github.com/jkpp/agent2unity-cli/blob/647becab081597b1a29cf2bb4bae489dbdd6040a/unity-plugin/Agent2Unity/Editor/Core/Agent2UnityDaemon.cs)

## gemini-cli-godot-dock-bridge

The backend invokes Gemini CLI and then applies returned JSON file actions automatically. create_file opens its destination in overwrite mode. The path check rejects strings containing '..', but the reviewed function does not require a res:// path or verify canonical containment within the project root before joining/writing the supplied path.

This is a static source finding, not a runtime reproduction. It warrants reviewing or hardening the prototype before use on valuable projects; it should not be read as a claim of robust project confinement.

Source: [gemini_backend.py: response parsing, path handling, and file writes](https://github.com/AlexonMorris/gemini_assistant_godot_plugin/blob/5f2b65040dd75d09a147b0e16d6b374080e4939d/gemini_backend.py)
