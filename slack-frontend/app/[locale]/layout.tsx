import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Providers } from '../providers'

import { routing } from '@/i18n/routing'
import { fontSans } from '@/config/fonts'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  const siteName = t('siteName')

  return {
    title: {
      default: siteName,
      template: `%s - ${siteName}`
    },
    description: t('siteDescription'),
    icons: {
      icon: '/favicon.ico'
    }
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()
  const htmlLang = locale === 'zh' ? 'zh-CN' : 'en'

  return (
    <html suppressHydrationWarning lang={htmlLang}>
      <head />
      <body
        suppressHydrationWarning
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark', enableSystem: true }}>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
