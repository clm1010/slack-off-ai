/**
 * dev 包装脚本：透传给 `next dev --turbopack`，
 * 并把 Next 打印的 "Network" 那行里的 IP 替换成本机真实局域网 IP。
 *
 * 背景：开了代理（Clash/TUN 等）后会多出一块虚拟网卡，IP 落在 198.18.0.0/15
 * 这类 fake-ip 段，Next 默认会把它当成 Network 地址打印出来，但它无法被代理
 * 正确回环（浏览器访问会 502）。dev server 本身监听在 0.0.0.0，真实局域网 IP
 * 是可达的，这里只是把打印出来的地址纠正为真实 IP。
 */
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import os from 'node:os'
import readline from 'node:readline'

/** 需要排除的「非真实局域网」网段与网卡名关键字 */
const FAKE_IP_PREFIXES = ['198.18.', '198.19.', '169.254.']
const VIRTUAL_NAME_RE =
  /(vmware|virtualbox|vethernet|hyper-?v|wsl|loopback|tailscale|zerotier|tap|tun|clash|docker)/i

function isPrivate(ip) {
  return /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip)
}

function getLanIPv4() {
  const ifaces = os.networkInterfaces()
  const candidates = []

  for (const [name, addrs] of Object.entries(ifaces)) {
    for (const a of addrs ?? []) {
      if (a.family !== 'IPv4' || a.internal) continue
      if (FAKE_IP_PREFIXES.some((p) => a.address.startsWith(p))) continue

      candidates.push({ name, ip: a.address, virtual: VIRTUAL_NAME_RE.test(name) })
    }
  }

  // 优先：物理网卡 + 私有网段 > 私有网段 > 其它
  const score = (c) => (c.virtual ? 0 : 2) + (isPrivate(c.ip) ? 1 : 0)
  candidates.sort((a, b) => score(b) - score(a))

  return candidates[0]?.ip ?? null
}

const lan = getLanIPv4()
const ipv4Re = /\d{1,3}(?:\.\d{1,3}){3}/

// 直接用 node 调用 Next CLI 入口，避免 shell:true 带来的 DEP0190 警告与跨平台差异
const require = createRequire(import.meta.url)
const nextBin = require.resolve('next/dist/bin/next')

const child = spawn(process.execPath, [nextBin, 'dev', '--turbopack', ...process.argv.slice(2)], {
  stdio: ['inherit', 'pipe', 'inherit'],
  env: { FORCE_COLOR: '1', ...process.env }
})

const rl = readline.createInterface({ input: child.stdout })

rl.on('line', (line) => {
  // 仅改写 Network 行，且仅当我们找到了真实局域网 IP 时
  const out = lan && /Network:/.test(line) && ipv4Re.test(line) ? line.replace(ipv4Re, lan) : line

  process.stdout.write(out + '\n')
})

const forward = (sig) => child.kill(sig)
process.on('SIGINT', forward)
process.on('SIGTERM', forward)
child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  else process.exit(code ?? 0)
})
