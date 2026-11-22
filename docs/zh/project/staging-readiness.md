# 预发布准备与发布就绪性审查

查看 GameMap 从本地发布迁移到云端预发布环境之前仍需解决的问题。

**结论：尚不具备云端预发布发布或生产切换条件。** 本地编辑、静态构建、精确产物发布及进程崩溃演练是有用证据，而非云端认证。当前公共网站仍通过 Git 编写并匿名访问；Studio 是独立的、需认证的编辑服务。

本审查仅限环境与部署就绪性。它不是渗透测试、独立的事实或许可审查，也不是提交、推送、创建云资源或替换当前网站的许可。

## 已准备，但有意保持禁用

`config/staging.example.json` 是不含机密的 **规划文档** ，而非运行时配置。`enabled` 必须保持为 `false`。没有任何组件会读取它来发布网站或连接数据库。其建议拓扑沿用现有 Pages/Supabase 技术栈，但不选择或配置 Studio 主机：

- 独立的 GitHub Pages 仓库及受保护的预发布批准环境。生产仓库中的第二次 Pages 部署不得替换生产网站。
- 独立的 Supabase 项目、Auth 用户及专用 Studio/发布器数据库登录。项目引用是标识符，而非凭据；应核实预发布与生产引用不同。
- 通过 HTTPS 提供的持久化 Node 服务，用于运行 Studio，且仅有 **一个实例** ，并在检出目录外配置私有持久媒体卷。Pages 无法运行 Studio。临时或无服务器文件系统不能替代当前媒体存储。
- 公共预览保持匿名。Auth、数据库访问及部署凭据保留在服务端或运维端。

