# Production debugging and evidence contracts

Checked **2026-10-18**. Sources inspected; no profiler, engine, GPU capture, physics simulation or diagnostic experiment was executed. These operations deepen existing tool entries rather than add duplicate cards. Versioned documentation, mutable vendor pages and exact inspected source revisions retain their separate scopes. All proposed acceptance gates are unimplemented GameMap editorial guidance.

## Choose the diagnostic evidence

| Symptom | Source-backed surface below | What remains unproven |
| --- | --- | --- |
| Wrong pixels or shader result | RenderDoc invocation trace; native Metal capture | Intended game appearance and target-driver correctness |
| Slow or irregular frames | Nsight live/replay distinction; PresentMon populations; delayed Unity samples | Comparable uninstrumented performance and physical-display latency |
| GPU removal | DRED breadcrumbs and allocation candidates | Exact failing instruction and safe device recovery |
| Contact or rollback failure | CVD recorded solver stages; Jolt contact/state APIs | Whole-game reset, animation semantics and cross-engine equivalence |
| Unexpected build size or blurred streamed assets | UnityDataTool content analysis; Addressables reports; UE streaming counters | Runtime memory, project quality targets and complete-world readiness |

## Capture, shader and GPU diagnosis

### 1. Finish or discard an application-triggered RenderDoc capture

**Gap filled:** the existing entry names `renderdoccmd` but leaves the programmable capture lifecycle unverified.

