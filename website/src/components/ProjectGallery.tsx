import { useState } from 'react';
import { ArrowUpRight, Film, Images } from 'lucide-react';
import type { Resource } from '../types';
import { projectMedia } from '../data/projectMedia';
import { demoIds, projectVideos } from '../data/projectVideos';
import ProjectVideo from './ProjectVideo';

const tracks=[['all','All demos'],['2d','2D games'],['3d','3D worlds'],['world','Code WM']] as const;
export default function ProjectGallery({resources,openResource,compact=false,ids=demoIds,title='Worlds in motion.'}:{resources:Resource[];openResource:(r:Resource)=>void;compact?:boolean;ids?:string[];title?:string}) {
  const [track,setTrack]=useState('all');
  const selected=ids.map(id=>resources.find(r=>r.id===id)).filter((r):r is Resource=>!!r&&!!projectMedia[r.id]);
  const visible=(compact?selected:selected.filter(r=>track==='all'||projectVideos[r.id]?.track===track)).slice(0,compact?3:6);
  if(!selected.length)return null;
  return <section className={`project-gallery ${compact?'compact':'video-gallery'}`} aria-label="Project demonstrations">
    <div className="section-heading"><div><h2>{title}</h2>{!compact?<p className="demo-section-description">Explore footage published by the project teams. Hover to preview or select a demo to watch.</p>:null}</div><span className="section-aside"><Film size={14}/>Official project films</span></div>
    {!compact?<div className="demo-gallery-toolbar"><div className="demo-track-filters" role="group" aria-label="Filter demos by track">{tracks.map(([key,label])=><button key={key} aria-pressed={track===key} className={track===key?'selected':''} onClick={()=>setTrack(key)}>{label}<span>{key==='all'?selected.length:selected.filter(r=>projectVideos[r.id]?.track===key).length}</span></button>)}</div><span><Images size={13}/>Hover for a closer look</span></div>:null}
    <div className="project-strip">{visible.map(r=>{
      const media=projectMedia[r.id],video=projectVideos[r.id];
      return video?<article className="project-demo-card" key={r.id} data-resource={r.id}><ProjectVideo id={r.id} name={r.name} className="project-preview" onDetails={()=>openResource(r)}/><div className="project-demo-copy"><span className="demo-track-label">{video.track==='world'?'CODE WORLD MODELS':video.track==='2d'?'2D GAMEPLAY':'3D GENERATION'}</span><button className="project-demo-title" onClick={()=>openResource(r)}><strong>{r.name}</strong><ArrowUpRight size={17}/></button><p>{video.description}</p></div></article>:<button className={`project-preview ${['streamrender-h3','holodeck'].includes(r.id)?'is-comparison':''}`} data-resource={r.id} key={r.id} onClick={()=>openResource(r)}><img src={media.src} alt={media.alt} loading="lazy" decoding="async"/><span className="preview-arrow"><ArrowUpRight size={20}/></span><span className="preview-copy"><span className="preview-kicker">PROJECT PREVIEW</span><strong>{r.name}</strong><span>{r.summary}</span></span></button>;
    })}</div>
  </section>;
}
