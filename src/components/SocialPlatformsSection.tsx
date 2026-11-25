import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowBigUp, ArrowUpRight, Feather, Heart, Play, Plus, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  SOCIAL_PLATFORMS,
  PORTRAIT_IMAGE,
  type PixelSpriteKey,
  type SocialPlatformId,
} from '../config/portfolioStructure';
import { useLatestFeed, type FeedItem } from '../config/latestFeed';
import { PlatformIcon } from './ui/PlatformIcons';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';
import { BuddyStopSprite } from './ui/PixelAnshTravel';
import { preloadPixelSprite } from './ui/TransparentPixelSprite';

interface PlatformVibe {
  /** Stage background (light tint + a small motif that fits the platform) */
  stage: CSSProperties;
  border: string;
  accent: string;
  soft: string;
  headingFont?: string;
}

const VIBES: Record<SocialPlatformId, PlatformVibe> = {
  // Contribution-graph squares
  github: {
    stage: {
      backgroundColor: '#F6FBF7',
      backgroundImage:
        'linear-gradient(#DCF3E3 0 0), linear-gradient(#C2E9CE 0 0), linear-gradient(#E8F7EC 0 0)',
      backgroundSize: '10px 10px, 10px 10px, 10px 10px',
      backgroundPosition: '24px 24px, 38px 24px, 24px 38px',
      backgroundRepeat: 'no-repeat',
    },
    border: '#CDEBD5',
    accent: '#1A7F37',
    soft: '#DAFBE1',
  },
  // Clean professional dot grid
  linkedin: {
    stage: {
      backgroundColor: '#F3F8FD',
      backgroundImage: 'radial-gradient(rgba(10,102,194,0.12) 1px, transparent 1px)',
      backgroundSize: '18px 18px',
    },
    border: '#CFE2F6',
    accent: '#0A66C2',
    soft: '#E1EEFB',
  },
  // Soft studio scanlines
  youtube: {
    stage: {
      backgroundColor: '#FFF6F6',
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(204,0,0,0.05) 0 1px, transparent 1px 14px)',
    },
    border: '#FBD5D5',
    accent: '#CC0000',
    soft: '#FEE2E2',
  },
  // Warm paper with ruled lines
  medium: {
    stage: {
      backgroundColor: '#FBF8F3',
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(26,26,26,0.06) 0 1px, transparent 1px 26px)',
    },
    border: '#EBD9A8',
    accent: '#A16207',
    soft: '#FEF3C7',
    headingFont: 'Georgia, "Times New Roman", serif',
  },
  // Dashed highway centre line
  reddit: {
    stage: {
      backgroundColor: '#FFF7F2',
      backgroundImage:
        'repeating-linear-gradient(90deg, rgba(255,69,0,0.28) 0 22px, transparent 22px 40px)',
      backgroundSize: '100% 3px',
      backgroundPosition: '0 calc(100% - 34px)',
      backgroundRepeat: 'no-repeat',
    },
    border: '#FED7C3',
    accent: '#FF4500',
    soft: '#FFE8DC',
  },
  // Sunset gradient wash
  instagram: {
    stage: {
      backgroundImage: 'linear-gradient(140deg, #FFF5F7 0%, #FDF4FF 50%, #FFF7ED 100%)',
    },
    border: '#F9D2E4',
    accent: '#D62976',
    soft: '#FCE7F3',
  },
};

/** Little things that float up behind Ansh on each tab (null = contribution squares). */
const BITS: Record<SocialPlatformId, LucideIcon | null> = {
  github: null,
  linkedin: Plus,
  youtube: Play,
  medium: Feather,
  reddit: ArrowBigUp,
  instagram: Heart,
};

const BIT_LAYOUT = [
  { left: '12%', size: 14, delay: 0, duration: 5.2 },
  { left: '26%', size: 10, delay: 1.6, duration: 4.4 },
  { left: '40%', size: 16, delay: 3.1, duration: 5.8 },
  { left: '58%', size: 11, delay: 0.8, duration: 4.8 },
  { left: '72%', size: 15, delay: 2.4, duration: 5.4 },
  { left: '86%', size: 10, delay: 3.8, duration: 4.6 },
  { left: '20%', size: 12, delay: 4.6, duration: 5 },
  { left: '64%', size: 13, delay: 5.2, duration: 5.6 },
];

