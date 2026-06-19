/**
 * Canonical / SEO 使用的站点根 URL（无尾部斜杠）。
 * 优先 `NEXT_PUBLIC_APP_URL`；部署在 Vercel 时可为 `VERCEL_URL`。
 */
export function getAbsoluteSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim()

  if (fromEnv) return fromEnv.replace(/\/+$/, '')
  const vercel = process.env.VERCEL_URL?.trim()

  if (vercel) return `https://${vercel.replace(/\/+$/, '')}`

  return 'http://localhost:3000'
}
