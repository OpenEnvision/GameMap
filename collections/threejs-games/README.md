# Direct Three.js 3D games

[Machine-readable index](games.json) · [Source evidence](evidence/README.md) · [Candidate and exclusion queue](candidates.json) · [Schema](schema.json) · [Validator](validate.py)

This focused collection currently contains **152 source-verified games** (source reviews 2026-10-21 through 2026-10-24). **None were built or playtested in this review.** 150 repositories were not mentioned in the existing root README; 2 previously mentioned repositories (Yet Another Zombie Horror, TIDELINE) receive normalized, pinned evidence here rather than being counted as new projects across GameMap. HexGL is now pending because its active code retains noncommercial headers despite the root MIT file. [License correction and primary evidence](evidence/license-review-001.md).

“Direct Three.js” means the game itself creates a Three.js WebGLRenderer or WebGPURenderer and uses Three.js as its rendering core. Physics libraries, build tools, networking and DOM UI are allowed and disclosed. React/Vue/Svelte/Preact DOM UI appears in some entries. React Three Fiber, A-Frame, Babylon.js, Unity and comparable rendering/engine layers are excluded. A tutorial snippet, non-game scene, unavailable source, or unproven stack is insufficient. Public source with a restrictive non-open license is excluded.

The dimension field separates 3D worlds, 3D board games, cylindrical puzzles and perspective-alignment puzzles. Board rules and planar physics can coexist with real 3D scenes; flat games with only a detached or explicitly experimental 3D viewer remain in the candidate queue. A selectable 3D game mode can qualify when its normal controls, rendering and input operate on the active rules and objectives. These labels describe the rendered scene or board, not movement freedom: `3d-world` also includes planar simulation or constrained movement. Check each entry's limitations for motion scope; the label alone does not establish free 3D navigation.

