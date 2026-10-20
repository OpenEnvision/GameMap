import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { root } from './lib/documents.mjs';
import { assetConfig } from './lib/assets.mjs';
import { generatedRootPaths } from './lib/root-static.mjs';
const args = process.argv.slice(2), hashes = new Map();
let generated = await generatedRootPaths();
let manifestRefresh = Promise.resolve();
if (!args.some((arg) => arg === '--port' || arg.startsWith('--port='))) args.push('--port', '5177');
if (!args.includes('--strictPort')) args.push('--strictPort');
const generatedDocs = new Set(['docs/icon-sources.md','docs/tutorials-and-demos.md','docs/coding-agent-game-code.md','docs/game-testing-library.md','docs/cadle-repositories.md']);
const relevant = path => {
 if(!path || path.split('/').some(part=>part.startsWith('.')) || generatedDocs.has(path) || path === 'website/src/data/resources.json') return false;
 const assetRoot = 'website/public/'+assetConfig.prefix;
 if(path.startsWith(assetRoot)) return !assetConfig.generated.some(generated=>generated.endsWith('/')?path.slice(assetRoot.length).startsWith(generated):path.slice(assetRoot.length)===generated);
 return /^(?:docs\/|data\/segments\/|website\/src\/data\/|website\/content\/)/.test(path) || /^[^/]+\.md$/.test(path) || ['data/papers.json','website/docs.config.json','website/docs.descriptions.json','website/assets.config.json'].includes(path);
};
export const run = script => new Promise((done,fail)=>{const child=spawn(process.execPath,[script],{cwd:root,stdio:'inherit'});child.on('error',fail);child.on('exit',code=>code===0?done():fail(new Error(`${script} exited ${code}`)));});
async function prepare(){await run('scripts/sync-papers.mjs');await run('scripts/generate.mjs');await run('scripts/prepare-docs.mjs');}
await prepare();
let timer, running=false, queued=false;
async function refresh(){if(running){queued=true;return}running=true;try{await prepare();console.log('[content] source documents and data refreshed');}catch(error){console.error('[content] Preparation failed; fix the source and save again:',error.message);}finally{running=false;if(queued){queued=false;clearTimeout(timer);timer=setTimeout(refresh,250)}}}
const onChange = async (path) => {
 path=path?.replaceAll('\\','/');
 if(path==='.gamemap-static.json') {
  // Load new output ownership before handling subsequent root/docs file events.
  manifestRefresh=manifestRefresh.then(async()=>{try{generated=await generatedRootPaths();}catch(error){console.error('[content] Cannot read the static export manifest:',error.message);}});
  await manifestRefresh;
  return;
 }
 await manifestRefresh;
 if(generated.has(path)||!relevant(path))return;
 const full=resolve(root,path);let hash='deleted';
 try{if(!(await stat(full)).isFile())return;hash=createHash('sha256').update(await readFile(full)).digest('hex');}catch(error){if(error.code!=='ENOENT')return}
 if(hashes.get(path)===hash)return;
 hashes.set(path,hash);clearTimeout(timer);timer=setTimeout(refresh,250);
};
const watches = ['docs','data','website/src/data','website/content','website/public/assets'].map(directory => watch(resolve(root,directory),{recursive:true},(event,path)=>onChange(directory+'/'+path)));
watches.push(watch(root,(event,path)=>onChange(path)),watch(resolve(root,'website'),(event,path)=>onChange('website/'+path)));
const vite=spawn(process.execPath,[resolve(root,'node_modules/@react-router/dev/bin.js'),'dev','--host','127.0.0.1',...args],{cwd:root,stdio:'inherit'});
function stop(signal){watches.forEach(watcher=>watcher.close());clearTimeout(timer);vite.kill(signal)}
process.on('SIGINT',()=>stop('SIGINT'));process.on('SIGTERM',()=>stop('SIGTERM'));
vite.on('exit',code=>{watches.forEach(watcher=>watcher.close());clearTimeout(timer);process.exitCode=code||0;});
