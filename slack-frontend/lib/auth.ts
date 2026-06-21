import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { authConfig } from '@/lib/auth.config'
import { buildAuthProviders } from '@/lib/auth-providers'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: buildAuthProviders(),
  events: {
    async createUser({ user }) {
      if (!user.id) return

      const displayName = user.name ?? '我'

      await prisma.workspace.create({
        data: {
          name: `${displayName}的空间`,
          slug: `personal-${user.id}`,
          ownerId: user.id,
          isPersonal: true
        }
      })

      logger.info('[auth] personal workspace created', { userId: user.id })
    },
    async signIn({ user, account, isNewUser }) {
      logger.info('[auth] sign in', {
        userId: user.id,
        provider: account?.provider,
        isNewUser
      })
    }
  }
})
