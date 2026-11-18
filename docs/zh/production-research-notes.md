# 生产工具与验收边界

查找用于动画、程序化内容、音频、渲染和验证的生产工具。使用各工具的原生产物与完成信号，定义向下一阶段交接的条件。

## 创作、本地化与叙事

### Tiled

一款支持 JavaScript 扩展与命令行导出的瓦片地图编辑器。扩展可以操作地图和图块集；脚本指南包含 TypeScript 定义，以及自 1.9 起提供的 CLI 求值功能。依赖 UI 的 API 在 CLI 模式下可能不执行任何操作或返回 null，因此编辑器脚本需要检查无界面执行路径。

一手来源：[官方文档或代码仓库](https://doc.mapeditor.org/en/stable/manual/scripting/)；[Tiled COPYING](https://github.com/mapeditor/tiled/blob/master/COPYING)。[瓦片地图传输契约](asset-validation-contracts.md#tile-map-identity-geometry-and-runtime-delivery)涵盖地图局部 ID、几何、稀疏坐标，以及独立的运行时与持久化观测。

### LDtk

一款为引擎集成提供结构化 JSON 导出的 2D 关卡编辑器。官方格式为关卡、图层和实体提供完整及精简的 JSON 模式。导入器必须跟踪格式变更与弃用项；JSON 导出不提供运行时行为，也不能据此认定存在命令行编辑器接口。

一手来源：[官方文档或代码仓库](https://ldtk.io/json/)；[LDtk 代码仓库](https://github.com/deepnight/ldtk)

### Aseprite

一款支持批量精灵图集导出的像素画与动画编辑器。CLI 可在不打开 UI 的情况下导出精灵图集及配套元数据。选项顺序与图层可见性会影响结果。源码可获取不等于允许宽松再分发：二进制文件与源码的使用应查阅项目 EULA。

一手来源：[官方文档或代码仓库](https://www.aseprite.org/docs/cli/)；[Aseprite 许可](https://github.com/aseprite/aseprite)。[精灵交付契约](asset-validation-contracts.md#sprite-atlas-metadata-and-playback-delivery)为拟议的受限导入器补充了固定的裁边、图集、标签、枢轴点和时序证据。

### Inkscape

一款支持命令行导出与对象几何查询的 SVG 编辑器。适用于矢量 UI 资源与可重复的栅格导出。动作取代了旧的 verbs 接口，后者已在 1.2 中移除；官方 wiki 中的示例横跨多个版本，因此应检查目标构建可用的动作。

一手来源：[官方文档或代码仓库](https://wiki.inkscape.org/wiki/Using_the_Command_Line)

### Krita

一款可通过 Python 访问文档、动作与滤镜的栅格绘画编辑器。LibKis 支持在 Krita 内部自动化绘画和资源准备。脚本指南并未确立通用的无界面 Python 服务。Krita 的 GPL 软件许可不限制使用它创作的作品的所有权。

一手来源：[官方文档或代码仓库](https://docs.krita.org/en/user_manual/python_scripting/introduction_to_python_scripting.html)；[Krita 许可](https://krita.org/en/about/license/)

### Spine

一款支持运行时导出和批处理的 2D 骨骼动画编辑器。大多数 CLI 导出可无界面运行，但图像和视频导出需要窗口系统与 OpenGL。编辑器导出必须与运行时版本匹配。CLI 自动化仍受 Spine 用户许可约束，并不因此成为不受限制的服务器使用。

一手来源：[官方文档或代码仓库](https://en.esotericsoftware.com/spine-command-line-interface)；[厂商对 Spine CLI 许可的说明](https://eu.esotericsoftware.com/forum/d/30243-tos-question-about-using-spine-cli-as-an-export-tool)；[Spine 导出](https://us.esotericsoftware.com/spine-export/)

### Rive

一款具有可嵌入运行时的交互式矢量动画创作工具。适用于动画菜单与 UI 状态机。官方运行时采用 MIT 许可，而生产用运行时导出需要符合条件的付费编辑器方案。编辑器新功能可能要求更新运行时或重新导出；运行时许可不授予编辑器访问权。

一手来源：[官方文档或代码仓库](https://github.com/rive-app/help-center/blob/master/runtimes/overview.md)；[Rive 付费导出方案](https://rive.app/blog/rive-s-new-9-mo-plan)

### Effekseer

一款带有游戏运行时及命令行导出功能的粒子特效编辑器。18.x 文档描述了可编辑/运行时 .efkefc 文件与材质缓存导出。较早的 .efkproj 和 .efk 工作流有所不同。仍需进行运行时集成并打包依赖的纹理/材质；导出的特效不等于完整的引擎集成。

一手来源：[官方文档或代码仓库](https://effekseer.github.io/Helps/18x/Tool/en/ToolReference/index.html)；[Effekseer 代码仓库](https://github.com/effekseer/Effekseer)

### Fluent

一套支持语言特性的消息与运行时格式化的本地化系统。Fluent 资源允许译者表达特定语言的语法，而非强迫所有区域语言使用相同字符串结构。提供 JavaScript、Python 和 Rust 实现。它仍需要已翻译的资源和宿主集成；不是自动翻译服务。

一手来源：[官方文档或代码仓库](https://projectfluent.org/)

### ICU

用于区域语言敏感文本处理的 Unicode 与国际化库。ICU4C 和 ICU4J 为 C/C++ 和 Java 提供国际化 API。它们支持文本基础设施，而非翻译创作。应匹配库和数据版本，并检查随游戏交付的区域语言数据占用。

一手来源：[官方文档或代码仓库](https://unicode-org.github.io/icu/userguide/icu/)

### HarfBuzz

一款将 Unicode 文本转换为定位后字形的文本塑形库。适用于无法通过一字符对应一字形来处理字形选择与定位的文字系统。塑形只是文本栈的一部分：排版、字体栅格化、回退和 UI 集成仍需独立系统。

一手来源：[官方文档或代码仓库](https://harfbuzz.github.io/what-is-harfbuzz.html)；[HarfBuzz 不做什么](https://harfbuzz.github.io/what-harfbuzz-doesnt-do.html)；[Ren'Py 随附的 HarfBuzz 许可](https://www.renpy.org/doc/html/license.html)

### FreeType

一款用于访问字体文件并生成字形图像的字体库。FreeType 提供通用字体 API 与栅格化功能，而非高级文本排版。其 FTL/GPL 许可选项适用于库；字体文件需要单独的权利审查。构建多语言 UI 时，应将它与塑形及排版系统结合使用。

一手来源：[官方文档或代码仓库](https://freetype.org/freetype2/docs/index.html)

### ink

一种具有 C# 运行时与命令行编译器的分支叙事语言。编译后的 JSON 输入 Story；Continue 与 choices 驱动进程，state.ToJson 和 LoadJson 则保存解释器状态。宿主游戏 UI 与外部副作用仍是独立部分。不应假定 MIT 许可的核心与社区 inkjs 移植版在版本上兼容。

一手来源：[官方文档或代码仓库](https://github.com/inkle/ink)；[所检查提交的运行时指南](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/Documentation/RunningYourInk.md)

### Ren'Py

一款支持命令行编译、静态检查、测试和构建的视觉小说框架。CLI 也支持翻译工作流。在文档为保持存档兼容性而要求的情况下，应跨 CI 构建保留已编译的 .rpyc 文件。移动端和 Web 目标有各自的配置要求；构建成功不等于通过剧情或本地化测试。

一手来源：[官方文档或代码仓库](https://www.renpy.org/doc/html/cli.html)；[Ren'Py 许可](https://www.renpy.org/doc/html/license.html)

### 对白起草：保留偏好、编辑后的采纳文本与角色参考资料

将作者偏好的草稿、其编辑后采纳的台词，以及自动风格评分分别记录。相对选择仍可能需要大量改写，或同时拒绝两个备选项。

**内部起草工作流。**  Ubisoft 的 [2023 年 3 月 Ghostwriter 创作者介绍](https://news.ubisoft.com/en-gb/article/7Cm07zbBGy4Xml6WgYi25d/the-convergence-of-ai-and-creativity-introducing-ghostwriter)描述了作者提供角色与交互/话语类型，然后选择并编辑建议的 NPC 短台词。成对选择也提供偏好反馈。该介绍描述了支持制作团队采用工具的情况；它既未证实某款已发行作品使用了该工具，也未证实经测量的端到端生产率提升。其 Ernestine 后端没有作为公开可执行服务的文档。

**独立的研究证据。**  [NLP4ConvAI 2023 SASS 论文](https://aclanthology.org/2023.nlp4convai-1.11.pdf)提出，在推理时保持训练后的模型不变，改动特定角色的已创作台词索引（§1）。早期模型版本的成对人工比较未达到可接受的标注者间一致性；主观性与有损的角色摘要使评估复杂化（[§6.3，印刷页码 135](https://aclanthology.org/2023.nlp4convai-1.11.pdf#page=7)）。文中未报告一致性统计量或阈值。定性检查有时发现，困惑度虽有改善，流畅度却略有下降。作者将内部集成描述为未来工作，并声明 UBISCENES 不会公开发布（[§7，印刷页码 136](https://aclanthology.org/2023.nlp4convai-1.11.pdf#page=8)）。这些发现不能证明 SASS 支撑了所演示的 Ghostwriter 实现。[La Forge 的说明](https://www.ubisoft.com/en-us/studio/laforge/news/7CCHPeIseXSW1P49L4XZ7l/generating-video-game-scripts-with-style)还指出，旁白文本不适合用词风格建模，其中游戏特定名称可能使输出产生偏差。

**拟议的审查模板。**  从冻结且已完成权利清理的候选池，以及项目自有角色材料开始。保留场景事实、角色/交互简报、参考版本、原始候选、相对偏好和编辑后采纳的台词。允许同时拒绝两个候选。纳入不符合角色口吻但符合世界观的台词、流畅但不符合场景的台词，以及旁白案例。记录分歧及其原因，而非强行将每一对文本排出质量高低。

分别审查含义、角色口吻、场景一致性和交付约束。将采纳版本带入[本地化与分支检查](production-work-orders.md#6-compile-localization-shape-text-and-inspect-accessible-ui)。后续生产率比较应在独立的最终质量判断之外，计入阅读、丢弃、改写和下游返工。本模板尚未执行；公开可阅读不等于 Ubisoft 的脚本、模型或输出具有可执行可用性或复用许可。

## 构建、交付与联网

### Nakama

一款提供身份、社交功能、存储与多人游戏能力的游戏后端。客户端 SDK 与服务器运行时支持后端逻辑和权威多人游戏。运行服务器仍需数据库运维与授权设计。托管服务和企业功能独立于开源服务器及 SDK。

一手来源：[官方文档或代码仓库](https://heroiclabs.com/docs/nakama/)；[Nakama 许可与功能](https://heroiclabs.com/nakama/)；[Nakama JS SDK](https://github.com/heroiclabs/nakama-js)

### Colyseus

一款提供匹配与状态同步的房间式多人游戏框架。该 MIT 许可框架采用增量编码的状态同步及可配置传输，包括 WebSockets。玩法验证仍由应用代码负责。水平扩展会引入 Redis、负载均衡等基础设施；仅有状态同步并不能防作弊。

一手来源：[官方文档或代码仓库](https://github.com/colyseus/colyseus)；[Colyseus 传输](https://docs.colyseus.io/server/transport)

### Agones

用于专用游戏服务器集群的 Kubernetes 编排系统。Agones 围绕容器化游戏服务器管理服务器分配、集群与自动扩缩容。它需要 Kubernetes 运维及兼容的服务器生命周期。它不实现玩法联网、匹配策略或完整的玩家后端。

一手来源：[官方文档或代码仓库](https://agones.dev/site/docs/overview/)；[Agones 代码仓库](https://github.com/agones-dev/agones)

### GameNetworkingSockets

一款用于可靠及不可靠加密消息的原生网络库。该 C/C++ 库提供传输原语，而非实体序列化、增量编码或压缩。应用仍需设计信令与游戏协议。不应假定每一种独立部署都能使用 Steam 身份验证和 Steam Datagram Relay。

一手来源：[官方文档或代码仓库](https://github.com/ValveSoftware/GameNetworkingSockets)

### butler

itch.io 的命令行构建上传器与二进制补丁工具包。离线补丁工具可使用暂存检查点重建构建。原地打补丁会跳过对未改动文件的验证，除非另行检查。恢复时应保留精确的基线，并区分本地补丁生成与经过身份验证的上传或发布。

一手来源：[官方文档或代码仓库](https://itch.io/docs/butler/)；[离线补丁](https://itch.io/docs/butler/offline.html)

### SteamPipe / Steamworks 构建交付

Steam 的 depot 构建、测试分支及内容更新分发系统。上传指南涵盖构建脚本、回滚及基于分块的更新。即使内容改动很小，打包文件的布局也可能增加补丁体积及客户端磁盘工作量。上传与发布需要 Steamworks 合作伙伴权限；能访问文档并不意味着获准发布。

一手来源：[官方文档或代码仓库](https://partner.steamgames.com/doc/sdk/uploading)

### GNU gettext

用于提取、验证和编译消息资源的翻译目录工具。msgfmt 可以检查 PO 目录并将其编译为 MO 文件。格式检查并不能证明翻译覆盖率或语言质量。应保留区域语言、复数规则、消息标识符及目录来源；未翻译或模糊条目需要独立验收规则。

一手来源：[官方文档或代码仓库](https://www.gnu.org/software/gettext/manual/gettext.html)

## 世界资源

### Infinigen 分阶段生成与导出验收

将程序化生成接入[资源传输工作流](production-work-orders.md#1-export-an-authored-asset-import-it-and-audit-dependencies)，在每个阶段检查输出身份和导入后的行为。

#### 固定版本与版本边界

下列全部仓库链接均固定至所检查的 main 提交 [224598d4a2ff95b4fc928e72c222598b7122c698](https://github.com/princeton-vl/infinigen/commit/224598d4a2ff95b4fc928e72c222598b7122c698)，提交日期为 2026-10-14。该代码树同时包含旧版 `infinigen` [1.19.1](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/__init__.py) 与 `infinigen2` [2.0.0a3](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen2/__init__.py)。以下契约涉及该提交中保留的旧版场景管理器和 `infinigen.tools.export`，并不宣称新 V2 管线也遵循相同契约。

[V2 指南](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/docs/source/Infinigen2.md)将 2.0 称为预览版，仅覆盖有限的室内对象/布局，而非完整覆盖旧系统资源。其 CLI 将生成器和导出器串联起来，作者建议固定 alpha 版本，因为接口可能变化。不要将旧版命令替换为 V2 CLI 后，仍声称具有相同的复现或导出契约。

#### 输入与可复现性

旧版场景生成接受场景种子、有序的场景 Gin 配置/覆盖项，以及任务/输入/输出路径。数据集管理另行接受管线配置/覆盖项，以及显式场景种子或用于选择场景种子的元种子。场景配置与调度器配置是不同输入。[配置指南](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/docs/source/ConfiguringInfinigen.md)解释了覆盖顺序、依赖相机的网格细节和对象填充，以及粗生成 → 填充 → 渲染/真值的任务划分；精细地形和渲染任务可跨视图/时间块重复执行。应将相机/帧/细节设置作为生成输入保留，而不只是展示设置。

尤其需要注意，固定版本的 [Hello World 指南](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/docs/source/HelloWorld.md)仍警告，在许多平台上，相同命令可能产生不同的场景布局、运行时间及内存用量。这是文档中的警告，并非此处执行过复现实验。因此固定种子是身份/来源字段，而非逐位或几何确定性的证明。

旧版任务入口显式断言 Blender 为 `4.2.0`；包也固定了 `bpy==4.2.0`。记录代码 SHA 及安装版本、Blender/Python/依赖版本、平台、硬件、完整命令、配置内容/顺序、覆盖项、种子，以及相机轨迹。这些是拟议的验收记录，并非声称存在内置清单。[任务源码](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/core/execute_tasks.py#L347-L378)、[包声明](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/pyproject.toml)。

#### 输出、复用与恢复

- [任务实现](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/core/execute_tasks.py#L179-L307)为生成阶段写入 `scene.blend`、`MaskTag.json`、`version.txt` 和 `polycounts.txt`。后续任务加载之前的 blend/标签文件。它可以在任务目录间对 `assets` 目录及 `.glb`/`.b_displacement.npy` 中间文件建立符号链接。仅复制 `.blend` 不能证明交接包自包含：应解析并保留链接依赖。
- 对于具名任务，入口先写入 `START_<task>`，任务函数返回后再写入 `FINISH_<task>`，之后写入 `operative_gin_<task>.txt`。完成标记是任务已返回的证据；它不验证材质保真度、文件完整性或引擎可用性。尤其是，生效配置是在完成标记之后写入的。[源码](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/core/execute_tasks.py#L347-L378)。
- CLI 将 `--use_existing` 记录为尽力而为的恢复。管理器要求 `scenes_db.csv`，在存在 configs 列时恢复各个种子的场景配置，跳过没有日志的目录，并将已有 `logs/FINISH_*` 标记视为成功作业。所检查的这种重建不会检查产物哈希，也不会检查这些标记是否对应已变更的源码/配置。复用标记前应保留原始运行并验证产物；不要将其宣传为内容寻址缓存。[恢复实现](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/datagen/manage_jobs.py#L223-L263)、[CLI](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/datagen/manage_jobs.py#L832-L876)。
- 清理前保留场景数据库、日志、配置、中间依赖清单和最终产物。清理模式包括 `big_files`、`except_logs` 和 `all`；即使清理设为 `none`，上传管线也可能删除文件。[管理器检查](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/datagen/manage_jobs.py#L938-L974)。

#### 导出验收

[官方旧版导出器指南](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/docs/source/ExportingToExternalFileFormats.md)描述了在标准 Blender 导出前烘焙程序化材质/几何的做法。它支持 OBJ/FBX/STL/PLY/USDC 选项、纹理分辨率和单对象导出；顶点色仅限 FBX/PLY。文档指出，此工作流中的完整场景导出仅支持 USDC。其他格式会将密集实例实体化，并可能耗尽内存；树木也包含实例。这是 Infinigen 工作流的支持限制，而非普遍宣称其他格式均无法表示实例。

指南将材质烘焙限定为反照率、粗糙度、法线和金属度。它警告透明度问题、其他材质参数丢失、FBX UV 失败，以及动画导出未经测试/不受支持。有限纹理分辨率会造成损失。导出文件存在并不等于视觉等价。

拟议的验收关卡：在目标引擎中重新打开；验证依赖/纹理解析、变换与缩放、几何/实例数量、UV/法线、三角形和纹理预算，并对照 Blender 参考验证代表性外观。明确标注丢失的透明度/自发光/其他通道，以及不受支持的动画。单独评定碰撞、LOD、导航与玩法。保留源 blend/依赖，以及导出文件及其哈希的清单。这些引擎测试在此尚未执行。

#### 权利边界

固定版本的 [LICENSE](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/LICENSE)规定了代码/源码与二进制再分发的 BSD-3-Clause 条件。[README 致谢](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/README.md#L231-L264)还讨论了依赖，以及部分在 CC0 下获得的程序化代码。所检查的两处文字都没有明确、独立地授予生成输出的所有权/许可。不要将所有导出资源标为 CC0，也不要根据代码标签自动继承 BSD。应将代码许可与生成输出权利、添加资源的来源，以及任何预生成数据集条款分别记录。在所检查的官方来源中未找到独立的生成输出条款；这是来源覆盖范围的局限，并非认定使用被禁止，也不是法律判断。

### Gaea

一款支持无界面构建自动化的程序化地形编辑器。Build Swarm 可以使用公开变量文件与变异种子，生成可重复的地形变体。自动化前先在编辑器中验证图；这不能证明可以任意改写文档。构建权利与激活取决于所选版本及部署方式。

一手来源：[官方文档或代码仓库](https://docs.gaea.app/developers/automation/index.html)；[Gaea 许可类型](https://docs.gaea.app/install/license-management/license-types.html)

### World Machine

一款基于节点、使用 XML 驱动生产构建命令的地形工具。Professional Edition 附录描述了通过自动化加载项目、修改标量变量、构建及导出。这是较早的文档，因此应在目标版本中确认语法和版本支持，而非假定存在通用的当前 CLI。

一手来源：[官方文档或代码仓库](https://help.world-machine.com/topic/world-machine-professional-edition-addendum/)

### SpeedTree

结合程序化生成器与手动编辑的植被建模工具。适用于游戏场景中的树木及植被资源。较早的编译器文档描述了网格导出和导出器 SDK，但并未确立当前 Modeler 的创作 CLI。不要将 SDK 参考应用的命令混同于编辑器自动化。

一手来源：[官方文档或代码仓库](https://unity.com/products/speedtree)；[SpeedTree Compiler 网格导出（旧版）](https://docs.speedtree.com/doku.php?id=compiler_mesh_exporting)

### 程序化布局约束与求解器判定

在导出及[导航测试](engine-operation-contracts.md#navigation-after-procedural-world-edits)前检查生成的拓扑。下列 WFC 与 DeBroglie 接口是独立方案，并非声称 Dead Cells 使用了这些工具。

#### 精确的上游范围

- **mxgmn/WaveFunctionCollapse：** 提交 `de7d22e705e816b62b4d613199d0463820fcaef3`，2026-03-22。所检查的[项目文件](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/WaveFunctionCollapse.csproj)以 net10.0 和 ImageSharp 3.1.12 为目标；未声明包版本。
- **BorisTheBrave/DeBroglie：** 提交 `27b37fa7a54f7c532b52634622f36eddd2a3c7da`，2025-12-21。所检查的[项目文件](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/DeBroglie.csproj)声明版本 2.1.0、程序集/文件版本 2.1.0.0 和 netstandard2.0。这用于标识代码树，而非验证过的已安装版本。

#### 上游契约与静态观察

**WFC 的完成不能仅凭其布尔值判断。** [README](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/README.md#L6-L21)定义了局部图案相似性；简单瓦片传播强制执行邻接关系。在 [Model.Run](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/Model.cs#L73-L97) 中，传播失败会返回 false，但耗尽非负迭代上限也会返回 true，此时可能尚未完成观测赋值。因此 [Program](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/Program.cs#L49-L66) 可能打印 DONE 并保存未完成的结果。[OverlappingModel.Save](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/OverlappingModel.cs#L105-L148)支持对未决可能性取平均值。因此 PNG 不是已求解瓦片的见证。调用方为每张截图最多尝试十次；显式指定种子时，每次重试使用相同的 seedStart+i，而非新种子。一次尝试失败不证明约束系统不可满足。

**DeBroglie 保留三种状态。** [Resolution](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/Resolution.cs)区分 Decided、Undecided 和 Contradiction。[输出转换](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/TilePropagator.cs#L671-L704)可能对未决单元格和矛盾单元格填入相同默认值；应保留状态和可能性集合，而不只是转换后的地图。[Step/Run](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/TilePropagator.cs#L407-L430)区分一次选择（可能包含多次回溯）与循环至终态。两者的签名都不提供墙钟时间截止期限。

**固定实际搜索配置。** [文字指南](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/docs/articles/features.md#L117-L124)描述了选择启用回溯。然而，此代码树的[布尔构造函数和策略工厂](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/TilePropagator.cs#L37-L100)将 false 映射为 Backjump，并创建 PatienceBackjumpPolicy。[核心构造函数](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/Wfc/WavePropagator.cs#L72-L90)在策略非 null 时启用回溯。[历史裁剪与恢复](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/Wfc/WavePropagator.cs#L395-L468)仅在 MaxBacktrackDepth>0 时施加深度上限；默认零禁用该上限，而非禁用策略。新建的 [TilePropagatorOptions](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/TilePropagatorOptions.cs)具有枚举默认值 BacktrackType.None，不提供策略。false→Backjump 这一观察仅针对布尔重载，并非库的通用默认值。有界历史可能丢弃较早的选择，因此终态 Contradiction 不能自动转化为全局不可满足的断言。这些是静态观察，而非已复现的缺陷。

**连通性需要创作语义。** [路径约束](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/docs/articles/path_constraints.md#L1-L40)使用邻接路线。PathSpec 将相邻路径瓦片视为可通行；EdgedPathSpec 还要求出口匹配。RelevantTiles/RelevantCells 决定哪些对象必须连通：仅选择起点和终点，会使其他分量不受约束。[ConnectedConstraint](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/Constraints/Path/ConnectedConstraint.cs#L42-L77)报告相互矛盾的必需分量。[固定瓦片/数量约束](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/docs/articles/constraints.md)提供进一步的创作接口。它们都不能单独确立先钥匙后锁的推进、遭遇节奏或控制器通行能力。

#### 拟议的 GameMap 任务夹具，尚未实现或执行

1. 保留源码/运行时版本、样本/图块集哈希及权利、拓扑/掩码/尺寸、周期性、旋转、邻接/出口表、权重、固定/禁用单元格、必需房间数及相关端点。区分硬约束与审美偏好。记录每次尝试的 RNG 实现/种子、构造函数重载、搜索策略、深度/步数/时间/内存上限及终止原因。
2. 接受已求解见证前，要求完整赋值以及独立的约束验证。区分尝试矛盾、未决/部分状态、预算耗尽、取消及执行错误。后几种操作结果是拟议的包装层状态，而非上游枚举值。保留失败尝试与部分证据；绝不能根据筛选出的成功图像报告所有种子均已求解。只有在声明的模型和约束下有充分依据的穷尽搜索，才能作出不可满足的断言。
3. 指定一个小型可满足对照案例；互不兼容的固定房间/邻接要求；局部合法但不连通的起点/终点；路径瓦片匹配但出口不匹配的案例；以及有限上限下的未决输出。分别测试重放显式失败种子与更换种子。断言没有不完整输出能通过验收。
4. 添加创作的钥匙/锁推进图与必需/可选房间用途，随后独立于几何连通性验证生成的玩法状态序列。将已验收布局身份关联到现有碰撞体、最新导航和真实控制器通行关卡。保留刻意设置的窄门和错误楼层变体。地图连通或视觉上合理，仍不足以证明预期体验。

尚未确立引擎绑定、运行时恢复、跨版本确定性或经测量的创作者收益。

## 音频与无障碍证据

### FFmpeg 与 ffprobe

命令行媒体转换与音视频检查工具。使用 ebur128、astats 和 silencedetect 进行限定范围的音频测量，并使用 ffprobe 检查流与帧时序。真峰值扫描需要显式启用并依赖 libswresample；极值计数不等于削波样本数。时长相同不能证明音画同步，检测到静音也不能验证循环接缝。

一手来源：[官方文档或代码仓库](https://ffmpeg.org/ffmpeg-filters.html)；[ffprobe 手册](https://ffmpeg.org/ffprobe.html)

### axe-core

一款适用于网站和基于 HTML 的游戏界面的无障碍测试引擎。结果区分违规、通过、未完成检查和不适用规则。未完成结果需要进一步审查；排除元素和禁用规则会降低覆盖率。扫描不能认证无障碍性，也无法检查任意玩法像素、音频和原生编辑器界面。

一手来源：[官方文档或代码仓库](https://github.com/dequelabs/axe-core)；[所检查提交的 API](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/doc/API.md)

## 待实现的验收检查

- 音频：保留原始媒体哈希、解码器/构建配置、声道布局、采样率及完整分析区间。显式测量真峰值；不要将极值计数重新标为削波。阈值取决于交付要求。循环需要首尾边界分析，并在实际编解码器/导入路径中试听。
- 时序：保留有理数时基、原始时间戳及事件身份。音画同步需要在多个时点使用共同时钟的音频和视觉标记，以区分偏移和漂移。ffprobe 元数据与相同时长不能确立听觉同步。
- UI 与本地化：自动化 DOM 无障碍检查仍将人工、辅助技术、原生控件及画布评估留作未解决事项。字体塑形、字形栅格化、消息格式化和翻译覆盖率是不同层面。
- 构建：保留精确输入版本、依赖清单、编译器诊断及输出哈希。完成导出并不能确立运行时兼容性、存档兼容性或成功交付。发布权限与破坏性更新需要另行授权。

这些是拟议的工作流检查，并非已验证的 GameMap 适配器或上游保证。来源日期表示审查日期；滚动更新的文档和账户特定许可必须在使用前重新核查。
