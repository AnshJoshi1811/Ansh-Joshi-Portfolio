interface SectionHeaderProps {
  index: string;
  title: string;
  scopeNote?: string;
  headingId?: string;
  /** Hairline under the header (on by default) */
  divider?: boolean;
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
  divider = true,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-8 md:mb-10 flex flex-col items-center gap-3 text-center pb-6 ${
        divider ? 'border-b border-hairline' : ''
      }`}
    >
      <div className="space-y-1.5">
        <p className="t-eyebrow text-cobalt">
          {index}
        </p>
        <h2
          id={headingId}
          className="t-h2 text-ink"
        >
          {title}
        </h2>
      </div>
      {scopeNote && (
        <p className="t-body text-muted max-w-xl">
          {scopeNote}
        </p>
      )}
    </div>
  );
}
