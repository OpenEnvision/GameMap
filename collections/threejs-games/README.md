# Direct Three.js 3D games

[Machine-readable index](games.json) · [Source evidence](evidence/batch-001.md) · [Candidate and exclusion queue](candidates.json) · [Schema](schema.json) · [Validator](validate.py)

This focused collection currently contains **12 source-verified games** (reviewed 2026-10-21). **None were built or playtested in this review.** Ten repositories were not mentioned in the existing root README; HexGL and YAZH receive normalized, pinned evidence here rather than being counted as new projects across GameMap.

“Direct Three.js” means the game itself creates a Three.js WebGLRenderer or WebGPURenderer and uses Three.js as its rendering core. Physics libraries, build tools, networking and DOM UI are allowed and disclosed. Vue/Svelte DOM UI appears in some entries. React Three Fiber, A-Frame, Babylon.js, Unity and comparable rendering/engine layers are excluded. A tutorial snippet, non-game scene, unavailable source, or unproven stack is insufficient. Public source with a restrictive non-open license is excluded.

The dimension field separates 3D worlds, 3D board games, cylindrical puzzles and perspective-alignment puzzles. Board rules and planar physics can coexist with real 3D scenes; flat games with only an optional 3D viewer remain in the candidate queue. Consumers needing spatial movement can filter to `3d-world`.

| Game | Genres | 3D scope | Code license | Maturity | Demo check |
| --- | --- | --- | --- | --- | --- |
| [HexGL](https://github.com/BKcore/HexGL) | racing, time-trial | 3d-world | MIT | legacy-release | [author link](https://hexgl.bkcore.com/play/) — page-read |
| [Super Kart 3D.js](https://github.com/fecolinhares/super-kart-3djs) | racing, kart | 3d-world | MIT | game | [author link](https://fecolinhares.github.io/super-kart-3djs/) — page-read |
| [Tower Defense (djpav)](https://github.com/djpav/threejs-tower-defense) | strategy, tower-defense | 3d-world | MIT | game | [author link](https://djpav.github.io/threejs-tower-defense/) — reader-error |
| [Mastermind 3D](https://github.com/joeseesun/mastermind-3d) | puzzle, board-game, deduction | 3d-board | MIT | game | [author link](https://mastermind.qiaomu.ai) — reader-error |
| [PuzzleCylinder](https://github.com/JakeSiegers/PuzzleCylinder) | puzzle, match-3, arcade | 3d-cylinder | MIT | legacy-release | [author link](https://jakesiegers.github.io/PuzzleCylinder/) — page-read |
| [Racez.io](https://github.com/MankyDanky/web-racing) | racing, multiplayer | 3d-world | MIT | game | [author link](https://racez.io) — reader-error |
| [TD (Project Trio)](https://github.com/project-trio/td) | strategy, tower-defense, multiplayer | 3d-world | ISC | prototype | [author link](https://ttd.netlify.com) — reader-error |
| [Yet Another Zombie Horror](https://github.com/UstymUkhman/YetAnotherZombieHorror) | shooter, first-person, third-person, survival | 3d-world | MIT | archived-prototype | not-located |
| [Perspectives](https://github.com/juanuys/perspectives) | puzzle, spatial-alignment | 3d-perspective | MIT | prototype | [author link](https://juanuys.com/perspectives) — page-read |
| [Glory Box](https://github.com/vanrez-nez/glory-box-game) | platformer, action | 3d-world | MIT | work-in-progress | [author link](https://glory-box-game-rhig-ivan-juarezs-projects.vercel.app) — reader-error |
| [Astray](https://github.com/wwwtyro/Astray) | puzzle, maze, ball-rolling | 3d-world | Unlicense | legacy-release | [author link](https://wwwtyro.github.io/Astray/) — page-read |
| [Harvest](https://github.com/JamesLMilner/Harvest) | platformer, first-person | 3d-world | MIT | legacy-prototype | [author link](http://www.loxodrome.io/Harvest/index.html) — reader-error |

A `page-read` result only means the web reader returned an HTML document. It does not prove that scripts, WebGL/WebGPU, controls, assets or multiplayer work. `reader-error` means this reader could not retrieve the URL; it does not prove the site is down. `not-located` means the reviewed primary sources did not yield a live play URL. Demo checks and source commits are dated separately from any future runtime tests.

Code license is taken from the linked repository license file. Asset and vendored-library exceptions are recorded when found, including HexGL audio. A code license is not a blanket asset license. No third-party source code or assets are copied into this collection.

Run lightweight local checks with Python 3:

```sh
python3 collections/threejs-games/validate.py
```

The dependency-free validator checks the JSON schema subset used here, required fields, unique canonical repository URLs/IDs, pinned evidence URLs, local evidence anchors, dates, excluded renderer dependencies in manifest snapshots and queue/index overlap. Network link reads are recorded in per-entry evidence; the validator itself does not claim network or gameplay testing.

For each increment, read the latest remote main, all open PRs and the current index/queue first. Use a fresh branch after a PR is merged; do not append to a merged branch or reopen superseded research. Add reviewed facts, update queue decisions and run the validator before opening/updating a PR. Preserve existing GameMap content, do not merge or deploy, and do not restore content from before the user's reset. The current series began from main `5d4de4f2984a8c1df1c6818b044a70c7080d085d`.
