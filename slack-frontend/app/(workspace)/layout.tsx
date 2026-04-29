import { WorkspaceAppShell } from '@/components/workspace/app-shell'
import { WorkspaceProviders } from '@/components/workspace/workspace-providers'

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProviders>
      <WorkspaceAppShell>{children}</WorkspaceAppShell>
    </WorkspaceProviders>
  )
}
