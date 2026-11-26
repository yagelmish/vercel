'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { getStableTextKey } from '@/lib/i18n'
import { getMediaUrl } from '@/lib/media'
import { projectCards, type SectionId } from '@/lib/portfolio-data'
import { siteContent } from '@/lib/site-content'

export function ProjectsGrid({ onSelectProject }: { onSelectProject: (id: SectionId) => void }) {
  const { t } = useLanguage()

  return (
    <section>
      <p className="font-mono text-xs font-medium uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-slate-400">
        {t(siteContent.projectsGrid.eyebrow)}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {t(siteContent.projectsGrid.heading)}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectCards.map((project, i) => {
          const Icon = project.icon
          const title = t(project.title)

          return (
            <article
              key={project.id}
              onClick={() => onSelectProject(project.id as SectionId)}
              style={{ animationDelay: `${i * 90}ms` }}
              className="group relative flex min-w-0 animate-in flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] fade-in slide-in-from-bottom-4 fill-mode-both duration-500 ease-out transition-[transform,box-shadow] hover:-translate-y-1 hover:border-[#00f0ff]/30 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)] cursor-pointer"
            >
              {/* Visual header */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-[#0b0b0f]">
                <Image
                  src={getMediaUrl(project.image || `/images/${project.id}.png`)}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-25 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-40"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Grid texture overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                  }}
                />

                {/* Cyan radial glow */}
                <div
                  aria-hidden="true"
                  className="absolute -start-8 -top-10 size-40 rounded-full bg-[#00f0ff]/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                />

                {/* Icon and technical glyph */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-xl border border-[#00f0ff]/30 bg-[#0b0b0f]/80 text-[#00f0ff] backdrop-blur-sm shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-7" />
                  </div>
                  <span
                    dir="ltr"
                    className="max-w-full px-3 text-center font-mono text-[11px] tracking-[0.16em] sm:tracking-[0.3em] text-slate-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    {project.glyph}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] font-medium uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#00f0ff]">
                    {t(project.label)}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-slate-500 transition-colors group-hover:text-[#00f0ff] rtl:-scale-x-100" />
                </div>

                <h3 className="mt-3 text-xl font-bold text-white">{title}</h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {t(project.description)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={getStableTextKey(tag)}
                      className="rounded-full border border-cyan-500/30 bg-transparent px-2.5 py-1 font-mono text-[10px] font-medium uppercase ltr:tracking-wider rtl:tracking-normal text-cyan-400"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
