import { cn } from '@heroui/react'

/** 侧栏导航按钮（搜索、收藏、新建文档等） */
export const workspaceSidebarNavButtonClass = cn(
  'flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground',
  'hover:bg-[var(--ws-nav-active-bg)]/70'
)

/** 表单主提交（全宽，语义色随主题切换；对标划水设置弹窗） */
export const workspaceFormSubmitButtonClass = cn(
  'h-11 w-full cursor-pointer justify-center rounded-lg border-0 font-medium shadow-none ring-0',
  '!bg-foreground !text-background hover:opacity-90 pressed:opacity-90'
)

/** 主按钮（深浅色由 styles/workspace.css 变量驱动） */
export const workspacePrimaryButtonClass = cn(
  '!bg-[var(--ws-primary-bg)] !text-[var(--ws-primary-fg)] hover:!bg-[var(--ws-primary-hover)]',
  'shadow-none ring-0 border-0 rounded-lg pressed:opacity-90'
)

/** 搜索/表单单行：跟随 --field-* */
export const workspaceSearchInputClass = cn(
  '!bg-[var(--field-background)] !text-[var(--field-foreground)] border border-[var(--field-border)]',
  'rounded-lg shadow-none outline-none',
  'placeholder:!text-[var(--field-placeholder)]',
  'hover:border-[var(--muted)]',
  'focus-visible:border-[var(--foreground)] focus-visible:ring-1 focus-visible:ring-[var(--foreground)]/15'
)

/** 对标划水首页：HeroUI SearchField 容器（白底、h-10、rounded-md、细边框） */
export const workspaceSearchFieldGroupClass = cn(
  'h-10 rounded-md shadow-none',
  '!bg-[var(--field-background)] border border-[var(--field-border)]',
  'hover:border-[var(--muted)]',
  'data-[focus-within=true]:border-[var(--field-border)]',
  'data-[focus-within=true]:ring-2 data-[focus-within=true]:ring-[var(--focus)]/20',
  'data-[focus-within=true]:ring-offset-2 data-[focus-within=true]:ring-offset-[var(--background)]'
)

/** SearchField 左侧图标：内嵌于输入框，无独立底色区 */
export const workspaceSearchFieldIconClass = 'text-muted'

export const workspaceAiTextAreaClass = cn(
  '!bg-[var(--field-background)] !text-[var(--field-foreground)] border border-[var(--field-border)] rounded-lg shadow-none',
  'placeholder:!text-[var(--field-placeholder)]',
  'focus-visible:border-[var(--foreground)] focus-visible:ring-1 focus-visible:ring-[var(--separator)]'
)

/** 销毁操作（回收站表格内） */
export const workspaceDangerButtonClass = cn(
  '!bg-[var(--danger)] !text-[var(--danger-foreground)] hover:opacity-90 rounded-md text-xs px-2 py-1'
)

/** 次级按钮（恢复） */
export const workspaceGhostButtonClass = cn(
  'rounded-md border border-[var(--separator)] bg-[var(--surface-secondary)] text-xs px-2 py-1 text-[var(--foreground)] hover:bg-[var(--surface-tertiary)]'
)
