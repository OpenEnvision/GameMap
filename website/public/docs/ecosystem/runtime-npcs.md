# Design and evaluate runtime NPCs

A guard sees the player, follows them to a shut door, and gets stuck running into it. Decide what the guard should do before you choose an AI tool. Should it wait, look for another route, or give up and go back to its post? Later in this guide, a different NPC helps the player find a way through a small level.

## Choose the smallest useful system

| Player-facing need | Starting point | What to verify |
| --- | --- | --- |
| Predictable patrols, combat telegraphs or quest progression | Authored state machine, behavior tree or utility rules | Reachable states, readable cues, repeatable transitions and recovery |
| Natural phrasing or optional questions about game lore | Authored quest state with generated responses grounded in approved facts | Consistency with the current state, supported languages, latency and a usable authored fallback |
| Longer-horizon social or tactical decisions | Planner or learned policy that proposes a bounded action | Scenario success, state validity, recovery under disturbances and cost per episode |

Use a small authored baseline first. Epic's [behavior tree documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/behavior-trees-in-unreal-engine) gives one engine implementation using decision branches and blackboard state. Park and colleagues' [Generative Agents](https://arxiv.org/abs/2304.03442) studies memory, planning and reflection in a social sandbox. Its believability results motivate ablations for a similar research question. Quest integrity and shipping budgets require their own evidence.

For the guard, sketch patrol, chase, search, and return. At the closed door, let a failed route or a short movement timeout send it to search or return. Check three situations in the same room: the door closes while it is chasing, the player comes back into view, and the guard reaches its post again. If those transitions are all the design calls for, keep the policy authored. Add a planner when choosing among several routes or goals is the mechanic you want to vary.

## Keep world state authoritative

In the guide-NPC exercise, the engine supplies the current route availability, quest stage and knowledge the NPC may reveal. The policy returns an authored hint ID, a safe waypoint request, or no action. Validate each proposal against the current snapshot and check again at commit. The engine owns navigation, rewards, door state and saved progress. Optional generated wording is a separate output with its own content checks.

| Condition | Expected behavior | Observable check |
| --- | --- | --- |
| Route blocked | Offer a reachable alternative from the current quest state | No locked route is marked traversable |
| Player leaves or reloads mid-request | Discard the stale response or recreate the request for the new state | No old hint or waypoint appears after the new session starts |
| Invalid action or timeout | Show the authored hint and let the player continue | The fallback appears within the budget and progress stays available |
| Same request delivered twice | Apply any game effect once using a request identity | The event log has one committed effect and the saved state agrees |
| Unapproved, off-topic or unsupported-language output | Use a localized authored response or offer the supported interaction | The displayed result stays within the approved experience |

Review [gameplay state and durable effects](../evaluation/gameplay-state.md) for save, replay and transaction boundaries. If a remote policy is involved, budget requests per encounter and define data retention, player-visible service failure, and who can switch off the live path. Test the offline or scripted path using the same build.

## Compare behavior under the same conditions

Write the claim before collecting examples. A concrete hypothesis is that variable wording helps players identify the right route without increasing false hints or breaking the interaction when the service times out. Compare authored hints with the same hints expressed by a generator while holding the level, quest logic and fallback fixed. Test a planning change separately with its own baseline.

Keep fixture states for first visit, blocked route, resumed save, and interrupted request. Use the same scenario IDs, time limits and allowed observations for both variants. Freeze the build, content snapshot, policy settings and grader. Separate prompts used to tune the feature from held-out cases. Store versioned inputs and redacted outputs so failures can be inspected later.

Record mission success and state violations separately from human ratings for clarity and character consistency. Include unassisted completion, timeout and fallback rates, response latency percentiles, cost per completed interaction and the number of trials behind each value. Have raters use the same questions and avoid revealing the system when feasible. Treat playtest observations as qualitative evidence when the sample is small. Follow the [development evaluation guide](../evaluation/development-evaluation.md) for choosing evidence and reporting limitations.
