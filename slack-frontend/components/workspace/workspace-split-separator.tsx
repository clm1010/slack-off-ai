'use client'

import { cn } from '@heroui/react'
import { Separator } from 'react-resizable-panels'

/** 侧栏与主区之间的竖向分隔条：细线 + 居中六点拖动手柄（与参考稿一致） */
export function WorkspaceSplitSeparator() {
  return (
    <Separator
      className={cn(
        'group relative flex w-2 items-stretch justify-center',
        'cursor-col-resize outline-none',
        'focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-focus/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      )}
    >
      <span
        aria-hidden
        className='pointer-events-none absolute inset-y-0 left-1/2 z-0 w-px -translate-x-1/2 bg-separator'
      />
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-1/2 z-10 flex h-7 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-surface-tertiary shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-[background-color,border-color,box-shadow] group-hover:bg-default group-data-[separator=active]:shadow-md dark:shadow-[0_1px_2px_rgba(0,0,0,0.25)]'
      >
        <span className='grid grid-cols-2 gap-x-0.5 gap-y-[3px]'>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className='size-[3px] shrink-0 rounded-full bg-muted' />
          ))}
        </span>
      </span>
    </Separator>
  )
}
