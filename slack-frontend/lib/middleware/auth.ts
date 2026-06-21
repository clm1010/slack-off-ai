import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export type DocumentAccessOp = 'read' | 'write'

export async function requireUser() {
  const session = await auth()

  if (!session?.user?.id) {
    return { session: null, error: NextResponse.json({ error: 'unauthorized' }, { status: 401 }) }
  }

  return { session, error: null }
}

/**
 * 校验当前用户对文档的访问权限（creator 或 workspace owner）。
 * Phase 6 分享 token 访问在此扩展。
 */
export async function requireDocumentAccess(
  userId: string,
  documentId: string,
  op: DocumentAccessOp = 'read'
) {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: {
      workspace: { select: { ownerId: true } }
    }
  })

  if (!document || document.isDeleted) {
    return {
      document: null,
      error: NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
  }

  const isCreator = document.creatorId === userId
  const isWorkspaceOwner = document.workspace.ownerId === userId

  if (!isCreator && !isWorkspaceOwner) {
    return {
      document: null,
      error: NextResponse.json({ error: 'forbidden' }, { status: 403 })
    }
  }

  if (op === 'write' && !isCreator && !isWorkspaceOwner) {
    return {
      document: null,
      error: NextResponse.json({ error: 'forbidden' }, { status: 403 })
    }
  }

  return { document, error: null }
}
