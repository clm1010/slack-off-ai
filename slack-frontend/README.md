# 摸鱼AI · 前端（moyu-ai-frontend）

基于 **Next.js 16（App Router）** 与 **HeroUI v3** 的全栈前端：营销中心 + 工作台 UI（Mock 阶段可对接后端）。

## 前置要求

| 工具           | 用途                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| Node.js 20+    | 运行 Next.js                                                            |
| pnpm           | 包管理（不要用 npm / yarn）                                             |
| Docker Desktop | 本地 Postgres + Redis（`pnpm db:up`）                                   |
| cloudflared    | 将本地服务暴露到 `dev.moyuai.cc`（OAuth / magic link 等需要公网回调时） |

## 首次配置

在**本目录**（仓库中的 `slack-frontend` 文件夹）执行：

```bash
pnpm install
cp .env.example .env.local   # Windows 可用 copy .env.example .env.local
```

编辑 `.env.local`，至少配置：

- `AUTH_SECRET` — 生成：`openssl rand -base64 32`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — 若需 GitHub 登录
- 使用 Cloudflare 隧道时，将 `NEXT_PUBLIC_APP_URL`、`NEXTAUTH_URL`、`AUTH_URL` 改为 `https://dev.moyuai.cc`（无尾部斜杠）

首次启动数据库后执行迁移（仅需一次）：

```bash
pnpm db:up
pnpm db:migrate
```

## 日常启动

以下命令均在 `slack-frontend` 目录下执行。完整本地开发通常需要 **3 个终端**。

### 终端 1 — 数据库

```bash
pnpm db:up
```

启动 Postgres（`:5432`）与 Redis（`:6379`）。停止：`pnpm db:down`。

### 终端 2 — 前端开发服务器

```bash
pnpm dev
```

默认监听 `http://localhost:3000`（Turbopack）。脚本会自动修正代理环境下的局域网 IP 显示。

### 终端 3 — Cloudflare 隧道（公网访问）

本地 Next 已启动后，另开终端运行：

```bash
cloudflared tunnel run moyuai-dev
```

隧道会将 `https://dev.moyuai.cc` 转发到本机 `:3000`。需已在本机登录 Cloudflare（`cloudflared tunnel login`）并完成 `moyuai-dev` 隧道配置。

**使用隧道时的注意项：**

- `.env.local` 中 URL 相关变量须与公网域名一致（见上文「首次配置」）
- GitHub OAuth App 的 Homepage URL 填 `https://dev.moyuai.cc`，Callback URL 填 `https://dev.moyuai.cc/api/auth/callback/github`
- 若 Next 报跨域 / Origin 警告，在 `.env.local` 增加：`ALLOWED_DEV_ORIGINS=https://dev.moyuai.cc,http://localhost:3000`

### 访问地址

| 场景         | 地址                                     |
| ------------ | ---------------------------------------- |
| 仅本机       | http://localhost:3000                    |
| 局域网       | 终端 2 中 `pnpm dev` 打印的 Network 地址 |
| 公网（隧道） | https://dev.moyuai.cc                    |

## 常用命令

```bash
pnpm dev          # 开发服务器
pnpm build        # 生产构建
pnpm start        # 生产启动（需先 build）
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm db:up        # 启动 Postgres + Redis
pnpm db:migrate   # 数据库迁移
pnpm commit       # 规范提交（commitizen）
```

## 技术栈

- Next.js 16、React 19、Tailwind CSS 4、HeroUI v3、next-themes、TypeScript

## 品牌配置

站点名称与 SEO 文案集中在 `config/site.ts`（默认 `摸鱼AI`）。工作台 Logo 文案在 `components/workspace/brand-mark.tsx`（`摸鱼` + `AI` 字标）。
