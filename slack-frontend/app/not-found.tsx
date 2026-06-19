import type { Metadata } from 'next'

import clsx from 'clsx'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { headers } from 'next/headers'

import { routing } from '@/i18n/routing'
import { fontSans } from '@/config/fonts'

/** 与 next-intl middleware 注入一致 */
const NEXT_INTL_LOCALE_HEADER = 'x-next-intl-locale'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true
  }
}

/**
 * 全局 404 兜底：根布局 app/layout.tsx 只返回 children（不含 html/body），
 * 顶层（locale 段之外）的 not-found 会经由根布局渲染，因此这里必须自带 html/body，
 * 否则会触发 "Missing <html> and <body> tags in the root layout"。
 */
export default async function GlobalNotFound() {
  const headerLocale = (await headers()).get(NEXT_INTL_LOCALE_HEADER)
  const locale = hasLocale(routing.locales, headerLocale) ? headerLocale! : routing.defaultLocale

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'NotFound' })
  const htmlLang = locale === 'zh' ? 'zh-CN' : 'en'

  return (
    <html suppressHydrationWarning lang={htmlLang}>
      <head />
      <body
        suppressHydrationWarning
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <main className='mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center'>
          <h1 className='text-lg font-semibold text-foreground'>{t('title')}</h1>
          <p className='text-sm text-muted'>{t('description')}</p>
          <a
            className='text-sm font-medium text-accent underline underline-offset-2'
            href={`/${locale}`}
          >
            {t('homeLink')}
          </a>
        </main>
      </body>
    </html>
  )
}