| Game | Genres | 3D scope | Code license | Maturity | Demo check |
| --- | --- | --- | --- | --- | --- |
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
| [APEX FORMULA 2026](https://github.com/ahacker-1/apex-formula-2026) | racing, simulation, time-trial | 3d-world | Apache-2.0 | game | [author link](https://apex-formula-2026.vercel.app) — page-read |
| [Tower of Hanoi 3D](https://github.com/anisches/towerofHanoi) | puzzle, board-game | 3d-board | MIT | work-in-progress | [author link](https://anisches.github.io/towerofHanoi/) — reader-error |
| [Neon Doom Pit](https://github.com/PaulAtkins88/neon-doom-pit) | shooter, first-person, arena, survival | 3d-world | MIT | prototype | [author link](https://paulatkins88.github.io/neon-doom-pit/) — reader-error |
| [Island Survival](https://github.com/alexandrosang21/island-survival) | survival, crafting, building, action | 3d-world | MIT | work-in-progress | [author link](https://forest.angelov.gr) — reader-error |
| [Minecraft Adventure](https://github.com/JasonTM17/Minecraft_Adventure) | survival, voxel, adventure, building | 3d-world | MIT | game | not-located |
| [Stick & Steel](https://github.com/Rabneba/stick-steel) | fighting, dueling, physics, multiplayer | 3d-world | MIT | prototype | [author link](https://genex.games/stick-steel) — page-read |
| [Skyward](https://github.com/arjunemirchandani/skyward-flight-simulator) | flight, simulation, missions, time-trial | 3d-world | MIT | game | [author link](https://arjunemirchandani.github.io/skyward-flight-simulator/) — reader-error |
| [Voxel Musou](https://github.com/mike007jd/voxel-musou) | action, hack-and-slash, third-person, survival | 3d-world | MIT | game | [author link](https://voxel-musou.vercel.app) — reader-error |
| [Drone World / SimDrone](https://github.com/realEdwinJ/SimDrone) | flight, racing, delivery, simulation | 3d-world | MIT | game | not-located |
| [Orbit Golf](https://github.com/ronpicard/orbit-golf) | sports, mini-golf, puzzle, physics | 3d-world | MIT | game | [author link](https://ronpicard.github.io/orbit-golf/) — reader-error |
| [Vesper Street](https://github.com/winchxyz/vesper-street) | horror, survival, adventure | 3d-world | MIT | game | [author link](https://winchxyz.github.io/vesper-street/) — reader-error |
| [Liminality](https://github.com/IronExcavater/threejs-liminality) | horror, first-person, maze, puzzle | 3d-world | MIT | prototype | not-located |
| [Deep in the Graveyard](https://github.com/andykswong/ld48) | roguelite, turn-based, survival, puzzle | 3d-world | MIT | prototype | [author link](https://andykswong.itch.io/ld48) — page-read |
| [Snake Charmer](https://github.com/andrenanninga/ludum-dare-40) | arcade, snake, dungeon | 3d-world | MIT | legacy-prototype | [author link](https://fakeyou.github.io/ludum-dare-40/) — reader-error |
| [Bowling](https://github.com/iliagrigorevdev/bowling) | sports, bowling, physics | 3d-world | GPL-3.0 (only/or-later variant unconfirmed) | game | [author link](https://iliagrigorevdev.github.io/bowling/) — page-read |
| [Journey to the Center of the Hole](https://github.com/dvcolgan/ludumdare29) | survival, first-person, falling, arcade | 3d-world | MIT | legacy-prototype | not-located |
| [3D Platformer Game (Dan Art Projects)](https://github.com/Dan-Art-Projects/3d-platformer-three) | platformer, action | 3d-world | MIT | prototype | not-located |
| [Arena](https://github.com/Hazzad123/fully-ai-arena-fps) | shooter, first-person, multiplayer, arena | 3d-world | MIT | prototype | [author link](https://arena-8g34.onrender.com) — reader-error |
| [WizardWarz](https://github.com/Lallassu/wizardwarz) | shooter, fantasy, multiplayer, action | 3d-world | MIT | legacy-prototype | [author link](http://wizardwarz.nergal.se) — reader-error |
| [Earth Defender](https://github.com/alexprut/earth-defender) | shooter, space, multiplayer | 3d-world | MIT | legacy-prototype | [author link](https://alexprut.github.io/earth-defender/) — reader-error |
| [CouchCourt](https://github.com/kuehn-lars/CouchCourt) | sports, tennis, motion-control, local-multiplayer | 3d-world | MIT | prototype | not-located |
| [Spin Table Tennis](https://github.com/huangluke89757/spin-table-tennis) | sports, table-tennis, arcade | 3d-world | MIT | game | [author link](https://spin-pingpong.app.workbuddy.host/) — reader-error |
| [Nyan-Cororin](https://github.com/imshota1009/Nyan-Cororin) | platformer, ball-rolling, physics, motion-control | 3d-world | MIT | game | [author link](https://nyan-cororin-game-app.web.app/) — reader-error |
| [VANTAGE](https://github.com/suncal/vantage) | puzzle, spatial-alignment, daily | 3d-perspective | MIT | game | [author link](https://suncal.github.io/vantage/) — reader-error |
| [Marble Maze](https://github.com/danielmroczek/marble-maze) | puzzle, maze, ball-rolling | 3d-board | MIT | game | [author link](https://danielmroczek.github.io/marble-maze/) — reader-error |
| [Galactic Recruit Pinball](https://github.com/DaedalusApps/GalacticRecruitPinball) | arcade, pinball, physics | 3d-world | MIT | prototype | not-located |
| [Floppy Defense](https://github.com/N-THEM-Studio/floppy-defense) | strategy, tower-defense | 3d-world | MIT | prototype | not-located |
| [TrollTower](https://github.com/danielesteban/trolltower) | climbing, multiplayer, webxr, physics | 3d-world | MIT | legacy-release | [author link](https://trolltower.app/) — reader-error |
| [Bombanauts](https://github.com/Bombanauts/Bombanauts) | action, arena, multiplayer, bombing | 3d-world | MIT | legacy-prototype | [author link](http://bombanauts.herokuapp.com/) — reader-error |
| [Temple Rumble](https://github.com/dammafra/temple-rumble) | action, survival, reflex | 3d-world | AGPL-3.0 (only/or-later variant unconfirmed) | game | [author link](https://templerumble.dammafra.dev) — reader-error |
| [TIDELINE](https://github.com/bridge-mind/tideline) | fishing, simulation, collection | 3d-world | MIT | game | [author link](https://bridge-mind.github.io/tideline/) — reader-error |
| [Neon River](https://github.com/khesse-757/neon-river-remastered) | fishing, arcade | 3d-world | MIT | game | [author link](https://neonriver2.kahdev.me) — reader-error |
| [Tidebreak](https://github.com/ryanio/tidebreak) | strategy, real-time-strategy, tactics | 3d-world | MIT | game | [author link](https://ryanio.github.io/tidebreak/) — reader-error |
| [Terrinha](https://github.com/martinsmiguel/terrinha) | strategy, real-time-strategy, building, multiplayer | 3d-world | MIT (root); Apache-2.0 (reviewed source headers) | game | not-located |
| [Tiny Planet — Shrines of the Blight](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG) | action-rpg, adventure, combat | 3d-world | MIT | game | [author link](https://tiny-planet-action-rpg.vercel.app/) — reader-error |
| [Last Stand](https://github.com/VictorZakharov/last-stand) | action-rpg, survival, wave-combat | 3d-world | MIT | game | [author link](https://victorzakharov.github.io/last-stand/) — reader-error |
| [Tennis (lumixed)](https://github.com/lumixed/tennis) | sports, tennis, motion-control | 3d-world | MIT | prototype | [author link](https://tennis-blond.vercel.app/) — reader-error |
| [Cinderbelt](https://github.com/amoreo140/cinderbelt) | space, combat, mining, trading, shipbuilding | 3d-world | MIT | work-in-progress | [author link](https://amoreo140.github.io/cinderbelt/) — reader-error |
| [Sky Combat](https://github.com/Gallind/Sky-Combat) | flight, shooter, aerial-combat, wave-combat | 3d-world | MIT | prototype | [author link](https://eloquent-tulumba-7667c4.netlify.app/) — reader-error |
| [Vibe Parking / Cube Parking](https://github.com/arturitu/cube-parking) | puzzle, sliding-block, board-game | 3d-board | MIT | prototype | not-located |
| [Nyan Bomber](https://github.com/imshota1009/Nyan-Bomber) | action, puzzle, bombing, arcade | 3d-board | MIT | game | [author link](https://nyan-bomber-game-app.web.app) — reader-error |
| [Grid Wars](https://github.com/loosecannons/grid-wars) | strategy, turn-based, hex-grid, multiplayer | 3d-board | MIT | prototype | not-located |
| [Space Rocks](https://github.com/moar-tech/spacerocks) | shooter, space, survival, webvr | 3d-world | MIT | legacy-release | [author link](https://spacerocks.moar.io) — page-read |
| [Causality Paradox](https://github.com/jzwood/FPP) | puzzle, first-person, time-rewind, platformer | 3d-world | MIT | legacy-prototype | [author link](http://jzwood.github.io/FPP/build/home) — reader-error |
| [SpaceR.js](https://github.com/firmanmm/SpaceR.js) | space, obstacle-dodging, endless-runner, arcade | 3d-world | MIT | legacy-prototype | not-located |
| [The Sentinel — VR](https://github.com/SteveSmith16384/vr-sentinel) | strategy, puzzle, webxr | 3d-world | GPL-3.0 (only/or-later variant unconfirmed) | legacy-release | [author link](https://stephensmith.itch.io/the-sentinal-vr) — page-read |
| [PERIPLUS](https://github.com/TonyDowney/periplus) | exploration, adventure, surveying, collectathon | 3d-world | MIT | game | [author link](https://tonydowney.github.io/periplus/) — reader-error |
| [VoxLords](https://github.com/Lallassu/VoxLords) | action, adventure, voxel, escort | 3d-world | MIT | legacy-prototype | [author link](http://voxlords.webgl.nu) — reader-error |
| [ParrotHunt](https://github.com/Lallassu/ParrotHunt) | shooter, bird-hunting, arcade | 3d-world | MIT | legacy-prototype | [author link](http://parrothunt.nergal.se) — reader-error |
| [Drakonas](https://github.com/Casmo/Drakonas) | shooter, shoot-em-up, flight | 3d-world | MIT | legacy-prototype | [author link](https://couchfriends.com/src/games/drakonas/) — page-read |
| [T-Rex Run 3D](https://github.com/Priler/dino3d) | endless-runner, obstacle-dodging, voxel, arcade | 3d-world | GPL-3.0 (only/or-later variant unconfirmed) | legacy-prototype | [author link](https://priler.github.io/dino3d/) — page-read |
| [ThreeMineSweeper](https://github.com/ppizarror/ThreeMineSweeper) | puzzle, minesweeper, board-game | 3d-board | MIT | prototype | [author link](https://ppizarror.github.io/ThreeMineSweeper/) — reader-error |
| [Mind Your Head](https://github.com/zhangjikai/mind-your-head) | shooter, arcade, survival | 3d-world | MIT | legacy-prototype | [author link](https://head.zhangjikai.com) — reader-error |
| [Chess-3D (Terminats)](https://github.com/Terminats/chess-3d) | chess, board-game, strategy | 3d-board | MIT | game | [author link](https://chess-3d-mja9.vercel.app/) — reader-error |
| [Chinese Chess — Three.js 3D](https://github.com/doggy8088/chinese-chess) | xiangqi, board-game, strategy | 3d-board | MIT | game | [author link](https://chinese-chess.gh.miniasp.com) — reader-error |
| [Gomoku / Renju (Will)](https://github.com/doggy8088/five-chess-game) | gomoku, renju, board-game, strategy | 3d-board | MIT | game | [author link](https://gomoku.game.miniasp.com/) — reader-error |
| [Four-ball Billiards — Web Client](https://github.com/skoo1/Four-Ball_Billiards_ThreeJS) | sports, billiards, carom, physics | 3d-board | MIT | prototype | not-located |
| [Los Polos Pirates / Kalózok](https://github.com/lospolosadwords-dev/kalozok) | sailing, action, trading, pirates, multiplayer | 3d-world | MIT | game | [author link](https://skynet.lospolo.hu/kalozok/?lang=en) — reader-error |
| [Saturday Thunder 3D](https://github.com/mjcole76/saturday-thunder-3d) | sports, american-football, arcade | 3d-world | MIT | game | not-located |
| [Voxel Dungeon](https://github.com/majiayu000/voxel-dungeon) | roguelike, dungeon-crawler, first-person, voxel | 3d-world | MIT | game | [author link](https://majiayu000.github.io/voxel-dungeon/) — reader-error |
| [Rogue Descent](https://github.com/craigoley/rogue-descent) | roguelike, dungeon-crawler, twin-stick, action | 3d-world | MIT | game | [author link](https://rogue-descent.vercel.app) — reader-error |
| [Zombie Siege / Future Defense](https://github.com/MakerYoung/zombie-fps) | shooter, first-person, survival, roguelite | 3d-world | MIT | game | [author link](https://zombie.oblfs.cc.cd) — reader-error |
| [Moto Craft 3D — Pro Edition](https://github.com/Somesh2228/Moto-Craft-3D---Pro-Edition) | motorcycle, platformer, obstacle-course | 3d-world | MIT (code) | prototype | not-located |
| [SnowGlider](https://github.com/den-run-ai/snowglider) | skiing, time-trial, survival | 3d-world | MIT (code) | game | [author link](https://snowglider.ai/) — page-read |
| [Realtime Tanks — Three.js client](https://github.com/colyseus/realtime-tanks-demo) | tank-combat, multiplayer, team-deathmatch | 3d-world | MIT (code) | prototype | [author link](https://colyseus.io/realtime-tanks-demo/web-threejs/) — page-read |
| [雨夜书房 · RAINBOUND](https://github.com/boge-net/rainbound-escape-room) | escape-room, first-person, narrative-puzzle | 3d-world | MIT (code) | game | not-located |
| [Kaleydo World](https://github.com/veersaraf/kaleydo-world) | sports-collection, archery, bowling, tennis, motion-controls | 3d-world | MIT (code) | game | [author link](https://kaleydo.world) — reader-error |
| [Film 'n Fish](https://github.com/kevinli808/Film-n-Fish) | fishing, collection, exploration | 3d-world | MIT (code) | game | [author link](https://filmnfish.app) — reader-error |
| [ApexArcade Maze](https://github.com/Kwanele-Jaca/EscapeRoom) | maze, third-person, time-trial | 3d-world | MIT (code) | prototype | not-located |
| [Dungeon Crawler MMO (ClaytonWas)](https://github.com/ClaytonWas/dungeon-crawler) | dungeon-crawler, cooperative, survivor-like | 3d-world | MIT root; ISC package metadata (unresolved) | prototype | not-located |
| [3D Blocks](https://github.com/jerilseb/3d-blocks) | merge-puzzle, board-game | 3d-board | MIT (code) | legacy-prototype | [author link](https://jerilseb.github.io/3d-blocks/) — reader-error |
| [Bubble Reactor](https://github.com/ninetailschris/bubble-reactor) | bubble-shooter, matching-puzzle | 3d-cylinder | MIT (code) | legacy-prototype | not-located |
| [Neon Snake 3D](https://github.com/samuel-cabral/snake-3d) | snake, arcade, board-game | 3d-board | MIT (code) | game | [author link](https://snake-3d-lyart.vercel.app) — reader-error |
| [Sketchy Snake VR](https://github.com/aunysillyme/sketchy-snake-vr) | snake, spatial-arcade, webxr | 3d-world | MIT (code) | prototype | [author link](https://aunysillyme.github.io/sketchy-snake-vr/) — reader-error |
| [Towers of Hanoi — WebXR MR](https://github.com/Mahmoud-AboShukr/webxr-towers-of-hanoi-mr) | hanoi, spatial-puzzle, webxr | 3d-board | MIT (code) | prototype | not-located |
| [HORMUZ](https://github.com/watercastlegames/hormuz) | real-time-strategy, campaign, naval-combat | 3d-world | MIT (code) | game | [author link](https://watercastlegames.github.io/hormuz/) — reader-error |
| [SpacePong3D](https://github.com/erichlof/SpacePong3D) | pong, arcade, multiplayer | 3d-world | CC0-1.0 (code) | legacy-prototype | [author link](http://erichlof.github.io/SpacePong3D/SpacePong3D.html) — reader-error |
| [Spot The Bot](https://github.com/hookerz/spot-the-bot) | cooperative, identification-puzzle, webvr | 3d-world | Apache-2.0 (code) | legacy-prototype | [author link](https://spot-the-bot.com) — reader-error |
| [First Person Shooter JS](https://github.com/davidinfante/First-Person-Shooter-JS) | shooter, first-person, target-practice | 3d-world | GPL-3.0 (only/or-later variant unconfirmed) | legacy-prototype | not-located |
| [AsteroidPatrol3D](https://github.com/erichlof/AsteroidPatrol3D) | space-shooter, first-person, asteroids | 3d-world | CC0-1.0 (code) | legacy-release | [author link](http://erichlof.github.io/AsteroidPatrol3D/AsteroidPatrol3D.html) — page-read |
| [3dLightCycles](https://github.com/erichlof/3dLightCycles) | light-cycle, arcade, opponent-avoidance | 3d-world | CC0-1.0 (code) | legacy-prototype | [author link](http://erichlof.github.io/3dLightCycles/3dLightCycles.html) — reader-error |
| [Ultimate Striker Run — standalone v3](https://github.com/richducat/footy-run-3d) | runner, soccer-themed, arcade | 3d-world | MIT root; ISC package metadata (unresolved) | prototype | not-located |
| [Bridge Horror House](https://github.com/bridge-mind/bridge-horror-house) | horror, first-person, escape-room | 3d-world | MIT (code) | game | not-located |
| [The Warcrooms](https://github.com/WildRelation/backrooms-horror) | horror, first-person, escape, maze | 3d-world | MIT (code) | game | not-located |
| [Turbo Robot League 3D (Lite)](https://github.com/pemmyz/js_carballgame) | car-soccer, arcade, physics | 3d-world | MIT (code) | prototype | [author link](https://pemmyz.github.io/js_carballgame/) — reader-error |
| [WICKHAVEN](https://github.com/euuuuuuan/wickhaven) | horror, pursuit, third-person, escape | 3d-world | MIT (code) | game | [author link](https://euuuuuuan.github.io/wickhaven/) — reader-error |
| [Marble Loco](https://github.com/johnwlockwood/marble-loco) | marble platformer, time trial, obstacle courses | 3d-world | MIT (code) | game | [author link](https://johnwlockwood.github.io/marble-loco/) — reader-error |
| [Cinderbanner](https://github.com/brepre109/cinderbanner) | turn-based tactics, tactical RPG, campaign | 3d-board | MIT (code) | prototype | [author link](https://brepre109.github.io/cinderbanner/) — reader-error |
| [Mega Battles](https://github.com/jonas-de-cuisinez-pour-bebe/mega-battles) | turn-based tactics, duel, AI opponent, network multiplayer | 3d-board | MIT (code) | prototype | [author link](https://mega-battles.cleverapps.io/) — reader-error |
| [Warlord](https://github.com/saptak69/warlord-game) | first-person shooter, wave survival, boss combat | 3d-world | MIT (code) | prototype | [author link](https://warlord-game.vercel.app) — reader-error |
| [TOKEN SPIRE: FIRST PERSON](https://github.com/adamholter/token-spire) | deckbuilding roguelike, first-person shooter, arena combat | 3d-world | MIT (code) | game | not-located |
| [Junkyard Bandit](https://github.com/wr427wh75h-afk/junkyard-bandit) | stealth, collection, third-person exploration | 3d-world | MIT (code) | prototype | not-located |
| [Shadow Protocol](https://github.com/lalalaoneplus-dev/shadow-protocol) | stealth, first-person exploration, security puzzles | 3d-world | MIT (code) | game | not-located |
| [Otterpuck](https://github.com/edwinzhng/otterpuck) | sports, underwater hockey, AI opponents, network multiplayer | 3d-world | MIT (code) | game | [author link](https://otterpuck.edwinzhang.com) — reader-error |
| [NARAYANA — The Hadal Cycle](https://github.com/xirtus/narayana-the-hadal-cycle) | underwater adventure, exploration, objective puzzles | 3d-world | MIT (code) | prototype | not-located |
| [Triangular Sphere Puzzle](https://github.com/MauricioPerera/triangular-sphere-puzzle) | spatial sliding puzzle, spherical board | 3d-board | MIT (code) | prototype | not-located |
| [灰烬王冠 — Ashen Ring](https://github.com/z-biz-game/z-biz-game-ashen-ring-cos) | souls-like action, roguelike, dungeon combat | 3d-world | MIT (code) | game | [author link](https://z-biz-game.github.io/z-biz-game-ashen-ring-cos/) — reader-error |
| [threejs-chess — IronExcavater](https://github.com/IronExcavater/threejs-chess) | chess, local board strategy | 3d-board | MIT (code) | prototype | [author link](https://ironexcavater.github.io/threejs-chess/) — reader-error |
| [Chess-3D — Vioancer](https://github.com/Vioancer/3D-Chess-Game) | chess, AI opponent, board strategy | 3d-board | MIT (code) | legacy-release | [author link](https://chess-3d-mja9.vercel.app/) — reader-error |
| [In The Dark — LD29](https://github.com/catlinman/in-the-dark) | first-person exploration, procedural descent, coin collection | 3d-world | MIT (code) | legacy-prototype | [author link](https://catlinman.github.io/in-the-dark/) — reader-error |
| [Power Tycoon](https://github.com/oparisy/LD39) | power management, building strategy, resource simulation | 3d-board | MIT (code) | legacy-prototype | [author link](http://oparisy.github.io/LD39/) — reader-error |
| [Moshot](https://github.com/moses555/moshot) | space shooter, asteroid shooting, score attack, optional WebXR | 3d-world | MIT (code) | legacy-prototype | [author link](https://moshot.web.app/) — reader-error |
| [Dart Room](https://github.com/crispierry/dart-room) | darts, score attack, local multiplayer, CPU opponent | 3d-world | MIT (code) | game | [author link](https://crispierry.com/projects/dart-room) — reader-error |
| [8ball-threejs-game](https://github.com/Sk4rKr0w/8ball-threejs-game) | eight-ball pool, local multiplayer, physics billiards | 3d-board | MIT (code) | prototype | [author link](https://8ball-threejs-game.vercel.app) — reader-error |
| [Carom-Pool](https://github.com/the-zucc/carom-pool-threejs-multiplayer) | carom billiards, turn-based sports, network multiplayer | 3d-board | MIT (code) | legacy-prototype | not-located |
| [ThreeJS-Pool-Game — Quget](https://github.com/Quget/ThreeJS-Pool-Game) | eight-ball pool, local multiplayer, billiards | 3d-board | MIT (code) | legacy-prototype | not-located |
| [Firn](https://github.com/robinsadeghpour/webcam-ski) | skiing, endless run, flag collection, motion controls | 3d-world | MIT (code) | prototype | [author link](https://native.express/lab/ski) — reader-error |
| [Island Escape 3D — The Lost Treasure](https://github.com/SUMAIRDERO62/Island-escape-3dd) | treasure hunt, exploration adventure, environment puzzles | 3d-world | MIT (code) | game | [author link](https://island-escape-3d.vercel.app/) — reader-error |
| [SKI-3D](https://github.com/pemmyz/js_laskettelu_redux) | downhill skiing, endless score attack, obstacle avoidance | 3d-world | MIT (code) | prototype | [author link](https://pemmyz.github.io/js_laskettelu_redux/) — reader-error |
| [3D Parkour Game](https://github.com/ian-yeh/threejs-parkour) | first-person, platformer, parkour | 3d-world | MIT | prototype | [author link](https://threejs-parkour-pmle.vercel.app/) — reader-error |
| [AEON](https://github.com/qmw/aeon) | turn-based strategy, 4X, empire building | 3d-board | MIT | work-in-progress | [author link](https://qmw.github.io/aeon/) — reader-error |
| [Lowpoly Roguelike MOBA](https://github.com/carlomigueldy/lowpoly-roguelike-moba) | action RPG, wave survival, co-op | 3d-world | MIT | prototype | not-located |
| [DEAD SIGNAL: EXCLUSION ZONE](https://github.com/bridge-mind/claude-opus-5.5-zombies-game) | first-person shooter, extraction, zombie survival | 3d-world | MIT | game | not-located |
| [BIRODALMAK (Empires)](https://github.com/lospolosadwords-dev/birodalmak) | turn-based strategy, 4X, empire building | 3d-board | MIT | game | [author link](https://skynet.lospolo.hu/birodalmak/en/) — reader-error |
| [Bunbetsu Beat (ぶんべつビート)](https://github.com/tanuu5/bunbetsu-beat) | rhythm, sorting, arcade | 3d-world | MIT | game | [author link](https://tanuu5.github.io/bunbetsu-beat/) — reader-error |
| [Tennis Training](https://github.com/doncebay/tennis-training) | tennis, sports, motion controls | 3d-world | MIT | game | [author link](https://doncebay.github.io/tennis-training/) — reader-error |
| [Pithu Arena](https://github.com/dev-abdulw/pithu-arena) | sports, physics, arcade | 3d-world | MIT | game | [author link](https://dev-abdulw.github.io/pithu-arena/) — reader-error |
| [STEMSTAGE](https://github.com/SylarBeck/STEMSTAGE) | rhythm, music, local multiplayer | 3d-world | MIT | game | not-located |
| [Echo Maze Overdrive](https://github.com/FitsumMehari/game-echo-maze) | first-person, sonar stealth, maze | 3d-world | MIT | prototype | not-located |
| [OUT OF THE BOX](https://github.com/tanuu5/out-of-the-box) | stealth, escape, action | 3d-world | MIT | game | [author link](https://tanuu5.github.io/out-of-the-box/) — reader-error |
| [ECHOFOLD](https://github.com/Ghostzy0/echofold) | puzzle, time loop, cooperation with recordings | 3d-world | MIT | prototype | [author link](https://thefadghost.github.io/echofold/) — reader-error |
| [Projection](https://github.com/Noamshalom/projection) | puzzle, spatial reasoning, orthographic projection | 3d-perspective | MIT | game | [author link](https://noamshalom.github.io/projection/) — reader-error |
| [Misty Bunny](https://github.com/Bynzski/misty-bunny) | first-person, exploration, puzzle | 3d-world | MIT | game | not-located |
| [Harness Hollow](https://github.com/KrasimirKralev/harvest-hollow) | cooperative farming, life simulation, progression | 3d-world | MIT | game | [author link](https://harvest-hollow.up.railway.app) — reader-error |
| [Void Harvest](https://github.com/VictorZakharov/void-harvest-game) | twin-stick shooter, roguelite, local co-op | 3d-world | MIT | game | [author link](https://vhgame.netlify.app/) — reader-error |
| [WILDSONG](https://github.com/ShokouP/wildsong) | action adventure, exploration, combat | 3d-world | MIT | game | [author link](https://shokoup.github.io/wildsong/) — reader-error |
| [Roadster Flip](https://github.com/thefhiter/roadster-flip) | stunt driving, physics, score attack | 3d-world | MIT | game | [author link](https://thefhiter.github.io/roadster-flip/) — reader-error |
| [DiceRun.io](https://github.com/super3/dicerun.io) | dice, roguelike, round progression | 3d-board | MIT | game | [author link](https://dicerun.io/) — page-read |
| [THE NINTH VIGIL](https://github.com/iamlukethedev/The-Ninth-Vigil) | action RPG, dungeon exploration, combat progression | 3d-world | MIT | work-in-progress | not-located |
| [Voxelcraft](https://github.com/bridge-mind/voxelcraft) | voxel sandbox, survival, crafting | 3d-world | MIT | prototype | not-located |
| [BLACKWATER](https://github.com/Hiraeth010/blackwater) | first-person shooter, tactical mission, extraction | 3d-world | MIT | prototype | [author link](https://blackwater-roan.vercel.app) — reader-error |
| [Containment](https://github.com/cdb-lumen/containment) | action roguelike, top-down shooter, expedition | 3d-world | MIT | game | [author link](https://cdb-lumen.github.io/containment/) — reader-error |
| [ZIL](https://github.com/uzudil/zil) | voxel RPG, quests, exploration | 3d-world | MIT | legacy-prototype | not-located |
| [ABYSS COMMAND](https://github.com/BasharORG/abyss-command) | underwater strategy, fleet command, campaign | 3d-world | MIT | game | not-located |
| [Abyss — Ocean Exploration](https://github.com/temidayoxyz/abyss) | underwater exploration, discovery collection, simulation | 3d-world | MIT | prototype | [author link](https://temidayoxyz.github.io/abyss/) — reader-error |
| [FlyDrones — Browser Swat Game](https://github.com/SpikeCalls/FlyDrones) | arcade, 3D interaction, simulation | 3d-world | MIT | prototype | [author link](https://spikecalls.github.io/FlyDrones/) — page-read |
| [Slay the Spore](https://github.com/ilatroce/Slay-the-Spore) | deckbuilder, creature evolution, turn-based combat | 3d-world | MIT | prototype | not-located |
| [StackBlock.io](https://github.com/ZhengLinLei/stackblock.io) | timing arcade, block stacking, score attack | 3d-world | Apache-2.0 | game | [author link](https://zhenglinlei.github.io/stackblock.io) — reader-error |
| [Eight Fronts](https://github.com/mike007jd/eightfront-3d) | run and gun, campaign, local co-op | 3d-world | Apache-2.0 | game | [author link](https://eight-fronts.vercel.app) — reader-error |
| [Roller Rink 3D](https://github.com/ClaudiaCornacchia/Roller-Rink-3D) | roller skating, timed challenge, score attack | 3d-world | MIT | prototype | [author link](https://claudiacornacchia.github.io/Roller-Rink-3D/) — reader-error |
| [NEON MAYHEM](https://github.com/pranshuparmar/neon-mayhem) | open-world driving, missions, racing | 3d-world | Apache-2.0 | game | [author link](https://pranshuparmar.github.io/neon-mayhem/) — reader-error |

A `page-read` result only means the web reader returned an HTML document. It does not prove that scripts, WebGL/WebGPU, controls, assets or multiplayer work. `reader-error` means this reader could not retrieve the URL; it does not prove the site is down. `not-located` means the reviewed primary sources did not yield a live play URL. Demo checks and source commits are dated separately from any future runtime tests. Rendering, gameplay and license evidence stays pinned to reviewed commits. A demo discovery source may instead be dated repository homepage metadata or the actual author landing page; those sources are identified explicitly rather than attributed to an unrelated README.

Code license evidence includes linked repository licenses and reviewed per-file notices. Root and file-level differences are preserved, including Terrinha's MIT/Apache-2.0 labels; HexGL's noncommercial core notices keep it pending. Asset and vendored-library exceptions are recorded when found. A code license is not a blanket asset license. No third-party source code or assets are copied into this collection.

Schema v2 uses `license.label` for human-readable terms and `license.spdx` only for an established identifier. Unconfirmed GPL/AGPL variants or conflicting license scope use `spdx: null`, with the uncertainty in notes.

Run lightweight local checks with Python 3:

```sh
python3 collections/threejs-games/validate.py
```

The dependency-free validator checks the JSON schema subset used here, required fields, unique canonical repository URLs/IDs, pinned evidence URLs, local evidence anchors, dates, excluded renderer dependencies in manifest snapshots and queue/index overlap. Network link reads are recorded in per-entry evidence; the validator itself does not claim network or gameplay testing.

For each increment, read the latest remote main, all open PRs and the current index/queue first. Use a fresh branch after a PR is merged; do not append to a merged branch or reopen superseded research. Add reviewed facts, update queue decisions and run the validator before opening/updating a PR. Preserve existing GameMap content, do not merge or deploy, and do not restore content from before the user's reset. The current series began from main `5d4de4f2984a8c1df1c6818b044a70c7080d085d`.

Batch evidence: [001 — 11 games](evidence/batch-001.md) · [002 — 10 games](evidence/batch-002.md) · [003 — 10 games](evidence/batch-003.md) · [004 — 10 games](evidence/batch-004.md) · [005 — 7 games](evidence/batch-005.md) · [006 — 8 games](evidence/batch-006.md) · [007 — 8 games](evidence/batch-007.md) · [008 — 5 games](evidence/batch-008.md) · [009 — 4 games](evidence/batch-009.md) · [010 — 3 games](evidence/batch-010.md) · [011 — 5 games](evidence/batch-011.md) · [012 — 6 games](evidence/batch-012.md) · [013 — 3 games](evidence/batch-013.md) · [014 — 2 games](evidence/batch-014.md) · [015 — 5 games](evidence/batch-015.md) · [016 — 4 games](evidence/batch-016.md) · [017 — 6 games](evidence/batch-017.md) · [018 — 3 games](evidence/batch-018.md) · [019 — 3 games](evidence/batch-019.md) · [020 — 7 games](evidence/batch-020.md) · [021 — 5 games](evidence/batch-021.md) · [022 — 4 games](evidence/batch-022.md) · [023 — 6 games](evidence/batch-023.md) · [024 — 7 games](evidence/batch-024.md) · [025 — 2 games](evidence/batch-025.md) · [026 — 4 games](evidence/batch-026.md) · [027 — 3 games](evidence/batch-027.md) · [028 — 1 game](evidence/batch-028.md). The queue currently retains 60 pending and 40 excluded repositories; explicit commercial/restricted-asset cases are not presented as fully open game packages.
