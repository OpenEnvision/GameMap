# 复现游戏开发基准

查明复现各项研究所需的代码、数据、运行框架和评估设置。在比较所报告的结果之前，先检查划分隔离与产物可用性。

## 产物与控制措施矩阵

| 研究 / 确切范围                                                                   | 公开产物证据、版本与权利                                                                                                                                                                                                                                                                                                                                                                                               | 留出或隔离证据                                                                                                                                                                                                                                                                   | 粒度与尚未解决的复现条件                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SWE-Game**  [论文 v3，10 月 7 日](https://arxiv.org/html/2609.33678v3)         | 此前链接的[位于 `8459c64` 的目录](https://github.com/Touchstone-AI-Lab/swe-game-tasks/blob/8459c64cb1839dbaffa9e2c23800363f13078425/tasks.json)包含跨 12 款游戏的 156 个游戏模组任务，而非本文的 247 个任务 / 41 款 Godot 游戏。尚未验证其与作者的关联；它不能证明该研究已发布产物。论文的 CC BY 4.0 许可不能确立软件 / 资产权利。                                                                                                                                                        | 评估器自有的探针 / 回放、匹配的无输入对照，以及单独的修复保全检查，构成协议证据。Unity 指令禁止复制评估器证据以及隐藏的获胜捷径；评估器使用自己的构建 / 探针运行器。这些并非训练数据去污染的证明。                                                                                                                                                                   | 五种模式共享 41 款参考游戏；247 个任务包含 83 个注入故障修复任务。拟议划分应将相关参考游戏变体归在一起。完整项目、评估器、发布清单及代码许可的可用性仍未验证。                                                                                                                                                                                             |
| **Play2Code / PlaytestArena**  [论文 v2](https://arxiv.org/html/2605.28258v2) | [作者页面](https://continual-game-generation.vercel.app/)和与作者关联的[位于 `8c5e167` 的静态演示源码](https://github.com/RunRiotComeOn/gui-agents-for-continual-game-generation/tree/8c5e1675fc25da0876e48dcbe1da5f5f4e57bed7)提供了八个演示。仓库根目录有 Apache-2.0 许可证，但第三方资产授权未获独立验证。所检查的目录树不能证明完整任务 / 评分细则语料库或迭代改进 / 最终裁判评估器已发布；源码检查不等于实际执行复现。                                                                                         | 最终评分细则裁判独立于迭代改进试玩器及其记忆。试玩器无法访问评分细则 / 源码。然而，技能 / 世界记忆会跨任务保留；这不能证明存在固定且未触碰的测试划分，也不能证明任务顺序无关。                                                                                                                                                                                | 200 个提示、1,548 条标准。校准提示不计入基准。在进行可比的复用之前，仍需任务顺序清单、初始记忆快照、重置 / 隔离策略以及产物发布。                                                                                                                                                                                                           |
| **WebGameBench**  [论文 v1](https://arxiv.org/html/2605.17637v1)              | 协议已公开；在所检查的论文中，尚未验证官方评估器 / 数据发布 URL、不可变代码固定版本或代码 / 数据许可证。不能从这种有限检查推断其在所有地方均不存在。                                                                                                                                                                                                                                                                                                                            | 生成端看到冻结的规格说明 / 公共工作区；评估器接收已部署 URL / 规格说明，没有参考实现，也不会向同一次尝试反馈。可选源码 / 日志用于支持诊断。冻结需求并非模型训练污染控制的证据。                                                                                                                                                                            | 111 个任务；原子功能点标注支持画像分析，并非隐藏的可执行测试套件。应保留单次尝试生成策略、规格说明修订版本、环境及已部署产物的沿袭关系。浏览器评估器实现及发布完整性仍未验证。                                                                                                                                                                                         |
| **JAMER / JamBench / JamSet**  [论文 v1](https://arxiv.org/html/2606.19830v1) | 论文内部的可用性表述相互冲突：摘要称代码 / 数据已公开；“伦理 / 开源承诺”部分称将会发布。尚未验证可用的官方产物 URL。源项目被描述为采用开源许可证，但统一的再分发清单和框架许可证尚未验证。                                                                                                                                                                                                                                                                                                        | 论文将 300 个基准项目与 7,833 个训练项目分开。这是声称的项目级划分，并非经过验证的分叉 / 模板 / 近重复排除，也不是基础模型预训练去污染。                                                                                                                                                                                             | 基准从每个规模层级采样 100 个项目；生成使用 50 个主题。SCS 是设有上限的结构计数得分；BAS 将汇总活动与数据集均值（生成）或原项目轨迹（补全）比较，而不是判断具体机制的正确性。[v2 §4.3 / 表 3](https://arxiv.org/html/2606.19830v2) 对 BAS 的维度数也存在分歧：正文称有七个数值维度加一个集合，但列出的却是六个数值维度和一个集合。复用前应通过发布的代码明确维度集合与零值策略；仍需要划分 / 来源 / 运行时锁定信息。                                |
| **OpenGameEval**  [仓库](https://github.com/Roblox/open-game-eval)            | 公开的任务 / 插件 / 客户端接口以及托管 API 工作流。[LICENSE.txt](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/LICENSE.txt) 明确包含 MIT 条款与保留声明的要求。这不授予托管服务访问权，也不替代平台 / 资产条款。检查的源码修订版本：`8001cac2fa733aad1e743f00aa701e1f4e426541`；这并未固定托管服务版本。                                                                                                                                           | README 将探索标注与评分 / 模型输入分开；标注覆盖范围不一。[论文 v1，附录 A](https://arxiv.org/html/2610.02563v1) 比较了 46 个隐藏解答的核心任务与 38 个公开解答的核心任务。其跨代测试不能排除各代共享的污染。历史[发布日志](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/EVAL_RELEASE_LOG.md)中的元数据移除涉及更早的快照。 | 发布日志区分了最初的 47 个代码任务、来自 15 个场景的 30 个调试任务，以及后来的 40 个代码任务。不能将这些历史计数相加后视为论文的 84 任务核心评估。需要确切的所选任务及修订版本。                                                                                                                                                                                |
| **GameASG-Bench**  [论文 v1](https://arxiv.org/abs/2609.21293v1)              | 在[发布版本 `6427cb6`](https://github.com/areal-project/GameASG-Bench/tree/6427cb6517ce11ff350ec45fcae17b67c5aec245) 检查的官方仓库提供 47 个任务提示、公开契约以及匹配的 L2 套件；Apache-2.0 不涵盖第三方材料权利。固定版本目录树中没有参考 HTML 或生成游戏 HTML。                                                                                                                                                                                                     | 生成前声明公开接口；测试不放入生成容器；评估时分别挂载只读提交目录 / 检查器目录。这些是实验时的隔离控制，而非已经证明的模型训练去污染。                                                                                                                                                                                                     | L1 静态检查和 Chromium L2 检查；评估已有产物无需模型密钥。严格成功要求完整的 L1 及适用的 P0  **和**  P1 覆盖，全部通过，并有成功生成的记录；分母为收集到的所有任务记录，包括缺失摘要的记录。仅测试产物不能计为严格成功。浮动的镜像 / 系统 / `ws` 依赖以及未发布的参考 HTML 限制了复现。参见[源码层面细节](development-evaluation.md#6-gameasg-bench-declare-behavioral-testability-before-generation)。 |
| **GBQA**  [论文 v1](https://arxiv.org/html/2604.02648v1)                      | 已有证据支持项目与作者的关联。[3 月 29 日目录树](https://github.com/camel-ai/GBQA/tree/ca7e3fb652a2e4826d0f14392a9a390522a1f1a7)包含一个 Dark Castle 示例和三条标注；其中未观察到 LICENSE 文件。[6 月 25 日修订版本](https://github.com/camel-ai/GBQA/tree/500e5ea252ee7afccc275b0e28fbd6de8c8f5dfc)有三个 Dark Castle 目标任务和 [Apache-2.0 LICENSE](https://github.com/camel-ai/GBQA/blob/500e5ea252ee7afccc275b0e28fbd6de8c8f5dfc/LICENSE)，但这不是经验证的论文完整语料库发布。 | 论文将仅探索式 QA 与基于规格说明 / 源码的 QA 分开。后来的任务清单暴露所选缺陷提示，并引用外部软件发布版本。不能据本次审查得出经过独立测试的隔离或模型训练去污染结论。                                                                                                                                                                                  | 论文报告了覆盖 30 款游戏 / 124 条标注的缺陷召回率；后来的 README 描述的是带提示的单目标定位与二元奖励。两者都不是生成质量评分或修复后游戏评分。指定论文修订版本、完整语料库及匹配的评估器 / 配置仍未验证。参见[协议边界](development-evaluation.md#7-gbqa-keep-defect-discovery-separate-from-generation-and-repair)。                                                        |

## 相较早期发现笔记的具体证据变化

1. **JAMER 的发布状态在内部存在矛盾。**  应保留两种表述，并将可用性标为未验证；仅凭所检查的论文，既不能确定“已发布”，也不能确定“未公开”。划分以项目为单位，而一个项目可以衍生出多个评估任务。仅以生成的任务标识符定义留出集，需要另行论证。
2. **Play2Code 的最终裁判隔离范围小于评估集隔离范围。**  文档记载的跨任务记忆意味着，全新记忆运行与持续适应运行是不同协议。论文排除校准提示是有用的，但并未回答所有关于任务顺序或持久记忆泄漏的问题。
3. **SWE-Game 目录的身份尚未确立。**  此前引用的同名仓库包含实质不同的游戏模组清单。已解析的目录提交及简短源码前缀，无法将其与拥有 247 个任务的 Godot 论文关联起来。完整评估器可用性仍未验证。
4. **WebGameBench 的功能点标注属于元数据。**  不应将其描述为已发布的确定性单元测试判定器。冻结规格说明可防止在一次尝试中改变目标；它本身并不能证明基准保密。
5. **OpenGameEval 的版本漂移影响元数据与任务数。**  历史发布说明与当前 README 描述的是不同快照。下文检查的三个任务文件包含 expected\_\* 标注；其他所选文件是否包含这些标注，仍需检查。

## 固定版本与可用性日志

此前的提交查询错误已于 2026-10-18 通过公开只读仓库连接器解决：OpenGameEval `8001cac2fa733aad1e743f00aa701e1f4e426541` 和同名 SWE-Game 目录 `8459c64cb1839dbaffa9e2c23800363f13078425`。目录解析成功并不能证明它与所引 Godot 论文有关联。OpenGameEval 此前计算指纹的七个文件均与确切提交的字节一致；还检查了 README 和发布日志。带版本的论文不是运行时锁定信息。针对 [JAMER](https://arxiv.org/html/2606.19830v2) 与 [WebGameBench](https://arxiv.org/html/2605.17637v2) 的 v2 定向检查，加上 [Play2Code 官方页面](https://continual-game-generation.vercel.app/)，仍未解决其完整基准 / 评估器发布可用性问题。

后续 Play2Code 跟进另将其与作者关联的八演示图库固定到 [`8c5e1675fc25da0876e48dcbe1da5f5f4e57bed7`](https://github.com/RunRiotComeOn/gui-agents-for-continual-game-generation/tree/8c5e1675fc25da0876e48dcbe1da5f5f4e57bed7)，并检查了根目录的 Apache-2.0 条款。这仅明确了演示源码的身份 / 版本 / 许可证可见性，并未证明完整语料库 / 评估器可用，也未独立核实第三方资产授权。经过有界的作者 / 项目跟进后，SWE-Game、JAMER 与 WebGameBench 的完整发布缺口仍未验证；搜索未命中并不意味着不存在。

## 供后续适配的最小交接要求

以下是编辑要求，并非声称这些研究实现了共同接口：复用任何套件前，应记录产物可用性级别、确切任务选择、父项目分组、源码 / 运行时版本、权利范围、评估器可见性、允许的反馈、尝试次数 / 预算、持久记忆与重置策略。将适配 / 训练示例与最终评估分开，并保留失败 / 超时的尝试。此处有证据支持的是可复用的*设计模式*；只有在已检查的公开文件确实存在时，才能确认可复用的可执行组件。所有拟议 piRSI 测试夹具均尚未实现。

## OpenGameEval：公开运行时契约审查

检查日期为 2026-10-18。对官方公开源码和文档进行只读检查。没有安装 Studio / 插件，没有执行评估器，没有访问账户、处理凭据或进行托管评估。结论描述的是确切提交的源码字节，而非已部署服务器修订版本，也不代表与论文产物等价。

### 证据与修订版本边界

[所检查修订版本的官方仓库](https://github.com/Roblox/open-game-eval/tree/8001cac2fa733aad1e743f00aa701e1f4e426541)提供任务脚本、托管客户端与本地参考测试指南。先前查询失败后，已解析修订版本 `8001cac2fa733aad1e743f00aa701e1f4e426541` 并获取所引文件。此前的全部七项指纹均匹配；插件指纹仍仅覆盖其 LFS 指针。

[LICENSE.txt](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/LICENSE.txt) 为 MIT 许可证，版权归 2025 Roblox Corporation 所有，要求保留其声明并免除担保。它不能确立托管服务访问权、账户权限、第三方资产权利或引擎再分发权利。下载的 [EvalRunner.rbxm](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/EvalPlugin/EvalRunner.rbxm) 是 Git LFS 指针，并非解码后的插件源码。指南中关于源码路径的说法未被独立核实。[论文 v1，§8 与附录 A](https://arxiv.org/html/2610.02563v1) 明确指出，驱动会话的运行时未开源，其产品系统提示无法发布。公开任务与插件不能复现该私有运行支架。

### 托管调用：源码检查所见的运行边界

来源：[invoke_eval.py](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/invoke_eval.py)。以下是客户端代码观察结果，并非服务器保证。

| 边界      | 观察到的行为                                                              | 对适配器的影响                   |
| ------- | ------------------------------------------------------------------- | ------------------------- |
| 提交      | POST 将任务内容与提供商密钥发送给 Roblox；OpenCloud 密钥放在请求头中。参考模式仍需 OpenCloud 身份验证 | 将源码上传与凭据使用权限同研究许可分开       |
| 结果      | COMPLETED 根据 evalSucceeded 分支处理；FAILED 返回 Error                     | 完成并不等于通过                  |
| 超时      | 预算为 900，每次轮询扣减 10；不计入请求耗时                                           | 并非墙钟截止时间；README 写的是 10 分钟 |
| 取消 / 重试 | 超时后在本地返回；未实现取消请求或提交重试                                               | 远端终止及防重复重新提交行为仍未知         |
| 并发      | 始终构建信号量；显式上限可选，默认等于展开后的文件数；收集结果时包含异常                                | 将基础设施错误与任务失败分开保留          |
| 汇总      | 成功率分母包含全部文件；Timeout 不计入服务器错误计数                                      | 保留逐次运行类别，而非只保留打印的成功率      |
| 隐私      | 详细输出的请求头会打印密钥前 8 个字符，短值则完整打印                                        | 禁用包含秘密的诊断输出               |

### 本地参考插件：文档层面的证据

来源：[EvalPlugin/USER_GUIDE.md](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/EvalPlugin/USER_GUIDE.md)。这些说法来自指南阅读，未对照解码后的插件代码验证。

插件会运行设置、参考实现、场景检查和可选的游玩检查。它不调用助手。Place 文件和 includeAssets 需要手动准备。客户端检查数量决定采用单人还是多人测试；指南称最多支持 8 个客户端。运行时结果通过注入的协调对象与 EndTest 返回；清理会移除带标记的注入对象。另一个正在进行的测试会话可能阻止启动。此处未确立通用的超时 / 取消保证。

**重置注意事项：** 按钮的概括性描述承诺撤销全部场景更改，但其详细的 undoPreviousRun 描述仅比较容器成员关系并销毁新建实例。尚未确立它会恢复修改过的属性、被删除的原始对象、外部效应或全局变量。指南还描述清理会将 LoadCharacterAppearance 设为 true，而不是恢复先前值。应将此视为需要实现测试的文档不一致，而非已证明的运行时缺陷。

**拟议适配要求：** 重新打开经验证的原始 place，并确认重置后的状态，以保证各次尝试独立；不能从这一本地 Reset 描述推断托管会话隔离。文档描述了绕过模块缓存，但这并不能证明进程 / 全局状态完全隔离。

### 具体任务判定的范围比任务文字描述更窄

#### 001：汽车属性，而非实测驾驶性能

[Evals/001_make_cars_faster.lua](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/001_make_cars_faster.lua) 在设置时记录五个引擎属性，并将编辑后的值与原值的两倍比较。它断言失败数最多为 3，因此在设置成功的前提下，五项比较中至少满足两项就足够。其参考实现和游戏检查为空。这段源码未展示动态车速测试，也不要求全部五个属性翻倍。比较结果时应保留这一评估器规则；默默收紧规则会形成不同的基准。

#### 010：客户端输入与采样的人形角色属性

[Evals/010_left_shift_sprint_5s.lua](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/010_left_shift_sprint_5s.lua) 运行客户端检查：按下按键，等待 0.5 秒，要求 WalkSpeed 增加 20，等待 6 秒，松开按键，要求速度恢复原值。此任务中对 Character 和 Humanoid 的等待没有显式超时。较早的断言可能中断后续松键语句；此时清理行为取决于外围运行器，而该运行器未被检查。任务检查的是采样状态，而非第 5 秒的精确转换时机、移动距离或截图。参考实现、场景和服务器检查为空。

#### 097：语义外观相等，而非图像比较

[Evals/097_ugc_mannequin_match_outfit.lua](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/097_ugc_mannequin_match_outfit.lua) 将选定的 HumanoidDescription 字段与玩家角色比较。它选择当前第一位玩家，或等待一位玩家，重新加载角色，然后在模型中搜索匹配的描述，排除该角色和带 Mannequin 标记的模型，最多迭代 20 次，每次等待 0.1 秒，并断言存在匹配。源码不验证图像，也不能证明每位玩家都恰好有一个新的匹配人台。设置会删除一个指定名称的现有创建脚本；不能假定仅基于成员关系的 Reset 会重建它。此前若干玩家 / 角色等待仍位于该有界搜索循环之外。

### 观察、视觉与公平的 piRSI 适配

[README](https://github.com/Roblox/open-game-eval/blob/8001cac2fa733aad1e743f00aa701e1f4e426541/README.md) 称，预期工具和实例标注不影响评分，也不展示给模型。实例列表为空表示未标注，而不是没有依赖。其描述的评估支持编辑与游玩检查，托管 LLM 运行需要提供商凭据。文档注明自定义端点参数不受支持。因此，CLI 并不能证明其支持接入任意外部 piRSI 智能体循环。

[论文 v1，§8](https://arxiv.org/html/2610.02563v1) 明确描述了纯文本智能体观察；没有工具返回渲染帧。该论文条件不是视觉基准。 **针对在线服务尚未验证的事项：** 观察模式等价性、工具权限 / 延迟、隔离、引擎构建版本、种子、产物保留与取消。论文中每阶段 300 秒的预算与客户端轮询计数器不是一回事。

**拟议评估设计，而非实现：** 为任务 / place / 检查器字节标记版本；将智能体可见的提示 / 工具与私有评分分开；在各变体之间冻结工具权限和资源预算；分别保留编辑、运行时与基础设施结果；尝试前恢复经过验证的状态；记录每次观察 / 编辑，以及修改目标前是否检查过目标；将基于标注的轨迹分析排除在智能体上下文之外。使用留出的任务族，并将任何更改过的检查报告为基准分支。在承诺执行 piRSI 之前，先验证实际受支持的智能体集成。本次审查不能支持任何运行、评分或优越性主张。

### 已检查的确切源码指纹

于 2026-10-18 在 `8001cac2fa733aad1e743f00aa701e1f4e426541` 重新检查。全部七项指纹均与此前下载的字节一致。插件行计算的是 LFS 指针的指纹，而非其目标载荷。

| 文件                                                                                                                                                                                    | SHA-256                                                            | 字节数   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----- |
| [EvalPlugin/EvalRunner.rbxm](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/EvalPlugin/EvalRunner.rbxm)                             | `10c409a5856554147ed4d7949fd726c68c50a74ba448a50ca7b3b0f0c7c4f0a4` | 130   |
| [EvalPlugin/USER_GUIDE.md](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/EvalPlugin/USER_GUIDE.md)                                 | `a9b6b0c64b944d494cf1436493490be911751ee2a1f4310be79f3dd158d63758` | 24141 |
| [Evals/001_make_cars_faster.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/001_make_cars_faster.lua)                     | `a92e2ad87f997081927add103ffe9feb592313f45e8760799edb065be00621c2` | 2450  |
| [Evals/010_left_shift_sprint_5s.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/010_left_shift_sprint_5s.lua)             | `d128d0fa8d75c1f0067ecb666fde28a3e9ed17620a88a5cad5cf371c6a265b73` | 2755  |
| [Evals/097_ugc_mannequin_match_outfit.lua](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/Evals/097_ugc_mannequin_match_outfit.lua) | `04b1fa9e8f7704b7d06d5c8e50e790499e4fe291096225041c1e0582ad6559c2` | 4455  |
| [LICENSE.txt](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/LICENSE.txt)                                                           | `d2867c1533a6bb5f23b65213515cb42a788564e95d4a7bf085220309fbf10d76` | 1071  |
| [invoke_eval.py](https://raw.githubusercontent.com/Roblox/open-game-eval/8001cac2fa733aad1e743f00aa701e1f4e426541/invoke_eval.py)                                                     | `69ccf8c48a7530cc535fc86b58c275734a03a6d35a9861d5e8213161e4b595d1` | 10307 |

## 已发布的现有比较参照：GameDevBench

[在 39952ba6341898380ff1c2c3336101c57c99196b 检查的 README](https://github.com/waynchi/gamedevbench/blob/39952ba6341898380ff1c2c3336101c57c99196b/README.md) 描述了 333 个任务、确切的 Godot 4.4.1 版本、公开任务 / 真值归档，以及运行器 / 验证代码。覆盖为较新 Godot 版本属于实验功能，不能与排行榜比较。Linux 截图 / 视频执行需要显示通道，通常是 Xvfb；无窗口运行不能成为省略图形任务的借口。文档将严格受限运行列为默认方式：经过过滤的可写任务工作区，不可访问真值 / 先前结果 / 同级工作区，逐求解器显示隔离，受限的提供商出口网络，以及全新且不带凭据的验证。非受限运行仅用于诊断。恢复运行会保留所选重跑集合之外的先前结果，因此恢复后的汇总可能不只描述新近尝试的任务。这些是文档检查所得的说法，并非独立的沙箱或基准审计。[同一修订版本的 LICENSE](https://github.com/waynchi/gamedevbench/blob/39952ba6341898380ff1c2c3336101c57c99196b/LICENSE) 为 Apache-2.0；各任务资产和上游内容仍需各自的清单。即使任务打包方式旨在减少意外暴露，公开的参考解答仍使访问控制与污染披露十分重要。

## 公平的基于 pi 的递归运行框架改进

适配运行框架时，应将以下控制措施与 [pi/GEPA 参考](source-revisions.md)中的扩展和优化器接口一并实现。

对于生成的交互回归，[有状态发现与失败缩减](gameplay-state.md#stateful-interaction-discovery-and-failure-reduction)将自适应缩减、干净状态复现以及固定回归晋级分开。应计入每一次重置、尝试步骤、缩减 / 回放与清理；缩减后的轨迹不是独立的成功率试验。

### 首先选择比较单位

- **官方复现：** 保留发布者的确切任务、评估器、引擎、允许的观察 / 动作、预算和运行策略。新的 pi 适配器必须先满足这些条件，才能将其评分与已发布结果比较。
- **运行框架改进研究：** 冻结一个已发布的任务 / 评估器修订版本，在相同的声明条件下比较基线与候选方案，并将结果标为一项新研究。用视觉裁判替代引擎检查、添加特权状态，或扩展反馈预算，都会改变实验。
- **受协议启发的测试夹具：** 当评估器 / 数据未发布或权利尚未解决时，创建原创任务与测试，以检验文档记录的思路。说明协议的影响来源，但不声称达到源基准的评分或任务覆盖范围。

### 将搜索空间与受保护评估分开

| 接口     | 改进期间拟允许修改的范围                    | 受保护边界与证据                                              |
| ------ | ------------------------------- | ----------------------------------------------------- |
| 工具接口   | 针对同一组已授权原生操作的参数模式、错误呈现与已记录的组合方式 | 不得仅向一个条件添加隐藏的判定器状态或更广的文件系统 / 网络权限；记录适配器与策略哈希          |
| 视觉观察   | 帧选择、裁剪、压缩以及明确声明的诊断视图            | 保留原始帧、变换、时间戳和实际模型数据包；比较像素 / token / 延迟预算，绝不默默暴露最终答案图像 |
| 记忆与检索  | 候选技能、任务局部笔记以及允许的先前开发经验          | 按来源项目 / 教程族分区；分开开发、选择和最终测试记忆库；不得检索测试解答 / 评分细则         |
| 迭代改进反馈 | 开发划分上的失败与允许的游玩轨迹                | 评估器自有的最终断言和评分细则不得进入优化器及其反思上下文；记录提供的全部反馈               |
| 终止与恢复  | 在声明预算内进行有界重试和错误处理               | 记录全部尝试、中止、无效测量及迟到结果；不得仅保留成功重跑，也不得将超时视为经过验证的玩法失败       |

公开测试材料可能已经存在于基础模型的训练数据中。隔离可以减少实验时的泄漏，但不能证明不存在既往污染。留出分区应将相关项目、教程衍生内容与近乎相同的任务分组，而不是仅随机化文件名。如果公开任务覆盖太小，应报告这一限制，而不是将结果称为通用自我改进。

### 拟议评估记录

冻结任务标识符和来源组；内容 / 资产哈希；评估器与引擎版本；求解器模型与推理设置；候选运行框架修订版本；允许的 API / GUI / 文件接口；训练 / 选择 / 测试归属；记忆来源；模型 token / 工具调用 / 时间预算；种子与全新启动策略；构建与运行时日志；截图 / 视频及权威检查；最终裁判配置；原始终局结果与资源成本。仅保留凭据引用，绝不保留秘密。不得仅为填充此记录而配置任何凭据传输。

对于每个候选方案，保留相同任务上的配对基线 / 候选结果，并报告采样单位。将有效的任务失败与运行框架 / 基础设施失败分开，在查看结果前给出分母策略。在有充分理由时重复随机运行；一次成功重试不能证明稳健能力。仅在选择完成后运行最终留出评估，同时归档未成功的候选方案。这次仅检查来源的审查并未确立任何这些测试夹具、统计比较或执行权限。

## 运行框架选择：统计独立性与自适应反馈

检查日期为 2026-10-18。仅检查一手来源；没有安装、执行基准或提出游戏性能主张。下文拟议协议扩展了现有候选选择与可复现性记录。

### rliable：重复完整锦标赛，保留预期比较

Agarwal 等人假设每个任务的运行彼此独立，每次产生一个标量归一化得分。附录 A.4 将 best-of-N 视为独立的随机算法：N 个候选中的一个最大值仅提供 **该选择算法的一次运行** 。因此，它需要独立重复。分层自助法在每个任务内部重采样运行。Atari 覆盖率研究表明，三次运行时，名义 95% 置信区间的覆盖率不足；对于所检查的汇总指标，百分位区间在约十次运行时表现良好。这些经验结果并不能确立通用的样本量保证。[论文 v4，§2、§4.1、图 6、附录 A.4][RL-paper]

在所检查提交 `3ccd9f4dea577a04d3d2b557f259aac08badbd81` 中，`get_interval_estimates` 接收形状为 `(runs, tasks, ...)` 的方法到得分映射以及一个汇总函数，返回点估计和置信区间下限 / 上限数组。默认采用百分位法、50,000 次自助重复和 95% 名义覆盖率。单数组路径支持 `task_bootstrap`：false 在固定任务上重采样运行；true 还会重采样任务列。元组 / 列表值条目则使用 `StratifiedIndependentBootstrap`，在不使用 `task_bootstrap` 的情况下独立重采样各数组。该便捷路径 **不是配对 A/B 效应区间** 。对于匹配的均值差，可以将按配对对齐的差值矩阵用于单数组路径；非线性对比需要经过验证的保留配对路径。这是 API 路径的限制，而非声称整个库无法支持配对分析。[固定版本库][RL-library]

IQM 从合并得分的两端各裁去 25%。改进概率对各任务的 Mann–Whitney 秩统计量取平均；它不是成为最佳系统的后验概率。[指标][RL-metrics]

公开代码采用 Apache-2.0；setup 声明版本 1.2.0 和 `arch >= 5.3.1, < 8.0`。仓库已归档。其较早 README 中的依赖示例不是运行时锁定信息。[安装配置][RL-setup]、[许可证][RL-license]、[README][RL-readme]、[仓库][RL-repo]

### 自适应留出：独立评估器仍可能泄漏选择反馈

Dwork 等人区分独立固定的候选方案与利用先前留出反馈进行适配的候选方案；普通静态多重检验处理并不能自动覆盖后者。Thresholdout 接收训练 / 留出数据集、阈值、噪声尺度和过拟合预算，回答有界查询 `phi: X -> [0,1]`。当差异低于带噪阈值时，它返回训练均值；否则返回带噪的留出均值并消耗预算。预算耗尽时停止。定理 9 要求留出样本独立同分布、参数 / 样本量经过校准，并采用受控访问。这不是针对不受限视觉点评、相关项目变体或无限二元反馈的保证。[NeurIPS 2015，§1、§3、定理 9][HO-paper]

所检查的发布证据只能确立论文 / 伪代码的存在，而不能确立官方可执行软件包或软件许可证。arXiv 记录为 2015 年 9 月 25 日的 v2，采用非独占分发许可。[记录][HO-record]、[许可][HO-license]

### 优化裁判得分前先检查裁判

**来源发现。** MT-Bench v4（§§3.3–3.4）测试的是文本回答评判，而非游戏图像。它记录了顺序敏感性以及重复列表式冗长度探针；其保守比较要求交换答案位置后仍有相同胜者。一致性提高本身不等于准确性。其自我增强调查明确没有定论，因此不能确立裁判普遍偏好自身输出。这些历史模型发现为控制措施提供动机；其测得比率不能转用于当前视觉裁判。[论文 v4](https://arxiv.org/html/2306.05685v4)

**已检查接口。** FastChat 的成对比较路径接收问题、两个回答、裁判及可选参考，按两种顺序调用裁判，并保存两个映射后的胜者、提示与判词。其加载器将分歧标记为 `inconsistent`；格式错误的判定可能保留为 `error`。这是文本接口，而非已发布的截图 / 视频评估器。单回答评分是单独的路径，不应被描述为顺序交换测试。[固定版本 common.py](https://github.com/lm-sys/FastChat/blob/587d5cfa1609a43d192cedb8441cac3c17db105d/fastchat/llm_judge/common.py)

所检查代码采用 [Apache-2.0](https://github.com/lm-sys/FastChat/blob/587d5cfa1609a43d192cedb8441cac3c17db105d/LICENSE)。其[文档记载的托管裁判流程](https://github.com/lm-sys/FastChat/blob/587d5cfa1609a43d192cedb8441cac3c17db105d/fastchat/llm_judge/README.md)需要模型 / API 访问权；代码许可不授予该访问权，也不解决数据集 / 模型条款问题。没有进行任何调用。

**比较模板。** 对于视觉候选锦标赛，冻结任务及确切证据包，移除候选 / 模型身份线索，在保留片段内部时间顺序的同时比较两种呈现顺序。分别记录偏好、平局、不一致判定与无效响应，并记录各自分母。对盲化的人类 / 参考子集进行审计，核实实际任务正确性；一致意见或顺序一致性不能替代引擎状态验收。在将裁判用于选择前，运行一个证据完全相同的对照，以及另一个带冗余视图或冗长自述的对照，以检测呈现敏感性。这些视觉探针是拟议实验，而非经过验证的 MT-Bench 扩展。

### 拟议 GameMap 协议，而非经过来源验证的实现

| 边界        | 拟议要求                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 采样 / 泄漏单位 | 在开发 / 最终划分中，将分叉、模板、修复与衍生提示保留在各自父项目族内。跟踪项目、任务、完整生产运行、候选池、候选、视图与裁判重复 ID。帧和重复评分不会产生独立项目或生产运行。声明推断对象是固定套件还是新项目族；任务列自助法不会自动保留项目聚类。        |
| 两种实验      | 冻结候选池的比较衡量的是以该池为条件的排序表现。将生成纳入循环的评估则独立重复 **整个** 生成–渲染–裁判–选择–修复锦标赛。匹配预算；保留被丢弃候选、重试、种子、模型修订版本、记忆重置和停止规则。                                |
| 配对效应      | 通过显式试验 ID 匹配任务 / 候选池 / 初始状态，而非仅凭种子数相同。估计效应时保留配对及任何项目族聚类。事先声明权重和归一化方式。                                                                |
| 受保护的最终测试  | 使用开发队列进行 GEPA / 反思以及裁判 / 提示调优。在最终访问前冻结候选方案、记忆、结果指标、预算和停止规则。将最终诊断排除在反思记忆之外。如果反馈促成另一修订版本，应将已暴露队列视为开发证据，并获取新的最终证据。单独的裁判进程 / 模型不能修复这一依赖。 |
| 分母        | 报告所有预先指定的生产运行中获验收的输出比例，同时报告任务失败、基础设施失败、超时、弃权与预算耗尽。标明以完成渲染为条件的质量。计入全部生成 / 渲染 / 裁判 / 修复成本，并预先声明重试 / 排除规则；裁剪后的美学指标不能替代强制玩法 / 权利门槛。      |
| 决策        | 报告配对效应区间和逐项目族结果。自助重复不是额外数据。先选择最大增益再对其做自助法，不能消除选择偏差；反复查看固定样本置信区间不属于受保护的最终测试。独立单位很少时，有理由作出无定论决策；不显著并不能确立等价。                            |

每项晋级决策都应保留冻结的协议 / 划分哈希、最终访问台账、完整运行清单、独立单位计数、配对映射、失败 / 成本分母，以及确切的不确定性计算实现。

[RL-paper]: https://arxiv.org/html/2108.13264v4

[RL-library]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/rliable/library.py

[RL-metrics]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/rliable/metrics.py

[RL-setup]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/setup.py

[RL-readme]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/README.md

[RL-license]: https://github.com/google-research/rliable/blob/3ccd9f4dea577a04d3d2b557f259aac08badbd81/LICENSE

[RL-repo]: https://github.com/google-research/rliable

[HO-paper]: https://papers.nips.cc/paper/5993-generalization-in-adaptive-data-analysis-and-holdout-reuse.pdf

[HO-record]: https://arxiv.org/abs/1506.02629v2

[HO-license]: https://arxiv.org/licenses/nonexclusive-distrib/1.0/license.html

## GEPA 执行控制：计数、缓存与恢复的证据

检查日期为 2026-10-18。在 `f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819` 进行只读源码检查，该修订版本已用于适配器审查。没有运行外部代码、模型或评估。以下是代码层面的边界和拟议测试，并非已复现的超支或游戏性能发现。[MIT 许可证][GEPA-license]不提供模型服务或资产权利。

### 将提案任务与迭代次数及保留候选分开计数

[采样策略][GEPA-sampling]可在每次迭代产生一个、N 个或 P×N 个父候选 / 小批量任务。然而，[MaxCandidateProposalsStopper][GEPA-stoppers] 检查的是 `state.i`，而[主循环][GEPA-engine]每次迭代仅将其加一。因此，相同设置不能保证相同的实际提案数。`MaxTrackedCandidatesStopper` 统计的是保留的候选池，而非全部失败、跳过或丢弃的提案。这并不意味着每个采样任务都会产生新候选。这些采样器会反复调用父候选选择，且没有父候选互异约束；仅凭策略名称不能确立父候选唯一性。

**拟议 GameMap 控制措施：** 分别保留迭代、提案任务、已生成提案、唯一候选、准入候选、实际评估与缓存命中的计数。在比较更广泛的采样与更好的选择器时，匹配实际搜索资源，并保留被丢弃分支的成本。

### 停止条件不等于硬性准入控制或远端取消

[MaxMetricCallsStopper][GEPA-stoppers] 比较累计评估数。在全新运行中，[engine.run][GEPA-engine] 会先在验证批次上评估种子，再到达主循环的停止检查。这条静态路径不能保证在执行前拒绝超预算的初始批次。循环边界检查本身不会取消正在进行的模型、渲染器或评估器。`TimeoutStopCondition` 在对象构建时开始计时，而不是自动从远端作业提交时开始。

有一项具体的成本跟踪注意事项：[optimize][GEPA-api] 会用 [TrackingLM][GEPA-lm] 包装普通 `reflection_lm` 可调用对象中缺少 `total_cost` 的对象。该包装器估算 token，却将成本报告为 `0.0`；仅设置正的 `max_reflection_cost` 无法在这条路径上触发停止。单独的自定义 `reflection_strategy` 路径具有额外的成本能力检查，不可将两者混为一谈。即使支持反思成本核算，也不会自动纳入任务模型、渲染器、工具或人工成本。

**拟议 GameMap 控制措施：** 分发前预留有界的批次预算；独立强制执行调用、渲染及墙钟时间限制；记录进行中的工作及最终核对结果。应探测是否支持成本测量，而不是将零解读为免费。单独验证执行器 / 服务取消。限制测试应使用不调用外部服务的模拟适配器，而非真实付费端点。

### 缓存命中与恢复运行不是独立重复

[EvaluationCache][GEPA-state] 的键包含候选文本哈希、train/val 命名空间以及示例 ID。不同的 train/val 加载器已经使用分开的命名空间；同一加载器则有意共享一个命名空间。[ListDataLoader][GEPA-loader] 以位置作为 ID，而非内容哈希。键中没有独立的模型、引擎、评估器、资产、环境或试验身份字段；调用方必须自行编码这些变化，或使相应缓存失效。

当 `gepa_state.bin` 存在时，[API 契约][GEPA-api]与[引擎][GEPA-engine]会复用已保存种子的验证证据；若提供的相同种子已在候选池中，则不会额外评估种子。若提供的种子不在该池中，则会在主停止检查前评估并加入，同时推进 `state.i`。迁移会丢弃旧的无命名空间缓存条目，但保留此前记录的验证得分。禁用评估缓存本身不会清除这些候选得分，也不会开启全新实验。此外，当启用 `write_agent_state` 时，引擎的完整验证路径会绕过缓存以捕获轨迹：更丰富的记录未必成本中性。

**拟议 GameMap 控制措施：** 将数据内容 / 顺序、模型 / 引擎 / 适配器 / 评估器版本、资产及重置策略绑定到实验指纹中。语义发生变化时使用全新的运行目录，而不是复用已保存的评分状态。对于独立随机试验，使用全新状态或显式感知试验的身份；返回相同的缓存观察并不会增加一个样本。记录轨迹 / 缓存设置，并区分累计恢复结果与新执行工作。GEPA 的 valset 用于选择，省略时默认为 trainset；应将最终评估置于优化之外，而不是把该参数名视为受保护的测试划分。

**尚未实现的验收测试夹具：** 剩余预算为零且初始验证批次更大；N 与 P×N 采样下的实际任务 / 提案计数；不具备真实成本跟踪的可调用对象；在数据集重排或评估器变更后拒绝不兼容的恢复；切换缓存 / 轨迹设置后的实际评估计数；以及相同候选的独立重复。没有执行任何一项，也不主张存在通用漏洞或能力增益。

[GEPA-api]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/api.py

[GEPA-engine]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/engine.py

[GEPA-stoppers]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/utils/stop_condition.py

[GEPA-state]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/state.py

[GEPA-loader]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/data_loader.py

[GEPA-lm]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/lm.py

[GEPA-sampling]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/strategies/proposal_sampling.py

[GEPA-license]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/LICENSE

## 运行框架组合与评估核算

将评估结果绑定到完整的候选组合及其执行路径。下文 GEPA 与 Meta-Harness 参考资料分别描述各自的实现；Meta-Harness 案例涉及其分类运行框架。

### 1. GEPA：具名组件不是类型化执行图

在  **f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819** ，[adapter.py][HC-G-adapter] 将 Candidate 定义为 dict\[str,str]。evaluate(batch,candidate,capture_traces) 必须构建系统并返回对齐的输出 / 得分，以及请求时所需的轨迹；make_reflective_dataset 返回逐组件、可 JSON 序列化的记录。ProposalFn 明确允许耦合更新。[组件选择][HC-G-components]提供轮转顺序的单个组件或全部键。

[变异实现][HC-G-reflect]复制父候选，并断言每个返回的替换键均已存在（585–588）；该赋值本身不检查键是否属于 components_to_update，也不强制语义依赖。[合并][HC-G-merge]要求组件键集合相同，并从具有共同祖先的后代中取用完整组件文本。当两个后代都修改了某组件时，可执行代码会选择汇总得分较高的后代，平局时随机打破（159–190），尽管旁边的注释描述的是按比例随机选择。它不会合成其组合工作流，也不会对其进行类型检查。

[候选哈希][HC-G-state]是对经过 JSON 序列化的已排序候选条目计算 SHA-256（37–39）。它标识的是文本，而非构建器、工具实现、操作权限或外部运行时。现有缓存警告仍然成立。

**拟议 GameMap 适配，尚未实现：** 保留 GEPA 映射，例如 tool_schema、workflow 和 evidence_policy，而不是声称 GEPA 提供图语言。冻结构建器接口：validate_and_build(candidate, frozen_contract) 返回计划或结构化的 invalid_candidate 原因。声明原语操作 ID、参数 / 结果模式、依赖边、顺序 / 并行执行、有界重试及错误分支。在评估前验证变异掩码和耦合模式兼容性。将评估器 / 权限置于候选文本之外。使用组件文本哈希加构建器修订版本、原语 / 模式清单、依赖锁定信息以及固定权限哈希来标识可执行候选；将实验 / 试验身份分开。为合并保存父 ID 与所选组件来源。

### 2. GEPA：“指标调用”取决于执行路径

EvaluationBatch 有可选的 num_metric_calls。[反思评估][HC-G-reflect]对父候选与子候选均遵循该值，否则回退到批次长度（372–376、638–642）。[完整验证][HC-G-engine]则在带轨迹时计入 len(val_ids)，否则计入 len(uncached)（287–368）。[合并 / 缓存评估器][HC-G-state]同样返回请求的 / 缓存未命中的示例计数。因此，num_metric_calls 不是嵌套模型调用或重试的通用核算覆盖项。

反思批次计数在批次返回后增加。默认[批次适配器][HC-G-adapter]顺序评估各对；如果较晚的调用在此前已发生外部工作后抛出异常，这条路径不会提供完整的已消耗资源计数。批量反思失败还会触发逐任务重试（[245–272][HC-G-reflect]）；必须保留额外尝试的工作。这些是静态路径，而非已复现的超支。

**拟议控制措施：** 在优化器得分之外维护仅追加的分发 / 结算台账：候选 / 试验 / 任务 / 操作 ID；阶段；预留预算；尝试；观察到的模型 token、工具 / 渲染调用与墙钟时间；已计费 / 估计 / 未知成本；终局状态。核对取消与迟到结果。即使声明的优化指标为其中某些结果赋予相同失败分数，也要将有效任务失败、无效候选、基础设施失败、超时、弃权和未知结果分开。缺失用量报告表示未知，而不是零。预算准入和总成本核对仍是适配器 / 执行器的责任。

### 3. Meta-Harness：具体接口与不完整覆盖边界

在  **8123ccabe2b19fa1123090b2e5f1bacc20963ce8** ，分类示例的 [MemorySystem][HC-M-memory] 要求 predict(input) → (answer,metadata)、learn_from_batch(results)、get_state() → 序列化字符串和 set_state(state)。其[加载器][HC-M-inner]会导入模块并实例化首个检查到的 MemorySystem 子类（479–504）。外层[验证][HC-M-loop]在导入候选时检查进程退出状态为零，且 stdout 包含 OK（192–215）；这比验证运行时接口更窄，而且已经属于代码执行，并非安全的静态检查。

[benchmark.py][HC-M-bench] 要求每个模型 / 数据集 / 候选都具有完整的已配置种子组（179–239），但汇总前沿构建会对实际加载的数据集组的准确率取平均，并不要求每个候选覆盖所有已配置数据集（675–688）。其上下文字符轴则只对严格为正的上下文长度取平均，之后截断为整数；因此，这些轴使用不同的纳入规则。[外层摘要][HC-M-loop]同样对可用数据集取平均（529–540）。零分被标为“失败”；当其他候选有效时，无效导入会从常规摘要中消失（232–244、490–560）。应保留完整清单，而不是将这些摘要视为穷尽的失败分母。

Pareto 轴是 memory_context_chars，而非模型总成本。[MemorySystem][HC-M-memory] 跟踪每个线程的最后一个提示，并以字符定义上下文长度。实际分类评估使用最后跟踪的 call_llm 提示长度减去测试输入长度，下限截为零，并取整数平均（[inner_loop.py 439–469][HC-M-inner]）；这既包含模板文本，也包含记忆，而非序列化状态大小或全部提示。其评估指标不调用默认的 get_context_length 路径。[benchmark.py][HC-M-bench] 另行对可用的运行时、调用和 token 字段求和，缺失字段默认为零。不得将字符效率改称 token 效率或支出效率。

**拟议控制措施：** 对候选代码加依赖 / 配置进行内容寻址；记录确切导出类，而非依赖模块名。晋级要求完整的预先指定数据集 / 种子覆盖，单独报告覆盖情况，并保留每次提案 / 导入 / 评估尝试。不导入不可信候选即可验证接口；后续运行时验证需要另行授权的隔离环境。

### 4. 小型验收测试夹具，尚未执行

1. 合并不兼容的工作流 / 模式版本：分发前拒绝；接受联合一致的更新；记录每个继承组件。
2. 对两个示例返回 num_metric_calls=7：将反思、完整验证与合并计数器同独立模拟台账比较；绝不把不一致的单位解读为相等预算。
3. 两项批次完成一项后抛出异常；反思部分完成后重试。保留全部尝试，并将未解决成本标为未知。
4. 两个数据集 / 两个种子：先省略某候选的整个数据集，再省略一个种子。断言不得晋级为完整套件结果；真正的零分仍可与缺失 / 无效输出区分。
5. 源码变化后复用候选模块名。除非完整执行指纹匹配，否则拒绝复用陈旧结果。

未知事项：安全的可执行计划语法、具体引擎原语语义、依赖锁定信息、强制执行 / 取消及实测成本。这些需要选定一个经授权的运行时。[GEPA v2][HC-G-paper] 与 [Meta-Harness v1][HC-M-paper] 报告各自的实验发现；上述源码路径观察既未复现这些结果，也未证明游戏生产方面的增益。Meta-Harness 的 [README][HC-M-readme] 明确将其描述为整理后的发布，因此不能将其当前默认值等同于论文的实验锁定配置。

[HC-G-adapter]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/adapter.py

[HC-G-components]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/strategies/component_selector.py

[HC-G-reflect]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/proposer/reflective_mutation/reflective_mutation.py

[HC-G-merge]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/proposer/merge.py

[HC-G-state]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/state.py

[HC-G-engine]: https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/engine.py

[HC-M-memory]: https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/reference_examples/text_classification/memory_system.py

[HC-M-inner]: https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/reference_examples/text_classification/inner_loop.py

[HC-M-loop]: https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/reference_examples/text_classification/meta_harness.py

[HC-M-bench]: https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/reference_examples/text_classification/benchmark.py

[HC-M-readme]: https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/README.md

[HC-G-paper]: https://arxiv.org/abs/2507.19457v2

[HC-M-paper]: https://arxiv.org/abs/2603.28052v1

## 浏览器游戏虚拟时间：步进与暂停是不同实验

来源检查日期为  **2026-10-19** 。对 Microsoft Playwright  **v1.64.1**  进行只读审查，其[标签](https://api.github.com/repos/microsoft/playwright/git/ref/tags/v1.64.1)解析为 `cfe490d941f992655948eee8fd4fd94e1c4234bf`。所选发布版本与 GameMap 声明的开发依赖一致，但并非经过验证的基准运行时。仓库[许可证](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/LICENSE)为 Apache-2.0；它不解决浏览器二进制文件、被测游戏或其资产的授权问题。没有执行上游代码、浏览器或游戏。

### 有源码支持的时间边界

- **选择时间的含义。** [Clock API](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/docs/src/api/class-clock.md)区分 `setFixedTime`（固定 Date 值，定时器继续运行）、`setSystemTime`（改变墙钟时间但不触发定时器）、`runFor`（推进并执行沿途回调）以及 `fastForward` / `pauseAt`（跳跃，对过期定时器至多触发一次）。因此，将五秒的游玩间隔替换为五秒跳跃，可能改变更新回调的执行次数。这一后果是 GameMap 将该机制应用到游戏测试的推论，而非实测的游戏缺陷。
- **动画节奏是合成的。** [注入源码](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/packages/injected/src/clock.ts#L355-L401)向动画回调提供模拟时钟刻度，并将每个新的帧请求安排在下一个 16 ms 边界；[单元测试](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/tests/library/unit/clock.spec.ts#L1283-L1359)断言了这一网格。跳跃则可能在目标时刻交付一个已经过期的帧，因为[跳跃路径](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/packages/injected/src/clock.ts#L277-L291)会将过期定时器重新安排在那里。这不是实测显示刷新率、GPU 吞吐量，也不是游戏采用 60 Hz 物理步长的证据。[定时器创建](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/packages/injected/src/clock.ts#L294-L323)会将某一时钟刻度内创建的零延迟定时器安排到一毫秒后。[测试](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/tests/library/page-clock.spec.ts#L473-L519)表明，在所请求终点处的这类嵌套回调需要再推进一次，通过微任务安排时也一样。
- **安装与隔离是显式输入。** [指南](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/docs/src/clock.md#L24-L44)警告，必须在使用被替换的定时器 API 之前安装。API 的作用域是整个浏览器上下文，包括其页面和 iframe，而非单个隔离页面。[服务器分发](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/packages/playwright-core/src/server/clock.ts#L37-L110)将时钟操作应用到各框架，并保留初始化指令供后续文档使用。不要将同级页面视为独立的时间受控试验，也不要由该作用域推断 worker、Web Audio、网络 / 服务器或整个浏览器已同步。
- **手动推进不是瞬时、原子的步骤。** [`runFor` 及其定时器循环](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/packages/injected/src/clock.ts#L169-L195)在捕获同步回调 Error 后继续处理到期定时器、推进时钟，再重新抛出第一个 Error。[浏览器测试](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/tests/library/page-clock.spec.ts#L98-L104)预期稍后的回调会在拒绝前运行。[回调调用器](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/packages/injected/src/clock.ts#L355-L393)在每个回调之后通过真实定时器让出执行权，且不等待回调返回的 promise。因此，推进被拒绝不意味着状态未变，也不意味着可以安全重试；推进完成也不是网络 / 资产就绪屏障。
- **将性能测量排除在该处理之外。** [performance 替换实现](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/packages/injected/src/clock.ts#L754-L772)使 `performance.now()` 跟随模拟时钟刻度。对于此实现复制的 performance 方法，条目查询返回空数组，mark/measure 调用返回合成条目。这些读数不能支持原生帧耗时或资源计时主张。应将实时时钟性能运行与虚拟时间功能运行分开。

### 拟议验收契约，尚未执行

记录游戏 / 构建哈希、Playwright 与实际浏览器修订版本、上下文身份、初始化 / 就绪策略、时钟模式、起始墙钟 / 单调时钟值、有序时钟命令和输入事件、随机性 / 重置策略、应用时钟刻度计数器、回调 / 错误轨迹以及步进后状态。该发布版本的[浏览器清单](https://github.com/microsoft/playwright/blob/cfe490d941f992655948eee8fd4fd94e1c4234bf/packages/playwright-core/browsers.json)是预期依赖列表，并不能证明已安装的可执行文件。

引导完成后，使用明确静止的游戏开始边界；在活动游玩期间进行大幅 `pauseAt` 跳跃，本身就是一种暂停处理。发出玩家输入前先确认起始状态。将实时时钟游玩、全步进虚拟时间与暂停 / 恢复探针保留为不同条件，各自单独声明判定规则。对于异步效果，应要求应用自有的完成信号，而不是任意添加额外模拟时间，直到测试通过。

**尚未执行的测试夹具：**

1. 在各自全新的上下文中，从同一暂停基线之后开始相同的、采用正值 100 ms 间隔的移动与冷却逻辑；比较 `runFor(1000)` 和 `fastForward(1000)`。记录回调次数、经过时间计算与最终状态。不同结果可能反映已声明的时间处理，而不自动意味着游戏错误。
2. 记录起始模拟时钟刻度相位，将自重调度的动画循环推进到下一个 16 ms 网格边界之前以及该边界上。从终点 T 触发的定时器回调中，安排嵌套的零延迟后续动作：断言它在 T 不存在，而在预先声明推进至 T+1 后存在，而不是在 T 无限等待，或默默扩展预算。
3. 让一个定时器在另一个定时器修改得分前抛出 `new Error(...)`。保留拒绝及其产生的状态，然后丢弃该试验上下文，而非盲目重复推进。
4. 纳入一个同级页面，以及在使用时单独观察的 worker / 音频或服务器截止时间。确立哪些时钟确实发生移动；不受支持的同步会使该测试夹具不在虚拟时间主张范围内。

这些是原创的拟议运行框架检查。它们不能确立确定性模拟、外部时钟同步、已交付渲染帧、可复现基准评分或实时性能。

## 规则设计搜索是独立的评估总体

[GAVEL 源码 / 论文审查](../ecosystem/2d-3d-development.md#gavel-rule-design-search-and-verdict-boundaries)区分 Ludii 编译、随机游玩与 UCT 样本、档案占用、相对参考的创新性以及人类兴趣。所选代码与论文协议在适应度汇总及完成语义上存在差异；失败哨兵值和请求预算需要明确解读。这些棋盘规则观察不能确立通用游戏开发成功，也不能确立未经触碰的最终测试结果。

## 在线运行框架适配与变更级审计

检查日期为 2026-10-19。以下互补研究扩展了仅基于来源的方法清单。两者均不能确立其在游戏生产中的有效性。

### Harness²：对比式任务局部编辑与可复用改进证据

[10 月 9 日论文 v1](https://arxiv.org/html/2610.14224v1)研究的是专业工作基准上的冻结模型运行框架适配，而非游戏生产。它提出不变性编辑和领域特定编辑，在同一任务上探测它们，再根据执行对比组合出后继方案。这些对比不能认证正确性。下一任务从共同的基础运行框架开始；已采纳组件和经验教训为后续提案提供信息，而非自动替换该基础。并行宽度与顺序深度是不同的预算选择。论文报告三条打乱顺序的任务流，并讨论选择退化、共享的错误前提、额外推理成本和不确定的迁移。其对完整库的留一分析可以访问后续任务，并明确属于离线复用分析，而非在线增益估计。这些区别使其成为在项目任务之间改变视觉运行框架的有用比较参照，同时不把选出的输出当作已验证改进。

**已发布接口。** 作者链接的[仓库快照](https://github.com/google-research/harness2/tree/1cfe254e8d25b15f37048c3730134686abe60335)包含编排代码、基准桥接器和确定性演示。其 [README](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/README.md) 描述 OpenCode / Codex 执行器以及由模型支持的 JobBench、LAB 和 WorkBuddy 工作流。这些需要外部依赖和模型访问权；此处均未安装或运行。Apache-2.0 涵盖仓库自身代码，第三方代码 / 数据则保留各自条款。已发布代码与论文结果是分开的证据；本次检查不能确立正是这些确切字节产生了论文结果。

**来自同一固定版本的运行边界：**

- [实验指南](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/docs/EXPERIMENTS.md)：任务顺序设置种子，模型采样则没有。`max-tasks` 按领域生效。生成的任务分区是本地产物，JobBench 下载修订版本在设置时记录，而非由仓库固定。该发布版本警告，不受限网络访问可能暴露公开评分细则，并报告过一次此类验证运行检索；该警告和提示指令都不能确立受保护评估。此处未改变任何网络 / 安全配置。
- [库实现](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/library.py)：保留条目包含完整组件树与经验记录；准入检查要求 cue、lesson 与 evidence 字符串非空。这些结构检查不能确立经验教训的真实性。
- [预算台账](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/ledger.py)：名义恒等式统计 `4k` 个 rollout 条目和 `3k` 个改进阶段条目。重试尝试、选择与反思必须单独核算；缓存条目不是新的独立执行。
- [报告实现](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/report.py)：已评分行构成得分分母，未评分行另行计数。该模块还警告继承运行框架的回退、选出的基础 / 候选输出以及混合评分单位。比较醒目的平均值之前，应先读清这些总体。
- [完成标记](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/runmark.py)：API 文档记载，在运行器正常返回后记录，保存所提供树的指纹，或在未提供运行框架目录时保存共享的 `base` 哨兵值。它不独立验证完成。这是复用元数据，而非有效游戏行为、全新模型采样或独立成功任务的证据。

**比较模板：** 在相同总预算下，比较固定运行框架、无库的任务局部编辑，以及带项目隔离库的相同编辑。将任何视觉经验教训绑定到帧 / 构建 / 产物 ID；保留编辑器 / 运行来源及无效判定计数。预留受保护的项目测试，并审计从完整候选到选中方案再到继承状态的整个链条。这是拟议的游戏生产实验，而非已证明的收益或兼容的 pi 集成。

### 审计晋级与继承状态

[《自我改进智能体中的运行框架篡改审计》，v1](https://arxiv.org/html/2609.00069v1)增加了变更级视角：义务可能在执行、评估、选择、记录或传播过程中失效。其构造数据集将匹配的故障 / 良性编辑插入已记录变更；分类会收到目标行，而定位必须自行找出这些行。构造过程提供标签，人工检查覆盖其中子集。所报告的自然运行分析对已发布轨迹应用模型审计器。其发现率并非独立确立的缺陷流行率，植入对照的假阳性率也不能确立自然运行的精确率。祖先中被标记的编辑，不能证明它在后代中激活或因果性地提高得分。所审查论文 / 存档稿件档案未能确立与作者关联的审计器、标注数据或完整输出发布；可用性仍未验证。论文许可不能确立软件 / 数据权利。此处没有执行审计器或所谓缺陷。

将现有候选来源追踪扩展到晋级与后续复用。记录完整差异及相关变更前状态、冻结的允许变异 / 义务清单、可疑行、支持性轨迹 ID 及处置结果。将静态怀疑、人工裁定缺陷与已复现效应分开。使用原创配对测试夹具检验：

- 尽管剩余得分极佳，却缺失必需的平台 / 完整游玩结果
- 用先前构建的截图或资产报告替代当前证据
- 省略失败导入或超时，同时保留其成功重试
- 通过合并继承的报告缺陷，同时设置真正修复的对照

将原始事件与受保护的验收清单比较，并分别报告检出与误报。模型标记应促成调查；仅行号改变并不能证明修复。该提案补充受保护评估器与任务划分，但不声称审计模型能认证运行框架的安全演化。

## 游戏编辑循环、可复用玩家与规格说明恢复

检查日期为 2026-10-19。这些互补研究为[运行框架适配讨论](#online-harness-adaptation-and-change-level-audit)增加了具体的游戏创作机制。将演变中的游戏、玩家策略、推断出的规格说明和运行框架本身保留为独立候选对象。下文区分论文结果、已检查的发布契约和 GameMap 提案；本资料集未运行其中任何系统。

### GameCraft-Bench：上游从回放到评分的契约

[GameCraft-Bench](https://arxiv.org/html/2606.17861v1)评估完整 Godot 项目和智能体提供的演示。在后续适配器共享的上游版本 [`a4334753`](https://github.com/FreedomIntelligence/gamecraft-bench/tree/a43347534374df9a0c1a6c001aa9380862783f6d) 中，轨迹仍对开发可见；“隐藏”描述的是评估评分细则的角色，而非秘密测试轨迹。具名场景可能初始化进阶状态。因此，得分关乎已展示的需求，而非独立发现的可玩性或乐趣。本次来源审查没有运行游戏或裁判。

**证据预算。** [任务契约](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/tasks/cardgame-autobattler/instruction.md#L98-L152)要求提供 1–10 条轨迹，以 30 FPS 计最多 600 帧。[评分器](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/gamecraft_bench/verifier/score.py#L110-L184)采用可覆盖的默认值，在回放前保留前十个文件名。每次[全新启动](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/gamecraft_bench/verifier/replay.py#L73-L218)默认采用 1280×720 输入视口及缩放后的 854×480 MP4。[帧采样器](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/gamecraft_bench/verifier/score.py#L342-L402)默认间隔为 0.5 秒，对较长录像则采用以演示名称为种子的连续 20 秒窗口；短录像可能克隆其最后一帧。回放另有默认 90 秒限制。这些分别是提交、回放和观察限制。

[OpenAI 裁判](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/gamecraft_bench/verifier/judges/openai_gpt.py#L59-L139)默认为 GPT-5.5，最多发送 40 张采样 PNG，已发布的 Claude / Kimi 路径也是如此。[Gemini 路径](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/gamecraft_bench/verifier/judges/gemini.py#L39-L100)则发送完整 MP4。采样窗口不是通用的视频时长上限；选择提供商可能同时改变证据模态和判定。

**汇总与失败。** 每个[评分细则条目](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/gamecraft_bench/verifier/score.py#L298-L317)对已评分演示取 max（默认）或 mean；不同条目可以在不同完整游玩中取得最高分。[所检查任务的评分细则](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/tasks/cardgame-autobattler/tests/rubric.json#L1-L9)将条目均值与构建门槛结合，机制 / 深度 / 视觉 / 美术权重为 15/35/15/35。捕获到的回放失败会被记录并跳过，从而缩小均值的演示分母。相反，五次裁判尝试失败会使该已回放演示的各条目得零分。缺失、null 或非数值回答（包括“NA”）也变成零；没有按覆盖率排除的规则。没有成功证据时，各需求保持零分。应在得分之外保留失败计数。[失败处理](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/gamecraft_bench/verifier/score.py#L142-L268)、[响应解析器](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/gamecraft_bench/verifier/judges/_common.py#L68-L106)

**发布与迁移。** 该固定版本包含 140 个任务包以及一个示例、公开评分细则、评估器和参考源码材料；部分参考脚本是[占位内容](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/tasks/sports-archery-quest/solution/solve.sh)。这并非已检查的全任务运行档案。[Apache-2.0](https://github.com/FreedomIntelligence/gamecraft-bench/blob/a43347534374df9a0c1a6c001aa9380862783f6d/LICENSE)涵盖仓库代码；下载的资产条目保留各自条款。对于拟议 GameMap 比较，应冻结项目 / 轨迹哈希、文件名、场景、捕获 / 采样设置、后端 / 模型以及失败分母。即使共享评分细则和公式，也应分别标记上游回放、RSIGame 修补 / 补齐后的回放，以及 Recursive Game Creator 的原生录像。

### RSIGame：持久证据与保留的游戏检查点

[RSIGame v1](https://arxiv.org/html/2609.39045v1)结合了证据引导的游戏编辑、演变中的检查清单和独立检查点选择；可选指导会开启另一阶段。无需训练的轮次改变游戏产物和工作上下文，而单独的经验内化会微调生成器。两者均未展示递归运行框架代码优化。基准评分细则是隐藏的，但提交演示在开发期间仍然可见。小规模自由游玩检查改变了现有任务上的交互路径；它不能确立对未见游戏或人类乐趣的泛化。

**经源码检查的机制。** 在[提交 1214b342](https://github.com/WenyiWU0111/RSIGame/tree/1214b342fce22e97fe19bfc56be189d06f44634b)中，当后续回放未观察到某条目时，[检查清单状态](https://github.com/WenyiWU0111/RSIGame/blob/1214b342fce22e97fe19bfc56be189d06f44634b/src/rsigame/checklist/checklist_state.py)会保留已有支持的发现，同时单独跟踪陈旧性和暂缓处理。[问题验证器](https://github.com/WenyiWU0111/RSIGame/blob/1214b342fce22e97fe19bfc56be189d06f44634b/src/rsigame/controller/verify.py)将观察到的持续存在 / 消失 / 未触发与编辑器的尝试工作报告结合，保留部分修复和未知项。这些是模型辅助的运行时观察，而非权威行为断言。冠军选择会[比较共同已观察覆盖范围内的标准值](https://github.com/WenyiWU0111/RSIGame/blob/1214b342fce22e97fe19bfc56be189d06f44634b/src/rsigame/eval/estimator/aggregate.py)；未观察到的标准会被排除，而不是计零分。

**停止与评分。** [已发布的默认行为](https://github.com/WenyiWU0111/RSIGame/blob/1214b342fce22e97fe19bfc56be189d06f44634b/src/rsigame/monitor/live.py#L14-L34)在全部 30 轮开发结束后回顾性地选择检查点，并明确标识为论文运行流程。回顾性停止估计不应被描述为前瞻性避免的调用。可选在线监控在轮次边界结束，不会回滚工作树。[评分包装器](https://github.com/WenyiWU0111/RSIGame/blob/1214b342fce22e97fe19bfc56be189d06f44634b/src/rsigame/eval/score_game.py)有条件地将回放时长延长到基准原始上限之外，并记录这一偏离。应保留确切的回放 / 补齐配置与所选构建。

**发布与权利。** [固定版本的 HF 发布](https://huggingface.co/datasets/RSIGame/RSIGame-TableArtifacts/tree/2735939d5a75c95c6cb67130a9485fbc0e3881cc)列出基础 / 已评分游戏归档、裁判记录和 19 份清单；不包含中间轮次与完整录像。仅基于来源的算术核算，使用完整的 140 任务分母（包括缺失任务零分），复现了其宣称的 19 个四舍五入均值。这并不重新计算玩法评分。当前论文 24 个主要结果行中的五行未包含在本次检查的发布中。所检查数据卡 / 根目录未声明数据集许可证。[代码 Apache-2.0](https://github.com/WenyiWU0111/RSIGame/blob/1214b342fce22e97fe19bfc56be189d06f44634b/LICENSE)不能确立游戏资产、模型权重或外部服务的权利。所需修复分叉与修补后的 GameCraft 依赖需单独固定版本；尚未确立此代码修订版本就是实验提交。

**拟议迁移，尚未实现：** 在自有测试夹具上比较返回最后构建、固定预算冠军选择以及前瞻性在线停止；该夹具应包含一次回归、一个未触发功能和一次裁判失败。将游戏编辑搜索与运行框架搜索分开。此处没有运行模型、引擎、基准或已发布测试。

### Recursive Game Creator：源码辅助策略与保守保留

**来源范围：** [论文 v2](https://arxiv.org/html/2610.08621v2)，已发布实现在 [`8284cae`](https://github.com/IMBALDY/RecursiveGameCreator/tree/8284caeac655e8c6c08354a759b97b1599d426fd) 检查。没有运行智能体、游戏或评估器。演变对象是游戏项目；正常运行不会修改模型权重、角色提示或控制器代码。

Player 读取源码副本，编写 `reset(seed, profile)` / `act(state)` 策略代码，并执行真实键盘 / 指针动作，无需逐动作模型调用。策略从保留的游戏继承，但新版本会收到一次适配调用。因此，相同种子不能确立相同的玩家技能。策略完成并不等于独立验证的胜利，三个具名配置档也不能证明多样的人类式行为。[策略继承与编写](https://github.com/IMBALDY/RecursiveGameCreator/blob/8284caeac655e8c6c08354a759b97b1599d426fd/src/game_agent_lite/policy.py#L297-L437)

行为轨迹和采样图像输入独立审查者。实现仅在检查 / 证据有效，且两种相反 A/B 呈现顺序都偏好更改后的候选时才保留它；分歧、平局或证据不可用时保留现任方案。引用 / 哈希检查确立证据身份，而非审查结论为真。普通 2 FPS 捕获不能认证短暂反馈、帧节奏或输入延迟。[晋级门槛](https://github.com/IMBALDY/RecursiveGameCreator/blob/8284caeac655e8c6c08354a759b97b1599d426fd/src/game_agent_lite/loop.py#L19-L28)、[捕获边界](https://github.com/IMBALDY/RecursiveGameCreator/blob/8284caeac655e8c6c08354a759b97b1599d426fd/docs/player-policy.md#L196-L213)

**复现边界：** 已发布的 45 任务 GameCraft 路径可在单独请求评分时，通过上游裁判 / 公式为原生 Player 捕获评分，并与官方输入回放分别标记。它记录 `recording_score`，同时令 `official_score=null`，并索引每轮候选，包括被拒绝的候选。GameASG 适配器运行一轮，在使用仅测试评估器时，明确将严格端到端成功留为 null。这些是可用的适配器实现，而非复现已发布主要结果的凭证。[GameCraft 准备](https://github.com/IMBALDY/RecursiveGameCreator/blob/8284caeac655e8c6c08354a759b97b1599d426fd/scripts/run_gamecraft_batch.py#L122-L183)、[候选 / 得分记录](https://github.com/IMBALDY/RecursiveGameCreator/blob/8284caeac655e8c6c08354a759b97b1599d426fd/scripts/run_gamecraft_batch.py#L290-L378)、[GameASG 指标](https://github.com/IMBALDY/RecursiveGameCreator/blob/8284caeac655e8c6c08354a759b97b1599d426fd/scripts/run_gameasg_batch.py#L223-L244)

代码采用 MIT；图示、截图及其他非代码资产明确排除在外，除非另行许可。所检查仓库包含回归测试源码和配置，但 `runs/` 仅包含占位内容，而非完整论文运行输出。基准仓库、运行时镜像以及裁判 / 模型访问权仍是外部依赖。[权利](https://github.com/IMBALDY/RecursiveGameCreator/blob/8284caeac655e8c6c08354a759b97b1599d426fd/README.md#L223-L225)、[基准依赖](https://github.com/IMBALDY/RecursiveGameCreator/blob/8284caeac655e8c6c08354a759b97b1599d426fd/docs/benchmarks.md#L1-L5)

**拟议迁移，尚未实现：** 在适配后的探索之外保留固定策略回归测试，将权威玩法检查与视觉偏好分开，并在检验组合证据是否改善保留决策之前，记录全部尝试 / 捕获模式 / 成本。

### GameReplica：实现复刻版之前先恢复规则

[GameReplica v1](https://arxiv.org/html/2609.22308v1)增加了一项不同任务：通过截图、点击、按键和重置推断运行中游戏的规格说明，随后交付自包含 HTML 复刻版及推断出的规则检查清单。其 125 个任务覆盖 25 款游戏，每款五个难度级别。第 3.4–4 节使用模型裁判，分别评估检查清单一致性、实现一致性和视觉保真度；源码评估不是确定性的行为等价判定器。视觉 `NA` 条目不计入该得分分母。表 1 对三次重复取平均，但其显示的样本标准差是跨任务实例计算的。“Faithful”失败分析类别要求具备 HTML、视觉得分 ≥60，以及实现 / 规则平均得分 ≥50，而非完美恢复规则。过程级失败归因通过另一次模型判定来比较轨迹，而不是受控的因果干预。

**已检查发布。** [论文链接的项目网站](https://qqqqqqby.github.io/GameReplica/)有对应的[公开展示仓库，固定在 `acddd12a`](https://github.com/QQQQQQBY/GameReplica/tree/acddd12a2e8a978cc785dae0ba32f84dd76f0701)。其完整目录树包含跨八款游戏、40 个游戏–级别组合的 401 个演示 HTML 文件，其中包括 40 个原版；这些是展示子集，并非全部 125 个任务包或评估器已发布的证据。其他文件包括页面、展示脚本与清单、图示、框架插图及托管标记。所检查目录树中没有许可证文件或评估运行器；仓库元数据未检测到许可证。仅公开访问不能解决复用权利。[该页面](https://github.com/QQQQQQBY/GameReplica/blob/acddd12a2e8a978cc785dae0ba32f84dd76f0701/index.html)明确按已完成实例平均 token / 时间成本。其[展示数据](https://github.com/QQQQQQBY/GameReplica/blob/acddd12a2e8a978cc785dae0ba32f84dd76f0701/assets/data.js)与醒目文本中的排行榜报告值不同，因此应保留各产物的修订版本，而非将页面视为对论文评分的可机器验证复现。

**GameMap 拟议适配：** 在相同的显式截图 / 动作 / 重置预算以及固定模型 / 运行时 / 时间限制下，比较固定截图、预定动作轨迹与主动边界探针。按源游戏划分，而非仅按难度变体划分。将推断出的规则检查清单与实现产物分开保留；在声称恢复机制前，要求受保护的留出交互轨迹和明确失败分母。这些是尚未实现的实验控制措施，而非已报告的 GameReplica 结果。
