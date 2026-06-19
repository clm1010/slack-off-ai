import type { Metadata } from 'next'

import { routing } from '@/i18n/routing'
import { getAbsoluteSiteUrl } from '@/lib/site-url'

type AppLocale = (typeof routing.locales)[number]

/**
 * 基于「无前缀」路径（如 `/`、`/docs`、`/work/id`）生成本页 canonical 与各语言 alternate。
 * hreflang：`zh-CN` / `en`；`x-default` 指向中文（与 defaultLocale 一致）。
 */
export function buildLocaleAlternates(
  locale: string,
  pathnameWithoutLocale: string
): Pick<Metadata, 'alternates'> {
  if (pathnameWithoutLocale !== '/' && !pathnameWithoutLocale.startsWith('/')) {
    throw new Error(
      `pathnameWithoutLocale must be "/" or start with "/" (got "${pathnameWithoutLocale}")`
    )
  }

  const base = getAbsoluteSiteUrl().replace(/\/+$/, '')
  const rest = pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale

  const urls: Record<AppLocale, string> = {
    zh: `${base}/zh${rest}`,
    en: `${base}/en${rest}`
  }

  const current = (
    routing.locales.includes(locale as AppLocale) ? locale : routing.defaultLocale
  ) as AppLocale

  return {
    alternates: {
      canonical: urls[current],
      languages: {
        'zh-CN': urls.zh,
        en: urls.en,
        'x-default': urls.zh
      }
    }
  }
}
