/// <reference types="vite/client" />
/// <reference types="msw" />

interface ImportMetaEnv {
  /** Non-secret origin of the .NET API (e.g. https://api.ebi.internal). Empty = same-origin. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
