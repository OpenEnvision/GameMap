# 生产环境调试与证据契约

针对需要隔离的故障，选择性能分析器或诊断接口。将每项测量与特定的游戏状态、捕获记录和可重复的比较关联起来。

## 选择诊断证据

| 症状             | 下文有来源依据的接口                                                         | 仍未证实的事项                         |
| -------------- | ------------------------------------------------------------------ | ------------------------------- |
| 像素或着色器结果错误     | RenderDoc 调用跟踪；原生 Metal 捕获                                         | 预期的游戏外观及目标驱动程序的正确性              |
| 帧缓慢或不规律        | Nsight 的实时运行/回放区分；PresentMon 帧总体；延迟的 Unity 样本                      | 可比的无插桩性能及物理显示延迟                 |
| GPU 被移除        | DRED 面包屑与分配候选项                                                     | 确切的故障指令及安全的设备恢复                 |
| 接触或回滚失败        | CVD 记录的求解器阶段；Jolt 接触/状态 API                                        | 整个游戏的重置、动画语义及跨引擎等价性             |
| 构建大小异常或流送资源模糊  | UnityDataTool 内容分析；Addressables 报告；UE 流送计数器                        | 运行时内存、项目质量目标及整个世界的就绪状态          |
| 反复编辑/试玩循环后内存增长 | [分配窗口、快照与保留引用](#memory-lifetime-across-repeated-production-cycles) | 预期的缓存生命周期、完整的原生/GPU 所有权及实际的泄漏判定 |

## 捕获、着色器与 GPU 诊断

### 1. 完成或丢弃由应用程序触发的 RenderDoc 捕获

**填补的空白：** 现有条目提到了 `renderdoccmd`，但未验证可编程捕获的生命周期。

**来源/版本：** [RenderDoc v1.46 的应用程序内 API](https://github.com/baldurk/renderdoc/blob/e4bd23b671d3d5a747ff5221dbe08a63eb6ca200/docs/in_application_api.rst)，API  **1.7.0** ；确切的[发布提交](https://github.com/baldurk/renderdoc/commit/e4bd23b671d3d5a747ff5221dbe08a63eb6ca200)。

**文档记载：** `RENDERDOC_GetAPI` 报告接口是否可用。`StartFrameCapture` 开始捕获；`EndFrameCapture` 成功时返回 1，出错时返回 0。没有匹配的活动设备/窗口捕获便执行结束操作，其行为未定义。`GetNumCaptures`/`GetCapture` 枚举已记录的路径和时间戳。`DiscardFrameCapture` 丢弃活动捕获而不写入文件。`TriggerCapture` 等待后续的呈现；对于不执行呈现的应用程序，它不起作用。多帧触发会创建相互独立的文件。同时启用多个图形 API 时，空设备选择存在歧义。

**未知事项：** 尚未确立崩溃安全的文件持久性、故障恢复及幂等重试。捕获时间戳不是引擎状态标识。

**建议的验收方式：** 协商 API 版本；记录明确的设备/窗口和帧标记；保留原生结果及新枚举出的产物；计算其哈希并独立重新打开。串行化捕获请求。将始终不执行呈现的目标视为缺失触发条件。保留失败尝试，而不是重放状态不明的开始/结束调用对。

### 2. 完成特定着色器调用的诊断

**填补的空白：** 已有内容涵盖编译器/验证器成功；但未涵盖回放就绪、片元选择及着色器调试完成。

**来源/版本：** [RenderDoc v1.46 回放 API](https://github.com/baldurk/renderdoc/blob/e4bd23b671d3d5a747ff5221dbe08a63eb6ca200/renderdoc/api/replay/renderdoc_replay.h)；[v1.46 版本限制](https://github.com/baldurk/renderdoc/releases/tag/v1.46)。

**文档记载：** `OpenFile` 报告结果；本地 `OpenCapture` 会阻塞至加载完成，并返回状态和控制器。`SetFrameEvent` 选择事件后的状态。`DebugPixel` 即使在 GL 下也使用左上角坐标；未指定图元选择时，可能选中任意片元。`ContinueDebug` 按批返回状态；空批次表示调试完成。但致命回放错误也可能导致控制器返回空数据：应检查 `GetFatalErrorStatus`。使用 `FreeTrace` 释放跟踪；远程控制器需要服务器的 `CloseCapture`。v1.46 发布说明警告，AMD 驱动程序问题会影响依赖多线程的着色器调试。

**未知事项：** 完整跟踪不能证明着色器正确；必须限定受支持的着色器功能及驱动程序准确性。此处未确立通用的取消/重试契约。

**建议的验收方式：** 保留捕获哈希、事件/着色器标识、像素、采样、图元、视图或计算组/线程。区分打开失败、不支持调试、诊断完成及评估器结果。将输出资源证据与变量跟踪一并保留。不要把调试器失败归类为游戏缺陷，也不要把着色器模拟当作原生 GPU 性能。

### 3. 等待 Nsight 产物，然后区分回放成本与实时运行计时

**填补的空白：** 现有 Nsight 卡片明确表示自动化未经验证。

**来源/版本：** NVIDIA 滚动更新的  **2026.3 文档系列** ，由[发布说明](https://docs.nvidia.com/nsight-graphics/ReleaseNotes/index.html)标识；[SDK 指南](https://docs.nvidia.com/nsight-graphics/UserGuide/sdk.html)、[捕获 CLI](https://docs.nvidia.com/nsight-graphics/UserGuide/graphics-capture-cli.html)、[GPU Trace CLI](https://docs.nvidia.com/nsight-graphics/UserGuide/gpu-trace-overview.html)、[回放解读](https://docs.nvidia.com/nsight-graphics/UserGuide/graphics-capture-ui.html)。页面标示于 2026 年 7 月 21 日更新；URL 并非不可变的版本固定点。SDK 指南将仅含头文件的 SDK 0.9.0 标为 beta，可能变更，不适合任务关键型依赖。

**文档记载：** SDK 在创建图形上下文之前初始化，并要求填写结构体版本字段。注入需要通过 `NGFX_SetLibraryLoadFn` 提供由调用方选择的库加载回调；指南警告，其不进行验证的辅助函数不适合生产环境，并说明了调用方的库验证职责。请求捕获前保存 `NGFX_GraphicsCapture_GetCaptureFileCount()`，然后使用 `NGFX_GraphicsCapture_WaitForCaptureFilePath()` 等待该索引。返回的路径位于目标文件系统中，对应文件已完成最终写入且可以安全打开。GPU Trace 仍需要已连接的主机；其产物路径属于该主机。这两种活动只能向一个进程注入其中一种。`ngfx-capture` 支持无人值守触发；GPU Trace CLI 支持 `--auto-export`。注入会增加开销。回放将帧成本与资源重置成本分开，并插入等待空闲的边界。对 Live Replay 进行的 GPU Trace 测量的是捕获的工作负载，而不是原始进程。

**未知事项：** 无人值守取消、崩溃持久性及目标项目兼容性仍未经测试。CLI 文档内部对于最大帧数的说法不一致；应查询已安装版本，而不是照搬一个通用上限。

**建议的验收方式：** 保留确切的可执行文件/SDK/驱动程序和受支持硬件、触发条件、产物命名空间及原生错误；为等待设定界限，并获取最终路径，而不是预测文件名。记录实时运行与回放的来源区别、重置成本、时钟/V-Sync 设置及指标采集轮次。在单独的实时运行中再次验证任何优化。绝不隐式更改性能分析权限或机器设置。

### 4. 结束有界的 PresentMon 运行，同时不丢失测量总体

**填补的空白：** 已有内容介绍计时能力及平台注意事项，但没有运行终止或帧选择契约。

**来源/版本：** [PresentMon v2.3.1 控制台参考](https://github.com/GameTechDev/PresentMon/blob/v2.3.1/README-ConsoleApplication.md)，特意固定版本，而不是假定使用当前主分支的列。

**文档记载：** `--process_id` 限定捕获范围；`--session_name` 允许不同的并发会话。`--timed` 停止记录；`--terminate_after_timed` 还会退出。`--terminate_on_proc_exit` 在所有目标退出时退出。CSV 包含进程/交换链/呈现信息；未显示帧的 `DisplayedTime` 为 `NA`。`--exclude_dropped` 会移除这些行。可以使用 QPC 时间戳。`--track_frame_type` 只有在具备所需插桩时才能区分应用程序帧和生成帧。旧版指标开关会改变数据模式。

**未知事项：** 仅凭观测器退出，不能证明 ETW 已完整交付或产物完整。本来源不能证明特定设置下物理显示延迟的准确性。

**建议的验收方式：** 使用专属的唯一会话、明确的输出/数据模式及有界区间；保留未显示帧和不可用值；将计时与引擎标记关联。观测器退出后检查 CSV 标识、样本数和时间跨度。在数据可用时，分别报告渲染帧/显示帧/生成帧总体。避免停止已有的无关会话、静默提升权限，或把帧类型数据不可用当作所有帧均为渲染帧的证据。

### 5. 捕获预期的 Metal 命令缓冲区区间

**填补的空白：** 目前对于 RenderDoc 不支持 Metal 的情况，尚无原生捕获替代方案或命令缓冲区纳入规则。

**来源/版本：** Apple 的[以编程方式捕获 Metal 工作负载的文章](https://developer.apple.com/documentation/xcode/capturing-a-metal-workload-programmatically)，为滚动更新文档，已于 2026 年 10 月 18 日通过索引中的官方文本检查；直接访问 HTML 返回的是 JavaScript 空壳。文档所述的环境变量方式需要 macOS 14+；这不是对所有 SDK 版本的通用断言。

**文档记载：** 通过 `MetalCaptureEnabled` 或文档所述的环境变量启用捕获。在 `MTLCaptureDescriptor` 中选择设备/队列/作用域；先检查 `supportsDestination(.gpuTraceDocument)`，再选择输出 `.gputrace`。`startCapture(with:)` 可能抛出异常；`stopCapture()` 结束捕获。仅纳入捕获开始后创建且在结束前提交的命令缓冲区。启用捕获会产生可测量的 CPU 开销。

**未知事项：** 本文并未为停止操作记载单独的产物最终完成回调、fsync 保证、通用取消/回滚或 Metal 4 对等支持。

**建议的验收方式：** 记录捕获支持情况/启动错误及确切的缓冲区区间；独立验证保存的跟踪能够重新打开且包含所需通道。不要使用预先创建的命令缓冲区作为覆盖证据。保留单独的无插桩计时运行及确切的 OS/Xcode/GPU 元数据。

### 6. 在断言根因之前收集 D3D12 移除诊断

**填补的空白：** 图形 API 验证和帧捕获没有涵盖独立的设备移除诊断路径。

**来源/版本：** Microsoft 的 [DRED 指南](https://learn.microsoft.com/windows/win32/direct3d12/use-dred)，更新于 2022 年 7 月 1 日；[面包屑获取方法](https://learn.microsoft.com/en-us/windows/win32/api/d3d12/nf-d3d12-id3d12deviceremovedextendeddata-getautobreadcrumbsoutput)和[页故障获取方法](https://learn.microsoft.com/en-us/windows/win32/api/d3d12/nf-d3d12-id3d12deviceremovedextendeddata-getpagefaultallocationoutput)，更新于 2024 年 2 月 22 日。这些方法页面规定最低要求为 Windows 10 版本 1903；已安装的 SDK/运行时兼容性仍未检查。

**文档记载：** 进程全局的 DRED 配置必须先于设备创建。设备移除后，运行时接口提供面包屑和页故障分配候选项。获取方法区分 `S_OK`、当前不可用（设备未被移除）和不支持（功能未启用）。由于 GPU 执行采用流水线且会重排，面包屑是近似的；其历史记录有界。页故障支持因 GPU 而异；诊断插桩会增加开销。

**未知事项：** 诊断不能可靠地确定确切故障指令、恢复设备或确立安全重试。崩溃转储持久化是收集器的另一项职责。

**建议的验收方式：** 在进入应用程序特定的恢复路径之前，保留原生移除原因、功能配置、获取方法结果、标记/资源标识及原始诊断。将不支持/无数据与干净结果区分开。使用可丢弃的故障测试场景测试收集；不要在来源研究过程中诱发 GPU 故障或更改看门狗/安全设置。

## 物理记录、接触与恢复

### 1. 检查记录下来的求解器故障：Unreal Engine 5.5 CVD

**文档记载的约束。** Chaos Visual Debugger 记录模拟状态。其 ReSim 标记表示在网络校正期间记录的帧；在 CVD 内重新运行模拟/查询被列为未来工作。异步游戏帧和求解器帧不一定一一对应；游戏时间线会选择最接近的求解器时间戳。求解器阶段检查取决于所记录的通道。接触选择跨帧会失效，并可能带警告显示陈旧数据。关节、角色地面约束和加速结构记录默认禁用。记录的粒子几何体是物理线程几何体，可能不同于游戏线程几何体。组件查询支持有限。快速卸载/重新加载地形碰撞体可能在拖动时间轴时显示错误；文档给出的解决方法是重新加载记录。这些是 UE 5.5 指南的限制，并非对后续版本的断言。[UE 5.5 官方指南](https://dev.epicgames.com/documentation/en-us/unreal-engine/chaos-visual-debugger-user-guide?application_version=5.5)

**建议的验收方式。** 存储捕获哈希、引擎构建、数据通道、求解器 ID/帧/阶段、游戏时间戳、同步模式及接触数据新鲜度。拒绝不受支持、缺失或陈旧的观测。在宣布不同步之前，先比较对齐的网络 tick。将记录检查与新的反事实运行分开。

**未知事项。** 无头提取、自动完成信号及记录兼容性仍未经验证。

### 2. 保留接触原点、符号与标识：Jolt 5.2.0

**文档记载的约束。** ContactManifold 接触点相对于 `mBaseOffset`；提供了世界空间访问器。`mWorldSpaceNormal` 指向使刚体 2 脱离碰撞的方向。负穿透深度表示推测性接触，可能永远不会引起速度变化。合并共面接触流形时，流形约简可能只保留一个子形状对。[带版本的 ContactManifold 参考](https://jrouwe.github.io/JoltPhysicsDocs/5.2.0/class_contact_manifold.html)

**建议的验收方式。** 保留有序的刚体/子形状标识、基准偏移、相对点和重建的世界点、法线约定、有符号深度及更新标识。使用带原点偏移的非对称双刚体测试场景，捕捉法线颠倒和偏移丢失。将推测性接触与已解算的撞击分开分类。不要将一个保留的子形状对表述为完整的碰撞特征清单。

**未知事项。** 尚未确立跨引擎接触等价性或项目特定的穿透容差。测试场景需要独立选择世界单位和容差。

### 3. 区分更新完成与当前接触事实：Jolt 5.2.0

**文档记载的约束。** `PhysicsSystem::Update` 将其区间划分为碰撞/积分迭代，等待内部作业并返回 `EPhysicsUpdateError`。`WereBodiesInContact` 查询上一次更新，可能在移动/移除后仍为 true，并且接触检测要求至少一个活动刚体。更新期间允许的用法仅限指定接触回调。`SaveState` 接受状态选择/过滤参数；`RestoreState` 失败时返回 false。[带版本的 PhysicsSystem 参考](https://jrouwe.github.io/JoltPhysicsDocs/5.2.0/class_physics_system.html)

**建议的验收方式。** 在接触证据旁保留时间步、碰撞步数、返回错误、已完成更新标识及后续变更。调用返回不代表更新无误或当前重叠。在继续推进前拒绝失败的恢复；保留失败产物，并从另行验证的基线重新开始，而不是假定回滚具有原子性。

**未知事项。** 此参考没有确立失败原子性、持久化快照写入及跨版本快照兼容性。

### 4. 验证完整状态回放：Jolt 5.2.0

**文档记载的约束。** StateRecorder 保存由模拟修改的状态，不包括摩擦、恢复系数和运动质量等设置。验证需要完整状态、`EStateRecorderState::All`，且不能使用过滤器。分段恢复要求刚体/约束/接触集合互不相交，并且只有最后一段标记为最终段；重复恢复一个接触会产生未定义行为。分段恢复与验证不兼容。[带版本的 StateRecorder 参考](https://jrouwe.github.io/JoltPhysicsDocs/5.2.0/class_state_recorder.html)

**建议的验收方式。** 为每个物理快照保留外部配置日志。将完整状态回放与降低带宽的恢复分开测试。记录快照纳入策略及分段清单；在恢复前拒绝重复或缺失的分段。经过过滤的快照不得标为经过验证的完整状态回放。将游戏玩法物品栏、RNG、输入及事件副作用的恢复明确保留为应用程序职责。

**未知事项。** 快照模式迁移、应用程序状态覆盖、崩溃持久性及部分应用恢复后的恢复处理仍由项目决定。

### 5. 限定确定性与拓扑恢复：Jolt 5.2.0

**文档记载的约束。** 基线确定性要求相同的变更顺序和二进制代码。跨平台模式要求 `CROSS_PLATFORM_DETERMINISTIC`、匹配的源代码及编译宏定义；上游称该模式测试较少。应用程序的浮点精度/收缩、三角函数及排序选择也很重要。回滚需要应用程序管理拓扑协调和稳定的刚体 ID；快照不会重新创建后续添加的刚体。约束序列化依赖约束顺序，即使唯一优先级允许等价的模拟顺序也如此。[带版本的架构：确定性模拟；回滚模拟；在保持确定性的同时放宽要求](https://jrouwe.github.io/JoltPhysicsDocs/5.2.0/)

**建议的验收方式。** 固定源代码/二进制文件/构建标志、浮点配置、有序变更/输入日志、稳定标识及约束顺序。在声明的时段内，将恢复后的重运行与不间断参考运行比较。包含配置变更、刚体添加/移除及延迟输入。单独声明目标是字节完全一致还是数值容差；匹配的图像不能证明其中任何一个。

**未知事项。** 这些前提条件不能验证目标平台组合、应用程序确定性或引擎版本间的兼容性。

### 关节与关节体观测契约

对于 Unity 6000.0，应结合[碰撞体形状](asset-validation-contracts.md#collision-cooking-and-gameplay-shape-acceptance)检查连接、驱动及约束。针对项目使用的引擎版本确认补丁特定行为。

#### 受来源范围限定的操作契约

##### 1. 验证实际连接和坐标系

在普通 Rigidbody 连接路径中，`Joint.connectedBody` 是端点引用；不设置它会连接到固定的世界点。Unity 不支持跨越使用本地物理 Scene 的另一 Scene 建立该连接。将连接的 Rigidbody 移入使用 `LocalPhysicsMode.Physics3D` 的 Scene 会自动断开它。因此，预期的对象对在视觉上仍相邻，并不能证明连接仍然存在。[连接刚体 API][U1]

`Joint.anchor` 使用局部坐标。ConfigurableJoint 提供逐轴线性/角运动模式、限制、驱动模式及目标值；`configuredInWorldSpace` 改变目标值所在的坐标系。应将两个端点标识、物理场景标识、锚点、轴基、运动限制及选定目标坐标系作为输入保留，而不是从截图推导。公开的属性是配置，不是原生的运动完成结果。[锚点 API][U2]、[ConfigurableJoint API][U3]

ArticulationBody 则描述简化坐标逻辑树。其 `parentAnchorPosition` 相对于父 **关节体** ；存在中间节点时，该父关节体可能不同于直接 Transform 父节点。转动轴是父锚点的 X 轴，旋转该锚点会改变轴在世界空间中的方向。这需要明确的刚体/锚点层级映射，而不只是场景 Transform 列表。[Articulation API][U4]、[父锚点 API][U5]、[Articulation 组件参考][U6]

##### 2. 将请求目标、单位及实测运动分开

Articulation 组件参考将驱动描述为具有位置误差项和速度误差项的隐式弹簧。力限制约束所生成的力/扭矩。零刚度会移除位置吸引；零阻尼不会使驱动停在目标处。因此，驱动目标不是稳定或交互成功信号。[Articulation 组件参考][U6]

文档所述的角度单位因接口而异：`ArticulationDrive.target` 使用 **度** ，而 `SetDriveTargets(List<float>)` 和 `GetJointPositions(List<float>)` 使用 **弧度** ；线性量使用米。`GetJointVelocities(List<float>)` 记载的单位是米/秒和弧度/秒。这些是需要针对确切构建验证的文档级契约，不是测得的实现行为。[单驱动目标][U7]、[批量目标设置方法][U8]、[位置回读][U9]、[速度回读][U10]

`SetDriveTargets` 返回 void，并作用于整个层级。`GetDofStartIndices(List<int>)` 提供按每个刚体的 `index` 索引的偏移；该刚体的 `dofCount` 给出其跨度。整数结果是层级的总自由度数，不是成功码。不要假设每个场景节点对应一个浮点数、从数组长度相同推断稳定对应关系，或在拓扑/锁定变更后未经验证就复用旧映射。检查过的文档未规定格式错误缓冲区的错误行为、事务式应用或取消。[批量目标设置方法][U8]、[自由度映射][U11]

##### 3. 观测约束，避免将数值校正误认为物理有效性

`Joint.currentForce` 和 `currentTorque` 在指定 `connectedBody` 时公开相对于它的求解器约束载荷，否则使用世界空间。采样时记录该坐标系及其姿态；比较不同朝向连接的原始向量，不是共同坐标系下的比较。这些 API 页面既未确立观测时间戳，也未完整涵盖所有外部/接触/执行器载荷。[力 API][U12]、[扭矩 API][U13]

`ArticulationBody.GetDriveForces(List<float>)` 填充整个层级的简化坐标驱动力数据，并返回自由度数。使用相同的刚体/自由度映射；该文档记载的驱动观测并非整个机构的接触力旋量测量。[驱动力回读][U14]

`ConfigurableJoint.projectionMode` 可在求解器失败后将违反的约束重新对齐，但这种校正是非物理的，可能违反动量守恒和碰撞几何体约束。投影距离 API 警告，极小容差会引起抖动，并且在关节环等配置中投影可能无法实现。因此，整齐的最终姿态不足以作为验收证据。保留投影设置，并随时间测量约束误差和运动。[投影模式][U15]、[投影距离][U16]

##### 4. 明确保留断裂条件的文档冲突

6000.0 的 `Joint.breakTorque` API 表示扭矩轴必须为 Locked 或 Limited，并指出无约束的 ConfigurableJoint 无法断裂。同版本的 Configurable Joint 手册却表示 Free、Limited 或 Locked 轴均可发生扭矩断裂。 **这些官方页面互相冲突；本研究没有解决其运行时行为。** 适配器不得静默选用其中一种作为通用保证。[断裂扭矩 API][U17]、[Configurable Joint 手册][U18]

`OnJointBreak(float)` 报告同一 GameObject 上的断裂，传递断裂力，并先于关节的自动移除/删除。回调签名不提供关节引用。同一对象上有多个关节时，仅凭一个回调值不足以作为标识证据；保留组件标识并检查哪个连接仍存在。扭矩场景的确切回调行为，以及超出此文档所述序列的回调/移除采样顺序，仍未经测试。[断裂回调][U19]

#### 建议的验收与故障处理

**建议的检查：** 先要求配置回读，再进行有界动态验收，最后独立进行持久化/重新打开验收。引用的设置方法均不提供异步操作句柄或应用程序级已稳定/已成功信号。使用项目现有的物理步控制方定义采样阶段和时段；捕获姿态/速度、锚点间距或禁用轴误差、目标跟踪、越限、相关载荷及关节是否存在。在稳定性重要时，要求明确的稳定容差和持续区间。缺失样本、陈旧拓扑、意外断连/断裂、非有限数据或超出项目容差都会阻止晋级。文档歧义应保持未解决状态，直到可丢弃的确切补丁版本测试场景确立结果。

保留确切的引擎/构建/平台、场景/内容标识、刚体/约束标识、物理场景成员关系、变换/锚点坐标系、自由度映射、单位、初始条件、质量/惯性及相关求解器/驱动/投影设置、已应用命令历史、采样阶段及容差。仅从具有原始配置的已知创作测试场景重试；本补充未确立事务回滚、安全的重复驱动、持久化关节标识、跨引擎等价性或确定性模拟保证。

#### 尚未执行的验收测试场景

1. **连接与坐标系标识：** 构建有限位的门机构，使用非单位父旋转，并在关节体变体中加入一个中间 Transform 节点。验证选定的世界铰链轴及两个端点标识。在单独的 Rigidbody 测试场景中，将连接刚体移入另一个本地物理 Scene，并验证能够检测意外断连，而不是将其接受为固定到世界的关节。
2. **混合单位、混合自由度命令：** 使用具有唯一刚体 ID 的固定、移动、转动及球形连接。将 90 度单驱动命令与文档所述的 pi/2 弧度批量等价命令比较，然后比较实测运动及映射回读。在有效的关节体配置范围内更改锁定/拓扑输入，并要求重新验证映射。文档约束禁止锁定转动/移动关节的唯一自由度，或锁定所有球形旋转。长度相同但故意置换的适配器映射，必须在原生提交前未通过标识门控。
3. **跟踪与稳定性：** 分别在驱动力充足和故意不足、有阻尼和无阻尼的情况下下达目标。将位置误差与残余速度分开。在声明的载荷下比较禁用/启用投影；恢复后的最终姿态不得掩盖过大的中间间距或不可接受的运动。将循环 ConfigurableJoint 图纳入独立观测场景，但不预言投影会成功。
4. **断裂标识与有争议的轴情况：** 在相同的声明扭矩协议下比较 Free、Limited 和 Locked 旋转模式，保留确切补丁及诊断证据。先使用每个对象一个关节的情况；再加入双关节对象，验证断裂归属、事件证据及剩余组件清单。将自由轴结果仅视为解决已测试配置的问题，而不是全局改写互相冲突的来源说法。

#### 主要来源

[U1]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Joint-connectedBody.html

[U2]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Joint-anchor.html

[U3]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ConfigurableJoint.html

[U4]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ArticulationBody.html

[U5]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ArticulationBody-parentAnchorPosition.html

[U6]: https://docs.unity3d.com/6000.0/Documentation/Manual/class-ArticulationBody.html

[U7]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ArticulationDrive-target.html

[U8]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ArticulationBody.SetDriveTargets.html

[U9]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ArticulationBody.GetJointPositions.html

[U10]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ArticulationBody.GetJointVelocities.html

[U11]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ArticulationBody.GetDofStartIndices.html

[U12]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Joint-currentForce.html

[U13]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Joint-currentTorque.html

[U14]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ArticulationBody.GetDriveForces.html

[U15]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ConfigurableJoint-projectionMode.html

[U16]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ConfigurableJoint-projectionDistance.html

[U17]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Joint-breakTorque.html

[U18]: https://docs.unity3d.com/6000.0/Documentation/Manual/class-ConfigurableJoint.html

[U19]: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.OnJointBreak.html

## 构建产物、流送预算与延迟计时

### UnityDataTool：在提出资源修复之前查询交付的字节

**新填补的空白：** 现有资源说明验证格式及依赖操作；但未确立代理如何检查实际 Unity 构建内容，或检测无效分析。

[已检查的 UnityDataTools README](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/README.md) 描述了一个无需运行 Editor、用于归档和序列化文件的离线 CLI。原生 UnityFileSystemApi 向后兼容，但不向前兼容更新的 Editor 内容。该项目是实验性的，并明确表示不受官方支持；源代码可用不保证支持或兼容性。未下载或运行任何二进制文件。[同一修订的许可证声明](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/LICENSE.md) 指明针对依赖 Unity 的项目使用 Unity Companion License。链接的[当前许可证 v1.4](https://unity.com/legal/licenses/unity-companion-license) 允许在有效 Unity Engine License 下进行创作/分发相关使用，禁止竞争性分析及竞争产品/服务，并保留声明及第三方权利条件。这是一份限制用途的许可证，不是通用的非商业规则，也不是经验证的部署授权。

同一修订的[代理指南](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/agent-guide.md) 给出了异常具体的失败边界：

- 每个数据库只分析一个二进制构建的归档/序列化文件；重复的归档/序列化文件名会被拒绝，而不会安全地标识不同目标。
- 缺失 TypeTree 可能导致跳过文件，并留下有效但为空的数据库。Player 构建通常省略它们；文档所述的诊断构建开关会改变输入产物，必须记录。
- 数据库行 `id` 与序列化局部 `object_id` 不同。引用查找接受前者；对象转储接受后者，后者只在一个序列化文件内唯一。
- 潜在重复行是基于匹配属性的候选项，而不是经过验证的字节完全相同冗余。整个构建的覆盖很重要；只分析一个 bundle 不能确立构建范围的重复情况。
- 引用链工具是实验性的；没有结果不能证明没有依赖。

**建议的门控：** 在解释查询前保留构建来源、目标、原生读取器版本、文件清单及跳过文件诊断。归档数据库模式，并在正确的标识域上连接。在更改打包或 Read/Write 设置前，重新检查对象及依赖。这些是研究建议，不是可工作的自动优化器。

### 比较构建输出，避免混淆标识符或字节域

固定版本的[比较指南](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/comparing-builds.md) 描述了独立数据库及跨数据库查询，而不是原生的双构建比较操作。包含哈希的 bundle 文件名可能在内容编辑后改变。匹配的文本转储不一定能证明二进制等价：头部/填充变化及浮点表示可能不同；十六进制浮点输出有助于调查后者。外部资源字节需要单独比较。

固定版本的 [Addressables 分析指南](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/addressables-build-reports.md) 记载了将报告提取至 SQLite 及构建范围内的表。其 bundle 大小比较假定组采用合并打包，且组 GUID 稳定。缓存名称与目录名称不同。报告构建 ID 限定连接范围；不要仅凭整数资源 ID 连接无关构建中的记录。

[Addressables 2.2.2 布局报告页面](https://docs.unity3d.com/Packages/com.unity.addressables@2.2/manual/BuildLayoutReport.html) 要求启用 Debug Build Layout 并构建内容；生成报告会增加构建时间。其文档中的 `buildlayout` 路径与较新工具指南的 `BuildReports` JSON 示例属于不同的文档范围。应验证实际报告模式/路径，而不是宣传一个通用命令。

**未知事项：** 每个引擎/包版本的解析器行为、取消、中断数据库恢复、稳定的跨构建对象对应关系，以及项目预期的重复/性能权衡。更小的 bundle 本身不代表优化成功。

### Unreal 纹理流送完成取决于预算

[标为 UE 5.8 的纹理流送指标页面](https://dev.epicgames.com/documentation/unreal-engine/texture-streaming-metrics-in-unreal-engine?lang=en-US) 区分概念池与当前使用的 mip 内存。Required Pool 可能超过流送预算，从而降低实际交付的分辨率。Wanted Mips 为 100% 意味着当前需要的集合已流送，不是每张纹理都达到了理想分辨率。流送器的完整更新跨越多帧；非流送分配的波动超过安全池时，可能反复挤出已流送的纹理。临时池影响在途请求和加载顺序，而显示的 IO 带宽估计不是精确的存储基准。静态组件的增量关卡处理完成前提早可见，可能迫使剩余工作集中执行而造成卡顿。该页历史上的 Paragon/4.15 性能示例不是当前项目结果。

**建议的诊断：** 在同一更新范围关联相机路径、可见性变化、所需/需要/可见 mip、分配及帧时间证据。将资源质量目标与预算计数器一并保留。增大池或达到 100% Wanted Mips 不能作为视觉质量、整个世界流送就绪或稳定性能的验收测试。

### Unity 帧计时：保留观测延迟与样本数

[Unity 6000.0 FrameTimingManager 手册](https://docs.unity.com/en-us/engine/6000.0/manual/analysis/graphics-performance-profiling/profile-rendering/frame-timing-manager/manager) 记载结果延迟四帧，但不保证延迟之后结果有效。插桩本身可能降低 OpenGL ES 的速度。在某些配置中平台/API 支持不完整，基于图块的渲染可能报告长于帧时长的 GPU 时长，因为该区间包含延迟间隙。

[GetLatestTimings，Unity 6000.0](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/FrameTimingManager.GetLatestTimings.html) 返回实际取得的数量，最多为请求数量；元素零是最新完成的样本，其后依次是更早的样本。数组容量由调用方负责。

**建议的门控：** 记录捕获请求、实际返回数量、样本时间戳、图形 API/设备及插桩配置。不要仅凭数组位置将延迟样本与当前截图对齐，也不要把不可用数据解释为零成本。性能验收需要指定的目标工作负载、可比的捕获开销及重复观测。此处未执行帧收集器或基准测试。

## 重复生产循环中的内存生命周期

在可重复的加载、交互和清理循环中测量分配和保留的资源。在相同的空闲边界比较观测。

### 来源与版本范围

检查过的 Epic 页面标为  **Unreal Engine 5.8** 。Unity 的脚本/手册页面范围为  **6000.0** ；Memory Profiler `@1.1` 解析为  **1.1.11** ，Addressables `@1.21` 解析为  **1.21.21** 。这些是文档版本，不是已安装的二进制文件或不可变的实现固定点。每项实验都应保留实际引擎、包、目标、脚本后端、构建配置及性能分析设置。

### Unreal：查询分配的生命周期，而不只是总增长

**文档记载的输入和输出。** [Memory Insights](https://dev.epicgames.com/documentation/en-us/unreal-engine/memory-insights-in-unreal-engine) 要求从进程启动开始进行内存跟踪；仅通过后期连接启用它，无法恢复分配历史。其示例使用 `-trace=default,memory`；打包项目必须为 Development 构建。可选的 `metadata,assetmetadata` 通道支持资源/类过滤。生成的 `.utrace` 在 Insights 中打开，分配查询接受规则和时间线标记。结果包含大小、标签及分配/释放调用栈；可读符号需要匹配的 `.pdb` 或 `.elf`。

**内存泄漏** 规则选择在 A 与 B 之间创建、直到 C 之后才释放的分配。 **增长** 选择在 A–B 期间创建且在 B 时仍存活的分配； **有限生命周期** 查找在 A–B 期间创建、在 B–C 期间释放的分配。查询执行可能耗时很长；分配表在完成后才填充。详细分配轨道与 LLM 摘要具有不同的时间粒度和启动覆盖范围。[Memory Insights 查询与记录参考](https://dev.epicgames.com/documentation/en-us/unreal-engine/memory-insights-in-unreal-engine)

**解释：** 规则名称不是项目特定的故障判定。保留的缓存可以满足与意外保留对象相同的谓词。应用程序必须确立该分配何时应当不再需要。

**记录边界。** [Insights 参考](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-insights-reference-in-unreal-engine-5) 区分 `Memory`（分配事件、调用栈及标签）与 `Memory_Light`（不含调用栈）。它记载了文件/跟踪存储目标、`Trace.Stop` 及所需通道；禁用的通道不会产生相应事件。[跟踪状态](https://dev.epicgames.com/documentation/en-us/unreal-engine/trace-in-unreal-engine-5#trace-status) 报告连接、跟踪内存、已发送字节及通道状态。跟踪系统本身会消耗资源。两项来源都没有确立崩溃持久的刷新回执或通用开销额度。保留目标位置、设置及终态观测；在把空查询当作证据前，独立重新打开文件并检查区间覆盖。

### Unity：捕获目标、完成与产物彼此独立

[TakeSnapshot，Unity 6000.0](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Unity.Profiling.Memory.MemoryProfiler.TakeSnapshot.html) 接受路径、完成回调、捕获标志及可选截图回调。签名/示例使用 `(path, success)`；参数文字说明却将参数顺序颠倒。未连接的 Player 在本地写入。已连接的 Player 向 Editor 流式传输，并且 **即使 Editor 保存了快照，本地仍报告 false** 。Editor 调用会捕获选定的已连接 Player 或 Editor 自身。因此，仅凭调用方失败不能判定接收方的交付情况。

将捕获串行化，直至完成回调触发。截图完成是独立的，且仅在 Player/Play 模式下可用；在这些条件之外等待可能挂起。快照过程会阻塞被捕获主机上的执行。不受支持的原生调用栈标志会被忽略。示例在重命名前检查临时文件；这不是崩溃持久性保证。此处未记载有界超时或取消契约。

**建议的证据：** 保留连接方向、目标、请求字段、回调结果及收到的产物。应验证接收方，而不是将每次 false 回调都转化为失败的生产候选方案。

### 快照与引用证据存在局限

快照记录一个捕获点，而非持续监控。[快照概念](https://docs.unity3d.com/Packages/com.unity.memoryprofiler@1.1/manual/snapshots-concepts.html) 描述 `.snap` 存储及元数据；快照可能很大。[捕获指南](https://docs.unity3d.com/Packages/com.unity.memoryprofiler@1.1/manual/snapshot-capture.html) 警告，Editor 内存无法隔离 Play 模式，并建议在 Player 构建中检查优化结果。

[比较](https://docs.unity3d.com/Packages/com.unity.memoryprofiler@1.1/manual/snapshots-comparison.html) 显示绝对值及差值；未变化的行默认隐藏。跨会话条件可能在应用程序变更之外独立改变总量。正增量需要诊断，而不是立即归因于编辑过的功能。

[引用面板](https://docs.unity3d.com/Packages/com.unity.memoryprofiler@1.1/manual/references-component.html)区分朝向根的可展开 **被引用** 链，与仅列出直接出向引用的 **引用到** 。未显示引用时，选定对象的名称仍会出现。应将其视为已捕获的引用接口，而不是已收集所有可能的原生/GPU 所有者的证据。

也要记录观测器设置：[窗口参考](https://docs.unity3d.com/Packages/com.unity.memoryprofiler@1.1/manual/memory-profiler-window-reference.html) 提供捕获标志、截图、关闭已打开捕获，以及在 Editor 捕获前运行垃圾回收的选项。在候选方案之间改变这些设置，就改变了观测过程。

### Addressables：放弃所有权不等于立即回收

[Addressables 内存管理](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/MemoryManagement.html) 要求加载/释放配对。资源和 bundle 都有引用计数。当其他资源仍保留其 bundle 时，将某资源引用释放至零不一定会卸载它。Addressables 性能分析器反映的是这些计数，不是驻留内存的精确清单；`Resources.UnloadUnusedAssets` 可以在不更新该引用计数视图的情况下卸载符合条件的对象，并可能引起卡顿。

反过来，立即重新加载刚刚卸载的共享依赖会造成 **资源反复装卸** 。因此，某一边界处较低的保留字节量，可能以重复加载工作为代价。将资源/句柄标识、bundle 依赖、预期缓存生命周期及实际释放操作与内存证据一并保留。不要仅为取得更小的分数而强制卸载。

Unity 的[禁用域重载指南](https://docs.unity3d.com/6000.0/Documentation/Manual/domain-reloading.html) 又引入一个独立干扰因素：静态字段、静态事件订阅者及非序列化值可以跨 Play 会话存续，而脚本变更刷新仍可能触发重载。重新进入 Play 模式不等同于冷重置。

### 建议的固定循环测试场景，尚未实现或执行

使用一个可丢弃项目及声明的循环：加载固定资源集、实例化场景、运行固定交互/捕获序列、销毁循环拥有的对象、释放拥有的句柄，然后返回一个命名的空闲边界。比较候选方案前，固定循环次数、内容、预热、缓存策略、重置方法、观测设置及允许残留的资源。

1. 记录新进程基线及独立的预热基线。在获取资源前标记 A，工作完成后标记 B，在应用程序声明的释放边界后标记 C；不要用任意休眠替代生命周期完成。
2. 捕获等价的 Unity 快照，或保留完整 UE 跟踪区间。按对象/类别及保留链或分配调用栈检查增长。明确保留共享 bundle 及预期缓存。
3. 纳入一个故意保留的测试对象及一个正确释放的对照对象。检查选定的观测接口能否区分它们；不预设自动故障判定。
4. 重复未改变的循环，不要通过重置消除疑似累积。另行从新进程重新运行，以区分会话持久性与可复现的逐循环保留。
5. 保留文件、哈希、回调结果、查询参数、标识及排除项。将捕获不完整、缺失字段、超时及所有权未解决报告为无法下结论。将正常游戏计时与快照造成的暂停分开测量。

跨平台覆盖、原生/GPU 统计完整性、安全的中断捕获恢复及实际保留阈值仍未经验证。有用的结果是可复现的生命周期违规，并能确定所有者或分配来源；无论字节量减少还是快照创建成功，都不能确立这一结果。

## 尚存的实践边界

生产故障仍需要项目自行负责帧、求解器更新、资源/构建修订及游戏事件之间的标识映射。动画脚部接触需要绑定/控制器、预期运动、坐标变换及碰撞证据；仅凭接触 API 无法提供通用的脚滑或重定向阈值。流送就绪还包括纹理 mip 之外的项目特定几何体、导航、脚本及持久状态。这些关联、目标机器授权及真实测试场景结果仍未知。在宣称实现自动诊断或优化循环前，应优先获得可复现的故障项目和明确的验收目标。
