import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  // locale 无关入口；proxy.ts 会按 callbackUrl / cookie 重定向到 /{locale}/signin
  pages: {
    signIn: '/signin'
  },
  providers: [],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.planType = (user as { planType?: string }).planType ?? 'free'
        token.name = user.name
        token.picture = user.image
      }

      if (trigger === 'update' && session) {
        if (session.name !== undefined) token.name = session.name
        if (session.image !== undefined) token.picture = session.image
      }

      return token
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
        session.user.planType = (token.planType as string | undefined) ?? 'free'
        session.user.name = token.name as string | null | undefined
        session.user.image = token.picture as string | null | undefined
      }

      return session
    }
  },
  trustHost: true
} satisfies NextAuthConfig
