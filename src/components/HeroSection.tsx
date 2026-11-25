import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Download, RotateCcw } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import {
  HERO_METRICS,
  PORTRAIT_IMAGE,
  SITE_META,
} from '../config/portfolioStructure';
import { downloadFormattedResumeHtml } from '../utils/resumeDownload';
import { PeekOnHover } from './ui/PeekOnHover';
import { PixelButton } from './ui/PixelButton';

export interface JumpLaunchCoords {
  startX: number;
  startY: number;
  scrollAfterJump?: boolean;
}

interface HeroSectionProps {
  buddyLanded: boolean;
  onLaunchJump: (coords: JumpLaunchCoords) => void;
  onResetBuddy: () => void;
  onNotify: (message: string) => void;
}

const PIXEL_BLOCK_STEPS = [1, 6, 12, 20, 30, 42] as const;

/**
 * Section 01 — Overall Software Engineer Hero.
 * Clean architectural split with real portrait launchpad.
 * Starting jump plays ONLY from here—with a crisp 220ms wind-up delay after
 * pixel-block morphing before launching Pixel Ansh in a parabolic arc to the stage!
 */
export function HeroSection({
  buddyLanded,
  onLaunchJump,
  onResetBuddy,
  onNotify,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitBoxRef = useRef<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImgRef = useRef<HTMLImageElement | null>(null);
  const launchedRef = useRef(false);
  const windingUpRef = useRef(false);
  const manualOverrideRef = useRef(false);
  const morphTimersRef = useRef<number[]>([]);

  const [pixelStepIdx, setPixelStepIdx] = useState(0);
  const [isWindingUp, setIsWindingUp] = useState(false);
  const [hasLeaped, setHasLeaped] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  const clearMorphTimers = useCallback(() => {
    morphTimersRef.current.forEach((id) => window.clearTimeout(id));
    morphTimersRef.current = [];
    windingUpRef.current = false;
    setIsWindingUp(false);
  }, []);

  // Render real photograph with live pixel-block morphing
  const renderPortraitCanvas = useCallback((stepIndex: number) => {
    const canvas = canvasRef.current;
    const img = loadedImgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const blockSize = PIXEL_BLOCK_STEPS[stepIndex] ?? 1;

    ctx.clearRect(0, 0, width, height);

    if (blockSize <= 1) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      return;
    }

    const tinyW = Math.max(8, Math.round(width / blockSize));
    const tinyH = Math.max(8, Math.round(height / blockSize));

    const offscreen = document.createElement('canvas');
    offscreen.width = tinyW;
    offscreen.height = tinyH;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.imageSmoothingEnabled = true;
    offCtx.drawImage(img, 0, 0, tinyW, tinyH);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, tinyW, tinyH, 0, 0, width, height);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.src = PORTRAIT_IMAGE;

    img.onload = () => {
      loadedImgRef.current = img;
      setImageReady(true);
      renderPortraitCanvas(pixelStepIdx);
    };
  }, [renderPortraitCanvas, pixelStepIdx]);

  useEffect(() => {
    if (imageReady) {
      renderPortraitCanvas(pixelStepIdx);
    }
  }, [pixelStepIdx, imageReady, renderPortraitCanvas]);

  useEffect(() => {
    return () => clearMorphTimers();
  }, [clearMorphTimers]);

  // Deliberate 220ms wind-up delay before launching the starting parabolic jump
  const scheduleDelayedLaunch = useCallback(
    (scrollAfterJump = false) => {
      if (launchedRef.current || windingUpRef.current) return;

      const fireLaunch = () => {
        const rect = portraitBoxRef.current?.getBoundingClientRect();
        const startX = rect
          ? rect.left + rect.width * 0.5
          : Math.min(window.innerWidth * 0.72, window.innerWidth - 160);
        const startY = rect ? rect.top + rect.height * 0.45 : 260;

        windingUpRef.current = false;
        setIsWindingUp(false);
        launchedRef.current = true;
        setHasLeaped(true);
        onLaunchJump({ startX, startY, scrollAfterJump });
      };

      if (prefersReducedMotion) {
        fireLaunch();
        return;
      }

      windingUpRef.current = true;
      setIsWindingUp(true);
      const delayId = window.setTimeout(fireLaunch, 220);
      morphTimersRef.current.push(delayId);
    },
    [onLaunchJump, prefersReducedMotion],
  );

  // Trigger rapid pixel morph -> 220ms wind-up crouch -> parabolic jump out of portrait
  const triggerInteractiveJump = useCallback(
    (scrollAfterJump = false) => {
      clearMorphTimers();
      manualOverrideRef.current = true;
      launchedRef.current = false;
      setHasLeaped(false);
      onResetBuddy();

      if (prefersReducedMotion) {
        setPixelStepIdx(PIXEL_BLOCK_STEPS.length - 1);
        scheduleDelayedLaunch(scrollAfterJump);
        return;
      }

      setPixelStepIdx(0);
      const steps = [1, 2, 4, 5];
      steps.forEach((step, idx) => {
        const timerId = window.setTimeout(() => {
          setPixelStepIdx(step);
          if (idx === steps.length - 1) {
            scheduleDelayedLaunch(scrollAfterJump);
          }
        }, (idx + 1) * 75);
        morphTimersRef.current.push(timerId);
      });
    },
    [clearMorphTimers, onResetBuddy, prefersReducedMotion, scheduleDelayedLaunch],
  );

  // Scroll-driven pixelation & automatic starting jump with wind-up delay
  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      rafId = 0;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollDistance = Math.max(0, -rect.top);
      const heroHeight = Math.max(340, rect.height);
      const progress = Math.min(1, scrollDistance / (heroHeight * 0.5));

      if (progress < 0.04) {
        manualOverrideRef.current = false;
      }

      if (manualOverrideRef.current) return;

      const nextStep = Math.min(
        PIXEL_BLOCK_STEPS.length - 1,
        Math.floor(progress * PIXEL_BLOCK_STEPS.length),
      );
      setPixelStepIdx(nextStep);

      if (progress >= 0.36 && !launchedRef.current && !windingUpRef.current) {
        scheduleDelayedLaunch(false);
      } else if (progress < 0.1 && (launchedRef.current || windingUpRef.current)) {
        clearMorphTimers();
        launchedRef.current = false;
        setHasLeaped(false);
        onResetBuddy();
      }
    };

    const onScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(updateOnScroll);
      }
    };

    updateOnScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, [clearMorphTimers, onResetBuddy, scheduleDelayedLaunch]);

  const handleDownloadResume = () => {
    downloadFormattedResumeHtml();
    onNotify('Resume downloaded! Open the HTML file and Print to Save as PDF anytime.');
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative bg-canvas blueprint-dots pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[280px] xl:pl-[324px]">
        {/* Two-Column Authoritative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* LEFT COLUMN (7 cols): Overall Software Engineer Identity & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <p className="font-mono text-xs sm:text-[13px] font-medium text-cobalt">
                {SITE_META.role} · {SITE_META.location}
              </p>

              <h1
                id="hero-heading"
                className="font-display text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.03em] leading-[1.06] text-ink"
              >
                {SITE_META.owner}
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-[54ch]">
                {SITE_META.heroLead}
              </p>

              <p className="text-sm text-subtle leading-relaxed max-w-[56ch]">
                Building at <strong className="text-ink font-semibold">Calsoft</strong> ·{' '}
                <span className="text-amber font-medium">{SITE_META.award}</span> · AWS Certified Solutions Architect
              </p>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <PixelButton
                onClick={() => triggerInteractiveJump(true)}
                variant="primary"
                size="lg"
              >
                <span>{buddyLanded ? 'Replay Jump & Explore' : 'Watch Pixel Ansh Jump'}</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </PixelButton>

              <PixelButton
                onClick={handleDownloadResume}
                variant="surface"
                size="lg"
              >
                <Download className="w-4 h-4 text-cobalt" aria-hidden="true" />
                <span>Download Resume</span>
              </PixelButton>
            </div>

            {/* Quiet Unboxed Text Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm font-medium text-muted">
              <a
                href="https://github.com/ANSHJOSHI1811"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-ink transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <span aria-hidden="true" className="text-hairline-strong">·</span>
              <a
                href="https://linkedin.com/in/anshjoshi1811"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-ink transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <span aria-hidden="true" className="text-hairline-strong">·</span>
              <a
                href="https://anshjoshi1811.github.io/SystemDesign/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-cobalt transition-colors"
              >
                <span>SystemDesign Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <span aria-hidden="true" className="text-hairline-strong">·</span>
              <a
                href={`mailto:${SITE_META.email}`}
                className="hover:text-ink transition-colors"
              >
                {SITE_META.email}
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN (5 cols): Portrait Launchpad with Nose-Only Hover Sneak */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <PeekOnHover align="right" size="md">
              <div className="bg-surface border border-hairline rounded-2xl p-3.5 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.18)]">
                <button
                  ref={portraitBoxRef}
                  type="button"
                  onClick={() => triggerInteractiveJump(false)}
                  aria-label="Click portrait to morph into Pixel Ansh and launch the starting jump"
                  className="group relative block w-full aspect-[4/4.3] rounded-xl overflow-hidden bg-recessed cursor-pointer focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
                >
                  <canvas
                    ref={canvasRef}
                    width={420}
                    height={452}
                    aria-label="Portrait photograph of Ansh Joshi"
                    className={`pixel-sprite-img block w-full h-full object-cover transition-[opacity,filter,transform] duration-200 ${
                      hasLeaped
                        ? 'opacity-30 grayscale-[35%] scale-[0.98]'
                        : isWindingUp
                          ? 'scale-y-[0.92] scale-x-[1.04] translate-y-2'
                          : 'opacity-100 group-hover:scale-[1.015]'
                    }`}
                  />

                  {!imageReady && (
                    <img
                      src={PORTRAIT_IMAGE}
                      alt="Ansh Joshi"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {hasLeaped && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-canvas/55 backdrop-blur-[1px]">
                      <p className="font-display text-sm font-bold text-ink">
                        Pixel Ansh jumped out of frame
                      </p>
                      <p className="font-mono text-xs text-muted mt-1">
                        Click Pixel Ansh anytime to make him jump
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-surface border border-hairline-strong px-3 py-1.5 text-xs font-semibold text-cobalt shadow-xs">
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Replay jump</span>
                      </span>
                    </div>
                  )}
                </button>

                <div className="pt-3 px-1 flex items-center justify-between gap-2 font-mono text-[11px] text-muted">
                  <span>
                    {hasLeaped
                      ? 'Mascot active along the page'
                      : isWindingUp
                        ? 'Crouching to leap…'
                        : pixelStepIdx > 0
                          ? `Morphing to 32-bit · ${Math.round((pixelStepIdx / (PIXEL_BLOCK_STEPS.length - 1)) * 100)}%`
                          : 'Click portrait or scroll to launch'}
                  </span>
                  <span className="text-cobalt font-medium">{SITE_META.domain}</span>
                </div>
              </div>
            </PeekOnHover>
          </div>
        </div>

        {/* Full-Width Proof Metrics Strip with Sneaking Ansh Hover */}
        <PeekOnHover align="right" size="sm" className="mt-12 sm:mt-14">
          <div className="bg-surface border border-hairline rounded-2xl grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-hairline">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="px-6 py-5 flex flex-col gap-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink tabular-nums">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm text-muted">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </PeekOnHover>
      </div>
    </section>
  );
}
