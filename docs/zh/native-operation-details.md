# 原生操作细节与生命周期边界

查阅生产操作背后的原生命令、文件、生命周期事件和失败信号。实施工作单时，将这些细节与[引擎操作参考](engine-operation-contracts.md#animation-rendering-and-interchange)结合使用。

## 如何理解生命周期限制

每行都将已知的完成与持久化行为，同未知的取消、重试和恢复语义区分开。“未知”表示所检查的来源未确立该契约；并不声称供应商不具备它。除非某行明确另有说明，幂等重试、事务回滚、安全的并发写入、崩溃或断电后的持久性，以及完整的应用重置均保持为  **未知** 。仅有成功的 API 调用、回调、文件写入或进程退出，并不能确立生产输出已通过验收。

版本范围：Epic 来源涵盖版本化的实验性 Python 5.4/5.5/5.6/5.8，以及显示为 5.8 的滚动更新页面。Unity 来源包括 6000.0、CLI 6000.3、Test Framework 1.4.6、AI Navigation 2.0 和 Input System 1.9。FMOD 来源为 2.04（页面标识为 2.04.00，2026-09-29）。Max 参考为 2024；Substance 文档为滚动更新。请使用各行的确切链接及下方来源范围索引，不要假定它们属于一套版本一致的已安装技术栈。

## Unreal：创作、导入与持久化

| 操作与一手证据                                                                                                                                                                                                                                                                                         | 文档记载的行为                                                                                                                                                       | 生命周期边界与拟议门禁                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **选择 Python 执行模式** <br>[Unreal Editor Python 脚本编写](https://dev.epicgames.com/documentation/en-us/unreal-engine/scripting-the-unreal-editor-using-python)                                                                                                                                        | Python 仅用于编辑器，不能用于玩法或 PIE 执行。完整编辑器启动时加载启动关卡；Python commandlet 不自动加载关卡。两种 CLI 路径都在脚本结束后退出。                                                                     | 完成：脚本或进程生命周期不能确立资产正确性。取消／重试／持久化：此处未知。拟议门禁：有意识地选择编辑器或 commandlet，并显式加载所需关卡。             |
| **提交并观测资产导入** <br>[AssetTools API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/AssetTools?application_version=5.6)；[AssetImportTask API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/AssetImportTask?application_version=5.6) | import_asset_tasks 接受任务数组。AssetImportTask 的 async\_ 仅启用受支持的异步导入；is_async_import_complete 轮询就绪状态，get_objects 等待结果。Interchange 忽略 destination_name；命名应在其流水线中处理。 | 完成：任务就绪与结果访问已有文档记录。持久化：保存可单独配置。取消／重试：未知。拟议门禁：任何重试前，检查 imported_object_paths、命名和目标冲突。   |
| **保存资产包** <br>[EditorAssetLibrary API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/EditorAssetLibrary?application_version=5.6)                                                                                                                                 | EditorAssetLibrary.save_asset 保存资产所在的包，尝试签出，提供 only_if_is_dirty，并返回布尔值。该库不适用于关卡资产，并警告应避免在 PIE 中使用。                                                            | 完成：布尔保存结果。持久化：包保存已有文档记录，崩溃后的持久性未知。取消／重试：未知。拟议门禁：区分签出失败、未更改／脏状态策略和重新打开验证；不要通过此辅助方法处理地图。 |
| **保存或更换当前地图** <br>[LevelEditorSubsystem API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/LevelEditorSubsystem?application_version=5.6)                                                                                                                         | save_current_level 要求关卡先前已保存且路径有效。load_level 关闭现有持久关卡而不保存。两者都返回布尔值；on_map_changed 可能过早发生，文档提供 on_map_opened 作为替代。                                             | 完成：原生结果与适当的地图事件，而非通用派发。持久化：加载可能丢弃脏编辑。取消／重试：未知。拟议门禁：替换关卡前解决未保存状态的处理策略。                  |
| **重新编译已编辑材质** <br>[MaterialEditingLibrary](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/MaterialEditingLibrary)                                                                                                                                                 | MaterialEditingLibrary 提供材质图编辑后的重新编译。                                                                                                                         | 完成／取消／重试／持久化：本次核查的来源摘要未确立这些语义。拟议门禁：保留编译诊断，再独立保存、重新打开并测试目标渲染器输出；仅修改图还不够。                |

## Unreal：世界生成、烘制、渲染与验证

| 操作与一手证据                                                                                                                                                                                                                                                                                                                                                            | 文档记载的行为                                                                                                                                    | 生命周期边界与拟议门禁                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **生成 PCG 图实例** <br>[程序化内容生成概述](https://dev.epicgames.com/documentation/unreal-engine/procedural-content-generation-overview)                                                                                                                                                                                                                                       | PCG Component 拥有图实例，并管理编辑器和运行时生成。                                                                                                          | 完成／取消／重试／持久化：未确立各图的具体语义。拟议门禁：重新生成前确定生成对象的所有权与清理策略；概述不是通用生成屏障。                                            |
| **构建分区衍生内容** <br>[World Partition 构建器 commandlet](https://dev.epicgames.com/documentation/unreal-engine/world-partition-builder-commandlet-reference?lang=en-US)                                                                                                                                                                                                   | 专用构建器涵盖 HLOD 生成、PCG 及世界重命名／复制。PCG 构建器等待网格编译、调度生成、等待，然后保存。迭代加载可减少内存；依赖 GPU 的图要求启用渲染。                                                        | 完成／持久化：PCG 构建器流程包括生成等待与保存。取消／重试：未知。拟议门禁：保留生成包清单；对于未被引用的资产，可能需要 AssetGatherAll。不要隐式启用源代码管理 AutoSubmit。    |
| **为某平台烘制所选地图** <br>[烘制内容](https://dev.epicgames.com/documentation/en-us/unreal-engine/cooking-content-in-unreal-engine)                                                                                                                                                                                                                                            | cook commandlet 将内容转换为所选目标平台的格式，并支持选择地图。                                                                                                   | 完成／取消／重试／持久化保证：此处除生成已烘制内容之外均未确立。拟议门禁：检查诊断与输出清单；烘制数据不等于打包后的可执行文件、成功的目标启动或发布批准。                            |
| **运行 Movie Render Graph 队列** <br>[Movie Render Graph 脚本编写](https://dev.epicgames.com/documentation/unreal-engine/movie-render-graph-scripting-in-unreal-engine?application_version=5.4)；[MoviePipelineExecutorBase Python API 5.4](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/MoviePipelineExecutorBase?application_version=5.4) | 5.4 Python 示例创建 MoviePipelinePIEExecutor，保留其 Python 引用，并附加错误和完成回调。执行器完成时的成功表示没有作业出现致命错误。cancel_current_job 中止该作业；cancel_all_jobs 还会跳过剩余作业。 | 完成：委托已有文档记录。取消：方法已有文档记录，但并未确立每次取消都使 success=false。重试／持久化：未知。拟议门禁：保留执行器生命周期、逐作业错误、取消意图及实际输出帧清单；队列启动不等于完成。 |
| **运行资产验证器** <br>[数据验证](https://dev.epicgames.com/documentation/en-us/unreal-engine/data-validation-in-unreal-engine)                                                                                                                                                                                                                                               | 默认 Data Validation commandlet 运行 C++ 验证器。Blueprint／Python 支持需要扩展；Python 验证器必须显式注册。                                                         | 完成／取消／重试／持久化：概述未确立这些语义。拟议门禁：记录已发现的验证器及预期夹具；命令显示通过，不能证明从未注册的验证器提供了覆盖。                                     |
| **准备关卡功能测试** <br>[功能测试](https://dev.epicgames.com/documentation/unreal-engine/functional-testing-in-unreal-engine?lang=en-US)                                                                                                                                                                                                                                      | 功能测试是放置在关卡中的 actor；在等待流式加载、导航或服务器就绪时，准备可跨越多帧。                                                                                              | 完成／取消／重试／持久化：由项目决定。拟议门禁：将就绪超时与玩法断言失败分开，保留实际准备好的世界；不要用固定休眠代替。                                             |
| **采集引擎与网络追踪** <br>[Unreal Insights 参考](https://dev.epicgames.com/documentation/unreal-engine/unreal-insights-reference-in-unreal-engine-5)；[Networking Insights](https://dev.epicgames.com/documentation/en-us/unreal-engine/networking-insights-in-unreal-engine)                                                                                                 | 追踪通道取决于编译时追踪宏和运行时通道选择。Networking Insights 提供数据包时间线、复制对象、RPC 和计数器；追踪采集器必须可用。                                                                | 完成／取消／重试／持久化：此处未确立采集器生命周期。拟议门禁：记录已启用通道、采集器身份与追踪时间范围；事件缺失可能表示埋点不可用，而非事件未发生。                               |

## Unreal：动画、变形、特效与音频图

| 操作与一手证据                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 文档记载的行为                                                                                                                                            | 生命周期边界与拟议门禁                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **创作 IK 绑定并烘焙重定向资产** <br>[使用 Python 创作 IK Rig](https://dev.epicgames.com/documentation/unreal-engine/using-python-to-create-and-edit-ik-rigs-in-unreal-engine)；[使用 Python 创作 IK Retargeter](https://dev.epicgames.com/documentation/unreal-engine/using-python-to-create-and-edit-ik-retargeter-assets-in-unreal-engine?lang=en-US)                                                                                                                          | IK Rig 控制器提供骨骼网格、目标、求解器设置与重定向链。Retargeter 创作可配置源／目标绑定、链映射和姿态。批量重定向为目标骨骼网格复制动画，并可选地重映射引用资产。                                                         | 完成／取消／重试：未知。持久化：创建资产输出，但保存持久性未确立。拟议门禁：保存前列举复制与重映射的资产并验证骨架身份；保持源片段完整。                                                                                           |
| **评估运行时重定向配置** <br>[运行时 IK 重定向](https://dev.epicgames.com/documentation/unreal-engine/runtime-ik-retargeting-in-unreal-engine?lang=en-US)；[制作重定向设置动画](https://dev.epicgames.com/documentation/en-us/unreal-engine/animating-ik-retarget-settings-in-unreal-engine)                                                                                                                                                                                           | Retarget Pose From Mesh 使用源姿态和已配置的 IK Retargeter；配置覆盖在运行时改变重定向设置。运行时重定向不会创建新的 Animation Sequence 资产。                                               | 完成：运行时姿态评估，没有通用的终结作业。取消／重试／持久化：未知。拟议门禁：区分评估后的姿态与创作／烘焙内容，并记录源、目标两侧的骨架状态。                                                                                        |
| **编辑 Sequencer 与分层 Control Rig** <br>[Sequencer 中的 Python 脚本编写](https://dev.epicgames.com/documentation/unreal-engine/python-scripting-in-sequencer-in-unreal-engine?lang=en-US)；[使用 Python 和 Control Rig 制作动画](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-scripting-for-animating-with-control-rig-in-unreal-engine)                                                                                                                | Python 添加 Sequencer 绑定／轨道，并将动画资产分配给片段参数。Control Rig 可查询并分层；较大的优先级值先求值。                                                                             | 完成／取消／重试／持久化：保存和回滚语义未确立。拟议门禁：记录对象绑定、片段时序与层优先级；保存前评估已知样本，不要将插入轨道视为正确动画。                                                                                         |
| **向具名目标扭曲根运动** <br>[Motion Warping](https://dev.epicgames.com/documentation/unreal-engine/motion-warping-in-unreal-engine?lang=en-US)                                                                                                                                                                                                                                                                                                                        | 需要 Motion Warping 组件、启用根运动的动画，以及蒙太奇扭曲窗口。Skew Warp 以窗口结束时的变换为目标。Remove Warp Target 解除其名称的关联；也提供禁用根运动修改器的功能。                                         | 完成：窗口结束时的目标行为已有文档记录，不是全场景成功结果。取消：移除目标／修改器并未被确立为对先前移动的回滚。重试／持久化：未知。拟议门禁：追踪目标身份与权威根节点轨迹。                                                                         |
| **编译并应用变形图** <br>[自定义 Deformer Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/how-to-create-a-custom-deformer-graph-in-unreal-engine)；[Deformer Graph 插件参考](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/PluginIndex/DeformerGraph)；[Groom Deformer Graph](https://dev.epicgames.com/documentation/unreal-engine/setting-up-a-groom-deformer-graph-in-unreal-engine?lang=en-US)                                       | 自定义 Deformer 图接受变量／资源／曲线及自定义 HLSL；保存／编译后将图分配给网格。该 Beta GPU 插件依赖 Compute Framework 和 Control Rig。Groom 图使用 Groom Component／数据接口，以及与所处理毛发元素匹配的内核执行域。 | 完成：保存／编译工作流已有文档记录，取消／重试／崩溃后持久性未知。拟议门禁：检查目标 GPU／插件支持、数据域和实际变形输出；有效的网格图不会自动成为有效的毛发图。                                                                             |
| **采集或简化 Niagara 输出** <br>[NiagaraSimCache API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/NiagaraSimCache?application_version=5.5)；[Niagara Flipbook Baker](https://dev.epicgames.com/documentation/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine?lang=en-US)；[Niagara 可扩展性与生产最佳实践](https://dev.epicgames.com/documentation/unreal-engine/scalability-and-best-practices-for-niagara?lang=en-US) | 模拟缓存通过 Baker、Sequencer 或 Blueprint 采集多帧；可用属性取决于采集配置。Flipbook Baker 生成平铺纹理，作为昂贵实时模拟的替代方案。GPU 粒子仍有 CPU 系统／发射器开销；平台质量／剔除／生成控制影响行为。                    | 完成／取消／重试／持久化：未确立通用采集结果。拟议门禁：保留采集设置／属性，并在目标上验证纹理或缓存使用。CPU 开销是性能约束，不是并发保证。时域缓存插值限制仍见[引擎操作说明](engine-operation-contracts.md#animation-rendering-and-interchange)。 |
| **构建并试听 MetaSound** <br>[MetaSound Builder API](https://dev.epicgames.com/documentation/en-us/unreal-engine/metasound-builder-api-in-unreal-engine)                                                                                                                                                                                                                                                                                                          | Beta Builder API 支持内存内图创作与试听。重建／版本变化后，句柄可能失效。资产序列化属于编辑器子系统和编辑器构建。                                                                                  | 完成／取消／重试：未知。持久化：试听的内存内图与序列化后的编辑器资产不同。拟议门禁：重建后重新获取句柄，并单独保存／重新打开；不要假定运行时创建图会写入资产。                                                                                |

## Unity：进程、导入、测试与渲染观测

| 操作与一手证据                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 文档记载的行为                                                                                                                                                                                                                     | 生命周期边界与拟议门禁                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **启动隔离的批处理编辑器** <br>[Unity Editor CLI](https://docs.unity.com/en-us/engine/6000.3/manual/unity-editor/command-line-arguments/editor)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 批处理模式消除交互式提示；-nographics 还避免初始化图形设备。并发编辑器不能打开同一项目。                                                                                                                                                                          | 完成／取消／重试／持久化：各个被调用的操作仍需要自身契约。拟议门禁：每个编辑器使用一个具有明确归属的项目工作区，并显式声明图形需求；仅有批处理模式不意味着无图形运行。                                                                      |
| **批量执行 AssetDatabase 编辑** <br>[AssetDatabase.StartAssetEditing](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AssetDatabase.StartAssetEditing.html)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | StartAssetEditing 暂停导入，直到 StopAssetEditing；恢复导入前，新建资产可能不可用。文档记载的安全模式将 StopAssetEditing 放在 finally 中。                                                                                                                        | 完成：结束批次会恢复导入，但不能证明所有下游验收检查都已通过。取消／重试／持久化：未知。拟议门禁：发生错误后始终释放批次作用域，再观测相关导入产物。                                                                               |
| **保存并重新打开编辑器场景** <br>[EditorSceneManager.SaveScene](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/SceneManagement.EditorSceneManager.SaveScene.html)；[EditorSceneManager.OpenScene](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/SceneManagement.EditorSceneManager.OpenScene.html)                                                                                                                                                                                                                                                                                                                                      | SaveScene 返回布尔值，并要求目标文件夹已存在。对于从未保存的场景，目标为空会提示对话框；saveAsCopy 不改变脏状态。OpenScene 失败时可能抛出 ArgumentException。                                                                                                                     | 完成：布尔值／异常语义已有文档记录。持久化：保存副本不会清除活动场景的脏状态。取消／重试／崩溃后持久性：未知。拟议门禁：提供显式、适合批处理的路径，并检查全新重新打开的场景。                                                                  |
| **选择测试模式并观测转换** <br>[Test Framework CLI](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/manual/reference-command-line.html)；[ICallbacks](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.ICallbacks.html)；[EnterPlaymode](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/EditorApplication.EnterPlaymode.html)；[ExitPlaymode](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/EditorApplication.ExitPlaymode.html)；[playModeStateChanged](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/EditorApplication-playModeStateChanged.html) | EditMode、编辑器 PlayMode 和构建后播放器目标各不相同。Test Framework 1.4.6 输出 NUnit XML；runSynchronously 仅限 EditMode，并会过滤多帧测试。RunStarted 接收加载后的树，TestFinished 接收节点结果，RunFinished 接收运行结果。Enter/ExitPlaymode 切换编辑器状态；playModeStateChanged 报告转换。 | 完成：回调区分运行和节点结果；请求模式变更不证明目标状态已经就绪。取消／重试／持久化：见[测试取消说明](engine-operation-contracts.md#execution-and-recovery)；不提供新的重置／回滚保证。拟议门禁：保留发现的测试数与模式，避免被过滤的测试悄然计入覆盖。 |
| **采集渲染后的游戏视图** <br>[CaptureScreenshotAsTexture](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ScreenCapture.CaptureScreenshotAsTexture.html)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | CaptureScreenshotAsTexture 返回游戏视图 Texture2D，并要求渲染完成，例如通过 WaitForEndOfFrame 等待。                                                                                                                                              | 完成：这是渲染阶段前置条件，不是任意截图延时。取消／重试／持久化：未知；返回的纹理并非已保存的证据文件。拟议门禁：将采集关联到相机／帧／状态，并单独持久化字节。仅此来源不保证批处理模式或无图形采集。                                                      |
| **测量计数器并构建播放器** <br>[ProfilerRecorder](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Unity.Profiling.ProfilerRecorder.html)；[BuildPipeline.BuildPlayer](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/BuildPipeline.BuildPlayer.html)                                                                                                                                                                                                                                                                                                                                                                                     | ProfilerRecorder 可在编辑器和播放器中使用，包括发布版，但计数器各不相同；其非托管资源需要释放。BuildPipeline.BuildPlayer 返回带汇总结果的 BuildReport。                                                                                                                     | 完成：检查构建汇总，而非报告是否非空；计数器需要可用性检查。取消／重试／持久化：未知。拟议门禁：区分编辑器和目标播放器测量，并归档确切构建输出；在有界采集后释放记录器。                                                                     |
| **构建或更新导航** <br>[NavMeshSurface API](https://docs.unity3d.com/Packages/com.unity.ai.navigation@2.0/api/Unity.AI.Navigation.NavMeshSurface.html)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | NavMeshSurface.BuildNavMesh 构建已配置的表面；UpdateNavMesh 重建变化区域并返回 AsyncOperation。                                                                                                                                                | 完成：更新提供异步操作句柄；智能体成功寻路是另一回事。取消／重试／持久化：未确立。拟议门禁：保留表面输入，等待操作完成后再测试声明的路径；不要由运行时就绪推断导航网格已序列化。                                                                 |
| **显式推进 VFX 或 Playables** <br>[VisualEffect.Simulate](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/VFX.VisualEffect.Simulate.html)；[PlayableGraph.Evaluate](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Playables.PlayableGraph.Evaluate.html)                                                                                                                                                                                                                                                                                                                                                                          | VisualEffect.Simulate 按给定步数和增量秒数推进特效系统。PlayableGraph.Evaluate 按指定秒数更新相连的 playable 和图输出。                                                                                                                                     | 完成：这是显式求值步骤，不是整个引擎同步，也不保证跨平台确定性。取消／重试／持久化：未知。拟议门禁：记录累计时间，避免将不确定的步骤当作幂等操作重复应用。                                                                            |
| **离线渲染音频帧** <br>[AudioRenderer](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioRenderer.html)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | AudioRenderer 采集使实时输出静音，并将音频工作移到主线程；即便样本数为零，也必须每帧调用 Render。Unity 6000.0 不支持 Web 播放器构建；选择 Web 时，编辑器采集仍可工作。                                                                                                                   | 完成／取消／重试／持久化：本摘要未确立完整录制结果。拟议门禁：维持帧／样本调度、检测遗漏调用，并单独归档采集样本；离线采集不是物理设备延迟的证据。                                                                                |
| **重置合成输入测试状态** <br>[Input System 测试](https://docs.unity.cn/Packages/com.unity.inputsystem%401.9/manual/Testing.html)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | InputTestFixture 重置输入状态；必须启用包 testables 和测试程序集引用。自定义启动注册不会自动包含在内。                                                                                                                                                           | 完成／取消／重试／持久化：夹具不能确立完整游戏重置。拟议门禁：显式注册必需的布局／处理器，并将合成输入覆盖与物理硬件／焦点行为分开。                                                                                       |

## 输入送达与观测对齐

将[合成输入](asset-validation-contracts.md#7-select-the-right-impairment-and-input-surface-for-a-regression)连接到[采集帧](visual-evidence-research.md#engine-frame-readback-and-capture-ownership)，同时将动作送达与观测到的状态分开。

### 发现与版本边界

注入事件、输入系统更新、玩法回调和渲染结果是独立观测。官方来源为最初的转换提供了有用边界；它们  **不**  确立哪个项目专用渲染帧包含预期交互。这一未解决缺口应保留在研究索引中。

- **Unity Input System 1.9.0：**  有意保留现有资料集的包系列，不声称它是最新版。官方 1.9 API 页面标识为 1.9.0。标签 `1.9.0` 解析为 `73feff4267461a868fdfc3fa43f112de1f5312c1`；[固定版本的包清单](https://github.com/Unity-Technologies/InputSystem/blob/73feff4267461a868fdfc3fa43f112de1f5312c1/Packages/com.unity.inputsystem/package.json)确认了 1.9.0。这一包版本固定不标识已安装的 Unity 编辑器／播放器、平台后端或项目配置。
- **Godot 4.5.0 stable：**  标签 `4.5-stable` 解析为 `876b290332ec6f2e6d173d08162a02aa7e6ca46d`；[固定版本的版本文件](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/version.py)确认了 4.5.0 stable。下文的实现声明使用此提交；托管的 4.5 文档仍可变化。未测试构建，也未测试平台专用的焦点行为。

### Unity：排队、更新与动作是不同门禁

#### 入队不等于状态消费

`InputSystem.QueueEvent` 将事件复制到其缓冲区并分配事件 ID。在固定更新模式下，未来时间戳可将处理推迟到匹配的更新窗口。`onEvent` 是预处理观察者：其他监听器可将事件标记为已处理，阻止其应用；已禁用设备仍可能产生此通知。事件不按时间戳排序。将事件身份、产生顺序和预期设备，与后续状态／动作观测分别记录。\[U1]

默认处理发生在 `MonoBehaviour.Update` 之前；固定处理发生在 `MonoBehaviour.FixedUpdate` 之前。渲染前更新仅消费相关追踪设备输入，因此不是通用的键盘／手柄刷新。鼠标／触摸事件合并也会改变生成事件与观测事件之间的对应关系。分别记录更新模式／类型、输入更新计数、模拟 tick 和渲染帧。\[U2]

`onAfterUpdate` 标记的是输入系统更新完成，而非玩法或渲染完成。手动调用 `InputSystem.Update()` 会插入另一次完整输入状态更新；API 不建议在测试或手动更新模式之外使用。它不是无害的截图同步调用。\[U1]

#### 动作观测需要其配置信息

已启用的动作监视其解析出的控件。它们的 `started`、`performed` 和 `canceled` 回调在输入更新期间发生，早于对应的脚本更新。动作类型和交互决定阶段；同一帧中可观测到多次值变化。因此，`performed` 回调既不能计为一次唯一的渲染动作，也不能证明游戏接受了其效果。\[U3]

`Disable()` 可同步为进行中的动作调用 `canceled`。重新启用 Value 动作，会在下一次输入更新中执行初始状态检查，并可针对已被驱动的控件触发，而无须新事件；Button 和 PassThrough 动作可选择启用该行为。重置观察者必须区分新输入与禁用／重新启用转换。\[U3]

#### 焦点重置不是释放事件

在默认后台策略下，失去焦点会软重置并禁用无法在后台运行的设备。重新获得焦点时，会重新启用设备并请求同步；不支持同步时，则回退为软重置。重置取消关联动作，但不触发基于释放的动作。编辑器 Game View 的焦点路由还增加一层策略，对键盘／指针与手柄输入的处理可能不同。这些规则取决于 Run In Background 及受支持平台；不要由仅在编辑器中的测试推断构建后播放器的行为。\[U4]

软重置排除标记为 `dontReset` 的控件，例如指针位置；硬重置则包含它们。发送默认值状态与设备重置不同，可能触发交互，而非干净地取消它。两种操作都不会恢复角色速度、排队命令、动画或其他由游戏拥有的状态。最后一句是集成边界，而非 Unity 的额外重置保证。\[U5]

#### 失败不一定意味着事件被推迟

所引 API 中，`maxEventBytesPerUpdate` 默认值为 5 MB。超过限制会丢弃剩余缓冲事件、记录错误并中止更新；并不承诺下一帧处理积压。独立的默认 1,000 个事件排队限制，适用于 *更新期间* 入队的事件，以防回调驱动的事件循环。将设置和诊断与事件台账一起保留。超时或缺少动作回调，不足以证明重试不会重复游戏效果。\[U6]

### Godot：轮询状态与路由事件是不同接口

`Input.action_press()` 改变供轮询使用的动作状态，但不调用 `Node._input()`。`Input.parse_input_event()` 将事件送入事件路径；它不模拟移动操作系统指针等操作系统侧效果。全局 `Input` 轮询状态不会被 `Control.accept_event()` 或 `Viewport.set_input_as_handled()` 改变，后二者控制场景传播。因此，全局按下状态为真，不能证明 `_unhandled_input` 玩法处理程序收到了事件。\[G1]

文档记载的路径允许 `_input` 或 GUI 处理在 `_unhandled_input` 之前停止传播；嵌入的 Windows 和 SubViewports 具有不同路由。应记录目标视口、焦点控件、预期处理程序及其处理是否启用，而非将一次全局事件接收视为送达所有游戏视图。\[G4]

#### 缓冲注入存在具体的对象生命周期风险

在固定版本实现中，启用累积或敏捷刷新时，`parse_input_event()` 以引用方式缓冲事件，或将其累积到最后一个缓冲事件中；否则立即调用内部解析器。调试检查会警告不要在同一帧多次解析相同事件对象。为按下和释放使用不同事件实例；不要修改并重新提交仍在缓冲中的对象。`flush_buffered_events()` 通过内部解析器排空事件，内部解析器断言最终用户代码送达在主线程运行。这些是源代码观察，而非已复现的故障。\[G2]

`flush_buffered_events()` 将缓冲事件送入游戏循环，而非执行完整的模拟／渲染步骤。启用敏捷刷新时，固定版本主循环会在每个物理步骤之前及处理执行之前按条件刷新。因此，不同物理步数和缓冲设置会影响观测调度；一次刷新并不等于固定的模拟时间推进。\[G1, G3]

`is_action_just_pressed()` 描述当前帧或物理 tick，即使快速释放后也可能仍为真。在输入处理期间，适合使用事件专用动作查询。同时记录事件时状态和实际游戏消费阶段；不要用帧结束时的持续按下状态轮询替代事件序列。\[G1]

Godot 内部的 `release_pressed_events()` 先刷新缓冲输入，再清除若干按下状态集合，并释放已按下的动作。此处并不将其作为面向脚本的通用重置 API、平台焦点契约或取消／回滚屏障。这一顺序进一步说明，在宣告新试验开始之前，必须考虑待送达内容。\[G2]

### 拟议的应用自有证据契约

对于夹具，使用可丢弃的自有项目，包含一个输入控制的标记和一个可见的权威状态转换。保留五种状态，而非单一成功位：

1. **已提交／已接受：**  注入接口、调用结果／异常、事件或命令身份、目标设备／动作、按下／释放／值、时间戳及产生顺序
2. **已观测／已消费输入：**  观测到的原始事件、更新阶段／类型／计数以及由此产生的控件／动作状态；区分预处理接收与状态应用
3. **玩法已消费：**  预期控制器／处理程序记录试验 ID、模拟 tick、决策和状态修订；显式记录被忽略、被 GUI 消费或被拒绝的命令
4. **已渲染：**  所选相机／视口渲染与该状态修订关联的标记，并保留目标／帧来源及现有采集就绪检查
5. **已保留产物：**  将采集身份／哈希与完整的输入／动作／玩法时间线一同保存

渲染标记是拟议的佐证观测，而非普遍的引擎因果保证。异步命令、物理插值、动画、多相机和 UI 路由都可能介入。在测试前定义项目专用的预期状态变化、可容忍延迟和停止条件。如果处理程序或状态观察者不可用，应报告对齐未知；单靠截图或动作回调都无法补足这一缺失环节。

### 尚未执行的有界夹具

| 夹具                                           | 独立观测与拟议验收                                                |
| -------------------------------------------- | -------------------------------------------------------- |
| Unity 动态输入与固定输入，包括带未来时间戳的事件                  | 队列 ID、更新类型／计数、动作阶段、游戏 tick 和渲染修订；不能仅因下一次渲染中没有未来输入，就宣告其丢失 |
| Unity 原始观察者将事件标记为已处理                         | 可以接收到原始事件，却不应用于控件／动作／玩法；测试框架必须保留这一区别                     |
| Unity 回调突发，对照一个特意缩小、仅供测试的事件预算                | 记录错误与事件缺失结果；绝不要将已丢弃输入标为仅仅待处理，也不要自动重放效果不确定的操作             |
| Unity 控件在禁用／重新启用及失去／重新获得焦点期间保持按下             | 区分取消、初始状态激活、同步／重置和实际释放；不得让过期玩法命令进入下一次试验                  |
| Godot action_press 与新分配的 InputEventAction 对比 | 仅轮询的控制器与回调驱动控制器有意产生不同证据；报告所选接口是否实际覆盖目标控制器                |
| Godot 按下／释放，同时包含 GUI 拦截、累积与多个物理步骤            | 不同事件对象、路径／处理程序观测和 tick 日志；全局按下／刚按下状态不能替代路由后的玩法接收         |
| 存在待处理工作时重置或重载场景                              | 使先前试验身份失效，核对待处理命令，并在允许新试验前验证中性输入及应用状态；未知工作使干净重置判定无法成立    |

尚未确立任何夹具通过／失败结果、延迟测量、确定性回放声明或物理硬件等价性。项目专用的输入到帧对齐、取消已开始的效果、跨平台焦点行为和完整重置，仍是待完成的实现工作。本说明增加的是文档化区别及可测试的故障假设，而非可工作的智能体适配器，也不是操作生产游戏的授权。

### 一手来源

- **U1：**  [InputSystem 1.9 API](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.9/api/UnityEngine.InputSystem.InputSystem.html)，由[固定版本的 InputSystem.cs](https://github.com/Unity-Technologies/InputSystem/blob/73feff4267461a868fdfc3fa43f112de1f5312c1/Packages/com.unity.inputsystem/InputSystem/InputSystem.cs#L2470-L2523) 和[应用前的监听器处理](https://github.com/Unity-Technologies/InputSystem/blob/73feff4267461a868fdfc3fa43f112de1f5312c1/Packages/com.unity.inputsystem/InputSystem/InputManager.cs#L3341-L3359) 佐证
- **U2：**  [输入事件 1.9：处理与合并](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.9/manual/Events.html#processing-events)
- **U3：**  [InputAction 1.9 API](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.9/api/UnityEngine.InputSystem.InputAction.html)
- **U4：**  [输入设置 1.9：后台与编辑器焦点行为](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.9/manual/Settings.html#background-behavior)
- **U5：**  [设备 1.9：重置](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.9/manual/Devices.html#device-resets)
- **U6：**  [InputSettings 1.9：事件预算](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.9/api/UnityEngine.InputSystem.InputSettings.html#UnityEngine_InputSystem_InputSettings_maxEventBytesPerUpdate)，由[固定版本的 InputManager 诊断](https://github.com/Unity-Technologies/InputSystem/blob/73feff4267461a868fdfc3fa43f112de1f5312c1/Packages/com.unity.inputsystem/InputSystem/InputManager.cs#L3545-L3566) 佐证
- **G1：**  [Godot 4.5 Input](https://docs.godotengine.org/en/4.5/classes/class_input.html)，由[固定版本的 Input.xml](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/doc/classes/Input.xml) 佐证
- **G2：**  [固定版本的 input.cpp：注入、刷新与内部释放](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/core/input/input.cpp#L1200-L1296)；[主线程送达断言](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/core/input/input.cpp#L734-L737)
- **G3：**  [固定版本主循环：物理／处理与条件性输入刷新](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/main/main.cpp#L4722-L4805)
- **G4：**  [Godot 4.5 事件传播](https://docs.godotengine.org/en/4.5/tutorials/inputs/inputevent.html#how-does-it-work)

## DCC 批量转换与材质导出

| 操作与一手证据                                                                                                                                                                                                                                                                               | 文档记载的行为                                                                                                                 | 生命周期边界与拟议门禁                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **运行 3ds Max 批处理与 Python** <br>[3ds Max Batch](https://help.autodesk.com/cloudhelp/2024/ENU/3DSMax-Batch/files/GUID-48A78515-C24B-4E46-AC5F-884FBCF40D59.htm)；[3ds Max Python 线程](https://help.autodesk.com/cloudhelp/2024/ENU/MAXDEV-Python/files/MAXDEV_Python_threading_html.html) | 3dsmaxbatch.exe 运行 Python／MAXScript，可选地加载场景，然后退出；监听器日志需要显式配置。2024 线程文档禁止在工作线程上调用 pymxs 或使用 pymxs 创建的对象；mxstoken 已弃用且无效。 | 完成／取消／重试／持久化：除脚本／日志接口外均未确立。拟议门禁：收集两类日志，并独立检查已保存输出；将场景修改排入主线程队列，而非对同一场景并行调用。          |
| **区分 Substance 工具包转换** <br>[Substance Automation Toolkit 命令行](https://adobedocs.github.io/substance-automation-toolkit/pysbs/sat_commandlines/sat_commandlines.html)                                                                                                                  | Baker 创建几何衍生贴图；Cooker 将 SBS 图转换为 SBSAR；Mutator 对图内容进行特化；Renderer 将 SBSAR 求值为贴图；Updater 升级文档版本。                          | 完成／取消／重试／持久化保证：命令行清单未确立这些保证。拟议门禁：记录确切工具／版本／后端及中间产物哈希；烘制、渲染和文档迁移是不同操作，产生不同输出。         |
| **导出 Painter Texture Set 通道** <br>[Painter Python API](https://experienceleague.adobe.com/en/docs/substance-3d-dev/painter-python/substance-3d-painter-python)                                                                                                                        | 官方 Python 教程演示了使用指定导出预设导出 Texture Set 通道。                                                                               | 完成／取消／重试／持久化：此处未确立。拟议门禁：保留项目／预设／通道清单，并独立验证导出；现有纹理工作单提供色彩与子图像验收，而非已实现的 Painter 作业观察者。 |

## 光照烘焙完成与持久化场景关联

2026-10-18 源代码检查：Blender `v4.5.0` 解析为 `8cb6b388974a817afedf1317ce26f0c75aa5f181`；Godot `4.5-stable` 为已有固定版本 `876b290332ec6f2e6d173d08162a02aa7e6ca46d`。这些是所选源代码版本，而非已安装构建。未执行烘焙、GPU 作业、图像保存、失败或重新打开夹具。本次核查期间无法获取 Blender 手册／API；下文的 Blender 声明依据所检查的实现和 RNA 定义。

### Blender：目标修改与图像交付相互独立

RNA 目标定义区分了与活动材质图像纹理节点关联的图像数据块，以及活动网格颜色属性。图像目标验证检查 UV 是否存在以及图像是否初始化。没有活动图像的材质槽可能生成信息性报告后继续，因此预期目标清单需要独立检查；不要从单一操作器状态推断每种材质都收到了结果。[目标定义][light-blender-rna]、[验证，第 499–589 行][light-blender-bake]

操作器公开了外部文件路径和保存模式枚举，但所检查的初始化显式将 EXTERNAL 改写为 INTERNAL。因此，在此版本中，提供文件路径不能证明纹理已写出。图像输出被标记为脏。显式的 `Image.save` 路径报告保存失败；`Image.pack` 可在内存中打包脏图像数据。仅打包不会将包含它的 `.blend` 保存到磁盘。这些是可用的持久化路径，并非声称其他所有方式都无效。应保留输出报告、保存的字节及冷启动重新打开的观测，而非接受内存内预览。[公开的模式，第 446–453 行][light-blender-rna]、[强制模式，第 1918–1922 行；文件路径，第 2253–2257 行；脏图像，第 331 行][light-blender-bake]、[图像保存／打包，第 91–145 和 303–329 行][light-blender-image]

在没有烘焙作业运行时，invoke 路径启动一个作业并返回 RUNNING_MODAL；已有烘焙作业时则返回 CANCELLED。一旦该作业不再存在，模态处理程序就报告 FINISHED；仅此条件不能区分烘焙成功、取消或失败。同步执行路径返回烘焙结果，但其非选中到活动的批处理循环反复赋值结果，并返回最后一个值。  **对适配器的启示：**  分别记录派发模式、目标／对象清单、逐对象报告、输出变化和持久化。未复现批处理失败或取消行为。[调用，第 2171–2220 行；模态，第 139–151 行；同步路径，第 1931–1989 行][light-blender-bake]

### Godot：原生编辑器操作、图集资源与场景身份

所检查的原版脚本绑定将 `LightmapGI::bake` 留作注释。编辑器插件调用该原生方法，选择编辑中的根节点或光照贴图的父节点作为扫描根节点。这确立的是编辑器／原生路径，而非可调用的 GDScript 烘焙方法或已实现的 GameMap 适配器。并不排除自定义原生集成。固定版本类文档称导出项目无法烘焙光照贴图，并以“未安装自定义光照贴图器时”限定对支持 Forward+／Mobile 设备的要求。渲染已烘焙的光照贴图是另一项能力。[绑定，第 1893 行][light-godot-core]、[编辑器派发，第 39–78 行][light-godot-editor]、[类范围，第 7–13 行][light-godot-class]

对于普通 MeshInstance3D 收集，源代码要求可见的 Static-GI 网格以及带 UV2 和法线的三角形表面，并记录相对于 LightmapGI 的变换。原生烘焙会拒绝缺少保存路径、缺少符合条件网格或计算所得光照贴图尺寸为零的情况。`(0,0)` 网格尺寸提示在缩放前采用 64×64 后备值。版本化教程还警告，隐藏 Light 不会移除其贡献：应使用其 Disabled 烘焙模式。完全烘焙的静态表面光照不会仅因灯光移动或改色而更新。因此，UV2／导入状态和烘焙代次应纳入证据记录。[收集，第 373–415 行；初始门禁，第 885–951 行][light-godot-core]、[4.5 工作流与灯光模式][light-godot-guide]

原生保存路径写入 EXR 光照贴图图集和可选的 PNG 阴影遮罩图集及导入配置，重新导入它们，并要求纹理资源已加载。随后，它将每个烘焙使用者的 NodePath、图集 UV 缩放、切片及子实例索引记录到 LightmapGIData 中，保存该资源并将其分配给活动节点。后续分配会解析路径，并在先前烘焙的节点缺失时发出警告。仅有图像文件，不能证明当前场景使用了预期烘焙结果。所检查的编辑器函数不会在此操作中保存 PackedScene。[图集持久化，第 808–882 行；使用者关联，第 1322–1333 行；最终保存／分配，第 1469–1479 行；路径解析，第 1510–1543 行][light-godot-core]

两个完成／恢复边界很重要。首先，编辑器在检查返回错误之前调用烘焙结束例程；不论结果如何，该例程都会打印“Done baking lightmaps”。其次，原生路径先保存图集文件，再分离并清除现有 LightmapGIData，然后才最终保存资源。后续保存出错时，会在重新分配它之前返回。这些代码路径未确立原子替换或回滚，也未观察到损坏。应保留可恢复的上一代结果，并分别验证产物、原生结果、场景关联和全新重新打开。[编辑器完成／错误顺序，第 69–124 和 163–174 行][light-godot-editor]、[替换顺序，第 1281–1308 和 1469–1479 行][light-godot-core]

**应保留的文档差异：**  固定版本 LightmapGI 类说明称 PrimitiveMesh 因无法存储 UV2 而不能烘焙，但版本化 4.5 教程描述了基元 Add UV2 支持。教程另行提供 CSG 到 MeshInstance 的转换路径；该变通方案改变了表示，本身并不与不支持直接 CSG 烘焙相矛盾。不要将宽泛的 PrimitiveMesh 声明转为无条件的资格规则。应检查实际生成的网格、UV2、法线、尺寸提示和所选构建；转换／导入／重新打开夹具仍未执行。[类说明][light-godot-class]、[基元／CSG 工作流][light-godot-guide]

### 拟议验收夹具，尚未实现或执行

使用一个已取得使用权的小房间、一个自发光表面、一盏静态灯、一盏动态灯，以及一个有意排除的对象。固定几何／材质／灯光变换、UV 层、引擎和渲染器、烘焙设置、色彩／曝光解释、源修订、场景代次及预期接收者清单。

对于 Blender，记录确切的活动图像／颜色目标、通道／过滤器及选中到活动设置。比较图像缓冲区、显式保存的纹理或打包并保存的项目，以及冷启动重新打开的数据。包含缺少材质目标和操作被取消的情况；状态字符串或变化的预览都不能认证所有输出。

对于 Godot，保留图集／导入／资源哈希及逐节点 UV／切片关联。烘焙后，通过单独验证的路径保存项目自有场景，在全新进程中重新打开，并在记录的显示设置下比较固定相机视图。测试缺少 UV2 的接收者、已烘焙节点重命名／更改父节点、隐藏灯光与 Disabled 灯光，以及未重新烘焙时的几何／灯光变化。即便旧光照仍显得合理，也应将源输入变化视为生成结果过期条件。仅在可丢弃副本中测试中断或失败的保存；保留先前产物，而非覆盖唯一可恢复的基线。

将终态成功、产物完整性、当前场景关联、持久化和渲染外观作为独立门禁验收。接缝／噪声／漏光容差、GPU／设备兼容性、取消恢复、崩溃后持久性和实际目标构建行为需要运行时证据；来源未提供这些结果。

[light-blender-rna]: https://github.com/blender/blender/blob/8cb6b388974a817afedf1317ce26f0c75aa5f181/source/blender/makesrna/intern/rna_scene.cc#L432-L453

[light-blender-bake]: https://github.com/blender/blender/blob/8cb6b388974a817afedf1317ce26f0c75aa5f181/source/blender/editors/object/object_bake_api.cc

[light-blender-image]: https://github.com/blender/blender/blob/8cb6b388974a817afedf1317ce26f0c75aa5f181/source/blender/makesrna/intern/rna_image_api.cc

[light-godot-core]: https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/3d/lightmap_gi.cpp

[light-godot-editor]: https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/editor/scene/3d/lightmap_gi_editor_plugin.cpp

[light-godot-class]: https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/doc/classes/LightmapGI.xml

[light-godot-guide]: https://docs.godotengine.org/en/4.5/tutorials/3d/global_illumination/using_lightmap_gi.html

## 音频中间件：创作、就绪与所有权

| 操作与一手证据                                                                                                                                                                                                                   | 文档记载的行为                                                                                                                                                                                                                                           | 生命周期边界与拟议门禁                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **通过脚本或 CLI 构建 FMOD bank** <br>[FMOD Studio 项目脚本编写](https://www.fmod.com/docs/2.04/studio/scripting-api-reference-project.html)；[FMOD Studio 高级主题](https://fmod.com/docs/2.04/studio/advanced-topics.html)                | studio.project.build 选择 bank／平台，也生成主 bank／主字符串。build 返回布尔值；buildEndedConnect 提供成功状态，false 涵盖错误或用户取消。CLI 可构建所选 bank／平台并导出 GUID；旧项目可能需要主版本迁移。                                                                                                       | 完成／取消：保留含糊的 false 结果，不要编造错误与取消的具体区别。重试／持久化原子性：未知。使用后断开信号处理程序。拟议门禁：保留平台／bank 血缘及兼容的 FMOD 产品／主版本；输出 bank 不等于持久保存的创作项目。         |
| **提交 FMOD 命令并等待平台就绪** <br>[FMOD Studio API 指南](https://www.fmod.com/docs/2.04/api/studio-guide.html)；[FMOD Unity 平台细节](https://www.fmod.com/docs/2.04/unity/platform-specifics.html)                                      | 默认异步模式下，Studio::System::update 快速提交工作；Studio 线程处理工作，回调可能在 FMOD 拥有的线程上运行。Unity WebGL 使用单线程混音与异步 bank 加载；Android 扩展文件路径也要求异步加载。getEvent 前应等待 bank，以避免 ERR_EVENT_NOTFOUND。                                                                           | 完成：update 不等于命令完成；bank 已加载不保证输出可听，浏览器交互也可能限制声音。取消／重试／持久化：未知。拟议门禁：安全地将回调调度到适当线程，并在发出事件前保留 bank 就绪／错误观测。样本驻留和事件释放已由现有生命周期说明涵盖。 |
| **加载／卸载 Wwise bank 并控制通知** <br>[Wwise 2017.2.0 build 6500 SoundEngine 头文件](https://github.com/audiokinetic/WwiseIncludes/blob/be96b3af20bf27647f458bac10d973a63cd75e02/SDK/include/AK/SoundEngine/Common/AkSoundEngine.h) | 在此历史 SDK 中，异步 LoadBank 通过 bank 回调报告结果。原地 bank 内存在使用期间必须保持有效；适用时，UnloadBank 必须匹配原始标识符／指针。CancelBankCallbackCookie 抑制回调，而非取消 bank 工作。PostEvent 回调可报告标记／结束；CancelEventCallback 移除通知，而非停止播放。bank 已不存在时，同步 UnloadBank 仍可返回成功；卸载驻留 bank 媒体不会停止流式或生成的声音。 | 完成：改变内存所有权前，使用同步结果或适当回调。取消：抑制通知不等于取消操作。重试／持久化：未知；内存生命周期不是保存状态的持久性。拟议门禁：区分事件／播放／bank 身份，以及实际的原生停止／卸载与观察者释放。                   |
| **关闭 Wwise Authoring WAAPI 会话** <br>[Audiokinetic Python WAAPI 客户端](https://github.com/audiokinetic/waapi-client-python)                                                                                                  | 官方 Python 客户端要求 Wwise Authoring 可达，支持调用／订阅，并维持后台线程。其上下文管理器断开连接／注销订阅者；否则需显式取消订阅／断开连接，以避免进程滞留。                                                                                                                                                      | 创作修改的完成／取消／重试／持久化：客户端生命周期未确立这些语义。拟议门禁：记录服务器 getInfo，并限定订阅者所有权范围；关闭客户端不是文档记载的项目保存或修改回滚操作。                                     |

关于独立的 Wwise Authoring 输出边界，[SoundBank 生成与产物采集](generation-delivery-contracts.md#capture-wwise-authoring-soundbanks-before-testing-runtime-playback)记录了已检查的 2024.1.9 默认值与选择标志。这并不将上述历史 2017.2.0 运行时声明升级为当前 SDK 保证。

## 区分 FMOD 事件生命周期与可听完成

**仅限来源的范围。**  于 2026-10-18 对照 FMOD Engine／Studio 2.04 文档进行审阅，文档标识为  **2.04.00 (2026-09-29)** 。这些是文档契约，而非已安装版本、运行时、许可使用权或适配器结果。不替代现有调度、样本就绪和事件释放覆盖。

**文档记载的边界。**  [EventInstance 参考](https://www.fmod.com/docs/2.04/api/studio-api-eventinstance.html#fmod_studio_event_callback_type)将回调类型与播放状态枚举分别定义：`FMOD_STUDIO_EVENT_CALLBACK_STARTING` 报告对先前未播放事件的启动请求；`STARTED` 可因样本加载而延迟。`START_FAILED` 报告复音数量限制拒绝，在此情况下不发出 STARTING、STARTED 和 STOPPED 回调。另外，对于无效实例，`getPlaybackState` 写入播放枚举 `FMOD_STUDIO_PLAYBACK_STOPPED`。此输出枚举与 C／C++／C# 调用的 `FMOD_RESULT`／`RESULT` 返回值不同；应同时保留。对已播放实例调用 `start` 会重新启动它。

[Studio 状态映射](https://fmod.com/docs/2.04/studio/advanced-topics.html)记载，暂停不改变 `FMOD_STUDIO_PLAYBACK_STATE`；应单独查询暂停状态。

[Studio 抢占模式](https://www.fmod.com/docs/2.04/studio/event-macro-controls-reference.html#stealing)区分了 Oldest／Furthest／Quietest（停止选中实例）、Virtualize（安静实例继续运行但不输出，并可随相对可听度或容量变化而转为真实实例）和 None（达到上限时拒绝新播放）。这些是事件最大实例数策略，而非 Core 软件声道限制。[Core 资源管理，与 Core API Virtual Voice System 的交互](https://www.fmod.com/docs/2.04/api/managing-resources-in-the-core-api.html)记载，`EventInstance::isVirtual == false` 可与部分或全部底层 Core Channels 因软件声道限制而虚拟化同时存在。因此，真实 Studio 事件不能证明 Core 声部可听。

**拟议验收契约。**  分别记录实例身份、API 结果、回调类型、播放枚举、暂停状态、事件虚拟化、适用的 Core 声部限制和停止意图。将这些观测与现有采集输出证据关联。区分拒绝、失效观测、正常原生停止和经验证的可听完成。无论 STOPPED、PLAYING 还是事件级非虚拟状态，都不能独立构成可听成功门禁。重试前应核对不确定的启动。

**尚未实现的夹具：**  复音数量限制拒绝且无 STOPPED 回调；受限软件声道上限下的 Studio 真实／Core 虚拟播放；PLAYING 时暂停；终态轮询前句柄失效；虚拟转真实恢复。分别采集起音与预期尾音。未执行夹具、适配器、引擎／API／模型运行或物理设备测量。

## 运行时音频观测与采集完整性

**仅限来源的范围：**  核查日期为 2026-10-18。Godot 文档版本为 4.5；源代码为 `4.5-stable`，通过[官方发行版](https://github.com/godotengine/godot/releases/tag/4.5-stable)解析到提交 `876b290332ec6f2e6d173d08162a02aa7e6ca46d`。还通过 GitHub 连接器获取了该提交上的相关代码范围。Unreal 参考明确为 5.5；其 Python 参考标记为 Experimental。未运行引擎、模型、音频 API、采集设备或拟议夹具。未确立运行时兼容性或声学保真度。

### 1. 标识采样点，而非仅标识音频文件名

Godot 的 [AudioEffectCapture 参考](https://docs.godotengine.org/en/4.5/classes/class_audioeffectcapture.html)描述了从其附着音频总线复制到环形缓冲区的原始帧。其 `get_buffer(n)` 返回请求数量的帧，帧不足时返回空数组。空读取不是静音样本的证据。该采集不对完成的音频资产进行编码。

固定版本的 [AudioServer 混音路径](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/servers/audio_server.cpp#L538-L657)依次处理已启用的效果，然后应用该总线音量和静音／独奏衰减，再将结果送往下游。  **根据源代码推导的含义：**  即便其自身总线已静音，采集效果也可能包含非零输入。改变它在效果链中的位置，会改变观测到的处理阶段。子总线采集不会自动包含下游处理或其他总线。此实现中，即便是 Master 上的最后一个效果，也位于 Master 总线增益／静音之前。

[音频总线指南](https://docs.godotengine.org/en/4.5/tutorials/audio/audio_buses.html)标记为尚未针对 4.5 更新，并警告 Web Sample 播放不支持这些效果；需要 Stream 播放，而在线程不可用时存在延迟权衡。[版本化 Web 导出指南](https://docs.godotengine.org/en/4.5/tutorials/export/exporting_for_web.html#audio-playback)也独立记录了相同的 Sample／Stream 限制，但没有页面过期横幅。应记录播放模式，而非将不受支持的观测路径当作静音。初始夹具应保持立体声；环绕声覆盖和声道对所有权需要独立验证。

### 2. 区分观测丢失与播放失败

固定版本的[采集实现](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/servers/audio/effects/audio_effect_capture.cpp#L121-L140)不论环形缓冲区容量如何，都会将输入复制到输出。只有环形缓冲区有足够空间容纳整个块时，才插入传入的处理块；否则按该块帧数增加 `discarded_frames`。因此，采集丢失本身不能证明引擎发生了可听的缓冲欠载。

[同一实现的缓冲区方法](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/servers/audio/effects/audio_effect_capture.cpp#L34-L119)表明，`clear_buffer()` 推进读取位置，但不重置已推入／已丢弃计数器。公开参考称，初始化后改变缓冲区长度不起作用。应使用计数器基线／增量及实际报告的帧容量；不要假定设置更长时长已修复当前采集。即便溢出计数器未变，清空也会造成显式的观测不连续。仅有计数器总数，不能精确定位每个缺失区间。

### 3. 区分渲染缓冲区、导出完成与可听输出

Unreal 的 [5.5 混音器概述](https://dev.epicgames.com/documentation/en-us/unreal-engine/audio-mixer-overview-in-unreal-engine?application_version=5.5)将子混音输出描述为子级子混音与已注册／发送源的组合，再经过子混音效果链处理。它另行说明会提前渲染相对于当前听到的缓冲区而言的未来缓冲区。因此，采集确立的是选定渲染路径的观测，而非物理扬声器输出。

[ISubmixBufferListener](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/ISubmixBufferListener?application_version=5.5)接收新渲染的子混音缓冲区，附带所属子混音、样本／声道数、采样率和 `AudioClock`。应保留这些字段；所检查的参考未确立与游戏 tick、视频时间戳或设备呈现共享的时钟纪元，也未确立每条监听器路径精确位于增益前还是增益后。不要根据参数名称臆造这种对齐。

[AudioMixerLibrary](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/AudioMixerLibrary?application_version=5.5)区分暂停与最终完成，并将未指定子混音时的默认值设为主输出。[SoundSubmix](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/SoundSubmix?application_version=5.5)为已完成文件导出提供 `on_submix_recorded_file_done`。将停止意图、导出通知、独立重新打开的产物和声学观测作为独立结果保留。这些页面未确立取消、崩溃安全持久化或安全重叠录制请求的语义。

Godot 的 [AudioServer 参考](https://docs.godotengine.org/en/4.5/classes/class_audioserver.html)指出输出延迟取决于驱动，并警告不要每帧查询。无头模式选择 Dummy 驱动。其[同步教程](https://docs.godotengine.org/en/4.5/tutorials/audio/sync_with_audio.html)明确标记为尚未针对 4.5 更新，讨论了分块播放位置、延迟修正、抖动和硬件／系统时钟漂移。应将其视为估计指导，而非测得的设备延迟或同步证明。

### 拟议验收夹具，尚未实现或执行

**建议检查：**  创建可丢弃的立体声场景，包含已知左右声道脉冲、可见标记、两条有路由的总线和可识别效果。保留构建／平台、音频驱动／设备、播放模式、路由／效果顺序、增益／静音状态、采样率、采集身份、读取计数、计数器基线和时钟域。

比较效果前后及 Master 上的采样点；将源总线静音；绕过采集；故意只阻塞采集器直至溢出；运行中清空环形缓冲区；暂停／恢复录制；停止并等待导出通知，然后重新打开并统计样本。要求有独立观测的标记和显式缺口。溢出使连续采集验收失效；回调缺失或空读取仍属未知，而非成功或静音。绝不要将分离片段拼接成时间连续的假象。

在整个预期会话中重复标记，以区分偏移与漂移。关于设备输出的声明需要独立表征过的回环或声学测量，并包含其自身延迟与不确定性。下游响度／循环检查仅应消费采样点与覆盖均有记录的产物。将游戏正确性、观察者完整性和感知评审作为独立判定。

## 来源范围与迁移核算

下列条目保留了所检查来源记录中的版本边界。本列表不是额外的唯一工具计数。Wwise 头文件已独立重新获取，并固定到提交 `be96b3af20bf27647f458bac10d973a63cd75e02`（2018 年 1 月 25 日）。其[版本头文件](https://github.com/audiokinetic/WwiseIncludes/blob/be96b3af20bf27647f458bac10d973a63cd75e02/SDK/include/AK/AkWwiseSDKVersion.h)标识为  **2017.2.0 build 6500** 。这些生命周期声明是历史源代码证据，而非当前 Wwise 或已安装 SDK 兼容性声明。Movie Render Graph 有意保留了经修正的致命错误与取消之区别。Niagara CPU 开销仍是性能约束，而非并发证据。

- [Unreal Editor Python 脚本编写](https://dev.epicgames.com/documentation/en-us/unreal-engine/scripting-the-unreal-editor-using-python)：页面标注 UE 5.8；不是经验证的已安装版本
- [AssetTools API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/AssetTools?application_version=5.6)：UE Python 5.6，实验性
- [AssetImportTask API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/AssetImportTask?application_version=5.6)：UE Python 5.6，实验性
- [EditorAssetLibrary API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/EditorAssetLibrary?application_version=5.6)：UE Python 5.6，实验性
- [LevelEditorSubsystem API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/LevelEditorSubsystem?application_version=5.6)：UE Python 5.6，实验性
- [MaterialEditingLibrary](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/MaterialEditingLibrary)：UE Python 5.8，实验性
- [程序化内容生成概述](https://dev.epicgames.com/documentation/unreal-engine/procedural-content-generation-overview)：页面标注 UE 5.8
- [World Partition 构建器 commandlet](https://dev.epicgames.com/documentation/unreal-engine/world-partition-builder-commandlet-reference?lang=en-US)：页面标注 UE 5.8
- [烘制内容](https://dev.epicgames.com/documentation/en-us/unreal-engine/cooking-content-in-unreal-engine)：页面标注 UE 5.8
- [Movie Render Graph 脚本编写](https://dev.epicgames.com/documentation/unreal-engine/movie-render-graph-scripting-in-unreal-engine?application_version=5.4)：UE 5.4
- [MoviePipelineExecutorBase Python API 5.4](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/MoviePipelineExecutorBase?application_version=5.4)：版本化的实验性 Python API 文档；并非已执行的取消测试。
- [数据验证](https://dev.epicgames.com/documentation/en-us/unreal-engine/data-validation-in-unreal-engine)：页面标注 UE 5.8
- [功能测试](https://dev.epicgames.com/documentation/unreal-engine/functional-testing-in-unreal-engine?lang=en-US)：页面标注 UE 5.8
- [Unreal Insights 参考](https://dev.epicgames.com/documentation/unreal-engine/unreal-insights-reference-in-unreal-engine-5)：页面标注 UE 5.8
- [Networking Insights](https://dev.epicgames.com/documentation/en-us/unreal-engine/networking-insights-in-unreal-engine)：页面标注 UE 5.8
- [使用 Python 创作 IK Rig](https://dev.epicgames.com/documentation/unreal-engine/using-python-to-create-and-edit-ik-rigs-in-unreal-engine)：页面标注 UE 5.8
- [使用 Python 创作 IK Retargeter](https://dev.epicgames.com/documentation/unreal-engine/using-python-to-create-and-edit-ik-retargeter-assets-in-unreal-engine?lang=en-US)：页面标注 UE 5.8
- [运行时 IK 重定向](https://dev.epicgames.com/documentation/unreal-engine/runtime-ik-retargeting-in-unreal-engine?lang=en-US)：页面标注 Unreal Engine 5.8；滚动更新内容可能保留历史功能说明
- [制作重定向设置动画](https://dev.epicgames.com/documentation/en-us/unreal-engine/animating-ik-retarget-settings-in-unreal-engine)：页面标注 Unreal Engine 5.8；滚动更新内容可能保留历史功能说明
- [Sequencer 中的 Python 脚本编写](https://dev.epicgames.com/documentation/unreal-engine/python-scripting-in-sequencer-in-unreal-engine?lang=en-US)：页面标注 UE 5.8
- [使用 Python 和 Control Rig 制作动画](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-scripting-for-animating-with-control-rig-in-unreal-engine)：页面标注 UE 5.8
- [Motion Warping](https://dev.epicgames.com/documentation/unreal-engine/motion-warping-in-unreal-engine?lang=en-US)：页面标注 Unreal Engine 5.8；滚动更新内容可能保留历史功能说明
- [自定义 Deformer Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/how-to-create-a-custom-deformer-graph-in-unreal-engine)：页面标注 Unreal Engine 5.8；滚动更新内容可能保留历史功能说明
- [Deformer Graph 插件参考](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/PluginIndex/DeformerGraph)：页面标注 Unreal Engine 5.8；滚动更新内容可能保留历史功能说明
- [Groom Deformer Graph](https://dev.epicgames.com/documentation/unreal-engine/setting-up-a-groom-deformer-graph-in-unreal-engine?lang=en-US)：页面标注 Unreal Engine 5.8；滚动更新内容可能保留历史功能说明
- [NiagaraSimCache API](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/NiagaraSimCache?application_version=5.5)：UE 5.5，实验性
- [Niagara Flipbook Baker](https://dev.epicgames.com/documentation/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine?lang=en-US)：页面标注 Unreal Engine 5.8；滚动更新内容可能保留历史功能说明
- [Niagara 可扩展性与生产最佳实践](https://dev.epicgames.com/documentation/unreal-engine/scalability-and-best-practices-for-niagara?lang=en-US)：页面标注 Unreal Engine 5.8；滚动更新内容可能保留历史功能说明
- [MetaSound Builder API](https://dev.epicgames.com/documentation/en-us/unreal-engine/metasound-builder-api-in-unreal-engine)：页面标注 UE 5.8；Beta
- [Unity Editor CLI](https://docs.unity.com/en-us/engine/6000.3/manual/unity-editor/command-line-arguments/editor)：Unity 6000.3
- [AssetDatabase.StartAssetEditing](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AssetDatabase.StartAssetEditing.html)：Unity 6000.0
- [EditorSceneManager.SaveScene](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/SceneManagement.EditorSceneManager.SaveScene.html)：Unity 6000.0
- [EditorSceneManager.OpenScene](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/SceneManagement.EditorSceneManager.OpenScene.html)：Unity 6000.0
- [Test Framework CLI](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/manual/reference-command-line.html)：Test Framework 1.4.6
- [ICallbacks](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.ICallbacks.html)：Test Framework 1.4.6
- [EnterPlaymode](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/EditorApplication.EnterPlaymode.html)：Unity 6000.0
- [ExitPlaymode](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/EditorApplication.ExitPlaymode.html)：Unity 6000.0
- [playModeStateChanged](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/EditorApplication-playModeStateChanged.html)：Unity 6000.0
- [CaptureScreenshotAsTexture](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ScreenCapture.CaptureScreenshotAsTexture.html)：Unity 6000.0
- [ProfilerRecorder](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Unity.Profiling.ProfilerRecorder.html)：Unity 6000.0
- [BuildPipeline.BuildPlayer](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/BuildPipeline.BuildPlayer.html)：Unity 6000.0
- [NavMeshSurface API](https://docs.unity3d.com/Packages/com.unity.ai.navigation@2.0/api/Unity.AI.Navigation.NavMeshSurface.html)：AI Navigation 2.0 文档
- [VisualEffect.Simulate](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/VFX.VisualEffect.Simulate.html)：Unity 6000.0
- [PlayableGraph.Evaluate](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Playables.PlayableGraph.Evaluate.html)：Unity 6000.0
- [AudioRenderer](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioRenderer.html)：Unity 6000.0
- [Input System 测试](https://docs.unity.cn/Packages/com.unity.inputsystem%401.9/manual/Testing.html)：Input System 1.9
- [3ds Max Batch](https://help.autodesk.com/cloudhelp/2024/ENU/3DSMax-Batch/files/GUID-48A78515-C24B-4E46-AC5F-884FBCF40D59.htm)：3ds Max 2024
- [3ds Max Python 线程](https://help.autodesk.com/cloudhelp/2024/ENU/MAXDEV-Python/files/MAXDEV_Python_threading_html.html)：3ds Max 2024
- [Substance Automation Toolkit 命令行](https://adobedocs.github.io/substance-automation-toolkit/pysbs/sat_commandlines/sat_commandlines.html)：滚动更新文档；版本未固定
- [Painter Python API](https://experienceleague.adobe.com/en/docs/substance-3d-dev/painter-python/substance-3d-painter-python)：更新于 2026 年 9 月 15 日；应用版本未固定
- [FMOD Studio 项目脚本编写](https://www.fmod.com/docs/2.04/studio/scripting-api-reference-project.html)：FMOD 2.04 文档；页面标识为 2.04.00 (2026-09-29)
- [FMOD Studio 高级主题](https://fmod.com/docs/2.04/studio/advanced-topics.html)：FMOD 2.04 文档；页面标识为 2.04.00 (2026-09-29)
- [FMOD Studio API 指南](https://www.fmod.com/docs/2.04/api/studio-guide.html)：FMOD 2.04 文档；页面标识为 2.04.00 (2026-09-29)
- [FMOD Unity 平台细节](https://www.fmod.com/docs/2.04/unity/platform-specifics.html)：FMOD 2.04 文档；页面标识为 2.04.00 (2026-09-29)
- [Audiokinetic SoundEngine 头文件](https://github.com/audiokinetic/WwiseIncludes/blob/be96b3af20bf27647f458bac10d973a63cd75e02/SDK/include/AK/SoundEngine/Common/AkSoundEngine.h)：提交 `be96b3af20bf27647f458bac10d973a63cd75e02`；[SDK 版本头文件](https://github.com/audiokinetic/WwiseIncludes/blob/be96b3af20bf27647f458bac10d973a63cd75e02/SDK/include/AK/AkWwiseSDKVersion.h)标识为 Wwise 2017.2.0 build 6500，而非当前 SDK 或已安装兼容性结果。
- [Audiokinetic Python WAAPI 客户端](https://github.com/audiokinetic/waapi-client-python)：默认分支，未固定；客户端 API 不能确立服务器版本支持

## 其他原生持久化与浏览器引擎边界

[Godot ResourceSaver](https://docs.godotengine.org/en/stable/classes/class_resourcesaver.html)在保存受支持资源时返回 Error 状态；运行时不会持久化生成的资源 UID，因为相关代码仅用于编辑器。[Godot 4.4 RNG](https://docs.godotengine.org/en/4.4/classes/class_randomnumbergenerator.html)恢复先前生成的状态；同时设置种子与状态时，应先设种子再设状态，且不要假定算法跨版本稳定。[Blender 4.5 CLI](https://docs.blender.org/manual/nl/4.5/advanced/command_line/arguments.html)按顺序求值参数，因此加载 blend 可能覆盖先前设置；后台操作与 CPU／GPU 渲染选择是两回事。这些来源行为并未确立崩溃安全的持久化或全游戏回放。

浏览器引擎观测与导出也有独立的完成接口：[Three.js 异步渲染目标回读](https://threejs.org/docs/pages/WebGLRenderer)解析得到像素数据，而 [GLTFExporter.parseAsync](https://threejs.org/docs/pages/GLTFExporter.html)解析得到导出数据，压缩纹理还要求使用渲染器专用工具。任何一个 Promise 单独都不会保存证据文件，也不能证明下游导入器保真度。[Babylon NullEngine](https://github.com/BabylonJS/Documentation/blob/master/content/setup/support/serverSide.md)不要求 WebGL 设备，但不产生渲染；其下的服务器／测试／导入支持不能确立视觉正确性。取消、幂等重试和输出持久性仍未经验证。

[Houdini 许可](https://www.sidefx.com/docs/houdini/licensing/system.html)记载了可配置的产品／模式选择层级。拟议部署证据应记录所选产品、模式和实际许可配置；主机 UI 或无头入口可工作，不代表具有使用权。不声明价格、免费层级或通用许可签出顺序。

[Epic 的行为树概述](https://dev.epicgames.com/documentation/en-us/unreal-engine/behavior-tree-in-unreal-engine---overview)，按 UE 5.8 文档检查，描述了所观察的 Blackboard 条件中止低优先级分支，以及 Simple Parallel／服务如何组织行为。概念上的并行不等于操作系统线程并行，也不能确立通用取消契约。

关于运行时内容更新，[Godot 4.4 包激活](production-work-orders.md#godot-44-content-patches-mounting-is-not-dependency-activation)区分了已挂载包字节与缓存资源／依赖激活。这是独立的版本专用来源契约，而非热更新执行结果。

## 有意保留的缺口

这些条目没有一个提供通用保存／重新打开驱动器、跨引擎对象身份映射、渲染完成采集器、音频设备观察者、主机工具链、许可使用权或确定性重置夹具。并不暗示存在工作室私有 API。生产使用前，应通过可丢弃项目和自有进程验证取消与恢复；破坏性清理、源代码管理提交、分发和付费服务调用不属于本次仅限来源的研究范围。

## 录制对话与口型提示验证

将录制语音映射到项目自有口型，再在上下文中检查所得时序。将提示处理与[叙事纪元](gameplay-state-contracts.md#narrative-checkpoints-cancellation-and-world-effect-transactions)及音频观测配合使用。

### 来源与产物可用性

使用  **Rhubarb v1.14.0** ，其附注标签解析为  **9b9573cd21b253c9ba58739bbd1aa0b50b991bff** 。官方发行版发布于 2025-04-03；核查时它仍是官方 API 返回的最新发行版。发行版列出 Linux、macOS 和 Windows ZIP；仅检查了发行元数据，未检查二进制文件或其完整性。资产摘要为 null。固定版本工作流以 Windows x64、macos-13 和 ubuntu-20.04 构建为目标；不要据此推断原生 Apple Silicon 发行版或对所有当前操作系统的支持。运行时识别器从相对于可执行文件的 res/sphinx 目录加载本地资源；打包过程将语言／字典及声学模型资源复制到该目录。应将发行资源与可执行文件一起保留。（来源 R1–R3）

### 确切输入与识别边界

拟议 CLI 形式，  **尚未执行** ：

```text
rhubarb --machineReadable --recognizer pocketSphinx --exportFormat json --extendedShapes GHX --dialogFile line.txt --output line.cues.candidate.json line.wav
```

输入位于最后。默认识别器为 pocketSphinx，默认导出格式为 TSV；必须选择 JSON。--output 会覆盖现有目标；省略它时，结果写入 stdout。使用全新的候选路径，与源音频和已接受提示分开。（来源 R4、R5）

固定版本文件工厂不区分大小写地选择 .wav 或 .ogg，拒绝其他扩展名。WAV 解码要求小端 RIFF／WAVE，以及未压缩 PCM 或 IEEE 浮点，包括受支持的可扩展子格式：读取器涵盖普通 8／16／24／32 位 PCM 与 32／64 位浮点；它拒绝不受支持的编解码器／样本组织方式。.ogg 指 Ogg  **Vorbis** ，而非 Ogg 容器中的每一种编解码器。两个读取器都将各声道取平均，合成为单声道。识别在内部将片段重新采样到 16 kHz 和 16 位缓冲区：“输入必须已是 16-kHz 单声道 PCM”是不正确的。源代码未确立通用最大文件长度或普遍的解码器健壮性。干净的单说话者单声道交付文件是拟议夹具选择，而非 CLI 要求。多声道平均可能抵消反相语音或混合说话者，因此应验证实际分析信号。（来源 R6–R8）

pocketSphinx 面向英语；--dialogFile 提供 ASCII／UTF-8 文本以偏置其词语模型，而非强制精确转写。源代码结合普通语言模型与对话偏置语言模型，再对齐所识别词语的音素。文档记载 phonetic 用于非英语／语言无关用途，典型精度较低；固定版本实现仍使用打包的声学／音素模型，并  **在识别时忽略对话** （CLI 仍读取所提供的 --dialogFile）。不要承诺文本辅助的非英语对齐。（来源 R4、R7、R9）

### 提示语义与完成

JSON 包含 metadata.soundFile（绝对源路径）、metadata.duration，以及含 start、end 和 value 的 mouthCues 条目。时间以秒为单位，相对于录音起点。内部时间线采用整数百分之一秒；时长向下截断到 0.01 秒边界。这并非样本精度、游戏帧时序、字幕文本或置信度分数。相邻区间共享边界。动画为空时，JSON 导出器还会输出零长度的空闲后备提示，因此仅有非空 mouthCues 不能证明存在可用语音。（来源 R10）

标签为 A–F，加上所选的 G／H／X：A 闭唇；B 牙齿咬合、嘴微张；C 张嘴；D 大幅张嘴；E 嘴呈圆形；F 噘嘴；G 下唇接触上齿；H 舌头抬起；X 静息。A–F 是工具目标口型集中的必需项；--extendedShapes 默认为 GHX，空字符串禁用全部三个扩展口型。这些是动画类别，而非引擎混合形状名称或一一对应的音素 ID。动画流水线在识别后应用时序优化、停顿、补间插入和口型集转换。因此，提示边界不必等于原始音素边界。（来源 R4、R11）

\--machineReadable 在 stderr 上输出以换行分隔的 JSON 状态：start、progress、success、failure（附 reason）和 log。应保留未知事件类型／字段，而非将可兼容未来版本的输入判为失败。源代码注意事项：

- CLI 解析发生在安装机器可读输出接收器之前；格式错误的参数可能产生普通文本
- 在输出接收器选择中，--quiet 优先于 --machineReadable
- success 在导出返回后、局部输出流销毁前发出；未确立显式的持久文件刷新／回读契约。这是静态源代码推理，而非复现的截断或写入失败
- 正常生成返回 0；已处理错误返回 1。帮助／版本也返回 0，因此仅有退出状态不能证明生成了提示

应使用实际进程终止 + 生成调用的预期成功状态 + 独立重新打开／解析的产物。保留 stderr 和退出／信号结果。进度 1.0 不等于完成。未确立可恢复执行／取消／原子替换契约；进程被终止或缺少终态事件，意味着候选项不确定／失败，绝不能视为已接受资产。（来源 R5、R12）

### 项目自有映射与一个引擎接口

**拟议 GameMap 适配器，尚未实现：**  对每个已启用提示标签到项目自有精灵帧／附件、绑定姿态或混合权重向量的映射进行版本管理。要求资产／网格身份、显式中性姿态和转换策略；拒绝未映射标签，而非猜测 ARKit／其他命名约定。使用实际音频实例及跳转／播放位置映射秒数，并声明提前／滞后与延迟处理方式。将暂停、恢复、音高／速率变化、跳转、循环、跳过和停止视为时钟／状态转换。重启时使旧对话／音频纪元失效；跳转后重新计算当前口型，而非重放过期提示事件。被截断的 <0.01 秒尾部要求声明结束／中性策略。Rhubarb 未提供通用的样本到游戏时钟对齐。

可供自定义消费方使用的一项官方引擎 API 是  **Godot 4.5 MeshInstance3D** ：缺失时（包括网格为 null），find_blend_shape_by_name 返回 -1；set_blend_shape_value 在有效索引处应用权重，get_blend_shape_value 读取它。无效 get 可在报错的同时返回 0.0，因此仅有零值不是中性姿态检查成功的证明。写入／读取前，应针对特定网格解析并验证名称。这是引擎 API 构建块，  **不是官方 Rhubarb 集成** ，也不能证明权重外观正确或保持同步。现有 GameMap 音频时钟／采集契约仍然适用。（来源 R13）

### 验收夹具与权利

**尚未实现的验收提案：**  归档工具／构建／资源身份、识别器／选项、输入哈希、源音频时长／采样率／声道、使用转写时的转写哈希、提示字节、映射版本、引擎／导入器身份和音频实例／会话纪元。验证提示区间为有限值、有序、连续且位于截断时长内，标签已启用，可用片段长度为正且源身份匹配；应按内容哈希绑定，而非仅靠元数据路径。为分发而剥离私有绝对路径时，应保留原始输出。

使用自有短录音，包含语音起音／闭口、停顿以及非百分之一秒边界的结束；纳入静音／不足 10 毫秒输入、语言／文字不匹配、立体声相位抵消、模型缺失、输入错误和输出中断。在可丢弃的消费场景中，经历暂停／跳转／重启及区域语言／音频替换时，结合采集音频／视频检查实际映射口型。将三种结果分开：结构上被接受的提示产物、正确的映射／播放时钟行为，以及人工／感知口型同步质量。未确立经过测量的识别准确率、延迟、可重复性或感知质量。

固定版本 LICENSE 标明 Rhubarb 本身采用 MIT，并提供独立第三方声明，包括 CMU Sphinx 美式英语声学模型的 BSD 条款。其不具约束力的摘要称，生成的口型同步数据属于用户，并区分仅用于生产与随产品提供口型同步功能。重新分发软件／资源时应保留适用声明；这些均未解决录音、表演者、声音克隆或项目美术的权利问题。（来源 R14）

### Rhubarb 一手证据

- **R1.**  [官方 v1.14.0 发行版](https://github.com/DanielSWolf/rhubarb-lip-sync/releases/tag/v1.14.0)、[发行版 API](https://api.github.com/repos/DanielSWolf/rhubarb-lip-sync/releases/209157788)、[附注标签](https://api.github.com/repos/DanielSWolf/rhubarb-lip-sync/git/tags/7368d255aada0a35d76b0ee6d1b0a76d91412d1c)
- **R2.**  [固定版本构建工作流](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/.github/workflows/ci.yml)
- **R3.**  [打包资源](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/CMakeLists.txt#L544-L596)、[本地模型路径](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/recognition/pocketSphinxTools.cpp#L171-L174)
- **R4.**  [固定版本 README](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/README.adoc)
- **R5.**  [CLI 设置、导出与退出](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/rhubarb/main.cpp#L120-L308)
- **R6.**  [文件派发](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/audio/audioFileReading.cpp)、[WAV 解码／下混](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/audio/WaveFileReader.cpp#L42-L248)、[Vorbis 解码／下混](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/audio/OggVorbisFileReader.cpp)
- **R7.**  [英语模型偏置、重新采样与对齐](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/recognition/PocketSphinxRecognizer.cpp)
- **R8.**  [16-kHz 识别常量](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/recognition/pocketSphinxTools.h)
- **R9.**  [Phonetic 识别器忽略对话](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/recognition/PhoneticRecognizer.cpp#L13-L36)
- **R10.**  [JSON 导出器](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/exporters/JsonExporter.cpp)、[截断时长](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/audio/AudioClip.cpp#L6-L8)、[百分之一秒](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/time/centiseconds.h)、[空内容后备处理](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/exporters/exporterTools.cpp)
- **R11.**  [口型标签](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/core/Shape.h)、[动画阶段](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/animation/mouthAnimation.cpp)
- **R12.**  [机器可读输出接收器](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/rhubarb/src/rhubarb/sinks/MachineReadableStderrSink.cpp)
- **R13.**  [Godot 4.5 MeshInstance3D 参考](https://docs.godotengine.org/en/4.5/classes/class_meshinstance3d.html)、[固定版本的匹配类文档](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/doc/classes/MeshInstance3D.xml#L61-L119)
- **R14.**  [固定版本 LICENSE 与依赖／模型声明](https://github.com/DanielSWolf/rhubarb-lip-sync/blob/9b9573cd21b253c9ba58739bbd1aa0b50b991bff/LICENSE.md)

## 浏览器过场演出的对白字幕与无障碍字幕交付

对于预录制的浏览器游戏过场演出，将定时文本附加到 HTML video 元素并检查提示送达。引擎原生对话、Web Audio 和 canvas 场景需要各自的字幕集成。

**固定来源。**  WebVTT [候选推荐标准草案，2026-05-20](https://www.w3.org/TR/2026/CRD-webvtt1-20260520/)仍在完善中。HTML 源代码检查固定于 [de953a7cf0523f5873a1904ba2ce010c689dfb66](https://github.com/whatwg/html/blob/de953a7cf0523f5873a1904ba2ce010c689dfb66/source)，日期为 2026-10-16。这些是规范固定版本，而非浏览器实现或兼容性结果。

**产物与身份。**  WebVTT 使用 UTF-8 文本与毫秒格式时间戳；提示起点按非递减顺序排列，且每个终点必须大于其起点。无障碍字幕／对白字幕区间可以重叠。标识符可选，但此草案要求所提供标识符在文件内唯一。解析器可丢弃格式错误的时序块，同时仍成功处理文件；即便仅有签名的文件，也可成功产生零条提示。因此，语法符合性与预期提示清单需要独立检查。[文件语法](https://www.w3.org/TR/2026/CRD-webvtt1-20260520/#file-structure)、[解析器](https://www.w3.org/TR/2026/CRD-webvtt1-20260520/#file-parsing)

**原生消费方。**  子级 track 提供 src、kind、srclang 和 label；subtitles 要求 srclang。hidden 模式维护活动提示但不显示；showing 叠加显示无障碍字幕／对白字幕；disabled 不启动获取提示，没有活动提示，并抑制提示事件。切换到 disabled 并非无条件取消进行中的获取，也不删除已加载提示。HTMLTrackElement.readyState 区分 NONE、LOADING、LOADED 和 ERROR。load 在解析之后发生；网络／CORS 及致命格式处理失败产生 error。[轨道](https://github.com/whatwg/html/blob/de953a7cf0523f5873a1904ba2ce010c689dfb66/source#L37936-L38206)、[模式](https://github.com/whatwg/html/blob/de953a7cf0523f5873a1904ba2ce010c689dfb66/source#L42310-L42395)、[加载](https://github.com/whatwg/html/blob/de953a7cf0523f5873a1904ba2ce010c689dfb66/source#L42930-L43089)

**时钟与重置。**  活动集合使用媒体时间，满足 start <= time < end。跳转重新计算集合；被跳转跳过的提示不被归类为漏播提示。处理缓慢可能使短提示未进入 activeCues。设置、更改或移除 track src 会立即清空其提示列表。getCueById 返回首个匹配提示。这些事件不是渲染像素接收凭据。[激活](https://github.com/whatwg/html/blob/de953a7cf0523f5873a1904ba2ce010c689dfb66/source#L41361-L41528)、[重置](https://github.com/whatwg/html/blob/de953a7cf0523f5873a1904ba2ce010c689dfb66/source#L43085-L43090)、[查找](https://github.com/whatwg/html/blob/de953a7cf0523f5873a1904ba2ce010c689dfb66/source#L43542-L43571)

**无障碍验收。**  仅涵盖对白的字幕，不同于涵盖有意义非语音音频的无障碍字幕。Xbox 指南还要求说话者／方向信息、在初始过场演出前可用、可发现的控制、可缩放文本，以及避免遮挡重要玩法／UI。仅有文件有效性，不能确立其中任何结果。[XAG 104](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/104)，滚动更新指南，核查日期为 2026-10-19

**拟议 GameMap 门禁与尚未执行的夹具。**  保留媒体／轨道哈希、语言、浏览器／构建、提示清单，以及项目自有的媒体时间到剪辑时间映射；不要将帧号解释为秒数。按播放纪元、轨道修订和提示 ID／序号标识观测。在跳转和轨道／语言替换后，从当前活动集合重建观测，而非从 enter 事件重放对话副作用。

使用提示 A=\[1,2) 和 B=\[1.5,2.5)。检查 1.75 秒时两者都活动，2 秒时仅 B 活动，3 秒时均不活动，然后向后跳转并重播。比较 hidden／showing／disabled；在加载期间替换轨道；提供空、格式错误和缺失资源。要求具备预期提示清单、在有界时间内完成加载／跳转、正确的活动集合，以及当前纪元稳定后采集的可见文本。在目标视口下检查重叠说话者、长文本／从右到左文本、放大字幕与控制。提示缺失／过期、超时、裁切或音频时序不匹配均阻止升级采用。确切感知容差、无障碍内容完整性和浏览器支持仍属于项目验收工作。
