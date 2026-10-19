# 2D / 3D Game Development AI: Research Notes

Reviewed on **2026-10-18**. These are representative starting points, not an exhaustive catalog or a ranking of the strongest tools. `verified` means a primary project page or paper was reviewed; it does not mean the project was run or reproduced locally. The 24 entries in `data/segments/game-ai.json` have 12 primary 2D classifications and 12 primary 3D classifications. Two additional MCP bridges appear in the agents segment. Cross-dimensional projects retain their `dimensions` values.

See the [Cadle-like repository import](cadle-repositories.md) for the complete requested 212-candidate corpus plus its reference, including existing coverage, renamed projects, restricted licenses and unavailable sources. These research rows are separate from the resource-card and featured-game counts above.

## Categories and evidence

- **Development agents / frameworks** take requirements or a project and produce code, scenes, rules, or assets. Playable prototypes, local project changes, and complete games are different outcomes.
- **Skills** provide workflows, references, and scripts for general agents. They are not trained models and do not guarantee independent execution.
- **MCP / CLI** connects editors, runtimes, and asset tools to agents, providing execution and feedback interfaces. The existence of a tool does not establish the correctness of its outputs.
- **Development benchmarks** include GameDevBench and GameEngineBench for project modifications. GameXpert-Bench adds creation, repair, and iterative improvement. GameGen-Verifier studies functional verification of generated games.
- **Related evaluations** include CADBench for 3D modeling. Card game self-play can validate rules, but win rate measures gameplay ability and cannot substitute for development quality.
- **World models** that predict action-conditioned video produce a different artifact from explicit engine projects. Kling's GameFactory is separate from OpenDCAI's GameFactory-3A. Video2Game produces explicitly reconstructed environments and belongs to the 3D reconstruction route.
- **Procedural backends** such as Infinigen do not use an LLM to generate geometry. Infinigen is included because it can supply controllable scenes and synthetic data to AI game development workflows.

## Versions and release status

