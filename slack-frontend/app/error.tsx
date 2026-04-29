'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    /* eslint-disable no-console */
    console.error(error)
  }, [error])

  return (
    <div className='mx-auto flex max-w-md flex-col gap-4 p-8 text-center'>
      <h2 className='text-lg font-semibold text-foreground'>摸鱼AI · 页面出错了</h2>
      <p className='text-sm text-muted'>请稍后再试，或返回首页。</p>
      <button
        className='rounded-lg bg-[var(--accent)] px-4 py-2 text-sm text-[var(--accent-foreground)]'
        type='button'
        onClick={() => reset()}
      >
        重试
      </button>
    </div>
  )
}
