# 网站开发与部署

GameMap 使用  **Fumadocs、React Router、React、TypeScript 和 Vite** 。发布目标为 [GitHub Pages](https://openenvision.github.io/GameMap/)。生产环境仅包含静态 HTML、CSS、JavaScript、媒体及浏览器端搜索索引，无需应用服务器或 API 密钥。

## 本地开发

使用 Node.js 22.22 或更新版本：

```sh
npm ci
npm run dev
```

打开 React Router 输出的 URL。主要路由包括：

- `/` — 概览与精选游戏示例。
- `/resources/` — 可搜索、可筛选的资源及浏览器本地收藏。
- `/examples/` — 附有创作者证据和项目源码的可玩游戏。
- `/testing/` — 项目、环境、资产及动作数据参考资料。
- `/docs/` — 渲染后的指南、研究笔记及来源署名。

应用位于 `website/app/`。现有目录与案例数据保留在 `website/src/data/` 中；公共源资产保留在 `website/public/` 中。

## 文档与内部链接

`docs/` 下的 Markdown（包括 `docs/AWESOME.md`）以及 `CONTRIBUTING.md`，都会在构建时渲染。文章包含导航、目录、代码高亮、标题链接和全文搜索。通过 Git 编写的长篇 Markdown 仍是权威来源，可通过来源链接访问。已注册的目录指南是结构化数据的生成视图；其来源链接指向可信生成器，而不是暗示旧的 Git 导出文件是另一个并行编写来源。

`scripts/prepare-docs.mjs` 会在 `website/.content/` 中创建可丢弃的副本。它会推导标题、将内部 Markdown 链接改写为文档路由，并将本地文档图片暂存到被忽略的 `website/public/docs-assets/` 目录。原始研究文本不会被改写。`website/docs.config.json` 控制导航分组和短标签；未分组文章仍可在“更多笔记”下访问。开发时编辑源 Markdown 后，重新运行此准备脚本或重启 `npm run dev`，以刷新准备好的副本。

文档源使用 Fumadocs MDX 的 Vite 集成，并以纯 Markdown 模式运行；目录正文无法执行 MDX 表达式或导入。客户端导航时按需加载文章正文，但每篇文档也会提供完整 HTML，因此直接链接及禁用 JavaScript 的阅读均可正常使用。全文搜索会将静态索引加载到浏览器中；生产环境没有 `/api/search` 服务器。

## 构建与验证

```sh
node scripts/generate.mjs
npm run check
npm run build
npm run check:build
```

- `generate.mjs` 同步资源目录及可下载的编辑文件，不会覆盖 README。
- `npm run check` 验证源数据、公共源媒体及生成的编辑文件，不需要构建产物。
- `npm run build` 准备文档、检查 TypeScript、预渲染路由，并组装静态 `dist/` 目录。框架临时输出保留在 `.build/website/` 中，与私有 Studio 输出、导入包和暂存媒体分离。构建公共网站绝不能清空整个 `.build/` 目录。
- `npm run check:build` 还会检查部署后的文档和媒体、每篇渲染文章、内部链接和资产、静态搜索索引，以及真正的 404 页面。

要复现 GitHub Pages 子路径：

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
npm run preview
```

预览命令从构建后的网站读取基础路径，并输出正确的 URL。它只提供静态文件，不带 SPA 回退，比开发服务器更接近 GitHub Pages。 **旧的根目录 `file://` 预览不再生成，也不再受支持。** 请使用 `npm run preview` 预览生产版本。

### 浏览器测试

```sh
npx playwright install chromium
npm run test:web
```

测试针对构建后的静态产物，覆盖桌面与移动布局、筛选、已保存收藏、资源对话框、点击播放预览、启用及禁用 JavaScript 的文档导航、静态搜索、主题和 404 行为。拉取请求会在 CI 中运行这些检查。`test-results/` 和浏览器报告已被忽略。

### 私有发布包构建

`npm run site:build -- --input PACKAGE --out PRIVATE_OUTPUT --realm OPERATOR_REALM_FILE --base /GameMap/ --browser` 会验证已审阅的发布包，并在独立临时工作区中构建。它不会改变常规构建源、工作树的 `dist/` 或 Pages 工作流。使用 `npm run site:verify -- --input PRIVATE_OUTPUT` 验证最终完成的确切产物。领域文件是独立配置的运维预期，而不是受信任的发布发送方文件。本地夹具要求 `--development`，并明确仅限本地；预发布与生产环境要求不可变领域身份匹配、干净且精确的源码，以及浏览器门禁通过。有关生成指南审阅、来源所有权、产物证据及剩余部署门槛，请参阅[内容平台运维](content-platform.md)。这些命令不会上传或激活任何内容。

## 可选的低内存 Studio

除非运维人员显式设置 `CATALOG_MEDIA_PROFILE=low-memory`，否则 Studio 会保持现有上传策略。未知的配置档值会导致启动失败，而非静默回退。低内存策略：

- 每个新上传最多接受  **250 万像素** （包括 1920×1080），默认值则为 4000 万。两种配置档均保留 10 MB 编码及输出大小限制，以及 10,000 像素的尺寸限制。
- 在读取请求体之前， **每个进程/存储一次仅允许一个上传** 。额外的已认证上传会收到 `429 media_busy`、`Retry-After: 1`，并关闭连接；图片不会在内存中排队。认证、成员资格、Origin 和 CSRF 检查仍先于准入执行。
- 在 Studio 启动时禁用 Sharp 的进程级操作缓存，并使用一个原生图像处理线程。默认配置档不会改变这些原生设置。请运行一个 Studio 实例/存储；这不是分布式协调。
- 显式拒绝超大图片，不进行缩放、裁剪，也不改变其来源信息。被接受的上传保持相同的无损、自动定向、移除 EXIF 的 WebP 规范化处理。现有较大媒体仍可读取和导出，而不改写其字节。

已认证的 `/api/contracts` 响应包含 `mediaUpload`，即实际上传策略。即使浏览器未显示这些限制，服务端仍会强制执行。中止读取或解码、存储失败都会释放准入名额。

对于小型  **Linux/glibc**  运行环境，本地资源探测还使用以下 **启动前** 分配器、工作池和 V8 设置。请另行提供常规私有 Studio 配置及预构建 UI：

```sh
MALLOC_ARENA_MAX=2 UV_THREADPOOL_SIZE=1 CATALOG_MEDIA_PROFILE=low-memory \
  node --max-old-space-size=128 scripts/studio.mjs --production
```

这些设置仅适用于运行环境，不适用于依赖安装、构建或迁移。尤其要注意，将 `MALLOC_ARENA_MAX` 放入由 Node 的 `--env-file` 加载的文件，并不能建立已测试的启动前分配器环境。V8 堆设置 **不会** 限制原生图像内存或进程总内存。其他平台或分配器需要单独测量。

此策略 **不保证所有工作流都能在 512 MiB 主机上运行** 。资源探测仅为本地测试，不代表云服务商验收。大型 API 响应、验证、冻结/导出以及并发的非上传请求仍需要完整工作负载测量。使用免费套餐前，应验证实际主机架构、重启、持久卷容量、冷启动、配额、数据库/Auth 连接、备份恢复及中国大陆访问情况。测试或配额失败时，不要自动升级到付费套餐。HTTPS、私有持久存储、不可变发布身份以及独立发布批准仍是强制要求。

## 预发布准备（已禁用，仅限离线）

连接云项目之前，请参阅[预发布就绪性审查](staging-readiness.md)。`config/staging.example.json` 提出隔离的预览仓库、Supabase 项目和单实例持久化 Studio 主机方案，但发布器不会使用此文件。`npm run staging:check -- --config config/staging.example.json --out NEW_PRIVATE_DIRECTORY` 会写入私有的脱敏报告及机密值留空的 Studio 环境模板，不会读取凭据存储或发起网络请求。退出码 2 表示受阻或尚未就绪。不可变领域强制校验已在本地实现并测试，但真实云身份、托管适配器及运维验收仍未验证或受阻；填写占位符不能授权部署。

此准备过程不会更改默认 Git 提供方或 `.github/workflows/deploy-pages.yml`，也不会创建资源、提交、推送或部署。

## GitHub Pages 设置

仓库管理员、维护者，或拥有 Pages 管理权限的自定义角色必须：

1. 打开 **设置 → Pages** ，在 **构建与部署 → 来源** 下选择  **GitHub Actions** 。
2. 启用 Actions，并在 `github-pages` 环境中允许从 `main` 部署。
3. 推送或合并到 `main`，或在 `main` 上选择  **Actions → Deploy GameMap to GitHub Pages → 运行工作流** 。

只有启用 Pages 且部署成功后，该 URL 才会提供此网站。私有仓库需要支持 Pages 的套餐。启用 Pages 不会改变仓库可见性，但发布的网站可能可供公众访问。绝不能在公共资产中包含凭据或私有数据。

## 部署工作流

- `.github/workflows/catalog.yml` 在拉取请求上验证生成内容、以 `/GameMap/` 基础路径构建、检查静态输出，并测试桌面和移动交互。它不会发布。
- `.github/workflows/deploy-pages.yml` 在 `main` 上构建和验证，仅上传 `dist/`，并使用官方、固定到 SHA 的 Pages actions 发布。Pages/OIDC 写权限仅限部署作业。
- 发布构建从 Pages 元数据设置 `PAGES_BASE_PATH`。React Router 使用相同的 basename；构建收尾步骤会展平预渲染路由，避免发布目录嵌套在第二层 `GameMap/` 下。
- 所有应用和文档路由都会预渲染。初始路由发现信息已嵌入，因此客户端导航从不依赖服务端路由清单 API。未知路径会收到真正的 404 页面。

源代码、锁文件、编辑文件和原始媒体保留在版本控制中。构建产物、暂存文档副本和图片、缓存及本地机密均被忽略；参见[版本控制策略](contributing.md#what-belongs-in-git)。

网站内含本地 Inter 字体。上游依赖与字体的许可证文本收集在构建生成的 `THIRD-PARTY-NOTICES.txt` 文件中。外部创作者演示、项目页面和源码仓库仍需互联网访问。

有关仓库设置与故障排查，请参阅[官方 GitHub Pages 工作流指南](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
