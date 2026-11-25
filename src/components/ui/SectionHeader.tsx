interface SectionHeaderProps {
  index: string;
  title: string;
  scopeNote: string;
  headingId?: string;
}

export function SectionHeader({
  index,
  title,
  scopeNote,
  headingId,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 md:mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-hairline pb-6">
      <div className="space-y-2">
        <p className="font-mono text-xs text-muted tabular-nums tracking-normal">
          Section {index}
        </p>
        <h2
          id={headingId}
          className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-ink leading-[1.15]"
        >
          {title}
        </h2>
      </div>
      <p className="text-sm text-muted max-w-md md:text-right leading-relaxed">
        {scopeNote}
      </p>
    </div>
  );
}
