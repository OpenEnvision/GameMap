import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, FlaskConical, Search, X } from 'lucide-react';
import { testingKinds, testingResources, testingStarterPacks, testingTerms, testingUses, type TestingResource } from '../data/testingResources';
import { publicAsset } from '../publicAsset';
import './test-library.css';

const priorityIds = ['godot-demos', 'minigrid', 'kenney', 'quaternius-ual', 'crafter', '100style', 'vizdoom', 'supertux'];
const priority = new Map(priorityIds.map((id, index) => [id, index]));
const resources = testingResources.map(resource => ({
  ...resource,
  searchText: [resource.title, resource.stack, resource.summary, resource.codeLicense, resource.assetLicense, resource.aiUseNote, resource.access.note, ...resource.testTasks, ...resource.setup, ...resource.uses.map(use => testingUses[use])].join(' ').toLocaleLowerCase(),
})).sort((a, b) => (priority.get(a.id) ?? priorityIds.length) - (priority.get(b.id) ?? priorityIds.length));
const kindCounts = Object.fromEntries(Object.keys(testingKinds).map(kind => [kind, resources.filter(resource => resource.kind === kind).length]));
const useCounts = Object.fromEntries(Object.keys(testingUses).map(use => [use, resources.filter(resource => resource.uses.some(id => id === use)).length]));

function TestResourceCard({ resource }: { resource: TestingResource }) {
  return <article className="test-resource" data-test-resource={resource.id}>
    <div className="test-resource-meta"><span>{testingKinds[resource.kind]}</span><span>{resource.dimensions.map(dimension => dimension.toUpperCase()).join(' / ')}</span></div>
    <h3>{resource.title}</h3>
    <p className="test-resource-stack">{resource.stack}</p>
    <p className="test-resource-summary">{resource.summary}</p>
    <div className="test-use-tags">{resource.uses.map(use => <span key={use}>{testingUses[use]}</span>)}</div>
    <div className={`test-terms test-terms-${resource.terms}`}><span>{testingTerms[resource.terms]}</span><p>{resource.assetLicense}</p></div>
    <p className="test-access-note">{resource.access.note}</p>
    <div className="test-resource-links"><a href={resource.access.url} target="_blank" rel="noreferrer">{resource.access.label}<ArrowUpRight size={14}/></a>{resource.sourceUrl !== resource.access.url ? <a href={resource.sourceUrl} target="_blank" rel="noreferrer">{resource.kind === 'asset' || resource.kind === 'motion' ? 'Source record' : 'Project source'}<ArrowUpRight size={14}/></a> : null}</div>
    <details className="test-resource-details"><summary>Tasks, setup & license scope</summary>
      <h4>Suggested test tasks</h4><ul>{resource.testTasks.map(task => <li key={task}>{task}</li>)}</ul>
      <h4>Get started</h4><ol>{resource.setup.map(step => <li key={step}>{step}</li>)}</ol>
      <dl><div><dt>Code</dt><dd>{resource.codeLicense}</dd></div><div><dt>Assets / data</dt><dd>{resource.assetLicense}</dd></div><div><dt>AI use</dt><dd>{resource.aiUseNote}</dd></div><div><dt>Practical limits</dt><dd>{resource.limitations}</dd></div></dl>
      <div className="test-evidence-links"><a href={resource.licenseUrl} target="_blank" rel="noreferrer">License / terms<ArrowUpRight size={13}/></a>{resource.evidence.map(evidence => <a key={evidence.url} href={evidence.url} target="_blank" rel="noreferrer">{evidence.label}<ArrowUpRight size={13}/></a>)}</div>
      <p className="test-reviewed">Sources reviewed {resource.reviewed}. Suggested tasks are GameMap guidance; installation and runtime results are not certified.</p>
    </details>
  </article>;
}

