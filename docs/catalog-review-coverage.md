# Catalog review coverage

Source review: **2026-10-18**. Baseline: `5b4735422f7eb22b405f49f6e4b124a9e9bb2143`. All 109 existing cards were read; no cards were added in this pass. **Sources checked; full reproduction not performed.**

This ledger describes a bounded review, not certification. Relevant primary-page sections, artifact listings, and selected terms were checked, with deeper reads on consequential claims. An abstract-level or blocked read is weaker evidence than full documentation or source inspection. Retained means no material correction was identified within that scope; it does not mean every linked claim, release, license, or platform was exhaustively verified. No engines, listed agents, models, or paid APIs were run.

## Material refinements

- Separate code, checkpoint, and dataset terms for SolarRenderer and HY-Motion; preserve the Stable Audio access gate
- Separate GameFactory research modules from released dataset utilities, Oasis checkpoint inference from its hosted demo, and SolarWM backbone/stage/data availability
- Correct Phaser examples to the current Phaser 4 README, retain code-versus-art licensing, and use Holodeck's first-preprint year
- Qualify GameEngineBench's LLM-judged success protocol and unresolved repository access; distinguish GameGPT's paper artifacts and OpenGame framework/model/evaluator availability
- Preserve version-specific agent/bridge behavior, readiness and permissions rather than treating MCP or compatible APIs as complete feature parity
- Document Scenario beta MCP completion/cancellation boundaries and modl.ai's game-specific preparation

## Per-card coverage

Source links below identify review entry points; exact field-specific supporting links remain with the resource card or companion notes. Scope labels describe the actual read, not execution.

