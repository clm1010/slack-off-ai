'use client'

import { useState } from 'react'
import { Button, Kbd, Link, TextField, InputGroup } from '@heroui/react'
import { Bird, FolderGit2, Heart, Menu, MessagesSquare, Search, Sparkles, X } from 'lucide-react'
import NextLink from 'next/link'
import clsx from 'clsx'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const searchInput = (
    <TextField aria-label='Search' type='search'>
      <InputGroup>
        <InputGroup.Prefix>
          <Search
            aria-hidden
            className='pointer-events-none size-4 shrink-0 text-muted'
            strokeWidth={2}
          />
        </InputGroup.Prefix>
        <InputGroup.Input className='text-sm' placeholder='Search...' />
        <InputGroup.Suffix>
          <Kbd className='hidden lg:inline-flex'>
            <Kbd.Abbr keyValue='command' />
            <Kbd.Content>K</Kbd.Content>
          </Kbd>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  )

  return (
    <nav className='sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg'>
      <header className='mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6'>
        <div className='flex items-center gap-4'>
          <NextLink className='flex items-center gap-1' href='/'>
            <Sparkles aria-hidden className='size-9 shrink-0 text-foreground' strokeWidth={2} />
            <p className='font-bold text-inherit'>{siteConfig.name}</p>
          </NextLink>
          <ul className='ml-2 hidden gap-4 lg:flex'>
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <NextLink
                  className={clsx(
                    'text-foreground hover:text-accent transition-colors',
                    'data-[active=true]:text-accent data-[active=true]:font-medium'
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        <div className='hidden items-center gap-2 sm:flex'>
          <Link
            aria-label='Twitter'
            href={siteConfig.links.twitter}
            rel='noopener noreferrer'
            target='_blank'
          >
            <Bird className='text-muted' size={24} strokeWidth={2} />
          </Link>
          <Link
            aria-label='Discord'
            href={siteConfig.links.discord}
            rel='noopener noreferrer'
            target='_blank'
          >
            <MessagesSquare className='text-muted' size={24} strokeWidth={2} />
          </Link>
          <Link
            aria-label='Github'
            href={siteConfig.links.github}
            rel='noopener noreferrer'
            target='_blank'
          >
            <FolderGit2 className='text-muted' size={24} strokeWidth={2} />
          </Link>
          <ThemeSwitch />
          <div className='hidden lg:flex'>{searchInput}</div>
          <div className='hidden md:flex'>
            <Button
              className='text-sm font-normal'
              variant='tertiary'
              onPress={() => window.open(siteConfig.links.sponsor, '_blank')}
            >
              <Heart
                aria-hidden
                className='text-danger'
                fill='currentColor'
                size={18}
                strokeWidth={2}
              />
              Sponsor
            </Button>
          </div>
        </div>

        <div className='flex items-center gap-2 sm:hidden'>
          <Link
            aria-label='Github'
            href={siteConfig.links.github}
            rel='noopener noreferrer'
            target='_blank'
          >
            <FolderGit2 className='text-muted' size={24} strokeWidth={2} />
          </Link>
          <ThemeSwitch />
          <button
            aria-expanded={isMenuOpen}
            aria-label='Toggle menu'
            className='p-2'
            type='button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X aria-hidden className='size-6 text-foreground' strokeWidth={2} />
            ) : (
              <Menu aria-hidden className='size-6 text-foreground' strokeWidth={2} />
            )}
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className='border-t border-separator sm:hidden'>
          <div className='p-4'>{searchInput}</div>
          <ul className='flex flex-col gap-2 px-4 pb-4'>
            {siteConfig.navMenuItems.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <Link
                  className={clsx(
                    'block py-2 text-lg no-underline',
                    index === 2
                      ? 'text-accent'
                      : index === siteConfig.navMenuItems.length - 1
                        ? 'text-danger'
                        : 'text-foreground'
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  )
}
