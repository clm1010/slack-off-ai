/** @type {import('next').NextConfig} */
/**
 * Next 的 allowedDevOrigins 按「主机名」匹配（见报错里的 from "192.168.188.129"）。
 * 支持在环境变量里写完整 Origin URL，此处统一抽取 hostname，避免与官方示例不一致导致仍被拦截。
 */
function normalizeAllowedDevOrigin(entry) {
  const s = entry.trim()
  if (!s) return null
  if (s.startsWith('*.')) return s
  try {
    const withScheme = /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//i.test(s)
      ? s
      : `http://${s}`
    return new URL(withScheme).hostname
  } catch {
    return s.replace(/^https?:\/\//i, '').split('/')[0]?.split(':')[0] || null
  }
}

const rawList = process.env.ALLOWED_DEV_ORIGINS?.split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const allowedDevOriginsEnv = rawList?.length
  ? [...new Set(rawList.map(normalizeAllowedDevOrigin).filter(Boolean))]
  : null

const nextConfig = {
  allowedDevOrigins:
    allowedDevOriginsEnv?.length ? allowedDevOriginsEnv : ['192.168.1.70'],
}

export default nextConfig
