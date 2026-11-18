# 远程导入：从候选包到本地草稿

将经过审阅的远程候选包导入为本地草稿。导入器不会发布或批准内容，也不会连接任何远程服务。

`npm run remote:import -- --package /absolute/remote-package`  **默认执行离线试运行** 。它既不查找 Supabase 凭据，也不连接数据库。它仅接受 `gamemap.remote-candidates` v1 数据包，检查清单中每个源文件的字节/哈希，拒绝路径穿越、符号链接和重复身份，并使用已安装的带类型契约及规范化目录投影编译 **所有** 候选项。不支持的载荷/附件/翻译封套按失败即关闭原则处理，即使是已有键也不例外。保留实际的 `0013_catalog_release_realm.sql`，然后先安装类型工作线真正的 `0014_catalog_extended_types.sql`，再安装 `0015_catalog_remote_import.sql`；不要编造占位迁移。

此工具不提供远程服务、HTTP 抓取、远程 SQL URL、源代码执行、自动批准、发布、Git 写入、资产安装或数据库模式切换。来源提交元数据及哈希证明的是一致性， **而非真实性** ；请通过提取器独立核实固定的仓库/修订。

## 确定性的整包保真

来源验证器和导入器都会调用 `verifyRemoteSourceFidelity`：清单哈希检查后，它仅针对 **清单中这些原始字节** 重新运行现有 `recoverRemoteSource`。它比较完整的确定性数据包：每个条目的身份、标题、摘要、原生/加载器载荷、附件和 `source_review`，以及候选项/排除项成员及理由、来源清单、产物目标路径和原始文档。仅有模式有效性并不足够。伪造的 Codex 详情、论文来源信息、任意加载器候选项、被省略的候选项或捏造的排除项，即使全部原始来源哈希保持不变，也会失败。缺少必需源输入时按失败即关闭原则处理。导入器在编译或任何数据库操作前执行此检查；对夹具或已有键也没有绕过途径。

导入前，使用 **最终安装的模式** 重建数据包：模式是否接受决定排除项。旧包不会被静默升级。验证器有意要求数组顺序与恢复输出的确定性顺序相同。仍需从固定的干净检出生成（`node scripts/import/remote-source.mjs --source PINNED_CHECKOUT --out EMPTY_DIRECTORY`），或使用独立可信的摘要：重新提取无法验证同时被替换的源字节及哈希的真实性。

### 两项精确的图片路径规范化

固定来源中有两个标注错误的文件。恢复时将每个原始 `source/<source_path>` 逐字节保留，包括原名、大小和 SHA-256。只有提议的 Git 目标路径及相应候选图片引用会改变：

| 保留的来源                                      | 提议的目标路径                                                    | 必需的原始字节格式 |
| ------------------------------------------ | ---------------------------------------------------------- | --------- |
| `logos/crazygames-c284e89a355c.png`        | `website/public/logos/crazygames-c284e89a355c.jpg`         | JPEG      |
| `logos/stable-audio-open-e030c46f6897.png` | `website/public/logos/stable-audio-open-e030c46f6897.webp` | WebP      |

这是精确名称映射，而非通用扩展名嗅探、转码或 MIME 豁免。恢复过程检查映射字节的格式，将映射写入条目的 `source_review.image_path_normalizations` 和产物的 `source_path`/`path`，重新提取必须精确复现它。现有 `/GameMap/` 媒体前缀规范化保持不变。若规范化目标已存在于源路径中，即使字节相同也会被拒绝。这里的代码均不会写入提议目标；导入器将已有 Git 目标报告为相同/冲突，并要求引用的已安装字节匹配后才能应用。仅集成缺失目标；绝不覆盖已有文件。所有其他栅格目标扩展名仍须匹配实际格式、成功解码，并满足现有 4000 万像素上限。原始来源 URL、署名、哈希身份及许可/审阅/游玩测试限制不会被改写，也不会被视为许可。

### 固定媒体命名空间与 MP4 验证

