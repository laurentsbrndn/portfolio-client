import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the last section whose top edge has passed
 * a line at `offsetRatio` of the viewport height. Reads the live DOM on every
 * (rAF-throttled) scroll, so it stays correct even if sections re-mount.
 * `ids` must be in document order.
 */
export const useActiveSection = (ids: string[], offsetRatio = 0.45) => {
  const [activeId, setActiveId] = useState('');
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|').filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * offsetRatio;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [key, offsetRatio]);

  return activeId;
};