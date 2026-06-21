'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

export function BrandMark({
  href = '/home',
  className = ''
}: {
  href?: string
  className?: string
}) {
  const tMeta = useTranslations('Metadata')

  return (
    <Link
      className={`flex items-center gap-1 rounded no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] ${className}`}
      href={href}
      prefetch={false}
    >
      <Image
        aria-hidden
        priority
        alt=''
        className='size-9 shrink-0 rounded-md object-cover ring-1 ring-separator/30'
        height={36}
        src='/brand/moyu-mark.jpg'
        width={36}
      />
      <p className='font-bold text-inherit'>{tMeta('siteName')}</p>
    </Link>
  )
}
