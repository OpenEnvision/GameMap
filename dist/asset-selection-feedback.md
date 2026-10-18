# Asset candidate selection and visual-feedback creation

Source review: **2026-10-18**. Read-only paper, documentation and public-source inspection. No model, game engine, simulator, installer, browser game, paid API, training job or benchmark was executed. The interfaces below are source-observed or paper-described; proposed experiments are explicitly editorial.

## Reading the selection evidence

The existing generative-tools and generation-delivery notes explain producing and obtaining assets. Asset-validation notes explain geometric and interchange checks. Visual-evidence notes cover perceptual diagnostics and several creation assistants, while benchmark-reproducibility covers task isolation. The missing connection is **how a system chooses among candidates, what evidence actually reaches its judge, and whether refinement beats spending the same budget on fresh candidates**.

See also [Visual-feedback mechanisms](visual-feedback-mechanisms.md) for frame selection, crop memory and temporal diagnosis. Scene generation is relevant to game production, but is not itself a playable-game result.

## 1. SceneSmith: semantic retrieval, geometric reranking and first-acceptable validation

### Source-inspected acquisition interface

The articulated retriever accepts a description, object type, optional desired dimensions `[width, depth, height]` in metres, and requested result count. It filters by type, ranks by CLIP similarity, takes a configured semantic candidate pool, then optionally sorts that pool by **L1 bounding-box dimension distance**. Without dimensions it preserves semantic ranking. Returned candidates include object/source identifiers, SDF path, description, CLIP and dimension scores, and bounding-box endpoints. This is a staged reranker; the implementation does not combine semantic and geometric scores into a calibrated scalar. A mismatched desired box can reorder otherwise strong semantic candidates. [Pinned retriever][SS-retrieval], [request/result schemas][SS-schema]

The router's generated branch acquires one candidate at a time and renders four side views plus vertical views. It asks a VLM for `is_acceptable`, `reason` and `suggestions`, and returns the **first accepted** candidate. A positive `max_retries` controls the number of attempts; zero requests one acquisition without validation. Retrieval branches similarly walk candidate lists. Exhausted strategies return `None`. Rendering or VLM errors become negative validation results with explanatory reasons. In the inspected generated retry loop, suggestions are logged but are not passed back as a changed item description. Thus this path is rejection sampling, not a verified prompt-rewriting optimizer or global best-of-N ranker. The same named validation directory is reused across attempts, so an adapter must independently establish whether all candidate evidence survives. [Pinned router][SS-router]

### What acceptance actually means

The strict validation prompt checks category, explicit style, completeness, plausible proportions and whether separately manipulable objects have been fused into one mesh. It rejects furniture with attached manipulands and open containers with distinct contents, subject to stated exceptions. It also rejects generated cabinets with open doors/drawers because the mesh cannot articulate. These are useful **functional representation checks**. However, the same prompt explicitly tolerates garbled text and approximate rather than truly metallic, transparent or reflective materials. Its floor-lamp stability rule is a visual design heuristic, not a measured centre-of-mass or contact test. Do not label this acceptance as material fidelity, readable signage, or physical certification. [Pinned validation prompt][SS-validation]

### Feedback, evidence and findings

The paper describes separate designer/critic/orchestrator roles, structured state alongside annotated scene renders, and checkpoint rollback that retains agent context. It reports 63.0% realism and 62.2% faithfulness preference for the full method over NoAssetValidation. Removing scene observation significantly affects realism, but not faithfulness at the reported significance threshold. NoCritic does not significantly differ in human preference, costs 70% less, and produces fewer objects. These are author results, not a demonstration that every added critic improves quality. [Paper v2, Table 1 and Appendix A][SS-paper]

### Release and integration boundary

The public repository includes retrieval/router code and a native Drake-directives output, with Blender scenes and conversion scripts for MuJoCo/USD. The README warns that the latter export path needs a separate environment because of OpenUSD dependency conflicts. Its documented default generation path needs SAM3D/SAM3 checkpoints, ArtVIP assets, material data and hosted model/image calls; installing Python dependencies alone is insufficient. [Repository README][SS-readme]

Code is MIT under the inspected [license][SS-license]. The example-scene dataset card labels its distribution Apache-2.0. Neither label establishes the complete rights inventory for all retrieved assets, model checkpoints, or hosted outputs. No conversion equivalence or target-game-engine import was tested. [Example scenes][SS-dataset]

**Proposed fair comparison:** on a fixed candidate pool, compare semantic-only, semantic-plus-box and six-view first-acceptable selection. Separately compare a best-scoring candidate policy. Keep candidate generation budget and semantic pool fixed; use independent interaction, articulation, material and geometry checks. Report rejected candidates, infrastructure failures and abstention rather than forcing every request to succeed. For scene refinement, include the inexpensive NoCritic condition and object-density-matched comparisons.

