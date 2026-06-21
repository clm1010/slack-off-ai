'use client'

import { cn, SearchField } from '@heroui/react'

import { workspaceSearchFieldGroupClass, workspaceSearchFieldIconClass } from './workspace-styles'

type WorkspaceDocSearchFieldProps = {
  'aria-label': string
  name: string
  placeholder: string
  className?: string
}

/** 对标划水首页：HeroUI SearchField，白底细边框 + 内嵌搜索图标 */
export function WorkspaceDocSearchField({
  'aria-label': ariaLabel,
  name,
  placeholder,
  className
}: WorkspaceDocSearchFieldProps) {
  return (
    <SearchField
      fullWidth
      aria-label={ariaLabel}
      className={cn('w-full', className)}
      name={name}
      variant='primary'
    >
      <SearchField.Group className={workspaceSearchFieldGroupClass}>
        <SearchField.SearchIcon className={workspaceSearchFieldIconClass} />
        <SearchField.Input className='text-sm' placeholder={placeholder} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  )
}
