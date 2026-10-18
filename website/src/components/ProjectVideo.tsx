import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Film, Play, VolumeX, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { projectMedia } from '../data/projectMedia';
import { projectVideos, type ProjectVideoData } from '../data/projectVideos';

const stopPreviews = () => window.dispatchEvent(new Event('gamemap:stop-previews'));

/** Accessible click-to-play surface. Remote video sources attach only on intent. */
export default function ProjectVideo({id,name,className='',children,onDetails,inline=false,data:overrideData,poster,posterAlt,previewAspectRatio}:{id:string;name:string;className?:string;children?:ReactNode;onDetails?:()=>void;inline?:boolean;data?:ProjectVideoData;poster?:string;posterAlt?:string;previewAspectRatio?:number}) {
  const data=overrideData??projectVideos[id];
  const media=projectMedia[id];
  const posterSrc=poster??media.src;
  const alt=posterAlt??media.alt;
  const canHoverPreview=data.previewSrc.includes('/media/showcase/');
  const previewRef=useRef<HTMLVideoElement>(null);
  const surfaceRef=useRef<HTMLButtonElement>(null);
  const wantsPreview=useRef(false);
  const previousPreviewSrc=useRef(data.previewSrc);
  const [primedSrc,setPrimedSrc]=useState<string|null>(null);
  // A responsive source must receive its own hover intent before being attached.
  const primed=primedSrc===data.previewSrc;
  const [previewing,setPreviewing]=useState(false);
  const [previewFailed,setPreviewFailed]=useState(false);
  const [open,setOpen]=useState(false);

  const stop=()=>{const wasActive=wantsPreview.current;wantsPreview.current=false;previewRef.current?.pause();setPreviewing(false);if(wasActive)window.dispatchEvent(new CustomEvent('gamemap:media-preview',{detail:false}));};
  const start=()=>{
    const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
    if(previewFailed||!canHoverPreview||connection?.saveData||!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    stopPreviews();wantsPreview.current=true;setPrimedSrc(data.previewSrc);
    window.dispatchEvent(new CustomEvent('gamemap:media-preview',{detail:true}));
    if(primed&&previewRef.current)void previewRef.current.play().catch(error=>{if(error.name!=='AbortError')stop();});
  };
  useEffect(()=>{
    if(previousPreviewSrc.current===data.previewSrc)return;
    previousPreviewSrc.current=data.previewSrc;
    stop();
    setPrimedSrc(null);
    setPreviewFailed(false);
  },[data.previewSrc]);
  useEffect(()=>{
    const video=previewRef.current;
    if(primed&&wantsPreview.current&&video)void video.play().catch(error=>{if(error.name!=='AbortError')stop();});
  },[primed]);
  useEffect(()=>{
    const onVisibility=()=>{if(document.hidden)stop();};
    window.addEventListener('gamemap:stop-previews',stop);
    document.addEventListener('visibilitychange',onVisibility);
    const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();});
    if(surfaceRef.current)observer.observe(surfaceRef.current);
    const video=previewRef.current;
    return()=>{observer.disconnect();video?.pause();if(wantsPreview.current){wantsPreview.current=false;window.dispatchEvent(new CustomEvent('gamemap:media-preview',{detail:false}));}window.removeEventListener('gamemap:stop-previews',stop);document.removeEventListener('visibilitychange',onVisibility);};
  },[open]);

  if(open&&inline)return <InlineVideo key={id} data={data} poster={posterSrc} onClose={()=>{setOpen(false);requestAnimationFrame(()=>surfaceRef.current?.focus());}}/>;
  return <>
    <button ref={surfaceRef} className={`demo-surface ${className} ${previewing?'is-previewing':''}`} style={previewAspectRatio ? { aspectRatio: previewAspectRatio } : undefined} data-demo={id} aria-label={`Play the official ${name} demo`} onPointerEnter={start} onPointerLeave={stop} onBlur={stop} onClick={()=>{stopPreviews();setOpen(true);}}>
      <img className="demo-poster" src={posterSrc} alt={alt} loading="lazy" decoding="async"/>
      <video ref={previewRef} className="demo-hover-video" src={primed?data.previewSrc:undefined} preload="none" muted loop playsInline aria-hidden="true" tabIndex={-1} onPlaying={()=>{if(wantsPreview.current)setPreviewing(true);else previewRef.current?.pause();}} onError={()=>{stop();setPreviewFailed(true);}}/>
      <span className="demo-video-badge"><Film size={12}/>OFFICIAL DEMO</span>
      <span className="demo-play-icon"><Play size={21} fill="currentColor"/></span>
      <span className="demo-hover-hint"><VolumeX size={12}/>{canHoverPreview?<span className="hover-copy">Hover to preview · </span>:null}Click to play</span>
      {previewing?<span className="demo-live-indicator"><i/>PREVIEWING</span>:null}
      {children}
    </button>
    {open?createPortal(<DemoPlayer data={data} poster={posterSrc} onClose={()=>setOpen(false)} onDetails={onDetails?()=>{setOpen(false);onDetails();}:undefined}/>,document.body):null}
  </>;
}

