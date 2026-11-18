# 从资源地图到可运行的游戏

从一个小型可玩循环开始。选择目标平台，为智能体设定具体任务，并在扩展项目之前，在运行中的游戏里检查结果。

## 先定义交付物，再选择工具

明确目标平台、玩家操作、核心循环、胜负条件、美术方向、目标硬件和交付格式。可发布的游戏项目、由操作控制的视频体验、可导入的场景资产，以及用于规划或训练的模拟器，需要不同的世界表示和验收方法。

围绕团队经验、可用模板和目标平台作出选择。从一个你已经能运行的项目开始。

| 工具            | 官方适用范围与边界                                                                                                                             | 合适的起始任务                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Phaser        | 面向浏览器 2D 游戏的 JS/TS 框架，不内置 3D 渲染或 3D 物理。[简介](https://docs.phaser.io/phaser/getting-started/what-is-phaser)                             | 浏览器 2D 原型、精灵游戏和瓦片地图           |
| Godot         | 场景/节点组合、专用 2D 管线和 3D 导入工作流。[功能](https://godotengine.org/features/)                                                                    | 需要编辑器、场景组合和可检查项目的 2D/3D 项目    |
| Unity         | 用于 2D/3D 编辑与运行时开发的生态系统。[简介](https://unity.com/products/unity-engine)                                                                  | 已有 C#、组件和资产工作流的团队             |
| Unreal Engine | 编辑器、Blueprint、关卡设计和打包工具。[核心文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/understanding-the-basics-of-unreal-engine) | 已有 UE 模板和内容管线、需要大量关卡编辑的 3D 项目 |
| Three.js      | 3D 库；碰撞、物理、输入和寻路需要额外集成。[游戏教程](https://threejs.org/manual/pages/game.html)                                                             | 以浏览器交互、自定义渲染和代码组合为核心的 3D 原型   |
| Blender       | 建模、绑定、动画、渲染和游戏资产制作。[功能](https://www.blender.org/features/)                                                                            | 为上述运行时制作和清理资产                 |

## 2D：先建立核心循环，再完善美术

1. **规划：** 编写一页规格，说明输入、状态、反馈和结束条件。定义一个最小关卡和一套可复现的操作序列。
2. **编码：** 使用占位资源打通从开始、游玩、成功或失败到重试的完整循环。分离游戏状态、输入和视觉更新。让智能体先实现一个可验证的机制，再扩展关卡。
3. **资产：** 固定画布、帧尺寸、动作名称、帧率、方向和脚部锚点。保留源图像、处理脚本和导入配置。一张外观正确的精灵图集只是交付物的一部分。[精灵交付契约](asset-validation-contracts.md#sprite-atlas-metadata-and-playback-delivery)说明了裁剪偏移、重复帧/空帧停留、枢轴以及显式时基转换。
4. **场景：** 配置碰撞层、瓦片尺寸、相机边界、UI 安全区、音量和输入提示。检查缩放、暂停、切出窗口和重新开始。对于制作好的瓦片地图，在测试碰撞和通行之前，先保留[瓦片标识、变换和已保存坐标](asset-validation-contracts.md#tile-map-identity-geometry-and-runtime-delivery)。
5. **测试与发布：** 按下文的层次收集证据。最后，在实际目标平台构建中运行完整循环，并附上启动说明、操作方式和已知问题。

## 3D：先完成白盒，再建立资产管线

1. **规划：** 确定相机、角色控制、比例、关卡可达区域和目标设备预算。
2. **编码与白盒：** 使用方块和胶囊体完成移动、碰撞、交互、目标和重试。检查斜坡、台阶、边缘和高速移动。
3. **资产：** 让生成或获取的资产经过清理、UV/材质处理、绑定、动画、碰撞和 LOD 流程。为每项资产记录源文件、导出文件和导入预设。
4. **场景：** 检查出生点、相机遮挡、导航、光照、遮挡剔除和资产加载。完成这些检查后再替换白盒，避免视觉变化同时改变玩法决策。
5. **测试与发布：** 在目标硬件上收集帧耗时和加载测量数据。检查资产重新导入和干净环境构建，确认编辑器演示可以转化为可分发的成果。

为编码智能体、资产工具和试玩智能体提供共享文件和任务契约，让各方都能处理项目中的特定部分。

## 为智能体编写任务契约

每项任务都应定义 **输入、输出和可运行的验收标准** 。例如：“输入是版本锁定的项目、玩家碰撞体、测试关卡和操作表。输出是二段跳机制、参数文档和运行时日志。验收：落地后恢复两次跳跃；在空中第三次按键不会起跳；死亡后重试会重置状态。”还应明确允许修改的文件、依赖版本、运行命令以及必须保留的接口。

资产任务也需要同样清晰：“以透明 PNG 交付八帧跑步动画，所有帧尺寸相同，使用一个脚部锚点，并附图集元数据。验收：在引擎中循环播放时无可见的位置抖动，边缘无黑色或白色光晕。”截图展示结果；项目文件和操作记录支持复现。验收失败时，保留输入、日志和最小失败场景，让智能体能够修复一个具体问题。

## 导入时经常丢失的信息

- **精灵：** 一并检查切片边界、枢轴、像素到单位的比例、alpha、过滤和压缩。在更小和更大的缩放比例下预览，并确认相邻帧的锚点一致。Unity 的导入设置分别控制枢轴、Pixels Per Unit 和 alpha；透明 PNG 并不意味着导入正确。[精灵设置](https://docs.unity.com/en-us/engine/6000.0/manual/materials-and-shaders/textures/textures-reference/texture-type-sprite)
- **网格比例与坐标轴：** 使用尺寸已知的参考物体，并记录前向、向上轴、坐标系手性和变换。Godot 使用右手 Y 轴向上坐标系；UE 使用左手 Z 轴向上坐标系。直接复制数值不会自动保留方向。[Godot 导出约定](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/model_export_considerations.html)、[UE 坐标](https://dev.epicgames.com/documentation/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)
- **拓扑与碰撞：** 检查法线、三角化、UV 和材质槽。分别验证渲染网格和碰撞网格。Godot 建议动态物体使用基本形状，静态物体使用凹三角网格。复杂的可见几何体不一定需要同样复杂的碰撞体。[碰撞文档](https://docs.godotengine.org/en/stable/tutorials/physics/collision_shapes_3d.html)
- **骨骼绑定与动画：** 检查静止姿势、骨骼名称、权重、片段边界、循环接缝和根运动。明确由控制器还是动画驱动移动，以免重复施加位移。Unity 会在运行时将根变换应用到 GameObject。[根运动](https://docs.unity.com/en-us/engine/6000.3/manual/animation-section/animation-mecanim/avatar-creationand-setup/root-motion)
- **LOD 与重新导入：** 检查切换距离、轮廓、材质引用和保留的动画，并保留导入配置。Godot 的高级导入设置分别控制网格 LOD、物理和动画资源。重新导入还可能影响材质关联。[高级导入](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/advanced_import_settings.html)

## 测试需要多种证据

| 层次    | 所需证据                       | 仍无法证明的内容      |
| ----- | -------------------------- | ------------- |
| 构建    | 编译成功、依赖正确、资源路径正确、打包成功      | 玩法正确或内容可达     |
| 功能    | 对状态、碰撞、胜负、存档和重试进行可复现检查     | 视觉清晰或操作令人满意   |
| 视觉    | 固定视口/相机下的截图，并检查遮挡、排版、锚点和材质 | 能够通关或具有乐趣     |
| 可玩性   | 人类或智能体达成目标，并记录阻碍、失败和完成路线   | 在未经测试的设备上的性能  |
| 运行时性能 | 指定设备、分辨率和场景下的帧耗时、加载和内存数据   | 在所有设备上都满足性能要求 |

按项目设定预算，报告平均值和卡顿分布，避免只展示最好的一帧。浏览器 3D 还需要区分 CSS 尺寸和绘图缓冲区分辨率：在没有预算约束的情况下提高像素比会增加渲染负载。[Three.js 响应式渲染](https://threejs.org/manual/pages/responsive.html)

## 世界模型的适用位置

**代码世界** 使用可执行程序维护状态和转移，支持规则验证和规划。WorldCoder 和 GIF-MCTS/CWMB 是基础参考。[WorldCoder](https://arxiv.org/abs/2402.12275)、[GIF-MCTS](https://arxiv.org/abs/2405.15383)

**混合渲染** 让引擎执行规则，并将结构传递给视频模型。SolarRenderer 接收结构视频、可选的首帧和提示词。StreamRender-H3 使用 three.js 引擎维护赛车状态。应评估控制遵循程度、身份一致性和输入到显示的延迟。仅凭少步采样，无法证明在任意 GPU 上都能实现实时性能。[SolarRenderer](https://enderfga.cn/SolarRenderer/)、[StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)

**神经模拟** （包括 GameNGen 和 Oasis）根据操作和视觉历史预测帧。 **显式 3D 场景系统** （包括 WonderWorld 和 Marble）生成空间表示或可导出的资产。前者需要长期状态检查；后者仍需要玩法系统。仅凭图像质量不能证明已完成游戏开发。[GameNGen](https://arxiv.org/abs/2408.14837)、[Oasis 的局限](https://oasis-model.github.io/)、[Marble 导出](https://www.worldlabs.ai/blog/marble-world-model)

为便于复现，应记录代码提交、基础模型、权重、数据集版本、输入、种子、精度、GPU 数量/型号/显存以及测量范围。StreamRender-H3 官方部署数据使用八张 GB200 GPU。CWM / World Brain 的公开材料仅涵盖推理、LoRA 和代理示例；完整的底层代理生成代码无法再分发。在比较吞吐量、首帧时间和交互延迟时，应保留这些条件。[StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)、[CWM 复现范围](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)

详细阅读路线、发布状态和术语见[世界模型研究笔记](world-model-notes.md)。

## 生产研究详解

有关受来源范围约束的完成、失败、恢复、许可和评估限制，见[生产研究档案](research-index.md)。这些笔记区分了已记录的接口、拟议的验收夹具和实际复现。
