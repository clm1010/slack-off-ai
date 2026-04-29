'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Group, Panel } from 'react-resizable-panels'

import { WorkspaceModals } from './modals/workspace-modals'
import { WorkspaceFooter } from './workspace-footer'
import { WorkspaceHeader } from './workspace-header'
import { WorkspaceSidebar } from './workspace-sidebar'
import { WorkspaceSplitSeparator } from './workspace-split-separator'
import { WorkspaceUIProvider } from './workspace-ui-context'

import { estimateWordCount, getMockDocById } from '@/lib/workspace-mock'

export function WorkspaceAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDoc = Boolean(pathname?.startsWith('/work/'))
  const documentId = isDoc && pathname ? pathname.slice('/work/'.length) : null
  const doc = documentId ? getMockDocById(documentId) : undefined

  const wordCount = React.useMemo(() => {
    if (!isDoc || !doc) return 0
    const text = `${doc.title}\n${doc.mockBody ?? ''}`

    return estimateWordCount(text)
  }, [doc, isDoc])

  return (
    <WorkspaceUIProvider>
      <Group className='h-full w-full bg-background' id='moyu-workspace' orientation='horizontal'>
        <Panel className='min-w-0' defaultSize='18' id='ws-sidebar' maxSize='42' minSize='12'>
          <WorkspaceSidebar />
        </Panel>
        <WorkspaceSplitSeparator />
        <Panel className='min-w-0' id='ws-main' minSize='48'>
          <div className='flex h-full min-w-0 w-full flex-col bg-background'>
            <WorkspaceHeader
              documentTitle={doc?.title}
              variant={isDoc ? 'document' : 'home'}
              wordCount={wordCount}
            />
            <div className='flex min-h-0 flex-1 flex-col overflow-hidden bg-background'>
              {children}
            </div>
            <WorkspaceFooter />
          </div>
        </Panel>
      </Group>
      <WorkspaceModals />
    </WorkspaceUIProvider>
  )
}
