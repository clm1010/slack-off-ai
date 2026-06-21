import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

import { SignInForm } from '@/components/auth/signin-form'
import { LanguageSwitch } from '@/components/language-switch'
import { ThemeSwitch } from '@/components/theme-switch'
import { BrandMark } from '@/components/workspace/brand-mark'
import { isGitHubAuthEnabled, isGoogleAuthEnabled } from '@/lib/auth-providers'

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ verify?: string }>
}) {
  const { locale } = await params
  const { verify } = await searchParams
  const t = await getTranslations({ locale, namespace: 'Auth' })

  return { title: verify === '1' ? t('emailSentTitle') : t('title') }
}

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ verify?: string }>
}) {
  const { verify } = await searchParams
  const isVerify = verify === '1'

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      {!isVerify ? (
        <header className='flex h-16 items-center justify-between border-b border-separator px-6'>
          <BrandMark href='/' />
          <div className='flex items-center gap-1'>
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </header>
      ) : null}

      <main
        className={
          isVerify
            ? 'grid flex-1 place-items-center px-6'
            : 'grid flex-1 place-items-center px-6 pb-20'
        }
      >
        <Suspense fallback={null}>
          <SignInForm githubEnabled={isGitHubAuthEnabled()} googleEnabled={isGoogleAuthEnabled()} />
        </Suspense>
      </main>
    </div>
  )
}
