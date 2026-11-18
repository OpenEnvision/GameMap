# 2D 与 3D 游戏开发中的 AI

探索用于生成游戏规则、构建可玩项目、编辑场景及评估结果的系统。以下各节区分这些系统的输出，以及各工作流使用的引擎反馈。

可玩项目及其源代码请参阅[游戏案例](../cadle-repositories.md)。

## 类别与证据

- **开发代理 / 框架** 接收需求或项目，并生成代码、场景、规则或素材。可玩原型、本地项目改动和完整游戏是不同的成果。
- **技能** 为通用代理提供工作流、参考资料和脚本。它们不是训练得到的模型，也不保证独立执行。
- **MCP / CLI**  将编辑器、运行时和素材工具连接到代理，提供执行与反馈接口。工具的存在并不能证明其输出正确。
- **开发基准** 包括用于项目修改的 GameDevBench 和 GameEngineBench。GameXpert-Bench 增加了创作、修复和迭代改进。GameGen-Verifier 研究生成游戏的功能验证。
- **相关评测** 包括用于 3D 建模的 CADBench。卡牌游戏自博弈可以验证规则，但胜率衡量的是游戏对战能力，不能替代开发质量。
- **世界模型** 预测以动作为条件的视频，其产物不同于显式引擎项目。Kling 的 GameFactory 与 OpenDCAI 的 GameFactory-3A 是不同项目。Video2Game 生成显式重建的环境，属于 3D 重建路线。
- **程序化后端** （如 Infinigen）不使用 LLM 生成几何体。收录 Infinigen 是因为它能为 AI 游戏开发工作流提供可控场景和合成数据。

## 版本与发布状态

