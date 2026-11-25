import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { PixelSpriteKey } from '../config/portfolioStructure';
import { TransparentPixelSprite } from './ui/TransparentPixelSprite';

interface FloatingPixelBuddyProps {
  visible: boolean;
  spriteKey: PixelSpriteKey;
  characterScale?: number;
  sectionIndexLabel: string;
  contextTag: string;
  caption: string;
  dropSequence: number;
  onBuddyTap: () => void;
}

/**
 * The Main Character of itsansh.space:
 * Drops onto the open LEFT stage as soon as the Hero portrait finishes pixelating,
 * standing completely FREE (zero box, zero border, zero grid) and leading the visitor
 * through every section—even growing from Small Intern to Bigger Cloud Engineer!
 */
export function FloatingPixelBuddy({
  visible,
  spriteKey,
  characterScale = 1,
  sectionIndexLabel,
  contextTag,
  caption,
  dropSequence,
  onBuddyTap,
}: FloatingPixelBuddyProps) {
  const prefersReducedMotion = useReducedMotion();
  const [minimized, setMinimized] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const [hopTick, setHopTick] = useState(0);
  const [showDust, setShowDust] = useState(false);

  const bubbleTimerRef = useRef<number | null>(null);
  const scrollWalkTimerRef = useRef<number | null>(null);
  const dustTimerRef = useRef<number | null>(null);

  // Stepped walking stride animation while actively scrolling through sections
  useEffect(() => {
    if (prefersReducedMotion || !visible) return;

    const handleScroll = () => {
      setIsWalking(true);
      if (scrollWalkTimerRef.current !== null) {
        window.clearTimeout(scrollWalkTimerRef.current);
      }
      scrollWalkTimerRef.current = window.setTimeout(() => {
        setIsWalking(false);
      }, 170);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollWalkTimerRef.current !== null) {
        window.clearTimeout(scrollWalkTimerRef.current);
      }
    };
  }, [visible, prefersReducedMotion]);

  // Keep speech bubble lively on costume/section switches; auto-tuck gently on narrow screens
  useEffect(() => {
    if (!visible || minimized) return;
    setShowBubble(true);
    setHopTick((prev) => prev + 1);

    if (bubbleTimerRef.current !== null) {
      window.clearTimeout(bubbleTimerRef.current);
    }

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) {
      bubbleTimerRef.current = window.setTimeout(() => {
        setShowBubble(false);
      }, 4800);
    }

    return () => {
      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current);
      }
    };
  }, [spriteKey, caption, visible, minimized]);

  // Crisp pixel dust puff timed to landing impact
  useEffect(() => {
    if (!visible || prefersReducedMotion) return;
    setShowDust(false);
    if (dustTimerRef.current !== null) {
      window.clearTimeout(dustTimerRef.current);
    }
    dustTimerRef.current = window.setTimeout(() => {
      setShowDust(true);
    }, 310);

    return () => {
      if (dustTimerRef.current !== null) {
        window.clearTimeout(dustTimerRef.current);
      }
    };
  }, [visible, dropSequence, prefersReducedMotion]);

  if (!visible) {
    return null;
  }

  if (minimized) {
    return (
      <div className="fixed bottom-4 left-4 sm:left-6 z-30">
        <button
          type="button"
          onClick={() => {
            setMinimized(false);
            setShowBubble(true);
          }}
          className="pixel-btn bg-yellow text-ink hover:bg-[#DEC070] px-3.5 py-2 text-xs"
        >
          Summon 16-bit Ansh
        </button>
      </div>
    );
  }

  const handleClickSprite = () => {
    setHopTick((prev) => prev + 1);
    setShowBubble(true);
    onBuddyTap();
  };

  return (
    <aside
      aria-label="Main 16-bit character Ansh Joshi"
      className="pointer-events-none fixed bottom-3 left-3 sm:bottom-5 sm:left-5 lg:bottom-8 lg:left-5 xl:left-9 z-30 flex flex-col items-start lg:w-[232px] xl:w-[264px]"
    >
      {/* Clean stepped-pixel speech note floating above our main character */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={`bubble-${contextTag}-${caption}`}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative mb-2 max-w-[220px] sm:max-w-[248px] lg:max-w-full bg-surface border-2 border-ink px-3.5 py-2.5 shadow-[3px_3px_0_0_#252525]"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-mono text-[10px] font-medium text-lavender">
                {contextTag}
              </span>
              <button
                type="button"
                onClick={() => setMinimized(true)}
                aria-label="Hide main character"
                title="Hide character"
                className="text-muted hover:text-ink -mt-0.5 -mr-1 p-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
            <p className="text-xs text-ink leading-snug">{caption}</p>
            {/* Left-aligned stepped pixel pointer tail */}
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-10 lg:left-20 w-3 h-3 bg-surface border-r-2 border-b-2 border-ink rotate-45"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heroic, completely FREE borderless Main Character dropping into the left stage */}
      <motion.div
        key={`buddy-drop-${dropSequence}`}
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0, scaleX: 1, scaleY: 1 }
            : { opacity: 0, y: -320, scaleX: 0.85, scaleY: 1.16 }
        }
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0, scaleX: 1, scaleY: 1 }
            : {
                opacity: [0, 1, 1, 1, 1],
                y: [-320, 6, -14, 0, 0],
                scaleX: [0.85, 1.16, 0.94, 1.03, 1],
                scaleY: [1.16, 0.84, 1.06, 0.98, 1],
              }
        }
        transition={{
          duration: 0.64,
          times: [0, 0.52, 0.75, 0.9, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-auto relative flex flex-col items-start lg:items-center w-auto lg:w-full"
      >
        <button
          type="button"
          onClick={handleClickSprite}
          onMouseEnter={() => setShowBubble(true)}
          aria-label={`Interact with main 16-bit Ansh character (${contextTag})`}
          className="group relative bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-lavender focus-visible:outline-offset-4"
        >
          <div
            key={`hop-${hopTick}`}
            className={
              hopTick > 0 && !prefersReducedMotion
                ? 'animate-pixel-hop'
                : undefined
            }
          >
            <div
              className={`transition-transform duration-150 ${
                isWalking && !prefersReducedMotion
                  ? '-translate-y-2 rotate-[2.5deg]'
                  : 'animate-pixel-idle'
              }`}
            >
              {/* Smooth character scale transition (shrinks for Small Intern, grows for Big Cloud Engineer!) */}
              <motion.div
                animate={{ scale: characterScale }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'bottom center' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={spriteKey}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.14 }}
                  >
                    <TransparentPixelSprite
                      spriteKey={spriteKey}
                      pixelGrid={92}
                      className="w-24 h-24 sm:w-32 sm:h-32 lg:w-52 lg:h-52 xl:w-60 xl:h-60 drop-shadow-[0_6px_0_rgba(37,37,37,0.12)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </button>

        {/* Crisp 16-bit landing dust puffs on Hero -> left-stage drop */}
        {showDust && !prefersReducedMotion && (
          <div
            key={`buddy-dust-${dropSequence}`}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-5 lg:bottom-8 inset-x-0 flex items-center justify-center"
          >
            <span className="w-2.5 h-2.5 bg-hairline-strong mr-12 animate-pixel-dust-left" />
            <span className="w-2 h-2 bg-yellow mr-6 animate-pixel-dust-left" />
            <span className="w-2 h-2 bg-lavender ml-6 animate-pixel-dust-right" />
            <span className="w-2.5 h-2.5 bg-hairline-strong ml-12 animate-pixel-dust-right" />
          </div>
        )}

        {/* Quiet unboxed ground caption on desktop */}
        <div className="hidden lg:flex items-center gap-2 mt-1 font-mono text-[11px] text-muted">
          <span className="tabular-nums text-ink font-medium">{sectionIndexLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Tap to hop</span>
        </div>
      </motion.div>
    </aside>
  );
}
