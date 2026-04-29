'use client'

import { FC } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

export interface ThemeSwitchProps {
  className?: string
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { setTheme, resolvedTheme } = useTheme()

  const isLight = resolvedTheme === 'light'

  const handleToggle = () => {
    setTheme(isLight ? 'dark' : 'light')
  }

  return (
    <button
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className={clsx(
        'px-px transition-opacity hover:opacity-80 cursor-pointer',
        'inline-flex items-center justify-center',
        'w-auto h-auto bg-transparent rounded-lg text-muted',
        className
      )}
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
