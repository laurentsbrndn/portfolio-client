import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

interface Props {
  tags: string[];
  /** Maximum rows to show; tags that do not fit collapse into a "+N" chip. */
  maxRows?: number;
  label?: string;
  className?: string;
}

const CHIP =
  'whitespace-nowrap rounded-md border border-surface-border bg-background px-2 py-0.5 font-mono text-[10px] text-secondary';

/** Simulates flex-wrap: how many rows do these chip widths need? */
const rowsNeeded = (widths: number[], max: number, gap: number) => {
  let rows = 1;
  let x = 0;
  for (const w of widths) {
    if (x === 0) x = w;
    else if (x + gap + w <= max) x += gap + w;
    else {
      rows += 1;
      x = w;
    }
  }
  return rows;
};

/** Largest number of tags that fit in maxRows (reserving room for the "+N" chip when needed). */
const countVisible = (widths: number[], moreWidth: number, max: number, gap: number, maxRows: number) => {
  if (rowsNeeded(widths, max, gap) <= maxRows) return widths.length;
  for (let k = widths.length - 1; k >= 0; k--) {
    if (rowsNeeded([...widths.slice(0, k), moreWidth], max, gap) <= maxRows) return k;
  }
  return 0;
};

export const TagList = ({ tags, maxRows = 2, label, className }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(tags.length);
  const key = tags.join('\u0000');

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    const measurer = measureRef.current;
    if (!wrapper || !measurer) return;

    const max = wrapper.clientWidth;
    if (max === 0) return; // hidden / not laid out yet

    const gap = parseFloat(getComputedStyle(measurer).columnGap) || 0;
    const widths = Array.from(measurer.children, (el) => (el as HTMLElement).offsetWidth);
    const moreWidth = widths.pop() ?? 0; // last child is the "+N" chip

    setVisible(countVisible(widths, moreWidth, max, gap, maxRows));
  }, [maxRows]);

  // Runs before paint, so there is no flash of the un-truncated list
  useLayoutEffect(() => {
    measure();
  }, [measure, key]);

  // Re-fit when the card is resized or the web font finishes loading
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure]);

  if (tags.length === 0) return null;

  const shown = Math.min(visible, tags.length);
  const hidden = tags.slice(shown);

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      <ul aria-label={label} className="flex flex-wrap gap-1.5">
        {tags.slice(0, shown).map((tag) => (
          <li key={tag} className={CHIP}>
            {tag}
          </li>
        ))}
        {hidden.length > 0 && (
          <li className={cn(CHIP, 'font-medium text-primary')} title={hidden.join(', ')}>
            +{hidden.length}
            <span className="sr-only"> more: {hidden.join(', ')}</span>
          </li>
        )}
      </ul>

      {/* Invisible copy with every chip, used only to measure widths */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-x-0 top-0 flex flex-wrap gap-1.5"
      >
        {tags.map((tag) => (
          <span key={tag} className={CHIP}>
            {tag}
          </span>
        ))}
        <span className={cn(CHIP, 'font-medium')}>+{tags.length}</span>
      </div>
    </div>
  );
};