# Awesome AI 游戏开发

> 面向 AI 游戏开发的规划地图——从创意到可玩的世界。

**110 项精选一手资料** ，串联编程智能体、游戏引擎、面向 2D 和 3D 开发的 AI、制作工具以及代码世界模型。主要资料审阅日期： **2026 年 10 月 18 日** 。这是一份研究快照：审阅资料并不意味着复现其结果，也不意味着持续跟踪。

- [交互式 GameMap 网站——GitHub Pages](https://openenvision.github.io/GameMap/)
- [从资源到可运行项目的实践指南](../guides/practical-guide.md)
- [制作研究：接口、证据与生成服务边界](../production/overview.md)
- [教程、可玩演示与完整示例游戏源码](../tutorials-and-demos.md)
- [编程智能体 × 游戏：技能、桥接、评测与游戏代码](../coding-agent-game-code.md)
- [测试资源库：游戏、AI 环境、资产、绑定与动作数据](testing-library.md)
- [贡献与数据维护](../contributing.md) · [结构化 JSON](../../../data/resources.json)

## 如何阅读这份地图

| 层次                | 解决的问题           | 应关注的证据                   |
| ----------------- | --------------- | ------------------------ |
| 模型 / 编程智能体 / 执行框架 | 推理、代码修改与工具执行    | 实际工具、运行时反馈与支持的任务         |
| 技能 / MCP / CLI    | 领域知识与引擎编辑       | 真实的 SKILL.md 文件、协议与编辑器操作 |
| 框架 / 工具           | 组织生成过程或完成制作任务   | 输入、输出、项目格式与发布状态          |
| 基准测试              | 可重复的开发评测        | 任务、评分脚本、环境与版本            |
| 论文 / 世界模型         | 可执行状态、神经模拟或混合渲染 | 世界表示、动作接口、长期一致性与公开可用性    |

**工具角色。**  DeepSeek 通过其模型集成文档收录，而不是作为官方独立执行框架收录。Blender 是 DCC 应用，Three.js 是 3D 库；它们的角色不同于完整游戏引擎。开发、游戏游玩与建模评测分别考察。SolarRenderer 和 StreamRender-H3 属于结构或引擎驱动的混合渲染路线；纯视频世界模型另行标注。

## 目录

- [1. 编程智能体与游戏开发桥接](#agents) — 20 项资源
- [2. 游戏引擎、DCC 工具与生态](#engines) — 24 项资源
- [3. 面向 2D 游戏开发的 AI](#2d) — 13 项资源
- [4. 面向 3D 游戏开发的 AI](#3d) — 15 项资源
- [5. 游戏制作：美术、动画、音频、测试与运行时 AI](#production) — 18 项资源
- [6. 代码世界模型与交互式世界](#world) — 20 项资源

<a id="agents"></a>

## 编程智能体与游戏开发桥接

### 智能体

| 资源                                                        | 用途与范围                                         | 阶段                |
| --------------------------------------------------------- | --------------------------------------------- | ----------------- |
| [OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli)  | 通用编程智能体，用于读取和编辑本地仓库、运行命令及审查代码。                | 规划 / 编码 / 测试 / 交付 |
| [Claude Code](https://code.claude.com/docs/en/overview)   | 可读取和编辑项目、运行工具的编程智能体，通过终端和 IDE 接口支持技能、钩子和 MCP。 | 规划 / 编码 / 测试 / 交付 |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Google 的开源终端编程智能体，支持文件访问、Shell 工具、扩展和 MCP。    | 规划 / 编码 / 测试      |
| [OpenCode](https://opencode.ai/docs/)                     | 开源编程智能体，支持多个模型提供商、Plan / Build 模式和项目指令。       | 规划 / 编码 / 测试      |
| [Cline](https://github.com/cline/cline)                   | 开源编程智能体，支持多个模型、Plan / Act 模式、项目规则和 MCP。       | 规划 / 编码 / 测试      |
| [Aider](https://github.com/Aider-AI/aider)                | 以仓库地图、Git 变更以及 lint 和测试反馈为核心的终端 AI 结对编程工具。    | 编码 / 测试           |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli)**

适合作为游戏项目的主要代码执行循环：拆解玩法、维护脚本、运行构建并检查故障。引擎集成仍需 CLI、编辑器桥接或 MCP 服务器；编译成功并不能证明游戏可玩。

标签：`CLI` · `General-purpose agent` · `Code review` · `MCP` · `Skills`。资料审阅日期：2026-10-18。延伸阅读：[官方游戏工作流](https://learn.chatgpt.com/use-cases/browser-games)

**[Claude Code](https://code.claude.com/docs/en/overview)**

可开发游戏脚本、迁移架构、排查构建问题，并通过社区 MCP 服务器连接 Unity、Godot 或 UE。应结合使用 CLAUDE.md、技能与编辑器状态；单次 MCP 演示并不能证明已实现完整的引擎自动化。

标签：`CLI` · `General-purpose agent` · `MCP` · `Skills` · `Hooks`。资料审阅日期：2026-10-18。延伸阅读：[官方仓库与示例](https://github.com/anthropics/claude-code)

**[Gemini CLI](https://github.com/google-gemini/gemini-cli)**

可帮助理解游戏项目、编辑脚本，并通过 MCP 驱动编辑器。官方 README 声明，Antigravity CLI 已于 2026 年 6 月 18 日面向免费层级和 Google One 用户取代 Gemini CLI，且 Gemini CLI 未针对最新 Gemini 模型进行优化。选择此入口前，请查看针对相应账户的迁移指南。

标签：`CLI` · `Google` · `MCP` · `Open source` · `Migration guidance`。资料审阅日期：2026-10-18。延伸阅读：[官方文档](https://geminicli.com/docs/)

**[OpenCode](https://opencode.ai/docs/)**

适合使用自行选择的提供商与模型来规划和编辑游戏项目。请固定使用 V1 或 V2：V2 迁移指南记载了不兼容的插件/服务器 API、默认允许访问外部目录，以及虽然接受配置却不运行 LSP 或提供 LSP 诊断等情况。应针对所选版本验证权限、MCP 集成及编译器/测试反馈；编辑器与玩法检查仍需其他工具。

标签：`CLI` · `Multiple models` · `Plan / Build` · `Open source` · `AGENTS.md`。资料审阅日期：2026-10-18。延伸阅读：[源码](https://github.com/anomalyco/opencode) · [V1 到 V2 的迁移边界](https://opencode.ai/v2/docs/migrate-v1/)

**[Cline](https://github.com/cline/cline)**

适合在 IDE 或 CLI 中审查和编辑游戏代码，并将构建输出与 MCP 编辑器工具纳入反馈循环。可复用 .clinerules 和技能来记录引擎约定；编辑器操作取决于具体桥接服务。

标签：`IDE` · `CLI` · `Multiple models` · `MCP` · `Plan / Act`。资料审阅日期：2026-10-18。延伸阅读：[文档](https://docs.cline.bot/)

**[Aider](https://github.com/Aider-AI/aider)**

适用于现有游戏项目中的跨文件修改、重构和可测试逻辑，模型选项包括 DeepSeek。搭配具备视觉能力的模型时，可接收用户提供的截图。其代码编辑工作流不会直接控制 Unity、UE 或 Blender 编辑器；自动截图与游戏交互需要另行配置。

标签：`CLI` · `Git` · `Repository map` · `Multiple models` · `Refactoring`。资料审阅日期：2026-10-19。延伸阅读：[用户文档](https://aider.chat/docs/) · [截图与图像输入](https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/website/docs/usage/images-urls.md#L11-L27)

</details>

### 框架

| 资源                                                                              | 用途与范围                                                  | 阶段                |
| ------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------- |
| [OpenHands · Agent Canvas](https://github.com/OpenHands/OpenHands)              | 用于管理本地、远程与云端智能体环境的开源开发控制台。                             | 规划 / 编码 / 测试 / 交付 |
| [OpenHands Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | 面向智能体、工具、对话、工作区及服务器接口的可编程开发框架。                         | 规划 / 编码 / 测试      |
| [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)          | 将 Claude Code 的工具循环、权限、会话和扩展嵌入 Python 或 TypeScript 应用。 | 规划 / 编码 / 测试      |
| [mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent)                   | 基于 Shell 的极简编程智能体研究基线，便于修改和检查执行轨迹。                     | 编码 / 测试           |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[OpenHands · Agent Canvas](https://github.com/OpenHands/OpenHands)**

可集中管理游戏项目的多智能体任务、环境与执行记录。该仓库提供 Agent Canvas 前端和编排入口；核心工具循环与 Agent Server 位于独立的 SDK 仓库中。游戏自动化仍需引擎工具。

标签：`Agent Canvas` · `Environments` · `Multi-agent` · `Open source` · `Orchestration`。资料审阅日期：2026-10-18。延伸阅读：[核心 SDK](https://github.com/OpenHands/software-agent-sdk)

**[OpenHands Software Agent SDK](https://github.com/OpenHands/software-agent-sdk)**

适合将构建、场景检查和测试封装为智能体工具。Python SDK 支持本地和远程工作区；所检查的 TypeScript 客户端处于 alpha 阶段，且仅支持通过 Agent Server 进行远程对话。应固定客户端/服务器版本，而不是假设接口对等。游戏专用工具和验收检查仍需自行提供。

标签：`SDK` · `Python` · `TypeScript` · `Workspaces` · `Reproducible experiments`。资料审阅日期：2026-10-19。延伸阅读：[SDK 文档](https://docs.openhands.dev/sdk) · [TypeScript 客户端的范围与稳定性](https://github.com/OpenHands/software-agent-sdk/blob/3f3294581ebf40f3bbe5b96aec1d28b7fec96226/clients/typescript/README.md#L1-L19)

**[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)**

在你运行的进程中执行 Claude Code 二进制程序及工具循环，提供用于权限、会话、钩子和 MCP 的 Python 或 TypeScript API。它可支持游戏专用修复与验证服务，但领域工具、评分规则和运行环境必须自行提供。它不同于直接调用模型的 Client SDK；官方概述还规定了 Anthropic 商业条款和独立的身份验证限制。

标签：`SDK` · `Python` · `TypeScript` · `MCP` · `Hooks`。资料审阅日期：2026-10-18。

**[mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent)**

适合在游戏代码生成和修复中隔离模型、提示词与环境的影响，或封装无界面引擎命令。其极简循环在独立子进程而非持久 Shell 中执行命令，因此每条命令或脚本都必须携带工作目录与环境设置。它是通用软件工程基线；可玩性、视觉效果与物理行为需要额外验证。

标签：`Research baseline` · `Shell` · `Harness` · `Traces` · `Open source`。资料审阅日期：2026-10-18。延伸阅读：[前身：SWE-agent](https://github.com/SWE-agent/SWE-agent)

</details>

### 技能

| 资源                                                                                          | 用途与范围                                             | 阶段           |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------ |
| [Unity-MCP 操作指南](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md) | 实用的 MCP for Unity 技能：检查编辑器状态、执行操作、等待编译与域重载，再验证结果。 | 编码 / 场景 / 测试 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Unity-MCP 操作指南](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md)**

定义资源优先的场景操作，要求进一步编辑前检查编译、域重载、工具就绪情况和阻塞原因。脚本修改后需检查控制台与截图。这是 MCP for Unity 的操作流程资料，并非在此安装或测试过的集成；示例与参数取决于桥接、Unity、UI 和输入系统的版本。

标签：`Unity` · `Skills` · `MCP` · `Compilation feedback` · `Skill source`。资料审阅日期：2026-10-18。

</details>

### 文档

| 资源                                                                      | 用途与范围                                             | 阶段                          |
| ----------------------------------------------------------------------- | ------------------------------------------------- | --------------------------- |
| [DeepSeek · 智能体集成](https://api-docs.deepseek.com/guides/anthropic_api/) | 关于在 Claude Code 等智能体执行框架内使用 DeepSeek 作为模型后端的官方指南。 | 规划 / 编码 / 测试                |
| [AGENTS.md](https://agents.md/)                                         | 开放的 Markdown 格式，用于向编程智能体提供构建命令、测试规则和项目约定。         | 规划 / 编码 / 测试 / 交付           |
| [Agent Skills](https://agentskills.io/home)                             | 开放格式，将领域工作流封装为 SKILL.md 指令、脚本和参考资料。               | 规划 / 编码 / 资产 / 场景 / 测试 / 交付 |
| [Codex · 创建浏览器游戏](https://learn.chatgpt.com/use-cases/browser-games)    | OpenAI 的浏览器游戏工作流，涵盖规划、项目指令、资产生成和浏览器迭代。            | 规划 / 编码 / 资产 / 测试 / 交付      |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[DeepSeek · 智能体集成](https://api-docs.deepseek.com/guides/anthropic_api/)**

Anthropic API 兼容层将 DeepSeek 连接到现有工具循环。文件、测试与引擎连接由执行框架负责。该指南支持普通工具调用，但忽略服务器端 mcp_servers 字段，不支持 MCP 专用内容块。因此，客户端 MCP 工具仍由执行框架负责；API 兼容并不能证明功能完全对等。

标签：`DeepSeek` · `Model backend` · `Harness` · `API compatibility` · `Scope`。资料审阅日期：2026-10-18。

**[AGENTS.md](https://agents.md/)**

游戏项目可记录引擎版本、启动命令、目录规则、资产导入约定和验收检查，以减少对环境的猜测。这是项目指令格式，而不是智能体运行时；发现与配置方式因客户端而异。

标签：`Project instructions` · `Project conventions` · `Open format` · `Context`。资料审阅日期：2026-10-18。

**[Agent Skills](https://agentskills.io/home)**

适用于精灵图规范化、GLB 导出、场景检查和回归测试等可重复的游戏任务，按需加载领域知识。技能提供流程与资源；引擎控制仍需工具、依赖和兼容客户端。

标签：`Skills` · `Open format` · `Workflows` · `Progressive loading`。资料审阅日期：2026-10-18。

**[Codex · 创建浏览器游戏](https://learn.chatgpt.com/use-cases/browser-games)**

定义玩家目标、核心循环、输入以及胜负条件，再结合 PLAN.md 和 AGENTS.md 实现。将图像技能与 Playwright 结合，获取视觉和交互反馈。这是实践指南，不是针对所有游戏类型的性能保证，也不是研究基准。

标签：`Official workflow` · `Browser games` · `Planning` · `Playwright` · `Asset consistency`。资料审阅日期：2026-10-18。

</details>

### 工具

| 资源                                                                  | 用途与范围                                             | 阶段                     |
| ------------------------------------------------------------------- | ------------------------------------------------- | ---------------------- |
| [MCP for Unity](https://github.com/CoplayDev/unity-mcp)             | 将通用编程智能体连接到 Unity Editor 的社区 MCP 桥接。              | 编码 / 资产 / 场景 / 测试 / 交付 |
| [Godot MCP · Coding-Solo](https://github.com/Coding-Solo/godot-mcp) | 社区 MCP 服务器，用于启动 Godot、运行项目、读取日志和执行基本场景操作。         | 编码 / 场景 / 测试           |
| [MCP for Blender](https://github.com/ahujasid/mcp-for-blender)      | Blender 插件与 MCP 服务器，支持智能体驱动的建模、材质、Python 执行和视觉反馈。 | 编码 / 资产 / 场景 / 测试      |
| [Unreal MCP · chongdashu](https://github.com/chongdashu/unreal-mcp) | Python MCP 服务器与 UE C++ 插件，将智能体连接到 Actor、蓝图及视口控件。  | 编码 / 场景 / 测试           |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp)       | Microsoft 的浏览器自动化 MCP 服务器，向智能体开放页面结构、交互与浏览器反馈。    | 测试 / 交付                |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[MCP for Unity](https://github.com/CoplayDev/unity-mcp)**

开放场景、GameObject、C# 脚本、资产和测试的编辑器操作。所检查的安装资料声明需要 Unity 2021.3 LTS 或更新版本，以及 Python 3.10+ 和 uv。这些是声明的要求，并非在此测试过的版本。该项目独立于 Unity Technologies；应固定桥接/编辑器版本，并验证编译、截图和 PlayMode 测试。

标签：`Unity` · `MCP` · `Editor bridge` · `Community project` · `C#`。资料审阅日期：2026-10-19。延伸阅读：[安装与工具文档](https://coplaydev.github.io/unity-mcp/) · [固定版本的安装要求](https://github.com/CoplayDev/unity-mcp/blob/aa5fc638d623f56178d50329d9ad8c541a57fe66/website/docs/getting-started/install.md#L13-L17)

**[Godot MCP · Coding-Solo](https://github.com/Coding-Solo/godot-mcp)**

支持项目执行、调试输出捕获、场景和节点创建、Sprite2D 纹理加载，以及部分 3D MeshLibrary 操作。它可向智能体提供真实项目的反馈；这些接口并不提供完整的视觉游玩测试，也未覆盖所有编辑器功能。在所检查的提交中，服务器仅保留一个活动项目进程，生成新进程前会发送 kill，但不等待前一个进程退出。停止操作在发出终止请求后即返回，而不等待进程退出；自然退出会清除 get_debug_output 使用的句柄。应另行归档输出，以获得可靠的崩溃证据。

标签：`Godot` · `MCP` · `GDScript` · `Runtime logs` · `Scenes`。资料审阅日期：2026-10-18。延伸阅读：[固定版本的实现与生命周期限制](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts#L1053-L1215)

**[MCP for Blender](https://github.com/ahujasid/mcp-for-blender)**

适合制作带视口反馈的 3D 游戏资产和场景原型。这个原名为 blender-mcp 的社区桥接可在 Blender 内执行任意 Python；请使用可信任务并保存副本。所检查的文档区分了默认的最少量使用遥测与需主动选择加入的创作内容收集；DISABLE_TELEMETRY=true 可同时禁用两者。启用内容捕获前，请审阅选择加入的数据条款。拓扑、比例、UV、碰撞和导出应另行验证。

标签：`Blender` · `MCP` · `Python` · `3D assets` · `Community project`。资料审阅日期：2026-10-19。延伸阅读：[遥测默认设置与控制](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/README.md#L808-L842) · [选择加入的内容与数据条款](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/TERMS_AND_CONDITIONS.md)

**[Unreal MCP · chongdashu](https://github.com/chongdashu/unreal-mcp)**

涵盖 Actor 变换、蓝图类与组件、部分节点图和编辑器相机操作。README 声明需要 Unreal Engine 5.5+ 和 Python 3.12+，并提供 UE5.5 示例；此处未独立测试后续版本的兼容性。作者将其标为实验性项目，并建议不要用于生产。请固定版本并逐项验证支持的操作。

标签：`Unreal Engine` · `MCP` · `Blueprint` · `Experimental` · `Editor bridge`。资料审阅日期：2026-10-18。延伸阅读：[工具文档](https://github.com/chongdashu/unreal-mcp/tree/main/Docs)

**[Playwright MCP](https://github.com/microsoft/playwright-mcp)**

适合浏览器游戏的菜单、HUD、启动流程、键盘输入和截图。默认接口使用无障碍树；基于坐标的鼠标工具需要可选的视觉能力。两种接口都不会自动开放 Canvas 或 WebGL 的内部状态，因此可能需要游戏调试插桩。所检查的 README 警告该服务器不是安全边界，并说明 browser_run_code_unsafe 可在 Playwright 服务器进程中执行任意 JavaScript。独立的 Playwright CLI 仓库提供 CLI + Skills 工作流。

标签：`Playwright` · `MCP` · `Browser testing` · `HUD` · `Canvas limitations`。资料审阅日期：2026-10-19。延伸阅读：[固定版本的工具与安全边界](https://github.com/microsoft/playwright-mcp/blob/b8b4183e099f136cbec0388a6088d4aa2f6b9685/README.md#security) · [配套 CLI + Skills](https://github.com/microsoft/playwright-cli)

</details>

<a id="engines"></a>

## 游戏引擎、DCC 工具与生态

### 框架

| 资源                                                                         | 用途与范围                                        | 阶段                |
| -------------------------------------------------------------------------- | -------------------------------------------- | ----------------- |
| [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) | Three.js 的 React 渲染器，将基于组件的声明式场景带入 React 生态。 | 规划 / 编码 / 场景 / 测试 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)**

适合将 Web HUD、应用状态与 3D 场景结合，并配合 pmndrs 工具进行加载、交互与调试。它不提供所有游戏系统；请匹配 React、Fiber 和 Three.js 的版本，并为逐帧模拟划定清晰的边界。

标签：`Three.js` · `React` · `R3F` · `pmndrs` · `Declarative scenes`。资料审阅日期：2026-10-18。延伸阅读：[源码](https://github.com/pmndrs/react-three-fiber)

</details>

### 文档

| 资源                                                                                                                                      | 用途与范围                                                 | 阶段                    |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------- |
| [Godot · 命令行教程](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)                                     | Godot 官方 CLI 参考，涵盖无界面操作、脚本检查、资产导入、执行与导出。              | 编码 / 测试 / 交付          |
| [Godot Demo Projects](https://github.com/godotengine/godot-demo-projects)                                                               | Godot 官方可运行示例，涵盖 2D、3D、GUI、音频、网络与渲染。                  | 规划 / 编码 / 场景 / 测试     |
| [Unity · 2D Tech Demos](https://github.com/Unity-Technologies/2d-techdemos)                                                             | Unity 官方 2D 示例源码，涵盖 Tilemap、Scripted Tile、笔刷及运行时地图修改。 | 编码 / 资产 / 场景 / 测试     |
| [Lyra Sample Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)                       | Epic 的模块化 UE5 示例游戏，包含玩法插件、技能、动画、输入和 UI。               | 规划 / 编码 / 场景 / 测试     |
| [Three.js · 示例](https://threejs.org/examples/)                                                                                          | Three.js 官方可运行图形示例，附 HTML 与 JavaScript 源码。            | 编码 / 资产 / 场景 / 测试     |
| [Blender Python · API 快速入门](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst)                        | Blender 官方 API 教程源码，涵盖 bpy 数据、上下文、操作器与 Python 操作。     | 编码 / 资产 / 场景 / 测试     |
| [Phaser · 示例](https://github.com/phaserjs/examples)                                                                                     | Phaser 官方示例源码，为具体 API 和玩法组件提供可运行的参考。                  | 编码 / 场景 / 测试          |
| [Unreal Engine · Remote Control API](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine)            | 通过 HTTP 向外部工具开放编辑器中经反射公开的属性与函数。                       | 编码 / 场景 / 测试          |
| [Unity · Addressables 构建与加载 API](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html) | 使用明确的配置方案构建可寻址内容，并通过异步句柄加载资产。                         | 资产 / 编码 / 交付 / 运行时 AI |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Godot · 命令行教程](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)**

使编程智能体能够通过命令启动项目、读取日志、解析脚本并导出构建，减少对 GUI 的依赖。--check-only 标志解析通过 --script 提供的脚本；它不执行玩法测试。所支持的标志因构建类型而异，未知标志会被静默忽略；请检查所选二进制程序的 --help。无界面运行无法替代真实渲染与输入测试。

标签：`Godot` · `CLI` · `Headless` · `Builds` · `Reproducibility`。资料审阅日期：2026-10-19。

**[Godot Demo Projects](https://github.com/godotengine/godot-demo-projects)**

适合作为智能体的最小参考项目和回归任务，提供具体的场景、脚本与资源示例。仓库声明 master 面向开发版引擎；使用稳定版本时请选择对应分支，以免将版本冲突误认为生成失败。

标签：`Godot` · `Official examples` · `Runnable source` · `Version branches` · `Reference projects`。资料审阅日期：2026-10-18。

**[Unity · 2D Tech Demos](https://github.com/Unity-Technologies/2d-techdemos)**

提供瓦片碰撞查询、可破坏地图和调色板切换的场景源码。所检查的项目记录了 Unity 6000.3.3f1、URP 17.3.0 和 Input System 1.17.0，而 README 写的是 2021.1 及以上。其清单选择 2d-extras 的 package_6000.3 Git 分支，但提交的锁文件记录的是注册表版本 6.0.1；测试前请解析并固定依赖。源码审阅未证实其在不同 Editor 版本中的导入、运行或兼容性。

标签：`Unity` · `2D` · `Tilemap` · `Official examples` · `Runnable source`。资料审阅日期：2026-10-19。延伸阅读：[固定版本的编辑器基线](https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/ProjectSettings/ProjectVersion.txt#L1-L2) · [固定版本的包清单](https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/Packages/manifest.json#L2-L14) · [固定版本的包锁文件](https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/Packages/packages-lock.json#L27-L36)

**[Lyra Sample Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)**

适合学习 Game Feature Plugins、Experiences 和 Gameplay Ability System 如何在真实项目中协同工作。源码与内容通过 Fab / Epic Launcher 分发，需要匹配的引擎版本。Lyra 比最小原型更复杂，因此应按模块学习。Fab 官方条目标明，其内容仅可用于基于 Unreal Engine 的产品。

标签：`Unreal Engine` · `Official sample` · `GAS` · `Modular design` · `Runnable project`。资料审阅日期：2026-10-19。延伸阅读：[Fab 官方条目](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)

**[Three.js · 示例](https://threejs.org/examples/)**

提供加载器、光照、材质、动画及渲染技术的最小参考，可改用于游戏场景。网站与 dev 分支持续变化；请使源码、附加组件和运行时保持在同一发行版本，而不要混用不同版本的示例。

标签：`Three.js` · `Official examples` · `Materials` · `Loaders` · `Runnable source`。资料审阅日期：2026-10-18。延伸阅读：[示例源码](https://github.com/mrdoob/three.js/tree/dev/examples)

**[Blender Python · API 快速入门](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst)**

为资产脚本提供权威指导，尤其说明直接数据访问与依赖当前模式、选择项或视口的操作之间的区别。bpy.ops 的 poll 检查可能因上下文而失败；除语法检查外，脚本还应检查实际状态并验证输出。

标签：`Blender` · `Python` · `bpy` · `Context` · `Automation`。资料审阅日期：2026-10-18。延伸阅读：[API 文档](https://docs.blender.org/api/current/)

**[Phaser · 示例](https://github.com/phaserjs/examples)**

关于动画、相机、输入、物理和场景切换的官方示例。当前 README 面向 Phaser 4，labs 网站默认使用其最新开发构建；请选择并固定与项目匹配的版本。MIT 许可覆盖示例代码，但不覆盖附带的美术资产。复用前请审查资产权限，并在真实浏览器中测试。

标签：`Phaser` · `Official examples` · `Runnable source` · `2D` · `Version scope`。资料审阅日期：2026-10-18。

**[Unreal Engine · Remote Control API](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine)**

Remote Control 提供原生引擎集成接口，有别于社区 MCP 桥接。属性写入可以请求编辑器事务和变更通知，但变更已获确认并不能证明包保存已完成。Epic 持续更新的指南将此功能标为 Beta，并在打包构建和 -game 中默认禁用。请启用相应插件，限制网络暴露，并分别验证编辑器访问与打包运行时访问。

标签：`Unreal Engine` · `HTTP` · `Editor automation` · `State mutation`。资料审阅日期：2026-10-18。延伸阅读：[HTTP API 参考](https://dev.epicgames.com/documentation/en-us/unreal-engine/remote-control-api-http-reference-for-unreal-engine)

**[Unity · Addressables 构建与加载 API](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html)**

所检查的 Addressables 1.21 文档区分了内容构建与可执行文件构建。构建设置、活动配置方案、构建器和内容状态文件都会影响输出。运行时加载返回句柄，必须检查其状态与结果，并在之后释放。匹配多个资产的键可能只选中第一个；请保留依赖与缓存的来源记录。

标签：`Unity` · `Addressables` · `Asset dependencies` · `Async loading` · `Content builds`。资料审阅日期：2026-10-18。延伸阅读：[LoadAssetAsync 参考](https://docs.unity3d.com/kr/Packages/com.unity.addressables%401.21/api/UnityEngine.AddressableAssets.Addressables.LoadAssetAsync.html)

</details>

### 工具

| 资源                                                                                                                                           | 用途与范围                                              | 阶段                          |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------- |
| [Godot Engine · 官方文档](https://docs.godotengine.org/en/stable/)                                                                               | 开源 2D 和 3D 游戏引擎，通过场景、节点、资源和脚本组织可运行项目。              | 规划 / 编码 / 资产 / 场景 / 测试 / 交付 |
| [GUT · Godot Unit Test](https://github.com/bitwes/Gut)                                                                                       | 社区 Godot 测试框架，支持 GDScript 断言、测试替身和参数化用例。           | 编码 / 测试                     |
| [Unity · 手册](https://docs.unity3d.com/Manual/index.html)                                                                                     | Unity 官方文档，涵盖项目、编辑器、脚本、渲染、物理、资产导入与发布。              | 规划 / 编码 / 资产 / 场景 / 测试 / 交付 |
| [Unity Test Framework](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html)                 | Unity 官方测试框架，支持 Edit mode、Play mode 和命令行执行。        | 编码 / 测试 / 交付                |
| [Unreal Engine · 文档](https://dev.epicgames.com/documentation/en-us/unreal-engine)                                                            | Epic 官方文档，涵盖 UE C++、蓝图、渲染、动画、物理和打包。                | 规划 / 编码 / 资产 / 场景 / 测试 / 交付 |
| [Unreal · Automation Test Framework](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine) | UE 官方基础设施，用于单元、功能、内容压力和截图对比测试。                     | 编码 / 场景 / 测试 / 交付           |
| [Three.js](https://github.com/mrdoob/three.js)                                                                                               | 面向浏览器的 JavaScript 3D 渲染库，提供场景、相机、材质和加载器。           | 规划 / 编码 / 资产 / 场景 / 测试 / 交付 |
| [Blender](https://github.com/blender/blender)                                                                                                | 开源 3D 创作套件，用于建模、材质、绑定、动画、模拟和渲染。                    | 资产 / 场景 / 测试                |
| [Khronos · glTF-Blender-IO](https://github.com/KhronosGroup/glTF-Blender-IO)                                                                 | Khronos 官方 Blender glTF 2.0 导入器与导出器源码，包含验证及往返转换测试。 | 资产 / 场景 / 测试 / 交付           |
| [Phaser · 首个游戏指南](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game)                                               | 浏览器 2D 游戏框架，其官方教程涵盖资产、场景、动画、输入和碰撞。                 | 规划 / 编码 / 资产 / 场景 / 测试 / 交付 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Godot Engine · 官方文档](https://docs.godotengine.org/en/stable/)**

为 GDScript、C#、场景及资源 API 提供权威背景，帮助智能体将脚本修改与运行中的场景联系起来。请固定引擎版本并使用匹配的文档；稳定分支与开发分支不能互换。

标签：`Godot` · `GDScript` · `Scenes and nodes` · `Official documentation` · `Open source`。资料审阅日期：2026-10-18。延伸阅读：[引擎源码](https://github.com/godotengine/godot) · [官方示例](https://github.com/godotengine/godot-demo-projects)

**[GUT · Godot Unit Test](https://github.com/bitwes/Gut)**

提供 CLI 和 JUnit XML 输出，用于自动回归检查生成的游戏状态、伤害、背包及其他逻辑。GUT 与 Godot 版本有明确的兼容要求；逻辑测试通过后，仍需检查视觉效果、操控和场景集成。

标签：`Godot` · `Unit testing` · `GDScript` · `CLI` · `JUnit`。资料审阅日期：2026-10-18。延伸阅读：[作者文档](https://gut.readthedocs.io/)

**[Unity · 手册](https://docs.unity3d.com/Manual/index.html)**

为智能体提供具体的 C# 与编辑器项目约束，以及 2D 和 3D 工作流和按版本划分的包参考。请一并固定 Editor、渲染管线和 Package Manager 的版本；仅凭 Unity 这一名称不能确认 API 或材质兼容性。

标签：`Unity` · `C#` · `Official documentation` · `Editor` · `Package Manager`。资料审阅日期：2026-10-18。延伸阅读：[官方示例源码](https://github.com/Unity-Technologies/2d-techdemos)

**[Unity Test Framework](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html)**

支持对生成的脚本与场景行为进行持续回归检查，使用 UnityTest 跨帧检查生命周期、协程和状态变化。Edit mode 和 Play mode 有不同的执行循环；测试应等待真实帧或条件，而不只是确认脚本已创建。另行检查的 Test Framework 1.4.6 API 返回作业 GUID，并说明了跨多帧的取消清理。活动测试变为 Canceled，其余测试变为 NotRun；不要将取消等同于通过，也不要假定它兼容每个 Editor 包版本。

标签：`Unity` · `Testing` · `Edit mode` · `Play mode` · `CLI`。资料审阅日期：2026-10-18。延伸阅读：[包与 API 文档](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/) · [版本化的测试作业与取消 API](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html)

**[Unreal Engine · 文档](https://dev.epicgames.com/documentation/en-us/unreal-engine)**

为 UE 项目和资产系统提供权威背景，官方示例展示了复杂的玩法架构。访问 GitHub 源码需要关联 Epic 与 GitHub 账户并完成相关授权步骤；Epic 还为被许可方提供了 Perforce 路径的说明。源码可获取并不意味着采用开源许可。

标签：`Unreal Engine` · `C++` · `Blueprint` · `Official documentation` · `Authorized source access`。资料审阅日期：2026-10-18。延伸阅读：[源码访问说明](https://dev.epicgames.com/documentation/en-us/unreal-engine/downloading-source-code-in-unreal-engine) · [引擎源码（需授权）](https://github.com/EpicGames/UnrealEngine)

**[Unreal · Automation Test Framework](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine)**

可配合 Functional Testing 等接口，将蓝图编译、关卡加载、模拟输入和视觉回归检查纳入智能体反馈循环。测试需要相应插件并清理状态；框架在引擎内部运行。ResumeRunTest 读取现有 JSON 报告，恢复 NotRun 测试，并将运行中遭中断的测试标记为失败。请保留报告，并区分兼容的编辑器与客户端测试上下文。

标签：`Unreal Engine` · `Automated testing` · `Blueprint` · `Visual regression` · `Content validation`。资料审阅日期：2026-10-18。延伸阅读：[命令行报告与中断运行恢复](https://dev.epicgames.com/documentation/en-us/unreal-engine/run-automation-tests-in-unreal-engine)

**[Three.js](https://github.com/mrdoob/three.js)**

使智能体能够直接用 TypeScript 或 JavaScript 构建可在浏览器测试的 3D 原型，并通过源码和示例检查 API。游戏循环、物理、导航、存档等系统需要另行设计或集成。请分别验证 WebGL 与 WebGPU 路径。

标签：`Three.js` · `JavaScript` · `WebGL` · `WebGPU` · `Rendering library`。资料审阅日期：2026-10-18。延伸阅读：[官方手册](https://threejs.org/manual/) · [官方示例](https://threejs.org/examples/)

**[Blender](https://github.com/blender/blender)**

主要支持游戏资产与场景制作，可借助智能体生成的 Python 脚本完成可重复任务。Blender 不是游戏运行时引擎；导入 Unity、UE、Godot 或浏览器后，请验证比例、坐标、材质、骨架和动画。

标签：`Blender` · `DCC` · `3D assets` · `Animation` · `Open source`。资料审阅日期：2026-10-18。延伸阅读：[官方主仓库](https://projects.blender.org/blender/blender) · [参考手册](https://docs.blender.org/manual/en/latest/) · [Python API](https://docs.blender.org/api/current/)

**[Khronos · glTF-Blender-IO](https://github.com/KhronosGroup/glTF-Blender-IO)**

将 Blender 资产制作连接到游戏运行时，并帮助诊断材质、网格和动画转换问题。请使插件的发行分支匹配 Blender 版本；main 可能面向即将发布的 Blender 版本。仓库 CI 验证导出，并对比导入 / 导出往返转换。有效文件在目标引擎中的渲染仍可能不同，因此应验证运行时导入效果。

标签：`Blender` · `glTF` · `GLB` · `Asset pipeline` · `Roundtrip validation`。资料审阅日期：2026-10-19。延伸阅读：[技术说明](https://github.com/KhronosGroup/glTF-Blender-IO/blob/main/Technical.md) · [GameMap：资产有效性与运行时保真度](https://github.com/OpenEnvision/GameMap/blob/main/docs/assets/validation.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity)

**[Phaser · 首个游戏指南](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game)**

适合快速构建围绕 preload / create / update 组织、可在浏览器中测试的 2D 核心循环。在教程中，缩放后的静态 Arcade Physics 对象需要刷新碰撞体。仅有可见场景并不能验证输入、重启行为或生命周期处理。

标签：`Phaser` · `2D` · `JavaScript` · `Browser games` · `Arcade Physics`。资料审阅日期：2026-10-18。延伸阅读：[框架源码](https://github.com/phaserjs/phaser) · [官方文档](https://docs.phaser.io/)

</details>

### 社区

| 资源                                                                                                                                 | 用途与范围                                             | 阶段                     |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------- |
| [GDQuest · 首个 2D 游戏](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/)                                       | GDQuest 的 Godot 2D 生存游戏教程，附完整脚本、项目和故障排查说明。        | 规划 / 编码 / 场景 / 测试      |
| [Catlike Coding · 表面接触](https://catlikecoding.com/unity/tutorials/movement/surface-contact/)                                       | Jasper Flick 的 Unity 移动教程，通过斜坡、台阶和接触时序讲解角色控制。     | 编码 / 场景 / 测试           |
| [Epic Developer Community · UE](https://dev.epicgames.com/community/unreal-engine)                                                 | Epic 的 UE 社区中心，汇集作者教程、学习材料和特定版本讨论。                | 规划 / 编码 / 资产 / 场景 / 测试 |
| [Three.js · 实例化人群工程](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928) · 2026 | 游戏作者在 Three.js 论坛撰文，介绍单次绘制调用的人群系统、实例数据、LOD 和错峰更新。 | 编码 / 场景 / 测试           |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GDQuest · 首个 2D 游戏](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/)**

涵盖移动、瞄准、投射物、敌人生成和失败状态，可作为完整核心循环的参考。教程使用 Godot 4.1 制作，已更新至 4.6。故障排查部分解释了 grounded / floating 模式和敌人数量限制。代码采用 MIT 许可，美术资产采用 CC BY-NC-SA 4.0；请分别检查复用条件。

标签：`Godot` · `Community experience` · `Complete core loop` · `Collision debugging` · `2D`。资料审阅日期：2026-10-18。延伸阅读：[项目源码](https://github.com/gdquest-demos/getting-started-with-godot-4) · [教程库](https://www.gdquest.com/library/)

**[Catlike Coding · 表面接触](https://catlikecoding.com/unity/tutorials/movement/surface-contact/)**

作者使用测试场景复现失去地面接触、幽灵碰撞、射线检测和贴地行为，为智能体提供物理行为的因果解释。教程使用 Unity 2019.2.14f1 和 ProBuilder；请根据目标版本调整算法、API、输入和项目配置。

标签：`Unity` · `Community experience` · `Physics` · `Character control` · `Debugging`。资料审阅日期：2026-10-18。延伸阅读：[完整移动系列](https://catlikecoding.com/unity/tutorials/movement/) · [着色器与项目教程](https://catlikecoding.com/unity/tutorials/)

**[Epic Developer Community · UE](https://dev.epicgames.com/community/unreal-engine)**

适合查找官方参考以外的材质、动画、蓝图与性能实战排障资料。请检查每项内容的作者、日期、引擎版本和可复现项目；能够访问该中心并不能证明每篇帖子都经过验证。

标签：`Unreal Engine` · `Community` · `Tutorials` · `Practical experience` · `Per-source verification`。资料审阅日期：2026-10-18。

**[Three.js · 实例化人群工程](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928)**

提供可解释的性能技术，作者的可玩演示展示了技术与视觉效果之间的取舍。帧率是作者在自身硬件上报告的结果，不是跨设备基准测试。优化后应测量 GPU、CPU、带宽和视觉质量。

标签：`Three.js` · `Community experience` · `Instancing` · `LOD` · `Performance`。资料审阅日期：2026-10-18。延伸阅读：[社区论坛](https://discourse.threejs.org/)

</details>

<a id="2d"></a>

## 面向 2D 游戏开发的 AI

### 智能体

| 资源                                                        | 用途与范围                  | 阶段                |
| --------------------------------------------------------- | ---------------------- | ----------------- |
| [OpenGame](https://github.com/leigest519/OpenGame) · 2026 | 使用可复用模板和调试技能生成浏览器游戏项目。 | 规划 / 编码 / 资产 / 测试 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[OpenGame](https://github.com/leigest519/OpenGame)**

利用适用于 Canvas、Phaser、three.js 及其他模板的 Template Skill 和 Debug Skill，将自然语言需求转化为 Web 项目。公开 CLI 接受兼容 OpenAI 的模型端点；论文还介绍了 GameCoder-27B。浏览器执行与视觉评判用于评估构建健康状况、可用性以及意图对齐程度。README 仍将独立评测流水线列为即将推出；仅凭框架发布不能确认模型权重可用或评测可完全复现。

标签：`Browser games` · `Game Skill` · `Browser feedback` · `GameCoder-27B`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2604.18394)

</details>

### 框架

| 资源                                                                      | 用途与范围                             | 阶段           |
| ----------------------------------------------------------------------- | --------------------------------- | ------------ |
| [GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier) · 2026 | 通过运行时状态钩子和针对性检查验证生成游戏的行为。         | 编码 / 测试      |
| [GAVEL](https://github.com/gdrtodd/gavel) · 2024                        | 结合语言模型与质量多样性搜索创建棋盘游戏规则。           | 规划 / 编码 / 测试 |
| [Cardiverse](https://github.com/danruili/Cardiverse) · 2025             | 在原型流水线中串联卡牌游戏设计、Python 规则代码与游玩测试。 | 规划 / 编码 / 测试 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier)**

将游戏需求拆解为可独立测试的检查点，并通过浏览器与运行时适配器检查功能。仓库提供 GGV-Harness 以及适用于 Codex 和 Claude 的验证器技能。公开代码不包含全部生成游戏、运行输出或私有配置。与纯黑盒游玩测试相比，状态钩子还提供了额外的可观测性。

标签：`Functional verification` · `Playwright` · `Runtime state` · `Verifier Skill`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2605.07442)

**[GAVEL](https://github.com/gdrtodd/gavel)**

以 Ludii 游戏描述代码为表示形式。语言模型对规则进行变异与重组，再通过模拟和搜索筛选游戏。代码、实验以及相关模型和数据参考均已公开。输出是规则系统内的棋盘游戏；这些结果不能证明其具备通用 2D 动作游戏开发能力。

标签：`Game design` · `Ludii` · `Evolutionary search` · `Rule generation`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2407.09388)

**[Cardiverse](https://github.com/danruili/Cardiverse)**

利用机制图与检索，从卡牌游戏描述生成变体和代码，再利用生成的对局记录迭代检查规则一致性。仓库也包含游戏 AI 竞技场，但其开发贡献主要在于规则与代码原型。公开的替代规则描述与原论文输入不同，这会影响可复现性。

标签：`Card games` · `Mechanism graphs` · `Code generation` · `Self-play validation`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2502.07128)

</details>

### 技能

| 资源                                                                   | 用途与范围                        | 阶段      |
| -------------------------------------------------------------------- | ---------------------------- | ------- |
| [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge) | 结合参考美术、生成动画与确定性处理，制作可导出的精灵图。 | 资产 / 测试 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge)**

根据已批准的参考图像生成动作片段，再执行背景移除、对齐、循环选择、时序校正和图集打包。提供 Godot、Aseprite 和 Web 导出。对于 0.4.0，README 报告了可在解析层面完成往返转换，但未验证 Godot、LDtk 或 Aseprite 的编辑器导入。仍需进行导入与视觉验收检查。

标签：`Agent Skill` · `Sprite pipeline` · `Animation` · `Asset QA`。资料审阅日期：2026-10-18。

</details>

### 基准测试

| 资源                                                             | 用途与范围                          | 阶段           |
| -------------------------------------------------------------- | ------------------------------ | ------------ |
| [GameDevBench](https://github.com/waynchi/gamedevbench) · 2026 | 评估编程智能体在现有 Godot 项目中完成开发任务的表现。 | 编码 / 场景 / 测试 |
| [GameXpert-Bench](https://arxiv.org/abs/2608.21833) · 2026     | 通过三个赛道评测游戏创建、缺陷修复和迭代改进。        | 规划 / 编码 / 测试 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GameDevBench](https://github.com/waynchi/gamedevbench)**

仓库包含 333 项任务，涵盖 2D、3D、UI 和玩法逻辑。智能体接收现有项目和任务，随后产出可在引擎中检查的修改。可比较的官方运行要求使用 Godot 4.4.1，并提供图像或视频反馈。它衡量的是有界开发任务，而非从零创建商业游戏的质量。

标签：`Development benchmark` · `Godot` · `Multimodal` · `Visual feedback`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2602.11103)

**[GameXpert-Bench](https://arxiv.org/abs/2608.21833)**

论文提出 GameGen、GameFix 和 GameOpt，利用完整开发轨迹研究单次生成之外的生命周期。审阅时，官方仓库仍表示正在准备发布数据和评测代码。应将其视为论文与协议参考，而非可立即运行的基准测试。

标签：`Development benchmark` · `Bug fixing` · `Iterative improvement` · `Full release pending`。资料审阅日期：2026-10-18。延伸阅读：[仓库与发布状态](https://github.com/Kwen-Chen/GameXpert-Bench)

</details>

### 论文

| 资源                                                        | 用途与范围                            | 阶段           |
| --------------------------------------------------------- | -------------------------------- | ------------ |
| [GameGPT](https://arxiv.org/abs/2310.08067) · 2023        | 通过多智能体规划与代码生成研究自动化游戏开发。          | 规划 / 编码 / 测试 |
| [MarioGPT](https://github.com/shyamsn97/mario-gpt) · 2023 | 使用 GPT 模型根据文本生成可玩的 Mario 风格关卡布局。 | 规划 / 场景 / 测试 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GameGPT](https://arxiv.org/abs/2310.08067)**

规划、审查与实现智能体分解游戏需求并生成代码，重点处理幻觉与冗余。这是面向游戏开发智能体的早期研究框架。链接的仓库仅含论文和 README；它不是经过验证、可直接部署的产品。

标签：`Multi-agent` · `Task planning` · `Research prototype`。资料审阅日期：2026-10-18。延伸阅读：[论文与 README 仓库](https://github.com/leyiwo/GameGPT)

**[MarioGPT](https://github.com/shyamsn97/mario-gpt)**

将关于敌人、管道和高低变化的描述转化为字符网格关卡及预览，并可使用交互式模拟器或 A\* 检查。它在现有规则内生成关卡内容，支持可控程序化内容生成研究。其范围不包括游戏引擎、角色美术或完整玩法代码。

标签：`PCG` · `Level generation` · `Text-to-level` · `GPT-2`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2302.05981)

</details>

### 工具

| 资源                                                                                        | 用途与范围                                        | 阶段                          |
| ----------------------------------------------------------------------------------------- | -------------------------------------------- | --------------------------- |
| [Agent Game Forge](https://github.com/0x0funky/agent-game-forge)                          | 面向 Codex 和 Claude Code 的本地 2D 游戏 IDE，带场景编辑器。 | 规划 / 编码 / 资产 / 场景 / 测试 / 交付 |
| [Text2Game](https://github.com/boltomli/t2g)                                              | 将长篇文本转化为叙事原型所需的世界、角色和事件数据。                   | 规划 / 编码 / 场景                |
| [PixelLab AI Agent Toolkit](https://www.pixellab.ai/mcp)                                  | 通过 API 和 MCP 工具生成像素角色、动画及无缝瓦片集。              | 资产 / 场景                     |
| [OpenAI Image Generation](https://developers.openai.com/api/docs/guides/image-generation) | 使用图像端点或对话式图像生成工具生成和编辑光栅美术图像。                 | 资产                          |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Agent Game Forge](https://github.com/0x0funky/agent-game-forge)**

通过智能体、资产工作流和 JSON 场景数据，将自然语言请求转化为 JS + Canvas 游戏。用户可在可视化编辑器中调整布局和碰撞。README 将 Web 输出列为当前默认方案，完整 Godot 和 Unity 支持仍在路线图中。项目自称尚未正式推出。

标签：`2D IDE` · `Canvas` · `Scene editing` · `Prototyping`。资料审阅日期：2026-10-18。

**[Text2Game](https://github.com/boltomli/t2g)**

分块分析文本、合并结果，并生成 Twine/Chapbook HTML 或 Godot 视觉小说项目。仓库提供 Python 流水线和示例，用于研究如何将叙事转化为可玩原型。它并不普遍保证能够生成任意动作游戏。

标签：`Interactive narrative` · `Twine` · `Godot` · `Visual novels`。资料审阅日期：2026-10-18。

**[PixelLab AI Agent Toolkit](https://www.pixellab.ai/mcp)**

接收角色描述、方向、动作和地形条件，产出像素资产，包括四向或八向角色，以及侧视或俯视瓦片集。这是一项商业资产服务。MCP 将其资产工具连接到编程智能体；游戏规则、碰撞和资产导入仍需项目工作流支持。

标签：`Pixel art` · `Sprite` · `Tileset` · `MCP` · `Commercial service`。资料审阅日期：2026-10-18。延伸阅读：[文档](https://www.pixellab.ai/docs)

**[OpenAI Image Generation](https://developers.openai.com/api/docs/guides/image-generation)**

通过 Images API 或多轮 Responses 工作流生成或编辑光栅图像。请保存输出字节和请求设置；蒙版用于引导编辑，而非保证精确边界。精灵图一致性与无缝纹理需要单独检查。技术指南并未确立输出权利或重试计费规则。

标签：`asset-generation`。资料审阅日期：2026-10-18。

</details>

<a id="3d"></a>

## 面向 3D 游戏开发的 AI

### 框架

| 资源                                                                 | 用途与范围                            | 阶段                     |
| ------------------------------------------------------------------ | -------------------------------- | ---------------------- |
| [3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A) · 2026 | 通过技能、模型流水线和引擎适配器协调游戏资产、玩法与 UI。   | 规划 / 编码 / 资产 / 场景 / 测试 |
| [Infinigen](https://github.com/princeton-vl/infinigen) · 2023      | 以程序化方式生成 Blender 自然场景、室内场景及合成数据。 | 资产 / 场景 / 测试           |
| [Holodeck](https://github.com/allenai/Holodeck) · 2023             | 根据文本为交互式 3D 室内环境布局并配置家具。         | 规划 / 场景                |
| [AutoUE](https://github.com/Pluto156/AutoUE) · 2026                | 协调智能体构建 Unreal 场景、玩法代码、交互和游玩测试。  | 规划 / 编码 / 资产 / 场景 / 测试 |
| [UniGen](https://github.com/yxwan123/UniGen) · 2025                | 规划 Unity 原型、生成脚本、组装场景，并支持迭代调试。   | 规划 / 编码 / 场景 / 测试      |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A)**

编程智能体将需求分派至图像、3D、动作、音频等流水线，生成资产和引擎原生代码，并提供 UE5、Unity、Godot、Blender 和 three.js 的上下文。演示混合使用生成资源与现有资源。3A 名称不代表经过验证的商业质量评级。这是独立项目，不同于 Kling 的 GameFactory 视频世界模型。

标签：`Agent Skills` · `Asset pipelines` · `Multiple engines` · `Game generation`。资料审阅日期：2026-10-18。延伸阅读：[中文文档](https://github.com/OpenDCAI/GameFactory-3A/blob/main/README_zh.md)

**[Infinigen](https://github.com/princeton-vl/infinigen)**

随机种子、参数和资产生成器产出几何体、材质、场景及标注，并提供 OBJ、OpenUSD 等格式的导出文档。这是程序化系统，而非语言模型。它可为 AI 开发工作流提供可控场景和数据；实时游戏仍需优化、碰撞和玩法集成。

标签：`Procedural generation` · `Blender` · `Synthetic data` · `Scenes`。资料审阅日期：2026-10-18。延伸阅读：[项目与论文](https://infinigen.org/)

**[Holodeck](https://github.com/allenai/Holodeck)**

结合语言规划、资产检索和空间约束，将房间需求转化为 AI2-THOR 场景，并说明如何在 Unity 中加载。评测主要面向具身 AI 环境生成。它为场景布局和语义交互提供思路，但不能证明其具备完整游戏关卡设计能力或已达到商业发布要求。

标签：`Text-to-scene` · `AI2-THOR` · `Spatial constraints` · `Embodied environments`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2312.09067)

**[AutoUE](https://github.com/Pluto156/AutoUE)**

将游戏描述转化为 Unreal Engine 场景与 C++ 玩法的研究流水线。其公开实现包含设置说明、演示视频，以及生成游戏和资产数据集的链接。复现需要 Unreal 集成和外部模型服务。视频展示的是输出，并非托管的可玩游戏。对固定版本评测分派器的静态检查发现，移动命令被跳过，交互处理器被直接调用；仅完成该脚本路径并不能证明玩家导航成功。

标签：`Unreal Engine` · `Game generation` · `Multi-agent` · `Research prototype`。资料审阅日期：2026-10-19。延伸阅读：[论文](https://arxiv.org/abs/2603.07106) · [生成游戏与资产数据集](https://huggingface.co/datasets/Pluto156/AutoUE_DataSet) · [固定版本的评测分派器](https://github.com/Pluto156/AutoUE/blob/8686a4d51c19813f2b3368bd73f685a940db7531/PCGGen_UE/Plugins/LLMEditor/Source/LLMEditor/Private/Core/EvaluateExecutor/EvaluateExecutor.cpp#L174-L186)

- **演示 · 视频：**  [游戏生成视频](https://github.com/Pluto156/AutoUE/blob/main/assets/show.mp4)。生成的 Unreal 游戏的录制演示；未验证存在可在浏览器游玩的公开构建。
- **源码 · 流水线源码：**  [流水线源码](https://github.com/Pluto156/AutoUE)。公开的框架实现；引擎设置、模型服务和数据集资产仍是独立要求。
- **教程 · 教程：**  [设置与使用](https://github.com/Pluto156/AutoUE#setup-and-usage)。作者提供的依赖、服务凭据及运行 Unreal 生成流水线的说明。

**[UniGen](https://github.com/yxwan123/UniGen)**

根据自然语言描述创建 Unity 游戏的多智能体研究工作流。仓库发布了 Python 流水线和模型连接器，并提供安装指南与录制演示。需要 Unity 和模型服务账户。公开流水线代码已可获取，但尚未验证存在托管的可玩构建，以及基准测试游戏的完整可下载版本。

标签：`Unity` · `Game generation` · `Scene assembly` · `Research prototype`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2509.26161)

- **演示 · 视频：**  [Unity 生成视频](https://www.youtube.com/watch?v=xyJjFfnxUx0)。作者链接的演示视频，不是可在浏览器游玩的游戏。
- **源码 · 流水线源码：**  [流水线源码](https://github.com/yxwan123/UniGen)。已发布的生成器实现和提示词；这不是所有基准测试游戏的完整发布。
- **教程 · 教程：**  [安装与使用](https://github.com/yxwan123/UniGen#-installation)。README 涵盖先决条件和本地 Unity 生成工作流；运行前请审查路径与项目设置。

</details>

### 技能

| 资源                                                                                    | 用途与范围                              | 阶段                     |
| ------------------------------------------------------------------------------------- | ---------------------------------- | ---------------------- |
| [Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) | Unity 维护的项目技能，为通用编程智能体提供引擎专用上下文。   | 规划 / 编码 / 场景 / 测试 / 交付 |
| [Godot MCP 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets)  | 使用 Godot 几何体与验证工作流构建可复用的风格化 3D 资产。 | 资产 / 场景 / 测试           |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin)**

为 Claude Code、Codex 和 Grok 提供 2D、UI、渲染、导航、物理、多人游戏等任务的技能，并连接 Unity CLI 和 MCP 控制接口。Unity 需要 6.0 或更高版本。当前 CLI MCP 模式取代了旧版 assistant 包中的 MCP；请遵循所用版本的文档。

标签：`Official` · `Agent Skills` · `Unity` · `CLI` · `MCP`。资料审阅日期：2026-10-18。延伸阅读：[技能源码](https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills) · [CLI / MCP 迁移](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli)

**[Godot MCP 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets)**

接收项目风格与资产需求，再使用 Godot MCP 和确定性构建器生成 PackedScene 资产，并检查落地、碰撞、导航和截图。它为 Codex 和 Claude Code 设计，可复用现有项目资源。需要兼容的 MCP 能力，并非图像转网格生成模型。

标签：`Godot` · `Agent Skill` · `PackedScene` · `Asset QA`。资料审阅日期：2026-10-18。

</details>

### 基准测试

| 资源                                                         | 用途与范围                                    | 阶段      |
| ---------------------------------------------------------- | ---------------------------------------- | ------- |
| [GameEngineBench](https://arxiv.org/abs/2607.03525) · 2026 | 在真实 Unreal Engine 项目中测试智能体编写的 C++ 运行时修改。 | 编码 / 测试 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GameEngineBench](https://arxiv.org/abs/2607.03525)**

论文 v2 描述了来自九个 Unreal 项目的 110 项限定范围的 C++ 任务。智能体获得可构建的起始项目、允许修改的文件和行为要求。编译和 Play-in-Editor 监听服务器测试后，LLM 评判器审查规格、测试证据、修改和参考解，以判定是否成功。审阅期间无法获取论文链接的仓库，因此可运行代码是否可用仍未经验证。其范围是局部 C++ 实现，而非完整 3D 游戏生成。

标签：`Development benchmark` · `Unreal Engine` · `C++` · `Behavior tests`。资料审阅日期：2026-10-18。延伸阅读：[论文链接的仓库（可用性未经验证）](https://github.com/Nitrode-Research/GameEngineBench) · [版本化的评测协议](https://arxiv.org/html/2607.03525v2)

</details>

### 论文

| 资源                                                                                           | 用途与范围                           | 阶段             |
| -------------------------------------------------------------------------------------------- | ------------------------------- | -------------- |
| [Video2Game](https://github.com/video2game/video2game) · 2024                                | 将真实世界视频重建为浏览器中的交互式 3D 环境。       | 资产 / 场景 / 世界模型 |
| [BlenderLLM / BlendNet / CADBench](https://github.com/FreedomIntelligence/BlenderLLM) · 2024 | 借助训练数据集与建模基准测试研究文本转 Blender 脚本。 | 资产 / 测试        |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Video2Game](https://github.com/video2game/video2game)**

视频与相机信息经过重建、网格提取、外观烘焙和碰撞生成，转化为 three.js 游戏环境。文档中的 UE 路线建议使用完全漫反射的烘焙网格，并将烘焙镜面反射维度设为零。这是一种显式环境重建方法，仍需手动场景设置与物理集成。应将其与预测下一帧的交互式视频世界模型区分。

标签：`Video-to-3D` · `Reconstruction` · `Three.js` · `Collision`。资料审阅日期：2026-10-19。延伸阅读：[论文](https://arxiv.org/abs/2404.09833) · [固定版本的引擎交接建议](https://github.com/video2game/video2game/blob/7bcf8ae754240b9fd2de75a154eb73c75a146b79/readme.md#L256-L273)

**[BlenderLLM / BlendNet / CADBench](https://github.com/FreedomIntelligence/BlenderLLM)**

BlenderLLM 根据用户指令生成 bpy 建模脚本。仓库和已发布数据集文档报告，BlendNet 包含约 12K 个配对样本，CADBench 包含合成任务和来自论坛的任务。评测聚焦基础 CAD 风格建模与指令遵循。README 指出其在高级材质、多模态输入和多轮协作方面存在局限；这不是游戏创建基准测试。

标签：`Text-to-bpy` · `CADBench` · `Dataset` · `Modeling benchmark`。资料审阅日期：2026-10-19。延伸阅读：[论文](https://arxiv.org/abs/2412.14203) · [BlendNet 数据集](https://huggingface.co/datasets/FreedomIntelligence/BlendNet) · [CADBench](https://huggingface.co/datasets/FreedomIntelligence/CADBench) · [固定版本的发布数据集说明](https://github.com/FreedomIntelligence/BlenderLLM/blob/f778bfd6992ddd675f7615d0eaf965a8576f2879/README.md#L44-L50)

</details>

### 工具

| 资源                                                                                                  | 用途与范围                          | 阶段           |
| --------------------------------------------------------------------------------------------------- | ------------------------------ | ------------ |
| [MCP Unity Editor](https://github.com/CoderGamester/mcp-unity)                                      | 用于查询、编辑和测试 Unity 项目的社区 MCP 桥接。 | 编码 / 场景 / 测试 |
| [Hunyuan3D 2.0](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) · 2025                              | 将参考图像转化为 3D 资产流水线所需的几何体和纹理。    | 资产           |
| [TRELLIS](https://github.com/microsoft/TRELLIS) · 2024                                              | 根据结构化潜在表示生成网格、高斯和辐射场。          | 资产           |
| [TripoSR](https://github.com/VAST-AI-Research/TripoSR) · 2024                                       | 根据单张图像快速重建 3D 物体，用于资产原型制作。     | 资产           |
| [Tripo Model Generation API](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html) | 版本化的文本转模型生成，提供独立的几何与纹理种子。      | 资产           |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[MCP Unity Editor](https://github.com/CoderGamester/mcp-unity)**

向 MCP 客户端开放场景、GameObject、组件、Prefab、日志、Unity Test Runner 等编辑器操作。此社区工具独立于 Unity 官方插件。其 README 警告，带域重载进入 Play Mode 可能使桥接断开；请检查已安装版本、测试配置与实际结果。仅有编辑器自动化并不能证明玩法正确。

标签：`Unity` · `MCP` · `Editor automation` · `Community tool`。资料审阅日期：2026-10-18。

**[Hunyuan3D 2.0](https://github.com/Tencent-Hunyuan/Hunyuan3D-2)**

2.0 流水线使用 Hunyuan3D-DiT 生成形状，再通过 Hunyuan3D-Paint 为网格生成纹理。它支持 GLB 和 OBJ 导出及 Blender 插件，并采用专门的 Tencent Hunyuan 3D 2.0 社区许可。独立的 2.1 版本增加了 PBR 纹理流水线和训练代码。拓扑、LOD、绑定、碰撞、运行时性能及各版本条款仍需在游戏流水线中检查。

标签：`Image-to-3D` · `Mesh` · `Textures` · `Blender`。资料审阅日期：2026-10-18。延伸阅读：[2.0 论文](https://arxiv.org/abs/2501.12202) · [2.1 仓库](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1) · [2.0 许可](https://github.com/Tencent-Hunyuan/Hunyuan3D-2/blob/main/LICENSE)

**[TRELLIS](https://github.com/microsoft/TRELLIS)**

将图像或文本输入解码为多种 3D 表示。官方示例支持带纹理的 GLB 导出和简化。常规游戏资产流水线主要使用其网格分支；高斯和辐射场输出本身不包含可用的碰撞、动画或玩法逻辑。

标签：`Image-to-3D` · `Text-to-3D` · `GLB` · `Structured Latents`。资料审阅日期：2026-10-18。延伸阅读：[论文](https://arxiv.org/abs/2412.01506)

**[TripoSR](https://github.com/VAST-AI-Research/TripoSR)**

使用 LRM 风格的前馈重建，公开代码、预训练模型和演示。输入图像被转化为可导出的物体网格。它聚焦单个物体；不可见表面、拓扑和游戏性能需要额外处理。它不是完整场景或可玩游戏生成器。

标签：`Image-to-3D` · `Reconstruction` · `Mesh` · `Prototype assets`。资料审阅日期：2026-10-18。

**[Tripo Model Generation API](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html)**

H3 文本转模型请求（v3.1-20260211 和 v3.0-20250812）提供独立的几何与纹理种子，以及 PBR 控制。请持久保存 model_version 和任务 ID，使用提交任务的 API 密钥查询，并及时下载成功输出的文件：其 URL 默认在五分钟后过期。低多边形生成可能在复杂输入上失败。跨版本可复现性、输出权利、取消端点及重试费用仍未经验证。

标签：`asset-generation`。资料审阅日期：2026-10-19。延伸阅读：[Tripo 任务结果](https://docs.tripo3d.ai/task-query/get-your-task-result.html)

</details>

<a id="production"></a>

## 游戏制作：美术、动画、音频、测试与运行时 AI

### 框架

| 资源                                                        | 用途与范围                 | 阶段             |
| --------------------------------------------------------- | --------------------- | -------------- |
| [FastNoise Lite](https://github.com/Auburn/FastNoiseLite) | 可移植的噪声库，用于程序化地形和材质输入。 | 编码 / 资产 / 世界模型 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[FastNoise Lite](https://github.com/Auburn/FastNoiseLite)**

采用 MIT 许可，跨多种语言提供 2D/3D 采样、分形和定义域扭曲。这些是生成基础组件：网格化、侵蚀、持久世界状态和有意义的关卡设计需要其他系统。

标签：`Procedural generation` · `Noise` · `Terrain`。资料审阅日期：2026-10-18。

</details>

### 技能

| 资源                                                                                                               | 用途与范围                                                                 | 阶段                |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------- |
| [Level Design Book · 非官方设计技能](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design) · 2026 | 对 The Level Design Book 的非官方、智能体中立改编，用于关卡简报、白盒、遭遇、寻路指引，以及基于证据的游玩测试审查。 | 规划 / 场景 / 测试 / 交付 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Level Design Book · 非官方设计技能](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design)**

此英文技能包将 The Level Design Book 重组为任务路由、十三份主题/来源参考和三个可复用模板。它主要面向 3D 关卡；改用于 2D 时必须说明改变了哪些假设。该包报告采用 2026-10-16 的来源快照，并映射了 94 个已索引的来源页面，其中包括未完成的章节；GameMap 未独立复现这一阅读过程、运行工作流或验证设计结果。原著作者署名为 Robert Yang 及包括 Andrew Yoder 在内的贡献者。这不是官方图书版本，也不是 pi 维护者的出版物。此改编采用 CC BY-NC-SA 4.0：请保留署名与变更声明，遵守非商业性/相同方式共享条件，并审查单独的第三方例外。这些条款不会自动为每个游戏输出授予许可。

标签：`level-design` · `skill` · `blockout` · `playtesting` · `agent-neutral` · `CC-BY-NC-SA-4.0` · `noncommercial` · `unofficial-adaptation`。资料审阅日期：2026-10-18。延伸阅读：[The Level Design Book](https://book.leveldesignbook.com/) · [原作者与贡献者](https://book.leveldesignbook.com/appendix/about) · [图书许可与第三方例外](https://book.leveldesignbook.com/appendix/license) · [CC BY-NC-SA 4.0 法律文本](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode)

- **演示 · 不可用：**  提供说明与模板，而非可运行演示。未提供引擎插件、可执行关卡、基准测试结果或经过验证的游玩测试。
- **源码 · 完整源码：**  [完整技能包与许可](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design)。纯文本包，包含 SKILL.md、LICENSE.md、参考资料和模板。CC BY-NC-SA 4.0 适用于此改编目录，而非整个仓库；商业分发需要取得适当许可。
- **教程 · 教程：**  [阅读原书](https://book.leveldesignbook.com/)。作为基础的原书仍具有权威性。该技能重组指导和模板，而非宣称普遍适用的设计法则或经独立测量的结果。

</details>

### 文档

| 资源                                                                                                                                                   | 用途与范围                            | 阶段           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------ |
| [Unreal Engine · Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US) | 编排包含多个进程、角色、设备及日志收集的游戏测试会话。      | 测试 / 交付      |
| [Windows · UI 自动化与输入语义](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview)                                      | 开放提供程序支持的无障碍控件模式，用于检查和操纵桌面编辑器控件。 | 编码 / 场景 / 测试 |
| [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)                                                     | 面向设计师、开发者和测试团队的游戏专用无障碍指南。        | 规划 / 测试      |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Unreal Engine · Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US)**

Gauntlet 使用准备好的 cooked 构建，并通过 AutomationTool 启动已配置的游戏角色。游戏专用测试节点定义断言和终止结果；仅启动客户端与服务器并不能证明场景成功。构建产出、设备可用性、进程清理以及并行会话的端口分配仍是独立职责。

标签：`Unreal Engine` · `AutomationTool` · `Multi-process testing` · `Cooked builds`。资料审阅日期：2026-10-18。

**[Windows · UI 自动化与输入语义](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview)**

必须逐个控件探测提供程序支持情况；不假定任何特定游戏编辑器具备无障碍支持。UIA 坐标是物理像素，而绝对鼠标输入使用归一化桌面坐标。边界矩形可能包含被遮挡的点，前台激活可能遭拒绝，插入输入并不能证明应用已完成操作。必须遵守完整性级别限制。

标签：`Windows` · `Accessibility` · `Native GUI` · `CUA` · `DPI`。资料审阅日期：2026-10-19。延伸阅读：[属性与遮挡](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-automation-element-propids) · [输入与完整性级别限制](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput) · [DPI 坐标](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-screenscaling) · [窗口/显示器捕获与帧生命周期](https://learn.microsoft.com/en-us/windows/apps/develop/media-authoring-processing/screen-capture) · [GameMap：原生 UI 证据边界](https://github.com/OpenEnvision/GameMap/blob/main/docs/production/engine-operations.md#native-gui-automation-is-a-separate-evidence-surface)

**[Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)**

指南涵盖无障碍游戏体验，并提供审查标准。这些是最佳实践指导，而非法律合规检查表或认证。仅靠自动扫描不能取代人工评估和残障玩家测试。

标签：`Accessibility` · `QA` · `Guidelines`。资料审阅日期：2026-10-18。

</details>

### 工具

| 资源                                                                                              | 用途与范围                                 | 阶段               |
| ----------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------- |
| [Scenario](https://www.scenario.com/)                                                           | 利用自定义风格模型和批量生成，构建一致的游戏美术流水线。          | 资产 / 场景          |
| [Meshy API](https://docs.meshy.ai/en)                                                           | 为游戏资产工作流连接 AI 模型生成、人形绑定和动画导出。         | 资产 / 场景          |
| [HY-Motion 1.0](https://github.com/Tencent-Hunyuan/HY-Motion-1.0) · 2025                        | 根据文本生成人形骨骼动作，公开推理代码和模型权重。             | 资产               |
| [ElevenLabs Sound Effects](https://elevenlabs.io/docs/overview/capabilities/sound-effects)      | 通过 Web 应用或 API，根据文本生成游戏音效、拟音和循环环境音。   | 资产               |
| [Stable Audio Open 1.0](https://huggingface.co/stabilityai/stable-audio-open-1.0) · 2024        | 提供可下载的文本转音频权重和本地工具，用于音效与实地录音。         | 资产               |
| [Regression Games](https://github.com/Regression-Games/RGUnityBots)                             | 提供公开 Unity SDK，用于玩法录制、输入回放和回归测试参考工作流。 | 测试 / 交付          |
| [modl.ai](https://modl.ai/)                                                                     | 利用视觉智能体和自然语言任务，测试上传的游戏构建。             | 测试 / 交付          |
| [Convai](https://convai.com/)                                                                   | 添加具备语音、记忆、情感和场景内动作的对话式 NPC。           | 编码 / 场景 / 运行时 AI |
| [ElevenLabs Music](https://elevenlabs.io/docs/overview/capabilities/music)                      | 基于提示生成音乐，支持作曲计划、参考和分段编辑。              | 资产               |
| [ElevenLabs Speech Generation](https://elevenlabs.io/docs/api-reference/text-to-speech/convert) | 以声音为条件的语音合成，提供发音词典和相邻请求连续性控制。         | 资产               |
| [MSDF Atlas Generator](https://github.com/Chlumsky/msdf-atlas-gen)                              | 用于生成距离场字体图集的命令行与库工具。                  | 资产 / 交付          |
| [DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler)                   | 通过 dxc 命令行和编译器 API 编译 HLSL。           | 编码 / 测试 / 交付     |
| [Playwright Test](https://playwright.dev/docs/test-snapshots)                                   | 支持 DOM 操作、断言和截图对比的浏览器测试。              | 编码 / 测试          |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Scenario](https://www.scenario.com/)**

Scenario 提供托管的图像、视频、3D 和音频工作流、自定义模型训练、REST API，以及官方 beta MCP 接口。提交前请检查各模型的 schema；MCP model_run 可能返回未完成作业，而非输出资产。文档中的 job_cancel 无法取消由 model_run 或 workflow_run 创建的作业。集成示例不包含完整托管服务或完整游戏项目。

标签：`Art direction` · `Style consistency` · `Character consistency` · `Batch assets` · `Commercial service`。资料审阅日期：2026-10-18。延伸阅读：[API 文档](https://docs.scenario.com/) · [官方 beta MCP 操作](https://mcp.scenario.com/docs/tools/model-run) · [作业取消范围](https://mcp.scenario.com/docs/tools/job-cancel)

- **演示 · 交互式：**  [资产生成应用](https://app.scenario.com/)。需要账户的托管创意工具；这是资产工作区，而非可玩游戏。
- **源码 · SDK：**  [Unity 集成源码](https://github.com/scenario-labs/Scenario-Unity)。公开 Unity 集成插件；不包含托管模型源码和完整游戏项目。
- **教程 · 教程：**  [一致的游戏资产流水线](https://docs.scenario.com/get-started/documentation/integrating-with-applications-real-world-scenarios#1-game-asset-pipeline--batch-generation-with-style-consistency)。官方操作指南，介绍自定义风格训练、批量生成与资产交付。

**[Meshy API](https://docs.meshy.ai/en)**

官方动画角色配方将参考图像转化为带纹理和骨架绑定的角色，包含待机、跳跃及攻击片段，采用 GLB 和 FBX 格式。动画步骤应用 Meshy 库中的动作。API 绑定最适合具有清晰分离四肢、带纹理的标准双足角色。生成资产仍需进行引擎导入、碰撞、控制和性能检查；公开 cookbook 提供的是资产示例，而非完整玩法。

标签：`Image-to-3D` · `Rigging` · `Character animation` · `GLB` · `FBX` · `Commercial service`。资料审阅日期：2026-10-18。延伸阅读：[绑定要求](https://docs.meshy.ai/en/api/rigging)

- **演示 · 交互式：**  [3D 资产工作区](https://www.meshy.ai/workspace)。托管的生成与动画工作区；生成资产需要账户访问权限。这不是可玩游戏。
- **源码 · 示例：**  [Cookbook 示例源码](https://github.com/meshy-dev/meshy-cookbook)。公开的资产生成配方，不是 Meshy 模型源码或完整游戏项目。
- **教程 · 教程：**  [从图像到动画角色](https://www.meshy.ai/developers/cookbook/recipes/animate-3d-character/)。官方指南，含参考文件、Python 和 TypeScript 示例及 GLB/FBX 输出。API 访问消耗积分。

**[HY-Motion 1.0](https://github.com/Tencent-Hunyuan/HY-Motion-1.0)**

Tencent 的文本转动作模型生成人类角色动画，提供 CLI 推理、本地 Gradio 可视化和托管模型演示。应将生成动作作为动画流水线输入，并重定向到目标角色。文档列出的局限包括非人形动作、多人交互、无缝循环和原地动画。该版本提供动作实现，而非可控游戏角色或完整游戏项目。其自定义许可不适用于欧盟、英国和韩国，并限制使用该作品或输出来改进其他 AI 模型，但 HY-Motion 及其衍生模型除外。采用前请审阅确切许可和商业门槛。

标签：`Text-to-motion` · `Skeletal animation` · `Humanoid` · `Model weights` · `Local inference`。资料审阅日期：2026-10-18。延伸阅读：[官方项目](https://hunyuan.tencent.com/motion) · [模型权重](https://huggingface.co/tencent/HY-Motion-1.0) · [HY-Motion 社区许可](https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/License.txt)

- **演示 · 交互式：**  [交互式动作演示](https://huggingface.co/spaces/tencent/HY-Motion-1.0)。官方文本转动作模型界面；是动作预览，而非可玩玩法。托管服务的可用性可能变化。
- **源码 · 模型：**  [动作实现源码](https://github.com/Tencent-Hunyuan/HY-Motion-1.0)。公开的推理与可视化实现，权重通过独立链接提供；不含完整游戏项目。
- **教程 · 教程：**  [安装与动作工作流](https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/README.md)。官方设置、CLI 推理、本地 UI 和提示编写指南。本地执行需要文档所述 GPU 资源。

**[ElevenLabs Sound Effects](https://elevenlabs.io/docs/overview/capabilities/sound-effects)**

描述脚步、撞击、UI 反馈或环境声音，控制时长，并导出音频供游戏引擎使用。文档介绍了支持无缝重复播放的循环生成，每个片段最长 30 秒。概述列出所有音效均支持 MP3，非循环音效支持 48 kHz WAV；API 格式支持和套餐要求应单独核查。循环质量仍需在目标游戏中验证。这是托管音频服务。公开 SDK 连接其 API，不发布生成模型或完整游戏项目。

标签：`Sound effects` · `Foley` · `Ambience` · `Audio loops` · `API` · `Commercial service`。资料审阅日期：2026-10-19。延伸阅读：[产品操作指南](https://elevenlabs.io/docs/eleven-creative/playground/sound-effects) · [Sound Effects API 参考](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert)

- **演示 · 交互式：**  [音效生成器](https://elevenlabs.io/sound-effects)。官方文本转音频生成器及声音示例；这是音频工具，而非可玩游戏。
- **源码 · SDK：**  [官方 Python SDK](https://github.com/elevenlabs/elevenlabs-python)。仅提供 API 客户端源码；不包含生成模型和完整游戏源码。
- **教程 · 教程：**  [Sound Effects 快速入门](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/sound-effects)。含 SDK 示例的官方 API 操作指南；生成需要账户和 API 密钥。

**[Stable Audio Open 1.0](https://huggingface.co/stabilityai/stable-audio-open-1.0)**

生成最长 47 秒、44.1 kHz 的立体声音频，提供本地推理与 WAV 导出示例。官方 audio-tools 仓库包含本地 Gradio 界面。模型最适合英文描述，生成音效和实地录音的能力优于音乐，且无法生成逼真人声。获取模型需要接受条款并与发布方共享联系信息；此资源是音频流水线，而非完整配乐或游戏生成器。

标签：`Text-to-audio` · `Sound effects` · `Field recordings` · `Model weights` · `Local inference`。资料审阅日期：2026-10-19。延伸阅读：[本地演示设置](https://github.com/Stability-AI/stable-audio-tools#interface) · [研究论文](https://arxiv.org/abs/2407.14358) · [Stable Audio Open 模型许可](https://huggingface.co/stabilityai/stable-audio-open-1.0/blob/main/LICENSE.md)

- **演示 · 本地工具：**  [本地音频演示设置](https://github.com/Stability-AI/stable-audio-tools#interface)。下载并在本地运行官方 Gradio 音频界面；此链接是设置指南，不是托管的可玩游戏。
- **源码 · 流水线源码：**  [音频工具源码](https://github.com/Stability-AI/stable-audio-tools)。采用 MIT 许可的训练和推理代码；Stable Audio Open 1.0 权重另设访问门槛，并受模型的社区许可约束。不含完整游戏项目。
- **教程 · 教程：**  [本地推理与 WAV 导出](https://huggingface.co/stabilityai/stable-audio-open-1.0#usage)。面向 stable-audio-tools 和 Diffusers 的官方模型使用示例。

**[Regression Games](https://github.com/Regression-Games/RGUnityBots)**

公开 Unity SDK 结合了玩法录制、状态检查、输入回放、机器人逻辑与验证工作流。其官方首个测试教程和 Boss Room UI 测试项目仍可在 GitHub 仓库中获取。应将其视为参考集成：审阅期间无法访问旧文档域名，当前托管服务的可用性和维护情况也未确认。SDK 源码已公开；采用前请核查兼容性与服务要求。

标签：`Unity` · `Automated playtesting` · `Input replay` · `Regression testing` · `Reference integration`。资料审阅日期：2026-10-18。延伸阅读：[Unity SDK](https://github.com/Regression-Games/RGUnityBots) · [Boss Room UI 测试示例](https://github.com/Regression-Games/UITest-BossRoom) · [首个测试教程的仓库备用入口](https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx)

- **演示 · 示例：**  [可运行的 Boss Room 示例](https://github.com/Regression-Games/UITest-BossRoom)。带 UI 测试的完整 Unity 示例项目；请下载并在本地打开，而非在浏览器中游玩。
- **源码 · SDK：**  [Unity 测试 SDK 源码](https://github.com/Regression-Games/RGUnityBots)。公开客户端 SDK 源码；不包含完整的托管仪表板后端。
- **教程 · 教程：**  [你的首个自动化测试](https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx)。保存在文档仓库中的官方首个测试操作指南。审阅期间无法访问原在线文档域名。

**[modl.ai](https://modl.ai/)**

当前商业服务通过观察屏幕和发送模拟输入来测试，无需引擎 SDK。团队上传构建、描述测试任务，并审查捕获的会话与缺陷报告。其宣称覆盖 Android 和桌面平台；对时序要求严苛的玩法仍受限制。供应商还介绍了使用测试运行数据训练游戏专用模型；无需 SDK 不意味着无需针对游戏进行准备。当前产品不同于旧版基于 SDK 的文档。尚未验证存在面向公众的自助游玩体验、完整产品源码及独立的动手教程。

标签：`Automated playtesting` · `Visual agents` · `Commercial service` · `Game QA`。资料审阅日期：2026-10-18。延伸阅读：[申请产品演示](https://modl.ai/contact)

- **演示 · 服务：**  [预约产品演示](https://modl.ai/contact)。需预约的商业演示；这不是公开可玩游戏或即时沙盒。
- **源码 · 不可用：**  完整产品源码不可获取。未验证当前托管测试产品有完整源码发布；旧版公开示例不是其后端。
- **教程 · 服务：**  [工作流概述](https://modl.ai/)。官方上传、任务定义与报告概述；详细入门指导通过服务提供。

**[Convai](https://convai.com/)**

Convai 通过引擎集成将游戏角色连接到运行时对话与行为服务。其 Unity 指南涵盖安装、示例场景和角色设置；Unreal SDK 源码也已公开。浏览器体验需要账户。它为现有游戏提供 AI 行为，而非生成完整游戏。公开 SDK 不包含完整托管 AI 服务。

标签：`Runtime AI` · `NPC dialogue` · `Character actions` · `Unity / Unreal`。资料审阅日期：2026-10-18。延伸阅读：[Unity SDK 文档](https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk) · [Unreal SDK 源码](https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4) · [项目与体验](https://convai.com/gallery)

- **演示 · 交互式：**  [尝试角色体验](https://x.convai.com/)。需要账户的浏览器角色体验；这些是对话与角色扮演，而非完整游戏生成演示。
- **源码 · SDK：**  [Unreal Engine SDK 源码](https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4)。公开引擎集成源码；不包含完整云端对话服务。
- **教程 · 教程：**  [构建你的首个 AI 角色](https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk/getting-started)。官方 Unity 安装、服务设置、示例场景和自定义角色操作指南。

**[ElevenLabs Music](https://elevenlabs.io/docs/overview/capabilities/music)**

利用作曲计划、参考和分段编辑生成音乐。音乐专用条款区分独立游戏与工作室游戏用途，因此仅付费获得 API 访问权并不代表所有游戏发行都已获许可。2026 年 10 月的使用政策限制 AI 开发/训练数据集用途，除非得到明确许可。需要审查参考音频权利和套餐资格。

标签：`audio-generation`。资料审阅日期：2026-10-18。延伸阅读：[ElevenLabs Music 条款](https://elevenlabs.io/music-terms) · [禁止使用政策（2026 年 10 月）](https://elevenlabs.io/use-policy)

**[ElevenLabs Speech Generation](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)**

语音端点接受版本化发音词典，以及前后文本或请求上下文。零保留模式仅限企业版，并禁用基于历史记录的连续性功能；请核查模型兼容性。2026 年 10 月政策限制 AI 开发/训练数据集用途，面向 18 岁以下用户的产品须获批准。这些约束不同于普通输出的商业使用权和免费套餐限制。

标签：`speech-generation` · `audio-generation`。资料审阅日期：2026-10-18。延伸阅读：[禁止使用政策（2026 年 10 月）](https://elevenlabs.io/use-policy) · [非欧洲经济区通用条款（2026 年 10 月）](https://elevenlabs.io/terms-of-use)

**[MSDF Atlas Generator](https://github.com/Chlumsky/msdf-atlas-gen)**

根据字体生成字形纹理和布局元数据。除非覆盖设置，默认字符集为 ASCII，因此必须明确指定多语言覆盖范围。图集颜色通道应作为线性数据采样，而非 sRGB；字体许可仍需独立处理。

标签：`Fonts` · `MSDF` · `UI`。资料审阅日期：2026-10-18。

**[DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler)**

编译器调用成功与着色器编译成功是两回事：请检查结果状态、诊断信息和请求的输出。目标配置、包含文件依赖和构建配置都很重要。着色器编译通过并不能证明渲染正确或兼容目标设备。

标签：`Shaders` · `HLSL` · `Build validation`。资料审阅日期：2026-10-18。延伸阅读：[编译器 API 指南](https://github.com/microsoft/DirectXShaderCompiler/wiki/Using-dxc.exe-and-dxcompiler.dll)

**[Playwright Test](https://playwright.dev/docs/test-snapshots)**

截图断言在比较前会等待两次捕获结果一致，但像素稳定并不能证明应用已就绪。请记录浏览器、字体、视口和捕获选项：禁用动画、蒙版及样式都可能改变证据。DOM 访问是不同于纯截图控制或 Playwright MCP 的观测接口。

标签：`Browser testing` · `Visual regression` · `DOM`。资料审阅日期：2026-10-18。延伸阅读：[可操作性](https://playwright.dev/docs/actionability) · [截图断言 API](https://playwright.dev/docs/api/class-pageassertions)

</details>

<a id="world"></a>

## 代码世界模型与交互式世界

### 框架

| 资源                                                                                  | 用途与范围                               | 阶段             |
| ----------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/) · 2026 | 代码引擎维护世界，流式扩散则渲染其语义图。               | 编码 / 场景 / 世界模型 |
| [Oasis：Transformer 中的宇宙](https://oasis-model.github.io/) · 2024                     | 神经游戏研究发布，根据先前帧和动作预测 Minecraft 风格画面。 | 编码 / 世界模型      |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)**

NVIDIA Sol-Engine 的 Interactive Coding Worlds 系统采用一个 three.js 赛车游戏。引擎处理地图、物理、碰撞和输入，而两步流式 MiniMax-H3 模型以首帧和提示为条件渲染语义视频。所报告的训练与测试仅覆盖这一个游戏和第三人称视角。语义颜色标识类别，而非各个对象。扩散渲染计时使用八块 GB200 GPU；因果解码器在一块 GB200 上单独测量。独立阶段的计时并不能确立从输入到显示的端到端延迟。运行时源码和权重包已公开，各组件分别适用相应条款。

标签：`hybrid-renderer` · `executable-state` · `streaming` · `three.js` · `MiniMax-H3` · `NVIDIA`。资料审阅日期：2026-10-19。延伸阅读：[Sol-Engine](https://nvlabs.github.io/Sana/Sol-Engine/) · [智能体工作流](https://nvlabs.github.io/Sana/Sol-Engine/docs/agent-workflow/) · [固定版本的运行时源码](https://github.com/NVlabs/Sana/tree/0527465fdcbbf27180a76419a4e73643aa1aac73/models/streamrender_h3) · [权重与组件许可](https://huggingface.co/Efficient-Large-Model/StreamRender-H3)

**[Oasis：Transformer 中的宇宙](https://oasis-model.github.io/)**

Decart 与 Etched 的 Oasis 使用 Transformer 自编码器和潜在扩散。其采用 MIT 许可的推理代码与 500M 检查点是缩小版发布，有别于规模更大的托管演示。Hugging Face 目前要求同意共享联系信息后才能下载权重。公开脚本根据初始帧和动作序列生成视频；它并不能证明已提供完整的实时游戏接口或训练流水线。作者指出，其在长期记忆、精确背包控制、泛化和物体一致性方面存在局限。

标签：`neural-simulator` · `interactive-video` · `transformer` · `Minecraft` · `released-code`。资料审阅日期：2026-10-19。延伸阅读：[推理代码](https://github.com/etched-ai/open-oasis) · [500M 权重、许可与访问](https://huggingface.co/Etched/oasis-500m)

</details>

### 论文

| 资源                                                                       | 用途与范围                           | 阶段                  |
| ------------------------------------------------------------------------ | ------------------------------- | ------------------- |
| [SolarRenderer](https://enderfga.cn/SolarRenderer/) · 2026               | 将引擎或智能体生成的结构视频转化为风格化的最终视觉画面。    | 编码 / 场景 / 世界模型      |
| [Code World Model：以编程智能体作为世界大脑](https://arxiv.org/abs/2608.25927) · 2026 | 编程智能体编写可执行规则与持久状态，驱动视频世界。       | 规划 / 编码 / 世界模型      |
| [Programmable World Model](https://arxiv.org/abs/2609.10540) · 2026      | 显式全局状态和可编程规则保留摄像机视野外的实体。        | 编码 / 测试 / 世界模型      |
| [CoDeR——代码规划，扩散渲染](https://arxiv.org/abs/2609.26458) · 2026              | 协作智能体构建可执行世界，由扩散模型渲染观测。         | 规划 / 编码 / 世界模型      |
| [Magpie：面向交互式游戏的实时世界渲染器](https://arxiv.org/abs/2608.27168) · 2026        | 游戏引擎运行玩法，独立的渲染服务器生成最终视觉画面。      | 编码 / 场景 / 世界模型      |
| [SolarWM](https://arxiv.org/abs/2609.02886) · 2026                       | 面向开放数据、训练和长时域推理的交互式视频世界模型框架。    | 编码 / 场景 / 世界模型      |
| [WorldCoder](https://arxiv.org/abs/2402.12275) · 2024                    | 从环境交互中归纳 Python 世界模型，随后在模型内部规划。 | 规划 / 编码 / 世界模型      |
| [GIF-MCTS / 代码世界模型基准测试](https://arxiv.org/abs/2405.15383) · 2024         | 通过生成、改进和修复树搜索，合成可运行的环境模型。       | 规划 / 编码 / 测试 / 世界模型 |
| [用于通用游戏游玩的代码世界模型](https://arxiv.org/abs/2510.04542) · 2025               | 将自然语言游戏规则编译成可验证的模拟器，用于 MCTS 规划。 | 规划 / 编码 / 测试 / 世界模型 |
| [PoE-World](https://arxiv.org/abs/2505.10819) · 2025                     | 组合小型程序化专家，为随机世界动力学建模。           | 规划 / 编码 / 世界模型      |
| [FactorSim](https://arxiv.org/abs/2409.17652) · 2024                     | 使用因子化状态表示，根据语言生成模拟与任务代码。        | 规划 / 编码 / 测试 / 世界模型 |
| [Genie：生成式交互环境](https://arxiv.org/abs/2402.15391) · 2024                 | 从没有动作标签的视频中学习由潜在动作控制的 2D 世界。    | 世界模型                |
| [GameNGen——扩散模型就是实时游戏引擎](https://arxiv.org/abs/2408.14837) · 2024        | 使用 DOOM 游戏轨迹训练交互式扩散模拟器。         | 测试 / 世界模型           |
| [DIAMOND——用于世界建模的扩散模型](https://arxiv.org/abs/2405.12399) · 2024          | 在保留视觉细节的扩散世界模型内训练强化学习智能体。       | 测试 / 世界模型           |
| [GameFactory](https://arxiv.org/abs/2501.08325) · 2025                   | 将开放域视频生成与键盘、鼠标动作控制相结合。          | 世界模型                |
| [WonderWorld](https://arxiv.org/abs/2406.09394) · 2024                   | 根据单张图像构建可探索、可扩展的显式 3D 场景。       | 资产 / 场景 / 世界模型      |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[SolarRenderer](https://enderfga.cn/SolarRenderer/)**

Few-Step Generative Reference Rendering 以语义图、灰盒、骨架、深度等结构作为 MiniMax-H3 的条件，并可选用首帧和文本。控制 LoRA 和四步 LoRA 包含块因果变体。代码采用 Apache-2.0；权重采用设有地域限制的 MiniMax H3 Community License，数据则按组件分别适用条款，其中部分仅限非商业或研究用途。上游程序必须维护世界状态与规则。仅凭四步采样并不能证明可在消费级硬件上实时交互。

标签：`hybrid-renderer` · `structure-conditioning` · `streaming` · `MiniMax-H3` · `LoRA` · `released-code`。资料审阅日期：2026-10-18。延伸阅读：[代码](https://github.com/Enderfga/SolarRenderer) · [论文 PDF](https://enderfga.cn/data/solarrenderer.pdf) · [权重](https://huggingface.co/Enderfga/SolarRenderer) · [数据与评测](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data) · [使用指南](https://github.com/Junchao-cs/SolarWM/blob/main/docs/solar_renderer.md)

**[Code World Model：以编程智能体作为世界大脑](https://arxiv.org/abs/2608.25927)**

将世界演化与视觉生成分离。智能体维护可执行状态，再将其编译为微调 MiniMax-H3 渲染器的控制输入。已发布的推理接口使用 RGB 首帧锚点、逐帧深度与语义 ID 控制，以及逐窗口提示。推理代码、LoRA 和示例均已公开，但用于生成代理表示的底层游戏代码不能再分发。因此，无法仅凭这些制品原样复现完整的智能体到引擎流水线。

标签：`code-world-model` · `coding-agent` · `executable-state` · `hybrid-renderer` · `MiniMax-H3` · `partial-release`。资料审阅日期：2026-10-18。延伸阅读：[项目](https://buaacyw.github.io/cwm/) · [推理代码](https://github.com/buaacyw/code-world-model) · [复现范围](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)

**[Programmable World Model](https://arxiv.org/abs/2609.10540)**

智能体将指令转化为实体状态和状态转移程序。轻量级引擎维护全局状态，再将带状态的 3D 定向包围盒和相机轨迹编译为视频模型控制输入。论文引入 CombatStateBench，检查实体数量和不可逆状态。公开仓库目前以项目文档为主，这并不能证明完整推理代码和权重已可获取。

标签：`code-world-model` · `executable-state` · `hybrid-renderer` · `persistent-state` · `CombatStateBench`。资料审阅日期：2026-10-18。延伸阅读：[项目与发布进展](https://github.com/AlayaLab/pwm)

**[CoDeR——代码规划，扩散渲染](https://arxiv.org/abs/2609.26458)**

《代码规划，扩散渲染：开放式生成世界建模》采用五个协作角色，将概念转化为规则、代码和观测，使实体可在当前视野之外继续演化。论文研究长期记忆、开放式交互和多智能体世界。其摘要表示将发布代码和权重；应区分所报告的结果与已可获取的制品。

标签：`code-world-model` · `multi-agent` · `hybrid-renderer` · `persistent-state` · `research`。资料审阅日期：2026-10-18。延伸阅读：[项目](https://becauseimbatman0.github.io/CoDeR)

**[Magpie：面向交互式游戏的实时世界渲染器](https://arxiv.org/abs/2608.27168)**

设计师在传统游戏引擎中定义场景与规则。运行时，引擎处理玩家动作并维护状态，渲染服务则将引擎产出的白盒帧转化为最终视觉画面。它展示了生成式渲染与可复现玩法的分工，主要降低原型对完整美术资产的依赖。论文报告了基于分块的交互延迟和仍然存在的视觉一致性局限；它并未证明这是可用于生产的游戏渲染器。

标签：`hybrid-renderer` · `executable-state` · `game-engine` · `render-server` · `research`。资料审阅日期：2026-10-19。延伸阅读：[论文 v1 中的延迟与局限](https://arxiv.org/html/2608.27168v1)

**[SolarWM](https://arxiv.org/abs/2609.02886)**

为相机控制的流式视频统一数据、训练和推理接口。源码矩阵列出了 Wan2.2-5B 和 MiniMax-H3 的全部三个阶段，但 Wan2.2-14B 和 LTX-2.5 的后续阶段仍待推出。各骨干模型需要独立的运行环境。主要数据发布包含标注和索引；潜在表示载荷另行提供，而完整处理后的训练视频语料需要重建或经批准后访问。主要 Hugging Face 数据集和 H3 模型仓库还要求同意共享联系信息。这一基础设施并不提供具有可查询实体状态的代码世界。

标签：`interactive-video` · `training-framework` · `camera-control` · `streaming` · `released-code`。资料审阅日期：2026-10-19。延伸阅读：[代码与文档](https://github.com/Junchao-cs/SolarWM) · [项目](https://junchao-cs.github.io/SolarWM-Web/) · [数据访问](https://huggingface.co/datasets/junchaoh-cs/SolarWM-Data) · [H3 权重与访问](https://huggingface.co/junchaoh-cs/SolarWM-H3-33B)

**[WorldCoder](https://arxiv.org/abs/2402.12275)**

《WorldCoder：基于模型的 LLM 智能体》将世界知识表示为可执行 Python 程序。交互记录约束这些程序，规划则搜索潜在奖励。这项 NeurIPS 2024 工作主要在网格世界和任务规划中评测。它支持规则发现与模型修复研究，而非完整视觉游戏生成。

标签：`code-world-model` · `program-synthesis` · `model-based-planning` · `gridworld` · `NeurIPS-2024`。资料审阅日期：2026-10-18。

**[GIF-MCTS / 代码世界模型基准测试](https://arxiv.org/abs/2405.15383)**

《通过蒙特卡洛树搜索引导大语言模型生成代码世界模型》以 Python 编写转移、奖励和终止逻辑。轨迹与测试反馈引导 GIF-MCTS 搜索。论文还发布了涵盖 18 个强化学习环境的 CWMB，以评估模型正确性和下游规划。这是代码世界模型的基础阅读与评测参考。

标签：`code-world-model` · `program-synthesis` · `MCTS` · `benchmark` · `CWMB` · `NeurIPS-2024`。资料审阅日期：2026-10-18。延伸阅读：[代码与 CWMB](https://github.com/nicoladainese96/code-world-models) · [项目](https://sites.google.com/view/code-world-models/home)

**[用于通用游戏游玩的代码世界模型](https://arxiv.org/abs/2510.04542)**

根据规则和游戏轨迹生成 Python 状态转移、合法动作和终止函数，以及用于规划的启发式价值和隐藏状态推断函数。论文评测了包括棋盘游戏和卡牌游戏在内的 10 个完全或部分可观测游戏。能否避免非法动作取决于合成规则是否正确，因此仍需验证模型。

标签：`code-world-model` · `game-rules` · `MCTS` · `formal-simulator` · `imperfect-information`。资料审阅日期：2026-10-18。

**[PoE-World](https://arxiv.org/abs/2505.10819)**

《利用程序化专家乘积进行组合式世界建模》将 LLM 合成的程序组合成指数加权的专家乘积，从少量观测中学习复杂的随机世界模型。论文在 Pong 和 Montezuma's Revenge 中将这些模型连接到规划器，以展示样本效率和对新关卡的泛化能力。这是程序化动力学建模，而非美术生成工具。

标签：`code-world-model` · `program-synthesis` · `stochastic-dynamics` · `Atari` · `model-based-planning`。资料审阅日期：2026-10-18。延伸阅读：[代码](https://github.com/topwasu/poe-world) · [项目](https://topwasu.github.io/poe-world)

**[FactorSim](https://arxiv.org/abs/2409.17652)**

《基于因子化表示的生成式模拟》使用因子化 POMDP 表示，减少每个生成步骤所需的上下文。它生成用于智能体训练的 2D 游戏模拟。其机器人实验在现有 CLIPort 框架内生成任务代码，包括物体状态和奖励结构。游戏基准测试涵盖八个 Pygame 环境；在这篇 NeurIPS 2024 论文中，3D 游戏生成属于未来工作。机器人实验保留了与 3D 的关联，但不能证明能够生成完整物理引擎。

标签：`code-world-model` · `simulation-generation` · `POMDP` · `benchmark` · `NeurIPS-2024`。资料审阅日期：2026-10-19。延伸阅读：[项目](https://cs.stanford.edu/~sunfanyun/factorsim/) · [论文 v2 的范围](https://arxiv.org/html/2409.17652v2)

**[Genie：生成式交互环境](https://arxiv.org/abs/2402.15391)**

将时空视频分词器、自回归动力学和潜在动作模型结合为生成式交互环境。用户可从图像或草图开始，逐帧探索。这项 ICML 2024 贡献聚焦在没有真实动作标签的情况下学习控制。动力学仍隐含在模型中，没有可编辑或可查询的游戏规则程序。

标签：`interactive-video` · `latent-actions` · `neural-simulator` · `2D-platformer` · `ICML-2024`。资料审阅日期：2026-10-18。

**[GameNGen——扩散模型就是实时游戏引擎](https://arxiv.org/abs/2408.14837)**

强化学习智能体首先收集游戏轨迹。随后，扩散模型根据视觉历史和动作预测下一帧，并使用条件噪声增强来减少自回归误差。论文展示了在单块 TPU 上实时模拟 DOOM。这种面向特定游戏的神经模拟不会自动提供可维护的通用游戏规则或资产流水线。

标签：`neural-simulator` · `interactive-video` · `diffusion` · `DOOM` · `ICLR-2025`。资料审阅日期：2026-10-18。延伸阅读：[项目](https://gamengen.github.io/)

**[DIAMOND——用于世界建模的扩散模型](https://arxiv.org/abs/2405.12399)**

《Atari 中的视觉细节很重要》研究将扩散模型用作环境模型，使智能体从想象轨迹中学习，并分析视觉细节对策略的影响。除 Atari 100k 评测外，论文还利用预录的 CS:GO 游戏过程训练了可玩的神经引擎。它与模拟、控制及预测误差累积问题相关。

标签：`neural-simulator` · `interactive-video` · `diffusion` · `Atari` · `reinforcement-learning` · `NeurIPS-2024`。资料审阅日期：2026-10-18。延伸阅读：[代码与可玩模型](https://diamond-wm.github.io/)

**[GameFactory](https://arxiv.org/abs/2501.08325)**

《通过生成式交互视频创建新游戏》为自回归游戏视频提出领域适配器和动作控制模块。公开 GF-Minecraft 数据集包含动作标签；所检查的仓库提供数据集文档和检测/可视化工具，但无法据此确认已发布训练/推理流水线或模型权重。应将视觉泛化与规则正确性、物品持久性及可导出的游戏项目分别评估。

标签：`interactive-video` · `neural-simulator` · `action-control` · `Minecraft` · `dataset` · `ICCV-2025`。资料审阅日期：2026-10-18。延伸阅读：[数据集工具与文档](https://github.com/KlingAIResearch/GameFactory) · [GF-Minecraft 数据集](https://huggingface.co/datasets/KlingTeam/GameFactory-Dataset)

**[WonderWorld](https://arxiv.org/abs/2406.09394)**

《从单张图像生成交互式 3D 场景》使用 Fast Layered Gaussian Surfels 和引导式深度扩散，在相机移动、提示变化时连接新场景。它提供显式空间表示和实时渲染，主要处理几何与外观。交互玩法、物理和持久动态状态仍需单独实现。

标签：`scene-generation` · `explicit-3d` · `Gaussian-surfels` · `camera-control` · `CVPR-2025`。资料审阅日期：2026-10-18。延伸阅读：[项目](https://kovenyu.com/WonderWorld/)

</details>

### 工具

| 资源                                                                                                      | 用途与范围                            | 阶段             |
| ------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------- |
| [Genie 3 / Project Genie](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) · 2025 | 根据提示生成可实时探索的交互式视频世界。             | 规划 / 世界模型      |
| [World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model) · 2025                            | 生成持久、可导航的 3D 场景，并支持 splat 和网格导出。 | 资产 / 场景 / 世界模型 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Genie 3 / Project Genie](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)**

Google DeepMind 于 2025 年 8 月展示的研究演示报告，可生成 720p、24 FPS 的交互世界，并维持数分钟的一致性。独立的 Project Genie 原型将探索限制为 60 秒；其当前帮助页面要求使用符合条件的个人 Google AI Ultra 账户，年满 18 岁，且位于 Ultra 可用地区。文档说明可下载视频，但这些资料并未证实可下载引擎源码、可导出关卡资产或提供确定性玩法规则。

标签：`interactive-video` · `neural-simulator` · `text-to-world` · `Google-DeepMind` · `hosted`。资料审阅日期：2026-10-19。延伸阅读：[Project Genie 访问条件与限制](https://support.google.com/labs/answer/16875695?hl=en)

**[World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model)**

Marble 支持多模态世界创建，可导出高斯 splat、视觉网格和用于近似物理的碰撞网格，并沿相机路径渲染视频。与纯视频续写相比，它为下游引擎产出空间资产。开发者仍需构建角色行为、任务逻辑和游戏循环。根据所检查的 Web 应用指南，Standard 包含碰撞网格导出，而高质量带纹理 GLB 导出需要 Pro。

标签：`scene-generation` · `explicit-3d` · `Gaussian-splatting` · `mesh-export` · `hosted`。资料审阅日期：2026-10-19。延伸阅读：[产品](https://marble.worldlabs.ai/) · [Web 应用网格导出](https://docs.worldlabs.ai/marble/export/mesh)

</details>

## 延伸阅读与实践

- [智能体：模型、执行框架、技能与 MCP](../ecosystem/agents.md)
- [引擎生态：文档、源码、测试与社区实践](../ecosystem/engines.md)
- [面向 2D 和 3D 的 AI：评测版本、资产流水线与发布边界](../ecosystem/2d-3d-development.md)
- [世界模型：代码状态、混合渲染、视频模拟与显式 3D](../ecosystem/world-models.md)
- [实践指南：任务契约、资产导入、验证与复现](../guides/practical-guide.md)

## 维护

目录内容仅编辑 `data/segments/*.json`。运行 `npm run build` 重新生成列表和网站，运行 `npm run check` 验证数据与生成输出。没有自动抓取或定时更新。代码、权重、数据和服务可能分别适用不同许可；使用前请阅读相关官方条款。外部项目归各自作者所有。
