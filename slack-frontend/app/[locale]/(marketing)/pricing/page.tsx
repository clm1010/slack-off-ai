import { getTranslations } from 'next-intl/server'

import { title } from '@/components/primitives'

export default async function PricingPage() {
  const t = await getTranslations('Marketing.pages')

  return (
    <div>
      <h1 className={title()}>{t('pricing')}</h1>
    </div>
  )
}
