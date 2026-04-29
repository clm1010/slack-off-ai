'use client'

import * as React from 'react'

type ModalKey = 'search' | 'favorites' | 'share' | 'trash' | 'publish'

export type WorkspaceUIContextValue = {
  activeModal: ModalKey | null
  openModal: (key: ModalKey) => void
  closeModal: () => void
}

const WorkspaceUIContext = React.createContext<WorkspaceUIContextValue | null>(null)

export function WorkspaceUIProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = React.useState<ModalKey | null>(null)

  const value = React.useMemo<WorkspaceUIContextValue>(
    () => ({
      activeModal,
      openModal: (key) => setActiveModal(key),
      closeModal: () => setActiveModal(null)
    }),
    [activeModal]
  )

  return <WorkspaceUIContext.Provider value={value}>{children}</WorkspaceUIContext.Provider>
}

export function useWorkspaceUI() {
  const ctx = React.useContext(WorkspaceUIContext)

  if (!ctx) throw new Error('useWorkspaceUI must be used within WorkspaceUIProvider')

  return ctx
}
