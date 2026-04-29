'use client'

import { Button, cn, Input, InputGroup, Modal, TextField, useOverlayState } from '@heroui/react'
import { FileText, Search } from 'lucide-react'
import * as React from 'react'

import { useWorkspaceUI } from '../workspace-ui-context'
import {
  workspaceDangerButtonClass,
  workspaceGhostButtonClass,
  workspacePrimaryButtonClass,
  workspaceSearchInputClass
} from '../workspace-styles'

import { MOCK_FAVORITES, MOCK_TRASH } from '@/lib/workspace-mock'

const TITLES = {
  search: '搜索',
  favorites: '收藏夹',
  share: '我的分享',
  trash: '回收站',
  publish: '我的发布'
} as const

export function WorkspaceModals() {
  const { activeModal, closeModal } = useWorkspaceUI()

  const modalState = useOverlayState({
    isOpen: activeModal !== null,
    onOpenChange: (open) => {
      if (!open) closeModal()
    }
  })

  const title = activeModal ? TITLES[activeModal] : ''

  return (
    <Modal.Root state={modalState}>
      <Modal.Backdrop>
        <Modal.Container placement='center' scroll='inside' size='lg'>
          <Modal.Dialog className='max-w-lg sm:max-w-[min(90vw,42rem)]'>
            <Modal.Header className='flex flex-col items-stretch gap-1 border-b border-separator pb-3'>
              <div className='flex w-full items-center justify-between gap-2'>
                <Modal.Heading className='text-lg font-semibold text-foreground'>
                  {title}
                </Modal.Heading>
                <Modal.CloseTrigger aria-label='关闭' />
              </div>
              {activeModal === 'trash' ? (
                <p className='text-xs leading-relaxed text-muted'>
                  注意，回收站的文档将保留 <strong className='text-foreground'>30 天</strong>
                  ，然后彻底删除
                </p>
              ) : null}
            </Modal.Header>
            <Modal.Body className='min-h-[200px] pt-4'>
              {activeModal === 'search' && <SearchModalBody />}
              {activeModal === 'favorites' && <FavoritesModalBody />}
              {activeModal === 'share' && <ShareModalBody />}
              {activeModal === 'publish' && <PublishModalBody />}
              {activeModal === 'trash' && <TrashModalBody />}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  )
}

function SearchModalBody() {
  return (
    <div className='flex flex-col gap-4'>
      <TextField aria-label='搜索' variant='secondary'>
        <InputGroup>
          <InputGroup.Prefix>
            <Search aria-hidden className='size-4 shrink-0 text-muted' />
          </InputGroup.Prefix>
          <InputGroup.Input
            className={cn('h-10 pl-2', workspaceSearchInputClass)}
            placeholder='输入关键字...'
          />
        </InputGroup>
      </TextField>
      <div className='flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-separator bg-surface-secondary/60 py-10 text-muted'>
        <FileText aria-hidden className='size-12 stroke-[1.25] text-muted opacity-40' />
        <p className='text-sm'>暂无搜索结果</p>
      </div>
    </div>
  )
}

function FavoritesModalBody() {
  return (
    <div className='flex flex-col gap-3'>
      <TextField aria-label='筛选收藏' variant='secondary'>
        <Input className={cn('h-10', workspaceSearchInputClass)} placeholder='文档标题...' />
      </TextField>
      <div className='overflow-hidden rounded-lg border border-separator'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-surface-secondary text-muted'>
            <tr>
              <th className='px-3 py-2 font-medium'>标题</th>
              <th className='px-3 py-2 text-right font-medium'>更新时间</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_FAVORITES.map((row) => (
              <tr key={row.id} className='border-t border-separator'>
                <td className='px-3 py-2 text-foreground'>
                  {row.emoji ? `${row.emoji} ` : ''}
                  {row.title}
                </td>
                <td className='px-3 py-2 text-right text-muted'>
                  {row.cardRelative ?? row.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ShareModalBody() {
  return (
    <div className='flex min-h-[200px] flex-col items-center justify-center px-2 py-10 text-center'>
      <p className='max-w-sm text-sm leading-relaxed text-muted'>未找到内容，打开一个文档并分享</p>
    </div>
  )
}

function PublishModalBody() {
  return (
    <div className='flex flex-col items-center justify-center gap-3 py-12 text-center text-muted'>
      <p className='text-sm text-foreground'>未发布文档</p>
    </div>
  )
}

function TrashModalBody() {
  return (
    <div className='flex flex-col gap-4'>
      <TextField aria-label='在回收站中搜索' variant='secondary'>
        <Input className={cn('h-10', workspaceSearchInputClass)} placeholder='文档标题...' />
      </TextField>
      <div className='overflow-hidden rounded-lg border border-separator'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-surface-secondary text-muted'>
            <tr>
              <th className='px-3 py-2 font-medium'>标题</th>
              <th className='px-3 py-2 font-medium'>删除时间</th>
              <th className='px-3 py-2 font-medium'>操作</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRASH.map((row, i) => (
              <tr key={row.id} className='border-t border-separator'>
                <td className='px-3 py-2 text-foreground'>{row.title}</td>
                <td className='px-3 py-2 text-muted'>{row.deletedRelative}</td>
                <td className='px-3 py-2'>
                  {i === 0 ? (
                    <div className='flex flex-wrap gap-2'>
                      <button className={workspaceGhostButtonClass} type='button'>
                        恢复
                      </button>
                      <button className={workspaceDangerButtonClass} type='button'>
                        删除
                      </button>
                    </div>
                  ) : (
                    <span className='text-muted opacity-50'>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        className={cn(workspacePrimaryButtonClass, 'self-start')}
        variant='primary'
        onPress={() => {}}
      >
        清空回收站
      </Button>
    </div>
  )
}
