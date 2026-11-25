import {
  SECTION_THEMES,
  SKILL_CATEGORIES,
  type AccentTone,
} from '../config/portfolioStructure';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';

const ACCENT_RULE: Record<AccentTone, string> = {
  lavender: 'bg-lavender',
  yellow: 'bg-yellow',
  sage: 'bg-sage',
};

/**
 * Section 03 — Skills (Soft Sage Linen Theme).
 * Unboxed, crisp editorial list typography separated by subtle middots — zero pill clutter.
 */
export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{ backgroundColor: SECTION_THEMES.skills }}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[276px] xl:pl-[316px]">
        <SectionReveal>
          <SectionHeader
            index="03"
            title="Skills & Stack"
            headingId="skills-heading"
            scopeNote="Backend languages, Kubernetes platform tooling, CI/CD automation, observability, and structured AI-assisted engineering."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
            {SKILL_CATEGORIES.map((category, idx) => {
              const isFullSpan =
                SKILL_CATEGORIES.length % 2 === 1 &&
                idx === SKILL_CATEGORIES.length - 1;

              return (
                <article
                  key={category.id}
                  className={`bg-surface p-6 sm:p-8 flex flex-col justify-between gap-5 ${
                    isFullSpan ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-muted tabular-nums">
                        {category.index}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-8 ${ACCENT_RULE[category.accent]}`}
                      />
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink">
                      {category.title}
                    </h3>
                  </div>

                  {/* Clean unboxed editorial typography separated by middots */}
                  <p className="text-sm sm:text-[15px] text-ink/90 leading-relaxed pt-3 border-t border-hairline">
                    {category.items.map((item, itemIdx) => (
                      <span key={item}>
                        {item}
                        {itemIdx < category.items.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="mx-2 text-muted/60 select-none"
                          >
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </article>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
