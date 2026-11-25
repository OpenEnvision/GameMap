# 为 GameMap 做贡献

网站内容必须遵循[内容模型与覆盖范围约定](project/content-model.md)。

浏览器游戏链接失效时，先查作者的发行页和仓库。如果发行版换了地址，请给出新网址，并说明打开后看到了什么。如果只剩工程，请给出对应的源码提交、预期启动步骤，以及缺失的资产或依赖。原来的截图可以保留，注明它来自当时的构建。[社区案例审阅](evaluation/community-cases.md)里有这两种发行形式的实例。

## Git 来源与生成工作流

根目录的 `README.md` 是手动维护的项目概览。完整资源目录请保留在 `docs/reference/catalog.md` 中，发布细节请保留在[部署指南](project/deployment.md)中。

仅在 `data/segments/*.json` 中编辑资源条目。不要直接编辑以下生成文件：

- `docs/reference/catalog.md`
- `data/resources.json`
- `website/src/data/resources.json`
- `website/public/awesome-list.md`

修改数据后，在仓库根目录依次运行以下命令：

```sh
node scripts/build/generate.mjs
npm run check
npm run build
npm run check:build
```

生成器会同步 Awesome List、网站数据与可下载目录。`npm run check` 无需构建网站，即可验证源数据、公共源媒体及生成的编辑文件。`npm run build` 会生成数据和可部署的 `dist/` 目录，其中包含预渲染的 Fumadocs 文章。`npm run check:build` 还会验证构建后的下载文件、部署媒体、渲染文档、静态搜索及内部链接；务必在构建后运行。这些检查不会安装、训练或游玩所列项目。目前未配置自动抓取或定期更新；条目通过人工阅读来源来维护。

### 哪些内容应纳入 Git

应用源代码 `website/app/`、目录和案例数据 `website/src/`、`package-lock.json`、`data/`、`docs/`，以及 `website/public/` 下的源资产与下载文件都应纳入版本控制。生成的编辑文件也应提交，以便审阅者检查目录和文档变更；CI 会检查其一致性。

不要提交依赖、`dist/` 或 `website/dist/`、旧版根目录预览、`.build/`、`.react-router/`、`website/.content/` 中准备好的文档、复制的 `website/public/docs-assets/`、TypeScript/Vite/lint 缓存、覆盖率与浏览器测试报告、智能体轨迹、日志、临时文件、本地环境机密，或特定机器的编辑器及操作系统文件。构建产物会在 CI 中重新生成，且只有 `dist/` 会发布到 GitHub Pages。可共享的环境配置应放在 `.env.example`、`.env.sample` 或 `.env.template` 中，且不得包含机密。`.gitignore` 有意不隐藏源媒体、锁文件、共享的 VS Code 配置或环境模板。

类 Cadle 的研究清单维护在 `data/segments/repository-research.json` 中。其完整来源候选成员及审阅状态会接受验证；生成的 `docs/cadle-repositories.md` 指向仓库研究目录，完整台账保存在公开 JSON 下载中。这些研究行不会自动成为资源卡片或精选可玩案例。

### 仓库结构与格式

- `scripts/build/`：开发服务器、生成器、文档准备、构建收尾与预览。
- `scripts/check/`：`npm run check` 和 `npm run check:build` 使用的源数据、内容、语言、翻译及构建站点检查。
- `scripts/lib/`：共享模块；`scripts/lib/guides/` 负责加载目录数据并渲染生成的指南。
- `supabase/direct-mode/`：可选的零服务器 Supabase 直连社区 SQL。
- `website/app/`：路由、组件和样式。`website/content/` 存放类型化契约与站点配置；`website/src/data/` 存放目录数据模块。

提交前运行 `npm run format`。Prettier 负责格式化代码、样式和配置。`.prettierignore` 让 Markdown、生成产物、数据台账和公开下载文件保持逐字节不变；存在未格式化文件时 `npm run check` 会失败。

## 条目格式

