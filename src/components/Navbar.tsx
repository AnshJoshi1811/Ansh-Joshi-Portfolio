import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, SITE_META } from '../config/portfolioStructure';
import { PixelButton } from './ui/PixelButton';

interface NavbarProps {
  activeSectionId: string;
}

/**
 * Clean 3-zone Top Bar Contract:
 * [Ansh Joshi wordmark] — [4 single-line links] — [1 primary Contact CTA]
 */
export function Navbar({ activeSectionId }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-canvas/90 backdrop-blur-md border-b border-hairline">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#hero"
          onClick={handleLinkClick}
          className="font-display text-lg sm:text-xl font-extrabold tracking-[-0.025em] text-ink whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-4"
        >
          {SITE_META.owner}
        </a>

        {/* Zone 2: Four concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-4 ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-cobalt transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action CTA + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:block">
            <PixelButton href="#contact" variant="primary" size="sm">
              Contact
            </PixelButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-ink border border-hairline bg-surface hover:bg-recessed transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-hairline bg-surface px-5 py-5 shadow-md"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center justify-between min-h-[44px] px-2 text-base font-medium border-b border-hairline/70 last:border-b-0 ${
                  activeSectionId === item.id ? 'text-cobalt' : 'text-muted hover:text-ink'
                }`}
              >
                <span>{item.label}</span>
              </a>
            ))}
            <div className="pt-4">
              <PixelButton
                href="#contact"
                variant="primary"
                size="md"
                onClick={handleLinkClick}
                className="w-full"
              >
                Contact
              </PixelButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
