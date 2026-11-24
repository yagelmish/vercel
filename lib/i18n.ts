export type Locale = 'en' | 'he'

export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_STORAGE_KEY = 'portfolio-locale'

/**
 * A text field that strictly requires both English and Hebrew translations.
 * TypeScript enforces parity across both versions at compile time.
 */
export type LocalizedString = Record<Locale, string>

/**
 * A text value that can either be a shared technical token (e.g. 'HDL', 'C')
 * or a full bilingual LocalizedString.
 */
export type LocalizableText = string | LocalizedString

export function getLocaleDir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'he' ? 'rtl' : 'ltr'
}

export function resolveText(value: LocalizableText, locale: Locale): string {
  return typeof value === 'string' ? value : value[locale]
}

export function getStableTextKey(value: LocalizableText): string {
  return typeof value === 'string' ? value : value.en
}