function VideoElement({data,poster}:{data:ProjectVideoData;poster:string}) {
  const videoRef=useRef<HTMLVideoElement>(null);
  const [failed,setFailed]=useState(false);
  const [playing,setPlaying]=useState(false);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{const video=videoRef.current;void video?.play().catch(()=>{setPlaying(false);setLoading(false);});const hide=()=>{if(document.hidden)video?.pause();};document.addEventListener('visibilitychange',hide);return()=>{video?.pause();document.removeEventListener('visibilitychange',hide);};},[]);
  return <div className="demo-player-screen">
    {failed?<div className="demo-video-error" role="status"><Film size={30}/><p>This video is currently unavailable.</p><a href={data.source} target="_blank" rel="noreferrer">Watch on the project website<ArrowUpRight size={15}/></a></div>:<video ref={videoRef} src={data.src} poster={poster} controls autoPlay muted playsInline preload="none" tabIndex={0} aria-label={data.title} onWaiting={()=>setLoading(true)} onCanPlay={()=>setLoading(false)} onPlaying={()=>{setPlaying(true);setLoading(false);}} onPause={()=>{setPlaying(false);setLoading(false);}} onError={()=>setFailed(true)}/>}
    {!failed?<span className="demo-playback-state" role="status">{loading?'Loading official video…':playing?'NOW PLAYING':'Paused · Select play to continue'}<span> · Muted by default. Enable sound in the player.</span></span>:null}
  </div>;
}

function InlineVideo({data,poster,onClose}:{data:ProjectVideoData;poster:string;onClose:()=>void}) {
  const inlineRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{inlineRef.current?.querySelector<HTMLElement>('video,button')?.focus({preventScroll:true});},[]);
  return <div className="demo-inline-player" ref={inlineRef}><VideoElement data={data} poster={poster}/><div className="demo-inline-caption"><span>{data.title}</span><button onClick={onClose} aria-label="Close video and return to poster"><X size={16}/></button></div><p className="demo-inline-description">{data.description}</p></div>;
}

export function DemoPlayer({data,poster,onClose,onDetails}:{data:ProjectVideoData;poster:string;onClose:()=>void;onDetails?:()=>void}) {
  const dialogRef=useRef<HTMLDivElement>(null);
  const closeRef=useRef(onClose);
  useEffect(()=>{closeRef.current=onClose;},[onClose]);
  useEffect(()=>{
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    window.dispatchEvent(new CustomEvent('gamemap:media-dialog',{detail:true}));
    dialogRef.current?.querySelector<HTMLButtonElement>('[data-close-demo]')?.focus();
    // Keep the underlying app out of keyboard and assistive-technology navigation.
    const root=document.getElementById('root');
    const wasInert=root?.inert??false;if(root)root.inert=true;
    const key=(event:KeyboardEvent)=>{
      if(event.key==='/'){event.stopPropagation();return;}
      if(event.key==='Escape'){event.preventDefault();closeRef.current();return;}
      if(event.key!=='Tab')return;
      const controls=Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],video[controls]')??[]).filter(el=>el.getClientRects().length>0);
      const first=controls[0],last=controls[controls.length-1];
      if(!first)return;
      if(!dialogRef.current?.contains(document.activeElement)||(event.shiftKey&&document.activeElement===first)||(!event.shiftKey&&document.activeElement===last)){event.preventDefault();(event.shiftKey?last:first).focus();}
    };
    document.addEventListener('keydown',key,true);
    return()=>{document.body.style.overflow=oldOverflow;if(root)root.inert=wasInert;document.removeEventListener('keydown',key,true);window.dispatchEvent(new CustomEvent('gamemap:media-dialog',{detail:false}));if(previous?.isConnected)previous.focus({preventScroll:true});};
  },[]);
  return <div className="demo-player-overlay" onClick={onClose}><div ref={dialogRef} className="demo-player-dialog" role="dialog" aria-modal="true" aria-labelledby="demo-player-title" aria-describedby="demo-player-description" onClick={e=>e.stopPropagation()}>
    <div className="demo-player-toolbar"><span><Film size={15}/>THE DEMO ROOM<span> / OFFICIAL PROJECT VIDEO</span></span><button data-close-demo className="icon-button" aria-label="Close video" onClick={onClose}><X size={23}/></button></div>
    <VideoElement data={data} poster={poster}/>
    <div className="demo-player-info"><div><h2 id="demo-player-title">{data.title}</h2><p id="demo-player-description">{data.description}</p><a className="demo-source" href={data.source} target="_blank" rel="noreferrer">{data.credit}<ArrowUpRight size={13}/></a></div>{onDetails?<button className="outline-button" onClick={onDetails}>Explore project<ArrowUpRight size={16}/></button>:null}</div>
  </div></div>;
}
