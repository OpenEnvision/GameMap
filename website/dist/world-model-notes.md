# Coding World Model：分类、选型与核验记录

核验日期：2026-10-18。当前收录为精选研究入口，不代表穷尽该领域。论文年份使用首次预印本年份；会议年份单列在标签或说明中。项目、代码、权重、数据的“存在”与“完整可复现”分开判断。

## 用户例子的名称解析

- `solarrender` 高概率指 **SolarRenderer: Few-Step Generative Reference Rendering**。已经核验作者[项目页](https://enderfga.cn/SolarRenderer/)、[仓库](https://github.com/Enderfga/SolarRenderer)、[权重](https://huggingface.co/Enderfga/SolarRenderer)及[数据](https://huggingface.co/datasets/Enderfga/SolarRenderer-Data)。作者提供独立论文 PDF，当前浏览器未成功提取 PDF 全文；描述依据官方项目与仓库，不虚构 arXiv 编号。
- `steamingrender-h3` 高概率指 NVIDIA **StreamRender-H3**。官方标题为 [Interactive Coding Worlds with Real-time Streaming Diffusion Render](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)。它是 Sol-Engine 的研究系统与技术博客，不应伪装成已核验的独立 arXiv 论文。
- 两者都将引擎/程序提供的结构信号交给生成式视频渲染器。SolarRenderer 的四步生成与块因果流式接口、StreamRender-H3 的两步流式部署有相近接口思路，但训练目标、控制表示、硬件与吞吐数据不同，不能直接做无条件的速度排名。

## 必须分开的四条路线

| 路线 | 世界的权威表示 | 动作如何生效 | 对游戏开发的价值 | 需要验证的边界 |
| --- | --- | --- | --- | --- |
| 代码世界 / `code-world-model` | 可执行状态、规则、转移与奖励函数 | 执行程序更新状态 | 可调试玩法、规则发现、搜索、反事实测试 | 生成代码是否真的覆盖规则；观测误差和隐藏状态 |
| 混合渲染 / `hybrid-renderer` | 引擎或程序维护状态；视频模型维护视觉上下文 | 玩家输入先由引擎处理，再转成结构条件 | 灰盒直接呈现高质量外观、快速风格试验 | 控制偏差、身份保持、端到端延迟、显存、训练数据 |
| 神经模拟 / `neural-simulator`、`interactive-video` | 像素、视频 token 或 latent 历史 | 神经网络根据动作与历史预测下一观察 | 可交互想象、训练环境、体验探索 | 规则可重复性、计数、库存、碰撞、长时序漂移 |
| 显式 3D 场景 / `scene-generation` | splat、surfel、网格等空间资产 | 相机或场景编辑；玩法另行实现 | 场景资产、关卡概念、空间探索、导出引擎 | 网格质量、可行走性、碰撞、动画和动态交互 |

这里的 Coding World Model 主要指“用代码表示外部世界”。Meta FAIR 的 [CWM: An Open-Weights LLM for Research on Code Generation with World Models](https://arxiv.org/abs/2510.02387) 则主要学习代码与命令对 Python/容器环境状态的影响，是执行感知代码模型。两种含义相关，但不应归为同一游戏世界生成架构。另一个易混淆例子是 [Code2World](https://arxiv.org/abs/2602.09856)：它生成可渲染代码预测下一 GUI 状态，属于 GUI 世界模型，当前没有作为游戏世界论文收录。

## 推荐的阅读顺序

1. **规则与规划基础**：WorldCoder → GIF-MCTS / CWMB → Code World Models for General Game Playing。先理解程序作为世界模型时，为什么要验证转移、合法动作、终止与奖励。
2. **模块化与不确定性**：FactorSim → PoE-World。前者讨论从描述生成完整模拟器时的因子化，后者讨论用小程序专家组合随机动力学。
3. **持久视觉世界**：Code World Model: Coding Agent as World Brain → Programmable World Model → CoDeR。比较谁维护状态、如何处理屏幕外事件、如何把状态编译成渲染条件。
4. **可部署的混合渲染接口**：Magpie → SolarRenderer → StreamRender-H3。逐项记录输入结构、首帧/提示词、chunk、历史缓存、硬件和交互延迟。
5. **对照组**：Genie、GameNGen、DIAMOND、GameFactory、Oasis、Genie 3。它们帮助理解视觉动力学与动作控制，但不自动等于可编辑的代码世界。
6. **可导出空间资产**：WonderWorld、Marble。评估它们进入 Blender/Three.js/Unity/UE 等管线所需的网格、碰撞与交互补充工作。

## 研究结果和发布物的细粒度区别

- **CWM / World Brain**：官方[环境说明](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)明确写出，公开的是 MiniMax-H3 Ref2VA 推理组件、LoRA 与 proxy 示例。用于产生 proxy 的游戏代码基础不可再分发，因此不能写成“完整 Agent 世界引擎开源”。
- **Programmable World Model**：[仓库](https://github.com/AlayaLab/pwm)当前主要是 README 与资产及发布路线图；列表把它标成论文，而没有标成已经完整开源的框架。
- **CoDeR**：[摘要](https://arxiv.org/abs/2609.26458)使用“Code and model weights will be made publicly available”。这只能说明发布计划。
- **SolarRenderer**：代码 Apache 2.0 与模型权重的许可证不同，使用者应查看对应[模型卡](https://huggingface.co/Enderfga/SolarRenderer)。官方提供控制/四步与对应因果版本 LoRA，包含 caption skill；可由 Agent 准备结构描述、首帧与提示词。[使用指南](https://github.com/Junchao-cs/SolarWM/blob/main/docs/solar_renderer.md)记录独立环境和 GPU 要求。
- **SolarWM**：[官方仓库](https://github.com/Junchao-cs/SolarWM)区分已实现和即将提供的骨干训练阶段；数据注释、latent 数据、原始视频访问也不是同一个下载包。不能把“统一支持骨干”写成“所有骨干所有阶段均已公开”。
- **Oasis**：[官方项目](https://oasis-model.github.io/)公开 500M 推理代码和权重，也主动说明库存精确控制、物体一致性、长时序记忆与泛化的限制。
- **Marble**：[官方介绍](https://www.worldlabs.ai/blog/marble-world-model)支持 splat、视觉网格与碰撞网格导出。这意味着可取得空间资产，不意味着完整游戏规则或任务系统已经生成。

## Planning Map 应该展示的关键问题

先选择要构建的输出：**可发布的游戏工程 / 可探索的神经视频体验 / 可复用的世界资产 / 用于训练与规划的模拟器**。随后再选择世界表示和 Agent 工作流。

- 世界状态：实体身份、坐标、血量、库存、冷却、任务标记、事件日志是否可查询、存档与回放？
- 规则正确性：合法动作、碰撞、不可逆事件、胜负条件是否由可执行代码决定？
- 画面控制：结构是否包括语义、深度、实例 ID、相机、姿态？生成结果是否遵守这些结构？
- 长时序：离开再返回、遮挡后重现、多角色交叉、物品消耗与任务完成是否保持？
- 交互性能：FPS、单 chunk 生成时间、首帧时间、按键到显示延迟、并发和显存分别测量；报告完整硬件条件。
- 可编辑性：修改规则是否需要重新训练，修改外观是否只需首帧或提示词，资产是否能导出回常规引擎？
- 评测：视觉美观不能替代状态准确率。可从 CWMB 的动力学和规划评测、CombatStateBench 的实体与状态检查，以及 SolarRenderer 的结构保持评测建立不同测试层。

## 当前 20 条条目的分类

| 子类 | 数量 | 条目 |
| --- | ---: | --- |
| 代码状态与程序归纳 | 8 | CWM / World Brain、Programmable World Model、CoDeR、WorldCoder、GIF-MCTS、General Game Playing、PoE-World、FactorSim |
| 独立混合渲染系统 | 3 | SolarRenderer、StreamRender-H3、Magpie |
| 交互视频与神经模拟 | 7 | SolarWM、Genie、Genie 3、GameNGen、DIAMOND、GameFactory、Oasis |
| 显式 3D 场景生成 | 2 | WonderWorld、Marble |

这些分类按主要研究贡献统计；同一条目可有跨类标签。例如 CWM / World Brain 既是代码世界，也使用混合渲染。
