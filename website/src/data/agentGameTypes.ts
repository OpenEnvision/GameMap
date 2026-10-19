export const agentLabels = {
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

export type AgentId = keyof typeof agentLabels;

export const agentResourceKinds = {
  skill: 'Skills & instructions',
  bridge: 'Engine bridges',
  framework: 'Development frameworks',
  evaluation: 'Development evaluations',
  workflow: 'Build workflows',
  'code-example': 'Runnable game code',
} as const;

export interface AgentGameResource {
  id: string;
  catalogResourceId?: string;
  title: string;
  kind: keyof typeof agentResourceKinds;
  agents: AgentId[];
  engine: string;
  summary: string;
  sourceUrl: string;
  codeUrl: string;
  evidenceUrl: string;
  codeType: 'implementation' | 'instructions' | 'mixed';
  codeScope: string;
  limitations: string;
  publisher: string;
  official: boolean;
  reviewed: string;
}
