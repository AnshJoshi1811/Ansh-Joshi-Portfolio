import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TransparentPixelSprite } from './TransparentPixelSprite';

interface PeekOnHoverProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Global Sneaking Ansh Hover Wrapper:
 * Whenever hovering interactive cards or tiles across the site, ONLY the top
 * of Ansh's head (curly hair, aviator glasses, down to his nose + gripping hands)
 * peeks sneakily up over the top edge, then ducks back down cleanly on leave!
 */
export function PeekOnHover({
  children,
  align = 'right',
  size = 'sm',
  className = '',
}: PeekOnHoverProps) {
  const prefersReducedMotion = useReducedMotion();
  const [peeking, setPeeking] = useState(false);

  const alignClass =
    align === 'left'
      ? 'left-6'
      : align === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : 'right-6';

  const spriteSize = size === 'md' ? 'w-[76px] h-[76px]' : 'w-[60px] h-[60px]';
  const containerOffset = size === 'md' ? '-top-[52px] h-[54px]' : '-top-[40px] h-[42px]';

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPeeking(true)}
      onMouseLeave={() => setPeeking(false)}
    >
      {/* Nose-only sneaking Ansh emerging strictly from behind the top border */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute ${containerOffset} ${alignClass} overflow-hidden flex items-end justify-center z-0`}
      >
        <motion.div
          initial={false}
          animate={
            peeking
              ? { y: size === 'md' ? 8 : 6, opacity: 1 }
              : { y: size === 'md' ? 58 : 46, opacity: 0 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 460, damping: 26 }
          }
        >
          <TransparentPixelSprite
            spriteKey="peekingNose"
            pixelGrid={120}
            className={spriteSize}
          />
        </motion.div>
      </div>

      {/* Foreground interactive content cleanly masking the lower edge */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
