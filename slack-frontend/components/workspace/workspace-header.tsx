'use client'

import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  DropdownTrigger
} from '@heroui/react'
import { buttonVariants } from '@heroui/styles'
import {
  ChevronDown,
  ExternalLink,
  Languages,
  Moon,
  MoreHorizontal,
  Share2,
  Sparkles,
  Star,
  Sun
} from 'lucide-react'
import { useTheme } from '@teispace/next-themes'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'

import { BrandMark } from './brand-mark'
import { WorkspaceDocSearchField } from './workspace-doc-search-field'
import { workspacePrimaryButtonClass } from './workspace-styles'
import { useWorkspaceUI } from './workspace-ui-context'

import { usePathname, useRouter } from '@/i18n/navigation'

type HeaderVariant = 'home' | 'document'

const emptySubscribe = () => () => {}

/** hydration 安全的「已挂载」判定：SSR 返回 false，客户端返回 true，避免 effect 内 setState */
function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function WorkspaceHeader({
  variant,
  wordCount = 0,
  documentTitle
}: {
  variant: HeaderVariant
  wordCount?: number
  documentTitle?: string
}) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { toggleAiPanel, aiPanelOpen } = useWorkspaceUI()
  const mounted = useMounted()
  const t = useTranslations('Workspace.header')

  const themeIcon = !mounted ? (
    <Sun className='size-4' />
  ) : resolvedTheme === 'dark' ? (
    <Moon className='size-4' />
  ) : (
    <Sun className='size-4' />
  )

  const langControl = (
    <Dropdown>
      <DropdownTrigger
        className={cn(
          buttonVariants({ size: 'sm', variant: 'tertiary' }),
          'inline-flex min-w-0 items-center gap-1'
        )}
      >
        <Languages className='size-4' />
        <span className='hidden text-xs sm:inline'>
          {locale === 'zh' ? t('langZh') : t('langEn')}
        </span>
        <ChevronDown className='size-3 opacity-60' />
      </DropdownTrigger>
      <DropdownPopover>
        <DropdownMenu
          onAction={(key) => {
            if (key === 'zh' || key === 'en') router.replace(pathname, { locale: key })
          }}
        >
          <DropdownItem id='zh' textValue={t('langZh')}>
            {t('langZh')}
          </DropdownItem>
          <DropdownItem id='en' textValue={t('langEn')}>
            {t('langEn')}
          </DropdownItem>
        </DropdownMenu>
      </DropdownPopover>
    </Dropdown>
  )

  const themeControl = (
    <Dropdown>
      <DropdownTrigger
        aria-label={t('themeAria')}
        className={cn(
          buttonVariants({ isIconOnly: true, size: 'sm', variant: 'tertiary' }),
          'inline-flex items-center justify-center'
        )}
      >
        {themeIcon}
      </DropdownTrigger>
      <DropdownPopover>
        <DropdownMenu
          onAction={(key) => {
            setTheme(String(key))
          }}
        >
          <DropdownItem id='light' textValue={t('light')}>
            {t('light')}
          </DropdownItem>
          <DropdownItem id='dark' textValue={t('dark')}>
            {t('dark')}
          </DropdownItem>
          <DropdownItem id='system' textValue={t('system')}>
            {t('system')}
          </DropdownItem>
        </DropdownMenu>
      </DropdownPopover>
    </Dropdown>
  )

  return (
    <header className='flex h-14 shrink-0 items-center justify-between gap-3 border-b border-separator bg-surface px-4'>
      <div className='flex min-w-0 items-center gap-3 sm:gap-4'>
        <BrandMark />
        {variant === 'document' ? (
          <>
            <span aria-hidden className='hidden text-amber-500 sm:inline'>
              ·
            </span>
            <span className='hidden text-sm text-muted sm:inline'>
              {t('wordCount', { count: wordCount })}
            </span>
            {documentTitle ? (
              <span
                className='hidden max-w-[220px] truncate text-sm text-muted lg:inline'
                title={documentTitle}
              >
                {documentTitle}
              </span>
            ) : null}
          </>
        ) : null}
      </div>

      <div className='flex items-center gap-0.5 sm:gap-1'>
        {variant === 'document' ? (
          <>
            <Button
              aria-pressed={aiPanelOpen}
              className={cn(
                workspacePrimaryButtonClass,
                'font-medium',
                !aiPanelOpen &&
                  '!bg-[var(--default)] !text-[var(--default-foreground)] hover:!opacity-95'
              )}
              size='sm'
              variant='primary'
              onPress={() => toggleAiPanel()}
            >
              <Sparkles className='size-4' />
              <span className='hidden sm:inline'>{t('aiWrite')}</span>
            </Button>
            <Button
              isIconOnly
              aria-label={t('favorite')}
              size='sm'
              variant='tertiary'
              onPress={() => {}}
            >
              <Star className='size-4' />
            </Button>
            <Button
              isIconOnly
              aria-label={t('share')}
              size='sm'
              variant='tertiary'
              onPress={() => {}}
            >
              <Share2 className='size-4' />
            </Button>
            <Button
              isIconOnly
              aria-label={t('publish')}
              size='sm'
              variant='tertiary'
              onPress={() => {}}
            >
              <ExternalLink className='size-4' />
            </Button>
            <Button
              isIconOnly
              aria-label={t('more')}
              size='sm'
              variant='tertiary'
              onPress={() => {}}
            >
              <MoreHorizontal className='size-4' />
            </Button>
          </>
        ) : null}
        {langControl}
        {themeControl}
      </div>
    </header>
  )
}

export function WorkspaceHomeSearchField() {
  const t = useTranslations('Workspace.header')

  return (
    <WorkspaceDocSearchField
      aria-label={t('searchDocsAria')}
      className='max-w-xl flex-1'
      name='home-doc-search'
      placeholder={t('searchDocsPlaceholder')}
    />
  )
}
