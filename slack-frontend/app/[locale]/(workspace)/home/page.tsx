import type { Metadata } from 'next'

import { HomeOverview } from '@/components/workspace/pages/home-overview'
import { buildLocaleAlternates } from '@/lib/metadata-alternates'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    ...buildLocaleAlternates(locale, '/home')
  }
}

export default function WorkspaceHomePage() {
  return <HomeOverview />
}
