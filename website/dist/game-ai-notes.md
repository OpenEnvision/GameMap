# 2D / 3D 游戏开发 AI 资料核验笔记

核验日期：2026-10-18。这里是代表性起点，不宣称收录穷尽或当前最强。`verified` 表示查看过项目的一手页面或论文，不表示已在本机运行复现。数据见 `data/segments/game-ai.json`，共 24 条：2D 主分类 12 条、3D 主分类 12 条（另两项 MCP 桥接统一收录在 agents 分段）；跨维度项目保留 `dimensions`。

## 分类与证据边界

- **开发 agent / framework**：输入需求或项目，输出代码、场景、规则或资产；可玩原型、项目局部修改和完整游戏必须分别描述。
- **Skill**：给通用 agent 的任务流程、参考资料和脚本；不应当作训练得到的模型，也不保证独立执行能力。
- **MCP / CLI**：把编辑器、运行时与资产工具接到 agent，属于执行与反馈接口。工具存在不能证明生成物的正确性。
- **开发 benchmark**：GameDevBench、GameEngineBench 检查开发修改；GameXpert-Bench 扩展到创建、修复和多轮优化；GameGen-Verifier 研究生成物的功能验证。
- **相邻评测**：CADBench 是 3D 建模评测；卡牌自对弈可以验证规则，但单独的胜率仍是玩法能力，不能替代开发质量。
- **世界模型**：动作条件的视频预测与显式引擎项目是不同产物。Kling 的 GameFactory 不等于 OpenDCAI 的 GameFactory-3A。Video2Game 输出显式重建环境，单独放在 3D 重建路线。
- **程序化后端**：Infinigen 不使用 LLM 生成几何；收录原因是它能给 AI 游戏开发流程提供可控场景与合成数据。

## 重点版本与公开状态

