# Combat, Enemy Roles, Encounters, Cover, and Map Balance

Sources: [Combat](https://book.leveldesignbook.com/process/combat), [Enemy design](https://book.leveldesignbook.com/process/combat/enemy), [Encounter](https://book.leveldesignbook.com/process/combat/encounter), [Cover](https://book.leveldesignbook.com/process/combat/cover), [Map balance](https://book.leveldesignbook.com/process/combat/balance). Adapted and reorganized under CC BY-NC-SA 4.0.

## 1. Separate system design from encounter design

Combat systems define movement, aiming, attacks, damage, resources, defenses, enemy behavior, and feedback. An encounter arranges those capabilities in a particular situation.

If the core attack is unreadable or movement is unreliable, adding a better room may not solve the problem. Identify whether the failure belongs to the mechanic, the arrangement, or their interaction.

Before designing a fight, establish:

- Player movement and attack capabilities.
- Expected information and reaction opportunities.
- Enemy perception, reach, mobility, and failure states.
- Available health, ammunition, abilities, and replenishment.
- Intended difficulty, failure cost, and audience.

Numerical damage is only part of effective pressure. Exposure, accuracy, telegraphing, range, travel time, cover, and combined threats change the outcome.

## 2. Design enemies as legible relationships

A useful enemy role creates a reason to act differently. Roles might pressure distance, displace the player, deny a position, demand priority, punish exposure, or support another enemy.

For each role, specify:

- What the player can perceive before being punished.
- What action or situation the enemy encourages.
- Which weakness or counterplay can be learned.
- What changes when combined with other roles.
- How the level gives the behavior enough room to function.

Do not equate better AI with greater intelligence, omniscience, or maximum lethality. Behavior should support the intended experience and communicate state.

For stealth especially, distinguish sensing from interpretation. Suspicion, investigation, search, alert, and recovery need readable evidence and a workable information model. The exact implementation is project-specific.

## 3. Build encounters around a question

Use a compact encounter brief:

- Intended decision, feeling, or skill.
- Starting view, player state, and resources.
- Enemy roles, positions, patrols, and arrival conditions.
- Relevant geometry, height, cover, routes, and exits.
- Escalation, reinforcement, completion, failure, and reset conditions.
- Expected alternate approaches and possible exploits.
- Evidence that would show the encounter is working.

### Working sequence

1. Establish an entry view that communicates enough to act.
2. Give the first commitment a cost and an intelligible alternative.
3. Arrange enemy roles so their interaction matters.
4. Provide room for movement, recovery, or deliberate confinement.
5. Vary conditions where appropriate rather than only increasing counts.
6. Define what happens if the player retreats, bypasses, rushes, or returns.
7. Test with plausible incoming resources, not only a fully equipped author.

An “arena” is not automatically a circular room with a locked door. Confinement, spawning, and wave structures are choices that must serve the goal.

### Prototype a reason to leave cover

For an adapted shooter exercise, reuse one existing ranged enemy and one approaching enemy. The question is whether their positions make changing cover useful while leaving a readable retreat. This is a setup to test, not a report of player behavior.

Place a tall pillar beyond the entrance, a ranged guard across the room, and a side passage for the approaching enemy. Keep the entrance retreat open. Start each trial with the same weapon, health, ammunition, enemy settings, and enemy alert state; record those values from the actual project.

| Relationship           | Intended decision                                                    | First implementation check                                                              |
| ---------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Entrance to pillar     | Enter for a better angle while retaining retreat                     | The guard is visible before the player takes fire; the pillar actually blocks its shots |
| Pillar to guard        | Peek or change position to attack                                    | Camera safety and weapon-origin exposure agree with the intended cover behavior         |
| Side passage to pillar | Reposition when the approaching enemy threatens the current position | The enemy can traverse the passage and gives perceptible warning before attacking       |
| Retreat to entrance    | Recover or reconsider rather than become trapped                     | The player can back out; enemies follow or stop according to a defined rule             |

First run with only the guard, then only the approaching enemy, then both. A failed path or an enemy firing through the pillar is an implementation defect to fix before judging the combination. In the combined test, record first commitment, cover changes, damage source, retreat, and completion or failure. If players stay at the entrance, investigate whether it offers every needed attack angle; do not automatically increase enemy damage.

For a geometry comparison, change only the pillar or side-route relationship and retain the other settings. A scripted command that teleports the player to the next cover position cannot establish that a player could discover and traverse that route.

### Difficulty changes

Consider changing composition, placement, resources, information, timing, and behavior—not only health or damage. Verify that a change preserves the intended lesson and does not remove counterplay.

A difficult fight can be appropriate. Unclear causality, unavoidable damage, broken camera views, or excessive repetition may be a different problem.

## 4. Cover is a sightline and protection system

Cover includes any structure that blocks relevant sightlines or attacks; it is not limited to chest-high boxes or explicit cover mechanics.

Describe cover by what the actual game supports:

- Partial versus full occlusion.
- Standing versus crouched use.
- Hard protection versus concealment only.
- Penetrable, destructible, temporary, or movable behavior.
- Directionality, width, depth, edge exposure, and nearby movement options.

### Evaluate relationships, not object counts

- What can be seen and hit from each position?
- What becomes exposed while moving between positions?
- Does a protected spot create a decision or permit indefinite inactivity?
- Can enemies approach, flank, displace, or deny it in a readable way?
- Can both sides read the same silhouette and collision boundary?
- Does the camera imply safety while the hitbox or weapon origin remains exposed?

Adding cover everywhere can fragment sightlines, clutter movement, flatten long-range roles, or reduce urgency. Too little cover can remove tactical options. Neither density is universally correct.

### Diagnose a stalled cover fight

**Problem:** players never leave the first safe position.

**Trace:** that position sees all required targets, offers replenishment, and has no meaningful vulnerability; advancing only increases risk.

**Small intervention:** alter its view, resource access, objective relationship, or an enemy's readable pressure. Do not add arbitrary punishment merely to force movement.

**Test:** observe whether movement now creates a comprehensible advantage without eliminating useful defensive play.

## 5. Single-player challenge and multiplayer fairness differ

Single-player encounters can deliberately create asymmetry and authored pressure. Their success depends on the intended challenge, readability, resources, and recovery.

Competitive maps must consider rules, skill, team coordination, spawn behavior, resource economy, and changing control. A visually symmetric map can still be unfair; an asymmetric one can support balanced opportunities.

### Map-balance audit

| Relationship      | Questions                                                                       |
| ----------------- | ------------------------------------------------------------------------------- |
| Starts and spawns | Can a player orient before danger? Can opponents predict or trap spawns?        |
| Arrival timing    | Who reaches a contested item, angle, or objective first, under actual movement? |
| Sightlines        | Which ranges and weapons dominate? What does exposure cost?                     |
| Routes            | Are flanks usable, recognizable, and worth their travel cost?                   |
| Height            | What pays for information and attack advantages?                                |
| Resources         | Do rewards generate movement and contest, or reinforce permanent control?       |
| Chokes            | Do they create decisions or simply remove options?                              |
| Rotation          | Can players respond to changing objectives without one route always winning?    |
| Recovery          | Can the losing side meaningfully re-enter play?                                 |
| Population        | Does the map still work at its intended player count and mode?                  |

Do not impose a three-lane diagram, equal path lengths, or exact mirroring without a rule-specific reason.

### Timing worksheet

For a relevant route, measure:

- Spawn-to-contact.
- Spawn-to-objective/item.
- Rotation between objectives.
- Time exposed to a contested sightline.
- Respawn-to-reengagement.
- Resource and objective cycles.

Measure using representative players and movement options. Distance divided by top speed is only an approximation, not match evidence.

## 6. Test balance with context

Record map version, mode, player count, teams, experience, rules, and major events. Examine where advantage develops, not just the final winner.

Useful evidence includes:

- Side-swapped rounds.
- Repeated contested timings.
- Routes chosen and routes consistently ignored.
- Control, resource possession, deaths, and recovery patterns.
- Reports from both inexperienced and practiced players.

Win rates from a small uneven group do not prove a side advantage. Heatmaps can locate activity but cannot alone explain its cause.

Competitive skill also evolves. A once-uncontested relationship can change when a community discovers movement, tactics, or resource timing. Treat balance as a continuing inquiry.

### Run a paired arrival-time check

For a contested pickup, mark two spawn points and the pickup's activation boundary. Keep the mode, loadout, movement options, and start signal fixed. Have the same two testers run from opposite sides, exchange sides, then repeat the pair. Record tester, side, route, input/start timing, arrival event, and interruptions for every attempt; retain ties and failed traversals.

This adapted check asks whether an apparent side advantage follows the spawn or follows the tester. Measure with a shared clock or game event log, not two unsynchronized recordings. If the advantage follows one route after swapping testers, inspect its turns, exposure, and required movement before changing pickup placement. These short runs investigate arrival opportunity; they do not establish whole-match fairness.

## Deliverable

Provide an encounter or map hypothesis, annotated relationships, tested timings/states where available, and one prioritized change with a follow-up test. Do not claim “balanced” from a plan or a single match.
