import { useState } from 'react';
import { ArrowDown, ArrowUpRight, BookOpen, Code2, Gamepad2, Search, X } from 'lucide-react';
import type { Resource } from '../types';
import { foundationPaths, learningPaths, type LearningPath } from '../data/learningPaths';
import { learningMedia } from '../data/learningMedia';
import { communityCollections } from '../data/communityResearch';
import { agentGameResources, agentLabels, gameCaseAgents } from '../data/agentGameResources';
import AgentCodeHub from './AgentCodeHub';
import ResourceAccess from './ResourceAccess';
import LearningPreview from './LearningPreview';
import ResourceIcon, { ResourceAttribution } from './ResourceIcon';
import { publicAsset } from '../publicAsset';
import './learning-hub.css';

interface Props {resources:Resource[]; openResource:(resource:Resource)=>void;}
const tutorialLabels={prompt:'ORIGINAL PROMPTS', 'build-log':'CREATOR BUILD LOG',tutorial:'AI BUILD TUTORIAL',quickstart:'GENERATION GUIDE',disclosure:'CREATOR AI DISCLOSURE'};

function GameCase({path,index,resources,openResource,foundation=false,eager=false}:{path:LearningPath;index:number;resources:Resource[];openResource:Props['openResource'];foundation?:boolean;eager?:boolean}){
  const media=foundation?undefined:learningMedia[path.id];
  return <article className={`learning-path${foundation?' is-foundation':''}`} data-game-case={path.id}>
    {media?<LearningPreview media={media} title={path.title} eager={eager} demo={path.demo}/>:null}
    <div className="learning-path-top"><span className="learning-path-number">{String(index+1).padStart(2,'0')}</span><span className="learning-engine">{path.engine}</span></div>
    {!foundation?<div className="case-badges"><span>{path.category==='ai-generated'?'Prompt-to-game':'AI-assisted production'}</span><span>{path.track.toUpperCase()} GAME</span><span>Full game project</span></div>:null}
    <h3>{path.title}</h3><p>{path.description}</p>
    {!foundation?<p className="case-agent-label"><strong>AI attribution: </strong>{gameCaseAgents[path.id].map(id=>agentLabels[id]).join(' · ')}</p>:null}
    {!foundation&&path.evidence?<div className="case-ai-credit"><span>{path.tutorial.kind==='disclosure'?'CREATOR AI DISCLOSURE':'AI BUILD RECORD'}</span><a href={path.evidence.url} target="_blank" rel="noreferrer">{path.evidence.label}<ArrowUpRight size={14}/></a></div>:null}
    <div className="learning-path-links">
      <a href={path.demo.url} target="_blank" rel="noreferrer" className={!foundation?'case-play-link':undefined}><Gamepad2 size={17}/><span><small>{path.demo.kind==='playable'?'PLAY THE REAL GAME':'RUN THE DOWNLOADED PROJECT'}</small>{path.demo.label}</span><ArrowUpRight size={16}/></a>
      <a href={path.tutorial.url} target="_blank" rel="noreferrer"><BookOpen size={17}/><span><small>{foundation?'ENGINE REFERENCE':tutorialLabels[path.tutorial.kind??'tutorial']}</small>{path.tutorial.label}</span><ArrowUpRight size={16}/></a>
      <a href={path.source.url} target="_blank" rel="noreferrer"><Code2 size={17}/><span><small>COMPLETE GAME SOURCE</small>{path.source.label}</span><ArrowUpRight size={16}/></a>
    </div>
    <details className="case-study-steps"><summary>{foundation?'Study the engine basics':'Controls, setup & AI workflow'}</summary><p className="learning-availability">{path.demo.note} {path.source.note}</p>{!foundation?<div className="case-ai-evidence"><span className="micro-label">HOW AI BUILT THIS GAME</span><p>{path.aiUse}</p></div>:null}<ol className="learning-steps">{path.steps.map(step=><li key={step}>{step}</li>)}</ol></details>
    {!foundation?<div className="learning-related">{path.resourceIds.map(id=>resources.find(resource=>resource.id===id)).filter((resource):resource is Resource=>!!resource).map(resource=><button className="text-link" key={resource.id} onClick={()=>openResource(resource)}>{resource.name}<ArrowUpRight size={13}/></button>)}</div>:null}
  </article>;
}

