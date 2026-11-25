import { useEffect, useState } from 'react';
import { PIXEL_SPRITES, type PixelSpriteKey } from '../../config/portfolioStructure';

interface TransparentPixelSpriteProps {
  spriteKey: PixelSpriteKey;
  pixelGrid?: number;
  className?: string;
  alt?: string;
}

// In-memory cache so costume switches and hover peeks are instantaneous
const PROCESSED_SPRITE_CACHE = new Map<string, string>();

/**
 * High-resolution 32-bit pixel sprite processor:
 * Flood-fills connected exterior background pixels from all 4 edges to alpha=0,
 * trims faint edge halos cleanly without touching interior whites (lanyard, teeth, sneakers),
 * and upscales via crisp nearest-neighbor for ultra-sharp pixel clarity over any sunset/sky color.
 */
function processHighDefPixelSprite(
  src: string,
  pixelGrid: number,
): Promise<string> {
  const cacheKey = `${src}::hd::${pixelGrid}`;
  const cached = PROCESSED_SPRITE_CACHE.get(cacheKey);
  if (cached) {
    return Promise.resolve(cached);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.src = src;

    img.onload = () => {
      try {
        const size = pixelGrid;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        // Sample average background RGB from the four outer corners
        const corners = [
          0,
          (size - 1) * 4,
          (size - 1) * size * 4,
          (size * size - 1) * 4,
        ];
        let bgR = 0;
        let bgG = 0;
        let bgB = 0;
        for (const idx of corners) {
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
        }
        bgR /= corners.length;
        bgG /= corners.length;
        bgB /= corners.length;

        const isBgPixel = (pixelIdx: number, tolerance: number) => {
          const i = pixelIdx * 4;
          const dr = data[i] - bgR;
          const dg = data[i + 1] - bgG;
          const db = data[i + 2] - bgB;
          return Math.sqrt(dr * dr + dg * dg + db * db) < tolerance;
        };

        // BFS flood-fill strictly from outer edges so interior whites stay 100% solid
        const visited = new Uint8Array(size * size);
        const queue = new Int32Array(size * size);
        let head = 0;
        let tail = 0;

        const enqueue = (x: number, y: number) => {
          const idx = y * size + x;
          if (visited[idx]) return;
          if (!isBgPixel(idx, 38)) return;
          visited[idx] = 1;
          queue[tail++] = idx;
        };

        for (let x = 0; x < size; x++) {
          enqueue(x, 0);
          enqueue(x, size - 1);
        }
        for (let y = 0; y < size; y++) {
          enqueue(0, y);
          enqueue(size - 1, y);
        }

        while (head < tail) {
          const curr = queue[head++];
          data[curr * 4 + 3] = 0;

          const cx = curr % size;
          const cy = (curr - cx) / size;

          if (cx > 0) enqueue(cx - 1, cy);
          if (cx < size - 1) enqueue(cx + 1, cy);
          if (cy > 0) enqueue(cx, cy - 1);
          if (cy < size - 1) enqueue(cx, cy + 1);
        }

        // Two-pass anti-halo edge trim for ultra-clean silhouettes against colorful sky/sunset themes
        for (let pass = 0; pass < 2; pass++) {
          const tolerance = pass === 0 ? 64 : 46;
          const fringeToClear: number[] = [];
          for (let y = 1; y < size - 1; y++) {
            for (let x = 1; x < size - 1; x++) {
              const idx = y * size + x;
              if (data[idx * 4 + 3] === 0) continue;

              const touchesTransparent =
                data[(idx - 1) * 4 + 3] === 0 ||
                data[(idx + 1) * 4 + 3] === 0 ||
                data[(idx - size) * 4 + 3] === 0 ||
                data[(idx + size) * 4 + 3] === 0;

              if (touchesTransparent && isBgPixel(idx, tolerance)) {
                fringeToClear.push(idx);
              }
            }
          }
          for (const idx of fringeToClear) {
            data[idx * 4 + 3] = 0;
          }
        }

        // Enclosed background pockets (e.g. the gap between his legs) can't be reached from
        // the edges. Clear them only when they closely match the background AND are large,
        // so small interior whites (teeth, lanyard, glints) stay solid.
        const pocketSeen = new Uint8Array(size * size);
        const minPocket = Math.round(size * size * 0.003);
        for (let start = 0; start < size * size; start++) {
          if (pocketSeen[start] || data[start * 4 + 3] === 0 || !isBgPixel(start, 22)) continue;
          const pocket: number[] = [start];
          pocketSeen[start] = 1;
          for (let k = 0; k < pocket.length; k++) {
            const curr = pocket[k];
            const cx = curr % size;
            const neighbours = [
              cx > 0 ? curr - 1 : -1,
              cx < size - 1 ? curr + 1 : -1,
              curr - size,
              curr + size,
            ];
            for (const n of neighbours) {
              if (n < 0 || n >= size * size || pocketSeen[n]) continue;
              if (data[n * 4 + 3] === 0 || !isBgPixel(n, 22)) continue;
              pocketSeen[n] = 1;
              pocket.push(n);
            }
          }
          if (pocket.length >= minPocket) {
            for (const idx of pocket) data[idx * 4 + 3] = 0;
          }
        }

        ctx.putImageData(imageData, 0, 0);

        // Crisp nearest-neighbor 3x upscale so every display renders razor-sharp 32-bit pixels
        const outSize = size * 3;
        const outCanvas = document.createElement('canvas');
        outCanvas.width = outSize;
        outCanvas.height = outSize;
        const outCtx = outCanvas.getContext('2d');
        if (outCtx) {
          outCtx.imageSmoothingEnabled = false;
          outCtx.drawImage(canvas, 0, 0, size, size, 0, 0, outSize, outSize);
          const dataUrl = outCanvas.toDataURL('image/png');
          PROCESSED_SPRITE_CACHE.set(cacheKey, dataUrl);
          resolve(dataUrl);
          return;
        }

        const fallbackUrl = canvas.toDataURL('image/png');
        PROCESSED_SPRITE_CACHE.set(cacheKey, fallbackUrl);
        resolve(fallbackUrl);
      } catch {
        resolve(src);
      }
    };

    img.onerror = () => reject(new Error(`Failed to load sprite: ${src}`));
  });
}

