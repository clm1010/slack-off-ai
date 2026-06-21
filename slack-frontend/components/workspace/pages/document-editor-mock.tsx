'use client'

import { Button, cn, TextArea } from '@heroui/react'
import {
  ArrowUpRight,
  Bot,
  ChevronLeft,
  CornerDownRight,
  HelpCircle,
  List,
  MessageCircle,
  Sparkles,
  Trash2,
  X as XIcon
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'

import { useWorkspaceUI } from '../workspace-ui-context'
import { workspaceAiTextAreaClass } from '../workspace-styles'

import { documentService } from '@/lib/services'

/** 与划水工作台示意一致：底部 token 展示（mock） */
const MOCK_AI_TOKEN_BUDGET = 100000

export function DocumentEditorMock({ documentId }: { documentId: string }) {
  const locale = useLocale()
  const t = useTranslations('Workspace.editor')
  const doc = documentService.getById(documentId, locale)
  const { aiPanelOpen, setAiPanelOpen, toggleAiPanel } = useWorkspaceUI()

  const quickActions = React.useMemo(
    () =>
      [
        { id: 'continue' as const, label: t('quickContinue') },
        { id: 'brainstorm' as const, label: t('quickBrainstorm') },
        { id: 'outline' as const, label: t('quickOutline') },
        { id: 'summary' as const, label: t('quickSummary') }
      ] as const,
    [t]
  )

  const initialTitle = doc?.title ?? t('titlePlaceholder')
  const [title, setTitle] = React.useState(initialTitle)
  /** 切换文档/语言时把可编辑标题重置为文档标题：渲染期根据上一次值调整，避免 effect 内 setState */
  const [prevInitialTitle, setPrevInitialTitle] = React.useState(initialTitle)

  if (initialTitle !== prevInitialTitle) {
    setPrevInitialTitle(initialTitle)
    setTitle(initialTitle)
  }

  /** Chat 内有光标时：Bot、输入框、快捷提示同色高亮（对标划水） */
  const [aiPromptFocused, setAiPromptFocused] = React.useState(false)

  const body = doc?.mockBody ?? t('emptyBody')

  return (
    <div className='flex min-h-0 flex-1 bg-background'>
      <div className='relative flex min-w-0 flex-1 flex-col'>
        <div className='mx-auto flex w-full max-w-3xl flex-col gap-4 px-8 py-6'>
          <div className='flex items-start gap-2 border-b border-separator pb-4'>
            <span aria-hidden className='mt-1 text-xl text-amber-500'>
              ✦
            </span>
            <input
              aria-label={t('titleAria')}
              className='min-w-0 flex-1 border-none bg-transparent text-2xl font-semibold text-foreground outline-none placeholder:text-muted'
              placeholder={t('titlePlaceholder')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div
            suppressHydrationWarning
            className='min-h-[320px] whitespace-pre-wrap rounded-xl bg-surface px-4 py-5 text-[15px] leading-relaxed text-foreground shadow-sm ring-1 ring-separator'
          >
            {body}
          </div>
        </div>

        <div className='pointer-events-none absolute right-2 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3 pr-1'>
          <RailBtn ariaLabel={t('railToc')} icon={<List className='size-5' />} onPress={() => {}} />
          <RailBtn
            ariaLabel={t('railMessages')}
            icon={<MessageCircle className='size-5' />}
            onPress={() => {}}
          />
          <RailBtn
            accent
            ariaLabel={t('railAi')}
            icon={<Sparkles className='size-5' />}
            onPress={() => toggleAiPanel()}
          />
          <RailBtn
            ariaLabel={t('railHelp')}
            icon={<HelpCircle className='size-5' />}
            onPress={() => {}}
          />
        </div>
      </div>

      {aiPanelOpen ? (
        <aside
          suppressHydrationWarning
          className='flex h-full w-[min(380px,calc(100vw-96px))] shrink-0 flex-col border-l border-[var(--separator)] bg-[var(--surface)]'
        >
          <div className='flex shrink-0 items-center justify-between gap-3 border-b border-[var(--separator)] px-4 py-3'>
            <span className='select-none text-sm font-semibold text-[var(--foreground)]'>
              {t('aiPanelTitle')}
            </span>
            <div className='flex shrink-0 items-center gap-1'>
              <Button
                isIconOnly
                aria-label={t('clearAiChatAria')}
                size='sm'
                variant='tertiary'
                onPress={() => {}}
              >
                <Trash2 className='size-4 text-[var(--muted)]' strokeWidth={2} />
              </Button>
              <Button
                isIconOnly
                aria-label={t('closeAiPanelAria')}
                size='sm'
                variant='tertiary'
                onPress={() => setAiPanelOpen(false)}
              >
                <XIcon className='size-4 text-[var(--muted)]' strokeWidth={2} />
              </Button>
            </div>
          </div>

          <div className='flex min-h-0 flex-1 flex-col overflow-y-auto'>
            <div className='flex flex-col items-center gap-3 px-5 pb-6 pt-8'>
              <div
                className={cn(
                  'flex size-[4.75rem] items-center justify-center rounded-xl transition-shadow duration-150',
                  aiPromptFocused
                    ? 'bg-[var(--ws-ai-focus-soft)] ring-2 ring-[var(--ws-ai-focus)] ring-offset-0'
                    : 'bg-[var(--surface-secondary)] ring-1 ring-[var(--separator)]'
                )}
              >
                <Bot
                  aria-hidden
                  className={cn(
                    'size-[2.375rem] transition-colors duration-150',
                    aiPromptFocused ? 'text-[var(--ws-ai-focus)]' : 'text-[var(--foreground)]'
                  )}
                  strokeWidth={2}
                />
              </div>
              <p className='text-center text-sm leading-relaxed text-[var(--muted)]'>
                {t('aiPanelIntro')}
              </p>

              <div className='mt-4 w-full'>
                <label className='sr-only' htmlFor='ws-ai-prompt'>
                  {t('aiPlaceholder')}
                </label>
                <div className='relative'>
                  <TextArea
                    className={cn(
                      workspaceAiTextAreaClass,
                      'min-h-[128px] w-full resize-none px-4 py-3.5 pb-11 text-[15px] leading-relaxed',
                      '!rounded-xl transition-[border-color,box-shadow] duration-150',
                      aiPromptFocused &&
                        '!border-[var(--ws-ai-focus)] !shadow-[0_0_0_2px_color-mix(in_srgb,var(--ws-ai-focus)_28%,transparent)] focus-visible:!border-[var(--ws-ai-focus)] focus-visible:!ring-0'
                    )}
                    id='ws-ai-prompt'
                    placeholder={t('aiPlaceholder')}
                    onBlur={() => setAiPromptFocused(false)}
                    onFocus={() => setAiPromptFocused(true)}
                  />
                  <CornerDownRight
                    aria-hidden
                    className={cn(
                      'pointer-events-none absolute bottom-3 right-3 size-[1.375rem] opacity-90 transition-colors duration-150',
                      aiPromptFocused ? 'text-[var(--ws-ai-focus)]' : 'text-[var(--muted)]'
                    )}
                    strokeWidth={2}
                  />
                </div>
              </div>

              <nav
                aria-label={t('aiQuickLinksAria')}
                className='flex w-full flex-col divide-y divide-separator pt-6'
              >
                {quickActions.map((a) => (
                  <button
                    key={a.id}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 py-4 text-left text-sm transition-colors duration-150',
                      aiPromptFocused
                        ? 'text-[var(--ws-ai-focus)] hover:bg-[var(--ws-ai-focus-soft)]'
                        : 'text-[var(--foreground)] hover:bg-[var(--surface-secondary)]'
                    )}
                    type='button'
                    onClick={() => {}}
                  >
                    <span>{a.label}</span>
                    <ArrowUpRight
                      aria-hidden
                      className={cn(
                        'size-[1.0625rem] shrink-0 transition-colors duration-150',
                        aiPromptFocused ? 'text-[var(--ws-ai-focus)]' : 'text-[var(--muted)]'
                      )}
                      strokeWidth={2}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <footer className='border-t border-[var(--separator)] px-4 py-4'>
            <p className='text-[11px] leading-[1.65] text-[var(--muted)]'>
              <span>{t('aiPanelFooterLead')}</span>
              <span suppressHydrationWarning>
                {t.rich('aiPanelFooterBudgetRich', {
                  tok: () => (
                    <span className='font-semibold tabular-nums text-[var(--ws-success)]'>
                      {MOCK_AI_TOKEN_BUDGET.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US')}
                    </span>
                  ),
                  lnk: (chunks) => (
                    <button
                      className='text-[var(--ws-success)] underline underline-offset-[3px] hover:opacity-90'
                      type='button'
                      onClick={() => {}}
                    >
                      {chunks}
                    </button>
                  )
                })}
              </span>
            </p>
          </footer>
        </aside>
      ) : (
        <div className='flex h-full w-11 shrink-0 flex-col items-center border-l border-[var(--separator)] bg-[var(--surface)] py-3'>
          <Button
            isIconOnly
            aria-label={t('expandAi')}
            size='sm'
            variant='tertiary'
            onPress={() => setAiPanelOpen(true)}
          >
            <ChevronLeft className='size-4' />
          </Button>
        </div>
      )}
    </div>
  )
}

function RailBtn({
  icon,
  onPress,
  ariaLabel,
  accent
}: {
  icon: React.ReactNode
  onPress: () => void
  ariaLabel: string
  accent?: boolean
}) {
  return (
    <Button
      isIconOnly
      aria-label={ariaLabel}
      className={cn(
        accent
          ? 'pointer-events-auto !border-0 !bg-[var(--color-workspace-accent-green)] !text-white shadow-md ring-0 hover:!opacity-95'
          : 'pointer-events-auto border border-separator bg-surface text-foreground shadow-sm hover:bg-surface-secondary'
      )}
      size='sm'
      variant='tertiary'
      onPress={onPress}
    >
      {icon}
    </Button>
  )
}
