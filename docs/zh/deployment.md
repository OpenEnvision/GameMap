# 在本地运行和发布 GameMap

GameMap 是静态网站。浏览资料、筛选论文和使用搜索，不需要应用后端或 API Key。

## 最外层的 index.html

仓库根目录的 `index.html` 本身就是完整、预渲染的 GameMap 主页，与 **`dist/index.html`** 内容一致。它直接包含主页内容和布局，不会跳转到本地开发地址或另一个网站。

`npm run build` 先构建 `dist/`，再自动把完整静态网站导出到仓库最外层，包括首页、所有页面、脚本、样式、媒体、路由数据和搜索索引。这些根目录静态产物需要与源码一起提交，不能只上传 `index.html`。

GitHub Pages 默认使用 **Deploy from a branch → main → /(root)**，直接发布仓库根目录的网站。保留 `.nojekyll`，让 Pages 按静态文件提供页面。`.gamemap-static.json` 记录生成文件及其哈希，帮助安全更新导出内容；`CONTRIBUTING.md` 保留为源文档。`docs/` 中的源 Markdown 与生成页面可以共存，根目录的生成 Markdown 下载文件不会再次被当成源文档。

直接打开文件可以查看预渲染页面；完整的路由、搜索、筛选和浏览器模块行为，请通过 HTTP 预览或正式 Pages 地址验证。文件预览不需要启动开发服务，也不会自动前往开发地址。

## 开发预览

安装 Node.js 22.22 或更新的受支持版本，在仓库目录运行：

```sh
npm ci
npm run dev
```

开发地址为 `http://127.0.0.1:5177/`。开发服务固定使用 5177 端口；端口被占用时会停止启动，不会自动换到其他端口。可以先停止占用端口的服务，或显式指定其他端口：

```sh
npm run dev -- --port 5178
```

使用自定义端口时，请打开终端打印的地址。根目录静态网站显示上一次生产构建的内容；修改源码后重新构建，才会更新它。

开发模式会监听原始文档、数据和内容定义，更新生成副本。资源源文件位于 `data/segments/`，论文源文件是 `data/papers.json`，案例数据位于 `website/src/data/`。修改源文件后保存即可，不直接编辑 `website/.content/`。

## 生成与检查

以下命令同步论文导出和 awesome list，生成适用于 `/GameMap/` 子路径的完整网站，并自动导出到根目录：

```sh
npm run sync:papers
node scripts/generate.mjs
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check
npm run check:build
npm run check:release
npm run preview
```

`npm run preview` 默认提供仓库根目录的静态网站。打开它打印的地址，包括 `/GameMap/` 前缀，可以检查页面、搜索、筛选和路由。若要查看构建暂存副本，运行 `npm run preview -- --root dist`。生产预览读取上一次构建结果；修改或拉取资料后，要重新构建。

`npm run check` 检查源数据、媒体、生成文档和根目录网站完整性，不要求保留 `dist/`。`check:build` 检查 `dist/` 的渲染内容、内部链接和资源，并检查根导出完整性；`check:release` 同时检查根目录和 `dist/` 的发布结构。

如需把已构建的 `dist/` 再次同步到根目录，可在构建后运行 `npm run generate:entry`。它只同步现有构建，不编译源码更新，不应放在更新源文件后的构建之前。

浏览器交互检查可另外运行：

```sh
npx playwright install chromium
npm run test:web
```

需要完整发布压缩包时，在构建并检查后运行：

```sh
npm run package:pages
```

输出为 `release/GameMap-pages.zip`。压缩包最外层直接是完整站的 `index.html`、`404.html`、资源和页面目录，没有再套一层 `dist/`。它保留本次构建的路径前缀；更换部署路径后先重新构建再打包。`release/` 和压缩包属于临时产物，不提交到源代码仓库。默认的分支发布使用已提交的根目录静态网站；可选 Actions 直接上传 `dist/`，两种方式都不依赖压缩包。

