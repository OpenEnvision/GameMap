# Level Brief Template

Adapted working template for the level-design skill; not a form reproduced from the book. CC BY-NC-SA 4.0. Delete fields that do not affect the task.

## Identity

- Level / version:
- Owner and collaborators:
- Game, engine, platform:
- Mode, player count, audience:
- Desired session length:
- Build / artifact location:
- Document status: proposal / implemented / tested / released

## Intent

**One sentence:** The player should [activity / understanding / feeling] by [playable relationship].

**Actionable pillars**

1. ***
2. ***
3. ***

## Non-goals

- ***

## Constraints and assumptions

| Constraint or assumption | Fixed / provisional | Why it matters | How to verify |
| ------------------------ | ------------------- | -------------- | ------------- |
|                          |                     |                |               |

Include camera, movement, combat, interaction, available assets, timeline, team, and accessibility considerations only as relevant.

## Core activity and progression

- What the player already knows/has:
- What this level introduces:
- What it tests or changes:
- Start:
- Completion:
- Failure:
- Retry:
- Persistent changes:
- Optional activities:

## Structure

Attach the cheapest useful diagram. Include a legend for:

- Start, goals, critical progression, branches.
- Gates, unlock conditions, shortcuts.
- Height transitions and one-way connections.
- Major sightlines and landmarks.
- Relevant encounters, resources, or puzzle dependencies.

| Beat / area | Activity and purpose | Entry state | Information | Exit / transition | Test question |
| ----------- | -------------------- | ----------- | ----------- | ----------------- | ------------- |
|             |                      |             |             |                   |               |

Label duration and intensity as **estimates** until measured.

## Metrics and states

| Relationship | Proposed value / behavior | Evidence / configuration | Status                       |
| ------------ | ------------------------- | ------------------------ | ---------------------------- |
|              |                           |                          | proposed / measured / tested |

Reference a metrics playground or script-state specification rather than duplicating it.

## Scope and dependencies

- Must preserve:
- Substitutable:
- Optional/cuttable:
- Unique assets or systems:
- External dependencies and rights:
- Performance risks:

## First prototype

- Highest-risk assumption:
- Smallest playable segment that tests it:
- Required temporary assets/scripts:
- What is deliberately omitted:
- Result that would challenge the assumption:

## Playtest and next decision

- Intended tester and relevant experience:
- Method and initial conditions:
- Observable question:
- Proposed acceptance criterion, with rationale:
- Evidence to collect:
- What will be changed if the hypothesis fails:
- Run status: not run / walkthrough only / playtested

## First-pass example: a return route

Fill Identity, Intent, Core activity and progression, First prototype, and Playtest and next decision before expanding the rest. Use the other sections for decisions that affect the current slice. A field can say “unknown; check in the controller scene” rather than conceal an assumption.

This planning example is a GameMap adaptation, not a completed level or a report of player results. The identifiers below illustrate a small first-person level with an existing walking controller and an interact action.

| Brief field             | Example entry                                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Level / version         | `relay_v01`; proposed blockout; no playtest yet                                                                                                                                                     |
| Experience goal         | See the destination first, find its missing cell, and recognize a shorter return route.                                                                                                             |
| Core progression        | Start at S, inspect socket G, take J–C–B to collect the cell, then return to G and leave at E. B–R–G is an optional shortcut; B–C–J–G remains usable.                                               |
| State and reset         | Start without the cell, with the shortcut closed. Inserting the cell unlocks E. Opening R persists within the session. A reset restores the cell and closes both gates.                             |
| Fixed / provisional     | Keep the existing controller, camera, and input fixed. Corridor dimensions and entrance treatment are provisional.                                                                                  |
| Non-goals               | No combat, inventory screen, vertical traversal, or final environment art in this slice.                                                                                                            |
| Highest-risk assumption | After seeing G, an unfamiliar player can identify C as a route rather than a wall recess.                                                                                                           |
| Smallest prototype      | One junction, the visible socket, the gallery entrance, the cell, and a working return.                                                                                                             |
| Test and next decision  | Record the first route selected at J after visiting G, assistance, and the final result. If players repeatedly return to G without entering C, inspect the opening and the goal message separately. |

Before handing this brief to an implementer, replace the example labels with actual scene/object names, attach the connection diagram, and identify who will run the test. Link the resulting session from the [playtest report](playtest-report.md); put the next change in the [review](review.md), leaving this version's original prediction intact.
