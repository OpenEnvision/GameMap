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
| Unity test execution/cancellation | [TestRunnerApi 1.4.6](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html) returns a job GUID; cancellation can need multiple frames, marking active tests Canceled and remaining tests NotRun | Wait for terminal callbacks and retain expected test counts before resetting the editor |
| Unity repeat runs | [Disabled domain reload](https://docs.unity3d.com/6000.0/Documentation/Manual/domain-reloading.html) retains static fields and event subscriptions | Explicit reset ownership, handler-count checks, and clean fixture state; fresh process if reset coverage is incomplete |
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

## Native GUI automation is a separate evidence surface

[Windows UI Automation](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview) depends on provider-supported control patterns. It does not establish that Unreal, Unity, or Blender exposes every custom widget or scene object. [Invoke](https://learn.microsoft.com/en-us/windows/win32/api/uiautomationclient/nf-uiautomationclient-iuiautomationinvokepattern-invoke) is intended to return promptly, but provider behavior varies. Neither invocation success nor [SendInput's inserted-event count](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput) proves application completion.

**GameMap editorial guidance:** bind each GUI action to a current process/window/control observation; retain physical-coordinate and screenshot-transform metadata; verify focus and clickability; stop on permission or integrity failures. Do not use a screenshot of a success message as the sole evidence for asset persistence. The documented [Graphics Capture picker flow](https://learn.microsoft.com/en-us/windows/apps/develop/media-authoring-processing/screen-capture) includes user consent and exposes frame time, size and buffer lifetime. It captures UI pixels rather than an engine simulation checkpoint.

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
