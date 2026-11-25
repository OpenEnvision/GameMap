# Level Review Template

Adapted working template for the level-design skill; not a form reproduced from the book. CC BY-NC-SA 4.0.

## Scope

- Artifact / version:
- Intended experience and audience:
- Material inspected: build / recording / plan / screenshots / code
- Direct play performed?:
- Test evidence available?:
- Constraints and assumptions:
- What cannot be assessed from this material:

## Strengths to preserve

List specific relationships, not generic praise.

- Relationship:
- Concrete evidence:
- Why it supports the goal:

## Findings

Repeat for each material issue.

### [Priority] Short problem statement

**Problem:** What prevents or weakens the intended experience?

**Concrete trace:** Where, when, and under which state? What did the reviewer observe? Distinguish observation from inference.

**Example / reproduction:** A short sequence another person can follow.

**Smallest useful change:** A specific intervention, with the relationship it changes.

**Why necessary:** Explain the failure this addresses. Separate required correction from optional polish.

**Tradeoff:** What could become worse or more expensive?

**Validation:** Who should do what, under which conditions, and what evidence would support the change?

**Confidence / limitations:** Directly observed / supported inference / untested hypothesis.

## Review lenses

Use only relevant lenses:

- Intent, scope, and progression.
- Movement, camera, scale, and collision.
- Circulation, verticality, gates, and retries.
- Combat roles, information, cover, and resources.
- Multiplayer timing, control, and recovery.
- Wayfinding and learned visual conventions.
- Script state, interruption, and persistence.
- Lighting, materials, story, and readability.
- Performance and streaming.
- Packaging, dependencies, credits, and access.
- Cultural context and intended social use.

## Next iteration

1. Highest-impact change:
2. Evidence needed:
3. Regression checks:
4. Deferred/optional work:

Do not add features merely to make the review appear comprehensive. If the artifact cannot establish a claim, state the limitation and propose a test.

## Example finding: an entrance that reads as a recess

This GameMap example follows the hypothetical `relay_v01/P01` entry in the [playtest report](playtest-report.md). It demonstrates a change request; it is not a finding from an actual test.

| Finding field             | Example entry                                                                                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Priority                  | Investigate next iteration. A progression blocker has not been established.                                                                                                                                |
| Problem                   | The C entrance may not read as a traversable continuation from J.                                                                                                                                          |
| Concrete trace            | In the illustrative session, the player visits G twice without entering C. There is no recorded explanation from the player.                                                                               |
| Reproduction / inspection | Open the named build at J after visiting G, with no cell. Inspect C from the actual player camera, then walk through it. This checks geometry and the viewpoint, not an unfamiliar player's understanding. |
| Smallest useful change    | Extend the walkable floor treatment through the C opening. Keep controller settings, corridor dimensions, socket text, and all gate rules fixed.                                                           |
| Tradeoff                  | Stronger route emphasis may reduce the intended uncertainty of exploration; a floor change may also affect material contrast elsewhere.                                                                    |
| Validation                | Test the revised build with a new player using the same goal and initial state. Record the first route chosen after G. Also traverse the long return and shortcut and reset the cell/gates.                |
| Confidence / limitation   | Entrance readability is a hypothesis. The alternative explanation, an unclear cell-search goal, remains open.                                                                                              |

Assign priority from the consequence and evidence. A reproducible gate softlock requires correction before delivery. A single hesitation usually calls for investigation. Keep the successful relationships named in Strengths to preserve, and request only the files or scene objects needed for the chosen intervention.
