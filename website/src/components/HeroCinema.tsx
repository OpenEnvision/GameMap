import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { Dimension, Resource } from '../types';
import { showcaseByTrack, showcaseCases } from '../data/showcase';
import { DemoPlayer } from './ProjectVideo';
import ShowcasePreview from './ShowcasePreview';
import { useNarrowScreen } from '../useNarrowScreen';

const tracks: Dimension[] = ['2d', '3d', 'world'];
interface Props { dimension: Dimension; setDimension: (value: Dimension) => void; count: number; resources: Resource[]; openResource: (resource: Resource) => void; explore: () => void; scrollToMap: () => void; suspended: boolean; }

export default function HeroCinema({ dimension, setDimension, count, resources, openResource, explore, scrollToMap, suspended }: Props) {
  const [indices, setIndices] = useState<Record<Dimension, number>>({ '2d': 0, '3d': 0, world: 0 });
  const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion:reduce)').matches || !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const [showFilm, setShowFilm] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);
  const narrow = useNarrowScreen();
  const track = showcaseByTrack[dimension];
  const index = indices[dimension] % track.cases.length;
  const demo = showcaseCases[track.cases[index]];
  const resource = resources.find(item => item.id === demo.resourceId);

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion:reduce)');
    const reduce = () => { if (query.matches) setPaused(true); };
    const dialog = (event: Event) => setOverlayOpen((event as CustomEvent<boolean>).detail);
    const preview = (event: Event) => setPreviewActive((event as CustomEvent<boolean>).detail);
    query.addEventListener('change', reduce);
    window.addEventListener('gamemap:media-dialog', dialog);
    window.addEventListener('gamemap:media-preview', preview);
    return () => { query.removeEventListener('change', reduce); window.removeEventListener('gamemap:media-dialog', dialog); window.removeEventListener('gamemap:media-preview', preview); };
  }, []);

  const changeCase = (direction: number) => setIndices(current => ({ ...current, [dimension]: (current[dimension] + direction + track.cases.length) % track.cases.length }));
  const watch = () => { window.dispatchEvent(new Event('gamemap:stop-previews')); setShowFilm(true); };

  const trackRail = <div className="showcase-tracks" role="group" aria-label="Featured demo tracks">{tracks.map((key, trackIndex) => {
    const item = showcaseByTrack[key];
    const thumbnail = showcaseCases[item.cases[indices[key] % item.cases.length]];
    return <button key={key} className={`showcase-track ${dimension === key ? 'selected' : ''}`} aria-pressed={dimension === key} onClick={() => setDimension(key)} onKeyDown={event => {
      const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tracks.length - 1 : (trackIndex + offset + tracks.length) % tracks.length;
      if (!offset && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault(); setDimension(tracks[next]); (event.currentTarget.parentElement?.children[next] as HTMLButtonElement)?.focus();
    }}><span className="showcase-track-image"><img src={thumbnail.poster} alt="" loading="eager" decoding="async"/><Play size={16} fill="currentColor"/></span><span className="showcase-track-copy"><strong>{item.label}</strong><span>{item.promise}</span></span></button>;
  })}</div>;

  return <section className="home-showcase" aria-label="Featured project demos" data-project={demo.id}>
    <div className="home-showcase-main">
      <div className="showcase-intro">
        <h1>Build your<br/>next world.</h1>
        <p>A curated map of AI tools, game engines, and playable worlds.</p>
        <div className="showcase-intro-actions"><button className="primary-button" onClick={scrollToMap}>Explore the map<ArrowRight size={18}/></button><button className="showcase-browse" onClick={explore}>Browse {count} resources<ArrowRight size={16}/></button></div>
      </div>
      {narrow ? trackRail : null}
      <div className="showcase-stage">
        <ShowcasePreview key={demo.id} demo={demo} paused={paused} setPaused={setPaused} suspended={suspended || overlayOpen || showFilm || previewActive} onExpand={watch}/>
        <div className="showcase-caption">
          <div className="showcase-case-copy"><strong>{demo.name}</strong><p>{demo.description}</p><a href={demo.video.source} target="_blank" rel="noreferrer">Project source<ArrowUpRight size={13}/></a></div>
          <div className="showcase-case-actions"><div className="showcase-case-nav" role="group" aria-label="Choose a featured case"><button onClick={() => changeCase(-1)} aria-label="Previous demo case"><ChevronLeft size={17}/></button><span aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(track.cases.length).padStart(2, '0')}</span><button onClick={() => changeCase(1)} aria-label="Next demo case"><ChevronRight size={17}/></button></div><button className="showcase-watch" onClick={watch}><Play size={13} fill="currentColor"/>Watch full demo</button></div>
        </div>
      </div>
    </div>
    {!narrow ? trackRail : null}
    {showFilm ? createPortal(<DemoPlayer data={demo.video} poster={demo.poster} onClose={() => setShowFilm(false)} onDetails={resource ? () => { setShowFilm(false); openResource(resource); } : undefined}/>, document.body) : null}
  </section>;
}
