# 2D / 3D Game Development AI: Research Notes

Reviewed on **2026-10-18**. These are representative starting points, not an exhaustive catalog or a ranking of the strongest tools. `verified` means a primary project page or paper was reviewed; it does not mean the project was run or reproduced locally. The 24 entries in `data/segments/game-ai.json` have 12 primary 2D classifications and 12 primary 3D classifications. Two additional MCP bridges appear in the agents segment. Cross-dimensional projects retain their `dimensions` values.

## Categories and evidence

- **Development agents / frameworks** take requirements or a project and produce code, scenes, rules, or assets. Playable prototypes, local project changes, and complete games are different outcomes.
- **Skills** provide workflows, references, and scripts for general agents. They are not trained models and do not guarantee independent execution.
- **MCP / CLI** connects editors, runtimes, and asset tools to agents, providing execution and feedback interfaces. The existence of a tool does not establish the correctness of its outputs.
- **Development benchmarks** include GameDevBench and GameEngineBench for project modifications. GameXpert-Bench adds creation, repair, and iterative improvement. GameGen-Verifier studies functional verification of generated games.
- **Related evaluations** include CADBench for 3D modeling. Card game self-play can validate rules, but win rate measures gameplay ability and cannot substitute for development quality.
- **World models** that predict action-conditioned video produce a different artifact from explicit engine projects. Kling's GameFactory is separate from OpenDCAI's GameFactory-3A. Video2Game produces explicitly reconstructed environments and belongs to the 3D reconstruction route.
- **Procedural backends** such as Infinigen do not use an LLM to generate geometry. Infinigen is included because it can supply controllable scenes and synthetic data to AI game development workflows.

## Versions and release status

