import {mkdir,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {readDocuments} from './lib/documents.mjs';
import {generateSkillPackages} from './lib/skill-packages.mjs';
import {writeIfChanged} from './lib/files.mjs';
import {categories,loadCatalog,validate,renderAwesome} from './catalog.mjs';
import {loadLearningContent,renderLearningGuide} from './learning.mjs';
import {loadAgentCodeContent,renderAgentCodeGuide} from './agent-code.mjs';
import {loadTestingContent,validateTestingContent,renderTestingGuide,testingManifest} from './testing.mjs';
import {loadRepositoryResearch,renderRepositoryResearch} from './repository-research.mjs';
const records=validate(await loadCatalog());
const json=JSON.stringify(records,null,2)+'\n';
const awesome=renderAwesome(records);
const outputs={'website/public/favicon.svg':await readFile(new URL('../website/public/brand/gamemap-mark.svg',import.meta.url),'utf8'),'data/resources.json':json,'website/src/data/resources.json':json,'website/public/resources.json':json,'AWESOME.md':awesome};
const repositoryResearch=await loadRepositoryResearch();
outputs['docs/cadle-repositories.md']=renderRepositoryResearch(repositoryResearch);
outputs['website/public/repository-research.json']=JSON.stringify(repositoryResearch,null,2)+'\n';
const {learningPaths,foundationPaths,communityCollections}=await loadLearningContent();
outputs['docs/tutorials-and-demos.md']=renderLearningGuide(learningPaths,foundationPaths,records,communityCollections);
const {agentGameResources,gameCaseAgents,agentLabels,agentResourceKinds}=await loadAgentCodeContent();
outputs['docs/coding-agent-game-code.md']=renderAgentCodeGuide(agentGameResources,learningPaths,gameCaseAgents,agentLabels,agentResourceKinds);
const testingContent=await loadTestingContent();
validateTestingContent(testingContent);
outputs['docs/game-testing-library.md']=renderTestingGuide(testingContent);
outputs['website/public/testing-resources.json']=testingManifest(testingContent);
const learningMediaBundle=await build({absWorkingDir:fileURLToPath(new URL('../',import.meta.url)),entryPoints:['website/src/data/learningMedia.ts'],bundle:true,write:false,format:'esm',platform:'node'});
const {learningMedia}=await import('data:text/javascript;base64,'+Buffer.from(learningMediaBundle.outputFiles[0].text).toString('base64'));
const learningPreviews=await Promise.all(learningPaths.map(async path=>{
 const preview=learningMedia[path.id];
 if(!preview)throw new Error(`Missing gameplay preview: ${path.id}`);
 const bytes=await readFile(new URL('../website/public/'+preview.src,import.meta.url));
 return {id:path.id,...preview,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
}));
outputs['website/public/media/learning/manifest.json']=JSON.stringify({kind:'gameplay-screenshots',previews:learningPreviews},null,2)+'\n';
const identities=JSON.parse(await readFile(new URL('../website/src/data/resourceIdentities.json',import.meta.url),'utf8'));
outputs['website/public/logo-sources.json']=JSON.stringify(identities,null,2)+'\n';
let attribution=`# GameMap resource logo sources\n\nFind the organization, research affiliation, or maintainer behind each resource, along with the source of its bundled mark.\n\nSchool and institute marks identify a verified author affiliation, not exclusive ownership or endorsement. For collaborative research, the notes below preserve the selection rationale and other affiliations. Official project marks identify their own projects; third-party engine tools do not inherit an engine logo. Independent projects without a publicly verifiable mark show the maintainer name only. No generated logo, generic icon, default identicon, or portrait is used as a substitute.\n\nOriginal artwork is displayed with its aspect ratio and colors intact. Wide wordmarks receive more space. Nonvisual XML declarations and external DTD headers are removed from SVG files; artwork is unchanged. Files are served locally from <code>website/public/logos/</code> and do not require a remote image request. The identity registry records the original image URL, primary affiliation evidence, and a SHA-256 checksum. Legacy files under <code>website/public/icons/</code> are not used for resource identities; their accompanying licenses remain with those files.\n\n| Resource | Verified identity | Role | Evidence | Original mark | Local file |\n| --- | --- | --- | --- | --- | --- |\n`;
for(const resource of records){
 const identity=identities[resource.id];
 attribution+=`| ${resource.name} | ${identity.organization} | ${identity.kind} | [Primary source](${identity.sourceUrl}) | ${identity.logoSourceUrl?`[Original image](${identity.logoSourceUrl})`:'No published project mark'} | ${identity.asset?'<code>'+identity.asset+'</code>':'Maintainer name only'} |\n`;
}
attribution+='\n## Attribution notes\n\n';
for(const resource of records)attribution+=`### ${resource.name}\n\n${identities[resource.id].notes}\n\n`;
attribution=attribution.trimEnd()+'\n';
outputs['docs/icon-sources.md']=attribution;
outputs['website/public/logo-sources.md']=attribution.replaceAll('<code>website/public/logos/</code>','<code>logos/</code>');
outputs['website/public/media-sources.md']=(await readFile(new URL('../docs/media-sources.md',import.meta.url),'utf8')).replaceAll('../website/public/','./');
// Public downloads use same-directory paths so links also work on repository subpaths.
let downloadable=awesome;
// Flat source notes also have raw downloads. Nested archives are rendered as documentation.
const downloadableNotes=(await readDocuments()).filter(page=>/^docs\/[^/]+\.md$/.test(page.source)&&!['media-sources','icon-sources'].includes(page.slug));
for(const {slug:name} of downloadableNotes){
 const path=`docs/${name}.md`;
 downloadable=downloadable.replaceAll(`](${path})`, `](./${name}.md)`);
 let note=outputs[path]??await readFile(new URL('../'+path,import.meta.url),'utf8');
 note=note.replaceAll('](../website/public/', '](./');
 note=note.replaceAll('](../AWESOME.md)', '](./awesome-list.md)');
 note=note.replaceAll('](../CONTRIBUTING.md', '](./CONTRIBUTING.md');
 note=note.replaceAll('](world-model-notes.md)','](./world-model-notes.md)');
 outputs[`website/public/${name}.md`]=note.trimEnd()+'\n';
}
let contributing=await readFile(new URL('../CONTRIBUTING.md',import.meta.url),'utf8');
for(const {slug} of downloadableNotes)contributing=contributing.replaceAll(`](docs/${slug}.md`, `](./${slug}.md`);
outputs['website/public/CONTRIBUTING.md']=contributing;
outputs['website/public/awesome-list.md']=downloadable.replaceAll('](CONTRIBUTING.md)','](./CONTRIBUTING.md)').replaceAll('](data/resources.json)','](./resources.json)');
for(const [path,value] of Object.entries(outputs)){
 const url=new URL('../'+path,import.meta.url);await mkdir(new URL('.',url),{recursive:true});await writeIfChanged(url,value);
}
await generateSkillPackages();
console.log(`Generated awesome list and website data: ${records.length} resources, ${categories.length} categories.`);
