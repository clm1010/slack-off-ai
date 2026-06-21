import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/** hydration 安全的「已挂载」判定：SSR 与首次客户端渲染均为 false */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}
