# GameMap

**Build your next world.**

Awesome AI game development — tools, playable games, code world models, and practical research.

[Explore the website](https://openenvision.github.io/GameMap/) · [中文网站](https://openenvision.github.io/GameMap/zh/) · [Full Awesome List](AWESOME.md) · [Practical guide](docs/practical-guide.md) · [Contribute](CONTRIBUTING.md)

GameMap is an [OpenEnvision](https://openenvision.org/) project connecting an idea to a working game. Find a real example, inspect its source, choose an engine and an agent workflow, then test what you build.

The website offers English and Chinese reading views, engine and access filters, local collections, full-text search, and Game / General display modes. The Markdown guides and structured catalogs can also be read directly in this repository.

## Start with what you want to make

| Your goal | Start here | What you can use |
| --- | --- | --- |
| Build a 2D game | [2D development path](https://openenvision.github.io/GameMap/paths/2d/) | Small game loops, playable references, and complete project source |
| Build a 3D game | [3D development path](https://openenvision.github.io/GameMap/paths/3d/) | Character interaction, scenes, assets, and engine workflows |
| Explore executable worlds | [Code world model path](https://openenvision.github.io/GameMap/paths/world/) | State, actions, persistence, rendering, and evaluation |
| Find a game to study | [Game examples](https://openenvision.github.io/GameMap/examples/) · [Repository guide](docs/tutorials-and-demos.md) | Engine labels, creator build records, play/download links, and game source |
| Find usable research | [Paper List](https://openenvision.github.io/GameMap/papers/) · [Repository research](https://openenvision.github.io/GameMap/research/) | Code and license status, project pages, online demos, and local setup |

## Awesome List highlights

These selections are entry points into the [complete categorized Awesome List](AWESOME.md). Follow each project's own setup and terms; a coding agent, editor bridge, complete game, and research implementation are different things.

### Coding agents, skills, and engine bridges

| Resource | Useful for |
| --- | --- |
| [OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli) · [Claude Code](https://code.claude.com/docs/en/overview) | Reading a game project, implementing changes, running builds, and iterating with tool feedback |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) · [OpenCode](https://opencode.ai/docs/) | Terminal coding workflows, project instructions, and tool integrations; check the supported release and account requirements |
| [MCP for Unity](https://github.com/CoplayDev/unity-mcp) | Community tools for scenes, scripts, assets, and Unity Editor operations |
| [Godot MCP](https://github.com/Coding-Solo/godot-mcp) | Launching Godot projects, inspecting logs, and basic scene operations |
| [Unreal MCP](https://github.com/chongdashu/unreal-mcp) | A community Unreal Editor bridge for actors, Blueprints, and viewport operations |
| [MCP for Blender](https://github.com/ahujasid/mcp-for-blender) | Community tools for modeling, materials, Python operations, and visual feedback |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Browser interaction and feedback for web games and their interfaces |
| [Level-design skill](docs/level-design-skill.md) | Level briefs, blockouts, encounters, and playtest reviews; includes references and reusable templates |

**Go deeper:** [Agent toolkit](https://openenvision.github.io/GameMap/agents/) · [Coding agents × game code](docs/coding-agent-game-code.md) · [Full agent list](AWESOME.md#agents).

### Engines, rendering, and asset production

| Resource | Role and starting point |
| --- | --- |
| [Godot](https://docs.godotengine.org/en/stable/) | 2D/3D game engine with [complete official demo projects](https://github.com/godotengine/godot-demo-projects) |
| [Unity](https://docs.unity3d.com/Manual/index.html) | Game engine; [2D tech demos](https://github.com/Unity-Technologies/2d-techdemos) provide project references |
| [Unreal Engine](https://dev.epicgames.com/documentation/en-us/unreal-engine) | Game engine for 3D projects, editor tooling, and production pipelines |
| [Phaser](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game) | 2D browser-game framework with [source examples](https://github.com/phaserjs/examples) |
| [Three.js](https://github.com/mrdoob/three.js) · [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) | Web 3D rendering and React scene composition; gameplay systems are supplied by the project |
| [Blender](https://github.com/blender/blender) | 3D creation, animation, and asset preparation, including [glTF export tooling](https://github.com/KhronosGroup/glTF-Blender-IO) |
| [TRELLIS](https://github.com/microsoft/TRELLIS) | Generated 3D representations and textured mesh export; check game-ready geometry, materials, and collision separately |
| [Holodeck](https://github.com/allenai/Holodeck) | Text-guided indoor scene generation for AI2-THOR environments |

**Go deeper:** [Engine ecosystems](AWESOME.md#engines) · [2D tools](AWESOME.md#2d) · [3D tools](AWESOME.md#3d) · [Asset pipeline notes](docs/game-ai-notes.md).

### Playable games with project source

| Game | Engine / renderer | Play or get | Source | Study the workflow |
| --- | --- | --- | --- | --- |
| **Castle Clash Duel** · 2D | Phaser 3 · JavaScript | [Browser game](https://vibe-tiny-swords.vercel.app/) | [Complete project](https://github.com/chongdashu/phaserjs-tinyswords) | [PRD, assets, and agent skills](https://github.com/chongdashu/phaserjs-tinyswords#implementation-with-agent-skills) |
| **Tower of Time** · 2D | Phaser 3 · TypeScript | [Browser game](https://m4v3k.itch.io/tower-of-time) | [Complete project](https://github.com/maciej-trebacz/tower-of-time-game) | [Creator's prompt log](https://github.com/maciej-trebacz/tower-of-time-game/blob/main/PROMPTS.md) |
| **Katana Kitsune: Prototype** · 2D | Godot 4.7 · GDScript | [Browser game](https://9-k9.itch.io/katanakitsune) | [Complete project](https://github.com/9-K9/KatanaKitsune) | [Game and asset-pipeline notes](https://github.com/9-K9/KatanaKitsune#readme) |
| **Raccoon Heist** · 3D | Three.js · JavaScript | [Browser game](https://simonw.github.io/raccoon-heist/) | [Complete project](https://github.com/simonw/raccoon-heist/) | [Creator's build walkthrough](https://simonwillison.net/2026/Aug/5/raccoon-heist/) |
| **Polar Icecapade** · 3D | Godot 4.6 · GDScript | [Browser / downloads](https://evankurtzart.itch.io/polar-icecapade) | [Complete project](https://github.com/afenkurtz/Big-Mode-Game-Jam-2026/tree/main/slick) | [Team's development and asset breakdown](https://evankurtzart.itch.io/polar-icecapade) |
| **morBreaker** · 2D | Unity 6 · URP · C# | [Downloadable release](https://github.com/KingMordas/mor-breaker/releases/tag/v1.2.0) | [Complete project](https://github.com/KingMordas/mor-breaker) | [Unity and Claude Code build account](https://github.com/KingMordas/mor-breaker#built-with-claude-code-) |

The [full game guide](docs/tutorials-and-demos.md) contains **88 AI-assisted game builds**, with creator evidence and separate play/run and source links. Complete project source describes the released project's scope; code, art, music, and third-party characters may have different reuse terms. Polar Icecapade's author recommends downloadable builds for performance and does not recommend mobile play.

Prefer an engine foundation first? Start with Godot's [Dodge the Creeps](https://godotengine.github.io/godot-demo-projects/2d/dodge_the_creeps/) ([source](https://github.com/godotengine/godot-demo-projects/tree/master/2d/dodge_the_creeps)) or [Squash the Creeps](https://godotengine.github.io/godot-demo-projects/3d/squash_the_creeps/) ([source](https://github.com/godotengine/godot-demo-projects/tree/master/3d/squash_the_creeps)). These are official engine learning projects, presented separately from AI-created cases.

### Code world models and interactive worlds

| Research | What it contributes | Released access |
| --- | --- | --- |
| [GIF-MCTS / Code World Models Benchmark](https://arxiv.org/abs/2405.15383) | Generates executable transition, reward, and termination models with search and test feedback | [Implementation and CWMB](https://github.com/nicoladainese96/code-world-models) · [Project](https://sites.google.com/view/code-world-models/home) |
| [Code World Model: Coding Agent as World Brain](https://arxiv.org/abs/2608.25927) | Executable state and proxy controls drive a video renderer | [Inference components](https://github.com/buaacyw/code-world-model) · [Recorded demos](https://buaacyw.github.io/cwm/); underlying game/proxy-generation pipeline is not fully released |
| [SolarRenderer](https://enderfga.cn/SolarRenderer/) | Structure-conditioned rendering from engine or agent outputs | [Code](https://github.com/Enderfga/SolarRenderer) · [Weights](https://huggingface.co/Enderfga/SolarRenderer); model and data terms differ from the code license |
| [Oasis](https://oasis-model.github.io/) | Action-conditioned neural video simulation | [Inference code](https://github.com/etched-ai/open-oasis) · [Gated 500M weights](https://huggingface.co/Etched/oasis-500m); the public release differs from the larger hosted experience |

**Go deeper:** [Full world-model list](AWESOME.md#world) · [State, rendering, and release boundaries](docs/world-model-notes.md) · [Project demo gallery](https://openenvision.github.io/GameMap/showcase/). Gallery entries distinguish live experiences from recorded research demonstrations.

### Papers, testing, and shipping

| Collection | What it provides |
| --- | --- |
| [Paper List](https://openenvision.github.io/GameMap/papers/) | **457 academic papers + 26 related sources**, organized by research role. Filter by open-source/public-code status, online or local demo, and project-page availability; practical entries come first by default. |
| [Repository research](https://openenvision.github.io/GameMap/research/) | Repository-level investigation, source evidence, access status, and implementation limits, separate from featured game recommendations. |
| [Testing library](docs/game-testing-library.md) | **36 projects, environments, asset sets, and motion resources**, with setup, code/data licenses, and suggested test tasks. |
| [Game-development evaluation](docs/game-development-evaluation.md) | Separate build success, requested behavior, visual quality, playability, and runtime performance. |
| [Production research](docs/research-index.md) | Engine interfaces, asset handoff, visual feedback, testing, and production work orders. |
| [Publishing platforms](docs/publishing-platforms.md) | Steam, itch.io, browser portals, stores, and distribution-specific release considerations. |

Download the paper catalog as [JSON](data/papers.json) or [BibTeX](website/public/papers.bib). Public code is labeled separately from code with an explicit open-source license; partial implementations, restricted terms, unreleased code, and unverified availability remain visible in the catalog. A recorded video is not counted as an interactive demo.

## Read in Chinese / 中文阅读

[中文网站](https://openenvision.github.io/GameMap/zh/) · [阅读入口](docs/zh/reading-guide.md) · [从想法到可玩原型](docs/zh/practical-guide.md) · [关卡设计技能](docs/zh/level-design-skill.md) · [发布平台](docs/zh/publishing-platforms.md) · [部署指南](docs/zh/deployment.md)

## Run and deploy

Use **Node.js 22.22 or newer**:

```sh
npm ci
npm run dev
```

The site uses Fumadocs, React Router, React, TypeScript, and Vite. It builds to static HTML, CSS, JavaScript, media, and a browser-side search index; hosting the site requires no application backend or API key. External tools and research projects have their own runtime requirements.

### Publish the repository root to GitHub Pages

The repository root contains the **complete static website**: `index.html` is the actual pre-rendered GameMap homepage, accompanied by `assets/`, media, all page folders, and `.nojekyll`. The source code remains alongside these published files. Keep the complete tree together when uploading or pushing the repository.

For the `OpenEnvision/GameMap` project site:

1. Push all repository files, including the generated page and asset folders and `.nojekyll`, to `main`.
2. Open **Settings → Pages → Build and deployment → Source → Deploy from a branch**.
3. Select **main** and **/(root)**, then save. The site will be available at [openenvision.github.io/GameMap/](https://openenvision.github.io/GameMap/).

GitHub Pages serves this committed homepage and its assets directly. To inspect the same root website locally, run `npm run preview` and open the URL printed in the terminal.

After editing source content or application code, rebuild and validate before uploading the updated files:

```sh
npm run build
npm run check
npm run check:build
npm run preview
```

A build refreshes both the repository-root website and `dist/`. The default project path is `/GameMap/`. If the GitHub repository has a different name, rebuild with its exact path, for example `PAGES_BASE_PATH=/NewName/ npm run build`; use `PAGES_BASE_PATH=/ npm run build` for a user/organization site or a domain hosted at `/`. Upload all updated generated files together so HTML, JavaScript, and asset versions stay in sync.

### Optional build and release workflows

The [GitHub Actions workflow](https://github.com/OpenEnvision/GameMap/blob/main/.github/workflows/deploy-pages.yml) can also rebuild and deploy the site from source. To use it, select **Settings → Pages → Source → GitHub Actions**, then run **Deploy GameMap to GitHub Pages** manually. For automatic deployment on pushes to `main`, also create a repository Actions variable named `PAGES_USE_ACTIONS` with value `true`. This optional workflow publishes the complete `dist/` artifact.

For a portable upload package, run `npm run package:pages` after building. It produces `release/GameMap-pages.zip` with `index.html` directly at the ZIP root, alongside all required static files. Extract the complete package into the publishing directory. You can also inspect the build directory with `npm run preview -- --root dist`.

See [development and deployment](docs/deployment.md) for custom base paths, validation, browser tests, repository settings, and troubleshooting.

## Contribute and maintain

Add primary sources, runnable examples, corrected access or license information, and evidence-backed production notes. Read the [contribution guide](CONTRIBUTING.md) and [content model](docs/content-model.md) before editing.

| Content | Source of truth |
| --- | --- |
| Resource Awesome List | Resource entries in `data/segments/*.json`; `AWESOME.md` and `data/resources.json` are generated |
| Game examples, agent toolkit, testing, and demo presentation | `website/src/data/` |
| Papers and artifact availability | `data/papers.json` |
| Guides and notes | `docs/` and `docs/zh/` |
| Chinese interface and content overlays | `website/content/i18n/` |

Run `npm run build` after content changes, followed by `npm run check` and `npm run check:build`. The complete resource catalog currently contains **115 entries**. Keep this README selective; put detailed entries and source conditions in the corresponding catalog or guide.

## Attribution and reuse

Projects, datasets, model weights, screenshots, recordings, and other media retain their authors' rights and individual terms. Source review establishes what an author publishes; independent reproduction requires a recorded run. Links to playable games and setup instructions do not imply every external project has been run locally.

The bundled, unofficial Level Design Book adaptation uses **CC BY-NC-SA 4.0**. Preserve its [attribution, license, and third-party exceptions](docs/skills/level-design/LICENSE.md), including the noncommercial and share-alike conditions. See [media sources](docs/media-sources.md) and [icon sources](docs/icon-sources.md) for asset attribution.

© 2026 [OpenEnvision](https://openenvision.org/).
