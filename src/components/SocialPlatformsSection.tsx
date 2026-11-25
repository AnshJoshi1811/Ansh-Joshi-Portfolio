import { useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  Play,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  GITHUB_SHOWCASE,
  SECTION_THEMES,
  SOCIAL_PLATFORMS,
  type AccentTone,
  type SocialPlatformId,
} from '../config/portfolioStructure';
import { PixelButton } from './ui/PixelButton';
import { PlatformIcon } from './ui/PlatformIcons';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';
import { TransparentPixelSprite } from './ui/TransparentPixelSprite';

interface SocialPlatformsSectionProps {
  selectedPlatformId: SocialPlatformId;
  onSelectPlatform: (id: SocialPlatformId) => void;
  onHoverPlatformChange: (id: SocialPlatformId | null) => void;
}

const ACCENT_TAB_ACTIVE: Record<AccentTone, string> = {
  lavender: 'border-ink bg-lavender-soft/80 text-ink',
  yellow: 'border-ink bg-yellow-soft/90 text-ink',
  sage: 'border-ink bg-sage-soft/85 text-ink',
};

const ACCENT_ICON_BG: Record<AccentTone, string> = {
  lavender: 'bg-lavender-soft text-ink',
  yellow: 'bg-yellow-soft text-ink',
  sage: 'bg-sage-soft text-ink',
};

