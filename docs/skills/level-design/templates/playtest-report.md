# Playtest Report Template

Adapted working template for the level-design skill; not a form reproduced from the book. CC BY-NC-SA 4.0.

## Test identity

- Date / session:
- Level and build version:
- Platform, settings, input:
- Participants and relevant experience:
- Recording/data permission:
- Initial resources and progression state:
- Mode / player count / team composition:
- Facilitator:
- Method: silent / think-aloud / focused task / free play / other

## Question and prediction

- Design hypothesis:
- Expected observable behavior:
- Result that would challenge it:
- Proposed criterion and rationale:
- Important confounding factors:

Do not rewrite these after observing results without marking the change.

## Observations

| Time / location / state | Observed behavior | Player statement | Assistance / intervention |
| ----------------------- | ----------------- | ---------------- | ------------------------- |
|                         |                   |                  |                           |

Keep interpretations out of the observation column. Indicate exact versus approximate times.

## Interpretation

| Observation | Proposed explanation | Alternative explanation | Confidence / limitation | Follow-up test |
| ----------- | -------------------- | ----------------------- | ----------------------- | -------------- |
|             |                      |                         |                         |                |

## Outcomes

- Goal completed? Under which conditions?
- Route and decisions:
- Failure / retry / assistance:
- Resource or timing evidence:
- Unexpected behavior:
- Relevant player debrief:
- What remains unknown:

Report counts and sample context, not unsupported population percentages.

## Prioritized changes

| Priority | Problem and concrete reproduction | Smallest useful change | Expected effect | Validation |
| -------- | --------------------------------- | ---------------------- | --------------- | ---------- |
|          |                                   |                        |                 |            |

## Regression checks

Select relevant cases:

- Original scenario.
- Alternate route and reverse traversal.
- Death, restart, save/load, and returning.
- Companion / AI navigation.
- Multiplayer or mode variants.
- Art, collision, and performance.

## Conclusion

- Supported observations:
- Interpretation supported by current evidence:
- Remaining hypotheses:
- Next build and test:
- Execution status: not run / expert walkthrough / recorded playtest

If no participant played, use a test plan or walkthrough report. Never fill this template with invented player observations.

## Follow one session through the form

Before the session, copy the question and prediction from the [brief](level-brief.md), assign a session ID, and save that plan. During play, take short notes at decision points; expand them against the recording afterward and mark approximate times. Keep the raw recording or notes under the same session ID.

The following is a hypothetical formatting example for `relay_v01/P01`, not collected data. The question is whether a new player enters gallery C after inspecting socket G.

| Time / location / state         | Observed behavior                                                        | Player statement       | Assistance / intervention           |
| ------------------------------- | ------------------------------------------------------------------------ | ---------------------- | ----------------------------------- |
| Approximately 00:30; J; no cell | Stopped at J, turned toward G, then walked back to G without entering C. | No statement recorded. | None in this illustrative sequence. |
| Approximately 00:55; G; no cell | Inspected the socket again, then returned to J.                          | No statement recorded. | None in this illustrative sequence. |

These entries would support asking why C was missed. They would not establish that the player was bored, that the route was impossible, or that the task ended in failure. Record completion, timeout, assistance, or a technical stop separately under Outcomes. A possible interpretation is that C looked like a recess; an alternative is that the socket did not communicate the cell-search goal. The [review](review.md) turns this uncertainty into one proposed change and a new test.

For a real report, replace the example with actual events. Retain every scheduled session, including incomplete and assisted attempts. If a gameplay agent is the participant, add its model/client versions, observation and action interface, reset/seed, and action/time budget to Test identity; record the termination reason for each episode. Keep these runs separate from human route-understanding tests.
