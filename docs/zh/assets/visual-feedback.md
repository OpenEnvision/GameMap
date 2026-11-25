# 游戏创作运行框架的视觉反馈机制

[GothicVania Codex Demo](https://github.com/acatovic/gothicvania-codex-demo#implement---evaluate-cycle-is-the-key) 的创作者在浏览器测试里发现敌人悬空，后来修了重力。遇到这种问题，只看一张图很难判断是角色刚跳起来、在播登场动画、镜头在动，还是它确实没落地。

为自己的回归测试，录下修改前后的同一段遭遇，保留输入轨迹，并检查接近、预期落地及随后的移动。如果选择器只返回一张好看的结束画面，就遗漏了本次判定需要的证据。相关时间段缺失时，应标记为证据不足，并保留完整录像供复核。

比较按固定间隔抽帧和新选择器时，用同一批录像、给相同预算。试看的帧和临时裁图也算进去。请另一位审阅者判断这些画面能否支持诊断。如果漏了落地的一刻，先改抽帧；如果目标太小，先试放大。只有确认多个时刻的信息需要一起看，才考虑加记忆或多一轮反馈。

## 先选择干预方式，再选择分数

| 问题             | 相关机制                 | 必须保持区分的证据                   |
| -------------- | -------------------- | --------------------------- |
| 哪些时刻能支持对交互的判断？ | 量规引导的回放位置；缺陷帧检索      | 帧选择所提供的支持与裁决正确性；选定帧与完整事件区间  |
| 智能体应看哪里？       | 高分辨率裁剪搜索与坐标记忆        | 预测区域与权威对象身份；裁剪局部坐标与源坐标      |
| 上下文能容纳什么？      | 分层选择、学习式词元压缩、紧凑调查记忆  | 被省略的证据与不存在缺陷；黑盒上下文策略与模型内部改动 |
| 奇怪的运动确实是缺陷吗？   | 游戏感知上下文、替代解释辩论、时间分组  | 推断规则与项目规格；模型置信度与经过校准的准确率    |
| 应保留哪个生成资产？     | 检索排序、首个合格候选验证、迭代场景批评 | 外观与几何/材质/运行时有效性；更多候选与更好的选择器 |

## 1. A2Z GameSpec-Bench：轨迹引导的帧检索

**论文描述的接口。**  选择器接收视觉量规、带渲染时间戳的已执行输入轨迹，以及观测预算。它请求回放位置/区间；确定性解析器返回录制帧。最终评判器接收帧和量规，输出条目分数、理由及引用的帧 ID。在其预算匹配实验中，请求被解析为请求时间戳处或之后的首个已捕获帧，后续请求可利用已观测帧，每一张被检查的帧都计入预算。

**报告的发现及限定。**  在来自 50 个生成的 Small 游戏的 244 次回放中，自适应选择在 1,159 次存在偏好的条目比较中胜出 60.5%。在全部 4,102 次比较中，17.1% 倾向自适应，11.2% 倾向均匀采样，69.4% 等效，2.3% 证据不足。这是模型审查的理由支持度，不是相对于参考标签的正确性。方法名被隐藏，但路径保留了源目录名。[论文 v1，第 D.2 和 G.3 节](https://arxiv.org/html/2609.39564v1)

**可用性与条款。**  [官方仓库](https://github.com/krafton-ai/a2z-gamespec-bench)明确表示代码即将发布；已检查的目录树中是文档/资产，而非已发布的评估器。不要将摘要中更宽泛的可用性声明当作可执行选择器存在的证据。仓库原创代码/GDD/契约采用 MIT，第三方材料保留各自条款。[数据集卡](https://huggingface.co/datasets/KRAFTON/A2Z-GameSpec-Bench)发布了 100 个 GDD/契约/场景任务，全部位于 `test`；Small/Big 是规模类别，不是训练/测试划分。它指定使用 Phaser 4.1、TypeScript 和 Vite。

**拟议的 GameMap 改造，尚未实现。**  首先将其用于短暂 UI 反馈及动作触发的转换。基线：从*同一份录制*中均匀间隔采样原始分辨率帧。候选方案：轨迹引导帧，按检查的总像素数/帧数匹配预算，包括探索性检索。测量已标注转换的覆盖率及缺乏支持的裁决。输入事件不能证明已渲染的结果。将仅供评估器使用的要求排除在智能体上下文之外。

## 2. V\* / SEAL：引导式裁剪与视觉工作记忆

**机制。**  VQA 模型指出缺失的目标对象，执行搜索，并基于问题、全局图像、裁剪图和位置进行推理。工作记忆是每个问题各自的上下文。在 191 个 V\*Bench 样例上，[v2 论文表 2 和第 5.2 节](https://arxiv.org/html/2312.14135v2)报告 SEAL 为 75.39%，而在相同数据上训练、无记忆/搜索的 LLaVA 风格模型为 45.02%。这并非仅在冻结的检查点中关闭搜索。保留工作记忆、但替换为 GroundingDINO 或 OWL-ViT 时，结果分别为 62.30% 或 62.82%，这更接近搜索与直接检测的对比。这些是专门的高分辨率图像 QA 结果，而非游戏编辑器或修复收益。

**经源码检查的接口。**  [`visual_search.py`](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/visual_search.py)接收 PIL 图像、目标对象文本、搜索模型、最小图块尺寸、置信度阈值和可选的可视化目标框。它返回 `(final_step, path_length, search_successful, all_valid_boxes)`。搜索递归划分图块，按目标/上下文热力图确定优先级，并可回退到置信度较低的候选。最终步骤的检测结果是裁剪局部像素坐标 `(x,y,w,h)`；包围该结果的图块另有相对于原图的偏移。因此，成功标志是必需证据，而非冗余元数据。在无候选路径中，`final_step` 可能仍为 `None` 就被解引用：这是源码可见的边缘情况，而非已复现的崩溃。

[`app.py`](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/app.py)加上裁剪偏移，提取稍扩大的对象裁剪图（`patch_scale=1.2`），然后在最终 VQA 调用前，通过方形图像填充和归一化映射边界框。演示警告，其搜索重点是常见对象及单实例情况。

**可用性与条款。**  [README](https://github.com/penghao-wu/vstar)中提供公开代码、基准和检查点链接。仓库 [LICENSE](https://github.com/penghao-wu/vstar/blob/main/LICENSE) 为 MIT。在检查的页面中，所链接的 [VQA](https://huggingface.co/craigwu/seal_vqa_7b) 和[搜索模型](https://huggingface.co/craigwu/seal_vsm_7b)页面没有实质性的模型卡或许可声明；代码采用 MIT 并不意味着权重、基础模型或图像已获使用许可。

**拟议的 GameMap 改造，尚未实现。**  在匹配图像/词元预算下，比较仅全局截图、固定网格裁剪和查询引导裁剪。保留全局截图，避免局部裁剪抹去空间上下文。每张裁剪图都需要源帧哈希、像素框、变换及明确的搜索成功状态。加入目标不存在和重复实例情况；不要将搜索失败转化为对象不存在的证明。

## 3. VideoTree：随相关性调整广度与深度

**经源码检查的接口。**  [`adaptive_breath_expansion.py`](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/adaptive_breath_expansion.py)使用每个视频的 `.pt` 帧特征和问题/描述记录。它对特征向量聚类，选择代表帧偏移，获取相关性分数，并写出逐视频预测及 `width_res.json`，其中包含 `name`、`tree_node` 和 `cluster_ids_x`。它将广度加倍，直到有足够多的分数等于 3 或达到最大值；[`defaults`](https://github.com/Ziyang412/VideoTree/blob/main/util.py)（默认值）为广度 8→32、四张高度相关帧。

[`depth_expansion.py`](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/depth_expansion.py)使用这些聚类分配、特征和相关性分数。分数 1 保留代表帧；分数 2 扩展一层；分数 3 扩展两层。它导出 `name`、按时间排序的 `sorted_values` 和 `relevance`。路径是硬编码占位符。

**重要的表示边界。**  [`prompts.py`](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/prompts.py)为最终提示选择的是描述，而非原始帧像素。复用前应审查索引约定：代表帧的张量偏移从零开始，而描述选择代码保留正偏移并使用 `captions[i-1]`。这一源码层面的映射疑点需要测试样例验证，而不能直接宣称为运行时缺陷。

**报告的发现。**  [论文 v2 表 5(b)](https://arxiv.org/html/2405.19209v2)报告，完整方法、移除深度扩展、进一步移除自适应广度时，EgoSchema 子集准确率分别为 66.2、64.4 和 61.2。这是依赖描述保真度的视频 QA，而非游戏调试。

**可用性与条款。**  [公开仓库](https://github.com/Ziyang412/VideoTree)，MIT [许可证](https://github.com/Ziyang412/VideoTree/blob/main/LICENSE)；文档说明了 Python 3.8+、面向 GPU 的聚类/特征和一个 LLM。数据集/模型/提供方条款仍需分别处理。无需训练仍然使用预训练模型。

**拟议的 GameMap 改造，尚未实现。**  将输出视为所保留原始证据的索引。在相同描述/模型总预算下，比较均匀采样、固定宽度聚类、仅自适应广度及广度加深度。纳入重复状态和短暂转换。将最终描述替换为像素会形成一个新适配器。

## 4. LongVU：时间过滤与选择性空间词元保留

**机制及报告的结果。**  LongVU 融合 DINOv2/SigLIP 特征，移除时间上冗余的帧，为与查询相关的帧分配更高的空间词元分辨率，再丢弃相邻帧之间冗余的空间词元。在 [ICML 2025 论文表 3](https://proceedings.mlr.press/v267/shen25j.html)中，8K 上下文的 VideoMME 分数从均匀 64 词元帧的 57.56，提升至采用 DINO 时间缩减的 59.90、加入查询选择的 60.08，再到加入空间压缩的 60.56。仅时间缩减在 EgoSchema 上比 64 词元均匀基线略低，因此这些组件并非普遍有益。

**经源码检查的契约。**  [`longvu/cambrian_arch.py`](https://github.com/Vision-CAIR/LongVU/blob/1b0be5cc28614b03a423bbaf129ae364750b5012/longvu/cambrian_arch.py)公开 `select_frame(feature_list, split_sizes, input_ids, new_image_aux_list, image_sizes, window_size=16, threshold=0.83)`。它返回选定特征、更新的帧计数、两个选定图像张量及原始选择索引。其长视频分支保留窗口中心锚点，并将选定帧数上限设为 400。按查询排序的分辨率分配与空间词元丢弃发生在多模态输入准备内部，并在压力下进一步截断。这些内部嵌入无法缩短不相关托管模型的视觉上下文。

[README 推理路径](https://github.com/Vision-CAIR/LongVU/blob/main/README.md)大约每秒解码一帧，对其预处理，然后调用 `model.generate(input_ids, images=video, image_sizes=...)`。它输出答案文本，而非证据清单；文档中的本地演示要求 40G GPU。

**可用性与条款。**  公开代码采用 Apache-2.0 [LICENSE](https://github.com/Vision-CAIR/LongVU/blob/main/LICENSE)，并链接了 Qwen2-7B 和 Llama3.2-3B 检查点。两个已检查的上游检查点页面均显示 Apache-2.0 元数据（[Qwen2](https://huggingface.co/Vision-CAIR/LongVU_Qwen2_7B)、[Llama3.2](https://huggingface.co/Vision-CAIR/LongVU_Llama3_2_3B)）；这不能替代对基础模型和训练数据条款的审查。

**拟议的 GameMap 改造，尚未实现。**  将其保留为模型内部研究路线，与仅优化 pi 运行框架的工作分开。固定骨干网络/权重/评估器，分别消融时间缩减、分辨率分配和空间丢弃。导出来源信息；测量罕见事件召回率、文本损失和时间顺序错误。每秒一帧的解码无法找回从未采样到的事件。

## 5. Automated Bug Frame Retrieval：有用的检索流水线，不可靠的标题指标

**论文描述的接口。**  将游戏视频重新编码为 H.264 medium，提取编码关键帧，将缺陷报告汇总并标记为视觉/非视觉，然后要求 GPT-4o 输出 JSON `Explanation` 和 `Ranking`（帧文件名），或不返回结果。连续批次在第二轮重新排序。候选覆盖率与最终检索成功率必须保持区分。

**指标警示。**  `Accuracy@N=TP@N/(TP@N+FN)` 排除了假阳性，因此 0.89 不是全视频准确率。报告的 pass\@3≈0.98 也不符合其自身算术：`1-(1-.68)^3≈.967`，且并未证实试验独立同分布。94 个从未正确的视频意味着有任何正确结果的视频占比为 `256/350≈73.1%`，其中包括正确弃答，但重复运行计数并不一致：在 3/2/1 次运行中正确的 183/48/25 个视频意味着共 670 个正确结果，而表 3 报告 `528 TP@1+184 TN=712`。应将 73.1% 视为某一报告计数的推论，而非经验证的实测 pass\@3；不要将 98% 引为实测结果。工业数据来自单款第一人称射击游戏；论文中未发现公开的可执行程序/数据发布。[论文 v1，表 3 和第 5.3 节](https://arxiv.org/html/2508.04895v1)

**拟议的 GameMap 改造，尚未实现。**  分别保留候选帧覆盖率、所有含缺陷视频中的正确检索率、无缺陷视频的假阳性检索率和正确弃答率的分母。在自有测试样例上比较编码关键帧、均匀采样和事件感知采样。保留原始时间戳映射。对动画/卡顿故障返回时间邻域；单张静帧无法确证这些故障。

## 6. OmniParser：帧作用域的 GUI 区域与坐标契约

核查日期为 2026-10-19。一个已发布的截图到区域接口，用于编辑器 UI 和游戏 HUD 观测，存在具体的标签/坐标风险。它补充查询引导的 V\*/SEAL 搜索及时间跟踪器；并不确立游戏创作、修复或玩法方面的收益。未运行模型或引擎、未安装、未下载权重、未执行 API 推理或测试样例。

### 来源边界

检查的 Microsoft OmniParser 源码位于  **354021201345a96178360b28733573e27269f2de** ，这是核查日期返回的默认分支提交。这个 2026 年 7 月版本将默认检测器改为 YOLOv9-E，因此仅描述 YOLOv8 的旧资料并不适用于此接口。所观测的模型仓库最新提交为  **f55d0750e5b94db2125ef0b45b0fa4a85ddc59b4** ；其[合并差异](https://huggingface.co/microsoft/OmniParser-v2.0/commit/f55d0750e5b94db2125ef0b45b0fa4a85ddc59b4)确证新权重及 MIT 许可证已发布。未下载权重字节或独立计算哈希。固定版本的模型文件页面无法直接加载；以下目录许可证观测使用单独限定范围的滚动更新页面。

### 已发布的输入/输出接口

本地 [FastAPI 服务器](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/omnitool/omniparserserver/omniparserserver.py#L16-L48)公开 POST `/parse/`，接收 `base64_image: str`；返回 `som_image_base64`、`parsed_content_list` 和 `latency`。GET `/probe/` 返回就绪响应。这是已发布、可自行托管的服务器源码，而非公共推理端点受到维护或本地执行成功的证据。[模型页面](https://huggingface.co/microsoft/OmniParser-v2.0)在核查时显示无 Inference Provider 部署。

[解析器封装](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/omniparser.py#L16-L32)解码图像，运行 EasyOCR 及图标检测/描述，并返回编号叠加图和元素记录。记录包含 `type`（`text`/`icon`）、归一化的 `bbox: [x1,y1,x2,y2]`、`interactivity`、`content` 和 `source`。客户端随后添加 `idx`。OCR、检测器和描述输出被融合；这些记录不是 DOM/无障碍元素、引擎对象 ID 或经过验证的动作目标。

**两种不兼容的框形状同时存在。**  [辅助函数](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/utils.py#L349-L372)另行返回 `label_coordinates`，它是以字符串 ID 为键、值为 `(x,y,width,height)` 的字典，默认使用像素，应要求可使用比例。相比之下，`parsed_content_list[].bbox` 始终是归一化的角点坐标。公开解析器封装丢弃辅助函数的坐标字典。使用方必须同时指明坐标空间和框格式；`output_coord_in_ratio` 不是控制所有返回结构的通用开关。[转换与返回路径](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/utils.py#L416-L496)

### 缩放、裁剪及原始图像映射

当前的 [YOLOv9 适配器](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/yolov9.py#L52-L87)将请求画布尺寸向上取整为 32 的倍数，按宽高比适配截图，将缩放后尺寸截断为整数，再将其居中放在 `(114,114,114)` 画布上。它通过减去左/上填充、除以名义缩放比例并限制到原图尺寸来还原检测框，然后返回像素 `xyxy`。[逆向映射](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/yolov9.py#L115-L136)

服务器封装设置 `scale_img=False`；因此 `predict_yolo` 不转发 `imgsz`，此适配器使用默认的 640 画布。模型卡中的独立示例使用 1280、左上角填充，以及不同的缩放和抑制设置。这些是不同配置，不是可互换的配方；两者都不能确立对细小编辑器控件的准确率。[调用方及检测器分派](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/utils.py#L390-L445)

默认 Florence/非 Phi 描述路径按整数像素边界从原始截图裁剪选定图标区域，再将其拉伸为 64×64 后处理。并非所有仅 OCR 区域都会生成描述，独立的 Phi 路径也不使用此缩放。这可能移除周围 UI 上下文并改变宽高比。[描述裁剪路径](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/utils.py#L88-L131)

调用方提供的任何视口裁剪或缩放均不在这些逆变换范围内。拟议的 GameMap 映射：归一化框 → 输入截图像素 → 撤销调用方缩放/填充 → 源帧裁剪偏移 → 仅在动作需要时转换为桌面/窗口坐标。记录原始/裁剪尺寸、偏移、舍入、显示缩放和窗口位置；比例不编码这些变换。将图像坐标空间与动作坐标空间分开。

### ID、解释与失效边界

- [客户端](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/omnitool/gradio/agent/llm_utils/omniparserclient.py#L14-L44)每次都重新枚举记录，并附上截图宽高、原始截图字节和文件名 UUID。此路径中没有时间匹配。ID 仅对本次解析/叠加图有效；排序和重叠过滤可能在后续帧中使其重新编号。服务器本身既不提供帧 ID，也不提供图像哈希。[截图 UUID 创建](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/omnitool/gradio/tools/screen_capture.py#L10-L27)
- [动作使用方](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/omnitool/gradio/agent/vlm_agent.py#L149-L168)按预测的 Box ID 索引当前记录列表，并将归一化框中点乘以截图尺寸。这是一个坐标提议，不能证明点击时目标已启用、未被遮挡或仍然存在。截图 UUID 是有用的关联元数据，但不能确证时效性或像素身份。
- [融合路径](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/utils.py#L251-L328)将 OCR 文本的 `interactivity` 赋值为 false，将检测器图标赋值为 true，而非对照应用状态检查。重叠 OCR 可能成为图标内容；位于 OCR 内的图标可能被移除。其重叠标准除 IoU 外，还包括交集/单个区域面积比。返回的来源标签可区分 OCR/融合/描述路径，但这些元素记录中不保留检测器置信度。图标描述是生成的解释，而非经过验证的语义。
- **源码可见、未经执行的边缘情况：**  当未发现 OCR 框时，`get_som_labeled_img` 设置 `ocr_bbox=None`，随后立即求值 `zip(ocr_bbox, ocr_text)`。这是所检查代码中缺少防护的失败路径，与无文字视口尤其相关；不要将其报告为已复现的崩溃，也不要将解析器失败转化为“没有对象”。[具体分支](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/util/utils.py#L437-L446)

### 代码/模型许可与可用性的区分

固定版本仓库的 [LICENSE](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/LICENSE) 是  **CC-BY-4.0** ，尽管 [README](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/README.md) 显示 MIT 徽章。应保留这一差异。模型目录分别声明 [YOLOv9-E `icon_detect_v3`：MIT](https://huggingface.co/microsoft/OmniParser-v2.0/blob/main/icon_detect_v3/LICENSE)、[Florence `icon_caption`：MIT](https://huggingface.co/microsoft/OmniParser-v2.0/blob/main/icon_caption/LICENSE) 和[旧版 `icon_detect`：AGPL-3.0](https://huggingface.co/microsoft/OmniParser-v2.0/blob/main/icon_detect/LICENSE)。模型卡中关于宽松许可流水线的表述，不能解决仓库许可证不一致或依赖条款问题。源码的 [requirements](https://github.com/microsoft/OmniParser/blob/354021201345a96178360b28733573e27269f2de/requirements.txt) 仍包含 Ultralytics。检测器加载器可以抓取滚动更新的 `main`；将来使用前，应分别固定源码、实际权重/配置以及 OCR/描述依赖。

### 拟议的有界 GameMap 比较，尚未实现

比较全局截图、截图加 OCR 区域、截图加完整 OmniParser 记录/叠加图。固定截图、模型、任务集、权限及总观测预算；纳入预处理/描述延迟和失败。使用自有编辑器/HUD 测试样例，包含重复图标、细小控件、嵌套文本/按钮、禁用控件、视口裁剪和移动后的窗口；纳入空白/无文本输入以及布局变化后的过期解析。

分别评估区域召回率、文本/语义正确性、坐标往返误差和目标选择；如有需要，再测量获授权动作的实际结果。拒绝过期的 `(frame hash, parse ID, region index)` 引用，保留原始证据和权威 UI/引擎断言，并将缺失/失败的解析作为明确结果。这测试的是 GUI 观测适配器，而非通用游戏理解或引擎状态真值。

## 7. FiftyOne：捕获证据的持久检索

核查于  **2026-10-19** 。它填补了 V\*/SEAL、VideoTree、LongVU、VideoAgent 和 OmniParser 之外的独立空白：一个已发布的数据集/视图/索引接口，用于跨编辑迭代重访存储帧和失败区域。它不是视觉推理模型，也不是游戏创作改善的证据。仅检查源码；未安装、未启动服务器或模型、未计算嵌入、未下载媒体或执行。

**来源边界。**  检查的 FiftyOne 版本为 `aacfc8182fc5353296b5edd7475e63335fedb5cb`；其独立 Brain 仓库版本为 `ba978a12293fda9953b478f601ac8950d2a35aa4`。这些独立解析出的修订标识所检查的契约，而非经测试的兼容安装。

### 身份、坐标与变更边界

- **持久化不是产物快照。**  数据集默认不持久化；`persistent=True` 保留数据库记录，而原始媒体仍位于外部文件中。保存的视图保留选择规则，底层记录变化时视图也可能变化。应将原始文件/哈希和物化结果清单与命名视图分开保留。[数据集持久化](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/user_guide/using_datasets.rst#L139-L157)、[保存视图的语义](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/user_guide/using_views.rst#L187-L196)
- **视频 → 帧。**  `to_frames()` 保留父视频 `sample_id` 和 **从 1 开始** 的 `frame_number`；实现复用源帧 ID。不采样时，缺少 `filepath` 的帧会被省略。`sample_frames=True` 写入图像及源帧路径，并且通常复用已有采样图像，除非设置 `force_sample=True`。FPS 选择按帧号操作；所检查的这些接口并不确立原始呈现时间戳或引擎 tick。保留录制哈希、显式帧到 PTS/tick 映射、采样/缩放参数及派生文件哈希；路径被复用不能证明像素是最新的。[帧构建与采样](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/fiftyone/core/video.py#L528-L648)、[源帧身份](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/fiftyone/core/video.py#L944-L978)、[从 1 开始的约定](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/user_guide/using_datasets.rst#L5139-L5147)
- **帧 → 图块。**  链式调用 `to_frames().to_patches(field)` 会生成父视频 `sample_id`、`frame_id` 和 `frame_number`。图块 ID 是源 **标签 ID** ，而 `filepath` 仍是完整帧路径：此视图本身并不确立单独保存的裁剪图。`Detection.bounding_box` 为归一化 `[x,y,width,height]`，不同于 OmniParser 的归一化角点坐标。实际裁剪提取可以扩展框/将其变为正方形；保留这些参数和裁剪到原图的变换。ID 标识记录，而非不可变的像素内容；通过 `other_fields` 或显式父级连接保留额外来源信息。[图块投影/ID](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/fiftyone/core/patches.py#L936-L988)、[框契约](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/fiftyone/core/labels.py#L450-L459)、[裁剪操作](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/fiftyone/utils/patches.py#L160-L189)
- **视图可以回写。**  编辑图块标签和某些帧字段，或调用视图的 `save`/`keep`/`keep_fields`，可能修改/删除底层标注。图块样本标签和无关样本字段具有不同的传播规则；帧标签/元数据不传播。将证据浏览和标注编辑视为不同操作。[图块传播](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/user_guide/using_views.rst#L1162-L1197)、[帧传播](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/user_guide/using_views.rst#L1888-L1919)

### 相似度时效性与结果来源信息

视图内搜索仅返回已索引成员；未索引的捕获内容不会出现。因此，需要独立检查索引成员资格与当前标注/媒体。显式的 `add_to_index`/`remove_from_index` 操作管理向量，固定版本指南要求 sklearn 用户在这些编辑后调用 `save()`。不应将此指导理解为每个后端路径都延迟所有写入：配置了 `embeddings_field` 的 sklearn 会直接写入新增嵌入。Brain 的基础 `reload()` 刷新视图 ID；sklearn 可以重新加载已存储嵌入，但检查的这两条重新加载路径都不会根据变化的像素/框重算嵌入。`missing_size=None` 可能表示不支持/未知，而非已确认完整。[成员资格](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/user_guide/similarity.rst#L154-L164)、[缺失数量的注意事项](https://github.com/voxel51/fiftyone-brain/blob/ba978a12293fda9953b478f601ac8950d2a35aa4/fiftyone/brain/similarity.py#L515-L525)、[手动保存](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/user_guide/similarity.rst#L760-L767)、[视图/重新加载契约](https://github.com/voxel51/fiftyone-brain/blob/ba978a12293fda9953b478f601ac8950d2a35aa4/fiftyone/brain/similarity.py#L613-L719)、[sklearn 重新加载](https://github.com/voxel51/fiftyone-brain/blob/ba978a12293fda9953b478f601ac8950d2a35aa4/fiftyone/brain/internal/core/sklearn.py#L327-L340)

所检查的 `SimilarityIndex.sort_by_similarity(..., dist_field=...)` 路径会根据样本/图块视图路线，将距离 **写入** 集合字段或标签字段；它并非仅返回分数数组。复用该字段不等于不可变查询历史。应单独存储每次查询的有序 ID 和分数，并记录 `brain_key`、索引/成员资格修订、嵌入模型/预处理、度量/后端、查询类型及 ID/文本/向量哈希、候选视图规则、`k`、方向和多查询聚合方式。[距离写入与有序结果](https://github.com/voxel51/fiftyone-brain/blob/ba978a12293fda9953b478f601ac8950d2a35aa4/fiftyone/brain/similarity.py#L756-L865)

### 本地/远程及权利边界

内置 sklearn 后端接受预计算嵌入，不需要远程向量服务。这并不保证部署完全离线：数据库端点、模型和插件是独立选择，而且默认启用基于 UUID 的 App 使用遥测（`do_not_track` 可禁用）。Qdrant 是可选项，可以在本地或远程；所检查的适配器向其配置端点发送 **向量、由样本/标签派生的点 ID 和样本 ID 载荷** ，搜索时发送查询向量/ID 过滤器。这些方法不上传原始帧图像；其他模型/媒体集成需单独审查。[后端/输入选择](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/user_guide/similarity.rst#L30-L63)、[Qdrant 上传](https://github.com/voxel51/fiftyone-brain/blob/ba978a12293fda9953b478f601ac8950d2a35aa4/fiftyone/brain/internal/core/qdrant.py#L302-L375)、[Qdrant 查询](https://github.com/voxel51/fiftyone-brain/blob/ba978a12293fda9953b478f601ac8950d2a35aa4/fiftyone/brain/internal/core/qdrant.py#L550-L609)、[遥测](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/docs/source/faq/index.rst#L671-L684)

所检查的两个代码仓库均声明 Apache-2.0；这不授予源游戏捕获内容、可选模型权重或服务使用的许可。[FiftyOne 许可证](https://github.com/voxel51/fiftyone/blob/aacfc8182fc5353296b5edd7475e63335fedb5cb/LICENSE)、[Brain 许可证](https://github.com/voxel51/fiftyone-brain/blob/ba978a12293fda9953b478f601ac8950d2a35aa4/LICENSE)

**拟议的 GameMap 门槛，尚未实现：**  在两组带构建标签的捕获集中检索一个已知失败的 HUD/资产区域；随后有意独立更改源图像、框和索引成员资格。要求正确的帧/裁剪往返身份、可见的缺失/过期结果以及保留的逐查询清单。将检索覆盖率与诊断或成功修复分开评估。这将测试存储/检索契约，而非游戏创作收益。

## 拟议的共享观测契约

保留源构建/运行/帧哈希、原始时间戳及渲染边界；选择策略/查询和每张检查过的帧；裁剪/缩放/填充变换；模型/配置及推断成功状态。将原始证据与描述/特征一同保留，重置回合记忆，并将权威引擎检查与视觉推断区分开。首个测试样例：一个短暂启用的按钮，随后产生延迟效果；其转换根据完整录制独立标注。

## 源修订边界与指纹

之前的提交查询失败已于 2026-10-18 解决。已重新阅读以下精确提交的文件；每个字节长度和 SHA-256 都与之前记录的指纹匹配。这些固定版本标识所检查的源码，而非已安装软件、模型权重或已复现行为。

| 检查修订中的源文件                                                                                                                                                   |   字节数 | SHA-256                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ------------------------------------------------------------------ |
| [VideoTree/adaptive_breath_expansion.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/adaptive_breath_expansion.py) |  6988 | `994f802fe6312ea27511278c3f50212a28280378eed95ce646bc0c755b48ca06` |
| [VideoTree/depth_expansion.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/depth_expansion.py)                     | 11615 | `195293dd8ffe7a9d34604f9f3e0955d588eb3bb1d11f3bf14e2b87d1afb6bd11` |
| [VideoTree/prompts.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/prompts.py)                                     | 19729 | `e1bf0e3e15473c9acc33826a2094b36a880aacdb9d5e0e252c9a86c550bfdb9c` |
| [vstar/visual_search.py](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/visual_search.py)                                | 24001 | `f58eddc2416705f32ac80b52f5e1f9ad1bbe801dece13232131b462053bc0b0d` |
| [vstar/app.py](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/app.py)                                                    |  9003 | `60b1ee80dfb37ea82f4317880c6d2df02e5dc8d45141a4e5f7e7d2aea0903830` |
| [LongVU/longvu/cambrian_arch.py](https://github.com/Vision-CAIR/LongVU/blob/1b0be5cc28614b03a423bbaf129ae364750b5012/longvu/cambrian_arch.py)               | 75765 | `f43449095b175c1d656d691a05fb6e01bdfbd8834490a9ed0b64c0b03b3821b9` |

提交解析结果：VideoTree `605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e`；V\* `4ede6647959cfb59eeabd09286adf6a5f9478da0`；LongVU `1b0be5cc28614b03a423bbaf129ae364750b5012`。其他滚动更新的文档/模型链接仍需单独限定范围。

## 时间验证：GliDe / VideoGlitchBench

**来源范围：**  [论文 v2](https://arxiv.org/html/2604.07818v2)，以及在上游提交 `0626688f2b2eab5414d8f8e28e682cfaf607c0ab`（2026-10-18）检查的六个文件。这是离线游戏视频诊断，不是游戏创作智能体或权威物理断言。

- **接口与机制：**  [README](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/README.md)记录了视频/游戏名输入、帧窗口筛查、针对性 VQA/裁剪和可选 SAM3 跟踪，随后进行事件分组与区间细化。输出 JSON 包含缺陷描述，以及每个缺陷一个或多个以秒为单位的区间。不可用时可禁用可选跟踪，因此结果必须附带工具可用性信息。可保存中间产物。
- **实际信息策略：**  在 [graph.py](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/graph.py) 中，游戏上下文取自前三条不同且非空的扫描器描述中最长的一条。这是推断上下文，而非检索得到的权威规则手册。没有阳性扫描窗口时会直接转入总结，跳过详细分析和定位。[记忆代码](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/analyzer/memory.py)将规划器上下文中较早的辩论轮次压缩为裁判结论；最近两轮保留更多细节。提供给辩论提示的序列化工具证据被截为前 1,500 个字符，随后附省略通知。因此，完整存储证据与模型可见证据不同。
- **报告的证据：**  论文的 Qwen2.5-VL-7B 消融报告，完整系统、无游戏上下文、无辩论的描述 F1 分别为 39.12、33.03、32.17；移除定位使其 mIoU 从 0.53 降至 0.32。这些是作者针对特定数据集/骨干网络的发现，并非成本匹配的结论或可靠项目 QA 的证明。单个异常姿态可能是有效游戏行为；不相连的时间区间可能描述同一反复发生的事件。
- **评估器差异与分母：**  论文使用语义分数乘以时间 IoU 分配配对；固定版本的 [evaluator.py](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/evaluation/evaluator.py)仅按语义分数分配，再计算重叠。其描述精确率/召回率对匹配的 0–5 裁判分数求和，除以 `5 × predicted/ground-truth bug count`；这是软描述得分，而非经过阈值判定的真阳性计数。论文印出的公式遗漏了这个五倍因子。平均 IoU 只对匹配对取均值；未匹配事件不进入该均值，正确的无缺陷视频也不增加描述分子。数据集循环仅使用真值/预测共有的名称，因此缺失预测被排除。描述评分错误可能变为零分。在将某次运行称为论文复现之前，必须协调匹配、归一化、缺失输出策略与裁判失败处理。
- **发布与条款：**  流水线及评估器文件公开；[代码许可证](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/LICENSE)为 MIT。[数据集卡](https://huggingface.co/datasets/SandyZheng33/VideoGlitchBench)声明 Apache-2.0、4,717 个故障片段和 521 个阴性片段，带标注及按游戏组织的视频文件。其查看器的划分标签为 `train`；这不能确立留出优化协议。底层游戏/视频权利及模型依赖仍需单独审查。未运行任何数据归档、模型或服务。

**比较模板：**  在相同调用/词元预算及报告的实际耗时两种口径下，比较均匀窗口筛查、仅游戏上下文、仅辩论和时间分组。下游分析之前先测量候选窗口召回率；纳入罕见短暂故障和合法的风格化运动。冻结完整预期回合清单，单独统计缺失/错误输出，保留报告到帧的引用，并说明匹配遵循论文还是代码。在相同上下文预算下比较压缩裁判摘要与原始证据；将权威项目规则与模型推断的记忆分开。这里未实现这些消融中的任何一项。

## 将视觉 QA 任务用作观测检查：VideoGameQA-Bench

[官方项目](https://asgaardlab.github.io/videogameqa-bench/)区分场景/UI 问题、可接受与不可接受的截图变化、参数化穿模、故障检测、缺陷描述和首次故障定位。这提供了具体观测测试：图像对加变化策略产生回归判断；场景图像加类型化问题产生结构化属性；视频产生检测结果和首次发生位置答案。这些输出不能确立玩法状态或碰撞的正确性。作者报告，细微场景/UI 细节及时间定位尤其困难。

[产物页面](https://asgaardlab.github.io/videogameqa-bench/artifacts.html)公开了各模型结果、错误计数及不同的已评估样本总数。[公开数据集卡](https://huggingface.co/datasets/taesiri/VideoGameQA-Bench)声明 CC-BY-4.0。这些是可用的评估材料；本次检查未确立完整可运行评估器的存在。复用前保留确切的任务版本、答案模式、时间戳单位、错误分母及源媒体权利信息。

使用项目自有的原创受控场景，测试裁剪、图像对或时间证据包是否确实保留了小道具、HUD 值、接触转换或短暂异常。将证据选择与最终诊断及智能体修复分开评分。缺陷报告写得更好，本身不意味着检测器更准确。

## 资产反馈与候选选择

参见[资产选择与视觉反馈创作](selection.md)，了解 SceneSmith、Reward3D、MuMA、SceneAssistant 和 AVR-Agent：首个合格候选与排序选择、多视图评分、模型实际可见的证据，以及反驳细化普遍带来收益的反证。

## 拟议的受控运行框架搜索

将证据获取视为与动作/工具策略并列的显式候选组件。除非实验明确研究改变这些条件，否则保持游戏项目、模型、权限和任务集不变。

1. **观测包。**  保留原始视频/图像及构建 ID；记录源时间戳或仿真 tick、相机/视口、裁剪到原图的映射、选择查询、模型派生的掩码/标签、选中及拒绝的候选 ID，以及省略的帧范围。紧凑证据包应回指原始证据，而非取代它。
2. **匹配的基线。**  在相同帧数/像素预算下比较均匀时间采样、事件触发采样与查询自适应采样；在相同视觉词元预算下比较完整帧与裁剪加全局上下文。除最终模型词元数外，还应报告选择器调用、预处理、生成尝试、延迟和失败。对于学习式压缩，应将检查点/架构的变化与仅改提示/工具的运行框架变化分开报告。
3. **有用的反例。**  纳入短暂接触失效、合法的夸张动画、被遮挡对象、被正常区间隔开的重复事件、细小 HUD 变化以及空白/缺失捕获。对于资产，在未来获授权的测试样例中测试背面视图、比例/坐标轴/枢轴、透明度/材质行为和目标引擎导入；审美上更受偏好的缩略图不能确证这些属性。
4. **区分结果。**  独立评估证据覆盖率、时间/空间定位、诊断、建议修复、实际执行的功能结果和主观质量。保留无反馈基线及相同预算的额外生成基线；否则反馈收益可能仅反映尝试次数增加。
5. **防止选择泄漏。**  可行时，使用项目/游戏互不重叠的开发集和最终集。比较前冻结裁判提示及预期回合 ID。不要向持久候选记忆暴露留出答案、最终分数或推断出的最终测试经验。将失败、不可用工具及弃答计入，而不是丢弃。
6. **固定与审计。**  保留源码及模型修订、服务名、原始工具结果、压缩上下文和确切的评分实现。执行前，论文/代码差异需要明确选择协议。特定用途的代码、权重、数据及服务权限仍是独立门槛。

**剩余边界：**  本合集支持设计有界实验，但不能选出普遍最优的视觉运行框架。为此需要选定的目标游戏/项目族、获授权的运行时、自有或已获许可的资产、经校准的验收断言，以及计算/延迟预算。这里不声称已开展此类实验。

## 互补的失败证据

[机制盲区与退化的场景编辑](selection.md#6-mechanism-blindness-and-regressive-scene-edits)区分采样视觉合理性与所要求的求解器行为，也区分最终修订与独立验收的最佳修订。[Dead Cells 的创作者约束](../production/studio-case-studies.md#dead-cells-generation-must-preserve-the-authored-experience)和 [Far Cry 5 的过期预览权衡](../production/studio-case-studies.md#far-cry-5-stale-previews-and-excessive-automation-can-invalidate-feedback)为设计意图、依赖时效性及受玩法约束的美术指导提供了历史开发者证据。链接笔记保留了论文/产物差异、历史范围及未经执行的迁移假设。

## 主动视觉检查：冻结模型搜索与学习式工具使用

核查于  **2026-10-19** ；仅检查源码。这些静态图像研究补充了 V\*/SEAL；两者均未证明游戏创作、修复或 3D 相机选择方面的收益。

### ZoomEye：仅推理的裁剪搜索

ZoomEye 使用同一冻结模型关于存在性、潜在可见性和可回答性的 Yes/No logits 搜索图像区域。这需要访问 logits 及模型特定预处理，而非任意托管聊天端点。其[模型封装](https://github.com/om-ai-lab/ZoomEye/blob/6762d79f3153552d03b49a2d5c07caaa44fac375/ZoomEye/zoom_model.py)扩展选定图块、添加填充/叠加层，并提供局部或全局加局部图像。仅保存框并不能复现这些像素。

尽管论文使用归一化角点表示法，[树](https://github.com/om-ai-lab/ZoomEye/blob/6762d79f3153552d03b49a2d5c07caaa44fac375/ZoomEye/tree.py)存储的却是原图像素 `(x,y,width,height)`。子节点偏移仍相对于源图。[搜索循环](https://github.com/om-ai-lab/ZoomEye/blob/6762d79f3153552d03b49a2d5c07caaa44fac375/ZoomEye/zoom_eye.py)在初始弹出阈值之后放宽置信度并延长搜索；这不是硬性推理调用预算。队列排序增加模型调用，而导出计数器省略失败搜索和全实例工作。

[论文 v4，表 4–5](https://arxiv.org/html/2411.16044v4)报告定位成功/失败条件下的准确率为 93.45/54.55，而非随机化裁剪消融。改变分区数同时改变准确率和搜索开销。MME-RealWorld 空间位置性能退化，提醒我们不能将定位等同于空间理解。

代码在链接的固定版本公开，但[完整目录树](https://api.github.com/repos/om-ai-lab/ZoomEye/git/trees/6762d79f3153552d03b49a2d5c07caaa44fac375?recursive=1)没有许可证文本；标为 LLaVA 的打包文件中的 Apache 分类标识，使 ZoomEye 专有部分的复用许可仍不明确。链接的基础检查点及图像需要单独审查权利。

### DeepEyes：经 RL 训练的裁剪工具策略

[DeepEyes v3，表 9](https://arxiv.org/html/2505.14362v3)比较以不同方式训练的策略：在相同数据上进行纯文本 RL，在 V\*/HR-4K/HR-8K 上得分为 88.5/75.4/60.8，而交错视觉推理为 90.1/75.1/72.6。它改变权重，且并非在每项基准上都胜出。

[训练辅助函数](https://github.com/Visual-Agent/DeepEyes/blob/11d20c6be32b2cf62c914e0c73a06db2f9a7e3a1/verl/workers/agent/envs/mm_process_engine/visual_toolbox_v2.py)读取像素角点框，将其限制在边界内，并拒绝边长 ≤30 像素的框。裁剪和旋转使用最初的第一张图，而不是上一次观测。[发布的评估器](https://github.com/Visual-Agent/DeepEyes/blob/11d20c6be32b2cf62c914e0c73a06db2f9a7e3a1/eval/eval_vstar.py#L175-L277)则直接裁剪/缩放，用 Python `eval` 解析模型文本，并允许十一次生成调用，每次最多 10,240 词元。耗尽调用次数后，即便没有完整答案，运行器状态仍可能保留为 `success`；这与答案正确性评分不同。复用前需要替换其解析器和终止标签。

代码采用 [Apache-2.0 条款](https://github.com/Visual-Agent/DeepEyes/blob/11d20c6be32b2cf62c914e0c73a06db2f9a7e3a1/LICENSE)；[权重卡](https://huggingface.co/ChenShawn/DeepEyes-7B)也声明 Apache-2.0。观测到的[模型仓库修订](https://huggingface.co/ChenShawn/DeepEyes-7B/commit/3b31e4b342592d14cb12bb8434a6ea55e9cd78c8)：`3b31e4b342592d14cb12bb8434a6ea55e9cd78c8`；未验证权重字节。基础模型/数据条款仍需单独处理。

**拟议的 GameMap 比较，尚未实现：**  首先在固定检查点及相同视觉词元/模型调用总预算下，比较全局帧、固定裁剪和自适应裁剪。将训练策略实验与相机视图实验分开。保留源帧哈希、变换、实际观测像素、失败及停止原因；独立评分覆盖率、空间关系及最终判断。

## 视觉历史复用、外部记忆与受控暴露

核查于  **2026-10-19** 。这些 GUI/游戏记忆来源补充上文的主动检查机制。模型内部特征复用、解码器剪枝、外部图像记忆和评估时的帧拼接改变流水线的不同部分。它们报告的指标不能确立游戏生产改善；以下所有迁移对照均尚未实现。

### HistPrune-GUI：先复用编码历史，再进行有损压缩

当前[论文 v4，*在何处及如何剪枝*](https://arxiv.org/html/2603.26041v4)使用经任务微调的 Qwen2.5-VL-3B/Qwen3-VL-2B，在 AITW、Mind2Web、AndroidControl 和 GUI-Odyssey 上评估 GUI 下一步动作预测。其剪枝干预无需额外训练。历史图像词元在解码器内被剪枝；当前截图、指令及动作文本保持完整。在表 1 的 AITW/Qwen3-VL-2B 上，ViT 缓存将步骤成功率从 0.7035 变为 0.7030，同时报告的 FLOPs 减少 31.5%、实际耗时减少 11.8%；峰值内存增加 1.52%。这是特征复用，而非更小的观测包。在另一个组合实验（表 12）中，加入保留率 10% 的随机历史剪枝进一步降低实际耗时，但步骤成功率为 0.6853。因此必须将缓存收益与剪枝收益分开。论文还发现，背景覆盖及空间上分散的保留词元很重要；仅选择前景不是安全的通用规则。

在代码提交 `bc3118c85f9a1b1b6e496af857144e8f901c8132` 中，[AndroidControl 评估器](https://github.com/Daiqiang-Li/HistPrune-GUI/blob/bc3118c85f9a1b1b6e496af857144e8f901c8132/AndroidControl_eval.py#L1250-L1324)提供图像路径及参考动作历史，每回合清空缓存，并淘汰历史窗口以外的图像。[Qwen2.5 缓存](https://github.com/Daiqiang-Li/HistPrune-GUI/blob/bc3118c85f9a1b1b6e496af857144e8f901c8132/src/Qwen2_5/model_file/LLM_compression_v2_5_action/modeling_qwen2_5_vl.py#L2610-L2677)按所提供的字符串键及网格形状复用特征，不检查图像内容。因此，不可变的捕获身份是适配器要求。这无法通过提示改动优化不相关的托管模型。

代码和[检查点文件夹](https://huggingface.co/lidaiqiang/HistPrune-GUI/tree/main)公开；检查点页面缺少模型卡/许可证，检查的代码树缺少仓库级许可证。继承的模型文件 Apache-2.0 头部声明不能解决每个文件或权重的条款问题。

### MementoGUI：动作模型之外的事件门控 ROI 记忆

[论文](https://arxiv.org/html/2605.18652v1)描述了一个单独训练的控制器，接收目标、当前截图、上一个动作和工作记忆。它输出写入显著性、摘要、ROI 框和检索触发器。保留的条目将摘要与裁剪图配对；较旧条目被压缩为摘要加视觉引用。完成的回合变为可检索经验。粗粒度嵌入检索后接学习式选择。冻结的动作模型使用普通文本和图像，因此这是外部上下文设计，而非词元改造。

评估是离线 GUI 动作预测，包括 80 条 MementoGUI-Bench 测试轨迹和 120 条记忆构建轨迹。ROI 消融结果喜忧参半：恢复图像使 UI-Venus GUI-Odyssey 动作匹配率从 64.22 提升至 67.69，但 MementoGUI-Bench VLM 动作匹配得分从 1.53 降至 1.41。不要复述正文中普遍改善的说法；记忆一致性分数也只是裁判评估，而非权威状态。

[已核实的仓库修订](https://github.com/zzzmyyzeng/MementoGUI/tree/9b32877e42ab8708aba90c6db3bca4ce984ca6be)包含项目页面和图像，资源链接为占位符，未核实控制器、评估器、检查点或许可证发布。应将其视为设计假设。对于游戏创作，保留每张记忆裁剪图背后的完整帧/构建引用，并将延迟视觉约束与成功编辑分开评估。

### EMemBench：比较记忆时，固定经历过的历史

[EMemBench v2](https://arxiv.org/html/2601.16690v2)根据记录的游戏轨迹和底层状态生成记忆问题。它区分有关智能体自身经历的问题，与受控暴露于相同已录制历史和 QA 集。后者有助于将记忆重建与探索差异分开。其报告的受控暴露实验使用 Jericho 文字游戏；不应将视觉 Crafter 结果描述为相同的受控比较。论文描述了查询时间跨度控制，将问题证据及答案限定在前缀内；这不是图像词元预算。这些是记忆问题结果，而非游戏创作质量，也不能证明压缩历史保留了每项相关观测。

**检查的视觉接口。**  作者链接的[三月源码快照](https://github.com/InternLM/EMemBench/tree/8d38a655245934ff8c77bbad0bef4718224017e3)早于该论文修订。其[作答脚本](https://github.com/InternLM/EMemBench/blob/8d38a655245934ff8c77bbad0bef4718224017e3/visual_game/answer_crafter_qa.py#L271-L407)提供带步骤标签的拼图、限制为前 50 张有序帧的 `all` 模式，以及首/中/末采样。[默认拼图设置](https://github.com/InternLM/EMemBench/blob/8d38a655245934ff8c77bbad0bef4718224017e3/visual_game/answer_crafter_qa.py#L747-L752)使用十列、图块最长边 160 像素、每张图 200 帧，以及每批问题最多十张拼图。因此需要分别记录缩放及保留帧数。同一[批次构建](https://github.com/InternLM/EMemBench/blob/8d38a655245934ff8c77bbad0bef4718224017e3/visual_game/answer_crafter_qa.py#L472-L512)包含动作/原因/资源统计时间线；此路径所得分数无法隔离仅图像回忆。较旧的[生成器](https://github.com/InternLM/EMemBench/blob/8d38a655245934ff8c77bbad0bef4718224017e3/visual_game/generate_crafter_qa.py#L1446-L1474)还包含基于范围的前缀辅助函数之外的全回合模板，其答案上下文仍未截断；不要将论文的时间跨度保证视为已由这些字节全面实现。这些是经过源码检查的控制，而非已测量的拼接消融。

**发布边界。**  检查的目录树有生成器、运行器和评分代码，但没有与 v2 受控暴露发布声明匹配的冻结轨迹/QA 语料库。更广泛的可用性仍未经核实。根目录 [LICENSE](https://github.com/InternLM/EMemBench/blob/8d38a655245934ff8c77bbad0bef4718224017e3/LICENSE) 为 Apache-2.0；[README](https://github.com/InternLM/EMemBench/blob/8d38a655245934ff8c77bbad0bef4718224017e3/README.md) 将 Apache 代码 / CC BY-NC 数据徽章与涵盖二者的仅供研究声明并列；保留这一已声明的歧义，改造前检查预期用途条款。不要将仓库标签延伸适用于捆绑的第三方游戏文件。

**GameMap 拟议对照，尚未实现：**  对同一冻结捕获流，使用评估器持有的事件/状态答案，评估原始帧、拼图和检索区域。固定非图像时间线及步骤标签的访问，记录省略帧和词元/像素预算，再单独测试交互式采集。记忆回忆和游戏编辑决策的改善需要独立结果。
