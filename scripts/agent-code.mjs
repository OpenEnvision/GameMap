import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

export async function loadAgentCodeContent(){
 const bundle=await build({
  absWorkingDir:fileURLToPath(new URL('../',import.meta.url)),
  entryPoints:['website/src/data/agentGameResources.ts'],
  bundle:true,
  write:false,
  format:'esm',
  platform:'node',
 });
 return import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
}

const codeTypes={
 implementation:'Implementation source',
 instructions:'Agent instructions',
 mixed:'Implementation and instructions',
};
const idPattern=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fail=message=>{throw Error(message);};

function requireText(value,field,id){
 if(typeof value!=='string'||!value.trim())fail(`Missing agent-code ${field}: ${id}`);
}

function requireMap(value,name){
 if(!value||typeof value!=='object'||Array.isArray(value))fail(`Invalid agent-code ${name}`);
}

function requireLabels(value,name){
 requireMap(value,name);
 if(!Object.keys(value).length)fail(`Empty agent-code ${name}`);
 for(const [id,label] of Object.entries(value)){
  if(!idPattern.test(id))fail(`Invalid ${name} ID: ${id}`);
  requireText(label,`${name} label`,id);
 }
}

function requireHttps(value,field,id){
 requireText(value,field,id);
 let url;
 try{url=new URL(value);}catch{fail(`Invalid agent-code ${field} URL: ${id}`);}
 if(url.protocol!=='https:'||!url.hostname)fail(`Use HTTPS for agent-code ${field}: ${id}`);
}

function requireAgents(agents,labels,id){
 if(!Array.isArray(agents)||!agents.length)fail(`Missing agent attribution: ${id}`);
 const seen=new Set();
 for(const agent of agents){
  if(typeof agent!=='string'||!Object.hasOwn(labels,agent))fail(`Unknown agent attribution ${String(agent)}: ${id}`);
  if(seen.has(agent))fail(`Duplicate agent attribution ${agent}: ${id}`);
  seen.add(agent);
 }
}

export function validateAgentCodeContent(resources,cases,caseAgents,labels,kinds){
 requireLabels(labels,'agent labels');
 requireLabels(kinds,'resource kinds');
 if(!Array.isArray(resources)||!resources.length)fail('Missing agent-code resources');
 if(!Array.isArray(cases)||!cases.length)fail('Missing agent-code game cases');
 requireMap(caseAgents,'game attribution map');

 const resourceIds=new Set();
 for(const resource of resources){
  if(!resource||typeof resource!=='object'||Array.isArray(resource))fail('Invalid agent-code resource');
  for(const field of ['id','title','engine','summary','codeScope','limitations','publisher','reviewed']){
   requireText(resource[field],field,resource.id);
  }
  if(!idPattern.test(resource.id))fail(`Invalid agent-code resource ID: ${resource.id}`);
  if(resourceIds.has(resource.id))fail(`Duplicate agent-code resource ID: ${resource.id}`);
  resourceIds.add(resource.id);
  if(typeof resource.kind!=='string'||!Object.hasOwn(kinds,resource.kind))fail(`Unknown agent-code resource kind: ${resource.id}`);
  requireAgents(resource.agents,labels,resource.id);
  for(const field of ['sourceUrl','codeUrl','evidenceUrl'])requireHttps(resource[field],field,resource.id);
  if(typeof resource.codeType!=='string'||!Object.hasOwn(codeTypes,resource.codeType))fail(`Invalid agent-code material type: ${resource.id}`);
  if(typeof resource.official!=='boolean')fail(`Missing agent-code publisher status: ${resource.id}`);
  const reviewed=resource.reviewed;
  if(!/^\d{4}-\d{2}-\d{2}$/.test(reviewed)||Number.isNaN(Date.parse(reviewed))||new Date(reviewed).toISOString().slice(0,10)!==reviewed){
   fail(`Invalid agent-code review date: ${resource.id}`);
  }
 }

 const caseIds=new Set();
 for(const game of cases){
  if(!game||typeof game!=='object'||Array.isArray(game))fail('Invalid agent-code game case');
  requireText(game.id,'game case ID',game.id);
  requireText(game.title,'game case title',game.id);
  if(!idPattern.test(game.id))fail(`Invalid agent-code game case ID: ${game.id}`);
  if(caseIds.has(game.id))fail(`Duplicate agent-code game case ID: ${game.id}`);
  caseIds.add(game.id);
  if(!Object.hasOwn(caseAgents,game.id))fail(`Missing game agent attribution: ${game.id}`);
  requireAgents(caseAgents[game.id],labels,game.id);
  requireHttps(game.source?.url,'game source',game.id);
  requireHttps(game.evidence?.url,'creator evidence',game.id);
 }
 for(const id of Object.keys(caseAgents)){
  if(!caseIds.has(id))fail(`Agent attribution has no game case: ${id}`);
 }
 return resources;
}

