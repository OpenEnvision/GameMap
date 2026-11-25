# Verify a game release candidate

A last-minute fix produces a new release candidate, even if its filename stays the same. The team's decision is which evidence still applies and which player paths must run again. For a small team, work from one supported platform and one core loop, keeping the exact installable build with its checks before repeating the gate for other targets.

## Identify the exact build

Record the source commit, engine and export template versions, preset, target OS and architecture, dependencies, and resulting artifact checksum. Store the install instructions and release notes beside the artifact. Keep signing credentials and production secrets outside the package and build log.

For the [Fuse Courier exercise](../guides/practical-guide.md), export from a clean checkout using the installed Godot version and matching export templates. Name the preset and include the executable and any separate data pack. Godot distinguishes a playable project export from exporting project data alone. Use the [Godot export documentation](https://docs.godotengine.org/en/stable/tutorials/export/exporting_projects.html) for the actual preset and platform instructions.

## Exercise the player install and update paths

| Gate | Test on the candidate | Retain |
| --- | --- | --- |
| Fresh install | Install from the distribution path on a clean profile. Launch, play one complete loop, return to menu, relaunch and uninstall. | Artifact hash, target device and OS, log, and expected and observed result |
| Update and saves | Load a copy of a real save from the supported previous build. Update, resume from the expected state, then test recovery with a separate copy. | Save schema versions, original fixture, migration result and recovery steps |
| Input and presentation | Navigate menus with each promised input device. Check focus, remapping if supported, text size, captions where applicable, and critical cues without color or audio alone. | Platform, input, locale, viewport and failing screen or interaction |
| Performance | Use a repeatable worst-case scene on a target device. Log warm-up, capture window, frame time distribution and memory peak. | Scene or replay, settings, hardware, sample count and thresholds agreed before capture |
| Failure and recovery | Interrupt a supported online dependency or suspend and resume the game. For an offline game, verify the core loop with networking unavailable. | Observed error, player-facing recovery, duplicate or lost effects, and reopen result |
| Packaging and claims | Check the shipped package, credits and store materials against the candidate. Verify that the build contains the features and platform support being advertised. | Build contents, source and license ledger, and screenshot or clip IDs from the candidate |

For a first Fuse Courier release candidate, pick one clean launch, one win, both loss states, pause and resume, three consecutive retries, and quit and relaunch. Record “not applicable” for saves or networking only when the game has no corresponding feature. Use the [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines) to derive appropriate input, caption and visual cue checks. For larger projects, add a separate device, input and locale matrix.

## Close source and distribution gaps

For each shipped asset or service, keep its source, version or generation record, permitted use, required notices, and owner. Track source code, models, textures, fonts, voices, music and runtime services separately. Capture the actual terms for each provider and review unresolved items before submission. See [asset API terms](../assets/api-terms.md) and [asset validation](../assets/validation.md).

For Steam, check the current [build and store review](https://partner.steamgames.com/doc/store/review_process) and [Content Survey](https://partner.steamgames.com/doc/gettingstarted/contentsurvey) for the build you intend to submit. Steam distinguishes player-facing AI content produced during development from AI-generated content produced while the game runs. Record the shipped content and relevant runtime controls against the current survey. An internal sign-off and a store review answer different questions.

Before submission, let someone other than the builder follow the install instructions through the actual distribution channel. Steam's [review guidance](https://partner.steamgames.com/doc/store/review_process) explicitly asks for a fresh install through Steam and checks advertised supported features. It also distinguishes captions for non-verbal audio from dialogue subtitles. Use a short reviewer route that shows where each claimed feature is reached; a menu checkbox or a store screenshot cannot establish that the packaged feature works.

When a late fix arrives, attach its changed files and affected dependencies to the candidate decision. A font or layout change sends the relevant locales, text sizes and menu focus paths back to presentation QA. A collision or scene change sends the affected gameplay route back to the gameplay owner. A save-schema change reopens migration and recovery against supported prior saves; a packaging change reopens channel install and clean launch. Preserve unchanged results with their old build identity and record why they remain applicable, rather than relabeling them as runs on the new artifact. If the responsible owner cannot bound the impact, widen the affected checks before signing off.

## Make the release decision explicit

Assign an owner for each gate, record pass, fail, or untested, and attach the evidence. Agree up front what blocks release. For a small game, failed clean launch, unrecoverable saves, a blocked required input path, and unresolved shipped-asset rights are practical blockers. Retest fixes on a new candidate and link the previous failure. For an update, name the last known good build and verify the recovery plan against the save and server versions before rollout.

Keep the build ID, source commit, artifact hash, test matrix, blockers and owner, submission checklist, and recovery instructions together. A capture can show how the candidate looked. The exact build and test steps let someone else verify what it did. Use the [production work orders](./work-orders.md) when packaging, deployment or patch operations need independent evidence.
