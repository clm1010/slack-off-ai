import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

import { MarketingPageTitle } from '@/components/marketing/marketing-page-title'
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
      <MarketingPageTitle>{t('blog')}</MarketingPageTitle>
    </div>
  )
}
