'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { getMockDocById } from '@/lib/workspace-mock'

export function WorkspaceFooter() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('Workspace.footer')
  const isDoc = pathname?.startsWith('/work/')
  const id = isDoc && pathname ? pathname.slice('/work/'.length) : null
  const doc = id ? getMockDocById(id, locale) : undefined

  const left =
    doc != null
      ? t('createdUpdated', { created: doc.createdAt, updated: doc.updatedAt })
      : t('timesPlaceholder')

  return (
    <footer className='flex min-h-9 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-separator bg-surface px-4 py-2 text-xs text-muted'>
      <span>{left}</span>
      <span className='text-right'>
        {t('hint')} <strong className='font-semibold text-[var(--ws-success)]'>100000</strong>，
        <Link className='text-[var(--ws-success)] underline underline-offset-2' href='/pricing'>
          {t('getMore')}
        </Link>
      </span>
    </footer>
  )
}
