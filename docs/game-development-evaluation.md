# Additional evaluation research for agents that create games

Source review: 2026-10-18. This bounded discovery found meaningful additions after checking the current catalog and documentation. GameDevBench, GameCraft-Bench, GameEngineBench, GameXpert-Bench, OpenGame, GameGen-Verifier, GCA, DreamGarden, Holodeck, GEPA/Meta-Harness and pi are already represented and should not get duplicate cards. The following studies evaluate construction, modification, delivery or refinement. A playing agent is relevant here only when its observations evaluate or improve an agent-built artifact.

No code was installed, no game or benchmark was run, no account was created and no provider API was invoked. Paper-described results remain author reports. These are protocol additions, not a combined leaderboard. Paper versions and source revisions are scoped individually below and in the [reproduction review](benchmark-reproducibility.md); websites remain mutable, and no installed version was tested.

## 1. OpenGameEval: stateful development and exploration

Primary sources: [Roblox repository](https://github.com/Roblox/open-game-eval), [paper](https://arxiv.org/abs/2610.02563).

- **Tasks and evaluation:** The [paper v1](https://arxiv.org/html/2610.02563v1) scores 113 tasks: 84 core and 29 debugging, analyzed separately after four exclusions. Thirteen models receive 16 attempts per task. Public reference solutions cover 67 of the 113. Every check phase must pass; the 84-task core denominator retains ten tasks with no between-model discrimination.
- **Available artifacts:** Task Lua files, places, plugin and submission client are public under MIT. Hosted runs require a Roblox account/OpenCloud key and caller-provided LLM credentials. The [reproduction review](benchmark-reproducibility.md#evidence-and-revision-boundary) records the paper's explicit private-runtime and unreleased-system-prompt blockers; the local plugin does not invoke an assistant.
- **Concrete annotation caveat:** Empty expected-instance fields mean unannotated dependencies, not zero dependencies. They should not become zeroes in an exploration score.
- **Lifecycle boundary:** The README lists queued/pending/completed/failed service states and a ten-minute default timeout. A subsequent [client-code inspection](benchmark-reproducibility.md) found a 900-second polling budget that excludes request durations, so the README figure is not a verified wall-clock limit. Neither timeout nor job completion alone establishes cancellation or a passing task verdict. Custom model endpoint URLs are described as unsupported.

**Editorial use:** This is a stronger source for “inspect before editing” measurement than anecdotal development transcripts. Retain task/check revision, attempts, observation trace, final check results and service errors separately. A correlation between inspection and success is not a causal guarantee. Before execution, review credential transmission and service permissions rather than assuming repository access grants them.

## 2. SWE-Game: restoration and preservation across construction, repair and porting

Primary source: [paper v3, October 7, 2026](https://arxiv.org/html/2609.33678v3).

- **Tasks:** 247 tasks derive from 41 reference Godot games across 13 categories. Modes include briefs, game-design documents, skeleton completion, 83 injected-fault repair cases and Godot-to-Unity porting.
- **Evaluation:** Semantic instrumentation connects independently structured implementations to evaluator-owned actions and engine-state observations. Certified reference-input replay and agent-authored demonstrations complement local checks. Matched no-input controls test action dependence. Repair checks compare reference, faulty and repaired projects for both restoration and preservation; construction also has separate visual rubrics.
- **Limits:** Instrumentation and demonstrations are part of the evaluation contract, not a universal correctness oracle. Reported human-alignment studies validate specified samples, not every possible behavior or future engine version.

**Version review:** The task counts, instrumentation, replay/no-input controls and restoration/preservation distinctions above were rechecked against v3; they remain supported. This is a targeted protocol comparison, not a claim that every section is unchanged.

**Artifact availability and identity:** The previously linked Touchstone-AI-Lab catalogue does not establish this paper's release. Its [pinned task JSON](https://github.com/Touchstone-AI-Lab/swe-game-tasks/blob/8459c64cb1839dbaffa9e2c23800363f13078425/tasks.json) contains 156 mod-repair/construction entries across 12 games, including Don't Starve Together, Garry's Mod and The Binding of Isaac; its [site description](https://github.com/Touchstone-AI-Lab/swe-game-tasks/blob/8459c64cb1839dbaffa9e2c23800363f13078425/index.html) explicitly says game-mod tasks. That inventory does not match the paper's 247 tasks, 41 Godot games and five modes. No author-provided linkage was verified. Treat the catalogue as a same-name identity collision until established otherwise; the paper's executable release and software/data rights remain unverified.

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
- **Dimensions and denominator:** The evaluator checks input, spatial mapping, rules, state transitions, terminal conditions and restart. Excellent/Usable rates use only valid scored attempts; Usable includes Excellent. Coverage is the fraction of attempts receiving a valid label. Artifact-caused build/serve/access failures count as Unusable; evaluator/infrastructure failures, corrupted evidence and unresolved evaluator timeouts may be unscored. Report coverage alongside quality rates. This policy is also explicit in [v2, §4.1](https://arxiv.org/html/2605.17637v2).
- **Limits:** The paper explicitly says human alignment is stronger for usable-rate estimation than exact three-way quality labeling. Template-generated specifications and runtime preconditions do not exhaust randomized, long-horizon or multi-session behavior. It is evidence about browser-accessible artifact delivery, not arbitrary software competence.
- **Availability:** The examined primary paper provides a protocol; no working official evaluator/data repository or reusable code/data license was verified. Do not advertise a ready-to-run package solely from the paper.

**Editorial use:** Preserve build health, load health, playable delivery and requirement satisfaction as distinct fields. An acceptable failure report should show the interaction and observation that failed, rather than translating “page loaded” into “game works.” This is complementary to the existing engine-native benchmark notes.

## 5. JAMER / JamSet / JamBench: project structure and runtime behavior

Primary source: [paper v1, June 18, 2026](https://arxiv.org/html/2606.19830v1).

- **Tasks and data:** The paper describes 8,133 verified 2D Godot projects, with 300 manually verified benchmark projects and the remainder forming JamSet. Tasks cover theme-driven generation and completion at different code granularities.
- **Evaluation:** Headless checks separate file integrity, compilation, runtime stability, Structural Completeness Score and Behavioral Alignment Score. No online LLM verdict is used, but offline LLM-generated eval_config selects player nodes, tracked signals and expected behaviors used to derive input strategies. Thus verification depends on model-produced configuration; it is not annotation-independent. This distinction persists in [v2, §§3.3/4.4 and Appendix D.1](https://arxiv.org/html/2606.19830v2).
- **Scope limits:** It evaluates code frameworks, not complete art/audio quality, and does not cover Unity/Unreal. Cross-file dependencies can fail behaviorally despite a structurally complete result.
- **Availability and rights:** The abstract claims all data/code are public, but the Ethics/Open-Source Commitment section says they will be released. It says only open-source-licensed source projects were included. A working official release URL and consolidated downstream license inventory were not verified from the examined source. Preserve “paper claims public availability” separately from “artifact retrieved and verified”; source-project licenses cannot be replaced by a blanket dataset assumption.

**Editorial use:** This fills a project-scale engineering gap without relabeling code completeness as polished game quality. A future experiment should record project scale, removed code granularity, imported asset treatment, headless settings and behavioral coverage alongside compilation.

## Adjacent dataset worth retaining, not an agent leaderboard

[OSSGameBench's author-hosted MSR paper](https://nimmiw.com/papers/MSR_2026_data_and_tool_track.pdf) explicitly links [Zenodo record 18359123, version v3](https://zenodo.org/records/18359123). Its publication date is **January 23, 2026**; January 24 is the record's technical created/modified date. The paper reports 950 game/tool repositories after deduplicating 970 candidates. These are development-history records, not 950 executable repair tasks.

### Exact release and inspected artifacts

| Surface | Source-backed finding | Boundary |
| --- | --- | --- |
| v3 inventory | Four files: analysis.zip, Scripts.zip, README.md and online-appendix.pdf, totaling about 1 MB | The inspected archive inventories contain collection/analysis code and supporting material. Full per-repository mined data retrieval was not established. A separate historical [v2 record](https://zenodo.org/records/17553539) lists a 65.8 GB OSSGameBench.zip; it was not downloaded or inspected. |
| Record rights | Zenodo metadata declares CC-BY-4.0 | This record-level license does not independently inventory or clear every upstream repository, asset, issue or discussion. |
| Collection scripts | The README describes retrieval/linking/cleanup. filter_script.py itself filters totalIssues > 10; do not infer that this file also performs every topic-selection step described in the paper | Prior inputs and pipeline order matter. No collector was run. |
| Link cleanup | pr_cross_repo_fix.py rebuilds issue/PR links from formal same-repository closing references | Earlier regex-only links can be removed on that path. This static observation does not measure errors or omissions in a released dataset. |
| Pagination | Ordinary issue/PR requests paginate, but inspected nested label/review-thread/review-comment requests use first-10 / first-20 / first-20 limits; PR-commit retrieval does not follow Link pagination | Those source paths require completeness checks before being used to establish complete repair histories. |

The inspected [Scripts.zip](https://zenodo.org/records/18359123/files/Scripts.zip?download=1) matches the record's MD5 `b416d06113d02a7abdccb636508c0c9d`; [analysis.zip](https://zenodo.org/records/18359123/files/analysis.zip?download=1) matches `8c6155a7603b391ded1991caf69ed6b6`. Relevant members are get_issues_pr_data.py, get_pr_commit_links.py, get_remaining_comments.py and pr_cross_repo_fix.py. These checksums identify inspected bytes; they do not validate execution, data completeness or rights. The [appendix](https://zenodo.org/records/18359123/files/online-appendix.pdf?download=1) describes a richer storage schema than the paper's simplified entity diagram. No supplied executable game-repair evaluator, project-held-out split or contamination-control protocol was established in the inspected materials.

**GameMap editorial adaptation:** Before deriving agent tasks, obtain and validate exact data versions, record upstream rights and verify issue/PR/commit linkage. Separate repository families and time periods; withhold target fixes and post-resolution discussion from agent context. Add a reproducible failing fixture, repair acceptance checks and regression tests. None of those proposed gates was implemented or evaluated here.

See the [reproducibility matrix and concrete client/checker review](benchmark-reproducibility.md) for subsequent availability, memory-isolation and task-verdict findings.

## Recommended integration and next acceptance gap

Integrate these as a focused evaluation-methods note before adding broad catalog entries. OpenGameEval has the clearest inspected code/task surface; the others warrant explicit paper/protocol or partial-artifact labels until runnable releases are confirmed. Five useful distinctions emerge:

1. Engine-state checks and visual judgment answer different questions.
2. Repair requires both fixing the intended defect and preserving existing behavior.
3. Agent play traces can guide development while a separate evaluator owns final scoring.
4. Build/load success is a prerequisite, not evidence of complete requirements.
5. Public paper, public task catalogue, public code and reproducible full benchmark are different availability states.

These are editorial synthesis, not new benchmark findings. No cross-study numerical ranking is justified: task families, engine versions, action spaces, attempt budgets, memory, model/judge choices, human calibration and release completeness differ. A proposed comparison manifest should include all of those fields plus failures/timeouts, artifacts and rights scope. No such manifest-driven experiment or fixture is implemented here.
