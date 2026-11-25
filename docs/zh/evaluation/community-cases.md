# 社区 AI 游戏案例审阅

想先试玩一款 AI 辅助开发的小游戏，可以打开作者托管的 Dinosaur Game Offline，按键开始、跳跃，再试一次重开。想研究作者如何把工作分给编码智能体，可以看 Cloud Crush 的分步教程和 Go 项目。两者都用了 Gemini CLI。下方原始审阅记录写明哪款玩过、哪款查过源码。

做新的比较时，从作者的披露确认客户端和模型，从对应的源码版本查实现，再从发行页确认手里能启动的是哪一版。哪个字段缺依据，就保留未知。现有收录可查[游戏案例](../tutorials-and-demos.md)。本页的案例数量和试玩记录都对应有日期的审阅批次。

## 新增 Gemini CLI 案例

此前已审阅的两项代码资源现也有了各自的游戏案例。两者都是 2D 游戏，且明确归因于 Gemini CLI 客户端，有别于现有六个使用 Gemini 模型或 AI Studio 的案例。

| 游戏                    | 第一手 AI 证据与源代码                                                                                                                                                                                                                   | 试玩或运行                                                                                         | 真实截图                                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloud Crush           | [Google 的完整游戏项目与 README](https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang)；[逐条提示词的官方 Codelab](https://codelabs.developers.google.com/next26/gemini-cli-match3-golang) | 本地 Go / WASM 项目；未核实到公开的托管端点                                                                   | 发布方截图位于[固定修订版](https://github.com/GoogleCloudPlatform/devrel-demos/blob/cdded29daeb83a24d37dc5c7ead5c85d8a08ff89/codelabs/gemini-cli/gemini-cli-match3-golang/screenshots/09_gameplay.png)；不是 GameMap 在本地运行的截图 |
| Dinosaur Game Offline | [创作者 README](https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped)、源代码及游戏内页脚明确提到了 gemini-cli                                                                                                                | [作者托管的浏览器版本](https://tonidevvn.github.io/dinosaur-game-offline/)；完整的静态项目也可通过 index.html 在本地打开 | GameMap 在开始和跳跃后于浏览器中截取；已检查得分、碰撞／游戏结束及重启                                                                                                                                                                        |

Dinosaur 源代码修订版 `e0f3f584751bb80425bd49513fa7b54503f13d62` 包含 index.html、style.css、script.js 以及引用的图像／音频资源。其在线版本返回 HTTP 200，并在 1280 × 720 的 Chromium 中通过了正常键盘操作流程，最后一次运行没有 JavaScript 错误或失败请求。游戏区域为固定桌面宽度。仓库未声明代码许可证，因此本合集将其称为公开源代码，而不为其指定开源许可证。

Cloud Crush 源代码子目录修订版 `cdded29daeb83a24d37dc5c7ead5c85d8a08ff89` 包含完整的 Go 游戏逻辑、原生及 WASM 配置、源资源、静态服务器和 Dockerfile；仓库代码许可证为 Apache-2.0。本次审阅没有安装 Go 工具链，也没有在本地编译游戏。当前 go.mod 要求 Go 1.26.2；README 中 1.24+ 的前置要求已经过时。服务器提供 public/ 的内容，但已提交的 public/assets 缺少所需的源资源。因此，案例按照 Dockerfile 的做法，加入了在提供服务前将 assets/\* 复制到 public/assets，以及从编译所用的同一套 Go 工具链复制 wasm_exec.js 的步骤。[Go 官方指南](https://go.dev/wiki/WebAssembly#javascript-goosjs-port)要求辅助文件与编译器版本相匹配。本地游玩不需要 Gemini CLI 或云端账号；Codelab 中可选的云端部署则需要。

扩展后的 44 案例展示库通过了生产构建、生成内容检查，以及使用 Playwright 在 1440 × 1300 和 390 × 844 下进行的定向 Chromium UI 检查（Browser 插件不可用）。Gemini CLI 筛选恰好选中这两个案例；2D 筛选保留它们，3D 筛选显示空状态。浏览器／本地模式正确区分两者。两张图像均按记录的尺寸解码，图像对话框显示正确的截图／发布方来源，且提供了源代码链接与本地配置详情。关键词搜索、清除／重置、移动端宽度以及独立的 file:// 构建均通过检查。应用控制台错误和警告均为空。这些 UI 检查并不意味着在本地编译过 Cloud Crush。

## 原有 42 案例的运行与集成审阅

全部 42 个案例 ID 各不相同，相关资源 ID 均能解析。另一次内容审阅检查了重复实现、维度、引擎标签、AI 职责和证据类型。Garden Match 将产品／质量保证归功于人类，将规划／美术归功于 Codex，将工程实现归功于 Claude；OpenGame 被明确标为生成框架。案例研究步骤是编辑提出的建议。

由于 Browser 插件不可用，使用 Playwright 在 Chromium 中以 1440 × 1000 和 390 × 844 检查了展示库。数量、2D/3D 筛选、关键词与游玩模式组合筛选、空状态重置、截图展开／Escape 关闭及移动端宽度均通过检查，没有应用控制台错误。媒体合并后的生产构建和生成内容检查通过，包括全部 42 条图像／源代码记录。公开演示接受了定向冒烟检查，而非完整通关。下载的源代码和创作者截图并不意味着每款桌面游戏都已在本地复现。

Mini KSP 从未经修改的公开源代码提供服务，并通过正常 UI 启动。Garden Match 源代码修订版 8bb87ee5c2698922f79f9b277d97b1392f38d0e2 在未改动玩法的情况下完成转译，并使用文档记载的开发用 Canvas 渲染器选项截取画面。尝试了一次真实的方块拖动，但那是一次无效交换；不声称完成过一次匹配消除。Orb Shooter 和 Pumpkin Hunt 的场景能够渲染，但自动化指针锁定交互受到限制。截图来源和原始图像 URL 记录在[媒体指南](../reference/media-sources.md)中。

## 发现记录

### GameMap 2D 社区案例审计 — 2026-10-18

这是一份带日期的研究快照，并非所有社区游戏的详尽清单。搜索涵盖了 Claude、Claude Code、Codex、Cursor、Gemini、Grok、Aider、ChatGPT、Pygame、Godot 和浏览器游戏相关的 26 种宽泛查询变体。精选目录仅用于发现线索；是否收录取决于创作者控制的仓库、文章、源代码树或已部署游戏。本次扩充排除了现有的 Tetris、Tower of Time 和 OpenGame 条目。

## 收录检查

1. 创作者明确描述了生成式 AI 对开发的贡献；普通的 NPC／寻路“AI”不足以满足条件。
2. 公开仓库包含实际游戏实现（全部 13 个收录仓库均通过递归的公开 GitHub API 源代码树检查）。
3. 创作者链接了浏览器游戏，或提供了可运行的源代码／发行版说明。
4. README 披露标为 `disclosure`，不将其当作提示词日志。开发文章或创作者撰写的摘要使用 `build-log`。这些条目均不声称 AI 创作比例经过独立审计。
5. 从 John Dilig 合集和 GameAI 合集中各选择了一款代表游戏，以避免将一个套件拆成许多近乎相同的卡片。

## 已收录案例（13 个）

| ID                           | 创作者来源与 AI 证据                                                                                                                                               | 试玩／运行入口                                                              | 证据解读                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| gothicvania-codex            | <https://github.com/acatovic/gothicvania-codex-demo#the-story>                                                                                             | <https://acatovic.github.io/gothicvania-codex-demo/>                 | 创作者描述了渐进式 Codex 提示词、技能和 Playwright；明确对人工作品资源和手动制作的 Tiled 关卡予以署名。                                                   |
| pixel-princess-claude        | <https://github.com/VTvito/pixel-princess-platformer#built-with-ai--how-this-was-made>                                                                     | <https://gameforprincess.vercel.app/>                                | Claude Code 协作披露；产品指导、审阅和真机质量保证由人类承担。                                                                              |
| claude-tower-defense         | <https://github.com/mdkess/claude-game#built-with-ai>                                                                                                      | <https://claude-game-lilac.vercel.app/>                              | 创作者表示完全由 Claude Code 制作；有公开的完整实现和无界面模拟器；未声称提供提示词历史。                                                                |
| cursor-procedural-platformer | <https://github.com/commjoen/generated-game-experiment> ; <https://github.com/commjoen/generated-game-experiment/blob/main/.cursor/rules/conversation.md>  | <https://commjoen.github.io/generated-game-experiment/>              | 仓库自称为 Cursor 游戏实验。已获取对话文件：它是用户／助手各阶段的项目符号摘要，而非逐字对话记录。                                                              |
| claude-mini-snake            | <https://github.com/BizShibe/claude-ai-mini-snake-game#readme>                                                                                             | <https://minisnake.vercel.app/>                                      | 创作者表示游戏是在 Claude 对话中生成的。这是 Claude 聊天，而非 Claude Code 的证据；resourceIds 为空。                                            |
| flux-codex-runner            | <https://github.com/scriptedbyshivam/codex-hackathon-2026#readme>                                                                                          | <https://codex-hackathon-drab.vercel.app/>                           | 创作者的开发叙述在七个里程碑中提到了 Codex。此处仅描述跑酷玩法；不复述身心健康方面的宣称。                                                                   |
| bash-fighter-agent           | <https://github.com/Bash-Entertainment/bash-fighter#readme>                                                                                                | <https://bashfighter.com/>                                           | 所有者明确表示，大部分代码和日常开发由 AI 智能体完成。在缺乏证据时，不归因于任何具体模型／客户端。                                                                |
| running-man-claude-pixellab  | <https://github.com/balbonits/ai-browser-game-demos#tools-used> ; <https://github.com/balbonits/ai-browser-game-demos/blob/main/docs/games/running-man.md> | <https://games.jdilig.me/games/running-man/>                         | 创作者指出代码使用 Claude Code、美术使用 PixelLab。各游戏记录包含资源清单、操作、架构和带日期的改动。实际源代码现位于 public/games/ 下。                             |
| garden-match-agents          | <https://github.com/kevinchenkai/GameAI#readme> ; <https://github.com/kevinchenkai/GameAI/blob/main/garden/README.md>                                      | <https://g.ismayday.mobi/garden/>                                    | 创作者指出采用了以 Codex 为中心、实现与独立审阅相结合的工作流程；各游戏文档区分了代码层、Codex 美术订单和人工真机验证。                                                 |
| dunkirk-ai-assisted          | <https://github.com/Ponloe/dunkirk-godot#ai-usage>                                                                                                         | <https://cheery-sable-f2dce2.netlify.app/dunkirk.html>               | 范围明确且具体的贡献表：Gemini 负责背景／构思；ChatGPT 负责规划／调试；Claude 提供小型建议；手动整合／测试，并使用外部获许可音乐。代表性提示词是示例，而非完整日志。                      |
| gravity-birds-grok-cursor    | <https://github.com/az9713/grokbot-game-dev-demo> ; <https://az9713.github.io/grokbot-game-dev-demo/gravity-birds-dev-journey.html>                        | <https://github.com/az9713/grokbot-game-dev-demo#opening-in-godot-4> | Godot 源代码下载。已获取并阅读开发历程 HTML：Grok Bot 协调 Cursor Cloud Agents，本地测试发现了移动／可解性问题，文中介绍了后续修复。它明确表示网页导出尚未完成；不将其归为可玩的浏览器版本。 |
| quasar-saz-claude            | <https://github.com/cleak/quasar-saz#how-it-was-made>                                                                                                      | <https://github.com/cleak/quasar-saz/releases/tag/v1.1>              | 创作者描述了 Claude Code 解释狗的键盘输入，并通过测试构建代码／程序化美术／音频的过程。推荐的 v1.1 加入了人工修复；不称其为未经修改的 AI 结果。Godot Mono/C# 源代码。              |
| agent-arcade-copilot         | <https://github.com/DanWahlin/agent-arcade#how-this-was-made> ; <https://blog.codewithdan.com/building-agent-arcade-with-github-copilot-cli/>              | <https://github.com/DanWahlin/agent-arcade/releases>                 | 创作者文章介绍了 Copilot CLI 规划、游戏机制、截图反馈、Tauri 迁移和发行过程。已署名的人工作品精灵图／参考代码仍是项目的一部分。                                          |

## 源代码树检查

这批审阅通过公开的 GitHub 文件树快照核对特定提交中的文件。已核实的文件数量为 GothicVania 40、Pixel Princess 176、塔防 89、Cursor 平台跳跃游戏 81、Gravity Birds 89、Agent Arcade 368、Mini Snake 3、Flux 22、Bash Fighter 385、Quasar Saz 1076、John Dilig 合集 171、GameAI 合集 1122、Dunkirk 212。总数包含配套文档、资产和测试。要判断是不是完整游戏，得找到启动入口，查清它依赖哪些文件。单凭数量很难判断跑不跑得起来。

审阅还读过表里链接的 Cursor 对话摘要、Gravity Birds README 和开发日志、Mini Snake 完整 HTML，以及 Copilot 创作者文章。来源读取工具打不开链接时，先用直接获取或浏览器访问核对，再记录是否可用。

## 可下载项目的创作者实机游戏图像

- Gravity Birds。<https://raw.githubusercontent.com/az9713/grokbot-game-dev-demo/main/game_ui_2.png> 展示了 Stairway 谜题中的鸟、水果、出口和撤销／重启控件。README 将它题为“打磨之后”。
- Quasar Saz。<https://raw.githubusercontent.com/cleak/quasar-saz/master/docs/screenshot_20260219_154704.png> 展示了 Dissonance King 第 3 阶段战斗中的玩家、攻击、能量和分数。
- Agent Arcade。<https://raw.githubusercontent.com/DanWahlin/agent-arcade/main/docs/images/agent-arcade-ninja.gif> 是作者文章题为“Ninja Runner Gameplay”的录像。

图库将这三份画面署名归给各自的创作者。

## 浏览器核验

首次导航使用 Playwright 和 Chromium 1208。10 个浏览器入口均返回 HTTP 200，页面标题符合预期。随后查看能否操作游戏，等标题或载入画面过后再截图。资源加载或动画过慢的游戏用 Metal 渲染再试一次，只留一个前台页面。

已核实的实际交互：塔防游戏的伤害升级使 Lv0→Lv1、gold25→5；Cursor 平台跳跃游戏能够移动／跳跃，且分数增加；Mini Snake 通过方向键收集了两个食物（score0→2；length1→3），随后暂停以截图；Flux 进入运行状态并翻转重力；Bash Fighter 创建私人大厅、加入机器人启动，进入限时混战，并响应移动／跳跃／攻击；Running Man 启动、跳跃并跑到 19m；GothicVania 从其导出的 `title` 状态进入 `level`，玩家能够移动／跳跃，生命值为 4，敌人处于活动状态。GothicVania 的 Enter 输入必须持续跨过一个渲染帧，因为标题界面检查的是 Phaser `JustDown`。

这次保留了七张浏览器实机截图，以及一张 Pixel Princess 作者截图。它的公开构建能进菜单，但首次加载资源有时快、有时慢。作者截图显示了森林关卡、玩家角色、敌人、拾取物和生命值、分数界面。<https://raw.githubusercontent.com/VTvito/pixel-princess-platformer/main/assets/screenshot.png>。Garden Match 和 Dunkirk 另有检查记录。

## 拒绝或暂缓的候选

| 候选                                                         | 决定及原因                                                                             |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| <https://github.com/0x0funky/agent-game-forge>             | 游戏 IDE／工具，并非另一个已完成的游戏案例。                                                          |
| <https://github.com/BeyondPlay-AI/game-prompt-engine>      | 生成器 CLI；未独立核实到具体的已完成产出。                                                           |
| <https://github.com/Mr-Neutr0n/pixelforge>                 | 生成器／编辑器产品，而非独立的已完成游戏。                                                             |
| <https://github.com/Tann2019/godot-mcp-server>             | 带教学演示的引擎集成／工具；不用于虚增游戏数量。                                                          |
| <https://github.com/hanifwdyt/claude-code-game-toolkit>    | 工具包和入门示例；暂缓收录，优先选择创作者背景信息更充分的独立项目。                                                |
| <https://github.com/MRCalderon3D/everything-game-dev-code> | 包含许多示例的广泛脚手架；本轮未完整检查各项产出。                                                         |
| <https://github.com/NguyenLe15325/Python-raylib>           | AI 辅助概念演示合集；许多条目是基础框架，而非完整的游戏循环。                                                  |
| <https://github.com/Ajairajv/2D-Shooter-Game>              | README 记录的是传统敌人 AI；未核实到生成式 AI 制作披露。                                               |
| <https://github.com/AkankshaD2/FlowForge>                  | README 中的 AI 指 A\* 导航／寻路；未核实到生成式 AI 开发归因。                                         |
| <https://github.com/matthewod11-stack/CatRunner>           | 运行时使用 Gemini 生成猫咪的情况明确；未能确立游戏开发的明确归因。                                             |
| <https://github.com/Id-Aplus/SnakeMazeEscape>              | 有可信的 Amazon Q／Pygame 创作者披露；据称基础模式已完成，但普通／高级模式存在已承认的错误／未完成内容。保留为进一步候选，而不是用来凑主集合数量。 |
| <https://github.com/BareTread/vampire-survivors-enhanced>  | 存在完整游戏和智能体相关文件，但 README 本身不能确立 AI 的开发贡献。收录前需进一步审阅一份会话产物。                          |
| <https://github.com/highlandhodl/coengineers-os-games>     | 可信的 Claude Code 套件；由于本轮已包含街机合集，且未完成独立的实机预览核验，暂缓收录。                                |
| GameAI StackPop                                            | 与 Garden Match 同一创作者／仓库，采用相同工作流程。不为增加总量而另拆一张卡片。                                   |
| <https://github.com/ladegeraet/claudespace>                | 来自发现列表的线索；本轮直接获取仓库未能确立源代码／证据链。                                                    |
| <https://github.com/lappemic/awesome-ai-built-games>       | 有用的发现索引；第三方列表不是特定游戏创作归属的第一手证据。                                                    |

3D 线索已交给 3D 研究员：CodeCraft、mineclaude、ImADragon、snake-3d-game、desert-velocity 和 vibe-jet。它们不计入此次 2D 扩充。

***

### 社区 3D 扩充审计 — 2026-10-18

已准备好 `website/src/data/community3dExpansion.ts`：12 款新游戏，均有创作者发布的浏览器 URL 及真实游戏仓库。主智能体负责在线浏览器截图及最终收录。本研究核实了创作者证据和源代码树；在此列出 URL 并不意味着完成过完整通关。

## 搜索覆盖范围

在 GitHub／网络上搜索了 Three.js、Godot、Unity、AI 生成、vibe-coded、Claude、Codex、Gemini、Copilot、AI 游戏开发，以及具体公开项目。还将社区列表 <https://github.com/coolbat/awesome-opus-5.5-usecase> 用作发现索引，随后核实第一手创作者仓库，而非将该列表本身当作证据。来源包括英语、中文、日语和法语开发记录。

## 收录候选与第一手审计

| ID                       | 第一手仓库                                                              | AI 证据                                                             | 源代码检查                                                                                                                                                              | 演示                                                                 |
| ------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| turbo-kart-rally-claude  | <https://github.com/bridge-mind/turbo-kart-rally>                  | README 中的原始提示词、五个 Claude Opus 5.5 任务、架构及集成叙述                      | 递归 main 树：41 个条目，27 个 JS/HTML 文件；截图仅用于文档；运行时视觉效果／音频以程序生成                                                                                                           | <https://bridge-mind.github.io/turbo-kart-rally/>                  |
| long-wind-claude         | <https://github.com/jbang2004/long-wind>                           | 中文作者时间线、AI／人工职责、原始请求                                              | main 树：334 个条目；已提交 Tripo 角色 GLB、Mixamo 动画 GLB、Poly Haven glTF／纹理，以及实际游戏代码。未发现很小的 GLB 指针文件。已阅读 CREDITS.md：资源条款与代码不同。                                                | <https://jbang2004.github.io/long-wind/>                           |
| nova-lancer-claude       | <https://github.com/tanuu5/nova-lancer>                            | 日文原始需求说明、智能体分工、测试说明、报告的模型／会话记录                                    | main 树：35 个条目，18 个 JS/HTML 文件。完整的程序化游戏；包含打包的 index.html、模块化源代码和构建工具。                                                                                               | <https://tanuu5.github.io/nova-lancer/>                            |
| orb-shooter-ai           | <https://github.com/theredstapler/orb-shooter>                     | README 直接提到了 Antigravity、Gemini 3.1 Pro、Opus 4.6 和人工打磨            | 已检查 main 树和 main.js 引用。引用的所有仓库／武器／敌人 GLB、HDR 和 OGG 文件均已提交，并非只有 Sketchfab 链接。                                                                                       | <https://theredstapler.github.io/orb-shooter/>                     |
| operation-naptime-claude | <https://github.com/alandaitch/operacion-siesta>                   | README 制作叙述及其链接的、包含工具调用的公开会话                                      | master 树：166 个条目，116 个 JS/TS/HTML 文件，程序化渲染／音频。存在 `public/transcript.html` 和 `docs/transcript.html`。README 的 `docs/TRANSCRIPT.md` 链接与源代码树不符，因此数据改用正常工作的已发布 HTML 路径。 | <https://operacion-siesta.vercel.app/>                             |
| ombres-claude            | <https://github.com/briossant/ombres>                              | README 中的详细流程、人工干预、原始 docs/BRIEF.md                               | master 树：1,789 个条目，358 个 JS/TS/TSX/HTML 文件；完整的主机端／控制器／中继、程序化鸟类／世界、已提交的音频／字体／旁白。PolyForm Noncommercial：描述为源代码可用，而非 OSI 开源。                                          | <https://ombres.deploy.breizhware.com/>                            |
| dragons-reach-claude     | <https://github.com/jaydemks/ImADragon_onepromptcode_game>         | PROMPT.md、契约、README 复盘，以及如实披露的 1 条初始提示词 + 3 条后续指令                 | main 树：95 个条目，48 个 JS/HTML 文件；程序化骨架／世界／战斗。作为原型源代码完整；README 中的音频模块是占位实现。                                                                                            | <https://jaydemks.github.io/ImADragon_onepromptcode_game/>         |
| vibe-jet-gemini          | <https://github.com/cedrickchee/vibe-jet>                          | 创作者的初始 Gemini 提示词、回复和方法；最初于 2025 年制作                              | main 树：22 个条目，game.html/server.js，真实的飞机 GLB 和纹理。已检查代码：本地 shenyang_j-11.glb；Three.js CDN + 在线草地纹理。                                                                  | <https://vibejet.cedricchee.com/>                                  |
| slide-rush-opus          | <https://github.com/KJLKurt/waterslide-game-opus-5.5>              | README 完成记录提到了 opus-5.5/extra-high 和会话统计；仓库描述了 LLM 比较             | main 树：65 个条目，29 个 JS/HTML 文件；程序化角色／滑梯／音频，以及 PWA。标为披露，而非教程或提示词档案。                                                                                                  | <https://kjlkurt.github.io/waterslide-game-opus-5.5/>              |
| the-tithe-claude         | <https://github.com/miguelsolorio/the-tithe>                       | 作者仓库的 About 直接表示使用 Opus 5.5 制作                                    | main 树：227 个条目，165 个 JS/HTML 文件；真实的关卡／武器／敌人／检查点。运行时资源以程序生成；没有完整的提示词／会话证据。标为披露。                                                                                     | <https://miguelsolorio.github.io/the-tithe/>                       |
| michi-neko-ai            | <https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path> | 创作者 README 指出人工指导和多个 AI 模型，但未说明具体模型                               | main 树：201 个条目，63 个 JS/HTML 文件；程序化游戏、任务及存档逻辑。README 明确将许多插图标为期望中的灵感参考，因此绝不能把它们当作真实实机截图。明确说明处于早期 Alpha 阶段。                                                          | <https://c1t1zen1.github.io/Michi-Neko-The-Cat-Philosophers-Path/> |
| fragarena-copilot        | <https://github.com/jonnyleigh/fragarena>                          | 作者的 Copilot 披露、Prompt.md、SoundEffectsPrompt.md、php2node_prompt.md | main 树：55 个条目，25 个 JS/HTML 文件；客户端／服务器、音乐 MP3 和 UI 图像均已提交。已阅读实际的 Prompt.md；不声称存在原始对话记录。                                                                             | <https://fragarena1.azurewebsites.net/>                            |

所有最终教程／证据链接均指向第一手创作者材料。只有声明的条目使用 `tutorial.kind: 'disclosure'`。步骤是编辑提出的研究建议。源代码范围 `complete-project` 指源代码和游戏依赖可运行所述原型。

## 有意未加入浏览器集合的优质备选

- **Desert Velocity**  — <https://github.com/sim7575/desert-velocity> ；Godot 4.3+、Codex + GPT-5.6 Build Week 项目，附有详细的受监督 AI 使用披露。Windows 下载 <https://sim75.itch.io/desert-velocity> 。已检查源代码树：784 个条目，428 个图像／模型／音频资源，包含原始 Blender 文件和真实 GLB。没有微小的资源指针文件。引擎多样性出色，但仅提供下载。若需要本地游戏截图／下载案例，主智能体可添加。
- **Opus FPS**  — <https://github.com/frankhale/opus-fps> ；Godot 4，使用工具生成的程序化模型和声音；游戏代码在 godot/ 中。作者直接归因于 Opus。没有公开浏览器版本。保留在优先浏览器的新增集合之外。
- **MineClaude**  — <https://github.com/snek-git/mineclaude> ；Rust + Bevy 0.18，作者表示完全由 Opus 4.6 智能体团队制作，工作流程和人工试玩披露清楚。可通过 cargo 运行，需要 GPU；没有浏览器演示。
- **CodeCraft**  — <https://github.com/zihaomu/CodeCraft> ；作者归因于 Codex；真实的程序化体素生存／建造项目及源代码。README 只给出本地运行 URL，没有已发布的可玩 URL。仅源代码备选。
- **Tripo Playbook 游戏**  — <https://github.com/TripoGrowthLab/vibe-gaming-interactive-playbook> ；Snowdrift Dash、LANTERN ALLEY、PIT NINE 均有具体的游戏代码和浏览器演示。作者明确表示未包含 Tripo 模型，新克隆的仓库以灰盒方式运行。必须使用 `game-code-greybox`，绝不能标为 complete-project。作为资源替换工作流程更有价值，而不是用来凑当前集合数量。

## 拒绝／不计入的项目

- <https://github.com/chongdashu/threejs-capacitor-ios-game> ：仓库明确表示没有可运行的应用代码或 GLB 模型；只有提示词、技能和元数据。不是完整游戏源代码。
- <https://github.com/mdelaguera/learn-threejs-tactics-game> 及上游 chongdashu/threejs-tactics-game ：公开仓库表示完整源代码和资源管线将于以后推出／通过付费访问提供；公开参考材料不足。
- <https://github.com/vibe-stack/game.js> ：引擎／编辑器项目，而非已完成的游戏案例。
- <https://github.com/hyeons-lab/prism> ：仅有引擎。
- <https://github.com/marciocamello/game-engine-ai> ：带有示例的引擎项目，独立游戏证据不足以满足此次筛选要求。
- <https://github.com/markjeromecruz/threejs-claude-starter> ：场景／入门项目，有意邀请用户添加游戏机制；不是完整游戏循环。
- <https://github.com/xenitV1/mehmet-3d-portfolio> ：可探索的作品集，没有游戏目标。
- <https://github.com/shogunyan12/The-GREAT-SAGE> ：桌面助手，而非游戏。
- <https://github.com/vasu-devs/FishSlop_Opus5.5> ：发现了真实游戏／源代码及演示，但 README 未明确归因于 AI 创作；仅在仓库 URL 中出现模型名称，证据弱于已收录案例。排除，等待直接的创作者制作证据。
- <https://github.com/leobrqz/VibedGames-benchmark> ：有真实的小型游戏，并要求采用 prompt_history.md 惯例；选择了单独记录更充分的示例，而不是计入每个基准测试条目。
- <https://github.com/chojondocho/single-html-game-bench> ：有真实生成产出，但这是一个庞大的单提示词比较集合；从精选数量中排除，以免重复的低质量产出虚增总数。
- 发现列表中的 `Tidewater`、`Clearwater`、`web-ocean`、河船场景、照片级真实建筑查看器和宇宙模拟：属于交互／渲染演示，缺乏足够明确的游戏循环，予以排除。
- 发现列表中的 `GalaxyQuest` 需要专有的原游戏数据；不声称其是独立完整的项目／资源。

## 已执行的核验

- 对每个收录仓库进行了第一手网络搜索／打开／阅读。
- 通过 GitHub 连接器检查了全部 12 个收录源代码的递归源代码树。
- 将实际 Orb Shooter main.js 的资源引用与源代码树进行匹配；阅读了 Vibe Jet 的模型／纹理依赖。
- 检查了 Long Wind 的 CREDITS.md、Ombres 的 README／许可声明、Nova Lancer 的日文 README，以及 FragArena 的 Prompt.md。
- 新数据文件创建后，`npx tsc -b --pretty false` 通过。
- 许多浏览器游戏 URL 虽由第一手仓库链接，但网页阅读器返回通用的“无法通过此工具访问”；主智能体正在独立截取真实浏览器预览，因此没有将网页阅读器失败错误标为死链。

## 主智能体浏览器检查的后续结果

- Vibe Jet 和 FragArena 的公开主机 DNS 解析失败。它们最终的 `demo` 字段现链接到实际 main 分支源代码 ZIP，并附有本地 Node 启动说明，同时说明审阅时公开主机无法解析。
- Ombres 浏览器导航超时；最终演示说明提示可能暂时不可用。不将其视为主机已失效的确凿证据。
- 创作者实机游戏截图的具体候选位于 `/tmp/gamemap-3d-screenshots.json`，以案例 ID 为键，包含不可变的提交引用、原始图像 URL、源代码永久链接、字节大小及 README 来源信息。九张图在创作者 README 内容中被明确作为实机游戏画面嵌入。Michi 开发截图需要逐像素目视检查；所有愿景性质的 README 插画均被排除。Orb Shooter 和 Slide Rush 的源代码树中没有创作者实机游戏截图，因此需要主智能体在浏览器中截图。

***

### 多样化社区案例研究 — 2026-10-18

范围：实际的 AI 辅助游戏开发、公开的完整项目、可玩的浏览器版本，或如实标注的源代码下载。搜索词涵盖 Gemini CLI、Google AI Studio、DeepSeek、Aider、Cursor、Replit、Windsurf、Antigravity；通过网页搜索和 GitHub 仓库搜索进行中英文检索。作者归因与制作日志或实际提示词对话记录相区分。运行时的后续检查记录在上方最终审阅中。

## 在 website/src/data/diverseCommunityCases.ts 中新增的候选

| ID                       | 第一手披露                                                                                                                             | 已检查的源代码                                                                                                    | 试玩／运行                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| cursor-space-shooter     | <https://github.com/littleearth/vibe-coded-games#development> 明确归功于 Cursor；家庭创作细节见游戏详情                                            | 递归 Git 源代码树包含 shooter/index.html、styles.css、43KB 的 game.js；完整获取了 shooter/README.md                         | <https://games.littleearth.dev/shooter/>                          |
| cursor-destruction-derby | 同一份第一手 README，单独列出 Destruction Derby 和 Cursor 辅助                                                                                  | 递归源代码树包含 demoderby/index.html、styles.css、36KB 的 game.js                                                    | <https://games.littleearth.dev/demoderby/>                        |
| beach-kitty-ai-campaign  | <https://github.com/matthewod11-stack/CatRunner#built-with> 明确提到了 Claude Code + Gemini                                            | 根目录源代码树、资源和场景可见；获取了 README 和完整的 PROGRESS.md（354 行）。核心玩法不需要 Gemini 密钥                                       | <https://www.beachkittygame.games/>                               |
| gemini-pirate-fleet      | <https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process> 中，作者描述了 Gemini 2.5 Pro + Claude Sonnet 4.5 的初始工作流程及一些手动平衡调整 | 通过 GitHub 连接器获取了完整的 79KB Pirate Fleet Commander v7.4.html，共 2002 行。实现了游戏循环、经济系统、Canvas 视觉效果和输入             | README 直接链接 Pages 的 /Pirate%20Fleet%20Commander%20v7.4.html       |
| gemini-kymograph         | 同一份面向整个合集的作者披露；当前版本的确切模型未作说明                                                                                                      | 获取了完整的 Kymograph v4.html，28KB／628 行；包含实际的信号谜题、规则推断、反馈、持久保存的进度和 Web Audio                                   | README 直接链接 Pages 的 /Kymograph%20v4.html                          |
| gemini-pumpkin-hunt      | 同一份面向整个合集的作者披露；没有各游戏专属的提示词日志                                                                                                      | 获取了完整的 Pumpkin Hunt Horror Game v3.html，25KB／236 行；包含程序化 Three.js 景物／角色／纹理、手电、体力、交互、胜负和追踪者行为               | README 直接链接 Pages 的 /Pumpkin%20Hunt%20Horror%20Game%20v3.html     |
| deepseek-neon-snake      | <https://github.com/TwitchCaptain/snake> 中由作者控制的描述：经典 Snake 游戏——由 DeepSeek 创作                                                     | 已获取 README、递归源代码树、完整的 21KB game.js；存在 index.html/styles.css。包含实际的 Snake 规则／关卡／输入                           | README 明确链接 <https://twitchcaptain.github.io/snake/>              |
| deepseek-mini-ksp        | <https://github.com/BairlyEmei/mini-ksp> 中由作者控制的描述：由 deepseek harness 开发的 mini-ksp 游戏                                             | 已获取 README；递归源代码树确认存在 index.html、172KB 的 js/game.js、教程／任务／手册、CSS、94KB 的 3D 工作台、仓库内置的 Three.js 和 4 张 PNG 纹理 | 未宣传托管游戏。如实将源代码 ZIP 标为下载。README：打开 index.html 或运行 python3 start.py |

在初始源代码发现期间，没有调用任何生成 API。后来的本地游戏冒烟测试记录在上文中。网页获取个别游戏文件返回缓存未命中后，使用了 GitHub 连接器。主智能体已获得在线 URL 用于运行时检查。数据没有声称玩法此前已经核验。

## 排除／暂缓的项目

- JoakimCarlsson/bastion：网络搜索将其描述为有趣的智能体管线塔防游戏，但打开实际仓库返回 404；未添加。
- theatharvagai/GeminiCLI-Driven-Game-Dev：有真实的 CLI 归因，但 README 仍保留占位克隆 URL 和预览说明；未宣传托管演示；出于质量考虑降低优先级。
- tonidevvn/dinosaur-game-offline：README 明确记录了 Gemini CLI 辅助；递归源代码树包含完整代码和 Wikimedia 恐龙图像／声音。是可在本地运行的候选，暂缓的原因是未宣传在线 URL，且现有的 Snake 跑酷类案例已扩展了工具多样性。以后可通过本地截图添加。
- aerugo/orb：作者控制的仓库描述表示 Orb 游戏由 Aider 制作。已获取 README 和完整的 fractal.js。完整的三文件 Three.js 程序化射击沙盒，导入 Tone.js 和 Three.js CDN。未发现计分、失败或明确的胜利循环；契合度弱于已完成游戏案例；没有宣传在线 URL。暂缓收录，而不是将交互式图形原型呈现为已完成的游戏。
- aideink/game.snake、game.flappy、game.tetris：第一手 README 表示在 aide.ink 中创建；这不是使用 Aider 的证明。不将其错误标注为 Aider 示例。
- zhaojch1/deepseek_game_rts：已获取完整 README；主要描述运行时 LLM 战略对手和架构，而非清晰的 AI 辅助开发披露。予以排除，避免混淆 AI 玩法与 AI 制作的游戏。
- liuhuize0711git/astrovoid-game：完整项目、在线部署指南、可下载源代码；只有仓库描述 gemini_game 和 AI Studio 脚手架的暗示。具体的第一手开发归因不足；暂缓。
- showblue/mario_game：作者描述表示由 Gemini AI 创建，但 README 仅有一行，且未宣传在线演示。因文档较弱而暂缓。
- KilledByAPixel/LittleJS-AI / LittleJSArcade：50 多款源代码完整的单文件游戏，主要工具包 README 表示游戏使用这些工具制作，但个别游戏的 AI 来源不明。是很好的未来研究池；没有不加区分地计入所有游戏。
- Replit／Devpost／Reddit 结果（ColorChase、Epic Dev Battles、Mercenary Company、Tiny Skies）：可能存在创作者 AI 披露，但本轮没有发现经过核实的完整公开源代码。不仅凭视频／截图添加。
- JaniDhruv/the-imitation-game：发现了第一手 Antigravity 开发披露；可运行的完整项目需要 API 密钥，且属于文本审讯游戏，而不是明确的 2D／3D 视觉游戏。暂缓。

## 更广泛的发现来源

- <https://github.com/lappemic/awesome-ai-built-games> — 已获取完整 README；当前约有 70 多款人工精选游戏，带有工具／引擎线索；链接多数指向已部署游戏，而非完整源代码。主智能体可将其作为单独的发现目录展示。
- <https://itch.io/jam/ai-browser-game-jam> — 定期举办的 AI 浏览器游戏创作赛；源代码要求需要逐项核实。
- <https://vibejam.com/> — 广泛的投稿池；AI 游戏声明必须逐项核查。
- <https://vibecode.game/> — 工具／引擎目录。
- GitHub 仓库搜索：game "gemini cli"、game deepseek in:description language:JavaScript、game "gemini" in:description language:HTML、game "aider" in:description language:JavaScript、game "cursor" in:description language:JavaScript。

编写了八个条目；来自三个源代码合集的六个不同游戏实现，加上两个独立的 DeepSeek 案例。全部八个均保留 complete-project 范围。面向整个合集的披露明确说明，最终游戏版本未与经过核实的确切模型绑定。使用 ai-assisted 类别，避免夸大全自主生成程度。

## 截图质量保证已完成（同日）

八张 1280×720 的真实浏览器渲染 PNG 位于 `/tmp/gamemap-diverse-previews/<case-id>.png`；元数据为 `/tmp/gamemap-diverse-previews/metadata.json`；联系表为 `final-contact.png`。没有保留仅有标题或仅有加载画面的图像。由于没有 Browser 插件／技能，使用了已安装的 Playwright。每张保留的截图均经过目视检查。

- Shooter：开始游戏 → 按住 Space → 向左移动；敌人和射击可见；没有页面错误。
- Derby：已经处于运行中的竞技场 → 用 WASD 驾驶玩家 1；碰撞／粒子效果可见；没有页面错误。
- Beach Kitty：闯关模式的开始游玩 → Sunny Shore → 用 Space 跳跃；猫咪／海滩玩法场景可见；没有页面错误。
- Pirate Fleet：WASD 移动使世界坐标从 (0,0) 变为 (4,-4)；处于活动中的舰队／经济视图；没有页面错误。
- Kymograph：初始化系统 → 出现第一个信号谜题和控件；没有页面错误。
- Snake：按下开始 → ArrowDown/ArrowLeft 改变方向；处于活动中的蛇／食物棋盘；没有页面错误。GitHub Pages 重定向至创作者域名；直接访问 <https://twitchcaptain.com/snake/> 有效。元数据 sourceUrl 仍为作者链接的 Pages 演示 URL，finalUrl 记录目标地址。
- Mini KSP：下载公开仓库提交 de38be79fe88a72e87c4f170bdae76147923c9f0，在 localhost:8867 提供服务；新游戏 → 跳过教程 → 将第一级燃料减少到一箱、第二级减少到零 → 发射 → 提高推力。截取了实际飞行界面和首次发射成就；没有页面错误。来源类型为 local-capture，sourceUrl 为仓库。没有修改代码，也没有使用 API。集成后可停止服务器。
- Pumpkin Hunt：点击开始后显示实际的 Three.js 森林和 HUD。无头 macOS Chromium 拒绝指针锁定，抛出 WrongDocumentError：此元素的根文档不适用于指针锁定。因此确认了场景渲染；移动／手电仍未核实。窗口模式尝试在导航期间关闭。截取了如实呈现、没有标题的森林场景；未注入玩法状态。这是一个自动化限制，记录于第一手 Playwright 问题 <https://github.com/microsoft/playwright/issues/20956> ，维护者指出原因是 macOS 渲染视图未获得焦点。主智能体可将其保留为附有限制说明的场景预览，或在手动桌面游玩后替换。
