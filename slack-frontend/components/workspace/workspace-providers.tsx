'use client'

import * as React from 'react'

/** 工作台仅包一层根节点；主题由根 layout 的 ThemeProvider + html.dark 统一控制 */
export function WorkspaceProviders({ children }: { children: React.ReactNode }) {
  return (
    <div className='workspace-shell h-screen overflow-hidden bg-background text-foreground'>
      {children}
    </div>
  )
}
