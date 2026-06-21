#!/usr/bin/env node
/**
 * Phase 1 基础设施自检：数据库、pg_trgm、Auth 配置。
 * 用法：pnpm verify:phase1
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function loadEnvFile(name) {
  const path = join(root, name)
  if (!existsSync(path)) return

  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (process.env[key] === undefined) process.env[key] = value
  }
}

loadEnvFile('.env')
loadEnvFile('.env.local')

const checks = []

function pass(label) {
  checks.push({ label, ok: true })
  console.log(`✓ ${label}`)
}

function fail(label, detail) {
  checks.push({ label, ok: false, detail })
  console.error(`✗ ${label}${detail ? ` — ${detail}` : ''}`)
}

function warn(label, detail) {
  console.warn(`⚠ ${label}${detail ? ` — ${detail}` : ''}`)
}

if (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET) {
  pass('AUTH_SECRET 已配置')
} else {
  fail('AUTH_SECRET 未配置')
}

if (process.env.DATABASE_URL) {
  pass('DATABASE_URL 已配置')
} else {
  fail('DATABASE_URL 未配置')
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  pass('GitHub OAuth 凭据已配置')
} else {
  warn('GitHub OAuth 未配置', '在 .env.local 填写 GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET')
}

for (const file of ['lib/auth-providers.ts', 'lib/middleware/auth.ts']) {
  if (existsSync(join(root, file))) pass(`${file} 存在`)
  else fail(`${file} 缺失`)
}

const authMiddleware = readFileSync(join(root, 'lib/middleware/auth.ts'), 'utf8')
if (authMiddleware.includes('requireDocumentAccess')) {
  pass('requireDocumentAccess 已实现')
} else {
  fail('requireDocumentAccess 未找到')
}

try {
  execSync('pnpm exec prisma migrate status', {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  })
  pass('Prisma migrate status 可执行')
} catch (e) {
  fail('Prisma 迁移检查失败', e instanceof Error ? e.message : String(e))
}

try {
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()
  await prisma.$queryRaw`SELECT 1`
  pass('PostgreSQL 连接正常')

  const ext = await prisma.$queryRaw`
    SELECT extname FROM pg_extension WHERE extname IN ('pg_trgm', 'btree_gin')
  `
  const names = new Set(ext.map((r) => r.extname))
  if (names.has('pg_trgm') && names.has('btree_gin')) {
    pass('pg_trgm / btree_gin 扩展已安装')
  } else {
    fail('pg_trgm 扩展缺失', `found: ${[...names].join(', ') || 'none'}`)
  }

  const idx = await prisma.$queryRaw`
    SELECT indexname FROM pg_indexes WHERE indexname = 'idx_document_search_trgm'
  `
  if (idx.length > 0) {
    pass('文档搜索 GIN 索引已创建')
  } else {
    fail('idx_document_search_trgm 索引缺失')
  }

  await prisma.$disconnect()
} catch (e) {
  fail('数据库检查失败', e instanceof Error ? e.message : String(e))
}

const failed = checks.filter((c) => !c.ok).length
console.log(failed === 0 ? '\nPhase 1 自检通过' : `\n${failed} 项未通过`)
process.exit(failed === 0 ? 0 : 1)
