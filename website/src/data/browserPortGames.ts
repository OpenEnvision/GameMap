// Explicit source and project references; no games or proprietary assets executed.
import type { LearningPath } from './learningTypes';
export const browserPortGames: LearningPath[] = [
  {
    "id": "browser-port-02",
    "title": "GTA Vice City",
    "description": "GTA: Vice City browser wrapper using an Emscripten C++ engine and local OPFS storage. README identifies re3/reVC lineage and requires legitimate original game data. Wrapper and engine source scopes are distinct.",
    "engine": "re3/reVC lineage via reVCDOS; Emscripten/WebAssembly, Vite browser wrapper",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://github.com/joncodeofficial/gta-vice-city-wasm",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Inspect the identified source reference",
      "url": "https://github.com/joncodeofficial/gta-vice-city-wasm",
      "kind": "source",
      "note": "Reference only; no play link published. Supply lawfully obtained Vice City data. README features (touch, offline storage, saves) are author claims, not runtime verification. Wrapper source is not proof of complete corresponding engine source."
    },
    "source": {
      "label": "Source reference, scope unverified",
      "url": "https://github.com/joncodeofficial/gta-vice-city-wasm",
      "scope": "unverified-project",
      "note": "Technique: Browser source-port wrapper over re3/reVC reverse-engineered engine, via reVCDOS/DOS Zone; not emulation or original commercial source. Source boundary: Fetched repository README only; browser-client source described separately from external WASM engine lineage. No source-tree/build/completeness audit. Code: README claims MIT for this repository source only; upstream engine licensing, source coverage and buildability not audited. Assets: README explicitly excludes models, textures, audio and maps and requires a legitimate owned copy. No rights to distribute game.tar.gz established; no archive fetched. Access/runtime: Public README accessible; author lists browser deployment, not fetched or tested; original data required. Conditions: Reference only; no play link published. Supply lawfully obtained Vice City data. README features (touch, offline storage, saves) are author claims, not runtime verification. Wrapper source is not proof of complete corresponding engine source."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://github.com/joncodeofficial/gta-vice-city-wasm",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://api.github.com/repos/joncodeofficial/gta-vice-city-wasm/readme https://api.github.com/repos/joncodeofficial/gta-vice-city-wasm/readme https://api.github.com/repos/joncodeofficial/gta-vice-city-wasm/readme"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-02",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": null
    }
  },
  {
    "id": "browser-port-03",
    "title": "Quake 3",
    "description": "Quake III multiplayer reference: the supplied host credits Q3JS; Q3JS describes an ioquake3 build using official demo data.",
    "engine": "ioquake3 / Q3JS",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://github.com/lklacar/q3js",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Inspect the identified source reference",
      "url": "https://github.com/lklacar/q3js",
      "kind": "source",
      "note": "Multiplayer/demo scope only; do not join public servers. Demo assets are not free-licensed merely because the engine is GPL. Public text only; no runtime, asset loading, account access or multiplayer participation tested."
    },
    "source": {
      "label": "Source reference, scope unverified",
      "url": "https://github.com/lklacar/q3js",
      "scope": "unverified-project",
      "note": "Technique: Source port (ioquake3-based browser build; not evidence of decompilation or reverse engineering). Source boundary: Q3JS repository explicitly linked by project homepage; repository contents and deployed revision not audited. Demo scope, not the full retail release. Code: Project homepage states GPL-licensed ioquake3 engine build; frontend license and exact revision unverified. Assets: Original commercial game data and trademarks remain separately restricted; engine availability does not grant asset rights. Access/runtime: Landing/reference text accessible; runtime untested. Not a verified play link. Conditions: Multiplayer/demo scope only; do not join public servers. Demo assets are not free-licensed merely because the engine is GPL. Public text only; no runtime, asset loading, account access or multiplayer participation tested."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://github.com/lklacar/q3js",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://q3.pieter.com/ https://q3js.com/"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-03",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": null
    }
  },
  {
    "id": "browser-port-06",
    "title": "Skate 3 Rust/Bevy reimplementation",
    "description": "Identified Skate 3 Rust/Bevy reimplementation with skating, tricks and map support; gameplay parity is work in progress. Current README documents Windows builds, not this claimed browser edition, so browser-reference eligibility remains unresolved.",
    "engine": "Rust / Bevy; SDL3 input",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://github.com/SK8-ENGINE/skate-3-rust-engine",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Inspect the identified source reference",
      "url": "https://github.com/SK8-ENGINE/skate-3-rust-engine",
      "kind": "source",
      "note": "Candidate for this browser intake: exact browser edition not established. Experimental gameplay lacks parity; original commercial data and conversion required. No native build, conversion, download or game execution performed. The linked project is an experimental native edition."
    },
    "source": {
      "label": "Source reference, scope unverified",
      "url": "https://github.com/SK8-ENGINE/skate-3-rust-engine",
      "scope": "unverified-project",
      "note": "Technique: Rust/Bevy mechanics reimplementation informed by reverse-engineering research; current rewrite not established as static recompilation or Xbox 360 emulation. Source boundary: README describes Rust rewrite and historical recompilation separately; no source-tree/build audit, no full reproduction claim. Code: README states GPL-3.0-only for original project code unless noted; third-party/vendor code retains separate licenses. License file not fetched. Assets: Skate 3 assets explicitly not included. Setup requires owned Xbox 360 ISO or extracted default.xex/data; converted game assets remain proprietary. GPL does not grant EA or third-party asset rights. Access/runtime: Public source README accessible; documents experimental Windows distribution, not a verified browser entry. Conditions: Candidate for this browser intake: exact browser edition not established. Experimental gameplay lacks parity; original commercial data and conversion required. No native build, conversion, download or game execution performed. The linked project is an experimental native edition."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://github.com/SK8-ENGINE/skate-3-rust-engine",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://api.github.com/repos/SK8-ENGINE/skate-3-rust-engine/readme https://api.github.com/repos/SK8-ENGINE/skate-3-rust-engine/readme https://api.github.com/repos/SK8-ENGINE/skate-3-rust-engine/readme https://api.github.com/repos/SK8-ENGINE/skate-3-rust-engine/readme https://api.github.com/repos/SK8-ENGINE/skate-3-rust-engine/readme"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-06",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": null
    }
  },
  {
    "id": "browser-port-08",
    "title": "Diablo",
    "description": "Diablo 1 browser port based on Devilution, with separate engine-module source repository. README offers shareware spawn.mpq mode; full Diablo requires the user’s own DIABDAT.MPQ. No Hellfire or DevilutionX scope inferred.",
    "engine": "Devilution-derived C/C++ engine compiled to WebAssembly with JS interface",
    "track": "2d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://github.com/d07RiV/diabloweb",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Inspect the identified source reference",
      "url": "https://github.com/d07RiV/diabloweb",
      "kind": "source",
      "note": "Text reference only; no demo or play link published. Shareware and full-owned-data modes must remain distinct. No asset rights, complete source, save compatibility or actual operation verified."
    },
    "source": {
      "label": "Source reference, scope unverified",
      "url": "https://github.com/d07RiV/diabloweb",
      "scope": "unverified-project",
      "note": "Technique: Browser source port of Devilution engine reconstruction/decompilation lineage; WebAssembly compilation is its deployment mechanism, not evidence of emulation. Source boundary: Fetched d07RiV/diabloweb README identifies https://github.com/d07RiV/devilution as separate WebAssembly module source. That repository was not fetched or audited. Code: No license file fetched; wrapper and separate engine-module source have distinct scopes. No blanket free-software or commercial-code rights claim. Assets: README says hosted shareware spawn.mpq; shareware is not unrestricted assets. Full commercial DIABDAT.MPQ must come from an owned original copy. No MPQ downloaded. Access/runtime: Public README accessible; author identifies a hosted shareware deployment, not fetched or tested. Conditions: Text reference only; no demo or play link published. Shareware and full-owned-data modes must remain distinct. No asset rights, complete source, save compatibility or actual operation verified."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://github.com/d07RiV/diabloweb",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://api.github.com/repos/d07RiV/diabloweb/readme https://api.github.com/repos/d07RiV/diabloweb/readme https://api.github.com/repos/d07RiV/diabloweb/readme"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-08",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": null
    }
  },
  {
    "id": "browser-port-12",
    "title": "Urban Terror browser reference",
    "description": "Urban Terror multiplayer browser reference, correcting the supplied Unreal Tournament label.",
    "engine": "ioUrbanTerror",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://ut.pieter.com/",
      "kind": "disclosure"
    },
    "demo": {
      "label": "View the observed project page",
      "url": "https://ut.pieter.com/",
      "kind": "reference",
      "note": "Project page. Browser-port source and release links are unavailable in this record."
    },
    "source": {
      "label": "Project reference, corresponding source unverified",
      "url": "https://ut.pieter.com/",
      "scope": "project-reference",
      "note": "Technique: ioUrbanTerror engine compiled to WebAssembly; source port, not Unreal Tournament. Source boundary: Landing page identifies ioUrbanTerror and FrozenSand; exact browser-port source repository not linked/verified. Code: Exact deployed code revision and license files were not inspected; no complete-source or redistribution claim. Assets: Landing page credits ownership to FrozenSand; no asset redistribution permission established. Access/runtime: Landing/reference text accessible; runtime untested. Not a verified play link. Conditions: Only Urban Terror multiplayer is identified, not Unreal Tournament. First load downloads game data; do not launch. FrozenSand assets remain separately restricted. Public text only; no runtime, asset loading, account access or multiplayer participation tested."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://ut.pieter.com/",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://ut.pieter.com/ https://ut.pieter.com/"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-12",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": "https://ut.pieter.com/"
    }
  },
  {
    "id": "browser-port-15",
    "title": "Quake 1",
    "description": "QuakeWorld multiplayer browser reference, not a verified full Quake single-player release.",
    "engine": "FTE QuakeWorld",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://q1.pieter.com/",
      "kind": "disclosure"
    },
    "demo": {
      "label": "View the observed project page",
      "url": "https://q1.pieter.com/",
      "kind": "reference",
      "note": "Project page. Browser-port source and release links are unavailable in this record."
    },
    "source": {
      "label": "Project reference, corresponding source unverified",
      "url": "https://q1.pieter.com/",
      "scope": "project-reference",
      "note": "Technique: FTE QuakeWorld browser engine port; no decompilation claim. Source boundary: Landing page credits FTE QuakeWorld and links https://www.fteqw.org; deployed source repository/revision unverified. Code: Exact deployed code revision and license files were not inspected; no complete-source or redistribution claim. Assets: Original commercial game data and trademarks remain separately restricted; engine availability does not grant asset rights. Access/runtime: Landing/reference text accessible; runtime untested. Not a verified play link. Conditions: Multiplayer scope, advertised up to eight players; no public sessions. Full campaign and supplied asset edition unverified. Public text only; no runtime, asset loading, account access or multiplayer participation tested."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://q1.pieter.com/",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://q1.pieter.com/ https://q1.pieter.com/"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-15",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": "https://q1.pieter.com/"
    }
  },
  {
    "id": "browser-port-17",
    "title": "Halo CE Mobile",
    "description": "Halo Mobile README describes a phone-focused Halo CE browser/PWA port, touch controls, local storage, and optional separately hosted map streaming. Campaign and System Link support are author claims only; compatible authorized Xbox data required.",
    "engine": "Halo CE decompilation; Emscripten/WebAssembly, WebGL 2, OffscreenCanvas, OPFS",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://github.com/OMG-Guest/Halo-Mobile",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Inspect the identified source reference",
      "url": "https://github.com/OMG-Guest/Halo-Mobile",
      "kind": "source",
      "note": "Source reference only, entryUrl withheld. Requires authorized compatible game data. Claimed campaign, saves, touch support and System Link not tested. No full campaign/completeness or rights certification. Experimental presentation modes and third-party service dependencies may differ."
    },
    "source": {
      "label": "Source reference, scope unverified",
      "url": "https://github.com/OMG-Guest/Halo-Mobile",
      "scope": "unverified-project",
      "note": "Technique: Mobile-focused browser source port of Halo CE decompilation lineage; Emscripten/WebAssembly/WebGL 2, not established as emulation or fan remake. Source boundary: README only; describes source/, browser bridge and launcher, but complete buildable corresponding source not audited. Credits halo-ce-universal and other upstreams; exact development-build inheritance not independently audited for this fork. Code: README badge says CC0 source license but also requires preserving upstream attribution/licenses and reading LICENSE.md. Actual license file and proprietary decompilation rights not audited; no blanket CC0 or rights clearance claimed. Assets: README excludes Halo maps, disc images, saves, credentials and generated builds. Optional range-map hosting is separate and does not establish distribution rights; no map services requested. Access/runtime: Public README accessible; no deployed mobile entry independently identified or tested. Conditions: Source reference only, entryUrl withheld. Requires authorized compatible game data. Claimed campaign, saves, touch support and System Link not tested. No full campaign/completeness or rights certification. Experimental presentation modes and third-party service dependencies may differ."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://github.com/OMG-Guest/Halo-Mobile",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://api.github.com/repos/OMG-Guest/Halo-Mobile/readme https://api.github.com/repos/OMG-Guest/Halo-Mobile/readme https://api.github.com/repos/OMG-Guest/Halo-Mobile/readme"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-17",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": null
    }
  },
  {
    "id": "browser-port-19",
    "title": "Return to Castle Wolfenstein",
    "description": "Return to Castle Wolfenstein multiplayer browser reference; landing text advertises approximately 380 MB first-load game data.",
    "engine": "iortcw + Wwasm (page spelling)",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://rtcw.pieter.com/",
      "kind": "disclosure"
    },
    "demo": {
      "label": "View the observed project page",
      "url": "https://rtcw.pieter.com/",
      "kind": "reference",
      "note": "Project page. Browser-port source and release links are unavailable in this record."
    },
    "source": {
      "label": "Project reference, corresponding source unverified",
      "url": "https://rtcw.pieter.com/",
      "scope": "project-reference",
      "note": "Technique: iortcw engine compiled to WebAssembly; source port. Source boundary: Only landing-page engine attribution verified; deployed source and asset package not inspected. Code: Exact deployed code revision and license files were not inspected; no complete-source or redistribution claim. Assets: Original commercial game data and trademarks remain separately restricted; engine availability does not grant asset rights. Access/runtime: Landing/reference text accessible; runtime untested. Not a verified play link. Conditions: Multiplayer only; no single-player completeness claim. Do not fetch the advertised game-data load or join a match. Public text only; no runtime, asset loading, account access or multiplayer participation tested."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://rtcw.pieter.com/",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://rtcw.pieter.com/ https://rtcw.pieter.com/"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-19",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": "https://rtcw.pieter.com/"
    }
  },
  {
    "id": "browser-port-21",
    "title": "Half-Life / CS 1.6",
    "description": "WebXash documents Half-Life 1 and Counter-Strike 1.6 using user-owned game files; the author explicitly identifies their work as a frontend.",
    "engine": "WebXash / Xash3D-FWGS",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://github.com/x8BitRain/webXash",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Inspect the identified source reference",
      "url": "https://github.com/x8BitRain/webXash",
      "kind": "source",
      "note": "Owned valve/cstrike files required. Mod compatibility is limited, mobile keyboard/mouse caveats apply, CS saves disabled, internet server discovery unavailable and direct websocket server setup required. Published frontend URL is README-only evidence, not a validated play link. Public text only; no runtime, asset loading, account access or multiplayer participation tested."
    },
    "source": {
      "label": "Source reference, scope unverified",
      "url": "https://github.com/x8BitRain/webXash",
      "scope": "unverified-project",
      "note": "Technique: WebXash frontend for a Xash3D-FWGS Emscripten engine port/reimplementation; not complete original GoldSrc or commercial game source. Source boundary: Frontend README fetched via GitHub API. It links https://github.com/yohimik/webxash3d-fwgs as engine upstream; that upstream was not fetched. A related swtkiptr fork README was inspected, not substituted as official upstream. Code: Exact deployed code revision and license files were not inspected; no complete-source or redistribution claim. Assets: Original commercial game data and trademarks remain separately restricted; engine availability does not grant asset rights. Access/runtime: Repository README accessible; published https://x8bitrain.github.io/webXash/ not fetched or runtime-verified. Conditions: Owned valve/cstrike files required. Mod compatibility is limited, mobile keyboard/mouse caveats apply, CS saves disabled, internet server discovery unavailable and direct websocket server setup required. Published frontend URL is README-only evidence, not a validated play link. Public text only; no runtime, asset loading, account access or multiplayer participation tested."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://github.com/x8BitRain/webXash",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://api.github.com/repos/x8BitRain/webXash/readme https://api.github.com/repos/x8BitRain/webXash/readme https://api.github.com/repos/x8BitRain/webXash/readme"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-21",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": null
    }
  },
  {
    "id": "browser-port-22",
    "title": "Quake 2",
    "description": "Quake II multiplayer browser reference credited to FTE QuakeWorld; not a verified full campaign edition.",
    "engine": "FTE QuakeWorld",
    "track": "3d",
    "category": "community",
    "aiUse": "Project details from the browser-port directory and linked sources.",
    "steps": [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check runtime requirements and the terms for code, assets, and original game data."
    ],
    "tutorial": {
      "label": "Read the identified project reference",
      "url": "https://q2.pieter.com/",
      "kind": "disclosure"
    },
    "demo": {
      "label": "View the observed project page",
      "url": "https://q2.pieter.com/",
      "kind": "reference",
      "note": "Project page. Browser-port source and release links are unavailable in this record."
    },
    "source": {
      "label": "Project reference, corresponding source unverified",
      "url": "https://q2.pieter.com/",
      "scope": "project-reference",
      "note": "Technique: FTE-based Quake II browser engine port; not established as static recompilation, emulation or decompilation. Source boundary: Landing page attribution only; exact browser source repository and deployed revision not verified. Code: Exact deployed code revision and license files were not inspected; no complete-source or redistribution claim. Assets: Original commercial game data and trademarks remain separately restricted; engine availability does not grant asset rights. Access/runtime: Landing/reference text accessible; runtime untested. Not a verified play link. Conditions: Advertised up to eight-player multiplayer. No public session participation; asset edition and campaign completeness unknown. Public text only; no runtime, asset loading, account access or multiplayer participation tested."
    },
    "evidence": {
      "label": "Read the observed reference and retained research evidence",
      "url": "https://q2.pieter.com/",
      "note": "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd. References: https://q2.pieter.com/ https://q2.pieter.com/"
    },
    "resourceIds": [],
    "intake": {
      "dataset": "browser-port-research.json / structured user intake",
      "rowId": "browser-port-22",
      "sourceDate": "2026-10-25",
      "importedAt": "2026-10-24",
      "sha256": "d0aee2031da132cd71ae75411d969d5186d2507bf724a4575c732e71b15a59bd",
      "verification": "Provided directory; source, release, code and asset licenses not independently rechecked",
      "homepage": "https://q2.pieter.com/"
    }
  }
];
