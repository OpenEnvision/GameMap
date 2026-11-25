# 编码智能体的游戏接口：源码证据

改完 Godot 工程，测试工具报出“All 0 tests passed”。先查下面的 [Godot Forge 测试解析器](#godot-forge-code-quality)。如果本地用的是同一套实现，就把进程退出状态、原始输出和预期会执行的用例清单对一遍。要查工具能否识别通过与失败，可以在同一项目里各跑一个结果已知的用例。空跑或无法识别的输出记为待确认。

使用这些记录前先认准桥接工具。下文有两个同名的 Godot Forge，一个负责编辑器和游戏运行时操作，一个反馈代码检查结果。对上本地仓库和修订版，再查操作是否要求游戏正在运行、会写项目文件，或会另起引擎进程。

## codex-official-browser-game-workflow

OpenAI 的游戏工作流链接到 Playwright Interactive。在所检查的修订版本中，这项特定技能需要 js_repl、项目本地的 Playwright 配置，以及禁用沙箱的 Codex 执行环境。

来源：[Playwright Interactive 的前提条件与配置](https://github.com/openai/skills/blob/ecc1fb8bc0b82f1d3c7a92a82167ae8e8e613a67/skills/.curated/playwright-interactive/SKILL.md)

## epic-unreal-claude-skills

该 Claude 插件提供技能和上下文钩子；其 README 要求安装 Unreal 引擎侧插件并运行服务器。它不附带静态 MCP 配置。工具搜索模式默认公开三个用于发现和分派的工具。README 还警告，execute_tool_script 会在编辑器内部运行任意 Python 代码，而且 localhost 无法排除以同一用户身份运行的其他进程。

来源：[Epic README：前提条件、配置、工具搜索与安全](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin/blob/d1b05809e4f089bd0ef174532c692fbcf1562eb7/README.md)

## codex-game-studio-cli

初始化器并不只是写入项目状态。其默认路径会调用 pruneTemplateAuthoringArtifacts，删除列出的模板创作路径，包括目录以及指定的 TypeScript 文件和测试文件。keepTemplateAuthoring 选项会跳过此清理步骤。初始化前，请检查目标检出副本和该列表。

来源：[projects.ts：列出的路径、递归删除与初始化器分支](https://github.com/merlinhu1/codex-game-studio/blob/e06453bcab2a311d229b3d41ad842c45d40ad478/src/projects.ts)

## ione-unity-claude

HTTP 桥接需要主动启用，并通过 bearer 令牌认证。一旦启用，五项独立安全能力的默认值都较为宽松，其中包括脚本写入和资源删除。README 明确限定了 Unity Undo 的覆盖范围：文件写入和大多数 AssetDatabase 操作不在其范围内。Claude Code 桥接路由的文档与该插件依赖提供商密钥的编辑器内聊天和图像生成功能分开说明。

来源：[安全默认值](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/Editor/Core/IoneSettings.cs) · [HTTP 授权与域重载行为](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/Editor/Core/IoneHttpBridge.cs) · [Claude Code 路由与 Undo 限制](https://github.com/TestcodeInc/ione/blob/5c668fb32efa7e832ce932f0536980b22808e3df/README.md)

## godot-forge-editor-bridge

Tann2019 的 Godot Forge 具有不同的执行模式。README 指定需要 Godot 4.4+ 和 Node 20+。编辑器创作使用附加组件，运行时工具使用通过调试连接的运行中游戏，文档、测试和导出也有无头执行路径。如果要求每项操作都建立运行时连接，就会模糊这些边界。该项目不同于下文 gregario 的代码反馈桥接。

来源：[Tann2019 README：快速入门与架构](https://github.com/Tann2019/godot-mcp-server/blob/c52b307f4f28366aa8055f452f367a952aaceb80/README.md)

## godot-forge-code-quality

在所引用的源码修订版本中，静态源码检查表明，测试摘要路径并未在出错时一律判为失败。GUT 和 GdUnit4 解析器将计数初始化为零，在缺少预期输出模式时可能生成“全部 0 项测试通过”。调用方解析 stdout/stderr 时没有将子进程退出码纳入测试结果；进程辅助函数会返回该代码，而不是拒绝所有非零退出。

这一失败路径尚未在运行时复现。测试数量为零或无法识别的结果，需要进一步的执行证据，才能证明测试通过。独立的截图实现会启动另一个 Godot 进程，并需要渲染/显示访问权限；它不是对任意现有运行会话的被动截屏。

来源：[固定版本的测试解析器与调用方](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/test-runner.ts) · [固定版本的进程退出处理](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/spawn-godot.ts) · [固定版本的截图实现](https://github.com/gregario/godot-forge/blob/401f41494eb0777c1e5c848e0e7cce5cafd9cc25/src/tools/screenshot.ts)

## gda-godot-agent

gda 假定目标项目可信。其 README 说明，当项目操作启动面向游戏的引擎时，autoloads 会运行，其中也包括某些只读操作。node get 会实例化场景以获取运行时属性，并且可能运行所附脚本的初始化逻辑。在对不可信项目使用检查命令之前，这些区别非常重要；本目录并未将它们描述为沙箱。

来源：[gda README：配置与项目代码执行](https://github.com/aigengame/godot-agent/blob/036a635fd3bb32ff755b94e928c63883f488e12d/README.md)

## godot-agent-loop

默认核心接口通过 godot_catalog 和 godot_call 访问未预先公开的工具。除非显式覆盖，否则未配置根目录时会拒绝文件系统访问。特权运行时反射/代码执行组默认关闭，但这些 RPC 门控并不会将项目本身沙箱化：其 GDScript 以用户的操作系统级权限运行。依赖渲染的操作需要显示/渲染上下文。

来源：[Godot Agent Loop README：要求、工具接口、运行时策略与环境变量](https://github.com/beremaran/godot-agent-loop/blob/d75624f2a7237ec1b2de17ead27acdcd2b6630e1/README.md)

## agent2unity-cli

对所引用守护进程的静态检查显示，它有一个 localhost 监听器，其请求路由在未进行认证检查的情况下分派 /execute 命令。任何能够访问该端口的进程都可以调用已注册的编辑器操作。这一发现来自静态源码检查。

来源：[Agent2UnityDaemon.cs：监听器、请求路由与主线程分派](https://github.com/jkpp/agent2unity-cli/blob/647becab081597b1a29cf2bb4bae489dbdd6040a/unity-plugin/Agent2Unity/Editor/Core/Agent2UnityDaemon.cs)

## gemini-cli-godot-dock-bridge

后端调用 Gemini CLI，然后自动应用返回的 JSON 文件操作。create_file 以覆盖模式打开目标文件。路径检查会拒绝包含 '..' 的字符串，但受审查的函数在拼接/写入所提供的路径之前，既不要求路径以 res\:// 开头，也不验证规范化后的路径是否位于项目根目录内。

这是静态源码发现，而非运行时复现。它说明在将该原型用于有价值的项目之前，应先进行审查或加固；不应将其解读为项目隔离机制稳健的证明。

来源：[gemini_backend.py：响应解析、路径处理与文件写入](https://github.com/AlexonMorris/gemini_assistant_godot_plugin/blob/5f2b65040dd75d09a147b0e16d6b374080e4939d/gemini_backend.py)
