import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface Props {
  children: ReactNode;
}

/** Vertical timeline whose line "draws" as the user scrolls through it. */
export const Timeline = ({ children }: Props) => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative max-w-4xl space-y-6 md:space-y-8">
      <span aria-hidden="true" className="absolute bottom-8 left-[7px] top-8 w-px bg-surface-border" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-8 left-[7px] top-8 w-px origin-top bg-primary"
      />
      {children}
    </ol>
  );
};