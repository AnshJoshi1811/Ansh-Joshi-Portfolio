import { useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Camera,
  Compass,
  Play,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  GITHUB_SHOWCASE,
  SOCIAL_PLATFORMS,
  type SocialPlatformId,
} from '../config/portfolioStructure';
import { PeekOnHover } from './ui/PeekOnHover';
import { PlatformIcon } from './ui/PlatformIcons';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';
import { TransparentPixelSprite } from './ui/TransparentPixelSprite';

interface SocialPlatformsSectionProps {
  selectedPlatformId: SocialPlatformId;
  onSelectPlatform: (id: SocialPlatformId) => void;
  onHoverPlatformChange: (id: SocialPlatformId | null) => void;
}

/**
 * Section 02 — MAIN Showcase: Social Worlds, Study Log & Off-the-Clock.
 * Every single platform tab shifts the entire stage into its own signature theme!
 * Hovering any tab makes nose-only sneaking Ansh (`peekingNose`) peer right over the edge,
 * while the main Pixel Ansh glides cleanly to the right side of the viewport.
 */
export function SocialPlatformsSection({
  selectedPlatformId,
  onSelectPlatform,
  onHoverPlatformChange,
}: SocialPlatformsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<SocialPlatformId | null>(null);

  const activePlatform =
    SOCIAL_PLATFORMS.find((p) => p.id === selectedPlatformId) ??
    SOCIAL_PLATFORMS[0];
  const theme = activePlatform.theme;

  const handleHover = (id: SocialPlatformId | null) => {
    setHoveredId(id);
    onHoverPlatformChange(id);
  };

  return (
    <section
      id="social-platforms"
      aria-labelledby="social-platforms-heading"
      className="border-t border-hairline bg-canvas py-16 sm:py-20 lg:py-24"
    >
      {/* Generous right space on desktop so right-docked Pixel Ansh sits cleanly beside Socials */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:pl-[192px] lg:pr-[256px] xl:pl-[216px] xl:pr-[292px]">
        <SectionReveal>
          <SectionHeader
            index="02"
            title="Where I build, teach & share"
            headingId="social-platforms-heading"
            scopeNote="My main corner of the internet—every tab carries its own theme. Hover any platform to catch Ansh sneaking up over the edge, and switch tabs to explore System Design, CloudNetExplained, articles, and Side Stand Stories."
          />

          {/* 6-Platform Selector Tabs with Nose-Only Sneaking Ansh on Hover */}
          <div
            role="tablist"
            aria-label="Choose a social platform"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-11 mb-7"
          >
            {SOCIAL_PLATFORMS.map((platform) => {
              const isSelected = platform.id === activePlatform.id;
              const isPeeking = hoveredId === platform.id;

              return (
                <div
                  key={platform.id}
                  className="relative"
                  onMouseEnter={() => handleHover(platform.id)}
                  onMouseLeave={() => handleHover(null)}
                >
                  {/* Nose-only sneaking Ansh peering strictly till his nose over the tab */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[44px] inset-x-0 h-[46px] overflow-hidden flex items-end justify-center z-0"
                  >
                    <motion.div
                      initial={false}
                      animate={
                        isPeeking
                          ? { y: 6, opacity: 1 }
                          : { y: 48, opacity: 0 }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.01 }
                          : { type: 'spring', stiffness: 460, damping: 24 }
                      }
                    >
                      <TransparentPixelSprite
                        spriteKey="peekingNose"
                        pixelGrid={120}
                        className="w-[64px] h-[64px]"
                      />
                    </motion.div>
                  </div>

                  {/* Subtle themed teaser whisper on hover */}
                  <AnimatePresence>
                    {isPeeking && (
                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 2 }}
                        transition={{ duration: 0.13 }}
                        className={`pointer-events-none hidden sm:block absolute -top-[74px] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap font-mono text-[10px] rounded-lg px-2.5 py-1 shadow-md ${platform.theme.headerBg} ${platform.theme.headerText}`}
                      >
                        {platform.peekTeaser}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onFocus={() => handleHover(platform.id)}
                    onBlur={() => handleHover(null)}
                    onClick={() => onSelectPlatform(platform.id)}
                    className={`relative z-10 w-full flex items-center gap-2.5 px-3 py-3 rounded-xl border text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 ${
                      isSelected
                        ? platform.theme.tabActive
                        : 'bg-surface border-hairline text-muted hover:text-ink hover:border-hairline-strong'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-white/15 text-current'
                          : 'bg-recessed text-ink'
                      }`}
                    >
                      <PlatformIcon platform={platform.id} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <span className="block font-display text-sm font-bold truncate">
                        {platform.name}
                      </span>
                      <span
                        className={`block font-mono text-[10px] truncate ${
                          isSelected ? 'opacity-80' : 'text-muted'
                        }`}
                      >
                        {platform.id === 'reddit'
                          ? 'Side Stand'
                          : isSelected
                            ? 'Active'
                            : 'Switch'}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Per-Tab Signature Themed Showcase Panel */}
          <div className="bg-surface border border-hairline rounded-2xl overflow-hidden shadow-[0_14px_38px_-24px_rgba(15,23,42,0.22)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePlatform.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Signature Per-Platform Themed Header Banner */}
                <div
                  className={`${theme.headerBg} ${theme.headerText} p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                      <PlatformIcon
                        platform={activePlatform.id}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="space-y-1">
                      <div
                        className={`flex flex-wrap items-center gap-x-2 text-xs font-mono ${theme.headerMuted}`}
                      >
                        <span className="font-semibold">{activePlatform.handle}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activePlatform.personaTitle}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
                        {activePlatform.headline}
                      </h3>
                    </div>
                  </div>

                  <a
                    href={activePlatform.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
                  >
                    <span>Open {activePlatform.name}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>

                {/* Per-Platform Themed Content Stage */}
                <div className="p-6 sm:p-8">
                  {/* 1. GITHUB — Midnight Slate & Emerald Theme */}
                  {activePlatform.id === 'github' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        <PeekOnHover align="right" size="sm" className="lg:col-span-7">
                          <article className="h-full bg-[#0F172A] text-white border border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                                <span className="text-[#10B981] font-semibold">
                                  Featured GitHub Guide
                                </span>
                                <span>Live Interactive Site</span>
                              </div>

                              <h4 className="font-display text-xl sm:text-2xl font-bold leading-tight">
                                {GITHUB_SHOWCASE.featuredProject.title}
                              </h4>

                              <p className="text-sm text-slate-300 leading-relaxed">
                                {GITHUB_SHOWCASE.featuredProject.description}
                              </p>

                              <p className="text-xs font-mono text-emerald-300/90">
                                {GITHUB_SHOWCASE.featuredProject.stack}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                              <span className="font-mono text-xs text-slate-400 truncate">
                                anshjoshi1811.github.io/SystemDesign/
                              </span>
                              <a
                                href={GITHUB_SHOWCASE.featuredProject.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`pro-btn px-3.5 py-2 text-xs ${theme.ctaBg} ${theme.ctaHover} ${theme.ctaText}`}
                              >
                                <span>Explore SystemDesign</span>
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </a>
                            </div>
                          </article>
                        </PeekOnHover>

                        {/* "Abhi kya padh raha hoon" Study Log */}
                        <PeekOnHover align="right" size="sm" className="lg:col-span-5">
                          <aside
                            className={`h-full ${theme.softSurface} border ${theme.softBorder} rounded-xl p-6 flex flex-col justify-between gap-5`}
                          >
                            <div className="space-y-3.5">
                              <div className="flex items-center gap-2 font-mono text-xs text-[#065F46]">
                                <BookOpen className="w-4 h-4 text-[#059669]" aria-hidden="true" />
                                <span className="font-bold">
                                  {GITHUB_SHOWCASE.currentlyReading.heading}
                                </span>
                              </div>

                              <p className="text-xs text-[#047857]">
                                {GITHUB_SHOWCASE.currentlyReading.subtitle}
                              </p>

                              <ul className="space-y-3">
                                {GITHUB_SHOWCASE.currentlyReading.topics.map((topic, idx) => (
                                  <li
                                    key={topic}
                                    className="flex items-start gap-2.5 text-sm text-ink leading-snug"
                                  >
                                    <span className="font-mono text-[11px] font-bold text-[#059669] pt-0.5 tabular-nums">
                                      0{idx + 1}
                                    </span>
                                    <span>{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <p className="pt-3 border-t border-[#A7F3D0] font-mono text-[11px] text-[#047857]">
                              Updated alongside my GitHub study notes
                            </p>
                          </aside>
                        </PeekOnHover>
                      </div>

                      {/* Two Compact Engineering Builds */}
                      <div className="space-y-3">
                        <p className="font-mono text-xs text-muted">
                          Additional Engineering Builds
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {GITHUB_SHOWCASE.secondaryProjects.map((proj, idx) => (
                            <PeekOnHover key={proj.title} align="right" size="sm">
                              <article className="h-full bg-canvas border border-hairline rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[#10B981]/60 transition-colors">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                                    <span className="text-[#059669] font-semibold">
                                      Build 0{idx + 2}
                                    </span>
                                    <span>{proj.stack}</span>
                                  </div>
                                  <h5 className="font-display text-base font-bold text-ink">
                                    {proj.title}
                                  </h5>
                                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                                    {proj.summary}
                                  </p>
                                </div>

                                <a
                                  href={proj.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] hover:text-ink transition-colors whitespace-nowrap self-start"
                                >
                                  <span>View on GitHub</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                                </a>
                              </article>
                            </PeekOnHover>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. LINKEDIN — Executive Royal Blue Theme */}
                  {activePlatform.id === 'linkedin' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                      <PeekOnHover align="right" size="sm" className="md:col-span-7">
                        <article className="h-full bg-canvas border border-hairline rounded-xl p-6 space-y-3.5">
                          <div className="flex items-center gap-2 font-mono text-xs text-[#0A66C2] font-semibold">
                            <Sparkles className="w-4 h-4" aria-hidden="true" />
                            <span>Career Snapshot · Star Employee of the Month</span>
                          </div>
                          <h4 className="font-display text-xl sm:text-2xl font-bold text-ink">
                            Development Engineer in Cloud at Calsoft
                          </h4>
                          <p className="text-sm text-muted leading-relaxed">
                            Shipping reliable backend services, running 15+ ONAP pods on AWS-hosted Kubernetes clusters, automating CI/CD with Jenkins &amp; CodePipeline, and codifying multi-cloud environments with Terraform.
                          </p>
                          <p className="text-xs font-mono text-[#0A66C2] pt-1">
                            Pune, India · AWS Certified Solutions Architect – Associate
                          </p>
                        </article>
                      </PeekOnHover>

                      <PeekOnHover align="right" size="sm" className="md:col-span-5">
                        <div
                          className={`h-full ${theme.softSurface} border ${theme.softBorder} rounded-xl p-6 flex flex-col justify-between gap-4`}
                        >
                          <div className="space-y-2">
                            <p className={`font-mono text-xs font-semibold ${theme.badgeText}`}>
                              Direct Connection
                            </p>
                            <p className="font-display text-lg font-bold text-ink">
                              Connect on LinkedIn
                            </p>
                            <p className="text-xs sm:text-sm text-muted leading-relaxed">
                              Always happy to connect around software engineering, distributed systems, cloud infrastructure, and structured AI workflows.
                            </p>
                          </div>
                          <a
                            href="https://linkedin.com/in/anshjoshi1811"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`pro-btn px-4 py-2 text-xs self-start ${theme.ctaBg} ${theme.ctaHover} ${theme.ctaText}`}
                          >
                            <span>Open LinkedIn Profile</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </PeekOnHover>
                    </div>
                  )}

                  {/* 3. YOUTUBE — Studio Crimson Theme (@CloudNetExplained) */}
                  {activePlatform.id === 'youtube' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                      <PeekOnHover align="right" size="sm" className="md:col-span-7">
                        <article className="h-full bg-canvas border border-[#FECACA] rounded-xl overflow-hidden flex flex-col justify-between">
                          <div className="aspect-video bg-gradient-to-br from-[#450A0A] via-[#7F1D1D] to-[#991B1B] text-white p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between font-mono text-xs text-red-200">
                              <span className="font-semibold text-white">Latest Upload · Top</span>
                              <span>@CloudNetExplained</span>
                            </div>
                            <div className="flex flex-col items-center justify-center flex-1 text-center gap-3">
                              <a
                                href="https://www.youtube.com/@CloudNetExplained/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Watch latest upload on CloudNetExplained YouTube channel"
                                className="w-15 h-15 rounded-2xl bg-[#DC2626] hover:bg-[#EF4444] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-lg"
                              >
                                <Play className="w-6 h-6 ml-0.5 fill-current" aria-hidden="true" />
                              </a>
                              <p className="font-display text-lg font-bold text-white">
                                CloudNetExplained — Latest Videos
                              </p>
                            </div>
                            <span className="font-mono text-[11px] text-red-200/90">
                              youtube.com/@CloudNetExplained/videos
                            </span>
                          </div>

                          <div className="p-5 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs sm:text-sm text-muted">
                              Watch the newest cloud &amp; networking walkthrough on YouTube.
                            </p>
                            <a
                              href="https://www.youtube.com/@CloudNetExplained/videos"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`pro-btn px-3.5 py-2 text-xs ${theme.ctaBg} ${theme.ctaHover} ${theme.ctaText}`}
                            >
                              <span>Watch Latest</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </article>
                      </PeekOnHover>

                      <PeekOnHover align="right" size="sm" className="md:col-span-5">
                        <div
                          className={`h-full ${theme.softSurface} border ${theme.softBorder} rounded-xl p-6 flex flex-col justify-between gap-4`}
                        >
                          <div className="space-y-2.5">
                            <p className={`font-mono text-xs font-semibold ${theme.badgeText}`}>
                              Channel Focus
                            </p>
                            <h4 className="font-display text-xl font-bold text-ink">
                              Cloud &amp; Networking Explained Visually
                            </h4>
                            <p className="text-sm text-muted leading-relaxed">
                              Clear visual breakdowns of AWS networking, Kubernetes pods, and real backend engineering concepts straight from production systems.
                            </p>
                          </div>
                          <a
                            href="https://www.youtube.com/@CloudNetExplained"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${theme.badgeText} hover:text-ink pt-3 border-t ${theme.softBorder}`}
                          >
                            <span>Open @CloudNetExplained Channel</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </PeekOnHover>
                    </div>
                  )}

                  {/* 4. MEDIUM — Editorial Ink & Warm Amber Theme (@anshjoshii) */}
                  {activePlatform.id === 'medium' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                      <PeekOnHover align="right" size="sm" className="md:col-span-8">
                        <article
                          className={`h-full ${theme.softSurface} border ${theme.softBorder} rounded-xl p-6 flex flex-col justify-between gap-5`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between font-mono text-xs text-stone-600">
                              <span className="text-[#B45309] font-semibold">
                                Latest Editorial · Top
                              </span>
                              <span>medium.com/@anshjoshii</span>
                            </div>
                            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#1C1917] leading-tight">
                              Latest Engineering Articles on Medium
                            </h4>
                            <p className="text-sm text-stone-700 leading-relaxed">
                              Read my newest write-ups on backend services, Kubernetes clusters, cloud automation, and practical engineering trade-offs from shipping production systems.
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#FDE68A] flex flex-wrap items-center justify-between gap-3">
                            <span className="font-mono text-xs text-stone-600">@anshjoshii</span>
                            <a
                              href="https://medium.com/@anshjoshii"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`pro-btn px-3.5 py-2 text-xs ${theme.ctaBg} ${theme.ctaHover} ${theme.ctaText}`}
                            >
                              <span>Read Latest Story</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </article>
                      </PeekOnHover>

                      <PeekOnHover align="right" size="sm" className="md:col-span-4">
                        <div className="h-full bg-[#1C1917] text-[#FAFAF9] border border-stone-800 rounded-xl p-6 flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <p className="font-mono text-xs text-[#FDE68A]">Writing Style</p>
                            <p className="font-display text-lg font-bold">
                              Practical, production-tested notes
                            </p>
                            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                              No filler—just clear breakdowns, real debugging lessons, and repeatable infrastructure guides.
                            </p>
                          </div>
                          <span className="font-mono text-[11px] text-stone-400">
                            medium.com/@anshjoshii
                          </span>
                        </div>
                      </PeekOnHover>
                    </div>
                  )}

                  {/* 5. REDDIT — Highway Terracotta Orange Theme (Side Stand Stories) */}
                  {activePlatform.id === 'reddit' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      <PeekOnHover align="right" size="sm" className="lg:col-span-7">
                        <article
                          className={`h-full ${theme.softSurface} border ${theme.softBorder} rounded-xl p-6 flex flex-col justify-between gap-6`}
                        >
                          <div className="space-y-3.5">
                            <div className="flex items-center gap-2 font-mono text-xs text-[#C2410C] font-semibold">
                              <Compass className="w-4 h-4" aria-hidden="true" />
                              <span>Off the Clock · Side Stand Stories</span>
                            </div>
                            <h4 className="font-display text-xl sm:text-2xl font-bold text-ink leading-tight">
                              Road trips, detours, and stories told with the kickstand down.
                            </h4>
                            <p className="text-sm text-stone-700 leading-relaxed">
                              Away from code and clusters, I write about motorcycle rides, solo travel moments, and candid highway stories under{' '}
                              <strong className="text-ink font-semibold">Side Stand Stories</strong> on Reddit.
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#FED7AA] flex flex-wrap items-center justify-between gap-3">
                            <span className="font-mono text-xs text-[#9A3412]">
                              u/Original_Mongoose_74 · Latest Posts
                            </span>
                            <a
                              href="https://www.reddit.com/user/Original_Mongoose_74/submitted/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`pro-btn px-3.5 py-2 text-xs ${theme.ctaBg} ${theme.ctaHover} ${theme.ctaText}`}
                            >
                              <span>Read Latest Post</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </article>
                      </PeekOnHover>

                      <PeekOnHover align="right" size="sm" className="lg:col-span-5">
                        <div className="h-full bg-[#431407] text-orange-50 border border-[#7C2D12] rounded-xl p-6 flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <p className="font-mono text-xs text-orange-300">Travel Journal Feed</p>
                            <p className="font-display text-lg font-bold text-white">
                              Side Stand Stories
                            </p>
                            <p className="text-xs sm:text-sm text-orange-100/85 leading-relaxed">
                              Every ride begins when the side stand kicks up and turns into a story when it drops back down.
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#7C2D12] flex flex-col gap-2">
                            <a
                              href="https://www.reddit.com/user/Original_Mongoose_74/submitted/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-between text-xs font-semibold text-orange-100 hover:text-white py-1"
                            >
                              <span>Latest Submitted Stories</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                            <a
                              href="https://www.reddit.com/user/Original_Mongoose_74/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-between text-xs font-semibold text-orange-100 hover:text-white py-1"
                            >
                              <span>Full Reddit Profile</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </PeekOnHover>
                    </div>
                  )}

                  {/* 6. INSTAGRAM — Coral-Rose Gradient Theme (@its_unsh) */}
                  {activePlatform.id === 'instagram' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                      <PeekOnHover align="right" size="sm" className="md:col-span-7">
                        <article
                          className={`h-full ${theme.softSurface} border ${theme.softBorder} rounded-xl p-6 flex flex-col justify-between gap-6`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between font-mono text-xs text-[#9D174D]">
                              <span className="font-semibold">Latest Post · Top</span>
                              <span>@its_unsh</span>
                            </div>
                            <h4 className="font-display text-xl sm:text-2xl font-bold text-ink leading-tight">
                              Latest Snapshots on @its_unsh
                            </h4>
                            <p className="text-sm text-muted leading-relaxed">
                              Road trips, developer community events, candid frames, and moments away from the keyboard—jump right to the top of my visual diary.
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#FBCFE8] flex flex-wrap items-center justify-between gap-3">
                            <span className="font-mono text-xs text-[#9D174D]">
                              instagram.com/its_unsh
                            </span>
                            <a
                              href="https://www.instagram.com/its_unsh/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`pro-btn px-3.5 py-2 text-xs ${theme.ctaBg} ${theme.ctaHover} ${theme.ctaText}`}
                            >
                              <span>View Latest Post</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </article>
                      </PeekOnHover>

                      <PeekOnHover align="right" size="sm" className="md:col-span-5">
                        <div className="h-full bg-gradient-to-br from-[#831843] via-[#BE185D] to-[#DB2777] text-white rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center">
                            <Camera className="w-6 h-6" aria-hidden="true" />
                          </div>
                          <p className="font-display text-lg font-bold">@its_unsh</p>
                          <p className="text-xs text-pink-100 max-w-[26ch] leading-relaxed">
                            Behind-the-scenes frames, highway sunsets, and everyday moments off the terminal.
                          </p>
                        </div>
                      </PeekOnHover>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
