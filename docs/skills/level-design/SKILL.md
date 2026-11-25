---
name: level-design
description: "Design, review, prototype, and iterate playable game levels using The Level Design Book. Use for level design, layouts, blockouts, grayboxing, pacing, combat encounters, enemy placement, cover, multiplayer map balance, wayfinding, environmental storytelling, lighting, playtesting, Quake or TrenchBroom mapping, level-design exercises, and diagnosing confusing, flat, unfair, or tedious levels."
license: CC-BY-NC-SA-4.0
metadata:
  source: "https://book.leveldesignbook.com/"
  source-snapshot: "2026-10-16"
  language: "en"
---

# Level Design: From Intended Experience to Tested Space

An unofficial English adaptation and reorganization of [The Level Design Book](https://book.leveldesignbook.com/), founded and primarily written/edited by Robert Yang, with contributors including Andrew Yoder. This is an operational skill, not a reproduction of the book. Adapted material is **CC BY-NC-SA 4.0**; attribution, third-party exceptions, and changes are documented in [LICENSE.md](LICENSE.md).

## Scope and limits

- Primarily for 3D games. State changed assumptions when adapting to 2D, open worlds, zero-input levels, or physical spaces.
- Level design organizes space, activities, rules, and information. It is not synonymous with placing assets, drawing attractive floor plans, writing lore, or adding enemies.
- Work iteratively. Layout, blockout, scripting, testing, and art can change one another; this is not a mandatory waterfall pipeline.
- The source is unfinished. All 94 indexed pages are mapped in the [source map](references/source-map.md), including stubs. Linked videos, external articles, and games are not treated as watched, read, or played.
- The checklists, templates, proposed acceptance criteria, and task routing below are adaptations, not quotations, universal laws, or measured results.

## Load only the references the task needs

| Task or symptom                                                                            | Read                                                               |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Start a level; control scope; develop pacing, research, or worldbuilding                   | [Foundations and pre-production](references/foundations.md)        |
| Draw a layout; connect routes; handle verticality, backtracking, gates, or shortcuts       | [Spatial layout](references/spatial-layout.md)                     |
| Build a blockout; diagnose scale; design terrain, massing, or modular kits                 | [Blockout and metrics](references/blockout-metrics.md)             |
| Design encounters, enemies, cover, objectives, or competitive balance                      | [Combat and balance](references/combat-balance.md)                 |
| Diagnose navigation confusion; plan and interpret playtests                                | [Wayfinding and playtesting](references/wayfinding-playtesting.md) |
| Implement triggers, objectives, spawning, doors, or recovery states                        | [Scripting and doors](references/scripting-doors.md)               |
| Improve lighting, darkness, visual readability, materials, or environmental narrative      | [Lighting and environment art](references/lighting-art.md)         |
| Profile performance; package, publish, or present a level                                  | [Optimization and release](references/optimization-release.md)     |
| Understand professional history, architecture, cultural assumptions, or zero-player levels | [Culture and history](references/culture-history.md)               |
| Analyze existing levels and transfer patterns without copying surfaces                     | [Case studies](references/case-studies.md)                         |
| Build a learning plan, exercise, critique, or portfolio                                    | [Learning and teaching](references/learning.md)                    |
| Choose tools; work with TrenchBroom, Quake, FGD, MAP, or MDL                               | [Tools and Quake](references/tools-quake.md)                       |

## Keep one iteration connected

For a first assignment, use an existing controller and one start-to-goal route. In the brief, identify the build, the player's goal, the rule that changes progress, the reset state, and one question to test. Add a second route or encounter only when it helps answer that question.

The three templates follow the same version of the level. Give them a shared build identifier and retain earlier records when the level changes:

| Record                                          | Put here                                                                            | Example for a return-route level                                                          |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Brief](templates/level-brief.md)               | Intent, fixed rules, assumptions, and the planned test                              | After inspecting an empty socket, a new player can find a cell and return.                |
| [Playtest report](templates/playtest-report.md) | What happened in each session, including assistance, timeout, and technical failure | Record the first route chosen at the junction after visiting the socket.                  |
| [Review](templates/review.md)                   | A finding tied to that evidence, a proposed change, and its regression check        | If the gallery entrance is missed, test its floor continuity before adding a route arrow. |

This is a GameMap working example. Its proposed route and checks are not observations from a played level. The templates contain a planning example and an explicitly hypothetical finding so that a team can see how the records connect.

When an AI tool participates, name its job. A development agent may edit a level; a gameplay agent may attempt it; a person may judge whether its cues make sense. Keep those results separate. For an automated play session, record the observation/action interface, model and client versions, reset/seed, and action or time budget. Reaching the goal with a gameplay agent does not establish that unfamiliar human players understood the route.

## Operating procedure

### 1. Frame the actual task

Restate: **For which player, under which rules and constraints, should which experience occur, and what evidence would support it?**

