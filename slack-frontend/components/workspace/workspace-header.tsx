'use client'

import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  DropdownTrigger,
  InputGroup,
  TextField
} from '@heroui/react'
import { buttonVariants } from '@heroui/styles'
import {
  Bot,
  ChevronDown,
  Languages,
  Moon,
  MoreHorizontal,
  Search,
  Share2,
  Sparkles,
  Star,
  Sun
} from 'lucide-react'
import { useTheme } from '@teispace/next-themes'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'

import { BrandMark } from './brand-mark'
import { workspacePrimaryButtonClass, workspaceSearchInputClass } from './workspace-styles'

import { usePathname, useRouter } from '@/i18n/navigation'

type HeaderVariant = 'home' | 'document'

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
  const [mounted, setMounted] = React.useState(false)
  const t = useTranslations('Workspace.header')

  React.useEffect(() => {
    setMounted(true)
  }, [])

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
              className={cn(workspacePrimaryButtonClass, 'font-medium')}
              size='sm'
              variant='primary'
              onPress={() => {}}
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
              <Bot className='size-4' />
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
    <TextField aria-label={t('searchDocsAria')} className='max-w-xl flex-1' variant='secondary'>
      <InputGroup>
        <InputGroup.Prefix>
          <Search aria-hidden className='size-4 shrink-0 text-muted' />
        </InputGroup.Prefix>
        <InputGroup.Input
          className={cn('h-11 pl-2', workspaceSearchInputClass)}
          placeholder={t('searchDocsPlaceholder')}
        />
      </InputGroup>
    </TextField>
  )
}
