import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { SectionHeading } from './SectionHeading';
import { SectionDecor } from './SectionDecor';

interface Props {
  id: string;
  index: string;
  tag: string;
  title: string;
  subtitle?: string;
  texture?: 'none' | 'grid' | 'dots';
  children: ReactNode;
  className?: string;
}

/** Consistent section shell: heading on top, content below. */
export const Section = ({
  id,
  index,
  tag,
  title,
  subtitle,
  texture = 'dots',
  children,
  className,
}: Props) => {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('relative isolate py-28 md:py-36', className)}
    >
      <SectionDecor texture={texture} />
      <SectionHeading id={headingId} index={index} tag={tag} title={title} subtitle={subtitle} />
      {children}
    </section>
  );
};