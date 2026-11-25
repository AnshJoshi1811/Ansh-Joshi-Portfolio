import { Award } from 'lucide-react';
import {
  SITE_META,
  WORK_EXPERIENCE,
  type ExperienceEntry,
} from '../config/portfolioStructure';
import { PeekOnHover } from './ui/PeekOnHover';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';

/**
 * Section 04 — Work Experience (Ultra-Minimal Rajan-Style Editorial Layout).
 * Clean 2-column rows separated by 1px hairlines:
 * Left column holds tenure, company & location; right column holds role, summary,
 * project headings, and exact verified Calsoft resume bullets.
 * Zero mascot scale buttons, zero right-side sprites, zero intern/full-time scaling clutter.
 */
export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-hairline bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[280px] xl:pl-[324px]">
        <SectionReveal>
          <SectionHeader
            index="04"
            title="Work experience"
            headingId="experience-heading"
            scopeNote="Where I've shipped production backend systems, cloud automation, and Kubernetes infrastructure."
          />

          {/* Clean Minimal Hairline Rows (Rajan-inspired editorial restraint) */}
          <div className="divide-y divide-hairline border-y border-hairline">
            {WORK_EXPERIENCE.map((entry: ExperienceEntry) => (
              <PeekOnHover key={entry.id} align="right" size="sm">
                <article className="py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 transition-colors hover:bg-surface/65 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl">
                  {/* Left Column (4 cols): Tenure, Company & Recognition */}
                  <div className="md:col-span-4 space-y-2">
                    <p className="font-mono text-xs sm:text-[13px] font-medium text-cobalt tabular-nums">
                      {entry.period}
                    </p>
                    <p className="font-display text-lg font-bold text-ink">
                      {entry.company}
                    </p>
                    <p className="text-xs sm:text-sm text-muted">
                      {entry.location}
                    </p>

                    {entry.id === 'engineer' && (
                      <p className="inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-amber">
                        <Award className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{SITE_META.award}</span>
                      </p>
                    )}
                  </div>

                  {/* Right Column (8 cols): Role Title, Summary & Verified Impact Bullets */}
                  <div className="md:col-span-8 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-ink leading-tight">
                        {entry.role}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-muted leading-relaxed">
                        {entry.summary}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {entry.projects.map((project) => (
                        <div key={project.name} className="space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                            <h4 className="font-display text-sm sm:text-base font-bold text-ink">
                              {project.name}
                            </h4>
                            <span className="font-mono text-[11px] text-subtle">
                              {project.stack}
                            </span>
                          </div>

                          <ul className="space-y-2">
                            {project.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-2.5 text-sm text-ink/85 leading-relaxed"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-2 w-1.5 h-1.5 rounded-full bg-cobalt/75 shrink-0"
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </PeekOnHover>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
