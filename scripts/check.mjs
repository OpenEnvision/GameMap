import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {categories,loadCatalog,validate,renderAwesome} from './catalog.mjs';
import {loadLearningContent,renderLearningGuide} from './learning.mjs';
import {loadAgentCodeContent,validateAgentCodeContent,renderAgentCodeGuide} from './agent-code.mjs';
import {loadTestingContent,validateTestingContent,renderTestingGuide,testingManifest} from './testing.mjs';
import {loadRepositoryResearch,validateRepositoryResearch,renderRepositoryResearch} from './repository-research.mjs';
// Source checks work on a clean clone; --built additionally verifies local build output.
const checkBuilt=process.argv.includes('--built');
const records=validate(await loadCatalog());
const expected=JSON.stringify(records,null,2)+'\n';
for(const path of ['data/resources.json','website/src/data/resources.json','website/public/resources.json'])assert.equal(await readFile(new URL('../'+path,import.meta.url),'utf8'),expected,`Stale generated file: ${path}`);
const awesome=renderAwesome(records);
assert.equal(await readFile(new URL('../AWESOME.md',import.meta.url),'utf8'),awesome,'Regenerate AWESOME.md');
for(const r of records)assert.ok(awesome.includes(`](${r.url})`),`Resource missing from awesome list: ${r.id}`);
const summary=Object.fromEntries(categories.map(([c])=>[c,records.filter(r=>r.category===c).length]));
console.log(`Catalog checks passed: ${records.length} unique entries. ${JSON.stringify(summary)}`);

// Keep every starter path connected to a tutorial, real game build, and complete project.
const {learningPaths,foundationPaths,communityCollections}=await loadLearningContent();
const pathIds=new Set();
const learningGuide=await readFile(new URL('../docs/tutorials-and-demos.md',import.meta.url),'utf8');
assert.equal(learningGuide,renderLearningGuide(learningPaths,foundationPaths,records,communityCollections),'Regenerate the AI game-build guide');
for(const path of [...learningPaths,...foundationPaths]){
 assert.ok(!pathIds.has(path.id),`Duplicate learning path: ${path.id}`);pathIds.add(path.id);
 for(const field of ['title','description','engine','aiUse'])assert.ok(path[field]?.trim(),`Missing learning path ${field}: ${path.id}`);
 assert.ok(path.steps?.length&&path.steps.every(step=>typeof step==='string'&&step.trim()),`Missing project steps: ${path.id}`);
 for(const key of ['tutorial','demo','source']){
  assert.ok(path[key]?.label?.trim(),`Missing ${key} label: ${path.id}`);
  assert.equal(new URL(path[key].url).protocol,'https:',`Use HTTPS: ${path.id}/${key}`);
  assert.ok(learningGuide.includes(path[key].url),`Missing ${key} from downloadable guide: ${path.id}`);
 }
 assert.ok(['playable','download'].includes(path.demo.kind),`A starter demo must be a real game, not a video or tool: ${path.id}`);
 assert.ok(path.demo.note?.trim()&&path.source.note?.trim(),`Explain game and source availability: ${path.id}`);
 assert.ok(Array.isArray(path.resourceIds)&&path.resourceIds.every(id=>records.some(resource=>resource.id===id)),`Unknown related resource: ${path.id}`);
 assert.ok(['2d','3d'].includes(path.track),`Missing learning track: ${path.id}`);
}
for(const path of learningPaths){
 assert.ok(['ai-generated','ai-assisted'].includes(path.category),`Featured games must document AI creation: ${path.id}`);
 assert.ok(path.evidence?.label?.trim()&&path.evidence?.note?.trim(),`Missing creator AI evidence: ${path.id}`);
 assert.equal(new URL(path.evidence.url).protocol,'https:');
 assert.ok(learningGuide.includes(path.evidence.url),`Missing creator evidence from guide: ${path.id}`);
 assert.equal(path.source.scope,'complete-project',`Feature actual complete game projects: ${path.id}`);
 assert.ok(['prompt','build-log','tutorial','quickstart','disclosure'].includes(path.tutorial.kind),`Label the actual learning material: ${path.id}`);
}
assert.ok(foundationPaths.every(path=>path.category==='foundation'),'Keep ordinary engine references in the foundation section');
assert.equal(await readFile(new URL('../website/public/tutorials-and-demos.md',import.meta.url),'utf8'),learningGuide,'Regenerate the downloadable tutorial guide');
console.log(`Learning-link checks passed: ${learningPaths.length} documented AI game builds, ${foundationPaths.length} optional engine foundations, and matched project/evidence links.`);

