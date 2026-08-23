import { Mail, Code2, Briefcase, Download, MapPin } from 'lucide-react'

const skills = ['C', 'Assembly', 'HDL', 'Embedded C', 'Arduino', 'Digital Logic', 'Git', 'Linux']

export function ResumeSection() {
  return (
    <section className="mx-auto max-w-3xl">
      <p className="font-mono text-sm tracking-widest text-accent">RESUME / CONTACT</p>
      <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        Let&apos;s build something at the hardware&ndash;software boundary
      </h1>
      <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        I&apos;m actively seeking a student or junior engineering position. Reach out and I&apos;ll
        respond promptly &mdash; I&apos;d be glad to share code, schematics, and project write-ups.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <ContactRow icon={Mail} label="Email" value="student@ariel.ac.il" href="mailto:student@ariel.ac.il" />
        <ContactRow icon={Briefcase} label="LinkedIn" value="/in/ee-student" href="#" />
        <ContactRow icon={Code2} label="GitHub" value="@ee-student" href="#" />
        <ContactRow icon={MapPin} label="Location" value="Israel" />
      </div>

      <div className="mt-10">
        <p className="font-mono text-xs tracking-widest text-muted-foreground">CORE SKILLS</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-md border border-border bg-card/40 px-3 py-1.5 text-sm text-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#"
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-shadow hover:shadow-[0_0_20px] hover:shadow-accent/40"
      >
        <Download className="size-4" />
        Download Résumé (PDF)
      </a>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail
  label: string
  value: string
  href?: string
}) {
  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-xs tracking-widest text-muted-foreground">
          {label.toUpperCase()}
        </span>
        <span className="block truncate text-sm text-foreground">{value}</span>
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
