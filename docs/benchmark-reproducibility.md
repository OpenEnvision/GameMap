# Benchmark reproducibility and evidence boundaries

Checked 2026-10-18. Scope: actual public artifact surfaces and evaluation isolation for the five newly researched game-development benchmarks. This is source inspection, not reproduction or a declaration that unverified artifacts do not exist. No installs, credentials or evaluation requests were used.

## Artifact and control matrix

| Study / exact scope | Public artifact evidence, version and rights | Held-out or isolation evidence | Granularity and unresolved reproduction condition |
|---|---|---|---|
| **SWE-Game** [paper v3, Oct 7](https://arxiv.org/html/2609.33678v3) | Previously linked [catalogue at `8459c64`](https://github.com/Touchstone-AI-Lab/swe-game-tasks/blob/8459c64cb1839dbaffa9e2c23800363f13078425/tasks.json) has 156 game-mod tasks across 12 games, not this paper's 247 tasks/41 Godot games. No author linkage was verified; it cannot establish release availability for this study. Paper CC BY 4.0 does not establish software/asset rights. | Evaluator-owned probes/replays, matched no-input controls, and separate repair-preservation checks are protocol evidence. Unity instructions prohibit evaluator-evidence copying and hidden win shortcuts; evaluator uses its own build/probe runner. These are not proof of training-data decontamination. | Five modes share 41 reference games; 247 tasks include 83 injected-fault repairs. Proposed splits should keep related reference-game variants together. Full projects, evaluator, release manifest and code-license availability remain unverified. |
| **Play2Code / PlaytestArena** [paper v2](https://arxiv.org/html/2605.28258v2) | [Author page](https://continual-game-generation.vercel.app/) exposes eight demos and system description. Examined official page/paper did not establish a downloadable evaluator or full task/rubric release, code license, tag or commit. This is partial public demonstration, not verified full reproduction. | Final rubric judge is separate from refinement playtester and its memory. The playtester lacks rubric/source access. However, skill/world memory persists across tasks; this does not establish a fixed, untouched test split or task-order independence. | 200 prompts, 1,548 criteria. Calibration prompts are excluded from the benchmark. Task-order manifest, initial memory snapshot, reset/isolation policy and artifact release are still needed before comparable reuse. |
| **WebGameBench** [paper v1](https://arxiv.org/html/2605.17637v1) | Protocol is public; no official evaluator/data release URL, immutable code pin or code/data license was verified from the examined paper. Do not infer absence everywhere from this bounded inspection. | Generation sees frozen specification/common workspace; evaluator receives the deployed URL/specification, has no reference implementation, and does not feed back into that same attempt. Optional source/logs support diagnosis. Frozen requirements are not evidence of model-training contamination controls. | 111 tasks; atomic functional-point annotations support profiling, not a hidden executable test suite. Preserve one-attempt generation policy, specification revision, environment and deployed-artifact lineage. Browser evaluator implementation and release completeness remain unverified. |
| **JAMER / JamBench / JamSet** [paper v1](https://arxiv.org/html/2606.19830v1) | Availability wording conflicts within the paper: abstract says code/data are public; Ethics/Open-Source Commitment says they will be released. No working official artifact URL was verified. Source projects are described as open-source licensed, but a consolidated redistribution inventory and framework license were not verified. | Paper separates 300 benchmark projects from 7,833 training projects. This is a stated project split, not verified fork/template/near-duplicate exclusion or foundation-model pretraining decontamination. | Benchmark samples 100 projects per size tier; generation uses 50 themes. SCS is capped structural-count credit; BAS compares aggregate activity to dataset means (generation) or original-project traces (completion), not exact mechanic correctness. [v2 §4.3/Table 3](https://arxiv.org/html/2606.19830v2) also disagree on BAS dimension count: prose says seven numeric plus one set, but lists six numeric and one set. Resolve the dimension set and zero-value policy from released code before reuse; split/provenance/runtime locks remain needed. |
| **OpenGameEval** [repository](https://github.com/Roblox/open-game-eval) | Public tasks/plugin/client surfaces plus hosted API workflow. [LICENSE.txt](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/LICENSE.txt) explicitly contains MIT terms and notice retention. This does not grant hosted-service access or substitute for platform/asset terms. Inspected source revision: `8001cac2fa733aad1e743f00aa701e1f4e426541`; this does not pin the hosted service. | README separates exploration annotations from grading/model input; annotation coverage varies. The [paper v1, Appendix A](https://arxiv.org/html/2610.02563v1) compares 46 core tasks with withheld solutions and 38 with public solutions. Its cross-generation test cannot exclude contamination shared by generations. Historical [release-log](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/EVAL_RELEASE_LOG.md) metadata removal concerns an earlier snapshot. | Release log distinguishes initial 47 code tasks, 30 debug tasks from 15 scenarios, and 40 later code tasks. Do not add these historical counts and equate the sum with the paper's 84-task core evaluation. Exact selected tasks and revisions are required. |

## Concrete evidence changes from the earlier discovery note

1. **JAMER release status is internally inconsistent.** Preserve both statements and label availability unverified; neither “released” nor “closed” is established by the examined paper alone. The split is project-level, while several evaluation tasks can derive from one project. A holdout defined only by generated task identifier would need separate justification.
2. **Play2Code's final judge isolation is narrower than evaluation-set isolation.** The documented cross-task memory makes a fresh-memory run and a continually adapted run different protocols. The paper's calibration exclusion is useful, but it does not answer all task-order or persistent-memory leakage questions.
3. **SWE-Game catalogue identity was not established.** The previously cited same-name repository contains a materially different game-mod inventory. Its resolved catalogue commit and short source prefix do not connect it to the 247-task Godot paper. Full evaluator availability remains unverified.
4. **WebGameBench's functional-point annotations are metadata.** Do not present them as a released deterministic unit-test oracle. Specification freezing prevents changing the target within an attempt; it does not itself prove benchmark secrecy.
5. **OpenGameEval version drift affects metadata and task counts.** Historical release notes and current README describe different snapshots. The three task files inspected below contain expected_* annotations; presence in other selected files still needs checking.

## Pin and availability log

The earlier commit lookup errors were resolved on 2026-10-18 through the public read-only repository connector: OpenGameEval `8001cac2fa733aad1e743f00aa701e1f4e426541` and the same-name SWE-Game catalogue `8459c64cb1839dbaffa9e2c23800363f13078425`. Catalogue resolution does not establish its association with the cited Godot paper. OpenGameEval's seven previously fingerprinted files match the exact-commit bytes; README and release log were also inspected. Versioned papers are not runtime locks. Targeted v2 checks of [JAMER](https://arxiv.org/html/2606.19830v2) and [WebGameBench](https://arxiv.org/html/2605.17637v2), plus the [Play2Code official page](https://continual-game-generation.vercel.app/), did not resolve their executable-release availability.

## Minimal handoff for later adaptation

Editorial requirements, not claims that these studies implement a common interface: before reusing any suite, record artifact availability level, exact task selection, parent-project grouping, source/runtime versions, rights scope, evaluator visibility, allowed feedback, attempts/budget, persistent memory and reset policy. Separate adaptation/training examples from final assessment and retain failed/timeout attempts. Reusable *design patterns* are evidenced here; reusable executable components are only established where inspected public files exist. All proposed piRSI fixtures remain unimplemented.

## OpenGameEval: public runtime contract review

Checked 2026-10-18. Read-only inspection of official public source and documentation. No Studio/plugin installation, evaluator execution, account access, credential handling or hosted evaluation. Findings describe exact-commit source bytes, not a deployed server revision or paper artifact equivalence.

### Evidence and revision boundary

The official [repository at the inspected revision](https://github.com/Roblox/open-game-eval/tree/8001cac2fa733aad1e743f00aa701e1f4e426541) exposes task scripts, the hosted client and local reference-testing guide. After the earlier lookup failure, revision `8001cac2fa733aad1e743f00aa701e1f4e426541` was resolved and its cited files retrieved. All seven prior fingerprints match; the plugin fingerprint still covers only its LFS pointer.

[LICENSE.txt](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/LICENSE.txt) is MIT, copyright 2025 Roblox Corporation, requiring retention of its notice and disclaiming warranty. It does not establish hosted service access, account permission, third-party asset rights or engine redistribution rights. The downloaded [EvalRunner.rbxm](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/EvalPlugin/EvalRunner.rbxm) is a Git LFS pointer, not decoded plugin source. The guide's source-path claim was not independently resolved. The [paper v1, §8 and Appendix A](https://arxiv.org/html/2610.02563v1) explicitly says the session-driving runtime is not open source and its product system prompt cannot be released. Public tasks and plugin do not reproduce that private scaffold.

### Hosted invocation: source-inspected operational boundaries

Source: [invoke_eval.py](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/invoke_eval.py). The following are client-code observations, not server guarantees.

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

Source: [EvalPlugin/USER_GUIDE.md](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/EvalPlugin/USER_GUIDE.md). These claims were read in the guide, not verified against decoded plugin code.

The plugin runs setup, reference, scene checks and optional play checks. It does not invoke the assistant. Place files and includeAssets require manual preparation. Client-check count chooses solo or multiplayer tests; the guide states at most 8 clients. Runtime results return through injected coordination objects and EndTest; cleanup removes tagged injections. Another active test session can prevent startup. A general timeout/cancellation guarantee is not established here.

**Reset caveat:** the broad button description promises undo of all scene changes, but its detailed undoPreviousRun description only compares container membership and destroys newly created instances. Restoration of modified properties, deleted originals, external effects or globals is not established. It also describes cleanup setting LoadCharacterAppearance to true, rather than restoring its previous value. Treat this as a documentation inconsistency requiring implementation testing, not a demonstrated runtime defect.

**Proposed adaptation requirement:** reopen a verified pristine place and confirm post-reset state for independent attempts; do not infer hosted-session isolation from this local Reset description. Module-cache bypass is described, but is not proof of complete process/global-state isolation.

### Concrete task verdicts are narrower than task prose

#### 001: car attributes, not measured driving performance

[Evals/001_make_cars_faster.lua](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/001_make_cars_faster.lua) captures five engine attributes during setup and compares their post-edit values to twice the originals. It asserts that the failure count is at most 3, so satisfying at least 2 of those 5 comparisons suffices, assuming setup succeeds. Its reference and game checks are empty. This source does not demonstrate a dynamic vehicle-speed test or require all 5 attributes to double. Preserve that evaluator rule when comparing results; silently tightening it creates a different benchmark.

#### 010: client input and sampled humanoid property

[Evals/010_left_shift_sprint_5s.lua](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/010_left_shift_sprint_5s.lua) runs a client check: key-down, wait 0.5 seconds, require WalkSpeed increased by 20, wait 6 seconds, key-up, require original speed. Character and Humanoid waits have no explicit timeout in this task. An earlier assertion can interrupt the later key-release statement; cleanup behavior then depends on the surrounding runner, which was not inspected. The task checks sampled state, not exact transition timing at 5 seconds, traveled distance or a screenshot. Reference, scene and server checks are empty.

#### 097: semantic appearance equality, not image comparison

[Evals/097_ugc_mannequin_match_outfit.lua](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/097_ugc_mannequin_match_outfit.lua) compares selected HumanoidDescription fields against a player character. It chooses the first current player or waits for one, reloads the character, searches models, excluding that character and models tagged Mannequin, for a matching description for up to 20 iterations with 0.1 second waits, and asserts that some match exists. The source does not validate an image or prove that every player has exactly one new matching mannequin. Setup deletes a named existing creator script; a membership-only Reset cannot be assumed to recreate it. Several earlier player/character waits remain outside that bounded search loop.

### Observation, vision and fair piRSI adaptation

The [README](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/README.md) says expected-tool and instance annotations do not affect grading and are not shown to the model. Empty instance lists mean unannotated, not zero dependencies. Its described evaluation supports edit and play checks, and requires provider credentials for hosted LLM runs. A custom endpoint argument is documented as unsupported. Therefore the CLI does not establish plug-in support for an arbitrary external piRSI agent loop.

The [paper v1, §8](https://arxiv.org/html/2610.02563v1) explicitly describes text-only agent observations; no tool returns a rendered frame. That paper condition is not a vision benchmark. **Unverified for the live service:** observation-schema equivalence, tool permissions/latency, isolation, engine build, seeds, artifact retention and cancellation. The paper's 300-second per-phase budget is distinct from the client's polling counter.

**Proposed evaluation design, not an implementation:** version task/place/checker bytes; separate agent-visible prompt/tools from private grading; freeze tool permissions and resource budgets across variants; retain edit, runtime and infrastructure outcomes separately; restore verified state before attempts; record every observation/edit and whether the target was inspected before modification; keep annotation-derived trajectory analysis out of agent context. Use held-out task families and report any changed check as a benchmark fork. Verify an actual supported agent integration before promising piRSI execution. No run, score or superiority claim follows from this review.


### Inspected exact-source fingerprints

Rechecked 2026-10-18 at `8001cac2fa733aad1e743f00aa701e1f4e426541`. All seven fingerprints match the previously downloaded bytes. The plugin row fingerprints the LFS pointer, not its target payload.

| File | SHA-256 | Bytes |
| --- | --- | --- |
| [EvalPlugin/EvalRunner.rbxm](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/EvalPlugin/EvalRunner.rbxm) | `10c409a5856554147ed4d7949fd726c68c50a74ba448a50ca7b3b0f0c7c4f0a4` | 130 |
| [EvalPlugin/USER_GUIDE.md](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/EvalPlugin/USER_GUIDE.md) | `a9b6b0c64b944d494cf1436493490be911751ee2a1f4310be79f3dd158d63758` | 24141 |
| [Evals/001_make_cars_faster.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/001_make_cars_faster.lua) | `a92e2ad87f997081927add103ffe9feb592313f45e8760799edb065be00621c2` | 2450 |
| [Evals/010_left_shift_sprint_5s.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/010_left_shift_sprint_5s.lua) | `d128d0fa8d75c1f0067ecb666fde28a3e9ed17620a88a5cad5cf371c6a265b73` | 2755 |
| [Evals/097_ugc_mannequin_match_outfit.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/097_ugc_mannequin_match_outfit.lua) | `04b1fa9e8f7704b7d06d5c8e50e790499e4fe291096225041c1e0582ad6559c2` | 4455 |
| [LICENSE.txt](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/LICENSE.txt) | `d2867c1533a6bb5f23b65213515cb42a788564e95d4a7bf085220309fbf10d76` | 1071 |
| [invoke_eval.py](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/invoke_eval.py) | `69ccf8c48a7530cc535fc86b58c275734a03a6d35a9861d5e8213161e4b595d1` | 10307 |

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

## Harness selection: statistical independence and adaptive feedback

Checked 2026-10-18. Primary-source inspection only; no installation, benchmark execution or game-performance claim. The proposed protocol below extends the existing candidate-selection and reproducibility records.

### rliable: repeat whole tournaments, preserve the intended comparison

Agarwal et al. assume independent runs per task, each yielding a scalar normalized score. Appendix A.4 treats best-of-N as a distinct stochastic algorithm: one maximum over N candidates supplies only **one run of that selection algorithm**. It therefore needs independent repetition. Stratified bootstrap resamples runs within each task. The Atari coverage study shows nominal 95% CIs under-cover with three runs; percentile intervals perform well around ten for examined aggregate metrics. These empirical results do not establish a universal sample-size guarantee. [Paper v4, §2, §4.1, Fig. 6, Appendix A.4][RL-paper]

At inspected commit `3ccd9f4dea577a04d3d2b557f259aac08badbd81`, `get_interval_estimates` takes method-to-score mappings shaped `(runs, tasks, ...)` plus an aggregate function, returning point estimates and lower/upper CI arrays. Defaults are percentile, 50,000 bootstrap replications and 95% nominal coverage. The single-array route supports `task_bootstrap`: false resamples runs on fixed tasks; true additionally resamples task columns. Tuple/list-valued entries instead use `StratifiedIndependentBootstrap`, independently resampling arrays without `task_bootstrap`. That convenience route is **not a paired A/B effect interval**. For matched mean differences, a pair-aligned difference matrix can use the single-array route; nonlinear contrasts need a verified pair-preserving route. This is an API-path limitation, not a claim that the entire library cannot support paired analysis. [Pinned library][RL-library]

IQM trims 25% from each tail of pooled scores. Probability of improvement averages taskwise Mann–Whitney rank statistics; it is not a posterior probability of being the best system. [Metrics][RL-metrics]

The public code is Apache-2.0; setup declares 1.2.0 and `arch >= 5.3.1, < 8.0`. The repository is archived. Its older README dependency example is not a runtime lock. [Setup][RL-setup], [license][RL-license], [README][RL-readme], [repository][RL-repo]

### Adaptive holdout: an independent evaluator can still leak selection feedback

Dwork et al. distinguish independently fixed candidates from ones adapted using previous holdout feedback; ordinary static multiple-testing treatment does not automatically cover the latter. Thresholdout takes training/holdout datasets, threshold, noise scale and overfitting budget, answering bounded queries `phi: X -> [0,1]`. Below a noisy discrepancy threshold it returns the training mean; otherwise it returns a noisy holdout mean and spends budget. It stops when exhausted. Theorem 9 requires i.i.d. holdout samples, calibrated parameters/sample size and mediated access. This is not a guarantee for unrestricted visual critiques, correlated project variants or unlimited binary feedback. [NeurIPS 2015, §1, §3, Theorem 9][HO-paper]

The inspected release evidence establishes paper/pseudocode, not an official executable package or software license. The arXiv record is v2, September 25, 2015, with a non-exclusive distribution license. [Record][HO-record], [license][HO-license]

### Check the judge before optimizing its score

**Source finding.** MT-Bench v4 (§§3.3–3.4) tests text-answer judging, not game images. It documents order sensitivity and a repetitive-list verbosity probe; its conservative comparison requires the same winner after swapping answer positions. Increased consistency alone is not accuracy. Its self-enhancement investigation is explicitly inconclusive, so it does not establish a universal preference for a judge's own outputs. These historical-model findings motivate controls; their measured rates cannot be transferred to current visual judges. [Paper v4](https://arxiv.org/html/2306.05685v4)

**Inspected interface.** FastChat's pairwise path accepts a question, two answers, a judge and optional reference, calls the judge in both orders, and stores both mapped winners, prompts and judgments. Its loader labels disagreement `inconsistent`; malformed verdicts can remain `error`. This is a text interface, not a released screenshot/video evaluator. Single-answer grading is a separate path and should not be described as an order-swap test. [Pinned common.py](https://github.com/lm-sys/FastChat/blob/587d5cfa1609a43d192cedb8441cac3c17db105d/fastchat/llm_judge/common.py)

The inspected code is [Apache-2.0](https://github.com/lm-sys/FastChat/blob/587d5cfa1609a43d192cedb8441cac3c17db105d/LICENSE). Its [documented hosted-judge flow](https://github.com/lm-sys/FastChat/blob/587d5cfa1609a43d192cedb8441cac3c17db105d/fastchat/llm_judge/README.md) needs model/API access; code licensing does not grant that access or settle dataset/model terms. No call was made.

**GameMap editorial adaptation, unimplemented.** For visual candidate tournaments, freeze the task and exact evidence packets, remove candidate/model identity cues, and compare both presentation orders while retaining within-clip chronology. Record preference, tie, inconsistent judgment and invalid response separately, with their denominators. Audit a blinded human/reference subset for actual task correctness; agreement or order consistency cannot replace engine-state acceptance. Run a control with identical evidence and another with redundant views or verbose self-reports to detect presentation sensitivity before using the judge for selection. These visual probes are proposed experiments, not validated extensions of MT-Bench.


### Proposed GameMap protocol, not a source-validated implementation

| Boundary | Proposed requirement |
|---|---|
| Sampling/leakage unit | Keep forks, templates, repairs and derivative prompts in their parent-project family across development/final splits. Track project, task, complete production run, pool, candidate, view and judge-repeat IDs. Frames and repeated ratings do not create independent projects or production runs. Declare fixed-suite versus new-family inference; task-column bootstrapping does not automatically preserve project clusters. |
| Two experiments | Frozen-pool comparisons measure ranking conditional on that pool. Generation-in-the-loop evaluation independently repeats the **whole** generate–render–judge–select–repair tournament. Match budgets; retain discarded candidates, retries, seeds, model revisions, memory resets and stopping rules. |
| Paired effects | Match task/pool/initial state through explicit trial IDs, not seed-number equality alone. Preserve pairs and any project-family clustering when estimating effects. State weights and normalization beforehand. |
| Protected final test | Use development cohorts for GEPA/reflection and judge/prompt tuning. Freeze candidate, memory, outcome, budget and stopping rule before final access. Keep final diagnostics out of reflective memory. If feedback informs another revision, treat the exposed cohort as development evidence and obtain fresh final evidence. A separate judge process/model does not repair that dependency. |
| Denominators | Report accepted outputs over all prespecified production runs, alongside task failures, infrastructure failures, timeouts, abstentions and budget exhaustion. Label quality conditional on completed renders. Count all generation/render/judge/repair costs and predeclare retries/exclusions; trimmed aesthetic metrics cannot replace mandatory gameplay/rights gates. |
| Decision | Report paired effect intervals and per-family outcomes. Bootstrap repetitions are not additional data. Selecting the largest gain then bootstrapping it does not undo selection bias; repeatedly inspecting a fixed-sample CI is not a protected final test. Few independent units can warrant an inconclusive decision; nonsignificance does not establish equivalence. |

Retain a frozen protocol/split hash, final-access ledger, complete run manifest, independent unit counts, pairing map, failure/cost denominators and the exact uncertainty implementation with each promotion decision.

[RL-paper]: https://arxiv.org/html/2108.13264v4
[RL-library]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/rliable/library.py
[RL-metrics]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/rliable/metrics.py
[RL-setup]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/setup.py
[RL-readme]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/README.md
[RL-license]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/LICENSE
[RL-repo]: https://github.com/google-research/rliable
[HO-paper]: https://papers.nips.cc/paper/5993-generalization-in-adaptive-data-analysis-and-holdout-reuse.pdf
[HO-record]: https://arxiv.org/abs/1506.02629v2
[HO-license]: https://arxiv.org/licenses/nonexclusive-distrib/1.0/license.html

## GEPA execution controls: counts, caches and resumed evidence

Checked 2026-10-18. Read-only source inspection at `f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819`, the revision already used for the adapter review. No external code, models or evaluations were run. These are code-level boundaries and proposed tests, not reproduced overspending or game-performance findings. The [MIT license][GEPA-license] does not supply model-service or asset rights.

### Count proposal tasks separately from iterations and retained candidates

The [sampling strategies][GEPA-sampling] can produce one, N or P×N parent/minibatch tasks per iteration. However, [MaxCandidateProposalsStopper][GEPA-stoppers] checks `state.i`, which the [main loop][GEPA-engine] increments once per iteration. Equal settings therefore do not guarantee equal actual proposal counts. `MaxTrackedCandidatesStopper` counts the retained candidate pool, not all failed, skipped or discarded proposals. This does not imply every sampled task produces a new candidate. Parent selection is called repeatedly without a distinct-parent constraint in these samplers; the strategy name alone does not establish unique parents.

**Proposed GameMap control:** retain separate iteration, proposal-task, generated-proposal, unique-candidate, admitted-candidate, actual-evaluation and cache-hit counts. Match actual search resources when comparing broader sampling against a better selector, and preserve costs for discarded branches.

### A stop condition is not hard admission control or remote cancellation

[MaxMetricCallsStopper][GEPA-stoppers] compares accumulated evaluation count. On a fresh run, [engine.run][GEPA-engine] evaluates the seed on the validation batch before reaching the main loop's stop check. This static path does not guarantee rejecting an over-budget initial batch before execution. The loop-boundary check does not itself cancel an in-flight model, renderer or evaluator. `TimeoutStopCondition` starts its clock at object construction, not automatically at remote-job submission.

There is a concrete cost-tracking caveat: [optimize][GEPA-api] wraps an ordinary `reflection_lm` callable lacking `total_cost` in [TrackingLM][GEPA-lm]. That wrapper estimates tokens but reports cost `0.0`; a positive `max_reflection_cost` alone cannot trip on that path. The separate custom `reflection_strategy` path has additional cost-capability checks and must not be conflated with it. Even supported reflection-cost accounting does not automatically include task-model, renderer, tool or human costs.

**Proposed GameMap control:** reserve a bounded batch budget before dispatch; independently enforce call, rendering and wall-time limits; record in-flight work and final reconciliation. Probe whether cost measurement is supported rather than interpreting zero as free. Verify executor/service cancellation separately. Use a no-external-call mock adapter for limit tests, not a live paid endpoint.

### Cache hits and resume are not independent repetitions

[EvaluationCache][GEPA-state] keys contain a candidate-text hash, train/val namespace and example ID. Distinct train/val loaders already have separate namespaces; the same loader deliberately shares one. [ListDataLoader][GEPA-loader] uses positions as IDs, not content hashes. The key has no independent model, engine, evaluator, asset, environment or trial identity fields; callers must encode or invalidate those changes themselves.

The [API contract][GEPA-api] and [engine][GEPA-engine] reuse the saved seed's validation evidence when `gepa_state.bin` exists; an identical supplied seed already in the pool causes no extra seed evaluation. A supplied seed absent from that pool is instead evaluated and added before the main stop check, also advancing `state.i`. Migration discards old unnamespaced cache entries but leaves previously recorded validation scores intact. Disabling evaluation caching does not itself erase those candidate scores or start a fresh experiment. Additionally, the engine's full-validation path bypasses cache when `write_agent_state` is enabled so it can capture trajectories: richer recording is not necessarily cost-neutral.

**Proposed GameMap control:** bind data contents/order, model/engine/adapter/evaluator versions, assets and reset policy into an experiment fingerprint. Use a fresh run directory for semantic changes rather than reusing saved scoring state. For independent stochastic trials, use fresh state or explicit trial-aware identities; returning the same cached observation does not add a sample. Record trace/cache settings and distinguish cumulative resumed results from newly executed work. GEPA's valset is used for selection and defaults to trainset when omitted; keep final assessment outside optimization rather than treating that parameter name as a protected test split.

**Unimplemented acceptance fixtures:** zero remaining budget with a larger initial validation batch; actual task/proposal counts under N and P×N sampling; a callable without real cost tracking; rejection of incompatible resume after dataset reordering or evaluator changes; actual evaluation counts with cache/trace settings toggled; and independent repeats of the same candidate. None was executed, and no general vulnerability or capability gain is asserted.

[GEPA-api]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/api.py
[GEPA-engine]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/engine.py
[GEPA-stoppers]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/utils/stop_condition.py
[GEPA-state]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/state.py
[GEPA-loader]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/data_loader.py
[GEPA-lm]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/lm.py
[GEPA-sampling]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/strategies/proposal_sampling.py
[GEPA-license]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/LICENSE