可选的[低内存 Studio 策略](deployment.md#optional-low-memory-studio)限制新上传及原生图像处理，用于小型主机评估。它不会配置或认证免费主机、改变现有媒体、放宽单实例/持久卷要求，也不会解决下述发布阻碍。实际资源使用、配额、中国大陆连通性及完整工作流恢复仍需云端验收。

填写真实拓扑值之前，将示例复制到被忽略的私有位置。绝不能在 JSON 规划中放入密码、带凭据的数据库 URL、Auth 密钥或会话密钥。

```sh
mkdir -p .build/staging-preparation
cp config/staging.example.json .build/staging-preparation/plan.json
npm run staging:check -- --config .build/staging-preparation/plan.json --out .build/staging-preparation/review-1
```

每次审查使用新的输出目录。退出码  **2**  表示 **受阻/尚未就绪** ，而非云部署失败：不会发起任何网络请求。退出码 1 表示无法处理命令、输入或输出路径。私有目录包含：

- `report.json`：脱敏的规划检查、源提交及源文件引用/哈希。它不包含环境值或凭据存储内容。
- `studio.env.example`：仅为结构有效的规划生成；沿用现有 Studio 变量名，所有凭据字段均留空。有意不包含发布器凭据。

生成的环境文件 **不是启动云服务器的指示** 。`NODE_ENV=production` 启用 HTTPS/安全检查，但不是预发布身份边界。必需的 `CATALOG_RELEASE_REALM_FILE` 必须来自独立确认的运维配置，而非规划文件或发布发送方。连接真实项目之前，应解决下述适配器及云验收阻碍。该命令绝不读取 `.env`、Auth/会话密钥文件或云凭据，绝不运行迁移，也绝不修改 Git 或当前网站。即使所有建议 URL 均已填写，它也不能认证云设置。

## 阻断性发现

| 优先级 | 发现与证据                                                                                                           | 继续前的要求                                                                                    |
| --- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| P0  | 每个候选版本必须固定精确的已审阅提交。`scripts/lib/catalog/worker.mjs` 和 `site-build.mjs` 会拒绝脏的非本地冻结/构建；不相关的工作树编辑不属于已批准候选版本。       | 审阅完整候选版本，显式授权本地提交，并从其干净检出复现测试/构建。这不意味着允许推送。                                               |
| P1  | 迁移 `0013` 和 `release-realm.mjs` 强制不可变的环境/项目/实例/目标契约、独立运维预期、跨领域拒绝及受限的历史本地回滚。这是本地实现证据，而非云项目身份的证明。                 | 独立核实实际云项目隔离及运维注册。在任何审阅/发布历史产生前初始化全新的非本地领域；绝不重新标记本地夹具，也不信任发布发送方提供的领域文件。                    |
| P0 | `0011_catalog_publication.sql` 按设计仍仅限本地开发。迁移 `0031_catalog_cloud_platform.sql` 与 `scripts/lib/catalog/cloud-publication.mjs` 现已实现云端发布账本、目标认领、前驱 CAS、故障协调、保留产物回滚及 GitHub Pages / 持久化 Node 适配器，并已通过本地测试；真实云端目标认领与部署验证尚未执行。 | 使用 `npm run cloud:claim-target` 认领并核实真实预发布目标，并仅针对预发布环境演练发布、故障恢复与回滚。不要以移除 `0011` 的仅限本地保护作为捷径。 |
| P0 | `.github/workflows/deploy-pages.yml` 仍在 `main` 上构建 Git `dist/`（有意设计，保持不变）。`.github/workflows/deploy-release-pages.yml` 现已提供独立的手动/受保护工作流，仅验证并提升单个预构建发布归档，不在部署步骤重新构建，但 GitHub 受保护环境审阅者与引用限制尚未远程配置。 | 在托管仓库中配置受保护的预发布/生产 GitHub Environments、必需审阅者及分支/标签限制，并远程验证一次精确产物提升。 |
| P0 | 本地夹具包含合成账户、显式测试批准及本地部署状态。 | 使用全新隔离的预发布数据库，按顺序应用连续迁移（`0001`–`0031`），配置真实且独立的成员，并将保留的源语料导入为 **草稿** 。绝不将本地夹具批准/发布状态克隆到真实编写环境。 |
| P1 | `scripts/lib/catalog/database.mjs` 中的 `assertLeastPrivilegeLogin()`（由 `0031` 的 `public.inspect_login_privileges()` 支持）现已在 Studio（`scripts/platform/studio.mjs`）、社区服务端（`scripts/platform/community-server.mjs`）和云发布器（`scripts/platform/cloud-publication.mjs`）生产启动时检查 `NOINHERIT`、非超级用户、非所有者与非 bypassrls，并通过 `scripts/platform/cloud-provision.mjs` 提供 SQL 生成与探测。真实预发布登录尚未远程配置或探测。 | 使用 `npm run cloud:provision-sql` 配置专用 `NOINHERIT` 登录，并通过 `npm run cloud:verify-roles` 远程核实；绝不给 Studio、社区服务端或发布器提供所有者连接、服务密钥或无关部署凭据。 |
| P1 | 刷新串行化使用 `scripts/lib/catalog/auth.mjs` 中进程本地的 `Map`；现已通过 `CATALOG_TRUST_PROXY=1` 与 `COMMUNITY_TRUST_PROXY=1`（`clientAddress()`）接入单跳 `X-Forwarded-For` 代理信任，并附带 `config/deploy/Caddyfile.example` 与 `config/deploy/nginx.conf.example`，但真实反向代理行为尚未远程核实。 | 从 TLS 反向代理后的单实例开始。远程验证代理/Origin 行为及共享 IP 限流行为。在水平扩展前添加分布式刷新协调。 |
| P1 | `scripts/lib/catalog/cloud-backup.mjs` 与 `scripts/platform/cloud-backup.mjs` 现已实现基于标准 TLS `pg_dump` / `pg_restore`（不依赖 Docker 或 `supabase_admin`）的托管云配套备份、归档校验与隔离临时库恢复探测，并已在本地通过测试；真实云端备份与恢复验收尚未执行。 | 针对真实云数据库、媒体卷、保留产物及发布器元数据运行 `npm run cloud:backup`、`npm run cloud:backup-verify` 与 `npm run cloud:restore-probe`。记录签名密钥/会话恢复或有意登出策略、异地加密/保留、RPO/RTO 及运维权限。 |
| P1 | 紧急撤回现已贯通 SQL（`0031` 中的 `catalog.entry_withdrawals` 与 RPC）、Studio API（`/api/withdrawals`、`/api/withdrawals/lift`）、受审静态墓碑页（`site-build.mjs` / `withdrawal.mjs` 的 `site:build --withdrawals`）以及 `publication-server.mjs` 的即时 HTTP `410 Gone` 拒绝列表响应。真实预发布演练与 CDN/缓存失效策略仍未验证。 | 就线上紧急发布与 CDN/缓存失效运维手册达成一致，在编写来源切换前在预发布环境演练 `npm run cloud:withdraw` 与墓碑构建，绝不通过静默删除旧身份绕过等效检查。 |

迁移 `0013` 即使在文件系统目标尚未认领之前，也会禁用兼容入口 `catalog.activate_release`。新的冻结和构建要求绑定领域的版本 2 身份。只有迁移中此前已激活的历史本地允许列表仍可用于原始字节的本地恢复/回滚；历史字节不变。迁移 `0031` 新增独立的云发布、撤回与登录审计表及 RPC，不削弱 `0011` 或 `0013`。已应用迁移不得改写。

## 云端验收仍未验证

离线 JSON 声明无法让这些项目变为通过：

1. **身份与机密：** 独立项目/仓库/Studio Origin；真实成员配置与撤销；适当禁用或配置注册；最小权限授权；安全 cookie/CSRF/Origin 行为；私有日志及凭据轮换。
2. **连通性：** 可信 HTTPS 反向代理、有效证书、经验证的数据库 TLS、网络限制、Auth 回调/Origin 配置及服务商可用性/故障行为。
3. **存储与恢复：** 持久私有媒体、校验和/署名保留、与 SQL 及发布产物一致的备份、服务商支持的恢复及有文档记录的恢复时间。
4. **部署权限：** 受保护环境审阅者、引用限制、范围严格限定的 OIDC/Pages 权限、非特权构建与特权提升的分离、精确产物保留及经验证的回滚。
5. **运维：** 监控/告警、资源/滥用限制、负责人/值班响应、构建/部署失败处理、日志保留及紧急撤回。
6. **内容：** 清单/地址/媒体/语言核对、独立来源/许可审查、显式复现标签、生成指南审阅及逐集合编写来源切换批准。

干净构建、校验和、工作流日志或成功上传，本身均不构成部署批准。应区分夹具证据、事实核实、实际复现、编辑批准、产物验证及激活。

## 后续实现阶段的顺序

1. 仅在获得显式授权后，审阅并提交准备好的本地源代码。
2. 为候选版本重新运行不可变领域拒绝及历史升级测试，然后在运维注册前独立核实实际预发布项目身份。
3. 选择独立预览仓库、Supabase 项目和持久化 Studio 主机；在 **主机/CI 平台上** 配置凭据，绝不放入聊天或源代码。
4. 仅针对预发布环境实现并演练真实托管适配器及受保护工作流。
5. 使用真实且经审阅的语料完成云端安全/恢复/撤回验收。
6. 对任何生产连接、推送、部署或集合编写来源切换另行授权。

现有本地命令及匿名预览仍可使用；此准备不会引入活动的云发布器，也不会改变默认网站提供方。
