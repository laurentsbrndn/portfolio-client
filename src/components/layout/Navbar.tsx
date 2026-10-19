import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Profile } from '../../types/portfolio';
import type { NavItem } from '../../constants/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../lib/cn';
import { fadeUp, stagger } from '../../lib/motion';
import { SocialLinks } from '../common/SocialLinks';
import { ThemeToggle } from '../common/ThemeToggle';
import { ArrowRightIcon, CloseIcon, MenuIcon } from '../common/Icons';

interface Props {
  profile?: Profile | null;
  items: readonly NavItem[];
}

const MOBILE_MENU_ID = 'mobile-menu';

export const Navbar = ({ profile, items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled(16);
  const activeId = useActiveSection([...items.map((item) => item.id), 'contact']);
  const name = profile?.fullName?.trim() || 'Laurentius Brandon Vikario';
  const elevated = scrolled || isOpen;

  // Mobile menu: lock scroll, close on Escape, close when resized to desktop
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [isOpen]);

  const handleMobileNavigate = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setIsOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView(); // respects CSS scroll-behavior & scroll-padding
      history.replaceState(null, '', `#${id}`);
    });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6">
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border px-3 py-2 transition-all duration-300 md:px-4',
            elevated
              ? 'border-surface-border/70 bg-background/75 shadow-[0_8px_30px_-12px_color-mix(in_srgb,var(--text-main)_18%,transparent)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          {/* Brand */}
          <a href="#about" className="group flex min-w-0 items-center" aria-label={`${name}, back to top`}>
            <span className="truncate font-display text-[15px] font-bold tracking-tight text-primary transition-opacity group-hover:opacity-80">
              <span className="hidden xl:inline">{name}</span>
              <span className="xl:hidden">{name.split(' ')[0]}</span>
              <span className="text-secondary">.</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="relative isolate flex items-center gap-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'relative block rounded-full px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors',
                        isActive ? 'text-primary' : 'text-secondary hover:text-primary',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-surface-border"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <SocialLinks profile={profile} className="hidden xl:flex" />
            <span aria-hidden="true" className="mx-1.5 hidden h-5 w-px bg-surface-border xl:block" />
            <ThemeToggle />

            <a
              href="#contact"
              className="group ml-1 hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.12em] text-background transition-colors hover:bg-accent-hover sm:inline-flex"
            >
              Let&apos;s Connect
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-full text-secondary transition-colors hover:bg-accent-soft hover:text-primary lg:hidden"
            >
              {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={MOBILE_MENU_ID}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile">
              <motion.ul initial="hidden" animate="visible" variants={stagger(0.05, 0.05)}>
                {items.map((item, index) => (
                  <motion.li key={item.id} variants={fadeUp}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleMobileNavigate(event, item.id)}
                      aria-current={activeId === item.id ? 'location' : undefined}
                      className={cn(
                        'flex items-baseline gap-4 border-b border-surface-border/60 py-4 font-display text-2xl font-semibold transition-colors',
                        activeId === item.id ? 'text-primary' : 'text-secondary hover:text-primary',
                      )}
                    >
                      <span className="font-mono text-xs text-secondary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto flex items-center justify-between gap-4"
            >
              <SocialLinks profile={profile} />
              <a
                href="#contact"
                onClick={(event) => handleMobileNavigate(event, 'contact')}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background sm:hidden"
              >
                Let&apos;s Connect
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};