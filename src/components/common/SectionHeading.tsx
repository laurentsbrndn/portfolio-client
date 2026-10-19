import { motion, type Variants } from 'framer-motion';
import { cn } from '../../lib/cn';
import { EASE_OUT, VIEWPORT, fadeUp, stagger } from '../../lib/motion';

interface Props {
  title: string;
  subtitle?: string;
  tag?: string;
  index?: string;
  align?: 'left' | 'center';
  id?: string;
  /** Smaller title for the narrow column of split layouts */
  compact?: boolean;
}

const line: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const SectionHeading = ({
  title,
  subtitle,
  tag = 'Explore',
  index,
  align = 'left',
  id,
  compact = false,
}: Props) => {
  const centered = align === 'center';

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={stagger(0.1)}
      className={cn('mb-12 max-w-3xl md:mb-16', compact && 'lg:mb-0', centered && 'mx-auto text-center')}
    >
      <motion.div
        variants={fadeUp}
        className={cn(
          'mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-secondary',
          centered && 'justify-center',
        )}
      >
        {index && <span className="font-medium text-primary">{index}</span>}
        <motion.span variants={line} className="h-px w-10 origin-left bg-primary/50" />
        <span>{tag}</span>
      </motion.div>

      <motion.h2
        id={id}
        variants={fadeUp}
        className={cn(
          'text-gradient pb-2 font-display font-bold tracking-tight text-balance',
          compact ? 'text-3xl md:text-4xl xl:text-5xl' : 'text-4xl md:text-5xl lg:text-6xl',
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'mt-4 max-w-2xl text-base leading-relaxed text-pretty text-secondary md:text-lg',
            centered && 'mx-auto',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
};