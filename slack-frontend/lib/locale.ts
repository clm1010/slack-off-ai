import { routing } from '@/i18n/routing'

type AppLocale = (typeof routing.locales)[number]

function isAppLocale(value: string | null | undefined): value is AppLocale {
  return Boolean(value && routing.locales.includes(value as AppLocale))
}

/** 从带 locale 前缀的路径中提取 locale，无则返回 null */
export function localeFromPath(pathname: string | null | undefined): AppLocale | null {
  if (!pathname) return null

  const match = pathname.match(/^\/(zh|en)(?:\/|$)/)

  return isAppLocale(match?.[1]) ? match[1] : null
}

/** 解析首选 locale：路径 > NEXT_LOCALE cookie > 默认 zh */
export function resolvePreferredLocale(options?: {
  pathname?: string | null
  cookieLocale?: string | null
}): AppLocale {
  const fromPath = localeFromPath(options?.pathname)

  if (fromPath) return fromPath

  if (isAppLocale(options?.cookieLocale)) return options.cookieLocale

  return routing.defaultLocale
}

export function stripLocale(pathname: string) {
  const match = pathname.match(/^\/(zh|en)(\/.*|$)/)

  if (!match) return pathname

  return match[2] || '/'
}
