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
    { menuKey: 'settings' as const, href: '/settings' },
    { menuKey: 'help' as const, href: '/help-feedback' }
  ],
  links: {
    github: 'https://github.com/clm1010/slack-off-ai',
    docs: '/docs'
  }
}
