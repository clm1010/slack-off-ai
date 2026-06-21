'use client'

import { Button, cn, Input, Label, TextField } from '@heroui/react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

const githubButtonClass = cn(
  'h-11 w-full justify-center gap-2 rounded-lg border border-separator bg-surface font-normal text-foreground shadow-none',
  'hover:bg-surface-secondary pressed:opacity-90'
)

const emailSubmitButtonClass = cn(
  'h-11 w-full justify-center rounded-lg border-0 font-medium shadow-none ring-0',
  '!bg-foreground !text-background hover:opacity-90 pressed:opacity-90'
)

const emailInputClass = cn(
  'h-11 rounded-lg border border-separator bg-surface shadow-none',
  'placeholder:text-muted',
  'focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground/15'
)

const AUTH_ERROR_KEYS = {
  Configuration: 'githubError',
  OAuthSignin: 'githubError',
  OAuthCallback: 'githubError',
  OAuthAccountNotLinked: 'githubError',
  AccessDenied: 'githubError',
  Default: 'githubError'
} as const

type AuthErrorKey = keyof typeof AUTH_ERROR_KEYS

function resolveAuthErrorKey(error: string | null): AuthErrorKey | null {
  if (!error) return null

  return error in AUTH_ERROR_KEYS ? (error as AuthErrorKey) : 'Default'
}

export function SignInForm({
  githubEnabled,
  googleEnabled = false
}: {
  githubEnabled: boolean
  googleEnabled?: boolean
}) {
  const t = useTranslations('Auth')
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? `/${locale}/home`
  const verifyFromUrl = searchParams.get('verify') === '1'
  const authErrorKey = resolveAuthErrorKey(searchParams.get('error'))
  const [email, setEmail] = React.useState('')
  const [pending, setPending] = React.useState<'github' | 'google' | 'email' | null>(null)
  const [emailSent, setEmailSent] = React.useState(verifyFromUrl)
  const [error, setError] = React.useState<string | null>(
    authErrorKey ? t(AUTH_ERROR_KEYS[authErrorKey]) : null
  )

  async function handleOAuth(provider: 'github' | 'google') {
    setPending(provider)
    setError(null)
    await signIn(provider, { callbackUrl })
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setPending('email')
    setError(null)

    const result = await signIn('nodemailer', {
      email: email.trim(),
      callbackUrl,
      redirect: false
    })

    setPending(null)

    if (result?.error) {
      setError(t('emailError'))

      return
    }

    setEmailSent(true)

    const nextParams = new URLSearchParams(searchParams.toString())

    nextParams.set('verify', '1')
    router.replace(`/${locale}/signin?${nextParams.toString()}`, { scroll: false })
  }

  if (emailSent) {
    return (
      <div className='flex w-full max-w-[400px] flex-col gap-3 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight text-foreground'>
          {t('emailSentTitle')}
        </h1>
        <p className='text-sm text-muted'>{t('emailSentSubtitle')}</p>
      </div>
    )
  }

  const showOAuthDivider = githubEnabled || googleEnabled

  return (
    <div className='flex w-full max-w-[400px] flex-col gap-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight text-foreground'>{t('title')}</h1>
        <p className='text-sm text-muted'>
          {githubEnabled ? t('subtitle') : t('subtitleEmailOnly')}
        </p>
      </div>

      {githubEnabled ? (
        <Button
          className={githubButtonClass}
          isDisabled={pending !== null}
          isPending={pending === 'github'}
          type='button'
          onPress={() => handleOAuth('github')}
        >
          <Image
            aria-hidden
            alt=''
            className='size-4 dark:invert'
            height={16}
            src='/icons/github.svg'
            width={16}
          />
          {t('github')}
        </Button>
      ) : null}

      {googleEnabled ? (
        <Button
          className={githubButtonClass}
          isDisabled={pending !== null}
          isPending={pending === 'google'}
          type='button'
          onPress={() => handleOAuth('google')}
        >
          {t('google')}
        </Button>
      ) : null}

      {!githubEnabled && !googleEnabled ? (
        <p className='rounded-lg border border-separator bg-surface-secondary px-3 py-2 text-center text-xs text-muted'>
          {t('githubNotConfigured')}
        </p>
      ) : null}

      {showOAuthDivider ? (
        <div className='relative flex items-center gap-3'>
          <div className='h-px flex-1 bg-separator' />
          <span className='shrink-0 text-xs tracking-wide text-muted uppercase'>
            {t('orContinueWith')}
          </span>
          <div className='h-px flex-1 bg-separator' />
        </div>
      ) : null}

      <form className='flex flex-col gap-4' onSubmit={handleEmail}>
        <TextField name='email' type='email'>
          <Label className='text-sm font-medium text-foreground'>{t('emailLabel')}</Label>
          <Input
            autoComplete='email'
            className={emailInputClass}
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </TextField>
        <Button
          className={emailSubmitButtonClass}
          isDisabled={pending !== null}
          isPending={pending === 'email'}
          type='submit'
        >
          {t('emailSubmit')}
        </Button>
      </form>

      {error ? <p className='text-center text-sm text-danger'>{error}</p> : null}
    </div>
  )
}
