# GameMap 静态网页

`index.html` 是实际网站首页。根目录的普通文件只有 `index.html` 和 `readme.md`，运行文件按用途归类。

## 目录结构

- `assets/`：网页脚本、样式、字体、网站图标和第三方许可说明。
- `media/`、`brand/`、`logos/`：图片、视频与品牌素材。
- `data/`：页面导航数据、搜索索引、JSON 数据、BibTeX 和站点元信息。
- `tools/`：本地预览工具。
- `skills/`：可下载的技能文件。
- `resources/`、`examples/`、`docs/`、`papers/`、`agents/`、`research/`、`paths/`、`showcase/`、`testing/`、`explore/`、`zh/`、`404/`：各栏目和中英文页面。这些目录对应网页地址，请保留目录名和内部结构。

隐藏文件 `.nojekyll` 让 GitHub Pages 原样发布网站；`.gitignore` 用于忽略系统缓存。请保留它们。

## 本地预览

在本目录运行，无需 npm、构建工具或安装项目依赖：

```sh
python3 tools/preview.py
```

打开 <http://127.0.0.1:4173/GameMap/>。中文首页为 <http://127.0.0.1:4173/GameMap/zh/>。按 Ctrl+C 停止。

如端口已被占用，运行 `python3 tools/preview.py --port 4174`，并将网址中的端口改成 `4174`。预览器默认以本项目根目录为网站目录。

请通过预览服务器访问。直接双击 HTML 无法完整运行网页模块、搜索和页面导航。

## 部署到 GitHub Pages

将本目录完整上传到 `GameMap` 仓库，包括所有子目录和隐藏的 `.nojekyll`。在 Pages 设置中选择 `main` 分支和 `/(root)`。

网站入口为 <https://openenvision.github.io/GameMap/>，中文首页为 <https://openenvision.github.io/GameMap/zh/>。其他托管服务也需要将本目录挂载到 `/GameMap/`。网页地址不包含 `site/`。

现有页面均有独立的 `index.html`，可直接访问和刷新。GitHub Pages 对不存在的地址使用平台默认的 404 页面；本地预览使用 `404/` 内的自定义缺失页。`data/seo/` 保留 robots 和 sitemap 文件，站点地图地址为 `/GameMap/data/seo/sitemap.xml`。

## 维护说明

页面导航所需的 `.data` 文件统一位于 `data/`，保留原来的栏目层级；网页运行时已同步修改数据请求地址。两份搜索索引位于 `data/search-index.json` 和 `data/zh/search-index.json`。

`assets/licenses/THIRD-PARTY-NOTICES.txt` 保留第三方许可说明。论文列表和搜索结果中的论文标题直接打开原始论文或来源网站。

源码、依赖、测试、设计原稿和旧打包文件已另存到项目目录外的完整备份。如需重新生成网页，请使用备份中的开发项目；重新导出的文件也需要按本说明归类，并保留当前的数据请求地址适配。
