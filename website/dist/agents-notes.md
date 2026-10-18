# 通用 coding agent 与游戏工具连接：核验记录

核验日期：2026-10-18。主数据位于 `data/segments/agents.json`，20 条，均以项目作者仓库或官方文档为入口。`verified` 表示阅读并核对来源的日期，不代表已在本机安装、跑通或对所有引擎版本做兼容测试。

## 必须保留的概念边界

- **模型 ≠ harness ≠ skill ≠ MCP。** 模型产生决策，harness 管理工具循环、上下文和执行环境；skill 封装领域规程，MCP 提供客户端调用工具的接口。游戏成功率取决于四层以及实际引擎反馈，不宜按模型名称混排为同一种资源。
- **DeepSeek 作为后端。** [官方 Anthropic API 兼容文档](https://api-docs.deepseek.com/guides/anthropic_api/)确认兼容入口与 Claude Code 接入方向，并列出忽略、映射或不完全支持的字段。这次未找到足以支持独立“DeepSeek 官方游戏 harness”条目的来源；因此收录的是接入文档，绝不虚构产品。文档里的模型映射可能变化，清单不固定当前模型别名。
- **代码测试 ≠ playtest。** 构建和单测验证工程；画面、输入、碰撞、胜负状态、手感和持续运行需要真实游戏反馈。通用 SWE-bench 分数不能直接当作游戏开发能力排序。
- **编辑器桥接 ≠ 引擎厂商官方支持。** Unity、Godot、Blender、UE 所列桥接工具均是独立项目；功能、维护情况、许可证与引擎版本需分别核对。

## 来源与时效变化

| 条目 | 本次实际查阅的主要来源 | 核验结论与限制 |
| --- | --- | --- |
| Codex | [CLI 官方文档](https://developers.openai.com/codex/cli) | 按 OpenAI Docs 技能先搜索官方文档，再实际 fetch；支持本地文件、命令、skills 与 MCP 的工具工作流。未比较模型、价格或宣称游戏专用能力。 |
| Claude Code | [官方总览](https://code.claude.com/docs/en/overview) | 阅读文件、编辑、命令和扩展已确认；具体游戏桥接能力由各 MCP 项目承担。 |
| Gemini CLI | [官方仓库 README](https://github.com/google-gemini/gemini-cli) | 核验时 README 明确提示 2026-06-18 起部分用户入口改为 Antigravity CLI，并提示最新模型优化差异。保留用户指定的 Gemini CLI 名称，但不把它写成所有用户的当前唯一推荐入口。 |
| OpenCode | [官方文档](https://opencode.ai/docs/) | Plan / Build、多供应方和 AGENTS.md 等已确认；主仓库现为 anomalyco/opencode。 |
| Cline | [作者仓库](https://github.com/cline/cline) | 当前除 IDE 以外亦有 CLI / SDK 等入口，避免只描述旧版 VS Code 扩展。 |
| Aider | [作者仓库](https://github.com/Aider-AI/aider) | 核验 repo map、Git 和 lint / test 工作流；README 的模型示例较旧，因此不把示例写成当前模型推荐。 |
| OpenHands / SDK | [主仓库](https://github.com/OpenHands/OpenHands)、[SDK 仓库](https://github.com/OpenHands/software-agent-sdk) | 当前主仓库是 Agent Canvas 与编排入口，SDK 承担 agent、工具、工作区与核心服务；清单分开标记两者，避免混淆仓库职责。 |
| Claude Agent SDK | [官方 SDK 总览](https://code.claude.com/docs/en/agent-sdk/overview) | 官方旧 platform.claude.com 路径重定向至 code.claude.com；确认 Python / TypeScript、工具循环、MCP、hooks、会话。 |
| mini-swe-agent | [作者仓库](https://github.com/SWE-agent/mini-swe-agent)、[前代 SWE-agent](https://github.com/SWE-agent/SWE-agent) | SWE-agent README 已建议默认使用 mini-swe-agent；收录后者作为可研究的极简基线，不复述自报排行榜数字。 |
| AGENTS.md | [格式官网](https://agents.md/) | 确认是开放的工程指令 Markdown 格式；客户端间自动发现细节不同，不能假定所有客户端零配置一致。 |
| Agent Skills | [格式官方文档](https://agentskills.io/home) | 确认 SKILL.md + scripts / references / assets 和渐进加载；将格式文档与实际游戏技能分开。 |
| Codex browser games | [官方完整实践指南](https://learn.chatgpt.com/use-cases/browser-games) | 官方文档服务实际 fetch；包含 PLAN.md、AGENTS.md、图像素材与 Playwright 反馈，并没有承诺一轮自动完成任意游戏。 |
| MCP for Unity | [作者仓库](https://github.com/CoplayDev/unity-mcp)、[安装文档](https://coplaydev.github.io/unity-mcp/getting-started/install) | 支持脚本、场景、测试等；作者明确不隶属 Unity。工具数量和版本变化快，条目不硬编码数量。 |
| Unity-MCP Operator Guide | [实际 SKILL.md](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md) | 读取完整技能正文核对“先读状态、再行动、等编译、查 console / 截图”流程。此处作为研究来源，不是安装或执行该技能。 |
| Godot MCP | [作者仓库](https://github.com/Coding-Solo/godot-mcp) | 核对启动、日志、场景节点、Sprite2D 与 MeshLibrary 功能；没有把下游 fork 的额外交互或测试功能错误归于原版。 |
| MCP for Blender | [当前作者仓库](https://github.com/ahujasid/mcp-for-blender) | 旧 ahujasid/blender-mcp 已重定向；当前名称 MCP for Blender，PyPI 包 mcp-for-blender，旧配置兼容说明来自 README。不是 Blender Foundation 官方插件。 |
| Unreal MCP | [作者仓库](https://github.com/chongdashu/unreal-mcp) | 原作者明确标注 experimental、API 可能变化、不推荐生产使用；描述只覆盖 Actor、Blueprint 与视口已列能力。 |
| Playwright MCP | [Microsoft 仓库](https://github.com/microsoft/playwright-mcp) | 默认结构化无障碍树模式适合 DOM；Canvas / WebGL 游戏状态不保证可见。README 也讨论 CLI + Skills 与持久 MCP 工作流的取舍。 |

## 未作为当前首选收录的候选

- [Roo Code](https://github.com/RooCodeInc/Roo-Code) README 当前写明扩展已在 May 15th 停止服务，并指向社区 fork 与 Cline；不再把旧文章中的活跃推荐照搬过来。该声明未在正文补全年份，因此清单不自行补年份。
- [Continue](https://github.com/continuedev/continue) README 当前标记仓库不再积极维护并为只读；若未来收录应标历史状态，不作为无需说明的活跃工具。
- 关于 Antigravity 的迁移状态，本次依据 Gemini CLI 官方 README，仅为说明原条目生命周期；没有对独立 Antigravity 产品做完整评测，因此不额外生成资源条目。

## 面向游戏规划图的细粒度总结

1. **先选可观测的闭环。** 浏览器游戏最容易得到截图、输入、console、网络和测试反馈；原生引擎应先跑通 headless / editor / MCP 三者之一，再让 agent 扩展功能。
2. **把编辑器状态当数据。** 场景对象 ID、组件、材质、资源引用和编译状态应读取后再修改；对象名字不是稳定身份，不能靠提示词猜测现有场景。
3. **给每一步定义证据。** 代码阶段记录构建和测试；场景阶段保留截图、层级和属性差异；玩法阶段记录输入轨迹与预期状态；导出阶段在目标运行时打开产物。
4. **保留可复用工序。** 将成功的 sprite / GLB / 场景 / 测试过程沉淀为带脚本与样例的 skill，项目约束沉淀为 AGENTS.md，而非无限增大一个总提示。
5. **比较 agent 时固定变量。** 记录模型、harness、引擎版本、工具版本、预算、随机种子、任务与验收。单独更换模型后仍应沿用相同任务和验证环境，才能说明差异来自哪里。
