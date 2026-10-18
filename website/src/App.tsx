import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import resourcesJson from './data/resources.json';
import { type Category, type Dimension, type Resource, type Stage, type View } from './types';
import { Header, Sidebar } from './components/Shell';
import MapView from './components/MapView';
import ResourceLibrary, {cleanFilters, type Filters} from './components/ResourceLibrary';
import ResourceDrawer from './components/ResourceDrawer';
import FieldNotes from './components/FieldNotes';
import LearningHub from './components/LearningHub';
import BrandMark, {BrandWordmark} from './components/BrandMark';

const TestLibrary=lazy(()=>import('./components/TestLibrary'));

const resources=resourcesJson as Resource[];
const initialParams=new URLSearchParams(location.search);
const initialView=(['map','library','saved','notes','learn','test'].includes(initialParams.get('view')||'')?initialParams.get('view'):'map') as View;
const initialFilters:Filters={...cleanFilters,...Object.fromEntries(Object.keys(cleanFilters).map(k=>[k,initialParams.get(k)||cleanFilters[k as keyof Filters]]))};
const parsedNode=Number(initialParams.get('node')??2);
const initialNode=Number.isInteger(parsedNode)&&parsedNode>=0&&parsedNode<6?parsedNode:2;
function readResourceHash(){try{return location.hash.startsWith('#resource/')?decodeURIComponent(location.hash.slice(10)):'';}catch{return '';}}
function loadSaved():string[]{try{const parsed=JSON.parse(localStorage.getItem('gamemap-saved-v1')||'[]');return Array.isArray(parsed)?parsed.filter((s:unknown)=>typeof s==='string'&&resources.some(r=>r.id===s)):[];}catch{return [];}}
export default function App(){
 const [view,setView]=useState<View>(initialView);
 const [filters,setFilters]=useState(initialFilters);
 const [dimension,setDimension]=useState<Dimension>((['2d','3d','world'].includes(initialParams.get('track')||'')?initialParams.get('track'):'world') as Dimension);
 const [node,setNode]=useState(initialNode);
 const [saved,setSaved]=useState<string[]>(loadSaved);
 const [activeId,setActiveId]=useState(readResourceHash);
 const [mobileOpen,setMobileOpen]=useState(false);
 const previousMobileOpen=useRef(false);
 useEffect(()=>{if(previousMobileOpen.current&&!mobileOpen&&matchMedia('(max-width:760px)').matches)document.querySelector<HTMLButtonElement>('[aria-label="Open navigation"]')?.focus();previousMobileOpen.current=mobileOpen;},[mobileOpen]);
 const [toast,setToast]=useState('');
 const activeResource=resources.find(r=>r.id===activeId);
 const closeResource=useCallback(()=>setActiveId(''),[]);
 useEffect(()=>{if(location.protocol==='file:')return;const p=new URLSearchParams();if(view!=='map')p.set('view',view);p.set('track',dimension);if(node!==2)p.set('node',String(node));Object.entries(filters).forEach(([key,value])=>{if(value!==cleanFilters[key as keyof Filters])p.set(key,value);});const query=p.toString();history.replaceState(null,'',`${location.pathname}${query?'?'+query:''}${activeId?'#resource/'+encodeURIComponent(activeId):''}`);},[view,dimension,node,filters,activeId]);
 useEffect(()=>{try{localStorage.setItem('gamemap-saved-v1',JSON.stringify(saved));}catch{setToast('Your browser could not save this collection. It will remain available for this session.');}},[saved]);
 useEffect(()=>{if(!toast)return;const id=setTimeout(()=>setToast(''),3200);return()=>clearTimeout(id);},[toast]);
 const navigate=useCallback((next:View,category?:Category)=>{setView(next);setFilters({...cleanFilters,category:category||'all'});window.scrollTo({top:0,behavior:'instant'});},[]);
 const search=useCallback(()=>{setView('library');setFilters({...cleanFilters});requestAnimationFrame(()=>document.querySelector<HTMLInputElement>('#resource-search')?.focus());},[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='/'&&!activeResource&&!e.defaultPrevented&&!e.isComposing&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.shiftKey&&!(e.target instanceof HTMLElement&&e.target.isContentEditable)&&!(e.target instanceof HTMLInputElement)&&!(e.target instanceof HTMLTextAreaElement)&&!(e.target instanceof HTMLSelectElement)){e.preventDefault();search();}if(e.key==='Escape')setMobileOpen(false);};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[search,activeResource]);
 const toggleSave=(id:string)=>{const exists=saved.includes(id);setSaved(s=>exists?s.filter(x=>x!==id):[...s,id]);setToast(exists?'Removed from your collection.':'Added to your collection.');};
 const explore=(stage?:Stage,category?:string)=>{setView('library');setFilters({...cleanFilters,stage:stage||'all',category:category||'all',dimension:category?'all':stage?dimension:'all'});window.scrollTo({top:0,behavior:'instant'});};
 return <><a className="skip-link" href="#main-content">Skip to content</a><Header onSearch={search} onMenu={()=>setMobileOpen(!mobileOpen)}/><Sidebar resourceCount={resources.length} view={view} category={filters.category} count={saved.length} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} navigate={navigate}/><main id="main-content" className="main-content" tabIndex={-1}>{view==='map'?<MapView backgroundSuspended={!!activeResource||mobileOpen} dimension={dimension} setDimension={v=>{setDimension(v);setNode(2);}} node={node} setNode={setNode} resources={resources} openResource={r=>setActiveId(r.id)} explore={explore}/>:view==='learn'?<LearningHub resources={resources} openResource={r=>setActiveId(r.id)}/>:view==='test'?<Suspense fallback={<p role="status">Loading test library…</p>}><TestLibrary/></Suspense>:view==='notes'?<FieldNotes/>:<ResourceLibrary resources={resources} filters={filters} setFilters={setFilters} saved={saved} toggleSave={toggleSave} openResource={r=>setActiveId(r.id)} savedOnly={view==='saved'}/>}<footer className="page-footer"><span><BrandMark size={21}/><BrandWordmark/><span className="footer-tagline">A map for worlds yet to be built.</span></span><span>Curated October 18, 2026 · World Studio / 02</span></footer></main>{activeResource?<ResourceDrawer resource={activeResource} saved={saved.includes(activeResource.id)} toggleSave={toggleSave} onClose={closeResource}/>:null}{toast?<div className="toast" role="status"><Check size={16}/>{toast}<button className="icon-button" aria-label="Dismiss notification" onClick={()=>setToast('')}><X size={14}/></button></div>:null}</>;
}
