import { useEffect, useRef } from 'react';

const CELL = 18; // grid spacing in CSS px
const TRAIL_RADIUS = 64; // how far around the cursor squares light up
const TRAIL_DECAY = 0.93; // per frame; lower = shorter trail
const RIPPLE_SPEED = 520; // px per second
const RIPPLE_LIFE = 1.1; // seconds
const BLUE = [37, 99, 235]; // cobalt
const ORANGE = [249, 115, 22]; // warm orange

/** Only two colours, never blended (blending gives muddy greys/purples) */
const BLUE_RGB = BLUE.join(', ');
const ORANGE_RGB = ORANGE.join(', ');

interface Ripple {
  x: number;
  y: number;
  born: number;
}

/**
 * Interactive pixel grid behind the hero: squares light up and trail behind the
 * cursor, and a click sends a ring of squares rippling outwards.
 * Sits behind the content; listens on its parent so links and buttons keep working.
 */
export function HeroPixelField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cols = 0;
    let rows = 0;
    let trail = new Float32Array(0);
    let ripple = new Float32Array(0);
  let rippleHot = new Float32Array(0); // 1 = on the ring's leading (orange) edge
    const ripples: Ripple[] = [];
    let rafId = 0;
    let lastMove: { x: number; y: number } | null = null;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(rect.width / CELL);
      rows = Math.ceil(rect.height / CELL);
      trail = new Float32Array(cols * rows);
      ripple = new Float32Array(cols * rows);
      rippleHot = new Float32Array(cols * rows);
    };

    const localPoint = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const energise = (x: number, y: number) => {
      const reach = Math.ceil(TRAIL_RADIUS / CELL);
      const cx = Math.floor(x / CELL);
      const cy = Math.floor(y / CELL);
      for (let gy = cy - reach; gy <= cy + reach; gy++) {
        if (gy < 0 || gy >= rows) continue;
        for (let gx = cx - reach; gx <= cx + reach; gx++) {
          if (gx < 0 || gx >= cols) continue;
          const dx = gx * CELL + CELL / 2 - x;
          const dy = gy * CELL + CELL / 2 - y;
          const falloff = 1 - Math.hypot(dx, dy) / TRAIL_RADIUS;
          if (falloff <= 0) continue;
          const i = gy * cols + gx;
          trail[i] = Math.max(trail[i], falloff);
        }
      }
    };

    const frame = (now: number) => {
      rafId = 0;
      const t = now / 1000;
      ctx.clearRect(0, 0, cols * CELL, rows * CELL);

      if (lastMove) {
        energise(lastMove.x, lastMove.y);
        lastMove = null;
      }

      // Expanding rings of squares
      ripple.fill(0);
      rippleHot.fill(0);
      for (let r = ripples.length - 1; r >= 0; r--) {
        const age = t - ripples[r].born;
        if (age > RIPPLE_LIFE) {
          ripples.splice(r, 1);
          continue;
        }
        const radius = age * RIPPLE_SPEED;
        const strength = 1 - age / RIPPLE_LIFE;
        const { x, y } = ripples[r];
        const minGy = Math.max(0, Math.floor((y - radius - CELL) / CELL));
        const maxGy = Math.min(rows - 1, Math.ceil((y + radius + CELL) / CELL));
        const minGx = Math.max(0, Math.floor((x - radius - CELL) / CELL));
        const maxGx = Math.min(cols - 1, Math.ceil((x + radius + CELL) / CELL));
        for (let gy = minGy; gy <= maxGy; gy++) {
          for (let gx = minGx; gx <= maxGx; gx++) {
            const d = Math.hypot(gx * CELL + CELL / 2 - x, gy * CELL + CELL / 2 - y);
            const band = 1 - Math.abs(d - radius) / (CELL * 1.6);
            if (band <= 0) continue;
            const i = gy * cols + gx;
            const value = band * strength;
            if (value > ripple[i]) {
              ripple[i] = value;
              // Squares just outside the ring's radius are its leading edge
              rippleHot[i] = d > radius ? 1 : 0;
            }
          }
        }
      }

      let active = ripples.length > 0;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const i = gy * cols + gx;
          const tr = trail[i];
          const rp = ripple[i];
          if (tr < 0.02 && rp < 0.02) {
            trail[i] = 0;
            continue;
          }
          active = true;
          const e = Math.max(tr, rp);
          const size = CELL * (0.22 + 0.5 * e);
          const offset = (CELL - size) / 2;
          // Trail: fresh squares glow orange and cool to blue as they fade.
          // Ripple: orange leading edge, blue behind it.
          ctx.fillStyle =
            rp > tr
              ? `rgba(${rippleHot[i] ? ORANGE_RGB : BLUE_RGB}, ${0.35 + 0.45 * rp})`
              : `rgba(${tr > 0.55 ? ORANGE_RGB : BLUE_RGB}, ${0.25 + 0.5 * tr})`;
          ctx.fillRect(gx * CELL + offset, gy * CELL + offset, size, size);
          trail[i] = tr * TRAIL_DECAY;
        }
      }

      if (active) rafId = window.requestAnimationFrame(frame);
    };

    const wake = () => {
      if (rafId === 0) rafId = window.requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      lastMove = localPoint(event);
      wake();
    };

    const onDown = (event: PointerEvent) => {
      const { x, y } = localPoint(event);
      ripples.push({ x, y, born: performance.now() / 1000 });
      wake();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerdown', onDown);

    return () => {
      observer.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerdown', onDown);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />;
}
