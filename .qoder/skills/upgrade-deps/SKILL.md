---
name: upgrade-deps
description: 安全升级前端项目依赖，包括 Next.js、React、Tailwind CSS 等。在执行依赖升级、版本更新、npm/pnpm install 相关操作时使用。
---

# 依赖升级助手

## 升级前检查清单

- [ ] 确认当前依赖版本
- [ ] 检查最新稳定版本（使用 npm registry）
- [ ] 备份项目（git commit）
- [ ] 查看官方升级指南和 breaking changes

## 升级流程

### 1. 备份项目

```bash
git add .
git commit -m "chore: backup before upgrading dependencies"
```

### 2. 查询最新版本

使用 npm registry 确认最新稳定版：
```bash
npm view <package-name> version
npm view <package-name> versions --json
```

### 3. 更新 package.json

修改目标依赖版本号，遵循以下优先级：
1. 核心框架（next, react, react-dom）
2. UI 库（@heroui/*）
3. 样式工具（tailwindcss, @tailwindcss/postcss）
4. 开发工具（eslint, prettier, typescript）

### 4. 安装依赖

```bash
pnpm install
# 或
npm install
```

### 5. 验证升级

```bash
# 类型检查
pnpm type-check

# 构建测试
pnpm build

# 开发服务器测试
pnpm dev
```

## 常见依赖升级注意事项

### Next.js 升级
- 检查 Turbopack 兼容性
- 验证 middleware 是否需要调整
- 检查 next.config.js 配置项

### React 升级
- 确认 @types/react 版本匹配
- 检查 Suspense 和 Server Components 变更

### Tailwind CSS 升级
- 同步升级 @tailwindcss/postcss
- 检查 CSS 导入语法（@import 'tailwindcss'）
- 验证 tailwind.config.js 配置

### HeroUI 升级
- 检查 @heroui/theme 兼容性
- 验证组件 API 是否有 breaking changes

## 回滚方案

如果升级失败：
```bash
git reset --hard HEAD~1
pnpm install
```

## 项目特定配置

本项目技术栈：
- Next.js 16.x + React 19.x
- Tailwind CSS 4.x + @tailwindcss/postcss
- HeroUI 2.x (@heroui/theme 2.4.26)
- TypeScript 5.x
- pnpm 包管理器