## 2. DreamReward / Reward3D: a learned multi-view preference scorer

### Paper mechanism versus released interface

DreamReward trains a preference model from 25,304 annotated pairs drawn from 2,530 filtered prompt groups. Human criteria include text alignment, quality and multi-view consistency. Its DreamFL method adds reward feedback to the 3D optimization pipeline. A learned visual preference score is useful candidate-selection evidence, but the paper does not establish collision, rigging, topology or gameplay fitness. Its reported comparisons with image-only scores concern preference alignment, not engine acceptance. [Paper][DR-paper]

The released scoring module is a concrete tensor interface: images plus tokenized prompt IDs and attention masks produce a scalar reward per four-view object group. `Reward3D_` extracts text-conditioned view features, obtains 128-dimensional features per view, concatenates four into 512 dimensions and passes them through a scorer. The separately released `Reward3D` uses a four-view attention-and-gating fusion module before its MLP. Preprocessing resizes and centre-crops to 224 pixels with fixed normalization. Neither forward signature receives mesh topology, physics state or camera matrices. The four-view grouping and order therefore belong in an adapter contract; it is not an arbitrary-number-of-images scorer. [Pinned scoring source][DR-score]

The guidance source selects `Reward3D_Scorer` or `Reward3D_CrossViewFusion`, loads the associated state dictionary and uses reward loss within generation. The repository describes Scorer as the paper implementation and CrossViewFusion as an extension. Mixing their reported results or weights would change the condition. A standalone candidate-ranking wrapper remains work to implement and validate; the released guidance is not a ready-made game-asset approval service. [Pinned guidance][DR-guidance], [README][DR-readme]

### Release and terms

Both checkpoint files are publicly listed. The code license is MIT, and the model card labels weights MIT. The dataset card labels its release Apache-2.0 but explicitly says only **1,000 of the 2,530 prompt groups** are public. The repository still lists reward-model training code as a future item. Accordingly, inference-component availability is stronger than full training reproduction. Model-card metadata does not settle upstream component and asset rights. [Code license][DR-license], [model card][DR-model], [checkpoint listing][DR-weights], [dataset card][DR-data], [README][DR-readme]

**Proposed fair comparison:** rank the same fixed mesh candidates with random/first candidate, mean per-view image-text similarity, paper Scorer, CrossViewFusion and a blinded human reference. Freeze camera order, lighting, crop and candidate count. Inspect unseen views and perform independent mesh/interaction checks. A scorer used to select or optimize an asset must not also be its sole final judge. Partition prompt families and generators to test transfer rather than only memorized appearance preferences.

## 3. MuMA: selecting multi-view material sets

MuMA accepts an untextured mesh with text/image conditioning and produces PBR textures. Its generated albedo and albedo recovered by IDArb are competing candidates. GPT-4o rates horizontally stitched six-view sets; the selected strategy queries each set separately and averages five repeated ratings. Optional best-of-N also samples generation/decomposition repeatedly, with N=3 in the described setting. This is asset-channel selection, rather than game-logic refinement.

The paper compares joint-image, per-view and per-set scoring. Per-set scoring reports better CLIP/FID/KID than the other two while using 1.16 times the joint-image token budget. Removing scoring/selection changes CLIP from 30.41 to 29.93; adding best-of-N reaches 30.57. These modest paper-reported improvements do not demonstrate calibrated material correctness. Top/bottom inconsistency, lighting baked into albedo and UV gaps remain documented limitations. No official implementation or checkpoint link was found in the inspected paper; code/model release and licensing remain unverified. [Paper v1, §§3.3–4.5 and supplement][MU-paper]

**Proposed adaptation:** preserve each channel-set lineage and choose on fixed lighting/views, then verify relighting and held-out views. Count all generation, decomposition and repeated-judge cost; compare best-of-N against equal-budget sampling without the judge. Do not silently combine independently selected channels from incompatible candidates.

## 4. SceneAssistant: inspection before placement, atomic tools and constrained feedback

### Mechanism and observation boundary

The paper's scene-editing vocabulary separates creation/deletion, transformations, camera movement/focus and finishing. Generated objects can be discarded and regenerated after observation. Its “pure visual feedback” description still includes current object data and mesh-collision warnings; this is not screenshot-only access. The 30-scene human study reports stronger scores for the full system than full-JSON and one-shot variants. On the 22 open-vocabulary cases, NoVisFeedback still receives a grid of the pre-generated assets. Moreover, human preference permits multiple selections, so its percentage is not a conventional pairwise win rate. [Paper v1, §§3–4][SA-paper]

