import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { SkillsSection } from './components/SkillsSection';
import { SocialPlatformsSection } from './components/SocialPlatformsSection';
import { PagePixelField } from './components/ui/PagePixelField';
import { PixelAnshTravel, type BuddyStop } from './components/ui/PixelAnshTravel';

const OBSERVED_SECTION_IDS: BuddyStop[] = [
  'hero',
  'social-platforms',
  'experience',
  'skills',
  'certifications',
  'contact',
];

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<BuddyStop>('hero');

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const noticeTimerRef = useRef<number | null>(null);

  const handleNotify = useCallback((message: string) => {
    setNoticeMessage(message);
    if (noticeTimerRef.current !== null) {
      window.clearTimeout(noticeTimerRef.current);
    }
    noticeTimerRef.current = window.setTimeout(() => {
      setNoticeMessage(null);
      noticeTimerRef.current = null;
    }, 3600);
  }, []);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current !== null) {
        window.clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = OBSERVED_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id as BuddyStop);
        }
      },
      {
        rootMargin: '-22% 0px -48% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navActiveId =
    activeSectionId === 'certifications' ? 'experience' : activeSectionId;

  return (
    <div className="min-h-screen text-ink selection:bg-[#DBEAFE] selection:text-ink">
      {/* Page-wide dot grid that reacts to the cursor */}
      <PagePixelField />
      <Navbar activeSectionId={navActiveId} />

      {/* One Pixel Ansh hops from section to section as you scroll */}
      <PixelAnshTravel targetStop={activeSectionId}>
        <main className="relative">
          <HeroSection onNotify={handleNotify} />
          <SocialPlatformsSection />
          <ExperienceSection />
          <SkillsSection />
          <CertificationsSection />
          {/* Contact doubles as the footer */}
          <ContactSection onNotify={handleNotify} />
        </main>
      </PixelAnshTravel>

      {/* Quiet, dismissible confirmation toast */}
      {noticeMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-surface border border-hairline-strong rounded-xl px-4 py-3 shadow-lg flex items-start gap-3"
        >
          <p className="text-xs sm:text-sm text-ink font-medium leading-snug">
            {noticeMessage}
          </p>
          <button
            type="button"
            onClick={() => setNoticeMessage(null)}
            aria-label="Dismiss notification"
            className="text-muted hover:text-ink p-0.5 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
