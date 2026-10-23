/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ERROR_REPORT_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
