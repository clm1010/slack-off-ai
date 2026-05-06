'use client'

import { cn, Dropdown } from '@heroui/react'
import {
  ArrowDownWideNarrow,
  ChevronDown,
  Home,
  LogOut,
  Plus,
  Search,
  Star,
  Trash2,
  Users,
  ExternalLink
} from 'lucide-react'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'

import { useWorkspaceUI } from './workspace-ui-context'

import { Link, usePathname } from '@/i18n/navigation'
import { getMockDocs, isUntitledDoc } from '@/lib/workspace-mock'

type DocSortKey = 'default' | 'title' | 'created' | 'updated'

function isDocSortKey(v: string): v is DocSortKey {
  return v === 'default' || v === 'title' || v === 'created' || v === 'updated'
}

/** 排序：HeroUI Dropdown，菜单与触发按钮右对齐（placement: bottom end） */
function WorkspaceDocSortDropdown({
  sortKey,
  sortOptions,
  onSortKeyChange
}: {
  sortKey: DocSortKey
  sortOptions: { id: DocSortKey; label: string }[]
  onSortKeyChange: (k: DocSortKey) => void
}) {
  const t = useTranslations('Workspace.sidebar')

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        aria-label={t('sortAria')}
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg text-muted outline-none',
          'hover:bg-[var(--ws-nav-active-bg)]/80 hover:text-foreground',
          'data-[pressed]:bg-[var(--ws-nav-active-bg)]',
          'data-[focus-visible]:ring-2 data-[focus-visible]:ring-focus/30 data-[focus-visible]:ring-offset-2 data-[focus-visible]:ring-offset-[var(--color-workspace-sidebar)]'
        )}
      >
        <ArrowDownWideNarrow aria-hidden className='size-4 text-foreground/80' strokeWidth={2} />
      </Dropdown.Trigger>
      <Dropdown.Popover
        className='min-w-[160px] overflow-hidden rounded-xl border border-border bg-overlay p-1 shadow-lg'
        offset={4}
        placement='bottom end'
      >
        <Dropdown.Menu
          className='outline-none'
          selectedKeys={new Set([sortKey])}
          selectionMode='single'
          onSelectionChange={(keys) => {
            if (keys === 'all') return
            const id = keys.values().next().value

            if (typeof id === 'string' && isDocSortKey(id)) onSortKeyChange(id)
          }}
        >
          {sortOptions.map((opt) => (
            <Dropdown.Item
              key={opt.id}
              className={cn(
                'cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-foreground outline-none',
                'data-[highlighted]:bg-surface-secondary data-[highlighted]:text-foreground',
                'data-[selected]:bg-surface-secondary'
              )}
              id={opt.id}
              textValue={opt.label}
            >
              {opt.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  )
}

export function WorkspaceSidebar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('Workspace.sidebar')
  const { openModal } = useWorkspaceUI()
  const [sortKey, setSortKey] = React.useState<DocSortKey>('default')
  const [docSectionOpen, setDocSectionOpen] = React.useState(true)

  const sortOptions = React.useMemo(
    () =>
      [
        { id: 'default' as const, label: t('sortDefault') },
        { id: 'title' as const, label: t('sortTitle') },
        { id: 'created' as const, label: t('sortCreated') },
        { id: 'updated' as const, label: t('sortUpdated') }
      ] as const,
    [t]
  )

  const sortedDocs = React.useMemo(() => {
    const list = [...getMockDocs(locale)]
    const collatorLocale = locale === 'en' ? 'en' : 'zh'

    if (sortKey === 'title') list.sort((a, b) => a.title.localeCompare(b.title, collatorLocale))
    if (sortKey === 'created') list.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    if (sortKey === 'updated') list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

    return list
  }, [locale, sortKey])

  const activeDocId = pathname?.startsWith('/work/') ? pathname.slice('/work/'.length) : null

  return (
    <aside
      className={clsx(
        'relative flex h-full w-full min-w-0 flex-col',
        'bg-[var(--color-workspace-sidebar)]'
      )}
    >
      <div className='flex items-center gap-2 border-b border-separator px-3 py-3'>
        <span aria-hidden className='flex size-9 shrink-0 items-center justify-center text-lg'>
          🙂
        </span>
        <div className='min-w-0 flex-1'>
          <button
            className='w-full truncate text-left text-sm font-medium text-foreground hover:underline'
            type='button'
            onClick={() => {}}
          >
            {t('userSettings')}
          </button>
        </div>
      </div>

      <nav className='flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-2'>
        <SidebarNavLink
          active={pathname === '/home'}
          href='/home'
          icon={<Home className='size-4' />}
          label={t('home')}
        />

        <button
          className='flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground hover:bg-[var(--ws-nav-active-bg)]/70'
          type='button'
          onClick={() => openModal('search')}
        >
          <Search className='size-4 text-muted' />
          {t('search')}
        </button>

        <button
          className='flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground hover:bg-[var(--ws-nav-active-bg)]/70'
          type='button'
          onClick={() => openModal('favorites')}
        >
          <Star className='size-4 text-muted' />
          {t('favorites')}
        </button>

        <button
          className='flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground hover:bg-[var(--ws-nav-active-bg)]/70'
          type='button'
          onClick={() => openModal('share')}
        >
          <Users className='size-4 text-muted' />
          {t('share')}
        </button>

        <button
          className='flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground hover:bg-[var(--ws-nav-active-bg)]/70'
          type='button'
          onClick={() => openModal('publish')}
        >
          <ExternalLink className='size-4 text-muted' />
          {t('publish')}
        </button>

        <div
          className='mt-1 rounded-lg px-1 py-0.5'
          style={{ background: 'var(--ws-doc-tree-bg)' }}
        >
          <div className='flex items-center justify-between gap-1.5 px-2 py-2'>
            <button
              className='flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 rounded-md py-0.5 text-left text-sm font-medium text-foreground hover:bg-[var(--ws-nav-active-bg)]/50'
              type='button'
              onClick={() => setDocSectionOpen((o) => !o)}
            >
              <ChevronDown
                aria-hidden
                className={clsx(
                  'size-4 shrink-0 text-muted transition-transform duration-200',
                  docSectionOpen ? 'rotate-0' : '-rotate-90'
                )}
              />
              <span className='truncate'>{t('myDocs')}</span>
            </button>
            <WorkspaceDocSortDropdown
              sortKey={sortKey}
              sortOptions={[...sortOptions]}
              onSortKeyChange={setSortKey}
            />
          </div>
          {docSectionOpen ? (
            <div className='pb-2 pl-1'>
              <ul className='flex max-h-[280px] flex-col gap-0.5 overflow-y-auto'>
                {sortedDocs.map((doc) => {
                  const active = activeDocId === doc.id
                  const untitled = isUntitledDoc(doc)

                  return (
                    <li key={doc.id}>
                      <Link
                        className={clsx(
                          'flex items-center gap-2 rounded-md border-l-[3px] py-1.5 pl-1.5 pr-2 text-sm no-underline',
                          active && untitled
                            ? 'border-[var(--ws-doc-active-border)] bg-[var(--ws-doc-active-bg)] text-foreground'
                            : active
                              ? 'border-transparent bg-[var(--ws-nav-active-bg)] font-medium text-[var(--ws-nav-active-fg)]'
                              : 'border-transparent text-foreground hover:bg-[var(--ws-nav-active-bg)]/50'
                        )}
                        href={`/work/${doc.id}`}
                      >
                        <span aria-hidden className='shrink-0'>
                          {doc.emoji ?? '📄'}
                        </span>
                        <span className='truncate'>{doc.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <button
          className='flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground hover:bg-[var(--ws-nav-active-bg)]/70'
          type='button'
          onClick={() => {}}
        >
          <Plus className='size-4 text-muted' />
          {t('newDoc')}
        </button>
      </nav>

      <div className='mt-auto flex flex-col gap-0.5 border-t border-separator p-2'>
        <button
          className='flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground hover:bg-[var(--ws-nav-active-bg)]/70'
          type='button'
          onClick={() => openModal('trash')}
        >
          <Trash2 className='size-4 text-muted' />
          {t('trash')}
        </button>
        <button
          className='flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-[var(--danger)] hover:bg-[var(--danger)]/10'
          type='button'
          onClick={() => {
            if (typeof window !== 'undefined' && window.confirm(t('logoutConfirm'))) {
              /* 接入 Auth 后替换 */
            }
          }}
        >
          <LogOut className='size-4' />
          {t('logout')}
        </button>
      </div>
    </aside>
  )
}

function SidebarNavLink({
  href,
  icon,
  label,
  active
}: {
  href: string
  icon: React.ReactNode
  label: string
  active: boolean
}) {
  return (
    <Link
      className={clsx(
        'flex items-center gap-2 rounded-lg px-2 py-2 text-sm no-underline',
        active
          ? 'bg-[var(--ws-nav-active-bg)] font-medium text-[var(--ws-nav-active-fg)]'
          : 'text-foreground hover:bg-[var(--ws-nav-active-bg)]/70'
      )}
      href={href}
    >
      <span className={active ? 'text-[var(--ws-nav-active-fg)]' : 'text-muted'}>{icon}</span>
      {label}
    </Link>
  )
}
