import { ArrowRight, ArrowUpRight, Box, Code2, Film, Gamepad2 } from 'lucide-react';
import type { Dimension, Resource } from '../types';
import { showcaseByTrack, showcaseCases } from '../data/showcase';
import ProjectVideo from './ProjectVideo';
import './showcase-gallery.css';
import { publicAsset } from '../publicAsset';
import { useNarrowScreen } from '../useNarrowScreen';

interface Props {
  resources: Resource[];
  openResource: (resource: Resource) => void;
  dimension: Dimension;
  setDimension: (dimension: Dimension) => void;
}

const tracks = [
  { id: '2d', label: '2D', Icon: Gamepad2 },
  { id: '3d', label: '3D', Icon: Box },
  { id: 'world', label: 'Code WM', Icon: Code2 },
] as const;

export default function ShowcaseGallery({ resources, openResource, dimension, setDimension }: Props) {
  const narrow = useNarrowScreen();
  const track = showcaseByTrack[dimension];
  const cases = track.cases.map(id => showcaseCases[id]).filter(Boolean);

  return (
    <section className="showcase-gallery" id="demo-showcase" aria-labelledby="showcase-gallery-heading">
      <header className="showcase-gallery-heading">
        <div>
          <h2 id="showcase-gallery-heading">Watch the ideas come to life.</h2>
          <p>See working games, generated worlds, and code in action through films published by their creators.</p>
        </div>
        <div className="showcase-gallery-tabs" role="tablist" aria-label="Demo tracks">
          {tracks.map(({ id, label, Icon }, index) => (
            <button
              key={id}
              id={`showcase-gallery-tab-${id}`}
              role="tab"
              aria-selected={dimension === id}
              aria-controls="showcase-gallery-panel"
              tabIndex={dimension === id ? 0 : -1}
              className={dimension === id ? 'showcase-gallery-tab-selected' : undefined}
              onClick={() => setDimension(id)}
              onKeyDown={event => {
                const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
                const next = event.key === 'Home' ? 0 : event.key === 'End' ? tracks.length - 1 : (index + step + tracks.length) % tracks.length;
                if (!step && event.key !== 'Home' && event.key !== 'End') return;
                event.preventDefault();
                setDimension(tracks[next].id);
                (event.currentTarget.parentElement?.children[next] as HTMLButtonElement | undefined)?.focus();
              }}
            >
              <Icon size={16} strokeWidth={1.7} />{label}
            </button>
          ))}
        </div>
      </header>

      <div
        className="showcase-gallery-panel"
        id="showcase-gallery-panel"
        role="tabpanel"
        aria-labelledby={`showcase-gallery-tab-${dimension}`}
        key={dimension}
      >
        <div className="showcase-gallery-track-intro">
          <h3>{track.label}</h3>
          <p>{track.promise}</p>
          <span><Film size={14} />{cases.length} selected films</span>
        </div>
        <div className="showcase-gallery-grid">
          {cases.map((showcase, index) => {
            const resource = resources.find(item => item.id === showcase.resourceId);
            const onDetails = resource ? () => openResource(resource) : undefined;
            const mobile = narrow ? showcase.mobilePreview : undefined;
            return (
              <article className="showcase-gallery-card" key={showcase.id} data-showcase={showcase.id}>
                <ProjectVideo
                  id={showcase.resourceId}
                  name={showcase.name}
                  data={mobile ? { ...showcase.video, previewSrc: mobile.src } : showcase.video}
                  poster={mobile?.poster ?? showcase.poster}
                  previewAspectRatio={mobile?.aspectRatio}
                  posterAlt={showcase.alt}
                  className="showcase-gallery-film"
                  onDetails={onDetails}
                />
                <div className="showcase-gallery-copy">
                  <div className="showcase-gallery-title-row">
                    <span className="showcase-gallery-number">0{index + 1}</span>
                    <h3>{showcase.name}</h3>
                  </div>
                  <p className="showcase-gallery-description">{showcase.description}</p>
                  <p className="showcase-gallery-credit">{showcase.video.credit}</p>
                  <div className="showcase-gallery-actions">
                    <a href={showcase.video.source} target="_blank" rel="noreferrer">
                      Official source<ArrowUpRight size={15} />
                    </a>
                    {onDetails ? <button onClick={onDetails}>View project<ArrowRight size={15} /></button> : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="showcase-gallery-credits"><span>Recorded project demos, credited to their creators.</span><a href={publicAsset('media-sources.md')} target="_blank" rel="noreferrer">Video credits<ArrowUpRight size={14}/></a></div>
    </section>
  );
}
