import {readdir, readFile} from 'node:fs/promises';
export const categories=[['agents','Coding agents and game development bridges'],['engines','Game engines, DCC tools, and ecosystems'],['2d','AI for 2D game development'],['3d','AI for 3D game development'],['production','Game production: art, animation, audio, testing, and runtime AI'],['world','Code world models and interactive worlds']];
export const types={agent:'Agent',framework:'Framework',skill:'Skill',benchmark:'Benchmark',paper:'Paper',docs:'Documentation',tool:'Tool',community:'Community',dataset:'Dataset'};
export const stages={plan:'Planning',code:'Coding',assets:'Assets',scene:'Scenes',test:'Testing',ship:'Shipping',runtime:'Runtime AI',world:'World models'};
const accessKinds=['tutorial','playable','interactive','video','download','full-source','sdk','examples','model','local-tool','pipeline-source','service','unavailable'];
export async function loadCatalog(){
 const files=(await readdir(new URL('../data/segments/',import.meta.url))).filter(f=>f.endsWith('.json')).sort();
 const sections=await Promise.all(files.map(f=>readFile(new URL('../data/segments/'+f,import.meta.url),'utf8').then(JSON.parse)));
 const all=sections.flat();
 const records=categories.flatMap(([id])=>all.filter(r=>r.category===id));
 if(records.length!==all.length)throw Error('Unknown category in data segments');
 return records;
}
export function validate(records){
 const ids=new Set(),urls=new Set();const dimensions=['2d','3d','world'];
 for(const r of records){
  for(const key of ['id','name','category','type','summary','detail','url','verified'])if(typeof r[key]!=='string'||!r[key].trim())throw Error(`Missing ${key}: ${r.id}`);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))throw Error(`Invalid ID: ${r.id}`);
  if(ids.has(r.id))throw Error(`Duplicate ID: ${r.id}`);ids.add(r.id);
  if(!categories.some(([id])=>id===r.category)||!types[r.type])throw Error(`Invalid taxonomy: ${r.id}`);
  for(const [field,allowed] of [['tags',null],['stages',Object.keys(stages)],['dimensions',dimensions]]){
   if(!Array.isArray(r[field])||!r[field].length||r[field].some(v=>typeof v!=='string'||!v.trim()||(allowed&&!allowed.includes(v))))throw Error(`Invalid ${field}: ${r.id}`);
   if(new Set(r[field]).size!==r[field].length)throw Error(`Duplicate ${field}: ${r.id}`);
  }
  const checkUrl=u=>{const url=new URL(u);if(url.protocol!=='https:')throw Error(`Use HTTPS: ${u}`);};checkUrl(r.url);
  if(urls.has(r.url.replace(/\/$/,'')))throw Error(`Duplicate primary URL: ${r.url}`);urls.add(r.url.replace(/\/$/,''));
  if(r.links){if(!Array.isArray(r.links))throw Error(`Invalid links: ${r.id}`);for(const l of r.links){if(typeof l.label!=='string'||!l.label)throw Error(`Invalid link label: ${r.id}`);checkUrl(l.url);}}
  if(r.access){
   for(const key of ['tutorial','demo','source']){
    const link=r.access[key];
    if(!link||typeof link.label!=='string'||!link.label.trim()||typeof link.note!=='string'||!link.note.trim()||!accessKinds.includes(link.kind))throw Error(`Invalid ${key} access: ${r.id}`);
    if(link.kind==='unavailable'){if(link.url!==undefined)throw Error(`Unavailable link must not have a URL: ${r.id}/${key}`);}
    else checkUrl(link.url);
   }
  }
  if(!/^\d{4}-\d{2}-\d{2}$/.test(r.verified)||Number.isNaN(Date.parse(r.verified)))throw Error(`Invalid verification date: ${r.id}`);
  if(r.year!==undefined&&(!Number.isInteger(r.year)||r.year<1990||r.year>new Date().getFullYear()+1))throw Error(`Invalid year: ${r.id}`);
 }
 return records;
}
const tableSafe=s=>s.replaceAll('|','\\|').replaceAll('\n',' ');
export function renderAwesome(records){
 const total=records.length;
 let text=`# Awesome AI Game Development

> A planning map for AI game development — from an idea to a playable world.

**${total} curated primary sources** connecting coding agents, game engines, AI for 2D and 3D development, production tools, and code world models. Main source review date: **October 18, 2026**. This is a research snapshot: reviewing a source does not imply reproducing its results or continuously monitoring it.

- [Interactive GameMap website — GitHub Pages](https://openenvision.github.io/GameMap/)
- [A practical guide from resources to a working project](docs/practical-guide.md)
- [Production research: interfaces, evidence and generative-service boundaries](docs/research-index.md)
- [Tutorials, playable demos, and complete example-game source](docs/tutorials-and-demos.md)
- [Coding agents × games: skills, bridges, evaluations, and game code](docs/coding-agent-game-code.md)
- [Testing library: games, AI environments, assets, rigs, and motion data](docs/game-testing-library.md)
- [Contributing and data maintenance](CONTRIBUTING.md) · [Structured JSON](data/resources.json)

## How to read the map

| Layer | What it addresses | Evidence to look for |
| --- | --- | --- |
| Model / coding agent / harness | Reasoning, code changes, and tool execution | Actual tools, runtime feedback, and supported tasks |
| Skill / MCP / CLI | Domain knowledge and engine editing | Real SKILL.md files, protocols, and editor operations |
| Framework / tool | Organizing generation or completing a production task | Inputs, outputs, project formats, and release status |
| Benchmark | Repeatable development evaluation | Tasks, scoring scripts, environments, and versions |
| Paper / world model | Executable state, neural simulation, or hybrid rendering | World representation, action interface, long-term consistency, and public availability |

**Editorial notes.** DeepSeek is listed through its model integration documentation, rather than as an official standalone harness. Blender is a DCC application and Three.js is a 3D library; their roles differ from those of full game engines. Development, gameplay, and modeling evaluations are considered separately. SolarRenderer and StreamRender-H3 belong to the structure- or engine-driven hybrid rendering track; pure video world models are labeled separately. The roadmaps and acceptance criteria are GameMap editorial guidance.

## Contents

`;
 categories.forEach(([id,title],i)=>{text+=`- [${i+1}. ${title}](#${id}) — ${records.filter(r=>r.category===id).length} resources\n`;});
 text+='\n';
 for(const [id,title] of categories){
  const section=records.filter(r=>r.category===id);
  text+=`<a id="${id}"></a>\n\n## ${title}\n\n`;
  for(const [type,label] of Object.entries(types)){
   const group=section.filter(r=>r.type===type);if(!group.length)continue;
   text+=`### ${label}\n\n| Resource | Purpose and scope | Stages |\n| --- | --- | --- |\n`;
   for(const r of group)text+=`| [${tableSafe(r.name)}](${r.url})${r.year?' · '+r.year:''} | ${tableSafe(r.summary)} | ${r.stages.map(s=>stages[s]).join(' / ')} |\n`;
   text+='\n<details>\n<summary>Inputs, outputs, limitations, and further reading</summary>\n\n';
   for(const r of group){
    text+=`**[${r.name}](${r.url})**\n\n${r.detail}\n\nTags: ${r.tags.map(t=>'`'+t+'`').join(' · ')}. Source reviewed: ${r.verified}.`;
    if(r.links?.length)text+=' Further reading: '+r.links.map(l=>`[${l.label}](${l.url})`).join(' · ');
    text+='\n\n';
    if(r.access)for(const [key,link] of Object.entries(r.access))text+=`- **${key[0].toUpperCase()+key.slice(1)} · ${link.kind}:** ${link.url?`[${link.label}](${link.url})`:link.label}. ${link.note}\n`;
    if(r.access)text+='\n';
   }
   text+='</details>\n\n';
  }
 }
 text+=`## Further reading and practice

- [Agents: models, harnesses, skills, and MCP](docs/agents-notes.md)
- [Engine ecosystems: documentation, source, tests, and community practice](docs/engines-notes.md)
- [AI for 2D and 3D: evaluation versions, asset pipelines, and release boundaries](docs/game-ai-notes.md)
- [World models: code state, hybrid rendering, video simulation, and explicit 3D](docs/world-model-notes.md)
- [Practical guide: task contracts, asset import, validation, and reproduction](docs/practical-guide.md)

## Maintenance

Edit only \`data/segments/*.json\` for catalog content. Run \`npm run build\` to regenerate the list and website, and \`npm run check\` to validate the data and generated outputs. There is no automatic scraping or scheduled updating. Code, weights, data, and services may have different licenses; read the relevant official terms before use. External projects belong to their respective authors.
`;
 return text;
}

