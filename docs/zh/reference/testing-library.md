# 游戏测试库

根据要测试的行为，选择可运行的项目、AI 环境或资源集。从下列任务入手，然后遵循各项资源的配置与许可证说明。

## 入门组合

### 编码与自动化试玩

**建议从这些资源开始：** Godot 演示 · SuperTux · Wesnoth。

构建基线，修改一个机制，然后回放相同的输入序列。

**衡量指标：** 构建成功、所要求的行为、回归问题和修复尝试次数。

### 视觉、控制与规划

**建议从这些资源开始：** MiniGrid · Crafter · ViZDoom。

固定任务、种子、动作频率、观察来源和回合预算。

**衡量指标：** 成功率、碰撞次数、路径长度、资源和任务完成情况。

### 资源与动画流水线

**建议从这些资源开始：** Kenney · Quaternius Standard · 100STYLE。

导入角色，映射其骨架，并播放已获许可的动作片段。

**衡量指标：** 纹理缺失、缩放、蒙皮、脚部滑动、根运动和循环接缝。

## 资源索引

| 资源 | 类型 | 维度 | 测试目标 | 获取 / 运行 | 来源 |
| --- | --- | --- | --- | --- | --- |
| Godot 官方演示 | 游戏与引擎项目 | 2D / 3D | 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 | [游玩浏览器演示](https://godotengine.github.io/godot-demo-projects/) | [一手来源](https://github.com/godotengine/godot-demo-projects) |
| SuperTux | 游戏与引擎项目 | 2D | 编码与自动化试玩；视觉、控制与规划 | [游玩官方浏览器构建](https://play.supertux.org/) | [一手来源](https://github.com/SuperTux/supertux) |
| Endless Sky | 游戏与引擎项目 | 2D | 编码与自动化试玩；视觉、控制与规划 | [免费 Steam 游戏](https://store.steampowered.com/app/404410/Endless_Sky/) | [一手来源](https://github.com/endless-sky/endless-sky) |
| DDraceNetwork (DDNet) | 游戏与引擎项目 | 2D | 编码与自动化试玩；视觉、控制与规划 | [免费 Steam 游戏](https://store.steampowered.com/app/412220/DDraceNetwork/) | [一手来源](https://github.com/ddnet/ddnet) |
| The Battle for Wesnoth | 游戏与引擎项目 | 2D | 编码与自动化试玩；视觉、控制与规划 | [免费 Steam 游戏](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/) | [一手来源](https://github.com/wesnoth/wesnoth) |
| Mindustry | 游戏与引擎项目 | 2D | 编码与自动化试玩；视觉、控制与规划 | [作者提供的免费下载](https://anuke.itch.io/mindustry) | [一手来源](https://github.com/Anuken/Mindustry) |
| OpenTTD | 游戏与引擎项目 | 2D | 编码与自动化试玩；视觉、控制与规划 | [官方免费下载](https://www.openttd.org/downloads/openttd-releases/latest) | [一手来源](https://github.com/OpenTTD/OpenTTD) |
| SuperTuxKart | 游戏与引擎项目 | 3D | 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 | [免费桌面版下载](https://supertuxkart.net/Download) | [一手来源](https://github.com/supertuxkart/stk-code) |
| Luanti + Minetest Game | 游戏与引擎项目 | 3D | 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 | [获取 Minetest Game](https://content.luanti.org/packages/Minetest/minetest_game/) | [一手来源](https://github.com/luanti-org/luanti) |
| Red Eclipse | 游戏与引擎项目 | 3D | 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 | [免费 Steam 游戏](https://store.steampowered.com/app/967460/Red_Eclipse/) | [一手来源](https://github.com/redeclipse/base) |
| Zero-K | 游戏与引擎项目 | 3D | 编码与自动化试玩；视觉、控制与规划 | [免费 Steam 游戏](https://store.steampowered.com/app/334920/ZeroK/) | [一手来源](https://github.com/ZeroK-RTS/Zero-K) |
| Unity BoatAttack | 游戏与引擎项目 | 3D | 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 | [获取 Unity 示例源码](https://github.com/Unity-Technologies/BoatAttack) | [一手来源](https://github.com/Unity-Technologies/BoatAttack) |
| Unreal Engine Lyra Starter Game | 游戏与引擎项目 | 3D | 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 | [获取免费 Lyra 示例](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en) | [一手来源](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) |
| Bevy official examples | 游戏与引擎项目 | 2D / 3D | 编码与自动化试玩；资源与动画流水线 | [浏览可运行示例](https://bevyengine.org/examples/) | [一手来源](https://github.com/bevyengine/bevy) |
| MiniGrid / BabyAI | AI 评估环境 | 2D | 编码与自动化试玩；视觉、控制与规划 | [免费 Python 软件包](https://minigrid.farama.org/) | [一手来源](https://github.com/Farama-Foundation/Minigrid) |
| Crafter | AI 评估环境 | 2D | 编码与自动化试玩；视觉、控制与规划 | [免费软件包与可玩 GUI](https://github.com/danijar/crafter#play-yourself) | [一手来源](https://github.com/danijar/crafter) |
| Craftax | AI 评估环境 | 2D | 编码与自动化试玩；视觉、控制与规划 | [免费 Python 软件包](https://github.com/MichaelTMatthews/Craftax#readme) | [一手来源](https://github.com/MichaelTMatthews/Craftax) |
| ViZDoom | AI 评估环境 | 3D | 编码与自动化试玩；视觉、控制与规划 | [包含 Freedoom 资源的免费软件包](https://vizdoom.farama.org/) | [一手来源](https://github.com/Farama-Foundation/ViZDoom) |
| NetHack Learning Environment | AI 评估环境 | 2D | 编码与自动化试玩；视觉、控制与规划 | [免费软件包与源码](https://github.com/NetHack-LE/nle#installation) | [一手来源](https://github.com/NetHack-LE/nle) |
| Godot RL Agents | AI 评估环境 | 2D / 3D | 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 | [免费工具包与示例项目](https://github.com/edbeeching/godot_rl_agents#quickstart-guide) | [一手来源](https://github.com/edbeeching/godot_rl_agents) |
| Unity ML-Agents | AI 评估环境 | 2D / 3D | 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 | [免费工具包；需要 Unity 编辑器](https://github.com/Unity-Technologies/ml-agents/releases) | [一手来源](https://github.com/Unity-Technologies/ml-agents) |
| Arcade Learning Environment (ALE) | AI 评估环境 | 2D | 编码与自动化试玩；视觉、控制与规划 | [官方文档与安装指南](https://ale.farama.org/) | [一手来源](https://github.com/Farama-Foundation/Arcade-Learning-Environment) |
| Procgen Benchmark | AI 评估环境 | 2D | 编码与自动化试玩；视觉、控制与规划 | [安装 Python 软件包](https://github.com/openai/procgen#readme) | [一手来源](https://github.com/openai/procgen) |
| Google Research Football | AI 评估环境 | 3D | 编码与自动化试玩；视觉、控制与规划 | [安装与场景指南](https://github.com/google-research/football#readme) | [一手来源](https://github.com/google-research/football) |
| Overcooked-AI | AI 评估环境 | 2D | 编码与自动化试玩；视觉、控制与规划 | [安装与布局指南](https://github.com/HumanCompatibleAI/overcooked_ai#readme) | [一手来源](https://github.com/HumanCompatibleAI/overcooked_ai) |
| MuJoCo | AI 评估环境 | 3D | 编码与自动化试玩；资源与动画流水线 | [官方文档](https://mujoco.readthedocs.io/en/stable/overview.html) | [一手来源](https://github.com/google-deepmind/mujoco) |
| Gymnasium classic control | AI 评估环境 | 2D | 编码与自动化试玩；视觉、控制与规划 | [经典控制环境文档](https://gymnasium.farama.org/environments/classic_control/) | [一手来源](https://github.com/Farama-Foundation/Gymnasium) |
| Kenney | 资源库 | 2D / 3D | 编码与自动化试玩；资源与动画流水线 | [浏览免费资源包](https://kenney.nl/assets) | [一手来源](https://kenney.nl/assets) |
| Quaternius | 资源库 | 3D | 编码与自动化试玩；资源与动画流水线 | [浏览创作者资源包](https://quaternius.com/) | [一手来源](https://quaternius.com/) |
| Poly Haven | 资源库 | 3D | 视觉、控制与规划；资源与动画流水线 | [浏览 CC0 资源](https://polyhaven.com/all) | [一手来源](https://polyhaven.com/) |
| ambientCG | 资源库 | 3D | 视觉、控制与规划；资源与动画流水线 | [浏览可下载资源](https://ambientcg.com/list) | [一手来源](https://ambientcg.com/) |
| OpenGameArt | 资源库 | 2D / 3D | 编码与自动化试玩；资源与动画流水线 | [浏览社区资源](https://opengameart.org/) | [一手来源](https://opengameart.org/) |
| Fab | 资源库 | 2D / 3D | 资源与动画流水线 | [浏览市场条目](https://www.fab.com/) | [一手来源](https://www.fab.com/) |
| Unity Asset Store | 资源库 | 2D / 3D | 资源与动画流水线 | [浏览 Asset Store 软件包](https://assetstore.unity.com/) | [一手来源](https://assetstore.unity.com/) |
| Khronos glTF Sample Assets | 资源库 | 3D | 编码与自动化试玩；资源与动画流水线 | [浏览官方资源列表](https://github.khronos.org/glTF-Assets/) | [一手来源](https://github.com/KhronosGroup/glTF-Sample-Assets) |
| Khronos glTF Asset Generator | 资源库 | 3D | 编码与自动化试玩；资源与动画流水线 | [浏览生成的测试资产](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Positive) | [一手来源](https://github.com/KhronosGroup/glTF-Asset-Generator) |
| Kenney Animated Characters | 绑定与动作数据 | 3D | 资源与动画流水线 | [下载角色包](https://kenney.nl/assets/animated-characters-protagonists) | [一手来源](https://kenney.nl/assets/animated-characters-protagonists) |
| Quaternius Universal Animation Library | 绑定与动作数据 | 3D | 资源与动画流水线 | [获取免费 Standard 版](https://quaternius.itch.io/universal-animation-library) | [一手来源](https://quaternius.itch.io/universal-animation-library) |
| 100STYLE | 绑定与动作数据 | 3D | 视觉、控制与规划；资源与动画流水线 | [获取原始动作数据](https://www.ianxmason.com/100style/) | [一手来源](https://www.ianxmason.com/100style/) |
| CMU Motion Capture Database | 绑定与动作数据 | 3D | 视觉、控制与规划；资源与动画流水线 | [浏览受试者与动作](https://mocap.cs.cmu.edu/) | [一手来源](https://mocap.cs.cmu.edu/) |
| LaFAN1 | 绑定与动作数据 | 3D | 资源与动画流水线 | [打开数据集仓库](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) | [一手来源](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) |
| AMASS | 绑定与动作数据 | 3D | 视觉、控制与规划；资源与动画流水线 | [审阅访问与数据集条款](https://amass.is.tue.mpg.de/) | [一手来源](https://amass.is.tue.mpg.de/) |
| SMPL-Body | 绑定与动作数据 | 3D | 资源与动画流水线 | [阅读身体子集许可证](https://smpl.is.tue.mpg.de/bodylicense.html) | [一手来源](https://smpl.is.tue.mpg.de/) |
| SMPL-Model | 绑定与动作数据 | 3D | 资源与动画流水线 | [审阅模型访问条款](https://smpl.is.tue.mpg.de/modellicense.html) | [一手来源](https://smpl.is.tue.mpg.de/) |
| Mixamo | 绑定与动作数据 | 3D | 资源与动画流水线 | [先阅读服务常见问题](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) | [一手来源](https://www.mixamo.com/) |
| SDL GameControllerDB | 输入与数据夹具 | 2D / 3D | 编码与自动化试玩；视觉、控制与规划 | [下载 gamecontrollerdb.txt](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt) | [一手来源](https://github.com/mdqinc/SDL_GameControllerDB) |

## 已审查资源

### Godot 官方演示

小型、独立的引擎项目，适用于角色控制、物理、导航、联网、动画及导入/导出回归测试。

**技术栈 / 格式：** Godot / GDScript / C#

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 ·  **维度：** 2D / 3D

[游玩浏览器演示](https://godotengine.github.io/godot-demo-projects/) — 免费浏览器构建和可下载的源码项目。浏览器导出版本覆盖仓库中的一部分内容。

[项目 / 来源记录](https://github.com/godotengine/godot-demo-projects) · [许可证 / 条款](https://github.com/godotengine/godot-demo-projects/blob/master/LICENSE.md)

- **许可证类别：** 开放许可证来源
- **代码：** MIT；保留仓库许可证和声明。
- **资源 / 数据：** 除非某个演示或捆绑资源另有说明，否则适用仓库的 MIT 许可证；保留本地署名声明。
- **AI 用途：** 适合作为代码编辑与自动化试玩的开放许可证基线。记录任何额外资源或插件的许可证，不要将演示许可证视为对无关数据的授权。
- **实际局限：** 本轮研究未安装或运行。托管网页演示会在每次提交时从 master 重新部署，因此其 URL 不是不可变基线。请固定兼容的源码提交，以便重复测试；开发分支和网页渲染器的表现可能与稳定桌面版不同。

**建议测试任务**

- 修改一条移动或碰撞规则，验证原始场景仍能启动并完成目标。
- 导入已知模型或动画，然后比较材质加载、缩放、骨架映射和导出后的行为。
- 回放同一输入序列，记录截图、错误和任务完成情况。

**开始使用**

1. 选择与已安装 Godot 版本兼容的稳定演示分支或发布版本；固定其提交。
2. 下载一个演示目录，导入其 project.godot 并运行主场景。
3. 将引擎版本、场景、输入序列和预期结果与基线一同保存。

**一手证据**

- [官方源码与分支指引](https://github.com/godotengine/godot-demo-projects)
- [官方浏览器构建](https://godotengine.github.io/godot-demo-projects/)
- [仓库许可证](https://github.com/godotengine/godot-demo-projects/blob/master/LICENSE.md)

### SuperTux

一款完整的平台游戏，具有规模可观的原生代码库，适用于跳跃时机、碰撞、关卡编辑和视觉/输入回归任务。

**技术栈 / 格式：** C++ / CMake / 2D 平台游戏

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[游玩官方浏览器构建](https://play.supertux.org/) — 提供官方浏览器游玩、免费 Steam 发布版和独立桌面版下载。构建修改后的核心代码需要原生工具链。

[项目 / 来源记录](https://github.com/SuperTux/supertux) · [许可证 / 条款](https://github.com/SuperTux/supertux)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** GNU GPL；分发修改后的构建前，请检查固定版本及组件声明。
- **资源 / 数据：** 大多数游戏数据采用 CC BY-SA；个别文件和第三方组件有额外声明。
- **AI 用途：** 源码访问支持插桩实验，但 GPL 代码与 CC BY-SA 游戏数据承担不同义务。任何再分发的截图、地图或数据导出都应能追溯到其源许可证。
- **实际局限：** 本轮研究未安装或运行。它没有现成的 Gymnasium 评估契约；观察、动作时序和重置/成功检测都需要测试框架。

**建议测试任务**

- 修改跳跃加速度或碰撞边界情况，然后回放固定关卡。
- 衡量基于屏幕的控制器的完成率、死亡次数、跳跃失误次数和耗时。
- 修改一个关卡，验证检查点、敌人和完成条件。

**开始使用**

1. 从免费二进制版本和固定关卡开始，建立控制基线。
2. 如需编辑代码，请遵循仓库构建说明，使用 CMake 和所需 C++ 依赖项。
3. 比较智能体之前，固定游戏版本、关卡、设置和输入时序。

**一手证据**

- [官方游戏源码与许可证](https://github.com/SuperTux/supertux)
- [Steam 发布版](https://store.steampowered.com/app/1572920/SuperTux/)
- [独立下载](https://www.supertux.org/download.html)

### Endless Sky

一款完整的太空游戏，适用于导航、战斗、贸易和长时程任务规划，具有可编辑数据和插件系统。

**技术栈 / 格式：** C++ / 太空探索 / 数据驱动内容

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[免费 Steam 游戏](https://store.steampowered.com/app/404410/Endless_Sky/) — 免费的 Steam 和桌面发布版；与重建引擎相比，插件提供了更轻量的切入点。

[项目 / 来源记录](https://github.com/endless-sky/endless-sky) · [许可证 / 条款](https://github.com/endless-sky/endless-sky/blob/master/copyright)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** GPLv3；第三方代码和文件可能有各自的声明。
- **资源 / 数据：** 有多种美术与音频许可证；仓库的 copyright 文件标明了作者和条款。
- **AI 用途：** 为导出的测试数据集选择美术或音频时，应使用版权清单。免费下载游戏并不意味着其所有材料都归入同一许可证。
- **实际局限：** 本轮研究未安装或运行。一般的战役进度是一个宽泛且多变的目标；要获得可比较的分数，需要保存状态并限定场景。

**建议测试任务**

- 创建一个包含任务、对话和明确成功条件的小型插件。
- 从固定存档状态出发，评估路线选择、燃料管理和贸易。
- 修改战斗或任务规则，并验证存档兼容性和任务完成情况。

**开始使用**

1. 安装免费发布版，并保留基线存档和设置。
2. 内容修改使用独立的插件目录；C++ 修改遵循仓库说明。
3. 定义一个起始资源固定、范围有限的任务，并记录游戏版本。

**一手证据**

- [官方源码与构建说明](https://github.com/endless-sky/endless-sky)
- [Steam 发布版](https://store.steampowered.com/app/404410/Endless_Sky/)
- [代码与资源版权清单](https://github.com/endless-sky/endless-sky/blob/master/copyright)

### DDraceNetwork (DDNet)

一款合作平台游戏，具有抓钩、精确移动、地图和回放支持，适用于输入时序和多人游戏回归任务。

**技术栈 / 格式：** C++ / CMake / 联网精确操作平台游戏

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[免费 Steam 游戏](https://store.steampowered.com/app/412220/DDraceNetwork/) — 免费游戏和本地服务器二进制文件。使用私有本地服务器进行受控评估。

[项目 / 来源记录](https://github.com/ddnet/ddnet) · [许可证 / 条款](https://github.com/ddnet/ddnet/blob/master/license.txt)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** 项目代码采用 zlib，并附带所捆绑第三方的许可证。
- **资源 / 数据：** 游戏数据默认采用 CC BY-SA 3.0；字体和其他文件的例外情况记录在 license.txt 中。
- **AI 用途：** 客户端/服务器源码支持插桩。共享测试夹具或回放时，应保留地图作者信息和数据许可证；可重复测试应在本地服务器上进行。
- **实际局限：** 本轮研究未安装或运行。精细控制对时序和服务器设置很敏感；公共服务器结果不是稳定的基准。

**建议测试任务**

- 使用移动、跳跃和抓钩输入完成固定的地图区段。
- 修改物理或碰撞规则，并比较录制的运行过程。
- 测试两个协作客户端，衡量同步、完成情况和交互失败。

**开始使用**

1. 安装相匹配的客户端和服务器版本，启动使用一张固定地图的本地服务器。
2. 记录服务器设置，禁用试验之间不受控的变化。
3. 使用 demo 回放或自定义测试框架保存输入，并检测完成或重置事件。

**一手证据**

- [官方源码与本地服务器说明](https://github.com/ddnet/ddnet)
- [Steam 发布版](https://store.steampowered.com/app/412220/DDraceNetwork/)
- [代码、数据与第三方许可证](https://github.com/ddnet/ddnet/blob/master/license.txt)

### The Battle for Wesnoth

一款回合制战术游戏，具有可编辑场景和脚本，适用于寻路、战术决策、对话和规则修改。

**技术栈 / 格式：** C++ / Lua / Wesnoth Markup Language

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[免费 Steam 游戏](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/) — 免费的 Steam 和独立发布版。在修改 C++ 引擎之前，先从小型 WML/Lua 场景入手。

[项目 / 来源记录](https://github.com/wesnoth/wesnoth) · [许可证 / 条款](https://github.com/wesnoth/wesnoth/blob/master/copyright)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** GPLv2 或更高版本，并有组件专属声明。
- **资源 / 数据：** 核心美术/音频采用 GPLv2 或更高版本，或 CC BY-SA 4.0；copyrights.csv 记录了文件级声明。附加组件的美术/音频还可能采用 Creative Commons NC 或 ND 条款，因此应分别审计每个附加组件。
- **AI 用途：** 场景和脚本提供了可检查的任务，但附加组件和美术需要各自的署名记录。不要假定引擎许可证覆盖每个下载的附加组件。
- **实际局限：** 本轮研究未安装或运行。战斗随机性和战役变化要求控制种子或重复试验；常规 UI 不是现成的智能体 API。

**建议测试任务**

- 创建或修复一个具有明确胜负条件的小型场景。
- 从固定场景状态出发，衡量战术成功、移动效率和资源使用情况。
- 修改单位能力或对话触发器，并验证回放和场景推进。

**开始使用**

1. 安装稳定发布版，选择地图、单位和难度固定的小型场景。
2. 使用文档说明的 WML/Lua 附加组件结构进行隔离修改。
3. 在可用时记录种子，并保留起始存档以控制战斗变化。

**一手证据**

- [核心代码许可证](https://github.com/wesnoth/wesnoth/blob/ca544b10b5d0a88f1336465d82500cefee67bfc9/copyright)
- [文件级美术与音频清单](https://github.com/wesnoth/wesnoth/blob/ca544b10b5d0a88f1336465d82500cefee67bfc9/copyrights.csv)
- [核心与附加组件的许可证政策](https://wiki.wesnoth.org/index.php?title=Wesnoth:Copyrights&oldid=75641)
- [Steam 发布版](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/)
- [官方开发与场景文档](https://wiki.wesnoth.org/Create)

### Mindustry

一款物流与防御游戏，可在真实游戏项目中测试生产链、建造、资源规划和客户端/服务器修改。

**技术栈 / 格式：** Java / Gradle / 工厂与塔防

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[作者提供的免费下载](https://anuke.itch.io/mindustry) — 作者的 itch.io 页面允许零价格下载。Steam 版收费；免费访问源码不意味着每个商店的发布版都免费。

[项目 / 来源记录](https://github.com/Anuken/Mindustry) · [许可证 / 条款](https://github.com/Anuken/Mindustry/blob/master/LICENSE)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** GPLv3；保留依赖项和所分发修改的声明。
- **资源 / 数据：** 检查所选发布版的仓库及捆绑第三方声明；这里并未断言存在覆盖所有资源的 CC0 授权。
- **AI 用途：** 这是可访问源码、适用于规划和代码修改的有用试验平台。应保留提取的资源、地图和插件的许可证记录，不要根据免费下载推断数据集使用不受限制。
- **实际局限：** 本轮研究未安装或运行。战役地图和在线服务器会引入不受控状态；比较时应使用专用地图或本地服务器。

**建议测试任务**

- 在固定波次到来之前，建立能够维持指定资源产出速率的生产链。
- 修改方块或单位规则，并验证加载、建造和客户端/服务器行为。
- 在固定的自定义地图上衡量资源浪费、生存和目标完成情况。

**开始使用**

1. 从官方来源下载免费桌面发布版或服务器，并固定版本。
2. 使用起始资源和波次设置固定的小型自定义地图。
3. 如需修改源码，请遵循仓库的 JDK/Gradle 要求，而不是假定预装的 Java 版本可用。

**一手证据**

- [作者下载与定价](https://anuke.itch.io/mindustry)
- [官方源码、服务器与构建指引](https://github.com/Anuken/Mindustry)
- [仓库许可证](https://github.com/Anuken/Mindustry/blob/master/LICENSE)

### OpenTTD

一款运输模拟游戏，适用于路线与铁路建设、经济规划、寻路、存档和多人同步。

**技术栈 / 格式：** C++ / 等距视角运输模拟

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[官方免费下载](https://www.openttd.org/downloads/openttd-releases/latest) — 官网构建仍然免费。自 2026 年 3 月起，Steam/GOG 新用户需通过与原版 TTD 捆绑的付费包获取；现有用户继续获得更新。

[项目 / 来源记录](https://github.com/OpenTTD/OpenTTD) · [许可证 / 条款](https://github.com/OpenTTD/OpenTTD/blob/master/COPYING.md)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** GPLv2；组件声明仍然适用。
- **资源 / 数据：** 使用独立的 OpenGFX、OpenSFX 和 OpenMSX 基础资源集，并保留其许可证。原版 Transport Tycoon Deluxe 数据不是开放资源包。
- **AI 用途：** 开源代码和开放基础资源集可支持可复现场景。应将基础资源集与 NewGRF 的许可证分开，尤其是在导出视觉测试夹具或分发基准包时。
- **实际局限：** 本轮研究未安装或运行。Steam 已不再是新用户的零价格获取途径。长模拟时程需要固定的时间预算和一致的模拟设置。

**建议测试任务**

- 连接固定产业，在固定游戏时段内达到目标交付量或利润水平。
- 修复铁路死锁或寻路规则，并回放同一存档。
- 在修改源码或脚本后，验证保存/加载和同步。

**开始使用**

1. 下载免费官网发布版，安装开放的图形、音效和音乐基础资源集。
2. 固定地图种子、游戏选项、日期和起始存档；不添加不受控的 NewGRF 内容。
3. 使用小型场景或本地专用服务器，并定义可衡量的运输目标。

**一手证据**

- [官方源码与构建指引](https://github.com/OpenTTD/OpenTTD)
- [2026 年 3 月 Steam 分发变更](https://www.openttd.org/news/2026/03/14/steam-changes)
- [代码许可证](https://github.com/OpenTTD/OpenTTD/blob/master/COPYING.md)

### SuperTuxKart

一款完整的赛车游戏，适用于视觉转向、连续控制、物理回归、赛道、卡丁车和模型/材质流水线测试。

**技术栈 / 格式：** C++ / 3D 卡丁车竞速 / Blender 资源工作流

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[免费桌面版下载](https://supertuxkart.net/Download) — 免费桌面软件包。源码构建还需要构建文档中说明的游戏数据。

[项目 / 来源记录](https://github.com/supertuxkart/stk-code) · [许可证 / 条款](https://supertuxkart.net/Licensing)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** SuperTuxKart 代码采用 GPLv3 或更高版本；捆绑组件保留各自声明。
- **资源 / 数据：** 多种许可证，包括 Creative Commons 条款；请检查资源作者和许可证记录。
- **AI 用途：** 适用于插桩驾驶和资源集成，对每条再分发的赛道、每个角色或录制的资源集合，均需单独进行许可证审计。
- **实际局限：** 本轮研究未安装或运行。仅源码仓库并不等于完整的资源下载，基于屏幕的评估仍需要输入/重置测试框架。

**建议测试任务**

- 完成固定圈数，衡量完赛率、单圈时间、碰撞和恢复情况。
- 修改转向或碰撞行为，并对相同卡丁车和赛道进行比较。
- 导入测试卡丁车或赛道，验证缩放、材质、碰撞和运行时加载。

**开始使用**

1. 安装稳定二进制版本，固定赛道、卡丁车、难度和比赛设置。
2. 如需编辑代码，获取相匹配的游戏数据，并遵循 C++ 构建说明。
3. 保留基线驾驶序列，建立明确的圈数/完赛检测。

**一手证据**

- [官方源码与构建指引](https://github.com/supertuxkart/stk-code)
- [官方下载](https://supertuxkart.net/Download)
- [代码与资源许可证](https://supertuxkart.net/Licensing)
- [固定版本的 GPLv3 或更高版本及逐资源许可证范围](https://github.com/supertuxkart/stk-code/blob/2997f192e6876047909d909498dbb4810e5dbb8d/COPYING)

### Luanti + Minetest Game

一个可编辑的体素沙盒，适用于第一人称导航、挖掘、放置、合成，以及 Lua 实体、纹理和世界修改。

**技术栈 / 格式：** C++ Luanti 引擎 / Lua 游戏与模组 / 体素世界

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[获取 Minetest Game](https://content.luanti.org/packages/Minetest/minetest_game/) — 安装免费的 Luanti 引擎，再通过 ContentDB 添加此游戏。引擎和游戏是独立项目。

[项目 / 来源记录](https://github.com/luanti-org/luanti) · [许可证 / 条款](https://github.com/luanti-org/minetest_game/blob/master/LICENSE.txt)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** Luanti 引擎采用 LGPL2.1 或更高版本；Minetest Game 代码采用 LGPL2.1，并有模组级声明。
- **资源 / 数据：** Minetest Game 媒体默认采用 CC BY-SA 3.0；检查各模组 README 中的作者和例外情况。其他 ContentDB 软件包有独立条款。
- **AI 用途：** Lua 模组是实用的插桩点。记录添加到世界中的每个游戏/模组和资源的许可证；ContentDB 可用性本身并不构成笼统的数据使用许可。
- **实际局限：** 本轮研究未安装或运行。Minetest Game 是基础沙盒，没有单一内置基准目标；需要自定义任务设计和控制器桥接。

**建议测试任务**

- 创建具有固定导航、放置或合成目标及成功信号的 Lua 模组。
- 从相同种子、出生点、物品栏和世界快照出发，评估第一人称智能体。
- 添加实体或纹理，验证坐标比例、材质、碰撞和存档持久性。

**开始使用**

1. 固定 Luanti 发布版和确切的 Minetest Game 提交或软件包修订版本；该游戏采用滚动发布，目前仅进行维护。创建专用的本地测试世界。
2. 保存种子和原始世界快照，然后仅安装所需模组。
3. 使用小型自定义 Lua 模组公开重置、任务状态和可衡量的成功条件。

**一手证据**

- [引擎源码与安装](https://github.com/luanti-org/luanti)
- [官方游戏包](https://content.luanti.org/packages/Minetest/minetest_game/)
- [游戏代码与媒体许可证](https://github.com/luanti-org/minetest_game/blob/master/LICENSE.txt)
- [固定版本的滚动发布与维护政策](https://github.com/luanti-org/minetest_game/blob/c42e4d0c0ff9d27ff7b9b308c3cfc14098dd3a0f/README.md)

### Red Eclipse

一款第一人称竞技场游戏，适用于瞄准、导航、跑酷、机器人场景、实时地图编辑，以及原生客户端/服务器修改。

**技术栈 / 格式：** C++ / 第一人称竞技场射击 / 地图编辑器

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[免费 Steam 游戏](https://store.steampowered.com/app/967460/Red_Eclipse/) — 面向 Windows 和 Linux 的免费 Steam 发布版。评估时使用本地对局，并固定机器人/地图设置。

[项目 / 来源记录](https://github.com/redeclipse/base) · [许可证 / 条款](https://github.com/redeclipse/base/blob/master/doc/license.txt)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** 项目代码采用 zlib；捆绑组件保留各自声明。
- **资源 / 数据：** 游戏内容包含 CC BY-SA 和其他许可证；请查阅项目许可证清单。
- **AI 用途：** 开放的客户端/服务器支持受控插桩。共享地图或视觉数据集时应保留内容署名，并针对本地机器人或专用测试服务器进行评估。
- **实际局限：** 本轮研究未安装或运行。Steam 条目不提供 macOS 构建，常规游戏过程需要外部或集成在源码中的智能体测试框架。

**建议测试任务**

- 在固定地图上衡量目标捕获、导航、生存和目标完成情况。
- 修改移动或武器规则，并验证客户端/服务器对局仍可运行。
- 编辑测试地图，检查出生点、几何体、光照和碰撞。

**开始使用**

1. 使用受支持的 Windows/Linux 发布版，或遵循仓库构建说明。
2. 启动本地对局，固定地图、模式、机器人数量和难度。
3. 定义可重置目标，记录截图、输入时序和对局结果。

**一手证据**

- [官方源码](https://github.com/redeclipse/base)
- [Steam 发布版与支持的系统](https://store.steampowered.com/app/967460/Red_Eclipse/)
- [代码与内容许可证](https://github.com/redeclipse/base/blob/master/doc/license.txt)

### Zero-K

一款即时战略游戏，适用于资源规划、建造、单位控制、地形交互和多单位战术决策，具有可编辑的 Lua 游戏逻辑。

**技术栈 / 格式：** Lua 游戏逻辑 / 衍生自 Spring 的 RTS 引擎 / 大规模战略

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 3D

[免费 Steam 游戏](https://store.steampowered.com/app/334920/ZeroK/) — 免费 Steam 游戏。引擎、启动器、游戏模块、地图和其他数据是可玩安装中的独立部分。

[项目 / 来源记录](https://github.com/ZeroK-RTS/Zero-K) · [许可证 / 条款](https://github.com/ZeroK-RTS/Zero-K)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** 游戏模块仓库声明采用 GPLv2；个别文件及单独获取的引擎、启动器和工具需要各自检查许可证。
- **资源 / 数据：** 模型、纹理、声音和地图采用混合许可证；游戏逻辑仓库并不提供涵盖所有资源的许可证。
- **AI 用途：** 适用于代码插桩和 RTS 规划，但应保留模块和资源来源。公开的游戏模块仓库不能证明完整安装游戏适用单一许可证。
- **实际局限：** 本轮研究未安装或运行。这是规模较大的多组件配置；仅克隆 Lua 游戏仓库并不能获得完整可玩的游戏。

**建议测试任务**

- 从固定地图和起始位置出发，达到建造或经济目标。
- 对抗固定本地对手，评估单位选择、寻路和战术资源使用情况。
- 小范围修改 Lua 单位或游戏规则，验证场景以及保存/回放行为。

**开始使用**

1. 在分离出模块级开发任务之前，先安装完整的免费发布版。
2. 固定引擎、游戏版本、地图和本地 AI 配置。
3. 使用小型自定义场景和固定时间预算，而不是不受控的在线对局。

**一手证据**

- [游戏模块与源码声明](https://github.com/ZeroK-RTS/Zero-K)
- [固定版本的游戏模块 GPLv2 许可证](https://github.com/ZeroK-RTS/Zero-K/blob/e358dac2ca2f9163c5290f700d74466016305b04/LICENSE)
- [Steam 发布版](https://store.steampowered.com/app/334920/ZeroK/)
- [官方项目与开发入口](https://zero-k.info/)

### Unity BoatAttack

一个完整的快艇竞速示例，适用于浮力、航点 AI、摄像机控制、水面渲染、着色器和资源加载回归测试。

**技术栈 / 格式：** Unity / C# / Universal Render Pipeline

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[获取 Unity 示例源码](https://github.com/Unity-Technologies/BoatAttack) — 带有 Git LFS 内容的免费示例源码。文档指定的项目版本为 Unity 2020.3.23f1；引擎许可与安装另行处理。

[项目 / 来源记录](https://github.com/Unity-Technologies/BoatAttack) · [许可证 / 条款](https://github.com/Unity-Technologies/BoatAttack/blob/master/LICENSE.md)

- **许可证类别：** 引擎专用条款
- **代码：** Unity Companion License；这是引擎专用示例，而非整体采用 MIT/GPL 的项目。
- **资源 / 数据：** Unity Companion License 及适用的捆绑声明；不要将示例资源视为通用跨引擎资源库。
- **AI 用途：** 针对预期的工具连接、资源处理和数据使用，检查 Unity Companion License 及适用的 Unity 条款。源码可用不代表拥有不受限制的 AI 训练或数据集再分发权利。
- **实际局限：** 本轮研究未安装或运行。这一较旧的 Unity 基线可能需要软件包/平台维护；升级编辑器可能改变行为，应将其视为独立任务。

**建议测试任务**

- 修改浮力、转向或航点逻辑，并完成可重复的快艇路线。
- 将固定版本的项目迁移到较新的编辑器，并识别渲染或软件包回归问题。
- 在编辑前后验证水面、材质、摄像机输出和资源加载。

**开始使用**

1. 克隆前安装 Git LFS，并获取完整的大文件内容。
2. 按照 ProjectVersion.txt，使用 Unity 2020.3.23f1 打开干净副本；解析软件包，并在构建播放器之前构建 Addressables 内容。
3. 修改代码或另建迁移副本之前，保留基线及编辑器/软件包版本。

**一手证据**

- [官方示例、版本与许可证](https://github.com/Unity-Technologies/BoatAttack)
- [固定的编辑器版本](https://github.com/Unity-Technologies/BoatAttack/blob/6acf5f773a440030489cb5e2b3c009fb5fe1e8ce/ProjectSettings/ProjectVersion.txt)
- [Unity Companion License](https://unity.com/legal/licenses/unity-companion-license)
- [Git LFS 配置](https://git-lfs.com/)

### Unreal Engine Lyra Starter Game

一款官方多人入门游戏，适用于技能系统、输入、游戏功能插件、角色动画和较大规模的引擎集成任务。

**技术栈 / 格式：** Unreal Engine / C++ / Blueprint / Gameplay Ability System

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[获取免费 Lyra 示例](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en) — 通过 Epic/Fab 提供的免费示例，包含源码，受账户、Unreal Engine 和内容条款约束。条目将其标为 UE-Only。

[项目 / 来源记录](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) · [许可证 / 条款](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)

- **许可证类别：** 引擎专用条款
- **代码：** Unreal Engine 示例与引擎条款；包含源码不意味着采用 OSI 开源许可证。
- **资源 / 数据：** 受适用 Epic 条款约束的 UE-Only 内容。所审查的 Fab 条目显示“允许用于 AI：否”。
- **AI 用途：** Fab 的 AI 字段要求针对预期的资源/数据工作流另行检查。既不应将其扩大解读为所有编码助手编辑都被禁止，也不应无视该字段，将其视为 AI 评估或训练的笼统许可。
- **实际局限：** 本轮研究未安装或运行。配置相对繁重，且存在引擎专用内容和 AI 使用条件；它不属于不受限制的开放许可证入门资源集。

**建议测试任务**

- 小范围修改技能或输入行为，并在范围有限的对局中验证。
- 修改游戏功能插件，验证激活、角色设置和多人行为。
- 测试获准的角色动画/导入任务，检查骨架映射和运行时播放。

**开始使用**

1. 将 Lyra 选作 AI 数据测试夹具之前，依据条目及适用 Epic 条款审查预期用途。
2. 通过 Epic/Fab 获取示例，创建与所选 Unreal Engine 版本兼容的项目。
3. 固定引擎、插件、地图和对局配置；多人测试前先开展小型本地任务。

**一手证据**

- [官方 Lyra 文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)
- [Fab 访问与内容字段](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)
- [Unreal Engine EULA](https://www.unrealengine.com/en-US/eula/unreal)

### Bevy official examples

引擎官方自带的可运行示例集，可作为 ECS、渲染、资源导入与动画回归的小型版本化基线。

**技术栈 / 格式：** Rust · Bevy ECS · 覆盖 2D、3D、UI、动画、音频与 glTF 的官方示例

**类型：** 游戏与引擎项目 ·  **目标：** 编码与自动化试玩；资源与动画流水线 ·  **维度：** 2D / 3D

[浏览可运行示例](https://bevyengine.org/examples/) — 官方示例浏览器按主题分组；运行示例需要克隆仓库并准备 Rust 工具链。

[项目 / 来源记录](https://github.com/bevyengine/bevy) · [许可证 / 条款](https://github.com/bevyengine/bevy/blob/main/LICENSE-APACHE)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** 引擎源码可任选 MIT 或 Apache-2.0。
- **资源 / 数据：** examples/ 下随附的资产各有单独许可，列于 CREDITS.md；这些资产不随已发布的 crate 分发。
- **AI 用途：** 把示例用作基线前须固定发布标签。引擎按固定节奏发布含破坏性变更的版本，且示例资产受各自许可约束，而非引擎的双许可。
- **实际局限：** Bevy 自述仍处早期阶段，约每三个月有破坏性 API 变更，因此 main 不是稳定基线。示例资产在 CREDITS.md 中另有许可。本次仅审阅来源，未在本地构建或运行。

**建议测试任务**

- 在固定标签上运行一个 2D 与一个 3D 示例，比较画面输出、资源加载与控制台警告。
- 改动单个 ECS 系统或导入的 glTF 资产，检查示例仍能启动并记录相同场景状态。

**开始使用**

1. 检出发布标签而非 main，并安装该版本所需的 Rust 工具链。
2. 用 cargo run --example breakout 运行一个示例，记录标签、工具链、图形适配器，以及 CREDITS.md 中的资产许可。

**一手证据**

- [官方示例浏览器](https://bevyengine.org/examples/)
- [示例目录与覆盖范围](https://github.com/bevyengine/bevy/tree/main/examples)
- [CREDITS.md 中的逐资产许可说明](https://github.com/bevyengine/bevy/blob/main/CREDITS.md)

### MiniGrid / BabyAI

具有钥匙、门、物体和部分观察的小型导航与语言落地任务。是可重复规划测试的实用首选基线。

**技术栈 / 格式：** Python · Gymnasium · 离散网格世界

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[免费 Python 软件包](https://minigrid.farama.org/) — 在本地安装 minigrid；无需商业游戏或模型 API。

[项目 / 来源记录](https://github.com/Farama-Foundation/Minigrid) · [许可证 / 条款](https://github.com/Farama-Foundation/Minigrid/blob/main/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** 当前仓库采用 Apache-2.0。
- **资源 / 数据：** 使用捆绑的程序化网格渲染；添加的图像和数据集需要各自的来源记录。
- **AI 用途：** 为智能体研究而构建。保留许可证声明；在每次评估中明确区分渲染像素、符号观察和任务文本。
- **实际局限：** 已审查源码，未在此安装。官方不支持 Windows；默认的紧凑观察不是普通 RGB 截图。

**建议测试任务**

- 在固定动作预算下，比较固定种子的门与钥匙任务成功率。
- 修改环境规则，然后检查重置、观察和目标完成情况。
- 在不提供隐藏地图状态的情况下测试 BabyAI 指令。

**开始使用**

1. 在 Linux 或 macOS 上创建 Python 3.11+ 环境，运行 pip install minigrid。
2. 导入 minigrid 和 gymnasium；创建 MiniGrid-Empty-8x8-v0，并调用 reset(seed=0)。
3. 使用 RGBImgPartialObsWrapper 获取智能体视角 RGB；RGBImgObsWrapper 会显示完整网格。分别记录包装器、任务文本访问、动作、terminated 和 truncated。

**一手证据**

- [安装与 BabyAI 任务](https://github.com/Farama-Foundation/Minigrid#readme)
- [观察包装器](https://minigrid.farama.org/api/wrappers/)
- [固定版本的 RGB 可见性与包装器实现](https://github.com/Farama-Foundation/Minigrid/blob/7f5853792ea7f04f75614661006d87fcf949f26d/minigrid/wrappers.py)

### Crafter

一个紧凑的生存世界，结合探索、生命值、采集、建造和合成。成就进度可揭示游玩智能体的不同优势。

**技术栈 / 格式：** Python · Gym 接口 · 像素生存

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[免费软件包与可玩 GUI](https://github.com/danijar/crafter#play-yourself) — pip install crafter pygame；GUI 和评估环境在本地运行。

[项目 / 来源记录](https://github.com/danijar/crafter) · [许可证 / 条款](https://github.com/danijar/crafter/blob/main/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** MIT。
- **资源 / 数据：** 仓库材料受其 MIT 声明约束；任何替换美术都应单独跟踪。
- **AI 用途：** 为智能体评估而设计。仅像素测试时，不向策略提供 info.semantic、inventory 和 player_pos；这些会公开 RGB 观察之外的结构化状态。将已发表基准的预算与自定义 VLM 协议分开。
- **实际局限：** 已审查源码，未在此运行。经典 Gym 的 reset 仅返回观察，step 返回四个值。reset 没有 seed 参数；仅匹配构造函数种子还不够，回合/重置顺序也必须匹配。

**建议测试任务**

- 在留出的世界种子上衡量生存和成就成功情况。
- 在固定交互预算下规划从资源到工具的序列。
- 修改配方，验证采集、合成和成就记录保持一致。

**开始使用**

1. 在隔离的 Python 环境中安装 crafter 和 pygame。
2. 运行 python -m crafter.run_gui 进行手动控制，然后使用 CrafterReward-v1 实现自动化。
3. 在构造环境时设置种子并记录回合索引；使用 crafter.Recorder，指定非空输出目录、save_stats=True 和 save_episode=True，以保留已完成回合的统计数据和动作轨迹。

**一手证据**

- [观察、动作与记录器](https://github.com/danijar/crafter#interface)
- [基于成就的评估](https://github.com/danijar/crafter#evaluation)
- [固定版本的重置、种子与特权信息契约](https://github.com/danijar/crafter/blob/e04542a2159f1aad3d4c5ad52e8185717380ee3a/crafter/env.py)
- [固定版本的已完成回合记录器契约](https://github.com/danijar/crafter/blob/e04542a2159f1aad3d4c5ad52e8185717380ee3a/crafter/recorder.py)

### Craftax

一个采用向量化模拟的生存与合成环境。适用于较长的动作依赖，以及比较基于像素和基于符号的策略。

**技术栈 / 格式：** Python · JAX · gymnax 风格 API

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[免费 Python 软件包](https://github.com/MichaelTMatthews/Craftax#readme) — 默认安装 CPU JAX；加速器支持需要正确的 JAX 构建。

[项目 / 来源记录](https://github.com/MichaelTMatthews/Craftax) · [许可证 / 条款](https://github.com/MichaelTMatthews/Craftax/blob/main/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** MIT。
- **资源 / 数据：** 仓库材料受其 MIT 声明约束；添加的资源需要单独记录。
- **AI 用途：** 固定观察模式、PRNG 密钥、回合处理和软件包版本。版本变化会影响可比性：1.5.0 修复了首次种植植物的生长问题，1.6.0 修复了 Craftax-Classic 的死亡奖励。
- **实际局限：** 已审查源码，未在此运行。JIT 启动较慢。auto_reset=True 时，done 步骤会返回下一回合的观察/状态，以及上一回合的奖励/done/info。auto_reset=False 时，应先处理终止，再执行下一步。

**建议测试任务**

- 使用完全相同的固定种子世界，比较生存和合成进度。
- 将仅图像策略与符号状态策略分开。
- 修改方块或配方，必要时使纹理缓存失效，并检查重置行为。

**开始使用**

1. 在隔离的 Python 环境中运行 pip install craftax。
2. 运行 play_craftax 或 play_craftax_classic 进行手动游玩。
3. 明确选择 Craftax-Pixels-v1 或 Craftax-Symbolic-v1；将完整版 Craftax 与 Craftax-Classic 分开。为 reset 和 step 提供不同的 JAX 密钥，并记录 auto_reset 设置。

**一手证据**

- [安装、API 与重置注意事项](https://github.com/MichaelTMatthews/Craftax#readme)
- [游戏教程](https://github.com/MichaelTMatthews/Craftax/blob/main/tutorial.md)
- [固定版本的自动重置转换实现](https://github.com/MichaelTMatthews/Craftax/blob/c3c2e0d038c4e641f9481320c158f457f30c28f3/craftax/environment_base/environment_bases.py)

### ViZDoom

用于瞄准、导航、战斗和记忆的第一人称环境，具有可编程动作和场景控制。视角为 3D；渲染器采用 Doom 风格技术。

**技术栈 / 格式：** Python / C++ · Doom / ZDoom · Gymnasium

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 3D

[包含 Freedoom 资源的免费软件包](https://vizdoom.farama.org/) — pip install vizdoom；先从捆绑场景开始，而不是商业 Doom WAD。

[项目 / 来源记录](https://github.com/Farama-Foundation/ViZDoom) · [许可证 / 条款](https://github.com/Farama-Foundation/ViZDoom#license)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** ViZDoom 的原创贡献采用 MIT；底层 ZDoom 组件采用独立许可证。
- **资源 / 数据：** Freedoom 是默认资源集。不提供原版 Doom / Doom II WAD，使用它们需要另行取得权利。
- **AI 用途：** 为 AI 实验而构建；这并不授予任意 WAD 的使用权。记录评估使用的场景、基础资源及许可证。
- **实际局限：** 已审查源码，未在此运行。ViZDoom 1.3+ 的 macOS wheel 需要 Apple Silicon 和 macOS 14+；文档指定的 Intel wheel 路径为 1.2.4。包装器的超时处理在 1.3.0 中发生变化，因此应固定版本和超时选项。WAD 权利仍须按场景分别确认。

**建议测试任务**

- 在固定动作频率下，评估瞄准准确度、导航完成情况和生存。
- 比较仅像素控制与使用特权缓冲区的控制，明确将其标记为不同赛道。
- 编辑场景，检查出生点、目标、奖励和终止。

**开始使用**

1. 在受支持的 Python 环境中安装 vizdoom；检查操作系统和架构的 wheel 支持情况。
2. 从仓库 Python 示例和捆绑的基础场景开始。
3. 对于 Gymnasium 包装器，固定 config、缓冲区、按钮空间和 frame_skip；使用 reset(seed=...)，分别记录 terminated 和 truncated，包括 treat_episode_timeout_as_truncation。

**一手证据**

- [软件包安装与示例](https://github.com/Farama-Foundation/ViZDoom#python-quick-start)
- [Freedoom、WAD 与自定义场景](https://vizdoom.farama.org/faq/)
- [固定版本的 Gymnasium 时序、种子与超时契约](https://github.com/Farama-Foundation/ViZDoom/blob/909e834264e42f136f59f80e72e95d8146f40e21/gymnasium_wrapper/base_gymnasium_env.py)

### NetHack Learning Environment

一个高难度的 roguelike 接口，适用于探索、物品栏、战术选择和长期规划。请使用仍在维护的 NetHack-LE 组织，而不是已归档的 Facebook 仓库。

**技术栈 / 格式：** Python · C / C++ · Gymnasium · NetHack

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[免费软件包与源码](https://github.com/NetHack-LE/nle#installation) — 可能需要原生编译前提条件；仓库包含交互式脚本和随机智能体脚本。

[项目 / 来源记录](https://github.com/NetHack-LE/nle) · [许可证 / 条款](https://github.com/NetHack-LE/nle/blob/main/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** NetHack General Public License；保留声明并遵守源码/分发义务。
- **资源 / 数据：** 捆绑的 NetHack 数据遵循仓库声明；外部图块集另行处理。
- **AI 用途：** 这是 AI 研究接口；区分终端渲染、符号、文本消息和内部状态，使规划结果保持可比。
- **实际局限：** 已审查源码，未在此运行。可能需要原生工具。在所检查的代码中，reset(seed=...) 会为 Gymnasium 设置种子，但不会设置 NetHack RNG；请使用显式种子接口。NetHackChallenge 有意禁止更改种子。终端/字形观察不是 RGB 游戏帧。

**建议测试任务**

- 在固定回合预算下衡量楼梯任务或得分任务的进度。
- 测试物品栏决策及无效动作后的恢复。
- 修改任务奖励或终止规则，并回放基线轨迹。

**开始使用**

1. 准备 Python 3.10+、CMake 3.28+ 以及上游文档说明的平台构建前提条件。
2. 安装 nle，然后运行 python -m nle.scripts.play --mode random。
3. 创建 NetHackScore-v0，固定 observation_keys、actions 和 fix_moon_phase=True；重置前，使用已记录的 core、disp、reseed=False 及可选 lgen 值调用 env.unwrapped.seed。

**一手证据**

- [维护中的源码、安装与游玩脚本](https://github.com/NetHack-LE/nle#readme)
- [已归档的上游仓库](https://github.com/facebookresearch/nle)
- [固定版本的观察、种子与重置实现](https://github.com/NetHack-LE/nle/blob/2319f2989f0035685017e9ea13c83b2546fe477c/nle/env/base.py)

### Godot RL Agents

将可编辑的 Godot 游戏连接到 Python 智能体。适用于在你拥有的场景中修改玩法、公开观察和评估 NPC 控制。

**技术栈 / 格式：** Godot 4 · Python · 游戏传感器与动作桥接

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 ·  **维度：** 2D / 3D

[免费工具包与示例项目](https://github.com/edbeeching/godot_rl_agents#quickstart-guide) — 安装 godot-rl 并导入示例；使用编辑器运行可免去预构建游戏二进制文件的需要。

[项目 / 来源记录](https://github.com/edbeeching/godot_rl_agents) · [许可证 / 条款](https://github.com/edbeeching/godot_rl_agents/blob/main/LICENSE)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** Godot RL Agents 采用 MIT；Godot 也采用 MIT。
- **资源 / 数据：** 示例资源可能有独立声明：Cartoon Plane 模型采用 CC BY 4.0。
- **AI 用途：** 为学习和自动化玩法测试而设计。将导入模型的权利信息和示例署名与 MIT 工具包许可证一同保留。
- **实际局限：** 已审查源码，未在此运行。所检查的桥接在启动二进制文件时发送 env_seed，但 reset(seed=...) 仅发送重置消息。编辑器运行需要场景/插件层面的种子控制；应验证重置的可重复性，而不是假定 Python 参数会为 Godot 重新设种。

**建议测试任务**

- 修改移动或奖励逻辑，确定该场景重置/回放的可重复性，然后比较固定输入轨迹。
- 测试传感器、动作缩放和 Python 与游戏之间的同步。
- 替换角色或碰撞体，并验证观察和控制仍然可用。

**开始使用**

1. 在 Python 环境中安装 godot-rl，下载文档列出的示例，例如 JumperHard。
2. 对于文档中的编辑器示例，使用相匹配的 Godot 4 .NET 编辑器；导入项目。
3. 运行仓库的 Stable Baselines 3 示例，或将其环境接口适配为固定策略。

**一手证据**

- [编辑器与导出游戏工作流](https://github.com/edbeeching/godot_rl_agents#quickstart-guide)
- [示例资源署名](https://github.com/edbeeching/godot_rl_agents#license)
- [固定版本的二进制启动与重置种子行为](https://github.com/edbeeching/godot_rl_agents/blob/207b6f476f5846f33d08b92c7a350147e7b78bf5/godot_rl/core/godot_env.py)

### Unity ML-Agents

一个官方工具包及示例场景，适用于物理、视觉控制、协作和竞争。它可以将自定义 Unity 场景公开给 Python 策略和自动化测试。

**技术栈 / 格式：** Unity · C# · Python · 传感器与智能体动作

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划；资源与动画流水线 ·  **维度：** 2D / 3D

[免费工具包；需要 Unity 编辑器](https://github.com/Unity-Technologies/ml-agents/releases) — 选择一个发布版，并匹配其 Unity 软件包、Python 软件包和受支持的编辑器版本。

[项目 / 来源记录](https://github.com/Unity-Technologies/ml-agents) · [许可证 / 条款](https://github.com/Unity-Technologies/ml-agents/blob/develop/LICENSE.md)

- **许可证类别：** 引擎专用条款
- **代码：** 工具包采用 Apache-2.0，并附带第三方声明。
- **资源 / 数据：** 检查捆绑声明及任何添加的场景资源。Unity 编辑器和外部商店资源有独立条款。
- **AI 用途：** 工具包支持智能体研究和自动化测试；其 Apache 许可证不能替代编辑器或第三方资源条款。
- **实际局限：** 已审查源码，未在此运行。编辑器使用资格、平台构建和版本兼容性需要本地检查。develop 分支不是稳定的评估基线。

**建议测试任务**

- 在固定观察、决策和重置规则下，比较物理任务的成功情况。
- 修改 C# 智能体或场景，并验证传感器、奖励和回合终止。
- 导入替换骨架或碰撞体，检查控制稳定性和视觉观察。

**开始使用**

1. 选择发布标签，安装其支持的 Unity 编辑器，并打开随附的 Project。
2. 安装相匹配的 com.unity.ml-agents 软件包和 Python 环境软件包版本。
3. 打开示例场景并连接策略；按 behavior 和 agent_id 路由动作，同时读取 DecisionSteps 和 TerminalSteps。Python step 推进到下一个决策点，而不一定是一个物理帧。

**一手证据**

- [官方工具包与发布版本兼容性](https://github.com/Unity-Technologies/ml-agents#readme)
- [Release 23 的低层决策与终止契约](https://github.com/Unity-Technologies/ml-agents/blob/a2777719560e4676be99e2ea128c5eb1fbeb3dbb/com.unity.ml-agents/Documentation~/Python-LLAPI.md)
- [第三方声明](https://github.com/Unity-Technologies/ml-agents/blob/develop/Third%20Party%20Notices.md)
- [Unity 编辑器条款](https://unity.com/legal/editor-terms-of-service/software)

### Arcade Learning Environment (ALE)

覆盖 100 余款游戏的 Atari 2600 标准评测接口，原生支持 Gymnasium，提供分数与终止信号，以及可设种子的评测协议。

**技术栈 / 格式：** C++ / Python · Stella Atari 2600 模拟器 · Gymnasium API

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[官方文档与安装指南](https://ale.farama.org/) — 从 PyPI 安装 ale-py；pip 包内含 Atari ROM，项目另提供 WebAssembly 构建。

[项目 / 来源记录](https://github.com/Farama-Foundation/Arcade-Learning-Environment) · [许可证 / 条款](https://github.com/Farama-Foundation/Arcade-Learning-Environment/blob/main/LICENSE.md)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** ALE 框架采用 GPL-2.0。
- **资源 / 数据：** Atari ROM 随 pip 包提供；其权利与框架许可分离，再分发前需单独核查。
- **AI 用途：** 比较代理前固定游戏、模式、难度、跳帧、重复动作概率与种子；分别说明观察来源（像素或 RAM）。随包提供 ROM 不等于允许再分发数据集。
- **实际局限：** GPL-2.0 只适用于框架，pip 包内的 Atari ROM 属于第三方游戏资产，再分发需另行核查权利。本次仅审阅来源，未在本地安装，也未运行任何 Atari 评测。

**建议测试任务**

- 在相同动作预算下，比较同一游戏开启与关闭粘性动作时的固定种子得分。
- 记录代理使用 RGB 像素还是 RAM 状态，并检查重置、截断与失去生命信号。
- 回放固定动作序列，断言不同运行与依赖版本下的得分一致。

**开始使用**

1. 创建 Python 环境，安装 ale-py 与 Gymnasium，并列出可用的 ROM 标识。
2. 以固定的模式、难度、跳帧、repeat_action_probability 和种子创建 Atari 环境。
3. 逐回合记录得分、terminated 与 truncated；保留 ale-py 版本与 ROM 清单。

**一手证据**

- [功能、Gymnasium 支持与随包 ROM](https://github.com/Farama-Foundation/Arcade-Learning-Environment#readme)
- [环境列表与评测协议](https://ale.farama.org/environments/)
- [GPL-2.0 许可证文本](https://github.com/Farama-Foundation/Arcade-Learning-Environment/blob/main/LICENSE.md)

### Procgen Benchmark

16 个高速程序化生成环境，用于衡量代理多快能学会可迁移到未见关卡的技能。

**技术栈 / 格式：** Python · Gym API · 16 个程序化生成的类游戏环境

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[安装 Python 软件包](https://github.com/openai/procgen#readme) — 从仓库安装 procgen；这些环境在单核 CPU 上每秒可运行数千步。

[项目 / 来源记录](https://github.com/openai/procgen) · [许可证 / 条款](https://github.com/openai/procgen/blob/master/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** MIT。
- **资源 / 数据：** 画面由程序化生成；标准环境不需要随包的第三方游戏美术。
- **AI 用途：** 比较代理前须分离训练与测试关卡分布，并固定训练关卡数、种子和分布模式。步速快并不免除报告墙钟时间与样本预算的义务。
- **实际局限：** 仓库声明处于维护模式，仅修复缺陷与小幅更新。CoinRun 与早期独立发布版存在差异，标准包装器还需要兼容的 Gym 版本。本次仅审阅来源，未在本地安装或运行。

**建议测试任务**

- 比较在小关卡集上训练与在完整分布上训练的代理，用留出种子评估。
- 跨软件包版本回放固定种子，断言初始观察与动作掩码一致。
- 测量单个环境每秒步数，并记录硬件与线程数。

**开始使用**

1. 创建 Python 环境，安装 procgen 与兼容的 Gym 或 Gymnasium 包装器。
2. 以固定种子和分布模式创建一个环境，记录观察、奖励与结束信号。

**一手证据**

- [README 中的环境列表与速度说明](https://github.com/openai/procgen#readme)
- [基准论文](https://arxiv.org/abs/1912.01588)
- [MIT 许可证文本](https://github.com/openai/procgen/blob/master/LICENSE)

### Google Research Football

可配置场景、多智能体对战与多种观察表示的研究型足球环境，自带游戏引擎。

**技术栈 / 格式：** C++ 游戏引擎 · Python Gym API · 多智能体足球场景

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 3D

[安装与场景指南](https://github.com/google-research/football#readme) — 可从 PyPI 安装或从源码构建；仓库还提供使用预编译二进制的 Colab 笔记本。

[项目 / 来源记录](https://github.com/google-research/football) · [许可证 / 条款](https://github.com/google-research/football/blob/master/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** Apache-2.0。
- **资源 / 数据：** 基于开源项目 Gameplay Football；随包资产与另行下载的引擎组件须分别核查。
- **AI 用途：** 比较策略前固定场景、受控球员数、观察表示、动作集、种子与回合长度。预编译二进制只是便利条件，不构成可复现性保证。
- **实际局限：** 该 GitHub 仓库已归档，最后一次推送为 2025 年 6 月，不应假定仍会维护。安装依赖平台专用二进制或源码构建，底层 Gameplay Football 资产另有来源。本次仅审阅来源，未在本地安装或运行。

**建议测试任务**

- 比较同一策略在像素、紧凑向量表示与完整状态表示下的表现。
- 在两个软件包版本上以固定种子运行同一场景，核对得分与回合长度。
- 检查多智能体场景在重置后是否出现角色分配与时序失同步。

**开始使用**

1. 从 PyPI 安装某个发布版或从源码构建，并确认引擎二进制与 Python 版本。
2. 以固定种子创建一个场景，记录观察形状与动作集，并运行一局简短基线。

**一手证据**

- [README 中的安装、场景与表示说明](https://github.com/google-research/football#readme)
- [基准论文](https://arxiv.org/abs/1907.11180)
- [Apache-2.0 许可证文本](https://github.com/google-research/football/blob/master/LICENSE)

### Overcooked-AI

双代理协作烹饪基准，含手工与程序化布局，用于协调与人机协作研究。

**技术栈 / 格式：** Python · Gym 风格 API · 双代理协作布局

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[安装与布局指南](https://github.com/HumanCompatibleAI/overcooked_ai#readme) — 安装 overcooked-ai Python 包；布局与规划基线随包提供。

[项目 / 来源记录](https://github.com/HumanCompatibleAI/overcooked_ai) · [许可证 / 条款](https://github.com/HumanCompatibleAI/overcooked_ai/blob/master/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** MIT。
- **资源 / 数据：** 仓库代码与布局定义适用 MIT；README 链接的人类研究数据另行处理。
- **AI 用途：** 固定布局、回合长度、伙伴策略与种子。得分会掩盖协调失败，因此须分别记录联合动作、碰撞与空转步数。
- **实际局限：** 仓库最后一次推送为 2025 年 3 月，README 指向的人类研究数据集有独立条款。布局名称与旧版 Gym API 需要固定。本次仅审阅来源，未在本地安装或运行。

**建议测试任务**

- 在同一布局上比较自对弈组合与固定启发式伙伴，报告得分与碰撞次数。
- 回放固定的联合动作序列，断言重置后的状态转移一致。
- 检查程序化生成的布局能否由记录的种子复现。

**开始使用**

1. 在 Python 环境中安装 overcooked-ai 并列出可用布局。
2. 以具名布局、固定回合长度与种子创建双代理环境，记录联合观察与奖励。

**一手证据**

- [README 中的布局与安装说明](https://github.com/HumanCompatibleAI/overcooked_ai#readme)
- [基准论文](https://arxiv.org/abs/1910.05789)
- [MIT 许可证文本](https://github.com/HumanCompatibleAI/overcooked_ai/blob/master/LICENSE)

### MuJoCo

带 Python 接口的确定性接触动力学引擎，适合作为模拟角色与物体的物理及确定性基线。

**技术栈 / 格式：** C/C++ 物理引擎 · MJCF / URDF 模型 · Python 绑定

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；资源与动画流水线 ·  **维度：** 3D

[官方文档](https://mujoco.readthedocs.io/en/stable/overview.html) — 可作为 mujoco Python 包安装；项目开源后不再需要单独的许可密钥。

[项目 / 来源记录](https://github.com/google-deepmind/mujoco) · [许可证 / 条款](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** Apache-2.0。
- **资源 / 数据：** 项目随附的 MJCF 模型与网格须单独核查来源；用户自备模型另行处理。
- **AI 用途：** 物理回归应使用受控的 MJCF 模型、固定步长与求解器设置，并记录引擎版本，因为接触行为可能随版本变化。MuJoCo 是物理仿真器，不是游戏，也不是试玩基准。
- **实际局限：** MuJoCo 面向机器人与生物力学而非游戏玩法；每项测试都需单独论证与游戏的相关性。随附模型与网格另有来源。本次仅审阅来源，未在本地构建或运行。

**建议测试任务**

- 在一个模型上回放固定控制序列，比较不同引擎版本下的最终刚体位置。
- 把同一绑定分别导入为 MJCF 与 URDF，比较关节限制、质量属性与接触行为。

**开始使用**

1. 固定 mujoco 发布版，加载一个 MJCF 模型并记录步长、积分器与求解器设置。
2. 以固定控制序列推进仿真，记录位置、速度与接触信息。

**一手证据**

- [README 中的安装与绑定说明](https://github.com/google-deepmind/mujoco#readme)
- [官方文档概览](https://mujoco.readthedocs.io/en/stable/overview.html)
- [Apache-2.0 许可证文本](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)

### Gymnasium classic control

状态方程完全公开的小型确定性控制环境，适合检验重置、种子与回合终止行为。

**技术栈 / 格式：** Python · Gymnasium API · CartPole、Pendulum、MountainCar 与 Acrobot

**类型：** AI 评估环境 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D

[经典控制环境文档](https://gymnasium.farama.org/environments/classic_control/) — 这些环境不需要外部游戏二进制、ROM 或模型下载。

[项目 / 来源记录](https://github.com/Farama-Foundation/Gymnasium) · [许可证 / 条款](https://github.com/Farama-Foundation/Gymnasium/blob/main/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** MIT。
- **资源 / 数据：** 仅使用程序化渲染；这些环境不需要随包的第三方游戏资产。
- **AI 用途：** 固定环境 id、种子、渲染模式与 Gymnasium 版本。这些玩具任务可用于验证代理流水线，但不得当作试玩证据报告。
- **实际局限：** 经典控制任务是玩具级控制问题，不是游戏。此处仅将其作为确定性流水线检查；本次审阅未在本地安装或运行任何环境。

**建议测试任务**

- 以同一种子重置两个环境，断言初始观察与终止阈值一致。
- 改动包装器或动作映射层，验证 step、terminated 与 truncated 契约仍成立。

**开始使用**

1. 安装固定的 gymnasium 发布版，并以固定种子创建一个经典控制环境。
2. 记录观察边界、动作空间、终止条件与精确版本字符串。

**一手证据**

- [经典控制环境参考文档](https://gymnasium.farama.org/environments/classic_control/)
- [Gymnasium README 与 API 范围](https://github.com/Farama-Foundation/Gymnasium#readme)
- [MIT 许可证文本](https://github.com/Farama-Foundation/Gymnasium/blob/main/LICENSE)

### Kenney

用于小型测试场景、资源替换、碰撞和 UI 回归的实用 CC0 起点。

**技术栈 / 格式：** 精灵、图块、UI、音频和 3D 模型包

**类型：** 资源库 ·  **目标：** 编码与自动化试玩；资源与动画流水线 ·  **维度：** 2D / 3D

[浏览免费资源包](https://kenney.nl/assets) — 单个资源包免费；可选捆绑包和工具属于独立产品。

[项目 / 来源记录](https://kenney.nl/assets) · [许可证 / 条款](https://kenney.nl/support)

- **许可证类别：** 开放许可证来源
- **代码：** 不是软件项目
- **资源 / 数据：** 资源包采用 CC0
- **AI 用途：** 使用 CC0 资源包文件作为可再分发测试夹具的基础。这并不意味着网站、品牌或单独销售的软件也是 CC0。
- **实际局限：** 并非每个资源包都包含动画或人形骨架。本次审查未在本地导入任何资源包。

**建议测试任务**

- 替换精灵或模型，检查缩放、碰撞和材质引用。
- 运行固定的 UI 或瓦片地图场景，并比较截图。

**开始使用**

1. 选择一个小型资源包，保留随附的许可证文件。
2. 将资源包导入受版本管理的测试项目，并记录导入设置。

**一手证据**

- [创作者许可证常见问题](https://kenney.nl/support)

### Quaternius

用于可重复导入、材质、碰撞和动画测试的 CC0 模型与角色。

**技术栈 / 格式：** 低多边形环境、角色和动画模型包

**类型：** 资源库 ·  **目标：** 编码与自动化试玩；资源与动画流水线 ·  **维度：** 3D

[浏览创作者资源包](https://quaternius.com/) — 检查确切资源包：免费 Standard 下载版与付费 Pro 或 Source 版可能包含不同文件。

[项目 / 来源记录](https://quaternius.com/) · [许可证 / 条款](https://quaternius.com/)

- **许可证类别：** 开放许可证来源
- **代码：** 不是软件项目
- **资源 / 数据：** 创作者指定的资源包采用 CC0；检查每次下载
- **AI 用途：** 以所下载文件的 CC0 标识作为复用依据。免费版不代表有权获取付费源文件或无关市场内容。
- **实际局限：** 资源包格式和所含骨架各不相同；Standard 不一定是完整集合。所引用的 Universal Animation Library 更新日志记录了 v2.0 中 Unreal FBX 到 GLB 的导出与骨架名称变化、v2.1 中从 24 到 30 fps 的修正，以及 v3.0 中的根运动和步态相位变化；要获得可比较的测试，应固定发布版和根运动变体。未进行本地导入。

**建议测试任务**

- 将同一模型导入两个引擎，比较缩放、着色和碰撞。
- 在保留动画和场景引用的情况下替换角色。

**开始使用**

1. 选择明确采用 CC0 的资源包，保存其版本类型和发布详情。
2. 将原始压缩包与引擎导入设置一同保留。

**一手证据**

- [创作者资源目录与许可证](https://quaternius.com/)
- [示例资源包与版本详情](https://quaternius.itch.io/universal-animation-library)

### Poly Haven

用于材质、光照、依赖和视觉域回归测试的 CC0 写实资源。

**技术栈 / 格式：** PBR 纹理、HDRI、3D 模型和公开下载 API

**类型：** 资源库 ·  **目标：** 视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[浏览 CC0 资源](https://polyhaven.com/all) — 免费下载；自 2026 年 7 月 18 日起，API 对个人、学术和商业用途免费。

[项目 / 来源记录](https://polyhaven.com/) · [许可证 / 条款](https://polyhaven.com/license)

- **许可证类别：** 开放许可证来源
- **代码：** 不是软件项目
- **资源 / 数据：** 可下载资源采用 CC0；在线 API 服务有独立条件
- **AI 用途：** 官方 API 页面明确将 AI/ML 数据集列为支持用途。使用在线 API 的产品必须将 Poly Haven 标识为资源来源，请求需要唯一的 User-Agent；这些条件独立于 CC0。
- **实际局限：** 网站文字和示例渲染图不在 CC0 资源授权范围内。API 可用性仅尽力保障；未进行本地导入。

**建议测试任务**

- 导入后检查纹理依赖、法线方向和物理尺度。
- 比较固定场景在不同 HDRI 或材质分辨率下的表现。

**开始使用**

1. 在受控分辨率下选择一个小型模型、纹理集或 HDRI。
2. 如需集成 API，应保留文件哈希，并遵守来源署名和 User-Agent 条件。

**一手证据**

- [资源许可证](https://polyhaven.com/license)
- [当前 API 条款与端点](https://polyhaven.com/our-api)

### ambientCG

一个 CC0 来源，用于纹理通道、地形、光照和材质分辨率测试夹具。

**技术栈 / 格式：** PBR 材质、贴花、图集、HDRI、地形和模型

**类型：** 资源库 ·  **目标：** 视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[浏览可下载资源](https://ambientcg.com/list) — 公开资源下载免费；可选支持服务另行处理。

[项目 / 来源记录](https://ambientcg.com/) · [许可证 / 条款](https://docs.ambientcg.com/license/)

- **许可证类别：** 开放许可证来源
- **代码：** 不是软件项目
- **资源 / 数据：** 可下载资源采用 CC0
- **AI 用途：** 应以资源的 CC0 授权而非零价格作为复用依据。将服务访问条件及任何无关第三方内容分开处理。
- **实际局限：** 资源格式和可用贴图各不相同。本次审查未下载或导入测试材质。

**建议测试任务**

- 验证粗糙度、金属度、置换和法线贴图使用正确通道。
- 衡量不同纹理分辨率之间的内存和视觉变化。

**开始使用**

1. 以固定分辨率下载一项资源，并保留其标识符。
2. 记录色彩空间、法线贴图和材质导入设置。

**一手证据**

- [官方资源许可证](https://docs.ambientcg.com/license/)
- [资源目录](https://ambientcg.com/list)

### OpenGameArt

为 2D 内容测试提供广泛的社区资源，并为每个条目分别记录许可证。

**技术栈 / 格式：** 社区精灵、图块、模型、音乐和音效

**类型：** 资源库 ·  **目标：** 编码与自动化试玩；资源与动画流水线 ·  **维度：** 2D / 3D

[浏览社区资源](https://opengameart.org/) — 从单个条目下载，并保留作者、许可证和署名说明。

[项目 / 来源记录](https://opengameart.org/) · [许可证 / 条款](https://opengameart.org/content/faq)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** 不是软件项目
- **资源 / 数据：** 逐条目许可证，包括 CC0、CC-BY、CC-BY-SA 和 GPL 变体
- **AI 用途：** 不存在覆盖整个目录的 AI 授权。选择采用合适许可证的文件，并在发布数据集前评估其署名、相同方式共享及任何额外权利要求。
- **实际局限：** 免费下载内容的许可证和资源质量各不相同。常见问题说明，预览图像和音频的权利可能不同于可下载资源；除非明确涵盖，否则不要将这些预览视为已获许可的测试夹具文件。在本次目录审查中，未对任何单项资源进行本地导入或权利确认。

**建议测试任务**

- 导入瓦片地图，验证图块尺寸、透明度和碰撞对齐。
- 根据确切选定的条目生成署名清单。

**开始使用**

1. 按预期测试和分发所需的许可证筛选。
2. 归档所选条目的 URL、作者、许可证文本和原始文件。

**一手证据**

- [许可证与署名常见问题](https://opengameart.org/content/faq)

### Fab

当确切条目、许可证和 AI 使用字段适合预期任务时，可提供有用的导入测试内容。

**技术栈 / 格式：** 市场模型、材质、动画和引擎专用内容

**类型：** 资源库 ·  **目标：** 资源与动画流水线 ·  **维度：** 2D / 3D

[浏览市场条目](https://www.fab.com/) — 免费和付费条目并存；账户访问和引擎兼容性取决于具体条目。

[项目 / 来源记录](https://www.fab.com/) · [许可证 / 条款](https://www.fab.com/eula)

- **许可证类别：** 权限需要确认
- **代码：** 不是软件项目
- **资源 / 数据：** 按条目而定：Fab Standard、CC-BY 或其他声明的条款；部分内容为 UE-Only
- **AI 用途：** 在使用 AI 测试或共享数据集之前，检查条目许可证和 AI 使用标识。条目字段不是覆盖整个目录的规则；免费定价不等于开放许可证。
- **实际局限：** Standard 许可证通常不允许将资源独立再分发。官方摘要说明，Reference-Only 访问不包含源格式文件，因此在规划导出或导入测试夹具前，应确认已获取的层级。引擎专用内容和单独条款需要分别审查；未进行本地导入。

**建议测试任务**

- 验证一个获准条目的依赖、LOD 和材质导入。
- 将条目列出的引擎版本与实际项目导入结果比较。

**开始使用**

1. 记录确切条目、已获取版本、许可证和 AI 使用字段。
2. 仅在预期自动化用途和分发已被许可涵盖后导入。

**一手证据**

- [Fab Standard 许可证摘要与 EULA](https://www.fab.com/eula)
- [带有 AI 使用字段的 UE-Only 示例条目](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0)

### Unity Asset Store

在提供方权利和获准自动化途径均得到确认时，可作为软件包与导入回归测试夹具。

**技术栈 / 格式：** Unity 软件包、角色、动画、环境和编辑器工具

**类型：** 资源库 ·  **目标：** 资源与动画流水线 ·  **维度：** 2D / 3D

[浏览 Asset Store 软件包](https://assetstore.unity.com/) — 免费软件包可能需要账户、兼容的 Unity 版本和软件包依赖项。

[项目 / 来源记录](https://assetstore.unity.com/) · [许可证 / 条款](https://unity.com/legal/as-terms)

- **许可证类别：** 权限需要确认
- **代码：** 不是软件项目
- **资源 / 数据：** Asset Store EULA，或所声明的受限/第三方许可证
- **AI 用途：** Unity 平台的智能体访问和第三方资源授权需要分别检查。Asset Store 条款限制未经明确同意的 AI/模型相关使用；获准的编辑器访问不授予资源训练或数据集权利。
- **实际局限：** 免费不等于开源。受限资源和第三方组件可能有不同条款；未下载或导入任何软件包。

**建议测试任务**

- 在获准项目中检查软件包导入、缺失脚本和依赖变化。
- 比较受支持编辑器版本之间的骨架映射和动画导入设置。

**开始使用**

1. 记录软件包版本、提供方许可证和预期 AI 用途。
2. 使用获准的 Unity 自动化连接，并取得所需的提供方授权。

**一手证据**

- [Asset Store 条款与 EULA](https://unity.com/legal/as-terms)
- [2026 年条款更新与智能体访问说明](https://unity.com/legal)

### Khronos glTF Sample Assets

Khronos 官方 glTF 2.0 模型集合，附带专用于检验查看器、转换器与导入器的 Testing 列表。

**技术栈 / 格式：** 带逐模型许可元数据的 glTF 2.0 / GLB 参考与测试模型

**类型：** 资源库 ·  **目标：** 编码与自动化试玩；资源与动画流水线 ·  **维度：** 3D

[浏览官方资源列表](https://github.khronos.org/glTF-Assets/) — 在线目录提供标签化模型列表、预览以及逐模型的许可与署名信息；可下载文件保存在仓库中。

[项目 / 来源记录](https://github.com/KhronosGroup/glTF-Sample-Assets) · [许可证 / 条款](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/README.md)

- **许可证类别：** 代码 / 资源混合许可证
- **代码：** 仓库文本采用 CC-BY-4.0；各模型在自身 README 中单独声明许可与署名要求。
- **资源 / 数据：** 逐模型许可，常见为 CC-BY 4.0 或 CC0；复用前须查阅具体模型目录中的 README。
- **AI 用途：** 用带标签的 Testing 模型作为确定性的导入与渲染夹具。仓库文本的 CC-BY 授权不覆盖每个模型、网站品牌或第三方展示图；须保留每个模型的署名行。
- **实际局限：** 许可按模型而非按仓库授予；部分展示资产要求署名，另有资产因许可不合适而被移除。本次审阅未在本地下载或导入任何模型。

**建议测试任务**

- 将同一个 Testing 模型导入两款引擎，比较几何、材质、纹理方向与缩放。
- 让一组固定的扩展模型与仅含核心特性的模型通过转换器，记录丢失了哪些特性。

**开始使用**

1. 固定仓库提交，从 Testing 与 Core Only 列表中选取一小组模型。
2. 将每个下载文件对应的 README 署名与许可放在 .gltf/.glb 旁，并记录导入设置。

**一手证据**

- [面向查看器与转换器的测试模型](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models-testing.md)
- [含许可摘要的完整模型列表](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models.md)
- [仓库许可与逐模型署名规则](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/README.md)

### Khronos glTF Asset Generator

官方 glTF 2.0 导入器测试资产生成器，按 Positive / Negative 分组覆盖访问器、动画、材质、网格与纹理要求。

**技术栈 / 格式：** 生成 glTF 2.0 正向与负向一致性资产的 C# / .NET 生成器

**类型：** 资源库 ·  **目标：** 编码与自动化试玩；资源与动画流水线 ·  **维度：** 3D

[浏览生成的测试资产](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Positive) — 预生成的 Positive 与 Negative 模型已提交在 Output 下；C# 解决方案可重新生成。

[项目 / 来源记录](https://github.com/KhronosGroup/glTF-Asset-Generator) · [许可证 / 条款](https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** 生成器源码采用 MIT。
- **资源 / 数据：** 生成的输出资产适用仓库 MIT 许可；仍须记录所用的确切 Output 修订版本。
- **AI 用途：** 将成对生成的资产作为导入器有标签的通过 / 失败夹具：Positive 文件必须可加载，Negative 文件必须被拒绝并给出明确诊断。一次通过导入并不能证明完全符合 glTF 规范。
- **实际局限：** 覆盖范围仍在推进，README 明确说明后续会补充更多要求。该 C# 项目面向 Visual Studio / .NET 工作流；本次审阅未在本地构建或运行生成器。

**建议测试任务**

- 在同一导入器中加载全部 Positive 用例，记录不支持的特性，不要把警告当成崩溃。
- 检查 Negative 用例是否以可操作的错误失败，而不是静默生成损坏的场景。

**开始使用**

1. 固定仓库提交，将 Output/Positive 与 Output/Negative 目录复制到受版本管理的夹具中。
2. 记录导入器版本、每个用例的预期结果，以及负向用例的确切错误文本。

**一手证据**

- [项目范围与已支持要求](https://github.com/KhronosGroup/glTF-Asset-Generator#readme)
- [负向测试输出](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Negative)
- [MIT 许可证文本](https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/LICENSE)

### Kenney Animated Characters

小型 CC0 角色，适用于首轮蒙皮、动画播放和导入回归检查。

**技术栈 / 格式：** 风格化绑定角色与动画资源包

**类型：** 绑定与动作数据 ·  **目标：** 资源与动画流水线 ·  **维度：** 3D

[下载角色包](https://kenney.nl/assets/animated-characters-protagonists) — 创作者提供的免费下载；检查压缩包以了解可用模型和格式。

[项目 / 来源记录](https://kenney.nl/assets/animated-characters-protagonists) · [许可证 / 条款](https://kenney.nl/support)

- **许可证类别：** 开放许可证来源
- **代码：** 不是软件项目
- **资源 / 数据：** CC0
- **AI 用途：** 资源包文件采用 CC0。在测试夹具中保留来源记录，不要将授权扩展到网站媒体或另行许可的工具。
- **实际局限：** 不应假定简化角色具有完整的标准人形骨架。未进行本地导入或重定向测试。

**建议测试任务**

- 导入后检查蒙皮、动画播放和包围边界。
- 对照固定场景比较角色缩放和碰撞。

**开始使用**

1. 保留原始压缩包和随附许可证。
2. 在设置人形映射之前，检查实际骨骼层级。

**一手证据**

- [角色包](https://kenney.nl/assets/animated-characters-protagonists)
- [CC0 许可证常见问题](https://kenney.nl/support)

### Quaternius Universal Animation Library

用于人形重定向、移动动画混合和根运动测试的实用 CC0 基线。

**技术栈 / 格式：** 人形骨架、引擎导出、根运动和原地动画片段

**类型：** 绑定与动作数据 ·  **目标：** 资源与动画流水线 ·  **维度：** 3D

[获取免费 Standard 版](https://quaternius.itch.io/universal-animation-library) — Standard 是免费的子集。Pro 包含更多片段；Source 增加 Blender 源文件且收费。

[项目 / 来源记录](https://quaternius.itch.io/universal-animation-library) · [许可证 / 条款](https://quaternius.itch.io/universal-animation-library)

- **许可证类别：** 开放许可证来源
- **代码：** 不是软件项目
- **资源 / 数据：** CC0；可用文件取决于所获取的版本
- **AI 用途：** 对所下载版本中的文件使用 CC0 授权。免费 Standard 访问不包含所有宣传的片段，也不包含付费 Blender 源文件。
- **实际局限：** 创作者当前页面指出，Unreal GLB 导入需要高于 5 的版本。未进行本地播放或重定向。

**建议测试任务**

- 将移动动画重定向到第二个 CC0 角色，并衡量脚部滑动。
- 比较根运动与原地动画的位移、混合和循环接缝。

**开始使用**

1. 记录版本类型和发布版本；骨架名称和帧率在版本之间曾发生变化。
2. 选择引擎导出版本，并在重定向前检查其导入要求。

**一手证据**

- [骨架、许可证、格式与更新日志](https://quaternius.itch.io/universal-animation-library)
- [Standard / Pro / Source 下载层级](https://quaternius.itch.io/universal-animation-library/purchase)

### 100STYLE

具有风格的移动动作数据，适用于动作匹配、步态多样性和跨骨架重定向。

**技术栈 / 格式：** BVH 动作捕捉、28 骨骼骨架、60 fps

**类型：** 绑定与动作数据 ·  **目标：** 视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[获取原始动作数据](https://www.ianxmason.com/100style/) — 下载原始 BVH 数据；蒙皮角色是独立资源。

[项目 / 来源记录](https://www.ianxmason.com/100style/) · [许可证 / 条款](https://www.ianxmason.com/100style/)

- **许可证类别：** 开放许可证来源
- **代码：** 不是软件项目
- **资源 / 数据：** 原始动作数据采用 CC BY 4.0；独立重定向仓库中的 Geno.fbx 仅限非商业研究
- **AI 用途：** 原始动作采用 CC BY 4.0，要求署名。使用独立获得许可的角色；动作许可证不会消除 Geno 网格的限制。
- **实际局限：** 全部 100 种风格均由同一演员采集，因此留出风格不能测试对未见过表演者的泛化。BVH 动作不是现成的蒙皮游戏角色。开放推荐中不包含 Geno 网格；未进行本地重定向。

**建议测试任务**

- 重定向差异明显的行走风格，并比较脚部接触和关节限位。
- 使用留出风格构建动作匹配测试夹具。

**开始使用**

1. 将原始数据集引用和许可证与 BVH 文件一同保存。
2. 处理前记录帧率、源骨架和坐标转换。

**一手证据**

- [原始数据集与许可证](https://www.ianxmason.com/100style/)
- [重定向动作与 Geno 网格的条款区别](https://github.com/orangeduck/100style-retarget)

### CMU Motion Capture Database

一个覆盖广泛的动作来源，适用于骨架解析、坐标转换以及控制或重定向研究。

**技术栈 / 格式：** ASF 骨架与 AMC 动作文件，具有受试者专属校准

**类型：** 绑定与动作数据 ·  **目标：** 视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[浏览受试者与动作](https://mocap.cs.cmu.edu/) — 按照网站要求，仅下载所需内容，而不是镜像整个数据库。

[项目 / 来源记录](https://mocap.cs.cmu.edu/) · [许可证 / 条款](https://mocap.cs.cmu.edu/)

- **许可证类别：** 研究 / 自定义数据条款
- **代码：** 不是软件项目
- **资源 / 数据：** CMU 自定义使用条款：允许研究和商业产品；不得直接转售原始或转换后的数据
- **AI 用途：** 网站在其自定义条件下允许研究和商业产品用途。这不是 CC0，也不允许直接转售源数据集/转换后的数据集；应将下游数据集分发另行处理。
- **实际局限：** 不同受试者具有不同的校准骨架；许多引擎需要先转换 ASF/AMC。未进行本地解析或导入。

**建议测试任务**

- 解析多个受试者骨架，并比较归一化单位和关节变换。
- 将移动和交互片段重定向到一致的测试骨架。

**开始使用**

1. 下载受试者骨架及其匹配的动作文件。
2. 保留受试者和动作 ID、来源条款及转换设置。

**一手证据**

- [官方数据库使用条件](https://mocap.cs.cmu.edu/)

### LaFAN1

用于动作补间、轨迹连续性和障碍物过渡的研究数据与基线。

**技术栈 / 格式：** 动作捕捉 BVH 数据与过渡评估代码

**类型：** 绑定与动作数据 ·  **目标：** 资源与动画流水线 ·  **维度：** 3D

[打开数据集仓库](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) — 大型数据集文件使用 Git LFS；保留仓库的评估划分和文档。

[项目 / 来源记录](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) · [许可证 / 条款](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/master/license.txt)

- **许可证类别：** 研究 / 自定义数据条款
- **代码：** 不是软件项目（动作数据集）；捆绑的基线代码需要另行检查复用条件
- **资源 / 数据：** 动作数据集采用 CC BY-NC-ND 4.0
- **AI 用途：** 许可证允许非商业改编，但不允许共享改编材料；必要的技术格式变更另行对待。保留署名，并审查任何重定向数据的发布；商业 AI 测试服务用途不在覆盖范围内。
- **实际局限：** 不是可普遍再分发的商业动画包。未进行数据集下载、基线运行或本地导入。

**建议测试任务**

- 使用所提供基线，比较全局四元数损失（L2Q）、归一化全局位置损失（L2P）和 NPSS。
- 检查补间片段之间的接触和根轨迹。

**开始使用**

1. 依据预期研究和分发方式审查数据许可证。
2. 获取所需的 LFS 文件；保留 30 fps，以及受试者 1-4 用于训练 / 受试者 5 用于测试的划分。

**一手证据**

- [数据集条款与评估说明](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/README.md)
- [数据集许可证文本](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/license.txt)
- [表演者划分与评估配置](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/evaluate.py)
- [过渡指标实现](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/lafan1/benchmarks.py)

### AMASS

研究规模的人体动作，在共同参数空间中用于姿态流水线和动作模型。

**技术栈 / 格式：** 统一为参数化人体动作的多个动作捕捉集合

**类型：** 绑定与动作数据 ·  **目标：** 视觉、控制与规划；资源与动画流水线 ·  **维度：** 3D

[审阅访问与数据集条款](https://amass.is.tue.mpg.de/) — 需要注册并同意数据集条款；模型/工具访问另行处理。

[项目 / 来源记录](https://amass.is.tue.mpg.de/) · [许可证 / 条款](https://amass.is.tue.mpg.de/license.html)

- **许可证类别：** 研究 / 自定义数据条款
- **代码：** 不是软件项目
- **资源 / 数据：** AMASS 自定义条款，仅限指定的非商业研究用途；禁止再分发
- **AI 用途：** 许可证将使用限制于其声明的目的，禁止再分发，并限制商业用途，包括为商业目的进行训练。独立的 SMPL/模型条款仍然适用。
- **实际局限：** 不是可直接用于引擎的动画片段包，也不是可公开再分发测试数据集的来源。未注册、下载或进行本地转换。

**建议测试任务**

- 将获准的动作参数转换为一致的关节表示。
- 比较不同源集合的根轨迹和骨架映射。

**开始使用**

1. 注册，并确认预期研究目的在协议范围内。
2. 单独获取所需的人体模型，并记录两者的许可证。

**一手证据**

- [数据集与表示](https://amass.is.tue.mpg.de/)
- [AMASS 许可证](https://amass.is.tue.mpg.de/license.html)

### SMPL-Body

采用 CC BY 的身体子集，用于测试人体网格、骨架、蒙皮和姿态交换。

**技术栈 / 格式：** 固定形状的人体网格、骨架绑定以及姿态/动态混合形状

**类型：** 绑定与动作数据 ·  **目标：** 资源与动画流水线 ·  **维度：** 3D

[阅读身体子集许可证](https://smpl.is.tue.mpg.de/bodylicense.html) — 获取确实受 SMPL-Body 覆盖的文件；模型下载和生成工具有独立条款。

[项目 / 来源记录](https://smpl.is.tue.mpg.de/) · [许可证 / 条款](https://smpl.is.tue.mpg.de/bodylicense.html)

- **许可证类别：** 开放许可证来源
- **代码：** 不是软件项目
- **资源 / 数据：** SMPL-Body 采用 CC BY 4.0，不包含形状混合形状及利用它们创建身体的工具
- **AI 用途：** 对所涵盖的身体子集履行 CC BY 署名要求。它不授予参数化模型、生成工具或单独许可的 AMASS 动作的权利。
- **实际局限：** 身体许可证排除了形状生成组件。未在本地获取或导入身体文件。

**建议测试任务**

- 验证网格权重、关节变换和坐标转换。
- 导出为选定引擎格式后，比较姿态播放。

**开始使用**

1. 确认所获取工件符合仅身体的定义。
2. 保存署名，并将任何模型或动作许可证一同保留。

**一手证据**

- [SMPL-Body 范围与署名](https://smpl.is.tue.mpg.de/bodylicense.html)
- [独立的 SMPL-Model 条款](https://smpl.is.tue.mpg.de/modellicense.html)

### SMPL-Model

一种研究表示，适用于形状/姿态转换和人体到游戏骨架的流水线。

**技术栈 / 格式：** 参数化人体模型与形状生成工具

**类型：** 绑定与动作数据 ·  **目标：** 资源与动画流水线 ·  **维度：** 3D

[审阅模型访问条款](https://smpl.is.tue.mpg.de/modellicense.html) — 模型/工具访问和商业许可独立于采用 CC BY 的 SMPL-Body 子集。

[项目 / 来源记录](https://smpl.is.tue.mpg.de/) · [许可证 / 条款](https://smpl.is.tue.mpg.de/modellicense.html)

- **许可证类别：** 研究 / 自定义数据条款
- **代码：** 不是软件项目（模型数据）；所提供工具使用独立的 SMPL-Model 协议
- **资源 / 数据：** SMPL-Model 自定义条款，仅限指定的非商业用途；禁止再分发；商业许可另行处理
- **AI 用途：** 模型协议将使用限制于非商业科学研究、教育或艺术项目，禁止再分发和用于商业用途的训练，并且独立于 CC BY 身体子集和 AMASS 数据条款。
- **实际局限：** 不是不受限制的开源游戏骨架。未下载模型、执行工具或进行本地导入。

**建议测试任务**

- 比较获准的姿态与形状参数到游戏关节的转换。
- 在获准的形状变化下，检查拓扑和蒙皮一致性。

**开始使用**

1. 注册以获取下载访问权限，审查模型/工具协议并确认预期用途。
2. 对已获授权的模型文件和变换代码进行版本管理，不公开受限输入。

**一手证据**

- [模型许可证](https://smpl.is.tue.mpg.de/modellicense.html)
- [仅身体许可证对比](https://smpl.is.tue.mpg.de/bodylicense.html)

### Mixamo

一种常见的常规游戏动画工作流，其 AI 测试权限需要另行确认。

**技术栈 / 格式：** Adobe 在线人形自动绑定与动画服务

**类型：** 绑定与动作数据 ·  **目标：** 资源与动画流水线 ·  **维度：** 3D

[先阅读服务常见问题](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) — 需要 Adobe ID。常规游戏用途不能证明拥有 AI 评估或数据集权利。

[项目 / 来源记录](https://www.mixamo.com/) · [许可证 / 条款](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf)

- **许可证类别：** 权限需要确认
- **代码：** 不是软件项目
- **资源 / 数据：** Adobe 服务/内容条款；不是开放资源许可证
- **AI 用途：** Adobe 发布的 2021 年附加条款明确涵盖 AI/ML 创建、训练、测试和改进方面的限制。尚未核实当前登录接受协议的流程，因此既未将其标为已确认许可，也未标为当前已确认的全面禁止。
- **实际局限：** 不列入默认 AI 评估数据集推荐。未进行账户登录、下载、自动绑定或本地导入。

**建议测试任务**

- 权限审查后，检查人形骨骼映射和片段导入。
- 比较常规角色重定向、缩放和循环设置。

**开始使用**

1. 确认当前接受的协议以及确切的预期 AI 相关用途。
2. 仅使用已获授权的文件，并保留来源/服务记录。

**一手证据**

- [当前服务常见问题](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)
- [官方 2021 年附加条款](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf)

### SDL GameControllerDB

社区维护的 SDL 手柄映射数据库，是可复现手柄输入与按键布局回归测试的纯文本夹具。

**技术栈 / 格式：** SDL2 / SDL3 · gamecontrollerdb.txt · 社区维护的 GUID 映射

**类型：** 输入与数据夹具 ·  **目标：** 编码与自动化试玩；视觉、控制与规划 ·  **维度：** 2D / 3D

[下载 gamecontrollerdb.txt](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt) — 单个文本文件；SDL2 用 SDL_GameControllerAddMappingsFromFile 载入，SDL3 用 SDL_AddGamepadMappingsFromFile，兼容 SDL 2.0.10 及以上版本。

[项目 / 来源记录](https://github.com/mdqinc/SDL_GameControllerDB) · [许可证 / 条款](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/LICENSE)

- **许可证类别：** 开放许可证来源
- **代码：** 数据库文件采用 Zlib 许可。
- **资源 / 数据：** 这不是媒体素材集合；映射是社区贡献的数据，适用 Zlib 授权。
- **AI 用途：** 使用固定版本的 gamecontrollerdb.txt 作为确定性输入夹具。一条映射是社区贡献的数据，并不保证同一设备在不同平台或 SDL 版本上表现一致。
- **实际局限：** 社区提交的映射可能在不同提交间被更正或移除，README 也要求贡献者不要提交 AI 生成内容。该数据库覆盖 SDL 2.0.10 及以上版本；本次审阅未在本地运行任何手柄或 SDL 构建。

**建议测试任务**

- 在两个 SDL 版本中载入同一份固定的 gamecontrollerdb.txt，比较同一 GUID 的按钮与轴索引。
- 在载入与不载入数据库两种情况下回放固定输入序列，记录哪些设备回退到通用映射。

**开始使用**

1. 固定数据库的提交或发布版，把确切的 gamecontrollerdb.txt 放在测试项目旁。
2. 通过 SDL_GameControllerAddMappingsFromFile（SDL2）或 SDL_AddGamepadMappingsFromFile（SDL3）载入文件，并记录检测到的手柄 GUID 与平台。

**一手证据**

- [README 中的 SDL2 / SDL3 载入调用](https://github.com/mdqinc/SDL_GameControllerDB#readme)
- [含 GUID 映射的数据库文件](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt)
- [Zlib 许可证文本](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/LICENSE)

## 记录可复现的测试

对于每次实际运行，保留项目提交或发布版本、引擎/运行时和依赖版本、资源版本与许可证、启动命令、观察/动作接口、重置机制、种子、任务成功条件和结果。比较智能体时，将视觉观察与特权状态分开。对于动作流水线，还应记录骨架层级、静止姿态、单位、坐标轴、帧率和根运动约定。这些字段是建议的运行协议；本来源目录并不暗示存在任何运行时结果。
