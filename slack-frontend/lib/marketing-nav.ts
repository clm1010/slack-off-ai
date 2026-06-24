/** 使用首页式简洁顶栏（Logo + 主题 + 语言）的营销页路径 */
export const MINIMAL_MARKETING_NAV_PATHS = ['/', '/ai-token'] as const

export function usesMinimalMarketingNav(pathname: string | null) {
  return MINIMAL_MARKETING_NAV_PATHS.some((path) => pathname === path)
}
