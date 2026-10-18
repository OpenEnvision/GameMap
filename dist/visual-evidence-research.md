# Visual evidence and agent-harness research

Sources checked on **2026-10-18**. Full reproduction not performed. This dossier complements the [testing library](game-testing-library.md) and [production research notes](production-research-notes.md). It retains operation-level constraints that do not fit concise directory cards; it is not an additional count of unique catalog entries.

## Reading the evidence

A source check establishes what the cited authors document. It does not establish an installed tool, a working adapter, a reproduced result, or suitability for a target game. Code, weights, datasets and hosted terms can differ. The licensing notes below describe the inspected source, not a complete clearance decision.

**GameMap editorial guidance:** preserve original artifacts alongside model-facing derivatives. Record source frame/time base, image size and crop, camera/depth conventions, color transform, object IDs and the engine build. A screenshot similarity score cannot prove an interaction succeeded; inferred masks, tracks and depth cannot replace authoritative engine state. Empty observations and missing frames must remain visible failure cases.

## Visual observation and artifact fidelity

### OpenCV motion and tracking

Classical image alignment and sparse/dense optical-flow building blocks.

- **Documented surface and proposed use:** calcOpticalFlowPyrLK returns tracked points/status/errors; calcOpticalFlowFarneback computes dense flow. Proposed contract records frame pair IDs, pixel coordinates, resize map and elapsed time.
- **Limits:** Flow is inferred image displacement, not authoritative object/world velocity; occlusion and camera motion require separate treatment.
- **Source terms:** License not checked in these API pages.
- **Primary sources:** [OpenCV tracking](https://docs.opencv.org/4.13.0/dc/d6b/group__video__track.html)

### OpenCV calibration and geometry

Projection/calibration vocabulary and tools for cross-camera evidence.

- **Documented surface and proposed use:** Use calibration/solvePnP/projectPoints only with explicit intrinsics, distortion and world-to-camera transform. Proposed adapter propagates crop/scale into intrinsics.
- **Limits:** Inferred calibration is distinct from engine-provided matrices; reject missing conventions rather than silently treating matrices as interchangeable.
- **Source terms:** License not checked in this API page.
- **Primary sources:** [OpenCV calibration](https://docs.opencv.org/4.13.0/d9/d0c/group__calib3d.html)

### PySceneDetect

Shot-boundary detection and representative-frame extraction.

- **Documented surface and proposed use:** Headless package is documented; splitting requires FFmpeg or mkvmerge. Use detect-content/detect-adaptive then list-scenes/save-images.
- **Limits:** Shot boundaries are visual-change proposals, not guaranteed game events. Record detector parameters and original timestamps.
- **Source terms:** License not checked in opened documentation.
- **Primary sources:** [PySceneDetect documentation](https://www.scenedetect.com/docs/latest/)

### Pixelmatch

Small pixel-difference baseline for deterministic screenshot regressions.

- **Documented surface and proposed use:** Node/browser typed-array interface; PNG CLI. Normalize viewport and capture conditions before comparison.
- **Limits:** Threshold is per-pixel perceptual difference, not allowed fraction of mismatched pixels. Anti-alias exclusion changes failure sensitivity.
- **Source terms:** ISC as displayed by upstream repository.
- **Primary sources:** [Pixelmatch README](https://github.com/mapbox/pixelmatch)

### OpenImageIO / oiiotool

Production image metadata, conversion and numerical difference operations.

- **Documented surface and proposed use:** Use oiiotool inputA inputB --diff and --absdiff for diagnostics; keep channel names, data type and color interpretation in artifacts.
- **Limits:** A passing image diff does not establish functional equivalence; thresholds and color normalization are experiment inputs.
- **Source terms:** Current upstream original code Apache-2.0; third-party components differ; documentation CC-BY-4.0.
- **Primary sources:** [oiiotool manual](https://openimageio.readthedocs.io/en/latest/oiiotool.html); [OpenImageIO README](https://github.com/AcademySoftwareFoundation/OpenImageIO)

### OpenColorIO

Shared color-management configuration for evidence comparison.

- **Documented surface and proposed use:** Proposed use: hash the exact color configuration and transform/view choice with every processed observation.
- **Limits:** Color conversion does not recover clipped/highlight information; unspecified source color interpretation remains unknown.
- **Source terms:** BSD-3-Clause shown by upstream repository.
- **Primary sources:** [OpenColorIO README](https://github.com/AcademySoftwareFoundation/OpenColorIO)

### LPIPS / PerceptualSimilarity

Learned perceptual distance as a secondary visual-regression signal.

- **Documented surface and proposed use:** PyTorch API; RGB tensors normalized to [-1,1]. Record network variant/checkpoint and input preprocessing.
- **Limits:** Do not use perceptual similarity alone as task-success reward; small contact/UI errors may be consequential despite low aggregate distance.
- **Source terms:** BSD-2-Clause repository; audit model/data rights separately before redistribution.
- **Primary sources:** [LPIPS README](https://github.com/richzhang/PerceptualSimilarity)

### SAM 2

Promptable image masks and temporally propagated video masklets.

- **Documented surface and proposed use:** SAM2ImagePredictor and video predictor; Python >=3.10, torch >=2.5.1, torchvision >=0.20.1 documented. GPU examples; optional CUDA extension affects some postprocessing.
- **Limits:** Predicted masks are inferred evidence, not engine object IDs. Track prompt history, checkpoint, frame indices and inference-state resets.
- **Source terms:** Model checkpoints/training/demo Apache-2.0; optional third-party code/fonts have separate terms.
- **Primary sources:** [SAM 2 README](https://github.com/facebookresearch/sam2)

### CoTracker3

Point trajectories and visibility estimates for temporal diagnosis.

- **Documented surface and proposed use:** Offline and online interfaces; example video shape B,T,C,H,W and tracks B,T,N,2. GPU strongly recommended; online mode uses less memory.
- **Limits:** Not automatic commercial eligibility. Visibility and trajectory identities are model estimates; preserve source frame mapping.
- **Source terms:** Majority CC-BY-NC; included components have separate MIT/Apache terms.
- **Primary sources:** [CoTracker README](https://github.com/facebookresearch/co-tracker)

### Depth Anything V2

Monocular relative-depth inference for visual reasoning.

- **Documented surface and proposed use:** infer_image returns HxW NumPy depth; example selects CUDA, MPS or CPU. Main pretrained models estimate relative depth; metric variants are distinct.
- **Limits:** Relative prediction must never be labeled engine metric depth. Record checkpoint, scale convention and resize transformations.
- **Source terms:** Small Apache-2.0; Base/Large/Giant CC-BY-NC-4.0 according to README.
- **Primary sources:** [Depth Anything V2 README](https://github.com/DepthAnything/Depth-Anything-V2)

### Open3D

3D geometry inspection, alignment and visualization support.

- **Documented surface and proposed use:** C++/Python APIs; CPU wheel available on Linux x86_64, GPU acceleration for core operations. Rendering backend availability needs separate probe.
- **Limits:** Do not infer all visualization works headlessly from CPU processing support. Asset units and camera/depth conventions still need explicit contracts.
- **Source terms:** License not checked in retrieved feature excerpt.
- **Primary sources:** [Open3D README](https://github.com/isl-org/Open3D)

### TAP / TAPIR / TAP-Vid

Point-tracking models and benchmark with explicit coordinate semantics.

- **Documented surface and proposed use:** Pin exact algorithm/checkpoint. Dataset normalized raster coordinates and code raster coordinates differ; 2D typically (x,y), time-bearing query coordinates (t,y,x).
- **Limits:** Frame coordinates are not seconds. Benchmark point annotations do not imply correct 3D contact or engine object identity.
- **Source terms:** Software/checkpoints Apache-2.0 except separately licensed TAPVid-3D; dataset/source-video terms vary.
- **Primary sources:** [Tracking Any Point README](https://github.com/google-deepmind/tapnet)

## Frame, graphics and simulation diagnostics

### RenderDoc

Frame-capture graphics debugger for diagnosing rendering failures.

- **Documented surface and proposed use:** Upstream includes renderdoccmd; supported capture/replay target and driver must be probed. The later [diagnostic contract review](production-debugging-contracts.md) inspects versioned capture and replay interfaces; no adapter was executed.
- **Limits:** No Metal support in upstream support matrix. Intended for own programs; capturing own Unreal/Unity projects is supported. Replay is not full gameplay-state restoration.
- **Source terms:** MIT.
- **Primary sources:** [RenderDoc README](https://github.com/baldurk/renderdoc)

### Tracy profiler

Correlates performance traces with instrumented frames.

- **Documented surface and proposed use:** CPU instrumentation and multiple GPU APIs; upstream includes capture and csvexport tools. Capture and screenshot production add workload to measure.
- **Limits:** Instrumented timing is not equivalent to an uninstrumented benchmark. Align frame markers and screenshot timestamps with game evidence.
- **Source terms:** License file exists; exact terms not checked.
- **Primary sources:** [Tracy README](https://github.com/wolfpld/tracy)

### NVIDIA Nsight Graphics

NVIDIA rendering-performance and shader/ray-tracing diagnosis.

- **Documented surface and proposed use:** NVIDIA-platform GPU profiling/debugging; inspect exact device/driver/platform requirements before scheduling. The later [diagnostic contract review](production-debugging-contracts.md) covers documented SDK/CLI artifact readiness; no automation was executed.
- **Limits:** Hardware-specific counters are not portable metrics; no GameMap runtime integration verified.
- **Source terms:** Vendor license; detailed terms not reviewed.
- **Primary sources:** [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics)

### PresentMon

Windows frame timing capture with console CSV output and service API.

- **Documented surface and proposed use:** ETW-derived CPU/GPU/display durations and latencies; permissions must satisfy documented trace-session access.
- **Limits:** OpenGL/Vulkan have less instrumentation; hardware-accelerated GPU scheduling can reduce timing accuracy. Do not silently change system settings to improve measurements.
- **Source terms:** MIT.
- **Primary sources:** [PresentMon README](https://github.com/GameTechDev/PresentMon)

### Radeon GPU Profiler

AMD-specific GPU timing, wavefront and barrier diagnosis.

- **Documented surface and proposed use:** Current documented graphics APIs: D3D12 and Vulkan; Windows 11 and Ubuntu 24.04 (Vulkan only); supported AMD hardware list must be checked against worker.
- **Limits:** Hardware-specific profiling requires driver/device match; wall time and GPU counters are distinct measurements.
- **Source terms:** Vendor terms not checked.
- **Primary sources:** [AMD Radeon GPU Profiler](https://gpuopen.com/rgp/)

### GFXReconstruct

Graphics-command capture/replay plus structured trace conversion.

- **Documented surface and proposed use:** Vulkan capture layer, D3D12 capture libraries; replay/info/extract/convert tools. Proposed use: attach capture hashes and driver IDs to failures.
- **Limits:** Supported-platform table assumes same platform/driver replay; cross-platform replay generally unsupported. OpenXR is experimental. Capture does not preserve whole gameplay state.
- **Source terms:** MIT.
- **Primary sources:** [GFXReconstruct README](https://github.com/LunarG/gfxreconstruct)

### SPIRV-Tools

Shader binary validation, optimization and failure reduction primitives.

- **Documented surface and proposed use:** spirv-val validates binary SPIR-V; spirv-opt applies passes; spirv-reduce uses a user-supplied interestingness predicate.
- **Limits:** Validator is explicitly incomplete; validation success is not proof of correct shading. Optimization benefit must be measured.
- **Source terms:** Exact license not checked in inspected excerpt.
- **Primary sources:** [SPIRV-Tools README](https://github.com/KhronosGroup/SPIRV-Tools)

### Vulkan Validation Layers

Development-time Vulkan API misuse diagnostics.

- **Documented surface and proposed use:** Enable through Vulkan Configurator or process environment; record layer/settings/SDK revision and collect messages.
- **Limits:** API validation is not visual correctness. GPU-assisted/synchronization validation are configurable; instrumentation can perturb performance.
- **Source terms:** Upstream describes Apache-style Khronos license; full license inventory requires review.
- **Primary sources:** [Vulkan Validation Layers README](https://github.com/KhronosGroup/Vulkan-ValidationLayers)

### Trimesh

Mesh topology, bounds, volume and distance inspection.

- **Documented surface and proposed use:** Python 3.10+; use is_watertight, bounds, component split and nearest/signed-distance queries. Optional boolean/viewer backends are separate dependencies.
- **Limits:** Watertightness is not sufficient for valid rigging/collision/gameplay; open meshes may be intentional. Do not silently repair source assets during inspection.
- **Source terms:** MIT.
- **Primary sources:** [Trimesh README](https://github.com/mikedh/trimesh)

### MuJoCo contact diagnostics

Articulated-physics reference and contact/geometry diagnostic primitives.

- **Documented surface and proposed use:** C API mj_contactForce returns 6D force/torque in contact frame; mj_geomDistance returns signed geometry distance bounded by distmax.
- **Limits:** Requires a MuJoCo model; cannot claim to validate Unreal/Unity physics without conversion and equivalence tests. Legacy CCD distance caveat documented.
- **Source terms:** Source Apache-2.0; docs/media CC-BY-4.0.
- **Primary sources:** [MuJoCo API](https://mujoco.readthedocs.io/en/stable/APIreference/APIfunctions.html); [MuJoCo README](https://github.com/google-deepmind/mujoco)

## Video and creation research

### VBench

Decomposed video-generation quality metrics as auxiliary diagnostics.

- **Documented surface and proposed use:** CLI supports selected custom-input dimensions such as subject/background consistency and motion smoothness. Dependency/GPU requirements vary by metric.
- **Limits:** Generated-video quality benchmark, not game-physics validator. Custom input supports a subset of standard dimensions; smoothness alone can reward inactivity.
- **Source terms:** Repository Apache-2.0; dependencies/checkpoints need separate audit.
- **Primary sources:** [VBench README](https://github.com/Vchitect/VBench)

### Video-MME-v2

Diagnostic hierarchy for video retrieval, temporal understanding and reasoning.

- **Documented surface and proposed use:** Official repository documents standalone Transformers evaluation with frame extraction/cache, subtitles and scoring.
- **Limits:** Video QA does not certify game completion. Subtitle/audio access changes information conditions and must be locked per experiment.
- **Source terms:** Dataset/video/code licenses not checked; verify separately.
- **Primary sources:** [Video-MME-v2 paper](https://arxiv.org/abs/2604.05015); [Video-MME-v2 README](https://github.com/MME-Benchmarks/Video-MME-v2)

### DreamGarden

Human-steerable game-environment creation assistant in Unreal Engine.

- **Documented surface and proposed use:** Hierarchical planner distributes implementation to specialized modules; inspect implementation/version before executable promotion.
- **Limits:** Creation study, not merely gameplay. Human feedback/intervention is part of the system; do not compare to fully autonomous baseline without counting it.
- **Source terms:** Paper/code/engine licenses not checked.
- **Primary sources:** [DreamGarden paper](https://arxiv.org/abs/2410.01791)

### Game-Creation-Agents (GCA)

Recent full browser-game production pipeline with build-linked verification and bounded repair.

- **Documented surface and proposed use:** Requires Python 3.11+, Node20+, Playwright/Chromium, FFmpeg, Claude Code and generation/VLM service credentials. No setup performed.
- **Limits:** Preprint published 2026-10-12, unreplicated here. Browser Phaser scope, not AAA validation. Paper reports visual-evidence citation caveat; not superior on every automatic dimension.
- **Source terms:** Apache-2.0 repository with third-party exceptions; optional RMBG-2.0 is noncommercial and not enabled/bundled by default.
- **Primary sources:** [GCA paper abstract](https://arxiv.org/abs/2610.16776); [GCA full paper](https://arxiv.org/html/2610.16776v1); [GCA README](https://github.com/Tencent/Game-Creation-Agents)

### WorldGUI

Varied-initial-state GUI evaluation and critique-loop research.

- **Documented surface and proposed use:** Transfer hypothesis: vary editor startup/dialog/selection states when testing GUI-only game-production workflows.
- **Limits:** Desktop benchmark, not game creation evidence. Initial-state robustness must be measured independently of visual grounding accuracy.
- **Source terms:** Paper/code/data licenses not checked.
- **Primary sources:** [WorldGUI paper](https://arxiv.org/abs/2502.08047)

## Agent interfaces, memory and optimization

### pi coding-agent extensions

Extensible baseline for loading GameMap tools and observation/context policies.

- **Documented surface and proposed use:** Proposed integration: tool registration, event hooks, explicit evidence recorder. Preserve loading order and version.
- **Limits:** Nested tool results do not automatically create transcript entries; the calling tool can report them. Persist full evidence elsewhere. Sibling calls may run concurrently; mutable engine sessions require serialization.
- **Source terms:** MIT repository.
- **Primary sources:** [pi extensions](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md); [pi repository](https://github.com/earendil-works/pi)

### GEPA adapter and optimizer

Reflective evolution over named textual candidate components.

- **Documented surface and proposed use:** Domain adapter implements evaluate and make_reflective_dataset; optional proposal logic. Candidate maps component names to text.
- **Limits:** GameMap must build executable policies and independent evaluator. Rich visual artifacts need deliberate reflection-packet conversion; benchmark gains are not game-production evidence.
- **Source terms:** MIT repository.
- **Primary sources:** [GEPA adapter protocol](https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/adapter.py); [GEPA repository](https://github.com/gepa-ai/gepa); [GEPA paper](https://arxiv.org/abs/2507.19457)

### Meta-Harness

Outer-loop search over code controlling model information access.

- **Documented surface and proposed use:** Use onboarding to specify task, mutable boundary, interface, evaluation splits, baseline, budget and evidence.
- **Limits:** General harness optimization evidence; transfer to game production remains untested. Do not expose final test data/results through persistent memory.
- **Source terms:** MIT upstream repository.
- **Primary sources:** [Meta-Harness onboarding](https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/ONBOARDING.md); [Meta-Harness repository](https://github.com/stanford-iris-lab/meta-harness); [Meta-Harness paper](https://arxiv.org/abs/2603.28052)

### SWE-agent ACI research

Evidence that agent-facing tool/interface design is an optimization variable.

- **Documented surface and proposed use:** GameMap hypothesis: domain-specific inspect/edit/test tools outperform raw editor scripting under matched permissions and budgets.
- **Limits:** Software-engineering benchmark evidence does not validate visual production or engine-state reasoning.
- **Source terms:** Paper/code licenses should be checked independently before reuse.
- **Primary sources:** [SWE-agent paper](https://arxiv.org/abs/2405.15793); [SWE-agent implementation](https://github.com/SWE-agent/SWE-agent)

### Voyager

Executable skill memory and iterative environment-feedback learning in Minecraft.

- **Documented surface and proposed use:** Transfer hypothesis: retrieve versioned validated tool compositions as reusable skills; invalidate after environment/API changes.
- **Limits:** Gameplay learning is not asset-authoring evidence; do not describe its code-skill memory as raw visual memory.
- **Source terms:** Paper and code rights require separate review.
- **Primary sources:** [Voyager paper](https://arxiv.org/abs/2305.16291)

### Reflexion

Episodic textual reflection as a non-weight-update adaptation baseline.

- **Documented surface and proposed use:** Transfer hypothesis: bounded failure lessons with links to original evidence and separate train/test memory.
- **Limits:** Verbal feedback can be wrong; preserve observations and evaluator evidence rather than overwriting them with summaries.
- **Source terms:** Paper/code rights not checked.
- **Primary sources:** [Reflexion paper](https://arxiv.org/abs/2303.11366)

### VideoAgent (Fan et al.): memory-augmented

Structured temporal event and object-state memory for video question answering.

- **Documented surface and proposed use:** Transfer hypothesis: object-centric retrieval over episode evidence, with timestamps and model confidence attached.
- **Limits:** Offline video understanding is not causal game-state observation; distinguish from the different Wang et al. VideoAgent paper.
- **Source terms:** Paper/code rights not checked.
- **Primary sources:** [VideoAgent: A Memory-augmented Multimodal Agent for Video Understanding](https://arxiv.org/abs/2403.11481)

### VideoAgent (Wang et al.): long-form

Iterative information selection rather than full-video context loading.

- **Documented surface and proposed use:** Transfer hypothesis: request additional frames only when diagnosis uncertainty warrants; compare at matched visual-token budgets.
- **Limits:** Paper studies video QA, not engine debugging; reported frame efficiency is not a GameMap result.
- **Source terms:** Paper/code rights not checked.
- **Primary sources:** [VideoAgent: Long-form Video Understanding with Large Language Model as Agent](https://arxiv.org/abs/2403.10517)

### Cradle / General Computer Control

Screenshot-only observation and keyboard/mouse action comparison condition.

- **Documented surface and proposed use:** Transfer hypothesis: keep screenshot-only and privileged engine-state profiles separate to avoid hidden information advantages.
- **Limits:** Game playing and GUI tasks do not establish production correctness. Screenshot access cannot expose all hidden world state.
- **Source terms:** Paper/code/game licenses require separate review.
- **Primary sources:** [Cradle paper](https://arxiv.org/abs/2403.03186)

## Evaluation design

### Procgen Benchmark

Procedural game environments for evaluating playing-agent generalization.

- **Documented surface and proposed use:** start_level and num_levels determine level seeds; gym3 get_state/set_state use byte strings. No GPU used by environment.
- **Limits:** Playing benchmark, not evidence of game creation ability or absence of LLM training contamination. Pin library version; gym reset/render and fork/thread limitations are documented.
- **Source terms:** MIT code; repository separately lists asset licenses.
- **Primary sources:** [Procgen Benchmark official documentation](https://github.com/openai/procgen)

### Crafter

Achievement-oriented survival benchmark for playing agents.

- **Documented surface and proposed use:** Gym interface exposes 64x64x3 observations and 17 categorical actions; recorder can save stats, video and episodes.
- **Limits:** Achievement progress is not proof of asset authoring or repair ability. Held-out world seeds do not alone demonstrate freedom from model-training contamination.
- **Source terms:** MIT repository license; inspect asset rights before redistribution.
- **Primary sources:** [Crafter official documentation](https://github.com/danijar/crafter)

### rliable

Uncertainty-aware aggregate benchmark analysis.

- **Documented surface and proposed use:** Stratified bootstrap intervals, performance profiles, IQM, optimality gap and probability of improvement.
- **Limits:** Statistical intervals do not remove selection bias, leaked held-out tasks or dependent reruns. Define task/seed sampling units before comparing harness variants.
- **Source terms:** Apache-2.0.
- **Primary sources:** [rliable official documentation](https://github.com/google-research/rliable)

## Proposed acceptance and optimization protocol

The following is **GameMap editorial guidance**, not a reproduced experimental result:

1. Choose a bounded work order and authoritative state assertions before optimizing prompts or tools. Include a known-good control, deliberately broken project and missing-artifact case.
2. Separate build success, functional correctness, visual quality, playability, performance and evidence completeness. Do not compress them into an unexplained success score.
3. Split candidate development, selection and final evaluation. Reset persistent memory, caches and project copies according to a recorded policy; do not let final-test observations enter later candidate selection.
4. Compare an unchanged harness with one intervention at a time: semantic tools, visual selection, debug views, memory, or generation-in-the-loop. Retain resource budgets, failed attempts and tool errors.
5. Save the candidate source, model/service identifiers, inputs, commands, seeds, output hashes, logs and measurement conditions. A source-code commit does not pin a running service, model weights or target project.
6. Treat a timeout as an unresolved job until the underlying process or remote task is accounted for. Test cold reopen and a regression scenario separately from an in-session preview.

Open gaps include game-specific action/state alignment, reliable capture after asynchronous operations, uncertainty calibration for inferred visual features, objective appearance targets, and independent end-to-end reproduction. No local engine, profiler, model or paid API was executed for this collection.
