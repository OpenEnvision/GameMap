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
  Layers3,
  Orbit,
  PackageCheck,
  Palette,
  ScrollText,
  Sparkles,
  Square,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Category, Dimension, ResourceType, Stage } from "../../src/types";

// Presentation helpers only. Source collections belong in route loaders, never client bundles.
export { categories, stageLabels, typeLabels } from "../../src/types";
export { publicAsset } from "../../src/publicAsset";

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
