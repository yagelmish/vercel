'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { OverviewSection } from '@/components/sections/overview-section'
import { ProjectsGrid } from '@/components/sections/projects-grid'
import { ResumeSection } from '@/components/sections/resume-section'
import { projectCards, type SectionId } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { ProjectDetail } from '@/components/project-detail'

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
        <div
          className="fixed inset-0 z-40 bg-[#030108]/80 backdrop-blur-md md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 border-r border-purple-500/20 bg-[#0a0518]/95 shadow-[8px_0_30px_rgba(139,92,246,0.1)] backdrop-blur-3xl transition-transform duration-300 md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
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