Ask only for missing information that changes the next decision:

- Genre, camera, movement, combat, interaction, and the existing project's state.
- Audience, single-player or multiplayer rules, intended duration or match length.
- Engine, platform, assets, team, deadline, and requested deliverable.

When progress is possible, state provisional assumptions and propose a small next step instead of stopping at a long questionnaire. For implementation, inspect the project first; do not invent engine APIs, units, player abilities, or assets.

### 2. Write a minimal brief

Use the [level brief template](templates/level-brief.md). Establish:

- One-sentence experience goal and a few actionable design pillars.
- Core activities; what is introduced, tested, combined, or changed.
- Start, completion, failure, retry, and persistence conditions.
- Must-have scope, exclusions, dependencies, and highest-risk unknown.
- The first falsifiable playtest question.

“Dark and monumental” is not sufficient. Make it actionable: “Players can survey danger from safety, but must leave that safety to advance.”

### 3. Explore structure in the cheapest useful representation

Choose a beat sheet, node graph, floor plan, section, or rough blockout. Do not require all of them.

- Mark starts, goals, required progression, branches, gates, shortcuts, and landmarks.
- Distinguish visibility from reachability; annotate heights and important sightlines.
- Estimate, then measure traversal, combat, waiting, and backtracking time. Area alone does not predict duration.
- Ask what each branch, gate, encounter, and unique asset contributes before adding it.

### 4. Make the risky part playable early

Build a small, end-to-end playable slice of the riskiest relationship:

- Use representative camera, movement, collision, interaction, and enemy capabilities.
- Test clearance, jumps, stairs, cover, camera behavior, and retries in a metrics playground.
- Add only the scripting, lighting, sound, and temporary signs necessary for the question.
- Do not explain an untested spatial problem with “it will work once the art is finished.”

If execution is unavailable, deliver specifications and test steps explicitly labeled **not run**.

### 5. Observe without completing the experience for the player

Use [playtesting guidance](references/wayfinding-playtesting.md) and the [playtest report](templates/playtest-report.md).

- Define the question and expected observable behavior before recruiting testers.
- Unless the agreed test method requires it, do not coach, explain, or defend during play.
- Separate observed behavior, player statements, and designer interpretation.
- Locate “hard,” “lost,” or “boring” in space, time, state, and actions.
- Retest changes and inspect alternate routes, retries, persistence, multiplayer, and performance.
- Small convenience samples do not establish population-level success rates.

### 6. Select the next intervention from evidence

| Symptom          | Investigate before adding content                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| Confusing route  | Ground continuity, decision points, landmarks, goal exposure, and actual connections—not arrows first |
| Flat combat      | Enemy roles, readable information, space, resources, and alternatives—not more health first           |
| Awkward scale    | Camera and controller measurements—not real-world dimensions alone                                    |
| Monotony         | Activity changes, intensity, downtime, repetition, and retry cost—not greater length                  |
| Art damages play | Sightlines, collision, interaction readability, and navigation—not more detail                        |
| Poor performance | Measured bottlenecks on representative hardware—not screenshots or average FPS alone                  |

### 7. Deliver a reviewable version

Provide what the task needs, not every possible document:

1. Intent, constraints, and labeled assumptions.
2. Beats/routes/layout with a legend and meaningful annotations.
3. Playable blockout or implementable specification.
4. Relevant metrics and script states.
5. Test questions, evidence, limitations, and conclusions.
6. Prioritized changes for the next iteration.
7. If releasing: dependencies, installation, controls, credits, performance, and known issues.

Use **problem → concrete location/reproduction → smallest useful change → validation** for critiques. See the [review template](templates/review.md).

## Judgment rules

- Symmetry is not balance; single-player difficulty is not competitive fairness.
- Do not force a dramatic curve, teach–test–twist, or a single critical path onto every game.
- Not all disorientation is failure. Distinguish intentional exploration from an unreadable system.
- A composed screenshot does not validate a navigable space. Players turn around, look down, jump, and approach from elsewhere.
- Do not present color, shape, or architectural associations as universal psychology.
- Do not invent playtest observations, completion times, player behavior, or profiling results.
- Avoid premature asset polish, but do not use “it's only a blockout” to excuse missing information essential to the test.
- Do not expand a source STUB/TODO into a method attributed to its author.
- Follow project and tool safety rules before editing code, installing tools, running games, or publishing.

## Example task handling

- **“Design a ten-minute first-person stealth level.”** Start with a brief, meaningful routes, readable threats, and one testable segment—not a long fictional history.
- **“One team always wins this map.”** Inspect rules, starts, travel times, sightlines, resources, and match evidence before proposing mirroring.
- **“The scene looks good but players get lost.”** Walk decision points from the player camera; test the smallest spatial or informational correction.
- **“Teach me this book.”** Use short complete iteration cycles and critiques, not terminology memorization alone.
