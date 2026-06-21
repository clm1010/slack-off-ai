'use client'

import { Avatar, cn } from '@heroui/react'

import { userInitials } from '@/lib/user-display'

type UserAvatarProps = {
  name?: string | null
  image?: string | null
  className?: string
  alt?: string
}

export function UserAvatar({ name, image, className, alt }: UserAvatarProps) {
  const initials = userInitials(name)
  const label = alt ?? name ?? 'User'

  return (
    <Avatar className={cn('shrink-0', className)}>
      {image ? <Avatar.Image alt={label} src={image} /> : null}
      <Avatar.Fallback className='text-xs font-medium'>{initials}</Avatar.Fallback>
    </Avatar>
  )
}
