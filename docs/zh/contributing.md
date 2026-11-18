# 为 GameMap 做贡献

网站内容必须遵循[内容模型与覆盖范围约定](project/content-model.md)。

欢迎贡献可信资源、修正描述、修复链接，以及有证据支持的工程经验。GameMap 梳理编码智能体、引擎生态、2D 与 3D 开发以及世界模型。

## 权威来源与生成工作流

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

类 Cadle 的研究清单维护在 `data/segments/repository-research.json` 中。其完整来源候选成员及审阅状态会接受验证；`docs/cadle-repositories.md` 和公开的 Markdown/JSON 下载文件均由生成器生成。这些研究行不会自动成为资源卡片或精选可玩案例。

### 仓库结构与格式

- `scripts/build/`：开发服务器、生成器、文档准备、构建收尾与预览。
- `scripts/check/`：`npm run check` 和 `npm run check:build` 使用的源数据、内容、语言、翻译及构建站点检查。
- `scripts/import/`：有边界的导入器，把审阅过的报告、归档和远程数据包转为带版本的数据。
- `scripts/media/`：游戏截图、页面封面和仓库媒体的采集与下载工具。
- `scripts/platform/`：Studio、本地服务、发布、数据包、版本发布及预发布就绪检查。
- `scripts/lib/`：共享模块；`scripts/lib/guides/` 负责加载目录数据并渲染生成的指南。
- `tests/unit/`：由 `npm run test:unit` 运行的 `node:test` 测试。`tests/e2e/`、`tests/release/` 和 `tests/studio/` 存放 Playwright 用例；`tests/local/` 验证本地 Supabase 服务。
- `website/app/`：路由、组件和样式。`website/content/` 存放类型化契约与站点配置；`website/src/data/` 存放目录数据模块。

提交前运行 `npm run format`。Prettier 负责格式化代码、样式和配置。`.prettierignore` 让 Markdown、生成产物、数据台账和公开下载文件保持逐字节不变；存在未格式化文件时 `npm run check` 会失败。

## 内容平台过渡

[内容平台指南](project/content-platform.md)介绍了带版本的数据库模型、离线迁移命令及剩余切换门槛。公共网站仍读取现有 Git 来源。请继续使用上述工作流；不要同时编辑同一集合的数据库副本和 Git 副本。迁移包保留在被忽略的 `.build/` 下，作为私有内容；首次导入会创建草稿，而不是发布或批准现有内容。

## 条目格式

每个分段都是 JSON 数组。每个 `id` 必须保持稳定，并在所有分段中唯一。示例：

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

| 字段              | 取值与指导                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `category`      | `agents`、`engines`、`2d`、`3d`、`production` 或 `world`；选择最能反映主要贡献的类别                                      |
| `type`          | `agent`、`framework`、`skill`、`benchmark`、`paper`、`docs`、`tool`、`community` 或 `dataset`                  |
| `stages`        | 从 `plan`、`code`、`assets`、`scene`、`test`、`ship`、`runtime` 和 `world` 中选择                                 |
| `dimensions`    | 从 `2d`、`3d` 和 `world` 中选择                                                                              |
| `links`, `year` | 可选；链接应指向能够支持其标签含义的具体页面。论文优先使用首个预印本的年份                                                                  |
| `verified`      | `YYYY-MM-DD`；实际检查来源的日期                                                                                 |
| `access`        | 可选的 `tutorial`、`demo` 和 `source` 对象，每个包含 `label`、`kind`、`note` 及 HTTPS `url`；仅在为 `unavailable` 时省略 URL |

在 `summary` 和 `detail` 中使用简洁自然的英语，保留官方项目名称。在没有证据支持时，不要将未发布代码描述为开源框架，不要将图像生成描述为动画生成，也不要将玩游戏的智能体描述为开发智能体。通过标签和阶段表达跨类别关联，而不是为了增加数量重复收录资源。

