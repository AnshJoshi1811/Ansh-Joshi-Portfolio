import { useEffect, useState } from 'react';
import { PIXEL_SPRITES, type PixelSpriteKey } from '../../config/portfolioStructure';

interface TransparentPixelSpriteProps {
  spriteKey: PixelSpriteKey;
  pixelGrid?: number;
  className?: string;
  alt?: string;
}

// In-memory cache so switching costumes or scrolling across sections is instant
const PROCESSED_SPRITE_CACHE = new Map<string, string>();

/**
 * Flood-fills connected exterior cream background pixels to true alpha=0
 * and downsamples to a crisp chunky pixel grid (default 64x64) so the character
 * stands completely FREE over any part of the page with sharp 16-bit edges
 * and zero boxed JPEG edges, while preserving interior whites (lanyard, sneakers, teeth).
 */
function processTransparentChunkySprite(
  src: string,
  pixelGrid: number,
): Promise<string> {
  const cacheKey = `${src}::${pixelGrid}`;
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

        // Downsample cleanly onto the chunky pixel grid
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
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
          if (!isBgPixel(idx, 36)) return;
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

        // Single fringe cleanup pass on faint cream halo pixels touching transparent exterior
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

            if (touchesTransparent && isBgPixel(idx, 56)) {
              fringeToClear.push(idx);
            }
          }
        }
        for (const idx of fringeToClear) {
          data[idx * 4 + 3] = 0;
        }

        // Tighten crop slightly around non-transparent pixels while keeping bottom grounded
        ctx.putImageData(imageData, 0, 0);

        // Upscale crisp nearest-neighbor onto 256x256 PNG so every browser renders hard square pixels
        const outSize = size * 4;
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

export function TransparentPixelSprite({
  spriteKey,
  pixelGrid = 88,
  className = 'w-36 h-36',
  alt,
}: TransparentPixelSpriteProps) {
  const rawSrc = PIXEL_SPRITES[spriteKey];
  const cacheKey = `${rawSrc}::${pixelGrid}`;
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

    processTransparentChunkySprite(rawSrc, pixelGrid)
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
        [16-bit {spriteKey}]
      </div>
    );
  }

  return (
    <img
      src={processedSrc ?? rawSrc}
      alt={alt ?? `Chunky 16-bit pixel character of Ansh Joshi (${spriteKey})`}
      referrerPolicy="no-referrer"
      draggable={false}
      onError={() => setFailed(true)}
      className={`pixel-sprite-img object-contain select-none transition-opacity duration-150 ${
        processedSrc ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