export function renderReadme(awesome){return awesome+`
## Run locally

\`\`\`sh
npm ci
npm run build
npm run dev
\`\`\`

Use the development URL printed by Vite. Building creates a root \`index.html\` preview you can open directly in a browser, with scripts and styles embedded. Keep the \`website/public/\` folder alongside it for local images, icons, and documents. The development entry is \`website/index.html\`; application source lives in \`website/src/\`. Running \`npm run build\` generates the root preview and \`dist/\` for hosting; these build artifacts are ignored, not committed.

Homepage video previews and posters are bundled locally. Full films, external project pages, and web fonts require an internet connection. No API key is required. Saved resources stay in the current browser and can be exported as Markdown. The website uses React, TypeScript, and Vite, with native SVG and CSS graphics.

## Website builds and publishing

Resource edits are regenerated into the website catalog. Research dossiers are copied to \`website/public/\` and the built \`dist/\` directory; the website's Field Notes and resource-library footer link to the research index. These links open Markdown documents, not an inline article reader.

The publishing target is [GameMap on GitHub Pages](https://openenvision.github.io/GameMap/). This is a static website: no backend, API key, or separate hosted-site service is required. The workflow uploads only the built \`dist/\` directory, not the repository source or local configuration.

### One-time repository setup

1. A repository administrator, maintainer, or someone with permission to manage Pages must open **Settings → Pages** and select **GitHub Actions** as the build and deployment source.
2. Ensure GitHub Actions is enabled and the \`github-pages\` environment permits deployments from \`main\`.
3. Merge the publishing workflow into \`main\`. The first deployment runs automatically; subsequent pushes to \`main\` update the site. It can also be started from **Actions → Deploy GameMap to GitHub Pages → Run workflow** on \`main\`.

Private repositories require a GitHub plan that supports Pages. Enabling Pages does not change repository visibility, but the published website may be publicly accessible. Do not include credentials or private data in public assets. Until Pages is enabled and the first deployment succeeds, the target URL will not serve this site.

### Versioned content and validation

Source code, \`package-lock.json\`, editorial documents, public source media, and generated review/download files remain versioned. CI verifies that generated documents match their sources. Dependencies, built \`dist/\` directories, the generated root preview, caches, test reports, logs, local environment files, and machine-specific state are ignored. Environment example templates and shared editor configuration remain eligible for tracking.

Run \`npm run check\` to validate sources without needing build output. Run \`npm run build\` followed by \`npm run check:build\` to additionally verify deployed documents, media integrity, and the standalone preview. CI always runs the built-output checks before deployment.

### Build and deployment

The pull-request workflow, \`.github/workflows/catalog.yml\`, validates generated content and builds the site without publishing. The publishing workflow, \`.github/workflows/deploy-pages.yml\`, installs dependencies with \`npm ci\`, checks generated sources, builds and validates the static site, uploads \`dist/\`, and deploys it with the official GitHub Pages actions. Deployment permissions are limited to the deploy job.

The publishing build sets \`PAGES_BASE_PATH\` from GitHub Pages metadata so scripts, styles, media, and document downloads work under \`/GameMap/\`. Local builds retain relative URLs, and the root \`index.html\` remains a direct-file preview. The site uses query parameters and URL hashes rather than server routes, so refreshing a shared link does not require an SPA fallback.

See the [official workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) for repository settings and deployment troubleshooting.
`;}
