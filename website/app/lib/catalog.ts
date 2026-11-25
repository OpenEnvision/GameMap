import {
  BookOpen,
  Bot,
  Box,
  Boxes,
  Cable,
  ChartNoAxesCombined,
  ClipboardList,
  Code2,
  CodeXml,
  Database,
  FileText,
  FlaskConical,
  Gamepad2,
  Joystick,
  Layers3,
  LayoutGrid,
  ListChecks,
  Orbit,
  PackageCheck,
  Palette,
  PersonStanding,
  Radar,
  ScrollText,
  Sparkles,
  Square,
  Users,
  Workflow,
  Wrench,
  AudioLines,
  Store,
  type LucideIcon,
} from "lucide-react";
import type { Category, Dimension, ResourceType, Stage } from "../../src/types";
import type { TestingResource } from "../../src/data/testingTypes";
import type { AgentGameResource } from "../../src/data/agentGameTypes";

// Presentation helpers only. Source collections belong in route loaders, never client bundles.
export { categories, stageLabels, typeLabels } from "../../src/types";
export { publicAsset } from "../../src/publicAsset";
export { LayoutGrid };

export const categoryGlyphs: Record<Category, LucideIcon> = {
  agents: Code2,
  engines: Boxes,
  "2d": Gamepad2,
  "3d": Layers3,
  production: Sparkles,
  world: Orbit,
  audio: AudioLines,
  runtime: Bot,
  testing: FlaskConical,
  publishing: Store,
};

export const typeGlyphs: Record<ResourceType, LucideIcon> = {
  agent: Bot,
  framework: Workflow,
  skill: ScrollText,
  benchmark: ChartNoAxesCombined,
  paper: FileText,
  docs: BookOpen,
  tool: Wrench,
  community: Users,
  dataset: Database,
  tutorial: BookOpen,
  platform: Store,
};

export const stageGlyphs: Record<Stage, LucideIcon> = {
  plan: ClipboardList,
  code: Code2,
  assets: Palette,
  scene: Boxes,
  test: FlaskConical,
  ship: PackageCheck,
  runtime: Bot,
  world: Orbit,
};

export const dimensionGlyphs: Record<Dimension, LucideIcon> = {
  "2d": Square,
  "3d": Box,
  world: Orbit,
};

export const testingKindGlyphs: Record<TestingResource["kind"], LucideIcon> = {
  project: Gamepad2,
  environment: Radar,
  asset: Boxes,
  motion: PersonStanding,
  fixture: Joystick,
};

export const agentKindGlyphs: Record<AgentGameResource["kind"], LucideIcon> = {
  skill: BookOpen,
  bridge: Cable,
  framework: Boxes,
  evaluation: ChartNoAxesCombined,
  "gameplay-evaluation": Gamepad2,
  workflow: Workflow,
  "code-example": CodeXml,
  client: Bot,
  standard: ListChecks,
};

export const shortStageLabels: Record<Stage, string> = {
  plan: "Planning",
  code: "Coding",
  assets: "Assets",
  scene: "Scenes",
  test: "Test",
  ship: "Release",
  runtime: "Runtime AI",
  world: "World models",
};
