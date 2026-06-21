import { NextResponse } from 'next/server'

import { requireUser } from '@/lib/middleware/auth'
import { prisma } from '@/lib/prisma'

type ProfilePayload = {
  name?: unknown
  image?: unknown
}

function parseProfileBody(body: ProfilePayload) {
  const updates: { name?: string; image?: string | null } = {}

  if (body.name !== undefined) {
    if (typeof body.name !== 'string') {
      return { error: 'invalid_name' as const, updates: null }
    }

    const name = body.name.trim()

    if (!name || name.length > 64) {
      return { error: 'invalid_name' as const, updates: null }
    }

    updates.name = name
  }

  if (body.image !== undefined) {
    if (body.image === null || body.image === '') {
      updates.image = null
    } else if (typeof body.image === 'string') {
      const image = body.image.trim()

      if (image.length > 2048) {
        return { error: 'invalid_image' as const, updates: null }
      }

      try {
        const url = new URL(image)

        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          return { error: 'invalid_image' as const, updates: null }
        }
      } catch {
        return { error: 'invalid_image' as const, updates: null }
      }

      updates.image = image
    } else {
      return { error: 'invalid_image' as const, updates: null }
    }
  }

  if (!updates.name && updates.image === undefined) {
    return { error: 'empty' as const, updates: null }
  }

  return { error: null, updates }
}

export async function GET() {
  const { session, error } = await requireUser()

  if (error) return error

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    select: { email: true, name: true, image: true }
  })

  if (!user) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  return NextResponse.json({
    email: user.email,
    name: user.name,
    image: user.image
  })
}

export async function PATCH(request: Request) {
  const { session, error } = await requireUser()

  if (error) return error

  let body: ProfilePayload

  try {
    body = (await request.json()) as ProfilePayload
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = parseProfileBody(body)

  if (parsed.error) {
    const status = parsed.error === 'empty' ? 400 : 422

    return NextResponse.json({ error: parsed.error }, { status })
  }

  const user = await prisma.user.update({
    where: { id: session!.user.id },
    data: parsed.updates!,
    select: { email: true, name: true, image: true }
  })

  return NextResponse.json({
    email: user.email,
    name: user.name,
    image: user.image
  })
}