| 资料 | 一手依据 | 必须保留的说明 |
| --- | --- | --- |
| [GameDevBench](https://github.com/waynchi/gamedevbench) | 当前 README 的 Overview、Prerequisites | 当前仓库 333 个任务、Godot 4.4.1；[arXiv 初版摘要](https://arxiv.org/abs/2602.11103)仍写 132，不能混用数据规模或排行榜。 |
| [GameEngineBench](https://arxiv.org/html/2607.03525v2) | 论文 v2 摘要、评测协议 | 九个真实 UE 项目、110 个局部 C++ 任务，检查构建与运行行为。论文链接到 Nitrode-Research 仓库，本次网页抓取未取得仓库正文，因此主入口选论文。 |
| [OpenGame](https://github.com/leigest519/OpenGame) | README Game Skill / OpenGame-Bench | agent 框架公开；评测管线段仍写将发布，模型可获得性也不能只靠论文中的命名推断。 |
| [GameXpert-Bench](https://github.com/Kwen-Chen/GameXpert-Bench) | README Repository status | 核验时为项目页 scaffold，数据、代码和模型仍在准备发布；可引用论文协议，不作为已下载可运行 benchmark。 |
| [GameGPT](https://arxiv.org/abs/2310.08067) | 论文摘要与关联仓库 | [仓库](https://github.com/leyiwo/GameGPT)只显示 PDF 和 README，收录研究架构，不承诺完整实现。 |
| [GameGen-Verifier](https://github.com/NetX-lab/GameGen-Verifier) | README Repository Layout / Quickstart | 公开 harness、验证技能与脚本；生成游戏、缓存、截图及完整运行日志未全部随代码分发。 |
| [Agent Game Forge](https://github.com/0x0funky/agent-game-forge) | README Project status | 当前默认 JS + Canvas；Godot 全面重投与 Unity 支持仍在路线图，项目标记 pre-launch。 |
| [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge) | README Engine exports | 新版导出验证含解析往返；README 明确尚未将全部目标导出在编辑器内打开核实。 |

## 2D：可借鉴的不同环节

- [MarioGPT](https://github.com/shyamsn97/mario-gpt)：自然语言条件 → 关卡字符网格，`play()` 和 `run_astar()` 提供关卡可达性入口。代码标注 MIT；代码许可不等同于原游戏素材的使用许可。
- [GAVEL](https://github.com/gdrtodd/gavel)：Ludii 规则代码 → 语言模型变异 → 质量多样性搜索；[论文](https://arxiv.org/abs/2407.09388)研究棋盘规则创新。适合 Planning 与规则设计节点，不能替代动作游戏的实时试玩。
- [Cardiverse](https://github.com/danruili/Cardiverse)：机制图、检索和对局记录连接设计与 Python 原型。仓库标注 MIT；Replicability Notice 说明原始卡牌描述未全部分发，替代描述可能导致差异。
- [Text2Game](https://github.com/boltomli/t2g)：长文本提取 → 世界观、人物与事件合并 → Twine HTML / Godot 视觉小说。定位叙事原型，避免写成通用游戏生成器。
- [PixelLab MCP](https://www.pixellab.ai/mcp)：官方列出角色方向、动画和 tileset 工具，是商业资产服务。API/MCP 能力与引擎内碰撞、动画事件、导入配置是不同工作。
- [Agent Sprite Forge](https://github.com/0x0funky/agent-sprite-forge)：skill 与确定性资产加工链，代码标注 MIT。实际生成依赖外部图像或视频能力，应记录路由、版本、主图、帧序、锚点与导出验证。

## 3D：执行接口、生成模型与环境系统

| 资料 | 实际产物 / 用法 | 一手可确认许可或限制 |
| --- | --- | --- |
| [3AGameFactory](https://github.com/OpenDCAI/GameFactory-3A) | 多模态资产管线、技能和引擎原生代码适配 | Apache-2.0；外部模型、引擎和资产保留各自条款。README 演示混用生成模型、Mixamo 和现有场景，3A 不作质量评级。 |
| [Unity 官方技能](https://docs.unity.com/en-us/ai/unity-plugin/about-unity-plugin) | 由 Unity 维护的 2D、UI、渲染、物理等 agent 上下文，Unity 6.0+ | [官方源码](https://github.com/Unity-Technologies/unity-agent-plugin/tree/main/skills)与产品配置分别核对。 |
| [MCP Unity Editor](https://github.com/CoderGamester/mcp-unity) | 场景、组件、Prefab、控制台和 Test Runner 操作 | README 标注 MIT；社区维护，与 Unity 官方工具不同。 |
| [MCP for Blender](https://github.com/ahujasid/blender-mcp) | Blender Python、物体、材质和多角度视觉反馈 | MIT；README 明确第三方项目，包名已改为 `mcp-for-blender`。 |
| [Unreal MCP](https://github.com/chongdashu/unreal-mcp) | Actor、Blueprint 图及视口操作 | README 标注 MIT、UE 5.5+ 和 Experimental。 |
| [Godot 3D Asset Builder](https://github.com/LuigiDeFacci/godot-create-3d-assets) | 原生几何与已有资源 → PackedScene → 碰撞、导航与视觉检查 | MIT；需兼容 Godot MCP，并非生成模型。 |
| [Hunyuan3D-2](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) | 图像 → mesh → texture，支持 GLB/OBJ 与 Blender addon | 仓库使用专门许可，不能从“开放模型”推断为 MIT。2.0、2.1、2.5 是不同版本。 |
| [TRELLIS](https://github.com/microsoft/TRELLIS) | 图像或文本 → SLAT → mesh / Gaussian / radiance field，mesh 可导出 GLB | 模型与大部分代码 MIT；README 指出部分渲染和几何子模块使用其他许可。 |
| [TripoSR](https://github.com/VAST-AI-Research/TripoSR) | 单图前馈 3D 重建 | README 明确代码与预训练模型 MIT；导出后仍需要拓扑、碰撞与性能检查。 |
| [Infinigen](https://github.com/princeton-vl/infinigen) | 参数化程序规则 → Blender 场景、几何、材质与标注 | 仓库显示 BSD-3-Clause，并说明部分后续程序代码来源于 CC0；本身不是语言模型。 |
| [Holodeck](https://github.com/allenai/Holodeck) | 文本 → 布局与资产组合 → AI2-THOR，可载入 Unity | 仓库 Apache-2.0；主要目标是具身 AI 环境生成，外部资产应分别追踪。 |
| [Video2Game](https://github.com/video2game/video2game) | 实景视频 → 网格、外观、碰撞 → three.js / UE 环境 | 仓库 MIT；README 明确 some physics integration is laborious，环境重建不能等同于完整游戏。 |
| [BlenderLLM](https://github.com/FreedomIntelligence/BlenderLLM) | 指令 → bpy 建模脚本；附 BlendNet 和 CADBench | README 明确基础建模、多轮与材质限制；模型、数据集卡应各自核对许可，不推断统一授权。 |

Unity 的入口变化值得单列：[官方迁移文档](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli)说明废弃的是 `com.unity.ai.assistant` 内的旧 MCP server，CLI 的 `unity mcp` 仍受支持，第三方 MCP 也不受此弃用影响。网站应提供官方当前入口和独立的社区桥接入口。

## 建议在 Planning Map 中展开的验收层

1. **Plan**：先写核心循环、输入、胜负、重开和进度状态，限定一个能连续试玩的切片。
2. **Code / Scene**：让 agent 写代码，同时用编辑器、CLI 或 MCP 读取真实场景、资源绑定、日志与运行状态。
3. **2D assets**：统一画布、透视、角色比例、方向、锚点、透明背景、帧序、循环、命中时刻、atlas 和 tile 边缘。
4. **3D assets**：记录单位、轴向、原点、面数、材质槽、UV、LOD、骨骼、动画重定向、碰撞和导航；生成图看起来合理只覆盖其中一部分。
5. **Test**：分开测编译、玩法不变量、视觉布局、输入可达性、输赢与重开、长时间运行和性能；视觉 judge 与状态探针互补。
6. **Ship**：在目标设备或导出包中验收，记录引擎版本、资源来源、构建步骤和性能预算。

以上验收层是对资料与工程边界的综合规划建议，不是任何单篇论文的实验结论。
