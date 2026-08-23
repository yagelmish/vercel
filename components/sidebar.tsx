'use client'

import { useState } from 'react'
import {
  ChevronDown,
  LayoutGrid,
  FileText,
  FolderGit2,
  Search,
  X,
  Cpu,
  Code,
  BookOpen,
} from 'lucide-react'
import { projectCards, type SectionId } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

type NavProps = {
  active: SectionId
  onSelect: (id: SectionId) => void
  onCloseMobile: () => void
}

export function Sidebar({ active, onSelect, onCloseMobile }: NavProps) {
  const isProjectActive = ['projects', 'hdl', 'apple-pay-tracker', 'fsm'].includes(active)
  const [projectsOpen, setProjectsOpen] = useState(isProjectActive)
  
  // פתיחת קטגוריות נפרדות
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({
    hardware: true,
    software: true,
    learning: true,
  })

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  const handleSelect = (id: SectionId) => {
    onSelect(id)
    onCloseMobile()
  }

  // מיון הפרויקטים לפי קטגוריות
  const hardwareProjects = projectCards.filter(p => p.category === 'hardware')
  const softwareProjects = projectCards.filter(p => p.category === 'software')
  const learningProjects = projectCards.filter(p => p.category === 'learning')

  return (
    <nav className="relative flex h-full flex-col p-6 overflow-y-auto" aria-label="Portfolio sections">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-[#00f0ff]">
            Yagel Mishalov
          </p>
          <h1 className="mt-2 text-xl font-bold leading-tight text-white">
            Projects Portfolio
          </h1>
        </div>
        <button type="button" onClick={onCloseMobile} className="rounded-md p-1.5 text-slate-400 transition-colors hover:text-white lg:hidden">
          <X className="size-5" />
        </button>
      </div>

      <p className="mb-3 px-1 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
        Control Panel
      </p>

      <div className="flex flex-col gap-1">
        <NavButton icon={LayoutGrid} label="Overview" selected={active === 'overview'} onClick={() => handleSelect('overview')} />

        {/* Projects Main Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProjectsOpen((o) => !o)
              if (!isProjectActive) handleSelect('projects')
            }}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isProjectActive ? 'bg-white/[0.04] text-white' : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
            )}
          >
            <span className="flex items-center gap-3">
              <FolderGit2 className="size-4 shrink-0" />
              Projects
            </span>
            <ChevronDown className={cn('size-4 transition-transform duration-200', projectsOpen && 'rotate-180')} />
          </button>

          {isProjectActive && (
            <span aria-hidden="true" className="absolute -right-6 top-0 h-full w-0.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_2px_rgba(0,240,255,0.7)]" />
          )}
        </div>

        {/* Categories Accordions inside Projects */}
        <div className={cn('grid transition-all duration-300 ease-out', projectsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
          <div className="overflow-hidden">
            <div className="ml-4 mt-1 flex flex-col border-l border-white/10 pl-3 space-y-2">
              
              {/* 1. חומרה */}
              <CategoryGroup 
                title="Hardware" 
                icon={Cpu} 
                isOpen={openCategories.hardware} 
                onToggle={() => toggleCategory('hardware')}
                items={hardwareProjects}
                activeId={active}
                onSelectProject={handleSelect}
              />

              {/* 2. תוכנה */}
              <CategoryGroup 
                title="Software" 
                icon={Code} 
                isOpen={openCategories.software} 
                onToggle={() => toggleCategory('software')}
                items={softwareProjects}
                activeId={active}
                onSelectProject={handleSelect}
              />

              {/* 3. למידה */}
              <CategoryGroup 
                title="Learning" 
                icon={BookOpen} 
                isOpen={openCategories.learning} 
                onToggle={() => toggleCategory('learning')}
                items={learningProjects}
                activeId={active}
                onSelectProject={handleSelect}
              />

            </div>
          </div>
        </div>

        <NavButton icon={FileText} label="Resume / Contact" selected={active === 'resume'} onClick={() => handleSelect('resume')} />
      </div>

      <div className="mt-auto flex flex-col gap-4 pt-6">
        <button type="button" className="flex w-full items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-slate-400 transition-colors hover:border-white/20 hover:text-white">
          <Search className="size-4 shrink-0" />
          <span className="flex-1 text-left">Quick jump</span>
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-slate-400">⌘K</kbd>
        </button>

        <div className="flex items-center gap-2.5 px-1">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#00f0ff] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_2px_rgba(0,240,255,0.6)]" />
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Available for Opportunities</span>
        </div>
      </div>
    </nav>
  )
}

// רכיב עזר להצגת קטגוריה נפתחת בתפריט
function CategoryGroup({ title, icon: Icon, isOpen, onToggle, items, activeId, onSelectProject }: any) {
  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2">
          <Icon className="size-3.5 text-[#00f0ff]" />
          {title}
        </span>
        <ChevronDown className={cn('size-3 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="ml-3 mt-1 flex flex-col border-l border-white/10 pl-2 space-y-1">
          {items.length === 0 ? (
            <span className="text-[11px] text-slate-600 py-1">No projects</span>
          ) : (
            items.map((proj: any) => {
              const ProjIcon = proj.icon
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => onSelectProject(proj.id as SectionId)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] transition-colors hover:text-white truncate",
                    activeId === proj.id ? "text-[#00f0ff] font-medium" : "text-slate-400"
                  )}
                >
                  <ProjIcon className="size-3 shrink-0 opacity-70" />
                  <span className="truncate">{proj.title}</span>
                </button>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

function NavButton({ icon: Icon, label, selected, onClick }: { icon: typeof Cpu, label: string, selected: boolean, onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
        selected ? 'bg-white/[0.04] text-white' : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  )
}