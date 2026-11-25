import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { PixelSpriteKey } from '../config/portfolioStructure';
import { TransparentPixelSprite } from './ui/TransparentPixelSprite';

export interface ActiveJumpFlight {
  id: number;
  startX: number;
  startY: number;
}

interface FloatingPixelBuddyProps {
  visible: boolean;
  jumpFlight: ActiveJumpFlight | null;
  onJumpFlightComplete: () => void;
  spriteKey: PixelSpriteKey;
  dockSide: 'left' | 'right';
  sectionIndexLabel: string;
}

/**
 * The Sole Signature Mascot of itsansh.space:
 * - Bigger, high-detail 32-bit Pixel Ansh (`lg:w-56 xl:w-64`).
 * - Starting jump launches in a true parabolic arc ONLY from the Hero portrait.
 * - Zero boring repeatable speech bubbles—clicking Pixel Ansh ONLY makes him jump!
 * - Scroll-velocity-gated jump: gentle scrolling stays calm; fast scrolling (>1.35 px/ms)
 *   triggers an expressive mid-air leap!
 * - Smoothly shifts to the RIGHT side when viewing the Social Media section so there is
 *   never a double-character clutter on the left, then glides smoothly back to the left.
 */
export function FloatingPixelBuddy({
  visible,
  jumpFlight,
  onJumpFlightComplete,
  spriteKey,
  dockSide,
  sectionIndexLabel,
}: FloatingPixelBuddyProps) {
  const prefersReducedMotion = useReducedMotion();
  const [minimized, setMinimized] = useState(false);
  const [isJumpingNow, setIsJumpingNow] = useState(false);
  const [jumpTick, setJumpTick] = useState(0);
  const [dustTick, setDustTick] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280,
  );

  const jumpTimerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(
    typeof window !== 'undefined' ? window.scrollY : 0,
  );
  const lastScrollTimeRef = useRef<number>(
    typeof performance !== 'undefined' ? performance.now() : 0,
  );
  const lastVelocityJumpAtRef = useRef<number>(0);

  // Track viewport width for crisp GPU-accelerated left <-> right docking transitions
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Genuine mid-air jump: swaps to `jumping` sprite + vertical arc + touchdown dust
  const performRealJump = useCallback(() => {
    if (prefersReducedMotion) return;
    if (jumpTimerRef.current !== null) {
      window.clearTimeout(jumpTimerRef.current);
    }
    setIsJumpingNow(true);
    setJumpTick((prev) => prev + 1);

    jumpTimerRef.current = window.setTimeout(() => {
      setIsJumpingNow(false);
      setDustTick((prev) => prev + 1);
      jumpTimerRef.current = null;
    }, 540);
  }, [prefersReducedMotion]);

  // Scroll-speed-gated jump: ONLY jumps when scrolling above a brisk velocity threshold
  useEffect(() => {
    if (prefersReducedMotion || !visible || minimized) return;

    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = now - lastScrollTimeRef.current;
      const dy = Math.abs(currentY - lastScrollYRef.current);

      if (dt >= 24) {
        const velocityPxPerMs = dy / dt;
        lastScrollYRef.current = currentY;
        lastScrollTimeRef.current = now;

        // Require genuinely fast scrolling (> 1.4 px/ms & >= 48px burst) with cooldown
        if (
          velocityPxPerMs > 1.4 &&
          dy >= 48 &&
          now - lastVelocityJumpAtRef.current > 1400
        ) {
          lastVelocityJumpAtRef.current = now;
          performRealJump();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visible, minimized, prefersReducedMotion, performRealJump]);

  // Trigger subtle landing dust once right when touching down from the starting Hero jump
  useEffect(() => {
    if (visible && !prefersReducedMotion) {
      setDustTick((prev) => prev + 1);
    }
  }, [visible, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (jumpTimerRef.current !== null) {
        window.clearTimeout(jumpTimerRef.current);
      }
    };
  }, []);

  // Compute starting Hero parabolic flight into the active dock side
  const renderParabolicFlight = () => {
    if (!jumpFlight || prefersReducedMotion) return null;

    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const isDesktop = vw >= 1024;
    const isXl = vw >= 1280;

    const spriteFootprint = isXl ? 256 : isDesktop ? 224 : 112;
    const marginX = isXl ? 28 : isDesktop ? 16 : 12;

    const targetX =
      dockSide === 'right' && isDesktop
        ? vw - marginX - spriteFootprint * 0.5
        : marginX + spriteFootprint * 0.5;
    const targetY = vh - (isDesktop ? 164 : 84);

    const sx = jumpFlight.startX;
    const sy = jumpFlight.startY;
    const peakY = Math.max(68, Math.min(sy, targetY) - (isDesktop ? 190 : 120));

    const cx = (sx + targetX) * 0.5;
    const bezierX = (t: number) =>
      (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * targetX;
    const bezierY = (t: number) =>
      (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * peakY + t * t * targetY;

    const halfFlightSprite = isDesktop ? 104 : 80;
    const xKeyframes = [0, 0.25, 0.5, 0.78, 1].map(
      (t) => bezierX(t) - halfFlightSprite,
    );
    const yKeyframes = [0, 0.25, 0.5, 0.78, 1].map(
      (t) => bezierY(t) - halfFlightSprite,
    );

    return (
      <motion.div
        key={`flight-${jumpFlight.id}`}
        aria-hidden="true"
        initial={{
          x: xKeyframes[0],
          y: yKeyframes[0],
          scale: 0.78,
          rotate: 10,
          opacity: 1,
        }}
        animate={{
          x: xKeyframes,
          y: yKeyframes,
          scale: [0.78, 1.08, 1.16, 1.04, 0.98],
          rotate: [10, -14, -20, -8, 0],
          opacity: [1, 1, 1, 1, 0.96],
        }}
        transition={{
          duration: 0.78,
          times: [0, 0.25, 0.5, 0.78, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={onJumpFlightComplete}
        className="pointer-events-none fixed top-0 left-0 z-50"
      >
        <TransparentPixelSprite
          spriteKey="jumping"
          pixelGrid={144}
          className="w-40 h-40 lg:w-52 lg:h-52 drop-shadow-[0_18px_24px_rgba(15,23,42,0.22)]"
        />
      </motion.div>
    );
  };

  if (jumpFlight && !visible) {
    return renderParabolicFlight();
  }

  if (!visible) {
    return null;
  }

  const isDesktop = viewportWidth >= 1024;
  const isXl = viewportWidth >= 1280;
  const dockBoxWidth = isXl ? 264 : isDesktop ? 232 : 124;
  const edgeMargin = isXl ? 28 : isDesktop ? 16 : 12;

  // Smooth horizontal glide to right side on Social Media (desktop), left side everywhere else
  const targetTranslateX =
    dockSide === 'right' && isDesktop
      ? Math.max(0, viewportWidth - dockBoxWidth - edgeMargin * 2)
      : 0;

  if (minimized) {
    return (
      <div
        className={`fixed bottom-4 z-30 ${
          dockSide === 'right' && isDesktop ? 'right-5' : 'left-4 sm:left-6'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            setMinimized(false);
            performRealJump();
          }}
          className="pro-btn bg-ink text-white border-ink px-3.5 py-2 text-xs shadow-sm"
        >
          Show Pixel Ansh
        </button>
      </div>
    );
  }

  const displayedSpriteKey: PixelSpriteKey = isJumpingNow ? 'jumping' : spriteKey;

  return (
    <>
      {renderParabolicFlight()}

      <motion.aside
        aria-label="Pixel character Ansh Joshi"
        initial={false}
        animate={{ x: targetTranslateX }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { type: 'spring', stiffness: 190, damping: 24, mass: 0.9 }
        }
        style={{ left: edgeMargin, width: isDesktop ? dockBoxWidth : 'auto' }}
        className="pointer-events-none fixed bottom-3 sm:bottom-5 lg:bottom-6 z-30 flex flex-col items-center"
      >
        {/* Free-standing borderless bigger Pixel Ansh — Click = Jump ONLY (zero speech bubbles) */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, scaleX: 1, scaleY: 1 }
              : { opacity: 1, scaleX: 1.14, scaleY: 0.86 }
          }
          animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="group/mascot pointer-events-auto relative flex flex-col items-center"
        >
          {/* Quiet hover-reveal close button */}
          <button
            type="button"
            onClick={() => setMinimized(true)}
            aria-label="Hide Pixel Ansh"
            title="Hide character"
            className="opacity-0 group-hover/mascot:opacity-100 focus-visible:opacity-100 transition-opacity absolute -top-1 right-2 z-20 w-7 h-7 rounded-full bg-surface/95 border border-hairline-strong text-muted hover:text-ink flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={performRealJump}
            aria-label="Click to make Pixel Ansh jump"
            className="relative bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-4"
          >
            <div
              key={`jump-anim-${jumpTick}`}
              className={
                jumpTick > 0 && !prefersReducedMotion
                  ? 'animate-pixel-jump'
                  : undefined
              }
            >
              <div
                className={
                  isJumpingNow || prefersReducedMotion
                    ? ''
                    : 'animate-pixel-idle'
                }
              >
                <TransparentPixelSprite
                  spriteKey={displayedSpriteKey}
                  pixelGrid={144}
                  className="w-28 h-28 sm:w-36 sm:h-36 lg:w-56 lg:h-56 xl:w-64 xl:h-64 drop-shadow-[0_12px_18px_rgba(15,23,42,0.16)]"
                />
              </div>
            </div>
          </button>

          {/* Crisp pixel landing dust on touchdown */}
          {dustTick > 0 && !prefersReducedMotion && (
            <div
              key={`dust-${dustTick}`}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 lg:bottom-9 inset-x-0 flex items-center justify-center"
            >
              <span className="w-2 h-2 bg-hairline-strong mr-12 animate-pixel-dust-left" />
              <span className="w-1.5 h-1.5 bg-cobalt/75 mr-5 animate-pixel-dust-left" />
              <span className="w-1.5 h-1.5 bg-cobalt/75 ml-5 animate-pixel-dust-right" />
              <span className="w-2 h-2 bg-hairline-strong ml-12 animate-pixel-dust-right" />
            </div>
          )}

          {/* Subtle chapter index label */}
          <div className="hidden lg:flex items-center gap-2 -mt-1 font-mono text-[11px] text-muted">
            <span className="tabular-nums text-ink font-medium">
              {sectionIndexLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>Click to jump</span>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
}
