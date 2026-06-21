import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      planType: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    planType?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    planType?: string
    name?: string | null
    picture?: string | null
  }
}
