import { useEffect, useState } from 'react';
import { SCROLL_RAIL_ITEMS } from '../config/portfolioStructure';

interface ScrollRailNavProps {
  activeSectionId: string;
}

/**
 * Left Scroll Navigation Rail + Live Animated Scroll-Progress Line.
 * Anchored neatly on the upper-left desktop viewport so it never collides
 * with the bottom-left Pixel Ansh mascot, giving instant section jumping
 * and a live cobalt signal track running smoothly down the site.
 */
export function ScrollRailNav({ activeSectionId }: ScrollRailNavProps) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollPercent(0);
        return;
      }
      setScrollPercent(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
    };

    const onScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <nav
      aria-label="Section scroll rail"
      className="hidden lg:flex fixed left-5 xl:left-8 top-24 z-30 flex-col"
    >
      <div className="relative pl-5 py-1">
        {/* Background vertical rail track */}
        <div
          aria-hidden="true"
          className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-hairline rounded-full overflow-hidden"
        >
          {/* Live scroll-filled cobalt progress line */}
          <div
            className="w-full bg-cobalt transition-[height] duration-100 ease-out rounded-full"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>

        {/* Section anchor links */}
        <ul className="space-y-3.5">
          {SCROLL_RAIL_ITEMS.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={item.href}
                  className={`group flex items-center gap-2.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-4 ${
                    isActive
                      ? 'text-ink font-semibold'
                      : 'text-subtle hover:text-ink'
                  }`}
                >
                  {/* Waypoint indicator aligned directly onto vertical rail */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[20px] w-2.5 h-2.5 rounded-full border-2 transition-all duration-150 ${
                      isActive
                        ? 'bg-cobalt border-white shadow-[0_0_0_3px_rgba(37,99,235,0.2)] scale-110'
                        : 'bg-surface border-hairline-strong group-hover:border-cobalt'
                    }`}
                  />
                  <span className="font-mono text-[10px] tabular-nums text-subtle group-hover:text-cobalt">
                    {item.index}
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
