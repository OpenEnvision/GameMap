# 生产工单：产物、恢复与验收

使用这些工单模板，衔接资源创建、导入、构建、测试和交付。每个模板定义了实施时的输入、预期产物、完成检查、失败处理及需要收集的证据。

## 通用执行契约

**设计验收：** [《Tears of the Kingdom》的建造示能](studio-case-studies.md#tears-of-the-kingdom-make-construction-rules-readable-without-prescribing-one-solution)关联可识别的部件、可见的交互例外及多种可行解法。[F.E.A.R. 行为创作](studio-case-studies.md#fear-inspect-the-information-and-constraints-behind-a-characters-plan)、[Left 4 Dead 节奏控制](studio-case-studies.md#left-4-dead-expose-pacing-state-without-treating-it-as-measured-player-emotion)和 [Valve 游戏测试证据](studio-case-studies.md#valve-playtesting-select-evidence-for-the-experience-question-being-asked)区分有效计划、策略轨迹与实际发生的玩法及人类体验。使用它们为行为、节奏和玩家理解定义独立检查。

每份工单都需要隔离工作区、预期目标平台、不可变输入清单、源工具与消费工具版本、选定操作/选项、原生诊断、输出哈希及明确的验收策略。将文档版本与已安装版本分别记录。

区分这些状态：请求已接受；原生操作已终止；预期产物存在；产物已验证；项目已保存；全新进程已重新打开；目标运行时验收完成。分别记录 **已接受、质量失败、不受支持、基础设施失败、超时、已取消或无法定论** 。超时不等于取消，重试未必幂等，已有文件也可能属于较早运行。除非具体来源确立了取消和断电持久性，否则它们仍属未知。

下列验收与恢复策略是编辑建议。不要仅为让检查通过而修复源资源、更换基线、归一化音频、改变系统网络设置、上传软件包或发布构建。保留源输入及失败产物。工具许可、字体、媒体权利、SDK 访问和部署权限需要独立检查；本文档不授予其中任何权利。

## 1. 导出创作资源、导入并审计依赖

**相关契约：** [可移植资源验证](../assets/validation.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity)与[合成验证](../assets/validation.md#2-preserve-usd-composition-and-resolve-managed-assets-deliberately)；[原生导入/保存边界](native-operations.md#unreal-authoring-import-and-persistence)；[Infinigen 程序化导出与恢复](tools.md#infinigen-staged-generation-and-export-acceptance)。

**结果：** 具名资源经过传输和全新重开后，仍保有预期缩放、朝向、引用及目标身份。

**文档化接口。** [Maya 2026 文件操作](https://help.autodesk.com/cloudhelp/2026/ENU/Maya-Tech-Docs/CommandsPython/file.html)暴露场景打开/保存、引用及导入/导出。[独立初始化](https://help.autodesk.com/cloudhelp/2022/CHS/Maya-SDK/Maya-Python-API/PythonOutsideMayaSession.html)对会话敏感；2022 指南并非对已安装版本的断言。[Unity GetDependencies](https://docs.unity3d.com/ScriptReference/AssetDatabase.GetDependencies.html)，检查版本为 Unity 6000.6，返回资源引用；递归结果包含根，而被引用资源未必是构建所需资源。[Unreal AssetRegistry 5.6](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/AssetRegistry?application_version=5.6) 的依赖查询覆盖磁盘上的引用。在引擎完全初始化前等待，可能使未加载插件的资源未被收集；`is_loading_assets` 描述的是初始搜索，而非所有收集操作。

**拟议流程。** 冻结创作场景、引用、插件及导出选项 → 将候选导出写入新目标位置 → 导入可丢弃的目标项目 → 等待选定导入器及依赖扫描 → 检查资源与引用图 → 保存 → 在全新消费进程中重新打开。[Unreal 坐标系](https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)及[默认单位](https://dev.epicgames.com/documentation/en-us/unreal-engine/units-of-measurement-in-unreal-engine)仅适用于该目标：左手系、Z 向上、X 向前及默认厘米并不定义源资源单位。

**完成与证据。** 要求一个已知尺寸的非对称对象及预期引用哨兵。保留源/导出/导入哈希、对象映射、直接与传递边、磁盘与未保存编辑器状态范围，以及重开观测。依赖枚举既不授权删除声称未使用的资源，也不能证明打包后的可达性。

**失败与恢复。** 缺失插件、未知根、不完整扫描、单位基底改变或陈旧输出均阻止晋级。经授权保存后，Unreal 可重新扫描指定的已修改文件名；针对新的磁盘快照重新运行。不假定重新导入具有幂等性：重试前核对新创建对象。导出器原子性与任意导入回滚尚未验证。

**尚未实现的夹具：** 移动一张被引用纹理，保留一处未保存的场景编辑，中断导入，并比较原始清单与全新进程清单。项目特定的导入器完成观测器及保存/重开驱动仍需实现。

对于 USD 软件包，[依赖发现与包成员边界](../assets/validation.md#openusd-packaging-dependency-discovery-is-not-portable-closure)要求在宣告可移植闭包前增加所选版本检查；仅凭发现或打包布尔值并不足够。

### 版本化资源发布与消费场景所有权

对于 Blender → AYON → Unreal Editor 交接，跟踪已发布表示、其文件及消费它的 actor。

#### 证据与前提条件

独立固定的开发快照：[AYON Blender addon 1.1.11+dev](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/package.py)，位于 `1bae7f10b014761039e1412a89c03fc7a7cc0c2d`；[AYON Unreal addon 0.4.0+dev](https://github.com/ynput/ayon-unreal/blob/43b4a800a52289dd0bae19b1345889a835766bb7/package.py)，位于 `43b4a800a52289dd0bae19b1345889a835766bb7`；[AYON Core addon 1.10.1+dev](https://github.com/ynput/ayon-core/blob/136b43c6ba4b6e01cb0b97e0b31fb4df92e46409/package.py)，位于 `136b43c6ba4b6e01cb0b97e0b31fb4df92e46409`。它们不是已安装或已证明兼容的组合包。Blender addon 声明 Core ≥1.9.9；Unreal addon 要求 ≥1.8.0；此 Core 快照要求 AYON Server ≥1.14.0,<2.0.0 和 Launcher ≥1.5.4。这些声明不能确立兼容的 Blender/Unreal 可执行版本。

[Unreal 设置指南](https://help.ayon.app/articles/1738168-setup-unreal-addon)要求 Unreal 集成插件与 Qt 绑定；它描述了源码/已编译插件路径，以及不存在可用插件时的自动构建。[美术人员指南](https://help.ayon.app/articles/2228078-working-with-unreal-in-ayon)通过 AYON 启动 Unreal。运行时前提包括已配置的服务器/项目访问、选定 addon 组合包、存储根及可读的已发布文件。[AYON 权限](https://help.ayon.app/articles/2635883-user-permissions-and-project-access-groups)不授予文件系统权限。

所检查的 [Blender](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/LICENSE)、[Unreal](https://github.com/ynput/ayon-unreal/blob/43b4a800a52289dd0bae19b1345889a835766bb7/LICENSE) 和 [Core](https://github.com/ynput/ayon-core/blob/136b43c6ba4b6e01cb0b97e0b31fb4df92e46409/LICENSE) 仓库采用 Apache-2.0 许可。[当前许可指南](https://help.ayon.app/articles/6592804-ayon-licenses)另行将服务器标识为 Functional Source License，并将部分功能/addon 标为需许可。这不许可源资源、不授予引擎访问权，也不确立服务使用资格。

#### 创作场景 → 验证 → 候选 FBX

[CreateModel](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/client/ayon_blender/plugins/create/create_model.py) 创建模型发布组，并可将选定对象设为其子对象。[ValidateObjectIsInObjectMode](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/client/ayon_blender/plugins/publish/validate_object_mode.py) 拒绝不处于 Object Mode 的纳入对象；可选的 [ValidateMeshHasUvs](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/client/ayon_blender/plugins/publish/validate_mesh_has_uv.py) 检查 UV 图层是否存在，而非 UV 质量。[文档化恢复流程](https://help.ayon.app/en/help/articles/2501380-working-with-blender-in-ayon)选择无效对象、修改场景、重置 Publisher 并重新验证。

[设置](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/server/settings/publish_plugins.py#L367-L425)启用可选 UV 检查，但默认禁用 ExtractFBX。因此，模型发布不会自动包含 FBX。[SaveCurrentSceneBlender](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/client/ayon_blender/plugins/publish/save_scene.py) 在提取前保存当前工作文件，并拒绝自收集后发生的文件名改变。

启用后，[ExtractFBX](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/client/ayon_blender/plugins/publish/extract_fbx.py) 将选定实例对象导出至暂存文件，并注册带文件名、扩展名及暂存目录的 `fbx` 表示。它临时创建缺失材质，然后在导出后移除；该清理没有外层 `finally` 保护。因此导出异常后应先检查源场景状态再重试。[ExtractBlend](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/client/ayon_blender/plugins/publish/extract_blend.py#L90-L119) 文档化的纹理打包不能确立 FBX 具有等效的依赖打包。

#### 候选 → 版本化发布

[Core 集成](https://github.com/ynput/ayon-core/blob/136b43c6ba4b6e01cb0b97e0b31fb4df92e46409/client/ayon_core/plugins/publish/integrate.py#L238-L367)准备产品/版本实体，在传输文件前提交它们，然后在传输后完成表示记录。因此，数据库版本本身不能确立产物可用且完整。

其[错误处理](https://github.com/ynput/ayon-core/blob/136b43c6ba4b6e01cb0b97e0b31fb4df92e46409/client/ayon_core/plugins/publish/integrate.py#L162-L182)尝试文件回滚，并明确将数据库回滚留作未解决事项。[FileTransaction](https://github.com/ynput/ayon-core/blob/136b43c6ba4b6e01cb0b97e0b31fb4df92e46409/client/ayon_core/lib/file_transaction.py#L52-L78) 备份已有目标、复制文件，然后移除备份；它警告普通文件系统不具有事务性，且创建的目录会保留。回滚本身也可能失败。由此不能推导出分布式原子性、崩溃持久性或取消保证。

[ValidateVersion](https://github.com/ynput/ayon-core/blob/136b43c6ba4b6e01cb0b97e0b31fb4df92e46409/client/ayon_core/plugins/publish/validate_version.py) 激活时拒绝不高于已收集最新版本的版本，但没有匹配宿主配置时会禁用自身。保留生效设置；不要将版本化发布普遍称为不可变或重试幂等。[Project Anatomy](https://help.ayon.app/articles/3815114-project-anatomy) 分离版本目录，并警告不要使用破坏共享资源路径的表示专用子目录。

#### 发布 → Unreal 资源 → 场景更新

[StaticMeshFBXLoader](https://github.com/ynput/ayon-unreal/blob/43b4a800a52289dd0bae19b1345889a835766bb7/client/ayon_unreal/plugins/load/load_staticmesh_fbx.py#L16-L94) 接受 model/staticMesh FBX 表示。其活动导入路径使用 Interchange，然后创建 AYON 容器。独立的 `get_task` 辅助函数未在此调用：其中的网格合并/Nanite 设置不是实际生效的 Interchange 选项证据。

[加载/更新](https://github.com/ynput/ayon-unreal/blob/43b4a800a52289dd0bae19b1345889a835766bb7/client/ayon_unreal/plugins/load/load_staticmesh_fbx.py#L145-L251)解析表示路径、选择唯一目标位置或复用布局资源目录、写入表示/版本 ID，并保存枚举出的资源。该辅助函数不检查导入返回值。容器存在和已请求保存属于中间证据，而非几何成功导入或全新重开的证明。

静态网格更新方法没有重新指向已放置 actor 的逻辑。独立的 [LayoutLoader 更新](https://github.com/ynput/ayon-unreal/blob/43b4a800a52289dd0bae19b1345889a835766bb7/client/ayon_unreal/plugins/load/load_layout.py#L369-L447)在请求加载布局关卡后，对每个枚举出的 actor 调用 `destroy_actor`，然后重建并请求保存；未检查加载/删除/保存结果。这一所有权边界对手工添加的内容很重要。

组合使用仍未确立：此 [Blender 布局提取器](https://github.com/ynput/ayon-blender/blob/1bae7f10b014761039e1412a89c03fc7a7cc0c2d/client/ayon_blender/plugins/publish/extract_layout.py#L200-L271)写入 `reference/reference_fbx/reference_abc`；此 [Unreal 布局读取器](https://github.com/ynput/ayon-unreal/blob/43b4a800a52289dd0bae19b1345889a835766bb7/client/ayon_unreal/plugins/load/load_layout.py#L142-L174)选择 `representation` 和 `version`，否则跳过元素。[继承的预处理](https://github.com/ynput/ayon-unreal/blob/43b4a800a52289dd0bae19b1345889a835766bb7/client/ayon_unreal/api/plugin.py#L376-L385)也要求 `representation`，因此并未确立从这些 Blender 字段进行转换的路径。这是独立检查的快照之间的不匹配，不证明官方支持的组合包存在故障。Blender 美术人员指南将 Layout 称为旧版并推荐 blendScene；这不能确立 Unreal 的 blendScene 替代路径。

#### 拟议的验收与恢复

**建议检查：** 冻结生效组合包、宿主构建、发布设置、源工作文件及依赖。发布一个非对称道具；将产品/版本/表示 ID 与实际文件及独立哈希核对。加载到可丢弃的 Unreal 项目中；验证几何、材质依赖及容器身份。发布一个已变更版本，更新，然后独立检查已放置 actor 的引用及全新进程重开结果。

失败后保留暂存文件与诊断；重试前核对服务器记录、目标/备份及创作场景变更。空导入、新容器或绿色的发布器报告都不能替代这些证据。布局替换需要独立的所有权与模式检查；保留先前的消费工作文件。端到端回滚、actor 保留及兼容组合包行为仍未经验证。

## 2. 传输绑定并测试动画行为

**相关契约：** [动画采样与压缩](../assets/validation.md#animation-sampling-and-compression)，包括关节身份、部分输出及最终解码运动。关于引擎侧剔除、求值阶段、事件和移动所有权，请参阅[运行时动画观测关卡](engine-operations.md#runtime-animation-observation-gates)。

对于所选 Godot 4.4 源码路径，[归一化关键帧与目标缩放验收](../assets/validation.md#godot-retargeting-normalized-keys-are-not-controller-travel)区分导入的关键帧、接收骨架样本、提取的增量及控制器移动；一般播放与移动所有权检查复用运行时观测关卡。

**结果：** 蒙皮角色保留其静止姿态及预期运动，包括根变换与接触。

**文档化接口。** [Unity 6000.0 绑定姿态](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Mesh-bindposes.html)按索引对应骨骼，在所示网格/根设置中使用基础姿态逆变换。[Unreal Motion Matching](https://dev.epicgames.com/documentation/en-us/unreal-engine/motion-matching-in-unreal-engine)使用配置的特征搜索 Pose Search 数据库。[Ubisoft 于 2020 年 7 月 30 日发布的 Learned Motion Matching 说明](https://www.ubisoft.com/en-us/studio/laforge/news/6xXL85Q3bF2vEj76xmnmIu/introducing-learned-motion-matching)解释了所提供运动如何限制行为覆盖：独立的行走与喝水示例不会自动提供边走边喝的运动。脚部锁定、IK 和混合仍是集成事项。这份历史说明不是公开 SDK 契约。

**拟议流程。** 记录层级、绑定矩阵、骨骼索引、权重、坐标基底及片段采样率 → 传输候选网格与片段 → 在单位根变换和非单位根变换下检查静止姿态 → 采样指定片段与过渡 → 记录接触、根轨迹及行为覆盖 → 保存并重新打开 → 重复相同采样。

**完成与证据。** 文件导入及已填充的动画数据库只是中间结果。验收要求项目声明关节位置、根位移、接触滑动及过渡不连续性的容差。在视频之外保留源片段时序、引擎采样时间、重定向设置及独立于相机的几何观测。视觉相似的一帧不能确立权重或时间行为匹配。

**失败与恢复。** 骨骼置换、缺失片段、变换不匹配或不受支持行为均阻止晋级。修正映射或源导出，然后创建新候选并重新运行；不要自动重标未匹配骨骼，也不要将失败的重定向视为部分成功。保留已验收的源绑定。原生回滚、确定性的跨平台采样及取消行为未经验证。

**尚未实现的夹具：** 小型非对称骨架，带一个加权关节、平移后的根、脚部固定区间及刻意缺失的行为组合。需要绑定检查适配器及权威接触/轨迹评估器；不提供自动的艺术质量判断。

## 3. 导出纹理而不丢失通道或颜色含义

**相关契约：** [材质、颜色与纹理契约](../assets/validation.md#3-keep-material-graphs-color-processing-and-texture-compression-separate)；[KTX 策略、打包与目标检查](../assets/validation.md#ktx-validation-policy-normal-map-packing-and-transcode-targets)；[光照烘焙持久化与场景关联](native-operations.md#lighting-bake-completion-and-persisted-scene-association)。

**结果：** 下游纹理保留必需通道/子图像，并有明确声明的颜色解读。

**文档化接口。** [Substance Painter 远程控制](https://experienceleague.adobe.com/en/docs/substance-3d-dev/painter-python/tutorials/remote-control)驱动运行中的创作应用；它不确立无界面烘焙/导出的验收契约。检查时显示为 3.3.0 的 [OpenImageIO oiiotool 手册](https://openimageio.readthedocs.io/en/latest/oiiotool.html)记载了 `--info`、`--colorconvert`、`--diff` 和 `--absdiff`。大多数命令通常处理第一张子图像并丢弃其他子图像；`-a` 及子图像选择修饰符控制更广范围的处理。具名颜色变换依赖所选配置。这是滚动更新的手册，而非固定版本的二进制文件。

**拟议流程。** 冻结 Painter 项目、导出预设及目标清单 → 导出候选贴图 → 清点尺寸、通道、子图像、数据类型及 alpha 约定 → 区分颜色贴图与数据贴图 → 仅应用已声明的变换 → 比较候选数值及渲染材质响应 → 导入、保存并重新打开。保留未改动原件与单独标识的派生文件。

**完成与证据。** 要求所有预期贴图及子图像，以及精确的颜色配置/哈希和源/目标空间名称。数值差异用于诊断，不证明材质外观等效。不能根据文件名推断颜色转换。法线、粗糙度、遮罩及其他数据通道需要明确策略，而非一概进行 RGB 转换。

**失败与恢复。** 缺失次级子图像、未知颜色空间、数据裁切或通道打包错误均导致验收失败。使用修正后的选择/预设重新生成至新目录；不要覆盖源文件，也不要默默采用新基线。远程脚本成功返回不代表导出完成、持久保存或目标渲染器兼容。导出取消及文件中断时的原子性仍未经验证。

**尚未实现的夹具：** 包含颜色与法线数据的多部分图像、已知渐变、alpha 边缘及刻意遗漏的子图像。要求独立文件清点及目标材质观测，而不只是创作预览。

## 4. 测量响度、峰值、静音与循环边界

**生产经验：** [Prototype 2 的上下文混音验收](studio-case-studies.md#prototype-2-consistent-source-assets-still-need-contextual-mix-acceptance)与 [Overwatch 的听者相关优先级](studio-case-studies.md#overwatch-sound-priority-depends-on-the-listeners-gameplay-situation)解释了为何产物测量需要玩法上下文与感知审查；两例均不提供已测试的外部适配器。

**相关契约：** [音频中间件就绪状态与所有权](native-operations.md#audio-middleware-authoring-readiness-and-ownership)；[运行时音频观测与捕获完整性](native-operations.md#runtime-audio-observation-and-capture-integrity)在产物测量前确立取样点/覆盖范围来源。事件完成仍需单独处理。

**结果：** 完整音频产物具有可复现的测量，以及经单独审查的循环接缝。

**文档化接口。** 滚动更新的 [FFmpeg 滤镜手册](https://ffmpeg.org/ffmpeg-filters.html)记载了 `ebur128` 的 M/S/I/LRA 测量；真峰值模式进行过采样，并需要 libswresample。`astats` 提供声道/整体统计；`Peak_count` 统计极值出现次数，而非削波样本数。`silencedetect` 在达到时长阈值后报告静音；结束/时长元数据在静音之后出现。`mono=1` 分离声道。对于拟用于立体声播放的单声道输入，手册要求 `dualmono` 补偿；其 `panlaw` 设置也影响测量。未检查已安装的 FFmpeg 配置。

**拟议流程。** 对原件计算哈希 → 识别所选流、解码样本格式/采样率及声道 → 使用 `ebur128=peak=true`、`astats=metadata=1:reset=0` 及显式配置的 `silencedetect` 分别进行测量 → 核对完整解码覆盖范围 → 与项目阈值比较 → 经目标导入/编解码器路径渲染至少两次预期循环重复 → 检查并试听回绕。

**完成与证据。** 保留完整命令、二进制/构建配置、stderr/元数据、样本数及实际分析区间。成功要求预期指标及完整时段，而非仅退出码为零。为样本表示及预期信号定义削波标准；绝不能用 `Peak_count` 替代削波样本数。后续没有帧的尾部静音需要显式核对 EOF。保持噪声阈值和最小静音时长可见。随响度结果记录预期的单声道/立体声播放解读及 `dualmono`/`panlaw` 选择。

**失败与恢复。** 解码错误、扫描截断及不受支持的真峰值处理均为不完整结果。使用不变的输入/设置重试，写入隔离报告文件。归一化、限幅、去除静音及交叉淡化是独立编辑；若获授权，则保留派生关系并重新测量。边界样本相等本身不能确立音乐连续性或编解码器安全循环。

**尚未实现的夹具：** 一个声道上的已知静音、刻意设置的瞬态、结尾静音及具有已知不连续性的循环。仍需试听及项目特定的响度/峰值限制；不声称平台认证或通用游戏混音目标。

## 5. 验证音画时序与空间播放

**相关契约：** [原生音频调度与所有权](native-operations.md#audio-middleware-authoring-readiness-and-ownership)。

**结果：** 观测到的声音起始与视觉事件在声明容差内对齐，并使用预期听者及路由。

**文档化接口。** [ffprobe](https://ffmpeg.org/ffprobe.html) 暴露流、数据包和帧部分。区间定位并不精确；相对时长从实际定位点开始测量。FFmpeg [ashowinfo](https://ffmpeg.org/ffmpeg-filters.html) 报告输入时基单位的音频 PTS、秒数、采样率及样本数，而 `asetrate` 不改动 PCM，却改变速度/音高。[Unity 6000.0 PlayScheduled](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioSource.PlayScheduled.html)使用绝对 DSP 时间线；过去的时间会尽快开始播放，AudioRandomContainer 对迟到时间有不同处理。[dspTime](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioSettings-dspTime.html)基于样本；其示例讨论了暂停/挂起。[AudioListener](https://docs.unity3d.com/6000.0/Documentation/Manual/class-AudioListener.html)规定每个场景有一个听者；[spatialBlend](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioSource-spatialBlend.html)从 2D 到 3D 变化，并在立体声声像处理后应用 3D 处理。

**拟议流程。** 记录片段/声源/听者身份及设备/混音器配置 → 留出准备提前量，调度带标记声音 → 捕获音频及可见标记 → 将解码样本和视觉帧时间戳关联到共同观测时钟 → 在开始、中间及结尾附近重复标记 → 测试暂停/恢复和场景/听者变更 → 检查左/右/前/后及选定距离上的空间夹具。

**完成与证据。** 保留有理数时基、原点、编辑偏移、样本数及捕获不确定性。调度回执不是可听起始。时长相等不能证明同步；区分偏移与漂移。持久保存捕获内容和运行时事件日志，而不只是请求的时间戳。仅凭听者变换不能确立 HRTF 质量、遮挡、路由或无障碍性。分别保留[事件拒绝、API 结果、暂停及 Core 与 Studio 虚拟化](native-operations.md#distinguish-fmod-event-lifecycle-from-audible-completion)；原生 PLAYING/STOPPED 观测不是可听成功判定。

**失败与恢复。** 缺失 PTS 应保持未知，而非记为零。缺失/重复听者、意外路由或丢失标记使验收不完整。重试超时的调度前，核对回合/声源状态以免重复声音。新会话需要新的 DSP 调度；保存的数值时间戳不是重放契约。设备延迟、取消和回滚未经验证。

**尚未实现的夹具：** 迟到调度、暂停/恢复、长时间漂移、声道交换及叠加场景听者替换。需要时钟对齐收集器及人工感知审查。不要默默重新定时音频以掩盖失败观测。

## 6. 编译本地化、塑形文本并检查无障碍 UI

**生产经验：** [Mass Effect 2 的版本/上下文关卡](studio-case-studies.md#mass-effect-2-carry-revision-and-branch-context-through-localization)、[Forza 的共同开发与可学习提示](studio-case-studies.md#forza-motorsport-co-develop-alternative-feedback-without-removing-player-decisions)，以及 [Far Cry New Dawn 的依赖/测试限制](studio-case-studies.md#far-cry-new-dawn-accessibility-scope-must-include-dependency-maturity-and-testing-time)补充下列技术流程；这些历史记述不能确立经测试的适配器或普遍玩家结果。

**相关契约：** [字体产物验证](../assets/validation.md#6-validate-the-font-artifact-before-testing-localized-screens)与[原生 GUI 证据限制](engine-operations.md#native-gui-automation-is-a-separate-evidence-surface)。

**结果：** 经审查的翻译可编译，并以预期字形、布局及无障碍交互显示。对于原生 Godot UI，首先检查[语义激活、延迟动作及平台边界](engine-operations.md#godot-native-semantic-observation-and-action-completion)；仅使用检查器的 Auto 模式运行可能缺少活动语义更新。

**文档化接口。** [GNU gettext](https://www.gnu.org/software/gettext/manual/gettext.html)记载了 `msgfmt --check`，包括格式/头部/域检查。已标记的格式不匹配会阻止 MO 生成；`--use-fuzzy` 可能纳入未经审查条目。[HarfBuzz](https://harfbuzz.github.io/what-is-harfbuzz.html)选择并定位字形；它[不是完整排版系统](https://harfbuzz.github.io/what-harfbuzz-doesnt-do.html)。[FreeType](https://freetype.org/freetype2/docs/index.html)提供字体访问及字形图像，而非高级排版。[MSDF Atlas Generator](https://github.com/Chlumsky/msdf-atlas-gen)除非覆盖设置，否则默认使用 ASCII，且要求对图集通道进行线性采样。这些上游页面不授予所选字体的许可。

**拟议流程。** 冻结消息提取及格式标记 → 审查翻译/模糊状态 → 编译新的候选 MO → 构建显式区域语言/字形集 → 使用预期字体/回退栈塑形代表性文本 → 渲染实际界面 → 测试键盘/辅助路径及本地化溢出 → 打包并在每个目标区域语言下重新打开。

**完成与证据。** 编译与翻译覆盖率、塑形、换行及无障碍性相互独立。保留区域语言/域、目录哈希、字体版本/许可、字形集定义及渲染配置。对于浏览器 UI，[Playwright 截图](https://playwright.dev/docs/api/class-pageassertions)等待稳定捕获，但遮罩/样式/动画控制可能改变证据。[所检查提交的 axe-core 4.10.3 API](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/doc/API.md)区分违规、通过、未完成及不适用；限制结果类型可能省略节点详情。DOM 扫描不能认证游戏画布。对于实时区域语言切换，区分[字符串交付、渲染布局和原生无障碍](engine-operations.md#runtime-locale-changes-separate-string-delivery-rendering-and-accessibility)；刷新请求成功不等于三者全部完成。

**失败与恢复。** 从源头修正提取格式分类；不要为通过检查而移除 PO 标记或自动清除模糊状态。保留未完成/人工发现。将已改变的区域语言/UI 状态作为新观测重试，并保留排除项和选项。绝不自动更新截图基线。目录写入原子性和完整回退覆盖仍未经验证。

**尚未实现的夹具：** 复数形式、混合方向文本、组合附加符号、缺失字形、长标签、字幕及隐藏焦点目标。[Xbox 无障碍指南](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)为人工审查提供参考；它们不是法律认证。需要项目特定的区域语言切换及残障玩家测试。

## 7. 在网络劣化条件下测试多人传输

**负载范围：** [VALORANT 平台工作负载](studio-case-studies.md#valorant-specify-the-workload-behind-a-concurrency-claim)说明了为何并发数、时长、场景组合、模拟组件及验收边界必须一并保留；传输劣化与真实玩法长时间稳定性测试仍是独立实验。

**失败证据：** [Bungie 分布式崩溃收集](studio-case-studies.md#destiny-a-local-symptom-can-require-a-distributed-evidence-set)与 [Valve 转储/构建来源](studio-case-studies.md#valve-retain-the-build-artifacts-that-make-a-dump-interpretable)区分事件关联、捕获完整性及诊断资格。这些历史方法不能确立经测试的长时间稳定性工作负载，也不授权破坏性收集。

**相关契约：** [协议范围内的输入/网络劣化](../assets/validation.md#7-select-the-right-impairment-and-input-surface-for-a-regression)与[服务器状态/事务边界](../evaluation/gameplay-state.md#server-owned-gameplay-state-and-transaction-boundaries)。

**结果：** 有界多人场景在声明的延迟、丢包及重连条件下保留权威玩法不变量。

**文档化接口。** [GameNetworkingSockets](https://github.com/ValveSoftware/GameNetworkingSockets)提供可靠/不可靠消息、延迟/丢包模拟及统计；它不提供实体序列化或增量编码。可能需要自行提供信令及服务特定访问。滚动更新的[原生接口头文件](https://github.com/ValveSoftware/GameNetworkingSockets/blob/master/include/steam/isteamnetworkingsockets.h)记载了发送失败，包括无效状态、已关闭连接及队列限制。在不使用 Steam 分发机制时，`RunCallbacks` 分发已排队回调。回调用户数据反映回调入队时的情况。启用 linger 关闭会尝试刷新剩余数据；不启用 linger 时，可靠数据不会被刷新。关闭监听套接字会非优雅地关闭已接受连接。这些是源码契约，而非经测试的库版本或持久交付保证。

**拟议流程。** 启动隔离的服务器/客户端角色 → 记录构建/协议/会话身份 → 建立干净的基线场景 → 应用声明的传输局部劣化 → 记录发送结果、回调及权威状态转移 → 移除劣化 → 在新连接身份下重连/核对 → 验证最终应用状态 → 归档日志并终止自有进程。

**完成与证据。** 连接建立或成功入队不等于游戏状态提交。在游戏需要时，要求应用层操作 ID 和确认、服务器权威不变量及有界队列/超时策略。持久保存因果事件日志及观测时序，包括被拒绝动作。持久化玩法需要单独的项目存储契约；仅关闭传输不能确立任何此类保证。

**失败与恢复。** 队列饱和、陈旧回调身份、超时及协议不匹配应区别处理。应用重试前核对未知动作；传输可靠性不能让购买、奖励或重复命令具有幂等性。不要更改主机防火墙/网络策略，也不要假定拥有 Steam 中继使用资格。仅回滚夹具拥有的劣化设置并验证清理。此处未确立网络种子可复现性。

**尚未实现的夹具：** 重复应用请求、重连后的延迟回调、最后确认丢失，以及在流量排队期间强制关闭。需要游戏特定的状态驱动器、劣化配置适配器及可观测性收集器。仅传输测量不能认证防作弊能力或生产可扩展性。

## 8. 构建绑定发布版本的内容更新并重建其补丁

**相关契约：** [已交付构建检查与比较](debugging.md#build-artifacts-streaming-budgets-and-delayed-timing)；[分配生命周期与保留资源证据](debugging.md#memory-lifetime-across-repeated-production-cycles)将运行时所有权与构建体积及引用计数摘要分开。

**结果：** 候选更新对应预期已发布基线，并能重建经独立验证的产物。

**文档化接口。** [Addressables 1.21 BuildContentUpdate](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/api/UnityEditor.AddressableAssets.Build.ContentUpdateScript.BuildContentUpdate.html)使用指定的内容状态缓存版本并返回构建结果。其[更新设置](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/content-update-build-settings.html)可能从不可用的远程状态回退到已有本地缓存文件；应在完整构建期间更改组的 Update Restriction。[已修改条目收集](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/api/UnityEditor.AddressableAssets.Build.ContentUpdateScript.html)针对静态 Addressable 依赖。[butler 离线补丁](https://itch.io/docs/butler/offline.html)需要暂存区，可恢复被中断的相同 apply 命令，且除非选择其他输出目录，否则默认原地应用。签名检查可选；原地处理不会检查全部未改动文件。独立的 `verify` 检测哈希不匹配；修复需要原始来源。

**拟议流程。** 将发布版本/平台匹配到已计算哈希的内容状态文件 → 快照保存组/配置文件设置 → 收集变更 → 构建到候选输出 → 检查原生错误/结果及产物清单 → 从不可变基线生成补丁 → 使用专用检查点应用到独立临时输出 → 根据预期签名验证重建构建 → 安装到隔离目标并测试内容加载 → 归档发布谱系。

**完成与证据。** 结果对象存在、补丁完成及内容激活是不同关卡。保留基线、状态缓存身份、补丁/签名哈希、变更依赖及完整重建验证。缓存路径不能证明缓存属于此次发布。不包含任何上传或发布晋级。

**失败与恢复。** 错误回退状态或已改变的更新策略会阻止增量重试；应显式选择完整构建工作流。仅在输入/命令/检查点身份完全相同时恢复 butler。保留失败重建。修复是需要单独授权的修改；不要自动修复生产安装。原子晋级、并发补丁写入器及断电持久性仍未经验证。

**尚未实现的夹具：** 远程状态不可用且本地缓存陈旧；补丁被中断；未改动基线文件损坏；平台错误的内容。需要隔离安装器及运行时内容加载检查。完整构建仍需平台认证及分发批准。

### Godot 4.4 内容补丁：挂载不等于依赖激活

同时检查包内容及消费进程可见的资源：正确的包仍可能让缓存资源继续被使用。下列参考针对 Godot 的  **4.4 文档分支** 及位于 `4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41` 的  **4.4-stable**  源码；其他版本的缓存行为应单独验证。

**文档化边界。** [ProjectSettings.load_resource_pack](https://docs.godotengine.org/en/4.4/classes/class_projectsettings.html#class-projectsettings-method-load-resource-pack) 将 PCK/ZIP 内容挂载到 `res://` 并返回布尔值。同路径条目默认替换已有条目；`replace_files=false` 禁用该替换。4.4 参考提醒，`DirAccess` 不显示此操作对 `res://` 所作的变更。因此，目录列表不是新挂载内容的验收判定依据。

[ResourceLoader 缓存模式](https://docs.godotengine.org/en/4.4/classes/class_resourceloader.html#enum-resourceloader-cachemode)确立独立边界：默认的 `CACHE_MODE_REUSE` 复用缓存资源及外部依赖。`CACHE_MODE_IGNORE` 绕过主资源/子资源缓存，但仍以复用方式加载外部依赖；`CACHE_MODE_IGNORE_DEEP` 将绕过行为传播到依赖。替换模式在类型匹配时可能刷新已有实例，否则重新创建。对于路径已在缓存中被接管的未保存资源，`exists()` 也可能报告 true。 **推论：** 仅挂载成功、资源存在及只重载顶层对象，都不能证明完整补丁依赖图已激活。

**固定源码佐证。** 在该提交中，[文本资源加载器](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/scene/resources/resource_format_text.cpp#L1393-L1405)对普通 IGNORE/REUSE/REPLACE 选择外部依赖复用，并传播 deep 模式；[资源加载器](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/core/io/resource_loader.cpp#L608-L618)对 REUSE 返回已有缓存资源。这佐证了缓存区别，而非每个资源格式插件或目录列表警告。

[4.4 包指南](https://docs.godotengine.org/en/4.4/tutorials/export/exporting_pcks.html)还将脚本列为包内容，并记载了挂载 C# 模组前额外加载 C# 程序集的步骤。应将包视为可能可执行的内容，而非仅是惰性纹理归档；获准挂载数据包不代表其独立程序集已交付或加载。这并非声称引擎会认证模组或对其进行沙箱隔离。

**拟议验收。** 保留引擎/模板身份、基线及有序包哈希、预期路径冲突、替换策略及资源加载/缓存策略。使用项目自有清单，列出预期资源路径、类型、依赖身份及可观测版本标记。将挂载结果与实际返回的资源及玩法/渲染结果分别记录。验证一个在加载夹具资源前挂载预期包集合的全新进程；若承诺热更新，则独立验证已有缓存的进程。不要在运行中的游戏里默默切换为深度替换：已有对象身份及副作用需要各自的契约。

**尚未实现的夹具：** （1）缓存场景及其外部材质，挂载同时改变两者的补丁，然后将默认、顶层忽略及深度忽略加载与全新进程参考比较；（2）以两种顺序并在禁用替换时，挂载两个具有刻意路径冲突的包；（3）添加新的已知资源，比较清单引导的加载与目录列表观测；（4）遗漏必需依赖或 C# 程序集，要求报告独立的激活失败，而非仅挂载通过。保留原生错误及返回对象/依赖标记，而不只是截图或布尔值。

**失败/恢复限制。** 隔离不匹配的候选，并从不可变基线重启隔离夹具。所检查契约未确立安全卸载/回滚、并发热替换、崩溃持久性、签名信任、跨版本包兼容性或逐位相同的导出。本提案不声称其中任何保证。

## 9. 编译着色器排列组合并评定首次使用行为

**相关契约：** [捕获与着色器诊断完成](debugging.md#capture-shader-and-gpu-diagnosis)。

**结果：** 必需着色器产物针对声明目标完成编译，且首次使用行为独立于编译成功进行测量。

**文档化接口。** [DXC API 指南](https://github.com/microsoft/DirectXShaderCompiler/wiki/Using-dxc.exe-and-dxcompiler.dll)在检查时的 wiki 修订日期为 2023 年 5 月 5 日，它区分 API 调用成功与 `IDxcResult::GetStatus`。诊断可同时包含警告和错误；必须单独获取预期目标输出。调试 PDB 默认位于外部，而 `-Vd` 禁用验证。已安装版本的精确标志兼容性未知。Epic [2025 年 2 月 4 日的 PSO 预缓存说明](https://www.unrealengine.com/tech-blog/game-engines-and-shader-stuttering-unreal-engines-solution-to-the-problem)解释了内容/排列组合覆盖及驱动缓存影响；不得将其中的 UE5.5 缺口表述为当前普遍引擎行为。

**拟议流程。** 冻结源码/include 图、定义、入口点、HLSL 版本及目标配置 → 启用验证，编译每个必需排列组合 → 分别检查 API 与编译状态 → 保留目标/调试/哈希输出 → 集成到预期引擎构建 → 在隔离的冷缓存和热缓存条件下执行首次使用场景 → 比较时序及渲染结果 → 保存产物/测量清单。

**完成与证据。** 每个必需排列组合都需要各自终态及新输出。保留 include 解析、编译器身份、目标设备/驱动/RHI、质量预设及缓存条件。编译成功不等于 PSO 创建、渲染正确或遍历无卡顿。驱动缓存状态是实验条件，而非源哈希的属性。

**失败与恢复。** 缺少 include、编译错误、输出缺失及目标不兼容均阻止晋级。修正输入并写入新候选输出；绝不复用先前成功的二进制块。重置前收集原生错误。不要清除用户的共享缓存来制造冷运行；应提供隔离夹具。尚未确立跨驱动缓存可移植性或事务性编译器输出保证。

**尚未实现的夹具：** 格式错误的 include、有效但错误的目标配置、材质/皮肤替换，以及遍历中新流送的对象。需要与帧产物关联的着色器/PSO 遥测及声明的时序预算；热缓存重跑不能替代失败的冷运行结果。

## 完整示例集成案例

这些有来源支持的案例将资源、场景、交互、构建及游戏测试界面连接在一个项目中。它们补充上述九条拟议流程。所引修订提供上游代码和测试，但其存在不是 GameMap 执行结果。

### Unity Boss Room：有源码支持的多人生产流程

**范围。** 位于[提交 `1299ba4fc97d83b634e7d32a86c438ba668d7f9c`](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/tree/1299ba4fc97d83b634e7d32a86c438ba668d7f9c)（2025-10-23）的官方示例，于 2026-10-18 检查，提供了连接创作资源、场景流程、交互、构建及测试的具体项目。其 [README](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/README.md)将其描述为八人、服务器权威的合作 RPG，并使用掩盖延迟的动画。这些是上游设计声明，而非 GameMap 游戏测试或经测量的延迟保证。

| 阶段        | 已检查的项目证据                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 验收边界                                                                                                                                                                                                                                                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 获取与解析     | [ProjectVersion](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/ProjectSettings/ProjectVersion.txt) 指定 Unity 6000.0.52f1；[manifest](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/Packages/manifest.json) 通过 OpenUPM 范围注册表指定 NGO 2.4.3、URP 17.0.4、Transport 2.5.1、Test Framework 1.5.1 及 VContainer 1.16.8。README 要求克隆使用 Git LFS。                                                          | 仅有源提交不代表已完整落地的项目。[EditorBuildSettings.asset](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/ProjectSettings/EditorBuildSettings.asset) 获取到的是 LFS 指针，因此本次审查不能确立其实际启用场景清单。未测试包下载可用性及解析后的安装。                                                                                                 |
| 创作与组装     | [美术说明](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/Documentation/ART_NOTES.md)描述了为光照同时加载 Dungeon BossRoom、Dungeon Entrance、Dungeon Transition 与 BossRoom，切换示例的烘焙/实时光照设置，并选择 FastBaking 或 GoodBaking 配置。                                                                                                                                                                                                                                                          | 这是该示例的创作工作流，而非当前通用的 Unity 光照规范。一起保留已加载场景、光照模式/配置及生成的光照产物；不能因脚本编译成功就接受陈旧烘焙数据或缺失场景内容。此处未检查实际场景字节及烘焙结果。                                                                                                                                                                                                                                                              |
| 将视觉编辑接入玩法 | [FloorSwitch](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/Assets/Scripts/Gameplay/GameplayObjects/FloorSwitch.cs) 在服务器上跟踪触发器占用者，并在 FixedUpdate 期间移除已销毁碰撞体引用；其注释依赖已配置的物理层矩阵。[SwitchedDoor](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/Assets/Scripts/Gameplay/GameplayObjects/SwitchedDoor.cs) 会因任意已配置的活动开关（或编辑器/Development 的 `ForceOpen` 覆盖）而打开，改变网络变量，驱动服务器动画器，并切换客户端物理/导航网格障碍物对象。 | 可见开门动画与有效碰撞状态是独立观测。替换开关/门预制体必须保留序列化引用、层、触发器/障碍物配置及网络行为。源码意图不能证明尚未打开的预制体接线或专用服务器行为。                                                                                                                                                                                                                                                                                |
| 构建新产物     | [BuildHelpers](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/Assets/Scripts/Editor/BuildHelpers.cs) 明确是内部游戏测试菜单辅助工具。它选择启用的构建场景，使用 Development 和 StrictMode，检查 BuildReport 是否成功，并尝试在 finally 中恢复编辑器目标；未检查目标切换返回值。除非跳过，否则它检查云项目 ID，并删除先前游戏测试构建。                                                                                                                                                                                                                      | 该辅助工具的计数器在构建成功前递增，因此其最终计数不是成功产物数量。使用每份 BuildReport 及新输出路径/哈希。菜单驱动的 async-void 编排不是已确立的无人值守 CI 命令；不要对有价值的输出调用其破坏性清理。普通本地直连 IP 游戏仍不同于由 UGS 支撑的会话。                                                                                                                                                                                                                   |
| 执行并解释测试   | [HostAndDisconnectTest](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/Assets/Tests/Runtime/HostAndDisconnectTest.cs) 将八个角色座位索引参数化，进入 Startup/MainMenu，通过直连 IP UI 方法主持会话，选择角色，到达 BossRoom，退出并检查关闭/MainMenu。它明确自称冒烟测试，并将联网技能留待后续扩展。[ConnectionManagementTests](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/Assets/Tests/Runtime/ConnectionManagementTests.cs) 使用两个客户端，禁用场景管理并使用场景加载器桩。    | 八个角色案例不等于八个同时在线玩家。仅主机冒烟测试通过或使用桩的连接测试，都不能确立战斗、远端渲染、开关通行或完整多人会话。[TestUtilities](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/Packages/com.unity.multiplayer.samples.coop/Utilities/Testing/TestUtilities.cs) 使用基于 Time.time 的场景截止期限；其网络场景完成处理器匹配场景名称，但不检查 clientsTimedOut 列表。保留这些较窄的判定范围。 |

**CI 与权利。** 已提交的 [Yamato 项目测试模板](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/.yamato/project-tests.yml)筛选 BossRoom 运行时测试并收集测试结果日志，但从 Unity 内部注册表获取工具。其[矩阵](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/.yamato/project.metafile)声明编辑器 6000.0.44，不同于项目的 6000.0.52f1。所检查配置不是近期成功运行或可公开复现的 CI 服务的证据。[许可声明](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop/blob/1299ba4fc97d83b634e7d32a86c438ba668d7f9c/LICENSE.md)指向针对依赖 Unity 项目的 Unity Companion License；不要将示例重标为 MIT，也不要推断跨引擎/AI 训练权利。依赖及单个资源声明需要独立审查。未进行账户配置、LFS 实体化、引擎导入、编译或游戏测试。

**拟议集成夹具，尚未实现。** 冻结完整实体化的项目及解析后的环境；保留未修改基线。对开关-门遭遇做一处有界的视觉/几何编辑，并禁用及记录 `ForceOpen`。构建新的隔离产物，保留构建/测试报告及场景/预制体身份，然后通过主机加独立客户端比较基线和候选：进入关卡，靠近/离开开关，验证权威开关/门状态、客户端动画、碰撞/导航通行及返回菜单行为。捕获原始帧与关联事件，而不只是 UI 调用回执。记录延迟条件和每个客户端的结果；有客户端超时的场景回调属于不完整证据。保留现有冒烟测试结果，不要将其呈现为新提议的交互测试。该示例提供了相互连接的实现界面；GameMap 尚未构建代理驱动器，也未确立重置确定性、独立进程覆盖或留出评估结果。

### Godot 3D Platformer：可检查的场景到构建路径

**范围。** 于  **2026-10-18**  审查，仅检查源码，采用来自  **4.3 分支** 的官方演示提交 [`52e30044658448149b04e8f69b475eebbfbd8f6e`](https://github.com/godotengine/godot-demo-projects/commit/52e30044658448149b04e8f69b475eebbfbd8f6e)。[项目配置](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/project.godot#L11-L18)选择 `game.tscn` 并声明 4.3；[示例 README](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/README.md)标明 GDScript 与 Forward+。这是历史交互场景基线，不是当前兼容性或完整游戏的声明：[4.3 文档](https://docs.godotengine.org/en/4.3/tutorials/export/exporting_projects.html)将该引擎版本标为不受支持。未安装或运行引擎/游戏；未下载二进制资源，也未尝试导入/导出。

**资源 → 场景。** [玩家 GLB 导入附属文件](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/player/player.glb.import#L1-L33)记录源/派生路径、具名蒙皮、生成的网格 LOD 及 30-fps 动画导入；[敌人附属文件](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/enemy/enemy.glb.import#L1-L33)记录对应设置。[瓦片材质](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/stage/tile_material.tres)绑定独立的反照率与粗糙度纹理。[主场景](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/game.tscn)组合关卡、玩家、金币和敌人。[关卡资源](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/stage/stage.tscn)包含 GridMap、天空、光照及反射探针；[瓦片库](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/stage/tiles.tres)连接网格和碰撞形状。[玩家场景](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/player/player.tscn)连接 CharacterBody3D 胶囊体、导入角色、相机、AnimationTree、标签、触控及声音。导入设置和资源引用确立预期组装方式；它们不能证明依赖闭包、成功导入或视觉正确性。

**场景 → 交互。** [玩家代码](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/player/player.gd)实现相机相对移动、提前释放时缩短跳跃、按下沿射击及动画混合。[输入/物理配置](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/project.godot#L91-L145)设置移动、跳跃、射击和重置动作，每秒 120 个物理 tick。[金币代码](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/coin/coin.gd)设置 `taken`，并只将玩家计数增加一次；其[拾取动画](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/coin/coin.tscn#L118-L178)隐藏金币并触发粒子/音频，不删除其节点。因此，断言节点消失是错误的拾取检查。[敌人接触处理](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/enemy/enemy.gd#L35-L52)标记正在死亡，禁用来自该子弹的重复命中，并将动画入队；[后续动画方法轨道](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/enemy/enemy.tscn#L359-L384)调用 `_die`，后者将删除入队。接触、可见反馈及最终移除是独立观测。

**控制与重置边界。** [Backward 触控按钮](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/player/player.tscn#L198-L205)发出 `move_backwards`，但输入映射及控制器使用 `move_back`：这是已验证的源码不匹配，而非已复现的移动端故障。键盘、手柄与触控需要独立检查。[重生逻辑](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/player/player.gd#L27-L50)在重置输入或坠落后，将位置设为 `initial_position` 并将速度清零，然后继续该物理更新；后续重力/输入处理可改变速度，而金币/世界状态保留。重生不是干净的回合重置。在所检查的示例脚本/场景中未发现战役完成控制器；有界路线需要显式创作成功条件。

**交互 → 导出。** [已提交预设](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/3d/platformer/export_presets.cfg)面向 Linux/X11 与 Android，但其存在不代表构建成功。仅 Linux/X11 的拼写本身并非已证实的缺陷：[Godot 4.3-stable 源码](https://github.com/godotengine/godot/blob/77dcf97d82cbfe4e4615475fa52ca03da645dbd8/editor/export/editor_export.cpp#L228-L242)将其映射到 Linux，除非定义 `DISABLE_DEPRECATED`；未穷尽检查其余选项兼容性。[4.3 CLI 参考](https://docs.godotengine.org/en/4.3/tutorials/editor/command_line_tutorial.html)要求编辑器构建、所选预设、匹配模板及已存在的输出目录。导入完成不同于玩法；纯数据 PCK 不同于可执行文件加数据交付。所检查的子树未声明 addon、C# 或 GDExtension 依赖；引擎/模板、图形支持及目标工具仍是前提。未验证 Android 签名及 SDK 配置。

**导出 → 测试。** 在该示例下未发现玩法测试框架。此修订唯一的仓库工作流 [Static Checks](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/.github/workflows/static_checks.yml)运行[文本格式检查](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/file_format.sh)，不运行 Godot 或玩法断言。根 README 的托管演示链接可变，且未游玩。其可用性不能验证固定版本源码。[Godot 4.3 Web 文档](https://docs.godotengine.org/en/4.3/tutorials/export/exporting_for_web.html)要求 Compatibility/WebGL 2.0 而非 Forward+，并指出 Web 音频/线程限制。因此浏览器移植需要独立的视觉、输入及音频验收。

**拟议路线，尚未实现且尚未执行。** 固定引擎/模板/源码及目标身份；从全新缓存导入可丢弃副本；验证场景、碰撞、材质及具名动画；通过选定平台，比较短按/长按跳跃，拾取一枚指定金币，射击一个敌人，然后分别测试重生及全新重启。在编辑器外的导出产物中重复可达且有预算的路线，对每种输入方式单独执行。检查金币计数增加一次及标签/可见性/音频反馈、经动画延迟的敌人移除，以及重生后保留状态与重启后初始状态的区别。保留导入/导出/运行时日志、依赖及产物哈希、按 tick 索引的输入/状态、代表性帧、音频和阈值。分别记录已接受、质量失败、不受支持、基础设施失败、超时、已取消或无法定论。本拟议夹具不能导出任何确定性重放、持久化或发布就绪声明。

**权利。** [固定版本 README](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/README.md#L42-L45)声明演示采用 MIT；[许可](https://github.com/godotengine/godot-demo-projects/blob/52e30044658448149b04e8f69b475eebbfbd8f6e/LICENSE.md)要求保留其声明并不提供保证。在所选子树中未发现独立权利声明。这是上游许可证据，不是对随附二进制文件的独立来源审计，也不是对随后添加资源、动作、音频或插件的授权。

## 剩余实现工作

这些流程需要项目驱动器、原生终态观测器、有界进程所有权、产物收集器及独立验收评估器。创作格式等效性、主机 SDK/认证、编解码器/设备延迟、翻译质量、无障碍玩法及应用层多人持久性仍由项目具体决定。历史行业经验有助于选择失败案例；它们不暴露工作室私有工具，也不复现工作室性能。

在未来实现中保留来源审查日期、文档版本及精确链接。部署前重新核查滚动更新手册和提供方许可。上述拟议夹具 **没有运行 ID、实测容差、通过检查或运行时兼容性声明** ，因为均尚未执行。
