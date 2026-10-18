import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bookmark, Check, Link2, X } from 'lucide-react';
import { categories, stageLabels, typeLabels, type Resource } from '../types';
import { projectMedia } from '../data/projectMedia';
import ResourceIcon, { ResourceAttribution } from './ResourceIcon';
import ProjectVideo from './ProjectVideo';
import ResourceAccess from './ResourceAccess';
import { projectVideos } from '../data/projectVideos';

interface Props { resource:Resource; saved:boolean; toggleSave:(id:string)=>void; onClose:()=>void; }
type CopyStatus='idle'|'copied'|'error';

export default function ResourceDrawer({resource,saved,toggleSave,onClose}:Props) {
  const dialogRef=useRef<HTMLDivElement>(null);
  const onCloseRef=useRef(onClose);
  const [copyState,setCopyState]=useState<{id:string;status:CopyStatus}>({id:'',status:'idle'});
  const [failedMedia,setFailedMedia]=useState<string>();
  const copyStatus=copyState.id===resource.id?copyState.status:'idle';
  const category=categories.find(item=>item.id===resource.category)!;
  const media=projectMedia[resource.id];
  const hasPreview=media&&failedMedia!==media.src;

  useEffect(()=>{onCloseRef.current=onClose;},[onClose]);
  useEffect(()=>{
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('[data-dialog-close]')?.focus({preventScroll:true});
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();onCloseRef.current();return;}
      if(event.key!=='Tab')return;
      const dialog=dialogRef.current;
      if(!dialog)return;
      const controls=Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])')).filter(element=>element.getClientRects().length>0);
      if(!controls.length){event.preventDefault();dialog.focus();return;}
      const first=controls[0],last=controls[controls.length-1];
      const outside=!dialog.contains(document.activeElement);
      if(outside||(event.shiftKey&&document.activeElement===first)||(!event.shiftKey&&document.activeElement===last)){
        event.preventDefault();(event.shiftKey?last:first).focus();
      }
    };
    document.addEventListener('keydown',onKeyDown,true);
    return()=>{
      document.body.style.overflow=oldOverflow;
      document.removeEventListener('keydown',onKeyDown,true);
      if(previous?.isConnected)previous.focus({preventScroll:true});
      else (document.querySelector<HTMLInputElement>('#resource-search')||document.querySelector<HTMLElement>('#main-content'))?.focus({preventScroll:true});
    };
  },[]);

  const copyLink=async()=>{
    const url=new URL(location.href);
    url.hash=`resource/${encodeURIComponent(resource.id)}`;
    try{await navigator.clipboard.writeText(url.toString());setCopyState({id:resource.id,status:'copied'});}
    catch{setCopyState({id:resource.id,status:'error'});}
  };

  return <div className="drawer-overlay" onClick={onClose}>
    <div className={`resource-drawer category-${resource.category}`} role="dialog" aria-modal="true" aria-labelledby="drawer-title" aria-describedby="drawer-summary" tabIndex={-1} ref={dialogRef} onClick={event=>event.stopPropagation()}>
      <div className="drawer-toolbar"><span>{category.label}</span><button className="icon-button" data-dialog-close aria-label="Close resource details" onClick={onClose}><X size={21}/></button></div>
      {hasPreview?<figure className="drawer-preview">{projectVideos[resource.id]?<ProjectVideo key={resource.id} id={resource.id} name={resource.name} inline/>:<img src={media.src} alt={media.alt} loading="lazy" decoding="async" onError={()=>setFailedMedia(media.src)}/>}<figcaption><a className="drawer-preview-credit" href={projectVideos[resource.id]?.source??media.source} target="_blank" rel="noreferrer"><span>Source: {projectVideos[resource.id]?.credit??media.credit}</span><ArrowUpRight size={14}/></a></figcaption></figure>:null}
      <div className="drawer-identity"><ResourceIcon resource={resource} size={hasPreview?64:80}/><span className="drawer-type">{typeLabels[resource.type]}{resource.year?` · ${resource.year}`:''}</span></div>
      <h2 id="drawer-title">{resource.name}</h2>
      <ResourceAttribution resource={resource} linked/>
      <p id="drawer-summary" className="drawer-summary">{resource.summary}</p>
      <div className="drawer-tags">{resource.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
      <div className="drawer-meta-grid"><div className="drawer-meta-item"><span>Category</span><strong>{category.label}</strong></div><div className="drawer-meta-item"><span>Type</span><strong>{typeLabels[resource.type]}</strong></div><div className="drawer-meta-item"><span>Tracks</span><strong>{resource.dimensions.map(dimension=>dimension==='world'?'World models':dimension.toUpperCase()).join(' / ')}</strong></div></div>
      {resource.access?<div className="drawer-section"><h3>Tutorial, demo & source</h3><ResourceAccess resource={resource}/></div>:null}
      <div className="drawer-section"><h3>Why it belongs here</h3><p>{resource.detail}</p></div>
      <div className="drawer-section"><h3>Where it fits</h3><div className="stage-chips">{resource.stages.map(stage=><span key={stage}>{stageLabels[stage]}</span>)}</div></div>
      <div className="drawer-actions"><a href={resource.url} className="dark-button drawer-source-button" target="_blank" rel="noreferrer">Open project<ArrowUpRight size={18}/></a><button className={`outline-button save-resource ${saved?'saved':''}`} aria-pressed={saved} onClick={()=>toggleSave(resource.id)}><Bookmark size={17} fill={saved?'currentColor':'none'}/>{saved?'Saved to collection':'Save to collection'}</button></div>
      {resource.links?.length?<div className="drawer-section"><h3>Go a little deeper</h3>{resource.links.map(link=><a className="source-link" href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label}<ArrowUpRight size={15}/></a>)}</div>:null}
      <div className="drawer-footer"><span>Source checked<br/>{resource.verified}</span><button className="text-link" onClick={copyLink}>{copyStatus==='copied'?<Check size={15}/>:<Link2 size={15}/>} {copyStatus==='copied'?'Link copied':'Copy link'}</button></div>
      {copyStatus!=='idle'?<p className={`drawer-copy-notice ${copyStatus==='error'?'is-error':''}`} role="status">{copyStatus==='copied'?'Resource link copied.':'Could not copy the link. Copy it from your browser address bar.'}</p>:null}
    </div>
  </div>;
}
