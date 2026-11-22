# GameMap

**Tencent IEG · AI 游戏开发**

一份经过编辑策展、以一手证据为支撑的 AI 游戏开发图谱，汇集工具、可玩项目、研究论文与生产工程工作流。

[网站](https://openenvision.github.io/GameMap/) · [资源目录](reference/catalog.md) · [文档](guides/practical-guide.md) · [中文指南](guides/reading-guide.md) · [贡献指南](contributing.md)

## 摘要

**GameMap** 是一份经过人工审阅、直连一手来源的 AI 游戏开发生态图谱，面向希望从概念原型走向可复现、可游玩、可交付游戏项目的游戏工程师、独立开发者、技术美术与 AI 研究者。

与未经核验的链接汇总或营销发布页不同，GameMap 在清晰的证据与许可边界下组织编码智能体、引擎集成、2D 与 3D 资产管线、可玩游戏案例、世界模型、学术论文与生产工程笔记。所有公开条目均提供中英双语静态预渲染页面、浏览器端离线全文检索与可下载的机读数据产物。

线上站点地址：

```text
https://openenvision.github.io/GameMap/
```

代码仓库：

```text
https://github.com/OpenEnvision/GameMap
```

## 目录

- [动机](#motivation)
- [GameMap 的定位](#what-gamemap-is)
- [收录范围](#scope)
- [编辑与证据标准](#editorial-standard)
- [信息架构](#information-architecture)
- [元数据模型](#metadata-model)
- [本地开发](#local-development)
- [私有内容 Studio](#private-content-studio)
- [Git 目录导入](#git-catalog-imports)
- [部署与社区模式](#deployment-and-community)
- [质量保障](#quality-assurance)
- [署名与复用](#attribution-and-reuse)
- [引用方式](#citation)

## 动机

AI 辅助游戏开发涉及多种分散在不同载体中的资料：面向游戏引擎的编码智能体与 MCP 桥接、程序化与生成式资产管线、附带完整源码的浏览器与桌面可玩游戏、世界模型论文，以及覆盖验证、运行时性能与 API 条款的生产复盘笔记。

这一领域演进迅速，并将成熟工具、局部研究代码、录屏演示与营销预览混杂在一起。GameMap 将其整理为结构化、经源码核查的图谱，帮助读者在投入生产工作流之前迅速确认哪些项目真正可玩、哪些公开了完整源码、哪些可本地运行或依赖托管 API，以及尚存哪些使用限制。

## GameMap 的定位

GameMap 是：

- 一份经过人工审阅、直连一手来源的图谱，覆盖 AI 游戏开发工具、可玩游戏案例、研究论文、测试资源与工程指南。
- 一个基于 Fumadocs、React Router、TypeScript 和 Vite 构建的中英双语静态文档与发现站点，内置浏览器端全文检索。
- 一套双工作流内容系统，将 Git 驱动的静态发布管线与可选的本地 PostgreSQL/Supabase 编写 Studio 及可选社区功能结合起来。
- 一份强调证据边界的参考资料，明确区分一手源码核查与本地复现，以及可玩构建与录屏视频。

GameMap 不是：

- 自动抓取器、资讯流或未经筛选的链接大杂烩。
- 在不可比的任务或硬件条件下对模型、引擎或工作室做排名的榜单。
- 对第三方项目的独立试玩背书、安全认证或商业许可授权。
- 替代读者亲自查阅原始仓库、论文、模型卡与上游许可证的快捷方式。

## 收录范围

### 资源分类体系

结构化目录条目按六个核心分类组织：

| 分类 | 范围 | 指南 |
| --- | --- | --- |
| `agents` | 编码智能体、可复用技能包、MCP 服务器与引擎控制闭环。 | [智能体、技能与 MCP](ecosystem/agents.md) |
| `engines` | 游戏引擎集成、编辑器桥接、运行时 API 与项目基础模板。 | [游戏引擎](ecosystem/engines.md) |
| `2d` | 2D 游戏框架、精灵与动画工作流，以及浏览器或桌面原型。 | [2D 与 3D 开发](ecosystem/2d-3d-development.md) |
| `3d` | 3D 场景构建、网格与贴图管线、骨骼绑定及 WebGL/Three.js 工具链。 | [2D 与 3D 开发](ecosystem/2d-3d-development.md) |
| `production` | 工作室工程实践、资产校验、API 边界、调试契约与工单模板。 | [生产研究总览](production/overview.md) |
| `world` | 交互式世界模型、神经渲染、动作条件视频与基于代码的世界。 | [世界模型](ecosystem/world-models.md) |

### 集合与文档支柱

除资源目录外，GameMap 还维护多个独立集合与长篇指南：

| 支柱 | 收录内容 | 入口 |
| --- | --- | --- |
| 资源目录 | 可检索、可筛选的工具、框架、基准、论文与文档条目。 | [完整资源目录](reference/catalog.md) |
| 游戏与工作流 | 浏览器与桌面可玩项目、创作者构建证据与完整游戏源码。 | [教程与演示](tutorials-and-demos.md) |
| 生产与测试 | 实用引擎接口、评估方法、测试起步套件与证据边界。 | [测试参考库](reference/testing-library.md) |
| 仓库研究 | 经审阅的开源游戏与智能体候选仓库台账，与精选卡片分离。 | [仓库研究台账](cadle-repositories.md) |
| 关卡设计技能 | 包含空间布局参考资料与可复用评审模板的完整技能包。 | [关卡设计指南](guides/level-design.md) |

## 编辑与证据标准

候选资源、游戏与研究笔记在收录前均按五个维度核查：

| 维度 | 核心核查问题 |
| --- | --- |
| 一手来源证据 | 结论是否由作者仓库、论文、官方文档、模型卡或创作者记录支撑，而非二手转述？ |
| 验证边界 | 条目是否清晰区分一手源码核查（`verified`）与附带命令、版本和硬件记录的实际复现？ |
| 可玩性与构建证明 | 可玩演示、可下载构建、录屏视频与纯源码仓库是否明确区分，不把预览混同为可玩游戏？ |
| 许可与来源清晰度 | 代码、模型权重、数据集与第三方媒体是否作为各自独立的复用边界跟踪，并链接到上游条款？ |
| 分类契合度 | 条目是否准确映射到规范分类、阶段、维度与稳定的 `kind:id` 标识，而不通过重复录入虚增数量？ |

研究候选不会被静默提升为精选资源或已核验的可玩案例，普通引擎基础项目也不会被标注为 AI 创作游戏。完整字段规范与证据细则见[贡献指南](contributing.md)。

## 信息架构

### 公共网站路由

所有公共路由均在中英双语（`/` 与 `/zh/`）下静态预渲染：

| 路由 | 用途 |
| --- | --- |
| `/` | 图谱概览、精选可玩案例及各集合入口。 |
| `/resources/` | 支持检索、筛选与浏览器本地收藏夹的资源目录。 |
| `/examples/` | 附带创作者证据与构建链接的 2D、3D、Three.js 及 Game Jam 可玩项目。 |
| `/papers/` | 链接至 arXiv、项目主页与开源代码的研究论文目录。 |
| `/agents/` | 编码智能体、MCP 集成与游戏开发技能工具包。 |
| `/testing/` | 测试起步项目、环境、素材包与评估参考。 |
| `/research/` | 保留完整候选成员与审阅状态的仓库研究台账。 |
| `/docs/` | 预渲染的 Fumadocs 指南、工程笔记、目录参考与来源署名。 |

### 仓库目录结构

| 路径 | 职责与归属 |
| --- | --- |
| `data/segments/` | 检入 Git 的分片 JSON 数据，涵盖资源、论文、Three.js 游戏、Game Jam 台账、媒体与仓库研究。 |
| `docs/` | 长篇英文指南（`docs/`）、完整中文译文（`docs/zh/`）以及关卡设计技能包（`docs/skills/`）。 |
| `website/app/` | React Router 路由、界面组件、社区客户端模块与样式。 |
| `website/content/` | Zod 运行时契约（`contracts.ts`）、数据模型、注册表、站点路由、分类法与国际化覆盖层。 |
| `website/src/data/` | 供静态构建使用的类型化目录模块与精选录屏数据。 |
| `website/public/` | 原始标志、实机截图、页面封面、技能归档包与生成的公开下载文件。 |
| `studio/` | 私有本地内容编写工作台（与公共网站分开构建和运行）。 |
| `scripts/` | 构建生成器（`build/`）、校验器（`check/`）、受限导入器（`import/`）、媒体采集脚本（`media/`）与平台 CLI（`platform/`）。 |
| `supabase/` | 按顺序编号的 PostgreSQL/Supabase 迁移（`0001`–`0031`）与可选直连模式 SQL（`direct-mode/`）。 |
| `tests/` | 单元测试（`unit/`）、Playwright 网页与发布套件（`e2e/`、`release/`）、Studio 测试（`studio/`）及本地 Supabase 集成测试（`local/`）。 |

## 元数据模型

结构化资源遵循 `website/content/contracts.ts` 中声明的版本化契约，并在 Git 输入与数据库修订两端接受校验。`data/segments/*.json` 中的每个分片都以稳定、手工编排的 `id` 存储记录：

```json
{
  "id": "example-resource",
  "name": "Official Project Name",
  "category": "2d",
  "type": "framework",
  "summary": "One sentence explaining the problem it solves.",
  "detail": "Describe inputs, outputs, relevant stages, and key limitations. Distinguish released artifacts from planned work.",
  "url": "https://example.org/official-project",
  "links": [{ "label": "Code", "url": "https://example.org/official-code" }],
  "tags": ["program-synthesis"],
  "stages": ["plan", "code", "test"],
  "dimensions": ["2d"],
  "year": 2026,
  "verified": "2026-10-18"
}
```

权威模式定义、渲染覆盖保证、一对多录屏模型与双语指纹校验规则见[内容模型与覆盖契约](project/content-model.md)。

## 本地开发

GameMap 需要 **Node.js 22.22 或更高版本** 。本地内容开发使用 PostgreSQL/Supabase。启动 Docker Desktop 后运行：

```sh
npm ci
npm run local:start
npm run local:migrate
npm run local:setup
npm run dev
```

在私有 Studio（`npm run studio:dev`）中编辑结构化内容。网站预览每个数据库条目的当前编辑修订，包括草稿，并在保存后刷新。页面、搜索、译文、下载和上传媒体使用同一份工作数据。长篇 Markdown 与界面代码仍保留在 Git 中。

已有目录可运行 `npm run local:import` 查看需要补入、合并或审阅的 Git 记录。`npm run local:import -- --apply` 补入缺失记录，并把 Git 的修改合并到已有记录，保存为草稿：数据库编辑保持不变，两边改法不同的字段列入待审清单。报告保存在 `.build/catalog-local/imports/`。若需将已批准的仅数据库记录与已核验媒体导回 Git，请运行 `npm run local:export-git`。

不连接数据库、仅预览 Git 生产来源时，使用 `npm run dev:git`。若需在本地复现 GitHub Pages 静态子路径：

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
npm run preview
```

公共网站仍是使用 Fumadocs、React Router、TypeScript 和 Vite 构建的静态站点。生产构建和 GitHub Pages 仍由 Git 驱动，本地草稿不会发布。完整构建与预览说明见[开发与部署](project/deployment.md)。

## 私有内容 Studio

[内容平台](project/content-platform.md)包含类型化编辑表单、可信验证器、修订与翻译审阅、受保护的媒体上传和不可变发布导出。

```sh
# Start Docker Desktop first. These wrappers never connect to a cloud project.
npm run local:start
npm run local:setup
npm run studio:dev
```

本地账户密码保存在被忽略的 `.build/catalog-local/access.json` 中；设置过程会将内容以草稿形式导入，并写入包含受限数据库登录信息的私有 `.env`。`npm run test:local` 使用明确的本地测试批准而非生产编辑决策，测试真实的 Supabase Auth、PostgREST 与 PostgreSQL 以及独立的恢复探针。`npm run local:stop` 会停止服务，同时保留数据。

Studio 与公共网站分开运行。未配置时，它显示设置说明，而非演示登录入口。服务器凭据和 Auth 令牌绝不会进入浏览器构建包。生产 TLS、低内存上传策略、受限数据库凭据、持久化媒体和可移植导出见该指南。

公共网站 **尚未切换到数据库发布** 。在切换门槛通过之前，Git 仍是其默认来源；Studio 从不部署或激活发布。已审阅的包已经可以通过隔离的 `site:build` / `site:verify` 路径构建，包括仅存在于数据库中的记录和上传媒体，而不改变检出目录的 `dist/`。现有 Pages 工作流仅发布 `dist/`，不发布私有 Studio 或私有快照产物。

## Git 目录导入

检入的目录是当前生产输入与初始导入来源，不是本地 Studio 的编辑存储。后续本地编写使用 Studio 或数据库导入器；来源补录不会覆盖数据库修订。

Examples 同时收录普通游戏与有证据支持的 AI 辅助项目。Game Jam 条目需要真实游戏源码、作者提供的可玩或可下载发布链接，以及一手来源证据。复用源码或素材前，请查阅项目许可。优先选择 Godot 4 与 2D 项目，但不设为强制要求。

```sh
# Import bounded research reports; re-running preserves existing reviewed games.
npm run examples:import -- --reports /path/to/reviewed-json-reports
npm run test:examples:import
```

`data/segments/jam-games.json` 保留已收录记录、待核实候选、来源摘录、版本与许可不确定性，以及去重决定。同一份记录以 `website/public/jam-discovery.json` 公开发布；`website/src/data/jamGames.ts` 由它生成。导入时使用标记为 `accepted` 的记录。游戏案例列出各作品的源码及已知的发布版本。现有 AI 工作流指南仍是更广泛 Examples 目录中聚焦 AI 的子集。

不要求游戏必须能在浏览器中运行：作者发布的桌面构建或明确提供的 Steam 演示版可以使用 `download`，并应区分免费演示版与付费完整版。`/releases` 限制只针对 GitHub 托管的下载网址，不排除 itch.io 或官方游戏下载页。仓库根目录、源码归档和视频不等于游戏构建。

## 部署与社区模式

GameMap 支持三种渐进式部署模式，默认静态构建不依赖运行时服务器或任何密钥：

| 模式 | 工作流或入口 | 基础设施 | 能力 |
| --- | --- | --- | --- |
| 纯静态 GitHub Pages（默认） | `.github/workflows/deploy-pages.yml` | 仅 GitHub Pages | 中英双语预渲染站点、离线搜索、可下载 JSON/Markdown 目录，零后端。 |
| 零服务器混合社区模式 | `.github/workflows/deploy-pages-community.yml` | GitHub Pages + Supabase Cloud | 通过 `supabase/direct-mode/enable-supabase-direct.sql`（`npm run community:direct-sql`）启用邮箱/GitHub 登录、五星评分、评论、举报、截图投稿与浏览器端审核。 |
| 完整云平台与独立 BFF | `.github/workflows/deploy-release-pages.yml` | GitHub Pages + Supabase Cloud + 单实例 Node 主机 | 额外提供私有 Studio、独立社区 BFF（`npm run community:start`）、服务端 WebP 规范化、紧急 HTTP 410 下架（`npm run cloud:withdraw`）与成对 TLS 备份（`npm run cloud:backup`）。 |

GitHub 仓库的 Pages 发布设置路径：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

Supabase 直连模式 SQL 生成、GitHub Actions 变量、最小权限角色校验（`npm run cloud:verify-roles`）与发布产物晋升流程，见[开发与部署](project/deployment.md)与 `community/README.md`。

## 质量保障

提交拉取请求或发布版本前，运行以下仓库校验：

| 命令 | 用途 |
| --- | --- |
| `node scripts/build/generate.mjs` | 同步生成 `docs/reference/catalog.md`、`data/resources.json`、`website/src/data/resources.json` 与公开下载文件。 |
| `npm run check` | 校验源数据模式、媒体引用、双语译文一致性、单元测试、Studio 与测试 TypeScript 以及 Prettier 格式。 |
| `npm run check:docs` | 核查正式中英文文档的 AST 结构一致性与 `website/content/i18n/docs.zh.sources.json` 中经审阅的翻译指纹。 |
| `npm run build` | 准备 Markdown 文章、检查 TypeScript、预渲染全部中英文路由并组装 `dist/`。 |
| `npm run check:build` | 核查构建后 HTML 覆盖率、站内链接与资源、本地化路由、离线搜索索引、`404.html` 及第三方许可声明。 |
| `npm run test:web` | 针对构建好的静态站点运行 Playwright 桌面端与移动端端到端测试。 |
| `npm run test:community` | 运行社区单元测试套件，覆盖评分、评论、审核、BFF 隔离与 Supabase 直连模式。 |
| `npm run staging:check` | 针对候选云配置生成离线、脱敏的预发布就绪审计报告。 |

这些自动化校验验证内部一致性、译文完整性与渲染覆盖率，不会安装、训练或执行第三方游戏仓库。

## 署名与复用

仓库代码及 GameMap 自编文档采用 **MIT 许可证** （`LICENSE`）。原始项目、品牌标志与第三方媒体归各自权利人所有。

随附的关卡设计改编内容采用 **CC BY-NC-SA 4.0** ，带有非商业使用和相同方式共享条件。复用前请阅读其[署名与许可证](skills/level-design/LICENSE.md)。

## 引用方式

如果 GameMap 对你的学术研究、技术写作或工程实践有所帮助，请按以下方式引用：

```bibtex
@misc{openenvision_gamemap_2026,
  title        = {GameMap: An Evidence-Backed Atlas for AI Game Development},
  author       = {{Tencent IEG} and {OpenEnvision}},
  year         = {2026},
  howpublished = {\url{https://github.com/OpenEnvision/GameMap}},
  note         = {Curated catalog, playable examples, and production engineering guides for AI game development}
}
```
