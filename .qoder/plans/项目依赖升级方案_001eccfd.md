# 项目依赖升级方案

## 升级目标

| 依赖 | 原版本 | 目标版本 | 状态 |
|------|--------|----------|------|
| next | 15.5.9 | 16.1.6 | 已完成 |
| tailwindcss | 4.1.11 | 4.2.1 | 已完成 |
| @tailwindcss/postcss | 4.1.11 | 4.2.1 | 已完成 |

## 升级前分析

### 版本差异

**Next.js 15.5.9 → 16.1.6**
- Turbopack 稳定版，构建速度提升
- 新增缓存 API（updateTag, refresh, revalidateTag）
- React 19.2 完全兼容

**Tailwind CSS 4.1.11 → 4.2.1**
- 新增 text-shadow 工具类
- 新增 mask 工具类
- 向后兼容，无 breaking changes

### 兼容性评估

| 项目 | 风险等级 | 说明 |
|------|----------|------|
| React 19.2.3 | 🟢 低 | 当前已是最新 |
| HeroUI 2.4.26 | 🟢 低 | 完全支持 Tailwind v4 |
| Turbopack | 🟡 中 | 需验证缓存 |

## 执行步骤

### 1. 备份项目
```bash
git add .
git commit -m "chore: backup before upgrading dependencies"
```

### 2. 更新 package.json
- 第 68 行：`"next": "16.1.6"`
- 第 79 行：`"@tailwindcss/postcss": "4.2.1"`
- 第 102 行：`"tailwindcss": "4.2.1"`

### 3. 安装依赖
```bash
pnpm install
```

### 4. 验证构建
```bash
pnpm build
```

### 5. 启动开发服务器
```bash
pnpm dev
```

## 验证结果

- ✅ 构建成功，无错误
- ✅ 开发服务器启动正常（1036ms）
- ✅ Turbopack 运行正常
- ✅ 所有页面渲染正常

## 注意事项

1. Next.js 16.2.0 尚未发布正式版，使用 16.1.6
2. 构建时有警告：建议添加 `"type": "module"` 到 package.json
3. 当前所有依赖已是最新版本

## 回滚方案

如需回滚：
```bash
git reset --hard HEAD~1
pnpm install
```
