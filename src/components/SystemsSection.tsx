import { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ENGINEERING_PRINCIPLES,
  SYSTEM_ARCHITECTURES,
  type SystemArchitectureSpec,
} from '../config/portfolioStructure';
import { PeekOnHover } from './ui/PeekOnHover';
import { SectionHeader } from './ui/SectionHeader';
import { SectionReveal } from './ui/SectionReveal';

/**
 * Section 03 — Systems & Engineering Philosophy.
 * Three concise principles + interactive 3-tab production architecture explorer,
 * enhanced with global nose-only sneaking Ansh hover interactions.
 */
export function SystemsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] =
    useState<SystemArchitectureSpec['id']>('onap');

  const activeSystem =
    SYSTEM_ARCHITECTURES.find((item) => item.id === activeId) ??
    SYSTEM_ARCHITECTURES[0];

  return (
    <section
      id="systems"
      aria-labelledby="systems-heading"
      className="border-t border-hairline bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[280px] xl:pl-[324px]">
        <SectionReveal>
          <SectionHeader
            index="03"
            title="How I engineer systems"
            headingId="systems-heading"
            scopeNote="Reliable microservices, zero-downtime data pipelines, and reproducible cloud infrastructure designed to stay predictable under load."
          />

          {/* Three Concise Engineering Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {ENGINEERING_PRINCIPLES.map((principle) => (
              <div
                key={principle.index}
                className="space-y-2.5 border-t border-hairline-strong pt-4"
              >
                <span className="font-mono text-xs font-medium text-cobalt tabular-nums">
                  {principle.index}
                </span>
                <h3 className="font-display text-base sm:text-[17px] font-bold text-ink leading-snug">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Production Architecture Explorer with Sneaking Ansh Hover */}
          <PeekOnHover align="right" size="md">
            <div className="bg-surface border border-hairline rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <div className="px-5 sm:px-7 py-4 border-b border-hairline bg-recessed/55 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-muted">
                  <Layers className="w-4 h-4 text-cobalt" aria-hidden="true" />
                  <span>Production Architecture Blueprints</span>
                </div>

                <div
                  role="tablist"
                  aria-label="Inspect production system architectures"
                  className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white border border-hairline"
                >
                  {SYSTEM_ARCHITECTURES.map((sys) => {
                    const isActive = sys.id === activeSystem.id;
                    return (
                      <button
                        key={sys.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveId(sys.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-ink text-white'
                            : 'text-muted hover:text-ink hover:bg-recessed'
                        }`}
                      >
                        {sys.tabLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSystem.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 sm:px-8 pt-7 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div className="space-y-1.5">
                      <p className="font-mono text-xs text-muted">
                        {activeSystem.context} ·{' '}
                        <span className="text-cobalt font-medium">
                          {activeSystem.metricHighlight}
                        </span>
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">
                        {activeSystem.title}
                      </h3>
                    </div>

                    <p className="font-mono text-xs text-muted">
                      {activeSystem.stack.join(' · ')}
                    </p>
                  </div>

                  {/* Schematic Flow Diagram Stage */}
                  <div className="mx-6 sm:mx-8 mb-6 p-5 sm:p-6 rounded-xl bg-canvas border border-hairline blueprint-dots">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
                      {activeSystem.nodes.map((node, idx) => (
                        <div
                          key={node.step}
                          className="relative flex items-center gap-2"
                        >
                          <div className="flex-1 h-full bg-white border border-hairline rounded-xl p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex flex-col justify-between gap-1.5">
                            <span className="font-mono text-[10px] font-semibold text-cobalt tabular-nums">
                              {node.step}
                            </span>
                            <span className="font-display text-sm font-bold text-ink leading-tight">
                              {node.title}
                            </span>
                            <span className="font-mono text-[11px] text-muted leading-snug">
                              {node.detail}
                            </span>
                          </div>

                          {idx < activeSystem.nodes.length - 1 && (
                            <ArrowRight
                              className="hidden lg:block w-4 h-4 text-cobalt/70 shrink-0 -mr-1.5"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Problem -> Approach */}
                  <div className="px-6 sm:px-8 pb-7 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-hairline pt-6">
                    <div className="space-y-1.5">
                      <p className="font-mono text-xs font-medium text-muted">
                        Problem
                      </p>
                      <p className="text-sm text-ink/90 leading-relaxed">
                        {activeSystem.problem}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-mono text-xs font-medium text-cobalt">
                        Architecture &amp; Outcome
                      </p>
                      <p className="text-sm text-ink/90 leading-relaxed">
                        {activeSystem.approach}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </PeekOnHover>
        </SectionReveal>
      </div>
    </section>
  );
}
