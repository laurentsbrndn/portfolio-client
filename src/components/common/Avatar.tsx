import { useState } from 'react';
import { cn } from '../../lib/cn';
import { getInitials } from '../../lib/format';

interface Props {
  src?: string | null;
  name: string;
  className?: string;
  /** CSS object-position, e.g. '50% 0%' keeps the top of the photo visible. */
  position?: string;
}

/** Image with graceful fallback to initials when missing or broken. */
export const Avatar = ({ src, name, className, position }: Props) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={cn('relative overflow-hidden rounded-full bg-surface', className)}>
      {(!showImage || !loaded) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center bg-accent-soft font-display text-5xl font-bold tracking-tight text-secondary/70"
        >
          {getInitials(name)}
        </div>
      )}

      {showImage && (
        <img
          src={src!}
          alt={name}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={cn(
            'relative h-full w-full object-cover transition-opacity duration-700',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  );
};