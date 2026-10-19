import { AnimatePresence, motion } from 'framer-motion';
import { useScrolled } from '../../hooks/useScrolled';
import { ArrowUpIcon } from './Icons';

export const BackToTop = () => {
  const visible = useScrolled(800);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-surface-border bg-background/80 text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-surface md:bottom-8 md:right-8"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};