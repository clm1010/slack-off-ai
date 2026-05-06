'use client'

import { Button, cn } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'

import { useWorkspaceUI } from '../workspace-ui-context'
import { WorkspaceDocumentCard } from '../workspace-document-card'
import { WorkspaceHomeSearchField } from '../workspace-header'
import { workspacePrimaryButtonClass } from '../workspace-styles'

import { getMockFavorites, getMockRecent, getMockShared } from '@/lib/workspace-mock'

function SectionHeader({
  title,
  onMore,
  moreLabel
}: {
  title: string
  onMore?: () => void
  moreLabel: string
}) {
  return (
    <div className='flex items-baseline justify-between gap-2'>
      <h2 className='text-base font-semibold text-foreground'>{title}</h2>
      {onMore ? (
        <button
          className='text-xs text-muted underline decoration-muted/60 underline-offset-2 hover:text-foreground hover:decoration-foreground'
          type='button'
          onClick={onMore}
        >
          {moreLabel}
        </button>
      ) : null}
    </div>
  )
}

function DocCardGrid({
  title,
  items,
  showFavoriteStar,
  onMore,
  emptyLabel,
  moreLabel
}: {
  title: string
  items: ReturnType<typeof getMockRecent>
  showFavoriteStar?: boolean
  onMore?: () => void
  emptyLabel: string
  moreLabel: string
}) {
  return (
    <section className='space-y-3'>
      <SectionHeader moreLabel={moreLabel} title={title} onMore={onMore} />
      {items.length === 0 ? (
        <div className='flex min-h-[120px] flex-col items-center justify-center text-sm text-muted'>
          {emptyLabel}
        </div>
      ) : (
        <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {items.slice(0, 6).map((d) => (
            <li key={d.id}>
              <WorkspaceDocumentCard doc={d} showFavoriteStar={showFavoriteStar} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function HomeOverview() {
  const locale = useLocale()
  const { openModal } = useWorkspaceUI()
  const t = useTranslations('Workspace.homeOverview')

  const recent = getMockRecent(locale)
  const favorites = getMockFavorites(locale)
  const shared = getMockShared(locale)

  return (
    <div className='flex min-h-0 flex-1 flex-col overflow-y-auto bg-background'>
      <div className='mx-auto w-full max-w-5xl space-y-8 px-6 py-10'>
        <h1 className='text-3xl font-semibold tracking-tight text-foreground'>{t('title')}</h1>

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <WorkspaceHomeSearchField />
          <Button
            className={cn(workspacePrimaryButtonClass, 'h-11 shrink-0 font-medium sm:w-auto')}
            variant='primary'
            onPress={() => {}}
          >
            {t('newDoc')}
          </Button>
        </div>

        <DocCardGrid
          emptyLabel={t('empty')}
          items={recent}
          moreLabel={t('more')}
          title={t('recent')}
          onMore={() => openModal('search')}
        />
        <DocCardGrid
          showFavoriteStar
          emptyLabel={t('empty')}
          items={favorites}
          moreLabel={t('more')}
          title={t('favorites')}
          onMore={() => openModal('favorites')}
        />
        <DocCardGrid
          emptyLabel={t('empty')}
          items={shared}
          moreLabel={t('more')}
          title={t('shared')}
          onMore={() => openModal('share')}
        />
      </div>
    </div>
  )
}
