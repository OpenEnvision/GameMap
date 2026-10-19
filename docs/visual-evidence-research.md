# Visual evidence and agent-harness research

Sources checked on **2026-10-18**. Full reproduction not performed. This dossier complements the [testing library](game-testing-library.md) and [production research notes](production-research-notes.md). It retains operation-level constraints that do not fit concise directory cards; it is not an additional count of unique catalog entries.

For concrete selector, memory, temporal-verification and asset-feedback mechanisms, see the [visual-feedback contract dossier](visual-feedback-mechanisms.md).

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

### Engine frame readback and capture ownership

Sources checked 2026-10-18; full reproduction not performed. Unity 6000.0 and Godot 4.5 links identify documentation versions, not immutable engine patch/commit pins or installed runtimes. These ownership/readiness contracts precede [pass-specific artifact inspection](#render-pass-and-matte-artifacts) and visual-quality scoring. They do not establish deterministic pixels, an implemented adapter or measured GPU cost.

#### Unity 6000.0: two separate readiness boundaries

1. **Rendered screenshot → GPU target.** `ScreenCapture.CaptureScreenshotIntoRenderTexture(renderTexture)` captures the game view. The official contract requires completed frame rendering; its example waits for `WaitForEndOfFrame`, allocates a screen-width/height RenderTexture, then requests mip 0 as `TextureFormat.RGBA32`. The asynchronous readback reduces main-thread work; the capture call does not itself return CPU pixels. [ScreenCapture API](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ScreenCapture.CaptureScreenshotIntoRenderTexture.html)
2. **GPU target → completed CPU readback.** Requests update each frame. Successful data is accessible for only one frame, and Unity disposes the request the following frame. Poll `done`, then require `!hasError` before reading; disposal also makes `hasError` true. Result metadata includes width, height, depth, layer count and bytes per layer. Adapter implication: immediately copy/consume successful data into an evaluator-owned artifact; do not queue a request handle for arbitrary later encoding. [Request lifetime](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rendering.AsyncGPUReadbackRequest.html)
3. `GetData<T>(layer)` throws `InvalidOperationException` if fulfillment has not occurred or the request was disposed. Its layer parameter selects slices for volume/cube/array textures. Calling `GetData<byte>()` is not a pixel-format conversion API: select the output format at request time and record the selected layer. [GetData](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rendering.AsyncGPUReadbackRequest.GetData.html)

##### Resource and sizing obligations

- `AsyncGPUReadback.Request` automatically converts from GPU storage to a specified destination format. Texture extents are checked against actual source dimensions, including quality-reduced texture sizes. Check format support with `SystemInfo.IsFormatSupported(..., GraphicsFormatUsage.ReadPixels)`. A temporary RenderTexture must not be returned through `ReleaseTemporary` before readback completion. Texture regions use pixel coordinates; buffer size/offset use bytes. [Request format, extent and temporary-target rules](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rendering.AsyncGPUReadback.Request.html)
- The alternative `RequestIntoNativeArray` writes into caller-supplied storage; neither that array nor its underlying memory may be disposed before completion. This is a separate ownership route, not permission to retain a normal request's borrowed result indefinitely. [Caller-owned output](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rendering.AsyncGPUReadback.RequestIntoNativeArray.html)
- `WaitForEndOfFrame` can freeze in the Editor when switching from Game to Scene view, and does not run in Editor batch mode. Therefore the documented screenshot coroutine is not a verified headless-CI recipe. Distinguish Editor batch mode from a built player; these documents do not establish all player/headless variants. [WaitForEndOfFrame execution limits](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/WaitForEndOfFrame.html)

**Proposed adapter invariant (inference):** bind each capture ID to target identity, dimensions, mip/layer, destination format and source frame; keep its target leased through completion; copy successful bytes before request expiry; separately mark render-not-ready, readback-error and stale/disposed-result failures. Never reuse a stale success as the next frame. For a chosen single-layer tightly packed RGBA32 byte artifact, validate expected width × height × 4 and actual metadata rather than assuming every request has this layout.

#### Godot 4.5: post-draw is not an asynchronous readback handle

- `RenderingServer.frame_post_draw` fires at frame end after the server updates all viewports. `Viewport.get_texture()` warns that early access, particularly from `_ready()`, may be black or outdated and recommends awaiting that signal before obtaining and saving the image. This is the documented frame readiness boundary. It does not claim the screenshot contains OS/window decorations or other windows. [RenderingServer signal](https://docs.godotengine.org/en/4.5/classes/class_renderingserver.html#class-renderingserver-signal-frame-post-draw), [Viewport texture readiness](https://docs.godotengine.org/en/4.5/classes/class_viewport.html#class-viewport-method-get-texture)
- `Texture2D.get_image()` creates a new Image copy on each invocation, returns null for an invalid texture, and fetches data from GPU memory. The docs warn against frequent per-frame use, especially for large textures. Unlike Unity's request result, this API's documented return is a copied Image, with no documented one-frame expiry. It is not documented as a nonblocking asynchronous readback API. [CPU image copy and invalid result](https://docs.godotengine.org/en/4.5/classes/class_texture2d.html#class-texture2d-method-get-image)
- A `ViewportTexture` is scene-local and may return incorrect data before its scene root is ready. With `use_hdr_2d`, its data is HDR in linear space; the docs describe conversion to RGBA8 and linear-to-sRGB for gamma-space display. Do not silently compare that raw HDR image to an sRGB reference. [ViewportTexture scene and color contract](https://docs.godotengine.org/en/4.5/classes/class_viewporttexture.html)
- A SubViewport's default update policy is `UPDATE_WHEN_VISIBLE`; `UPDATE_ONCE` updates once and then becomes disabled. Its width and height must each be at least two pixels. When its parent is a SubViewportContainer with stretch enabled, the size cannot be changed manually. Thus a global post-draw signal alone does not demonstrate that an invisible/default or disabled target rendered new content. [SubViewport update modes and size](https://docs.godotengine.org/en/4.5/classes/class_subviewport.html)

**Proposed adapter invariant (inference):** identify the exact root/SubViewport and its scene, confirm ready/valid target and intended update policy, await post-draw, retrieve the Image, reject null/empty or wrong-size output, and record actual format/color transformation. For offscreen one-shot capture, explicitly arm `UPDATE_ONCE` rather than relying on visibility. Hold the scene/viewport through capture; retain the resulting Image for subsequent evaluation. The cited contracts do not promise safe concurrent teardown, fixed GPU latency, or pixel determinism.

#### Proposed capture-validity checks

Treat this as a proposed integration test checklist, not tests already run:

1. A rendered marker or known scene-state change distinguishes requested frame N from stale frame N−1; request ID alone is insufficient.
2. Unity tests cover success copied before expiry, failure before `GetData`, early target release prevention, size change, and unsupported output format; log engine patch, render pipeline and graphics backend.
3. Godot tests cover an invisible SubViewport, one-shot rearming, scene-not-ready/invalid image, container-driven dimensions and HDR conversion; log engine patch, renderer and viewport path.
4. Persist image plus provenance: engine/build, capture stage, target, requested/observed dimensions, format, color space/normalization, frame/timestamp, readiness/error status and artifact hash. Evaluate gameplay or aesthetics only after capture validity passes.


### Render-pass and matte artifacts

Sources checked 2026-10-18; full reproduction not performed. Blender evidence is versioned to 4.5 LTS unless explicitly marked 4.2; manual pages remain mutable. This complements [material/compiler acceptance](asset-validation-contracts.md#materialx-graph-generated-code-and-compiler-verdicts), rather than adding an executed renderer or claiming equivalence with game-engine buffers.

#### Documented pass semantics

From [Blender 4.5 Passes](https://docs.blender.org/manual/en/4.5/render/layers/passes.html):

- Z measures nearest-visible-surface distance; Mist remaps distance to 0–1. Z can be noisy with depth of field or motion blur. Z, Position, Object Index and Material Index lack antialiasing.
- Position and Normal are world-space. Vector contains two screen-space 2D vectors for adjacent frames and is disabled with motion blur.
- Cycles Alpha Threshold determines which surfaces write the specified data passes.
- EEVEE auxiliary passes exclude depth of field/motion blur; Blended surfaces appear only in Combined/Transparent.
- Cryptomatte supports multiple contributors per pixel, transparency, and Cycles blur/depth of field. Each image stores two ranked contributors. Asset groups by parent, not Blender asset-library identity.
- AOV names cannot collide with enabled passes. Color holds vectors or colors; Value holds scalars. EEVEE permits 16 of each.

[Blender 4.5 ViewLayer API](https://docs.blender.org/api/4.5/bpy.types.ViewLayer.html) exposes pass_alpha_threshold, pass_cryptomatte_depth (2–16, default 6), pass enable flags, and update_render_passes(). The fields are concrete configuration to record rather than infer from a preview; the method requeries enabled engine passes.

[Blender 4.2 AOV Output](https://docs.blender.org/manual/en/4.2/render/shader_nodes/output/aov.html) documents exact name matching between the output node and the AOV panel, and Material/World shader support. This source is intentionally 4.2, not evidence of untested 4.5 behavior changes.

[Blender 4.5 Cryptomatte Node](https://docs.blender.org/manual/sr/4.5/compositing/types/mask/cryptomatte.html) distinguishes Image, Matte and Pick outputs: Pick is a selection visualization, while Matte is the mask. It accepts multilayer OpenEXR, but does not support sidecar manifests or Volume Objects. The official Serbian-locale page has English body text; the English endpoint failed retrieval.

#### Export and exact-value metadata

[Blender 4.5 image formats, official French locale](https://docs.blender.org/manual/fr/4.5/files/media/image_formats.html) distinguishes half/full floating-point OpenEXR. Save As Render applies display/view transforms to display formats such as PNG, while intermediate OpenEXR uses render-output color space. Do not treat a display screenshot as numeric pass evidence.

[Psyop Cryptomatte Nuke documentation](https://github.com/Psyop/Cryptomatte/blob/968d5e4b6171e29ba5f89d554117132a164e747e/docs/nuke.md) in its Encryptomatte workflow instructs exporting 32-bit EXR with all metadata. It explicitly warns that resampling, lens distortion and proxy processing before matte extraction damage exact encoded values; transform the extracted mask instead. Missing manifest entries can yield numeric selections instead of names. This is strong evidence for inspecting channels, metadata and round-trip selection rather than comparing the colorful preview.

#### Proposed artifact inspection gate

Task: inspect a supplied multilayer render artifact plus configuration manifest, identify which requested downstream operations are valid, and produce a pass-specific diagnostic report. Keep renderer/version-specific semantics separate from universal image checks.

Suggested fixture families:

1. Static foreground silhouette and known world-space reference points: distinguish data-space mistakes from expected hard edges.
2. Transparent card before an opaque object, varied threshold and render method: detect configuration/visibility mismatches.
3. Known left/right/up/down movement and camera motion: calibrate channel order, sign, pixel units and frame reference. The cited manual does NOT establish exact XY/ZW order or sign; do not invent those constants.
4. Overlapping blurred contributors with sufficient/insufficient Cryptomatte ranks: distinguish rank truncation from decoder failures.
5. Named scalar/vector AOVs with deliberate missing/mistyped names: detect incomplete wiring and type mismatches.
6. Original EXR versus metadata-stripped, half-converted or resampled derivatives: test artifact integrity and named-selection round trips. These mutations are proposed, not demonstrated here.

Expected evidence bundle: application version, engine, frame/camera, motion/DOF settings, alpha threshold, pass flags, AOV names/types, Cryptomatte depth, channel inventory/dtypes, metadata availability, export transform/compression, original artifact hash, and numeric sample locations. Preserve originals; previews are auxiliary evidence.

Oracle shape: separate unsupported configuration, missing artifact/channel, semantic mismatch and measured discrepancy. Report raw numeric comparisons only after coordinate/frame/encoding contracts are established. Validate decoded masks and named selections independently from beauty-image similarity. No numerical tolerances should be asserted until a fixture establishes them.

#### Limits

No source here proves exact Vector component ordering/sign, background Z sentinel, all engine-specific AOV filtering behavior, or codec-by-codec Cryptomatte safety. Resolve those with version-pinned implementation sources or later authorized fixtures. Psyop's PDF specification was located but could not be retrieved; no claims are attributed to its unread contents. No general equivalence between Blender passes and game-engine buffers is claimed.

### BlenderProc multiview capture contracts

Checked 2026-10-19. A source-released path from a project-owned mesh/scene to camera-indexed images and object-grounded evidence. Existing GameMap sections cover Blender pass semantics, generic camera metadata, and learned multi-view judges; this note adds the pipeline's actual association, coverage and persistence boundaries. It is capture infrastructure, not evidence of improved game creation or a new acceptance scorer.

**Source pin:** DLR-RM/BlenderProc `76bd8b82ee19489843578ff045298642197bf883`, main returned on the check date (commit dated 2026-01-07). `version.py` says 2.8.0, but this main commit is not the release tag. GitHub's latest release endpoint returned [v.2.8.0](https://github.com/DLR-RM/BlenderProc/releases/tag/v.2.8.0), published 2024-10-22. Claims below use pinned source, not installed behavior. No Blender, installer, renderer, model, benchmark or data download/execution was performed; only documentation/source text was read.

#### 1. An asset can become several mesh instances; views are explicit frames

[ObjectLoader](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/loader/ObjectLoader.py#L15-L113) returns a list of imported MeshObjects and assigns each a `model_path` custom property. One input file can therefore become several render instances; a source path is not an immutable asset ID. The shipped [camera-sampling example](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/examples/basics/camera_sampling/main.py) loads a caller-selected OBJ, computes a point of interest, samples five camera locations above it, registers poses, renders normals/depth/RGB and writes HDF5. It demonstrates the composition, not complete asset inspection.

[`add_camera_pose`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraUtility.py#L25-L60) accepts a 4×4 camera-to-world transform, inserts location/rotation keyframes, and returns the assigned frame; explicit frame arguments can overwrite an existing pose. [Render](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/RendererUtility.py#L654-L729) traverses the entire interval `[frame_start, frame_end)`, not only a caller's list of explicitly requested indices. Preserve the returned frame and queried actual pose. For a static multi-view test, freeze object state across frames; the [keyframe contract](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/docs/tutorials/key_frames.md) also supports changing object poses, so adjacent capture indices need not mean the same scene from a different camera.

#### 2. Sampled cameras and ray-grid visibility do not guarantee coverage

[`shell`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/sampler/Shell.py#L9-L70) returns one random position within radius/elevation/azimuth bounds. Its default independently samples angle and radius; it has no inspection history or side/region coverage target. The five-view example samples only above the objects. Neither ensures a back, underside, thin feature or recessed surface is seen.

[`visible_objects`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraValidation.py#L126-L164) returns objects hit by at least one ray through a configurable grid, default 10×10. A miss can mean a small projected object fell between sample rays. [Obstacle checks](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraValidation.py#L16-L126) test sampled first-hit distances and optional background rejection; they do not certify a clear entire frustum or target completeness. [`scene_coverage_score`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraValidation.py#L167-L250) rewards hit diversity/occupancy; its own description warns it may focus on the same objects from similar angles. This score is not cumulative surface coverage.

**Adapter implication:** declare required view sectors/regions, retain rejected poses and sampling seed, and test target support in the rendered ID masks. Report zero support as “not observed in this view,” with the full scene inventory kept separately. Do not translate it to asset absence or defect-free unseen geometry.

#### 3. Camera/depth conventions need a tested conversion boundary

The [camera tutorial](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/docs/tutorials/camera.md) names the OpenGL camera frame and converts OpenCV camera-to-world poses by changing source axes to `["X", "-Y", "-Z"]`. [Forward-vector orientation](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraUtility.py#L133-L146) tracks camera `-Z` with default up axis `Y`. [K-matrix import](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraUtility.py#L245-L295) takes image dimensions, rejects nonzero skew above its tolerance, and implements unequal fx/fy through pixel aspect ratio. Export the actual K, camera-to-world matrix, dimensions, clipping and scene units rather than a generic “camera pose” field.

The [renderer tutorial](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/docs/tutorials/renderer.md) defines radial camera-to-point distance separately from camera-axis depth. The source requires an explicit antialiasing argument: [non-AA depth](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/RendererUtility.py#L260-L325) wires Blender's Depth pass to EXR; [AA distance](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/RendererUtility.py#L179-L256) uses linear Mist with a configurable maximum; AA depth delegates to that route and converts during loading. Record route and maximum, not only output key.

**Source-visible calibration caveat:** [dist2depth/depth2dist](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/postprocessing/PostProcessingUtility.py#L15-L75) use only `K[0,0]` for both pixel axes, although K import supports fx≠fy. This is an apparent non-square-intrinsics limitation requiring a later off-axis fixture, not a reproduced failure. Keep square-pixel calibration as the narrow initial condition; do not advertise arbitrary-intrinsics depth interchange from source review alone.

#### 4. Renderer IDs are local associations, not durable project identity

Choose a specific route; `enable_segmentation_output` defaults to mapping `category_id`, not instance output. [`enable_segmentation_output`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/RendererUtility.py#L440-L508) sets mesh `pass_index=index+1`, reserves 0 for world/background, and uses Object Index with configurable alpha threshold (default 0.05). IDs follow that mesh enumeration and should not be treated as stable across rebuilding/re-enabling scenes.

[`segmentation_mapping`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/postprocessing/PostProcessingUtility.py#L289-L441) derives encountered IDs from actual pixel values, maps them to current objects, emits requested instance/numeric maps (`instance_segmaps` requires `map_by` to include `instance`), and returns `instance_attribute_maps` records with `idx` plus requested properties. Non-numeric properties require an instance map; absent properties need explicit defaults or raise. A per-view mapping is not the full scene inventory. Preserve a project-owned asset hash/instance ID → imported mesh → pass ID mapping and the world default.

The separately released [`render_segmap`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/SegMapRendererUtility.py#L17-L78) is a second rendering route that recolors objects, disables denoising, uses one sample, and has a different alpha option. Do not silently interchange it with same-render Object Index evidence.

#### 5. HDF5 grouping helps association; original files and completeness still need ownership

[Registered-output loading](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/writer/WriterUtility.py#L97-L151) walks frames in order, loads enabled/requested registered keys, converts depth/distance and maps segmentation. It does not automatically invent camera/asset provenance. Crucially, [`load_output_file`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/writer/WriterUtility.py#L168-L194) defaults to deleting the intermediate PNG/EXR after loading. Passing a permanent-looking render directory alone does not preserve those original files.

[`write_hdf5`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/writer/WriterUtility.py#L25-L91) reads each supplied list at `frame-frame_start` and writes one file named `frame+frame_offset.hdf5` for each logical frame; append mode changes `frame_offset`. It checks the maximum list length against the scene interval, then raises when a supplied key runs short. That late failure can leave earlier files or a partially written current file. Entirely omitted keys are not recognized as missing requirements. Its version record is not a full build/camera/asset manifest.

**Adapter implication:** validate every required key and length before writing, capture raw artifacts before destructive loading if originals are required, use a fresh run namespace and completion manifest, and record logical frame separately from append-offset filename. Verify hashes, dimensions, ID mapping and required streams before handing the packet to a judge.

#### Release, dependencies and proposed use

The repository's pinned [LICENSE](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/LICENSE) is GPL-3.0. This is a code-license observation, not a grant for imported assets, texture datasets or dependencies. [InstallUtility](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/utility/InstallUtility.py#L85-L108) selects Blender 4.2.1 by default; do not merge its behavior with the existing Blender-4.5 manual claims. [DefaultConfig](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/utility/DefaultConfig.py) and [setup.py](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/setup.py) expose Blender/Python dependencies, including h5py, OpenCV, SciPy, trimesh and pyrender; the base path needs no learned model checkpoint. A source pin is not a reproducible installed environment, and optional writer routes can add further dependencies.

**Proposed, unimplemented GameMap fixture:** use rights-cleared, frozen assets with known front/back/underside features and a thin partly occluded component. Compare a declared fixed orbit against an equal-size sampled set, with identical scene/lighting/resolution. Measure required-region observation and ID-grounded pixel support independently of any VLM acceptance score. Add calibration, repeated-asset IDs, missing-stream and interrupted-write cases. Keep target-engine import, interaction and unseen geometry acceptance separate.



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

### FLIP: display-aware render differences

FLIP is a materially complementary **full-reference render-difference diagnostic**: viewing-dependent color/edge/point error maps, plus an HDR exposure sweep. It can help compare render candidates against an approved target under a fixed capture contract. It cannot establish that a game action worked, that UI content is correct, or that a temporal artifact is absent. Treat selection based on FLIP as a proposed GameMap fixture, not a result demonstrated by the papers.

#### Exact inspected implementation

NVlabs/flip implementation declaring v1.7 at commit **b475eb4bf394ab877c42166c9eb0a84a02cc5b14**. This pins the inspected source, not a resolved release tag or installed package. Scope below is the Python `flip_evaluator.evaluate(reference, test, dynamicRangeString, inputsRGB=True, applyMagma=True, computeMeanError=True, parameters={})` wrapper and its nanobind/C++ path. The separate PyTorch loss has a different argument order: test first, reference second. Do not transplant its calling convention. [PyTorch contract][flip-pytorch]

#### Contracts that can reverse candidate ordering

- **Color is an input contract, not inferred from file contents.** The Python wrapper defaults LDR to encoded sRGB, subsequently decoded by the binding; `inputsRGB=False` is needed for already-linear LDR arrays. HDR forcibly sets `inputsRGB=False`, expecting nonnegative linear-sRGB RGB. Passing a display screenshot as HDR, double-decoding linear RGB, feeding ACEScg without a primaries conversion, or treating LPIPS's [-1,1] normalization as reusable changes the question being measured. The LDR C++ path clamps to [0,1]; validate ranges before that silent information loss. [Wrapper, lines 36–100][flip-api]; [binding, lines 218–228][flip-binding]; [core, lines 2399–2403][flip-core]
- **Reference identity and exposure policy matter.** Unspecified HDR start/stop exposures are calculated from the reference's maximum/median luminance. The default count is max(2, ceil(stop-start)); both images receive each shared exposure factor 2^c, the selected tone mapper, and a clamp before LDR-FLIP. The final map retains the **maximum error at each pixel over exposures**, not their average. Swapping reference/test can therefore change automatic exposures; changing candidate-dependent references, exposure ranges/counts, or tone mappers invalidates a shared ranking. Store the resolved parameters. The richer C++ interface exposes the winning-exposure map and intermediate images; the Python tuple does not. [Core, lines 2186–2234, 2314–2404][flip-core]
- **Tone-mapper spelling is a pinned API trap.** The wrapper validates `parameters['tonemapper'].lower()` but passes the original string through. The inspected C++ implementation compares exact lowercase `aces`, `hable`, `reinhard`, with ACES as fallback. Thus the documented title-case `Hable`/`Reinhard` can select ACES in this Python path. Canonicalize and persist lowercase values. This is a static code-path finding, not an executed reproduction; the CLI separately lowercases its input. [Wrapper, lines 82–100][flip-api]; [binding, lines 148–151][flip-binding]; [core, lines 1395–1435 and 2186–2199][flip-core]; [CLI, lines 122–132][flip-cli]
- **PPD is part of the measurement.** The core computes distance_m × display_width_px / display_width_m × pi/180; defaults are 0.7 m, 3840 px, 0.7 m (about 67 PPD). Supply either `ppd` or `vc`, never both, and preserve image scaling/viewing assumptions. Resizing a capture and retaining the old physical interpretation is not a neutral optimization. Cropping before evaluation also changes spatial-filter context and, for automatic HDR, the reference statistics; pooling a region from a full-frame map answers a different question. [Core, lines 110–123][flip-core]; [wrapper, lines 48–80][flip-api]
- **Raw map, preview, and aggregate are distinct artifacts.** The Python return is `(map, mean, resolved_parameters)`. Default `applyMagma=True` yields H×W×3 display colors, not three independent error channels; use `False` for H×W×1 numerical errors. The returned mean is the arithmetic mean of the scalar map before colorization. With `computeMeanError=False`, the Python path returns **-1**, which must never win a lower-is-better selector. Persist the raw map separately from its preview and retain region/tail evidence for small critical defects. NVIDIA's publication page now recommends the mean rather than the original paper's weighted median when one number is needed. [Binding, lines 185–238][flip-binding]; [core, lines 2444–2489][flip-core]; [author hindsight][flip-ldrpage]

#### Harness-side validity gate, before evaluation

Canonicalize equal, nonempty H×W×3 RGB arrays with explicit float32/contiguous CPU storage, finite samples, defined range, color transform, crop/registration and alpha treatment. The nanobind signature is a three-dimensional float/CPU/contiguous array; its explicit checks cover dimensionality and H/W agreement, **not shape(2)==3**, before copying three floats per pixel. This missing check is a source observation, not a reproduced memory-safety failure. File input is different: the LDR loader uses three-channel 8-bit `stbi_load` divided by 255, and EXR uses plain channel-name recognition; these routes do not preserve an RGBA validation contract or perform a documented alpha composite. Composite deterministically upstream and validate alpha separately. [Binding, lines 61–100 and 185–216][flip-binding]; [loader, lines 65–88 and 133–217][flip-loader]

Validate recognized keys, types, finite positive PPD/viewing values, lowercase tone mapper, finite ordered HDR exposure bounds, and an integer exposure count >=2 under a resource budget. In this Python path unknown parameter keys print a message rather than fail. With valid finite explicit exposure bounds, the simplified API initializes a zero map and a supplied zero count skips the HDR loop; a count of one reaches division by count-minus-one. These are static paths that justify rejection, not measured outputs or claims about every CLI/error path. v1.7 clamps a zero median to epsilon, but maximum luminance still divides into the automatic start-exposure calculation: an all-black reference needs an explicit exposure policy or an invalid-result outcome, rather than assuming the median fix covers it. [Binding, lines 115–161][flip-binding]; [core, lines 2210–2233, 2357–2397, 2448–2454][flip-core]

Separate invalid-input/configuration, process/API failure, missing/nonfinite output, and valid measured discrepancy. Some checks exit the process rather than raise a recoverable exception. Require finite [0,1] raw output of the expected dimensions and a valid mean; compare exact metric build/backend/platform because upstream documents small floating-point differences. Proposed unexecuted measurement fixtures: identity pair; one-pixel/UI defect; dark/highlight defect; alpha-only change after explicit compositing; swapped reference; full-frame versus cropped HDR; and all-black reference under a declared valid exposure policy. Separately test wrapper canonicalization of tone-mapper names and **preflight rejection** of malformed/empty/channel-mismatched arrays, NaN/Inf and zero/one exposure counts; do not pass these rejected cases into the unchecked native path. No acceptance threshold is asserted. [Precision note][flip-precision]

#### Paper evidence and rights limits

The 2020 LDR paper's study assessed correspondence of error maps to differences seen while flipping image pairs, using a 0.5 s period, 21 pairs and 42 participants, at instructed 67 PPD. It reports favorable average correspondence; participants were mainly experts, without controlled display calibration. That is not a validation of automated game-candidate selection, a universal threshold, or temporal quality. Its stated limitations include masking, which can cause overestimation. The original paper addresses LDR; the 2021 HDR publication describes a composite over exposure-compensated, tone-mapped pairs. The HDR full PDF exceeded retrieval size limits, so detailed HDR mechanics above are attributed to pinned code, not an unread paper. [LDR paper, §§2 and 6.2][flip-ldrpaper]; [HDR publication][flip-hdrpage]

Inspected repository code is BSD-3-Clause; bundled TinyEXR and stb have separate notices in the third-party license file. This does not grant blanket rights to papers, research-study images, engine captures, or game assets. Link rather than redistribute the paper/image corpus; use independently cleared fixture images. No learned weights or dataset acquisition are needed for this proposed source-based contract. [Code license][flip-license]; [third-party notices][flip-thirdparty]

[flip-api]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/flip_evaluator/flip_python_api.py
[flip-binding]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/nanobindFLIP.cpp
[flip-core]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/cpp/FLIP.h
[flip-cli]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/cpp/tool/FLIPToolHelpers.h
[flip-loader]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/cpp/tool/imagehelpers.h
[flip-precision]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/misc/precision.md
[flip-pytorch]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/pytorch/README.md
[flip-license]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/LICENSE
[flip-thirdparty]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/misc/LICENSE-third-party.md
[flip-ldrpage]: https://research.nvidia.com/publication/flip
[flip-ldrpaper]: https://developer-blogs.nvidia.com/wp-content/uploads/2020/07/flip-author-version-reduced-file-size.pdf
[flip-hdrpage]: https://research.nvidia.com/publication/2021-05_visualizing-errors-rendered-high-dynamic-range-images

### SAM 2

Promptable image masks and temporally propagated video masklets.

- **Documented surface and proposed use:** SAM2ImagePredictor and video predictor; Python >=3.10, torch >=2.5.1, torchvision >=0.20.1 documented. GPU examples; optional CUDA extension affects some postprocessing.
- **Limits:** Predicted masks are inferred evidence, not engine object IDs. Track prompt history, checkpoint, frame indices and inference-state resets.
- **Source terms:** Model checkpoints/training/demo Apache-2.0; optional third-party code/fonts have separate terms.
- **Primary sources:** [SAM 2 README](https://github.com/facebookresearch/sam2)

#### SAM 2 temporal mask-state contract

This contract distinguishes a correction within one clip from replacement evidence after a creative edit. Source-only inspection on 2026-10-19; no install, model, weights, video download, or inference. All implementation links below pin official `facebookresearch/sam2` commit **2b90b9f5ceec907a1c18123530e92e794ad901a4**, the current `main` returned by GitHub (commit dated 2024-12-16). This is a source pin, not a claim of a newer model release.

##### State and observation lifecycle

1. **Clip identity precedes tracking identity.** `init_state` loads frames, records one original height/width, and caches frame-zero features. `reset_state` removes prompts, results, tracking metadata and object IDs, but retains images, dimensions, constants and cached features. **Inference:** changed renders, replacement frame files, changed crops or changed camera captures require a new state from the new immutable clip, not merely reset. A camera cut already inside the same clip is still image evidence; the predictor provides no authoritative scene/camera identity transition. [Initialization][SAM-init] · [reset/cache][SAM-reset]

2. **Frame index is not source time.** JPEG names are filtered by extension and sorted by integer stem; state indexes their list positions. Missing filename numbers are not represented as missing temporal slots. MP4/bytes use Decord's frame iteration; the loader returns images and dimensions, not FPS/PTS. Both routes stretch frames to the model's square input and normalize RGB. **Adapter implication:** retain index → original filename/PTS/simulation tick plus crop/resize mapping; validate uniform dimensions rather than inferring time from index. [Loader][SAM-load]

3. **Prompt coordinates and mutation are explicit.** `add_new_points_or_box` defaults to `normalize_coords=True`: original-image x/y pixels are divided by width/height, then multiplied by internal image size. With False, supply normalized coordinates, not already-scaled model pixels. Boxes become two corner prompts labeled 2/3 and require `clear_old_points=True`; ordinary labels are 1 positive/0 negative. Default `clear_old_points=True` replaces that object's clicks on that frame; False appends. Point/box input removes its mask input; `add_new_mask` removes its point input. A 2-D mask is resized with bilinear antialiasing and thresholded at 0.5 when its size differs from model input. Keep the complete ordered prompt history, replacement/append flag and coordinate space. [Prompt/mask paths][SAM-prompt] · [label semantics][SAM-base]

4. **Preview correction is not completed temporal evidence.** A never-tracked frame becomes initial conditioning. A point/box correction on a tracked frame uses remembered tracking direction and previous mask logits; mask replacement follows its separate path. New outputs are temporary and memory encoding is deferred to propagation preflight. `add_all_frames_to_correct_as_cond=False` by default; propagation reuses conditioning outputs but recomputes other frames with no direct point/mask inputs. Therefore do not assume an immediate corrected preview will be preserved unchanged in a later propagation. Record the conditioning policy and separately validate corrected-frame and downstream results. Defaults also leave surrounding non-conditioning memory clearing disabled. [Prompt path][SAM-prompt] · [preflight/propagation][SAM-prop]

5. **IDs belong to a session, not the engine.** The current default predictor runs objects independently and permits adding objects after propagation begins. Returned mask rows follow returned `obj_ids`; removing an object compacts internal indices. Clearing prompts on one frame may downgrade its conditioning output and does not delete the object. Reset ends all IDs. **Adapter implication:** serialize an ID snapshot with every output, namespace it by clip/state generation, and keep engine identity as separate evidence. An empty/occluded mask does not prove deletion or correct reidentification. The legacy implementation has different multi-object prompting/addition semantics. [ID mapping][SAM-init] · [removal][SAM-remove] · [release notes][SAM-release]

6. **Coverage and mask type must be recorded.** Propagation defaults to the earliest conditioning frame and forward order, not necessarily frame zero. Reverse is explicit; reverse from zero yields nothing. Its interval includes both endpoints, so a non-clipped `max_frame_num_to_track=N` can yield N+1 frames. The public triple is frame index, IDs and original-resolution mask **logits**, shaped objects × 1 × H × W on the compute device; binary masks require an explicit threshold (official VOS CLI default: >0). Missing-object placeholders can appear in prompt-preview consolidation. Preserve logits/threshold and requested versus yielded coverage; no public triple certifies object presence or functional success. [Output/propagation][SAM-prop] · [CLI][SAM-cli]

##### Defaults, variants and readiness boundaries

- The standard builder defaults to CUDA, eval, `vos_optimized=False`, `apply_postprocessing=True`: stability fallback delta 0.05/threshold 0.98, binarized point-prompt memory and low-resolution hole filling up to area 8. Constructor hole-fill default alone is 0. Output overlap suppression defaults False. The VOS CLI instead defaults postprocessing off and packed-label overlap suppression on. Log actual resolved settings. Hole-filling failures warn and return unprocessed scores. [Builder][SAM-build] · [CLI][SAM-cli] · [postprocessor][SAM-holes]
- Frame offload, state offload and async loading all default False. JPEG async mode reads frame zero synchronously, starts a daemon that fills a fixed frame list, loads cache misses on access and raises recorded background errors on subsequent access. MP4 loading ignores that async option and stacks the full decoded sequence. This is not a live bounded-memory stream. State offload still leaves image features/object pointers on the compute device; returned masks are moved there. [Initialization][SAM-init] · [loader][SAM-load] · [output storage][SAM-storage]
- Standard and compiled `SAM2VideoPredictorVOS` are distinct execution modes; release notes warn compilation can change predictions numerically. SAM 2 and SAM 2.1 are separately mapped checkpoint/config families, each tiny/small/base-plus/large; neither family name pins weights. Inspected 2.1-large config uses image size 1024 and seven mask memories; inherited evaluation temporal stride is one. Record checkpoint hash, config and predictor revision independently. [Builder/mapping][SAM-build] · [2.1-large config][SAM-config] · [base][SAM-base] · [release notes][SAM-release]
- **Scoped static caution:** enabling `clear_non_cond_mem_around_input` in this pinned default class reaches `_clear_obj_non_cond_mem_around_input`, absent from the full predictor, its `SAM2Base(torch.nn.Module)` parent and VOS subclass; the defined helper has a different name. Legacy dispatch differs. This unexecuted source mismatch is not a verified memory-invalidation remedy. [Calls][SAM-prop] · [defined helper/VOS subclass][SAM-helper]

**Proposed creative-agent gate:** bind masks to capture/build/camera and immutable clip hashes; validate mapping and prompt provenance; capture correction preview; explicitly rerun needed forward/reverse intervals; validate reacquisition through occlusion/cuts; reject missing/error frames; compare to engine IDs or authored assertions independently. Retest corrected-frame retention and optional memory-clearing behavior before depending on this revision. These are proposed tests, not measured capability.

**Terms:** inspected source uses Apache-2.0; official README separately licenses model checkpoints/training/demo under Apache-2.0. Optional connected-component code is BSD-3-Clause; demo fonts have separate terms. This does not clear source videos or downstream model/data dependencies. [License][SAM-license] · [component license][SAM-cc] · [README][SAM-readme]

[SAM-init]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L41-L153
[SAM-reset]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L675-L734
[SAM-load]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/utils/misc.py#L92-L309
[SAM-prompt]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L160-L381
[SAM-base]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/modeling/sam2_base.py
[SAM-prop]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L383-L630
[SAM-remove]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L866-L954
[SAM-release]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/RELEASE_NOTES.md
[SAM-cli]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/tools/vos_inference.py
[SAM-build]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/build_sam.py
[SAM-holes]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/utils/misc.py#L312-L340
[SAM-storage]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L737-L803
[SAM-config]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/configs/sam2.1/sam2.1_hiera_l.yaml
[SAM-helper]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L956-L1011
[SAM-license]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/LICENSE
[SAM-cc]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/LICENSE_cctorch
[SAM-readme]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/README.md#license


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

#### Pi evidence lifecycle and interrupted execution

Additional source inspection on 2026-10-18 at the existing pi commit **482c1381a00d8d00bc81697e4a980c593db6803e**, which matched the default branch when checked. This is scoped implementation evidence, not an installed package, model or GameMap adapter. No agent, model call, engine or fixture was executed. The proposed adapter and evaluation controls below are **GameMap editorial guidance**.

##### 1. Resource lifetime and the actual settlement boundary

The extension factory may load without a session. Long-lived processes/watchers belong in session_start or their owning command/tool; cleanup belongs in idempotent session_shutdown. Reload and session replacement invalidate old runtime/context objects. A later withSession callback receives the replacement context. agent_end ends a low-level run; retries, compaction, or queued work can follow. agent_before_settle is the actionable final boundary, while agent_settled is notification-only. [Lifecycle documentation](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md#L54-L150), [replacement context](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md#L307-L332), [reload implementation](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/agent-session.ts#L3690-L3730)

**Adapter implication, proposed:** an engine connection, capture lease, and evidence recorder need explicit ownership and shutdown/rebind behavior. Do not finalize an evaluation at the first agent_end or continue using a pre-reload engine handle.

##### 2. Cancellation is cooperative; nested signal overrides matter

The core checks cancellation before execution, then awaits tool.execute with the supplied AbortSignal. This path has no forced termination or rollback wrapper. A tool that ignores its signal can continue and return normally. Nested executeTool defaults to its parent's signal, but an explicitly supplied signal **replaces** that default; this call site does not combine signals. [Execution](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/agent/src/agent-loop.ts#L708-L779), [awaited execution and error conversion](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/agent/src/agent-loop.ts#L821-L859), [nested signal selection](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/extensions/runner.ts#L968-L994)

RPC abort waits for idle but does not clear queued messages; clear_queue followed by abort is documented for Esc-like behavior. [RPC contract](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/rpc-commands.md#L94-L128)

**Adapter implication, proposed:** distinguish cancel-requested, engine-acknowledged-stop, completed-after-cancel, and outcome-unknown. Reconcile job IDs and authoritative engine state before retrying a mutation. A timeout signal must preserve intended parent-cancellation semantics explicitly.

##### 3. Original image, persisted result, and request context differ

_afterToolCall runs extension tool_result handlers and then normalizes their image content with the current model's resize profile and image settings. normalizeToolResultImages invokes processImage, can replace bytes/MIME type and add hints, but preserves the original block when processImage returns ok:false; this wrapper does not catch arbitrary thrown exceptions. Disabling resizing still permits unsupported-format conversion. Thus the persisted tool-result image need not equal the original screenshot, and normalization failure does not certify provider compatibility. [Hook ordering](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/agent-session.ts#L684-L726), [normalization](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/utils/tool-result-images.ts), [conversion/resize](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/utils/image-process.ts)

Request-time context processing starts from a structured clone; context handlers receive conversation messages while system state is restored, followed by context_with_system on the full transcript. Separately, a tool_result handler replacing content without structuredContent drops the prior structured result. [Context composition](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/extensions/runner.ts#L1300-L1355), [result composition](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/extensions/runner.ts#L1189-L1247)

**Adapter implication, proposed:** record original artifact hash/dimensions, stored derivative identity, selection transformations, and request-evidence manifest separately. Context compression must not silently destroy the structured manifest needed by nested orchestration. Final provider preprocessing remains an additional boundary, not verified here.

##### 4. Resuming a conversation does not establish engine-job recovery

Session context follows the active branch and latest compaction; older summarized entries are omitted from active context but remain in the session file. The default summary serializer extracts text, not image pixels, and truncates tool-result text longer than 2,000 characters to that prefix plus a marker; shorter text remains unchanged. An image retained in the kept tail differs from an image whose entry was summarized away. [Session projection](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/session-manager.ts#L469-L573), [summary serializer](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/compaction/utils.ts#L90-L155), [default summary request](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/compaction/compaction.ts#L679-L735), [session semantics](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/sessions.md)

Branch-aware state should reconstruct from getBranch; appendEntry stores non-context data, while sendMessage adds model context. This is not evidence of durable continuation of an interrupted JavaScript execution, engine process, or remote job. [State contract](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md#L320-L332)

**Adapter implication, proposed:** persist artifact/job identities and authoritative completion status externally; revalidate them on resume. Branch switching must not mix accepted assets or completion records from alternative histories.

##### Fair fixture and RSI question, unexecuted

Question: **Does crop-plus-global evidence retain its benefit after compaction and interrupted execution only when paired with branch-aware manifest rehydration?**

Keep task set, action policy, model, permissions, scoring, and accepted engine mutations fixed. Cross two selection policies (global frame; crop plus global) with two retention policies (normal compacted context; explicit durable manifest plus evidence rehydration). Match visual/token budgets including rehydration and charge all selector/preprocessing/retry costs.

First propose a deterministic mock bridge with numbered mutations and captures, delayed completion, cooperative and noncooperative cancellation, and original/derivative hashes. Script identical interruption locations: before dispatch; after engine acceptance before result; after result before compaction; after compaction before resume. Exercise default versus explicitly overridden nested signals, queued work, reload, and abandoned branches. These are proposed cases, not reproduced Pi bugs.

Require separate assertions for duplicate mutations, wrongly assumed cancellation, stale connection use, branch contamination, missing evidence, original-to-derivative provenance, and final authoritative state. Count failures and unknown outcomes; do not score missing observations as success. A subsequent authorized project-owned engine fixture can test task quality with the same fault schedule. Freeze held-out cases before candidate selection.

Unknowns: actual engine cancellation/transaction semantics, service idempotency, package/runtime compatibility, process-crash durability, provider image transformations, and measured quality/latency. Static source and unexecuted upstream tests cannot resolve them.



### GEPA adapter and optimizer

Reflective evolution over named textual candidate components.

- **Documented surface and proposed use:** Domain adapter implements evaluate and make_reflective_dataset; optional proposal logic. Candidate maps component names to text.
- **Limits:** GameMap must build executable policies and independent evaluator. Rich visual artifacts need deliberate reflection-packet conversion; benchmark gains are not game-production evidence. See [execution-control boundaries](benchmark-reproducibility.md#gepa-execution-controls-counts-caches-and-resumed-evidence) for proposal counts, budget admission, cost tracking, cache identity and resumed scores. See [composition and accounting](benchmark-reproducibility.md#harness-composition-and-evaluation-accounting) for coupled components, whole-text merges and execution-path counter differences.
- **Source terms:** MIT repository.
- **Primary sources:** [GEPA adapter protocol](https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/adapter.py); [GEPA repository](https://github.com/gepa-ai/gepa); [GEPA paper](https://arxiv.org/abs/2507.19457)

### Meta-Harness

Outer-loop search over code controlling model information access.

- **Documented surface and proposed use:** Use onboarding to specify task, mutable boundary, interface, evaluation splits, baseline, budget and evidence.
- **Limits:** General harness optimization evidence; transfer to game production remains untested. Do not expose final test data/results through persistent memory. The [classification implementation audit](benchmark-reproducibility.md#harness-composition-and-evaluation-accounting) narrows import validation, dataset/seed coverage and character-based cost interpretation.
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
