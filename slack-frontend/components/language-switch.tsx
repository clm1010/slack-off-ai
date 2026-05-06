'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  DropdownTrigger,
  cn
} from '@heroui/react'
import { buttonVariants } from '@heroui/styles'
import { Languages } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'

export function LanguageSwitch() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('LanguageSwitch')

  return (
    <Dropdown>
      <DropdownTrigger
        aria-label={locale === 'zh' ? t('ariaLabelZh') : t('ariaLabelEn')}
        className={cn(
          buttonVariants({ isIconOnly: true, size: 'sm', variant: 'tertiary' }),
          'inline-flex items-center justify-center text-muted'
        )}
      >
        <Languages className='size-[22px]' strokeWidth={2} />
      </DropdownTrigger>
      <DropdownPopover>
        <DropdownMenu
          onAction={(key) => {
            if (key === 'zh' || key === 'en') router.replace(pathname, { locale: key })
          }}
        >
          <DropdownItem id='zh' textValue={t('zh')}>
            {t('zh')}
          </DropdownItem>
          <DropdownItem id='en' textValue={t('en')}>
            {t('en')}
          </DropdownItem>
        </DropdownMenu>
      </DropdownPopover>
    </Dropdown>
  )
}
