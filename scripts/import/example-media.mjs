import assert from 'node:assert/strict';
import { readFile, writeFile, readdir, realpath, mkdir } from 'node:fs/promises';
import { resolve, join, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { publicMediaURL, imageOriginAllowed, normalizeScreenshot } from '../lib/example-media.mjs';

const root=resolve(import.meta.dirname,'../..'),args=process.argv.slice(2);
const option=(key,fallback)=>args.includes(key)?args[args.indexOf(key)+1]:fallback;
const reportsPath=resolve(option('--reports','.build/example-media/approved'));
const intake=JSON.parse(await readFile(resolve(option('--intake','.build/example-media/intake.json')),'utf8'));
const selectedWorkRoot=option('--work-root',null)||JSON.parse(await readFile(resolve(root,'.build/example-media/work.json'),'utf8')).workRoot;
const workRoot=await realpath(resolve(selectedWorkRoot));
const jobs=new Map(intake.jobs.map(row=>[row.id,row]));
const ledgerPath=resolve(root,'data/segments/jam-game-media.json');
const previous=JSON.parse(await readFile(ledgerPath,'utf8'));
const reports=[];
for(const name of(await readdir(reportsPath)).filter(name=>name.endsWith('.json')).sort()) {
  const report=JSON.parse(await readFile(join(reportsPath,name),'utf8'));
  assert.ok(Array.isArray(report.accepted)&&Array.isArray(report.missing),`Invalid reviewed report: ${name}`);
  reports.push(report);
}
reports.sort((a,b)=>Number(Object.hasOwn(a,'lane'))-Number(Object.hasOwn(b,'lane')));
const selected=new Map(), gaps=new Map();
for(const report of reports) {
  for(const row of report.missing) {assert.ok(jobs.has(row.id),`Unknown missing game ${row.id}`);gaps.set(row.id,{id:row.id,reason:row.reason,status:row.status||'blocked'});}
  for(const row of report.accepted) {
    assert.ok(jobs.has(row.id),`Unknown selected game ${row.id}`);
    assert.ok(!selected.has(row.id),`Conflicting screenshot decisions: ${row.id}`);
    assert.ok(row.alt?.trim()&&row.caption?.trim()&&row.observed?.trim(),`Visual review is required: ${row.id}`);
    assert.ok(['creator-screenshot','browser-capture'].includes(row.origin));
    selected.set(row.id,{...row,manifestPath:row.manifestPath||report.manifestPath});
  }
}
assert.ok([...jobs.keys()].every(id=>selected.has(id)||gaps.has(id)),'Some intake games were never reviewed');
const inside=async path=>{
  const value=await realpath(path);assert.ok(value.startsWith(workRoot+sep),'Selected media must come from the isolated review workspace');return value;
};
const loadJSON=async path=>JSON.parse(await readFile(await inside(path),'utf8'));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const records=new Map(previous.records.map(row=>[row.id,row]));
const planned=[];
for(const[id,decision]of selected) {
  const game=jobs.get(id);let input,media,evidence;
  if(decision.origin==='creator-screenshot') {
    const manifest=await loadJSON(decision.manifestPath);
    const sourceJob=manifest.jobs.find(row=>row.id===id);assert.ok(sourceJob,'Wrong source-image manifest');
    assert.equal(sourceJob.gameUrl,game.gameUrl,'Source publication differs from the catalog');
    const candidate=sourceJob.candidates.find(row=>row.index===decision.candidateIndex);assert.ok(candidate,'Unknown image candidate');
    assert.ok(imageOriginAllowed(candidate.url,candidate.sourceUrl),'Unapproved original image origin');
    publicMediaURL(candidate.url);publicMediaURL(candidate.sourceUrl);
    input=await readFile(await inside(candidate.file));assert.equal(sha(input),candidate.frameSHA256,'Reviewed image bytes changed');
    assert.match(decision.reviewedAt,/^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(decision.reviewedAt).toISOString().slice(0,10),decision.reviewedAt,'Invalid review date');
    assert.match(decision.caption,/Creator-published/i,'Do not misattribute a creator image as a GameMap capture');
    media={src:`media/learning/${id}.webp`,alt:decision.alt,caption:decision.caption,sourceUrl:candidate.sourceUrl,origin:'creator-screenshot',reviewedAt:decision.reviewedAt,originalImageUrl:candidate.url,width:1280,height:720};
    evidence={...(candidate.originalSHA256?{originalSHA256:candidate.originalSHA256}:{}),sourceFrameSHA256:candidate.frameSHA256,sourceWidth:candidate.width,sourceHeight:candidate.height,originalFormat:candidate.originalFormat,frameIndex:candidate.frameIndex,sourceFrames:candidate.frames,...(candidate.partialSource?{partialSource:candidate.partialSource}:{}),visualFinding:decision.observed};
  } else {
    const capture=await loadJSON(decision.captureReportPath);assert.equal(capture.id,id);assert.equal(capture.sourceUrl,game.gameUrl);
    assert.equal(game.demoKind,'playable','Native desktop screenshots cannot be fabricated');
    assert.equal(capture.status,'captured-needs-visual-review');assert.equal(capture.browserSandbox,true);
    const frame=capture.frames[decision.frameIndex];assert.ok(frame,'Unknown captured frame');
    input=await readFile(await inside(frame.file));assert.match(capture.capturedAt,/^\d{4}-\d{2}-\d{2}T/);
    assert.ok(Number.isFinite(Date.parse(capture.capturedAt)),'Invalid browser capture time');
    assert.match(decision.caption,/GameMap browser capture/i);
    media={src:`media/learning/${id}.webp`,alt:decision.alt,caption:decision.caption,sourceUrl:game.gameUrl,origin:'browser-capture',capturedAt:capture.capturedAt,width:1280,height:720};
    evidence={sourceFrameSHA256:sha(input),canvasUrl:frame.canvasURL,browserSandbox:true,visualFinding:decision.observed,limitations:capture.limitations,blockedRequestCount:capture.blockedRequests?.length||0};
  }
  assert.doesNotMatch(media.alt+' '+media.caption,/\p{Script=Han}/u,'English preview copy requires an explicit English description');
  const bytes=await normalizeScreenshot(input);
  assert.ok(bytes.length>512&&bytes.length<2_000_000,'Preview outside current screenshot integrity budget');
  const record={id,title:game.title,media,evidence,processing:{fit:'contain',width:1280,height:720,crop:false,generatedSceneContent:false},bytes:bytes.length,sha256:sha(bytes),rights:'Original game and screenshot rights remain with their creators and rights holders; no blanket reuse license or game execution certification is asserted.'};
  if(records.has(id))assert.deepEqual(record,records.get(id),`Refusing silent replacement of an already reviewed screenshot: ${id}`);
  records.set(id,record);planned.push({path:resolve(root,'website/public',media.src),bytes});
  gaps.delete(id);
}
const pending=new Map((previous.missing||[]).map(row=>[row.id,row]));
for(const id of jobs.keys())pending.delete(id);
for(const[id,row]of gaps)if(!records.has(id))pending.set(id,row);
for(const id of records.keys())pending.delete(id);
const scopeIds=[...new Set([...(previous.scopeIds||[]),...records.keys(),...pending.keys(),...jobs.keys()])].sort();
const ledger={version:1,policy:previous.policy,scopeIds,records:[...records.values()].sort((a,b)=>a.id.localeCompare(b.id)),missing:[...pending.values()].sort((a,b)=>a.id.localeCompare(b.id))};
// Validate every decision before writing any public media or source module.
if(args.includes('--dry-run')) {
  console.log(JSON.stringify({dryRun:true,reviewed:selected.size,totalCommunityImages:ledger.records.length,remaining:ledger.missing.length},null,2));
} else {
await mkdir(resolve(root,'website/public/media/learning'),{recursive:true});
const write=async(path,bytes)=>{const old=await readFile(path).catch(error=>{if(error.code==='ENOENT')return null;throw error;});if(!old||!old.equals(Buffer.isBuffer(bytes)?bytes:Buffer.from(bytes)))await writeFile(path,bytes);};
for(const item of planned)await write(item.path,item.bytes);
const json=JSON.stringify(ledger,null,2)+'\n';
await write(ledgerPath,json);await write(resolve(root,'website/public/game-screenshot-sources.json'),json);
const media=Object.fromEntries(ledger.records.map(row=>[row.id,row.media]));
await write(resolve(root,'website/src/data/jamGameMedia.ts'),`// Generated from data/segments/jam-game-media.json by scripts/import/example-media.mjs.\nimport type { LearningMedia } from './learningMedia';\n\nexport const jamGameMedia: Record<string, LearningMedia> = ${JSON.stringify(media,null,2)};\n`);
console.log(JSON.stringify({reviewed:selected.size,totalCommunityImages:ledger.records.length,remaining:ledger.missing.length,creatorImages:ledger.records.filter(row=>row.media.origin==='creator-screenshot').length,browserCaptures:ledger.records.filter(row=>row.media.origin==='browser-capture').length},null,2));
}
