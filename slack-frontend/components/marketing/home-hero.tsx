'use client'

import { Typography, cn } from '@heroui/react'
import { buttonVariants } from '@heroui/styles'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

const heroGradientClass = 'bg-gradient-to-r from-accent via-violet-500 to-fuchsia-600'

export function HomeHero() {
  const t = useTranslations('Marketing.home')
  const tMeta = useTranslations('Metadata')

  return (
    <section className='flex flex-1 flex-col items-center justify-center gap-8 py-8 md:py-10'>
      <div className='max-w-3xl text-center'>
        <Typography align='center' className='break-keep text-[3.75rem]' type='h1'>
          {tMeta('siteName')}
          <br />
          <span className='whitespace-nowrap'>
            <span className={`${heroGradientClass} bg-clip-text text-transparent`}>
              {t('writingBlue')}&nbsp;
            </span>
            {t('titleRest')}
          </span>
        </Typography>
        <Typography.Paragraph align='center' className='mt-4 text-[1.25rem]' color='muted'>
          {tMeta('siteDescription')}
        </Typography.Paragraph>
      </div>

      <Link
        className={cn(
          buttonVariants({ size: 'lg' }),
          'rounded-full border-0 no-underline',
          heroGradientClass,
          'text-white shadow-none transition-opacity hover:opacity-90'
        )}
        href='/home'
      >
        {t('cta')}
      </Link>
    </section>
  )
}
