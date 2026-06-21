-- pg_trgm 中文全文搜索（Phase 2 search API 使用）
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;

CREATE INDEX IF NOT EXISTS idx_document_search_trgm
  ON "Document" USING gin ((coalesce("title", '') || ' ' || coalesce("contentText", '')) gin_trgm_ops)
  WHERE "isDeleted" = false;
