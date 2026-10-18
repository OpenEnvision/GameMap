import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Code2, Search, X } from 'lucide-react';
import { agentGameResources, agentLabels, agentResourceKinds } from '../data/agentGameResources';
import { publicAsset } from '../publicAsset';
import './agent-code-hub.css';

const codeTypeLabels = {
  implementation: 'Executable source',
  instructions: 'Instructions & examples',
  mixed: 'Code + instructions',
};

export default function AgentCodeHub() {
  const [agent, setAgent] = useState('all');
  const [kind, setKind] = useState('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const results = agentGameResources.filter(resource => {
    if (agent !== 'all' && !resource.agents.some(id => id === agent)) return false;
    if (kind !== 'all' && resource.kind !== kind) return false;
    const text = [resource.title, resource.engine, resource.summary, resource.codeScope, resource.limitations, resource.publisher, ...resource.agents.map(id => agentLabels[id])].join(' ').toLocaleLowerCase();
    return terms.every(term => text.includes(term));
  });
  const visible = expanded ? results : results.slice(0, 4);
  const reset = () => { setAgent('all'); setKind('all'); setQuery(''); setExpanded(false); };

  return <section className="agent-code-hub learning-section" id="agent-game-code" aria-labelledby="agent-game-code-heading">
    <div className="section-heading"><div>
      <span className="micro-label">CODING AGENTS × GAME DEVELOPMENT</span>
      <h2 id="agent-game-code-heading">Start with the code.</h2>
      <p>Find agent skills, engine bridges, reusable frameworks, development evaluations, and runnable game projects. Every resource links the actual code or instruction files, with its scope stated clearly.</p>
    </div></div>
    <div className="agent-code-controls">
      <label className="case-availability"><span>Coding agent</span><select aria-label="Coding agent" value={agent} onChange={event => { setAgent(event.target.value); setExpanded(false); }}>
        <option value="all">All coding agents</option>
        {Object.entries(agentLabels).filter(([id]) => agentGameResources.some(resource => resource.agents.some(agentId => agentId === id))).map(([id, label]) => <option value={id} key={id}>{label} ({agentGameResources.filter(resource => resource.agents.some(agentId => agentId === id)).length})</option>)}
      </select></label>
      <label className="case-availability"><span>Resource type</span><select aria-label="Resource type" value={kind} onChange={event => { setKind(event.target.value); setExpanded(false); }}>
        <option value="all">All resource types</option>
        {Object.entries(agentResourceKinds).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select></label>
      <div className="case-search"><Search size={17}/><label htmlFor="agent-code-search" className="sr-only">Search agent game code</label><input id="agent-code-search" type="search" value={query} placeholder="Search engines, code, or workflows…" onChange={event => { setQuery(event.target.value); setExpanded(false); }}/>{query ? <button type="button" onClick={() => { setQuery(''); setExpanded(false); }} aria-label="Clear agent code search"><X size={16}/></button> : null}</div>
    </div>
    <p className="case-result-count" role="status">{results.length} of {agentGameResources.length} agent code & workflow resources</p>
    <div className="agent-code-grid">
      {visible.map(resource => <article className="agent-code-card" data-agent-code-resource={resource.id} key={resource.id}>
        <div className="agent-code-card-meta"><span>{agentResourceKinds[resource.kind]}</span><span>{codeTypeLabels[resource.codeType]}</span></div>
        <h3>{resource.title}</h3>
        <p className="agent-code-summary">{resource.summary}</p>
        <p className="agent-code-publisher">{resource.publisher} · {resource.official ? 'Publisher-maintained' : 'Community project'}</p>
        <div className="agent-code-clients" aria-label="Documented coding-agent integrations">{resource.agents.map(id => <span key={id}>{agentLabels[id]}</span>)}</div>
        <p className="agent-code-engine">{resource.engine}</p>
        <div className="agent-code-links"><a href={resource.codeUrl} target="_blank" rel="noreferrer"><Code2 size={15}/>{resource.codeType === 'instructions' ? 'Open skill / workflow files' : 'Open source code'}<ArrowUpRight size={14}/></a><a href={resource.evidenceUrl} target="_blank" rel="noreferrer">Agent integration evidence<ArrowUpRight size={14}/></a></div>
        <details><summary>Code scope & requirements</summary><p>{resource.codeScope}</p><p>{resource.limitations}</p><a href={resource.sourceUrl} target="_blank" rel="noreferrer">Project / documentation<ArrowUpRight size={13}/></a></details>
      </article>)}
    </div>
    {results.length === 0 ? <div className="case-empty"><p>No code resources match these filters.</p><button className="outline-button" onClick={reset}>Show all agent resources</button></div> : null}
    {results.length > visible.length ? <button className="outline-button agent-code-show-all" onClick={() => setExpanded(true)}>Show all {results.length} matching resources<ArrowDown size={15}/></button> : null}
    <p className="agent-code-note">Agent names follow documented client integrations. Gemini CLI is labeled separately from Gemini model / AI Studio use in the game cases below. Source review does not imply installation or a successful local run. Shared tools can appear under several agents.</p>
    <a className="text-link" href={publicAsset('agent-interface-evidence.md')} target="_blank" rel="noreferrer">Read source-pinned interface limits<ArrowUpRight size={14}/></a>
    <a className="text-link" href={publicAsset('coding-agent-game-code.md')} target="_blank" rel="noreferrer">Open the complete agent-to-code guide<ArrowUpRight size={14}/></a>
  </section>;
}
