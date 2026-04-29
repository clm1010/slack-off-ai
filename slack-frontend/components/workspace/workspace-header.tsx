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
import { useTheme } from 'next-themes'
import * as React from 'react'

import { BrandMark } from './brand-mark'
import { workspacePrimaryButtonClass, workspaceSearchInputClass } from './workspace-styles'

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
  const [locale, setLocale] = React.useState<'zh' | 'en'>('zh')
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

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
          {locale === 'zh' ? 'cn 中文' : 'us English'}
        </span>
        <ChevronDown className='size-3 opacity-60' />
      </DropdownTrigger>
      <DropdownPopover>
        <DropdownMenu
          onAction={(key) => {
            if (key === 'zh' || key === 'en') setLocale(key)
          }}
        >
          <DropdownItem id='zh' textValue='cn 中文'>
            cn 中文
          </DropdownItem>
          <DropdownItem id='en' textValue='us English'>
            us English
          </DropdownItem>
        </DropdownMenu>
      </DropdownPopover>
    </Dropdown>
  )

  const themeControl = (
    <Dropdown>
      <DropdownTrigger
        aria-label='主题'
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
          <DropdownItem id='light' textValue='明亮'>
            明亮
          </DropdownItem>
          <DropdownItem id='dark' textValue='黑暗'>
            黑暗
          </DropdownItem>
          <DropdownItem id='system' textValue='系统'>
            系统
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
            <span className='hidden text-sm text-muted sm:inline'>共 {wordCount} 字</span>
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
              <span className='hidden sm:inline'>AI 写作</span>
            </Button>
            <Button isIconOnly aria-label='收藏' size='sm' variant='tertiary' onPress={() => {}}>
              <Star className='size-4' />
            </Button>
            <Button isIconOnly aria-label='分享' size='sm' variant='tertiary' onPress={() => {}}>
              <Share2 className='size-4' />
            </Button>
            <Button isIconOnly aria-label='发布' size='sm' variant='tertiary' onPress={() => {}}>
              <Bot className='size-4' />
            </Button>
            <Button isIconOnly aria-label='更多' size='sm' variant='tertiary' onPress={() => {}}>
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
  return (
    <TextField aria-label='搜索文档' className='max-w-xl flex-1' variant='secondary'>
      <InputGroup>
        <InputGroup.Prefix>
          <Search aria-hidden className='size-4 shrink-0 text-muted' />
        </InputGroup.Prefix>
        <InputGroup.Input
          className={cn('h-11 pl-2', workspaceSearchInputClass)}
          placeholder='搜索文档...'
        />
      </InputGroup>
    </TextField>
  )
}
