'use client'

import { Button, cn, Input, InputGroup, Modal, TextField, useOverlayState } from '@heroui/react'
import { FileText, Search } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { useWorkspaceUI } from '../workspace-ui-context'
import {
  workspaceDangerButtonClass,
  workspaceGhostButtonClass,
  workspacePrimaryButtonClass,
  workspaceSearchInputClass
} from '../workspace-styles'

import { getMockFavorites, getMockTrash } from '@/lib/workspace-mock'

export function WorkspaceModals() {
  const { activeModal, closeModal } = useWorkspaceUI()
  const t = useTranslations('Workspace.modals')

  const modalState = useOverlayState({
    isOpen: activeModal !== null,
    onOpenChange: (open) => {
      if (!open) closeModal()
    }
  })

  const title =
    activeModal === 'search'
      ? t('search')
      : activeModal === 'favorites'
        ? t('favorites')
        : activeModal === 'share'
          ? t('share')
          : activeModal === 'trash'
            ? t('trash')
            : activeModal === 'publish'
              ? t('publish')
              : ''

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
                <Modal.CloseTrigger aria-label={t('close')} />
              </div>
              {activeModal === 'trash' ? (
                <p className='text-xs leading-relaxed text-muted'>{t('trashNotice')}</p>
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
  const t = useTranslations('Workspace.modals')

  return (
    <div className='flex flex-col gap-4'>
      <TextField aria-label={t('searchFieldAria')} variant='secondary'>
        <InputGroup>
          <InputGroup.Prefix>
            <Search aria-hidden className='size-4 shrink-0 text-muted' />
          </InputGroup.Prefix>
          <InputGroup.Input
            className={cn('h-10 pl-2', workspaceSearchInputClass)}
            placeholder={t('searchPlaceholder')}
          />
        </InputGroup>
      </TextField>
      <div className='flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-separator bg-surface-secondary/60 py-10 text-muted'>
        <FileText aria-hidden className='size-12 stroke-[1.25] text-muted opacity-40' />
        <p className='text-sm'>{t('noResults')}</p>
      </div>
    </div>
  )
}

function FavoritesModalBody() {
  const locale = useLocale()
  const t = useTranslations('Workspace.modals')
  const rows = getMockFavorites(locale)

  return (
    <div className='flex flex-col gap-3'>
      <TextField aria-label={t('filterFavoritesAria')} variant='secondary'>
        <Input
          className={cn('h-10', workspaceSearchInputClass)}
          placeholder={t('docTitlePlaceholder')}
        />
      </TextField>
      <div className='overflow-hidden rounded-lg border border-separator'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-surface-secondary text-muted'>
            <tr>
              <th className='px-3 py-2 font-medium'>{t('colTitle')}</th>
              <th className='px-3 py-2 text-right font-medium'>{t('colUpdated')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
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
  const t = useTranslations('Workspace.modals')

  return (
    <div className='flex min-h-[200px] flex-col items-center justify-center px-2 py-10 text-center'>
      <p className='max-w-sm text-sm leading-relaxed text-muted'>{t('shareEmpty')}</p>
    </div>
  )
}

function PublishModalBody() {
  const t = useTranslations('Workspace.modals')

  return (
    <div className='flex flex-col items-center justify-center gap-3 py-12 text-center text-muted'>
      <p className='text-sm text-foreground'>{t('publishEmpty')}</p>
    </div>
  )
}

function TrashModalBody() {
  const locale = useLocale()
  const t = useTranslations('Workspace.modals')
  const trashRows = getMockTrash(locale)

  return (
    <div className='flex flex-col gap-4'>
      <TextField aria-label={t('trashSearchAria')} variant='secondary'>
        <Input
          className={cn('h-10', workspaceSearchInputClass)}
          placeholder={t('docTitlePlaceholder')}
        />
      </TextField>
      <div className='overflow-hidden rounded-lg border border-separator'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-surface-secondary text-muted'>
            <tr>
              <th className='px-3 py-2 font-medium'>{t('colTitle')}</th>
              <th className='px-3 py-2 font-medium'>{t('colDeleted')}</th>
              <th className='px-3 py-2 font-medium'>{t('colActions')}</th>
            </tr>
          </thead>
          <tbody>
            {trashRows.map((row, i) => (
              <tr key={row.id} className='border-t border-separator'>
                <td className='px-3 py-2 text-foreground'>{row.title}</td>
                <td className='px-3 py-2 text-muted'>{row.deletedRelative}</td>
                <td className='px-3 py-2'>
                  {i === 0 ? (
                    <div className='flex flex-wrap gap-2'>
                      <button className={workspaceGhostButtonClass} type='button'>
                        {t('restore')}
                      </button>
                      <button className={workspaceDangerButtonClass} type='button'>
                        {t('delete')}
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
        {t('emptyTrash')}
      </Button>
    </div>
  )
}
