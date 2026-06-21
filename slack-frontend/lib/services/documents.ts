import {
  estimateWordCount,
  getMockDocById,
  getMockDocs,
  getMockFavorites,
  getMockRecent,
  getMockShared,
  getMockTrash,
  isUntitledDoc
} from '@/lib/workspace-mock'

/** 文档服务层：Phase 2 起替换为真实 API，UI 只依赖此模块 */
export const documentService = {
  list: getMockDocs,
  getById: getMockDocById,
  listRecent: getMockRecent,
  listFavorites: getMockFavorites,
  listShared: getMockShared,
  listTrash: getMockTrash,
  estimateWordCount,
  isUntitled: isUntitledDoc
}
