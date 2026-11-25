interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  variant?: 'gentle' | 'crest' | 'stepped';
  flip?: boolean;
}

/**
 * Subtle organic editorial wave divider transitioning seamlessly between
 * distinct warm light-theme section backgrounds.
 */
export function WaveDivider({
  fromColor,
  toColor,
  variant = 'gentle',
  flip = false,
}: WaveDividerProps) {
  const path =
    variant === 'crest'
      ? 'M0,44 C260,8 520,76 820,38 C1080,6 1280,54 1440,30 L1440,80 L0,80 Z'
      : variant === 'stepped'
        ? 'M0,52 C320,14 620,66 960,26 C1180,2 1340,44 1440,36 L1440,80 L0,80 Z'
        : 'M0,34 C300,72 640,4 980,46 C1200,72 1340,22 1440,34 L1440,80 L0,80 Z';

  return (
    <div
      aria-hidden="true"
      style={{ backgroundColor: fromColor }}
      className="relative w-full overflow-hidden leading-none select-none -mt-px"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`block w-full h-10 sm:h-14 lg:h-16 ${flip ? 'scale-x-[-1]' : ''}`}
      >
        <path d={path} fill={toColor} />
        <path
          d={path.replace(' L1440,80 L0,80 Z', '')}
          fill="none"
          stroke="#DDD8CE"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
