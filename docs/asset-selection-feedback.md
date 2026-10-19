# Asset candidate selection and visual-feedback creation

Select assets against a concrete task, compare candidates in context, and use visual feedback to guide revisions. The systems below show different ways to retrieve, rank, edit, and evaluate 3D content.

## Reading the selection evidence

The existing generative-tools and generation-delivery notes explain producing and obtaining assets. Asset-validation notes explain geometric and interchange checks. Visual-evidence notes cover perceptual diagnostics and several creation assistants, while benchmark-reproducibility covers task isolation. The missing connection is **how a system chooses among candidates, what evidence actually reaches its judge, and whether refinement beats spending the same budget on fresh candidates**.

See also [Visual-feedback mechanisms](visual-feedback-mechanisms.md) for frame selection, crop memory and temporal diagnosis. Scene generation is relevant to game production, but is not itself a playable-game result.

For the distinction between a fixed candidate-pool comparison and independent repetitions of a complete selection tournament, see [statistical independence and adaptive feedback](benchmark-reproducibility.md#harness-selection-statistical-independence-and-adaptive-feedback).

For fixed-reference render comparisons, [FLIP input/output and display contracts](visual-evidence-research.md#flip-display-aware-render-differences) distinguish raw errors from colorized previews, HDR exposure policy and invalid aggregate sentinels. A perceptual distance remains one diagnostic, not a substitute for the task-specific acceptance evidence below.

## 1. SceneSmith: semantic retrieval, geometric reranking and first-acceptable validation

### Source-inspected acquisition interface

The articulated retriever accepts a description, object type, optional desired dimensions `[width, depth, height]` in metres, and requested result count. It filters by type, ranks by CLIP similarity, takes a configured semantic candidate pool, then optionally sorts that pool by **L1 bounding-box dimension distance**. Without dimensions it preserves semantic ranking. Returned candidates include object/source identifiers, SDF path, description, CLIP and dimension scores, and bounding-box endpoints. This is a staged reranker; the implementation does not combine semantic and geometric scores into a calibrated scalar. A mismatched desired box can reorder otherwise strong semantic candidates. [Pinned retriever][SS-retrieval], [request/result schemas][SS-schema]

The router's generated branch acquires one candidate at a time and renders four side views plus vertical views. It asks a VLM for `is_acceptable`, `reason` and `suggestions`, and returns the **first accepted** candidate. A positive `max_retries` controls the number of attempts; zero requests one acquisition without validation. Retrieval branches similarly walk candidate lists. Exhausted strategies return `None`. Rendering or VLM errors become negative validation results with explanatory reasons. In the inspected generated retry loop, suggestions are logged but are not passed back as a changed item description. Thus this path is rejection sampling, not a verified prompt-rewriting optimizer or global best-of-N ranker. The same named validation directory is reused across attempts, so an adapter must independently establish whether all candidate evidence survives. [Pinned router][SS-router]

### What acceptance actually means

The strict validation prompt checks category, explicit style, completeness, plausible proportions and whether separately manipulable objects have been fused into one mesh. It rejects furniture with attached manipulands and open containers with distinct contents, subject to stated exceptions. It also rejects generated cabinets with open doors/drawers because the mesh cannot articulate. These are useful **functional representation checks**. However, the same prompt explicitly tolerates garbled text and approximate rather than truly metallic, transparent or reflective materials. Its floor-lamp stability rule is a visual design heuristic, not a measured centre-of-mass or contact test. Do not label this acceptance as material fidelity, readable signage, or physical certification. [Pinned validation prompt][SS-validation]

### Feedback, evidence and findings

The paper describes designer/critic/orchestrator roles, structured state plus scene renders, and rollback retaining agent context. Against NoAssetValidation, Table 1 reports 63.0% realism preference (forced choice) and 62.2% faithfulness preference **excluding ties**; these denominators differ. Removing scene observation significantly affects realism, but not faithfulness at the reported threshold. NoCritic's nonsignificant preferences are not an equivalence result: full-system win rates are 51.8% realism and 47.5% faithfulness, with 95% intervals spanning 50%. Its mean cost is $4.24 versus $13.98 per scene over 179 room-level prompts, about 70% lower, with 54.0 versus 71.1 objects. Timings use 25 concurrent scenes on eight L40S GPUs, not optimized single-scene latency. These author results support a cost–density trade-off, not a universal critic benefit. [Paper v2, Table 1 and Appendices N/O.5][SS-paper]

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

## 6. Mechanism blindness and regressive scene edits

Checked 2026-10-18 from primary papers/project artifacts. These are editable 3D-creation studies, not demonstrated production-game gains. No model, engine, benchmark or evaluator was executed. Paper-described methods and partial releases remain separate from implemented GameMap support.

### SimWorlds / 4DBuildBench: plausible motion can conceal the wrong mechanism

The [paper v1, July 2, 2026](https://arxiv.org/html/2607.01766v1) describes Blender 5.1 construction with stage-specific planning, verification, review and checkpoints. Runtime inspection covers modifiers, baked caches, animation channels and motion phases; previews remain a separate evidence source. Its 50-scene benchmark uses 42 typed mechanism predicates alongside five-frame visual judging for dynamic clips and one still for static scenes. Mechanism Pass Rate averages predicate fractions within actors and scenes, then macro-averages dynamic difficulty/category cells; it is not the fraction of wholly correct scenes.

Reported overall mechanism scores are 0.87 versus VIGA's 0.67, while visual scores are 0.82 versus 0.78. Examples include simulated effects approximated through keyframes, which sampled renders can accept. However, generation budgets differ, and the comparison changes several components. On a separate 15-scene ablation subset, removing verification changes structural score from 0.97 to 0.87, while mechanism score changes only 0.97 to 0.93. This does not isolate a universal visual-feedback benefit. Structural scoring also depends on inferred object grouping for the baseline. Predicate evaluation is deterministic, but an optional actor-matching fallback uses a model. See §§3–4 and Appendices A/C/D.

**Availability discrepancy:** The [official project page](https://dynsimworlds.github.io/) instead reports mechanism scores 0.86/0.71 and names Sonnet 4.6 as visual judge, whereas the paper names GPT-5.5. Keep these conditions separate. Its displayed arXiv and Dataset controls resolved back to the project page during inspection; no executable repository or dataset release was retrieved through the inspected official surfaces. The paper's references to released code are not an independently verified release. Software/data reuse terms and runtime equivalence remain unresolved.

### LEGO-Anything / LEGO-Plugin: refinement can discard a better scene

The [paper v1, September 28, 2026](https://arxiv.org/html/2609.36380v1) studies Blender 5.0.1 reconstruction and evaluates intermediate artifacts. It reports 29.6% score-decreasing edits for GPT-5.6-sol and a final score 3.2 points below its best intermediate scene. In a six-builder/six-judge comparison, self-judging agreement with deterministic geometry-score direction is 45.8%, versus 45.4% cross-model. This is metric-direction agreement on artifact-valid checkpoint pairs, not human preference or gameplay correctness.

The paper-described plugin combines reference-derived initialization, geometric residuals and bounded edit transactions. Transactions declare editable/protected entities; missing hard-check evidence blocks acceptance; later scene changes invalidate validation. Reference masks/depth are inferred observations, and the agent assigns them to scene entities. Private benchmark geometry is withheld. On 42 Office cases the combined plugin improves all six model settings, but this comparison does not separate the three modules' effects or establish transfer beyond that subset. See §5 and Appendices F/G.

**Available evidence is partial:** The [official page](https://lego-anything.com/) says code is coming soon. A public, versioned [ancillary JSON](https://arxiv.org/src/2609.36380v1/anc/appendix_verified_evidence.json) supplies summary counts, confusion matrices and hashes of author-side source files, not those underlying files or an executable evaluator. Its judge matrix contains four builders/four judges and 960 primary judgments, each with Reconstruction/Appearance labels, whereas the manuscript describes six/six and 2,160. That narrower artifact cannot verify the entire manuscript matrix. Its labels include ties and both-bad outcomes, so a universal 50% chance baseline needs qualification. No released plugin implementation, complete benchmark package or code/data license was verified.

### Proposed GameMap acceptance fixtures, unimplemented

1. Require both mechanism evidence and observed outcomes when the brief explicitly demands simulation or interaction. Compare a genuine solver-driven domino chain with a visually similar keyframed sequence, then perturb an initial condition and test the declared response. Keyframes remain legitimate for a brief that requests authored animation.
2. Track each scene revision, protected entities, actual edits, render/camera settings, validation freshness and rollback result. Add a repair that improves the target object while damaging a previously correct camera or interaction. Retain the best independently accepted revision rather than assuming the final edit is best.
3. Compare no feedback, visual-only feedback, engine-state feedback and their combination under matched generation/render/verification budgets. Separately ablate transaction protection and initialization. Keep model-derived masks/depth distinct from authoritative state, count all failed attempts, and protect final evaluation from refinement feedback.

These studies justify targeted diagnostics and new experiments. They do not establish a ready-to-install GameMap adapter or justify ranking game-creation systems by their reported scores.


## 7. Code4Scene: target recovery and collateral changes require different comparisons

Checked 2026-10-19, source-only. The [paper v1, 2026-09-29](https://arxiv.org/html/2609.36777v1) evaluates saved Unreal scenes, separating construction from reference-guided repair. Repair targets come from the input and withheld desired scene; the candidate cannot redefine them. Its benchmark has 190 cases, with 95 public cases, while the currently inspected release has a different task inventory. The study concerns static scenes, not authored dynamics or complete-game success. Repair tolerances and score weights are benchmark choices, not human-calibrated equivalences. Its image-to-scene scores have not been validated against human judgments, and repeated scene-generation variability is unmeasured. These are paper results and limitations, not a reproduced GameMap integration.

The [author-linked repository](https://miemiechen.github.io/) was inspected at [2716e4397f768bf16b1f33dd34680d48aed0601f](https://github.com/SimWorld-AI/Code4Scene/tree/2716e4397f768bf16b1f33dd34680d48aed0601f), dated 2026-10-03. This source pin is not established as the exact version that produced the paper's results.

**Source-inspected contracts:**

1. **Target recovery is not preservation.** `actor_f1.measure(input, ground_truth, candidate)` derives targets before examining the candidate. It returns counts/rates plus correspondence and unmatched-object audits. Added/changed candidate actors and surviving corrupted targets enter the candidate population; unintended background deletion and repurposing add false positives. Moving an unrelated chair to satisfy the requested chair repair therefore cannot also count that chair's original role as preserved. Matching is one-to-one and prioritizes unchanged background multiplicity; a duplicated-looking object cannot fill two roles. Input/candidate correspondence uses structural and spatial evidence rather than names or GUIDs. Camera/scene-capture actors are excluded, and [background bounds-only changes are not scored](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/protocol/actor_f1.py#L126-L128). Separate camera and geometry-preservation assertions remain necessary. [Actor F1 implementation, lines 201–319 and 336–451](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/protocol/actor_f1.py#L201-L451), [semantic actor filter](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/requirement_graph/repair_target_authoring.py#L124-L135)

2. **A repair tolerance must not become the unchanged-scene tolerance.** Correspondence detects edits at 0.1 cm per position axis, 0.01° rotation and 0.0001 scale, whereas nominal target acceptance uses 5 cm Euclidean position, 5° quaternion rotation and 5% maximum per-axis relative signed-scale error. Acceptance requires correct structural identity and every applicable bounds/attribute check. Missing or nonfinite required pose/bounds values fail. Ground-truth channel presence determines applicability; omitting a candidate channel cannot disable it. Target authoring separately projects existing actors onto evidence fields shared by input and ground truth, avoiding invented changes from asymmetric exports. Freeze both schemas and record unobserved channels. [Change tolerances](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/scene_diff.py#L50-L51), [acceptance checks](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/repair_success.py#L22-L130), [target projection](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/requirement_graph/repair_target_authoring.py#L311-L350)

3. **Visual diagnostics and the published repair score have different authority.** The current repair verifier publishes Actor Repair F1 even if local/global visual diagnostics fail, preserving the diagnostic error separately. Do not interpret a numeric F1 as successful visual inspection. The scoring documentation combines 0.8 Repair F1 with 0.2 static Physical Safety; paired-image and caption comparisons are report-only. Static support/contact checks do not certify stability or player interaction. [Verifier dispatch](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/verifiers/gt_repair.py#L977-L1015), [scoring protocol](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/docs/SCORING.md)

4. **An offline score is bounded by its exported evidence.** Valid repair bundles require input, desired and candidate snapshots plus a physics report. Referenced files are hash-checked by default. This detects changed bundle bytes; it does not independently prove the original engine measurement. Offline scoring rechecks snapshot integrity but consumes recorded dependency/library verdicts and physics evidence. Retain exporter version, scope, original scene revision and capture failures alongside the bundle. [Bundle validation/loading](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/bundle.py#L201-L301), [evidence contract](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/docs/EVIDENCE_BUNDLE.md)

**Availability and version boundary.** The [README](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/README.md) headlines 160 construction tasks and says 150 are included. The complete pinned tree contains 150 construction, 25 indoor-repair and 50 outdoor-repair task definitions; the three published schedule files have the same counts. Editing code is present despite the README's construction emphasis. Do not silently label the 225 released definitions as the paper's 95-case public cohort. Code is [Apache-2.0](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/LICENSE); original Fab content is not bundled and retains separate terms. UE 5.8, content packs and a judge deployment are prerequisites for relevant live workflows, not installed capabilities here.

**Proposed GameMap fixture, unimplemented:** use project-owned saved input/desired scenes with frozen export schemas. Compare exact recovery, unchanged corrupted input, correct recovery plus unrelated movement/deletion, background-object repurposing, duplicate objects, identity renaming, reflection by negative scale and missing required fields. Keep camera and gameplay-state preservation assertions outside this actor metric. Measure all-goal recovery, collateral edits and evidence coverage separately; require cold-reopen integrity and actual traversal/interaction checks for gameplay claims. The initial comparison can use frozen snapshots without rerunning a model; later engine validation is a distinct authorized experiment.

For the complementary observation gate, see [InfiniBench constraint verdicts and camera coverage](visual-evidence-research.md#infinibench-constraint-verdicts-and-camera-coverage). A saved-state repair score does not establish that the evidence camera observed every required object.

## Shared proposed acceptance record

Use this implementation plan to connect asset selection, visual feedback, and piRSI.

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
