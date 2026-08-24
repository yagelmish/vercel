'use client'

import { useState } from 'react'
import { Menu, ArrowLeft, Play, Code as CodeIcon } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { OverviewSection } from '@/components/sections/overview-section'
import { ProjectsGrid } from '@/components/sections/projects-grid'
import { ResumeSection } from '@/components/sections/resume-section'
import { projectCards, type SectionId } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

// --- רכיב דף הפרויקט המעודכן עם תוכן דינמי ---
function ProjectDetail({ projectId, onBack }: { projectId: string; onBack: () => void }) {
  const [videoLoaded, setVideoLoaded] = useState(true)
  const project = projectCards.find(p => p.id === projectId)
  if (!project) return null
  const Icon = project.icon

  // מנוע רינדור הבלוקים הדינמי
  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <section key={index} className="space-y-4">
            {block.title && <h3 className="text-2xl font-semibold text-white">{block.title}</h3>}
            <p className="leading-relaxed text-slate-400">{block.content}</p>
          </section>
        )
      
      case 'video':
        return (
          <section key={index} className="space-y-4">
            {block.title && (
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2.5">
                <Play className="size-5 text-[#00f0ff]" />
                {block.title}
              </h3>
            )}
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[2rem] border-[8px] border-white/5 bg-[#0b0b0f] shadow-[0_0_30px_rgba(0,240,255,0.08)]">
              {videoLoaded ? (
                <video controls playsInline preload="metadata" onError={() => setVideoLoaded(false)} className="h-full w-full object-cover">
                  <source src={block.url} type="video/mp4" />
                </video>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <Play className="size-10 text-slate-600" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Video Unavailable</span>
                </div>
              )}
            </div>
          </section>
        )

      case 'steps':
        return (
          <section key={index} className="space-y-6">
            {block.title && <h3 className="text-2xl font-semibold text-white">{block.title}</h3>}
            <div className="flex flex-col gap-4">
              {block.steps.map((step: any, i: number) => (
                <div key={i} className="relative flex gap-5 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00f0ff]/10 font-mono text-sm font-bold text-[#00f0ff]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )

      case 'code':
        return (
          <section key={index} className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex flex-col gap-1">
              {block.title && (
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <CodeIcon className="size-5 text-[#00f0ff]" />
                  {block.title}
                </h3>
              )}
              {block.description && <p className="text-xs font-mono text-[#00f0ff] opacity-80">{block.description}</p>}
            </div>
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#070512] p-4 font-mono text-xs text-slate-300 shadow-inner">
              <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-slate-500">
                <span>{block.language} snippet</span>
                <span className="text-[#00f0ff]">{block.language}</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          </section>
        )

      default:
        return null;
    }
  }

  // הפרדת הפיצ'רים כדי לשים אותם בסיידבר הצדדי כרגיל
  const featuresBlock = project.contentBlocks.find(b => b.type === 'features')

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-20">
      <button onClick={onBack} className="mb-12 flex items-center gap-2 text-sm font-semibold tracking-wider text-[#00f0ff] transition-colors hover:text-white uppercase">
        <ArrowLeft className="size-4" /> Return_To_Index
      </button>

      {/* Header Section */}
      <div className="mb-12">
        <div className="mb-4 text-xs font-semibold tracking-widest text-[#00f0ff] uppercase">{project.label}</div>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">{project.title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-slate-300 max-w-3xl">
          {project.pageDescription || project.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {project.tags.map(tag => (
            <span key={tag} className="rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#00f0ff] uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mb-14 h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f] shadow-[0_0_50px_rgba(0,240,255,0.04)] flex items-center justify-center group">
        <img src={project.image || `/images/${project.id}.png`} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>

      {/* Dynamic Content Rendering */}
      <div className="grid gap-10 lg:grid-cols-3 border-t border-white/10 pt-12">
        <div className="lg:col-span-2 space-y-12">
          {/* הריצה על הבלוקים */}
          {project.contentBlocks.filter(b => b.type !== 'features').map((block, index) => renderBlock(block, index))}
        </div>

        {/* Key Features Sidebar */}
        {featuresBlock && (
          <div className="space-y-6 lg:pl-6">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-xl">
              <h4 className="mb-6 font-semibold text-white tracking-wide uppercase text-sm">{featuresBlock.title || 'Key Features'}</h4>
              <ul className="space-y-4">
                {(featuresBlock as any).features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-1.5 size-1.5 rounded-full bg-[#00f0ff] shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  const [active, setActive] = useState<SectionId>('projects')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#030108]">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07051a] via-[#030108] to-[#0a061e]" />
        <div className="absolute -left-[20%] -top-[10%] h-[800px] w-[800px] rounded-full bg-purple-700/30 blur-[150px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[800px] w-[800px] rounded-full bg-blue-700/30 blur-[150px]" />
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[150px]" />
      </div>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-purple-500/20 bg-[#0a0518]/80 shadow-[8px_0_30px_rgba(139,92,246,0.07)] backdrop-blur-3xl md:block">
        <Sidebar active={active} onSelect={setActive} onCloseMobile={() => setMobileOpen(false)} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#030108]/80 backdrop-blur-md md:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      <aside className={cn('fixed inset-y-0 left-0 z-50 w-72 border-r border-purple-500/20 bg-[#0a0518]/95 shadow-[8px_0_30px_rgba(139,92,246,0.1)] backdrop-blur-3xl transition-transform duration-300 md:hidden', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
        <Sidebar active={active} onSelect={setActive} onCloseMobile={() => setMobileOpen(false)} />
      </aside>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col md:pl-72">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-purple-500/20 bg-[#0a0518]/80 px-4 py-3 backdrop-blur-3xl md:hidden">
          <button type="button" onClick={() => setMobileOpen(true)} className="rounded-md p-1.5 text-white hover:bg-white/10">
            <Menu className="size-5" />
          </button>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#00f0ff]">
            Yagel Mishalov
          </span>
        </header>

        <main className="flex-1 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 max-w-7xl mx-auto w-full">
          {active === 'overview' && <OverviewSection />}
          {active === 'projects' && <ProjectsGrid onSelectProject={setActive} />}
          
         {/* הוספנו את key={active} כדי לאפס את הדף בכל מעבר פרויקט */}
          {projectCards.some(p => p.id === active) && (
            <ProjectDetail key={active} projectId={active} onBack={() => setActive('projects')} />
          )}
          {active === 'resume' && <ResumeSection />}
        </main>
      </div>
    </div>
  )
}
