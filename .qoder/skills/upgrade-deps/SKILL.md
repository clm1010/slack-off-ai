---
name: upgrade-deps
description: 安全升级前端项目依赖，包括 Next.js、React、Tailwind CSS 等。在执行依赖升级、版本更新、npm/pnpm install 相关操作时使用。
---

# 依赖升级助手

## 升级前检查清单

- [ ] 确认当前依赖版本（查看 package.json）
- [ ] 检查最新稳定版本（使用 npm registry 动态查询）
- [ ] 备份项目（git commit）
- [ ] 查看官方升级指南和 breaking changes

## 升级流程

### 1. 备份项目

项目已配置 Commitizen (git-cz)，使用规范提交：

```bash
git add .
pnpm commit
# 选择类型: chore
# 填写描述: backup before upgrading dependencies
```

> 如需快速提交，也可使用普通 commit：
> ```bash
> git commit -m "chore: backup before upgrading dependencies"
> ```

### 2. 查询最新版本

使用 npm registry 动态查询最新稳定版（逐个查询）：
```bash
# 核心框架
npm view next version
npm view react version
npm view react-dom version

# UI 库
npm view @heroui/theme version

# 样式工具
npm view tailwindcss version
npm view @tailwindcss/postcss version

# 开发工具
npm view typescript version
npm view eslint version
npm view prettier version
```

> ⚠️ 注意：npm view 不支持多包同时查询，需逐个执行

### 3. 更新 package.json

修改目标依赖版本号，遵循以下优先级：
1. 核心框架（next, react, react-dom）
2. UI 库（@heroui/*）
3. 样式工具（tailwindcss, @tailwindcss/postcss）
4. 开发工具（eslint, prettier, typescript）

### 4. 清理缓存并安装依赖

```bash
# 清理 Next.js 缓存（重要！避免 Turbopack 缓存问题）
rm -rf .next

# 安装依赖
pnpm install
```

### 5. 验证升级

```bash
# 类型检查
npx tsc --noEmit

# 构建测试
pnpm build

# 开发服务器测试
pnpm dev
```

### 6. 验证清单

- [ ] 构建成功无错误
- [ ] 开发服务器启动正常
- [ ] Turbopack 运行正常
- [ ] 所有页面渲染正常
- [ ] HeroUI 组件样式正常
- [ ] 暗色模式切换正常

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
rm -rf .next node_modules
pnpm install
```

## 项目技术栈参考

当前项目使用的技术栈（执行时请以实际查询版本为准）：
- Next.js 16.x + React 19.x
- Tailwind CSS 4.x + @tailwindcss/postcss
- HeroUI 2.x (@heroui/theme)
- TypeScript 5.x
- pnpm 包管理器

## 升级优先级建议

1. **核心框架**（next, react, react-dom）- 影响最大，需优先验证
2. **UI 库**（@heroui/*）- 检查主题兼容性
3. **样式工具**（tailwindcss, @tailwindcss/postcss）- 需同步升级
4. **开发工具**（eslint, prettier, typescript）- 风险较低
