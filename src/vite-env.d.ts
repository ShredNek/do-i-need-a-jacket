/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  VITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
