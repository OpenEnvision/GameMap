# 工作室生产案例与验收经验

团队需要作决定时，这些制作记述才最有用：保不保美术的手工覆盖，能不能接受过期预览，要不要降运行成本，还是该改交接。找最接近当前决定的案例，也读清当时放弃了什么。借鉴的是适合自己项目的判断过程，不是照搬工作室的数字或工具栈。

接到“加快皮肤制作”的要求时，先挑一次刚完成的交付，复盘它在哪里等待、转手，又在哪里被退回修正。Ubisoft Montréal 的 [Siege 流程记述](https://montreal.ubisoft.com/en/value-stream-mapping-applied-to-video-game-production-the-rainbow-six-siege-case/)让参与制作的组长一起梳理任务流转；文中报告，改进所得被投入原排期内的质量提升。这与缩短日历工期是不同的制作选择，也决定了自动化该优化什么。

带着三个问题读对应案例：

- 时间花在创作、等依赖、反复审阅、重建，还是修被退回的交件？导出器加速只能帮助它实际改变的那一段。
- 哪些作者决定必须保住：修过的遭遇、材质例外、动画接触，还是特定语言的一句对白？引入重新生成前先找到负责人。
- 怎样才算这次交付更好：漏出的缺陷更少、同一日期前多几轮美术迭代，还是交付日提前？先与制作及接收工种确定真实目标，再决定能否用单项任务耗时衡量成功。

例如，着色器导出很快，技术美术却总要到引擎里修材质分配，就该看材质交接和消费场景案例，而不是 GPU 预算案例。把失败交件和修正一起留在工单里，案例才能帮助接收团队审阅一项具体决定。

## 主要结论

1. 将资产就绪程度划分为多个状态：已创作、已转换、依赖完整、已加载、已初始化、已激活、已保存、已重新打开。
2. 将预览捷径与发布验收分开。有用的缓存预览或过期预览并不等于完全反映当前状态的构建。
3. 在性能证据中保留硬件、驱动程序、缓存状态、内部渲染分辨率以及确切的引擎分支信息。
4. 将行为覆盖、回归覆盖和艺术质量视为不同的验收维度。
5. 不仅记录成功的 API 调用，还要记录负面结果和不受支持的回滚路径。

## 查找生产经验

从一个生产问题出发，按阅读顺序查看对应的历史案例。这些路线涵盖本案例集中的所有案例。阅读顺序只是编辑安排的导航，并非实验顺序；共同经验是 GameMap 的指导建议，不是复现实验的比较结果，也不是可运行的集成。

| 生产问题                      | 建议阅读顺序                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 检查内容                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 世界修订如何保留精心设计的游玩体验？        | [Dead Cells 房间拼装](#dead-cells-generation-must-preserve-the-authored-experience) → [Far Cry 5 程序化反馈](#far-cry-5-stale-previews-and-excessive-automation-can-invalidate-feedback) → [Spider-Man 遭遇保留](#marvels-spider-man-preserve-and-revalidate-authored-encounters-after-world-edits) → [Ghost of Tsushima 生物群系效果与方向提示](#ghost-of-tsushima-biome-changes-must-propagate-into-environmental-effects) → [Phantom Liberty 白盒布局](#cyberpunk-2077-phantom-liberty-blockouts-preserve-constraints-not-frozen-layouts) → [Tears of the Kingdom 建造](#tears-of-the-kingdom-make-construction-rules-readable-without-prescribing-one-solution) → [Siege 可破坏表面](#rainbow-six-siege-author-destruction-as-a-gameplay-surface-with-material-rules) | 保留推进流程、放置约束和创作控制；编辑后重新检查下游导航与效果、未修改区域、预期路线以及清晰可辨的交互可能性           |
| 团队能否在反映当前状态、值得信赖的可玩构建上迭代？ | [Uncharted 早期可玩迭代](#uncharted-drakes-fortune-early-playable-iteration) → [编辑器修订完整性](#editor-revision-integrity-and-team-iteration) → [Destiny 2 资产流水线](#destiny-2-asset-pipeline-scalability) → [Remedy Northlight 组合](#remedy-northlight-an-edit-can-succeed-without-changing-the-composed-world) → [Rainbow Six Siege 交接](#rainbow-six-siege-map-handoffs-before-optimizing-production) → [Runeterra 构建门禁](#legends-of-runeterra-separate-iteration-success-from-merge-readiness)                                                                                                                                                                                                                                                    | 建立可玩基线；区分构建身份、预览时效性和实际生效的组合结果；统计整个交付链中的等待与返工                     |
| 流式加载的内容何时才真正可用？           | [Horizon 激活与流式加载](#horizon-asset-activation-and-streaming) → [Cyberpunk 声学图](#cyberpunk-2077-streamed-data-must-become-a-usable-graph-not-merely-resident-bytes)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 区分驻留、初始化、激活与可用查询；检查共享依赖、扇区连接、跨多帧的就绪过程以及缺失的物理输入                   |
| 性能节省会付出怎样的可见质量和创作工作代价？    | [Fortnite Nanite 资产预处理](#fortnite-nanite-asset-conditioning) → [Fortnite 阴影预算](#fortnite-shadow-budgeting-and-failure-cases) → [Fortnite 光照与可读性](#fortnite-lighting-budget-and-gameplay-readability) → [Ghost of Tsushima 光照](#ghost-of-tsushima-lighting-approximation-costs) → [PSO 预缓存局限](#pso-precaching-production-limits)                                                                                                                                                                                                                                                                                                                                                                                                        | 将可见性、可读性和时域伪影与 GPU 及首次使用成本一起比较；保留硬件、引擎修订和缓存状态，以及人工创作投入           |
| 生物、角色和移动方式的修改是否保留预期玩法？    | [Horizon Forbidden West 机械兽开发](#horizon-forbidden-west-carry-player-opportunities-from-creature-brief-to-in-game-asset) → [Learned Motion Matching](#learned-motion-matching-integration-limits) → [Spider-Man 角色导出](#marvels-spider-man-engine-validation-and-crowd-budgets) → [Uncharted 4 攀爬](#uncharted-4-preserve-feedback-and-authoring-control-across-climbing-contacts) → [Horizon 移动](#horizon-zero-dawn-contact-timing-spatial-correction-and-traversal-authoring-are-separate-problems)                                                                                                                                                                                                                                     | 将预期提供给玩家的机会贯穿资产评审；按群体规模检查行为覆盖和导出后的变形；将探测、事件、接触时序与响应性及可编辑路线选择分开   |
| 叙事和对话修订是否保留历史、分支与表演？      | [The Division 2 地点历史](#the-division-2-author-layered-histories-for-discoverable-places) → [Horizon 任务图](#horizon-quest-graph-successes-and-rollback-limit) → [Hitman 可选路径引导](#hitman-expose-a-viable-approach-without-requiring-its-guide) → [Mass Effect 2 本地化](#mass-effect-2-carry-revision-and-branch-context-through-localization) → [Horizon Remastered 对话](#horizon-zero-dawn-remastered-new-dialogue-motion-invalidates-old-camera-assumptions)                                                                                                                                                                                                                                                                                | 明确地点历史层次、可选引导边界、回滚局限、分支与修订上下文及镜头依赖；将运行时措辞、时序和取景评审与导入或状态机有效性检查分开  |
| 玩家能否学会并使用替代反馈，其依赖是否就绪？    | [Forza Motorsport 无障碍](#forza-motorsport-co-develop-alternative-feedback-without-removing-player-decisions) → [Far Cry New Dawn 无障碍](#far-cry-new-dawn-accessibility-scope-must-include-dependency-maturity-and-testing-time)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 保留玩家决策，并持续获取残障玩家反馈；检查提示学习、组合控制、沟通质量、未完成的依赖以及验证时间                 |
| 测试判定能证明什么，还有哪些覆盖缺失？       | [League 自动化测试可靠性](#league-automated-testing-reliability) → [League 回放确定性](#league-replay-determinism-engineering) → [EA AutoPlayers](#ea-autoplayers-learned-locomotion-inside-controlled-test-scenarios) → [EA SUPERNOVA 选择](#ea-supernova-test-selection-has-its-own-cost-and-error-model) → [VALORANT 平台负载](#valorant-specify-the-workload-behind-a-concurrency-claim)                                                                                                                                                                                                                                                                                                                                                              | 区分可靠性、确定性状态、控制器行为、测试选择与平台负载范围；在采信判定之前保留被省略的测试、模拟替代组件、无效模拟和运行成本信息 |
| 网络观测是否与权威玩法结果及其反馈一致？      | [VALORANT 预测与反馈](#valorant-separate-predicted-views-from-authoritative-results-and-visible-feedback)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 区分预测观测、服务器评估和显示确认；保留时序不确定性、缓冲以及受历史范围限定的回溯策略信息                    |
| 玩法负载变化时，混音是否保留有用提示？       | [Prototype 2 情境混音](#prototype-2-consistent-source-assets-still-need-contextual-mix-acceptance) → [Overwatch 依听者而定的优先级](#overwatch-sound-priority-depends-on-the-listeners-gameplay-situation)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 检查重叠混音状态、过渡连续性、监听模式、有意抑制和提示识别                                    |
| 能否根据收到的证据重建故障？            | [Bungie 分布式崩溃证据](#destiny-a-local-symptom-can-require-a-distributed-evidence-set) → [Valve 转储溯源](#valve-retain-the-build-artifacts-that-make-a-dump-interpretable)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 区分相关联的报告与完整采集；在归因到源码前要求匹配的构建产物，并将诊断与复现分开                         |
| 创作的行为和遭遇时序是否产生预期体验？       | [F.E.A.R. 规划与执行](#fear-inspect-the-information-and-constraints-behind-a-characters-plan) → [God of War 近距离镜头战斗](#god-of-war-keep-a-readable-mental-map-during-close-camera-combat) → [Left 4 Dead 节奏](#left-4-dead-expose-pacing-state-without-treating-it-as-measured-player-emotion) → [Valve 游玩测试方法](#valve-playtesting-select-evidence-for-the-experience-question-being-asked)                                                                                                                                                                                                                                                                                                                                                    | 区分符号规划有效性、感知信息时效性、空间预期、实际遭遇、代理指标与状态控制以及人的体验；保留创作和解释方面的局限         |

这些材料是历史开发者叙述和研究说明。源文章、幻灯片和精选图片都是阅读材料，不提供获授权的游戏资产、工作室私有工具或可执行的 GameMap 集成。所提议的验收方案仍未实现，也未执行。要将经验转化为项目专用测试，请从[通用执行契约](work-orders.md#common-execution-contract)开始，并保留[建议的证据封装](#recommended-evidence-envelope-for-proposed-recipes)。[完整示例集成范例](work-orders.md#complete-sample-integration-examples)另行介绍了已检查的上游项目与现有测试范围，而非 GameMap 的执行结果。

## Fortnite Nanite 资产预处理

来源：[Fortnite Nanite 资产预处理](https://www.unrealengine.com/tech-blog/bringing-nanite-to-fortnite-battle-royale-in-chapter-4)
背景：2023-01-26；UE5.1 Fortnite Chapter 4

**已发表的证据。**  Epic 发现，对于这些内容，不透明几何植被比遮罩面片更快。风动画从 Houdini Vellum 烘焙到纹理中，通过树枝 UV 数据索引。Preserve Area 解决了远处树冠消失的问题；其用途仅限于受影响的植被。World Position Offset 边界可能导致几何体消失，或使剔除过于保守。

**拟议的可供智能体执行的方案。**  在固定相机路径下比较植被预处理方案，涵盖近远处树冠覆盖、动画边界、基础通道和阴影耗时。在目标硬件上比较面片与几何体。记录源网格、UV 编码和风烘焙修订。将这一历史优化视为待验证假设，而非普遍规则。

## Fortnite 阴影预算与失败案例

来源：[Fortnite 阴影预算与失败案例](https://www.unrealengine.com/tech-blog/virtual-shadow-maps-in-fortnite-battle-royale-chapter-4?lang=en-US)
背景：2023-01-26；UE5.1 Fortnite Chapter 4

**已发表的证据。**  移动的太阳与植被动画削弱了阴影缓存的效果。限制失效更新频率会引入页面伪影；靠近相机的树木开销很高。Epic 为未缓存的太阳阴影分配预算，并使用诊断控制台变量定位占用页面面积过大的非 Nanite 对象。阴影代理的收益主要体现在近距离，并非普遍适用的远处 LOD 节省。

**拟议的可供智能体执行的方案。**  使用在密林中仰视、改变一天中的时刻，以及穿越室内外光照环境的行进场景。采集页面失效、GPU 耗时和闪烁伪影。比较冷启动视图与稳定视图。确保任何分辨率或缓存策略修改都可撤销，并结合性能变化评估美术方向。

## Fortnite 光照预算与玩法可读性

来源：[Fortnite 光照预算与玩法可读性](https://www.unrealengine.com/tech-blog/lumen-brings-real-time-global-illumination-to-fortnite-battle-royale-chapter-4?lang=en-US)
背景：2023-01-26；UE5.1，明确注明后续修复

**已发表的证据。**  针对主机 60 帧每秒的目标，Fortnite 为 GI 和反射分配了约四毫秒，并选择软件追踪。植被遮蔽、水面条纹、曝光剧变和昏暗室内需要修复或美术控制。一项临近发布才完成的水面修复被明确指出未包含在公开 UE5.1 版本中。

**拟议的可供智能体执行的方案。**  分别记录内部渲染分辨率与显示分辨率。跨移动相机下的水面、密集植被和室内过渡评估光照改动；在测量 GPU 成本的同时评估可读性和时域稳定性。标记引擎分支与修订，避免将已发布游戏中的效果误认为名义上的同一公开版本也具备的功能。

## PSO 预缓存的生产局限

来源：[PSO 预缓存的生产局限](https://www.unrealengine.com/tech-blog/game-engines-and-shader-stuttering-unreal-engines-solution-to-the-problem)
背景：2025-02-04；UE5.2 的历史引入过程与 UE5.5 的局限

**已发表的证据。**  随包缓存依赖已发现的内容排列组合，可能遗漏动态材质变化。加载时预缓存会缩小组合范围，但驱动缓存使后续运行产生实质差异。文章指出，全局图形着色器是 UE5.5 的一项缺口，移动端预缓存超时也是首次使用卡顿的另一项风险。

**拟议的可供智能体执行的方案。**  分别标记冷驱动缓存和热缓存的性能运行。测试皮肤、材质替换、质量预设和新流入对象。记录 GPU、驱动、RHI、着色器内容修订、缓存状态和加载完成情况。不要在未经批准的诊断中清除用户缓存；应使用隔离的测试配置。

## 编辑器修订完整性与团队迭代

来源：[编辑器修订完整性与团队迭代](https://cdn2.unrealengine.com/workflow-on-fortnite-whitepaper-final-181633758.pdf)
背景：Epic 历史白皮书；确切发布日期尚未确定

**已发表的证据。**  Epic 描述了不匹配的二进制模块引发崩溃和内存损坏，以及旧编辑器丢弃未知序列化属性的情况。其解决方案是在资产中标记编辑器构建的变更列表，并阻止旧编辑器使用新版本创建的资产。UGS 展示构建结果和人工反馈，取代了缓慢的版本提升瓶颈。

**拟议的可供智能体执行的方案。**  在智能体打开或重新保存项目前，比较编辑器构建身份、模块、插件修订与资产来源。保留可丢弃的工作区并编写清单。使用预定消费这些资产的构建执行重新打开检查。编译成功的绿色标记必须与资产完整性或玩法验收结果分开。

## Destiny 2 资产流水线的可扩展性

来源：[Destiny 2 资产流水线的可扩展性](https://media.gdcvault.com/gdc2018/presentations/Moro_Brandon_Bungies_Asset_Pipeline.pdf)
背景：Brandon Moro，Bungie；GDC2018 幻灯片

**已发表的证据。**  Bungie 将高度互联的任务图替换为更小的逐资产图、显式依赖、资产级缓存和加载时引用。报告解释缓存复用与失效原因。本地迭代可以有意接受过期的环境遮蔽或缺失音频，说明预览时效性不同于完整的生产输出。

**拟议的可供智能体执行的方案。**  将预览构建与可发布构建建模为不同的契约。逐资产保存依赖闭包、输入哈希、缓存命中或未命中原因以及过期例外。将图遍历和打包与转换执行分开分析。在发布验证中拒绝仅供预览的宽松依赖；绝不将缓存复用标记为新执行的转换。

## Horizon 资产激活与流式加载

来源：[Horizon 资产激活与流式加载](https://d3d3g8mu99pzk9.cloudfront.net/AstridHuntjens/Streaming%20the%20world%20of%20Horizon%20Zero%20Dawn.pdf)
背景：工作室链接的演讲；列表日期为 2023-03-21；Horizon Zero Dawn 系统

**已发表的证据。**  Decima 将反序列化、链接解析、初始化与世界激活分开。内容图使用流式链接划分依赖；初始化遵循依赖顺序。文件采用引用计数，共享对象只加载一次。该系统超越了走廊式加载，并在迭代期间避免打包。

**拟议的可供智能体执行的方案。**  将已加载、已初始化和已激活暴露为不同就绪状态。用快速旅行、折返和依赖重叠对流式加载施压；监测驻留字节数和延迟激活。检查卸载一个使用者时，不会使其他地方仍在使用的共享内容失效。这是一项拟议的跨引擎测试，而非公开的 Decima API 绑定。

## Horizon 任务图的成功经验与回滚局限

来源：[Horizon 任务图的成功经验与回滚局限](https://www.guerrilla-games.com/media/News/Files/GDC2017_Szczepanski_BuildingNonLinearNarrativesInHorizonZeroDawn.pdf)
背景：Leszek Szczepanski，Guerrilla；GDC2017 幻灯片

**已发表的证据。**  任务步骤构成因果图，使用有限的动词词汇。完成步骤会开启或关闭图中的区域，从而支持非线性路径与重复模式生成。演讲指出了一项失败：故事隐喻不支持逆转先前已完成的事件；其动词词汇也需要扩展。

**拟议的可供智能体执行的方案。**  根据带类型的动词与可达性生成任务测试，再覆盖保存与重载、放弃、失败、重复事件和回滚。将叙事质量评估与状态机有效性分开。在创作前报告不支持的动词与不可逆转换。本方案需要项目专用的任务状态适配器。

## Learned Motion Matching 的集成局限

来源：[Learned Motion Matching 的集成局限](https://www.ubisoft.com/en-us/studio/laforge/news/6xXL85Q3bF2vEj76xmnmIu/introducing-learned-motion-matching)
背景：Ubisoft La Forge；2020-07-30 研究说明

**已发表的证据。**  动作匹配从提供的动作中选择，因此分别提供行走与喝水示例并不会创造边走边喝的动作。特征库与动作库会消耗越来越多的内存。Learned Motion Matching 旨在替换查找机制；过渡混合、脚部锁定和 IK 仍是相关的集成步骤。

**拟议的可供智能体执行的方案。**  在选择或生成动作前建立行为覆盖矩阵。测量轨迹误差、脚部滑动、手部接触、过渡不连续性、内存和运行时成本。纳入留出的行为组合，并明确标记训练覆盖缺失。研究演示不能证明存在可访问的生产 SDK，也不能证明引擎集成成功。

## League 自动化测试的可靠性

来源：[League 自动化测试的可靠性](https://www.riotgames.com/en/news/automated-testing-league-legends)
背景：Jim Merrill，Riot；2016-02-26 的历史 BVS 系统

**已发表的证据。**  Riot 将执行器、游戏驱动和测试脚本分开，使用 RPC 命令与状态查询。条件等待取代了固定时长休眠。测试要先经过试运行期才会阻断构建；阻断部署的冒烟检查与功能覆盖分开。所报告的系统补充了手动测试，而非将其消除。

**拟议的可供智能体执行的方案。**  暴露明确的观测与判定条件，而非任意延时。区分基础设施故障、断言失败、超时和不稳定测试隔离。通过驱动专用配置，在本地和 CI 中保留同一场景。在反复获得可靠性证据、足以支持相应策略之前，不要将新生成的测试提升为构建阻断项。

## League 回放确定性工程

来源：[League 回放确定性工程](https://www.riotgames.com/en/news/determinism-league-legends-implementation)
背景：Riot 工程；2017-06-20 的历史服务器系统

**已发表的证据。**  Riot 针对玩法关键状态，而非全部内存。它记录逐帧输入和可变时间步长，统一时钟与玩法 PRNG 使用，并隔离网络状态。基于指针的排序与未初始化值导致了分歧。只有种子并不足够。所报告的服务器使玩法更新实际上保持单线程：延迟的工作线程会以确定方式阻塞主线程，游戏数据则预先加载以避免 I/O 竞争。

**拟议的可供智能体执行的方案。**  在宣称某次运行可复现之前，定义状态投影与容差。记录输入顺序、初始配置、时钟增量、RNG 状态、内容与构建身份以及异步完成策略。比较逐帧哈希并定位首次分歧。将结论限定于已测试的平台和构建；视觉相似不等于确定性回放。

## Dead Cells：生成必须保留创作的体验

**一手来源与范围。**  Sébastien Benard 亲历撰写的 [Dead Cells 关卡设计](https://deepnight.net/tutorial/the-level-design-of-dead-cells-a-hybrid-approach/)显示日期为  **2020-02-15** ，它是对一篇早期文章的再发布，原文章链接现已重定向。应将其视为再发布日期，而非游戏构建日期。他的[个人简介](https://deepnight.net/about/)确认了他在 Motion Twin 担任首席开发者与游戏设计师的角色。

**已发表的叙述。**  Benard 表示团队无力完全手工制作，而程序化原型虽然让战斗常玩常新，却生成了不连贯的关卡。混合方案保留了固定的世界推进流程、各生物群系的手工房间，以及指定路径和特殊房间的人工设计图。候选房间必须满足图的接口和用途；怪物放置还增加了数量与兼容性约束。 **作者于 2022-09-06 的回复** 称，由于移植 Switch 的困难，蛮力方法已发生变化。回复未说明修订后的实现或发行版本；不要将其标为已验证的 Wave Function Collapse。

**工作流模板。**  将视觉多样性与保留设计意图分开。在拼装房间前，记录所需推进流程、房间用途、移动可供性和遭遇约束。一份有用的拟议验收材料应包含图、选中的房间 ID、碰撞与移动检查，以及附有代表性视角的可玩过程记录。独立于图有效性，评估预期节奏和生物群系特征：连通的地图仍可能节奏失当。增加矛盾或无满足条件房间的结果，而非用成功的最终图片掩盖反复随机尝试。

**局限。**  这是开发者的回顾性证据，并非受控比较，也不是经验证的当前实现。可用的集成及任何对 AI 创作者的收益，都需要独立证据。

## Far Cry 5：过期预览和过度自动化会使反馈失效

**一手来源与范围。**  Étienne Carrier，Ubisoft，[Far Cry 5 的程序化世界生成，GDC 2018](https://www.gdcvault.com/play/1025557/Procedural-World-Generation-of-Far)，附 [145 页一手幻灯片 PDF](https://media.gdcvault.com/gdc2018/presentations/ProceduralWorldGeneration.pdf)。活动列表确认其为  **GDC 2018** ，但未确认确切演讲日期。结论针对历史上的 Far Cry 5 流水线，而非公开的 Houdini/Dunia 版本。[SideFX 托管的演讲页面](https://www.sidefx.com/community/far-cry-5/)日期为  **2018-06-05** 。

**已发表的叙述，PDF 第 139–143 页，每夜重建的描述见[第 10–11 页](https://media.gdcvault.com/gdc2018/presentations/ProceduralWorldGeneration.pdf#page=10)。**  技术上支持渐变式生物群系绘制，但重叠颜色难以调试，而且获得可接受的结果并不需要渐变。单独缓存的地形数据节省了部分处理，却要求美术在改造地形后重新烘焙。遗漏刷新使本地结果与正确重建的每夜世界不同；团队于是将地形数据生成移到消费这些数据的工具内部。Carrier 还表示，美术指导要求的茂密森林妨碍了 AI 和大型动物导航。生产中的折中方案以玩法需求限制密度。尽管提供了自动雕刻功能，美术仍偏好手工塑造河床。

**补充性的设计边界。**  Ubisoft 于 [2018-03-26 对副关卡设计总监 Alain Greco 与 Andrejs Verlis 的访谈](https://news.ubisoft.com/en-us/article/16TjVZmAtD85EWcvHtxHXL/far-cry-5-creating-curiosity-in-a-familiar-world)区分了自然资产的程序化放置与以手工制作为主的地图。导航、玩家推进和依托景观的寻路仍需有意识的设计。

**工作流模板。**  反馈应标明生成所查看场景的依赖版本。一项拟议的回归测试夹具是在缓存后修改地形，比较本地预览与干净重建，并验证下游遮罩、放置和导航使用了预期修订。将前后视图与输入哈希、重建状态一起保留；不要把视觉上吸引人的过期预览当作最终构建的证据。将密度和风格判断与针对不同智能体尺寸的导航和路线可读性检查结合起来。将美术覆盖操作视为期望保留的控制，而非自动认定为需要消除的缺陷。任何自动化权衡都应涵盖用户可见的复杂度与可复现性，而不只是转换运行时间。

**局限。**  这些是明确的生产轶事，没有受控的效应量。所审阅的材料没有提供内部工具、可复现的基准或当前引擎兼容性。其经验是提出检查的依据；并未证明视觉智能体或测试框架有所改善。

已审阅幻灯片文件的 SHA-256：`6ef919fd07383a56038502a39fb9f73c2c8c7c606da4685958dadac113804c93`。它标识的是所检查的文档，而非引擎构建或复现的工作流。

## EA AutoPlayers：受控测试场景中的学习式移动控制

**一手来源与范围。**  EA/SEED 的 [CoG 2023 论文页面](https://www.ea.com/seed/news/cog23-challenges-deploying-rl-agents-game-testing)说明了在 Battlefield 2042 与 Dead Space (2023) 中进行的生产集成实验。[论文，arXiv v1 日期为 2023-07-19](https://arxiv.org/html/2307.11105v1)，介绍的是历史内部系统，而非可下载的 GameMap 适配器。核查日期为 2026-10-19。

**已发表的工程观察，第 II–V、VII 节。**  现有脚本式 AutoPlayers 保留了测试目标，学习式控制器则处理直升机与零重力移动。导出的 ONNX 模型与游戏数据一同打包；部署后的推理复用了训练时的观测采集代码。结构化状态避免了逐智能体渲染的成本及其对图形变化的敏感性。作者区分了原型、精简测试场与生产环境，明确警告移除视觉内容会改变基于图像的观测。在他们的实验中，加速模拟导致停放的直升机穿过地面。他们建议使用稳定的游戏修订，在生产变化时持续测试训练设置，并在脚本控制已经有效之处保留它。这些是集成经验，而非对缺陷发现量、覆盖率或玩家乐趣提升的受控估计。

**发布与迁移边界。**  所检查的论文和 EA 论文页面未证实内部训练器、AutoPlayers 集成、游戏项目或训练后模型已公开发布。仅有 ONNX 输出格式不足以复现其观测模式、游戏侧控制或专有运行时。未验证当前安装方式，也未验证资产或模型的使用权。

**比较模板。**  将脚本基线与替换一个明确指定控制器的方案进行比较，保持场景目标与失败判定标准不变。记录游戏修订、观测和动作模式、模型身份、时间步长以及测试场与生产环境的差异。检查生成场景时，在视觉证据之外保留结构化转换记录。在使用精简资产或加速模拟降低评估成本前，分别验证预期视觉观测与碰撞观测；统计无效模拟和重新训练的成本，不要将其悄然丢弃。将路线完成、探索到的行为、经分诊的缺陷以及设计师或玩家判断作为独立结果。这项拟议测试设计尚未实现或评估。

## Marvel’s Spider-Man：世界编辑后保留并重新验证已创作的遭遇

**一手证据与范围。**  David Santiago 的 [SIGGRAPH 2019 论文](https://history.siggraph.org/wp-content/uploads/2022/09/2019-Talks-Santiago_Procedural-System-Assisted-Authoring.pdf)描述了 Insomniac 历史上的 PS4 生产流水线。请阅读第 1–3 节，尤其是第二页的修复与诊断工作流。

**已发表的叙述。**  街道与小巷曲线、建筑基元提供了最初的程序化城市，随后由美术进行细化。遭遇放置使用地面与建筑几何、道路数据、排除体积和已占用位置，并应用密度、净空和朝向约束。一个逮捕示例要求放置点间至少相距 150 米，与人行横道相距超过九米。城市变化可能使已打磨的遭遇失效。标记机制区分了经过调整的内容：重新处理时，如果关键要求仍满足，可予以保留；也可移除不可用的放置，或标记可修复的放置。检查输出包括调试相机坐标、着色体积和空间标注。验证可调整、标记或移除无效资产与玩法标记。

**工作流模板。**  让重新生成形成可审阅的变更集。一项拟议夹具是在人工调整过的遭遇旁编辑街道或屋顶，然后保留旧产物、新输入修订、保留决定及理由。编辑后测试净空与路线有效性，并在每个标记位置采集相机视图。破坏性清理前应要求项目专用审批；记录未解决的放置，而非将剩余有效项报告为全面成功。

**局限。**  这是作者报告，而非可下载流水线或经过测量的智能体基准。论文未证明无损保留、普遍有效的放置距离或自主艺术判断。其关于放置改进的“AI”用语，不是 LLM 或生成式智能体参与的证据。

## Ghost of Tsushima：生物群系变化必须传递到环境效果

**一手证据与范围。**  环境美术负责人 Joanna Wang 的 [2020 年 7 月叙述](https://blog.playstation.com/2020/07/09/crafting-the-world-of-tsushima/)与首席 VFX 美术 Matt Vainio 的 [2021 年 1 月解析](https://blog.playstation.com/2021/01/12/how-stunning-visual-effects-bring-ghost-of-tsushima-to-life/)介绍了原版游戏的生产。它们探讨了艺术控制以及不断变化的世界的维护成本。

**已发表的叙述。**  Wang 描述了有意限制各生物群系内的植被种类，并使用程序化工具来适应后续类型与密度变化。Vainio 报告称，将落叶效果附着到密集树木实例上成本过高；激活距离较短时，玩家骑马经过可能看不到落叶。基于遮罩生长独立发射器会产生空缺，而局部规则修复又可能破坏其他森林。替代方案通过跟随相机的氛围系统采样运行时生物群系地图，并结合地形、材质和风输入。一些效果保留了生长工作流。两种方法都能让环境编辑携带其效果变化，无须全面手工替换。

**工作流模板。**  将生物群系编辑视为跨系统的依赖变更。一项拟议评审是移动森林边界，重新生成或刷新受影响的输出，并检查编辑区域与未改动的参照区域。纳入骑乘移动与远处视角，在静态图像之外记录空缺、生物群系不匹配和粒子成本。保留艺术分布控制和显式例外；不要让成功的局部修复悄然冒充全世界回归检查。

**局限。**  这些文章提供的是第一手失败与恢复叙述，而非开放工具实现或受控的生产率结果。VFX 页面如今额外显示一个 2026 年 5 月日期；没有修订历史说明哪些段落有变化。应保留原版游戏背景，而非将其视为当前引擎规格。

### 将既有艺术母题转化为按需方向提示

在[官方 2020 年 5 月问答](https://blog.playstation.com/2020/05/29/ghost-of-tsushima-your-questions-answered/)中，Jason Connell 表示，风与运动是早期美术指导目标。开发数年后，团队尝试让既有的风指示目的地，随后加以改进，并将其用途扩展到可选的收集品搜索。Connell 认为这个想法奏效，这是定性判断，未报告相关研究。Wang 的[环境美术叙述](https://blog.playstation.com/2020/07/09/crafting-the-world-of-tsushima/)介绍了通过植被、布料和粒子表现玩家召唤的阵风。生产经验是复用可识别的环境表达语言，提供玩家主动请求的提示，同时保留其氛围作用。

**拟议的评审模板。**  从一个可达目的地开始，定义环境常态行为、玩家请求和预期方向含义。检查可见载体在目标改变后是否保持一致，以及在稀疏和密集环境中是否仍清晰可辨。分别观察注意到提示、理解方向和找到可通行路线的过程。保留视图、目标、请求时间和路线；询问不熟悉游戏的玩家认为提示意味着什么。此模板尚未执行。

这些文章最初发表于原版游戏发布前，但也显示了较晚日期：2020 年 5 月 29 日／6 月 10 日，以及 7 月 9 日／8 月 6 日。段落级修订情况未知。它们既未证明经测量的理解或无障碍收益，也未说明寻路或障碍处理逻辑。收集品辅助不代表覆盖所有物品；方向提示本身也不能确定可通行的路线。

## Cyberpunk 2077: Phantom Liberty：白盒布局保留的是约束，而非冻结的布局

**一手证据与范围。**  CD PROJEKT RED 于 2024 年 10 月发布的 [No Easy Way Out](https://www.cyberpunk.net/en/news/50902/blocktober-3-andrzej-gielzak) 与 [The Killing Moon](https://www.cyberpunk.net/en/news/50935/blocktober-5-sebastian-mcbride-and-mariusz-kubow) 设计师叙述，包含开发与最终图像及具体创作决策。这些是回顾性示例，而非当前可编辑的项目文件。

**已发表的叙述。**  Andrzej Giełzak 描述了在复用城区占地范围的同时，将一个主线任务地点缩减为较小的支线任务规模。中央雕像旨在防止螺旋上行时迷失方向。战斗撤退、连续相机视图与跳跃路线支撑了这一推进过程；义体医生房间在等待过场演出要求期间保持相对低细节，同时保留与长廊的连接。另一方面，Sebastian McBride 回忆 Maglev 大约有五种差异显著的布局，优先考虑围绕任务关键亭子的通行流线。Mariusz Kubów 则描述了在生产后期更改 Viewing Gallery 的基础布局，并加入经过原型验证的悬挂火箭。

**工作流模板。**  将预期体验与白盒布局一起存储：范围、可识别地标、各玩法路线、过场演出依赖，以及草稿需要回答的问题。布局修订后，为每种受支持的玩法比较对应视图与移动轨迹。让暂定空间在视觉上仍显得是暂定的。区分对叙事和空间意图的批准，与对光照、装饰、碰撞或最终运行时行为的批准。

**局限。**  发表的截图是经过筛选的产物。它们没有公开所有中间变体、源场景、游玩测试数据或确切的游戏构建修订。这些报告展示了迭代与范围适应，但不能证明某个特定布局、工具或评审方法造成了已发布结果的质量。

## Marvel’s Spider-Man：引擎验证与人群预算

**一手来源与范围。**  Insomniac 角色 TD Noah Alzayer 的 [GDC 2019 年 3 月演讲](https://media.gdcvault.com/gdc2019/presentations/Alzayer_Noah_SuperHumansOf.pdf)，讨论历史游戏流水线。

**已发表的生产叙述。**  外部面部绑定交付物是干净文件，而 Insomniac 将自身新增内容另行保留。一项工具将姿态与扫描反馈转化为引擎内对比视频。相对蒙皮加载在替换身体权重时保留了面部权重。三角化产生了 Maya 中不存在的变形伪影；自定义三角化改善了轮廓。对于开放世界中的平民和警察，即便简化的独立面部绑定也过于昂贵。将头部与身体绑定合并取消了逐头关节定位；因此大多数面部关节使用平移而非旋转。通用锁骨权重也导致穿插。参见 PDF 第 21–26、34–49 和 52–64 页。

**工作流模板。**  按预期人群密度评估导出后的角色。保留对齐的 DCC 与运行时视图、绑定和拓扑修订、覆盖来源以及帧耗时和内存测量。测试供应商第二次交付是否保留了本地修正。分别评判轮廓、表情、穿插和人群成本。这需要项目专用的导出与采集路径。

## Ghost of Tsushima：光照近似的成本

**一手来源与范围。**  Sucker Punch 的 Jasmin Patry，[实时武士电影](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)，SIGGRAPH 2021；[作者托管、带演讲者备注的 PDF](https://www.glowybits.com/talks/real-time_samurai_cinema/real-time_samurai_cinema.pdf)。历史上的 PS4 时代生产。

**已发表的生产叙述。**  动态天空光照复用了烘焙可见性数据。完整传输矩阵因内存与采集成本而被放弃。薄壁室内暴露了漏光；锥形遮挡、平面与低分辨率阴影贴图仍不理想且成本高。可行的折中是将探针分类为室内与室外，并使用人工创作的表面遮罩对插值加权。备注明确权衡了运行时开销与创作负担。剩余局限包括静态烘焙数据，通常不包括可移动或可破坏对象、反弹光估计不准确，以及局部灯光不提供间接照明。参见 PDF 第 24–25、51–60 页。

**测试模板。**  测试薄墙、移动对象、局部灯光和变化的天空。保留遮罩与探针修订、前后视图和硬件耗时。将不受支持的光照贡献与回归分开；将人工标记投入与 GPU 成本一并统计。明确保留美术指导下的验收，而非自动选择最便宜的近似。

## Uncharted: Drake’s Fortune：早期可玩迭代

**一手来源与范围。**  Neil Druckmann 的第一手 [Uncharted 项目复盘](https://www.gamedeveloper.com/design/postmortem-naughty-dog-s-i-uncharted-drake-s-fortune-i-)，发表于 2008-10-08，讨论的是 Naughty Dog 原版 2007 年 PS3 游戏。这是回顾，而非独立评估。

**已发表的生产叙述。**  雄心勃勃的通用动画与 AI 系统变得过于复杂；团队转向针对性解决方案，使用分层的全身、局部与叠加动画，以及用于环境对齐的逆运动学。另一方面，过度复杂的工具开发延误了真正游玩关卡的流水线。计划中的可互换敌人部件也阻碍了敌人实现，最终被放弃。细微的敌人设计虽然近看可信，但在玩法距离下难以区分。参见动画与 AI 讨论，以及编号为 2–4 的生产失败小节。

**工作流模板。**  扩大创作范围前，要求先建立早期可玩基线。通过玩法相机和特写比较角色变体。在表现效果之外记录运动、接触行为和响应性。将实现延迟、返工和迭代时间与功能数量分开跟踪。这并不证明功能越少就普遍能改善游戏。

## Rainbow Six Siege：优化生产前先梳理交接

**一手来源与范围。**  Ubisoft Montréal 的[工作室叙述](https://montreal.ubisoft.com/en/value-stream-mapping-applied-to-video-game-production-the-rainbow-six-siege-case/)注明其依据为 Gaëlle Robert、Laura Metzlaff 和 Salomé Jugan 在 Ubisoft Developers Conference 2020 的演讲。文章确切发布日期未经验证。

**已发表的观察。**  团队绘制了干员与精英皮肤工作流，包括任务移交以及理想与实际时间。初始梳理耗时六个月。未做好准备的管理者高估了任务时长；不同管理者缺乏端到端视野，导致重复工作。精英皮肤的改进收益在现有三个月周期内重新投入质量提升。对于干员，团队选取两个相似角色，在九个月周期内比较，并报告其中一个交付时缺陷减少了 50%，但生产时间未缩短。文章未提供绝对缺陷数、严重程度分布或受控比较。

**工作流模板。**  针对整个交付链评估自动化提案。分别记录实际工作、排队、交接、返工和验收时间，以及每次转换所需的人员与产物。收集估计前让参与者做好准备，并比较足够相似的交付物。在选择指标前，定义目标究竟是缩短交付周期、增加创意迭代，还是减少漏出缺陷。保留质量与时间的权衡，不要自动把节省的任务时间换算成更快发布。拟议的智能体验收包应指出阻塞的依赖和负责的交接，而非仅报告自己的转换已经完成。

**边界。**  这份叙述支持工作流分析层面的经验。它并未证明存在可访问的 Ubisoft 生产接口，也未证明可泛化的缺陷减少效果。

## EA SUPERNOVA：测试选择有自身的成本与误差模型

**一手来源与范围。**  EA 作者撰写的 [SUPERNOVA，ICST 2022](https://arxiv.org/html/2203.05566v2)；检查的修订日期为  **2023-06-28** 。论文描述的是历史内部 SaaS；未验证任何公开集成。

**已发表的观察。**  基于风险的选择使用概率、影响和时间因素，配以按项目调优的权重，对手动和自动化测试进行排序。独立的提交预测使用梯度提升和源自 SZZ 的标签，作者讨论了这些标签的噪声。一组历史样本报告测试工时减少 55%。另一项年度规划比较包含 96 小时接入成本与 12 小时维护成本；作者估计首年测试规划节省约 75%。提交风险结果报告的宏平均精确率为 71%、召回率为 77%，但风险类别仅为 49%／66%，测试提交中有 214 个正例与 1,215 个负例。测试生成与学习式测试选择仍属于未来工作。

**工作流模板。**  将选择、执行与验收分开。存储候选测试总体、入选与省略的 ID、风险标准和权重、历史窗口及人工覆盖。评估节省时间时，同时考虑遗漏回归、缺陷严重程度、误报以及接入和维护成本。在优先排序器的选择之外保留受保护的审计样本，避免将观测减少误当成风险降低。使用风险分数阻止变更前，报告各类别表现和标签来源；对标记与未标记的变更都人工抽样检查。此处没有任何来源结果能验证以该分数取代视觉或玩法判断。

**边界。**  观察性的生产比较不能分离因果关系，也不能保证覆盖不变。其估计不是智能体测试框架的基准，也不是当前对外可用的证据。

## Remedy Northlight：编辑成功也可能不改变组合后的世界

**一手证据与历史范围。**  Vesa Paakkanen 的[使用 OpenUSD 构建游戏世界](https://presentations.remedy.fi/building-game-worlds-with-openusd.ppsx)与 Sebastian Eriksson 的 [Northlight 中的实时世界编辑技术](https://presentations.remedy.fi/real-time-world-editing-technology-in-northlight.ppsx)是一手 GDC 演讲，日期为  **2024-03-20** 。Remedy 明确于 [2024-08-27 公开发布了这些演讲](https://www.remedygames.com/article/explore-remedys-gdc2024-talks-on-creating-alan-wake-2)。尽管发布页面以 Alan Wake 2 为主题，Paakkanen 的第 19 张幻灯片指出，这条 USD 场景流水线的生产使用者是  **Control 2 与 Max Payne 1 & 2 Remake** 。它未证明 Alan Wake 2 发布时使用了新的世界编辑器。

**已发表的生产叙述。**  旧编辑器的手动导出工作流和不一致的复用概念促使团队开发替代方案。Remedy 将引用、变体和子层封装为可复用的“束”，动态构建其层栈，以避免共享 Perforce 文件冲突并支持个人层。组合引入了另一类故障面：属性可能写入成功，却被更强的意见隐藏。重命名节点可能破坏覆盖和关系。拟议的应对包括上下文可视化、更强意见指示器和大量配套工具；复用并未消除维护复杂度。参见 Paakkanen 第 8、52、63–64 和 73–82 张幻灯片。

Eriksson 区分了创作、磁盘和运行时表示，明确聚焦于 **实体和组件，而非资产转换** 。导出时的场景访问会记录依赖。打开场景或在构建机上导出时，执行完整的内存内导出，而非持久化缓存与依赖图；团队报告其生产级导出大致耗时数秒，并接受这些工作以避免磁盘数据过期。后续编辑重新导出受影响实体，并在运行中的游戏内重建其 ECS 组件。参见第 11、25–38、44–53 张幻灯片。这是对时效性与复杂度的有意权衡，而非普遍反对缓存的论据。

**验收模板。**  编辑验收记录应保留请求的目标层、写入的意见、最强的组合值、受影响依赖以及观测到的运行时结果。一项拟议夹具是编辑较弱变体、重命名被引用节点，并修改可见选区之外的依赖，然后比较实时编辑结果与干净重新打开和导出的结果。将“写入获接受”“可见变化”和“引用完整性得以保留”视为独立结果。将源模式与导出器版本独立于运行时布局记录。预览其他贡献者的层时应包含来源与预期组合顺序，并在破坏性清理前进行评审。这些检查需要项目专用适配器，且不能证明艺术验收通过。

**可用性边界。**  工作室发布的完整幻灯片是可访问的阅读材料。它们不提供专有编辑器、实时编辑服务、模式、项目内容或受支持的外部自动化 API。Eriksson 的未来工作第 78 张幻灯片列出了资产源 USD、进一步的 DCC 互操作及主机工作流。Paakkanen 已经介绍了 usdFBX 及共享与共同开发收益（第 42 和 83 张），因此这是尚未完成的范围，而非所有 DCC 互操作均不存在的证据。

## Cyberpunk 2077：流入数据必须成为可用图，而不只是驻留字节

**一手证据与历史范围。**  CD PROJEKT RED 音频程序员 Marek Bielawski 的 [GDC 2023 场次](https://gdcvault.com/play/1029282/Populating-the-World-With-an)及 [75 页一手幻灯片](https://media.gdcvault.com/gdc2023/Slides/pop_bielawski_marek.pdf)介绍了历史声学图流水线。确切游戏构建未说明；这不是关于后续补丁或 Phantom Liberty 的证据。

**已发表的生产叙述。**  对于 Night City 的垂直声音路径，依附地面的导航数据不足以胜任。选定方法是离线体素化几何体，并打包独立声学图。并行处理相邻扇区产生了一种不会崩溃的竞争，却改变了结果并破坏增量构建；所述调度约束不允许相邻扇区同时处理。运行时加载在构建附近图扇区的同时保留打包的区域数据。八叉树插入与节点连接各分配 0.5 毫秒帧预算，因此就绪过程可能跨帧。紧凑扇区标识还有一项已记录的传送边缘情况。NPC 听觉复用了该图，但其射线检测与图的组合需要在远处物理未流入时设置例外。参见 PDF 第 8、11–16、30、35–43 和 64–67 页。这些例子揭示了流式加载预算背后的正确性与驻留假设。

**验收模板。**  拟议验收应区分字节已加载、节点已构建、跨扇区链接已恢复，以及声音和听觉查询可用。在不同调度下比较干净构建与增量图构建；即便不发生崩溃，也要保留结构哈希和不匹配边的位置。测试快速旅行、叠层楼面、扇区边界以及物理驻留范围外的查询。在空间叠加图之外采集音频样本和 NPC 感知轨迹：视觉上完整的场景仍可能有错误声学行为。将预算耗尽或查询输入不可用，与真正的声音路径受阻分别报告。同时测量多帧激活延迟和逐帧成本，不要悄然将有界搜索失败转化为世界事实。

**可用性边界。**  公开幻灯片支持这份生产叙述；所检查的来源未公开工作室的图构建器、流式加载控制器、游戏项目或可复现基准。未验证内部工具访问权限或当今 REDengine 兼容性。

## Uncharted 4：在攀爬接触中保留反馈与创作控制

**一手来源与范围。**  Naughty Dog 的 [2022-10-18 攀爬回顾](https://www.naughtydog.com/blog/uncharted_4_climbing_legacy_of_thieves_collection_pc)，作者 Jonathon Dornbush，直接采访了动画总监 Jeremy Yates、首席游戏设计师 Emilia Schatz 和首席程序员 Ryan Broner。文章讨论 Uncharted 4 原始 PS4 时代系统及其在 The Lost Legacy 中的延续；发布日期对应后来的 PC 合集推出。

**已发表的生产叙述。**  在尝试耐力与自由攀爬后，团队降低了复杂度，使攀爬融入更大的游戏整体。模拟量伸手使用多圈可能的手部位置，以可调整动作捕捉墙及大量捕捉组合提供支持。全身 IK 协调手、脚与根节点，同时脚部寻找支撑边缘。工具允许实时移动手部抓点，并自动整合到岩石表面，从而实现不那么僵硬的路线。关键在于，即便没有可达抓点，方向输入也会产生可见的身体动作，帮助玩家调整意图。参见文章中的“攀爬时刻”“伸手”及结尾开发者观察。

**工作流模板。**  将交互反馈与成功附着或移动分开评审。一项拟议夹具是改变摇杆方向、幅度及抓点间距，包括不可达目标，然后保留输入时间戳、抓点修订、身体响应、接触变化和实际路线进度。环境编辑后，通过对应玩法视图检查手脚支撑。保留人工创作的路线选择，并结合游戏整体评估功能复杂度，而非认为额外模拟规则天然更好。这些检查需要项目专用埋点和对响应性的人工判断。

**边界。**  这份回顾没有提供公开实现、经测量的延迟或受控生产比较。其工具和动作捕捉覆盖不是可下载的 GameMap 能力，也不意味着允许复用游戏资产。

## Horizon Zero Dawn：接触时序、空间修正与移动创作是不同问题

**一手来源与范围。**  Guerrilla 游戏程序员 Paul van Grinsven，[Horizon Zero Dawn 广阔世界中的玩家移动机制](https://www.guerrilla-games.com/read/player-traversal-mechanics-in-the-vast-world-of-horizon-zero-dawn)，工作室页面日期为 2017-03-02；[87 页 GDC 2017 演讲](https://www.guerrilla-games.com/media/News/Files/GDC2017_VanGrinsven_PlayerTraversalMechanics.pdf)。它描述的是历史原版游戏系统。

**已发表的生产叙述。**  动画事件控制脚部放置时机；代码根据游戏状态与碰撞探测提供位置。地形探测使用前一帧的结果。悬空脚需要额外探测，以及不局限于垂直偏移的修正。翻越选择对障碍物与动画接触差异进行评分，而触发器和资产可禁用翻越。运动扭曲支持允许的时间窗口和人工创作的到达事件；拉伸位移可能产生不自然速度，通过调整播放速度来处理。复盘报告称，未完成的编辑器和可视化工具妨碍了移动路径创作，动画网络也变得十分复杂。参见 PDF 第 [28–32](https://www.guerrilla-games.com/media/News/Files/GDC2017_VanGrinsven_PlayerTraversalMechanics.pdf#page=28)、36–39、[48–54](https://www.guerrilla-games.com/media/News/Files/GDC2017_VanGrinsven_PlayerTraversalMechanics.pdf#page=48) 和 82–83 页。

**工作流模板。**  将探测采样帧、动画事件时间、所选接触点、运动扭曲窗口、到达目标和播放速率作为独立证据保留。一项拟议夹具是改变障碍物高度与深度以及不平整的脚部支撑，包括有意禁用的交互，然后比较接触质量、速度和响应。向作者提供可检查的解释，说明被拒绝的转换和探测样本的时效。除运行时结果外，还应评估设计师构建和修订可玩路线的难易程度；仅有可工作的移动算法，不能证明创作工作流可用。

**历史边界。**  第 [84 页](https://www.guerrilla-games.com/media/News/Files/GDC2017_VanGrinsven_PlayerTraversalMechanics.pdf#page=84)将动作匹配研究、玩家导航网格探索和全身 IK 列为未来计划。不要将它们报告为此实现已发布的功能。演讲未提供公开 Decima 适配器或受控的收益估计。

## Mass Effect 2：在本地化全过程传递修订与分支上下文

**一手证据与范围。**  BioWare 的 Ryan Warden 和 Chris Christou 在 [GDC 2010 大型 RPG 本地化](https://gdcvault.com/play/1012508/Localizing-Large)中发表演讲。公开的 [32 张幻灯片](https://media.gdcvault.com/gdc10/slides/Christou_Christopher_LocalizingLargeRPGs.pptx)，尤其是第 8–25 张，记录了历史上的 Mass Effect 流水线。他们[与 Jenny McKearney 合著的更完整 2011 年文章](https://revistas.uma.es/index.php/trans/article/download/3194/2944)，印刷页码第 43–51 页，补充了实现背景。这些是开发者叙述，而非当前 BioWare 接口文档。

**已发表的叙述。**  细致的按关卡本地化排期在开发反复变化中失效；工作转而跟随英语配音录制。改变含义的编辑触发重译，而经批准的细微编辑可免于重译。字符串历史将重大编辑与上次导出对比。对话交付保留了分支关系、说话者和听者上下文，以及时序限制。文章称，说话者分配不明确时，该对话不会送交翻译。导入前检查区分了可发出警告的缺失译文，与会阻止导入的单条字符串重复译文。录音脚本保留了周边对话和预期文件名。这些门禁针对不同故障类别；结构上可接受的导入仍可能含未翻译台词。

**回归模板。**  一份拟议回归包将稳定台词 ID 与源文、译文和音频修订、区域语言、分支、说话者和听者及时序约束配对。导出后修改台词，再交付旧译文，同时加入重复 ID 与缺失录音。在目标构建中测试所选分支前，要求明确给出过期、重复和不完整结果。比较实际说出的措辞、显示字幕和提示时序。将导入有效性、区域语言完整性与表演质量作为独立判定。保留对编辑是否改变含义的人工评审，不要把标点或字符数相似性当作普遍的语义判定器。

**局限。**  历史论文有意将每次导出视为涵盖所有适用语言；上文的逐区域语言交付跟踪是拟议的更强夹具。未证实内部数据库、预览器或游戏侧适配器已公开发布。所报告的工作流收益是回顾性的，没有受控的生产率或翻译质量比较。

## Horizon Zero Dawn Remastered：新的对话动作使旧镜头假设失效

**一手证据与范围。**  Nixxes 的 [2024-10-17 开发者文章](https://blog.playstation.com/2024/10/17/horizon-zero-dawn-remastered-a-deep-dive-into-its-enhancements/)， **生动的对话** 小节，包含高级技术美术 Mark Bazelmans 和动画师 Alexander Georgiev 的第一手叙述。内容涉及重制版历史上的 Nixxes／Guerrilla 生产。

**已发表的叙述。**  其流水线替换旧对话动画与事件，再让动画师在 Maya 中加载带角色参考和音频的对话选项，编辑后重新导出。Maya 无法复现 Decima 的自动眼部行为，因此使用瞄准辅助对象支持调整。面部替换也需要可编辑的转换流水线，而非简单覆盖。批量镜头更新不足以满足需要：幅度更大的新动作经常让说话者移出画面，需要人工镜头布局处理。共享角色光照支持在相似镜头间统一编辑，同时保留单独例外。

**工作流模板。**  将替换对话动作视为影响镜头和表现的依赖变更。一项拟议夹具是用幅度更大的动作替换克制的手势，然后在消费该内容的构建中，通过相同相机和时间点的采集比较每个受影响对话选项。分别检查取景、视线、服装穿插和音频同步。保留原始及替换片段 ID、事件变化、镜头修订和人工例外。将 DCC 辅助标记为近似，并验证最终运行时观测。动画导入成功后，在这些观测经评审之前，过场演出验收仍应保持待定。

**局限。**  叙述提供了具体失败与恢复案例，而非错误率或迭代节省的测量。文中描述了专有格式和内部工具；它们当前的外部可用性以及任何可执行 GameMap 集成仍未经验证。

## Forza Motorsport：共同开发替代反馈，同时保留玩家决策

**一手来源与范围。**  Turn 10 玩法与无障碍制作人 Neha Chintala 在 [2024-04-16 的第一手访谈](https://www.digipen.edu/showcase/news/neha-chintala-helps-steer-forza-motorsports-award-winning-blind-driving-assists)中描述了生产过程。她的 [2023-04-27 Xbox 文章](https://news.xbox.com/en-us/2023/04/27/forza-motorsport-accessibility-features-blind-driving/)提供了更早的发布前设计叙述。这些内容涉及 2023 年 Forza Motorsport，而非经过测量的当前版本行为。

**已发表的观察。**  Chintala 回顾了一次包容性设计冲刺，玩家访谈为功能提案和无障碍路线图工作提供信息。音频团队随后与盲人顾问 Brandon Cole 建立了持续协作。2023 年叙述介绍了两年功能开发期间来自盲人和低视力玩家的实时反馈。补充提示传达赛道位置、朝向、弯道和驾驶动作，同时保留玩家决策。提示说明与预览支持学习；团队明确警告存在学习曲线。另外，One Touch Driving 是在多个阶段与 Xbox User Research 及有行动和耐力障碍的参与者共同开发的，处理同时输入和持续按压问题。这些是开发者报告，没有受控效能结果或参与者级结果数据集。

**相关方法，而非 Forza 确切流程的证据。**  Xbox Research 的 [2024 年工作坊工具包](https://developer.microsoft.com/content/dam/microsoftgamedev/product-inclusion/workshop/Game%20Accessibility%20Workshop%20Toolkit%20-%20Activities%20and%20Instructions.pdf)建议尽早举办跨学科工作坊，聘请有偿残障顾问，在小组综合前先进行个人思考，并明确讨论排斥风险。PDF 第 43–45 页要求团队描述受影响的感官、运动和认知群体，并讨论对提案可行性的分歧。这份较晚的通用指导不可追溯归因于 Turn 10，也不能视为其结果的因果解释。

**工作流模板。**  选择替代输出前，先创作预期决策图：玩家必须注意、理解和决定什么，哪些动作必须保留在其控制之下？一项拟议夹具将一个驾驶或导航决策与可单独调整的提示和输入辅助相结合。记录提示含义、时序、竞争音频、输入并发、持续输入时长、熟悉过程和配置。分别检查上手教学、独立提示和组合提示。在技术轨迹之外保留残障玩家反馈；发出了声音或减少了按钮数量，并不能证明游玩易于理解且舒适。在镜头、混音或控制变化后重新测试组合。

**边界。**  材料确立的是历史生产方法和公开阅读资源。它们不公开 Turn 10 内部创作或测试接口，不授予游戏资产或录音使用权，也不验证外部智能体适配器。拟议夹具尚未执行。

## Far Cry New Dawn：无障碍范围必须涵盖依赖成熟度与测试时间

**一手来源与范围。**  Ubisoft 的 [2019-08-22 对首席玩法设计师 Ivan Kulbych 的访谈](https://news.ubisoft.com/en-us/article/OHSJ5XMqKzlG7Y0Tv8577/making-videogames-accessible-is-easier-and-more-impactful-than-you-think)是 Far Cry New Dawn 开发的第一手叙述。它以另一项生产问题补充了已有的 Far Cry 5 程序化世界案例。

**已发表的观察。**  团队依据 Far Cry 5 的无障碍反馈及与其他作品设计师的讨论选择工作。新增功能包括方向性声音可视化、可配置字幕、控制重映射和合作模式语音转文字。Kulbych 指出紧迫期限和缺失技术是约束：语音转文字库仍在开发中。他将预留更多无障碍测试时间描述为计划中的排期改进，同时承认字幕换行和转写质量仍需改进。他的 20/80 建议是个人经验法则，而非经过测量的生产率结果。

**工作流模板。**  将障碍、拟议替代方式、支撑依赖及其验证状态放在一起。对于拟议的合作沟通夹具，将方向性声音与其视觉字幕配对，将口头消息与转写文本配对；记录事件或消息身份、方向、送达时序、文本换行、语言和依赖修订。在这些提示出现时测试重映射后的控制。区分事件缺失、方向错误、延迟送达、转写错误和呈现不可读。在验收前安排代表性玩家评审与修复；功能复选框或成功的库调用不能证明沟通有效。明确标记依赖缺口和未测试的设置。

**边界。**  访谈未指明语音转文字库名称，未量化缺陷率，未公开测试协议，也未证明当前可用性。不应据此推断库身份、当前 Ubisoft 集成、复用许可或经过验证的智能体接口。拟议夹具尚未执行。

## Prototype 2：一致的源资产仍需情境混音验收

**一手来源与范围。**  Radical Entertainment 音频总监 Rob Bridgett 的[混音笔记：Prototype 2](https://www.gamedeveloper.com/audio/notes-from-the-mix-i-prototype-2-i-)，日期为  **2012-06-20** ，是第一手生产复盘，而非当前工具文档。

**已发表的叙述。**  团队结合了源素材电平一致性与游戏内情境平衡。实时声音替换和调校支持了迭代；三档对话压低强度应对不同密度的竞争声音。压低快照重叠造成缺陷，快照类别之间的过渡产生可听见的不连续。快照数量膨胀也成为查找导航问题。作者将侧链改进描述为未来工作。早先针对电视进行单一混音调整损害了影院版本；本作使用独立监听模式。Activision 的 AV 实验室提供了额外聆听反馈。仪表读数补充情境聆听，而非将其取代。

**夹具模板。**  一项拟议夹具是让一条任务台词经历安静移动、密集战斗、进入菜单与过场演出过渡，并包含重叠快照的激活和释放。保留内容和混音修订、活动快照身份、总线路由、事件时间线、监听模式和采集来源。将过渡与语音清晰度的比较，与响度测量分开。在项目支持的各播放模式下重复测试，并保留评审者观察。资产导入成功或源电平一致后，情境验收仍应保持待定。编辑混音前保留失败采集；局部修复后重新检查完整过渡序列。

**边界。**  此复盘确立的是生产决策和所报告的缺陷，而非缺陷率、标准化聆听协议、通用响度目标或可访问的专有工具。尚未执行任何拟议夹具。

## Overwatch：声音优先级取决于听者的玩法处境

**一手来源与范围。**  Blizzard 的 Scott Lawlor 与 Tomas Neumann 在 [GDC 2016 发表难以企及的目标：靠声音游玩](https://www.gdcvault.com/play/1023010)。[82 页一手幻灯片](https://media.gdcvault.com/gdc2016/Presentations/Lawlor_Neumann_Overwatch_Play_by_Sound.pdf)涉及原版游戏 **发布前的六对六测试版** ，而非 Overwatch 2。

**已发表的叙述。**  威胁模型考虑注意力、距离、攻击和危险技能。排序后的对象进入重要性分桶；其索引映射至中间件参数，武器示例展示了增益、优先级和滤波曲线。独立的语音示例展示了三个听者角色各自听到和被抑制的不同台词，按刺激、受众和类别组织。团队有意限制重要提示的变化以便识别，并承认创作上的权衡。这些是有文档记录的设计选择；幻灯片未证明经测量的反应时间改善。[PDF 第 13、19–23、61、64／66／68 和 71 页](https://media.gdcvault.com/gdc2016/Presentations/Lawlor_Neumann_Overwatch_Play_by_Sound.pdf#page=13)

**工作流模板。**  增加事件密度前，定义声音应支持的预期决策。一项拟议夹具是从多个听者视角回放同一遭遇，改变威胁、队伍关系和竞争事件。在共同观测时间线上记录候选项、分数、分桶分配、选中与抑制的对话、状态转换和采集输出。检查低优先级内容按预期受抑制时，必需提示是否仍可识别且归属正确。将有意抑制、事件未送达、原生语音拒绝、采集丢失和知觉掩蔽视为不同结果。评审优先级快速变化和提示恢复；成功生成每个事件，不足以证明玩家收到所需信息。

**边界。**  幻灯片未提供完整评分公式、同分决策策略、当前实现或可执行测试接口。其分桶图示不是通用音频声部预算。未试听视频演示，也未独立验证任何可听 A/B 结果或玩家表现改善。

## Destiny：局部症状可能需要分布式证据集

**已发表的叙述。**  Adam Pino 的 [Bungie 崩溃传播器文章](https://www.bungie.net/7/en/News/article/50410)，发表于  **2021-06-10** ，介绍了内部构建中跨客户端和主机的采集。独立的底层通信路径避免依赖可能已损坏的玩法连接。传播数据包携带共享事件标识符和有界跳数；次生报告被标记为诱发的上下文，而非独立故障。采集证据包括内存转储和日志。世界服务器被有意排除，因为其诊断价值不足以抵消中断代价。后来，仅日志采集允许测试继续，但证据较少。该功能从零售构建中移除。Bungie 报告其节省了有价值的调试时间，但没有受控测量。[一手叙述](https://www.bungie.net/7/en/News/article/50410)

**故障报告模板。**  拟议多人故障包应列出预期参与者与实际收到的产物，并附进程角色和事件关联。缺失主机必须保持可见。共享标识符不代表原子快照或同步时钟。测试前定义获批的采集范围与中断程度；绝不要据此推断可以终止已连接进程。可重复测试应有意遗漏一个参与者，验证采集器报告的是证据不完整，而非完整事件。

**边界。**  文章未确立符号保留、构建与内容身份字段、时钟对齐、数据包送达保证或公开采集器 API。这些需要项目自有契约。

## Valve：保留让转储可解释的构建产物

**已发表的叙述。**  Elan Ruskin 的 [Valve GDC 2011 演讲](https://gdcvault.com/play/1014351/Forensic-Debugging-How-to-Autopsy)介绍了按二进制 GUID 归档 PS3 可执行文件，并将转储关联到归档。调试器输入必须匹配源码、可执行文件、符号和数据。客户报告先进入队列，再进行符号处理并写入崩溃数据库。一个着色器示例提议匹配显卡与驱动以复现；它未展示已完成的修复。注意事项包括，即使 Xbox 360 完整转储也缺少物理分配页。Valve 还因安装与管理过于复杂而放弃依赖 Hadoop 的后端，回到更旧的基于 NFS 的版本。[幻灯片与演讲者备注](https://media.gdcvault.com/gdc2011/slides/elan_ruskin_programming_forensic_debugging.pdf)

**工作流模板。**  将产物接收、来源匹配、符号化、诊断与复现视为独立门禁。保留原始转储，并明确报告缺失或不匹配的模块。一项拟议夹具应分别提供正确符号、错误构建符号和无符号的情况；匹配符号应是尝试源码级归因前的必要门禁，而非诊断正确的证明。将怀疑的原因与已复现故障及已验证修复区分开。在变更前后比较同一场景与目标配置，并声明验收条件。

**边界。**  历史平台工具、服务器架构和截图不是当前兼容性或使用权声明。可访问的讲座不等于可用的 Valve 服务、主机 SDK 或可运行适配器。

## VALORANT：明确并发量声明背后的负载

**已发表的证据。**  Keith Gunning 的 [2020-12-15 工程叙述](https://www.riotgames.com/en/news/scalability-and-load-testing-valorant)报告在 VALORANT 测试分片上成功进行了一次 **两百万模拟玩家、持续三小时** 的测试。基于 Go 的模拟客户端复现了后台轮询和多步骤玩家操作。可配置玩家池控制登录和场景分配；发布前的活动频率用 League of Legends 数据估计。模拟游戏服务器测试了资源配置与结果记录，省略了玩法逻辑。测试从 1,000 名玩家开始，经修复和反复增量达到目标。验收要求所有被监控指标在整个运行中保持在界限内，包括操作结果、执行时间、CPU 和内存。通过这些界限不意味着零错误；叙述未证明整整三小时内始终保持两百万玩家。[一手叙述](https://www.riotgames.com/en/news/scalability-and-load-testing-valorant)

**负载测试模板。**  拟议负载测试记录应保留负载组合及依据、到达率与场景频率、随时间变化的并发量、持续时间、环境与构建身份、真实与模拟组件、生成器能力、验收阈值和失败区间。将目标数量、达到的数量与完成合格运行视为独立状态。保留逐步加压和恢复行为，而非仅报告峰值并发。在相同声明的场景组合与基础设施配置下比较变化。复用历史负载模型前，检查当前玩家行为是否使其假设失效。

**边界。**  这确立的是历史平台负载结果，而非完整客户端或真实游戏服务器的长时运行结果。它不能说明通宵稳定性、玩法内存泄漏或当今容量。未证实公开测试框架的可用性。GameMap 未复现该结果。

## F.E.A.R.：检查角色规划背后的信息与约束

**一手来源与范围。**  Monolith Productions 的 Jeff Orkin，[游戏实时规划的智能体架构考量](https://ojs.aaai.org/index.php/AIIDE/article/view/18724)，发表于  **2005-06-01** ，AIIDE 第 105–110 页。这是发布前的生产叙述。[出版方托管的六页论文](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365)可直接访问。

**已发表的叙述。**  Attack 与 AttackFromCover 均满足 TargetIsDead；两者均要求 WeaponLoaded，后者还要求 AtNodeType=kNode_Cover。成本设置偏好掩体而非立即开火（[第 108–109 页](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=4)）。黑板命令将决策连接到导航、动画和武器；目的地变化会在下一次子系统更新时启动寻路（[第 105–106 页](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=1)）。传感器分散执行昂贵测试并缓存结果，但将每次智能体更新限制为一个传感器导致反应延迟（[第 106 页](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=2)）。固定的、相对于智能体的符号，将符号前置条件限制为每个符号仅用一次的合取；更丰富的表达式未达到性能要求。独立的过程式上下文前置条件检查可运行任意代码（[第 107–108 页](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=3)）。门受阻的失败会为重新规划提供信息。缺少调度和复合动作，迫使设计师要求的序列通过限制性前置条件实现，降低了复用（[第 109–110 页](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=5)）。

**夹具模板。**  拟议调试夹具应保留所选目标、动作集修订、谓词、过程式检查结果、观测时间戳、预期成本、被拒绝的候选项、子系统命令及实际完成事件。有意在动作运行时改变路线；对照预期行为，比较失败检测、重新规划延迟和最终移动。添加设计师要求的动作顺序，并测试各边界的中断。分别评审运行时行为以及创作或解释它所需的投入。有效的符号规划应让导航可行性、动画完成、过期输入处理和设计师意图保持待验证，直到有观测证据。可把这些观察项目纳入调试夹具。

**边界。**  未证实受控的创作耗时研究、当今实现基准、可执行集成或 LLM 兼容性。不能将历史表示限制泛化到所有 GOAP 系统。论文中的作者报告并非独立复现结果；未执行任何拟议夹具。

## Left 4 Dead：公开节奏状态，但不要将其当作测得的玩家情绪

**一手来源与范围。**  Valve 的 Michael Booth，[Left 4 Dead 的 AI 系统](https://cdn.akamai.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf)， **AIIDE 2009** ，由 [Valve 出版物索引](https://www.valvesoftware.com/en/publications)确认。这是历史上首作的设计叙述。

**已发表的叙述。**  Booth 根据伤害、失能、跌出边缘以及附近感染者死亡估计各生还者的强度；交战活跃期间暂停衰减。团队最大值驱动 Build Up（积累）、Sustain Peak（维持峰值）、Peak Fade（峰值消退）与 Relax（放松）。峰值维持 3–5 秒；放松持续 30–45 秒，或在取得足够进展时结束。Peak Fade 保护恢复时间，避免被未结束的战斗侵占。既有特殊感染者可在放松期间攻击；首领不受此规则约束。Booth 将其描述为改变遭遇频率而非难度幅度，并承认强度估计很粗略。[PDF 第 79–82 和 92 页](https://cdn.akamai.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf#page=79)

**工作流模板。**  将预期体验设为显式设计输入：何时应累积压力、何时应有可能喘息，以及哪些创作事件可以覆盖这一过程？一项拟议夹具是在同一时间线上记录个体代理指标输入及其聚合、导演状态、转换及理由、请求的威胁数量、实际活跃威胁、遭遇时间戳和玩家进度。保留解释轨迹所需的构建、内容、控制器、难度配置和随机性。包含延迟结束的遭遇、滞留的特殊威胁、首领打断、玩家状态分化以及快速前进。分别断言转换策略与例外处理，以及实际恢复机会。在报告仅比较节奏时，不要悄然调整伤害、生命值或瞄准。由人评审产生的游戏过程，而非根据代理指标或完成标记来判定乐趣。

**边界。**  原文说明了该子系统如何调节节奏和难度。节奏与难度的区分适用于文中描述的子系统。此处未执行夹具或玩家研究。

## Valve 游玩测试：围绕所提体验问题选择证据

**一手来源与范围。**  Valve 实验心理学家 Mike Ambinder 的 [Valve 的游玩测试方法：经验主义的应用](https://cdn.akamai.steamstatic.com/apps/valve/2009/GDC2009_ValvesApproachToPlaytesting.pdf)， **GDC，2009 年 3 月** ，是带有游戏示例的历史方法叙述，而非当前研究协议。

**已发表的叙述。**  Ambinder 将聚焦乐趣的游玩测试与缺陷测试和平衡性测试分开。观察需要解释，可能受到观察者偏差影响；出声思考可能干扰游玩；小组提问可能引入锚定效应。聚合结果会掩盖极端情况和上下文。第 31 页的示例数字与第 42 页的问题被标为模拟内容。皮肤电导被描述为唤醒度的相关指标，存在混杂因素，且没有直接的输入输出关系；唤醒度与效价被加以区分。设计被视为通过迭代测试的假设。[PDF 第 5–6、16、20、24、31、35、42、46 和 51 页](https://cdn.akamai.steamstatic.com/apps/valve/2009/GDC2009_ValvesApproachToPlaytesting.pdf#page=5)

**工作流模板。**  修改遭遇前，写明具体体验假设及其证据需求。例如：玩家应能在峰值后识别恢复机会，理解后续威胁出现的原因，并保有是否前进的有意义选择。将四类记录分开：技术有效性、实际玩家行为、玩家自述的理解与体验，以及设计师对照简报的判断。将观测关联到同一修订和遭遇时间线。若研究设计要求个人回应与小组讨论两者兼有，应先收集个人回应；记录提问、协助与测试条件。保留离群过程、失败和提前退出。预先声明比较、参与者纳入标准、经验水平、停止规则与排除标准，不要事后只选成功运行。受控策略轨迹可证明导演遵循了规则；却不能证明这些规则产生了有趣、易于理解或紧张程度适当的游玩体验。

**边界。**  幻灯片中的方法警示没有提供经验证的通用乐趣分数、代表性参与者数据集或因果收益估计。本次审阅不提出生理测量建议，也未采集个人或生物特征数据。人工验收仍是独立且尚未开展的活动。

## 新增的具体文档化操作接口

- VSM 页面面积诊断控制台变量：已记录在 Epic 历史文章中；可用性仍需版本探测。
- Lumen 质量组配置：有文档记录的取值，并不声称设置它们即可保证帧预算。

## 拟议方案建议保留的证据封装

未来运行应保留项目与构建及插件修订、源资产身份、依赖清单、预期模式、确切的目标硬件与驱动、输入和相机调度、时基、相关情况下的随机状态、冷与热缓存标签、输出哈希、原生终态及验证器结果。将墙钟耗时与模拟时间和 GPU 耗时分开记录。在结构化测量之外保留视觉产物，避免预算改善掩盖几何缺失、动画损坏或光照不可读。

使用独立结果：已接受、因质量规则被拒绝、不受支持、基础设施故障、超时、已取消和无定论。在项目专用的状态驱动器与产物采集器存在之前，方案不可运行。

## 覆盖缺口与边界

- 无法访问 Decima、Snowdrop、Tiger 或 Riot 的私有生产自动化；这些案例确立的是经验，而非可安装连接器。
- 当前主机 SDK 认证、平台方工具和专有构建农场操作未获公开验证。
- 工作室指标是历史且内容专用的；它们不是拟议 GameMap 环境的基准结果。
- 已找到 Horizon 程序化放置演讲列表，但页面未能打开；此处不添加来自它的详细算法声明。
- 已找到 Sunset Overdrive 创作者演讲，但幻灯片 PDF 未能打开；不添加详细流式加载实现声明。
- 互换与色彩管理参考资料是这些案例研究的补充；仅有文件格式兼容性，不能证明导入资产保留了生产意图。
- 历史本地化、无障碍、音频混音和崩溃分诊案例记录了生产方法，而当前可执行流水线和代表性玩家结果仍未经验证。VALORANT 案例提供了历史上使用模拟替代组件的平台负载范围；真实玩法多人长时运行可靠性与公开的主机认证生产证据仍不完整。

## Tears of the Kingdom：让建造规则易于理解，但不规定唯一解法

**一手来源与范围。**  Nintendo 开发者访谈，日期为 2023-05-09：[第 4 部分](https://www.nintendo.com/us/whatsnew/ask-the-developer-vol-9-the-legend-of-zelda-tears-of-the-kingdom-part-4/)，“是什么让游戏具有‘The Legend of Zelda 风格’”，以及[第 5 部分](https://www.nintendo.com/us/whatsnew/ask-the-developer-vol-9-the-legend-of-zelda-tears-of-the-kingdom-part-5/)，“只要玩家认为能做到，就能做到！”已检查两篇完整访谈文本。这是 Nintendo 对发布时期生产讨论的英文翻译，而非技术性物理系统复盘。

**已发表的创作方法。**  在第 4 部分中，Fujibayashi 描述了通过用现有机制组装的原型提出物体建造方案。Dohta 和 Takizawa 介绍了设计师与程序员针对各类组合进行调整，包括物品专用的 Fuse 工作。可见的连接材料与反复出现的附着声音，让开发者觉得物体连接易于理解且令人满足。类似熟悉家用电器的形态，有助于传达原本超自然的装置。员工试玩既发现了精巧发明，也发现了省事的解法；团队有意兼容两者。第 5 部分中，Fujibayashi 介绍了将以往固定的箱堆改为可移动，同时用绳索或覆盖物标明有意不可移动的对象。Dohta 描述了用盖子区分不可打碎的罐子。该方法结合了可识别的组件表达语言、清晰的状态变化和可见标示的例外，为玩家自行设计解法保留空间。

**工作流模板。**  添加建造部件或修订关卡前，记录每个组件的预期用途、允许交互和可见例外。在拟议玩家评审中，询问陌生组件看起来能做什么，再将该预测与实际使用比较。测试附着、拆卸和有意不提供的交互；检查反馈是否区分它们。既评估简单可行的解法，也评估更复杂的建造，不要求任何一种复现设计师演示。保留组件与关卡修订、交互轨迹和玩家解释。可操作的组装与清晰且令人满足的建造体验，是两项独立判断。

**边界。**  这些是开发者报告的设计选择和定性观察。访谈没有提供受控可用性结果、穷尽组合的覆盖、求解器实现、数值稳定性阈值或性能测量。它既未证明运行时确定性，也未证明任意玩法正确性、智能体兼容性或生成资产质量。物理集成与技术验证缺口仍未填补；Nintendo 的游戏资产和内部工具不是可复用的 GameMap 能力。

## The Division 2：为可探索发现的地点创作分层历史

规划地点环境线索时，可参考此案例：玩家能否在无须遵循固定叙事顺序的情况下，发现连贯历史的痕迹？

**一手来源与历史范围。**  Youssef Maguid 撰写的 [Ubisoft 对创意总监 Julian Gerighty 的访谈](https://news.ubisoft.com/en-us/article/2V0Yy0NmJsEnp36V4RiVmd/the-division-2-why-massive-chose-washington-dc)， **2018-08-23** ，描述发布前生产。

**所报告的方法。**  Gerighty 介绍了将城市划分为区域、为街道赋予主题，并为任务地点的建筑和居住者编写历史。创作者在考虑当前任务的同时，也考虑每栋建筑在崩溃前、崩溃期间和七个月后的用途。共享的世界历史文档将重要地点时间线和个体故事关联起来；逐月城市地图记录派系起源、政府应对及争夺中的地标。团队用这些历史区分区域，并创作可在局部发现的细节。他解释，对于其非线性、以多人为重点的游戏，传统线性叙事很困难，也未必理想。环境故事旨在让个人和小队都能接触。他希望玩家形成自身解读，这是意图，而非所报告的游玩测试发现。

**拟议的评审模板。**  创建一份小型地点简报，为历史状态、现有居住者、任务要求和候选环境线索分别设置可独立编辑的字段。为每条线索赋予存在理由和预期推断，同时标记哪些推断是可选的，哪些影响安全导航或推进。在预期解读之外保留其他合理解读。线索放置评审应询问，更换某件道具是否意外与另一时间层矛盾，或暗示游戏不支持的交互。

对于原型，在比较两种线索布置时保持同一可玩区域。为两种布置使用不同的首次游玩群体，并收集单人和合作观测：注意到的线索、未受提示而主动给出的解释、遗漏的必要信息，以及队友能否重新查看发现。记录路线、相机、战斗压力和既有知识。不要自动将可选叙事的歧义判为失败，也不要强迫每个玩家重建全部创作历史。此测试设计是我们的延伸；发布前访谈既未报告这些测试，也未报告经测量的理解程度或发布后成功。

## God of War：在近距离镜头战斗中维持清晰的心智地图

帮助玩家决定是继续连招、切换目标，还是防御看不见的攻击。敌人移动与警告提示应支持一致的空间预期。

**来源与范围。**  Mihir Sheth 的 [GDC 2019 演讲](https://www.gdcvault.com/play/1026423/Evolving-Combat-in-God-of)，*为新视角演进 God of War 战斗*，讨论  **God of War (2018)** 。以下页码指[一手幻灯片与演讲者备注](https://media.gdcvault.com/gdc2019/presentations/Sheth_Mihir_EvolvingCombat.pdf#page=4)中的 PDF 页码。

**已发表的方法。**  早期内部测试发现，敌人消失到画面外时，玩家会停止进攻。团队用独立的位置和分离约束替代加权定位；可导航空间不足时需要更宽松的区域。一个中间设计为进攻型敌人分配前方月牙形区域，但新转为进攻状态的不可见敌人在寻找该区域时，会移动到 Kratos 身上。后来的分配保留了画面内外归属，直到玩家动作改变它。不可见敌人保持在相对 Kratos 位置、按世界朝向划分的象限内，而非相机相对扇区或冻结坐标。转为进攻状态本身并不等于发起攻击。[PDF 第 53–72 页](https://media.gdcvault.com/gdc2019/presentations/Sheth_Mihir_EvolvingCombat.pdf#page=53)

画面边缘闪光被误认为伤害指示器。Kratos 周围的方向箭头改为区分即将到来的攻击与附近闲置敌人，并为远程攻击提供独立提示；减少位置变动也让指示器更稳定。[PDF 第 77–84 页](https://media.gdcvault.com/gdc2019/presentations/Sheth_Mihir_EvolvingCombat.pdf#page=77)

**所报告的效果。**  Sheth 描述，在组合改进后，游玩测试参与者会冒险，并在面对多个敌人时保持进攻。这些定性观察没有分离象限或指示器各自的效果；叙述未提供参与者人数、受控比较或数值收益估计。[PDF 第 74–76 页](https://media.gdcvault.com/gdc2019/presentations/Sheth_Mihir_EvolvingCombat.pdf#page=74)

**拟议的工作流模板。**  构建一个含可见攻击者及玩家身后闲置敌人的遭遇。在开放场地和受限通道中比较相机转向、向前攻击与侧向移动，包括空间不足的后备处理。各修订间保持敌人组合、资源与难度不变。在玩家视图之外记录敌人位置、进攻与攻击转换、指示器变化及受到的伤害。事后询问不熟悉游戏的玩家，他们预期不可见敌人在哪里、每种警告意味着什么；将其回答与设计师解读分开。检查位置修订是否在保留有意义防御决策的同时改善预测。使用受支持的相机设置和替代提示重复测试。这份项目专用模板尚未执行；演讲未提供其夹具或验收阈值。

## Horizon Forbidden West：将玩家机会从生物简报贯穿到游戏内资产

细化表面细节前，先选定生物应提供的机会：观察状态变化、接近暴露部件，或选择不同攻击。在概念、动画和替换资产评审全过程中保持该机会可见。

**已发表的方法。**  Guerrilla 的 [2021 年 11 月 8 日文章](https://blog.playstation.com/2021/11/08/rebuilding-the-awe-inspiring-machines-of-horizon-forbidden-west/)引用首席机械兽设计师 Blake Politeski 与资产美术负责人 Maxim Fleury 对当时即将推出游戏的介绍。简报规定外观、可交互部件和攻击。3D 概念接受美术指导、设计、动画和技术美术评审。在精细建模前，以绑定并制作动画的模型检查功能；替换游戏内临时模型前还要进一步评审。Fleury 介绍了漫长迭代，以及在保留既有设计语言的同时增加功能的挑战。

Sunwing 采集太阳能的特征形成了脆弱的采集状态，与空闲时更高的警觉性相对。文章介绍了标示可交互部件的纹理，以及区分空闲、警示同伴和发动攻击的声音。这些是相关设计意图，并非音频参与了所列概念评审流程的证据。发布前叙述没有提供经测量的理解程度、生产节省或数值化暴露窗口。[一手叙述](https://blog.playstation.com/2021/11/08/rebuilding-the-awe-inspiring-machines-of-horizon-forbidden-west/)

**拟议的工作流模板。**  使用项目自有的原创敌人，记录玩家决策、相关状态、可用动作和可观测后果。在粗略组件布局上标注玩法功能，再从玩家相机评审其运动表现，包括遮住或重叠部件的姿态。让美术、设计和动画围绕同一预期机会进行评审；保留未解决问题，以及改变其暴露或含义的修订。

替换临时资产后，重复相同状态序列与接近条件。将预期机会与实际组件、运动和声音行为比较。询问不熟悉游戏的玩家，他们认为哪项动作可用以及为什么；将其动作与这些解释分开保留。修订资产前，区分动作不可用、错过提示以及误解后果。此模板尚未执行。文章未公开组件放置规则、验收阈值或音频创作交接；这些需要项目专用决策。

## Hitman：展示可行途径，但不强制使用其引导

将任务可能性与可选引导分开。玩家应能在未先激活信息序列的情况下，发现并实施某种途径。

**已发表的方法。**  Jacob Mikkelsen 与 Mette Pødenphant Andersen 的 [GDC Europe 2016 叙述](https://gdcvault.com/play/1023849/Level-Design-in-HITMAN-Guiding)涵盖了 2016 年游戏的序章与 Paris 引导设计。[一手幻灯片](https://media.gdcvault.com/gdceurope2016/presentations/Mette_Poedenphant_GuidingThePlayer.pdf#page=12)报告封闭 Alpha 测试中的导航与整体认知困惑，以及空旷感。对于后来的挑战任务单原型，作者报告了自主选择目标、实验以及探究 NPC 反应的现象。[PDF 第 55–59 页](https://media.gdcvault.com/gdceurope2016/presentations/Mette_Poedenphant_GuidingThePlayer.pdf#page=55)

创作契约要求信息不得成为推进门槛，机会在无引导时也能成立，并且引导须在击杀前结束。[PDF 第 105 页](https://media.gdcvault.com/gdceurope2016/presentations/Mette_Poedenphant_GuidingThePlayer.pdf#page=105) 在模特伪装示例中，到达私人会面、尚未消灭目标时，机会已显示完成。[PDF 第 90–91 页](https://media.gdcvault.com/gdceurope2016/presentations/Mette_Poedenphant_GuidingThePlayer.pdf#page=90)

所展示的先处理目标再伪装，以及被发现／交火序列，分别以“机会失败”和“错失机会”结束；后者还显示目标进入封锁保护状态。这些示例未证明任意放弃、切换引导或重新进入后的恢复能力。[PDF 第 93–97 页](https://media.gdcvault.com/gdceurope2016/presentations/Mette_Poedenphant_GuidingThePlayer.pdf#page=93)

**拟议的评审模板。**  选择一个具有两种实质不同可行途径的任务。分别记录最终目标、角色与物品前提、访问规则、信息提示和引导状态。定义哪些变化会移除某种途径，哪些只影响玩家知识。尝试无提示开始、推进后才发现提示、关闭引导、移除前提、引发警报、更换计划及尝试重新进入。比较显示的引导状态与世界中剩余可能性。

保留任务修订、初始状态、事件顺序、引导设置和可见消息。询问不熟悉游戏的玩家打算尝试什么以及为什么；将这些解释与观测到的动作分开。分别报告状态一致性、可发现性和玩家主动性。此模板尚未执行。幻灯片的原型观察是定性的，未给出参与者人数或受控比较；结尾关于重玩成功的例证是媒体标题，而非留存数据。此叙述未证明当前 World of Assassination 行为。[PDF 第 111 页](https://media.gdcvault.com/gdceurope2016/presentations/Mette_Poedenphant_GuidingThePlayer.pdf#page=111)

## VALORANT：区分预测视图、权威结果与可见反馈

**历史模拟叙述。**  Matt deWet 与 David Straily 的 [2020 年 7 月网络代码文章](https://www.riotgames.com/en/news/peeking-valorants-netcode)介绍了结合本地预测的服务器权威。缓冲平滑了不均匀的移动送达，但也延迟了观测。固定频率的移动和物理更新与渲染分开；丢失移动可触发服务器预测及后续客户端纠正。他们的盲测探身实验改变了服务器 tick 频率、延迟、客户端帧率和武器。这些开发者报告的实验不是公开基准或通用阈值。仅凭 ping 不能描述排队、模拟和呈现延迟。

**正确性与清晰度不同。**  Kevin Lee 的 [2020 年 8 月命中判定叙述](https://playvalorant.com/en-gb/news/dev/the-state-of-hit-registration/)区分了错误射击结算与误导性反馈。开火输入后立即显示曳光与枪口反馈；命中确认则等待服务器。回溯后的目标位置与姿态，可能不同于反馈到达时所见的状态。移动或蹲伏目标，以及延迟的撞击效果，可能造成误导性重叠。将效果附着到身体部件上，是一项自身也存在掩体歧义的实验，而非已发布的保证。叙述也承认正确性缺陷；令人困惑的视频既不足以证明模拟故障，也不是排除故障的理由。

**调参取决于版本。**  [6.02 补丁，2023 年 2 月](https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-6-02/)将最大回溯从 200 毫秒降至 140 毫秒。Riot 预期与高 ping 对手交战时，看似已躲进掩体后仍死亡的情况会减少，但可能使这些对手的命中判定不准确。这是历史公平性权衡，而非当今配置的证据。

**拟议的证据夹具。**  在项目自有场景中，保留构建、移动与武器、网络劣化、模拟与渲染频率以及时间线不确定性。关联输入、预测状态、服务器评估、纠正、结果接收与可见反馈帧。分别判断权威不变量与反馈清晰度；不完整轨迹仍属无定论。此未执行夹具补充了[传输与应用检查](work-orders.md#7-exercise-multiplayer-transport-under-impairment)；它不证明重连持久性或长时运行可靠性。

## Legends of Runeterra：区分迭代成功与合并就绪

**历史生产工作流。**  [Guy Kisel 的 2021 年 5 月叙述](https://www.riotgames.com/en/news/legends-runeterra-cicd-pipeline)区分了省略额外验证的单平台 Iteration 构建，以及合并前必需的完整 Merge Readiness 构建。即便 Iteration 运行成功，也仍将提交状态设为失败，以阻止将其较窄范围的成功当作就绪。

分支专用测试环境取代了开发者可能相互干扰的共享沙盒。逻辑隔离不要求专用服务器：服务器托管多个环境的数据。每个分支拥有独立流水线。JSON 构建计划记录产物、哈希和脏状态，以决定需要重建的内容。

基于正则表达式的失败分析产生了含糊的误报。团队将失败定义移入构建脚本，在失败位置输出结构化 JSON，用于遥测和通知。这些文档化实践并不证明现今可访问 Riot 内部系统，也不证明一般性能收益。

**拟议的证据夹具。**  记录构建模式、修订、平台与游戏版本范围、省略的验证、逻辑环境与共享服务器身份、产物哈希及失败来源。迭代成功不能满足尚未执行的合并门禁。将源头输出的失败记录与原始证据比较，而非仅相信关键词匹配或结构化标签。复用[构建与产物工作流](work-orders.md#8-build-a-release-bound-content-update-and-reconstruct-its-patch)，将缺失的必需结果保持为未知。这项合成契约尚未实现；它并非要求 GameMap 采用 Riot 的分支策略。

## Rainbow Six Siege：以材质规则创作作为玩法表面的破坏

让开口有用且清晰可辨，无须让每个可见碎片都成为权威物理对象。破坏改变了创作环境，因此其视觉、碰撞和玩法表示需要有意识的边界划分。

**历史创作方法。**  Julien L’Heureux 的 [GDC 2016 幻灯片](https://media.gdcvault.com/gdc2016/Presentations/LHeureux_Julien_Art_Of_Destruction.pdf#page=21)介绍了面向破坏的建模与美术培训。资产按物理材质分离部件。平面表面切割结合撞击位置、切割器输入和材质参数；美术可在 UV 空间创作平铺纹理切割器图案。几何装饰在切割后保留到子表面中，但增加 CPU、渲染、内存和创作成本；绑定到特征的装饰则会在其支撑特征消失时随之消失。[PDF 第 29–47 页](https://media.gdcvault.com/gdc2016/Presentations/LHeureux_Julien_Art_Of_Destruction.pdf#page=29)

玩法需要明确解释何时对象算作损坏，并配合导航、可见性和声学更新。简化碰撞会移除小洞并降低洞口细分，而射击可使用详细表面几何。动态碎屑使用替代物和积极回收，而非程序化切割出的移动碎片。异步工作可能使感知滞后于破坏状态；幻灯片介绍了与动画结束同步的预破坏。这些是历史生产选择，而非通用物理要求或当今引擎契约。[PDF 第 24–27、52–55、62–64 页](https://media.gdcvault.com/gdc2016/Presentations/LHeureux_Julien_Art_Of_Destruction.pdf#page=52)

**伤害是独立创作的后果。**  Ubisoft 的 [2020 年 2 月 Y5S1 公告](https://www.ubisoft.com/en-gb/game/rainbow-six/siege/news-updates/1QkezaGoRkDWqcQ6duGvtk/dev-blog-explosions-shrapnel-in-y5s1)介绍了爆炸形状查询、实体专用射线检测点和阻挡伤害的元数据。伤害与破坏可具有不同形状和范围。拟议的弹片变化将依据中间可破坏对象的数量降低伤害，而非让它们限制伤害范围；洞口旨在传达伤害方向。文章关于真实感与清晰度的说法是设计目标，而非经测量的改进或对当前行为的验证。

**拟议的工作流模板。**  创作一套原创墙体组合，具有材质边界、装饰特征、预期开口和明确的破坏状态规则。保留其源修订和切割器参数。比较反复撞击与一次爆炸，分别记录可见几何、移动碰撞、射击查询、导航与声学就绪及玩法事件。在将碎屑视为证据前，询问玩家能否推断哪个开口允许视线、通行或伤害穿过。

保留事件时间线，并区分工作已接受、几何完成和依赖系统就绪。评审有意设置的例外，而非要求视觉与碰撞完全一致。在相同项目设置下，比较创作特征与成本及复杂度。此未执行模板补充了[导航就绪](engine-operations.md#navigation-after-procedural-world-edits)；两个来源均未提供公开 RealBlast 适配器、可复用游戏资产或独立于项目的验收阈值。
