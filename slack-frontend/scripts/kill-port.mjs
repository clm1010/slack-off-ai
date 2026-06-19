/**
 * 停掉占用指定端口的进程（默认 3000）。
 *
 * 用法：
 *   pnpm kill-port            # 杀掉占用 3000 的进程
 *   pnpm kill-port 3001       # 杀掉占用 3001 的进程
 *   PORT=4000 pnpm kill-port  # 用环境变量指定端口
 *
 * 跨平台：Windows 用 netstat + taskkill，macOS/Linux 用 lsof + kill。
 */
import { execSync } from 'node:child_process'

const port = Number(process.argv[2] ?? process.env.PORT ?? 3000)

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  console.error(`✖ 无效端口：${process.argv[2] ?? process.env.PORT}`)
  process.exit(1)
}

const sh = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })

function getPidsWindows() {
  let out = ''

  try {
    out = sh(`netstat -ano -p tcp`)
  } catch {
    return []
  }

  const pids = new Set()

  for (const line of out.split(/\r?\n/)) {
    // 列：Proto  本地地址  外部地址  状态  PID
    const cols = line.trim().split(/\s+/)

    if (cols.length < 5) continue

    const local = cols[1]
    const state = cols[3]
    const pid = cols[4]

    // 仅匹配本地地址以 :port 结尾、且处于 LISTENING 的行
    if (state === 'LISTENING' && /[:.]/.test(local) && local.endsWith(`:${port}`)) {
      if (/^\d+$/.test(pid) && pid !== '0') pids.add(pid)
    }
  }

  return [...pids]
}

function getPidsUnix() {
  try {
    return sh(`lsof -ti tcp:${port} -sTCP:LISTEN`)
      .split(/\s+/)
      .filter((p) => /^\d+$/.test(p))
  } catch {
    return []
  }
}

const isWin = process.platform === 'win32'
const pids = isWin ? getPidsWindows() : getPidsUnix()

if (pids.length === 0) {
  console.log(`✔ 端口 ${port} 当前空闲，无需处理`)
  process.exit(0)
}

let killed = 0

for (const pid of pids) {
  try {
    if (isWin) sh(`taskkill /F /T /PID ${pid}`)
    else sh(`kill -9 ${pid}`)

    killed += 1
    console.log(`✔ 已停止占用端口 ${port} 的进程 PID ${pid}`)
  } catch {
    console.error(`✖ 无法停止 PID ${pid}（可能权限不足或进程已退出）`)
  }
}

process.exit(killed > 0 ? 0 : 1)
