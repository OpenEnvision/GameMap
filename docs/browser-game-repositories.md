# Browser game repositories to study and modify

Six browser game repositories spanning compact rules, persistent progression, puzzle animation and multiplayer matches. These complement GameMap's AI-associated examples as source-study projects; no AI-development attribution is made.

Reviewed **2026-10-22** using upstream README, gameplay code and license files. Links follow the branches reviewed below. This is a repository supplement; the exported website catalog is unchanged. Games were not built or playtested for this review.

| Game | Gameplay | Stack | Start |
| --- | --- | --- | --- |
| [2048](https://github.com/gabrielecirulli/2048) | Slide and merge numbered tiles toward 2048 | JavaScript, HTML and CSS | [Play](https://gabrielecirulli.github.io/2048/) |
| [Hextris](https://github.com/Hextris/hextris) | Rotate a hexagon to connect matching falling blocks | JavaScript, Canvas and jQuery | [README and demo link](https://github.com/Hextris/hextris/blob/gh-pages/README.md) |
| [A Dark Room](https://github.com/doublespeakgames/adarkroom) | Text adventure with resources and world exploration | JavaScript and DOM UI | [Play](https://adarkroom.doublespeakgames.com/) |
| [Suroi](https://github.com/HasangerGames/suroi) | Top-down multiplayer battle royale | TypeScript, PixiJS and Bun | [Play](https://suroi.io/) |
| [PokéRogue](https://github.com/pagefaultgames/pokerogue) | Turn-based roguelite fan game | TypeScript and Phaser | [Play](https://pokerogue.net/) |
| [Puzzling Potions](https://github.com/pixijs/open-games) | Match-3 puzzles and animated cascades | TypeScript and PixiJS | [Play](https://pixijs.io/open-games/puzzling-potions/) |

## 2048

[GameManager](https://github.com/gabrielecirulli/2048/blob/master/js/game_manager.js) connects directional input, board traversal, one-merge-per-tile rules, score, win/loss state, restart and save restoration. Rendering, input and storage are separate collaborators, making this a compact reference for changing a rule while retaining a complete play loop.

Start with the [README](https://github.com/gabrielecirulli/2048/blob/master/README.md) and the root [HTML entry](https://github.com/gabrielecirulli/2048/blob/master/index.html). The game is a static browser project. License: [MIT](https://github.com/gabrielecirulli/2048/blob/master/LICENSE.txt).

## Hextris

Rotate the central hexagon, connect at least three blocks of one color, and clear them before the stack crosses the outer boundary. [main.js](https://github.com/Hextris/hextris/blob/gh-pages/js/main.js) contains the instructions, saved-game restoration and game-over transition; [Hex.js](https://github.com/Hextris/hextris/blob/gh-pages/js/Hex.js) implements rotation and connected-block traversal. Useful for studying radial board coordinates, match detection and time-based combos.

The [README](https://github.com/Hextris/hextris/blob/gh-pages/README.md) links the author-hosted demo and describes maintenance as infrequent. The demo could not be fetched during this review because its HTTPS certificate had expired. The source is a static site on `gh-pages`, with an [HTML entry](https://github.com/Hextris/hextris/blob/gh-pages/index.html). License: [GPLv3 or later](https://github.com/Hextris/hextris/blob/gh-pages/LICENSE.md), as specified in the README.

## A Dark Room

A minimalist text adventure that expands from a room into resource management and an explorable world. [world.js](https://github.com/doublespeakgames/adarkroom/blob/main/script/world.js) connects map tiles, landmarks, limited food and water, encounters and travel state. It is a useful reference for revealing systems gradually and expressing a substantial game through text and interface state.

The [README](https://github.com/doublespeakgames/adarkroom/blob/main/README.md) links the browser game and translated editions. For local development, [package.json](https://github.com/doublespeakgames/adarkroom/blob/main/package.json) provides `npm start` after dependency installation, using the included Node development server. License: [MPL 2.0](https://github.com/doublespeakgames/adarkroom/blob/main/LICENSE.md).

## Suroi

- Repository: [HasangerGames/suroi](https://github.com/HasangerGames/suroi), `master`; [play](https://suroi.io/).
- A top-down multiplayer battle royale inspired by surviv.io. TypeScript, PixiJS and Vite on the client, with a Bun server. The authors describe ongoing development; the repository includes the actual client, shared rules and server.
- Read [server/src/game.ts](https://github.com/HasangerGames/suroi/blob/master/server/src/game.ts) for match startup, living players/teams, shrinking-gas progression and winner detection. [Client game code](https://github.com/HasangerGames/suroi/blob/master/client/src/scripts/game.ts) connects PixiJS rendering, input, camera, UI and networked game objects.
- Useful for studying a complete multiplayer match lifecycle and the split between rendered client state and server game rules.
- Run: the [README](https://github.com/HasangerGames/suroi/blob/master/README.md) documents `bun install`, then `bun dev`; open `http://127.0.0.1:3000`. Both client and server must run. Build scripts are in [package.json](https://github.com/HasangerGames/suroi/blob/master/package.json).
- License: [GPL 3](https://github.com/HasangerGames/suroi/blob/master/LICENSE).

## PokéRogue

- Repository: [pagefaultgames/pokerogue](https://github.com/pagefaultgames/pokerogue); [play](https://pokerogue.net/). Reviewed source links use `main`; the repository's default development branch is `beta`.
- A Pokémon-themed roguelite fan game with successive battles, stacking items, varied biomes, trainers and bosses. Built in TypeScript with Phaser and Vite.
- Read [battle-scene.ts](https://github.com/pagefaultgames/pokerogue/blob/main/src/battle-scene.ts) for scene, party, encounter and modifier state, then [victory-phase.ts](https://github.com/pagefaultgames/pokerogue/blob/main/src/phases/victory-phase.ts) for experience awards and progression after defeating opponents.
- Useful for studying phase-driven turn-based combat, data-heavy content and regression tests for interacting abilities and moves.
- Run: [CONTRIBUTING.md](https://github.com/pagefaultgames/pokerogue/blob/main/CONTRIBUTING.md) describes Node/pnpm setup, a checkout with asset/localization submodules, `pnpm install` and `pnpm start:dev` at `localhost:8000`; it also points to the test suite and phase-system documentation.
- License: [README licensing section](https://github.com/pagefaultgames/pokerogue/blob/main/README.md#licensing) identifies AGPL 3.0-only code; documentation and supplied assets have separate terms and credits. This is a fan game, and the code license does not describe every asset.

## Puzzling Potions

- Repository: [pixijs/open-games](https://github.com/pixijs/open-games), `main`, specifically the [puzzling-potions game](https://github.com/pixijs/open-games/tree/main/puzzling-potions); [play](https://pixijs.io/open-games/puzzling-potions/).
- A complete match-3 learning game with special pieces, scoring, timed play, screens/popups and saved best scores. TypeScript with PixiJS and its sound, UI and asset tools.
- Read [Match3.ts](https://github.com/pixijs/open-games/blob/main/puzzling-potions/src/match3/Match3.ts) for board, action, timer, score and special-piece coordination, then [Match3Process.ts](https://github.com/pixijs/open-games/blob/main/puzzling-potions/src/match3/Match3Process.ts) for queued matching, clearing, gravity and refilling cascades.
- Useful for studying how puzzle logic and asynchronous animations remain coordinated across a playable game loop.
- Run: in the checkout's `puzzling-potions/` folder, follow its [README](https://github.com/pixijs/open-games/blob/main/puzzling-potions/README.md): `npm install`, `npm run start`; `npm run build` creates `dist/`.
- License: [MIT](https://github.com/pixijs/open-games/blob/main/LICENSE). The game README separately limits reuse of the linked Figma design/assets; it is a design reference, not a blanket asset grant.