资源分段是 JSON 数组。每条资源的 `id` 必须保持稳定，并在所有资源分段中唯一。

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

| 字段              | 取值与指导                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `collection`    | 必填：`tools`、`learning`、`research` 或 `reference`；先判断条目如何使用，再选择其主题 |
| `category`      | `agents`、`engines`、`2d`、`3d`、`audio`、`production`、`runtime`、`testing`、`publishing` 或 `world`；按主要开发用途选择，独立于游戏维度 |
| `type`          | `agent`、`framework`、`skill`、`benchmark`、`paper`、`docs`、`tool`、`community`、`dataset`、`tutorial` 或 `platform`；描述条目本身，而非其发布者 |
| `stages`        | 从 `plan`、`code`、`assets`、`scene`、`test`、`ship`、`runtime` 和 `world` 中选择                                 |
| `dimensions`    | 从 `2d`、`3d` 和 `world` 中选择                                                                              |
| `links`, `year` | 可选；链接应指向能够支持其标签含义的具体页面。论文优先使用首个预印本的年份                                                                  |
| `verified`      | `YYYY-MM-DD`；实际检查来源的日期                                                                                 |
| `access`        | 可选的 `tutorial`、`demo` 和 `source` 对象，每个包含 `label`、`kind`、`note` 及 HTTPS `url`；仅在为 `unavailable` 时省略 URL |

集合应遵循一致的收录规则：

| 集合 | 收录规则 |
| --- | --- |
| `tools` | 可使用的工具、引擎、服务、可复用技能、智能体桥接与发行平台。产品可以将其官方文档作为主要使用入口。 |
| `learning` | 完整指南、教程、官方文档、示例项目与实用工程文章。 |
| `research` | 论文、基准、评估协议与研究原型。仅公开管线代码，并不意味着研究原型已经成为生产工具。 |
| `reference` | 专门 API、格式、底层库与集成参考。通用桌面自动化应放在这里，除非有具体的游戏编辑器或游戏测试集成证据支持其更广泛的相关性。 |

分类用于描述主要用途：`agents` 涵盖智能体与引擎桥接；`engines` 涵盖引擎与渲染；`2d` 涵盖 2D 美术与精灵；`3d` 涵盖 3D 资产与动画；`audio` 涵盖音效与语音；`production` 涵盖游戏创作与设计；`runtime` 涵盖运行时 AI 与 NPC；`testing` 涵盖测试与质量保障；`publishing` 涵盖发行；`world` 涵盖世界模型。旧分类 ID 保持稳定以保留链接，显示名称则遵循这些含义。使用 `dimensions` 表示对 2D/3D 的适用性：Unity MCP 桥接即使控制 3D 场景，也应归入 `agents`；音频、测试与发行资源应分别使用对应的用途分类。

按步骤展开的学习资料使用 `tutorial`，游戏发行或分发平台使用 `platform`。`community` 仅用于实际社区或学习中心；社区作者撰写的教程仍应使用 `tutorial` 或 `docs` 类型。`runtime` 阶段用于 AI 或 NPC 行为，而非普通资产加载；`world` 阶段和维度用于世界模型工作，而非所有程序化地形或噪声库。

在 `summary` 和 `detail` 中使用简洁自然的英语，保留官方项目名称。在没有证据支持时，不要将未发布代码描述为开源框架，不要将图像生成描述为动画生成，也不要将玩游戏的智能体描述为开发智能体。通过标签和阶段表达跨类别关联，而不是为了增加数量重复收录资源。

对于访问链接，应区分 `playable`、`interactive`、`video`、`download`、`local-tool` 和 `service` 演示。源码类型应区分 `full-source`（完整项目）、`pipeline-source`（生成器实现）、`sdk`、`examples`、`model` 和 `unavailable`。模型预览或录制影片不得标为可玩游戏。精选 AI 游戏案例位于 `website/src/data/ai3dCases.ts`、`aiCommunityCases.ts` 和 `openGameCases.ts` 中，并在 `learningPaths.ts` 中选定。每个精选案例都需要创作者提供的 AI 证据链接、实际可玩的游戏及其完整游戏项目。普通引擎参考资料应保留在 `foundationPaths` 中。`npm run build` 会根据这些数据生成 `docs/tutorials-and-demos.md` 及其公开副本；不要直接编辑生成的指南。