function FloatingPlatformBits({ platformId, color }: { platformId: SocialPlatformId; color: string }) {
  const Icon = BITS[platformId];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {BIT_LAYOUT.map((bit, i) => (
        <span
          key={i}
          className="absolute bottom-6 animate-bit-rise"
          style={{
            left: bit.left,
            color,
            animationDelay: `${bit.delay}s`,
            animationDuration: `${bit.duration}s`,
          }}
        >
          {Icon ? (
            <Icon style={{ width: bit.size, height: bit.size }} fill={platformId === 'medium' ? 'none' : 'currentColor'} strokeWidth={2.2} />
          ) : (
            <span
              className="block rounded-[3px]"
              style={{ width: bit.size, height: bit.size, backgroundColor: 'currentColor' }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

/** Which Pixel Ansh outfit each tab shows (LinkedIn uses the everyday, lanyard Ansh). */
const OUTFITS: Record<SocialPlatformId, PixelSpriteKey> = {
  github: 'github',
  linkedin: 'hero',
  youtube: 'youtube',
  medium: 'medium',
  reddit: 'reddit',
  instagram: 'instagram',
};

/**
 * Socials: one light-themed stage per platform. Pixel Ansh lives inside the
 * stage, changes outfit when you click a tab and hops on every switch.
 */
export function SocialPlatformsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<SocialPlatformId>('github');

  const platform = SOCIAL_PLATFORMS.find((p) => p.id === selectedId) ?? SOCIAL_PLATFORMS[0];
  const feed = useLatestFeed()[platform.id];
  const vibe = VIBES[platform.id];

  // Process every outfit up front so switching never shows an empty stage
  useEffect(() => {
    Object.values(OUTFITS).forEach((outfit) => preloadPixelSprite(outfit, 144));
  }, []);

  return (
    <section
      id="social-platforms"
      aria-labelledby="social-platforms-heading"
      className="border-t border-hairline py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionReveal>
          <SectionHeader
            index="02"
            title="Where I build, teach & share"
            headingId="social-platforms-heading"
          />

          {/* Themed stage */}
          <div
            id="social-stage"
            role="tabpanel"
            aria-label={`${platform.name}: latest`}
            className="relative grid grid-cols-1 md:grid-cols-[360px_minmax(0,1fr)] md:min-h-[480px] gap-2 md:gap-6"
          >
            {/* Left: Pixel Ansh's game frame with the platform switcher */}
            <div className="relative px-5 py-6 flex flex-col items-center blueprint-dots">
              <FrameCorners />

              <p className="relative z-10 inline-flex items-center gap-2 t-eyebrow text-ink">
                <span style={{ color: vibe.accent }}>
                  <PlatformIcon platform={platform.id} className="w-4 h-4" />
                </span>
                {platform.name}
                <span className="t-meta normal-case tracking-normal text-muted truncate max-w-[150px]">· {platform.handle}</span>
              </p>

              <div className="relative w-full flex-1 flex flex-col items-center justify-center py-4">
                {/* Platform-themed icons drifting up behind Ansh */}
                <FloatingPlatformBits key={selectedId} platformId={selectedId} color={vibe.accent} />
                <BuddyStopSprite
                  stop="social-platforms"
                  spriteKey={OUTFITS[selectedId]}
                  hopKey={selectedId}
                  alt={`Pixel Ansh dressed for ${platform.name}`}
                  className="relative w-52 h-52 sm:w-56 sm:h-56"
                />
                {/* Pixel platform he stands on */}
                <span aria-hidden="true" className="relative -mt-3 h-3 w-48 border-2 border-ink/80 bg-hairline-strong/80" />
              </div>

              {/* Platform switcher */}
              <div role="tablist" aria-label="Choose a platform" className="relative z-10 flex flex-nowrap justify-center gap-1.5">
                {SOCIAL_PLATFORMS.map((p) => {
                  const isSelected = p.id === selectedId;
                  const tabVibe = VIBES[p.id];
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="social-stage"
                      aria-label={p.name}
                      title={p.name}
                      onClick={() => setSelectedId(p.id)}
                      style={
                        isSelected
                          ? {
                              backgroundColor: tabVibe.accent,
                              borderColor: '#0F172A',
                              color: '#FFFFFF',
                              boxShadow: '3px 3px 0 0 #0F172A',
                            }
                          : ({ '--tab-accent': tabVibe.accent } as CSSProperties)
                      }
                      className={`w-10 h-10 flex items-center justify-center border-2 transition-[transform,box-shadow,color] duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 ${
                        isSelected
                          ? '-translate-x-px -translate-y-px'
                          : 'bg-white border-ink/80 text-ink hover:text-[var(--tab-accent)] hover:-translate-y-0.5'
                      }`}
                    >
                      <PlatformIcon platform={p.id} className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              <a
                href={platform.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: vibe.accent, boxShadow: '4px 4px 0 0 #0F172A' }}
                className="relative z-10 mt-4 w-full max-w-[300px] inline-flex items-center justify-center gap-2 py-3 border-2 border-ink t-eyebrow !text-[13px] text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Open {platform.name}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Newest item as a preview card, then short links to the next few */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={platform.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="min-w-0 py-2 md:py-6 flex flex-col justify-center gap-5"
              >
                <LatestCard platformId={platform.id} platformName={platform.name} item={feed.featured} vibe={vibe} />

                {/* Same height on every tab: room for three links, profile link if a feed has none */}
                {(
                  <div className="space-y-2 min-h-[166px]">
                    <p className="t-eyebrow text-muted">More from {platform.name}</p>
                    <ul className="grid gap-1.5">
                      {(feed.more.length > 0
                        ? feed.more.slice(0, 3)
                        : [{ title: `Everything on ${platform.name}`, url: platform.profileUrl, date: 'Profile' }]
                      ).map((item) => (
                        <li key={item.url + item.title}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ borderColor: vibe.border }}
                            className="group flex items-center gap-3 rounded-lg border bg-white/75 px-3.5 py-2.5 hover:bg-white transition-colors"
                          >
                            <span className="min-w-0 flex-1 t-small font-semibold text-ink truncate">{item.title}</span>
                            <span className="shrink-0 t-meta text-muted">{item.date}</span>
                            <ArrowUpRight
                              className="w-4 h-4 shrink-0 text-muted group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/** Corner brackets around Pixel Ansh's frame */
function FrameCorners() {
  const corner = 'absolute w-5 h-5 border-ink/35';
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${corner} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${corner} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}

const CTA: Record<SocialPlatformId, string> = {
  github: 'Open repo',
  linkedin: 'Connect on LinkedIn',
  youtube: 'Watch latest',
  medium: 'Read latest story',
  reddit: 'Read the story',
  instagram: 'Watch the reel',
};

interface LatestCardProps {
  platformId: SocialPlatformId;
  platformName: string;
  item: FeedItem;
  vibe: PlatformVibe;
}

/** The newest post/video/repo as a preview card with a hard pixel shadow. */
function LatestCard({ platformId, platformName, item, vibe }: LatestCardProps) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ borderColor: vibe.accent, boxShadow: `6px 6px 0 0 ${vibe.accent}33` }}
      className="group grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] lg:h-[212px] rounded-md border-2 bg-white overflow-hidden transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
    >
      <div
        className="relative h-40 lg:h-full overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2"
        style={{ borderColor: vibe.accent }}
      >
        <PreviewMedia platformId={platformId} item={item} vibe={vibe} />
      </div>

      <div className="min-w-0 p-4 sm:p-5 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 t-eyebrow text-ink">
            <PlatformIcon platform={platformId} className="w-4 h-4" />
            {platformName}
          </span>
          {item.date && (
            <span className="inline-flex items-center gap-1.5 t-meta text-muted">
              <span aria-hidden="true" className="w-1.5 h-1.5" style={{ backgroundColor: vibe.accent }} />
              {item.date}
            </span>
          )}
        </div>
        <p className="mt-2.5 t-h4 text-ink line-clamp-2">{item.title}</p>
        {item.excerpt && <p className="mt-1.5 t-small text-muted line-clamp-2">{item.excerpt}</p>}
        <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t border-hairline">
          <span className="inline-flex items-center gap-1 t-eyebrow" style={{ color: vibe.accent }}>
            {CTA[platformId]}
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </span>
          {item.meta && <span className="t-meta text-muted truncate">{item.meta}</span>}
        </div>
      </div>
    </a>
  );
}

/** Deterministic 0..n-1 from a string, so the GitHub grid looks the same for the same repo. */
function hashOf(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function PreviewMedia({ platformId, item, vibe }: { platformId: SocialPlatformId; item: FeedItem; vibe: PlatformVibe }) {
  if (item.image) {
    return (
      <>
        <img
          src={item.image}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {platformId === 'youtube' && (
          <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 bg-white px-2.5 py-1 border-2 t-eyebrow text-ink" style={{ borderColor: vibe.accent }}>
            <Play className="w-3.5 h-3.5" fill={vibe.accent} stroke={vibe.accent} aria-hidden="true" />
            Watch
          </span>
        )}
      </>
    );
  }

  if (platformId === 'github') {
    const rand = hashOf(item.title);
    const shades = ['#DCF3E3', '#A7E3B8', '#5FC07A', vibe.accent];
    return (
      <div className="absolute inset-0 p-4 flex flex-col gap-3" style={{ backgroundColor: '#F6FBF7' }}>
        <div className="flex items-center justify-between gap-2 t-meta">
          <span className="truncate text-ink">
            ANSHJOSHI1811 / <span style={{ color: vibe.accent }}>{item.title}</span>
          </span>
          {item.meta && <span className="shrink-0 text-muted">{item.meta}</span>}
        </div>
        <div className="grid grid-cols-10 gap-1.5 flex-1 content-start">
          {Array.from({ length: 40 }, (_, i) => (
            <span
              key={i}
              className="aspect-square rounded-[3px]"
              style={{ backgroundColor: shades[Math.floor(rand() * shades.length)] }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (platformId === 'linkedin') {
    return (
      <div className="absolute inset-0 p-4 flex flex-col gap-3" style={{ backgroundColor: '#F3F8FD' }}>
        <div className="flex items-center gap-3">
          <img src={PORTRAIT_IMAGE} alt="" className="w-11 h-11 object-cover object-top border-2" style={{ borderColor: vibe.accent }} />
          <div className="min-w-0">
            <p className="t-eyebrow text-ink">Ansh Joshi</p>
            <p className="t-meta text-muted truncate">Development Engineer · Calsoft</p>
          </div>
        </div>
        <p className="t-meta" style={{ color: vibe.accent }}>#cloud · #kubernetes · #aws</p>
        <span className="h-2 w-11/12 bg-[#CFE2F6]" />
        <span className="h-2 w-2/3 bg-[#E1EEFB]" />
      </div>
    );
  }

  if (platformId === 'reddit') {
    return (
      <div className="absolute inset-0 p-4 flex flex-col justify-between" style={{ backgroundColor: '#FFF7F2' }}>
        <span className="inline-flex items-center gap-1.5 t-meta" style={{ color: vibe.accent }}>
          <ArrowBigUp className="w-4 h-4" fill={vibe.accent} aria-hidden="true" />
          Side Stand Stories
        </span>
        <p className="t-small font-semibold text-ink line-clamp-3">“{item.title}”</p>
        <span
          aria-hidden="true"
          className="block h-1"
          style={{ backgroundImage: `repeating-linear-gradient(90deg, ${vibe.accent} 0 18px, transparent 18px 32px)` }}
        />
      </div>
    );
  }

  // Instagram (and any platform without an image): a reel-style frame
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2"
      style={{ backgroundImage: 'linear-gradient(140deg, #FEDA75 0%, #FA7E1E 30%, #D62976 60%, #962FBF 85%)' }}
    >
      <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
        <Play className="w-5 h-5 ml-0.5" fill={vibe.accent} stroke={vibe.accent} aria-hidden="true" />
      </span>
      <span className="t-eyebrow text-white">Reel</span>
    </div>
  );
}
