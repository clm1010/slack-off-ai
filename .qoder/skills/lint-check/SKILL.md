---
name: lint-check
description: 检查代码规范、ESLint 规则、Prettier 格式化和项目最佳实践。在代码审查、提交前检查或用户询问代码质量时使用。
---

# 代码规范检查

## 快速检查命令

```bash
# ESLint 检查
pnpm lint

# Prettier 格式化（自动修复）
pnpm format

# Prettier 格式检查（只读）
pnpm prettier --check .

# 类型检查
npx tsc --noEmit
```

## 检查清单

### 1. ESLint 规则检查

- [ ] 无未使用的导入（unused-imports）
- [ ] 无 console.log（生产代码）- `no-console: warn`
- [ ] 正确的 import 顺序（import/order）
- [ ] JSX 可访问性（jsx-a11y）
- [ ] React Hooks 规则（react-hooks）
- [ ] 组件自闭合标签（react/self-closing-comp）
- [ ] Props 排序（react/jsx-sort-props）
- [ ] 语句间空行（padding-line-between-statements）

### 2. Prettier 格式检查

- [ ] 缩进使用 2 个空格
- [ ] 使用单引号
- [ ] 无尾随分号
- [ ] 最大行宽 100 字符

### 3. TypeScript 类型检查

- [ ] 无 any 类型滥用
- [ ] 组件 props 有明确类型定义
- [ ] 函数返回值类型清晰
- [ ] 无未使用的变量

### 4. Next.js 最佳实践

- [ ] 图片使用 next/image
- [ ] 链接使用 next/link
- [ ] 动态导入使用 next/dynamic
- [ ] API 路由有错误处理

### 5. React 最佳实践

- [ ] 组件使用函数式定义
- [ ] Props 使用解构赋值
- [ ] 事件处理函数有类型定义
- [ ] 使用 React.FC 或明确返回类型

### 6. Tailwind CSS 规范

- [ ] 使用语义化类名（如 bg-background）
- [ ] 避免任意值（如 w-[100px]）
- [ ] 响应式类名顺序正确（mobile-first）
- [ ] dark: 前缀使用正确

### 7. HeroUI 组件规范

- [ ] 使用 @heroui/* 官方组件
- [ ] 组件 props 类型定义完整
- [ ] 主题配置与 @heroui/theme 一致

## 项目特定配置

### ESLint 配置
- 使用 eslint.config.mjs（Flat Config）
- 包含 @typescript-eslint、react、react-hooks、jsx-a11y

### Prettier 配置
- 配置文件：.prettierrc
- 与 ESLint 集成（eslint-plugin-prettier）

### TypeScript 配置
- 严格模式启用
- 路径别名：@/* 映射到项目根目录

## 自动修复

```bash
# 自动修复 ESLint 问题
pnpm lint

# 自动格式化
pnpm format

# 仅检查不修复
pnpm eslint .
pnpm prettier --check .
```

## 提交前检查

项目已配置 lint-staged + husky，提交前会自动运行：
- eslint --fix
- prettier --write
