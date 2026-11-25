# Find the right reference for your game

A good reference saves you a detour. A Phaser 4 skill can send you down one if the game you're maintaining ships on Phaser 3. Start with the job and the version already in front of you.

## Start with a question and a constraint

Write down what's broken or missing, where it happens, and what has to keep working. “Add touch controls to this Phaser game” is a starting point. “Make movement and fire work together on a small phone, while keeping keyboard support” tells you which demos and docs to look for.

## Choose the collection that answers your question

| Current question | Bring with you | Where to look | Next concrete output |
| --- | --- | --- | --- |
| Which tool could produce the required artifact? | Engine, platform, file format, budget | [Resources: Tools & platforms][resources]; narrow by category and development stage | Two candidates with input/output and integration differences |
| How does this API or workflow work? | Exact version and operation | [Guides & examples][learning]; [Technical references][reference] for formats and lower-level APIs | A source example and the relevant documentation section |
| What can I learn from a complete game? | Mechanic, dimension and target platform | [Game examples][examples]; inspect play, source and attribution links | One reference project and the part worth studying |
| Which agent integration fits my setup? | Coding client, engine, allowed actions | [Agent toolkit][agents]; combine client, resource kind and engine | A client, instructions and bridge arrangement |
| What should I test against? | Failure, expected state, usable data terms | [Testing library][testing]; combine purpose, dimension and permission group | A small fixture and observable pass/fail conditions |
| Is a research approach relevant? | Representation, task, compute and comparison baseline | [Papers][papers] for academic work; [Research & benchmarks][resource-research] for selected resources | A reading shortlist and an experiment question |
| What evidence exists for a repository? | Repository name or required capability | [Repository research][research]; inspect topic, review stage, snapshot and license | A pinned source pointer and a list of unresolved claims |
| How will this become a repeatable production operation? | Required artifacts, ownership, failure and recovery behavior | [Production research](../production/overview.md) | A scoped [work order](../production/work-orders.md) |

Resources opens in Tools & platforms. Switch collections when seeking a tutorial, paper or technical API. Search across all collections if you do not know which one owns a result. In Agent toolkit, a client filter selects explicitly named integrations; the general-resource toggle expands that scope. A model name alone does not specify the client, filesystem access or engine bridge you need.

## Scenario 1: adapt an existing browser shooter for touch

For a mobile control scheme, start with [Starshake][starshake]: its entry links the complete original project and a separate mobile adaptation. Its Sandbox specifies **Phaser 3.90.0**. Record that version and the source revision.

Use [Codex + Phaser integrations][phaser-agents] to compare the official workflow, Phaser bridge and engine skills. The skills target Phaser 4: decide whether to maintain or migrate the existing version, then choose commands matching that decision.

Try start, movement, firing and restart on the target phone. In particular, press move and fire together, then slide a thumb off a control and release it. Look for a stuck direction or an accidental press on a neighboring button. Set button size and spacing on the device. The [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/ensure-interactive-elements-virtual-controls-are-large-and-well-spaced-particularly-on-small-or-touch-screens/) explain why small, crowded controls are hard to use.

Keep the original code and asset notices. In the [work order](../production/work-orders.md), ask for a patch against the selected revision, launch steps, and a check on both touch and keyboard. Specify which phone and orientation you used. That is more useful to the next person than “mobile supported”.

## Scenario 2: isolate a Godot asset-import regression

For incorrect animation after reimport, bring the Godot version, source asset, export settings, expected clip and failing scene. In [open-license 3D pipeline test sources][pipeline-tests], compare Godot official demos, Kenney Animated Characters and Khronos glTF Asset Generator for a small baseline.

For Khronos glTF Sample Assets, clear the open-license filter: it has **mixed** terms, requiring the individual model's notice. Use the entry's proposed checks and source links to select a fixture matching your symptom.

Use the [asset-validation notes](../assets/validation.md) to name the comparison, and the [production work orders](../production/work-orders.md) to define retained inputs and failure artifacts. Leave with the chosen fixture and revision, one reproducible import sequence, the expected result, and the evidence to capture. The [level-design guide](level-design.md) serves a different question: choosing and testing spatial gameplay.

## Scenario 3: decide whether a world model fits your deliverable

Specify whether your interactive environment needs an editable engine scene, executable state model, or action-conditioned video. Compare [Marble][marble]'s scene exports with [WorldCoder][worldcoder]'s code-based world models. The [world-model notes](../ecosystem/world-models.md) place GameNGen and Oasis in the neural-simulation branch.

Follow the paper, code and release links for the approach you actually need. On Papers, distinguish research papers from supporting references; artifact review describes checked links, not a reproduced score. On Repository research, an implementation inspection and pinned evidence help locate what was read, while the limitations tell you what remains to test.

Name one task, available release, compute allowance, baseline, output representation and success measure. Record missing exports or code components before allocating implementation work. Turn the claim into a bounded comparison with [development evaluation](../evaluation/development-evaluation.md) and [benchmark reproducibility](../evaluation/benchmarks.md).

## Leave with a brief someone can execute

In Resources you can save entries and export Markdown. For a game, agent tool, paper, or testing entry, copy the page link and the upstream revision or release you chose. Then fill in the part your teammate needs:

- Question and target:
- Existing project / engine / revision:
- Selected sources and why they fit:
- Inputs, permissions and service costs:
- Required output and allowed changes:
- Checks, failure evidence and unresolved questions:
- First bounded task:

When switching language, keep project names, identifiers and upstream URLs intact. They help rediscover a candidate; the source revision and brief preserve the actual selection.

[resources]: /resources/?collection=tools
[learning]: /resources/?collection=learning
[reference]: /resources/?collection=reference
[examples]: /examples/
[agents]: /agents/
[testing]: /testing/
[papers]: /papers/?scope=research
[resource-research]: /resources/?collection=research
[research]: /research/
[starshake]: /examples/phaser-starshake/
[phaser-agents]: /agents/?client=codex&engine=phaser
[pipeline-tests]: /testing/?use=pipeline&dimension=3d&terms=open
[marble]: /resources/marble/
[worldcoder]: /resources/worldcoder/
