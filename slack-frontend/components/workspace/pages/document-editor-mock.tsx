'use client'

import { Button, cn, TextArea } from '@heroui/react'
import { ChevronLeft, ChevronRight, HelpCircle, List, MessageCircle, Sparkles } from 'lucide-react'
import * as React from 'react'

import { workspaceAiTextAreaClass } from '../workspace-styles'

import { getMockDocById } from '@/lib/workspace-mock'

const QUICK_ACTIONS = [
  { id: 'continue', label: '续写' },
  { id: 'brainstorm', label: '头脑风暴' },
  { id: 'outline', label: '写大纲' },
  { id: 'summary', label: '写总结' }
] as const

export function DocumentEditorMock({ documentId }: { documentId: string }) {
  const doc = getMockDocById(documentId)
  const [title, setTitle] = React.useState(doc?.title ?? '请输入标题…')
  const [aiOpen, setAiOpen] = React.useState(true)

  React.useEffect(() => {
    setTitle(doc?.title ?? '请输入标题…')
  }, [doc?.title])

  const body = doc?.mockBody ?? '该文档暂无占位正文。'

  return (
    <div className='flex min-h-0 flex-1 bg-background'>
      <div className='relative flex min-w-0 flex-1 flex-col'>
        <div className='mx-auto flex w-full max-w-3xl flex-col gap-4 px-8 py-6'>
          <div className='flex items-start gap-2 border-b border-separator pb-4'>
            <span aria-hidden className='mt-1 text-xl text-amber-500'>
              ✦
            </span>
            <input
              aria-label='文档标题'
              className='min-w-0 flex-1 border-none bg-transparent text-2xl font-semibold text-foreground outline-none placeholder:text-muted'
              placeholder='请输入标题…'
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
          <RailBtn ariaLabel='目录' icon={<List className='size-5' />} onPress={() => {}} />
          <RailBtn
            ariaLabel='消息'
            icon={<MessageCircle className='size-5' />}
            onPress={() => {}}
          />
          <RailBtn
            accent
            ariaLabel='AI 助手'
            icon={<Sparkles className='size-5' />}
            onPress={() => setAiOpen((v) => !v)}
          />
          <RailBtn ariaLabel='帮助' icon={<HelpCircle className='size-5' />} onPress={() => {}} />
        </div>
      </div>

      {aiOpen ? (
        <aside className='flex w-[300px] shrink-0 flex-col border-l border-separator bg-surface shadow-[inset_1px_0_0_0_rgba(0,0,0,0.04)]'>
          <div className='flex items-center justify-between border-b border-separator px-3 py-2'>
            <span className='text-sm font-medium text-foreground'>AI 写作 / 聊天</span>
            <Button
              isIconOnly
              aria-label='收起 AI 面板'
              size='sm'
              variant='tertiary'
              onPress={() => setAiOpen(false)}
            >
              <ChevronRight className='size-4' />
            </Button>
          </div>
          <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4'>
            <div className='mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-surface-secondary text-4xl'>
              🤖
            </div>
            <TextArea
              className={cn('min-h-[120px] w-full resize-none text-sm', workspaceAiTextAreaClass)}
              placeholder='输入 AI 指令，如：如何写前端简历？'
            />
            <div className='flex flex-wrap gap-2'>
              {QUICK_ACTIONS.map((a) => (
                <Button
                  key={a.id}
                  className='border border-separator bg-surface text-xs text-foreground hover:bg-surface-secondary'
                  size='sm'
                  variant='tertiary'
                  onPress={() => {}}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          </div>
        </aside>
      ) : (
        <div className='flex w-10 shrink-0 flex-col items-center border-l border-separator bg-surface py-3'>
          <Button
            isIconOnly
            aria-label='展开 AI 面板'
            size='sm'
            variant='tertiary'
            onPress={() => setAiOpen(true)}
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
          ? 'pointer-events-auto !bg-[var(--color-workspace-accent-green)] !text-white shadow-md ring-0 border-0 hover:!opacity-95'
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
