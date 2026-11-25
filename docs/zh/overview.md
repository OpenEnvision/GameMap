# GameMap

<div align="center">

![GameMap](../../website/public/brand/gamemap.svg)

**OpenEnvision X Tencent · AI 游戏开发**

收录可研究的游戏案例、项目里用得上的制作指南，以及评估游戏 AI 的原始资料。

[网站](https://openenvision.org/GameMap/) · [资源目录](reference/catalog.md) · [文档](guides/practical-guide.md) · [中文指南](guides/reading-guide.md) · [贡献指南](contributing.md)

</div>

## 摘要

按手头的活找资料。程序员要借用 Godot 示例，可以先查引擎版本和启动方式，再看代码。技术美术导入新绑定时，可以查比例、贴图和脚底接触怎么验。研究者比较游戏开发智能体时，可以查谁控制游戏、智能体能看到什么，以及失败回合怎样计入结果。

公开条目提供中英文页面，站内搜索在浏览器加载静态索引。案例条目写明去哪里找工程或构建，以及创作者归属的依据。制作笔记把引擎和工具行为指回对应的版本。要引用站外项目的结论，请查看原始来源和记录所覆盖的运行范围。

线上站点地址：

```text
https://openenvision.org/GameMap/
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
- [部署与社区模式](#deployment-and-community)
- [质量保障](#quality-assurance)
- [署名与复用](#attribution-and-reuse)
- [引用方式](#citation)

## 动机

AI 辅助游戏开发涉及多种分散在不同载体中的资料：面向游戏引擎的编码智能体与 MCP 桥接、程序化与生成式资产管线、附带完整源码的浏览器与桌面可玩游戏、世界模型论文，以及覆盖验证、运行时性能与 API 条款的生产复盘笔记。

这一领域演进迅速，并将成熟工具、局部研究代码、录屏演示与营销预览混杂在一起。GameMap 将其整理为结构化、经来源核查的图谱，帮助读者在投入生产工作流之前迅速确认哪些项目真正可玩、哪些公开了完整源码、哪些可本地运行或依赖托管 API，以及尚存哪些使用限制。

## GameMap 的定位

GameMap 是：

- 一份经过人工审阅、直连一手来源的图谱，覆盖 AI 游戏开发工具、可玩游戏案例、研究论文、测试资源与工程指南。
- 一个基于 Fumadocs、React Router、TypeScript 和 Vite 构建的中英双语静态文档与发现站点，内置浏览器端全文检索。
- 一套 Git 驱动的静态发布管线，搭配可选的零服务器 Supabase 直连社区能力（评分、评论、举报与投稿）。
- 一份强调证据边界的参考资料，明确区分一手来源核查与本地复现，以及可玩构建与录屏视频。

GameMap 不是：

- 自动抓取器、资讯流或未经筛选的链接大杂烩。
- 在不可比的任务或硬件条件下对模型、引擎或工作室做排名的榜单。
- 对第三方项目的独立试玩背书、安全认证或商业许可授权。
- 替代读者亲自查阅原始仓库、论文、模型卡与上游许可证的快捷方式。

## 收录范围

### 资源分类体系

结构化目录条目按用途分类，并通过独立的集合字段说明读者如何使用它们：

| 分类 | 范围 | 指南 |
| --- | --- | --- |
| `agents` | 智能体与引擎桥接：编码智能体、技能、MCP 服务器与编辑器控制闭环。 | [智能体、技能与 MCP](ecosystem/agents.md) |
| `engines` | 引擎与渲染：游戏引擎、渲染库与引擎集成。 | [游戏引擎](ecosystem/engines.md) |
| `2d` | 2D 美术与精灵：图像、精灵、图块集及相关资产工作流。 | [2D 与 3D 开发](ecosystem/2d-3d-development.md) |
| `3d` | 3D 资产与动画：模型、场景、骨骼绑定与角色动作。 | [2D 与 3D 开发](ecosystem/2d-3d-development.md) |
| `audio` | 音频与语音：音乐、音效、对白与语音资产。 | [生产研究总览](production/overview.md) |
| `production` | 游戏创作与设计：生成的游戏项目、规则、玩法与关卡设计。 | [生产研究总览](production/overview.md) |
| `runtime` | 运行时 AI 与 NPC：对话角色与游戏内 AI 行为。 | [生产研究总览](production/overview.md) |
| `testing` | 测试与质量保障：游戏测试、无障碍评审与评估工作流。 | [测试参考库](reference/testing-library.md) |
| `publishing` | 发行：商店、游戏分发与发布工作流。 | [生产研究总览](production/overview.md) |
| `world` | 世界模型：学习型模拟、基于代码的状态、神经渲染与交互世界。 | [世界模型](ecosystem/world-models.md) |

四个集合为 `tools`（工具与平台）、`learning`（指南与示例）、`research`（研究与基准）及 `reference`（技术参考）。论文和研究原型与可使用工具保持区分；底层操作系统或引擎 API 则属于技术参考。稳定的 `2d` 与 `3d` 分类 ID 描述资产工作，`dimensions` 独立记录资源是否适用于 2D 或 3D 游戏。

### 集合与文档支柱

除资源目录外，GameMap 还维护多个独立集合与长篇指南：

| 支柱 | 收录内容 | 入口 |
| --- | --- | --- |
| 资源目录 | 可检索、可筛选的工具、框架、基准、论文与文档条目。 | [完整资源目录](reference/catalog.md) |
| 游戏与工作流 | 浏览器与桌面可玩项目、创作者构建证据与完整游戏源码。 | [游戏案例](/examples/) |
| 生产与测试 | 实用引擎接口、评估方法、测试起步套件与证据边界。 | [测试参考库](reference/testing-library.md) |
| 仓库研究 | 覆盖游戏、引擎、智能体、工具和研究的仓库证据，附核查范围和许可状态。 | [仓库研究](/research/) |
| 关卡设计技能 | 包含空间布局参考资料与可复用评审模板的完整技能包。 | [关卡设计指南](guides/level-design.md) |

## 编辑与证据标准

候选资源、游戏与研究笔记在收录前均按五个维度核查：

| 维度 | 核心核查问题 |
| --- | --- |
| 一手来源证据 | 结论是否由作者仓库、论文、官方文档、模型卡或创作者记录支撑，而非二手转述？ |
| 验证边界 | 条目是否清晰区分一手来源核查（`verified`）与附带命令、版本和硬件记录的实际复现？ |
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
| `website/public/` | 品牌标志、原始标志、实机截图、页面封面、技能归档包与公开下载文件。 |
| `scripts/` | 构建生成器（`build/`）、校验器（`check/`）、共享目录库（`lib/`）与 Supabase 直连 SQL 助手（`community-direct.mjs`）。 |
| `supabase/direct-mode/` | 可选的零服务器 Supabase 直连社区 SQL 模式与 RPC 配置。 |

## 元数据模型

结构化资源遵循 `website/content/contracts.ts` 中声明的版本化契约。`data/segments/*.json` 中的每个分片都以稳定、手工编排的 `id` 存储记录：

```json
{
  "id": "example-resource",
  "name": "Official Project Name",
  "category": "production",
  "type": "framework",
  "collection": "tools",
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

GameMap 需要 **Node.js 22.22 或更高版本** 。运行以下命令启动本地开发服务器：

```sh
npm ci
npm run dev
```

若需在本地复现 GitHub Pages 静态子路径：

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
npm run preview
```

公共网站使用 Fumadocs、React Router、TypeScript 和 Vite 静态预渲染。完整构建与预览说明见[开发与部署](project/deployment.md)。

## 部署与社区模式

GameMap 通过 `.github/workflows/deploy-pages.yml` 直接部署到 **GitHub Pages** ，无需独立后端服务器：

| 模式 | 配置方式 | 能力 |
| --- | --- | --- |
| 纯静态 GitHub Pages | 默认 `npm run build` | 中英双语预渲染站点、离线搜索、可下载 JSON/Markdown 目录，零后端。 |
| 零服务器混合社区模式 | `npm run build:community-direct` + `supabase/direct-mode/enable-supabase-direct.sql` | 借助 Supabase Cloud 启用邮箱/GitHub 登录、五星评分、评论、举报、截图投稿与浏览器端审核。 |

GitHub 仓库的 Pages 发布设置路径：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

Supabase 直连模式 SQL 生成（`npm run community:direct-sql`）与可选 GitHub Actions 仓库变量（`GAMEMAP_SUPABASE_URL`、`GAMEMAP_SUPABASE_PUBLISHABLE_KEY`）见[开发与部署](project/deployment.md)。

## 质量保障

提交拉取请求或发布版本前，运行以下仓库校验：

| 命令 | 用途 |
| --- | --- |
| `node scripts/build/generate.mjs` | 同步生成 `docs/reference/catalog.md`、`data/resources.json`、`website/src/data/resources.json` 与公开下载文件。 |
| `npm run check` | 校验源数据模式、媒体引用、双语译文一致性与 Prettier 格式。 |
| `npm run check:docs` | 核查正式中英文文档的 AST 结构一致性与 `website/content/i18n/docs.zh.sources.json` 中经审阅的翻译指纹。 |
| `npm run build` | 准备 Markdown 文章、检查 TypeScript、预渲染全部中英文路由并组装 `dist/`。 |
| `npm run check:build` | 核查构建后 HTML 覆盖率、站内链接与资源、本地化路由、离线搜索索引、`404.html` 及第三方许可声明。 |

这些自动化校验验证内部一致性、译文完整性与渲染覆盖率，不会安装、训练或执行第三方游戏仓库。

## 署名与复用

仓库代码及 GameMap 自编文档采用 **MIT 许可证** （`LICENSE`）。原始项目、品牌标志与第三方媒体归各自权利人所有。

随附的关卡设计改编内容采用 **CC BY-NC-SA 4.0** ，带有非商业使用和相同方式共享条件。复用前请阅读其[署名与许可证](skills/level-design/LICENSE.md)。

## 引用方式

如果 GameMap 对你的学术研究、技术写作或工程实践有所帮助，请按以下方式引用：

```bibtex
@misc{openenvision_gamemap_2026,
  title        = {GameMap: An Evidence-Backed Atlas for AI Game Development},
  author       = {{Tencent} and {OpenEnvision}},
  year         = {2026},
  howpublished = {\url{https://github.com/OpenEnvision/GameMap}},
  note         = {Curated catalog, playable examples, and production engineering guides for AI game development}
}
```
