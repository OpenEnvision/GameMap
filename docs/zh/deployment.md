# 在本地运行 GameMap

GameMap 是一个静态网站。阅读资料、浏览资源和使用搜索，不需要应用后端或 API Key。

## 开发预览

安装 Node.js 22.22 或更新的受支持版本，在仓库目录运行：

```sh
npm ci
npm run dev
```

终端会打印本地地址。需要固定端口时：

```sh
npm run dev -- --port 5174 --strictPort
```

开发模式会监听原始文档、数据分段与内容定义，更新生成副本。修改源文件后保存即可，不需要直接编辑 `website/.content/`。

## 验证生产构建

部署到 GitHub 仓库子路径时：

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
npm run preview
```

打开预览命令打印的地址，包括 `/GameMap/` 前缀。生产预览读取的是上一次构建结果；拉取新资料后，要重新构建才能看到更新。

## 部署与权限

GitHub Pages 由仓库的工作流发布。仓库管理员需要启用 Pages，并将来源设为 GitHub Actions。私有仓库是否能够发布，还取决于账户方案和权限。

部署状态以 GitHub Actions 中 Pages 工作流的结果为准。本地预览地址用于开发检查。

更完整的维护步骤见[英文部署说明](../deployment.md)。
