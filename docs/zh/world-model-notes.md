# 代码世界模型：分类、选型与研究笔记

根据可执行世界模型、动作条件视频和引擎驱动渲染所表示的状态与产生的输出，对它们进行比较。使用下方发布说明查找各方法的代码、权重和数据。

## 名称澄清

- `solarrender` 最可能指  **SolarRenderer: Few-Step Generative Reference Rendering** 。本次审阅了作者的[项目页](https://enderfga.cn/SolarRenderer/)、[仓库](https://github.com/Enderfga/SolarRenderer)、[权重](https://huggingface.co/Enderfga/SolarRenderer)和[数据](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data)。作者提供了独立的论文 PDF，但浏览器无法提取其全文。因此，描述依据官方项目和仓库；不假定其有 arXiv 标识符。
- `steamingrender-h3` 最可能指 NVIDIA 的  **StreamRender-H3** ，其正式标题为[基于实时流式扩散渲染的交互式代码世界](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)。它是 Sol-Engine 研究系统和技术博客，而非经核实的独立 arXiv 论文。
- 两者都将引擎或程序产生的结构传递给生成式视频渲染器。SolarRenderer 的四步生成与块因果流式接口，在接口思路上与 StreamRender-H3 的两步流式部署有所共通。训练目标、控制表示、硬件和吞吐量不同，因此无条件的速度排名会产生误导。

## 四种不同方法

| 方法                                            | 权威世界表示                | 操作如何生效              | 对游戏开发的价值              | 需要验证的边界                     |
| --------------------------------------------- | --------------------- | ------------------- | --------------------- | --------------------------- |
| 代码世界 / `code-world-model`                     | 可执行的状态、规则、转移和奖励函数     | 程序执行更新状态            | 可调试的玩法、规则发现、搜索和反事实测试  | 生成的代码是否覆盖规则；观测误差和隐藏状态       |
| 混合渲染 / `hybrid-renderer`                      | 引擎或程序维护状态；视频模型维护视觉上下文 | 引擎处理玩家输入，并将其转换为结构条件 | 从白盒获得高质量视觉效果，以及快速探索风格 | 控制偏差、身份保持、端到端延迟、GPU 显存和训练数据 |
| 神经模拟 / `neural-simulator`、`interactive-video` | 像素、视频 token 或潜变量的历史   | 神经网络根据操作和历史预测下一次观测  | 交互式想象、训练环境和体验探索       | 可重复的规则、计数、物品栏、碰撞和长期漂移       |
| 显式 3D 场景 / `scene-generation`                 | 高斯泼溅、面元和网格等空间资产       | 相机移动或场景编辑；玩法另行实现    | 场景资产、关卡概念、空间探索和引擎导出   | 网格质量、可行走性、碰撞、动画和动态交互        |

这里的 Coding World Model 主要指用代码表示外部世界。而 Meta FAIR 的 [CWM：用于世界模型代码生成研究的开放权重 LLM](https://arxiv.org/abs/2510.02387)学习的是代码和命令如何影响 Python 或容器环境状态。它是一个具备执行感知能力的编码模型。两种含义相关，但不应归为同一种游戏世界生成架构。另一个容易混淆的例子是 [Code2World](https://arxiv.org/abs/2602.09856)，它生成可渲染代码来预测下一个 GUI 状态。它是 GUI 世界模型，不作为游戏世界论文收录于此。

## 建议阅读顺序

1. **规则与规划：** WorldCoder → GIF-MCTS / CWMB → Code World Models for General Game Playing。从程序化世界模型为什么需要检查转移、合法操作、终止和奖励入手。
2. **模块化与不确定性：** FactorSim → PoE-World。前者研究从描述生成完整模拟器时的因子化；后者组合小型程序化专家来建模随机动力学。
3. **持久视觉世界：** Code World Model: Coding Agent as World Brain → Programmable World Model → CoDeR。比较由谁维护状态、如何处理相机视野之外的事件，以及状态如何成为渲染控制。
4. **可部署的混合渲染接口：** Magpie → SolarRenderer → StreamRender-H3。记录输入结构、首帧和提示词要求、分块、历史缓存、硬件和交互延迟。
5. **对照：** Genie、GameNGen、DIAMOND、GameFactory、Oasis 和 Genie 3。它们有助于解释视觉动力学和动作控制，但不会自动提供可编辑的代码世界。
6. **可导出的空间资产：** WonderWorld 和 Marble。评估接入 Blender、Three.js、Unity、UE 等工具管线所需的网格、碰撞和交互工作。对于基于高斯泼溅的交付，应检查[固定来源版本的编辑/导出/导入边界](asset-validation-contracts.md#gaussian-splat-editing-and-delivery)：保留的项目状态、烘焙变换、实际格式版本以及独立的碰撞验收。

## 研究结果与已发布产物

本轮检查了第一手来源文本、产物清单、接口文档和部分许可条款。未运行任何模型或引擎。仅检查摘要的情况和个别获取失败记录在[覆盖台账](catalog-review-coverage.md)中；这些不等于全文审阅或复现。

- **CWM / World Brain：** 官方[环境说明](https://github.com/buaacyw/code-world-model/blob/17fa82ba2fb8168aa0d30fc51a1d1d0ebbc9180b/ENVIRONMENT.md)明确列出，公开内容为 MiniMax-H3 Ref2VA 推理组件、LoRA 和代理示例。创建代理的底层游戏代码不能再分发。不应将它描述为完全开源的智能体世界引擎。
- **Programmable World Model：** [已检查的仓库路线图](https://github.com/AlayaLab/PWM/blob/0286dc7a193a99f84c29f8d25fc67976311d0833/README.md#L29-L34)中，推理代码和预训练权重仍未勾选；其快照目录树包含 README 和预告资产。目录将其标记为论文，而非已完整发布的框架。
- **CoDeR：** [论文 v1 摘要](https://arxiv.org/abs/2609.26458v1)表示将公开代码和模型权重。这证明的是发布计划，而非已经完成发布。
- **SolarRenderer：** [a2371eae 版本的代码](https://github.com/Enderfga/SolarRenderer/tree/a2371eaecff9a8ab378b5ec36199c5863d138074)采用 Apache-2.0，但 [LoRA 权重](https://huggingface.co/Enderfga/SolarRenderer/blob/main/LICENSE)采用 MiniMax H3 Community License，其适用地域不包括欧盟、英国、韩国和美国。[数据集](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data)混合了多种许可：UnrealZoo 片段采用 CC BY-NC 4.0，留出的引擎录制内容仅限研究使用。复用前应阅读各组件条款。控制/四步 LoRA 包含因果变体；[使用指南](https://github.com/Junchao-cs/SolarWM/blob/552cea30c8b1406c1f2c36c37dc233588d623306/docs/solar_renderer.md)规定了独立环境和 GPU 要求。
- **SolarWM：** [552cea30 版本的阶段矩阵](https://github.com/Junchao-cs/SolarWM/blob/552cea30c8b1406c1f2c36c37dc233588d623306/README.md)列出了 Wan2.2-5B 和 MiniMax-H3 的全部三个阶段；Wan2.2-14B 和 LTX-2.5 的后续阶段尚待推出。不同骨干模型需要独立运行时。主数据仓库包含标注和索引，潜变量载荷位于独立仓库，完整处理后的训练视频语料则需通过重建或经批准的访问获取。统一接口不代表各模型阶段齐备程度相同、附带原始语料，或采用共同许可。[主数据集](https://huggingface.co/datasets/junchaoh-cs/SolarWM-Data)和 [H3 权重仓库](https://huggingface.co/junchaoh-cs/SolarWM-H3-33B)目前要求同意共享联系信息；这些访问门槛与组件许可证是两回事。
- **GameFactory：** [已检查的仓库](https://github.com/KlingAIResearch/GameFactory/tree/0f2a38fede2d42251d6a6269d6c882b23cd0adbe)包含 GF-Minecraft 文档以及检测/可视化工具。论文描述了动作控制模块，但已检查的发布内容不能证明完整训练/推理管线或模型权重已发布。
- **Oasis：** [项目](https://oasis-model.github.io/)区分了其更大型的托管演示与采用 MIT 许可的 [500M 检查点](https://huggingface.co/Etched/oasis-500m)和[推理代码](https://github.com/etched-ai/open-oasis/tree/f59deef2c019c212bd0c5a3a5b986a51f3701847)。[当前权重访问页面](https://huggingface.co/Etched/oasis-500m)要求同意共享联系信息；这一访问门槛与 MIT 许可证是两回事。[固定版本的生成脚本](https://github.com/etched-ai/open-oasis/blob/f59deef2c019c212bd0c5a3a5b986a51f3701847/generate.py#L56-L63)使用初始帧和操作序列；它不能证明完整实时演示界面或训练管线已经发布。
- **Marble：** [官方介绍](https://www.worldlabs.ai/blog/marble-world-model)支持导出高斯泼溅、视觉网格和碰撞网格。这提供了空间资产，但不能证明已生成完整规则或任务系统。[网页应用网格指南](https://docs.worldlabs.ai/marble/export/mesh)将碰撞体导出对应到 Standard，将高质量带纹理 GLB 导出对应到 Pro；[网页应用与 World API 计费](https://docs.worldlabs.ai/marble/support/account-billing)彼此独立。这些文档中的层级并不能证明账户资格、实际导出成功或 API 使用权限。

上述关于 PWM、CoDeR、GameFactory 和 Oasis 的四项发布观察于 2026-10-19 重新检查。仓库固定版本标识的是已检查的来源快照，不是已安装或兼容的发行版。CoDeR 的项目页获取结果无法得出结论，因此表述仍仅限于论文中的发布承诺。GameFactory 公开列出的数据不能证明可以不受限制地复用：已检查的仓库和数据集元数据未明确代码/数据条款，也未检查归档文件内容。网站模板许可证不能套用于这些产物。阅读了持续更新的 Oasis 访问/许可页面，但未接受访问门槛或下载权重。本次定向检查并未刷新本文档中的所有主张。

四张相关世界模型卡片在 2026-10-19 另行接受了定向来源检查。SolarRenderer 和 CWM 予以保留；上文现已明确其已检查的来源修订版本。StreamRender-H3 的[固定版本测量数据](https://github.com/NVlabs/Sana/blob/33bfd79c500aee1ff3cb3e24068fe6728761a0e6/Sol-Engine/StreamRender-H3/assets/streaming_render_latency_v6.json)单独区分了后续的解码器更新；[固定版本硬件说明](https://github.com/NVlabs/Sana/blob/33bfd79c500aee1ff3cb3e24068fe6728761a0e6/Sol-Engine/StreamRender-H3/index.html#L248-L252)标明了八张 GB200 的扩散渲染测量和一张 GB200 的解码器测量。独立阶段的中位数不是新测得的可相加端到端延迟，更不是输入到显示的延迟。其[运行时 README](https://github.com/NVlabs/Sana/blob/0527465fdcbbf27180a76419a4e73643aa1aac73/models/streamrender_h3/README.md)和[权重卡](https://huggingface.co/Efficient-Large-Model/StreamRender-H3)确认了公开产物及各组件专属条款：H3 衍生权重保留 MiniMax 条款，Qwen 使用 Apache-2.0，TAE 使用 MIT；引擎/资产另有声明。不据此推断共同许可证、安装后兼容性、运行时性能或训练/数据完整性。阅读了 SolarWM 所列的访问门槛，但未接受它们。

另一次于 2026-10-19 进行的定向论文检查收窄了两项与生产相关的边界。[FactorSim v2](https://arxiv.org/html/2409.17652v2)评估了八款 2D Pygame 游戏，并在 CLIPort 内生成对象状态/奖励任务代码；3D 游戏生成仍属未来工作。其机器人学场景并不意味着生成了物理引擎。[Magpie v1](https://arxiv.org/html/2608.27168v1)报告了在单张 H100 上以 1280×768 运行的 5B 渲染器：常规 20 帧分块约耗时 620 ms，即预热后计算帧率为 32.2 FPS，不包括首个 17 帧分块。其 24 FPS 交互管线另外估计，从操作到生成反馈约为 1.55 秒。这些由作者报告的条件不代表一般性的延迟分布或已复现的性能；论文明确承认尚未满足生产所需的延迟、保真度和持久性要求。架构与分类保持不变。

2026-10-19 的一次定向产品检查区分了 Genie 3 的 [2025 年 8 月研究公告](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)与[当前 Project Genie 帮助](https://support.google.com/labs/answer/16875695?hl=en)：研究中持续数分钟的持久性不等于原型允许的会话时长。后者记录了 60 秒探索、个人账户登录、年满 18 岁，以及在可用地区具有符合条件的 Google AI Ultra 访问资格等要求。其视频下载不是可编辑关卡导出。上文 Marble 网页应用导出层级与 API 计费分开检查。未测试任何账户、订阅、会话、生成、导出或下载；持续更新的产品要求可能变化。

## 选择世界表示

先选择预期输出： **可发布的游戏项目、可探索的神经视频体验、可复用的世界资产，或用于训练和规划的模拟器** 。然后再选择世界表示和智能体工作流。

- **世界状态：** 能否查询、保存和回放实体标识、坐标、生命值、物品栏、冷却时间、任务标记和事件日志？
- **规则正确性：** 是否由可执行代码决定合法操作、碰撞、不可逆事件和胜负条件？
- **视觉控制：** 结构是否包含语义、深度、实例 ID、相机和姿态？生成帧是否遵循这些控制？
- **长期一致性：** 离开后返回、发生遮挡、多个角色交错经过、物品消耗和任务完成后，状态和身份是否保持？
- **交互性能：** 分别测量 FPS、每个分块的生成时间、首帧时间、输入到显示延迟、并发量和 GPU 显存。报告完整硬件条件。
- **可编辑性：** 改变规则是否需要重新训练？能否只通过首帧或提示词改变外观？资产能否回到传统引擎？
- **评估：** 视觉吸引力不能替代状态准确性。CWMB 的动力学与规划评估、CombatStateBench 的实体与状态检查，以及 SolarRenderer 的结构保持评估，支持不同的测试层次。

## 当前 20 个条目的分类

| 子类别        | 数量 | 条目                                                                                                            |
| ---------- | -: | ------------------------------------------------------------------------------------------------------------- |
| 代码状态与程序归纳  |  8 | CWM / World Brain、Programmable World Model、CoDeR、WorldCoder、GIF-MCTS、General Game Playing、PoE-World、FactorSim |
| 独立混合渲染器    |  3 | SolarRenderer、StreamRender-H3、Magpie                                                                          |
| 交互式视频与神经模拟 |  7 | SolarWM、Genie、Genie 3、GameNGen、DIAMOND、GameFactory、Oasis                                                      |
| 显式 3D 场景生成 |  2 | WonderWorld、Marble                                                                                            |

计数依据各条目的主要研究贡献。标签可以跨类别：例如，CWM / World Brain 是一个同时使用混合渲染的代码世界。
