import Link from 'next/link'
import { FolderGit2 } from 'lucide-react'

import { title, subtitle } from '@/components/primitives'
import { siteConfig } from '@/config/site'

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block max-w-xl text-center justify-center'>
        <span className={title()}>{siteConfig.name}</span>
        <br />
        <span className={title({ color: 'blue' })}>智能写作&nbsp;</span>
        <span className={title()}>与文档工作台</span>
        <div className={subtitle({ class: 'mt-4' })}>{siteConfig.description}</div>
      </div>

      <div className='flex gap-3'>
        <Link className='button button--primary button--md rounded-full' href='/home'>
          进入工作台
        </Link>
        <a
          className='button button--tertiary button--md rounded-full'
          href={siteConfig.links.github}
          rel='noopener noreferrer'
          target='_blank'
        >
          <FolderGit2 aria-hidden className='size-5 shrink-0' strokeWidth={2} />
          GitHub
        </a>
      </div>

      <div className='mt-8'>
        <div className='flex items-center gap-2 rounded-xl bg-surface shadow-surface px-4 py-2'>
          <pre className='text-sm font-medium font-mono'>
            从{' '}
            <code className='px-2 py-1 h-fit font-mono font-normal inline whitespace-nowrap rounded-sm bg-accent/20 text-accent text-sm'>
              app/(marketing)/page.tsx
            </code>{' '}
            开始定制落地页
          </pre>
        </div>
      </div>
    </section>
  )
}
