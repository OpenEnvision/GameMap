# GameMap 文档

用 AI 开发游戏的指南、研究资料与参考页面。网站会在 `/docs/zh/<路径>/` 渲染每个页面，路径即下文的文件路径去掉 `.md`。本索引用于在 GitHub 上浏览文件夹；网站有自己的文档首页。本目录是英文文档的完整中文翻译，英文原文见 [English](../README.md)。

## 文件夹

| 文件夹 | 内容 | 从这里开始 |
| --- | --- | --- |
| [`guides/`](guides/) | 找到起点，把资源做成可运行的游戏 | [阅读指南](guides/reading-guide.md) |
| [`ecosystem/`](ecosystem/) | 编码智能体、引擎、2D 与 3D 开发中的 AI，以及世界模型 | [编码智能体](ecosystem/agents.md) |
| [`production/`](production/) | 引擎操作、生产工单、调试与工作室案例 | [导览](production/overview.md) |
| [`assets/`](assets/) | 生成工具、服务条款、交付、验证与视觉反馈 | [生成工具](assets/generative-tools.md) |
| [`evaluation/`](evaluation/) | 评估研究、基准与核查记录 | [评估游戏创作智能体](evaluation/development-evaluation.md) |
| [`reference/`](reference/) | 完整资源目录、测试资源库，以及媒体与标志来源 | [资源目录](reference/catalog.md) |
| [`skills/`](skills/) | 可安装的智能体技能包 | [关卡设计 Skill](skills/level-design/SKILL.md) |
| [`project/`](project/) | 网站的运行与维护：部署与内容模型 | [开发与部署](project/deployment.md) |

## 页面

**入门指南**

- [阅读指南](guides/reading-guide.md)：按你的问题选择入口。
- [实践指南](guides/practical-guide.md)：从资源地图到可运行的游戏。
- [关卡设计](guides/level-design.md)：借助随附技能包规划、搭建灰盒并试玩关卡。

**工具生态**

- [编码智能体](ecosystem/agents.md)：模型、运行框架、技能包、MCP 与引擎桥接。
- [引擎](ecosystem/engines.md)：游戏引擎、渲染库与内容工具。
- [2D 与 3D 开发中的 AI](ecosystem/2d-3d-development.md)：规则生成、项目构建、场景编辑与评估。
- [世界模型](ecosystem/world-models.md)：可执行、视频与引擎驱动的世界模型。

**制作与工程**

- [导览](production/overview.md)：为生产任务找到合适的资料。
- [制作工具](production/tools.md)：动画、程序化内容、音频、渲染与验证工具。
- [引擎操作](production/engine-operations.md)：完成信号、产物与恢复方法。
- [生产工单](production/work-orders.md)：从资产创建到交付的任务模板。
- [工作室案例](production/studio-case-studies.md)：来自已发表工程记录的经验。
- [原生工具操作](production/native-operations.md)：原生命令、文件与生命周期事件。
- [调试](production/debugging.md)：与具体游戏状态关联的性能分析与诊断。
- [覆盖与待解决问题](production/coverage-gaps.md)：各生产阶段已覆盖的内容与剩余工作。

**资产与生成工具**

- [生成工具](assets/generative-tools.md)：任务生命周期、产出、集成与条款。
- [API 条款](assets/api-terms.md)：产出权利、研究用途与服务商训练条款。
- [生成与交付](assets/generation-delivery.md)：从生成请求到通过验证的资产。
- [资产验证](assets/validation.md)：格式、几何、材质、动画与导入检查。
- [资产选择](assets/selection.md)：检索、比较并修改资产候选。
- [视觉证据](assets/visual-evidence.md)：用截图、视频与操作记录证明改动。
- [视觉反馈](assets/visual-feedback.md)：智能体应检查什么、何时再次检查。

**验证与评估**

- [开发评估](evaluation/development-evaluation.md)：根据智能体的产出选择评估方法。
- [基准复现](evaluation/benchmarks.md)：复现研究所需的代码、数据与运行框架。
- [游戏状态](evaluation/gameplay-state.md)：存档、检查点、回放与持久效果。
- [代理接口](evaluation/agent-interfaces.md)：智能体与游戏接口的权限、重置与验证。
- [核查记录](evaluation/review-coverage.md)：对目录描述与条款的更正。
- [来源版本](evaluation/source-revisions.md)：文档所述行为背后的固定版本源文件。
- [社区案例](evaluation/community-cases.md)：追溯到制作记录与源代码的社区游戏。

**参考资料**

- [资源目录](reference/catalog.md)：按类别列出的全部资源。
- [测试资源库](reference/testing-library.md)：用于测试的可运行项目、环境与素材。
- [媒体来源](reference/media-sources.md)：预览片段与截图的署名。
- [标志来源](reference/logo-sources.md)：每个资源标志背后的身份与来源。

**关于本站**

- [开发与部署](project/deployment.md)：本地开发、构建与 GitHub Pages。
- [内容模型](project/content-model.md)：源内容、呈现方式与完整性检查。

项目介绍与贡献指南见 [项目介绍](overview.md) 与 [参与贡献](contributing.md)。

## 生成的页面

请勿手动编辑以下文件。它们由 `website/content/generators.config.json` 中的生成器从结构化数据渲染；修改数据后运行 `node scripts/build/generate.mjs`。英文页面是生成结果，`zh/` 下对应的页面是人工翻译，需要随英文更新。

- `reference/catalog.md`，来自 `data/segments/*.json`
- `reference/testing-library.md` 和 `reference/logo-sources.md`，来自 `website/src/data/` 中的目录模块
- `tutorials-and-demos.md`、`coding-agent-game-code.md` 和 `cadle-repositories.md`，是已迁移到网站“游戏案例”页面的目录留下的简短说明

## 写作规范

完整规范见英文索引 [Writing conventions](../README.md#writing-conventions)，并补充 [CONTRIBUTING](../../CONTRIBUTING.md) 中的“Writing for readers”和“Translations”两节。翻译时请注意：

- 每个页面都与英文原文位于相同路径，保留相同的章节、列表、表格、代码与链接。
- 标题和开头段落随英文一起更新。
- 运行 `npm run check:docs`；审阅两种语言的版本后，再更新 `website/content/i18n/docs.zh.sources.json` 中对应的哈希。
