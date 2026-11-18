import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import assert from 'node:assert/strict';
import { assertPublicMediaHost, extractCreatorImages, imageOriginAllowed, reviewFrame, makeContactSheet, rawReadmeURL } from './lib/example-media.mjs';
const exec=promisify(execFile);
const args=process.argv.slice(2), option=(key,fallback)=>args.includes(key)?args[args.indexOf(key)+1]:fallback;
const intakePath=resolve(option('--intake','.build/example-media/intake.json'));
const out=resolve(option('--out','.build/example-media/collector'));
const intake=JSON.parse(await readFile(intakePath,'utf8'));
const cacheArguments=JSON.parse(option('--reuse-cache','[]'));
assert.ok(Array.isArray(cacheArguments));
const reusableCaches=cacheArguments.map(path=>resolve(path));
const only=option('--only',null), imageOffset=Number(option('--image-offset','0')), maxImages=Number(option('--max-images','3'));
const pageInterval=Number(option('--page-interval','1100'));
assert.ok(Number.isFinite(pageInterval)&&pageInterval>=1000&&pageInterval<=10000);
assert.ok(Number.isInteger(imageOffset)&&imageOffset>=0&&imageOffset<=20);
assert.ok(Number.isInteger(maxImages)&&maxImages>=1&&maxImages<=8);
await mkdir(join(out,'http'),{recursive:true});await mkdir(join(out,'images'),{recursive:true});await mkdir(join(out,'batches'),{recursive:true});
const nextAt=new Map(), cooldowns=new Map(), gates=new Map();
if(args.includes('--prior-manifest')) {
  const prior=JSON.parse(await readFile(resolve(option('--prior-manifest')),'utf8'));
  for(const[key,until]of Object.entries(prior.cooldowns||{}))cooldowns.set(key,Number(until));
}
const bucket=host=>host.endsWith('.itch.io')?'itch-pages':host.endsWith('.itch.zone')?'itch-images':host.includes('github')?'github':host;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function throttle(host) {
  const key=bucket(host);
  const previous=gates.get(key)||Promise.resolve();
  const scheduled=previous.catch(()=>{}).then(async()=>{
    const respectCooldown=async()=>{
      let pause=cooldowns.get(key)||0;
      while(pause>Date.now()) {
        if(!args.includes('--wait-rate-limits')||pause-Date.now()>10*60_000)
          throw Object.assign(new Error(`Rate-limit cooldown until ${new Date(pause).toISOString()}`),{code:'COOLDOWN',retryNotBefore:pause});
        await wait(pause-Date.now());pause=cooldowns.get(key)||0;
      }
    };
    await respectCooldown();
    await wait(Math.max(0,(nextAt.get(key)||0)-Date.now()));
    await respectCooldown();
    nextAt.set(key,Date.now()+(key==='itch-pages'?pageInterval:250));
  });
  gates.set(key,scheduled);await scheduled;
}
async function request(value,{image=false,sourceURL=value}={}) {
  let current=value;
  for(let redirect=0;redirect<5;redirect++) {
    const url=await assertPublicMediaHost(current);
    if(image)assert.ok(imageOriginAllowed(url.href,sourceURL),'Unapproved image origin/redirect');
    const hash=createHash('sha256').update(url.href).digest('hex');
    const bodyPath=join(out,'http',`${hash}.body`), headerPath=join(out,'http',`${hash}.headers`), infoPath=join(out,'http',`${hash}.json`);
    let info=await readFile(infoPath,'utf8').then(JSON.parse).catch(()=>null);
    if(!info||info.status!==200)for(const cache of reusableCaches) {
      const cached=await readFile(join(cache,`${hash}.json`),'utf8').then(JSON.parse).catch(()=>null);
      if(cached?.status!==200||cached.url!==url.href)continue;
      const bytes=await readFile(join(cache,`${hash}.body`)).catch(()=>null);
      if(!bytes||bytes.length>(image?12_000_000:2_000_000))continue;
      await writeFile(bodyPath,bytes);await writeFile(infoPath,JSON.stringify(cached,null,2));info=cached;break;
    }
    if(!info||info.status!==200) {
      await throttle(url.hostname);
      const {stdout}=await exec('curl',['-q','--proto','=https','--proto-redir','=https','--max-redirs','0','--connect-timeout','10','--max-time','25','--max-filesize',String(image?12_000_000:2_000_000),'-A','Mozilla/5.0','-sS','-D',headerPath,'-o',bodyPath,'-w','%{http_code}',url.href],{maxBuffer:100_000});
      const headers=await readFile(headerPath,'utf8');
      info={url:url.href,status:Number(stdout.trim()),headers,checkedAt:new Date().toISOString()};
      await writeFile(infoPath,JSON.stringify(info,null,2));
      if(info.status===429) {
        const retry=headers.match(/^retry-after:\s*(.+)$/im)?.[1].trim();
        const until=retry&&/^\d+$/.test(retry)?Date.now()+Number(retry)*1000:retry?Date.parse(retry):Date.now()+60_000;
        const pause=Math.max(Date.now()+60_000,Number.isFinite(until)?until:0);cooldowns.set(bucket(url.hostname),pause);
        throw Object.assign(new Error(`HTTP 429; no immediate retry; cooldown until ${new Date(pause).toISOString()}`),{retryNotBefore:pause});
      }
    }
    if([301,302,303,307,308].includes(info.status)) {
      const location=info.headers.match(/^location:\s*(.+)$/im)?.[1].trim();assert.ok(location,'Redirect without Location');current=new URL(location,url).href;continue;
    }
    assert.equal(info.status,200,`HTTP ${info.status}: ${url.href}`);
    const bytes=await readFile(bodyPath);assert.ok(bytes.length<=(image?12_000_000:2_000_000),'Transfer exceeds size cap');
    return {bytes,url:url.href,checkedAt:info.checkedAt};
  }
  throw new Error('Too many redirects');
}
const jobs=intake.jobs.filter(row=>!only||row.id===only).map(row=>({...row,candidates:[],observations:[],candidateImageURLs:[]}));
assert.ok(jobs.length,'No intake jobs matched');
let cursor=0, completed=0;
async function processJobs() {
  while(cursor<jobs.length) {
    const job=jobs[cursor++];assert.match(job.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    const candidates=[];
    if(!args.includes('--readme-only')) {
      try {
        const page=await request(job.gameUrl);job.pageFile=join(out,'http',`${createHash('sha256').update(page.url).digest('hex')}.body`);
        candidates.push(...extractCreatorImages(page.bytes.toString('utf8'),page.url));
        job.observations.push({url:job.gameUrl,status:200,checkedAt:page.checkedAt});
      } catch(error) {job.observations.push({url:job.gameUrl,error:error.message,retryNotBefore:error.retryNotBefore||null});}
    }
    if(!candidates.length||args.includes('--readme')) {
      const readmes=[...new Set((job.evidence||[]).map(e=>e.url).filter(url=>/readme(?:\.[a-z]+)?(?:$|[?#])/i.test(url)))].slice(0,2);
      for(const source of readmes) {
        try{const url=rawReadmeURL(source);const page=await request(url);candidates.push(...extractCreatorImages(page.bytes.toString('utf8'),page.url));job.observations.push({url,status:200,checkedAt:page.checkedAt});if(candidates.length)break;}
        catch(error){job.observations.push({url:source,error:error.message,retryNotBefore:error.retryNotBefore||null});}
      }
    }
    job.candidateImageURLs=candidates.slice(0,12);
    for(const candidate of candidates.slice(imageOffset,imageOffset+20)) {
      if(job.candidates.length>=maxImages)break;
      try {
        assert.ok(imageOriginAllowed(candidate.url,candidate.sourceUrl),'Image not linked to an approved origin');
        const response=await request(candidate.url,{image:true,sourceURL:candidate.sourceUrl});
        const frame=await reviewFrame(response.bytes);
        const index=job.candidates.length,file=join(out,'images',`${job.id}-${index}.png`);
        await writeFile(file,frame.png);
        job.candidates.push({...candidate,index,file,width:frame.width,height:frame.height,originalFormat:frame.originalFormat,frameIndex:frame.frameIndex,frames:frame.frames,checkedAt:response.checkedAt,originalSHA256:createHash('sha256').update(response.bytes).digest('hex'),frameSHA256:createHash('sha256').update(frame.png).digest('hex')});
      }catch(error){job.observations.push({url:candidate.url,error:error.message,retryNotBefore:error.retryNotBefore||null});}
    }
    completed++;
    if(completed%20===0||completed===jobs.length){await writeFile(join(out,'progress.json'),JSON.stringify({completed,total:jobs.length,withImages:jobs.filter(j=>j.candidates.length).length,cooldowns:Object.fromEntries(cooldowns)},null,2));console.log(`Collected ${completed}/${jobs.length}; ${jobs.filter(j=>j.candidates.length).length} with image candidates`);}
  }
}
await Promise.all(Array.from({length:4},()=>processJobs()));
const batchSize=Math.ceil(jobs.length/12),batches=[];
for(let start=0,index=0;start<jobs.length;start+=batchSize,index++) {
  const batchJobs=jobs.slice(start,start+batchSize),tiles=batchJobs.flatMap(job=>job.candidates.map(candidate=>({id:job.id,...candidate}))),sheets=[];
  for(let t=0;t<tiles.length;t+=16) {
    const subset=tiles.slice(t,t+16),file=join(out,'batches',`batch-${index+1}-sheet-${sheets.length+1}.jpg`);
    await writeFile(file,await makeContactSheet(subset));sheets.push({file,tiles:subset.map(({id,index,file})=>({id,index,file}))});
  }
  const path=join(out,'batches',`batch-${index+1}.json`);
  await writeFile(path,JSON.stringify({index:index+1,jobs:batchJobs,sheets,cooldowns:Object.fromEntries(cooldowns),policy:'Creator-linked candidate images require visual gameplay review; no cover/logo/error/menu-only substitution. Native games were not executed.'},null,2)+'\n');
  batches.push(path);
}
const manifest={version:1,status:'collected',checkedAt:new Date().toISOString(),jobs,batches,cooldowns:Object.fromEntries(cooldowns),stats:{total:jobs.length,withCandidates:jobs.filter(j=>j.candidates.length).length,withoutCandidates:jobs.filter(j=>!j.candidates.length).length,images:jobs.reduce((n,j)=>n+j.candidates.length,0)}};
const manifestPath=join(out,'manifest.json');await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({status:'collected',manifestPath,batches,stats:manifest.stats},null,2));
