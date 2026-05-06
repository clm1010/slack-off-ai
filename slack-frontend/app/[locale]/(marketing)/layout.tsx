import { MarketingFooter } from '@/components/marketing-footer'
import { Navbar } from '@/components/navbar'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Navbar />
      <main className='container mx-auto flex max-w-7xl grow flex-col px-6 pt-16'>{children}</main>
      <MarketingFooter />
    </div>
  )
}
