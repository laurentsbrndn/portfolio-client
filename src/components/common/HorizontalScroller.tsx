import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRightIcon } from './Icons';

interface Props {
  /** Accessible name of the scrollable region */
  label: string;
  children: ReactNode;
  className?: string;
}

const arrowClass =
  'grid h-9 w-9 place-items-center rounded-full border border-surface-border bg-background/60 text-primary backdrop-blur transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-background/60';

/** Horizontal scroll-snap row with prev/next arrows (arrows only show when there is overflow). */
export const HorizontalScroller = ({ label, children, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const start = el.scrollLeft <= 2;
    const end = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    // Only re-render when an edge state actually changes
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [update]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const scrollable = !(edges.start && edges.end);

  return (
    <div className={className}>
      {scrollable && (
        <div className="mb-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={edges.start}
            aria-label="Scroll left"
            className={arrowClass}
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={edges.end}
            aria-label="Scroll right"
            className={arrowClass}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Vertical padding/negative margin leaves room for the card hover lift & shadow */}
      <div
        ref={ref}
        role="region"
        aria-label={label}
        onScroll={update}
        className="-my-4 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
};