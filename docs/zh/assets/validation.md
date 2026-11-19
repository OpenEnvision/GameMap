# 资产交换与验证契约

在每次交接时检查生成的资产：文件格式、几何体、材质、动画、依赖项以及引擎导入。使用下列针对各格式的要求，为目标工具链制定验收检查。

## 1. 验证可移植资产，不要混淆格式有效性与保真度

**已记录的操作与字段。**  [glTF 2.0 规范](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.pdf)规定使用米、弧度、右手坐标系及 Y 轴正方向朝上。[Khronos Validator](https://github.com/KhronosGroup/glTF-Validator) 验证 glTF 2.0，并生成 JSON 格式的问题报告与资产统计信息。[glTF Transform](https://gltf-transform.dev/) 提供读取／编辑／写入 API、扩展包和批处理 CLI。[Assimp](https://github.com/assimp/assimp) 将受支持的导入格式转换为通用的内存表示，但只能导出其中部分格式。因此，导入支持与导出支持是不同的能力。

**建议的验收契约。**  转换前，记录单位／基底、扩展清单、外部资源标识、场景层级、材质槽及动画／蒙皮预期。为原始资产与候选资产保留完整的验证器报告和工具版本。将不受支持的必需扩展和缺失的外部资源视为明确的阻断项。随后，在实际消费该资产的导入器中，比较候选资产的几何体、场景标识和采样变形。结构有效的资产仍可能丢失预期的材质行为、动画或碰撞语义。

**失败／恢复／持久化。**  保留原始资产和转换设置。导入器返回对象，并不能证明每项创作特性都得到了保留。修正候选资产后，应在新的输出位置重试；绝不要覆盖唯一的源文件，也不要根据函数成功返回就推断导出／回滚具有原子性。另一个建议的门槛是在新进程中重新打开，并核对外部资源清单。

**尚未实现的测试夹具：**  一个不对称的蒙皮对象、一个必需扩展、一张缺失的纹理和一个声明的动画采样。比较转换前后的报告和目标引擎状态，而非仅比较一张预览图。

**版本／许可证范围：**  格式范围为 glTF 2.0；未锁定规范的具体修订版及实现版本。Validator 声明采用 Apache-2.0；Assimp 文档注明采用修改版三条款 BSD。glTF Transform 在[所检查提交 8e2a94a 上的许可证](https://github.com/donmccurdy/glTF-Transform/blob/8e2a94a2616d293c4b503d0fb6a4b42e6ec7c62f/LICENSE.md)为 MIT；依赖项与输入资产的条款仍须分别考虑。此前解析 Validator 提交时受到速率限制；此处不虚构不可变修订版本。

### 高斯泼溅编辑与交付

空间高斯资产需要针对具体渲染器的导出／导入契约。以下经检查的行为补充了网格／交换格式验证；并未运行任何编辑器、导入器或往返流程。

#### 来源与版本范围

- SuperSplat v3.5.2 通过[标签对象](https://api.github.com/repos/playcanvas/supersplat/git/tags/477e30f3d31ba95a8afc6b2f2a118a5397e26484)解析到提交 `f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b`。其[包清单](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/package.json)声明版本为 3.5.2、splat-transform 3.9.0 和 PlayCanvas 2.23.0。未检查已安装／已部署的版本。
- UnityGaussianSplatting 所选提交 `2c6fed37da67a217367261fcfcd3316d34c73e76` 是较晚的主分支快照， **不是 v1.1.1 标签** 。其[包清单](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/package.json)仍声明 1.1.1 / Unity 2022.3.7f1；[v1.1.1 标签](https://api.github.com/repos/aras-p/UnityGaussianSplatting/git/ref/tags/v1.1.1)则指向另一个提交 `9310dce438da726244ace17eaf6f768826435fa4`。不要将包版本与测试／源码提交混为一谈。

#### 1. 导出交付资产，并单独保留编辑工程

SuperSplat 的常规导出会收集可见且非空的场景图层；默认行为 **不** 表示“仅导出选中的高斯”。选择过滤是一个可选的序列化器设置，复制／粘贴也会使用它。删除会从活动列表中移除实例，并保留撤销记录；同时处于选中和锁定状态的实例不会被基于选择的删除操作移除。因此，通过选择／反选／删除进行裁剪，不同于仅绘制选区或隐藏整个图层。

证据：[可见图层收集](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/file-handler.ts#L425-L430)、[默认过滤器](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/splat-serialize.ts#L252-L270)、[删除与撤销](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/edit-ops.ts#L172-L205)、[官方清理方法](https://developer.playcanvas.com/user-manual/supersplat/getting-started/)。

`.ssproj` 路径写入文档 JSON、相机／视图／时间线／姿态设置、原始资源行，以及各图层的实例／调色板数据。常规泼溅导出则烘焙编辑结果，不会序列化这些编辑器状态记录。重要的是，保存工程并不意味着无条件归档已删除数据：普通的紧凑保存会丢弃未被任何图层引用的行；原位保存则会保留这些行，使当前会话的撤销功能仍能访问它们。不要推断重新打开后撤销历史仍会保留。

证据：[工程数据与压缩整理](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/doc.ts#L230-L347)、[原位保存例外](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/doc.ts#L385-L396)、[实例标志／调色板](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/doc-instances.ts#L35-L80)。

#### 2. 记录变换应用、SH 阶带及不可逆的元数据丢失

SuperSplat 常规导出组合了绕 Z 轴 -180° 的旋转（代码将其描述为撤销加载时的约定）、实体世界矩阵，以及逐实例变换调色板。它会变换位置、旋转和缩放，旋转保留的 SH 系数，并烘焙颜色／透明度调节。内部选项 `keepWorldTransform=true` 会跳过世界变换／PLY 翻转部分；但不会禁用调色板变换。这些事实是特定源码的约定，并非通用的坐标轴转换方法。

导出源码明确声明了一个 LOD、`model: 'default'` 和 `extraColumns: []`。其注释指出，编辑流水线在加载过程中不会保留抗锯齿／2DGS 训练模型标签。SH 输出受所选最大值及可用数据限制。因此，未压缩导出并不能证明原始元数据、LOD 结构、任意自定义列或所有 SH 阶带均得到了保留。

证据：[变换组合](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/splat-serialize.ts#L76-L160)、[导出模式与阶带](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/splat-serialize.ts#L330-L383)、[属性／SH／调色烘焙](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/splat-serialize.ts#L441-L504)。

#### 3. 压缩不仅改变精度，也改变保留的成员

在这条 SuperSplat UI 路径中，压缩 PLY、SOG 和 SPZ 将最低不透明度设为 1/255，并启用实现中的无效数据过滤器；普通 PLY 则不启用这些设置。该谓词在后续调色步骤之前，丢弃源 sigmoid 不透明度 **严格低于** 阈值的数据。“无效”遵循实际针对各属性的判定条件，而不是一概禁止所有原始对数域无穷值的规则。

官方滚动更新文档区分了未压缩 PLY、量化的压缩 PLY 和有损 SOG；SOG 并非只是对原始属性做无损 zip 压缩。文件大小必须同时附带选择数量、解码后保留数量和请求的 SH 阶带。

证据：[格式专用设置](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/file-handler.ts#L748-L786)、[过滤谓词](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/splat-serialize.ts#L219-L296)、[导入／导出格式](https://developer.playcanvas.com/user-manual/supersplat/editor/import-export/)、[SOG 规范](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/sog/)。

#### 4. “支持 SPZ”并不是导入器兼容性契约

SuperSplat 的锁定版序列化器提供 SPZ 版本 3 和 4，默认采用 4。所选 Unity 导入器明确要求 SPZ 头部版本为 2，否则会抛出异常。这是通过静态检查确定的版本不匹配，而非实际观察到的导入失败。将 SuperSplat 从 SPZ 4 改为 SPZ 3，并不能满足该导入器的要求。

Unity 仅将 `.ply` 和 `.spz` 路由至相应读取路径；其 PLY 读取器要求二进制小端 1.0，且高斯读取器要求浮点值的位置、DC 颜色、不透明度、缩放及四元数属性。通用网格 PLY、ASCII PLY、SOG，以及仅以 `.ply` 结尾的文件名，都不能替代该模式。必需字段验证不会检查高阶 SH 是否完整保留。

证据：[SuperSplat SPZ 版本](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/export-options.ts#L10-L24)、[默认 SPZ 4](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/file-handler.ts#L779-L786)、[Unity 拒绝 SPZ 的逻辑](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/Editor/Utils/SPZFileReader.cs#L20-L49)、[PLY 编码](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/Editor/Utils/PLYFileReader.cs#L32-L64)、[路由／模式](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/Editor/Utils/GaussianFileReader.cs#L45-L78)。

#### 5. Unity 编辑／导出具有自身的质量与坐标边界

锁定版 Unity 编辑指南建议编辑时采用 Very High 导入质量，因为较低预设已经过量化／近似处理。导出会排除已删除及被裁切掉的高斯；文档中的世界空间选项会烘焙变换并旋转 SH。裁切体是用于视觉包含／排除的体积，不是碰撞体。手动编辑没有撤销功能；指南建议通过禁用／重新启用渲染器来还原所有编辑。

不要把“世界空间导出”泛化为已证明任意层级／缩放均能保持保真度。实现会将 localRotation/localScale 与 localToWorldMatrix 一起传入；着色器单独处理坐标轴符号翻转，并明确限制了该处理。嵌套变换、非均匀缩放和反射需要测试夹具验证，而不能假设具有往返保证。

证据：[编辑指南](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/docs/splat-editing.md)、[导出保留项／写入路径](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/Editor/GaussianSplatRendererEditor.cs#L394-L444)、[变换参数](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/Runtime/GaussianSplatRenderer.cs#L936-L956)、[着色器变换](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/Shaders/SplatUtilities.compute#L617-L642)。

#### 6. 非空产物、边界与视觉观察是各自独立的门槛

在检查过的 SuperSplat `writeSplatFile` 路径中，如果没有任何高斯通过导出过滤，就会提前返回而不调用写入器；外层 `scene.write` 路径却仍可能返回 true。因此，仅凭返回值不能证明已交付的产物非空。浏览器文件的关闭和中止操作确实存在，但此处并未确立崩溃后的持久性，也未确立最终用户下载完成的保证。

检查过的编辑器边界通过归约变换后的 **中心** 得到；它们不是完整的高斯支撑范围、碰撞体积或可行走网格。Unity 中检查过的视图颜色路径依据相机方向和不透明度求值存储的 SH；这不能证明其已重建为可重新打光的 PBR 材质。普通 PLY 导出也不承诺包含相机轨迹：SuperSplat 的查看器设置和 `.ssproj` 单独存储相机信息；Unity 可以导入独立的 `cameras.json`。

证据：[零保留项源码](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/splat-serialize.ts#L549-L559)、[提前返回](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/splat-serialize.ts#L632-L650)、[成功返回](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/file-handler.ts#L789-L797)、[写入器关闭／中止](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/io/write/browser-file-system.ts#L25-L43)、[中心边界](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/data-processor/calc-bound.ts#L59-L80)、[视图颜色](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/Shaders/SplatUtilities.compute#L240-L248)、[查看器相机设置](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/src/export-options.ts#L55-L118)、[Unity 相机输入](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/package/Editor/GaussianSplatAssetCreator.cs#L1068-L1096)。

所检查的泼溅导出接口均不生成网格连接关系、玩法规则或碰撞验收结果。可能存在独立的碰撞生成工具。

#### 建议的 GameMap 往返测试夹具，并非文档记载或已执行的行为

保留不可变的源字节、来源／许可证、全精度参考、`.ssproj`、编辑器／导入器提交，以及派生物清单。声明单位／基底、世界变换与局部变换策略、可见／选中／已删除／锁定数量、保留的 SH 阶带、源模型标签／自定义字段、已加载 LOD、压缩／过滤设置及预期输出模式。

使用一个小型的 **合成、权利已获许可、不对称的全阶带高斯测试夹具** ，包含坐标轴标记、一个旋转的各向异性高斯、可区分的 SH 响应、低于／等于／高于 1/255 的不透明度样本、一个隐藏图层、选中及锁定示例，以及一个有意删除的样本。比较普通 PLY 与压缩派生物；单独重新打开编辑工程。对于建议的 Unity 桥接，使用经确认符合要求的二进制小端标准高斯 PLY，而非 SPZ 3/4 或笼统的“PLY”声明。

验收需要新写出的产物，记录其哈希并解析出非零数量／模式、预期保留项清单、变换后的位置／协方差，以及在固定相机／渲染／显示设置下对方向性 SH 的观察，并单独记录导入器结果。包括全部被过滤／空导出、较低 SH 阶带、损坏／截断输出、缺少相机伴随文件、嵌套父级变换、非均匀／反射缩放，以及紧凑保存／重新打开等情况。具体容差与目标 GPU／渲染管线仍由项目决定。不要将部分文件提升为正式产物；保留原始资产，并以修正后的设置重试生成新候选。碰撞、导航和动态交互需要各自的产物与玩法测试。

#### 许可证范围

锁定版本的 [SuperSplat LICENSE](https://github.com/playcanvas/supersplat/blob/f2a1b4975b4766e0ee0c95e63c2737dc2ecb6e5b/LICENSE) 和 [UnityGaussianSplatting LICENSE](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/LICENSE.md) 均为 MIT 软件许可证。它们不能确立对采集内容、生成场景、训练器／模型输出或每项依赖的权利。锁定版 [Unity README 许可证章节](https://github.com/aras-p/UnityGaussianSplatting/blob/2c6fed37da67a217367261fcfcd3316d34c73e76/readme.md#license-and-external-code-used)明确警示，上游训练来源需要单独考虑。这不是针对所有 INRIA 训练资产的当前法律结论；应针对预期用途检查确切的训练器／模型／数据条款。

## 2. 保留 USD 组合，并审慎解析受管资产

**已记录的操作与字段。**  [UsdStage](https://openusd.org/release/api/class_usd_stage.html) 提供组合、变体、载荷加载、保存和展平操作。`Save()` 不包含会话层；已修改的匿名层需要显式导出。展平会解析组合，而非保留原始可编辑结构。`GetUsedLayers()` 是受加载集和变体选择影响的快照，并非所有可能配置的清单。`GetTimeCodesPerSecond()` 返回舞台的时间码速率，并遵循文档规定的元数据回退规则。更广泛的 [OpenUSD 文档](https://openusd.org/release/index.html)介绍了场景组合工具集。[Blender 4.4 USD 交换](https://docs.blender.org/manual/en/4.4/files/import_export/usd.html)支持 USD 数据的一个子集，并记录了包括 UDIM 纹理在内的 USDZ 限制；这并不是对后续 Blender 版本的声明。

[OpenAssetIO 示例](https://docs.openassetio.org/OpenAssetIO/examples.html)需要具体的管理器插件；部分示例明确说明，没有插件便无法运行。资产管理 API 不会提供已配置的资产数据库，也不保证实体可解析。

**建议的验收契约。**  记录根层／会话层／编辑目标标识、选定变体、载荷加载策略、时间元数据、解析器／管理器标识，以及已解析资源清单。在写入前，选择交付可编辑组合，还是交付展平求值结果。明确标出拟交付的会话编辑。在新进程中，使用预期解析器打开候选资产，并比较必需变体和时间样本。

**失败／恢复／持久化。**  管理器缺失、引用未解析、匿名层未保存或会话编辑缺失，都会阻止提升为正式产物。保留未解析的标识符及诊断信息，而不是用猜测的本地路径替换。保存失败不意味着可以展平并丢弃组合。仅可在记录的同一管理器／配置下重新解析，否则应将改变后的解析结果标记为新候选。事务性多层保存与跨管理器等价性仍属未知。

**尚未实现的测试夹具：**  仅存在于会话中的变体选择、已编辑的匿名层、未加载的载荷，以及经管理器解析的引用。要求同时提供序列化产物清单及冷启动重新打开的观察结果。

**版本／许可证范围：**  OpenUSD `release` 和 OpenAssetIO 示例为滚动更新内容；在所检查的页面中，未确立确切的库／许可证及插件条款。Blender 证据明确针对 4.4。下文的专项打包审查锁定了部分 OpenUSD 源码；它不能确立已安装库、解析器插件或资产的权利。未访问任何工作室资产服务器。

### OpenUSD 打包：发现依赖不等于形成可移植的完整依赖闭包

来源检查日期为 2026-10-19；仅进行了静态源码检查。本次选定版本审查以依赖发现范围、包修改策略和包验收补充组合／保存指导；并不确立可运行的适配器。

**版本范围。**  官方 [v25.05 标签引用](https://api.github.com/repos/PixarAnimationStudios/OpenUSD/git/ref/tags/v25.05)解析到 `25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28`。该选定源码版本不能标识已安装的运行时或最新发行版。

**文档记载及源码观察到的边界。**

- [`UsdUtilsExtractExternalReferences`](https://github.com/PixarAnimationStudios/OpenUSD/blob/25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28/pxr/usd/usdUtils/dependencies.h#L44-L90) 检查单个文件，而非递归依赖闭包。它将子层、引用和载荷分开；引用包含资产值属性和片段路径。`UsdUtilsComputeAllDependencies` 返回递归层、非层资产和未解析路径集合。其布尔值并不表示未解析路径为空。
- [实现](https://github.com/PixarAnimationStudios/OpenUSD/blob/25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28/pxr/usd/usdUtils/dependencies.cpp#L94-L185)会收集未解析路径，但仍可能返回 true。它有意将不受支持的包内片段模板解析排除在未解析项报告之外。因此，即使未解析列表为空，也不能证明已覆盖这种情况。应使用新的结果容器；在该修订版中，层输出是追加写入的，尽管头文件中笼统描述为清空。这是静态契约差异，而非实际观察到的生产故障。
- [本地化遍历](https://github.com/PixarAnimationStudios/OpenUSD/blob/25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28/pxr/usd/usdUtils/assetLocalization.cpp#L113-L145)会访问已创作的变体规格及载荷／引用字段，而不仅仅是舞台当前选定的组合。因此，它不同于 `GetUsedLayers()` 的当前舞台快照。此实现中的[片段模板发现](https://github.com/PixarAnimationStudios/OpenUSD/blob/25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28/pxr/usd/usdUtils/assetLocalization.cpp#L245-L288)需要文件系统目录。不要将这种遍历标记为对解析器任意生成的依赖都适用的通用闭包。
- [打包 API](https://github.com/PixarAnimationStudios/OpenUSD/blob/25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28/pxr/usd/usdUtils/usdzPackage.h#L22-L120)要求调用方配置解析器上下文，会本地化路径并序列化遇到的匿名层。目录依赖会被忽略，而非递归打包。默认的 `editLayersInPlace=false` 通过临时副本保留源层；true 会修改源层，但不还原或持久化它们，且仅建议在与已打开舞台隔离的环境中使用。
- [ARKit 专用路径](https://github.com/PixarAnimationStudios/OpenUSD/blob/25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28/pxr/usd/usdUtils/usdzPackage.cpp#L107-L185)可在打包前展平外部组合，并明确警告变体集会丢失。对于需要可编辑组合的交付物，它不是可互换的“仅打包”后备方案。
- [包写入](https://github.com/PixarAnimationStudios/OpenUSD/blob/25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28/pxr/usd/usdUtils/assetLocalizationPackage.cpp#L87-L129)对重复目标路径以及无法重新打开的层发出警告并跳过；在这些分支中，不会把基础写入器累积的成功标志置为 false。[USDZ 包装器](https://github.com/PixarAnimationStudios/OpenUSD/blob/25f3d3d84440d0a80cb27f7e3383f2e71d8cfb28/pxr/usd/usdUtils/usdzPackage.cpp#L27-L40)另行要求归档的 `Save()` 成功。这说明应独立验证成员；它不能确立此类情况出现的频率，也不意味着每个成功生成的包都不完整。

**建议的验收契约，尚未实现。**  记录根标识符／哈希、解析器／上下文标识、发现回调及排除项、预期的组合／变体／载荷范围、包类型、首层名称及修改标志。分别保存枚举布尔值、层／资产／未解析列表、不支持的发现情形、打包布尔值和完整诊断信息。提升为正式产物前，将项目自行维护的预期依赖清单与实际包成员及重写后的路径进行核对；明确标出被忽略的目录和不受支持的片段模板情形。在无法访问原始资产树的新消费进程中，从迁移后的包重新打开，再测试必需的变体、载荷和时间样本。这只能支持针对该消费方／配置的有限可移植性声明，而非所有可能的场景配置。

保留源字节，并使用隔离的候选目标位置。拒绝必需资产未解析、意外跳过成员或未经授权展平的情况。不要通过静默移除引用、更改解析器上下文或启用原位编辑来修复。包创建与目标验收是两个独立判定；中断回滚及多文件持久性仍未经验证。

**未执行的测试夹具：**  缺失的纹理、未选变体中的引用、未加载的载荷、值为目录的依赖、包内片段模板、包成员冲突，以及对外部组合进行 ARKit 打包。比较声明的覆盖范围、诊断、成员及冷启动重新打开的观察结果，而非仅比较文件是否存在或返回值。本提案未附带任何 DCC 安装、上游代码执行、资产下载或运行时兼容性声明。

## 3. 将材质图、颜色处理和纹理压缩分开

**已记录的操作与字段。**  [MaterialX](https://materialx.org/) 使用标准处理／着色节点表示材质网络、数值和分配；其[官方实现仓库](https://github.com/AcademySoftwareFoundation/MaterialX)提供代码和 Python 接口。[OpenColorIO 文档](https://opencolorio.readthedocs.io/en/latest/)介绍可配置的颜色管理和 ACES 工作流。[KTX-Software](https://github.com/KhronosGroup/KTX-Software) 提供 KTX2/Basis Universal 工具、创建／转换／比较／提取操作以及 JavaScript/WebAssembly 接口。完整的源码检出需要 Git LFS 内容。

**建议的验收契约。**  在纹理导出工单中增加三份清单：材质图及受支持的节点实现；选定的颜色配置／变换；容器／编解码器及实际目标转码格式。将颜色纹理与法线／遮罩／数据纹理分开。记录解码后的尺寸、mip 层级、通道含义及 alpha 策略，然后在目标渲染条件下检查预期材质。仅支持文件／容器，并不能确立 GPU 纹理保真度可接受或渲染器效果一致。

**失败／恢复／持久化。**  缺少节点实现、缺少 LFS 字节、不支持转码目标或源颜色解释未知，都会使验收处于未完成状态。保留未压缩母版、图、配置及压缩派生物的哈希。编码器／质量／转码目标发生变化时，应作为新候选重试。不要静默替换着色器、重复应用显示变换，或将不完整的源码检出标为可构建。跨渲染器视觉等价性及导出中断后的持久性仍未经验证。

**尚未实现的测试夹具：**  在两种受支持的目标格式中使用颜色渐变、alpha 边缘、打包数据贴图和法线贴图，声明误差容限并提供引擎渲染观察结果。这是在先前纹理工单中增加压缩／图覆盖，而非重复其图像清单门槛。

**版本／许可证范围：**  上述概览链接为滚动更新内容；已安装的 MaterialX 节点库、OCIO 配置及 KTX 编码器／转码器版本未知。下文专项 MaterialX 审查现已锁定选定版本，取代此前源码版本未锁定的状态。这些页面并未确立确切的 OCIO/KTX 依赖项／许可证清单。

### MaterialX 图、生成代码及编译器判定

来源检查日期为 2026-10-18；未进行完整复现。本专项补充将材质生成与已经记录的 [GPU 调用诊断](../production/debugging.md#2-complete-a-specific-shader-invocation-diagnosis)分开。

#### 来源与版本范围

GitHub 标签端点将 MaterialX v1.39.4 解析为 `270b5cf2ae2be24a3b6ef4b0569f1c93038dda1d`。这是选定的可复现版本，并非对最新发行版或用户已安装版本的声明。

- [标签引用](https://api.github.com/repos/AcademySoftwareFoundation/MaterialX/git/ref/tags/v1.39.4)
- [着色器生成指南](https://github.com/AcademySoftwareFoundation/MaterialX/blob/270b5cf2ae2be24a3b6ef4b0569f1c93038dda1d/documents/DeveloperGuide/ShaderGeneration.md)：生成操作产生源代码，需要着色语言编译器及渲染器，并且需要针对所选目标的实现；不同渲染器变体可能需要不同生成器。宿主端的 uniform、纹理和几何绑定仍由应用负责。
- [示例脚本的验证器包装器](https://github.com/AcademySoftwareFoundation/MaterialX/blob/270b5cf2ae2be24a3b6ef4b0569f1c93038dda1d/python/Scripts/generateshader.py#L16-L31)
- [文档验证](https://github.com/AcademySoftwareFoundation/MaterialX/blob/270b5cf2ae2be24a3b6ef4b0569f1c93038dda1d/python/Scripts/generateshader.py#L85-L88)
- [生成与判定路径](https://github.com/AcademySoftwareFoundation/MaterialX/blob/270b5cf2ae2be24a3b6ef4b0569f1c93038dda1d/python/Scripts/generateshader.py#L149-L198)
- [许可证](https://github.com/AcademySoftwareFoundation/MaterialX/blob/270b5cf2ae2be24a3b6ef4b0569f1c93038dda1d/LICENSE)：项目软件许可证为 Apache-2.0；这不能确立外部纹理或导入材质的权利。

#### 静态发现，而非测得的故障

1. `doc.validate()` 返回有效性标志及诊断信息。示例在其为 false 时打印警告，然后继续生成着色器。因此，生成了文件并不能证明文档验证通过。
2. 可选的 `validateCode` 包装器在子进程执行成功和出现 `CalledProcessError` 时都会返回解码后的输出，并丢弃后者的返回码。调用方将非空输出标为失败，将空输出标为成功。因此，如果编译器成功但输出了提示信息，它会被归类为失败；如果编译器静默失败，且该元素的其他验证调用也未产生输出，则在这一路径上该元素会被归类为通过。这些是所检查控制流的条件性后果，并非实际观察到的编译器行为。
3. 未提供验证器时，包装器返回空文本，调用方则打印验证通过消息。这既不能确立外部编译器已被调用，也不能确立目标兼容性。
4. 可渲染元素循环可能为空，而不填充 `failedShaders`；仅凭最后的失败检查，不能确立任何预期材质都已生成。测试框架需要一份预期输出清单。
5. 输出文件在外部验证之前直接写入。脚本没有确立所有材质的原子事务，也没有确立后续失败时的回滚。源产物的持久化与验收必须分别记录。

#### 建议的验收契约

输入：材质文档哈希；确切的标准／自定义节点库和源码搜索路径；生成器／版本／目标；预期可渲染元素及阶段；目标引擎／编译器／驱动；纹理、单位、颜色解释和宿主绑定。

维护独立结果：文档有效性与诊断；非空的预期元素／阶段覆盖；生成源码哈希；编译器是否调用标志、确切参数、退出码及完整日志；目标渲染器执行和视觉证据。不要根据单一退出码或面向人的“通过”文本行推断这些状态。

每个候选使用新的输出目录，隔离部分输出，并在提升为正式产物前将输出清单与预期材质比较。节点库、目标绑定或纹理的变化会产生不同候选。建议的负面测试夹具包括格式错误的图、缺少目标实现、空可渲染集合、成功但有输出的验证器、失败但无输出的验证器，以及中断的多材质生成。这些测试夹具尚未实现或运行。

最后在实际消费方中渲染受控测试夹具，保留相机、灯光、几何体、纹理绑定及原始／通道产物。比较预期语义，而非要求跨渲染器像素完全一致。编译器成功不能确立法线贴图／色彩空间处理正确、材质外观正确或 GPU 性能达标。实际导入器保真度、取消、原子持久化及运行时正确性仍未经验证；要进一步增强信心，需要经授权的运行时实验。

对于原始图像证据，除了最终效果预览，还要保留[渲染通道与遮罩契约](visual-evidence.md#render-pass-and-matte-artifacts)。

### KTX 验证策略、法线贴图打包及转码目标

来源检查日期为 2026-10-18；未进行完整复现。这是在上述通用纹理清单和[纹理导出工单](../production/work-orders.md#3-export-textures-without-losing-channels-or-color-meaning)中增加命令与载荷边界。

#### 采用命令前先锁定版本

KTX-Software 的最新发行版 URL 解析为  **v4.4.2** ，而其实时生成的工具参考文档自称为  **5.0.0** 。以下契约锁定到 v4.4.2 源码，提交为 `4d6fc70eaf62ad0558e63e8d97eb9766118327a6`（附注标签对象 `936b655d10fe75f900967f524ba31005bebcbb47`）。不要推断该发行版支持实时文档中更新的 HDR 编码器／目标。

来源：[发行版](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.4.2)、[实时转码参考](https://github.khronos.org/KTX-Software/ktxtools/ktx_transcode.html)。

#### 验证成功需要明确命名的策略

对于 glTF 流水线，建议的检查为 `ktx validate --gltf-basisu --warnings-as-errors --format json asset.ktx2`。这是依据文档提出的命令，并非已执行的结果。`--gltf-basisu` 启用扩展专用检查；普通 KTX 验证并不是同一策略。除非明确要求，否则警告不会视为错误。验证进入报告生成阶段后，stdout 包含 `valid` 和 `messages` 数组，其中有问题 ID、类型、消息及详情。应将 stdout 与 stderr 分开保存，同时保留版本和退出状态。参数、打开输入及早期致命错误不一定产生 JSON；JSON 缺失或格式错误属于工具／报告失败，不能自动作为资产判定。

文档记录的退出类别为：0 成功、1 参数失败、2 I/O 失败、3 输入无效、4 运行时／库失败、5 不支持的操作／状态，以及 6 尚未实现的功能。验证失败会抛出输入无效类别。应区分资产拒绝与基础设施／工具失败，而不是把每个非零退出都标为“坏纹理”。

锁定版本来源：[验证器](https://github.com/KhronosGroup/KTX-Software/blob/4d6fc70eaf62ad0558e63e8d97eb9766118327a6/tools/ktx/command_validate.cpp)、[退出码与报告格式](https://github.com/KhronosGroup/KTX-Software/blob/4d6fc70eaf62ad0558e63e8d97eb9766118327a6/tools/ktx/command.h)。

#### 法线模式会改变着色器契约

`--normal-mode` 接受至少有两个分量的线性纹理。三／四通道输入被视为 XYZ 单位法线；第四通道会被丢弃，XY 被重新打包为 RGB=X、A=Y。文档中的重建方式采样 GA 并重建正 Z。这是通道布局变换，而非仅仅一个质量预设。除非消费它的着色器明确实现该布局，否则应拒绝这一预设；保留材质槽／编码／通道布局记录。

`--normalize` 对双分量输入归一化的是二维向量；其文档明确警告，不要将该结果与 `--normal-mode` 一起用于生成 XY 法线。另外，指定传递函数与转换像素值是不同的操作。当意外转换必须使构建失败时，应优先明确意图并使用 `--fail-on-color-conversions`。

锁定版本来源：[法线模式契约](https://github.com/KhronosGroup/KTX-Software/blob/4d6fc70eaf62ad0558e63e8d97eb9766118327a6/tools/ktx/encode_utils_common.h)、[归一化和传递函数选项](https://github.com/KhronosGroup/KTX-Software/blob/4d6fc70eaf62ad0558e63e8d97eb9766118327a6/tools/ktx/command_create.cpp)。

#### 可转码容器是独立的验收门槛

锁定版本的转码命令要求 BasisLZ 或 UASTC DFD 颜色模型。它明确将无需转码的输入作为无效输入拒绝。仅拥有有效的 `.ktx2` 容器还不够。若未明确指定目标，命令会根据通道数选择未压缩的 r8/rg8/rgb8/rgba8。记录请求的目标并检查输出格式；仅转换成功不能证明生成了预期的压缩 GPU 表示。

锁定版本来源：[转码实现与帮助](https://github.com/KhronosGroup/KTX-Software/blob/4d6fc70eaf62ad0558e63e8d97eb9766118327a6/tools/ktx/command_transcode.cpp)。其中内嵌的“仅限原始输出”措辞与实现中的 KTX2 写入器相冲突；在没有专门的上游澄清／测试前，不要将该措辞复述为已确立的限制。

#### glTF 用途与载荷要求

官方扩展增加了具体门槛：通道重排为恒等映射或不设置，方向为 `rd` 或不设置，材质图像为二维，基础尺寸可被四整除，以及符合用途的 DFD 元数据。非颜色数据要求未指定的原色及线性传递函数；颜色数据要求 BT.709 原色及 sRGB。除非材质规范要求，否则禁止预乘 alpha 标志。对于使用 mipmap 或未指定的采样器，完整 mip 为“应该”（SHOULD），而非“必须”（MUST）。对于没有 ASTC/BC7 的非颜色 UASTC，规范建议使用未压缩 RGBA 以避免伪影。

来源：[KHR_texture_basisu](https://github.com/KhronosGroup/glTF/blob/521a91d491f02bb7db7d445b35f591d09d2a64ce/extensions/2.0/Khronos/KHR_texture_basisu/README.md)。源码修订版：521a91d491f02bb7db7d445b35f591d09d2a64ce。该扩展将标准法线贴图归类为 RGB 纹理；只有在具备明确兼容的着色器／编码契约时，才能将通用的 XY-in-GA 预设用于标准 glTF 法线槽。所审查的来源均未确立保持 alpha 覆盖率的 mip 保证；不要将完整 mip 金字塔或验证成功等同于保留了裁切覆盖率。

**建议的证据与恢复方式：**  保留源纹理／材质用途、所有调用参数、工具锁定版本、验证策略／报告／退出状态、输入／输出哈希、通道映射、传递元数据、尺寸／mip 清单及请求／实际的转码目标。隔离未完成候选并保留原始资产。尚未实现的负面测试夹具包括无效的 glTF 通道重排／方向、有效但不可转码的 KTX2、双分量归一化不匹配、没有 JSON 的早期 I/O 失败，以及默认转码成功但其未压缩输出超出项目预算的情况。目标 GPU 支持、alpha 裁切覆盖率、编解码器质量及材质外观仍需消费方测试。这些命令和测试夹具均未执行。本次源码审查未确立确切的依赖项／输入资产许可，也未确立转换原子性。

## 4. 优化、重拓扑、展 UV 和重建切线时，不要丢失对应关系

**已记录的操作与字段。**  [meshoptimizer 的 f0a684f1 版本](https://github.com/zeux/meshoptimizer/blob/f0a684f11ead064e176775c9b796f82a55910e92/README.md)提供面向 GPU 的优化、简化和压缩，包括 gltfpack 及一个 JavaScript 子集。[Draco 的 d429de84 版本](https://github.com/google/draco/blob/d429de84b52a860705507da0884764c5d8321423/README.md)压缩网格／点云，并提供 JavaScript/WebAssembly 解码器；其文档建议使用特定版本的解码器 URL。这些操作本身不能确立目标导入器的扩展／解码器兼容性。

在所检查的 meshoptimizer 快照中，[基本简化误差](https://github.com/zeux/meshoptimizer/blob/f0a684f11ead064e176775c9b796f82a55910e92/README.md#L548-L571)是近似值，且相对于网格范围；拓扑／误差限制可能使简化在达到请求的索引数之前停止。[SimplifyErrorAbsolute](https://github.com/zeux/meshoptimizer/blob/f0a684f11ead064e176775c9b796f82a55910e92/src/meshoptimizer.h#L466-L474)将输入及报告的误差改为绝对单位；否则可通过 [simplifyScale](https://github.com/zeux/meshoptimizer/blob/f0a684f11ead064e176775c9b796f82a55910e92/src/meshoptimizer.h#L609-L615)换算误差单位。建议门槛：保留源单位、误差模式、请求／实际索引数及返回误差，并将这些记录与渲染或变形保真度分开。

[顶点编解码器](https://github.com/zeux/meshoptimizer/blob/f0a684f11ead064e176775c9b796f82a55910e92/README.md#L401-L417)是无损的，而之前的量化及[顶点过滤器](https://github.com/zeux/meshoptimizer/blob/f0a684f11ead064e176775c9b796f82a55910e92/README.md#L518-L540)可能丢失信息。其文档中的默认顶点／索引位流版本均为 1，分别兼容 v0.23+／v0.14+；这些兼容性保证针对正式小版本，不包含开发分支。除编码器／解码器标识外，还要记录位流版本。Draco 的[文档化编码器 CLI](https://github.com/google/draco/blob/d429de84b52a860705507da0884764c5d8321423/README.md#L307-L320)默认将位置量化为 11 位；零值仅对指定属性禁用量化。其[版本化解码器 URL 指南](https://github.com/google/draco/blob/d429de84b52a860705507da0884764c5d8321423/README.md#L10-L20)旨在处理传播／缓存不匹配。建议门槛：保留每项属性的量化／过滤设置，并将最终解码后的候选与原始资产比较；编解码器标签不是整个流水线的保真度证据。本次审查未执行编码、解码或简化。

[xatlas 的 f700c779 版本](https://github.com/jpcy/xatlas/blob/f700c7790aaa030e794b52ba7791a05c085faf0c/README.md)将图表生成与打包分开。UV 接缝会增加输出顶点数；进度回调返回 false 表示请求取消。其[输出头文件](https://github.com/jpcy/xatlas/blob/f700c7790aaa030e794b52ba7791a05c085faf0c/source/xatlas/xatlas.h#L58-L118)将 Vertex.xref 定义为输出到输入的顶点映射，uv 则使用图集尺寸单位，而非归一化坐标。被忽略的面仍会保留，UV 为 (0,0)，atlasIndex 为 -1，因此非空输出不能证明完整的可用图集覆盖。[MikkTSpace 的锁定版头文件](https://github.com/mmikk/MikkTSpace/blob/3e895b49d05ea07e4c2133156cfa94369e19e409/mikktspace.h#L79-L139)按面顶点返回切线，并警告不要通过旧索引列表进行平均或覆盖。烘焙器／渲染器的三角化必须一致。其[实现](https://github.com/mmikk/MikkTSpace/blob/3e895b49d05ea07e4c2133156cfa94369e19e409/mikktspace.c#L374-L419)跳过非三角形／非四边形面，并有条件地调用输出回调；仅返回 true 不能证明每个输入面都已收到并存储切线。这些是源码观察，而非复现的故障。[UVAtlas](https://github.com/microsoft/UVAtlas) 提供创建／分区／打包和重映射 API，但已于 2026 年 4 月 24 日归档；上游不鼓励新项目使用。

[Instant Meshes](https://github.com/wjakob/instant-meshes) 的文档描述了先求解方向场、再求解位置场，并支持交互引导的流程。该工作流不能作为无界面自动化 API 的证据。[QuadriFlow](https://github.com/hjwdzh/QuadriFlow) 处理 OBJ 几何体；其文档中的求解器选择会改变依赖项许可。两种重网格工具均未确立能够保留蒙皮或生成适用于动画的边流。

**建议的验收契约。**  冻结源拓扑和属性归属 → 创建优化／重拓扑候选 → 在可用时建立明确的新旧对应关系 → 展 UV 并将顶点重映射应用于所有受影响属性 → 重建兼容切线 → 烘焙／解码／导入 → 比较几何体、UV 接缝、法线响应和采样变形。记录解码器、三角化及目标扩展支持。索引数相同不能证明顶点标识未改变。

**失败／恢复／持久化。**  权重／形态对应关系丢失、UV 重叠、切线符号改变、解码器不受支持或几何误差过大，都会阻止提升为正式产物。修正参数后，从保留的前一阶段重新开始；不要通过猜测旧索引来修复。在锁定版 xatlas 的[重新打包路径](https://github.com/jpcy/xatlas/blob/f700c7790aaa030e794b52ba7791a05c085faf0c/source/xatlas/xatlas.cpp#L9574-L9603)中，先销毁原有输出，再执行可取消的打包。[输出数组与 meshCount](https://github.com/jpcy/xatlas/blob/f700c7790aaa030e794b52ba7791a05c085faf0c/source/xatlas/xatlas.cpp#L9627-L9643)在逐网格循环之前初始化；[网格输出之间的取消](https://github.com/jpcy/xatlas/blob/f700c7790aaa030e794b52ba7791a05c085faf0c/source/xatlas/xatlas.cpp#L9793-L9802)可能导致后续条目未构建。不要从 meshCount 推断输出完整，也不要假设每次取消都会留下相同的部分状态。单独保留前一产物，并验证每个网格／面的覆盖。这些静态路径未执行。仅将通过验证的阶段输出归档为可复用输入；通用的中断／重试保证仍未知。

**尚未实现的测试夹具：**  镜像 UV、需要复制顶点的接缝、采用固定三角化的不对称四边形、蒙皮权重边界和已知轮廓。在运动及灯光条件下评估；压缩率和四边形数量不是质量分数。

**版本／许可证范围：**  xatlas 锁定为 f700c7790aaa030e794b52ba7791a05c085faf0c（2022-07-25），MikkTSpace 锁定为 3e895b49d05ea07e4c2133156cfa94369e19e409（2020-03-25；头文件 Version 1.0），源码检查日期为 2026-10-19。这些是源码快照，而非已安装版本。meshoptimizer 锁定为 f0a684f11ead064e176775c9b796f82a55910e92（头文件 1.3），Draco 锁定为 d429de84b52a860705507da0884764c5d8321423（头文件 1.5.9），同样于 2026-10-19 检查；不声称这两个快照为已核验的发行标签。本节的其他引用为滚动更新内容。[meshoptimizer](https://github.com/zeux/meshoptimizer/blob/f0a684f11ead064e176775c9b796f82a55910e92/LICENSE.md)、[xatlas](https://github.com/jpcy/xatlas/blob/f700c7790aaa030e794b52ba7791a05c085faf0c/LICENSE) 及 UVAtlas 声明采用 MIT；[Draco 采用 Apache-2.0](https://github.com/google/draco/blob/d429de84b52a860705507da0884764c5d8321423/LICENSE)。MikkTSpace 的宽松许可声明包含来源、修改源码及保留声明的条件。Instant Meshes 的[许可证带有补充条款](https://raw.githubusercontent.com/wjakob/instant-meshes/master/LICENSE.txt)，需要完整审查。QuadriFlow 采用 MIT，但其 README 指明了采用 LGPL 的稀疏 Cholesky 依赖、通过 `BUILD_FREE_LICENSE` 选择的 MPL2 稀疏 LU 替代方案，以及可选 Gurobi 的单独条款。审查范围取决于所选构建依赖，而非仅取决于项目徽章。

### 碰撞烘焙与玩法形状验收

对于 Unity 6000.0，在导入后、[导航或通行测试](../production/engine-operations.md#navigation-after-procedural-world-edits)前检查碰撞几何体。检查应与项目使用的引擎补丁版本及物理配置相匹配。

#### 放宽烘焙保障前，先验证几何体

`MeshCollider.cookingOptions` 控制将几何体转换为物理查询／接触支撑结构的过程。禁用有效性检查时，输入有效性由调用方负责，无效数据可能导致未定义行为。这与视觉网格导入或格式验证是不同的操作。[cookingOptions](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MeshCollider-cookingOptions.html)。

Unity 要求在禁用清理或顶点焊接时提供替代验证器：关闭清理的网格必须避免退化三角形，包括面积接近零／无穷大的情形；关闭焊接的网格不得包含同位置顶点。对于负缩放的凸碰撞体、偏斜／剪切变换（包括父级缩放／子级旋转的配置），或非默认烘焙选项，需要读写访问权限。[准备网格](https://docs.unity3d.com/6000.0/Documentation/Manual/prepare-mesh-for-mesh-collider.html)。

组件参考描述了四个标志：`CookForFasterSimulation` 通过增加预处理／存储来减少运行时工作；`EnableMeshCleaning` 尝试移除退化元素／伪影；`WeldColocatedVertices` 合并位置相同的顶点；`UseFastMidphase` 选择平台上最快的可用中间阶段算法，出现问题时可改用旧算法。凸碰撞体有文档规定的 255 个三角形限制。默认禁用的 `Provides Contacts` 会请求持续生成接触，即使没有通常的接收者；因此，缺少接触观察结果时需要考虑配置上下文。[MeshCollider 参考](https://docs.unity3d.com/6000.0/Documentation/Manual/class-MeshCollider.html)。

**建议门槛，并非上游保证：**  记录几何体修订版／哈希、单位、绕序、顶点／索引／三角形数、有限坐标检查、面积容差及同位置顶点策略。明确项目容差；这些页面没有定义通用安全 epsilon。具有重复 UV／法线接缝顶点的渲染网格可能需要单独的碰撞网格。保留启用的标志及被拒绝输入的诊断信息。不要承诺清理能够修复任意生成的几何体。

#### 有意识地烘焙、复用并使其失效

`Physics.BakeMesh(meshID, convex, cookingOptions)` 返回 void；烘焙在调用线程上运行，并将数据存储在网格实例上。Player 中的调用需要启用 Read/Write，而 Editor 无需该设置即可访问几何体。复用要求烘焙选项相同、几何体未改变且变换可共享：非负且无偏斜的缩放，或非凸碰撞体的负缩放。向已有 MeshFilter 的对象添加 MeshCollider 时，可能自动赋值 `sharedMesh` 并触发烘焙。线程安全不允许同时烘焙同一网格；这种情况的行为未定义。文档中的 Job System 示例先完成工作，再在主线程创建碰撞体。[BakeMesh](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.BakeMesh.html)。

在修改顶点、索引或三角形之后赋值 `sharedMesh`，会重建碰撞体形状。这记录的是赋值触发的重建；不要推断之前的烘焙覆盖了后续网格变更。[sharedMesh](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MeshCollider-sharedMesh.html)。

**建议门槛：**  分别记录输入验证、烘焙返回／诊断、碰撞体赋值、实测复用及玩法验收。对调度的网格 ID 去重，并串行执行同一网格的烘焙；仅对不同网格并行处理。void 返回不是保真度报告。记录目标平台、确切引擎构建、凸形选择、标志位掩码及完整变换层级。使用诊断和分析器证据确定实际重新烘焙成本；此处未确立可移植磁盘缓存或跨会话复用契约。

#### 验收碰撞形状

凹 MeshCollider 支持用作静态或运动学几何体，并与凸碰撞体碰撞，而不与其他凹碰撞体碰撞。凸转换会将凹陷填充为凸包。[网格碰撞体简介](https://docs.unity3d.com/6000.0/Documentation/Manual/mesh-colliders-introduction.html)。

凸几何体没有孔洞／入口，且必须具有非零体积。Unity 可能将凸平面／四边形加厚，最大厚度为其平面内最长尺寸的 0.05 倍。因此，即使视觉上正确的平面或门口，也可能产生实质不同的碰撞几何体。[convex](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MeshCollider-convex.html)。

**建议门槛：**  在选择凸形、三角网格或复合表示之前，定义允许的门口净空、台阶高度、墙厚及凸包近似误差。将文档中的三角形上限视为碰撞体约束，而不是证明任何低于该上限的源网格都能成功烘焙，或源多边形数等于最终凸包数。本次研究没有确立超限凸包的确切拒绝／错误码契约。

#### 将查询与接触分开解释

`Physics.ComputePenetration` 报告给定姿态是否重叠，并在结果为 true 时报告碰撞体 A 的最小分离平移。为 false 时，方向／距离未定义。至少一个碰撞体必须是盒体、球体、胶囊体或凸 MeshCollider。提供假设的位置／旋转不会移动场景；此操作不需要先更新空间结构。无论 `queriesHitBackfaces` 为何值，它都会忽略背面三角形。[ComputePenetration](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.ComputePenetration.html)。

普通物理查询默认忽略背面命中。[queriesHitBackfaces](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics-queriesHitBackfaces.html)。`Physics.SyncTransforms` 手动将变换更改（包括对子碰撞体的影响）刷新到物理系统。[SyncTransforms](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.SyncTransforms.html)。

**建议门槛：**  保留查询类型、碰撞体对、姿态／缩放、面朝向、层／触发器策略、变换同步及模拟步上下文。正面射线命中不能证明双面接触行为或可通行性。穿透结果不是模拟接触流形，也不是整个场景的碰撞证明。不要将 ComputePenetration 的同步例外推广到宽相位查询。

#### 未执行的验收测试夹具

1. **脏输入与安全预处理：**  一个有效四面体对照、一个零面积三角形及重复位置顶点。建议的预检必须在调用关闭清理／焊接的烘焙前拒绝无效输入。不要为了寻求稳定错误码而故意触发未定义行为。在记录的标志组合下比较可接受的干净输入。
2. **复用与失效：**  烘焙一次，赋值给匹配的碰撞体，随后分别更改标志、几何体及变换层级。包括镜像的凸／非凸变体，以及父级缩放／子级旋转产生的剪切。记录赋值诊断和分析器证据；不要根据截图未变化推断复用。验证调度能拒绝重复的并发网格 ID，而不实际让原生烘焙发生竞态。
3. **形状保真度：**  一个凹形门口、一个平面四边形和已知尺寸实体。根据要求的净空和厚度比较三角网格与凸形表示。包括接近上限的凸形复杂度，并保留实际诊断／结果，不预测凸包简化或失败的行为。
4. **观察边界：**  查询已知绕序墙体的两侧，在指定姿态下测试有效的基本体与网格穿透对，然后单独收集记录了设置的模拟接触证据。移动父级，并在普通空间查询前同步。缺失／不受支持的观察仍属未验证。

## 5. 交付仍能解析媒体的时间线包

**已记录的操作与字段。**  [OpenTimelineIO 0.14 文件包](https://opentimelineio.readthedocs.io/en/v0.14/tutorials/otio-filebundles.html)将时间线数据与引用的媒体一起打包。包引用可以使用本地相对路径，也可以表示缺失媒体。OTIO 不编码或解码媒体。

**建议的验收契约。**  记录时间线／适配器版本、片段标识、源范围、速率、缺失引用状态及媒体哈希 → 打包至新目标位置 → 从不同根目录重新打开 → 使用预期播放路径独立解码引用的媒体 → 比较预期片段边界和时间。这是媒体验证解析的验收，与之前的可听见的音视频同步测试夹具分开。

**失败／恢复／持久化。**  如果片段解析为缺失媒体，时间线可解析或文件包存在都不够。明确保留缺失引用。从已验证的源媒体重新构建；不要静默下载替代内容、更改范围，或以代理文件替代母版。解码器可用性、适配器特定的保留能力、原子包写入及通用编解码器权利均未知。

**尚未实现的测试夹具：**  移动后的包根目录、一个缺失源、混合速率片段，以及声明的代理／母版区别。本次审查未执行媒体解码或播放。

**版本／许可证范围：**  文件包教程适用于 0.14；新版适配器的兼容性需另行测试。该教程未确立 OTIO、适配器及媒体的许可证清单。

### 影视剪辑交接：保留时间坐标和声明的特性

**范围与锁定版本。**  源码审查日期为 2026-10-19；未安装、导入、渲染、解码或执行任何往返流程。OpenTimelineIO [v0.18.1 发行版](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/releases/tag/v0.18.1)解析到 [44236713c1db295a6ffc66189ae98dbdfd0cb9c4](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/commit/44236713c1db295a6ffc66189ae98dbdfd0cb9c4)；[版本文件](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/OTIO_VERSION.json)与之相符。GitHub 将其标记为 Beta／预发行版。这以确切的核心语义补充了较早的 0.14 文件包解析说明。它不能确立引擎支持、已安装的依赖版本，或任何外部适配器的兼容性。

#### 1. 在正确的坐标系中比较时间

`RationalTime(value, rate)` 表示 value/rate 秒，其字段为双精度数值。重新缩放会同时改变 value 和 rate；复制 value 并替换 rate 则会改变时间。锁定版 `to_frames()` 使用整数类型转换，因此它不是无损的子帧传输方式。`TimeRange` 使用包含的起点和不包含的终点。可以构造负时长，但其逻辑谓词认为此类时长无效。保留 value/rate 数值对，并声明最终引擎帧量化，而非静默截断。建议的交付预检还应拒绝非有限值；这比所检查的 NaN／非正速率有效性谓词更严格。[RationalTime 实现](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentime/rationalTime.h#L20-L88)、[整数帧转换](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentime/rationalTime.h#L226-L233)、[范围边界／有效性](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentime/timeRange.h#L21-L108)

`source_range` 和 `trimmed_range()` 是片段坐标范围；`range_in_parent()` 是父级坐标中的放置位置。父级裁剪是单独的操作。标记的 `marked_range` 相对于所属项，因此不能将片段标记原样复制为父轨道事件。记录源坐标和父级放置位置，包括嵌套和任何全局起始标签。[版本化的范围指南](https://opentimelineio.readthedocs.io/en/v0.18.1/tutorials/time-ranges.html)

#### 2. 将请求的剪辑长度、已知可用范围和转场余量分开

若存在源范围，`trimmed_range()` 返回它，否则计算可用范围；`duration()` 返回该裁剪后的时长。缺少可选的 `media_reference.available_range`，并不能证明媒体长度为零。在此实现中，在可用范围未知时调用 `Clip.available_range()` 会发出 `CANNOT_COMPUTE_AVAILABLE_RANGE`；Python 测试预期出现 `CannotComputeAvailableRangeError`。因此，在该锁定版本中，可选媒体引用字段与片段方法对缺失范围有不同的行为。源范围有效的片段，其剪辑时长仍可能可计算，但媒体覆盖范围未知。[裁剪选择](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentimelineio/item.h#L94-L106)、[可用范围错误](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentimelineio/clip.cpp#L160-L188)、[Python 预期](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/tests/test_clip.py#L174-L177)

OTIO 允许源范围超出可用媒体。内部转场与相邻剪辑重叠，但不延长轨道长度：其父级起点为剪切点减 `in_offset`，时长为 `in_offset + out_offset`。`visible_range()` 将前一个转场的 `in_offset` 加为头部媒体，将后一个转场的 `out_offset` 加为尾部媒体。因此，仅验证裁剪范围会漏掉所需余量。文档允许转场媒体不可用，但未定义播放后备行为；同时另行禁止相邻转场、同一片段上的重叠转场，以及超出相邻剪辑时长的偏移量。应将这些作为明确的预检项，而不要假设每次解析都会执行这些规则。[转场与媒体规则](https://opentimelineio.readthedocs.io/en/v0.18.1/tutorials/otio-timeline-structure.html#transitions)、[放置位置与余量](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentimelineio/track.cpp#L46-L165)、[可见范围计算](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentimelineio/item.cpp#L60-L84)

#### 3. 表示不等于效果求值

`LinearTimeWarp.time_scalar` 表示媒体速度；更改它不会自动改变该项的时长。`FreezeFrame` 以标量零表示。所检查的 `Item.duration()` 和坐标变换代码不对效果列表求值，因此，仅靠 `transformed_time()`/`visible_range()` 不能验证变速媒体的覆盖范围。记录效果模式、顺序、标量、元数据及启用状态；要求选定的消费方定义并演示其求值。通用效果渲染由应用决定。效果对象保留下来，不足以证明会出现相同的画面帧、叠化或调色。[版本化的效果 API](https://opentimelineio.readthedocs.io/en/v0.18.1/api/python/opentimelineio.schema.html#opentimelineio.schema.LinearTimeWarp)、[时长与坐标变换实现](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentimelineio/item.cpp#L44-L172)、[定格标量](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentimelineio/freezeFrame.cpp#L8-L10)、[效果状态序列化](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentimelineio/effect.cpp#L22-L36)、[应用专用渲染](https://opentimelineio.readthedocs.io/en/v0.18.1/tutorials/otio-timeline-structure.html#rendering)

#### 4. 锁定转换路径，而不仅是 `.otio` 扩展名

v0.18.1 核心包包含原生 `otio_json`、`otiod` 和 `otioz` 适配器；其他格式使用单独维护的插件。适配器的 `has_feature("read")`/`has_feature("write")` 检查适配器入口点属性是否存在，而非是否保留转场或效果。读取操作可以运行钩子及配置的媒体链接器；返回的引用可以原位替换片段的引用。记录适配器／插件版本、读写参数、钩子、链接器及转换前后的引用清单。[版本化的适配器清单](https://opentimelineio.readthedocs.io/en/v0.18.1/tutorials/adapters.html)、[入口点检查](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/py-opentimelineio/opentimelineio/adapters/adapter.py#L66-L83)、[读取钩子／链接器路径](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/py-opentimelineio/opentimelineio/adapters/adapter.py#L138-L159)、[引用替换](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/py-opentimelineio/opentimelineio/adapters/adapter.py#L371-L411)

即使原生 JSON 也有具体的有损兼容路径。`target_schema_versions`，或 `OTIO_DEFAULT_TARGET_VERSION_FAMILY_LABEL`（当该参数为 `None` 时），可以请求旧版模式。所检查的 `Clip.2`→`Clip.1` 降级保留活动引用，并删除多引用映射及活动键字段。因此，不能假设非活动代理／母版清单能够保留。这是源码确立的损失，而非复现的转换结果。[JSON 目标选择](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/py-opentimelineio/opentimelineio/adapters/otio_json.py#L75-L153)、[确切的降级操作](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/opentimelineio/typeRegistry.cpp#L119-L138)

#### 建议的输入／输出／错误契约及未执行的测试夹具

**输入：**  不可变的剪辑源、核心／适配器／消费方锁定版本、速率和坐标标签、源／父级／可见范围、媒体哈希及所有引用键、活动引用、标记、转场、效果和转换设置。 **输出：**  新写出的原生检查点及交换候选、冷启动重新导入的语义清单、明确的受支持／丢失／未知特性报告，以及消费方观察结果。原生 JSON 文档规定写入返回布尔结果，写入出错时抛出 `ValueError`；格式错误／未知的默认模式族标签会引发 `InvalidEnvironmentVariableError`。适配器查找会另行抛出 `NoKnownAdapterForExtensionError` 或 `NotSupportedError`。保留诊断及原始资产；重试时写入新候选。写入成功不等于多产物原子持久化或视觉保真度成立。[原生写入与模式环境错误](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/py-opentimelineio/opentimelineio/adapters/otio_json.py#L43-L153)、[适配器查找／错误](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/src/py-opentimelineio/opentimelineio/adapters/__init__.py#L79-L116)

使用权利已获许可、带帧标签的合成媒体。以 24 fps 放置 A，其可用范围为 `[96,132)`、源范围为 `[100,124)`，随后放置 in=4/out=6 的内部转场，再放置 B，其可用范围为 `[200,236)`、源范围为 `[204,228)`。建议的算术判定基准：轨道时长 48 帧；转场父级范围 `[20,30)`；A 的可见范围 `[100,130)`；B 的可见范围 `[200,228)`。将 A 的可用终点缩短为 128：剪辑仍在范围内，但所需尾部帧中有两帧不可用。检查确切的首／末帧及不包含的边界帧标识，而不只是时长。

单独的变体应包括 25 fps 下的 25 帧与 24 fps 下的 24 帧；有／无源范围时的未知可用范围；转换至父级坐标的片段标记；不自动改变时长的标量 2 及定格效果；禁用的效果；嵌套父级裁剪；不受支持的转场／效果保留；以及在显式 `Clip.1` 降级下的活动母版／非活动代理引用。对于不受支持的特性，要求声明拒绝、保留但不求值，或经批准的派生／烘焙策略。选定的引擎桥接必须单独测试；尚未确立通用导入或渲染支持。所有测试夹具数值及验收门槛均为 GameMap 提案，尚未实现或执行。

**许可证边界：**  锁定版 [OTIO 许可证](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/LICENSE.txt)为 Apache-2.0。该软件许可证不能确立外部适配器、引擎集成、编解码器、视频素材、音乐或源项目资产的条款。单独保留其来源和条款。

### OTIO 到 Unreal：序列脚手架是有条件的转换

源码阅读日期为 2026-10-19。检查了 OpenTimelineIO 项目 Unreal 插件的 [3894893001733f90178ee9a9b0f05b55e51b140e](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/tree/3894893001733f90178ee9a9b0f05b55e51b140e) 版本，这是 2025 年 7 月 14 日的源码快照。其描述符标记版本为 0.1 Beta；依赖要求列出 OpenTimelineIO 和 PySide2，但未锁定版本。这些并非对它与单独审查的 OTIO 核心版本或当前 Unreal 发行版兼容性的验证。未执行插件、导入、导出或渲染。

**接口与映射。**  `otio_unreal.adapter.import_otio` 读取适配器支持的文件，运行项目定义的钩子，创建／更新关卡序列层级，并返回根序列及处理后的时间线。`export_otio` 返回时间线，并通过选定的 OTIO 适配器写入，除非 dry_run 为 true。README 的特性矩阵不包含音频轨道／片段、转场、视听效果、非线性速度效果及图像序列引用。它支持嵌套视频镜头及线性速度效果。不要将接受某种时间线扩展名等同于保留其内容。[README](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/README.md)、[插件描述符](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/OpenTimelineIOUtilities.uplugin)

| 边界        | 检查到的行为                                                                                                      | 建议的验收门槛，尚未执行                                                  |
| --------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 资产标识与媒体   | 导入钩子或创作的 `metadata.unreal.sub_sequence` 将项与 Unreal 资产关联。导出会创建 MissingReference 媒体条目，除非钩子将其替换为渲染引用           | 记录项到资产的映射，并单独解析渲染媒体哈希；创建序列不能证明有可播放／已渲染的产物                     |
| 状态协调      | 更新会遍历视频轨道和 Clip/Stack 项，跳过没有子序列路径的项，然后从已处理的镜头轨道中移除未匹配且引用序列非空的现有镜头分节                                         | 预检缺失映射，并在应用前比较预期／当前镜头成员。这是同步，不是仅追加的导入；移除分节并不表示删除其引用的资产        |
| 速率与标记     | 改变后的显示速率从有限的最近速率表中选取。标记范围变为首帧标记；轨道标记移动到父级堆栈，间隙标记在往返中丢失                                                      | 包括分数速率和菜单外速率、非零起点及不同种类项上的标记；保留预期损失，而非声明通用无损往返                 |
| 效果        | 导入器将 LinearTimeWarp 标量相乘并设置分节时间缩放；该循环不处理其他效果类                                                               | 转换前清点所需效果，分别比较镜头范围及实际渲染运动；仅处理标量不能确立倒放／定格正确性                   |
| 预览、撤销与持久化 | dry_run 仍运行导入／导出钩子；它跳过适配器的编辑器修改或文件写入块。常规导入使用 ScopedEditorTransaction；README 宣称可一次撤销。检查的顶层导入 API 未调用资产保存 API | 将自定义钩子视为可执行项目代码。单独验证保存／重新打开状态；预览和撤销都不是通用沙箱、持久检查点，也不能回滚任意钩子副作用 |

上表各行依据锁定版的[适配器](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/Content/Python/otio_unreal/adapter.py#L21-L138)、[序列映射](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/Content/Python/otio_unreal/level_sequence.py#L96-L141)、[标记限制](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/Content/Python/otio_unreal/level_sequence.py#L301-L393)、[镜头同步](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/Content/Python/otio_unreal/level_sequence.py#L530-L616)及[效果循环](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/Content/Python/otio_unreal/shot_section.py#L111-L132)。这些是静态观察，而非复现的数据丢失或运行时故障发现。

**钩子名称差异。**  README 记载了独立的 `otio_ue_post_export_clip` 钩子。但在该源码快照中，`HOOK_POST_EXPORT_ITEM` 等于 `otio_ue_post_export`，逐片段函数分发的也是该值。项目在依赖逐片段媒体链接之前，应检查实际运行的钩子。这是确切锁定版本中的源码差异；未复现异常或受影响的导出。[钩子常量与分发](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/Content/Python/otio_unreal/hooks.py#L7-L66)

**建议的组合测试夹具：**  一个嵌套双镜头剪辑，包含一个复用资产、一个缺失映射、一条音轨、一个转场、一个标记范围及一个菜单外帧率。首先生成所需特性／损失报告；拒绝不受支持的必需语义。使用经审计的钩子预览，比较预期成员差异，应用到可丢弃的项目副本，保存／重新打开，导出／重新链接，并单独比较解码后的边界帧和音频。记录适配器／核心／插件／引擎版本及钩子哈希。原子文件替换、取消、崩溃恢复、跨版本兼容性及最终影视质量仍未经验证。

**权利与依赖。**  插件的 Apache-2.0 源码许可证不涵盖 Unreal、Python 依赖或项目媒体。未安装，也未接受任何许可协议。[源码许可证](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/LICENSE.txt)

- [UE-T1：锁定版 README 及特性矩阵](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/README.md)
- [UE-T2：插件 Beta 描述符](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/OpenTimelineIOUtilities.uplugin)、[未锁定的依赖列表](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/requirements.txt)
- [UE-T3：钩子常量与分发](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/OpenTimelineIOUtilities/Content/Python/otio_unreal/hooks.py#L7-L66)
- [UE-T4：源码许可证](https://github.com/OpenTimelineIO/OpenTimelineIO-Unreal-Plugin/blob/3894893001733f90178ee9a9b0f05b55e51b140e/LICENSE.txt)

## 6. 测试本地化界面前，先验证字体产物

**已记录的操作与字段。**  [fontTools 子集化](https://fonttools.readthedocs.io/en/latest/subset/index.html)接受 Unicode／文本／字形选择及布局特性选项。默认忽略请求中缺失的 Unicode，而缺失的字形标识符默认会导致失败；`--no-ignore-missing-unicodes` 会将 Unicode 缺失视为失败。[fontTools 仓库](https://github.com/fonttools/fonttools)还记录了 TTX XML 交换。[Font Bakery](https://github.com/fonttools/fontbakery) 检查字体二进制文件／项目元数据，并支持自定义 Python 检查。[OpenType Sanitizer](https://github.com/khaledhosny/ots) 通过解析和序列化 OpenType/WOFF/WOFF2 来验证与清理；其构建有意不生成共享库。

**建议的验收契约。**  在本地化工单之前增加产物门槛：冻结已获许可的字体及代表性语料 → 按明确的缺失字符／布局策略生成子集 → 保留子集诊断 → 运行合适的 Font Bakery 检查配置 → 如有意清理，则对单独候选进行清理 → 比较原始／派生产物哈希 → 在目标渲染器中测试整形后的字符串及回退行为。保留布局特性选择及确切的检查配置／版本。

**失败／恢复／持久化。**  使用默认设置成功生成子集，不能作为覆盖率证据。清理可能改变字节；保留两种产物，并针对实际交付候选重新运行整形／覆盖率检查。结构或元数据检查通过，不能确立语言覆盖、外观可接受性、无障碍性或字体再分发权利。修正源／设置后重新构建；不要抑制失败检查，也不要用未说明的回退替换缺失字形。原子输出、取消及检查点恢复语义仍未经验证。

**尚未实现的测试夹具：**  一个请求中不存在的 Unicode 字符、组合序列、必需的整形特性，以及刻意构造的格式错误字体表。将结构结果与实际渲染语言验收配对；二者不能相互替代。

**版本／许可证范围：**  来源为滚动更新内容；审查时 fontTools README 记录要求 Python 3.11+，这不是环境探测结果。项目许可证：fontTools 为 MIT，Font Bakery 为 Apache-2.0，OTS 为 BSD-3-Clause。字体文件和可选依赖有独立条款；Font Bakery 不是 Google 官方支持的产品。

## 7. 为回归选择正确的劣化与输入接口

关于引擎输入队列、动作阶段、焦点／重置行为以及尚未解决的渲染响应关联，参见[输入交付与观察对齐](../production/native-operations.md#input-delivery-and-observation-alignment)。

**已记录的操作与字段。**  [Toxiproxy](https://github.com/Shopify/toxiproxy) 是通过 HTTP/CLI 控制的 TCP 代理。延迟故障注入器默认作用于下行；对称延迟需要配置两个方向。其未经身份验证的控制 API 不得暴露给不受信任的网络。[Linux netem 手册](https://man7.org/linux/man-pages/man8/tc-netem.8.html)记录了延迟／丢包／重复／损坏及带种子的随机性，但计时器粒度会影响延迟／速率保真度；真实的 TCP 测试有布置约束，包括接收端入口方面的指导。

[GGPO](https://github.com/pond3r/ggpo) 使用预测输入和推测执行实现回滚；所检查的 README 记录了 Windows 构建和 Vector War 示例。[SDL3 虚拟摇杆附加](https://wiki.libsdl.org/SDL3/SDL_AttachVirtualJoystick)自 3.2.0 起可用，可从任何线程调用，失败时返回零。虚拟设备无需物理硬件即可接受程序提供的输入。

**建议的验收契约。**  扩展多人游戏工单，明确协议、方向、布置位置及实测劣化，而非仅给出一个“延迟”参数。Toxiproxy 的 TCP 行为不能演示 UDP 劣化。仅有种子不能确立在内核／计时器／负载差异下可复现。对于回滚，单独测试状态保存／恢复及重复的外部副作用。对于虚拟输入，将设备标识和注入计划绑定至观察到的游戏 tick／事件；附加成功不代表输入已被消费，也不代表与物理设备等价。

**失败／恢复／持久化。**  拒绝不受支持的协议覆盖、未观察到的劣化、失效的设备句柄，以及回滚导致的奖励／音频／网络效果重复。隔离由进程拥有的测试夹具；保留测试前状态并确认清理。主机网络变更需要明确授权和恢复计划；本说明未执行也未授权任何此类变更。超时不能证明故障已被移除。归档流量／事件／状态证据，而非仅归档配置的故障数值。

**尚未实现的测试夹具：**  对比 TCP 仅下行延迟与双向延迟；一次性效果后的回滚；虚拟设备附加失败与重新连接。不声称具有通用的跨平台确定性、字面意义上的零延迟、触觉保真度或持久事务保证。

**版本／许可证范围：**  Toxiproxy 和 GGPO 声明采用 MIT；所引函数／手册页面未确立 netem 软件包及 SDL 的许可。已安装版本和平台支持仍未知。SDL 的“自 3.2.0 起”标记是 API 最低版本，而非经测试的软件包锁定版本。

## 其他交付、协作与运行时边界

以下检查将创作工具与下一阶段消费的产物关联起来。

| 工作流              | 文档记载的事实及确切来源                                                                                                                                                                                                           | 建议的验收、失败／恢复与持久化边界                                                                                                                                                                                                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 显示转换前保留 HDR 证据   | [OpenEXR](https://openexr.com/en/latest/) 区分场景线性 HDR 与可直接显示的图像存储，并支持多部件／多通道元数据。其 2026 年 10 月 2 日的 3.5.2 通告建议重新生成由 3.5.0/3.5.1 写出的有损 LJ2K 文件；兼容性后备方案不能替代该建议。                                                            | 将原始通道／部件、压缩／库版本及显示变换与审阅用 PNG 分开保留。重新生成前识别受影响的压缩方式／版本；不要将此警告推广到所有 EXR。已安装库及文件沿革仍未知。                                                                                                                                                                                                                                                      |
| 降噪但不丢失参考证据       | [OIDN 概览与发行历史](https://www.openimagedenoise.org/)记录了对光线追踪 beauty 缓冲区进行 C/C++ 降噪，可选用反照率／法线，并有硬件／驱动专用支持。发行历史记录了 2.3.0 出现问题后，2.3.1 对 CPU 取消功能的修复。库许可证为 Apache-2.0。                                                        | 随派生物保存带噪声输入、辅助缓冲区来源、过滤器设置和实际后端／版本。不要将更干净的图像当作真值，也不要假定各版本取消行为相同。[OIDN 2.3.1 API 指南](https://github.com/RenderKit/oidn/blob/v2.3.1/README.md)区分阻塞执行与 `oidnExecuteFilterAsync`：读取输出或释放过滤器之前，须通过 `oidnSyncDevice` 同步。异步错误在同步时呈现。进度回调返回 false 会请求尽力而为的取消；仅当取消得到执行时才引发 `OIDN_ERROR_CANCELLED`。该 API 不保证取消。保留原生错误，并通过尚未实现的测试夹具验证这些路径；产物持久性仍未知。 |
| 提交共享二进制资产        | [P4 lock，页面标记为 2026.1](https://help.perforce.com/helix-core/server-apps/cmdref/current/Content/CmdRef/p4_lock.html)会阻止其他用户提交，若另一用户持锁则失败，并在持锁者提交时释放锁。省略文件参数会锁定默认变更列表中的所有已打开文件。                                          | 明确指定文件／变更列表；报告竞争，不要盲目重试或强制解除他人的锁。提交锁不承诺阻止其他用户编辑本地文件。将实际提交结果／修订号与获取锁分别记录。服务器拓扑、权限和许可证授权仍由项目决定。                                                                                                                                                                                                                                           |
| 将导航生成与运行时运动分开    | [Recast 主分支 README](https://github.com/recastnavigation/recastnavigation)区分 Recast 生成、Detour 加载／路径查询、DetourTileCache 流送及 DetourCrowd 运动／避障。仓库显示采用 Zlib 许可。                                                             | 随查询／群体观察结果保留生成参数和导航网格产物。仅生成网格或返回路径，不能证明实际角色控制器可通行。该 README 未确立瓦片失效、取消、持久化兼容性或恢复。[锁定源码的导航契约](../production/engine-operations.md#navigation-after-procedural-world-edits)现已详述查询／状态及瓦片重建限制；执行和恢复仍未经验证。                                                                                                                                          |
| 销毁物理刚体前先将其移除     | [Jolt 架构](https://jrouwe.github.io/JoltPhysics/)记录了 CreateBody → AddBody → RemoveBody → DestroyBody；DestroyBody 不会自动从 PhysicsSystem 移除刚体。已准备的批量添加可通过对应函数完成或中止。                                                         | 跟踪已创建／已添加／已准备状态，使清理选择匹配的操作。批量中止不是任意模拟回滚。在声称可复制之前，保留输入／版本并验证确定性限制；主页对确定性的说明明确链接了限定条件。此处未检查确切的构建／许可证清单及持久化兼容性。                                                                                                                                                                                                                            |
| 随纹理记录烘焙设置        | [Toolbag 烘焙](https://marmoset.co/toolbag/baking/)列出了笼罩／偏斜绘制、隔离烘焙组、UDIM／多纹理集、UV 边距、位深及切线空间／方向选择。这是可变的产品功能页面，而非脚本参考。                                                                                                     | 随输出持久化保存源网格修订版及烘焙设置；在目标渲染器中检查接缝／投影错误。纹理已写出，不足以证明切线约定匹配。该页面未说明无界面 API、任务取消、事务性写入及许可证授权。                                                                                                                                                                                                                                                  |
| 限定模拟网络故障的范围      | [Unity Multiplayer Tools 2.2 Network Simulator](https://docs.unity3d.com/Packages/com.unity.multiplayer.tools@2.2/manual/network-simulator.html)通过 UTP 模拟器流水线提供断连、延迟峰值、丢包及脚本化场景。页面要求：Editor 2022.2+、UTP 2.0+、NGO 1.1+。 | 记录预设／场景的时间及实际断连／重新连接状态。恢复测试配置并单独验证应用恢复；移除劣化不等于游戏状态已协调一致。这不能确立对任意传输或真实 ISP 行为的覆盖。已安装的软件包组合及可复现性仍未经测试。                                                                                                                                                                                                                                    |
| 补充自动化 Web 无障碍检查  | [Accessibility Insights Web](https://accessibilityinsights.io/docs/web/overview/)将自动化 FastPass 检查与部分自动化的 Tab 停靠点检查相结合；Assessment 面向 WCAG 2.1 AA，包含手动／辅助测试。                                                             | 保存页面／构建范围及审阅者针对键盘陷阱、缺失停靠点和顺序的结果。自动检查通过不代表完全符合标准，也不代表覆盖原生／画布游戏的无障碍。扩展版本和项目特定的适用要求仍未知。                                                                                                                                                                                                                                                    |
| 将多媒体再分发审查与渲染成功分开 | [FFmpeg 法律说明](https://ffmpeg.org/legal.html)描述了 LGPL 2.1 或更高版本的基线，以及使 GPL 适用于 FFmpeg 的可选 GPL 部件。[FMOD 许可](https://www.fmod.com/licensing)按项目授予游戏分发权限，并要求商业项目注册；其免费独立开发者层级附带条件。                                         | 打包前保留 FFmpeg 构建配置／依赖声明及项目的 FMOD 授权。可执行文件名称或音频库创建成功，都不能确立再分发权利。不要把 LGPL 描述为适用于每个 FFmpeg 二进制文件，也不要把免费 FMOD 创作描述为普遍的分发许可。账户条款、捆绑依赖及实际资格需要项目审查。                                                                                                                                                                                             |

[PhysX](https://github.com/NVIDIA-Omniverse/PhysX)仍是需要更具体接口研究的发现线索，并指引读者查看各子目录的许可证。宽泛的 [Yarn Spinner](https://docs.yarnspinner.dev/) 集成目录不能确立跨引擎一致性；对于文档记载的生命周期限制，请使用更具体的[已检查的叙事保存／停止／项目切换契约](../evaluation/gameplay-state.md#narrative-checkpoints-cancellation-and-world-effect-transactions)。

## 本次迁移增加了什么

实质性补充包括格式／扩展验证、USD 会话和加载集持久化、资产管理器前置要求、材质／颜色／编解码器分离、几何体属性重映射、媒体包解析、字体产物检查，以及限定协议／方向的网络劣化。它们使缺失的验收义务显现出来，但不会将文档变成已执行的支持，也不会确立生产覆盖已达饱和。

## 动画采样与压缩

关于解码后的引擎侧剔除、求值阶段、事件和根运动归属，参见[运行时动画观察门槛](../production/engine-operations.md#runtime-animation-observation-gates)。

于  **2026-10-18**  根据官方 ozz-animation  **0.17.0** ，提交 `744eb9d99f606eda849acb0b1204f7a3dc20bca1`（2026-08-01）进行检查。仅检查源码；未安装库、构建或执行动画。这为现有重定向和交换格式说明增加了运行时采样／压缩门槛。下文区分 API 文档、静态源码发现和建议的 GameMap 门槛。\[S1]

### 精简操作链

**1. 将片段轨道绑定到实际绑定骨架。**  RawAnimation 记录了正时长、严格有序的关键帧及片段内的关键帧时间。静态验证还会限制轨道数量，但不确立变换的有限性或语义关节标识。优化器对照骨架关节数检查轨道数；数量相等不能证明关节顺序、层级或静止姿态匹配。建议门槛：随源哈希保留导入器映射、有序关节名称／父级／静止姿态、单位及基底。SkeletonBuilder 生成深度优先索引；Animation 的一个头文件注释却称为广度优先，因此应使用实际生成的顺序，而不是该不一致的注释。\[S3–S6, S8, S16–S17]

**2. 将关键帧缩减为独立候选。**  AnimationOptimizer 记录了考虑层级的关键帧缩减、全局设置及逐关节覆盖。默认容差为 0.001，距离为 0.1，注释为 1 毫米／10 厘米；应记录资产单位。距离用于近似远离关节处的影响，而非求值蒙皮网格。静态实现拒绝输入／输出指向同一对象；对于独立目标，它会在验证／数量检查之前清空输出。保留源，并要求结果为 true 后才将候选提升为正式产物。调用失败不是先前目标内容的回滚机制。\[S7–S8]

**3. 单独构建运行时压缩。**  AnimationBuilder 不执行关键帧优化。然而，静态实现会将平移／缩放量化为半精度浮点数，并压缩四元数分量；因此，优化器容差不能证明最终解码误差。保留原始数据、缩减后的原始数据及运行时派生物的各自标识。要求构建的动画非空，并记录 iframe 设置；iframe 支持跳转，而非保真度验证。在声明的位置和角度容差下，将原始数据采样与最终运行时采样比较。\[S9–S10]

**4. 以独占状态采样完整姿态。**  SamplingJob 记录了在经钳制的归一化比率处输出局部空间姿态。当输出较短时，它可以有意省略尾部轨道，并使多余 SoA 变换保持不变。若上下文容量足够，静态 Validate 会接受非空的短输出。建议的完整姿态门槛：要求数量兼容，且至少提供 ceil(joints/4) 个 SoA 变换；仅 Run()==true 还不够。使动画、上下文及缓冲区在执行期间持续有效；并发求值应独占各自可变上下文／输出。调整大小会使上下文失效。在复用的存储中替换动画之前，显式调用 Invalidate：自动检测使用动画地址，且头文件警告地址复用可能导致崩溃。\[S11–S12]

**5. 使用记录的层级进行转换。**  LocalToModelJob 要求按骨架顺序排列的局部变换，以及每个关节一个输出模型矩阵。网格重映射／逆绑定应用仍是独立步骤。其可选根矩阵可前置应用世界空间放置。局部更新要求父级模型状态已有效；失效的父级可能使原本成功的更新无效。建议先以全层级转换开始验收，再单独测试局部更新。转换成功既不能确立蒙皮变形，也不能确立根运动提取。\[S13–S14]

**6. 在消费方中验收运动。**  官方优化器示例在局部到模型转换后，比较原始／运行时关节原点的平移。该指标可能遗漏旋转的蒙皮表面。建议但未执行的测试夹具：一个不对称骨架，包含长肢体、非均匀缩放、末端关节旋转、支撑脚及移动根节点；包括数量相同但轨道互换的负面对照、过小输出、向后跳转、循环边界及动画替换。比较采样的关节位置／朝向及蒙皮顶点，随后依据声明的消费方策略，单独评估脚部滑动／穿透、接触及根轨迹。有限采样不能确立连续时间界限。\[S15]

### 恢复、证据与范围

保留锁定版本、映射、设置、采样计划、原生返回值及错误观察结果。从保留的输入修正失败阶段；替换缓存并重新运行所有下游检查。取消、持久归档写入、崩溃恢复、跨版本归档兼容性、引擎绑定及整个游戏的确定性仍未经验证。不声称进行了 ACL 比较。所检查的 ozz-animation 许可证为 MIT；保留其声明，并单独审查依赖项／媒体条款。所有建议门槛均尚未实现。\[S2]

### 已检查的一手来源

- **S1**  — [CMakeLists.txt，第 7–13 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/CMakeLists.txt#L7-L13) · 版本声明
- **S2**  — [LICENSE.md，第 1–22 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/LICENSE.md#L1-L22) · 许可证正文
- **S3**  — [include/ozz/animation/offline/raw_animation.h，第 48–81 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/offline/raw_animation.h#L48-L81) · API 文档
- **S4**  — [src/animation/offline/raw_animation.cc，第 40–79 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/offline/raw_animation.cc#L40-L79) · 静态实现
- **S5**  — [include/ozz/animation/runtime/skeleton.h，第 51–79、96–113 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/runtime/skeleton.h#L51-L79) · API 文档；其他已检查范围：[96–113](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/runtime/skeleton.h#L96-L113)
- **S6**  — [src/animation/offline/skeleton_builder.cc，第 74–118 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/offline/skeleton_builder.cc#L74-L118) · 静态实现
- **S7**  — [include/ozz/animation/offline/animation_optimizer.h，第 43–97 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/offline/animation_optimizer.h#L43-L97) · API 文档
- **S8**  — [src/animation/offline/animation_optimizer.cc，第 93–150、250–308 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/offline/animation_optimizer.cc#L93-L150) · 静态实现；其他已检查范围：[250–308](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/offline/animation_optimizer.cc#L250-L308)
- **S9**  — [include/ozz/animation/offline/animation_builder.h，第 44–65 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/offline/animation_builder.h#L44-L65) · API 文档
- **S10**  — [src/animation/offline/animation_builder.cc，第 241–310、434–519、553–567 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/offline/animation_builder.cc#L241-L310) · 静态实现；其他已检查范围：[434–519](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/offline/animation_builder.cc#L434-L519)、[553–567](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/offline/animation_builder.cc#L553-L567)
- **S11**  — [include/ozz/animation/runtime/sampling_job.h，第 47–90、99–138 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/runtime/sampling_job.h#L47-L90) · API 文档；其他已检查范围：[99–138](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/runtime/sampling_job.h#L99-L138)
- **S12**  — [src/animation/runtime/sampling_job.cc，第 59–76、456–515、531–603 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/runtime/sampling_job.cc#L59-L76) · 静态实现；其他已检查范围：[456–515](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/runtime/sampling_job.cc#L456-L515)、[531–603](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/runtime/sampling_job.cc#L531-L603)
- **S13**  — [include/ozz/animation/runtime/local_to_model_job.h，第 51–115 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/runtime/local_to_model_job.h#L51-L115) · API 文档
- **S14**  — [src/animation/runtime/local_to_model_job.cc，第 40–103 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/src/animation/runtime/local_to_model_job.cc#L40-L103) · 静态实现
- **S15**  — [samples/optimize/sample_optimize.cc，第 75–158、338–346、426–461 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/samples/optimize/sample_optimize.cc#L75-L158) · 官方示例的静态阅读；其他已检查范围：[338–346](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/samples/optimize/sample_optimize.cc#L338-L346)、[426–461](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/samples/optimize/sample_optimize.cc#L426-L461)
- **S16**  — [samples/playback/sample_playback.cc，第 88–110 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/samples/playback/sample_playback.cc#L88-L110) · 官方示例的静态阅读
- **S17**  — [include/ozz/animation/runtime/animation.h，第 54–63 行](https://github.com/guillaumeblanc/ozz-animation/blob/744eb9d99f606eda849acb0b1204f7a3dc20bca1/include/ozz/animation/runtime/animation.h#L54-L63) · API 文档冲突

### ACL：压缩片段需要解码上下文和运动语义

于  **2026-10-18**  根据官方 ACL 提交 `3ee568542eca4428e1041908b4a644b98e7885bd` 进行检查。所检查的 develop 快照的[版本头文件](https://github.com/nfrechette/acl/blob/3ee568542eca4428e1041908b4a644b98e7885bd/includes/acl/version.h)标为  **2.1.99** ；这里不声称它是带标签的生产发行版。代码采用 [MIT 许可证](https://github.com/nfrechette/acl/blob/3ee568542eca4428e1041908b4a644b98e7885bd/LICENSE)。未运行压缩、解压、插件安装或目标引擎导入。

| 接口      | 经源码检查的契约                                                                                                                                                                                                                                                                                                                                                                    | 建议的 GameMap 门槛                                           |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 骨架／输出映射 | 变换轨道描述符带有父级和输出索引。输出索引唯一且连续；无效输出索引会剥离一条轨道。默认子轨道不会存入压缩数据。如果所选默认值不是恒等值，解码器必须提供这些值；仅凭压缩轨道无法重建它们。[轨道描述符](https://github.com/nfrechette/acl/blob/3ee568542eca4428e1041908b4a644b98e7885bd/includes/acl/core/track_desc.h)                                                                                                                                                         | 随压缩字节保留父级／输出映射、轨道剥离策略及确切的默认／参考姿态。不要仅按轨道数判断兼容性。           |
| 误差尺度    | 同一描述符在每个变换周围刚性变形的壳层上测量误差，默认精度为  **0.01 厘米** ，壳层距离为  **3 厘米** ；单位不同时必须调整。[轨道描述符](https://github.com/nfrechette/acl/blob/3ee568542eca4428e1041908b4a644b98e7885bd/includes/acl/core/track_desc.h)                                                                                                                                                                             | 保留单位、逐轨道精度及壳层距离。较小的压缩误差设置不是通用的可见网格、脚部接触或玩法容差。            |
| 宿主变换运算  | 默认 QVV 误差度量无法表示组合骨骼链产生的剪切／偏斜。矩阵变体可处理带缩放的对象空间组合，但极端缩放／平移会累积数值误差。测量误差时，叠加片段在局部空间应用于基础片段；对象空间叠加混合被忽略。[度量指导](https://github.com/nfrechette/acl/blob/3ee568542eca4428e1041908b4a644b98e7885bd/docs/error_metrics.md)                                                                                                                                                             | 解释压缩保真度前，匹配实际宿主的层级、缩放和叠加约定；单独检查蒙皮及接触。                    |
| 采样与循环策略 | 解码绑定上下文，按明确的舍入策略定位，并通过轨道写入器写出。插值、向下取整、向上取整、最近值和逐轨道舍入是不同方式。[解码指南](https://github.com/nfrechette/acl/blob/3ee568542eca4428e1041908b4a644b98e7885bd/docs/decompressing_a_track_list.md) 环绕播放会引入合成的首样本重复并改变时长；采样完整时长后会返回该首样本。这可能与绝对根位移冲突，且环绕不适用于非循环片段。[循环指南](https://github.com/nfrechette/acl/blob/3ee568542eca4428e1041908b4a644b98e7885bd/docs/handling_looping_playback.md) | 记录上下文／片段标识、时间、舍入及循环策略。分别比较循环接缝及累积根轨迹；“片段终点”的一个姿态不能确立总行程。 |

**测试夹具模板：**  在不对称层级上比较原始、优化和解码片段，该层级包含非恒等参考姿态、被剥离轨道、非均匀缩放、叠加层及非零根位移。检查创作采样时间及关键帧之间的时间、循环接缝和重复循环。保留逐关节／世界空间观察结果和渲染后的蒙皮；脚部滑动、穿透及控制器／根运动应用需要实际目标项目观察，而非库成功返回或压缩率。

### Godot 重定向：归一化关键帧不等于控制器行程

于  **2026-10-19**  根据官方  **Godot 4.4-stable** ，提交 `4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41` 进行检查。[标签引用](https://api.github.com/repos/godotengine/godot/git/ref/tags/4.4-stable)和[版本文件](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/version.py#L1-L9)确立了这一选定源码版本，而非已安装引擎或与后续版本的兼容性。仅做静态源码审查；未执行导入、重定向或播放。

**边界。**  将导入的动画与其目标骨架及根运动消费方一起验收，而不只是匹配片段采样。这扩展了前述压缩门槛：在有效骨骼位置轨道的默认后处理路径上，同一未改变的动画资源，在 `motion_scale` 不同的骨架上，可以合理地产生不同的位置运动。这不应不加区分地应用于每条动画轨道。复用[运行时动画观察门槛](../production/engine-operations.md#runtime-animation-observation-gates)，处理播放时机、可见根变换抵消和移动归属；这里增加的边界是导入关键帧 → 按目标缩放的采样 → 提取的增量 → 控制器行程。

**源码观察到的契约。**

- [静止姿态修正器](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/editor/import/3d/post_import_plugin_skeleton_rest_fixer.cpp#L464-L473)仅在找到配置文件中的缩放基准骨骼且值为正时，才将 `motion_scale` 设置为该骨骼全局静止姿态 Y 坐标的绝对值。如果缺少缩放基准骨骼，或其全局静止姿态 Y 坐标绝对值为零，此分支保留原有缩放，而不报告显式失败。启用归一化不能证明计算出了新缩放；后续归一化过程仍可能使用保留的缩放。其[归一化过程](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/editor/import/3d/post_import_plugin_skeleton_rest_fixer.cpp#L850-L889)将符合条件的位置关键帧除以该缩放；压缩轨道被跳过，且该过程仅限相关骨架。缺少 BoneMap／配置文件会导致[提前返回](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/editor/import/3d/post_import_plugin_skeleton_rest_fixer.cpp#L86-L100)，而不是逐片段的成功判定。
- 默认 [AnimationMixer 后处理器](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/scene/animation/animation_mixer.cpp#L997-L1025)将骨骼位置采样乘以 **接收方** 骨架的 `motion_scale`；脚本重写可以替换这一默认行为。[根运动计算](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/scene/animation/animation_mixer.cpp#L1311-L1356)也会在形成增量前对位置采样进行后处理。因此，在此默认路径上，再手动将返回增量乘以同一缩放会重复应用它。这是控制流推断，而非测得的缺陷。
- [根运动 API 契约](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/doc/classes/AnimationMixer.xml#L106-L174)区分逐次更新的位移与混合位置累加器。错误的轨道类型会返回零位移，而累加器数值作差可能在循环处跳变。因此，零增量不是完整的有效性或静止片段判定；应单独验证配置的路径／类型。链接的运行时观察门槛已经覆盖可见变换抵消及消费它的控制器。

**建议的验收，尚未实现。**  记录源／导入动画标识、BoneMap／配置文件、归一化及重定向方法设置、源与目标静止变换、测得的 `motion_scale` 值、解析后的根运动路径／类型、`root_motion_local`、任何关键帧值重写、更新时间／增量及控制器代码／配置。为导入关键帧值、求值后的目标骨骼姿态、提取的根运动增量和最终控制器／世界轨迹分别保留输出。控制器碰撞和旋转策略可能使实际行程不同于动画请求；应保留两者，而不是声称其中一个就是另一个。如果测试转向扩展，应先将每个局部增量转换至该旋转策略要求的一致控制器／世界坐标系，再累积；原始局部空间求和不是世界行程。

**未执行的测试夹具。**  在其他方面完全相同、`motion_scale` 分别为 1 和 2 的两个目标骨架上，求值同一个导入的移动根节点片段。使用有效的骨骼根运动路径、默认后处理、一个权重为 1 的片段、无修改器或旋转，并在同一内部时间区间内进行普通非定位播放。要求该区间内的基线位移可证实为非零、明确数值容差，并在混合器更新后观察，以免零／零结果空泛地通过。建议的判定基准为 `postprocessed_sample₂ = 2 × postprocessed_sample₁` 和 `extracted_delta₂ = 2 × extracted_delta₁`，而不是可见骨骼姿态或混合累加器之比。这检查的是默认运行时运动缩放求值，而非导入器归一化或重定向映射本身成功。使用现有运行时观察门槛单独记录控制器行程，不重复其播放及移动归属测试夹具。增加缺少缩放基准骨骼、缩放基准高度为零及根运动轨道类型无效的情况。在单独的循环接缝案例中，区分累积的逐更新增量与累加器差值；累加器终点不是总行程。要求测试框架标记意外的缩放／路径配置；不要假设引擎会将它们报告为失败。这些是建议的断言，而非执行结果。

**恢复与限制。**  保留原始场景、导入设置和失败候选。修正明确的映射、缩放或消费方契约，再重新导入至隔离候选；不要通过改变片段关键帧或控制器速度来静默补偿。未确立通用步幅／接触保证、连续时间界限、修改器链正确性、崩溃安全的重新导入或跨版本结果。所检查的引擎代码采用 [MIT/Expat](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/LICENSE.txt)；[第三方许可证清单](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/COPYRIGHT.txt#L1-L46)、插件及动画／模型权利仍须分别考虑。

## 精灵图集元数据与播放交付

来源检查日期为 2026-10-18；未进行完整复现。这是经源码审查的交付契约和 **未执行的验收测试夹具** ，而非经验证的导入器。Aseprite 实现引用锁定到 v1.3.18.6，提交 `331e898ef405d919539c03fd1675691cfa16c3a3`；Godot 引用使用 4.5 文档及 4.5-stable 提交 `876b290332ec6f2e6d173d08162a02aa7e6ca46d`。这些是明确的检查目标，不是升级建议。

### 输入及刻意限定的导出配置

交付可编辑的 `.aseprite` 源、导出 PNG、伴随 JSON、导出设置、源／输出哈希、确切的编辑器与导入器版本，以及预期动画清单。记录画布尺寸、可见图层、帧时长、命名标签、锚点坐标和图像导入设置。清单应将预期的玩法含义与导出器能编码的内容分开描述。

第一个适配器应将输入限制为一个未缩放精灵、其完整时间线、合成的可见图层、`json-array`、紧凑打包布局、逐帧裁边、零内部填充，且不使用裁剪、网格／图层／标签／切片拆分或播放子标签模式。保留空帧。明确请求标签和切片元数据。[CLI 文档](https://www.aseprite.org/docs/cli/)区分 PNG 输出和 JSON 输出，提供哈希／数组形式，并将元数据包含与部分图层操作设为由选项决定。锁定版 [CLI 选项](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/src/app/cli/app_options.cpp)区分图集的单帧 `--trim` 与整个精灵的 `--trim-sprite`。

这一限制是有意设置的：子集导出、多文档和拆分图层需要明确的源帧到输出映射。增加这些模式后，不要假设 JSON 数组位置、文件名、源帧索引和标签范围仍可互换。

### 元数据是资产的一部分

锁定版导出器提供了以下有用的实现边界：

- `frame` 标识图集像素；`spriteSourceSize` 记录裁边后边界；`sourceSize` 保留原始尺寸；`duration` 来自源帧。写入器输出 `rotated: false`。其序列化的 `frame` 不包含挤出边框；直接使用该矩形，不要再次减去挤出边框。[帧序列化](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/src/app/doc_exporter.cpp#L1443-L1528)
- 紧凑打包布局可以将重复的渲染图像分配至同一矩形。JSON 仍遍历每个样本并写出其时长。对矩形去重不能合并动画中的各次出现。[打包](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/src/app/doc_exporter.cpp#L650-L708)、[序列化](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/src/app/doc_exporter.cpp#L1476-L1511)
- 启用裁边且不忽略空帧时，全透明帧会得到一个保留时序的 1×1 条目。忽略空帧会移除该样本。[空帧分支](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/src/app/doc_exporter.cpp#L1124-L1163)
- 标签元数据使用源 `from`/`to`、方向，以及为正时以字符串表示的 `repeat`；切片暴露按帧键控的边界及可选轴心。[标签](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/src/app/doc_exporter.cpp#L1530-L1579)、[切片](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/src/app/doc_exporter.cpp#L1683-L1756)

**编辑审查验收：**  拒绝不受支持的旋转、不一致的尺寸、越界的图集矩形、重复逻辑名称、无效标签引用、非正时长、缺少必需切片或意外帧数。报告不受支持的特性，而非静默替换默认值。将解码的 PNG 尺寸与元数据核对，并从交付包而非作者机器路径解析图像依赖。

### 保留坐标系与时间单位

[Aseprite 文件规范](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/docs/ase-file-specs.md#slice-chunk-0x2022)定义切片轴心相对于切片原点。对于未缩放帧，源画布锚点由 `slice.bounds.position + slice.pivot` 得出；其裁边后图像坐标为该锚点减去 `spriteSourceSize.position`。只有轴心而没有其切片原点是不够的。为每帧指定活动切片键，并在没有轴心时明确回退或拒绝。

建议的 Godot 适配器可以使用 `AtlasTexture` 重建画布：`region = frame`、`margin.position = spriteSourceSize.position`，以及 `margin.size = sourceSize - frame.size`。这是针对上述受限配置的推导：锁定版 [AtlasTexture 实现](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/resources/atlas_texture.cpp#L33-L53)将边距大小加到区域大小，[绘制](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/resources/atlas_texture.cpp#L157-L220)应用边距位置。锁定版[打包实现](https://github.com/aseprite/laf/blob/500768cccc6447e3b7816bedbfcb378a5c5222e5/gfx/packing_rects.cpp#L104-L126)使用形状填充来定位，而不扩大返回的矩形；导出的帧已不包含挤出边框。此重建在这里仍未经测试。对于源锚点恒定且未翻转的节点，`AnimatedSprite2D.centered = false` 和 `offset = -anchor` 是候选放置约定；其[文档属性](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/doc/classes/AnimatedSprite2D.xml#L83-L101)区分居中与绘制偏移。[绘制实现](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/2d/animated_sprite_2d.cpp#L269-L300)确认了这一偏移路径。改变锚点或翻转需要额外处理。

Aseprite 的帧时长在[帧规范](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/docs/ase-file-specs.md#frames)中以毫秒为单位。Godot 的 [SpriteFrames 契约](https://docs.godotengine.org/en/4.5/classes/class_spriteframes.html#class-spriteframes-method-get-frame-duration)使用相对时长：秒数等于相对时长除以动画 FPS 和播放速度绝对值。基准播放速度为 1 时，将毫秒 `d` 转换为 `d × FPS / 1000`。因此，10 FPS 下的 80 毫秒变为 0.8。只有在时间基准匹配时，例如速度为 1、1000 FPS 时，直接复制毫秒才有效。后续播放速度变化应单独记录。

Godot 的循环设置为布尔值。Aseprite 的[标签规范](https://github.com/aseprite/aseprite/blob/331e898ef405d919539c03fd1675691cfa16c3a3/docs/ase-file-specs.md#tags-chunk-0x2018)还定义了有限重复次数和方向；重复次数为零的含义未指定，且 UI 与导出播放之间存在差异。声明如何转换有限重复、倒放及往返播放，或拒绝它们。绝不要根据标签名称匹配推断播放完全相同。

### 建议的往返测试夹具，未执行

**测试模板：**  创作一个 32×32 RGBA 精灵，四帧时长分别为 80、160、120 和 40 毫秒。第 0 帧和第 1 帧像素及边界完全相同；第 2 帧改变轮廓／边界，但保留绘制的地面接触点；第 3 帧透明。使用恒定的切片原点 `(4,6)` 和轴心 `(12,22)`，确立源锚点 `(16,28)`。添加 `pulse`，第 0–3 帧，正向，重复 2 次；添加 `rewind`，第 0–2 帧，反向，重复 1 次。导出期间隐藏一个可见的辅助图层。

1. 导出受限配置，包含标签／切片元数据、两像素的形状间距及一像素的边缘挤出。保留命令／设置和诊断输出。不要硬编码打包坐标。
2. 检查四个逻辑记录和精确时长，包括透明帧。确认第 0 帧和第 1 帧可以共享图集像素，同时不丢失各自时序。重建每个未裁边画布，并与独立导出的源帧参考比较。
3. 在锁定版本的 Godot 项目中通过建议的适配器加载。在 10 FPS、速度为 1 时，预期相对时长为 0.8、1.6、1.2 和 0.4。一次正向遍历共 400 毫秒；两次遍历共 800 毫秒。反向顺序 2,1,0 共 360 毫秒。在声明的容差内测量完成时间，而非依据算术声称实际时钟时间精确无误。
4. 捕获相对于锚点的放置、透明帧停留及最终状态。重新导入、重新打开并重复。单独检查缩放渲染是否出现接缝／光晕；[AtlasTexture 过滤裁剪](https://docs.godotengine.org/en/4.5/classes/class_atlastexture.html#class-atlastexture-property-filter-clip)处理图集周围像素，但不能确立整个采样配置。

如出现停留丢失、时序漂移、锚点抖动、顺序反转、完成行为错误、纹理失效或导入输出改变，应判定失败。通过仅能证明被测试的视觉／时序契约。碰撞形状、命中框、动画事件、角色移动及玩法脚部接触行为需要单独的测试夹具。本说明未执行 Aseprite 导出、Godot 导入、播放、图像比较或运行时测试。

## 瓦片地图标识、几何体与运行时交付

实现 Tiled 到 Godot 的适配器时，应保留瓦片标识、变换后的碰撞几何体及负坐标持久化。使用以下测试夹具检查运行时就绪状态。

### 版本与输入边界

所检查的 Tiled 文档标识为  **1.12.2** 。其版本化 [v1.12.2 发行版](https://github.com/mapeditor/tiled/releases/tag/v1.12.2)解析为 [1fd984638f9898af920103799bcd68b467287295](https://github.com/mapeditor/tiled/commit/1fd984638f9898af920103799bcd68b467287295)，发行说明中的日期为 2026-05-27。Godot 引用使用  **4.5**  文档和 [4.5-stable 源码，876b290332ec6f2e6d173d08162a02aa7e6ca46d](https://github.com/godotengine/godot/commit/876b290332ec6f2e6d173d08162a02aa7e6ca46d)，并非对已安装引擎的声明。

建议的输入清单：地图格式／应用版本、方向、网格大小、图层层级及偏移、外部瓦片集／图像路径和哈希、编码／压缩、导入器修订版及明确的受支持特性列表。初始转换仅限正交地图及声明的形状；以诊断信息拒绝不受支持的方向／特性，而非静默展平它们。

### 1. 映射引擎单元格前，先解码标识

Tiled GID 仅在地图内有效。瓦片集顺序改变时，同一瓦片可能获得另一个 GID。将该值解释为无符号 32 位数，提取标志，并在查找前清除全部四个高位：水平 `0x80000000`、垂直 `0x40000000`、对角线／六边形 60 度 `0x20000000`、六边形 120 度 `0x10000000`。即使对非六边形地图，也要清除第四个标志。零表示空单元格；否则，选择不大于剥离后数值的最大 `firstgid`，再减去它。正交／等距变换先执行对角交换，再执行水平／垂直翻转；六边形标志有不同语义。[GID 契约](https://doc.mapeditor.org/en/stable/reference/global-tile-ids/)、[锁定版文档](https://github.com/mapeditor/tiled/blob/1fd984638f9898af920103799bcd68b467287295/docs/reference/global-tile-ids.rst)。

有效范围还不够：图像集合瓦片集可能有间隙，包括超过 `tilecount` 的局部 ID。外部 TSX 文件省略了地图专用的 `firstgid`。验证瓦片实际存在，并将瓦片集标识加局部 ID 保留为传输键。[TMX 瓦片集](https://doc.mapeditor.org/en/stable/reference/tmx-map-format/#tileset)。

Godot 图集变换使用的则是替代 ID 标志 `4096`、`8192`、`16384`；不能将原始 Tiled GID 复制到其中。适配器需要明确查找到源 ID、图集坐标、替代 ID 及归一化变换。用不对称美术资源验证全部八种正交翻转组合，而非假设仅凭名称就能确立等价性。[Godot 图集标志](https://docs.godotengine.org/en/4.5/classes/class_tilesetatlassource.html#constants)。

### 2. 序列化时保留稀疏坐标

无限地图的分块具有独立的瓦片坐标原点及尺寸；Tiled 官方 JSON 示例包含 `y: -16`。建议的输出坐标为分块原点加分块内位置，保留负值和稀疏间隙。按每个分块验证解码元素数量，而不是依据有限地图矩形；为重叠分块确立明确策略。像素图层偏移仍是独立变换。[JSON 图层／分块契约](https://doc.mapeditor.org/en/stable/reference/json-map-format/#chunk)。

Godot TileMapLayer 序列化坐标的范围为  **−32768…32767** ，超出该范围的值会回绕。锁定版写入器明确将每个坐标强制转换为 `int16_t`。因此，已填充的内存图层不能证明保存的地图忠实无误。保存前拒绝越界导入，或规定可逆的分区／重定基准方案；在全新重新打开后比较逻辑坐标。[4.5 持久化警告](https://docs.godotengine.org/en/4.5/classes/class_tilemaplayer.html#description)、[写入器，第 3196–3233 行](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/2d/tile_map_layer.cpp#L3196-L3233)。

### 3. 独立于瓦片图像传递几何体

Tiled 区分网格大小、图像大小、绘制偏移和瓦片对象对齐。较大的图层瓦片从其左下角锚点向上／向右延伸。对于正交地图，未指定的瓦片对象对齐默认为左下角；显式的 `objectalignment` 可以覆盖它。多边形点相对于所属对象，对象绕其位置顺时针旋转。边距／间距、瓦片偏移和图层偏移是独立输入。[TMX 几何体定义](https://doc.mapeditor.org/en/stable/reference/tmx-map-format/)。

锁定版渲染器按渲染尺寸缩放瓦片偏移，并在对角变换期间补偿矩形图像尺寸交换。其碰撞叠加路径将每个对象自身的旋转与瓦片片段的平移、旋转和缩放组合。这是创作几何体放置的证据， **不是** 物理引擎导入器。[单元格渲染，第 468–523 行](https://github.com/mapeditor/tiled/blob/1fd984638f9898af920103799bcd68b467287295/src/libtiled/maprenderer.cpp#L468-L523)、[碰撞叠加，第 631–655 行](https://github.com/mapeditor/tiled/blob/1fd984638f9898af920103799bcd68b467287295/src/libtiled/maprenderer.cpp#L631-L655)。

Godot 的 `map_to_local()` 给出单元格中心，并忽略逐瓦片的 `texture_origin` 绘制偏移。不要用该中心作为图像锚点的判定基准。[坐标转换](https://docs.godotengine.org/en/4.5/classes/class_tilemaplayer.html#class-tilemaplayer-method-map-to-local)、[纹理原点](https://docs.godotengine.org/en/4.5/classes/class_tiledata.html#class-tiledata-property-texture-origin)。

建议输出包括图像角点位置，以及单独变换的形状顶点、原点和绕序。拒绝不受支持的曲线、退化形状及未实现的缩放情况。通过数值和叠加图比较几何体；按声明的策略分配物理层／遮罩。可见瓦片一致不能确立碰撞响应或寻路正确性。

### 4. 将单元格赋值与运行时观察分开

Godot 的 `set_cell` 接受由三部分组成的瓦片标识；将源／替代设为 `-1` 或将图集坐标设为 `(-1,-1)` 会擦除单元格。更新在帧末批量执行，且仅在场景树内排队；场景瓦片在其父级之后初始化。`update_internals()` 立即执行内部处理；它不是经独立观察确认的渲染／物理完成屏障。[实现，第 3062–3064 行](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/2d/tile_map_layer.cpp#L3062-L3064)。`notify_runtime_tile_data_update()` 也会延后工作，运行时回调子资源还可能与 TileSet 共享，因此修改前需要复制。[TileMapLayer 4.5 API](https://docs.godotengine.org/en/4.5/classes/class_tilemaplayer.html)。

源码中有更明确的回读边界：`_build_runtime_update_tile_data_for_cell` 创建运行时副本，而 `get_cell_tile_data()` 检索的是图集源的基础数据。因此，仅该 getter 无法证明运行时覆盖已应用。记录回调输入／结果，并独立观察受影响的子系统。[运行时副本，第 1693–1738 行](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/2d/tile_map_layer.cpp#L1693-L1738)、[getter，第 2820–2832 行](https://github.com/godotengine/godot/blob/876b290332ec6f2e6d173d08162a02aa7e6ca46d/scene/2d/tile_map_layer.cpp#L2820-L2832)。

### 建议的验收测试夹具，尚未实现或执行

使用一个可丢弃的地图，包含两个瓦片集、一个稀疏图像集合、带标记的矩形瓦片、全部八种翻转组合、负坐标分块、非零偏移、一个旋转的多边形和一个调整过大小的瓦片对象。包括空单元格及坐标边界情况。独立于适配器输出记录预期标识及变换后的参考点。

要求五个独立判定：解析后的标识；坐标／几何体一致性；原生单元格赋值；运行时观察；保存／重新打开一致性。以刻意无效的 ID、缺失依赖、格式错误的分块长度及不受支持的方向作为失败案例。重新排序瓦片集后，在重新计算 GID 的情况下应保留逻辑内容。越界持久化必须在预检时失败，或保留声明的可逆映射。

对于仅限 Godot 的运行时扩展，测试共享同一源瓦片但仅其中一个收到覆盖的单元格、延后处理与强制处理、场景瓦片，以及禁用／重新启用。确认不受影响的单元格保持不变。单独捕获渲染地标和显式碰撞探测；单元格数量或正确截图都不能同时证明两者。随产物保留错误、不受支持特性报告及观察器时序。此处未执行导入器、测试夹具、引擎运行、保存／重新打开测试或玩法验证。
