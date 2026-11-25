import type { SocialPlatformId } from '../../config/portfolioStructure';

interface PlatformIconProps {
  platform: SocialPlatformId;
  className?: string;
}

export function PlatformIcon({ platform, className = 'w-6 h-6' }: PlatformIconProps) {
  switch (platform) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case 'medium':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <circle cx="6.5" cy="12" r="4.5" />
          <ellipse cx="15.2" cy="12" rx="2.6" ry="4.2" />
          <ellipse cx="20.4" cy="12" rx="1.1" ry="3.8" />
        </svg>
      );
    case 'reddit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="14" r="6.5" />
          <path d="M12 7.5 14 3l3.5 1" />
          <circle cx="19" cy="4.5" r="1.25" />
          <circle cx="5.2" cy="12.2" r="1.3" />
          <circle cx="18.8" cy="12.2" r="1.3" />
          <circle cx="9.6" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="14.4" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
          <path d="M9.5 16.5c1.4 1 3.6 1 5 0" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
          <polygon points="10 9.5 15.5 12 10 14.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10.5v6.5" />
          <circle cx="8" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
          <path d="M12 17v-6.5" />
          <path d="M12 13a2.5 2.5 0 0 1 5 0v4" />
        </svg>
      );
  }
}
