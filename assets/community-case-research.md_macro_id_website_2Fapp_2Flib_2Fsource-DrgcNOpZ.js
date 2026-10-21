import{j as e}from"./jsx-runtime-BE0eTAub.js";let a={title:"Community AI game case review",description:"Inspect the research log behind community game cases, including source completeness, AI attribution, play checks and rejected candidates."},s={contents:[{heading:void 0,content:"Trace game cases back to creator build notes, playable releases, and source projects. Use the candidate records below for discovery, or open the case guide to study a complete project."},{heading:void 0,content:"The dated audit notes below preserve findings from individual research and runtime checks. Source-tree snapshots, intermediate captures, console/action logs, and contact sheets were temporary working files; they are not distributed as repository downloads. For the previews included in this project, use the published media manifest and media source guide, which record delivered assets and their provenance. The manifest is not a replacement for the complete temporary runtime logs."},{heading:"playable-source-and-engine-review--2026-10-20",content:"This pass prioritizes complete game source and an accessible hosted build or packaged release. Thirteen distinct games are added: twelve received a brief browser interaction check; the Java ME release was downloaded and its archive/manifest checked without executing an emulator. The previous seventy cases remain. Models and coding clients retain the creator’s stated attribution; a model name alone does not establish its client."},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game                   | Runtime engine / renderer                    | Asset tools        | Creator AI evidence | Complete source | Play / package |
| ---------------------- | -------------------------------------------- | ------------------ | ------------------- | --------------- | -------------- |
| 8-Second Crew · 8초 도둑단 | Canvas 2D · Vanilla JavaScript · HTML/CSS UI | Agent Sprite Forge | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game          | Runtime engine / renderer | Asset tools          | Creator AI evidence | Complete source | Play / package |
| ------------- | ------------------------- | -------------------- | ------------------- | --------------- | -------------- |
| Core Business | Three.js · JavaScript     | Blender · ElevenLabs | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game      | Runtime engine / renderer                    | Asset tools | Creator AI evidence | Complete source | Play / package |
| --------- | -------------------------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Vibe Golf | Bevy 0.14 + Rapier 0.27 · Rust / WebAssembly | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game                          | Runtime engine / renderer      | Asset tools | Creator AI evidence | Complete source | Play / package |
| ----------------------------- | ------------------------------ | ----------- | ------------------- | --------------- | -------------- |
| Fang the Fox · Game Boy Color | GBDK-2020 4.5 · C / hUGEDriver | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game                           | Runtime engine / renderer | Asset tools | Creator AI evidence | Complete source | Play / package |
| ------------------------------ | ------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Three Kingdoms: Hundred Heroes | DOM/CSS + SVG · React     | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game              | Runtime engine / renderer | Asset tools | Creator AI evidence | Complete source | Play / package |
| ----------------- | ------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Pelican on a Bike | Three.js · JavaScript     | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game     | Runtime engine / renderer         | Asset tools | Creator AI evidence | Complete source | Play / package |
| -------- | --------------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Fishslop | Three.js · TypeScript · Web Audio | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game             | Runtime engine / renderer | Asset tools | Creator AI evidence | Complete source | Play / package |
| ---------------- | ------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Clock Out Unseen | Canvas 2D · React UI      | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game      | Runtime engine / renderer  | Asset tools | Creator AI evidence | Complete source | Play / package |
| --------- | -------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Nagi Home | Three.js r169 · JavaScript | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game                             | Runtime engine / renderer                  | Asset tools | Creator AI evidence | Complete source | Play / package |
| -------------------------------- | ------------------------------------------ | ----------- | ------------------- | --------------- | -------------- |
| THUNDERFALL · Skyward Expedition | Canvas 2D · Vanilla JavaScript · Web Audio | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game                              | Runtime engine / renderer                    | Asset tools | Creator AI evidence | Complete source | Play / package |
| --------------------------------- | -------------------------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Fruit Ninja Dojo · One More Slice | Canvas 2D · Vanilla JavaScript · HTML/CSS UI | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game                           | Runtime engine / renderer    | Asset tools | Creator AI evidence | Complete source | Play / package |
| ------------------------------ | ---------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Pixel Orchard · Memory Harvest | DOM/CSS · Vanilla JavaScript | —           | Creator record      | Project         | Play           |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:`| Game            | Runtime engine / renderer                               | Asset tools | Creator AI evidence | Complete source | Play / package |
| --------------- | ------------------------------------------------------- | ----------- | ------------------- | --------------- | -------------- |
| Butch Graves 3D | Custom fixed-point raycaster · Java MIDP 2.0 / CLDC 1.0 | —           | Creator record      | Project         | Package        |`,table:"table-0"},{heading:"playable-source-and-engine-review--2026-10-20",content:"The two games selected from awesome-gpt-6-astra have independent source directories and unrelated mechanics: THUNDERFALL is a Canvas shooter and Three Kingdoms is a DOM/SVG strategy game. Pixel Orchard is one complete matching game selected from a larger HTML study collection, not a card per visual experiment. The selected Pelican game is not multiplied into the other games in its repository. New source/demo URLs and titles were compared against the existing gallery, including normalized source-directory identities. Fang GBC is a cartridge implementation, not another copy of an existing GameMap entry."},{heading:"runtime-checks-and-boundaries",content:"8-Second Crew: normal start, movement and X recording advanced the HUD to turn 2 / one clone."},{heading:"runtime-checks-and-boundaries",content:"THUNDERFALL: start, movement and a bomb yielded score 200 and visible combat."},{heading:"runtime-checks-and-boundaries",content:"Three Kingdoms: farming changed money and agriculture level; End turn began opponent actions."},{heading:"runtime-checks-and-boundaries",content:"Fruit Ninja Dojo: ordinary mouse slicing showed score 8 and a four-fruit combo."},{heading:"runtime-checks-and-boundaries",content:"Pixel Orchard: revealing two cards increased the move counter."},{heading:"runtime-checks-and-boundaries",content:"Clock Out Unseen: normal-level start and movement advanced the timer 150→149. The README’s V1 hosting note differs from observed V2-style features; the exact deployed revision is not claimed."},{heading:"runtime-checks-and-boundaries",content:"Pelican on a Bike: muted start, acceleration, jump achievement and camera change."},{heading:"runtime-checks-and-boundaries",content:"Fishslop: steering, food, coin feedback and a recharging sonar HUD."},{heading:"runtime-checks-and-boundaries",content:"Nagi Home: food placed on the room floor and ball thrown; diary feedback and ball activity appeared."},{heading:"runtime-checks-and-boundaries",content:"Core Business: normal start/transmission and movement/drilling input reached score 25 with fuel/depth feedback using Metal. Initial default-headless shader preparation stalled; the game code was not edited."},{heading:"runtime-checks-and-boundaries",content:"Fang GBC: normal new game, opening dialogue and movement; player position and island-edge feedback changed."},{heading:"runtime-checks-and-boundaries",content:"Vibe Golf: Play and mouse charge/release produced ball movement and speed 24.30 m/s; target/scoring completion was not established. Optional asset .meta requests return 404."},{heading:"runtime-checks-and-boundaries",content:"Butch Graves: the 1,679,547-byte JAR contained 444 archive entries and the expected MIDP 2.0 / CLDC 1.0 manifest. An emulator remains required and was not executed."},{heading:"existing-engine-and-duplicate-audit",content:"All seventy existing runtime labels were checked against direct source imports, renderer calls or native project configuration. Build tools, coding-agent tools and asset-production tools are not treated as game engines. The visible labels now distinguish custom Canvas 2D, DOM/SVG, native WebGL, Phaser and the named 3D engines. Blender and other confirmed asset tools have their own field on cards and detail pages. Sprout Quest uses both Canvas 2D and Three.js; Mini KSP’s separate Three.js construction workbench does not classify its playable Canvas game as Three.js."},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer     | Confirmed asset tools | Runtime source |
| ------------- | ----------------------------- | --------------------- | -------------- |
| IsoCity       | Custom Canvas 2D · TypeScript | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                      | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ---------------------------------- | ------------------------- | --------------------- | -------------- |
| Project Plateau: Proof Before Dark | Three.js · WebGL2         | Blender               | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game   | Runtime engine / renderer         | Confirmed asset tools | Runtime source |
| --------------- | --------------------------------- | --------------------- | -------------- |
| SURGE for Oinja | Three.js · Rapier 3D · TypeScript | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| DEEP YELLOW   | Godot 4.6 · GDScript      | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| morBreaker    | Unity 6 · URP · C#        | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game   | Runtime engine / renderer                       | Confirmed asset tools | Runtime source |
| --------------- | ----------------------------------------------- | --------------------- | -------------- |
| Silent Meridian | Custom JavaScript · DOM/CSS · WebGL · Web Audio | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game     | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ----------------- | ------------------------- | --------------------- | -------------- |
| Castle Clash Duel | Phaser 3 · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game         | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------------- | ------------------------- | --------------------- | -------------- |
| Golden Hour Skatepark | Three.js · TypeScript     | Blender               | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| Vibe Racer    | Pygame 2.6 · Python       | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                           | Runtime engine / renderer              | Confirmed asset tools | Runtime source |
| ------------------------------------------------------- | -------------------------------------- | --------------------- | -------------- |
| Journey to the West: Three Borrowings of the Banana Fan | Custom Canvas 2D · JavaScript · DOM UI | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game   | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------- | ------------------------- | --------------------- | -------------- |
| Clowder & Crest | Phaser 3 · TypeScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game   | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------- | ------------------------- | --------------------- | -------------- |
| Pokemon Tactics | Babylon.js · TypeScript   | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game    | Runtime engine / renderer       | Confirmed asset tools | Runtime source |
| ---------------- | ------------------------------- | --------------------- | -------------- |
| Rhythm Master 3D | Three.js · Tone.js · JavaScript | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game  | Runtime engine / renderer                   | Confirmed asset tools | Runtime source |
| -------------- | ------------------------------------------- | --------------------- | -------------- |
| Spirit of Kiro | Custom Vue 3 · DOM/CSS sprites · TypeScript | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer     | Confirmed asset tools | Runtime source |
| ------------- | ----------------------------- | --------------------- | -------------- |
| IsoCoaster    | Custom Canvas 2D · TypeScript | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer        | Confirmed asset tools | Runtime source |
| ------------- | -------------------------------- | --------------------- | -------------- |
| Astra Floor   | Three.js · TypeScript (React UI) | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer     | Confirmed asset tools | Runtime source |
| ------------- | ----------------------------- | --------------------- | -------------- |
| Mosswing      | Three.js · JavaScript · WebGL | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer                | Confirmed asset tools | Runtime source |
| ------------- | ---------------------------------------- | --------------------- | -------------- |
| Sprout Quest  | Custom Canvas 2D + Three.js · TypeScript | Blender               | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game   | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------- | ------------------------- | --------------------- | -------------- |
| Claude Dreaming | Godot 4.7 · GDScript      | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------------------- | ------------------------- | --------------------- | -------------- |
| 3D Sakura Crossing: an exploration prototype | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                          | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------------- | ------------------------- | --------------------- | -------------- |
| Magic Carpet Wizard · A Thousand Skies | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game         | Runtime engine / renderer   | Confirmed asset tools | Runtime source |
| --------------------- | --------------------------- | --------------------- | -------------- |
| Supermarket Simulator | Unity 2023.2.6f1 · URP · C# | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer                 | Confirmed asset tools | Runtime source |
| ------------- | ----------------------------------------- | --------------------- | -------------- |
| Arkanoid Neon | Custom Canvas 2D · JavaScript · Web Audio | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                      | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ---------------------------------- | ------------------------- | --------------------- | -------------- |
| Crown Defender TD 3D · Codex build | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                          | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------------- | ------------------------- | --------------------- | -------------- |
| Three Quake: an AI-assisted Quake port | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                         | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------------------------------- | ------------------------- | --------------------- | -------------- |
| Action with AI: a Roo Code experiment | React · SVG · TypeScript  | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                 | Runtime engine / renderer       | Confirmed asset tools | Runtime source |
| --------------------------------------------- | ------------------------------- | --------------------- | -------------- |
| Cloud Crush: Gemini CLI builds a match-3 game | Ebitengine 2 · Go / WebAssembly | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                     | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------------------------------------------- | ------------------------- | --------------------- | -------------- |
| Dinosaur Game Offline: Gemini CLI-assisted runner | DOM / CSS · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game      | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------------ | ------------------------- | --------------------- | -------------- |
| Moonlight & Mayhem | Three.js · JavaScript     | gpt-image-2           | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools                                              | Runtime source |
| ------------- | ------------------------- | ------------------------------------------------------------------ | -------------- |
| TRON: EXONIX  | Godot 4.7 · GDScript      | Blender · Nano Banana · PATINA · Tripo · Stable Audio · ElevenLabs | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                    | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------- | ------------------------- | --------------------- | -------------- |
| Tetris built by an AI agent team | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                              | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------------------------------------ | ------------------------- | --------------------- | -------------- |
| Tower of Time: prompting a rewind mechanic | Phaser 3 · TypeScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| Raccoon Heist | Three.js · JavaScript     | gpt-image-2           | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                   | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------------------------- | ------------------------- | --------------------- | -------------- |
| Hajimi Defense: The Tuna Crisis | Phaser 3 · TypeScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                    | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------- | ------------------------- | --------------------- | -------------- |
| Marvel Avengers: Infinity Strike | Phaser 3 · TypeScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                    | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------- | ------------------------- | --------------------- | -------------- |
| Harry Potter: Arithmancy Academy | Phaser 3 · TypeScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                   | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------------------------- | ------------------------- | --------------------- | -------------- |
| Star Wars: Mandalorian Protocol | Phaser 3 · TypeScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game    | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ---------------- | ------------------------- | --------------------- | -------------- |
| Turbo Kart Rally | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| Long Wind     | Three.js · JavaScript     | Tripo · Adobe Mixamo  | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| NOVA LANCER   | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| Orb Shooter   | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                        | Runtime engine / renderer      | Confirmed asset tools | Runtime source |
| ------------------------------------ | ------------------------------ | --------------------- | -------------- |
| Operation Naptime · Operación Siesta | Three.js + Rapier · JavaScript | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer      | Confirmed asset tools | Runtime source |
| ------------- | ------------------------------ | --------------------- | -------------- |
| Ombres        | React Three Fiber · TypeScript | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game  | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------- | ------------------------- | --------------------- | -------------- |
| Dragon’s Reach | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| Vibe Jet      | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| Slide Rush    | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| The Tithe     | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                           | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------------------------------- | ------------------------- | --------------------- | -------------- |
| Michi-Neko · The Cat Philosopher’s Path | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------- | ------------------------- | --------------------- | -------------- |
| FragArena     | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                          | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------------- | ------------------------- | --------------------- | -------------- |
| GothicVania: Codex builds a platformer | Phaser 3 · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                              | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------------------------------------ | ------------------------- | --------------------- | -------------- |
| Pixel Princess: a complete arcade campaign | KAPLAY · JavaScript       | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game             | Runtime engine / renderer     | Confirmed asset tools | Runtime source |
| ------------------------- | ----------------------------- | --------------------- | -------------- |
| Claude Code Tower Defense | PixiJS · TypeScript / Next.js | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                             | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ----------------------------------------- | ------------------------- | --------------------- | -------------- |
| Cursor’s procedural platformer experiment | Canvas 2D · TypeScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                          | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------------- | ------------------------- | --------------------- | -------------- |
| Mini Snake: a Claude conversation game | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                   | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ------------------------------- | ------------------------- | --------------------- | -------------- |
| Flux: Codex gravity-flip runner | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                        | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ---------------------------------------------------- | ------------------------- | --------------------- | -------------- |
| Bash Fighter: an agent-developed multiplayer brawler | PixiJS · TypeScript       | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                           | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------------------------------- | ------------------------- | --------------------- | -------------- |
| Running Man: Claude Code meets PixelLab | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                       | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------------------------------------------- | ------------------------- | --------------------- | -------------- |
| Garden Match: agents build and review a puzzle game | Phaser 3 · TypeScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                       | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------------------------------------------- | ------------------------- | --------------------- | -------------- |
| Dunkirk: an honestly documented AI-assisted shooter | Godot 4.6 · GDScript      | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                          | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------------------- | ------------------------- | --------------------- | -------------- |
| Gravity Birds: Grok Bot directs Cursor | Godot 4.3 · GDScript      | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                 | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------------------------------------- | ------------------------- | --------------------- | -------------- |
| Quasar Saz: an unusual Claude Code experiment | Godot 4.6 .NET · C#       | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                                     | Runtime engine / renderer   | Confirmed asset tools | Runtime source |
| ------------------------------------------------- | --------------------------- | --------------------- | -------------- |
| Agent Arcade: Copilot builds desktop arcade games | Phaser · TypeScript / Tauri | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                             | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ----------------------------------------- | ------------------------- | --------------------- | -------------- |
| Space Shooter: a family Cursor experiment | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game           | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ----------------------- | ------------------------- | --------------------- | -------------- |
| Destruction Derby Arena | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer     | Confirmed asset tools | Runtime source |
| ------------- | ----------------------------- | --------------------- | -------------- |
| Beach Kitty   | Phaser 3 · React · TypeScript | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game          | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ---------------------- | ------------------------- | --------------------- | -------------- |
| Pirate Fleet Commander | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game | Runtime engine / renderer           | Confirmed asset tools | Runtime source |
| ------------- | ----------------------------------- | --------------------- | -------------- |
| Kymograph     | HTML / SVG · JavaScript · Web Audio | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game         | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --------------------- | ------------------------- | --------------------- | -------------- |
| Midnight Pumpkin Hunt | Three.js · JavaScript     | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game              | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| -------------------------- | ------------------------- | --------------------- | -------------- |
| Snake: Neon Arcade Edition | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:`| Existing game                      | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| ---------------------------------- | ------------------------- | --------------------- | -------------- |
| Mini KSP: a Chinese rocket sandbox | Canvas 2D · JavaScript    | —                     | Source file    |`,table:"table-1"},{heading:"existing-engine-and-duplicate-audit",content:"Existing source repositories were normalized to their current owner/repository identities and the seventy final demo/download addresses compared after redirects. No hidden alias, renamed-repository duplicate or shared final game URL was found. Known shared repositories retain separate game implementations: IsoCity/IsoCoaster, the two NovelToGame adaptations, the four OpenGame archives, the two Little Earth games and three distinct Joey Salmons HTML games. Simon Willison’s two raccoon games have separate source, objectives and worlds."},{heading:"candidates-retained-outside-this-addition",content:`| Candidate     | Why it is not one of the new playable cases                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pocket Bomber | Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed. |`,table:"table-2"},{heading:"candidates-retained-outside-this-addition",content:`| Candidate    | Why it is not one of the new playable cases                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bomb Jack Go | Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed. |`,table:"table-2"},{heading:"candidates-retained-outside-this-addition",content:`| Candidate | Why it is not one of the new playable cases                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Opus FPS  | Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed. |`,table:"table-2"},{heading:"candidates-retained-outside-this-addition",content:`| Candidate         | Why it is not one of the new playable cases                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CoEngineers Games | Complete Phaser collection with an explicit Claude Code workflow, but no hosted play link or local execution was completed in this pass. Its modes are not multiplied into separate cases. |`,table:"table-2"},{heading:"candidates-retained-outside-this-addition",content:`| Candidate         | Why it is not one of the new playable cases                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Not Mortal Kombat | Public code deliberately omits roughly 770 MB of character/cinematic binaries; do not equate the code-only checkout with a complete playable asset package. |`,table:"table-2"},{heading:"candidates-retained-outside-this-addition",content:`| Candidate                            | Why it is not one of the new playable cases                                                                                                                                                                      |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Starball Run / Codex GameDev Harness | Unreal workflow and vertical-slice planning evidence, without a verified complete delivered game package or public playable build in this pass. It is not used to create an Unreal case just to fill a category. |`,table:"table-2"},{heading:"expanded-source-review--2026-10-20",content:"Search covered creator repositories, developer accounts, engine communities and public game directories. Directory rows were leads; the table below links the creator evidence and actual project for each addition. The original cases remain in the gallery. IsoCity/IsoCoaster share one implementation repository but expose distinct games; the two NovelToGame entries adapt different works into different game systems. Isometric Canvas games remain 2D, while 3D terrain or first-person projects are marked 3D."},{heading:"expanded-source-review--2026-10-20",content:`| Game    | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ------- | ------------------- | ---------------- | ---------- | ------------------ |
| IsoCity | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                               | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ---------------------------------- | ------------------- | ---------------- | ---------- | ------------------ |
| Project Plateau: Proof Before Dark | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game            | Creator AI evidence | Complete project | Play / run | Preview origin     |
| --------------- | ------------------- | ---------------- | ---------- | ------------------ |
| SURGE for Oinja | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game        | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ----------- | ------------------- | ---------------- | ---------- | ------------------ |
| DEEP YELLOW | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game       | Creator AI evidence | Complete project | Play / run       | Preview origin |
| ---------- | ------------------- | ---------------- | ---------------- | -------------- |
| morBreaker | Creator record      | Source           | Download / local | local-capture  |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game            | Creator AI evidence | Complete project | Play / run | Preview origin     |
| --------------- | ------------------- | ---------------- | ---------- | ------------------ |
| Silent Meridian | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game              | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ----------------- | ------------------- | ---------------- | ---------- | ------------------ |
| Castle Clash Duel | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                  | Creator AI evidence | Complete project | Play / run | Preview origin     |
| --------------------- | ------------------- | ---------------- | ---------- | ------------------ |
| Golden Hour Skatepark | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game       | Creator AI evidence | Complete project | Play / run       | Preview origin     |
| ---------- | ------------------- | ---------------- | ---------------- | ------------------ |
| Vibe Racer | Creator record      | Source           | Download / local | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                                                    | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ------------------------------------------------------- | ------------------- | ---------------- | ---------- | ------------------ |
| Journey to the West: Three Borrowings of the Banana Fan | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game            | Creator AI evidence | Complete project | Play / run | Preview origin  |
| --------------- | ------------------- | ---------------- | ---------- | --------------- |
| Clowder & Crest | Creator record      | Source           | Browser    | browser-capture |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game            | Creator AI evidence | Complete project | Play / run | Preview origin     |
| --------------- | ------------------- | ---------------- | ---------- | ------------------ |
| Pokemon Tactics | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game             | Creator AI evidence | Complete project | Play / run       | Preview origin |
| ---------------- | ------------------- | ---------------- | ---------------- | -------------- |
| Rhythm Master 3D | Creator record      | Source           | Download / local | local-capture  |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game           | Creator AI evidence | Complete project | Play / run       | Preview origin     |
| -------------- | ------------------- | ---------------- | ---------------- | ------------------ |
| Spirit of Kiro | Creator record      | Source           | Download / local | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game       | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ---------- | ------------------- | ---------------- | ---------- | ------------------ |
| IsoCoaster | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game        | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ----------- | ------------------- | ---------------- | ---------- | ------------------ |
| Astra Floor | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game     | Creator AI evidence | Complete project | Play / run | Preview origin  |
| -------- | ------------------- | ---------------- | ---------- | --------------- |
| Mosswing | Creator record      | Source           | Browser    | browser-capture |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game         | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ------------ | ------------------- | ---------------- | ---------- | ------------------ |
| Sprout Quest | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game            | Creator AI evidence | Complete project | Play / run | Preview origin     |
| --------------- | ------------------- | ---------------- | ---------- | ------------------ |
| Claude Dreaming | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                                         | Creator AI evidence | Complete project | Play / run | Preview origin     |
| -------------------------------------------- | ------------------- | ---------------- | ---------- | ------------------ |
| 3D Sakura Crossing: an exploration prototype | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                                   | Creator AI evidence | Complete project | Play / run | Preview origin  |
| -------------------------------------- | ------------------- | ---------------- | ---------- | --------------- |
| Magic Carpet Wizard · A Thousand Skies | Creator record      | Source           | Browser    | browser-capture |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                  | Creator AI evidence | Complete project | Play / run       | Preview origin     |
| --------------------- | ------------------- | ---------------- | ---------------- | ------------------ |
| Supermarket Simulator | Creator record      | Source           | Download / local | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game          | Creator AI evidence | Complete project | Play / run | Preview origin     |
| ------------- | ------------------- | ---------------- | ---------- | ------------------ |
| Arkanoid Neon | Creator record      | Source           | Browser    | creator-screenshot |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                               | Creator AI evidence | Complete project | Play / run       | Preview origin |
| ---------------------------------- | ------------------- | ---------------- | ---------------- | -------------- |
| Crown Defender TD 3D · Codex build | Creator record      | Source           | Download / local | local-capture  |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                                   | Creator AI evidence | Complete project | Play / run | Preview origin  |
| -------------------------------------- | ------------------- | ---------------- | ---------- | --------------- |
| Three Quake: an AI-assisted Quake port | Creator record      | Source           | Browser    | browser-capture |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:`| Game                                  | Creator AI evidence | Complete project | Play / run | Preview origin  |
| ------------------------------------- | ------------------- | ---------------- | ---------- | --------------- |
| Action with AI: a Roo Code experiment | Creator record      | Source           | Browser    | browser-capture |`,table:"table-3"},{heading:"expanded-source-review--2026-10-20",content:"Source checks establish what the creator publishes, not an audited AI authorship percentage. A Claude or Astra model mention alone is not attributed to Claude Code or Codex. Roo Code, OpenCode, Kiro and Windsurf remain distinct clients; the novel adaptations do not identify their exact client. Quake is credited as an assisted port of id Software’s existing game. Native engines, Git LFS, cloud runtime requirements and separate asset terms are written beside the relevant run/source operation. The per-game study steps are proposed learning exercises."},{heading:"candidates-kept-outside-the-added-cases",content:`| Candidate         | Evidence boundary / next check                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| GODOT4 Cycle Tour | README says scenes, scripts and assets will be added later; setup prose alone is not a delivered game. |`,table:"table-4"},{heading:"candidates-kept-outside-the-added-cases",content:`| Candidate               | Evidence boundary / next check                                                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tripo playbook examples | Already covered as a workflow; public projects intentionally omit final generated GLBs and render as greyboxes. Do not duplicate them as complete game-and-asset examples. |`,table:"table-4"},{heading:"candidates-kept-outside-the-added-cases",content:`| Candidate | Evidence boundary / next check                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| SANDLINE  | The discovered project requires third-party character assets absent from a clean clone; retain it as a lead rather than a complete packaged case. |`,table:"table-4"},{heading:"candidates-kept-outside-the-added-cases",content:`| Candidate                   | Evidence boundary / next check                                                                                                                                                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Detective Agentic Mysteries | Development evidence is explicit, but its Copilot runtime needs authentication/subscription and no genuine gameplay preview was captured. Current SDK/CLI requirements supersede the README’s older Node/extension setup; no account setup was performed. |`,table:"table-4"},{heading:"candidates-kept-outside-the-added-cases",content:`| Candidate       | Evidence boundary / next check                                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Multiverse Mate | The documented root pnpm dev command does not exist in the reviewed package. PostgreSQL, DATABASE_URL and separate service ports require a corrected reproducible setup before promotion. |`,table:"table-4"},{heading:"candidates-kept-outside-the-added-cases",content:"The discovery section also adds Vibe Jam, AI Browser Game Jam and the Astra source collection. Those links do not increase the reviewed game count."},{heading:"gemini-cli-case-addition",content:"Two previously reviewed code resources now also have individual game cases. Both are 2D games and are explicitly attributed to the Gemini CLI client, distinct from the six existing cases using Gemini models or AI Studio."},{heading:"gemini-cli-case-addition",content:`| Game        | Primary AI evidence and source                                               | Play or run                                                     | Real screenshot                                                 |
| ----------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| Cloud Crush | Google's complete game project and README; official prompt-by-prompt codelab | Local Go / WASM project; no public hosted endpoint was verified | Publisher screenshot at fixed revision; not a GameMap local run |`,table:"table-5"},{heading:"gemini-cli-case-addition",content:`| Game                  | Primary AI evidence and source                                        | Play or run                                                                            | Real screenshot                                                                               |
| --------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Dinosaur Game Offline | Creator README, source, and in-game footer explicitly name gemini-cli | Author-hosted browser build; complete static project also opens locally via index.html | GameMap browser capture after start and jump; score, collision/game over, and restart checked |`,table:"table-5"},{heading:"gemini-cli-case-addition",content:"Dinosaur source revision `e0f3f584751bb80425bd49513fa7b54503f13d62` includes index.html, style.css, script.js, and the referenced image/audio assets. Its live build returned HTTP 200 and passed the normal keyboard flow in Chromium at 1280 × 720, with no final-run JavaScript errors or failed requests. The board has a fixed desktop width. No repository code license is declared, so this collection calls it public source without assigning an open-source license."},{heading:"gemini-cli-case-addition",content:"Cloud Crush source subdirectory revision `cdded29daeb83a24d37dc5c7ead5c85d8a08ff89` contains complete Go game logic, native and WASM setup, source assets, a static server, and a Dockerfile; the repository's code license is Apache-2.0. No Go toolchain was installed for this review and the game was not compiled locally. The current go.mod requires Go 1.26.2; the README's 1.24+ prerequisite is outdated. The server serves public/, but the committed public/assets lacks required source assets. The case therefore includes copying assets/\\* into public/assets before serving, matching the Dockerfile's approach, and copying wasm_exec.js from the same Go toolchain used to compile. Official Go guidance requires matching the helper and compiler versions. Local play does not require Gemini CLI or a cloud account; the codelab's optional cloud deployment does."},{heading:"gemini-cli-case-addition",content:"The expanded 44-case gallery passed the production build, generated-content checks, and a targeted Chromium UI pass at 1440 × 1300 and 390 × 844 using Playwright (Browser plugin unavailable). Gemini CLI selects exactly these two cases; 2D retains them and 3D shows an empty state. Browser/local mode separates the two correctly. Both images decode at their recorded dimensions, image dialogs show the correct capture/publisher provenance, and source links and local setup details are present. Keyword search, clear/reset, mobile width, and the standalone file:// build passed. App console errors and warnings were empty. These UI checks do not imply a local Cloud Crush compilation."},{heading:"original-42-case-runtime-and-integration-review",content:"All 42 case IDs are distinct and related resource IDs resolve. A separate content review checked duplicate implementations, dimensions, engine labels, AI roles, and evidence types. Garden Match credits human product/QA, Codex planning/art, and Claude engineering; OpenGame is explicitly labeled a generation framework. The case-study steps are editorial suggestions."},{heading:"original-42-case-runtime-and-integration-review",content:"The gallery was checked at 1440 × 1000 and 390 × 844 in Chromium with Playwright because the Browser plugin was unavailable. Counts, 2D/3D filters, combined keyword and play-mode filters, empty-state reset, screenshot expansion/Escape close, and mobile width passed with no app console errors. The production build and generated-content checks passed after the media merge, including all 42 image/source records. Public demos received targeted smoke checks, not complete playthroughs. Downloaded source and creator screenshots do not imply every desktop game was locally reproduced."},{heading:"original-42-case-runtime-and-integration-review",content:"Mini KSP was served from its unmodified public source and launched through the normal UI. Garden Match source revision 8bb87ee5c2698922f79f9b277d97b1392f38d0e2 was transpiled without gameplay edits and captured with its documented development Canvas renderer option. A real tile drag was attempted but was an invalid swap; no completed match is claimed. Orb Shooter and Pumpkin Hunt scenes render, but automated pointer-lock interaction was limited. Screenshot origins and original image URLs are recorded in the media guide."},{heading:"gamemap-2d-community-case-audit--2026-10-18",content:"This is a dated research snapshot, not an exhaustive inventory of every community game. The search covered 26 broad query variations across Claude, Claude Code, Codex, Cursor, Gemini, Grok, Aider, ChatGPT, Pygame, Godot and browser games. A curated directory was used for discovery only; inclusion rests on creator-controlled repositories, articles, source trees, or deployed games. The existing Tetris, Tower of Time, and OpenGame entries were excluded from this expansion."},{heading:"inclusion-checks",content:`A creator explicitly describes generative AI's development contribution; ordinary NPC/pathfinding "AI" is insufficient.`},{heading:"inclusion-checks",content:"A public repository contains the actual game implementation (checked using recursive public GitHub API trees for all 13 included repositories)."},{heading:"inclusion-checks",content:"A creator links a browser game or gives runnable source/release instructions."},{heading:"inclusion-checks",content:"A README disclosure is labelled `disclosure`, not represented as a prompt log. Development articles or creator-written summaries use `build-log`. None of these entries claims an independently audited percentage of AI authorship."},{heading:"inclusion-checks",content:"One representative game was selected from the John Dilig collection and one from the GameAI collection, to avoid multiplying a suite into many near-identical cards."},{heading:"included-cases-13",content:`| ID                | Creator source and AI evidence                               | Play/run entry                                     | Evidence interpretation                                                                                                          |
| ----------------- | ------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| gothicvania-codex | https://github.com/acatovic/gothicvania-codex-demo#the-story | https://acatovic.github.io/gothicvania-codex-demo/ | Creator describes progressive Codex prompts, skills and Playwright; human assets and manual Tiled level are explicitly credited. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                    | Creator source and AI evidence                                                       | Play/run entry                      | Evidence interpretation                                                              |
| --------------------- | ------------------------------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------ |
| pixel-princess-claude | https://github.com/VTvito/pixel-princess-platformer#built-with-ai--how-this-was-made | https://gameforprincess.vercel.app/ | Claude Code collaboration disclosure; human product direction, review and device QA. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                   | Creator source and AI evidence                      | Play/run entry                        | Evidence interpretation                                                                                              |
| -------------------- | --------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| claude-tower-defense | https://github.com/mdkess/claude-game#built-with-ai | https://claude-game-lilac.vercel.app/ | Creator says entirely Claude Code; public complete implementation and headless simulator; no prompt history claimed. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                           | Creator source and AI evidence                                                                                                                        | Play/run entry                                        | Evidence interpretation                                                                                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cursor-procedural-platformer | https://github.com/commjoen/generated-game-experiment ; https://github.com/commjoen/generated-game-experiment/blob/main/.cursor/rules/conversation.md | https://commjoen.github.io/generated-game-experiment/ | Repository calls itself a Cursor game experiment. The conversation file was fetched: it is a bullet summary of user/assistant stages, not a verbatim transcript. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                | Creator source and AI evidence                               | Play/run entry                | Evidence interpretation                                                                                                  |
| ----------------- | ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| claude-mini-snake | https://github.com/BizShibe/claude-ai-mini-snake-game#readme | https://minisnake.vercel.app/ | Creator says generated in a Claude conversation. This is Claude chat, not evidence of Claude Code; resourceIds is empty. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                | Creator source and AI evidence                                  | Play/run entry                           | Evidence interpretation                                                                                                                        |
| ----------------- | --------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| flux-codex-runner | https://github.com/scriptedbyshivam/codex-hackathon-2026#readme | https://codex-hackathon-drab.vercel.app/ | Creator development account names Codex across seven milestones. Only the runner behavior is described here; wellness claims are not repeated. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                 | Creator source and AI evidence                            | Play/run entry           | Evidence interpretation                                                                                                                      |
| ------------------ | --------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| bash-fighter-agent | https://github.com/Bash-Entertainment/bash-fighter#readme | https://bashfighter.com/ | Owner explicitly says most code and day-to-day development are done by an AI agent. No specific model/client is attributed without evidence. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                          | Creator source and AI evidence                                                                                                                         | Play/run entry                             | Evidence interpretation                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| running-man-claude-pixellab | https://github.com/balbonits/ai-browser-game-demos#tools-used ; https://github.com/balbonits/ai-browser-game-demos/blob/main/docs/games/running-man.md | https://games.jdilig.me/games/running-man/ | Creator names Claude Code for code and PixelLab for art. Per-game notes include asset inventory, controls, architecture and dated changes. Actual source is now under public/games/. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                  | Creator source and AI evidence                                                                                    | Play/run entry                  | Evidence interpretation                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| garden-match-agents | https://github.com/kevinchenkai/GameAI#readme ; https://github.com/kevinchenkai/GameAI/blob/main/garden/README.md | https://g.ismayday.mobi/garden/ | Creator names a Codex-centered, implementation-plus-independent-review workflow; per-game docs distinguish code layers, Codex art orders and human device validation. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                  | Creator source and AI evidence                   | Play/run entry                                       | Evidence interpretation                                                                                                                                                                                                                 |
| ------------------- | ------------------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dunkirk-ai-assisted | https://github.com/Ponloe/dunkirk-godot#ai-usage | https://cheery-sable-f2dce2.netlify.app/dunkirk.html | Narrow, explicit contribution table: Gemini backdrop/ideation; ChatGPT planning/debugging; Claude small suggestions; manual integration/testing and externally licensed music. Representative prompts are examples, not a complete log. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                        | Creator source and AI evidence                                                                                                  | Play/run entry                                                     | Evidence interpretation                                                                                                                                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gravity-birds-grok-cursor | https://github.com/az9713/grokbot-game-dev-demo ; https://az9713.github.io/grokbot-game-dev-demo/gravity-birds-dev-journey.html | https://github.com/az9713/grokbot-game-dev-demo#opening-in-godot-4 | Godot source download. The journey HTML was fetched and read: Grok Bot coordinated Cursor Cloud Agents, local testing found movement/solvability bugs, subsequent fixes are described. It explicitly says the web export is incomplete; not classified as a playable browser build. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                | Creator source and AI evidence                      | Play/run entry                                        | Evidence interpretation                                                                                                                                                                                      |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| quasar-saz-claude | https://github.com/cleak/quasar-saz#how-it-was-made | https://github.com/cleak/quasar-saz/releases/tag/v1.1 | Creator describes Claude Code interpreting dog keyboard input and building code/procedural art/audio with tests. Recommended v1.1 adds human fixes; not called an untouched AI result. Godot Mono/C# source. |`,table:"table-6"},{heading:"included-cases-13",content:`| ID                   | Creator source and AI evidence                                                                                                            | Play/run entry                                     | Evidence interpretation                                                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| agent-arcade-copilot | https://github.com/DanWahlin/agent-arcade#how-this-was-made ; https://blog.codewithdan.com/building-agent-arcade-with-github-copilot-cli/ | https://github.com/DanWahlin/agent-arcade/releases | Creator article describes Copilot CLI planning, game mechanics, screenshot feedback, Tauri migration and releases. Credited human-made sprites/reference code remain part of the project. |`,table:"table-6"},{heading:"source-tree-checks",content:"Public GitHub tree JSON snapshots were held in temporary working files during this audit. They contained source paths and pinned HEAD SHA values, not downloaded repository code, and are not bundled with this repository. Verified file counts: GothicVania 40; Pixel Princess 176; tower defense 89; Cursor platformer 81; Gravity Birds 89; Agent Arcade 368; Mini Snake 3; Flux 22; Bash Fighter 385; Quasar Saz 1076; John Dilig collection 171; GameAI collection 1122; Dunkirk 212. Counts include supporting docs, assets and tests, not just game code. The primary repositories and evidence URLs remain in the candidate table above."},{heading:"source-tree-checks",content:"Additional primary material fetched into temporary audit files included the Cursor conversation summary, Gravity Birds README and full journey HTML, and Mini Snake's complete HTML. Those working copies are not published artifacts; the candidate table links their creator-controlled sources. GitHub HTML/raw pages and the Copilot creator article were also opened with web research tools. Cache-miss errors were not treated as a verified dead site; direct public fetches/browser navigation were used to resolve important cases."},{heading:"creator-gameplay-images-for-downloadable-projects",content:'Gravity Birds: https://raw.githubusercontent.com/az9713/grokbot-game-dev-demo/main/game_ui_2.png — visually checked; actual Stairway puzzle with bird, fruit, exit and undo/restart UI. README captions it "After polish". Published preview.'},{heading:"creator-gameplay-images-for-downloadable-projects",content:"Quasar Saz: https://raw.githubusercontent.com/cleak/quasar-saz/master/docs/screenshot_20260219_154704.png — visually checked; actual Dissonance King phase-3 combat, player, attacks, energy/score HUD. Published preview."},{heading:"creator-gameplay-images-for-downloadable-projects",content:`Agent Arcade: https://raw.githubusercontent.com/DanWahlin/agent-arcade/main/docs/images/agent-arcade-ninja.gif — creator gameplay GIF. Same recording is explicitly captioned "Ninja Runner Gameplay" in the creator's linked article. Published preview.`},{heading:"creator-gameplay-images-for-downloadable-projects",content:"These are creator-provided gameplay media, not captures made during our own playtests. Root integration is preserving that provenance."},{heading:"browser-verification",content:"Browser plugin unavailable; used bundled Playwright and Chromium 1208. All 10 browser-entry URLs returned HTTP 200 and correct page titles in the initial navigation run. Initial title/loading screenshots are intentionally excluded from accepted gallery media. Captures and per-case console/request/action metadata were temporary audit files and are not distributed. The published manifest and media guide identify the retained previews and their sources. Metal rendering and one foreground page were used for follow-up captures where asset loading or animation was slow."},{heading:"browser-verification",content:"Verified active interactions: tower-defense Damage upgrade changes Lv0→Lv1 and gold25→5; Cursor platformer moves/jumps and score increases; Mini Snake is played with arrows to collect two food items (score0→2; length1→3), then paused for capture; Flux enters its running state and flips gravity; Bash Fighter creates a private lobby, starts with bots, enters Timed Brawl and responds to movement/jump/attack; Running Man starts, jumps and reaches 19m; GothicVania moves from its exported `title` state to `level`, with a moving/jumping player, health4 and live enemies. GothicVania's Enter input must be held across a rendered frame because its title checks Phaser `JustDown`."},{heading:"browser-verification",content:"The temporary verified-preview selection recorded seven actual browser gameplay captures plus one creator gameplay screenshot for Pixel Princess. That audit selection file is not a repository download; retained media and origins are recorded in the published manifest. Pixel Princess's public build reached a working menu, but variable first-load asset timing made the creator's existing gameplay screenshot the more reliable preview: https://raw.githubusercontent.com/VTvito/pixel-princess-platformer/main/assets/screenshot.png (published preview). It was visually checked as actual forest-level gameplay with heroine, enemy, pickups and lives/score HUD. Garden Match diagnosis/capture was handed to the 3D research agent and Dunkirk capture to the root agent, so their final results are recorded by those agents rather than claimed here."},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                     | Decision and reason                                   |
| -------------------------------------------- | ----------------------------------------------------- |
| https://github.com/0x0funky/agent-game-forge | Game IDE/tool, not an additional completed game case. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                            | Decision and reason                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| https://github.com/BeyondPlay-AI/game-prompt-engine | Generator CLI; no particular finished output was independently verified. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                 | Decision and reason                                      |
| ---------------------------------------- | -------------------------------------------------------- |
| https://github.com/Mr-Neutr0n/pixelforge | Generator/editor product, not a distinct completed game. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                     | Decision and reason                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| https://github.com/Tann2019/godot-mcp-server | Engine integration/tool with a teaching demo; not used to inflate game counts. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                              | Decision and reason                                                                                   |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| https://github.com/hanifwdyt/claude-code-game-toolkit | Toolkit and starter examples; deferred in favor of individual projects with stronger creator context. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                                 | Decision and reason                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| https://github.com/MRCalderon3D/everything-game-dev-code | Broad scaffold with many samples; individual outputs not fully checked in this pass. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                       | Decision and reason                                                                                |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| https://github.com/NguyenLe15325/Python-raylib | AI-assisted concept-demo collection; many entries are foundations rather than complete game loops. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                    | Decision and reason                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| https://github.com/Ajairajv/2D-Shooter-Game | Readme documents conventional enemy AI; no verified generative-AI build disclosure. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                | Decision and reason                                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| https://github.com/AkankshaD2/FlowForge | AI means A\\* navigation/pathfinding in the README; no verified generative-AI development attribution. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                       | Decision and reason                                                                                         |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| https://github.com/matthewod11-stack/CatRunner | Runtime Gemini cat generation is clear; explicit attribution of the game's development was not established. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                    | Decision and reason                                                                                                                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://github.com/Id-Aplus/SnakeMazeEscape | Credible Amazon Q/Pygame creator disclosure; base mode is reported complete, but normal/advanced modes have acknowledged bugs/incompletion. Kept as a further prospect rather than padding the main set. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                                | Decision and reason                                                                                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://github.com/BareTread/vampire-survivors-enhanced | Complete game and agent-related files exist, but the README does not itself establish the AI build contribution. A session artifact would need further review before inclusion. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                             | Decision and reason                                                                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://github.com/highlandhodl/coengineers-os-games | Credible Claude Code suite; deferred because this pass already includes arcade collections and no separate gameplay-preview verification was completed. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect        | Decision and reason                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| GameAI StackPop | Same creator/repository and same workflow as Garden Match. Not split into another card just to increase totals. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                  | Decision and reason                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| https://github.com/ladegeraet/claudespace | Discovery-list lead; direct repository fetch did not establish the source/evidence chain in this pass. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:`| Prospect                                           | Decision and reason                                                                                   |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| https://github.com/lappemic/awesome-ai-built-games | Useful discovery index; a third-party list is not primary evidence of a particular game's authorship. |`,table:"table-7"},{heading:"rejected-or-deferred-prospects",content:"3D leads were handed to the 3D researcher: CodeCraft, mineclaude, ImADragon, snake-3d-game, desert-velocity and vibe-jet. They are not counted in this 2D expansion."},{heading:"community-3d-expansion-audit--2026-10-18",content:"Prepared `website/src/data/community3dExpansion.ts`: 12 new games, all with creator-published browser URLs and actual game repositories. The root agent owns live browser capture and final inclusion. This research verified creator evidence and source trees; a URL listed here is not a claim that a complete playthrough was performed."},{heading:"search-coverage",content:"Searched GitHub/web for Three.js, Godot, Unity, AI-generated, vibe-coded, Claude, Codex, Gemini, Copilot, AI game development, and specific public projects. Also used the community list https://github.com/coolbat/awesome-opus-5.5-usecase as a discovery index, then verified primary creator repositories instead of treating that list as evidence. Sources include English, Chinese, Japanese and French development records."},{heading:"included-candidates-and-primary-audits",content:`| ID                      | Primary repository                              | AI evidence                                                                                    | Source inspection                                                                                                       | Demo                                            |
| ----------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| turbo-kart-rally-claude | https://github.com/bridge-mind/turbo-kart-rally | README original prompt, five Claude Opus 5.5 assignments, architecture and integration account | Recursive main tree: 41 entries, 27 JS/HTML files; screenshots are documentation only; runtime visuals/audio procedural | https://bridge-mind.github.io/turbo-kart-rally/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID               | Primary repository                     | AI evidence                                               | Source inspection                                                                                                                                                                                         | Demo                                   |
| ---------------- | -------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| long-wind-claude | https://github.com/jbang2004/long-wind | Chinese author timeline, AI/human roles, original request | main tree: 334 entries; committed Tripo character GLBs, Mixamo animation GLB, Poly Haven glTF/textures, actual game code. No tiny GLB pointer files found. Read CREDITS.md: asset terms differ from code. | https://jbang2004.github.io/long-wind/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID                 | Primary repository                    | AI evidence                                                                              | Source inspection                                                                                                      | Demo                                  |
| ------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| nova-lancer-claude | https://github.com/tanuu5/nova-lancer | Japanese original brief, agent division, test explanation, reported model/session record | main tree: 35 entries, 18 JS/HTML files. Full procedural game; bundled index.html plus modular source and build tools. | https://tanuu5.github.io/nova-lancer/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID             | Primary repository                           | AI evidence                                                                     | Source inspection                                                                                                                                   | Demo                                         |
| -------------- | -------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| orb-shooter-ai | https://github.com/theredstapler/orb-shooter | README directly names Antigravity, Gemini 3.1 Pro, Opus 4.6 and human polishing | main tree and main.js references checked. All referenced warehouse/weapon/enemy GLBs, HDR and OGG files are committed, not just links to Sketchfab. | https://theredstapler.github.io/orb-shooter/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:"| ID                       | Primary repository                             | AI evidence                                                    | Source inspection                                                                                                                                                                                                                                 | Demo                                 |\n| ------------------------ | ---------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |\n| operation-naptime-claude | https://github.com/alandaitch/operacion-siesta | README build account and linked public session with tool calls | master tree: 166 entries, 116 JS/TS/HTML files, procedural rendering/audio. `public/transcript.html` and `docs/transcript.html` exist. README's `docs/TRANSCRIPT.md` link does not match tree, so data uses working published HTML route instead. | https://operacion-siesta.vercel.app/ |",table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID            | Primary repository                  | AI evidence                                                          | Source inspection                                                                                                                                                                                                      | Demo                                  |
| ------------- | ----------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| ombres-claude | https://github.com/briossant/ombres | README detailed process, human interventions, original docs/BRIEF.md | master tree: 1,789 entries, 358 JS/TS/TSX/HTML files; full host/controller/relay, procedural birds/world, committed audio/fonts/narration. PolyForm Noncommercial: described as source available, not OSI open source. | https://ombres.deploy.breizhware.com/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID                   | Primary repository                                       | AI evidence                                                                                   | Source inspection                                                                                                                  | Demo                                                     |
| -------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| dragons-reach-claude | https://github.com/jaydemks/ImADragon_onepromptcode_game | PROMPT.md, contracts, README postmortem and honest 1 initial prompt + 3 follow-ups disclosure | main tree: 95 entries, 48 JS/HTML files; procedural rig/world/combat. Source complete as prototype; README audio module is a stub. | https://jaydemks.github.io/ImADragon_onepromptcode_game/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID              | Primary repository                      | AI evidence                                                               | Source inspection                                                                                                                                          | Demo                            |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| vibe-jet-gemini | https://github.com/cedrickchee/vibe-jet | Creator initial Gemini prompt, response and approach; original 2025 build | main tree: 22 entries, game.html/server.js, real aircraft GLBs and textures. Code inspected: local shenyang_j-11.glb; Three.js CDN + online grass texture. | https://vibejet.cedricchee.com/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID              | Primary repository                                  | AI evidence                                                                                              | Source inspection                                                                                                                      | Demo                                                |
| --------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| slide-rush-opus | https://github.com/KJLKurt/waterslide-game-opus-5.5 | README completion record names opus-5.5/extra-high and session statistics; repo describes LLM comparison | main tree: 65 entries, 29 JS/HTML files; procedural characters/slide/audio plus PWA. Label disclosure, not tutorial or prompt archive. | https://kjlkurt.github.io/waterslide-game-opus-5.5/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID               | Primary repository                         | AI evidence                                               | Source inspection                                                                                                                                                   | Demo                                       |
| ---------------- | ------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| the-tithe-claude | https://github.com/miguelsolorio/the-tithe | Author repository About directly says built with Opus 5.5 | main tree: 227 entries, 165 JS/HTML files; actual levels/weapons/enemies/checkpoints. Procedural runtime assets; no full prompt/session evidence. Label disclosure. | https://miguelsolorio.github.io/the-tithe/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID            | Primary repository                                               | AI evidence                                                                                 | Source inspection                                                                                                                                                                                                                        | Demo                                                             |
| ------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| michi-neko-ai | https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path | Creator README identifies human direction and several AI models without naming exact models | main tree: 201 entries, 63 JS/HTML files; procedural game, quests and save logic. README explicitly labels many illustrations as aspirational inspiration, so never use them as actual gameplay screenshots. Early alpha stated plainly. | https://c1t1zen1.github.io/Michi-Neko-The-Cat-Philosophers-Path/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:`| ID                | Primary repository                      | AI evidence                                                                     | Source inspection                                                                                                                          | Demo                                  |
| ----------------- | --------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| fragarena-copilot | https://github.com/jonnyleigh/fragarena | Author Copilot disclosure, Prompt.md, SoundEffectsPrompt.md, php2node_prompt.md | main tree: 55 entries, 25 JS/HTML files; client/server, music MP3s and UI image committed. Read actual Prompt.md; no raw transcript claim. | https://fragarena1.azurewebsites.net/ |`,table:"table-8"},{heading:"included-candidates-and-primary-audits",content:"All final tutorial/evidence pointers are primary creator material. Entries that only have a declaration use `tutorial.kind: 'disclosure'`. Steps are editorial study suggestions. Source scope `complete-project` means source and game dependencies can run the stated prototype, not a claim of production quality."},{heading:"strong-alternates-intentionally-not-added-to-browser-set",content:"**Desert Velocity** — https://github.com/sim7575/desert-velocity ; Godot 4.3+, Codex + GPT-5.6 Build Week project with detailed supervised AI disclosure. Windows download https://sim75.itch.io/desert-velocity . Tree inspected: 784 entries, 428 image/model/audio assets with original Blender files and real GLBs. No tiny asset pointers. Excellent engine diversity, but download-only. Root can add if a local-game screenshot/download case is desired."},{heading:"strong-alternates-intentionally-not-added-to-browser-set",content:"**Opus FPS** — https://github.com/frankhale/opus-fps ; Godot 4, procedural models and sounds generated with tools; game code in godot/. Direct author Opus attribution. No public browser build. Kept outside browser-first additions."},{heading:"strong-alternates-intentionally-not-added-to-browser-set",content:"**MineClaude** — https://github.com/snek-git/mineclaude ; Rust + Bevy 0.18, author says built entirely by Opus 4.6 agent teams, clear workflow and human playtest disclosure. Runnable via cargo with GPU; no browser demo."},{heading:"strong-alternates-intentionally-not-added-to-browser-set",content:"**CodeCraft** — https://github.com/zihaomu/CodeCraft ; author attributes to Codex; real procedural voxel survival/build project and source. README only gives local run URL, no published playable URL. Source-only alternate."},{heading:"strong-alternates-intentionally-not-added-to-browser-set",content:"**Tripo Playbook games** — https://github.com/TripoGrowthLab/vibe-gaming-interactive-playbook ; Snowdrift Dash, LANTERN ALLEY, PIT NINE have specific game code and browser demos. Author explicitly says Tripo models are absent and fresh clones run in greybox. Would require `game-code-greybox`, never complete-project. More valuable as asset-swap workflow than padding the current set."},{heading:"rejected--not-counted",content:"https://github.com/chongdashu/threejs-capacitor-ios-game : repository expressly says no runnable app code or GLB models; only prompts, skills and metadata. Not a complete game source."},{heading:"rejected--not-counted",content:"https://github.com/mdelaguera/learn-threejs-tactics-game and upstream chongdashu/threejs-tactics-game : public repo says full source and asset pipeline coming later / through paid access; public references are insufficient."},{heading:"rejected--not-counted",content:"https://github.com/vibe-stack/game.js : engine/editor project, not a finished game case."},{heading:"rejected--not-counted",content:"https://github.com/hyeons-lab/prism : engine only."},{heading:"rejected--not-counted",content:"https://github.com/marciocamello/game-engine-ai : engine project with examples, insufficient distinct game evidence for this selection."},{heading:"rejected--not-counted",content:"https://github.com/markjeromecruz/threejs-claude-starter : scene/starter intentionally invites the user to add game mechanics; not a complete game loop."},{heading:"rejected--not-counted",content:"https://github.com/xenitV1/mehmet-3d-portfolio : explorable portfolio, no game objective."},{heading:"rejected--not-counted",content:"https://github.com/shogunyan12/The-GREAT-SAGE : desktop assistant, not a game."},{heading:"rejected--not-counted",content:"https://github.com/vasu-devs/FishSlop_Opus5.5 : real game/source and demo discovered, but README does not explicitly attribute AI authorship; model name in repo URL alone is weaker than included cases. Excluded pending direct creator build evidence."},{heading:"rejected--not-counted",content:"https://github.com/leobrqz/VibedGames-benchmark : real small games and requested prompt_history.md convention; selected more individually documented examples instead of counting each benchmark entry."},{heading:"rejected--not-counted",content:"https://github.com/chojondocho/single-html-game-bench : real generated outputs but huge single-prompt comparison set; excluded from curated count to avoid duplicate low-quality outputs padding totals."},{heading:"rejected--not-counted",content:"`Tidewater`, `Clearwater`, `web-ocean`, riverboat scenes, photoreal architecture viewers and universe simulations from discovery list: interaction/rendering demos without a sufficiently clear game loop, excluded."},{heading:"rejected--not-counted",content:"`GalaxyQuest` from discovery list requires proprietary original game data; no standalone complete project/assets claim."},{heading:"verification-performed",content:"Primary web search/open/read for each included repository."},{heading:"verification-performed",content:"GitHub connector recursive tree inspection for all 12 included sources."},{heading:"verification-performed",content:"Actual Orb Shooter main.js asset references matched against tree; Vibe Jet model/texture dependencies read."},{heading:"verification-performed",content:"Long Wind CREDITS.md, Ombres README/licence statement, Nova Lancer Japanese README, FragArena Prompt.md inspected."},{heading:"verification-performed",content:"`npx tsc -b --pretty false` passed after new data file creation."},{heading:"verification-performed",content:'Many browser-game URLs return a generic "not accessible via this tool" from web reader despite being linked in primary repos; root is independently capturing real browser previews, so web-reader failures have not been mislabeled as dead links.'},{heading:"follow-up-from-root-browser-checks",content:"Vibe Jet and FragArena public hosts failed DNS resolution. Their final `demo` fields now link the actual main-branch source ZIP with local Node launch instructions and state that the public host did not resolve at review."},{heading:"follow-up-from-root-browser-checks",content:"Ombres browser navigation timed out; final demo note flags possible temporary unavailability. This is not treated as definitive proof of a dead host."},{heading:"follow-up-from-root-browser-checks",content:"Historical screenshot-candidate metadata was held in a temporary audit file, keyed by case ID with immutable commit refs, raw image URLs, source permalinks, byte sizes, and README provenance. That working file is not distributed; use the published manifest and media guide for retained preview provenance. Nine candidates were explicitly embedded as gameplay in creator README content. The Michi development capture required pixel inspection; all aspirational README artwork was excluded. Orb Shooter and Slide Rush had no creator gameplay screenshots in their source trees, so browser capture was required for their previews."},{heading:"diverse-community-case-research--2026-10-18",content:"Scope: actual AI-assisted game development, public complete project, playable browser build or honestly labeled source download. Search terms covered Gemini CLI, Google AI Studio, DeepSeek, Aider, Cursor, Replit, Windsurf, Antigravity; searched English and Chinese through web search and GitHub repository search. Author attribution is distinguished from a build log or actual prompt transcript. Runtime follow-up is recorded in the final review above."},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:`| ID                   | Primary disclosure                                                                                                             | Source inspected                                                                                       | Play/run                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| cursor-space-shooter | https://github.com/littleearth/vibe-coded-games#development explicitly credits Cursor; family creation details in Game Details | Recursive Git tree has shooter/index.html, styles.css, 43KB game.js; shooter/README.md fetched in full | https://games.littleearth.dev/shooter/ |`,table:"table-9"},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:`| ID                       | Primary disclosure                                                              | Source inspected                                                  | Play/run                                 |
| ------------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| cursor-destruction-derby | Same primary README, individually names Destruction Derby and Cursor assistance | Recursive tree has demoderby/index.html, styles.css, 36KB game.js | https://games.littleearth.dev/demoderby/ |`,table:"table-9"},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:`| ID                      | Primary disclosure                                                                   | Source inspected                                                                                                                 | Play/run                          |
| ----------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| beach-kitty-ai-campaign | https://github.com/matthewod11-stack/CatRunner#built-with names Claude Code + Gemini | Root tree, assets and scenes visible; README and full PROGRESS.md fetched (354 lines). Core gameplay does not require Gemini key | https://www.beachkittygame.games/ |`,table:"table-9"},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:`| ID                  | Primary disclosure                                                                                                                                                           | Source inspected                                                                                                                              | Play/run                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| gemini-pirate-fleet | https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process author describes Gemini 2.5 Pro + Claude Sonnet 4.5 initial workflow and some manual balance adjustments | Full 79KB Pirate Fleet Commander v7.4.html fetched via GitHub connector, 2002 lines. Game loop, economy, Canvas visuals and input implemented | README direct Pages link to /Pirate%20Fleet%20Commander%20v7.4.html |`,table:"table-9"},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:`| ID               | Primary disclosure                                                                  | Source inspected                                                                                                               | Play/run                                         |
| ---------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| gemini-kymograph | Same collection-wide author disclosure; exact model for current version unspecified | Full Kymograph v4.html fetched, 28KB/628 lines; actual signal puzzle, rule inference, feedback, persistent progress, Web Audio | README direct Pages link to /Kymograph%20v4.html |`,table:"table-9"},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:`| ID                  | Primary disclosure                                             | Source inspected                                                                                                                                                              | Play/run                                                              |
| ------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| gemini-pumpkin-hunt | Same collection-wide author disclosure; no per-game prompt log | Full Pumpkin Hunt Horror Game v3.html fetched, 25KB/236 lines; procedural Three.js scenery/characters/textures, flashlight, stamina, interactions, win/lose, stalker behavior | README direct Pages link to /Pumpkin%20Hunt%20Horror%20Game%20v3.html |`,table:"table-9"},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:`| ID                  | Primary disclosure                                                                                             | Source inspected                                                                                                      | Play/run                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| deepseek-neon-snake | https://github.com/TwitchCaptain/snake author-controlled description: Classic Snake game - created by DeepSeek | README, recursive tree, complete 21KB game.js fetched; index.html/styles.css present. Actual Snake rules/levels/input | README explicitly links https://twitchcaptain.github.io/snake/ |`,table:"table-9"},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:`| ID                | Primary disclosure                                                                                                | Source inspected                                                                                                                                             | Play/run                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| deepseek-mini-ksp | https://github.com/BairlyEmei/mini-ksp author-controlled description: mini-ksp game developed by deepseek harness | README fetched; recursive tree confirms index.html, 172KB js/game.js, tutorial/missions/manual, CSS, 94KB 3D workbench, vendored Three.js and 4 PNG textures | No hosted game advertised. Source ZIP honestly labeled download. README: open index.html or python3 start.py |`,table:"table-9"},{heading:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:"During initial source discovery no generation API was called. The later local game smoke tests are recorded above. GitHub connector was used after web fetch returned cache misses for individual game files. Root agent has live URLs for runtime checks. Data does not claim gameplay was already verified."},{heading:"excluded--deferred",content:"JoakimCarlsson/bastion: web search described an interesting agent-pipeline tower-defense game, but opening the actual repository returned 404; not added."},{heading:"excluded--deferred",content:"theatharvagai/GeminiCLI-Driven-Game-Dev: genuine CLI attribution but README retains placeholder clone URL and preview notes; no hosted demo advertised; deprioritized for quality."},{heading:"excluded--deferred",content:"tonidevvn/dinosaur-game-offline: README explicitly documents Gemini CLI assistance; recursive tree includes complete code and Wikimedia dinosaur images/sounds. Runnable local candidate, deferred because no live URL advertised and an existing Snake runner-style case already expands the tool variety. Could add later with a local capture."},{heading:"excluded--deferred",content:"aerugo/orb: author-controlled repo description says Orb game built with Aider. README and full fractal.js fetched. Complete three-file Three.js procedural shooting sandbox, with Tone.js and Three.js CDN imports. No scoring, loss, or clear win loop found; weaker fit than finished game cases; no advertised live URL. Deferred instead of presenting an interactive graphics prototype as a finished game."},{heading:"excluded--deferred",content:"aideink/game.snake, game.flappy, game.tetris: primary README says created in aide.ink; that is not proof of Aider usage. Not mislabeled as Aider examples."},{heading:"excluded--deferred",content:"zhaojch1/deepseek_game_rts: full README fetched; primarily describes runtime LLM strategic opponents and architecture, not clear AI-assisted development disclosure. Excluded to avoid confusing AI gameplay with AI-built games."},{heading:"excluded--deferred",content:"liuhuize0711git/astrovoid-game: complete project, live deployment guide, source downloadable; only repo description gemini_game and AI Studio scaffold hint. Insufficient specific primary development attribution; deferred."},{heading:"excluded--deferred",content:"showblue/mario_game: author description says created by Gemini AI but README only one line and no live demo advertised. Deferred for weaker documentation."},{heading:"excluded--deferred",content:"KilledByAPixel/LittleJS-AI / LittleJSArcade: 50+ source-complete single-file games, primary toolkit README says games made with those tools, but individual AI provenance unclear. Good future research pool; did not count all games indiscriminately."},{heading:"excluded--deferred",content:"Replit/Devpost/Reddit results (ColorChase, Epic Dev Battles, Mercenary Company, Tiny Skies): creator AI disclosures may exist but no verified complete public source discovered in this pass. Not added on video/screenshots alone."},{heading:"excluded--deferred",content:"JaniDhruv/the-imitation-game: primary Antigravity development disclosure found; runnable complete project requires API keys and is a text interrogation game rather than a clear 2D/3D visual game. Deferred."},{heading:"broader-discovery-sources",content:"https://github.com/lappemic/awesome-ai-built-games — fetched full README; roughly 70+ current hand-curated games with tool/engine clues; links most often point to deployed game, not full source. Root agent can expose this as a discovery directory separately."},{heading:"broader-discovery-sources",content:"https://itch.io/jam/ai-browser-game-jam — recurring AI browser game jam; source requirements need individual verification."},{heading:"broader-discovery-sources",content:"https://vibejam.com/ — broad submission pool; AI game claims must be checked individually."},{heading:"broader-discovery-sources",content:"https://vibecode.game/ — tool/engine directory."},{heading:"broader-discovery-sources",content:'GitHub repository searches: game "gemini cli", game deepseek in:description language:JavaScript, game "gemini" in:description language:HTML, game "aider" in:description language:JavaScript, game "cursor" in:description language:JavaScript.'},{heading:"broader-discovery-sources",content:"Eight entries were authored; six distinct game implementations from three source collections plus two independent DeepSeek cases. All eight retained scope complete-project. Collection-wide disclosures explicitly state that final game versions are not tied to a verified exact model. Category ai-assisted avoids overstating fully autonomous generation."},{heading:"screenshot-qa-completed-same-date",content:"Eight 1280×720 real browser-rendered PNGs, per-case metadata, and a contact sheet were created as temporary working files during this audit. They are not distributed as QA downloads. The retained previews and source provenance are available in the published manifest and media guide. No title-only or loading-only images were retained. Used installed Playwright because Browser plugin/skill was absent. Every retained screenshot was visually inspected."},{heading:"screenshot-qa-completed-same-date",content:"Shooter: Start Game → hold Space → move left; enemy and shots visible; no page errors."},{heading:"screenshot-qa-completed-same-date",content:"Derby: already in a running arena → drive Player 1 with WASD; collisions/particles visible; no page errors."},{heading:"screenshot-qa-completed-same-date",content:"Beach Kitty: campaign Play → Sunny Shore → Space jumps; cat/beach gameplay scene visible; no page errors."},{heading:"screenshot-qa-completed-same-date",content:"Pirate Fleet: WASD movement changed world coordinate from (0,0) to (4,-4); active fleet/economy view; no page errors."},{heading:"screenshot-qa-completed-same-date",content:"Kymograph: Initialize System → first signal puzzle and controls appear; no page errors."},{heading:"screenshot-qa-completed-same-date",content:"Snake: Press to Start → ArrowDown/ArrowLeft changes direction; active snake/food board; no page errors. GitHub Pages redirects to creator domain; direct https://twitchcaptain.com/snake/ works. Metadata sourceUrl remains author-linked Pages demo URL and finalUrl records destination."},{heading:"screenshot-qa-completed-same-date",content:"Mini KSP: downloaded public repository commit de38be79fe88a72e87c4f170bdae76147923c9f0, served on localhost:8867; New Game → skip tutorial → reduce first-stage fuel to one tank and second-stage to zero → Launch → raise throttle. Actual flight screen and first-launch achievement captured; no page errors. Origin local-capture, sourceUrl repository. No code modifications or APIs. Server may be stopped after integration."},{heading:"screenshot-qa-completed-same-date",content:"Pumpkin Hunt: clicking Start reveals actual Three.js forest and HUD. Headless macOS Chromium rejects pointer lock with WrongDocumentError: The root document of this element is not valid for pointer lock. Thus scene rendering confirmed; movement/flashlight remain unverified. Windowed attempt closed during navigation. Captured honest title-free forest scene; no gameplay state injected. This is an automation limitation documented in primary Playwright issue https://github.com/microsoft/playwright/issues/20956, whose maintainer identifies unfocused macOS render view as cause. Root may retain as scene preview with limitation, or replace after manual desktop play."}],headings:[{id:"playable-source-and-engine-review--2026-10-20",content:"Playable-source and engine review — 2026-10-20"},{id:"runtime-checks-and-boundaries",content:"Runtime checks and boundaries"},{id:"existing-engine-and-duplicate-audit",content:"Existing engine and duplicate audit"},{id:"candidates-retained-outside-this-addition",content:"Candidates retained outside this addition"},{id:"expanded-source-review--2026-10-20",content:"Expanded source review — 2026-10-20"},{id:"candidates-kept-outside-the-added-cases",content:"Candidates kept outside the added cases"},{id:"gemini-cli-case-addition",content:"Gemini CLI case addition"},{id:"original-42-case-runtime-and-integration-review",content:"Original 42-case runtime and integration review"},{id:"discovery-notes",content:"Discovery notes"},{id:"gamemap-2d-community-case-audit--2026-10-18",content:"GameMap 2D community case audit — 2026-10-18"},{id:"inclusion-checks",content:"Inclusion checks"},{id:"included-cases-13",content:"Included cases (13)"},{id:"source-tree-checks",content:"Source-tree checks"},{id:"creator-gameplay-images-for-downloadable-projects",content:"Creator gameplay images for downloadable projects"},{id:"browser-verification",content:"Browser verification"},{id:"rejected-or-deferred-prospects",content:"Rejected or deferred prospects"},{id:"community-3d-expansion-audit--2026-10-18",content:"Community 3D expansion audit — 2026-10-18"},{id:"search-coverage",content:"Search coverage"},{id:"included-candidates-and-primary-audits",content:"Included candidates and primary audits"},{id:"strong-alternates-intentionally-not-added-to-browser-set",content:"Strong alternates intentionally not added to browser set"},{id:"rejected--not-counted",content:"Rejected / not counted"},{id:"verification-performed",content:"Verification performed"},{id:"follow-up-from-root-browser-checks",content:"Follow-up from root browser checks"},{id:"diverse-community-case-research--2026-10-18",content:"Diverse community case research — 2026-10-18"},{id:"added-candidates-in-websitesrcdatadiversecommunitycasests",content:"Added candidates in website/src/data/diverseCommunityCases.ts"},{id:"excluded--deferred",content:"Excluded / deferred"},{id:"broader-discovery-sources",content:"Broader discovery sources"},{id:"screenshot-qa-completed-same-date",content:"Screenshot QA completed (same date)"}]},o=[{depth:2,url:"#playable-source-and-engine-review--2026-10-20",title:e.jsx(e.Fragment,{children:"Playable-source and engine review — 2026-10-20"})},{depth:3,url:"#runtime-checks-and-boundaries",title:e.jsx(e.Fragment,{children:"Runtime checks and boundaries"})},{depth:3,url:"#existing-engine-and-duplicate-audit",title:e.jsx(e.Fragment,{children:"Existing engine and duplicate audit"})},{depth:3,url:"#candidates-retained-outside-this-addition",title:e.jsx(e.Fragment,{children:"Candidates retained outside this addition"})},{depth:2,url:"#expanded-source-review--2026-10-20",title:e.jsx(e.Fragment,{children:"Expanded source review — 2026-10-20"})},{depth:3,url:"#candidates-kept-outside-the-added-cases",title:e.jsx(e.Fragment,{children:"Candidates kept outside the added cases"})},{depth:2,url:"#gemini-cli-case-addition",title:e.jsx(e.Fragment,{children:"Gemini CLI case addition"})},{depth:2,url:"#original-42-case-runtime-and-integration-review",title:e.jsx(e.Fragment,{children:"Original 42-case runtime and integration review"})},{depth:2,url:"#discovery-notes",title:e.jsx(e.Fragment,{children:"Discovery notes"})},{depth:3,url:"#gamemap-2d-community-case-audit--2026-10-18",title:e.jsx(e.Fragment,{children:"GameMap 2D community case audit — 2026-10-18"})},{depth:2,url:"#inclusion-checks",title:e.jsx(e.Fragment,{children:"Inclusion checks"})},{depth:2,url:"#included-cases-13",title:e.jsx(e.Fragment,{children:"Included cases (13)"})},{depth:2,url:"#source-tree-checks",title:e.jsx(e.Fragment,{children:"Source-tree checks"})},{depth:2,url:"#creator-gameplay-images-for-downloadable-projects",title:e.jsx(e.Fragment,{children:"Creator gameplay images for downloadable projects"})},{depth:2,url:"#browser-verification",title:e.jsx(e.Fragment,{children:"Browser verification"})},{depth:2,url:"#rejected-or-deferred-prospects",title:e.jsx(e.Fragment,{children:"Rejected or deferred prospects"})},{depth:3,url:"#community-3d-expansion-audit--2026-10-18",title:e.jsx(e.Fragment,{children:"Community 3D expansion audit — 2026-10-18"})},{depth:2,url:"#search-coverage",title:e.jsx(e.Fragment,{children:"Search coverage"})},{depth:2,url:"#included-candidates-and-primary-audits",title:e.jsx(e.Fragment,{children:"Included candidates and primary audits"})},{depth:2,url:"#strong-alternates-intentionally-not-added-to-browser-set",title:e.jsx(e.Fragment,{children:"Strong alternates intentionally not added to browser set"})},{depth:2,url:"#rejected--not-counted",title:e.jsx(e.Fragment,{children:"Rejected / not counted"})},{depth:2,url:"#verification-performed",title:e.jsx(e.Fragment,{children:"Verification performed"})},{depth:2,url:"#follow-up-from-root-browser-checks",title:e.jsx(e.Fragment,{children:"Follow-up from root browser checks"})},{depth:3,url:"#diverse-community-case-research--2026-10-18",title:e.jsx(e.Fragment,{children:"Diverse community case research — 2026-10-18"})},{depth:2,url:"#added-candidates-in-websitesrcdatadiversecommunitycasests",title:e.jsx(e.Fragment,{children:"Added candidates in website/src/data/diverseCommunityCases.ts"})},{depth:2,url:"#excluded--deferred",title:e.jsx(e.Fragment,{children:"Excluded / deferred"})},{depth:2,url:"#broader-discovery-sources",title:e.jsx(e.Fragment,{children:"Broader discovery sources"})},{depth:2,url:"#screenshot-qa-completed-same-date",title:e.jsx(e.Fragment,{children:"Screenshot QA completed (same date)"})}];function i(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(t.p,{children:["Trace game cases back to creator build notes, playable releases, and source projects. Use the candidate records below for discovery, or open the ",e.jsx(t.a,{href:"/docs/tutorials-and-demos/",children:"case guide"})," to study a complete project."]}),`
`,e.jsxs(t.p,{children:["The dated audit notes below preserve findings from individual research and runtime checks. Source-tree snapshots, intermediate captures, console/action logs, and contact sheets were temporary working files; they are not distributed as repository downloads. For the previews included in this project, use the ",e.jsx(t.a,{href:"/GameMap/media/learning/manifest.json",children:"published media manifest"})," and ",e.jsx(t.a,{href:"/docs/media-sources/",children:"media source guide"}),", which record delivered assets and their provenance. The manifest is not a replacement for the complete temporary runtime logs."]}),`
`,e.jsx(t.h2,{id:"playable-source-and-engine-review--2026-10-20",children:"Playable-source and engine review — 2026-10-20"}),`
`,e.jsx(t.p,{children:"This pass prioritizes complete game source and an accessible hosted build or packaged release. Thirteen distinct games are added: twelve received a brief browser interaction check; the Java ME release was downloaded and its archive/manifest checked without executing an emulator. The previous seventy cases remain. Models and coding clients retain the creator’s stated attribution; a model name alone does not establish its client."}),`





















































































































`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Game"}),e.jsx(t.th,{children:"Runtime engine / renderer"}),e.jsx(t.th,{children:"Asset tools"}),e.jsx(t.th,{children:"Creator AI evidence"}),e.jsx(t.th,{children:"Complete source"}),e.jsx(t.th,{children:"Play / package"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"8-Second Crew · 8초 도둑단"}),e.jsx(t.td,{children:"Canvas 2D · Vanilla JavaScript · HTML/CSS UI"}),e.jsx(t.td,{children:"Agent Sprite Forge"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/sdj3261/openai_game_2026#codex%EC%99%80-%ED%95%A8%EA%BB%98-%EB%A7%8C%EB%93%A0-%EA%B3%BC%EC%A0%95",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/sdj3261/openai_game_2026",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://sdj3261.github.io/openai_game_2026/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Core Business"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"Blender · ElevenLabs"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Leichtbier/core-business#readme",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Leichtbier/core-business",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://leichtbier.github.io/core-business/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Vibe Golf"}),e.jsx(t.td,{children:"Bevy 0.14 + Rapier 0.27 · Rust / WebAssembly"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://www.reddit.com/r/ChatGPT/comments/1mnllsq/vibe_coded_a_3d_game_with_gpt_5_and_rust/",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/ahammer/vibe_golf",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://ahammer.github.io/vibe_golf/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Fang the Fox · Game Boy Color"}),e.jsx(t.td,{children:"GBDK-2020 4.5 · C / hUGEDriver"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://tinybitadventures.com/fang-the-fox-on-the-game-boy-color/",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/TinyBitAdventures/fang-the-fox",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://tinybitadventures.com/games/fang-the-fox-gbc/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Three Kingdoms: Hundred Heroes"}),e.jsx(t.td,{children:"DOM/CSS + SVG · React"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/three-kingdoms/CREATION.md",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/three-kingdoms",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://sanguo-jiangshan.vercel.app/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Pelican on a Bike"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/riba2534/claude-opus-5-5-demo#readme",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/riba2534/claude-opus-5-5-demo/tree/main/pelican-bike",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://claude-opus-5-5.riba2534.cn/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Fishslop"}),e.jsx(t.td,{children:"Three.js · TypeScript · Web Audio"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/vasu-devs/FishSlop_Opus5.5/commit/e7a7a2dd61b6da92f9512ccabafad13e1e9a3df4",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/vasu-devs/FishSlop_Opus5.5",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://vasu-devs.github.io/FishSlop_Opus5.5/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Clock Out Unseen"}),e.jsx(t.td,{children:"Canvas 2D · React UI"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Ryan-fm/clockout-unseen/blob/main/docs/DEVELOPMENT.md",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Ryan-fm/clockout-unseen",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://www.bilibili.com/toy/clockout-unseen/index.html",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Nagi Home"}),e.jsx(t.td,{children:"Three.js r169 · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/tanuu5/nagi-home#readme",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/tanuu5/nagi-home",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://tanuu5.github.io/nagi-home/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"THUNDERFALL · Skyward Expedition"}),e.jsx(t.td,{children:"Canvas 2D · Vanilla JavaScript · Web Audio"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/thunderfall/README.md",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/thunderfall",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://thunderfall.vercel.app/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Fruit Ninja Dojo · One More Slice"}),e.jsx(t.td,{children:"Canvas 2D · Vanilla JavaScript · HTML/CSS UI"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://linux.do/t/topic/2857340",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/yongqixue99-hue/fruit-ninja-dojo",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://fruit-ninja-dojo-20260905.yongqixue666.chatgpt.site/",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Pixel Orchard · Memory Harvest"}),e.jsx(t.td,{children:"DOM/CSS · Vanilla JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/README.md",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/013-pixel-orchard.html",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://miaai-lab.github.io/GPT-6-Astra-100-HTML-Files/013-pixel-orchard.html",children:"Play"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Butch Graves 3D"}),e.jsx(t.td,{children:"Custom fixed-point raycaster · Java MIDP 2.0 / CLDC 1.0"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/WollyMonjac/ButchGraves3D#butch-graves-3d",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/WollyMonjac/ButchGraves3D",children:"Project"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/WollyMonjac/ButchGraves3D/tree/main/dist",children:"Package"})})]})]})]}),`
`,e.jsx(t.p,{children:"The two games selected from awesome-gpt-6-astra have independent source directories and unrelated mechanics: THUNDERFALL is a Canvas shooter and Three Kingdoms is a DOM/SVG strategy game. Pixel Orchard is one complete matching game selected from a larger HTML study collection, not a card per visual experiment. The selected Pelican game is not multiplied into the other games in its repository. New source/demo URLs and titles were compared against the existing gallery, including normalized source-directory identities. Fang GBC is a cartridge implementation, not another copy of an existing GameMap entry."}),`
`,e.jsx(t.h3,{id:"runtime-checks-and-boundaries",children:"Runtime checks and boundaries"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"8-Second Crew: normal start, movement and X recording advanced the HUD to turn 2 / one clone."}),`
`,e.jsx(t.li,{children:"THUNDERFALL: start, movement and a bomb yielded score 200 and visible combat."}),`
`,e.jsx(t.li,{children:"Three Kingdoms: farming changed money and agriculture level; End turn began opponent actions."}),`
`,e.jsx(t.li,{children:"Fruit Ninja Dojo: ordinary mouse slicing showed score 8 and a four-fruit combo."}),`
`,e.jsx(t.li,{children:"Pixel Orchard: revealing two cards increased the move counter."}),`
`,e.jsx(t.li,{children:"Clock Out Unseen: normal-level start and movement advanced the timer 150→149. The README’s V1 hosting note differs from observed V2-style features; the exact deployed revision is not claimed."}),`
`,e.jsx(t.li,{children:"Pelican on a Bike: muted start, acceleration, jump achievement and camera change."}),`
`,e.jsx(t.li,{children:"Fishslop: steering, food, coin feedback and a recharging sonar HUD."}),`
`,e.jsx(t.li,{children:"Nagi Home: food placed on the room floor and ball thrown; diary feedback and ball activity appeared."}),`
`,e.jsx(t.li,{children:"Core Business: normal start/transmission and movement/drilling input reached score 25 with fuel/depth feedback using Metal. Initial default-headless shader preparation stalled; the game code was not edited."}),`
`,e.jsx(t.li,{children:"Fang GBC: normal new game, opening dialogue and movement; player position and island-edge feedback changed."}),`
`,e.jsx(t.li,{children:"Vibe Golf: Play and mouse charge/release produced ball movement and speed 24.30 m/s; target/scoring completion was not established. Optional asset .meta requests return 404."}),`
`,e.jsx(t.li,{children:"Butch Graves: the 1,679,547-byte JAR contained 444 archive entries and the expected MIDP 2.0 / CLDC 1.0 manifest. An emulator remains required and was not executed."}),`
`]}),`
`,e.jsx(t.h3,{id:"existing-engine-and-duplicate-audit",children:"Existing engine and duplicate audit"}),`
`,e.jsx(t.p,{children:"All seventy existing runtime labels were checked against direct source imports, renderer calls or native project configuration. Build tools, coding-agent tools and asset-production tools are not treated as game engines. The visible labels now distinguish custom Canvas 2D, DOM/SVG, native WebGL, Phaser and the named 3D engines. Blender and other confirmed asset tools have their own field on cards and detail pages. Sprout Quest uses both Canvas 2D and Three.js; Mini KSP’s separate Three.js construction workbench does not classify its playable Canvas game as Three.js."}),`















































































































































































































































































































































































































































`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Existing game"}),e.jsx(t.th,{children:"Runtime engine / renderer"}),e.jsx(t.th,{children:"Confirmed asset tools"}),e.jsx(t.th,{children:"Runtime source"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"IsoCity"}),e.jsx(t.td,{children:"Custom Canvas 2D · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/amilich/isometric-city/blob/main/src/components/game/CanvasIsometricGrid.tsx#L973",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Project Plateau: Proof Before Dark"}),e.jsx(t.td,{children:"Three.js · WebGL2"}),e.jsx(t.td,{children:"Blender"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/zenstory-ai/novel-to-game/blob/main/examples/project-plateau/build/app/src/main.js#L110",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"SURGE for Oinja"}),e.jsx(t.td,{children:"Three.js · Rapier 3D · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Olivia295/SURGE-for-Oinja/blob/main/src/surge/renderer.ts#L87",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"DEEP YELLOW"}),e.jsx(t.td,{children:"Godot 4.6 · GDScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/aebrer/deep-yellow/blob/master/project.godot#L20",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"morBreaker"}),e.jsx(t.td,{children:"Unity 6 · URP · C#"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/KingMordas/mor-breaker/blob/main/ProjectSettings/ProjectVersion.txt#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Silent Meridian"}),e.jsx(t.td,{children:"Custom JavaScript · DOM/CSS · WebGL · Web Audio"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/stackloomdev/silent-meridian/blob/main/src/scene-depth.js#L188",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Castle Clash Duel"}),e.jsx(t.td,{children:"Phaser 3 · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/chongdashu/phaserjs-tinyswords/blob/main/public/index.html#L4340",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Golden Hour Skatepark"}),e.jsx(t.td,{children:"Three.js · TypeScript"}),e.jsx(t.td,{children:"Blender"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/StarKnightt/skate-park/blob/main/src/game.ts#L121",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Vibe Racer"}),e.jsx(t.td,{children:"Pygame 2.6 · Python"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Kecksdose/vibe_racer/blob/main/src/render.py#L3",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Journey to the West: Three Borrowings of the Banana Fan"}),e.jsx(t.td,{children:"Custom Canvas 2D · JavaScript · DOM UI"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/zenstory-ai/novel-to-game/blob/main/examples/journey-to-the-west/build/app/js/overworld.js#L24",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Clowder & Crest"}),e.jsx(t.td,{children:"Phaser 3 · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/JacobStephens2/clowder-and-crest/blob/main/src/main.ts#L170",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Pokemon Tactics"}),e.jsx(t.td,{children:"Babylon.js · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/kekel87/pokemon-tactics/blob/main/packages/app/src/renderer-backend.ts#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Rhythm Master 3D"}),e.jsx(t.td,{children:"Three.js · Tone.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/frankjniu/rhythm-game/blob/main/rhythm.html#L820",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Spirit of Kiro"}),e.jsx(t.td,{children:"Custom Vue 3 · DOM/CSS sprites · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/kirodotdev/spirit-of-kiro/blob/main/client/src/components/PlayerCharacter.vue#L376",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"IsoCoaster"}),e.jsx(t.td,{children:"Custom Canvas 2D · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/amilich/isometric-city/blob/main/src/components/coaster/CoasterGrid.tsx#L2625",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Astra Floor"}),e.jsx(t.td,{children:"Three.js · TypeScript (React UI)"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/BEROCHLU/astrafloor/blob/main/lib/game.ts#L379",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Mosswing"}),e.jsx(t.td,{children:"Three.js · JavaScript · WebGL"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/main/mosswing/src/game.js#L40",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Sprout Quest"}),e.jsx(t.td,{children:"Custom Canvas 2D + Three.js · TypeScript"}),e.jsx(t.td,{children:"Blender"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/aibengineering/sprout-quest/blob/main/src/main.ts#L32",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Claude Dreaming"}),e.jsx(t.td,{children:"Godot 4.7 · GDScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/moritzfh/claude-dreaming/blob/main/project.godot#L15",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"3D Sakura Crossing: an exploration prototype"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/danymaniglie-cmyk/3d-sakura-crossing/blob/main/index.html#L114",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Magic Carpet Wizard · A Thousand Skies"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/threapchills/MagicCarpetWizard/blob/main/src/main.js#L33",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Supermarket Simulator"}),e.jsx(t.td,{children:"Unity 2023.2.6f1 · URP · C#"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/breineng/supermarket-simulator/blob/main/ProjectSettings/ProjectVersion.txt#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Arkanoid Neon"}),e.jsx(t.td,{children:"Custom Canvas 2D · JavaScript · Web Audio"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Jack-c3l2w/arkanoid-neon/blob/main/game.js#L153",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Crown Defender TD 3D · Codex build"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/game.js#L244",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Three Quake: an AI-assisted Quake port"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/mrdoob/three-quake/blob/main/src/vid.js#L185",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Action with AI: a Roo Code experiment"}),e.jsx(t.td,{children:"React · SVG · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/mizchi/action-with-ai/blob/HEAD/src/renderer/App.tsx#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Cloud Crush: Gemini CLI builds a match-3 game"}),e.jsx(t.td,{children:"Ebitengine 2 · Go / WebAssembly"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/GoogleCloudPlatform/devrel-demos/blob/HEAD/codelabs/gemini-cli/gemini-cli-match3-golang/main.go#L14",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Dinosaur Game Offline: Gemini CLI-assisted runner"}),e.jsx(t.td,{children:"DOM / CSS · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/tonidevvn/dinosaur-game-offline/blob/HEAD/script.js#L75",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Moonlight & Mayhem"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"gpt-image-2"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/simonw/raccoon-heist-codex/blob/HEAD/src/game.js#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"TRON: EXONIX"}),e.jsx(t.td,{children:"Godot 4.7 · GDScript"}),e.jsx(t.td,{children:"Blender · Nano Banana · PATINA · Tripo · Stable Audio · ElevenLabs"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/witnesstodark/tron-exonix/blob/HEAD/game/project.godot#L15",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Tetris built by an AI agent team"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/caiguanhao/tetris/blob/HEAD/js/renderer.js#L10",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Tower of Time: prompting a rewind mechanic"}),e.jsx(t.td,{children:"Phaser 3 · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/maciej-trebacz/tower-of-time-game/blob/HEAD/src/main.ts#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Raccoon Heist"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"gpt-image-2"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/simonw/raccoon-heist/blob/HEAD/js/main.js#L4",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Hajimi Defense: The Tuna Crisis"}),e.jsx(t.td,{children:"Phaser 3 · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://yelonhu.github.io/OpenGame-landing-page/games/hajimi/assets/index-Be3e4nNy.js",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Marvel Avengers: Infinity Strike"}),e.jsx(t.td,{children:"Phaser 3 · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://yelonhu.github.io/OpenGame-landing-page/games/marvel/assets/index-ClG0C0ss.js",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Harry Potter: Arithmancy Academy"}),e.jsx(t.td,{children:"Phaser 3 · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://yelonhu.github.io/OpenGame-landing-page/games/harryPotter/assets/index-BQiJ9jNZ.js",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Star Wars: Mandalorian Protocol"}),e.jsx(t.td,{children:"Phaser 3 · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://yelonhu.github.io/OpenGame-landing-page/games/starWars/assets/index-DDnJ5zpE.js",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Turbo Kart Rally"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/bridge-mind/turbo-kart-rally/blob/HEAD/src/main.js#L2",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Long Wind"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"Tripo · Adobe Mixamo"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/jbang2004/long-wind/blob/HEAD/src/core/app.js#L16",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"NOVA LANCER"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/tanuu5/nova-lancer/blob/HEAD/src/gfx.js#L2",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Orb Shooter"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/theredstapler/orb-shooter/blob/HEAD/src/main.js#L2",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Operation Naptime · Operación Siesta"}),e.jsx(t.td,{children:"Three.js + Rapier · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/alandaitch/operacion-siesta/blob/HEAD/src/core/engine.js#L26",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Ombres"}),e.jsx(t.td,{children:"React Three Fiber · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/briossant/ombres/blob/HEAD/src/host/render/WorldCanvas.tsx#L8",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Dragon’s Reach"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/jaydemks/ImADragon_onepromptcode_game/blob/HEAD/src/core/Engine.js#L10",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Vibe Jet"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/cedrickchee/vibe-jet/blob/HEAD/game.html#L40",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Slide Rush"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/KJLKurt/waterslide-game-opus-5.5/blob/HEAD/src/App.js#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"The Tithe"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/miguelsolorio/the-tithe/blob/HEAD/src/main.js#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Michi-Neko · The Cat Philosopher’s Path"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path/blob/HEAD/src/main.js#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"FragArena"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/jonnyleigh/fragarena/blob/HEAD/js/renderer.js#L11",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"GothicVania: Codex builds a platformer"}),e.jsx(t.td,{children:"Phaser 3 · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/acatovic/gothicvania-codex-demo/blob/main/index.html#L36",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Pixel Princess: a complete arcade campaign"}),e.jsx(t.td,{children:"KAPLAY · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/VTvito/pixel-princess-platformer/blob/main/src/kaplayCtx.js#L7",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Claude Code Tower Defense"}),e.jsx(t.td,{children:"PixiJS · TypeScript / Next.js"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/mdkess/claude-game/blob/main/src/game/Game.ts#L1",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Cursor’s procedural platformer experiment"}),e.jsx(t.td,{children:"Canvas 2D · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/commjoen/generated-game-experiment/blob/main/src/main.ts#L11",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Mini Snake: a Claude conversation game"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/BizShibe/claude-ai-mini-snake-game/blob/main/index.html#L459",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Flux: Codex gravity-flip runner"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/scriptedbyshivam/codex-hackathon-2026/blob/main/index.html#L117",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Bash Fighter: an agent-developed multiplayer brawler"}),e.jsx(t.td,{children:"PixiJS · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Bash-Entertainment/bash-fighter/blob/main/packages/render/src/stage.ts#L7",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Running Man: Claude Code meets PixelLab"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/balbonits/ai-browser-game-demos/blob/main/public/games/running-man/main.js#L33",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Garden Match: agents build and review a puzzle game"}),e.jsx(t.td,{children:"Phaser 3 · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/kevinchenkai/GameAI/blob/main/garden/web/src/main.ts#L7",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Dunkirk: an honestly documented AI-assisted shooter"}),e.jsx(t.td,{children:"Godot 4.6 · GDScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Ponloe/dunkirk-godot/blob/main/project.godot#L19",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Gravity Birds: Grok Bot directs Cursor"}),e.jsx(t.td,{children:"Godot 4.3 · GDScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/az9713/grokbot-game-dev-demo/blob/main/project.godot#L16",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Quasar Saz: an unusual Claude Code experiment"}),e.jsx(t.td,{children:"Godot 4.6 .NET · C#"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/cleak/quasar-saz/blob/master/project.godot#L16",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Agent Arcade: Copilot builds desktop arcade games"}),e.jsx(t.td,{children:"Phaser · TypeScript / Tauri"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/DanWahlin/agent-arcade/blob/main/src/game/game.ts#L60",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Space Shooter: a family Cursor experiment"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/littleearth/vibe-coded-games/blob/main/shooter/game.js#L175",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Destruction Derby Arena"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/littleearth/vibe-coded-games/blob/main/demoderby/game.js#L4",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Beach Kitty"}),e.jsx(t.td,{children:"Phaser 3 · React · TypeScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/matthewod11-stack/CatRunner/blob/main/components/PhaserGame.tsx#L2",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Pirate Fleet Commander"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pirate%20Fleet%20Commander%20v7.4.html#L425",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Kymograph"}),e.jsx(t.td,{children:"HTML / SVG · JavaScript · Web Audio"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/JoeySalmons/vibe-coded-games/blob/main/Kymograph%20v4.html#L228",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Midnight Pumpkin Hunt"}),e.jsx(t.td,{children:"Three.js · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pumpkin%20Hunt%20Horror%20Game%20v3.html#L61",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Snake: Neon Arcade Edition"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/TwitchCaptain/snake/blob/main/game.js#L7",children:"Source file"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Mini KSP: a Chinese rocket sandbox"}),e.jsx(t.td,{children:"Canvas 2D · JavaScript"}),e.jsx(t.td,{children:"—"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/BairlyEmei/mini-ksp/blob/main/js/game.js#L1283",children:"Source file"})})]})]})]}),`
`,e.jsx(t.p,{children:"Existing source repositories were normalized to their current owner/repository identities and the seventy final demo/download addresses compared after redirects. No hidden alias, renamed-repository duplicate or shared final game URL was found. Known shared repositories retain separate game implementations: IsoCity/IsoCoaster, the two NovelToGame adaptations, the four OpenGame archives, the two Little Earth games and three distinct Joey Salmons HTML games. Simon Willison’s two raccoon games have separate source, objectives and worlds."}),`
`,e.jsx(t.h3,{id:"candidates-retained-outside-this-addition",children:"Candidates retained outside this addition"}),`

































`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Candidate"}),e.jsx(t.th,{children:"Why it is not one of the new playable cases"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/chongdashu/love2d-pocket-bomber-game",children:"Pocket Bomber"})}),e.jsx(t.td,{children:"Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/teedjay/go-bombjack",children:"Bomb Jack Go"})}),e.jsx(t.td,{children:"Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/frankhale/opus-fps",children:"Opus FPS"})}),e.jsx(t.td,{children:"Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/highlandhodl/coengineers-os-games",children:"CoEngineers Games"})}),e.jsx(t.td,{children:"Complete Phaser collection with an explicit Claude Code workflow, but no hosted play link or local execution was completed in this pass. Its modes are not multiplied into separate cases."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/jc-able/not-mortal-kombat",children:"Not Mortal Kombat"})}),e.jsx(t.td,{children:"Public code deliberately omits roughly 770 MB of character/cinematic binaries; do not equate the code-only checkout with a complete playable asset package."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/ddalkakgames/codex-gamedev-harness",children:"Starball Run / Codex GameDev Harness"})}),e.jsx(t.td,{children:"Unreal workflow and vertical-slice planning evidence, without a verified complete delivered game package or public playable build in this pass. It is not used to create an Unreal case just to fill a category."})]})]})]}),`
`,e.jsx(t.h2,{id:"expanded-source-review--2026-10-20",children:"Expanded source review — 2026-10-20"}),`
`,e.jsx(t.p,{children:"Search covered creator repositories, developer accounts, engine communities and public game directories. Directory rows were leads; the table below links the creator evidence and actual project for each addition. The original cases remain in the gallery. IsoCity/IsoCoaster share one implementation repository but expose distinct games; the two NovelToGame entries adapt different works into different game systems. Isometric Canvas games remain 2D, while 3D terrain or first-person projects are marked 3D."}),`


































































































































































































`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Game"}),e.jsx(t.th,{children:"Creator AI evidence"}),e.jsx(t.th,{children:"Complete project"}),e.jsx(t.th,{children:"Play / run"}),e.jsx(t.th,{children:"Preview origin"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"IsoCity"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/amilich/isometric-city#readme",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/amilich/isometric-city",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://iso-city.com",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Project Plateau: Proof Before Dark"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/zenstory-ai/novel-to-game#what-the-qa-record-admits-it-did-not-test",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/zenstory-ai/novel-to-game/tree/main/examples/project-plateau",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://plateau.vibecoco.ai/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"SURGE for Oinja"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/106",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Olivia295/SURGE-for-Oinja",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://oinja-game.vercel.app/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"DEEP YELLOW"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/aebrer/deep-yellow/blob/master/CREDITS.md#code-and-design",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/aebrer/deep-yellow",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://aebrer.itch.io/deep-yellow",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"morBreaker"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/KingMordas/mor-breaker#built-with-claude-code-",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/KingMordas/mor-breaker",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/KingMordas/mor-breaker/releases/tag/v1.2.0",children:"Download / local"})}),e.jsx(t.td,{children:"local-capture"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Silent Meridian"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/stackloomdev/silent-meridian/blob/main/docs/CREATION.md",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/stackloomdev/silent-meridian",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://silent-meridian.pjstack.dev/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Castle Clash Duel"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/chongdashu/phaserjs-tinyswords#implementation-with-agent-skills",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/chongdashu/phaserjs-tinyswords",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://vibe-tiny-swords.vercel.app/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Golden Hour Skatepark"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/StarKnightt/skate-park#how-it-was-built",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/StarKnightt/skate-park",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://starknightt.github.io/skate-park/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Vibe Racer"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Kecksdose/vibe_racer#development",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Kecksdose/vibe_racer",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Kecksdose/vibe_racer/archive/refs/heads/main.zip",children:"Download / local"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Journey to the West: Three Borrowings of the Banana Fan"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/zenstory-ai/novel-to-game#play-online",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/zenstory-ai/novel-to-game/tree/main/examples/journey-to-the-west",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://xiyouji.vibecoco.ai/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Clowder & Crest"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/JacobStephens2/clowder-and-crest#built-with",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/JacobStephens2/clowder-and-crest",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://clowderandcrest.com/",children:"Browser"})}),e.jsx(t.td,{children:"browser-capture"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Pokemon Tactics"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/kekel87/pokemon-tactics#built-with-ai",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/kekel87/pokemon-tactics",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://kekel87.itch.io/pokemon-tactics",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Rhythm Master 3D"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://www.linkedin.com/posts/frankniu_if-youre-not-vibe-coding-with-claude-sonnet-activity-7304977951761039362-2xQe",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/frankjniu/rhythm-game",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/frankjniu/rhythm-game/archive/refs/heads/main.zip",children:"Download / local"})}),e.jsx(t.td,{children:"local-capture"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Spirit of Kiro"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/kirodotdev/spirit-of-kiro#spirit-of-kiro",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/kirodotdev/spirit-of-kiro",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/kirodotdev/spirit-of-kiro/archive/refs/heads/main.zip",children:"Download / local"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"IsoCoaster"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/amilich/isometric-city#readme",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/amilich/isometric-city",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://iso-coaster.com",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Astra Floor"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/96",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/BEROCHLU/astrafloor",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://astrafloor.berochlu.workers.dev/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Mosswing"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Ayi1337/gpt6-astra-one-shot-games#02--mosswing",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://mosswing-quiet-flight.jack-514.chatgpt.site/",children:"Browser"})}),e.jsx(t.td,{children:"browser-capture"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Sprout Quest"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/aibengineering/sprout-quest#how-it-was-built",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/aibengineering/sprout-quest",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://aibengineering.github.io/sprout-quest/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Claude Dreaming"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://rusty-production.itch.io/claude-dreaming",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/moritzfh/claude-dreaming",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://rusty-production.itch.io/claude-dreaming",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"3D Sakura Crossing: an exploration prototype"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/danymaniglie-cmyk/3d-sakura-crossing#credits",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/danymaniglie-cmyk/3d-sakura-crossing",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://danymaniglie-cmyk.github.io/3d-sakura-crossing/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Magic Carpet Wizard · A Thousand Skies"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/threapchills/MagicCarpetWizard",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/threapchills/MagicCarpetWizard",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://threapchills.github.io/MagicCarpetWizard/",children:"Browser"})}),e.jsx(t.td,{children:"browser-capture"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Supermarket Simulator"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/breineng/supermarket-simulator#description",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/breineng/supermarket-simulator",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/breineng/supermarket-simulator/releases/download/0.0.1/SupermarketSimulator.zip",children:"Download / local"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Arkanoid Neon"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Jack-c3l2w/arkanoid-neon#readme",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Jack-c3l2w/arkanoid-neon",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://jack-c3l2w.github.io/arkanoid-neon/",children:"Browser"})}),e.jsx(t.td,{children:"creator-screenshot"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Crown Defender TD 3D · Codex build"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/COMPARISON.md",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/archive/refs/heads/main.zip",children:"Download / local"})}),e.jsx(t.td,{children:"local-capture"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Three Quake: an AI-assisted Quake port"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/mrdoob/three-quake#credits",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/mrdoob/three-quake",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://mrdoob.github.io/three-quake/",children:"Browser"})}),e.jsx(t.td,{children:"browser-capture"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Action with AI: a Roo Code experiment"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://zenn.dev/mizchi/articles/game-with-cline",children:"Creator record"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/mizchi/action-with-ai",children:"Source"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://action-with-ai.mizchi.workers.dev/",children:"Browser"})}),e.jsx(t.td,{children:"browser-capture"})]})]})]}),`
`,e.jsx(t.p,{children:"Source checks establish what the creator publishes, not an audited AI authorship percentage. A Claude or Astra model mention alone is not attributed to Claude Code or Codex. Roo Code, OpenCode, Kiro and Windsurf remain distinct clients; the novel adaptations do not identify their exact client. Quake is credited as an assisted port of id Software’s existing game. Native engines, Git LFS, cloud runtime requirements and separate asset terms are written beside the relevant run/source operation. The per-game study steps are proposed learning exercises."}),`
`,e.jsx(t.h3,{id:"candidates-kept-outside-the-added-cases",children:"Candidates kept outside the added cases"}),`





























`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Candidate"}),e.jsx(t.th,{children:"Evidence boundary / next check"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Bills-Institute-of-Technology/GODOT4_CycleTour",children:"GODOT4 Cycle Tour"})}),e.jsx(t.td,{children:"README says scenes, scripts and assets will be added later; setup prose alone is not a delivered game."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/TripoGrowthLab/vibe-gaming-interactive-playbook",children:"Tripo playbook examples"})}),e.jsx(t.td,{children:"Already covered as a workflow; public projects intentionally omit final generated GLBs and render as greyboxes. Do not duplicate them as complete game-and-asset examples."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/xilinnihao-afk/sandline-threejs-fps",children:"SANDLINE"})}),e.jsx(t.td,{children:"The discovered project requires third-party character assets absent from a clean clone; retain it as a lead rather than a complete packaged case."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/suuus/detective-agentic-mysteries",children:"Detective Agentic Mysteries"})}),e.jsx(t.td,{children:"Development evidence is explicit, but its Copilot runtime needs authentication/subscription and no genuine gameplay preview was captured. Current SDK/CLI requirements supersede the README’s older Node/extension setup; no account setup was performed."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/vijaydotin/multiverse-mate",children:"Multiverse Mate"})}),e.jsx(t.td,{children:"The documented root pnpm dev command does not exist in the reviewed package. PostgreSQL, DATABASE_URL and separate service ports require a corrected reproducible setup before promotion."})]})]})]}),`
`,e.jsx(t.p,{children:"The discovery section also adds Vibe Jam, AI Browser Game Jam and the Astra source collection. Those links do not increase the reviewed game count."}),`
`,e.jsx(t.h2,{id:"gemini-cli-case-addition",children:"Gemini CLI case addition"}),`
`,e.jsx(t.p,{children:"Two previously reviewed code resources now also have individual game cases. Both are 2D games and are explicitly attributed to the Gemini CLI client, distinct from the six existing cases using Gemini models or AI Studio."}),`























`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Game"}),e.jsx(t.th,{children:"Primary AI evidence and source"}),e.jsx(t.th,{children:"Play or run"}),e.jsx(t.th,{children:"Real screenshot"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Cloud Crush"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang",children:"Google's complete game project and README"}),"; ",e.jsx(t.a,{href:"https://codelabs.developers.google.com/next26/gemini-cli-match3-golang",children:"official prompt-by-prompt codelab"})]}),e.jsx(t.td,{children:"Local Go / WASM project; no public hosted endpoint was verified"}),e.jsxs(t.td,{children:["Publisher screenshot at ",e.jsx(t.a,{href:"https://github.com/GoogleCloudPlatform/devrel-demos/blob/cdded29daeb83a24d37dc5c7ead5c85d8a08ff89/codelabs/gemini-cli/gemini-cli-match3-golang/screenshots/09_gameplay.png",children:"fixed revision"}),"; not a GameMap local run"]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Dinosaur Game Offline"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped",children:"Creator README"}),", source, and in-game footer explicitly name gemini-cli"]}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://tonidevvn.github.io/dinosaur-game-offline/",children:"Author-hosted browser build"}),"; complete static project also opens locally via index.html"]}),e.jsx(t.td,{children:"GameMap browser capture after start and jump; score, collision/game over, and restart checked"})]})]})]}),`
`,e.jsxs(t.p,{children:["Dinosaur source revision ",e.jsx(t.code,{children:"e0f3f584751bb80425bd49513fa7b54503f13d62"})," includes index.html, style.css, script.js, and the referenced image/audio assets. Its live build returned HTTP 200 and passed the normal keyboard flow in Chromium at 1280 × 720, with no final-run JavaScript errors or failed requests. The board has a fixed desktop width. No repository code license is declared, so this collection calls it public source without assigning an open-source license."]}),`
`,e.jsxs(t.p,{children:["Cloud Crush source subdirectory revision ",e.jsx(t.code,{children:"cdded29daeb83a24d37dc5c7ead5c85d8a08ff89"})," contains complete Go game logic, native and WASM setup, source assets, a static server, and a Dockerfile; the repository's code license is Apache-2.0. No Go toolchain was installed for this review and the game was not compiled locally. The current go.mod requires Go 1.26.2; the README's 1.24+ prerequisite is outdated. The server serves public/, but the committed public/assets lacks required source assets. The case therefore includes copying assets/* into public/assets before serving, matching the Dockerfile's approach, and copying wasm_exec.js from the same Go toolchain used to compile. ",e.jsx(t.a,{href:"https://go.dev/wiki/WebAssembly#javascript-goosjs-port",children:"Official Go guidance"})," requires matching the helper and compiler versions. Local play does not require Gemini CLI or a cloud account; the codelab's optional cloud deployment does."]}),`
`,e.jsx(t.p,{children:"The expanded 44-case gallery passed the production build, generated-content checks, and a targeted Chromium UI pass at 1440 × 1300 and 390 × 844 using Playwright (Browser plugin unavailable). Gemini CLI selects exactly these two cases; 2D retains them and 3D shows an empty state. Browser/local mode separates the two correctly. Both images decode at their recorded dimensions, image dialogs show the correct capture/publisher provenance, and source links and local setup details are present. Keyword search, clear/reset, mobile width, and the standalone file:// build passed. App console errors and warnings were empty. These UI checks do not imply a local Cloud Crush compilation."}),`
`,e.jsx(t.h2,{id:"original-42-case-runtime-and-integration-review",children:"Original 42-case runtime and integration review"}),`
`,e.jsx(t.p,{children:"All 42 case IDs are distinct and related resource IDs resolve. A separate content review checked duplicate implementations, dimensions, engine labels, AI roles, and evidence types. Garden Match credits human product/QA, Codex planning/art, and Claude engineering; OpenGame is explicitly labeled a generation framework. The case-study steps are editorial suggestions."}),`
`,e.jsx(t.p,{children:"The gallery was checked at 1440 × 1000 and 390 × 844 in Chromium with Playwright because the Browser plugin was unavailable. Counts, 2D/3D filters, combined keyword and play-mode filters, empty-state reset, screenshot expansion/Escape close, and mobile width passed with no app console errors. The production build and generated-content checks passed after the media merge, including all 42 image/source records. Public demos received targeted smoke checks, not complete playthroughs. Downloaded source and creator screenshots do not imply every desktop game was locally reproduced."}),`
`,e.jsxs(t.p,{children:["Mini KSP was served from its unmodified public source and launched through the normal UI. Garden Match source revision 8bb87ee5c2698922f79f9b277d97b1392f38d0e2 was transpiled without gameplay edits and captured with its documented development Canvas renderer option. A real tile drag was attempted but was an invalid swap; no completed match is claimed. Orb Shooter and Pumpkin Hunt scenes render, but automated pointer-lock interaction was limited. Screenshot origins and original image URLs are recorded in the ",e.jsx(t.a,{href:"/docs/media-sources/",children:"media guide"}),"."]}),`
`,e.jsx(t.h2,{id:"discovery-notes",children:"Discovery notes"}),`
`,e.jsx(t.h3,{id:"gamemap-2d-community-case-audit--2026-10-18",children:"GameMap 2D community case audit — 2026-10-18"}),`
`,e.jsx(t.p,{children:"This is a dated research snapshot, not an exhaustive inventory of every community game. The search covered 26 broad query variations across Claude, Claude Code, Codex, Cursor, Gemini, Grok, Aider, ChatGPT, Pygame, Godot and browser games. A curated directory was used for discovery only; inclusion rests on creator-controlled repositories, articles, source trees, or deployed games. The existing Tetris, Tower of Time, and OpenGame entries were excluded from this expansion."}),`
`,e.jsx(t.h2,{id:"inclusion-checks",children:"Inclusion checks"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:`A creator explicitly describes generative AI's development contribution; ordinary NPC/pathfinding "AI" is insufficient.`}),`
`,e.jsx(t.li,{children:"A public repository contains the actual game implementation (checked using recursive public GitHub API trees for all 13 included repositories)."}),`
`,e.jsx(t.li,{children:"A creator links a browser game or gives runnable source/release instructions."}),`
`,e.jsxs(t.li,{children:["A README disclosure is labelled ",e.jsx(t.code,{children:"disclosure"}),", not represented as a prompt log. Development articles or creator-written summaries use ",e.jsx(t.code,{children:"build-log"}),". None of these entries claims an independently audited percentage of AI authorship."]}),`
`,e.jsx(t.li,{children:"One representative game was selected from the John Dilig collection and one from the GameAI collection, to avoid multiplying a suite into many near-identical cards."}),`
`]}),`
`,e.jsx(t.h2,{id:"included-cases-13",children:"Included cases (13)"}),`

























































































`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"ID"}),e.jsx(t.th,{children:"Creator source and AI evidence"}),e.jsx(t.th,{children:"Play/run entry"}),e.jsx(t.th,{children:"Evidence interpretation"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"gothicvania-codex"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/acatovic/gothicvania-codex-demo#the-story",children:"https://github.com/acatovic/gothicvania-codex-demo#the-story"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://acatovic.github.io/gothicvania-codex-demo/",children:"https://acatovic.github.io/gothicvania-codex-demo/"})}),e.jsx(t.td,{children:"Creator describes progressive Codex prompts, skills and Playwright; human assets and manual Tiled level are explicitly credited."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"pixel-princess-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/VTvito/pixel-princess-platformer#built-with-ai--how-this-was-made",children:"https://github.com/VTvito/pixel-princess-platformer#built-with-ai--how-this-was-made"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://gameforprincess.vercel.app/",children:"https://gameforprincess.vercel.app/"})}),e.jsx(t.td,{children:"Claude Code collaboration disclosure; human product direction, review and device QA."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"claude-tower-defense"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/mdkess/claude-game#built-with-ai",children:"https://github.com/mdkess/claude-game#built-with-ai"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://claude-game-lilac.vercel.app/",children:"https://claude-game-lilac.vercel.app/"})}),e.jsx(t.td,{children:"Creator says entirely Claude Code; public complete implementation and headless simulator; no prompt history claimed."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"cursor-procedural-platformer"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/commjoen/generated-game-experiment",children:"https://github.com/commjoen/generated-game-experiment"})," ; ",e.jsx(t.a,{href:"https://github.com/commjoen/generated-game-experiment/blob/main/.cursor/rules/conversation.md",children:"https://github.com/commjoen/generated-game-experiment/blob/main/.cursor/rules/conversation.md"})]}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://commjoen.github.io/generated-game-experiment/",children:"https://commjoen.github.io/generated-game-experiment/"})}),e.jsx(t.td,{children:"Repository calls itself a Cursor game experiment. The conversation file was fetched: it is a bullet summary of user/assistant stages, not a verbatim transcript."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"claude-mini-snake"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/BizShibe/claude-ai-mini-snake-game#readme",children:"https://github.com/BizShibe/claude-ai-mini-snake-game#readme"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://minisnake.vercel.app/",children:"https://minisnake.vercel.app/"})}),e.jsx(t.td,{children:"Creator says generated in a Claude conversation. This is Claude chat, not evidence of Claude Code; resourceIds is empty."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"flux-codex-runner"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/scriptedbyshivam/codex-hackathon-2026#readme",children:"https://github.com/scriptedbyshivam/codex-hackathon-2026#readme"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://codex-hackathon-drab.vercel.app/",children:"https://codex-hackathon-drab.vercel.app/"})}),e.jsx(t.td,{children:"Creator development account names Codex across seven milestones. Only the runner behavior is described here; wellness claims are not repeated."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"bash-fighter-agent"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Bash-Entertainment/bash-fighter#readme",children:"https://github.com/Bash-Entertainment/bash-fighter#readme"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://bashfighter.com/",children:"https://bashfighter.com/"})}),e.jsx(t.td,{children:"Owner explicitly says most code and day-to-day development are done by an AI agent. No specific model/client is attributed without evidence."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"running-man-claude-pixellab"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/balbonits/ai-browser-game-demos#tools-used",children:"https://github.com/balbonits/ai-browser-game-demos#tools-used"})," ; ",e.jsx(t.a,{href:"https://github.com/balbonits/ai-browser-game-demos/blob/main/docs/games/running-man.md",children:"https://github.com/balbonits/ai-browser-game-demos/blob/main/docs/games/running-man.md"})]}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://games.jdilig.me/games/running-man/",children:"https://games.jdilig.me/games/running-man/"})}),e.jsx(t.td,{children:"Creator names Claude Code for code and PixelLab for art. Per-game notes include asset inventory, controls, architecture and dated changes. Actual source is now under public/games/."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"garden-match-agents"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/kevinchenkai/GameAI#readme",children:"https://github.com/kevinchenkai/GameAI#readme"})," ; ",e.jsx(t.a,{href:"https://github.com/kevinchenkai/GameAI/blob/main/garden/README.md",children:"https://github.com/kevinchenkai/GameAI/blob/main/garden/README.md"})]}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://g.ismayday.mobi/garden/",children:"https://g.ismayday.mobi/garden/"})}),e.jsx(t.td,{children:"Creator names a Codex-centered, implementation-plus-independent-review workflow; per-game docs distinguish code layers, Codex art orders and human device validation."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"dunkirk-ai-assisted"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Ponloe/dunkirk-godot#ai-usage",children:"https://github.com/Ponloe/dunkirk-godot#ai-usage"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://cheery-sable-f2dce2.netlify.app/dunkirk.html",children:"https://cheery-sable-f2dce2.netlify.app/dunkirk.html"})}),e.jsx(t.td,{children:"Narrow, explicit contribution table: Gemini backdrop/ideation; ChatGPT planning/debugging; Claude small suggestions; manual integration/testing and externally licensed music. Representative prompts are examples, not a complete log."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"gravity-birds-grok-cursor"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/az9713/grokbot-game-dev-demo",children:"https://github.com/az9713/grokbot-game-dev-demo"})," ; ",e.jsx(t.a,{href:"https://az9713.github.io/grokbot-game-dev-demo/gravity-birds-dev-journey.html",children:"https://az9713.github.io/grokbot-game-dev-demo/gravity-birds-dev-journey.html"})]}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/az9713/grokbot-game-dev-demo#opening-in-godot-4",children:"https://github.com/az9713/grokbot-game-dev-demo#opening-in-godot-4"})}),e.jsx(t.td,{children:"Godot source download. The journey HTML was fetched and read: Grok Bot coordinated Cursor Cloud Agents, local testing found movement/solvability bugs, subsequent fixes are described. It explicitly says the web export is incomplete; not classified as a playable browser build."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"quasar-saz-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/cleak/quasar-saz#how-it-was-made",children:"https://github.com/cleak/quasar-saz#how-it-was-made"})}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/cleak/quasar-saz/releases/tag/v1.1",children:"https://github.com/cleak/quasar-saz/releases/tag/v1.1"})}),e.jsx(t.td,{children:"Creator describes Claude Code interpreting dog keyboard input and building code/procedural art/audio with tests. Recommended v1.1 adds human fixes; not called an untouched AI result. Godot Mono/C# source."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"agent-arcade-copilot"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/DanWahlin/agent-arcade#how-this-was-made",children:"https://github.com/DanWahlin/agent-arcade#how-this-was-made"})," ; ",e.jsx(t.a,{href:"https://blog.codewithdan.com/building-agent-arcade-with-github-copilot-cli/",children:"https://blog.codewithdan.com/building-agent-arcade-with-github-copilot-cli/"})]}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/DanWahlin/agent-arcade/releases",children:"https://github.com/DanWahlin/agent-arcade/releases"})}),e.jsx(t.td,{children:"Creator article describes Copilot CLI planning, game mechanics, screenshot feedback, Tauri migration and releases. Credited human-made sprites/reference code remain part of the project."})]})]})]}),`
`,e.jsx(t.h2,{id:"source-tree-checks",children:"Source-tree checks"}),`
`,e.jsx(t.p,{children:"Public GitHub tree JSON snapshots were held in temporary working files during this audit. They contained source paths and pinned HEAD SHA values, not downloaded repository code, and are not bundled with this repository. Verified file counts: GothicVania 40; Pixel Princess 176; tower defense 89; Cursor platformer 81; Gravity Birds 89; Agent Arcade 368; Mini Snake 3; Flux 22; Bash Fighter 385; Quasar Saz 1076; John Dilig collection 171; GameAI collection 1122; Dunkirk 212. Counts include supporting docs, assets and tests, not just game code. The primary repositories and evidence URLs remain in the candidate table above."}),`
`,e.jsx(t.p,{children:"Additional primary material fetched into temporary audit files included the Cursor conversation summary, Gravity Birds README and full journey HTML, and Mini Snake's complete HTML. Those working copies are not published artifacts; the candidate table links their creator-controlled sources. GitHub HTML/raw pages and the Copilot creator article were also opened with web research tools. Cache-miss errors were not treated as a verified dead site; direct public fetches/browser navigation were used to resolve important cases."}),`
`,e.jsx(t.h2,{id:"creator-gameplay-images-for-downloadable-projects",children:"Creator gameplay images for downloadable projects"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Gravity Birds: ",e.jsx(t.a,{href:"https://raw.githubusercontent.com/az9713/grokbot-game-dev-demo/main/game_ui_2.png",children:"https://raw.githubusercontent.com/az9713/grokbot-game-dev-demo/main/game_ui_2.png"}),' — visually checked; actual Stairway puzzle with bird, fruit, exit and undo/restart UI. README captions it "After polish". ',e.jsx(t.a,{href:"/GameMap/media/learning/gravity-birds-grok-cursor.webp",children:"Published preview"}),"."]}),`
`,e.jsxs(t.li,{children:["Quasar Saz: ",e.jsx(t.a,{href:"https://raw.githubusercontent.com/cleak/quasar-saz/master/docs/screenshot_20260219_154704.png",children:"https://raw.githubusercontent.com/cleak/quasar-saz/master/docs/screenshot_20260219_154704.png"})," — visually checked; actual Dissonance King phase-3 combat, player, attacks, energy/score HUD. ",e.jsx(t.a,{href:"/GameMap/media/learning/quasar-saz-claude.webp",children:"Published preview"}),"."]}),`
`,e.jsxs(t.li,{children:["Agent Arcade: ",e.jsx(t.a,{href:"https://raw.githubusercontent.com/DanWahlin/agent-arcade/main/docs/images/agent-arcade-ninja.gif",children:"https://raw.githubusercontent.com/DanWahlin/agent-arcade/main/docs/images/agent-arcade-ninja.gif"}),` — creator gameplay GIF. Same recording is explicitly captioned "Ninja Runner Gameplay" in the creator's linked article. `,e.jsx(t.a,{href:"/GameMap/media/learning/agent-arcade-copilot.webp",children:"Published preview"}),"."]}),`
`]}),`
`,e.jsx(t.p,{children:"These are creator-provided gameplay media, not captures made during our own playtests. Root integration is preserving that provenance."}),`
`,e.jsx(t.h2,{id:"browser-verification",children:"Browser verification"}),`
`,e.jsxs(t.p,{children:["Browser plugin unavailable; used bundled Playwright and Chromium 1208. All 10 browser-entry URLs returned HTTP 200 and correct page titles in the initial navigation run. Initial title/loading screenshots are intentionally excluded from accepted gallery media. Captures and per-case console/request/action metadata were temporary audit files and are not distributed. The ",e.jsx(t.a,{href:"/GameMap/media/learning/manifest.json",children:"published manifest"})," and ",e.jsx(t.a,{href:"/docs/media-sources/",children:"media guide"})," identify the retained previews and their sources. Metal rendering and one foreground page were used for follow-up captures where asset loading or animation was slow."]}),`
`,e.jsxs(t.p,{children:["Verified active interactions: tower-defense Damage upgrade changes Lv0→Lv1 and gold25→5; Cursor platformer moves/jumps and score increases; Mini Snake is played with arrows to collect two food items (score0→2; length1→3), then paused for capture; Flux enters its running state and flips gravity; Bash Fighter creates a private lobby, starts with bots, enters Timed Brawl and responds to movement/jump/attack; Running Man starts, jumps and reaches 19m; GothicVania moves from its exported ",e.jsx(t.code,{children:"title"})," state to ",e.jsx(t.code,{children:"level"}),", with a moving/jumping player, health4 and live enemies. GothicVania's Enter input must be held across a rendered frame because its title checks Phaser ",e.jsx(t.code,{children:"JustDown"}),"."]}),`
`,e.jsxs(t.p,{children:["The temporary verified-preview selection recorded seven actual browser gameplay captures plus one creator gameplay screenshot for Pixel Princess. That audit selection file is not a repository download; retained media and origins are recorded in the ",e.jsx(t.a,{href:"/GameMap/media/learning/manifest.json",children:"published manifest"}),". Pixel Princess's public build reached a working menu, but variable first-load asset timing made the creator's existing gameplay screenshot the more reliable preview: ",e.jsx(t.a,{href:"https://raw.githubusercontent.com/VTvito/pixel-princess-platformer/main/assets/screenshot.png",children:"https://raw.githubusercontent.com/VTvito/pixel-princess-platformer/main/assets/screenshot.png"})," (",e.jsx(t.a,{href:"/GameMap/media/learning/pixel-princess-claude.webp",children:"published preview"}),"). It was visually checked as actual forest-level gameplay with heroine, enemy, pickups and lives/score HUD. Garden Match diagnosis/capture was handed to the 3D research agent and Dunkirk capture to the root agent, so their final results are recorded by those agents rather than claimed here."]}),`
`,e.jsx(t.h2,{id:"rejected-or-deferred-prospects",children:"Rejected or deferred prospects"}),`









































































`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Prospect"}),e.jsx(t.th,{children:"Decision and reason"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/0x0funky/agent-game-forge",children:"https://github.com/0x0funky/agent-game-forge"})}),e.jsx(t.td,{children:"Game IDE/tool, not an additional completed game case."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/BeyondPlay-AI/game-prompt-engine",children:"https://github.com/BeyondPlay-AI/game-prompt-engine"})}),e.jsx(t.td,{children:"Generator CLI; no particular finished output was independently verified."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Mr-Neutr0n/pixelforge",children:"https://github.com/Mr-Neutr0n/pixelforge"})}),e.jsx(t.td,{children:"Generator/editor product, not a distinct completed game."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Tann2019/godot-mcp-server",children:"https://github.com/Tann2019/godot-mcp-server"})}),e.jsx(t.td,{children:"Engine integration/tool with a teaching demo; not used to inflate game counts."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/hanifwdyt/claude-code-game-toolkit",children:"https://github.com/hanifwdyt/claude-code-game-toolkit"})}),e.jsx(t.td,{children:"Toolkit and starter examples; deferred in favor of individual projects with stronger creator context."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/MRCalderon3D/everything-game-dev-code",children:"https://github.com/MRCalderon3D/everything-game-dev-code"})}),e.jsx(t.td,{children:"Broad scaffold with many samples; individual outputs not fully checked in this pass."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/NguyenLe15325/Python-raylib",children:"https://github.com/NguyenLe15325/Python-raylib"})}),e.jsx(t.td,{children:"AI-assisted concept-demo collection; many entries are foundations rather than complete game loops."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Ajairajv/2D-Shooter-Game",children:"https://github.com/Ajairajv/2D-Shooter-Game"})}),e.jsx(t.td,{children:"Readme documents conventional enemy AI; no verified generative-AI build disclosure."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/AkankshaD2/FlowForge",children:"https://github.com/AkankshaD2/FlowForge"})}),e.jsx(t.td,{children:"AI means A* navigation/pathfinding in the README; no verified generative-AI development attribution."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/matthewod11-stack/CatRunner",children:"https://github.com/matthewod11-stack/CatRunner"})}),e.jsx(t.td,{children:"Runtime Gemini cat generation is clear; explicit attribution of the game's development was not established."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/Id-Aplus/SnakeMazeEscape",children:"https://github.com/Id-Aplus/SnakeMazeEscape"})}),e.jsx(t.td,{children:"Credible Amazon Q/Pygame creator disclosure; base mode is reported complete, but normal/advanced modes have acknowledged bugs/incompletion. Kept as a further prospect rather than padding the main set."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/BareTread/vampire-survivors-enhanced",children:"https://github.com/BareTread/vampire-survivors-enhanced"})}),e.jsx(t.td,{children:"Complete game and agent-related files exist, but the README does not itself establish the AI build contribution. A session artifact would need further review before inclusion."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/highlandhodl/coengineers-os-games",children:"https://github.com/highlandhodl/coengineers-os-games"})}),e.jsx(t.td,{children:"Credible Claude Code suite; deferred because this pass already includes arcade collections and no separate gameplay-preview verification was completed."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"GameAI StackPop"}),e.jsx(t.td,{children:"Same creator/repository and same workflow as Garden Match. Not split into another card just to increase totals."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/ladegeraet/claudespace",children:"https://github.com/ladegeraet/claudespace"})}),e.jsx(t.td,{children:"Discovery-list lead; direct repository fetch did not establish the source/evidence chain in this pass."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/lappemic/awesome-ai-built-games",children:"https://github.com/lappemic/awesome-ai-built-games"})}),e.jsx(t.td,{children:"Useful discovery index; a third-party list is not primary evidence of a particular game's authorship."})]})]})]}),`
`,e.jsx(t.p,{children:"3D leads were handed to the 3D researcher: CodeCraft, mineclaude, ImADragon, snake-3d-game, desert-velocity and vibe-jet. They are not counted in this 2D expansion."}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h3,{id:"community-3d-expansion-audit--2026-10-18",children:"Community 3D expansion audit — 2026-10-18"}),`
`,e.jsxs(t.p,{children:["Prepared ",e.jsx(t.code,{children:"website/src/data/community3dExpansion.ts"}),": 12 new games, all with creator-published browser URLs and actual game repositories. The root agent owns live browser capture and final inclusion. This research verified creator evidence and source trees; a URL listed here is not a claim that a complete playthrough was performed."]}),`
`,e.jsx(t.h2,{id:"search-coverage",children:"Search coverage"}),`
`,e.jsxs(t.p,{children:["Searched GitHub/web for Three.js, Godot, Unity, AI-generated, vibe-coded, Claude, Codex, Gemini, Copilot, AI game development, and specific public projects. Also used the community list ",e.jsx(t.a,{href:"https://github.com/coolbat/awesome-opus-5.5-usecase",children:"https://github.com/coolbat/awesome-opus-5.5-usecase"})," as a discovery index, then verified primary creator repositories instead of treating that list as evidence. Sources include English, Chinese, Japanese and French development records."]}),`
`,e.jsx(t.h2,{id:"included-candidates-and-primary-audits",children:"Included candidates and primary audits"}),`
































































































`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"ID"}),e.jsx(t.th,{children:"Primary repository"}),e.jsx(t.th,{children:"AI evidence"}),e.jsx(t.th,{children:"Source inspection"}),e.jsx(t.th,{children:"Demo"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"turbo-kart-rally-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/bridge-mind/turbo-kart-rally",children:"https://github.com/bridge-mind/turbo-kart-rally"})}),e.jsx(t.td,{children:"README original prompt, five Claude Opus 5.5 assignments, architecture and integration account"}),e.jsx(t.td,{children:"Recursive main tree: 41 entries, 27 JS/HTML files; screenshots are documentation only; runtime visuals/audio procedural"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://bridge-mind.github.io/turbo-kart-rally/",children:"https://bridge-mind.github.io/turbo-kart-rally/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"long-wind-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/jbang2004/long-wind",children:"https://github.com/jbang2004/long-wind"})}),e.jsx(t.td,{children:"Chinese author timeline, AI/human roles, original request"}),e.jsx(t.td,{children:"main tree: 334 entries; committed Tripo character GLBs, Mixamo animation GLB, Poly Haven glTF/textures, actual game code. No tiny GLB pointer files found. Read CREDITS.md: asset terms differ from code."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://jbang2004.github.io/long-wind/",children:"https://jbang2004.github.io/long-wind/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"nova-lancer-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/tanuu5/nova-lancer",children:"https://github.com/tanuu5/nova-lancer"})}),e.jsx(t.td,{children:"Japanese original brief, agent division, test explanation, reported model/session record"}),e.jsx(t.td,{children:"main tree: 35 entries, 18 JS/HTML files. Full procedural game; bundled index.html plus modular source and build tools."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://tanuu5.github.io/nova-lancer/",children:"https://tanuu5.github.io/nova-lancer/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"orb-shooter-ai"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/theredstapler/orb-shooter",children:"https://github.com/theredstapler/orb-shooter"})}),e.jsx(t.td,{children:"README directly names Antigravity, Gemini 3.1 Pro, Opus 4.6 and human polishing"}),e.jsx(t.td,{children:"main tree and main.js references checked. All referenced warehouse/weapon/enemy GLBs, HDR and OGG files are committed, not just links to Sketchfab."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://theredstapler.github.io/orb-shooter/",children:"https://theredstapler.github.io/orb-shooter/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"operation-naptime-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/alandaitch/operacion-siesta",children:"https://github.com/alandaitch/operacion-siesta"})}),e.jsx(t.td,{children:"README build account and linked public session with tool calls"}),e.jsxs(t.td,{children:["master tree: 166 entries, 116 JS/TS/HTML files, procedural rendering/audio. ",e.jsx(t.code,{children:"public/transcript.html"})," and ",e.jsx(t.code,{children:"docs/transcript.html"})," exist. README's ",e.jsx(t.code,{children:"docs/TRANSCRIPT.md"})," link does not match tree, so data uses working published HTML route instead."]}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://operacion-siesta.vercel.app/",children:"https://operacion-siesta.vercel.app/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"ombres-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/briossant/ombres",children:"https://github.com/briossant/ombres"})}),e.jsx(t.td,{children:"README detailed process, human interventions, original docs/BRIEF.md"}),e.jsx(t.td,{children:"master tree: 1,789 entries, 358 JS/TS/TSX/HTML files; full host/controller/relay, procedural birds/world, committed audio/fonts/narration. PolyForm Noncommercial: described as source available, not OSI open source."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://ombres.deploy.breizhware.com/",children:"https://ombres.deploy.breizhware.com/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"dragons-reach-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/jaydemks/ImADragon_onepromptcode_game",children:"https://github.com/jaydemks/ImADragon_onepromptcode_game"})}),e.jsx(t.td,{children:"PROMPT.md, contracts, README postmortem and honest 1 initial prompt + 3 follow-ups disclosure"}),e.jsx(t.td,{children:"main tree: 95 entries, 48 JS/HTML files; procedural rig/world/combat. Source complete as prototype; README audio module is a stub."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://jaydemks.github.io/ImADragon_onepromptcode_game/",children:"https://jaydemks.github.io/ImADragon_onepromptcode_game/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"vibe-jet-gemini"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/cedrickchee/vibe-jet",children:"https://github.com/cedrickchee/vibe-jet"})}),e.jsx(t.td,{children:"Creator initial Gemini prompt, response and approach; original 2025 build"}),e.jsx(t.td,{children:"main tree: 22 entries, game.html/server.js, real aircraft GLBs and textures. Code inspected: local shenyang_j-11.glb; Three.js CDN + online grass texture."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://vibejet.cedricchee.com/",children:"https://vibejet.cedricchee.com/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"slide-rush-opus"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/KJLKurt/waterslide-game-opus-5.5",children:"https://github.com/KJLKurt/waterslide-game-opus-5.5"})}),e.jsx(t.td,{children:"README completion record names opus-5.5/extra-high and session statistics; repo describes LLM comparison"}),e.jsx(t.td,{children:"main tree: 65 entries, 29 JS/HTML files; procedural characters/slide/audio plus PWA. Label disclosure, not tutorial or prompt archive."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://kjlkurt.github.io/waterslide-game-opus-5.5/",children:"https://kjlkurt.github.io/waterslide-game-opus-5.5/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"the-tithe-claude"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/miguelsolorio/the-tithe",children:"https://github.com/miguelsolorio/the-tithe"})}),e.jsx(t.td,{children:"Author repository About directly says built with Opus 5.5"}),e.jsx(t.td,{children:"main tree: 227 entries, 165 JS/HTML files; actual levels/weapons/enemies/checkpoints. Procedural runtime assets; no full prompt/session evidence. Label disclosure."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://miguelsolorio.github.io/the-tithe/",children:"https://miguelsolorio.github.io/the-tithe/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"michi-neko-ai"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path",children:"https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path"})}),e.jsx(t.td,{children:"Creator README identifies human direction and several AI models without naming exact models"}),e.jsx(t.td,{children:"main tree: 201 entries, 63 JS/HTML files; procedural game, quests and save logic. README explicitly labels many illustrations as aspirational inspiration, so never use them as actual gameplay screenshots. Early alpha stated plainly."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://c1t1zen1.github.io/Michi-Neko-The-Cat-Philosophers-Path/",children:"https://c1t1zen1.github.io/Michi-Neko-The-Cat-Philosophers-Path/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"fragarena-copilot"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://github.com/jonnyleigh/fragarena",children:"https://github.com/jonnyleigh/fragarena"})}),e.jsx(t.td,{children:"Author Copilot disclosure, Prompt.md, SoundEffectsPrompt.md, php2node_prompt.md"}),e.jsx(t.td,{children:"main tree: 55 entries, 25 JS/HTML files; client/server, music MP3s and UI image committed. Read actual Prompt.md; no raw transcript claim."}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://fragarena1.azurewebsites.net/",children:"https://fragarena1.azurewebsites.net/"})})]})]})]}),`
`,e.jsxs(t.p,{children:["All final tutorial/evidence pointers are primary creator material. Entries that only have a declaration use ",e.jsx(t.code,{children:"tutorial.kind: 'disclosure'"}),". Steps are editorial study suggestions. Source scope ",e.jsx(t.code,{children:"complete-project"})," means source and game dependencies can run the stated prototype, not a claim of production quality."]}),`
`,e.jsx(t.h2,{id:"strong-alternates-intentionally-not-added-to-browser-set",children:"Strong alternates intentionally not added to browser set"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Desert Velocity"})," — ",e.jsx(t.a,{href:"https://github.com/sim7575/desert-velocity",children:"https://github.com/sim7575/desert-velocity"})," ; Godot 4.3+, Codex + GPT-5.6 Build Week project with detailed supervised AI disclosure. Windows download ",e.jsx(t.a,{href:"https://sim75.itch.io/desert-velocity",children:"https://sim75.itch.io/desert-velocity"})," . Tree inspected: 784 entries, 428 image/model/audio assets with original Blender files and real GLBs. No tiny asset pointers. Excellent engine diversity, but download-only. Root can add if a local-game screenshot/download case is desired."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Opus FPS"})," — ",e.jsx(t.a,{href:"https://github.com/frankhale/opus-fps",children:"https://github.com/frankhale/opus-fps"})," ; Godot 4, procedural models and sounds generated with tools; game code in godot/. Direct author Opus attribution. No public browser build. Kept outside browser-first additions."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"MineClaude"})," — ",e.jsx(t.a,{href:"https://github.com/snek-git/mineclaude",children:"https://github.com/snek-git/mineclaude"})," ; Rust + Bevy 0.18, author says built entirely by Opus 4.6 agent teams, clear workflow and human playtest disclosure. Runnable via cargo with GPU; no browser demo."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"CodeCraft"})," — ",e.jsx(t.a,{href:"https://github.com/zihaomu/CodeCraft",children:"https://github.com/zihaomu/CodeCraft"})," ; author attributes to Codex; real procedural voxel survival/build project and source. README only gives local run URL, no published playable URL. Source-only alternate."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Tripo Playbook games"})," — ",e.jsx(t.a,{href:"https://github.com/TripoGrowthLab/vibe-gaming-interactive-playbook",children:"https://github.com/TripoGrowthLab/vibe-gaming-interactive-playbook"})," ; Snowdrift Dash, LANTERN ALLEY, PIT NINE have specific game code and browser demos. Author explicitly says Tripo models are absent and fresh clones run in greybox. Would require ",e.jsx(t.code,{children:"game-code-greybox"}),", never complete-project. More valuable as asset-swap workflow than padding the current set."]}),`
`]}),`
`,e.jsx(t.h2,{id:"rejected--not-counted",children:"Rejected / not counted"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/chongdashu/threejs-capacitor-ios-game",children:"https://github.com/chongdashu/threejs-capacitor-ios-game"})," : repository expressly says no runnable app code or GLB models; only prompts, skills and metadata. Not a complete game source."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/mdelaguera/learn-threejs-tactics-game",children:"https://github.com/mdelaguera/learn-threejs-tactics-game"})," and upstream chongdashu/threejs-tactics-game : public repo says full source and asset pipeline coming later / through paid access; public references are insufficient."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/vibe-stack/game.js",children:"https://github.com/vibe-stack/game.js"})," : engine/editor project, not a finished game case."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/hyeons-lab/prism",children:"https://github.com/hyeons-lab/prism"})," : engine only."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/marciocamello/game-engine-ai",children:"https://github.com/marciocamello/game-engine-ai"})," : engine project with examples, insufficient distinct game evidence for this selection."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/markjeromecruz/threejs-claude-starter",children:"https://github.com/markjeromecruz/threejs-claude-starter"})," : scene/starter intentionally invites the user to add game mechanics; not a complete game loop."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/xenitV1/mehmet-3d-portfolio",children:"https://github.com/xenitV1/mehmet-3d-portfolio"})," : explorable portfolio, no game objective."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/shogunyan12/The-GREAT-SAGE",children:"https://github.com/shogunyan12/The-GREAT-SAGE"})," : desktop assistant, not a game."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/vasu-devs/FishSlop_Opus5.5",children:"https://github.com/vasu-devs/FishSlop_Opus5.5"})," : real game/source and demo discovered, but README does not explicitly attribute AI authorship; model name in repo URL alone is weaker than included cases. Excluded pending direct creator build evidence."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/leobrqz/VibedGames-benchmark",children:"https://github.com/leobrqz/VibedGames-benchmark"})," : real small games and requested prompt_history.md convention; selected more individually documented examples instead of counting each benchmark entry."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/chojondocho/single-html-game-bench",children:"https://github.com/chojondocho/single-html-game-bench"})," : real generated outputs but huge single-prompt comparison set; excluded from curated count to avoid duplicate low-quality outputs padding totals."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"Tidewater"}),", ",e.jsx(t.code,{children:"Clearwater"}),", ",e.jsx(t.code,{children:"web-ocean"}),", riverboat scenes, photoreal architecture viewers and universe simulations from discovery list: interaction/rendering demos without a sufficiently clear game loop, excluded."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"GalaxyQuest"})," from discovery list requires proprietary original game data; no standalone complete project/assets claim."]}),`
`]}),`
`,e.jsx(t.h2,{id:"verification-performed",children:"Verification performed"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Primary web search/open/read for each included repository."}),`
`,e.jsx(t.li,{children:"GitHub connector recursive tree inspection for all 12 included sources."}),`
`,e.jsx(t.li,{children:"Actual Orb Shooter main.js asset references matched against tree; Vibe Jet model/texture dependencies read."}),`
`,e.jsx(t.li,{children:"Long Wind CREDITS.md, Ombres README/licence statement, Nova Lancer Japanese README, FragArena Prompt.md inspected."}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"npx tsc -b --pretty false"})," passed after new data file creation."]}),`
`,e.jsx(t.li,{children:'Many browser-game URLs return a generic "not accessible via this tool" from web reader despite being linked in primary repos; root is independently capturing real browser previews, so web-reader failures have not been mislabeled as dead links.'}),`
`]}),`
`,e.jsx(t.h2,{id:"follow-up-from-root-browser-checks",children:"Follow-up from root browser checks"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Vibe Jet and FragArena public hosts failed DNS resolution. Their final ",e.jsx(t.code,{children:"demo"})," fields now link the actual main-branch source ZIP with local Node launch instructions and state that the public host did not resolve at review."]}),`
`,e.jsx(t.li,{children:"Ombres browser navigation timed out; final demo note flags possible temporary unavailability. This is not treated as definitive proof of a dead host."}),`
`,e.jsxs(t.li,{children:["Historical screenshot-candidate metadata was held in a temporary audit file, keyed by case ID with immutable commit refs, raw image URLs, source permalinks, byte sizes, and README provenance. That working file is not distributed; use the ",e.jsx(t.a,{href:"/GameMap/media/learning/manifest.json",children:"published manifest"})," and ",e.jsx(t.a,{href:"/docs/media-sources/",children:"media guide"})," for retained preview provenance. Nine candidates were explicitly embedded as gameplay in creator README content. The Michi development capture required pixel inspection; all aspirational README artwork was excluded. Orb Shooter and Slide Rush had no creator gameplay screenshots in their source trees, so browser capture was required for their previews."]}),`
`]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h3,{id:"diverse-community-case-research--2026-10-18",children:"Diverse community case research — 2026-10-18"}),`
`,e.jsx(t.p,{children:"Scope: actual AI-assisted game development, public complete project, playable browser build or honestly labeled source download. Search terms covered Gemini CLI, Google AI Studio, DeepSeek, Aider, Cursor, Replit, Windsurf, Antigravity; searched English and Chinese through web search and GitHub repository search. Author attribution is distinguished from a build log or actual prompt transcript. Runtime follow-up is recorded in the final review above."}),`
`,e.jsx(t.h2,{id:"added-candidates-in-websitesrcdatadiversecommunitycasests",children:"Added candidates in website/src/data/diverseCommunityCases.ts"}),`



























































`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"ID"}),e.jsx(t.th,{children:"Primary disclosure"}),e.jsx(t.th,{children:"Source inspected"}),e.jsx(t.th,{children:"Play/run"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"cursor-space-shooter"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/littleearth/vibe-coded-games#development",children:"https://github.com/littleearth/vibe-coded-games#development"})," explicitly credits Cursor; family creation details in Game Details"]}),e.jsx(t.td,{children:"Recursive Git tree has shooter/index.html, styles.css, 43KB game.js; shooter/README.md fetched in full"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://games.littleearth.dev/shooter/",children:"https://games.littleearth.dev/shooter/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"cursor-destruction-derby"}),e.jsx(t.td,{children:"Same primary README, individually names Destruction Derby and Cursor assistance"}),e.jsx(t.td,{children:"Recursive tree has demoderby/index.html, styles.css, 36KB game.js"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://games.littleearth.dev/demoderby/",children:"https://games.littleearth.dev/demoderby/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"beach-kitty-ai-campaign"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/matthewod11-stack/CatRunner#built-with",children:"https://github.com/matthewod11-stack/CatRunner#built-with"})," names Claude Code + Gemini"]}),e.jsx(t.td,{children:"Root tree, assets and scenes visible; README and full PROGRESS.md fetched (354 lines). Core gameplay does not require Gemini key"}),e.jsx(t.td,{children:e.jsx(t.a,{href:"https://www.beachkittygame.games/",children:"https://www.beachkittygame.games/"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"gemini-pirate-fleet"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process",children:"https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process"})," author describes Gemini 2.5 Pro + Claude Sonnet 4.5 initial workflow and some manual balance adjustments"]}),e.jsx(t.td,{children:"Full 79KB Pirate Fleet Commander v7.4.html fetched via GitHub connector, 2002 lines. Game loop, economy, Canvas visuals and input implemented"}),e.jsx(t.td,{children:"README direct Pages link to /Pirate%20Fleet%20Commander%20v7.4.html"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"gemini-kymograph"}),e.jsx(t.td,{children:"Same collection-wide author disclosure; exact model for current version unspecified"}),e.jsx(t.td,{children:"Full Kymograph v4.html fetched, 28KB/628 lines; actual signal puzzle, rule inference, feedback, persistent progress, Web Audio"}),e.jsx(t.td,{children:"README direct Pages link to /Kymograph%20v4.html"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"gemini-pumpkin-hunt"}),e.jsx(t.td,{children:"Same collection-wide author disclosure; no per-game prompt log"}),e.jsx(t.td,{children:"Full Pumpkin Hunt Horror Game v3.html fetched, 25KB/236 lines; procedural Three.js scenery/characters/textures, flashlight, stamina, interactions, win/lose, stalker behavior"}),e.jsx(t.td,{children:"README direct Pages link to /Pumpkin%20Hunt%20Horror%20Game%20v3.html"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"deepseek-neon-snake"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/TwitchCaptain/snake",children:"https://github.com/TwitchCaptain/snake"})," author-controlled description: Classic Snake game - created by DeepSeek"]}),e.jsx(t.td,{children:"README, recursive tree, complete 21KB game.js fetched; index.html/styles.css present. Actual Snake rules/levels/input"}),e.jsxs(t.td,{children:["README explicitly links ",e.jsx(t.a,{href:"https://twitchcaptain.github.io/snake/",children:"https://twitchcaptain.github.io/snake/"})]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"deepseek-mini-ksp"}),e.jsxs(t.td,{children:[e.jsx(t.a,{href:"https://github.com/BairlyEmei/mini-ksp",children:"https://github.com/BairlyEmei/mini-ksp"})," author-controlled description: mini-ksp game developed by deepseek harness"]}),e.jsx(t.td,{children:"README fetched; recursive tree confirms index.html, 172KB js/game.js, tutorial/missions/manual, CSS, 94KB 3D workbench, vendored Three.js and 4 PNG textures"}),e.jsx(t.td,{children:"No hosted game advertised. Source ZIP honestly labeled download. README: open index.html or python3 start.py"})]})]})]}),`
`,e.jsx(t.p,{children:"During initial source discovery no generation API was called. The later local game smoke tests are recorded above. GitHub connector was used after web fetch returned cache misses for individual game files. Root agent has live URLs for runtime checks. Data does not claim gameplay was already verified."}),`
`,e.jsx(t.h2,{id:"excluded--deferred",children:"Excluded / deferred"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"JoakimCarlsson/bastion: web search described an interesting agent-pipeline tower-defense game, but opening the actual repository returned 404; not added."}),`
`,e.jsx(t.li,{children:"theatharvagai/GeminiCLI-Driven-Game-Dev: genuine CLI attribution but README retains placeholder clone URL and preview notes; no hosted demo advertised; deprioritized for quality."}),`
`,e.jsx(t.li,{children:"tonidevvn/dinosaur-game-offline: README explicitly documents Gemini CLI assistance; recursive tree includes complete code and Wikimedia dinosaur images/sounds. Runnable local candidate, deferred because no live URL advertised and an existing Snake runner-style case already expands the tool variety. Could add later with a local capture."}),`
`,e.jsx(t.li,{children:"aerugo/orb: author-controlled repo description says Orb game built with Aider. README and full fractal.js fetched. Complete three-file Three.js procedural shooting sandbox, with Tone.js and Three.js CDN imports. No scoring, loss, or clear win loop found; weaker fit than finished game cases; no advertised live URL. Deferred instead of presenting an interactive graphics prototype as a finished game."}),`
`,e.jsx(t.li,{children:"aideink/game.snake, game.flappy, game.tetris: primary README says created in aide.ink; that is not proof of Aider usage. Not mislabeled as Aider examples."}),`
`,e.jsx(t.li,{children:"zhaojch1/deepseek_game_rts: full README fetched; primarily describes runtime LLM strategic opponents and architecture, not clear AI-assisted development disclosure. Excluded to avoid confusing AI gameplay with AI-built games."}),`
`,e.jsx(t.li,{children:"liuhuize0711git/astrovoid-game: complete project, live deployment guide, source downloadable; only repo description gemini_game and AI Studio scaffold hint. Insufficient specific primary development attribution; deferred."}),`
`,e.jsx(t.li,{children:"showblue/mario_game: author description says created by Gemini AI but README only one line and no live demo advertised. Deferred for weaker documentation."}),`
`,e.jsx(t.li,{children:"KilledByAPixel/LittleJS-AI / LittleJSArcade: 50+ source-complete single-file games, primary toolkit README says games made with those tools, but individual AI provenance unclear. Good future research pool; did not count all games indiscriminately."}),`
`,e.jsx(t.li,{children:"Replit/Devpost/Reddit results (ColorChase, Epic Dev Battles, Mercenary Company, Tiny Skies): creator AI disclosures may exist but no verified complete public source discovered in this pass. Not added on video/screenshots alone."}),`
`,e.jsx(t.li,{children:"JaniDhruv/the-imitation-game: primary Antigravity development disclosure found; runnable complete project requires API keys and is a text interrogation game rather than a clear 2D/3D visual game. Deferred."}),`
`]}),`
`,e.jsx(t.h2,{id:"broader-discovery-sources",children:"Broader discovery sources"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/lappemic/awesome-ai-built-games",children:"https://github.com/lappemic/awesome-ai-built-games"})," — fetched full README; roughly 70+ current hand-curated games with tool/engine clues; links most often point to deployed game, not full source. Root agent can expose this as a discovery directory separately."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://itch.io/jam/ai-browser-game-jam",children:"https://itch.io/jam/ai-browser-game-jam"})," — recurring AI browser game jam; source requirements need individual verification."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://vibejam.com/",children:"https://vibejam.com/"})," — broad submission pool; AI game claims must be checked individually."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://vibecode.game/",children:"https://vibecode.game/"})," — tool/engine directory."]}),`
`,e.jsx(t.li,{children:'GitHub repository searches: game "gemini cli", game deepseek in:description language:JavaScript, game "gemini" in:description language:HTML, game "aider" in:description language:JavaScript, game "cursor" in:description language:JavaScript.'}),`
`]}),`
`,e.jsx(t.p,{children:"Eight entries were authored; six distinct game implementations from three source collections plus two independent DeepSeek cases. All eight retained scope complete-project. Collection-wide disclosures explicitly state that final game versions are not tied to a verified exact model. Category ai-assisted avoids overstating fully autonomous generation."}),`
`,e.jsx(t.h2,{id:"screenshot-qa-completed-same-date",children:"Screenshot QA completed (same date)"}),`
`,e.jsxs(t.p,{children:["Eight 1280×720 real browser-rendered PNGs, per-case metadata, and a contact sheet were created as temporary working files during this audit. They are not distributed as QA downloads. The retained previews and source provenance are available in the ",e.jsx(t.a,{href:"/GameMap/media/learning/manifest.json",children:"published manifest"})," and ",e.jsx(t.a,{href:"/docs/media-sources/",children:"media guide"}),". No title-only or loading-only images were retained. Used installed Playwright because Browser plugin/skill was absent. Every retained screenshot was visually inspected."]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Shooter: Start Game → hold Space → move left; enemy and shots visible; no page errors."}),`
`,e.jsx(t.li,{children:"Derby: already in a running arena → drive Player 1 with WASD; collisions/particles visible; no page errors."}),`
`,e.jsx(t.li,{children:"Beach Kitty: campaign Play → Sunny Shore → Space jumps; cat/beach gameplay scene visible; no page errors."}),`
`,e.jsx(t.li,{children:"Pirate Fleet: WASD movement changed world coordinate from (0,0) to (4,-4); active fleet/economy view; no page errors."}),`
`,e.jsx(t.li,{children:"Kymograph: Initialize System → first signal puzzle and controls appear; no page errors."}),`
`,e.jsxs(t.li,{children:["Snake: Press to Start → ArrowDown/ArrowLeft changes direction; active snake/food board; no page errors. GitHub Pages redirects to creator domain; direct ",e.jsx(t.a,{href:"https://twitchcaptain.com/snake/",children:"https://twitchcaptain.com/snake/"})," works. Metadata sourceUrl remains author-linked Pages demo URL and finalUrl records destination."]}),`
`,e.jsx(t.li,{children:"Mini KSP: downloaded public repository commit de38be79fe88a72e87c4f170bdae76147923c9f0, served on localhost:8867; New Game → skip tutorial → reduce first-stage fuel to one tank and second-stage to zero → Launch → raise throttle. Actual flight screen and first-launch achievement captured; no page errors. Origin local-capture, sourceUrl repository. No code modifications or APIs. Server may be stopped after integration."}),`
`,e.jsxs(t.li,{children:["Pumpkin Hunt: clicking Start reveals actual Three.js forest and HUD. Headless macOS Chromium rejects pointer lock with WrongDocumentError: The root document of this element is not valid for pointer lock. Thus scene rendering confirmed; movement/flashlight remain unverified. Windowed attempt closed during navigation. Captured honest title-free forest scene; no gameplay state injected. This is an automation limitation documented in primary Playwright issue ",e.jsx(t.a,{href:"https://github.com/microsoft/playwright/issues/20956",children:"https://github.com/microsoft/playwright/issues/20956"}),", whose maintainer identifies unfocused macOS render view as cause. Root may retain as scene preview with limitation, or replace after manual desktop play."]}),`
`]})]})}function d(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{d as default,a as frontmatter,s as structuredData,o as toc};
