import { cn } from '@heroui/react'

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