| Stable ID | Outcome | Read scope | Primary source |
| --- | --- | --- | --- |
| `agent-skills-format` | Retained | source-read | [Source](https://agentskills.io/home) |
| `agents-md` | Retained | source-read | [Source](https://agents.md/) |
| `aider` | Retained | source-read | [Source](https://github.com/Aider-AI/aider) |
| `claude-agent-sdk` | Refined | source-read | [Source](https://code.claude.com/docs/en/agent-sdk/overview) |
| `claude-code` | Refined | source-read | [Source](https://code.claude.com/docs/en/overview) |
| `cline` | Retained | source-read | [Source](https://github.com/cline/cline) |
| `codex` | Refined | source-read | [Source](https://developers.openai.com/codex/cli) |
| `codex-browser-games` | Retained | source-read | [Source](https://learn.chatgpt.com/use-cases/browser-games) |
| `deepseek-agent-integrations` | Refined | source-read | [Source](https://api-docs.deepseek.com/guides/anthropic_api/) |
| `gemini-cli` | Refined | source-read | [Source](https://github.com/google-gemini/gemini-cli) |
| `godot-mcp` | Retained | source-read | [Source](https://github.com/Coding-Solo/godot-mcp) |
| `mcp-for-blender` | Refined | source-read | [Source](https://github.com/ahujasid/mcp-for-blender) |
| `mini-swe-agent` | Refined | source-read | [Source](https://github.com/SWE-agent/mini-swe-agent) |
| `opencode` | Refined | source-read | [Source](https://opencode.ai/docs/) |
| `openhands` | Retained | source-read | [Source](https://github.com/OpenHands/OpenHands) |
| `openhands-sdk` | Retained | source-read | [Source](https://github.com/OpenHands/software-agent-sdk) |
| `playwright-mcp` | Refined | source-read | [Source](https://github.com/microsoft/playwright-mcp) |
| `unity-mcp` | Refined | source-read | [Source](https://github.com/CoplayDev/unity-mcp) |
| `unity-mcp-skill` | Refined | source-read | [Source](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md) |
| `unreal-mcp` | Refined | source-read | [Source](https://github.com/chongdashu/unreal-mcp) |
| `blender` | Retained | primary source relevant sections read | [Source](https://github.com/blender/blender) |
| `blender-python-quickstart` | Retained | primary source relevant sections read | [Source](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst) |
| `catlike-coding-movement` | Refined | primary source relevant sections read | [Source](https://catlikecoding.com/unity/tutorials/movement/surface-contact/) |
| `epic-developer-community` | Retained | opened shell only | [Source](https://dev.epicgames.com/community/unreal-engine) |
| `gdquest-first-2d-game` | Refined | primary source relevant sections read | [Source](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/) |
| `gltf-blender-io` | Retained | primary source relevant sections read | [Source](https://github.com/KhronosGroup/glTF-Blender-IO) |
| `godot-command-line` | Refined | primary source relevant sections read | [Source](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html) |
| `godot-demo-projects` | Retained | primary source relevant sections read | [Source](https://github.com/godotengine/godot-demo-projects) |
| `godot-engine` | Retained | primary source relevant sections read | [Source](https://docs.godotengine.org/en/stable/) |
| `godot-gut` | Retained | primary source relevant sections read | [Source](https://github.com/bitwes/Gut) |
| `phaser` | Retained | primary source relevant sections read | [Source](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game) |
| `phaser-examples` | Refined | primary source relevant sections read | [Source](https://github.com/phaserjs/examples) |
| `react-three-fiber` | Retained | primary source relevant sections read | [Source](https://r3f.docs.pmnd.rs/getting-started/introduction) |
| `threejs` | Retained | primary source relevant sections read | [Source](https://github.com/mrdoob/three.js) |
| `threejs-crowd-experience` | Retained | primary source relevant sections read | [Source](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928) |
| `threejs-examples` | Retained | shell plus author repository corroboration | [Source](https://threejs.org/examples/) |
| `unity-2d-techdemos` | Retained | primary source relevant sections read | [Source](https://github.com/Unity-Technologies/2d-techdemos) |
| `unity-engine` | Retained | primary source relevant sections read | [Source](https://docs.unity3d.com/Manual/index.html) |
| `unity-test-framework` | Retained | primary source relevant sections read | [Source](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html) |
| `unreal-automation-tests` | Retained | primary source relevant sections read | [Source](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine) |
| `unreal-engine` | Refined | primary source relevant sections read | [Source](https://dev.epicgames.com/documentation/en-us/unreal-engine) |
| `unreal-lyra` | Retained | primary source relevant sections read | [Source](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) |
| `agent-game-forge` | Retained | primary source relevant sections read | [Source](https://github.com/0x0funky/agent-game-forge) |
| `agent-sprite-forge` | Refined | primary source relevant sections read | [Source](https://github.com/0x0funky/agent-sprite-forge) |
| `blenderllm` | Retained | primary source relevant sections read | [Source](https://github.com/FreedomIntelligence/BlenderLLM) |
| `cardiverse` | Retained | primary source relevant sections read | [Source](https://github.com/danruili/Cardiverse) |
| `gamedevbench` | Retained | primary source relevant sections read | [Source](https://github.com/waynchi/gamedevbench) |
| `gameenginebench` | Refined | primary source relevant sections read | [Source](https://arxiv.org/abs/2607.03525) |
| `gamefactory-3a` | Retained | primary source relevant sections read | [Source](https://github.com/OpenDCAI/GameFactory-3A) |
| `gamegen-verifier` | Retained | primary source relevant sections read | [Source](https://github.com/NetX-lab/GameGen-Verifier) |
| `gamegpt` | Refined | primary source relevant sections read | [Source](https://arxiv.org/abs/2310.08067) |
| `gamexpert-bench` | Retained | primary source relevant sections read | [Source](https://arxiv.org/abs/2608.21833) |
| `gavel` | Retained | primary source relevant sections read | [Source](https://github.com/gdrtodd/gavel) |
| `godot-3d-asset-skill` | Retained | primary source relevant sections read | [Source](https://github.com/LuigiDeFacci/godot-create-3d-assets) |
| `holodeck` | Refined | primary source relevant sections read | [Source](https://github.com/allenai/Holodeck) |
| `hunyuan3d-2` | Refined | primary source relevant sections read | [Source](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) |
| `infinigen` | Retained | primary source read export details not reverified | [Source](https://github.com/princeton-vl/infinigen) |
| `mariogpt` | Retained | primary source relevant sections read | [Source](https://github.com/shyamsn97/mario-gpt) |
| `mcp-unity` | Refined | primary source relevant sections read | [Source](https://github.com/CoderGamester/mcp-unity) |
| `opengame` | Refined | primary source relevant sections read | [Source](https://github.com/leigest519/OpenGame) |
| `pixellab` | Retained | primary source relevant sections read | [Source](https://www.pixellab.ai/mcp) |
| `text2game` | Retained | blocked direct read indexed primary sample only | [Source](https://github.com/boltomli/t2g) |
| `trellis` | Retained | primary source relevant sections read | [Source](https://github.com/microsoft/TRELLIS) |
| `triposr` | Retained | primary source relevant sections read | [Source](https://github.com/VAST-AI-Research/TripoSR) |
| `unity-agent-plugin` | Retained | primary source relevant sections read | [Source](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) |
| `video2game` | Retained | primary source relevant sections read | [Source](https://github.com/video2game/video2game) |
| `elevenlabs-sfx` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://elevenlabs.io/docs/overview/capabilities/sound-effects) |
| `hy-motion` | Refined | Relevant primary-page sections; targeted details where changed | [Source](https://github.com/Tencent-Hunyuan/HY-Motion-1.0) |
| `meshy` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://docs.meshy.ai/en) |
| `scenario` | Refined | Relevant primary-page sections; targeted details where changed | [Source](https://mcp.scenario.com/docs/tools/job-cancel) |
| `stable-audio-open` | Refined | Relevant primary-page sections; targeted details where changed | [Source](https://huggingface.co/stabilityai/stable-audio-open-1.0) |
| `autoue` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://github.com/Pluto156/AutoUE) |
| `convai` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://convai.com/) |
| `modl-ai` | Refined | Relevant primary-page sections; targeted details where changed | [Source](https://modl.ai/) |
| `regression-games` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://github.com/Regression-Games/RGUnityBots) |
| `unigen` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://github.com/yxwan123/UniGen) |
| `unity-addressables-scripting` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html) |
| `unreal-gauntlet` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US) |
| `unreal-remote-control` | Refined | Relevant primary-page sections; targeted details where changed | [Source](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine) |
| `windows-ui-automation` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview) |
| `elevenlabs-music` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://elevenlabs.io/docs/overview/capabilities/music) |
| `elevenlabs-speech` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://elevenlabs.io/docs/api-reference/text-to-speech/convert) |
| `openai-image-api` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://developers.openai.com/api/docs/guides/image-generation) |
| `tripo-generation-api` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html) |
| `directx-shader-compiler` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://github.com/microsoft/DirectXShaderCompiler) |
| `fastnoise-lite` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://github.com/Auburn/FastNoiseLite) |
| `msdf-atlas-gen` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://github.com/Chlumsky/msdf-atlas-gen) |
| `playwright-test` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://playwright.dev/docs/test-snapshots) |
| `xbox-accessibility-guidelines` | Retained | Relevant primary-page sections; targeted details where changed | [Source](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines) |
| `code-world-model-brain` | Refined | source-read | [Source](https://arxiv.org/abs/2608.25927) |
| `coder-world-model` | Retained | source-read | [Source](https://arxiv.org/abs/2609.26458) |
| `cwm-general-game-playing` | Retained | source-read | [Source](https://arxiv.org/abs/2510.04542) |
| `diamond` | Retained | source-read | [Source](https://arxiv.org/abs/2405.12399) |
| `factorsim` | Retained | source-read | [Source](https://arxiv.org/abs/2409.17652) |
| `gamefactory` | Refined | source-read | [Source](https://arxiv.org/abs/2501.08325) |
| `gamengen` | Retained | source-read | [Source](https://arxiv.org/abs/2408.14837) |
| `genie` | Retained | source-read | [Source](https://arxiv.org/abs/2402.15391) |
| `genie-3` | Retained | source-read | [Source](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) |
| `gif-mcts-cwm` | Retained | source-read | [Source](https://arxiv.org/abs/2405.15383) |
| `magpie-renderer` | Retained | source-read | [Source](https://arxiv.org/abs/2608.27168) |
| `marble` | Retained | source-read | [Source](https://www.worldlabs.ai/blog/marble-world-model) |
| `oasis` | Refined | source-read | [Source](https://oasis-model.github.io/) |
| `poe-world` | Retained | source-read | [Source](https://arxiv.org/abs/2505.10819) |
| `programmable-world-model` | Retained | source-read | [Source](https://arxiv.org/abs/2609.10540) |
| `solarrenderer` | Refined | source-read | [Source](https://enderfga.cn/SolarRenderer/) |
| `solarwm` | Refined | source-read | [Source](https://arxiv.org/abs/2609.02886) |
| `streamrender-h3` | Refined | source-read | [Source](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/) |
| `wonderworld` | Retained | source-read | [Source](https://arxiv.org/abs/2406.09394) |
| `worldcoder` | Retained | source-read | [Source](https://arxiv.org/abs/2402.12275) |

## Document and navigation coverage

All 31 pre-existing Markdown documents received local-target checks, and local Markdown fragments were checked for matching headings. Generated public copies were checked for flattened paths. No missing local targets or duplicate primary card URLs were found. These structural checks do not establish that external links remain available or that every factual statement is correct.

The existing engine, game-AI, agent, and world-model notes were reviewed alongside their cards and corrected where needed. The two generative dossiers received targeted review of the new HY-Motion and Scenario rows. The broader research dossier collection was **not freshly re-audited in full, claim by claim,** in this pass; earlier source reviews remain dated evidence, and broader rechecking remains open.

Priority follow-up: recheck mutable provider terms and release matrices before adoption; compare pinned source behavior with current releases; revisit inaccessible repositories without treating a fetch failure as proof of permanent removal; and audit other dossier claims in coherent subject batches. Runtime compatibility, commercial clearance, performance, and gameplay correctness still require separately scoped evidence.

## Follow-on dossier claim audit

A subsequent source-only pass on 2026-10-18 checked selected consequential claims, rather than repeating the card inventory. The scopes below are claim groups, not unique-resource counts or whole-document certifications.

| Dossier group | Actual review scope | Material result and remaining limits |
| --- | --- | --- |
| [Production debugging](production-debugging-contracts.md), [asset validation](asset-validation-contracts.md), [native operations](native-operation-details.md), [work orders](production-work-orders.md) | 31 targeted groups covering capture/version constraints, frame populations, serialization, audio callbacks, asset formats, licensing and measurement assumptions | Scope Wwise to its recovered 2017.2.0 header; qualify Nsight beta/injection prerequisites, UnityDataTools and glTF Transform licenses, OIDN async/cancellation and mono loudness. Other operations and proposed acceptance fixtures were not executed or comprehensively revalidated. |
| [Visual feedback](visual-feedback-mechanisms.md), [asset selection](asset-selection-feedback.md), [visual inventory](visual-evidence-research.md), [source revisions](source-revision-notes.md) | 14 reviewed groups; one blocked source read and three unresolved metric/release/rights questions retained | Clarify inconsistent bug-frame tallies, GliDe soft-score/matched-pair denominators, V* retrained baseline, and SceneSmith tie/cost conditions. Recover six immutable source files with matching prior fingerprints. Unavailable source and unresolved licensing remain unknown. |
| [Provider boundaries](generative-api-boundaries.md), [delivery contracts](generation-delivery-contracts.md), [tool summaries](generative-tools-research.md) | Nine targeted primary-page groups: Meshy, Luma, Runway, ElevenLabs, Tripo, Rodin and Firefly | Existing scoped terms, retention and task-state summaries matched the checked sections. Add the Firefly tutorial's inconsistent model-ID keys and unbounded status-based polling caveat. This is not a full agreement review or API test. |

Metrics retain their original evaluation population, judge and denominator. A source snapshot identifies the evidence read, not an installed SDK or current compatibility guarantee. License descriptions do not decide eligibility for a particular project.

## Gameplay, benchmark identity and motion follow-through

A further targeted pass checked narrative/state contracts and the evidence behind benchmark release claims. The engine/gameplay/studio review covers 30 claim groups, with remaining unreviewed operations explicitly outside that scope. Corrections preserve Yarn Unreal prerelease status, Unity observer/reset behavior, historical League determinism assumptions and Nakama result-versus-commit boundaries. A narrowly qualified retry-exhaustion edge is static source analysis at the cited commit, not a reproduced server defect.

The benchmark review covers 18 checked groups, one documented reproduction blocker, four unknowns and two explicitly unreviewed groups. It corrects an unsupported SWE-Game paper/catalogue association: similarly named resources with different task populations cannot establish one another's release. OpenGameEval's paper expressly describes its private session driver/system prompt and text-only observation condition. Those published limitations are kept separate from untested live-service behavior. WebGameBench quality rates are conditional on valid labels and require a separate coverage denominator; JAMER's offline model-generated configuration and inconsistent printed BAS dimension count remain explicit limitations. Recovered OpenGameEval source pins do not pin its private hosted service.

A targeted [testing-library](game-testing-library.md) motion review verified the 100STYLE actor/frame-rate/license scope, AMASS purpose/distribution restrictions and the SMPL-Body subset boundary. 100STYLE uses one actor across styles, so a held-out-style split does not establish unseen-performer generalization. CMU's source could not be refreshed because fetches timed out; this does not establish removal or changed terms. The remaining testing-library entries were not freshly recertified.

## Specialized website collections: fixture and interface review

This follow-through reviews selected claims in the dedicated testing and agent collections, which are separate from the 109 primary catalog cards above. Source inspection does not certify a playable installation, safe agent execution, or rights for a particular reuse.

The seven asset-library entries received targeted licensing/access checks. Three were refined: Quaternius now records the cited example pack's release-sensitive rig, Unreal export, frame-rate and root-motion changes; Fab distinguishes Reference-Only access from source-format delivery; OpenGameArt separates preview rights from downloaded asset licenses. Kenney, Poly Haven, ambientCG and Unity Asset Store retained their checked scoped descriptions. These checks cover the cited sections, not every listing or the full legal agreements.

Twenty game-project/environment entries received bounded source checks; thirteen have interface, version, setup or license refinements. This includes distinguishing MiniGrid visibility wrappers, privileged Crafter metadata, Craftax auto-reset output, NLE/GodotRL seed paths and ML-Agents decision timing. Source pins identify inspected code, not installed releases. Two access checks were blocked: the SuperTux browser URL returned 502, and the Luanti ContentDB route showed a bot challenge. Separate official sources were available, so neither result establishes removal.

| Testing entry | Outcome | Checked scope |
| --- | --- | --- |
| `minigrid` | Refined | Python/OS support and Gymnasium interface; Apache-2.0 repository notice; Partial versus full RGB wrappers; Reset seed and separate terminated/truncated return |
| `crafter` | Refined | Classic Gym reset/step contract; Constructor seed plus incrementing episode counter; Privileged info and RGB observation separation; Action recording requires save_episode; Repository MIT notice and registered environment IDs |
| `craftax` | Refined | Explicit pixel/symbolic and classic/full factory variants; Auto-reset substitutes next-episode observation/state; JAX key usage and no-auto-reset warning; Documented gameplay/reward errata at 1.5.0 and 1.6.0; Repository MIT notice |
| `vizdoom` | Refined | Wheel platform/version caveats; Gymnasium frame_skip, available button space, reset(seed) and timeout flag; Original ViZDoom code versus ZDoom components and Freedoom/original WAD distinction |
| `nethack-learning-environment` | Refined | Maintained source, NetHack 3.6.7 baseline and build prerequisites; Observation-key and action configuration; Gymnasium seed does not directly set NetHack core/display RNGs in inspected reset code; Explicit seed/reseed/lgen interface, calendar-effect option and NetHackChallenge exception; NGPL repository notice |
| `godot-rl-agents` | Refined | Editor/.NET quickstart and platform support wording; Binary launch sends env_seed; reset(seed) does not send seed; Scene reset/replay determinism is not established by bridge interface; MIT toolkit notice and separate Cartoon Plane CC BY 4 attribution |
| `unity-ml-agents` | Refined | Release compatibility guidance and development instability; Apache-2.0 toolkit notice; Release 23 low-level API: behaviors/agent IDs, decision batches, terminal batches and variable Python-step duration |
| `godot-demos` | Refined | Source branch versus matching engine guidance; MIT repository notice; Official web page redeploys every master commit and excludes unsupported demos |
| `supertux` | Retained | Source gameplay/control overview and build-document entry; GPLv3 repository license text and README CC-BY-SA data statement; Official downloads page links hosted browser build and lists desktop stable 0.7.0 / downloadable WebAssembly 0.6.3 |
| `endless-sky` | Retained | Official source build/release routes and plugin support; GPL-3+ default and per-file artwork copyright inventory; Free Steam listing |
| `ddnet` | Retained | Source build/release routes; zlib project code and data license exceptions; Free Steam listing |
| `wesnoth` | Refined | GPLv2-or-later code notice; copyright is not an asset inventory; copyrights.csv is the file-level inventory; Official policy distinguishes core GPL/CC BY-SA artwork from add-ons that can include NC/ND; Steam product page source retrieved |
| `mindustry` | Retained | Java/Gradle build guidance and GPLv3 repository notice; Author itch page uses name-your-own-price and lists desktop/server packages |
| `openttd` | Retained | GPLv2 plus dependency exceptions and separate base-set install; March 14 2026 official Steam/GOG change overrides stale README free-storefront wording; Official site remains free; paid bundle route for new Steam/GOG acquisitions |
| `supertuxkart` | Refined | GPLv3-or-later code scope; Mixed data licenses and per-directory licenses.txt records; Official licensing guidance requires asset provenance |
| `luanti-minetest-game` | Refined | Game is maintenance-only with rolling releases and legacy stable tags; Game media CC BY-SA 3.0 and code LGPL2.1 notice; Separate engine license reviewed at pinned luanti-org/luanti LICENSE.txt |
| `red-eclipse` | Retained | zlib project code with separate content notices; Default CC BY-SA 4.0-or-later absent explicit content notice; license inventory exists; Steam is free and advertises Windows/Linux, not macOS |
| `zero-k` | Refined | Game-module repository declaration is GPLv2; README explicitly excludes infrastructure, tools and artwork sources; separate lobby required; Steam product page source retrieved |
| `unity-boatattack` | Refined | Git LFS source requirement; ProjectVersion 2020.3.23f1 at pinned source; Addressables build required before player build; Unity Companion License for Unity-dependent project |
| `unreal-lyra` | Retained | Official documentation acquisition route and compatible-engine requirement; Fab listing Free, UE-Only and Allows usage with AI: No; Existing card appropriately avoids interpreting the AI field as universal prohibition on coding assistance |

The thirty agent-interface resources received primary-source spot checks; ten had deeper execution/permission/verification boundary checks and refinements, while twenty had limited source checks only. The [interface evidence note](agent-interface-evidence.md) maps those ten changes to exact source revisions. No entry received comprehensive claim-by-claim recertification or runtime validation. Static parser/authentication/path observations remain revision-specific source analysis.

## Remaining motion and creator-case follow-through

A follow-through checked the five motion entries outside the earlier four-entry pass. Kenney Animated Characters, Quaternius Universal Animation Library and the explicitly dated Mixamo terms retained their scoped descriptions. LaFAN1 now identifies its supplied transition metrics, 30 fps and performer-held-out split, and distinguishes noncommercial adaptation from sharing adapted data. SMPL-Model now identifies specified permitted purposes, redistribution/commercial-training restrictions and registration. These changes were independently source-reviewed; no motion files were retrieved or retargeted. The earlier CMU source-refresh blocker remains unresolved, and original-data rights do not automatically cover an associated mesh or tool.

The creator-case review separates client/model attribution, source availability and startup instructions from hosted runtime verification. Vibe Jet's local recipe now includes both its static-file server and WebSocket process; a client connection to localhost does not establish a loopback-only server binding. Evidence: [setup README](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/README.md), [package scripts](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/package.json), [server](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/server.js), and [browser client](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/game.html). Current hosted availability was not established by that source check.

Dinosaur Game Offline retains an explicitly attributed historical catalog report of Chromium smoke testing and jump capture. The [inherited card](https://github.com/OpenEnvision/GameMap/blob/617556b5e193cecbd144bb2f702dc10c82fe8e9e/website/src/data/geminiCliCases.ts) contains that report; the underlying run record was unavailable to this review. Source inspection supports controls and creator attribution, not independent validation of the earlier playtest. No new browser gameplay test was performed.

Across two disjoint 22-case passes, all 44 creator-case entries received a bounded attribution/source/startup review. Existing client-versus-model mappings were retained. Vibe Jet's startup recipe changed, and Dinosaur's historical run report was qualified. This does not verify authorship, autonomous generation, every source file, current hosted playability, or actual gameplay. Four OpenGame cases were checked through gallery evidence and Git LFS archive metadata; their archive contents were not downloaded or inspected. Two hosted text reads (Ombres and FragArena) were inconclusive, with no inferred outage.

| Creator-case ID | Review outcome | Primary evidence sampled |
| --- | --- | --- |
| `agent-arcade-copilot` | Attribution/source description retained | [Source](https://github.com/DanWahlin/agent-arcade/blob/99b7466f0d911652aff24843641cfb59e67be38b/README.md) |
| `bash-fighter-agent` | Attribution/source description retained | [Source](https://github.com/Bash-Entertainment/bash-fighter/blob/ad414e2548ef1255c6fd303965ecfc7dfea5f422/README.md) |
| `beach-kitty-ai-campaign` | Attribution/source description retained | [Source](https://github.com/matthewod11-stack/CatRunner/blob/1a76234d8ebb4acec2ff2fb954c01ff04f56ed1b/README.md) |
| `claude-agent-team-tetris` | Attribution/source description retained | [Source](https://github.com/caiguanhao/tetris/blob/b8c0f68017c0d08702027839b42bdafebdb79e93/README.md) |
| `claude-mini-snake` | Attribution/source description retained | [Source](https://github.com/BizShibe/claude-ai-mini-snake-game/blob/b7859f51c909f1862aa9299451477060ec20a526/README.md) |
| `claude-tower-defense` | Attribution/source description retained | [Source](https://github.com/mdkess/claude-game/blob/8b02fe3de81755536d8cb7376fc47db093a8ae00/README.md) |
| `cloud-crush-gemini-cli` | Attribution/source description retained | [Source](https://github.com/GoogleCloudPlatform/devrel-demos/blob/fc49cc3531ec79fb142b6300b0a45fe3693556f9/codelabs/gemini-cli/gemini-cli-match3-golang/README.md) |
| `cursor-destruction-derby` | Attribution/source description retained | [Source](https://github.com/littleearth/vibe-coded-games/blob/093a84e31a20a55fa896f177eb7dfe1e68ad8a74/README.md) |
| `cursor-procedural-platformer` | Attribution/source description retained | [Source](https://github.com/commjoen/generated-game-experiment/blob/0f5a0cdaa0742ecdfeb12f1572676d1e82042688/README.md) |
| `cursor-space-shooter` | Attribution/source description retained | [Source](https://github.com/littleearth/vibe-coded-games/blob/093a84e31a20a55fa896f177eb7dfe1e68ad8a74/README.md) |
| `deepseek-mini-ksp` | Attribution/source description retained | [Source](https://github.com/BairlyEmei/mini-ksp/blob/de38be79fe88a72e87c4f170bdae76147923c9f0/README.md) |
| `deepseek-neon-snake` | Attribution/source description retained | [Source](https://github.com/TwitchCaptain/snake/blob/3c7f8e947412598c67d6a0b61ed1a5cc7ed32935/README.md) |
| `dinosaur-offline-gemini-cli` | Historical test provenance qualified | [Source](https://github.com/tonidevvn/dinosaur-game-offline/blob/e0f3f584751bb80425bd49513fa7b54503f13d62/README.md) |
| `dragons-reach-claude` | Attribution/source description retained | [Source](https://github.com/jaydemks/ImADragon_onepromptcode_game/blob/e898e72ae95c31391cbe7c046fa5d6f04ba3e438/README.md) |
| `dunkirk-ai-assisted` | Attribution/source description retained | [Source](https://github.com/Ponloe/dunkirk-godot/blob/fa0858d1647b0a15f6d84d8d6b3b93262e3fb07c/README.md) |
| `flux-codex-runner` | Attribution/source description retained | [Source](https://github.com/scriptedbyshivam/codex-hackathon-2026/blob/a0df87d73e2a77d9a4c3b88d52e22229a6dc6256/README.md) |
| `fragarena-copilot` | Attribution/source description retained | [Source](https://github.com/jonnyleigh/fragarena/blob/6487c94ab558fe78ccb7db997004ff7cba00646e/README.md) |
| `garden-match-agents` | Attribution/source description retained | [Source](https://github.com/kevinchenkai/GameAI/blob/8bb87ee5c2698922f79f9b277d97b1392f38d0e2/README.md) |
| `gemini-kymograph` | Attribution/source description retained | [Source](https://github.com/JoeySalmons/vibe-coded-games/blob/e62764a6bef23095984f866a15ed646682d6c912/README.md) |
| `gemini-pirate-fleet` | Attribution/source description retained | [Source](https://github.com/JoeySalmons/vibe-coded-games/blob/e62764a6bef23095984f866a15ed646682d6c912/README.md) |
| `gemini-pumpkin-hunt` | Attribution/source description retained | [Source](https://github.com/JoeySalmons/vibe-coded-games/blob/e62764a6bef23095984f866a15ed646682d6c912/README.md) |
| `gothicvania-codex` | Attribution/source description retained | [Source](https://github.com/acatovic/gothicvania-codex-demo/blob/0d53658306f9565bdea20173fd4387e48ca6066c/README.md) |
| `gravity-birds-grok-cursor` | Attribution/source description retained | [Source](https://github.com/az9713/grokbot-game-dev-demo/blob/c19786fc5a43303ed5183a8563f518ccdfcaa0c0/README.md) |
| `long-wind-claude` | Attribution/source description retained | [Source](https://github.com/jbang2004/long-wind/blob/1e9c4265ad2a7d06a174c8ac5f3ab64bc18252f3/README.md) |
| `michi-neko-ai` | Attribution/source description retained | [Source](https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path/blob/4a592079967c711ef2233b0b5fc2f43155922588/README.md) |
| `moonlight-mayhem-codex` | Attribution/source description retained | [Source](https://github.com/simonw/raccoon-heist-codex/blob/8969afe2141522079792effc0c018d154319ceef/README.md) |
| `nova-lancer-claude` | Attribution/source description retained | [Source](https://github.com/tanuu5/nova-lancer/blob/dd5d3842609af266c1d3b6179ff03d09d0a66036/README.md) |
| `ombres-claude` | Attribution/source description retained | [Source](https://github.com/briossant/ombres/blob/403840d83740eee4e264e7a1cc04390b8d346787/README.md) |
| `opengame-arithmancy-card-battle` | Attribution/source description retained | [Source](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md) |
| `opengame-mandalorian-shooter` | Attribution/source description retained | [Source](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md) |
| `opengame-marvel-platformer` | Attribution/source description retained | [Source](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md) |
| `opengame-tower-defense` | Attribution/source description retained | [Source](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md) |
| `operation-naptime-claude` | Attribution/source description retained | [Source](https://github.com/alandaitch/operacion-siesta/blob/8157953526d0ff5a3d7c5b0a543f4c64dbb4c6bf/README.md) |
| `orb-shooter-ai` | Attribution/source description retained | [Source](https://github.com/theredstapler/orb-shooter/blob/29683f88ebdf304c159683be250be91b47911682/README.md) |
| `pixel-princess-claude` | Attribution/source description retained | [Source](https://github.com/VTvito/pixel-princess-platformer/blob/ba20bc410b446c970df3c8fc10ad9fc31a425e28/README.md) |
| `quasar-saz-claude` | Attribution/source description retained | [Source](https://github.com/cleak/quasar-saz/blob/e56e93ea8c72cbe2ff9f1e754eb68f6829e6ae43/README.md) |
| `raccoon-heist-claude` | Attribution/source description retained | [Source](https://github.com/simonw/raccoon-heist/blob/7f12841301bfb140d9c6b21c0a69fccb94b512bc/README.md) |
| `running-man-claude-pixellab` | Attribution/source description retained | [Source](https://github.com/balbonits/ai-browser-game-demos/blob/a535c09029986ff62cc68a44fe35dbc29d022b79/README.md) |
| `slide-rush-opus` | Attribution/source description retained | [Source](https://github.com/KJLKurt/waterslide-game-opus-5.5/blob/03bc5993750ba870f12de3c6086e15877b62de09/README.md) |
| `the-tithe-claude` | Attribution/source description retained | [Source](https://github.com/miguelsolorio/the-tithe/blob/da42501c6188fd897567b82d28695eb8d947c03c/README.md) |
| `tower-of-time-ai-build` | Attribution/source description retained | [Source](https://github.com/maciej-trebacz/tower-of-time-game/blob/a2497fb8aaf497c25a9caa306ed7ac7129d2400b/README.md) |
| `tron-exonix-claude` | Attribution/source description retained | [Source](https://github.com/witnesstodark/tron-exonix/blob/e60a7570e63476294163e7729be69f1e2460670c/README.md) |
| `turbo-kart-rally-claude` | Attribution/source description retained | [Source](https://github.com/bridge-mind/turbo-kart-rally/blob/c52aca3f10c7995884c316810cac6514daa40e9c/README.md) |
| `vibe-jet-gemini` | Startup refined | [Source](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/README.md) |

## Focused OSSGameBench release review (2026-10-18)

This follow-up resolves the author-linked release identity left open by BC24. The [evaluation dossier](game-development-evaluation.md#adjacent-dataset-worth-retaining-not-an-agent-leaderboard) now distinguishes Zenodo v3 publication from technical metadata dates, records the four-file inventory and verified archive checksums, and qualifies record-level CC-BY-4.0 rights. Historical v2 separately lists a large dataset archive that was not downloaded.

The paper, release metadata and small collection/analysis artifacts were inspected. Static source review identified nested pagination caps and a link-cleanup path that can discard earlier regex-only links; no completeness defect in the published corpus was measured. Full corpus retrieval, upstream rights inventory, executable repair evaluator, held-out splits and contamination controls remain unverified. Proposed adaptation gates are editorial recommendations, with no benchmark or collector execution. This is a targeted release review, not a fresh audit of every benchmark claim.

## Focused harness-selection methods review (2026-10-18)

Added complementary source-backed [statistical and judge boundaries](benchmark-reproducibility.md#harness-selection-statistical-independence-and-adaptive-feedback): rliable's best-of-N sampling interpretation and specific bootstrap API paths, Thresholdout's bounded-feedback assumptions, and MT-Bench/FastChat's text-judge order checks. Exact rliable and FastChat code revisions are linked alongside versioned papers. Game-production sampling, visual-judge controls and promotion rules remain explicitly proposed adaptations. This review does not certify a game evaluator, transfer historical accuracy/coverage rates, or establish execution, sufficient sample size, project-family independence or protected-holdout guarantees.

## Focused procedural-navigation contract review (2026-10-18)

Extended [engine operation contracts](engine-operation-contracts.md#navigation-after-procedural-world-edits) beyond request acceptance to query completeness, endpoint projection, sliced-query ownership, tile-reference freshness and obstacle-rebuild status. The review uses pinned official Recast/Detour source plus Unity 6000.0 and experimental Godot 4.5 documentation. Static edge cases are explicitly unreproduced and are not transferred to engine wrappers. Proposed disconnected-island, wrong-floor and blocked-route fixtures remain unimplemented; no actual character traversal, persistence, cancellation rollback or crash recovery is certified. Asset-validation and production-gap links now point to this narrower evidence.

## Focused animation sampling and compression review (2026-10-18)

Added [rig-compatible pose and compression gates](asset-validation-contracts.md#animation-sampling-and-compression) from pinned ozz-animation 0.17.0 and ACL's inspected 2.1.99 develop snapshot. The review distinguishes count checks from joint identity, partial-output sampling from full-pose acceptance, optimizer error from final decoded error, and loop samples from root displacement. Official headers, implementations, samples, metric guidance and license files were source-inspected; independent review sampled the consequential claims. The source ordering-comment discrepancy is preserved rather than silently resolved by assumption. Proposed rig, skin, contact, seek/cache and loop fixtures remain unimplemented. No library execution, target-engine compatibility, continuous-time error bound, performance comparison or motion-quality result is claimed.

## Focused narrative and optimizer execution-contract review (2026-10-18)

Closed the earlier Yarn Godot source-pin blocker and refined [gameplay-state contracts](gameplay-state-contracts.md): internal stale-continuation guards do not cancel external world effects; teardown/reentrant finishing can omit terminal signals; variable restoration is not an atomic game checkpoint. Added [GEPA execution boundaries](benchmark-reproducibility.md#gepa-execution-controls-counts-caches-and-resumed-evidence) at the existing inspected revision, separating iterations from proposal tasks, stop checks from admission control, callable cost tracking from actual spend, and cached/resumed evidence from independent trials. Independent source review checked consequential claims and corrected the distinct new-seed resume path. No upstream software, engine, model or evaluation was run; acceptance fixtures remain proposals, and purpose-specific licensing cautions remain intact.

## Focused localization and audio observation review (2026-10-18)

Added [runtime locale-change boundaries](engine-operation-contracts.md#runtime-locale-changes-separate-string-delivery-rendering-and-accessibility) from Unity Localization 1.5 documentation and Godot 4.5-stable source at its resolved commit, separating ignored refresh requests, delivered strings, rendered layout and native accessibility observations. Added [FMOD event-versus-audibility boundaries](native-operation-details.md#distinguish-fmod-event-lifecycle-from-audible-completion) from 2.04 documentation, distinguishing callbacks, playback enums, API results, pause, explicit stealing modes and Core-versus-Studio virtualization. Independent review checked consequential source claims, timing qualifiers and source locations. This supplements existing font/DOM/scheduling limits; no engine, screen reader, audio runtime, physical device, cross-platform synchronization or license entitlement was tested. Proposed fixtures remain unexecuted.

## Focused content-pack activation review (2026-10-18)

Added a [Godot 4.4 patch-activation contract](production-work-orders.md#godot-44-content-patches-mounting-is-not-dependency-activation) separating pack mounting, path replacement, resource existence and warm-cache dependency behavior. Official 4.4 documentation and fixed 4.4-stable loader source corroborate the ordinary-ignore versus deep-ignore distinction; independent review checked source/version scope and the separate C# assembly-loading requirement. Cold/warm-cache, collision and missing-dependency fixtures remain unimplemented. No runtime, rollback, signature trust, cross-version compatibility or deterministic-export result is claimed.

## Focused GameASG-Bench release and scoring review (2026-10-18)

Added [GameASG-Bench](game-development-evaluation.md#6-gameasg-bench-declare-behavioral-testability-before-generation) after checking the existing catalog, dossiers and candidate corpus for duplicate identity. The paper links the official repository; this review pins its release separately, confirming 47 task prompts and behavioral suites, declared state contracts, Chromium input, evaluation mounts and strict-score accounting. Independent review checked P0/P1 applicability, missing-summary denominators, recorded rather than authenticated generation metadata, license scope and the absence of released HTML artifacts. Floating runtime dependencies, unreleased reference implementations, adversarial state-reporting robustness and actual visual/gameplay quality remain unverified. No benchmark, container, game or model was run, and paper results are not reproduction results.

## Focused GBQA identity and protocol review (2026-10-18)

Added [GBQA as a bounded QA protocol and partial-artifact note](game-development-evaluation.md#7-gbqa-keep-defect-discovery-separate-from-generation-and-repair), not a runnable full-benchmark card. Author-associated links establish repository identity, while two fixed snapshots distinguish a one-game/three-annotation paper-era example from later hinted tasks and binary localization scoring. Independent review checked the 30-game/124-defect paper scope, the three-current-tasks-versus-three-games distinction and license-file observations. Absence claims apply only to inspected snapshots; the designated full experimental revision, corpus, configuration, execution and reproduction remain unverified. Defect discovery/localization is not generation or repair success.

## Focused Play2Code demo-source follow-up (2026-10-18)

Narrowly resolved the [Play2Code demo-source pin and root license](game-development-evaluation.md#3-play2code--playtestarena-separate-refinement-feedback-from-final-judging) through author/profile/project-domain evidence and a complete fixed tree. Eight static demo directories are distinct from the paper’s full PlaytestArena task/rubric corpus and evaluator. Independent review checked identity, the static gallery/server role and Apache-2.0 terms; no demo execution, paper reproduction or third-party asset-rights clearance is claimed. The other existing full-release gaps remain bounded unknowns rather than absent-project assertions.

## Focused Wwise authoring output review (2026-10-18)

Added a version-scoped [Wwise 2024.1.9 SoundBank generation/capture contract](generation-delivery-contracts.md#capture-wwise-authoring-soundbanks-before-testing-runtime-playback): synchronous completion, default no-disk output, auto-defined-bank inclusion, language-selection overrides, returned log limitations and whole-cache clearing. Independent review retrieved the official page and corrected the `skipLanguages` exception. Notification schema, delivery/replay ordering, timeout cancellation, retry safety, native loading and playback remain unverified. The historical 2017.2.0 bank/callback notes retain their own scope; no SDK, authoring application or runtime was executed.

## Focused OpenUSD dependency and package acceptance review (2026-10-19)

Added [OpenUSD v25.05 packaging scope](asset-validation-contracts.md#openusd-packaging-dependency-discovery-is-not-portable-closure) from fixed official headers and implementations. Independent review checked recursive discovery outputs, unresolved-reporting exclusions, authored variants, ignored directories, in-place edits, conditional ARKit flattening and branch-specific skipped-member handling. The archive Save condition remains distinct from the base writer’s flag. Proposed manifest, package membership and relocated-consumer fixtures remain unexecuted; no reproduced defect, universal dependency closure, runtime compatibility or interrupted-write durability is claimed. Existing composition, MaterialX and renderer-specific evidence is preserved.

## Focused Godot normalized-key and retarget acceptance review (2026-10-19)

Added [Godot 4.4-stable retarget acceptance](asset-validation-contracts.md#godot-retargeting-normalized-keys-are-not-controller-travel) from fixed importer, AnimationMixer and class-reference sources. The bounded review distinguishes retained versus recomputed motion scale, normalized imported keys, receiving-skeleton postprocessing, extracted displacement, blended accumulators and controller travel. The scale-doubling oracle is a qualified, unexecuted proposal; no defect reproduction, stride/contact guarantee or cross-version behavior is claimed. Existing runtime animation observation gates are linked rather than duplicated, and no resource record or engine execution was added.

## Focused browser virtual-time acceptance review (2026-10-19)

Added [browser-game virtual-time boundaries](benchmark-reproducibility.md#browser-game-virtual-time-stepping-and-suspension-are-different-experiments) from pinned Playwright v1.64.1 documentation, implementation and inspected test sources. The bounded review separates stepped callbacks from suspension-style jumps, synthetic animation/performance clocks from native measurement, endpoint follow-ups, context scope and post-error state. Nine saved source files were hash-verified; upstream tests are static evidence, not executed results. Four proposed fixtures remain unimplemented and unexecuted; no browser/game run, deterministic simulation, external-clock synchronization or real-time performance claim is added.

## Requested Cadle-like corpus import (2026-10-18)

The [repository ledger](cadle-repositories.md) preserves all 212 candidates from the user's pinned prior research plus the separate Cadle reference. Every requested identity has a machine-checked row; eight already have related GameMap coverage, and confirmed transfers are distinguished from independently found alternatives. Source review varies by row: metadata, README/project guidance and selected license files. Eight requested locations could not be inspected, and thin/metadata-only evidence remains explicit. Restricted licensing, unsupported versions, incomplete scaffolds and AI-provenance ambiguity are retained. The original ranking and historical feature counts are not promoted to current verified claims. This import adds searchable research coverage, not 213 playable-case or executable-support certifications. Independent review sampled consequential source claims and checked complete inventory/rendering consistency; no game or external repository scripts were executed.

### Cadle thin-evidence and unavailable-identity follow-up (2026-10-18)

The complete 213-row inventory is unchanged. Eight of the nine metadata-only rows now have pinned nested documentation, manifests and bounded static source evidence, yielding 204 source-reviewed rows, one metadata-only placeholder and eight unavailable requested locations. This review covers source-described controls, game loops, networking interfaces and package/media license scope; it does not verify execution, authorship, gameplay completeness or rights clearance. The new claim-to-file evidence is retained in the downloadable ledger. Dust Arena’s historical same-owner source is distinguished from current availability; the Miniplex ecosystem recommendation is dated and attributed, and the nengi publisher link corroborates an alternative without proving a transfer. No unavailable identity was silently replaced. Independent review checks the consequential new source claims and generated inventory consistency, rather than re-certifying all prior rows.

### Native replay and physics checkpoint contracts (2026-10-18)

The [gameplay-state dossier](gameplay-state-contracts.md#unreal-replay-reconstruction-checkpoint-fidelity-and-reset-boundaries) adds a scoped review of three Unreal Engine 5.6 official pages and MuJoCo 3.3.7 documentation/source at f1d45bd5422c74beddfb0d1deb590a02583d21de. Coverage includes replicated reconstruction, multi-frame checkpoints, replay/shared-world side effects, storage and stop boundaries, state-mask inclusion, model-dependent arrays, observation recomputation, callbacks, warmstart and plugin-state scope. Independent review checks the consequential API and source claims and generated navigation. Proposed acceptance fixtures are unimplemented; seek ordering, atomic durability, cross-version migration and actual application reset remain explicitly unknown. Existing Jolt and narrative contracts are cross-linked rather than re-certified or duplicated.

### Production-route consolidation (2026-10-18)

Read-only cross-dossier audits found no material factual contradiction in the sampled operation/state/evaluation boundaries. This maintenance pass links all twelve existing production stages to their documented interfaces, expected artifacts and proposed gates; connects the nine work orders to deeper contracts; resolves two dangling native-operation references; and links generation delivery to asset validation. It removes a stale source-index count and qualifies the Yarn discovery pointer using existing scoped research. No new upstream evidence, runtime validation, capability eligibility or completeness claim is added. Version-specific differences remain intact.

### Material verdicts and render-pass artifacts (2026-10-18)

The [material validation section](asset-validation-contracts.md#materialx-graph-generated-code-and-compiler-verdicts) adds independently reviewed MaterialX v1.39.4 tag, script, generation guide and license evidence at commit 270b5cf2ae2be24a3b6ef4b0569f1c93038dda1d. The review distinguishes document validity, optional validator invocation, text-based verdict aggregation, expected element coverage and partial output from target-renderer acceptance. The [render-pass section](visual-evidence-research.md#render-pass-and-matte-artifacts) adds versioned Blender pass/API/AOV/matte/export semantics and Psyop documentation at 968d5e4b6171e29ba5f89d554117132a164e747e. Independent source checks cover filtering, renderer/blur restrictions, masks versus pick previews, metadata and resampling limits. Some official Blender pages were retrieved through indexed versioned documentation when direct opens failed. Proposed fixtures remain unimplemented; no compiler failure, render, engine-buffer equivalence or numerical tolerance was reproduced.

### Texture validation and transcode policy (2026-10-18)

The [KTX contract](asset-validation-contracts.md#ktx-validation-policy-normal-map-packing-and-transcode-targets) adds five implementation/help files from KTX-Software v4.4.2 at 4d6fc70eaf62ad0558e63e8d97eb9766118327a6 and the glTF Basis Universal extension at 521a91d491f02bb7db7d445b35f591d09d2a64ce. Independent review checked annotated-tag resolution, tag/commit byte identity, validator flags/report/exit boundaries, normal-map channel mapping, two-component normalization, transcode eligibility/default outputs and normative-versus-recommended glTF constraints. The live tool reference identified itself as 5.0.0 when checked; newer live options are not attributed to the selected release. Missing JSON after early errors and generic normal packing versus standard glTF usage are explicitly qualified. Proposed negative fixtures, GPU compatibility and alpha/appearance fidelity remain unexecuted.

### Engine-owned capture lifetime and freshness (2026-10-18)

The [frame-readback section](visual-evidence-research.md#engine-frame-readback-and-capture-ownership) adds independently reviewed official Unity 6000.0 and Godot 4.5 documentation for frame readiness, one-frame borrowed results, target/NativeArray ownership, format/extents, Editor batch-mode limits, copied Images, viewport update policy and HDR interpretation. The source review distinguishes a globally completed draw from a particular target updating, and a copied Godot Image from Unity request data lifetime. Sources are versioned documentation rather than immutable engine implementations. Proposed rendered markers, failure classifications and capture-validity fixtures remain unimplemented; no engine, GPU readback, headless-player configuration or numerical image comparison was executed.

### Procedural scene provenance and lossy export (2026-10-18)

The [Infinigen contract](production-research-notes.md#infinigen-staged-generation-and-export-acceptance) reviews official documentation and task/manager source at 224598d4a2ff95b4fc928e72c222598b7122c698. It separates legacy 1.19.1 scene/export behavior from the 2.0.0a3 preview, documents the seed reproducibility warning, camera/config inputs, stage markers, conditional config recovery, dependency symlinks, cleanup and four-channel/full-scene export limits. Independent review checked these technical boundaries and looked for separate generated-output terms in the official site/docs/license context; no general output grant was located in those inspected sources, without concluding use is prohibited. No generator, Blender, exporter or consuming engine was executed. Marker success and exported files remain distinct from verified artifacts, appearance and gameplay readiness.

### Geometry-to-collider acceptance (2026-10-18)

The [collision-cooking section](asset-validation-contracts.md#collision-cooking-and-gameplay-shape-acceptance) adds ten independently reviewed official Unity 6000.0 pages on preprocessing flags/input validity, readability/transforms, BakeMesh reuse and concurrency, assignment rebuilding, convex representation limits, and query/contact observation scope. The documented 255-triangle limit is retained without inferring a source-polygon threshold or guaranteed cook success; shape clearance/thickening and per-mesh scheduling remain separate gates. Versioned documentation is not an immutable engine/PhysX implementation pin. Unsafe-input and race fixtures are explicitly preflight/scheduler checks, not instructions to provoke undefined native behavior. No cook, profiler, contact simulation, performance result or target-engine compatibility was executed or certified.

### Runtime animation observation (2026-10-18)

The [runtime-animation section](engine-operation-contracts.md#runtime-animation-observation-gates) adds six independently reviewed official Unity 6000.0 and Godot 4.4 references. Coverage includes visibility/culling, evaluation clocks, pre-IK movement callbacks, root-motion ownership and reinitialization, immediate pose versus skipped events, completion signals, deferred method calls and animated-node caches. Versioned documentation does not pin an installed engine implementation. Proposed pose/event/movement fixtures remain unexecuted; renderer synchronization, completed application side effects, contact correctness, rollback and deterministic replay are not established.

### Joint and articulation acceptance (2026-10-18)

The [joint-observation section](production-debugging-contracts.md#joint-and-articulation-observation-contracts) adds 19 independently reviewed Unity 6000.0 references. It covers endpoint/physics-scene identity, anchor frames, degree-versus-radian interfaces, body/DOF mapping, drive/solver-load observations, projection limitations and break-event identity. The same-version API/manual conflict on free-axis break torque is preserved explicitly rather than resolved by assumption. Proposed fixtures constrain lock changes to valid configurations and remain unexecuted. Exact-patch behavior, settling/contact success, persisted identity, rollback and simulation determinism remain unverified.

### Input delivery and observation alignment (2026-10-18)

The [input-consumption section](native-operation-details.md#input-delivery-and-observation-alignment) adds independently reviewed Unity Input System 1.9.0 evidence at 73feff4267461a868fdfc3fa43f112de1f5312c1 and Godot 4.5.0 stable evidence at 876b290332ec6f2e6d173d08162a02aa7e6ca46d, alongside versioned official documentation. Review covers queue copying and discard, update/action phases, focus/device reset, polling versus routed input, reference buffering/accumulation, conditional flushes and internal release ordering. The event-lifetime precaution is a source-derived hypothesis, not a reproduced failure. Proposed trial, handler, state-revision and frame markers remain unimplemented; input-to-rendered-response alignment, cancellation of game effects, platform focus equivalence and complete reset are explicitly unresolved.

### Pi evidence lifecycle and interrupted execution (2026-10-18)

The [pi subsection](visual-evidence-research.md#pi-evidence-lifecycle-and-interrupted-execution) extends source inspection at the existing current 482c1381a00d8d00bc81697e4a980c593db6803e pin. Independent review checked ten implementation/documentation files for session replacement and settlement, cooperative cancellation, explicit nested-signal replacement, result hooks and image normalization, request-time context composition, branch projection and text-only compaction. Tool-result text longer than 2,000 characters is truncated to that prefix plus a marker, while shorter text is unchanged; original-image fallback is scoped to processImage returning ok:false. The proposed visual-selection × retention experiment is unexecuted editorial design. No model request, engine mutation, interruption recovery, provider image handling or benchmark benefit was reproduced.

### Harness composition and accounting (2026-10-18)

The [composition/accounting section](benchmark-reproducibility.md#harness-composition-and-evaluation-accounting) extends the existing GEPA f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819 and Meta-Harness 8123ccabe2b19fa1123090b2e5f1bacc20963ce8 inspections. Independent review checked eleven linked implementation/documentation files for coupled proposals, whole-text component merge, candidate hashing, evaluation-path counters, partial exceptions/retries, classification import checks, seed/dataset denominators and character-based context metrics. Loader and scoring observations are scoped to the classification example; paper results and current defaults are not equated. Proposed builder validation, independent cost ledgers and missing-coverage fixtures remain unimplemented and unexecuted. No overspending, workflow failure, isolation guarantee or game-production improvement was reproduced.

### Creation-feedback and production-failure evidence (2026-10-18)

The [creation-feedback section](asset-selection-feedback.md#6-mechanism-blindness-and-regressive-scene-edits) adds independently reviewed SimWorlds/4DBuildBench v1 and LEGO-Anything v1 paper/project evidence. It preserves sampled-visual versus mechanism scoring, conditional checkpoint judgments, unequal-budget/multi-component confounds, manuscript/project/ancillary discrepancies and unverified executable-release boundaries. The [studio cases](studio-production-case-studies.md#dead-cells-generation-must-preserve-the-authored-experience) add firsthand Dead Cells and Far Cry 5 production accounts, including authored graph constraints, stale terrain-cache previews, integrated regeneration and navigation/art-direction tradeoffs. Independent review checked attribution, dates and the 145-page primary slide artifact; source-derived lessons remain distinct from proposed fixtures. No production implementation, AI improvement, metric result or causal transfer was reproduced.

### Procedural constraint verdicts (2026-10-18)

The [procedural-layout section](production-research-notes.md#procedural-layout-constraints-and-solver-verdicts) adds independently reviewed WFC de7d22e705e816b62b4d613199d0463820fcaef3 and DeBroglie 27b37fa7a54f7c532b52634622f36eddd2a3c7da evidence. Review covers project versions, finite-limit Boolean return, unresolved export, repeated seeds, three-state conversion, overload-specific backtracking policies, bounded history and relevant-endpoint connectivity. A fresh options object differs from the Boolean constructor; neither behavior is generalized to every library version. No generator or acceptance fixture was run. Solver contradiction, incomplete search, global unsatisfiability, authored progression and actual controller traversal remain distinct claims; these libraries are not attributed to historical Dead Cells production.

### Stateful interaction reduction (2026-10-18)

The [stateful-testing section](gameplay-state-contracts.md#stateful-interaction-discovery-and-failure-reduction) adds independently reviewed official Hypothesis documentation/rendered source labelled 6.170.1. Coverage includes initialization/invariant conditions, factory/teardown scope, generated TestCase defaults, flaky outcomes, cache/seed/blob reproduction limits and executions beyond max_examples. A 2026-10-19 source follow-up pins the state-machine implementation to official v6.170.1 commit `718686d1e392968eb0953c043ef249c5d9d11a59` and qualifies initialization/step coverage: a no-exception result need not contain an ordinary gameplay action or default invariant evaluation. Other rolling documentation and the actual installation remain separate verification obligations. Proposed game-state reset, reduced-trace promotion and full-cost accounting remain unimplemented. No generated test, state machine, game, model or bug-finding gain was executed or reproduced.

### Native semantic observation and actions (2026-10-18)

The [Godot accessibility contract](engine-operation-contracts.md#godot-native-semantic-observation-and-action-completion) adds independently reviewed source evidence at the existing 4.5-stable 876b290332ec6f2e6d173d08162a02aa7e6ca46d pin. Review covers capability versus enablement, inspector/assistive activation modes, queued updates, transient element identity, focus eligibility, deferred action delivery, registration-phase guards and the normal headless SceneTree-to-driver gate. The release announcement is explicitly historical; third-party inventory metadata does not identify an installed library. Custom semantic mappings and the acceptance fixture are editorial proposals. No engine, accessibility observer, screen reader or disabled-player test was run; OS delivery, application-effect completion and accessibility usability remain unverified.

### Gaussian-splat scene delivery (2026-10-18)

The [splat delivery section](asset-validation-contracts.md#gaussian-splat-editing-and-delivery) adds independently reviewed SuperSplat 3.5.2 source at f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b and UnityGaussianSplatting snapshot 2c6fed37da67a217367261fcfcd3316d34c73e76. The latter still declares package 1.1.1 but is distinguished from the release tag's different commit. Review covers editor-project compaction versus baked derivatives, transform/SH conventions, metadata/filter losses, SPZ version mismatch, exact PLY schema, editing/recovery limits, zero-survivor writer return and camera/bounds/render boundaries. License observations apply to inspected software, not arbitrary scene/training/output rights. The proposed bridge and fidelity fixture are unexecuted; no import failure, rendering result, geometry/collision correctness or target-platform compatibility was reproduced.

### Display-aware render differences (2026-10-18)

The [FLIP subsection](visual-evidence-research.md#flip-display-aware-render-differences) adds independently reviewed implementation evidence declaring v1.7 at b475eb4bf394ab877c42166c9eb0a84a02cc5b14, without claiming a resolved release tag. Review covers RGB/linear interpretation, HDR exposure resolution and per-pixel aggregation, Python/CLI tone-mapper normalization differences, viewing parameters, raw versus colorized outputs, the disabled-mean sentinel and binding validation boundaries. The LDR study and official author hindsight were read; the full HDR PDF was retrieval-limited, so detailed HDR mechanics are attributed to code. Malformed inputs and unsafe counts are proposed wrapper-rejection tests, never instructions to exercise the unchecked native path. No metric, failure, candidate ranking, perceptual threshold or game-production benefit was executed or reproduced.

### Game-rule design search (2026-10-18)

The [GAVEL audit](game-ai-notes.md#gavel-rule-design-search-and-verdict-boundaries) extends the existing resource without changing its card. Independent review checked paper v2 against source snapshot 1a849c3ba00c3ecb1194c202451a617ef0556b60 for mutation representation, archive admission/novelty populations, fitness and completion semantics, distinct playout/skill samples, exception/numeric-timeout paths, checkpoint budgets and artifact/rights scope. Differences are recorded as protocols to resolve before reuse, not evidence that the paper ran this exact source. Java source-to-bundled-class correspondence and complete experimental artifacts remain unverified. The inspected operator does not establish a two-parent crossover, while the paper's broader recombination description is preserved in the original card. No model, Ludii process, archive deserialization, candidate evaluation or human-interest benefit was executed or reproduced.

### Lighting bake completion and persistence (2026-10-18)

The [lighting-bake section](native-operation-details.md#lighting-bake-completion-and-persisted-scene-association) adds independently reviewed Blender v4.5.0 source at 8cb6b388974a817afedf1317ce26f0c75aa5f181 and Godot 4.5-stable source at 876b290332ec6f2e6d173d08162a02aa7e6ca46d, with the versioned Godot tutorial kept distinct from immutable class documentation. Review covers target validation, asynchronous operator/modal boundaries, forced internal bake storage, image saving/packing, native editor bindings, atlas/resource write ordering, node associations and misleading completion text. A zero mesh size hint falls back before computed-size validation; CSG conversion is a representation-changing workaround, not itself a documentation contradiction. Proposed disposable-copy, explicit-save and cold-reopen fixtures remain unexecuted. No bake, GPU operation, cancellation, lost data, scene durability or recovery guarantee was reproduced.

### Memory lifetime and retained-resource evidence (2026-10-18)

The [memory-lifetime section](production-debugging-contracts.md#memory-lifetime-across-repeated-production-cycles) adds independently reviewed Epic documentation labelled 5.8, Unity 6000.0, Memory Profiler 1.1.11 and Addressables 1.21.21. These documentation families are not immutable implementation pins or installed versions. Review covers allocation-window predicates, trace channels/destinations, snapshot target and completion semantics, the documented streamed-Player false result, callback-argument prose discrepancy, screenshot/capture serialization, reference-direction limits, observer GC settings, bundle retention and asset churn. The fixed-cycle fixture and receiver-side artifact checks are editorial proposals. No snapshot, trace, leak, memory budget, capture interruption or resource-release experiment was executed; a positive delta or a query named Memory Leaks does not establish a project fault.

### Runtime audio observation integrity (2026-10-18)

The [audio-observation subsection](native-operation-details.md#runtime-audio-observation-and-capture-integrity) adds independently reviewed Godot 4.5-stable source at 876b290332ec6f2e6d173d08162a02aa7e6ca46d and Unreal 5.5 documentation. Review covers effect ordering before bus gain/mute, whole-block capture loss versus unchanged pass-through, buffer clearing/counter continuity, rendered-submix metadata and recording-export completion. Both Godot audio-bus and synchronization tutorials carry 4.5 staleness warnings; the Web-export page independently supports the playback-mode limitation. The experimental Unreal Python surface, unknown clock alignment/listener placement and source-version boundaries are explicit. No capture, device measurement, overflow, audiovisual synchronization or audible-output result was executed. The proposed stereo fixture tests observer integrity separately from game correctness and perceptual quality.

### Sprite atlas and playback delivery (2026-10-18)

The [sprite delivery section](asset-validation-contracts.md#sprite-atlas-metadata-and-playback-delivery) adds independently reviewed Aseprite v1.3.18.6 at 331e898ef405d919539c03fd1675691cfa16c3a3, its laf packing submodule at 500768cccc6447e3b7816bedbfcb378a5c5222e5, and Godot 4.5-stable at 876b290332ec6f2e6d173d08162a02aa7e6ca46d. Review covers duplicate image rectangles with separate temporal occurrences, trimmed/empty-frame serialization, extrusion exclusion, source tag ranges/repeats, slice-relative pivots, atlas-margin behavior and relative-duration timebases. The proposed mapping deliberately excludes scaling, cropping, split modes and nested-tag playback. Its coordinate reconstruction, timing arithmetic and round-trip fixture are editorial derivations, not a verified importer. No export, import, playback, image comparison, collision/event mapping or gameplay foot-contact result was executed.

### Tile-map identity and runtime delivery (2026-10-18)

The [tile-map section](asset-validation-contracts.md#tile-map-identity-geometry-and-runtime-delivery) adds independently reviewed Tiled v1.12.2 at 1fd984638f9898af920103799bcd68b467287295 and Godot 4.5-stable at 876b290332ec6f2e6d173d08162a02aa7e6ca46d. Review covers map-local GID/flag decoding, sparse tileset IDs, negative chunks, image/object/collision transforms, signed-16-bit saved coordinates and base-atlas versus runtime-duplicate TileData. Exact implementation ranges were checked, including serialized coordinate casts and immediate internal processing. The latter is not an independently observed rendering/physics fence. Proposed orthogonal-map conversion and fixtures remain unimplemented; no native importer, save/reopen fidelity, collision response, navigation or runtime result was established.

### Replicate file acquisition and terminal accounting (2026-10-18)

The [delivery clarification](generation-delivery-contracts.md#replicate-file-acquisition-and-terminal-accounting) adds independently reviewed official rolling Replicate documentation for early sync file availability, absent completion metrics, separate HTTP wait/deadline behavior, one-hour API retention and deleted-output markers. Review retains the successful/succeeded example inconsistency and broader terminal outcomes. FileOutput migration and direct-URL authorization instructions address different paths; no contradiction or verified credential-routing behavior is inferred. SDK version statements are attributed to documentation, not an installed client. No prediction, request, download, charge, cancellation, SDK or candidate-evaluation fixture was executed. Artifact acquisition, terminal accounting and target-engine acceptance remain separate gates.

### MarioGPT constraint and evaluator boundaries (2026-10-18)

The [MarioGPT subsection](game-ai-notes.md#mariogpt-requested-constraints-and-executable-verdicts) adds independently reviewed paper v3 and source e62bb2b0106a00734e724e272ba94fb179ad959a. Review distinguishes the 250-level repeated-controller experiment, 1,000-sample per-feature compliance test and overlap-conditioned path error; these are not joint quality guarantees. Pinned code regenerates its returned prompt from output, uses configurable count bins, emits a diagnostic before preview fallback and launches a JAR without returning a structured verdict. The paper's five-pipe wording differs from the inspected default threshold, without establishing that this source produced the paper results. Exact source/tree/JAR-listing/roadmap and code/graphics notices were reviewed; checkpoint bytes and weight licensing remain unverified. No model, JAR, evaluator, preview or game was run. Original catalog-card wording remains unchanged, and the proposed project-owned evaluator is unimplemented.

### Cross-dossier consistency and discovery review (2026-10-18)

A read-only audit at source head 297b648dc4e30a27f2e641025075ba14bb37bd31 checked the current research change set: 21 canonical documents and 21 generated downloads, with 276 local Markdown links including 159 fragments across 15 rendered targets. All resolved; generated differences were limited to the established link/whitespace transformations. No duplicate long prose block or blocking internal contradiction was found in the reviewed additions. The source-revision table's 72 selected records are now explicitly distinguished from further inline citations; they are not a complete upstream-source count. The central index now exposes generated-level/rule evaluation, memory, lighting/audio and 2D delivery entrypoints. This was a consistency/navigation review, not a fresh factual audit of every external source or an engine/model reproduction. Existing paper/code, rolling-documentation/pin, rights and runtime-unknown boundaries remain applicable.

### Complete-sample production chains (2026-10-18)

The [complete-sample section](production-work-orders.md#complete-sample-integration-examples) adds independently reviewed official Boss Room at 1299ba4fc97d83b634e7d32a86c438ba668d7f9c and Godot 3D Platformer at 52e30044658448149b04e8f69b475eebbfbd8f6e. These connect asset/scene authoring, concrete interactions, build/export surfaces and actual test scope. Boss Room review covers its Unity/CI version difference, LFS boundary, switch/door and Development override, build-result/counter distinction, host-only parametrized smoke tests and narrower stubbed connection tests. Godot review covers the historical 4.3 renderer/import scope, coin visibility versus node lifetime, animation-delayed enemy removal, touch-action mismatch, respawn versus clean initialization, export-platform alias and formatting-only CI. Proposed broader routes remain unimplemented. No binary asset provenance audit, project materialization, dependency install, engine import, export, multiplayer session or gameplay test was performed. Existing cards and featured cases were not changed; the samples are source-backed integration examples, not new verified execution results.

### Versioned asset publication and downstream ownership (2026-10-18)

The [AYON handoff subsection](production-work-orders.md#versioned-asset-publication-and-consuming-scene-ownership) adds independently reviewed Blender 1bae7f10b014761039e1412a89c03fc7a7cc0c2d, Unreal 43b4a800a52289dd0bae19b1345889a835766bb7 and Core 136b43c6ba4b6e01cb0b97e0b31fb4df92e46409 development snapshots, plus official rolling setup/rights documentation. Review checks effective validation/FBX defaults, workfile mutation, product/version commit before transfer, representation finalization, best-effort file rollback and unresolved database rollback. It separates asset imports/containers from placed-actor retargeting, and requested layout destruction/saves from observed success. The inspected layout schemas and inherited preprocessing do not establish cross-plugin composition; no supported or installed bundle is alleged to fail. The proposed end-to-end prop publication/update/reopen fixture remains unimplemented. No server account, storage access, dependency installation, publishing, host import or runtime execution was performed.

### Designer-facing behavioral verdicts and persona feedback (2026-10-18)

The [playtest evidence section](game-ai-notes.md#designer-facing-playtest-evidence) adds independently reviewed Microsoft Bedrock GameTest samples at e0d67e171f11faa3ea5ea3be085e3f1992b27b83 and the 2015 MiniDungeons persona-critic paper with its author-linked minimal simulator at 298b86cac5624e4b121b4d2e5a2fd3cd93c622f7. GameTest review checks historical beta dependencies, exact authored predicates/tick budgets, unchecked rider setup, eventual versus scheduled observations and experimental current-documentation scope. MiniDungeons review checks feasibility/completion/utility separation, evaluation populations, training/comparison overlap, textual Table 1 interpretation, per-run telemetry, action-300 counter overlap, occupancy-map limits and code/license/release boundaries. The paper's evolved-persona and level-generation pipeline is not attributed to the minimal release. Neither source establishes human enjoyment of generated candidates. Proposed negative controls, held-out tasks and designer-guided routes are unimplemented. No simulator, JAR, engine, game, model, participant data or service was executed or collected.

### Hybrid production test-bot integration (2026-10-19)

The [EA AutoPlayers case](studio-production-case-studies.md#ea-autoplayers-learned-locomotion-inside-controlled-test-scenarios) adds the official CoG 2023 account and versioned arXiv v1 paper. Targeted review covers learned locomotion within scripted objectives, shared training/inference observations, stripped-environment transfer limits, accelerated-physics failure and bounded public-release claims. These historical engineering observations do not quantify defect yield, coverage improvement or enjoyment. Proposed controller comparisons and simulation-validity gates remain unimplemented; no game, trainer, model or participant experiment was run.

### Designer-facing trajectory and surrogate feedback (2026-10-19)

The [Sonic trajectory case](game-ai-notes.md#sonic-trajectory-visualization-comparing-training-populations) separates aggregate generation-route comparisons from individual replay, causal diagnosis and measured designer benefit. Author-site/repository inspection did not establish a matching runnable release; unrelated visualization projects are not substituted. The [SuSketch case](game-ai-notes.md#susketch-interactive-surrogate-feedback-with-a-separate-evidence-boundary) distinguishes structural checks, learned match predictions and explicitly applied suggestions. Paper population filters, output-specific accuracy, authoring-study scope and pinned code/paper class-pair differences are retained. Model/data files were inspected only through metadata; project-wide reuse permission and experiment reproduction remain unverified. Proposed controls are unimplemented; no engine, model, participant experiment or released executable was run.

### Screenshot grounding and recorded-dialogue artifacts (2026-10-19)

The [OmniParser contract](visual-feedback-mechanisms.md#6-omniparser-frame-scoped-gui-regions-and-coordinate-contracts) inspects Microsoft source at 354021201345a96178360b28733573e27269f2de: mixed box formats, letterbox inverse transforms, default caption crops, parse-local IDs, inferred interactivity and an unexecuted empty-OCR failure path. Repository and model licenses are scoped separately; the README badge does not resolve the repository LICENSE discrepancy. The [Rhubarb contract](native-operation-details.md#recorded-dialogue-and-mouth-cue-validation) pins v1.14.0 source and separates decoding/recognition, centisecond cue semantics, process status, reopened artifacts and project-owned animation mapping. Independent review checks consequential source claims; no weight, executable, recorded voice, game or model was run. Coordinate fixtures and playback/shape tests are proposed, unimplemented acceptance work, not empirical accuracy or synchronization results.

### Temporal mask-state and replacement evidence (2026-10-19)

The [SAM 2 lifecycle subsection](visual-evidence-research.md#sam-2-temporal-mask-state-contract) pins official source at 2b90b9f5ceec907a1c18123530e92e794ad901a4. It distinguishes resetting prompts/results from reloading changed clips, original-image coordinate prompts from normalized inputs, correction previews from propagation and session-local IDs from engine identities. Frame ordering/timebase, yielded coverage, mask logits, builder/CLI/variant defaults and asynchronous loading remain explicitly scoped. An optional invalidation-method mismatch is described only as static source evidence, not a reproduced failure. Proposed recapture, mapping, occlusion and correction tests remain unimplemented; no model, checkpoint, video or inference was executed.


### Persistent visual-artifact retrieval (2026-10-19)

The [FiftyOne subsection](visual-feedback-mechanisms.md#7-fiftyone-persistent-retrieval-over-capture-evidence) inspects independently resolved FiftyOne aacfc8182fc5353296b5edd7475e63335fedb5cb and Brain ba978a12293fda9953b478f601ac8950d2a35aa4 sources. It separates parent/frame/label identity from immutable pixels, saved view rules from snapshots, sampled-frame reuse from freshness, and query-distance fields from durable query histories. Index membership/reload, annotation writeback and local/remote vector boundaries remain scoped to inspected interfaces. These revisions do not establish a compatible installed bundle, index completeness or retrieval accuracy. No dataset, model, embedding, database or service was run; proposed stale-artifact fixtures remain unimplemented.


### Multiview capture and persisted-stream association (2026-10-19)

The [BlenderProc subsection](visual-evidence-research.md#blenderproc-multiview-capture-contracts) inspects source 76bd8b82ee19489843578ff045298642197bf883, keeping its main snapshot, package version, release tag and default Blender runtime distinct. Camera frames, sampled visibility, depth conversion, renderer-local instance associations and output loading/writing are separate contracts. Sampling and sparse ray hits do not establish complete inspection; HDF5 output requires caller-declared stream and manifest validation. Unequal-focal conversion and partial-output observations remain source-level caveats, not reproduced defects. No Blender, renderer, installer, asset dataset or acceptance fixture was executed.

### Existing agent and engine card alignment (2026-10-19)

This bounded follow-up compares 17 existing cards with operational dossiers and selected primary sources. Seven cards were refined; no resources were added. Only those seven cards receive a new source-read date. This does not refresh every claim in the catalog or establish installed compatibility.

| Refined card | Consequential clarification | Evidence scope |
| --- | --- | --- |
| `windows-ui-automation` | UIA exposes provider-supported control patterns; Win32 SendInput is a separate API | [Microsoft control patterns](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview), [SendInput](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput); rolling documentation |
| `godot-command-line` | Unknown flags are silently ignored; inspect the selected binary's help | [Official CLI reference](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html#command-line-reference); stable docs, not a pinned executable |
| `gltf-blender-io` | Match addon release branch to Blender; development main can target an upcoming release | [Upstream README](https://github.com/KhronosGroup/glTF-Blender-IO#documentation); rolling branch policy, without copying changing version labels |
| `openhands-sdk` | The inspected TypeScript client is alpha and supports Agent Server-backed remote conversations only; that server may be local | [Pinned TypeScript README](https://github.com/OpenHands/software-agent-sdk/blob/3f3294581ebf40f3bbe5b96aec1d28b7fec96226/clients/typescript/README.md#L1-L19); source snapshot, not installed release |
| `mcp-for-blender` | Default minimal usage telemetry differs from opt-in creative-content collection; the documented disable control covers both | [Pinned controls](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/README.md#L808-L842), [opt-in terms](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/TERMS_AND_CONDITIONS.md); source review, no consent or collection exercised |
| `unity-mcp` | Preserve the declared minimum, Unity 2021.3 LTS or newer, rather than an inferred Unity 6.x upper bound | [Pinned installation source](https://github.com/CoplayDev/unity-mcp/blob/aa5fc638d623f56178d50329d9ad8c541a57fe66/website/docs/getting-started/install.md#L13-L17); declaration is not tested future-version compatibility |
| `playwright-mcp` | The inspected README disclaims a security boundary and documents JavaScript execution in the Playwright server process through browser_run_code_unsafe | [Pinned security and tools](https://github.com/microsoft/playwright-mcp/blob/b8b4183e099f136cbec0388a6088d4aa2f6b9685/README.md#security); availability remains version/configuration-specific |

Retained within the sampled scope: `unreal-gauntlet`, `unreal-remote-control`, `unity-addressables-scripting`, `unity-test-framework`, `unreal-automation-tests`, `phaser-examples`, `gdquest-first-2d-game`, `godot-mcp`, `unity-mcp-skill` and `unreal-mcp`. Existing distinctions about cooked builds, editor/runtime access, cancellation, Phaser 4 versus legacy repository labels, tutorial versions, and community-bridge process limits remain useful. Retained does not certify all claims or refresh their dates.

Two changed cards now link directly to the existing [native UI evidence boundary](engine-operation-contracts.md#native-gui-automation-is-a-separate-evidence-surface) and [asset validity versus runtime fidelity](asset-validation-contracts.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity) dossiers. No agent, bridge, telemetry path, engine command or importer was executed; no content-collection terms were accepted.

### Cinematic editorial handoff (2026-10-19)

The [timeline supplement](asset-validation-contracts.md#cinematic-editorial-handoff-preserve-time-coordinates-and-declared-features) adds independently reviewed OTIO v0.18.1 at 44236713c1db295a6ffc66189ae98dbdfd0cb9c4, explicitly a Beta/pre-release, and the OpenTimelineIO Unreal plugin at 3894893001733f90178ee9a9b0f05b55e51b140e, descriptor version 0.1 Beta. Review covers half-open/mixed-rate coordinates, unknown-availability exceptions, transition handles, effect representation versus evaluation, adapter attribute checks, schema-selected inactive-reference loss and project hooks. The engine bridge adds selective shot reconciliation, default missing media, rate/marker losses, preview and Undo limits, and a source-level export-hook name discrepancy. These independently pinned components were not installed together or shown compatible. Citation ranges and proposed fixture arithmetic were cross-checked; no timeline import/export, engine save/reopen, media decode, render or data-loss reproduction occurred. The original 0.14 bundle tutorial remains separately scoped.

### Browser cinematic captions (2026-10-19)

The [caption delivery note](native-operation-details.md#browser-cinematic-subtitle-and-caption-delivery) adds independently reviewed WebVTT Candidate Recommendation Draft 2026-05-20 and WHATWG HTML source de953a7cf0523f5873a1904ba2ce010c689dfb66, plus rolling Xbox Accessibility Guideline 104. Review covers supplied cue-ID uniqueness, recoverable parse errors and zero-cue success, loading/mode boundaries, half-open media-time activation, seeking, track-source reset and first-match lookup. Disabled mode is not presented as unconditional fetch cancellation or cue deletion. The scope is prerecorded HTML-video cinematics; engine-native dialogue, Web Audio, canvas captions, actual rendering, accessible content completeness and browser interoperability remain unverified. The proposed fixture is unexecuted; no additional resource card or runtime adapter was created.

### Existing geometry-source refinement (2026-10-19)

The existing [geometry correspondence contract](asset-validation-contracts.md#4-optimize-retopologize-unwrap-and-regenerate-tangents-without-losing-correspondence) now pins xatlas f700c7790aaa030e794b52ba7791a05c085faf0c and MikkTSpace 3e895b49d05ea07e4c2133156cfa94369e19e409. Independent review confirms the prior stage/remap/tangent claims and adds exact output units, ignored-face sentinels, destructive repack and conditional partial-output cancellation boundaries, plus supported-face and output-callback limits. It does not infer that every cancellation is incomplete or that a true tangent-generation result covers unsupported polygons. Existing licenses were rechecked without a substantive change; installed versions, actual cancellation, atlas output and shading fidelity remain unverified. No new tool chapter, resource or executable fixture was added.

### Existing compression and simplification provenance (2026-10-19)

The same [geometry contract](asset-validation-contracts.md#4-optimize-retopologize-unwrap-and-regenerate-tangents-without-losing-correspondence) now pins meshoptimizer f0a684f11ead064e176775c9b796f82a55910e92 and Draco d429de84b52a860705507da0884764c5d8321423. Independent source review confirms existing capabilities and adds relative/absolute simplification-error units, target-count noncompletion, codec versus preprocessing loss, per-attribute quantization and bitstream/decoder version identity. Point-release compatibility prose is not generalized to development snapshots. Header labels and licenses were checked separately; no released-package identity, encoder/decoder execution, performance or rendered fidelity is established. The proposed controls remain within the existing acceptance chain; no additional resource or tool chapter was added.

### Existing generation and audio card alignment (2026-10-19)

This bounded review checked eight existing cards against selected official operational and rights sources. Three cards were refined; five were retained without date changes. No resource was added, and the review does not establish account eligibility, negotiated rights or runtime behavior.

| Refined card | Correction or qualification | Primary evidence |
| --- | --- | --- |
| `tripo-generation-api` | Preserve actual output files before default five-minute link expiry; scope controls to H3 v3.1-20260211 / v3.0-20250812 and retain the submitting-key requirement | [H3 generation](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html), [task retrieval](https://docs.tripo3d.ai/task-query/get-your-task-result.html) |
| `stable-audio-open` | Classify the linked MIT toolkit as pipeline source and distinguish it from gated, separately licensed model weights | [Toolkit](https://github.com/Stability-AI/stable-audio-tools), [model card](https://huggingface.co/stabilityai/stable-audio-open-1.0), [model license](https://huggingface.co/stabilityai/stable-audio-open-1.0/blob/main/LICENSE.md) |
| `elevenlabs-sfx` | Attribute loop/format capabilities to documentation, preserve the supported maximum/export descriptions, and distinguish API format/plan requirements from observed loop quality | [Capabilities overview](https://elevenlabs.io/docs/overview/capabilities/sound-effects), [API reference](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert) |

Retained within the sampled scope: `meshy`, `hy-motion`, `scenario`, `elevenlabs-music` and `elevenlabs-speech`. Their recipe-versus-complete-game, model-license, cancellation-scope, game-plan and history-dependent continuity distinctions remain supported. Related [model and service boundaries](generative-api-boundaries.md) were consulted and selected corresponding rows rechecked; this does not refresh that entire document's date. The [delivery contracts](generation-delivery-contracts.md) remain the detailed route for task and artifact handling. Sources are rolling documentation unless otherwise identified; no historical change is inferred solely from today's text. No generation, gated download, terms acceptance, model execution or audible/visual validation was performed.

### Creation-release provenance and retained asset cards (2026-10-19)

The existing [release-status table](game-ai-notes.md#versions-and-release-status) now ties OpenGame, GameXpert-Bench, GameGPT and GameGen-Verifier availability statements to independently inspected README/tree revisions. Their four cards remain substantively supported and retain their dates. GameGen-Verifier's documentation/tree setup discrepancy is qualified by its manual input and symlink instructions; no fresh-clone failure or evaluator reproduction is claimed. No new benchmark, task-count comparison or model-release association was inferred.

A separate bounded source check retained `trellis`, `triposr`, `hunyuan3d-2` and `pixellab` without field or date changes. Their input/output scopes and existing code/model/version qualifications remain supported. This does not resolve component-level license ambiguities, hosted-service entitlements or engine-import fidelity. These eight retained outcomes are additional sampled reviews, not a fresh certification of every claim in the catalog. No model, evaluator, game, generation API or gated download was executed.

An adjacent four-card review retained `gamedevbench`, `agent-game-forge`, `agent-sprite-forge` and `cardiverse` without field/date changes. The same [release-status notes](game-ai-notes.md#versions-and-release-status) now distinguish GameDevBench paper v1 (132 tasks) from v2 (333), replacing a misleading unversioned historical link; the current repository and v2 agree on 333. Pinned sources clarify Forge's documented legacy Godot support and Sprite Forge's author-reported code-reader re-render checks rather than GUI validation. Cardiverse's existing substitute-input qualification now links to the exact Replicability Notice. No task corpus, export, engine, performance result or evaluation was reproduced, and the older valid GameDevBench README pin elsewhere is preserved.

### Existing scene-production card alignment (2026-10-19)

A bounded check of `infinigen`, `holodeck`, `video2game` and `blenderllm` refined the latter two cards and retained the first two unchanged. Video2Game now preserves the documented UE diffuse-baking recommendation without claiming a universal import restriction. BlenderLLM's 12K count is explicitly attributed to release documentation; [scene-production notes](game-ai-notes.md#3d-execution-interfaces-models-and-environment-systems) distinguish the paper's 8K description and differing artifact-license declarations without resolving their precedence. The same notes pin Holodeck's scene/asset handoff and link to the existing Infinigen contract. Checklist and source-tree observations do not establish runtime failure, successful reproduction or exhaustive release absence. No generator, model, engine, dataset download or legal eligibility assessment was performed.

### Existing world-model release and access alignment (2026-10-19)

A bounded five-card check retained `programmable-world-model`, `coder-world-model`, `gamefactory` and `diamond` without field/date changes, and clarified `oasis` weight-access requirements. The [world-model release notes](world-model-notes.md#research-results-versus-released-artifacts) now pin the inspected PWM, GameFactory and Oasis repository observations and version CoDeR's paper link. Oasis's current contact-sharing gate is distinct from its MIT license. CoDeR's project fetch failure does not establish release absence, and GameFactory's publicly listed data does not settle reuse terms. DIAMOND's official project and paper v2 support the existing Atari/CS:GO distinction; no full source-code audit is implied. No model, game, weight, dataset archive or acceptance fixture was executed or downloaded, and no access terms were accepted.

### Hybrid-renderer and production-automation card alignment (2026-10-19)

Eight disjoint existing cards received bounded source checks: `streamrender-h3`, `solarwm` and `autoue` were refined; `solarrenderer`, `code-world-model-brain`, `unigen`, `regression-games` and `convai` were retained without date changes. [World-model notes](world-model-notes.md#research-results-versus-released-artifacts) distinguish component-specific hardware/timing, inspected source revisions and named contact-sharing access gates. The [3D research note](game-ai-notes.md#3d-execution-interfaces-models-and-environment-systems) separates AutoUE's paper-level playtesting from its inspected movement-skipping/direct-interaction dispatcher. This does not establish runtime failure, exhaustive release completeness, general service availability or artifact rights eligibility. Retained outcomes preserve iterative debugging versus autonomous play, reference integration versus confirmed hosted service, and runtime characters versus full-game generation. No model, engine, SDK, hosted experience, dataset or weight payload was run or downloaded; no gate was accepted.

### Existing agent and instruction-format card alignment (2026-10-19)

A bounded ten-card check clarified `aider` and retained `claude-code`, `gemini-cli`, `opencode`, `cline`, `mini-swe-agent`, `codex`, `codex-browser-games`, `agents-md` and `agent-skills-format` without field/date changes. The [agent source-review note](agents-notes.md#sources-and-lifecycle-changes) now distinguishes Aider's supplied-image/clipboard interface, conditional on a vision-capable model, from separate capture and gameplay control. Retained source checks preserve account-specific migration scope, versioned permission/LSP caveats, independent shell-process behavior, and instruction formats versus runtimes. This does not establish game performance, current model recommendations or every agent implementation. No agent, model, browser game, installation or engine workflow was executed.

### Existing example compatibility and world-model scope (2026-10-19)

A disjoint 13-card check refined `unity-2d-techdemos`, `factorsim` and `magpie-renderer`. The [engine source note](engines-notes.md#source-status) preserves README guidance, recorded Editor/package baselines and the Git-versus-registry manifest/lock discrepancy without claiming an install failure. [World-model notes](world-model-notes.md#research-results-versus-released-artifacts) distinguish FactorSim's 2D game generation and CLIPort task-code work, and Magpie's compute throughput versus estimated interaction delay under the paper's configuration. Independent primary-source review cleared these changes.

Retained without field/date changes: `godot-demo-projects`, `godot-gut`, `catlike-coding-movement`, `threejs-examples`, `threejs-crowd-experience`, `react-three-fiber`, `worldcoder`, `gif-mcts-cwm`, `cwm-general-game-playing` and `poe-world`. Their existing version, author-experience, source-versus-runtime and simulator-induction/planning distinctions remain supported within the sampled source scope. No optional assumption expansion is presented as a newly reproduced result. No engine, package, browser demo, model, game, data archive or research implementation was installed or executed.

### Existing hosted-world access and integration scope (2026-10-19)

A bounded 13-card review refined `genie-3` and `marble`, retaining eleven entries without field/date changes. [World-model notes](world-model-notes.md#research-results-versus-released-artifacts) distinguish the 2025 Genie 3 research demonstration from current Project Genie session/account requirements and scope Marble mesh-export tiers to the web app rather than API entitlement. [Agent notes](agents-notes.md#essential-distinctions) replace an absence-based rationale with the distinction between DeepSeek's integration guide and its separately published general-purpose developer-preview harness; the integration card itself remains unchanged. These changes received independent primary-source review.

Retained: `genie`, `gamengen`, `wonderworld`, `claude-agent-sdk`, `deepseek-agent-integrations`, `openhands`, `gamefactory-3a`, `unity-agent-plugin`, `mcp-unity`, `godot-3d-asset-skill` and `text2game`. The last five outcomes carry forward separately completed targeted source checks without manufacturing feature or date changes. Existing simulation-versus-gameplay, caller-operated SDK, frontend/backend, official/community, external MCP and narrative-prototype boundaries remain supported within the sampled scope. No model, engine, hosted session, account eligibility, export, SDK integration or complete reproduction was tested; no terms were accepted or payloads downloaded.

### Engine-reference access and supporting production primitives (2026-10-19)

A seven-card targeted check refined `unreal-lyra` with the [official Fab listing](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)'s explicit Unreal Engine-only content qualification. Source/content delivery and matching-engine guidance remain intact. This reports the listing's stated restriction; it does not determine account entitlement or infer permission for a particular AI-training, redistribution or cross-engine workflow from marketplace metadata.

Retained without field/date changes: `unreal-engine`, `unity-engine`, `godot-engine`, `xbox-accessibility-guidelines`, `msdf-atlas-gen` and `fastnoise-lite`. Official engine access and sample/version documentation supports their existing distinctions; the [XAG introduction](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines) remains best-practice rather than legal-compliance guidance, and the [MSDF](https://github.com/Chlumsky/msdf-atlas-gen) and [FastNoise Lite](https://github.com/Auburn/FastNoiseLite) READMEs support the existing font-atlas and procedural-primitive descriptions. This bounded review does not certify complete accessibility, license eligibility, installation, rendering, portability or runtime compatibility. No engine, sample, font pipeline or procedural generator was executed.

### Online adaptation and change-level audit evidence (2026-10-19)

The [benchmark methodology extension](benchmark-reproducibility.md#online-harness-adaptation-and-change-level-audit) reads Harness² paper v1 alongside author-linked code at `1cfe254e8d25b15f37048c3730134686abe60335`, and separately reads the v1 harness-tampering study. Independent review checked task-local contrast versus correctness, common base versus experience library, seeded task order versus model randomness, rollout/accounting exclusions, graded-row populations and caller-recorded completion metadata. The integrity study remains a paper-level reference with executable-release availability unverified; seeded controls, model flags, sampled human checks and reproduced defects are not conflated. Proposed game fixtures and transfer comparisons are unimplemented. No new resource card or benchmark execution was added.

### Game-creation loops and release boundaries (2026-10-19)

The [three-study extension](benchmark-reproducibility.md#game-edit-loops-reusable-players-and-specification-recovery) checks RSIGame v1, Recursive Game Creator v2 and GameReplica v1 against pinned public source/artifact surfaces. Independent source review covers retrospective versus live stopping, model-assisted observation states, game versus policy/harness changes, native captures versus official replay, null strict-success fields, visual-score denominators, threshold-based outcome labels and release/license scope. RSIGame manifest arithmetic is a source-data check, not recomputed gameplay scoring; the RGC adapters and GameReplica showcase are not certified paper reproductions. No new resource cards were added. Proposed comparisons remain unimplemented; no model, game, engine, judge or benchmark was executed.

### Upstream GameCraft evidence and denominator contract (2026-10-19)

The [upstream contract note](benchmark-reproducibility.md#gamecraft-bench-the-upstream-replay-to-score-contract) directly inspects author-linked GameCraft source at `a43347534374df9a0c1a6c001aa9380862783f6d`, resolving the dependency used by the adjacent RSIGame and Recursive Game Creator notes. Independent review checks overridable submission/replay/sampling limits, frame-based versus video judge inputs, per-requirement aggregation, caught replay-error omissions versus exhausted judge-error zeros, and release/reference-script/license scope. The note does not equate score credit with one complete playthrough or infer an all-task reproduction from reference filenames. Proposed controls remain unimplemented. No benchmark, game, engine, model or judge was executed; no new cards or documents were added.

### Active visual inspection and historical-context controls (2026-10-19)

The [active-inspection comparison](visual-feedback-mechanisms.md#active-visual-inspection-frozen-model-search-versus-learned-tool-use) inspects ZoomEye and original DeepEyes papers plus pinned source, separating frozen-model crop search from trained tool policies, intended boxes from actual processed pixels, runner status from answer scoring and initial search thresholds from hard budgets. The [history/memory companion](visual-feedback-mechanisms.md#visual-history-reuse-external-memory-and-controlled-exposure) checks HistPrune-GUI v4 and its model-specific cache/pruning source, MementoGUI's paper-level external-memory design and page-only verified release, and EMemBench's fixed-exposure methodology versus older packing/generator implementation. Independent review checked reported metric populations, counterexamples, source/version discrepancies and code/model/data terms. EMemBench's public source snapshot does not universally implement the paper's prefix-horizon description. No new cards or documents, model execution, benchmark run, game experiment, weight download or paid request was added; proposed game-production comparisons remain unimplemented.

### Scene-state preservation and camera-coverage gates (2026-10-19)

The [Code4Scene contract](asset-selection-feedback.md#7-code4scene-target-recovery-and-collateral-changes-require-different-comparisons) inspects pinned actor matching, target authoring, tolerances, repair verification and evidence bundles. It distinguishes requested recovery from background repurposing/deletion, exported evidence from original engine measurement, camera/bounds exclusions and current task definitions from the paper cohort. The [InfiniBench companion](visual-evidence-research.md#infinibench-constraint-verdicts-and-camera-coverage) inspects the shipped compile-only constraint integration, the distinct camera paths, conditional visibility relaxation, missing-path assembly and metadata-derived QA. Source review does not establish a runtime defect in released samples, a complete reproduction or a working combined integration. MUSE and EditBench3D were bounded comparison candidates, not added tools or promoted releases. No new cards/documents or research execution; proposed preservation and visibility fixtures remain unimplemented. External Godot retarget/root-motion refinements are preserved.

### First-hand AAA production experience (2026-10-19)

Eight [studio-case additions](studio-production-case-studies.md#find-a-production-lesson) cover Insomniac's encounter preservation and character pipeline, Sucker Punch's biome/VFX and lighting tradeoffs, CD PROJEKT RED's Phantom Liberty blockout revisions, Naughty Dog's original Uncharted postmortem, Ubisoft's Rainbow Six Siege workflow mapping, and EA's SUPERNOVA test prioritization. Primary developer papers, presentations and studio articles were read, with exact historical contexts and source-specific limitations retained. Independent review checks concrete methods, failed approaches, measured-population caveats and the separation between published accounts and proposed acceptance fixtures. No inaccessible talk details, generic vendor speedup or causal AI productivity claim is promoted. Existing cases remain unchanged; no studio assets or slides are rehosted. No new cards/documents, game/engine/model execution or deployment.

### World-authoring integrity, acoustic readiness and traversal feedback (2026-10-19)

Four complementary [studio cases](studio-production-case-studies.md#find-a-production-lesson) add Remedy's Northlight composition/live-edit pipeline, CD PROJEKT RED's acoustic-graph build and streaming failures, Naughty Dog's Uncharted 4 climbing feedback and Guerrilla's Horizon Zero Dawn traversal authoring. Complete primary decks and the developer interview support the technical accounts; inaccessible alternatives are not used for implementation claims. The Remedy USD pipeline's named production projects are Control 2 and Max Payne remakes, rather than inferred Alan Wake 2 adoption. Horizon's motion matching and full-body IK remain future plans in the historical presentation. Proposed clean-export comparisons, staged-readiness checks and contact fixtures are editorial and unimplemented. Source review establishes neither current studio-tool access nor reproduced performance or gameplay quality. No new cards/documents, research execution, source-slide rehosting or deployment. The research index removes a stale fixed case count.

### Dialogue revision and accessible-feedback production (2026-10-19)

Four [first-hand cases](studio-production-case-studies.md#find-a-production-lesson) add BioWare's Mass Effect 2 localization revision/context/import gates, Nixxes' Horizon Zero Dawn Remastered camera regressions after dialogue-motion replacement, Turn 10's Forza Motorsport co-development and cue-learning process, and Ubisoft's Far Cry New Dawn dependency/testing-time lessons. General Xbox workshop guidance is separately attributed rather than claimed as Forza's exact procedure or causal evidence. Primary-source review distinguishes retrospective developer observations, pre-release descriptions and unimplemented GameMap fixtures. No player efficacy, current private-tool availability, complete accessibility or runtime integration is certified. Inaccessible Santa Monica slides supply no technical claims. Sources remain linked reading material; no studio assets, participant data, games or engines were executed or rehosted. The localization work order gains a direct route to production revision and co-development evidence.

### Contextual audio and reconstructable failure evidence (2026-10-19)

Four [studio-case additions](studio-production-case-studies.md#find-a-production-lesson) document Prototype 2's snapshot-transition/playback-mode tradeoffs, original Overwatch's pre-release listener-dependent audio priority, Bungie's correlated internal-build crash collection and Valve's historical dump/build provenance. Independent source review checked exact historical scope and presentation locations. Matching symbols remain a necessary attribution gate rather than proof of correct diagnosis; incident correlation does not certify atomic or complete capture. Proposed listening and failure-packet fixtures are unexecuted. No current console entitlement, private collector, perceptual improvement, published soak workload or runtime adapter is established. Reading routes now cover every current case across ten production questions while preserving existing case text and anchors; the index avoids a fixed case count. No source media or player reports are rehosted, and no game, engine, audio system or crash experiment was run.

### Platform-load workload and acceptance scope (2026-10-19)

The [VALORANT case](studio-production-case-studies.md#valorant-specify-the-workload-behind-a-concurrency-claim) adds Riot's dated primary account of simulated-client load against a test shard. Independent review confirms the reported two-million-player test and three-hour dashboard scope while explicitly withholding a constant two-million plateau or zero-error inference. Mock servers omit gameplay logic; prelaunch operation rates were estimated from another game's data. Proposed workload and acceptance records remain unexecuted. This narrows platform-scalability evidence without closing real-gameplay soak, current capacity or public-harness availability gaps. Existing case bodies are preserved; no load generator, game or service was run.

### Authored behavior, pacing proxies and human experience (2026-10-19)

Three [studio cases](studio-production-case-studies.md#find-a-production-lesson) add Orkin's publisher-hosted 2005 pre-release F.E.A.R. architecture account, Booth's official AIIDE 2009 Left 4 Dead deck and Ambinder's March 2009 GDC playtesting deck. Independent review preserves symbolic versus procedural preconditions, sensory freshness and subsystem execution, pacing-frequency versus difficulty-amplitude scope, and the distinction between control proxies and actual player experience. Simulated-example labels are limited to Ambinder's cited p.31 numbers and p.42 questions. Proposed debugging and acceptance fixtures remain unexecuted; no calibrated emotion measurement, universal fun score, current private interface or LLM compatibility is claimed. Existing case bodies remain unchanged, and the thematic reading table links each current case once. No study participants, personal/biometric data, games, models or source programs were used.

### Readable construction and multiple player solutions (2026-10-19)

The [Tears of the Kingdom design case](studio-production-case-studies.md#tears-of-the-kingdom-make-construction-rules-readable-without-prescribing-one-solution) adds Nintendo's complete official launch-era interview Parts 4–5, independently source-reviewed. It documents prototyping from existing mechanisms, component/readiness cues, visibly signaled interaction exceptions and accommodation of simple as well as elaborate player solutions. These developer-reported creative methods are separate from the proposed GameMap observation fixture. The interview establishes no controlled usability effect, exhaustive combinations, numerical physics behavior or public tool availability; the technical physics-validation gap remains open. Existing studio cases and externally contributed Hypothesis coverage qualifications are preserved. No game, physics engine, player study or model was executed, and no Nintendo assets were imported.
