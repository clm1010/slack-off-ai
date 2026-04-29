'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { getMockDocById } from '@/lib/workspace-mock'

const FOOTER_HINT = 'AI 可能会生成错误信息，请自行检查判断。你本月 AI token limit 剩余'

export function WorkspaceFooter() {
  const pathname = usePathname()
  const isDoc = pathname?.startsWith('/work/')
  const id = isDoc && pathname ? pathname.slice('/work/'.length) : null
  const doc = id ? getMockDocById(id) : undefined

  const left =
    doc != null ? `创建时间 ${doc.createdAt}  更新时间 ${doc.updatedAt}` : '创建时间 ,  更新时间'

  return (
    <footer className='flex min-h-9 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-separator bg-surface px-4 py-2 text-xs text-muted'>
      <span>{left}</span>
      <span className='text-right'>
        {FOOTER_HINT} <strong className='font-semibold text-[var(--ws-success)]'>100000</strong>，
        <Link className='text-[var(--ws-success)] underline underline-offset-2' href='/pricing'>
          点击获取更多
        </Link>
      </span>
    </footer>
  )
}
