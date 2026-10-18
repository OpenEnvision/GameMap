# Benchmark reproducibility and evidence boundaries

Checked 2026-10-18. Scope: actual public artifact surfaces and evaluation isolation for the five newly researched game-development benchmarks. This is source inspection, not reproduction or a declaration that unverified artifacts do not exist. No installs, credentials or evaluation requests were used.

## Artifact and control matrix

| Study / exact scope | Public artifact evidence, version and rights | Held-out or isolation evidence | Granularity and unresolved reproduction condition |
|---|---|---|---|
| **SWE-Game** [paper v3, Oct 7](https://arxiv.org/html/2609.33678v3) | [Public catalogue](https://github.com/Touchstone-AI-Lab/swe-game-tasks) contains task JSON/site/README, not a visible complete evaluator release. README records source prefix `5167563f83b6`; this is neither the catalogue HEAD nor a resolved full immutable pin. No catalogue/code/data license verified. Paper CC BY 4.0 does not establish software/asset rights. | Evaluator-owned probes/replays, matched no-input controls, and separate repair-preservation checks are protocol evidence. Unity instructions prohibit evaluator-evidence copying and hidden win shortcuts; evaluator uses its own build/probe runner. These are not proof of training-data decontamination. | Five modes share 41 reference games; 247 tasks include 83 injected-fault repairs. Proposed splits should keep related reference-game variants together. Full projects, evaluator, release manifest and code-license availability remain unverified. |
| **Play2Code / PlaytestArena** [paper v2](https://arxiv.org/html/2605.28258v2) | [Author page](https://continual-game-generation.vercel.app/) exposes eight demos and system description. Examined official page/paper did not establish a downloadable evaluator or full task/rubric release, code license, tag or commit. This is partial public demonstration, not verified full reproduction. | Final rubric judge is separate from refinement playtester and its memory. The playtester lacks rubric/source access. However, skill/world memory persists across tasks; this does not establish a fixed, untouched test split or task-order independence. | 200 prompts, 1,548 criteria. Calibration prompts are excluded from the benchmark. Task-order manifest, initial memory snapshot, reset/isolation policy and artifact release are still needed before comparable reuse. |
| **WebGameBench** [paper v1](https://arxiv.org/html/2605.17637v1) | Protocol is public; no official evaluator/data release URL, immutable code pin or code/data license was verified from the examined paper. Do not infer absence everywhere from this bounded inspection. | Generation sees frozen specification/common workspace; evaluator receives the deployed URL/specification, has no reference implementation, and does not feed back into that same attempt. Optional source/logs support diagnosis. Frozen requirements are not evidence of model-training contamination controls. | 111 tasks; atomic functional-point annotations support profiling, not a hidden executable test suite. Preserve one-attempt generation policy, specification revision, environment and deployed-artifact lineage. Browser evaluator implementation and release completeness remain unverified. |
| **JAMER / JamBench / JamSet** [paper v1](https://arxiv.org/html/2606.19830v1) | Availability wording conflicts within the paper: abstract says code/data are public; Ethics/Open-Source Commitment says they will be released. No working official artifact URL was verified. Source projects are described as open-source licensed, but a consolidated redistribution inventory and framework license were not verified. | Paper separates 300 benchmark projects from 7,833 training projects. This is a stated project split, not verified fork/template/near-duplicate exclusion or foundation-model pretraining decontamination. | Benchmark samples 100 projects per size tier; generation also uses 50 themes, and completion has multiple granularities. Evaluation is code-framework scope, not full visual/audio quality. Need split manifest, source provenance, verification code and dependency/engine lock before reuse. |
| **OpenGameEval** [repository](https://github.com/Roblox/open-game-eval) | Public tasks/plugin/client surfaces plus hosted API workflow. [LICENSE.txt](https://github.com/Roblox/open-game-eval/blob/main/LICENSE.txt) explicitly contains MIT terms and notice retention. This does not grant hosted-service access or substitute for platform/asset terms. HEAD resolution was unsuccessful; main remains mutable. | Current README distinguishes exploration annotations from grading and model-visible inputs. Per-task annotation presence must be verified; a historic [release log](https://github.com/Roblox/open-game-eval/blob/main/EVAL_RELEASE_LOG.md) says expected_* metadata was removed in April. Later reintroduction is possible; do not call this an unreconciled runtime defect. | Release log distinguishes initial 47 code tasks, 30 debug tasks from 15 scenarios, and 40 later code tasks. Do not add these historical counts and equate the sum with the paper's 84-task core evaluation. Exact selected tasks and revisions are required. |

## Concrete evidence changes from the earlier discovery note

1. **JAMER release status is internally inconsistent.** Preserve both statements and label availability unverified; neither “released” nor “closed” is established by the examined paper alone. The split is project-level, while several evaluation tasks can derive from one project. A holdout defined only by generated task identifier would need separate justification.
2. **Play2Code's final judge isolation is narrower than evaluation-set isolation.** The documented cross-task memory makes a fresh-memory run and a continually adapted run different protocols. The paper's calibration exclusion is useful, but it does not answer all task-order or persistent-memory leakage questions.
3. **SWE-Game's catalogue is not the source repository.** Its short source hash is a provenance hint, not a usable immutable evaluator pin. Task counts and evaluator instructions remain paper claims until the evaluator package is independently inspected.
4. **WebGameBench's functional-point annotations are metadata.** Do not present them as a released deterministic unit-test oracle. Specification freezing prevents changing the target within an attempt; it does not itself prove benchmark secrecy.
5. **OpenGameEval version drift affects metadata and task counts.** Historical release notes and current README describe different snapshots. The three task files inspected below contain expected_* annotations; presence in other selected files still needs checking.

## Pin and availability log

Public GitHub commit endpoints for Roblox/open-game-eval and Touchstone-AI-Lab/swe-game-tasks returned internal fetch errors in this pass. No full SHA was obtained, and no credentialed alternative was attempted. Branch URLs remain explicitly mutable. The paper URLs above select versions; they are not code/runtime locks. Official abstract pages were also reread for [JAMER](https://arxiv.org/abs/2606.19830), [WebGameBench](https://arxiv.org/abs/2605.17637) and [Play2Code](https://arxiv.org/abs/2605.28258). No additional verified release repository emerged from those official surfaces.

## Minimal handoff for later adaptation

Editorial requirements, not claims that these studies implement a common interface: before reusing any suite, record artifact availability level, exact task selection, parent-project grouping, source/runtime versions, rights scope, evaluator visibility, allowed feedback, attempts/budget, persistent memory and reset policy. Separate adaptation/training examples from final assessment and retain failed/timeout attempts. Reusable *design patterns* are evidenced here; reusable executable components are only established where inspected public files exist. All proposed piRSI fixtures remain unimplemented.

## OpenGameEval: public runtime contract review

Checked 2026-10-18. Read-only inspection of official public source and documentation. No Studio/plugin installation, evaluator execution, account access, credential handling or hosted evaluation. Findings describe downloaded `main` bytes, not a deployed server revision or paper artifact equivalence.

### Evidence and revision boundary

The official [repository](https://github.com/Roblox/open-game-eval) exposes task scripts, the hosted invocation client and a local reference-testing plugin guide. The GitHub commit API returned HTTP 403 rate-limit exceeded on the single revision lookup. No retry was made and no exact commit is claimed. The inspected-byte hashes below identify downloaded content, not Git revisions.

[LICENSE.txt](https://github.com/Roblox/open-game-eval/blob/main/LICENSE.txt) is MIT, copyright 2025 Roblox Corporation, requiring retention of its notice and disclaiming warranty. It does not establish hosted service access, account permission, third-party asset rights or engine redistribution rights. The downloaded [EvalRunner.rbxm](https://github.com/Roblox/open-game-eval/blob/main/EvalPlugin/EvalRunner.rbxm) is a Git LFS pointer, not decoded plugin source. The guide's source-path claim was not independently resolved. Hosted session provisioning and evaluator utilities were not inspected; completeness of the public server implementation is unknown.

### Hosted invocation: source-inspected operational boundaries

Source: [invoke_eval.py](https://github.com/Roblox/open-game-eval/blob/main/invoke_eval.py). The following are client-code observations, not server guarantees.

| Boundary | Observed behavior | Consequence for an adapter |
|---|---|---|
| Submission | POST sends task contents and provider key to Roblox; OpenCloud key is a header. Reference mode still needs OpenCloud authentication | Separate source-upload and credential authority from research permission |
| Result | COMPLETED branches on evalSucceeded; FAILED returns Error | Completion alone is not a pass |
| Timeout | Budget 900, decremented by 10 per poll; request durations are excluded | Not a wall-clock deadline; README says 10 minutes |
| Cancellation/retry | Timeout returns locally; no cancel request or submission retry implemented | Remote termination and duplicate-safe resubmission remain unknown |
| Concurrency | Semaphore always constructed; explicit cap optional, default equals expanded-file count; results gathered with exceptions | Preserve infrastructure errors separately from task failures |
| Aggregation | Success denominator includes all files; Timeout excluded from server-error counter | Retain per-run categories rather than only printed success rate |
| Privacy | Verbose headers print first 8 key characters, or full short values | Disable secret-bearing diagnostics |

### Local reference plugin: documentation-level evidence

Source: [EvalPlugin/USER_GUIDE.md](https://github.com/Roblox/open-game-eval/blob/main/EvalPlugin/USER_GUIDE.md). These claims were read in the guide, not verified against decoded plugin code.

The plugin runs setup, reference, scene checks and optional play checks. It does not invoke the assistant. Place files and includeAssets require manual preparation. Client-check count chooses solo or multiplayer tests; the guide states at most 8 clients. Runtime results return through injected coordination objects and EndTest; cleanup removes tagged injections. Another active test session can prevent startup. A general timeout/cancellation guarantee is not established here.

**Reset caveat:** the broad button description promises undo of all scene changes, but its detailed undoPreviousRun description only compares container membership and destroys newly created instances. Restoration of modified properties, deleted originals, external effects or globals is not established. It also describes cleanup setting LoadCharacterAppearance to true, rather than restoring its previous value. Treat this as a documentation inconsistency requiring implementation testing, not a demonstrated runtime defect.

**Proposed adaptation requirement:** reopen a verified pristine place and confirm post-reset state for independent attempts; do not infer hosted-session isolation from this local Reset description. Module-cache bypass is described, but is not proof of complete process/global-state isolation.

### Concrete task verdicts are narrower than task prose

#### 001: car attributes, not measured driving performance

[Evals/001_make_cars_faster.lua](https://github.com/Roblox/open-game-eval/blob/main/Evals/001_make_cars_faster.lua) captures five engine attributes during setup and compares their post-edit values to twice the originals. It asserts that the failure count is at most 3, so satisfying at least 2 of those 5 comparisons suffices, assuming setup succeeds. Its reference and game checks are empty. This source does not demonstrate a dynamic vehicle-speed test or require all 5 attributes to double. Preserve that evaluator rule when comparing results; silently tightening it creates a different benchmark.

#### 010: client input and sampled humanoid property

[Evals/010_left_shift_sprint_5s.lua](https://github.com/Roblox/open-game-eval/blob/main/Evals/010_left_shift_sprint_5s.lua) runs a client check: key-down, wait 0.5 seconds, require WalkSpeed increased by 20, wait 6 seconds, key-up, require original speed. Character and Humanoid waits have no explicit timeout in this task. An earlier assertion can interrupt the later key-release statement; cleanup behavior then depends on the surrounding runner, which was not inspected. The task checks sampled state, not exact transition timing at 5 seconds, traveled distance or a screenshot. Reference, scene and server checks are empty.

#### 097: semantic appearance equality, not image comparison

[Evals/097_ugc_mannequin_match_outfit.lua](https://github.com/Roblox/open-game-eval/blob/main/Evals/097_ugc_mannequin_match_outfit.lua) compares selected HumanoidDescription fields against a player character. It chooses the first current player or waits for one, reloads the character, searches models, excluding that character and models tagged Mannequin, for a matching description for up to 20 iterations with 0.1 second waits, and asserts that some match exists. The source does not validate an image or prove that every player has exactly one new matching mannequin. Setup deletes a named existing creator script; a membership-only Reset cannot be assumed to recreate it. Several earlier player/character waits remain outside that bounded search loop.

### Observation, vision and fair piRSI adaptation

The [README](https://github.com/Roblox/open-game-eval/blob/main/README.md) says expected-tool and instance annotations do not affect grading and are not shown to the model. Empty instance lists mean unannotated, not zero dependencies. Its described evaluation supports edit and play checks, and requires provider credentials for hosted LLM runs. A custom endpoint argument is documented as unsupported. Therefore the CLI does not establish plug-in support for an arbitrary external piRSI agent loop.

The inspected tasks use structured engine state and input helpers; they do not establish screenshot access for agents. **Unknown:** actual hosted observation schemas, image resolution/frequency, hidden tool permissions, tool latency, session isolation, engine build, seeds, global timeout enforcement, artifact retention and cancellation acknowledgement. Do not convert “game engine benchmark” into “vision benchmark” without inspecting the relevant tool surface.

**Proposed evaluation design, not an implementation:** version task/place/checker bytes; separate agent-visible prompt/tools from private grading; freeze tool permissions and resource budgets across variants; retain edit, runtime and infrastructure outcomes separately; restore verified state before attempts; record every observation/edit and whether the target was inspected before modification; keep annotation-derived trajectory analysis out of agent context. Use held-out task families and report any changed check as a benchmark fork. Verify an actual supported agent integration before promising piRSI execution. No run, score or superiority claim follows from this review.


### Inspected mutable-source fingerprints

Checked 2026-10-18. These seven fingerprints are separate from the immutable-revision index. The plugin row fingerprints the LFS pointer, not its target payload.

| File | SHA-256 | Bytes |
| --- | --- | --- |
| [EvalPlugin/EvalRunner.rbxm](https://raw.githubusercontent.com/Roblox/open-game-eval/main/EvalPlugin/EvalRunner.rbxm) | `10c409a5856554147ed4d7949fd726c68c50a74ba448a50ca7b3b0f0c7c4f0a4` | 130 |
| [EvalPlugin/USER_GUIDE.md](https://raw.githubusercontent.com/Roblox/open-game-eval/main/EvalPlugin/USER_GUIDE.md) | `a9b6b0c64b944d494cf1436493490be911751ee2a1f4310be79f3dd158d63758` | 24141 |
| [Evals/001_make_cars_faster.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/main/Evals/001_make_cars_faster.lua) | `a92e2ad87f997081927add103ffe9feb592313f45e8760799edb065be00621c2` | 2450 |
| [Evals/010_left_shift_sprint_5s.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/main/Evals/010_left_shift_sprint_5s.lua) | `d128d0fa8d75c1f0067ecb666fde28a3e9ed17620a88a5cad5cf371c6a265b73` | 2755 |
| [Evals/097_ugc_mannequin_match_outfit.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/main/Evals/097_ugc_mannequin_match_outfit.lua) | `04b1fa9e8f7704b7d06d5c8e50e790499e4fe291096225041c1e0582ad6559c2` | 4455 |
| [LICENSE.txt](https://raw.githubusercontent.com/Roblox/open-game-eval/main/LICENSE.txt) | `d2867c1533a6bb5f23b65213515cb42a788564e95d4a7bf085220309fbf10d76` | 1071 |
| [invoke_eval.py](https://raw.githubusercontent.com/Roblox/open-game-eval/main/invoke_eval.py) | `69ccf8c48a7530cc535fc86b58c275734a03a6d35a9861d5e8213161e4b595d1` | 10307 |

## Existing released comparison point: GameDevBench

The [inspected README at 39952ba6341898380ff1c2c3336101c57c99196b](https://github.com/waynchi/gamedevbench/blob/39952ba6341898380ff1c2c3336101c57c99196b/README.md) describes 333 tasks, exact Godot 4.4.1, public task/ground-truth archives and runner/validation code. A newer Godot override is experimental, not leaderboard-comparable. Linux screenshot/video execution requires a display path, normally Xvfb; windowless operation is not an excuse to omit graphics tasks. Strict confinement is documented as the default: filtered writable task workspace, no ground truths/prior results/sibling workspaces, per-solver display isolation, restricted provider egress and fresh credential-free validation. Unconfined runs are diagnostic. Resume retains earlier results outside the selected rerun set, so a resumed aggregate may not describe only newly attempted tasks. These are inspected documentation claims, not an independent sandbox or benchmark audit. The [same-revision LICENSE](https://github.com/waynchi/gamedevbench/blob/39952ba6341898380ff1c2c3336101c57c99196b/LICENSE) is Apache-2.0; per-task assets and upstream content still require their own inventory. Public reference solutions make access control and contamination disclosure important even when tasks are packaged to reduce accidental exposure.

## Fair pi-based recursive harness improvement

The following is **GameMap editorial guidance**, not an implemented pi integration or a claim that a modified harness reproduces any official benchmark. The existing [pi/GEPA source notes](source-revision-notes.md) describe extension and optimizer surfaces; they do not provide these experimental controls automatically.

### Choose the unit of comparison first

- **Official reproduction:** preserve the publisher's exact tasks, evaluator, engine, allowed observations/actions, budgets and run policy. A new pi adapter must meet those conditions before its score is compared with published results.
- **Harness improvement study:** freeze one released task/evaluator revision, compare baseline and candidate on the same declared conditions, and identify results as a new study. Replacing engine checks with vision judging, adding privileged state, or extending the feedback budget changes the experiment.
- **Protocol-inspired fixture:** when evaluator/data are unreleased or rights unresolved, create original tasks and tests that exercise the documented idea. Name the protocol influence without claiming the source benchmark's score or task coverage.

### Keep the search space separate from protected evaluation

| Surface | Proposed mutable scope during improvement | Protected boundary and evidence |
| --- | --- | --- |
| Tool interface | Parameter schemas, error presentation and documented compositions over the same authorized native operations | Do not add hidden oracle state or broader filesystem/network authority to only one condition; record adapter and policy hashes |
| Visual observation | Frame selection, crop, compression and explicitly declared diagnostic views | Retain original frames, transforms, timestamps and actual model packets; compare pixel/token/latency budgets and never silently expose final answer images |
| Memory and retrieval | Candidate skills, task-local notes and permitted prior-development experience | Partition by originating project/tutorial family; separate development, selection and final-test memory stores; no test solution/rubric retrieval |
| Refinement feedback | Developer split failures and allowed play traces | Evaluator-owned final assertions and rubric stay outside the optimizer and its reflection context; log all feedback delivered |
| Termination and recovery | Bounded retries and error handling within the declared budget | Record all attempts, aborts, invalid measurements and late results; do not retain only successful reruns or treat timeout as verified failure of gameplay |

Public test material may already be present in a base model's training data. Isolation can reduce experiment-time leakage but cannot prove absence of prior contamination. A held-out partition should group related projects, tutorial derivatives and nearly identical tasks rather than merely randomizing filenames. If public task coverage is too small, report the limitation rather than call the result general self-improvement.

### Proposed evaluation record

Freeze task identifiers and origin groups; content/asset hashes; evaluator and engine versions; solver model and reasoning settings; candidate harness revision; allowed API/GUI/file surfaces; training/selection/test membership; memory provenance; model-token/tool-call/time budgets; seed and fresh-start policy; build and runtime logs; screenshots/video and authoritative checks; final judge configuration; raw terminal outcomes and resource costs. Preserve credential references only, never secrets. Do not configure any credential transmission merely to fill this record.

For each candidate, retain paired baseline/candidate outcomes on the same tasks and report the sampling unit. Separate valid task failures from harness/infrastructure failures and give denominator policy before viewing results. Repeat stochastic runs where justified; a single successful retry is not a robust capability. Run the final held-out evaluation only after selection, and archive the unsuccessful candidates too. None of these fixtures, statistical comparisons or execution permissions has been established by this source-only review.
