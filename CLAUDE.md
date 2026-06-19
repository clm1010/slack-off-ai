# CLAUDE.md

摸鱼AI（slack-off-ai）—— 基于 Next.js 16 的前端项目。

## 仓库结构

- 仓库根目录只是容器，**实际代码全部在 `slack-frontend/`**。
- 所有命令都要在 `slack-frontend/` 目录下执行，不要在根目录跑。

## 命令（在 `slack-frontend/` 下执行）

```bash
pnpm install      # 安装依赖（用 pnpm，不要用 npm / yarn）
pnpm dev          # 本地开发（next dev --turbopack）
pnpm build        # 构建
pnpm start        # 生产启动
pnpm lint         # eslint --fix
pnpm format       # prettier --write .
pnpm commit       # 提交代码：走 commitizen 交互式规范（见下）
```

## 技术栈

- **Next.js 16**（App Router）、**React 19**、**TypeScript**
- **HeroUI v3**（`@heroui/react` 3.x）—— 注意是 v3，写法与 v2 差异较大
- **Tailwind CSS 4**（通过 `@tailwindcss/postcss`）
- **next-intl** 国际化、`@teispace/next-themes` 主题切换

## 关键约定

- **i18n / 路由**：使用 `app/[locale]/` 动态段，支持中英文切换；文案在 `messages/en.json`、`messages/zh.json`，路由配置在 `i18n/routing.ts`。
- **提交规范**：用 `pnpm commit`（commitizen + `.cz-config.cjs`），commitlint 会校验，不要直接 `git commit -m` 随意写。
- **品牌 / SEO**：站点名称与 SEO 文案集中在 `config/site.ts`（默认「摸鱼AI」）；工作台 Logo 字标在 `components/workspace/brand-mark.tsx`。
- **Git hooks**：由 husky 管理，`pnpm install` 时通过 `scripts/setup-git-hooks.mjs` 自动配置。

## 目录速览（`slack-frontend/`）

- `app/[locale]/(marketing)/` —— 营销页（首页、about、blog、docs、pricing）
- `app/[locale]/(workspace)/` —— 工作台（home、work/[documentId]）
- `components/workspace/` —— 工作台 UI 组件
- `config/` —— 站点配置（`site.ts`）、字体（`fonts.ts`）
- `lib/` —— 工具（`workspace-mock.ts` 提供 Mock 数据、`metadata-alternates.ts`、`site-url.ts`）
- `messages/` —— i18n 文案；`i18n/` —— 路由与配置
- `styles/` —— 全局样式（含 `workspace.css`）

> 当前为 Mock 阶段，后端尚未接入；工作台数据来自 `lib/workspace-mock.ts`。
