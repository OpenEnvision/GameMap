import taxonomy from "../content/taxonomy.json";
import type { PayloadModels } from "../content/contracts";
export type Category = keyof typeof taxonomy.categories;
export type Dimension = keyof typeof taxonomy.dimensions;
export type Stage = keyof typeof taxonomy.stages;
export type ResourceType = keyof typeof taxonomy.types;
export type AccessKind = keyof typeof taxonomy.accessKinds;
export type Resource = PayloadModels["resource"];
export type ResourceAccess = NonNullable<Resource["access"]>["tutorial"];
export const categories = Object.entries(taxonomy.categories).map(
  ([id, entry]) => ({ id: id as Category, ...entry }),
);
export const typeLabels = taxonomy.types;
export const stageLabels = Object.fromEntries(
  Object.entries(taxonomy.stages).map(([id, entry]) => [id, entry.label]),
) as Record<Stage, string>;
