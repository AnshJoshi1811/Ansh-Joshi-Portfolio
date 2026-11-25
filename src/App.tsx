import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { FloatingPixelBuddy } from './components/FloatingPixelBuddy';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { SkillsSection } from './components/SkillsSection';
import { SocialPlatformsSection } from './components/SocialPlatformsSection';
import { WaveDivider } from './components/ui/WaveDivider';
import {
  SECTION_BUDDY_MOODS,
  SECTION_THEMES,
  SOCIAL_PLATFORMS,
  type PixelSpriteKey,
  type SocialPlatformId,
} from './config/portfolioStructure';

const OBSERVED_SECTION_IDS = [
  'hero',
  'social-platforms',
  'skills',
  'experience',
  'certifications',
  'contact',
] as const;

const SECTION_CHAPTER_LABELS: Record<string, string> = {
  hero: '01 · Hero',
  'social-platforms': '02 · Social',
  skills: '03 · Skills',
  experience: '04 · Experience',
  certifications: '05 · Credentials',
  contact: '06 · Contact',
};

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [selectedPlatformId, setSelectedPlatformId] =
    useState<SocialPlatformId>('github');
  const [hoveredPlatformId, setHoveredPlatformId] =
    useState<SocialPlatformId | null>(null);
  const [activeExperienceId, setActiveExperienceId] = useState<
    'engineer' | 'intern'
  >('engineer');
  const [buddyVisible, setBuddyVisible] = useState(false);
  const [dropSequence, setDropSequence] = useState(0);
  const [quipTick, setQuipTick] = useState(0);
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

  const handleBuddyReleaseChange = useCallback((released: boolean) => {
    setBuddyVisible(released);
    if (released) {
      setDropSequence((prev) => prev + 1);
    }
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

  // Derive the left-stage Main Character's sprite, scale, and quip across every section
  const buddyState: {
    spriteKey: PixelSpriteKey;
    characterScale: number;
    contextTag: string;
    caption: string;
  } = (() => {
    if (activeSectionId === 'social-platforms') {
      const targetPlatformId = hoveredPlatformId ?? selectedPlatformId;
      const platform =
        SOCIAL_PLATFORMS.find((p) => p.id === targetPlatformId) ??
        SOCIAL_PLATFORMS[0];
      return {
        spriteKey: platform.id,
        characterScale: 1,
        contextTag: `${platform.name} · ${platform.personaTitle}`,
        caption: hoveredPlatformId
          ? platform.peekTeaser
          : platform.humorCaption,
      };
    }

    if (activeSectionId === 'experience') {
      if (activeExperienceId === 'intern') {
        return {
          spriteKey: 'intern',
          characterScale: 0.72,
          contextTag: 'Mini Intern · LVL 01',
          caption:
            'Calsoft Intern Ansh! Smaller sprite, oversized backpack, building zero-downtime Go pricing pipelines.',
        };
      }

      return {
        spriteKey: 'engineer',
        characterScale: 1.12,
        contextTag: 'Cloud Engineer · LVL 02',
        caption:
          'Leveled up to Development Engineer in Cloud—bigger sprite, 15+ K8s microservices, Star Employee pin!',
      };
    }

    const mood = SECTION_BUDDY_MOODS[activeSectionId] ?? SECTION_BUDDY_MOODS.hero;
    return {
      spriteKey: mood.spriteKey,
      characterScale: mood.scale ?? 1,
      contextTag: mood.contextTag,
      caption: mood.quips[quipTick % mood.quips.length],
    };
  })();

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-yellow selection:text-ink">
      <Navbar activeSectionId={activeSectionId} />

      <main>
        {/* 01 — HERO (Warm Cream; scroll-pixelates portrait and drops Main Character onto left stage) */}
        <HeroSection
          onBuddyReleaseChange={handleBuddyReleaseChange}
          onNotify={handleNotify}
        />

        <WaveDivider
          fromColor={SECTION_THEMES.hero}
          toColor={SECTION_THEMES.social}
          variant="gentle"
        />

        {/* 02 — SOCIAL & SPOTLIGHT (Soft Lavender Mist; Snapchat-style peeking character + real platforms) */}
        <SocialPlatformsSection
          selectedPlatformId={selectedPlatformId}
          onSelectPlatform={setSelectedPlatformId}
          onHoverPlatformChange={setHoveredPlatformId}
        />

        <WaveDivider
          fromColor={SECTION_THEMES.social}
          toColor={SECTION_THEMES.skills}
          variant="crest"
        />

        {/* 03 — SKILLS & STACK (Soft Sage Linen) */}
        <SkillsSection />

        <WaveDivider
          fromColor={SECTION_THEMES.skills}
          toColor={SECTION_THEMES.experience}
          variant="stepped"
        />

        {/* 04 — EXPERIENCE (Warm Buttercream Sand; Mini Intern -> Big Cloud Engineer growth) */}
        <ExperienceSection
          activeExperienceId={activeExperienceId}
          onSelectExperience={setActiveExperienceId}
        />

        <WaveDivider
          fromColor={SECTION_THEMES.experience}
          toColor={SECTION_THEMES.certifications}
          variant="gentle"
          flip
        />

        {/* 05 — CERTIFICATIONS & GRADUATION (Soft Lilac; AWS SAA, AWS CP, B.Tech CSE) */}
        <CertificationsSection />

        <WaveDivider
          fromColor={SECTION_THEMES.certifications}
          toColor={SECTION_THEMES.contact}
          variant="crest"
          flip
        />

        {/* 06 — CONTACT & RESUME DOWNLOAD (Warm Cream) */}
        <ContactSection onNotify={handleNotify} />

        <Footer />
      </main>

      {/* The Main Character: drops onto the open LEFT stage and travels freely through every colored wave section */}
      <FloatingPixelBuddy
        visible={buddyVisible}
        spriteKey={buddyState.spriteKey}
        characterScale={buddyState.characterScale}
        sectionIndexLabel={SECTION_CHAPTER_LABELS[activeSectionId] ?? '01 · Hero'}
        contextTag={buddyState.contextTag}
        caption={buddyState.caption}
        dropSequence={dropSequence}
        onBuddyTap={() => setQuipTick((prev) => prev + 1)}
      />

      {/* Quiet, dismissible feedback toast on bottom-right */}
      {noticeMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-surface border border-ink px-4 py-3 shadow-[3px_3px_0_0_#252525] flex items-start gap-3"
        >
          <p className="text-xs sm:text-sm text-ink leading-snug">
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
