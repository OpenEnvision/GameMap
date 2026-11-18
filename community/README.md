# GameMap 社区：本地运行与权限边界

此版本先用于 `http://127.0.0.1:4191` 的真实本地验证；不需要 Railway 账号，也不会执行云部署。

## 能力

- 邮箱＋密码注册/登录、邮箱确认与免密登录链接。
- GitHub PKCE 接入：没有 OAuth 应用时入口明确禁用，不模拟登录。
- 每个用户每款游戏一份 1–5 星评分，可修改；卡片展示均分和人数，详情页讨论。
- 纯文本评论、作者删除、举报、审核员处理。
- 已验证邮箱用户提交资料、HTTPS 试玩/下载链接、可选源码和 1–5 张真实截图。
- 投稿先审核；批准后立即进入现有案例卡片列表，不修改或激活目录快照。

## 本地启用

先启动 Docker Desktop。现有数据库和发布文件必须保留，**不要使用 reset**。

```sh
npm run local:backup
node scripts/platform/community.mjs setup
# 如果本次修改了 supabase/config.toml，使用所属本地栈包装命令重载：
npm run local:stop
npm run local:start
node scripts/platform/community.mjs setup
# 4191 的服务应为以下入口，不应切回读取 Git-only dist 的普通 preview：
node scripts/platform/local-publication.mjs serve --port 4191
```

端口已占用时，先核对监听进程，不要启动第二个服务或结束不相关进程。公开页面须另用最新完整目录快照重新构建；setup 不负责构建、审核或激活目录。

- 邮件在本地 Mailpit 中捕获：`http://127.0.0.1:54324`。在发起注册/免密登录的**同一浏览器**中打开确认链接。
- 公开社区入口：`/zh/account/`、`/zh/submit/`。
- 私有 Studio：`http://127.0.0.1:5174`（原来的本地工作台）。具有 reviewer/admin 角色的后台账号可进入“社区审核”。
- 生成的 `.build/catalog-local/community.json` 含随机会话密钥和专用数据库登录，**不得提交、粘贴到聊天或放到公开目录**。
- 普通注册用户不会获得 `catalog.memberships`，也不能登录 Studio。自助注册不等于后台邀请。

## GitHub OAuth：需要你创建真实应用

1. 在 GitHub Settings → Developer settings → OAuth Apps 创建应用。
2. 本地 Homepage URL：`http://127.0.0.1:4191`。
3. Authorization callback URL：`http://127.0.0.1:54321/auth/v1/callback`。这是 **Supabase Auth** 回调，不是网站最终回调。不要启用 Device Flow。
4. 将 Client ID 和 Client Secret 自行写入根目录已忽略的私有 `.env`：

   ```dotenv
   GAMEMAP_GITHUB_CLIENT_ID=自行填写
   GAMEMAP_GITHUB_CLIENT_SECRET=自行填写
   ```

5. 修改 `supabase/config.toml` 中现有 GitHub 小节（不要重复添加小节）：

   ```toml
   [auth.external.github]
   enabled = true
   client_id = "env(GAMEMAP_GITHUB_CLIENT_ID)"
   secret = "env(GAMEMAP_GITHUB_CLIENT_SECRET)"
   ```

6. 让 CLI 子进程从私有环境读取配置，重载所属本地栈：

   ```sh
   node --env-file=.env scripts/platform/local-catalog.mjs stop
   node --env-file=.env scripts/platform/local-catalog.mjs start
   ```

7. 检查 `/api/community/config` 的 `github` 为 true，然后使用真实 GitHub 账号验证完整授权/回调。

网站最终回调是 `http://127.0.0.1:4191/auth/callback`，已加入本地 Auth redirect allowlist。它使用一次性 PKCE verifier 和浏览器绑定的状态 Cookie。不要用 token fragment、假用户或关闭验证的方式代替真正授权。

**没有 OAuth 凭据之前，只能验证接入代码、不可用状态和安全边界，不能宣称真实 GitHub 登录已验收。**

## 安全与数据

- 新增数据在独立 `community` schema，普通浏览器角色无原始表权限；普通 Auth JWT 也不能直接调用写入或上传登记 RPC。写入仅通过专用 BFF 角色，避免绕过图片规范化、同源校验和 HTTP 限流。
- 专用社区后端不能读取私有目录表；Studio 的审核仍要求其原有已验证会话、CSRF 和 reviewer/admin 资格。
- 访问/刷新令牌只保存在服务端加密会话中；浏览器仅收 HttpOnly Cookie 和 CSRF nonce。
- 写入校验精确 Origin、会话和 CSRF；评分、评论、举报、上传及投稿均有数量限制。
- 截图完整解码、移除 EXIF、转为内容寻址 WebP；不接受 SVG、HTML 或游戏二进制。
- 待审截图仅作者和审核员可读取。批准后可公开展示；投稿修改生成新版本，不直接覆盖已经批准的作品版本。作者可以撤下已公开作品，审核员也可记录原因后下架。
- 用户声明和评价不是平台独立试玩、AI 来源证明或版权认证。
- 每次目录发布变化后，从实际生效的完整快照更新可评价作品索引，不用 Git 缺省数据补齐业务行。

## 验证

```sh
npm run test:community
```

专项测试覆盖评分更新、评论和举报所有权、投稿版本审批、私有图片边界、普通用户与 Studio 权限隔离、服务端令牌与 PKCE。只读页面回归位于 `tests/release/community.spec.ts`；它使用明确标注的展示数据，不冒充真实登录验收。本地真实 Auth 和浏览器写入/审核验收证据保存在被忽略的 `.build/community-platform/`；其中测试账号文件含凭据，不能公开。

## 上线边界

本地验证不等于生产上线。正式使用仍需独立生产实例/realm、HTTPS 同源 API 代理、真正可投递的邮件服务、GitHub 正式回调、持久媒体存储与备份、反滥用与运营审核。仅上传静态 `dist/` 或仅部署 `supabase/` 目录不能运行完整社区。