### Actual source contract and failure behavior

The pinned loop sends the current rendered image, scene JSON, prior actions and system messages, then parses an action batch. It blocks batches mixing Create/Duplicate with Rotate/Place/Scale/Translate. Individual action failure restores saved scene state, trims recorded history and repeats the step. Importantly, repeating decrements the step counter: the nominal 20-step maximum does **not** bound repeated action failures. Human-edit mode is also unbounded. Render failure exits. Finish and step exhaustion both save scene state, so a saved final JSON alone does not identify successful completion. The parser includes a legacy Python `eval` fallback; it should not be treated as a safe untrusted-action boundary. [Pinned loop and parser][SA-main]

The LLM implementation sends fresh per-turn requests while retaining logs locally. Its Gemini default is a third-party relay endpoint, not direct Google service; the other configured route is an Alibaba-compatible endpoint. Any later integration must explicitly choose an authorized provider and review transmission/credentials separately. No credentials were read, configured or transmitted in this research. [Pinned client][SA-llm]

The README documents per-step PNG/state JSON, final `scene.json`, and a renderer capable of exporting Blender files. Source is public at the pinned revision, but its complete tree contains no LICENSE file and the README supplies no explicit code-use grant. Treat reuse permission as unresolved. Hunyuan3D, Z-Image, Blender and hosted-service terms also remain separate. [README][SA-readme], [pinned source tree][SA-tree]

**Proposed fair comparison:** keep authoritative state access equal while testing fixed versus agent-controlled cameras, raw images versus labels/coordinate overlays, atomic actions versus full JSON, and collision warning on/off. Add an external wall-clock and total-attempt budget; log failure retries and human interventions. Persist action success/failure and ending reason separately from the saved artifact. State rollback is not evidence that generation cost, files or remote side effects were undone.

## 5. AVR-Agent / AVR-Eval: game-candidate selection can matter more than critique

### Author result and its scope

The study evaluates five JavaScript games and five animations. It reports a benefit from best-of-k initial content, but no significant aggregate benefit from adding custom assets or audiovisual feedback. The evaluator first describes each recording separately, compares them, then uses a text model to review the judgment. Evaluation comparisons reverse A/B presentation. These are useful counterexamples to treating more visual feedback as automatically better. They are not proof that visual feedback is generally ineffective: tasks, models, observations and the automatic judge are specific to this study. The paper states that its automatic evaluator was not directly validated against human preference. [Paper v1][AV-paper]

### Source-inspected candidate and recording contracts

Asset selection is primarily metadata-driven. The asset scanner extracts image dimensions, audio tempo/duration and GLB animation information; selection presents directory/pack and file information to a model. Thus selected custom assets do not imply that the coding model inspected their actual appearance or sound. Preserve the distinction between a filename-only asset catalog and visual/audio asset grounding in any comparison. [Pinned asset selector][AV-assets]

`select_best_candidate` renders candidates and performs a sequential incumbent-versus-challenger tournament. Optional console-error filtering prefers apparently clean candidates, but falls back to all when none qualify. Missing recordings skip comparisons; absent/failed judgments keep the incumbent. The function can return the existing code unchanged. Therefore “best” denotes this tournament's selected candidate, not an exhaustive or order-invariant optimum. A wrapper should record comparison failures rather than silently equating an unchallenged incumbent with a validated winner. [Pinned builder][AV-builder]

The recording code uses Selenium/Chromium, starts the generated page and attempts a `start-button` click. It records video, closes that browser, then opens the page again for audio. It retains only the first configurable number of unique console-log entries (default five), despite a source comment describing ten. Its error-cleanliness return tests exact `SEVERE` list membership against full prefixed messages, rather than reliably scanning severity within each message. This caveat applies to the recorder return; the builder's separate candidate filter does perform a substring check on its supplied logs. Audio and video therefore do not inherently describe the same stochastic rollout, and truncated logs are not complete runtime evidence. Synchronized event fidelity would require a separate deterministic replay or simultaneous-capture test. These are source observations, not a reproduced recording defect. [Pinned recorder][AV-recorder]

### Availability and terms

The repository is public, marked archived/read-only, and contains builder, evaluator, example experiment scripts and output conventions: HTML, MP4, optional WAV, logs, per-iteration content and optional memory/resume state. The code license is MIT. The README separately says source assets must be downloaded individually and lists mixed terms, including redistribution prohibitions and assets without a stated license. Its general permissive-assets wording is insufficient clearance for a redistributable benchmark bundle. Models and hosted providers require their own review. [Repository README][AV-readme], [code license][AV-license]

