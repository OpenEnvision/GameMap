# 生产研究档案

查找生产任务所需的接口契约、资产检查、调试方法和服务条款。从下方某个阶段入手，再沿相关来源笔记和工单模板继续阅读。

## 查找相关证据

对于具体任务，先看[生产阶段路线](coverage-gaps.md#production-stage-coverage)，再沿链接阅读接口/产物契约和[拟议工单](work-orders.md#common-execution-contract)。该路线区分了上游 API 证据、预期输出、失败信号和验收门槛；可执行支持仍需要经过验证的目标环境。

| 需求                            | 档案                                                                                                                                                                                                                                   | 主要区别                                                                                                                                                                                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 驱动引擎、DCC 应用或原生 UI             | [引擎操作契约](engine-operations.md)                                                                                                                                                                                              | 编辑器/运行时范围、完成、取消、恢复、持久化、权威状态，以及区域设置/渲染/无障碍边界                                                                                                                                                                                                                                                                                       |
| 制作资产、进行本地化、检查音频，或准备多人游戏/构建工作流 | [生产研究](tools.md)                                                                                                                                                                                                 | 创作格式与运行时格式、渲染与文字塑形、测量与验收标准                                                                                                                                                                                                                                                                                                        |
| 通过模型和托管 API 生成或转换资产           | [生成式工具](../assets/generative-tools.md)                                                                                                                                                                                                | 异步回执与已完成输出、必需的后处理以及导出限制                                                                                                                                                                                                                                                                                                           |
| 在实验前审阅提供商条款                   | [生成式 API 边界](../assets/api-terms.md)                                                                                                                                                                                           | 输入/输出权利、提供商训练、对客户模型评估的限制以及会过期的下载                                                                                                                                                                                                                                                                                                  |
| 跟踪一个完整项目从资产制作到试玩的过程           | [完整示例集成](work-orders.md#complete-sample-integration-examples)                                                                                                                                                             | 固定的项目/依赖范围、真实场景与交互接线、构建报告、现有冒烟测试及拟议的更广泛验收                                                                                                                                                                                                                                                                                         |
| 评估设计师目标与游玩风格权衡                | [面向设计师的试玩证据](../ecosystem/2d-3d-development.md#designer-facing-playtest-evidence)                                                                                                                                                                     | 人工编写的谓词、人格反馈、[路线比较](../ecosystem/2d-3d-development.md#sonic-trajectory-visualization-comparing-training-populations)、[交互式代理预测](../ecosystem/2d-3d-development.md#susketch-interactive-surrogate-feedback-with-a-separate-evidence-boundary)和乐趣推断的局限；[生产机器人集成](studio-case-studies.md#ea-autoplayers-learned-locomotion-inside-controlled-test-scenarios) |
| 评估生成的关卡或游戏规则                  | [游戏 AI 证据](../ecosystem/2d-3d-development.md#mariogpt-requested-constraints-and-executable-verdicts)与[规则设计搜索](../ecosystem/2d-3d-development.md#gavel-rule-design-search-and-verdict-boundaries)                                                                       | 请求的约束与测得的输出、控制器判定与预测路径，以及已发表结果与已发布代码                                                                                                                                                                                                                                                                                              |
| 审阅生成的对白草稿                     | [编剧反馈与角色参考资料](tools.md#dialogue-drafting-preserve-preference-edited-acceptance-and-character-references)                                                                                                         | 相对偏好与编辑后接纳、持续演变的参考资料、自动风格评分，以及未经验证的生产采用情况                                                                                                                                                                                                                                                                                         |
| 将录制对白转为口型动画                   | [口型提示契约](native-operations.md#recorded-dialogue-and-mouth-cue-validation)                                                                                                                                                     | 识别与时间类别、产物完成、项目口型形状映射和播放时钟验证                                                                                                                                                                                                                                                                                                      |
| 验证 3D 编辑及其观察覆盖范围              | [Code4Scene 保持性](../assets/selection.md#7-code4scene-target-recovery-and-collateral-changes-require-different-comparisons)与 [InfiniBench 相机判定](../assets/visual-evidence.md#infinibench-constraint-verdicts-and-camera-coverage) | 目标修复与附带变化、模式/容差限制、求解器判定与编译，以及计划访问与可见证据                                                                                                                                                                                                                                                                                            |
| 捕获可复现的多视角资产证据                 | [BlenderProc 捕获契约](../assets/visual-evidence.md#blenderproc-multiview-capture-contracts)                                                                                                                                              | 采样视角与必需覆盖范围、相机/深度约定、实例映射和持久化流的完整性                                                                                                                                                                                                                                                                                                 |
| 检索已存储帧和失败区域                   | [FiftyOne 检索契约](../assets/visual-feedback.md#7-fiftyone-persistent-retrieval-over-capture-evidence)                                                                                                                                 | 父级/标签标识、可变视图、采样图像复用、过时索引和查询清单                                                                                                                                                                                                                                                                                                     |
| 在编辑后保留时序掩码证据                  | [SAM 2 状态生命周期](../assets/visual-evidence.md#sam-2-temporal-mask-state-contract)                                                                                                                                                       | 不可变片段标识、提示替换、重置与重新加载、传播覆盖范围，以及 logits 与已接受的掩码                                                                                                                                                                                                                                                                                     |
| 定位截图区域和编辑器控件                  | [OmniParser 坐标契约](../assets/visual-feedback.md#6-omniparser-frame-scoped-gui-regions-and-coordinate-contracts)                                                                                                                      | 单次解析内的局部 ID、xyxy 与 xywh、裁剪/缩放变换、推断语义以及范围独立界定的模型条款                                                                                                                                                                                                                                                                                 |
| 选择视觉证据或改进使用工具的智能体             | [视觉证据与执行框架研究](../assets/visual-evidence.md)                                                                                                                                                                                           | 诊断指标与玩法正确性、推断状态与权威状态、优化与最终评估                                                                                                                                                                                                                                                                                                      |

## 更深入的操作证据

关于工作室一手生产叙述和相关研究解释，请使用[工作室案例阅读路线](studio-case-studies.md#find-a-production-lesson)：人工构建世界的修订、按要求提供的环境方向线索、易读的玩家建造与人工设计的破坏、可玩迭代与交接、流式加载就绪、渲染预算、生物开发与角色/穿行行为、地点历史、可选任务引导及叙事/对白修订、无障碍、测试判定、情境音频、失败重建、人工编写的行为、战斗可读性和玩家体验。每个案例都保留其历史来源语境以及失败/验收边界；拟议方案不是可运行的集成。

- [类 Cadle 仓库导入](../cadle-repositories.md)：完整的所请求 212 个候选项语料及其参考项目，包含当前仓库身份、来源范围、复用限制和已有覆盖情况

- [智能体接口证据](../evaluation/agent-interfaces.md)：选定现有桥接中，固定来源版本的执行权限、写入/撤销边界和测试判定局限

- [资产选择与视觉反馈创建](../assets/selection.md)：候选排序、首个可接受结果验证、多视角偏好模型和细化反例

- [视觉反馈机制](../assets/visual-feedback.md)：证据选择、裁剪/时序记忆、生成资产选择和受控执行框架比较；[主动裁剪检查](../assets/visual-feedback.md#active-visual-inspection-frozen-model-search-versus-learned-tool-use)区分 ZoomEye 和 DeepEyes，而[历史与记忆控制](../assets/visual-feedback.md#visual-history-reuse-external-memory-and-controlled-exposure)涵盖 HistPrune-GUI、MementoGUI 和 EMemBench

- [生产调试](debugging.md)：GPU 捕获与计时完成、着色器/设备移除证据、物理恢复、已发布资产检查、流式加载预算和[保留内存诊断](debugging.md#memory-lifetime-across-repeated-production-cycles)

- [基准可复现性](../evaluation/benchmarks.md)：公开发布与隔离矩阵、经源码检查的 OpenGameEval 生命周期/判定，以及拟议的公平 piRSI 比较，包括整场锦标赛复现、配对不确定性、受保护的最终评估，以及固定来源版本的 GEPA 预算/缓存/恢复边界；[在线适应与变更级审计](../evaluation/benchmarks.md#online-harness-adaptation-and-change-level-audit)补充 Harness² 的发布/核算边界和明确标为拟议的晋级/继承审计；[游戏编辑循环与规格恢复](../evaluation/benchmarks.md#game-edit-loops-reusable-players-and-specification-recovery)比较 RSIGame 检查点选择、Recursive Game Creator 策略/评估器契约和 GameReplica 的黑盒规则恢复；其[上游 GameCraft 契约](../evaluation/benchmarks.md#gamecraft-bench-the-upstream-replay-to-score-contract)区分回放失败、裁判失败、聚合以及提供商专属证据

- [玩法状态与持久效果](../evaluation/gameplay-state.md)：叙事检查点、异步命令、数据库事务、固定来源版本的 Yarn 取消与变量恢复、原生回放重建、物理状态恢复和奖励核对

- [游戏开发评估](../evaluation/development-evaluation.md)：另外七项创作/修复/QA 研究，包括 GameASG-Bench 声明的测试接口和 GBQA 的发布/协议区别，以及评分、产物可用性和可复现性局限

- [原生操作细节](native-operations.md)：36 行操作，涵盖引擎创作、DCC 批处理和音频中间件生命周期，以及输入送达、[光照持久化](native-operations.md#lighting-bake-completion-and-persisted-scene-association)、FMOD 回调/状态/虚拟化和[音频捕获完整性](native-operations.md#runtime-audio-observation-and-capture-integrity)；[浏览器过场对白字幕与说明字幕](native-operations.md#browser-cinematic-subtitle-and-caption-delivery)补充加载、提示时间和可见文本门槛

- [生成交付契约](../assets/generation-delivery.md)：任务核对、产物过期、变换和资产获取

- [资产验证契约](../assets/validation.md)：交换、组合、材质/几何处理、[过场动画剪辑时间线交接](../assets/validation.md#cinematic-editorial-handoff-preserve-time-coordinates-and-declared-features)、字体、输入/网络和动画契约，以及[高斯泼溅交付](../assets/validation.md#gaussian-splat-editing-and-delivery)、[精灵元数据/播放](../assets/validation.md#sprite-atlas-metadata-and-playback-delivery)和[瓦片地图转移](../assets/validation.md#tile-map-identity-geometry-and-runtime-delivery)

- [生产工单](work-orders.md)：九条拟议链路，带有完成、失败、恢复和持久化门槛，以及[版本化资产发布](work-orders.md#versioned-asset-publication-and-consuming-scene-ownership)和[完整示例集成](work-orders.md#complete-sample-integration-examples)

- [工作室生产案例](studio-case-studies.md)：一手历史工程叙述，与编辑拟定的验收设计分开呈现

- [来源修订版本](../evaluation/source-revisions.md)：选定的已检查上游文件，附精确修订版本和主张边界；其他档案保留各自的固定来源版本清单

- [覆盖情况与剩余工作](coverage-gaps.md)：生产阶段缺口、接口语义和本地目录查询示例

- [假设到工单的保真度](../assets/visual-evidence.md#discoveryrsi-preserve-the-hypothesis-through-task-compilation)：DiscoveryRSI 论文协议与已发布脚手架、任务示例和检查点可用性的区别；[Minecraft 团队协作](../assets/visual-evidence.md#minecraft-teamwork-adjacent-execution-harness-evidence)提供一个单次运行的玩法示例，涉及持久状态、取消归属和权威事件

- [联网观察与反馈](studio-case-studies.md#valorant-separate-predicted-views-from-authoritative-results-and-visible-feedback)以及[迭代与合并就绪](studio-case-studies.md#legends-of-runeterra-separate-iteration-success-from-merge-readiness)：Riot 的历史生产叙述，将时序、证据范围、逻辑环境和结构化失败记录联系起来

## 维护审阅

[目录审阅覆盖情况](../evaluation/review-coverage.md)记录了本轮对全部 109 张现有卡片的审阅、实质性修正、来源阅读局限，以及剩余档案审计范围。

## 从来源到验收测试

对于每项集成：

1. 说明工单和目标项目。选择一项已有文档的操作，并记录其来源版本、前置条件以及编辑器/运行时上下文。
2. 区分请求受理、作业完成、输出可用、状态已保存和冷启动重开后的持久化。对没有文档说明的转移保持未知。
3. 明确定义失败与恢复：重试幂等性、回调丢失、部分导入、进程退出、取消确认、过时句柄和孤立的远程工作。
4. 保留证据：源项目修订版本、命令与参数、工具/服务版本、时间戳、原始产物、哈希和权威状态检查。固定仓库来源版本并不等于固定了已安装工具或模型权重。
5. 在声称支持执行之前，先运行一个范围受限的夹具。然后测试实际工单和一个回归场景。将文档、拟议测试和已复现结果分开。

## 重要的剩余缺口

本资料集中未执行任何引擎、DCC 应用、付费生成式 API 或完整游戏生产工单。除非档案引用了范围更窄的已记录结果，否则项目特定的任务副作用、输入到帧的对齐、持久取消、资产依赖修复、平台认证和商用许可确认仍未解决。可变文档和服务条款需要在实施时重新检查。

首批目录新增项复用经验证的现有发布者标识，或以文字标明独立维护者。在整理官方品牌证据期间，其他已研究工具仍可通过链接的档案访问。仓库的徽标与来源检查并未放宽。

- [可破坏表面制作](studio-case-studies.md#rainbow-six-siege-author-destruction-as-a-gameplay-surface-with-material-rules)：历史 Siege 材质/切割器控制，以及分别进行的视觉、碰撞、玩法和伤害观察
