import type { LearningPath } from './learningTypes'
import { ai3dCases } from './ai3dCases'
import { aiCommunityCases } from './aiCommunityCases'
import { openGameCases } from './openGameCases'
import { community2dExpansion } from './community2dExpansion'
import { community3dExpansion } from './community3dExpansion'
import { diverseCommunityCases } from './diverseCommunityCases'
import { geminiCliCases } from './geminiCliCases'
export { communityCollections } from './communityResearch'
export type { LearningPath } from './learningTypes'

// AI-built games lead the page. Engine references stay in the optional section.
export const learningPaths:LearningPath[] = [
  ...geminiCliCases,
  ai3dCases[0], ai3dCases[2], ...aiCommunityCases, ai3dCases[1], ...openGameCases,
  ...community3dExpansion, ...community2dExpansion, ...diverseCommunityCases,
]

export const foundationPaths: LearningPath[] = [
  {
    id: 'godot-2d-dodge',
    category: 'foundation',
    track: '2d',
    title: 'Your first 2D game',
    description: 'Dodge enemies, survive longer, and restart a complete small game. This official Godot project is a foundation for an AI-assisted workflow.',
    engine: 'Godot · 2D',
    aiUse: 'Ask a coding agent to explain the existing project, then change one mechanic at a time and compare the result with the playable reference.',
    steps: [
      'Play the reference and identify movement, spawning, scoring, and restart behavior.',
      'Follow the official tutorial and open the completed project for comparison.',
      'Ask an agent for one small change, such as a difficulty curve or a temporary shield.',
      'Play through a complete start, loss, and restart cycle after each change.',
    ],
    tutorial: {
      label: 'Follow the official tutorial',
      url: 'https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html',
    },
    demo: {
      label: 'Play Dodge the Creeps',
      url: 'https://godotengine.github.io/godot-demo-projects/2d/dodge_the_creeps/',
      kind: 'playable',
      note: 'Official browser build. Use the keyboard; a native Godot run can perform better.',
    },
    source: {
      label: 'Open the complete game source',
      url: 'https://github.com/godotengine/godot-demo-projects/tree/master/2d/dodge_the_creeps',
      note: 'Complete GDScript demo project with scenes and assets, inside the official demo repository. Match the project branch to your Godot version.',
    },
    resourceIds: ['godot-engine', 'godot-demo-projects', 'godot-command-line', 'codex'],
  },
  {
    id: 'phaser-starshake',
    category: 'foundation',
    track: '2d',
    title: 'Take a browser shooter to mobile',
    description: 'Play Starshake, a complete space shooter, then follow the official tutorial to adapt its controls and layout for mobile. This path extends an existing game.',
    engine: 'Phaser · Browser / mobile',
    aiUse: 'Ask an agent to explain the game scenes, then help adapt input, tune enemy waves, or add touch controls. Check each change against the working browser reference.',
    steps: [
      'In the official Sandbox, choose Phaser 3.90.0, then play with the arrow keys and Space.',
      'Explore the complete original game and the tutorial’s separate mobile project.',
      'Follow the official Capacitor tutorial for touch input, resizing, and mobile packaging.',
      'Use an agent to make one change, then verify the game on desktop and mobile.',
    ],
    tutorial: {
      label: 'Follow the browser-to-mobile tutorial',
      url: 'https://phaser.io/tutorials/bring-your-phaser-game-to-ios-and-android-with-capacitor',
    },
    demo: {
      label: 'Play Starshake in the Sandbox',
      url: 'https://phaser.io/sandbox/y1pmMkDL',
      kind: 'playable',
      note: 'In the Sandbox runtime menu, select 3.90.0. Click the game, press Space to start or shoot, and use the arrow keys to move.',
    },
    source: {
      label: 'Open the complete Starshake project',
      url: 'https://github.com/phaserjs/phaser-by-example/tree/main/starshake',
      note: 'Complete original game with scenes, assets, and build setup. The link guide also includes the tutorial’s full mobile adaptation.',
    },
    resourceIds: ['phaser', 'phaser-examples', 'codex-browser-games', 'playwright-mcp'],
  },
  {
    id: 'godot-3d-squash',
    category: 'foundation',
    track: '3d',
    title: 'Make a playable 3D character game',
    description: 'Move a character, jump onto enemies, and replay after losing. This complete Godot game teaches interaction and animation in a small 3D arena.',
    engine: 'Godot · 3D',
    aiUse: 'Use the working project as an agent-readable reference for movement, collisions, animation, and score. Add generated assets only after the original game loop works.',
    steps: [
      'Play the browser demo and test movement, jumping, enemy contact, and retry.',
      'Follow the official 3D game tutorial and compare its scenes with the completed project.',
      'Ask an agent to adjust one mechanic, such as jump height or enemy spawning.',
      'Replace one asset at a time and check collision shapes, scale, animation, and performance.',
    ],
    tutorial: {
      label: 'Follow the official 3D tutorial',
      url: 'https://docs.godotengine.org/en/stable/getting_started/first_3d_game/index.html',
    },
    demo: {
      label: 'Play Squash the Creeps',
      url: 'https://godotengine.github.io/godot-demo-projects/3d/squash_the_creeps/',
      kind: 'playable',
      note: 'Official browser build with a moving character and enemy interactions. A WebGL-capable browser and keyboard are required.',
    },
    source: {
      label: 'Open the complete 3D game source',
      url: 'https://github.com/godotengine/godot-demo-projects/tree/master/3d/squash_the_creeps',
      note: 'Complete GDScript project with scenes, character assets, score, and retry behavior. Match the project branch to your Godot version.',
    },
    resourceIds: ['godot-engine', 'godot-demo-projects', 'godot-mcp', 'blender'],
  },
]
