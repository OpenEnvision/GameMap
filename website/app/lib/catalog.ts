import {
  BookOpen,
  Bot,
  Box,
  Boxes,
  ChartNoAxesCombined,
  ClipboardList,
  Code2,
  Database,
  FileText,
  FlaskConical,
  Gamepad2,
  Joystick,
  Layers3,
  LayoutGrid,
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
  type LucideIcon,
} from "lucide-react";
import type { Category, Dimension, ResourceType, Stage } from "../../src/types";
import type { TestingResource } from "../../src/data/testingTypes";

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