export default function TestLibrary() {
  const [useCase, setUseCase] = useState('all');
  const [kind, setKind] = useState('all');
  const [dimension, setDimension] = useState('all');
  const [terms, setTerms] = useState('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const searchTerms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const results = resources.filter(resource => (useCase === 'all' || resource.uses.some(use => use === useCase)) && (kind === 'all' || resource.kind === kind) && (dimension === 'all' || resource.dimensions.some(id => id === dimension)) && (terms === 'all' || resource.terms === terms) && searchTerms.every(term => resource.searchText.includes(term)));
  const visible = expanded ? results : results.slice(0, 8);
  const filtered = useCase !== 'all' || kind !== 'all' || dimension !== 'all' || terms !== 'all' || !!query;
  const reset = () => { setUseCase('all'); setKind('all'); setDimension('all'); setTerms('all'); setQuery(''); setExpanded(false); };
  const chooseUse = (use: string) => { setUseCase(use); setExpanded(false); };

  return <div className="test-library page-enter">
    <section className="testing-intro">
      <span className="micro-label"><FlaskConical size={14}/>GAMES · AGENTS · ASSETS · MOTION</span>
      <h1>Find your next<br/><em>testbed.</em></h1>
      <p>Start from a working game, evaluate an AI player, or move a character through an animation pipeline. Compare source-reviewed projects and datasets with their setup and license scope in view.</p>
      <div className="testing-downloads"><a className="dark-button" href={publicAsset('game-testing-library.md')} target="_blank" rel="noreferrer"><Download size={15}/>Read the complete guide<ArrowUpRight size={14}/></a><a className="outline-button" href={publicAsset('testing-resources.json')} target="_blank" rel="noreferrer">JSON manifest<ArrowUpRight size={14}/></a></div>
      <div className="testing-stats"><span><strong>{resources.length}</strong>REVIEWED RESOURCES</span><span><strong>03</strong>TESTING GOALS</span><span><strong>04</strong>RESOURCE TYPES</span></div>
    </section>
    <section className="testing-goals" aria-labelledby="testing-goals-heading">
      <div className="testing-section-heading"><span className="micro-label">CHOOSE THE WORK YOU WANT TO TEST</span><h2 id="testing-goals-heading">Three ways to start.</h2><p>These are suggested test designs. Fix project versions, inputs, and success conditions before comparing results.</p></div>
      <div className="testing-goal-grid">{testingStarterPacks.map(pack => <button key={pack.use} className={`testing-goal ${useCase === pack.use ? 'selected' : ''}`} aria-pressed={useCase === pack.use} onClick={() => chooseUse(useCase === pack.use ? 'all' : pack.use)}><span className="testing-goal-label">{testingUses[pack.use]}<span>{useCounts[pack.use]}</span></span><strong>{pack.title}</strong><span className="testing-goal-resources">{pack.resources}</span><span>{pack.task}</span><small>Measure: {pack.measure}</small></button>)}</div>
    </section>
    <section id="testing-catalog" className="testing-catalog" aria-labelledby="testing-catalog-heading">
      <div className="testing-section-heading"><span className="micro-label">SOURCE, ACCESS & LICENSE SCOPE</span><h2 id="testing-catalog-heading">Build your test library.</h2></div>
      <div className="testing-kind-filters" role="group" aria-label="Filter testing resource types"><button className={kind === 'all' ? 'selected' : ''} aria-pressed={kind === 'all'} onClick={() => { setKind('all'); setExpanded(false); }}>All resources<span>{resources.length}</span></button>{Object.entries(testingKinds).map(([id, label]) => <button key={id} className={kind === id ? 'selected' : ''} aria-pressed={kind === id} onClick={() => { setKind(id); setExpanded(false); }}>{label}<span>{kindCounts[id]}</span></button>)}</div>
      <div className="testing-controls">
        <div className="testing-search"><Search size={17}/><label className="sr-only" htmlFor="testing-resource-search">Search test resources</label><input id="testing-resource-search" type="search" placeholder="Search games, engines, formats, or licenses…" value={query} onChange={event => { setQuery(event.target.value); setExpanded(false); }}/>{query ? <button type="button" aria-label="Clear test resource search" onClick={() => { setQuery(''); setExpanded(false); }}><X size={16}/></button> : null}</div>
        <label><span>Test goal</span><select aria-label="Test goal" value={useCase} onChange={event => chooseUse(event.target.value)}><option value="all">All testing goals</option>{Object.entries(testingUses).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
        <label><span>Dimension</span><select aria-label="Test resource dimension" value={dimension} onChange={event => { setDimension(event.target.value); setExpanded(false); }}><option value="all">2D & 3D</option><option value="2d">2D</option><option value="3d">3D</option></select></label>
        <label><span>License group</span><select aria-label="Test resource license group" value={terms} onChange={event => { setTerms(event.target.value); setExpanded(false); }}><option value="all">All license groups</option>{Object.entries(testingTerms).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
      </div>
      <div className="testing-results-meta"><p role="status">{results.length} of {resources.length} testing resources · showing {visible.length}</p>{filtered ? <button type="button" onClick={reset}>Reset filters<X size={13}/></button> : null}</div>
      <p className="testing-scope-note">Free access, code, assets, and AI-use terms are recorded separately. License groups summarize published terms; read each entry for its specific AI and redistribution conditions. Sources were reviewed on October 18, 2026; review does not imply installation or a successful local run. Resources can support several testing goals.</p>
      <div className="testing-resource-grid">{visible.map(resource => <TestResourceCard key={resource.id} resource={resource}/>)}</div>
      {results.length === 0 ? <div className="testing-empty"><h3>No resources match these filters.</h3><p>Try another goal, dimension, license group, or search term.</p><button type="button" className="outline-button" onClick={reset}>Show all testing resources</button></div> : null}
      {visible.length < results.length ? <button type="button" className="outline-button testing-show-all" onClick={() => setExpanded(true)}>Show all {results.length} matching resources<ArrowDown size={15}/></button> : null}
    </section>
  </div>;
}
