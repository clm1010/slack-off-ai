/**
 * 仓库根在上一级（slack-off-ai/.git），husky 安装在 slack-frontend/.husky。
 * `pnpm husky` 会在当前目录找 .git 并报错，因此在 prepare 里改为设置 core.hooksPath。
 */
import { execFileSync } from 'child_process'
import { existsSync } from 'fs'
import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = join(__dirname, '..')
const huskyDir = join(pkgRoot, '.husky')

if (!existsSync(huskyDir)) {
  console.warn('[prepare] 未找到 .husky，跳过 Git hooks 配置')
  process.exit(0)
}

let gitRoot

try {
  gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: pkgRoot,
    encoding: 'utf8'
  }).trim()
} catch {
  console.warn('[prepare] 当前不是 Git 仓库，跳过 hooks（例如仅下载源码压缩包时）')
  process.exit(0)
}

const rel = relative(gitRoot, huskyDir).split('\\').join('/')

if (!rel || rel.startsWith('..')) {
  console.warn('[prepare] 无法解析 .husky 相对路径:', rel)
  process.exit(0)
}

execFileSync('git', ['config', 'core.hooksPath', rel], { cwd: gitRoot, stdio: 'inherit' })
