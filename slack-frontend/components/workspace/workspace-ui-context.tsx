'use client'

import * as React from 'react'

type ModalKey = 'search' | 'favorites' | 'share' | 'trash' | 'publish' | 'profile'

export type WorkspaceUIContextValue = {
  activeModal: ModalKey | null
  openModal: (key: ModalKey) => void
  closeModal: () => void
  /** 文档页右侧 AI 面板（与顶栏「AI 写作」、竖条 AI 按钮同步） */
  aiPanelOpen: boolean
  setAiPanelOpen: (open: boolean) => void
  toggleAiPanel: () => void
}

const WorkspaceUIContext = React.createContext<WorkspaceUIContextValue | null>(null)

export function WorkspaceUIProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = React.useState<ModalKey | null>(null)
  const [aiPanelOpen, setAiPanelOpen] = React.useState(true)

  const value = React.useMemo<WorkspaceUIContextValue>(
    () => ({
      activeModal,
      openModal: (key) => setActiveModal(key),
      closeModal: () => setActiveModal(null),
      aiPanelOpen,
      setAiPanelOpen,
      toggleAiPanel: () => setAiPanelOpen((o) => !o)
    }),
    [activeModal, aiPanelOpen]
  )

  return <WorkspaceUIContext.Provider value={value}>{children}</WorkspaceUIContext.Provider>
}

export function useWorkspaceUI() {
  const ctx = React.useContext(WorkspaceUIContext)

  if (!ctx) throw new Error('useWorkspaceUI must be used within WorkspaceUIProvider')

  return ctx
}
