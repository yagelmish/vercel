import { MapPin, Circle } from 'lucide-react'

export function OverviewSection() {
  return (
    <section className="mx-auto max-w-3xl">
      <p className="font-mono text-sm tracking-widest text-accent">OVERVIEW</p>
      <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
        B.Sc. Electrical &amp; Electronics Engineering Student
      </h1>
      <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        I am an undergraduate student at Ariel University, specializing in low-level software and
        digital systems. My technical focus includes C programming, Assembly, hardware description
        languages (HDL), and microcontrollers. I am currently seeking a student or junior
        engineering position to apply my hands-on project experience within a dynamic R&amp;D team.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-foreground">
          <MapPin className="size-4 text-primary" />
          Israel
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
          <Circle className="size-2.5 fill-accent text-accent" />
          Seeking a Student Position / Junior Role
        </span>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {[
          { k: 'Focus', v: 'Low-Level Software & Digital Systems' },
          { k: 'Languages', v: 'C · Assembly · HDL' },
          { k: 'Hardware', v: 'Arduino & Microcontrollers' },
          { k: 'University', v: 'Ariel University' },
        ].map((item) => (
          <div
            key={item.k}
            className="rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm"
          >
            <p className="font-mono text-xs tracking-widest text-muted-foreground">
              {item.k.toUpperCase()}
            </p>
            <p className="mt-2 font-medium text-foreground">{item.v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
