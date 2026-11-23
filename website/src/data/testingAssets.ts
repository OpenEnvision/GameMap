import type { TestingResource } from './testingTypes';

export const testingAssets: TestingResource[] = [
  {
    id: 'kenney', title: 'Kenney', kind: 'asset', uses: ['coding', 'pipeline'], dimensions: ['2d', '3d'],
    stack: 'Sprites, tiles, UI, audio and 3D model packs',
    summary: 'A practical CC0 starting point for small test scenes, asset replacement, collision and UI regressions.',
    sourceUrl: 'https://kenney.nl/assets',
    access: { label: 'Browse free asset packs', url: 'https://kenney.nl/assets', note: 'Individual asset packs are free; optional bundles and tools are separate products.' },
    codeLicense: 'Not a software project', assetLicense: 'CC0 for the asset packs', terms: 'open',
    licenseUrl: 'https://kenney.nl/support',
    evidence: [{ label: 'Creator licensing FAQ', url: 'https://kenney.nl/support' }],
    aiUseNote: 'Use the CC0 pack files as the basis for a redistributable test fixture. This does not make the website, branding or separately sold software CC0.',
    testTasks: ['Replace a sprite or model and check scale, collision and material references.', 'Run a fixed UI or tilemap scene and compare screenshots.'],
    setup: ['Choose one small pack and retain its included license file.', 'Import the pack into a versioned test project and record the import settings.'],
    limitations: 'Not every pack contains animation or a humanoid rig. No pack was imported locally in this review.', reviewed: '2026-10-18',
  },
  {
    id: 'quaternius', title: 'Quaternius', kind: 'asset', uses: ['coding', 'pipeline'], dimensions: ['3d'],
    stack: 'Low-poly environments, characters and animated model packs',
    summary: 'CC0 models and characters for repeatable import, material, collision and animation tests.',
    sourceUrl: 'https://quaternius.com/',
    access: { label: 'Browse creator packs', url: 'https://quaternius.com/', note: 'Check the exact pack: free Standard downloads and paid Pro or Source editions can contain different files.' },
    codeLicense: 'Not a software project', assetLicense: 'CC0 for creator-designated asset packs; check each download', terms: 'open',
    licenseUrl: 'https://quaternius.com/',
    evidence: [{ label: 'Creator asset catalog and licensing', url: 'https://quaternius.com/' }, { label: 'Example pack and edition details', url: 'https://quaternius.itch.io/universal-animation-library' }],
    aiUseNote: 'Base reuse on the CC0 designation of the downloaded files. A free edition does not establish entitlement to paid source files or unrelated marketplace content.',
    testTasks: ['Import the same model into two engines and compare scale, shading and collision.', 'Replace a character while preserving animation and scene references.'],
    setup: ['Select an explicitly CC0 pack and save its edition and release details.', 'Keep the original archive beside the engine import settings.'],
    limitations: 'Pack formats and included rigs vary; Standard is not necessarily the complete collection. The cited Universal Animation Library changelog records Unreal FBX-to-GLB export and rig-name changes in v2.0, a 24-to-30 fps correction in v2.1, and root-motion plus step-phase changes in v3.0; pin the release and root-motion variant for comparable tests. No local import was performed.', reviewed: '2026-10-18',
  },
  {
    id: 'poly-haven', title: 'Poly Haven', kind: 'asset', uses: ['playing', 'pipeline'], dimensions: ['3d'],
    stack: 'PBR textures, HDRIs, 3D models and a public download API',
    summary: 'CC0 realistic assets for material, lighting, dependency and visual-domain regression tests.',
    sourceUrl: 'https://polyhaven.com/',
    access: { label: 'Browse CC0 assets', url: 'https://polyhaven.com/all', note: 'Free downloads; the API has been free for personal, academic and commercial use since July 18, 2026.' },
    codeLicense: 'Not a software project', assetLicense: 'CC0 for downloadable assets; live API service has separate conditions', terms: 'open',
    licenseUrl: 'https://polyhaven.com/license',
    evidence: [{ label: 'Asset license', url: 'https://polyhaven.com/license' }, { label: 'Current API terms and endpoints', url: 'https://polyhaven.com/our-api' }],
    aiUseNote: 'The official API page explicitly includes AI/ML datasets among supported uses. Live API products must identify Poly Haven as the asset source and requests need a unique User-Agent; those conditions are separate from CC0.',
    testTasks: ['Check texture dependencies, normal orientation and physical scale after import.', 'Compare a fixed scene under different HDRIs or material resolutions.'],
    setup: ['Choose a small model, texture set or HDRI at a controlled resolution.', 'For API integration, retain file hashes and follow the source-credit and User-Agent conditions.'],
    limitations: 'Website copy and example renders are outside the CC0 asset grant. API availability is best effort; no local import was performed.', reviewed: '2026-10-18',
  },
  {
    id: 'ambientcg', title: 'ambientCG', kind: 'asset', uses: ['playing', 'pipeline'], dimensions: ['3d'],
    stack: 'PBR materials, decals, atlases, HDRIs, terrain and models',
    summary: 'A CC0 source for texture-channel, terrain, lighting and material-resolution test fixtures.',
    sourceUrl: 'https://ambientcg.com/',
    access: { label: 'Browse downloadable assets', url: 'https://ambientcg.com/list', note: 'Public asset downloads are free; optional support services are separate.' },
    codeLicense: 'Not a software project', assetLicense: 'CC0 for downloadable assets', terms: 'open',
    licenseUrl: 'https://docs.ambientcg.com/license/',
    evidence: [{ label: 'Official asset license', url: 'https://docs.ambientcg.com/license/' }, { label: 'Asset catalog', url: 'https://ambientcg.com/list' }],
    aiUseNote: 'Use the asset CC0 grant rather than the zero price as the basis for reuse. Keep service access conditions and any unrelated third-party content separate.',
    testTasks: ['Verify roughness, metallic, displacement and normal maps use the correct channels.', 'Measure memory and visual changes across texture resolutions.'],
    setup: ['Download one asset at a fixed resolution and retain its identifier.', 'Document color-space, normal-map and material import settings.'],
    limitations: 'Asset formats and available maps vary. This review did not download or import a test material.', reviewed: '2026-10-18',
  },
  {
    id: 'open-game-art', title: 'OpenGameArt', kind: 'asset', uses: ['coding', 'pipeline'], dimensions: ['2d', '3d'],
    stack: 'Community sprites, tiles, models, music and sound effects',
    summary: 'Broad community coverage for 2D content tests, with licensing recorded separately for every item.',
    sourceUrl: 'https://opengameart.org/',
    access: { label: 'Browse community assets', url: 'https://opengameart.org/', note: 'Download from the individual entry and preserve the author, license and attribution instructions.' },
    codeLicense: 'Not a software project', assetLicense: 'Per-entry licenses, including CC0, CC-BY, CC-BY-SA and GPL variants', terms: 'mixed',
    licenseUrl: 'https://opengameart.org/content/faq',
    evidence: [{ label: 'License and attribution FAQ', url: 'https://opengameart.org/content/faq' }],
    aiUseNote: 'There is no catalog-wide AI authorization. Select files under a suitable license and assess their attribution, share-alike and any additional rights before publishing a dataset.',
    testTasks: ['Import a tilemap and validate tile sizes, transparency and collision alignment.', 'Generate an attribution manifest from the exact selected entries.'],
    setup: ['Filter by the license required for the intended test and distribution.', 'Archive the selected entry URL, author, license text and original files.'],
    limitations: 'Free downloads have different licenses and asset quality. The FAQ says preview images and audio can have different rights from downloadable assets; do not treat those previews as licensed test-fixture files unless explicitly covered. No individual asset was locally imported or cleared as part of this catalog review.', reviewed: '2026-10-18',
  },
  {
    id: 'fab', title: 'Fab', kind: 'asset', uses: ['pipeline'], dimensions: ['2d', '3d'],
    stack: 'Marketplace models, materials, animation and engine-specific content',
    summary: 'Useful import test content when the exact listing, license and AI-use fields fit the intended task.',
    sourceUrl: 'https://www.fab.com/',
    access: { label: 'Browse marketplace listings', url: 'https://www.fab.com/', note: 'Free and paid listings coexist; account access and engine compatibility depend on the item.' },
    codeLicense: 'Not a software project', assetLicense: 'Listing-specific: Fab Standard, CC-BY or other stated terms; some content is UE-Only', terms: 'review',
    licenseUrl: 'https://www.fab.com/eula',
    evidence: [{ label: 'Fab Standard license summary and EULA', url: 'https://www.fab.com/eula' }, { label: 'Example UE-Only listing with AI-use field', url: 'https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0' }],
    aiUseNote: 'Check the listing license and AI-use designation before testing with AI or sharing a dataset. A listing field is not a catalog-wide rule; free pricing is not an open license.',
    testTasks: ['Validate dependencies, LODs and material import for one approved listing.', 'Compare listed engine versions with the actual project import results.'],
    setup: ['Record the exact listing, acquired version, license and AI-use fields.', 'Import only after the intended automated use and distribution are covered.'],
    limitations: 'The Standard license does not generally permit standalone asset redistribution. The official summary says Reference-Only access does not include source-format files, so confirm the acquired tier before planning export or import fixtures. Engine-specific content and individual terms require separate review; no local import was performed.', reviewed: '2026-10-18',
  },
  {
    id: 'unity-asset-store', title: 'Unity Asset Store', kind: 'asset', uses: ['pipeline'], dimensions: ['2d', '3d'],
    stack: 'Unity packages, characters, animation, environments and editor tools',
    summary: 'Package and import regression fixtures when provider rights and the permitted automation route are established.',
    sourceUrl: 'https://assetstore.unity.com/',
    access: { label: 'Browse Asset Store packages', url: 'https://assetstore.unity.com/', note: 'Free packages can require an account, compatible Unity version and package dependencies.' },
    codeLicense: 'Not a software project', assetLicense: 'Asset Store EULA or stated restricted/third-party licenses', terms: 'review',
    licenseUrl: 'https://unity.com/legal/as-terms',
    evidence: [{ label: 'Asset Store terms and EULA', url: 'https://unity.com/legal/as-terms' }, { label: '2026 terms update and agent access explanation', url: 'https://unity.com/legal' }],
    aiUseNote: 'Unity platform agent access and third-party asset authorization are separate checks. The Asset Store terms restrict AI/model-related use without express consent; permitted editor access does not grant asset training or dataset rights.',
    testTasks: ['Check package import, missing scripts and dependency changes in an approved project.', 'Compare rig mappings and animation import settings across supported editor versions.'],
    setup: ['Record the package version, provider license and intended AI use.', 'Use a permitted Unity automation connection and obtain any required provider authorization.'],
    limitations: 'Free is not open source. Restricted assets and third-party components may have different terms; no package was downloaded or imported.', reviewed: '2026-10-18',
  },
  {
    "id": "khronos-gltf-sample-assets",
    "title": "Khronos glTF Sample Assets",
    "kind": "asset",
    "uses": [
      "coding",
      "pipeline"
    ],
    "dimensions": [
      "3d"
    ],
    "stack": "glTF 2.0 / GLB reference and testing models with per-model license metadata",
    "summary": "The official Khronos collection of glTF 2.0 models, including a dedicated Testing list built for exercising viewers, converters and importers.",
    "sourceUrl": "https://github.com/KhronosGroup/glTF-Sample-Assets",
    "access": {
      "label": "Browse the official asset lists",
      "url": "https://github.khronos.org/glTF-Assets/",
      "note": "The browsable catalog exposes tagged model lists, previews and per-model license and credit information; the repository holds the downloadable files."
    },
    "codeLicense": "Repository text is licensed CC-BY-4.0; individual models carry their own license and attribution in each model README.",
    "assetLicense": "Per-model licenses, commonly CC-BY 4.0 or CC0; check the README in the exact model directory before reuse.",
    "terms": "mixed",
    "licenseUrl": "https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/README.md",
    "evidence": [
      {
        "label": "Testing models for viewers and converters",
        "url": "https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models-testing.md"
      },
      {
        "label": "Complete model list with license summaries",
        "url": "https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models.md"
      },
      {
        "label": "Repository license and per-model credit rules",
        "url": "https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/README.md"
      }
    ],
    "aiUseNote": "Use the tagged Testing models as a deterministic import and render fixture. The CC-BY grant on the repository text does not extend to every model, website branding or third-party showcase art; retain each model credit line.",
    "testTasks": [
      "Import the same Testing model into two engines and compare geometry, materials, texture orientation and scale.",
      "Run a fixed set of extension and core-only models through a converter and record which features are dropped."
    ],
    "setup": [
      "Pin a repository commit and select a small set of models from the Testing and Core Only lists.",
      "Copy the per-model README credit and license beside each downloaded .gltf/.glb and record import settings."
    ],
    "limitations": "Licenses are per model, not per repository; several showcase assets require attribution and some assets were removed for unsuitable licensing. No model was downloaded or imported locally in this review.",
    "reviewed": "2026-11-22"
  },
  {
    "id": "khronos-gltf-asset-generator",
    "title": "Khronos glTF Asset Generator",
    "kind": "asset",
    "uses": [
      "coding",
      "pipeline"
    ],
    "dimensions": [
      "3d"
    ],
    "stack": "C# / .NET generator producing positive and negative glTF 2.0 conformance assets",
    "summary": "An official generator for glTF 2.0 importer test cases, with Positive and Negative output sets covering accessor, animation, material, mesh and texture requirements.",
    "sourceUrl": "https://github.com/KhronosGroup/glTF-Asset-Generator",
    "access": {
      "label": "Browse generated test assets",
      "url": "https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Positive",
      "note": "Pre-generated Positive and Negative models are committed under Output; the C# solution regenerates them."
    },
    "codeLicense": "MIT for the generator source.",
    "assetLicense": "Generated output assets are covered by the repository MIT license; still record the exact Output revision used.",
    "terms": "open",
    "licenseUrl": "https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/LICENSE",
    "evidence": [
      {
        "label": "Project scope and supported requirements",
        "url": "https://github.com/KhronosGroup/glTF-Asset-Generator#readme"
      },
      {
        "label": "Negative test output",
        "url": "https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Negative"
      },
      {
        "label": "MIT license text",
        "url": "https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/LICENSE"
      }
    ],
    "aiUseNote": "Use the generated pairs as labelled pass/fail fixtures for an importer: Positive files must load, Negative files must be rejected with a specific diagnostic. A passing import does not prove full glTF conformance.",
    "testTasks": [
      "Load every Positive case in one importer and record unsupported features without treating a warning as a crash.",
      "Check that Negative cases fail with an actionable error rather than silently producing a broken scene."
    ],
    "setup": [
      "Pin a repository commit and copy the Output/Positive and Output/Negative directories into a versioned fixture.",
      "Record the importer version, expected outcome for each case and the exact error text for negative cases."
    ],
    "limitations": "Coverage is a work in progress and the README states more requirements are coming. The C# project targets a Visual Studio / .NET workflow; no generator was built or run locally in this review.",
    "reviewed": "2026-11-22"
  },
];