| Resource | Primary evidence | Qualification to preserve |
| --- | --- | --- |
| [GameDevBench](https://github.com/waynchi/gamedevbench) | Current README: Overview and Prerequisites | The repository lists 333 tasks and Godot 4.4.1. The [first arXiv abstract](https://arxiv.org/abs/2602.11103) still lists 132 tasks. Dataset sizes and leaderboards from different versions should not be mixed. |
| [GameEngineBench](https://arxiv.org/html/2607.03525v2) | Paper v2 abstract and evaluation protocol | Nine real UE projects and 110 local C++ tasks. Compilation and Play-in-Editor listen-server tests supply evidence to an LLM judge, whose behavioral-correctness decision defines pass@1. The paper-linked Nitrode-Research repository returned 404 during this review; runnable-code availability remains unverified, and the paper is the primary entry point. |
| [OpenGame](https://github.com/leigest519/OpenGame) | README: Game Skill and OpenGame-Bench | The agent framework is public and its CLI supports configurable OpenAI-compatible endpoints. GameCoder-27B is described in the paper; the framework release alone does not verify model-weight availability. The standalone evaluation pipeline is still described as forthcoming. |
| [GameXpert-Bench](https://github.com/Kwen-Chen/GameXpert-Bench) | README: Repository status | At review, the repository was a project-page scaffold, with data, code, and models being prepared for release. The paper protocol can be cited; a downloaded, runnable benchmark cannot be assumed. |
| [GameGPT](https://arxiv.org/abs/2310.08067) | Paper abstract and PDF/README repository | The [repository](https://github.com/leyiwo/GameGPT) displays only a PDF and README. This entry describes the research architecture, without promising a complete implementation. |
| [GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier) | README: Repository Layout and Quickstart | The harness, verifier skills, and scripts are public. Generated games, caches, screenshots, and complete run logs are not all distributed with the code. |
| [Agent Game Forge](https://github.com/0x0funky/agent-game-forge) | README: Project status | JS + Canvas is the current default. Full Godot retargeting and Unity support remain on the roadmap. The project is marked pre-launch. |
| [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge) | README: Engine exports | For 0.4.0, the README reports parse-level round trips but says Godot, LDtk, and Aseprite exports have not been opened in those editors. Tiled re-render checks are a separate claim. |

## 2D: Contributions at different stages

- [MarioGPT](https://github.com/shyamsn97/mario-gpt): language conditions become character-grid levels. `play()` and `run_astar()` launch simulation; the inspected wrapper returns no structured playability verdict. See [requested constraints and evaluator boundaries](#mariogpt-requested-constraints-and-executable-verdicts). The code is marked MIT; a code license does not grant rights to original game assets.
- [GAVEL](https://github.com/gdrtodd/gavel): Ludii rule code passes through language-model mutation and quality-diversity search. The [paper](https://arxiv.org/abs/2407.09388) studies novel board game rules. It fits planning and rule-design stages, without replacing real-time action game playtesting.
- [Cardiverse](https://github.com/danruili/Cardiverse): mechanism graphs, retrieval, and match records connect design to Python prototypes. The repository is marked MIT. Its Replicability Notice states that not all original card descriptions are distributed, and substitute descriptions may change results.
- [Text2Game](https://github.com/boltomli/t2g): long-form text extraction and merged world, character, and event data lead to Twine HTML or Godot visual novels. Its scope is narrative prototyping, not general game generation.
- [PixelLab MCP](https://www.pixellab.ai/mcp): a commercial asset service with documented tools for character directions, animation, and tilesets. API/MCP output, engine collision, animation events, and import configuration are separate tasks.
- [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge): a skill and deterministic asset-processing chain, with code marked MIT. Generation depends on external image or video capabilities. Record the provider route, version, reference image, frame order, anchors, and export checks.

## 3D: Execution interfaces, models, and environment systems

| Resource | Output or use | License or limitation supported by primary material |
| --- | --- | --- |
| [3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A) | Multimodal asset pipelines, skills, and engine-native code adapters | Apache-2.0. External models, engines, and assets retain their own terms. README demos mix generative models, Mixamo, and existing scenes. The 3A name is not a quality rating. |
| [Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) | Unity-maintained agent context for 2D, UI, rendering, physics, and other tasks; Unity 6.0+ | Check the [official source](https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills) and product setup separately. |
| [MCP Unity Editor](https://github.com/CoderGamester/mcp-unity) | Scene, component, Prefab, console, and Test Runner operations | README marked MIT. Community maintained and separate from Unity's official tools. Its FAQ warns Play Mode domain reload can break the bridge connection; verify actual test completion and configuration. |
| [MCP for Blender](https://github.com/ahujasid/blender-mcp) | Blender Python, objects, materials, and multi-angle visual feedback | MIT. The README identifies it as a third-party project. Its package name is now `mcp-for-blender`. |
| [Unreal MCP](https://github.com/chongdashu/unreal-mcp) | Actor, Blueprint graph, and viewport operations | README marked MIT, UE 5.5+, and Experimental. |
| [Godot 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets) | Native geometry and existing resources become PackedScene assets, followed by collision, navigation, and visual checks | MIT. Requires compatible Godot MCP capabilities; this is not a generative model. |
| [Hunyuan3D-2](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) | Image to mesh to texture, with GLB/OBJ and Blender addon support | The repository uses a dedicated license. Open model availability does not imply MIT terms. Versions 2.0, 2.1, and 2.5 are distinct. |
| [TRELLIS](https://github.com/microsoft/TRELLIS) | Image or text to SLAT, then mesh, Gaussian, or radiance field; meshes can export to GLB | Models and most code are MIT. The README notes other licenses for some rendering and geometry submodules. |
| [TripoSR](https://github.com/VAST-AI-Research/TripoSR) | Feed-forward 3D reconstruction from one image | README states MIT for code and pretrained models. Topology, collision, and performance still need checks after export. |
| [Infinigen](https://github.com/princeton-vl/infinigen) | Parameterized procedural rules produce Blender scenes, geometry, materials, and annotations | Repository marked BSD-3-Clause, with some subsequent procedural code derived from CC0 sources. It is not a language model. |
| [Holodeck](https://github.com/allenai/Holodeck) | Text to layout and asset composition in AI2-THOR, with Unity loading supported | Repository marked Apache-2.0. Its main target is embodied AI environment generation. The paper first appeared on arXiv on 2023-12-14, before its CVPR 2024 publication. Track external assets separately. |
| [Video2Game](https://github.com/video2game/video2game) | Real-world video to mesh, appearance, and collision in three.js / UE environments | Repository marked MIT. The README notes that some physics integration is laborious. Reconstructed environments are not complete games. |
| [BlenderLLM](https://github.com/FreedomIntelligence/BlenderLLM) | Instructions to bpy modeling scripts, with BlendNet and CADBench | Scope is limited to basic modeling, with limitations in multi-turn interaction and advanced materials. Check model and dataset cards separately rather than assuming one shared license. |

Unity's interface migration needs a separate distinction. The [official migration guide](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli) deprecates the old MCP server inside `com.unity.ai.assistant`. The CLI's `unity mcp` remains supported, and this deprecation does not affect third-party MCP tools. The website should provide both the current official entry point and a separate community bridge entry.

## MarioGPT requested constraints and executable verdicts

Sources reviewed 2026-10-18; full reproduction not performed. No model, evaluator, JAR or engine was executed, and no weights/game/data assets were downloaded. This extends the existing resource with source-inspected evaluation boundaries rather than an implemented adapter.

### Versions and review boundary

- [MarioGPT source](https://github.com/shyamsn97/mario-gpt/tree/e62bb2b0106a00734e724e272ba94fb179ad959a), main commit `e62bb2b0106a00734e724e272ba94fb179ad959a`, 2023-08-02. [`setup.py`](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/setup.py) identifies package 0.1.3, Pre-Alpha, with unpinned runtime dependencies. This is not an installed-environment lockfile.
- [Paper v3](https://arxiv.org/html/2302.05981v3), 2023-11-08. The reviewed main branch is not established as the exact code/checkpoint that produced its results.
- The [author-linked weights page](https://huggingface.co/shyamsn97/Mario-GPT2-700-context-length) is separate from the source revision. Connected metadata identifies a GPT-2 model; exact checkpoint bytes and model-specific licensing were not independently established in this review.

### Author results: separate metric populations

Paper v3 trains on 37 path-annotated levels. Playability uses 250 generated levels, each tested five times with Baumgarten's A* controller because performance depends on compute. It reports 88.4% completed levels; only one successful level needed a retry. This is not a per-attempt success rate or human difficulty assessment.

Path MAE averages five runs, comparing vertical coordinates only at horizontal positions visited by both trajectories: 1.15 tiles for playable levels, 4.56 for failures, 1.56 overall. Predicted paths can imply excessive airtime or leave the level while the controller is trapped near spawn. A low overlap-conditioned error does not certify the unvisited remainder.

Prompt adherence is a separate 1,000-sample test: pipes 81%, enemies 68%, blocks 92%, elevation 76%. These are per-feature scores, not joint constraint-and-playability success. Novelty search uses smoothed predicted paths, not observed controller traces; 78% coordinate coverage after 300 archive additions is a diversity measurement. Neither that visualization nor archive coverage proves controller solvability, visual originality or broad human preference. [Paper §§3–4](https://arxiv.org/html/2302.05981v3)

### Source-inspected contracts

1. **Returned `prompt` is a measurement-derived description.** `SampleOutput.create` assigns `prompter(level_tensor)[0]`; it does not retain the original request. The sampler separately consumes the requested prompts to produce conditioning. Save the input request independently before comparing intent with output. Calling the returned description evidence that the request was followed would lose the disagreement being tested. [returned description, 35–80](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/sampler.py#L35-L80), [conditioning, 181–223](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/sampler.py#L181-L223)

2. **Count labels are implementation-specific bins, not literal guarantees.** The helper counts `E` and `B` characters as enemies, literal `<>` occurrences as pipes, and `X/S/?/Q` as blocks in row-concatenated text without separators. Elevation inspects only `X`, `<`, `>` in its first six rows. Its default configuration uses `np.digitize(..., right=True)` with enemy thresholds `[1,3,7]` and pipe thresholds `[0,2,5]`. Consequently, by source deduction, one counted enemy receives the “no” label, and exactly five pipes receive “some”; “many” starts above five. Custom statistics and use_raw_counts can change this behavior. Paper §4.4 instead calls five pipes “many”; the inspected default is not established as the paper configuration. This was not executed. Preserve raw counts, grid width and explicit boundary semantics instead of treating the generated label as a literal zero/count assertion. [prompter.py, 15–19, 46–109](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/prompter.py#L15-L109), [NumPy interval semantics](https://numpy.org/doc/stable/reference/generated/numpy.digitize.html)

3. **`run_astar()` is a launcher, not a structured acceptance API.** It calls `Simulator.astar`, which writes a temporary level, launches `java -jar PlayAstar.jar`, and discards the `CompletedProcess` stored in `_`. It captures stdout but never parses or returns it, does not check the process status, set a timeout or return win/loss/trace information, and exposes only a rendering toggle. `play()` is similarly an interactive launch. Normal Python return therefore supplies no verified completion verdict. A process-launch exception can propagate; the method does not implement the paper's five-run protocol. [sampler.py, 107–121](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/sampler.py#L107-L121), [simulator.py, 36–63](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/simulator/simulator.py#L36-L63)

4. **Level artifact and preview have distinct failure surfaces.** Sampling trims a partial trailing 14-token column before decoding. The renderer prints a diagnostic and substitutes background for an unknown character, so the preview alone can conceal a token/representation problem. Saving writes the grid as newline-separated text; it does not persist request, model revision or a playability result. Preserve decoded text and token identities alongside any preview. [sampler.py, 81–112](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/sampler.py#L81-L112), [utils.py, 13–37, 50–64, 116–128](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/utils.py)

### Released artifacts and rights

The [complete pinned tree](https://api.github.com/repos/shyamsn97/mario-gpt/git/trees/e62bb2b0106a00734e724e272ba94fb179ad959a?recursive=1) contains Python training/sampling code, train/sampling notebooks, a default corpus module and two JARs. It contains no Java source files. `PlayAstar.jar` has Git blob ID `43088af059d4855e59cc813fed1b11fc370c5381`; the binary was neither downloaded nor inspected. The controller implementation, internal budget and relationship to the paper's evaluated binary remain unverified. The [README roadmap](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/README.md#future-plans) leaves paper inpainting and open-ended generation code unchecked. Model classes alone do not establish a released reproduction of the full novelty-search experiment.

MarioGPT's [source license](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/LICENSE) is MIT. The [VGLC root license](https://github.com/TheVGLC/TheVGLC/blob/0e86a8f31f20ecad4eaa5741ff061af88767f7fb/License.md) is also MIT, but these notices do not establish rights to original Nintendo game content. The simulator's own [graphics README](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/simulator/img/README.md) identifies modified graphics from ripped Super Mario Bros sprites and a MarioAI font. Weight licensing was not established by this review. Track code, model, dataset provenance and game graphics as separate reuse scopes; the MIT notices do not settle weight or original-game-content rights. This is a source observation, not commercial clearance.

### Proposed transfer, not implemented or measured

For an original project-owned 2D platformer, preserve four independent records: requested constraints, raw structural measurements, predicted route/novelty descriptor, and actual controller outcome. Pin the game physics/controller, model/tokenizer, seed, dimensions and sampling settings. A future evaluator should return per-attempt status, win condition, furthest progress, full trace, compute/time budget and infrastructure errors; failed search is not a proof of impossibility. Report all generated candidates, retries and joint constraint-plus-completion rate. Keep overlap coverage beside path error. Include boundary-count, impossible-jump and trapped-spawn negative fixtures, then test the delivered level in the actual target runtime and with the intended player skill population. None of these proposed checks has been run.


## GAVEL: rule-design search and verdict boundaries

Checked 2026-10-18. Read-only inspection of author source at [1a849c3ba00c3ecb1194c202451a617ef0556b60][gavel-repo] (2024-10-30), [paper v2][gavel-paper] (2024-12-03) and artifact listings. [v1][gavel-v1] is dated 2024-07-12 and is a distinct publication snapshot. No installation, model inference, game/JAR/class execution, archive deserialization or reproduction. The source snapshot is not established as the exact implementation that generated the paper's results. Python invokes bundled `bin` classes; correspondence between inspected Java source and those class files remains unverified.

### Author study, kept separate from inspected implementation

Paper v2 describes CodeLlama-13B fill-in-the-middle mutation of Ludii rules: 574 fine-tuning games, 14 held-out search seeds and 49,968 training tuples. PCA maps 510 concepts to a 40×40 archive, fitted on the complete, pre-filtering Ludii corpus. Three runs each use 500 steps and nine proposals per step. Its six-metric harmonic mean includes coverage; completion means reaching an end state. Novel-cell improvements over baselines are not statistically significant with three runs. Expert screening is preliminary; broad human validation remains future work. [Sections 3–8][gavel-paper]

The 14 seeds are excluded from task-specific fine-tuning, then directly optimized during search. They are not an untouched final evaluation set. This does not establish foundation-model decontamination or human preference validity. [Paper §§4,7–8][gavel-paper]

### Source-inspected candidate and search contract

- **Representation and mutation.** `ArchiveGame` retains the complete rule string, scalar fitness, metric dictionary, ancestor lineage, original game name, generation and epoch. The mutator selects a balanced parenthetical region, excluding the outermost whole-game expression, conditions on its prefix/suffix, and inserts generated text. It requests up to 512 new tokens and strips newlines. Grammar-enforced mutation is an advertised enum/CLI option whose implementation raises `NotImplementedError`. “Recombination” here should not imply a verified two-parent crossover operator. [config.py][gavel-config], [mutators.py, 80–154][gavel-mutator]
- **Sampling differs from the paper's terse description.** Each selected elite has one mutation location chosen; `num_return_sequences` generates the configured number of alternatives at that location. The saved main configuration selects three elites and three alternatives each. [mutators.py][gavel-mutator], [evolution.py, 262–289, 440–449][gavel-evolution], [run_args.json][gavel-args]
- **Admission is not a quality pass.** Archive insertion excludes fitness −3 and NaN, but can retain −2 unplayable or −1 uninteresting entries in empty cells. Positive-quality occupancy must therefore be reported separately from total occupancy. The PCA archive loads a cached model and bins compiled concepts; novelty is representation- and reference-population-relative. [archives.py, 96–124, 170–219][gavel-archive]
- **Novelty population.** The inspected baseline comparison constructs occupied reference cells from the published model dataset's `train ∪ val` splits, then scores final archive entries against that set. It does not load every original Ludii game for this comparison. Its QD calculation adds `fitness + 2` across retained entries, so −1 entries contribute to QD although they fail the quality gate. Do not translate QD or novel-cell counts into a proportion of enjoyable or globally novel games. [compare_against_pure_generation.py, 41–75, 112–152][gavel-compare]

### Compile, playable and sampled-quality gates

The Python two-step evaluator first requests 100 Random-agent trials with a 500-turn setting. It rejects random-play balance below 0.5 or decision-move fraction below 0.5, then requests the selected AI evaluation. Main saved arguments specify UCT, ten trials, 0.25 seconds thinking time and `max_turns=50`. These populations should remain distinct from the separate UCT-versus-Random skill sample. [java_api.py, 169–241][gavel-api], [run_args.json][gavel-args]

The Java standard endpoint returns −1 if compilation produces no game. Evaluation exceptions, an error report, or mean duration below two return −2. Thus “unplayable” is broader than absence of legal moves. The Python fitness layer further rejects completion below 0.2, mean turns below three, decision moves below 0.1 or board coverage below 0.1. [StandardEvaluationEndpoint.java, 64–104][gavel-standard], [fitness_helpers.py, 148–186][gavel-fitness]

For remaining candidates, the inspected default harmonic mean uses **five** scores: balance, completion, decisiveness (`drawishness`), decision moves and trace score. Coverage and duration are excluded from aggregation, although both affect rejection. The CLI permits average/harmonic/min aggregation but does not change this fixed exclusion list. This is a paper/source protocol mismatch to resolve before reuse, not evidence that published results are incorrect. [fitness_helpers.py, 9–38, 148–186][gavel-fitness], [evolution.py, 383–391, 485–493][gavel-evolution]

The inspected `Completion` source counts trials whose winner index is nonzero, excluding draws; it is not a general terminal-state count. Python recomputes balance as one minus the maximum player-win-rate difference, and decisiveness as one minus winner-zero frequency, from returned winner counts. A metric's label alone is insufficient to reconstruct its semantics. [Completion.java, 47–57][gavel-completion], [StandardEvaluationEndpoint.java, 93–99][gavel-standard], [fitness_helpers.py, 119–146][gavel-fitness]

**Skill population:** the Python wrapper requests five trials per player slot. Java puts UCT in each slot in turn against Random opponents and divides UCT wins by `trialsPerGroup × playerCount`; this is ten trials for a two-player candidate, but not universally ten for mutated player counts. It measures this policy/budget matchup, not general strategic depth or human skill. [fitness_helpers.py, 77–84][gavel-fitness], [FastTraceEndpoint.java, 143–196][gavel-trace]

### Failure, timeout and budget accounting

1. **The 300-second setting is not an end-to-end deadline.** It decorates only `two_step_evaluate`; Java evaluator construction occurs before that wrapper, and FastTrace runs afterward with its own 120-second subprocess timeout. Java startup waits for a Ready line without an explicit deadline in the inspected Python method. [fitness_helpers.py, 57–90][gavel-fitness], [java_api.py, 61–86][gavel-api]
2. **Exception and numeric failure routes differ.** Python-caught exceptions, including wrapper timeout, set both compilable and playable false and attach an error string. FastTrace's Java timeout instead returns numeric −3; other caught trace exceptions return −2. The Python aggregate clamps included metric values to at least 0.01 before its negative-value check, so a numeric trace failure can become a small positive contribution when other gates pass. This is a source-observed path, not an executed failure measurement. [fitness_helpers.py, 77–90, 172–182][gavel-fitness], [FastTraceEndpoint.java, 49–60, 117–139][gavel-trace]
3. **Early random rejection does not prevent every expensive test.** The random-filter failure object remains compilable/playable, so the surrounding helper still calls FastTrace, although final quality will be −1. [java_api.py, 230–236][gavel-api], [fitness_helpers.py, 77–84][gavel-fitness]
4. **Aggregation loses diagnostics.** `_get_fitnesses` takes flags from the first grouped evaluation, averages metrics and omits individual errors. With repeated evaluations it concatenates winner-count vectors rather than summing corresponding player bins; do not increase repetitions and assume correct pooled balance/decisiveness. The inspected main saved configuration uses one evaluation. The class initializes and writes `error_logs`, but no append appears in this file; an empty errors file cannot establish an error-free run. [evolution.py, 88–94, 179–228][gavel-evolution], [run_args.json][gavel-args]
5. **Proposal count is not evaluation cost.** Each step filters unchanged parents and exact same-step duplicates; it does not use the initialized global evaluation cache. Failed, repeated-across-steps and extra trace evaluations consume resources. Saved main arguments request 1,000 epochs, whereas the published directory contains checkpoints through 500 and the comparator selects generation 500. The README command also inherits the 1,000-epoch default. Preserve actual checkpoint and observed steps, rather than infer finished budget from requested arguments. [evolution.py, 262–339, 367–391][gavel-evolution], [run directory][gavel-outputs], [comparison][gavel-compare], [README][gavel-readme]

### Artifacts and rights

The inspected tree contains Python search/training/baseline code, a Ludii fork with Java source and compiled classes, cached PCA pickles, six main/UCB run directories, saved arguments/statistics and selected `.lud` games. One inspected run includes archives through epoch 500 and ten selected game files. Directory presence is not verification of complete trials, paper equivalence or executable reproduction. No GitHub releases were returned by the public releases API during this review. [Pinned tree][gavel-repo], [run directory][gavel-outputs], [selected games][gavel-best], [releases API][gavel-releases]

The author-linked [model file listing][gavel-model-files] exposes three safetensors shards, configs and tokenizer files; the [dataset page][gavel-data] exposes two splits and 574 train rows. No model weights or dataset binaries were downloaded. The [model card][gavel-model] is an unfilled template, including its license field. No root-level GAVEL license was observed in the inspected root listing; the bundled [Ludii LICENSE][gavel-license] declares CC BY-NC-ND 4.0 and expressly restricts commercial use and distribution of modified material without permission. Public availability therefore does not establish permissive production reuse, a license for all root Python code, or clearance of generated variants. Resolve rights separately before integration or redistribution.

### Proposed GameMap / harness-RSI adaptation, not an author result

Use GAVEL as a design-search pattern: mutate a bounded rule/program representation, retain lineage, reject invalid candidates, and explore diverse feasible alternatives. For a game-production fixture:

- Freeze candidate grammar, mutation locations, project assertions, rights scope and evaluator outside the mutable policy
- Store separate compile errors, invalid play, sampled-quality rejection, infrastructure failures, process timeout, move-cap termination and human rejection; never collapse them into one bad-game score
- Preserve each playout's seat, opponent, seed, budget, terminal reason and raw counts; declare the actual novelty reference pool and archive projection
- Count all proposals, deduplications, attempted evaluations, trace trials, retries and wall-clock/model costs; retain the exact selected checkpoint
- Hold out game families and a final evaluator, then conduct human playtests separately from the proxy score; require rule activation/coverage evidence before describing a newly inserted mechanic as used

This is an unimplemented adaptation specification. It does not establish a general game-design validator, an engine adapter, improved human enjoyment or harness-RSI performance.

[gavel-repo]: https://github.com/gdrtodd/gavel/tree/1a849c3ba00c3ecb1194c202451a617ef0556b60
[gavel-paper]: https://arxiv.org/html/2407.09388v2
[gavel-v1]: https://arxiv.org/html/2407.09388v1
[gavel-config]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/config.py
[gavel-mutator]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/mutators.py
[gavel-evolution]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/evolution.py
[gavel-archive]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/archives.py
[gavel-api]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/java_api.py
[gavel-fitness]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/fitness_helpers.py
[gavel-standard]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/ludii_fork/Generation/src/approaches/symbolic/api/evaluation/StandardEvaluationEndpoint.java
[gavel-trace]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/ludii_fork/Generation/src/approaches/symbolic/api/evaluation/FastTraceEndpoint.java
[gavel-completion]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/ludii_fork/Evaluation/src/metrics/single/outcome/Completion.java
[gavel-compare]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/baselines/compare_against_pure_generation.py
[gavel-args]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/exp_outputs/main_experiment_seed_1_05_18_24/run_args.json
[gavel-outputs]: https://github.com/gdrtodd/gavel/tree/1a849c3ba00c3ecb1194c202451a617ef0556b60/exp_outputs/main_experiment_seed_1_05_18_24
[gavel-best]: https://github.com/gdrtodd/gavel/tree/1a849c3ba00c3ecb1194c202451a617ef0556b60/exp_outputs/main_experiment_seed_1_05_18_24/best_games
[gavel-readme]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/README.md
[gavel-releases]: https://api.github.com/repos/gdrtodd/gavel/releases
[gavel-model]: https://huggingface.co/LudiiLMs/code-llama-13b-fitm-mask-heldout-1-epoch
[gavel-model-files]: https://huggingface.co/LudiiLMs/code-llama-13b-fitm-mask-heldout-1-epoch/tree/main
[gavel-data]: https://huggingface.co/datasets/LudiiLMs/code-llama-13b-fitm-mask-heldout-1-epoch-base-data
[gavel-license]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/ludii_fork/LICENSE

## Designer-facing playtest evidence

The following examples add authored behavioral verdicts and persona-conditioned feedback. They do not turn reachability, completion or utility into a human-enjoyment score. Source-inspected mechanisms and editorial adaptations remain distinct.

### Minecraft GameTest: authored scenarios and explicit behavioral verdicts

**Source scope.** Microsoft's Bedrock sample repository at [`e0d67e171f11faa3ea5ea3be085e3f1992b27b83`](https://github.com/microsoft/minecraft-gametests/tree/e0d67e171f11faa3ea5ea3be085e3f1992b27b83), committed 2024-06-17 and inspected 2026-10-18, combines JavaScript assertions with authored `.mcstructure` environments. Its [README](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/README.md) asks for small, self-contained tests with clear outcomes and explicitly allows tagged examples of unexpected failures. This is a concrete developer-authored behavior-testing mechanism, not a released player-enjoyment evaluator or Java Edition API.

The [sample manifest](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/js-gametests/behavior_packs/JsGameTests/manifest.json) declares minimum engine 1.21.0 and beta modules `@minecraft/server` 1.13.0-beta and `@minecraft/server-gametest` 1.0.0-beta. These are historical declarations, not verified compatibility with an installed/current game. The [official tutorial](https://learn.microsoft.com/en-us/minecraft/creator/documents/gametestbuildyourfirstgametest?view=minecraft-bedrock-stable), checked as rolling documentation, still warns that GameTest is experimental. It describes Creative-mode structure authoring, a behavior pack, Beta APIs activation and Normal difficulty; escaping entities in the surrounding world can invalidate the intended enclosure. No world, game, binary structure or test was run or inspected dynamically here.

| Inspected test | Actual authored oracle | What a pass does not establish |
| --- | --- | --- |
| [Starter fox/chicken](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/starterTestsTutorial/behavior_packs/starterTestsTutorial/scripts/StarterTests.js) | Spawn both entities, first assert a chicken is present, then succeed when no chicken remains in the area; maximum 410 ticks and a named glass structure | The script does not assert an attack/death cause or a particular victim identity. Absence alone is not causal proof that the fox performed the intended interaction. |
| [Zombie/villager chase](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/js-gametests/behavior_packs/JsGameTests/scripts/MobBehaviorTests.js) | Build notched walls, spawn both types, then at tick 180 assert a villager is present and succeed; registration allows up to 2,000 ticks | Its name/comment is broader than its assertion. The code does not measure pursuit, path efficiency or survival throughout a longer session. |
| Iron-golem arena, in the same file | Eventually require no zombies/skeletons and an iron golem present, within 810 ticks | This type-presence conjunction is not a difficulty, fairness, causal kill-credit or human-fun score. |
| [Minibiomes](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/js-gametests/behavior_packs/JsGameTests/scripts/ChallengeTests.js) | Call the minecart rideable component’s `addRider(pig)` without checking its result, then succeed when a pig is present at the target position, within 260 ticks | The terminal assertion does not separately require that the target pig is still riding that cart. Preserve the difference between setup intent and observed terminal state. |

The [current experimental Test reference](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-gametest/test?view=minecraft-bedrock-experimental#succeedwhen) defines `succeedWhen` as retrying its callback each tick and succeeding once the callback returns without throwing. `runAtTickTime` schedules relative to the test start. Thus an eventual predicate and a single scheduled checkpoint are different from an invariant maintained over an interval. This documentation corroborates the conceptual distinction; it does not pin the native implementation used by the historical sample. Tick budgets are not independently verified wall-clock deadlines.

**Proposed GameMap adaptation, unimplemented.** Keep a designer-authored scenario, initial state, input/action budget, invariant interval and terminal predicate separate. For a new encounter, record object identities and authoritative event evidence alongside type/count predicates, then correlate visual/audio feedback. Test deliberately invalid controls: an escape route that satisfies absence without the intended combat event, an unconnected interaction, or a target reached without its required carried object. Keep these negative controls isolated from the final held-out task set. Report setup/import failures, timeout, assertion failure and pass separately; a stronger oracle should not be optimized away by the same candidate being evaluated. Automated reachability and mechanic activation can support design iteration, but acceptance criteria for readability, challenge and enjoyment require separately justified evidence. No human-participant data or experiment is introduced by this proposal.

**Availability and rights.** The sample is [MIT-licensed](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/LICENSE); this does not supply the Minecraft runtime or grant rights to unrelated game assets/services. The pinned repository includes a `suite:broken` tag for one phantom/cat example; that is a historical source label, not a newly reproduced failure. Actual runtime API compatibility, binary-structure contents, repeated-run reliability, test reset isolation and performance remain unverified.

### MiniDungeons: persona utility can expose design tradeoffs without measuring fun

Reviewed 2026-10-18. This is a source-only addition to GameMap's design/playtest evidence, complementing controller solvability and development-correctness benchmarks. No simulator, JAR, model, game, engine or evaluation service was executed; no participant data was downloaded or collected. The contribution is a concrete connection between a designer's intended playstyle, instrumented behavior and level selection, with a deliberately narrow release claim.

#### Published mechanism and metric population

Liapis, Holmgård, Yannakakis and Togelius (2015) separate three acceptance conditions: fixed feature counts, passable connectivity to every feature, and baseline-persona completion with every monster dealing maximum damage (14 HP). Completion must explore at least 12 tiles. Only then do monster-killer or treasure-collector personas assess level utility, averaged across ten stochastic playthroughs. Thus connectivity is not completion, and completion is not the persona's targeted behavior profile.

A critical negative result is useful for design: maximizing treasure utility produces levels where the critic always collects all seven treasures without dying; maximizing monster-utility variability produces a 0.92 death ratio. These are different optimization targets, neither an enjoyment score. Table 1 summarizes best final levels from 20 evolutionary runs, each replayed ten times; parenthesized deviations are within-level simulation deviations averaged over runs, not uncertainty across independent levels.

The personas were evolved on all ten authored levels; those same levels appear as the comparison baseline. Prior human alignment uses next-action agreement for 38 players on those levels, not enjoyment of the newly generated levels. This is not an untouched final-test study. [Paper §§2.2–4, Table 1][MD-paper]

#### What is actually released

The [author's MiniDungeons project page][MD-project] directly links `sentientdesigns/minidungeons` as a minimal agent simulation. The reviewed source is [commit `298b86cac5624e4b121b4d2e5a2fd3cd93c622f7`][MD-pin], dated 2017-06-07. This establishes author association and exact inspected code, not equivalence to the 2015 experiments.

The [README][MD-readme] explicitly describes a bare-bones MiniDungeons 1 framework, with ten research maps plus tutorial map 0, ASCII presentation and a custom-controller interface. The [complete tree][MD-tree] contains those eleven maps and simple Idle, Random, Roomba, Zombie and Pathfinding controllers. It does not contain the paper's evolved-persona weights or feasible/infeasible evolutionary level-generation implementation. Do not attach the paper's results to this release as a reproduced benchmark, or describe it as the later MiniDungeons 2 MCTS system.

Three source-inspected surfaces make the release useful as a design-instrumentation example:

1. **A behavior vector accompanies the outcome.** `SimulationMode` retains per-run HP, monsters killed, treasures collected, potions consumed, attempted actions and distinct visited tiles, then prints both aggregate and full per-run values. The stock configuration uses ten runs with a 300-action ceiling. Measurements include every run, including deaths and capped runs, rather than filtering to wins. Its counters classify completed as HP > 0 and actions < 300, and uncompleted as actions == 300: completion on action 300 would be counted uncompleted, while death on that action can enter both died and uncompleted. These are implementation counters, not mutually exclusive terminal verdicts. This lets a future comparison preserve the cost of obtaining treasure or combat coverage instead of presenting only a single completion percentage. [SimulationMode, lines 20–142][MD-simulation]

2. **The displayed heatmap has a precise information limit.** `renderHeatmapDungeon` consumes `getAnyVisited()` and marks visited locations with `%`. It is a binary occupancy map, not a visit-frequency map or an ordered action trace. `PlayMap` separately stores visit counts and collision/exit event strings. A designer can inspect where behavior went, but the exported occupancy alone cannot establish when a potion was used, how often a corridor was retraced or which decision preceded death. [PlayVisualizer][MD-visualizer], [PlayMap][MD-playmap]

3. **Controller identity and randomness remain experimental variables.** The stock runner instantiates `PathfindingController`, whose action choice minimizes path distance to the exit; it does not implement the learned treasure/monster personas. `RandomNumberManager` creates a default Java `Random` with no exposed seed-setting method. Choosing a controller, adding seed control and recording exact initial damage draws would therefore be adaptation work, not existing reproduction support. [PathfindingController][MD-controller], [RandomNumberManager][MD-random]

The README says the codebase and bundled `lib/ai_path.jar` use the GNU Lesser General Public License, but gives no explicit numbered version; the inspected tree has no standalone license text. Record that wording without converting it into MIT or a specific LGPL SPDX identifier. The binary was not fetched or inspected. The minimal ASCII release also does not establish rights for separately linked graphics. [README licensing notice][MD-readme], [MD-tree][MD-tree]

#### Proposed GameMap / piRSI adaptation, unimplemented

For an original project-owned dungeon, have the designer state the intended tradeoff before optimizing: for example, optional treasure should require a survivable detour while a safer completion route remains available. Keep mandatory reachability/completion gates separate from persona-specific behavior targets. Do not silently change the design target because a candidate improves an easily optimized statistic.

Use a small development fixture family: an unreachable reward, a connected but lethal route, a safe direct route with trivial rewards, and a meaningful optional detour. Pair each run's native outcome with the behavior vector, ordered event trace and viewable route. Preserve deaths and budget exhaustion beside successful runs. A persona's failure should trigger diagnosis of both controller competence and level design; it does not prove that no player could succeed.

For a recursive harness comparison, freeze persona definitions, observation access, game rules and budgets before evaluating candidate changes. Hold out whole layout families and reserve a final evaluation set that cannot influence controller or harness selection. Report completion and behavior-target attainment separately for each persona, with the full denominator. A faster or more varied synthetic route is useful feedback about these defined agents. Representative human playtesting and designer review remain separate evidence needed to assess clarity, pacing, frustration and enjoyment; neither has been performed here.

[MD-paper]: https://www.um.edu.mt/library/oar/bitstream/123456789/29721/1/Procedural_personas_as_critics_for_dungeon_generation_2015.pdf
[MD-project]: https://antoniosliapis.com/projects/project_minidungeons.php
[MD-pin]: https://github.com/sentientdesigns/minidungeons/tree/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7
[MD-tree]: https://api.github.com/repos/sentientdesigns/minidungeons/git/trees/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7?recursive=1
[MD-readme]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/README.md
[MD-simulation]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/experiment/SimulationMode.java#L20-L142
[MD-visualizer]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/dungeon/visualization/PlayVisualizer.java#L46-L77
[MD-playmap]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/dungeon/play/PlayMap.java
[MD-controller]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/controllers/PathfindingController.java#L24-L46
[MD-random]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/util/statics/RandomNumberManager.java

## Acceptance layers for the Planning Map

1. **Plan:** define the core loop, inputs, win/loss conditions, restart behavior, and progress state. Limit scope to a slice that supports continuous playtesting.
2. **Code / Scene:** have the agent write code while using the editor, CLI, or MCP to inspect real scenes, asset bindings, logs, and runtime state.
3. **2D assets:** standardize canvas, perspective, character scale, directions, anchors, transparency, frame order, loops, hit timing, atlases, and tile edges.
4. **3D assets:** record units, axes, origins, polygon counts, material slots, UVs, LOD, rigs, animation retargeting, collision, and navigation. A convincing generated image covers only part of this work.
5. **Test:** check compilation, gameplay invariants, visual layout, input reachability, win/loss and restart behavior, long runs, and performance separately. Visual judges and state probes provide complementary evidence.
6. **Ship:** validate on target devices or exported builds. Record engine versions, asset sources, build steps, and performance budgets.

These layers are GameMap's planning recommendations, synthesized from the resources and their engineering boundaries. They are not experimental findings from any single paper.