| Resource | Primary evidence | Qualification to preserve |
| --- | --- | --- |
| [GameDevBench](https://github.com/waynchi/gamedevbench) | Current README: Overview and Prerequisites | The repository lists 333 tasks and Godot 4.4.1. The [first arXiv abstract](https://arxiv.org/abs/2602.11103) still lists 132 tasks. Dataset sizes and leaderboards from different versions should not be mixed. |
| [GameEngineBench](https://arxiv.org/html/2607.03525v2) | Paper v2 abstract and evaluation protocol | Nine real UE projects and 110 local C++ tasks, checked through builds and runtime behavior. The paper links to the Nitrode-Research repository, but its contents were not retrieved during review, so the paper remains the primary entry point. |
| [OpenGame](https://github.com/leigest519/OpenGame) | README: Game Skill and OpenGame-Bench | The agent framework is public. The evaluation pipeline is still described as forthcoming. A model name in a paper does not establish model availability. |
| [GameXpert-Bench](https://github.com/Kwen-Chen/GameXpert-Bench) | README: Repository status | At review, the repository was a project-page scaffold, with data, code, and models being prepared for release. The paper protocol can be cited; a downloaded, runnable benchmark cannot be assumed. |
| [GameGPT](https://arxiv.org/abs/2310.08067) | Paper abstract and linked repository | The [repository](https://github.com/leyiwo/GameGPT) displays only a PDF and README. This entry describes the research architecture, without promising a complete implementation. |
| [GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier) | README: Repository Layout and Quickstart | The harness, verifier skills, and scripts are public. Generated games, caches, screenshots, and complete run logs are not all distributed with the code. |
| [Agent Game Forge](https://github.com/0x0funky/agent-game-forge) | README: Project status | JS + Canvas is the current default. Full Godot retargeting and Unity support remain on the roadmap. The project is marked pre-launch. |
| [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge) | README: Engine exports | Checks for newer exports include parse round trips. The README states that not all target exports have been opened and verified in their editors. |

## 2D: Contributions at different stages

- [MarioGPT](https://github.com/shyamsn97/mario-gpt): language conditions become character-grid levels. `play()` and `run_astar()` offer ways to check level reachability. The code is marked MIT; a code license does not grant rights to original game assets.
- [GAVEL](https://github.com/gdrtodd/gavel): Ludii rule code passes through language-model mutation and quality-diversity search. The [paper](https://arxiv.org/abs/2407.09388) studies novel board game rules. It fits planning and rule-design stages, without replacing real-time action game playtesting.
- [Cardiverse](https://github.com/danruili/Cardiverse): mechanism graphs, retrieval, and match records connect design to Python prototypes. The repository is marked MIT. Its Replicability Notice states that not all original card descriptions are distributed, and substitute descriptions may change results.
- [Text2Game](https://github.com/boltomli/t2g): long-form text extraction and merged world, character, and event data lead to Twine HTML or Godot visual novels. Its scope is narrative prototyping, not general game generation.
- [PixelLab MCP](https://www.pixellab.ai/mcp): a commercial asset service with documented tools for character directions, animation, and tilesets. API/MCP output, engine collision, animation events, and import configuration are separate tasks.
- [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge): a skill and deterministic asset-processing chain, with code marked MIT. Generation depends on external image or video capabilities. Record the provider route, version, reference image, frame order, anchors, and export checks.

## 3D: Execution interfaces, models, and environment systems

| Resource | Output or use | License or limitation supported by primary material |
| --- | --- | --- |
| [3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A) | Multimodal asset pipelines, skills, and engine-native code adapters | Apache-2.0. External models, engines, and assets retain their own terms. README demos mix generative models, Mixamo, and existing scenes. The 3A name is not a quality rating. |
| [Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) | Unity-maintained agent context for 2D, UI, rendering, physics, and other tasks; Unity 6.0+ | Check the [official source](https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills) and product setup separately. |
| [MCP Unity Editor](https://github.com/CoderGamester/mcp-unity) | Scene, component, Prefab, console, and Test Runner operations | README marked MIT. Community maintained and separate from Unity's official tools. |
| [MCP for Blender](https://github.com/ahujasid/blender-mcp) | Blender Python, objects, materials, and multi-angle visual feedback | MIT. The README identifies it as a third-party project. Its package name is now `mcp-for-blender`. |
| [Unreal MCP](https://github.com/chongdashu/unreal-mcp) | Actor, Blueprint graph, and viewport operations | README marked MIT, UE 5.5+, and Experimental. |
| [Godot 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets) | Native geometry and existing resources become PackedScene assets, followed by collision, navigation, and visual checks | MIT. Requires compatible Godot MCP capabilities; this is not a generative model. |
| [Hunyuan3D-2](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) | Image to mesh to texture, with GLB/OBJ and Blender addon support | The repository uses a dedicated license. Open model availability does not imply MIT terms. Versions 2.0, 2.1, and 2.5 are distinct. |
| [TRELLIS](https://github.com/microsoft/TRELLIS) | Image or text to SLAT, then mesh, Gaussian, or radiance field; meshes can export to GLB | Models and most code are MIT. The README notes other licenses for some rendering and geometry submodules. |
| [TripoSR](https://github.com/VAST-AI-Research/TripoSR) | Feed-forward 3D reconstruction from one image | README states MIT for code and pretrained models. Topology, collision, and performance still need checks after export. |
| [Infinigen](https://github.com/princeton-vl/infinigen) | Parameterized procedural rules produce Blender scenes, geometry, materials, and annotations | Repository marked BSD-3-Clause, with some subsequent procedural code derived from CC0 sources. It is not a language model. |
| [Holodeck](https://github.com/allenai/Holodeck) | Text to layout and asset composition in AI2-THOR, with Unity loading supported | Repository marked Apache-2.0. Its main target is embodied AI environment generation. Track external assets separately. |
| [Video2Game](https://github.com/video2game/video2game) | Real-world video to mesh, appearance, and collision in three.js / UE environments | Repository marked MIT. The README notes that some physics integration is laborious. Reconstructed environments are not complete games. |
| [BlenderLLM](https://github.com/FreedomIntelligence/BlenderLLM) | Instructions to bpy modeling scripts, with BlendNet and CADBench | Scope is limited to basic modeling, with limitations in multi-turn interaction and advanced materials. Check model and dataset cards separately rather than assuming one shared license. |

Unity's interface migration needs a separate distinction. The [official migration guide](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli) deprecates the old MCP server inside `com.unity.ai.assistant`. The CLI's `unity mcp` remains supported, and this deprecation does not affect third-party MCP tools. The website should provide both the current official entry point and a separate community bridge entry.

## Acceptance layers for the Planning Map

1. **Plan:** define the core loop, inputs, win/loss conditions, restart behavior, and progress state. Limit scope to a slice that supports continuous playtesting.
2. **Code / Scene:** have the agent write code while using the editor, CLI, or MCP to inspect real scenes, asset bindings, logs, and runtime state.
3. **2D assets:** standardize canvas, perspective, character scale, directions, anchors, transparency, frame order, loops, hit timing, atlases, and tile edges.
4. **3D assets:** record units, axes, origins, polygon counts, material slots, UVs, LOD, rigs, animation retargeting, collision, and navigation. A convincing generated image covers only part of this work.
5. **Test:** check compilation, gameplay invariants, visual layout, input reachability, win/loss and restart behavior, long runs, and performance separately. Visual judges and state probes provide complementary evidence.
6. **Ship:** validate on target devices or exported builds. Record engine versions, asset sources, build steps, and performance budgets.

These layers are GameMap's planning recommendations, synthesized from the resources and their engineering boundaries. They are not experimental findings from any single paper.
