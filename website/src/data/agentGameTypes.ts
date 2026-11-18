import type { PayloadModels } from '../../content/contracts';

// Historical v1 tool/attachment vocabulary must not expand when attribution readers evolve.
export const agentLabelsV1 = {
  codex: 'Codex',
  'claude-code': 'Claude Code',
  'gemini-cli': 'Gemini CLI',
  antigravity: 'Antigravity',
  cursor: 'Cursor',
  copilot: 'GitHub Copilot',
  opencode: 'OpenCode',
  aider: 'Aider',
  cline: 'Cline',
  windsurf: 'Windsurf',
  kiro: 'Kiro',
  pi: 'Pi',
  'kimi-code': 'Kimi Code',
  'grok-build': 'Grok Build',
  'gemini-code-assist': 'Gemini Code Assist',
  augment: 'Augment Code',
  'deepseek-harness': 'DeepSeek Harness',
  'agent-neutral': 'Agent-neutral tools',
  'gemini-model': 'Gemini model / AI Studio',
  'claude-model': 'Claude model / chat',
  'deepseek-model': 'DeepSeek model',
  chatgpt: 'ChatGPT',
  other: 'Other / unspecified agent',
} as const;

// Source-attributed clients in the preserved agents loader; not verified endorsements.
export const agentLabels = {
  ...agentLabelsV1,
  'claude-cowork': 'Claude Cowork',
  'roo-code': 'Roo Code',
} as const;
export type AgentId = keyof typeof agentLabelsV1;
export type AttributionAgentId = keyof typeof agentLabels;

export const agentResourceKinds = {
  skill: 'Skills & instructions',
  bridge: 'Engine bridges',
  framework: 'Development frameworks',
  evaluation: 'Development evaluations',
  workflow: 'Build workflows',
  'code-example': 'Runnable game code',
} as const;

export type AgentGameResource = PayloadModels['agent'];
