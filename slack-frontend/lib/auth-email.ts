import { getAbsoluteSiteUrl } from '@/lib/site-url'

export function getAuthBaseUrl(): string {
  const fromEnv = process.env.AUTH_URL?.trim() ?? process.env.NEXTAUTH_URL?.trim()

  if (fromEnv) return fromEnv.replace(/\/+$/, '')

  return getAbsoluteSiteUrl()
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export type MagicLinkEmailContent = {
  subject: string
  text: string
  html: string
}

export function buildMagicLinkEmail(url: string): MagicLinkEmailContent {
  const host = new URL(getAuthBaseUrl()).host
  const safeUrl = escapeHtml(url)
  const safeHost = escapeHtml(host)

  const subject = `登录 ${host}`
  const text = [
    `登录 ${host}`,
    '',
    '点击下方链接登录：',
    url,
    '',
    '如非本人操作，可忽略此邮件。'
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:480px;">
          <tr>
            <td align="center" style="padding-bottom:32px;font-size:20px;line-height:28px;color:#111827;">
              登录 <strong>${safeHost}</strong>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <a href="${safeUrl}" rel="noopener noreferrer" style="display:inline-block;padding:12px 28px;background:#2563eb;color:#ffffff;font-size:15px;font-weight:500;text-decoration:none;border-radius:8px;">
                登录
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size:13px;line-height:20px;color:#6b7280;">
              如非本人操作，可忽略此邮件。
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, text, html }
}
