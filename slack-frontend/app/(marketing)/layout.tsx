import { Navbar } from '@/components/navbar'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex flex-col min-h-screen'>
      <Navbar />
      <main className='container mx-auto max-w-7xl pt-16 px-6 flex-grow'>{children}</main>
      <footer className='w-full flex items-center justify-center py-3 text-sm text-muted'>
        <span>摸鱼AI · 由 HeroUI 与 Next.js 驱动</span>
      </footer>
    </div>
  )
}
