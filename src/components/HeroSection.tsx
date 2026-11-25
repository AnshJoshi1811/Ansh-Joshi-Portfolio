import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { useReducedMotion, useScroll } from 'motion/react';
import { PORTRAIT_IMAGE, SECTION_THEMES, SITE_META } from '../config/portfolioStructure';
import { downloadFormattedResumeHtml } from '../utils/resumeDownload';
import { PixelButton } from './ui/PixelButton';
import { SectionReveal } from './ui/SectionReveal';

// Heavy, crisp stepped pixelation blocks as you scroll past Hero
const HERO_PIXEL_LEVELS = [52, 34, 22, 14, 9, 6];

interface HeroSectionProps {
  onBuddyReleaseChange: (released: boolean) => void;
  onNotify: (message: string) => void;
}

export function HeroSection({
  onBuddyReleaseChange,
  onNotify,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const releasedRef = useRef(false);

  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.src = PORTRAIT_IMAGE;
    img.onload = () => {
      imgRef.current = img;
      setPhotoLoaded(true);
    };
    img.onerror = () => {
      setImageFailed(true);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      setScrollRatio(clamped);

      const shouldRelease = clamped >= 0.36;
      if (shouldRelease !== releasedRef.current) {
        releasedRef.current = shouldRelease;
        onBuddyReleaseChange(shouldRelease);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, onBuddyReleaseChange]);

  const activeGridSize = (() => {
    if (prefersReducedMotion || scrollRatio <= 0.04) return null;
    const normalized = Math.min(1, (scrollRatio - 0.04) / 0.42);
    const idx = Math.min(
      HERO_PIXEL_LEVELS.length - 1,
      Math.floor(normalized * HERO_PIXEL_LEVELS.length),
    );
    return HERO_PIXEL_LEVELS[idx];
  })();

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !photoLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetW = 480;
    const targetH = 600;
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const srcW = img.naturalWidth;
    const srcH = img.naturalHeight;
    const targetAspect = targetW / targetH;
    const srcAspect = srcW / srcH;

    let sx = 0;
    let sy = 0;
    let sw = srcW;
    let sh = srcH;

    if (srcAspect > targetAspect) {
      sw = srcH * targetAspect;
      sx = (srcW - sw) / 2;
    } else {
      sh = srcW / targetAspect;
      sy = 0;
    }

    ctx.clearRect(0, 0, targetW, targetH);

    if (activeGridSize === null) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
      return;
    }

    const offW = activeGridSize;
    const offH = Math.max(6, Math.round(activeGridSize * (targetH / targetW)));
    const offscreen = document.createElement('canvas');
    offscreen.width = offW;
    offscreen.height = offH;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.imageSmoothingEnabled = true;
    offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, offW, offH);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, offW, offH, 0, 0, targetW, targetH);
  }, [photoLoaded, activeGridSize]);

  const handoffProgress =
    prefersReducedMotion || scrollRatio < 0.3
      ? 0
      : Math.min(1, (scrollRatio - 0.3) / 0.32);
  const portraitDropY = handoffProgress * 32;
  const portraitOpacity = 1 - handoffProgress * 0.55;
  const isPixelating = activeGridSize !== null;

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      style={{ backgroundColor: SECTION_THEMES.hero }}
      className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-10 lg:gap-12">
            {/* Left column: Real Hero Introduction */}
            <div className="lg:col-span-7 flex flex-col justify-between py-1 sm:py-3">
              <div className="space-y-6 sm:space-y-7">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-muted">
                  <span>{SITE_META.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>Calsoft</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-ink font-medium">{SITE_META.award}</span>
                </div>

                <div className="space-y-3">
                  <h1
                    id="hero-heading"
                    className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] font-medium tracking-tight text-ink leading-[1.06]"
                  >
                    {SITE_META.owner}
                  </h1>
                  <p className="font-serif italic text-xl sm:text-2xl text-lavender leading-snug">
                    {SITE_META.role}
                  </p>
                </div>

                <p className="max-w-xl text-[15px] sm:text-base text-muted leading-[1.7] border-t border-b border-hairline py-6">
                  {SITE_META.summary}
                </p>

                {/* Crisp unboxed impact ledger from real resume */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-ink">
                  <span className="font-mono tabular-nums">
                    <strong className="font-semibold">2.5 yrs</strong> Go &amp; Cloud
                  </span>
                  <span aria-hidden="true" className="text-hairline-strong">/</span>
                  <span className="font-mono tabular-nums">
                    <strong className="font-semibold">15+</strong> K8s Microservices
                  </span>
                  <span aria-hidden="true" className="text-hairline-strong">/</span>
                  <span className="font-mono tabular-nums">
                    <strong className="font-semibold">22 → 4</strong> Jenkins Pipelines
                  </span>
                  <span aria-hidden="true" className="text-hairline-strong">/</span>
                  <span className="font-mono tabular-nums">
                    <strong className="font-semibold">-35%</strong> Query Timeouts
                  </span>
                </div>
              </div>

              {/* Stepped-pixel CTA row */}
              <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-4">
                <PixelButton href="#social-platforms" variant="lavender" size="lg">
                  <span>Drop Main Character</span>
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </PixelButton>
                <PixelButton
                  variant="yellow"
                  size="lg"
                  onClick={() => {
                    downloadFormattedResumeHtml();
                    onNotify('Resume downloaded (open & Print → Save as PDF anytime).');
                  }}
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </PixelButton>
              </div>
            </div>

            {/* Right column: Scroll-pixelating Original Portrait */}
            <div className="lg:col-span-5 flex flex-col">
              <div
                style={{
                  transform: `translateY(${portraitDropY}px)`,
                  opacity: portraitOpacity,
                }}
                className={`flex-1 min-h-[400px] sm:min-h-[470px] lg:min-h-[510px] bg-surface p-4 sm:p-5 flex flex-col justify-between transition-[box-shadow,border-color] duration-150 ${
                  isPixelating ? 'pixel-stage-frame' : 'border border-hairline'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs text-muted pb-3 border-b border-hairline">
                  <span>
                    {isPixelating ? 'Pixelating Portrait…' : 'Original Portrait'}
                  </span>
                  <span className="tabular-nums text-ink">
                    {activeGridSize !== null
                      ? `${activeGridSize}×${Math.round(activeGridSize * 1.25)} grid`
                      : 'Ansh Joshi'}
                  </span>
                </div>

                <div className="relative flex-1 my-4 bg-recessed border border-hairline/80 overflow-hidden min-h-[320px] sm:min-h-[370px]">
                  {!imageFailed ? (
                    <>
                      <canvas
                        ref={canvasRef}
                        aria-label="Portrait of Ansh Joshi that pixelates heavily as you scroll down"
                        className="absolute inset-0 w-full h-full object-cover pixel-sprite-img"
                      />
                      {!photoLoaded && (
                        <img
                          src={PORTRAIT_IMAGE}
                          alt="Portrait of Ansh Joshi"
                          referrerPolicy="no-referrer"
                          onError={() => setImageFailed(true)}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <p className="font-serif text-lg text-ink">
                        Portrait Unavailable
                      </p>
                      <p className="mt-1.5 text-xs text-muted max-w-[26ch] leading-relaxed">
                        Unable to load the original portrait asset.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between font-mono text-[11px] text-muted pt-3 border-t border-hairline">
                  <span>
                    {scrollRatio >= 0.36
                      ? 'Main character dropped on left ↓'
                      : isPixelating
                        ? 'Keep scrolling to drop on left'
                        : 'Scroll down to pixelate & drop'}
                  </span>
                  <span className="tabular-nums">
                    {Math.round(Math.min(1, scrollRatio / 0.44) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated scroll handoff strip */}
          <div className="mt-14 sm:mt-16 pt-6 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-muted">
              Scroll past the portrait to pixelate it down to chunky 6px blocks—your 16-bit main character drops onto the left stage and guides you across every section.
            </p>
            <a
              href="#social-platforms"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-lavender transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-lavender focus-visible:outline-offset-4"
            >
              <span>02. Social &amp; Featured Work</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
