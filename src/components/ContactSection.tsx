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
  PhoneCall,
} from 'lucide-react';
import { SITE_META, SOCIAL_PLATFORMS } from '../config/portfolioStructure';
import {
  downloadFormattedResumeHtml,
  downloadResumeLatex,
} from '../utils/resumeDownload';
import { PeekOnHover } from './ui/PeekOnHover';
import { PlatformIcon } from './ui/PlatformIcons';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';
import { TransparentPixelSprite } from './ui/TransparentPixelSprite';

interface ContactSectionProps {
  onNotify: (message: string) => void;
}

/**
 * Section 07 — Contact & Resume.
 * Upgraded high-contrast Contact Card with 32-bit Pixel Ansh literally perched ON TOP
 * of the card edge with dangling legs, holding his smartphone with an animated ring wave
 * waiting for your call or email! Paired with instant Resume downloads and all 6 profiles.
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
      className="border-t border-hairline bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[280px] xl:pl-[324px]">
        <SectionReveal>
          <SectionHeader
            index="07"
            title="Contact & resume"
            headingId="contact-heading"
            scopeNote="Open to impactful software engineering roles, collaborations, and good tech conversations—give me a ring, drop an email, or grab my resume."
          />

          {/* Top spacing gives room for Pixel Ansh perched cleanly ON the Contact Card edge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-16 sm:pt-20">
            {/* Left 7 Cols: High-Contrast Contact Card with Waiting-For-Call Pixel Ansh Perched On Top */}
            <div className="lg:col-span-7 relative">
              {/* Pixel Ansh sitting right on top of the Contact Card with legs dangling over the edge! */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-[104px] sm:-top-[124px] right-4 sm:right-8 z-20 flex items-end gap-2"
              >
                {/* Animated live ringing indicator beside his smartphone */}
                <div className="hidden sm:flex items-center gap-2 mb-9 bg-surface border border-hairline-strong rounded-xl px-3 py-1.5 shadow-sm">
                  <span className="relative flex items-center justify-center w-4 h-4">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cobalt/40 animate-ring-ripple" />
                    <PhoneCall className="relative w-3.5 h-3.5 text-cobalt" />
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-ink whitespace-nowrap">
                    Waiting for your call…
                  </span>
                </div>

                <TransparentPixelSprite
                  spriteKey="waitingCall"
                  pixelGrid={144}
                  className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_12px_16px_rgba(15,23,42,0.28)]"
                />
              </div>

              <div className="relative z-10 h-full bg-[#0F172A] text-white border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-8 shadow-[0_18px_44px_-24px_rgba(15,23,42,0.5)]">
                <div className="space-y-6">
                  <div className="space-y-2 pr-24 sm:pr-36">
                    <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-blue-300">
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ring-ripple" />
                      </span>
                      <span>Direct Line · Always Pick Up</span>
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                      Let&apos;s build something meaningful together.
                    </h3>
                  </div>

                  {/* Direct Contact Rows */}
                  <div className="divide-y divide-slate-800 border-y border-slate-800">
                    <div className="py-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-blue-300">
                          <Mail className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <a
                          href={`mailto:${SITE_META.email}`}
                          className="text-sm sm:text-base font-semibold text-white hover:text-blue-300 transition-colors truncate"
                        >
                          {SITE_META.email}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="py-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-emerald-300">
                          <Phone className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <a
                          href={`tel:${SITE_META.phone}`}
                          className="text-sm sm:text-base font-semibold text-white hover:text-emerald-300 transition-colors font-mono"
                        >
                          {SITE_META.phone}
                        </a>
                      </div>
                      <a
                        href={`tel:${SITE_META.phone}`}
                        className="font-mono text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
                      >
                        Call directly →
                      </a>
                    </div>

                    <div className="py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-slate-300">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-200">
                        {SITE_META.location} · Open to Remote &amp; Hybrid
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tactile Resume Downloads */}
                <div className="space-y-3">
                  <p className="font-mono text-xs text-slate-400">
                    Resume · Verified 2025–Present
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleDownloadResume}
                      className="pro-btn bg-cobalt hover:bg-cobalt-dark text-white border-cobalt px-5 py-2.5 text-sm shadow-sm"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>Download Resume (Print PDF)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadLatex}
                      className="pro-btn bg-white/10 hover:bg-white/15 text-white border-white/20 px-4 py-2.5 text-sm"
                    >
                      <FileCode2 className="w-4 h-4 text-blue-300" aria-hidden="true" />
                      <span>LaTeX Source (.tex)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Online Profiles Companion Card with Sneaking Ansh Hover */}
            <PeekOnHover align="right" size="md" className="lg:col-span-5">
              <aside className="h-full bg-surface border border-hairline rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-[0_8px_28px_-20px_rgba(15,23,42,0.16)]">
                <div className="space-y-1">
                  <p className="font-mono text-xs font-semibold text-cobalt">
                    Everywhere Online
                  </p>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                    Find me across all 6 platforms
                  </h3>
                </div>

                <ul className="divide-y divide-hairline border-t border-hairline">
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <li key={platform.id}>
                      <a
                        href={platform.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 py-3 text-sm text-ink hover:text-cobalt transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-8 h-8 rounded-lg bg-recessed group-hover:bg-cobalt-soft flex items-center justify-center shrink-0 transition-colors">
                            <PlatformIcon
                              platform={platform.id}
                              className="w-4 h-4 text-muted group-hover:text-cobalt transition-colors"
                            />
                          </span>
                          <div className="min-w-0">
                            <span className="font-semibold block truncate">
                              {platform.name}
                            </span>
                            <span className="font-mono text-[11px] text-muted block truncate">
                              {platform.handle}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight
                          className="w-4 h-4 text-muted group-hover:text-cobalt shrink-0 transition-colors"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </PeekOnHover>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
