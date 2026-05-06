import { getTranslations } from 'next-intl/server'

import { title } from '@/components/primitives'

export default async function DocsPage() {
  const t = await getTranslations('Marketing.pages')

  return (
    <div>
      <h1 className={title()}>{t('docs')}</h1>
    </div>
  )
}
