# 游戏测试库

选一个能迅速回到测试起点的项目。查重开故障，可挑一款很快就能触发游戏结束的 Godot 小示例。查动画导入，可挑一副绑定和一段脚掌落地清楚的动作，把源动作和导入结果放在同个场景对照。

做视觉导航研究时，先定智能体可以看见多大范围。MiniGrid 有全地图 RGB 视图和局部 RGB 视图。在 DoorKey 里，看到全图的智能体有更多线索找钥匙。比较两个智能体时，保持观察范围、布局种子和步数上限一致。[MiniGrid 观察包装器](https://minigrid.farama.org/api/wrappers/)

## 入门组合

### 代码修改与自动试玩

**修改一个可运行的游戏。**

**建议从这些资源开始：** [Godot official demos](/testing/godot-demos/) · [SuperTux](/testing/supertux/) · [The Battle for Wesnoth](/testing/wesnoth/).

先构建基线，再修改一个机制，并回放同一段输入序列。

**衡量指标：** 构建是否成功、目标行为是否实现、出现哪些回归，以及修复尝试。

**检查点：** 在所选的一个项目中定义预期结果，保存未修改的基线运行记录。修改后重新构建、实际执行要求的机制，并回放原始输入序列以检查已有行为。记录全部三项检查的命令及通过／失败证据。

### 视觉、控制与规划

**给代理一个明确目标。**

**建议从这些资源开始：** [MiniGrid / BabyAI](/testing/minigrid/) · [Crafter](/testing/crafter/) · [ViZDoom](/testing/vizdoom/).

固定任务、随机种子、动作频率、观察来源和每轮预算。

**衡量指标：** 成功率、碰撞次数、路径长度、资源消耗和任务完成情况。

**检查点：** 运行前固定环境与任务、种子设置、观察模式、动作频率及动作／时间预算。记录每个计划回合直至成功、失败、超时或报错，保存其回报、长度、终止原因及动作／观察轨迹。报告结果时须包含失败及未完成的运行。

### 资产与动画流程

**让一个资产走完整条流程。**

**建议从这些资源开始：** [Kenney](/testing/kenney/) · [Quaternius Universal Animation Library](/testing/quaternius-ual/) · [100STYLE](/testing/100style/).

导入角色，映射骨骼，并播放一段具有适用许可的动作。

**衡量指标：** 纹理缺失、比例、蒙皮、脚底滑动、根运动和循环接缝。

**检查点：** 选择一个已绑定角色及一个兼容动画片段，确保均受所记录的许可覆盖。导入固定版本的引擎，验证纹理、单位和骨架映射，再播放一个指定片段，检查蒙皮、脚部接触、根节点位移及循环接缝。保存导入设置和结果；将文件缺失或关节未映射记为失败。

## 资源索引

| 资源 | 类型 | 维度 | 测试目标 | 获取／运行 | 来源 |
| --- | --- | --- | --- | --- | --- |
| Godot official demos | 游戏与引擎项目 | 2D / 3D | 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 | [游玩浏览器示例](https://godotengine.github.io/godot-demo-projects/) | [主要来源](https://github.com/godotengine/godot-demo-projects) |
| SuperTux | 游戏与引擎项目 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [游玩官方浏览器版本](https://play.supertux.org/) | [主要来源](https://github.com/SuperTux/supertux) |
| Endless Sky | 游戏与引擎项目 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [免费 Steam 游戏](https://store.steampowered.com/app/404410/Endless_Sky/) | [主要来源](https://github.com/endless-sky/endless-sky) |
| DDraceNetwork (DDNet) | 游戏与引擎项目 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [免费 Steam 游戏](https://store.steampowered.com/app/412220/DDraceNetwork/) | [主要来源](https://github.com/ddnet/ddnet) |
| The Battle for Wesnoth | 游戏与引擎项目 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [免费 Steam 游戏](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/) | [主要来源](https://github.com/wesnoth/wesnoth) |
| Mindustry | 游戏与引擎项目 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [创作者免费下载](https://anuke.itch.io/mindustry) | [主要来源](https://github.com/Anuken/Mindustry) |
| OpenTTD | 游戏与引擎项目 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [官方免费下载](https://www.openttd.org/downloads/openttd-releases/latest) | [主要来源](https://github.com/OpenTTD/OpenTTD) |
| SuperTuxKart | 游戏与引擎项目 | 3D | 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 | [免费桌面下载](https://supertuxkart.net/Download) | [主要来源](https://github.com/supertuxkart/stk-code) |
| Luanti + Minetest Game | 游戏与引擎项目 | 3D | 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 | [获取 Minetest Game](https://content.luanti.org/packages/Minetest/minetest_game/) | [主要来源](https://github.com/luanti-org/luanti) |
| Red Eclipse | 游戏与引擎项目 | 3D | 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 | [免费 Steam 游戏](https://store.steampowered.com/app/967460/Red_Eclipse/) | [主要来源](https://github.com/redeclipse/base) |
| Zero-K | 游戏与引擎项目 | 3D | 代码修改与自动试玩; 视觉、控制与规划 | [免费 Steam 游戏](https://store.steampowered.com/app/334920/ZeroK/) | [主要来源](https://github.com/ZeroK-RTS/Zero-K) |
| Unity BoatAttack | 游戏与引擎项目 | 3D | 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 | [获取 Unity 示例源码](https://github.com/Unity-Technologies/BoatAttack) | [主要来源](https://github.com/Unity-Technologies/BoatAttack) |
| Unreal Engine Lyra Starter Game | 游戏与引擎项目 | 3D | 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 | [获取免费 Lyra 示例](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en) | [主要来源](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) |
| Bevy official examples | 游戏与引擎项目 | 2D / 3D | 代码修改与自动试玩; 资产与动画流程 | [浏览可运行示例](https://bevyengine.org/examples/) | [主要来源](https://github.com/bevyengine/bevy) |
| MiniGrid / BabyAI | AI 评估环境 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [免费 Python 包](https://minigrid.farama.org/) | [主要来源](https://github.com/Farama-Foundation/Minigrid) |
| Crafter | AI 评估环境 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [免费 Python 包及可玩 GUI](https://github.com/danijar/crafter#play-yourself) | [主要来源](https://github.com/danijar/crafter) |
| Craftax | AI 评估环境 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [免费 Python 包](https://github.com/MichaelTMatthews/Craftax#readme) | [主要来源](https://github.com/MichaelTMatthews/Craftax) |
| ViZDoom | AI 评估环境 | 3D | 代码修改与自动试玩; 视觉、控制与规划 | [附 Freedoom 资产的免费 Python 包](https://vizdoom.farama.org/) | [主要来源](https://github.com/Farama-Foundation/ViZDoom) |
| NetHack Learning Environment | AI 评估环境 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [免费 Python 包与源码](https://github.com/NetHack-LE/nle#installation) | [主要来源](https://github.com/NetHack-LE/nle) |
| Godot RL Agents | AI 评估环境 | 2D / 3D | 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 | [免费工具包与示例项目](https://github.com/edbeeching/godot_rl_agents#quickstart-guide) | [主要来源](https://github.com/edbeeching/godot_rl_agents) |
| Unity ML-Agents | AI 评估环境 | 2D / 3D | 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 | [免费工具包；需要 Unity 编辑器](https://github.com/Unity-Technologies/ml-agents/releases) | [主要来源](https://github.com/Unity-Technologies/ml-agents) |
| Arcade Learning Environment (ALE) | AI 评估环境 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [官方文档与安装指南](https://ale.farama.org/) | [主要来源](https://github.com/Farama-Foundation/Arcade-Learning-Environment) |
| Procgen Benchmark | AI 评估环境 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [安装 Python 包](https://github.com/openai/procgen#readme) | [主要来源](https://github.com/openai/procgen) |
| Google Research Football | AI 评估环境 | 3D | 代码修改与自动试玩; 视觉、控制与规划 | [安装与场景指南](https://github.com/google-research/football#readme) | [主要来源](https://github.com/google-research/football) |
| Overcooked-AI | AI 评估环境 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [安装与布局指南](https://github.com/HumanCompatibleAI/overcooked_ai#readme) | [主要来源](https://github.com/HumanCompatibleAI/overcooked_ai) |
| MuJoCo | AI 评估环境 | 3D | 代码修改与自动试玩; 资产与动画流程 | [官方文档](https://mujoco.readthedocs.io/en/stable/overview.html) | [主要来源](https://github.com/google-deepmind/mujoco) |
| Gymnasium classic control | AI 评估环境 | 2D | 代码修改与自动试玩; 视觉、控制与规划 | [经典控制环境文档](https://gymnasium.farama.org/environments/classic_control/) | [主要来源](https://github.com/Farama-Foundation/Gymnasium) |
| Kenney | 资产库 | 2D / 3D | 代码修改与自动试玩; 资产与动画流程 | [浏览免费资源包](https://kenney.nl/assets) | [主要来源](https://kenney.nl/assets) |
| Quaternius | 资产库 | 3D | 代码修改与自动试玩; 资产与动画流程 | [浏览创作者资源包](https://quaternius.com/) | [主要来源](https://quaternius.com/) |
| Poly Haven | 资产库 | 3D | 资产与动画流程 | [浏览 CC0 资产](https://polyhaven.com/all) | [主要来源](https://polyhaven.com/) |
| ambientCG | 资产库 | 3D | 资产与动画流程 | [浏览可下载资产](https://ambientcg.com/list) | [主要来源](https://ambientcg.com/) |
| OpenGameArt | 资产库 | 2D / 3D | 代码修改与自动试玩; 资产与动画流程 | [浏览社区资产](https://opengameart.org/) | [主要来源](https://opengameart.org/) |
| Fab | 资产库 | 2D / 3D | 资产与动画流程 | [浏览市场条目](https://www.fab.com/) | [主要来源](https://www.fab.com/) |
| Unity Asset Store | 资产库 | 2D / 3D | 资产与动画流程 | [浏览 Asset Store 资源包](https://assetstore.unity.com/) | [主要来源](https://assetstore.unity.com/) |
| Khronos glTF Sample Assets | 资产库 | 3D | 代码修改与自动试玩; 资产与动画流程 | [浏览官方资产列表](https://github.khronos.org/glTF-Assets/) | [主要来源](https://github.com/KhronosGroup/glTF-Sample-Assets) |
| Khronos glTF Asset Generator | 资产库 | 3D | 代码修改与自动试玩; 资产与动画流程 | [浏览生成的测试资产](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Positive) | [主要来源](https://github.com/KhronosGroup/glTF-Asset-Generator) |
| Kenney Animated Characters | 骨骼与动作数据 | 3D | 资产与动画流程 | [下载角色包](https://kenney.nl/assets/animated-characters-protagonists) | [主要来源](https://kenney.nl/assets/animated-characters-protagonists) |
| Quaternius Universal Animation Library | 骨骼与动作数据 | 3D | 资产与动画流程 | [获取免费 Standard 版本](https://quaternius.itch.io/universal-animation-library) | [主要来源](https://quaternius.itch.io/universal-animation-library) |
| 100STYLE | 骨骼与动作数据 | 3D | 资产与动画流程 | [获取原始动作数据](https://www.ianxmason.com/100style/) | [主要来源](https://www.ianxmason.com/100style/) |
| CMU Motion Capture Database | 骨骼与动作数据 | 3D | 资产与动画流程 | [浏览受试者与动作](https://mocap.cs.cmu.edu/) | [主要来源](https://mocap.cs.cmu.edu/) |
| LaFAN1 | 骨骼与动作数据 | 3D | 资产与动画流程 | [打开数据集仓库](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) | [主要来源](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) |
| AMASS | 骨骼与动作数据 | 3D | 资产与动画流程 | [审查访问与数据集条款](https://amass.is.tue.mpg.de/) | [主要来源](https://amass.is.tue.mpg.de/) |
| SMPL-Body | 骨骼与动作数据 | 3D | 资产与动画流程 | [阅读人体子集许可](https://smpl.is.tue.mpg.de/bodylicense.html) | [主要来源](https://smpl.is.tue.mpg.de/) |
| SMPL-Model | 骨骼与动作数据 | 3D | 资产与动画流程 | [审查模型访问条款](https://smpl.is.tue.mpg.de/modellicense.html) | [主要来源](https://smpl.is.tue.mpg.de/) |
| Mixamo | 骨骼与动作数据 | 3D | 资产与动画流程 | [先阅读服务常见问题](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) | [主要来源](https://www.mixamo.com/) |
| SDL GameControllerDB | 输入与数据夹具 | 2D / 3D | 代码修改与自动试玩; 视觉、控制与规划 | [下载 gamecontrollerdb.txt](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt) | [主要来源](https://github.com/mdqinc/SDL_GameControllerDB) |

## 已核查资源

### Godot official demos

小型独立引擎项目，覆盖角色控制、物理、导航、网络、动画及导入导出，可作为回归测试起点。

**技术栈／格式：** Godot／GDScript／C#

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 · **维度：** 2D / 3D

[游玩浏览器示例](https://godotengine.github.io/godot-demo-projects/) — 提供免费浏览器构建和可下载源码项目。浏览器导出只覆盖仓库中的部分示例。

[项目／来源记录](https://github.com/godotengine/godot-demo-projects) · [许可／条款](https://github.com/godotengine/godot-demo-projects/blob/master/LICENSE.md)

- **许可类别：** 开放许可资源
- **代码：** MIT；须保留仓库许可及声明。
- **资产／数据：** 除非某个示例或附带资源另有声明，否则适用仓库的 MIT 许可；须保留各处署名声明。
- **AI 用途：** 适合作为代码修改和自动游玩测试的开放许可基线。应记录新增资产或插件的许可，不要将示例许可视为对无关数据的授权。
- **实际限制：** 本轮研究未安装或运行。托管网页示例会在 master 每次提交后重新部署，因此 URL 不是不可变基线。可重复测试应固定兼容的来源提交；开发分支和网页渲染器可能不同于稳定桌面版本的行为。

**建议测试任务**

- 修改一项移动或碰撞规则，验证原场景仍能启动并完成目标。
- 导入已知模型或动画，比较材质加载、比例、骨架映射和导出后的行为。
- 回放相同输入序列，记录截图、错误和任务完成情况。

**开始使用**

1. 选择与所装 Godot 版本兼容的稳定示例分支或发布版本，并固定提交。
2. 下载一个示例目录，导入其 project.godot 并运行主场景。
3. 将引擎版本、场景、输入序列和预期结果与基线一并保存。

**主要依据**

- [官方源码与分支指引](https://github.com/godotengine/godot-demo-projects)
- [官方浏览器构建](https://godotengine.github.io/godot-demo-projects/)
- [仓库许可](https://github.com/godotengine/godot-demo-projects/blob/master/LICENSE.md)

### SuperTux

完整平台游戏，适合在实际原生代码库中测试跳跃时序、碰撞、关卡编辑及画面与输入回归。

**技术栈／格式：** C++／CMake／2D 平台游戏

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[游玩官方浏览器版本](https://play.supertux.org/) — 提供官方浏览器游玩、免费 Steam 版本及独立桌面下载。构建修改后的核心代码需要原生工具链。

[项目／来源记录](https://github.com/SuperTux/supertux) · [许可／条款](https://github.com/SuperTux/supertux)

- **许可类别：** 代码与资产采用不同许可
- **代码：** GNU GPL；分发修改版构建前，须检查固定版本及各组件声明。
- **资产／数据：** 大部分游戏数据采用 CC BY-SA；个别文件和第三方组件另有声明。
- **AI 用途：** 源码访问支持加入监测的实验，但 GPL 代码与 CC BY-SA 游戏数据具有不同义务。再分发截图、地图或导出数据时，应能追溯其来源许可。
- **实际限制：** 本轮研究未安装或运行。没有现成的 Gymnasium 评测接口约定；观察、动作时序以及重置／成功检测需要测试框架。

**建议测试任务**

- 修改跳跃加速度或某个碰撞边界情况，再回放固定关卡。
- 使用基于画面的控制器，测量完成率、死亡次数、跳跃失败次数和耗时。
- 修改关卡，验证检查点、敌人和完成条件。

**开始使用**

1. 先使用免费二进制版本和固定关卡，建立控制基线。
2. 修改代码时，遵循仓库的 CMake 及所需 C++ 依赖构建说明。
3. 比较代理前，固定游戏版本、关卡、设置及输入时序。

**主要依据**

- [官方游戏源码与许可](https://github.com/SuperTux/supertux)
- [Steam 版本](https://store.steampowered.com/app/1572920/SuperTux/)
- [独立下载](https://www.supertux.org/download.html)

### Endless Sky

完整太空游戏，支持导航、战斗、交易与长时任务规划，并提供可编辑数据和插件系统。

**技术栈／格式：** C++／太空探索／数据驱动内容

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[免费 Steam 游戏](https://store.steampowered.com/app/404410/Endless_Sky/) — 提供免费 Steam 与桌面版本；相较重建引擎，插件是更轻量的起点。

[项目／来源记录](https://github.com/endless-sky/endless-sky) · [许可／条款](https://github.com/endless-sky/endless-sky/blob/master/copyright)

- **许可类别：** 代码与资产采用不同许可
- **代码：** GPLv3；第三方代码和文件可能有各自声明。
- **资产／数据：** 美术与音频采用多种许可；仓库 copyright 文件标明作者和条款。
- **AI 用途：** 为导出的测试数据集选择美术或音频时，应查阅版权清单。游戏免费下载不代表其所有材料合并采用一种许可。
- **实际限制：** 本轮研究未安装或运行。一般战役进度的目标宽泛且多变；需要固定存档状态与范围明确的场景，才能获得可比较的分数。

**建议测试任务**

- 创建包含任务、对话及明确成功条件的小型插件。
- 从固定存档状态评估路线选择、燃料管理和交易。
- 修改战斗或任务规则，验证存档兼容性与任务完成情况。

**开始使用**

1. 安装免费发布版本，保留基线存档和设置。
2. 内容修改使用独立插件目录；C++ 修改遵循仓库说明。
3. 定义起始资源固定且范围明确的任务，并记录游戏版本。

**主要依据**

- [官方源码与构建说明](https://github.com/endless-sky/endless-sky)
- [Steam 版本](https://store.steampowered.com/app/404410/Endless_Sky/)
- [代码与资产版权清单](https://github.com/endless-sky/endless-sky/blob/master/copyright)

### DDraceNetwork (DDNet)

支持钩索、精确移动、地图和回放的合作平台游戏，适合输入时序与多人回归任务。

**技术栈／格式：** C++／CMake／联网精确操作平台游戏

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[免费 Steam 游戏](https://store.steampowered.com/app/412220/DDraceNetwork/) — 提供免费游戏及本地服务器二进制文件。受控评测应使用私有本地服务器。

[项目／来源记录](https://github.com/ddnet/ddnet) · [许可／条款](https://github.com/ddnet/ddnet/blob/master/license.txt)

- **许可类别：** 代码与资产采用不同许可
- **代码：** 项目代码采用 zlib，附带第三方许可。
- **资产／数据：** 游戏数据默认采用 CC BY-SA 3.0；字体及其他文件的例外记录于 license.txt。
- **AI 用途：** 客户端／服务端源码支持加入监测。分享夹具或回放时须保留地图作者及数据许可；可重复测试应在本地服务器上进行。
- **实际限制：** 本轮研究未安装或运行。精细控制对时序和服务器设置敏感；公开服务器结果不是稳定基准。

**建议测试任务**

- 使用移动、跳跃和钩索输入完成固定地图片段。
- 修改物理或碰撞规则，比较记录的运行过程。
- 测试两个协作客户端，测量同步、完成情况及交互失败。

**开始使用**

1. 安装匹配的客户端与服务端版本，以固定地图启动本地服务器。
2. 记录服务器设置，并避免试验之间发生非受控变化。
3. 使用 demo 回放或自定义测试框架保留输入，并检测终点或重置事件。

**主要依据**

- [官方源码与本地服务器说明](https://github.com/ddnet/ddnet)
- [Steam 版本](https://store.steampowered.com/app/412220/DDraceNetwork/)
- [代码、数据与第三方许可](https://github.com/ddnet/ddnet/blob/master/license.txt)

### The Battle for Wesnoth

回合制战术游戏，提供可编辑场景与脚本，适合测试寻路、战术决策、对话和规则修改。

**技术栈／格式：** C++／Lua／Wesnoth Markup Language

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[免费 Steam 游戏](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/) — 提供免费 Steam 与独立版本。修改 C++ 引擎前，可先从小型 WML／Lua 场景入手。

[项目／来源记录](https://github.com/wesnoth/wesnoth) · [许可／条款](https://github.com/wesnoth/wesnoth/blob/master/copyright)

- **许可类别：** 代码与资产采用不同许可
- **代码：** GPLv2 或更高版本，附各组件专属声明。
- **资产／数据：** 核心美术／音频采用 GPLv2 或更高版本，或 CC BY-SA 4.0；copyrights.csv 记录各文件声明。扩展的美术／音频也可能采用 Creative Commons NC 或 ND 条款，须逐个审查扩展。
- **AI 用途：** 场景和脚本提供可检查的任务，但扩展和美术需保留各自署名记录。不要假定引擎许可覆盖所有下载的扩展。
- **实际限制：** 本轮研究未安装或运行。战斗随机性与战役差异需要通过受控种子或重复试验处理；常规 UI 不是现成的代理 API。

**建议测试任务**

- 创建或修复具有明确胜利与失败条件的小型场景。
- 从固定场景状态测量战术成功、移动效率和资源使用。
- 修改单位能力或对话触发条件，验证回放与场景推进。

**开始使用**

1. 安装稳定版本，选择地图、单位和难度固定的小型场景。
2. 按文档规定的 WML／Lua 扩展结构进行独立修改。
3. 条件允许时记录随机种子，并保留起始存档，以控制战斗差异。

**主要依据**

- [核心代码许可](https://github.com/wesnoth/wesnoth/blob/ca544b10b5d0a88f1336465d82500cefee67bfc9/copyright)
- [逐文件美术与音频清单](https://github.com/wesnoth/wesnoth/blob/ca544b10b5d0a88f1336465d82500cefee67bfc9/copyrights.csv)
- [核心内容与扩展的许可政策](https://wiki.wesnoth.org/index.php?title=Wesnoth:Copyrights&oldid=75641)
- [Steam 版本](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/)
- [官方开发与场景文档](https://wiki.wesnoth.org/Create)

### Mindustry

物流与防御游戏，可在实际项目中研究生产链、建造、资源规划和客户端与服务端改动。

**技术栈／格式：** Java／Gradle／工厂与塔防

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[创作者免费下载](https://anuke.itch.io/mindustry) — 作者的 itch.io 页面允许以零价格下载。Steam 版本收费；免费访问源码不代表所有商店版本都免费。

[项目／来源记录](https://github.com/Anuken/Mindustry) · [许可／条款](https://github.com/Anuken/Mindustry/blob/master/LICENSE)

- **许可类别：** 代码与资产采用不同许可
- **代码：** GPLv3；须保留依赖及分发修改的相关声明。
- **资产／数据：** 检查所选版本的仓库及附带第三方声明；此处不主张资产统一获得 CC0 授权。
- **AI 用途：** 适合作为可访问源码的规划与代码修改测试平台。应保留提取资产、地图和插件的许可记录，不要从免费下载推断数据集可无限制使用。
- **实际限制：** 本轮研究未安装或运行。战役地图和在线服务器会引入非受控状态；比较应使用专用地图或本地服务器。

**建议测试任务**

- 在固定波次前建立可持续达到指定资源产率的生产链。
- 修改方块或单位规则，验证加载、建造及客户端／服务端行为。
- 在固定自定义地图上测量资源浪费、生存和目标完成情况。

**开始使用**

1. 从官方来源下载免费桌面版本或服务器，并固定版本。
2. 使用起始资源和波次设置固定的小型自定义地图。
3. 修改源码时，遵循仓库的 JDK／Gradle 要求，不要假定预装 Java 版本适用。

**主要依据**

- [作者下载与定价](https://anuke.itch.io/mindustry)
- [官方源码、服务器与构建指引](https://github.com/Anuken/Mindustry)
- [仓库许可](https://github.com/Anuken/Mindustry/blob/master/LICENSE)

### OpenTTD

交通运输模拟，适合路线与铁路建设、经济规划、寻路、存档和多人同步测试。

**技术栈／格式：** C++／等距视角运输模拟

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[官方免费下载](https://www.openttd.org/downloads/openttd-releases/latest) — 官网构建仍免费。自 2026 年 3 月起，Steam／GOG 新用户通过包含原版 TTD 的付费合集获取；已有用户继续获得更新。

[项目／来源记录](https://github.com/OpenTTD/OpenTTD) · [许可／条款](https://github.com/OpenTTD/OpenTTD/blob/master/COPYING.md)

- **许可类别：** 代码与资产采用不同许可
- **代码：** GPLv2；各组件声明仍适用。
- **资产／数据：** 使用独立的 OpenGFX、OpenSFX 和 OpenMSX 基础资源集，并保留各自许可。原版 Transport Tycoon Deluxe 数据不是开放资产包。
- **AI 用途：** 开源代码与开放基础资源集可支持可复现的场景。应分别保留基础资源集和 NewGRF 的许可，尤其是在导出视觉夹具或分发基准合集时。
- **实际限制：** 本轮研究未安装或运行。Steam 已不再是新用户的零价格获取途径。长时间模拟需要固定时间预算及一致的模拟设置。

**建议测试任务**

- 连接固定产业，在规定的游戏时段内达到目标运输量或利润。
- 修复铁路死锁或寻路规则，回放同一存档。
- 源码或脚本修改后，验证保存／加载和同步。

**开始使用**

1. 从官方网站下载免费发布版本，安装开放的图像、音效和音乐基础资源集。
2. 固定地图种子、游戏选项、日期和起始存档；不加入非受控 NewGRF 内容。
3. 使用小型场景或本地专用服务器，定义可测量的运输目标。

**主要依据**

- [官方源码与构建指引](https://github.com/OpenTTD/OpenTTD)
- [2026 年 3 月 Steam 分发变更](https://www.openttd.org/news/2026/03/14/steam-changes)
- [代码许可](https://github.com/OpenTTD/OpenTTD/blob/master/COPYING.md)

### SuperTuxKart

完整竞速游戏，适合视觉转向、连续控制、物理回归、赛道、车辆与模型材质流程测试。

**技术栈／格式：** C++／3D 卡丁车竞速／Blender 资产流程

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 · **维度：** 3D

[免费桌面下载](https://supertuxkart.net/Download) — 提供免费桌面安装包。从源码构建还需要构建文档所述的游戏数据。

[项目／来源记录](https://github.com/supertuxkart/stk-code) · [许可／条款](https://supertuxkart.net/Licensing)

- **许可类别：** 代码与资产采用不同许可
- **代码：** SuperTuxKart 代码采用 GPLv3 或更高版本；附带组件保留各自声明。
- **资产／数据：** 多种许可，包括 Creative Commons 条款；须检查资产作者与许可记录。
- **AI 用途：** 适合加入监测的驾驶测试及资产集成；再分发赛道、角色或录制资产合集时，须分别审查其许可。
- **实际限制：** 本轮研究未安装或运行。仅有源码仓库并不等于下载了完整资产；基于画面的评测仍需要输入／重置测试框架。

**建议测试任务**

- 完成固定圈数，测量完赛率、圈速、碰撞及恢复情况。
- 修改转向或碰撞行为，比较同一车辆和赛道。
- 导入测试车辆或赛道，验证比例、材质、碰撞及运行时加载。

**开始使用**

1. 安装稳定二进制版本，固定赛道、车辆、难度和比赛设置。
2. 修改代码时，获取匹配的游戏数据，并遵循 C++ 构建说明。
3. 保留基线驾驶序列，建立明确的圈数／完赛检测。

**主要依据**

- [官方源码与构建指引](https://github.com/supertuxkart/stk-code)
- [官方下载](https://supertuxkart.net/Download)
- [代码与资产许可](https://supertuxkart.net/Licensing)
- [固定版本的 GPLv3 或更高版本及各资产许可范围](https://github.com/supertuxkart/stk-code/blob/2997f192e6876047909d909498dbb4810e5dbb8d/COPYING)

### Luanti + Minetest Game

可编辑体素沙盒，支持第一人称导航、挖掘、放置、合成，以及 Lua 实体、纹理和世界修改。

**技术栈／格式：** C++ Luanti 引擎／Lua 游戏与模组／体素世界

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 · **维度：** 3D

[获取 Minetest Game](https://content.luanti.org/packages/Minetest/minetest_game/) — 先安装免费 Luanti 引擎，再通过 ContentDB 添加此游戏。引擎与游戏是独立项目。

[项目／来源记录](https://github.com/luanti-org/luanti) · [许可／条款](https://github.com/luanti-org/minetest_game/blob/master/LICENSE.txt)

- **许可类别：** 代码与资产采用不同许可
- **代码：** Luanti 引擎采用 LGPL2.1 或更高版本；Minetest Game 代码采用 LGPL2.1，附模组各自声明。
- **资产／数据：** Minetest Game 媒体默认采用 CC BY-SA 3.0；须检查各模组 README 中的作者及例外。其他 ContentDB 包有独立条款。
- **AI 用途：** Lua 模组是实用的监测接入点。应记录加入世界的每个游戏／模组和资产的许可；能从 ContentDB 获取不等于获得统一数据使用授权。
- **实际限制：** 本轮研究未安装或运行。Minetest Game 是基础沙盒，没有单一内置基准目标；需要自定义任务设计和控制器桥接。

**建议测试任务**

- 创建具有固定导航、放置或合成目标及成功信号的 Lua 模组。
- 从相同种子、出生点、背包和世界快照评估第一人称代理。
- 添加实体或纹理，验证坐标比例、材质、碰撞及存档持久性。

**开始使用**

1. 固定 Luanti 发布版本及 Minetest Game 的确切提交或包修订；该游戏采用滚动发布，现处于仅维护模式。创建专用本地测试世界。
2. 保存种子和未改动的世界快照，只安装必要模组。
3. 使用小型自定义 Lua 模组暴露重置、任务状态及可测量的成功条件。

**主要依据**

- [引擎源码与安装](https://github.com/luanti-org/luanti)
- [官方游戏包](https://content.luanti.org/packages/Minetest/minetest_game/)
- [游戏代码与媒体许可](https://github.com/luanti-org/minetest_game/blob/master/LICENSE.txt)
- [固定版本的滚动发布及维护政策](https://github.com/luanti-org/minetest_game/blob/c42e4d0c0ff9d27ff7b9b308c3cfc14098dd3a0f/README.md)

### Red Eclipse

第一人称竞技场游戏，适合瞄准、导航、跑酷、机器人情景、实时地图编辑，以及原生客户端与服务端修改。

**技术栈／格式：** C++／第一人称竞技场射击／地图编辑器

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 · **维度：** 3D

[免费 Steam 游戏](https://store.steampowered.com/app/967460/Red_Eclipse/) — 提供 Windows 和 Linux 免费 Steam 版本。评测应使用本地对局及固定机器人／地图设置。

[项目／来源记录](https://github.com/redeclipse/base) · [许可／条款](https://github.com/redeclipse/base/blob/master/doc/license.txt)

- **许可类别：** 代码与资产采用不同许可
- **代码：** 项目代码采用 zlib；附带组件保留各自声明。
- **资产／数据：** 游戏内容包括 CC BY-SA 及其他许可；须查阅项目许可清单。
- **AI 用途：** 开放的客户端／服务端支持受控监测。分享地图或视觉数据集时须保留内容署名；评测应使用本地机器人或专用测试服务器。
- **实际限制：** 本轮研究未安装或运行。Steam 条目不提供 macOS 构建，常规游戏游玩需要外部或集成于源码的代理测试框架。

**建议测试任务**

- 在固定地图中测量目标捕获、导航、生存和目标完成情况。
- 修改移动或武器规则，验证客户端／服务端对局仍可运行。
- 编辑测试地图，检查出生点、几何、光照和碰撞。

**开始使用**

1. 使用受支持的 Windows／Linux 版本，或遵循仓库构建说明。
2. 启动本地对局，固定地图、模式、机器人数和难度。
3. 定义可重置的目标，记录截图、输入时序和对局结果。

**主要依据**

- [官方源码](https://github.com/redeclipse/base)
- [Steam 版本与支持系统](https://store.steampowered.com/app/967460/Red_Eclipse/)
- [代码与内容许可](https://github.com/redeclipse/base/blob/master/doc/license.txt)

### Zero-K

即时战略游戏，适合资源规划、建造、单位控制、地形交互和多单位战术，提供可编辑的 Lua 游戏逻辑。

**技术栈／格式：** Lua 游戏逻辑／衍生自 Spring 的 RTS 引擎／大规模策略

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 3D

[免费 Steam 游戏](https://store.steampowered.com/app/334920/ZeroK/) — 免费 Steam 游戏。引擎、启动器、游戏模块、地图及其他数据是可玩安装中相互独立的部分。

[项目／来源记录](https://github.com/ZeroK-RTS/Zero-K) · [许可／条款](https://github.com/ZeroK-RTS/Zero-K)

- **许可类别：** 代码与资产采用不同许可
- **代码：** 游戏模块仓库声明采用 GPLv2；各文件及单独获取的引擎、启动器和工具需分别检查许可。
- **资产／数据：** 模型、纹理、声音和地图采用混合许可；游戏逻辑仓库不代表统一资产许可。
- **AI 用途：** 适合代码监测与 RTS 规划，但须保留模块及资产来源。公开的游戏模块仓库不能证明完整安装后的游戏统一采用一种许可。
- **实际限制：** 本轮研究未安装或运行。配置较大且包含多个组件；只克隆 Lua 游戏仓库无法获得完整可玩游戏。

**建议测试任务**

- 从固定地图及起始位置达到建造或经济目标。
- 面对固定本地对手，评估单位选择、寻路及战术资源使用。
- 修改小型 Lua 单位或游戏规则，验证场景和存档／回放行为。

**开始使用**

1. 先安装完整免费版本，再独立开展模块级开发任务。
2. 固定引擎、游戏版本、地图及本地 AI 配置。
3. 使用小型自定义场景及固定时间预算，不使用非受控在线对局。

**主要依据**

- [游戏模块与源码声明](https://github.com/ZeroK-RTS/Zero-K)
- [固定版本的游戏模块 GPLv2 许可](https://github.com/ZeroK-RTS/Zero-K/blob/e358dac2ca2f9163c5290f700d74466016305b04/LICENSE)
- [Steam 版本](https://store.steampowered.com/app/334920/ZeroK/)
- [官方项目与开发入口](https://zero-k.info/)

### Unity BoatAttack

完整船只竞速示例，适合浮力、航点 AI、相机、水面渲染、着色器和资产加载回归测试。

**技术栈／格式：** Unity／C#／Universal Render Pipeline

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 · **维度：** 3D

[获取 Unity 示例源码](https://github.com/Unity-Technologies/BoatAttack) — 免费示例源码包含 Git LFS 内容。文档指定项目版本为 Unity 2020.3.23f1；引擎许可与安装另行处理。

[项目／来源记录](https://github.com/Unity-Technologies/BoatAttack) · [许可／条款](https://github.com/Unity-Technologies/BoatAttack/blob/master/LICENSE.md)

- **许可类别：** 引擎专用许可
- **代码：** Unity Companion License；这是引擎专用示例，不能笼统视为 MIT／GPL 项目。
- **资产／数据：** Unity Companion License 及适用的附带声明；不要将示例资产视为通用跨引擎资产库。
- **AI 用途：** 针对预期工具连接、资产处理和数据使用，检查 Unity Companion License 及适用 Unity 条款。源码可获取不代表 AI 训练或数据集再分发权利不受限制。
- **实际限制：** 本轮研究未安装或运行。这一较旧的 Unity 基线可能需要资源包／平台维护；升级编辑器可能改变行为，应作为独立任务处理。

**建议测试任务**

- 修改浮力、转向或航点逻辑，完成可重复的船只路线。
- 将固定版本的项目迁移到较新编辑器，识别渲染或资源包回归。
- 比较修改前后的水面、材质、相机输出及资产加载。

**开始使用**

1. 克隆前安装 Git LFS，并获取完整的大文件内容。
2. 按 ProjectVersion.txt 使用 Unity 2020.3.23f1 打开干净副本；解析依赖包，并在构建播放器前构建 Addressables 内容。
3. 修改代码或创建独立迁移副本前，保留基线及编辑器／资源包版本。

**主要依据**

- [官方示例、版本与许可](https://github.com/Unity-Technologies/BoatAttack)
- [固定的编辑器版本](https://github.com/Unity-Technologies/BoatAttack/blob/6acf5f773a440030489cb5e2b3c009fb5fe1e8ce/ProjectSettings/ProjectVersion.txt)
- [Unity Companion License](https://unity.com/legal/licenses/unity-companion-license)
- [Git LFS 设置](https://git-lfs.com/)

### Unreal Engine Lyra Starter Game

官方多人游戏起点，覆盖能力系统、输入、Game Feature 插件、角色动画和较复杂的引擎集成。

**技术栈／格式：** Unreal Engine／C++／Blueprint／Gameplay Ability System

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 · **维度：** 3D

[获取免费 Lyra 示例](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en) — 通过 Epic／Fab 免费提供包含源码的示例，受账户、Unreal Engine 及内容条款约束。条目标明其为 UE-Only。

[项目／来源记录](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) · [许可／条款](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)

- **许可类别：** 引擎专用许可
- **代码：** Unreal Engine 示例及引擎条款；包含源码不等于采用 OSI 认可的开源许可。
- **资产／数据：** 按适用 Epic 条款提供的 UE-Only 内容。本次审查的 Fab 条目显示 Allows usage with AI: No。
- **AI 用途：** Fab 的 AI 字段要求针对预期资产／数据流程另行检查。既不应将其扩大解释为禁止一切编程助手修改，也不应忽略它并视为 AI 评测或训练的统一授权。
- **实际限制：** 本轮研究未安装或运行。配置相对繁重，包含引擎专用内容及 AI 使用条件；不属于不受限的开放许可入门集合。

**建议测试任务**

- 修改一项小型能力或输入行为，在范围明确的对局中验证。
- 修改 Game Feature 插件，验证激活、角色设置及多人行为。
- 测试获准的角色动画／导入任务，检查骨架映射和运行时播放。

**开始使用**

1. 将 Lyra 选作 AI 数据夹具前，对照条目及适用 Epic 条款审查预期用途。
2. 通过 Epic／Fab 获取示例，创建与所选 Unreal Engine 版本兼容的项目。
3. 固定引擎、插件、地图及对局配置；多人测试前先完成小型本地任务。

**主要依据**

- [官方 Lyra 文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)
- [Fab 访问与内容字段](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)
- [Unreal Engine 最终用户许可协议](https://www.unrealengine.com/en-US/eula/unreal)

### Bevy official examples

引擎官方自带的可运行示例集，可作为 ECS、渲染、资源导入与动画回归的小型版本化基线。

**技术栈／格式：** Rust · Bevy ECS · 2D、3D、UI、动画、音频和 glTF 官方示例

**类型：** 游戏与引擎项目 · **目标：** 代码修改与自动试玩; 资产与动画流程 · **维度：** 2D / 3D

[浏览可运行示例](https://bevyengine.org/examples/) — 受支持的示例可通过 WASM 和 WebGL2 直接在浏览器运行，另有独立的 WebGPU 示例浏览页。在本地运行或修改源码需要匹配的仓库检出版本及 Rust 工具链。

[项目／来源记录](https://github.com/bevyengine/bevy) · [许可／条款](https://github.com/bevyengine/bevy/blob/main/LICENSE-APACHE)

- **许可类别：** 代码与资产采用不同许可
- **代码：** 引擎源码可选择采用 MIT 或 Apache-2.0。
- **资产／数据：** examples/ 附带资产使用 CREDITS.md 列出的独立许可；它们不随已发布的 crate 分发。
- **AI 用途：** 将示例用作基线前，须固定发布标签。引擎定期发布不兼容版本；示例资产受各自许可约束，而非引擎的双重许可。
- **实际限制：** 托管示例只覆盖仓库的一部分，并依赖浏览器图形支持；它们不是固定版本的本地基线。Bevy 会发布不兼容的 API 版本，因此本地回归工作须记录发布标签及匹配的 Rust 工具链。示例资产的独立许可见 CREDITS.md。本次审查了源码与浏览器入口文档，未在本地构建或运行。

**建议测试任务**

- 在固定标签版本运行一个 2D 和一个 3D 示例，比较帧输出、资产加载和控制台警告。
- 修改一个 ECS 系统或导入的 glTF 资产，检查示例仍能启动并记录相同场景状态。

**开始使用**

1. 检出发布标签，而非 main，并安装该版本所需的 Rust 工具链。
2. 通过 cargo run --example breakout 运行一个示例，然后记录标签、工具链、图形适配器及 CREDITS.md 中的资产许可。

**主要依据**

- [官方示例浏览页](https://bevyengine.org/examples/)
- [官方在线 WebGPU 示例](https://bevy.org/examples-webgpu/)
- [示例目录与覆盖范围](https://github.com/bevyengine/bevy/tree/main/examples)
- [含各资产许可说明的 CREDITS.md](https://github.com/bevyengine/bevy/blob/main/CREDITS.md)

### MiniGrid / BabyAI

包含钥匙、门、物体和部分观察的小型导航与语言落地任务，适合作为可重复规划测试的初始基线。

**技术栈／格式：** Python · Gymnasium · 离散网格世界

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[免费 Python 包](https://minigrid.farama.org/) — 在本地安装 minigrid；不需要商业游戏或模型 API。

[项目／来源记录](https://github.com/Farama-Foundation/Minigrid) · [许可／条款](https://github.com/Farama-Foundation/Minigrid/blob/main/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** 当前仓库采用 Apache-2.0。
- **资产／数据：** 使用随附的程序化网格渲染；新增图像和数据集需保留各自来源。
- **AI 用途：** 面向代理研究构建。须保留许可声明；每次评测均应明确区分渲染像素、符号观察及任务文本。
- **实际限制：** 已审查源码，未在此安装。Windows 不获官方支持；默认紧凑观察不是普通 RGB 截图。

**建议测试任务**

- 在固定动作预算下，比较使用种子的门与钥匙任务成功率。
- 修改环境规则，再检查重置、观察和目标完成情况。
- 测试 BabyAI 指令，同时不向策略暴露隐藏地图状态。

**开始使用**

1. 在 Linux 或 macOS 创建 Python 3.11+ 环境，运行 pip install minigrid。
2. 导入 minigrid 和 gymnasium，创建 MiniGrid-Empty-8x8-v0 并调用 reset(seed=0)。
3. 代理视角 RGB 使用 RGBImgPartialObsWrapper；RGBImgObsWrapper 会展示完整网格。分别记录封装器、任务文本访问权限、动作、terminated 和 truncated。

**主要依据**

- [安装与 BabyAI 任务](https://github.com/Farama-Foundation/Minigrid#readme)
- [观察封装器](https://minigrid.farama.org/api/wrappers/)
- [固定版本的 RGB 可见性及封装器实现](https://github.com/Farama-Foundation/Minigrid/blob/7f5853792ea7f04f75614661006d87fcf949f26d/minigrid/wrappers.py)

### Crafter

结合探索、生命、采集、建造与合成的小型生存世界，成就进度可揭示游玩代理的不同能力。

**技术栈／格式：** Python · Gym 接口 · 像素生存游戏

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[免费 Python 包及可玩 GUI](https://github.com/danijar/crafter#play-yourself) — 运行 pip install crafter pygame；GUI 和评测环境均在本地运行。

[项目／来源记录](https://github.com/danijar/crafter) · [许可／条款](https://github.com/danijar/crafter/blob/main/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** MIT。
- **资产／数据：** 仓库材料受其 MIT 声明覆盖；替换美术须另行记录。
- **AI 用途：** 面向代理评测设计。仅像素测试时，不应向策略提供 info.semantic、inventory 和 player_pos；它们暴露了 RGB 观察以外的结构化状态。公开基准预算与自定义 VLM 协议应分别记录。
- **实际限制：** 已审查源码，未在此运行。经典 Gym 的 reset 仅返回观察，step 返回四个值。reset 没有 seed 参数；除非回合／重置顺序也一致，否则仅匹配构造器种子不足以复现。

**建议测试任务**

- 在留出的世界种子上测量生存及成就成功情况。
- 在固定交互预算下规划从资源到工具的动作序列。
- 修改配方，验证采集、合成和成就记录保持一致。

**开始使用**

1. 在隔离的 Python 环境中安装 crafter 和 pygame。
2. 手动控制运行 python -m crafter.run_gui，自动化使用 CrafterReward-v1。
3. 构造环境时设置种子，并记录回合索引；使用 crafter.Recorder，设置非空输出目录、save_stats=True 和 save_episode=True，保留已完成回合的统计和动作轨迹。

**主要依据**

- [观察、动作及记录器](https://github.com/danijar/crafter#interface)
- [基于成就的评测](https://github.com/danijar/crafter#evaluation)
- [固定版本的重置、种子及特权信息接口约定](https://github.com/danijar/crafter/blob/e04542a2159f1aad3d4c5ad52e8185717380ee3a/crafter/env.py)
- [固定版本的已完成回合记录器接口约定](https://github.com/danijar/crafter/blob/e04542a2159f1aad3d4c5ad52e8185717380ee3a/crafter/recorder.py)

### Craftax

支持向量化模拟的生存与合成环境，适合较长动作依赖，以及像素策略与符号策略的比较。

**技术栈／格式：** Python · JAX · gymnax 风格 API

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[免费 Python 包](https://github.com/MichaelTMatthews/Craftax#readme) — 默认安装 CPU 版 JAX；加速器支持需要正确的 JAX 构建。

[项目／来源记录](https://github.com/MichaelTMatthews/Craftax) · [许可／条款](https://github.com/MichaelTMatthews/Craftax/blob/main/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** MIT。
- **资产／数据：** 仓库材料受其 MIT 声明覆盖；新增资产需独立记录。
- **AI 用途：** 固定观察模式、PRNG 密钥、回合处理及资源包版本。版本变动影响可比性：1.5.0 修复首株种植物的生长，1.6.0 修复 Craftax-Classic 的死亡奖励。
- **实际限制：** 已审查源码，未在此运行。JIT 启动较慢。auto_reset=True 时，产生 done 的 step 会同时返回下一回合的观察／状态和上一回合的 reward／done／info。auto_reset=False 时，须在再次 step 前处理终止。

**建议测试任务**

- 使用相同种子生成的世界，比较生存和合成进度。
- 将仅使用图像的策略与符号状态策略分开。
- 修改方块或配方，必要时使纹理缓存失效，并检查重置行为。

**开始使用**

1. 在隔离的 Python 环境中运行 pip install craftax。
2. 手动游玩运行 play_craftax 或 play_craftax_classic。
3. 明确选择 Craftax-Pixels-v1 或 Craftax-Symbolic-v1；完整 Craftax 与 Craftax-Classic 分开处理。为 reset 和 step 提供不同的 JAX 密钥，并记录 auto_reset 设置。

**主要依据**

- [安装、API 及重置注意事项](https://github.com/MichaelTMatthews/Craftax#readme)
- [游戏教程](https://github.com/MichaelTMatthews/Craftax/blob/main/tutorial.md)
- [固定版本的自动重置状态转移实现](https://github.com/MichaelTMatthews/Craftax/blob/c3c2e0d038c4e641f9481320c158f457f30c28f3/craftax/environment_base/environment_bases.py)

### ViZDoom

提供可编程动作与情景控制的第一人称环境，适合瞄准、导航、战斗和记忆任务；采用 3D 视角及 Doom 风格渲染技术。

**技术栈／格式：** Python／C++ · Doom／ZDoom · Gymnasium

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 3D

[附 Freedoom 资产的免费 Python 包](https://vizdoom.farama.org/) — 运行 pip install vizdoom；先使用随附场景，而非商业 Doom WAD。

[项目／来源记录](https://github.com/Farama-Foundation/ViZDoom) · [许可／条款](https://github.com/Farama-Foundation/ViZDoom#license)

- **许可类别：** 代码与资产采用不同许可
- **代码：** ViZDoom 原创贡献采用 MIT；底层 ZDoom 组件采用独立许可。
- **资产／数据：** 默认资产集为 Freedoom。不提供原版 Doom／Doom II WAD，使用它们需要另行取得相应权利。
- **AI 用途：** 面向 AI 实验构建；这不授予任意 WAD 的使用权。须记录评测所用场景、基础资产和许可。
- **实际限制：** 已审查源码，未在此运行。ViZDoom 1.3+ 的 macOS wheel 要求 Apple Silicon 及 macOS 14+；文档给出的 Intel wheel 路径为 1.2.4。封装器的超时处理在 1.3.0 发生变化，须固定版本及超时选项。WAD 权利仍按场景分别确定。

**建议测试任务**

- 以固定动作频率评估瞄准准确率、导航完成情况及生存。
- 比较仅像素控制与特权缓冲区控制，并明确标为不同评测分组。
- 编辑场景，检查出生点、目标、奖励及终止。

**开始使用**

1. 在受支持的 Python 环境中安装 vizdoom；检查操作系统和架构的 wheel 支持。
2. 从仓库 Python 示例及随附基础场景开始。
3. 使用 Gymnasium 封装器时，固定 config、buffers、button space 和 frame_skip；使用 reset(seed=...)，分别记录 terminated 和 truncated，包括 treat_episode_timeout_as_truncation。

**主要依据**

- [资源包安装与示例](https://github.com/Farama-Foundation/ViZDoom#python-quick-start)
- [Freedoom、WAD 及自定义场景](https://vizdoom.farama.org/faq/)
- [固定版本的 Gymnasium 时序、种子及超时接口约定](https://github.com/Farama-Foundation/ViZDoom/blob/909e834264e42f136f59f80e72e95d8146f40e21/gymnasium_wrapper/base_gymnasium_env.py)

### NetHack Learning Environment

面向探索、背包、战术选择和长期规划的复杂 Roguelike 接口，应使用持续维护的 NetHack-LE 组织版本，而不是已归档的 Facebook 仓库。

**技术栈／格式：** Python · C／C++ · Gymnasium · NetHack

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[免费 Python 包与源码](https://github.com/NetHack-LE/nle#installation) — 可能需要原生编译的前置依赖；仓库包含交互式及随机代理脚本。

[项目／来源记录](https://github.com/NetHack-LE/nle) · [许可／条款](https://github.com/NetHack-LE/nle/blob/main/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** NetHack General Public License；须保留声明，并遵守源码／分发义务。
- **资产／数据：** 随附 NetHack 数据遵循仓库声明；外部图块集另行处理。
- **AI 用途：** 面向 AI 研究的接口；应区分终端渲染、符号、文本消息和内部状态，使规划结果保持可比较。
- **实际限制：** 已审查源码，未在此运行。可能需要原生工具。在所检查代码中，reset(seed=...) 会为 Gymnasium 设置种子，但不会设置 NetHack 随机数生成器；应使用显式种子接口。NetHackChallenge 刻意禁止更改种子。终端／字形观察不是 RGB 游戏帧。

**建议测试任务**

- 在固定回合数预算下测量楼梯或分数任务进度。
- 测试背包决策及无效动作后的恢复。
- 修改任务奖励或终止规则，回放基线轨迹。

**开始使用**

1. 准备 Python 3.10+、CMake 3.28+ 及上游文档规定的平台构建前置条件。
2. 安装 nle，然后运行 python -m nle.scripts.play --mode random。
3. 创建 NetHackScore-v0，固定 observation_keys、actions 及 fix_moon_phase=True；reset 前调用 env.unwrapped.seed，使用已记录的 core、disp、reseed=False 以及可选 lgen 值。

**主要依据**

- [维护中的源码、安装及游玩脚本](https://github.com/NetHack-LE/nle#readme)
- [已归档的上游仓库](https://github.com/facebookresearch/nle)
- [固定版本的观察、种子及重置实现](https://github.com/NetHack-LE/nle/blob/2319f2989f0035685017e9ea13c83b2546fe477c/nle/env/base.py)

### Godot RL Agents

将可编辑 Godot 游戏连接到 Python 代理，适合在自有场景中修改玩法、暴露观察并评估 NPC 控制。

**技术栈／格式：** Godot 4 · Python · 游戏传感器与动作桥接

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 · **维度：** 2D / 3D

[免费工具包与示例项目](https://github.com/edbeeching/godot_rl_agents#quickstart-guide) — 安装 godot-rl 并导入示例；在编辑器中运行，无需预先构建游戏二进制文件。

[项目／来源记录](https://github.com/edbeeching/godot_rl_agents) · [许可／条款](https://github.com/edbeeching/godot_rl_agents/blob/main/LICENSE)

- **许可类别：** 代码与资产采用不同许可
- **代码：** Godot RL Agents 采用 MIT；Godot 也采用 MIT。
- **资产／数据：** 示例资产可能有独立声明：Cartoon Plane 模型采用 CC BY 4.0。
- **AI 用途：** 面向学习及自动化游玩测试设计。须将导入模型的权利与示例署名，同 MIT 工具包许可一并保留。
- **实际限制：** 已审查源码，未在此运行。所检查的桥接在启动二进制文件时发送 env_seed，但 reset(seed=...) 只发送重置消息。编辑器运行需要场景／插件控制种子；应验证重置可重复性，不要假定 Python 参数会为 Godot 重新设置种子。

**建议测试任务**

- 修改移动或奖励逻辑，确认该场景的重置／回放可重复，再比较固定输入轨迹。
- 测试传感器、动作缩放及 Python 与游戏的同步。
- 替换角色或碰撞体，验证观察和控制仍正常。

**开始使用**

1. 在 Python 环境中安装 godot-rl，下载文档示例，例如 JumperHard。
2. 文档中的编辑器示例须使用匹配的 Godot 4 .NET 编辑器，并导入项目。
3. 运行仓库 Stable Baselines 3 示例，或将其环境接口适配到固定策略。

**主要依据**

- [编辑器与导出游戏流程](https://github.com/edbeeching/godot_rl_agents#quickstart-guide)
- [示例资产署名](https://github.com/edbeeching/godot_rl_agents#license)
- [固定版本的二进制启动及重置种子行为](https://github.com/edbeeching/godot_rl_agents/blob/207b6f476f5846f33d08b92c7a350147e7b78bf5/godot_rl/core/godot_env.py)

### Unity ML-Agents

官方工具与示例场景，覆盖物理、视觉控制、合作与竞争，可将自定义 Unity 场景接入 Python 策略和自动化测试。

**技术栈／格式：** Unity · C# · Python · 传感器与代理动作

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划; 资产与动画流程 · **维度：** 2D / 3D

[免费工具包；需要 Unity 编辑器](https://github.com/Unity-Technologies/ml-agents/releases) — 选择一个发布版本，匹配其 Unity 包、Python 包及受支持的编辑器版本。

[项目／来源记录](https://github.com/Unity-Technologies/ml-agents) · [许可／条款](https://github.com/Unity-Technologies/ml-agents/blob/develop/LICENSE.md)

- **许可类别：** 引擎专用许可
- **代码：** 工具包采用 Apache-2.0，附第三方声明。
- **资产／数据：** 检查附带声明及新增场景资产。Unity 编辑器和外部商店资产采用独立条款。
- **AI 用途：** 工具包支持代理研究和自动化测试；其 Apache 许可不能取代编辑器或第三方资产条款。
- **实际限制：** 已审查源码，未在此运行。编辑器使用资格、平台构建及版本兼容性需要本地检查。develop 分支不是稳定评测基线。

**建议测试任务**

- 固定观察、决策及重置规则，比较物理任务成功情况。
- 修改 C# 代理或场景，验证传感器、奖励及回合终止。
- 导入替代骨架或碰撞体，检查控制稳定性与视觉观察。

**开始使用**

1. 选择发布标签，安装其支持的 Unity 编辑器，打开随附 Project。
2. 安装匹配版本的 com.unity.ml-agents 包及 Python 环境包。
3. 打开示例场景并连接策略；按 behavior 和 agent_id 分配动作，同时读取 DecisionSteps 与 TerminalSteps。Python step 推进到下一个决策点，不一定只推进一个物理帧。

**主要依据**

- [官方工具包与版本兼容性](https://github.com/Unity-Technologies/ml-agents#readme)
- [Release 23 底层决策与终止接口约定](https://github.com/Unity-Technologies/ml-agents/blob/a2777719560e4676be99e2ea128c5eb1fbeb3dbb/com.unity.ml-agents/Documentation~/Python-LLAPI.md)
- [第三方声明](https://github.com/Unity-Technologies/ml-agents/blob/develop/Third%20Party%20Notices.md)
- [Unity 编辑器条款](https://unity.com/legal/editor-terms-of-service/software)

### Arcade Learning Environment (ALE)

Atari 2600 的标准评测接口，覆盖 100 余款游戏，原生支持 Gymnasium，提供分数、终止信号与可设种子的评测协议。

**技术栈／格式：** C++／Python · Stella Atari 2600 模拟器 · Gymnasium API

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[官方文档与安装指南](https://ale.farama.org/) — 从 PyPI 安装 ale-py；pip 包附带 Atari ROM，项目也提供 WebAssembly 构建。

[项目／来源记录](https://github.com/Farama-Foundation/Arcade-Learning-Environment) · [许可／条款](https://github.com/Farama-Foundation/Arcade-Learning-Environment/blob/main/LICENSE.md)

- **许可类别：** 代码与资产采用不同许可
- **代码：** ALE 框架采用 GPL-2.0。
- **资产／数据：** pip 包附带 Atari ROM；其权利独立于框架许可，再分发前需要单独审查。
- **AI 用途：** 比较代理前，须固定游戏、模式、难度、跳帧、重复动作概率和种子；分别报告观察来源（像素或 RAM）。附带 ROM 可获取不代表获得再分发数据集的许可。
- **实际限制：** GPL-2.0 适用于框架；Atari ROM 是 pip 包附带的第三方游戏资产，再分发前需单独审查权利。已审查源码，未在此安装；本次未在本地运行 Atari 评测。

**建议测试任务**

- 在相同动作预算下，比较某个游戏启用与禁用黏滞动作时的种子化分数。
- 记录代理使用 RGB 像素还是 RAM 状态，检查重置、截断及生命损失信号。
- 回放固定动作序列，断言不同运行及依赖版本下的分数相同。

**开始使用**

1. 创建 Python 环境，安装 ale-py 和 Gymnasium，并列出可用 ROM ID。
2. 创建 Atari 环境，固定模式、难度、跳帧、repeat_action_probability 和种子。
3. 按回合记录分数、terminated 和 truncated；保留 ale-py 版本及 ROM 清单。

**主要依据**

- [功能、Gymnasium 支持及附带 ROM](https://github.com/Farama-Foundation/Arcade-Learning-Environment#readme)
- [环境列表与评测协议](https://ale.farama.org/environments/)
- [GPL-2.0 许可文本](https://github.com/Farama-Foundation/Arcade-Learning-Environment/blob/main/LICENSE.md)

### Procgen Benchmark

16 个高速程序化生成环境，用于衡量代理多快能学会可迁移到未见关卡的技能。

**技术栈／格式：** Python · Gym API · 16 个程序化生成的类游戏环境

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[安装 Python 包](https://github.com/openai/procgen#readme) — 从仓库安装 procgen；环境在单个 CPU 核心上可达每秒数千步。

[项目／来源记录](https://github.com/openai/procgen) · [许可／条款](https://github.com/openai/procgen/blob/master/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** MIT。
- **资产／数据：** 使用程序化生成的渲染；标准环境无需附带第三方游戏美术。
- **AI 用途：** 将训练与测试关卡分布分开，比较代理前固定包版本、封装器、关卡选择、种子设置及分布模式。记录动作序列和回合边界；步进速度快不代表可以省略实际耗时及样本预算报告。
- **实际限制：** 原生接口提供离散动作空间，没有 action_masks 字段。额外添加的掩码或 Gymnasium 适配属于需另行说明的封装器。相同种子不保证依赖升级后的轨迹相同。仓库处于维护模式；CoinRun 不同于最初的独立版本，标准封装器需要兼容的 Gym 版本。已审查源码，未在本地安装或运行。

**建议测试任务**

- 比较在小型关卡集和完整分布上训练的代理，并用留出种子评测。
- 在同一固定版本与封装器中，从相同初始状态和种子设置回放记录的动作；比较观察、奖励及回合边界。
- 测量单个环境的每秒步数，记录硬件及线程数。

**开始使用**

1. 创建 Python 环境，固定 procgen、其原生 Gym 或 Gym3 接口及其他封装器依赖。
2. 固定 num_envs、num_levels、start_level、rand_seed、distribution_mode 及线程数；保留初始状态或重置／回合顺序，以及记录的动作序列。
3. 使用所选接口记录观察、奖励和回合边界；若封装器将其转换为 terminated 和 truncated 信号，须记录该封装器。

**主要依据**

- [包含环境列表及速度说明的 README](https://github.com/openai/procgen#readme)
- [原生动作空间、种子选项及状态接口](https://github.com/openai/procgen/blob/master/procgen/env.py)
- [基准论文](https://arxiv.org/abs/1912.01588)
- [MIT 许可文本](https://github.com/openai/procgen/blob/master/LICENSE)

### Google Research Football

可配置场景、多智能体对战与多种观察表示的研究型足球环境，自带游戏引擎。

**技术栈／格式：** C++ 游戏引擎 · Python Gym API · 多智能体足球场景

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 3D

[安装与场景指南](https://github.com/google-research/football#readme) — 可从 PyPI 安装或从源码构建；仓库还链接了使用预构建二进制文件的 Colab 笔记本。

[项目／来源记录](https://github.com/google-research/football) · [许可／条款](https://github.com/google-research/football/blob/master/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** Apache-2.0。
- **资产／数据：** 基于开源 Gameplay Football 项目；须检查附带资产及单独下载的引擎组件。
- **AI 用途：** 比较策略前，须固定场景、受控球员数量、观察表示、动作集、种子和回合长度。预构建二进制文件提供便利，但不保证可复现。
- **实际限制：** GitHub 仓库已归档，最后一次推送为 2025 年 6 月，因此不应假定会继续维护。安装依赖平台专用二进制文件或源码构建，底层 Gameplay Football 资产有各自来源。已审查源码，未在本地安装或运行。

**建议测试任务**

- 比较同一策略分别使用像素、紧凑向量表示和完整状态表示的表现。
- 在两个包版本中用固定种子运行固定场景，检查分数及回合长度。
- 检查多智能体场景在重置后的角色分配及失同步情况。

**开始使用**

1. 从 PyPI 安装发布版本，或从源码构建，然后验证引擎二进制文件及 Python 版本。
2. 以固定种子创建一个场景，记录观察形状及动作集，运行一个短基线回合。

**主要依据**

- [包含安装、场景及表示说明的 README](https://github.com/google-research/football#readme)
- [基准论文](https://arxiv.org/abs/1907.11180)
- [Apache-2.0 许可文本](https://github.com/google-research/football/blob/master/LICENSE)

### Overcooked-AI

双代理协作烹饪基准，含手工与程序化布局，用于协调与人机协作研究。

**技术栈／格式：** Python · Gym 风格 API · 双代理协作布局

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[安装与布局指南](https://github.com/HumanCompatibleAI/overcooked_ai#readme) — 安装 overcooked-ai Python 包；布局及规划基线随包提供。

[项目／来源记录](https://github.com/HumanCompatibleAI/overcooked_ai) · [许可／条款](https://github.com/HumanCompatibleAI/overcooked_ai/blob/master/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** MIT。
- **资产／数据：** 仓库代码及布局定义采用 MIT；README 链接的人体参与研究数据另行处理。
- **AI 用途：** 固定布局、回合时限、搭档策略和种子。仅分数会掩盖协调失败，因此应分别记录联合动作、碰撞及空闲步数。
- **实际限制：** 仓库最后一次推送为 2025 年 3 月，README 指向另有条款的人体参与研究数据集。须固定布局名称及旧版 Gym API。已审查源码，未在本地安装或运行。

**建议测试任务**

- 在同一布局中，比较自博弈组合和搭配固定启发式搭档的表现，同时报告分数及碰撞次数。
- 回放固定联合动作序列，断言重置后状态转移相同。
- 检查生成布局可否通过记录的种子复现。

**开始使用**

1. 在 Python 环境中安装 overcooked-ai，并列出可用布局。
2. 以指定布局名称、固定回合时限和种子创建双代理环境，记录联合观察及奖励。

**主要依据**

- [包含布局及安装说明的 README](https://github.com/HumanCompatibleAI/overcooked_ai#readme)
- [基准论文](https://arxiv.org/abs/1910.05789)
- [MIT 许可文本](https://github.com/HumanCompatibleAI/overcooked_ai/blob/master/LICENSE)

### MuJoCo

带 Python 接口的确定性接触动力学引擎，适合作为模拟角色与物体的物理及确定性基线。

**技术栈／格式：** C／C++ 物理引擎 · MJCF／URDF 模型 · Python 绑定

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 资产与动画流程 · **维度：** 3D

[官方文档](https://mujoco.readthedocs.io/en/stable/overview.html) — 可安装 mujoco Python 包；项目开源后无需独立许可密钥。

[项目／来源记录](https://github.com/google-deepmind/mujoco) · [许可／条款](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** Apache-2.0。
- **资产／数据：** 项目附带的 MJCF 模型及网格需检查各自来源；用户提供的模型另行处理。
- **AI 用途：** 物理回归测试应使用受控 MJCF 模型、固定时间步长及求解器设置；记录引擎版本，因为不同发布版本间接触行为可能变化。MuJoCo 是物理模拟器，不是游戏或游玩基准。
- **实际限制：** MuJoCo 面向机器人及生物力学，而非游戏游玩；每项测试均须明确与游戏的相关性。附带模型和网格有独立来源。已审查源码，未在本地构建或运行。

**建议测试任务**

- 在同一模型上回放固定控制序列，比较不同引擎版本下物体的最终位置。
- 将同一骨架分别以 MJCF 和 URDF 导入，比较关节限位、质量属性及接触行为。

**开始使用**

1. 固定 mujoco 发布版本，加载一个 MJCF 模型，记录时间步长、积分器及求解器设置。
2. 以固定控制序列推进模拟，记录位置、速度和接触。

**主要依据**

- [包含安装及绑定说明的 README](https://github.com/google-deepmind/mujoco#readme)
- [官方文档概览](https://mujoco.readthedocs.io/en/stable/overview.html)
- [Apache-2.0 许可文本](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)

### Gymnasium classic control

状态方程完全公开的小型确定性控制环境，适合检验重置、种子与回合终止行为。

**技术栈／格式：** Python · Gymnasium API · CartPole、Pendulum、MountainCar 和 Acrobot

**类型：** AI 评估环境 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D

[经典控制环境文档](https://gymnasium.farama.org/environments/classic_control/) — 这些环境无需外部游戏二进制文件、ROM 或模型下载。

[项目／来源记录](https://github.com/Farama-Foundation/Gymnasium) · [许可／条款](https://github.com/Farama-Foundation/Gymnasium/blob/main/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** MIT。
- **资产／数据：** 仅程序化渲染；这些环境无需附带第三方游戏资产。
- **AI 用途：** 固定环境 ID、种子、渲染模式和 Gymnasium 版本。这些简化任务可验证代理流程，但不可作为游戏游玩能力的证据报告。
- **实际限制：** 经典控制任务是简化控制问题，不是游戏。这里只将其作为确定性的流程检查；本次审查未在本地安装或运行任何环境。

**建议测试任务**

- 以相同种子重置两个环境，断言初始观察及终止限制相同。
- 修改封装器或动作映射层，验证 step、terminated 和 truncated 的接口约定仍成立。

**开始使用**

1. 安装固定的 gymnasium 发布版本，以固定种子创建一个经典控制环境。
2. 记录观察范围、动作空间、终止条件及确切版本字符串。

**主要依据**

- [经典控制环境参考](https://gymnasium.farama.org/environments/classic_control/)
- [Gymnasium README 与 API 范围](https://github.com/Farama-Foundation/Gymnasium#readme)
- [MIT 许可文本](https://github.com/Farama-Foundation/Gymnasium/blob/main/LICENSE)

### Kenney

适合小型测试场景、资产替换、碰撞和 UI 回归的 CC0 资源起点。

**技术栈／格式：** 精灵图、图块、UI、音频和 3D 模型包

**类型：** 资产库 · **目标：** 代码修改与自动试玩; 资产与动画流程 · **维度：** 2D / 3D

[浏览免费资源包](https://kenney.nl/assets) — 单个资源包可免费下载；可选合集和工具是独立产品。

[项目／来源记录](https://kenney.nl/assets) · [许可／条款](https://kenney.nl/support)

- **许可类别：** 开放许可资源
- **代码：** 非软件项目
- **资产／数据：** 资产包采用 CC0
- **AI 用途：** 可将采用 CC0 的资源包文件用于可再分发的测试夹具。这不表示网站、品牌标识或单独销售的软件也采用 CC0。
- **实际限制：** 并非每个资源包都包含动画或人形骨架。本次审查未在本地导入任何资源包。

**建议测试任务**

- 替换精灵图或模型，检查比例、碰撞及材质引用。
- 运行固定的 UI 或图块地图场景，比较截图。

**开始使用**

1. 选择一个小型资源包，并保留随附的许可文件。
2. 将资源包导入版本固定的测试项目，记录导入设置。

**主要依据**

- [创作者许可常见问题](https://kenney.nl/support)

### Quaternius

CC0 模型与角色，可用于可重复的导入、材质、碰撞和动画测试。

**技术栈／格式：** 低多边形环境、角色和动画模型包

**类型：** 资产库 · **目标：** 代码修改与自动试玩; 资产与动画流程 · **维度：** 3D

[浏览创作者资源包](https://quaternius.com/) — 检查具体资源包：免费 Standard 下载和付费 Pro 或 Source 版本可能包含不同文件。

[项目／来源记录](https://quaternius.com/) · [许可／条款](https://quaternius.com/)

- **许可类别：** 开放许可资源
- **代码：** 非软件项目
- **资产／数据：** 创作者明确指定的资源包采用 CC0；须检查每次下载的内容
- **AI 用途：** 复用应以下载文件的 CC0 声明为依据。免费版本不代表有权获取付费源文件或无关的市场内容。
- **实际限制：** 资源包的格式和所含骨架各不相同；Standard 不一定包含完整合集。所引 Universal Animation Library 更新日志记录了 v2.0 的 Unreal FBX 转 GLB 导出及骨架名称变动、v2.1 的 24 fps 修正为 30 fps，以及 v3.0 的根运动和步态相位变动；应固定发布版本及根运动变体，保证测试可比较。本次未在本地导入。

**建议测试任务**

- 将同一模型导入两个引擎，比较比例、着色和碰撞。
- 替换角色，同时保留动画和场景引用。

**开始使用**

1. 选择明确采用 CC0 的资源包，并保存其版本档次和发布信息。
2. 将原始压缩包与引擎导入设置一并保存。

**主要依据**

- [创作者资源目录与许可](https://quaternius.com/)
- [示例资源包及版本档次说明](https://quaternius.itch.io/universal-animation-library)

### Poly Haven

CC0 写实资产，适合材质、光照、依赖与视觉域回归测试。

**技术栈／格式：** PBR 纹理、HDRI、3D 模型及公开下载 API

**类型：** 资产库 · **目标：** 资产与动画流程 · **维度：** 3D

[浏览 CC0 资产](https://polyhaven.com/all) — 可免费下载；API 自 2026 年 7 月 18 日起可供个人、学术及商业用途免费使用。

[项目／来源记录](https://polyhaven.com/) · [许可／条款](https://polyhaven.com/license)

- **许可类别：** 开放许可资源
- **代码：** 非软件项目
- **资产／数据：** 可下载资产采用 CC0；在线 API 服务有独立条件
- **AI 用途：** 官方 API 页面明确将 AI/ML 数据集列为支持用途。使用在线 API 的产品必须注明 Poly Haven 为资产来源，请求必须使用独特的 User-Agent；这些条件独立于 CC0。
- **实际限制：** 网站文案与示例渲染图不在 CC0 资产授权范围内。API 可用性仅尽力保障；本次未在本地导入。

**建议测试任务**

- 导入后检查纹理依赖、法线方向和物理比例。
- 比较固定场景在不同 HDRI 或材质分辨率下的表现。

**开始使用**

1. 选择小型模型、纹理集或 HDRI，并固定分辨率。
2. 集成 API 时保留文件哈希，并遵守来源署名和 User-Agent 条件。

**主要依据**

- [资产许可](https://polyhaven.com/license)
- [当前 API 条款与接口](https://polyhaven.com/our-api)

### ambientCG

CC0 纹理与资产来源，可建立通道、地形、光照和材质分辨率测试用例。

**技术栈／格式：** PBR 材质、贴花、图集、HDRI、地形和模型

**类型：** 资产库 · **目标：** 资产与动画流程 · **维度：** 3D

[浏览可下载资产](https://ambientcg.com/list) — 公开资产可免费下载；可选支持服务另行提供。

[项目／来源记录](https://ambientcg.com/) · [许可／条款](https://docs.ambientcg.com/license/)

- **许可类别：** 开放许可资源
- **代码：** 非软件项目
- **资产／数据：** 可下载资产采用 CC0
- **AI 用途：** 应依据资产的 CC0 授权来复用，而非依据价格为零。服务访问条件及无关的第三方内容应另行处理。
- **实际限制：** 资产格式及可用贴图各不相同。本次审查未下载或导入测试材质。

**建议测试任务**

- 验证粗糙度、金属度、置换和法线贴图使用了正确通道。
- 测量不同纹理分辨率下的内存与视觉变化。

**开始使用**

1. 以固定分辨率下载一个资产，并保留其标识。
2. 记录色彩空间、法线贴图和材质导入设置。

**主要依据**

- [官方资产许可](https://docs.ambientcg.com/license/)
- [资产目录](https://ambientcg.com/list)

### OpenGameArt

覆盖广泛的社区 2D 内容，适合内容测试，但需逐项记录和确认许可。

**技术栈／格式：** 社区精灵图、图块、模型、音乐和音效

**类型：** 资产库 · **目标：** 代码修改与自动试玩; 资产与动画流程 · **维度：** 2D / 3D

[浏览社区资产](https://opengameart.org/) — 从具体条目下载，并保留作者、许可及署名要求。

[项目／来源记录](https://opengameart.org/) · [许可／条款](https://opengameart.org/content/faq)

- **许可类别：** 代码与资产采用不同许可
- **代码：** 非软件项目
- **资产／数据：** 许可按条目而定，包括 CC0、CC-BY、CC-BY-SA 和 GPL 变体
- **AI 用途：** 目录不存在统一的 AI 使用授权。应选择许可合适的文件，并在发布数据集前评估署名、相同方式共享及其他权利要求。
- **实际限制：** 免费下载内容的许可与质量各不相同。常见问题说明预览图与音频的权利可能不同于可下载资产；除非明确包含在授权内，否则不要将预览当作已获许可的测试夹具文件。本次目录审查未在本地导入或逐项确认任何资产的使用权。

**建议测试任务**

- 导入图块地图，验证图块尺寸、透明度和碰撞对齐。
- 根据实际选用的条目生成署名清单。

**开始使用**

1. 按预期测试与分发所需的许可筛选内容。
2. 归档所选条目的 URL、作者、许可文本和原始文件。

**主要依据**

- [许可与署名常见问题](https://opengameart.org/content/faq)

### Fab

当具体条目、许可和 AI 使用字段符合任务条件时，可作为资产导入测试材料。

**技术栈／格式：** 市场中的模型、材质、动画和引擎专用内容

**类型：** 资产库 · **目标：** 资产与动画流程 · **维度：** 2D / 3D

[浏览市场条目](https://www.fab.com/) — 免费与付费条目并存；账户访问要求和引擎兼容性取决于具体条目。

[项目／来源记录](https://www.fab.com/) · [许可／条款](https://www.fab.com/eula)

- **许可类别：** 使用权限需确认
- **代码：** 非软件项目
- **资产／数据：** 按条目而定：Fab Standard、CC-BY 或其他明示条款；部分内容为 UE-Only
- **AI 用途：** 通过 AI 测试或分享数据集前，须检查条目许可和 AI 使用标记。单个条目的字段不代表整个目录的规则；免费价格不等于开放许可。
- **实际限制：** Standard 许可通常不允许独立再分发资产。官方摘要说明 Reference-Only 访问不包含源格式文件，因此规划导出或导入夹具前，应确认所获得的档次。引擎专用内容和单独条款需另行审查；本次未在本地导入。

**建议测试任务**

- 针对一个已确认可使用的条目，验证依赖、LOD 和材质导入。
- 比较条目列出的引擎版本与项目的实际导入结果。

**开始使用**

1. 记录具体条目、获取的版本、许可和 AI 使用字段。
2. 仅在预期自动化使用及分发均获覆盖后导入。

**主要依据**

- [Fab Standard 许可摘要与 EULA](https://www.fab.com/eula)
- [带 AI 使用字段的 UE-Only 条目示例](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0)

### Unity Asset Store

在确认提供方权利与允许的自动化方式后，可用于资源包与导入回归测试。

**技术栈／格式：** Unity 资源包、角色、动画、环境和编辑器工具

**类型：** 资产库 · **目标：** 资产与动画流程 · **维度：** 2D / 3D

[浏览 Asset Store 资源包](https://assetstore.unity.com/) — 免费资源包也可能需要账户、兼容的 Unity 版本和依赖包。

[项目／来源记录](https://assetstore.unity.com/) · [许可／条款](https://unity.com/legal/as-terms)

- **许可类别：** 使用权限需确认
- **代码：** 非软件项目
- **资产／数据：** Asset Store EULA，或明示的受限／第三方许可
- **AI 用途：** Unity 平台的代理访问权限与第三方资产授权需分别检查。Asset Store 条款限制未经明确同意的 AI／模型相关使用；获准访问编辑器不代表获得资产训练或数据集权利。
- **实际限制：** 免费不等于开源。受限资产和第三方组件可能采用不同条款；本次未下载或导入资源包。

**建议测试任务**

- 在获准使用的项目中检查资源包导入、脚本缺失及依赖变动。
- 跨受支持的编辑器版本比较骨架映射和动画导入设置。

**开始使用**

1. 记录资源包版本、提供方许可和预期 AI 用途。
2. 使用获准的 Unity 自动化连接，并取得所需的提供方授权。

**主要依据**

- [Asset Store 条款与 EULA](https://unity.com/legal/as-terms)
- [2026 年条款更新与代理访问说明](https://unity.com/legal)

### Khronos glTF Sample Assets

Khronos 官方 glTF 2.0 模型集合，附带专用于检验查看器、转换器与导入器的 Testing 列表。

**技术栈／格式：** glTF 2.0／GLB 参考与测试模型，附每个模型的许可元数据

**类型：** 资产库 · **目标：** 代码修改与自动试玩; 资产与动画流程 · **维度：** 3D

[浏览官方资产列表](https://github.khronos.org/glTF-Assets/) — 可浏览目录提供带标签的模型列表、预览及每个模型的许可与署名信息；可下载文件保存在仓库中。

[项目／来源记录](https://github.com/KhronosGroup/glTF-Sample-Assets) · [许可／条款](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/README.md)

- **许可类别：** 代码与资产采用不同许可
- **代码：** 仓库文本采用 CC-BY-4.0；各模型的许可及署名要求记录于各自的 README。
- **资产／数据：** 许可按模型而定，常见为 CC-BY 4.0 或 CC0；复用前须检查具体模型目录中的 README。
- **AI 用途：** 将标记为 Testing 的模型用作确定性的导入与渲染夹具。仓库文本的 CC-BY 授权不延伸至所有模型、网站品牌或第三方展示作品；须保留各模型的署名行。
- **实际限制：** 许可按模型而非整个仓库适用；若干展示资产要求署名，也有资产因许可不合适而被移除。本次审查未在本地下载或导入模型。

**建议测试任务**

- 将同一个 Testing 模型导入两个引擎，比较几何、材质、纹理方向和比例。
- 将固定的一组扩展模型与仅使用核心功能的模型送入转换器，记录丢失的功能。

**开始使用**

1. 固定仓库提交，从 Testing 和 Core Only 列表选择少量模型。
2. 将各模型 README 中的署名和许可复制到下载的 .gltf／.glb 文件旁，并记录导入设置。

**主要依据**

- [用于查看器和转换器的 Testing 模型](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models-testing.md)
- [包含许可摘要的完整模型列表](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models.md)
- [仓库许可与各模型署名规则](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/README.md)

### Khronos glTF Asset Generator

官方 glTF 2.0 导入器测试资产生成器，按 Positive / Negative 分组覆盖访问器、动画、材质、网格与纹理要求。

**技术栈／格式：** C#／.NET 生成器，产出正向及负向 glTF 2.0 符合性测试资产

**类型：** 资产库 · **目标：** 代码修改与自动试玩; 资产与动画流程 · **维度：** 3D

[浏览生成的测试资产](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Positive) — 预生成的 Positive 和 Negative 模型保存在 Output 下；C# 解决方案可重新生成它们。

[项目／来源记录](https://github.com/KhronosGroup/glTF-Asset-Generator) · [许可／条款](https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** 生成器源码采用 MIT。
- **资产／数据：** 生成的输出资产受仓库 MIT 许可覆盖；仍须记录所用 Output 的确切修订版本。
- **AI 用途：** 根据每个用例的文档属性、验证器报告及 glTF 规范定义预期结果。Negative 目录不代表必须拒绝整个资产：缺少 POSITION 数据时，客户端应跳过受影响图元的渲染，除非其他机制提供位置。验证器结果应与导入器诊断及渲染行为分开；通过某个用例不能证明完全符合 glTF 规范。
- **实际限制：** 覆盖范围仍在完善，README 说明还将增加更多要求。C# 项目面向 Visual Studio／.NET 流程；本次审查未在本地构建或运行生成器。

**建议测试任务**

- 加载选定的 Positive 用例，将受支持的几何、材质及动画与文档预期比较；分别记录不支持的功能和诊断信息。
- 逐个将 Negative 用例的观察结果与文档规定的处理方式比较，包括适用时跳过图元，并检查畸形输入不会使导入器崩溃。

**开始使用**

1. 固定仓库提交，将 Output/Positive 和 Output/Negative 目录复制到版本化夹具中。
2. 记录导入器和验证器版本、支持的扩展及每个用例的预期；保存验证报告、导入器诊断和渲染结果，不要求所有 Negative 资产都失败。

**主要依据**

- [项目范围与已支持要求](https://github.com/KhronosGroup/glTF-Asset-Generator#readme)
- [负向测试输出](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Negative)
- [Mesh_NoPosition 用例与属性表](https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/Output/Negative/Mesh_NoPosition/README.md)
- [glTF 规范：使用图元数据](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#using-primitive-data)
- [MIT 许可文本](https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/LICENSE)

### Kenney Animated Characters

小型 CC0 角色，适合首轮蒙皮、动画播放与导入回归检查。

**技术栈／格式：** 风格化绑定角色与动画资源包

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[下载角色包](https://kenney.nl/assets/animated-characters-protagonists) — 创作者提供免费下载；须检查压缩包中可用的模型和格式。

[项目／来源记录](https://kenney.nl/assets/animated-characters-protagonists) · [许可／条款](https://kenney.nl/support)

- **许可类别：** 开放许可资源
- **代码：** 非软件项目
- **资产／数据：** CC0
- **AI 用途：** 资源包内的资产文件采用 CC0。应在测试夹具中保留来源，且不要将授权延伸至网站媒体或采用独立许可的工具。
- **实际限制：** 不能假定简化角色具有完整的标准人形骨架。本次未在本地进行导入或重定向测试。

**建议测试任务**

- 导入后检查蒙皮、动画播放及包围范围。
- 在固定场景中比较角色比例和碰撞。

**开始使用**

1. 保留原始压缩包和随附许可。
2. 设置人形映射前，检查实际骨骼层级。

**主要依据**

- [角色包](https://kenney.nl/assets/animated-characters-protagonists)
- [CC0 许可常见问题](https://kenney.nl/support)

### Quaternius Universal Animation Library

CC0 人形动画基线，适合重定向、移动混合和根运动测试。

**技术栈／格式：** 人形骨架、引擎导出文件、根运动和原地动画片段

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[获取免费 Standard 版本](https://quaternius.itch.io/universal-animation-library) — Standard 是免费子集。Pro 包含更多动画片段；Source 另含 Blender 源文件，为付费版本。

[项目／来源记录](https://quaternius.itch.io/universal-animation-library) · [许可／条款](https://quaternius.itch.io/universal-animation-library)

- **许可类别：** 开放许可资源
- **代码：** 非软件项目
- **资产／数据：** CC0；可用文件取决于获取的版本档次
- **AI 用途：** CC0 授权适用于所下载版本内的文件。免费 Standard 访问不包含所有宣传中的动画片段或付费 Blender 源文件。
- **实际限制：** 创作者当前页面说明，Unreal GLB 导入需要高于 5 的版本。本次未在本地播放或重定向。

**建议测试任务**

- 将移动动画重定向到另一个 CC0 角色，测量脚底滑动。
- 比较根运动与原地动画的位移、混合及循环接缝。

**开始使用**

1. 记录版本档次和发布版本；不同版本间骨架名称与帧率曾有变化。
2. 选择对应引擎的导出文件，重定向前检查其导入要求。

**主要依据**

- [骨架、许可、格式及更新日志](https://quaternius.itch.io/universal-animation-library)
- [Standard／Pro／Source 下载档次](https://quaternius.itch.io/universal-animation-library/purchase)

### 100STYLE

带风格的移动数据，可用于动作匹配、步态多样性与跨骨骼重定向。

**技术栈／格式：** BVH 动作捕捉，28 骨骼骨架，60 fps

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[获取原始动作数据](https://www.ianxmason.com/100style/) — 下载原始 BVH 数据；蒙皮角色属于独立资产。

[项目／来源记录](https://www.ianxmason.com/100style/) · [许可／条款](https://www.ianxmason.com/100style/)

- **许可类别：** 开放许可资源
- **代码：** 非软件项目
- **资产／数据：** 原始动作数据采用 CC BY 4.0；独立重定向仓库中的 Geno.fbx 仅限非商业研究
- **AI 用途：** 原始动作采用 CC BY 4.0，要求署名。应使用具有独立适用许可的角色；动作许可不会消除 Geno 网格的限制。
- **实际限制：** 全部 100 种风格均由同一名演员采集，因此留出风格无法检验对未见表演者的泛化。BVH 动作不是已完成蒙皮的游戏角色。开放资源推荐不包含 Geno 网格；本次未在本地重定向。

**建议测试任务**

- 重定向差异明显的行走风格，比较脚部接触和关节限位。
- 使用留出的风格构建动作匹配测试夹具。

**开始使用**

1. 将原始数据集的引用和许可与 BVH 文件一并保存。
2. 处理前记录帧率、来源骨架及坐标转换。

**主要依据**

- [原始数据集与许可](https://www.ianxmason.com/100style/)
- [重定向动作与 Geno 网格的不同条款](https://github.com/orangeduck/100style-retarget)

### CMU Motion Capture Database

覆盖广泛的动作数据，适合骨骼解析、坐标转换、控制或重定向研究。

**技术栈／格式：** ASF 骨架与 AMC 动作文件，包含受试者各自的标定

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[浏览受试者与动作](https://mocap.cs.cmu.edu/) — 遵照网站要求，只下载所需内容，不要镜像整个数据库。

[项目／来源记录](https://mocap.cs.cmu.edu/) · [许可／条款](https://mocap.cs.cmu.edu/)

- **许可类别：** 研究与自定义数据条款
- **代码：** 非软件项目
- **资产／数据：** CMU 自定义使用条款：允许研究和商业产品；不得直接转售原始或转换后的数据
- **AI 用途：** 网站按自定义条件允许用于研究和商业产品。这不等于 CC0，也不代表允许直接转售原始／转换后的数据集；下游数据集分发需另行评估。
- **实际限制：** 不同受试者具有不同的标定骨架；许多引擎需要先转换 ASF／AMC。本次未在本地解析或导入。

**建议测试任务**

- 解析多个受试者的骨架，比较单位归一化及关节变换。
- 将移动和交互动画片段重定向到统一测试骨架。

**开始使用**

1. 下载受试者骨架及其匹配的动作文件。
2. 保留受试者和动作 ID、来源条款及转换设置。

**主要依据**

- [官方数据库使用条件](https://mocap.cs.cmu.edu/)

### LaFAN1

面向动作补间、轨迹连续性和障碍过渡的研究数据与基线。

**技术栈／格式：** 动作捕捉 BVH 数据与过渡评测代码

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[打开数据集仓库](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) — 大型数据集文件使用 Git LFS；须保留仓库的评测划分及文档。

[项目／来源记录](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) · [许可／条款](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/master/license.txt)

- **许可类别：** 研究与自定义数据条款
- **代码：** 非软件项目（动作数据集）；附带基线代码的复用需另行检查
- **资产／数据：** 动作数据集采用 CC BY-NC-ND 4.0
- **AI 用途：** 许可允许非商业改编，但不允许分享改编材料；必要的技术性格式变更另行处理。应保留署名，并审查任何重定向数据的发布；商业 AI 测试服务用途不在覆盖范围内。
- **实际限制：** 不是可普遍再分发的商业动画资源包。本次未下载数据集、运行基线或在本地导入。

**建议测试任务**

- 使用随附基线比较全局四元数损失（L2Q）、归一化全局位置损失（L2P）和 NPSS。
- 检查补间片段中的接触与根节点轨迹。

**开始使用**

1. 结合预期研究和分发方式审查数据许可。
2. 获取所需 LFS 文件；保留 30 fps，以及受试者 1–4 用于训练、受试者 5 用于测试的划分。

**主要依据**

- [数据集条款与评测说明](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/README.md)
- [数据集许可文本](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/license.txt)
- [表演者划分与评测设置](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/evaluate.py)
- [过渡指标实现](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/lafan1/benchmarks.py)

### AMASS

在统一参数空间中提供研究规模的人体动作，适合姿态流程与动作模型。

**技术栈／格式：** 将多个动作捕捉集合统一为参数化人体动作

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[审查访问与数据集条款](https://amass.is.tue.mpg.de/) — 需要注册并同意数据集条款；模型／工具访问权限另行处理。

[项目／来源记录](https://amass.is.tue.mpg.de/) · [许可／条款](https://amass.is.tue.mpg.de/license.html)

- **许可类别：** 研究与自定义数据条款
- **代码：** 非软件项目
- **资产／数据：** AMASS 自定义条款，仅适用于指定的非商业研究用途；禁止再分发
- **AI 用途：** 许可将使用限制于其明示用途，禁止再分发，并限制商业用途，包括以商业为目的的训练。独立的 SMPL／模型条款仍然适用。
- **实际限制：** 不是可直接导入引擎的动画片段包，也不是可公开再分发的测试数据集来源。本次未注册、下载或在本地转换。

**建议测试任务**

- 将获准使用的动作参数转换为统一的关节表示。
- 比较不同来源集合的根节点轨迹与骨架映射。

**开始使用**

1. 注册并确认预期研究用途在协议范围内。
2. 单独获取所需人体模型，并记录两者的许可。

**主要依据**

- [数据集与表示方法](https://amass.is.tue.mpg.de/)
- [AMASS 许可](https://amass.is.tue.mpg.de/license.html)

### SMPL-Body

采用 CC BY 许可的人体子集，适合人体网格、骨骼、蒙皮与姿态交换测试。

**技术栈／格式：** 固定体形的人体网格、骨架绑定及姿态／动态混合形状

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[阅读人体子集许可](https://smpl.is.tue.mpg.de/bodylicense.html) — 须获取实际受 SMPL-Body 覆盖的文件；模型下载及生成工具另有条款。

[项目／来源记录](https://smpl.is.tue.mpg.de/) · [许可／条款](https://smpl.is.tue.mpg.de/bodylicense.html)

- **许可类别：** 开放许可资源
- **代码：** 非软件项目
- **资产／数据：** SMPL-Body 采用 CC BY 4.0，不包含体形混合形状及根据它们生成人体的工具
- **AI 用途：** 对授权覆盖的人体子集履行 CC BY 署名要求。此授权不包含参数化模型、生成工具或单独许可的 AMASS 动作。
- **实际限制：** 人体子集许可不包含生成体形的组件。本次未获取人体文件或在本地导入。

**建议测试任务**

- 验证网格权重、关节变换及坐标转换。
- 导出为所选引擎格式后，比较姿态播放。

**开始使用**

1. 确认获取的文件属于仅限人体子集的定义范围。
2. 保存署名，并一并保留所有模型或动作许可。

**主要依据**

- [SMPL-Body 范围与署名](https://smpl.is.tue.mpg.de/bodylicense.html)
- [独立的 SMPL-Model 条款](https://smpl.is.tue.mpg.de/modellicense.html)

### SMPL-Model

用于形状与姿态转换、人体到游戏骨骼流程的研究表示。

**技术栈／格式：** 参数化人体模型与体形生成工具

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[审查模型访问条款](https://smpl.is.tue.mpg.de/modellicense.html) — 模型／工具访问权限及商业授权，与采用 CC BY 的 SMPL-Body 子集相互独立。

[项目／来源记录](https://smpl.is.tue.mpg.de/) · [许可／条款](https://smpl.is.tue.mpg.de/modellicense.html)

- **许可类别：** 研究与自定义数据条款
- **代码：** 非软件项目（模型数据）；随附工具采用独立的 SMPL-Model 协议
- **资产／数据：** SMPL-Model 自定义条款，仅适用于指定的非商业用途；禁止再分发；商业许可另行处理
- **AI 用途：** 模型协议将使用限制为非商业科学研究、教育或艺术项目，禁止再分发及以商业为目的的训练；它与 CC BY 人体子集和 AMASS 数据条款相互独立。
- **实际限制：** 不是可无限制使用的开源游戏骨架。本次未下载模型、执行工具或在本地导入。

**建议测试任务**

- 比较获准的姿态与体形参数向游戏关节的转换。
- 在获准的体形变化下，检查拓扑与蒙皮的一致性。

**开始使用**

1. 注册以获取下载权限，审查模型／工具协议并确认预期用途。
2. 对获准的模型文件和转换代码进行版本管理，且不公开受限输入。

**主要依据**

- [模型许可](https://smpl.is.tue.mpg.de/modellicense.html)
- [仅限人体子集的许可对照](https://smpl.is.tue.mpg.de/bodylicense.html)

### Mixamo

常见的游戏动画制作流程，用于 AI 测试的权限仍需另行确认。

**技术栈／格式：** Adobe 在线人形自动绑定与动画服务

**类型：** 骨骼与动作数据 · **目标：** 资产与动画流程 · **维度：** 3D

[先阅读服务常见问题](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) — 需要 Adobe ID。普通游戏用途不代表获得 AI 评测或数据集权利。

[项目／来源记录](https://www.mixamo.com/) · [许可／条款](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf)

- **许可类别：** 使用权限需确认
- **代码：** 非软件项目
- **资产／数据：** Adobe 服务／内容条款；不是开放资产许可
- **AI 用途：** Adobe 发布于 2021 年的附加条款明确规定了 AI／ML 创建、训练、测试和改进的限制。本次未核实当前登录时的条款接受流程，因此既未将其标为已确认许可，也未标为已确认的当前全面禁令。
- **实际限制：** 不纳入默认 AI 评测数据集推荐。本次未登录账户、下载、自动绑定或在本地导入。

**建议测试任务**

- 审查权限后，检查人形骨骼映射及动画片段导入。
- 比较常规角色重定向、比例和循环设置。

**开始使用**

1. 确认当前已接受的协议及具体预期 AI 相关用途。
2. 只使用获准文件，并保留来源／服务记录。

**主要依据**

- [当前服务常见问题](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)
- [官方 2021 年附加条款](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf)

### SDL GameControllerDB

社区维护的 SDL 手柄映射数据库，是可复现手柄输入与按键布局回归测试的纯文本夹具。

**技术栈／格式：** SDL2／SDL3 · gamecontrollerdb.txt · 社区维护的 GUID 映射

**类型：** 输入与数据夹具 · **目标：** 代码修改与自动试玩; 视觉、控制与规划 · **维度：** 2D / 3D

[下载 gamecontrollerdb.txt](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt) — 单个文本文件；SDL2 使用 SDL_GameControllerAddMappingsFromFile 加载，SDL3 使用 SDL_AddGamepadMappingsFromFile 加载。兼容 SDL 2.0.10 及更高版本。

[项目／来源记录](https://github.com/mdqinc/SDL_GameControllerDB) · [许可／条款](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/LICENSE)

- **许可类别：** 开放许可资源
- **代码：** 数据库文件采用 Zlib 许可。
- **资产／数据：** 不是媒体资产合集；映射是按 Zlib 授权贡献的数据。
- **AI 用途：** 将固定版本的 gamecontrollerdb.txt 用作确定性的输入夹具。映射条目是社区贡献的数据，不保证同一设备在不同平台或 SDL 版本中表现完全一致。
- **实际限制：** 社区映射可能在不同提交间被修正或移除，README 要求贡献者不要提交 AI 生成的内容。数据库适用于 SDL 2.0.10 及更高版本；本次审查未在本地运行控制器或 SDL 构建。

**建议测试任务**

- 在两个 SDL 版本中加载同一份固定版本的 gamecontrollerdb.txt，比较同一 GUID 的按键与轴索引。
- 分别在加载和不加载数据库时回放固定输入序列，记录哪些设备回退为通用映射。

**开始使用**

1. 固定提交或发布版本，将确切的 gamecontrollerdb.txt 与测试项目一并保存。
2. 通过 SDL_GameControllerAddMappingsFromFile（SDL2）或 SDL_AddGamepadMappingsFromFile（SDL3）加载文件，并记录检测到的控制器 GUID 和平台。

**主要依据**

- [包含 SDL2 与 SDL3 加载调用的 README](https://github.com/mdqinc/SDL_GameControllerDB#readme)
- [包含 GUID 映射的数据库文件](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt)
- [Zlib 许可文本](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/LICENSE)

## 记录可复现的测试

每次实际运行都应保留项目提交或发布版本、引擎／运行时和依赖版本、资产版本与许可、启动命令、观察／动作接口、重置机制、随机种子、任务成功条件以及结果。比较代理时，应将视觉观察与特权状态分开。动作管线还应记录骨架层级、初始姿态、单位、坐标轴、帧率与根运动约定。这些字段是建议的运行记录规范；本来源目录并不表示已经取得运行结果。
