export const testingKinds = {
  project: 'Games & engine projects',
  environment: 'AI evaluation environments',
  asset: 'Asset libraries',
  motion: 'Rigs & motion data',
} as const;

export const testingUses = {
  coding: 'Coding & automated playtests',
  playing: 'Vision, control & planning',
  pipeline: 'Asset & animation pipelines',
} as const;

export const testingTerms = {
  open: 'Open-license sources',
  mixed: 'Mixed code / asset licenses',
  engine: 'Engine-specific terms',
  research: 'Research / custom data terms',
  review: 'Permission needs confirmation',
} as const;

export interface TestingResource {
  id: string;
  title: string;
  kind: keyof typeof testingKinds;
  uses: (keyof typeof testingUses)[];
  dimensions: ('2d' | '3d')[];
  stack: string;
  summary: string;
  sourceUrl: string;
  access: { label: string; url: string; note: string };
  codeLicense: string;
  assetLicense: string;
  terms: keyof typeof testingTerms;
  licenseUrl: string;
  evidence: { label: string; url: string }[];
  aiUseNote: string;
  testTasks: string[];
  setup: string[];
  limitations: string;
  reviewed: string;
}
