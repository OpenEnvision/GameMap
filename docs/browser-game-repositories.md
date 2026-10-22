# Small browser games to study and modify

Three complete browser game repositories with short routes from input to rules, UI and saved state. These complement GameMap's AI-associated examples as source-study projects; no AI-development attribution is made.

Reviewed **2026-10-22** using upstream README, gameplay code and license files. Links follow the branches reviewed below. This is a repository supplement; the exported website catalog is unchanged. Games were not built or playtested for this review.

| Game | Gameplay | Stack | Start |
| --- | --- | --- | --- |
| [2048](https://github.com/gabrielecirulli/2048) | Slide and merge numbered tiles toward 2048 | JavaScript, HTML and CSS | [Play](https://gabrielecirulli.github.io/2048/) |
| [Hextris](https://github.com/Hextris/hextris) | Rotate a hexagon to connect matching falling blocks | JavaScript, Canvas and jQuery | [README and demo link](https://github.com/Hextris/hextris/blob/gh-pages/README.md) |
| [A Dark Room](https://github.com/doublespeakgames/adarkroom) | Text adventure with resources and world exploration | JavaScript and DOM UI | [Play](https://adarkroom.doublespeakgames.com/) |

## 2048

[GameManager](https://github.com/gabrielecirulli/2048/blob/master/js/game_manager.js) connects directional input, board traversal, one-merge-per-tile rules, score, win/loss state, restart and save restoration. Rendering, input and storage are separate collaborators, making this a compact reference for changing a rule while retaining a complete play loop.

Start with the [README](https://github.com/gabrielecirulli/2048/blob/master/README.md) and the root [HTML entry](https://github.com/gabrielecirulli/2048/blob/master/index.html). The game is a static browser project. License: [MIT](https://github.com/gabrielecirulli/2048/blob/master/LICENSE.txt).

## Hextris

Rotate the central hexagon, connect at least three blocks of one color, and clear them before the stack crosses the outer boundary. [main.js](https://github.com/Hextris/hextris/blob/gh-pages/js/main.js) contains the instructions, saved-game restoration and game-over transition; [Hex.js](https://github.com/Hextris/hextris/blob/gh-pages/js/Hex.js) implements rotation and connected-block traversal. Useful for studying radial board coordinates, match detection and time-based combos.

The [README](https://github.com/Hextris/hextris/blob/gh-pages/README.md) links the author-hosted demo and describes maintenance as infrequent. The demo could not be fetched during this review because its HTTPS certificate had expired. The source is a static site on `gh-pages`, with an [HTML entry](https://github.com/Hextris/hextris/blob/gh-pages/index.html). License: [GPLv3 or later](https://github.com/Hextris/hextris/blob/gh-pages/LICENSE.md), as specified in the README.

## A Dark Room

A minimalist text adventure that expands from a room into resource management and an explorable world. [world.js](https://github.com/doublespeakgames/adarkroom/blob/main/script/world.js) connects map tiles, landmarks, limited food and water, encounters and travel state. It is a useful reference for revealing systems gradually and expressing a substantial game through text and interface state.

The [README](https://github.com/doublespeakgames/adarkroom/blob/main/README.md) links the browser game and translated editions. For local development, [package.json](https://github.com/doublespeakgames/adarkroom/blob/main/package.json) provides `npm start` after dependency installation, using the included Node development server. License: [MPL 2.0](https://github.com/doublespeakgames/adarkroom/blob/main/LICENSE.md).
