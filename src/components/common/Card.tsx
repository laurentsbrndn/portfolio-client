import { useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
  /** Cursor-following highlight. Disable for dense/static cards. */
  spotlight?: boolean;
}

export const Card = ({ children, className, spotlight = true }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // Writes CSS variables directly: no React re-render on mouse move
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={spotlight ? handleMouseMove : undefined}
      className={cn(
        'group/card relative isolate overflow-hidden rounded-2xl border border-surface-border/70 bg-surface',
        'transition-[border-color,box-shadow,transform] duration-300 ease-out',
        'hover:-translate-y-0.5 hover:border-secondary/30',
        'hover:shadow-[0_12px_40px_-16px_color-mix(in_srgb,var(--text-main)_22%,transparent)]',
        className,
      )}
    >
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--text-main) 6%, transparent), transparent 70%)',
          }}
        />
      )}
      {children}
    </div>
  );
};