'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('ErrorPage')

  useEffect(() => {
    /* eslint-disable no-console */
    console.error(error)
  }, [error])

  return (
    <div className='mx-auto flex max-w-md flex-col gap-4 p-8 text-center'>
      <h2 className='text-lg font-semibold text-foreground'>{t('title')}</h2>
      <p className='text-sm text-muted'>{t('description')}</p>
      <button
        className='rounded-lg bg-[var(--accent)] px-4 py-2 text-sm text-[var(--accent-foreground)]'
        type='button'
        onClick={() => reset()}
      >
        {t('retry')}
      </button>
    </div>
  )
}
