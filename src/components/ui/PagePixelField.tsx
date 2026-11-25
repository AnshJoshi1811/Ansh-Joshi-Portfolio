import { useEffect, useRef } from 'react';

// Must match the dot grid painted on <html> in index.css (20px tiles, dot in the middle)
const CELL = 20;
const TRAIL_RADIUS = 70;
const TRAIL_DECAY = 0.92;
const RIPPLE_SPEED = 480; // px per second
const RIPPLE_LIFE = 1.2; // seconds

// Soft palette: lightest orange at the cursor, light blue as it fades, grey at the tail
const ORANGE = '253, 186, 116'; // #FDBA74
const BLUE = '147, 197, 253'; // #93C5FD
const GREY = '148, 163, 184'; // #94A3B8

/**
 * Page-wide background: the grey dot grid behind every section swells into small
 * coloured circles around the cursor, and a click sends out a soft ring.
 * Skips the hero, which has its own stronger square-pixel version.
 */
export function PagePixelField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Energy per document cell (sparse: only cells that are lit)
    const energy = new Map<string, number>();
    const ripples: { x: number; y: number; born: number }[] = [];
    let rafId = 0;
    let pointer: { x: number; y: number } | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const light = (gx: number, gy: number, value: number) => {
      const key = `${gx},${gy}`;
      if (value > (energy.get(key) ?? 0)) energy.set(key, value);
    };

    const frame = (now: number) => {
      rafId = 0;
      const sx = window.scrollX;
      const sy = window.scrollY;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Trail around the cursor (document coordinates)
      if (pointer) {
        const reach = Math.ceil(TRAIL_RADIUS / CELL);
        const cx = Math.round((pointer.x - CELL / 2) / CELL);
        const cy = Math.round((pointer.y - CELL / 2) / CELL);
        for (let gy = cy - reach; gy <= cy + reach; gy++) {
          for (let gx = cx - reach; gx <= cx + reach; gx++) {
            const d = Math.hypot(gx * CELL + CELL / 2 - pointer.x, gy * CELL + CELL / 2 - pointer.y);
            const falloff = 1 - d / TRAIL_RADIUS;
            if (falloff > 0) light(gx, gy, falloff);
          }
        }
        pointer = null;
      }

      // Click rings
      const t = now / 1000;
      const ringCells = new Map<string, number>();
      for (let r = ripples.length - 1; r >= 0; r--) {
        const age = t - ripples[r].born;
        if (age > RIPPLE_LIFE) {
          ripples.splice(r, 1);
          continue;
        }
        const radius = age * RIPPLE_SPEED;
        const strength = 1 - age / RIPPLE_LIFE;
        const { x, y } = ripples[r];
        const steps = Math.max(12, Math.ceil((2 * Math.PI * radius) / (CELL * 0.6)));
        for (let s = 0; s < steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const gx = Math.round((x + Math.cos(a) * radius - CELL / 2) / CELL);
          const gy = Math.round((y + Math.sin(a) * radius - CELL / 2) / CELL);
          const key = `${gx},${gy}`;
          ringCells.set(key, Math.max(ringCells.get(key) ?? 0, strength));
        }
      }

      const draw = (key: string, value: number, colour: string) => {
        const [gx, gy] = key.split(',').map(Number);
        const px = gx * CELL + CELL / 2 - sx;
        const py = gy * CELL + CELL / 2 - sy;
        if (px < -CELL || py < -CELL || px > window.innerWidth + CELL || py > window.innerHeight + CELL) return;
        ctx.beginPath();
        ctx.arc(px, py, 1.5 + 3 * value, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colour}, ${0.35 + 0.5 * value})`;
        ctx.fill();
      };

      for (const [key, value] of energy) {
        if (value < 0.03) {
          energy.delete(key);
          continue;
        }
        draw(key, value, value > 0.6 ? ORANGE : value > 0.25 ? BLUE : GREY);
        energy.set(key, value * TRAIL_DECAY);
      }
      for (const [key, value] of ringCells) draw(key, value, value > 0.55 ? ORANGE : BLUE);

      if (energy.size > 0 || ripples.length > 0) rafId = window.requestAnimationFrame(frame);
    };

    const wake = () => {
      if (rafId === 0) rafId = window.requestAnimationFrame(frame);
    };

    const inHero = (target: EventTarget | null) =>
      target instanceof Element && target.closest('#hero') !== null;

    const onMove = (event: PointerEvent) => {
      if (inHero(event.target)) return;
      pointer = { x: event.clientX + window.scrollX, y: event.clientY + window.scrollY };
      wake();
    };

    const onDown = (event: PointerEvent) => {
      if (inHero(event.target)) return;
      ripples.push({
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY,
        born: performance.now() / 1000,
      });
      wake();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('scroll', wake, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('scroll', wake);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Fixed behind all content (z -1), above the page's dot grid
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 w-screen h-screen" />;
}
