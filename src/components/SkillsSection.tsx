import { Fragment, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  SKILL_FILTER_TABS,
  SKILL_LOGOS,
  type SkillCategoryKey,
} from '../config/portfolioStructure';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';
import { BuddyStopSprite } from './ui/PixelAnshTravel';
import { TechLogo } from './ui/TechLogos';

/**
 * Section 05 — Tools I Build With.
 * Rich 21-tool production stack with crisp full-color vector logos,
 * shown with official brand icons and category filtering.
 */
export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<SkillCategoryKey>('all');

  const matches = (category: string) => activeFilter === 'all' || category === activeFilter;
  const matchCount = SKILL_LOGOS.filter((skill) => matches(skill.category)).length;
  // Pixel Ansh's tile sits in the middle of the grid
  const anshSlot = 5;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-hairline py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionReveal>
          <SectionHeader
            index="04"
            title="Tools I build with"
            headingId="skills-heading"
          />

          {/* Clean Segmented Filter Row */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Filter stack by category"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-recessed border border-hairline"
            >
              {SKILL_FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-surface text-ink shadow-xs border border-hairline'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <span className="t-meta text-muted">
              {matchCount} / {SKILL_LOGOS.length} tools
            </span>
          </div>

          {/* Tool grid with official brand icons. Filtering dims instead of removing, so the grid never resizes. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-flow-row-dense">
            {SKILL_LOGOS.map((skill, index) => {
              const isMatch = matches(skill.category);
              return (
                <Fragment key={skill.id}>
                  {index === anshSlot && (
                    <div className="sm:col-span-2 lg:col-span-1 lg:row-span-3 relative rounded-xl border border-hairline bg-recessed blueprint-dots flex items-end justify-center overflow-hidden min-h-[220px]">
                      <span aria-hidden="true" className="absolute bottom-5 left-1/2 -translate-x-1/2 h-2.5 w-28 rounded-[50%] bg-ink/10 blur-[2px]" />
                      <BuddyStopSprite
                        stop="skills"
                        spriteKey="idle"
                        hopKey={activeFilter}
                        alt="Pixel Ansh with a coffee and a bright idea"
                        className="mb-2 w-48 h-48"
                      />
                    </div>
                  )}
                  <motion.article
                    animate={{ opacity: isMatch ? 1 : 0.32, scale: isMatch ? 1 : 0.97 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className={`group bg-surface border border-hairline rounded-xl p-4 flex items-center gap-3.5 transition-[border-color,box-shadow,filter] duration-150 ${
                      isMatch
                        ? 'hover:border-cobalt/60 hover:shadow-[0_10px_24px_-16px_rgba(15,23,42,0.2)]'
                        : 'grayscale'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105 ${skill.tintClass}`}
                    >
                      <TechLogo id={skill.id} className="w-7 h-7" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-display text-[15px] font-bold tracking-[-0.01em] text-ink truncate">
                        {skill.name}
                      </h3>
                      <p className="t-caption text-muted truncate mt-0.5">
                        {skill.role}
                      </p>
                    </div>
                  </motion.article>
                </Fragment>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
