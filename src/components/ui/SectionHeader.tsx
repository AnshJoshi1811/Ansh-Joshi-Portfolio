interface SectionHeaderProps {
  index: string;
  title: string;
  scopeNote: string;
  headingId?: string;
}

/**
 * Clean architectural section header with tabular numeral index,
 * tight-tracked grotesque headline, and hairline structural divider.
 */
export function SectionHeader({
  index,
  title,
  scopeNote,
  headingId,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 md:mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-hairline pb-6">
      <div className="space-y-1.5">
        <p className="font-mono text-xs font-medium text-cobalt tabular-nums">
          {index}
        </p>
        <h2
          id={headingId}
          className="font-display text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-[-0.025em] text-ink leading-[1.15]"
        >
          {title}
        </h2>
      </div>
      <p className="text-sm sm:text-[15px] text-muted max-w-md md:text-right leading-relaxed">
        {scopeNote}
      </p>
    </div>
  );
}
