import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

export async function loadLearningContent(){
 const bundle=await build({absWorkingDir:fileURLToPath(new URL('../',import.meta.url)),entryPoints:['website/src/data/learningPaths.ts'],bundle:true,write:false,format:'esm',platform:'node'});
 return import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
}

const safe=value=>value.replaceAll('|','\\|');
export function renderLearningGuide(cases,foundations,resources,collections=[]){
 let text=`# Real AI game builds: workflows, playable demos, and complete source\n\nPrimary sources reviewed on 2026-10-18. Featured cases require a creator-provided record of AI involvement, a playable or locally runnable game, and the actual game project. AI contribution is attributed to those records; it is not an independently measured percentage. Study steps are GameMap editorial guidance.\n\n${cases.length} reviewed cases: **${cases.filter(path=>path.track==='2d').length} 2D** and **${cases.filter(path=>path.track==='3d').length} 3D**; ${cases.filter(path=>path.demo.kind==='playable').length} browser links and ${cases.filter(path=>path.demo.kind==='download').length} local downloads.\n\n## Search scope and selection\n\nDiscovery covered public GitHub projects, creator sites, itch.io and game-jam pages, Hacker News and Reddit posts, and English, Chinese, and Japanese search terms for AI-built 2D/3D games, Claude Code, Codex, Cursor, Gemini, DeepSeek, and Copilot. Community lists are discovery leads; each counted case links primary author evidence and its actual game source.\n\nA README AI disclosure is labeled separately from a prompt, transcript, development log, or tutorial. Some entries are prototypes. A collection is counted as one case unless its individual games have separately reviewed gameplay and source. Browser access is checked where practical; download entries state their setup requirements, and known unavailable hosts are disclosed. Screenshots identify GameMap captures or creator-published gameplay, with provenance in the media guide. This is a growing reviewed collection, not an exhaustive inventory of every community game or a claim that all games were fully reproduced.\n\n## AI-built games\n\n| Game | Dimension | AI production record | Play or run | Complete game source |\n| --- | --- | --- | --- | --- |\n`;
 for(const path of cases)text+=`| ${safe(path.title)} | ${path.track.toUpperCase()} | [${safe(path.tutorial.label)}](${path.tutorial.url}) | [${path.demo.kind==='playable'?'Play in browser':'Download / run locally'}](${path.demo.url}) | [Game project](${path.source.url}) |\n`;
 text+='\n';
 for(const path of cases){
  text+=`## ${path.title}\n\n${path.description}\n\n**AI workflow:** ${path.aiUse}\n\n- [${path.evidence.label}](${path.evidence.url}) — ${path.evidence.note}\n- [${path.tutorial.label}](${path.tutorial.url})\n- [${path.demo.label}](${path.demo.url}) — ${path.demo.note}\n- [${path.source.label}](${path.source.url}) — ${path.source.note}\n\n**Study this AI workflow**\n\n`;
  path.steps.forEach((step,index)=>{text+=`${index+1}. ${step}\n`;});
  text+='\n';
 }
 text+='## Broader community discovery\n\nThese collections include additional projects that may lack public game source or primary AI build records. They are discovery entry points and are not included in the reviewed case count.\n\n';
 for(const collection of collections)text+=`- [${collection.title}](${collection.url}) — ${collection.description}\n`;
 text+='\n## Optional engine foundations\n\nThese human-authored examples are supplementary engine references. They are not featured as AI-created games.\n\n| Reference | Engine tutorial | Playable demo | Full project |\n| --- | --- | --- | --- |\n';
 for(const path of foundations)text+=`| ${safe(path.title)} | [Tutorial](${path.tutorial.url}) | [Play](${path.demo.url}) | [Source](${path.source.url}) |\n`;
 text+='\nFor the Starshake Sandbox, select **3.90.0** in its runtime menu. The [original Phaser beginner tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game/part1) also has a [complete official source ZIP](https://cdn.phaser.io/tutorials/making-your-first-phaser-3-game/phaser3-tutorial-src.zip) for local running.\n\n## AI production tools and frameworks\n\nA tool interface, recorded video, model, SDK, and complete game are different deliverables. Source scope is stated below.\n\n';
 for(const resource of resources.filter(resource=>resource.access)){
  text+=`### ${resource.name}\n\n${resource.summary}\n\n`;
  for(const [key,link] of Object.entries(resource.access))text+=`- **${key[0].toUpperCase()+key.slice(1)} (${link.kind}):** ${link.url?`[${link.label}](${link.url})`:link.label}. ${link.note}\n`;
  text+='\n';
 }
 text+='## Additional asset-to-game workflow\n\nThe [Tripo Vibe Gaming Interactive Playbook](https://github.com/TripoGrowthLab/vibe-gaming-interactive-playbook) publishes a staged AI coding and generated-model workflow with playable 3D examples. Its public game code runs with greybox objects because the Tripo model files are not bundled. It is useful production guidance, but is not counted among the featured complete game-and-asset projects above.\n\nSource review and browser smoke testing do not establish full reproduction, complete gameplay coverage, or the availability of every third-party service.\n';
 return text;
}