## 证据与收录标准

优先使用作者论文、官方文档、项目仓库、模型卡和数据卡。不要推断官方来源不支持的功能。将社区经验归于其作者，并保留引擎版本、硬件和问题场景；按内容选择资源类型，不要将社区作者身份当作类型。添加链接前应阅读其内容；搜索摘要不足以作为精确指标的证据。

`verified` 表示已检查来源。只有在实际运行后，才能声称完成复现，并提供命令、版本、硬件、输入、结果及测试范围的限制。区分论文演示、完整开源实现、部分推理代码、托管产品和发布计划。代码、模型权重与数据可能适用不同条款；应链接到各自的官方说明，而不是从单一仓库的许可证标签推而广之。

性能数字必须附有测量条件和一手来源。不要直接对不同任务、分辨率、GPU 或测量范围的结果进行排名。方法比较应区分构建成功、功能正确性、视觉质量、可玩性和运行时性能。将建议的工作流描述为模板或后续步骤，而不是已测得的结论。

世界模型条目还应说明权威状态位于何处：可执行程序、引擎、视频潜变量，还是显式 3D 资产。动作条件视频、神经渲染和基于代码的世界应使用不同标签。参见[世界模型说明](ecosystem/world-models.md)。

## 面向读者写作

- 从读者需要完成的任务、工作流或决策入手。使用平实、直接的语言。
- 省略编辑性自述、集合规模汇报、泛泛的不保证声明、审阅日期开场白，以及关于未来不定期更新的陈述。
- 将具体版本要求、不可用产物、许可条件和未经测试的假设放在其影响的操作旁边。保留来源与署名。
- 明确将拟议的检查或工单模板称为提案或模板；不要将其描述为已完成的集成或测量结果。
- 将审计时间戳和内部标识符保留在源记录或维护台账中，而不是面向读者的引言中。
- 新指南放在与其导航分组对应的 `docs/` 主题文件夹中。`docs/README.md` 列出了各文件夹、生成的页面，以及命名与标题规范。
- 中文指南位于 `docs/zh/` 下。将指向未翻译材料的链接标为英文。给单独授权的关卡设计改编包补实例时，请保留许可证、原始署名及来源链接，并注明哪些是原书内容，哪些是改编包自己的练习。

## 翻译

- 保持规范源数据为英文。中文界面消息放在 `website/content/i18n/zh.json` 或 `docs.zh.json` 中，读者文本覆盖层放在 `website/content/i18n/content/` 中，并使用稳定的 `kind:id` 键。
- 翻译完整字段，包括实质性条件。保留项目名称、来源 URL、创作者署名、许可、列表项，以及拟议工作与测量结果之间的区别。
- 运行 `node scripts/check/locales.mjs --approve-new`，记录新翻译字段的指纹。该命令不会批准源文本变更。更新已有译文的源指纹前应先审阅译文；绝不能自动刷新全部哈希。
- 在 `docs/zh/` 下添加完整中文文章。有意指向英文原文的链接应标记为 `(English)`，或使用现有的中文语言标记。其他内部链接保持所选界面语言。
- 将未翻译段落明确标为英文。不要替换第三方源文件，也不要将翻译后的标题当作已翻译文章呈现。
- 运行 `npm run check`，重新构建，再运行 `npm run check:build`。预览受影响页面的两个语言版本。

## 拉取请求

简要说明新增或修正内容、一手来源、实际审阅日期及运行过的仓库检查。如果仅检查了网页，应说明：“已检查来源；未进行完整复现。”修复数据后，重新生成并包含受影响的输出。仅涉及文档的变更可使用相关格式或链接检查。不要仅为验证链接而自动下载大型模型或数据集，或执行外部项目脚本。
