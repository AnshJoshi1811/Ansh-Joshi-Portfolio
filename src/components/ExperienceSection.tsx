import { Award, MapPin } from 'lucide-react';
import {
  SECTION_THEMES,
  SITE_META,
  WORK_EXPERIENCE,
  type ExperienceEntry,
} from '../config/portfolioStructure';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';
import { TransparentPixelSprite } from './ui/TransparentPixelSprite';

interface ExperienceSectionProps {
  activeExperienceId: 'engineer' | 'intern';
  onSelectExperience: (id: 'engineer' | 'intern') => void;
}

/**
 * Section 04 — Experience (Warm Buttercream Sand Theme).
 * Features Ansh's progression at Calsoft:
 * - Level 01 (Intern): Small 16-bit Ansh with oversized backpack & books
 * - Level 02 (Development Engineer in Cloud): Bigger, leveled-up Cloud Engineer with Star pin
 * Hovering or selecting either role scales the free left-stage Main Character in real time.
 */
export function ExperienceSection({
  activeExperienceId,
  onSelectExperience,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      style={{ backgroundColor: SECTION_THEMES.experience }}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[276px] xl:pl-[316px]">
        <SectionReveal>
          <SectionHeader
            index="04"
            title="Experience"
            headingId="experience-heading"
            scopeNote="From backend intern shipping Go pricing pipelines to cloud development engineer running 15+ Kubernetes microservices. Hover or click a role to watch 16-bit Ansh grow."
          />

          {/* Interactive Character Growth Switcher Strip */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border border-hairline bg-surface px-5 py-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-ink">
              <Award className="w-4 h-4 text-lavender shrink-0" aria-hidden="true" />
              <span className="font-semibold">{SITE_META.award}</span>
              <span aria-hidden="true" className="text-muted">·</span>
              <span className="text-muted">Calsoft (April 2024 – Present)</span>
            </div>

            <div
              role="group"
              aria-label="Preview character growth stage"
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => onSelectExperience('intern')}
                className={`px-3 py-1.5 font-mono text-xs border transition-colors cursor-pointer ${
                  activeExperienceId === 'intern'
                    ? 'bg-yellow-soft border-ink text-ink font-medium shadow-[2px_2px_0_0_#252525]'
                    : 'bg-canvas border-hairline text-muted hover:text-ink'
                }`}
              >
                LVL 01 · Mini Intern
              </button>
              <button
                type="button"
                onClick={() => onSelectExperience('engineer')}
                className={`px-3 py-1.5 font-mono text-xs border transition-colors cursor-pointer ${
                  activeExperienceId === 'engineer'
                    ? 'bg-lavender-soft border-ink text-ink font-medium shadow-[2px_2px_0_0_#252525]'
                    : 'bg-canvas border-hairline text-muted hover:text-ink'
                }`}
              >
                LVL 02 · Big Cloud Engineer
              </button>
            </div>
          </div>

          {/* Two Real Experience Entries with Unmistakable Small vs Big Character Scale */}
          <div className="space-y-6">
            {WORK_EXPERIENCE.map((entry: ExperienceEntry) => {
              const isActive = activeExperienceId === entry.id;
              const isEngineer = entry.id === 'engineer';

              return (
                <article
                  key={entry.id}
                  onMouseEnter={() => onSelectExperience(entry.id)}
                  onClick={() => onSelectExperience(entry.id)}
                  className={`bg-surface border transition-[border-color,box-shadow] duration-150 cursor-pointer ${
                    isActive
                      ? 'border-ink shadow-[4px_4px_0_0_#252525]'
                      : 'border-hairline hover:border-ink/50'
                  }`}
                >
                  {/* Role Header + Visual Size Evolution Comparison */}
                  <div className="p-6 sm:p-8 border-b border-hairline flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted">
                        <span className="text-ink font-medium tabular-nums">
                          {entry.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className={isEngineer ? 'text-lavender font-medium' : 'text-ink/80'}>
                          {entry.levelLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{entry.period}</span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-tight">
                        {entry.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                        <span className="font-medium text-ink">{entry.company}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                          {entry.location}
                        </span>
                      </div>
                    </div>

                    {/* Free, borderless Small Intern vs Bigger Cloud Engineer comparison right beside the role */}
                    <div className="flex items-end gap-3 self-start sm:self-end shrink-0">
                      <div className="text-right hidden sm:block pb-1">
                        <span className="block font-mono text-[10px] text-muted">
                          Sprite Scale
                        </span>
                        <span className="block font-mono text-xs font-medium text-ink">
                          {entry.characterScaleLabel}
                        </span>
                      </div>
                      <div className="flex items-end justify-center h-28 w-28">
                        <TransparentPixelSprite
                          spriteKey={entry.spriteKey}
                          pixelGrid={88}
                          className={
                            isEngineer
                              ? 'w-28 h-28 drop-shadow-[0_4px_0_rgba(37,37,37,0.12)]'
                              : 'w-[72px] h-[72px] drop-shadow-[0_4px_0_rgba(37,37,37,0.12)]'
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Real Project Work & Impact Bullets */}
                  <div className="p-6 sm:p-8 divide-y divide-hairline space-y-6">
                    {entry.projects.map((project, pIdx) => (
                      <div
                        key={project.name}
                        className={pIdx > 0 ? 'pt-6 space-y-3.5' : 'space-y-3.5'}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                          <h4 className="font-serif text-lg sm:text-xl font-medium text-ink">
                            {project.name}
                          </h4>
                          <span className="font-mono text-xs text-muted">
                            {project.stack}
                          </span>
                        </div>

                        <ul className="space-y-2.5">
                          {project.bullets.map((bullet, bIdx) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 text-sm sm:text-[15px] text-ink/90 leading-relaxed"
                            >
                              <span className="font-mono text-[11px] text-lavender pt-1 tabular-nums shrink-0">
                                0{bIdx + 1}
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
