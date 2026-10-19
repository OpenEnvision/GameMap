# Coding World Models: Categories, Selection, and Research Notes

Reviewed on **2026-10-18**. This is a curated set of research references, not an exhaustive survey. Paper years follow the first preprint; conference years appear separately in tags or descriptions. The presence of a project, code, weights, or data is assessed separately from complete reproducibility.

## Name clarification

- `solarrender` most likely refers to **SolarRenderer: Few-Step Generative Reference Rendering**. The authors' [project page](https://enderfga.cn/SolarRenderer/), [repository](https://github.com/Enderfga/SolarRenderer), [weights](https://huggingface.co/Enderfga/SolarRenderer), and [data](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data) were reviewed. The authors provide a standalone paper PDF, but its full text could not be extracted in the browser. Descriptions therefore rely on the official project and repository; no arXiv identifier is assumed.
- `steamingrender-h3` most likely refers to NVIDIA's **StreamRender-H3**, officially titled [Interactive Coding Worlds with Real-time Streaming Diffusion Render](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/). It is a Sol-Engine research system and technical blog, not a verified standalone arXiv paper.
- Both pass engine- or program-produced structure to a generative video renderer. SolarRenderer's four-step generation and block-causal streaming interface share interface ideas with StreamRender-H3's two-step streaming deployment. Training objectives, control representations, hardware, and throughput differ, so an unconditional speed ranking would be misleading.

## Four distinct approaches

| Approach | Authoritative world representation | How actions take effect | Value for game development | Boundaries to validate |
| --- | --- | --- | --- | --- |
| Code worlds / `code-world-model` | Executable state, rules, transitions, and reward functions | Program execution updates state | Debuggable gameplay, rule discovery, search, and counterfactual testing | Whether generated code covers the rules; observation error and hidden state |
| Hybrid rendering / `hybrid-renderer` | An engine or program maintains state; a video model maintains visual context | The engine handles player input and converts it into structural conditioning | High-quality visuals from grayboxes and fast style exploration | Control deviation, identity preservation, end-to-end latency, GPU memory, and training data |
| Neural simulation / `neural-simulator`, `interactive-video` | A history of pixels, video tokens, or latents | A neural network predicts the next observation from actions and history | Interactive imagination, training environments, and experience exploration | Repeatable rules, counting, inventory, collision, and long-term drift |
| Explicit 3D scenes / `scene-generation` | Spatial assets such as splats, surfels, and meshes | Camera movement or scene editing; gameplay is implemented separately | Scene assets, level concepts, spatial exploration, and engine export | Mesh quality, walkability, collision, animation, and dynamic interaction |

Here, Coding World Model mainly means representing an external world in code. Meta FAIR's [CWM: An Open-Weights LLM for Research on Code Generation with World Models](https://arxiv.org/abs/2510.02387) instead learns how code and commands affect Python or container environment state. It is an execution-aware coding model. The meanings are related but should not be classified as the same game world generation architecture. Another easily confused example is [Code2World](https://arxiv.org/abs/2602.09856), which generates renderable code to predict the next GUI state. It is a GUI world model and is not included here as a game world paper.

## Suggested reading order (GameMap editorial guidance)

