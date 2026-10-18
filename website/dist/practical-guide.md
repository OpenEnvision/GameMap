# 从资源地图到可运行游戏

本页是 **GameMap 编辑建议**：将研究、工具和引擎资料组织成可执行工作流，不是对任何 Agent 的成功率承诺。资料检查截至 **2026-10-18**；该日期表示阅读来源，不代表安装、训练或完整复现了每个项目。目前没有安排自动抓取或定期更新。

## 先定义交付物，再选工具

先写清目标平台、玩家动作、核心循环、胜负条件、美术方向、运行设备和交付格式。区分“可以发布的游戏工程”“动作可控的视频体验”“可导入的场景资产”和“用于规划或训练的模拟器”，它们需要不同的世界表示与验收方法。

以下选型条件为 GameMap 编辑建议，不构成性能或成本排名。已有团队经验、可运行模板和目标平台通常比演示画面更能决定第一版能否交付。

| 工具 | 官方定位与能力边界 | 适合开始的任务 |
| --- | --- | --- |
| Phaser | 浏览器 2D 游戏框架，使用 JS/TS；不内置 3D 渲染或 3D 物理。[官方介绍](https://docs.phaser.io/phaser/getting-started/what-is-phaser) | 网页 2D 原型、精灵与 tilemap 游戏 |
| Godot | 场景/节点组合、独立 2D 管线与 3D 导入工作流。[功能](https://godotengine.org/features/) | 需要编辑器、场景组合及可检查工程的 2D/3D 项目 |
| Unity | 提供 2D/3D 编辑与运行时生态。[官方介绍](https://unity.com/products/unity-engine) | 已有 C#、组件和资源管线的团队 |
| Unreal Engine | 提供 Editor、Blueprint、关卡和打包工具。[官方基础文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/understanding-the-basics-of-unreal-engine) | 已有 UE 模板与内容管线、需要深入关卡编辑的 3D 项目 |
| Three.js | 是 3D 库；碰撞、物理、输入、寻路需另外组织。[官方游戏教程](https://threejs.org/manual/pages/game.html) | 以网页交互、定制渲染和代码组合为核心的 3D 原型 |
| Blender | 建模、绑定、动画、渲染及游戏资产创作工具。[官方功能](https://www.blender.org/features/) | 作为上述运行时的资产制作与清理环节 |

## 2D：让核心循环先于完整美术成立

1. **规划**：用一页规格定义输入、状态、反馈与结束条件；列出一个最小关卡和可复现的动作序列。
2. **代码**：用占位图跑通“开始 → 操作 → 成功/失败 → 重试”，拆开游戏状态、输入和画面更新。由 Agent 先实现一个可验证机制，再扩展关卡。
3. **资产**：锁定画布、帧尺寸、动作名、帧率、朝向与脚底锚点；保留原图、处理脚本及导入配置。不要只交一张看起来正确的精灵图。
4. **场景**：配置碰撞层、tile 尺寸、相机边界、UI 安全区、音量和输入提示；验证缩放、暂停、切出窗口和重新开始。
5. **测试与发布**：按下表分层取证，最后用目标平台的实际构建包重走完整循环，附启动方式、操作说明和已知问题。

## 3D：先完成灰盒，再建立资产闭环

1. **规划**：固定相机、角色控制、尺度、关卡可达区域与目标设备预算。
2. **代码与灰盒**：用方块/胶囊完成移动、碰撞、交互、目标和重试；检查坡道、台阶、边缘与高速移动。
3. **资产**：从生成或素材获取进入清理、UV/材质、绑定、动画、碰撞与 LOD；为每项资产记录源文件、导出文件和导入预设。
4. **场景**：验证出生点、相机遮挡、导航、灯光、遮挡剔除和资源加载；再替换灰盒，避免画面变化同时改动玩法判断。
5. **测试与发布**：在目标机器上采集帧时间和加载数据；验证重新导入资产及从干净环境构建，确保编辑器中的演示能转化为可分发结果。

这些步骤是 GameMap 的工程建议；不要求一个 Agent 同时承担所有角色。编码 Agent、资产工具和试玩 Agent 应共享文件与任务契约。

## 给 Agent 的任务契约

每个任务写出 **输入、输出、可运行验收**。例如：“输入为已锁定版本的项目、玩家碰撞体、测试关卡与操作表；输出为双跳机制、参数说明和运行日志；验收为落地恢复两次跳跃次数，空中第三次按键不产生跳跃，死亡后重试状态重置。”同时说明允许修改的文件、依赖版本、运行命令和需要保留的接口。

资产任务也应如此：“输出 8 帧跑步动画、透明 PNG、相同帧尺寸、同一脚底锚点与 atlas 元数据；验收为引擎内循环无明显位移抖动、边缘无黑白晕圈。”截图用于展示，工程文件与动作记录用于重现。验收失败时保存输入、日志和最小失败场景，让 Agent 修复具体问题。

## 导入时最容易丢失的信息

- **Sprite**：切片边界、pivot、像素/单位比例、透明通道、过滤与压缩要一起检查；缩小和放大预览，确认相邻帧锚点一致。Unity 的导入设置分别控制 pivot、Pixels Per Unit 和 alpha，不能用“PNG 有透明背景”替代导入验证。[Sprite 设置](https://docs.unity.com/en-us/engine/6000.0/manual/materials-and-shaders/textures/textures-reference/texture-type-sprite)
- **网格尺度与轴向**：用已知尺寸的参照物核对实际大小，记录前向、上轴、左右手系和变换。Godot 使用右手 Y-up，UE 使用左手 Z-up；不能直接复制数值假定方向相同。[Godot 导出约定](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/model_export_considerations.html)、[UE 坐标](https://dev.epicgames.com/documentation/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)
- **拓扑与碰撞**：检查法线、三角化、UV 和材质槽；渲染网格与碰撞网格分别验收。Godot 建议动态物体优先使用基础形状，凹三角网格碰撞用于静态物体；复杂外形不意味着必须使用同等复杂的碰撞体。[碰撞文档](https://docs.godotengine.org/en/stable/tutorials/physics/collision_shapes_3d.html)
- **骨骼与动画**：检查 rest pose、骨骼命名、权重、动作切片、循环接缝和 root motion。明确移动由控制器还是动画驱动，避免重复位移；Unity 的 root transform 会在运行时应用到 GameObject。[Root Motion](https://docs.unity.com/en-us/engine/6000.3/manual/animation-section/animation-mecanim/avatar-creationand-setup/root-motion)
- **LOD 与重导入**：检查切换距离、轮廓、材质引用和动画是否保留，保留导入配置。Godot 的高级导入可单独设置网格 LOD、物理与动画资源；重新导入也可能影响材质关联。[高级导入](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/advanced_import_settings.html)

## 测试不是一个“通过”按钮

| 层次 | 需要的证据 | 仍不能证明什么 |
| --- | --- | --- |
| 构建 | 编译、依赖、资源路径及打包成功 | 玩法正确、内容可达 |
| 功能 | 状态、碰撞、胜负、存档和重试的可复现步骤 | 视觉清晰、操作手感好 |
| 视觉 | 固定视口/相机截图，检查遮挡、字体、锚点、材质 | 游戏可完成、有趣 |
| 可玩性 | 人或 Agent 实际玩到目标，记录卡点、失败与完成路线 | 未测设备的性能 |
| 运行性能 | 指定设备、分辨率与场景下的帧时间、加载、内存 | 所有设备都达标 |

以上是 GameMap 编辑建议。预算由项目设定，报告平均值与卡顿分布，避免只展示最好的一帧。网页 3D 还需区分 CSS 尺寸与绘图缓冲区分辨率；盲目提高像素比会增加渲染负担。[Three.js 响应式渲染](https://threejs.org/manual/pages/responsive.html)

## 世界模型应放在哪一层

**代码世界**用可执行程序维护状态与转移，适合规则验证和规划；WorldCoder、GIF-MCTS/CWMB 是基础入口。[WorldCoder](https://arxiv.org/abs/2402.12275)、[GIF-MCTS](https://arxiv.org/abs/2405.15383)

**混合渲染**让引擎执行规则，再将结构交给视频模型。SolarRenderer 接收结构视频、可选首帧和提示词；StreamRender-H3 由 three.js 引擎维护赛车状态。评估控制遵循、身份一致性和按键到画面的延迟，不能把少步采样等同于任意 GPU 上实时运行。[SolarRenderer](https://enderfga.cn/SolarRenderer/)、[StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)

**神经模拟**如 GameNGen、Oasis 根据动作与视觉历史预测画面；**显式 3D 场景**如 WonderWorld、Marble 生成空间表示或可导出资产。前者要检查长期状态，后者仍需玩法系统；两者都不能仅凭画面质量判定“完成游戏开发”。[GameNGen](https://arxiv.org/abs/2408.14837)、[Oasis 限制](https://oasis-model.github.io/)、[Marble 导出](https://www.worldlabs.ai/blog/marble-world-model)

复现时记录代码提交、基础模型、权重、数据版本、输入、seed、精度、GPU 数量/型号/显存和测量范围。StreamRender-H3 的官方部署数字基于 8 张 GB200；CWM / World Brain 的公开材料仅覆盖推理、LoRA 与 proxy 示例，完整 proxy 生成基础不可再分发。比较吞吐、首帧和交互延迟时必须保留这些条件。[StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)、[CWM 复现范围](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)

更细的论文路线、发布状态与名词区别见 [世界模型笔记](/world-model-notes.md)。
