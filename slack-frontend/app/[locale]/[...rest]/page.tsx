import { notFound } from 'next/navigation'

/**
 * 吸收「无前缀匹配的」多段路径（如 /zh/this-is-not-a-real-page），再主动 notFound，
 * 才能命中同级的 `[locale]/not-found.tsx`。否则框架直接走根级内置 404。
 */
export default function UnmatchedLocalizedPathCatchAll() {
  notFound()
}
