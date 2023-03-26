interface ImportMetaEnv {
  readonly MODE: string
  readonly PROD: string
  readonly DEV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
