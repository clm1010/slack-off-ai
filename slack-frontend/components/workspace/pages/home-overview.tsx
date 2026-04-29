'use client'

import { Button, cn } from '@heroui/react'

import { useWorkspaceUI } from '../workspace-ui-context'
import { WorkspaceDocumentCard } from '../workspace-document-card'
import { WorkspaceHomeSearchField } from '../workspace-header'
import { workspacePrimaryButtonClass } from '../workspace-styles'

import { MOCK_FAVORITES, MOCK_RECENT, MOCK_SHARED } from '@/lib/workspace-mock'

function SectionHeader({ title, onMore }: { title: string; onMore?: () => void }) {
  return (
    <div className='flex items-baseline justify-between gap-2'>
      <h2 className='text-base font-semibold text-foreground'>{title}</h2>
      {onMore ? (
        <button
          className='text-xs text-muted underline decoration-muted/60 underline-offset-2 hover:text-foreground hover:decoration-foreground'
          type='button'
          onClick={onMore}
        >
          更多...
        </button>
      ) : null}
    </div>
  )
}

function DocCardGrid({
  title,
  items,
  showFavoriteStar,
  onMore
}: {
  title: string
  items: (typeof MOCK_RECENT)[number][]
  showFavoriteStar?: boolean
  onMore?: () => void
}) {
  return (
    <section className='space-y-3'>
      <SectionHeader title={title} onMore={onMore} />
      {items.length === 0 ? (
        <div className='flex min-h-[120px] flex-col items-center justify-center text-sm text-muted'>
          未找到内容
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
  const { openModal } = useWorkspaceUI()

  return (
    <div className='flex min-h-0 flex-1 flex-col overflow-y-auto bg-background'>
      <div className='mx-auto w-full max-w-5xl space-y-8 px-6 py-10'>
        <h1 className='text-3xl font-semibold tracking-tight text-foreground'>我的首页</h1>

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <WorkspaceHomeSearchField />
          <Button
            className={cn(workspacePrimaryButtonClass, 'h-11 shrink-0 font-medium sm:w-auto')}
            variant='primary'
            onPress={() => {}}
          >
            + 新建文档
          </Button>
        </div>

        <DocCardGrid items={MOCK_RECENT} title='最近文档' onMore={() => openModal('search')} />
        <DocCardGrid
          showFavoriteStar
          items={MOCK_FAVORITES}
          title='收藏文档'
          onMore={() => openModal('favorites')}
        />
        <DocCardGrid items={MOCK_SHARED} title='分享文档' onMore={() => openModal('share')} />
      </div>
    </div>
  )
}
