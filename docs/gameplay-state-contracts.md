# Gameplay state, narrative checkpoints and durable effects

Sources checked **2026-10-18**; full reproduction not performed. These two complementary investigations separate interpreter state, world state, database transactions and client observations. They extend [production work orders](production-work-orders.md) with source-backed boundaries and explicitly proposed acceptance fixtures.

## Narrative checkpoints, cancellation and world-effect transactions

Checked **2026-10-18** through public primary documentation and source. No software installed, game/engine run, agreement accepted, save generated or model optimized. This is new source discovery beyond the existing Ink JSON save and external-function summaries. It supplies concrete runtime boundaries, not a working quest adapter or an atomic game-save implementation.

### Key finding and eligibility gate

A dialogue runtime can persist its variables or interpreter state without persisting the world changes caused by its commands. Stopping dialogue can leave asynchronous game code running. An agent should therefore never translate “dialogue completed,” “variables saved,” or “story reset” directly into “quest transaction committed or rolled back.” The fixture and transaction design below are **GameMap editorial proposals, unimplemented**.

The newly examined Yarn Godot GDScript integration is **Early Access 3.2**, requires the standard **Godot 4.6+** build, and its README advises against shipping yet. The free source is separately available from paid add-ons. Installation docs and README disagree about whether the paid package is currently available, so no purchase or paid-feature availability claim is made. Sources: [installation](https://yarnspinner.dev/docs/godot/gdscript/01-installation/), [official repository](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript).

#### Purpose-specific license warning

The inspected integration uses [Yarn Spinner Public Licence 1.0](https://raw.githubusercontent.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/main/LICENSE.md), not a blanket MIT license. Section 3.3 restricts use of covered software/documentation/materials for training, fine-tuning or otherwise improving AI, while expressly permitting AI-assisted game development, Yarn-script writing and learning. Section 3.2 permits certain integrating tools subject to users independently obtaining Yarn and the tool not bundling, redistributing or automatically downloading it. Attribution and distribution conditions also apply. Treat optimizer datasets, automated improvement and redistribution as purpose-specific unresolved eligibility; this read-only report does not determine their legality or grant permission. Do not apply this license summary to every historical Yarn version, engine integration or component. Prefer a separately cleared alternative for an executable optimization experiment until the intended use is reviewed.

### Documented operation boundaries

#### 1. Yarn Godot: variable save is not a dialogue cursor checkpoint

[Variables and Storage, GDScript 3.2](https://yarnspinner.dev/docs/godot/gdscript/05-connecting-to-your-game/04-variables-and-storage/) documents `save_state_to_persistent_storage` and `load_state_from_persistent_storage` in `user://`; both return booleans. Loading replaces current variables. Saved data excludes dialogue position: the application must retain a restart node and explicitly start it after loading. `get_all_variables` and `set_all_variables` allow integration into an application save. A custom `YarnVariableStorage` can use the game's own data. Supported variable values are numbers, strings and booleans, not scene nodes or transforms. Subscriptions notify changes, not initial state; node-scoped subscriptions are removed when the node leaves the tree.

**Proposed gate:** choose a restart-safe narrative boundary, retain the compiled program identity and restart node, and preserve the world-state save alongside variables. Rebuild UI/world presentation from the restored authoritative values instead of assuming a listener will replay every initial value. Missing or malformed saves, scene references and compatibility migration require project-specific handling; atomic writes, crash durability and listener ordering during restore remain unverified.

#### 2. Yarn Godot: stop completion is not command cancellation

[Async and Cancellation, GDScript 3.2](https://yarnspinner.dev/docs/godot/gdscript/05-connecting-to-your-game/08-async-and-cancellation/) distinguishes presenter hurry-up from next-content requests. Presenters must return before progression; a warning after five seconds is diagnostic rather than forced rollback. Commands have no presenter cancellation token. `stop_dialogue()` can be awaited and emits `dialogue_cancelled` followed by `dialogue_completed`; an already awaiting command can nevertheless keep executing its own code. The guide recommends checking running state after awaits. `YarnAsync.wait` observes node processing/pause and ends when its node leaves the tree; a cancellation-token timeout keeps counting during pause.

**Proposed gate:** maintain an application-owned conversation/session epoch as well as running state. A running-state check alone cannot prove an old command belongs to a newly started conversation. This is an editorial stale-work hazard to test, not a measured upstream bug. After stopping, account for outstanding world commands independently before snapshotting, resetting or starting another scenario. Do not interpret a completed event as natural completion without recording cancellation intent and outcome.

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
- Yarn documentation: rolling pages displayed as GDScript Early Access 3.2; official repository default branch not pinned. GitHub commit lookup returned HTTP 403 rate-limit exceeded; no revision invented and no repeated retry
- Ink inspected source commit: `35c63e52f1d36060930dc7ed3cfba38ea224b528`; file `ink-engine-runtime/Story.cs`; reviewed reset methods around lines 299–332, background save around 828–868 and async guard around 1775–1778
- Local source SHA-256: `10a150e6438360f346bfad4ffd17749bcdc5ae851fd11e4bb957ed27e0604340`
- No engine/plugin installation, model training, benchmark evaluation or executable adapter promotion performed

## Server-owned gameplay state and transaction boundaries

Sources checked **2026-10-18**; full reproduction not performed. This adds a concrete public backend case to the project-specific quest/reward gap. No server, database, SDK, account, payment or game was installed or operated. Proposed fixtures are **GameMap editorial guidance**, unimplemented and unexecuted.

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

**GameMap editorial guidance:** a future fixture needs stable player/quest/operation identity, schema revision, authority checks, explicit transaction membership, conflict classification, durable reconciliation, notification ownership and recovery after process loss. Use disposable state and preserve expected/observed artifacts. Test old-save migration and duplicate/reordered commands. Narrative cursor restoration, world-object identity and external effects remain separate domains until a project-specific implementation joins them and passes these tests.
