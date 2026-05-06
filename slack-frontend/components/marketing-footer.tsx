'use client'

import { useTranslations } from 'next-intl'

import { usePathname } from '@/i18n/navigation'

export function MarketingFooter() {
  const pathname = usePathname()
  const t = useTranslations('Marketing')

  if (pathname === '/') return null

  return (
    <footer className='flex w-full items-center justify-center py-3 text-sm text-muted'>
      <span>{t('footer')}</span>
    </footer>
  )
}
