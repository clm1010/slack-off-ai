/** 从用户名生成 Avatar 回退缩写（1–2 个字符） */
export function userInitials(name?: string | null): string {
  const trimmed = name?.trim()

  if (!trimmed) return '?'

  const parts = trimmed.split(/\s+/).filter(Boolean)

  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()

  return `${parts[0]![0] ?? ''}${parts[parts.length - 1]![0] ?? ''}`.toUpperCase()
}
