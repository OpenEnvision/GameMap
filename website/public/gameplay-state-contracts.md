# Gameplay state, narrative checkpoints and durable effects

Decide what must survive a save, checkpoint, replay, or retry. The interfaces below separate interpreter state, game-world state, database transactions, physics, and client observations so you can design recovery checks for each.

## Narrative checkpoints, cancellation and world-effect transactions

Keep narrative progress, world state, and external effects distinct when designing a checkpoint. Use the runtime interfaces below to decide where synchronization is needed.

### Key finding and eligibility gate

A dialogue runtime can persist its variables or interpreter state without persisting the world changes caused by its commands. Stopping dialogue can leave asynchronous game code running. An agent should therefore never translate “dialogue completed,” “variables saved,” or “story reset” directly into “quest transaction committed or rolled back.” Use the transaction template below to coordinate these states.

The newly examined Yarn Godot GDScript integration is **Early Access 3.2**, requires the standard **Godot 4.6+** build, and its README advises against shipping yet. The free source is separately available from paid add-ons. Installation docs and README disagree about whether the paid package is currently available, so no purchase or paid-feature availability claim is made. Sources: [installation](https://yarnspinner.dev/docs/godot/gdscript/01-installation/), [official repository](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/README.md).

#### Purpose-specific license warning

The inspected integration uses [Yarn Spinner Public Licence 1.0](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/LICENSE.md), not a blanket MIT license. Section 3.3 restricts use of covered software/documentation/materials for training, fine-tuning or otherwise improving AI, while expressly permitting AI-assisted game development, Yarn-script writing and learning. Section 3.2 permits certain integrating tools subject to users independently obtaining Yarn and the tool not bundling, redistributing or automatically downloading it. Attribution and distribution conditions also apply. Treat optimizer datasets, automated improvement and redistribution as purpose-specific unresolved eligibility; this read-only report does not determine their legality or grant permission. Do not apply this license summary to every historical Yarn version, engine integration or component. Prefer a separately cleared alternative for an executable optimization experiment until the intended use is reviewed.

### Documented operation boundaries

#### 1. Yarn Godot: variable save is not a dialogue cursor checkpoint

[Variables and Storage, GDScript 3.2](https://yarnspinner.dev/docs/godot/gdscript/05-connecting-to-your-game/04-variables-and-storage/) documents `save_state_to_persistent_storage` and `load_state_from_persistent_storage` in `user://`; both return booleans. Loading replaces current variables. Saved data excludes dialogue position: the application must retain a restart node and explicitly start it after loading. `get_all_variables` and `set_all_variables` allow integration into an application save. A custom `YarnVariableStorage` can use the game's own data. Supported variable values are numbers, strings and booleans, not scene nodes or transforms. Subscriptions notify changes, not initial state; node-scoped subscriptions are removed when the node leaves the tree.

**Pinned storage implementation:** [runner save/load methods](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/dialogue_runner.gd#L1112-L1190) serialize six parallel key/value arrays. Saving checks whether the file opened, then writes, closes and returns true without a post-write error check or readback; that return is not evidence of crash durability. Loading rejects non-dictionaries, absent/non-array sections and unequal key/value lengths before touching storage, but then converts keys and values to the declared types. It does not check a story hash or application schema. The [default storage](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/core/in_memory_variable_storage.gd#L54-L158) clears existing variables and repopulates them through individual setters; invalid names can be rejected without a failure result reaching the loader, and setters notify listeners during restoration. Thus a true load result is not proof of complete schema acceptance or an atomic observer-visible snapshot. Custom storage can differ. These are static source boundaries, not reproduced save failures.

**Proposed gate:** choose a restart-safe narrative boundary, retain the compiled program identity and restart node, and preserve the world-state save alongside variables. Rebuild UI/world presentation from the restored authoritative values instead of assuming a listener will replay every initial value. Missing or malformed saves, scene references and compatibility migration require project-specific handling; atomic writes, crash durability and runtime listener behavior during restore remain unverified.

#### 2. Yarn Godot: stop completion is not command cancellation

[Async and Cancellation, GDScript 3.2](https://yarnspinner.dev/docs/godot/gdscript/05-connecting-to-your-game/08-async-and-cancellation/) distinguishes presenter hurry-up from next-content requests. Presenters must return before progression; a warning after five seconds is diagnostic rather than forced rollback. Commands have no presenter cancellation token. `stop_dialogue()` can be awaited and emits `dialogue_cancelled` followed by `dialogue_completed`; an already awaiting command can nevertheless keep executing its own code. The guide recommends checking running state after awaits. `YarnAsync.wait` observes node processing/pause and ends when its node leaves the tree; a cancellation-token timeout keeps counting during pause.

**Pinned lifecycle implementation:** the [runner](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/dialogue_runner.gd#L1479-L1545) already captures `_run_id` and `_line_epoch` around awaited command handling and rejects stale completion before advancing current content. This protects the runner's continuation; it does not undo effects performed inside the command. The normal stop path waits for the completion promise, but [tree-exit teardown](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/dialogue_runner.gd#L250-L279) deliberately emits neither `dialogue_cancelled` nor `dialogue_completed`. A [presenter-triggered restart during finishing](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/dialogue_runner.gd#L703-L717) can also suppress the old run's completion signals. Therefore signal-only observers must not assume every ended run produces a pair of terminal events. The [upstream tests](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/tests/test_dialogue_runner.gd#L113-L141) cover ordinary stop signal counts and restart from a completion listener; they were read, not run, and do not establish external-effect cancellation.

**Proposed gate:** maintain application-owned conversation/session identity for external world commands as well as running state, complementing rather than replacing the runner's internal guards. A running-state check alone cannot prove an old command belongs to a newly started conversation. This is an editorial stale-world-effect hazard to test, not a claim that the runner lacks stale-continuation protection. After stopping, account for outstanding world commands independently before snapshotting, resetting or starting another scenario. Do not interpret a completed event as natural completion without recording cancellation intent and outcome.

#### 3. Yarn Unreal: variable slots and project swaps have different reset scopes

The [official Unreal quickstart](https://docs.yarnspinner.dev/yarn-spinner-for-unreal/unreal/tutorial) documents boolean-returning Save/Load Variables To Slot using `USaveGame`; load clears existing variables, and float/string/bool values are serialized. `SetYarnProject` stops active dialogue, replaces the VM program, updates localization and initial-value lookup, and resets presentation state, while **preserving existing stored variables**. The quickstart labels this integration pre-release, warns that its API/features may change and advises against shipping a game with it yet. This rolling page does not establish an installed plugin or Unreal version.

**Proposed gate:** explicit content-version migration and variable-namespace policy are needed when swapping chapters/DLC. A new program with old variables is not a clean reset. Keep variables-only slots distinct from an application save containing inventory, actor state, world activation and irreversible-effect history. Completion, cancellation and project-switch behavior must be checked against the selected plugin before executable use; no parity with Godot or Unity is assumed.

#### 4. Ink: reset and background-save protocols are distinct

The newly inspected [Story.cs at commit 35c63e52f1d36060930dc7ed3cfba38ea224b528](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/ink-engine-runtime/Story.cs) adds concrete boundaries to the previously reviewed runtime guide:

- `ResetState()` creates a fresh `StoryState` and resets globals; `ResetCallstack()` ends evaluation via `ForceEnd` rather than resetting meaningful story state
- Both reject use during active `ContinueAsync` evaluation through `IfAsyncWeCant`
- `CopyStateForBackgroundThreadSave()` returns the frozen state while the live state uses a patch; a second concurrent background save throws, and beginning this protocol during async continuation is rejected
- `BackgroundSaveComplete()` ends the background-save mode and applies or defers the internal patch as described in the code

**Boundary:** these operations manage the Ink interpreter. The inspected file does not supply filesystem atomicity, checkpoint-to-new-story migration, compensation of external game effects, or a transaction joining narrative and application storage. Existing MIT license scope is already recorded for this exact repository revision; no additional source/media license is implied. The source pin is not a tested runtime lock.

### Proposed application-owned transaction envelope

This section is an original integration design, not a claim that Yarn or Ink implements these fields.

A bounded fixture could represent quest progress as three coordinated records:

1. **Narrative checkpoint:** compiled story/program hash, selected runtime/version, saved variables or interpreter bytes, and restart location where required
2. **World checkpoint:** inventory, interactable/actor state, quest-instance identity and world/content revision owned by the application
3. **Effect journal:** stable operation ID, quest/session epoch, intended effect, native acknowledgment and committed/failed/unknown status

The journal is not automatically durable or exactly-once. It needs an application storage implementation and a consistent commit protocol. Local idempotence tokens cannot guarantee exactly-once remote payments, achievements or analytics. Such external effects require their own authority and reconciliation API and should be excluded from the initial fixture.

A command should publish an observable terminal result for its operation ID. The adapter must distinguish queued, executing, applied, recorded and acknowledged. If execution or saving is interrupted after applying an effect but before recording it, recovery should query the authoritative world state or reconcile the journal, rather than blindly replaying the dialogue node. Never infer rollback from restoring a narrative variable.

For reset, first invalidate the old session epoch, stop presentation, account for outstanding commands, restore a disposable world/checkpoint pair, reconstruct presentation, and start from the declared narrative boundary. The ordering is a proposal to validate, not a universal engine recipe. If the application cannot stop or reconcile a command, report reset incomplete rather than racing it with fresh dialogue.

### A concrete acceptance fixture

Use original disposable content: a quest grants one key, opens one door and records a completed step. No paid or externally irreversible effect is needed.

| Failure injection | Required independent observations | Proposed acceptance |
| --- | --- | --- |
| Stop during a delayed grant command | cancellation/completion signals, command operation ID, epoch, inventory before/after | Old command cannot silently grant into a new session; surviving work is visible and reconciled |
| Save variables before world save | narrative/world snapshot identities and key/door state | Mismatched checkpoints are rejected or explicitly recovered, never reported as a valid full save |
| Reopen at a restart node that can grant again | restart node, effect ID, authoritative inventory count | No duplicate key; repeated request returns the same reconciled outcome or fails explicitly |
| Swap Yarn project with overlapping variable names | old/new program hashes, retained variables and migration decision | Preservation is intentional; changed defaults are not mistaken for a clean reset |
| Reset Ink callstack versus full state | pre/post variables, visit state, chosen path and world state | Reset scopes remain distinguishable; external effects are unchanged unless the application restores them |
| Start a second background Ink save | source exception/status and first-save ownership | Error is retained without corrupting the first save protocol or falsely claiming two committed checkpoints |
| Pause while a command and UI cancellation timeout are active | monotonic clock, simulation clock, node process mode and callbacks | Time-domain differences remain visible; timeout is not evidence of command completion |

Fixtures require project-owned observers and declared assertions. No run IDs, measured tolerances or success rate exists. The useful new coverage is the explicit distinction between interpreter/variable checkpoints and world-effect transactions, plus a concrete cancellation hazard and version/license gates. General quest rollback, distributed commits, story-version migration and complete simulation reset remain open implementation work.

### Reproducibility record

- Checked date: 2026-10-18
- Yarn documentation: rolling pages displayed as GDScript Early Access 3.2. A follow-up source read resolved the earlier lookup blocker to commit `642e9ad61ff8e7dd01476fd5a89e675d380c3122` (2026-10-16). Inspected README, LICENSE.md, `dialogue_runner.gd`, default/base variable storage and selected runner tests. This pins source, not an installed Godot/plugin environment or the separately hosted documentation.
- Ink inspected source commit: `35c63e52f1d36060930dc7ed3cfba38ea224b528`; file `ink-engine-runtime/Story.cs`; reviewed reset methods around lines 299–332, background save around 828–868 and async guard around 1775–1778
- Local source SHA-256: `10a150e6438360f346bfad4ffd17749bcdc5ae851fd11e4bb957ed27e0604340`
- No engine/plugin installation, model training, benchmark evaluation or executable adapter promotion performed

## Server-owned gameplay state and transaction boundaries

For a backend quest or reward, identify the transaction boundary, retry behavior, and durable result before connecting it to narrative progress.

### Authoritative does not mean automatically persisted or replicated

[Nakama authoritative multiplayer](https://heroiclabs.com/docs/nakama/concepts/multiplayer/authoritative/) requires custom match logic. Match state lives in memory for the match duration; changes are not automatically broadcast. Handlers continue with no connected players unless project logic ends them. Overloaded loops can cause the server to end a match. The documentation labels match migration and cluster features separately as Enterprise functionality. These constraints are a useful counterexample to treating a successful input message as durable quest completion.

**Proposed evidence:** distinguish received input, validated command, in-memory state transition, committed persistent state, emitted notification and client-observed result. A broadcast receipt does not establish a committed reward, and a database write does not establish that a client saw it. Match restart and reconnect need an explicit reconstruction policy; a generic host migration guarantee is not inferred.

### Conditional storage is conflict detection, not business-operation deduplication

The [storage collections guide](https://heroiclabs.com/docs/nakama/concepts/storage/collections/) defines object identity through collection/key and owner. A batch write is transactional; supplying the previously observed version rejects stale updates, and a failing conditional write rejects its whole batch. The [error reference](https://heroiclabs.com/docs/nakama/server-framework/errors/) warns that client-visible HTTP400/InvalidArgument can mean either a version conflict or insufficient permission. Preserve server-side error classification and reread permitted state before deciding recovery; do not assume every rejection warrants a retry.

**Proposed quest gate:** persist a project-defined completion identifier and reward state in the same intended transaction, with the appropriate version precondition. If response delivery is lost, reconcile that identifier and state before resubmitting a reward delta. Conditional versions alone do not define exactly-once gameplay semantics, external-effect rollback or authorization policy.

### A concrete game tutorial exposes the retry hazard

The official [Pirate Panic storage tutorial](https://heroiclabs.com/docs/nakama/tutorials/unity/pirate-panic/storage/) stores player decks server-side and updates a server-owned in-game currency balance by a delta, not replacement. Its wallet example optionally records ledger entries/metadata and refreshes the client account afterward. The tutorial explicitly says conditional storage is not showcased by Pirate Panic. A ledger entry or match-ID annotation is therefore not demonstrated idempotency protection.

**Proposed fixture:** replay the same quest-completion request after a lost response and compare balance, inventory, completion marker and ledger. Test concurrent claims and denied writes separately. This is a game-state consistency test, not a request to perform real financial transactions.

### Exact source inspection: transaction extent and a documentation mismatch

The [release notes](https://heroiclabs.com/docs/nakama/getting-started/release-notes/) list Nakama3.41.0 with nakama-common1.48.0. Tag v3.41.0 resolved to commit `cab8af584947ff0d7ebee91d6c33e67d87fd3e47` during this review; this is a source pin, not an installed-version claim.

- [core_multi.go at that commit](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/core_multi.go) runs account updates, storage writes/deletes and wallet updates through the same database transaction helper. Storage-index maintenance follows that transaction. Some error paths return `walletUpdateResults` alongside the error; a populated result is not itself a commit acknowledgment. This inspected function does not place arbitrary engine mutations, files, broadcasts or third-party calls in the database transaction.
- [db.go at that commit](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/db.go) caps its transaction retry loops at five attempts. The CockroachDB path can surface an ambiguous-commit error when RELEASE returns a non-retryable error, so failure is not universal proof of no durable change. **Static edge case in this pinned revision, not reproduced:** `executeInTxPostgresPgx` overwrites `err` with the rollback result. Five retryable transaction-body failures, each followed by successful rollback, can therefore exhaust the loop and return nil without a successful commit. A proposed fixture must inject that sequence and compare the returned status with independently read durable state; this is not a claim about a current deployed Nakama server.
- The rolling [TypeScript reference](https://heroiclabs.com/docs/nakama/server-framework/typescript-runtime/function-reference/#multiupdate) lists five parameters including storageDeletes, while its adjacent example omits that position. The [pinned JavaScript implementation](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/runtime_javascript_nakama.go) reads storage deletes at argument2, wallet updates at3 and ledger flag at4. Treat the example as requiring version/signature verification, not executable copy-ready code.

The inspected source files carry Apache-2.0 notices. That does not grant Enterprise features, managed hosting, project assets or arbitrary dependency permissions. No price or deployment entitlement is established.

### Remaining project obligations

**Fixture template:** include stable player/quest/operation identity, schema revision, authority checks, explicit transaction membership, conflict classification, durable reconciliation, notification ownership and recovery after process loss. Use disposable state and preserve expected/observed artifacts. Test old-save migration and duplicate/reordered commands. Narrative cursor restoration, world-object identity and external effects remain separate domains until a project-specific implementation joins them and passes these tests.


## Unreal replay: reconstruction, checkpoint fidelity and reset boundaries

For **Unreal Engine 5.6**, use the replay interfaces below to distinguish recorded replicated state from a SaveGame checkpoint.

### Capture scope and compatibility

The [5.6 Replay System guide][R1] describes `DemoNetDriver` recording replication data plus replay-specific fields, including for single-player projects configured to replicate. `StartRecordingReplay`, `StopRecordingReplay`, `PlayReplay` and `GotoTimeInSeconds` provide recording, playback and seeking. This establishes a reconstruction interface, not an arbitrary whole-process snapshot. **Inference:** unreplicated project state, RNG streams, pending asynchronous jobs and external effects require separately demonstrated coverage; apparent visual fidelity does not establish their restoration.

Compatibility is qualified: removed replicated fields can be skipped and added fields defaulted, while overridden `NetSerialize` formats require manual handling. `EngineNetVer`/`GameNetVer` identify serialized versions; network-version override delegates permit application compatibility decisions. **Proposed gate:** retain engine/game/content identities and test old-to-new replay interpretation. An application accepting a version number is not proof of semantic equivalence or of arbitrary cross-version support. [R1]

### Checkpoints and side effects

The [5.6 streamer guide][R2] describes baseline state, periodic net-change checkpoints and intervening object deltas. Reconstruction applies checkpoint data then later changes. A positive `demo.CheckpointSaveMaxMSPerFrame` budget can spread actor capture across frames and introduce visual discrepancies. `SetViewerOverride` changes relevancy/culling/prioritization. Therefore checkpoint scope and temporal consistency need explicit validation.

Replay actors can call functions affecting shared `GameInstance`, `GameState` or `GameMode`; Epic recommends project-specific live/replay checks. Memory replay can hide, yet continue, the live world while showing duplicate levels, then empty their contents. The documented dynamic duplicate levels are unavailable on dedicated servers and in editor mode; use a supported standalone/client configuration for that fixture. This is not live-world rollback. [R2]

Storage also varies: Local File recording is asynchronous into `Saved/Demos/*.replay`; SaveGame streaming adds copying into slots; Memory streaming retains a running window; HTTP streaming needs a custom server. Local File does not read legacy Null-streamer recordings without that streamer. None of these descriptions proves crash durability, atomic publication or remote retention. [R2]

### Completion and reset are separate observations

The [5.6 `UReplaySubsystem` API][R3] documents `RecordReplay` as void and `PlayReplay` as boolean-returning initiation. `RequestCheckpoint()` requests a write only while recording; `IsSavingCheckpoint()` exposes state. `StopReplay()` stops playback/recording, with `bLoadDefaultMapOnStop` controlling default-map reload. `SetExternalDataForObject` permits explicit supplemental object data.

**Proposed gate:** distinguish request issued, native recording/playback state, checkpoint work, stop/map transition and independently reopened replay. The listed API does not establish a durable-write completion callback, timeout semantics, automatic retry safety, reset of application singletons, or a full-world restoration contract. Do not infer successful checkpoint persistence merely from `IsSavingCheckpoint()==false`, or rollback merely from stopping. Exact seek-result/error/cancellation sequencing remains unknown under the verified 5.6 sources; no private implementation behavior is invented. [R3]

### Proposed disposable acceptance fixture

Original GameMap design, **unimplemented and unexecuted**:

- Record a replicated door and a separately observed unreplicated counter. Seek before and after a change; compare explicit observations, not only screenshots
- Exercise multi-frame checkpoint budgets with two related replicated values; retain their sample times and detect incoherent pairs
- Give replay presentation a harmless shared-counter side effect. Repeated seek/playback must expose or prevent unintended live-state changes under a declared policy
- During memory playback, compare live and duplicate-world identities and clocks; verify whether the application intends continuation or rollback
- Request a checkpoint while stopped, stop during capture, then reopen the persisted replay in a fresh process. Preserve failures and unknown outcomes rather than treating request dispatch as completion
- Replay after a replicated-schema and custom-serializer change; require an explicit migration/rejection decision and inspect reconstructed values

These fixtures complement the existing narrative-effect and physics/debug-recording distinctions. They do not claim deterministic resimulation, gameplay rollback, transactionality or engine-neutral reset.

[R1]: https://dev.epicgames.com/documentation/en-us/unreal-engine/using-the-replay-system-in-unreal-engine?application_version=5.6
[R2]: https://dev.epicgames.com/documentation/en-us/unreal-engine/demonetdriver-and-streamers-in-unreal-engine?application_version=5.6
[R3]: https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/UReplaySubsystem?application_version=5.6


## MuJoCo checkpoint inclusion and reset-observation contracts

Reference: native **MuJoCo 3.3.7**, commit `f1d45bd5422c74beddfb0d1deb590a02583d21de`. MJX and game-engine physics require separate reset and state checks.

### Verified API and implementation semantics

1. **Select the checkpoint contents explicitly.** In 3.3.7, `mjSTATE_PHYSICS` includes only `qpos`, `qvel`, `act`. `mjSTATE_FULLPHYSICS` adds `time` and `plugin_state`. `mjSTATE_USER` includes `ctrl`, `qfrc_applied`, `xfrc_applied`, `eq_active`, `mocap_pos`, `mocap_quat`, `userdata`. `mjSTATE_INTEGRATION` is FULLPHYSICS + USER + `qacc_warmstart`. Therefore neither PHYSICS nor FULLPHYSICS means every input required to resume the application. [Pinned enum, lines 27–51](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/include/mujoco/mjdata.h#L27-L51); [versioned types](https://mujoco.readthedocs.io/en/3.3.7/APIreference/APItypes.html#mjtstate).

2. **A state vector is an unframed, model-dependent array.** `mj_stateSize(m,sig)` returns a count of `mjtNum`, not a byte length. Get/set concatenate selected fields in increasing bit order; equality-activation bytes convert to/from numeric elements. The implementation derives field lengths from the supplied model. `mj_setState` is void, rejects an invalid signature through `mjERROR`, and otherwise copies selected fields. It does not consume or check a buffer-length argument, checkpoint version, checksum or model identity; unselected fields are untouched. It neither resets the whole `mjData` nor calls forward dynamics or plugin reset/copy callbacks. This is implementation evidence, not a transactional storage guarantee. [Pinned support implementation, lines 114–245](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/src/engine/engine_support.c#L114-L245); [versioned get/set API](https://mujoco.readthedocs.io/en/3.3.7/APIreference/APIfunctions.html#mj-setstate).

3. **Restore inputs before reading derived observations.** `mj_forward` runs forward dynamics without advancing time; it can refresh derived contacts, forces and sensors after restoring inputs. But it is not an application-pure read: the pinned implementation invokes an installed `mjcb_control` when actuation is enabled, then computes actuation, acceleration, constraints and sensors. A callback can overwrite restored controls or advance an external counter/RNG. Skipped stages assume their cached results are already valid. Do not use skipped computation against stale pre-restore caches. [Pinned forward pipeline, lines 1100–1160](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/src/engine/engine_forward.c#L1100-L1160); [forward API](https://mujoco.readthedocs.io/en/3.3.7/APIreference/APIfunctions.html#mj-forward).

4. **Preserve warmstart and qualify replay claims.** Upstream calls INTEGRATION the inputs to forward dynamics, while full `mjData` also holds derived values. Warmstart acceleration can affect the next numerical result; small differences can grow over a rollout. Upstream limits exact reproducibility to the same version and architecture and warns trajectories can differ across releases/operating systems. Treat matching pictures as insufficient evidence of state equivalence. [Versioned state/reproducibility discussion](https://mujoco.readthedocs.io/en/3.3.7/computation/index.html#the-state); [pinned reproducibility caveats](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/doc/computation/index.rst#L1788-L1807).

5. **Plugin state is not an opaque-process snapshot.** `plugin_state` contains declared floating-point state. Opaque `plugin_data` is not serialized; the extension contract requires it to be reconstructible from plugin configuration, plugin state and MuJoCo state. `mj_makeData` initializes plugin resources and `mj_copyData` uses the plugin copy callback. The bare setter above does not invoke those callbacks. A plugin relying on hidden mutable payload needs its own correctness review; INTEGRATION does not turn arbitrary plugin memory into serialized state. [Versioned plugin-state contract](https://mujoco.readthedocs.io/en/3.3.7/programming/extension.html#plugin-state).

6. **Model, callback and RNG state remain boundaries.** `mjData` belongs to a particular `mjModel`; upstream warns incompatible pairs have unpredictable behavior. Callback function pointers and arbitrary external callback state are not automatically included. `userdata` helps only when the application actually stores the relevant state there. Changes to model options, assets or parameters are outside this state vector. External gameplay state, RNG state, queues and pending side effects likewise do not appear among the copied fields. [Versioned simulation/model contract](https://mujoco.readthedocs.io/en/3.3.7/programming/simulation.html#initialization); [state/control](https://mujoco.readthedocs.io/en/3.3.7/programming/simulation.html#state-and-control).

**Documentation trap:** the 3.3.7 simulation guide retains an old paragraph about built-in sensor noise and `srand`. The changelog records native sensor-noise removal in 3.1.4. Do not repeat that paragraph as a current 3.3.7 feature; describe RNG as application/plugin responsibility unless separately established. [Pinned removal entry, lines 860–875](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/doc/changelog.rst#L860-L875).

### Proposed GameMap acceptance fixture (editorial, unimplemented and untested)

- Define a checkpoint boundary between completed steps, including whether controls for the next step have been applied. Envelope the array with exact engine/build/platform, model and asset/configuration hashes, plugin/controller revisions, signature, element count, numeric encoding, and external-state/input-log identity. Reject a mismatch before entering the setter; equal dimensions do not prove model identity.
- Use a contact-rich fixture with nonzero time, actuator activation, controls/applied forces, warmstart, modified equality flags and mocap pose; include a stateful plugin and callback counter where supported. Snapshot INTEGRATION plus application state, perturb each selected component, restore, and compare a readback before any callback-driven observation refresh. Separately test a deliberately reduced PHYSICS snapshot to demonstrate what the harness must restore or intentionally reset outside that mask.
- Record the observation-refresh call sequence. Compare a resumed rollout against an uninterrupted control/input sequence over a declared horizon, including callback invocation counts and RNG/event-queue state. Require callbacks to be replay-safe or explicitly include their refresh-time effects in the comparison; do not blindly add an extra `mj_forward` and assume it is side-effect-free. Collect derived observations through the same sequence on both arms, or use isolated diagnostic data with a controlled callback-state strategy.
- Report numerical/state comparison and observation freshness separately. Declare exact-bit versus tolerance acceptance before running. Test wrong model hash, changed engine version, truncated payload, unknown mask and missing plugin/application-state metadata as harness preflight rejections, not claims of safe rejection by MuJoCo itself.

**Unresolved until implemented:** storage durability/atomicity, migration across models/releases, custom plugin compliance, application side-effect rollback and the actual target build's replay result. No generic acceptance threshold or tested reset helper is supplied by this source review.


### Choosing a reset boundary for game-production evaluation

A native replay, a physics state vector and a narrative/database checkpoint restore different domains. Choose the baseline and reset mechanism before comparing agent edits. Preserve content/build identity, pending-work ownership, callback policy and the observation sequence; use independent state checks before interpreting a rendered frame as a successful reset. A source edit that changes replicated schemas, model topology or application effects may invalidate an old checkpoint even when a loader accepts it. The existing [Jolt and CVD contracts](production-debugging-contracts.md#physics-recording-contact-and-restoration) cover complementary physics recording and rollback limits; none of these mechanisms supplies universal game-state restoration. Actual round-trip fidelity, callback side effects and evaluation variance require a separately authorized disposable runtime fixture.

## Stateful interaction discovery and failure reduction

Use stateful testing to discover and reduce action sequences that break an invariant. The API reference below targets **Hypothesis 6.170.1**; see its [changelog](https://hypothesis.readthedocs.io/en/latest/changelog.html) for version changes.

### What the official evidence establishes

The [stateful guide](https://hypothesis.readthedocs.io/en/latest/stateful.html) describes generating sequences of primitive actions and arguments, carrying earlier results through bundles, and comparing an implementation with a simpler reference model. Preconditions select applicable rules. By default, invariants wait until all initialization rules finish; check_during_init=True opts into initialization checks, and invariant preconditions can skip checks. Initialization rules run once each, but their order varies. Its failure report is a short program, generally reusable as a regression test when argument representations are valid Python. This supports interaction-failure discovery, not exhaustive state coverage or game-quality assessment.

**Proposed GameMap application:** expose bounded actions such as press/release, advance fixed ticks, open/close menu, pause/resume, start/cancel dialogue, save/load and restart. Model only independently specified obligations: consumed keys are not reused, inventory is conserved under transfers, pause blocks the declared clock, and cancelled-session commands cannot modify a new session. A possible failing sequence is start dialogue → queue world command → cancel → restart → complete old command. Generation and shrinking could isolate the necessary order and arguments. This is an unimplemented fixture proposal, not evidence of a particular engine defect.

### A new machine does not reset the game

The [rendered stateful implementation](https://hypothesis.readthedocs.io/en/latest/_modules/hypothesis/stateful.html) calls the machine factory inside each generated test case, then runs rules/invariants under a `try/finally` that calls teardown. Default teardown does nothing. Factory construction precedes that protected region, so partial construction needs its own cleanup. The generated TestCase defaults to `deadline=None` and suppressed health checks. These are static source observations, not measured behavior in an installed release.

**Proposed gate:** every candidate, including shrink attempts, must establish the same declared starting state. Record whether isolation means fresh process, scene reload or checkpoint restoration. Explicitly reset held input, save directory, singleton/session state, pending jobs, RNG streams and relevant services; do not assume a new Python object performs these operations. Separate reset/boot failures from gameplay failures. The [API reference](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.HealthCheck.function_scoped_fixture) warns that function-scoped pytest fixtures reset per test function, not per generated input; required per-input isolation must be implemented explicitly.

### Reduction, fresh replay and flakiness

The [flakiness guide](https://hypothesis.readthedocs.io/en/latest/tutorial/flaky.html) requires stable outcomes and stable Hypothesis-visible generation calls for repeated inputs. Unreset filesystem/database/global state, unmanaged randomness, scheduling and network timing can invalidate that assumption. A failure that disappears on replay raises `FlakyFailure`; unstable strategies can prevent reliable reduction.

**Proposed evidence contract:** retain the initial trace, reduced trace, failed invariant, action arguments, tick boundaries and reset identity. Preserve each trace separately from its execution attempts. Then replay the reduced trace from independently established clean state before promoting it into the fixed regression suite. Shrink evaluations are adaptive search work, not independent success-rate trials. Label a trace “reduced by the configured search”; do not imply a proof of globally shortest causation. If the failure disappears, retain the discrepancy as flaky/unresolved rather than silently accepting a pass.

For a visual harness, pair authoritative state assertions with frame markers and declared screenshot comparison tolerances. Animation timing, rendering differences and a stochastic visual judge may make the verdict unstable; Hypothesis does not supply their oracle, deterministic control or reset implementation.

### Reproduction artifacts and full cost

The [ExampleDatabase API](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.database.ExampleDatabase) treats the failure database as a convenience cache; code or version changes may invalidate entries. [Opaque reproduction blobs](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.reproduce_failure) are temporary and version-sensitive. Keep an explicit human-readable action trace as the durable regression artifact. The [API reference](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.seed) qualifies seeded replay on the absence of other nondeterminism; a seed is not an engine snapshot. Record generator, strategy/model, game/build, engine, asset, adapter and oracle versions; settings/profile, database participation, game and generator seeds, capture configuration and initial-state identity.

The [execution-count explanation](https://hypothesis.readthedocs.io/en/latest/explanation/test-case-count.html) says rejected/oversized cases, shrinking, explanation and final flakiness checking can add executions beyond `max_examples`. The [API](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.settings.stateful_step_count) bounds steps per case, not total external work; its deadline is a per-case soft limit, not a campaign watchdog.

**Proposed accounting:** count all launches/resets, attempted rules, observations, visual-model calls, invalid cases, shrink/replay attempts and cleanup; preserve spent work on failure or cancellation. Use a separately enforced total time/resource budget and report interrupted reduction honestly. Runtime unknowns remain adapter feasibility, isolation completeness, oracle stability, representative action coverage, reduction quality and actual end-to-end cost. No production bug-finding gain is established by this source review.
