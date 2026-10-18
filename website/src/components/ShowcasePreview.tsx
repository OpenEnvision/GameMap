import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Maximize2, Pause, Play, RotateCw, VolumeX } from 'lucide-react';
import type { ShowcaseCase } from '../data/showcase';
import { useNarrowScreen } from '../useNarrowScreen';

const timeLabel = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
interface Props { demo: ShowcaseCase; paused: boolean; setPaused: (value: boolean) => void; suspended: boolean; onExpand: () => void; }

/** Only the selected official excerpt is attached, and only while playback is wanted. */
export default function ShowcasePreview({ demo, paused, setPaused, suspended, onExpand }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const wantsPlayback = useRef(false);
  const sequence = useRef(0);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(!document.hidden);
  const [primed, setPrimed] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const narrow = useNarrowScreen();
  const variant = narrow ? demo.mobilePreview : undefined;
  const previewSrc = variant?.src ?? demo.video.previewSrc;
  const posterSrc = variant?.poster ?? demo.poster;
  const aspectRatio = variant?.aspectRatio ?? demo.aspectRatio;

  useEffect(() => { setHasFrame(false); setDuration(0); setCurrentTime(0); setFailed(false); setBlocked(false); }, [previewSrc]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => setInView(entries[0].isIntersecting), { threshold: 0.15 });
    if (hostRef.current) observer.observe(hostRef.current);
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const request = ++sequence.current;
    const active = !paused && !suspended && inView && visible && !failed;
    wantsPlayback.current = active;
    if (active) {
      if (!primed) setPrimed(true);
      else {
        video.muted = true;
        void video.play().catch(error => {
          if (request === sequence.current && wantsPlayback.current && error.name !== 'AbortError') { setBlocked(true); setPlaying(false); }
        });
      }
    } else video.pause();
    return () => { wantsPlayback.current = false; sequence.current++; video.pause(); };
  }, [paused, suspended, inView, visible, primed, failed, attempt, previewSrc]);

  const toggle = () => {
    if (!paused && !blocked && !failed) { setPaused(true); return; }
    setPaused(false);
    setBlocked(false);
    if (failed) { setFailed(false); videoRef.current?.load(); }
    setAttempt(value => value + 1);
  };
  const isPaused = paused || blocked || failed;
  const status = failed ? 'Preview unavailable' : blocked ? 'Select play to begin' : paused ? 'Preview paused' : suspended || !inView || !visible ? 'Preview paused' : playing ? 'Official demo excerpt' : 'Loading preview…';

  return <div className="showcase-preview" ref={hostRef}>
    <div className={`showcase-screen ${hasFrame ? 'has-frame' : ''} ${demo.prompt ? 'has-prompt' : ''}`} style={aspectRatio?{aspectRatio}:undefined}>
      {demo.prompt?<div className="showcase-prompt"><span>Text prompt</span><p>“{demo.prompt}”</p><ArrowRight size={25}/><small>Generated 3D scene</small></div>:null}
      <div className="showcase-picture"><img src={posterSrc} alt={demo.alt} fetchPriority="high"/>
      <video ref={videoRef} data-showcase-video={demo.id} src={primed ? previewSrc : undefined} preload="none" muted loop playsInline aria-hidden="true" tabIndex={-1}
        onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
        onPlaying={() => { if (wantsPlayback.current) { setHasFrame(true); setPlaying(true); setBlocked(false); } else videoRef.current?.pause(); }}
        onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); setHasFrame(false); }}/>
      {blocked || failed || (!primed && paused) ? <button className="showcase-start" onClick={toggle} aria-label={failed ? 'Retry demo preview' : 'Start video preview'}>{failed ? <RotateCw size={24}/> : <Play size={26} fill="currentColor"/>}</button> : null}
      </div>
    </div>
    <div className="showcase-playback">
      <button className="showcase-play-toggle" onClick={toggle} aria-label={isPaused ? 'Play demo preview' : 'Pause demo preview'}>{isPaused ? <Play size={16} fill="currentColor"/> : <Pause size={17}/>}</button>
      <span className="showcase-time">{timeLabel(currentTime)}<span> / {duration ? timeLabel(duration) : '—:—'}</span></span>
      <input type="range" className="showcase-seek" aria-label="Preview position" min="0" max={duration || 1} step="0.05" value={Math.min(currentTime, duration || 1)} style={{backgroundImage:`linear-gradient(90deg,#ff754e ${duration?currentTime/duration*100:0}%,#45484a ${duration?currentTime/duration*100:0}%)`}} disabled={!duration || failed} onChange={event => { const value = Number(event.target.value); if (videoRef.current) videoRef.current.currentTime = value; setCurrentTime(value); }}/>
      <VolumeX className="showcase-muted" size={16} aria-label="Preview is muted"/>
      <button className="showcase-expand" aria-label="Open full demo" onClick={onExpand}><Maximize2 size={17}/></button>
    </div>
    <span className="sr-only" role="status">{status}</span>
  </div>;
}
