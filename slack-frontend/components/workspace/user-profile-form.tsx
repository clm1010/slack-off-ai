'use client'

import { Button, cn, Input, Label, TextField } from '@heroui/react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { UserAvatar } from './user-avatar'
import { workspaceFormSubmitButtonClass, workspaceSearchInputClass } from './workspace-styles'

type ProfileData = {
  email: string | null
  name: string | null
  image: string | null
}

type UserProfileFormProps = {
  layout?: 'modal' | 'page'
}

export function UserProfileForm({ layout = 'modal' }: UserProfileFormProps) {
  const t = useTranslations('Workspace.profile')
  const { data: session, update } = useSession()
  const [profile, setProfile] = React.useState<ProfileData | null>(null)
  const [name, setName] = React.useState('')
  const [image, setImage] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false

    async function loadProfile() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/user/profile')

        if (!res.ok) throw new Error('load_failed')

        const data = (await res.json()) as ProfileData

        if (cancelled) return

        setProfile(data)
        setName(data.name ?? '')
        setImage(data.image ?? '')
      } catch {
        if (!cancelled) setError(t('loadError'))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadProfile()

    return () => {
      cancelled = true
    }
  }, [t])

  const previewName = name.trim() || profile?.name || session?.user?.name
  const previewImage = image.trim() || profile?.image || session?.user?.image

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          image: image.trim() || null
        })
      })

      if (!res.ok) throw new Error('save_failed')

      const data = (await res.json()) as ProfileData

      setProfile(data)
      setName(data.name ?? '')
      setImage(data.image ?? '')
      await update({
        name: data.name ?? undefined,
        image: data.image ?? undefined
      })
      setSuccess(true)
    } catch {
      setError(t('saveError'))
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = cn('h-10', workspaceSearchInputClass)

  if (loading) {
    return <p className='text-sm text-muted'>{t('loading')}</p>
  }

  return (
    <form
      className={cn('flex flex-col gap-4', layout === 'page' && 'max-w-md')}
      onSubmit={handleSubmit}
    >
      <TextField isDisabled name='email'>
        <Label className='text-sm text-foreground'>{t('email')}</Label>
        <Input
          readOnly
          className={cn(fieldClass, 'text-muted')}
          value={profile?.email ?? session?.user?.email ?? ''}
        />
      </TextField>

      <TextField name='name'>
        <Label className='text-sm text-foreground'>{t('name')}</Label>
        <Input
          className={fieldClass}
          maxLength={64}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </TextField>

      <div className='flex flex-col gap-2'>
        <Label className='text-sm text-foreground'>{t('avatar')}</Label>
        <div className='flex items-center gap-3'>
          <UserAvatar className='size-10' image={previewImage} name={previewName} />
          <TextField className='min-w-0 flex-1' name='image'>
            <Input
              className={fieldClass}
              placeholder={t('avatarPlaceholder')}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </TextField>
        </div>
      </div>

      {error ? <p className='text-sm text-[var(--danger)]'>{error}</p> : null}
      {success ? <p className='text-sm text-muted'>{t('saved')}</p> : null}

      <Button
        className={workspaceFormSubmitButtonClass}
        isDisabled={submitting || !name.trim()}
        isPending={submitting}
        type='submit'
        variant='primary'
      >
        {t('submit')}
      </Button>
    </form>
  )
}