所有远程 `media/**` 引用（包括 `/media/**` 和 `/GameMap/media/**`）都确定性地映射到 `media/imports/a2fe9a8e1d7b05008e11db1586d308c0086f7d91/**`。提议的 Git 目标添加 `website/public/`。后缀不变；所有对应载荷/附件引用均使用映射后的路径。这会将每个草稿截图、视频和海报与 Git 管理的媒体清单隔离，包括 `website/public/media/learning/` 和 `website/public/media/showcase/`：不要为了安装草稿资产而编辑 Git 清单或源记录。徽标路径保留现有冲突检查及上述两项精确扩展名修正。

原始源路径、字节、大小及哈希在 `source/` 和文件清单中保持完整。每个受影响候选项都会记录 `source_review.media_path_normalizations`，包含源路径、目标路径和原因；产物也保留两个路径。全封套重新提取验证这些映射及其他所有候选字段。源路径/目标冲突会被拒绝；已有目标冲突会被报告，并在应用前阻止资产验证。只能安装缺失且经审阅的目标，不得覆盖无关内容。

MP4 提案使用与受管理展示检查相同的 `scripts/lib/mp4.mjs` 检查器，而不是仅凭扩展名接受。它验证有界的 box 头/大小、`ftyp` 签名、非空媒体数据、渐进式 `moov` 顺序、恰好一个带 AVC 配置的 H.264（`avc1`）视频轨道/采样条目、头部边界/版本、安全且为正的时长/计时，以及 4000 万像素以内的正尺寸。现有 20 MB 提案限制保持不变。此结构验证不是解码器、转码器、许可清理，也不是发布批准；源字节绝不修改。

## 研究结果作为数据库证据管理

搜索／审核归档不是指南。迁移 `0017_catalog_research_archives.sql` 将完整原始 UTF-8 文本、来源版本／路径／SHA-256／字节数、适用时的重建 Markdown、解析后的章节／表格行、原始候选数据及全部历史排除项写入不可变的 `catalog.research_*` 表。记录关联现有目录条目，但不改写条目，也不为其结论背书。source-only、pending、excluded、限制性许可、未构建／未试玩／未运行测试等状态均保持不变。HTML 仅作为惰性文本保存，绝不执行。

首次迁移覆盖 **47 份研究／审核归档、导入索引及原始候选 JSON：共 49 份来源、2,290 条记录、46 个待核／排除游戏和 115 个原始排除项**。独立的后续批次保存 **49 份旧指南快照和完整转换元数据：新增 50 份来源、1,774 条记录**。目前共有 **99 份来源归档和 4,064 条记录**；两个批次均不改写另一批次，也不发布内容。现行教程、设计文档、操作指南和技能包继续由 Git 管理。没有现行 Markdown 副本的旧发布平台指南仍可在数据库中查阅。

完整回读通过后，整个 `docs/remote/` 被移除。原 `provenance.json` 逐字节保存在数据库来源 `remote/document-provenance` 中。`config/research-archive-receipt.json` 和 `config/research-archive-remainder-receipt.json` 仅保留已验证的校验值／数量，并作为清理前置条件。清理会拒绝尚未归档或已被修改的文件，不再重新生成归档页面；现行指南不得链接到已移除的命名空间。

```sh
# Offline compilation; no database or file deletion.
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY
# Existing owned-local stack only; back up before migration and again afterward.
npm run local:backup
npm run local:migrate
npm run local:backup
# Use the fresh backup and an existing verified admin UUID.
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY --actor ADMIN_UUID --backup PRIVATE_BACKUP --apply
# Independently re-read all stored originals, findings and exclusions.
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY --verify
# Store the remaining historical guides and conversion metadata in a separate batch.
# Use a fresh backup before apply.
npm run local:backup
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY --remaining --actor ADMIN_UUID --backup PRIVATE_BACKUP --apply
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY --remaining --verify
# Both matching verified receipts are required before removing the remote tree.
node scripts/import/recover-remote-documents.mjs --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY
```

