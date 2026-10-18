import { publicAsset } from '../publicAsset';
import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Bookmark, Download, LayoutGrid, List, Search, SearchX, SlidersHorizontal, X } from 'lucide-react';
import { categories, stageLabels, typeLabels, type Dimension, type Resource, type Stage } from '../types';
import { projectMedia } from '../data/projectMedia';
import { getResourceIdentity } from '../data/resourceIdentities';
import ProjectGallery from './ProjectGallery';
import ResourceIcon, { ResourceAttribution } from './ResourceIcon';
import ProjectVideo from './ProjectVideo';
import { projectVideos } from '../data/projectVideos';

export interface Filters { query:string; category:string; type:string; stage:string; dimension:string; sort:string; }
export const cleanFilters:Filters={query:'',category:'all',type:'all',stage:'all',dimension:'all',sort:'curated'};
interface Props { resources:Resource[]; filters:Filters; setFilters:(filters:Filters)=>void; saved:string[]; toggleSave:(id:string)=>void; openResource:(r:Resource)=>void; savedOnly:boolean; }
const categoryById = new Map(categories.map(category => [category.id, category]));
const defaultPreviews = ['opengame', 'solarrenderer', 'streamrender-h3'];

export function filterResources(resources:Resource[], filters:Filters, saved?:string[]) {
  const terms=filters.query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const savedIds=saved ? new Set(saved) : undefined;
  const result=resources.filter(resource =>
    (!savedIds || savedIds.has(resource.id)) &&
    (filters.category==='all' || resource.category===filters.category) &&
    (filters.type==='all' || resource.type===filters.type) &&
    (filters.stage==='all' || resource.stages.includes(filters.stage as Stage)) &&
    (filters.dimension==='all' || resource.dimensions.includes(filters.dimension as Dimension)) &&
    terms.every(term => [resource.name, resource.summary, resource.detail, getResourceIdentity(resource.id).organization, ...resource.tags].join(' ').toLocaleLowerCase().includes(term)),
  );
  return filters.sort==='name' ? result.sort((a,b)=>a.name.localeCompare(b.name,'en'))
    : filters.sort==='year' ? result.sort((a,b)=>(b.year||0)-(a.year||0)) : result;
}

function exportCollection(resources:Resource[]) {
  const text='# My GameMap Collection\n\n'+resources.map(resource=>`- [${resource.name}](${resource.url}) — ${resource.summary}`).join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));
  const anchor=document.createElement('a');
  anchor.href=url; anchor.download='gamemap-collection.md'; anchor.click();
  URL.revokeObjectURL(url);
}

function BookmarkButton({resource,saved,toggleSave}:{resource:Resource;saved:boolean;toggleSave:(id:string)=>void}) {
  return <button className={`icon-button bookmark ${saved?'is-saved':''}`} aria-label={saved?`Remove ${resource.name} from collection`:`Save ${resource.name} to collection`} aria-pressed={saved} onClick={()=>toggleSave(resource.id)}><Bookmark size={18} fill={saved?'currentColor':'none'}/></button>;
}

