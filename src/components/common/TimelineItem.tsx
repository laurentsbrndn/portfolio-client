import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { EASE_OUT, VIEWPORT } from '../../lib/motion';
import { Card } from './Card';
import { MapPinIcon } from './Icons';

interface Props {
  title: string;
  subtitle?: string | null;
  meta?: string | null;
  logoUrl?: string | null;
  dateRange: string;
  duration?: string;
  location?: string | null;
  isCurrent?: boolean;
  children?: ReactNode;
}

export const TimelineItem = ({
  title,
  subtitle,
  meta,
  logoUrl,
  dateRange,
  duration,
  location,
  isCurrent = false,
  children,
}: Props) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.6, ease: EASE_OUT }}
    className="group relative pl-10 md:pl-12"
  >
    {/* Dot on the line */}
    <span
      aria-hidden="true"
      className="absolute left-0 top-8 flex h-[15px] w-[15px] items-center justify-center md:top-10"
    >
      {isCurrent && <span className="absolute h-full w-full animate-ping rounded-full bg-primary/30" />}
      <span
        className={cn(
          'relative h-[15px] w-[15px] rounded-full border-2 border-primary ring-4 ring-background transition-transform duration-300 group-hover:scale-125',
          isCurrent ? 'bg-primary' : 'bg-background',
        )}
      />
    </span>

    <Card className="p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-lg font-bold tracking-tight text-primary md:text-xl">{title}</h3>
            {isCurrent && (
              <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-background">
                Now
              </span>
            )}
          </div>

          {(subtitle || meta) && (
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-5 w-5 rounded bg-white object-contain"
                />
              )}
              {subtitle && <span className="font-semibold text-primary/80">{subtitle}</span>}
              {subtitle && meta && <span aria-hidden="true" className="text-secondary/40">•</span>}
              {meta && <span className="text-secondary">{meta}</span>}
            </div>
          )}
        </div>

        <span className="w-fit shrink-0 rounded-full border border-surface-border bg-background px-3 py-1 font-mono text-xs text-primary">
          {dateRange}
        </span>
      </div>

      {(duration || location) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary">
          {duration && <span className="font-mono">{duration}</span>}
          {location && (
            <span className="inline-flex items-center gap-1">
              <MapPinIcon className="h-3.5 w-3.5" />
              {location}
            </span>
          )}
        </div>
      )}

      {children && <div className="mt-6 border-t border-surface-border/60 pt-6">{children}</div>}
    </Card>
  </motion.li>
);