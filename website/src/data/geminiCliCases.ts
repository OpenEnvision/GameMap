import type { LearningPath } from './learningTypes';

// Explicit Gemini CLI client evidence; these are both 2D games.
export const geminiCliCases: LearningPath[] = [
  {
    id: 'cloud-crush-gemini-cli',
    title: 'Cloud Crush: Gemini CLI builds a match-3 game',
    description: 'Match cloud-service icons on an eight-by-eight board, chase a timed high score, and create special Gemini gems. Google publishes the complete Go game alongside a detailed Gemini CLI codelab.',
    engine: 'Ebitengine 2 · Go / WebAssembly',
    track: '2d',
    category: 'ai-assisted',
    aiUse: 'Google’s repository attributes game generation to Gemini CLI. The official codelab shows human orchestration through plan mode, steering prompts, browser adaptation, testing, and subagents. That is publisher evidence, not an independent measurement of autonomous authorship.',
    steps: [
      'Download the devrel-demos repository and enter codelabs/gemini-cli/gemini-cli-match3-golang. Install Go 1.26.2 or newer; the README’s 1.24+ prerequisite is outdated. For native desktop play, run: go run .',
      'Follow the title and player-name prompts. Use arrow keys to move the cursor and Space to select a gem, then an arrow to swap. Mouse/touch input is also implemented. Compare matching, falling tiles, time bonuses, and score behavior with main.go.',
      'For a local browser build, first prepare the files served by the Go server: mkdir -p public/assets; cp assets/* public/assets/; cp index.html public/index.html. The committed public/assets directory is missing source files required by the game, including background.jpg.',
      'Use the WASM helper from the same Go installation as the compiler: cp "$(go env GOROOT)/lib/wasm/wasm_exec.js" public/wasm_exec.js. Then compile: GOOS=js GOARCH=wasm go build -o public/cloud-crush.wasm .',
      'Run the browser server from the same game directory: go run server/main.go. Open http://localhost:8080. Local play does not require Gemini CLI, an API key, a Google Cloud account, or cloud deployment.',
      'Read the official codelab to trace the development prompts. The browser instructions above were checked against source; this review did not install Go or compile the game. Its preview is a publisher-provided gameplay screenshot.',
    ],
    tutorial: {
      label: 'Follow Google’s Gemini CLI game codelab',
      url: 'https://codelabs.developers.google.com/next26/gemini-cli-match3-golang',
      kind: 'tutorial',
    },
    demo: {
      label: 'Download & run Cloud Crush',
      url: 'https://github.com/GoogleCloudPlatform/devrel-demos/blob/main/codelabs/gemini-cli/gemini-cli-match3-golang/README.md#local-development',
      kind: 'download',
      note: 'Local Go / WASM project; no hosted public game endpoint was verified. Use Go 1.26.2+ and run go run . from the game directory. Expand the steps for the complete browser build, asset copy, matching wasm_exec.js, and local server commands. Native play needs a graphical desktop and working audio drivers. Cloud Crush was not compiled locally in this review.',
    },
    source: {
      label: 'Open the complete Go game project',
      url: 'https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang',
      note: 'Includes main.go, source images and audio, go.mod, browser entry and runtime helper, server/main.go, Dockerfile, and publisher screenshots. The repository code is Apache-2.0. A WASM binary must be built locally.',
      scope: 'complete-project',
    },
    evidence: {
      label: 'See Google’s explicit Gemini CLI attribution',
      url: 'https://github.com/GoogleCloudPlatform/devrel-demos/blob/main/codelabs/gemini-cli/gemini-cli-match3-golang/README.md',
      note: 'The publisher README explicitly names Gemini CLI; the separate official codelab records the development prompts and human steering workflow.',
    },
    resourceIds: ['gemini-cli'],
  },
  {
    id: 'dinosaur-offline-gemini-cli',
    title: 'Dinosaur Game Offline: Gemini CLI-assisted runner',
    description: 'Jump a pixel dinosaur over cacti and avoid flying obstacles while the score and speed increase. This small browser game includes its complete JavaScript implementation, sprites, and sound effects.',
    engine: 'HTML / CSS / JavaScript · Browser',
    track: '2d',
    category: 'ai-assisted',
    aiUse: 'The creator explicitly credits Gemini CLI with scaffolding, game logic, debugging, and improvements in the README and game footer. No original conversation or exact model identifier is published; this is a documented assisted build.',
    steps: [
      'Open the author-hosted browser game on a desktop with a keyboard. Press Space once to start, then press Space again to jump over an approaching cactus.',
      'Watch the score rise, test a collision, and use the restart icon after game over. The live build was smoke-tested for start, jumping, scoring, collision, and restart; the preview was captured during a real jump.',
      'To run locally, download the complete dinosaur-game-offline repository and open index.html. Keep style.css, script.js, and public/ beside it. No npm installation, build step, Gemini CLI, or API key is needed to play.',
      'If a browser restricts local files, serve the repository with python3 -m http.server 8080 and open http://localhost:8080. The game board is fixed at 900 pixels wide and targets desktop keyboard play. Its optional Google Fonts stylesheet uses the network.',
      'Read the creator’s disclosure, then inspect script.js for the requestAnimationFrame loop, jump state, obstacle spawning, scoring, collision checks, and restart behavior.',
    ],
    tutorial: {
      label: 'Read how Gemini CLI helped',
      url: 'https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped',
      kind: 'disclosure',
    },
    demo: {
      label: 'Play Dinosaur Game Offline',
      url: 'https://tonidevvn.github.io/dinosaur-game-offline/',
      kind: 'playable',
      note: 'Author-hosted browser build, checked in Chromium. Space starts and jumps; after a collision, click the restart icon. Desktop keyboard recommended because the board has a fixed 900-pixel width. The full project can also run locally by opening index.html.',
    },
    source: {
      label: 'Open the complete dinosaur game source',
      url: 'https://github.com/tonidevvn/dinosaur-game-offline',
      note: 'Complete index.html, style.css, script.js, and referenced image/audio assets. Public source is available, but the repository does not declare a code license.',
      scope: 'complete-project',
    },
    evidence: {
      label: 'See the creator’s Gemini CLI disclosure',
      url: 'https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped',
      note: 'README, repository description, and the in-game footer explicitly name gemini-cli. This establishes creator attribution rather than independent proof of fully autonomous generation.',
    },
    resourceIds: ['gemini-cli'],
  },
];
