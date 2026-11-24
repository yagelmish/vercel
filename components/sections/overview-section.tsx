'use client'

import { MapPin, Circle } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { getStableTextKey } from '@/lib/i18n'
import { siteContent } from '@/lib/site-content'

export function OverviewSection() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-3xl">
      <p className="font-mono text-sm ltr:tracking-widest rtl:tracking-normal text-accent">
        {t(siteContent.overview.eyebrow)}
      </p>
      <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
        {t(siteContent.overview.heading)}
      </h1>
      <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        {t(siteContent.overview.bio)}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-foreground">
          <MapPin className="size-4 text-primary" />
          {t(siteContent.overview.location)}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
          <Circle className="size-2.5 fill-accent text-accent" />
          {t(siteContent.overview.status)}
        </span>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {siteContent.overview.highlights.map((item) => (
          <div
            key={getStableTextKey(item.label)}
            className="rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm"
          >
            <p className="font-mono text-xs ltr:tracking-widest rtl:tracking-normal text-muted-foreground">
              {t(item.label).toUpperCase()}
            </p>
            <p className="mt-2 font-medium text-foreground">
              <span dir={typeof item.value === 'string' ? 'ltr' : undefined} className="inline-block">
                {t(item.value)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
