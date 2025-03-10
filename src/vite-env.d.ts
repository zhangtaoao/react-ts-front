/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'development' | 'production';
  readonly VITE_APP_API: string;
  readonly VITE_APP_BASE: string;
  readonly VITE_BUILD_COMPRESS?: 'gzip' | 'brotli';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}