import { Award, GraduationCap, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../config/portfolioStructure';
import { BuddyStopSprite } from './ui/PixelAnshTravel';
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
 * Section 06 — Credentials & Education.
 * AWS certification tiles beside a light-blue B.Tech tile with graduate Pixel Ansh.
 */
export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="border-t border-hairline py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionReveal>
          <SectionHeader
            index="05"
            title="Credentials & education"
            headingId="certifications-heading"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left 7 Cols: Upgraded AWS Certification Tiles with AWS Watermark Emblem */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {CERTIFICATIONS.map((cert) => {
                const isAssociate = cert.id === 'aws-saa';
                return (
                  <div key={cert.id} className="flex-1">
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
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 t-meta text-muted">
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
                        <h3 className="t-h3 text-ink">
                          {cert.title}
                        </h3>
                        <p className="t-small text-muted">
                          {cert.focus}
                        </p>
                      </div>

                      <div className="relative z-10 pt-3 border-t border-hairline flex items-center justify-between gap-3 t-meta text-subtle">
                        <span>Issued by {cert.issuer}</span>
                        <span className="text-[#D97706] font-semibold">Verified Credential</span>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>

            {/* Right 5 Cols: light-blue B.Tech tile with graduate Pixel Ansh */}
            <article className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-[#BFDBFE] bg-gradient-to-b from-[#EFF6FF] via-[#F8FBFF] to-white p-6 sm:p-8 flex flex-col gap-6 shadow-[0_14px_36px_-24px_rgba(37,99,235,0.35)]">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#93C5FD]"
              />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#BFDBFE] px-3 py-1 t-meta font-semibold text-[#1D4ED8]">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    {EDUCATION.shortTag}
                  </span>
                  <span className="t-meta text-[#1E40AF]/80">
                    {EDUCATION.period}
                  </span>
                </div>

                <h3 className="t-h3 text-ink">
                  {EDUCATION.degree}
                </h3>

                <div className="space-y-1">
                  <p className="t-small font-medium text-ink/80">
                    {EDUCATION.institution}
                  </p>
                  <p className="t-meta text-muted">{EDUCATION.university}</p>
                </div>

                <div className="inline-flex items-baseline gap-2 rounded-xl bg-white border border-[#BFDBFE] px-4 py-2">
                  <span className="t-meta text-muted">CGPA</span>
                  <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#1D4ED8] tabular-nums">
                    {EDUCATION.cgpa}
                  </span>
                </div>
              </div>

              <div className="relative mt-auto self-center flex flex-col items-center">
                <BuddyStopSprite
                  stop="certifications"
                  spriteKey="grad"
                  alt="Pixel Ansh in a graduation gown"
                  className="w-56 h-56 sm:w-64 sm:h-64"
                />
                <span aria-hidden="true" className="-mt-5 h-3 w-36 rounded-[50%] bg-[#1D4ED8]/15 blur-[2px]" />
              </div>
            </article>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
