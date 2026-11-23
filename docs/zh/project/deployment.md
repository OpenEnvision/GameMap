# 网站开发与部署

GameMap 使用 **Fumadocs、React Router、React、TypeScript 和 Vite** 。发布目标为 [GitHub Pages](https://openenvision.org/GameMap/)。生产环境仅包含静态 HTML、CSS、JavaScript、媒体及浏览器端搜索索引，并可选开启零服务器 Supabase 直连社区功能。

## 本地开发

使用 Node.js 22.22 或更新版本：

```sh
npm ci
npm run dev
```

`npm run dev` 会生成派生目录文件、准备 Markdown 文档、监听源文件变更，并启动本地 React Router 开发服务器。

打开 React Router 输出的 URL。主要路由包括：

- `/` — 概览与精选游戏示例。
- `/resources/` — 可搜索、可筛选的资源及浏览器本地收藏。
- `/examples/` — 附有创作者证据和项目源码的可玩游戏。
- `/testing/` — 项目、环境、资产及动作数据参考资料。
- `/docs/` — 渲染后的指南、研究笔记及来源署名。

应用位于 `website/app/`。结构化目录数据位于 `data/segments/` 和 `website/src/data/`；公共源资产保留在 `website/public/` 中。

## 文档与内部链接

`docs/` 下的 Markdown（包括 `docs/reference/catalog.md`）以及 `README.md` 和 `CONTRIBUTING.md`，都会在构建时渲染；文件夹索引 `docs/README.md` 和 `docs/zh/README.md` 仅供在代码仓库中阅读。文章包含导航、目录、代码高亮、标题链接和全文搜索。

`scripts/build/prepare-docs.mjs` 会在 `website/.content/` 中创建可丢弃的副本。它会推导标题、将内部 Markdown 链接改写为文档路由，并将本地文档图片暂存到被忽略的 `website/public/docs-assets/` 目录。原始研究文本不会被改写。`website/docs.config.json` 控制导航分组和短标签；未分组文章仍可在“更多笔记”下访问。

文档源使用 Fumadocs MDX 的 Vite 集成，并以纯 Markdown 模式运行；目录正文无法执行 MDX 表达式或导入。客户端导航时按需加载文章正文，但每篇文档也会提供完整 HTML，因此直接链接及禁用 JavaScript 的阅读均可正常使用。全文搜索会将静态索引加载到浏览器中；生产环境没有 `/api/search` 服务器。

## 构建与验证

```sh
node scripts/build/generate.mjs
npm run check
npm run build
npm run check:build
```

- `generate.mjs` 同步资源目录及可下载的编辑文件，不会覆盖 README。
- `npm run check` 验证源数据、公共源媒体、双语译文与代码格式，不需要构建产物。
- `npm run build` 准备文档、检查 TypeScript、预渲染路由，并组装静态 `dist/` 目录。
- `npm run check:build` 检查部署后的文档和媒体、每篇渲染文章、内部链接和资产、静态搜索索引，以及真正的 404 页面。

要在本地复现 GitHub Pages 子路径：

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
npm run preview
```

预览命令从构建后的网站读取基础路径，并输出正确的 URL。它只提供静态文件，不带 SPA 回退，比开发服务器更接近 GitHub Pages。

## Supabase 直连社区模式

GameMap 支持通过 Supabase Cloud 在静态站点中直接启用零服务器社区互动（邮箱/GitHub 登录、评分、评论、举报、截图投稿与浏览器端审核）。

- 运行 `npm run community:direct-sql -- --with-games --out .build/setup.sql`，基于 `supabase/direct-mode/enable-supabase-direct.sql` 生成可直接执行的 SQL。
- 构建时设置 `VITE_GAMEMAP_COMMUNITY=1`、`VITE_GAMEMAP_COMMUNITY_MODE=supabase-direct`、`VITE_SUPABASE_URL` 与 `VITE_SUPABASE_PUBLISHABLE_KEY`，或在 GitHub Actions 仓库变量中配置 `GAMEMAP_SUPABASE_URL` 和 `GAMEMAP_SUPABASE_PUBLISHABLE_KEY`。

## GitHub Pages 设置

仓库管理员、维护者，或拥有 Pages 管理权限的自定义角色必须：

1. 打开 **设置 → Pages** ，在 **构建与部署 → 来源** 下选择 **GitHub Actions** 。
2. 启用 Actions，并在 `github-pages` 环境中允许从 `main` 部署。
3. 推送或合并到 `main`，或在 `main` 上选择 **Actions → Deploy GameMap to GitHub Pages → 运行工作流** 。

只有启用 Pages 且部署成功后，该 URL 才会提供此网站。绝不能在公共资产中包含凭据或私有数据。

## 部署工作流

- `.github/workflows/catalog.yml` 在拉取请求上验证生成内容、运行 `npm run check`、以 `/GameMap/` 基础路径构建并运行 `npm run check:build`。它不会发布。
- `.github/workflows/deploy-pages.yml` 在 `main` 上以 Supabase 直连社区模式构建和验证，仅上传 `dist/`，并使用官方、固定到 SHA 的 Pages actions 发布。Pages/OIDC 写权限仅限部署作业。
- 发布构建从 Pages 元数据设置 `PAGES_BASE_PATH`。React Router 使用相同的 basename；构建收尾步骤会展平预渲染路由，避免发布目录嵌套在第二层 `GameMap/` 下。
- 所有应用和文档路由都会预渲染。初始路由发现信息已嵌入，因此客户端导航从不依赖服务端路由清单 API。未知路径会收到真正的 404 页面。

源代码、锁文件、编辑文件和原始媒体保留在版本控制中。构建产物、暂存文档副本和图片、缓存及本地机密均被忽略；参见[版本控制策略](../contributing.md#what-belongs-in-git)。

网站内含本地 Inter 字体。上游依赖与字体的许可证文本收集在构建生成的 `THIRD-PARTY-NOTICES.txt` 文件中。外部创作者演示、项目页面和源码仓库仍需互联网访问。

有关仓库设置与故障排查，请参阅[官方 GitHub Pages 工作流指南](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
