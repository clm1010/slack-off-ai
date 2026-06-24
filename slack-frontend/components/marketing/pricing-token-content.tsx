import { Typography } from '@heroui/react'
import { getTranslations } from 'next-intl/server'

import { PricingTokenClaimPanel } from '@/components/marketing/pricing-token-claim-panel'
import { AI_TOKEN_MONTHLY_LIMIT, AI_TOKEN_WEEKLY_CLAIM } from '@/lib/ai-token-mock'

const externalLinkClass = 'text-foreground underline underline-offset-2 hover:opacity-80'

export async function PricingTokenContent() {
  const t = await getTranslations('Marketing.pricing')

  return (
    <article className='space-y-10'>
      <section className='space-y-4'>
        <Typography type='h1'>{t('whatIsToken.heading')}</Typography>
        <Typography.Paragraph className='text-[15px] leading-relaxed' color='muted'>
          {t('whatIsToken.intro')}
        </Typography.Paragraph>
        <ul className='list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted'>
          <li>{t('whatIsToken.bullets.conversion')}</li>
          <li>
            {t.rich('whatIsToken.bullets.pricingRich', {
              link: (chunks) => (
                <a
                  className={externalLinkClass}
                  href='https://openai.com/api/pricing/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {chunks}
                </a>
              )
            })}
          </li>
          <li>{t('whatIsToken.bullets.usage')}</li>
        </ul>
        <p>
          <a
            className={externalLinkClass}
            href='https://platform.openai.com/tokenizer'
            rel='noopener noreferrer'
            target='_blank'
          >
            {t('whatIsToken.tokenizerLink')}
          </a>
        </p>
      </section>

      <section className='space-y-4'>
        <Typography type='h1'>{t('whatIsLimit.heading')}</Typography>
        <Typography.Paragraph className='text-[15px] leading-relaxed' color='muted'>
          {t('whatIsLimit.p1')}
        </Typography.Paragraph>
        <Typography.Paragraph className='text-[15px] leading-relaxed' color='muted'>
          {t('whatIsLimit.p2')}
        </Typography.Paragraph>
      </section>

      <section className='space-y-4' id='add-limit-heading'>
        <Typography type='h1'>{t('getLimit.heading')}</Typography>
        <Typography.Paragraph className='text-[15px] leading-relaxed' color='muted'>
          {t('getLimit.subheading')}
        </Typography.Paragraph>
        <ul className='list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted'>
          <li>
            {t('getLimit.rules.monthly', {
              limit: AI_TOKEN_MONTHLY_LIMIT.toLocaleString('en-US')
            })}
          </li>
          <li>
            {t('getLimit.rules.weekly', {
              amount: AI_TOKEN_WEEKLY_CLAIM.toLocaleString('en-US'),
              cap: AI_TOKEN_MONTHLY_LIMIT.toLocaleString('en-US')
            })}
          </li>
        </ul>
        <PricingTokenClaimPanel />
      </section>
    </article>
  )
}
