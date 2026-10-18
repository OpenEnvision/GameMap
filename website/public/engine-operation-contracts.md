# Engine operations: completion, recovery, and evidence

Sources checked on 2026-10-18; full reproduction not performed. This note complements the resource directory without treating every engine feature as a separate product. Versioned documentation and immutable source links describe the evidence reviewed, not an installed or tested environment.

## How to read an operation

**GameMap editorial guidance:** record the exact tool/engine version, execution mode, project/world identity, requested operation, native result, output artifacts, and acceptance condition. Keep request acceptance, operation completion, persisted output, and fresh-session reopen separate. A tool name or successful process launch does not prove gameplay correctness.

### Execution and recovery

| Operation | Source-backed behavior | Acceptance still needed |
| --- | --- | --- |
| Unreal test resumption | [`-ResumeRunTest`](https://dev.epicgames.com/documentation/en-us/unreal-engine/run-automation-tests-in-unreal-engine) reads a report, resumes NotRun tests, and marks interrupted in-progress tests as failures | Preserve pre-resume report; account for every selected test; missing report means recovery evidence is incomplete |
| Unreal editor transaction recovery | [Recovery Hub](https://dev.epicgames.com/documentation/en-us/unreal-engine/recovery-hub-in-unreal-engine) is a Beta plugin for level editing and Sequencer; it complements autosave | Verify recovered edits, save, and reopen; do not apply its guarantee to arbitrary assets or gameplay saves |
| Unreal gameplay save/load | [Async SaveGame APIs](https://dev.epicgames.com/documentation/unreal-engine/saving-and-loading-your-game-in-unreal-engine?lang=en-US) report completion through delegates; the application applies loaded custom state | Schema validation and restored-world comparison; atomicity, power-loss behavior, and concurrent writes to one slot remain unknown here |
| Unity test execution/cancellation | [TestRunnerApi 1.4.6](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html) returns a job GUID; cancellation can need multiple frames, marking active tests Canceled and remaining tests NotRun | Wait for terminal callbacks and retain expected test counts before resetting the editor; [the 1.4.6 result guide](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/manual/extension-get-test-results.html) requires callback re-registration after domain reload and notes that listeners receive all test runs, so correlate the observed run explicitly |
| Unity repeat runs | [Disabled domain reload on Play entry](https://docs.unity3d.com/6000.0/Documentation/Manual/domain-reloading.html) retains static fields, static-event subscriptions and non-serialized field values; script-change asset refreshes still trigger domain reload | Explicit reset ownership, handler-count checks, and clean fixture state; fresh process if reset coverage is incomplete |
| Godot scene transition | [SceneTree](https://docs.godotengine.org/en/stable/classes/class_scenetree.html) emits scene_changed after the new scene is added and initialized; reload creates a new current-scene instance | Assert application readiness and reset state outside the scene separately |
| Blender module execution | [Pinned bpy guide](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/doc/python_api/rst/info_advanced_blender_as_bpy.rst) disallows module reload, permits one blend state per process, and omits normal cancellation/crash signal handlers | Process ownership, bounded job timeout, explicit save/reopen, and external crash evidence |
| Community Godot MCP process control | [Pinned implementation](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts#L1053-L1215) sends kill to the tracked process before spawning another, without awaiting prior exit; stop also returns without awaiting exit; natural exit clears the handle used to retrieve logs | Archive output before loss of access; independently observe process termination; do not assume multiple concurrent projects |

### World, physics, AI, and identity

| Operation | Source-backed behavior | Acceptance still needed |
| --- | --- | --- |
| Stream a world region | [World Partition](https://dev.epicgames.com/documentation/en-us/unreal-engine/world-partition-in-unreal-engine) distinguishes Loaded and Activated cells | Verify required actor, collision and navigation readiness; [UE-259478](https://issues.unrealengine.com/issue/UE-259478) documents an early completion result for standalone level instances. Target fix 6.0 is not a verified shipped fix |
| Reserve an interaction | [Smart Objects](https://dev.epicgames.com/documentation/en-us/unreal-engine/smart-objects-in-unreal-engine---overview) supply claim/occupancy/cleanup and behavior data, not behavior execution | Actual arrival, project action result, interruption cleanup and authoritative game-state event |
| Advance physics | [Unity Physics.Simulate](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.Simulate.html) does not call FixedUpdate; fixed small steps are preferable to variable delta time | Declare gameplay/physics tick ownership; no cross-platform bitwise determinism inferred |
| Query collisions after edits | [SyncTransforms](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.SyncTransforms.html) flushes transform changes; [Raycast](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.Raycast.html) applies layer/trigger filters and misses colliders containing its origin | A miss is not proof of no penetration, visibility or navigation reachability |
| Request or cancel navigation | [SetDestination](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshAgent.SetDestination.html) accepts a path request before calculation finishes; [ResetPath](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshAgent.ResetPath.html) immediately completes an active OffMeshLink | Separate accepted, computed, reachable and arrived states; cancellation is not rollback or guaranteed freeze-in-place |
| Resolve authored objects | [GlobalObjectId](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/GlobalObjectId.html) is authoring-only, requires a saved scene and loaded scene for resolution, and changes when moving to another scene | Project/asset revision and migration mapping; never treat it as a player-runtime identifier |
| Resolve live objects | [GetInstanceID](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Object.GetInstanceID.html) returns an in-memory ID that changes between sessions | Pair with session identity and reject stale references; ID sign does not establish persistence |

### Animation, rendering, and interchange

| Operation | Source-backed behavior | Acceptance still needed |
| --- | --- | --- |
| Motion matching | [Pose Search](https://dev.epicgames.com/documentation/en-us/unreal-engine/motion-matching-in-unreal-engine) queries schema-indexed pose/trajectory features; sampling and channels affect cost | Foot contacts, root motion, trajectory response, database coverage and target performance |
| Train deformation | [ML Deformer](https://dev.epicgames.com/documentation/unreal-engine/ml-deformer-framework-in-unreal-engine?lang=en-US) requires aligned animation/cache examples; Vertex Delta is documented as a reference rather than production model | Held-out poses, matching topology, memory and device support; editor training is not evidence of a headless training API |
| Render Niagara cache | [Caching guide](https://dev.epicgames.com/documentation/unreal-engine/caching-and-reusing-your-system?lang=en-US) distinguishes point subframe support from grid whole-frame data | Particle birth/death and shutter sampling tests; a valid cache can still produce temporal artifacts |
| Observe GPU collisions | [Niagara GPU collision](https://dev.epicgames.com/documentation/en-us/unreal-engine/gpu-raytracing-collisions-in-niagara-for-unreal-engine) is asynchronous with a one-frame delay and provider-specific prerequisites | Record actual fallback/provider; test offscreen and occluded collision, not just visible effects |
| Compare coordinate systems | [Unreal coordinates](https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinate-system-and-spaces-in-unreal-engine) are left-handed, Z-up, X-forward; [distance defaults](https://dev.epicgames.com/documentation/en-us/unreal-engine/units-of-measurement-in-unreal-engine) are centimeters | Explicit source/target basis and quantity units; known-size asymmetric roundtrip fixture |
| Map world points to pixels | [Unity projection](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Camera.WorldToScreenPoint.html) uses lower-left pixel origin; [camera view space](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Camera-worldToCameraMatrix.html) looks along negative Z | Camera/eye, viewport, crop and resize transforms; projected location is not occlusion evidence |
| Interpret depth | [Unity graphics-backend conventions](https://docs.unity3d.com/6000.0/Documentation/Manual/SL-PlatformDifferences.html) differ in texture origin and depth direction | Record backend, projection and depth representation before linearization; a float image is not automatically metric distance |
| Transfer a rig | [Unity bind poses](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Mesh-bindposes.html) are indexed inverse base-pose matrices corresponding to bone indices | Preserve indices, weights and mesh-root space; compare rest pose and root-transformed deformation after import |
| Observe Godot frame phase | [SceneTree signals](https://docs.godotengine.org/en/stable/classes/class_scenetree.html) fire before node process/physics callbacks | A separate rendering barrier and provenance are needed for post-render images |

### Runtime animation observation gates

Sources checked 2026-10-18 against Unity 6000.0 and Godot 4.4 official documentation, not immutable engine implementations. Full reproduction not performed. This supplements [decoded-pose/compression validation](asset-validation-contracts.md#animation-sampling-and-compression) and [frame capture ownership](visual-evidence-research.md#engine-frame-readback-and-capture-ownership): pose application, playback completion, event delivery and actor movement require distinct observations.

#### Unity: observation depends on visibility, update phase and movement owner

- `AlwaysAnimate` includes offscreen animation. `CullUpdateTransforms` suppresses retargeting, IK and Transform writes when renderers are invisible; `CullCompletely` suppresses animation altogether when renderers are not visible. A stale offscreen skeleton therefore cannot alone establish an incorrect clip or graph. [U1]
- `Normal` updates in Update, `Fixed` in FixedUpdate, and `UnscaledTime` ignores Time.timeScale. Record the mode and relevant clock rather than comparing identical render-frame counts as identical animation progress. [U2]
- `OnAnimatorMove` occurs after state-machine/animation evaluation but before `OnAnimatorIK`; treating this callback as the final post-IK pose boundary is unsupported. [U3]
- `applyRootMotion` has no effect when a script implements OnAnimatorMove, and changing it at runtime reinitializes the Animator. Record the movement-owning script; do not treat toggling the property as a harmless observation control or a proven reset/rollback operation. [U4]

**Editorial fixture, unexecuted:** fixed clip/controller/rig with nonzero travel and an IK target; compare visible/offscreen runs for each culling mode. Log animation time, sampled joints, post-IK joints and actor transform separately. Repeat with a movement callback and with timeScale changes under each update mode. Introduce the root-motion toggle as a separate reinitialization case, not between nominally equivalent samples. Pass criteria must name which phase and movement owner they test.

#### Godot: immediate pose, playback completion and side effects differ

`play()` applies animation on the next processing opportunity; `advance(0)` requests the immediate update. `seek(seconds, update=true)` updates the pose while skipping intervening events. Its `update_only=true` suppresses method, audio and animation-playback tracks. Seeking to the end does not emit `animation_finished`; the documented alternative for skipping while emitting completion is `advance()`. These are distinct operations, not interchangeable shortcuts. [G1]

Manual process mode requires `advance()`. `mixer_applied` reports application of blended results to target objects; it is not documented as a rendering/physics fence. Deferred method mode batches calls until after event processing, whereas immediate mode invokes them as reached. Looping animations do not emit `animation_finished`. The transform of a valid configured root-motion bone track of type POSITION_3D, ROTATION_3D or SCALE_3D is visually canceled, so an in-place skeleton is not by itself failed locomotion. Animated-node caches may miss a disappeared node; `clear_caches()` forces refresh. [G2]

**Editorial fixture, unexecuted:** one nonlooping clip with a moving joint, a method marker and completion counter; compare fresh-instance `play` plus `advance(0)`, seek with both update flags, and timed manual advancement. Record target pose, marker count, completion count and callback mode as separate results. Add a looping variant with an explicitly bounded sample interval rather than waiting for completion. Replace an animated target node and test cache refresh separately. For root motion, compare extracted motion and the consuming controller's world transform against the skeleton view; specify exactly one movement owner.

#### Acceptance boundary and unknowns

Proposed evidence record: engine patch version, clip/rig/graph identity, initial state, evaluation clock and step sequence, visibility/culling mode, callback mode, observation phase, joint pose, actor transform and event log. This is an editorial test design, not an implemented harness.

The cited contracts do not establish a universal rendered-frame barrier, completion of deferred application-specific side effects, physics/contact success, safe retries after ambiguous evaluation, rollback, persistence across reload, or cross-platform numerical determinism. Project scripts and exact patch behavior remain untested. Do not infer those guarantees from an evaluation call, pose signal, animation-finished signal or screenshot.

#### Official sources

- [U1: Unity 6000.0 AnimatorCullingMode](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AnimatorCullingMode.html)
- [U2: Unity 6000.0 AnimatorUpdateMode](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AnimatorUpdateMode.html)
- [U3: Unity 6000.0 OnAnimatorMove](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.OnAnimatorMove.html)
- [U4: Unity 6000.0 applyRootMotion](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Animator-applyRootMotion.html)
- [G1: Godot 4.4 AnimationPlayer, play and seek](https://docs.godotengine.org/en/4.4/classes/class_animationplayer.html)
- [G2: Godot 4.4 AnimationMixer, signals, callback modes, root_motion_track and clear_caches](https://docs.godotengine.org/en/4.4/classes/class_animationmixer.html)


## Native GUI automation is a separate evidence surface

[Windows UI Automation](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview) depends on provider-supported control patterns. It does not establish that Unreal, Unity, or Blender exposes every custom widget or scene object. [Invoke](https://learn.microsoft.com/en-us/windows/win32/api/uiautomationclient/nf-uiautomationclient-iuiautomationinvokepattern-invoke) is intended to return promptly, but provider behavior varies. Neither invocation success nor [SendInput's inserted-event count](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput) proves application completion.

**GameMap editorial guidance:** bind each GUI action to a current process/window/control observation; retain physical-coordinate and screenshot-transform metadata; verify focus and clickability; stop on permission or integrity failures. Do not use a screenshot of a success message as the sole evidence for asset persistence. The documented [Graphics Capture picker flow](https://learn.microsoft.com/en-us/windows/apps/develop/media-authoring-processing/screen-capture) includes user consent and exposes frame time, size and buffer lifetime. It captures UI pixels rather than an engine simulation checkpoint.

## Runtime locale changes: separate string delivery, rendering and accessibility

**Documented operations.** Unity Localization 1.5 documentation, identifying package 1.5.13 at inspection, says the first `LocalizedString.StringChanged` subscription initiates loading and receives the value after completion; locale/reference changes and supported variable changes trigger updates. Additional subscribers added after loading completes receive the latest loaded value. [`StringChanged`](https://docs.unity3d.com/Packages/com.unity.localization@1.5/api/UnityEngine.Localization.LocalizedString.StringChanged.html).

`RefreshString()` returns whether a refresh could be requested. A request made while the current loading operation is still executing is ignored and returns false. Thus a refresh call is not a guaranteed update, and its Boolean is not rendered-output evidence. [`RefreshString`](https://docs.unity3d.com/Packages/com.unity.localization@1.5/api/UnityEngine.Localization.LocalizedString.RefreshString.html).

**Source-inspected native semantics.** Godot `4.5-stable` Button handles translation-change notification by translating and shaping text, updating minimum size, and separately queuing accessibility update and redraw. Its accessibility-update handler chooses translated text when no explicit accessible name exists; when both differ, it combines the explicit name and translated text. An empty-text/name button can fall back to tooltip text. This is source behavior, not evidence that any screen reader received or announced it. [`button.cpp`, lines 188–219 at inspected commit](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/gui/button.cpp#L188-L219). Godot 4.5 separately exposes accessible names, descriptions, relationships and live-region mode. [Control reference](https://docs.godotengine.org/en/4.5/classes/class_control.html#class-control-property-accessibility-name).

**Proposed acceptance contract, unimplemented/unexecuted.** Record engine/package/build, requested locale, table/key, formatting inputs, font assets, control identity and a locale-change generation identifier. Collect separately: accepted/rejected refresh request; delivered localized value; bound control value; post-layout rendered frame; native accessible name/role/state and observed assistive-technology behavior. Do not collapse these into a single “locale changed” success.

**Failure/recovery fixture.** Change locale while a string is loading, alter a dynamic argument, then change locale again. Record ignored refreshes and apply a bounded application retry only after the relevant operation settles; accept only evidence matching the intended final locale and inputs. Include an expanded or RTL label, an icon-only button, and a button whose explicit accessible name differs from translated text. Check clipping, shaping/fallback, focus continuity, semantic naming and announced updates independently. Missing semantic/assistive-technology evidence remains unverified, even when screenshots pass.

**Version boundary.** Unity’s `@1.5` URL is a version-family documentation route, not an immutable package pin. Godot `4.5-stable` was resolved to inspected commit `876b290332ec6f2e6d173d08162a02aa7e6ca46d`; this pins source, not a measured installed build. No cross-platform screen-reader coverage, timing guarantee or rendering/accessibility synchronization guarantee is established.

## One useful integration fixture

**GameMap editorial guidance:** use a disposable door scene to connect object identification, asset edits, streaming/physics readiness, actual interaction, temporal capture, save and fresh reopen. Include an interrupted action and a stale-reference case. Declare expected world-state transitions and image/geometry tolerances before running. If the project-specific interaction API or event observer is missing, report that gap rather than substituting generic editor dispatch.

The remaining unknowns include platform-specific renderer behavior, installed plugin compatibility, complete reset ownership, save durability under interruption, and project-specific quest/reward transactions. None of the source checks above supplies those runtime results.

## Additional checked interface references

These references preserve useful operational context; they are not separate directory cards in this update. Sources checked; full reproduction not performed.

### Bevy · Remote Protocol

Exposes ECS inspection and mutation through a JSON-RPC interface embedded in a Bevy application. RemotePlugin installs protocol operations but does not start a transport; RemoteHttpPlugin adds HTTP communication. Queries depend on registered, reflectable types, and non-strict reads can include per-component errors. The source link pins the file reviewed, not an executed build. Network access and mutation permissions require an explicit application policy. [Primary source](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/crates/bevy_remote/src/lib.rs). [Windowless renderer example at checked commit](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/examples/app/headless_renderer.rs).

### Houdini Engine · PDG API

Controls procedural task-graph cooking and retrieves work-item events, states, and output paths. HAPI supports asynchronous full cooking, polling, pause, and cancellation; generate-only mode is always blocking even when the blocking argument is zero. Cached success differs from newly executed work, and a new cook can discard uncollected events. Preserve scheduler paths and drain events before another cook. Cancellation must be followed by terminal-state inspection. Houdini licensing and host configuration remain deployment requirements. [Primary source](https://www.sidefx.com/docs/hengine/_h_a_p_i__p_d_g.html). [PDG function reference](https://www.sidefx.com/docs/hengine/group___p_d_g.html). [Command-line Python and license lifecycle](https://www.sidefx.com/docs/houdini/hom/commandline).

### O3DE · Editor Automation

Exposes editor functionality through Python bindings and external editor-test orchestration. The PythonEditorBindings gem exposes editor C++ functionality through EBus and requires project configuration and an editor rebuild. External pytest and LyTestTools can launch the editor while embedded scripts drive it. Preserve both external and editor logs. These interfaces do not establish runtime Python support or a graphics-free execution profile. [Primary source](https://www.docs.o3de.org/docs/user-guide/editor/editor-automation/). [Parallel editor test patterns](https://docs.o3de.org/docs/user-guide/testing/parallel-pattern/).

### Maya · Standalone Python and File Operations

Initializes Maya outside an interactive session for scripted scene processing. Standalone initialization provides Maya libraries to Python scripts; file commands handle opening, saving, references, and import/export. Initialization and cleanup are session-sensitive, so code running inside Maya must not blindly repeat standalone initialization. Preserve native references, plugin dependencies, and save/reopen evidence; a batch process is not proof of target-engine compatibility. [Primary source](https://help.autodesk.com/cloudhelp/2022/CHS/Maya-SDK/Maya-Python-API/PythonOutsideMayaSession.html). [Maya 2026 file command](https://help.autodesk.com/cloudhelp/2026/ENU/Maya-Tech-Docs/CommandsPython/file.html).

### Substance 3D Painter · Remote Control

Connects an external process to Painter scripting through its remote-control interface. Useful for driving an already running authoring application from a pipeline tool. The remote interface is distinct from headless texture baking and does not by itself establish a complete material-export contract. Qualify application version, project state, export preset, destination files, and downstream texture/color interpretation. [Primary source](https://experienceleague.adobe.com/en/docs/substance-3d-dev/painter-python/tutorials/remote-control).

## Navigation after procedural world edits

Checked 2026-10-18 against official RecastNavigation commit `9f4ce64458dfae86e1239c525ddc219c4e9e06f1` (2026-02-27). Source inspection only: no install, build, execution or route reproduction. This supplements the existing Unity request/build lifecycle notes; it does not transfer upstream Detour semantics to a particular engine binding.

### Detour query and rebuild chain

**1. Resolve endpoints and budgets.** API documentation says `findNearestPoly` can leave `nearestRef = 0` and the output point unchanged when nothing matches; implementation still returns success after that search. Require nonzero endpoint references and record search extents, snapped positions, agent/build parameters and filter. Keep search-node budget, polygon-corridor capacity and straight-point capacity separate; `init` documents at most 65,535 nodes. [S3–S4]

**2. Classify corridor results.** `findPath` returns ordered polygon references. The documented undersized-buffer behavior is a prefix from the start; unreachable destinations return a best available corridor. Static implementation can combine `DT_SUCCESS` with `DT_PARTIAL_RESULT`, `DT_OUT_OF_NODES` and/or `DT_BUFFER_TOO_SMALL`. The success helper checks only its high-level bit. Preserve the entire status, count, capacities and final polygon. A capacity-truncated corridor need not have PARTIAL_RESULT when the search itself reached the destination. Growing the output buffer does not increase the search-node pool. [S5–S6]

**3. Own sliced-query state.** The documented sequence is initialize, update within iteration budgets until terminal, then finalize. The filter pointer must survive the query; source documentation warns that intervening non-sliced calls can corrupt its state. Static inspection shows update can report success after exhausting the frontier; finalization adds the partial-result detail and resets query state. `finalizeSlicedFindPathPartial` intentionally recovers a visited portion of an existing corridor and can lack PARTIAL_RESULT when such a polygon is found. Therefore compare the returned endpoint with the requested goal regardless of flags. Proposed adapter gate: isolate query ownership and invalidate/restart after relevant navigation changes; snapshot consistency, cancellation rollback and concurrent mutation safety were not established. [S3, S7]

**4. Extract corners without upgrading reachability.** `findStraightPath` clamps endpoints to the first/last supplied polygons. Its END flag and zero endpoint polygon reference identify that corridor's endpoint, not original-target arrival. An invalid intermediate portal can yield success plus partial output. At this pin, filling the straight-point capacity can set BUFFER_TOO_SMALL even when END is emitted: treat saturation conservatively and retry with headroom where needed. Keep off-mesh traversal execution as a separate game action. [S8]

**5. Revalidate after obstacle edits.** Documentation invalidates tile/polygon references on tile removal, while changing polygon flags/areas leaves references intact. Restoring the original reference is possible only under the documented original-parameters/reference conditions. Tile-cache rebuild implementation removes/replaces tiles without requesting the old reference; cached corridors therefore need freshness and traversal checks. [S9, S13]

Obstacle additions/removals enqueue work. The documented completion surface is repeated `update(..., &upToDate)`; static inspection rebuilds at most one queued tile per call. At the exact commit above, it removes pending work and advances obstacle bookkeeping even after a rebuild failure; upToDate merely tests empty queues. This is a static source observation, not a reproduced engine bug. Preserve every update status: later successful drain cannot erase an earlier failure. Hardcoded capacities are eight touched tiles per obstacle and 64 request/update entries, not guaranteed useful coverage; bounded tile collection can truncate silently. Proposed gate: validate footprint/burst bounds, retain rebuild failures and requery affected routes after drain. [S10–S12]

### Evidence and availability boundary

Record pin, navmesh generation, filter, input/snapped endpoints, capacities, all statuses, returned corridor/corners and obstacle-update history. Proposed acceptance requires the intended endpoint plus fresh game-level collision, locomotion, off-mesh-action and arrival evidence. A valid navmesh path never establishes collision-free game arrival by itself.

Recast/Detour are available C++ libraries under the zlib license; DetourCrowd is a separate movement/avoidance module. Preserve applicable license notices and alteration attribution. Availability is not an installed GameMap adapter, MCP server or tested engine integration. Persistence, crash recovery and whole-game reset remain unverified. [S1–S2]

### Engine-facing update and arrival boundaries

Sources checked **2026-10-18**; Unity 6000.0 and Godot 4.5 documentation describe different stacks, not a tested interoperability layer. Both cited Godot classes are marked Experimental.

| Operation | Documented contract | Proposed acceptance boundary |
|---|---|---|
| Unity incremental bake | `UpdateNavMeshDataAsync` hashes input geometry and settings. Supply **all** input sources, including unchanged geometry; preserve unchanged sources' relative order to avoid unnecessary rebuilds. Missing/added sources count as changes. Bounds are relative to the NavMeshData position/rotation; the return value is an AsyncOperation. [API](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshBuilder.UpdateNavMeshDataAsync.html) | Preserve the complete source manifest, settings and bounds. Observe the update separately from post-update route checks. The cited page does not establish rollback, serialized persistence or safe overlapping updates. |
| Unity path verdict | `NavMesh.CalculatePath` returns true for **complete or partial** paths; it is synchronous and long queries can affect frame rate. [API](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMesh.CalculatePath.html) | Record the path status and terminal endpoint, not only the boolean. A declared destination must satisfy its own endpoint/arrival tolerance. |
| Unity endpoint projection | `SamplePosition` finds nearby NavMesh points without checking world obstructions; a two-floor example can select the other floor through a ceiling. [API](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMesh.SamplePosition.html) | Preserve requested and projected positions, vertical displacement and intended floor/region; proximity is not connectivity or line-of-sight evidence. |
| Godot map synchronization | NavigationServer3D changes generally take effect after the next physics frame. A map iteration of zero means never synchronized; IDs increment on synchronized changes and eventually wrap. In **4.5**, `map_force_update` is deprecated and unsupported for asynchronous updates, with single-threaded use at the caller's risk. Avoidance ignores regions and may move an agent outside traversable space. [4.5 API](https://docs.godotengine.org/en/4.5/classes/class_navigationserver3d.html) | Correlate the edited map/region and navigation iteration with the queried world revision; nonzero alone is not proof of the latest edit. Do not copy an older force-update recipe into an asynchronous workflow. Preserve collision/controller checks independently of avoidance velocity. |
| Godot arrival versus stopping | `navigation_finished` / `is_navigation_finished` can mean reaching the last waypoint of an **unreachable** target. Search limits can yield a route toward the closest polygon found so far. `is_target_reachable` compares the final path position with the target using target_desired_distance. [4.5 Agent API](https://docs.godotengine.org/en/4.5/classes/class_navigationagent3d.html) | Separate stopped, path exhausted, target reachable and target reached; retain search limits and measured endpoint error. A completion signal alone cannot approve a generated doorway/quest route. |

**GameMap editorial fixture, unimplemented:** retain one reachable route and deliberate disconnected-island, wrong-floor, narrow-door and dynamically blocked variants. After an edit, verify update readiness, endpoint projection, full query status and actual character traversal independently. Include cancellation/rebuild interruption and cold-reopen cases; their recovery and persistence behavior remains unknown until exercised in a pinned project. Associate screenshots with geometry revision, navmesh identity, query filters, agent dimensions, path endpoint and controller events. Rendered continuity alone cannot establish traversability.


### Pinned Detour sources

- **S1** — [README.md, lines 12–30](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/README.md#L12-L30) · official documentation
- **S2** — [License.txt, lines 1–18](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/License.txt#L1-L18) · license text
- **S3** — [Detour/Include/DetourNavMeshQuery.h, lines 171–256](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Include/DetourNavMeshQuery.h#L171-L256) · api documentation
- **S4** — [Detour/Include/DetourNavMeshQuery.h, lines 315–340](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Include/DetourNavMeshQuery.h#L315-L340) · API documentation; [nearest-polygon implementation, lines 702–729](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Source/DetourNavMeshQuery.cpp#L702-L729)
- **S5** — [Detour/Include/DetourStatus.h, lines 22–66](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Include/DetourStatus.h#L22-L66) · api documentation and static source
- **S6** — [Detour/Source/DetourNavMeshQuery.cpp, lines 962–1205](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Source/DetourNavMeshQuery.cpp#L962-L1205) · documented behavior and static implementation
- **S7** — [Detour/Source/DetourNavMeshQuery.cpp, lines 1208–1685](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Source/DetourNavMeshQuery.cpp#L1208-L1685) · documented behavior and static implementation
- **S8** — [Detour/Source/DetourNavMeshQuery.cpp, lines 1689–2022](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Source/DetourNavMeshQuery.cpp#L1689-L2022) · documented behavior and static implementation
- **S9** — [Detour/Include/DetourNavMesh.h, lines 693–720](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Include/DetourNavMesh.h#L693-L720) · api documentation
- **S10** — [DetourTileCache/Include/DetourTileCache.h, lines 136–160](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Include/DetourTileCache.h#L136-L160) · api documentation
- **S11** — [DetourTileCache/Source/DetourTileCache.cpp, lines 359–637](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Source/DetourTileCache.cpp#L359-L637) · static implementation inference
- **S12** — [DetourTileCache/Include/DetourTileCache.h, lines 62–80](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Include/DetourTileCache.h#L62-L80) and [queue capacities, lines 244–250](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Include/DetourTileCache.h#L244-L250); bounded collection is in [source lines 482–580](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Source/DetourTileCache.cpp#L482-L580) · static implementation inference
- **S13** — [DetourTileCache/Source/DetourTileCache.cpp, lines 727–779](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Source/DetourTileCache.cpp#L727-L779) · static implementation inference
