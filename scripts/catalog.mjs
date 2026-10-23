import {readdir, readFile} from 'node:fs/promises';
import {canonicalValue} from './lib/catalog/codec.mjs';
const taxonomy=JSON.parse(await readFile(new URL('../website/content/taxonomy.json',import.meta.url),'utf8'));
export const categories=Object.entries(taxonomy.categories).map(([id,{documentLabel}])=>[id,documentLabel]);
export const types=taxonomy.types;
export const stages=Object.fromEntries(Object.entries(taxonomy.stages).map(([id,entry])=>[id,entry.documentLabel]));
const accessKinds=Object.keys(taxonomy.accessKinds);
export async function loadCatalog(){
 const files=(await readdir(new URL('../data/segments/',import.meta.url))).filter(f=>f.endsWith('.json')).sort();
 const contracts=JSON.parse(await readFile(new URL('../website/content/sources.config.json',import.meta.url),'utf8'));
 const sections=await Promise.all(files.map(async f=>{
  const rule=contracts['data/segments/'+f]?.exports?.default;
  if(rule&&rule.kind!=='resource')return [];
  const section=JSON.parse(await readFile(new URL('../data/segments/'+f,import.meta.url),'utf8'));
  if(!Array.isArray(section))throw Error(`Unclassified segment ${f}: declare its kind in website/content/sources.config.json`);
  return section;
 }));
 const all=sections.flat();
 const records=categories.flatMap(([id])=>all.filter(r=>r.category===id));
 if(records.length!==all.length)throw Error('Unknown category in data segments');
 return records;
}
export function validate(records){
 const ids=new Set(),urls=new Set();const dimensions=Object.keys(taxonomy.dimensions);
 for(const r of records){
  for(const key of ['id','name','category','type','summary','detail','url','verified'])if(typeof r[key]!=='string'||!r[key].trim())throw Error(`Missing ${key}: ${r.id}`);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))throw Error(`Invalid ID: ${r.id}`);
  if(ids.has(r.id))throw Error(`Duplicate ID: ${r.id}`);ids.add(r.id);
  if(!categories.some(([id])=>id===r.category)||!types[r.type])throw Error(`Invalid taxonomy: ${r.id}`);
  for(const [field,allowed] of [['tags',null],['stages',Object.keys(stages)],['dimensions',dimensions]]){
   if(!Array.isArray(r[field])||!r[field].length||r[field].some(v=>typeof v!=='string'||!v.trim()||(allowed&&!allowed.includes(v))))throw Error(`Invalid ${field}: ${r.id}`);
   if(new Set(r[field]).size!==r[field].length)throw Error(`Duplicate ${field}: ${r.id}`);
  }
  const checkUrl=u=>{const url=new URL(u);if(url.protocol!=='https:')throw Error(`Use HTTPS: ${u}`);};checkUrl(r.url);
  if(urls.has(r.url.replace(/\/$/,'')))throw Error(`Duplicate primary URL: ${r.url}`);urls.add(r.url.replace(/\/$/,''));
  if(r.links){if(!Array.isArray(r.links))throw Error(`Invalid links: ${r.id}`);for(const l of r.links){if(typeof l.label!=='string'||!l.label)throw Error(`Invalid link label: ${r.id}`);checkUrl(l.url);}}
  if(r.access){
   for(const key of ['tutorial','demo','source']){
    const link=r.access[key];
    if(!link||typeof link.label!=='string'||!link.label.trim()||typeof link.note!=='string'||!link.note.trim()||!accessKinds.includes(link.kind))throw Error(`Invalid ${key} access: ${r.id}`);
    if(link.kind==='unavailable'){if(link.url!==undefined)throw Error(`Unavailable link must not have a URL: ${r.id}/${key}`);}
    else checkUrl(link.url);
   }
  }
  if(!/^\d{4}-\d{2}-\d{2}$/.test(r.verified)||Number.isNaN(Date.parse(r.verified)))throw Error(`Invalid verification date: ${r.id}`);
  if(r.year!==undefined&&(!Number.isInteger(r.year)||r.year<1990||r.year>new Date().getFullYear()+1))throw Error(`Invalid year: ${r.id}`);
 }
 return records;
}
const tableSafe=s=>s.replaceAll('|','\\|').replaceAll('\n',' ');
export function renderAwesome(records){
 records=canonicalValue(records);
 const total=records.length;
 let text=`# Awesome AI Game Development

> A planning map for AI game development — from an idea to a playable world.

**${total} curated primary sources** connecting coding agents, game engines, AI for 2D and 3D development, production tools, and code world models. Main source review date: **October 18, 2026**. This is a research snapshot: reviewing a source does not imply reproducing its results or continuously monitoring it.

- [Interactive GameMap website — GitHub Pages](https://openenvision.github.io/GameMap/)
- [A practical guide from resources to a working project](docs/practical-guide.md)
- [Production research: interfaces, evidence and generative-service boundaries](docs/research-index.md)
- [Tutorials, playable demos, and complete example-game source](docs/tutorials-and-demos.md)
- [Coding agents × games: skills, bridges, evaluations, and game code](docs/coding-agent-game-code.md)
- [Testing library: games, AI environments, assets, rigs, and motion data](docs/game-testing-library.md)
- [Contributing and data maintenance](CONTRIBUTING.md) · [Structured JSON](data/resources.json)

## How to read the map

| Layer | What it addresses | Evidence to look for |
| --- | --- | --- |
| Model / coding agent / harness | Reasoning, code changes, and tool execution | Actual tools, runtime feedback, and supported tasks |
| Skill / MCP / CLI | Domain knowledge and engine editing | Real SKILL.md files, protocols, and editor operations |
| Framework / tool | Organizing generation or completing a production task | Inputs, outputs, project formats, and release status |
| Benchmark | Repeatable development evaluation | Tasks, scoring scripts, environments, and versions |
| Paper / world model | Executable state, neural simulation, or hybrid rendering | World representation, action interface, long-term consistency, and public availability |

**Tool roles.** DeepSeek is listed through its model integration documentation, rather than as an official standalone harness. Blender is a DCC application and Three.js is a 3D library; their roles differ from those of full game engines. Development, gameplay, and modeling evaluations are considered separately. SolarRenderer and StreamRender-H3 belong to the structure- or engine-driven hybrid rendering track; pure video world models are labeled separately.

## Contents

`;
 categories.forEach(([id,title],i)=>{text+=`- [${i+1}. ${title}](#${id}) — ${records.filter(r=>r.category===id).length} resources\n`;});
 text+='\n';
 for(const [id,title] of categories){
  const section=records.filter(r=>r.category===id);
  text+=`<a id="${id}"></a>\n\n## ${title}\n\n`;
  for(const [type,label] of Object.entries(types)){
   const group=section.filter(r=>r.type===type);if(!group.length)continue;
   text+=`### ${label}\n\n| Resource | Purpose and scope | Stages |\n| --- | --- | --- |\n`;
   for(const r of group)text+=`| [${tableSafe(r.name)}](${r.url})${r.year?' · '+r.year:''} | ${tableSafe(r.summary)} | ${r.stages.map(s=>stages[s]).join(' / ')} |\n`;
   text+='\n<details>\n<summary>Inputs, outputs, limitations, and further reading</summary>\n\n';
   for(const r of group){
    text+=`**[${r.name}](${r.url})**\n\n${r.detail}\n\nTags: ${r.tags.map(t=>'`'+t+'`').join(' · ')}. Source reviewed: ${r.verified}.`;
    if(r.links?.length)text+=' Further reading: '+r.links.map(l=>`[${l.label}](${l.url})`).join(' · ');
    text+='\n\n';
    if(r.access)for(const [key,link] of Object.entries(r.access))text+=`- **${key[0].toUpperCase()+key.slice(1)} · ${link.kind}:** ${link.url?`[${link.label}](${link.url})`:link.label}. ${link.note}\n`;
    if(r.access)text+='\n';
   }
   text+='</details>\n\n';
  }
 }
 text+=`## Further reading and practice

- [Agents: models, harnesses, skills, and MCP](docs/agents-notes.md)
- [Engine ecosystems: documentation, source, tests, and community practice](docs/engines-notes.md)
- [AI for 2D and 3D: evaluation versions, asset pipelines, and release boundaries](docs/game-ai-notes.md)
- [World models: code state, hybrid rendering, video simulation, and explicit 3D](docs/world-model-notes.md)
- [Practical guide: task contracts, asset import, validation, and reproduction](docs/practical-guide.md)

## Maintenance

Edit only \`data/segments/*.json\` for catalog content. Run \`npm run build\` to regenerate the list and website, and \`npm run check\` to validate the data and generated outputs. There is no automatic scraping or scheduled updating. Code, weights, data, and services may have different licenses; read the relevant official terms before use. External projects belong to their respective authors.
`;
 return text;
}