**Proposed fair comparison:** cross initial-best-of-k on/off with audiovisual critique on/off under matched total model, recording and candidate budgets. Add raw-asset previews as a separate intervention. Grade final gameplay with independent action/state tests and held-out recordings rather than only the selection judge. Keep the self-playing code separate from evidence that real user inputs, controls and failure states work. Record tournament order, A/B reversal, judge version, missing recordings, retained memory and every discarded candidate.

## Shared proposed acceptance record

This section is **GameMap editorial design**, not an implemented piRSI adapter or a result from any paper.

1. **Candidate identity:** requested purpose, original prompt, generation/retrieval source, model/checkpoint, seed, source license and immutable asset hashes. Retain failures and candidates rejected before rendering.
2. **Evidence packet:** camera extrinsics/intrinsics, units/up/front conventions, lighting/material setup, frame order, image sizes/crops and actual model-facing packet. Preserve original files separately from resized judge images.
3. **Separate judgments:** semantic fit, visual coherence, geometric constraints, functional representation, runtime behavior and legal eligibility. Aesthetic ranking must not override a required collision, articulation, readability or rights gate.
4. **Selection policy:** first acceptable, scalar ranker, sequential tournament and regenerate-with-revised-prompt are different algorithms. Declare pool size, tie rule, abstention, retries, judge repeats and candidate ordering.
5. **Final independence:** use held-out views, target-engine state assertions and human checks where appropriate. Do not train, select and report solely against the same learned/VLM score. Block benchmark solutions and final-test evidence from reflective memory.
6. **Budget and end state:** account for generator, renderer, evaluator, repair and infrastructure cost. Record accepted, rejected, inconclusive, infrastructure-failed and budget-exhausted separately. A rendered preview or saved scene is not proof of a functioning game.

The most defensible first fixture is **selection over an already frozen, rights-cleared candidate pool**. It tests ranking/feedback without confounding generation quality, incurring paid generation calls, or suggesting that this source review granted execution permission. A later generation-in-the-loop study is a separate experiment.

## Revision record

GitHub commit endpoints and contents reads resolved the following revisions. Files cited above were inspected at these hashes. These are code pins, not installed environments, model-weight pins, service snapshots or reproduction certificates. Web-cached `main` pages were used only for discovery/status; source claims use the pinned contents.

| Project | Inspected commit | Principal files |
| --- | --- | --- |
| SceneSmith | `67cc408fd38334b4a926efef45e284302ed5055b` | articulated retrieval/schema, asset router, validation prompt, checkpoint state, LICENSE |
| SceneAssistant | `dcedd341f36ca1a0cfb3f0392c6a203b84a3a616` | main.py, llm.py, readme.md, complete tree |
| DreamReward | `eeb5c648e6c2a25c8f6f8038edfe75d73c811614` | Reward3D/Reward3D.py, guidance1, LICENSE |
| AVR-Eval-Agent | `3c91b950caada637c517f0ae158ba31a298d3901` | assets.py, video_game_builder.py, relative_eval.py, video_utils.py, LICENSE |
| MuMA | arXiv `2503.18461v1` | paper and supplement only; executable release unverified |

[SS-retrieval]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/articulated_retrieval_server/retrieval.py
[SS-schema]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/articulated_retrieval_server/dataclasses.py
[SS-router]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/asset_router/router.py
[SS-validation]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/prompts/data/asset_router/asset_validation.yaml
[SS-paper]: https://arxiv.org/html/2602.09153v2
[SS-readme]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/README.md
[SS-license]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/LICENSE
[SS-dataset]: https://huggingface.co/datasets/nepfaff/scenesmith-example-scenes
[DR-paper]: https://jamesyjl.github.io/DreamReward/static/pdf/DreamReward.pdf
[DR-score]: https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/Reward3D/Reward3D.py
[DR-guidance]: https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/threestudio/models/guidance/DreamReward_guidance1.py
[DR-readme]: https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/README.md
[DR-license]: https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/LICENSE
[DR-model]: https://huggingface.co/yejunliang23/Reward3D
[DR-weights]: https://huggingface.co/yejunliang23/Reward3D/tree/main
[DR-data]: https://huggingface.co/datasets/yejunliang23/3DRewardDB
[MU-paper]: https://arxiv.org/html/2503.18461v1
[SA-paper]: https://arxiv.org/html/2603.12238v1
[SA-main]: https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/main.py
[SA-llm]: https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/llm.py
[SA-readme]: https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/readme.md
[SA-tree]: https://github.com/ROUJINN/SceneAssistant/tree/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616
[AV-paper]: https://arxiv.org/html/2508.00632v1
[AV-assets]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/assets.py
[AV-builder]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/video_game_builder.py
[AV-recorder]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/video_utils.py
[AV-readme]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/README.md
[AV-license]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/LICENSE