Studio → **研究证据** 支持登录后按项目、许可或审核限制搜索，跳转关联目录条目，查看完整来源并无损下载原始文本。匿名访问和直接写表均被拒绝。这条证据通道从不提交、批准、冻结或发布目录内容。同一批次重放不改变任何行；来源冲突、备份清单变化或字节／哈希不匹配会中止事务。保留私有备份，并用 `npm run local:restore-probe -- --input PRIVATE_BACKUP` 验证可恢复性。

## 安全的父级/运维工作流

只有父级/运维人员可执行数据库步骤。保留现有本地服务栈； **不要重置、重新初始化、填充种子数据，或对已填充目录使用初始完整快照导入** 。

1. 集成/审阅各自负责的工作线，包括最终带类型的适配器/契约，以及连续的领域 `0013`、类型 `0014` 和摄取 `0015` 迁移。运行 `npm run test:remote:source`、`npm run test:remote:import` 及合并后的平台套件。审阅来源清单、排除理由、证据/许可限制及数据包。保留现有未提交文件。

2. 执行上述离线试运行。失败会阻止导入。完整验证报告包含候选项/排除项数量，以及提议的 Git 文档/媒体路径，其状态为 `missing`、`identical` 或 `conflict`。不要静默修复源内容或覆盖冲突文件。若修正获批，请重建经过审阅的确定性数据包。

3. 仅通过现有来源工作流集成经过审阅、缺失的 Git 资产，保留精确字节。研究文档通过上述证据工作流入库，不再生成重复的指南页。允许的提议资产目标是 `website/public/media/` 和 `website/public/logos/`；研究原件保留在数据库证据归档中。栅格字节必须匹配其声明的图片扩展名，并在现有 4000 万像素上限内解码。MP4 字节必须通过上述共享结构/编解码检查；展示资产必须使用固定的导入命名空间，而不是受管理展示片根目录。SVG 在此是惰性来源材料， **未经净化，也未获准内联渲染** ：应独立审阅，绝不将源 SVG/HTML 注入 DOM。应用前，引用资产必须存在且字节/哈希匹配。原始候选导入器仅报告文档；独立的研究证据导入器负责保存其完整内容。

4. 停止 Studio、发布作业、Auth/账户写入者及其他本地数据库写入者。使用 `npm run local:backup` 制作 **迁移前** 备份，保留其私有输出路径。使用 `npm run local:migrate` 审阅/应用迁移（仅限本地，使用现有服务栈）。使用 `npm run local:backup` 创建 **新的迁移后** 备份。第二份备份必须包含所有当前 `auth`、`catalog` 和 `public` 表，且行清单不变。保留两份备份。绝不能将 `runtime.env`、数据库 URL、凭据或转储内容粘贴到报告中。

5. 建议提供恢复证明：`npm run local:restore-probe -- /absolute/post-migration-backup`。它使用现有独立临时本地恢复数据库，而非活动目录。导入器本身会验证备份格式、本地标记、模式、转储/运行时/来源/媒体哈希，以及精确的当前数据库行清单；它不独立证明转储可恢复。

6. 确定一名负责这些草稿的 **已有 Auth 用户，且该用户具有目录管理员成员资格** 。命令绝不配置账户，也不接受任意作者身份声明。只读比较：

   ```sh
   npm run remote:import -- --package /absolute/remote-package --inspect --actor EXISTING_ADMIN_UUID
   ```

   检查会将每个已有键报告为冲突，同时区分规范正文相等的情况。它不跳过验证，也不改变审计/工作流/发布数据。应用时该结果可能已陈旧。

7. 使用私有迁移后备份目录显式应用：

   ```sh
   npm run remote:import -- --package /absolute/remote-package --apply \
     --actor EXISTING_ADMIN_UUID --backup /absolute/post-migration-backup
   ```

   连接仅来自现有本地运行时状态，要求回环端口 `54322`、数据库 `postgres`、不允许 URL 覆盖，并要求实际的目录模式所有者。SQL 会独立要求该所有者及管理员操作者。所有者凭据绝不输出。驱动错误有意简化为仅说明安全阶段的失败消息。

