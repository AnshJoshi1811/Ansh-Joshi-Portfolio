import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  SKILL_FILTER_TABS,
  SKILL_LOGOS,
  type SkillCategoryKey,
} from '../config/portfolioStructure';
import { PeekOnHover } from './ui/PeekOnHover';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';
import { TechLogo } from './ui/TechLogos';

/**
 * Section 05 — Tools I Build With.
 * Rich 21-tool production stack with crisp full-color vector logos,
 * category filtering, and global nose-only sneaking Ansh on hover!
 */
export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<SkillCategoryKey>('all');

  const visibleSkills =
    activeFilter === 'all'
      ? SKILL_LOGOS
      : SKILL_LOGOS.filter((skill) => skill.category === activeFilter);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-hairline bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[280px] xl:pl-[324px]">
        <SectionReveal>
          <SectionHeader
            index="05"
            title="Tools I build with"
            headingId="skills-heading"
            scopeNote="21 production languages, frameworks, Kubernetes & AWS tooling, observability platforms, and AI-assisted development workflows."
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
                    className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
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

            <span className="font-mono text-xs text-muted tabular-nums">
              {visibleSkills.length} / {SKILL_LOGOS.length} tools
            </span>
          </div>

          {/* Rich 21-Tool Full-Color Tech Logo Grid with Sneaking Ansh Hover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                <PeekOnHover align="right" size="sm">
                  <article className="group bg-surface border border-hairline rounded-xl p-4 flex items-center gap-3.5 hover:border-cobalt/60 hover:shadow-[0_10px_24px_-16px_rgba(15,23,42,0.2)] transition-all duration-150">
                    <div
                      className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105 ${skill.tintClass}`}
                    >
                      <TechLogo id={skill.id} className="w-7 h-7" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-display text-sm font-bold text-ink truncate">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-muted truncate mt-0.5">
                        {skill.role}
                      </p>
                    </div>
                  </article>
                </PeekOnHover>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
