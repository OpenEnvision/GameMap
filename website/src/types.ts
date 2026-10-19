import taxonomy from '../content/taxonomy.json';
export type Category = keyof typeof taxonomy.categories;
export type Dimension = keyof typeof taxonomy.dimensions;
export type Stage = keyof typeof taxonomy.stages;
export type ResourceType = keyof typeof taxonomy.types;
export type AccessKind = keyof typeof taxonomy.accessKinds;
export interface ResourceAccess { label:string; url?:string; kind:AccessKind; note:string; }
export interface Resource {
  id: string; name: string; category: Category; type: ResourceType;
  summary: string; detail: string; url: string; links?: {label: string; url: string}[];
  tags: string[]; stages: Stage[]; dimensions: Dimension[]; year?: number; verified: string;
  access?: {tutorial:ResourceAccess; demo:ResourceAccess; source:ResourceAccess};
}
export const categories = Object.entries(taxonomy.categories).map(([id,entry])=>({id:id as Category,...entry}));
export const typeLabels = taxonomy.types;
export const stageLabels = Object.fromEntries(Object.entries(taxonomy.stages).map(([id, entry]) => [id, entry.label])) as Record<Stage,string>;
