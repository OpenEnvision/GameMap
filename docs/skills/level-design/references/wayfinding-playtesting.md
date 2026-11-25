# Wayfinding, Player Understanding, and Playtesting

Sources: [Wayfinding](https://book.leveldesignbook.com/process/blockout/wayfinding), [Playtesting](https://book.leveldesignbook.com/process/blockout/playtesting), [Player persona](https://book.leveldesignbook.com/process/blockout/playtesting/persona). Adapted and reorganized under CC BY-NC-SA 4.0. The persona page is brief and incomplete; the operational checklist here is an adaptation.

## 1. Distinguish navigation failures

A player may be:

- Unable to perceive an exit.
- Unable to interpret a visible exit as usable.
- Unsure of the objective.
- Unsure how a mechanic works.
- Unable to remember their route or current floor.
- Deliberately exploring.
- Confidently pursuing an unintended but plausible hypothesis.

These require different interventions. “They are lost” is a symptom, not a diagnosis.

**Wayfinding** concerns how players build and use an understanding of the environment. It differs from AI pathfinding, which computes or follows traversable routes.

## 2. Support a usable mental map

Useful environmental categories include paths, boundaries/edges, distinct districts, important nodes, and landmarks. Their value comes from the actual player's experience, not from checking every category off a list.

- Make important places distinguishable at the relevant distance.
- Keep recurring visual conventions consistent enough to learn.
- Let routes reveal relationships between previously separate places.
- Use views across or back into space to confirm location.
- Consider orientation from every relevant entrance and after respawning.

A landmark must be noticeable, distinguishable, and useful for orientation. A large sculpture hidden behind the player at every decision point is not automatically an effective landmark.

## 3. Guidance is a layered hypothesis

Possible cues:

- Ground continuity, openings, thresholds, and circulation.
- Framing, contrast, value, lighting, silhouette, and movement.
- Recognizable objects and activity.
- Goals, enemies, rewards, resource trails, and curiosity.
- Sound, dialogue, signs, interface, and explicit markers.

Prefer a coherent set of cues to several competing attractions. Do not assume a bright light always wins attention, that one color always means safety, or that players must look where a screenshot composition points.

The source discusses certainty levels and the limits of guidance. Treat any percentages or informal rules as design heuristics, not validated universal probabilities.

### Decision-point audit

For each consequential choice, record:

1. What the player currently wants.
2. What they can perceive from their actual view.
3. Which options appear actionable.
4. What distinguishes their costs or meaning.
5. What feedback confirms progress or error.
6. How they recover if their interpretation is wrong.

### Exploration versus clarity

Do not remove uncertainty automatically. Ask:

- Is searching the intended activity?
- Does the player have enough information to form and revise a hypothesis?
- Is a wrong turn interesting, informative, or recoverable?
- Is the cost of being wrong appropriate?
- Does uncertainty concern the world, or merely an obscure interaction convention?

A discovery can be indirect without being arbitrary.

## 4. Plan a playtest around a question

A playtest is someone playing while the designer investigates whether the design works. Self-testing is necessary but cannot substitute for unfamiliar players.

Examples:

- Can an unfamiliar player identify the next usable route after opening the shortcut?
- Does a ranged enemy cause repositioning rather than indefinite waiting?
- Can a player recover after falling to the lower floor?
- Does a previously tested route remain legible after the art pass?

Define expected observable behavior and a result that would challenge the hypothesis. “Is it fun?” alone is too broad for a diagnostic test.

### Match the method to the question

- Silent observation can preserve natural behavior but leaves intentions uncertain.
- Think-aloud testing can reveal interpretation while changing attention and pacing.
- Free play exposes unexpected behavior.
- A focused task isolates a particular relationship.
- Instrumentation and recordings help locate events, but interpretation still needs context.

Choose deliberately. Do not combine every method in every session or treat an instrumented run as an unbiased view of all players.

### A session plan you can hand to a facilitator

For the relay station in the [layout state example](spatial-layout.md), use the following adapted plan before recruiting anyone. The sample size and time limit are starting choices for a small diagnostic test.

| Session field          | Filled plan                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| Question               | After finding the empty socket, does a first-time player recognize the gallery as a usable route?               |
| Build and reset        | Freeze one build and controller configuration; start at S, battery at B, shortcut closed                        |
| Participants           | Three people familiar with the controls but unfamiliar with this layout; record relevant experience             |
| Briefing               | Give controls and “restore power and leave”; do not name the gallery or show the route diagram                  |
| Stop rule              | Exit reached, 180 seconds elapsed, participant asks to stop, or a blocking defect prevents continuation         |
| Record                 | First turn at the junction after visiting the socket; route, interaction attempts, time, hints, and final state |
| Interpretation trigger | Repeated returns to the empty socket without trying the gallery call for a readability investigation            |

Keep a note row for every participant, including timeouts and broken runs. Use separate outcomes for unassisted completion, assisted completion, timeout, blocking defect, and withdrawal. If a tester requests help, record the exact prompt and split the trace at that point. Do not silently restart their clock and keep only the successful attempt.

A long return through the gallery can be a valid choice even if the shortcut is open. Ask afterward what the player thought the latch did; not using it does not by itself prove that they missed it. An automated agent reaching the exit checks a different claim: record its observation interface and budget, and keep that run separate from human wayfinding evidence.

## 5. Recruit and prepare

- Choose testers relevant to the intended audience and current question.
- Include unfamiliar players for onboarding and orientation questions.
- Use practiced players when testing advanced movement or competitive relationships.
- Record relevant prior experience rather than assuming a label explains behavior.
- Prepare a known build, controls, initial state, reset method, and observation tools.
- Obtain permission for recording or collecting identifiable information.

A **persona** is a provisional model of an audience and its conditions, not proof that real players behave that way. Include skills, familiarity, goals, constraints, and access needs only where they affect decisions. Update assumptions with actual evidence.

## 6. Facilitate without contaminating the result

Give the information a real player would receive. Avoid narrating the intended route, pointing at missed objects, apologizing, or defending choices.

If intervention is necessary:

- Record the exact time and reason.
- Separate behavior before and after assistance.
- Do not count the assisted outcome as unassisted success.

If using think-aloud, use neutral prompts rather than leading questions. Safety, accessibility, and participant comfort take priority over preserving a test.

## 7. Collect observations before explanations

Use separate fields:

- **Observed:** actions, location, time, state, repeated attempts.
- **Player statement:** what the participant actually said.
- **Interpretation:** a proposed explanation.
- **Confidence/alternatives:** what else could explain it.
- **Next test:** how to distinguish competing explanations.

**Illustrative note, not an observed session**

- Observed: the player crosses the courtyard twice and never enters the stair opening.
- Statement: “That looked like a wall detail.”
- Interpretation: the entrance silhouette may not read as a passage.
- Alternative: the objective may have directed attention elsewhere.
- Test: change only the opening's readability and repeat with an unfamiliar tester.

Do not convert “I got lost” directly into “add a minimap.”

## 8. Debrief and interpret

Ask open questions first:

- What did you think your goal was?
- Where did you believe you could go?
- What did you expect that object or route to do?
- Where did your interpretation change?
- What felt difficult, and what were you trying to do?

Player suggestions reveal needs but are not automatically the best implementation. Reconcile statements with behavior without dismissing either.

Prioritize issues by consequence, reproducibility, relevance to the goal, and evidence. Fix blocked progress, broken state, and misleading core rules before cosmetic preference.

## 9. Revise and retest

Prefer the smallest change that tests the explanation. Record build-to-build differences.

When evidence is uncertain, avoid changing route structure, lighting, rewards, signage, and enemy behavior simultaneously; that makes the cause hard to identify. Larger redesigns are appropriate when the underlying premise fails—just do not pretend they isolate one variable.

Retest:

- The original scenario.
- Alternate approaches and reverse traversal.
- Retry and persistence states.
- Interactions with combat, art, and performance.

## Reporting standard

Use the [playtest report template](../templates/playtest-report.md). State sample limitations and whether the conclusion is an observation, a supported explanation, or an untested hypothesis.

If no playtest occurred, provide a plan and label findings **expert walkthrough** or **hypothesis**, never “players did.”
