import type { PayloadModels } from "../../content/contracts";

export const testingKinds = {
  project: "Games & engine projects",
  environment: "AI evaluation environments",
  asset: "Asset libraries",
  motion: "Rigs & motion data",
} as const;

export const testingUses = {
  coding: "Coding & automated playtests",
  playing: "Vision, control & planning",
  pipeline: "Asset & animation pipelines",
} as const;

export const testingTerms = {
  open: "Open-license sources",
  mixed: "Mixed code / asset licenses",
  engine: "Engine-specific terms",
  research: "Research / custom data terms",
  review: "Permission needs confirmation",
} as const;

export type TestingStarterPack = PayloadModels["testing-pack"];
export type TestingResource = PayloadModels["testing"];
