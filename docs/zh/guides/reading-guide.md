# 给手上的项目找对参考资料

找对资料能省不少时间。手上的游戏还在用 Phaser 3，拿着 Phaser 4 的技能包照做，很容易把一次小改动变成引擎升级。先弄清当前要解决什么，以及你实际用的版本。

## 先写清问题与约束

写下哪里出了问题、在哪儿能看到、什么还得照常工作。“给这款 Phaser 游戏加触屏操作”可以用来开搜。“在小屏手机上一边移动一边开火，键盘操作还得能用”，就足以筛掉一批不相关的示例。

## 选能回答当前问题的集合

| 当前问题 | 先准备什么 | 去哪里找 | 下一步具体产出 |
| --- | --- | --- | --- |
| 哪个工具能产出所需文件或结果？ | 引擎、平台、文件格式、预算 | [资源库：工具与平台][resources]；按分类和开发阶段缩小范围 | 两个候选的输入、输出与集成差异 |
| 这个 API 或工作流怎样使用？ | 确切版本和操作 | [指南与示例][learning]；格式和底层 API 查[技术参考][reference] | 一份源码示例和相关文档章节 |
| 能从完整游戏中学到什么？ | 机制、维度与目标平台 | [游戏案例][examples]；查看试玩、源码和归因链接 | 一个参考项目及值得研究的部分 |
| 哪种代理集成适合现有环境？ | 编码客户端、引擎、允许的操作 | [代理工具箱][agents]；组合客户端、资源类型和引擎筛选 | 客户端、指令和桥接层的组合 |
| 应当用什么材料做测试？ | 故障、预期状态、可接受的数据条款 | [测试资料库][testing]；组合用途、维度和许可组 | 一个小型测试夹具及可观察的通过、失败条件 |
| 某种研究方法是否相关？ | 表示方式、任务、算力和比较基线 | 学术工作查[论文][papers]；精选资源查[研究与基准][resource-research] | 阅读短名单和实验问题 |
| 某个仓库有哪些可查证据？ | 仓库名或所需能力 | [仓库研究][research]；查看主题、审阅阶段、快照和许可 | 固定版本的来源位置及尚未解决的主张 |
| 怎样把操作变成可重复的生产流程？ | 所需产物、责任归属、失败与恢复行为 | [生产研究](../production/overview.md) | 一份范围明确的[工作单](../production/work-orders.md) |

资源库默认打开“工具与平台”。寻找教程、论文或技术 API 时，切换到相应集合；不确定结果属于哪里时，搜索全部集合。在代理工具箱中，客户端筛选只选出明确列出该客户端的集成；通用资源开关会扩大范围。仅有模型名称，还不能确定需要的客户端、文件访问权限或引擎桥接层。

## 场景一：给已有浏览器射击游戏适配触屏

需要移动端控制方式时，可以从 [Starshake][starshake] 开始：条目分别链接完整原始项目和移动端适配项目，Sandbox 明确指定 **Phaser 3.90.0**。先记录这个版本和源码修订。

打开 [Codex + Phaser 集成][phaser-agents]，比较官方工作流、Phaser 桥接和引擎 Skill。Skill 面向 Phaser 4：先决定维护现有版本还是迁移，再选择与该决定相符的命令。

在目标手机上走一遍开局、移动、射击和重开。重点试两件事：同时按移动和开火；拇指滑出按钮再松手。看方向会不会卡住、会不会误触旁边的键。按钮多大、彼此隔多远，在真机上定。[游戏无障碍指南](https://gameaccessibilityguidelines.com/ensure-interactive-elements-virtual-controls-are-large-and-well-spaced-particularly-on-small-or-touch-screens/)讲了小而密的触控键为什么难用。

留下原项目的代码和资产声明。在[制作任务单](../production/work-orders.md)里写明基于哪个版本打补丁、怎么启动，以及触屏和键盘各怎么验。记下手机型号和横竖屏方向，比一句“已支持移动端”有用。

## 场景二：定位 Godot 资产导入回归

重新导入后动画异常时，先准备 Godot 版本、源资产、导出设置、预期片段和出错场景。在[采用开放许可条款的 3D 管线测试来源][pipeline-tests]中，比较 Godot 官方演示、Kenney Animated Characters 和 Khronos glTF Asset Generator，选出小型基线。

如果改用 Khronos glTF Sample Assets，需要清除开放许可筛选：它属于**混合**条款，应查看所选模型自己的声明。根据条目提出的检查项目及来源链接，选择与故障症状相符的夹具。

用[资产验证笔记](../assets/validation.md)明确比较内容，再用[生产工作单](../production/work-orders.md)约定保留的输入和失败产物。检索结束时，应已有选定夹具及修订、一组可复现的导入操作、预期结果和需要采集的证据。[关卡设计指南](level-design.md)回答另一类问题：怎样选择并检验空间玩法。

## 场景三：判断世界模型是否符合交付目标

先确定可交互环境需要的是可编辑的引擎场景、可执行的状态模型，还是由动作控制的视频。比较 [Marble][marble] 的场景导出与 [WorldCoder][worldcoder] 的代码世界模型，再用[世界模型笔记](../ecosystem/world-models.md)，把 GameNGen 和 Oasis 放入神经模拟这一分支理解。

沿着实际需要的方法查看论文、代码和发布链接。在论文页区分研究论文与支撑参考资料；产物审阅描述的是链接检查，不代表已复现分数。在仓库研究页，实现检查和固定证据帮助定位已阅读的材料，限制说明则指出还需要测试什么。

明确一个任务、可取得的发布版本、算力额度、基线、输出表示和成功指标。先记录缺失的导出能力或代码组件，再安排实现工作。用[开发评估](../evaluation/development-evaluation.md)和[基准复现](../evaluation/benchmarks.md)把这项主张转为有明确边界的对照实验。

## 带走一份别人能执行的简报

资源库可以收藏并导出 Markdown。游戏案例、代理、论文和测试资源可以直接复制条目链接，再记下选中的上游修订或发布版本。剩下这些内容，写给下一位接手的人看：

- 问题与目标平台：
- 现有项目／引擎／修订：
- 选定来源及适用理由：
- 输入、权限与服务费用：
- 所需输出及允许的修改：
- 检查、失败证据与未决问题：
- 第一项有明确范围的任务：

切换语言时，保留项目名、标识符和上游网址的原始拼写。它们能帮助重新找到候选，来源修订与任务简报则保留了实际做出的选择。

[resources]: /resources/?collection=tools
[learning]: /resources/?collection=learning
[reference]: /resources/?collection=reference
[examples]: /examples/
[agents]: /agents/
[testing]: /testing/
[papers]: /papers/?scope=research
[resource-research]: /resources/?collection=research
[research]: /research/
[starshake]: /examples/phaser-starshake/
[phaser-agents]: /agents/?client=codex&engine=phaser
[pipeline-tests]: /testing/?use=pipeline&dimension=3d&terms=open
[marble]: /resources/marble/
[worldcoder]: /resources/worldcoder/
