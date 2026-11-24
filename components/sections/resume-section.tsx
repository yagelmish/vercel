'use client'

import { Mail, Code2, Briefcase, Download, MapPin, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { getStableTextKey } from '@/lib/i18n'
import { siteContent, type ContactIconKey } from '@/lib/site-content'

const contactIcons: Record<ContactIconKey, LucideIcon> = {
  mail: Mail,
  briefcase: Briefcase,
  code: Code2,
  pin: MapPin,
}

export function ResumeSection() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-3xl">
      <p className="font-mono text-sm ltr:tracking-widest rtl:tracking-normal text-accent">
        {t(siteContent.resume.eyebrow)}
      </p>
      <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {t(siteContent.resume.heading)}
      </h1>
      <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        {t(siteContent.resume.bio)}
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {siteContent.resume.contactItems.map((item) => (
          <ContactRow
            key={item.id}
            icon={contactIcons[item.iconKey]}
            label={t(item.label)}
            value={t(item.value)}
            href={item.href}
            ltrValue={item.ltrValue}
          />
        ))}
      </div>

      <div className="mt-10">
        <p className="font-mono text-xs ltr:tracking-widest rtl:tracking-normal text-muted-foreground">
          {t(siteContent.resume.coreSkillsLabel)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {siteContent.resume.skills.map((skill) => (
            <span
              key={getStableTextKey(skill)}
              className="rounded-md border border-border bg-card/40 px-3 py-1.5 text-sm text-foreground"
            >
              {t(skill)}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#"
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-shadow hover:shadow-[0_0_20px] hover:shadow-accent/40"
      >
        <Download className="size-4" />
        {t(siteContent.resume.downloadResume)}
      </a>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  ltrValue,
}: {
  icon: LucideIcon
  label: string
  value: string
  href?: string
  ltrValue?: boolean
}) {
  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 text-start">
        <span className="block font-mono text-xs ltr:tracking-widest rtl:tracking-normal text-muted-foreground">
          {label.toUpperCase()}
        </span>
        <span
          dir={ltrValue ? 'ltr' : undefined}
          className="inline-block max-w-full truncate text-sm text-foreground"
        >
          {value}
        </span>
      </span>
    </>
  )

  const className =
    'flex items-center gap-3 rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm transition-colors'

  return href ? (
    <a href={href} className={`${className} hover:border-accent/40`}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}
