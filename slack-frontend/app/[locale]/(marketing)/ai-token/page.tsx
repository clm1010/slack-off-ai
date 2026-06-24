import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

import { PricingTokenContent } from '@/components/marketing/pricing-token-content'
import { buildLocaleAlternates } from '@/lib/metadata-alternates'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Marketing.pricing' })

  return {
    title: t('metaTitle'),
    ...buildLocaleAlternates(locale, '/ai-token')
  }
}

export default function AiTokenPage() {
  return <PricingTokenContent />
}