## 上传 GitHub 并发布

预期发布地址是 [OpenEnvision 的 GameMap](https://openenvision.github.io/GameMap/)。若使用这个地址，需要在 **OpenEnvision** 下创建名为 **GameMap** 的仓库，并将项目源文件上传或提交到 `main` 分支。若文件夹是下载得到的副本，它本身不代表已有 Git 仓库或已成功部署。

先完成 `/GameMap/` 路径的构建和检查，再通过 Git 客户端或 GitHub Desktop 提交，让 `.gitignore` 排除依赖和临时产物。提交时保留完整根目录静态网站，包括 `index.html`、`.nojekyll`、`.gamemap-static.json`、资源、媒体、页面目录、路由数据、搜索索引和下载文件。同时保留源码、文档、`README.md`、`AWESOME.md`、`package-lock.json` 和隐藏的 `.github/workflows/`。不要上传 `node_modules/`、`dist/`、`release/`、缓存或本地密钥。网页上传可能遗漏隐藏目录，也受文件大小和数量限制。

仓库管理员或具备 Pages 管理权限的人完成以下设置：

1. 打开 **Settings → Pages**，将 **Build and deployment → Source** 设为 **Deploy from a branch**。
2. 选择分支 **main**、文件夹 **/(root)**，保存。
3. 每次更新后，将完成构建并通过检查的完整根目录静态网站提交或合并到 `main`。
4. 等待 Pages 部署成功，打开 Pages 设置显示的网址。目标仓库对应 `https://openenvision.github.io/GameMap/`。

若希望改用自动重新构建的可选部署工作流，将 Pages 来源切换为 **GitHub Actions**。在仓库 Actions 变量中设置 `PAGES_USE_ACTIONS=true` 后，推送到 `main` 才会触发该工作流；也可以通过 **Actions → Deploy GameMap to GitHub Pages → Run workflow** 在 `main` 手动运行。若 `github-pages` 环境设置了分支规则，允许它从 `main` 部署。该工作流按 Pages 元数据构建，并将整个 `dist/` 交给 Pages。

PR 工作流检查源产物、根静态网站、构建和桌面/手机交互，不发布网站。实际部署状态以 Pages 或对应工作流结果为准；账户方案和仓库权限可能影响 Pages 的可用性。

## 更换仓库或使用自定义域名

`PAGES_BASE_PATH` 决定路径前缀：项目仓库通常为 `/仓库名/`，用户/组织主页或自定义域名根路径通常为 `/`。更换目标路径后，使用对应前缀重新构建并提交根静态网站。可选 Actions 工作流从 Pages 元数据读取这个值，传给 Vite 和 React Router；根目录和 `dist/` 的 `index.html` 都位于各自发布树的最外层。

网站的规范域名在 **`website/content/site.ts`** 的 `siteOrigin` 中声明。目前是 `https://openenvision.github.io`。更换 GitHub 用户、组织或域名时，将它改成真实 HTTPS 域名，然后重建。仓库地址变化时，也更新 README、`scripts/catalog.mjs` 中的官网链接，以及 `website/app/routes/docs.tsx`、`website/content/fields.ts`、`scripts/repository-research.mjs` 中指向源代码仓库的链接；这些地址不会随路径前缀自动变化。

自定义域名需要在 Pages 设置中配置，并按域名类型添加 DNS 记录。若希望在构建产物中保留 `CNAME`，将文件放在 `website/public/CNAME`。具体设置见 [GitHub 自定义域名说明（English）](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)。

原游戏、媒体、源码、模型和数据仍遵循各自许可。构建产物中的 `THIRD-PARTY-NOTICES.txt` 保留依赖和字体的许可文本；访问外部项目和 Demo 仍需要网络。

更完整的维护说明见[英文部署指南（English）](../deployment.md)，Git 版本管理约定见[贡献指南（English）](../../CONTRIBUTING.md#what-belongs-in-git)。
