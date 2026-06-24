'use client'

import { Button } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'

import { workspaceFormSubmitButtonClass } from '@/components/workspace/workspace-styles'
import { AI_TOKEN_MONTHLY_LIMIT, AI_TOKEN_WEEKLY_CLAIM } from '@/lib/ai-token-mock'

function formatTokenUpdatedAt(date: Date, locale: string) {
  return date.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

export function PricingTokenClaimPanel() {
  const locale = useLocale()
  const t = useTranslations('Marketing.pricing.claim')
  const numberLocale = locale === 'zh' ? 'zh-CN' : 'en-US'

  const [balance, setBalance] = React.useState(AI_TOKEN_MONTHLY_LIMIT)
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState(() => new Date())

  const canClaim = balance < AI_TOKEN_MONTHLY_LIMIT

  const handleClaim = () => {
    if (!canClaim) return

    setBalance((prev) => Math.min(prev + AI_TOKEN_WEEKLY_CLAIM, AI_TOKEN_MONTHLY_LIMIT))
    setLastUpdatedAt(new Date())
  }

  return (
    <div className='space-y-4 border-t border-separator pt-8'>
      <p suppressHydrationWarning className='text-sm text-foreground'>
        {t('status', {
          balance: balance.toLocaleString(numberLocale),
          updatedAt: formatTokenUpdatedAt(lastUpdatedAt, locale)
        })}
      </p>
      <Button className={workspaceFormSubmitButtonClass} type='button' onPress={handleClaim}>
        {t('action')}
      </Button>
    </div>
  )
}
