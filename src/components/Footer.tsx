import { ArrowUp } from 'lucide-react';
import { SECTION_THEMES, SITE_META } from '../config/portfolioStructure';

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: SECTION_THEMES.contact }}
      className="border-t border-hairline py-10"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:pl-[276px] xl:pl-[316px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted">
          <span className="font-serif text-sm font-medium text-ink">
            {SITE_META.owner}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{SITE_META.domain}</span>
          <span aria-hidden="true">·</span>
          <span>{SITE_META.role}</span>
          <span aria-hidden="true">·</span>
          <span>{SITE_META.location}</span>
        </div>

        <a
          href="#hero"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-lavender focus-visible:outline-offset-4"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
