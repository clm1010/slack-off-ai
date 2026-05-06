export type SiteConfig = typeof siteConfig

/** href 为无前缀路径名，由 next-intl Link 自动加 locale；文案键在 Site.nav / Site.navMenu */
export const siteConfig = {
  navItems: [
    { navKey: 'home' as const, href: '/' },
    { navKey: 'docs' as const, href: '/docs' },
    { navKey: 'pricing' as const, href: '/pricing' },
    { navKey: 'blog' as const, href: '/blog' },
    { navKey: 'about' as const, href: '/about' },
    { navKey: 'workspace' as const, href: '/home' }
  ],
  navMenuItems: [
    { menuKey: 'profile' as const, href: '/profile' },
    { menuKey: 'dashboard' as const, href: '/dashboard' },
    { menuKey: 'projects' as const, href: '/projects' },
    { menuKey: 'team' as const, href: '/team' },
    { menuKey: 'calendar' as const, href: '/calendar' },
    { menuKey: 'settings' as const, href: '/settings' },
    { menuKey: 'help' as const, href: '/help-feedback' },
    { menuKey: 'logout' as const, href: '/logout' }
  ],
  links: {
    github: 'https://github.com/heroui-inc/heroui',
    twitter: 'https://twitter.com/hero_ui',
    docs: 'https://heroui.com',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev'
  }
}