对于访问链接，应区分 `playable`、`interactive`、`video`、`download`、`local-tool` 和 `service` 演示。源码类型应区分 `full-source`（完整项目）、`pipeline-source`（生成器实现）、`sdk`、`examples`、`model` 和 `unavailable`。模型预览或录制影片不得标为可玩游戏。精选 AI 游戏案例位于 `website/src/data/ai3dCases.ts`、`aiCommunityCases.ts` 和 `openGameCases.ts` 中，并在 `learningPaths.ts` 中选定。每个精选案例都需要创作者提供的 AI 证据链接、实际可玩的游戏及其完整游戏项目。普通引擎参考资料应保留在 `foundationPaths` 中。`npm run build` 会根据这些数据生成 `docs/tutorials-and-demos.md` 及其公开副本；不要直接编辑生成的指南。

## 证据与收录标准

优先使用作者论文、官方文档、项目仓库、模型卡和数据卡。不要推断官方来源不支持的功能。将社区经验标记为 `community`，并保留引擎版本、硬件和问题场景。添加链接前应阅读其内容；搜索摘要不足以作为精确指标的证据。

`verified` 表示已检查来源。只有在实际运行后，才能声称完成复现，并提供命令、版本、硬件、输入、结果及测试范围的限制。区分论文演示、完整开源实现、部分推理代码、托管产品和发布计划。代码、模型权重与数据可能适用不同条款；应链接到各自的官方说明，而不是从单一仓库的许可证标签推而广之。

性能数字必须附有测量条件和一手来源。不要直接对不同任务、分辨率、GPU 或测量范围的结果进行排名。方法比较应区分构建成功、功能正确性、视觉质量、可玩性和运行时性能。将建议的工作流描述为模板或后续步骤，而不是已测得的结论。

世界模型条目还应说明权威状态位于何处：可执行程序、引擎、视频潜变量，还是显式 3D 资产。动作条件视频、神经渲染和基于代码的世界应使用不同标签。参见[世界模型说明](ecosystem/world-models.md)。

## 面向读者写作

- 从读者需要完成的任务、工作流或决策入手。使用平实、直接的语言。
- 省略编辑性自述、集合规模汇报、泛泛的不保证声明、审阅日期开场白，以及关于未来不定期更新的陈述。
- 将具体版本要求、不可用产物、许可条件和未经测试的假设放在其影响的操作旁边。保留来源与署名。
- 明确将拟议的检查或工单模板称为提案或模板；不要将其描述为已完成的集成或测量结果。
- 将审计时间戳和内部标识符保留在源记录或维护台账中，而不是面向读者的引言中。
- 中文指南位于 `docs/zh/` 下。将指向未翻译材料的链接标为英文。不要为了改变语气而改写另行授权并原样保留的技能包。

## 翻译

- 保持规范源数据为英文。中文界面消息放在 `website/content/i18n/zh.json` 或 `docs.zh.json` 中，读者文本覆盖层放在 `website/content/i18n/content/` 中，并使用稳定的 `kind:id` 键。
- 翻译完整字段，包括实质性条件。保留项目名称、来源 URL、创作者署名、许可、列表项，以及拟议工作与测量结果之间的区别。
- 运行 `node scripts/check/locales.mjs --approve-new`，记录新翻译字段的指纹。该命令不会批准源文本变更。更新已有译文的源指纹前应先审阅译文；绝不能自动刷新全部哈希。
- 在 `docs/zh/` 下添加完整中文文章。有意指向英文原文的链接应标记为 `(English)`，或使用现有的中文语言标记。其他内部链接保持所选界面语言。
- 将未翻译段落明确标为英文。不要替换第三方源文件，也不要将翻译后的标题当作已翻译文章呈现。
- 运行 `npm run check`，重新构建，并为两个语言版本运行 `npm run check:build` 和 `npm run test:web`。

## 拉取请求

简要说明新增或修正内容、一手来源、实际审阅日期及运行过的仓库检查。如果仅检查了网页，应说明：“已检查来源；未进行完整复现。”修复数据后，重新生成并包含受影响的输出。仅涉及文档的变更可使用相关格式或链接检查。不要仅为验证链接而自动下载大型模型或数据集，或执行外部项目脚本。
