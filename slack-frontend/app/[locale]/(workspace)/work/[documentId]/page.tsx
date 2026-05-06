import { DocumentEditorMock } from '@/components/workspace/pages/document-editor-mock'

export default async function WorkDocumentPage({
  params
}: {
  params: Promise<{ locale: string; documentId: string }>
}) {
  const { documentId } = await params

  return <DocumentEditorMock documentId={documentId} />
}
