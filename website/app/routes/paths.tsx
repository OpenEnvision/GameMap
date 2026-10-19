import { Link, useLoaderData } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { content } from '../../content/registry.server';
import { ContentCard } from '../components/content';
export function loader() { return { paths:content.all('path'), steps:content.all('step'), notes:['practical-guide','production-work-orders','world-model-notes'].map(id=>content.require('document',id)) }; }
export default function Paths() {
  const { paths, steps:allSteps, notes } = useLoaderData<typeof loader>();
  return <main id="main-content" className="site-main listing-page"><title>Development paths — GameMap</title><meta name="description" content="Game-development tracks with concrete deliverables and acceptance checkpoints for every step." />
    <header className="page-heading"><span className="eyebrow">MAKE THE NEXT STEP SMALL</span><h1>A path, not a pile of tools.</h1><p>Choose a track. Every step keeps its purpose, deliverable, and acceptance checkpoint together.</p></header>
    <div className="path-grid">{paths.map(path=>{const steps=allSteps.filter(step=>step.data.track===path.id),art=path.blocks.find(block=>block.type==='image');return <article className="path-card" data-content-ref={path.key} key={path.key}>{art?.type==='image'&&<img src={art.src} alt={art.alt} loading="lazy"/>}<div><span className="small-label">{steps.length} STEPS · DELIVERABLES & CHECKPOINTS</span><h2><Link to={path.url}>{path.title}<ArrowRight size={17}/></Link></h2><p>{path.description}</p><ol>{steps.map(step=><li key={step.key} data-content-ref={step.key}><Link to={step.url}>{step.title}</Link></li>)}</ol><Link className="inline-link" to={path.url}>Follow this path<ArrowRight size={15}/></Link></div></article>})}</div>
    <section className="related-content"><h2>Keep some context nearby.</h2><div className="content-grid">{notes.map(entry=><ContentCard key={entry.key} entry={entry}/>)}</div></section>
  </main>;
}