const {agentGameResources,gameCaseAgents,agentLabels,agentResourceKinds}=await loadAgentCodeContent();
validateAgentCodeContent(agentGameResources,learningPaths,gameCaseAgents,agentLabels,agentResourceKinds);
const agentGuide=renderAgentCodeGuide(agentGameResources,learningPaths,gameCaseAgents,agentLabels,agentResourceKinds);
for(const path of ['docs/coding-agent-game-code.md','website/public/coding-agent-game-code.md'])assert.equal(await readFile(new URL('../'+path,import.meta.url),'utf8'),agentGuide,`Regenerate agent game-code guide: ${path}`);
console.log(`Agent-code checks passed: ${agentGameResources.length} source-reviewed resources and ${learningPaths.length} exact client/model game attributions.`);

const testingContent=await loadTestingContent();
const testingResources=validateTestingContent(testingContent);
const testingGuide=renderTestingGuide(testingContent),testingJson=testingManifest(testingContent);
for(const path of ['docs/game-testing-library.md','website/public/game-testing-library.md',...(checkBuilt?['dist/game-testing-library.md']:[])])assert.equal(await readFile(new URL('../'+path,import.meta.url),'utf8'),testingGuide,`Regenerate the testing guide: ${path}`);
for(const path of ['website/public/testing-resources.json',...(checkBuilt?['dist/testing-resources.json']:[])])assert.equal(await readFile(new URL('../'+path,import.meta.url),'utf8'),testingJson,`Regenerate the testing manifest: ${path}`);
console.log(`Testing-library checks passed: ${testingResources.length} reviewed resources, four resource types, three testing goals, and matched guide/JSON downloads.`);

