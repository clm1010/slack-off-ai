'use client'

import type { MockDoc } from '@/lib/workspace-mock'

import { FileText, Star } from 'lucide-react'

import { Link } from '@/i18n/navigation'

export function WorkspaceDocumentCard({
  doc,
  showFavoriteStar
}: {
  doc: MockDoc
  showFavoriteStar?: boolean
}) {
  const rel = doc.cardRelative ?? doc.updatedAt

  const starVisible = showFavoriteStar || doc.isFavorite

  return (
    <Link
      className='flex h-full min-h-[104px] flex-col rounded-xl border border-separator bg-surface p-4 no-underline shadow-sm transition-shadow hover:shadow-md'
      href={`/work/${doc.id}`}
    >
      <div className='flex gap-2.5'>
        <span aria-hidden className='shrink-0 text-xl leading-none'>
          {doc.emoji ?? '📄'}
        </span>
        <div className='min-w-0 flex-1 space-y-1.5'>
          <div className='flex items-start justify-between gap-2'>
            <span className='line-clamp-2 text-sm font-medium text-foreground'>{doc.title}</span>
            {starVisible ? (
              <Star
                aria-hidden
                className='size-4 shrink-0 text-amber-500'
                fill='none'
                strokeWidth={2}
              />
            ) : (
              <FileText aria-hidden className='size-4 shrink-0 text-muted' />
            )}
          </div>
          <span className='text-xs text-muted'>{rel}</span>
        </div>
      </div>
    </Link>
  )
}
