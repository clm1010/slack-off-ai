import { getTranslations } from 'next-intl/server'

import { UserProfileForm } from '@/components/workspace/user-profile-form'

export default async function SettingsPage() {
  const t = await getTranslations('Workspace.profile')

  return (
    <div className='flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-8'>
      <h1 className='mb-6 text-lg font-semibold text-foreground'>{t('title')}</h1>
      <UserProfileForm layout='page' />
    </div>
  )
}
