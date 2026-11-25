# Graybox a route and watch someone play it

The player reaches a locked exit, turns around, then walks right past the corridor they need. Which piece of the room led them to make that choice? Build a small relay station out of primitives, put someone new in it, and make one change based on where they went.

Start with your existing walking controller. Walk the route with the actual camera, speed, and collision before you bring in a tester. [The Level Design Book](https://book.leveldesignbook.com/process/blockout/playtesting) separates a designer's own check from watching a fresh player. Your walk catches tight doorways. A newcomer can show you what reads as a doorway in the first place. The dimensions and test notes below belong to this exercise.

## 1. Write the brief and draw the connections

**Player verbs:** move, look, interact. Picking up the cell sets a carried state; no inventory interface is required. **Goal:** restore the exit socket and leave. **Audience:** someone familiar with first-person controls who has not seen this layout.

The start faces the exit. The empty socket explains that a relay cell is missing. A striped mast beside the cell supplies a landmark through the gallery opening. The return passage opens from its far side.

```text
            [B: CELL]--------[R: LATCH]
                |                :
           [C: GALLERY]           :
                |                :
[S: START]---[J: HUB]--------[G: SOCKET]---[E: EXIT]
```

Solid lines mark two-way connections; G–E is gated by the cell. The dotted R–G passage starts closed and opens when the player operates R from B's side. Letters identify spaces in your notes; players receive the objective and interaction feedback, not this diagram.

The intended sequence is S–J–G, J–C–B, then B–R–G–E. Retracing B–C–J–G must also work. Keep everything on one floor so floor recognition does not obscure the navigation question.

## 2. Build the greybox

1. Check walking, turning, collision and interaction with the actual camera in a test strip. Record controller version, speed, field of view and input device.
2. Start with an approximately 18 × 12 m footprint, 2 m passages and 1.4 m door openings. These are editable starting values. Widen anything the controller cannot pass or turn through comfortably.
3. Place S and G about 8 m apart through J. Build J–C–B, then B–R–G. Walk every connection both ways before adding decoration.
4. Place the striped mast at B. Inspect visibility from J at player eye height. Use silhouette and stripes alongside contrast, rather than color alone.
5. Add cell, socket and latch states. Installing the cell opens E. R opens only from B's side and stays open for that run.
6. Reset returns the player to S, restores the cell to B and closes both gates. Prevent leaving the greybox boundary. Keep these rules unchanged between comparison runs.

## 3. State the prediction first

**Hypothesis:** after discovering the empty socket, an unfamiliar player can recognize the gallery route, collect the cell and return to the exit without a route hint.

| Question                                | Record                                            | What would challenge the prediction?                      |
| --------------------------------------- | ------------------------------------------------- | --------------------------------------------------------- |
| Does the gallery read as traversable?   | First route from J after visiting G               | Repeated returns to G without entering C                  |
| Does the shortcut communicate a return? | Route after collecting B; attempts at R           | Player overlooks R or mistakes it for another locked exit |
| Do dimensions fit the controller?       | Snags, failed interactions and camera obstruction | Collision or reach blocks a navigation choice             |

Propose three unfamiliar testers and a 180-second observation window each. Aim for two unassisted completions; any softlock blocks acceptance. This is a revision trigger for a tiny sample, not a population success-rate claim. Log changes to the prediction instead of rewriting it after seeing results.

## 4. Provide feedback and recovery

| Situation                | Immediate feedback                           | Recovery                                                     |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------ |
| G has no cell            | Empty matching socket; “Relay cell required” | Turn back toward J                                           |
| Player takes B           | Cell disappears; carried-state confirmation  | Cell cannot be dropped into unreachable space                |
| Player approaches R      | Latch is visible and usable from B's side    | B–C–J remains an alternative return                          |
| Player installs the cell | Socket changes state and E visibly opens     | Repeated interaction cannot consume another cell or relock E |

Check forgetting the cell, visiting R early, retracing the long route and resetting after completion. A wrong turn should leave a useful next action available.

## 5. Run a blind test and fill the sheet

Give only the controls and “Restore the relay and leave.” Reset to the same state for every tester. Observe silently; do not point toward C or explain the mast. If assistance is necessary, record its time and content and classify the remaining run as assisted. Stop at completion or the time limit; a timeout is a valid outcome.

Record build, controller settings and relevant player experience. Obtain permission before recording. Separate observed actions from your explanation.

| Tester / build | Route and decisions | Times at G, B, R, E | Assistance / outcome | Concrete observation |
| -------------- | ------------------- | ------------------- | -------------------- | -------------------- |
| ___ / ___      | ___                 | ___                 | ___                  | ___                  |
| ___ / ___      | ___                 | ___                 | ___                  | ___                  |
| ___ / ___      | ___                 | ___                 | ___                  | ___                  |

Afterward ask: “What did you think the goal was?”, “Which openings seemed usable?” and “What did you expect the latch to do?” Without an unfamiliar participant, label the sheet **walkthrough only** and leave participant outcomes empty.

## 6. Turn one observation into one revision

**Illustrative example, not an observed result:** a tester visits G twice, pauses at J and never enters C. They later say the opening looked like a wall recess.

- **Diagnosis to test:** the opening's silhouette obscures its function. Alternatively, the socket message never established the cell objective.
- **Next version:** hold objective, speed and route lengths fixed; move only the pillar that masks C. Keep the floor and lighting as they were.
- **Retest:** use a new unfamiliar tester and the same task. Record whether they enter C; quicker completion alone does not prove the explanation.

Avoid simultaneously adding arrows, a minimap and brighter rewards. Keep a change log and repeat reverse-route and reset checks after each revision.

## 7. Decide what is ready

| Acceptance check                                                           | Evidence / result | Decision                   |
| -------------------------------------------------------------------------- | ----------------- | -------------------------- |
| Both returns work; reset restores every state                              | ___               | Pass / revise / not tested |
| No unreachable cell, stuck gate or collision blocker                       | ___               | Pass / revise / not tested |
| Blind-test criterion checked without hiding assistance or timeouts         | ___               | Pass / revise / not tested |
| One prioritized revision has an observation and an alternative explanation | ___               | Pass / revise / not tested |

Keep the greybox editable until you can explain the remaining uncertainty. Art production can follow that decision.

## Carry one decision across the three templates

The following filled entries show how the records connect. They are illustrative entries for the relay station, with no observed participant result.

| Template | Example entry |
| --- | --- |
| Level brief | At the hub, a first-time player should recognize the gallery as a route after seeing the empty socket. Record the first turn from the hub. Keep controller and objective fixed. |
| Playtest report | Record at the first return to the hub: time, chosen opening, what the player said, and whether a hint was given. Before the test, leave the observation and outcome fields blank. |
| Review | If players pass the gallery repeatedly and describe it as a recess, test the opening silhouette in the next build. Retain the previous build and observe the same decision with a new player. |

A construction agent can submit the scene and the named acceptance routes. A gameplay agent can check reachability, latch state or reset behavior using a fixed interface and budget. Use first-time human players to assess whether the opening reads as traversable and whether the objective is clear. Keep the three records separate and identify the test subject in each. See [development evaluation](../evaluation/development-evaluation.md).

## Supporting materials, download and attribution

Extend the exercise with the [level brief](../skills/level-design/templates/level-brief.md), [playtest report](../skills/level-design/templates/playtest-report.md) and [review template](../skills/level-design/templates/review.md). Read deeper guidance on [metrics](../skills/level-design/references/blockout-metrics.md), [spatial connections and gates](../skills/level-design/references/spatial-layout.md), and [wayfinding and playtesting](../skills/level-design/references/wayfinding-playtesting.md).

[Read the skill](../skills/level-design/SKILL.md) or [download its complete package](../../website/public/skills/level-design.zip). Installation is optional; extraction installs no engine integration. The unchanged English package contains instructions, thirteen topical/source references and three templates, primarily for 3D work. State new assumptions when adapting it to 2D. It bundles no book screenshots, game assets, linked videos, external articles or pi configuration.

The community adaptation of **[The Level Design Book](https://book.leveldesignbook.com/)**, founded and primarily written/edited by **Robert Yang**, with contributors including **Andrew Yoder**, is **CC BY-NC-SA 4.0**. Retain attribution and adaptation notices and observe noncommercial/share-alike conditions. See the [license and third-party exceptions](../skills/level-design/LICENSE.md) and [source map, reading snapshot and unfinished sections](../skills/level-design/references/source-map.md). A host tool's MIT license does not replace these terms. This notice does not change the rest of GameMap's license or automatically determine every resulting game's license.
