export type Category = 'agents' | 'engines' | '2d' | '3d' | 'production' | 'world';
export type Dimension = '2d' | '3d' | 'world';
export type Stage = 'plan' | 'code' | 'assets' | 'scene' | 'test' | 'ship' | 'runtime' | 'world';
export type ResourceType = 'agent' | 'framework' | 'skill' | 'benchmark' | 'paper' | 'docs' | 'tool' | 'community' | 'dataset';
export type AccessKind = 'tutorial' | 'playable' | 'interactive' | 'video' | 'download' | 'full-source' | 'sdk' | 'examples' | 'model' | 'local-tool' | 'pipeline-source' | 'service' | 'unavailable';
export interface ResourceAccess { label:string; url?:string; kind:AccessKind; note:string; }
export interface Resource {
  id: string; name: string; category: Category; type: ResourceType;
  summary: string; detail: string; url: string; links?: {label: string; url: string}[];
  tags: string[]; stages: Stage[]; dimensions: Dimension[]; year?: number; verified: string;
  access?: {tutorial:ResourceAccess; demo:ResourceAccess; source:ResourceAccess};
}
export type View = 'map' | 'library' | 'saved' | 'notes' | 'learn' | 'test';
export const categories: {id:Category; label:string; color:string; description:string}[] = [
  {id:'agents',label:'Coding agents',color:'#6e9d51',description:'Turn ideas into code with agents, skills, and engine integrations.'},
  {id:'engines',label:'Game engines',color:'#9780d5',description:'Official documentation, working examples, and practical engine knowledge.'},
  {id:'2d',label:'2D development',color:'#ec965b',description:'Explore game generation, sprites, levels, and development benchmarks.'},
  {id:'3d',label:'3D development',color:'#6b91d0',description:'Connect 3D assets and scene building with playable engine projects.'},
  {id:'production',label:'Game production',color:'#64b8a3',description:'Create consistent art, animate characters, add sound, and test real gameplay.'},
  {id:'world',label:'World models',color:'#cd85ad',description:'Explore code-driven state, neural rendering, and interactive worlds.'},
];
export const typeLabels: Record<ResourceType,string> = {agent:'Agent',framework:'Framework',skill:'Skill',benchmark:'Benchmark',paper:'Paper',docs:'Documentation',tool:'Tool',community:'Community',dataset:'Dataset'};
export const stageLabels: Record<Stage,string> = {plan:'Planning',code:'Gameplay & code',assets:'Assets & animation',scene:'Engines & scenes',test:'Testing',ship:'Build & release',runtime:'Runtime AI & NPCs',world:'World models'};
