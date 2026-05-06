export type MockLocale = 'zh' | 'en'

export type MockDoc = {
  id: string
  title: string
  emoji?: string
  updatedAt: string
  createdAt: string
  mockBody?: string
  /** 首页卡片：相对时间展示 */
  cardRelative?: string
  isFavorite?: boolean
  /** 侧栏「无标题」粉色激活态 */
  untitled?: boolean
}

export type MockTrashItem = {
  id: string
  title: string
  deletedRelative: string
}

const MOCK_DOCS_ZH: MockDoc[] = [
  {
    id: 'muyu-intro',
    title: '摸鱼AI 是什么',
    emoji: '🧠',
    updatedAt: '2026-04-29 14:20',
    createdAt: '2026-04-20 10:00',
    cardRelative: '4 个月前',
    mockBody: '摸鱼AI 产品介绍与使用说明（占位）。'
  },
  {
    id: 'untitled-doc',
    title: '<无标题>',
    emoji: '✏️',
    updatedAt: '2026-04-28 08:22',
    createdAt: '2026-04-28 00:21',
    cardRelative: '1 天前',
    mockBody: '',
    untitled: true
  },
  {
    id: 'cm527gjtx0006cv3tunk5nrmx',
    title: '欢迎使用摸鱼AI',
    emoji: '👋',
    updatedAt: '2026-04-29 14:20',
    createdAt: '2026-04-28 09:00',
    cardRelative: '1 分钟前',
    mockBody:
      '这是一篇与工作台 UI 对齐的占位正文。真实环境将由 Tiptap 编辑器替代。\n\n你可以从侧栏切换到其他示例文档，或在本页查看右侧 AI 面板与快捷操作按钮。'
  },
  {
    id: 'ff62d4a5-2391-4922-9c09-118c7888801f',
    title: '项目需求草稿',
    emoji: '📝',
    updatedAt: '2026-04-27 18:02',
    createdAt: '2026-04-26 11:30',
    cardRelative: '2 天前'
  }
]

const MOCK_DOCS_EN: MockDoc[] = [
  {
    id: 'muyu-intro',
    title: 'What is Moyu AI',
    emoji: '🧠',
    updatedAt: '2026-04-29 14:20',
    createdAt: '2026-04-20 10:00',
    cardRelative: '4 months ago',
    mockBody: 'Product overview placeholder for Moyu AI.'
  },
  {
    id: 'untitled-doc',
    title: '<Untitled>',
    emoji: '✏️',
    updatedAt: '2026-04-28 08:22',
    createdAt: '2026-04-28 00:21',
    cardRelative: '1 day ago',
    mockBody: '',
    untitled: true
  },
  {
    id: 'cm527gjtx0006cv3tunk5nrmx',
    title: 'Welcome to Moyu AI',
    emoji: '👋',
    updatedAt: '2026-04-29 14:20',
    createdAt: '2026-04-28 09:00',
    cardRelative: '1 minute ago',
    mockBody:
      'Placeholder body aligned with the workspace UI. In production this will be replaced by the Tiptap editor.\n\nSwitch docs from the sidebar or try the AI panel on the right.'
  },
  {
    id: 'ff62d4a5-2391-4922-9c09-118c7888801f',
    title: 'Requirements draft',
    emoji: '📝',
    updatedAt: '2026-04-27 18:02',
    createdAt: '2026-04-26 11:30',
    cardRelative: '2 days ago'
  }
]

const MOCK_TRASH_ZH: MockTrashItem[] = [
  { id: 'tr1', title: '<无标题>', deletedRelative: '5 秒前' },
  { id: 'tr2', title: '<无标题>', deletedRelative: '41 秒前' },
  { id: 'tr3', title: '<无标题>', deletedRelative: '44 秒前' }
]

const MOCK_TRASH_EN: MockTrashItem[] = [
  { id: 'tr1', title: '<Untitled>', deletedRelative: '5 seconds ago' },
  { id: 'tr2', title: '<Untitled>', deletedRelative: '41 seconds ago' },
  { id: 'tr3', title: '<Untitled>', deletedRelative: '44 seconds ago' }
]

function resolveLocale(locale: string): MockLocale {
  return locale === 'en' ? 'en' : 'zh'
}

export function getMockDocs(locale: string): MockDoc[] {
  return resolveLocale(locale) === 'en' ? MOCK_DOCS_EN : MOCK_DOCS_ZH
}

export function getMockDocById(id: string, locale: string): MockDoc | undefined {
  return getMockDocs(locale).find((d) => d.id === id)
}

export function getMockTrash(locale: string): MockTrashItem[] {
  return resolveLocale(locale) === 'en' ? MOCK_TRASH_EN : MOCK_TRASH_ZH
}

export function getMockFavorites(locale: string): MockDoc[] {
  const docs = getMockDocs(locale)

  return [
    {
      ...docs[0],
      isFavorite: true,
      emoji: '🐱',
      cardRelative: resolveLocale(locale) === 'en' ? '2 days ago' : '2 天前'
    }
  ]
}

export function getMockRecent(locale: string): MockDoc[] {
  return getMockDocs(locale)
}

export function getMockShared(_locale: string): MockDoc[] {
  return []
}

export function estimateWordCount(text: string): number {
  return text.replace(/\s/g, '').length || 0
}

/** 无标题文档：侧栏粉色激活态 */
export function isUntitledDoc(doc: Pick<MockDoc, 'title' | 'untitled'>): boolean {
  return doc.untitled === true
}