const inline=value=>value
 .replaceAll('\\','\\\\')
 .replaceAll('[','\\[')
 .replaceAll(']','\\]')
 .replaceAll('|','\\|')
 .replaceAll('<','&lt;')
 .replaceAll('>','&gt;')
 .replace(/\s*\r?\n\s*/g,' ');
const link=(label,url)=>`[${inline(label)}](${new URL(url).href.replaceAll('(','%28').replaceAll(')','%29')})`;
const agentNames=(agents,labels)=>agents.map(agent=>inline(labels[agent])).join(' · ');

export function renderAgentCodeGuide(resources,cases,caseAgents,labels,kinds){
 validateAgentCodeContent(resources,cases,caseAgents,labels,kinds);
 let text=`# Coding agents × game development: code resources and game sources

**${resources.length} reviewed code resources** connect coding agents to game development. Separately, **${cases.length} reviewed game cases** link actual game projects and creator AI evidence. These are separate counts: a workflow or bridge is not another game, and a game may use several tools.

Resources contain implementation source, agent instructions, or both. A source review does not mean that a resource was installed, executed, or independently reproduced. Review dates and publisher status are recorded per resource. Counts describe collection size, not how many entries were newly added.

## Read the attribution correctly

Coding-agent clients and harnesses are distinguished from underlying models and web chat. **Gemini CLI** is a coding client; **Gemini model / AI Studio** describes model or web usage and does not establish use of Gemini CLI. Likewise, Claude model / chat and DeepSeek model attributions do not establish a particular coding client. Unspecified agents remain explicitly unspecified. Agent-neutral tools can support a workflow without proving which client a game creator used.

## Resources and games by agent attribution

A resource or game can appear in several rows; row counts overlap.

| Client, harness, or model attribution | Code resources | Game cases | Resource links |
| --- | --- | --- | --- |
`;
 for(const [agent,label] of Object.entries(labels)){
  const matches=resources.filter(resource=>resource.agents.includes(agent));
  const games=cases.filter(game=>caseAgents[game.id].includes(agent));
  if(!matches.length&&!games.length)continue;
  const links=matches.map(resource=>link(resource.title,resource.codeUrl)).join(' · ')||'—';
  text+=`| ${inline(label)} | ${matches.length} | ${games.length} | ${links} |\n`;
 }

 text+='\n## Reviewed code resources\n\n';
 for(const resource of resources){
  text+=`### ${inline(resource.title)}

${inline(resource.summary)}

**Kind:** ${inline(kinds[resource.kind])} · **Agents:** ${agentNames(resource.agents,labels)} · **Engine:** ${inline(resource.engine)}

${link('Code / instructions',resource.codeUrl)} · ${link('Review evidence',resource.evidenceUrl)} · ${link('Project source',resource.sourceUrl)}

- **Material:** ${codeTypes[resource.codeType]}.
- **Scope:** ${inline(resource.codeScope)}
- **Limitations:** ${inline(resource.limitations)}
- **Publisher:** ${inline(resource.publisher)} · ${resource.official?'Official publisher source':'Community / independent source'} · reviewed ${resource.reviewed}.

`;
 }

 text+=`## Game cases: actual attribution and complete source

These ${cases.length} games are the game-case collection, separate from the ${resources.length} code resources above. Client/model labels follow the creator evidence, rather than the game's related-tool links. The creator record describes AI involvement; it is not an independently measured authorship percentage.

| Game | Creator-attributed client or model | Actual game source | Creator AI evidence |
| --- | --- | --- | --- |
`;
 for(const game of cases){
  text+=`| ${inline(game.title)} | ${agentNames(caseAgents[game.id],labels)} | ${link('Game project',game.source.url)} | ${link(game.evidence.label||'Creator record',game.evidence.url)} |\n`;
 }
 text+='\nFor play/run instructions, development records, and fuller contribution descriptions, see the [AI game-build guide](tutorials-and-demos.md). Evidence and source availability can change after the recorded review.\n';
 return text;
}
