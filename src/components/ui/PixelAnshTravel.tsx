import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { PixelSpriteKey } from '../../config/portfolioStructure';
import { TransparentPixelSprite } from './TransparentPixelSprite';

/** Every place Pixel Ansh can stand. Each one matches a section id. */
export type BuddyStop =
  | 'hero'
  | 'social-platforms'
  | 'experience'
  | 'skills'
  | 'certifications'
  | 'contact';

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Flight {
  id: number;
  from: Box;
  to: Box;
  toStop: BuddyStop;
}

/** The stop Pixel Ansh is standing on right now (null while he is mid-air). */
const LandedStopContext = createContext<BuddyStop | null>(null);

export function useLandedStop() {
  return useContext(LandedStopContext);
}

function boxOfStop(stop: BuddyStop): Box | null {
  const el = document.querySelector<HTMLElement>(`[data-buddy-stop="${stop}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return null;
  // Far-off stops start/finish just past the screen edge so the arc stays readable
  const vh = window.innerHeight;
  const y = Math.max(-r.height * 0.7, Math.min(vh - r.height * 0.3, r.top));
  return { x: r.left, y, w: r.width, h: r.height };
}

interface PixelAnshTravelProps {
  /** The section Pixel Ansh should be in */
  targetStop: BuddyStop;
  children: ReactNode;
}

/**
 * One Pixel Ansh for the whole site. When the visible section changes he jumps in
 * an arc from the stop he is standing on to the next section's stop.
 */
export function PixelAnshTravel({ targetStop, children }: PixelAnshTravelProps) {
  const prefersReducedMotion = useReducedMotion();
  const [landedStop, setLandedStop] = useState<BuddyStop | null>(targetStop);
  const [flight, setFlight] = useState<Flight | null>(null);

  const landedRef = useRef<BuddyStop | null>(targetStop);
  const targetRef = useRef(targetStop);
  const flightIdRef = useRef(0);
  targetRef.current = targetStop;

  const land = useCallback((stop: BuddyStop) => {
    landedRef.current = stop;
    setLandedStop(stop);
  }, []);

  const launch = useCallback(
    (from: BuddyStop, to: BuddyStop) => {
      const fromBox = boxOfStop(from);
      const toBox = boxOfStop(to);
      if (prefersReducedMotion || !fromBox || !toBox) {
        land(to);
        return;
      }
      landedRef.current = null;
      setLandedStop(null);
      flightIdRef.current += 1;
      setFlight({ id: flightIdRef.current, from: fromBox, to: toBox, toStop: to });
    },
    [land, prefersReducedMotion],
  );

  // Wait for scrolling to settle briefly, then jump to the new section's stop
  useEffect(() => {
    if (flight || landedRef.current === targetStop) return;
    const timer = window.setTimeout(() => {
      const from = landedRef.current;
      const to = targetRef.current;
      if (from && from !== to) launch(from, to);
    }, 140);
    return () => window.clearTimeout(timer);
  }, [targetStop, flight, launch]);

  const handleFlightDone = () => {
    if (!flight) return;
    land(flight.toStop);
    setFlight(null);
  };

  return (
    <LandedStopContext.Provider value={landedStop}>
      {children}
      {flight && (
        <JumpArc key={flight.id} flight={flight} onDone={handleFlightDone} />
      )}
    </LandedStopContext.Provider>
  );
}

function JumpArc({ flight, onDone }: { flight: Flight; onDone: () => void }) {
  const { from, to } = flight;
  const times = [0, 0.25, 0.5, 0.75, 1];
  const peakY = Math.max(16, Math.min(from.y, to.y) - 150);
  const cx = (from.x + to.x) / 2;
  const bezier = (a: number, c: number, b: number, t: number) =>
    (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;

  // Safety net: if animation frames are paused (background tab), still land him
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDoneRef.current();
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(finish, 1400);
    return () => window.clearTimeout(timer);
  }, [finish]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50"
      initial={{ x: from.x, y: from.y, width: from.w, height: from.h, rotate: 0 }}
      animate={{
        x: times.map((t) => bezier(from.x, cx, to.x, t)),
        y: times.map((t) => bezier(from.y, peakY, to.y, t)),
        width: times.map((t) => from.w + (to.w - from.w) * t),
        height: times.map((t) => from.h + (to.h - from.h) * t),
        rotate: [0, -12, -16, -6, 0],
      }}
      transition={{ duration: 0.8, times, ease: [0.33, 0, 0.25, 1] }}
      onAnimationComplete={finish}
    >
      {/* Speed lines trailing above him on the way down, so the drop reads as a fall */}
      <motion.div
        className="absolute left-[18%] right-[18%] bottom-[62%] h-[70%] flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.4, 0.55, 0.88, 1] }}
      >
        {[0.55, 0.9, 0.7, 1, 0.6].map((len, i) => (
          <span
            key={i}
            className="block w-[3px] rounded-full bg-gradient-to-t from-ink/35 to-transparent animate-speed-line"
            style={{ height: `${len * 100}%`, animationDelay: `${i * 60}ms` }}
          />
        ))}
      </motion.div>
      <TransparentPixelSprite
        spriteKey="jumping"
        pixelGrid={144}
        className="relative w-full h-full drop-shadow-[0_18px_24px_rgba(15,23,42,0.22)]"
      />
    </motion.div>
  );
}

interface BuddyStopSpriteProps {
  stop: BuddyStop;
  spriteKey: PixelSpriteKey;
  /** Size classes; the box keeps its size while Ansh is away so jumps land precisely */
  className: string;
  alt: string;
  /** Change this value to make Ansh hop in place (e.g. on a tab switch) */
  hopKey?: string;
}

/**
 * Where Pixel Ansh stands inside a section. Invisible (but still taking space)
 * while he is somewhere else; lands with a squash, bobs while idle, hops on click.
 */
export function BuddyStopSprite({ stop, spriteKey, className, alt, hopKey }: BuddyStopSpriteProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHere = useLandedStop() === stop;
  const [landTick, setLandTick] = useState(0);
  const [hopTick, setHopTick] = useState(0);
  const firstHopKey = useRef(hopKey);

  useEffect(() => {
    if (isHere) setLandTick((n) => n + 1);
  }, [isHere]);

  useEffect(() => {
    if (hopKey !== firstHopKey.current) setHopTick((n) => n + 1);
  }, [hopKey]);

  const animate = !prefersReducedMotion;

  return (
    <button
      type="button"
      data-buddy-stop={stop}
      onClick={() => setHopTick((n) => n + 1)}
      aria-label="Make Pixel Ansh jump"
      tabIndex={isHere ? 0 : -1}
      style={{ visibility: isHere ? 'visible' : 'hidden' }}
      className={`relative block shrink-0 bg-transparent border-0 p-0 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-4 ${className}`}
    >
      <div key={`land-${landTick}`} className={`w-full h-full ${animate && landTick > 1 ? 'animate-pixel-land' : ''}`}>
        <div className={`w-full h-full ${animate ? 'animate-pixel-idle' : ''}`}>
          <div key={`hop-${hopTick}`} className={`w-full h-full ${animate && hopTick > 0 ? 'animate-pixel-jump' : ''}`}>
            <TransparentPixelSprite spriteKey={spriteKey} pixelGrid={144} alt={alt} className="w-full h-full" />
          </div>
        </div>
      </div>
    </button>
  );
}
