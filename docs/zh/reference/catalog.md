# Awesome AI 游戏开发

> 选工具前先查它能交回项目什么。

这份目录收录 **121 项资源**，涵盖引擎、资产、编码智能体、制作和研究。每条都有资料审阅日期。按接入说明动手前，先核对来源和发布版本。

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

**举例。** 要换一个带骨骼的角色，先查源文件格式、附带的贴图和动作，以及引擎能否打开导出资产。先展开候选条目的详情看交付项，再试演示。研究游戏智能体时，则先看动作接口和公开的评估产物。世界模型录像能展示渲染器收到特定输入后的结果，场景能否编辑、游戏状态能否读取还要另查。

## 目录

- [1. 代理与引擎连接](#agents) — 21 项资源
- [2. 引擎与渲染](#engines) — 15 项资源
- [3. 2D 美术与精灵](#2d) — 5 项资源
- [4. 3D 资产与动画](#3d) — 16 项资源
- [5. 音频与配音](#audio) — 4 项资源
- [6. 游戏生成与设计](#production) — 18 项资源
- [7. 运行时 AI 与 NPC](#runtime) — 2 项资源
- [8. 测试与质量验证](#testing) — 16 项资源
- [9. 发行与发布](#publishing) — 5 项资源
- [10. 世界模型](#world) — 19 项资源

<a id="agents"></a>

## 代理与引擎连接

### 代理

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli) | 在本地仓库中阅读与修改文件、执行命令、审查代码的通用编程代理。 | 工具与平台 | 需求规划 / 代码开发 / 测试验证 / 发布 |
| [Claude Code](https://code.claude.com/docs/en/overview) | 支持读取项目、修改代码、调用工具，以及技能包、Hooks 和 MCP 的终端与 IDE 编程代理。 | 工具与平台 | 需求规划 / 代码开发 / 测试验证 / 发布 |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Google 开源的终端编程代理，提供文件访问、Shell 工具、扩展和 MCP 支持。 | 工具与平台 | 需求规划 / 代码开发 / 测试验证 |
| [OpenCode](https://opencode.ai/docs/) | 支持多种模型服务、Plan / Build 模式和项目指令的开源编程代理。 | 工具与平台 | 需求规划 / 代码开发 / 测试验证 |
| [Cline](https://github.com/cline/cline) | 支持多模型、Plan / Act 模式、项目规则和 MCP 的开源编程代理。 | 工具与平台 | 需求规划 / 代码开发 / 测试验证 |
| [Aider](https://github.com/Aider-AI/aider) | 围绕仓库地图、Git 改动、静态检查和测试反馈组织工作的终端 AI 配对编程工具。 | 工具与平台 | 代码开发 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli)**

可作为游戏项目的代码迭代主循环：拆解玩法、维护脚本、运行构建并检查失败。连接引擎还需要命令行、编辑器桥接或 MCP 服务；编译通过后仍要检查游戏是否实际可玩。

标签: `CLI` · `General-purpose agent` · `Code review` · `MCP` · `Skills`. 资料审阅日期: 2026-10-18. 延伸阅读: [官方游戏工作流](https://learn.chatgpt.com/use-cases/browser-games)

**[Claude Code](https://code.claude.com/docs/en/overview)**

可用于游戏脚本开发、架构迁移、构建排错，并通过社区 MCP 服务连接 Unity、Godot 或 UE。结合 CLAUDE.md、技能包和编辑器状态使用；单个 MCP 演示不能替代完整引擎流程的验证。

标签: `CLI` · `General-purpose agent` · `MCP` · `Skills` · `Hooks`. 资料审阅日期: 2026-10-18. 延伸阅读: [官方仓库与示例](https://github.com/anthropics/claude-code)

**[Gemini CLI](https://github.com/google-gemini/gemini-cli)**

可帮助理解游戏项目、编辑脚本，并通过 MCP 操作编辑器。官方 README 说明，免费层和 Google One 用户自 2026-06-18 起迁移到 Antigravity CLI，且 Gemini CLI 并未针对最新 Gemini 模型优化。选择入口前应查阅对应账户的迁移说明。

标签: `CLI` · `Google` · `MCP` · `Open source` · `Migration guidance`. 资料审阅日期: 2026-10-18. 延伸阅读: [官方文档](https://geminicli.com/docs/)

**[OpenCode](https://opencode.ai/docs/)**

适合独立选择模型与服务来规划和修改游戏项目。应明确固定 V1 或 V2：V2 迁移指南记录了不兼容的插件与服务端 API、默认允许访问外部目录，以及接受 LSP 配置却不运行 LSP 或返回诊断等差异。按所选版本检查权限、MCP 集成和编译测试反馈；编辑器与玩法观察仍需要其他工具。

标签: `CLI` · `Multiple models` · `Plan / Build` · `Open source` · `AGENTS.md`. 资料审阅日期: 2026-10-18. 延伸阅读: [源码](https://github.com/anomalyco/opencode) · [V1 到 V2 的迁移边界](https://opencode.ai/v2/docs/migrate-v1/)

**[Cline](https://github.com/cline/cline)**

可在 IDE 或 CLI 中审查、修改游戏代码，把构建输出和 MCP 编辑器工具接入反馈循环。用 .clinerules 和技能包记录引擎约定，具体编辑器操作能力取决于桥接服务。

标签: `IDE` · `CLI` · `Multiple models` · `MCP` · `Plan / Act`. 资料审阅日期: 2026-10-18. 延伸阅读: [文档](https://docs.cline.bot/)

**[Aider](https://github.com/Aider-AI/aider)**

适合已有游戏项目的跨文件修改、重构和可测试逻辑开发，支持包括 DeepSeek 在内的模型。搭配视觉模型时可接收用户提供的截图；代码编辑流程不会直接操控 Unity、UE 或 Blender 编辑器，自动截图和游戏交互需要另外接入。

标签: `CLI` · `Git` · `Repository map` · `Multiple models` · `Refactoring`. 资料审阅日期: 2026-10-19. 延伸阅读: [用户文档](https://aider.chat/docs/) · [截图与图像输入](https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/website/docs/usage/images-urls.md#L11-L27)

</details>

### 框架

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [OpenHands Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | 为代理、工具、对话、工作区和服务端接口提供可编程开发框架。 | 工具与平台 | 需求规划 / 代码开发 / 测试验证 |
| [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) | 在 Python 或 TypeScript 应用中嵌入 Claude Code 的工具循环、权限、会话与扩展。 | 工具与平台 | 需求规划 / 代码开发 / 测试验证 |
| [mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent) | 便于修改和检查执行轨迹的最小 Shell 编程代理研究基线。 | 研究与基准 | 代码开发 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[OpenHands Software Agent SDK](https://github.com/OpenHands/software-agent-sdk)**

可把构建、场景检查和测试封装成代理工具。Python SDK 支持本地与远程工作区；所检查的 TypeScript 客户端仍为 alpha，仅支持通过 Agent Server 进行远程对话。固定客户端与服务端版本，避免假设接口一致；游戏专用工具和验收检查需要自行提供。

标签: `SDK` · `Python` · `TypeScript` · `Workspaces` · `Reproducible experiments`. 资料审阅日期: 2026-10-19. 延伸阅读: [SDK 文档](https://docs.openhands.dev/sdk) · [TypeScript 客户端的范围与稳定性](https://github.com/OpenHands/software-agent-sdk/blob/3f3294581ebf40f3bbe5b96aec1d28b7fec96226/clients/typescript/README.md#L1-L19)

**[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)**

在自主管理的进程中运行 Claude Code 二进制与工具循环，通过 Python 或 TypeScript API 配置权限、会话、Hooks 和 MCP。可用于游戏修复与验证服务，但领域工具、评分规则及运行环境需要另外提供。它不同于直接调用模型的 Client SDK；官方概览还规定了 Anthropic 商业条款和独立认证条件。

标签: `SDK` · `Python` · `TypeScript` · `MCP` · `Hooks`. 资料审阅日期: 2026-10-18.

**[mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent)**

可研究模型、提示词和环境对游戏代码生成与修复的影响，也可封装无头引擎命令。最小循环在独立子进程中执行命令，而非持久 Shell，因此每次命令或脚本都要携带工作目录及环境配置。它面向通用软件工程，玩法、视觉和物理需要额外验证。

标签: `Research baseline` · `Shell` · `Harness` · `Traces` · `Open source`. 资料审阅日期: 2026-10-18. 延伸阅读: [前身：SWE-agent](https://github.com/SWE-agent/SWE-agent)

</details>

### 技能包

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Unity-MCP Operator Guide](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md) | MCP for Unity 的操作指南：先检查编辑器状态，再执行、等待编译与域重载，最后核验结果。 | 工具与平台 | 代码开发 / 场景 / 测试验证 |
| [Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) | Unity 维护的项目技能包，为通用编程代理提供引擎专用上下文。 | 工具与平台 | 需求规划 / 代码开发 / 场景 / 测试验证 / 发布 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Unity-MCP Operator Guide](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md)**

以资源查询为起点组织场景操作，继续编辑前检查编译、域重载、工具就绪状态及阻塞原因。脚本修改后检查控制台与截图。它提供 MCP for Unity 的操作流程；具体示例和参数取决于桥接、Unity、UI 与输入系统版本。GameMap 查阅了指南来源，未在此处安装或测试它。

标签: `Unity` · `Skills` · `MCP` · `Compilation feedback` · `Skill source`. 资料审阅日期: 2026-10-18.

**[Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin)**

为 Claude Code、Codex 和 Grok 提供 2D、UI、渲染、导航、物理、多人游戏等技能，并连接 Unity CLI 与 MCP 控制。Unity 要求 6.0 或更新版本。当前 CLI MCP 模式替代了旧 assistant 包中的 MCP，应按所用版本查阅文档。

标签: `Official` · `Agent Skills` · `Unity` · `CLI` · `MCP`. 资料审阅日期: 2026-10-18. 延伸阅读: [技能源码](https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills) · [CLI / MCP 迁移](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli)

</details>

### 文档

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [DeepSeek · Agent Integrations](https://api-docs.deepseek.com/guides/anthropic_api/) | 将 DeepSeek 作为模型后端接入 Claude Code 等代理运行框架的官方指南。 | 技术参考 | 需求规划 / 代码开发 / 测试验证 |
| [AGENTS.md](https://agents.md/) | 用 Markdown 向编程代理说明构建命令、测试规则和项目约定的开放格式。 | 指南与示例 | 需求规划 / 代码开发 / 测试验证 / 发布 |
| [Agent Skills](https://agentskills.io/home) | 把领域流程打包成 SKILL.md 指令、脚本和参考资料的开放格式。 | 指南与示例 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 / 发布 |
| [Windows · UI Automation and Input Semantics](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview) | 通过控件提供的无障碍模式，检查和操作 Windows 桌面编辑器。 | 技术参考 | 代码开发 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[DeepSeek · Agent Integrations](https://api-docs.deepseek.com/guides/anthropic_api/)**

Anthropic API 兼容层把 DeepSeek 接入现有工具循环，文件、测试和引擎连接由宿主框架负责。指南支持普通工具调用，但忽略服务端 mcp_servers 字段，也不支持 MCP 专用内容块。客户端 MCP 工具仍由运行框架提供，API 兼容不等于所有功能完全一致。

标签: `DeepSeek` · `Model backend` · `Harness` · `API compatibility` · `Scope`. 资料审阅日期: 2026-10-18.

**[AGENTS.md](https://agents.md/)**

游戏项目可记录引擎版本、启动命令、目录规则、资产导入约定和验收检查，减少环境配置中的猜测。它是项目指令格式，而不是代理运行时；文件发现和配置方式因客户端而异。

标签: `Project instructions` · `Project conventions` · `Open format` · `Context`. 资料审阅日期: 2026-10-18.

**[Agent Skills](https://agentskills.io/home)**

适合精灵归一化、GLB 导出、场景检查和回归测试等可重复任务，按需加载领域知识。技能包提供流程与资料；引擎控制仍需要相应工具、依赖和兼容客户端。

标签: `Skills` · `Open format` · `Workflows` · `Progressive loading`. 资料审阅日期: 2026-10-18.

**[Windows · UI Automation and Input Semantics](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview)**

需要逐控件探测 provider 支持，不能假定任意游戏编辑器都可访问。UIA 使用物理像素坐标，绝对鼠标输入则使用归一化桌面坐标；边界矩形可能包含被遮挡点，前台激活可能被拒绝，输入插入也不代表应用完成操作。应遵守完整性级别限制。

标签: `Windows` · `Accessibility` · `Native GUI` · `CUA` · `DPI`. 资料审阅日期: 2026-10-19. 延伸阅读: [属性与遮挡](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-automation-element-propids) · [输入与完整性级别限制](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput) · [DPI 坐标](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-screenscaling) · [窗口/显示器捕获与帧生命周期](https://learn.microsoft.com/en-us/windows/apps/develop/media-authoring-processing/screen-capture) · [GameMap：原生 UI 证据边界](https://github.com/OpenEnvision/GameMap/blob/main/docs/production/engine-operations.md#native-gui-automation-is-a-separate-evidence-surface)

</details>

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [OpenHands · Agent Canvas](https://github.com/OpenHands/OpenHands) | 管理本地、远程和云端代理环境的开源开发控制台。 | 工具与平台 | 需求规划 / 代码开发 / 测试验证 / 发布 |
| [MCP for Unity](https://github.com/CoplayDev/unity-mcp) | 将通用编程代理连接到 Unity Editor 的社区 MCP 桥接。 | 工具与平台 | 代码开发 / 美术资产 / 场景 / 测试验证 / 发布 |
| [Godot MCP · Coding-Solo](https://github.com/Coding-Solo/godot-mcp) | 支持启动 Godot、运行项目、读取日志及基础场景操作的社区 MCP 服务。 | 工具与平台 | 代码开发 / 场景 / 测试验证 |
| [MCP for Blender](https://github.com/ahujasid/mcp-for-blender) | 让代理进行建模、材质设置、Python 执行和视觉反馈的 Blender 插件与 MCP 服务。 | 工具与平台 | 代码开发 / 美术资产 / 场景 / 测试验证 |
| [Unreal MCP · chongdashu](https://github.com/chongdashu/unreal-mcp) | 用 Python MCP 服务和 UE C++ 插件连接代理与 Actor、Blueprint、视口控制的社区项目。 | 工具与平台 | 代码开发 / 场景 / 测试验证 |
| [MCP Unity Editor](https://github.com/CoderGamester/mcp-unity) | 用于查询、编辑和测试 Unity 项目的社区 MCP 桥接。 | 工具与平台 | 代码开发 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[OpenHands · Agent Canvas](https://github.com/OpenHands/OpenHands)**

可集中管理游戏项目的多代理任务、工作环境与执行记录。该仓库提供 Agent Canvas 前端和编排入口，核心工具循环及 Agent Server 位于独立 SDK 仓库。游戏自动化仍需配置引擎工具。

标签: `Agent Canvas` · `Environments` · `Multi-agent` · `Open source` · `Orchestration`. 资料审阅日期: 2026-10-18. 延伸阅读: [核心 SDK](https://github.com/OpenHands/software-agent-sdk)

**[MCP for Unity](https://github.com/CoplayDev/unity-mcp)**

提供场景、GameObject、C# 脚本、资产与测试等编辑器操作。安装说明要求 Unity 2021.3 LTS 或更新版本、Python 3.10+ 和 uv，这些是文档声明的要求。项目独立于 Unity Technologies；应固定桥接与编辑器版本，检查编译、截图和 PlayMode 测试。

标签: `Unity` · `MCP` · `Editor bridge` · `Community project` · `C#`. 资料审阅日期: 2026-10-19. 延伸阅读: [安装与工具文档](https://coplaydev.github.io/unity-mcp/) · [固定版本的安装要求](https://github.com/CoplayDev/unity-mcp/blob/aa5fc638d623f56178d50329d9ad8c541a57fe66/website/docs/getting-started/install.md#L13-L17)

**[Godot MCP · Coding-Solo](https://github.com/Coding-Solo/godot-mcp)**

支持执行项目、采集调试输出、创建场景与节点、加载 Sprite2D 纹理及部分 3D MeshLibrary 操作，但不覆盖全部编辑器功能或视觉试玩。所检查版本只保留一个活动项目进程：启动新进程前发出 kill，却不等待旧进程退出；停止操作也仅发送请求。自然退出会清除 get_debug_output 使用的句柄，可靠的崩溃记录需另行归档日志。

标签: `Godot` · `MCP` · `GDScript` · `Runtime logs` · `Scenes`. 资料审阅日期: 2026-10-18. 延伸阅读: [固定版本的实现与生命周期限制](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts#L1053-L1215)

**[MCP for Blender](https://github.com/ahujasid/mcp-for-blender)**

适合通过视口反馈制作 3D 游戏资产和场景原型。该社区桥接原名 blender-mcp，可在 Blender 内执行任意 Python，应仅用于可信任务并保留工程副本。文档区分默认的最小使用遥测与需主动开启的创作内容采集；DISABLE_TELEMETRY=true 可关闭两者。开启内容采集前检查数据条款，另行验证拓扑、比例、UV、碰撞和导出结果。

标签: `Blender` · `MCP` · `Python` · `3D assets` · `Community project`. 资料审阅日期: 2026-10-19. 延伸阅读: [遥测默认设置与控制](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/README.md#L808-L842) · [选择加入的内容与数据条款](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/TERMS_AND_CONDITIONS.md)

**[Unreal MCP · chongdashu](https://github.com/chongdashu/unreal-mcp)**

覆盖 Actor 变换、Blueprint 类与组件、部分节点图和编辑器相机操作。README 要求 Unreal Engine 5.5+、Python 3.12+，并提供 UE5.5 示例。作者将其标为实验项目，不建议用于生产；应固定版本并逐项核验支持的操作，后续版本兼容性需单独确认。

标签: `Unreal Engine` · `MCP` · `Blueprint` · `Experimental` · `Editor bridge`. 资料审阅日期: 2026-10-18. 延伸阅读: [工具文档](https://github.com/chongdashu/unreal-mcp/tree/main/Docs)

**[MCP Unity Editor](https://github.com/CoderGamester/mcp-unity)**

向 MCP 客户端暴露场景、GameObject、组件、Prefab、日志和 Unity Test Runner 等操作。它不同于 Unity 官方插件。README 提醒，进入带域重载的 Play Mode 可能断开桥接，需检查安装版本、测试配置及实际结果；编辑器自动操作并不等于玩法正确。

标签: `Unity` · `MCP` · `Editor automation` · `Community tool`. 资料审阅日期: 2026-10-18.

</details>

<a id="engines"></a>

## 引擎与渲染

### 框架

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) | Three.js 的 React 渲染器，以组件和声明式方式组织 3D 场景。 | 工具与平台 | 需求规划 / 代码开发 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)**

适合结合网页 HUD、应用状态和 3D 场景，并使用 pmndrs 生态进行加载、交互和调试。它不提供全部游戏系统；应匹配 React、Fiber、Three.js 版本，并明确逐帧模拟的职责边界。

标签: `Three.js` · `React` · `R3F` · `pmndrs` · `Declarative scenes`. 资料审阅日期: 2026-10-18. 延伸阅读: [源码](https://github.com/pmndrs/react-three-fiber)

</details>

### 文档

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Godot · Command Line Tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html) | Godot 官方命令行参考，涵盖无头运行、脚本检查、资产导入、执行和导出。 | 技术参考 | 代码开发 / 测试验证 / 发布 |
| [Three.js · Examples](https://threejs.org/examples/) | Three.js 官方可运行图形示例，提供对应 HTML 与 JavaScript 源码。 | 指南与示例 | 代码开发 / 美术资产 / 场景 / 测试验证 |
| [Unreal Engine · Remote Control API](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine) | 通过 HTTP 暴露反射编辑器属性与函数，供外部工具操作 Unreal Engine。 | 技术参考 | 代码开发 / 场景 / 测试验证 |
| [Unity · Addressables Build and Loading APIs](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html) | 从明确配置构建 Addressables 内容，并通过异步句柄加载资产的 Unity API。 | 技术参考 | 美术资产 / 代码开发 / 发布 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Godot · Command Line Tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)**

编程代理可用命令启动项目、读取日志、解析脚本和导出构建，减少对 GUI 的依赖。--check-only 仅解析 --script 指定的脚本，不执行玩法测试。支持的参数随构建类型变化，未知参数会被静默忽略，应检查当前二进制的 --help。无头运行不能替代真实渲染与输入测试。

标签: `Godot` · `CLI` · `Headless` · `Builds` · `Reproducibility`. 资料审阅日期: 2026-10-19.

**[Three.js · Examples](https://threejs.org/examples/)**

为加载器、灯光、材质、动画和渲染技术提供最小参考，可改造成游戏场景。网站与 dev 分支持续变化，应让源码、addons 和运行时处于同一版本，避免混用示例。

标签: `Three.js` · `Official examples` · `Materials` · `Loaders` · `Runnable source`. 资料审阅日期: 2026-10-18. 延伸阅读: [示例源码](https://github.com/mrdoob/three.js/tree/dev/examples)

**[Unreal Engine · Remote Control API](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine)**

Remote Control 是原生引擎接口，不同于社区 MCP 桥接。属性写入可请求编辑器事务及变更通知，但写入被确认不代表包已保存。Epic 的滚动指南将该功能标为 Beta，打包版本和 -game 默认关闭；需启用正确插件、限制网络暴露，并分别确认编辑器与打包运行时权限。

标签: `Unreal Engine` · `HTTP` · `Editor automation` · `State mutation`. 资料审阅日期: 2026-10-18. 延伸阅读: [HTTP API 参考](https://dev.epicgames.com/documentation/en-us/unreal-engine/remote-control-api-http-reference-for-unreal-engine)

**[Unity · Addressables Build and Loading APIs](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html)**

Addressables 1.21 文档区分内容构建与可执行程序构建。构建设置、活动 profile、builder 和内容状态文件都会影响输出。运行时加载要检查句柄状态与结果，并在使用后释放；多个资产共享一个 key 时可能只选中第一个，应保留依赖和缓存来源。

标签: `Unity` · `Addressables` · `Asset dependencies` · `Async loading` · `Content builds`. 资料审阅日期: 2026-10-18. 延伸阅读: [LoadAssetAsync 参考](https://docs.unity3d.com/kr/Packages/com.unity.addressables%401.21/api/UnityEngine.AddressableAssets.Addressables.LoadAssetAsync.html)

</details>

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Godot Engine](https://docs.godotengine.org/en/stable/) | 以场景、玩法脚本和界面组织可运行项目的开源 2D / 3D 游戏引擎。 | 工具与平台 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 / 发布 |
| [Unity](https://docs.unity3d.com/Manual/index.html) | 通过编辑器、C# 脚本、渲染、物理与资产流程构建 2D / 3D 项目的游戏引擎。 | 工具与平台 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 / 发布 |
| [Unreal Engine](https://dev.epicgames.com/documentation/en-us/unreal-engine) | 使用 C++、蓝图、渲染、动画、物理与打包流程创建交互项目的游戏引擎。 | 工具与平台 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 / 发布 |
| [Three.js](https://github.com/mrdoob/three.js) | 面向浏览器的 JavaScript 3D 渲染库，提供场景、相机、材质和资源加载器。 | 工具与平台 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 / 发布 |
| [Phaser](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game) | 使用场景、动画、输入与碰撞系统构建 2D 浏览器游戏的 JavaScript 框架。 | 工具与平台 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 / 发布 |
| [FastNoise Lite](https://github.com/Auburn/FastNoiseLite) | 跨语言的便携噪声库，为程序化地形和材质提供基础输入。 | 工具与平台 | 代码开发 / 美术资产 |
| [DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler) | 通过 dxc 命令行或编译器 API 编译 HLSL 的工具。 | 技术参考 | 代码开发 / 测试验证 / 发布 |
| [GDevelop AI & MCP](https://gdevelop.io/features) | 支持 2D 与 3D 的可视化游戏引擎，内置 AI 助手，并提供连接编程代理的官方 MCP 接口。 | 工具与平台 | 代码开发 / 场景 / 测试验证 / 发布 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Godot Engine](https://docs.godotengine.org/en/stable/)**

官方资料覆盖 GDScript、C#、场景和资源 API，可帮助代理把脚本改动连接到实际运行的场景。固定引擎版本并使用对应文档，stable 与开发分支不能混用。

标签: `Godot` · `GDScript` · `Scenes and nodes` · `Official documentation` · `Open source`. 资料审阅日期: 2026-10-18. 延伸阅读: [引擎源码](https://github.com/godotengine/godot) · [官方示例](https://github.com/godotengine/godot-demo-projects)

**[Unity](https://docs.unity3d.com/Manual/index.html)**

提供具体的 C#、编辑器项目约束，以及 2D / 3D 工作流和版本化包参考。固定 Editor、渲染管线和 Package Manager 的版本组合；仅凭 Unity 名称无法判断 API 或材质兼容性。

标签: `Unity` · `C#` · `Official documentation` · `Editor` · `Package Manager`. 资料审阅日期: 2026-10-18. 延伸阅读: [官方示例源码](https://github.com/Unity-Technologies/2d-techdemos)

**[Unreal Engine](https://dev.epicgames.com/documentation/en-us/unreal-engine)**

为 UE 项目和资产系统提供权威参考，官方示例展示复杂玩法架构。访问 GitHub 引擎源码需要关联 Epic 与 GitHub 账户并完成授权；Epic 还为许可用户提供 Perforce 路径。能获取源码不等于采用开源许可。

标签: `Unreal Engine` · `C++` · `Blueprint` · `Official documentation` · `Authorized source access`. 资料审阅日期: 2026-10-18. 延伸阅读: [源码访问说明](https://dev.epicgames.com/documentation/en-us/unreal-engine/downloading-source-code-in-unreal-engine) · [引擎源码（需授权）](https://github.com/EpicGames/UnrealEngine)

**[Three.js](https://github.com/mrdoob/three.js)**

可直接用 TypeScript 或 JavaScript 制作能在浏览器检查的 3D 原型，并从源码与示例研究 API。游戏循环、物理、导航、存档等系统需要另行设计或集成；WebGL 与 WebGPU 路径应分别验证。

标签: `Three.js` · `JavaScript` · `WebGL` · `WebGPU` · `Rendering library`. 资料审阅日期: 2026-10-18. 延伸阅读: [官方手册](https://threejs.org/manual/) · [官方示例](https://threejs.org/examples/)

**[Phaser](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game)**

适合围绕 preload / create / update 快速搭建可在浏览器验证的核心循环。教程中的静态 Arcade Physics 对象缩放后，需要刷新碰撞体。场景可见后仍要检查输入、重启与生命周期。

标签: `Phaser` · `2D` · `JavaScript` · `Browser games` · `Arcade Physics`. 资料审阅日期: 2026-10-18. 延伸阅读: [框架源码](https://github.com/phaserjs/phaser) · [官方文档](https://docs.phaser.io/)

**[FastNoise Lite](https://github.com/Auburn/FastNoiseLite)**

在 MIT 许可下提供 2D / 3D 采样、分形和域扭曲。它们是生成基础算子；网格生成、侵蚀、持久世界状态和有意义的关卡设计需要其他系统。

标签: `Procedural generation` · `Noise` · `Terrain`. 资料审阅日期: 2026-10-18.

**[DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler)**

编译器调用成功与着色器编译成功是不同结果，应检查返回状态、诊断和所需输出。目标 profile、include 依赖和构建配置都会影响结果。编译后的着色器仍需验证渲染正确性与目标设备兼容性。

标签: `Shaders` · `HLSL` · `Build validation`. 资料审阅日期: 2026-10-18. 延伸阅读: [编译器 API 指南](https://github.com/microsoft/DirectXShaderCompiler/wiki/Using-dxc.exe-and-dxcompiler.dll)

**[GDevelop AI & MCP](https://gdevelop.io/features)**

将功能需求转成可编辑的场景、对象、行为与事件逻辑，再预览游戏，或让代理运行玩法测试。GDevelop 也可导出 Web、移动端与桌面游戏。MCP 连接要求桌面编辑器在同一台电脑上保持运行；事件生成与资产搜索使用在线服务，需要登录。在编辑器中检查并保存改动后，再执行导出。

标签: `GDevelop` · `Visual game editor` · `AI-assisted development` · `MCP`. 资料审阅日期: 2026-11-24. 延伸阅读: [Official MCP setup and workflow](https://wiki.gdevelop.io/gdevelop5/interface/ai/mcp/) · [引擎源码](https://github.com/4ian/GDevelop)

</details>

### 社区

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Epic Developer Community · UE](https://dev.epicgames.com/community/unreal-engine) | Epic 的 UE 社区入口，汇集作者教程、学习资料和版本相关讨论。 | 指南与示例 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Epic Developer Community · UE](https://dev.epicgames.com/community/unreal-engine)**

适合查找官方参考之外的材质、动画、Blueprint 和性能排错经验。查阅社区文章时，可按作者、发布日期、引擎版本和配套项目筛选。

标签: `Unreal Engine` · `Community` · `Tutorials` · `Practical experience` · `Per-source verification`. 资料审阅日期: 2026-10-18.

</details>

### 教程

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Three.js · Instanced Crowd Engineering](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928) · 2026 | 游戏作者在 Three.js 论坛分享的单次绘制群体系统，涵盖实例数据、LOD 和错峰更新。 | 指南与示例 | 代码开发 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Three.js · Instanced Crowd Engineering](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928)**

作者通过可玩演示解释性能技术与视觉取舍。帧率来自作者硬件上的自述，并非跨设备基准；优化后仍需分别测量 GPU、CPU、带宽和视觉质量。

标签: `Three.js` · `Community experience` · `Instancing` · `LOD` · `Performance`. 资料审阅日期: 2026-10-18. 延伸阅读: [社区论坛](https://discourse.threejs.org/)

</details>

<a id="2d"></a>

## 2D 美术与精灵

### 技能包

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge) | 将参考图、生成动画和确定性处理组合成可导出的精灵资产。 | 工具与平台 | 美术资产 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge)**

从已确认的参考图生成动作片段，再进行去背景、对齐、循环选段、时序修正和图集打包，支持 Godot、Aseprite 与网页导出。0.4.0 的 README 仅报告解析层往返检查，未验证 Godot、LDtk 或 Aseprite 编辑器导入，仍需实际导入和视觉验收。

标签: `Agent Skill` · `Sprite pipeline` · `Animation` · `Asset QA`. 资料审阅日期: 2026-10-18.

</details>

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [PixelLab AI Agent Toolkit](https://www.pixellab.ai/mcp) | 通过 API 和 MCP 生成像素角色、动画及无缝瓦片集的资产工具。 | 工具与平台 | 美术资产 / 场景 |
| [Scenario](https://www.scenario.com/) | 用定制风格模型与批量生成，构建一致的游戏美术流程。 | 工具与平台 | 美术资产 / 场景 |
| [OpenAI Image Generation](https://developers.openai.com/api/docs/guides/image-generation) | 使用图像端点或对话式图像工具，生成与编辑栅格美术。 | 工具与平台 | 美术资产 |
| [MSDF Atlas Generator](https://github.com/Chlumsky/msdf-atlas-gen) | 从字体生成距离场图集的命令行与库工具。 | 技术参考 | 美术资产 / 发布 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[PixelLab AI Agent Toolkit](https://www.pixellab.ai/mcp)**

根据角色描述、朝向、动作与地形条件生成像素资产，包括四向、八向角色，以及侧视或俯视瓦片集。它是商业资产服务；MCP 连接资产工具与编程代理，游戏规则、碰撞和资产导入仍需项目流程实现。

标签: `Pixel art` · `Sprite` · `Tileset` · `MCP` · `Commercial service`. 资料审阅日期: 2026-10-18. 延伸阅读: [文档](https://www.pixellab.ai/docs)

**[Scenario](https://www.scenario.com/)**

提供托管的图像、视频、3D、音频生成、自定义模型训练、REST API 及官方 beta MCP 接口。提交前检查每个模型的 schema；MCP model_run 可能返回未完成任务而非资产，文档中的 job_cancel 不能取消 model_run 或 workflow_run 创建的任务。公开集成示例不包含完整托管服务或完整游戏。

标签: `Art direction` · `Style consistency` · `Character consistency` · `Batch assets` · `Commercial service`. 资料审阅日期: 2026-10-18. 延伸阅读: [API 文档](https://docs.scenario.com/) · [官方 beta MCP 操作](https://mcp.scenario.com/docs/tools/model-run) · [作业取消范围](https://mcp.scenario.com/docs/tools/job-cancel)

- **演示 · 交互式:** [资产生成应用](https://app.scenario.com/). 需要账户的托管创意工具；这是资产工作区，而非可玩游戏。
- **源码 · SDK:** [Unity 集成源码](https://github.com/scenario-labs/Scenario-Unity). 公开 Unity 集成插件；不包含托管模型源码和完整游戏项目。
- **教程 · 教程:** [一致的游戏资产流水线](https://docs.scenario.com/get-started/documentation/integrating-with-applications-real-world-scenarios#1-game-asset-pipeline--batch-generation-with-style-consistency). 官方操作指南，介绍自定义风格训练、批量生成与资产交付。

**[OpenAI Image Generation](https://developers.openai.com/api/docs/guides/image-generation)**

通过 Images API 或多轮 Responses 流程生成和修改图像，保存输出字节及请求设置。蒙版用于引导编辑，不保证精确边界；精灵一致性和无缝纹理需要单独检查。技术指南本身不确立输出使用权或重试计费条件。

标签: `asset-generation`. 资料审阅日期: 2026-10-18.

**[MSDF Atlas Generator](https://github.com/Chlumsky/msdf-atlas-gen)**

输出字形纹理与排版元数据，未覆盖时默认字符集为 ASCII，因此多语言字形范围需要明确指定。图集颜色通道应按线性数据采样，而非 sRGB；字体许可独立于工具许可。

标签: `Fonts` · `MSDF` · `UI`. 资料审阅日期: 2026-10-18.

</details>

<a id="3d"></a>

## 3D 资产与动画

### 框架

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Infinigen](https://github.com/princeton-vl/infinigen) · 2023 | 程序化生成自然与室内 Blender 场景，以及配套合成数据。 | 工具与平台 | 美术资产 / 场景 / 测试验证 |
| [Holodeck](https://github.com/allenai/Holodeck) · 2023 | 根据文本布置带家具、可交互的 3D 室内环境。 | 研究与基准 | 需求规划 / 场景 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Infinigen](https://github.com/princeton-vl/infinigen)**

由随机种子、参数和资产生成器产生几何、材质、场景及标注，并提供 OBJ、OpenUSD 等导出文档。它是程序化系统，而非语言模型，可为 AI 开发流程提供可控场景与数据；实时游戏还需要优化、碰撞和玩法集成。

标签: `Procedural generation` · `Blender` · `Synthetic data` · `Scenes`. 资料审阅日期: 2026-10-18. 延伸阅读: [项目与论文](https://infinigen.org/)

**[Holodeck](https://github.com/allenai/Holodeck)**

结合语言规划、资产检索与空间约束，将房间需求转成 AI2-THOR 场景，并提供 Unity 加载说明。评估主要面向具身 AI 环境生成，可借鉴布局与语义交互方法，但不能直接视为完整游戏关卡设计或商业发布方案。

标签: `Text-to-scene` · `AI2-THOR` · `Spatial constraints` · `Embodied environments`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2312.09067)

</details>

### 技能包

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Godot MCP 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets) | 用 Godot 几何与验证流程构建可复用的风格化 3D 资产。 | 工具与平台 | 美术资产 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Godot MCP 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets)**

接收项目风格和资产需求，通过 Godot MCP 与确定性构建器生成 PackedScene，检查落地、碰撞、导航和截图。面向 Codex 与 Claude Code，可复用项目已有资源；需要兼容的 MCP 能力，不是图像转网格生成模型。

标签: `Godot` · `Agent Skill` · `PackedScene` · `Asset QA`. 资料审阅日期: 2026-10-18.

</details>

### 论文

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Video2Game](https://github.com/video2game/video2game) · 2024 | 把真实世界视频重建成可在浏览器交互的 3D 环境。 | 研究与基准 | 美术资产 / 场景 / 世界模型 |
| [BlenderLLM / BlendNet / CADBench](https://github.com/FreedomIntelligence/BlenderLLM) · 2024 | 研究文本到 Blender 脚本的系统，配有训练数据与建模基准。 | 研究与基准 | 美术资产 / 测试验证 |
| [WonderWorld](https://arxiv.org/abs/2406.09394) · 2024 | 从单张图像构建可探索、可继续扩展的显式 3D 场景。 | 研究与基准 | 美术资产 / 场景 / 世界模型 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Video2Game](https://github.com/video2game/video2game)**

视频与相机信息经过重建、网格提取、外观烘焙和碰撞生成，进入 three.js 游戏环境。文档中的 UE 路线建议完全漫反射的烘焙网格，将烘焙高光维度设为零。它采用显式环境重建，仍有手工场景设置与物理集成，与预测下一帧的交互视频世界模型不同。

标签: `Video-to-3D` · `Reconstruction` · `Three.js` · `Collision`. 资料审阅日期: 2026-10-19. 延伸阅读: [论文](https://arxiv.org/abs/2404.09833) · [固定版本的引擎交接建议](https://github.com/video2game/video2game/blob/7bcf8ae754240b9fd2de75a154eb73c75a146b79/readme.md#L256-L273)

**[BlenderLLM / BlendNet / CADBench](https://github.com/FreedomIntelligence/BlenderLLM)**

BlenderLLM 从用户指令生成 bpy 建模脚本。仓库与公开数据文档记录约 12K 组 BlendNet 配对，CADBench 包含合成与论坛任务。评估集中在基础 CAD 风格建模和指令遵循；README 说明高级材质、多模态输入与多轮协作的限制，它不是游戏创作基准。

标签: `Text-to-bpy` · `CADBench` · `Dataset` · `Modeling benchmark`. 资料审阅日期: 2026-10-19. 延伸阅读: [论文](https://arxiv.org/abs/2412.14203) · [BlendNet 数据集](https://huggingface.co/datasets/FreedomIntelligence/BlendNet) · [CADBench](https://huggingface.co/datasets/FreedomIntelligence/CADBench) · [固定版本的发布数据集说明](https://github.com/FreedomIntelligence/BlenderLLM/blob/f778bfd6992ddd675f7615d0eaf965a8576f2879/README.md#L44-L50)

**[WonderWorld](https://arxiv.org/abs/2406.09394)**

利用 Fast Layered Gaussian Surfels 与引导式深度扩散，随相机移动和提示词变化连接新场景，提供显式空间表示与实时渲染，主要解决几何和外观问题。玩法交互、物理和持久动态状态仍需要另外实现。

标签: `scene-generation` · `explicit-3d` · `Gaussian-surfels` · `camera-control` · `CVPR-2025`. 资料审阅日期: 2026-10-18. 延伸阅读: [项目](https://kovenyu.com/WonderWorld/)

</details>

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Blender](https://github.com/blender/blender) | 用于建模、材质、绑定、动画、模拟和渲染的开源 3D 创作套件。 | 工具与平台 | 美术资产 / 场景 / 测试验证 |
| [Khronos · glTF-Blender-IO](https://github.com/KhronosGroup/glTF-Blender-IO) | Khronos 官方 Blender glTF 2.0 导入与导出源码，包含验证及往返测试。 | 工具与平台 | 美术资产 / 场景 / 测试验证 / 发布 |
| [Hunyuan3D 2.0](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) · 2025 | 从参考图生成几何与纹理，为 3D 资产流程提供输入。 | 工具与平台 | 美术资产 |
| [TRELLIS](https://github.com/microsoft/TRELLIS) · 2024 | 通过结构化潜在表示，生成网格、高斯和辐射场等 3D 输出。 | 工具与平台 | 美术资产 |
| [TripoSR](https://github.com/VAST-AI-Research/TripoSR) · 2024 | 从单张图像快速重建 3D 物体，适合资产原型制作。 | 工具与平台 | 美术资产 |
| [Meshy API](https://docs.meshy.ai/en) | 将 AI 模型生成、人形绑定和动画导出接入游戏资产流程的 API。 | 工具与平台 | 美术资产 / 场景 |
| [HY-Motion 1.0](https://github.com/Tencent-Hunyuan/HY-Motion-1.0) · 2025 | 从文本生成人形骨骼动作，公开推理代码与模型权重。 | 工具与平台 | 美术资产 |
| [Tripo Model Generation API](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html) | 按版本提供文生模型能力，分别控制几何和纹理随机种子。 | 工具与平台 | 美术资产 |
| [Adobe Mixamo](https://www.mixamo.com/) | 为人形角色自动绑定骨骼，并将动作库中的动画适配到模型，接入游戏资产制作流程。 | 工具与平台 | 美术资产 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Blender](https://github.com/blender/blender)**

主要用于游戏资产与场景制作，可让代理生成 Python 脚本执行重复任务。Blender 不是游戏运行时引擎；导入 Unity、UE、Godot 或浏览器后，仍要检查比例、坐标、材质、骨骼和动画。

标签: `Blender` · `DCC` · `3D assets` · `Animation` · `Open source`. 资料审阅日期: 2026-10-18. 延伸阅读: [官方主仓库](https://projects.blender.org/blender/blender) · [参考手册](https://docs.blender.org/manual/en/latest/) · [Python API](https://docs.blender.org/api/current/)

**[Khronos · glTF-Blender-IO](https://github.com/KhronosGroup/glTF-Blender-IO)**

连接 Blender 资产制作与游戏运行时，帮助排查材质、网格和动画转换问题。插件发布分支应匹配 Blender 版本，main 可能面向尚未发布的版本。仓库 CI 会验证导出并比较导入导出往返结果；格式合法的文件仍可能在目标引擎呈现不同效果，需检查实际导入。

标签: `Blender` · `glTF` · `GLB` · `Asset pipeline` · `Roundtrip validation`. 资料审阅日期: 2026-10-19. 延伸阅读: [技术说明](https://github.com/KhronosGroup/glTF-Blender-IO/blob/main/Technical.md) · [GameMap：资产有效性与运行时保真度](https://github.com/OpenEnvision/GameMap/blob/main/docs/assets/validation.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity)

**[Hunyuan3D 2.0](https://github.com/Tencent-Hunyuan/Hunyuan3D-2)**

2.0 流程用 Hunyuan3D-DiT 生成形状，再用 Hunyuan3D-Paint 生成网格纹理，支持 GLB、OBJ 导出和 Blender 插件，采用腾讯混元 3D 2.0 专用社区许可。独立的 2.1 版本增加 PBR 纹理流程和训练代码。拓扑、LOD、绑定、碰撞、运行性能及各版本条款仍需按游戏流程核查。

标签: `Image-to-3D` · `Mesh` · `Textures` · `Blender`. 资料审阅日期: 2026-10-18. 延伸阅读: [2.0 论文](https://arxiv.org/abs/2501.12202) · [2.1 仓库](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1) · [2.0 许可](https://github.com/Tencent-Hunyuan/Hunyuan3D-2/blob/main/LICENSE)

**[TRELLIS](https://github.com/microsoft/TRELLIS)**

将图像或文本输入解码为多种 3D 表示，官方示例支持带纹理 GLB 导出与简化。传统游戏资产流程主要使用网格分支，高斯与辐射场输出本身不包含可用的碰撞、动画或玩法逻辑。

标签: `Image-to-3D` · `Text-to-3D` · `GLB` · `Structured Latents`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2412.01506)

**[TripoSR](https://github.com/VAST-AI-Research/TripoSR)**

使用 LRM 风格的前馈重建，公开代码、预训练模型与演示，将图像转为可导出的物体网格。重点是单个物体，隐藏表面、拓扑和游戏性能需后续处理，不是完整场景或可玩游戏生成器。

标签: `Image-to-3D` · `Reconstruction` · `Mesh` · `Prototype assets`. 资料审阅日期: 2026-10-18.

**[Meshy API](https://docs.meshy.ai/en)**

官方动画角色流程把参考图转成带纹理、骨骼和待机、跳跃、攻击片段的角色，输出 GLB 和 FBX；动画阶段使用 Meshy 动作库。API 绑定更适合肢体清晰分离的标准带纹理双足角色。生成资产仍需引擎导入、碰撞、控制与性能检查；公开 cookbook 提供的是资产示例，而非完整玩法。

标签: `Image-to-3D` · `Rigging` · `Character animation` · `GLB` · `FBX` · `Commercial service`. 资料审阅日期: 2026-10-18. 延伸阅读: [绑定要求](https://docs.meshy.ai/en/api/rigging)

- **演示 · 交互式:** [3D 资产工作区](https://www.meshy.ai/workspace). 托管的生成与动画工作区；生成资产需要账户访问权限。这不是可玩游戏。
- **源码 · 示例:** [Cookbook 示例源码](https://github.com/meshy-dev/meshy-cookbook). 公开的资产生成配方，不是 Meshy 模型源码或完整游戏项目。
- **教程 · 教程:** [从图像到动画角色](https://www.meshy.ai/developers/cookbook/recipes/animate-3d-character/). 官方指南，含参考文件、Python 和 TypeScript 示例及 GLB/FBX 输出。API 访问消耗积分。

**[HY-Motion 1.0](https://github.com/Tencent-Hunyuan/HY-Motion-1.0)**

腾讯文生动作模型提供 CLI 推理、本地 Gradio 可视化和托管演示，输出可作为动画流程输入并重定向到目标角色。文档列出非人形动作、多角色交互、无缝循环和原地动画等限制；发布内容不是可控制角色或完整游戏。专用许可排除欧盟、英国和韩国，并限制利用作品或输出改进 HY-Motion 及其衍生之外的 AI 模型。采用前检查完整条款与商业使用门槛。

标签: `Text-to-motion` · `Skeletal animation` · `Humanoid` · `Model weights` · `Local inference`. 资料审阅日期: 2026-10-18. 延伸阅读: [官方项目](https://hunyuan.tencent.com/motion) · [模型权重](https://huggingface.co/tencent/HY-Motion-1.0) · [HY-Motion 社区许可](https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/License.txt)

- **演示 · 交互式:** [交互式动作演示](https://huggingface.co/spaces/tencent/HY-Motion-1.0). 官方文本转动作模型界面；是动作预览，而非可玩玩法。托管服务的可用性可能变化。
- **源码 · 模型:** [动作实现源码](https://github.com/Tencent-Hunyuan/HY-Motion-1.0). 公开的推理与可视化实现，权重通过独立链接提供；不含完整游戏项目。
- **教程 · 教程:** [安装与动作工作流](https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/README.md). 官方设置、CLI 推理、本地 UI 和提示编写指南。本地执行需要文档所述 GPU 资源。

**[Tripo Model Generation API](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html)**

H3 文生模型请求 v3.1-20260211 与 v3.0-20250812 提供独立几何、纹理种子及 PBR 控制。保存 model_version 与任务 ID，使用提交请求的 API Key 查询，并及时下载成功输出：文件 URL 默认五分钟过期。复杂输入可能导致低多边形生成失败；跨版本复现、输出权利、取消端点和重试费用仍需确认。

标签: `asset-generation`. 资料审阅日期: 2026-10-19. 延伸阅读: [Tripo 任务结果](https://docs.tripo3d.ai/task-query/get-your-task-result.html)

**[Adobe Mixamo](https://www.mixamo.com/)**

上传干净的角色网格，设置人形骨架并选择动作片段，再下载带骨骼的角色与动画，接入引擎资产管线。自动绑定与动画库面向双足人形角色；特殊比例或额外肢体可能导致失败。需要 Adobe ID，官方常见问题说明不向国家代码为中国的账户提供服务。Mixamo 仅保留最后使用的角色，需将结果保存在本地。

标签: `Character rigging` · `Skeletal animation` · `Humanoid` · `Animation library`. 资料审阅日期: 2026-11-24. 延伸阅读: [Official requirements and account restrictions](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)

</details>

### 教程

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Blender Python · API Quickstart](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst) | Blender 官方 Python API 入门，介绍 bpy 数据、上下文、操作器和 Python 操作。 | 指南与示例 | 代码开发 / 美术资产 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Blender Python · API Quickstart](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst)**

重点区分直接访问数据与依赖当前模式、选择和视口的操作。bpy.ops 的 poll 检查可能因上下文不符而失败；资产脚本应读取实际状态并核验输出，不能只检查语法。

标签: `Blender` · `Python` · `bpy` · `Context` · `Automation`. 资料审阅日期: 2026-10-18. 延伸阅读: [API 文档](https://docs.blender.org/api/current/)

</details>

<a id="audio"></a>

## 音频与配音

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [ElevenLabs Sound Effects](https://elevenlabs.io/docs/overview/capabilities/sound-effects) | 通过网页或 API，从文本生成游戏音效、拟音与循环环境声。 | 工具与平台 | 美术资产 |
| [Stable Audio Open 1.0](https://huggingface.co/stabilityai/stable-audio-open-1.0) · 2024 | 提供可下载的文生音频权重与本地工具，面向音效和现场录音。 | 工具与平台 | 美术资产 |
| [ElevenLabs Music](https://elevenlabs.io/docs/overview/capabilities/music) | 支持编曲计划、参考音频和分段编辑的提示式音乐生成。 | 工具与平台 | 美术资产 |
| [ElevenLabs Speech Generation](https://elevenlabs.io/docs/api-reference/text-to-speech/convert) | 按指定音色合成语音，支持发音词典和相邻请求上下文衔接。 | 工具与平台 | 美术资产 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[ElevenLabs Sound Effects](https://elevenlabs.io/docs/overview/capabilities/sound-effects)**

描述脚步、撞击、UI 反馈或环境声，设置时长后导出音频。文档支持循环生成，单段最长 30 秒；概览列出所有音效可用 MP3，非循环音效可用 48 kHz WAV，API 格式与账户方案需另查。循环质量应在目标游戏中检查。公开 SDK 只连接托管 API，不包含生成模型或完整游戏。

标签: `Sound effects` · `Foley` · `Ambience` · `Audio loops` · `API` · `Commercial service`. 资料审阅日期: 2026-10-19. 延伸阅读: [产品操作指南](https://elevenlabs.io/docs/eleven-creative/playground/sound-effects) · [Sound Effects API 参考](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert)

- **演示 · 交互式:** [音效生成器](https://elevenlabs.io/sound-effects). 官方文本转音频生成器及声音示例；这是音频工具，而非可玩游戏。
- **源码 · SDK:** [官方 Python SDK](https://github.com/elevenlabs/elevenlabs-python). 仅提供 API 客户端源码；不包含生成模型和完整游戏源码。
- **教程 · 教程:** [Sound Effects 快速入门](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/sound-effects). 含 SDK 示例的官方 API 操作指南；生成需要账户和 API 密钥。

**[Stable Audio Open 1.0](https://huggingface.co/stabilityai/stable-audio-open-1.0)**

可生成最长 47 秒、44.1 kHz 的立体声音频，提供本地推理与 WAV 导出示例，官方 audio-tools 含本地 Gradio 界面。模型更适合英文描述、音效和现场录音，不擅长音乐，也无法生成真实人声。获取模型需接受条款并向发布者分享联系信息；它是音频流程，而非完整配乐或游戏生成器。

标签: `Text-to-audio` · `Sound effects` · `Field recordings` · `Model weights` · `Local inference`. 资料审阅日期: 2026-10-19. 延伸阅读: [本地演示设置](https://github.com/Stability-AI/stable-audio-tools#interface) · [研究论文](https://arxiv.org/abs/2407.14358) · [Stable Audio Open 模型许可](https://huggingface.co/stabilityai/stable-audio-open-1.0/blob/main/LICENSE.md)

- **演示 · 本地工具:** [本地音频演示设置](https://github.com/Stability-AI/stable-audio-tools#interface). 下载并在本地运行官方 Gradio 音频界面；此链接是设置指南，不是托管的可玩游戏。
- **源码 · 流水线源码:** [音频工具源码](https://github.com/Stability-AI/stable-audio-tools). 采用 MIT 许可的训练和推理代码；Stable Audio Open 1.0 权重另设访问门槛，并受模型的社区许可约束。不含完整游戏项目。
- **教程 · 教程:** [本地推理与 WAV 导出](https://huggingface.co/stabilityai/stable-audio-open-1.0#usage). 面向 stable-audio-tools 和 Diffusers 的官方模型使用示例。

**[ElevenLabs Music](https://elevenlabs.io/docs/overview/capabilities/music)**

可按编曲计划与参考资料生成音乐并修改片段。音乐专用条款区分 Indie 与 Studio 游戏用途，付费 API 访问并不覆盖所有游戏发布。2026 年 10 月使用政策限制未经明确许可的 AI 开发与训练数据集用途；还需审查参考音频权利和方案资格。

标签: `audio-generation`. 资料审阅日期: 2026-10-18. 延伸阅读: [ElevenLabs Music 条款](https://elevenlabs.io/music-terms) · [禁止使用政策（2026 年 10 月）](https://elevenlabs.io/use-policy)

**[ElevenLabs Speech Generation](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)**

语音端点接受版本化发音词典，以及前后文本或请求上下文。零保留模式仅面向企业，并关闭基于历史的连续性功能，需确认模型兼容性。2026 年 10 月政策限制 AI 开发与训练数据集用途，并要求面向 18 岁以下用户的产品取得批准；这些条件不同于普通输出商业权利和免费方案限制。

标签: `speech-generation` · `audio-generation`. 资料审阅日期: 2026-10-18. 延伸阅读: [禁止使用政策（2026 年 10 月）](https://elevenlabs.io/use-policy) · [非欧洲经济区通用条款（2026 年 10 月）](https://elevenlabs.io/terms-of-use)

</details>

<a id="production"></a>

## 游戏生成与设计

### 代理

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [OpenGame](https://github.com/leigest519/OpenGame) · 2026 | 使用可复用模板与调试技能生成浏览器游戏项目。 | 工具与平台 | 需求规划 / 代码开发 / 美术资产 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[OpenGame](https://github.com/leigest519/OpenGame)**

通过 Template Skill 和 Debug Skill 将自然语言需求转成 Canvas、Phaser、three.js 等网页项目。公开 CLI 支持 OpenAI 兼容模型端点，论文另介绍 GameCoder-27B。浏览器执行与视觉评判检查构建、可用性和意图对齐；README 将独立评估流程列为后续发布内容。

标签: `Browser games` · `Game Skill` · `Browser feedback` · `GameCoder-27B`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2604.18394)

</details>

### 框架

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [GAVEL](https://github.com/gdrtodd/gavel) · 2024 | 结合语言模型与质量多样性搜索，生成棋盘游戏规则。 | 研究与基准 | 需求规划 / 代码开发 / 测试验证 |
| [Cardiverse](https://github.com/danruili/Cardiverse) · 2025 | 把卡牌游戏设计、Python 规则代码和试玩连接起来的原型流程。 | 研究与基准 | 需求规划 / 代码开发 / 测试验证 |
| [3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A) · 2026 | 通过技能包、模型流程和引擎适配器，协调游戏资产、玩法与 UI 制作。 | 工具与平台 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 |
| [AutoUE](https://github.com/Pluto156/AutoUE) · 2026 | 协调代理构建 Unreal 场景、玩法代码、交互与试玩的研究流程。 | 研究与基准 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 |
| [UniGen](https://github.com/yxwan123/UniGen) · 2025 | 规划 Unity 原型、生成脚本、组装场景，并支持迭代调试的多代理流程。 | 研究与基准 | 需求规划 / 代码开发 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GAVEL](https://github.com/gdrtodd/gavel)**

以 Ludii 游戏描述代码为表示，由语言模型变异和重组规则，再通过模拟与搜索筛选游戏。代码、实验及相关模型和数据参考均有公开内容。输出限定在规则系统内的棋盘游戏，不能据此推断通用 2D 动作游戏开发能力。

标签: `Game design` · `Ludii` · `Evolutionary search` · `Rule generation`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2407.09388)

**[Cardiverse](https://github.com/danruili/Cardiverse)**

通过机制图与检索，从卡牌描述生成变体和代码，再用生成的对局记录迭代检查规则一致性。仓库也包含玩法 AI 竞技场，但开发贡献主要是规则与代码原型。公开替代规则说明与论文原始输入不同，复现时应注意。

标签: `Card games` · `Mechanism graphs` · `Code generation` · `Self-play validation`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2502.07128)

**[3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A)**

编程代理将需求分流到图像、3D、动作、音频等流程，产出资产与引擎原生代码，提供 UE5、Unity、Godot、Blender 和 three.js 的相关上下文。演示混合使用生成与已有资源，名称中的 3A 并非经过验证的商业质量评级。它与可灵的 GameFactory 视频世界模型是不同项目。

标签: `Agent Skills` · `Asset pipelines` · `Multiple engines` · `Game generation`. 资料审阅日期: 2026-10-18. 延伸阅读: [中文文档](https://github.com/OpenDCAI/GameFactory-3A/blob/main/README_zh.md)

**[AutoUE](https://github.com/Pluto156/AutoUE)**

从游戏描述生成 UE 场景与 C++ 玩法，公开实现包含配置说明、演示视频，以及生成游戏与资产的数据集链接。复现需要 Unreal 集成和外部模型服务，演示视频不是托管试玩。固定版本评估调度器的静态代码显示，移动命令被跳过、交互处理器被直接调用，因此脚本路径完成并不能证明玩家成功导航。

标签: `Unreal Engine` · `Game generation` · `Multi-agent` · `Research prototype`. 资料审阅日期: 2026-10-19. 延伸阅读: [论文](https://arxiv.org/abs/2603.07106) · [生成游戏与资产数据集](https://huggingface.co/datasets/Pluto156/AutoUE_DataSet) · [固定版本的评测分派器](https://github.com/Pluto156/AutoUE/blob/8686a4d51c19813f2b3368bd73f685a940db7531/PCGGen_UE/Plugins/LLMEditor/Source/LLMEditor/Private/Core/EvaluateExecutor/EvaluateExecutor.cpp#L174-L186)

- **演示 · 视频:** [游戏生成视频](https://github.com/Pluto156/AutoUE/blob/main/assets/show.mp4). 生成的 Unreal 游戏的录制演示；未验证存在可在浏览器游玩的公开构建。
- **源码 · 流水线源码:** [流水线源码](https://github.com/Pluto156/AutoUE). 公开的框架实现；引擎设置、模型服务和数据集资产仍是独立要求。
- **教程 · 教程:** [设置与使用](https://github.com/Pluto156/AutoUE#setup-and-usage). 作者提供的依赖、服务凭据及运行 Unreal 生成流水线的说明。

**[UniGen](https://github.com/yxwan123/UniGen)**

研究从自然语言创建 Unity 游戏，仓库公开 Python 流程、模型连接器、安装指南与演示录像。需要 Unity 和模型服务账户。公开流程代码不等于可直接试玩的托管版本，基准游戏的完整可下载版本仍需确认。

标签: `Unity` · `Game generation` · `Scene assembly` · `Research prototype`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2509.26161)

- **演示 · 视频:** [Unity 生成视频](https://www.youtube.com/watch?v=xyJjFfnxUx0). 作者链接的演示视频，不是可在浏览器游玩的游戏。
- **源码 · 流水线源码:** [流水线源码](https://github.com/yxwan123/UniGen). 已发布的生成器实现和提示词；这不是所有基准测试游戏的完整发布。
- **教程 · 教程:** [安装与使用](https://github.com/yxwan123/UniGen#-installation). README 涵盖先决条件和本地 Unity 生成工作流；运行前请审查路径与项目设置。

</details>

### 技能包

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [The Level Design Book · 社区关卡设计 Skill](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design) · 2026 | 基于 The Level Design Book 的非官方通用技能包，覆盖关卡简报、灰盒、遭遇、引导和基于试玩记录的评审。 | 工具与平台 | 需求规划 / 场景 / 测试验证 / 发布 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[The Level Design Book · 社区关卡设计 Skill](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design)**

英文包包含任务分流、十三份主题与来源参考，以及三份可复用模板，主要面向 3D 关卡；用于 2D 时需明确调整的假设。包内记录 2026-10-16 快照，自述覆盖 94 项来源索引并包含未完成部分，不能当作独立运行或设计质量验证。原始写作署名 Robert Yang 与包括 Andrew Yoder 在内的贡献者，属于社区改编，而非官方书籍版本或 pi 维护者发布。采用 CC BY-NC-SA 4.0，需保留署名和改动声明、遵守非商业及相同方式共享条件，并检查第三方例外；这些条款不会自动授权每个游戏输出。

标签: `level-design` · `skill` · `blockout` · `playtesting` · `agent-neutral` · `CC-BY-NC-SA-4.0` · `noncommercial` · `unofficial-adaptation`. 资料审阅日期: 2026-10-18. 延伸阅读: [The Level Design Book](https://book.leveldesignbook.com/) · [原作者与贡献者](https://book.leveldesignbook.com/appendix/about) · [图书许可与第三方例外](https://book.leveldesignbook.com/appendix/license) · [CC BY-NC-SA 4.0 法律文本](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode)

- **演示 · 不可用:** 提供说明与模板，而非可运行演示. 未提供引擎插件、可执行关卡、基准测试结果或经过验证的游玩测试。
- **源码 · 完整源码:** [完整技能包与许可](https://github.com/OpenEnvision/GameMap/tree/main/docs/skills/level-design). 纯文本包，包含 SKILL.md、LICENSE.md、参考资料和模板。CC BY-NC-SA 4.0 适用于此改编目录，而非整个仓库；商业分发需要取得适当许可。
- **教程 · 教程:** [阅读原书](https://book.leveldesignbook.com/). 作为基础的原书仍具有权威性。该技能重组指导和模板，而非宣称普遍适用的设计法则或经独立测量的结果。

</details>

### 论文

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [GameGPT](https://arxiv.org/abs/2310.08067) · 2023 | 通过多代理规划和代码生成研究自动化游戏开发。 | 研究与基准 | 需求规划 / 代码开发 / 测试验证 |
| [MarioGPT](https://github.com/shyamsn97/mario-gpt) · 2023 | 用 GPT 根据文本描述生成马里奥风格的可玩关卡布局。 | 研究与基准 | 需求规划 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GameGPT](https://arxiv.org/abs/2310.08067)**

规划、审查与实现代理共同拆解游戏需求并生成代码，重点研究幻觉与冗余。这是早期游戏开发代理研究框架；链接仓库仅含论文和 README，不提供可直接部署的完整实现。

标签: `Multi-agent` · `Task planning` · `Research prototype`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文与 README 仓库](https://github.com/leyiwo/GameGPT)

**[MarioGPT](https://github.com/shyamsn97/mario-gpt)**

将敌人、管道和高低差描述转成字符网格关卡与预览，并可结合交互模拟器或 A* 检查。它在既有规则内生成关卡内容，用于研究可控程序化内容生成，不覆盖游戏引擎、角色美术或完整玩法代码。

标签: `PCG` · `Level generation` · `Text-to-level` · `GPT-2`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2302.05981)

</details>

### 文档

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Godot Demo Projects](https://github.com/godotengine/godot-demo-projects) | 覆盖 2D、3D、GUI、音频、网络和渲染的 Godot 官方可运行示例。 | 指南与示例 | 需求规划 / 代码开发 / 场景 / 测试验证 |
| [Unity · 2D Tech Demos](https://github.com/Unity-Technologies/2d-techdemos) | Unity 官方 2D 示例源码，展示 Tilemap、Scripted Tile、笔刷和运行时地图修改。 | 指南与示例 | 代码开发 / 美术资产 / 场景 / 测试验证 |
| [Lyra Sample Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) | Epic 的模块化 UE5 示例游戏，包含玩法插件、能力、动画、输入和 UI。 | 指南与示例 | 需求规划 / 代码开发 / 场景 / 测试验证 |
| [Phaser · Examples](https://github.com/phaserjs/examples) | Phaser 官方示例源码，为具体 API 和玩法组件提供可运行参考。 | 指南与示例 | 代码开发 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Godot Demo Projects](https://github.com/godotengine/godot-demo-projects)**

可作为代理的最小参考项目与回归任务，包含具体场景、脚本和资源。仓库说明 master 面向引擎开发版；稳定版项目应选择匹配分支，避免把版本冲突误判为生成失败。

标签: `Godot` · `Official examples` · `Runnable source` · `Version branches` · `Reference projects`. 资料审阅日期: 2026-10-18.

**[Unity · 2D Tech Demos](https://github.com/Unity-Technologies/2d-techdemos)**

包含瓦片碰撞查询、可破坏地图和调色板切换等源场景。项目记录 Unity 6000.3.3f1、URP 17.3.0 与 Input System 1.17.0，README 则称支持 2021.1 及以后。manifest 选择 2d-extras 的 package_6000.3 Git 分支，锁文件却记录 registry 6.0.1，测试前应解析并固定依赖，分别核验导入、运行和版本兼容性。

标签: `Unity` · `2D` · `Tilemap` · `Official examples` · `Runnable source`. 资料审阅日期: 2026-10-19. 延伸阅读: [固定版本的编辑器基线](https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/ProjectSettings/ProjectVersion.txt#L1-L2) · [固定版本的包清单](https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/Packages/manifest.json#L2-L14) · [固定版本的包锁文件](https://github.com/Unity-Technologies/2d-techdemos/blob/6593d544df2ea598e51f5cf1d7165d5ed42ceba7/Packages/packages-lock.json#L27-L36)

**[Lyra Sample Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)**

适合研究 Game Feature Plugins、Experiences 和 Gameplay Ability System 如何在真实项目中协作。源码与内容通过 Fab / Epic Launcher 分发，需要匹配的引擎版本。Lyra 比最小原型复杂，建议按模块学习；官方 Fab 条目将其内容限定用于基于 Unreal Engine 的产品。

标签: `Unreal Engine` · `Official sample` · `GAS` · `Modular design` · `Runnable project`. 资料审阅日期: 2026-10-19. 延伸阅读: [Fab 官方条目](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)

**[Phaser · Examples](https://github.com/phaserjs/examples)**

涵盖动画、相机、输入、物理和场景切换。当前 README 面向 Phaser 4，labs 网站默认使用最新开发构建；应选择并固定项目所需版本。MIT 许可覆盖示例代码，不覆盖随附美术资产；复用前检查资产权限并在真实浏览器测试。

标签: `Phaser` · `Official examples` · `Runnable source` · `2D` · `Version scope`. 资料审阅日期: 2026-10-18.

</details>

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Agent Game Forge](https://github.com/0x0funky/agent-game-forge) | 面向 Codex 与 Claude Code 的本地 2D 游戏 IDE，包含可视化场景编辑器。 | 工具与平台 | 需求规划 / 代码开发 / 美术资产 / 场景 / 测试验证 / 发布 |
| [Text2Game](https://github.com/boltomli/t2g) | 把长文本转成世界、角色和事件数据，用于叙事游戏原型。 | 研究与基准 | 需求规划 / 代码开发 / 场景 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Agent Game Forge](https://github.com/0x0funky/agent-game-forge)**

结合代理、资产流程和 JSON 场景数据，将自然语言请求转成 JS + Canvas 游戏，用户可在编辑器中调整布局与碰撞。README 将网页输出列为当前默认路线，完整 Godot 和 Unity 支持仍在路线图中，项目自述处于发布前阶段。

标签: `2D IDE` · `Canvas` · `Scene editing` · `Prototyping`. 资料审阅日期: 2026-10-18.

**[Text2Game](https://github.com/boltomli/t2g)**

分块分析文本、合并结果，并生成 Twine / Chapbook HTML 或 Godot 视觉小说项目。仓库提供 Python 流程与示例，适合研究叙事到可玩原型的转换，不是任意动作游戏的通用生成器。

标签: `Interactive narrative` · `Twine` · `Godot` · `Visual novels`. 资料审阅日期: 2026-10-18.

</details>

### 教程

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Codex · Create Browser-based Games](https://learn.chatgpt.com/use-cases/browser-games) | OpenAI 的浏览器游戏开发流程，涵盖规划、项目指令、资产生成和浏览器迭代。 | 指南与示例 | 需求规划 / 代码开发 / 美术资产 / 测试验证 / 发布 |
| [GDQuest · First 2D Game](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/) | GDQuest 的 Godot 2D 生存游戏教程，包含完整脚本、项目和故障排查说明。 | 指南与示例 | 需求规划 / 代码开发 / 场景 / 测试验证 |
| [Catlike Coding · Surface Contact](https://catlikecoding.com/unity/tutorials/movement/surface-contact/) | Jasper Flick 的 Unity 移动教程，分析斜坡、台阶、接触时序和角色控制。 | 指南与示例 | 代码开发 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Codex · Create Browser-based Games](https://learn.chatgpt.com/use-cases/browser-games)**

先明确玩家目标、核心循环、输入和胜负条件，再结合 PLAN.md 与 AGENTS.md 实现。将图像技能和 Playwright 用于视觉与交互反馈。这是一份实践指南，不是针对所有游戏类型的性能保证或研究基准。

标签: `Official workflow` · `Browser games` · `Planning` · `Playwright` · `Asset consistency`. 资料审阅日期: 2026-10-18.

**[GDQuest · First 2D Game](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/)**

覆盖移动、瞄准、投射物、敌人生成和失败状态，可用于学习完整核心循环。教程最初使用 Godot 4.1，已更新到 4.6；排错说明包含 grounded / floating 模式与敌人数量上限。代码采用 MIT，美术资产采用 CC BY-NC-SA 4.0，复用时需分别确认条件。

标签: `Godot` · `Community experience` · `Complete core loop` · `Collision debugging` · `2D`. 资料审阅日期: 2026-10-18. 延伸阅读: [项目源码](https://github.com/gdquest-demos/getting-started-with-godot-4) · [教程库](https://www.gdquest.com/library/)

**[Catlike Coding · Surface Contact](https://catlikecoding.com/unity/tutorials/movement/surface-contact/)**

用测试场景复现失去地面接触、幽灵碰撞、射线检测和地面吸附，为代理提供物理行为的因果解释。教程使用 Unity 2019.2.14f1 与 ProBuilder；应用到其他项目时需适配算法、API、输入和工程配置。

标签: `Unity` · `Community experience` · `Physics` · `Character control` · `Debugging`. 资料审阅日期: 2026-10-18. 延伸阅读: [完整移动系列](https://catlikecoding.com/unity/tutorials/movement/) · [着色器与项目教程](https://catlikecoding.com/unity/tutorials/)

</details>

<a id="runtime"></a>

## 运行时 AI 与 NPC

### 框架

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Inworld Agent Runtime](https://docs.inworld.ai/character-studio-deprecation) | 提供 Unity 与 Unreal SDK 的 AI 编排工具包，用于语音角色、记忆与对话式 NPC。 | 工具与平台 | 代码开发 / 场景 / 运行时 AI |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Inworld Agent Runtime](https://docs.inworld.ai/character-studio-deprecation)**

在运行时图中组合语音识别、语言模型、语音合成与角色知识，再把角色模板连接到 Unity 或 Unreal 场景。旧版 Character Studio 已退役，相关流程现由 Portal 与 Runtime SDK 承接。SDK 详细指南目前需要登录。按项目配置模型服务与角色逻辑，并在目标游戏中测量对话延迟、检查角色行为。

标签: `NPC` · `Dialogue` · `Voice` · `Unity` · `Unreal Engine`. 资料审阅日期: 2026-11-24. 延伸阅读: [Unity AI Runtime SDK guide (sign-in required)](https://docs.inworld.ai/Unity/runtime/get-started) · [Unreal Agent Runtime SDK guide (sign-in required)](https://docs.inworld.ai/unreal-engine/runtime/overview) · [Official game-development examples](https://inworld.ai/blog/introducing-unreal-ai-runtime-sdk)

</details>

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Convai](https://convai.com/) | 通过语音、记忆、情绪和场景内动作，为游戏加入对话 NPC。 | 工具与平台 | 代码开发 / 场景 / 运行时 AI |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Convai](https://convai.com/)**

通过引擎集成连接角色与运行时对话、行为服务。Unity 指南包含安装、示例场景及角色设置，Unreal SDK 源码也已公开，浏览器体验需要账户。它为已有游戏提供 AI 行为，不生成完整游戏；公开 SDK 不包含全部托管 AI 服务。

标签: `Runtime AI` · `NPC dialogue` · `Character actions` · `Unity / Unreal`. 资料审阅日期: 2026-10-18. 延伸阅读: [Unity SDK 文档](https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk) · [Unreal SDK 源码](https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4) · [项目与体验](https://convai.com/gallery)

- **演示 · 交互式:** [尝试角色体验](https://x.convai.com/). 需要账户的浏览器角色体验；这些是对话与角色扮演，而非完整游戏生成演示。
- **源码 · SDK:** [Unreal Engine SDK 源码](https://github.com/Conv-AI/Convai-UnrealEngine-SDK-V4). 公开引擎集成源码；不包含完整云端对话服务。
- **教程 · 教程:** [构建你的首个 AI 角色](https://docs.convai.com/api-docs/plugins-and-integrations/convai-unity-sdk/getting-started). 官方 Unity 安装、服务设置、示例场景和自定义角色操作指南。

</details>

<a id="testing"></a>

## 测试与质量验证

### 框架

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [GUT · Godot Unit Test](https://github.com/bitwes/Gut) | 为 GDScript 提供断言、测试替身和参数化用例的社区 Godot 测试框架。 | 工具与平台 | 代码开发 / 测试验证 |
| [Unity Test Framework](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html) | Unity 官方测试框架，支持 Edit mode、Play mode 和命令行执行。 | 工具与平台 | 代码开发 / 测试验证 / 发布 |
| [Unreal · Automation Test Framework](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine) | UE 官方测试基础设施，支持单元、功能、内容压力和截图比较测试。 | 工具与平台 | 代码开发 / 场景 / 测试验证 / 发布 |
| [GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier) · 2026 | 通过运行时状态钩子与针对性检查，验证生成游戏的行为。 | 研究与基准 | 代码开发 / 测试验证 |
| [GameCI](https://game.ci/docs/) | 由社区维护的 Unity CI 构建与测试自动化工具，提供可复用的 GitHub Actions 和容器工作流。 | 工具与平台 | 代码开发 / 测试验证 / 发布 |
| [GdUnit4](https://github.com/godot-gdunit-labs/gdUnit4) | 面向 GDScript、C# 与场景的 Godot 测试框架，提供断言、测试替身、场景输入驱动及 CI 报告。 | 工具与平台 | 代码开发 / 场景 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GUT · Godot Unit Test](https://github.com/bitwes/Gut)**

提供 CLI 与 JUnit XML 输出，可自动回归检查生成的游戏状态、伤害、背包等逻辑。GUT 与 Godot 有明确的版本兼容条件；逻辑测试通过后仍要检查视觉、控制和场景集成。

标签: `Godot` · `Unit testing` · `GDScript` · `CLI` · `JUnit`. 资料审阅日期: 2026-10-18. 延伸阅读: [作者文档](https://gut.readthedocs.io/)

**[Unity Test Framework](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html)**

可持续回归检查生成脚本及场景行为，使用跨帧 UnityTest 检查生命周期、协程与状态变化。Edit mode 和 Play mode 的执行循环不同，应等待真实帧或条件，而不只检查脚本文件生成。所检查的 Test Framework 1.4.6 API 返回任务 GUID，取消时有跨帧清理：活动用例变为 Canceled，剩余用例为 NotRun。取消不能算通过，Editor 与包版本的兼容性需分别确认。

标签: `Unity` · `Testing` · `Edit mode` · `Play mode` · `CLI`. 资料审阅日期: 2026-10-18. 延伸阅读: [包与 API 文档](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/) · [版本化的测试作业与取消 API](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html)

**[Unreal · Automation Test Framework](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine)**

可将 Blueprint 编译、关卡加载、模拟输入与视觉回归接入代理反馈循环，并结合 Functional Testing 等接口。测试在引擎内运行，需要正确插件和状态清理。ResumeRunTest 读取已有 JSON 报告，继续 NotRun 测试，并把中断时仍在运行的测试标为失败；应保存报告并区分编辑器与客户端测试环境。

标签: `Unreal Engine` · `Automated testing` · `Blueprint` · `Visual regression` · `Content validation`. 资料审阅日期: 2026-10-18. 延伸阅读: [命令行报告与中断运行恢复](https://dev.epicgames.com/documentation/en-us/unreal-engine/run-automation-tests-in-unreal-engine)

**[GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier)**

把游戏需求拆成独立检查点，通过浏览器和运行时适配器验证功能。仓库提供 GGV-Harness 及 Codex、Claude 验证技能，但不包含全部生成游戏、运行输出与私有配置。状态钩子提供的观察能力高于纯黑盒试玩，比较结果时应区分。

标签: `Functional verification` · `Playwright` · `Runtime state` · `Verifier Skill`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2605.07442)

**[GameCI](https://game.ci/docs/)**

从仓库运行 Unity 的 Edit mode 和 Play mode 测试，归档报告，并构建指定目标平台的 Player。固定 Action、完整编辑器版本、运行器操作系统与目标工具链。Unity 激活和 CI 凭据需另行配置。已核对的 unity-builder 6.0.0 和 unity-test-runner 4.4.0 都转交 game-ci/cli 执行，而文档示例仍标作 v4。复制旧工作流前先对照发布说明。两个 Action 仓库都声明 MIT 许可，该许可不包含 Unity Editor 使用权或托管运行器资源。GameCI 是与 Unity Technologies 无隶属关系的社区项目。

标签: `Unity` · `CI` · `GitHub Actions` · `Build automation` · `Test reports`. 资料审阅日期: 2026-11-25. 延伸阅读: [Unity 构建工作流与编辑器版本选择](https://game.ci/docs/github/builder/) · [Unity 测试报告与许可证激活](https://game.ci/docs/github/test-runner/) · [Builder 6.0.0 发布说明与 CLI 迁移](https://github.com/game-ci/unity-builder/releases/tag/v6.0.0) · [Test runner 4.4.0 发布说明](https://github.com/game-ci/unity-test-runner/releases/tag/v4.4.0) · [Builder 源码与 MIT 许可](https://github.com/game-ci/unity-builder#licence) · [Test runner 源码与 MIT 许可](https://github.com/game-ci/unity-test-runner#license)

**[GdUnit4](https://github.com/godot-gdunit-labs/gdUnit4)**

为玩法规则或场景编写测试套件，通过 Scene Runner 驱动输入，并保留编辑器或命令行运行产生的断言与报告。已核对的 6.2.3 版本采用 MIT 许可。其 6.2.x 兼容表列出 Godot 4.5 至 4.7.1，而 Godot 4.3/4.4 项目应使用较早的 5.x 分支。安装前先匹配框架与 Godot 的确切版本。C# 测试还需按专门文档配置 .NET。场景断言只能检查已编写的条件，目标构建的画面、操作和游戏手感仍需实际检查。

标签: `Godot` · `GDScript` · `C#` · `Scene testing` · `CLI` · `JUnit`. 资料审阅日期: 2026-11-25. 延伸阅读: [安装 GdUnit4 并编写首个测试](https://godot-gdunit-labs.github.io/gdUnit4/latest/) · [GdUnit4 6.2.3 发布说明](https://github.com/godot-gdunit-labs/gdUnit4/releases/tag/v6.2.3) · [指定版本的 Godot 兼容表](https://github.com/godot-gdunit-labs/gdUnit4/blob/v6.2.3/README.md#compatibility-overview) · [GdUnit4 6.2.3 MIT 许可](https://github.com/godot-gdunit-labs/gdUnit4/blob/v6.2.3/LICENSE)

</details>

### 基准测试

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [GameDevBench](https://github.com/waynchi/gamedevbench) · 2026 | 在已有 Godot 项目中评估编程代理完成开发任务的能力。 | 研究与基准 | 代码开发 / 场景 / 测试验证 |
| [GameXpert-Bench](https://arxiv.org/abs/2608.21833) · 2026 | 从游戏创建、缺陷修复与迭代优化三个方向评估游戏开发。 | 研究与基准 | 需求规划 / 代码开发 / 测试验证 |
| [GameEngineBench](https://arxiv.org/abs/2607.03525) · 2026 | 在真实 Unreal Engine 项目中测试代理编写的 C++ 运行时代码。 | 研究与基准 | 代码开发 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[GameDevBench](https://github.com/waynchi/gamedevbench)**

仓库包含 333 项任务，覆盖 2D、3D、UI 和玩法逻辑。代理接收现有项目与任务，产出可在引擎检查的改动。可比的官方运行要求 Godot 4.4.1，并提供图像或视频反馈。它评估有边界的开发任务，不直接衡量从零制作商业游戏的质量。

标签: `Development benchmark` · `Godot` · `Multimodal` · `Visual feedback`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文](https://arxiv.org/abs/2602.11103)

**[GameXpert-Bench](https://arxiv.org/abs/2608.21833)**

论文提出 GameGen、GameFix 和 GameOpt，使用完整开发轨迹研究单次生成之外的生命周期。核查时官方仓库仍在准备数据和评估代码，应将其作为论文与协议参考，而非已经可直接运行的基准。

标签: `Development benchmark` · `Bug fixing` · `Iterative improvement` · `Full release pending`. 资料审阅日期: 2026-10-18. 延伸阅读: [仓库与发布状态](https://github.com/Kwen-Chen/GameXpert-Bench)

**[GameEngineBench](https://arxiv.org/abs/2607.03525)**

论文 v2 描述了来自九个 Unreal 项目的 110 项 C++ 任务，代理获得可构建的起点、允许修改的文件和行为要求。编译与 Play-in-Editor 监听服务器测试后，由 LLM 评判需求、测试证据、改动及参考解。核查时无法取得论文链接仓库，可运行代码是否可获取仍需确认；任务范围是局部 C++ 实现，不是完整 3D 游戏生成。

标签: `Development benchmark` · `Unreal Engine` · `C++` · `Behavior tests`. 资料审阅日期: 2026-10-18. 延伸阅读: [论文链接的仓库（可用性未经验证）](https://github.com/Nitrode-Research/GameEngineBench) · [版本化的评测协议](https://arxiv.org/html/2607.03525v2)

</details>

### 文档

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Unreal Engine · Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US) | 编排包含多进程、角色、设备和日志采集的 Unreal 游戏测试会话。 | 指南与示例 | 测试验证 / 发布 |
| [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines) | 面向设计师、开发者和测试团队的游戏无障碍指南。 | 指南与示例 | 需求规划 / 测试验证 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Unreal Engine · Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US)**

Gauntlet 通过 AutomationTool 使用已准备的 cooked 构建，启动配置好的游戏角色。游戏专用测试节点定义断言与终态，启动客户端和服务器本身不代表场景测试成功。构建生产、设备可用性、进程清理和并行会话端口分配仍需分别处理。

标签: `Unreal Engine` · `AutomationTool` · `Multi-process testing` · `Cooked builds`. 资料审阅日期: 2026-10-18.

**[Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)**

覆盖无障碍游戏体验并提供评审标准，属于最佳实践指导，不是法律合规清单或认证。自动扫描不能替代人工评估及残障玩家参与的测试。

标签: `Accessibility` · `QA` · `Guidelines`. 资料审阅日期: 2026-10-18.

</details>

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Microsoft 的浏览器自动化 MCP 服务，向代理提供页面结构、交互与浏览器反馈。 | 工具与平台 | 测试验证 / 发布 |
| [Regression Games](https://github.com/Regression-Games/RGUnityBots) | 提供公开 Unity SDK，用于玩法记录、输入回放和回归测试参考流程。 | 工具与平台 | 测试验证 / 发布 |
| [modl.ai](https://modl.ai/) | 通过视觉代理和自然语言任务，测试上传游戏构建的商业服务。 | 工具与平台 | 测试验证 / 发布 |
| [Playwright Test](https://playwright.dev/docs/test-snapshots) | 提供 DOM 操作、断言和截图比较的浏览器测试框架。 | 工具与平台 | 代码开发 / 测试验证 |
| [Unreal Insights](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-insights-in-unreal-engine) | Epic 为 Unreal Engine 提供的跟踪采集与分析套件，用于排查帧耗时、内存、网络和资产加载。 | 工具与平台 | 代码开发 / 测试验证 / 发布 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Playwright MCP](https://github.com/microsoft/playwright-mcp)**

适合检查浏览器游戏的菜单、HUD、启动流程、键盘输入和截图。默认使用无障碍树，坐标鼠标工具需要可选 vision 能力；两者都不会自动暴露 Canvas 或 WebGL 内部状态，可能需要游戏调试接口。README 提醒该服务不是安全边界，browser_run_code_unsafe 可在服务进程中执行任意 JavaScript。独立的 Playwright CLI 仓库另提供 CLI + Skills 流程。

标签: `Playwright` · `MCP` · `Browser testing` · `HUD` · `Canvas limitations`. 资料审阅日期: 2026-10-19. 延伸阅读: [固定版本的工具与安全边界](https://github.com/microsoft/playwright-mcp/blob/b8b4183e099f136cbec0388a6088d4aa2f6b9685/README.md#security) · [配套 CLI + Skills](https://github.com/microsoft/playwright-cli)

**[Regression Games](https://github.com/Regression-Games/RGUnityBots)**

SDK 结合玩法记录、状态检查、输入回放、Bot 逻辑和验证，官方首测教程与 Boss Room UI 测试项目仍保存在 GitHub。适合作为集成参考：核查时旧文档域名不可达，当前托管服务与维护状态未确认。采用前检查 SDK 兼容性和服务依赖。

标签: `Unity` · `Automated playtesting` · `Input replay` · `Regression testing` · `Reference integration`. 资料审阅日期: 2026-10-18. 延伸阅读: [Unity SDK](https://github.com/Regression-Games/RGUnityBots) · [Boss Room UI 测试示例](https://github.com/Regression-Games/UITest-BossRoom) · [首个测试教程的仓库备用入口](https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx)

- **演示 · 示例:** [可运行的 Boss Room 示例](https://github.com/Regression-Games/UITest-BossRoom). 带 UI 测试的完整 Unity 示例项目；请下载并在本地打开，而非在浏览器中游玩。
- **源码 · SDK:** [Unity 测试 SDK 源码](https://github.com/Regression-Games/RGUnityBots). 公开客户端 SDK 源码；不包含完整的托管仪表板后端。
- **教程 · 教程:** [你的首个自动化测试](https://github.com/Regression-Games/RegressionDocs/blob/main/docs/getting-started/creating-your-first-automated-test.mdx). 保存在文档仓库中的官方首个测试操作指南。审阅期间无法访问原在线文档域名。

**[modl.ai](https://modl.ai/)**

当前服务观察屏幕并模拟输入，不要求引擎 SDK。团队上传构建、描述任务，再查看会话记录与缺陷报告。厂商声称覆盖 Android 与桌面，但对时序敏感的玩法有限制；也描述了利用测试数据进行游戏专用训练，因此无 SDK 不等于无需专门准备。它不同于旧版 SDK 文档，公开自助试玩、完整产品源码和独立实操教程仍需确认。

标签: `Automated playtesting` · `Visual agents` · `Commercial service` · `Game QA`. 资料审阅日期: 2026-10-18. 延伸阅读: [申请产品演示](https://modl.ai/contact)

- **演示 · 服务:** [预约产品演示](https://modl.ai/contact). 需预约的商业演示；这不是公开可玩游戏或即时沙盒。
- **源码 · 不可用:** 完整产品源码不可获取. 未验证当前托管测试产品有完整源码发布；旧版公开示例不是其后端。
- **教程 · 服务:** [工作流概述](https://modl.ai/). 官方上传、任务定义与报告概述；详细入门指导通过服务提供。

**[Playwright Test](https://playwright.dev/docs/test-snapshots)**

截图断言会等待连续两次匹配的捕获后再比较，但像素稳定不代表应用已经就绪。应记录浏览器、字体、视口和捕获选项；禁用动画、蒙版及注入样式都可能改变证据。DOM 访问与纯截图控制、Playwright MCP 是不同观察接口。

标签: `Browser testing` · `Visual regression` · `DOM`. 资料审阅日期: 2026-10-18. 延伸阅读: [可操作性](https://playwright.dev/docs/actionability) · [截图断言 API](https://playwright.dev/docs/api/class-pageassertions)

**[Unreal Insights](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-insights-in-unreal-engine)**

录制有代表性的游戏或编辑器会话，保存 .utrace 文件及引擎版本、构建配置和启用的跟踪通道，再检查相应的时序、内存或加载轨道。本次核对的 Epic 文档标注为 Unreal Engine 5.9。Insights 随二进制引擎安装包提供，也可通过 UnrealInsights 构建目标自行编译。跟踪配置与可用流程取决于引擎构建和操作系统。引擎使用与源码访问遵循 Unreal Engine EULA，而非宽松开源许可。跟踪结果记录的是该次会话中的工作。只有在负载与硬件可比时，才适合判断耗时变化是否属于回归。

标签: `Unreal Engine` · `Performance profiling` · `Trace capture` · `Memory` · `Asset loading`. 资料审阅日期: 2026-11-25. 延伸阅读: [Epic 测试与性能工具目录](https://dev.epicgames.com/documentation/en-us/unreal-engine/testing-and-optimizing-your-content) · [Unreal Engine 许可与源码访问条款](https://www.unrealengine.com/eula/unreal)

</details>

<a id="publishing"></a>

## 发行与发布

### 发行平台

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [CrazyGames](https://developer.crazygames.com/) | 畅玩浏览器游戏，并准备用于 CrazyGames 提交、测试与上线的 Web 构建包。 | 工具与平台 | 发布 |
| [Epic Games Store](https://store.epicgames.com/en-US/distribution) | 浏览游戏发行作品，并通过 Epic 自助开发者工具准备商店分发。 | 工具与平台 | 发布 |
| [GOG](https://www.gog.com/submit-your-game) | 探索无 DRM 的桌面游戏发行版，并向 GOG 精选目录提交作品。 | 工具与平台 | 发布 |
| [itch.io](https://itch.io/developers) | 发掘独立游戏，并发布包含浏览器构建或可下载版本的项目主页。 | 工具与平台 | 发布 |
| [Steam](https://partner.steamgames.com/) | 发现桌面游戏，并使用 Steamworks 准备商店页面、构建包、测试与发行。 | 工具与平台 | 发布 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[CrazyGames](https://developer.crazygames.com/)**

CrazyGames 托管浏览器游戏，并提供独立的开发者门户与文档，涵盖提交规范、技术要求、SDK 集成与测试流程。提交作品需经过 QA 审核，Basic Launch 与 Full Launch 具有不同的要求和可用范围。支持的 Web 技术覆盖多种引擎。平台上的可玩构建属于发行产物，并不证明完整游戏源码公开或由 AI 开发。

标签: `Publishing` · `Game discovery` · `Browser games`. 资料审阅日期: 2026-10-20. 延伸阅读: [在 CrazyGames 浏览游戏](https://www.crazygames.com/) · [CrazyGames 发布文档](https://docs.crazygames.com/) · [CrazyGames 提交要求](https://docs.crazygames.com/requirements/intro/)

- **演示 · 服务:** [在 CrazyGames 浏览游戏](https://www.crazygames.com/). 浏览器游戏门户。各作品有各自的输入、设备和网络要求。
- **源码 · 不可用:** 平台列表不是游戏源码. 通过浏览器分发的文件并不自动等同于完整的可维护项目；需单独核实创作者提供的源码。
- **教程 · 教程:** [CrazyGames 发布文档](https://docs.crazygames.com/). 官方 Web 游戏要求、SDK 指南、测试工具和发布工作流。

**[Epic Games Store](https://store.epicgames.com/en-US/distribution)**

Epic Games Store 提供玩家商店与 Epic Developer Portal 发行工具，用于管理商品页、构建包、优惠活动与版本更新。分发不绑定特定引擎，使用 Unreal Engine 并非前提条件。开发者仍需完成账号入驻并满足商店的内容与产品要求。商店页面不同于浏览器试玩、AI 开发声明或完整源码。

标签: `Publishing` · `Game discovery` · `Desktop games`. 资料审阅日期: 2026-10-20. 延伸阅读: [在 Epic Games Store 浏览游戏](https://store.epicgames.com/en-US/) · [Epic Developer Portal 文档](https://dev.epicgames.com/docs/dev-portal)

- **演示 · 服务:** [在 Epic Games Store 浏览游戏](https://store.epicgames.com/en-US/). 玩家商店页面。请查看各产品的发布状态与支持系统；商店本身不是可玩项目。
- **源码 · 不可用:** 平台列表不是游戏源码. 游戏源码和复用许可必须独立于 Epic Games Store 上架状态单独核实。
- **教程 · 教程:** [Epic Games Store 发布概览](https://store.epicgames.com/en-US/distribution). 官方自助分发概览与常见问题，涵盖开发者配置和商店要求。

**[GOG](https://www.gog.com/submit-your-game)**

GOG 是精选式数字游戏商店，提供无 DRM 发行版及可选桌面客户端。官方提交表单是开发者提报作品的入口，但提交并不保证通过审核或立即上架。请核对每款游戏支持的操作系统、版本与发行状态。无 DRM 分发并不等同于公开游戏源代码。

标签: `Publishing` · `Game discovery` · `Desktop games`. 资料审阅日期: 2026-10-20. 延伸阅读: [在 GOG 浏览游戏](https://www.gog.com/en/games) · [向 GOG 提交游戏](https://lp.gog.com/submit-your-game/en)

- **演示 · 服务:** [在 GOG 浏览游戏](https://www.gog.com/en/games). 桌面游戏目录。请检查具体作品和系统要求，而不要假设可在浏览器游玩。
- **源码 · 不可用:** 平台列表不是游戏源码. 无 DRM 描述的是分发限制，而不是是否提供完整源码或可复用素材。
- **教程 · 服务:** [向 GOG 提交游戏](https://www.gog.com/submit-your-game). 包含嵌入式开发者表单的官方提交页面。是否收录需另行审核决定。

**[itch.io](https://itch.io/developers)**

itch.io 支持创作者管理游戏主页、截图、安装包、开发日志与更新记录。HTML5 构建可在浏览器中直接运行，其他版本可按平台标签提供下载。项目主页也可能仅包含试玩 Demo 或开发中版本，因此需检查实际上传文件与说明。发布可玩构建并不自动代表其源码公开。

标签: `Publishing` · `Game discovery` · `Browser games` · `Desktop games`. 资料审阅日期: 2026-10-20. 延伸阅读: [在 itch.io 浏览游戏](https://itch.io/games) · [创建你的第一个 itch.io 页面](https://itch.io/docs/creators/getting-started)

- **演示 · 服务:** [在 itch.io 浏览游戏](https://itch.io/games). 同时包含浏览器游戏和可下载游戏的独立游戏目录。可用性与许可因项目而异。
- **源码 · 不可用:** 平台列表不是游戏源码. 创作者可能会单独发布源码，但游戏页面或可下载二进制文件本身不等于完整项目源码。
- **教程 · 教程:** [创建你的第一个 itch.io 页面](https://itch.io/docs/creators/getting-started). 官方指南，涵盖项目信息、上传、分类、发布和更新。

**[Steam](https://partner.steamgames.com/)**

Valve 的 Steam 商店面向玩家分发已发布游戏；Steamworks 是用于合作伙伴入驻、商店展示、构建上传、测试与更新的开发者门户。发布前需完成合作伙伴设置并通过商店页面及构建审核。“即将推出”页面、试玩 Demo 与正式发售属于不同阶段。上架 Steam 并不证明 AI 参与创作或公开游戏源码。

标签: `Publishing` · `Game discovery` · `Desktop games`. 资料审阅日期: 2026-10-20. 延伸阅读: [在 Steam 浏览游戏](https://store.steampowered.com/) · [Steamworks 入门](https://partner.steamgames.com/doc/gettingstarted)

- **演示 · 服务:** [在 Steam 浏览游戏](https://store.steampowered.com/). 游戏商店页面。请查看各产品的发布状态、支持系统和获取要求；这不是嵌入式浏览器演示。
- **源码 · 不可用:** 平台列表不是游戏源码. 每款游戏的完整源码都必须单独核实；Steam 页面本身不提供源码。
- **教程 · 教程:** [Steamworks 入门](https://partner.steamgames.com/doc/gettingstarted). 官方发布工作流，涵盖合作伙伴配置、构建、商店展示与发布审核。

</details>

<a id="world"></a>

## 世界模型

### 框架

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/) · 2026 | 由代码引擎维护世界状态，通过流式扩散渲染语义地图。 | 研究与基准 | 代码开发 / 场景 / 世界模型 |
| [Oasis: A Universe in a Transformer](https://oasis-model.github.io/) · 2024 | 根据历史帧和动作预测类 Minecraft 画面的神经游戏研究。 | 研究与基准 | 代码开发 / 世界模型 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)**

NVIDIA Sol-Engine 的 Interactive Coding Worlds 使用 three.js 赛车游戏：引擎处理地图、物理、碰撞和输入，两步流式 MiniMax-H3 根据首帧与提示词渲染语义视频。公开训练和测试覆盖这一个游戏及第三人称视角，语义颜色代表类别而非独立物体。扩散渲染计时使用八张 GB200，因果解码器另在单张 GB200 测量；独立阶段耗时不能等同端到端输入显示延迟。运行源码与权重包已公开，各组件条款不同。

标签: `hybrid-renderer` · `executable-state` · `streaming` · `three.js` · `MiniMax-H3` · `NVIDIA`. 资料审阅日期: 2026-10-19. 延伸阅读: [Sol-Engine](https://nvlabs.github.io/Sana/Sol-Engine/) · [智能体工作流](https://nvlabs.github.io/Sana/Sol-Engine/docs/agent-workflow/) · [固定版本的运行时源码](https://github.com/NVlabs/Sana/tree/0527465fdcbbf27180a76419a4e73643aa1aac73/models/streamrender_h3) · [权重与组件许可](https://huggingface.co/Efficient-Large-Model/StreamRender-H3)

**[Oasis: A Universe in a Transformer](https://oasis-model.github.io/)**

Decart 与 Etched 的 Oasis 使用 Transformer 自编码器和潜在扩散。MIT 推理代码与 500M checkpoint 是缩小版本，不同于更大的托管演示；Hugging Face 权重下载需同意分享联系信息。公开脚本从首帧和动作序列生成视频，并非完整实时游戏接口或训练流程。作者指出长期记忆、精确背包控制、泛化与物体一致性的限制。

标签: `neural-simulator` · `interactive-video` · `transformer` · `Minecraft` · `released-code`. 资料审阅日期: 2026-10-19. 延伸阅读: [推理代码](https://github.com/etched-ai/open-oasis) · [500M 权重、许可与访问](https://huggingface.co/Etched/oasis-500m)

</details>

### 论文

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [SolarRenderer](https://enderfga.cn/SolarRenderer/) · 2026 | 把引擎或代理生成的结构视频，转成带风格的最终画面。 | 研究与基准 | 代码开发 / 场景 / 世界模型 |
| [Code World Model: Coding Agent as World Brain](https://arxiv.org/abs/2608.25927) · 2026 | 让编程代理编写可执行规则与持久状态，驱动视频世界演化。 | 研究与基准 | 需求规划 / 代码开发 / 世界模型 |
| [Programmable World Model](https://arxiv.org/abs/2609.10540) · 2026 | 用显式全局状态与可编程规则，保持视野外实体的持续性。 | 研究与基准 | 代码开发 / 测试验证 / 世界模型 |
| [CoDeR — Code Plans, Diffusion Renders](https://arxiv.org/abs/2609.26458) · 2026 | 多代理共同构建可执行世界，再由扩散模型渲染观察结果。 | 研究与基准 | 需求规划 / 代码开发 / 世界模型 |
| [Magpie: Real-Time World Renderer for Interactive Games](https://arxiv.org/abs/2608.27168) · 2026 | 游戏引擎运行玩法，独立 Render Server 生成最终视觉画面。 | 研究与基准 | 代码开发 / 场景 / 世界模型 |
| [SolarWM](https://arxiv.org/abs/2609.02886) · 2026 | 面向开放数据、训练和长时推理的交互视频世界模型框架。 | 研究与基准 | 代码开发 / 场景 / 世界模型 |
| [WorldCoder](https://arxiv.org/abs/2402.12275) · 2024 | 从环境交互归纳 Python 世界模型，再在模型内进行规划。 | 研究与基准 | 需求规划 / 代码开发 / 世界模型 |
| [GIF-MCTS / Code World Models Benchmark](https://arxiv.org/abs/2405.15383) · 2024 | 通过生成、改进与修复的树搜索，合成可运行环境模型。 | 研究与基准 | 需求规划 / 代码开发 / 测试验证 / 世界模型 |
| [Code World Models for General Game Playing](https://arxiv.org/abs/2510.04542) · 2025 | 将自然语言游戏规则编译成可验证模拟器，用于 MCTS 规划。 | 研究与基准 | 需求规划 / 代码开发 / 测试验证 / 世界模型 |
| [PoE-World](https://arxiv.org/abs/2505.10819) · 2025 | 组合小型程序专家，建模具有随机性的世界动态。 | 研究与基准 | 需求规划 / 代码开发 / 世界模型 |
| [FactorSim](https://arxiv.org/abs/2409.17652) · 2024 | 通过因子化状态表示，从语言生成模拟环境与任务代码。 | 研究与基准 | 需求规划 / 代码开发 / 测试验证 / 世界模型 |
| [Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391) · 2024 | 从没有动作标签的视频中，学习由潜在动作控制的 2D 世界。 | 研究与基准 | 世界模型 |
| [GameNGen — Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837) · 2024 | 从 DOOM 游玩轨迹训练可交互的扩散模拟器。 | 研究与基准 | 测试验证 / 世界模型 |
| [DIAMOND — Diffusion for World Modeling](https://arxiv.org/abs/2405.12399) · 2024 | 让强化学习代理在保留视觉细节的扩散世界模型中训练。 | 研究与基准 | 测试验证 / 世界模型 |
| [GameFactory](https://arxiv.org/abs/2501.08325) · 2025 | 结合开放领域视频生成与键盘、鼠标动作控制的交互视频研究。 | 研究与基准 | 世界模型 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[SolarRenderer](https://enderfga.cn/SolarRenderer/)**

Few-Step Generative Reference Rendering 用语义图、灰盒、骨骼、深度等结构条件控制 MiniMax-H3，也支持首帧和文本。控制与四步 LoRA 包含块因果变体。代码为 Apache-2.0，权重采用有地区限制的 MiniMax H3 Community License，数据各部分条款不同，包含非商业和仅研究部分。世界状态与规则仍由上游程序维护；四步采样不等于已能在消费级硬件实时交互。

标签: `hybrid-renderer` · `structure-conditioning` · `streaming` · `MiniMax-H3` · `LoRA` · `released-code`. 资料审阅日期: 2026-10-18. 延伸阅读: [代码](https://github.com/Enderfga/SolarRenderer) · [论文 PDF](https://enderfga.cn/data/solarrenderer.pdf) · [权重](https://huggingface.co/Enderfga/SolarRenderer) · [数据与评测](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data) · [使用指南](https://github.com/Junchao-cs/SolarWM/blob/main/docs/solar_renderer.md)

**[Code World Model: Coding Agent as World Brain](https://arxiv.org/abs/2608.25927)**

把世界演化与视觉生成分开：代理维护可执行状态，再编译为微调 MiniMax-H3 渲染器的控制条件。公开推理接口使用 RGB 首帧锚点、逐帧深度和语义 ID，以及按窗口提供的提示词。推理代码、LoRA 与示例已公开，但生成代理结构的底层游戏代码不能再分发，因此不能仅凭这些文件原样复现完整代理到引擎流程。

标签: `code-world-model` · `coding-agent` · `executable-state` · `hybrid-renderer` · `MiniMax-H3` · `partial-release`. 资料审阅日期: 2026-10-18. 延伸阅读: [项目](https://buaacyw.github.io/cwm/) · [推理代码](https://github.com/buaacyw/code-world-model) · [复现范围](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)

**[Programmable World Model](https://arxiv.org/abs/2609.10540)**

代理把指令转成实体状态与状态转移程序，轻量引擎维护全局状态，再将有状态的 3D 定向包围盒和相机轨迹编译为视频模型控制。论文提出 CombatStateBench，检查实体计数与不可逆状态。公开仓库目前以项目文档为主，完整推理代码和权重是否可用需另行确认。

标签: `code-world-model` · `executable-state` · `hybrid-renderer` · `persistent-state` · `CombatStateBench`. 资料审阅日期: 2026-10-18. 延伸阅读: [项目与发布进展](https://github.com/AlayaLab/pwm)

**[CoDeR — Code Plans, Diffusion Renders](https://arxiv.org/abs/2609.26458)**

Code Plans, Diffusion Renders 使用五种协作角色，把概念转成规则、代码与观察，让实体在视野之外持续演化。论文研究长期记忆、开放式交互和多代理世界；摘要称代码与权重将发布，应区分论文报告与当前可获取文件。

标签: `code-world-model` · `multi-agent` · `hybrid-renderer` · `persistent-state` · `research`. 资料审阅日期: 2026-10-18. 延伸阅读: [项目](https://becauseimbatman0.github.io/CoDeR)

**[Magpie: Real-Time World Renderer for Interactive Games](https://arxiv.org/abs/2608.27168)**

设计者在传统引擎中定义场景与规则，运行时由引擎处理玩家输入和状态，再由渲染服务将白盒帧转为最终视觉。该分工主要降低原型对完整美术资产的依赖。论文仍记录分块交互延迟与视觉一致性限制，不能直接视为生产就绪的游戏渲染器。

标签: `hybrid-renderer` · `executable-state` · `game-engine` · `render-server` · `research`. 资料审阅日期: 2026-10-19. 延伸阅读: [论文 v1 中的延迟与局限](https://arxiv.org/html/2608.27168v1)

**[SolarWM](https://arxiv.org/abs/2609.02886)**

统一相机控制流式视频的数据、训练与推理接口。来源矩阵列出 Wan2.2-5B 和 MiniMax-H3 的三个阶段，而 Wan2.2-14B、LTX-2.5 的后续阶段仍待发布；不同骨干需要独立环境。主数据集提供标注和索引，latent 单独发布，完整处理后训练视频需要重建或获批访问。Hugging Face 的主数据和 H3 模型仓库还要求同意分享联系信息。它不是具有可查询实体状态的代码世界。

标签: `interactive-video` · `training-framework` · `camera-control` · `streaming` · `released-code`. 资料审阅日期: 2026-10-19. 延伸阅读: [代码与文档](https://github.com/Junchao-cs/SolarWM) · [项目](https://junchao-cs.github.io/SolarWM-Web/) · [数据访问](https://huggingface.co/datasets/junchaoh-cs/SolarWM-Data) · [H3 权重与访问](https://huggingface.co/junchaoh-cs/SolarWM-H3-33B)

**[WorldCoder](https://arxiv.org/abs/2402.12275)**

WorldCoder 将世界知识表示为可执行 Python 程序，用交互记录约束程序，并通过规划寻找潜在奖励。这项 NeurIPS 2024 工作主要在网格世界和任务规划中评估，适合研究规则发现与模型修复，而非完整视觉游戏生成。

标签: `code-world-model` · `program-synthesis` · `model-based-planning` · `gridworld` · `NeurIPS-2024`. 资料审阅日期: 2026-10-18.

**[GIF-MCTS / Code World Models Benchmark](https://arxiv.org/abs/2405.15383)**

用 Python 表达状态转移、奖励与终止逻辑，由轨迹和测试反馈引导 GIF-MCTS 搜索。论文还发布覆盖 18 个强化学习环境的 CWMB，用于检查模型正确性与下游规划，是代码世界模型的基础阅读与评估参考。

标签: `code-world-model` · `program-synthesis` · `MCTS` · `benchmark` · `CWMB` · `NeurIPS-2024`. 资料审阅日期: 2026-10-18. 延伸阅读: [代码与 CWMB](https://github.com/nicoladainese96/code-world-models) · [项目](https://sites.google.com/view/code-world-models/home)

**[Code World Models for General Game Playing](https://arxiv.org/abs/2510.04542)**

根据规则和游戏轨迹生成 Python 状态转移、合法动作与终止函数，并为规划生成启发式价值及隐藏状态推断函数。论文评估十个完全或部分可观察游戏，包括棋盘与卡牌。能否避免非法动作取决于合成规则是否正确，模型验证仍然必要。

标签: `code-world-model` · `game-rules` · `MCTS` · `formal-simulator` · `imperfect-information`. 资料审阅日期: 2026-10-18.

**[PoE-World](https://arxiv.org/abs/2505.10819)**

把 LLM 合成的程序组成指数加权的专家乘积，用少量观察学习复杂随机世界模型，并在 Pong 和 Montezuma's Revenge 中接入规划器，研究样本效率及新关卡泛化。它是程序化动态建模方法，不是美术生成工具。

标签: `code-world-model` · `program-synthesis` · `stochastic-dynamics` · `Atari` · `model-based-planning`. 资料审阅日期: 2026-10-18. 延伸阅读: [代码](https://github.com/topwasu/poe-world) · [项目](https://topwasu.github.io/poe-world)

**[FactorSim](https://arxiv.org/abs/2409.17652)**

使用因子化 POMDP 表示，减少每一步生成所需上下文，面向代理训练生成 2D 游戏模拟。机器人实验在既有 CLIPort 框架内生成物体状态、奖励结构等任务代码。NeurIPS 2024 论文的游戏基准覆盖八个 Pygame 环境，3D 游戏生成仍属未来工作；机器人实验的 3D 相关性不等于能生成完整物理引擎。

标签: `code-world-model` · `simulation-generation` · `POMDP` · `benchmark` · `NeurIPS-2024`. 资料审阅日期: 2026-10-19. 延伸阅读: [项目](https://cs.stanford.edu/~sunfanyun/factorsim/) · [论文 v2 的范围](https://arxiv.org/html/2409.17652v2)

**[Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391)**

结合时空视频分词器、自回归动态与潜在动作模型，形成可从图像或草图逐帧探索的生成式交互环境。ICML 2024 工作重点是在缺少真实动作标签时学习控制。动态隐含在模型内，没有可编辑、可查询的游戏规则程序。

标签: `interactive-video` · `latent-actions` · `neural-simulator` · `2D-platformer` · `ICML-2024`. 资料审阅日期: 2026-10-18.

**[GameNGen — Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837)**

先由强化学习代理采集轨迹，再让扩散模型根据视觉历史与动作预测下一帧，并用条件噪声增强减轻自回归误差。论文在单张 TPU 上展示实时 DOOM 模拟；这种特定游戏神经模拟并不会自动提供可维护的通用游戏规则或资产流程。

标签: `neural-simulator` · `interactive-video` · `diffusion` · `DOOM` · `ICLR-2025`. 资料审阅日期: 2026-10-18. 延伸阅读: [项目](https://gamengen.github.io/)

**[DIAMOND — Diffusion for World Modeling](https://arxiv.org/abs/2405.12399)**

Visual Details Matter in Atari 研究将扩散模型作为环境，让代理从想象轨迹学习，分析视觉细节对策略的影响。除 Atari 100k 评估外，论文还用录制的 CS:GO 游玩数据训练可交互神经引擎，适合研究模拟、控制与累积预测误差。

标签: `neural-simulator` · `interactive-video` · `diffusion` · `Atari` · `reinforcement-learning` · `NeurIPS-2024`. 资料审阅日期: 2026-10-18. 延伸阅读: [代码与可玩模型](https://diamond-wm.github.io/)

**[GameFactory](https://arxiv.org/abs/2501.08325)**

通过领域适配器与动作控制模块生成自回归游戏视频。公开 GF-Minecraft 数据集包含动作标签，所检查仓库提供数据说明、检测和可视化工具，但未确立完整训练、推理流程或权重已发布。视觉泛化应与规则正确性、物品持续性及可导出游戏项目分别评估。

标签: `interactive-video` · `neural-simulator` · `action-control` · `Minecraft` · `dataset` · `ICCV-2025`. 资料审阅日期: 2026-10-18. 延伸阅读: [数据集工具与文档](https://github.com/KlingAIResearch/GameFactory) · [GF-Minecraft 数据集](https://huggingface.co/datasets/KlingTeam/GameFactory-Dataset)

</details>

### 工具

| 资源 | 用途与范围 | 所属集合 | 阶段 |
| --- | --- | --- | --- |
| [Genie 3 / Project Genie](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) · 2025 | 根据提示词生成可实时探索的交互视频世界。 | 工具与平台 | 需求规划 / 世界模型 |
| [World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model) · 2025 | 生成可持续导航的 3D 场景，支持 splat 与网格导出。 | 工具与平台 | 美术资产 / 场景 / 世界模型 |

<details>
<summary>输入、输出、局限与延伸阅读</summary>

**[Genie 3 / Project Genie](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)**

Google DeepMind 2025 年 8 月研究演示报告 720p、24 FPS 的交互世界，可保持数分钟一致性。独立的 Project Genie 原型将探索限制为 60 秒，当前帮助页要求可用地区内符合条件、年满 18 岁的个人 Google AI Ultra 账户。文档支持下载视频，但未确立可下载引擎源码、可导出关卡资产或确定性玩法规则。

标签: `interactive-video` · `neural-simulator` · `text-to-world` · `Google-DeepMind` · `hosted`. 资料审阅日期: 2026-10-19. 延伸阅读: [Project Genie 访问条件与限制](https://support.google.com/labs/answer/16875695?hl=en)

**[World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model)**

Marble 支持多模态世界创建，可导出 Gaussian splat、视觉网格和用于近似物理的碰撞网格，并沿相机路径渲染视频。相比纯视频续帧，它提供可交给下游引擎的空间资产，角色行为、任务逻辑与游戏循环仍需开发。所检查网页指南说明碰撞网格导出包含在 Standard 方案中，高质量带纹理 GLB 需要 Pro。

标签: `scene-generation` · `explicit-3d` · `Gaussian-splatting` · `mesh-export` · `hosted`. 资料审阅日期: 2026-10-19. 延伸阅读: [产品](https://marble.worldlabs.ai/) · [Web 应用网格导出](https://docs.worldlabs.ai/marble/export/mesh)

</details>

## 延伸阅读与实践

- [智能体：模型、执行框架、技能与 MCP](../ecosystem/agents.md)
- [引擎生态：文档、源码、测试与社区实践](../ecosystem/engines.md)
- [面向 2D 和 3D 的 AI：评测版本、资产流水线与发布边界](../ecosystem/2d-3d-development.md)
- [世界模型：代码状态、混合渲染、视频模拟与显式 3D](../ecosystem/world-models.md)
- [实践指南：任务契约、资产导入、验证与复现](../guides/practical-guide.md)

## 维护

目录内容仅编辑 `data/segments/*.json`。运行 `npm run build` 重新生成列表和网站，运行 `npm run check` 验证数据与生成输出。没有自动抓取或定时更新。代码、权重、数据和服务可能分别适用不同许可；使用前请阅读相关官方条款。外部项目归各自作者所有。
