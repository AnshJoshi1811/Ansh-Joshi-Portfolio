import { Award, GraduationCap, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../config/portfolioStructure';
import { PeekOnHover } from './ui/PeekOnHover';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';

/**
 * Crisp geometric AWS Cloud + Smile Arrow Watermark Emblem (vector SVG).
 */
function AwsWatermarkEmblem({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Architectural cloud silhouette */}
      <path
        d="M52 72h78a22 22 0 0 0 4-43.6A32 32 0 0 0 72 22a26 26 0 0 0-24.4 17.5A18 18 0 0 0 52 72Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* AWS signature curved smile arrow */}
      <path
        d="M36 88c28 19 72 19 102 0"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M128 82l13 5-5 13"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crisp minimal geometric badge grid dots */}
      <circle cx="72" cy="48" r="3.5" fill="currentColor" />
      <circle cx="92" cy="48" r="3.5" fill="currentColor" />
      <circle cx="112" cy="48" r="3.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Crisp geometric B.Tech Academic Crest & Mortarboard Watermark Emblem (vector SVG).
 */
function BtechWatermarkEmblem({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 150"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Shield crest frame */}
      <path
        d="M90 16l58 20v44c0 32-24 52-58 62-34-10-58-30-58-62V36l58-20Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Mortarboard cap inside crest */}
      <path
        d="M90 48l34 15-34 15-34-15 34-15Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M68 71v18c0 6 10 12 22 12s22-6 22-12V71"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M124 63v22"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="124" cy="89" r="3.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Section 06 — Credentials & Education.
 * Upgraded high-craft credential tiles featuring subtle AWS cloud-smile and
 * B.Tech academic crest vector corner watermarks + sneaking Ansh hover peeks!
 */
export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="border-t border-hairline bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[280px] xl:pl-[324px]">
        <SectionReveal>
          <SectionHeader
            index="06"
            title="Credentials & education"
            headingId="certifications-heading"
            scopeNote="Verified Amazon Web Services certifications alongside my B.Tech in Computer Science and Engineering."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left 7 Cols: Upgraded AWS Certification Tiles with AWS Watermark Emblem */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {CERTIFICATIONS.map((cert) => {
                const isAssociate = cert.id === 'aws-saa';
                return (
                  <PeekOnHover key={cert.id} align="right" size="sm" className="flex-1">
                    <article className="relative h-full overflow-hidden bg-surface border border-hairline rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-[0_8px_28px_-20px_rgba(15,23,42,0.18)] hover:border-[#F59E0B]/70 transition-all duration-150">
                      {/* Crisp top AWS accent bar */}
                      <div
                        aria-hidden="true"
                        className={`absolute inset-x-0 top-0 h-1 ${
                          isAssociate
                            ? 'bg-gradient-to-r from-[#FF9900] via-[#F59E0B] to-[#2563EB]'
                            : 'bg-gradient-to-r from-[#FF9900] to-[#FBBF24]'
                        }`}
                      />

                      {/* Subtle geometric AWS Cloud-Smile Watermark Emblem in bottom-right corner */}
                      <AwsWatermarkEmblem className="pointer-events-none absolute -bottom-3 -right-2 w-40 h-28 text-[#D97706] opacity-[0.09]" />

                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted">
                          <span className="tabular-nums font-bold text-[#D97706]">
                            AWS · {cert.code}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{cert.credentialType}</span>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center shrink-0 text-[#D97706]">
                          {isAssociate ? (
                            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <Award className="w-5 h-5" aria-hidden="true" />
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 space-y-2 max-w-[44ch]">
                        <h3 className="font-display text-lg sm:text-xl font-extrabold text-ink leading-snug tracking-tight">
                          {cert.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted leading-relaxed">
                          {cert.focus}
                        </p>
                      </div>

                      <div className="relative z-10 pt-3 border-t border-hairline flex items-center justify-between gap-3 font-mono text-[11px] text-subtle">
                        <span>Issued by {cert.issuer}</span>
                        <span className="text-[#D97706] font-semibold">Verified Credential</span>
                      </div>
                    </article>
                  </PeekOnHover>
                );
              })}
            </div>

            {/* Right 5 Cols: Upgraded B.Tech CSE Tile with Academic Crest Watermark */}
            <PeekOnHover align="right" size="md" className="lg:col-span-5">
              <article className="relative h-full overflow-hidden bg-[#0F172A] text-white border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-[0_14px_36px_-22px_rgba(15,23,42,0.45)]">
                {/* Crisp top cobalt-gold accent line */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#F59E0B]"
                />

                {/* Subtle geometric B.Tech Academic Crest Watermark in bottom-right corner */}
                <BtechWatermarkEmblem className="pointer-events-none absolute -bottom-4 -right-3 w-44 h-40 text-blue-300 opacity-[0.11]" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-blue-300 font-semibold">
                      <GraduationCap className="w-4 h-4" aria-hidden="true" />
                      <span>{EDUCATION.shortTag}</span>
                    </span>
                    <span className="font-mono text-xs text-slate-300 tabular-nums">
                      {EDUCATION.period}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-[26px] font-extrabold tracking-tight leading-tight text-white">
                    {EDUCATION.degree}
                  </h3>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">
                      {EDUCATION.institution}
                    </p>
                    <p className="font-mono text-xs text-slate-400">
                      {EDUCATION.university}
                    </p>
                  </div>
                </div>

                {/* CGPA & Foundation Highlights */}
                <div className="relative z-10 space-y-4 pt-5 border-t border-slate-800">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-xs text-slate-400">
                      Academic Performance
                    </span>
                    <span className="font-display text-xl font-extrabold text-amber-300 tabular-nums">
                      {EDUCATION.cgpa}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-[34ch]">
                    Core foundation in computer networks, operating systems, DBMS, and distributed systems architecture.
                  </p>
                </div>
              </article>
            </PeekOnHover>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
