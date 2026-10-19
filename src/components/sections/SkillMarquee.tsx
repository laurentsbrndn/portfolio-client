import type { CSSProperties } from 'react';
import type { Skill } from '../../types/portfolio';

interface Props {
  skills: Skill[];
}

/** Subtle full-bleed ticker of technical skills between the hero and the content. */
export const SkillMarquee = ({ skills }: Props) => {
  const items = skills.filter((skill) => skill.category === 'HARD');
  if (items.length < 3) return null;

  // Two identical copies + translateX(-50%) = seamless loop
  const loop = [...items, ...items];
  const style = { '--marquee-duration': `${Math.max(40, items.length * 8)}s` } as CSSProperties;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 py-6 md:py-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-surface-border to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-surface-border to-transparent"
      />

      <div className="fade-mask-x flex overflow-hidden">
        <ul
          aria-label="Tech stack"
          style={style}
          className="flex w-max shrink-0 animate-marquee items-center hover:[animation-play-state:paused]"
        >
          {loop.map((skill, index) => (
            <li key={`${skill.id}-${index}`} aria-hidden={index >= items.length} className="flex items-center">
              <span className="flex items-center gap-2.5 whitespace-nowrap px-6 font-mono text-xs uppercase tracking-[0.18em] text-secondary transition-colors duration-300 hover:text-primary md:text-[13px]">
                {skill.iconUrl && (
                  <img
                    src={skill.iconUrl}
                    alt=""
                    loading="lazy"
                    className="h-4 w-4 object-contain opacity-70 grayscale"
                  />
                )}
                {skill.name}
              </span>
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-secondary/40" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};