**Source/version:** [in-application API at RenderDoc v1.46](https://github.com/baldurk/renderdoc/blob/e4bd23b671d3d5a747ff5221dbe08a63eb6ca200/docs/in_application_api.rst), API **1.7.0**; exact [release commit](https://github.com/baldurk/renderdoc/commit/e4bd23b671d3d5a747ff5221dbe08a63eb6ca200).

**Documented:** `RENDERDOC_GetAPI` reports interface availability. `StartFrameCapture` begins capture; `EndFrameCapture` returns 1 for success and 0 for error. Ending without the matching active device/window capture is undefined. `GetNumCaptures`/`GetCapture` enumerate recorded paths and timestamps. `DiscardFrameCapture` discards the active capture without writing it. `TriggerCapture` waits for a subsequent present and does nothing for a non-presenting application. Multi-frame triggering creates independent files. Null device selection is ambiguous when multiple graphics APIs are active.

**Unknowns:** crash-safe file durability, failure recovery, and idempotent retry are not established. Capture timestamps are not an engine-state identity.

**Proposed acceptance:** negotiate API version; record explicit device/window and frame marker; retain native outcome plus newly enumerated artifact; hash and reopen it independently. Serialize capture requests. Treat a never-presenting target as a missing trigger condition. Preserve failed attempts rather than replaying an uncertain start/end pair.

### 2. Complete a specific shader invocation diagnosis

**Gap filled:** compiler/validator success is already covered; replay readiness, fragment selection and shader-debug completion are not.

**Source/version:** [RenderDoc v1.46 replay API](https://github.com/baldurk/renderdoc/blob/e4bd23b671d3d5a747ff5221dbe08a63eb6ca200/renderdoc/api/replay/renderdoc_replay.h); [v1.46 release limitations](https://github.com/baldurk/renderdoc/releases/tag/v1.46).

**Documented:** `OpenFile` reports a result; local `OpenCapture` blocks until loaded and returns status plus controller. `SetFrameEvent` selects post-event state. `DebugPixel` uses top-left coordinates even for GL; unspecified primitive selection may choose an arbitrary fragment. `ContinueDebug` returns batches of states; an empty batch means debugging completed. However, fatal replay errors can also leave the controller returning empty data: inspect `GetFatalErrorStatus`. Free the trace with `FreeTrace`; remote controllers require the server's `CloseCapture`. The v1.46 release warns of AMD-driver problems affecting multi-thread-dependent shader debugging.

**Unknowns:** a completed trace does not establish shader correctness; supported shader features and driver accuracy must be qualified. No universal cancel/retry contract is established here.

**Proposed acceptance:** retain capture hash, event/shader identity, pixel, sample, primitive, view or compute group/thread. Distinguish open failure, unsupported debugging, completed diagnosis and evaluator outcome. Keep output-resource evidence beside variable traces. Do not classify debugger failure as a game defect or shader simulation as native GPU performance.

### 3. Await Nsight artifacts, then distinguish replay cost from live timing

**Gap filled:** the existing Nsight card explicitly leaves automation unverified.

**Source/version:** NVIDIA's rolling **2026.3 documentation family**, identified by [release notes](https://docs.nvidia.com/nsight-graphics/ReleaseNotes/index.html); [SDK guide](https://docs.nvidia.com/nsight-graphics/UserGuide/sdk.html), [capture CLI](https://docs.nvidia.com/nsight-graphics/UserGuide/graphics-capture-cli.html), [GPU Trace CLI](https://docs.nvidia.com/nsight-graphics/UserGuide/gpu-trace-overview.html), [replay interpretation](https://docs.nvidia.com/nsight-graphics/UserGuide/graphics-capture-ui.html). Pages report July 21, 2026 updates; URLs are not immutable version pins.

**Documented:** the SDK initializes before graphics-context creation and requires structure version fields. Save `NGFX_GraphicsCapture_GetCaptureFileCount()` before requesting capture, then wait for that index with `NGFX_GraphicsCapture_WaitForCaptureFilePath()`. The returned path is finalized and safe to open, in the target filesystem. GPU Trace still requires an attached host; its artifact paths belong to that host. Only one of those activities can be injected into a process. `ngfx-capture` supports unattended triggering; GPU Trace CLI supports `--auto-export`. Injection adds overhead. Replay separates frame and resource-reset costs and inserts wait-for-idle boundaries. A GPU Trace of Live Replay measures the captured workload, not the original process.

**Unknowns:** unattended cancellation, crash durability and target-project compatibility remain untested. CLI documentation disagrees internally on maximum frame count; query the installed version rather than copying a universal limit.

**Proposed acceptance:** retain exact executable/SDK/driver and supported hardware, trigger, artifact namespace and native errors; bound waits and retrieve the finalized path rather than predicting filenames. Record live versus replay provenance, reset cost, clock/V-Sync settings and metric passes. Validate any optimization again in a separate live run. Never change profiling permissions or machine settings implicitly.

### 4. End a bounded PresentMon run without losing the measurement population

**Gap filled:** existing coverage gives timing capability and platform caveats, but no run termination or frame-selection contract.

**Source/version:** [PresentMon v2.3.1 console reference](https://github.com/GameTechDev/PresentMon/blob/v2.3.1/README-ConsoleApplication.md), deliberately version-pinned rather than assuming current-main columns.

**Documented:** `--process_id` scopes capture; `--session_name` permits distinct concurrent sessions. `--timed` stops recording; `--terminate_after_timed` additionally exits. `--terminate_on_proc_exit` exits when all targets exit. CSV includes process/swap-chain/presentation information; `DisplayedTime` is `NA` for undisplayed frames. `--exclude_dropped` removes those rows. QPC timestamps are available. `--track_frame_type` distinguishes application and generated frames only with required instrumentation. Legacy metric switches change the schema.

**Unknowns:** observer exit alone does not establish complete ETW delivery or an artifact's integrity. This source does not prove physical-display latency accuracy for a particular setup.

**Proposed acceptance:** use a uniquely owned session, explicit output/schema and bounded interval; preserve undisplayed frames and unavailable values; associate timing with engine markers. Inspect CSV identity, sample count and time span after observer exit. Report rendered/displayed/generated populations separately when available. Avoid stopping an existing unrelated session, silently elevating privileges, or treating unavailable frame-type data as proof all frames were rendered.

### 5. Capture the intended Metal command-buffer interval

**Gap filled:** RenderDoc's Metal exclusion currently has no native capture alternative or command-buffer inclusion rule.

**Source/version:** Apple's [programmatic Metal capture article](https://developer.apple.com/documentation/xcode/capturing-a-metal-workload-programmatically), rolling documentation inspected October 18, 2026 through its indexed official text; direct HTML returned a JavaScript shell. The documented environment-variable route requires macOS 14+; this is not a universal SDK-version claim.

**Documented:** enable capture with `MetalCaptureEnabled` or the documented environment variable. Select the device/queue/scope in `MTLCaptureDescriptor`; check `supportsDestination(.gpuTraceDocument)` before choosing an output `.gputrace`. `startCapture(with:)` can throw; `stopCapture()` ends capture. Only command buffers created after capture begins and committed before it ends are included. Enabling capture has measurable CPU overhead.

**Unknowns:** stop does not document a separate artifact-finalization callback, fsync guarantee, general cancellation/rollback, or Metal 4 parity in this article.

**Proposed acceptance:** log capture support/start error and exact buffer interval; independently verify the saved trace can reopen and contains the required pass. Do not use a pre-created command buffer as evidence of coverage. Preserve a separate uninstrumented timing run and exact OS/Xcode/GPU metadata.

### 6. Collect D3D12 removal diagnostics before claiming a root cause

**Gap filled:** graphics API validation and frame capture do not cover the separate device-removal diagnostic path.

**Source/version:** Microsoft's [DRED guide](https://learn.microsoft.com/windows/win32/direct3d12/use-dred), updated July 1, 2022; [breadcrumb getter](https://learn.microsoft.com/en-us/windows/win32/api/d3d12/nf-d3d12-id3d12deviceremovedextendeddata-getautobreadcrumbsoutput) and [page-fault getter](https://learn.microsoft.com/en-us/windows/win32/api/d3d12/nf-d3d12-id3d12deviceremovedextendeddata-getpagefaultallocationoutput), updated February 22, 2024. These method pages specify Windows 10 version 1903 minimum; installed SDK/runtime compatibility remains unchecked.

**Documented:** process-global DRED configuration must precede device creation. After removal, the runtime interface exposes breadcrumbs and page-fault allocation candidates. Getters distinguish `S_OK`, not-currently-available (device not removed) and unsupported (feature not enabled). Breadcrumbs are approximate because GPU execution is pipelined/reordered; their history is bounded. Page-fault support varies by GPU; diagnostic instrumentation adds overhead.

**Unknowns:** diagnostics do not identify the exact failing instruction reliably, restore a device, or establish a safe retry. Crash-dump persistence is a separate collector responsibility.

**Proposed acceptance:** retain native removal reason, feature configuration, getter outcomes, marker/resource identities and raw diagnostics before an application-specific recovery path. Keep unsupported/no-data distinct from a clean result. Use a disposable fault fixture to test collection; do not provoke a GPU fault or change watchdog/security settings during source research.


## Physics recording, contact and restoration

### 1. Inspect a recorded solver failure: Unreal Engine 5.5 CVD

**Documented constraints.** Chaos Visual Debugger records simulation state. Its ReSim badge identifies frames recorded during network correction; rerunning simulations/queries inside CVD is listed as future work. Async game frames and solver frames need not correspond one-to-one; the game timeline chooses the closest solver timestamp. Solver-stage inspection depends on recorded channels. Contact selections expire across frames and may display stale data with a warning. Joint, character-ground-constraint and acceleration-structure recording are disabled by default. Recorded particle geometry is physics-thread geometry, which may differ from game-thread geometry. Component queries have limited support. Rapid landscape collision unload/reload can display incorrectly while scrubbing; the documented workaround is reloading the recording. These are UE 5.5 guide limitations, not claims about later releases. [Official UE 5.5 guide](https://dev.epicgames.com/documentation/en-us/unreal-engine/chaos-visual-debugger-user-guide?application_version=5.5)

**Proposed acceptance.** Store capture hash, engine build, data channels, solver ID/frame/stage, game timestamp, synchronization mode and contact freshness. Reject unsupported, absent or stale observations. Compare aligned network ticks before declaring desynchronization. Separate recorded inspection from a new counterfactual run.

**Unknowns.** Headless extraction, automated completion signals and recording compatibility remain unverified.

### 2. Preserve contact origin, sign and identity: Jolt 5.2.0

**Documented constraints.** ContactManifold contact points are relative to `mBaseOffset`; world-space accessors are available. `mWorldSpaceNormal` points in the direction that moves body 2 out of collision. Negative penetration depth denotes a speculative contact that might never cause a velocity change. Manifold reduction can retain only one subshape pair when merging coplanar manifolds. [Versioned ContactManifold reference](https://jrouwe.github.io/JoltPhysicsDocs/5.2.0/class_contact_manifold.html)

**Proposed acceptance.** Retain ordered body/subshape identities, base offset, relative and reconstructed world points, normal convention, signed depth and update identity. Use an asymmetric two-body fixture with an origin shift to catch swapped normals and dropped offsets. Classify speculative contacts separately from resolved impacts. Do not present one retained subshape pair as an exhaustive collision-feature inventory.

**Unknowns.** No cross-engine contact equivalence or project-specific penetration tolerance is established. The fixture needs independently chosen world units and tolerances.

### 3. Distinguish update completion from current contact truth: Jolt 5.2.0

**Documented constraints.** `PhysicsSystem::Update` divides its interval into collision/integration iterations, waits for its internal jobs and returns an `EPhysicsUpdateError`. `WereBodiesInContact` queries the last update, can remain true after movement/removal, and requires at least one active body for contact detection. Its permitted use during an update is restricted to specified contact callbacks. `SaveState` accepts state selection/filter parameters; `RestoreState` returns false on failure. [Versioned PhysicsSystem reference](https://jrouwe.github.io/JoltPhysicsDocs/5.2.0/class_physics_system.html)

**Proposed acceptance.** Preserve timestep, collision-step count, return error, completed-update identity and subsequent mutations beside contact evidence. A returned call does not establish a clean update or current overlap. Reject failed restoration before advancing; preserve the failure artifact and restart from a separately verified baseline rather than assuming atomic rollback.

**Unknowns.** Failure atomicity, durable snapshot writes and cross-version snapshot compatibility are not established by this reference.

### 4. Validate a complete state replay: Jolt 5.2.0

**Documented constraints.** StateRecorder saves simulation-modified state, excluding settings such as friction, restitution and motion quality. Validation requires the full state, `EStateRecorderState::All`, and no filter. Multipart restoration requires disjoint body/constraint/contact sets and only the last part marked final; restoring a contact twice produces undefined behavior. Multipart restoration and validation are incompatible. [Versioned StateRecorder reference](https://jrouwe.github.io/JoltPhysicsDocs/5.2.0/class_state_recorder.html)

**Proposed acceptance.** Preserve an external configuration journal with each physics snapshot. Test full-state replay separately from reduced-bandwidth restoration. Record snapshot inclusion policy and part manifest; reject duplicate or missing parts before restoring. A filtered snapshot must not be labeled a validated full-state replay. Keep gameplay inventory, RNG, input and event-side-effect restoration as explicit application responsibilities.

**Unknowns.** Snapshot schema migration, application-state coverage, crash durability and recovery after a partially applied restore remain project-specific.

### 5. Qualify determinism and topology restoration: Jolt 5.2.0

**Documented constraints.** Baseline determinism requires identical mutation order and binary code. Cross-platform mode requires `CROSS_PLATFORM_DETERMINISTIC`, matching source and compile defines; upstream describes it as less tested. Application floating-point precision/contraction, trigonometry and sorting choices also matter. Rollback needs application-managed topology reconciliation and stable body IDs; snapshots do not recreate subsequently added bodies. Constraint serialization depends on constraint ordering even where unique priorities allow equivalent simulation ordering. [Versioned architecture: Deterministic Simulation; Rolling Back a Simulation; Being Sloppy While Still Being Deterministic](https://jrouwe.github.io/JoltPhysicsDocs/5.2.0/)

**Proposed acceptance.** Freeze source/binary/build flags, floating-point configuration, ordered mutation/input log, stable identities and constraint ordering. Compare a restored rerun against an uninterrupted reference over a declared horizon. Include a configuration change, body addition/removal and delayed input. Declare separately whether the target is identical bytes or a numerical tolerance; matching images cannot establish either.

**Unknowns.** These prerequisites do not verify the target platform combination, application determinism or compatibility between engine releases.


## Build artifacts, streaming budgets and delayed timing

### UnityDataTool: query the shipped bytes before proposing an asset fix

**New gap filled:** existing asset notes validate formats and dependency operations; they do not establish how an agent can inspect actual Unity build contents or detect an invalid analysis.

The [inspected UnityDataTools README](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/README.md) describes an offline CLI over archives and serialized files, without a running Editor. The native UnityFileSystemApi is backward-compatible but not forward-compatible with newer Editor content. The project is experimental and explicitly not officially supported; source availability does not guarantee support or compatibility. No binary was downloaded or run, and its redistribution license was not established in this pass.

The same-revision [agent guide](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/agent-guide.md) supplies unusually concrete failure boundaries:

- Analyze one binary build’s archives/serialized files per database; duplicate archive/serialized-file names are rejected rather than safely identifying separate targets.
- Missing TypeTrees can skip files and leave a valid but empty database. Player builds normally omit them; the documented diagnostic build switch changes the input artifact and must be recorded.
- Database row `id` and serialized local `object_id` differ. Reference lookup takes the former; object dumping takes the latter, whose uniqueness is only within a serialized file.
- Potential-duplicate rows are candidates based on matching attributes, not verified byte-identical redundancy. Whole-build coverage matters; analyzing one bundle cannot establish build-wide duplication.
- Reference-chain tooling is experimental; a missing result is not proof that no dependency exists.

**Proposed gate:** preserve build provenance, target, native-reader version, file inventory and skipped-file diagnostics before interpreting a query. Archive the database schema and join on the correct identity domain. Reinspect the object and dependencies before changing bundling or Read/Write settings. These are research recommendations, not a working automated optimizer.

### Compare build outputs without confusing identifiers or byte domains

The pinned [comparison guide](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/comparing-builds.md) describes separate databases and cross-database queries rather than a native two-build comparison operation. Hash-bearing bundle filenames can change after content edits. A matching text dump need not prove binary equivalence: header/padding changes and floating-point representation can differ; hexadecimal float output helps investigate the latter. External resource bytes require their own comparison.

The pinned [Addressables analysis guide](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/addressables-build-reports.md) documents report-to-SQLite extraction and build-scoped tables. Its bundle-size comparison assumes packed-together groups and stable group GUIDs. Cache names and catalog names are distinct. Report build IDs scope joins; do not join records from unrelated builds solely by an integer asset ID.

The [Addressables 2.2.2 layout-report page](https://docs.unity3d.com/Packages/com.unity.addressables@2.2/manual/BuildLayoutReport.html) requires enabling Debug Build Layout and building content; generation adds build time. Its documented `buildlayout` path and the newer tool guide's `BuildReports` JSON example are different documentation scopes. Verify the actual report schema/path instead of advertising one universal command.

**Unknowns:** parser behavior for each engine/package release, cancellation, interrupted database recovery, stable cross-build object correspondence, and a project's intended duplication/performance tradeoff. A smaller bundle is not by itself a successful optimization.

### Unreal texture-streaming completion is budget-relative

The [Texture Streaming Metrics page, labeled UE 5.8](https://dev.epicgames.com/documentation/unreal-engine/texture-streaming-metrics-in-unreal-engine?lang=en-US) distinguishes conceptual pools from currently used mip memory. Required Pool can exceed the streaming budget, reducing delivered resolution. Wanted Mips at 100% means the current wanted set has streamed, not that every texture reached ideal resolution. Full streamer updates span frames; non-streaming allocation fluctuations exceeding the safety pool can repeatedly displace streamed textures. The temporary pool affects in-flight requests and loading order, while the displayed IO-bandwidth estimate is not an exact storage benchmark. Early visibility before incremental level processing of static components completes can force remaining work into a hitch. Historical Paragon/4.15 performance examples on that page are not current-project results.

**Proposed diagnostic:** correlate camera path, visibility changes, required/wanted/visible mips, allocations and frame-time evidence at the same update scope. Preserve resource-quality targets alongside budget counters. Increasing a pool or reaching 100% Wanted Mips is not an acceptance test for visual quality, whole-world streaming readiness or stable performance.

### Unity frame timing: retain the observation delay and sample count

The [Unity 6000.0 FrameTimingManager manual](https://docs.unity.com/en-us/engine/6000.0/manual/analysis/graphics-performance-profiling/profile-rendering/frame-timing-manager/manager) documents a four-frame result delay, without guaranteeing valid results after that delay. Instrumentation may itself slow OpenGL ES. Platform/API support is partial in some configurations, and tile-based rendering can report GPU duration exceeding frame duration because the interval includes deferred gaps.

[GetLatestTimings, Unity 6000.0](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/FrameTimingManager.GetLatestTimings.html) returns the number actually obtained, at most the request; element zero is the latest completed sample, with older samples afterward. Array capacity is the caller's responsibility.

**Proposed gate:** record capture request, actual returned count, sample timestamps, graphics API/device and instrumentation configuration. Do not align a delayed sample with the current screenshot solely by array position, or interpret unavailable data as zero cost. Performance acceptance needs a specified target workload, comparable capture overhead and repeated observations. No frame collector or benchmark was executed here.

## Remaining practical boundary

A production failure still needs project-owned identity mapping between frame, solver update, asset/build revision and gameplay event. Animation foot contact requires the rig/controller, intended motion, coordinate transform and collision evidence; a contact API alone supplies no universal foot-sliding or retargeting threshold. Streaming readiness also includes project-specific geometry, navigation, scripts and durable state beyond texture mips. These joins, target-machine entitlements and real fixture outcomes remain unknown. Prefer a reproducible failing project and explicit acceptance target before claiming an automatic diagnosis or optimization loop.
