# 引擎、渲染库与内容工具：来源和工程边界

核验日期：2026-10-18。主数据 `data/segments/engines.json` 共 22 条。条目按实际职责组织：Godot / Unity / UE 是游戏引擎，Phaser 是浏览器 2D 框架，Three.js 是 3D 渲染库，React Three Fiber 是 Three.js 的 React renderer，Blender 是内容创作工具。它们都不能直接标成“端到端游戏 agent”。

## 来源状态

| 资源组 | 实际核验范围 | 需要保留的说明 |
| --- | --- | --- |
| Godot | [官方文档](https://docs.godotengine.org/en/stable/)、[命令行参考](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)、[官方 demo 源码](https://github.com/godotengine/godot-demo-projects)、[引擎源码](https://github.com/godotengine/godot) | 文档与仓库可读。demo 的 master 对应开发引擎；稳定版本应选匹配分支。`--headless`、`--check-only`、`--import`、导出参数均在官方参考中，不据此承诺完整画面测试。 |
| Godot 测试 | [GUT 作者仓库](https://github.com/bitwes/Gut) | 确认 GDScript tests、CLI、测试替身和 JUnit XML。仓库列有 Godot / GUT 版本对应表，不能只取最新包。它是社区测试框架，不是官方引擎功能或 AI benchmark。 |
| Godot 社区实作 | [GDQuest 完整 2D 教程](https://www.gdquest.com/library/first_2d_game_godot4_vampire_survivor/)、[作者工程](https://github.com/gdquest-demos/getting-started-with-godot-4) | 阅读到完整脚本、失败状态、grounded / floating 排错和敌人数上限说明。教程标明 code MIT，而素材 CC BY-NC-SA；复用需分别确认。没有下载 ZIP 或实际运行项目。 |
| Unity | [Manual](https://docs.unity3d.com/Manual/index.html)、[Test Framework API](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/)、[测试用户指南](https://docs.unity3d.com/6000.2/Documentation/Manual/test-framework/test-framework-introduction.html)、[官方 2D 示例](https://github.com/Unity-Technologies/2d-techdemos) | `@latest` 本次返回 JavaScript 重定向页，已继续打开其 1.9 文档并遵循其中链接读取测试指南。确认 Edit / Play mode、CLI、跨帧 UnityTest；不是只根据重定向页推断功能。 |
| Unity 作者经验 | [Catlike Coding 的 Surface Contact](https://catlikecoding.com/unity/tutorials/movement/surface-contact/)、[运动系列](https://catlikecoding.com/unity/tutorials/movement/) | Jasper Flick 亲自搭建坡面与台阶测试、解释 ghost collision 和物理接触时序，属于一手工程经验。页面基于 Unity 2019.2.14f1，保留算法价值但不当作当前 API 文档。 |
| UE | [官方文档](https://dev.epicgames.com/documentation/en-us/unreal-engine)、[源码访问步骤](https://dev.epicgames.com/documentation/en-us/unreal-engine/downloading-source-code-in-unreal-engine)、[Automation](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-test-framework-in-unreal-engine)、[Lyra](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) | 正文可读。引擎源码须 Epic / GitHub 关联与授权；Lyra 通过 Fab / Launcher 分发，包含源码和内容，没有虚构一个公开 GitHub Lyra 仓库。 |
| UE 社区 | [Epic Developer Community](https://dev.epicgames.com/community/unreal-engine) | 地址可打开，但工具未返回可提取正文；因此仅收录为资源发现入口，不宣称核验了具体社区帖子的结论。 |
| Three.js | [作者源码](https://github.com/mrdoob/three.js)、[manual 入口](https://threejs.org/manual/)、[examples 入口](https://threejs.org/examples/) | manual / examples 首页主要是动态壳，源码 README 确认官方关联与库职责，仓库包含 examples / manual。条目不声称已逐个运行所有示例。 |
| Three.js 作者经验 | [Instanced Crowd 作者复盘](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928) | 阅读完整帖，确认作者用 InstancedMesh、数据打包、shader LOD 和分帧更新组织人群系统。硬件帧率是作者自报，清单没有转述为可普适性能结论。 |
| R3F | [官方介绍](https://r3f.docs.pmnd.rs/getting-started/introduction)、[源码](https://github.com/pmndrs/react-three-fiber) | 确认 React renderer 职责与 React major 版本匹配要求。对“无开销”等官方宣传性表述不做独立背书。 |
| Blender | [官方 GitHub 镜像](https://github.com/blender/blender)、[官方 Python quickstart 源文件](https://github.com/blender/blender/blob/main/doc/python_api/rst/info_quickstart.rst) | `docs.blender.org` 本次无法正常抓取；参考手册 / API 链接保留作入口，细节依据可读的官方教程源码。没有把抓取失败写成 Blender 文档不存在。 |
| glTF-Blender-IO | [Khronos 作者仓库](https://github.com/KhronosGroup/glTF-Blender-IO) | README 确认官方导出器、按 Blender 版本分支、validator 与 import / export roundtrip CI。main 可能领先稳定 Blender，不应直接混用。 |
| Phaser | [官方完整入门教程](https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game)、[框架源码](https://github.com/phaserjs/phaser)、[Phaser 3 示例库](https://github.com/phaserjs/examples) | 已阅读场景生命周期、Arcade Physics、静态碰撞体、动画和输入内容。示例库标题明确 Phaser 3，保留版本范围，不凭当前仓库日期推定全部示例兼容所有 major。 |

## 游戏开发规划的工程要点

- **统一版本信息。** 每个任务保存引擎、包、插件、渲染器与文档版本。Godot demo master、Three.js dev、Blender main 都可能比已安装运行时更新；agent 遇到 API 不存在时先查版本。
- **先建立最小工程反馈。** 引擎能启动、资源能导入、日志能读取、一个最小场景能运行之后，再扩展复杂玩法。headless、编辑器与实际导出运行时是不同测试面。
- **把状态与画面分别观测。** 单元测试检查纯逻辑，跨帧或 Play mode / Functional Test 检查生命周期；截图、输入轨迹与真实游玩检查最终体验。
- **物理问题往往依赖时序和配置。** Godot 的 grounded / floating，Unity 的 FixedUpdate / Update、接触法线、碰撞层和地面射线，Phaser 的静态 body 刷新都可能决定行为；仅重写控制脚本未必解决根因。
- **Blender → 引擎是一条转换管线。** 固定单位、轴向、物体变换、材质模型、纹理色彩空间、骨骼与动画命名，并检查 glTF / GLB 导出与实际运行时导入。合法格式、正确视觉和正确碰撞应分别验收。
- **Three.js 的灵活性伴随系统责任。** 渲染库可以与自主设计的物理、导航、ECS、输入、音频、存档组合；规划时明确由谁承担这些系统。R3F 解决 React 场景组织，不会自动决定模拟架构。
- **社区经验要保存复现条件。** 作者教程用于解释因果和工程取舍；关注使用版本、测试场景、硬件、源码和失败案例，不将单个演示或帧率当作能力排行。

MCP 与实际 agent 技能已放在 `agents.json`；Unity 当前 agent 插件及 CLI 生命周期信息由游戏 AI 条目维护，避免在引擎基础设施层重复计数。
