import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { zipSync, unzipSync } from 'fflate';
import assert from 'node:assert/strict';
import { root } from './lib/documents.mjs';
import './check-release.mjs';

const contents={};
async function collect(directory,prefix='') {
 for(const entry of await readdir(directory,{withFileTypes:true})) {
  const name=prefix+entry.name;
  if(entry.isDirectory()) await collect(resolve(directory,entry.name),name+'/');
  else contents[name]=[new Uint8Array(await readFile(resolve(directory,entry.name))),{mtime:new Date('2026-01-01T00:00:00Z')}];
 }
}
await collect(resolve(root,'dist'));
const bytes=zipSync(contents,{level:6});
const unpacked=unzipSync(bytes);
assert.deepEqual(Object.keys(unpacked).sort(),Object.keys(contents).sort(),'ZIP must preserve the entire published tree.');
for(const [name,[original]] of Object.entries(contents)) assert.deepEqual(unpacked[name],original,`ZIP altered ${name}`);
assert.ok(unpacked['index.html'] && !unpacked['dist/index.html'],'ZIP entry file must be at its outermost level.');
const output=resolve(root,'release');await mkdir(output,{recursive:true});
await writeFile(resolve(output,'GameMap-pages.zip'),bytes);
await writeFile(resolve(output,'GameMap-pages.zip.sha256'),createHash('sha256').update(bytes).digest('hex')+'  GameMap-pages.zip\n');
const manifest=JSON.parse(await readFile(resolve(root,'dist/site-manifest.json'),'utf8'));
console.log(`Created release/GameMap-pages.zip (${(bytes.length/1024/1024).toFixed(1)} MiB), ${Object.keys(contents).length} files with index.html at ZIP root. Built for ${manifest.base}; upload the extracted contents to that site base.`);