| 资源                                                                   | 一手证据                                                                                                                                                                                                                                                                                       | 必须保留的限定条件                                                                                                                                                                             |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GameDevBench](https://github.com/waynchi/gamedevbench)              | [54589a47 版本的 README](https://github.com/waynchi/gamedevbench/blob/54589a477d6c1a15255707a861db6b01126797aa/README.md#L57-L70)：概述与先决条件                                                                                                                                                     | 仓库及[论文 v2，2026-06-30](https://arxiv.org/abs/2602.11103v2) 描述了 333 项任务；[论文 v1，2026-02-11](https://arxiv.org/abs/2602.11103v1) 描述了 132 项。官方验证和排行榜运行要求 Godot 4.4.1。不同版本的数据集大小及排行榜结果不应混用。 |
| [GameEngineBench](https://arxiv.org/html/2607.03525v2)               | 论文 v2 摘要与评估协议                                                                                                                                                                                                                                                                              | 九个真实 UE 项目及 110 项局部 C++ 任务。编译与 Play-in-Editor 监听服务器测试向 LLM 评判器提供证据，其行为正确性判定定义了 pass\@1。论文所链接的 Nitrode-Research 仓库在本次审查期间返回 404；可运行代码的可用性仍未核实，论文是一手入口。                                 |
| [OpenGame](https://github.com/leigest519/OpenGame)                   | [c9bea377 版本的 README](https://github.com/leigest519/OpenGame/blob/c9bea37786af524bf3bbe802f2b67d23816fa5c0/README.md)：Game Skill 与 OpenGame-Bench                                                                                                                                          | 代理框架已公开，其 CLI 支持可配置的 OpenAI 兼容端点。论文描述了 GameCoder-27B；仅凭框架发布不能核实模型权重是否可用。独立评估流水线仍被描述为即将发布。                                                                                             |
| [GameXpert-Bench](https://github.com/Kwen-Chen/GameXpert-Bench)      | [90d41e31 版本的 README](https://github.com/Kwen-Chen/GameXpert-Bench/blob/90d41e31d0c97c13981e65c3ba4a76a3c82add53/README.md)、[快照目录树](https://github.com/Kwen-Chen/GameXpert-Bench/tree/90d41e31d0c97c13981e65c3ba4a76a3c82add53)                                                            | 审查时，该仓库是项目页面脚手架，数据、代码和模型尚在准备发布中。可以引用论文协议；不能假定存在可下载运行的基准。                                                                                                                              |
| [GameGPT](https://arxiv.org/abs/2310.08067)                          | 论文摘要及 [5516598c 版本的目录树](https://github.com/leyiwo/GameGPT/tree/5516598c9865a1d44684aedb0c04e5b6a0e5ad97)                                                                                                                                                                                   | 已检查的仓库快照仅包含 PDF 和 README。此条目描述研究架构，不承诺完整实现。                                                                                                                                           |
| [GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier)     | [2604b6b7 版本的 README](https://github.com/NetX-lab/GameGen-Verifier/blob/2604b6b7330ca93c2e9fcb1036daf8cdf660aade/README.md)、[快照目录树](https://github.com/NetX-lab/GameGen-Verifier/tree/2604b6b7330ca93c2e9fcb1036daf8cdf660aade)                                                            | 执行框架、验证器技能和脚本已公开。生成游戏、缓存、截图和完整运行日志并未全部随代码分发。README 描述的示例/发现路径与已检查的目录树不同；本地配置及可运行完整性仍未核实。                                                                                              |
| [Agent Game Forge](https://github.com/0x0funky/agent-game-forge)     | [96c8e15e 版本的 README](https://github.com/0x0funky/agent-game-forge/blob/96c8e15e450fc6fa4c96c60d1ddef41b0df43276/README.md#L190-L224)：项目状态                                                                                                                                                 | 默认使用 JS + Canvas。README 称现有 Godot 项目仍可加载和编辑，而一等 Godot 支持和 Unity 仍在路线图上。该项目标为正式发布前阶段。                                                                                                  |
| [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge) | [5324342f 版本的 README](https://github.com/0x0funky/agent-sprite-forge/blob/5324342fdfab72430f4e9604f3fe427009f8596d/README.md#L253-L268)、[已知局限](https://github.com/0x0funky/agent-sprite-forge/blob/5324342fdfab72430f4e9604f3fe427009f8596d/docs/known-limitations.md#engines-and-players) | 对于 0.4.0，作者报告了在解析层面的往返测试，但未做 Godot、LDtk 或 Aseprite 编辑器导入检查。Tiled 重新渲染检查使用内置读取器和 pytiled-parser，而非 Tiled GUI。                                                                          |

固定版本的 OpenGame、GameXpert-Bench、GameGPT、GameGen-Verifier、GameDevBench、Agent Game Forge、Agent Sprite Forge 和 Cardiverse 来源已于  **2026-10-19**  重新核查；其可用性声明仅限于这些修订版本，并非对后续发布的承诺。未执行任何框架或评估器。对于 GameGen-Verifier，已跟踪的描述文件位于 `VeriGame/` 下，而 README 指定 `descriptions_example/`；其[流水线指南](https://github.com/NetX-lab/GameGen-Verifier/blob/2604b6b7330ca93c2e9fcb1036daf8cdf660aade/docs/pipeline.md) 指示用户在那里添加输入。[技能指南](https://github.com/NetX-lab/GameGen-Verifier/blob/2604b6b7330ca93c2e9fcb1036daf8cdf660aade/docs/skills.md) 提供了手动重建符号链接的方法，但其声称存在的 `.codex/skills` 和 `.claude-plugin/plugin.json` 路径在已检查的目录树中并不存在。测试前应核对文档中的配置与所选后端；这一源码层面的差异并非已复现的运行时故障。

## 2D：不同阶段的贡献

- [MarioGPT](https://github.com/shyamsn97/mario-gpt)：将语言条件转化为字符网格关卡。`play()` 和 `run_astar()` 启动模拟；已检查的封装程序不返回结构化的可玩性结论。参见[请求约束与评估器边界](#mariogpt-requested-constraints-and-executable-verdicts)。代码标为 MIT；代码许可证并不授予原游戏素材的权利。
- [GAVEL](https://github.com/gdrtodd/gavel)：Ludii 规则代码经过语言模型变异和质量—多样性搜索。[论文](https://arxiv.org/abs/2407.09388) 研究新颖的棋盘游戏规则。它适合策划和规则设计阶段，不能替代实时动作游戏的试玩测试。
- [Cardiverse](https://github.com/danruili/Cardiverse)：机制图、检索及对局记录将设计连接到 Python 原型。仓库标为 MIT。其 [7968de99 版本的可复现性声明](https://github.com/danruili/Cardiverse/blob/7968de994f8e1e82ad269a30816c2599c2eee1b6/README.md#L384-L401) 称论文使用了 Bicycle 游戏描述，而公开描述是在 ChatGPT 辅助下手工编写的；这些替代输入可能改变生成的代理和结果。
- [Text2Game](https://github.com/boltomli/t2g)：长文本提取以及合并后的世界、角色和事件数据导向 Twine HTML 或 Godot 视觉小说。其范围是叙事原型，而非通用游戏生成。
- [PixelLab MCP](https://www.pixellab.ai/mcp)：商业素材服务，为角色朝向、动画和瓦片集提供有文档说明的工具。API/MCP 输出、引擎碰撞、动画事件及导入配置是不同的任务。
- [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge)：一项技能及确定性素材处理链，代码标为 MIT。生成依赖外部图像或视频能力。应记录服务提供方路线、版本、参考图像、帧顺序、锚点及导出检查。

## 3D：执行接口、模型与环境系统

| 资源                                                                                    | 输出或用途                                                                                                                                                              | 一手材料支持的许可证或局限                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A)                           | 多模态素材流水线、技能及引擎原生代码适配器                                                                                                                                              | Apache-2.0。外部模型、引擎和素材保留各自条款。README 演示混用了生成模型、Mixamo 和现有场景。3A 名称不是质量评级。                                                                                                                                                                                                                                                                                                                                          |
| [Unity Agent Plugin](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) | Unity 维护的代理上下文，涵盖 2D、UI、渲染、物理及其他任务；Unity 6.0+                                                                                                                      | 请分别核查[官方来源](https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills)及产品配置。                                                                                                                                                                                                                                                                                                                    |
| [MCP Unity Editor](https://github.com/CoderGamester/mcp-unity)                        | 场景、组件、Prefab、控制台及 Test Runner 操作                                                                                                                                   | README 标为 MIT。由社区维护，与 Unity 官方工具分开。其 FAQ 警告 Play Mode 域重载可能中断桥接连接；应核实实际测试完成情况和配置。                                                                                                                                                                                                                                                                                                                               |
| [MCP for Blender](https://github.com/ahujasid/blender-mcp)                            | Blender Python、对象、材质及多视角视觉反馈                                                                                                                                       | MIT。README 明确其为第三方项目。其软件包名现为 `mcp-for-blender`。                                                                                                                                                                                                                                                                                                                                                                 |
| [Unreal MCP](https://github.com/chongdashu/unreal-mcp)                                | Actor、Blueprint 图及视口操作                                                                                                                                             | README 标为 MIT、UE 5.5+ 及实验性。                                                                                                                                                                                                                                                                                                                                                                                     |
| [Godot 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets)      | 将原生几何体和现有资源转为 PackedScene 素材，再进行碰撞、导航和视觉检查                                                                                                                         | MIT。需要兼容的 Godot MCP 能力；这不是生成模型。                                                                                                                                                                                                                                                                                                                                                                                 |
| [Hunyuan3D-2](https://github.com/Tencent-Hunyuan/Hunyuan3D-2)                         | 从图像到网格再到纹理，支持 GLB/OBJ 和 Blender 插件                                                                                                                                 | 仓库采用专用许可证。开放模型可用不意味着采用 MIT 条款。2.0、2.1 和 2.5 是不同版本。                                                                                                                                                                                                                                                                                                                                                              |
| [TRELLIS](https://github.com/microsoft/TRELLIS)                                       | 图像或文本转为 SLAT，再转为网格、高斯或辐射场；网格可导出为 GLB                                                                                                                               | 模型与大部分代码采用 MIT。README 指出部分渲染及几何子模块采用其他许可证。                                                                                                                                                                                                                                                                                                                                                                      |
| [TripoSR](https://github.com/VAST-AI-Research/TripoSR)                                | 基于单张图像的前馈式 3D 重建                                                                                                                                                   | README 声明代码和预训练模型采用 MIT。导出后仍需检查拓扑、碰撞和性能。                                                                                                                                                                                                                                                                                                                                                                        |
| [Infinigen](https://github.com/princeton-vl/infinigen)                                | 参数化程序规则生成 Blender 场景、几何体、材质及标注                                                                                                                                     | 仓库标为 BSD-3-Clause，部分后续程序化代码派生自 CC0 来源。它不是语言模型。现有的[旧版生成/导出契约](../production/tools.md#infinigen-staged-generation-and-export-acceptance)区分了旧版与 V2 预览接口、代码许可及输出权利。                                                                                                                                                                                                                                           |
| [Holodeck](https://github.com/allenai/Holodeck)                                       | 在 AI2-THOR 中将文本转为布局及素材组合，[362b8ed9 版本的 README](https://github.com/allenai/Holodeck/blob/362b8ed948b867b69a72f1f9491f4caa88419bfc/README.md#L30-L68) 记录了 Unity 加载方法 | 仓库标为 Apache-2.0。主要目标是具身 AI 环境生成。论文于 2023-12-14 首次出现在 arXiv，早于 CVPR 2024 正式发表。[Unity 桥接](https://github.com/allenai/Holodeck/blob/362b8ed948b867b69a72f1f9491f4caa88419bfc/connect_to_unity.py#L23-L51)通过 AI2-THOR 加载场景 JSON，并使用外部素材目录；这并不能证明存在自包含的通用 Unity 导出。应单独跟踪外部素材。                                                                                                                                        |
| [Video2Game](https://github.com/video2game/video2game)                                | 将现实视频转为 three.js / UE 环境中的网格、外观及碰撞                                                                                                                                 | 仓库标为 MIT。[7bcf8ae7 版本的 README](https://github.com/video2game/video2game/blob/7bcf8ae754240b9fd2de75a154eb73c75a146b79/readme.md#L238-L273) 建议为 UE 使用完全漫反射网格（`--baking_specular_dim=0`），并警告 Cannon.js 物理集成工作量很大。其[检查清单](https://github.com/video2game/video2game/blob/7bcf8ae754240b9fd2de75a154eb73c75a146b79/readme.md#L24-L31)中的 Baking Finetune Module 和 GPT-4 Query 未勾选；这不能证明其他位置没有实现，或存在运行时不兼容。重建环境并非完整游戏。 |
| [BlenderLLM](https://github.com/FreedomIntelligence/BlenderLLM)                       | 指令转为 bpy 建模脚本，附有 BlendNet 和 CADBench                                                                                                                               | [f778bfd6 版本的发布 README](https://github.com/FreedomIntelligence/BlenderLLM/blob/f778bfd6992ddd675f7615d0eaf965a8576f2879/README.md#L44-L50) 报告了 12K 个 BlendNet 配对，而[论文 v1 §3.1.3](https://arxiv.org/html/2412.14203v1#S3.SS1.SSS3) 描述了 8K 个。范围仍限于基础建模，多轮交互和高级材质存在局限。请分别核查模型卡及数据集卡，不要假定它们共用同一许可证。                                                                                                                 |

这四个场景制作条目于  **2026-10-19**  接受了针对性源码核查。未执行任何场景生成器、引擎交接或数据集。BlenderLLM 论文的[伦理声明](https://arxiv.org/html/2412.14203v1)称数据集/模型采用 CC-BY 4.0，而已检查的[模型卡](https://huggingface.co/FreedomIntelligence/BlenderLLM/blob/095b8f8cdc606b59afa3128805aea233c1ba77b0/README.md)、[CADBench 卡](https://huggingface.co/datasets/FreedomIntelligence/CADBench/blob/62ab9da214eb305d41229a69c91df75b9d4f543e/README.md)及[滚动更新的 BlendNet 卡](https://huggingface.co/datasets/FreedomIntelligence/BlendNet)标注 Apache-2.0。这里记录了作者文档的差异，并未裁定法律优先级或工件是否符合使用条件。未下载或清点模型权重或数据集行；不会在未说明的情况下，以发布文档中的数量替代论文的研究样本总体。

AutoUE 的[论文 v1 §3.7](https://arxiv.org/html/2603.07106v1#S3.SS7) 描述了移动至目标/交互试玩测试。在[源码固定版本 8686a4d5](https://github.com/Pluto156/AutoUE/blob/8686a4d51c19813f2b3368bd73f685a940db7531/PCGGen_UE/Plugins/LLMEditor/Source/LLMEditor/Private/Core/EvaluateExecutor/EvaluateExecutor.cpp#L174-L186) 中，已发布的分派器跳过移动命令，而[交互路径](https://github.com/Pluto156/AutoUE/blob/8686a4d51c19813f2b3368bd73f685a940db7531/PCGGen_UE/Plugins/LLMEditor/Source/LLMEditor/Private/Core/EvaluateExecutor/EvaluateExecutor.cpp#L383-L431)直接调用处理程序。仅完成该脚本路径并不能证明玩家导航成功。此次 2026-10-19 核查属于静态源码观察，并非复现的运行时结果，也不是针对所有评估实现的结论；未检查二进制素材和数据集项目。

Unity 的接口迁移需要另作区分。[官方迁移指南](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli)弃用了 `com.unity.ai.assistant` 中的旧 MCP 服务器。CLI 的 `unity mcp` 仍受支持，这项弃用不影响第三方 MCP 工具。网站应同时提供当前官方入口及单独的社区桥接条目。

## MarioGPT 请求约束与可执行结论

来源于 2026-10-18 审查；未进行完整复现。未执行模型、评估器、JAR 或引擎，也未下载权重/游戏/数据素材。这是在现有资源基础上补充源码检查所得的评估边界，并非已实现的适配器。

### 版本与审查边界

- [MarioGPT 源码](https://github.com/shyamsn97/mario-gpt/tree/e62bb2b0106a00734e724e272ba94fb179ad959a)，main 提交 `e62bb2b0106a00734e724e272ba94fb179ad959a`，2023-08-02。[`setup.py`](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/setup.py) 将软件包标识为 0.1.3、Pre-Alpha，运行时依赖未固定版本。这不是已安装环境的锁文件。
- [论文 v3](https://arxiv.org/html/2302.05981v3)，2023-11-08。未证实已审查的 main 分支就是产生论文结果的确切代码/检查点。
- [作者链接的权重页面](https://huggingface.co/shyamsn97/Mario-GPT2-700-context-length)独立于源码修订版本。关联元数据将其标识为 GPT-2 模型；本次审查未独立确定确切的检查点字节内容及模型专用许可。

### 作者结果：区分指标样本总体

论文 v3 使用 37 个带路径标注的关卡训练。可玩性评估使用 250 个生成关卡，每个关卡均由 Baumgarten 的 A\* 控制器测试五次，因为性能取决于计算资源。论文报告 88.4% 的关卡完成；成功关卡中仅一个需要重试。这不是单次尝试成功率，也不是人类难度评估。

路径 MAE 对五次运行取平均，仅在两条轨迹都访问过的水平位置比较垂直坐标：可玩关卡为 1.15 个瓦片，失败关卡为 4.56，总体为 1.56。预测路径可能意味着过长的滞空时间，或在控制器被困出生点附近时已离开关卡。以重叠区域为条件的低误差并不能认证未访问的其余部分。

提示遵循程度采用独立的 1,000 样本测试：水管 81%、敌人 68%、方块 92%、高度 76%。这些是单项特征得分，并非同时满足约束且可玩的成功率。新颖性搜索使用平滑后的预测路径，而非观察到的控制器轨迹；向档案添加 300 次后达到 78% 坐标覆盖率，是一项多样性测量。该可视化和档案覆盖率都不能证明控制器可解性、视觉原创性或广泛的人类偏好。[论文 §§3–4](https://arxiv.org/html/2302.05981v3)

### 经源码检查的契约

1. **返回的 `prompt` 是根据测量得出的描述。**  `SampleOutput.create` 赋值为 `prompter(level_tensor)[0]`；它不保留原始请求。采样器另行接收请求提示以生成条件。在比较意图与输出前，应单独保存输入请求。若将返回的描述称作遵循请求的证据，就会丢失本来要检验的不一致。[返回描述，35–80](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/sampler.py#L35-L80)、[条件生成，181–223](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/sampler.py#L181-L223)

2. **数量标签是实现专用的分箱，而非字面保证。**  辅助函数在将各行无分隔地拼接起来的文本中，将 `E` 和 `B` 字符计为敌人，字面 `<>` 出现次数计为水管，将 `X/S/?/Q` 计为方块。高度仅检查前六行中的 `X`、`<`、`>`。默认配置使用 `np.digitize(..., right=True)`，敌人阈值为 `[1,3,7]`，水管阈值为 `[0,2,5]`。因此，根据源码推断，计数为一个敌人会得到“no”标签，恰好五根水管会得到“some”；超过五根才是“many”。自定义统计及 use_raw_counts 可以改变这一行为。论文 §4.4 则将五根水管称为“many”；未证实已检查的默认设置就是论文配置。这一推断未执行验证。应保留原始计数、网格宽度和明确的边界语义，而非将生成的标签当作字面的零/数量断言。[prompter.py，15–19、46–109](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/prompter.py#L15-L109)、[NumPy 区间语义](https://numpy.org/doc/stable/reference/generated/numpy.digitize.html)

3. **`run_astar()` 是启动器，而非结构化验收 API。**  它调用 `Simulator.astar`，后者写入临时关卡、启动 `java -jar PlayAstar.jar`，并丢弃 `CompletedProcess`（存储在 `_` 中）。它捕获 stdout，却从不解析或返回，不检查进程状态，不设超时，不返回胜/负/轨迹信息，仅暴露一个渲染开关。`play()` 同样是交互式启动。因此，Python 正常返回并不提供任何已验证的完成结论。进程启动异常可以向上传播；该方法没有实现论文中的五次运行协议。[sampler.py，107–121](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/sampler.py#L107-L121)、[simulator.py，36–63](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/simulator/simulator.py#L36-L63)

4. **关卡工件与预览有不同的故障面。**  采样会在解码前裁掉末尾不足 14 个 token 的列。渲染器遇到未知字符时会打印诊断信息并用背景替代，因此仅看预览可能掩盖 token/表示问题。保存操作将网格写为按换行分隔的文本；不会持久化请求、模型修订版本或可玩性结果。应在保存任何预览的同时保留解码文本和 token 标识。[sampler.py，81–112](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/sampler.py#L81-L112)、[utils.py，13–37、50–64、116–128](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/utils.py)

### 已发布工件与权利

[完整的固定版本目录树](https://api.github.com/repos/shyamsn97/mario-gpt/git/trees/e62bb2b0106a00734e724e272ba94fb179ad959a?recursive=1)包含 Python 训练/采样代码、训练/采样笔记本、默认语料模块及两个 JAR。不包含 Java 源文件。`PlayAstar.jar` 的 Git blob ID 为 `43088af059d4855e59cc813fed1b11fc370c5381`；未下载或检查该二进制文件。控制器实现、内部预算及其与论文所评估二进制文件的关系仍未核实。[README 路线图](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/README.md#future-plans)中，论文的局部填充和开放式生成代码尚未勾选。仅有模型类不能证明完整的新颖性搜索实验已发布可复现实现。

MarioGPT 的[源码许可证](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/LICENSE)为 MIT。[VGLC 根许可证](https://github.com/TheVGLC/TheVGLC/blob/0e86a8f31f20ecad4eaa5741ff061af88767f7fb/License.md)同样为 MIT，但这些声明不能证明对 Nintendo 原始游戏内容拥有权利。模拟器自身的[图形 README](https://github.com/shyamsn97/mario-gpt/blob/e62bb2b0106a00734e724e272ba94fb179ad959a/mario_gpt/simulator/img/README.md)说明其图形修改自提取的 Super Mario Bros 精灵图及 MarioAI 字体。本次审查未确定权重许可。应将代码、模型、数据集来源及游戏图形作为不同的复用范围分别跟踪；MIT 声明并未解决权重或原游戏内容的权利问题。这是来源观察，并非商业使用授权。

### 建议的迁移方案，尚未实现或测量

对于原创且由项目拥有权利的 2D 平台游戏，应保留四类独立记录：请求约束、原始结构测量、预测路线/新颖性描述符，以及实际控制器结果。固定游戏物理/控制器、模型/分词器、随机种子、尺寸和采样设置。未来的评估器应返回每次尝试的状态、胜利条件、最远进度、完整轨迹、计算/时间预算以及基础设施错误；搜索失败并不等于不可能。应报告所有生成候选、重试以及同时满足约束且完成关卡的比率。在路径误差旁同时给出重叠覆盖率。加入边界计数、不可能跳跃和出生点被困的负面测试样例，再在实际目标运行时中并面向预期玩家技能群体测试交付关卡。这些建议检查均尚未运行。

## GAVEL：规则设计搜索与结论边界

核查日期为 2026-10-18。只读检查了作者源码 [1a849c3ba00c3ecb1194c202451a617ef0556b60][gavel-repo]（2024-10-30）、[论文 v2][gavel-paper]（2024-12-03）及工件清单。[v1][gavel-v1] 的日期为 2024-07-12，是不同的发表快照。未安装、进行模型推理、执行游戏/JAR/class、反序列化档案或复现实验。未证实该源码快照就是生成论文结果的确切实现。Python 调用捆绑的 `bin` 类；已检查的 Java 源码与这些 class 文件之间的对应关系仍未核实。

### 作者研究，与已检查的实现分开

论文 v2 描述了对 Ludii 规则进行 CodeLlama-13B 中间填充变异：574 个微调游戏、14 个留出搜索种子及 49,968 个训练元组。PCA 将 510 个概念映射至 40×40 档案，并在筛选前的完整 Ludii 语料上拟合。三次运行各使用 500 步，每步九个提案。其六指标调和平均值包含覆盖率；完成指达到结束状态。仅有三次运行时，相较基线的新单元格改进不具统计显著性。专家筛选属于初步研究；广泛的人类验证仍是未来工作。[第 3–8 节][gavel-paper]

14 个种子被排除在任务专用微调之外，随后在搜索中直接优化。它们不是未曾使用的最终评估集。这既不能证明基础模型已去污染，也不能证明对人类偏好的有效性。[论文 §§4、7–8][gavel-paper]

### 经源码检查的候选与搜索契约

- **表示与变异。**  `ArchiveGame` 保留完整规则字符串、标量适应度、指标字典、祖先谱系、原始游戏名、代数及轮次。变异器选择括号平衡的区域，排除最外层的整个游戏表达式，以该区域的前缀/后缀为条件，再插入生成文本。它最多请求 512 个新 token，并去除换行。语法约束变异是对外提供的枚举/CLI 选项，但其实现会抛出 `NotImplementedError`。这里的“重组”不应暗示存在经过验证的双亲交叉算子。[config.py][gavel-config]、[mutators.py，80–154][gavel-mutator]
- **采样与论文的简要描述有差异。**  每个选定精英只选择一个变异位置；`num_return_sequences` 在该位置生成配置数量的备选方案。保存的主配置选择三个精英，每个生成三个备选方案。[mutators.py][gavel-mutator]、[evolution.py，262–289、440–449][gavel-evolution]、[run_args.json][gavel-args]
- **入档不等于通过质量检查。**  档案插入会排除适应度 −3 和 NaN，但可在空单元格中保留 −2 的不可玩条目或 −1 的无趣条目。因此，正质量占用率必须与总占用率分开报告。PCA 档案加载缓存模型，并对编译得到的概念分箱；新颖性取决于表示和参考总体。[archives.py，96–124、170–219][gavel-archive]
- **新颖性总体。**  已检查的基线比较从公开模型数据集的 `train ∪ val` 划分构建已占用的参考单元格，再依据该集合给最终档案条目评分。它不会为此比较加载全部原始 Ludii 游戏。其 QD 计算对保留条目累加 `fitness + 2`，所以 −1 条目虽未通过质量门槛，仍对 QD 有贡献。不要将 QD 或新单元格计数解释为有趣游戏或全局新颖游戏的比例。[compare_against_pure_generation.py，41–75、112–152][gavel-compare]

### 编译、可玩性与采样质量门槛

Python 两步评估器先请求 100 次 Random 代理试验，设置为 500 回合。它拒绝随机对战平衡度低于 0.5 或决策动作比例低于 0.5 的候选，然后请求选定的 AI 评估。主运行保存的参数指定 UCT、十次试验、0.25 秒思考时间及 `max_turns=50`。这些样本总体应与单独的 UCT 对 Random 技能样本分开。[java_api.py，169–241][gavel-api]、[run_args.json][gavel-args]

如果编译未生成游戏，Java 标准端点返回 −1。评估异常、错误报告或平均时长低于二会返回 −2。因此，“不可玩”的范围比不存在合法动作更广。Python 适应度层还会拒绝完成率低于 0.2、平均回合数低于三、决策动作比例低于 0.1 或棋盘覆盖率低于 0.1 的候选。[StandardEvaluationEndpoint.java，64–104][gavel-standard]、[fitness_helpers.py，148–186][gavel-fitness]

对于其余候选，已检查的默认调和平均值使用 **五项** 得分：平衡度、完成率、决定性（`drawishness`）、决策动作和轨迹分数。覆盖率和时长不参与聚合，尽管二者均影响拒绝判定。CLI 允许平均/调和/最小值聚合，但不改变这一固定排除列表。这是复用前需解决的论文/源码协议不一致，而非证明已发表结果不正确。[fitness_helpers.py，9–38、148–186][gavel-fitness]、[evolution.py，383–391、485–493][gavel-evolution]

已检查的 `Completion` 源码统计胜者索引非零的试验，排除平局；它并不是通用的终止状态计数。Python 根据返回的胜者计数，以一减去最大玩家胜率差重新计算平衡度，以一减去胜者为零的频率重新计算决定性。仅凭指标标签不足以重建其语义。[Completion.java，47–57][gavel-completion]、[StandardEvaluationEndpoint.java，93–99][gavel-standard]、[fitness_helpers.py，119–146][gavel-fitness]

**技能样本总体：**  Python 封装程序为每个玩家席位请求五次试验。Java 依次让 UCT 占据每个席位，对抗 Random 对手，再以 UCT 胜场数除以 `trialsPerGroup × playerCount`；双人候选为十次试验，但对变异后的玩家数量并非一律十次。它衡量的是这一策略/预算组合下的对战，而非一般战略深度或人类技能。[fitness_helpers.py，77–84][gavel-fitness]、[FastTraceEndpoint.java，143–196][gavel-trace]

### 故障、超时与预算核算

1. **300 秒设置不是端到端截止时限。**  它仅装饰 `two_step_evaluate`；Java 评估器的构造发生在该封装程序之前，FastTrace 则在其后运行，使用自身的 120 秒子进程超时。在已检查的 Python 方法中，Java 启动等待 Ready 行，没有明确截止时限。[fitness_helpers.py，57–90][gavel-fitness]、[java_api.py，61–86][gavel-api]
2. **异常与数值失败路径不同。**  Python 捕获的异常（包括封装程序超时）会将可编译和可玩标志均设为 false，并附加错误字符串。FastTrace 的 Java 超时则返回数值 −3；其他已捕获的轨迹异常返回 −2。Python 聚合在进行负值检查之前，将参与计算的指标值下限截断为 0.01，所以在其他门槛通过时，数值形式的轨迹失败可能变成较小的正贡献。这是源码观察到的路径，而非已执行的失败测量。[fitness_helpers.py，77–90、172–182][gavel-fitness]、[FastTraceEndpoint.java，49–60、117–139][gavel-trace]
3. **早期随机拒绝并不能阻止所有昂贵测试。**  随机筛选失败对象仍标记为可编译/可玩，因此外围辅助函数仍调用 FastTrace，尽管最终质量将是 −1。[java_api.py，230–236][gavel-api]、[fitness_helpers.py，77–84][gavel-fitness]
4. **聚合会丢失诊断信息。**  `_get_fitnesses` 从第一组评估取标志、对指标取平均，并省略单次错误。重复评估时，它拼接胜者计数向量，而不是对对应玩家分箱求和；不要增加重复次数并假定合并后的平衡度/决定性计算正确。已检查的主运行保存配置使用一次评估。该类初始化并写入 `error_logs`，但此文件中未出现追加操作；空错误文件不能证明运行无错误。[evolution.py，88–94、179–228][gavel-evolution]、[run_args.json][gavel-args]
5. **提案数不等于评估成本。**  每一步都会过滤未改变的父项及同一步骤内完全相同的重复项；不会使用已初始化的全局评估缓存。失败、跨步骤重复及额外轨迹评估均消耗资源。保存的主参数请求 1,000 轮，而公开目录包含至 500 轮的检查点，比较器选择第 500 代。README 命令也继承 1,000 轮默认值。应保留实际检查点和观察到的步骤，而非从请求参数推断已完成预算。[evolution.py，262–339、367–391][gavel-evolution]、[运行目录][gavel-outputs]、[比较][gavel-compare]、[README][gavel-readme]

### 工件与权利

已检查的目录树包含 Python 搜索/训练/基线代码、带 Java 源码及已编译类的 Ludii 分支、缓存的 PCA pickle、六个主运行/UCB 运行目录、保存的参数/统计及选定的 `.lud` 游戏。其中一次受检运行包含至第 500 轮的档案及十个选定游戏文件。目录存在并不验证试验完整性、与论文等价或可执行复现。本次审查期间，公开 releases API 未返回任何 GitHub release。[固定版本目录树][gavel-repo]、[运行目录][gavel-outputs]、[选定游戏][gavel-best]、[releases API][gavel-releases]

作者链接的[模型文件清单][gavel-model-files]列出三个 safetensors 分片、配置及分词器文件；[数据集页面][gavel-data]列出两个划分及 574 行训练数据。未下载模型权重或数据集二进制文件。[模型卡][gavel-model]是未填写的模板，其许可证字段也未填写。在已检查的根目录列表中未观察到根级 GAVEL 许可证；捆绑的 [Ludii LICENSE][gavel-license] 声明 CC BY-NC-ND 4.0，并明确限制未经许可的商业使用及修改材料分发。因此，公开可用并不能证明可在生产中宽松复用、所有根目录 Python 代码均获许可，或生成变体已获授权。集成或再分发前应单独解决权利问题。

### 建议的 GameMap / harness-RSI 改编，并非作者结果

将 GAVEL 用作设计搜索模式：对有界规则/程序表示进行变异、保留谱系、拒绝无效候选，并探索多样的可行备选方案。对于游戏制作测试样例：

- 将候选语法、变异位置、项目断言、权利范围及评估器冻结在可变策略之外
- 分别存储编译错误、无效对战、采样质量拒绝、基础设施故障、进程超时、动作上限终止及人类拒绝；绝不把它们合并为一个差游戏分数
- 保留每次对局的席位、对手、随机种子、预算、终止原因及原始计数；声明实际的新颖性参考池和档案投影
- 统计全部提案、去重、尝试评估、轨迹试验、重试以及实际耗时/模型成本；保留所选的确切检查点
- 留出游戏家族和最终评估器，然后将人类试玩与代理分数分开进行；在将新插入机制描述为已使用之前，要求提供规则激活/覆盖证据

这是一项尚未实现的改编规范。它不能证明存在通用游戏设计验证器、引擎适配器、人类乐趣提升或 harness-RSI 性能改进。

[gavel-repo]: https://github.com/gdrtodd/gavel/tree/1a849c3ba00c3ecb1194c202451a617ef0556b60

[gavel-paper]: https://arxiv.org/html/2407.09388v2

[gavel-v1]: https://arxiv.org/html/2407.09388v1

[gavel-config]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/config.py

[gavel-mutator]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/mutators.py

[gavel-evolution]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/evolution.py

[gavel-archive]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/archives.py

[gavel-api]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/java_api.py

[gavel-fitness]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/fitness_helpers.py

[gavel-standard]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/ludii_fork/Generation/src/approaches/symbolic/api/evaluation/StandardEvaluationEndpoint.java

[gavel-trace]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/ludii_fork/Generation/src/approaches/symbolic/api/evaluation/FastTraceEndpoint.java

[gavel-completion]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/ludii_fork/Evaluation/src/metrics/single/outcome/Completion.java

[gavel-compare]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/baselines/compare_against_pure_generation.py

[gavel-args]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/exp_outputs/main_experiment_seed_1_05_18_24/run_args.json

[gavel-outputs]: https://github.com/gdrtodd/gavel/tree/1a849c3ba00c3ecb1194c202451a617ef0556b60/exp_outputs/main_experiment_seed_1_05_18_24

[gavel-best]: https://github.com/gdrtodd/gavel/tree/1a849c3ba00c3ecb1194c202451a617ef0556b60/exp_outputs/main_experiment_seed_1_05_18_24/best_games

[gavel-readme]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/README.md

[gavel-releases]: https://api.github.com/repos/gdrtodd/gavel/releases

[gavel-model]: https://huggingface.co/LudiiLMs/code-llama-13b-fitm-mask-heldout-1-epoch

[gavel-model-files]: https://huggingface.co/LudiiLMs/code-llama-13b-fitm-mask-heldout-1-epoch/tree/main

[gavel-data]: https://huggingface.co/datasets/LudiiLMs/code-llama-13b-fitm-mask-heldout-1-epoch-base-data

[gavel-license]: https://github.com/gdrtodd/gavel/blob/1a849c3ba00c3ecb1194c202451a617ef0556b60/ludii_fork/LICENSE

## 面向设计师的试玩证据

以下示例增加了人工编写的行为判定及以玩家画像为条件的反馈。它们不会将可达性、完成情况或效用转化为人类乐趣分数。源码检查所得机制与编辑提出的改编仍须区分。

### Minecraft GameTest：人工编写的场景与明确的行为判定

**来源范围。**  Microsoft 的 Bedrock 示例仓库固定于 [`e0d67e171f11faa3ea5ea3be085e3f1992b27b83`](https://github.com/microsoft/minecraft-gametests/tree/e0d67e171f11faa3ea5ea3be085e3f1992b27b83)，提交于 2024-06-17，检查于 2026-10-18，将 JavaScript 断言与人工编写的 `.mcstructure` 环境结合。其 [README](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/README.md) 要求测试小巧、自包含且结果明确，并明确允许带标签的意外失败示例。这是具体的开发者编写的行为测试机制，而非已发布的玩家乐趣评估器或 Java Edition API。

[示例清单](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/js-gametests/behavior_packs/JsGameTests/manifest.json)声明最低引擎版本为 1.21.0，beta 模块为 `@minecraft/server` 1.13.0-beta 和 `@minecraft/server-gametest` 1.0.0-beta。这些是历史声明，并非与已安装/当前游戏的已验证兼容性。按滚动文档核查的[官方教程](https://learn.microsoft.com/en-us/minecraft/creator/documents/gametestbuildyourfirstgametest?view=minecraft-bedrock-stable)仍警告 GameTest 是实验性的。教程描述了 Creative 模式结构创作、行为包、启用 Beta APIs 以及 Normal 难度；实体逃入周围世界可能使预期的封闭环境失效。此处未运行任何世界、游戏、二进制结构或测试，也未对其进行动态检查。

| 已检查的测试                                                                                                                                                                                      | 实际编写的判定器                                                   | 通过不能证明什么                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------- |
| [入门狐狸/鸡示例](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/starterTestsTutorial/behavior_packs/starterTestsTutorial/scripts/StarterTests.js) | 生成两种实体，先断言存在鸡，然后在区域内不再有鸡时判为成功；最多 410 tick，并使用指定名称的玻璃结构     | 脚本不对攻击/死亡原因或特定受害者身份作断言。仅仅缺失并非狐狸执行了预期交互的因果证据。 |
| [僵尸/村民追逐](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/js-gametests/behavior_packs/JsGameTests/scripts/MobBehaviorTests.js)               | 构建带缺口的墙，生成两种实体，然后在第 180 tick 断言村民存在并判为成功；注册允许最多 2,000 tick | 名称/注释比断言涵盖范围更广。代码不衡量追逐、路径效率或更长会话全程的生存情况。     |
| 同一文件中的铁傀儡竞技场                                                                                                                                                                                | 在 810 tick 内最终要求不存在僵尸/骷髅且存在铁傀儡                             | 这一类型存在性合取条件不是难度、公平性、因果击杀归属或人类乐趣分数。           |
| [Minibiomes](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/js-gametests/behavior_packs/JsGameTests/scripts/ChallengeTests.js)              | 调用矿车可骑乘组件的 `addRider(pig)`，不检查结果，然后在 260 tick 内目标位置有猪时判为成功 | 终止断言不单独要求目标猪仍乘坐该矿车。应保留配置意图与观察到的终止状态之间的区别。    |

[当前实验性 Test 参考](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-gametest/test?view=minecraft-bedrock-experimental#succeedwhen)将 `succeedWhen` 定义为每个 tick 重试其回调，一旦回调返回且未抛出异常就成功。`runAtTickTime` 相对测试开始时间调度。因此，最终成立的谓词和单个预定检查点，不同于在整个时间区间内保持的不变量。这份文档佐证了概念区别；并未固定历史示例所用的原生实现。tick 预算不是经独立验证的实际耗时截止时限。

**建议的 GameMap 改编，尚未实现。**  将设计师编写的场景、初始状态、输入/动作预算、不变量区间和终止谓词分开。对于新遭遇，在类型/数量谓词之外记录对象身份及权威事件证据，再与视觉/音频反馈关联。测试刻意无效的对照项：通过逃生路线满足缺失条件却未发生预期战斗事件、未连接的交互，或在未携带所需物体时抵达目标。将这些负面对照与最终留出任务集隔离。分别报告配置/导入失败、超时、断言失败及通过；更强的判定器不应被同一个受评估候选通过优化规避。自动化可达性和机制激活可以支持设计迭代，但可读性、挑战性和乐趣的验收标准需要另有充分依据的证据。此提议未引入任何人类参与者数据或实验。

**可用性与权利。**  示例采用 [MIT 许可](https://github.com/microsoft/minecraft-gametests/blob/e0d67e171f11faa3ea5ea3be085e3f1992b27b83/LICENSE)；这不提供 Minecraft 运行时，也不授予无关游戏素材/服务的权利。固定版本仓库为一个幻翼/猫示例包含 `suite:broken` 标签；这是历史源码标签，并非新近复现的失败。实际运行时 API 兼容性、二进制结构内容、重复运行可靠性、测试重置隔离和性能仍未核实。

### MiniDungeons：玩家画像效用可揭示设计权衡，但并不测量乐趣

审查于 2026-10-18。这是对 GameMap 设计/试玩证据的纯源码补充，与控制器可解性及开发正确性基准互补。未执行模拟器、JAR、模型、游戏、引擎或评估服务；未下载或收集参与者数据。其贡献在于将设计师预期的游玩风格、经埋点记录的行为与关卡选择具体关联起来，并刻意限定对发布内容的声明。

#### 已发表的机制与指标样本总体

Liapis、Holmgård、Yannakakis 和 Togelius（2015）区分了三项验收条件：固定的特征数量、通向每个特征的可通行连通性，以及在每个怪物均造成最大伤害（14 HP）条件下的基线玩家画像完成情况。完成必须探索至少 12 个瓦片。只有之后，杀怪型或寻宝型玩家画像才评估关卡效用，并对十次随机对局取平均。因此，连通不等于完成，完成也不等于玩家画像的目标行为特征。

一项关键负面结果对设计很有用：最大化寻宝效用会生成评判代理总能收集全部七个宝藏而不死亡的关卡；最大化杀怪效用变异性则产生 0.92 的死亡比例。这是不同的优化目标，均非乐趣分数。表 1 总结了 20 次进化运行中最佳的最终关卡，每个重玩十次；括号中的偏差是先在关卡内计算模拟偏差、再跨运行平均的结果，并非独立关卡之间的不确定性。

玩家画像在全部十个人工编写关卡上进化；同一批关卡也作为比较基线。先前的人类对齐使用的是 38 位玩家在这些关卡上的下一动作一致性，而非对新生成关卡的乐趣评价。这不是最终测试集从未参与过开发的研究。[论文 §§2.2–4、表 1][MD-paper]

#### 实际发布了什么

[作者的 MiniDungeons 项目页面][MD-project]直接链接 `sentientdesigns/minidungeons`，称其为最小代理模拟。已审查源码为[提交 `298b86cac5624e4b121b4d2e5a2fd3cd93c622f7`][MD-pin]，日期为 2017-06-07。这证明了作者关联及确切受检代码，并不证明与 2015 年实验等价。

[README][MD-readme] 明确描述了一个精简的 MiniDungeons 1 框架，包含十张研究地图及教程地图 0、ASCII 显示和自定义控制器接口。[完整目录树][MD-tree]包含这十一张地图及简单的 Idle、Random、Roomba、Zombie 和 Pathfinding 控制器。不包含论文中进化得到的玩家画像权重或可行/不可行进化式关卡生成实现。不要将论文结果附会为此发布版本已复现的基准，也不要将其描述为后来的 MiniDungeons 2 MCTS 系统。

三个经源码检查的方面，使该发布版本适合作为设计埋点示例：

1. **结果附有行为向量。**  `SimulationMode` 保留每次运行的 HP、击杀怪物数、收集宝藏数、消耗药水数、尝试动作数及访问过的不同瓦片，然后打印汇总值及完整的逐次运行值。原始配置使用十次运行、300 动作上限。测量包括每次运行，包含死亡和达到上限的运行，而非只筛选获胜。其计数器将 HP > 0 且动作数 < 300 归为已完成，将动作数 == 300 归为未完成：在第 300 次动作完成会被计作未完成，而在该次动作死亡可能同时计入死亡和未完成。这些是实现计数器，不是互斥的终止结论。这使未来的比较可以保留获得宝藏或战斗覆盖的代价，而非仅展示单一完成百分比。[SimulationMode，第 20–142 行][MD-simulation]

2. **显示的热图有明确的信息边界。**  `renderHeatmapDungeon` 使用 `getAnyVisited()` 并以 `%` 标记访问过的位置。这是二元占用图，不是访问频率图或有序动作轨迹。`PlayMap` 另行存储访问次数及碰撞/出口事件字符串。设计师可以检查行为去了哪里，但仅凭导出的占用图不能确定何时使用药水、走廊被重复经过多少次，或哪个决策发生在死亡之前。[PlayVisualizer][MD-visualizer]、[PlayMap][MD-playmap]

3. **控制器身份与随机性仍是实验变量。**  原始运行器实例化 `PathfindingController`，其动作选择最小化到出口的路径距离；它未实现学习得到的寻宝/杀怪玩家画像。`RandomNumberManager` 创建默认 Java `Random`，未暴露设置随机种子的方法。因此，选择控制器、添加种子控制并记录确切的初始伤害抽样属于改编工作，而非现有复现支持。[PathfindingController][MD-controller]、[RandomNumberManager][MD-random]

README 称代码库及捆绑的 `lib/ai_path.jar` 使用 GNU Lesser General Public License，但未给出明确的版本号；已检查的目录树没有独立许可证文本。应记录该措辞，而非转写成 MIT 或某个具体的 LGPL SPDX 标识符。未获取或检查该二进制文件。这个最小 ASCII 发布版本也不能证明对另外链接的图形拥有权利。[README 许可声明][MD-readme]、[MD-tree][MD-tree]

#### 建议的 GameMap / piRSI 改编，尚未实现

对于原创且由项目拥有权利的地牢，在优化前先由设计师明确预期权衡：例如，可选宝藏应要求玩家绕行一条可生还的路线，同时仍提供更安全的完成路线。将强制可达性/完成门槛与玩家画像专用的行为目标分开。不要因为候选改善了一项易于优化的统计量，就在未说明的情况下改变设计目标。

使用一个小型开发测试样例家族：不可达的奖励、连通但致命的路线、奖励轻而易举的安全直达路线，以及有意义的可选绕行路线。将每次运行的原生结果与行为向量、有序事件轨迹及可查看路线配对。保留死亡和预算耗尽的运行，与成功运行并列。玩家画像失败应触发对控制器能力和关卡设计两方面的诊断；它不能证明没有玩家能够成功。

对于递归执行框架比较，在评估候选改动之前固定玩家画像定义、观察权限、游戏规则和预算。留出完整布局家族，并预留不能影响控制器或执行框架选择的最终评估集。对每种玩家画像分别报告完成情况及行为目标达成情况，并给出完整分母。更快或更多样的合成路线，是关于这些已定义代理的有用反馈。要评估清晰度、节奏、挫折感及乐趣，仍需以代表性人类试玩和设计师评审作为独立证据；此处二者均未进行。

[MD-paper]: https://www.um.edu.mt/library/oar/bitstream/123456789/29721/1/Procedural_personas_as_critics_for_dungeon_generation_2015.pdf

[MD-project]: https://antoniosliapis.com/projects/project_minidungeons.php

[MD-pin]: https://github.com/sentientdesigns/minidungeons/tree/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7

[MD-tree]: https://api.github.com/repos/sentientdesigns/minidungeons/git/trees/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7?recursive=1

[MD-readme]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/README.md

[MD-simulation]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/experiment/SimulationMode.java#L20-L142

[MD-visualizer]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/dungeon/visualization/PlayVisualizer.java#L46-L77

[MD-playmap]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/dungeon/play/PlayMap.java

[MD-controller]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/controllers/PathfindingController.java#L24-L46

[MD-random]: https://github.com/sentientdesigns/minidungeons/blob/298b86cac5624e4b121b4d2e5a2fd3cd93c622f7/src/util/statics/RandomNumberManager.java

### Sonic 轨迹可视化：比较训练群体

核查于 2026-10-19。该研究原型通过跨代理群体的汇总路线比较，补充 MiniDungeons 的二元占用图。更丰富的诊断证据本身并不构成经过验证的设计建议。

**已发表的机制与局限。**

该原型在 Gym Retro 中针对 Sonic 2 每代训练 30 个 NEAT 代理。奖励使用最终位置到目标的欧氏距离。控制器观察编码、确切奖励公式、回合上限、随机种子、总训练成本及独立重复次数均未说明。记录的输入为逐帧位置、关卡奖励及代数标识；输出为最小/平均/最大奖励曲线及两个独立选择的代数地图。圆圈概括典型路线点；线宽汇总任一方向的通行频率。

插图比较了 Emerald Hill 第 29/56 代及 Hill Top 第 11/53 代。它们提示了路线发现、反复遭遇障碍困难，以及在进度奖励下跳过后方强化道具。这些是定性解读，而非测得的诊断准确率、受控的设计师收益或经验证的人类专长预测。究竟是难度问题还是代理训练不足，仍无法明确区分。

汇总忽略墙体，并省略玩法事件上下文。集成训练控制、改变起点及聚焦轨迹片段属于未来工作。论文未证明具备单回合下钻、时序事件回放、确切的典型点参数、工业部署、覆盖率增益或乐趣提升。它报告的是一个游戏中三个关卡的观察，而非有代表性的留出游戏研究。[一手论文，§§III–V 及图 1–3](https://ieee-cog.org/2020/papers/paper_205.pdf#page=2)

**发布检查与归属。**

第一作者的[大学个人简介](https://www.uni-bamberg.de/en/vis/team/shivam-agarwal/)链接至其个人网站。网站[固定于 `e648236766b1ff7a08118f4e6fa11928abfeec9c` 的发表记录](https://github.com/s-agarwl/s-agarwl.github.io/blob/e648236766b1ff7a08118f4e6fa11928abfeec9c/public/data/pubs.bib)提供此工作的论文、插图及视频链接，但没有演示、源码或数据链接。[固定版本的发表目录](https://github.com/s-agarwl/s-agarwl.github.io/tree/e648236766b1ff7a08118f4e6fa11928abfeec9c/public/publications/Agarwal2020Visualizing)包含一个 PDF 和一个 PNG。在有限的作者网站/仓库扫描范围内，未核实到匹配的可运行发布版本。这是可用性调查结果，并非证明其他地方不存在。

不要将作者的 [EvolvingAI 发布版本](https://github.com/s-agarwl/EvolvingAI/blob/98e04516a51cd19421fa5946c9e850602b6967c4/readme.md)与此工作混淆：其 README 指向另一篇 2022 年发表的论文。同样，机构[新闻文章中的专家调查声明](https://paluno.uni-due.de/en/news/news-insights/project-news/article/better-understanding-ai-players)涉及 Pommerman/Bombalytics。它并不验证 Sonic 原型。[大学书目记录](https://research.jku.at/en/publications/visualizing-ai-playtesting-data-of-2d-side-scrolling-games/)指出 IEEE 出版版权。未核实 Sonic 原型或轨迹的任何许可证。不能将网站仓库的许可证视为对独立权利所有者的游戏/地图美术的授权。应链接至来源图片，而非将其纳入 GameMap。

**建议的 GameMap 改编，尚未实现。**  在每项汇总背后保留原生回合结果、有向轨迹及机制/事件轨迹。定义边宽统计的是通行次数、独立回合数还是停留时间；在候选间保持图构建与归一化方式固定。区分抵达障碍、穿越、死亡、超时和无效日志。使用由项目拥有权利、包含单向门、相近但不连通的走廊及后方奖励的测试样例，检查汇总是否掩盖失败。比较显示方式时固定策略检查点，或分别交叉比较控制器与显示改动。这些控制措施是建议，并非该原型的功能或已测得收益。

### SuSketch：交互式代理模型反馈及其独立证据边界

审查于 2026-10-19，仅查阅源码。SuSketch 提供面向设计师的循环：编辑、检查预测的空间/时间效果、比较备选方案，然后显式应用改动。[作者项目页面](https://antoniosliapis.com/projects/project_susketch.php)确认了这一用途。未运行工具、引擎、模型或游戏；未获取模型二进制文件或参与者记录。

**可检查的工作流。**  [作者署名的 GitHub 个人页面](https://github.com/PanMig)置顶了该项目，其 README 链接至发表论文。源码检查版本为 [`8962008e1340b32e6d5425a9ee5300dad2baed4f`](https://github.com/PanMig/Susketch/tree/8962008e1340b32e6d5425a9ee5300dad2baed4f)，提交于 2022-04-30。这是已识别的源码快照，并非已确定可复现论文的构建版本。

- 设计师配置由一个 20×20 瓦片布局及两个职业选择组成。已检查的[输入适配器](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/Scripts/ArrayParsingUtils.cs)将建筑、拾取物及楼梯编码为七个通道；[TFModel](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/Scripts/TFModel.cs)将该表示与职业参数结合，并调用五个已保存网络；击杀比例及持续时长路径追加一个全零的第八掩体通道。这些是模型估计，并非新观察到的对局
- [结构检查](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/Scripts/TileMap/TileMapRepair.cs#L182-L223)为遍历失败、不可达的拾取物、楼梯及封闭区域生成具体消息。它们不同于预测的击杀份额、持续时长、死亡位置和战斗进程
- [显示代码](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/Scripts/Managers/MetricsManager.cs)渲染玩家份额条形图及时序图；[死亡显示](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/Scripts/DeathHeatmap.cs#L39-L64)采用 4×4 单元格。[建议缩略图](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/Scripts/MiniMap.cs)展示拾取物数量差异及预测的平衡变化，另有独立应用操作。[职业建议](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/ClassBalanceView.cs)同样要求执行应用操作

**已发表证据的局限。**  论文的 475,000 条训练/测试轨迹来自人工代理对局，筛选条件为十分钟内达到 20 次击杀。因此，代理模型的样本总体排除了超时对局。报告的平均输出测试 R²，死亡热图为 0.400，战斗节奏为 0.438。16 人远程研究使用作者的联系人；评估的是工具使用及问卷，而非玩家游玩生成关卡时的乐趣。排除 19 次后剩余 55 次有效设计会话。设计师无法在工具内游玩自己的关卡。热图比戏剧弧线反馈更易理解；激活图及自然语言解释属于未来工作。因此，可视呈现不应等同于因果解释。[论文 §§IV、VI–VII](https://arxiv.org/html/2103.11726v1)

**重要版本区别。**  论文描述了 20 个有序的不同职业配对，并将 Sniper/Soldier 列为最佳的不同职业建议。[论文 §V](https://arxiv.org/html/2103.11726v1#S5)。然而，固定版本的[初始化器](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/Scripts/FPSClasses.cs#L24-L49)每次调用向静态列表添加 18 个条目而不清空，新增项省略了 Sniper/Soldier 的两个方向；已检查的[调用方](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/Assets/Scripts/Managers/AuthoringTool.cs#L381-L393)将该列表传给选择器。这一源码层面的差异不能证明运行时故障，也不使已发表研究失效。

**可用性与权利。**  [ProjectVersion](https://github.com/PanMig/Susketch/blob/8962008e1340b32e6d5425a9ee5300dad2baed4f/ProjectSettings/ProjectVersion.txt) 指定 Unity 2019.4.4f1。[完整目录树](https://api.github.com/repos/PanMig/Susketch/git/trees/8962008e1340b32e6d5425a9ee5300dad2baed4f?recursive=1)列出 C# 源码、五个模型字节文件、地图文件及分析路径；模型/数据仅阅读了元数据。未证实存在完整训练语料发布，也未证实实验复现。未观察到根级项目许可证；依赖项专用许可证不能解决整个项目的复用问题。[V1.0.3](https://github.com/PanMig/Susketch/releases/tag/stable) 发布于 2024-08-30，指向外部可执行文件，未获取或验证。

**建议的 GameMap 改编，尚未实现。**  分别保留结构判定、预测指标和实际试玩观察。为每项建议改动保留前/后布局、职业配置、模型修订版本及预测效果；让设计师显式接受。以独立模拟及代表性人类试玩验证所选改动，包含所引用训练样本总体之外的停滞对局。比较执行框架改动时固定预测器、保留所有被拒候选并预留留出布局家族。这些是设计建议，并非已测得的改进。

## 规划地图的验收层次

1. **策划：**  定义核心循环、输入、胜负条件、重启行为及进度状态。将范围限制在支持持续试玩的切片内。
2. **代码 / 场景：**  让代理编写代码，同时利用编辑器、CLI 或 MCP 检查真实场景、素材绑定、日志和运行时状态。
3. **2D 素材：**  统一画布、透视、角色比例、朝向、锚点、透明度、帧顺序、循环、命中时机、图集和瓦片边缘。
4. **3D 素材：**  记录单位、坐标轴、原点、多边形数量、材质槽、UV、LOD、骨骼、动画重定向、碰撞及导航。一张令人信服的生成图像仅覆盖其中部分工作。
5. **测试：**  分别检查编译、玩法不变量、视觉布局、输入可达性、胜负和重启行为、长时间运行及性能。视觉评判器与状态探针提供互补证据。
6. **发布：**  在目标设备或导出构建上验证。记录引擎版本、素材来源、构建步骤及性能预算。

这些层次是 GameMap 综合资源及其工程边界提出的规划建议，并非任何单篇论文的实验发现。
