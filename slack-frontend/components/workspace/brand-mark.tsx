import Link from 'next/link'

export function BrandMark({
  href = '/home',
  className = ''
}: {
  href?: string
  className?: string
}) {
  return (
    <Link
      className={`flex items-center gap-1.5 rounded no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] ${className}`}
      href={href}
    >
      <span className='text-lg font-semibold tracking-tight text-foreground'>摸鱼</span>
      <span className='rounded bg-[var(--ws-primary-bg)] px-1.5 py-0.5 text-xs font-bold tracking-wide text-[var(--ws-primary-fg)]'>
        AI
      </span>
    </Link>
  )
}
