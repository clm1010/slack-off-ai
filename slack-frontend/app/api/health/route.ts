import { isGitHubAuthEnabled, isGoogleAuthEnabled } from '@/lib/auth-providers'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`

    return Response.json({
      status: 'ok',
      db: 'connected',
      auth: {
        github: isGitHubAuthEnabled(),
        google: isGoogleAuthEnabled()
      }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error'

    return Response.json({ status: 'error', db: 'disconnected', message }, { status: 503 })
  }
}
