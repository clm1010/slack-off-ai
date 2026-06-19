'use client'

import { FC, useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@teispace/next-themes'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export interface ThemeSwitchProps {
  className?: string
}

const emptySubscribe = () => () => {}

/** hydration 安全的「已挂载」判定：SSR 与首次客户端渲染均为 false，避免主题图标 SSR/CSR 不一致 */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { setTheme, resolvedTheme } = useTheme()
  const t = useTranslations('ThemeSwitch')

  const mounted = useMounted()
  const isLight = mounted && resolvedTheme === 'light'

  const handleToggle = () => {
    setTheme(isLight ? 'dark' : 'light')
  }

  return (
    <button
      aria-label={isLight ? t('switchToDark') : t('switchToLight')}
      className={clsx(
        'px-px transition-opacity hover:opacity-80 cursor-pointer',
        'inline-flex items-center justify-center',
        'w-auto h-auto bg-transparent rounded-lg text-muted',
        className
      )}
      type='button'
      onClick={handleToggle}
    >
      {isLight ? (
        <Sun className='size-[22px]' strokeWidth={2} />
      ) : (
        <Moon className='size-[22px]' strokeWidth={2} />
      )}
    </button>
  )
}
