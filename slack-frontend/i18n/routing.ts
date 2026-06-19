import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'always',
  /** 由各页 `generateMetadata` + `buildLocaleAlternates` 产出 hreflang，避免与 `NEXT_PUBLIC_SITE_URL`/canonical 基址双轨不一致 */
  alternateLinks: false
})
