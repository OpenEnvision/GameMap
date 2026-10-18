import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { publicAsset } from '../publicAsset';
import type { LearningMedia } from '../data/learningMedia';

interface Props { media: LearningMedia; title: string; eager?: boolean; demo: {url:string;kind:'playable'|'download'}; }

/** Screenshot provenance stays visible; the native dialog manages keyboard focus. */
export default function LearningPreview({ media, title, eager = false, demo }: Props) {
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const captionId = useId();
  const src = publicAsset(media.src);
  const creatorScreenshot = media.origin === 'creator-screenshot';
  const localCapture = media.origin === 'local-capture';
  const date = creatorScreenshot ? media.reviewedAt : media.capturedAt;
  const demoLabel = demo.kind === 'playable' ? 'Play this game' : 'Open game project';

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = previousOverflow; };
  }, [expanded]);

  const close = () => dialogRef.current?.close();
  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
    if (!controls.length) return;
    event.preventDefault();
    const index = controls.indexOf(document.activeElement as HTMLElement);
    const next = index < 0 ? (event.shiftKey ? controls.length - 1 : 0) : (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
    controls[next].focus({ preventScroll: true });
  };

  return <>
    <figure className="learning-preview">
      <button ref={triggerRef} type="button" className="learning-preview-open" aria-label={`Enlarge real gameplay screenshot of ${title}`} aria-haspopup="dialog" onClick={() => setExpanded(true)}>
        <img src={src} alt={media.alt} width={media.width} height={media.height} loading={eager ? 'eager' : 'lazy'} decoding="async"/>
        <span className="learning-preview-badge"><ImageIcon size={12}/>{creatorScreenshot?'Creator screenshot':localCapture?'Local gameplay':'Actual gameplay'}</span>
        <span className="learning-preview-expand"><Maximize2 size={16}/><span>View screenshot</span></span>
      </button>
      <figcaption><p>{media.caption}{creatorScreenshot?<a href={media.sourceUrl} target="_blank" rel="noreferrer">Screenshot source<ArrowUpRight size={11}/></a>:null}</p><a href={demo.url} target="_blank" rel="noreferrer" aria-label={`Open the game shown in the ${title} screenshot`}>{demoLabel}<ArrowUpRight size={12}/></a></figcaption>
    </figure>
    <dialog ref={dialogRef} className="learning-preview-dialog" aria-labelledby={titleId} aria-describedby={captionId} onKeyDown={trapFocus} onClick={event => { if (event.target === event.currentTarget) close(); }} onClose={() => { setExpanded(false); triggerRef.current?.focus({ preventScroll: true }); }}>
      <div className="learning-preview-modal">
        <div className="learning-preview-modal-heading"><div><span className="micro-label">{creatorScreenshot?'CREATOR-PUBLISHED GAMEPLAY':'ACTUAL GAMEPLAY SCREENSHOT'}</span><h2 id={titleId}>{title}</h2></div><button ref={closeRef} type="button" className="learning-preview-close" aria-label="Close screenshot" onClick={close}><X size={21}/></button></div>
        {expanded ? <img className="learning-preview-full" src={src} alt={media.alt} width={media.width} height={media.height}/> : null}
        <div className="learning-preview-modal-caption"><p id={captionId}>{media.caption}<span>{creatorScreenshot?<a href={media.sourceUrl} target="_blank" rel="noreferrer">Creator screenshot · source reviewed</a>:localCapture?'Captured from the local project':'Captured from the playable build'}{date?<> · <time dateTime={date}>{new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(date))}</time></>:null}</span></p><a href={demo.url} target="_blank" rel="noreferrer">{demoLabel}<ArrowUpRight size={15}/></a></div>
      </div>
    </dialog>
  </>;
}
