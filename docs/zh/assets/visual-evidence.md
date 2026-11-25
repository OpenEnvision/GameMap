# 视觉证据与智能体运行框架研究

智能体修改角色材质、截一张图，就宣称修复完成。首先要确认图像展示的是修改后的场景。在 Godot 4.5 中，离屏 [SubViewport](https://docs.godotengine.org/en/4.5/classes/class_subviewport.html) 默认仅在可见时更新，因此捕获可能遗漏预定变化。下方的回读契约说明如何获取并保留正确的像素。

检查捕获流程时，加入一个随测试步骤变化的临时可见标记。记录场景修订版、目标视口、步骤标识和原始图像。将帧交给视觉评判前，先要求预期标记出现且尺寸正确；将过期或空白捕获归为观察失败。标记应位于外观评分区域之外，或另拍一张资格检查帧。

捕获有效后，再为图像配上问题所需的动作和状态证据：修改材质颜色、命中敌人和保存场景需要不同检查。保留原始图像及其裁剪或标注派生图。[测试库](../reference/testing-library.md)中的项目可以提供完成这项工作的受控场景。

有关具体的选择器、记忆、时间验证及资产反馈机制，参见[视觉反馈契约档案](visual-feedback.md)。

## 解读证据

来源核查确立的是所引作者记录了什么。它不能确立工具已安装、适配器可用、结果已复现，或适用于目标游戏。代码、权重、数据集及托管服务条款可能不同。下文许可说明描述的是所检查的来源，而非完整的许可审查决定。

将原始产物与面向模型的派生产物一同保留。记录源帧/时间基准、图像尺寸及裁剪、相机/深度约定、颜色变换、对象 ID 和引擎构建。截图相似度分数不能证明交互成功；推断的掩码、轨迹和深度不能替代权威引擎状态。空观测和缺失帧必须作为可见的失败情况保留。

## 视觉观测与产物保真度

### OpenCV 运动与跟踪

经典图像对齐及稀疏/稠密光流基础组件。

- **文档记录的接口与拟议用途：**  calcOpticalFlowPyrLK 返回跟踪点/状态/误差；calcOpticalFlowFarneback 计算稠密光流。拟议契约记录帧对 ID、像素坐标、缩放映射及经过时间。
- **限制：**  光流是推断的图像位移，而非权威对象/世界速度；遮挡和相机运动需分别处理。
- **来源条款：**  未在这些 API 页面中核查许可证。
- **一手来源：**  [OpenCV 跟踪](https://docs.opencv.org/4.13.0/dc/d6b/group__video__track.html)

### OpenCV 标定与几何

用于跨相机证据的投影/标定术语和工具。

- **文档记录的接口与拟议用途：**  仅在具备明确内参、畸变及世界到相机变换时使用 calibration/solvePnP/projectPoints。拟议适配器将裁剪/缩放传播到内参中。
- **限制：**  推断标定不同于引擎提供的矩阵；缺少约定时应拒绝，而不是默默地将矩阵视为可互换。
- **来源条款：**  未在此 API 页面中核查许可证。
- **一手来源：**  [OpenCV 标定](https://docs.opencv.org/4.13.0/d9/d0c/group__calib3d.html)

### PySceneDetect

镜头边界检测与代表帧提取。

- **文档记录的接口与拟议用途：**  文档提供无界面包；分割需要 FFmpeg 或 mkvmerge。使用 detect-content/detect-adaptive，再使用 list-scenes/save-images。
- **限制：**  镜头边界是视觉变化提议，不保证是游戏事件。记录检测器参数及原始时间戳。
- **来源条款：**  未在打开的文档中核查许可证。
- **一手来源：**  [PySceneDetect 文档](https://www.scenedetect.com/docs/latest/)

### Pixelmatch

用于确定性截图回归的小型像素差异基线。

- **文档记录的接口与拟议用途：**  Node/浏览器类型化数组接口；PNG CLI。比较前统一视口及捕获条件。
- **限制：**  阈值指逐像素感知差异，而非允许不匹配的像素比例。排除抗锯齿会改变失败敏感性。
- **来源条款：**  上游仓库显示为 ISC。
- **一手来源：**  [Pixelmatch README](https://github.com/mapbox/pixelmatch)

### OpenImageIO / oiiotool

生产级图像元数据、转换与数值差异运算。

- **文档记录的接口与拟议用途：**  使用 oiiotool inputA inputB --diff 和 --absdiff 进行诊断；在产物中保留通道名、数据类型及颜色解释。
- **限制：**  图像差异检查通过不能确立功能等价；阈值及颜色归一化是实验输入。
- **来源条款：**  当前上游原创代码为 Apache-2.0；第三方组件不同；文档为 CC-BY-4.0。
- **一手来源：**  [oiiotool 手册](https://openimageio.readthedocs.io/en/latest/oiiotool.html)；[OpenImageIO README](https://github.com/AcademySoftwareFoundation/OpenImageIO)

### 引擎帧回读与捕获所有权

来源核查于 2026-10-18；未进行完整复现。Unity 6000.0 和 Godot 4.5 链接标识文档版本，而非不可变的引擎补丁/提交固定版本或已安装运行时。这些所有权/就绪性契约先于[通道专属产物检查](#render-pass-and-matte-artifacts)和视觉质量评分。它们不能确立像素确定性、已实现的适配器或实测 GPU 成本。

#### Unity 6000.0：两个独立的就绪边界

1. **已渲染截图 → GPU 目标。**  `ScreenCapture.CaptureScreenshotIntoRenderTexture(renderTexture)` 捕获游戏视图。官方契约要求帧渲染已完成；其示例等待 `WaitForEndOfFrame`，分配屏幕宽/高的 RenderTexture，然后以 `TextureFormat.RGBA32` 请求 mip 0。异步回读减少主线程工作；捕获调用本身不返回 CPU 像素。[ScreenCapture API](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ScreenCapture.CaptureScreenshotIntoRenderTexture.html)
2. **GPU 目标 → 已完成的 CPU 回读。**  请求逐帧更新。成功数据仅可访问一帧，Unity 在下一帧释放请求。轮询 `done`，然后在读取前要求 `!hasError`；释放也会使 `hasError` 为 true。结果元数据包含宽度、高度、深度、层数及每层字节数。适配器含义：立即将成功数据复制/消费为评估器拥有的产物；不要将请求句柄排队留待任意较晚时刻编码。[请求生命周期](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rendering.AsyncGPUReadbackRequest.html)
3. 如果尚未完成或请求已释放，`GetData<T>(layer)` 抛出 `InvalidOperationException`。其 layer 参数选择体积/立方体/数组纹理的切片。调用 `GetData<byte>()` 不是像素格式转换 API：在请求时选择输出格式，并记录所选层。[GetData](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rendering.AsyncGPUReadbackRequest.GetData.html)

##### 资源与尺寸义务

- `AsyncGPUReadback.Request` 自动将 GPU 存储格式转换为指定目标格式。纹理范围依据实际源尺寸检查，包括因质量设置而缩减的纹理尺寸。使用 `SystemInfo.IsFormatSupported(..., GraphicsFormatUsage.ReadPixels)` 检查格式支持。回读完成前，不得通过 `ReleaseTemporary` 归还临时 RenderTexture。纹理区域使用像素坐标；缓冲区大小/偏移使用字节。[请求格式、范围和临时目标规则](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rendering.AsyncGPUReadback.Request.html)
- 替代方案 `RequestIntoNativeArray` 写入调用方提供的存储；完成前不得释放该数组及其底层内存。这是独立的所有权路径，而非允许无限期保留普通请求借用结果的许可。[调用方拥有的输出](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rendering.AsyncGPUReadback.RequestIntoNativeArray.html)
- 从 Game 视图切换至 Scene 视图时，`WaitForEndOfFrame` 可能在 Editor 中冻结，并且它不在 Editor 批处理模式运行。因此，文档中的截图协程不是经验证的无界面 CI 配方。区分 Editor 批处理模式与构建后的 player；这些文档不能确立所有 player/无界面变体。[WaitForEndOfFrame 执行限制](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/WaitForEndOfFrame.html)

**拟议的适配器不变量（推断）：**  将每个捕获 ID 绑定到目标身份、尺寸、mip/层、目标格式及源帧；保持目标租用直到完成；在请求过期前复制成功字节；分别标记渲染未就绪、回读错误及过期/已释放结果失败。绝不将过期成功结果复用为下一帧。对于选定的单层紧密排列 RGBA32 字节产物，应验证预期的宽 × 高 × 4 及实际元数据，而非假定每个请求都具有此布局。

#### Godot 4.5：绘制后信号不是异步回读句柄

- `RenderingServer.frame_post_draw` 在服务器更新所有视口后的帧末触发。`Viewport.get_texture()` 警告，过早访问，尤其从 `_ready()` 访问，可能得到黑色或过期内容，并建议先等待该信号再获取和保存图像。这是文档记录的帧就绪边界。它没有声称截图包含操作系统/窗口装饰或其他窗口。[RenderingServer 信号](https://docs.godotengine.org/en/4.5/classes/class_renderingserver.html#class-renderingserver-signal-frame-post-draw)、[Viewport 纹理就绪性](https://docs.godotengine.org/en/4.5/classes/class_viewport.html#class-viewport-method-get-texture)
- `Texture2D.get_image()` 每次调用都创建新的 Image 副本，纹理无效时返回 null，并从 GPU 内存获取数据。文档警告不要频繁逐帧使用，尤其对大纹理。不同于 Unity 的请求结果，此 API 文档中的返回值是复制的 Image，没有记录一帧后过期。文档未将其描述为非阻塞异步回读 API。[CPU 图像副本与无效结果](https://docs.godotengine.org/en/4.5/classes/class_texture2d.html#class-texture2d-method-get-image)
- `ViewportTexture` 是场景局部的，可能在其场景根节点就绪前返回不正确数据。使用 `use_hdr_2d` 时，其数据是线性空间的 HDR；文档描述了转换为 RGBA8 以及从线性转为 sRGB，以用于伽马空间显示。不要默默地将原始 HDR 图像与 sRGB 参考图比较。[ViewportTexture 场景与颜色契约](https://docs.godotengine.org/en/4.5/classes/class_viewporttexture.html)
- SubViewport 默认更新策略为 `UPDATE_WHEN_VISIBLE`；`UPDATE_ONCE` 更新一次后变为禁用。其宽和高必须各至少两像素。当其父节点为启用拉伸的 SubViewportContainer 时，不能手动更改尺寸。因此，仅有全局绘制后信号并不能证明不可见/默认目标或禁用目标渲染了新内容。[SubViewport 更新模式与尺寸](https://docs.godotengine.org/en/4.5/classes/class_subviewport.html)

**拟议的适配器不变量（推断）：**  标识确切的根/SubViewport 及其场景，确认目标已就绪/有效以及预期更新策略，等待绘制后信号，获取 Image，拒绝 null/空或尺寸错误的输出，并记录实际格式/颜色变换。对于离屏单次捕获，应明确启用 `UPDATE_ONCE`，而非依赖可见性。在捕获期间保持场景/视口存活；保留结果 Image 用于后续评估。所引契约不承诺安全的并发拆除、固定 GPU 延迟或像素确定性。

#### 拟议的捕获有效性检查

将其视为拟议的集成测试清单，而非已经运行的测试：

1. 渲染标记或已知的场景状态变化可区分请求帧 N 与过期帧 N−1；仅有请求 ID 不够。
2. Unity 测试覆盖在过期前复制成功结果、`GetData` 前失败、防止过早释放目标、尺寸变化及不支持的输出格式；记录引擎补丁、渲染管线和图形后端。
3. Godot 测试覆盖不可见 SubViewport、重新启用单次更新、场景未就绪/无效图像、容器驱动的尺寸及 HDR 转换；记录引擎补丁、渲染器和视口路径。
4. 持久保存图像及来源信息：引擎/构建、捕获阶段、目标、请求/观测尺寸、格式、色彩空间/归一化、帧/时间戳、就绪/错误状态及产物哈希。仅在捕获有效性检查通过后评估玩法或美学。

### 渲染通道与遮罩产物

来源核查于 2026-10-18；未进行完整复现。除非明确标为 4.2，否则 Blender 证据对应 4.5 LTS；手册页面仍可变更。这补充[材质/编译器验收](validation.md#materialx-graph-generated-code-and-compiler-verdicts)，而不是添加已执行的渲染器，或声称等同于游戏引擎缓冲区。

#### 文档记录的通道语义

根据 [Blender 4.5 通道](https://docs.blender.org/manual/en/4.5/render/layers/passes.html)：

- Z 测量最近可见表面的距离；Mist 将距离重新映射到 0–1。使用景深或运动模糊时，Z 可能有噪声。Z、Position、Object Index 和 Material Index 没有抗锯齿。
- Position 和 Normal 位于世界空间。Vector 包含相邻帧的两个屏幕空间二维向量，启用运动模糊时被禁用。
- Cycles Alpha Threshold 决定哪些表面写入指定数据通道。
- EEVEE 辅助通道不包含景深/运动模糊；Blended 表面仅出现在 Combined/Transparent 中。
- Cryptomatte 支持逐像素多个贡献者、透明度以及 Cycles 模糊/景深。每个编号的 Cryptomatte RGBA 层在每个像素存储两组按排名排列的 ID/覆盖率对。Asset 按父级分组，而非按 Blender 资产库身份分组。
- AOV 名称不能与已启用通道冲突。Color 保存向量或颜色；Value 保存标量。EEVEE 分别允许 16 个。

[Blender 4.5 ViewLayer API](https://docs.blender.org/api/4.5/bpy.types.ViewLayer.html)公开 pass_alpha_threshold、pass_cryptomatte_depth（2–16，默认 6）、通道启用标志和 update_render_passes()。这些字段是应记录的具体配置，而非从预览中推断；该方法重新查询已启用的引擎通道。

[Blender 4.2 AOV Output](https://docs.blender.org/manual/en/4.2/render/shader_nodes/output/aov.html)记录了输出节点与 AOV 面板之间的精确名称匹配，以及 Material/World 着色器支持。此来源有意使用 4.2，并非未经测试的 4.5 行为变化的证据。

[Blender 4.5 Cryptomatte Node](https://docs.blender.org/manual/sr/4.5/compositing/types/mask/cryptomatte.html)区分 Image、Matte 和 Pick 输出：Pick 是选择可视化，而 Matte 是遮罩。它接受多层 OpenEXR，但不支持旁车清单或 Volume Objects。官方塞尔维亚语页面的正文为英语；英语端点检索失败。

#### 导出与精确值元数据

[Blender 4.5 图像格式，官方法语页面](https://docs.blender.org/manual/fr/4.5/files/media/image_formats.html)区分半精度/全精度浮点 OpenEXR。Save As Render 为 PNG 等显示格式应用显示/视图变换，而中间 OpenEXR 使用渲染输出色彩空间。不要将显示截图当作数值通道证据。

[Psyop Cryptomatte Nuke 文档](https://github.com/Psyop/Cryptomatte/blob/968d5e4b6171e29ba5f89d554117132a164e747e/docs/nuke.md)在其 Encryptomatte 工作流中要求导出带全部元数据的 32 位 EXR。它明确警告，在遮罩提取前进行重采样、镜头畸变和代理处理会破坏精确编码值；应改为变换提取后的遮罩。缺少清单条目可能导致得到数字选择而不是名称。这有力支持检查通道、元数据及往返选择，而不是比较彩色预览。

**Cryptomatte 规范跟进，2026-10-19。**  此前无法访问的官方 [v1.2.0 规范](https://github.com/Psyop/Cryptomatte/blob/968d5e4b6171e29ba5f89d554117132a164e747e/specification/cryptomatte_specification.pdf)现已在与 Nuke 文档相同的固定修订上检索到。它定义交换格式，而非经测试的 Blender/Nuke 行为：

- **打包与预览（第 2 页）：**  每个编号的 RGBA 层在每个像素存储两组 ID/覆盖率对：R/G 对应一个排名，B/A 对应下一个。更多编号层保留后续排名。未编号的预览通道已弃用，可能为黑色或不存在；其外观不是判断格式有效性的依据。
- **必需元数据与可选清单（第 2–5 页）：**  每个 Cryptomatte 类型都要求 `name`、`hash` 和 `conversion` 元数据。嵌入的 `manifest` 或旁车 `manif_file` 为可选项；规范指出，解码器不应依赖清单来准确提取遮罩。因此缺少名称不同于缺少必需格式元数据。该格式允许相对于 EXR 目录、不带前导 `./` 或 `../` 的旁车路径；这并不消除所引 Blender 读取器的旁车限制。
- **编码 ID，而非显示颜色（第 5–7 页）：**  输入字符串以 UTF-8 字节形式，使用 MurmurHash3 的 32 位 x86 变体进行哈希。浮点转换除将指数调整到 1–254 之外保留哈希位；它不是整数到浮点数的数值类型转换。相同输入字符串有意合并为同一 ID 分组，而非独立的引擎对象身份。
- **排名并非普遍按覆盖率降序（第 8 页）：**  所描述的过滤器将每个 ID 的样本权重按总样本权重归一化，然后按覆盖率排名。同一规范明确允许其他优先级标准。较低覆盖率的贡献者排在前面，本身不能证明产物无效。

这些恢复获取的语义细化了现有产物检查；未运行解码器、渲染器、EXR 往返或互操作性测试。

#### 拟议的产物检查门槛

任务：检查提供的多层渲染产物及配置清单，识别哪些请求的下游操作有效，并生成通道专属诊断报告。将渲染器/版本特定语义与通用图像检查分开。

建议的测试样例类别：

1. 静态前景轮廓和已知世界空间参考点：区分数据空间错误与预期硬边。
2. 不透明对象前的透明卡片，不同阈值和渲染方法：检测配置/可见性不匹配。
3. 已知的左/右/上/下运动及相机运动：标定通道顺序、符号、像素单位和帧参考。所引手册并未确立精确的 XY/ZW 顺序或符号；不要杜撰这些常量。
4. 重叠的模糊贡献者，搭配足够/不足的 Cryptomatte 排名层数：区分排名截断与解码器失败。
5. 命名标量/向量 AOV，故意缺失/拼错的名称：检测不完整连接和类型不匹配。
6. 原始 EXR 与去除元数据、转为半精度或重采样的派生版本：测试产物完整性及命名选择往返。这些变异只是提议，并未在此演示。

预期证据包：应用版本、引擎、帧/相机、运动/DOF 设置、alpha 阈值、通道标志、AOV 名称/类型、Cryptomatte 深度、通道清单/数据类型、元数据可用性、导出变换/压缩、原始产物哈希及数值采样位置。保留原始文件；预览是辅助证据。

判定依据的形式：区分不支持的配置、缺失的产物/通道、语义不匹配及测得差异。只有在坐标/帧/编码契约确立后才报告原始数值比较。独立于最终渲染图相似度，验证解码遮罩和命名选择。在测试样例确立数值容差之前，不应断言任何容差。

#### 限制

这里没有来源证明精确的 Vector 分量顺序/符号、背景 Z 哨兵值、所有引擎特定 AOV 过滤行为，或逐编解码器的 Cryptomatte 安全性。需通过版本固定的实现源码或后续获授权测试样例解决。恢复获取的 v1.2.0 规范确立的是 Cryptomatte 交换格式，而非渲染器特定支持或经测试的解码器互操作性。不声称 Blender 通道与游戏引擎缓冲区普遍等价。

### BlenderProc 多视图捕获契约

核查于 2026-10-19。从项目自有网格/场景到按相机索引的图像及对象关联证据的已发布源码路径。现有 GameMap 章节涵盖 Blender 通道语义、通用相机元数据和学习式多视图评判器；本笔记补充该流水线实际的关联、覆盖及持久保存边界。它是捕获基础设施，而非游戏创作改善的证据或新的验收评分器。

**源码固定版本：**  DLR-RM/BlenderProc `76bd8b82ee19489843578ff045298642197bf883`，核查日期返回的 main（提交日期为 2026-01-07）。`version.py` 标为 2.8.0，但此 main 提交不是发布标签。GitHub 的最新发布端点返回于 2024-10-22 发布的 [v.2.8.0](https://github.com/DLR-RM/BlenderProc/releases/tag/v.2.8.0)。下文声明使用固定源码，而非已安装行为。未进行 Blender、安装器、渲染器、模型、基准或数据的下载/执行；仅阅读文档/源码文本。

#### 1. 一个资产可变成多个网格实例；视图是显式帧

[ObjectLoader](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/loader/ObjectLoader.py#L15-L113)返回导入的 MeshObjects 列表，并为每个对象赋予 `model_path` 自定义属性。因此一个输入文件可变成多个渲染实例；源路径不是不可变的资产 ID。随附的[相机采样示例](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/examples/basics/camera_sampling/main.py)加载调用方选择的 OBJ，计算兴趣点，在其上方采样五个相机位置，注册位姿，渲染法线/深度/RGB 并写入 HDF5。它展示组合方式，而非完整资产检查。

[`add_camera_pose`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraUtility.py#L25-L60)接受 4×4 相机到世界变换，插入位置/旋转关键帧，并返回所分配的帧；显式帧参数可覆盖现有位姿。[Render](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/RendererUtility.py#L654-L729)遍历整个区间 `[frame_start, frame_end)`，而不仅是调用方显式请求的索引列表。保留返回帧及查询到的实际位姿。对于静态多视图测试，跨帧冻结对象状态；[关键帧契约](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/docs/tutorials/key_frames.md)也支持改变对象位姿，因此相邻捕获索引不一定意味着从不同相机看同一场景。

#### 2. 采样相机与射线网格可见性不能保证覆盖

[`shell`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/sampler/Shell.py#L9-L70)返回半径/仰角/方位角范围内的一个随机位置。默认独立采样角度和半径；没有检查历史或侧面/区域覆盖目标。五视图示例仅在对象上方采样。两者均不确保看到背面、底面、细小特征或凹入表面。

[`visible_objects`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraValidation.py#L126-L164)返回至少被可配置网格中的一条射线击中的对象，默认网格为 10×10。未命中可能意味着投影较小的对象落在采样射线之间。[障碍物检查](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraValidation.py#L16-L126)测试采样首个命中距离及可选背景拒绝；不保证整个视锥无阻挡或目标完整。[`scene_coverage_score`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraValidation.py#L167-L250)奖励命中多样性/占用率；其自身描述警告，它可能从相似角度聚焦于同一批对象。这个分数不是累计表面覆盖率。

**对适配器的含义：**  声明所需视图扇区/区域，保留拒绝的位姿及采样种子，并在渲染的 ID 遮罩中测试目标支持。将零支持报告为“在此视图中未观测到”，同时单独保留完整场景清单。不要将其解释为资产不存在或未见几何体无缺陷。

#### 3. 相机/深度约定需要经测试的转换边界

[相机教程](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/docs/tutorials/camera.md)说明使用 OpenGL 相机坐标系，并通过将源轴改为 `["X", "-Y", "-Z"]` 来转换 OpenCV 相机到世界位姿。[前向向量朝向](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraUtility.py#L133-L146)跟踪相机 `-Z`，默认上轴为 `Y`。[K 矩阵导入](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/camera/CameraUtility.py#L245-L295)接收图像尺寸，拒绝超过其容差的非零倾斜，并通过像素宽高比实现不相等的 fx/fy。导出实际 K、相机到世界矩阵、尺寸、裁剪范围及场景单位，而非泛泛的“相机位姿”字段。

[渲染器教程](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/docs/tutorials/renderer.md)将相机到点的径向距离与相机轴向深度分别定义。源码要求显式的抗锯齿参数：[非 AA 深度](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/RendererUtility.py#L260-L325)将 Blender 的 Depth 通道接入 EXR；[AA 距离](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/RendererUtility.py#L179-L256)使用具有可配置最大值的线性 Mist；AA 深度委托给该路径，并在加载时转换。记录路径及最大值，而非仅记录输出键。

**源码可见的标定注意事项：**  [dist2depth/depth2dist](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/postprocessing/PostProcessingUtility.py#L15-L75)在两个像素轴上都仅使用 `K[0,0]`，尽管 K 导入支持 fx≠fy。这是一个明显的非方形内参限制，需要后续离轴测试样例，而非已复现故障。将方形像素标定保留为较窄的初始条件；不要仅凭源码审查就宣称支持任意内参的深度互换。

#### 4. 渲染器 ID 是局部关联，而非持久项目身份

选择特定路径；`enable_segmentation_output` 默认映射 `category_id`，而非实例输出。[`enable_segmentation_output`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/RendererUtility.py#L440-L508)设置网格 `pass_index=index+1`，为世界/背景保留 0，并使用具有可配置 alpha 阈值（默认 0.05）的 Object Index。ID 遵循该网格枚举顺序，不应视为在场景重建/重新启用后仍稳定。

[`segmentation_mapping`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/postprocessing/PostProcessingUtility.py#L289-L441)根据实际像素值推导遇到的 ID，将其映射到当前对象，输出请求的实例/数值映射（`instance_segmaps` 要求 `map_by` 包含 `instance`），并返回 `instance_attribute_maps` 记录，其中包含 `idx` 及请求属性。非数值属性需要实例映射；缺少的属性需明确默认值，否则抛错。每视图映射不是完整场景清单。保留项目自有资产哈希/实例 ID → 导入网格 → 通道 ID 的映射，以及世界默认值。

单独发布的 [`render_segmap`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/renderer/SegMapRendererUtility.py#L17-L78)是第二条渲染路径，会为对象重新着色、禁用降噪、使用一次采样，并具有不同的 alpha 选项。不要将其与同次渲染的 Object Index 证据默默互换。

#### 5. HDF5 分组有助于关联；原始文件和完整性仍需负责管理

[已注册输出加载](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/writer/WriterUtility.py#L97-L151)按顺序遍历帧，加载启用/请求的已注册键，转换深度/距离并映射分割。它不会自动生成相机/资产来源信息。关键在于，[`load_output_file`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/writer/WriterUtility.py#L168-L194)默认在加载后删除中间 PNG/EXR。仅传入一个看似永久的渲染目录并不能保留这些原始文件。

[`write_hdf5`](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/writer/WriterUtility.py#L25-L91)在 `frame-frame_start` 处读取每个所提供列表，并为每个逻辑帧写入一个名为 `frame+frame_offset.hdf5` 的文件；追加模式会改变 `frame_offset`。它对照场景区间检查最大列表长度，然后在所提供键长度不足时抛错。该晚期失败可能留下较早文件或部分写入的当前文件。完全省略的键不会被识别为缺失要求。其版本记录不是完整的构建/相机/资产清单。

**对适配器的含义：**  写入前验证每个必需键及长度；如果需要原始文件，在破坏性加载前捕获原始产物；使用新的运行命名空间和完成清单；将逻辑帧与带追加偏移的文件名单独记录。将证据包交给评判器前，验证哈希、尺寸、ID 映射及必需流。

#### 发布、依赖与拟议用途

仓库的固定版本 [LICENSE](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/LICENSE) 为 GPL-3.0。这是代码许可证观测，不是对导入资产、纹理数据集或依赖的授权。[InstallUtility](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/utility/InstallUtility.py#L85-L108)默认选择 Blender 4.2.1；不要将其行为与现有 Blender 4.5 手册声明混为一谈。[DefaultConfig](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/blenderproc/python/utility/DefaultConfig.py) 和 [setup.py](https://github.com/DLR-RM/BlenderProc/blob/76bd8b82ee19489843578ff045298642197bf883/setup.py)公开了 Blender/Python 依赖，包括 h5py、OpenCV、SciPy、trimesh 和 pyrender；基础路径不需要学习式模型检查点。源码固定版本不等于可复现的已安装环境，可选写入路径可能引入更多依赖。

**拟议、尚未实现的 GameMap 测试样例：**  使用权利已确认、状态冻结的资产，具有已知正面/背面/底面特征，以及一个细小且部分遮挡的组件。在相同场景/光照/分辨率下，比较声明的固定环绕轨迹与数量相同的采样集合。独立于任何 VLM 验收分数，测量必需区域观测及 ID 关联的像素支持。加入标定、重复资产 ID、缺失流和中断写入情况。将目标引擎导入、交互及未见几何体验收分开。

### InfiniBench：约束裁决与相机覆盖

核查于 2026-10-19，仅检查源码。论文范围为 arXiv v2（2025-12-05）；实现声明使用代码修订 `d84f0d76d30cd40cc54cfd779fff202399a669b6`（2026-05-13），而非执行过的安装。

InfiniBench 以约束驱动的室内场景和任务导向相机搜索补充 BlenderProc 捕获基础设施。论文描述了优化器反馈、可移动家具簇及覆盖对象的轨迹；已发布路径需要更窄的验收声明。[论文](https://arxiv.org/pdf/2511.18200v2)

在所检查的修订中，generate_indoors 接入了仅编译执行器：智能体成功检查的是生成的 Python 是否在布局求解前产生 cl.Problem。附带反馈将 BEV 路径序列化为文本。这并未演示论文的视觉优化器反馈循环。[集成](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/generate_indoors.py#L166-L199)、[执行器](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/constraints/agentic_framework.py#L400-L426)、[反馈](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/constraints/agentic_framework.py#L124-L182)

两个相机实现不同。TrajectoryOptimizer 在找不到可行视点时将目标标为已访问；其遮挡检查是一条指向包围框中心的射线。批量 camera_traj 要求所有目标顶点位于其采样视锥内，但在可见性超过阈值或采样计数达到 max_occlusion_checks 时，会接受其他条件合格的候选。计数包含被拒绝的样本。默认值为 0.7 和 40，总预算为 500 次采样。无路径的批量片段返回空，但目的地旋转位姿仍会被追加。[简单相机循环](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/trajectory_optimizer.py#L780-L812)、[射线](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/trajectory_optimizer.py#L878-L911)、[批量采样](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/trajectory_optimizer.py#L348-L399)、[批量接受](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/trajectory_optimizer.py#L408-L456)、[默认值](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/trajectory_optimizer.py#L64-L81)、[无路径返回](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/trajectory_optimizer.py#L135-L151)、[位姿组装](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/trajectory_optimizer.py#L479-L529)

QA 计数使用对象清单；出现顺序使用接受的目标顺序。两者都未独立验证交付帧中的首次可见性。拟议的 GameMap 验收应保留逐目标结果，验证渲染可见性和路径连续性，并将缺失预测与评分准确率分开。公开源码和示例场景存在；扩展代码许可及可复现依赖仍未解决。[QA](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/qa_from_metadata.py)、[评分器](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/infinigen_examples/run_end_to_end.py#L327-L379)、[发布](https://github.com/pittisl/infinibench/blob/d84f0d76d30cd40cc54cfd779fff202399a669b6/README.md)、[数据集](https://huggingface.co/datasets/Haoming645/infinibench/tree/ca5b7999056e5e7e473902294b4826bd6dda536d)

批量可见性放宽仅在先前的可达性、视锥及非零像素检查通过后适用；并非接受每个采样位姿。将其计划中的证据与 [Code4Scene 保存状态保留](selection.md#7-code4scene-target-recovery-and-collateral-changes-require-different-comparisons)区分开。这些是拟议的互补门槛，而非经过测试的组合流水线。

### OpenColorIO

用于证据比较的共享色彩管理配置。

- **文档记录的接口与拟议用途：**  拟议用途：随每项处理后的观测，对确切的颜色配置及变换/视图选择进行哈希。
- **限制：**  颜色转换不能恢复被截断/高光信息；未指定的源颜色解释仍未知。
- **来源条款：**  上游仓库显示为 BSD-3-Clause。
- **一手来源：**  [OpenColorIO README](https://github.com/AcademySoftwareFoundation/OpenColorIO)

### LPIPS / PerceptualSimilarity

将学习式感知距离作为次要的视觉回归信号。

- **文档记录的接口与拟议用途：**  PyTorch API；RGB 张量归一化至 \[-1,1]。记录网络变体/检查点及输入预处理。
- **限制：**  不要仅以感知相似度作为任务成功奖励；即便总体距离较低，细小接触/UI 错误也可能造成严重后果。
- **来源条款：**  仓库为 BSD-2-Clause；重新分发前需单独审查模型/数据权利。
- **一手来源：**  [LPIPS README](https://github.com/richzhang/PerceptualSimilarity)

### FLIP：考虑显示条件的渲染差异

FLIP 是具有实质互补作用的 **全参考渲染差异诊断工具** ：与观看条件相关的颜色/边缘/点误差图，以及 HDR 曝光扫描。它可以帮助在固定捕获契约下，将渲染候选与获批目标比较。它不能确立游戏动作已生效、UI 内容正确或不存在时间伪影。将基于 FLIP 的选择视为拟议的 GameMap 测试样例，而非论文演示的结果。

#### 检查的确切实现

NVlabs/flip 实现在提交  **b475eb4bf394ab877c42166c9eb0a84a02cc5b14**  声明 v1.7。这固定的是所检查的源码，而非已解析的发布标签或已安装包。以下范围为 Python `flip_evaluator.evaluate(reference, test, dynamicRangeString, inputsRGB=True, applyMagma=True, computeMeanError=True, parameters={})` 封装及其 nanobind/C++ 路径。独立的 PyTorch loss 使用不同的参数顺序：test 在前，reference 在后。不要移植其调用约定。[PyTorch 契约][flip-pytorch]

#### 可能颠倒候选排序的契约

- **颜色是输入契约，不是从文件内容推断的。**  Python 封装默认 LDR 为编码 sRGB，随后由绑定解码；已为线性的 LDR 数组需使用 `inputsRGB=False`。HDR 强制设置 `inputsRGB=False`，要求非负的线性 sRGB RGB。将显示截图作为 HDR 传入、对线性 RGB 重复解码、不经原色转换直接输入 ACEScg，或将 LPIPS 的 \[-1,1] 归一化当作可复用方法，都会改变所测量的问题。LDR C++ 路径将值限制到 \[0,1]；应在这种静默信息损失之前验证范围。[封装，第 36–100 行][flip-api]；[绑定，第 218–228 行][flip-binding]；[核心，第 2399–2403 行][flip-core]
- **参考图身份与曝光策略至关重要。**  未指定的 HDR 起止曝光根据参考图的最大/中位亮度计算。默认次数为 max(2, ceil(stop-start))；每个共享曝光因子 2^c、所选色调映射器和限幅操作都应用于两张图，然后进行 LDR-FLIP。最终图保留 **跨曝光时每个像素的最大误差** ，而非平均值。因此交换 reference/test 可能改变自动曝光；更改依赖候选的参考图、曝光范围/次数或色调映射器，会使共享排序无效。存储解析后的参数。更丰富的 C++ 接口公开产生最大误差的曝光图及中间图像；Python 元组则不提供。[核心，第 2186–2234、2314–2404 行][flip-core]
- **色调映射器拼写是固定版本 API 的一个陷阱。**  封装验证 `parameters['tonemapper'].lower()`，但传递的是原始字符串。检查的 C++ 实现精确比较小写 `aces`、`hable`、`reinhard`，并以 ACES 作为回退。因此文档中首字母大写的 `Hable`/`Reinhard` 在此 Python 路径中可能选择 ACES。统一为小写并持久保存。这是静态代码路径发现，而非执行复现；CLI 单独将输入转为小写。[封装，第 82–100 行][flip-api]；[绑定，第 148–151 行][flip-binding]；[核心，第 1395–1435 和 2186–2199 行][flip-core]；[CLI，第 122–132 行][flip-cli]
- **PPD 是测量的一部分。**  核心计算 distance_m × display_width_px / display_width_m × pi/180；默认值为 0.7 m、3840 px、0.7 m（约 67 PPD）。提供 `ppd` 或 `vc` 之一，绝不能同时提供，并保留图像缩放/观看假设。缩放捕获图像却保留旧的物理解释，并非中性优化。评估前裁剪还会改变空间滤波器上下文，并在自动 HDR 时改变参考图统计量；从全帧图中汇总某一区域回答的是不同问题。[核心，第 110–123 行][flip-core]；[封装，第 48–80 行][flip-api]
- **原始图、预览和聚合值是不同的产物。**  Python 返回 `(map, mean, resolved_parameters)`。默认 `applyMagma=True` 得到 H×W×3 显示颜色，而非三个独立误差通道；使用 `False` 得到 H×W×1 数值误差。返回的均值是着色前标量图的算术平均值。使用 `computeMeanError=False` 时，Python 路径返回  **-1** ，绝不能让它在越低越好的选择器中胜出。将原始图与预览分别持久保存，并为细小的关键缺陷保留区域/尾部证据。NVIDIA 的出版页面现建议，在需要单个数字时使用均值，而非原论文的加权中位数。[绑定，第 185–238 行][flip-binding]；[核心，第 2444–2489 行][flip-core]；[作者事后回顾][flip-ldrpage]

#### 评估前运行框架侧的有效性门槛

规范化为相同且非空的 H×W×3 RGB 数组，明确使用 float32/连续 CPU 存储、有限样本、已定义范围、颜色变换、裁剪/配准及 alpha 处理。nanobind 签名为三维 float/CPU/连续数组；在按每像素三个浮点数复制前，其显式检查涵盖维数和 H/W 一致性， **不包含 shape(2)==3** 。此检查缺失是源码观测，而非已复现的内存安全故障。文件输入不同：LDR 加载器使用三通道 8 位 `stbi_load` 再除以 255，EXR 使用普通通道名识别；这些路径不保留 RGBA 验证契约，也未执行文档记录的 alpha 合成。应在上游确定性合成，并单独验证 alpha。[绑定，第 61–100 和 185–216 行][flip-binding]；[加载器，第 65–88 和 133–217 行][flip-loader]

验证认可的键、类型、有限正 PPD/观看值、小写色调映射器、有限且有序的 HDR 曝光边界，以及在资源预算内且 >=2 的整数曝光次数。此 Python 路径中，未知参数键只打印消息而不失败。在有效有限的显式曝光边界下，简化 API 初始化零图，传入零次数将跳过 HDR 循环；次数为一会发生除以次数减一。这些静态路径说明应拒绝此类输入，而非实测输出或关于每条 CLI/错误路径的声明。v1.7 将零中位数限制到 epsilon，但自动起始曝光计算仍需除以最大亮度：全黑参考图需要明确的曝光策略或无效结果，而非假定中位数修复已涵盖此情况。[绑定，第 115–161 行][flip-binding]；[核心，第 2210–2233、2357–2397、2448–2454 行][flip-core]

区分无效输入/配置、进程/API 失败、缺失/非有限输出以及有效实测差异。某些检查会退出进程，而非抛出可恢复异常。要求预期尺寸的有限 \[0,1] 原始输出及有效均值；比较确切的指标构建/后端/平台，因为上游记录了细小浮点差异。拟议但未执行的测量测试样例：相同图像对；单像素/UI 缺陷；暗部/高光缺陷；明确合成后仅 alpha 变化；交换参考图；全帧与裁剪 HDR；声明有效曝光策略下的全黑参考图。单独测试封装对色调映射器名称的规范化，以及对格式错误/空/通道不匹配数组、NaN/Inf 和零/一次曝光的 **预检拒绝** ；不要将这些被拒绝情况传入未经检查的原生路径。不声明验收阈值。[精度说明][flip-precision]

#### 论文证据与权利限制

2020 年 LDR 论文的研究在按要求设为 67 PPD 的条件下，使用 0.5 秒切换周期、21 组图像对和 42 位参与者，评估误差图与切换图像对时所见差异的一致性。它报告了较好的平均一致性；参与者主要是专家，显示校准未受控。这不是对自动游戏候选选择、通用阈值或时间质量的验证。其声明的限制包括掩蔽效应，可能导致高估。原论文讨论 LDR；2021 年 HDR 出版物描述了曝光补偿、色调映射后图像对的组合。HDR 完整 PDF 超过检索大小限制，因此上文详细 HDR 机制归因于固定版本代码，而非未阅读的论文。[LDR 论文，第 2 和 6.2 节][flip-ldrpaper]；[HDR 出版物][flip-hdrpage]

检查的仓库代码为 BSD-3-Clause；捆绑的 TinyEXR 和 stb 在第三方许可文件中有独立声明。这不授予论文、研究图像、引擎捕获或游戏资产的全面使用权。链接而非重新分发论文/图像语料库；使用独立完成权利审查的测试图像。此拟议的基于源码的契约不需要学习权重或获取数据集。[代码许可证][flip-license]；[第三方声明][flip-thirdparty]

[flip-api]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/flip_evaluator/flip_python_api.py

[flip-binding]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/nanobindFLIP.cpp

[flip-core]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/cpp/FLIP.h

[flip-cli]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/cpp/tool/FLIPToolHelpers.h

[flip-loader]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/cpp/tool/imagehelpers.h

[flip-precision]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/misc/precision.md

[flip-pytorch]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/src/pytorch/README.md

[flip-license]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/LICENSE

[flip-thirdparty]: https://github.com/NVlabs/flip/blob/b475eb4bf394ab877c42166c9eb0a84a02cc5b14/misc/LICENSE-third-party.md

[flip-ldrpage]: https://research.nvidia.com/publication/flip

[flip-ldrpaper]: https://developer-blogs.nvidia.com/wp-content/uploads/2020/07/flip-author-version-reduced-file-size.pdf

[flip-hdrpage]: https://research.nvidia.com/publication/2021-05_visualizing-errors-rendered-high-dynamic-range-images

### SAM 2

可通过提示生成的图像遮罩，以及沿时间传播的视频遮罩片段。

- **文档记录的接口与拟议用途：**  SAM2ImagePredictor 和视频预测器；文档要求 Python >=3.10、torch >=2.5.1、torchvision >=0.20.1。GPU 示例；可选 CUDA 扩展影响部分后处理。
- **限制：**  预测遮罩是推断证据，而非引擎对象 ID。跟踪提示历史、检查点、帧索引及推理状态重置。
- **来源条款：**  模型检查点/训练/演示为 Apache-2.0；可选第三方代码/字体有独立条款。
- **一手来源：**  [SAM 2 README](https://github.com/facebookresearch/sam2)

#### SAM 2 时间遮罩状态契约

此契约区分同一片段内的校正与创作编辑后的替换证据。2026-10-19 仅检查源码；未安装、未下载模型、权重或视频，未推理。下文所有实现链接固定官方 `facebookresearch/sam2` 提交  **2b90b9f5ceec907a1c18123530e92e794ad901a4** ，即 GitHub 返回的当前 `main`（提交日期 2024-12-16）。

##### 状态与观测生命周期

1. **片段身份先于跟踪身份。**  `init_state` 加载帧，记录一组原始高/宽，并缓存第零帧特征。`reset_state` 删除提示、结果、跟踪元数据和对象 ID，但保留图像、尺寸、常量及缓存特征。 **推断：**  渲染变化、帧文件替换、裁剪变化或相机捕获变化，都需要从新的不可变片段建立新状态，而非仅重置。同一片段内已有的相机切换仍是图像证据；预测器不提供权威场景/相机身份转换。[初始化][SAM-init] · [重置/缓存][SAM-reset]

2. **帧索引不是源时间。**  JPEG 名称按扩展名过滤，并按整数文件主名排序；状态以列表位置为索引。缺失的文件名编号不被表示为缺失时间槽。MP4/字节使用 Decord 的帧迭代；加载器返回图像和尺寸，而非 FPS/PTS。两条路径都将帧拉伸为模型的方形输入，并归一化 RGB。 **对适配器的含义：**  保留索引 → 原始文件名/PTS/仿真 tick 及裁剪/缩放映射；验证尺寸一致，而非从索引推断时间。[加载器][SAM-load]

3. **提示坐标及变更是显式的。**  `add_new_points_or_box` 默认 `normalize_coords=True`：原图 x/y 像素除以宽/高，再乘以内置图像尺寸。设为 False 时，应提供归一化坐标，而非已缩放的模型像素。框变为标签 2/3 的两个角点提示，并要求 `clear_old_points=True`；普通标签为 1 正/0 负。默认 `clear_old_points=True` 替换该对象在该帧的点击；False 则追加。点/框输入移除其遮罩输入；`add_new_mask` 移除其点输入。当二维遮罩尺寸与模型输入不同，会用双线性抗锯齿缩放，并在 0.5 处二值化。保留完整的有序提示历史、替换/追加标志及坐标空间。[提示/遮罩路径][SAM-prompt] · [标签语义][SAM-base]

4. **校正预览不是完成的时间证据。**  从未跟踪过的帧变为初始条件。对已跟踪帧进行点/框校正时，使用记忆的跟踪方向及先前遮罩 logits；遮罩替换走单独路径。新输出是临时的，记忆编码推迟至传播预检。`add_all_frames_to_correct_as_cond=False` 为默认值；传播复用条件输出，但对没有直接点/遮罩输入的其他帧重新计算。因此不要假定即时校正预览会在后续传播中原样保留。记录条件策略，并分别验证校正帧和下游结果。默认设置也不清除周围的非条件记忆。[提示路径][SAM-prompt] · [预检/传播][SAM-prop]

5. **ID 属于会话，而非引擎。**  当前默认预测器独立运行对象，并允许传播开始后添加对象。返回遮罩行的顺序遵循返回的 `obj_ids`；移除对象会压缩内部索引。清除一帧上的提示可能将其条件输出降级，但不会删除对象。重置终止所有 ID。 **对适配器的含义：**  随每次输出序列化一份 ID 快照，以片段/状态代次划分命名空间，并将引擎身份保留为独立证据。空/被遮挡的遮罩不能证明对象已删除或正确重识别。旧实现具有不同的多对象提示/添加语义。[ID 映射][SAM-init] · [移除][SAM-remove] · [发布说明][SAM-release]

6. **必须记录覆盖范围与遮罩类型。**  传播默认为最早条件帧和前向顺序，不一定从第零帧开始。反向需显式指定；从零反向不产生结果。其区间包含两端，因此未被截断的 `max_frame_num_to_track=N` 可产生 N+1 帧。公开三元组为帧索引、ID 及原始分辨率遮罩  **logits** ，形状为对象数 × 1 × H × W，位于计算设备上；二值遮罩需明确阈值（官方 VOS CLI 默认：>0）。提示预览合并时可能出现缺失对象占位符。保留 logits/阈值及请求与实际产出的覆盖范围；任何公开三元组都不能确证对象存在或功能成功。[输出/传播][SAM-prop] · [CLI][SAM-cli]

##### 默认值、变体与就绪边界

- 标准构建器默认为 CUDA、eval、`vos_optimized=False`、`apply_postprocessing=True`：稳定性回退 delta 0.05/阈值 0.98、二值化点提示记忆，以及最大面积 8 的低分辨率孔洞填充。仅构造函数的孔洞填充默认值为 0。输出重叠抑制默认为 False。VOS CLI 则默认关闭后处理，开启打包标签重叠抑制。记录实际解析后的设置。孔洞填充失败时警告并返回未处理分数。[构建器][SAM-build] · [CLI][SAM-cli] · [后处理器][SAM-holes]
- 帧卸载、状态卸载及异步加载都默认为 False。JPEG 异步模式同步读取第零帧，启动守护线程填充固定帧列表，在访问时加载缓存未命中项，并在后续访问时抛出已记录的后台错误。MP4 加载忽略异步选项，并堆叠完整解码序列。这不是实时有界内存流。状态卸载仍将图像特征/对象指针留在计算设备上；返回遮罩被移至该设备。[初始化][SAM-init] · [加载器][SAM-load] · [输出存储][SAM-storage]
- 标准模式与编译的 `SAM2VideoPredictorVOS` 是不同执行模式；发布说明警告编译可能改变预测数值。SAM 2 和 SAM 2.1 是分别映射的检查点/配置系列，各有 tiny/small/base-plus/large；系列名称都不固定权重。检查的 2.1-large 配置使用图像尺寸 1024 和七个遮罩记忆；继承的评估时间步幅为一。独立记录检查点哈希、配置及预测器修订。[构建器/映射][SAM-build] · [2.1-large 配置][SAM-config] · [基类][SAM-base] · [发布说明][SAM-release]
- **限定范围的静态注意事项：**  在此固定版本默认类中启用 `clear_non_cond_mem_around_input` 会调用 `_clear_obj_non_cond_mem_around_input`，该方法在完整预测器、其 `SAM2Base(torch.nn.Module)` 父类和 VOS 子类中均不存在；已定义的辅助函数名称不同。旧版分派也不同。此未经执行的源码不匹配不是已验证的记忆失效处理办法。[调用][SAM-prop] · [已定义辅助函数/VOS 子类][SAM-helper]

**拟议的创作智能体门槛：**  将遮罩绑定到捕获/构建/相机及不可变片段哈希；验证映射和提示来源；捕获校正预览；显式重跑所需前向/反向区间；验证遮挡/切镜后的重新捕获；拒绝缺失/错误帧；独立对照引擎 ID 或人工编写的断言。在依赖此修订前，重新测试校正帧保留及可选记忆清除行为。这些是拟议测试，而非实测能力。

**条款：**  检查的源码采用 Apache-2.0；官方 README 单独将模型检查点/训练/演示许可为 Apache-2.0。可选连通分量代码为 BSD-3-Clause；演示字体有独立条款。这不意味着源视频或下游模型/数据依赖已获许可。[许可证][SAM-license] · [组件许可证][SAM-cc] · [README][SAM-readme]

[SAM-init]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L41-L153

[SAM-reset]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L675-L734

[SAM-load]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/utils/misc.py#L92-L309

[SAM-prompt]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L160-L381

[SAM-base]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/modeling/sam2_base.py

[SAM-prop]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L383-L630

[SAM-remove]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L866-L954

[SAM-release]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/RELEASE_NOTES.md

[SAM-cli]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/tools/vos_inference.py

[SAM-build]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/build_sam.py

[SAM-holes]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/utils/misc.py#L312-L340

[SAM-storage]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L737-L803

[SAM-config]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/configs/sam2.1/sam2.1_hiera_l.yaml

[SAM-helper]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/sam2/sam2_video_predictor.py#L956-L1011

[SAM-license]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/LICENSE

[SAM-cc]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/LICENSE_cctorch

[SAM-readme]: https://github.com/facebookresearch/sam2/blob/2b90b9f5ceec907a1c18123530e92e794ad901a4/README.md#license

### CoTracker3

用于时间诊断的点轨迹与可见性估计。

- **文档记录的接口与拟议用途：**  离线和在线接口；示例视频形状为 B,T,C,H,W，轨迹为 B,T,N,2。强烈建议使用 GPU；在线模式使用更少内存。
- **限制：**  并非自动具备商业使用资格。可见性及轨迹身份是模型估计；保留源帧映射。
- **来源条款：**  大部分为 CC-BY-NC；所含组件有独立 MIT/Apache 条款。
- **一手来源：**  [CoTracker README](https://github.com/facebookresearch/co-tracker)

### Depth Anything V2

用于视觉推理的单目相对深度推断。

- **文档记录的接口与拟议用途：**  infer_image 返回 HxW NumPy 深度；示例选择 CUDA、MPS 或 CPU。主要预训练模型估计相对深度；度量变体是独立模型。
- **限制：**  相对预测绝不能标为引擎度量深度。记录检查点、尺度约定及缩放变换。
- **来源条款：**  根据 README，Small 为 Apache-2.0；Base/Large/Giant 为 CC-BY-NC-4.0。
- **一手来源：**  [Depth Anything V2 README](https://github.com/DepthAnything/Depth-Anything-V2)

### Open3D

3D 几何体检查、对齐及可视化支持。

- **文档记录的接口与拟议用途：**  C++/Python API；Linux x86_64 有 CPU wheel，核心操作支持 GPU 加速。渲染后端可用性需单独探测。
- **限制：**  不要根据 CPU 处理支持推断所有可视化都能无界面运行。资产单位及相机/深度约定仍需明确契约。
- **来源条款：**  未在检索到的功能摘录中核查许可证。
- **一手来源：**  [Open3D README](https://github.com/isl-org/Open3D)

### TAP / TAPIR / TAP-Vid

具有明确坐标语义的点跟踪模型及基准。

- **文档记录的接口与拟议用途：**  固定确切算法/检查点。数据集归一化栅格坐标与代码栅格坐标不同；二维通常为 (x,y)，带时间的查询坐标为 (t,y,x)。
- **限制：**  帧坐标不是秒。基准点标注不意味着正确的 3D 接触或引擎对象身份。
- **来源条款：**  除单独许可的 TAPVid-3D 外，软件/检查点为 Apache-2.0；数据集/源视频条款各异。
- **一手来源：**  [Tracking Any Point README](https://github.com/google-deepmind/tapnet)

## 帧、图形与仿真诊断

### RenderDoc

用于诊断渲染故障的帧捕获图形调试器。

- **文档记录的接口与拟议用途：**  上游包含 renderdoccmd；必须探测支持的捕获/回放目标及驱动。后续[诊断契约审查](../production/debugging.md)检查了版本化捕获及回放接口；未执行适配器。
- **限制：**  上游支持矩阵无 Metal 支持。面向自有程序；支持捕获自有 Unreal/Unity 项目。回放不等于完整恢复玩法状态。
- **来源条款：**  MIT。
- **一手来源：**  [RenderDoc README](https://github.com/baldurk/renderdoc)

### Tracy 性能分析器

将性能轨迹与已插桩帧关联。

- **文档记录的接口与拟议用途：**  CPU 插桩和多种 GPU API；上游包含 capture 和 csvexport 工具。捕获及截图生成会增加工作负载，需要测量。
- **限制：**  插桩计时不等于未插桩基准。将帧标记及截图时间戳与游戏证据对齐。
- **来源条款：**  存在许可证文件；未核查确切条款。
- **一手来源：**  [Tracy README](https://github.com/wolfpld/tracy)

### NVIDIA Nsight Graphics

NVIDIA 渲染性能及着色器/光线追踪诊断。

- **文档记录的接口与拟议用途：**  NVIDIA 平台 GPU 性能分析/调试；调度前检查确切的设备/驱动/平台要求。后续[诊断契约审查](../production/debugging.md)涵盖文档记录的 SDK/CLI 产物就绪性；未执行自动化。
- **限制：**  硬件专属计数器不是可移植指标；未验证 GameMap 运行时集成。
- **来源条款：**  厂商许可证；未审查详细条款。
- **一手来源：**  [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics)

### PresentMon

Windows 帧计时捕获，具有控制台 CSV 输出和服务 API。

- **文档记录的接口与拟议用途：**  从 ETW 推导的 CPU/GPU/显示时长及延迟；权限必须满足文档记录的跟踪会话访问要求。
- **限制：**  OpenGL/Vulkan 的插桩较少；硬件加速 GPU 调度可能降低计时准确性。不要为改善测量而默默更改系统设置。
- **来源条款：**  MIT。
- **一手来源：**  [PresentMon README](https://github.com/GameTechDev/PresentMon)

### Radeon GPU Profiler

AMD 专属的 GPU 计时、波前及屏障诊断。

- **文档记录的接口与拟议用途：**  当前文档记录的图形 API：D3D12 和 Vulkan；Windows 11 和 Ubuntu 24.04（仅 Vulkan）；必须对照工作节点检查支持的 AMD 硬件列表。
- **限制：**  硬件专属性能分析需要驱动/设备匹配；实际耗时和 GPU 计数器是不同测量。
- **来源条款：**  未核查厂商条款。
- **一手来源：**  [AMD Radeon GPU Profiler](https://gpuopen.com/rgp/)

### GFXReconstruct

图形命令捕获/回放，以及结构化轨迹转换。

- **文档记录的接口与拟议用途：**  Vulkan 捕获层、D3D12 捕获库；replay/info/extract/convert 工具。拟议用途：为故障附加捕获哈希和驱动 ID。
- **限制：**  支持平台表假设在相同平台/驱动上回放；通常不支持跨平台回放。OpenXR 为实验性功能。捕获不保留完整玩法状态。
- **来源条款：**  MIT。
- **一手来源：**  [GFXReconstruct README](https://github.com/LunarG/gfxreconstruct)

### SPIRV-Tools

着色器二进制验证、优化及故障化简基础组件。

- **文档记录的接口与拟议用途：**  spirv-val 验证二进制 SPIR-V；spirv-opt 应用优化遍；spirv-reduce 使用用户提供的有趣性判定谓词。
- **限制：**  验证器明确不完整；验证成功不能证明着色正确。必须测量优化收益。
- **来源条款：**  未在检查的摘录中核查确切许可证。
- **一手来源：**  [SPIRV-Tools README](https://github.com/KhronosGroup/SPIRV-Tools)

### Vulkan Validation Layers

开发阶段的 Vulkan API 误用诊断。

- **文档记录的接口与拟议用途：**  通过 Vulkan Configurator 或进程环境启用；记录层/设置/SDK 修订并收集消息。
- **限制：**  API 验证不等于视觉正确性。GPU 辅助/同步验证可配置；插桩可能扰动性能。
- **来源条款：**  上游描述为 Apache 风格的 Khronos 许可证；完整许可清单需审查。
- **一手来源：**  [Vulkan Validation Layers README](https://github.com/KhronosGroup/Vulkan-ValidationLayers)

### Trimesh

网格拓扑、边界、体积及距离检查。

- **文档记录的接口与拟议用途：**  Python 3.10+；使用 is_watertight、bounds、组件拆分及最近/有符号距离查询。可选布尔运算/查看器后端是独立依赖。
- **限制：**  水密性不足以保证有效的绑定/碰撞/玩法；开放网格可能出于设计。检查期间不要默默修复源资产。
- **来源条款：**  MIT。
- **一手来源：**  [Trimesh README](https://github.com/mikedh/trimesh)

### MuJoCo 接触诊断

铰接物理参考及接触/几何诊断基础组件。

- **文档记录的接口与拟议用途：**  C API mj_contactForce 返回接触坐标系中的六维力/力矩；mj_geomDistance 返回受 distmax 限制的有符号几何距离。
- **限制：**  需要 MuJoCo 模型；没有转换及等价性测试，不能声称验证 Unreal/Unity 物理。文档记录了旧版 CCD 距离注意事项。
- **来源条款：**  源码为 Apache-2.0；文档/媒体为 CC-BY-4.0。
- **一手来源：**  [MuJoCo API](https://mujoco.readthedocs.io/en/stable/APIreference/APIfunctions.html)；[MuJoCo README](https://github.com/google-deepmind/mujoco)

## 视频与创作研究

### VBench

将拆分的视频生成质量指标用作辅助诊断。

- **文档记录的接口与拟议用途：**  CLI 支持选定的自定义输入维度，例如主体/背景一致性及运动平滑度。依赖/GPU 要求因指标而异。
- **限制：**  这是生成视频质量基准，而非游戏物理验证器。自定义输入支持标准维度的一个子集；仅平滑度可能奖励静止不动。
- **来源条款：**  仓库为 Apache-2.0；依赖/检查点需单独审计。
- **一手来源：**  [VBench README](https://github.com/Vchitect/VBench)

### Video-MME-v2

用于视频检索、时间理解及推理的诊断层级。

- **文档记录的接口与拟议用途：**  官方仓库记录了独立 Transformers 评估，包含帧提取/缓存、字幕及评分。
- **限制：**  视频 QA 不能认证游戏完成。字幕/音频访问会改变信息条件，必须在每个实验中锁定。
- **来源条款：**  未核查数据集/视频/代码许可证；需分别验证。
- **一手来源：**  [Video-MME-v2 论文](https://arxiv.org/abs/2604.05015)；[Video-MME-v2 README](https://github.com/MME-Benchmarks/Video-MME-v2)

### DreamGarden

Unreal Engine 中可由人引导的游戏环境创作助手。

- **文档记录的接口与拟议用途：**  分层规划器将实现分配给专门模块；提升为可执行候选前需检查实现/版本。
- **限制：**  这是创作研究，而非仅玩法研究。人类反馈/干预是系统的一部分；若不计入，不要与全自主基线比较。
- **来源条款：**  未核查论文/代码/引擎许可证。
- **一手来源：**  [DreamGarden 论文](https://arxiv.org/abs/2410.01791)

### Game-Creation-Agents (GCA)

近期完整的浏览器游戏生产流水线，带构建关联验证及有界修复。

- **文档记录的接口与拟议用途：**  需要 Python 3.11+、Node20+、Playwright/Chromium、FFmpeg、Claude Code 及生成/VLM 服务凭据。未进行设置。
- **限制：**  预印本发表于 2026-10-12，此处未复现。范围为浏览器 Phaser，而非 AAA 验证。论文报告了视觉证据引用方面的注意事项；并非在每个自动维度上都更优。
- **来源条款：**  Apache-2.0 仓库，含第三方例外；可选 RMBG-2.0 为非商业用途，默认不启用/捆绑。
- **一手来源：**  [GCA 论文摘要](https://arxiv.org/abs/2610.16776)；[GCA 全文](https://arxiv.org/html/2610.16776v1)；[GCA README](https://github.com/Tencent/Game-Creation-Agents)

### WorldGUI

多样初始状态的 GUI 评估及批评循环研究。

- **文档记录的接口与拟议用途：**  迁移假设：在测试仅 GUI 的游戏生产工作流时，改变编辑器启动/对话框/选择状态。
- **限制：**  这是桌面基准，而非游戏创作证据。必须独立于视觉定位准确率测量初始状态鲁棒性。
- **来源条款：**  未核查论文/代码/数据许可证。
- **一手来源：**  [WorldGUI 论文](https://arxiv.org/abs/2502.08047)

## 智能体接口、记忆与优化

### pi 编码智能体扩展

用于加载 GameMap 工具及观测/上下文策略的可扩展基线。

- **文档记录的接口与拟议用途：**  拟议集成：工具注册、事件钩子、显式证据记录器。保留加载顺序及版本。
- **限制：**  嵌套工具结果不会自动创建转录条目；调用工具可以报告它们。将完整证据持久保存在别处。同级调用可能并发运行；可变引擎会话需要串行化。
- **来源条款：**  MIT 仓库。
- **一手来源：**  [pi 扩展](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md)；[pi 仓库](https://github.com/earendil-works/pi)

#### Pi 证据生命周期与执行中断

使用 pi 的工具及扩展接口构建受控反馈循环。以下实现参考对应提交  **482c1381a00d8d00bc81697e4a980c593db6803e** 。

##### 1. 资源生命周期与实际收束边界

扩展工厂可在没有会话时加载。长生命周期进程/监听器应放在 session_start 或拥有它们的命令/工具中；清理应放在幂等的 session_shutdown 中。重载和会话替换会使旧运行时/上下文对象失效。之后的 withSession 回调接收替代上下文。agent_end 结束低层运行；之后可能还有重试、压缩或排队工作。agent_before_settle 是可采取行动的最终边界，而 agent_settled 仅通知。[生命周期文档](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md#L54-L150)、[替代上下文](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md#L307-L332)、[重载实现](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/agent-session.ts#L3690-L3730)

**拟议的适配器含义：**  引擎连接、捕获租用及证据记录器需要明确的所有权，以及关闭/重新绑定行为。不要在第一个 agent_end 就完成评估，也不要继续使用重载前的引擎句柄。

##### 2. 取消是协作式的；嵌套信号覆盖至关重要

核心在执行前检查取消，然后用所提供的 AbortSignal 等待 tool.execute。此路径没有强制终止或回滚封装。忽略信号的工具可以继续并正常返回。嵌套 executeTool 默认使用父级信号，但显式提供的信号会 **替换** 该默认值；此调用点不合并信号。[执行](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/agent/src/agent-loop.ts#L708-L779)、[等待执行及错误转换](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/agent/src/agent-loop.ts#L821-L859)、[嵌套信号选择](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/extensions/runner.ts#L968-L994)

RPC abort 等待空闲，但不清空排队消息；文档记录使用 clear_queue 后接 abort 实现类似 Esc 的行为。[RPC 契约](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/rpc-commands.md#L94-L128)

**拟议的适配器含义：**  区分已请求取消、引擎已确认停止、取消后完成，以及结果未知。重试变更前，对账作业 ID 及权威引擎状态。超时信号必须显式保留预期的父级取消语义。

##### 3. 原始图像、持久保存结果与请求上下文各不相同

\_afterToolCall 运行扩展 tool_result 处理器，然后按当前模型的缩放配置及图像设置归一化图像内容。normalizeToolResultImages 调用 processImage，可替换字节/MIME 类型并添加提示，但在 processImage 返回 ok:false 时保留原始块；此封装不捕获任意抛出异常。禁用缩放仍允许转换不受支持的格式。因此，持久保存的工具结果图像未必等于原始截图，归一化失败也不能确证提供方兼容性。[钩子顺序](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/agent-session.ts#L684-L726)、[归一化](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/utils/tool-result-images.ts)、[转换/缩放](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/utils/image-process.ts)

请求时上下文处理从结构化克隆开始；context 处理器接收对话消息，同时恢复系统状态，随后 context_with_system 作用于完整转录。另一个独立行为是：tool_result 处理器若替换 content 而未提供 structuredContent，会丢弃之前的结构化结果。[上下文组合](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/extensions/runner.ts#L1300-L1355)、[结果组合](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/extensions/runner.ts#L1189-L1247)

**拟议的适配器含义：**  分别记录原始产物哈希/尺寸、存储的派生物身份、选择变换及请求证据清单。上下文压缩不得默默销毁嵌套编排所需的结构化清单。提供方最终预处理仍是额外边界，此处未验证。

##### 4. 恢复对话不等于引擎作业恢复

会话上下文遵循活动分支和最新压缩；较旧的已总结条目不进入活动上下文，但仍留在会话文件中。默认摘要序列化器提取文本而非图像像素，并将超过 2,000 字符的工具结果文本截为该长度的前缀加标记；较短文本保持不变。保留在尾部的图像不同于条目已被摘要替代的图像。[会话投影](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/session-manager.ts#L469-L573)、[摘要序列化器](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/compaction/utils.ts#L90-L155)、[默认摘要请求](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/compaction/compaction.ts#L679-L735)、[会话语义](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/sessions.md)

分支感知状态应从 getBranch 重建；appendEntry 存储非上下文数据，而 sendMessage 添加模型上下文。这不是中断的 JavaScript 执行、引擎进程或远程作业能够持久续跑的证据。[状态契约](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md#L320-L332)

**拟议的适配器含义：**  将产物/作业身份及权威完成状态持久保存在外部；恢复时重新验证。切换分支不得混合来自不同历史的已接受资产或完成记录。

##### 公平测试样例与 RSI 问题，尚未执行

问题： **裁剪加全局证据是否只有在配合分支感知的清单重建时，才能在压缩及执行中断后保持收益？**

固定任务集、动作策略、模型、权限、评分及已接受的引擎变更。将两种选择策略（全局帧；裁剪加全局）与两种保留策略（普通压缩上下文；显式持久清单加证据重建）交叉组合。匹配包含重建的视觉/词元预算，并计入全部选择器/预处理/重试成本。

首先提出一个确定性模拟桥接，带编号变更及捕获、延迟完成、协作式和非协作式取消，以及原始/派生物哈希。在相同位置脚本化中断：派发前；引擎接受后、结果返回前；结果返回后、压缩前；压缩后、恢复前。测试默认与显式覆盖的嵌套信号、排队工作、重载及放弃的分支。这些是拟议情况，而非已复现的 Pi 缺陷。

分别要求断言：重复变更、错误假定取消、使用过期连接、分支污染、缺失证据、原始到派生物的来源，以及最终权威状态。计入失败和未知结果；不要将缺失观测评为成功。后续获授权的项目自有引擎测试样例可用相同故障安排测试任务质量。在选择候选前冻结留出情况。

未知项：实际引擎取消/事务语义、服务幂等性、包/运行时兼容性、进程崩溃持久性、提供方图像变换，以及实测质量/延迟。静态源码及未执行的上游测试无法解决这些问题。

### GEPA 适配器与优化器

对具名文本候选组件进行反思式演化。

- **文档记录的接口与拟议用途：**  领域适配器实现 evaluate 和 make_reflective_dataset；提案逻辑可选。候选将组件名称映射为文本。
- **限制：**  GameMap 必须构建可执行策略及独立评估器。丰富的视觉产物需有意识地转换为反思证据包；基准收益不是游戏生产证据。有关提案计数、预算准入、成本跟踪、缓存身份及恢复后的分数，参见[执行控制边界](../evaluation/benchmarks.md#gepa-execution-controls-counts-caches-and-resumed-evidence)。有关耦合组件、全文合并及执行路径计数器差异，参见[组合与核算](../evaluation/benchmarks.md#harness-composition-and-evaluation-accounting)。
- **来源条款：**  MIT 仓库。
- **一手来源：**  [GEPA 适配器协议](https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/adapter.py)；[GEPA 仓库](https://github.com/gepa-ai/gepa)；[GEPA 论文](https://arxiv.org/abs/2507.19457)

### Meta-Harness

针对控制模型信息访问的代码进行外环搜索。

- **文档记录的接口与拟议用途：**  使用入门流程指定任务、可变边界、接口、评估划分、基线、预算及证据。
- **限制：**  这是通用运行框架优化证据；向游戏生产迁移仍未经测试。不要通过持久记忆暴露最终测试数据/结果。[分类实现审计](../evaluation/benchmarks.md#harness-composition-and-evaluation-accounting)进一步限定了导入验证、数据集/种子覆盖及基于字符的成本解释。
- **来源条款：**  MIT 上游仓库。
- **一手来源：**  [Meta-Harness 入门](https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/ONBOARDING.md)；[Meta-Harness 仓库](https://github.com/stanford-iris-lab/meta-harness)；[Meta-Harness 论文](https://arxiv.org/abs/2603.28052)

### DiscoveryRSI：在任务编译过程中保留假设

**论文描述的机制。**  版本化假设结合主张、调查计划、决策标准及替代解释。选定的调查变为 Harbor 包，同时保留这些约定。回放诊断固定检查点的失败；未记录的替代方案需要兼容的恢复状态执行。匹配的开发评估可保留现有方案，或分别/共同接受模型和运行框架变化。报告的生命科学提案质量收益是初步的：专家校准尚待完成，共同祖先使修订观测相互依赖，而回溯性文献对应不能确立因果影响或经实验证实的发现。[论文 v1，第 3.2–3.5 节、附录 A.3–A.4、D–F](https://arxiv.org/html/2610.23839v1)

**已发布实现边界。**  在[修订 `8f721486`](https://github.com/Gen-Verse/DiscoveryRSI/tree/8f7214865548bc9b48170aa844e205341d24c4b9)，[`core.py`](https://github.com/Gen-Verse/DiscoveryRSI/blob/8f7214865548bc9b48170aa844e205341d24c4b9/src/discovery_rsi/core.py)生成候选、评分、选择最高分，并将选定回合存为 JSONL；无候选分支跳过该追加。其 `ReplayBuffer` 追加和读取记录；它不恢复执行状态。[`harness.py`](https://github.com/Gen-Verse/DiscoveryRSI/blob/8f7214865548bc9b48170aa844e205341d24c4b9/src/discovery_rsi/harness.py)提示生成提案及批评。其生成提示传递前一个选定标识符，而非前代方案的主张与计划。[`role_compiler.md`](https://github.com/Gen-Verse/DiscoveryRSI/blob/8f7214865548bc9b48170aa844e205341d24c4b9/plugins/discovery-rsi/roles/role_compiler.md)提供指令，而非 Harbor 包构建器。在[完整固定版本目录树](https://api.github.com/repos/Gen-Verse/DiscoveryRSI/git/trees/8f7214865548bc9b48170aa844e205341d24c4b9?recursive=1)中，未识别到编译器、训练流水线或受控运行框架晋升实现。因此，公开源码检查支持的是可移植的提案循环骨架，而非完整论文协议的复现。

**模型及数据可用性。**  在 `bf91ea68d49fe162c490f5ece38772fefd1de2d6` 观测的 [27B 文件列表](https://huggingface.co/Gen-Verse/DiscoveryRSI-27B/tree/main)仅包含 README 和 Git 属性；缺少权重、分词器及配置。[模型卡](https://huggingface.co/Gen-Verse/DiscoveryRSI-27B)预告未来发布检查点，将模型/基础模型/数据条款留待该发布说明，尽管代码 README 使用了检查点已发布的措辞。另在 `05d6044bd649a0e25bb3b58b0fbb582adb66b327` 观测的[三个任务示例](https://huggingface.co/datasets/Gen-Verse/DiscoveryRSI-Hypothesis-Task-Examples)公开指令、验证器、来源信息、输入要求及包 ZIP。其测试样例/就绪成功字段与 `scientific_result: not_established` 并存。这是示例产物可用性，而非训练语料库或经验证的科学执行。项目自有[代码许可](https://github.com/Gen-Verse/DiscoveryRSI/blob/8f7214865548bc9b48170aa844e205341d24c4b9/LICENSE)声明 Apache-2.0；它不许可尚不存在的检查点。

**拟议的游戏生产迁移，尚未实现。**  将可证伪的主张附加到[生产工单](../production/work-orders.md)：例如，特定碰撞变化是否消除了可复现的穿越失败，同时保留明确的对照路线。将主张编译为固定的项目/构建输入、输入序列、必需状态/帧证据、反证结果及停止规则。执行前审查工单是否仍在测试原始主张。让工单产物、假设修订及实际执行结果各自可独立引用。成功生成或结构有效的测试包，不能确立机制已修复；选定的批评分数也不能确立跨项目改善。

### SWE-agent ACI 研究

证明面向智能体的工具/接口设计是优化变量的证据。

- **文档记录的接口与拟议用途：**  GameMap 假设：在匹配权限及预算下，领域专属的检查/编辑/测试工具优于原始编辑器脚本。
- **限制：**  软件工程基准证据不验证视觉生产或引擎状态推理。
- **来源条款：**  复用前应分别检查论文/代码许可证。
- **一手来源：**  [SWE-agent 论文](https://arxiv.org/abs/2405.15793)；[SWE-agent 实现](https://github.com/SWE-agent/SWE-agent)

### Voyager

Minecraft 中的可执行技能记忆及迭代环境反馈学习。

- **文档记录的接口与拟议用途：**  迁移假设：检索版本化且经验证的工具组合，作为可复用技能；环境/API 变化后使其失效。
- **限制：**  玩法学习不是资产创作证据；不要将其代码技能记忆描述为原始视觉记忆。
- **来源条款：**  论文和代码权利需分别审查。
- **一手来源：**  [Voyager 论文](https://arxiv.org/abs/2305.16291)

### Minecraft 团队协作：相邻的执行运行框架证据

[v1 报告](https://arxiv.org/html/2610.22319v1)描述的是玩游戏，而非创作游戏：四个编码智能体完成了一次简单难度的 Minecraft Java 运行。它不能确立跨种子的可靠性或开发质量（第 2、8 节）。

Mineflayer 接口提供特权文本状态，包括隐藏方块及末影龙内部状态，以及寻路。它不是仅像素玩法。程序接收 bot，在调用间保留全局值，并使用智能体选定的超时。报告的用于停止超时后残留代码的计数器，促使我们[单独测试超时、取消及过期影响](../evaluation/gameplay-state.md)；论文没有发布取消保证（第 2.1、4、8 节）。

共享记忆跨程序/上下文压缩保留坐标及工具经验。不参与游戏的 Observer 检查主张，而报告的胜利由服务器进度事件支持。仅团队消息不是权威结果证据（第 2.1–2.3、4–5 节）。

论文称记录了程序、输出、聊天和服务器事件。其 HTML 没有链接发布该团队的运行框架、完整日志或世界；记录不等于产物可用。参考文献中的仓库/数据集链接涉及其他项目（第 5、7、9 节）。

拟议的 GameMap 改造，尚未实现：比较智能体运行前，声明观测特权、记忆/重置范围、取消所有权及权威终止事件。未进行运行时复现。

### Reflexion

将回合式文本反思用作不更新权重的适应基线。

- **文档记录的接口与拟议用途：**  迁移假设：有界的失败经验，链接原始证据，并分离训练/测试记忆。
- **限制：**  文字反馈可能有误；应保留观测及评估器证据，而非用摘要覆盖。
- **来源条款：**  未核查论文/代码权利。
- **一手来源：**  [Reflexion 论文](https://arxiv.org/abs/2303.11366)

### VideoAgent（Fan 等）：记忆增强

用于视频问答的结构化时间事件及对象状态记忆。

- **文档记录的接口与拟议用途：**  迁移假设：针对回合证据进行以对象为中心的检索，附带时间戳及模型置信度。
- **限制：**  离线视频理解不是因果游戏状态观测；应与 Wang 等的另一篇 VideoAgent 论文区分。
- **来源条款：**  未核查论文/代码权利。
- **一手来源：**  [VideoAgent：用于视频理解的记忆增强多模态智能体](https://arxiv.org/abs/2403.11481)

### VideoAgent（Wang 等）：长视频

迭代信息选择，而非加载完整视频上下文。

- **文档记录的接口与拟议用途：**  迁移假设：仅在诊断不确定性需要时请求额外帧；在匹配视觉词元预算下比较。
- **限制：**  论文研究视频 QA，而非引擎调试；报告的帧效率不是 GameMap 结果。
- **来源条款：**  未核查论文/代码权利。
- **一手来源：**  [VideoAgent：以大语言模型为智能体理解长视频](https://arxiv.org/abs/2403.10517)

### Cradle / 通用计算机控制

仅截图观测及键盘/鼠标动作的比较条件。

- **文档记录的接口与拟议用途：**  迁移假设：将仅截图配置与特权引擎状态配置分开，避免隐藏的信息优势。
- **限制：**  玩游戏及 GUI 任务不能确立生产正确性。截图访问不能暴露所有隐藏世界状态。
- **来源条款：**  论文/代码/游戏许可证需分别审查。
- **一手来源：**  [Cradle 论文](https://arxiv.org/abs/2403.03186)

## 评估设计

### Procgen Benchmark

用于评估玩法智能体泛化能力的程序化游戏环境。

- **文档记录的接口与拟议用途：**  start_level 和 num_levels 决定关卡种子；gym3 get_state/set_state 使用字节串。环境不使用 GPU。
- **限制：**  这是玩法基准，而非游戏创作能力或不存在 LLM 训练污染的证据。固定库版本；文档记录了 gym reset/render 及 fork/线程限制。
- **来源条款：**  MIT 代码；仓库单独列出资产许可证。
- **一手来源：**  [Procgen Benchmark 官方文档](https://github.com/openai/procgen)

### Crafter

面向玩法智能体、以成就为导向的生存基准。

- **文档记录的接口与拟议用途：**  Gym 接口公开 64x64x3 观测及 17 种分类动作；记录器可保存统计、视频及回合。
- **限制：**  成就进度不能证明资产创作或修复能力。仅留出世界种子不能证明没有模型训练污染。
- **来源条款：**  仓库许可证为 MIT；重新分发前检查资产权利。
- **一手来源：**  [Crafter 官方文档](https://github.com/danijar/crafter)

### rliable

考虑不确定性的基准汇总分析。

- **文档记录的接口与拟议用途：**  分层自助法区间、性能曲线、IQM、最优性差距及改善概率。
- **限制：**  统计区间不能消除选择偏差、留出任务泄漏或相互依赖的重跑。比较运行框架变体前定义任务/种子采样单位。
- **来源条款：**  Apache-2.0。
- **一手来源：**  [rliable 官方文档](https://github.com/google-research/rliable)

## 拟议的验收与优化协议

进行受控比较时：

1. 优化提示或工具前，选择有界工单及权威状态断言。纳入已知良好的对照、故意破坏的项目及缺失产物情况。
2. 区分构建成功、功能正确性、视觉质量、可玩性、性能及证据完整性。不要将它们压缩为未经解释的成功分数。
3. 分开候选开发、选择及最终评估。根据记录的策略重置持久记忆、缓存及项目副本；不要让最终测试观测进入后续候选选择。
4. 将不变的运行框架与每次一项干预进行比较：语义工具、视觉选择、调试视图、记忆或循环内生成。保留资源预算、失败尝试及工具错误。
5. 保存候选源码、模型/服务标识符、输入、命令、种子、输出哈希、日志及测量条件。源码提交不能固定正在运行的服务、模型权重或目标项目。
6. 将超时视为未解决的作业，直到底层进程或远程任务得到对账。将冷启动重开和回归场景与会话内预览分开测试。

尚存空白包括游戏专属的动作/状态对齐、异步操作后可靠捕获、推断视觉特征的不确定性校准、客观外观目标，以及独立的端到端复现。本合集未执行任何本地引擎、性能分析器、模型或付费 API。
