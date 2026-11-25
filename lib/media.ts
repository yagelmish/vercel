export const MEDIA_BASE_URL = 'https://pub-b16c822b522a4938a55d22320ecd1d0f.r2.dev/media'

/**
 * Resolves a relative media path (e.g. '/images/fsm/hero.png') to the external
 * R2 storage URL while leaving already-qualified URLs untouched.
 */
export function getMediaUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${MEDIA_BASE_URL}${normalized}`
}