export default function LearningHub({resources,openResource}:Props){
  const production=resources.filter(resource=>resource.access);
  const [track,setTrack]=useState<'all'|'2d'|'3d'>('all');
  const [query,setQuery]=useState('');
  const [availability,setAvailability]=useState('all');
  const [buildAgent,setBuildAgent]=useState('all');
  const searchTerms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const cases=learningPaths.filter(path=>{
    if(track!=='all'&&path.track!==track)return false;
    if(availability!=='all'&&path.demo.kind!==availability)return false;
    if(buildAgent!=='all'&&!gameCaseAgents[path.id].some(id=>id===buildAgent))return false;
    const text=[path.title,path.description,path.engine,path.aiUse,...path.resourceIds,...gameCaseAgents[path.id].map(id=>agentLabels[id])].join(' ').toLocaleLowerCase();
    return searchTerms.every(term=>text.includes(term));
  });
  return <div className="learning-view page-enter">
    <section className="learning-intro">
      <span className="micro-label">REAL AI BUILDS · REAL GAMES · REAL SOURCE</span>
      <h1>See how AI<br/>built the <em>game.</em></h1>
      <p>Explore the code behind AI game development: agent skills, engine integrations, and complete games. Find Codex, Claude Code, Gemini CLI, and other documented workflows, then inspect their actual source.</p>
      <div className="learning-jump-links"><a className="dark-button" href="#agent-game-code">Explore agent game code<ArrowDown size={16}/></a><a className="outline-button" href="#starter-projects">Play AI-built games<ArrowDown size={16}/></a><a className="outline-button" href="#production-toolkit">AI production toolkit<ArrowDown size={16}/></a><a className="outline-button" href="?view=test">Explore the test library<ArrowUpRight size={16}/></a></div>
      <div className="learning-stats"><span><strong>{learningPaths.length}</strong>AI-BUILT GAME CASES</span><span><strong>{agentGameResources.length}</strong>AGENT CODE RESOURCES</span><span><strong>03</strong>PLAY · WORKFLOW · SOURCE</span></div>
    </section>
    <AgentCodeHub/>
    <section id="starter-projects" className="learning-section">
      <div className="section-heading"><div><span className="micro-label">FROM AI WORKFLOW TO PLAYABLE RESULT</span><h2>Play it. Trace the build. Open the source.</h2><p>Community projects across game genres, engines, and AI tools. Each case links the creator’s AI evidence and actual game source. Browser games and local projects are labeled separately.</p></div></div>
      <div className="case-filters" role="group" aria-label="Filter AI game cases">{([['all','All AI games'],['3d','3D games'],['2d','2D games']] as const).map(([id,label])=><button key={id} aria-pressed={track===id} className={track===id?'selected':''} onClick={()=>setTrack(id)}>{label}<span>{id==='all'?learningPaths.length:learningPaths.filter(path=>path.track===id).length}</span></button>)}</div>
      <div className="case-search-tools">
        <div className="case-search"><Search size={17}/><label className="sr-only" htmlFor="ai-game-case-search">Search AI game cases</label><input id="ai-game-case-search" type="search" placeholder="Search games, engines, or AI tools…" value={query} onChange={event=>setQuery(event.target.value)}/>{query?<button type="button" aria-label="Clear game search" onClick={()=>setQuery('')}><X size={16}/></button>:null}</div>
        <label className="case-availability"><span>Play mode</span><select aria-label="Play mode" value={availability} onChange={event=>setAvailability(event.target.value)}><option value="all">All projects</option><option value="playable">Play in browser</option><option value="download">Run locally</option></select></label>
        <label className="case-availability"><span>Game build attribution</span><select aria-label="Game build attribution" value={buildAgent} onChange={event=>setBuildAgent(event.target.value)}><option value="all">All attributions</option>{Object.entries(agentLabels).filter(([id])=>learningPaths.some(path=>gameCaseAgents[path.id].some(agentId=>agentId===id))).map(([id,label])=><option key={id} value={id}>{label} ({learningPaths.filter(path=>gameCaseAgents[path.id].some(agentId=>agentId===id)).length})</option>)}</select></label>
      </div>
      <p className="case-result-count" role="status">{cases.length} of {learningPaths.length} documented AI game {learningPaths.length===1?'build':'builds'}</p>
      <div className="learning-paths ai-case-grid">{cases.map((path,index)=><GameCase key={path.id} path={path} index={learningPaths.indexOf(path)} resources={resources} openResource={openResource} eager={index<2}/>)}</div>
      {cases.length===0?<div className="case-empty"><p>No games match these filters.</p><button className="outline-button" onClick={()=>{setQuery('');setTrack('all');setAvailability('all');setBuildAgent('all');}}>Show all AI games</button></div>:null}
    </section>
    <section className="community-discovery learning-section" aria-labelledby="community-discovery-title">
      <h2 id="community-discovery-title">Keep exploring the community.</h2>
      <p>Broader discovery collections include games that may not publish source code or detailed AI build records. They are separate from the reviewed cases above.</p>
      <div>{communityCollections.map(collection=><a href={collection.url} key={collection.url} target="_blank" rel="noreferrer"><strong>{collection.title}<ArrowUpRight size={15}/></strong><span>{collection.description}</span></a>)}</div>
    </section>
    <details className="foundation-guides"><summary><BookOpen size={19}/><span>Optional engine foundations<small>Human-authored reference games for learning the basics</small></span><strong>{foundationPaths.length} references</strong></summary><div className="learning-paths">{foundationPaths.map((path,index)=><GameCase key={path.id} path={path} index={index} resources={resources} openResource={openResource} foundation/>)}</div></details>
    <section id="production-toolkit" className="learning-section">
      <div className="section-heading"><div><span className="micro-label">CONNECT THE PRODUCTION STEPS</span><h2>Your AI production toolkit.</h2><p>Public access is labeled precisely: a tool demo, video, SDK, or model is identified separately from a playable game and its complete source.</p></div></div>
      <div className="production-guides">{production.map(resource=><article className="production-guide" key={resource.id}>
        <div className="production-guide-title"><ResourceIcon resource={resource} size={34}/><div><button onClick={()=>openResource(resource)}><h3>{resource.name}</h3><ArrowUpRight size={16}/></button><ResourceAttribution resource={resource}/></div></div>
        <p className="production-guide-summary">{resource.summary}</p><ResourceAccess resource={resource}/>
      </article>)}</div>
    </section>
    <div className="learning-footnote"><span>AI contribution is attributed to creator records. Study steps are GameMap editorial guidance. Public community sources reviewed October 18, 2026; this is a growing collection.</span><a className="text-link" href={publicAsset('tutorials-and-demos.md')} target="_blank" rel="noreferrer">Open the complete link guide<ArrowUpRight size={15}/></a></div>
  </div>;
}
