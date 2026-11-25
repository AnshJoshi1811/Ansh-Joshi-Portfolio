import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import {
  FloatingPixelBuddy,
  type ActiveJumpFlight,
} from './components/FloatingPixelBuddy';
import { Footer } from './components/Footer';
import { HeroSection, type JumpLaunchCoords } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ScrollRailNav } from './components/ScrollRailNav';
import { SkillsSection } from './components/SkillsSection';
import { SocialPlatformsSection } from './components/SocialPlatformsSection';
import { SystemsSection } from './components/SystemsSection';
import type { PixelSpriteKey, SocialPlatformId } from './config/portfolioStructure';

const OBSERVED_SECTION_IDS = [
  'hero',
  'social-platforms',
  'systems',
  'experience',
  'skills',
  'certifications',
  'contact',
] as const;

const SECTION_CHAPTER_LABELS: Record<string, string> = {
  hero: '01 · Intro',
  'social-platforms': '02 · Socials',
  systems: '03 · Systems',
  experience: '04 · Experience',
  skills: '05 · Skills',
  certifications: '06 · Credentials',
  contact: '07 · Contact',
};

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [selectedPlatformId, setSelectedPlatformId] =
    useState<SocialPlatformId>('github');
  const [hoveredPlatformId, setHoveredPlatformId] =
    useState<SocialPlatformId | null>(null);

  const [buddyVisible, setBuddyVisible] = useState(false);
  const [jumpFlight, setJumpFlight] = useState<ActiveJumpFlight | null>(null);
  const pendingScrollAfterJumpRef = useRef(false);
  const flightCounterRef = useRef(0);

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

  const handleLaunchJump = useCallback((coords: JumpLaunchCoords) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setJumpFlight(null);
      setBuddyVisible(true);
      if (coords.scrollAfterJump) {
        document
          .getElementById('social-platforms')
          ?.scrollIntoView({ behavior: 'auto' });
      }
      return;
    }

    pendingScrollAfterJumpRef.current = Boolean(coords.scrollAfterJump);
    flightCounterRef.current += 1;
    setBuddyVisible(false);
    setJumpFlight({
      id: flightCounterRef.current,
      startX: coords.startX,
      startY: coords.startY,
    });
  }, []);

  const handleJumpFlightComplete = useCallback(() => {
    setJumpFlight(null);
    setBuddyVisible(true);

    if (pendingScrollAfterJumpRef.current) {
      pendingScrollAfterJumpRef.current = false;
      window.setTimeout(() => {
        document
          .getElementById('social-platforms')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 140);
    }
  }, []);

  const handleResetBuddy = useCallback(() => {
    pendingScrollAfterJumpRef.current = false;
    setJumpFlight(null);
    setBuddyVisible(false);
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
          setActiveSectionId(visible[0].target.id);
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

  // Shift Pixel Ansh smoothly to the RIGHT side during Social Media so there are never two characters on the left!
  const buddyDockSide: 'left' | 'right' =
    activeSectionId === 'social-platforms' ? 'right' : 'left';

  // Pick crisp 32-bit sprite matching the active chapter
  const activeBuddySprite: PixelSpriteKey = (() => {
    switch (activeSectionId) {
      case 'social-platforms':
        return hoveredPlatformId ?? selectedPlatformId;
      case 'systems':
        return 'idle';
      case 'experience':
        return 'engineer';
      case 'skills':
        return 'github';
      case 'certifications':
        return 'grad';
      case 'contact':
      case 'hero':
      default:
        return 'hero';
    }
  })();

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-[#DBEAFE] selection:text-ink">
      <Navbar activeSectionId={navActiveId} />

      {/* Left fixed vertical scroll rail navigation with live scroll-filled progress bar */}
      <ScrollRailNav activeSectionId={activeSectionId} />

      <main className="relative">
        {/* Continuous animated architectural vertical spine line threading through the entire site */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute top-0 bottom-0 left-[236px] xl:left-[268px] w-px bg-hairline/90 overflow-hidden z-10"
        >
          <div className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-cobalt/75 to-transparent animate-spine-beam" />
        </div>

        {/* 01 — HERO (Overall Software Engineer profile + delayed starting jump launchpad) */}
        <HeroSection
          buddyLanded={buddyVisible}
          onLaunchJump={handleLaunchJump}
          onResetBuddy={handleResetBuddy}
          onNotify={handleNotify}
        />

        {/* 02 — MAIN SECTION: SOCIAL WORLDS (Per-tab visual themes + nose-only sneaking Ansh + right-docked buddy) */}
        <SocialPlatformsSection
          selectedPlatformId={selectedPlatformId}
          onSelectPlatform={setSelectedPlatformId}
          onHoverPlatformChange={setHoveredPlatformId}
        />

        {/* 03 — SYSTEMS & ARCHITECTURE */}
        <SystemsSection />

        {/* 04 — WORK EXPERIENCE (Minimal Rajan-style editorial rows) */}
        <ExperienceSection />

        {/* 05 — TOOLS I BUILD WITH (21 real tools + sneaking hover peeks) */}
        <SkillsSection />

        {/* 06 — CREDENTIALS & EDUCATION (AWS & B.Tech watermarked tiles) */}
        <CertificationsSection />

        {/* 07 — CONTACT & RESUME (Waiting-for-call Pixel Ansh perched ON the Contact Card!) */}
        <ContactSection onNotify={handleNotify} />

        <Footer />
      </main>

      {/* Bigger Pixel Ansh: click = jump only, fast-scroll-gated jump, shifts RIGHT during Social Media */}
      <FloatingPixelBuddy
        visible={buddyVisible}
        jumpFlight={jumpFlight}
        onJumpFlightComplete={handleJumpFlightComplete}
        spriteKey={activeBuddySprite}
        dockSide={buddyDockSide}
        sectionIndexLabel={SECTION_CHAPTER_LABELS[activeSectionId] ?? '01 · Intro'}
      />

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
