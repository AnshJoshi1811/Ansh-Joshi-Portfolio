import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Award, ChevronUp } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type TargetAndTransition,
} from 'motion/react';
import {
  SITE_META,
  WORK_EXPERIENCE,
  type ExperienceEntry,
} from '../config/portfolioStructure';
import { BuddyStopSprite } from './ui/PixelAnshTravel';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';

type RoleId = ExperienceEntry['id'];

/** How far the paper underneath peeks out above the top one */
const BACK_PEEK = 48;

/**
 * Work Experience as a stack of papers, driven by scroll. Scrolling down, the
 * internship lands first, then the Development Engineer sheet drops on top of it;
 * scrolling back up lifts that sheet off again. Pixel Ansh stands on the top sheet,
 * and clicking the sheet peeking out behind brings it to the front.
 */
export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [internIn, setInternIn] = useState(false);
  const [engineerPlaced, setEngineerPlaced] = useState(false);
  const [frontId, setFrontId] = useState<RoleId>('engineer');
  const [hasSwapped, setHasSwapped] = useState(false);

  // 0 = top of the stack at the bottom of the screen, 1 = top of the stack at the top
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start end', 'start start'] });

  const placedRef = useRef(false);
  const syncToScroll = useCallback((progress: number) => {
    setInternIn(progress > 0.08);
    const nowPlaced = progress > 0.42;
    if (nowPlaced !== placedRef.current) {
      placedRef.current = nowPlaced;
      setEngineerPlaced(nowPlaced);
      // Every drop/lift starts again from the natural order
      setFrontId('engineer');
      setHasSwapped(false);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', syncToScroll);
  useEffect(() => {
    syncToScroll(scrollYProgress.get());
  }, [scrollYProgress, syncToScroll]);

  const showIntern = internIn || Boolean(prefersReducedMotion);
  const placed = engineerPlaced || Boolean(prefersReducedMotion);
  const effectiveFront: RoleId = placed ? frontId : 'intern';

  const bringToFront = (id: RoleId) => {
    if (!placed || id === frontId) return;
    setFrontId(id);
    setHasSwapped(true);
  };

  const frontPose: TargetAndTransition = { opacity: 1, y: 0, rotate: 0, scale: 1 };
  const backPose: TargetAndTransition = {
    opacity: 1,
    y: -BACK_PEEK,
    rotate: 0,
    scale: 0.97,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  };
  const swapPose: TargetAndTransition = {
    opacity: 1,
    y: [-BACK_PEEK, -BACK_PEEK - 80, 0],
    rotate: [0, -2.5, 0],
    scale: [0.97, 1.01, 1],
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  };

  const poseFor = (id: RoleId): TargetAndTransition => {
    if (id === 'engineer') {
      if (!placed) {
        // Waiting above (or lifted back off when scrolling up)
        return { opacity: 0, y: -160, rotate: 3, scale: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } };
      }
      if (effectiveFront === 'engineer') {
        return hasSwapped
          ? swapPose
          : { ...frontPose, transition: { type: 'spring', stiffness: 260, damping: 22 } };
      }
      return backPose;
    }

    if (!showIntern) return { opacity: 0, y: 40, rotate: 0, scale: 0.97 };
    if (effectiveFront === 'intern') {
      return hasSwapped ? swapPose : { ...frontPose, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } };
    }
    return backPose;
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-hairline py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionReveal>
          <SectionHeader
            index="03"
            title="Work experience"
            headingId="experience-heading"
            divider={false}
          />

          {/* Below lg the header spans the width, so leave headroom; on lg+ Ansh stands beside the header */}
          <div className="pt-20 lg:pt-0 lg:-mt-6">
            <div ref={stackRef} className="relative grid" style={{ paddingTop: BACK_PEEK }}>
              {/* Pixel Ansh stands on whichever sheet is on top */}
              <div className="absolute z-30 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 xl:right-6 -top-[117px] xl:-top-[148px]">
                <BuddyStopSprite
                  stop="experience"
                  spriteKey="hero"
                  hopKey={effectiveFront}
                  alt="Pixel Ansh standing on his work history"
                  className="w-44 h-44 xl:w-52 xl:h-52"
                />
              </div>

              {/* Render the internship first so it sits underneath */}
              {[...WORK_EXPERIENCE].reverse().map((entry) => {
                const isFront = entry.id === effectiveFront;
                return (
                  <motion.div
                    key={entry.id}
                    initial={false}
                    animate={poseFor(entry.id)}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      zIndex: isFront ? 20 : 10,
                      gridArea: '1 / 1',
                      pointerEvents: entry.id === 'engineer' && !placed ? 'none' : undefined,
                    }}
                    className="origin-top flex flex-col"
                  >
                    <PaperCard
                      entry={entry}
                      isFront={isFront}
                      isCurrent={entry.id === 'engineer'}
                      onBringToFront={() => bringToFront(entry.id)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

interface PaperCardProps {
  entry: ExperienceEntry;
  isFront: boolean;
  isCurrent: boolean;
  onBringToFront: () => void;
}

function PaperCard({ entry, isFront, isCurrent, onBringToFront }: PaperCardProps) {
  const handleKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onBringToFront();
    }
  };

  return (
    <article
      className={`relative flex-1 rounded-2xl border border-hairline bg-surface shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] ${
        isFront ? '' : 'cursor-pointer'
      }`}
      onClick={isFront ? undefined : onBringToFront}
      onKeyDown={isFront ? undefined : handleKey}
      role={isFront ? undefined : 'button'}
      tabIndex={isFront ? undefined : 0}
      aria-label={isFront ? undefined : `Show ${entry.role} at ${entry.company}`}
    >
      {/* Pixel "platform" edge */}
      <div
        aria-hidden="true"
        className="h-2 rounded-t-2xl bg-[repeating-linear-gradient(90deg,rgba(15,23,42,0.09)_0_10px,transparent_10px_20px)]"
      />

      {/* The strip you see when this sheet is underneath */}
      {!isFront && (
        <div className="absolute inset-x-0 top-2 h-10 px-6 sm:px-8 flex items-center justify-between gap-3 t-small">
          <span className="truncate">
            <span className="t-meta text-muted">{entry.period}</span>
            <span className="mx-2 text-hairline-strong" aria-hidden="true">·</span>
            <span className="font-semibold text-ink">{entry.role}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 shrink-0 font-medium text-muted lg:mr-56 xl:mr-64">
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
            Show
          </span>
        </div>
      )}

      <div
        className={`p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[210px_minmax(0,1fr)] gap-5 md:gap-10 transition-opacity duration-300 ${
          isFront ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!isFront}
      >
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-3 py-1 t-meta text-ink">
            {isCurrent && (
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ring-ripple" />
              </span>
            )}
            {entry.period}
          </p>
          <p className="t-h4 text-ink">{entry.company}</p>
          <p className="t-small text-muted">{entry.location}</p>
          {entry.id === 'engineer' && (
            <p className="inline-flex items-center gap-1.5 pt-1 t-caption font-medium text-amber">
              <Award className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{SITE_META.award}</span>
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="t-h3 text-ink">
            {entry.role}
          </h3>
          <ul className="space-y-2.5">
            {entry.highlights.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 t-body text-ink/85"
              >
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 bg-ink/60 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
