import { useLoaderData } from 'react-router';
import { content } from '../../content/registry.server';
import { groupRecordings } from '../../content/media';
import { RecordingCard } from '../components/content';
import { useClientQuery } from '../lib/client-query';
export function loader() { return { demos: content.all('demo') }; }
export default function Showcase() {
  const { demos: all } = useLoaderData<typeof loader>();
  const [params,setParams] = useClientQuery(); const track = params.get('track') || 'all';
  const demos = all.filter(entry => track === 'all' || entry.data.track === track), recordings = groupRecordings(demos);
  return <main id="main-content" className="site-main listing-page"><title>Project demos — GameMap</title><meta name="description" content="Original recordings with every preview, alternate rendition, and creator credit preserved." />
    <header className="page-heading"><span className="eyebrow">SEE THE SOURCE MATERIAL</span><h1>Originals, with every view intact.</h1><p>Watch project previews and explore the original source material.</p></header>
    <div className="segmented-control" aria-label="Demo track">{[['all','All recordings'],['2d','2D'],['3d','3D'],['world','World models']].map(([id,label])=><button key={id} aria-pressed={track===id} onClick={()=>setParams(id==='all'?{}:{track:id},{replace:true,preventScrollReset:true})}>{label}</button>)}</div>
    <div className="results-meta"><span>{recordings.length} recordings</span></div>
    <div className="demo-grid">{recordings.map(views=><RecordingCard key={views[0].data.recordingId} views={views} />)}</div>
    {!recordings.length&&<p className="empty-state">No recordings on this track yet.</p>}
  </main>;
}
