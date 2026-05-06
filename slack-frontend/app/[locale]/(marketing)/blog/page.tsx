import { getTranslations } from 'next-intl/server'

import { title } from '@/components/primitives'

export default async function BlogPage() {
  const t = await getTranslations('Marketing.pages')

  return (
    <div>
      <h1 className={title()}>{t('blog')}</h1>
    </div>
  )
}
