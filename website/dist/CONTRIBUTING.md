# 贡献 GameMap

欢迎补充可信资源、修正描述、更新失效链接，以及提交有证据的工程经验。GameMap 将通用 Coding Agent、引擎生态、2D/3D 开发工作和世界模型组织为开发地图；收录不等于性能背书或完整复现。

## 唯一数据来源与生成流程

资源条目只编辑 `data/segments/*.json`。不要直接修改以下生成文件：

- `AWESOME.md`
- `data/resources.json`
- `website/src/data/resources.json`
- `website/public/awesome-list.md`

修改数据后，在仓库根目录依次执行：

```sh
node scripts/generate.mjs
npm run check
npm run build
```

生成脚本同步 Awesome List、网站数据及可下载清单；`npm run check` 校验 schema 与生成结果一致性，`npm run build` 完成生成与网站构建。这些检查不会安装、训练或试玩被收录项目。目前没有安排自动抓取或定期更新；条目通过人工阅读来源维护。

## 条目格式

每个分片是 JSON 数组，`id` 必须在所有分片中唯一且保持稳定。示例：

```json
{
  "id": "example-resource",
  "name": "项目的正式名称",
  "category": "2d",
  "type": "framework",
  "summary": "一句话说明它解决什么问题。",
  "detail": "说明输入、输出、适用阶段和重要边界。区分实际发布物与论文计划。",
  "url": "https://example.org/official-project",
  "links": [{ "label": "代码", "url": "https://example.org/official-code" }],
  "tags": ["program-synthesis"],
  "stages": ["plan", "code", "test"],
  "dimensions": ["2d"],
  "year": 2026,
  "verified": "2026-10-18"
}
```

| 字段 | 允许值与写法 |
| --- | --- |
| `category` | `agents`、`engines`、`2d`、`3d`、`world`，选择主要贡献对应分类 |
| `type` | `agent`、`framework`、`skill`、`benchmark`、`paper`、`docs`、`tool`、`community`、`dataset` |
| `stages` | 从 `plan`、`code`、`assets`、`scene`、`test`、`ship`、`world` 中选择 |
| `dimensions` | 从 `2d`、`3d`、`world` 中选择 |
| `links`、`year` | 可选；链接使用能支持标签的具体页面，论文年份优先使用首次预印本年份 |
| `verified` | `YYYY-MM-DD`，表示实际检查来源的日期 |

`summary` 与 `detail` 使用简洁中文，保留正式项目名；不把尚未发布的代码写成开源框架，不把图像生成写成动画生成，也不把会玩游戏的 Agent 自动归为开发 Agent。跨类别相关性用标签和阶段表达，避免为增加数量重复收录同一工作。

## 证据与收录标准

优先链接作者论文、官方文档、项目仓库、模型卡和数据卡。官方渠道无法支持的功能不要推断；社区经验用 `community` 明确标识，保留引擎版本、设备与问题场景。添加链接前阅读目标内容，不根据搜索摘要填写精确指标。

`verified` 只表示来源检查。只有实际运行过，才写“已复现”，并附命令、版本、硬件、输入、结果与失败范围。论文演示、完整开源实现、部分推理代码、托管产品和发布计划应在描述中区分。代码、模型权重和数据可能有不同使用条件，链接各自官方说明，不依据一个仓库标签作泛化许可结论。

性能数字必须附测量条件和主来源；不同任务、分辨率、GPU 或测量范围不作直接排行。方法比较需区分构建成功、功能正确、视觉质量、可玩性与运行性能。规划建议或工作流偏好明确写成 **GameMap 编辑建议**，不要包装成研究结论。

世界模型还要说明权威状态在哪里：可执行程序、引擎、视频 latent 或显式 3D 资产。动作可控视频、神经渲染和代码世界分别打标签，参考 [世界模型笔记](/world-model-notes.md)。

## 提交说明

PR 简述新增/更正内容、主要来源、实际检查日期和运行过的仓库检查。若只核验网页，请明确写“来源检查，未完整复现”。修复数据后重新生成并提交受影响产物；纯文档修改可只运行相关的格式或链接检查。不要为校验链接自动下载大模型、数据集或执行外部项目脚本。
