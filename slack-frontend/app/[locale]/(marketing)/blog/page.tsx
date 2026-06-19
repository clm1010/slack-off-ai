import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

import { title } from '@/components/primitives'
import { buildLocaleAlternates } from '@/lib/metadata-alternates'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    ...buildLocaleAlternates(locale, '/blog')
  }
}

export default async function BlogPage() {
  const t = await getTranslations('Marketing.pages')

  return (
    <div>
      <h1 className={title()}>{t('blog')}</h1>
    </div>
  )
}
