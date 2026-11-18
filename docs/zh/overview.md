# GameMap

**Tencent IEG · AI 游戏开发**

一份用于借助 AI 构建游戏的工具、可玩项目与生产知识实践地图。

[网站](https://openenvision.github.io/GameMap/) · [资源目录](reference/catalog.md) · [文档](guides/practical-guide.md) · [中文指南](guides/reading-guide.md) · [贡献指南](contributing.md)

## 探索

- **[工具与引擎](reference/catalog.md)** ——编码智能体、引擎集成、资产管线和世界模型。
- **[游戏与工作流](tutorials-and-demos.md)** ——可玩示例、创作者构建历程和项目源码。
- **[生产与测试](production/overview.md)** ——实用接口、评估方法和证据边界。
- **[关卡设计](guides/level-design.md)** ——包含参考资料和可复用模板的完整技能包。

## 开发

```sh
npm ci
npm run dev
```

文档和目录变更会自动刷新。网站是静态的，使用 Fumadocs、React Router、TypeScript 和 Vite 构建；无需应用后端或 API 密钥。

生产构建和 GitHub Pages 配置见[开发与部署](project/deployment.md)。

## 私有内容 Studio

[内容平台](project/content-platform.md)包含类型化编辑表单、可信验证器、修订/翻译审阅、受保护的媒体上传和不可变发布导出。

```sh
# Start Docker Desktop first. These wrappers never connect to a cloud project.
npm run local:start
npm run local:setup
npm run studio:dev
```

本地账户密码保存在被忽略的 `.build/catalog-local/access.json` 中；设置过程会将内容以草稿形式导入，并写入包含受限数据库登录信息的私有 `.env`。`npm run test:local` 使用明确的本地测试批准，而非生产编辑决策，测试真实的 Supabase Auth/PostgREST/PostgreSQL 以及独立的恢复探针。`npm run local:stop` 会停止服务，同时保留数据。

Studio 与公共网站分开运行。未配置时，它显示设置说明，而非演示登录入口。服务器凭据和 Auth 令牌绝不会进入浏览器构建包。生产 TLS、受限数据库凭据、持久化媒体和可移植导出见该指南。

公共网站 **尚未切换到数据库发布** 。在切换门槛通过之前，Git 仍是其默认来源；Studio 从不部署或激活发布。已审阅的包已经可以通过隔离的 `site:build` / `site:verify` 路径构建，包括仅存在于数据库中的记录和上传媒体，而不改变检出目录的 `dist/`。现有 Pages 工作流仅发布 `dist/`，不发布私有 Studio 或私有快照产物。

## 增量收集游戏

Examples 同时收录普通游戏与有证据支持的 AI 辅助项目。Game Jam 条目需要真实游戏源码、作者提供的可玩或可下载发布链接，以及一手来源证据；源码可见不等于获得复用授权。优先选择 Godot 4 / 2D 项目，但不设为强制要求。

```sh
# Import bounded research reports; re-running preserves existing reviewed games.
npm run examples:import -- --reports /path/to/reviewed-json-reports
npm run test:examples:import
```

`data/segments/jam-games.json` 保留已收录记录、待核实候选、来源摘录、版本和许可不确定性，以及去重决定。同一份记录以 `website/public/jam-discovery.json` 公开发布；`website/src/data/jamGames.ts` 由它生成。导入要求明确的 `accepted` 证据：候选不会自动转为收录项，也未安装后台调度任务。来源审阅**不代表**满足论文的代码量阈值、通过编译、稳定运行三十秒或经过独立试玩。没有截图时明确标注，不伪造图片。现有 AI 工作流指南仍是更广泛 Examples 目录中聚焦 AI 的子集。

不要求游戏必须能在浏览器中运行：作者发布的桌面构建或明确提供的 Steam 演示版可以使用 `download`，并应区分免费演示版与付费完整版。`/releases` 限制只针对 GitHub 托管的下载网址，不排除 itch.io 或官方游戏下载页。仓库根目录、源码归档和视频不等于游戏构建。

## 来源与复用

原始项目和媒体保留各自的权利。收录不代表背书，也不表示已独立复现。

随附的关卡设计改编内容采用  **CC BY-NC-SA 4.0** ，带有非商业使用和相同方式共享条件。复用前请阅读其[署名与许可证](skills/level-design/LICENSE.md)。
