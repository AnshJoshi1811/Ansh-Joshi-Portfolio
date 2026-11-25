import { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileCode2,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import {
  SECTION_THEMES,
  SITE_META,
  SOCIAL_PLATFORMS,
} from '../config/portfolioStructure';
import {
  downloadFormattedResumeHtml,
  downloadResumeLatex,
} from '../utils/resumeDownload';
import { PixelButton } from './ui/PixelButton';
import { PlatformIcon } from './ui/PlatformIcons';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';

interface ContactSectionProps {
  onNotify: (message: string) => void;
}

/**
 * Section 06 — Contact & Resume Download (Warm Cream Theme).
 * Displays real contact details, copyable email, all 6 real social links,
 * and working stepped-pixel Resume downloads (Formatted HTML/Print PDF + LaTeX source).
 */
export function ContactSection({ onNotify }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_META.email);
      setCopiedEmail(true);
      onNotify(`Copied ${SITE_META.email} to your clipboard.`);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      onNotify(`Email: ${SITE_META.email}`);
    }
  };

  const handleDownloadResume = () => {
    downloadFormattedResumeHtml();
    onNotify('Downloaded Ansh_Joshi_Resume.html — open and Print to Save as PDF anytime.');
  };

  const handleDownloadLatex = () => {
    downloadResumeLatex();
    onNotify('Downloaded Ansh_Joshi_Resume.tex (LaTeX source).');
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ backgroundColor: SECTION_THEMES.contact }}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[276px] xl:pl-[316px]">
        <SectionReveal>
          <SectionHeader
            index="06"
            title="Contact & Resume"
            headingId="contact-heading"
            scopeNote="Reach out directly for Golang backend, Kubernetes platform engineering, or just to swap road-trip routes."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 Cols: Direct Contact Details + Resume Download */}
            <div className="lg:col-span-7 bg-surface border border-hairline p-6 sm:p-8 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="font-mono text-xs text-muted">Direct Channels</p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-tight">
                    Let&apos;s build something dependable together.
                  </h3>
                </div>

                {/* Email, Phone, Location Rows */}
                <div className="divide-y divide-hairline border-y border-hairline">
                  <div className="py-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail
                        className="w-4 h-4 text-lavender shrink-0"
                        aria-hidden="true"
                      />
                      <a
                        href={`mailto:${SITE_META.email}`}
                        className="text-sm sm:text-base font-medium text-ink hover:text-lavender transition-colors truncate"
                      >
                        {SITE_META.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink px-2.5 py-1 border border-hairline bg-canvas cursor-pointer transition-colors"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-ink" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="py-4 flex items-center gap-3">
                    <Phone
                      className="w-4 h-4 text-lavender shrink-0"
                      aria-hidden="true"
                    />
                    <a
                      href={`tel:${SITE_META.phone}`}
                      className="text-sm sm:text-base font-medium text-ink hover:text-lavender transition-colors font-mono"
                    >
                      {SITE_META.phone}
                    </a>
                  </div>

                  <div className="py-4 flex items-center gap-3">
                    <MapPin
                      className="w-4 h-4 text-lavender shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-base text-ink">
                      {SITE_META.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stepped-Pixel Resume Downloads */}
              <div className="space-y-3">
                <p className="font-mono text-xs text-muted">
                  Resume · Updated for 2025–Present
                </p>
                <div className="flex flex-wrap items-center gap-3.5">
                  <PixelButton
                    onClick={handleDownloadResume}
                    variant="primary"
                    size="md"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Download Resume</span>
                  </PixelButton>

                  <PixelButton
                    onClick={handleDownloadLatex}
                    variant="yellow"
                    size="md"
                  >
                    <FileCode2 className="w-4 h-4" aria-hidden="true" />
                    <span>Download LaTeX (.tex)</span>
                  </PixelButton>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: All 6 Real Social Links */}
            <aside className="lg:col-span-5 bg-surface border border-hairline p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-2">
                <p className="font-mono text-xs text-muted">
                  Across the Internet
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink">
                  Find me on all 6 platforms
                </h3>
              </div>

              <ul className="divide-y divide-hairline border-t border-hairline">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <li key={platform.id}>
                    <a
                      href={platform.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 py-3.5 text-sm text-ink hover:text-lavender transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <PlatformIcon
                          platform={platform.id}
                          className="w-4 h-4 text-ink group-hover:text-lavender shrink-0 transition-colors"
                        />
                        <div className="min-w-0">
                          <span className="font-medium block truncate">
                            {platform.name}
                          </span>
                          <span className="font-mono text-[11px] text-muted block truncate">
                            {platform.handle}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-muted group-hover:text-lavender shrink-0 transition-colors"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
