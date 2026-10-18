# Awesome AI Game Development

> Planning Map for AI Game Development — 从想法到可玩的世界。

精选 **86** 条一手来源，连接 Coding Agents、游戏引擎、2D / 3D AI 开发与 Coding World Models。主要来源检查日期：**2026-10-18**。本清单是有边界的研究快照，核验表示阅读来源，不代表完整复现或持续监测。

- [交互式 GameMap 网站](https://gamemap-ai-atlas.jiadonghou69.chatgpt.site)（初始部署为所有者私有）
- [从资源到工程的实用指南](/practical-guide.md)
- [贡献与数据维护](/CONTRIBUTING.md) · [结构化 JSON](/resources.json)

## 地图怎么读

| 层次 | 解决什么问题 | 看什么证据 |
| --- | --- | --- |
| Model / Coding agent / Harness | 推理能力、代码修改与工具循环 | 实际工具、运行反馈、支持的任务 |
| Skill / MCP / CLI | 任务知识与引擎编辑能力 | 真实 SKILL.md、协议与编辑器操作 |
| Framework / Tool | 组织游戏生成或完成一个制作环节 | 输入、输出、工程格式、发布状态 |
| Benchmark | 对开发工作作可重复评价 | 任务集、评测脚本、运行环境与版本 |
| Paper / World model | 探索可执行状态、神经模拟或混合渲染 | 世界表示、动作接口、长期一致性、开放范围 |

**编辑说明。** DeepSeek 在此以模型接入文档收录，未将其写成官方独立 harness。Blender 是 DCC，Three.js 是 3D 库；它们与完整游戏引擎有不同职责。开发评测、游戏游玩评测、建模评测分别解读。SolarRenderer 与 StreamRender-H3 归入结构／引擎驱动的混合渲染路线；纯视频世界模型单独标注。路线图与验收建议是 GameMap 编辑整理。

## 目录

- [1. 通用 Coding Agents 与游戏开发桥接](#agents) — 20 条
- [2. 游戏引擎、DCC 与工程生态](#engines) — 22 条
- [3. 2D 游戏开发 AI 工作](#2d) — 12 条
- [4. 3D 游戏开发 AI 工作](#3d) — 12 条
- [5. Coding World Models 与交互世界](#world) — 20 条

<a id="agents"></a>

## 通用 Coding Agents 与游戏开发桥接

### Agent

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [OpenAI Codex](https://developers.openai.com/codex/cli) | 围绕本地仓库执行读代码、修改、命令运行与审查的通用 coding agent。 | 规划 / 编码 / 测试 / 发布 |
| [Claude Code](https://code.claude.com/docs/en/overview) | 通过终端、IDE 等入口读写工程并运行工具，可扩展 skills、hooks 与 MCP。 | 规划 / 编码 / 测试 / 发布 |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Google 开源的终端 coding agent，提供文件、shell、扩展和 MCP 接入能力。 | 规划 / 编码 / 测试 |
| [OpenCode](https://opencode.ai/docs/) | 支持不同模型供应方、Plan / Build 工作模式与项目指令的开源 coding agent。 | 规划 / 编码 / 测试 |
| [Cline](https://github.com/cline/cline) | 支持多模型、Plan / Act、工程规则与 MCP 的开源 coding agent。 | 规划 / 编码 / 测试 |
| [Aider](https://github.com/Aider-AI/aider) | 以仓库地图、Git 修改和 lint / test 反馈为核心的终端 AI 配对编程工具。 | 编码 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[OpenAI Codex](https://developers.openai.com/codex/cli)**

适合作为游戏项目的代码执行主环：拆解玩法、维护脚本、运行构建并读取失败日志。接入游戏引擎仍需对应 CLI、编辑器桥接或 MCP；代码通过编译不等于游戏已经可玩。

标签：`CLI` · `通用 agent` · `代码审查` · `MCP` · `Skills`。来源检查：2026-10-18。 延伸：[官方游戏工作流](https://learn.chatgpt.com/use-cases/browser-games)

**[Claude Code](https://code.claude.com/docs/en/overview)**

可承担游戏脚本开发、架构迁移、构建故障排查，并通过社区 MCP 操作 Unity、Godot 或 UE。CLAUDE.md、技能与引擎状态读取应一起使用；某个 MCP 的演示效果不能直接代表引擎的完整自动化能力。

标签：`CLI` · `通用 agent` · `MCP` · `Skills` · `Hooks`。来源检查：2026-10-18。 延伸：[代码与示例](https://github.com/anthropics/claude-code)

**[Gemini CLI](https://github.com/google-gemini/gemini-cli)**

可用于游戏工程理解、脚本修改以及借助 MCP 驱动编辑器。核验时官方仓库已提示部分用户迁移至 Antigravity CLI，并提示新模型优化差异；应以当前账号和官方迁移说明决定实际入口。

标签：`CLI` · `Google` · `MCP` · `开源` · `迁移提示`。来源检查：2026-10-18。 延伸：[官方文档](https://geminicli.com/docs/)

**[OpenCode](https://opencode.ai/docs/)**

适合把游戏需求先形成任务方案，再对 C#、GDScript、TypeScript 或 C++ 工程执行修改。供应方和模型可独立选择，但运行编辑器、查看画面和验证玩法仍要配置相应工具。

标签：`CLI` · `多模型` · `Plan / Build` · `开源` · `AGENTS.md`。来源检查：2026-10-18。 延伸：[源码](https://github.com/anomalyco/opencode)

**[Cline](https://github.com/cline/cline)**

适合在 IDE 或 CLI 中审阅和修改游戏代码，并把编译输出与 MCP 编辑器工具纳入反馈循环。可复用 .clinerules 和 skills 固化引擎约定；编辑器操作是否可用取决于具体桥接服务。

标签：`IDE` · `CLI` · `多模型` · `MCP` · `Plan / Act`。来源检查：2026-10-18。 延伸：[文档](https://docs.cline.bot/)

**[Aider](https://github.com/Aider-AI/aider)**

适合已有游戏工程中的跨文件修改、重构和可测试逻辑开发，并可选用 DeepSeek 等模型。它本身的代码编辑工作流不等同于对 Unity、UE 或 Blender 编辑器的直接控制；视觉反馈需另行组织。

标签：`CLI` · `Git` · `仓库地图` · `多模型` · `重构`。来源检查：2026-10-18。 延伸：[使用文档](https://aider.chat/docs/)

</details>

### Framework

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [OpenHands · Agent Canvas](https://github.com/OpenHands/OpenHands) | 管理本地、远端和云端 agent 运行环境的开源开发控制台。 | 规划 / 编码 / 测试 / 发布 |
| [OpenHands Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | 提供 agent、工具、对话、工作区与服务端接口的可编程开发框架。 | 规划 / 编码 / 测试 |
| [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) | 将 Claude Code 的工具循环、权限、会话与扩展能力嵌入 Python 或 TypeScript 应用。 | 规划 / 编码 / 测试 |
| [mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent) | 以极简 shell 工具循环构建可修改、可追踪的 coding-agent 研究基线。 | 编码 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[OpenHands · Agent Canvas](https://github.com/OpenHands/OpenHands)**

可把游戏项目中的多 agent 任务、运行环境与执行记录集中管理。当前仓库承担 Agent Canvas 前端与编排入口，核心工具循环和 Agent Server 位于独立 SDK 仓库；实际游戏自动化仍需引擎工具。

标签：`Agent Canvas` · `运行环境` · `多 agent` · `开源` · `编排`。来源检查：2026-10-18。 延伸：[核心 SDK](https://github.com/OpenHands/software-agent-sdk)

**[OpenHands Software Agent SDK](https://github.com/OpenHands/software-agent-sdk)**

适合搭建游戏开发实验：为代码 agent 包装构建、场景检查和测试工具，并在本地或容器工作区记录执行过程。SDK 支持自定义流程与工具，但不自带覆盖所有游戏引擎的语义层。

标签：`SDK` · `Python` · `TypeScript` · `工作区` · `可复现实验`。来源检查：2026-10-18。 延伸：[SDK 文档](https://docs.openhands.dev/sdk)

**[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)**

可为游戏项目构建专门的代码修复、内容校验或引擎 MCP 编排服务，并用 hooks 记录执行证据。它与直接调用模型的 Client SDK 属于不同层次；游戏领域工具、判分规则与运行环境仍需自行提供。

标签：`SDK` · `Python` · `TypeScript` · `MCP` · `Hooks`。来源检查：2026-10-18。

**[mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent)**

适合研究游戏代码生成与修复时隔离模型、提示和执行环境的影响，或包装 Godot headless 等命令。它是通用软件工程 agent，不是游戏 benchmark；需要额外提供可玩性、视觉和物理行为验证。

标签：`研究基线` · `Shell` · `Harness` · `轨迹` · `开源`。来源检查：2026-10-18。 延伸：[前代 SWE-agent](https://github.com/SWE-agent/SWE-agent)

</details>

### Skill

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [Unity-MCP Operator Guide](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md) | MCP for Unity 仓库内的实际技能：先读编辑器状态，再操作、等待编译并检查结果。 | 编码 / 场景 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[Unity-MCP Operator Guide](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md)**

规定资源优先的场景操作顺序，以及脚本编辑后的编译等待、控制台检查和截图验证，适合作为 Unity agent 的操作规程。技能依赖 MCP for Unity；示例会随 Unity、UI 和输入系统版本变化，不能照搬参数。

标签：`Unity` · `Skills` · `MCP` · `编译反馈` · `实际技能源码`。来源检查：2026-10-18。

</details>

### Documentation

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [DeepSeek · Agent Integrations](https://api-docs.deepseek.com/guides/anthropic_api/) | DeepSeek 官方的 agent 接入资料：模型作为后端，harness 由 Claude Code 等工具提供。 | 规划 / 编码 / 测试 |
| [AGENTS.md](https://agents.md/) | 为 coding agent 提供构建命令、测试规则和项目约定的开放 Markdown 格式。 | 规划 / 编码 / 测试 / 发布 |
| [Agent Skills](https://agentskills.io/home) | 用 SKILL.md、脚本和参考材料封装领域工作流的开放技能格式。 | 规划 / 编码 / 资产 / 场景 / 测试 / 发布 |
| [Codex · Create Browser-based Games](https://learn.chatgpt.com/use-cases/browser-games) | OpenAI 官方的浏览器游戏工作流：计划、工程指令、素材生成与真实浏览器迭代。 | 规划 / 编码 / 资产 / 测试 / 发布 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[DeepSeek · Agent Integrations](https://api-docs.deepseek.com/guides/anthropic_api/)**

Anthropic API 兼容层支持将 DeepSeek 接入现有工具循环，游戏工作流的文件操作、测试和引擎连接由所选 harness 承担。这里明确区分模型与执行框架；兼容文档列出部分忽略或不支持的字段，不能据此假定能力完全等价。

标签：`DeepSeek` · `模型后端` · `Harness` · `API 兼容` · `概念边界`。来源检查：2026-10-18。

**[AGENTS.md](https://agents.md/)**

游戏项目可在其中固定引擎版本、启动方式、目录规则、资源导入约定与验收命令，减少 agent 反复猜测环境。它是工程指令格式，不是 agent 运行时；不同客户端的发现与配置细节应单独核对。

标签：`项目指令` · `工程约定` · `开放格式` · `上下文`。来源检查：2026-10-18。

**[Agent Skills](https://agentskills.io/home)**

适合封装精灵归一化、GLB 导出、场景检查或回归测试等可重复的游戏工序，并按需加载领域知识。技能提供操作规程和资源，不会自动赋予引擎控制能力；工具、依赖和兼容客户端仍需存在。

标签：`Skills` · `开放格式` · `工作流` · `渐进加载`。来源检查：2026-10-18。

**[Codex · Create Browser-based Games](https://learn.chatgpt.com/use-cases/browser-games)**

先明确玩家目标、核心循环、输入和胜负条件，再以 PLAN.md 与 AGENTS.md 驱动实现；结合图像技能和 Playwright 做视觉与交互反馈。它是实践指南，不是对任意游戏类型都适用的性能保证或研究 benchmark。

标签：`官方工作流` · `浏览器游戏` · `Planning` · `Playwright` · `素材一致性`。来源检查：2026-10-18。

</details>

### Tool

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [MCP for Unity](https://github.com/CoplayDev/unity-mcp) | 连接通用 coding agent 与 Unity Editor 的社区 MCP 桥接工具。 | 编码 / 资产 / 场景 / 测试 / 发布 |
| [Godot MCP · Coding-Solo](https://github.com/Coding-Solo/godot-mcp) | 为 Godot 提供启动、运行、日志读取及基本场景操作的社区 MCP server。 | 编码 / 场景 / 测试 |
| [MCP for Blender](https://github.com/ahujasid/mcp-for-blender) | 通过 Blender 插件与 MCP server 让 agent 建模、改材质、执行 Python 并查看结果。 | 编码 / 资产 / 场景 / 测试 |
| [Unreal MCP · chongdashu](https://github.com/chongdashu/unreal-mcp) | 用 Python MCP server 与 UE C++ 插件连接 agent，操作 Actor、Blueprint 与视口。 | 编码 / 场景 / 测试 |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Microsoft 的浏览器自动化 MCP，可把页面结构、交互和浏览器反馈接入 agent。 | 测试 / 发布 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[MCP for Unity](https://github.com/CoplayDev/unity-mcp)**

把场景、GameObject、C# 脚本、素材和测试等编辑器操作暴露给 MCP 客户端，补上纯文本改代码无法读取的编辑器状态。项目明确不隶属 Unity Technologies；应配合编译日志、截图与 PlayMode 测试验证修改。

标签：`Unity` · `MCP` · `编辑器桥接` · `社区项目` · `C#`。来源检查：2026-10-18。 延伸：[安装与工具文档](https://coplaydev.github.io/unity-mcp/)

**[Godot MCP · Coding-Solo](https://github.com/Coding-Solo/godot-mcp)**

支持运行工程、捕获 debug 输出、创建场景和节点、加载 Sprite2D 纹理，也覆盖部分 3D MeshLibrary 操作。适合让 agent 在真实工程中获得反馈；不应把这些接口理解为完整视觉 playtest 或所有编辑器功能。

标签：`Godot` · `MCP` · `GDScript` · `运行日志` · `场景`。来源检查：2026-10-18。

**[MCP for Blender](https://github.com/ahujasid/mcp-for-blender)**

适合作为 3D 游戏资产生产与场景原型桥接层，结合视口反馈迭代几何、材质和布置。原名 blender-mcp，当前仓库与包已更名；它是第三方社区集成，输出仍需检查拓扑、尺度、UV、碰撞与导出兼容性。

标签：`Blender` · `MCP` · `Python` · `3D 资产` · `社区项目`。来源检查：2026-10-18。

**[Unreal MCP · chongdashu](https://github.com/chongdashu/unreal-mcp)**

覆盖 Actor 变换、Blueprint 类与组件、部分节点图以及编辑器摄像机操作，可用于研究 UE 场景和玩法原型的工具接口。作者明确标注 experimental，并不建议生产使用；应固定兼容版本并逐项验证实际支持范围。

标签：`Unreal Engine` · `MCP` · `Blueprint` · `实验性` · `编辑器桥接`。来源检查：2026-10-18。 延伸：[工具文档](https://github.com/chongdashu/unreal-mcp/tree/main/Docs)

**[Playwright MCP](https://github.com/microsoft/playwright-mcp)**

适合浏览器游戏的菜单、HUD、启动流程和网页交互检查，并可与截图、键盘动作及游戏调试接口组合。默认以结构化无障碍树为主，Canvas / WebGL 内部玩法状态需要额外观测；项目也提供 CLI + Skills 的工作流选择。

标签：`Playwright` · `MCP` · `浏览器测试` · `HUD` · `Canvas 边界`。来源检查：2026-10-18。

</details>

<a id="engines"></a>

## 游戏引擎、DCC 与工程生态

### Framework

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) | Three.js 的 React renderer，以组件与声明式场景结构连接 React 生态。 | 规划 / 编码 / 场景 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)**

适合 agent 把网页 HUD、应用状态和 3D 场景组合起来，并复用 pmndrs 的加载、交互和调试工具。它不自动提供完整游戏系统；React、Fiber 与 Three.js 版本需匹配，逐帧模拟也应明确边界。

标签：`Three.js` · `React` · `R3F` · `pmndrs` · `声明式场景`。来源检查：2026-10-18。 延伸：[源码](https://github.com/pmndrs/react-three-fiber)

</details>

### Documentation

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [Godot · Command Line Tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html) | Godot 官方命令行接口，覆盖 headless、脚本检查、资源导入、运行与导出。 | 编码 / 测试 / 发布 |
| [Godot Demo Projects](https://github.com/godotengine/godot-demo-projects) | Godot 官方可运行示例仓库，包含 2D、3D、GUI、音频、网络与渲染案例。 | 规划 / 编码 / 场景 / 测试 |
| [Unity · 2D Tech Demos](https://github.com/Unity-Technologies/2d-techdemos) | Unity 官方 2D 示例源码，展示 Tilemap、Scripted Tiles、画刷与运行时地图变化。 | 编码 / 资产 / 场景 / 测试 |
| [Lyra Sample Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) | Epic 官方模块化 UE5 游戏样例，包含玩法插件、能力系统、动画、输入和 UI。 | 规划 / 编码 / 场景 / 测试 |
| [Three.js · Examples](https://threejs.org/examples/) | Three.js 官方可运行图形案例与对应 HTML / JavaScript 源码。 | 编码 / 资产 / 场景 / 测试 |
| [Blender Python · API Quickstart](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst) | Blender 官方 API 教程源码，解释 bpy 数据、上下文、operators 与 Python 操作方式。 | 编码 / 资产 / 场景 / 测试 |
| [Phaser 3 · Examples](https://github.com/phaserjs/examples) | Phaser 官方示例源码库，为具体 API 和玩法组件提供可运行参考。 | 编码 / 场景 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[Godot · Command Line Tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)**

可让 coding agent 通过命令启动工程、读取日志、解析脚本并导出构建，减少对 GUI 的依赖。不同构建类型支持的参数不同；headless 能验证工程逻辑，却不能替代真实渲染和输入测试。

标签：`Godot` · `CLI` · `Headless` · `构建` · `可复现`。来源检查：2026-10-18。

**[Godot Demo Projects](https://github.com/godotengine/godot-demo-projects)**

适合作为 agent 的最小参考工程和回归任务来源，直接对照场景、脚本和资源组织方式。仓库明确 master 对应开发版；使用稳定引擎时应选择匹配分支，避免把版本不兼容误判成生成失败。

标签：`Godot` · `官方示例` · `可运行源码` · `版本分支` · `参考工程`。来源检查：2026-10-18。

**[Unity · 2D Tech Demos](https://github.com/Unity-Technologies/2d-techdemos)**

可让 agent 参考砖块碰撞定位、可破坏地图和调色板切换等具体实现，避免凭空猜测编辑器配置。示例工程与包清单应一起检查；旧项目不能保证适配任意当前 Editor 和包组合。

标签：`Unity` · `2D` · `Tilemap` · `官方示例` · `可运行源码`。来源检查：2026-10-18。

**[Lyra Sample Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)**

适合 agent 学习真实工程中 Game Feature Plugins、Experience 和 Gameplay Ability System 的协作方式。样例通过 Fab / Epic Launcher 获取源码与内容，需要匹配引擎版本；它比最小原型复杂，宜按模块阅读。

标签：`Unreal Engine` · `官方样例` · `GAS` · `模块化` · `可运行工程`。来源检查：2026-10-18。

**[Three.js · Examples](https://threejs.org/examples/)**

可为 agent 提供加载器、灯光、材质、动画和渲染技术的最小参考，再移植到游戏场景中。官网与 dev 分支持续变化，应固定同一 release 的源码、addons 与运行时版本，避免混用示例。

标签：`Three.js` · `官方示例` · `材质` · `加载器` · `可运行源码`。来源检查：2026-10-18。 延伸：[示例源码](https://github.com/mrdoob/three.js/tree/dev/examples)

**[Blender Python · API Quickstart](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst)**

可为 agent 生成资产脚本提供权威依据，尤其是直接数据访问与依赖当前模式、选中对象和视口的操作区别。bpy.ops 的 poll 可能因上下文失败，脚本应读取实际状态并验证产物，不能只检查没有语法错误。

标签：`Blender` · `Python` · `bpy` · `上下文` · `自动化`。来源检查：2026-10-18。 延伸：[API 文档入口](https://docs.blender.org/api/current/)

**[Phaser 3 · Examples](https://github.com/phaserjs/examples)**

适合 agent 逐项查找动画、摄像机、输入、物理和场景切换案例，再组合为游戏工程。仓库明确面向 Phaser 3，不能自动视为所有主版本的通用示例；应固定依赖并在真实浏览器测试。

标签：`Phaser` · `官方示例` · `可运行源码` · `2D` · `版本边界`。来源检查：2026-10-18。

</details>

### Tool

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [Godot Engine · 官方文档](https://docs.godotengine.org/en/stable/) | 开源 2D / 3D 游戏引擎，以场景、节点、资源与脚本组织可运行工程。 | 规划 / 编码 / 资产 / 场景 / 测试 / 发布 |
| [GUT · Godot Unit Test](https://github.com/bitwes/Gut) | 用 GDScript 编写断言、测试替身与参数化用例的 Godot 社区测试框架。 | 编码 / 测试 |
| [Unity · Manual](https://docs.unity3d.com/Manual/index.html) | Unity 官方工程、编辑器、脚本、渲染、物理、素材导入和发布文档入口。 | 规划 / 编码 / 资产 / 场景 / 测试 / 发布 |
| [Unity Test Framework](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html) | Unity 官方测试框架，支持 Edit mode、Play mode 以及命令行运行。 | 编码 / 测试 / 发布 |
| [Unreal Engine · Documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine) | Epic 官方 UE 文档，覆盖 C++、Blueprint、渲染、动画、物理与打包工作流。 | 规划 / 编码 / 资产 / 场景 / 测试 / 发布 |
| [Unreal · Automation Test Framework](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine) | UE 官方单元、功能、内容压力与截图比较测试基础设施。 | 编码 / 场景 / 测试 / 发布 |
| [Three.js](https://github.com/mrdoob/three.js) | 面向浏览器的 JavaScript 3D 渲染库，提供场景、摄像机、材质与加载器。 | 规划 / 编码 / 资产 / 场景 / 测试 / 发布 |
| [Blender](https://github.com/blender/blender) | 开源 3D 内容创作套件，覆盖建模、材质、骨骼、动画、模拟与渲染。 | 资产 / 场景 / 测试 |
| [Khronos · glTF-Blender-IO](https://github.com/KhronosGroup/glTF-Blender-IO) | Khronos 官方 Blender glTF 2.0 导入导出器源码，包含验证与往返测试。 | 资产 / 场景 / 测试 / 发布 |
| [Phaser · First Game Guide](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game) | 面向浏览器的 2D 游戏框架，官方教程串起素材加载、场景、动画、输入与碰撞。 | 规划 / 编码 / 资产 / 场景 / 测试 / 发布 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[Godot Engine · 官方文档](https://docs.godotengine.org/en/stable/)**

为 agent 提供 GDScript、C#、场景和资源 API 的权威上下文，适合构建从脚本到场景运行的开发闭环。应固定实际引擎版本并读取对应文档；stable 与开发分支并不等价。

标签：`Godot` · `GDScript` · `场景与节点` · `官方文档` · `开源`。来源检查：2026-10-18。 延伸：[引擎源码](https://github.com/godotengine/godot) · [官方示例](https://github.com/godotengine/godot-demo-projects)

**[GUT · Godot Unit Test](https://github.com/bitwes/Gut)**

提供 CLI 与 JUnit XML 输出，可将 agent 生成的游戏状态、伤害、库存等逻辑接入自动回归。GUT 与 Godot 版本有明确匹配关系；逻辑测试通过之后仍需检查画面、操作和场景集成。

标签：`Godot` · `单元测试` · `GDScript` · `CLI` · `JUnit`。来源检查：2026-10-18。 延伸：[作者文档](https://gut.readthedocs.io/)

**[Unity · Manual](https://docs.unity3d.com/Manual/index.html)**

为 agent 提供 C# 与编辑器工程的具体约束，并指向 2D / 3D 工作流和版本化包资料。应同时固定 Editor、渲染管线和 Package Manager 版本；只给出 Unity 名称不足以确定 API 与材质兼容性。

标签：`Unity` · `C#` · `官方文档` · `编辑器` · `Package Manager`。来源检查：2026-10-18。 延伸：[官方示例源码](https://github.com/Unity-Technologies/2d-techdemos)

**[Unity Test Framework](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html)**

可把 agent 生成的脚本和场景行为变成持续回归，并利用 UnityTest 跨帧检查生命周期、协程与状态变化。Edit mode 与 Play mode 的执行循环不同；测试应等待真正的帧或条件，避免仅验证脚本成功创建。

标签：`Unity` · `测试` · `Edit mode` · `Play mode` · `CLI`。来源检查：2026-10-18。 延伸：[包与 API 文档](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/)

**[Unreal Engine · Documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine)**

适合为 agent 提供 UE 工程和资产系统的权威上下文，并结合官方样例理解复杂玩法架构。引擎源码需要完成 Epic / GitHub 账号关联和相应访问步骤；源码可访问不等于开放源码许可证。

标签：`Unreal Engine` · `C++` · `Blueprint` · `官方文档` · `源码需授权`。来源检查：2026-10-18。 延伸：[源码访问说明](https://dev.epicgames.com/documentation/en-us/unreal-engine/downloading-source-code-in-unreal-engine) · [引擎源码（需授权）](https://github.com/EpicGames/UnrealEngine)

**[Unreal · Automation Test Framework](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine)**

可将 agent 修改后的 Blueprint 编译、关卡加载、输入模拟与画面回归纳入反馈循环，并连接 Functional Testing 等接口。测试需启用相应插件并清理状态；它不是独立于引擎运行的纯单元测试工具。

标签：`Unreal Engine` · `自动化测试` · `Blueprint` · `截图回归` · `内容验证`。来源检查：2026-10-18。

**[Three.js](https://github.com/mrdoob/three.js)**

适合 agent 在 TypeScript / JavaScript 中直接创建可浏览器测试的 3D 原型，并用源码和示例检查 API。它是渲染库，游戏循环、物理、导航、存档等系统需要自行设计或集成；WebGL 与 WebGPU 路径也需分别验证。

标签：`Three.js` · `JavaScript` · `WebGL` · `WebGPU` · `渲染库`。来源检查：2026-10-18。 延伸：[官方手册](https://threejs.org/manual/) · [官方示例](https://threejs.org/examples/)

**[Blender](https://github.com/blender/blender)**

在游戏开发规划中主要承担资产和场景生产，可由 agent 生成 Python 脚本执行可重复工序。它不是游戏运行时引擎；输出进入 Unity、UE、Godot 或浏览器后仍需检查尺度、坐标、材质、骨骼和动画。

标签：`Blender` · `DCC` · `3D 资产` · `动画` · `开源`。来源检查：2026-10-18。 延伸：[官方主仓库](https://projects.blender.org/blender/blender) · [参考手册](https://docs.blender.org/manual/en/latest/) · [Python API](https://docs.blender.org/api/current/)

**[Khronos · glTF-Blender-IO](https://github.com/KhronosGroup/glTF-Blender-IO)**

连接 Blender 资产生产与游戏运行时，可用于定位导出材质、网格和动画转换问题。仓库 CI 会验证导出并比较 import / export 往返结果；格式合法仍不保证目标引擎视觉一致，必须做运行时导入验证。

标签：`Blender` · `glTF` · `GLB` · `资产管线` · `往返验证`。来源检查：2026-10-18。 延伸：[技术说明](https://github.com/KhronosGroup/glTF-Blender-IO/blob/main/Technical.md)

**[Phaser · First Game Guide](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game)**

适合 agent 快速实现可浏览器测试的 2D 核心循环，并以 preload / create / update 组织代码。教程的 Arcade Physics 静态物体缩放后需刷新碰撞体；场景能显示不代表输入、重启与生命周期已验证。

标签：`Phaser` · `2D` · `JavaScript` · `浏览器游戏` · `Arcade Physics`。来源检查：2026-10-18。 延伸：[框架源码](https://github.com/phaserjs/phaser) · [官方文档](https://docs.phaser.io/)

</details>

### Community

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [GDQuest · First 2D Game](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/) | 由 GDQuest 作者提供完整脚本、工程和排错记录的 Godot 2D 生存游戏教程。 | 规划 / 编码 / 场景 / 测试 |
| [Catlike Coding · Surface Contact](https://catlikecoding.com/unity/tutorials/movement/surface-contact/) | Jasper Flick 的 Unity 运动排错教程，以坡面、台阶和接触时序解释角色控制问题。 | 编码 / 场景 / 测试 |
| [Epic Developer Community · UE](https://dev.epicgames.com/community/unreal-engine) | Epic 的 UE 社区入口，可发现作者教程、学习材料与版本相关讨论。 | 规划 / 编码 / 资产 / 场景 / 测试 |
| [Three.js · Instanced Crowd 工程经验](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928) · 2026 | 游戏作者在 Three.js 论坛复盘单次绘制的人群系统、实例数据、LOD 与分帧更新。 | 编码 / 场景 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[GDQuest · First 2D Game](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/)**

覆盖移动、瞄准、投射物、敌人生成和失败状态，可作为 agent 实现完整核心循环的参考。作者解释 grounded / floating 模式引起的粘连问题及敌人数上限；代码与素材许可证不同，复用时应分别核对。

标签：`Godot` · `社区经验` · `完整核心循环` · `碰撞排错` · `2D`。来源检查：2026-10-18。 延伸：[工程源码](https://github.com/gdquest-demos/getting-started-with-godot-4) · [教程库](https://www.gdquest.com/library/)

**[Catlike Coding · Surface Contact](https://catlikecoding.com/unity/tutorials/movement/surface-contact/)**

作者用测试场景逐步复现离地、ghost collision、射线与地面吸附问题，适合为 agent 提供物理行为的因果解释。教程基于旧 Unity 版本，算法思路可参考，但 API、输入和项目配置需要对照当前版本调整。

标签：`Unity` · `社区经验` · `物理` · `角色控制` · `排错`。来源检查：2026-10-18。 延伸：[完整运动系列](https://catlikecoding.com/unity/tutorials/movement/) · [Shader 与工程教程](https://catlikecoding.com/unity/tutorials/)

**[Epic Developer Community · UE](https://dev.epicgames.com/community/unreal-engine)**

适合补充官方参考之外的具体工程经验，例如材质、动画、Blueprint 和性能排错。社区内容应核对作者、发布时间、引擎版本与可复现工程；入口可访问不代表每一篇帖子都已核验。

标签：`Unreal Engine` · `社区` · `教程` · `经验发现` · `逐篇核验`。来源检查：2026-10-18。

**[Three.js · Instanced Crowd 工程经验](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928)**

可给 agent 提供可解释的性能优化方向，并通过作者链接的可玩 Demo 检查技术与视觉取舍。具体帧率属于作者设备上的自报结果，不能当作跨硬件 benchmark；优化后仍应测量 GPU、CPU、带宽与画面质量。

标签：`Three.js` · `社区经验` · `Instancing` · `LOD` · `性能`。来源检查：2026-10-18。 延伸：[社区论坛](https://discourse.threejs.org/)

</details>

<a id="2d"></a>

## 2D 游戏开发 AI 工作

### Agent

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [OpenGame](https://github.com/leigest519/OpenGame) · 2026 | 围绕模板、调试技能和 GameCoder 模型组织端到端网页游戏生成。 | 规划 / 编码 / 资产 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[OpenGame](https://github.com/leigest519/OpenGame)**

从自然语言需求生成可运行网页项目，Game Skill 包含 Template Skill 与 Debug Skill，覆盖 Canvas、Phaser、three.js 等模板。论文通过浏览器运行与视觉评判研究构建、可用性和意图对齐；核验时 README 仍将独立评测管线列为待发布，不能把论文结果等同于完整可复现套件。

标签：`网页游戏` · `Game Skill` · `浏览器反馈` · `GameCoder-27B`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2604.18394)

</details>

### Framework

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [GameGPT](https://arxiv.org/abs/2310.08067) · 2023 | 用多角色协作、分层规划与代码生成研究自动游戏开发。 | 规划 / 编码 / 测试 |
| [GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier) · 2026 | 通过运行时状态注入和关键点拆分验证生成游戏的行为。 | 编码 / 测试 |
| [GAVEL](https://github.com/gdrtodd/gavel) · 2024 | 结合语言模型与质量多样性搜索生成新的棋盘游戏规则。 | 规划 / 编码 / 测试 |
| [Cardiverse](https://github.com/danruili/Cardiverse) · 2025 | 把卡牌玩法构思、Python 规则代码和试玩策略连成原型管线。 | 规划 / 编码 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[GameGPT](https://arxiv.org/abs/2310.08067)**

输入游戏需求，由规划、审查与实现角色协作拆解并生成代码，论文重点处理幻觉和冗余。它是较早的游戏开发 agent 框架研究；关联仓库仅见论文与 README，不能当作已验证可直接部署的完整产品。

标签：`多智能体` · `需求拆解` · `研究原型`。来源检查：2026-10-18。 延伸：[作者仓库](https://github.com/leyiwo/GameGPT)

**[GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier)**

将游戏需求拆成可独立检查的关键点，通过浏览器与运行时适配器检验功能，仓库提供 GGV-Harness 和供 Codex、Claude 使用的 verifier skills。它研究生成游戏的功能验证，公开代码不包含所有生成游戏、运行输出及私有配置；状态钩子提供的可观测性也不同于纯黑盒试玩。

标签：`功能验证` · `Playwright` · `Runtime state` · `Verifier Skill`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2605.07442)

**[GAVEL](https://github.com/gdrtodd/gavel)**

以 Ludii 游戏描述代码为表示，模型对规则进行变异和重组，再用模拟与搜索筛选游戏。代码、实验和相关模型数据入口已公开；其产物是规则系统中的棋盘游戏，不能把结果外推为通用 2D 动作游戏开发能力。

标签：`游戏设计` · `Ludii` · `进化搜索` · `规则生成`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2407.09388)

**[Cardiverse](https://github.com/danruili/Cardiverse)**

输入卡牌游戏描述，利用机制图和检索生成变体与代码，再通过生成的对局记录迭代检查规则一致性。仓库同时提供玩法 AI 竞技场，但开发贡献主要是规则与代码原型；公开替代规则文本与论文原始输入存在复现差异。

标签：`卡牌` · `机制图` · `代码生成` · `自对弈验证`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2502.07128)

</details>

### Skill

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge) | 把角色参考图、生成动画与确定性处理组合成可导出的 sprite 技能。 | 资产 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge)**

由已审阅主图生成动作片段，再执行抠像、配准、循环选择、节奏修正和 atlas 打包，并提供 Godot、Aseprite 与网页导出。当前 README 明确部分新版编辑器导出只验证了解析往返，尚未在所有目标编辑器中打开确认，需保留导入与视觉验收步骤。

标签：`Agent Skill` · `Sprite pipeline` · `动画` · `资产 QA`。来源检查：2026-10-18。

</details>

### Benchmark

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [GameDevBench](https://github.com/waynchi/gamedevbench) · 2026 | 以 Godot 项目修改任务评测 coding agent 的游戏开发能力。 | 编码 / 场景 / 测试 |
| [GameXpert-Bench](https://arxiv.org/abs/2608.21833) · 2026 | 把游戏创建、缺陷修复和多轮优化拆成三个开发评测轨道。 | 规划 / 编码 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[GameDevBench](https://github.com/waynchi/gamedevbench)**

当前仓库包含 333 个任务，覆盖 2D、3D、UI 与玩法逻辑，输入现有项目和任务需求，输出可由引擎验证的修改。官方可比较运行要求 Godot 4.4.1，提供图像或视频反馈；它衡量受限开发任务，不直接衡量从零制作商业游戏的质量。

标签：`开发评测` · `Godot` · `多模态` · `视觉反馈`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2602.11103)

**[GameXpert-Bench](https://arxiv.org/abs/2608.21833)**

论文以完整开发轨迹提出 GameGen、GameFix 与 GameOpt 三个互补任务，研究一次生成之外的开发生命周期。核验时官方仓库仍说明数据与评测代码正在准备公开，因此应标为论文与协议入口，暂不宣称开箱即用。

标签：`开发评测` · `缺陷修复` · `多轮优化` · `待完整发布`。来源检查：2026-10-18。 延伸：[官方仓库与发布状态](https://github.com/Kwen-Chen/GameXpert-Bench)

</details>

### Paper

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [MarioGPT](https://github.com/shyamsn97/mario-gpt) · 2023 | 用语言条件 GPT 模型生成可游玩的 Mario 风格关卡布局。 | 规划 / 场景 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[MarioGPT](https://github.com/shyamsn97/mario-gpt)**

输入敌人、管道和高度等文本描述，输出字符网格关卡、预览图，并可调用交互模拟器或 A* 检查。它生成既有规则下的关卡内容，适合研究可控 PCG，范围不包括游戏引擎、角色美术或完整玩法代码生成。

标签：`PCG` · `关卡生成` · `Text-to-level` · `GPT-2`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2302.05981)

</details>

### Tool

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [Agent Game Forge](https://github.com/0x0funky/agent-game-forge) | 为 Codex 或 Claude Code 提供带场景编辑器的本地 2D 游戏 IDE。 | 规划 / 编码 / 资产 / 场景 / 测试 / 发布 |
| [Text2Game](https://github.com/boltomli/t2g) | 将长文本拆成世界观、人物与事件，再生成交互叙事原型。 | 规划 / 编码 / 场景 |
| [PixelLab AI Agent Toolkit](https://www.pixellab.ai/mcp) | 通过 API 与 MCP 为 agent 生成像素角色、动画与可拼接 tileset。 | 资产 / 场景 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[Agent Game Forge](https://github.com/0x0funky/agent-game-forge)**

自然语言需求经 agent、素材流程与 JSON 场景数据变成 JS + Canvas 游戏，用户可在可视化编辑器中调整布局和碰撞。README 将网页作为当前默认输出，Godot 与 Unity 的完整支持仍列在路线图，项目自身标为 pre-launch。

标签：`2D IDE` · `Canvas` · `场景编辑` · `原型工具`。来源检查：2026-10-18。

**[Text2Game](https://github.com/boltomli/t2g)**

文本先分块分析和合并，再生成 Twine/Chapbook HTML 或 Godot 视觉小说项目。仓库提供 Python 管线与示例，适合文本叙事到可玩原型的研究；它不提供任意动作游戏的一般生成保证。

标签：`交互叙事` · `Twine` · `Godot` · `视觉小说`。来源检查：2026-10-18。

**[PixelLab AI Agent Toolkit](https://www.pixellab.ai/mcp)**

工具接受角色描述、方向、动作及地形条件，返回像素资产；支持四或八方向角色、横版与俯视 tileset。它属于商业资产服务，MCP 将素材能力接入 coding agent，游戏规则、碰撞和资源导入仍需项目工作流完成。

标签：`像素美术` · `Sprite` · `Tileset` · `MCP` · `商业服务`。来源检查：2026-10-18。 延伸：[文档](https://www.pixellab.ai/docs)

</details>

<a id="3d"></a>

## 3D 游戏开发 AI 工作

### Framework

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A) · 2026 | 以 skills、模型管线和引擎适配器协调游戏资产、玩法与 UI 生成。 | 规划 / 编码 / 资产 / 场景 / 测试 |
| [Infinigen](https://github.com/princeton-vl/infinigen) · 2023 | 用 Blender 程序化规则生成自然与室内场景及合成数据。 | 资产 / 场景 / 测试 |
| [Holodeck](https://github.com/allenai/Holodeck) · 2024 | 根据文本布局并布置可交互的 3D 室内环境。 | 规划 / 场景 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A)**

coding agent 从需求出发调用图像、3D、动作、声音等管线，产出资产与引擎原生代码，提供 UE5、Unity、Godot、Blender 和 three.js 上下文。演示混用生成与既有资源，3A 是项目命名而非商业品质验证；它与 Kling 的视频世界模型 GameFactory 是不同项目。

标签：`Agent Skills` · `资产管线` · `多引擎` · `游戏生成`。来源检查：2026-10-18。 延伸：[中文文档](https://github.com/OpenDCAI/GameFactory-3A/blob/main/README_zh.md)

**[Infinigen](https://github.com/princeton-vl/infinigen)**

通过随机种子、参数和资产生成器产出几何、材质、场景及标注，并提供 OBJ、OpenUSD 等导出文档。它是程序化生成系统而非语言模型；可作为 AI 开发流程的可控场景与数据后端，实时游戏仍需优化、碰撞和玩法整合。

标签：`程序化生成` · `Blender` · `合成数据` · `场景`。来源检查：2026-10-18。 延伸：[项目与论文](https://infinigen.org/)

**[Holodeck](https://github.com/allenai/Holodeck)**

以房间需求为输入，组合语言规划、资产检索和空间约束生成 AI2-THOR 场景，并提供在 Unity 中载入的说明。主要评测目标是具身 AI 环境生成，适合借鉴场景布局与语义交互，不能直接宣称完成游戏关卡设计或商业发布。

标签：`Text-to-scene` · `AI2-THOR` · `空间约束` · `具身环境`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2312.09067)

</details>

### Skill

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [Unity 官方 Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) | 由 Unity 维护的工程技能包，为通用 coding agent 提供引擎上下文。 | 规划 / 编码 / 场景 / 测试 / 发布 |
| [Godot MCP 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets) | 用 Godot 原生几何和验证流程创建可复用的风格化 3D 资产。 | 资产 / 场景 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[Unity 官方 Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin)**

为 Claude Code、Codex、Grok 提供 2D、UI、渲染、导航、物理和联机等任务技能，并连接 Unity CLI 与 MCP 控制。官方要求 Unity 6.0+；当前 CLI 的 MCP 模式接替旧 assistant 包内的 MCP，使用前应按对应版本文档配置。

标签：`官方` · `Agent Skills` · `Unity` · `CLI` · `MCP`。来源检查：2026-10-18。 延伸：[技能源码](https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills) · [CLI / MCP 迁移](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli)

**[Godot MCP 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets)**

输入项目风格与资产需求，通过 Godot MCP 和确定性构建器产出 PackedScene，并检查接地、碰撞、导航与截图。它面向 Codex、Claude Code，可复用现有项目资源；需要兼容 MCP 能力，不是图像到网格的生成模型。

标签：`Godot` · `Agent Skill` · `PackedScene` · `资产 QA`。来源检查：2026-10-18。

</details>

### Benchmark

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [GameEngineBench](https://arxiv.org/abs/2607.03525) · 2026 | 在真实 Unreal Engine 项目中验证 agent 的 C++ 运行时修改。 | 编码 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[GameEngineBench](https://arxiv.org/abs/2607.03525)**

论文版本包含来自九个项目的 110 个任务，输入可构建起点、限定编辑文件和行为规范，输出通过编译与引擎行为测试的补丁。它覆盖复制状态、生命周期、动画等集成问题，范围是局部 C++ 实现任务，不是完整 3D 游戏生成评分。

标签：`开发评测` · `Unreal Engine` · `C++` · `行为测试`。来源检查：2026-10-18。 延伸：[论文指向的代码仓库](https://github.com/Nitrode-Research/GameEngineBench)

</details>

### Paper

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [Video2Game](https://github.com/video2game/video2game) · 2024 | 把实景视频重建为可在浏览器中运行和交互的 3D 环境。 | 资产 / 场景 / 世界模型 |
| [BlenderLLM / BlendNet / CADBench](https://github.com/FreedomIntelligence/BlenderLLM) · 2024 | 研究从文本生成 Blender 脚本，并发布配套训练数据和建模评测。 | 资产 / 测试 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[Video2Game](https://github.com/video2game/video2game)**

视频及相机信息经重建、网格提取、外观烘焙与碰撞生成，进入 three.js 游戏环境，仓库也说明如何导入 UE。它是显式环境重建路线，仍有手动场景配置和物理整合工作；与只预测下一帧的交互视频世界模型应分开展示。

标签：`Video-to-3D` · `重建` · `Three.js` · `碰撞`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2404.09833)

**[BlenderLLM / BlendNet / CADBench](https://github.com/FreedomIntelligence/BlenderLLM)**

BlenderLLM 根据用户指令输出 bpy 建模脚本，BlendNet 提供约 12K 对样本，CADBench 覆盖合成及论坛来源任务。它评测的是基础 CAD 式建模与指令遵循，README 明确限制高级材质、多模态输入和多轮协作，不是游戏创建 benchmark。

标签：`Text-to-bpy` · `CADBench` · `数据集` · `建模评测`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2412.14203) · [BlendNet 数据集](https://huggingface.co/datasets/FreedomIntelligence/BlendNet) · [CADBench](https://huggingface.co/datasets/FreedomIntelligence/CADBench)

</details>

### Tool

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [MCP Unity Editor](https://github.com/CoderGamester/mcp-unity) | 通过社区 MCP 桥接让 agent 查询、修改并测试 Unity 项目。 | 编码 / 场景 / 测试 |
| [Hunyuan3D 2.x](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) · 2025 | 把参考图像转换为几何与纹理，提供可接入 DCC 的 3D 资产生成管线。 | 资产 |
| [TRELLIS](https://github.com/microsoft/TRELLIS) · 2024 | 用统一结构化潜表示生成 mesh、Gaussian 与辐射场资产。 | 资产 |
| [TripoSR](https://github.com/VAST-AI-Research/TripoSR) · 2024 | 从单张物体图像快速重建 3D 模型，适合资产原型阶段。 | 资产 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[MCP Unity Editor](https://github.com/CoderGamester/mcp-unity)**

将场景、GameObject、组件、Prefab、日志和 Unity Test Runner 等操作暴露给 MCP 客户端。它是 CoderGamester 维护的第三方工具而非 Unity 官方插件；可执行编辑器操作不等同于已生成正确玩法，仍需编译、试玩与项目测试。

标签：`Unity` · `MCP` · `编辑器自动化` · `社区工具`。来源检查：2026-10-18。

**[Hunyuan3D 2.x](https://github.com/Tencent-Hunyuan/Hunyuan3D-2)**

2.0 管线先由 Hunyuan3D-DiT 生成形状，再由 Hunyuan3D-Paint 为网格生成纹理，可导出 GLB、OBJ 并通过 Blender addon 调用。它解决单体资产生产的一部分；拓扑、LOD、骨骼、碰撞与运行性能仍需游戏管线验收，模型版本与许可需分别记录。

标签：`Image-to-3D` · `Mesh` · `纹理` · `Blender`。来源检查：2026-10-18。 延伸：[2.0 论文](https://arxiv.org/abs/2501.12202) · [2.1 仓库](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1)

**[TRELLIS](https://github.com/microsoft/TRELLIS)**

输入图像或文本，解码出多种 3D 表示，官方示例可导出带纹理 GLB 并做简化。游戏常规资产管线主要使用其 mesh 分支；Gaussian 或 radiance field 输出本身不包含可用碰撞、动画和玩法逻辑。

标签：`Image-to-3D` · `Text-to-3D` · `GLB` · `Structured Latents`。来源检查：2026-10-18。 延伸：[论文](https://arxiv.org/abs/2412.01506)

**[TripoSR](https://github.com/VAST-AI-Research/TripoSR)**

基于 LRM 思路做前馈重建，公开代码、预训练模型及演示，输入图像后生成可导出的对象网格。它面向单体物体重建，隐藏面、拓扑和游戏性能需要额外处理，不能视作完整场景或可玩游戏生成器。

标签：`Image-to-3D` · `重建` · `Mesh` · `原型资产`。来源检查：2026-10-18。

</details>

<a id="world"></a>

## Coding World Models 与交互世界

### Framework

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/) · 2026 | 代码引擎维护世界，流式扩散模型把语义图渲染成游戏画面。 | 编码 / 场景 / 世界模型 |
| [Oasis: A Universe in a Transformer](https://oasis-model.github.io/) · 2024 | 根据键盘输入自回归生成画面的开放神经游戏示例。 | 编码 / 世界模型 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)**

NVIDIA Sol-Engine 的 Interactive Coding Worlds 系统以 three.js 赛车为示例：引擎执行地图、物理、碰撞和玩家输入，MiniMax-H3 的两步流式模型根据语义视频、首帧与提示词生成外观。官方性能结果依赖 8 张 GB200，渲染吞吐与从按键到屏幕的端到端延迟需要分别评估。

标签：`hybrid-renderer` · `executable-state` · `streaming` · `three.js` · `MiniMax-H3` · `NVIDIA`。来源检查：2026-10-18。 延伸：[Sol-Engine](https://nvlabs.github.io/Sana/Sol-Engine/) · [Agent 工作流](https://nvlabs.github.io/Sana/Sol-Engine/docs/agent-workflow/)

**[Oasis: A Universe in a Transformer](https://oasis-model.github.io/)**

Decart 与 Etched 的 Oasis 用 Transformer 自编码器和潜在扩散模型生成 Minecraft 风格交互，并开放 500M 模型的推理代码与权重。官方明确指出长时序记忆、物品栏精确控制、域泛化和物体一致性仍有限，适合研究原型与生成推理，而非确定性玩法逻辑。

标签：`neural-simulator` · `interactive-video` · `transformer` · `Minecraft` · `released-code`。来源检查：2026-10-18。 延伸：[推理代码](https://github.com/etched-ai/open-oasis)

</details>

### Paper

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [SolarRenderer](https://enderfga.cn/SolarRenderer/) · 2026 | 把引擎或 Agent 生成的结构视频变成可换风格的最终画面。 | 编码 / 场景 / 世界模型 |
| [Code World Model: Coding Agent as World Brain](https://arxiv.org/abs/2608.25927) · 2026 | 让 Coding Agent 编写可执行规则，用持久状态驱动视频世界。 | 规划 / 编码 / 世界模型 |
| [Programmable World Model](https://arxiv.org/abs/2609.10540) · 2026 | 显式全局状态与可编程规则，保证画面外的实体仍持续存在。 | 编码 / 测试 / 世界模型 |
| [CoDeR — Code Plans, Diffusion Renders](https://arxiv.org/abs/2609.26458) · 2026 | 多角色协作构造可执行世界，再以扩散模型实现视觉观察。 | 规划 / 编码 / 世界模型 |
| [Magpie: Real-Time World Renderer for Interactive Games](https://arxiv.org/abs/2608.27168) · 2026 | 游戏引擎执行玩法，独立 Render Server 生成最终视觉。 | 编码 / 场景 / 世界模型 |
| [SolarWM](https://arxiv.org/abs/2609.02886) · 2026 | 开放数据、训练和长时序推理的交互视频世界模型框架。 | 编码 / 场景 / 世界模型 |
| [WorldCoder](https://arxiv.org/abs/2402.12275) · 2024 | 从环境交互归纳 Python 世界模型，再在模型内规划。 | 规划 / 编码 / 世界模型 |
| [GIF-MCTS / Code World Models Benchmark](https://arxiv.org/abs/2405.15383) · 2024 | 通过生成、改进、修复的树搜索合成可运行环境模型。 | 规划 / 编码 / 测试 / 世界模型 |
| [Code World Models for General Game Playing](https://arxiv.org/abs/2510.04542) · 2025 | 把自然语言游戏规则编译成可验证模拟器，支持 MCTS 搜索。 | 规划 / 编码 / 测试 / 世界模型 |
| [PoE-World](https://arxiv.org/abs/2505.10819) · 2025 | 用多个小型程序专家组合随机世界的动力学。 | 规划 / 编码 / 世界模型 |
| [FactorSim](https://arxiv.org/abs/2409.17652) · 2024 | 按因子化状态结构，从语言描述生成完整仿真代码。 | 规划 / 编码 / 测试 / 世界模型 |
| [Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391) · 2024 | 从无动作标签视频学习可由潜在动作控制的 2D 世界。 | 世界模型 |
| [GameNGen — Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837) · 2024 | 从 DOOM 游戏轨迹训练可交互的扩散模拟器。 | 测试 / 世界模型 |
| [DIAMOND — Diffusion for World Modeling](https://arxiv.org/abs/2405.12399) · 2024 | 保留关键像素细节，在扩散世界模型内训练强化学习 Agent。 | 测试 / 世界模型 |
| [GameFactory](https://arxiv.org/abs/2501.08325) · 2025 | 将开放域视频生成能力与键盘、鼠标动作控制结合。 | 世界模型 |
| [WonderWorld](https://arxiv.org/abs/2406.09394) · 2024 | 从单图快速建立可探索、可继续扩展的显式 3D 场景。 | 资产 / 场景 / 世界模型 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[SolarRenderer](https://enderfga.cn/SolarRenderer/)**

Few-Step Generative Reference Rendering：以语义图、灰盒、骨架、深度等结构、可选首帧和文本控制 MiniMax-H3，使用控制 LoRA 与四步 LoRA 生成视频，并提供块因果流式版本。它负责视觉呈现，世界状态与玩法规则仍需由上游程序维护；四步采样本身不等于消费级设备上的实时交互。

标签：`hybrid-renderer` · `structure-conditioning` · `streaming` · `MiniMax-H3` · `LoRA` · `released-code`。来源检查：2026-10-18。 延伸：[代码](https://github.com/Enderfga/SolarRenderer) · [论文 PDF](https://enderfga.cn/data/solarrenderer.pdf) · [权重](https://huggingface.co/Enderfga/SolarRenderer) · [数据与评测](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data) · [使用文档](https://github.com/Junchao-cs/SolarWM/blob/main/docs/solar_renderer.md)

**[Code World Model: Coding Agent as World Brain](https://arxiv.org/abs/2608.25927)**

把世界演化与视觉生成拆开：Agent 编写、调用和修改代码维护状态，编译器将状态变成 proxy 视频与提示词，再由经过微调的 MiniMax-H3 渲染。官方公开仓库包含推理代码、LoRA 与条件示例；用于生成 proxy 的游戏代码基础不可再分发，因此完整 Agent 到引擎链路尚不能按公开材料原样复现。

标签：`code-world-model` · `coding-agent` · `executable-state` · `hybrid-renderer` · `MiniMax-H3` · `partial-release`。来源检查：2026-10-18。 延伸：[项目](https://buaacyw.github.io/cwm/) · [推理代码](https://github.com/buaacyw/code-world-model) · [复现范围](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)

**[Programmable World Model](https://arxiv.org/abs/2609.10540)**

Agent 把指令转换为实体状态和状态转移程序，轻量引擎维护全局状态，再将带状态的 3D 有向包围盒与相机轨迹编译成视频模型控制信号。论文提出 CombatStateBench 检查实体数量和不可逆状态；公开仓库当前主要是项目说明，不能据此认定完整推理代码与权重均已发布。

标签：`code-world-model` · `executable-state` · `hybrid-renderer` · `persistent-state` · `CombatStateBench`。来源检查：2026-10-18。 延伸：[项目与发布进度](https://github.com/AlayaLab/pwm)

**[CoDeR — Code Plans, Diffusion Renders](https://arxiv.org/abs/2609.26458)**

Code Plans, Diffusion Renders: Open-Ended Generative World Modeling 用五种协作角色将概念转换为规则、代码与观察，让多个实体在当前视野之外继续演化。论文关注长期记忆、开放交互和多 Agent 世界；摘要写明代码与权重将公开，阅读时应区分论文结果和已经可用的发布物。

标签：`code-world-model` · `multi-agent` · `hybrid-renderer` · `persistent-state` · `research`。来源检查：2026-10-18。 延伸：[项目](https://becauseimbatman0.github.io/CoDeR)

**[Magpie: Real-Time World Renderer for Interactive Games](https://arxiv.org/abs/2608.27168)**

设计者在常规游戏引擎中定义场景与规则；运行时引擎处理玩家动作并维护状态，渲染服务把引擎输出的白盒帧转成视觉画面。它展示了生成式渲染与可复现玩法的系统分工，主要价值在降低原型对完整美术资产的依赖。

标签：`hybrid-renderer` · `executable-state` · `game-engine` · `render-server` · `research`。来源检查：2026-10-18。

**[SolarWM](https://arxiv.org/abs/2609.02886)**

Open Data and Scalable Training for Long-Horizon Video World Models 统一 Wan、LTX 与 MiniMax-H3 等骨干的数据、训练和推理接口，以双向适配、教师强制和分布匹配蒸馏训练相机控制的流式模型。它提供世界模型的基础设施；相机可控的视频续写与拥有可查询实体状态的代码世界是不同能力。

标签：`interactive-video` · `training-framework` · `camera-control` · `streaming` · `released-code`。来源检查：2026-10-18。 延伸：[代码与文档](https://github.com/Junchao-cs/SolarWM) · [项目](https://junchao-cs.github.io/SolarWM-Web/)

**[WorldCoder](https://arxiv.org/abs/2402.12275)**

WorldCoder, a Model-Based LLM Agent 把对世界的知识表示为可执行 Python 程序，并用交互记录约束程序、通过规划寻找潜在回报。NeurIPS 2024 工作主要在网格世界与任务规划上验证，适合理解规则发现与模型修复，不能直接当作完整视觉游戏生成器。

标签：`code-world-model` · `program-synthesis` · `model-based-planning` · `gridworld` · `NeurIPS-2024`。来源检查：2026-10-18。

**[GIF-MCTS / Code World Models Benchmark](https://arxiv.org/abs/2405.15383)**

Generating Code World Models with Large Language Models Guided by Monte Carlo Tree Search 将转移、奖励与终止逻辑写成 Python，以轨迹和测试反馈指导 GIF-MCTS 搜索。论文同时发布包含 18 个强化学习环境的 CWMB，评估模型正确性以及下游规划，适合做代码世界模型的基础阅读与评测入口。

标签：`code-world-model` · `program-synthesis` · `MCTS` · `benchmark` · `CWMB` · `NeurIPS-2024`。来源检查：2026-10-18。 延伸：[代码与 CWMB](https://github.com/nicoladainese96/code-world-models) · [项目](https://sites.google.com/view/code-world-models/home)

**[Code World Models for General Game Playing](https://arxiv.org/abs/2510.04542)**

从规则与游戏轨迹生成 Python 状态转移、合法动作和终止函数，并生成启发式价值与隐藏状态推断函数辅助规划。论文在 10 个完全或部分可观察的棋盘、纸牌等游戏上评估；避免非法动作依赖合成规则本身正确，不能省略模型验证。

标签：`code-world-model` · `game-rules` · `MCTS` · `formal-simulator` · `imperfect-information`。来源检查：2026-10-18。

**[PoE-World](https://arxiv.org/abs/2505.10819)**

Compositional World Modeling with Products of Programmatic Experts 将 LLM 合成的小程序组成指数加权专家乘积，从少量观察学习复杂、带随机性的世界模型。论文在 Pong 与 Montezuma's Revenge 中将模型接入规划器，展示样本效率与新关卡泛化，属于程序化动力学建模而非生成式美术工具。

标签：`code-world-model` · `program-synthesis` · `stochastic-dynamics` · `Atari` · `model-based-planning`。来源检查：2026-10-18。 延伸：[代码](https://github.com/topwasu/poe-world) · [项目](https://topwasu.github.io/poe-world)

**[FactorSim](https://arxiv.org/abs/2409.17652)**

Generative Simulation via Factorized Representation 利用因子化 POMDP 表示减少每次生成所需上下文，目标是生成可用于训练 Agent 的完整游戏或机器人模拟器。NeurIPS 2024 工作同时提供生成式仿真评测，适合研究从设计规格到模块化规则代码的流程。

标签：`code-world-model` · `simulation-generation` · `POMDP` · `benchmark` · `NeurIPS-2024`。来源检查：2026-10-18。 延伸：[项目](https://cs.stanford.edu/~sunfanyun/factorsim/)

**[Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391)**

以时空视频 tokenizer、自回归动力学和潜在动作模型构成生成式交互环境，从图片或草图等条件开始逐帧探索。ICML 2024 的核心是无需真实动作标签的控制学习，世界动态隐含在模型中，并没有提供可编辑、可查询的游戏规则程序。

标签：`interactive-video` · `latent-actions` · `neural-simulator` · `2D-platformer` · `ICML-2024`。来源检查：2026-10-18。

**[GameNGen — Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837)**

先由强化学习 Agent 采集游戏轨迹，再训练扩散模型根据历史画面与动作预测下一帧，并用条件噪声增强缓解自回归误差。论文展示单 TPU 上的实时 DOOM 模拟；这是特定游戏的神经模拟，不能自动获得可维护的通用游戏规则与资产管线。

标签：`neural-simulator` · `interactive-video` · `diffusion` · `DOOM` · `ICLR-2025`。来源检查：2026-10-18。 延伸：[项目](https://gamengen.github.io/)

**[DIAMOND — Diffusion for World Modeling](https://arxiv.org/abs/2405.12399)**

Visual Details Matter in Atari 研究扩散模型如何作为环境模型，使 Agent 在想象轨迹中学习，并分析视觉细节对策略的影响。除 Atari 100k 评测外，论文还用静态 CS:GO 录像训练可玩的神经引擎，适合研究仿真、控制与误差积累。

标签：`neural-simulator` · `interactive-video` · `diffusion` · `Atari` · `reinforcement-learning` · `NeurIPS-2024`。来源检查：2026-10-18。 延伸：[代码与可玩模型](https://diamond-wm.github.io/)

**[GameFactory](https://arxiv.org/abs/2501.08325)**

Creating New Games with Generative Interactive Videos 提供 GF-Minecraft 动作标注数据与控制模块，借助域适配器解耦游戏风格和动作学习，并支持自回归续写。它生成动作可控的游戏视频，场景外观泛化能力应与规则正确性、物品持久性和可导出工程分别评估。

标签：`interactive-video` · `neural-simulator` · `action-control` · `Minecraft` · `dataset` · `ICCV-2025`。来源检查：2026-10-18。 延伸：[代码](https://github.com/KlingAIResearch/GameFactory)

**[WonderWorld](https://arxiv.org/abs/2406.09394)**

Interactive 3D Scene Generation from a Single Image 使用 Fast Layered Gaussian Surfels 与引导深度扩散，按相机移动和提示词连接新的场景。它有显式空间表示与实时渲染，但主要解决几何和外观生成，交互玩法、物理与持久动态状态仍需另外实现。

标签：`scene-generation` · `explicit-3d` · `Gaussian-surfels` · `camera-control` · `CVPR-2025`。来源检查：2026-10-18。 延伸：[项目](https://kovenyu.com/WonderWorld/)

</details>

### Tool

| 资源 | 用途与定位 | 阶段 |
| --- | --- | --- |
| [Genie 3 / Project Genie](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) · 2025 | 由提示词生成可实时探索的交互视频世界。 | 规划 / 世界模型 |
| [World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model) · 2025 | 生成持久、可导航的 3D 场景，并导出 splat 与网格。 | 资产 / 场景 / 世界模型 |

<details>
<summary>输入、输出、边界与延伸阅读</summary>

**[Genie 3 / Project Genie](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)**

Google DeepMind 在 2025 年公布 Genie 3，展示 720p、24 FPS 和持续数分钟的一致性交互世界，并通过 Project Genie 提供体验入口。它是神经交互世界方向的代表，官方介绍不等于可下载引擎源码、可导出关卡资产或具备确定性玩法规则。

标签：`interactive-video` · `neural-simulator` · `text-to-world` · `Google-DeepMind` · `hosted`。来源检查：2026-10-18。

**[World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model)**

Marble 支持多模态世界创作，可导出 Gaussian splats、视觉网格和用于粗略物理的碰撞网格，并以相机路径渲染视频。与纯视频续写相比，它产出可用于下游引擎的空间资产；角色行为、任务逻辑和游戏循环仍需由开发者构建。

标签：`scene-generation` · `explicit-3d` · `Gaussian-splatting` · `mesh-export` · `hosted`。来源检查：2026-10-18。 延伸：[产品](https://marble.worldlabs.ai/)

</details>

## 细粒度阅读与实践

- [通用 Agent：模型、harness、skills、MCP 的分工](/agents-notes.md)
- [引擎生态：文档、源码、测试、社区工程经验](/engines-notes.md)
- [2D / 3D AI 工作：评测版本、资产管线与发布边界](/game-ai-notes.md)
- [世界模型：代码状态、混合渲染、视频模拟与显式 3D](/world-model-notes.md)
- [实践指南：任务契约、资产导入、五层验收与复现](/practical-guide.md)

## 维护方式

只编辑 `data/segments/*.json`，运行 `npm run build` 同步清单与网站，`npm run check` 校验数据与生成产物。没有自动抓取或定时更新。代码、权重、数据、服务可能有不同许可；使用前阅读对应官方条款。外部项目归各自作者所有。
