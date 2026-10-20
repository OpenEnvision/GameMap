import type { LearningPath } from './learningTypes'

export const aiCommunityCases: LearningPath[] = [
  {
    id: 'claude-agent-team-tetris',
    title: 'Tetris built by an AI agent team',
    description: 'A complete browser game with a published account of how three Claude Code teammates divided the rules, rendering, and controls.',
    engine: "Canvas 2D · JavaScript",
    track: '2d',
    category: 'ai-assisted',
    aiUse: 'The author documents a Claude Opus 4.6 agent team, shared scaffolding, separate file ownership, and the exact prompts assigned to each teammate.',
    steps: [
      'Play the finished game and test rotation, hard drop, pause, and restart.',
      'Read the original team prompt and the separate engine, renderer, and UI assignments.',
      'Compare the shared state and event contract with each teammate’s completed module.',
      'Review the coordination notes to see how parallel work was assigned and integrated.',
    ],
    tutorial: {
      label: 'Read the agent-team build log',
      url: 'https://github.com/caiguanhao/tetris#built-with-claude-code-agent-teams',
      kind: 'build-log',
    },
    demo: {
      label: 'Play Tetris',
      url: 'https://caiguanhao.github.io/tetris/',
      kind: 'playable',
      note: 'Browser game with keyboard and touch controls. Press Enter or tap to start.',
    },
    source: {
      label: 'Open the complete game source',
      url: 'https://github.com/caiguanhao/tetris',
      note: 'Complete HTML, CSS, and JavaScript game, including rules, rendering, controls, procedural music, and sound effects.',
      scope: 'complete-project',
    },
    evidence: {
      label: 'See the original agent prompts',
      url: 'https://github.com/caiguanhao/tetris#the-prompt-used-to-spawn-the-team',
      note: 'The author publishes the team prompt, individual assignments, model name, and coordination sequence. This is a documented AI-assisted build.',
    },
    resourceIds: ['claude-code', 'playwright-mcp'],
  },
  {
    id: 'tower-of-time-ai-build',
    title: 'Tower of Time: prompting a rewind mechanic',
    description: 'A finished tower-defense game with time reversal and an extensive author-published prompt log covering mechanics, debugging, and polish.',
    engine: "Phaser 3 · TypeScript",
    track: '2d',
    category: 'ai-assisted',
    aiUse: 'The author used Augment Code and Cursor agents, mainly with Claude Sonnet 4, while also editing code and arranging scenes in Phaser Editor.',
    steps: [
      'Play the game and try building defenses, surviving waves, and rewinding time.',
      'Read the Rewindable Sprite prompts and the follow-up reports that refine the mechanic.',
      'Trace how the author supplied file context, documentation, and observed errors to the agents.',
      'Compare the prompt history with the complete project, including scenes, gameplay systems, and assets.',
    ],
    tutorial: {
      label: 'Read the author’s prompt log',
      url: 'https://github.com/maciej-trebacz/tower-of-time-game/blob/main/PROMPTS.md',
      kind: 'prompt',
    },
    demo: {
      label: 'Play Tower of Time',
      url: 'https://m4v3k.itch.io/tower-of-time',
      kind: 'playable',
      note: 'Choose Run game, then Start. Use arrow keys to move, Space for actions, and Backspace to rewind; gamepad controls are also available.',
    },
    source: {
      label: 'Open the complete game project',
      url: 'https://github.com/maciej-trebacz/tower-of-time-game',
      note: 'Complete Phaser and TypeScript project with scenes, gameplay systems, image assets, music, sound effects, font files, and asset credits.',
      scope: 'complete-project',
    },
    evidence: {
      label: 'Read the AI contribution disclosure',
      url: 'https://github.com/maciej-trebacz/tower-of-time-game#vibe-coding-proof-of-concept',
      note: 'The author describes the AI tools used; the prompt log explicitly discloses manual code edits and scene work in Phaser Editor.',
    },
    resourceIds: ['phaser', 'phaser-examples'],
  },
]
