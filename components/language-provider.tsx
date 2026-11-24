'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  DEFAULT_LOCALE,
  getLocaleDir,
  LOCALE_STORAGE_KEY,
  resolveText,
  type LocalizableText,
  type Locale,
} from '@/lib/i18n'
import { siteContent } from '@/lib/site-content'

interface LanguageContextValue {
  locale: Locale
  dir: 'ltr' | 'rtl'
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (value: LocalizableText) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY)
      if (saved === 'en' || saved === 'he') {
        setLocaleState(saved)
      }
    } catch {
      // Ignore storage access errors in restricted environments
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    const dir = getLocaleDir(locale)
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    document.title = resolveText(siteContent.meta.title, locale)

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', resolveText(siteContent.meta.description, locale))
    }

    if (hydrated) {
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
      } catch {
        // Ignore storage write errors
      }
    }
  }, [locale, hydrated])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'he' : 'en'))
  }, [])

  const t = useCallback(
    (value: LocalizableText) => resolveText(value, locale),
    [locale]
  )

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dir: getLocaleDir(locale),
        setLocale,
        toggleLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
