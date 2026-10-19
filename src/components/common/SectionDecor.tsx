import { cn } from '../../lib/cn';

interface Props {
  texture?: 'none' | 'grid' | 'dots';
}

// Soft glow drawn with a translucent radial gradient (no filter: blur → no Safari compositing artifacts)
const glowStyle = {
  background:
    'radial-gradient(closest-side, color-mix(in srgb, var(--text-main) 6%, transparent), transparent)',
};

/** Shared background layer for sections: hairline, texture and glow. */
export const SectionDecor = ({ texture = 'none' }: Props) => (
  <>
    {/* Hairline divider fading at both ends */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-surface-border to-transparent"
    />

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
    >
      {texture !== 'none' && (
        <>
          <div
            className={cn(
              'absolute inset-0 opacity-60 dark:opacity-40',
              texture === 'grid' ? 'bg-grid' : 'bg-dots',
            )}
          />
          {/* Fade texture at top & bottom with background-colored overlays (instead of mask-image) */}
          <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-background to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background to-transparent" />
        </>
      )}

      <div className="absolute left-[2%] top-0 h-[36rem] w-[36rem] rounded-full" style={glowStyle} />
    </div>
  </>
);