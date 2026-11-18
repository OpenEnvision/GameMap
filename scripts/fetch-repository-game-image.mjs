import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { assertPublicMediaHost, reviewFrame, makeContactSheet, workspaceOutputPath } from './lib/example-media.mjs';
const args=process.argv.slice(2),option=(key,fallback)=>args.includes(key)?args[args.indexOf(key)+1]:fallback;
const intake=JSON.parse(await readFile(resolve(option('--intake','.build/example-media/intake.json')),'utf8'));
const job=intake.jobs.find(row=>row.id===option('--id'));assert.ok(job,'Unknown game');
const originalURL=await assertPublicMediaHost(option('--url'));
const repository=new URL(job.repository).pathname.split('/').filter(Boolean).slice(0,2).join('/').toLowerCase();
const assertRepository=url=>{
  assert.ok(['raw.githubusercontent.com','media.githubusercontent.com'].includes(url.hostname),'Only GitHub repository image hosts');
  const parts=url.pathname.split('/').filter(Boolean);
  if(url.hostname==='media.githubusercontent.com')assert.equal(parts.shift(),'media');
  assert.equal(parts.slice(0,2).join('/').toLowerCase(),repository,'Image must belong to this game repository');
  assert.match(url.pathname,/\.(png|jpe?g|webp|gif)$/i,'Use a discovered raster image path, not software');
};
assertRepository(originalURL);
const maxBytes=Number(option('--max-bytes','12000000'));
assert.ok(Number.isInteger(maxBytes)&&maxBytes>=1&&maxBytes<=48000000,'At most 48MB of raster image data');
if(maxBytes>12000000)assert.match(originalURL.pathname,/\.gif$/i,'Larger bound is only for creator animation GIFs');
const out=await workspaceOutputPath(option('--out',join(process.cwd(),`repo-image-${job.id}`)));
await mkdir(out,{recursive:true});
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
async function download(url,label){
  await assertPublicMediaHost(url.href);assertRepository(url);
  const file=join(out,label+'.image'),headersFile=join(out,label+'.headers');
  const {stdout}=await promisify(execFile)('curl',['-q','--proto','=https','--max-redirs','0','--connect-timeout','10','--max-time','45','--max-filesize',String(maxBytes),'-A','Mozilla/5.0','-sS','-D',headersFile,'-o',file,'-w','%{http_code}',url.href],{maxBuffer:100000});
  const status=Number(stdout.trim());
  if(status===429){const headers=await readFile(headersFile,'utf8');throw Error('HTTP 429; stop without retry. '+(headers.match(/^retry-after:\s*(.+)$/im)?.[0]||''));}
  assert.equal(status,200,`HTTP ${status}; no automatic retry or redirect`);
  const bytes=await readFile(file);assert.ok(bytes.length<=maxBytes);return bytes;
}
let url=originalURL,bytes=await download(url,'original'),lfs;
if(bytes.toString('utf8',0,100).startsWith('version https://git-lfs.github.com/spec/v1')){
  const text=bytes.toString('utf8'),oid=text.match(/^oid sha256:([a-f0-9]{64})$/m)?.[1],size=Number(text.match(/^size (\d+)$/m)?.[1]);
  assert.ok(oid&&Number.isSafeInteger(size)&&size>0&&size<=maxBytes,'LFS raster object exceeds size bound or has invalid metadata');
  assert.equal(originalURL.hostname,'raw.githubusercontent.com');
  // Resolve the already observed repository file through GitHub's official LFS media endpoint.
  // The public pointer's SHA-256 and size must match; no LFS client, credentials or software is run.
  url=new URL('https://media.githubusercontent.com/media'+originalURL.pathname);
  bytes=await download(url,'lfs-object');assert.equal(bytes.length,size,'LFS size mismatch');assert.equal(hash(bytes),oid,'LFS object hash mismatch');
  lfs={pointerUrl:originalURL.href,oid,size};
}
const frame=await reviewFrame(bytes),file=join(out,`${job.id}-0.png`);await writeFile(file,frame.png);
const candidate={index:0,file,url:url.href,sourceUrl:job.repository,kind:'repository-image-needs-visual-review',width:frame.width,height:frame.height,originalFormat:frame.originalFormat,frameIndex:frame.frameIndex,frames:frame.frames,checkedAt:new Date().toISOString(),originalSHA256:hash(bytes),frameSHA256:hash(frame.png),...(lfs?{lfs}:{}),transferLimit:maxBytes};
const sheet=join(out,'contact-sheet.jpg');await writeFile(sheet,await makeContactSheet([{id:job.id,...candidate}]));
const manifestPath=join(out,'manifest.json');await writeFile(manifestPath,JSON.stringify({status:'collected',jobs:[{...job,candidates:[candidate]}],sheets:[{file:sheet,tiles:[{id:job.id,index:0,file}]}],policy:'Only a discovered public repository raster path is fetched. LFS objects must match their public pointer hash and size. Gameplay visual review is mandatory; native software is never downloaded or run.'},null,2)+'\n');
console.log(JSON.stringify({manifestPath,file,contactSheet:sheet,status:'needs-visual-review'},null,2));