1. **Rules and planning:** WorldCoder → GIF-MCTS / CWMB → Code World Models for General Game Playing. Start with why programmatic world models need checks for transitions, legal actions, termination, and rewards.
2. **Modularity and uncertainty:** FactorSim → PoE-World. The former studies factorization when generating complete simulators from descriptions; the latter combines small programmatic experts to model stochastic dynamics.
3. **Persistent visual worlds:** Code World Model: Coding Agent as World Brain → Programmable World Model → CoDeR. Compare who maintains state, how events outside the camera view are handled, and how state becomes rendering controls.
4. **Deployable hybrid rendering interfaces:** Magpie → SolarRenderer → StreamRender-H3. Record input structure, first-frame and prompt requirements, chunks, history caches, hardware, and interaction latency.
5. **Comparisons:** Genie, GameNGen, DIAMOND, GameFactory, Oasis, and Genie 3. They help explain visual dynamics and action control, without automatically providing editable code worlds.
6. **Exportable spatial assets:** WonderWorld and Marble. Assess the mesh, collision, and interaction work needed for pipelines in Blender, Three.js, Unity, UE, and other tools. For splat-based delivery, inspect [source-pinned edit/export/import boundaries](asset-validation-contracts.md#gaussian-splat-editing-and-delivery): preserved project state, baked transforms, actual format versions and separate collision acceptance.

## Research results versus released artifacts

This pass checked primary source text, artifact listings, interface documentation, and selected license terms. No model or engine was run. Abstract-only checks and individual fetch failures are recorded in the [coverage ledger](catalog-review-coverage.md); they are not full-paper review or reproduction.

- **CWM / World Brain:** the official [environment notes](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md) explicitly list MiniMax-H3 Ref2VA inference components, LoRAs, and proxy examples as public. The underlying game code that creates proxies cannot be redistributed. It should not be described as a fully open-source agent world engine.
- **Programmable World Model:** the [inspected repository roadmap](https://github.com/AlayaLab/PWM/blob/0286dc7a193a99f84c29f8d25fc67976311d0833/README.md#L29-L34) leaves inference code and pretrained weights unchecked; its snapshot tree contains a README and teaser asset. The catalog labels it a paper rather than a fully released framework.
- **CoDeR:** the [paper v1 abstract](https://arxiv.org/abs/2609.26458v1) states that code and model weights will be made publicly available. This establishes a release plan, not a completed release.
- **SolarRenderer:** [code](https://github.com/Enderfga/SolarRenderer) is Apache-2.0, but [LoRA weights](https://huggingface.co/Enderfga/SolarRenderer/blob/main/LICENSE) use the MiniMax H3 Community License, whose territory excludes the EU, UK, Republic of Korea, and US. The [dataset](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data) mixes licenses: UnrealZoo clips are CC BY-NC 4.0 and held-out engine recordings are research-only. Read component terms before reuse. Control/four-step LoRAs include causal variants; the [usage guide](https://github.com/Junchao-cs/SolarWM/blob/main/docs/solar_renderer.md) specifies separate environments and GPU requirements.
- **SolarWM:** the [stage matrix](https://github.com/Junchao-cs/SolarWM) lists all three stages for Wan2.2-5B and MiniMax-H3; Wan2.2-14B and LTX-2.5 later stages are forthcoming. Backbones require separate runtimes. The main data repository contains annotations and indexes, with latent payloads in separate repositories and the full processed training-video corpus obtained by reconstruction or approved access. Unified interfaces do not imply stage parity, a bundled raw corpus, or common licenses.
- **GameFactory:** the [inspected repository](https://github.com/KlingAIResearch/GameFactory/tree/0f2a38fede2d42251d6a6269d6c882b23cd0adbe) contains GF-Minecraft documentation and detection/visualization utilities. The paper describes action-control modules, but the checked release does not establish a full training/inference pipeline or model weights.
- **Oasis:** the [project](https://oasis-model.github.io/) distinguishes its larger hosted demo from the MIT-licensed [500M checkpoint](https://huggingface.co/Etched/oasis-500m) and [inference code](https://github.com/etched-ai/open-oasis/tree/f59deef2c019c212bd0c5a3a5b986a51f3701847). The [current weight-access page](https://huggingface.co/Etched/oasis-500m) requires agreement to share contact information; this access gate is separate from the MIT license. The [pinned generation script](https://github.com/etched-ai/open-oasis/blob/f59deef2c019c212bd0c5a3a5b986a51f3701847/generate.py#L56-L63) uses an initial frame and action sequence; it is not evidence that the complete live demo interface or training pipeline is released.
- **Marble:** the [official introduction](https://www.worldlabs.ai/blog/marble-world-model) supports splat, visual mesh, and collision mesh export. This provides spatial assets, without establishing that complete rules or quest systems have been generated.

The four release observations above for PWM, CoDeR, GameFactory and Oasis were rechecked on 2026-10-19. Repository pins identify inspected source snapshots, not installed or compatible releases. CoDeR's project-page fetch was inconclusive, so the statement remains limited to its paper's release promise. GameFactory's publicly listed data does not establish unrestricted reuse: the inspected repository and dataset metadata did not settle code/data terms, and archive contents were not inspected. Website-template licenses must not be transferred to those artifacts. Rolling Oasis access/license pages were read without accepting the gate or downloading weights. This targeted pass does not refresh all claims in this document.

## Questions for the Planning Map (GameMap editorial guidance)

Choose the intended output first: **a shippable game project, an explorable neural video experience, reusable world assets, or a simulator for training and planning**. Then choose the world representation and agent workflow.

- **World state:** can entity identities, coordinates, health, inventory, cooldowns, quest flags, and event logs be queried, saved, and replayed?
- **Rule correctness:** does executable code determine legal actions, collision, irreversible events, and win/loss conditions?
- **Visual control:** does structure include semantics, depth, instance IDs, cameras, and poses? Do generated frames follow those controls?
- **Long-term consistency:** do state and identity persist after leaving and returning, occlusion, multiple characters crossing, item consumption, and quest completion?
- **Interaction performance:** measure FPS, generation time per chunk, time to first frame, input-to-display latency, concurrency, and GPU memory separately. Report complete hardware conditions.
- **Editability:** does changing a rule require retraining? Can appearance change through only a first frame or prompt? Can assets return to conventional engines?
- **Evaluation:** visual appeal cannot replace state accuracy. CWMB dynamics and planning evaluations, CombatStateBench entity and state checks, and SolarRenderer structure-preservation evaluations support different testing layers.

## Classification of the current 20 entries

| Subcategory | Count | Entries |
| --- | ---: | --- |
| Code state and program induction | 8 | CWM / World Brain, Programmable World Model, CoDeR, WorldCoder, GIF-MCTS, General Game Playing, PoE-World, FactorSim |
| Standalone hybrid renderers | 3 | SolarRenderer, StreamRender-H3, Magpie |
| Interactive video and neural simulation | 7 | SolarWM, Genie, Genie 3, GameNGen, DIAMOND, GameFactory, Oasis |
| Explicit 3D scene generation | 2 | WonderWorld, Marble |

Counts follow each entry's main research contribution. Tags can span categories: CWM / World Brain, for example, is a code world that also uses hybrid rendering.