/**
 * Section 02 — Social Platforms (Soft Lavender Mist Theme).
 * Features Snapchat-style character peeking/sneaking over the top border of each platform
 * tile on hover, plus real tailored dossiers:
 * - GitHub: Featured SystemDesign guide + 2 smaller Go projects + "Abhi kya padh raha hoon"
 * - Reddit: Side Stand Stories travel tales + latest post card
 * - YouTube: @CloudNetExplained + latest upload on top
 * - Medium: @anshjoshii + latest story on top
 * - Instagram: @its_unsh + latest post on top
 * - LinkedIn: real career highlights
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

  const handleHover = (id: SocialPlatformId | null) => {
    setHoveredId(id);
    onHoverPlatformChange(id);
  };

  return (
    <section
      id="social-platforms"
      aria-labelledby="social-platforms-heading"
      style={{ backgroundColor: SECTION_THEMES.social }}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[276px] xl:pl-[316px]">
        <SectionReveal>
          <SectionHeader
            index="02"
            title="Social & Spotlight"
            headingId="social-platforms-heading"
            scopeNote="Hover any platform to catch 16-bit Ansh sneaking over the top edge, and click to open real profiles, featured builds, and stories."
          />

          {/* 6-Platform Selector Strip with Snapchat-Style Peeking Character on Hover */}
          <div
            role="tablist"
            aria-label="Choose a social platform"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-10 mb-8"
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
                  {/* Snapchat-style peeking 16-bit character sneaking out from behind the top edge! */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[52px] inset-x-0 h-[54px] overflow-hidden flex items-end justify-center z-0"
                  >
                    <motion.div
                      initial={false}
                      animate={
                        isPeeking
                          ? { y: 12, opacity: 1, scale: 1 }
                          : { y: 58, opacity: 0, scale: 0.9 }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.01 }
                          : { type: 'spring', stiffness: 420, damping: 24 }
                      }
                      className="flex flex-col items-center"
                    >
                      <TransparentPixelSprite
                        spriteKey={platform.id}
                        pixelGrid={76}
                        className="w-[74px] h-[74px] object-top"
                      />
                    </motion.div>
                  </div>

                  {/* Subtle cheeky peek whisper above hovered tile */}
                  <AnimatePresence>
                    {isPeeking && (
                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 2 }}
                        transition={{ duration: 0.14 }}
                        className="pointer-events-none hidden sm:block absolute -top-[82px] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-ink text-surface font-mono text-[10px] px-2 py-1 shadow-[2px_2px_0_0_#9176BE]"
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
                    className={`relative z-10 w-full flex items-center gap-3 px-3.5 py-3.5 border text-left transition-[transform,border-color,background-color] duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-lavender focus-visible:outline-offset-2 ${
                      isSelected
                        ? `${ACCENT_TAB_ACTIVE[platform.accent]} -translate-y-0.5 shadow-[2px_2px_0_0_#252525]`
                        : 'bg-surface border-hairline text-muted hover:text-ink hover:border-ink/60'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 border border-hairline flex items-center justify-center shrink-0 ${ACCENT_ICON_BG[platform.accent]}`}
                    >
                      <PlatformIcon platform={platform.id} className="w-4 h-4 text-ink" />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-sm font-semibold text-ink truncate">
                        {platform.name}
                      </span>
                      <span className="block font-mono text-[10px] text-muted truncate">
                        {platform.id === 'reddit'
                          ? 'Side Stand'
                          : isSelected
                            ? 'Open'
                            : 'Peek'}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Real Tailored Platform Dossier Panel */}
          <div className="bg-surface border border-hairline">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePlatform.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header Row */}
                <div className="p-6 sm:p-8 border-b border-hairline flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 border border-hairline flex items-center justify-center shrink-0 ${ACCENT_ICON_BG[activePlatform.accent]}`}
                    >
                      <PlatformIcon
                        platform={activePlatform.id}
                        className="w-6 h-6 text-ink"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted">
                        <span className="font-mono text-ink/80">{activePlatform.handle}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activePlatform.personaTitle}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-tight">
                        {activePlatform.headline}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="sm:hidden">
                      <TransparentPixelSprite
                        spriteKey={activePlatform.id}
                        pixelGrid={76}
                        className="w-16 h-16"
                      />
                    </div>
                    <PixelButton
                      href={activePlatform.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant={activePlatform.accent}
                      size="md"
                    >
                      <span>Visit {activePlatform.name}</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </PixelButton>
                  </div>
                </div>

                {/* Body Content Per Platform */}
                <div className="p-6 sm:p-8">
                  {/* 1. GITHUB: Featured SystemDesign + 2 Smaller Projects + "Abhi kya padh raha hoon" */}
                  {activePlatform.id === 'github' && (
                    <div className="space-y-6">
                      {/* Top Grid: Featured SystemDesign (7 cols) + "Abhi kya padh raha hoon" (5 cols) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        {/* Featured SystemDesign Project */}
                        <article className="lg:col-span-7 bg-canvas border border-hairline p-6 sm:p-7 flex flex-col justify-between gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between font-mono text-xs text-muted">
                              <span className="text-lavender font-medium">
                                Featured GitHub Project
                              </span>
                              <span>Live Guide</span>
                            </div>

                            <h4 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-tight">
                              {GITHUB_SHOWCASE.featuredProject.title}
                            </h4>

                            <p className="text-sm text-muted leading-relaxed">
                              {GITHUB_SHOWCASE.featuredProject.description}
                            </p>

                            <p className="text-xs font-mono text-muted">
                              {GITHUB_SHOWCASE.featuredProject.stack}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
                            <span className="font-mono text-xs text-muted truncate">
                              anshjoshi1811.github.io/SystemDesign/
                            </span>
                            <PixelButton
                              href={GITHUB_SHOWCASE.featuredProject.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="primary"
                              size="sm"
                            >
                              <span>Explore SystemDesign</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </PixelButton>
                          </div>
                        </article>

                        {/* "Abhi kya padh raha hoon" — Currently Studying Box */}
                        <aside className="lg:col-span-5 bg-lavender-soft/40 border border-hairline p-6 flex flex-col justify-between gap-5">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 font-mono text-xs text-ink">
                              <BookOpen className="w-4 h-4 text-lavender" aria-hidden="true" />
                              <span className="font-medium">
                                {GITHUB_SHOWCASE.currentlyReading.heading}
                              </span>
                            </div>

                            <p className="text-xs text-muted">
                              {GITHUB_SHOWCASE.currentlyReading.subtitle}
                            </p>

                            <ul className="space-y-3">
                              {GITHUB_SHOWCASE.currentlyReading.topics.map((topic, idx) => (
                                <li
                                  key={topic}
                                  className="flex items-start gap-2.5 text-sm text-ink leading-snug"
                                >
                                  <span className="font-mono text-[11px] text-lavender pt-0.5 tabular-nums">
                                    0{idx + 1}
                                  </span>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <p className="pt-3 border-t border-hairline font-mono text-[11px] text-muted">
                            Updated alongside my GitHub study repos
                          </p>
                        </aside>
                      </div>

                      {/* Two Smaller Engineering Projects */}
                      <div className="space-y-3">
                        <p className="font-mono text-xs text-muted">
                          More Builds on GitHub · Compact View
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {GITHUB_SHOWCASE.secondaryProjects.map((proj, idx) => (
                            <article
                              key={proj.title}
                              className="bg-canvas/80 border border-hairline p-5 flex flex-col justify-between gap-4"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                                  <span>Build 0{idx + 2}</span>
                                  <span>{proj.stack}</span>
                                </div>
                                <h5 className="font-serif text-lg font-medium text-ink">
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
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-lavender transition-colors whitespace-nowrap self-start"
                              >
                                <span>View on GitHub</span>
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </a>
                            </article>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. REDDIT — SIDE STAND STORIES (Travel Experiences + Latest Post) */}
                  {activePlatform.id === 'reddit' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      <article className="lg:col-span-7 bg-yellow-soft/45 border border-hairline p-6 sm:p-7 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 font-mono text-xs text-ink">
                            <Compass className="w-4 h-4 text-ink" aria-hidden="true" />
                            <span>Latest Post · Side Stand Stories</span>
                          </div>
                          <h4 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-tight">
                            Road trips, detours, and stories told with the kickstand down.
                          </h4>
                          <p className="text-sm text-muted leading-relaxed">
                            Away from Go services and Kubernetes clusters, I write about motorcycle rides, solo travel moments, and candid road experiences under <strong className="text-ink font-semibold">Side Stand Stories</strong> on Reddit.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
                          <span className="font-mono text-xs text-muted">
                            u/Original_Mongoose_74 · Latest Posts
                          </span>
                          <PixelButton
                            href="https://www.reddit.com/user/Original_Mongoose_74/submitted/"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="yellow"
                            size="sm"
                          >
                            <span>Read Latest Post</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </PixelButton>
                        </div>
                      </article>

                      <div className="lg:col-span-5 bg-canvas border border-hairline p-6 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <p className="font-mono text-xs text-muted">
                            Travel Journal Feed
                          </p>
                          <p className="font-serif text-xl text-ink">
                            Side Stand Stories
                          </p>
                          <p className="text-xs sm:text-sm text-muted leading-relaxed">
                            Every trip starts when the side stand kicks up and becomes a story when it drops back down. Jump directly into my newest Reddit travel posts and comments.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-hairline flex flex-col gap-2.5">
                          <a
                            href="https://www.reddit.com/user/Original_Mongoose_74/submitted/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between text-xs font-semibold text-ink hover:text-lavender py-1"
                          >
                            <span>Latest Submitted Stories</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                          <a
                            href="https://www.reddit.com/user/Original_Mongoose_74/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between text-xs font-semibold text-ink hover:text-lavender py-1"
                          >
                            <span>Full Reddit Profile</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. LINKEDIN — Real Professional Summary */}
                  {activePlatform.id === 'linkedin' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      <article className="md:col-span-7 bg-canvas border border-hairline p-6 space-y-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-ink">
                          <Sparkles className="w-4 h-4 text-lavender" aria-hidden="true" />
                          <span>Career Snapshot · Star Employee of the Month</span>
                        </div>
                        <h4 className="font-serif text-2xl font-medium text-ink">
                          Development Engineer in Cloud at Calsoft
                        </h4>
                        <p className="text-sm text-muted leading-relaxed">
                          Building Go microservices, running 15+ ONAP pods on AWS-hosted Kubernetes clusters, automating CI/CD with Jenkins &amp; AWS CodePipeline, and provisioning multi-cloud environments with Terraform.
                        </p>
                        <p className="text-xs font-mono text-muted">
                          Pune, India · AWS Certified Solutions Architect – Associate
                        </p>
                      </article>

                      <div className="md:col-span-5 bg-sage-soft/45 border border-hairline p-6 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <p className="font-mono text-xs text-muted">Direct Connection</p>
                          <p className="font-serif text-xl text-ink">
                            Let&apos;s connect on LinkedIn
                          </p>
                          <p className="text-xs sm:text-sm text-muted leading-relaxed">
                            Open to conversations around Golang backend architecture, Kubernetes platform engineering, and AI-assisted development workflows.
                          </p>
                        </div>
                        <PixelButton
                          href="https://linkedin.com/in/anshjoshi1811"
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="sage"
                          size="sm"
                        >
                          <span>Connect on LinkedIn</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </PixelButton>
                      </div>
                    </div>
                  )}

                  {/* 4. YOUTUBE — @CloudNetExplained + Latest Video at Top */}
                  {activePlatform.id === 'youtube' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                      <article className="md:col-span-7 bg-canvas border border-hairline flex flex-col justify-between">
                        <div className="aspect-video bg-lavender-soft/35 border-b border-hairline p-6 flex flex-col justify-between">
                          <div className="flex items-center justify-between font-mono text-xs text-muted">
                            <span className="text-ink font-medium">Latest Upload · Top</span>
                            <span>@CloudNetExplained</span>
                          </div>
                          <div className="flex flex-col items-center justify-center flex-1 text-center gap-3">
                            <a
                              href="https://www.youtube.com/@CloudNetExplained/videos"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Watch latest upload on CloudNetExplained YouTube channel"
                              className="w-14 h-14 bg-surface border-2 border-ink shadow-[3px_3px_0_0_#252525] flex items-center justify-center hover:-translate-y-0.5 transition-transform"
                            >
                              <Play className="w-5 h-5 text-ink ml-0.5" aria-hidden="true" />
                            </a>
                            <p className="font-serif text-xl text-ink">
                              CloudNetExplained — Latest Videos
                            </p>
                          </div>
                          <span className="font-mono text-[11px] text-muted">
                            youtube.com/@CloudNetExplained/videos
                          </span>
                        </div>

                        <div className="p-5 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs sm:text-sm text-muted">
                            Watch the newest cloud, networking, and backend walkthrough directly on YouTube.
                          </p>
                          <PixelButton
                            href="https://www.youtube.com/@CloudNetExplained/videos"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="lavender"
                            size="sm"
                          >
                            <span>Watch Latest</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </PixelButton>
                        </div>
                      </article>

                      <div className="md:col-span-5 bg-canvas border border-hairline p-6 flex flex-col justify-between gap-4">
                        <div className="space-y-3">
                          <p className="font-mono text-xs text-muted">Channel Focus</p>
                          <h4 className="font-serif text-2xl text-ink">
                            Cloud &amp; Networking Explained Simply
                          </h4>
                          <p className="text-sm text-muted leading-relaxed">
                            Clear visual explainers on AWS infrastructure, Kubernetes networking, and real cloud engineering patterns—straight from production experience.
                          </p>
                        </div>
                        <a
                          href="https://www.youtube.com/@CloudNetExplained"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-lavender pt-3 border-t border-hairline"
                        >
                          <span>Open @CloudNetExplained Channel</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* 5. MEDIUM — @anshjoshii + Latest Article at Top */}
                  {activePlatform.id === 'medium' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                      <article className="md:col-span-8 bg-canvas border border-hairline p-6 sm:p-7 flex flex-col justify-between gap-5">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between font-mono text-xs text-muted">
                            <span className="text-ink font-medium">Latest Story · Top</span>
                            <span>medium.com/@anshjoshii</span>
                          </div>
                          <h4 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-tight">
                            Latest Engineering Articles on Medium
                          </h4>
                          <p className="text-sm text-muted leading-relaxed">
                            Read my newest write-ups on Golang microservices, Kubernetes clusters, cloud automation, and lessons learned shipping production systems.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
                          <span className="font-mono text-xs text-muted">@anshjoshii</span>
                          <PixelButton
                            href="https://medium.com/@anshjoshii"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="yellow"
                            size="sm"
                          >
                            <span>Read Latest Story</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </PixelButton>
                        </div>
                      </article>

                      <div className="md:col-span-4 bg-yellow-soft/45 border border-hairline p-6 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <p className="font-mono text-xs text-muted">Writing Style</p>
                          <p className="font-serif text-xl text-ink">
                            Practical, production-tested notes
                          </p>
                          <p className="text-xs sm:text-sm text-muted leading-relaxed">
                            No fluff—just clear engineering breakdowns, debugging insights, and repeatable cloud recipes.
                          </p>
                        </div>
                        <span className="font-mono text-[11px] text-muted">
                          medium.com/@anshjoshii
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 6. INSTAGRAM — @its_unsh + Latest Post at Top */}
                  {activePlatform.id === 'instagram' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                      <article className="md:col-span-7 bg-canvas border border-hairline p-6 sm:p-7 flex flex-col justify-between gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between font-mono text-xs text-muted">
                            <span className="text-ink font-medium">Latest Post · Top</span>
                            <span>@its_unsh</span>
                          </div>
                          <h4 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-tight">
                            Latest Snapshots on @its_unsh
                          </h4>
                          <p className="text-sm text-muted leading-relaxed">
                            Road trips, developer community events, candid frames, and moments away from the keyboard—head straight to the latest post at the top of my feed.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
                          <span className="font-mono text-xs text-muted">
                            instagram.com/its_unsh
                          </span>
                          <PixelButton
                            href="https://www.instagram.com/its_unsh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="sage"
                            size="sm"
                          >
                            <span>View Latest Post</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </PixelButton>
                        </div>
                      </article>

                      <div className="md:col-span-5 bg-sage-soft/40 border border-hairline p-6 flex flex-col items-center justify-center text-center gap-3">
                        <TransparentPixelSprite
                          spriteKey="instagram"
                          pixelGrid={84}
                          className="w-32 h-32"
                        />
                        <p className="font-serif text-lg text-ink">@its_unsh</p>
                        <p className="text-xs text-muted max-w-[26ch] leading-relaxed">
                          Behind-the-scenes frames, rides, and everyday stories.
                        </p>
                      </div>
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
