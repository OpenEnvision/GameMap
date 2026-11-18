# 游戏玩法状态、叙事检查点与持久效果

确定哪些内容必须在存档、检查点、回放或重试后保留。下列接口将解释器状态、游戏世界状态、数据库事务、物理及客户端观测分开，以便为各自设计恢复检查。

## 叙事检查点、取消与世界效果事务

设计检查点时，将叙事进度、世界状态及外部效果区分开。使用下列运行时接口，确定哪些地方需要同步。

### 关键发现与资格门控

对话运行时可以持久化其变量或解释器状态，却不持久化其命令造成的世界变更。停止对话可能仍让异步游戏代码继续运行。因此，代理绝不应将“对话完成”“变量已保存”或“故事已重置”直接等同于“任务事务已提交或回滚”。使用下方事务模板协调这些状态。

本次新检查的 Yarn Godot GDScript 集成为  **Early Access 3.2** ，要求标准  **Godot 4.6+**  构建，其 README 建议暂勿用于正式发布。免费源代码与付费附加组件分别提供。安装文档与 README 对付费包当前是否可用的说法不一致，因此不对购买或付费功能可用性作出断言。来源：[安装](https://yarnspinner.dev/docs/godot/gdscript/01-installation/)、[官方仓库](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/README.md)。

#### 针对特定用途的许可证警告

检查的集成采用 [Yarn Spinner Public Licence 1.0](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/LICENSE.md)，而不是笼统的 MIT 许可证。第 3.3 节限制将所涵盖的软件/文档/材料用于训练、微调或以其他方式改进 AI，同时明确允许 AI 辅助游戏开发、Yarn 脚本编写及学习。第 3.2 节允许某些集成工具，条件是用户独立取得 Yarn，且工具不捆绑、再分发或自动下载它。还适用署名及分发条件。对于优化器数据集、自动化改进和再分发，应将其视为资格尚未解决、需针对具体用途审查的事项；本只读报告不判定其合法性，也不授予许可。不要将此许可证摘要套用于所有历史 Yarn 版本、引擎集成或组件。在预期用途经审查之前，应优先为可执行优化实验选择另行完成许可审查的替代方案。

### 文档记载的操作边界

#### 1. Yarn Godot：变量保存不是对话游标检查点

[GDScript 3.2 的变量与存储](https://yarnspinner.dev/docs/godot/gdscript/05-connecting-to-your-game/04-variables-and-storage/)记载了 `save_state_to_persistent_storage` 和 `load_state_from_persistent_storage`，它们使用 `user://`；两者均返回布尔值。加载会替换当前变量。保存的数据不包括对话位置：应用程序必须保留重启节点，并在加载后显式启动该节点。`get_all_variables` 和 `set_all_variables` 允许集成至应用程序存档。自定义 `YarnVariableStorage` 可以使用游戏自身的数据。支持的变量值为数字、字符串和布尔值，不包括场景节点或变换。订阅通知变化，而非初始状态；节点离开树时，节点作用域的订阅会被移除。

**固定版本的存储实现：** [运行器保存/加载方法](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/dialogue_runner.gd#L1112-L1190)序列化六个并行的键/值数组。保存先检查文件是否打开，然后写入、关闭并返回 true，没有写入后错误检查或回读；该返回值不是崩溃持久性的证据。加载在接触存储前会拒绝非字典、缺失/非数组的区段及不等长的键/值数组，但随后会将键和值转换为声明的类型。它不检查故事哈希或应用程序模式。[默认存储](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/core/in_memory_variable_storage.gd#L54-L158)清除已有变量，并通过逐个设置方法重新填充；无效名称可能被拒绝，却没有失败结果传至加载器，而且设置方法在恢复期间会通知监听器。因此，加载结果为 true 不能证明模式已被完整接受，也不能证明观测者看到的是原子快照。自定义存储可能不同。这些是静态来源边界，而非已复现的存档失败。

**建议的门控：** 选择可安全重启的叙事边界，保留已编译程序标识和重启节点，并将世界状态存档与变量一并保留。根据恢复后的权威值重建 UI/世界呈现，而不是假定监听器会重放每个初始值。存档缺失或格式错误、场景引用及兼容性迁移需要项目特定处理；原子写入、崩溃持久性及恢复时监听器的运行时行为仍未经验证。

#### 2. Yarn Godot：停止完成不等于命令取消

[GDScript 3.2 的异步与取消](https://yarnspinner.dev/docs/godot/gdscript/05-connecting-to-your-game/08-async-and-cancellation/)区分呈现器加速显示与下一内容请求。呈现器必须先返回才能推进；五秒后的警告是诊断，而非强制回滚。命令没有呈现器取消令牌。可以等待 `stop_dialogue()`，它依次发出 `dialogue_cancelled` 和 `dialogue_completed`；但已经在等待中的命令仍可能继续执行自身代码。指南建议在 await 之后检查运行状态。`YarnAsync.wait` 遵循节点处理/暂停状态，并在节点离开树时结束；取消令牌的超时则在暂停期间继续计时。

**固定版本的生命周期实现：** [运行器](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/dialogue_runner.gd#L1479-L1545)已在等待命令处理前后捕获 `_run_id` 和 `_line_epoch`，并在推进当前内容前拒绝陈旧完成。这保护了运行器的后续执行；却不会撤销命令内部执行的效果。正常停止路径等待完成 promise，但[退出树时的清理](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/dialogue_runner.gd#L250-L279)刻意既不发出 `dialogue_cancelled`，也不发出 `dialogue_completed`。[结束过程中由呈现器触发的重启](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/addons/yarn_spinner/dialogue_runner.gd#L703-L717)也可能抑制旧运行的完成信号。因此，仅依赖信号的观测者不得假设每次结束的运行都会产生一对终止事件。[上游测试](https://github.com/YarnSpinnerTool/YarnSpinner-Godot-GDScript/blob/642e9ad61ff8e7dd01476fd5a89e675d380c3122/tests/test_dialogue_runner.gd#L113-L141)涵盖普通停止信号次数及从完成监听器重启；这些测试仅被阅读而未运行，不能确立外部效果取消。

**建议的门控：** 除了运行状态，还应为外部世界命令维护应用程序拥有的对话/会话标识，作为运行器内部防护的补充而非替代。仅检查运行状态，不能证明旧命令属于新启动的对话。这是建议测试的陈旧世界效果风险，不是断言运行器缺乏陈旧后续执行防护。停止后，在创建快照、重置或启动另一场景之前，独立核对未完成的世界命令。在未记录取消意图及结果时，不要把完成事件解释为自然完成。

#### 3. Yarn Unreal：变量槽与项目切换具有不同的重置范围

[Unreal 官方快速入门](https://docs.yarnspinner.dev/yarn-spinner-for-unreal/unreal/tutorial)记载了使用 `USaveGame`、返回布尔值的 Save/Load Variables To Slot；加载会清除已有变量，并序列化 float/string/bool 值。`SetYarnProject` 停止活动对话、替换 VM 程序、更新本地化及初始值查找，并重置呈现状态，同时 **保留已有存储变量** 。快速入门将此集成标为预发布，警告其 API/功能可能改变，并建议暂勿用它发布游戏。此滚动更新页面不能确立已安装的插件或 Unreal 版本。

**建议的门控：** 切换章节/DLC 时，需要明确的内容版本迁移及变量命名空间策略。新程序加旧变量并非干净重置。将仅含变量的槽与包含物品栏、角色状态、世界激活状态及不可逆效果历史的应用程序存档分开。在可执行使用前，必须针对选定插件检查完成、取消和项目切换行为；不假定其与 Godot 或 Unity 对等。

#### 4. Ink：重置与后台保存协议彼此不同

新检查的[提交 35c63e52f1d36060930dc7ed3cfba38ea224b528 中的 Story.cs](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/ink-engine-runtime/Story.cs)为先前审阅的运行时指南补充了具体边界：

- `ResetState()` 创建新的 `StoryState` 并重置全局变量；`ResetCallstack()` 通过 `ForceEnd` 结束求值，而不是重置有意义的故事状态
- 两者均拒绝在活动的 `ContinueAsync` 求值期间使用，通过 `IfAsyncWeCant` 实施该限制
- `CopyStateForBackgroundThreadSave()` 返回冻结状态，而实时状态使用补丁；第二次并发后台保存会抛出异常，且在异步继续期间启动该协议会被拒绝
- `BackgroundSaveComplete()` 结束后台保存模式，并按代码所述应用或延后内部补丁

**边界：** 这些操作管理 Ink 解释器。检查的文件不提供文件系统原子性、检查点到新故事的迁移、外部游戏效果补偿，或将叙事与应用程序存储连接起来的事务。已有记录说明了此确切仓库修订的 MIT 许可证范围；不暗示任何额外的源代码/媒体许可。固定来源不等于经过测试的运行时锁定。

### 建议由应用程序拥有的事务封装

本节是原创集成设计，并非断言 Yarn 或 Ink 实现了这些字段。

有界测试场景可将任务进度表示为三个协调记录：

1. **叙事检查点：** 已编译故事/程序哈希、所选运行时/版本、保存的变量或解释器字节，以及必要时的重启位置
2. **世界检查点：** 由应用程序拥有的物品栏、可交互对象/角色状态、任务实例标识及世界/内容修订
3. **效果日志：** 稳定操作 ID、任务/会话代次、预期效果、原生确认及已提交/失败/未知状态

日志不会自动具备持久性或恰好一次语义。它需要应用程序存储实现及一致的提交协议。本地幂等令牌无法保证远程支付、成就或分析恰好执行一次。这些外部效果需要各自的权威方及对账 API，应排除在初始测试场景之外。

命令应为其操作 ID 发布可观测的终止结果。适配器必须区分已排队、执行中、已应用、已记录和已确认。如果执行或保存是在应用效果之后、记录之前被中断，恢复时应查询权威世界状态或核对日志，而不是盲目重放对话节点。绝不要从叙事变量的恢复推断回滚。

重置时，先使旧会话代次失效、停止呈现、核对未完成命令、恢复可丢弃的世界/检查点对、重建呈现，再从声明的叙事边界启动。此顺序是待验证的建议，不是通用引擎配方。若应用程序无法停止或核对某个命令，应报告重置不完整，而不是让它与新对话竞争执行。

### 具体的验收测试场景

使用原创的可丢弃内容：任务授予一把钥匙、打开一扇门，并记录一个已完成步骤。无需付费或外部不可逆效果。

| 故障注入               | 所需的独立观测                  | 建议的验收方式                         |
| ------------------ | ------------------------ | ------------------------------- |
| 在延迟的授予命令期间停止       | 取消/完成信号、命令操作 ID、代次、前后物品栏 | 旧命令不能静默向新会话授予物品；存续工作可见且已核对      |
| 在世界存档之前保存变量        | 叙事/世界快照标识及钥匙/门状态         | 拒绝不匹配的检查点或显式恢复，绝不报告为有效的完整存档     |
| 在可能再次授予物品的重启节点重新打开 | 重启节点、效果 ID、权威物品数量        | 不产生重复钥匙；重复请求返回相同的已核对结果，或显式失败    |
| 切换到变量名重叠的 Yarn 项目  | 新旧程序哈希、保留变量及迁移决定         | 保留行为是有意的；不会把改变的默认值误认为干净重置       |
| 重置 Ink 调用栈与完整状态    | 前后变量、访问状态、选定路径及世界状态      | 重置范围保持可区分；除非应用程序恢复外部效果，否则外部效果不变 |
| 启动第二次 Ink 后台保存     | 来源异常/状态及首次保存的所有权         | 保留错误，不破坏首次保存协议，也不虚称已提交两个检查点     |
| 在命令和 UI 取消超时均活动时暂停 | 单调时钟、模拟时钟、节点处理模式及回调      | 时间域差异保持可见；超时不是命令完成的证据           |

测试场景需要项目自行负责观测者及声明的断言。不存在运行 ID、实测容差或成功率。有价值的新覆盖是明确区分解释器/变量检查点与世界效果事务，再加上具体的取消风险及版本/许可证门控。通用任务回滚、分布式提交、故事版本迁移及完整模拟重置仍是待实现工作。

### 可复现性记录

- 核查日期：2026-10-18
- Yarn 文档：滚动更新页面显示为 GDScript Early Access 3.2。后续源码阅读解决了先前的查找阻碍，定位到提交 `642e9ad61ff8e7dd01476fd5a89e675d380c3122`（2026-10-16）。检查了 README、LICENSE.md、`dialogue_runner.gd`、默认/基础变量存储及部分运行器测试。这固定的是来源，而不是已安装的 Godot/插件环境或单独托管的文档。
- Ink 检查的源码提交：`35c63e52f1d36060930dc7ed3cfba38ea224b528`；文件 `ink-engine-runtime/Story.cs`；审阅了约第 299–332 行的重置方法、约第 828–868 行的后台保存及约第 1775–1778 行的异步防护
- 本地来源 SHA-256：`10a150e6438360f346bfad4ffd17749bcdc5ae851fd11e4bb957ed27e0604340`
- 未进行引擎/插件安装、模型训练、基准评估或可执行适配器晋级

## 服务器拥有的游戏玩法状态与事务边界

对于后端任务或奖励，在将其连接至叙事进度前，先确定事务边界、重试行为及持久结果。

### 权威不意味着自动持久化或复制

[Nakama 权威多人游戏](https://heroiclabs.com/docs/nakama/concepts/multiplayer/authoritative/)需要自定义对局逻辑。对局状态在对局期间驻留于内存；变化不会自动广播。除非项目逻辑结束处理程序，否则即使没有玩家连接，它们也会继续运行。过载循环可能导致服务器结束对局。文档将对局迁移及集群功能单独标为 Enterprise 功能。这些约束提供了有用的反例，说明不能把成功的输入消息当作持久的任务完成。

**建议的证据：** 区分已接收输入、已验证命令、内存内状态转换、已提交的持久状态、已发出的通知及客户端观测结果。广播回执不能确立奖励已提交，数据库写入也不能确立客户端已看到结果。对局重启和重连需要明确的重建策略；不推断通用主机迁移保证。

### 条件存储是冲突检测，不是业务操作去重

[存储集合指南](https://heroiclabs.com/docs/nakama/concepts/storage/collections/)通过集合/键和所有者定义对象标识。批量写入是事务性的；提供先前观测的版本会拒绝陈旧更新，条件写入失败会拒绝其整个批次。[错误参考](https://heroiclabs.com/docs/nakama/server-framework/errors/)警告，客户端可见的 HTTP400/InvalidArgument 可能表示版本冲突，也可能表示权限不足。在决定恢复前，保留服务器端错误分类并重新读取获准访问的状态；不要假定每次拒绝都值得重试。

**建议的任务门控：** 在同一个预期事务内，使用适当版本前置条件，持久化项目定义的完成标识符及奖励状态。如果响应交付丢失，在重新提交奖励增量前核对该标识符和状态。仅靠条件版本并不能定义恰好一次的游戏玩法语义、外部效果回滚或授权策略。

### 具体游戏教程暴露了重试风险

官方 [Pirate Panic 存储教程](https://heroiclabs.com/docs/nakama/tutorials/unity/pirate-panic/storage/)将玩家牌组存于服务器端，并以增量而非替换方式更新服务器拥有的游戏内货币余额。其钱包示例可选地记录账本条目/元数据，之后刷新客户端账户。教程明确表示 Pirate Panic 未展示条件存储。因此，账本条目或对局 ID 注释并不是已演示的幂等性保护。

**建议的测试场景：** 在响应丢失后重放同一任务完成请求，比较余额、物品栏、完成标记及账本。分别测试并发领取和被拒绝的写入。这是游戏状态一致性测试，不是要求执行真实金融交易。

### 确切源码检查：事务范围及一处文档不匹配

[发布说明](https://heroiclabs.com/docs/nakama/getting-started/release-notes/)列出 Nakama3.41.0 搭配 nakama-common1.48.0。本次审查期间，标签 v3.41.0 解析为提交 `cab8af584947ff0d7ebee91d6c33e67d87fd3e47`；这是来源固定，不是已安装版本的断言。

- [该提交中的 core_multi.go](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/core_multi.go)通过同一个数据库事务辅助函数执行账户更新、存储写入/删除及钱包更新。存储索引维护在该事务之后进行。部分错误路径会随错误返回 `walletUpdateResults`；已填充的结果本身不是提交确认。此被检查函数并未将任意引擎变更、文件、广播或第三方调用放入数据库事务。
- [该提交中的 db.go](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/db.go)将事务重试循环限制为五次尝试。CockroachDB 路径在 RELEASE 返回不可重试错误时，可能暴露提交结果不明确的错误，因此失败并不普遍证明没有持久变更。 **此固定修订中的静态边界情况，尚未复现：** `executeInTxPostgresPgx` 用回滚结果覆盖 `err`。因此，五次可重试的事务体失败，若每次随后都成功回滚，可能在耗尽循环后返回 nil，却没有成功提交。建议的测试场景必须注入此序列，并将返回状态与独立读取的持久状态比较；这不是对当前已部署 Nakama 服务器的断言。
- 滚动更新的 [TypeScript 参考](https://heroiclabs.com/docs/nakama/server-framework/typescript-runtime/function-reference/#multiupdate)列出五个参数，包括 storageDeletes，但相邻示例省略了该位置。[固定版本的 JavaScript 实现](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/runtime_javascript_nakama.go)从参数2读取存储删除、参数3读取钱包更新、参数4读取账本标志。应将该示例视为需要版本/签名验证，而不是可直接复制执行的代码。

检查的源文件带有 Apache-2.0 声明。这不授予 Enterprise 功能、托管服务、项目资源或任意依赖的权限。未确立价格或部署授权。

### 项目仍需承担的职责

**测试场景模板：** 纳入稳定的玩家/任务/操作标识、模式修订、权威检查、明确的事务成员范围、冲突分类、持久状态核对、通知所有权及进程丢失后的恢复。使用可丢弃状态，并保留预期/观测产物。测试旧存档迁移及重复/重排命令。在项目特定实现将这些领域连接并通过测试之前，叙事游标恢复、世界对象标识及外部效果仍是独立领域。

## Unreal 回放：重建、检查点保真度与重置边界

对于  **Unreal Engine 5.6** ，使用下列回放接口区分已记录的复制状态与 SaveGame 检查点。

### 捕获范围与兼容性

[5.6 回放系统指南][R1]描述了 `DemoNetDriver` 记录复制数据及回放专用字段，包括配置为进行复制的单人项目。`StartRecordingReplay`、`StopRecordingReplay`、`PlayReplay` 和 `GotoTimeInSeconds` 提供录制、播放及跳转。这确立了重建接口，而非任意的整个进程快照。 **推论：** 未复制的项目状态、RNG 流、待处理异步作业及外部效果需要另行证明覆盖情况；表面的视觉保真度不能确立它们已恢复。

兼容性带有条件：已移除的复制字段可跳过，新增字段可使用默认值，而重写的 `NetSerialize` 格式需要手动处理。`EngineNetVer`/`GameNetVer` 标识序列化版本；网络版本重写委托允许应用程序作出兼容性决定。 **建议的门控：** 保留引擎/游戏/内容标识，并测试旧到新回放的解释。应用程序接受一个版本号，不是语义等价或任意跨版本支持的证明。[R1]

### 检查点与副作用

[5.6 流送器指南][R2]描述了基线状态、周期性的网络变化检查点及其间的对象增量。重建先应用检查点数据，再应用后续变化。正值的 `demo.CheckpointSaveMaxMSPerFrame` 预算可将角色捕获分散到多帧，并引入视觉差异。`SetViewerOverride` 改变相关性/剔除/优先级。因此，检查点范围及时间一致性需要明确验证。

回放角色可以调用影响共享 `GameInstance`、`GameState` 或 `GameMode` 的函数；Epic 建议进行项目特定的实时/回放检查。内存回放可在显示重复关卡时隐藏但继续运行实时世界，然后清空重复关卡的内容。文档所述的动态重复关卡在专用服务器和编辑器模式中不可用；此测试场景应使用受支持的独立运行/客户端配置。这不是实时世界回滚。[R2]

存储也各不相同：Local File 异步录制至 `Saved/Demos/*.replay`；SaveGame 流送增加复制至槽的步骤；Memory 流送保留滚动窗口；HTTP 流送需要自定义服务器。没有旧版 Null 流送器时，Local File 无法读取该流送器的旧记录。这些描述均不能证明崩溃持久性、原子发布或远程保留。[R2]

### 完成与重置是独立观测

[5.6 `UReplaySubsystem` API][R3]将 `RecordReplay` 记载为 void，并将 `PlayReplay` 记载为返回布尔值的启动操作。`RequestCheckpoint()` 仅在录制期间请求写入；`IsSavingCheckpoint()` 公开状态。`StopReplay()` 停止播放/录制，`bLoadDefaultMapOnStop` 控制默认地图重载。`SetExternalDataForObject` 允许显式补充对象数据。

**建议的门控：** 区分请求发出、原生录制/播放状态、检查点工作、停止/地图转换及独立重新打开的回放。列出的 API 不能确立持久写入完成回调、超时语义、自动重试安全性、应用程序单例重置或完整世界恢复契约。不要仅因 `IsSavingCheckpoint()==false` 就推断检查点成功持久化，也不要仅因停止就推断回滚。在已验证的 5.6 来源范围内，确切的跳转结果/错误/取消顺序仍未知；不编造私有实现行为。[R3]

### 建议的可丢弃验收测试场景

GameMap 原创设计， **尚未实现或执行** ：

- 记录一扇参与复制的门，并独立观测一个未复制计数器。在变化前后跳转；比较明确的观测，而不只是截图
- 使用两个相关的复制值测试跨帧检查点预算；保留其采样时间，并检测不一致的值对
- 给回放呈现加入一个无害的共享计数器副作用。重复跳转/播放必须按声明策略暴露或阻止意外的实时状态变化
- 在内存播放期间，比较实时世界与重复世界的标识和时钟；验证应用程序预期的是继续运行还是回滚
- 停止时请求检查点，在捕获期间停止，然后在新进程中重新打开已持久化的回放。保留失败和未知结果，而不是把请求派发当作完成
- 在复制模式和自定义序列化器变化后回放；要求明确的迁移/拒绝决定，并检查重建值

这些测试场景补充已有的叙事效果与物理/调试记录区分。它们不宣称确定性重模拟、游戏玩法回滚、事务性或与引擎无关的重置。

[R1]: https://dev.epicgames.com/documentation/en-us/unreal-engine/using-the-replay-system-in-unreal-engine?application_version=5.6

[R2]: https://dev.epicgames.com/documentation/en-us/unreal-engine/demonetdriver-and-streamers-in-unreal-engine?application_version=5.6

[R3]: https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/UReplaySubsystem?application_version=5.6

## MuJoCo 检查点纳入内容与重置观测契约

参考：原生  **MuJoCo 3.3.7** ，提交 `f1d45bd5422c74beddfb0d1deb590a02583d21de`。MJX 及游戏引擎物理需要单独的重置与状态检查。

### 已验证的 API 与实现语义

1. **显式选择检查点内容。** 在 3.3.7 中，`mjSTATE_PHYSICS` 仅包含 `qpos`、`qvel`、`act`。`mjSTATE_FULLPHYSICS` 增加 `time` 和 `plugin_state`。`mjSTATE_USER` 包含 `ctrl`、`qfrc_applied`、`xfrc_applied`、`eq_active`、`mocap_pos`、`mocap_quat`、`userdata`。`mjSTATE_INTEGRATION` 为 FULLPHYSICS + USER + `qacc_warmstart`。因此，PHYSICS 和 FULLPHYSICS 都不意味着包含恢复应用程序所需的每项输入。[固定版本的枚举，第 27–51 行](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/include/mujoco/mjdata.h#L27-L51)；[带版本的类型](https://mujoco.readthedocs.io/en/3.3.7/APIreference/APItypes.html#mjtstate)。

2. **状态向量是无封装、依赖模型的数组。** `mj_stateSize(m,sig)` 返回 `mjtNum` 的数量，而非字节长度。获取/设置按位序递增拼接选定字段；等式激活字节与数值元素相互转换。实现从所提供模型推导字段长度。`mj_setState` 为 void，通过 `mjERROR` 拒绝无效签名，其他情况下复制选定字段。它不接收或检查缓冲区长度参数、检查点版本、校验和或模型标识；未选择的字段保持不变。它既不重置整个 `mjData`，也不调用正向动力学或插件重置/复制回调。这是实现证据，不是事务性存储保证。[固定版本的支持实现，第 114–245 行](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/src/engine/engine_support.c#L114-L245)；[带版本的获取/设置 API](https://mujoco.readthedocs.io/en/3.3.7/APIreference/APIfunctions.html#mj-setstate)。

3. **在读取派生观测之前恢复输入。** `mj_forward` 运行正向动力学，但不推进时间；它可以在恢复输入后刷新派生的接触、力及传感器。但它不是对应用程序而言无副作用的纯读取：固定版本实现会在驱动启用时调用已安装的 `mjcb_control`，然后计算驱动、加速度、约束及传感器。回调可以覆盖已恢复的控制量，或推进外部计数器/RNG。跳过的阶段假定其缓存结果已经有效。不要针对恢复前的陈旧缓存使用跳步计算。[固定版本的正向流水线，第 1100–1160 行](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/src/engine/engine_forward.c#L1100-L1160)；[正向 API](https://mujoco.readthedocs.io/en/3.3.7/APIreference/APIfunctions.html#mj-forward)。

4. **保留热启动状态，并限定回放论断。** 上游将 INTEGRATION 称为正向动力学的输入，而完整 `mjData` 还保存派生值。热启动加速度可能影响下一次数值结果；微小差异可能在整段展开中增长。上游将精确可复现性限定为相同版本和架构，并警告轨迹可能因发布版本/操作系统而异。不能把匹配图片视为足够的状态等价证据。[带版本的状态/可复现性讨论](https://mujoco.readthedocs.io/en/3.3.7/computation/index.html#the-state)；[固定版本的可复现性注意事项](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/doc/computation/index.rst#L1788-L1807)。

5. **插件状态不是不透明的进程快照。** `plugin_state` 包含声明的浮点状态。不透明的 `plugin_data` 不被序列化；扩展契约要求能够从插件配置、插件状态及 MuJoCo 状态重建它。`mj_makeData` 初始化插件资源，`mj_copyData` 使用插件复制回调。上述裸设置方法不会调用这些回调。依赖隐藏可变载荷的插件需要自行审查正确性；INTEGRATION 不会把任意插件内存转化为序列化状态。[带版本的插件状态契约](https://mujoco.readthedocs.io/en/3.3.7/programming/extension.html#plugin-state)。

6. **模型、回调及 RNG 状态仍是边界。** `mjData` 属于特定 `mjModel`；上游警告，不兼容的配对行为不可预测。回调函数指针及任意外部回调状态不会自动纳入。只有应用程序确实将相关状态存入 `userdata` 时，它才有帮助。模型选项、资源或参数的变化不在此状态向量内。外部游戏玩法状态、RNG 状态、队列及待处理副作用同样不在复制字段之列。[带版本的模拟/模型契约](https://mujoco.readthedocs.io/en/3.3.7/programming/simulation.html#initialization)；[状态/控制](https://mujoco.readthedocs.io/en/3.3.7/programming/simulation.html#state-and-control)。

**文档陷阱：** 3.3.7 模拟指南保留了一段关于内置传感器噪声和 `srand` 的旧文字。变更日志记录原生传感器噪声已在 3.1.4 中移除。不要将该段重述为当前 3.3.7 功能；除非另有证据，应将 RNG 描述为应用程序/插件职责。[固定版本的移除条目，第 860–875 行](https://github.com/google-deepmind/mujoco/blob/f1d45bd5422c74beddfb0d1deb590a02583d21de/doc/changelog.rst#L860-L875)。

### 建议的 GameMap 验收测试场景（编者设计，尚未实现或测试）

- 在已完成步之间定义检查点边界，包括下一步控制量是否已应用。为数组添加封装，记录确切引擎/构建/平台、模型及资源/配置哈希、插件/控制器修订、签名、元素数、数值编码及外部状态/输入日志标识。进入设置方法前拒绝不匹配；维度相等不能证明模型相同。
- 使用接触密集的测试场景，包含非零时间、执行器激活、控制量/施加力、热启动、修改过的等式标志及 mocap 姿态；在受支持时纳入有状态插件和回调计数器。创建 INTEGRATION 加应用程序状态的快照，扰动每个选定组件、恢复，并在任何回调驱动的观测刷新之前比较回读。另行测试故意缩减的 PHYSICS 快照，演示测试框架必须在该掩码之外恢复或有意重置的内容。
- 记录观测刷新调用序列。在声明的时段内，将恢复后展开与不中断的控制/输入序列比较，包括回调调用次数和 RNG/事件队列状态。要求回调可安全重放，或在比较中明确纳入其刷新时效果；不要盲目添加额外的 `mj_forward` 并假定它没有副作用。两组均通过相同序列收集派生观测，或使用隔离的诊断数据及受控的回调状态策略。
- 分别报告数值/状态比较与观测新鲜度。在运行前声明逐位精确或容差验收。将错误模型哈希、引擎版本变更、截断载荷、未知掩码及缺失插件/应用程序状态元数据，作为测试框架的预检拒绝项进行测试，而不是宣称 MuJoCo 本身会安全拒绝它们。

**实现前尚未解决：** 存储持久性/原子性、跨模型/发布版本迁移、自定义插件合规性、应用程序副作用回滚及实际目标构建的回放结果。本来源审查不提供通用验收阈值或经测试的重置辅助函数。

### 为游戏生产评估选择重置边界

原生回放、物理状态向量及叙事/数据库检查点恢复的是不同领域。比较代理编辑前，先选择基线和重置机制。保留内容/构建标识、待处理工作所有权、回调策略及观测序列；在把渲染帧解释为重置成功前，使用独立状态检查。即使加载器接受旧检查点，改变复制模式、模型拓扑或应用程序效果的源码编辑仍可能使其失效。已有的 [Jolt 与 CVD 契约](production-debugging-contracts.md#physics-recording-contact-and-restoration)涵盖互补的物理记录及回滚限制；这些机制均不提供通用游戏状态恢复。实际往返保真度、回调副作用及评估方差，需要另行授权的可丢弃运行时测试场景。

## 有状态交互发现与故障缩减

使用有状态测试发现并缩减破坏不变量的动作序列。以下参考针对提交 `718686d1e392968eb0953c043ef249c5d9d11a59` 上的 [Hypothesis 6.170.1 发布版本](https://github.com/HypothesisWorks/hypothesis/releases/tag/v6.170.1)及[状态机实现](https://github.com/HypothesisWorks/hypothesis/blob/718686d1e392968eb0953c043ef249c5d9d11a59/hypothesis/src/hypothesis/stateful.py)；版本变化见[变更日志](https://hypothesis.readthedocs.io/en/latest/changelog.html)。

### 官方证据确立了什么

[有状态指南](https://hypothesis.readthedocs.io/en/latest/stateful.html)描述了生成基本动作与参数序列、通过 bundle 传递先前结果，并将实现与更简单的参考模型比较。前置条件选择适用规则。默认情况下，不变量会等待所有初始化规则结束；check_during_init=True 可启用初始化期间的检查，而不变量前置条件可以跳过检查。初始化先于普通规则，以任意顺序执行，但有界试验不保证每个初始化器都完成；下文源码级覆盖限定适用于此。其失败报告是一段短程序，当参数表示为有效 Python 时，通常可复用为回归测试。这支持交互故障发现，而非穷尽状态覆盖或游戏质量评估。

**建议的 GameMap 应用：** 提供有界动作，如按下/释放、推进固定 tick、打开/关闭菜单、暂停/恢复、开始/取消对话、保存/加载及重启。仅建模独立指定的义务：已消耗钥匙不会重用，转移时物品守恒，暂停阻止声明的时钟，已取消会话的命令不能修改新会话。一个可能的失败序列是：开始对话 → 排入世界命令 → 取消 → 重启 → 完成旧命令。生成和缩减可以隔离必要的顺序及参数。这是尚未实现的测试场景建议，不是某个引擎缺陷的证据。

### 完成的试验不一定测试过游戏玩法

在固定版本 6.170.1 实现中，`stateful_step_count` 限制包括初始化在内的共享循环。停止决定发生在选择待执行初始化器之前；选中的初始化器返回后，不会再次被选中。仍有初始化器待执行时，默认不变量会被跳过，清理也不会自动再次检查它们。 **静态控制流示例，非运行时复现：** 一个有效状态机定义两个不会失败的初始化器及至少一条普通规则，设有 `stateful_step_count=1`，仅有默认不变量及默认/空操作清理时，可能在未执行普通游戏玩法规则或任何不变量的情况下完成一次试验。[步选择与停止，第 140–181 行](https://github.com/HypothesisWorks/hypothesis/blob/718686d1e392968eb0953c043ef249c5d9d11a59/hypothesis/src/hypothesis/stateful.py#L140-L181)、[步后检查与清理，第 234–238 行](https://github.com/HypothesisWorks/hypothesis/blob/718686d1e392968eb0953c043ef249c5d9d11a59/hypothesis/src/hypothesis/stateful.py#L234-L238)、[不变量跳过，第 466–480 行](https://github.com/HypothesisWorks/hypothesis/blob/718686d1e392968eb0953c043ef249c5d9d11a59/hypothesis/src/hypothesis/stateful.py#L466-L480)。

**建议的 GameMap 门控：** 将已完成初始化器、游戏玩法规则执行及每项必需断言的实际求值，与库的无异常结果分开记录。为完成的验收试验声明最低覆盖；未满足覆盖时归类为未测试/不完整，而不是游戏玩法通过。不要因初始化或缩减过程中的真实失败缺少后续游戏玩法覆盖而丢弃它们。不要用无条件的清理断言强制覆盖，因为它可能替换原始失败。未来的可丢弃测试场景应定义两个初始化器及一条普通规则，然后比较一、二、三的步数上限，同时加入初始化失败和被跳过的不变量。这些是最大长度，不是保证次数；循环可能提前停止。保留观测次数和清理结果。此测试场景仍尚未实现或执行。

### 新建状态机不会重置游戏

[渲染呈现的有状态实现](https://hypothesis.readthedocs.io/en/latest/_modules/hypothesis/stateful.html)在每个生成测试用例内部调用状态机工厂，然后在调用清理的 `try/finally` 下运行规则/不变量。默认清理不做任何事。工厂构造先于该保护区域，因此部分构造需要自己的清理。生成的 TestCase 默认为 `deadline=None`，并抑制健康检查。这些是静态源码观测，不是已安装版本中的实测行为。

**建议的门控：** 每个候选，包括缩减尝试，都必须建立相同的已声明起始状态。记录隔离是指新进程、场景重载还是检查点恢复。显式重置持续按住的输入、存档目录、单例/会话状态、待处理作业、RNG 流及相关服务；不要假定新的 Python 对象会执行这些操作。将重置/启动失败与游戏玩法失败分开。[API 参考](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.HealthCheck.function_scoped_fixture)警告，函数作用域的 pytest fixture 按测试函数重置，而不是按生成输入重置；所需的逐输入隔离必须显式实现。

### 缩减、干净状态重放与不稳定性

[不稳定性指南](https://hypothesis.readthedocs.io/en/latest/tutorial/flaky.html)要求重复输入具有稳定结果及稳定的 Hypothesis 可见生成调用。未重置的文件系统/数据库/全局状态、未管理的随机性、调度及网络计时都可能使该假设失效。重放时消失的失败会引发 `FlakyFailure`；不稳定策略可能妨碍可靠缩减。

**建议的证据契约：** 保留初始轨迹、缩减轨迹、失败不变量、动作参数、tick 边界及重置标识。将每条轨迹与其执行尝试分开保存。然后在将缩减轨迹晋级为固定回归套件之前，从独立建立的干净状态重放它。缩减评估属于自适应搜索工作，不是独立的成功率试验。将轨迹标为“由配置的搜索缩减”；不要暗示已证明全局最短因果链。若失败消失，应将差异保留为不稳定/未解决，而不是静默接受通过。

对于视觉测试框架，应将权威状态断言与帧标记及声明的截图比较容差配对。动画计时、渲染差异及随机视觉评判器都可能使判定不稳定；Hypothesis 不提供它们的判定器、确定性控制或重置实现。

### 复现产物与完整成本

[ExampleDatabase API](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.database.ExampleDatabase)将失败数据库视为便利缓存；代码或版本变化可能使条目失效。[不透明复现数据块](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.reproduce_failure)是临时且版本敏感的。保留明确、可人工阅读的动作轨迹作为持久回归产物。[API 参考](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.seed)将种子重放限定在没有其他非确定性的条件下；种子不是引擎快照。记录生成器、策略/模型、游戏/构建、引擎、资源、适配器及判定器版本；设置/配置档、数据库参与情况、游戏及生成器种子、捕获配置及初始状态标识。

[执行次数说明](https://hypothesis.readthedocs.io/en/latest/explanation/test-case-count.html)表示，被拒绝/过大的用例、缩减、解释及最终不稳定性检查都可能使执行次数超出 `max_examples`。[API](https://hypothesis.readthedocs.io/en/latest/reference/api.html#hypothesis.settings.stateful_step_count)公开逐用例步数上限；固定版本循环将初始化计入该上限，而不只计游戏玩法规则。它不限制外部工作的总量。deadline 是逐用例软限制，而非整个测试活动的看门狗。

**建议的核算：** 统计所有启动/重置、尝试的规则、观测、视觉模型调用、无效用例、缩减/重放尝试及清理；保留失败或取消时已花费的工作量。使用单独强制执行的总时间/资源预算，并如实报告被中断的缩减。运行时未知事项仍包括适配器可行性、隔离完整性、判定器稳定性、代表性动作覆盖、缩减质量及实际端到端成本。本来源审查未确立生产缺陷发现收益。
