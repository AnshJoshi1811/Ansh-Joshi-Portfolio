import { Award, GraduationCap } from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  SECTION_THEMES,
} from '../config/portfolioStructure';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';
import { TransparentPixelSprite } from './ui/TransparentPixelSprite';

/**
 * Section 05 — Certifications & Graduation (Soft Lilac Theme).
 * Pairs Ansh's AWS certifications and B.Tech CSE graduation with the
 * 16-bit graduation cap + golden cloud medal sprite.
 */
export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      style={{ backgroundColor: SECTION_THEMES.certifications }}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[276px] xl:pl-[316px]">
        <SectionReveal>
          <SectionHeader
            index="05"
            title="Certifications & Graduation"
            headingId="certifications-heading"
            scopeNote="AWS cloud architecture credentials alongside my B.Tech Computer Science and Engineering degree."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 Cols: AWS Certifications */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {CERTIFICATIONS.map((cert) => (
                <article
                  key={cert.id}
                  className="bg-surface border border-hairline p-6 sm:p-7 flex flex-col justify-between gap-4 flex-1"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-muted">
                      <span className="tabular-nums text-ink font-medium">
                        {cert.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{cert.credentialType}</span>
                    </div>
                    <Award
                      className="w-5 h-5 text-lavender shrink-0"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted">{cert.issuer}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Right 5 Cols: Graduation Card with Free 16-Bit Graduation Character */}
            <article className="lg:col-span-5 bg-surface border border-hairline p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-ink font-medium">
                    <GraduationCap
                      className="w-4 h-4 text-lavender"
                      aria-hidden="true"
                    />
                    <span>Graduation</span>
                  </span>
                  <span className="font-mono text-xs text-muted tabular-nums">
                    {EDUCATION.period}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-ink leading-tight">
                  {EDUCATION.degree}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {EDUCATION.institution}
                </p>

                <p className="font-mono text-xs text-ink pt-1">
                  {EDUCATION.cgpa}
                </p>
              </div>

              {/* Borderless graduation + cloud medal sprite celebrating credentials */}
              <div className="pt-4 border-t border-hairline flex items-end justify-between gap-4">
                <p className="text-xs text-muted leading-relaxed max-w-[22ch]">
                  Degree scroll secured &amp; AWS cloud architecture certified.
                </p>
                <TransparentPixelSprite
                  spriteKey="grad"
                  pixelGrid={88}
                  className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 drop-shadow-[0_4px_0_rgba(37,37,37,0.12)]"
                />
              </div>
            </article>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