// Every preview preserves real game pixels, bundled locally with capture/creator provenance.
function inspectWebp(bytes,label){
 assert.ok(bytes.length>=30,`Incomplete WebP image: ${label}`);
 assert.equal(bytes.toString('ascii',0,4),'RIFF',`Invalid WebP RIFF signature: ${label}`);
 assert.equal(bytes.toString('ascii',8,12),'WEBP',`Invalid WebP image signature: ${label}`);
 assert.equal(bytes.readUInt32LE(4)+8,bytes.length,`Incomplete WebP RIFF container: ${label}`);
 let offset=12,dimensions;
 while(offset<bytes.length){
  assert.ok(offset+8<=bytes.length,`Incomplete WebP chunk header: ${label}`);
  const type=bytes.toString('ascii',offset,offset+4),size=bytes.readUInt32LE(offset+4),body=offset+8;
  assert.ok(size>0&&body+size<=bytes.length,`Invalid WebP ${type} chunk: ${label}`);
  assert.ok(!['ANIM','ANMF'].includes(type),`Gameplay screenshot must be a still image: ${label}`);
  if(type==='VP8X'){
   assert.ok(size>=10,`Incomplete extended WebP header: ${label}`);
   assert.equal(bytes[body]&2,0,`Gameplay screenshot must not be animated: ${label}`);
  }
  if(type==='VP8 '){
   assert.ok(size>=10&&bytes.toString('hex',body+3,body+6)==='9d012a',`Invalid WebP key frame: ${label}`);
   dimensions={width:bytes.readUInt16LE(body+6)&0x3fff,height:bytes.readUInt16LE(body+8)&0x3fff};
  }else if(type==='VP8L'){
   assert.ok(size>=5&&bytes[body]===0x2f,`Invalid lossless WebP header: ${label}`);
   const packed=bytes.readUInt32LE(body+1);
   dimensions={width:(packed&0x3fff)+1,height:((packed>>>14)&0x3fff)+1};
  }
  offset=body+size+(size%2);
 }
 assert.equal(offset,bytes.length,`Invalid WebP chunk padding: ${label}`);
 assert.ok(dimensions?.width>0&&dimensions?.height>0,`Missing WebP pixel data: ${label}`);
 return dimensions;
}
const learningMediaBundle=await build({absWorkingDir:fileURLToPath(new URL('../',import.meta.url)),entryPoints:['website/src/data/learningMedia.ts'],bundle:true,write:false,format:'esm',platform:'node'});
const {learningMedia}=await import('data:text/javascript;base64,'+Buffer.from(learningMediaBundle.outputFiles[0].text).toString('base64'));
assert.deepEqual(Object.keys(learningMedia).sort(),learningPaths.map(path=>path.id).sort(),'Every featured AI game needs one real screenshot; engine foundations are excluded');
const learningManifestText=await readFile(new URL('../website/public/media/learning/manifest.json',import.meta.url),'utf8');
const learningManifest=JSON.parse(learningManifestText);
assert.equal(learningManifest.kind,'gameplay-screenshots');
assert.deepEqual(learningManifest.previews.map(preview=>preview.id),learningPaths.map(path=>path.id),'Gameplay provenance must follow the rendered cases');
const mediaSources=await readFile(new URL('../docs/media-sources.md',import.meta.url),'utf8');
let gameplayPreviewBytes=0;
for(const path of learningPaths){
 const preview=learningMedia[path.id],provenance=learningManifest.previews.find(item=>item.id===path.id);
 assert.equal(preview.src,`media/learning/${path.id}.webp`,`Gameplay screenshots must be bundled locally: ${path.id}`);
 for(const field of ['alt','caption'])assert.ok(preview[field]?.trim(),`Missing gameplay screenshot ${field}: ${path.id}`);
 assert.equal(new URL(preview.sourceUrl).protocol,'https:');
 const creatorScreenshot=preview.origin==='creator-screenshot';
 assert.ok(!preview.origin||['browser-capture','local-capture','creator-screenshot'].includes(preview.origin),`Unknown screenshot origin: ${path.id}`);
 if(creatorScreenshot){
  assert.equal(new URL(preview.originalImageUrl).protocol,'https:',`Creator screenshots need their original image URL: ${path.id}`);
  assert.ok(mediaSources.includes(preview.originalImageUrl),`Credit the original creator image: ${path.id}`);
  assert.ok(!preview.capturedAt,`Do not claim a GameMap capture date for creator images: ${path.id}`);
 }else if(preview.origin==='local-capture'){
  assert.equal(preview.sourceUrl,path.source.url,`Identify the locally captured source project: ${path.id}`);
 }else assert.equal(preview.sourceUrl,path.demo.url,`Capture the actual linked game: ${path.id}`);
 const screenshotDate=creatorScreenshot?preview.reviewedAt:preview.capturedAt;
 assert.match(screenshotDate,/^\d{4}-\d{2}-\d{2}(?:T.*)?$/,`Missing screenshot review/capture date: ${path.id}`);
 assert.ok(Number.isFinite(Date.parse(screenshotDate)),`Invalid screenshot review/capture date: ${path.id}`);
 assert.ok(Number.isInteger(preview.width)&&Number.isInteger(preview.height)&&preview.width>=320&&preview.height>=180,`Invalid screenshot dimensions: ${path.id}`);
 assert.equal(preview.width*9,preview.height*16,`Keep gameplay previews in a consistent 16:9 frame: ${path.id}`);
 assert.ok(mediaSources.includes(preview.sourceUrl)&&mediaSources.includes(preview.src),`Missing gameplay provenance: ${path.id}`);
 const bytes=await readFile(new URL('../website/public/'+preview.src,import.meta.url));
 assert.ok(bytes.length>512&&bytes.length<2_000_000,`Keep gameplay screenshot files intact and lightweight: ${path.id}`);
 assert.deepEqual(inspectWebp(bytes,path.id),{width:preview.width,height:preview.height},`Screenshot dimensions must match the image: ${path.id}`);
 assert.deepEqual(provenance,{id:path.id,...preview,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')},`Regenerate gameplay screenshot provenance: ${path.id}`);
 if(checkBuilt)assert.deepEqual(await readFile(new URL('../dist/'+preview.src,import.meta.url)),bytes,`Rebuild deployed gameplay screenshot: ${path.id}`);
 gameplayPreviewBytes+=bytes.length;
}
assert.deepEqual((await readdir(new URL('../website/public/media/learning/',import.meta.url))).filter(name=>name.endsWith('.webp')).sort(),Object.values(learningMedia).map(preview=>preview.src.split('/').at(-1)).sort(),'Record every bundled gameplay screenshot');
if(checkBuilt)assert.equal(await readFile(new URL('../dist/media/learning/manifest.json',import.meta.url),'utf8'),learningManifestText,'Rebuild deployed gameplay provenance');
assert.equal(await readFile(new URL('../website/public/media-sources.md',import.meta.url),'utf8'),mediaSources.replaceAll('../website/public/','./'),'Regenerate public media attribution');
console.log(`Learning-preview checks passed: ${learningPaths.length} real-game screenshots, matched source URLs, 16:9 WebP pixels, ${checkBuilt?'public/deployment':'public'} integrity, ${(gameplayPreviewBytes/1_000_000).toFixed(2)} MB total.`);

// Catch missing assignments, accidental remote dependencies, and damaged assets.
const identities=JSON.parse(await readFile(new URL('../website/src/data/resourceIdentities.json',import.meta.url),'utf8'));
assert.deepEqual(Object.keys(identities).sort(),records.map(resource=>resource.id).sort(),'Every resource needs a verified identity');
const logoAssets=new Set();
const textOnly=[];
for(const resource of records){
 const identity=identities[resource.id];
 assert.ok(identity.organization?.trim(),`Missing organization: ${resource.id}`);
 assert.ok(['brand','institution','creator'].includes(identity.kind),`Invalid identity kind: ${resource.id}`);
 assert.ok(identity.notes?.trim(),`Missing attribution evidence: ${resource.id}`);
 assert.equal(new URL(identity.sourceUrl).protocol,'https:',`Invalid attribution URL: ${resource.id}`);
 if(identity.asset===null){
  assert.equal(identity.kind,'creator',`Only unbranded independent projects may omit a mark: ${resource.id}`);
  assert.equal(identity.logoSourceUrl,null);
  assert.equal(identity.sha256,null);
  textOnly.push(resource.id);
  continue;
 }
 assert.match(identity.asset,/^logos\/[a-z0-9-]+\.(png|jpg|svg|webp|ico|gif)$/,`Logo must be bundled locally: ${resource.id}`);
 assert.equal(new URL(identity.logoSourceUrl).protocol,'https:');
 const bytes=await readFile(new URL('../website/public/'+identity.asset,import.meta.url));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),identity.sha256,`Logo integrity mismatch: ${resource.id}`);
 if(identity.asset.endsWith('.svg')){
  const svg=bytes.toString('utf8');
  assert.match(svg,/<svg\b/);
  assert.doesNotMatch(svg,/<!DOCTYPE|<(?:script|foreignObject)\b|\bon\w+\s*=|(?:href|src)=["'](?:https?:|\/\/)|url\(["']?(?:https?:|\/\/)/i,`Logo must be a passive local image: ${resource.id}`);
 }else{
  const isImage=bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||bytes.subarray(0,3).equals(Buffer.from([255,216,255]))||bytes.toString('ascii',0,4)==='RIFF'||bytes.toString('ascii',0,4)==='GIF8'||bytes.readUInt32LE(0)===65536;
  assert.ok(isImage,`Invalid logo image signature: ${resource.id}`);
 }
 logoAssets.add(identity.asset);
}
const publicIdentities=await readFile(new URL('../website/public/logo-sources.json',import.meta.url),'utf8');
assert.equal(publicIdentities,JSON.stringify(identities,null,2)+'\n','Regenerate public logo attribution');
console.log(`Logo checks passed: ${records.length-textOnly.length} resources, ${logoAssets.size} local marks; ${textOnly.length} unbranded projects use verified maintainer names.`);

// Read actual MP4 atoms so manifest claims cannot hide an incompatible or damaged video.
function inspectMp4(bytes,label){
 function boxes(start,end){
  const result=[];
  let offset=start;
  while(offset<end){
   assert.ok(offset+8<=end,`Incomplete MP4 box header: ${label}`);
   let size=bytes.readUInt32BE(offset),header=8;
   const type=bytes.toString('ascii',offset+4,offset+8);
   if(size===1){assert.ok(offset+16<=end);size=Number(bytes.readBigUInt64BE(offset+8));header=16;}
   if(size===0)size=end-offset;
   assert.ok(Number.isSafeInteger(size)&&size>=header&&offset+size<=end,`Invalid MP4 ${type} box: ${label}`);
   result.push({type,start:offset,body:offset+header,end:offset+size});
   offset+=size;
  }
  return result;
 }
 const children=box=>boxes(box.body,box.end);
 const required=(list,type)=>{const box=list.find(box=>box.type===type);assert.ok(box,`Missing MP4 ${type} box: ${label}`);return box;};
 const top=boxes(0,bytes.length);
 assert.equal(top[0]?.type,'ftyp',`Invalid MP4 signature: ${label}`);
 const moov=required(top,'moov'),mdat=required(top,'mdat');
 assert.ok(moov.start<mdat.start,`Video must start progressively: ${label}`);
 const tracks=children(moov).filter(box=>box.type==='trak').map(trak=>{
  const trackBoxes=children(trak),mdia=required(trackBoxes,'mdia'),mediaBoxes=children(mdia);
  const hdlr=required(mediaBoxes,'hdlr');
  return {trackBoxes,mediaBoxes,handler:bytes.toString('ascii',hdlr.body+8,hdlr.body+12)};
 });
 const videos=tracks.filter(track=>track.handler==='vide');
 assert.equal(videos.length,1,`One video track required: ${label}`);
 const video=videos[0],tkhd=required(video.trackBoxes,'tkhd'),mdhd=required(video.mediaBoxes,'mdhd');
 const version=bytes[mdhd.body];
 assert.ok(version===0||version===1,`Unsupported media header: ${label}`);
 const timescale=bytes.readUInt32BE(mdhd.body+(version===1?20:12));
 const duration=version===1?Number(bytes.readBigUInt64BE(mdhd.body+24)):bytes.readUInt32BE(mdhd.body+16);
 assert.ok(timescale>0&&duration>0);
 const stbl=required(children(required(video.mediaBoxes,'minf')),'stbl');
 const tables=children(stbl),stsd=required(tables,'stsd'),stts=required(tables,'stts');
 assert.equal(bytes.readUInt32BE(stsd.body+4),1,`One video sample format required: ${label}`);
 const sampleEntries=boxes(stsd.body+8,stsd.end);
 assert.equal(sampleEntries[0]?.type,'avc1',`Browser-compatible H.264 required: ${label}`);
 const timingEntries=bytes.readUInt32BE(stts.body+4);
 let samples=0,ticks=0;
 assert.equal(stts.body+8+timingEntries*8,stts.end,`Invalid sample timing table: ${label}`);
 for(let index=0;index<timingEntries;index++){
  const offset=stts.body+8+index*8,count=bytes.readUInt32BE(offset),delta=bytes.readUInt32BE(offset+4);
  samples+=count;ticks+=count*delta;
 }
 assert.ok(samples>0&&ticks>0);
 return {width:bytes.readUInt32BE(tkhd.end-8)/65536,height:bytes.readUInt32BE(tkhd.end-4)/65536,durationSeconds:duration/timescale,frameRate:samples/(ticks/timescale),audioTracks:tracks.filter(track=>track.handler==='soun').length,codec:sampleEntries[0].type};
}

const {clips,variants=[],libraryClips=[]}=JSON.parse(await readFile(new URL('../website/public/media/showcase/manifest.json',import.meta.url),'utf8'));
const bundle=await build({absWorkingDir:fileURLToPath(new URL('../',import.meta.url)),entryPoints:['website/src/data/showcase.ts'],bundle:true,write:false,format:'esm',platform:'node',define:{'import.meta.env.BASE_URL':'"./"'}});
const {showcaseCases,showcaseByTrack}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
assert.equal(clips.length,6,'Keep six primary showcase cases; responsive variants are not extra cases');
assert.deepEqual(clips.map(clip=>clip.id).sort(),Object.keys(showcaseCases).sort(),'Video provenance must match the rendered cases');
for(const track of ['2d','3d','world']){
 assert.equal(showcaseByTrack[track].cases.length,2,`Two reviewed cases required: ${track}`);
 assert.equal(clips.filter(clip=>clip.track===track).length,2);
}
assert.equal(new Set([...clips,...variants,...libraryClips].map(clip=>clip.id)).size,clips.length+variants.length+libraryClips.length,'Duplicate media provenance IDs');
assert.equal(new Set([...clips,...variants,...libraryClips].map(clip=>clip.asset)).size,clips.length+variants.length+libraryClips.length,'Each media record must name its own asset');
const declaredMedia=[...clips,...variants,...libraryClips].flatMap(clip=>[clip.asset.split('/').at(-1),clip.poster.split('/').at(-1)]).sort();
const bundledMedia=(await readdir(new URL('../website/public/media/showcase/',import.meta.url))).filter(name=>/\.(?:mp4|webp)$/.test(name)).sort();
assert.deepEqual(bundledMedia,declaredMedia,'Remove unused demo files and record every bundled video/poster in provenance');
async function checkLocalPreview(clip){
 assert.match(clip.asset,/^media\/showcase\/[a-z0-9-]+\.mp4$/);
 assert.match(clip.poster,/^media\/showcase\/[a-z0-9-]+\.webp$/);
 const mp4=await readFile(new URL('../website/public/'+clip.asset,import.meta.url));
 const poster=await readFile(new URL('../website/public/'+clip.poster,import.meta.url));
 assert.equal(mp4.length,clip.bytes,`Video size: ${clip.id}`);
 assert.equal(poster.length,clip.posterBytes,`Poster size: ${clip.id}`);
 assert.equal(createHash('sha256').update(mp4).digest('hex'),clip.sha256,`Video checksum: ${clip.id}`);
 assert.equal(createHash('sha256').update(poster).digest('hex'),clip.posterSha256,`Poster checksum: ${clip.id}`);
 const actual=inspectMp4(mp4,clip.id);
 assert.equal(actual.codec,clip.codec,`Video codec: ${clip.id}`);
 assert.equal(actual.audioTracks,0,`Preview must contain no audio track: ${clip.id}`);
 assert.equal(actual.width,clip.width,`Video width: ${clip.id}`);
 assert.equal(actual.height,clip.height,`Video height: ${clip.id}`);
 assert.ok(Math.abs(actual.durationSeconds-clip.durationSeconds)<.01,`Video duration: ${clip.id}`);
 assert.ok(Math.abs(actual.frameRate-clip.frameRate)<.01,`Video frame rate: ${clip.id}`);
 assert.equal(poster.toString('ascii',0,4),'RIFF');
 assert.equal(poster.toString('ascii',8,12),'WEBP');
 assert.ok(clip.bytes<8_000_000&&clip.durationSeconds>1&&clip.durationSeconds<=12.1,`Keep previews lightweight: ${clip.id}`);
 assert.ok(clip.silent&&clip.fullFramePreserved&&clip.fastStart);
}
for(const clip of clips){
 const demo=showcaseCases[clip.id];
 assert.ok(records.some(resource=>resource.id===clip.resourceId&&resource.dimensions.includes(clip.track)),`Missing source resource: ${clip.id}`);
 assert.equal(demo.video.previewSrc,'./'+clip.asset);
 assert.equal(demo.poster,'./'+clip.poster);
 assert.equal(demo.video.src,clip.originalVideoUrl);
 assert.equal(demo.video.source,clip.sourceUrl);
 assert.equal(new URL(clip.originalVideoUrl).protocol,'https:');
 await checkLocalPreview(clip);
 assert.ok(Math.abs(clip.width/clip.height-clip.sourceWidth/clip.sourceHeight)<.01,`Preserve the full source frame: ${clip.id}`);
}
assert.deepEqual(libraryClips.map(clip=>clip.id),['holodeck-living'],'Keep the reviewed Holodeck room clip in the resource library only');
for(const clip of libraryClips){
 assert.ok(records.some(resource=>resource.id===clip.resourceId&&resource.dimensions.includes(clip.track)),`Missing library source resource: ${clip.id}`);
 assert.ok(!Object.hasOwn(showcaseCases,clip.id),`Library clip must not become a homepage case: ${clip.id}`);
 assert.equal(new URL(clip.sourceUrl).protocol,'https:');
 assert.equal(new URL(clip.originalVideoUrl).protocol,'https:');
 await checkLocalPreview(clip);
 assert.ok(Math.abs(clip.width/clip.height-clip.sourceWidth/clip.sourceHeight)<.01,`Preserve the library source frame: ${clip.id}`);
}
const mobileCases=Object.values(showcaseCases).filter(demo=>demo.mobilePreview);
assert.deepEqual(variants.map(variant=>variant.parentId).sort(),mobileCases.map(demo=>demo.id).sort(),'Every runtime mobile preview needs one provenance variant');
for(const variant of variants){
 const parent=clips.find(clip=>clip.id===variant.parentId),mobile=showcaseCases[variant.parentId]?.mobilePreview;
 assert.ok(parent&&mobile,`Mobile variant needs an existing case: ${variant.id}`);
 assert.equal(variant.kind,'mobile-stacked-comparison');
 assert.equal(variant.id,variant.parentId+'-mobile');
 assert.equal(mobile.src,'./'+variant.asset);
 assert.equal(mobile.poster,'./'+variant.poster);
 assert.ok(Math.abs(mobile.aspectRatio-variant.width/variant.height)<1e-9,`Mobile runtime aspect ratio: ${variant.id}`);
 assert.equal(variant.sourceAsset,parent.asset);
 assert.equal(variant.sourceWidth,parent.width);
 assert.equal(variant.sourceHeight,parent.height);
 assert.equal(variant.layout,'engine-above-render');
 assert.equal(variant.topPanel,'engine-input');
 assert.equal(variant.bottomPanel,'neural-render');
 assert.equal(variant.crop,false,`Do not crop comparison panels: ${variant.id}`);
 assert.equal(variant.fullFramePreserved,true);
 assert.equal(variant.width,parent.width/2,`Keep complete left and right panel widths: ${variant.id}`);
 assert.equal(variant.height,parent.height*2,`Stack complete panel heights: ${variant.id}`);
 assert.equal(variant.width*variant.height,parent.width*parent.height,`Retain every source pixel area: ${variant.id}`);
 assert.ok(Math.abs(variant.durationSeconds-parent.durationSeconds)<.001,`Keep mobile comparison synchronized: ${variant.id}`);
 assert.ok(Math.abs(variant.frameRate-parent.frameRate)<.001,`Keep mobile comparison frame rate: ${variant.id}`);
 await checkLocalPreview(variant);
}
console.log(`Showcase checks passed: ${clips.length} real cases, ${variants.length} responsive variant, ${libraryClips.length} library clip, matched posters, H.264, no audio, progressive playback and local asset integrity.`);

async function englishSources(directory){
 const entries=await readdir(new URL('../'+directory,import.meta.url),{withFileTypes:true});
 const nested=await Promise.all(entries.map(entry=>entry.isDirectory()?englishSources(`${directory}/${entry.name}`):/\.(?:tsx?|json)$/.test(entry.name)?[`${directory}/${entry.name}`]:[]));
 return nested.flat();
}
const englishFiles=[...await englishSources('website/src'),...await englishSources('website/app'),...(checkBuilt?['dist/index.html']:[]),'README.md','AWESOME.md',...(await readdir(new URL('../website/public/',import.meta.url))).filter(name=>/\.(md|json)$/.test(name)).map(name=>'website/public/'+name)];
await Promise.all(englishFiles.map(async path=>{
 const source=await readFile(new URL('../'+path,import.meta.url),'utf8');
 assert.doesNotMatch(source,/\p{Script=Han}/u,`Non-English copy remains in ${path}`);
}));
for(const path of ['website/app/root.tsx',...(checkBuilt?['dist/index.html']:[])])assert.match(await readFile(new URL('../'+path,import.meta.url),'utf8'),/<html lang="en"[\s>]/,`Set the document language to English: ${path}`);
console.log(`English-only checks passed: ${englishFiles.length} ${checkBuilt?'source, rendered-site, and download':'source and download'} files.`);

const repositoryResearch=await loadRepositoryResearch();
const repositoryDocument=renderRepositoryResearch(repositoryResearch);
assert.equal(await readFile(new URL('../docs/cadle-repositories.md',import.meta.url),'utf8'),repositoryDocument,'Regenerate repository research');
for(const prefix of ['website/public',...(checkBuilt?['dist']:[])]){
 assert.equal(await readFile(new URL('../'+prefix+'/cadle-repositories.json',import.meta.url),'utf8'),JSON.stringify(repositoryResearch,null,2)+'\n','Stale repository research download');
 assert.equal(await readFile(new URL('../'+prefix+'/cadle-repositories.md',import.meta.url),'utf8'),repositoryDocument.replaceAll('](../website/public/','](./'),'Stale repository research document');
}
console.log(`Repository import checks passed: ${repositoryResearch.source.indexed_count} indexed candidates plus one reference; complete inventory and generated evidence ledger.`);

for(const mutate of [data=>data.records.pop(),data=>delete data.group_titles.core,data=>data.records[0].limitations=null,data=>data.records[0].source_urls=['javascript:alert(1)']]){
 const invalid=structuredClone(repositoryResearch);mutate(invalid);
 assert.throws(()=>validateRepositoryResearch(invalid),'Invalid research inventory must fail validation');
}
