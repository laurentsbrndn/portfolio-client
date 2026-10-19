import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

const readSavedTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
};

const getCurrentTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

export const useTheme = () => {
  // index.html already applied the correct class before first paint
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);

  const applyTheme = useCallback((next: Theme, persist: boolean) => {
    document.documentElement.classList.toggle('dark', next === 'dark');
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable (private mode) */
      }
    }
    flushSync(() => setTheme(next));
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const doc = document as DocumentWithViewTransition;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!doc.startViewTransition || reduceMotion) {
      applyTheme(next, true);
      return;
    }
    doc.startViewTransition(() => applyTheme(next, true));
  }, [theme, applyTheme]);

  // Follow OS changes only while the user hasn't chosen a theme explicitly
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!readSavedTheme()) applyTheme(event.matches ? 'dark' : 'light', false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [applyTheme]);

  return { theme, isDark: theme === 'dark', toggleTheme };
};