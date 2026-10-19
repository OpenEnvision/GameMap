# Visual-feedback mechanisms for game-creation harnesses

Sources checked **2026-10-18**. Sources checked; full reproduction not performed. No model, engine, benchmark, generated-asset service or credentialed evaluator was executed.

This dossier extends the [visual evidence inventory](visual-evidence-research.md) with concrete information-selection and feedback mechanisms. It distinguishes game-creation studies, gameplay-video QA, scene-generation systems and transferable general-vision methods. A mechanism that helps answer a video question does not thereby improve a game creator. Source-code inspection establishes implementation behavior, not a reproduced outcome.

## Choose the intervention before choosing the score

| Question | Relevant mechanism | Evidence that must remain separate |
| --- | --- | --- |
| Which moments support an interaction judgment? | Rubric-directed replay positions; bug-frame retrieval | Frame-selection support versus correct verdict; selected frame versus full event interval |
| Where should the agent look? | High-resolution crop search and coordinate memory | Predicted region versus authoritative object identity; crop-local versus source coordinates |
| What can fit in context? | Hierarchical selection, learned token compression, compact investigation memory | Omitted evidence versus absence of a defect; black-box context policy versus changed model internals |
| Is a strange motion actually a defect? | Game-aware context, alternative-explanation debate, temporal grouping | Inferred rules versus project specifications; model confidence versus calibrated accuracy |
| Which generated asset should be kept? | Retrieval ranking, first-acceptable validation, iterative scene criticism | Appearance versus geometry/material/runtime validity; more candidates versus a better selector |

The sections below retain source-specific availability and limitations. Proposed comparisons are **GameMap editorial guidance**, not published findings or implemented tests.

## 1. A2Z GameSpec-Bench: trace-guided frame retrieval

**Paper-described interface.** A selector receives a visual rubric, executed input trace with render timestamps, and observation budget. It requests replay positions/intervals; a deterministic resolver returns recorded frames. The final judge receives frames and rubric, producing item scores, rationales and cited frame IDs. In its matched-budget experiment, requests resolve to the first captured frame at or after the requested timestamp, subsequent requests can use observed frames, and every inspected frame counts toward the budget.

