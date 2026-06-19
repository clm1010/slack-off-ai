import type { Metadata } from 'next'

import { headers } from 'next/headers'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

/** 与 next-intl middleware 注入一致 */
const NEXT_INTL_LOCALE_HEADER = 'x-next-intl-locale'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true
  }
}

export default async function LocaleNotFound() {
  const headerLocale = (await headers()).get(NEXT_INTL_LOCALE_HEADER)

  const locale = hasLocale(routing.locales, headerLocale) ? headerLocale! : routing.defaultLocale

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'NotFound' })

  return (
    <div className='mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center'>
      <h1 className='text-lg font-semibold text-foreground'>{t('title')}</h1>
      <p className='text-sm text-muted'>{t('description')}</p>
      <Link className='text-sm font-medium text-accent underline underline-offset-2' href='/'>
        {t('homeLink')}
      </Link>
    </div>
  )
}
