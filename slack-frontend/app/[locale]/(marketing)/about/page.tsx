import { getTranslations } from 'next-intl/server'

import { title } from '@/components/primitives'

export default async function AboutPage() {
  const t = await getTranslations('Marketing.pages')

  return (
    <div>
      <h1 className={title()}>{t('about')}</h1>
    </div>
  )
}
