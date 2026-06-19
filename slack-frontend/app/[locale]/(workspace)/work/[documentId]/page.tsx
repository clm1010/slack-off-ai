import type { Metadata } from 'next'

import { DocumentEditorMock } from '@/components/workspace/pages/document-editor-mock'
import { buildLocaleAlternates } from '@/lib/metadata-alternates'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; documentId: string }>
}): Promise<Metadata> {
  const { locale, documentId } = await params

  return {
    ...buildLocaleAlternates(locale, `/work/${encodeURIComponent(documentId)}`)
  }
}

export default async function WorkDocumentPage({
  params
}: {
  params: Promise<{ locale: string; documentId: string }>
}) {
  const { documentId } = await params

  return <DocumentEditorMock documentId={documentId} />
}
