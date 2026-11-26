'use client'

import { useState } from 'react'
import { ArrowLeft, Play, Code as CodeIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { getStableTextKey } from '@/lib/i18n'
import { getMediaUrl } from '@/lib/media'
import { projectCards, type ContentBlock } from '@/lib/portfolio-data'
import { siteContent } from '@/lib/site-content'

export function ProjectDetail({ projectId, onBack }: { projectId: string; onBack: () => void }) {
  const [videoLoaded, setVideoLoaded] = useState(true)
  const [heroImageLoaded, setHeroImageLoaded] = useState(true)
  const { t } = useLanguage()

  const project = projectCards.find((p) => p.id === projectId)
  if (!project) return null

  const title = t(project.title)

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <section key={index} className="space-y-4">
            {block.title && <h3 className="text-xl sm:text-2xl font-semibold text-white break-words">{t(block.title)}</h3>}
            <p className="leading-relaxed text-slate-400 whitespace-pre-line break-words">{t(block.content)}</p>
            {block.bullets && block.bullets.length > 0 && (
              <ul className="space-y-3 pt-1">
                {block.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm leading-relaxed text-slate-300"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                    <span className="min-w-0 flex-1 break-words">
                      {bullet.title && (
                        <strong className="font-semibold text-white">{t(bullet.title)}: </strong>
                      )}
                      <span className="text-slate-400">{t(bullet.text)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )

      case 'video':
        return (
          <section key={index} className="space-y-4">
            {block.title && (
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2.5">
                <Play className="size-5 text-[#00f0ff]" />
                {t(block.title)}
              </h3>
            )}
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[2rem] border-[8px] border-white/5 bg-[#0b0b0f] shadow-[0_0_30px_rgba(0,240,255,0.08)]">
              {videoLoaded ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  onError={() => setVideoLoaded(false)}
                  className="h-full w-full object-cover"
                >
                  <source src={getMediaUrl(block.url)} type="video/mp4" />
                </video>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <Play className="size-10 text-slate-600" />
                  <span className="font-mono text-[10px] uppercase ltr:tracking-widest rtl:tracking-normal text-slate-500">
                    {t(siteContent.projectDetail.videoUnavailable)}
                  </span>
                </div>
              )}
            </div>
          </section>
        )

      case 'image':
        return (
          <section key={index} className="space-y-4">
            {block.title && <h3 className="text-xl sm:text-2xl font-semibold text-white break-words">{t(block.title)}</h3>}
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f] shadow-[0_0_30px_rgba(0,240,255,0.04)]">
              <img
                src={getMediaUrl(block.url)}
                alt={block.alt ? t(block.alt) : block.title ? t(block.title) : title}
                className="w-full h-auto object-contain"
              />
            </div>
          </section>
        )

      case 'steps':
        return (
          <section key={index} className="space-y-6">
            {block.title && <h3 className="text-2xl font-semibold text-white">{t(block.title)}</h3>}
            <div className="flex flex-col gap-4">
              {block.steps.map((step, i) => (
                <div key={i} className="relative flex gap-4 sm:gap-5 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00f0ff]/10 font-mono text-sm font-bold text-[#00f0ff]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-white mb-2 break-words">{t(step.title)}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed break-words">{t(step.description)}</p>
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
                  {t(block.title)}
                </h3>
              )}
              {block.description && (
                <p className="text-xs font-mono text-[#00f0ff] opacity-80">{t(block.description)}</p>
              )}
            </div>
            <div
              dir="ltr"
              className="relative max-w-full overflow-hidden rounded-xl border border-white/10 bg-[#070512] p-4 font-mono text-xs text-slate-300 shadow-inner text-left"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2 text-[11px] text-slate-500">
                <span>
                  {block.language} {t(siteContent.projectDetail.codeSnippetSuffix)}
                </span>
                <span className="text-[#00f0ff]">{block.language}</span>
              </div>
              <pre className="max-w-full overflow-x-auto whitespace-pre leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          </section>
        )

      case 'specs':
        return (
          <section key={index} className="space-y-4">
            {block.title && <h3 className="text-xl sm:text-2xl font-semibold text-white break-words">{t(block.title)}</h3>}
            {block.description && (
              <p className="leading-relaxed text-slate-400 break-words">{t(block.description)}</p>
            )}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg">
              {block.rows.map((row, i) => (
                <div
                  key={i}
                  className="grid gap-1.5 border-b border-white/5 px-5 py-3.5 text-sm last:border-b-0 sm:grid-cols-[210px_1fr] sm:items-baseline sm:gap-4"
                >
                  <span className="min-w-0 font-mono text-xs font-medium text-[#00f0ff] break-words">
                    {t(row.label)}
                  </span>
                  <span className="min-w-0 leading-relaxed text-slate-300 break-words">{t(row.value)}</span>
                </div>
              ))}
            </div>
          </section>
        )

      default:
        return null
    }
  }

  const featuresBlock = project.contentBlocks.find((b) => b.type === 'features')

  return (
    <div className="min-w-0 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-20">
      <button
        type="button"
        onClick={onBack}
        className="mb-10 sm:mb-12 flex items-center gap-2 text-sm font-semibold ltr:tracking-wider rtl:tracking-normal text-[#00f0ff] transition-colors hover:text-white uppercase"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" /> {t(siteContent.projectDetail.backToIndex)}
      </button>

      {/* Header Section */}
      <div className="mb-10 sm:mb-12">
        <div className="mb-4 text-xs font-semibold ltr:tracking-widest rtl:tracking-normal text-[#00f0ff] uppercase">
          {t(project.label)}
        </div>
        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl break-words">
          {title}
        </h1>
        <p className="mb-8 text-base sm:text-lg leading-relaxed text-slate-300 max-w-3xl break-words">
          {t(project.pageDescription || project.description)}
        </p>
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {project.tags.map((tag) => (
            <span
              key={getStableTextKey(tag)}
              className="rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-3.5 py-1.5 text-xs font-semibold ltr:tracking-wider rtl:tracking-normal text-[#00f0ff] uppercase"
            >
              {t(tag)}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      {heroImageLoaded && (
        <div className="relative mb-12 sm:mb-14 h-[240px] sm:h-[340px] lg:h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f] shadow-[0_0_50px_rgba(0,240,255,0.04)] flex items-center justify-center group">
          <img
            src={getMediaUrl(project.image || `/images/${project.id}/hero.png`)}
            alt={title}
            onError={() => setHeroImageLoaded(false)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}

      {/* Dynamic Content Rendering */}
      <div className="grid gap-10 lg:grid-cols-3 border-t border-white/10 pt-10 sm:pt-12">
        <div className="min-w-0 lg:col-span-2 space-y-12">
          {project.contentBlocks
            .filter((b) => b.type !== 'features')
            .map((block, index) => renderBlock(block, index))}
        </div>

        {/* Key Features Sidebar */}
        {featuresBlock && featuresBlock.type === 'features' && (
          <div className="min-w-0 space-y-6 lg:ps-6">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-xl">
              <h4 className="mb-6 font-semibold text-white ltr:tracking-wide rtl:tracking-normal uppercase text-sm">
                {t(featuresBlock.title || siteContent.projectDetail.defaultFeaturesTitle)}
              </h4>
              <ul className="space-y-4">
                {featuresBlock.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-1.5 size-1.5 rounded-full bg-[#00f0ff] shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                    <span className="leading-snug">{t(feature)}</span>
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
