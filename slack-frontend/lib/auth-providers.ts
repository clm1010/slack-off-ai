import type { Provider } from 'next-auth/providers'

import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'

import { buildMagicLinkEmail } from '@/lib/auth-email'
import { logger } from '@/lib/logger'

export function isGitHubAuthEnabled() {
  return Boolean(process.env.GITHUB_CLIENT_ID?.trim() && process.env.GITHUB_CLIENT_SECRET?.trim())
}

export function isGoogleAuthEnabled() {
  return Boolean(process.env.GOOGLE_CLIENT_ID?.trim() && process.env.GOOGLE_CLIENT_SECRET?.trim())
}

function isEmailSendingConfigured() {
  return Boolean(process.env.EMAIL_SERVER || process.env.EMAIL_SMTP_HOST)
}

async function createMailTransport() {
  const { createTransport } = await import('nodemailer')

  if (process.env.EMAIL_SMTP_HOST) {
    return createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: Number(process.env.EMAIL_SMTP_PORT ?? 465),
      secure: process.env.EMAIL_SMTP_SECURE !== 'false',
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS
      }
    })
  }

  return createTransport(process.env.EMAIL_SERVER!)
}

export function buildAuthProviders(): Provider[] {
  const providers: Provider[] = []

  if (isGitHubAuthEnabled()) {
    providers.push(
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        allowDangerousEmailAccountLinking: true
      })
    )
  } else {
    logger.warn('[auth] GitHub OAuth disabled — set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET')
  }

  if (isGoogleAuthEnabled()) {
    providers.push(
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        allowDangerousEmailAccountLinking: true
      })
    )
  }

  providers.push(
    Nodemailer({
      id: 'nodemailer',
      server:
        process.env.EMAIL_SERVER ??
        ({
          host: 'localhost',
          port: 1025,
          auth: { user: 'dev', pass: 'dev' }
        } as const),
      from: process.env.EMAIL_FROM ?? 'noreply@localhost',
      sendVerificationRequest: async ({ identifier, url }) => {
        if (!isEmailSendingConfigured()) {
          logger.info('[auth] magic link (dev, no EMAIL_SERVER)', { email: identifier, url })

          return
        }

        const transport = await createMailTransport()
        const from = process.env.EMAIL_FROM ?? 'noreply@localhost'
        const { subject, text, html } = buildMagicLinkEmail(url)

        await transport.sendMail({
          to: identifier,
          from,
          subject,
          text,
          html
        })
      }
    })
  )

  return providers
}
