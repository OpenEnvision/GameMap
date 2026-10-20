import assert from 'node:assert/strict';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root } from './lib/documents.mjs';
import { loadContent, contentDigest } from './lib/content.mjs';
import './check-entry.mjs';
import { readRootStaticManifest } from './lib/root-static.mjs';
import { createHash } from 'node:crypto';

const dist=resolve(root,'dist');
const manifest=JSON.parse(await readFile(resolve(dist,'site-manifest.json'),'utf8'));
const context=await loadContent(manifest.base);
const content=JSON.parse(await readFile(resolve(dist,'content-manifest.json'),'utf8'));
assert.equal(content.sourceDigest,contentDigest({sources:context.sources,documents:context.documents}),'The published source snapshot is stale; rebuild before packaging.');
assert.equal(content.localizationDigest,contentDigest(context.localizationSnapshot),'The published translations are stale; rebuild before packaging.');
for(const file of ['index.html','404.html','.nojekyll','search-index.json','zh/index.html','papers/index.html','THIRD-PARTY-NOTICES.txt','site-manifest.json','content-manifest.json']) await access(resolve(dist,file));
const entries=await readdir(dist);
assert.ok(entries.includes('assets') && entries.includes('docs'),'Publish assets and rendered guides alongside the root index.');
assert.ok(!entries.some((name)=>['dist','node_modules','.git','.build','website','scripts'].includes(name)),'Publish the site contents without an enclosing dist folder or source/dependency trees.');
const html=await readFile(resolve(dist,'index.html'),'utf8');
assert.ok(html.includes('main-content') && html.includes('GameMap'),'Published root index must be the full rendered GameMap homepage.');
assert.ok(html.includes('home-page') && !html.includes('Opening the GameMap homepage'),'Publish the actual homepage, not the source entry redirect.');
assert.ok(html.includes(`${manifest.base}assets/`),'Homepage assets must use the built Pages base path.');
const paths=[];
async function inspect(directory,prefix='') {
 for(const entry of await readdir(directory,{withFileTypes:true})) {
  const name=prefix+entry.name;
  assert.ok(!entry.isSymbolicLink(),`Static artifacts cannot contain symlinks: ${name}`);
  assert.ok(!/(^|\/)(?:\.git|node_modules|\.env(?:\.[^/]*)?|\.DS_Store|test-results|playwright-report)(\/|$)/.test(name),`Local/dependency material in release: ${name}`);
  if(entry.isDirectory()) await inspect(resolve(directory,entry.name),name+'/');
  else { const info=await stat(resolve(directory,entry.name));assert.ok(info.size<100*1024*1024,`File exceeds 100 MiB repository-upload boundary: ${name}`); paths.push({path:name,bytes:info.size}); }
 }
}
await inspect(dist);
const rootExport = await readRootStaticManifest(false);
assert.deepEqual(rootExport.files.map(file => file.path).sort(), paths.map(file => file.path).sort(), 'The repository root must include the entire built website');
for (const file of rootExport.files) {
 const digest = createHash('sha256').update(await readFile(resolve(dist,file.path))).digest('hex');
 assert.equal(digest, file.mode === 'source-preserved' ? file.distSha256 : file.sha256, `Root export differs from the current build: ${file.path}`);
}
const total=paths.reduce((sum,file)=>sum+file.bytes,0);
assert.ok(total<1024*1024*1024,'GitHub Pages site must remain below its 1 GiB published-size limit.');
console.log(`Release checks passed: index.html at publication root, ${manifest.pages.length} rendered routes, ${paths.length} files, ${(total/1024/1024).toFixed(1)} MiB; base ${manifest.base}.`);
