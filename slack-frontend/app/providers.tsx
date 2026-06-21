'use client'

import type { ThemeProviderProps } from '@teispace/next-themes'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as AppThemeProvider } from '@teispace/next-themes'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <SessionProvider>
      <AppThemeProvider {...themeProps}>{children}</AppThemeProvider>
    </SessionProvider>
  )
}
