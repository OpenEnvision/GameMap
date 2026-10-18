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
