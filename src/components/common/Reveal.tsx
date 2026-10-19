import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_OUT, VIEWPORT } from '../../lib/motion';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Reusable fade-up-on-scroll wrapper. */
export const Reveal = ({ children, className, delay = 0, y = 16 }: Props) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.6, delay, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);