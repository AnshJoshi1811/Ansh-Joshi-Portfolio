import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { PORTRAIT_IMAGE, SITE_META } from '../config/portfolioStructure';
import { downloadFormattedResumeHtml } from '../utils/resumeDownload';
import { HeroPixelField } from './ui/HeroPixelField';
import { PixelButton } from './ui/PixelButton';
import { useLandedStop } from './ui/PixelAnshTravel';

interface HeroSectionProps {
  onNotify: (message: string) => void;
}

const PIXEL_BLOCK_STEPS = [1, 6, 12, 20, 30, 42] as const;

/** Crop of the original photo (fractions of its size): head down to the event badge. */
const PORTRAIT_CROP = { x: 0.03, y: 0.06, w: 0.86, h: 0.85 };

/**
 * Hero: the real portrait pixelates as you scroll, then Pixel Ansh jumps out of
 * the frame into the next section (see PixelAnshTravel).
 */
export function HeroSection({ onNotify }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImgRef = useRef<HTMLImageElement | null>(null);

  const [pixelStepIdx, setPixelStepIdx] = useState(0);
  const [introStepIdx, setIntroStepIdx] = useState<number>(PIXEL_BLOCK_STEPS.length - 1);
  const [imageReady, setImageReady] = useState(false);
  const hasLeaped = useLandedStop() !== 'hero';

  // Draw the photo at the current pixel-block size
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

    const sx = img.naturalWidth * PORTRAIT_CROP.x;
    const sy = img.naturalHeight * PORTRAIT_CROP.y;
    const sw = img.naturalWidth * PORTRAIT_CROP.w;
    const sh = img.naturalHeight * PORTRAIT_CROP.h;

    if (blockSize <= 1) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
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
    offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, tinyW, tinyH);

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
    };
  }, []);

  // Pixel reveal when the photo first loads: big blocks resolve into the sharp photo
  useEffect(() => {
    if (!imageReady) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroStepIdx(0);
      return;
    }
    const timer = window.setInterval(() => {
      setIntroStepIdx((step) => {
        if (step <= 1) window.clearInterval(timer);
        return Math.max(0, step - 1);
      });
    }, 110);
    return () => window.clearInterval(timer);
  }, [imageReady]);

  const shownStepIdx = Math.max(pixelStepIdx, introStepIdx);

  useEffect(() => {
    if (imageReady) renderPortraitCanvas(shownStepIdx);
  }, [shownStepIdx, imageReady, renderPortraitCanvas]);

  // The further you scroll past the hero, the chunkier the portrait gets
  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      rafId = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollDistance = Math.max(0, -rect.top);
      const heroHeight = Math.max(340, rect.height);
      const progress = Math.min(1, scrollDistance / (heroHeight * 0.4));
      setPixelStepIdx(
        Math.min(PIXEL_BLOCK_STEPS.length - 1, Math.floor(progress * PIXEL_BLOCK_STEPS.length)),
      );
    };

    const onScroll = () => {
      if (rafId === 0) rafId = window.requestAnimationFrame(updateOnScroll);
    };

    updateOnScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleDownloadResume = () => {
    downloadFormattedResumeHtml();
    onNotify('Resume downloaded! Open the HTML file and Print to Save as PDF anytime.');
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14"
    >
      <HeroPixelField />
      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <h1
                id="hero-heading"
                className="t-display text-ink"
              >
                {SITE_META.owner}
              </h1>

              <p className="t-lead font-medium text-muted">
                <span className="text-cobalt">{SITE_META.role}</span>, {SITE_META.city}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <PixelButton onClick={handleDownloadResume} variant="surface" size="lg">
                <Download className="w-4 h-4 text-cobalt" aria-hidden="true" />
                <span>Download Resume</span>
              </PixelButton>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 t-small font-medium text-muted">
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
              <a href={`mailto:${SITE_META.email}`} className="hover:text-ink transition-colors">
                {SITE_META.email}
              </a>
            </div>
          </div>

          {/* Portrait: an event-style ID card swinging on its lanyard (Pixel Ansh's starting point) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <FloatingPixels />
            <div className="relative w-full max-w-[340px] mt-2 lg:-mt-36 animate-id-swing">
              {/* Lanyard strap, fading up into the page */}
              <div
                aria-hidden="true"
                className="mx-auto w-7 h-16 lg:h-40 bg-ink overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
              >
                <p className="font-pixel text-[10px] tracking-[0.18em] text-white/75 [writing-mode:vertical-rl] whitespace-nowrap mx-auto">
                  {'ITSANSH.SPACE · '.repeat(6)}
                </p>
              </div>
              {/* Metal clip */}
              <div aria-hidden="true" className="mx-auto -mt-1 w-10 h-5 rounded-md bg-gradient-to-b from-[#CBD5E1] to-[#94A3B8] border border-[#94A3B8] shadow-sm" />
              <div aria-hidden="true" className="mx-auto -mt-1 w-3 h-4 rounded-b-full border-2 border-t-0 border-[#94A3B8]" />

              <div className="-mt-1 bg-surface border border-hairline rounded-[22px] p-3.5 pt-3 shadow-[0_24px_50px_-26px_rgba(15,23,42,0.35)]">
                {/* Slot punched for the clip */}
                <div aria-hidden="true" className="mx-auto mb-2.5 w-12 h-2 rounded-full bg-recessed border border-hairline" />

                <div className="flex items-center justify-between px-1 pb-2.5 t-eyebrow !text-[10px] text-muted">
                  <span className="text-ink">{SITE_META.domain.toUpperCase()}</span>
                  <span>ENGINEER · ID 1811</span>
                </div>

                <button
                  type="button"
                  data-buddy-stop="hero"
                  onClick={() =>
                    document.getElementById('social-platforms')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  aria-label="Scroll down and watch Pixel Ansh jump out of the ID card"
                  className="group relative block w-full aspect-[4/4.3] rounded-xl overflow-hidden bg-recessed cursor-pointer focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
                >
                  <canvas
                    ref={canvasRef}
                    width={420}
                    height={452}
                    aria-label="Portrait photograph of Ansh Joshi"
                    className={`pixel-sprite-img block w-full h-full object-cover transition-[opacity,filter,transform] duration-300 ${
                      hasLeaped ? 'opacity-30 grayscale-[35%] scale-[0.98]' : 'opacity-100 group-hover:scale-[1.015]'
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
                      <p className="t-h4 text-ink">
                        Pixel Ansh jumped out of the frame
                      </p>
                      <p className="t-meta text-muted mt-1">
                        Scroll back up to bring him home
                      </p>
                    </div>
                  )}
                </button>

                <div className="pt-3 px-1 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="t-h4 text-ink">{SITE_META.owner}</p>
                    <p className="t-meta text-muted truncate">
                      {hasLeaped ? 'Pixel Ansh is exploring the page' : 'Scroll to launch Pixel Ansh'}
                    </p>
                  </div>
                  <PixelBarcode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Pixel-block "barcode" for the ID card */
function PixelBarcode() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2];
  return (
    <div aria-hidden="true" className="flex items-end gap-[2px] h-7 shrink-0">
      {bars.map((w, i) => (
        <span key={i} className="block h-full bg-ink" style={{ width: w * 2, opacity: i % 4 === 3 ? 0.35 : 0.9 }} />
      ))}
    </div>
  );
}

/** A few loose pixels drifting around the ID card */
function FloatingPixels() {
  const pixels = [
    { top: '8%', left: '6%', size: 10, color: '#2563EB', delay: '0s' },
    { top: '22%', left: '90%', size: 8, color: '#D97706', delay: '1.2s' },
    { top: '58%', left: '2%', size: 12, color: '#0F172A', delay: '2.1s' },
    { top: '78%', left: '94%', size: 10, color: '#2563EB', delay: '0.6s' },
    { top: '92%', left: '14%', size: 7, color: '#D97706', delay: '1.8s' },
    { top: '40%', left: '97%', size: 6, color: '#0F172A', delay: '2.7s' },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
      {pixels.map((p, i) => (
        <span
          key={i}
          className="absolute animate-pixel-drift"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, backgroundColor: p.color, opacity: 0.22, animationDelay: p.delay }}
        />
      ))}
    </div>
  );
}