/** Process a sprite ahead of time so swapping costumes never flashes an empty frame. */
export function preloadPixelSprite(spriteKey: PixelSpriteKey, pixelGrid = 136) {
  return processHighDefPixelSprite(PIXEL_SPRITES[spriteKey], pixelGrid).catch(() => undefined);
}

export function TransparentPixelSprite({
  spriteKey,
  pixelGrid = 136,
  className = 'w-36 h-36',
  alt,
}: TransparentPixelSpriteProps) {
  const rawSrc = PIXEL_SPRITES[spriteKey];
  const cacheKey = `${rawSrc}::hd::${pixelGrid}`;
  const [processedSrc, setProcessedSrc] = useState<string | null>(
    () => PROCESSED_SPRITE_CACHE.get(cacheKey) ?? null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setFailed(false);

    const existing = PROCESSED_SPRITE_CACHE.get(cacheKey);
    if (existing) {
      setProcessedSrc(existing);
      return;
    }

    processHighDefPixelSprite(rawSrc, pixelGrid)
      .then((url) => {
        if (active) setProcessedSrc(url);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [rawSrc, pixelGrid, cacheKey]);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center font-mono text-[10px] text-muted ${className}`}
      >
        [32-bit {spriteKey}]
      </div>
    );
  }

  return (
    <img
      src={processedSrc ?? rawSrc}
      alt={alt ?? `Crisp pixel character of Ansh Joshi (${spriteKey})`}
      referrerPolicy="no-referrer"
      draggable={false}
      onError={() => setFailed(true)}
      className={`pixel-sprite-img object-contain select-none transition-opacity duration-150 ${
        processedSrc ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
