import { useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileCode2,
  MapPin,
  Phone,
} from 'lucide-react';
import { SITE_META, SOCIAL_PLATFORMS } from '../config/portfolioStructure';
import {
  downloadFormattedResumeHtml,
  downloadResumeLatex,
} from '../utils/resumeDownload';
import { PlatformIcon } from './ui/PlatformIcons';
import { BuddyStopSprite, useLandedStop } from './ui/PixelAnshTravel';

interface ContactSectionProps {
  onNotify: (message: string) => void;
}

/**
 * Contact doubles as the site footer. Pixel Ansh sits on the footer's top edge,
 * waiting for your call; the floating buddy hides while this is on screen.
 */
export function ContactSection({ onNotify }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const isAnshHere = useLandedStop() === 'contact';

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
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative mt-20 sm:mt-28 border-t border-hairline-strong bg-surface"
    >
      <div className="relative mx-auto max-w-[1120px] px-5 sm:px-8">
        {/* Pixel Ansh seated on the footer's top edge: seat line sits on the border, legs hang over it */}
        <div className="absolute left-2 sm:left-4 -top-[107px] sm:-top-[156px] z-10 flex items-start">
          <BuddyStopSprite
            stop="contact"
            spriteKey="waitingCall"
            alt="Pixel Ansh sitting on the footer, waiting for your call"
            className="w-44 h-44 sm:w-64 sm:h-64"
          />
          <span
            aria-hidden="true"
            className={`${isAnshHere ? 'sm:inline-flex' : 'sm:hidden'} hidden items-center gap-2 mt-16 -ml-10 rounded-full border border-hairline-strong bg-surface px-3 py-1.5 t-eyebrow text-ink shadow-sm whitespace-nowrap`}
          >
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ring-ripple" />
            </span>
            Waiting for your call…
          </span>
        </div>

        <div className="pt-24 sm:pt-32 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: pitch + direct lines + résumé */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="t-eyebrow text-cobalt">Contact</p>
              <h2
                id="contact-heading"
                className="t-h2 text-ink"
              >
                Let&apos;s build something.
              </h2>
              <p className="t-lead text-muted max-w-[52ch]">
                Open to software roles and good tech conversations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE_META.email}`}
                data-umami-event="email-click"
                data-umami-event-location="contact"
                className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-ink underline decoration-hairline-strong decoration-2 underline-offset-[6px] hover:decoration-ink transition-colors break-all"
              >
                {SITE_META.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                data-umami-event="email-copy"
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-canvas px-3 py-1.5 text-xs font-semibold text-ink hover:bg-recessed cursor-pointer transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <a
                href={`tel:${SITE_META.phone}`}
                data-umami-event="phone-click"
                className="inline-flex items-center gap-2 hover:text-ink transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {SITE_META.phone}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                {SITE_META.location} · Open to remote &amp; hybrid
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadResume}
                data-umami-event="resume-download"
                data-umami-event-format="html"
                data-umami-event-location="contact"
                className="pro-btn bg-ink hover:bg-ink/90 text-white border-ink px-5 py-2.5 text-sm"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download résumé
              </button>
              <button
                type="button"
                onClick={handleDownloadLatex}
                data-umami-event="resume-download"
                data-umami-event-format="latex"
                data-umami-event-location="contact"
                className="pro-btn bg-surface hover:bg-recessed text-ink border-hairline-strong px-4 py-2.5 text-sm"
              >
                <FileCode2 className="w-4 h-4" aria-hidden="true" />
                LaTeX source
              </button>
            </div>
          </div>

          {/* Right: profiles */}
          <nav aria-label="Profiles" className="lg:col-span-5 lg:pt-10">
            <p className="t-eyebrow text-muted mb-3">Find me online</p>
            <ul className="grid grid-cols-2 gap-2">
              {SOCIAL_PLATFORMS.map((platform) => (
                <li key={platform.id}>
                  <a
                    href={platform.profileUrl}
                    data-umami-event="profile-click"
                    data-umami-event-platform={platform.id}
                    data-umami-event-location="contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 rounded-xl border border-hairline bg-canvas px-3 py-2.5 text-sm font-semibold text-ink hover:border-hairline-strong hover:bg-recessed transition-colors"
                  >
                    <PlatformIcon platform={platform.id} className="w-4 h-4 shrink-0" />
                    <span className="truncate">{platform.name}</span>
                    <ArrowUpRight
                      className="ml-auto w-3.5 h-3.5 shrink-0 text-subtle group-hover:text-ink transition-colors"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hairline py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 t-caption text-muted">
          <p>
            © {new Date().getFullYear()} {SITE_META.owner} ·{' '}
            <span className="font-mono">{SITE_META.domain}</span>
          </p>
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 font-medium hover:text-ink transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