function ResourceCard({resource,saved,toggleSave,openResource}:{resource:Resource;saved:boolean;toggleSave:(id:string)=>void;openResource:(resource:Resource)=>void}) {
  const media=projectMedia[resource.id];
  const [failedMedia,setFailedMedia]=useState<string>();
  const hasPreview=media && failedMedia!==media.src;
  const category=categoryById.get(resource.category)!;
  return <article className={`resource-card category-${resource.category} ${hasPreview?'has-project-preview':'has-resource-identity'}`}>
    {hasPreview&&projectVideos[resource.id]?<ProjectVideo id={resource.id} name={resource.name} className="resource-card-preview has-preview" onDetails={()=>openResource(resource)}/>:<button className={`resource-card-preview ${hasPreview?'has-preview':'is-icon-preview'}`} aria-label={`View details for ${resource.name}`} onClick={()=>openResource(resource)}>
      {hasPreview?<img className="resource-card-cover" src={media.src} alt={media.alt} loading="lazy" decoding="async" onError={()=>setFailedMedia(media.src)}/>:<span className="resource-card-icon"><ResourceIcon resource={resource} size={44}/><span>{typeLabels[resource.type]}</span></span>}
      <span className="resource-card-preview-label">{hasPreview?'AUTHOR PREVIEW':category.label}<ArrowUpRight size={18}/></span>
    </button>}
    <div className="resource-card-body">
      <div className="resource-card-identity">{hasPreview?<ResourceIcon resource={resource} size={34}/>:null}<button className="resource-card-title" onClick={()=>openResource(resource)}><h2>{resource.name}</h2></button></div>
      <ResourceAttribution resource={resource}/><div className="resource-card-meta"><span className="type-label">{typeLabels[resource.type]}</span>{resource.year?<span>{resource.year}</span>:null}<span>{category.label}</span></div>
      <p className="resource-summary">{resource.summary}</p>
      <div className="resource-card-topics">{resource.tags.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div>
      {hasPreview?<a className="resource-card-credit" href={media.source} target="_blank" rel="noreferrer">{media.credit}<ArrowUpRight size={12}/></a>:null}
    </div>
    <div className="resource-card-footer"><span className="resource-stage">{stageLabels[resource.stages[0]]}</span><div className="resource-card-actions"><BookmarkButton resource={resource} saved={saved} toggleSave={toggleSave}/><button className="icon-button detail-arrow" aria-label={`View details for ${resource.name}`} onClick={()=>openResource(resource)}><ArrowUpRight size={18}/></button></div></div>
  </article>;
}

export default function ResourceLibrary({resources,filters,setFilters,saved,toggleSave,openResource,savedOnly}:Props) {
  const [layout,setLayout]=useState<'list'|'grid'>('list');
  const update=(key:keyof Filters,value:string)=>setFilters({...filters,[key]:value});
  const results=filterResources(resources,filters,savedOnly?saved:undefined);
  const savedIds=new Set(saved);
  const baseResources=savedOnly?resources.filter(resource=>savedIds.has(resource.id)):resources;
  const activeCount=['category','type','stage','dimension'].filter(key=>filters[key as keyof Filters]!=='all').length+(filters.query.trim()?1:0);
  const categoryPreviews=resources.filter(resource=>resource.category===filters.category&&projectMedia[resource.id]).map(resource=>resource.id).slice(0,3);
  const galleryIds=categoryPreviews.length?categoryPreviews:defaultPreviews;
  const reset=()=>setFilters({...cleanFilters});

  return <div className="library-view page-enter">
    <section className="library-intro"><div><h1>{savedOnly?<>Your creative <em>toolkit.</em></>:<>The building <em>blocks.</em></>}</h1><p>{savedOnly?'Keep the tools, papers, and code you want to return to.':'Find your next step in tools, papers, and code from primary sources.'}</p></div>{savedOnly?<button className="outline-button export-button" disabled={!baseResources.length} onClick={()=>exportCollection(baseResources)}><Download size={16}/>Export collection</button>:<span className="library-edition">{resources.length} RESOURCES<br/>SIX CONNECTED FIELDS</span>}</section>

    {!savedOnly&&!filters.query.trim()&&(filters.category==='all'||categoryPreviews.length>0)?<ProjectGallery resources={resources} openResource={openResource} ids={galleryIds} title={filters.category==='all'?'From the research frontier.':'See what is possible.'} compact/>:null}

    <div className="library-browse-tools"><div className="search-row"><label className="search-box"><Search size={20}/><input id="resource-search" aria-label="Search resources" placeholder="Search resources…" value={filters.query} onChange={event=>update('query',event.target.value)}/>{filters.query?<button className="icon-button" aria-label="Clear search" onClick={()=>update('query','')}><X size={16}/></button>:<kbd>/</kbd>}</label></div><div className="resource-view-toggle" role="group" aria-label="Resource display"><button className={layout==='list'?'selected':''} aria-label="List view" aria-pressed={layout==='list'} onClick={()=>setLayout('list')}><List size={20}/></button><button className={layout==='grid'?'selected':''} aria-label="Grid view" aria-pressed={layout==='grid'} onClick={()=>setLayout('grid')}><LayoutGrid size={19}/></button></div></div>

    <div className="library-tabs" role="group" aria-label="Filter by category"><button className={filters.category==='all'?'selected':''} aria-pressed={filters.category==='all'} onClick={()=>update('category','all')}>All resources<span>{baseResources.length}</span></button>{categories.map(category=><button key={category.id} className={filters.category===category.id?'selected':''} aria-pressed={filters.category===category.id} onClick={()=>update('category',category.id)}>{category.label}<span>{baseResources.filter(resource=>resource.category===category.id).length}</span></button>)}</div>

    <div className="filter-bar"><span className="filter-icon"><SlidersHorizontal size={16}/></span><label><span className="sr-only">Resource type</span><select aria-label="Resource type" value={filters.type} onChange={event=>update('type',event.target.value)}><option value="all">All types</option>{Object.entries(typeLabels).map(([key,label])=><option value={key} key={key}>{label}</option>)}</select></label><label><span className="sr-only">Development stage</span><select aria-label="Development stage" value={filters.stage} onChange={event=>update('stage',event.target.value)}><option value="all">All stages</option>{Object.entries(stageLabels).map(([key,label])=><option value={key} key={key}>{label}</option>)}</select></label><label><span className="sr-only">Development track</span><select aria-label="Development track" value={filters.dimension} onChange={event=>update('dimension',event.target.value)}><option value="all">All tracks</option><option value="2d">2D games</option><option value="3d">3D games</option><option value="world">World models</option></select></label>{activeCount>0?<button className="clear-filters" onClick={reset}>Reset {activeCount}<X size={12}/></button>:null}<label className="sort-select"><span className="sr-only">Sort resources</span><select aria-label="Sort resources" value={filters.sort} onChange={event=>update('sort',event.target.value)}><option value="curated">Sort: Curated order</option><option value="name">Name A–Z</option><option value="year">Newest first</option></select></label></div>

    <div className="result-meta" role="status" aria-live="polite"><span>{results.length} {results.length===1?'resource':'resources'}{filters.query.trim()?` matching “${filters.query.trim()}”`:''}</span><span>PRIMARY SOURCES · CHECKED OCT 18, 2026<ArrowDown size={12}/></span></div>

    {results.length>0&&layout==='list'?<><div className="resource-list-head" aria-hidden="true"><span>RESOURCE</span><span>CATEGORY</span><span>TYPE</span><span>STAGE</span><span/><span/></div><div className="resource-list">{results.map(resource=>{const category=categoryById.get(resource.category)!;return <article className="resource-row" key={resource.id}><button className="resource-main" onClick={()=>openResource(resource)}><ResourceIcon resource={resource}/><span className="resource-copy"><strong>{resource.name}{resource.year?<small className="resource-year"> {resource.year}</small>:null}</strong><ResourceAttribution resource={resource}/><span className="resource-summary">{resource.summary}</span><span className="resource-tags">{resource.tags.slice(0,3).join(' / ')}</span></span></button><span className={`row-category category-${resource.category}`}>{category.label}</span><span className="type-label">{typeLabels[resource.type]}</span><span className={`resource-stage stage-${resource.stages[0]}`}>{stageLabels[resource.stages[0]]}</span><BookmarkButton resource={resource} saved={savedIds.has(resource.id)} toggleSave={toggleSave}/><button className="icon-button detail-arrow" aria-label={`View details for ${resource.name}`} onClick={()=>openResource(resource)}><ArrowUpRight size={18}/></button></article>;})}</div></>:null}

    {results.length>0&&layout==='grid'?<div className="resource-grid">{results.map(resource=><ResourceCard key={resource.id} resource={resource} saved={savedIds.has(resource.id)} toggleSave={toggleSave} openResource={openResource}/>)}</div>:null}

    {results.length===0?<div className="empty-state">{savedOnly&&!saved.length?<Bookmark size={38} strokeWidth={1}/>:<SearchX size={38} strokeWidth={1}/>}<h2>{savedOnly&&!saved.length?'Your next world starts here.':'No matching resources.'}</h2><p>{savedOnly&&!saved.length?'Save a resource with its bookmark button to start your collection.':'Try a shorter search or reset your filters to explore again.'}</p>{savedOnly&&!saved.length?<a className="lime-button" href="?view=library">Explore the library<ArrowUpRight size={16}/></a>:<button className="lime-button" onClick={reset}>Reset filters<ArrowUpRight size={16}/></button>}</div>:null}
    <div className="library-footnote"><span>Sources checked; inclusion does not imply a full reproduction.</span><a href={publicAsset('logo-sources.md')} target="_blank" rel="noreferrer">Logo credits<ArrowUpRight size={14}/></a><a href={publicAsset('research-index.md')} target="_blank" rel="noreferrer">Production research dossiers<ArrowUpRight size={14}/></a><a href={publicAsset('awesome-list.md')} target="_blank" rel="noreferrer">Read the full awesome list<ArrowUpRight size={14}/></a></div>
  </div>;
}
