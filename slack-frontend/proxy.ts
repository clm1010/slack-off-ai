import NextAuth from 'next-auth'
import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'

import { routing } from './i18n/routing'

import { authConfig } from '@/lib/auth.config'
import { localeFromPath, resolvePreferredLocale, stripLocale } from '@/lib/locale'

const { auth } = NextAuth(authConfig)
const intlMiddleware = createIntlMiddleware(routing)

const PROTECTED_PREFIXES = ['/home', '/work', '/settings', '/notifications', '/template', '/chat']

function isProtectedPath(pathname: string) {
  const path = stripLocale(pathname)

  return PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

function localizedSignInUrl(origin: string, searchParams: URLSearchParams, cookieLocale?: string) {
  const locale = resolvePreferredLocale({
    pathname: searchParams.get('callbackUrl'),
    cookieLocale
  })
  const signInUrl = new URL(`/${locale}/signin`, origin)

  searchParams.forEach((value, key) => {
    signInUrl.searchParams.set(key, value)
  })

  return signInUrl
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const locale = localeFromPath(pathname) ?? routing.defaultLocale

  // Auth.js pages.signIn 指向 /signin，在此解析 locale 后再跳转
  if (pathname === '/signin' || pathname === '/signin/') {
    return NextResponse.redirect(
      localizedSignInUrl(
        req.nextUrl.origin,
        req.nextUrl.searchParams,
        req.cookies.get('NEXT_LOCALE')?.value
      )
    )
  }

  if (isProtectedPath(pathname) && !isLoggedIn) {
    const signInUrl = new URL(`/${locale}/signin`, req.nextUrl.origin)

    signInUrl.searchParams.set('callbackUrl', pathname)

    return NextResponse.redirect(signInUrl)
  }

  if (/^\/(zh|en)\/signin\/?$/.test(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.nextUrl.origin))
  }

  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
