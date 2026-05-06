import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { title, subtitle } from '@/components/primitives'

export default async function Home() {
  const t = await getTranslations('Marketing.home')
  const tMeta = await getTranslations('Metadata')

  return (
    <section className='flex flex-1 flex-col items-center justify-center gap-8 py-8 md:py-10'>
      <div className='inline-block max-w-xl justify-center text-center'>
        <span className={title()}>{tMeta('siteName')}</span>
        <br />
        <span className={title({ color: 'blue' })}>{t('writingBlue')}&nbsp;</span>
        <span className={title()}>{t('titleRest')}</span>
        <div className={subtitle({ class: 'mt-4' })}>{tMeta('siteDescription')}</div>
      </div>

      <Link className='button button--primary button--md rounded-full' href='/home'>
        {t('cta')}
      </Link>
    </section>
  )
}
