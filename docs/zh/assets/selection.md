# 资产候选选择与视觉反馈创作

依据具体任务选择资产，在上下文中比较候选，并利用视觉反馈指导修订。下述系统展示了检索、排序、编辑和评估 3D 内容的不同方式。

## 解读选择证据

现有的生成式工具及生成交付说明解释如何制作和获取资产。资产验证说明解释几何与交换检查。视觉证据说明涵盖感知诊断和若干创作助手，而基准测试可复现性说明涵盖任务隔离。缺失的连接是： **系统如何在候选之间作出选择，哪些证据实际到达评判者，以及细化是否优于将相同预算用于生成全新候选** 。

另请参阅[视觉反馈机制](visual-feedback.md)，了解帧选择、裁剪记忆与时序诊断。场景生成与游戏制作相关，但其本身并不等于可玩游戏成果。

关于固定候选池比较与完整选择锦标赛的独立重复实验之间的区别，请参阅[统计独立性与自适应反馈](../evaluation/benchmarks.md#harness-selection-statistical-independence-and-adaptive-feedback)。

对于固定参考渲染比较，[FLIP 输入/输出与显示契约](visual-evidence.md#flip-display-aware-render-differences)区分原始误差与着色预览、HDR 曝光策略以及无效聚合哨兵值。感知距离仍只是一种诊断，不能替代下文针对具体任务的验收证据。

## 1. SceneSmith：语义检索、几何重排与首个合格候选验证

### 经源码检查的获取接口

关节式对象检索器接收描述、对象类型、可选的期望尺寸 `[width, depth, height]`（以米为单位）以及请求的结果数量。它按类型过滤，以 CLIP 相似度排序，取出配置好的语义候选池，然后可选择按  **L1 包围盒尺寸距离** 对该池排序。未提供尺寸时保持语义排序。返回候选包含对象/来源标识符、SDF 路径、描述、CLIP 与尺寸得分以及包围盒端点。这是分阶段重排器；实现没有将语义与几何得分组合成经过校准的标量。不匹配的期望包围盒可能改变其他方面语义表现良好的候选顺序。[固定版本检索器][SS-retrieval]、[请求/结果模式][SS-schema]

路由器的生成分支每次获取一个候选，并渲染四个侧视图及垂直视图。它向 VLM 请求 `is_acceptable`、`reason` 和 `suggestions`，并返回 **首个被接受的** 候选。正数 `max_retries` 控制尝试次数；零表示获取一次且不验证。检索分支同样遍历候选列表。策略耗尽后返回 `None`。渲染或 VLM 错误会转为带解释原因的否定验证结果。在已检查的生成重试循环中，建议会被记录，但不会作为更改后的条目描述传回。因此，这条路径是拒绝采样，而非已核实的提示词重写优化器或全局 N 选优排序器。各次尝试会复用同名验证目录，因此适配器必须独立确认所有候选证据是否都得到保留。[固定版本路由器][SS-router]

### 验收实际意味着什么

严格验证提示词检查类别、明确指定的风格、完整性、合理比例，以及可独立操控的对象是否已融合进同一网格。它会拒绝带有附着可操控物的家具，以及装有独立内容物的敞口容器，但规定的例外除外。它也拒绝门/抽屉打开的生成柜体，因为该网格无法进行关节运动。这些都是有用的 **功能表示检查** 。然而，同一提示词明确容忍乱码文本，以及近似但并非真正金属、透明或反射的材质。其落地灯稳定性规则是视觉设计启发式，而非实测的质心或接触测试。不要将这种验收标记为材质保真、标牌可读或物理认证。[固定版本验证提示词][SS-validation]

### 反馈、证据与发现

论文描述了设计者/批评者/编排者角色、结构化状态加场景渲染，以及保留智能体上下文的回滚。与 NoAssetValidation 比较，表 1 报告的真实感偏好为 63.0%（强制二选一），忠实度偏好为 62.2%，后者 **排除平局** ；两者分母不同。移除场景观察会显著影响真实感，但在所报告的阈值下不显著影响忠实度。NoCritic 的偏好差异不显著并非等价性结果：完整系统在真实感和忠实度上的胜率分别为 51.8% 和 47.5%，95% 区间均跨越 50%。在 179 个房间级提示词上，其平均每场景成本为 4.24 美元，而完整系统为 13.98 美元，低约 70%；对象数量则为 54.0 对 71.1。时间测量使用八块 L40S GPU 并行处理 25 个场景，并非优化后的单场景延迟。这些作者结果支持成本与密度之间的权衡，而非批评者普遍有益的结论。[论文第 2 版，表 1 及附录 N/O.5][SS-paper]

### 发布与集成边界

公开仓库包含检索/路由器代码及原生 Drake directives 输出，并提供 Blender 场景以及面向 MuJoCo/USD 的转换脚本。README 警告，后者的导出路径因 OpenUSD 依赖冲突而需要独立环境。文档中的默认生成路径需要 SAM3D/SAM3 检查点、ArtVIP 资产、材质数据以及托管模型/图像调用；只安装 Python 依赖并不够。[仓库 README][SS-readme]

代码在已检查的[许可][SS-license]下采用 MIT。示例场景数据集卡将其分发标为 Apache-2.0。这两个标签都不能确立所有检索资产、模型检查点或托管输出的完整权利清单。未测试转换等价性或目标游戏引擎导入。[示例场景][SS-dataset]

**拟议公平比较：** 在固定候选池上比较仅语义、语义加包围盒以及六视图首个合格候选选择。另行比较最高得分候选策略。保持候选生成预算和语义池不变；采用独立的交互、关节运动、材质和几何检查。报告被拒候选、基础设施失败及弃权，而非强求每个请求都成功。对于场景细化，应纳入低成本的 NoCritic 条件，以及对象密度匹配的比较。

## 2. DreamReward / Reward3D：学习得到的多视图偏好评分器

### 论文机制与已发布接口

DreamReward 利用来自 2,530 个筛选后提示词组的 25,304 对标注样本训练偏好模型。人类标准包括文本对齐、质量和多视图一致性。其 DreamFL 方法将奖励反馈加入 3D 优化流水线。学习得到的视觉偏好得分是有用的候选选择证据，但论文并未确立碰撞、绑定、拓扑或游戏玩法适用性。它所报告的与仅图像评分的比较涉及偏好对齐，而非引擎验收。[论文][DR-paper]

已发布评分模块是具体的张量接口：图像加上分词后的提示词 ID 和注意力掩码，为每个四视图对象组产生一个标量奖励。`Reward3D_` 提取文本条件视图特征，为每个视图获得 128 维特征，将四个拼接为 512 维，再送入评分器。另行发布的 `Reward3D` 在其 MLP 前使用四视图注意力与门控融合模块。预处理将图像缩放并中心裁剪至 224 像素，使用固定归一化。两者的前向调用签名均不接收网格拓扑、物理状态或相机矩阵。因此，四视图分组及顺序应纳入适配器契约；它不是支持任意图像数量的评分器。[固定版本评分源码][DR-score]

引导源码选择 `Reward3D_Scorer` 或 `Reward3D_CrossViewFusion`，加载关联的状态字典，并在生成中使用奖励损失。仓库将 Scorer 描述为论文实现，将 CrossViewFusion 描述为扩展。混用两者报告的结果或权重会改变实验条件。独立的候选排序封装仍有待实现和验证；已发布引导代码并非现成的游戏资产批准服务。[固定版本引导代码][DR-guidance]、[README][DR-readme]

### 发布与条款

两个检查点文件均已公开列出。代码许可是 MIT，模型卡将权重标为 MIT。数据集卡将其发布标为 Apache-2.0，但明确表示  **2,530 个提示词组中仅有 1,000 个** 公开。仓库仍将奖励模型训练代码列为未来事项。因此，推理组件可用性的证据强于完整训练复现的证据。模型卡元数据不能解决上游组件与资产权利问题。[代码许可][DR-license]、[模型卡][DR-model]、[检查点列表][DR-weights]、[数据集卡][DR-data]、[README][DR-readme]

**拟议公平比较：** 用随机/首个候选、逐视图图文相似度均值、论文 Scorer、CrossViewFusion 及盲评人类参考，对同一组固定网格候选进行排序。固定相机顺序、光照、裁剪和候选数量。检查未见视图，并进行独立的网格/交互检查。用于选择或优化资产的评分器不能同时成为唯一的最终评判者。划分提示词族和生成器，以测试迁移能力，而不是仅测试已记忆的外观偏好。

## 3. MuMA：选择多视图材质集合

MuMA 接收无纹理网格以及文本/图像条件，并产生 PBR 纹理。其生成的反照率与由 IDArb 恢复的反照率是相互竞争的候选。GPT-4o 对水平拼接的六视图集合评分；选定策略分别查询每组，并对五次重复评分取平均。可选的 N 选优也会重复采样生成/分解，在所述设置中 N=3。这是资产通道选择，而非游戏逻辑细化。

论文比较了联合图像、逐视图和逐集合评分。逐集合评分报告的 CLIP/FID/KID 优于另外两种，同时使用联合图像方案 1.16 倍的 token 预算。移除评分/选择后，CLIP 从 30.41 变为 29.93；加入 N 选优达到 30.57。这些论文报告的小幅改进不能证明材质正确性已校准。顶部/底部不一致、光照烘焙进反照率以及 UV 缝隙仍是文档所列的局限。在已检查的论文中未找到官方实现或检查点链接；代码/模型发布与许可仍未核实。[论文第 1 版，§§3.3–4.5 及补充材料][MU-paper]

**拟议改造：** 保留每个通道集合的谱系，在固定光照/视图上选择，然后验证重新打光和留出视图。计入所有生成、分解及重复评判成本；将 N 选优与不使用评判者的等预算采样比较。不要默默拼合从不兼容候选中独立选出的通道。

## 4. SceneAssistant：放置前检查、原子工具与受约束反馈

### 机制与观察边界

论文的场景编辑词汇将创建/删除、变换、相机移动/聚焦及结束分开。生成对象可在观察后丢弃并重新生成。其“纯视觉反馈”描述仍包含当前对象数据和网格碰撞警告；这并非只访问截图。30 个场景的人类研究报告，完整系统得分高于完整 JSON 和单次生成变体。在 22 个开放词汇案例中，NoVisFeedback 仍收到预生成资产的网格图。此外，人类偏好允许多选，因此其百分比不是常规的成对胜率。[论文第 1 版，§§3–4][SA-paper]

### 实际源码契约与失败行为

固定版本循环发送当前渲染图像、场景 JSON、先前动作及系统消息，然后解析动作批次。它阻止将 Create/Duplicate 与 Rotate/Place/Scale/Translate 混在同一批次。单个动作失败时会恢复保存的场景状态、裁剪已记录历史并重复该步骤。重要的是，重复会递减步骤计数器：名义上的 20 步上限 **不能** 约束反复动作失败。人工编辑模式也没有界限。渲染失败会退出。Finish 与步数耗尽都会保存场景状态，因此仅凭已保存的最终 JSON 无法识别是否成功完成。解析器包含旧式 Python `eval` 回退；不能将其当作安全的不受信任动作边界。[固定版本循环与解析器][SA-main]

LLM 实现在每轮发送新请求，同时在本地保留日志。其 Gemini 默认配置是第三方中继端点，而非直接的 Google 服务；另一条配置路由是阿里巴巴兼容端点。后续任何集成都必须明确选择获授权的提供商，并单独审查传输/凭据。本研究未读取、配置或传输任何凭据。[固定版本客户端][SA-llm]

README 记载了逐步 PNG/状态 JSON、最终 `scene.json`，以及可导出 Blender 文件的渲染器。源码在固定修订版公开，但其完整目录树没有 LICENSE 文件，README 也未提供明确的代码使用授权。应将复用许可视为未解决事项。Hunyuan3D、Z-Image、Blender 及托管服务条款也仍各自独立。[README][SA-readme]、[固定版本源码树][SA-tree]

**拟议公平比较：** 保持权威状态访问相同，测试固定相机与智能体控制相机、原始图像与标签/坐标叠加、原子动作与完整 JSON，以及碰撞警告开/关。增加外部墙钟时间与总尝试预算；记录失败重试和人工干预。将动作成功/失败及结束原因与保存的产物分别持久化。状态回滚不能证明生成成本、文件或远程副作用已撤销。

## 5. AVR-Agent / AVR-Eval：游戏候选选择可能比批评更重要

### 作者结果及其范围

该研究评估五个 JavaScript 游戏和五个动画。它报告初始内容 k 选优有益，但加入自定义资产或视听反馈未带来显著总体收益。评估器先分别描述各段录制，再进行比较，随后使用文本模型复核判断。评估比较会反转 A/B 展示顺序。这些是有用的反例，反驳了“更多视觉反馈自动意味着更好”的想法。但它们不能证明视觉反馈普遍无效：任务、模型、观察及自动评判者均为该研究特定条件。论文指出，其自动评估器未经直接的人类偏好验证。[论文第 1 版][AV-paper]

### 经源码检查的候选与录制契约

资产选择主要由元数据驱动。资产扫描器提取图像尺寸、音频速度/时长及 GLB 动画信息；选择过程向模型提供目录/资源包及文件信息。因此，选中自定义资产不意味着编码模型检查过它们的实际外观或声音。在任何比较中，都应保留仅文件名资产目录与视觉/音频资产实证关联之间的区别。[固定版本资产选择器][AV-assets]

`select_best_candidate` 渲染候选，并开展顺序式的当前优胜者对挑战者锦标赛。可选的控制台错误过滤优先选择表面上无错误的候选，但在没有合格者时退回所有候选。缺少录制会跳过比较；缺失/失败的判断会保留当前优胜者。该函数可能原样返回现有代码。因此，“最佳”指这场锦标赛选出的候选，而非穷尽或顺序无关的最优解。封装应记录比较失败，而非默默将未经挑战的当前优胜者等同于经过验证的胜者。[固定版本构建器][AV-builder]

录制代码使用 Selenium/Chromium，启动生成页面并尝试点击 `start-button`。它录制视频、关闭该浏览器，再重新打开页面录制音频。它只保留最先出现的可配置数量的不重复控制台日志条目（默认五条），尽管源码注释写的是十条。其无错误返回值针对带完整前缀的消息测试精确的 `SEVERE` 列表成员关系，而非可靠地扫描各消息中的严重程度。此注意事项适用于录制器返回值；构建器单独的候选过滤器确实对提供给它的日志执行子串检查。因此，音频与视频本身并不一定描述同一次随机运行，截断日志也不是完整的运行时证据。同步事件保真度需要独立的确定性重放或同时捕获测试。这些是源码观察，而非已复现的录制缺陷。[固定版本录制器][AV-recorder]

### 可用性与条款

仓库公开，标记为已归档/只读，包含构建器、评估器、示例实验脚本及输出约定：HTML、MP4、可选 WAV、日志、逐轮内容以及可选记忆/恢复状态。代码许可为 MIT。README 另行说明源资产必须逐个下载，并列出混合条款，包括禁止再分发以及未声明许可的资产。其一般性的宽松许可资产措辞不足以为可再分发基准测试包清理权利。模型与托管提供商须自行审查。[仓库 README][AV-readme]、[代码许可][AV-license]

**拟议公平比较：** 在总模型、录制与候选预算匹配的条件下，将初始 k 选优开/关与视听批评开/关交叉组合。将原始资产预览作为独立干预加入。用独立动作/状态测试与留出录制评定最终游戏玩法，而非仅用选择评判者。将自动游玩代码与真实用户输入、控制及失败状态可用的证据分开。记录锦标赛顺序、A/B 反转、评判者版本、缺失录制、保留记忆及每个被丢弃候选。

## 6. 机制盲区与退步的场景编辑

于 2026-10-18 根据一手论文/项目产物核查。这些是可编辑 3D 创作研究，并非已证明的生产游戏收益。未执行任何模型、引擎、基准测试或评估器。论文描述的方法与部分发布仍应与已实现的 GameMap 支持分开。

### SimWorlds / 4DBuildBench：看似合理的运动可能掩盖错误机制

[论文第 1 版，2026 年 7 月 2 日](https://arxiv.org/html/2607.01766v1)描述了使用分阶段规划、验证、审查及检查点进行 Blender 5.1 构建。运行时检查涵盖修改器、烘焙缓存、动画通道及运动阶段；预览仍是独立证据来源。其 50 场景基准测试使用 42 个类型化机制谓词，并对动态片段采用五帧视觉评判，对静态场景采用一张静帧。机制通过率先在参与对象和场景内平均谓词通过比例，再对动态难度/类别单元作宏平均；它不是完全正确场景的比例。

所报告的总体机制得分为 0.87，而 VIGA 为 0.67；视觉得分则为 0.82 对 0.78。示例包括用关键帧近似模拟效果，而采样渲染可能接受这种做法。然而，生成预算不同，且比较改变了多个组件。在另一个 15 场景消融子集上，移除验证使结构得分从 0.97 变为 0.87，而机制得分仅从 0.97 变为 0.93。这没有隔离出普遍的视觉反馈收益。基线的结构评分还依赖推断的对象分组。谓词评估是确定性的，但可选的参与对象匹配回退会使用模型。见 §§3–4 及附录 A/C/D。

**可用性差异：** [官方项目页](https://dynsimworlds.github.io/)反而报告机制得分 0.86/0.71，并将 Sonnet 4.6 列为视觉评判者，而论文列的是 GPT-5.5。应将这些条件分开。检查时，页面显示的 arXiv 和 Dataset 控件均跳回项目页；未通过已检查的官方界面获取到可执行仓库或数据集发布。论文所述代码已发布并不是独立核实的发布。软件/数据复用条款与运行时等价性仍未解决。

### LEGO-Anything / LEGO-Plugin：细化可能丢弃更好的场景

[论文第 1 版，2026 年 9 月 28 日](https://arxiv.org/html/2609.36380v1)研究 Blender 5.0.1 重建，并评估中间产物。它报告 GPT-5.6-sol 有 29.6% 的编辑使得分下降，最终得分比最佳中间场景低 3.2 分。在六个构建模型/六个评判模型的比较中，自我评判与确定性几何得分变化方向的一致率为 45.8%，跨模型则为 45.4%。这是产物有效检查点对上的指标方向一致性，不是人类偏好或游戏玩法正确性。

论文描述的插件结合了由参考信息导出的初始化、几何残差及有界编辑事务。事务声明可编辑/受保护实体；缺少硬性检查证据会阻止验收；后续场景更改会使验证失效。参考掩码/深度是推断观察，由智能体将其分配给场景实体。私有基准几何不公开。在 42 个 Office 案例上，组合插件改进了全部六种模型设置，但该比较没有分离三个模块各自的作用，也未确立超出该子集的迁移能力。见 §5 及附录 F/G。

**可用证据不完整：** [官方页面](https://lego-anything.com/)称代码即将发布。公开、带版本的[附属 JSON](https://arxiv.org/src/2609.36380v1/anc/appendix_verified_evidence.json)提供汇总数量、混淆矩阵及作者端源文件哈希，而非这些底层文件或可执行评估器。其评判矩阵包含四个构建模型/四个评判模型及 960 个主要判断，每个均带 Reconstruction/Appearance 标签，而手稿描述的是六个/六个和 2,160 个。这个更窄的产物无法核实完整的手稿矩阵。其标签包含平局和双方均差的结果，因此普遍的 50% 随机基线需要限定。未核实已发布的插件实现、完整基准测试包或代码/数据许可。

### 拟议 GameMap 验收测试夹具，尚未实现

1. 当任务简要说明明确要求模拟或交互时，同时要求机制证据与观察到的结果。比较真正由求解器驱动的多米诺骨牌链与视觉相似的关键帧序列，然后扰动初始条件，测试声明的响应。对于要求创作动画的简要说明，关键帧仍是正当手段。
2. 跟踪每个场景修订版、受保护实体、实际编辑、渲染/相机设置、验证时效及回滚结果。加入一种修复：改进目标对象，却损坏此前正确的相机或交互。保留独立验收通过的最佳修订版，而非假定最后一次编辑就是最佳。
3. 在生成/渲染/验证预算匹配的条件下，比较无反馈、仅视觉反馈、引擎状态反馈及其组合。单独消融事务保护与初始化。区分模型导出的掩码/深度与权威状态，计入全部失败尝试，并保护最终评估不受细化反馈影响。

这些研究支持有针对性的诊断与新实验。它们不能确立一个即装即用的 GameMap 适配器，也不足以依据其报告得分对游戏创作系统排序。

## 7. Code4Scene：目标恢复与连带更改需要不同的比较

于 2026-10-19 核查，仅审阅来源。[论文第 1 版，2026-09-29](https://arxiv.org/html/2609.36777v1)评估已保存的 Unreal 场景，将构建与参考引导修复分开。修复目标来自输入和被隐藏的期望场景；候选不能重新定义目标。其基准有 190 个案例，其中 95 个公开，而当前已检查发布版的任务清单不同。研究针对静态场景，而非创作的动态行为或完整游戏成功。修复容差与得分权重是基准测试的选择，不是经过人类校准的等价关系。其图像生成场景得分未经人类判断验证，重复场景生成的变异性也未测量。这些是论文结果与局限，而非已复现的 GameMap 集成。

检查了[作者链接的仓库](https://miemiechen.github.io/)的 [2716e4397f768bf16b1f33dd34680d48aed0601f](https://github.com/SimWorld-AI/Code4Scene/tree/2716e4397f768bf16b1f33dd34680d48aed0601f) 版本，日期为 2026-10-03。尚未确定该源码固定版本就是产生论文结果的确切版本。

**经源码检查的契约：**

1. **目标恢复不等于保留。** `actor_f1.measure(input, ground_truth, candidate)` 在检查候选前推导目标。它返回计数/比率以及对应关系和未匹配对象审计。新增/更改的候选 actor 与仍存在的损坏目标会进入候选总体；无意的背景删除和用途改变会增加假阳性。因此，将无关椅子移来满足请求的椅子修复，不能同时将该椅子原本的角色算作已保留。匹配是一对一的，并优先考虑未变背景的对象重数；看似重复的对象不能承担两个角色。输入/候选对应关系使用结构与空间证据，而非名称或 GUID。相机/场景捕获 actor 被排除，且[仅改变背景包围盒不计分](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/protocol/actor_f1.py#L126-L128)。仍需单独的相机与几何保留断言。[Actor F1 实现，第 201–319 及 336–451 行](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/protocol/actor_f1.py#L201-L451)、[语义 actor 过滤器](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/requirement_graph/repair_target_authoring.py#L124-L135)

2. **修复容差不能变成未变场景的容差。** 对应关系检测编辑采用每个位置轴 0.1 cm、旋转 0.01° 及缩放 0.0001，而名义目标验收采用欧几里得位置 5 cm、四元数旋转 5°，以及每轴相对有符号缩放误差最大 5%。验收要求正确的结构身份，并通过每个适用的包围盒/属性检查。必需的姿态/包围盒值缺失或非有限时失败。真值通道是否存在决定适用性；省略候选通道不能使其停用。目标创作还会独立将现有 actor 投影到输入与真值共有的证据字段，避免因不对称导出凭空产生更改。冻结两套模式，并记录未观察到的通道。[更改容差](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/scene_diff.py#L50-L51)、[验收检查](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/repair_success.py#L22-L130)、[目标投影](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/requirement_graph/repair_target_authoring.py#L311-L350)

3. **视觉诊断与已公布的修复得分具有不同的权威性。** 当前修复验证器即使在局部/全局视觉诊断失败时仍发布 Actor Repair F1，同时单独保留诊断错误。不要将数值 F1 解读为视觉检查成功。评分文档将 0.8 Repair F1 与 0.2 静态 Physical Safety 结合；成对图像和描述文本比较仅用于报告。静态支撑/接触检查不能认证稳定性或玩家交互。[验证器分派](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/evaluation/verifiers/gt_repair.py#L977-L1015)、[评分协议](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/docs/SCORING.md)

4. **离线得分受限于其导出证据。** 有效修复包需要输入、期望与候选快照以及物理报告。默认对引用文件核查哈希。这能检测包字节的更改；却不能独立证明原始引擎测量。离线评分重新检查快照完整性，但会使用已记录的依赖/资源库判定和物理证据。将导出器版本、范围、原始场景修订版及捕获失败与包一并保留。[包验证/加载](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/code4scene/bundle.py#L201-L301)、[证据契约](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/docs/EVIDENCE_BUNDLE.md)

**可用性与版本边界。** [README](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/README.md)以 160 个构建任务为标题，并称包含 150 个。完整的固定版本目录树包含 150 个构建、25 个室内修复及 50 个室外修复任务定义；三个已发布调度文件的数量相同。尽管 README 强调构建，编辑代码仍然存在。不要默默将已发布的 225 个定义标记为论文的 95 案例公开队列。代码采用 [Apache-2.0](https://github.com/SimWorld-AI/Code4Scene/blob/2716e4397f768bf16b1f33dd34680d48aed0601f/LICENSE)；原始 Fab 内容未打包，仍适用独立条款。UE 5.8、内容包及评判者部署是相关实时工作流的前提条件，不是此处已安装的能力。

**拟议 GameMap 测试夹具，尚未实现：** 使用项目自有的已保存输入/期望场景，并冻结导出模式。比较精确恢复、原样保留损坏输入、正确恢复加无关移动/删除、背景对象改作他用、重复对象、身份重命名、负缩放反射及缺少必需字段。将相机和游戏玩法状态保留断言放在此 actor 指标之外。分别测量全部目标恢复、连带编辑及证据覆盖；对于游戏玩法主张，要求冷启动重新打开的完整性及实际穿行/交互检查。初始比较可使用冻结快照，无需重新运行模型；后续引擎验证是独立的经授权实验。

关于互补的观察关卡，请参阅 [InfiniBench 约束判定与相机覆盖](visual-evidence.md#infinibench-constraint-verdicts-and-camera-coverage)。已保存状态的修复得分不能确立证据相机观察到了每个必需对象。

## 共享的拟议验收记录

使用此实施计划连接资产选择、视觉反馈与 piRSI。

1. **候选标识：** 请求用途、原始提示词、生成/检索来源、模型/检查点、种子、源许可及不可变资产哈希。保留失败以及渲染前被拒的候选。
2. **证据包：** 相机外参/内参、单位/上方向/前方向约定、光照/材质设置、帧顺序、图像尺寸/裁剪及实际面向模型的数据包。将原始文件与缩放后的评判图像分开保留。
3. **独立判断：** 语义适配、视觉连贯性、几何约束、功能表示、运行时行为及法律资格。审美排序不得覆盖必需的碰撞、关节运动、可读性或权利关卡。
4. **选择策略：** 首个合格候选、标量排序器、顺序锦标赛及修改提示词后重新生成是不同算法。声明池大小、平局规则、弃权、重试、评判重复次数及候选顺序。
5. **最终独立性：** 在适当处使用留出视图、目标引擎状态断言及人工检查。不要仅针对同一学习得分/VLM 得分进行训练、选择和报告。阻止基准测试解答与最终测试证据进入反思记忆。
6. **预算与结束状态：** 核算生成器、渲染器、评估器、修复及基础设施成本。分别记录已接受、已拒绝、结论不明、基础设施失败及预算耗尽。渲染预览或已保存场景不能证明游戏能够运行。

最站得住脚的首个测试夹具是 **在已冻结、权利已清理的候选池上进行选择** 。它测试排序/反馈，不混入生成质量影响，不产生付费生成调用，也不暗示本次来源审阅已授予执行许可。后续将生成纳入循环的研究是独立实验。

对于对话草稿，[Ubisoft 创作研究](../production/tools.md#dialogue-drafting-preserve-preference-edited-acceptance-and-character-references)提供了另一个示例，说明为何成对偏好、编辑后验收、角色参考修订及自动风格得分需要分别记录。它不能确立已部署的视觉资产选择方法。

## 修订记录

GitHub 提交端点与内容读取解析到了以下修订版。上文引用文件均在这些哈希对应版本检查。这些是代码固定版本，不是已安装环境、模型权重固定版本、服务快照或复现证书。网页缓存的 `main` 页面仅用于发现/状态核查；源码主张使用固定版本内容。

| 项目             | 已检查提交                                      | 主要文件                                                                    |
| -------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| SceneSmith     | `67cc408fd38334b4a926efef45e284302ed5055b` | 关节式对象检索/模式、资产路由器、验证提示词、检查点状态、LICENSE                                    |
| SceneAssistant | `dcedd341f36ca1a0cfb3f0392c6a203b84a3a616` | main.py、llm.py、readme.md、完整目录树                                          |
| DreamReward    | `eeb5c648e6c2a25c8f6f8038edfe75d73c811614` | Reward3D/Reward3D.py、guidance1、LICENSE                                  |
| AVR-Eval-Agent | `3c91b950caada637c517f0ae158ba31a298d3901` | assets.py、video_game_builder.py、relative_eval.py、video_utils.py、LICENSE |
| MuMA           | arXiv `2503.18461v1`                       | 仅论文与补充材料；可执行发布未核实                                                       |

[SS-retrieval]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/articulated_retrieval_server/retrieval.py

[SS-schema]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/articulated_retrieval_server/dataclasses.py

[SS-router]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/asset_router/router.py

[SS-validation]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/prompts/data/asset_router/asset_validation.yaml

[SS-paper]: https://arxiv.org/html/2602.09153v2

[SS-readme]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/README.md

[SS-license]: https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/LICENSE

[SS-dataset]: https://huggingface.co/datasets/nepfaff/scenesmith-example-scenes

[DR-paper]: https://jamesyjl.github.io/DreamReward/static/pdf/DreamReward.pdf

[DR-score]: https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/Reward3D/Reward3D.py

[DR-guidance]: https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/threestudio/models/guidance/DreamReward_guidance1.py

[DR-readme]: https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/README.md

[DR-license]: https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/LICENSE

[DR-model]: https://huggingface.co/yejunliang23/Reward3D

[DR-weights]: https://huggingface.co/yejunliang23/Reward3D/tree/main

[DR-data]: https://huggingface.co/datasets/yejunliang23/3DRewardDB

[MU-paper]: https://arxiv.org/html/2503.18461v1

[SA-paper]: https://arxiv.org/html/2603.12238v1

[SA-main]: https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/main.py

[SA-llm]: https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/llm.py

[SA-readme]: https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/readme.md

[SA-tree]: https://github.com/ROUJINN/SceneAssistant/tree/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616

[AV-paper]: https://arxiv.org/html/2508.00632v1

[AV-assets]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/assets.py

[AV-builder]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/video_game_builder.py

[AV-recorder]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/video_utils.py

[AV-readme]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/README.md

[AV-license]: https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/LICENSE
