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
    ...buildLocaleAlternates(locale, '/docs')
  }
}

export default async function DocsPage() {
  const t = await getTranslations('Marketing.pages')

  return (
    <div>
      <MarketingPageTitle>{t('docs')}</MarketingPageTitle>
    </div>
  )
}
