# 引擎操作：完成、恢复与证据

识别引擎操作何时完成、应检查哪些产物，以及如何从失败中恢复。每项参考均链接至相关 API、命令或实现。

## 如何解读一项操作

记录精确的工具/引擎版本、执行模式、项目/世界身份、请求的操作、原生结果、输出产物及验收条件。区分请求被接受、操作完成、输出持久化与在新会话中重新打开。工具名称或进程成功启动不能证明玩法正确性。

### 执行与恢复

| 操作                | 来源支持的行为                                                                                                                                                                                             | 仍需进行的验收                                                                                                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unreal 测试续跑       | [`-ResumeRunTest`](https://dev.epicgames.com/documentation/en-us/unreal-engine/run-automation-tests-in-unreal-engine) 读取报告，恢复 NotRun 测试，并将被中断的进行中测试标为失败                                             | 保留续跑前的报告；核对每个选定测试；缺少报告意味着恢复证据不完整                                                                                                                                                     |
| Unreal 编辑器事务恢复    | [Recovery Hub](https://dev.epicgames.com/documentation/en-us/unreal-engine/recovery-hub-in-unreal-engine) 是用于关卡编辑和 Sequencer 的 Beta 插件；它补充自动保存功能                                                    | 验证恢复的编辑、保存并重新打开；不要将其保证套用于任意资源或游戏存档                                                                                                                                                   |
| Unreal 游戏存档/读取    | [Async SaveGame API](https://dev.epicgames.com/documentation/unreal-engine/saving-and-loading-your-game-in-unreal-engine?lang=en-US) 通过委托报告完成；由应用应用加载的自定义状态                                         | 模式验证与恢复后的世界比较；此处仍未知其原子性、断电行为和对同一槽位的并发写入行为                                                                                                                                            |
| Unity 测试执行/取消     | [TestRunnerApi 1.4.6](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html) 返回作业 GUID；取消可能需要多帧，将活动测试标为 Canceled，其余测试标为 NotRun | 重置编辑器前等待终态回调并保留预期测试数量；[1.4.6 结果指南](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/manual/extension-get-test-results.html)要求在域重载后重新注册回调，并指出监听器接收所有测试运行，因此必须显式关联观测到的运行 |
| Unity 重复运行        | [进入 Play 时禁用域重载](https://docs.unity3d.com/6000.0/Documentation/Manual/domain-reloading.html)会保留静态字段、静态事件订阅和非序列化字段值；脚本变更导致的资源刷新仍会触发域重载                                                               | 明确重置责任，检查处理器数量并保持夹具状态干净；若重置覆盖不完整，应使用新进程                                                                                                                                              |
| Godot 场景切换        | [SceneTree](https://docs.godotengine.org/en/stable/classes/class_scenetree.html) 在新场景加入并初始化后发出 scene_changed；重载会创建新的当前场景实例                                                                          | 断言应用已就绪，并单独重置场景外的状态                                                                                                                                                                  |
| Blender 模块执行      | [固定版本 bpy 指南](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/doc/python_api/rst/info_advanced_blender_as_bpy.rst)禁止模块重载，每个进程仅允许一个 blend 状态，并省略常规的取消/崩溃信号处理器       | 进程所有权、有界作业超时、显式保存/重新打开，以及外部崩溃证据                                                                                                                                                      |
| 社区 Godot MCP 进程控制 | [固定版本实现](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts#L1053-L1215) 在生成另一进程前向跟踪的进程发送 kill，但不等待前者退出；stop 也在未等待退出时返回；自然退出会清除用于检索日志的句柄           | 在失去访问权前归档输出；独立观测进程终止；不要假定支持多个并发项目                                                                                                                                                    |

### 世界、物理、AI 与身份

对于动力机构和铰接组件，请参阅[关节配置、单位与约束观测](debugging.md#joint-and-articulation-observation-contracts)。

| 操作      | 来源支持的行为                                                                                                                                                                                                                                                       | 仍需进行的验收                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 流送世界区域  | [World Partition](https://dev.epicgames.com/documentation/en-us/unreal-engine/world-partition-in-unreal-engine) 区分 Loaded 与 Activated 单元格                                                                                                                     | 验证必需 actor、碰撞和导航是否就绪；[UE-259478](https://issues.unrealengine.com/issue/UE-259478)记录了独立关卡实例过早报告完成的情况。目标修复版本 6.0 不等于已验证的已发布修复 |
| 预留交互    | [Smart Objects](https://dev.epicgames.com/documentation/en-us/unreal-engine/smart-objects-in-unreal-engine---overview) 提供认领/占用/清理及行为数据，而非行为执行                                                                                                                 | 实际到达、项目动作结果、中断清理和权威游戏状态事件                                                                                                   |
| 推进物理    | [Unity Physics.Simulate](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.Simulate.html) 不调用 FixedUpdate；固定小步长优于可变 delta time                                                                                                            | 声明玩法/物理 tick 的控制责任；不能据此推断跨平台逐位确定性                                                                                           |
| 编辑后查询碰撞 | [SyncTransforms](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.SyncTransforms.html) 刷新变换更改；[Raycast](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.Raycast.html)应用层/触发器过滤器，且会漏掉包含其起点的碰撞体                      | 未命中不能证明不存在穿透、可见性或导航可达性                                                                                                      |
| 请求或取消导航 | [SetDestination](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshAgent.SetDestination.html) 在计算完成前接受路径请求；[ResetPath](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshAgent.ResetPath.html)立即完成活动的 OffMeshLink | 区分已接受、已计算、可达和已到达状态；取消不是回滚，也不保证原地冻结                                                                                          |
| 解析创作对象  | [GlobalObjectId](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/GlobalObjectId.html) 仅用于创作，解析需要已保存且已加载的场景，移到另一场景时会改变                                                                                                                           | 项目/资源版本与迁移映射；绝不能将其视为玩家运行时标识符                                                                                                |
| 解析活动对象  | [GetInstanceID](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Object.GetInstanceID.html) 返回跨会话会变化的内存中 ID                                                                                                                                      | 配合会话身份并拒绝陈旧引用；ID 的正负号不能确立持久性                                                                                                |

### 动画、渲染与交换

| 操作            | 来源支持的行为                                                                                                                                                                                                                                             | 仍需进行的验收                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 运动匹配          | [Pose Search](https://dev.epicgames.com/documentation/en-us/unreal-engine/motion-matching-in-unreal-engine) 查询按模式索引的姿态/轨迹特征；采样与通道影响成本                                                                                                               | 足部接触、根运动、轨迹响应、数据库覆盖和目标性能                |
| 训练变形          | [ML Deformer](https://dev.epicgames.com/documentation/unreal-engine/ml-deformer-framework-in-unreal-engine?lang=en-US) 要求对齐的动画/缓存示例；文档将 Vertex Delta 定位为参考而非生产模型                                                                                    | 留出的姿态、匹配拓扑、内存和设备支持；编辑器训练不能证明存在无界面训练 API |
| 渲染 Niagara 缓存 | [缓存指南](https://dev.epicgames.com/documentation/unreal-engine/caching-and-reusing-your-system?lang=en-US) 区分点的子帧支持与网格的整帧数据                                                                                                                           | 粒子出生/消亡及快门采样测试；有效缓存仍可能产生时间伪影            |
| 观测 GPU 碰撞     | [Niagara GPU 碰撞](https://dev.epicgames.com/documentation/en-us/unreal-engine/gpu-raytracing-collisions-in-niagara-for-unreal-engine) 是异步的，有一帧延迟，且存在提供者特定的前提条件                                                                                       | 记录实际回退/提供者；测试屏幕外及被遮挡的碰撞，而不只是可见特效        |
| 比较坐标系         | [Unreal 坐标](https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)为左手系，Z 向上、X 向前；[默认距离单位](https://dev.epicgames.com/documentation/en-us/unreal-engine/units-of-measurement-in-unreal-engine)为厘米 | 明确源/目标基底及量纲单位；使用已知尺寸的非对称往返夹具            |
| 将世界点映射为像素     | [Unity 投影](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Camera.WorldToScreenPoint.html)使用左下角像素原点；[相机视图空间](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Camera-worldToCameraMatrix.html)朝负 Z 方向                    | 相机/眼、视口、裁切和缩放变换；投影位置不是遮挡证据              |
| 解读深度          | [Unity 图形后端约定](https://docs.unity3d.com/6000.0/Documentation/Manual/SL-PlatformDifferences.html)在纹理原点和深度方向上不同                                                                                                                                       | 线性化前记录后端、投影与深度表示；浮点图像并不自动意味着度量距离        |
| 传输骨架          | [Unity 绑定姿态](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Mesh-bindposes.html)是与骨骼索引对应的索引化基础姿态逆矩阵                                                                                                                                  | 保留索引、权重和网格根空间；导入后比较静止姿态及根变换后的变形         |
| 观测 Godot 帧阶段  | [SceneTree 信号](https://docs.godotengine.org/en/stable/classes/class_scenetree.html)在节点 process/physics 回调前触发                                                                                                                                        | 渲染后的图像需要独立渲染屏障与来源记录                     |

### 运行时动画观测关卡

对于 Unity 6000.0 和 Godot 4.4，分别观测姿态应用、播放完成、事件交付和 actor 移动。将这些检查与[姿态及压缩验证](../assets/validation.md#animation-sampling-and-compression)和[帧捕获所有权](../assets/visual-evidence.md#engine-frame-readback-and-capture-ownership)结合。

#### Unity：观测依赖可见性、更新阶段和移动控制者

- `AlwaysAnimate` 包括屏幕外动画。`CullUpdateTransforms` 在渲染器不可见时抑制重定向、IK 和 Transform 写入；`CullCompletely` 在渲染器不可见时完全抑制动画。因此，陈旧的屏幕外骨架本身不能确立片段或图存在错误。\[U1]
- `Normal` 在 Update 中更新，`Fixed` 在 FixedUpdate 中更新，`UnscaledTime` 忽略 Time.timeScale。记录模式及相关时钟，而非将相同渲染帧数当作相同的动画进度。\[U2]
- `OnAnimatorMove` 发生在状态机/动画求值之后、`OnAnimatorIK` 之前；没有依据将此回调视为最终的后 IK 姿态边界。\[U3]
- 当脚本实现 OnAnimatorMove 时，`applyRootMotion` 不起作用，而在运行时改变它会重新初始化 Animator。记录控制移动的脚本；不要将切换该属性视为无害的观测控制或已证实的重置/回滚操作。\[U4]

**编辑设计的夹具，尚未执行：** 固定片段/控制器/骨架，具有非零位移及 IK 目标；对每种剔除模式比较可见/屏幕外运行。分别记录动画时间、采样关节、后 IK 关节和 actor 变换。使用移动回调，并在每种更新模式下改变 timeScale 后重复。将根运动切换作为独立的重新初始化案例，而非插入名义上等价的样本之间。通过标准必须说明测试的阶段及移动控制者。

#### Godot：即时姿态、播放完成与副作用不同

`play()` 在下次处理机会应用动画；`advance(0)` 请求立即更新。`seek(seconds, update=true)` 更新姿态，同时跳过中间事件。其 `update_only=true` 抑制方法、音频和动画播放轨道。定位到结尾不会发出 `animation_finished`；文档中用于跳过同时发出完成信号的替代方式是 `advance()`。这些是不同操作，不是可互换的捷径。\[G1]

手动处理模式需要 `advance()`。`mixer_applied` 报告已将混合结果应用至目标对象；文档未将其定义为渲染/物理栅栏。延迟方法模式将调用批量推迟至事件处理之后，而即时模式在执行到相应位置时调用。循环动画不发出 `animation_finished`。已有效配置且类型为 POSITION_3D、ROTATION_3D 或 SCALE_3D 的根运动骨骼轨道，其变换会在视觉上抵消，因此原地骨架本身并不意味着移动失败。动画节点缓存可能漏掉已消失的节点；`clear_caches()` 强制刷新。\[G2]

**编辑设计的夹具，尚未执行：** 一个非循环片段，具有移动关节、方法标记和完成计数器；比较新实例的 `play` 加 `advance(0)`、两种更新标志下的 seek，以及定时手动推进。将目标姿态、标记数、完成数和回调模式记录为独立结果。添加循环变体，使用显式有界采样区间，而非等待完成。替换动画目标节点并单独测试缓存刷新。对于根运动，对照骨架视图比较提取的运动及使用它的控制器世界变换；明确指定唯一的移动控制者。

#### 验收边界与未知事项

拟议的证据记录：引擎补丁版本、片段/骨架/图身份、初始状态、求值时钟与步进序列、可见性/剔除模式、回调模式、观测阶段、关节姿态、actor 变换及事件日志。这是编辑设计的测试方案，而非已实现的测试框架。

所引契约不能确立通用的渲染帧屏障、应用特定延迟副作用的完成、物理/接触成功、模糊求值后的安全重试、回滚、跨重载持久化或跨平台数值确定性。项目脚本与精确补丁行为仍未经测试。不要根据求值调用、姿态信号、动画完成信号或截图推断这些保证。

#### 官方来源

- [U1：Unity 6000.0 AnimatorCullingMode](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AnimatorCullingMode.html)
- [U2：Unity 6000.0 AnimatorUpdateMode](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AnimatorUpdateMode.html)
- [U3：Unity 6000.0 OnAnimatorMove](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.OnAnimatorMove.html)
- [U4：Unity 6000.0 applyRootMotion](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Animator-applyRootMotion.html)
- [G1：Godot 4.4 AnimationPlayer、play 与 seek](https://docs.godotengine.org/en/4.4/classes/class_animationplayer.html)
- [G2：Godot 4.4 AnimationMixer、信号、回调模式、root_motion_track 与 clear_caches](https://docs.godotengine.org/en/4.4/classes/class_animationmixer.html)

## 原生 GUI 自动化是独立的证据界面

[Windows UI Automation](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-controlpatternsoverview) 依赖提供程序支持的控件模式。它不能确立 Unreal、Unity 或 Blender 会暴露每一个自定义控件或场景对象。[Invoke](https://learn.microsoft.com/en-us/windows/win32/api/uiautomationclient/nf-uiautomationclient-iuiautomationinvokepattern-invoke) 的设计意图是迅速返回，但提供程序的行为各异。调用成功或 [SendInput 的已插入事件数](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput)都不能证明应用操作完成。

将每个 GUI 动作绑定到当前的进程/窗口/控件观测；保留物理坐标和截图变换元数据；验证焦点及可点击性；遇到权限或完整性失败时停止。不要将成功消息截图用作资源持久化的唯一证据。文档中的 [Graphics Capture 选择器流程](https://learn.microsoft.com/en-us/windows/apps/develop/media-authoring-processing/screen-capture)包括用户同意，并暴露帧时间、尺寸及缓冲区生命周期。它捕获 UI 像素，而非引擎模拟检查点。

## 运行时区域语言切换：区分字符串交付、渲染与无障碍

**文档化操作。**  Unity Localization 1.5 文档在检查时标明包版本为 1.5.13，其中说明首次订阅 `LocalizedString.StringChanged` 会启动加载，并在完成后接收值；区域语言/引用变更和受支持的变量变更会触发更新。加载完成后新增的订阅者会收到最新加载值。[`StringChanged`](https://docs.unity3d.com/Packages/com.unity.localization@1.5/api/UnityEngine.Localization.LocalizedString.StringChanged.html)。

`RefreshString()` 返回是否能够请求刷新。在当前加载操作仍执行时发起的请求会被忽略并返回 false。因此，调用刷新不保证更新，其布尔值也不是渲染输出的证据。[`RefreshString`](https://docs.unity3d.com/Packages/com.unity.localization@1.5/api/UnityEngine.Localization.LocalizedString.RefreshString.html)。

**经源码检查的原生语义。**  Godot `4.5-stable` Button 通过翻译和塑形文本、更新最小尺寸，并单独排队无障碍更新及重绘，来处理翻译变更通知。其无障碍更新处理器在没有显式无障碍名称时选择翻译后的文本；两者不同时，则组合显式名称与翻译文本。文本/名称为空的按钮可以回退到工具提示文本。这是源码行为，不证明任何屏幕阅读器已收到或播报它。[所检查提交的 `button.cpp`，第 188–219 行](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/gui/button.cpp#L188-L219)。Godot 4.5 另行暴露无障碍名称、描述、关系及实时区域模式。[Control 参考](https://docs.godotengine.org/en/4.5/classes/class_control.html#class-control-property-accessibility-name)。

**拟议的验收契约，尚未实现/执行。**  记录引擎/包/构建、请求的区域语言、表/键、格式化输入、字体资源、控件身份及区域语言变更代次标识符。分别收集：接受/拒绝的刷新请求；已交付本地化值；绑定控件的值；布局后的渲染帧；原生无障碍名称/角色/状态，以及观测到的辅助技术行为。不要将这些合并为一次“区域语言已切换”成功。

**失败/恢复夹具。**  在字符串加载时切换区域语言，修改动态参数，然后再次切换区域语言。记录被忽略的刷新，并仅在相关操作稳定后应用有界的应用层重试；仅接受与预期最终区域语言及输入匹配的证据。包含膨胀或 RTL 标签、纯图标按钮，以及显式无障碍名称与翻译文本不同的按钮。独立检查裁切、塑形/回退、焦点连续性、语义命名和播报更新。即使截图通过，缺失的语义/辅助技术证据仍属未经验证。

**版本边界。**  Unity 的 `@1.5` URL 是版本系列文档路由，而非不可变的包固定版本。Godot `4.5-stable` 已解析至所检查提交 `876b290332ec6f2e6d173d08162a02aa7e6ca46d`；这固定的是源码，而非经测量的已安装构建。尚未确立跨平台屏幕阅读器覆盖、时序保证或渲染/无障碍同步保证。

## Godot 原生语义观测与动作完成

原生无障碍在像素和权威项目状态之外增加了语义观测/动作界面。下列经源码检查的契约补充上述区域语言/名称行为；它不代表存在已安装的观测器或辅助技术测试。

### 来源与版本范围

所检查的 Godot `4.5-stable` 标签解析至提交 `876b290332ec6f2e6d173d08162a02aa7e6ca46d`，已通过官方 GitHub ref API 验证。这是历史性的、版本特定的源码证据，而非对所有后续 Godot 版本的断言。其第三方清单标明  **accesskit-c 0.17.0** ，上游修订 `f69571eca23151be07a41bf493ca48a2b44b6a8b`，MIT。该清单标识的是随附头文件，而非已安装的动态库。[标签](https://api.github.com/repos/godotengine/godot/git/refs/tags/4.5-stable)、[清单](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/thirdparty/README.md#L8-L17)。

Godot 的发布公告将 4.5 集成称为实验性，并描述了不完整的编辑器支持。未检查目标版本前，不要将该发布时的声明转述为当前版本的限制。[官方公告](https://godotengine.org/releases/4.5/)。

### 激活状态是输入，而非空树判定

在 4.5 中，项目设置 `accessibility/general/accessibility_support` 具有 Auto=0、Always Active=1、Disabled=2。Auto 仅在辅助应用处于活动状态时处理信息更新。无障碍检查器不算在内；文档规定的检查器测试模式为 Always Active。更新速率设置默认为每秒 60 次。[4.5 ProjectSettings](https://docs.godotengine.org/en/4.5/classes/class_projectsettings.html#class-projectsettings-property-accessibility-general-accessibility-support)。

`DisplayServer.accessibility_screen_reader_active()` 在活动时返回 1，非活动时返回 0，未知时返回 −1。源码区分支持与启用：两者都要求显示能力且模式未禁用，而在 Auto 下，启用还要求结果恰好为 1。因此，不支持、禁用、非活动和未知必须保持为不同结果。[固定版本 API](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/doc/classes/DisplayServer.xml#L77-L83)、[门控](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/main/scene_tree.cpp#L205-L228)。

### 更新、焦点与动作完成

`queue_accessibility_update()` 不返回完成令牌；它仅将位于树内且在所编辑场景外的节点排队。文档将 `get_accessibility_element()` 定义为在 `NOTIFICATION_ACCESSIBILITY_UPDATE` 期间使用，而非通用快照查询。普通 Node 元素初始为带有节点名称/子节点的容器。退出/失效会释放 RID，因此它不是持久的项目对象标识符。[Node API](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/doc/classes/Node.xml#L323-L329)、[排队/元素创建](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/main/node.cpp#L3678-L3704)、[默认语义](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/main/node.cpp#L51-L80)、[退出](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/main/node.cpp#L178-L193)。

已变更节点队列是对象 ID 集合，因此刷新前重复排队的请求会合并。处理按窗口进行，跳过无效/不可见窗口节点，并根据窗口/控件焦点拥有者计算语义焦点，包括嵌入窗口和弹窗。刷新受启用状态门控，且除非强制执行，否则有速率限制。这些操作不是渲染或辅助播报栅栏。[更新/焦点/刷新实现](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/main/scene_tree.cpp#L230-L310)。

`FOCUS_ACCESSIBILITY` 的资格取决于无障碍启用状态和可见性。因此，与非活动的 Auto 相比，Always Active 检查器测试可能改变可获焦点的集合。源码还注册调用 `grab_focus()`/`release_focus()` 的焦点/失焦回调。[资格](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/gui/control.cpp#L2271-L2274)、[回调](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/gui/control.cpp#L3659-L3665)、[注册](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/gui/control.cpp#L3720-L3724)。

无障碍动作会声明其支持的动作，并注册一个接收动作相关 Variant 的回调。AccessKit 桥验证目标、转换请求数据，并使用 `call_deferred` 调用有效的已注册回调；收到请求不等于效果完成。语义设置器和动作注册受更新阶段门控。Button 的无障碍点击会改变切换状态/发出回调，然后单独排队语义更新和重绘。[动作 API](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/doc/classes/DisplayServer.xml#L127-L152)、[延迟桥接](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/drivers/accesskit/accessibility_driver_accesskit.cpp#L109-L197)、[注册门控](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/drivers/accesskit/accessibility_driver_accesskit.cpp#L938-L964)、[Button 效果](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/gui/base_button.cpp#L87-L118)。

**对适配器的含义：** 独立记录动作交付、回调执行、项目权威效果、刷新后的原生语义观测、渲染帧及实际辅助行为。不要仅因语音或树刷新迟到，就重试可能非幂等的动作。

### 自定义玩法与平台限制

**对适配器的含义：** 自绘控件/玩法需要项目创作的语义映射，匹配预期角色、描述、状态/值及动作；默认名称/层级并非对像素、碰撞、任务完成或空间可玩性的自动解释。底层 4.5 DisplayServer API 支持这种语义创作，包括子元素；它不提供外部场景状态判定器。[固定版本 DisplayServer API](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/doc/classes/DisplayServer.xml)。

文档中 4.5 的屏幕阅读器能力涵盖 Windows、macOS 和 Linux X11/Wayland。验证实际构建的能力：Windows 源码以存在活动无障碍驱动为条件，初始化失败会清除该驱动。不要根据引擎的导出列表推断移动端/Web 交付。[4.5 能力](https://docs.godotengine.org/en/4.5/classes/class_displayserver.html#class-displayserver-constant-feature-accessibility-screen-reader)、[Windows 能力](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/platform/windows/display_server_windows.cpp#L157-L165)、[驱动初始化](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/platform/windows/display_server_windows.cpp#L6806-L6817)。

固定版本的 `DisplayServerHeadless::has_feature()` 总是返回 false。结合 `SceneTree::is_accessibility_enabled()` 中的初始能力检查及其刷新守卫，即使在 Always Active 下，正常的 SceneTree→原生驱动更新路径也会被关闭。这不排除合成/自定义单元测试树；此类测试仍不能证明原生 OS 交付或辅助可用性。[无界面](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/servers/display_server_headless.h#L68-L70)、[启用/刷新门控](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/main/scene_tree.cpp#L205-L310)。

### 拟议的验收夹具：明确尚未实现且尚未执行

使用可丢弃的项目自有界面，其中包含切换动作、由可独立观测状态支撑的自绘状态指示器、仅用于无障碍的焦点目标及弹窗。执行前冻结预期语义契约和动作效果。

- 记录精确引擎/模板和 AccessKit 构建、OS/显示驱动、模式/覆盖、配置的更新速率、原生观测器与辅助技术版本、进程/窗口身份、场景代次、临时元素映射及请求时间戳
- 比较辅助技术缺席/存在时的 Auto 与 Always Active 检查器观测；分别保留非活动/未知/不支持。仅将无界面用作负面能力案例
- 在刷新前反复改变自定义状态，测试最终代次的语义，不要求每个合并请求都有事件。刻意在改变像素/状态时遗漏其语义更新；收集器必须检测到陈旧语义
- 调用已声明的动作，分别观测回调、权威状态、原生树和像素。测试弹窗焦点、隐藏/显示、移除/重建，以拒绝陈旧元素身份。任何重试前都要重新检查
- 验收要求每个声称已验证的界面在声明的观测超时内匹配预期状态/代次。超时是证据不完整，不是动作自动失败，也不是允许重复的许可。实际屏幕阅读器交互和残障玩家审查仍然独立；尚未确立任何自动化无障碍或法律认证

必要但目前尚未实现的组件包括项目驱动器、原生语义观测器、动作/效果关联，以及平台特定辅助审查。本提案既不声称这些收集器已存在，也不替代现有视觉与权威状态检查。

## 一个有用的集成夹具

**建议检查：** 使用可丢弃的门场景，串联对象识别、资源编辑、流送/物理就绪、实际交互、时序捕获、保存与全新重开。包含中断动作和陈旧引用案例。运行前声明预期世界状态转移及图像/几何容差。如果缺少项目特定交互 API 或事件观测器，应报告该缺口，而非用通用编辑器分发替代。

其余未知事项包括平台特定渲染器行为、已安装插件兼容性、完整重置责任、中断下的存档持久性，以及项目特定任务/奖励事务。上述来源检查均不提供这些运行时结果。

## 其他已检查的接口参考

这些参考保留了有用的操作上下文；它们不是此次更新中单独的目录卡片。已检查来源；未进行完整复现。

### Bevy · Remote Protocol

通过嵌入 Bevy 应用的 JSON-RPC 接口暴露 ECS 检查与修改。RemotePlugin 安装协议操作，但不启动传输；RemoteHttpPlugin 添加 HTTP 通信。查询依赖已注册且可反射的类型，非严格读取可能包含各组件的错误。来源链接固定的是所审查文件，而非执行过的构建。网络访问和修改权限需要明确的应用策略。[一手来源](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/crates/bevy_remote/src/lib.rs)。[所检查提交的无窗口渲染器示例](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/examples/app/headless_renderer.rs)。

### Houdini Engine · PDG API

控制程序化任务图的计算，并检索工作项事件、状态及输出路径。HAPI 支持异步完整计算、轮询、暂停和取消；即使 blocking 参数为零，仅生成模式也始终阻塞。缓存成功不同于新执行的工作，而新一轮计算可能丢弃未收集的事件。保留调度器路径，并在下一轮计算前收集完事件。取消后必须检查终态。Houdini 许可与宿主配置仍是部署要求。[一手来源](https://www.sidefx.com/docs/hengine/_h_a_p_i__p_d_g.html)。[PDG 函数参考](https://www.sidefx.com/docs/hengine/group___p_d_g.html)。[命令行 Python 与许可生命周期](https://www.sidefx.com/docs/houdini/hom/commandline)。

### O3DE · 编辑器自动化

通过 Python 绑定与外部编辑器测试编排暴露编辑器功能。PythonEditorBindings gem 通过 EBus 暴露编辑器 C++ 功能，需要配置项目并重新构建编辑器。外部 pytest 和 LyTestTools 可启动编辑器，由嵌入脚本驱动它。保留外部日志与编辑器日志。这些接口不能确立运行时 Python 支持，也不能确立无图形执行配置。[一手来源](https://www.docs.o3de.org/docs/user-guide/editor/editor-automation/)。[并行编辑器测试模式](https://docs.o3de.org/docs/user-guide/testing/parallel-pattern/)。

### Maya · 独立 Python 与文件操作

在交互会话外初始化 Maya，用于脚本化场景处理。独立初始化向 Python 脚本提供 Maya 库；文件命令处理打开、保存、引用及导入/导出。初始化与清理取决于会话，因此在 Maya 内运行的代码不能盲目重复独立初始化。保留原生引用、插件依赖及保存/重开证据；批处理进程不能证明目标引擎兼容性。[一手来源](https://help.autodesk.com/cloudhelp/2022/CHS/Maya-SDK/Maya-Python-API/PythonOutsideMayaSession.html)。[Maya 2026 file 命令](https://help.autodesk.com/cloudhelp/2026/ENU/Maya-Tech-Docs/CommandsPython/file.html)。

### Substance 3D Painter · 远程控制

通过远程控制接口将外部进程接入 Painter 脚本系统。适用于从管线工具驱动已运行的创作应用。远程接口不同于无界面纹理烘焙，本身不能确立完整的材质导出契约。应核定应用版本、项目状态、导出预设、目标文件，以及下游纹理/颜色解读。[一手来源](https://experienceleague.adobe.com/en/docs/substance-3d-dev/painter-python/tutorials/remote-control)。

## 程序化世界编辑后的导航

参考：RecastNavigation 提交 `9f4ce64458dfae86e1239c525ddc219c4e9e06f1`。下述查询语义涉及上游 Detour；应检查引擎绑定如何暴露这些语义。

### Detour 查询与重建链

**1. 解析端点与预算。** API 文档指出，在没有匹配项时，`findNearestPoly` 可能留下 `nearestRef = 0`，且输出点保持不变；实现完成该搜索后仍返回成功。要求端点引用非零，并记录搜索范围、吸附位置、代理/构建参数及过滤器。区分搜索节点预算、多边形走廊容量和直线路径点容量；`init` 文档规定节点最多为 65,535 个。\[S3–S4]

**2. 分类走廊结果。** `findPath` 返回有序多边形引用。文档规定缓冲区不足时返回从起点开始的前缀；目标不可达时返回最佳可用走廊。静态实现可能将 `DT_SUCCESS` 与 `DT_PARTIAL_RESULT`、`DT_OUT_OF_NODES` 和/或 `DT_BUFFER_TOO_SMALL` 组合。成功辅助函数仅检查其高层位。保留完整状态、数量、容量及最后的多边形。若搜索本身已到达目标，因容量截断的走廊未必带有 PARTIAL_RESULT。增大输出缓冲区并不会扩大搜索节点池。\[S5–S6]

**3. 管理分片查询状态。** 文档规定的顺序是初始化、在迭代预算内更新至终态，然后完成收尾。过滤器指针必须在查询期间始终有效；源码文档警告，在此期间执行非分片调用可能破坏其状态。静态检查显示，更新可能在耗尽搜索前沿后报告成功；收尾会添加部分结果细节并重置查询状态。`finalizeSlicedFindPathPartial` 有意恢复现有走廊中已访问的部分，在找到此类多边形时可能没有 PARTIAL_RESULT。因此，无论标志如何，都要比较返回端点与请求目标。拟议的适配器关卡：隔离查询状态所有权，并在相关导航变化后使其失效/重启；尚未确立快照一致性、取消回滚和并发修改安全性。\[S3, S7]

**4. 提取拐点时不要升级可达性判定。** `findStraightPath` 将端点限制到所提供的首/末多边形。其 END 标志和为零的端点多边形引用标识的是该走廊端点，而非已到达原始目标。无效的中间通道可能产生成功加部分输出。在此固定版本，填满直线路径点容量可能即使已发出 END 仍设置 BUFFER_TOO_SMALL：应保守处理容量饱和，必要时留出余量重试。将离网格通行执行保留为独立游戏动作。\[S8]

**5. 障碍物编辑后重新验证。** 文档规定，移除瓦片会使瓦片/多边形引用失效，而改变多边形标志/区域则保持引用不变。只有满足文档中原始参数/引用条件时，才可能恢复原引用。瓦片缓存重建实现会移除/替换瓦片，却不请求旧引用；因此缓存走廊需要时效性及通行检查。\[S9, S13]

添加/移除障碍物会将工作入队。文档规定的完成观测界面是重复调用 `update(..., &upToDate)`；静态检查显示每次调用最多重建一个排队瓦片。在上述精确提交中，即使重建失败，它也会移除待处理工作并推进障碍物记账；upToDate 仅检查队列为空。这是静态源码观察，而非复现过的引擎缺陷。保留每次更新状态：后续成功清空队列不能抹除先前失败。硬编码容量为每个障碍物八个受影响瓦片，以及 64 个请求/更新条目，并非保证有效覆盖；有界瓦片收集可能静默截断。拟议的关卡：验证覆盖范围/突发量边界，保留重建失败，并在队列清空后重新查询受影响路线。\[S10–S12]

### 证据与可用性边界

记录固定版本、导航网格代次、过滤器、输入/吸附端点、容量、全部状态、返回的走廊/拐点，以及障碍物更新历史。拟议的验收要求预期端点，以及最新的游戏层碰撞、移动、离网格动作和到达证据。有效导航网格路径本身绝不能确立无碰撞的游戏到达。

Recast/Detour 是以 zlib 许可提供的 C++ 库；DetourCrowd 是独立的移动/避障模块。保留适用的许可声明与修改归属。可获取不代表存在已安装的 GameMap 适配器、MCP 服务器或测试过的引擎集成。持久化、崩溃恢复和全游戏重置仍未经验证。\[S1–S2]

### 面向引擎的更新与到达边界

Unity 6000.0 与 Godot 4.5 使用不同的导航栈和操作生命周期。引用的两个 Godot 类均标记为 Experimental。

| 操作          | 文档化契约                                                                                                                                                                                                                                                         | 拟议的验收边界                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Unity 增量烘焙  | `UpdateNavMeshDataAsync` 对输入几何及设置计算哈希。提供 **所有** 输入源，包括未变化的几何；保留未变化源的相对顺序，避免不必要的重建。缺失/新增源均算作变化。边界相对于 NavMeshData 的位置/旋转；返回值为 AsyncOperation。[API](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshBuilder.UpdateNavMeshDataAsync.html) | 保留完整源清单、设置及边界。将更新观测与更新后的路线检查分开。所引页面未确立回滚、序列化持久化或重叠更新安全性。                       |
| Unity 路径判定  | `NavMesh.CalculatePath` 对 **完整或部分** 路径均返回 true；它是同步调用，长查询可能影响帧率。[API](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMesh.CalculatePath.html)                                                                                            | 记录路径状态与终端端点，而不只是布尔值。已声明的目标必须满足自身端点/到达容差。                                       |
| Unity 端点投影  | `SamplePosition` 在不检查世界障碍物的情况下查找附近 NavMesh 点；两层楼示例可能穿过天花板选中另一层。[API](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMesh.SamplePosition.html)                                                                                            | 保留请求位置和投影位置、垂直位移及预期楼层/区域；距离近不是连通性或视线证据。                                        |
| Godot 地图同步  | NavigationServer3D 更改通常在下一物理帧后生效。地图迭代为零表示从未同步；ID 在同步变更时递增，最终回绕。在  **4.5**  中，`map_force_update` 已弃用，不支持异步更新；单线程使用风险由调用方承担。避障忽略区域，可能将代理移出可通行空间。[4.5 API](https://docs.godotengine.org/en/4.5/classes/class_navigationserver3d.html)                            | 将所编辑地图/区域及导航迭代关联到查询的世界版本；仅非零不能证明已包含最新编辑。不要将旧版强制更新做法照搬到异步工作流。独立于避障速度保留碰撞/控制器检查。 |
| Godot 到达与停止 | `navigation_finished` / `is_navigation_finished` 可能表示到达 **不可达** 目标的最后一个路点。搜索限制可能产生朝向迄今找到的最近多边形的路线。`is_target_reachable` 使用 target_desired_distance 比较最终路径位置与目标。[4.5 Agent API](https://docs.godotengine.org/en/4.5/classes/class_navigationagent3d.html)      | 区分已停止、路径已耗尽、目标可达及目标已到达；保留搜索限制与实测端点误差。单独的完成信号不能批准生成的门口/任务路线。                    |

**夹具模板：** 保留一条可达路线，以及刻意设置的不连通孤岛、错误楼层、窄门和动态阻挡变体。编辑后，独立验证更新就绪、端点投影、完整查询状态及实际角色通行。包含取消/重建中断和冷启动重开案例；在固定版本项目中实际测试前，其恢复与持久化行为仍未知。将截图关联到几何版本、导航网格身份、查询过滤器、代理尺寸、路径端点及控制器事件。仅渲染上的连续性不能确立可通行性。

### 固定版本的 Detour 来源

- **S1**  — [README.md，第 12–30 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/README.md#L12-L30) · 官方文档
- **S2**  — [License.txt，第 1–18 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/License.txt#L1-L18) · 许可文本
- **S3**  — [Detour/Include/DetourNavMeshQuery.h，第 171–256 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Include/DetourNavMeshQuery.h#L171-L256) · API 文档
- **S4**  — [Detour/Include/DetourNavMeshQuery.h，第 315–340 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Include/DetourNavMeshQuery.h#L315-L340) · API 文档；[最近多边形实现，第 702–729 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Source/DetourNavMeshQuery.cpp#L702-L729)
- **S5**  — [Detour/Include/DetourStatus.h，第 22–66 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Include/DetourStatus.h#L22-L66) · API 文档及静态源码
- **S6**  — [Detour/Source/DetourNavMeshQuery.cpp，第 962–1205 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Source/DetourNavMeshQuery.cpp#L962-L1205) · 文档化行为及静态实现
- **S7**  — [Detour/Source/DetourNavMeshQuery.cpp，第 1208–1685 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Source/DetourNavMeshQuery.cpp#L1208-L1685) · 文档化行为及静态实现
- **S8**  — [Detour/Source/DetourNavMeshQuery.cpp，第 1689–2022 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Source/DetourNavMeshQuery.cpp#L1689-L2022) · 文档化行为及静态实现
- **S9**  — [Detour/Include/DetourNavMesh.h，第 693–720 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/Detour/Include/DetourNavMesh.h#L693-L720) · API 文档
- **S10**  — [DetourTileCache/Include/DetourTileCache.h，第 136–160 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Include/DetourTileCache.h#L136-L160) · API 文档
- **S11**  — [DetourTileCache/Source/DetourTileCache.cpp，第 359–637 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Source/DetourTileCache.cpp#L359-L637) · 静态实现推断
- **S12**  — [DetourTileCache/Include/DetourTileCache.h，第 62–80 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Include/DetourTileCache.h#L62-L80)及[队列容量，第 244–250 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Include/DetourTileCache.h#L244-L250)；有界收集位于[源码第 482–580 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Source/DetourTileCache.cpp#L482-L580) · 静态实现推断
- **S13**  — [DetourTileCache/Source/DetourTileCache.cpp，第 727–779 行](https://github.com/recastnavigation/recastnavigation/blob/9f4ce64458dfae86e1239c525ddc219c4e9e06f1/DetourTileCache/Source/DetourTileCache.cpp#L727-L779) · 静态实现推断