8. 对照备份，独立比较前后已有身份、不可变修订、规范化行、工作流状态、发布/条目/上下文、部署/发布状态及事件。仅可添加新的草稿条目及其规范化依赖行、验证回执、导入来源信息/审计。再次运行完全相同的应用命令：它返回原始持久化结果，不作任何变更。重试仍要求有效备份文件以及已验证的来源/类型/资产；只有精确批次已经提交时，才接受旧清单。任何后续发布前都必须独立审阅；导入管理员不能批准自己的修订。

## 事务与来源信息

`0015_catalog_remote_import.sql` 添加一个不可变批次台账及仅所有者可用的调用者权限函数。它复用 `catalog.import_snapshot`，但 **仅在锁内筛选出缺失身份及其规范化依赖项之后** 使用。已有键绝不传入该首次导入函数。不会改变任何已有正文/头/修订/状态，包括正文相同的冲突。共享词表/资产必须完全匹配，否则整批回滚。缺失的关系目标、规范路径冲突及约束失败也会回滚每次插入、回执和审计条目。

CLI 事务在比较清单和选择缺失键前，获取现有目录导入咨询锁，以及对每个 `catalog` 表按序获取排除写入的锁。Supabase 所有的 `auth` 和 `public` 系统表会被读取，用于完整备份新鲜度比较，但此工具绝不锁定或写入它们：目录所有者可能具有读取权限，却没有系统表写入/锁定权限。不要为了导入而授予更广权限。备份覆盖的任何表若已发生变更，都会阻止新批次；应停止写入者并制作新备份，而非覆盖检查。整个事务期间均排除目录写入；无关系统活动未被冻结，因此应按上述要求暂停其他写入者。这些锁用于维护操作，CLI 超时有界。不会提交部分批次。

批次身份是规范数据包 JSON 的 SHA-256。来源哈希、排除项、原始正文、来源引用及远程审阅限制在台账中保持不可变；编译快照摘要单独记录。新修订的来源审阅还注明其批次，触发器将 `created_by` 归属于经核实的管理员。已有审阅/发布函数强制执行独立作者身份审阅。`anon`、`authenticated`、`service_role`、`catalog_backend` 和 `catalog_deployer` 均不能使用此 SQL 函数；这是显式由所有者操作的迁移工具，而非公共摄取 API。数据库所有者始终能绕过应用控制；仅运行经过审阅的代码/数据包。

## 验证与限制

`npm run test:remote:import` 仅使用隔离 PGlite 和临时夹具目录。它显式应用真实基线迁移 0001–0013（包括不可变发布领域）、若已集成则应用真实类型 0014，再应用 0015；摄取工作线不拥有/创建 0014。发布夹具通过当前 API 注册显式领域及产物绑定回执；不会将任何后端代码替换为领域机制之前的行为。测试覆盖已填充的批准/发布状态保留、冲突和相同正文、规范化链接/词条/资产、可归属草稿、不可变重试、禁止自审/角色、数据包篡改及路径/类型拒绝、来源哈希不变且模式有效的整条目/来源信息伪造、确定性精确图片规范化及冲突/格式拒绝、批次中途外键失败后的回滚、陈旧/并发调度、备份哈希和离线 CLI。PGlite 串行处理单一连接：陈旧胜出者测试不能替代父级的多连接 PostgreSQL 锁测试。

编译器使用检出的带类型来源作为引用验证上下文，而非不可信数据库正文；该上下文不支持的引用，或数据库插入时缺失的引用，均按失败即关闭原则处理。v1 数据包没有独立翻译封套：现有带类型附件会被保留并规范化；意外翻译字段会被拒绝，绝不会藏入并行 JSON/二进制对象存储。源包产物不是新的运行时二进制对象存储。结构验证不意味着网络真实性、事实主张、许可已获准、游玩测试、SVG 净化或恢复成功。
