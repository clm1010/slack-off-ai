import type { Metadata } from 'next'

import { HomeHero } from '@/components/marketing/home-hero'
import { buildLocaleAlternates } from '@/lib/metadata-alternates'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    ...buildLocaleAlternates(locale, '/')
  }
}

export default function Home() {
  return <HomeHero />
}