**Reported finding and qualification.** Across 244 replays from 50 generated Small games, adaptive selection won 60.5% of the 1,159 preference-bearing item comparisons. Among all 4,102 comparisons, 17.1% favored adaptive, 11.2% uniform, 69.4% were equivalent and 2.3% insufficient. This is model-audited rationale support, not correctness against reference labels. Method names were masked but paths retained source-directory names. [Paper v1, §§D.2 and G.3](https://arxiv.org/html/2609.39564v1)

**Availability and terms.** The [official repository](https://github.com/krafton-ai/a2z-gamespec-bench) explicitly says code is forthcoming; its inspected tree has documentation/assets rather than a released evaluator. Do not repeat the abstract’s broader availability claim as proof of an executable selector. Original repository code/GDDs/contracts are MIT, third-party materials retain their own terms. The [dataset card](https://huggingface.co/datasets/KRAFTON/A2Z-GameSpec-Bench) releases 100 GDD/contract/scenario tasks, all in `test`; Small/Big are size categories, not train/test partitions. It specifies Phaser 4.1, TypeScript and Vite.

**Proposed GameMap adaptation, unimplemented.** Use this first for brief UI feedback and action-triggered transitions. Baseline: uniformly spaced original-resolution frames from the *same recording*. Candidate: trace-guided frames, matched by total inspected pixels/frames, including exploratory retrievals. Measure annotated transition coverage and unsupported verdicts. Input events are not proof of rendered outcomes. Keep evaluator-only requirements out of agent context.

## 2. V* / SEAL: guided crops plus visual working memory

**Mechanism.** The VQA model names missing target objects, searches, and reasons over the question, global image, crops and locations. Working memory is per-question context. On 191 V*Bench examples, the [v2 paper, Table 2 and §5.2](https://arxiv.org/html/2312.14135v2) reports 75.39% for SEAL versus 45.02% for a no-memory/search LLaVA-style model trained on the same data. This is not merely switching search off in a frozen checkpoint. Keeping working memory but substituting GroundingDINO or OWL-ViT gives 62.30% or 62.82%, a closer comparison of search against direct detection. These are specialized high-resolution image-QA results, not game-editor or repair gains.

**Source-inspected interface.** [`visual_search.py`](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/visual_search.py) accepts a PIL image, target-object text, search model, minimum patch size, confidence thresholds and optional visualization target box. It returns `(final_step, path_length, search_successful, all_valid_boxes)`. The search recursively divides patches, prioritizes target/context heatmaps, and can fall back to a lower-confidence candidate. A final-step detection is crop-local pixel `(x,y,w,h)`; the enclosing patch has its own original-image offset. The success flag is therefore mandatory evidence, not redundant metadata. In the no-candidate path, `final_step` can remain `None` before being dereferenced: this is a source-visible edge case, not a reproduced crash.

[`app.py`](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/app.py) adds crop offsets, extracts slightly expanded object crops (`patch_scale=1.2`), then maps boxes through square-image padding and normalization before the final VQA call. The demo warns that its search focuses on common objects and single-instance cases.

**Availability and terms.** Public code, benchmark and checkpoint links appear in the [README](https://github.com/penghao-wu/vstar). Repository [LICENSE](https://github.com/penghao-wu/vstar/blob/main/LICENSE) is MIT. The linked [VQA](https://huggingface.co/craigwu/seal_vqa_7b) and [search-model](https://huggingface.co/craigwu/seal_vsm_7b) pages had no substantive model card or license declaration in the inspected page; code MIT is not a clearance for weights, base model or images.

**Proposed GameMap adaptation, unimplemented.** Compare global screenshot only, fixed grid crops, and query-directed crops at matched image/token budgets. Keep the global screenshot so local crops do not erase spatial context. Each crop needs source frame hash, pixel box, transform and explicit search-success status. Add absent-target and repeated-instance cases; do not translate failed search into proof an object is absent.

## 3. VideoTree: relevance-dependent breadth and depth

**Source-inspected interface.** [`adaptive_breath_expansion.py`](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/adaptive_breath_expansion.py) consumes per-video `.pt` frame features and question/caption records. It clusters feature vectors, chooses representative frame offsets, obtains relevance scores, and writes per-video predictions plus `width_res.json` containing `name`, `tree_node`, and `cluster_ids_x`. It doubles breadth until enough scores equal 3 or the maximum is reached; [`defaults`](https://github.com/Ziyang412/VideoTree/blob/main/util.py) are breadth 8→32 and four highly relevant frames.

[`depth_expansion.py`](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/depth_expansion.py) consumes those cluster assignments, features and relevance scores. Score 1 retains a representative; score 2 expands one level; score 3 expands two. It exports `name`, time-sorted `sorted_values` and `relevance`. Paths are hard-coded placeholders.

**Important representation boundary.** [`prompts.py`](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/prompts.py) selects captions for the final prompt, not original frame pixels. Audit index conventions before reuse: representative tensor offsets are zero-based, while the caption-selection code keeps positive offsets and uses `captions[i-1]`. This source-level mapping concern requires a fixture, not a runtime-defect claim.

**Reported finding.** The [paper v2, Table 5(b)](https://arxiv.org/html/2405.19209v2) reports EgoSchema-subset accuracy of 66.2, 64.4 and 61.2 for the full method, removal of depth expansion, and the further removal of adaptive breadth. This is video QA, dependent on caption fidelity, not game debugging.

**Availability and terms.** [Public repository](https://github.com/Ziyang412/VideoTree), MIT [license](https://github.com/Ziyang412/VideoTree/blob/main/LICENSE); Python 3.8+, GPU-oriented clustering/features and an LLM are documented. Dataset/model/provider terms remain separate. Training-free still uses pretrained models.

**Proposed GameMap adaptation, unimplemented.** Treat the output as an index over retained raw evidence. Compare uniform sampling, fixed-width clustering, adaptive breadth only and breadth-plus-depth at equal total caption/model budgets. Include repeated states and brief transitions. Replacing final captions with pixels creates a new adapter.

## 4. LongVU: temporal filtering and selective spatial-token retention

**Mechanism and reported result.** LongVU fuses DINOv2/SigLIP features, removes temporally redundant frames, gives query-relevant frames greater spatial-token resolution, then drops spatial tokens redundant across neighboring frames. In the [ICML 2025 paper, Table 3](https://proceedings.mlr.press/v267/shen25j.html), the 8K-context VideoMME scores progress from 57.56 for uniform 64-token frames to 59.90 with DINO temporal reduction, 60.08 with query selection and 60.56 with spatial compression. Temporal reduction alone slightly lowers EgoSchema versus the 64-token uniform baseline, so the components are not universally beneficial.

**Source-inspected contract.** [`longvu/cambrian_arch.py`](https://github.com/Vision-CAIR/LongVU/blob/1b0be5cc28614b03a423bbaf129ae364750b5012/longvu/cambrian_arch.py) exposes `select_frame(feature_list, split_sizes, input_ids, new_image_aux_list, image_sizes, window_size=16, threshold=0.83)`. It returns selected features, updated frame counts, two selected image tensors and original selection indices. Its long-video branch retains window-center anchors and caps selected frames at 400. Query-ranked resolution allocation and spatial-token dropping occur inside multimodal-input preparation, with additional truncation under pressure. These internal embeddings cannot shorten an unrelated hosted model’s visual context.

The [README inference path](https://github.com/Vision-CAIR/LongVU/blob/main/README.md) decodes roughly one frame per second, preprocesses them, and calls `model.generate(input_ids, images=video, image_sizes=...)`. It emits answer text, not an evidence manifest; the documented local demo asks for a 40G GPU.

**Availability and terms.** Public code with Apache-2.0 [LICENSE](https://github.com/Vision-CAIR/LongVU/blob/main/LICENSE), Qwen2-7B and Llama3.2-3B checkpoints linked. Both inspected upstream checkpoint pages display Apache-2.0 metadata ([Qwen2](https://huggingface.co/Vision-CAIR/LongVU_Qwen2_7B), [Llama3.2](https://huggingface.co/Vision-CAIR/LongVU_Llama3_2_3B)); this does not replace review of the base-model and training-data terms.

**Proposed GameMap adaptation, unimplemented.** Keep this as a model-internal research track, separate from pi harness-only optimization. Hold backbone/weights/evaluator fixed and ablate temporal reduction, resolution allocation and spatial dropping. Export provenance; measure rare-event recall, text loss and temporal-order errors. One FPS decoding cannot recover an event it never sampled.

## 5. Automated Bug Frame Retrieval: useful retrieval pipeline, unsafe headline metric

**Paper-described interface.** Re-encode gameplay video to H.264 medium, extract encoding keyframes, summarize the bug report with a visual/nonvisual flag, and ask GPT-4o for JSON `Explanation` and `Ranking` (frame filenames), or no result. Consecutive batches are re-ranked in a second pass. Candidate coverage and final retrieval success must remain distinct.

**Metric caution.** `Accuracy@N=TP@N/(TP@N+FN)` excludes false positives, so 0.89 is not whole-video accuracy. The reported pass@3≈0.98 also fails its own arithmetic: `1-(1-.68)^3≈.967`, and independent identical trials are not established. The 94 never-correct videos would imply `256/350≈73.1%` with any correct outcome, including correct abstentions, but the repeat-run tallies are inconsistent: the 183/48/25 videos correct in 3/2/1 runs imply 670 correct outcomes, whereas Table 3 reports `528 TP@1+184 TN=712`. Treat 73.1% as an implication of one reported tally, not a verified empirical pass@3; do not cite 98% as a measured result. Industrial data came from one first-person-shooter game; no public executable/data release was identified in the paper. [Paper v1, Table 3 and §5.3](https://arxiv.org/html/2508.04895v1)

**Proposed GameMap adaptation, unimplemented.** Keep separate denominators for candidate-frame coverage, correct retrieval among all bug-bearing videos, false-positive retrieval on clean videos, and correct abstention. Compare encoding keyframes, uniform and event-aware sampling on owned fixtures. Preserve original timestamp mappings. Return temporal neighborhoods for animation/stutter faults; single stills cannot establish them.

## Proposed shared observation contract

Retain source build/run/frame hashes, original timestamps and render boundaries; selection policy/query and every inspected frame; crop/resize/padding transforms; model/config and inferred-success status. Keep raw evidence beside captions/features, reset episode memory, and keep authoritative engine checks distinct from visual inference. First fixture: a briefly enabled button followed by a delayed effect, with transitions independently annotated from the full recording.

## Source revision boundary and fingerprints

The earlier commit lookup failure was resolved on 2026-10-18. The following exact-commit files were re-read; every byte length and SHA-256 matches the previously recorded fingerprint. These pins identify inspected source, not installed software, model weights or reproduced behavior.

| Source file at inspected revision | Bytes | SHA-256 |
| --- | ---: | --- |
| [VideoTree/adaptive_breath_expansion.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/adaptive_breath_expansion.py) | 6988 | `994f802fe6312ea27511278c3f50212a28280378eed95ce646bc0c755b48ca06` |
| [VideoTree/depth_expansion.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/depth_expansion.py) | 11615 | `195293dd8ffe7a9d34604f9f3e0955d588eb3bb1d11f3bf14e2b87d1afb6bd11` |
| [VideoTree/prompts.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/prompts.py) | 19729 | `e1bf0e3e15473c9acc33826a2094b36a880aacdb9d5e0e252c9a86c550bfdb9c` |
| [vstar/visual_search.py](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/visual_search.py) | 24001 | `f58eddc2416705f32ac80b52f5e1f9ad1bbe801dece13232131b462053bc0b0d` |
| [vstar/app.py](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/app.py) | 9003 | `60b1ee80dfb37ea82f4317880c6d2df02e5dc8d45141a4e5f7e7d2aea0903830` |
| [LongVU/longvu/cambrian_arch.py](https://github.com/Vision-CAIR/LongVU/blob/1b0be5cc28614b03a423bbaf129ae364750b5012/longvu/cambrian_arch.py) | 75765 | `f43449095b175c1d656d691a05fb6e01bdfbd8834490a9ed0b64c0b03b3821b9` |

Commit resolution: VideoTree `605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e`; V* `4ede6647959cfb59eeabd09286adf6a5f9478da0`; LongVU `1b0be5cc28614b03a423bbaf129ae364750b5012`. Other rolling documentation/model links remain separately scoped.


## Temporal verification: GliDe / VideoGlitchBench

**Source scope:** [paper v2](https://arxiv.org/html/2604.07818v2), plus six inspected files at upstream commit `0626688f2b2eab5414d8f8e28e682cfaf607c0ab` (2026-10-18). This is offline gameplay-video diagnosis, not a game-creation agent or authoritative physics assertion.

- **Interface and mechanism:** The [README](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/README.md) documents video/game-name inputs, frame-window screening, targeted VQA/crops and optional SAM3 tracking, then event grouping and interval refinement. Output JSON contains bug descriptions and one or more second-based intervals per bug. Optional tracking can be disabled when unavailable, so tool availability must accompany a result. Intermediate artifacts can be saved.
- **Actual information policy:** In [graph.py](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/graph.py), game context is the longest of the first three distinct nonempty scanner descriptions. It is inferred context, not a retrieved authoritative rulebook. No positive scanner window routes directly to summarization, skipping detailed analysis and grounding. [Memory code](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/analyzer/memory.py) compresses older debate rounds in planner context to judge conclusions; the latest two get more detail. Serialized tool evidence supplied to debate prompts is truncated to a 1,500-character prefix, followed by an omission notice. Full stored evidence and model-visible evidence therefore differ.
- **Reported evidence:** The paper's Qwen2.5-VL-7B ablation reports description F1 of 39.12 with the full system, 33.03 without game context and 32.17 without debate; grounding removal changes its mIoU from 0.53 to 0.32. Those are the authors' dataset/backbone-specific findings, not a matched-cost claim or proof of reliable project QA. A single unusual pose can be valid game behavior; disconnected temporal intervals can describe one recurring event.
- **Evaluator discrepancy and denominators:** The paper assigns pairs using semantic score multiplied by temporal IoU; the pinned [evaluator.py](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/evaluation/evaluator.py) assigns using semantic score alone, then computes overlap. Its description precision/recall sum matched 0–5 judge scores and divide by `5 × predicted/ground-truth bug count`; this is soft description credit, not thresholded true-positive counting. The paper's printed equations omit that factor of five. Mean IoU averages matched pairs only; unmatched events do not enter that mean, and correct no-bug videos do not increase the description numerator. The dataset loop uses only shared ground-truth/prediction names, so missing predictions are excluded. Description-scoring errors can become zero scores. Matching, normalization, missing-output policy and judge failures must be reconciled before calling a run a paper reproduction.
- **Release and terms:** Pipeline and evaluator files are public; [code license](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/LICENSE) is MIT. The [dataset card](https://huggingface.co/datasets/SandyZheng33/VideoGlitchBench) declares Apache-2.0, 4,717 glitch clips and 521 negative clips, with annotations and game-organized video files. Its viewer's split label is `train`; that does not establish a held-out optimization protocol. Underlying game/video rights and model dependencies still need separate review. No data archive, model or service was run.

**GameMap editorial guidance:** compare uniform-window screening, game-context only, debate only and temporal grouping under both equal call/token budgets and reported wall time. Measure candidate-window recall before downstream analysis; include rare brief failures and legitimate stylized movement. Freeze a complete expected-episode manifest, count absent/error outputs separately, preserve report-to-frame references and state whether matching follows paper or code. Compare compressed judge summaries against raw evidence under the same context budget; keep authoritative project rules separate from model-inferred memory. None of these ablations is implemented here.

## Visual QA tasks as observation checks: VideoGameQA-Bench

The [official project](https://asgaardlab.github.io/videogameqa-bench/) separates scene/UI questions, acceptable-versus-unacceptable screenshot changes, parametric clipping, glitch detection, bug descriptions and first-glitch localization. This supplies concrete observation tests: an image pair plus change policy yields a regression judgment; a scene image plus typed questions yields structured attributes; a video yields detection and a first-occurrence answer. These outputs do not establish gameplay-state or collision correctness. The authors report particular difficulty with fine scene/UI details and temporal localization.

The [artifact page](https://asgaardlab.github.io/videogameqa-bench/artifacts.html) exposes per-model results, error counts and differing evaluated sample totals. The [public dataset card](https://huggingface.co/datasets/taesiri/VideoGameQA-Bench) declares CC-BY-4.0. Those are available evaluation materials; a complete runnable evaluator was not established in this inspection. Retain the exact task version, answer schema, timestamp units, error denominator and source-media rights before reuse.

**GameMap editorial guidance:** use original project-owned controlled scenes to test whether crops, image pairs or temporal packets actually preserve a small prop, HUD value, contact transition or brief anomaly. Score evidence selection separately from the final diagnosis and from the agent's repair. A better-written bug report alone is not a more accurate detector.


## Asset feedback and candidate choice

See [Asset selection and visual-feedback creation](asset-selection-feedback.md) for SceneSmith, Reward3D, MuMA, SceneAssistant and AVR-Agent: first-acceptable versus ranked selection, multi-view scoring, actual model-visible evidence and counterevidence to universal refinement gains.

## Proposed controlled harness search

**GameMap editorial guidance.** Treat evidence acquisition as an explicit candidate component alongside the action/tool policy. Keep the game project, model, permissions and task set fixed unless the experiment is expressly about changing them.

1. **Observation packet.** Retain original video/images and build ID; record source timestamps or simulation ticks, camera/viewport, crop-to-original mapping, selection query, model-derived masks/labels, selected and rejected candidate IDs, and omitted-frame ranges. A compact packet should point back to original evidence rather than replacing it.
2. **Matched baselines.** Compare uniform time samples, event-triggered samples and query-adaptive samples at equal frame/pixel budgets; compare full frames versus crop-plus-global-context at equal visual-token budgets. Report selector calls, preprocessing, generation attempts, latency and failures as well as final-model tokens. For learned compression, report the changed checkpoint/architecture separately from prompt/tool-only harness changes.
3. **Useful counterexamples.** Include brief contact failures, valid exaggerated animation, occluded objects, repeated events separated by normal intervals, small HUD changes and empty/missing captures. For assets, test back views, scale/axis/pivot, alpha/material behavior and target-engine import in a future authorized fixture; an aesthetically preferred thumbnail cannot certify these properties.
4. **Separate outcomes.** Score evidence coverage, temporal/spatial localization, diagnosis, proposed repair, executed functional result and subjective quality independently. Keep a no-feedback baseline and a same-budget extra-generation baseline; otherwise a feedback benefit may simply reflect additional attempts.
5. **Prevent selection leakage.** Use project/game-disjoint development and final sets where feasible. Freeze judge prompts and expected episode IDs before comparison. Do not expose held-out answer keys, final scores or inferred final-test lessons to persistent candidate memory. Account for failures, unavailable tools and abstentions rather than dropping them.
6. **Pin and audit.** Preserve source and model revisions, service names, raw tool results, compressed context and exact score implementation. Paper/code discrepancies need an explicit protocol choice before execution. Purpose-specific code, weight, data and service permissions remain a separate gate.

**Remaining boundary:** the collection supports a bounded experiment design, but cannot select a universally best visual harness. That requires a chosen target game/project family, an authorized runtime, owned or cleared assets, calibrated acceptance assertions and a compute/latency budget. No such experiment is claimed here.

## Complementary failure evidence

[Mechanism blindness and regressive scene edits](asset-selection-feedback.md#6-mechanism-blindness-and-regressive-scene-edits) distinguish sampled visual plausibility from requested solver behavior, and final revisions from best independently accepted revisions. [Dead Cells authored constraints](studio-production-case-studies.md#dead-cells-generation-must-preserve-the-authored-experience) and [Far Cry 5 stale-preview tradeoffs](studio-production-case-studies.md#far-cry-5-stale-previews-and-excessive-automation-can-invalidate-feedback) provide historical developer evidence for design intent, dependency freshness and gameplay-constrained art direction. The linked notes preserve paper/artifact discrepancies, historical scope and unexecuted transfer hypotheses.
