import type { TechLogoId } from '../../config/portfolioStructure';

interface TechLogoProps {
  id: TechLogoId;
  className?: string;
}

/**
 * Full-color custom SVG vector logos for all 21 real skills in Ansh's stack.
 */
export function TechLogo({ id, className = 'w-7 h-7' }: TechLogoProps) {
  switch (id) {
    case 'go':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <ellipse cx="20" cy="23" rx="11.5" ry="12.5" fill="#00ADD8" />
          <circle cx="11" cy="12.5" r="3.2" fill="#00ADD8" />
          <circle cx="29" cy="12.5" r="3.2" fill="#00ADD8" />
          <circle cx="15.8" cy="18.2" r="3.8" fill="#FFFFFF" />
          <circle cx="24.2" cy="18.2" r="3.8" fill="#FFFFFF" />
          <circle cx="16.5" cy="18.2" r="1.7" fill="#0F172A" />
          <circle cx="23.5" cy="18.2" r="1.7" fill="#0F172A" />
          <ellipse cx="20" cy="23.2" rx="3.4" ry="2.2" fill="#FDE68A" />
          <ellipse cx="20" cy="22.1" rx="1.6" ry="1.1" fill="#0F172A" />
          <rect x="18.2" y="25" width="1.6" height="2.4" rx="0.6" fill="#FFFFFF" />
          <rect x="20.2" y="25" width="1.6" height="2.4" rx="0.6" fill="#FFFFFF" />
        </svg>
      );

    case 'gin':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <path d="M9 10H31L21.5 21.8V30.5H26.5V33H13.5V30.5H18.5V21.8L9 10Z" fill="#0EA5E9" />
          <path d="M13.2 13.5H26.8L20 21.2L13.2 13.5Z" fill="#A7F3D0" />
          <circle cx="24.5" cy="11.2" r="2.3" fill="#10B981" />
        </svg>
      );

    case 'gorm':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <ellipse cx="20" cy="12" rx="11" ry="4.5" fill="#2563EB" />
          <path d="M9 12V20C9 22.5 13.9 24.5 20 24.5C26.1 24.5 31 22.5 31 20V12" fill="#3B82F6" />
          <path d="M9 20V28C9 30.5 13.9 32.5 20 32.5C26.1 32.5 31 30.5 31 28V20" fill="#1D4ED8" />
          <ellipse cx="20" cy="12" rx="7.5" ry="2.2" fill="#93C5FD" />
        </svg>
      );

    case 'rest':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <path d="M9 15H29M29 15L23.5 9.5M29 15L23.5 20.5" stroke="#0D9488" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M31 26H11M11 26L16.5 20.5M11 26L16.5 31.5" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'microservices':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <rect x="6" y="7" width="10" height="10" rx="2.5" fill="#4F46E5" />
          <rect x="24" y="7" width="10" height="10" rx="2.5" fill="#2563EB" />
          <rect x="15" y="23" width="10" height="10" rx="2.5" fill="#0EA5E9" />
          <path d="M16 12H24M13 17L17.5 23M27 17L22.5 23" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'postgresql':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <path d="M26.5 9.5C23.5 7 18.2 7 15 9.5C10.4 8.6 7 12.6 8.2 18.4C9.1 22.8 12.2 25.8 14.5 26.8L15.4 31.5C15.8 33.4 18.5 33.6 19.3 31.8L20.5 28.4C22.4 28.8 24.5 28.5 26 27.4C29.4 25.1 32 20.6 31.8 15.2C31.7 11.4 29.4 9.2 26.5 9.5Z" fill="#336791" />
          <circle cx="16.4" cy="16.2" r="1.6" fill="#FFFFFF" />
          <path d="M23.5 19.5C25.2 22.5 25.2 26.4 23.2 29.5" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );

    case 'python':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <path d="M19.8 7C14.4 7 14.8 9.4 14.8 9.4V13.2H20V14.4H12.2C12.2 14.4 8.5 14 8.5 19.6C8.5 25.2 11.7 25 11.7 25H13.8V22.2C13.8 22.2 13.7 19 16.9 19H22.2C22.2 19 25 19 25 16.2V10.6C25 10.6 25.4 7 19.8 7Z" fill="#3776AB" />
          <circle cx="17.2" cy="10.2" r="1.2" fill="#FFFFFF" />
          <path d="M20.2 33C25.6 33 25.2 30.6 25.2 30.6V26.8H20V25.6H27.8C27.8 25.6 31.5 26 31.5 20.4C31.5 14.8 28.3 15 28.3 15H26.2V17.8C26.2 17.8 26.3 21 23.1 21H17.8C17.8 21 15 21 15 23.8V29.4C15 29.4 14.6 33 20.2 33Z" fill="#FFD43B" />
          <circle cx="22.8" cy="29.8" r="1.2" fill="#0F172A" />
        </svg>
      );

    case 'bash':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <rect x="5.5" y="8.5" width="29" height="23" rx="4" fill="#1E293B" />
          <path d="M11 16L16.5 20L11 24" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 24H28" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'kubernetes':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <path d="M20 4.5L32.8 10.7L36 24.5L27.1 35.5H12.9L4 24.5L7.2 10.7L20 4.5Z" fill="#326CE5" />
          <circle cx="20" cy="20.5" r="7.2" stroke="#FFFFFF" strokeWidth="2.1" />
          <circle cx="20" cy="20.5" r="2.2" fill="#FFFFFF" />
          <path d="M20 9.5V15.5M20 25.5V31.5M10.4 15L15.6 18M24.4 23L29.6 26M29.6 15L24.4 18M15.6 23L10.4 26" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <rect x="10" y="15" width="4.2" height="3.8" rx="0.7" fill="#0DB7ED" />
          <rect x="15" y="15" width="4.2" height="3.8" rx="0.7" fill="#0DB7ED" />
          <rect x="20" y="15" width="4.2" height="3.8" rx="0.7" fill="#0DB7ED" />
          <rect x="15" y="10.4" width="4.2" height="3.8" rx="0.7" fill="#0DB7ED" />
          <rect x="20" y="10.4" width="4.2" height="3.8" rx="0.7" fill="#0DB7ED" />
          <rect x="20" y="5.8" width="4.2" height="3.8" rx="0.7" fill="#38BDF8" />
          <path d="M5.5 21.2H29.4C30.8 19.6 32.5 18.8 34.4 19.3C34.8 21.1 34.2 22.8 33 23.8C31.2 28.5 26 32 18.8 32C11.2 32 6 27.9 5.5 21.2Z" fill="#0284C7" />
          <circle cx="24.2" cy="24.6" r="1.3" fill="#FFFFFF" />
        </svg>
      );

    case 'terraform':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <path d="M14.5 7L23.5 12.2V22.5L14.5 17.3V7Z" fill="#7B42BC" />
          <path d="M25 13.1L34 7.9V18.2L25 23.4V13.1Z" fill="#5C4EE5" />
          <path d="M14.5 19.2L23.5 24.4V34.7L14.5 29.5V19.2Z" fill="#7B42BC" />
          <path d="M5 12.8L13 17.4V27.6L5 23V12.8Z" fill="#8B5CF6" />
        </svg>
      );

    case 'aws':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <text x="20" y="22.5" textAnchor="middle" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="13.5" letterSpacing="-0.5">
            aws
          </text>
          <path d="M8.5 26.8C14.8 31.4 24.4 31.6 31.5 27.2" stroke="#FF9900" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M28.6 25.6L32.8 26.6L31.4 30.6" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'codepipeline':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <circle cx="10" cy="20" r="4" fill="#F97316" />
          <circle cx="20" cy="11" r="4" fill="#FB923C" />
          <circle cx="20" cy="29" r="4" fill="#EA580C" />
          <circle cx="30" cy="20" r="4" fill="#F97316" />
          <path d="M13 17.5L17 13.5M13 22.5L17 26.5M23 13.5L27 17.5M23 26.5L27 22.5" stroke="#C2410C" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'jenkins':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <circle cx="20" cy="20" r="14.5" fill="#D33833" />
          <circle cx="20" cy="18.2" r="7.5" fill="#FDE6C4" />
          <circle cx="17.4" cy="17.8" r="1.2" fill="#1F2937" />
          <circle cx="22.6" cy="17.8" r="1.2" fill="#1F2937" />
          <path d="M16.5 26.5L20 29L23.5 26.5L20 24.4L16.5 26.5Z" fill="#FFFFFF" />
          <path d="M15.8 25.2L20 27.6L24.2 25.2V28.4L20 27.2L15.8 28.4V25.2Z" fill="#EF4444" />
        </svg>
      );

    case 'sonarqube':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <path d="M8.5 30.5C8.5 18.8 18 9.3 29.7 9.3" stroke="#4E9BCD" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M14.8 30.5C14.8 22.3 21.5 15.6 29.7 15.6" stroke="#0EA5E9" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M21 30.5C21 25.7 24.9 21.8 29.7 21.8" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="29.5" cy="29.5" r="2.6" fill="#0284C7" />
        </svg>
      );

    case 'linux':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <ellipse cx="20" cy="22.5" rx="9.5" ry="11" fill="#1E293B" />
          <ellipse cx="20" cy="24.5" rx="6.2" ry="7.4" fill="#FFFFFF" />
          <circle cx="17.5" cy="15.4" r="1.6" fill="#FFFFFF" />
          <circle cx="22.5" cy="15.4" r="1.6" fill="#FFFFFF" />
          <circle cx="17.8" cy="15.4" r="0.8" fill="#0F172A" />
          <circle cx="22.2" cy="15.4" r="0.8" fill="#0F172A" />
          <path d="M17.4 18.4H22.6L20 20.8L17.4 18.4Z" fill="#F59E0B" />
          <ellipse cx="14.2" cy="32.4" rx="3.6" ry="2" fill="#F59E0B" />
          <ellipse cx="25.8" cy="32.4" rx="3.6" ry="2" fill="#F59E0B" />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <rect x="9.5" y="9.5" width="21" height="21" rx="3.5" transform="rotate(45 20 20)" fill="#F05032" />
          <circle cx="20" cy="14" r="2.2" fill="#FFFFFF" />
          <circle cx="20" cy="26" r="2.2" fill="#FFFFFF" />
          <circle cx="25.5" cy="20" r="2.2" fill="#FFFFFF" />
          <path d="M20 16.2V23.8M20 16.5L24 19" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'prometheus':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <circle cx="20" cy="20" r="14.5" fill="#E6522C" />
          <path d="M13 24.5H27M15.5 28H24.5M14.5 21.2C14.5 17.8 16.5 16 17.5 12.2C18.5 14.5 19.5 15.5 20 11.2C21.5 14 23 15 23.5 12.5C24.5 15.8 25.5 18 25.5 21.2" stroke="#FFFFFF" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'elk':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <rect x="7" y="9" width="21" height="6.5" rx="3.25" fill="#F9B110" />
          <rect x="7" y="17" width="26" height="6.5" rx="3.25" fill="#00BFB3" />
          <rect x="7" y="25" width="18" height="6.5" rx="3.25" fill="#0077CC" />
        </svg>
      );

    case 'claude':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <circle cx="20" cy="20" r="14.5" fill="#F97316" fillOpacity="0.16" />
          <path d="M20 7.5L22.5 17.5L32.5 20L22.5 22.5L20 32.5L17.5 22.5L7.5 20L17.5 17.5L20 7.5Z" fill="#EA580C" />
          <circle cx="28.5" cy="11.5" r="2.1" fill="#2563EB" />
        </svg>
      );

    case 'systemdesign':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
          <rect x="15" y="6" width="10" height="7" rx="2" fill="#2563EB" />
          <rect x="6" y="26" width="10" height="7" rx="2" fill="#0F172A" />
          <rect x="24" y="26" width="10" height="7" rx="2" fill="#0F172A" />
          <path d="M20 13V19.5M11 19.5H29M11 19.5V26M29 19.5V26" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
  }
}
