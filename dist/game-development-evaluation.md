# Additional evaluation research for agents that create games

Source review: 2026-10-18. This bounded discovery found meaningful additions after checking the current catalog and documentation. GameDevBench, GameCraft-Bench, GameEngineBench, GameXpert-Bench, OpenGame, GameGen-Verifier, GCA, DreamGarden, Holodeck, GEPA/Meta-Harness and pi are already represented and should not get duplicate cards. The following studies evaluate construction, modification, delivery or refinement. A playing agent is relevant here only when its observations evaluate or improve an agent-built artifact.

No code was installed, no game or benchmark was run, no account was created and no provider API was invoked. Paper-described results remain author reports. These are protocol additions, not a combined leaderboard. Repository branches and websites below are mutable unless a versioned paper URL is supplied; no commit or installed version was resolved.

## 1. OpenGameEval: stateful development and exploration

Primary sources: [Roblox repository](https://github.com/Roblox/open-game-eval), [paper](https://arxiv.org/abs/2610.02563).

- **Tasks and evaluation:** The repository describes 84 core tasks, 13 models and 16 attempts per task in the paper. Executable checks cover both an edited Roblox scene and a simulated play session. Passing requires all checks. Observation and editing actions are separated so exploration can be analyzed alongside outcomes.
- **Available artifacts:** Task Lua files, places, an evaluation plugin and a Python submission script are visible; the repository displays MIT licensing. The documented workflow uses Roblox's hosted evaluation API, a Roblox account/OpenCloud key and the caller's LLM credentials. Public scripts do not establish a fully local, service-independent reproduction.
- **Concrete annotation caveat:** Empty expected-instance fields mean unannotated dependencies, not zero dependencies. They should not become zeroes in an exploration score.
- **Lifecycle boundary:** The README lists queued/pending/completed/failed service states and a ten-minute default timeout. A subsequent [client-code inspection](benchmark-reproducibility.md) found a 900-second polling budget that excludes request durations, so the README figure is not a verified wall-clock limit. Neither timeout nor job completion alone establishes cancellation or a passing task verdict. Custom model endpoint URLs are described as unsupported.

**Editorial use:** This is a stronger source for “inspect before editing” measurement than anecdotal development transcripts. Retain task/check revision, attempts, observation trace, final check results and service errors separately. A correlation between inspection and success is not a causal guarantee. Before execution, review credential transmission and service permissions rather than assuming repository access grants them.

## 2. SWE-Game: restoration and preservation across construction, repair and porting

Primary source: [paper v3, October 7, 2026](https://arxiv.org/html/2609.33678v3).

- **Tasks:** 247 tasks derive from 41 reference Godot games across 13 categories. Modes include briefs, game-design documents, skeleton completion, 83 injected-fault repair cases and Godot-to-Unity porting.
- **Evaluation:** Semantic instrumentation connects independently structured implementations to evaluator-owned actions and engine-state observations. Certified reference-input replay and agent-authored demonstrations complement local checks. Matched no-input controls test action dependence. Repair checks compare reference, faulty and repaired projects for both restoration and preservation; construction also has separate visual rubrics.
- **Limits:** Instrumentation and demonstrations are part of the evaluation contract, not a universal correctness oracle. Reported human-alignment studies validate specified samples, not every possible behavior or future engine version.

**Version review:** The task counts, instrumentation, replay/no-input controls and restoration/preservation distinctions above were rechecked against v3; they remain supported. This is a targeted protocol comparison, not a claim that every section is unchanged.

**Artifact availability:** A [public task-catalog repository](https://github.com/Touchstone-AI-Lab/swe-game-tasks) identifies itself as SWE-Game's task catalogue and contains README, HTML and task JSON. It says it was generated from source commit prefix `5167563f83b6`. This proves a public catalogue surface, not availability of the full evaluator, reference projects or that source commit. No complete runnable release or code/data license was verified in this pass. Do not conflate it with the similarly named `swegamebench.com` project.

**Editorial use:** Porting should be scored on preserved behavior under an engine-specific execution contract, not source resemblance. Keep repaired-target checks and previously correct behavior as separate results. Proposed local fixtures would include a fake victory screen with no input, a repair that breaks an unrelated mechanic, and a port with visually correct but ineffective collisions.

## 3. Play2Code / PlaytestArena: separate refinement feedback from final judging

Primary sources: [GUI Agents for Continual Game Generation, v2](https://arxiv.org/html/2605.28258v2), [author project page](https://continual-game-generation.vercel.app/).

- **Tasks and dimensions:** PlaytestArena contains 200 browser-game prompts across eight genres with criterion-level expected behavior. The paper separates a coding/refinement loop from benchmark judgment.
- **Evaluation boundary:** The Play2Code GUI playtester sees the game and returns traces/actionable feedback without the final rubric. A separate GUI judge receives the rubric and determines criterion pass/fail. It neither shares the loop's memory nor provides refinement feedback. This distinction matters more than treating every GUI agent as an interchangeable “tester.”
- **Limits:** Human comparison and cross-judge studies are reported, but timing-sensitive failures may reflect evaluator action latency rather than a broken game. The paper retains this ambiguity.
- **Available artifacts:** The project page exposes eight browser demos and describes episode, skill and world memory. A complete downloadable task corpus and evaluator implementation, their licenses and an immutable code revision were not verified from the examined paper/project page. Demo visibility is not reproducibility.

**Editorial use:** A future fixture should save revision-specific builds, play traces and repair requests, then evaluate the final build with a separate rubric holder. Reusing the same evaluator feedback for optimization and final scoring would change this experimental design. Cross-task memory must also be recorded so an apparent improvement is not attributed only to one local revision.

## 4. WebGameBench: delivery quality rather than build success

Primary source: [paper v1](https://arxiv.org/html/2605.17637v1), [abstract](https://arxiv.org/abs/2605.17637).

- **Tasks:** 111 browser-game tasks use frozen structured specifications, a unified build/serve protocol and runtime interaction; the study reports 12 agents across 14 configurations.
- **Dimensions:** The evaluator inspects input handling, spatial mapping, rules, state transitions, terminal conditions and restart behavior, producing EXCELLENT/USABLE/UNUSABLE labels.
- **Limits:** The paper explicitly says human alignment is stronger for usable-rate estimation than exact three-way quality labeling. Template-generated specifications and runtime preconditions do not exhaust randomized, long-horizon or multi-session behavior. It is evidence about browser-accessible artifact delivery, not arbitrary software competence.
- **Availability:** The examined primary paper provides a protocol; no working official evaluator/data repository or reusable code/data license was verified. Do not advertise a ready-to-run package solely from the paper.

**Editorial use:** Preserve build health, load health, playable delivery and requirement satisfaction as distinct fields. An acceptable failure report should show the interaction and observation that failed, rather than translating “page loaded” into “game works.” This is complementary to the existing engine-native benchmark notes.

## 5. JAMER / JamSet / JamBench: project structure and runtime behavior

Primary source: [paper v1, June 18, 2026](https://arxiv.org/html/2606.19830v1).

- **Tasks and data:** The paper describes 8,133 verified 2D Godot projects, with 300 manually verified benchmark projects and the remainder forming JamSet. Tasks cover theme-driven generation and completion at different code granularities.
- **Evaluation:** A headless verification pipeline distinguishes compilation, Structural Completeness Score and Behavioral Alignment Score. The paper states model-assisted annotations do not participate in verification itself.
- **Scope limits:** It evaluates code frameworks, not complete art/audio quality, and does not cover Unity/Unreal. Cross-file dependencies can fail behaviorally despite a structurally complete result.
- **Availability and rights:** The abstract claims all data/code are public, but the Ethics/Open-Source Commitment section says they will be released. It says only open-source-licensed source projects were included. A working official release URL and consolidated downstream license inventory were not verified from the examined source. Preserve “paper claims public availability” separately from “artifact retrieved and verified”; source-project licenses cannot be replaced by a blanket dataset assumption.

**Editorial use:** This fills a project-scale engineering gap without relabeling code completeness as polished game quality. A future experiment should record project scale, removed code granularity, imported asset treatment, headless settings and behavioral coverage alongside compilation.

## Adjacent dataset worth retaining, not an agent leaderboard

[OSSGameBench's author-hosted MSR paper](https://nimmiw.com/papers/MSR_2026_data_and_tool_track.pdf) and [January 24, 2026 Zenodo record](https://zenodo.org/records/18359123) describe linked issues, commits, pull requests and review discussions from 950 repositories, including games and development tools. Earlier records report 970; the paper explains deduplication reduces this to 950. This could seed defect-localization or repair research, but it does not itself establish executable agent tasks or tests. The current record lists analysis/scripts/README/appendix; full data retrieval and license inventory were not verified. Keep the record version rather than merging counts and files from different releases.

See the [reproducibility matrix and concrete client/checker review](benchmark-reproducibility.md) for subsequent availability, memory-isolation and task-verdict findings.

## Recommended integration and next acceptance gap

Integrate these as a focused evaluation-methods note before adding broad catalog entries. OpenGameEval has the clearest inspected code/task surface; the others warrant explicit paper/protocol or partial-artifact labels until runnable releases are confirmed. Five useful distinctions emerge:

1. Engine-state checks and visual judgment answer different questions.
2. Repair requires both fixing the intended defect and preserving existing behavior.
3. Agent play traces can guide development while a separate evaluator owns final scoring.
4. Build/load success is a prerequisite, not evidence of complete requirements.
5. Public paper, public task catalogue, public code and reproducible full benchmark are different availability states.

These are editorial synthesis, not new benchmark findings. No cross-study numerical ranking is justified: task families, engine versions, action spaces, attempt budgets, memory, model/judge choices, human calibration and release completeness differ. A proposed comparison manifest should include all of those fields plus failures/timeouts, artifacts and rights scope. No such manifest-driven experiment or fixture is implemented here.
