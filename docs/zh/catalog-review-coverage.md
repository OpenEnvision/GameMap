# 资源目录核查覆盖情况

跟踪资源描述、产物可用性及使用条款的修正。每条记录列明所核查的主张、支持来源及尚存问题。

核查基线：`5b4735422f7eb22b405f49f6e4b124a9e9bb2143`；共 109 张资源卡片。

## 实质性修订

- 区分 SolarRenderer 和 HY-Motion 的代码、检查点及数据集条款；保留 Stable Audio 的访问门槛
- 区分 GameFactory 的研究模块与已发布的数据集工具、Oasis 的检查点推理与托管演示，以及 SolarWM 的骨干网络、阶段和数据可用性
- 将 Phaser 示例修正为当前 Phaser 4 README 的情况，保留代码与美术素材的许可区别，并采用 Holodeck 首次预印本的年份
- 限定 GameEngineBench 的 LLM 评判成功协议及尚未解决的仓库访问问题；区分 GameGPT 的论文产物与 OpenGame 的框架、模型及评估器可用性
- 保留特定版本的智能体／桥接行为、就绪条件及权限差异，而不将 MCP 或兼容 API 视为功能完全对等
- 记录 Scenario 测试版 MCP 的完成／取消边界，以及 modl.ai 针对具体游戏所需的准备工作

## 逐卡覆盖情况

下方来源链接标明核查入口；各字段的确切支持链接仍保留在资源卡片或配套说明中。范围标签描述实际阅读情况，并不表示执行过。

