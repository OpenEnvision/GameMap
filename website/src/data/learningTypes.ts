export interface LearningPath {
  id:string;
  title:string;
  description:string;
  engine:string;
  track:'2d'|'3d';
  category:'ai-generated'|'ai-assisted'|'foundation';
  aiUse:string;
  steps:string[];
  tutorial:{label:string;url:string;kind?:'prompt'|'build-log'|'tutorial'|'quickstart'|'disclosure'};
  demo:{label:string;url:string;kind:'playable'|'download';note:string};
  source:{label:string;url:string;note:string;scope?:'complete-project'|'game-code-greybox'};
  evidence?:{label:string;url:string;note:string};
  resourceIds:string[];
}