| 稳定 ID                           | 结论 | 阅读范围                 | 一手来源                                                                                                                           |
| ------------------------------- | -- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `agent-skills-format`           | 保留 | 已阅读来源                | [来源](https://agentskills.io/home)                                                                                              |
| `agents-md`                     | 保留 | 已阅读来源                | [来源](https://agents.md/)                                                                                                       |
| `aider`                         | 保留 | 已阅读来源                | [来源](https://github.com/Aider-AI/aider)                                                                                        |
| `claude-agent-sdk`              | 修订 | 已阅读来源                | [来源](https://code.claude.com/docs/en/agent-sdk/overview)                                                                       |
| `claude-code`                   | 修订 | 已阅读来源                | [来源](https://code.claude.com/docs/en/overview)                                                                                 |
| `cline`                         | 保留 | 已阅读来源                | [来源](https://github.com/cline/cline)                                                                                           |
| `codex`                         | 修订 | 已阅读来源                | [来源](https://developers.openai.com/codex/cli)                                                                                  |
| `codex-browser-games`           | 保留 | 已阅读来源                | [来源](https://learn.chatgpt.com/use-cases/browser-games)                                                                        |
| `deepseek-agent-integrations`   | 修订 | 已阅读来源                | [来源](https://api-docs.deepseek.com/guides/anthropic_api/)                                                                      |
| `gemini-cli`                    | 修订 | 已阅读来源                | [来源](https://github.com/google-gemini/gemini-cli)                                                                              |
| `godot-mcp`                     | 保留 | 已阅读来源                | [来源](https://github.com/Coding-Solo/godot-mcp)                                                                                 |
| `mcp-for-blender`               | 修订 | 已阅读来源                | [来源](https://github.com/ahujasid/mcp-for-blender)                                                                              |
| `mini-swe-agent`                | 修订 | 已阅读来源                | [来源](https://github.com/SWE-agent/mini-swe-agent)                                                                              |
| `opencode`                      | 修订 | 已阅读来源                | [来源](https://opencode.ai/docs/)                                                                                                |
| `openhands`                     | 保留 | 已阅读来源                | [来源](https://github.com/OpenHands/OpenHands)                                                                                   |
| `openhands-sdk`                 | 保留 | 已阅读来源                | [来源](https://github.com/OpenHands/software-agent-sdk)                                                                          |
| `playwright-mcp`                | 修订 | 已阅读来源                | [来源](https://github.com/microsoft/playwright-mcp)                                                                              |
| `unity-mcp`                     | 修订 | 已阅读来源                | [来源](https://github.com/CoplayDev/unity-mcp)                                                                                   |
| `unity-mcp-skill`               | 修订 | 已阅读来源                | [来源](https://github.com/CoplayDev/unity-mcp/blob/main/unity-mcp-skill/SKILL.md)                                                |
| `unreal-mcp`                    | 修订 | 已阅读来源                | [来源](https://github.com/chongdashu/unreal-mcp)                                                                                 |
| `blender`                       | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/blender/blender)                                                                                       |
| `blender-python-quickstart`     | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst)                                      |
| `catlike-coding-movement`       | 修订 | 已阅读一手来源的相关章节         | [来源](https://catlikecoding.com/unity/tutorials/movement/surface-contact/)                                                      |
| `epic-developer-community`      | 保留 | 仅打开页面外壳              | [来源](https://dev.epicgames.com/community/unreal-engine)                                                                        |
| `gdquest-first-2d-game`         | 修订 | 已阅读一手来源的相关章节         | [来源](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/)                                                   |
| `gltf-blender-io`               | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/KhronosGroup/glTF-Blender-IO)                                                                          |
| `godot-command-line`            | 修订 | 已阅读一手来源的相关章节         | [来源](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)                                       |
| `godot-demo-projects`           | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/godotengine/godot-demo-projects)                                                                       |
| `godot-engine`                  | 保留 | 已阅读一手来源的相关章节         | [来源](https://docs.godotengine.org/en/stable/)                                                                                  |
| `godot-gut`                     | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/bitwes/Gut)                                                                                            |
| `phaser`                        | 保留 | 已阅读一手来源的相关章节         | [来源](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game)                                              |
| `phaser-examples`               | 修订 | 已阅读一手来源的相关章节         | [来源](https://github.com/phaserjs/examples)                                                                                     |
| `react-three-fiber`             | 保留 | 已阅读一手来源的相关章节         | [来源](https://r3f.docs.pmnd.rs/getting-started/introduction)                                                                    |
| `threejs`                       | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/mrdoob/three.js)                                                                                       |
| `threejs-crowd-experience`      | 保留 | 已阅读一手来源的相关章节         | [来源](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928)                    |
| `threejs-examples`              | 保留 | 页面外壳及作者仓库的佐证         | [来源](https://threejs.org/examples/)                                                                                            |
| `unity-2d-techdemos`            | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/Unity-Technologies/2d-techdemos)                                                                       |
| `unity-engine`                  | 保留 | 已阅读一手来源的相关章节         | [来源](https://docs.unity3d.com/Manual/index.html)                                                                               |
| `unity-test-framework`          | 保留 | 已阅读一手来源的相关章节         | [来源](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html)                     |
| `unreal-automation-tests`       | 保留 | 已阅读一手来源的相关章节         | [来源](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine)                   |
| `unreal-engine`                 | 修订 | 已阅读一手来源的相关章节         | [来源](https://dev.epicgames.com/documentation/en-us/unreal-engine)                                                              |
| `unreal-lyra`                   | 保留 | 已阅读一手来源的相关章节         | [来源](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)                            |
| `agent-game-forge`              | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/0x0funky/agent-game-forge)                                                                             |
| `agent-sprite-forge`            | 修订 | 已阅读一手来源的相关章节         | [来源](https://github.com/0x0funky/agent-sprite-forge)                                                                           |
| `blenderllm`                    | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/FreedomIntelligence/BlenderLLM)                                                                        |
| `cardiverse`                    | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/danruili/Cardiverse)                                                                                   |
| `gamedevbench`                  | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/waynchi/gamedevbench)                                                                                  |
| `gameenginebench`               | 修订 | 已阅读一手来源的相关章节         | [来源](https://arxiv.org/abs/2607.03525)                                                                                         |
| `gamefactory-3a`                | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/OpenDCAI/GameFactory-3A)                                                                               |
| `gamegen-verifier`              | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/NetX-lab/GameGen-Verifier)                                                                             |
| `gamegpt`                       | 修订 | 已阅读一手来源的相关章节         | [来源](https://arxiv.org/abs/2310.08067)                                                                                         |
| `gamexpert-bench`               | 保留 | 已阅读一手来源的相关章节         | [来源](https://arxiv.org/abs/2608.21833)                                                                                         |
| `gavel`                         | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/gdrtodd/gavel)                                                                                         |
| `godot-3d-asset-skill`          | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/LuigiDeFacci/godot-create-3d-assets)                                                                   |
| `holodeck`                      | 修订 | 已阅读一手来源的相关章节         | [来源](https://github.com/allenai/Holodeck)                                                                                      |
| `hunyuan3d-2`                   | 修订 | 已阅读一手来源的相关章节         | [来源](https://github.com/Tencent-Hunyuan/Hunyuan3D-2)                                                                           |
| `infinigen`                     | 保留 | 已阅读一手来源，未重新核验导出细节    | [来源](https://github.com/princeton-vl/infinigen)                                                                                |
| `mariogpt`                      | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/shyamsn97/mario-gpt)                                                                                   |
| `mcp-unity`                     | 修订 | 已阅读一手来源的相关章节         | [来源](https://github.com/CoderGamester/mcp-unity)                                                                               |
| `opengame`                      | 修订 | 已阅读一手来源的相关章节         | [来源](https://github.com/leigest519/OpenGame)                                                                                   |
| `pixellab`                      | 保留 | 已阅读一手来源的相关章节         | [来源](https://www.pixellab.ai/mcp)                                                                                              |
| `text2game`                     | 保留 | 直接读取受阻，仅查看已索引的一手样本   | [来源](https://github.com/boltomli/t2g)                                                                                          |
| `trellis`                       | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/microsoft/TRELLIS)                                                                                     |
| `triposr`                       | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/VAST-AI-Research/TripoSR)                                                                              |
| `unity-agent-plugin`            | 保留 | 已阅读一手来源的相关章节         | [来源](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin)                                                          |
| `video2game`                    | 保留 | 已阅读一手来源的相关章节         | [来源](https://github.com/video2game/video2game)                                                                                 |
| `elevenlabs-sfx`                | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://elevenlabs.io/docs/overview/capabilities/sound-effects)                                                           |
| `hy-motion`                     | 修订 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://github.com/Tencent-Hunyuan/HY-Motion-1.0)                                                                         |
| `meshy`                         | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://docs.meshy.ai/en)                                                                                                 |
| `scenario`                      | 修订 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://mcp.scenario.com/docs/tools/job-cancel)                                                                           |
| `stable-audio-open`             | 修订 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://huggingface.co/stabilityai/stable-audio-open-1.0)                                                                 |
| `autoue`                        | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://github.com/Pluto156/AutoUE)                                                                                       |
| `convai`                        | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://convai.com/)                                                                                                      |
| `modl-ai`                       | 修订 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://modl.ai/)                                                                                                         |
| `regression-games`              | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://github.com/Regression-Games/RGUnityBots)                                                                          |
| `unigen`                        | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://github.com/yxwan123/UniGen)                                                                                       |
| `unity-addressables-scripting`  | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/build-scripting-start-build.html)                    |
| `unreal-gauntlet`               | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine?lang=en-US) |
| `unreal-remote-control`         | 修订 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine)                                   |
| `windows-ui-automation`         | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview)                                   |
| `elevenlabs-music`              | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://elevenlabs.io/docs/overview/capabilities/music)                                                                   |
| `elevenlabs-speech`             | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)                                                          |
| `openai-image-api`              | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://developers.openai.com/api/docs/guides/image-generation)                                                           |
| `tripo-generation-api`          | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html)                                                    |
| `directx-shader-compiler`       | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://github.com/microsoft/DirectXShaderCompiler)                                                                       |
| `fastnoise-lite`                | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://github.com/Auburn/FastNoiseLite)                                                                                  |
| `msdf-atlas-gen`                | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://github.com/Chlumsky/msdf-atlas-gen)                                                                               |
| `playwright-test`               | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://playwright.dev/docs/test-snapshots)                                                                               |
| `xbox-accessibility-guidelines` | 保留 | 一手页面的相关章节；对改动处定向查阅细节 | [来源](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)                                                          |
| `code-world-model-brain`        | 修订 | 已阅读来源                | [来源](https://arxiv.org/abs/2608.25927)                                                                                         |
| `coder-world-model`             | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2609.26458)                                                                                         |
| `cwm-general-game-playing`      | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2510.04542)                                                                                         |
| `diamond`                       | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2405.12399)                                                                                         |
| `factorsim`                     | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2409.17652)                                                                                         |
| `gamefactory`                   | 修订 | 已阅读来源                | [来源](https://arxiv.org/abs/2501.08325)                                                                                         |
| `gamengen`                      | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2408.14837)                                                                                         |
| `genie`                         | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2402.15391)                                                                                         |
| `genie-3`                       | 保留 | 已阅读来源                | [来源](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)                                                    |
| `gif-mcts-cwm`                  | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2405.15383)                                                                                         |
| `magpie-renderer`               | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2608.27168)                                                                                         |
| `marble`                        | 保留 | 已阅读来源                | [来源](https://www.worldlabs.ai/blog/marble-world-model)                                                                         |
| `oasis`                         | 修订 | 已阅读来源                | [来源](https://oasis-model.github.io/)                                                                                           |
| `poe-world`                     | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2505.10819)                                                                                         |
| `programmable-world-model`      | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2609.10540)                                                                                         |
| `solarrenderer`                 | 修订 | 已阅读来源                | [来源](https://enderfga.cn/SolarRenderer/)                                                                                       |
| `solarwm`                       | 修订 | 已阅读来源                | [来源](https://arxiv.org/abs/2609.02886)                                                                                         |
| `streamrender-h3`               | 修订 | 已阅读来源                | [来源](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)                                                                |
| `wonderworld`                   | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2406.09394)                                                                                         |
| `worldcoder`                    | 保留 | 已阅读来源                | [来源](https://arxiv.org/abs/2402.12275)                                                                                         |

## 文档与导航覆盖情况

已对原有的全部 31 份 Markdown 文档检查本地目标，并检查本地 Markdown 片段是否具有匹配标题。已检查生成的公开副本中的扁平化路径。未发现缺失的本地目标或重复的主要卡片 URL。这些结构检查不能证明外部链接仍可用，也不能证明每项事实陈述均正确。

已将现有的引擎、游戏 AI、智能体及世界模型说明与相应卡片一并核查，并按需修正。两份生成式专题档案针对新增的 HY-Motion 和 Scenario 行接受了定向核查。本轮 **并未对更广泛的研究专题档案集合重新进行全面、逐项主张的审计** ；早前的来源核查仍属于带日期的证据，更广泛的复查仍待开展。

优先后续事项：采用前重新核查可变的提供商条款和发布矩阵；将固定来源的行为与当前版本比较；重新访问无法访问的仓库，不将获取失败视为永久移除的证明；按连贯的主题批次审计其他专题档案的主张。运行时兼容性、商业使用许可、性能和游戏玩法正确性仍需范围单独界定的证据。

## 后续专题档案主张审计

2026-10-18 后续开展的一轮仅来源核查检查了选定的重要主张，而非重复卡片清单。下列范围为主张组，不是去重后的资源数量，也不是对整份文档的认证。

| 专题档案组                                                                                                                                                | 实际核查范围                                                       | 实质性结果及尚存限制                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| [生产调试](production-debugging-contracts.md)、[资产验证](asset-validation-contracts.md)、[原生操作](native-operation-details.md)、[工作单](production-work-orders.md) | 31 个定向组，涵盖捕获／版本约束、帧总体、序列化、音频回调、资产格式、许可及测量假设                  | 将 Wwise 限定于所恢复的 2017.2.0 头文件；限定 Nsight 测试版／注入的先决条件、UnityDataTools 和 glTF Transform 的许可、OIDN 异步／取消及单声道响度。其他操作和拟议验收夹具未执行，也未全面重新验证。 |
| [视觉反馈](visual-feedback-mechanisms.md)、[资产选择](asset-selection-feedback.md)、[视觉清单](visual-evidence-research.md)、[来源修订](source-revision-notes.md)       | 已核查 14 组；保留一项受阻的来源阅读，以及三个未解决的指标／发布／权利问题                      | 澄清不一致的缺陷帧计数、GliDe 的软评分／匹配对分母、V\* 重新训练的基线及 SceneSmith 并列／成本条件。恢复六个不可变来源文件，其指纹与先前匹配。不可用来源及未解决的许可仍属未知。                              |
| [提供商边界](generative-api-boundaries.md)、[交付契约](generation-delivery-contracts.md)、[工具综述](generative-tools-research.md)                                  | 九个定向一手页面组：Meshy、Luma、Runway、ElevenLabs、Tripo、Rodin 和 Firefly | 现有的限定范围条款、保留期和任务状态综述与所检查章节一致。补充 Firefly 教程中不一致的模型 ID 键，以及基于状态的轮询没有上限这一注意事项。这并非完整的协议条款审查或 API 测试。                                 |

指标保留其原始评估总体、评判者及分母。来源快照标识的是所阅读的证据，而不是已安装的 SDK 或当前兼容性保证。许可描述不判定特定项目是否符合使用资格。

## 游戏玩法、基准身份与动作后续核查

又一轮定向核查检查了叙事／状态契约及基准发布主张背后的证据。引擎／游戏玩法／工作室核查涵盖 30 个主张组，其余未核查的操作被明确排除在此范围之外。修正保留 Yarn Unreal 的预发布状态、Unity 的观察者／重置行为、历史上 League 的确定性假设，以及 Nakama 的结果与提交边界。一个受到严格限定的重试耗尽边缘情况属于在所引提交上的静态源码分析，而非已复现的服务器缺陷。

基准核查涵盖 18 个已检查组、一个已记录的复现阻碍、四项未知及两个明确未核查组。核查修正了缺乏依据的 SWE-Game 论文／目录关联：名称相似但任务总体不同的资源，不能证明彼此已经发布。OpenGameEval 的论文明确描述了其私有会话驱动程序／系统提示词及纯文本观察条件。这些已发表的限制与未经测试的在线服务行为分别保留。WebGameBench 的质量比率以有效标签为条件，需要另列覆盖率分母；JAMER 的离线模型生成配置及印刷版中不一致的 BAS 维度计数仍作为明确限制保留。恢复的 OpenGameEval 来源固定版本并未固定其私有托管服务。

针对[测试库](game-testing-library.md)的定向动作核查验证了 100STYLE 的演员／帧率／许可范围、AMASS 的用途／分发限制及 SMPL-Body 子集边界。100STYLE 的各风格均由同一位演员表演，因此留出风格的划分不能证明对未见表演者的泛化能力。由于获取超时，无法刷新 CMU 来源；这不能证明其已移除或条款已变更。测试库其余条目未获重新认证。

## 专门网站集合：夹具与接口核查

本次后续核查检查专门测试集合和智能体集合中的选定主张；这些集合独立于上文的 109 张主目录卡片。来源检查不认证安装后可玩、智能体执行安全，亦不确认特定复用的权利。

七个资产库条目接受了定向许可／访问核查。其中三个有所修订：Quaternius 现记录所引示例包中随版本变化的骨骼、Unreal 导出、帧率及根运动改动；Fab 区分仅引用访问与源格式交付；OpenGameArt 区分预览权利与所下载资产的许可。Kenney、Poly Haven、ambientCG 和 Unity Asset Store 保留其已核查的限定范围描述。这些核查涵盖所引章节，并非每项上架内容或完整法律协议。

二十个游戏项目／环境条目接受了限定范围的来源核查；其中十三个在接口、版本、设置或许可方面有所修订。包括区分 MiniGrid 可见性包装器、Crafter 特权元数据、Craftax 自动重置输出、NLE／GodotRL 种子路径及 ML-Agents 决策时序。来源固定版本标明的是所检查代码，而非已安装版本。两项访问核查受阻：SuperTux 浏览器 URL 返回 502，Luanti ContentDB 路径显示机器人验证。另有独立官方来源可用，因此这两项结果均不能证明资源已移除。

| 测试条目                           | 结论 | 已核查范围                                                                                                                                                  |
| ------------------------------ | -- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `minigrid`                     | 修订 | Python／操作系统支持及 Gymnasium 接口；Apache-2.0 仓库声明；部分与全幅 RGB 包装器；重置种子及分开的 terminated／truncated 返回值                                                            |
| `crafter`                      | 修订 | 经典 Gym reset／step 契约；构造函数种子加递增的回合计数器；特权 info 与 RGB 观察的区分；动作记录要求 save_episode；仓库 MIT 声明及已注册环境 ID                                                        |
| `craftax`                      | 修订 | 显式像素／符号及经典／完整工厂变体；自动重置以后一回合的观察／状态替换；JAX 密钥使用及不自动重置警告；1.5.0 和 1.6.0 已记录的游戏玩法／奖励勘误；仓库 MIT 声明                                                             |
| `vizdoom`                      | 修订 | Wheel 的平台／版本注意事项；Gymnasium frame_skip、可用按钮空间、reset(seed) 及超时标志；原始 ViZDoom 代码与 ZDoom 组件，以及 Freedoom／原始 WAD 的区别                                          |
| `nethack-learning-environment` | 修订 | 受维护的源码、NetHack 3.6.7 基线及构建先决条件；观察键与动作配置；在所检查的重置代码中，Gymnasium seed 不直接设置 NetHack 核心／显示 RNG；显式 seed／reseed／lgen 接口、日历效应选项及 NetHackChallenge 例外；NGPL 仓库声明 |
| `godot-rl-agents`              | 修订 | 编辑器／.NET 快速入门及平台支持措辞；启动二进制程序会发送 env_seed；reset(seed) 不发送种子；桥接接口不能证明场景重置／回放具有确定性；MIT 工具包声明及单独的 Cartoon Plane CC BY 4 署名要求                               |
| `unity-ml-agents`              | 修订 | 发布兼容性指导及开发版不稳定性；Apache-2.0 工具包声明；Release 23 低层 API：行为／智能体 ID、决策批次、终止批次及可变 Python 步时长                                                                   |
| `godot-demos`                  | 修订 | 源码分支与匹配引擎的指导；MIT 仓库声明；官方网页在 master 的每次提交后重新部署，并排除不受支持的演示                                                                                               |
| `supertux`                     | 保留 | 源码中的玩法／操作概述及构建文档入口；GPLv3 仓库许可文本及 README 的 CC-BY-SA 数据声明；官方下载页链接至托管浏览器构建，并列出桌面稳定版 0.7.0／可下载 WebAssembly 版 0.6.3                                         |
| `endless-sky`                  | 保留 | 官方源码构建／发布渠道及插件支持；默认 GPL-3+ 及逐文件美术作品版权清单；Steam 免费上架                                                                                                     |
| `ddnet`                        | 保留 | 源码构建／发布渠道；zlib 项目代码及数据许可例外；Steam 免费上架                                                                                                                  |
| `wesnoth`                      | 修订 | GPLv2-or-later 代码声明；copyright 不是资产清单；copyrights.csv 是文件级清单；官方政策区分核心 GPL／CC BY-SA 美术作品与可能含 NC／ND 的附加内容；已获取 Steam 产品页来源                                  |
| `mindustry`                    | 保留 | Java／Gradle 构建指导及 GPLv3 仓库声明；作者 itch 页面采用自定价格，并列出桌面／服务器程序包                                                                                             |
| `openttd`                      | 保留 | GPLv2 加依赖项例外，基础包需单独安装；2026 年 3 月 14 日官方 Steam／GOG 变更取代过时 README 中免费商店的措辞；官网仍免费；Steam／GOG 新获取用户采用付费捆绑包渠道                                                |
| `supertuxkart`                 | 修订 | GPLv3-or-later 的代码适用范围；混合数据许可及逐目录 licenses.txt 记录；官方许可指导要求记录资产来源                                                                                       |
| `luanti-minetest-game`         | 修订 | 游戏仅维护，采用滚动发布及旧版稳定标签；游戏媒体 CC BY-SA 3.0 及代码 LGPL2.1 声明；引擎许可已在固定版本的 luanti-org/luanti LICENSE.txt 中单独核查                                                   |
| `red-eclipse`                  | 保留 | zlib 项目代码及单独的内容声明；没有明确内容声明时默认为 CC BY-SA 4.0-or-later；存在许可清单；Steam 免费，并宣传 Windows／Linux，不含 macOS                                                        |
| `zero-k`                       | 修订 | 游戏模块仓库声明为 GPLv2；README 明确排除基础设施、工具及美术作品来源；需单独的大厅程序；已获取 Steam 产品页来源                                                                                     |
| `unity-boatattack`             | 修订 | 源码要求 Git LFS；固定来源中的 ProjectVersion 为 2020.3.23f1；构建播放器前须构建 Addressables；依赖 Unity 的项目适用 Unity Companion License                                         |
| `unreal-lyra`                  | 保留 | 官方文档获取途径及兼容引擎要求；Fab 上架项标为免费、UE-Only 及“允许用于 AI：否”；现有卡片恰当地避免将该 AI 字段解读为全面禁止编程辅助                                                                          |

三十项智能体接口资源接受了一手来源抽查；其中十项接受了更深入的执行／权限／验证边界核查并有所修订，其余二十项仅接受有限来源核查。[接口证据说明](agent-interface-evidence.md)将这十项变更对应至确切来源修订。没有条目接受全面的逐项主张重新认证或运行时验证。静态解析器／身份验证／路径方面的观察仍是特定修订版本的源码分析。

## 其余动作与创作者案例后续核查

后续核查检查了前一轮四条目核查之外的五个动作条目。Kenney Animated Characters、Quaternius Universal Animation Library 及明确标注日期的 Mixamo 条款保留其限定范围描述。LaFAN1 现列明其提供的过渡指标、30 fps 及留出表演者的划分，并区分非商业改编与分享改编后数据。SMPL-Model 现列明具体获准用途、再分发／商业训练限制及注册要求。这些变更经过独立来源核查；未获取或重定向任何动作文件。此前 CMU 来源刷新受阻的问题仍未解决，原始数据权利也不自动涵盖关联的网格或工具。

创作者案例核查将客户端／模型归属、源码可用性及启动说明，与托管运行时验证分开。Vibe Jet 的本地操作方案现包括静态文件服务器和 WebSocket 进程；客户端连接 localhost 并不能证明服务器仅绑定回环地址。证据：[设置 README](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/README.md)、[程序包脚本](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/package.json)、[服务器](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/server.js)及[浏览器客户端](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/game.html)。该来源核查未证明当前托管版本可用。

Dinosaur Game Offline 保留了明确注明归属的历史目录报告，内容涉及 Chromium 冒烟测试及跳跃捕获。[继承卡片](https://github.com/OpenEnvision/GameMap/blob/617556b5e193cecbd144bb2f702dc10c82fe8e9e/website/src/data/geminiCliCases.ts)包含该报告；本次核查无法取得底层运行记录。来源检查支持操作方式和创作者归属，而非对先前试玩的独立验证。未进行新的浏览器游戏玩法测试。

所有 44 个创作者案例条目分两轮接受了限定范围的归属／来源／启动核查，每轮 22 个，互不重叠。现有客户端与模型的对应关系得到保留。Vibe Jet 的启动操作方案有所变更，Dinosaur 的历史运行报告增加了限定说明。这并不验证作者身份、自主生成、每份源文件、当前托管版本的可玩性或实际游戏玩法。四个 OpenGame 案例通过展示库证据及 Git LFS 归档元数据进行了核查；未下载或检查归档内容。两项托管文本读取（Ombres 和 FragArena）未得出结论，未据此推断服务中断。

| 创作者案例 ID                          | 核查结论      | 抽查的一手证据                                                                                                                                                        |
| --------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent-arcade-copilot`            | 保留归属／来源描述 | [来源](https://github.com/DanWahlin/agent-arcade/blob/99b7466f0d911652aff24843641cfb59e67be38b/README.md)                                                        |
| `bash-fighter-agent`              | 保留归属／来源描述 | [来源](https://github.com/Bash-Entertainment/bash-fighter/blob/ad414e2548ef1255c6fd303965ecfc7dfea5f422/README.md)                                               |
| `beach-kitty-ai-campaign`         | 保留归属／来源描述 | [来源](https://github.com/matthewod11-stack/CatRunner/blob/1a76234d8ebb4acec2ff2fb954c01ff04f56ed1b/README.md)                                                   |
| `claude-agent-team-tetris`        | 保留归属／来源描述 | [来源](https://github.com/caiguanhao/tetris/blob/b8c0f68017c0d08702027839b42bdafebdb79e93/README.md)                                                             |
| `claude-mini-snake`               | 保留归属／来源描述 | [来源](https://github.com/BizShibe/claude-ai-mini-snake-game/blob/b7859f51c909f1862aa9299451477060ec20a526/README.md)                                            |
| `claude-tower-defense`            | 保留归属／来源描述 | [来源](https://github.com/mdkess/claude-game/blob/8b02fe3de81755536d8cb7376fc47db093a8ae00/README.md)                                                            |
| `cloud-crush-gemini-cli`          | 保留归属／来源描述 | [来源](https://github.com/GoogleCloudPlatform/devrel-demos/blob/fc49cc3531ec79fb142b6300b0a45fe3693556f9/codelabs/gemini-cli/gemini-cli-match3-golang/README.md) |
| `cursor-destruction-derby`        | 保留归属／来源描述 | [来源](https://github.com/littleearth/vibe-coded-games/blob/093a84e31a20a55fa896f177eb7dfe1e68ad8a74/README.md)                                                  |
| `cursor-procedural-platformer`    | 保留归属／来源描述 | [来源](https://github.com/commjoen/generated-game-experiment/blob/0f5a0cdaa0742ecdfeb12f1572676d1e82042688/README.md)                                            |
| `cursor-space-shooter`            | 保留归属／来源描述 | [来源](https://github.com/littleearth/vibe-coded-games/blob/093a84e31a20a55fa896f177eb7dfe1e68ad8a74/README.md)                                                  |
| `deepseek-mini-ksp`               | 保留归属／来源描述 | [来源](https://github.com/BairlyEmei/mini-ksp/blob/de38be79fe88a72e87c4f170bdae76147923c9f0/README.md)                                                           |
| `deepseek-neon-snake`             | 保留归属／来源描述 | [来源](https://github.com/TwitchCaptain/snake/blob/3c7f8e947412598c67d6a0b61ed1a5cc7ed32935/README.md)                                                           |
| `dinosaur-offline-gemini-cli`     | 限定历史测试来源  | [来源](https://github.com/tonidevvn/dinosaur-game-offline/blob/e0f3f584751bb80425bd49513fa7b54503f13d62/README.md)                                               |
| `dragons-reach-claude`            | 保留归属／来源描述 | [来源](https://github.com/jaydemks/ImADragon_onepromptcode_game/blob/e898e72ae95c31391cbe7c046fa5d6f04ba3e438/README.md)                                         |
| `dunkirk-ai-assisted`             | 保留归属／来源描述 | [来源](https://github.com/Ponloe/dunkirk-godot/blob/fa0858d1647b0a15f6d84d8d6b3b93262e3fb07c/README.md)                                                          |
| `flux-codex-runner`               | 保留归属／来源描述 | [来源](https://github.com/scriptedbyshivam/codex-hackathon-2026/blob/a0df87d73e2a77d9a4c3b88d52e22229a6dc6256/README.md)                                         |
| `fragarena-copilot`               | 保留归属／来源描述 | [来源](https://github.com/jonnyleigh/fragarena/blob/6487c94ab558fe78ccb7db997004ff7cba00646e/README.md)                                                          |
| `garden-match-agents`             | 保留归属／来源描述 | [来源](https://github.com/kevinchenkai/GameAI/blob/8bb87ee5c2698922f79f9b277d97b1392f38d0e2/README.md)                                                           |
| `gemini-kymograph`                | 保留归属／来源描述 | [来源](https://github.com/JoeySalmons/vibe-coded-games/blob/e62764a6bef23095984f866a15ed646682d6c912/README.md)                                                  |
| `gemini-pirate-fleet`             | 保留归属／来源描述 | [来源](https://github.com/JoeySalmons/vibe-coded-games/blob/e62764a6bef23095984f866a15ed646682d6c912/README.md)                                                  |
| `gemini-pumpkin-hunt`             | 保留归属／来源描述 | [来源](https://github.com/JoeySalmons/vibe-coded-games/blob/e62764a6bef23095984f866a15ed646682d6c912/README.md)                                                  |
| `gothicvania-codex`               | 保留归属／来源描述 | [来源](https://github.com/acatovic/gothicvania-codex-demo/blob/0d53658306f9565bdea20173fd4387e48ca6066c/README.md)                                               |
| `gravity-birds-grok-cursor`       | 保留归属／来源描述 | [来源](https://github.com/az9713/grokbot-game-dev-demo/blob/c19786fc5a43303ed5183a8563f518ccdfcaa0c0/README.md)                                                  |
| `long-wind-claude`                | 保留归属／来源描述 | [来源](https://github.com/jbang2004/long-wind/blob/1e9c4265ad2a7d06a174c8ac5f3ab64bc18252f3/README.md)                                                           |
| `michi-neko-ai`                   | 保留归属／来源描述 | [来源](https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path/blob/4a592079967c711ef2233b0b5fc2f43155922588/README.md)                                 |
| `moonlight-mayhem-codex`          | 保留归属／来源描述 | [来源](https://github.com/simonw/raccoon-heist-codex/blob/8969afe2141522079792effc0c018d154319ceef/README.md)                                                    |
| `nova-lancer-claude`              | 保留归属／来源描述 | [来源](https://github.com/tanuu5/nova-lancer/blob/dd5d3842609af266c1d3b6179ff03d09d0a66036/README.md)                                                            |
| `ombres-claude`                   | 保留归属／来源描述 | [来源](https://github.com/briossant/ombres/blob/403840d83740eee4e264e7a1cc04390b8d346787/README.md)                                                              |
| `opengame-arithmancy-card-battle` | 保留归属／来源描述 | [来源](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md)                                                           |
| `opengame-mandalorian-shooter`    | 保留归属／来源描述 | [来源](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md)                                                           |
| `opengame-marvel-platformer`      | 保留归属／来源描述 | [来源](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md)                                                           |
| `opengame-tower-defense`          | 保留归属／来源描述 | [来源](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md)                                                           |
| `operation-naptime-claude`        | 保留归属／来源描述 | [来源](https://github.com/alandaitch/operacion-siesta/blob/8157953526d0ff5a3d7c5b0a543f4c64dbb4c6bf/README.md)                                                   |
| `orb-shooter-ai`                  | 保留归属／来源描述 | [来源](https://github.com/theredstapler/orb-shooter/blob/29683f88ebdf304c159683be250be91b47911682/README.md)                                                     |
| `pixel-princess-claude`           | 保留归属／来源描述 | [来源](https://github.com/VTvito/pixel-princess-platformer/blob/ba20bc410b446c970df3c8fc10ad9fc31a425e28/README.md)                                              |
| `quasar-saz-claude`               | 保留归属／来源描述 | [来源](https://github.com/cleak/quasar-saz/blob/e56e93ea8c72cbe2ff9f1e754eb68f6829e6ae43/README.md)                                                              |
| `raccoon-heist-claude`            | 保留归属／来源描述 | [来源](https://github.com/simonw/raccoon-heist/blob/7f12841301bfb140d9c6b21c0a69fccb94b512bc/README.md)                                                          |
| `running-man-claude-pixellab`     | 保留归属／来源描述 | [来源](https://github.com/balbonits/ai-browser-game-demos/blob/a535c09029986ff62cc68a44fe35dbc29d022b79/README.md)                                               |
| `slide-rush-opus`                 | 保留归属／来源描述 | [来源](https://github.com/KJLKurt/waterslide-game-opus-5.5/blob/03bc5993750ba870f12de3c6086e15877b62de09/README.md)                                              |
| `the-tithe-claude`                | 保留归属／来源描述 | [来源](https://github.com/miguelsolorio/the-tithe/blob/da42501c6188fd897567b82d28695eb8d947c03c/README.md)                                                       |
| `tower-of-time-ai-build`          | 保留归属／来源描述 | [来源](https://github.com/maciej-trebacz/tower-of-time-game/blob/a2497fb8aaf497c25a9caa306ed7ac7129d2400b/README.md)                                             |
| `tron-exonix-claude`              | 保留归属／来源描述 | [来源](https://github.com/witnesstodark/tron-exonix/blob/e60a7570e63476294163e7729be69f1e2460670c/README.md)                                                     |
| `turbo-kart-rally-claude`         | 保留归属／来源描述 | [来源](https://github.com/bridge-mind/turbo-kart-rally/blob/c52aca3f10c7995884c316810cac6514daa40e9c/README.md)                                                  |
| `vibe-jet-gemini`                 | 修订启动说明    | [来源](https://github.com/cedrickchee/vibe-jet/blob/ba08f6e0533f757de4a5d0f8b019d15343edde8d/README.md)                                                          |

## OSSGameBench 发布专项核查（2026-10-18）

本次后续核查解决了 BC24 留待确认的作者链接发布身份问题。[评估专题档案](game-development-evaluation.md#adjacent-dataset-worth-retaining-not-an-agent-leaderboard)现区分 Zenodo v3 的发布日期与技术元数据日期，记录四文件清单及已验证的归档校验和，并限定记录级 CC-BY-4.0 权利。历史 v2 单独列有一个大型数据集归档，未下载。

已检查论文、发布元数据及小型收集／分析产物。静态源码核查发现嵌套分页上限，以及可能丢弃此前仅由正则表达式获取链接的链接清理路径；未测量已发布语料是否存在完整性缺陷。完整语料获取、上游权利清单、可执行的修复评估器、留出划分及污染控制仍未经验证。拟议适配门槛属于编辑建议，未执行基准或收集器。这是定向发布核查，而非对每项基准主张的全新审计。

## 测试框架选择方法专项核查（2026-10-18）

补充了有来源支持的[统计与评判边界](benchmark-reproducibility.md#harness-selection-statistical-independence-and-adaptive-feedback)：rliable 的 best-of-N 采样解释及具体 bootstrap API 路径、Thresholdout 的有界反馈假设，以及 MT-Bench／FastChat 的文本评判顺序检查。确切的 rliable 和 FastChat 代码修订与带版本论文一并链接。游戏生产采样、视觉评判控制及晋级规则仍明确属于拟议适配。本次核查不认证游戏评估器，不移用历史准确率／覆盖率，也不证明已执行、样本量充足、项目家族独立或受保护留出集保证成立。

## 程序化导航契约专项核查（2026-10-18）

将[引擎操作契约](engine-operation-contracts.md#navigation-after-procedural-world-edits)从请求接受扩展至查询完整性、端点投影、分片查询所有权、瓦片引用新鲜度及障碍物重建状态。本次核查采用固定版本的官方 Recast／Detour 源码，以及 Unity 6000.0 和实验性 Godot 4.5 文档。静态边缘情况明确未复现，也不推及引擎包装器。拟议的断连岛屿、错误楼层及受阻路线夹具仍未实现；不认证实际角色穿行、持久化、取消回滚或崩溃恢复。资产验证和生产缺口链接现指向这一更窄的证据范围。

## 动画采样与压缩专项核查（2026-10-18）

依据固定版本的 ozz-animation 0.17.0 及所检查的 ACL 2.1.99 develop 快照，新增[骨架兼容姿态与压缩门槛](asset-validation-contracts.md#animation-sampling-and-compression)。核查区分数量检查与关节身份、部分输出采样与完整姿态验收、优化器误差与最终解码误差，以及循环样本与根位移。已对官方头文件、实现、示例、指标指导及许可文件进行来源检查；独立核查抽查了重要主张。保留源码中关于顺序的注释差异，而非凭假设默默消除差异。拟议的骨架、蒙皮、接触、定位／缓存及循环夹具仍未实现。不声称执行过库、具备目标引擎兼容性、连续时间误差界限、性能比较或动作质量结果。

## 叙事与优化器执行契约专项核查（2026-10-18）

解决了此前 Yarn Godot 来源固定版本受阻的问题，并修订[游戏玩法状态契约](gameplay-state-contracts.md)：内部过期延续保护不会取消外部世界效果；拆卸／重入式结束可能遗漏终止信号；变量恢复并非原子游戏检查点。在现有已检查修订版本上新增 [GEPA 执行边界](benchmark-reproducibility.md#gepa-execution-controls-counts-caches-and-resumed-evidence)，区分迭代与提案任务、停止检查与准入控制、可调用的成本跟踪与实际支出，以及缓存／恢复的证据与独立试验。独立来源核查检查了重要主张，并修正了不同的新种子恢复路径。未运行上游软件、引擎、模型或评估；验收夹具仍属提案，针对特定用途的许可注意事项保持不变。

## 本地化与音频观察专项核查（2026-10-18）

依据 Unity Localization 1.5 文档及 Godot 4.5-stable 解析到的提交源码，新增[运行时语言区域变更边界](engine-operation-contracts.md#runtime-locale-changes-separate-string-delivery-rendering-and-accessibility)，区分被忽略的刷新请求、已交付字符串、已渲染布局及原生无障碍观察。依据 2.04 文档新增 [FMOD 事件与可听性边界](native-operation-details.md#distinguish-fmod-event-lifecycle-from-audible-completion)，区分回调、播放枚举、API 结果、暂停、显式抢占模式及 Core 与 Studio 虚拟化。独立核查检查了重要来源主张、时序限定和来源位置。这补充了现有字体／DOM／调度限制；未测试引擎、屏幕阅读器、音频运行时、物理设备、跨平台同步或许可授权。拟议夹具仍未执行。

## 内容包激活专项核查（2026-10-18）

新增 [Godot 4.4 补丁激活契约](production-work-orders.md#godot-44-content-patches-mounting-is-not-dependency-activation)，区分包挂载、路径替换、资源存在及热缓存依赖行为。官方 4.4 文档及固定版本的 4.4-stable 加载器源码佐证了普通忽略与深度忽略的区别；独立核查检查了来源／版本范围及单独的 C# 程序集加载要求。冷／热缓存、冲突及缺失依赖夹具仍未实现。不声称有运行时、回滚、签名信任、跨版本兼容性或确定性导出结果。

## GameASG-Bench 发布与评分专项核查（2026-10-18）

在检查现有目录、专题档案及候选语料库以排除重复身份后，新增 [GameASG-Bench](game-development-evaluation.md#6-gameasg-bench-declare-behavioral-testability-before-generation)。论文链接至官方仓库；本次核查单独固定其发布版本，确认了 47 个任务提示词及行为测试套件、声明的状态契约、Chromium 输入、评估挂载及严格评分计数。独立核查检查了 P0／P1 适用性、缺失摘要的分母、仅记录而非经身份验证的生成元数据、许可范围及未发布 HTML 产物的情况。浮动运行时依赖、未发布的参考实现、对抗性状态报告的稳健性及实际视觉／游戏玩法质量仍未经验证。未运行基准、容器、游戏或模型，论文结果不是复现结果。

## GBQA 身份与协议专项核查（2026-10-18）

新增 [GBQA 限定范围 QA 协议及部分产物说明](game-development-evaluation.md#7-gbqa-keep-defect-discovery-separate-from-generation-and-repair)，而非可运行的完整基准卡片。与作者关联的链接确立了仓库身份，两个固定快照则区分论文时期的单游戏／三注释示例，与之后带提示的任务及二元定位评分。独立核查检查了论文的 30 游戏／124 缺陷范围、当前三个任务与三个游戏的区别，以及许可文件观察。缺失主张仅适用于所检查快照；指定的完整实验修订、语料、配置、执行及复现仍未经验证。缺陷发现／定位不等于生成或修复成功。

## Play2Code 演示源码专项后续核查（2026-10-18）

通过作者／个人主页／项目域名证据及完整固定文件树，在限定范围内解决了 [Play2Code 演示源码固定版本与根许可](game-development-evaluation.md#3-play2code--playtestarena-separate-refinement-feedback-from-final-judging)问题。八个静态演示目录不同于论文完整的 PlaytestArena 任务／评分标准语料及评估器。独立核查检查了身份、静态展示库／服务器角色及 Apache-2.0 条款；不声称执行过演示、复现过论文或已获第三方资产权利许可。其他现有完整发布缺口仍是限定范围的未知，而非断言项目不存在。

## Wwise 创作输出专项核查（2026-10-18）

新增限定版本的 [Wwise 2024.1.9 SoundBank 生成／捕获契约](generation-delivery-contracts.md#capture-wwise-authoring-soundbanks-before-testing-runtime-playback)：同步完成、默认不写磁盘的输出、包含自动定义音效库、语言选择覆盖、返回日志限制及全缓存清除。独立核查获取了官方页面，并修正 `skipLanguages` 例外。该轮核查未验证通知字段和完成语义；下文后续的完成主题核查缩小了此缺口。交付／回放顺序、超时取消、重试安全性、原生加载及播放仍未经验证。历史 2017.2.0 音效库／回调说明保留其自身范围；未执行 SDK、创作应用程序或运行时。

### Wwise 生成完成通知修正（2026-10-19）

现有 [SoundBank 捕获说明](generation-delivery-contracts.md#capture-wwise-authoring-soundbanks-before-testing-runtime-playback)现区分同步调用结果与 SDK 2024.1.9.8920 的 `generationDone` 通知。官方主题参考警告，不应将其用作可靠的调用完成信号，并将诊断从已弃用的 `error` 字段转至 `logs`，后者在 WwiseConsole 中为空。阅读的是带版本文档，而非不可变的实现提交。逐库 `generated` 选项／载荷、通知顺序／回放、取消、重试行为、原生加载及播放仍未经验证。此前生成页面核查沿 2024.1.5 URL 重定向至 2024.1.9；不声称兼容 2024.1.5。未执行 SDK、创作会话或运行时。

## OpenUSD 依赖与打包验收专项核查（2026-10-19）

依据固定版本的官方头文件及实现，新增 [OpenUSD v25.05 打包范围](asset-validation-contracts.md#openusd-packaging-dependency-discovery-is-not-portable-closure)。独立核查检查了递归发现输出、未解析报告的排除项、已编写变体、忽略目录、原地编辑、条件式 ARKit 扁平化及特定分支的跳过成员处理。归档 Save 条件仍与基础写入器的标志区分。拟议清单、包成员及迁移后使用方夹具仍未执行；不声称复现了缺陷、实现通用依赖闭包、具备运行时兼容性或中断写入持久性。现有组合、MaterialX 及特定渲染器证据得到保留。

## Godot 归一化键与重定向验收专项核查（2026-10-19）

依据固定版本的导入器、AnimationMixer 及类参考来源，新增 [Godot 4.4-stable 重定向验收](asset-validation-contracts.md#godot-retargeting-normalized-keys-are-not-controller-travel)。限定范围核查区分保留与重新计算的运动缩放、归一化导入键、接收骨架后处理、提取的位移、混合累加器及控制器行进。缩放加倍判据是附带限定、未经执行的提案；不声称复现了缺陷、保证步幅／接触或证明跨版本行为。通过链接引用而非重复现有运行时动画观察门槛，未新增资源记录或执行引擎。

## 浏览器虚拟时间验收专项核查（2026-10-19）

依据固定版本的 Playwright v1.64.1 文档、实现及所检查的测试源码，新增[浏览器游戏虚拟时间边界](benchmark-reproducibility.md#browser-game-virtual-time-stepping-and-suspension-are-different-experiments)。限定范围核查区分步进回调与挂起式跳跃、合成动画／性能时钟与原生测量、端点后续操作、上下文范围及出错后状态。九份已保存来源文件经过哈希验证；上游测试是静态证据，而非执行结果。四个拟议夹具仍未实现、未执行；未新增浏览器／游戏运行、确定性模拟、外部时钟同步或实时性能主张。

## 按请求导入 Cadle 类语料（2026-10-18）

[仓库台账](cadle-repositories.md)保留用户固定版本既有研究中的全部 212 个候选项，以及单列的 Cadle 参考。每个请求身份均有机器检查过的记录行；八个已有相关 GameMap 覆盖，并将已确认迁移与独立发现的替代项区分。来源核查因行而异：元数据、README／项目指导及选定许可文件。八个请求位置无法检查，薄弱／仅元数据证据仍明确标示。受限许可、不受支持版本、不完整脚手架及 AI 来源歧义均得到保留。原始排名及历史功能数量不被提升为当前已验证主张。本次导入增加可搜索的研究覆盖，而不是 213 个可玩案例或可执行支持认证。独立核查抽查了重要来源主张，并检查完整清单／渲染一致性；未执行游戏或外部仓库脚本。

### Cadle 薄弱证据与不可用身份后续核查（2026-10-18）

完整的 213 行清单保持不变。九个仅元数据行中有八个现具备固定版本的嵌套文档、清单及限定范围的静态源码证据，因此共有 204 行经过来源核查、一个仅元数据占位项及八个不可用的请求位置。本次核查涵盖来源描述的操作、游戏循环、网络接口及程序包／媒体许可范围；不验证执行、作者身份、玩法完整性或权利许可。新的主张到文件证据保留在可下载台账中。Dust Arena 的历史同所有者来源与当前可用性分别列明；Miniplex 生态系统建议标有日期及归属，nengi 发布者链接佐证了替代项，但不能证明迁移。未默默替换任何不可用身份。独立核查检查重要的新来源主张及生成清单的一致性，而非重新认证所有既有行。

### 原生回放与物理检查点契约（2026-10-18）

[游戏玩法状态专题档案](gameplay-state-contracts.md#unreal-replay-reconstruction-checkpoint-fidelity-and-reset-boundaries)新增限定范围核查，涵盖三份 Unreal Engine 5.6 官方页面及 MuJoCo 3.3.7 文档／源码，后者位于 f1d45bd5422c74beddfb0d1deb590a02583d21de。覆盖内容包括复制重建、多帧检查点、回放／共享世界副作用、存储及停止边界、状态掩码包含项、模型相关数组、观察重算、回调、热启动及插件状态范围。独立核查检查重要 API 和源码主张及生成导航。拟议验收夹具未实现；定位顺序、原子持久性、跨版本迁移及实际应用重置仍明确未知。通过交叉链接引用现有 Jolt 和叙事契约，而非重新认证或重复。

### 生产路径整合（2026-10-18）

只读跨专题档案审计在抽查的操作／状态／评估边界中未发现实质性事实矛盾。本次维护将全部十二个现有生产阶段链接至已记录接口、预期产物及拟议门槛；将九份工作单连接至更深入的契约；解决两处悬空原生操作引用；并将生成交付链接至资产验证。删除了过时的来源索引计数，并用现有的限定范围研究为 Yarn 发现指针增加限定。不新增上游证据、运行时验证、能力资格或完整性主张。特定版本差异保持不变。

### 材质判定与渲染通道产物（2026-10-18）

[材质验证章节](asset-validation-contracts.md#materialx-graph-generated-code-and-compiler-verdicts)新增经独立核查的 MaterialX v1.39.4 标签、脚本、生成指南及许可证据，位于提交 270b5cf2ae2be24a3b6ef4b0569f1c93038dda1d。核查区分文档有效性、可选验证器调用、基于文本的判定汇总、预期元素覆盖和部分输出，与目标渲染器验收。[渲染通道章节](visual-evidence-research.md#render-pass-and-matte-artifacts)新增带版本的 Blender 通道／API／AOV／遮罩／导出语义及 Psyop 文档，后者位于 968d5e4b6171e29ba5f89d554117132a164e747e。独立来源核查涵盖过滤、渲染器／模糊限制、遮罩与拾取预览、元数据及重采样限制。部分官方 Blender 页面在直接打开失败后通过已索引的带版本文档获取。拟议夹具仍未实现；未复现编译器失败、渲染、引擎缓冲区等价性或数值容差。

### 纹理验证与转码策略（2026-10-18）

[KTX 契约](asset-validation-contracts.md#ktx-validation-policy-normal-map-packing-and-transcode-targets)新增 KTX-Software v4.4.2 的五份实现／帮助文件，位于 4d6fc70eaf62ad0558e63e8d97eb9766118327a6，以及 glTF Basis Universal 扩展，位于 521a91d491f02bb7db7d445b35f591d09d2a64ce。独立核查检查了附注标签解析、标签／提交字节一致性、验证器标志／报告／退出边界、法线贴图通道映射、双分量归一化、转码资格／默认输出及规范性与建议性 glTF 约束。检查时在线工具参考自标为 5.0.0；不将较新在线选项归于所选发布版本。明确限定了早期错误后缺失 JSON，以及通用法线打包与标准 glTF 用法的区别。拟议负向夹具、GPU 兼容性及 alpha／外观保真度仍未经执行验证。

### 引擎所有的捕获生命周期与新鲜度（2026-10-18）

[帧回读章节](visual-evidence-research.md#engine-frame-readback-and-capture-ownership)新增经独立核查的 Unity 6000.0 和 Godot 4.5 官方文档，涵盖帧就绪、单帧借用结果、目标／NativeArray 所有权、格式／范围、编辑器批处理模式限制、复制的 Image、视口更新策略及 HDR 解释。来源核查区分全局完成绘制与特定目标更新，以及复制的 Godot Image 与 Unity 请求数据生命周期。来源是带版本文档，而非不可变的引擎实现。拟议渲染标记、失败分类及捕获有效性夹具仍未实现；未执行引擎、GPU 回读、无头播放器配置或数值图像比较。

### 程序化场景来源与有损导出（2026-10-18）

[Infinigen 契约](production-research-notes.md#infinigen-staged-generation-and-export-acceptance)核查官方文档及任务／管理器源码，位于 224598d4a2ff95b4fc928e72c222598b7122c698。它区分旧版 1.19.1 场景／导出行为与 2.0.0a3 预览版，记录种子可复现性警告、相机／配置输入、阶段标记、有条件配置恢复、依赖符号链接、清理及四通道／全场景导出限制。独立核查检查了这些技术边界，并在官网／文档／许可上下文中查找单独的生成输出条款；在所检查来源中未找到通用输出授权，但未据此认定禁止使用。未执行生成器、Blender、导出器或使用输出的引擎。标记成功及导出文件仍与已验证产物、外观和玩法就绪分别对待。

### 从几何体到碰撞体的验收（2026-10-18）

[碰撞烘焙章节](asset-validation-contracts.md#collision-cooking-and-gameplay-shape-acceptance)新增十份经独立核查的 Unity 6000.0 官方页面，涵盖预处理标志／输入有效性、可读性／变换、BakeMesh 复用与并发、赋值重建、凸体表示限制及查询／接触观察范围。保留文档中的 255 三角形限制，不据此推断源多边形阈值或保证烘焙成功；形状间隙／加厚及逐网格调度仍是单独门槛。带版本文档不是不可变的引擎／PhysX 实现固定版本。不安全输入和竞态夹具明确属于预检／调度器检查，而非诱发未定义原生行为的指令。未执行或认证烘焙、性能分析器、接触模拟、性能结果或目标引擎兼容性。

### 运行时动画观察（2026-10-18）

[运行时动画章节](engine-operation-contracts.md#runtime-animation-observation-gates)新增六份经独立核查的 Unity 6000.0 和 Godot 4.4 官方参考。覆盖内容包括可见性／剔除、求值时钟、IK 前移动回调、根运动所有权及重新初始化、即时姿态与跳过的事件、完成信号、延迟方法调用及动画节点缓存。带版本文档不固定已安装引擎的实现。拟议姿态／事件／移动夹具仍未执行；未证明渲染器同步、应用副作用已完成、接触正确性、回滚或确定性回放。

### 关节与关节体系统验收（2026-10-18）

[关节观察章节](production-debugging-contracts.md#joint-and-articulation-observation-contracts)新增 19 份经独立核查的 Unity 6000.0 参考。涵盖端点／物理场景身份、锚点坐标系、度与弧度接口、刚体／自由度映射、驱动／求解器负载观察、投影限制及断裂事件身份。同版本 API／手册关于自由轴断裂扭矩的冲突明确保留，而非凭假设消解。拟议夹具将锁定变更约束于有效配置，仍未执行。确切补丁行为、稳定／接触成功、持久化身份、回滚及模拟确定性仍未经验证。

### 输入交付与观察对齐（2026-10-18）

[输入消费章节](native-operation-details.md#input-delivery-and-observation-alignment)新增经独立核查的 Unity Input System 1.9.0 证据，位于 73feff4267461a868fdfc3fa43f112de1f5312c1，以及 Godot 4.5.0 stable 证据，位于 876b290332ec6f2e6d173d08162a02aa7e6ca46d，并附带带版本官方文档。核查涵盖队列复制及丢弃、更新／动作阶段、焦点／设备重置、轮询与路由输入、引用缓冲／累积、条件式刷新及内部释放顺序。事件生命周期预防措施是从源码得出的假设，而非已复现失败。拟议试验、处理程序、状态修订及帧标记仍未实现；输入与已渲染响应的对齐、游戏效果取消、平台焦点等价性及完整重置明确尚未解决。

### Pi 证据生命周期与执行中断（2026-10-18）

[pi 小节](visual-evidence-research.md#pi-evidence-lifecycle-and-interrupted-execution)在现有当前固定版本 482c1381a00d8d00bc81697e4a980c593db6803e 上扩展源码检查。独立核查检查了十份实现／文档文件，涵盖会话替换及结算、协作式取消、显式嵌套信号替换、结果钩子及图像归一化、请求时上下文组合、分支投影及纯文本压缩。超过 2,000 个字符的工具结果文本被截断为此前缀并加上标记，较短文本保持不变；原图回退仅限于 processImage 返回 ok:false 的情况。拟议的视觉选择 × 保留实验是未经执行的编辑设计。未复现模型请求、引擎修改、中断恢复、提供商图像处理或基准收益。

### 测试框架组合与计数（2026-10-18）

[组合／计数章节](benchmark-reproducibility.md#harness-composition-and-evaluation-accounting)扩展现有 GEPA f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819 和 Meta-Harness 8123ccabe2b19fa1123090b2e5f1bacc20963ce8 检查。独立核查检查了十一份链接的实现／文档文件，涵盖耦合提案、全文组件合并、候选哈希、评估路径计数器、部分异常／重试、分类导入检查、种子／数据集分母及基于字符的上下文指标。加载器和评分观察仅限于分类示例；不将论文结果与当前默认值等同。拟议构建器验证、独立成本台账及缺失覆盖夹具仍未实现、未执行。未复现超支、工作流失败、隔离保证或游戏生产改进。

### 创作反馈与生产失败证据（2026-10-18）

[创作反馈章节](asset-selection-feedback.md#6-mechanism-blindness-and-regressive-scene-edits)新增经独立核查的 SimWorlds／4DBuildBench v1 及 LEGO-Anything v1 论文／项目证据。保留抽样视觉与机制评分的区别、条件式检查点评判、不等预算／多组件混杂因素、手稿／项目／附属材料差异及未经验证的可执行发布边界。[工作室案例](studio-production-case-studies.md#dead-cells-generation-must-preserve-the-authored-experience)新增 Dead Cells 和 Far Cry 5 的第一手生产叙述，包括人工编写图约束、过时地形缓存预览、集成再生成及导航／美术指导取舍。独立核查检查归属、日期及 145 页一手幻灯片产物；由来源得出的经验仍与拟议夹具区分。未复现生产实现、AI 改进、指标结果或因果迁移。

### 程序化约束判定（2026-10-18）

[程序化布局章节](production-research-notes.md#procedural-layout-constraints-and-solver-verdicts)新增经独立核查的 WFC de7d22e705e816b62b4d613199d0463820fcaef3 及 DeBroglie 27b37fa7a54f7c532b52634622f36eddd2a3c7da 证据。核查涵盖项目版本、有限上限的布尔返回值、未决导出、重复种子、三状态转换、特定重载的回溯策略、有界历史及相关端点连通性。新建选项对象与布尔构造函数不同；两者行为均不推广至每个库版本。未运行生成器或验收夹具。求解器矛盾、未完成搜索、全局不可满足性、人工编写进度及实际控制器穿行仍是不同主张；不将这些库归用于历史 Dead Cells 生产。

### 有状态交互缩减（2026-10-18）

[有状态测试章节](gameplay-state-contracts.md#stateful-interaction-discovery-and-failure-reduction)新增经独立核查、标注为 6.170.1 的 Hypothesis 官方文档／渲染源码。覆盖内容包括初始化／不变量条件、工厂／拆卸范围、生成的 TestCase 默认值、不稳定结果、缓存／种子／数据块复现限制及超出 max_examples 的执行。2026-10-19 来源后续核查将状态机实现固定至官方 v6.170.1 提交 `718686d1e392968eb0953c043ef249c5d9d11a59`，并限定初始化／步骤覆盖：无异常结果未必包含普通玩法动作或默认不变量求值。其他滚动文档和实际安装仍是独立验证义务。拟议游戏状态重置、缩减轨迹晋级及全成本计数仍未实现。未执行或复现生成测试、状态机、游戏、模型或缺陷发现收益。

### 原生语义观察与动作（2026-10-18）

[Godot 无障碍契约](engine-operation-contracts.md#godot-native-semantic-observation-and-action-completion)在现有 4.5-stable 固定版本 876b290332ec6f2e6d173d08162a02aa7e6ca46d 上新增经独立核查的源码证据。核查涵盖能力与启用、检查器／辅助激活模式、排队更新、瞬态元素身份、焦点资格、延迟动作交付、注册阶段保护及正常无头 SceneTree 到驱动程序的门槛。发布公告明确属于历史资料；第三方清单元数据不标识已安装库。自定义语义映射和验收夹具属于编辑提案。未运行引擎、无障碍观察器、屏幕阅读器或残障玩家测试；操作系统交付、应用效果完成及无障碍可用性仍未经验证。

### 高斯泼溅场景交付（2026-10-18）

[泼溅交付章节](asset-validation-contracts.md#gaussian-splat-editing-and-delivery)新增经独立核查的 SuperSplat 3.5.2 源码，位于 f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b，以及 UnityGaussianSplatting 快照 2c6fed37da67a217367261fcfcd3316d34c73e76。后者仍声明程序包为 1.1.1，但与发布标签的不同提交区分。核查涵盖编辑器项目压缩与烘焙衍生产物、变换／SH 约定、元数据／过滤损失、SPZ 版本不匹配、确切 PLY 模式、编辑／恢复限制、无幸存项时的写入器返回及相机／边界／渲染边界。许可观察适用于所检查软件，不适用于任意场景／训练／输出权利。拟议桥接和保真度夹具未经执行；未复现导入失败、渲染结果、几何／碰撞正确性或目标平台兼容性。

### 考虑显示条件的渲染差异（2026-10-18）

[FLIP 小节](visual-evidence-research.md#flip-display-aware-render-differences)新增经独立核查的实现证据，自声明为 v1.7，位于 b475eb4bf394ab877c42166c9eb0a84a02cc5b14，不声称已解析到发布标签。核查涵盖 RGB／线性解释、HDR 曝光解析及逐像素汇总、Python／CLI 色调映射器归一化差异、观看参数、原始与着色输出、均值禁用哨兵及绑定验证边界。已阅读 LDR 研究及官方作者回顾；完整 HDR PDF 的获取受限，因此详细 HDR 机制归因于代码。格式错误输入及不安全计数属于拟议包装器拒绝测试，绝非调用未经检查原生路径的指令。未执行或复现指标、失败、候选排名、感知阈值或游戏生产收益。

### 游戏规则设计搜索（2026-10-18）

[GAVEL 审计](game-ai-notes.md#gavel-rule-design-search-and-verdict-boundaries)扩展现有资源，不更改其卡片。独立核查将论文 v2 与源码快照 1a849c3ba00c3ecb1194c202451a617ef0556b60 比较，检查变异表示、归档准入／新颖性总体、适应度及完成语义、不同的模拟对局／技能样本、异常／数值超时路径、检查点预算及产物／权利范围。差异被记录为复用前需解决的协议问题，而非论文运行了这一确切源码的证据。Java 源码与随附类的对应关系及完整实验产物仍未经验证。所检查算子不能证明存在双亲交叉，而论文更广义的重组描述保留于原卡片。未执行或复现模型、Ludii 进程、归档反序列化、候选评估或人类兴趣收益。

### 光照烘焙完成与持久化（2026-10-18）

[光照烘焙章节](native-operation-details.md#lighting-bake-completion-and-persisted-scene-association)新增经独立核查的 Blender v4.5.0 源码，位于 8cb6b388974a817afedf1317ce26f0c75aa5f181，以及 Godot 4.5-stable 源码，位于 876b290332ec6f2e6d173d08162a02aa7e6ca46d；带版本的 Godot 教程与不可变类文档分开。核查涵盖目标验证、异步操作符／模态边界、强制内部烘焙存储、图像保存／打包、原生编辑器绑定、图集／资源写入顺序、节点关联及误导性完成文本。零网格尺寸提示在计算尺寸验证前回退；CSG 转换是改变表示的变通方法，本身并非文档矛盾。拟议一次性副本、显式保存及冷重新打开夹具仍未执行。未复现烘焙、GPU 操作、取消、数据丢失、场景持久性或恢复保证。

### 内存生命周期与保留资源证据（2026-10-18）

[内存生命周期章节](production-debugging-contracts.md#memory-lifetime-across-repeated-production-cycles)新增经独立核查、标注为 5.8 的 Epic 文档、Unity 6000.0、Memory Profiler 1.1.11 及 Addressables 1.21.21。这些文档系列不是不可变实现固定版本或已安装版本。核查涵盖分配窗口谓词、跟踪通道／目的地、快照目标及完成语义、文档所述流式 Player 的 false 结果、回调参数文字差异、截图／捕获序列化、引用方向限制、观察器 GC 设置、捆绑包保留及资产频繁变动。固定循环夹具及接收方产物检查属于编辑提案。未执行快照、跟踪、泄漏、内存预算、捕获中断或资源释放实验；正增量或名为 Memory Leaks 的查询并不能证明项目存在故障。

### 运行时音频观察完整性（2026-10-18）

[音频观察小节](native-operation-details.md#runtime-audio-observation-and-capture-integrity)新增经独立核查的 Godot 4.5-stable 源码，位于 876b290332ec6f2e6d173d08162a02aa7e6ca46d，以及 Unreal 5.5 文档。核查涵盖总线增益／静音前的效果顺序、整块捕获丢失与不变的直通、缓冲区清空／计数器连续性、渲染子混音元数据及录音导出完成。Godot 音频总线和同步教程均带有 4.5 过时警告；Web 导出页面独立支持播放模式限制。明确列出实验性 Unreal Python 接口、未知的时钟对齐／监听器放置及来源版本边界。未执行捕获、设备测量、溢出、音画同步或可听输出结果。拟议立体声夹具将观察器完整性与游戏正确性及感知质量分别测试。

### 精灵图集与播放交付（2026-10-18）

[精灵交付章节](asset-validation-contracts.md#sprite-atlas-metadata-and-playback-delivery)新增经独立核查的 Aseprite v1.3.18.6，位于 331e898ef405d919539c03fd1675691cfa16c3a3，其 laf 打包子模块，位于 500768cccc6447e3b7816bedbfcb378a5c5222e5，以及 Godot 4.5-stable，位于 876b290332ec6f2e6d173d08162a02aa7e6ca46d。核查涵盖图像矩形重复但时间出现位置独立、裁边／空帧序列化、挤出排除、源标签范围／重复次数、切片相对枢轴、图集边距行为及相对时长时基。拟议映射有意排除缩放、裁剪、拆分模式及嵌套标签播放。其坐标重建、时序运算及往返夹具属于编辑推导，而非经过验证的导入器。未执行导出、导入、播放、图像比较、碰撞／事件映射或游戏玩法脚部接触结果。

### 瓦片地图身份与运行时交付（2026-10-18）

[瓦片地图章节](asset-validation-contracts.md#tile-map-identity-geometry-and-runtime-delivery)新增经独立核查的 Tiled v1.12.2，位于 1fd984638f9898af920103799bcd68b467287295，以及 Godot 4.5-stable，位于 876b290332ec6f2e6d173d08162a02aa7e6ca46d。核查涵盖地图局部 GID／标志解码、稀疏瓦片集 ID、负坐标区块、图像／对象／碰撞变换、有符号 16 位保存坐标，以及基础图集与运行时副本 TileData。检查了确切实现范围，包括序列化坐标强制转换及即时内部处理。后者不是经独立观察的渲染／物理栅栏。拟议正交地图转换及夹具仍未实现；未证明原生导入器、保存／重新打开保真度、碰撞响应、导航或运行时结果。

### Replicate 文件获取与终态计数（2026-10-18）

[交付澄清](generation-delivery-contracts.md#replicate-file-acquisition-and-terminal-accounting)新增经独立核查的 Replicate 官方滚动文档，涵盖同步文件提前可用、缺少完成指标、分开的 HTTP 等待／截止时间行为、一小时 API 保留期及已删除输出标记。核查保留 successful／succeeded 示例不一致及更广泛的终态结果。FileOutput 迁移与直接 URL 授权说明针对不同路径；不据此推断矛盾或已验证的凭据路由行为。SDK 版本陈述归于文档，而非已安装客户端。未执行预测、请求、下载、收费、取消、SDK 或候选评估夹具。产物获取、终态计数及目标引擎验收仍是独立门槛。

### MarioGPT 约束与评估器边界（2026-10-18）

[MarioGPT 小节](game-ai-notes.md#mariogpt-requested-constraints-and-executable-verdicts)新增经独立核查的论文 v3 及源码 e62bb2b0106a00734e724e272ba94fb179ad959a。核查区分 250 关重复控制器实验、1,000 样本逐特征遵从测试及以重叠为条件的路径误差；这些并非联合质量保证。固定版本代码从输出重新生成其返回的提示词，使用可配置数量分箱，在预览回退前输出诊断，并启动 JAR 而不返回结构化判定。论文的五管道措辞与所检查默认阈值不同，但这不能证明此源码产生了论文结果。已核查确切源码／文件树／JAR 列表／路线图及代码／图形声明；检查点字节和权重许可仍未经验证。未运行模型、JAR、评估器、预览或游戏。原目录卡片措辞保持不变，拟议的项目自有评估器未实现。

### 跨专题档案一致性与发现入口核查（2026-10-18）

在源码头部版本 297b648dc4e30a27f2e641025075ba14bb37bd31 进行的只读审计检查了当前研究变更集：21 份规范文档及 21 份生成下载文件，含 276 个本地 Markdown 链接，其中 159 个片段分布于 15 个渲染目标。全部可解析；生成差异仅限于既定的链接／空白转换。在已核查新增内容中，未发现重复的长篇正文块或阻断性的内部矛盾。来源修订表的 72 条选定记录现与额外行内引用明确区分；它们不是完整上游来源计数。中央索引现提供生成关卡／规则评估、内存、光照／音频及 2D 交付入口。这是一次一致性／导航核查，而非对每个外部来源的全新事实审计或引擎／模型复现。现有论文／代码、滚动文档／固定版本、权利及运行时未知边界仍适用。

### 完整示例生产链（2026-10-18）

[完整示例章节](production-work-orders.md#complete-sample-integration-examples)新增经独立核查的官方 Boss Room，位于 1299ba4fc97d83b634e7d32a86c438ba668d7f9c，以及 Godot 3D Platformer，位于 52e30044658448149b04e8f69b475eebbfbd8f6e。这些示例将资产／场景创作、具体交互、构建／导出接口及实际测试范围串联。Boss Room 核查涵盖 Unity／CI 版本差异、LFS 边界、开关／门及 Development 覆盖、构建结果与计数器区别、仅主机的参数化冒烟测试及范围更窄的桩化连接测试。Godot 核查涵盖历史 4.3 渲染器／导入范围、金币可见性与节点生命周期、因动画延迟的敌人移除、触摸动作不匹配、重生与干净初始化、导出平台别名及仅格式检查的 CI。拟议更广泛路径仍未实现。未开展二进制资产来源审计、项目实体化、依赖安装、引擎导入、导出、多人会话或游戏玩法测试。现有卡片及精选案例未变更；这些示例是有来源支持的集成示例，而非新增的已验证执行结果。

### 带版本资产发布与下游所有权（2026-10-18）

[AYON 交接小节](production-work-orders.md#versioned-asset-publication-and-consuming-scene-ownership)新增经独立核查的 Blender 1bae7f10b014761039e1412a89c03fc7a7cc0c2d、Unreal 43b4a800a52289dd0bae19b1345889a835766bb7 及 Core 136b43c6ba4b6e01cb0b97e0b31fb4df92e46409 开发快照，以及官方滚动设置／权利文档。核查检查实际生效的验证／FBX 默认值、工作文件修改、传输前的产品／版本提交、表示最终化、尽力而为的文件回滚及尚未解决的数据库回滚。区分资产导入／容器与已放置 actor 的重定向，以及请求布局销毁／保存与观察到的成功。所检查布局模式及继承预处理不能证明跨插件组合；不指称任何受支持或已安装组合会失败。拟议端到端道具发布／更新／重新打开夹具仍未实现。未进行服务器账户、存储访问、依赖安装、发布、宿主导入或运行时执行。

### 面向设计师的行为判定与人格反馈（2026-10-18）

[试玩证据章节](game-ai-notes.md#designer-facing-playtest-evidence)新增经独立核查的 Microsoft Bedrock GameTest 示例，位于 e0d67e171f11faa3ea5ea3be085e3f1992b27b83，以及 2015 年 MiniDungeons 人格评议器论文及其作者链接的最小模拟器，位于 298b86cac5624e4b121b4d2e5a2fd3cd93c622f7。GameTest 核查检查历史测试版依赖、确切人工编写谓词／tick 预算、未经检查的骑乘者设置、最终观察与按计划观察，以及实验性当前文档范围。MiniDungeons 核查检查可行性／完成／效用的区分、评估总体、训练／比较重叠、表 1 文字解释、逐次运行遥测、动作 300 的计数器重叠、占用图限制及代码／许可／发布边界。不将论文的演化人格及关卡生成流程归于最小发布。两个来源均不能证明人类对生成候选的享受程度。拟议负向对照、留出任务及设计师引导路径未实现。未执行或收集模拟器、JAR、引擎、游戏、模型、参与者数据或服务。

### 混合式生产测试机器人集成（2026-10-19）

[EA AutoPlayers 案例](studio-production-case-studies.md#ea-autoplayers-learned-locomotion-inside-controlled-test-scenarios)新增官方 CoG 2023 叙述及带版本的 arXiv v1 论文。定向核查涵盖脚本化目标中的学习式移动、训练／推理共享观察、精简环境迁移限制、加速物理失败及限定范围的公开发布主张。这些历史工程观察并未量化缺陷发现量、覆盖改进或享受程度。拟议控制器比较及模拟有效性门槛仍未实现；未运行游戏、训练器、模型或参与者实验。

### 面向设计师的轨迹与代理模型反馈（2026-10-19）

[Sonic 轨迹案例](game-ai-notes.md#sonic-trajectory-visualization-comparing-training-populations)将汇总的生成路径比较与单次回放、因果诊断及测得的设计师收益分开。作者网站／仓库检查未确认匹配的可运行发布；不以无关可视化项目替代。[SuSketch 案例](game-ai-notes.md#susketch-interactive-surrogate-feedback-with-a-separate-evidence-boundary)区分结构检查、学习所得的对局预测及显式应用的建议。保留论文总体筛选、特定输出准确率、创作研究范围及固定版本代码／论文类别对差异。模型／数据文件仅通过元数据检查；项目整体复用许可及实验复现仍未经验证。拟议对照未实现；未运行引擎、模型、参与者实验或已发布可执行程序。

### 截图定位与录制对话产物（2026-10-19）

[OmniParser 契约](visual-feedback-mechanisms.md#6-omniparser-frame-scoped-gui-regions-and-coordinate-contracts)检查 Microsoft 源码，位于 354021201345a96178360b28733573e27269f2de：混合框格式、信箱式留边逆变换、默认描述裁剪、解析局部 ID、推断的可交互性及未经执行的空 OCR 失败路径。仓库与模型许可分别限定范围；README 徽章不能解决仓库 LICENSE 差异。[Rhubarb 契约](native-operation-details.md#recorded-dialogue-and-mouth-cue-validation)固定 v1.14.0 源码，并区分解码／识别、百分之一秒口型提示语义、进程状态、重新打开的产物及项目自有动画映射。独立核查检查重要源码主张；未运行权重、可执行程序、录音语音、游戏或模型。坐标夹具及播放／形状测试是拟议、尚未实现的验收工作，而非实证准确率或同步结果。

### 时序遮罩状态与替换证据（2026-10-19）

[SAM 2 生命周期小节](visual-evidence-research.md#sam-2-temporal-mask-state-contract)将官方源码固定至 2b90b9f5ceec907a1c18123530e92e794ad901a4。它区分重置提示／结果与重新加载已改变片段、原图坐标提示与归一化输入、修正预览与传播，以及会话局部 ID 与引擎身份。帧顺序／时基、已产出覆盖、遮罩 logits、构建器／CLI／变体默认值及异步加载仍明确限定范围。可选失效方法不匹配仅被描述为静态源码证据，而非已复现失败。拟议重新捕获、映射、遮挡及修正测试仍未实现；未执行模型、检查点、视频或推理。

### 持久化视觉产物检索（2026-10-19）

[FiftyOne 小节](visual-feedback-mechanisms.md#7-fiftyone-persistent-retrieval-over-capture-evidence)检查了独立解析的 FiftyOne aacfc8182fc5353296b5edd7475e63335fedb5cb 及 Brain ba978a12293fda9953b478f601ac8950d2a35aa4 源码。它区分父项／帧／标签身份与不可变像素、保存的视图规则与快照、抽样帧复用与新鲜度，以及查询距离字段与持久查询历史。索引成员／重新加载、注释回写及本地／远程向量边界仍限定于所检查接口。这些修订不能证明已安装组合兼容、索引完整或检索准确。未运行数据集、模型、嵌入、数据库或服务；拟议过时产物夹具仍未实现。

### 多视图捕获与持久化流关联（2026-10-19）

[BlenderProc 小节](visual-evidence-research.md#blenderproc-multiview-capture-contracts)检查源码 76bd8b82ee19489843578ff045298642197bf883，将其 main 快照、程序包版本、发布标签及默认 Blender 运行时分别对待。相机帧、抽样可见性、深度转换、渲染器局部实例关联及输出加载／写入是独立契约。采样及稀疏射线命中不能证明完整检查；HDF5 输出要求调用方声明流并验证清单。焦距不等的转换及部分输出观察仍属源码层面注意事项，而非已复现缺陷。未执行 Blender、渲染器、安装器、资产数据集或验收夹具。

### 现有智能体与引擎卡片对齐（2026-10-19）

本次限定范围后续核查将 17 张现有卡片与操作专题档案及选定一手来源比较。七张卡片有所修订；未新增资源。仅这七张卡片获得新的来源阅读日期。这不刷新目录中每项主张，也不证明已安装组件兼容。

| 修订卡片                    | 重要澄清                                                                                 | 证据范围                                                                                                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `windows-ui-automation` | UIA 暴露提供程序支持的控件模式；Win32 SendInput 是单独的 API                                           | [Microsoft 控件模式](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview)、[SendInput](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput)；滚动文档                                                         |
| `godot-command-line`    | 未知标志被静默忽略；应检查所选二进制程序的帮助                                                              | [官方 CLI 参考](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html#command-line-reference)；稳定版文档，而非固定可执行程序                                                                                                                              |
| `gltf-blender-io`       | 将插件发布分支与 Blender 匹配；开发 main 可能面向即将发布的版本                                              | [上游 README](https://github.com/KhronosGroup/glTF-Blender-IO#documentation)；滚动分支策略，不复制不断变化的版本标签                                                                                                                                                                      |
| `openhands-sdk`         | 所检查 TypeScript 客户端处于 alpha 阶段，仅支持由 Agent Server 支撑的远程会话；该服务器可以位于本地                   | [固定版本 TypeScript README](https://github.com/OpenHands/software-agent-sdk/blob/3f3294581ebf40f3bbe5b96aec1d28b7fec96226/clients/typescript/README.md#L1-L19)；源码快照，而非已安装发布版本                                                                                          |
| `mcp-for-blender`       | 默认的最小使用遥测不同于主动选择加入的创作内容收集；文档所述禁用控件涵盖两者                                               | [固定版本控件](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/README.md#L808-L842)、[选择加入条款](https://github.com/ahujasid/mcp-for-blender/blob/25e1fe008fc523b1a947c6f3d28510a362a0f06e/TERMS_AND_CONDITIONS.md)；来源核查，未进行同意或收集操作 |
| `unity-mcp`             | 保留声明的最低要求 Unity 2021.3 LTS 或更新版本，而非推断出的 Unity 6.x 上限                                 | [固定版本安装来源](https://github.com/CoplayDev/unity-mcp/blob/aa5fc638d623f56178d50329d9ad8c541a57fe66/website/docs/getting-started/install.md#L13-L17)；声明不等于经测试的未来版本兼容性                                                                                                   |
| `playwright-mcp`        | 所检查 README 声明其不构成安全边界，并记录通过 browser_run_code_unsafe 在 Playwright 服务器进程中执行 JavaScript | [固定版本安全与工具说明](https://github.com/microsoft/playwright-mcp/blob/b8b4183e099f136cbec0388a6088d4aa2f6b9685/README.md#security)；可用性仍取决于版本／配置                                                                                                                            |

在抽查范围内保留：`unreal-gauntlet`、`unreal-remote-control`、`unity-addressables-scripting`、`unity-test-framework`、`unreal-automation-tests`、`phaser-examples`、`gdquest-first-2d-game`、`godot-mcp`、`unity-mcp-skill` 及 `unreal-mcp`。关于烘焙构建、编辑器／运行时访问、取消、Phaser 4 与旧仓库标签、教程版本及社区桥接进程限制的既有区分仍有用。保留不认证全部主张，也不刷新日期。

两张变更卡片现直接链接至现有[原生 UI 证据边界](engine-operation-contracts.md#native-gui-automation-is-a-separate-evidence-surface)及[资产有效性与运行时保真度](asset-validation-contracts.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity)专题档案。未执行智能体、桥接、遥测路径、引擎命令或导入器；未接受内容收集条款。

### 过场动画剪辑交接（2026-10-19）

[时间线补充说明](asset-validation-contracts.md#cinematic-editorial-handoff-preserve-time-coordinates-and-declared-features)新增经独立核查的 OTIO v0.18.1，位于 44236713c1db295a6ffc66189ae98dbdfd0cb9c4，明确为 Beta／预发布版，以及 OpenTimelineIO Unreal 插件，位于 3894893001733f90178ee9a9b0f05b55e51b140e，描述符版本为 0.1 Beta。核查涵盖半开／混合帧率坐标、可用性未知异常、转场余量、效果表示与求值、适配器属性检查、模式选择的非活动引用丢失及项目钩子。引擎桥接补充选择性镜头协调、默认缺失媒体、帧率／标记损失、预览及 Undo 限制，以及源码层面的导出钩子名称差异。这些分别固定版本的组件未一同安装，亦未证明兼容。已交叉检查引用范围及拟议夹具运算；未进行时间线导入／导出、引擎保存／重新打开、媒体解码、渲染或数据丢失复现。原 0.14 捆绑包教程仍单独限定范围。

### 浏览器过场动画字幕（2026-10-19）

[字幕交付说明](native-operation-details.md#browser-cinematic-subtitle-and-caption-delivery)新增经独立核查的 WebVTT 候选推荐标准草案 2026-05-20、WHATWG HTML 源码 de953a7cf0523f5873a1904ba2ce010c689dfb66，以及滚动 Xbox Accessibility Guideline 104。核查涵盖所提供 cue ID 的唯一性、可恢复解析错误及零 cue 成功、加载／模式边界、半开媒体时间激活、定位、轨道来源重置及首个匹配查找。不将禁用模式表述为无条件取消获取或删除 cue。范围为预录 HTML 视频过场动画；引擎原生对话、Web Audio、canvas 字幕、实际渲染、无障碍内容完整性及浏览器互操作性仍未经验证。拟议夹具未经执行；未新增资源卡片或运行时适配器。

### 现有几何来源修订（2026-10-19）

现有[几何对应关系契约](asset-validation-contracts.md#4-optimize-retopologize-unwrap-and-regenerate-tangents-without-losing-correspondence)现固定 xatlas f700c7790aaa030e794b52ba7791a05c085faf0c 及 MikkTSpace 3e895b49d05ea07e4c2133156cfa94369e19e409。独立核查确认先前的阶段／重映射／切线主张，并补充确切输出单位、忽略面哨兵、破坏性重新打包及条件式部分输出取消边界，以及受支持面和输出回调限制。不据此推断每次取消均不完整，或切线生成结果为 true 就涵盖不受支持多边形。现有许可经复查无实质变更；已安装版本、实际取消、图集输出及着色保真度仍未经验证。未新增工具章节、资源或可执行夹具。

### 现有压缩与简化来源（2026-10-19）

同一[几何契约](asset-validation-contracts.md#4-optimize-retopologize-unwrap-and-regenerate-tangents-without-losing-correspondence)现固定 meshoptimizer f0a684f11ead064e176775c9b796f82a55910e92 及 Draco d429de84b52a860705507da0884764c5d8321423。独立源码核查确认现有能力，并补充相对／绝对简化误差单位、未达到目标数量、编解码与预处理损失、逐属性量化及比特流／解码器版本身份。不将小版本兼容性文字推广至开发快照。头文件标签及许可分别检查；未证明已发布程序包身份、编码器／解码器执行、性能或渲染保真度。拟议控制仍位于现有验收链内；未新增资源或工具章节。

### 现有生成与音频卡片对齐（2026-10-19）

本次限定范围核查将八张现有卡片与选定官方操作及权利来源对照。三张卡片修订；五张保留且日期不变。未新增资源，核查不证明账户资格、协商权利或运行时行为。

| 修订卡片                   | 修正或限定                                                               | 一手证据                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tripo-generation-api` | 在默认五分钟链接过期前保存实际输出文件；将控制限定于 H3 v3.1-20260211／v3.0-20250812，并保留提交密钥要求 | [H3 生成](https://docs.tripo3d.ai/model-generation/text-to-model-v3-0-v3-1.html)、[任务获取](https://docs.tripo3d.ai/task-query/get-your-task-result.html)                                                              |
| `stable-audio-open`    | 将所链接 MIT 工具包分类为流程源码，并与受访问门槛限制、单独许可的模型权重区分                           | [工具包](https://github.com/Stability-AI/stable-audio-tools)、[模型卡片](https://huggingface.co/stabilityai/stable-audio-open-1.0)、[模型许可](https://huggingface.co/stabilityai/stable-audio-open-1.0/blob/main/LICENSE.md) |
| `elevenlabs-sfx`       | 将循环／格式能力归于文档，保留受支持的最大值／导出描述，并区分 API 格式／套餐要求与观察到的循环质量                | [能力概述](https://elevenlabs.io/docs/overview/capabilities/sound-effects)、[API 参考](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert)                                                          |

在抽查范围内保留：`meshy`、`hy-motion`、`scenario`、`elevenlabs-music` 及 `elevenlabs-speech`。其操作方案与完整游戏、模型许可、取消范围、游戏套餐及依赖历史的连续性等区分仍有支持。参考了相关[模型与服务边界](generative-api-boundaries.md)，并复查选定对应行；这不刷新整份文档的日期。[交付契约](generation-delivery-contracts.md)仍是处理任务与产物的详细路径。除另有标识外，来源均为滚动文档；不单凭今日文本推断历史变化。未进行生成、受门槛限制的下载、条款接受、模型执行或听觉／视觉验证。

### 创作发布来源与保留的资产卡片（2026-10-19）

现有[版本发布状态表](game-ai-notes.md#versions-and-release-status)现将 OpenGame、GameXpert-Bench、GameGPT 和 GameGen-Verifier 的可用性陈述关联至独立检查的 README／文件树修订。其四张卡片仍具有实质支持，日期保留。GameGen-Verifier 的文档／文件树设置差异通过其手动输入及符号链接说明加以限定；不声称有全新克隆失败或评估器复现。未推断新的基准、任务数量比较或模型发布关联。

单独一次限定范围来源核查保留了 `trellis`、`triposr`、`hunyuan3d-2` 及 `pixellab`，未更改字段或日期。其输入／输出范围及现有代码／模型／版本限定仍有支持。这不解决组件级许可歧义、托管服务权益或引擎导入保真度。这八项保留结论是额外的抽样核查，而非对目录中每项主张的重新认证。未执行模型、评估器、游戏、生成 API 或受门槛限制的下载。

相邻的四卡核查保留 `gamedevbench`、`agent-game-forge`、`agent-sprite-forge` 及 `cardiverse`，未更改字段／日期。同一[发布状态说明](game-ai-notes.md#versions-and-release-status)现区分 GameDevBench 论文 v1（132 个任务）与 v2（333 个任务），替换误导性的不带版本历史链接；当前仓库与 v2 均为 333。固定版本来源澄清 Forge 文档所述旧版 Godot 支持，以及 Sprite Forge 作者报告的代码读取器重新渲染检查，而非 GUI 验证。Cardiverse 现有替代输入限定现链接至确切 Replicability Notice。未复现任务语料、导出、引擎、性能结果或评估，别处较早且有效的 GameDevBench README 固定版本予以保留。

### 现有场景生产卡片对齐（2026-10-19）

对 `infinigen`、`holodeck`、`video2game` 及 `blenderllm` 的限定范围核查修订了后两张卡片，前两张保持不变。Video2Game 现保留文档所述 UE 漫反射烘焙建议，不声称存在普遍导入限制。BlenderLLM 的 12K 数量明确归于发布文档；[场景生产说明](game-ai-notes.md#3d-execution-interfaces-models-and-environment-systems)区分论文的 8K 描述及不同的产物许可声明，不判定其优先关系。同一说明固定 Holodeck 的场景／资产交接，并链接至现有 Infinigen 契约。清单及源码树观察不能证明运行时失败、成功复现或穷尽性的发布缺失。未进行生成器、模型、引擎、数据集下载或法律资格评估。

### 现有世界模型发布与访问对齐（2026-10-19）

一次限定范围五卡核查保留 `programmable-world-model`、`coder-world-model`、`gamefactory` 及 `diamond`，不更改字段／日期，并澄清 `oasis` 权重访问要求。[世界模型发布说明](world-model-notes.md#research-results-versus-released-artifacts)现固定所检查的 PWM、GameFactory 和 Oasis 仓库观察，并为 CoDeR 的论文链接标注版本。Oasis 当前的联系信息共享门槛与其 MIT 许可不同。CoDeR 项目获取失败不能证明不存在发布，GameFactory 公开列出的数据亦不解决复用条款。DIAMOND 官方项目及论文 v2 支持现有 Atari／CS:GO 区分；不暗示全面源码审计。未执行或下载模型、游戏、权重、数据集归档或验收夹具，亦未接受访问条款。

### 混合渲染器与生产自动化卡片对齐（2026-10-19）

八张互不重叠的现有卡片接受限定范围来源核查：`streamrender-h3`、`solarwm` 及 `autoue` 修订；`solarrenderer`、`code-world-model-brain`、`unigen`、`regression-games` 及 `convai` 保留，日期不变。[世界模型说明](world-model-notes.md#research-results-versus-released-artifacts)区分组件特定硬件／时序、所检查源码修订及具名的联系信息共享访问门槛。[3D 研究说明](game-ai-notes.md#3d-execution-interfaces-models-and-environment-systems)将 AutoUE 论文层面的试玩与所检查的跳过移动／直接交互分派器分开。这不能证明运行时失败、穷尽性发布完整性、普遍服务可用性或产物权利资格。保留结论维持迭代调试与自主游玩、参考集成与已确认托管服务、运行时角色与完整游戏生成的区别。未运行或下载模型、引擎、SDK、托管体验、数据集或权重载荷；未接受任何门槛条件。

### 现有智能体与指令格式卡片对齐（2026-10-19）

一次限定范围十卡核查澄清 `aider`，保留 `claude-code`、`gemini-cli`、`opencode`、`cline`、`mini-swe-agent`、`codex`、`codex-browser-games`、`agents-md` 及 `agent-skills-format`，不更改字段／日期。[智能体来源核查说明](agents-notes.md#sources-and-lifecycle-changes)现区分 Aider 在支持视觉模型条件下的所供图像／剪贴板接口，与单独的捕获及游戏玩法控制。保留的来源核查维持特定账户迁移范围、带版本权限／LSP 注意事项、独立 shell 进程行为及指令格式与运行时的区分。这不能证明游戏性能、当前模型建议或每个智能体实现。未执行智能体、模型、浏览器游戏、安装或引擎工作流。

### 现有示例兼容性与世界模型范围（2026-10-19）

一次互不重叠的 13 卡核查修订 `unity-2d-techdemos`、`factorsim` 及 `magpie-renderer`。[引擎来源说明](engines-notes.md#source-status)保留 README 指导、记录的编辑器／程序包基线及 Git 与注册表的 manifest／lock 差异，不声称安装失败。[世界模型说明](world-model-notes.md#research-results-versus-released-artifacts)区分 FactorSim 的 2D 游戏生成与 CLIPort 任务代码工作，以及 Magpie 的计算吞吐量与论文配置下估算的交互延迟。独立一手来源核查认可这些变更。

保留且不更改字段／日期：`godot-demo-projects`、`godot-gut`、`catlike-coding-movement`、`threejs-examples`、`threejs-crowd-experience`、`react-three-fiber`、`worldcoder`、`gif-mcts-cwm`、`cwm-general-game-playing` 及 `poe-world`。其现有版本、作者经验、来源与运行时及模拟器归纳／规划区分，在抽样来源范围内仍有支持。不将任何可选假设扩展表述为新复现结果。未安装或执行引擎、程序包、浏览器演示、模型、游戏、数据归档或研究实现。

### 现有托管世界访问与集成范围（2026-10-19）

一次限定范围 13 卡核查修订 `genie-3` 和 `marble`，其余十一项保留且不更改字段／日期。[世界模型说明](world-model-notes.md#research-results-versus-released-artifacts)区分 2025 年 Genie 3 研究演示与当前 Project Genie 会话／账户要求，并将 Marble 网格导出层级限定于 Web 应用而非 API 权益。[智能体说明](agents-notes.md#essential-distinctions)以 DeepSeek 集成指南与其单独发布的通用开发者预览测试框架之间的区别，替代基于缺失的理由；集成卡片本身保持不变。这些变更接受了独立一手来源核查。

保留：`genie`、`gamengen`、`wonderworld`、`claude-agent-sdk`、`deepseek-agent-integrations`、`openhands`、`gamefactory-3a`、`unity-agent-plugin`、`mcp-unity`、`godot-3d-asset-skill` 及 `text2game`。最后五项结论沿用单独完成的定向来源核查，不人为制造功能或日期变更。现有模拟与游戏玩法、调用方运行的 SDK、前端／后端、官方／社区、外部 MCP 及叙事原型边界在抽样范围内仍有支持。未测试模型、引擎、托管会话、账户资格、导出、SDK 集成或完整复现；未接受条款或下载载荷。

### 引擎参考访问与配套生产基础组件（2026-10-19）

一次七卡定向核查依据[官方 Fab 上架页面](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)明确的 Unreal Engine 专用内容限定，修订了 `unreal-lyra`。源码／内容交付及匹配引擎指导保持不变。这报告的是上架页声明的限制；不判定账户权益，也不依据市场元数据推断特定 AI 训练、再分发或跨引擎工作流的许可。

保留且不更改字段／日期：`unreal-engine`、`unity-engine`、`godot-engine`、`xbox-accessibility-guidelines`、`msdf-atlas-gen` 及 `fastnoise-lite`。官方引擎访问及示例／版本文档支持其现有区分；[XAG 简介](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)仍属于最佳实践而非法律合规指导，[MSDF](https://github.com/Chlumsky/msdf-atlas-gen) 和 [FastNoise Lite](https://github.com/Auburn/FastNoiseLite) 的 README 支持现有字体图集及程序化基础组件描述。本次限定范围核查不认证完整无障碍、许可资格、安装、渲染、可移植性或运行时兼容性。未执行引擎、示例、字体流程或程序化生成器。

### 在线适配与变更级审计证据（2026-10-19）

[基准方法扩展](benchmark-reproducibility.md#online-harness-adaptation-and-change-level-audit)结合作者链接的代码 `1cfe254e8d25b15f37048c3730134686abe60335` 阅读 Harness² 论文 v1，并单独阅读 v1 测试框架篡改研究。独立核查检查任务局部对比与正确性、共同基础与经验库、带种子的任务顺序与模型随机性、rollout／计数排除项、已评分行总体及调用方记录的完成元数据。完整性研究仍是论文层面参考，可执行发布可用性未经验证；不将种子控制、模型标志、抽样人工检查及已复现缺陷混为一谈。拟议游戏夹具及迁移比较未实现。未新增资源卡片或执行基准。

### 游戏创作循环与发布边界（2026-10-19）

[三项研究扩展](benchmark-reproducibility.md#game-edit-loops-reusable-players-and-specification-recovery)将 RSIGame v1、Recursive Game Creator v2 和 GameReplica v1 与固定版本公开源码／产物接口进行核对。独立来源核查涵盖回溯与实时停止、模型辅助观察状态、游戏变更与策略／测试框架变更、原生捕获与官方回放、为空的严格成功字段、视觉评分分母、基于阈值的结果标签及发布／许可范围。RSIGame 清单运算是来源数据检查，而非重新计算游戏玩法评分；RGC 适配器和 GameReplica 展示库未获论文复现认证。未新增资源卡片。拟议比较仍未实现；未执行模型、游戏、引擎、评判器或基准。

### 上游 GameCraft 证据与分母契约（2026-10-19）

[上游契约说明](benchmark-reproducibility.md#gamecraft-bench-the-upstream-replay-to-score-contract)直接检查作者链接的 GameCraft 源码 `a43347534374df9a0c1a6c001aa9380862783f6d`，解决相邻 RSIGame 和 Recursive Game Creator 说明所用的依赖。独立核查检查可覆盖的提交／回放／采样上限、基于帧与视频的评判输入、逐要求汇总、捕获的回放错误导致遗漏与评判错误重试耗尽导致记零，以及发布／参考脚本／许可范围。该说明不将评分得分等同于一次完整通关，也不依据参考文件名推断全部任务复现。拟议控制仍未实现。未执行基准、游戏、引擎、模型或评判器；未新增卡片或文档。

### 主动视觉检查与历史上下文控制（2026-10-19）

[主动检查比较](visual-feedback-mechanisms.md#active-visual-inspection-frozen-model-search-versus-learned-tool-use)检查 ZoomEye 和原始 DeepEyes 论文及固定版本源码，区分冻结模型裁剪搜索与训练出的工具策略、预期框与实际处理像素、运行器状态与答案评分，以及初始搜索阈值与硬预算。[历史／记忆配套说明](visual-feedback-mechanisms.md#visual-history-reuse-external-memory-and-controlled-exposure)检查 HistPrune-GUI v4 及其模型特定缓存／剪枝源码、MementoGUI 论文层面的外部记忆设计及仅页面验证的发布，以及 EMemBench 固定暴露方法与较早的打包／生成器实现。独立核查检查所报告指标总体、反例、来源／版本差异及代码／模型／数据条款。EMemBench 公开源码快照并未普遍实现论文的前缀时域描述。未新增卡片或文档、模型执行、基准运行、游戏实验、权重下载或付费请求；拟议游戏生产比较仍未实现。

### 场景状态保留与相机覆盖门槛（2026-10-19）

[Code4Scene 契约](asset-selection-feedback.md#7-code4scene-target-recovery-and-collateral-changes-require-different-comparisons)检查固定版本的 actor 匹配、目标创作、容差、修复验证及证据包。它区分请求恢复与背景改作他用／删除、导出证据与原始引擎测量、相机／边界排除项，以及当前任务定义与论文队列。[InfiniBench 配套说明](visual-evidence-research.md#infinibench-constraint-verdicts-and-camera-coverage)检查随附的仅编译约束集成、不同相机路径、条件式可见性放宽、缺失路径组装及从元数据得出的 QA。来源核查不能证明已发布示例存在运行时缺陷、已完整复现或组合集成可工作。MUSE 和 EditBench3D 属于限定范围比较候选，而非新增工具或提升为已发布项目。未新增卡片／文档或执行研究；拟议保留及可见性夹具仍未实现。保留外部 Godot 重定向／根运动修订。

### 已恢复的 Cryptomatte 格式规范（2026-10-19）

现有[渲染通道专题档案](visual-evidence-research.md#render-pass-and-matte-artifacts)现解决了此前受阻的官方规范阅读问题，规范位于 Psyop/Cryptomatte `968d5e4b6171e29ba5f89d554117132a164e747e`。恢复的 v1.2.0 PDF 区分必需格式元数据与可选清单、逐像素排名打包与已弃用预览、基于字符串的 ID 与引擎对象身份，以及正常覆盖率排序与允许的其他优先级。Blender 的旁车文件限制及剩余引擎／通道／编解码器未知项均予保留。独立字节／来源核查检查 PDF 身份及重要主张。未新增卡片、文档、通用门槛、渲染器执行、解码器测试或 EXR 往返测试。

### 第一手 AAA 生产经验（2026-10-19）

八项[工作室案例新增内容](studio-production-case-studies.md#find-a-production-lesson)涵盖 Insomniac 的遭遇保留与角色流程、Sucker Punch 的生物群系／VFX 及光照取舍、CD PROJEKT RED 的 Phantom Liberty 白盒修订、Naughty Dog 的初代 Uncharted 复盘、Ubisoft 的 Rainbow Six Siege 工作流映射及 EA 的 SUPERNOVA 测试优先级排序。已阅读一手开发者论文、演示及工作室文章，并保留确切历史背景及各来源特有限制。独立核查检查具体方法、失败尝试、测量总体注意事项，以及已发表叙述与拟议验收夹具的区分。不提升无法访问的演讲细节、通用厂商加速幅度或因果性 AI 生产力主张。现有案例保持不变；不重新托管工作室资产或幻灯片。未新增卡片／文档、执行游戏／引擎／模型或部署。

### 世界创作完整性、声学就绪及穿行反馈（2026-10-19）

四项互补的[工作室案例](studio-production-case-studies.md#find-a-production-lesson)新增 Remedy 的 Northlight 组合／实时编辑流程、CD PROJEKT RED 的声学图构建及流式加载失败、Naughty Dog 的 Uncharted 4 攀爬反馈及 Guerrilla 的 Horizon Zero Dawn 穿行创作。完整一手幻灯片及开发者访谈支持这些技术叙述；不以无法访问的替代来源支撑实现主张。Remedy USD 流程明确提及的生产项目为 Control 2 及 Max Payne 重制版，而非推断 Alan Wake 2 已采用。Horizon 的动作匹配与全身 IK 在历史演示中仍是未来计划。拟议干净导出比较、分阶段就绪检查及接触夹具属于编辑建议，未实现。来源核查既不证明当前工作室工具访问权，亦不证明已复现性能或玩法质量。未新增卡片／文档、执行研究、重新托管来源幻灯片或部署。研究索引删除过时的固定案例数量。

### 对话修订与无障碍反馈生产（2026-10-19）

四项[第一手案例](studio-production-case-studies.md#find-a-production-lesson)新增 BioWare 的 Mass Effect 2 本地化修订／上下文／导入门槛、Nixxes 的 Horizon Zero Dawn Remastered 对话动作替换后相机退化、Turn 10 的 Forza Motorsport 共同开发及提示学习过程，以及 Ubisoft 的 Far Cry New Dawn 依赖／测试时间经验。通用 Xbox 工作坊指导单独注明归属，不声称其为 Forza 的确切流程或因果证据。一手来源核查区分回顾性开发者观察、预发布描述及未实现的 GameMap 夹具。不认证玩家成效、当前私有工具可用性、完整无障碍或运行时集成。无法访问的 Santa Monica 幻灯片不提供任何技术主张。来源仍为链接阅读材料；未执行或重新托管工作室资产、参与者数据、游戏或引擎。本地化工作单增加了通往生产修订及共同开发证据的直接路径。

### 上下文音频与可重建失败证据（2026-10-19）

四项[工作室案例新增内容](studio-production-case-studies.md#find-a-production-lesson)记录 Prototype 2 的快照过渡／播放模式取舍、初代 Overwatch 预发布的依赖监听者的音频优先级、Bungie 关联内部构建的崩溃收集，以及 Valve 的历史转储／构建来源。独立来源核查检查确切历史范围及演示位置。匹配符号仍是必要的归属门槛，而非诊断正确的证明；事件关联不认证捕获的原子性或完整性。拟议聆听及失败包夹具未经执行。未证明当前主机授权、私有收集器、感知改进、已发布长时稳定性测试负载或运行时适配器。阅读路径现以十个生产问题覆盖每个当前案例，同时保留现有案例文本及锚点；索引避免固定案例数量。不重新托管来源媒体或玩家报告，未运行游戏、引擎、音频系统或崩溃实验。

### 平台负载工作负载与验收范围（2026-10-19）

[VALORANT 案例](studio-production-case-studies.md#valorant-specify-the-workload-behind-a-concurrency-claim)新增 Riot 带日期的一手叙述，内容涉及针对测试分片的模拟客户端负载。独立核查确认所报告的两百万玩家测试及三小时仪表板范围，同时明确不推断持续两百万的平台期或零错误。模拟服务器省略游戏玩法逻辑；上线前操作速率依据另一款游戏的数据估算。拟议工作负载及验收记录仍未执行。这缩小了平台可扩展性证据范围，但未弥合真实游戏玩法长时稳定性测试、当前容量或公共测试框架可用性缺口。保留现有案例正文；未运行负载生成器、游戏或服务。

### 人工编写行为、节奏代理指标与人类体验（2026-10-19）

三项[工作室案例](studio-production-case-studies.md#find-a-production-lesson)新增 Orkin 由出版方托管的 2005 年预发布 F.E.A.R. 架构叙述、Booth 的官方 AIIDE 2009 Left 4 Dead 幻灯片及 Ambinder 的 2009 年 3 月 GDC 试玩幻灯片。独立核查保留符号与程序化前置条件、感知新鲜度及子系统执行、节奏频率与难度幅度范围，以及控制代理指标与实际玩家体验的区别。模拟示例标签仅限于 Ambinder 所引第 31 页数字及第 42 页问题。拟议调试及验收夹具仍未执行；不声称有经校准情绪测量、通用乐趣评分、当前私有接口或 LLM 兼容性。现有案例正文保持不变，主题阅读表对每个当前案例各链接一次。未使用研究参与者、个人／生物识别数据、游戏、模型或来源程序。

### 可读的建造与多种玩家解法（2026-10-19）

[Tears of the Kingdom 设计案例](studio-production-case-studies.md#tears-of-the-kingdom-make-construction-rules-readable-without-prescribing-one-solution)新增经独立来源核查的任天堂完整官方发售时期访谈第 4–5 部分。记录从现有机制制作原型、组件／就绪提示、以可见方式标示的交互例外，以及兼顾简单与复杂玩家解法。这些开发者报告的创作方法与拟议 GameMap 观察夹具分开。访谈不能证明受控可用性效果、穷尽组合、数值物理行为或公共工具可用性；技术性物理验证缺口仍待解决。保留现有工作室案例及外部贡献的 Hypothesis 覆盖限定。未执行游戏、物理引擎、玩家研究或模型，未导入任天堂资产。

### 地点的分层历史与环境叙事（2026-10-19）

[Division 2 案例](studio-production-case-studies.md#the-division-2-author-layered-histories-for-discoverable-places)记录 Julian Gerighty 发布前关于区域／街道主题、建筑及居住者的历次用途、共享世界历史文档及每月城市地图的叙述。已阅读全文官方访谈；独立来源核查检查日期及创作方法与期望玩家解读的区别。拟议地点简报及单独的首次单人／合作比较属于核查模板，而非 Ubisoft 报告的测试。保留现有案例、恢复的 Cryptomatte 材料及新合并的展示／语言约定；单独许可的关卡设计技能保持不变。已核查来源；未完整复现。

### 近景相机战斗与空间预期（2026-10-19）

[God of War 案例](studio-production-case-studies.md#god-of-war-keep-a-readable-mental-map-during-close-camera-combat)采用 Mihir Sheth 关于 2018 年游戏的 GDC 2019 幻灯片及演讲者备注。独立核查检查失败的中间站位设计、分开的站位／间隔约束及可导航空间回退、屏幕内成员保留、面向世界的象限及攻击与待机警告提示。所报告试玩改进仍是组合变更的定性观察，不声称孤立效果或数值成效。拟议遭遇模板未运行；未观看来源视频。保留现有案例正文及已合并仓库约定。已核查来源；未完整复现。

### 从美术母题衍生环境方向提示（2026-10-19）

现有 [Ghost of Tsushima 案例](studio-production-case-studies.md#turn-an-established-art-motif-into-a-requested-direction-cue)依据 Jason Connell 的官方问答及 Joanna Wang 的环境美术叙述，增加简洁的设计扩展。独立来源核查检查归属、玩家召唤的载体，以及开发者定性判断与测得导航收益的区别。原本发售前发表的背景以后来显示的日期加以限定，其中包括 Wang 发售后的八月日期；段落级修订未知。方向、可穿行性及收集物覆盖仍是不同问题。拟议核查模板未运行；无法访问的 GDC 材料不提供模拟或性能主张。已核查来源；未完整复现。

### 从简报到替换资产的生物开发（2026-10-19）

[Horizon Forbidden West 机械兽案例](studio-production-case-studies.md#horizon-forbidden-west-carry-player-opportunities-from-creature-brief-to-in-game-asset)记录 Guerrilla 的简报、跨学科概念评审、绑定／动画功能检查、精细模型及经评审的游戏内替换顺序。独立全文核查检查角色名称、Sunwing 示例及待机、警示其他个体和发起攻击的声音。该预发布叙述不是测得的理解度或生产节省结果；不推断音频参与所列概念评审，也不推断未披露的组件放置规则。拟议原创敌人核查模板仍未运行。保留现有案例及单独许可的技能包。已核查来源；未完整复现。

### 可选任务引导与世界中剩余的可能性（2026-10-19）

[Hitman 案例](studio-production-case-studies.md#hitman-expose-a-viable-approach-without-requiring-its-guide)采用 IO Interactive 完整的 2016 GDC Europe 幻灯片。独立核查检查早期反馈与后来定性原型观察、信息不作为进度门槛、机会在无引导时也可发挥作用，以及击杀前显示完成。先处理尸体后换装，以及发现／枪声幻灯片序列，保留其精确展示结果；不推断内部触发器、通用警戒规则或任意恢复行为。不将重玩标题视为留存测量。拟议状态／知识比较未运行。单独的 2019 社交空间幻灯片仍是线索，而非第二条目；获许可技能的 Sapienza 简略条目保持不变。已核查来源；未完整复现。

### 作者偏好与角色参考证据（2026-10-19）

[对话创作小节](production-research-notes.md#dialogue-drafting-preserve-preference-edited-acceptance-and-character-references)将 Ghostwriter 官方的候选／编辑／偏好工作流与独立 SASS NLP4ConvAI 2023 研究论文分开。来源核查检查训练模型与参考的区别、早期模型版本比较中一致性不足但未报告统计量或阈值、困惑度改善但定性流畅度略降、未来集成及未公开的 UBISCENES。没有证据证明 SASS 是演示中 Ghostwriter 的后端、已用于上市作品、有测得的创作生产力、公众可访问可执行程序或具有复用许可。拟议反馈记录及已获权利许可素材池夹具仍未运行。链接连接创作、资产选择证据及本地化，不声称运行时兼容。已核查来源；未完整复现。

### 增量假设与长时程执行证据（2026-10-19）

对[测试框架研究](visual-evidence-research.md#discoveryrsi-preserve-the-hypothesis-through-task-compilation)的两项仅来源新增内容基于一手报告及发布检查。DiscoveryRSI 协议、固定版本公共脚手架、仅模型卡片发布及三个任务示例仍分别对待；不声称训练、程序包执行或游戏生产改进。HF 观察保留获取到的列表修订，不声称独立获取了不可变页面。相邻 [Minecraft 报告](visual-evidence-research.md#minecraft-teamwork-adjacent-execution-harness-evidence)仍是单次运行、特权文本的游戏玩法案例，记录证据与公开链接产物区分。独立核查检查来源范围、发布边界及导航。现有资源卡片、仓库成员关系及工作室案例保持不变。

### 网络化反馈与在线服务迭代门槛（2026-10-19）

两项经独立来源核查的[工作室案例](studio-production-case-studies.md#find-a-production-lesson)新增历史 VALORANT 模拟／反馈工程，以及 Runeterra 构建模式、环境及失败来源方法。三个带日期的网络来源保留权威正确性与可视清晰度之间的区别；后续补丁调优不是当前配置主张。生产叙述区分迭代与合并就绪，不暗示无法绕过的保护、物理环境独占或绝对可靠的结构化诊断。阅读表增加两个唯一目标，先前案例保持不变。拟议夹具未运行；未访问游戏、网络实验、部署或私有工作室服务。

### 破坏创作与不同的伤害观察（2026-10-19）

[Siege 破坏案例](studio-production-case-studies.md#rainbow-six-siege-author-destruction-as-a-gameplay-surface-with-material-rules)采用完整的 GDC 2016 开发者幻灯片及 Ubisoft 2020 年 2 月 Y5S1 公告。独立来源核查检查基于材质的资产、切割器／装饰控制、碰撞简化、碎屑替代、异步感知，以及伤害与破坏的区分。后来的弹片描述仍属于公告，预期清晰度与测得收益及当前行为分开。现有案例保留；阅读路径增加一个唯一目标。项目自有核查模板仍未运行，不暗示私有 API、资产权利或运行时结果。
